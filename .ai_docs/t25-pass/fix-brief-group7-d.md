# T25, stage 2, group 7: round d, the last fixes and the page

You make the last fixes to the drafts of group 7 and rebuild the page for the owner. The earlier briefs and their constraints still hold.

## What to apply

Three reports in `D:/SpecSheriff/.ai_docs/t25-pass/`, each ending with the main session's decisions:
- `review-g7c.md`, the final review;
- `english-g7c-fast.md` and `english-g7c-thorough.md`, the findings of EngStickler's readers on `english-group7c.md`.

Apply every finding that the decisions apply, in the words the reports give. Where the two readers' files differ, `english-g7c-thorough.md` wins; where `review-g7c.md` replaces a whole sentence, its sentence wins.

## What to write

1. `fix-group7-d.mjs`: on its first run, it copies `tools-drafts.json` to `tools-drafts.before-group7-d.json`; on every run, it rebuilds the group's keys from that copy. Run it twice and check that both runs give the same file and that no key outside the group differs from the copy.
2. `english-group7d.md`: only the English sentences that this round changes, each under its key, for EngStickler's readers.
3. In `group7-notes.md`, a section "Round d", and question 8 for the base specification in the words of `review-g7c.md`'s finding 1.
4. Rebuild the page with `build-group7-ru.mjs` and `gen-group7-page.mjs`, and update `group7-assessments.json` where a node's «Оценка» changed. Open the page and check that it opens dark, that the tables render, and that nothing scrolls sideways at 1066 px and at 390 px. Do not publish it.

Do not change anything under `specs/`, and do not touch `.ai_docs/INDEX.md`, `tasks.md` or `t25-one-thought.md`. Make no commit.

## Your final report

Short, in English: the keys changed, whether the page is rebuilt and checked at both widths, and anything you could not settle.
