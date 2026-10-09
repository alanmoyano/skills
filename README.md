# Skills

My collection of agent skills, including a snapshot of the 25 globally installed skills as of October 9, 2026.

## Available skills

- [writing-pr](skills/writing-pr/SKILL.md): write pull request and merge request titles and descriptions, following repository conventions and grouping larger changes by intent.

See [INSTALLED-SKILLS.md](INSTALLED-SKILLS.md) for the complete inventory, known origins, and recovery instructions.

## Install

Install `writing-pr` globally with the Skills CLI:

```sh
npx skills add alanmoyano/skills --skill writing-pr -g
```

To restore the complete saved collection globally, clone this repository and run:

```sh
npx skills@1.7.1 add ./skills --skill '*' --agent codex claude-code -g -y
```

To restore project-level installations from [skills-lock.json](skills-lock.json):

```sh
npx skills@1.7.1 experimental_install
```

The lock uses relative local sources and content hashes. The saved skill folders are required; the lock alone does not contain their contents or pin remote revisions.

## Repository structure

Each skill lives in `skills/<name>/` with a `SKILL.md` entry point and any supporting resources it needs.

Third-party license notices are preserved with the relevant skills or under `licenses/`. Known provenance is recorded in [INSTALLED-SKILLS.md](INSTALLED-SKILLS.md).
