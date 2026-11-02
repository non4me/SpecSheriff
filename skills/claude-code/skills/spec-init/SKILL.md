---
name: spec-init
description: Setting a repository up for SpecSheriff — its git hooks, the plugin declared for every clone, its settings and its own guidelines naming the owner. Use when a project takes up the method, before anything is written into its specification.
---

# spec-init

`sheriff` here is the command of the SpecSheriff tools this plugin carries:
`node "${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js"`.

1. Check that git names the owner's email, `git config user.email`: `sheriff init` names it as the
   specification's owner. Where it names nobody, ask the owner to set it.
2. Run `sheriff init` at the root of the repository and report what it prints: each file written,
   each one replaced because an earlier release of init wrote it, each file left as it was because it
   differs from what init would write, and what is left to do. Run again, it changes nothing.
3. A file left as it was is the owner's to settle: show them how it differs from what init would
   write, and change nothing in it yourself.
4. Ask the owner where the system's code lives, where its tests live and which command runs the
   tests, and write them into `sheriff.config.json`: `code` and `tests` as glob patterns of files,
   such as `src/**/*.ts` and `test/**/*.test.ts`, since a folder's name alone matches no file inside
   it; `testCommand` as the command.
5. The independent reviewer runs at every commit that changes code, at the user's cost, at the
   settings of its runner in the user's git configuration. For this plugin's runner, `claude`, they
   are `specsheriff.review.claudeModel` (default `opus`), `specsheriff.review.claudeFallbackModel`
   (default `sonnet`) and `specsheriff.review.claudeEffort` (default `high`), and the mark that the
   question was put is `specsheriff.review.claudeAsked`. Where `sheriff.config.json` names another
   runner as `review.runner`, take that runner's instead. Read each with `git config --get`. Where
   one is lacking and the mark is not `true`, show the user the default of each lacking setting and
   ask them to confirm it or name another; write each value they answer, the default included, with
   `git config --global specsheriff.review.<setting> <value>`, write nothing they have not answered,
   and then set the mark with `git config --global` to `true`. Until a setting is written, each
   review runs at its default and says so.
6. Commit what init wrote, so that every clone takes the git hooks and the plugin with it.

To bring the project's existing documents into the specification, use the skill `spec-adopt`.
