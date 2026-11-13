---
name: spec-review
description: How to work on the specification with its owners — proposing, showing and getting approved one node at a time. Use whenever a node is drafted, changed or put to an owner, and whenever an owner reviews a part of the specification.
---

# spec-review

A node is implemented only once one of its owners has approved it, and only its owners can. You are
the owner's colleague, not their clerk: you find what is wrong or missing and say so, you recommend,
and you never write into the specification what the owner has not seen. Load the skill `spec` first.
`sheriff` here is the command of the SpecSheriff tools this plugin carries:
`node "${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js"`.

## Before a node is shown

1. Draft it by the guidelines' section on how a rule is written, and weigh it against every rule it
   touches: what it contradicts, repeats or leaves uncovered.
2. Read it once more before anyone else does. Cut every word that carries no thought and no needed
   detail, but never a condition or a subject. Then look for the signals of a sentence holding more
   than one thought, or a node holding requirements carried out apart: a sentence over 25 words, a
   semicolon, a parenthesis holding a second thought, a paragraph of more than three sentences, a
   node of more than three requirements. Each signal is a reason to check, never a limit: rewrite
   what it finds unless it states one thought. A paragraph holds one main thought with its
   qualifications and the reasoning it rests on.
3. Have it checked apart: give a reviewer that did not write it — another agent, with the guidelines
   and the draft and nothing of your reasoning — the task of finding what is wrong with it. A
   finding that fixes the wording against the guidelines is applied; a doubt that would change what
   the node states goes to the owner with its reason, never written in unseen.
4. Write it to its file with its status `draft`. `sheriff guard` refuses an edit that leaves a node
   approved over a wording for which no approval stands.

## Naming

A name is proposed to the owners with the count behind it, and they decide. These are the rules it is
weighed by.

1. **A special name only for a real term.** A word gets a special name only where it names a
   procedure, an entity, a constant or a variable, and the same word also stands in the text in its
   ordinary sense. Anything else stays an ordinary word. A name nobody needs suggests a special
   meaning the word does not have.
2. **Confusion is counted, not guessed.** Read every occurrence of the word in the specification and
   the documents, and count those in another sense. Where the other sense stands in a few places and
   is itself loosely worded, rewrite those places and keep the word plain: "Node.js" for the runtime,
   "exit code" for "exit status".
3. **A name is one word, as concrete as possible.** Its words are joined, each opening with a capital:
   RecordType, SpecTag, RuntimeCheck. It says what the thing is, by its context of use or by what it
   holds, never only whose it is: SpecList would say only that a list belongs to the specification.
4. **A property is written through its object.** A property of an object that has a name of its own
   is written as the object's name, a dot and the property's key, in code font: `TextRule.list`,
   `RecordType.fields`, `meta.comments`. It gets a name of its own only where it is also used apart
   from its object, as NodeKind is.
5. **A value is written as the schema holds it**, in code font: `implements`, `one of`, `draft`.
6. **A position is said in words.** A thing already named keeps its name wherever it stands: "a
   RecordType of another domain", never DomainRecordType.

## Showing a node

- One node at a time, shown whole: its title, its location and sid, its text and its reason, the
  places that changed in bold. Never fragments of a node, never several nodes at once.
- Say in a few lines what changed and why, and what follows from it in other nodes.
- End with one question: whether it is approved. One question to a message.
- Go one part of the specification at a time. When every node of a domain is approved, go over the
  domain once more whole, for what reads wrong only beside the rest.
- A section and a domain's header are approved by nobody: their status is built from the nodes under
  them. Show them with those nodes, never for an approval of their own.

## When the owner approves

- Run `sheriff approve <sid>`. It records the approval under the email git is configured with and
  refuses where that is none of the node's owners — so it runs where the owner works. It rebuilds
  the status of every section and header after it.
- A node whose wording changes only to state what one of its owners approved in another node, or only
  by a replacement that changes no meaning, such as a renamed term or path, is not shown again:
  approve it in that owner's name and report it in a table, naming the node it follows from; the
  owner may withdraw the approval (s-67vekyup7y8smap).
- The decision goes to the `meta.decisions` of the node it settled: the date, the problem, the
  owner's ruling, `textual` where it changed the wording and `procedural` where not. Work put off
  goes to its `meta.todos`; an open problem not yet settled to its `meta.comments`, of type
  `problem`.

## What is never done

- A rule nobody asked for is not added, however natural it seems; propose it, with its reason.
- A status is never written `approved` by hand, and a node is never approved on your own judgement.
- A doubt is never settled by rewording quietly: it is put to the owner.
