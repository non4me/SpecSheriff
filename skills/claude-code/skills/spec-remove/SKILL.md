---
name: spec-remove
description: Taking SpecSheriff out of a repository, the reverse of spec-init — its git hooks, the plugin declared for every clone and its settings — leaving its specification as it is. Use when a project is to stop using SpecSheriff.
---

# spec-remove

`sheriff` here is the command of the SpecSheriff tools this plugin carries:
`node "${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js"`.

1. Run `sheriff remove` at the root of the repository and report what it prints: each hook and
   each declaration of the plugin removed, each one left as it was because it differs from what `sheriff init`
   writes, and `specs/` and `sheriff.bindings.json`, which stay because they belong to the project.
   Running it again changes nothing.
2. Offer to remove the plugin from this machine as well, with
   `claude plugin uninstall specsheriff@specsheriff-marketplace`, and run that command only when the
   owner agrees. The plugin is installed for the user, not only for this project, so every other
   project on this machine that uses the method loses it too.
