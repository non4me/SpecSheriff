# T25, stage 2, group 4: the third review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. This is the third review of these drafts. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What happened before

Two rounds of review found no draft ready. All their reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`:
- the first review: `review-g4-a.md` to `review-g4-d.md`, `english-g4-fast.md` and `english-g4-thorough.md`;
- the follow-up review: `review-g4b-a.md` to `review-g4b-d.md`, `english-g4b-fast.md` and `english-g4b-thorough.md`.

The author applied them with `fix-group4-b.mjs` and `fix-group4-c.mjs`. The sections "Round b" and "Round c" of `group4-notes.md` say, for each finding, what was done or why it was rejected. The main session's rulings on the points left to the owner are in `fix-brief-group4-b.md` and `fix-brief-group4-c.md`. Do not argue a ruling again unless it contradicts an agreed node, a principle or a ruling that those briefs do not name.

One point stays with the owner: how `sheriff commit-message` judges a merge commit. The drafts carry the recommended answer, A. The question is in `group4-notes.md` under «Вопрос ответственному».

## What to check

Everything that `review-brief-group4.md` asks for applies, in full, to each draft in your input file: the checklist from `node .claude/vt/writing-rules.mjs`, the five criteria, the owner's rulings, the code, the Russian rendering, the terms and the citations. Read that brief first. Then check in particular:
- that every finding of the follow-up review on each draft was either applied or rejected for a reason that holds;
- that round c introduced no new defect;
- that a proposal to change an agreed node changes only what its `change` field lists.

A finding that only repeats a rejected finding of an earlier round is not a finding unless you show why the rejection does not hold. Mark as a nit any finding that a careful reader would not need fixed before the owner reads the node, and say why.

## Your report

As `review-brief-group4.md` says: for each draft, the verdict (**ready** or **not ready**), each finding with the exact fix in English and Russian, every verdict line of the checklist, and the «Оценка» block in Russian. End with a list of the findings that only the owner can answer, if any.
