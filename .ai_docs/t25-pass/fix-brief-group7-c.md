# T25, stage 2, group 7: round c, the follow-up review applied

You apply the follow-up review of the drafts of group 7. The brief for group 7, `briefs/t25-group7-brief.md`, and the brief of round b, `fix-brief-group7-b.md`, still hold.

## What to read

The six reports in `D:/SpecSheriff/.ai_docs/t25-pass/`:
- `review-g7b-a.md` to `review-g7b-d.md`, the reports of the four specsheriff-rule-reviewer agents;
- `english-g7b-fast.md` and `english-g7b-thorough.md`, the findings of EngStickler's two readers.

Each file ends with the main session's decisions. Apply every finding that those decisions apply, in the words that the reports give. Where a reviewer replaces a whole sentence and a reader replaces a phrase in the same sentence, take the reviewer's sentence and apply the reader's phrase inside it where it still fits. Where the two readers' files give different words for one phrase, `english-g7b-thorough.md` wins.

## Points to take care over

- **Two new nodes.** Item 53 loses its sentence on `format`, which becomes the node "The validator of the RuntimeChecks" under the key `new:tools-17-validator`, with a new sid checked to be unique (review g7b-c, finding 1).
- **Q1 is restated once.** Findings 7 of review g7b-a and 4 of review g7b-b both rewrite what a person sees under option B: write it once, covering both.
- **Q2 cites s-mhsb6fjsq5xn6c9 "by analogy"** (review g7b-a, finding 8).
- **Item 56's nested `TypedDict`** is written once per RecordType that holds it, after every type that `sheriff types` writes for that RecordType (review g7b-d, G1). Write a nested `TypedDict` only where a type uses it, and say so in the node.
- **`sheriff show` with no argument** refuses to run; say so in its node, as show.ts does.
- **The notes:** record that once the owner answers Q2, the answer goes into the `meta.decisions` of the agreed draft "The commands that `sheriff` accepts" (s-f5rz6b7dhxejjts), and the doubt about the Views extension that this draft records is removed.

## What to write

1. `fix-group7-c.mjs`: on its first run, it copies `tools-drafts.json` to `tools-drafts.before-group7-c.json`; on every run, it rebuilds the group's keys from that copy. Run it twice, check that both runs give the same file, and check that no key outside the group differs from the copy.
2. `english-group7c.md`: the final English of every node and proposal that this round changes, each in full, under its key and title.
3. In `group7-notes.md`, a section "Round c" that says, for each finding of the six reports, how you applied it or why you did not. Update the two questions for the owner.
4. The owner's page, as group 6's round d did: `build-group7-ru.mjs` writes `group7-ru.json` with the Russian of the `stage3` notes, the removed passages and the approved wordings that the page shows; `group7-assessments.json` holds the «Оценка» of each key, five lines each; `gen-group7-page.mjs` writes `group7-page/index.html`, modelled on `gen-group6-page.mjs`. The page shows every node of the group in full, in English and in Russian, each proposal beside the agreed wording of its base, the list of the changes that only carry out a decision already made, and at the end the two questions for the owner, each with its recommendation, options and costs. The page has a dark background. Do not publish it.

Do not change anything under `specs/`, and do not touch `.ai_docs/INDEX.md`, `tasks.md` or `t25-one-thought.md`. Make no commit.

## Your final report

Short, in English: the keys changed or added, whether the page is built, and anything you could not settle.
