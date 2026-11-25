# T25, stage 2, group 4: the review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What the drafts are

Group 4 covers items 33 to 40 of the order of the review in `D:/SpecSheriff/.ai_docs/t25-pass/stage2-inventory.md`. Its nodes belong to the appendix of the tools. They describe:
- how a project's own check is run;
- a location, and a citation, outside the specification;
- generated copies against the nodes;
- an approved rule whose tests or code lag behind it;
- an approved rule without code or a test;
- the nodes that a commit message must name;
- the tests run before a push.

Group 4 also holds one proposal to change the agreed draft `new:tools-1-project`.

All drafts are in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, under the keys that your input file names. Your input file shows each draft's English text, reason, examples and outgoing links, beside the node's current wording or, for a proposal with a `base`, beside the agreed draft that it changes. The Russian rendering and the list of changes of each draft are in `tools-drafts.json`, in the fields `ru`, `ruTitle`, `ruReason` and `change`. The author's notes are in `group4-notes.md`.

The specification is being moved into a new form, kept in `D:/SpecSheriff/.ai_docs/t25-pass/moved/` until the review ends:
- `moved/specs/_guidelines/spec.json`: the main table of checks is table 10.1 in section 10, and its rows are nodes in the table's cells;
- the extensions under `moved/specs/_guidelines/extensions/`;
- `moved/impl.json`, which maps each row of a table of checks to the nodes of the appendix that implement it.

The current appendix is `D:/SpecSheriff/specs/_guidelines/tools.json`. The drafts of items 1 to 32 in `tools-drafts.json`, which the owner agreed to on 2026-11-24, are binding: a draft that contradicts one is wrong. A proposal key with a `base` holds a newer agreed wording of the draft that `base` names, and that newer wording is the one in force. `D:/SpecSheriff/docs/principles.md` changed on 2026-11-24: the independent reviewer also judges each comment that a commit adds or changes, and a finding about a comment is only a warning.

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

For a proposal, check that it changes only what its `change` field describes, and that each sentence it changes conforms to the rules on how a node is written.

## Points to look at

The author settled these, and a reviewer may read the rules otherwise. Say for each that falls in your input whether the author's reading holds. Where it does not, say whether the rules and rulings settle the point another way, or whether only the owner can answer it:
- Row 10.1.39b gets no node of its own, because the agreed "What `sheriff types` generates" (s-a8fn72xa782wvbk) already names those nodes and links to that row.
- Item 37 moves to `sheriff commit-message` and to section 7.3, because it needs the trailer that only the commit message holds. "The approved wording changes" is read as: the commit leaves the rule approved in a wording other than its last approved one, compared by fingerprint.
- Item 33 runs a project's own checks after the schema validation and before the other checks of `sheriff validate` (rule 10.12). It defines `--strict`, reads the member's `onFailure` property, and adds one refusal: a check that changes a file.
- Item 39 drops the refusal of a sid that names no node, because no row of table 10.1 requires it.
- Item 40 reads where the tests run from a rule of `project.json` that refines s-x8uzc8z44pwtd3h. That is why the proposal on `new:tools-1-project` exists. A push that only deletes refs no longer runs the tests.
- Item 38 leaves out everything under `specs/_guidelines/`, which in the repository where the guidelines are written includes the appendix of the tools.

## Your report

In English, except for the «Оценка» blocks, which are in Russian. Keep it short. For each draft, give:
- its key and title, and the verdict: **ready**, or **not ready**;
- each finding: the words concerned, what is wrong, and the fix in the exact words to apply, in English and, where the Russian changes, in Russian. Mark each finding as one the author can fix, or as a question only the owner can answer, with the reason;
- every verdict line of the checklist;
- its «Оценка» block in Russian, with one line per criterion, named in the owner's words: согласованность, целостность, целесообразность, избыточность, недостаточность. Each line gives ✓ with the nodes the wording was compared with, or the problem found. For избыточность and недостаточность, ✓ means that none was found.

End with a list of the findings that only the owner can answer, if any.
