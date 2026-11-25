# T25, stage 2, group 6: the review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What the drafts are

Group 6 covers items 48 to 50 of the order of the review in `D:/SpecSheriff/.ai_docs/t25-pass/stage2-inventory.md`. Its nodes belong to the appendix of the tools. They describe:
- how an approval of a node is recorded, the fingerprint of a node's wording, approving a node and withdrawing its approval, in a new section "The approvals of nodes";
- the entries of the settings that only an owner changes, approving the specification, and turning the `strict` flag on;
- withdrawing the choice of an extension;
- setting a repository up and taking SpecSheriff out of it.

The group also holds two proposals on agreed nodes that the group's subject exposes: one on what `sheriff reindex` changes in what an earlier release wrote, and one on how a project's own check is run while the `strict` flag is on.

All drafts are in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, under the keys that your input file names. Your input file shows each draft's English text, reason, examples and outgoing links, beside the node's current or agreed wording. The Russian rendering and the list of changes of each draft are in `tools-drafts.json`, in the fields `ru`, `ruTitle`, `ruReason` and `change`. The author's notes are in `group6-notes.md`.

The specification is being moved into a new form, kept in `D:/SpecSheriff/.ai_docs/t25-pass/moved/` until the review ends:
- `moved/specs/_guidelines/spec.json`, the base of the guidelines, including "The specification's approval status" (s-qzthyh7yqvfhsa2), the `strict` flag (s-q3pfzyaxvpr2zj2), and choosing and withdrawing an extension (s-9ttvcwpqkehm58g, s-j8y62pa9hzz6nwx);
- the extensions under `moved/specs/_guidelines/extensions/`;
- `moved/impl.json`, which maps each row of a table of checks to the nodes of the appendix that implement it.

The current appendix is `D:/SpecSheriff/specs/_guidelines/tools.json`. The drafts of items 1 to 47 in `tools-drafts.json`, which the owner agreed to by 2026-11-24, are binding: a draft that contradicts one is wrong. A proposal key with a `base` holds a newer agreed wording of the draft that `base` names, and that newer wording is the one in force.

Task T28, a later task of the same release, will move each approval into the node that it approves. The drafts describe what the agreed rules say now, and a finding that only anticipates T28 is not a finding.

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
- Check that a term keeps the meaning that the agreed nodes give it. In group 5, a draft gave "a part of the base specification" a second meaning, and the owner had to decide a renaming.

## Points to look at

The author settled these, and a reviewer may read the rules otherwise. Say for each that falls in your input whether the author's reading holds. Where it does not, say whether the rules and rulings settle the point another way, or whether only the owner can answer it:
- "How an approval is recorded" is split into the record, the fingerprint, approving and withdrawing, under a new section. The old sid stays with the record, because most agreed drafts cite it for the record.
- "Setting a repository up and taking SpecSheriff out of it" stays one node, because `sheriff remove` takes out exactly what `sheriff init` writes. `sheriff init` writes, as a draft, the rule on when the tests run, listing `push`, in place of the rule that approved the specification.
- One node gives the entries of all three settings that only an owner changes: `approvalStatus`, `strict` and `extensions`.
- Approving the specification runs the checks as if the whole specification were one commit that adds every node.
- A node depends on an extension through the extension's schema or through a link to a node in the extension's file.
- The two proposals on agreed nodes: say whether each changes only what its `change` field lists, and whether the defect it fixes is real.

## Your report

In English, except for the «Оценка» blocks, which are in Russian. Keep it short. For each draft, give:
- its key and title, and the verdict: **ready**, or **not ready**;
- each finding: the words concerned, what is wrong, and the fix in the exact words to apply, in English and, where the Russian changes, in Russian. Mark each finding as one the author can fix, or as a question only the owner can answer, with the reason;
- every verdict line of the checklist;
- its «Оценка» block in Russian, with one line per criterion, named in the owner's words: согласованность, целостность, целесообразность, избыточность, недостаточность. Each line gives ✓ with the nodes the wording was compared with, or the problem found. For избыточность and недостаточность, ✓ means that none was found.

End with a list of the findings that only the owner can answer, if any.
