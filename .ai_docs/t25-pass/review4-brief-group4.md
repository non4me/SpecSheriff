# T25, stage 2, group 4: the final review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. This is the fourth and final review of these drafts. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What happened before

Three rounds of review are behind these drafts. Their reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`: `review-g4-*.md`, `review-g4b-*.md` and `review-g4c-*.md` from the reviewers, and `english-g4*-fast.md` and `english-g4*-thorough.md` from the readers. The third review found five of the twelve drafts ready, and the rest close to it. The author applied its reports with `fix-group4-d.mjs`. The section "Round d" of `group4-notes.md` says, for each finding, what was done or why it was rejected. The main session's rulings are in `fix-brief-group4-b.md`, `fix-brief-group4-c.md` and `fix-brief-group4-d.md`. Do not argue a ruling again unless it contradicts an agreed node, a principle or a ruling that those briefs do not name.

One point stays with the owner: how `sheriff commit-message` judges a merge commit. The drafts carry the recommended answer, A. The question is in `group4-notes.md` under «Вопрос ответственному».

## What to check

Everything that `review-brief-group4.md` asks for applies, in full, to each draft in your input file. Read that brief first. Then check in particular:
- that every finding of the third review on each draft, in `review-g4c-*.md` and the readers' reports `english-g4c-*.md`, was either applied or rejected for a reason that holds;
- that round d introduced no new defect: compare each draft with its round-c text, which `tools-drafts.before-group4-d.json` holds;
- that a proposal to change an agreed node changes only what its `change` field lists.

A finding that only repeats a rejected finding of an earlier round is not a finding unless you show why the rejection does not hold. Mark as a nit any finding that a careful reader would not need fixed before the owner reads the node, and say why. A draft with only nits is ready.

## Your report

As `review-brief-group4.md` says: for each draft, the verdict (**ready** or **not ready**), each finding with the exact fix in English and Russian, every verdict line of the checklist, and the «Оценка» block in Russian. End with a list of the findings that only the owner can answer, if any.
