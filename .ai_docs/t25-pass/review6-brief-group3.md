# T25, stage 2, group 3: the check of round g

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. The owner will see each node once, in its final wording, on one page for the whole group. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

The setting is the same as in `review-brief-group3.md` in this folder. Read its sections "What the drafts are" and "How to review" first. Read also the section "What round e carries out" of `review4-brief-group3.md`: it gives the owner's ruling of 2026-11-24 and the new wording of `D:/SpecSheriff/docs/principles.md` that the drafts carry out.

## What to check

Round g, `fix-group3-g.mjs`, applied the reviews of round f (`review-g3f-a.md` to `review-g3f-c.md`). Most of its changes are the reviewers' own words. Your input file holds the drafts in which round g wrote something of its own:
- `proposal:row-10-1-43`, a new proposal on row 10.1.43, which leaves the files generated from the specification out of the judgement on code, as the proposal on rule 1.6.1 (s-m4h279nbaqkpa3t) now does;
- `proposal:s-vp24dqydygztqbt`, in which round g dropped "also" from the sentence on what `sheriff review` refuses while the specification is a draft;
- `proposal:s-94k7b6r5kf65udf`, a new proposal on the last example of rule 10.5, in review C's words.

For each draft:

1. Review it afresh and in full, with the checklist that `node .claude/vt/writing-rules.mjs` prints and the five criteria. Compare it with the agreed wording beside it, and with the proposal on rule 1.6.1 and `new:tools-10-verdict` in `tools-drafts.json`.
2. Check that a proposal changes only what its `change` field describes.
3. Write its «Оценка» block in Russian, with one line per criterion, named in the owner's words: согласованность, целостность, целесообразность, избыточность, недостаточность. Each line gives ✓ with the nodes the wording was compared with, or the problem found.
4. Where a sentence still needs a change, give the exact words to apply, in English and in Russian.

## Your report

In English, except for the «Оценка» blocks, which are in Russian. Keep it short. For each draft, give its key and the verdict, **ready** or **not ready**, each finding with the fix in the exact words to apply, every verdict line of the checklist, and the «Оценка» block. End with the list of findings that only the owner can answer, if there are any.
