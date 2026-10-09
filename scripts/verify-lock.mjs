import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = process.argv[2] ? resolve(process.argv[2]) : null;
const lock = JSON.parse(await readFile(join(repo, 'skills-lock.json'), 'utf8'));
const lockedNames = Object.keys(lock.skills).sort();

if (lock.version !== 1 || lockedNames.length === 0) {
  throw new Error('Expected a nonempty version 1 project lock');
}
for (const name of lockedNames) {
  const entry = lock.skills[name];
  if (entry.sourceType !== 'github' || !/^[\w.-]+\/[\w.-]+$/.test(entry.source)
      || !/^[a-f0-9]{40}$/.test(entry.ref) || !/^[a-f0-9]{64}$/.test(entry.computedHash)
      || typeof entry.skillPath !== 'string' || !entry.skillPath.endsWith('/SKILL.md')
      || entry.skillPath.startsWith('/') || entry.skillPath.split('/').includes('..')) {
    throw new Error(`Invalid pinned GitHub entry: ${name}`);
  }
}
const authoredNames = (await readdir(join(repo, 'skills'), { withFileTypes: true }))
  .filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
for (const name of authoredNames) {
  if (lock.skills[name]?.source !== 'alanmoyano/skills') {
    throw new Error(`Unexpected vendored skill: ${name}`);
  }
}

// Match computeSkillFolderHash in Skills CLI 1.7.1, including localeCompare ordering.
async function collect(base, directory, files) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '.git' && entry.name !== 'node_modules') {
        await collect(base, path, files);
      }
    } else if (entry.isFile()) {
      files.push({ path: relative(base, path).replaceAll('\\', '/'), content: await readFile(path) });
    }
  }
}

const names = root ? lockedNames : authoredNames;
for (const name of names) {
  const folder = join(root ?? join(repo, 'skills'), name);
  const files = [];
  await readFile(join(folder, 'SKILL.md'));
  await collect(folder, folder, files);
  files.sort((a, b) => a.path.localeCompare(b.path));
  const hash = createHash('sha256');
  for (const file of files) hash.update(file.path).update(file.content);
  if (hash.digest('hex') !== lock.skills[name].computedHash) {
    throw new Error(`Content hash mismatch: ${name}`);
  }
}

console.log(`Validated ${lockedNames.length} remote entries; verified ${names.length} skill folders`);
