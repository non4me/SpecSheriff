---
name: spec-remove
description: Taking SpecSheriff out of a repository, the reverse of spec-init — its git hooks, the plugin declared for every clone and its settings — leaving its specification as it is. Use when a project is to stop using SpecSheriff.
---

# spec-remove

`sheriff` here is the command of the SpecSheriff tools this plugin carries:
`node "${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js"`.

1. Ask the owner to confirm that the project will stop using SpecSheriff: once SpecSheriff is taken
   out, no check keeps the specification, the tests and the code consistent with one another, in any
   clone.
2. Run `sheriff remove` at the root of the repository and report what it prints: each hook and
   declaration removed, each left as it was because it differs from what `sheriff init` writes, and
   `specs/`, which stays as the project's own. Run again, it changes nothing.
3. A file left as it was is the owner's to settle: show them how it differs from what `sheriff init`
   writes, and change nothing in it yourself.
4. `sheriff remove` stages nothing. Commit what it changed once the owner agrees, so that every clone
   leaves the method with it.
5. Offer to remove the plugin from this machine as well, and run it only on the owner's word:
   `claude plugin uninstall specsheriff@specsheriff-marketplace`. The plugin is installed for the
   user, beyond this project, so every other project on this machine that takes the method loses it
   too.
