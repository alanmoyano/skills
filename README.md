# Skills

My own agent skills and a remote-source lock for the 28 skills installed globally as of October 26, 2026.

## Available skills

- [writing-pr](skills/writing-pr/SKILL.md) writes pull request and merge request titles and descriptions, following repository conventions and grouping larger changes by intent.

Only my own skill is distributed here. Third-party skills are referenced in [skills-lock.json](skills-lock.json) by their upstream repository, path, commit and content hash.

## Personal agent instructions

[AGENTS.md](AGENTS.md) records my shared preferences for Codex and Claude Code. The working file is `~/AGENTS.md`; the repository contains a regular copy so cloning it restores the contents, rather than a symlink pointing outside the checkout.

The local configuration is:

- `~/AGENTS.md`: the real file, edited locally.
- `~/.codex/AGENTS.md`: a symlink to `../AGENTS.md`.
- `~/.claude/CLAUDE.md`: a regular file containing `@~/AGENTS.md` on its own line.

From the repository root, set up a new installation with:

```sh
cp -i AGENTS.md "$HOME/AGENTS.md"
mkdir -p "$HOME/.codex" "$HOME/.claude"
ln -s ../AGENTS.md "$HOME/.codex/AGENTS.md"
printf '%s\n' '@~/AGENTS.md' >> "$HOME/.claude/CLAUDE.md"
```

For an existing installation, inspect the destination files first. Merge any existing instructions, keep a correct Codex symlink, and add the Claude import only if it is missing. Keep the import outside Markdown backticks or code blocks so Claude expands it. See the [Claude Code import documentation](https://code.claude.com/docs/en/memory#import-additional-files).

Verify the configuration with:

```sh
readlink "$HOME/.codex/AGENTS.md"
cmp "$HOME/AGENTS.md" "$HOME/.codex/AGENTS.md"
cat "$HOME/.claude/CLAUDE.md"
```

After editing the home file, update the tracked copy from the repository root before committing and pushing:

```sh
cp -i "$HOME/AGENTS.md" AGENTS.md
git diff -- AGENTS.md
```

The repository copy and home file are independent. Skills CLI and pack installation do not install this personal configuration.

## Install writing-pr

```sh
npx skills add alanmoyano/skills --skill writing-pr -g
```

## Install the pack

[Alan's skills](https://skills.sh/p/jbI6I7Cw78IIw3Y6) bundles 25 of the 28 skills in this inventory. It does not yet include `state-machine`, `teardown` and `variant`, added to the lock on October 26, 2026. Install the collection globally for Codex and Claude Code:

```sh
npx skills add https://skills.sh/p/jbI6I7Cw78IIw3Y6 -g -a codex claude-code -y
```

The pack references 24 public skills from their original sources and imports `writing-pr` from this GitHub repository. It is unlisted and anyone with the link can install it.

The pack installs the contents currently served by skills.sh. Use the lock or the pinned upstream commands below to restore the recorded repository revisions.

## Restore the collection

For a project, run this from a checkout of the repository:

```sh
npx skills@1.7.1 experimental_install
node scripts/verify-lock.mjs .agents/skills
```

For a global installation, follow the upstream commands in [INSTALLED-SKILLS.md](INSTALLED-SKILLS.md). That document also lists the origins and commits and explains recovery without the lock or CLI.

See the [Skills CLI documentation](https://skills.sh/docs/cli) and its [upstream README](https://github.com/vercel-labs/skills) for supported sources and installation options.
