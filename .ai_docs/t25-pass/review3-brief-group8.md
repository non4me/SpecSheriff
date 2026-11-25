# T25, stage 2, group 8: the final review of round c

You make the last check of the drafts of group 8 before the owner sees them. Do not edit any file: your final message is your report.

Two reviews have already been applied, in rounds b and c. Their reports are `review-g8-a.md` to `review-g8-d.md` and `review-g8b-a.md` to `review-g8b-d.md`, in `D:/SpecSheriff/.ai_docs/t25-pass/`. The decisions on the first review are at the end of each of its reports. The decisions on the follow-up review are in `fix-brief-group8-c.md`. The sections "Round b" and "Round c" of `group8-notes.md` say what each round did.

## What to check

1. **Every sentence that round c changed.** Compare each key of the group in `tools-drafts.json` with the same key in `tools-drafts.before-group8-c.json`, and check each changed sentence, in English and in Russian, for a new defect. Check it against the checklist that `node .claude/vt/writing-rules.mjs` prints when you run it in `D:/SpecSheriff`, the five criteria and the owner's rulings, as `review-brief-group8.md` asks. `english-group8c.md` holds the final English of every key that round c changed.
2. **The negative statements that round c kept.** The notes say why each remains. Check that each reason holds under the owner's rule "A rule says what holds".
3. **The reason of s-n76wt2bkqdmh78x**, which round c restored after reading Codex's documentation. Check that it states what that documentation says now.
4. **The three questions for the owner** in `group8-notes.md`: each gives the recommendation and its basis first, and each option with what a person sees, what it costs and what risk remains.

A finding that repeats a finding that an earlier round rejected for a stated reason is not a finding. Mark as a nit any finding that a careful reader would not need fixed before the owner reads the node. A draft with only nits is ready.

## Your report

In English. For each draft with a finding: its key, the verdict (**ready** or **not ready**), and each finding with the exact fix in English and Russian. Then say which drafts you found ready. End with the findings that only the owner can answer, if any.
