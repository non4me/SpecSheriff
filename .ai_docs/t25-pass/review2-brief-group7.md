# T25, stage 2, group 7: the follow-up review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. This is the second review of these drafts. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What happened in the first review

Four reviewers and two of EngStickler's readers found only the proposals on items 44 and 47, on generated copies and on what `sheriff reindex` changes nearly or fully ready. Their reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`: `review-g7-a.md` to `review-g7-d.md`, `english-g7-fast.md` and `english-g7-thorough.md`. Each report ends with the main session's decisions on it. The author applied them with `fix-group7-b.mjs`, and the "Round b" section of `group7-notes.md` says, for each finding, what was done or why it was rejected.

The main session settled the points that the first reviewers left open. `fix-brief-group7-b.md` gives each settlement and its basis:
- the map orders the domains as the diagram of the domains does, because the owner ruled so on 2026-11-14;
- item 56 gives a type to every schema that TypeScript and Python can express;
- item 53 is split, and the group gains proposals on "Project-wide settings" and on "The review of a commit";
- two questions go to the owner, and the drafts assume the recommended answer to each: a node that has no title, and `sheriff markdown` and `sheriff map` in a project that has not chosen the Views extension;
- the questions about the base specification wait until the review of the appendix of the tools is done, under the owner's rule "One part at a time". `group7-notes.md` lists nine of them.

Do not argue a settlement again unless it contradicts an agreed node, a principle or a ruling that the brief does not name. Where it does, say which one, and whether only the owner can resolve it.

## What to check

Everything that `review-brief-group7.md` asks for applies, in full, to each draft in your input file: the checklist from `node .claude/vt/writing-rules.mjs`, the five criteria, the owner's rulings, the code, the Russian rendering, the terms and the citations. Read that brief first. Then check in particular:
- that every finding of the first review on each draft was either applied or rejected for a reason that holds;
- that round b introduced no new defect. Compare each draft with its round-a text, which `tools-drafts.before-group7-b.json` holds. The notes list the sentences that no report dictated, such as the new rows of the table of item 56, and these need the closest reading;
- that a proposal to change an agreed node changes only what its `change` field lists;
- that each of the two questions for the owner, as `group7-notes.md` states it, gives the recommendation and its basis first, and each option with what a person sees and what it costs.

A finding that only repeats a rejected finding of the first review is not a finding unless you show why the rejection does not hold. Mark as a nit any finding that a careful reader would not need fixed before the owner reads the node, and say why. A draft with only nits is ready.

## Your report

As `review-brief-group7.md` says: for each draft, the verdict (**ready** or **not ready**), each finding with the exact fix in English and Russian, every verdict line of the checklist, and the «Оценка» block in Russian. End with a list of the findings that only the owner can answer, if any.
