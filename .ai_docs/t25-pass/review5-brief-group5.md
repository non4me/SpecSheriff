# T25, stage 2, group 5: the check of round e

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What happened before

Four rounds of review are behind these drafts. Their reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`: `review-g5*.md` from the reviewers and `english-g5*.md` from the readers. The check of round d found every draft ready except item 46a. The author applied its reports with `fix-group5-e.mjs`, as `fix-brief-group5-e.md` says. The section "Round e" of `group5-notes.md` says, for each finding, what was done or why it was rejected. Do not argue a ruling of the briefs `fix-brief-group5-b.md` to `fix-brief-group5-e.md` again unless it contradicts an agreed node, a principle or a ruling that those briefs do not name.

One point stays with the owner: what values the `parts` source yields in a project without the Domains extension. The drafts carry the recommended answer, A. The question is in the "Round e" section of `group5-notes.md`, under «Вопрос ответственному».

## What to check

Your input file, `review-input-g5e.md`, holds two drafts:
- item 46a, `s-5nf87c3e3jg9v7c`, which round e changed to apply review d-d's findings 1 and 2;
- item 45, `s-c2r9jndrjbtbsv6`, whose paragraph on RecordTypes that name different fields in their `chosenBy` round e rewrote in three sentences of the author's own.

Everything that `review-brief-group5.md` asks for applies, in full, to each of them. Read that brief first. Then check in particular:
- that round e introduced no new defect. Compare each draft with its round-d text, which `tools-drafts.before-group5-e.json` holds;
- that review d-d's findings 1 and 2, and every finding of `review-g5d-c.md` and of the readers on these two drafts, were either applied or rejected for a reason that holds;
- that the question for the owner states every cost of each answer, in terms of what a person sees, and that item 46a carries answer A exactly as the question describes it. The question says that choosing A also renames "a part of the base specification" to "a folder of the base specification" in two agreed nodes. Check that this renaming changes the meaning of neither node.

A finding that only repeats a rejected finding of an earlier round is not a finding unless you show why the rejection does not hold. Mark as a nit any finding that a careful reader would not need fixed before the owner reads the node, and say why. A draft with only nits is ready.

## Your report

As `review-brief-group5.md` says: for each draft, the verdict (**ready** or **not ready**), each finding with the exact fix in English and Russian, every verdict line of the checklist, and the «Оценка» block in Russian. End with a list of the findings that only the owner can answer, if any.
