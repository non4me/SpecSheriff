# T25, stage 2, group 3: the review of round f

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. The owner will see each node once, in its final wording, on one page for the whole group. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

The setting is the same as in `review-brief-group3.md` in this folder. Read its sections "What the drafts are" and "How to review" first, and review the same way. Read also the section "What round e carries out" of `review4-brief-group3.md`: it gives the owner's ruling of 2026-11-24 and the new wording of `D:/SpecSheriff/docs/principles.md` that the drafts carry out.

## What round f changed

The reviews of round e are `review-g3e-a.md` and `review-g3e-b.md`, and the readers' reports on round e are `english-g3e-fast.md` and `english-g3e-thorough.md`. The drafting agent applied them with `fix-group3-f.mjs`. The round-f section of `group3-notes.md` says what changed and why. `english-group3-changed-f.md` lists the sentences that round f wrote.

The main changes:
- **Syntax trees.** Whether a commit changes code is now decided by comparing the syntax trees of the two versions, not lines. That was review A's proposal, and the main session accepted it. "How two versions of code are compared" (`new:tools-7-2-changed-line`, s-u6mj5yv8ngnz79v) states it, and `s-2x58az67bm6cxq2` rests on it.
- **Rule 1.6.1 (s-m4h279nbaqkpa3t) is split** under rule 7.3.3, as group 2's notes, items 11 and 12, required for the next time the rule changed. It keeps its sid and the reviewer's judgements. Three new nodes hold the rest: `proposal:new-spec-1-6-checks`, `proposal:new-spec-1-6-runs` and `proposal:new-spec-1-6-tests`. Your input shows them as new. Compare all four with the agreed rule 1.6.1 in `moved/specs/_guidelines/spec.json`: every agreed sentence must be in one of them, unchanged unless the `change` field lists the change.

## What to check

For each draft in your input file:

1. Check that each fix that the reviews of round e gave for it is in place, word for word, or rejected for a reason that holds.
2. Check each sentence that round f wrote in the author's own words. It must keep the meaning of the node's Russian wording, and it must carry out the owner's ruling and the principle, no more and no less.
3. Review the draft afresh and in full, with the checklist that `node .claude/vt/writing-rules.mjs` prints and the five criteria.
4. Write its «Оценка» block in Russian, with one line per criterion, named in the owner's words: согласованность, целостность, целесообразность, избыточность, недостаточность. Each line gives ✓ with the nodes the wording was compared with, or the problem found.
5. Where a sentence still needs a change, give the exact words to apply, in English and in Russian.

For a proposal, check that it changes only what its `change` field describes. Check also that each sentence it changes conforms to the rules on how a node is written.

## Your report

In English, except for the «Оценка» blocks, which are in Russian. Keep it short. For each draft, give:
- its key, and the verdict: **ready** or **not ready**;
- each finding, with the words concerned and the fix in the exact words to apply, marked either as one the author can fix or as a question only the owner can answer;
- every verdict line of the checklist;
- the «Оценка» block.

End with the list of findings that only the owner can answer, if there are any.
