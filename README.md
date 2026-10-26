# Skills

My own agent skills, my shared agent instructions, and the skills.sh pack I install globally.

## Available skills

- [writing-pr](skills/writing-pr/SKILL.md) writes pull request and merge request titles and descriptions, following repository conventions and grouping larger changes by intent.

Only my own skill is distributed here. Third-party skills are installed from their upstream repositories through the pack.

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

[Alan's skills](https://skills.sh/p/jbI6I7Cw78IIw3Y6) is the source of truth for the skills I use. It bundles 27 public skills from their original repositories and imports `writing-pr` from this repository. It is unlisted and anyone with the link can install it.

Install it globally for Codex and Claude Code:

```sh
npx skills add https://skills.sh/p/jbI6I7Cw78IIw3Y6 -g -a codex claude-code -y
```

The pack installs the latest published version of each skill. To add or remove skills, sign in to skills.sh with the `alan-moyano` team and use **Edit skills in pack** on the pack page.

skills.sh allows 60 requests per hour, and a pack installation makes many of them. Even after an hour without requests, an installation of this pack usually skips one skill without reporting an error. A second installation within the hour fails with `Downloaded URL is not a valid SKILL.md file`. After installing, compare `ls ~/.agents/skills` with the pack page. Rerun the command after an hour, or install the missing skills with the commands below.

## Install without skills.sh

These commands install the pack contents directly from GitHub, as of October 26, 2026. They don't depend on skills.sh, but they don't follow later changes to the pack.

```sh
npx skills add jakubkrehel/skills -g -a codex claude-code -y \
  --skill better-accessibility better-colors better-interface better-layout better-typography better-ui better-writing break explain-interface interface-review state-machine teardown variant

npx skills add emilkowalski/skills -g -a codex claude-code -y \
  --skill animate animation-vocabulary apple-design break-ui emil-design-eng find-animation-opportunities improve-animations prototype review-animations

npx skills add mattpocock/skills -g -a codex claude-code -y --skill codebase-design writing-for-agents
npx skills add anthropics/skills -g -a codex claude-code -y --skill frontend-design
npx skills add vojtaholik/good-css -g -a codex claude-code -y --skill good-css
npx skills add cursor/plugins -g -a codex claude-code -y --skill unslop
npx skills add alanmoyano/skills -g -a codex claude-code -y --skill writing-pr
```

See the [Skills CLI documentation](https://skills.sh/docs/cli), the [pack documentation](https://skills.sh/docs/packs) and the [upstream README](https://github.com/vercel-labs/skills) for supported sources and options.
