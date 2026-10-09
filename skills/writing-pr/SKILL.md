---
name: writing-pr
description: Use when writing or editing a pull request / merge request title or body.
---

# PR titles and descriptions

PR is used here as an alias for MR. For GitLab repositories, use the correct MR terminology.

## Titles

- Write a title that describes the changes.
- Follow the repository's title conventions, using its recent PRs and documented rules as evidence.
- When no repository-specific convention is established, use Conventional Commits.

## Body

- Write a concise body rather than an essay. Use bullet points for the text.
- Focus on code samples or snippets, including internals or sample usage. Code references are welcome.
- Do not include that you ran tests.
- Describe only the final aggregate squash merge change. Omit intermediate PR details, such as reducing the diff from 6,000 lines to 1,000 or refactoring between commits.

### Small PRs

Keep the body brief, without mandatory sections.

### Large PRs

For large PRs with distinct areas of change:

- Organize the body into groups by intent, such as "Authentication flow", "Data migration" or "Configuration UI".
- Explain what changed and why in each group, so reviewers can follow one coherent part at a time.
- Group related changes across files instead of listing files or commits.

For truly impressive, difficult, high-risk or wide-scope changes, the body may read like a technical blog, with context, storytelling, code samples, before/after comparisons, diagrams and images.

## Diagrams

Include Mermaid diagrams for architectural changes or when reviewers need a diagram to understand the changed structure, flow or interactions.

## Visual changes

For direct or indirect visual changes, show a before/after table with uploaded images or videos.

### GitHub attachments

- You can upload comparison images or videos with `--attach` on `gh pr create` or `gh pr edit`, repeating the flag for each file.
- Reference the local files in the body, such as `![Before](./before.png)` and `![After](./after.png)`, so the CLI replaces those references with the uploaded asset URLs.
- Check the command's help for availability in the installed CLI.

See [GitHub CLI attachments](https://docs.github.com/en/github-cli/github-cli/attaching-files-with-github-cli).

## Benchmarks

Always show a before/after table:

- **Baseline:** the target branch.
- **Candidate:** the PR.
