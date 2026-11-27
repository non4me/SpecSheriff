---
name: spec-init
description: Setting a repository up for SpecSheriff — its git hooks, the plugin declared for every clone, its settings and its own guidelines naming the owner. Use when a project takes up the method, before anything is written into its specification.
---

# spec-init

`sheriff` here is the command of the SpecSheriff tools this plugin carries:
`node "${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js"`.

1. Run `sheriff init` at the root of the repository and report what it prints: each file written,
   each one replaced because an earlier release of SpecSheriff wrote it, each file left as it was
   because it differs from what `sheriff init` would write, and what is left to do. Running it again
   changes nothing.
2. Ask the owner for each of the following that `sheriff.config.json` lacks, and write each answer
   there: the glob patterns that match the files holding the system's code, under the key `code`, and
   the files holding its tests, under the key `tests`, such as `src/**/*.ts` and `test/**/*.test.ts`;
   and the command that runs the tests, under the key `testCommand`. A pattern that is only a folder's
   name matches none of the files inside that folder.
3. The independent reviewer runs on each commit in which it has something to judge, at the user's
   expense, with the settings that the user's git configuration holds for its runner. For this plugin's
   runner, `claude`, the settings are `specsheriff.review.claudeModel` (default `opus`),
   `specsheriff.review.claudeFallbackModel` (default `sonnet`) and `specsheriff.review.claudeEffort`
   (default `high`), and the flag that records that the user has been asked about these settings is
   `specsheriff.review.claudeAsked`. Where `sheriff.config.json` names another runner as
   `review.runner`, use that runner's settings instead. Read each setting and the flag with `git config --get`. Where one
   is missing and the flag is not `true`, show the user the default of each missing setting and ask
   them to confirm it or name another. Write each value they give, including a default that they confirm, with
   `git config --global specsheriff.review.<setting> <value>`, and write nothing they have not given.
   Then set the flag to `true` with `git config --global`. Until a setting is written, each review
   uses its default and says so. A setting that the user set as an option of this plugin must be changed
   in `/config`, since at the start of each session the plugin overwrites that setting in the git
   configuration with the option's value.

To bring the project's existing documents into the specification, use the skill `spec-adopt`. To
approve the specification, or to change its other settings that only an owner changes, use the
skill `spec-settings`.
