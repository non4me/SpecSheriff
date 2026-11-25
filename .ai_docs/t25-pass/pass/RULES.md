# Rewriting the SpecSheriff guidelines: the rules of the pass

You rewrite the `title`, `text` and `reason` of nodes of the SpecSheriff guidelines so that they follow the
rules below. **You change no meaning.** The owner approves these rewrites in one table, trusting that nothing
but the wording moved; a meaning changed silently is the worst defect you can make.

## 1. What must not change

- Every requirement, condition, exception, example, value and list member stays. Nothing is added.
- Every citation `§s-…` stays, each sid as many times as it is needed for the thought, at least once.
- Text in backticks stays letter for letter, except the kind values renamed below.
- A markdown table stays a table, its rows and cells as they are, except names renamed below.
- Only `title`, `text` and `reason` are rewritten. Never touch `sid`, `refs`, `list`, `meta`, `fields`.
- Where a rewrite would force a choice between two readings of the original, do not choose: keep the
  original sentence and report it under `doubts`.

## 2. One thought to a sentence, the main one first (rule 6.3 of the guidelines)

- Each sentence states one thought: one statement that can be agreed with or disputed on its own. Where
  one part of a sentence could hold while another does not, they are two thoughts and two sentences.
- A node's text opens with its main thought in a short sentence. Its qualifications follow.
- More than one qualification of one kind (conditions, exceptions, steps, cases) stands as a bulleted
  list in the text: lines opening with `- `, after a sentence that introduces them.
- Reasoning, where one thing follows from another, stays sentences.
- A reason opens with the ground its rule rests on.
- Signals to check (not limits): a sentence over 25 words, a semicolon, a parenthesis holding a second
  thought, a paragraph of more than three sentences. Rewrite unless it states one thought.
- A paragraph holds one main thought with its qualifications and the reasoning it rests on. Paragraphs
  are separated by a blank line (`\n\n`).
- Cut every word that carries no thought and no needed detail. Never cut a condition or a subject.

## 3. What is applied together stands together (rule 6.4)

Do not split or merge nodes. Where a node holds a requirement that can be carried out rightly without the
other requirements of the node, report it under `split` (what the parts are). A main thought and its
qualifications count as one requirement.

## 4. Names (settled by the owner on 2026-11-07)

- The kind values are `header` (was `domain`), `section`, `TextRule` (was `rule`), `term`, `RecordType`
  (was `recordType`). Where the text names the kind value itself (in backticks, or "the kind rule"), use
  the new value. **The word "rule" stays "rule"** everywhere else: it is an ordinary word for any node
  that requires something. Do not turn "rule" into TextRule.
- **NodeKind** names the concept "kind of node": "a project's own kind of node", "a node's kind", "the
  kinds of node" → "a project's own NodeKind", "a node's NodeKind", "the NodeKinds". Where "kind" means
  an ordinary sort ("the kind of control", "of one kind"), write "sort" or rephrase.
- **RuntimeCheck** names the runtime checks generated from the RecordTypes: "the types and runtime
  checks" → "the types and RuntimeChecks", "a runtime check" → "a RuntimeCheck". The word "check" alone
  stays: it is the method's check.
- A property is written through its object, in backticks, where the text speaks of the property:
  a rule's list → `TextRule.list` (its parts `members`, `declaredIn`, `of`); a RecordType's fields →
  `RecordType.fields`; a node's decisions, todos, comments, lists of code and tests → `meta.decisions`,
  `meta.todos`, `meta.comments`, `meta.code`, `meta.tests`. A single item stays a word: "a decision",
  "an item of `meta.todos`", "a field". Do not overuse the notation: once a paragraph has named the
  property, "it" or "the list" may follow.
- Values as the schema holds them, in backticks: link types (`implements`, `refines`, `constrains`,
  `consumes`, `supersedes`, `exempts`, `cites`, `term-relation`, `uses`), field types (`text`, `one of`,
  `list of`, `identifier of`, `variant`, …), statuses (`draft`, `approved`). "A field of type one of" →
  "a field of type `one of`"; "a cites link" → "a `cites` link". An ordinary verb stays a verb: "a node
  of the appendix implements a node of the base" stays.
- Everything else stays an ordinary word: node, rule, section, term, domain, header, container,
  contracts, guidelines, tools, owner, check, test, list, field, approval, status, location.

Rewrite these rare other senses where you meet them:
- the runtime Node → "Node.js"; "an exit status" → "an exit code";
- "reads the arguments by rules of its own" (a shell) → "by its own syntax";
- "in neutral terms" → "in neutral words"; "on the same terms" → "in the same way";
- "A SpecTag links a symbol to the node" → "binds"; "cut the links between them" → "the connections";
- "the owners' decision" or "the decision to set it aside" in the ordinary sense → "choice";
- "a reviewer cannot tell" (any reader) → "a reader";
- a domain "owning" data ("two owners of it", "has no owner") → reworded without "owner";
- fields of the node schema ("a separate field of the same node", "fields of an existing kind") →
  "property", "properties".

## 5. The rest of section 6 still holds

English; a named subject; no count in prose; a general word carries its object; no phrase of three words
or more in capitals; a reason gives its grounds and nothing more and is no narrower than its rule.

## 6. Output

Write one JSON file, the path your task names: an object keyed by sid. For every node you were given:

```json
{
  "s-…": {
    "title": "…", "text": "…", "reason": "…",
    "changed": true,
    "doubts": ["…"],
    "split": "…"
  }
}
```

- Give `title`, `text` and `reason` whole, as they should stand (a node without a reason: omit `reason`).
- `changed`: false where the node already follows every rule; then copy the three fields unchanged.
- `doubts`: each place you kept as it was because rewriting it would choose a reading, or anything you
  could not settle. Empty list where none.
- `split`: omit unless the node holds requirements carried out apart; then say what they are.
- Strings are JSON strings: `\n` for a line break, `\n\n` between paragraphs.

Finally reply with a short summary: how many nodes changed, how many doubts, how many splits.
