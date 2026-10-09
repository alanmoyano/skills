import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = process.argv[2] ? resolve(process.argv[2]) : join(repo, 'skills');
const lock = JSON.parse(await readFile(join(repo, 'skills-lock.json'), 'utf8'));
const names = (await readdir(root, { withFileTypes: true }))
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .sort();
const lockedNames = Object.keys(lock.skills).sort();

if (lock.version !== 1 || JSON.stringify(names) !== JSON.stringify(lockedNames)) {
  throw new Error('Skill inventory does not match skills-lock.json');
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

for (const name of names) {
  const files = [];
  await readFile(join(root, name, 'SKILL.md'));
  await collect(join(root, name), join(root, name), files);
  files.sort((a, b) => a.path.localeCompare(b.path));
  const hash = createHash('sha256');
  for (const file of files) hash.update(file.path).update(file.content);
  if (hash.digest('hex') !== lock.skills[name].computedHash) {
    throw new Error(`Content hash mismatch: ${name}`);
  }
}

console.log(`Verified ${names.length} skills against skills-lock.json`);
