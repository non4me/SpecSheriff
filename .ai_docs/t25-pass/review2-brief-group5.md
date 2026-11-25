# T25, stage 2, group 5: the follow-up review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. This is the second review of these drafts. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What happened in the first review

Four reviewers and two of EngStickler's readers found only the draft of item 42 ready. Their reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`: `review-g5-a.md` to `review-g5-d.md`, `english-g5-fast.md` and `english-g5-thorough.md`. The author applied them with `fix-group5-b.mjs`, and the "Round b" section of `group5-notes.md` says, for each finding, what was done or why it was rejected. The author also gave the agreed `new:tools-1-project` its sid, `s-t9j29hppag2nren`, which changes no wording, so that item 43 can cite it.

The main session settled the points that the first reviewers left to the owner. `fix-brief-group5-b.md` gives each settlement and its basis. Do not argue a settlement again unless it contradicts an agreed node, a principle or a ruling that the brief does not name. Where it does, say which one, and whether only the owner can resolve it.

One point stays with the owner: what values the `parts` source yields in a project without the Domains extension. The drafts carry the recommended answer, A. The question is in `group5-notes.md` under «Вопрос ответственному». Check that the question is put in terms of what a person sees, that each option states its cost and every risk that remains, and that the drafts carry answer A exactly as the question describes it.

## What to check

Everything that `review-brief-group5.md` asks for applies, in full, to each draft in your input file: the checklist from `node .claude/vt/writing-rules.mjs`, the five criteria, the owner's rulings, the code, the Russian rendering, the terms and the citations. Read that brief first. Then check in particular:
- that every finding of the first review on each draft was either applied or rejected for a reason that holds;
- that round b introduced no new defect. Compare each draft with its round-a text, which `tools-drafts.before-group5-b.json` holds. The notes list the sentences that no report dictated, and these need the closest reading;
- that a proposal to change an agreed node changes only what its `change` field lists.

A finding that only repeats a rejected finding of the first review is not a finding unless you show why the rejection does not hold. Mark as a nit any finding that a careful reader would not need fixed before the owner reads the node, and say why. A draft with only nits is ready.

## Your report

As `review-brief-group5.md` says: for each draft, the verdict (**ready** or **not ready**), each finding with the exact fix in English and Russian, every verdict line of the checklist, and the «Оценка» block in Russian. End with a list of the findings that only the owner can answer, if any.
