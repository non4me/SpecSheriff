# T25, stage 2, group 7: the review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What the drafts are

Group 7 covers items 51 to 56 of the order of the review in `D:/SpecSheriff/.ai_docs/t25-pass/stage2-inventory.md`. Its nodes belong to the appendix of the tools. They describe:
- how a node is written in Markdown, the human-readable export that `sheriff markdown` writes, and `sheriff show`, which prints one node;
- the map that `sheriff map` builds, and the diagram of the domains that rules 11.2.2 and 11.2.3 of the Domains extension describe;
- where the types and RuntimeChecks generated from the RecordTypes are written, what a RecordType generates, how a RecordType's variants refine it, and the type that the schema of a field gives.

The group also holds five proposals on agreed nodes:
- the list of commands cites the new nodes on `sheriff show` and `sheriff markdown`;
- items 44 and 47 cite item 56 for the forms in which a RecordType's `schema` names another RecordType;
- the migration of earlier releases writes `unevaluatedProperties: false` and `"type": "object"`;
- `sheriff binding` also refuses a missing or outdated entry in the bindings file for a file of RuntimeChecks.

All drafts are in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, under the keys that your input file names. Your input file shows each draft's English text, reason, examples and outgoing links, beside the node's current or agreed wording. The Russian rendering and the list of changes of each draft are in `tools-drafts.json`, in the fields `ru`, `ruTitle`, `ruReason` and `change`. The author's notes are in `group7-notes.md`.

The specification is being moved into a new form, kept in `D:/SpecSheriff/.ai_docs/t25-pass/moved/` until the review ends:
- `moved/specs/_guidelines/spec.json`, the base of the guidelines;
- the extensions under `moved/specs/_guidelines/extensions/`, in particular `views.json`, rules 11.2.2 and 11.2.3 of `domains.json`, and `recordtype.json` with table 12.12;
- `moved/impl.json`, which maps each row of a table of checks to the nodes of the appendix that implement it.

The current appendix is `D:/SpecSheriff/specs/_guidelines/tools.json`. The drafts of items 1 to 50 in `tools-drafts.json`, which the owner agreed to by 2026-11-25, are binding: a draft that contradicts one is wrong. A proposal key with a `base` holds a newer agreed wording of the draft that `base` names, and that newer wording is the one in force.

Task T28, a later task of the same release, will move each approval into the node that it approves. Task T29 will move the owner's viewer of the specification into the plugin. A finding that only anticipates T28 or T29 is not a finding.

## How to review

Read first:
- `D:/SpecSheriff/CLAUDE.md` and `D:/SpecSheriff/docs/principles.md`;
- `D:/SpecSheriff/.claude/vt/rules.md`, from "How a rule is proposed and worded" to the end;
- the last section of `moved/specs/_guidelines/spec.json`, on how a rule is written.

Then, for each draft:
- Run `node .claude/vt/writing-rules.mjs` in `D:/SpecSheriff` once, and give a verdict line for each rule it prints, applied to the whole node: ✓, or ✗ with the words that breach it.
- Assess the draft against the five criteria of the rule "Every wording is assessed against the whole specification before it is shown". Search `specs/`, `moved/` and `tools-drafts.json` for each term and each concept the draft uses, and read each node found. Do not rely on memory.
- Search the owner's rulings on the draft's subject: `D:/SpecSheriff/.ai_docs/t25-one-thought.md` (search it by sid and by title), the `meta.decisions` of each node concerned, and the `change` fields of the drafts. A finding that an earlier ruling settles is not a finding: cite the ruling.
- Check the code in `D:/SpecSheriff/skills/tools/src/` only to see whether the draft states what the SpecSheriff tools must do. Where the code does something else, the draft wins, and the author's notes must say what changes in stage 3.
- Check that the Russian rendering says everything the English says, with every nuance, and nothing more.
- Check each term against the vocabularies of the skill `specsheriff-terminology-review`. A term you question goes to the owner as a doubt.
- Check that each word that takes its meaning from the specification cites, at its first use in the node, the node that defines it, and that a link backs each citation.
- Check that a term keeps the meaning that the agreed nodes give it.
- For a decision about a data structure, check the draft against JSON Schema 2020-12 first, as the owner's rule "A decision about a data structure is weighed against JSON Schema first" requires.

## Points to look at

The author settled these, and a reviewer may read the rules otherwise. Say for each that falls in your input whether the author's reading holds. Where it does not, say whether the rules and rulings settle the point another way, or whether only the owner can answer it:
- The old node on the export is split in three: how a node is written in Markdown, the export, and `sheriff show`.
- `sheriff markdown` and `sheriff map` refuse to run where the project has not chosen the Views extension.
- The map no longer draws a branch for each level, and orders the domains' folders by code point. The diagram of the domains is a node of its own, covering rules 11.2.2 and 11.2.3, with a todo saying that no command draws it yet.
- `sheriff types` writes an entry in the bindings file for each JSON file of RuntimeChecks.
- In item 56, a `$ref` names a RecordType as `#` followed by its sid, and `identifierOf` holds the bare sid.
- No node of the group describes the check of a row of a table of checks, so none says whether it runs while the specification is a draft.
- The author lists seven questions for the base specification in `group7-notes.md`, under "Questions for the base specification". These questions wait until stage 2 ends, under the owner's rule "One part at a time". Say whether any draft in your input cannot be final until one of them is answered.
- The five proposals: say whether each changes only what its `change` field lists, and whether the defect it fixes is real.

## Your report

In English, except for the «Оценка» blocks, which are in Russian. Keep it short. For each draft, give:
- its key and title, and the verdict: **ready**, or **not ready**;
- each finding: the words concerned, what is wrong, and the fix in the exact words to apply, in English and, where the Russian changes, in Russian. Mark each finding as one the author can fix, or as a question only the owner can answer, with the reason;
- every verdict line of the checklist;
- its «Оценка» block in Russian, with one line per criterion, named in the owner's words: согласованность, целостность, целесообразность, избыточность, недостаточность. Each line gives ✓ with the nodes the wording was compared with, or the problem found. For избыточность and недостаточность, ✓ means that none was found.

End with a list of the findings that only the owner can answer, if any.
