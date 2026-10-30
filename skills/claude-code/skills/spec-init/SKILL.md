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
   each file left as it was because it differs from what init would write, and what is left to do.
   Run again, it changes nothing.
3. A file left as it was is the owner's to settle: show them how it differs from what init would
   write, and change nothing in it yourself.
4. Ask the owner where the system's code lives, where its tests live and which command runs the
   tests, and write them into `sheriff.config.json` as `code`, `tests` and `testCommand`.
5. Commit what init wrote, so that every clone takes the git hooks and the plugin with it.

To bring the project's existing documents into the specification, use the skill `spec-adopt`.
