# T25, stage 2, group 4: the confirming review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. This is the second review of these drafts. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What happened in the first review

Four reviewers and two of EngStickler's readers found no draft ready. Their reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`: `review-g4-a.md` to `review-g4-d.md`, `english-g4-fast.md` and `english-g4-thorough.md`. The author applied them with `fix-group4-b.mjs`, and the "Round b" section of `group4-notes.md` says, for each finding, what was done or why it was rejected.

The main session settled the points that the first reviewers left to the owner. `fix-brief-group4-b.md` gives each settlement and its basis. Do not argue a settlement again unless it contradicts an agreed node, a principle or a ruling that the brief does not name. Where it does, say which one, and whether only the owner can resolve it. The settlements added these drafts to the group:
- `proposal:row-10-1-37a`, a new row 10.1.37a of table 10.1;
- `proposal:s-pcnyfp7gev7syax-g4`, a new wording of rule 10.12;
- `proposal:row-10-1-41-g4`, a new wording of row 10.1.41.

One point stays with the owner: how `sheriff commit-message` judges a merge commit. The drafts carry the recommended answer, A. The question is in `group4-notes.md` under «Вопрос ответственному». Check that the question is put in terms of what a developer sees, that each option states its cost, and that the drafts carry answer A exactly as the question describes it.

## What to check

Everything that `review-brief-group4.md` asks for applies, in full, to each draft in your input file: the checklist from `node .claude/vt/writing-rules.mjs`, the five criteria, the owner's rulings, the code, the Russian rendering, the terms and the citations. Read that brief first. Then check in particular:
- that every finding of the first review on each draft was either applied or rejected for a reason that holds;
- that the fixes introduced no new defect, such as a broken citation, a sentence with two thoughts, or a Russian sentence that says more or less than the English;
- that a proposal to change an agreed node changes only what its `change` field lists, and that each listed change is needed.

A finding that only repeats a rejected finding of the first review is not a finding unless you show why the rejection does not hold.

## Your report

As `review-brief-group4.md` says: for each draft, the verdict (**ready** or **not ready**), each finding with the exact fix in English and Russian, every verdict line of the checklist, and the «Оценка» block in Russian. End with a list of the findings that only the owner can answer, if any.
