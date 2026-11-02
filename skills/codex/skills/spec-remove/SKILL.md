---
name: spec-remove
description: Taking SpecSheriff out of a repository, the reverse of spec-init — its git hooks, the agent's hooks for Codex and its settings — leaving its specification as it is. Use when a project stops working by the method.
---

# spec-remove

`sheriff` here is the command of the SpecSheriff tools this plugin carries:
`node "<plugin>/tools/dist/cli.js"`, `<plugin>` being the directory
of this plugin, which holds this skill as `<plugin>/skills/<skill>/SKILL.md`.

1. Ask the owner to confirm that the project stops working by the method: once it is taken out, no
   check holds the specification, the tests and the code to one another, in any clone.
2. Run `sheriff remove` at the root of the repository and report what it prints: each hook and
   declaration removed, each left as it was because it differs from what `sheriff init` writes, and
   `specs/`, which stays as the project's own. Run again, it changes nothing.
3. A file left as it was is the owner's to settle: show them how it differs from what `sheriff init`
   writes, and change nothing in it yourself.
4. `sheriff remove` stages nothing. Commit what it changed once the owner agrees, so that every clone
   leaves the method with it.
5. Offer to remove the plugin from this machine as well, and run it only on the owner's word:
   `codex plugin remove specsheriff@specsheriff-marketplace`. The plugin is installed for the
   user, beyond this project, so every other project on this machine that takes the method loses it
   too.
