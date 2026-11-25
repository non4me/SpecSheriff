# T25, stage 2, group 8: the follow-up review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. This is the second review of these drafts. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What happened in the first review

Four reviewers and two of EngStickler's readers found only the new row 10.1.37b ready. Their reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`: `review-g8-a.md` to `review-g8-d.md`, `english-g8-fast.md` and `english-g8-thorough.md`. Each report ends with the main session's decisions on it. The author applied them with `fix-group8-b.mjs`, and the "Round b" section of `group8-notes.md` says, for each finding, what was done or why it was rejected.

The main session settled the points that the first reviewers left open. `fix-brief-group8-b.md` gives each settlement and its basis:
- the drafts write "on a commit" and "on a push", as rules 10.2 and 10.12 do, and "the hook run when a session starts" as the one name of that hook;
- the node on the skills is split into four nodes: the list of the skills, `spec-init`, `spec-remove` and `spec-settings`;
- three questions go to the owner, and the drafts assume the recommended answer A to each: the order of the pre-commit hook against "right after the first step" in rule 10.12; whether `sheriff guard` judges only the nodes that an edit adds or changes; and the skills that no node describes;
- the owner's agreement to the group settles the first base question of round a, on Node.js missing, since the page shows the refusal that the approved node had;
- the remaining question about the base specification waits until the review of the appendix of the tools is finished, under the owner's rule "One part at a time".

Do not argue a settlement again unless it contradicts an agreed node, a principle or a ruling that the brief does not name. Where it does, say which one, and whether only the owner can resolve it.

## What to check

Everything that `review-brief-group8.md` asks for applies, in full, to each draft in your input file: the checklist from `node .claude/vt/writing-rules.mjs`, the five criteria, the owner's rulings, the code, the Russian rendering, the terms and the citations. Read that brief first. Then check in particular:
- that every finding of the first review on each draft was either applied or rejected for a reason that holds;
- that round b introduced no new defect. Compare each draft with its round-a text, which `tools-drafts.before-group8-b.json` holds. The three new nodes on `spec-init`, `spec-remove` and `spec-settings` had no first review, so read them as closely as a first review would;
- that a proposal to change an agreed node changes only what its `change` field lists;
- that each of the three questions for the owner, as `group8-notes.md` states it, gives the recommendation and its basis first, and each option with what a person sees and what it costs.

A finding that only repeats a rejected finding of the first review is not a finding unless you show why the rejection does not hold. Mark as a nit any finding that a careful reader would not need fixed before the owner reads the node, and say why. A draft with only nits is ready.

## Your report

As `review-brief-group8.md` says: for each draft, the verdict (**ready** or **not ready**), each finding with the exact fix in English and Russian, every verdict line of the checklist, and the «Оценка» block in Russian. End with a list of the findings that only the owner can answer, if any.
