---
name: spec
description: The guidelines this project's specification is kept and implemented by. Load it before writing or changing a node under specs/, a test, or code bound to the specification, and before answering how the specification works here.
---

# spec

`sheriff` here is the command of the SpecSheriff tools this plugin carries:
`node "<plugin>/tools/dist/cli.js"`, `<plugin>` being the directory
of this plugin, which holds this skill as `<plugin>/skills/<skill>/SKILL.md`.

Run `sheriff guide` and read what it prints, whole, before anything else. It is the guidelines as
they stand at this moment — the SpecSheriff guidelines every project shares, their base and the
appendix of the tools, and this project's own guidelines — every node with its wording and its links, and the figures counted
off the specification as it printed them. Work by them.

This skill holds nothing of the guidelines itself, so that it can never say less than they do, or
something else.

Where a rule's text leaves you unsure what it requires, `sheriff show <sid>` prints it with every
link it makes and receives. To work with the specification's owners on a node, use the skill
`spec-review`; to bring the project's existing documents into the specification, `spec-adopt`.
