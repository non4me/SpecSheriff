# T25, stage 2, group 3: the review of round e

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. The owner will see each node once, in its final wording, on one page for the whole group. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

The setting is the same as in `review-brief-group3.md` in this folder. Read its sections "What the drafts are" and "How to review" first, and review the same way.

## What round e carries out

The owner was asked Q1: whether rewording a comment, or changing whitespace, in a file bound as a whole changes its code. The owner chose none of the options offered, and ruled on 2026-11-24:

> «Нужно подходить дифференцированно, в зависимости от реального эффекта правок. Правка форматирования должна считаться изменением, достойным внимания рецензента и ревьювера, только там, где это влияет на логику. Например, отступы в yaml — да, отступы в ts — нет. Правки в комментариях нужно проверять на соответствие (но не блокировать, а предупреждать) в случае проблем с ними. Опять же с исключением для SpecTag — он должен обеспечивать правильную связь.»

In English: the approach depends on the real effect of an edit. An edit to formatting counts as a change that deserves the reviewer's attention only where it affects the logic: indentation in YAML does, indentation in TypeScript does not. Edits to comments are checked for consistency, and a problem with them is a warning that blocks nothing. The exception is the SpecTag, which must keep the binding correct.

The owner then agreed to a new wording of `D:/SpecSheriff/docs/principles.md`, which the file now holds. In the section "Deterministic checks hold every participant to the contract", the independent reviewer also judges, for every commit that adds or changes a comment in the code, whether each such comment is consistent with the code that it describes and with the rules that this code implements. A finding of the reviewer about such a comment is only a warning. The owner accepted that a commit that changes only comments also starts a paid run of the reviewer.

The drafting agent carried out the ruling and the principle with `fix-group3-e.mjs`. The round-e section of `group3-notes.md` says what changed, and why. `english-group3-changed-e.md` lists the sentences that round e wrote. Your input file holds the drafts that round e changed or added, in their current wording. Each proposal that has a `base` is shown beside the agreed draft that it changes, and each other proposal beside the node's current wording.

## What to check

For each draft:

1. Check that it carries out the ruling and the principle, no more and no less. Check also that the drafts of round e agree with one another and with the drafts of group 3 that round e did not change.
2. Review the draft afresh and in full, with the checklist that `node .claude/vt/writing-rules.mjs` prints and the five criteria.
3. Write its «Оценка» block in Russian, with one line per criterion, named in the owner's words: согласованность, целостность, целесообразность, избыточность, недостаточность. Each line gives ✓ with the nodes the wording was compared with, or the problem found.
4. Where a sentence still needs a change, give the exact words to apply, in English and in Russian.

For a proposal, check that it changes only what its `change` field describes. Check also that each sentence it changes conforms to the rules on how a node is written.

Two choices of the drafting agent need your view:
- The formats that the SpecSheriff tools read for comments and whitespace, in a file bound as a whole, are named by file extension in "A line that changes the code" (`new:tools-7-2-changed-line`). They are not given descriptions, because in group 2's agreed nodes a description is what lets the tools find a file's symbols. Say whether this is the right home, and whether the choice holds against s-33fw3ga4ctd94dq, s-5qdjyf6t898rsd4 and the other nodes that rely on what a description covers.
- Which whitespace each format treats as significant is left to the code and its tests, and the node names indentation in Python and YAML only as examples. Say whether a reader, an agent in particular, can implement that without asking.

## Your report

In English, except for the «Оценка» blocks, which are in Russian. Keep it short. For each draft, give:
- its key, and the verdict: **ready** or **not ready**;
- each finding, with the words concerned and the fix in the exact words to apply, marked either as one the author can fix or as a question only the owner can answer;
- every verdict line of the checklist;
- the «Оценка» block.

End with the list of findings that only the owner can answer, if there are any.
