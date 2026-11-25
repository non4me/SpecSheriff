# T25, stage 2, group 1: the second review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What the drafts are

Group 1 covers items 9 to 19 of the order of the review in `D:/SpecSheriff/.ai_docs/t25-pass/stage2-inventory.md`. Its nodes belong to the appendix of the tools and describe checks that `sheriff validate` makes. All drafts are in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, under the keys your input file names. Your input file shows each draft's English text, reason, examples and outgoing links, beside the node's current wording where one exists. The Russian rendering and the list of changes of each draft are in `tools-drafts.json`, in the fields `ru`, `ruTitle`, `ruReason` and `change`.

The specification is being moved into a new form, which is kept in `D:/SpecSheriff/.ai_docs/t25-pass/moved/` until the review ends: `moved/specs/_guidelines/spec.json` (the main table of checks is table 10.1 in section 10, its rows are nodes in the table's cells), `moved/specs/_guidelines/extensions/domains.json` (table 11.3), `extensions/recordtype.json` (table 12.12) and `moved/impl.json`, which maps each row of a table of checks to the nodes of the appendix that implement it. The current appendix is `D:/SpecSheriff/specs/_guidelines/tools.json`. The drafts of items 1 to 8 in `tools-drafts.json` are agreed by the owner and binding.

## This is the second review

The first review's reports are `review-g1-a.md` to `review-g1-d.md` in the same folder. The author's answer to each finding is in `group1-notes.md`, under "The drafts and what changed in round b" and "The proposals, and the questions only the owner can answer". The author applied the findings with `fix-group1-b.mjs`.

1. For every finding of the earlier report that concerns your drafts, check that it is addressed: fixed in the draft, or rejected for a reason that holds. Name each finding that is not addressed.
2. Then review each draft afresh and in full, as if no review had taken place. A finding the earlier report missed is still a finding.

## How to review

Read first:
- `D:/SpecSheriff/CLAUDE.md` and `D:/SpecSheriff/docs/principles.md`;
- `D:/SpecSheriff/.claude/vt/rules.md`, from "How a rule is proposed and worded" to the end;
- the last section of `moved/specs/_guidelines/spec.json`, on how a rule is written.

Then, for each draft:
- Run `node .claude/vt/writing-rules.mjs` in `D:/SpecSheriff` once, and give a verdict line for each rule it prints, applied to the whole node: ✓, or ✗ with the words that breach it.
- Assess the draft against the five criteria of the rule "Every wording is assessed against the whole specification before it is shown": consistency, integrity, justification, redundancy and insufficiency. Search `specs/`, `moved/` and `tools-drafts.json` for each term and each concept the draft uses, and read each node found. Do not rely on memory.
- Search the owner's rulings on the draft's subject: `D:/SpecSheriff/.ai_docs/t25-one-thought.md` (search it by sid and by title), the `meta.decisions` of each node concerned, and the `change` fields of the drafts. A finding that an earlier ruling settles is not a finding: cite the ruling.
- Check the code that makes the check, in `D:/SpecSheriff/skills/tools/src/`, only to see whether the draft states what the tools must do. Where the code does something else, the draft wins, and the author's notes must say what changes in stage 3.
- Check that the Russian rendering says everything the English says, with every nuance, and nothing more.
- Check each term against the vocabularies of the skill `specsheriff-terminology-review`. A term you question goes to the owner as a doubt.

For a key that begins with `proposal:`, the draft is a proposal that the owner will be asked about, and its question is in the draft's `question` field and in `group1-notes.md`. Check also that the question is one only the owner can answer, that no earlier ruling already settles it, that each option states what it costs, and that the wording proposed would be final if the owner accepted it.

## Your report

In English, short. For each draft:
- its key and title, and the verdict: **ready**, or **not ready**;
- the earlier findings not addressed;
- each new finding: the words concerned, what is wrong, and the fix you propose. Mark each finding as one the author can fix, or as a question only the owner can answer, with the reason;
- the verdict lines of the checklist, all of them.

End with a list of the findings that only the owner can answer, if any.
