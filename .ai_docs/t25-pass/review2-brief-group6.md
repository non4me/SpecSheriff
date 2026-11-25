# T25, stage 2, group 6: the follow-up review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. This is the second review of these drafts. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What happened in the first review

Four reviewers and two of EngStickler's readers found only the section node "The approvals of nodes" ready. Their reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`: `review-g6-a.md` to `review-g6-d.md`, `english-g6-fast.md` and `english-g6-thorough.md`. The author applied them with `fix-group6-b.mjs`, and the "Round b" section of `group6-notes.md` says, for each finding, what was done or why it was rejected.

The main session settled the points that the first reviewers left open. `fix-brief-group6-b.md` gives each settlement and its basis. Three of them belong to the base specification and are recorded for after the review of the appendix of the tools, under the owner's rule "One part at a time": no rule of the base on taking the method out, whether a node's kind is part of its wording, and whether withdrawing a `TableRule`'s approval should also withdraw its cells' approvals. Do not argue a settlement again unless it contradicts an agreed node, a principle or a ruling that the brief does not name. Where it does, say which one, and whether only the owner can resolve it.

## What to check

Everything that `review-brief-group6.md` asks for applies, in full, to each draft in your input file: the checklist from `node .claude/vt/writing-rules.mjs`, the five criteria, the owner's rulings, the code, the Russian rendering, the terms and the citations. Read that brief first. Then check in particular:
- that every finding of the first review on each draft was either applied or rejected for a reason that holds;
- that round b introduced no new defect. Compare each draft with its round-a text, which `tools-drafts.before-group6-b.json` holds. The notes list the sentences that no report dictated, and these need the closest reading;
- that a proposal to change an agreed node changes only what its `change` field lists.

A finding that only repeats a rejected finding of the first review is not a finding unless you show why the rejection does not hold. Mark as a nit any finding that a careful reader would not need fixed before the owner reads the node, and say why. A draft with only nits is ready.

## Your report

As `review-brief-group6.md` says: for each draft, the verdict (**ready** or **not ready**), each finding with the exact fix in English and Russian, every verdict line of the checklist, and the «Оценка» block in Russian. End with a list of the findings that only the owner can answer, if any.
