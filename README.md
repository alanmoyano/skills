# Skills

My own agent skills and a remote-source lock for the 25 skills installed globally as of October 9, 2026.

## Available skills

- [writing-pr](skills/writing-pr/SKILL.md) writes pull request and merge request titles and descriptions, following repository conventions and grouping larger changes by intent.

Only my own skill is distributed here. Third-party skills are referenced in [skills-lock.json](skills-lock.json) by their upstream repository, path, commit and content hash.

## Install writing-pr

```sh
npx skills add alanmoyano/skills --skill writing-pr -g
```

## Install the pack

[Alan's skills](https://skills.sh/p/jbI6I7Cw78IIw3Y6) bundles all 25 skills in this inventory. Install the collection globally for Codex and Claude Code:

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
