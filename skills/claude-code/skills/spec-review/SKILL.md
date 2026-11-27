---
name: spec-review
description: How to work on the specification with its owners — proposing, showing and getting approved one node at a time. Use whenever a node is drafted, changed or put to an owner, and whenever an owner reviews a part of the specification.
---

# spec-review

A node is implemented only once one of its owners has approved it, and only its owners can approve it.
You are the owner's colleague, not the owner's clerk: you find what is wrong or missing, say so, and
recommend what to do about it. You never approve or implement what the owner has not seen, except a
node that the SpecSheriff guidelines let you approve on an owner's behalf (s-t5uw8zfxzhfdg86). Load the skill `spec` first. `sheriff` here is the command that runs the SpecSheriff tools this plugin carries:
`node "${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js"`.

## Before a node is shown

1. Draft it by the guidelines' section on how a rule is written, and weigh it against every rule it
   touches: what it contradicts, repeats or leaves uncovered.
2. Read it once more before anyone else does. Shorten each sentence as the rule on the length of a
   sentence says (s-v8pes6wsgnqbrxw): keep every condition and every exception, and never leave out a
   subject or a verb. Then look for the signs that a sentence holds more
   than one thought, or that a node holds requirements that can be implemented separately: a sentence over 25
   words, a semicolon, a remark in parentheses that adds a second thought, a paragraph of more than
   three sentences, a node with more than three requirements. Each sign is a reason to check, never a
   limit: rewrite the sentence or the node that a sign points to, unless it states one thought. A paragraph holds one main thought with its
   qualifications and the reasoning it rests on.
3. Have it checked apart: give a reviewer that did not write it — another agent, with the guidelines
   and the draft and nothing of your reasoning — the task of finding what is wrong with it. A
   finding that fixes the wording against the guidelines is applied; a doubt that would change what
   the node states goes to the owner with its reason, never written in unseen.
4. Place it in the narrowest section whose text covers what the draft governs. Where several rules
   concern the same matter and no section's text names it, propose to the owners a new section for
   those rules.
5. Write it to its file with its status set to `draft`. `sheriff guard` refuses an edit that leaves a node
   approved with a wording that no approval records.

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
3. **A name that the method coins is one word, as specific as possible.** It joins several words,
   each starting with a capital letter: RecordType, SpecTag, RuntimeCheck. It says what the thing is,
   by the context in which the thing is used or by what it holds, never only what it belongs to: SpecList would say only that a list belongs to the specification.
4. **A property is written with the name of its object**, as the rule on naming says (s-9w3u3wn37wksyxd). A
   property of an object that has a name of its own is written as the object's name, a dot and the
   property's key, in code font: `TextRule.list`, `RecordType.schema`, `meta.comments`. It gets a
   name of its own only where it is also used independently of its object.
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
- A node whose wording changes only in that it now states what one of its owners approved in another
  node, or only by a replacement that leaves the meaning unchanged, such as a renamed term or path,
  is not shown again: approve it on behalf of one of its owners and report it in a table, naming the node it follows from; the
  owner may withdraw the approval (s-67vekyup7y8smap).
- Approve on an owner's behalf, too, each node of the technical appendix that you wrote while
  implementing an approved rule of the base specification and that has an `implements` link to that
  rule, and report it in the same table (s-t5uw8zfxzhfdg86). The independent
  reviewer judges such a node in the commit that approves it.
- The decision goes to the `meta.decisions` of the node it settled: the date, the problem, the
  owner's ruling, `textual` where it changed the wording and `procedural` where not. Work put off
  goes to its `meta.todos`; an open problem not yet settled to its `meta.comments`, of type
  `problem`.

## What is never done

- A rule nobody asked for is not added, however natural it seems; propose it, with its reason.
- A status is never written `approved` by hand, and a node is never approved on your own judgement.
- A doubt is never settled by rewording quietly: it is put to the owner.
