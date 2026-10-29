---
name: spec-review
description: How to work on the specification with its owner — proposing, showing and getting confirmed one node at a time, in the owner's language. Use whenever a node is drafted, changed or put to the owner, and whenever the owner reviews a part of the specification.
---

# spec-review

A node is implemented only once its owner has confirmed it, and only its owner can. You are the
owner's colleague, not their clerk: you find what is wrong or missing and say so, you recommend, and
you never write into the specification what the owner has not seen. Load the skill `spec` first.

## The owner's language

The owner reads each node in English, above a reading in their own language. The language and the
renderings of terms are kept in `.claude/spec-review.md`:

```markdown
Language: <the owner's language>

| Term | Rendered | Whose |
|---|---|---|
| owner | owner | the owner, <date> |
```

Where the file is missing, ask the owner their language and write it, with an empty table. A term is
rendered only by a row the owner gave; without one, keep the English term as it is in the reading.
A rendering the owner gives goes into the table the same turn.

## Before a node is shown

1. Draft it by the guidelines' section on how a rule is written, and weigh it against every rule it
   touches: what it contradicts, repeats or leaves uncovered.
2. Have it checked apart: give a reviewer that did not write it — another agent, with the guidelines
   and the draft and nothing of your reasoning — the task of finding what is wrong with it. A
   finding that fixes the wording against the guidelines is applied; a doubt that would change what
   the node states goes to the owner with its reason, never written in unseen.
3. Write it to its file with its status `""`. `sheriff guard` refuses an edit that leaves a node
   checked over a wording its owner never confirmed.

## Showing a node

- One node at a time, shown whole: its title, its address and sid, its text and its reason in
  English, the places that changed in bold; then the same in the owner's language. Never fragments
  of a node, never several nodes at once.
- Say in a few lines what changed and why, and what follows from it in other nodes.
- End with one question: whether it is confirmed. One question to a message.
- Go one part of the specification at a time. When every node of a domain is confirmed, go over the
  domain once more whole, for what reads wrong only beside the rest.

## When the owner confirms

- Run `npx sheriff confirm <sid>`. It records the confirmation under the email git is configured
  with and refuses where that is not the node's owner — so it runs where the owner works.
- A change made only to carry out what the owner already confirmed elsewhere is not shown again:
  confirm it and report it in a table, naming the node it follows from. So is a purely technical
  replacement that changes no meaning, such as a renamed term or path.
- The decision goes to the `meta.decisions` of the node it settled: the date, the problem, the
  owner's ruling, `textual` where it changed the wording and `procedural` where not. Work put off
  goes to its `meta.todos`; an open problem not yet settled to its `meta.comments`, of type
  `problem`.

## What is never done

- A rule nobody asked for is not added, however natural it seems; propose it, with its reason.
- A status is never written `checked` by hand, and a node is never confirmed on your own judgement.
- A doubt is never settled by rewording quietly: it is put to the owner.
