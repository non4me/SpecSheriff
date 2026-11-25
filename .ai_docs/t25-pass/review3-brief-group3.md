# T25, stage 2, group 3: the final review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. The owner will see each node once, in its final wording, on one page for the whole group. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

The setting is the same as in `review-brief-group3.md` in this folder. Read its sections "What the drafts are" and "How to review" first, and review the same way.

## What this review checks

The confirming reviews' reports are `review-g3b-a.md` to `review-g3b-d.md`. The author applied them, together with the readers' reports `english-g3b-fast.md` and `english-g3b-thorough.md`, with `fix-group3-c.mjs`. The round-c section of `group3-notes.md` says what changed and why. `english-group3-changed-c.md` lists the sentences that round c wrote in the author's own words. Your input file holds the drafts in their current wording.

Round c added three proposals that no reviewer has read yet. Review each of them in full, as a new node:
- `proposal:new-tools-1-settings-g3`, a change to the agreed "Project-wide settings", so that the SpecSheriff tools read the bindings file;
- `proposal:s-gb8s9657a65hqmv-g3`, a change to the agreed node on what `sheriff reindex` changes in what an earlier release wrote;
- `proposal:row-10-1-35a`, a new row of table 10.1 after row 10.1.35, for the check that rule 8.4 describes.

For each draft:

1. Check that each fix that the confirming review gave for it is in place, word for word, or rejected for a reason that holds.
2. Check each sentence that round c wrote in the author's own words. It must keep the meaning of the node's Russian wording.
3. Review the draft afresh and in full, with the checklist that `node .claude/vt/writing-rules.mjs` prints and the five criteria.
4. Write its «Оценка» block in Russian, with one line per criterion, named in the owner's words: согласованность, целостность, целесообразность, избыточность, недостаточность. Each line gives ✓ with the nodes the wording was compared with, or the problem found.
5. Where a sentence still needs a change, give the exact words to apply, in English and in Russian.

For a proposal that has a `base`, compare it with the agreed draft that `base` names, which your input file shows. Check that it changes only what its `change` field describes. Check also that each sentence it changes still conforms to the rules on how a node is written.

Whoever reviews `proposal:s-9j2mmnuuwmx5ksn` also checks Q1, the group's one question for the owner, in `group3-notes.md`:
- Q1 is a question that only the owner can answer, and no earlier ruling settles it.
- Each option states what it costs, including any change that it makes to an agreed rule.
- The drafts written for the recommended answer agree with one another and with Q1's text.

## Your report

In English, except for the «Оценка» blocks, which are in Russian. Keep it short. For each draft, give:
- its key, and the verdict: **ready** or **not ready**;
- each finding, with the words concerned and the fix in the exact words to apply, marked either as one the author can fix or as a question only the owner can answer;
- every verdict line of the checklist;
- the «Оценка» block.

End with the list of findings that only the owner can answer, if there are any.
