# T25, stage 2, group 5: round h, the readers' findings on round g

EngStickler's readers read round g, in `english-g5g-fast.md` and `english-g5g-thorough.md`. Both readers made the findings below. Apply them with `fix-group5-h.mjs`, idempotent from a backup `tools-drafts.before-group5-h.json`, then rebuild the page with `build-group5-ru.mjs` and `gen-group5-page.mjs`. Add a short "Round h" section to `group5-notes.md`, placed first, and write `english-group5h.md` with only the sentences that round h changed. Do not publish the page, and do not touch `.ai_docs/INDEX.md` or anything under `specs/`.

- **Item 42, text.** "of the technical appendix" now reads as narrowing the files refused, while the node's first sentence speaks of every JSON file under `specs/tech/`. Write "refuses any other JSON file under `specs/tech/`, and names that file." If the node then cites s-tj38pvm38nepaf5 nowhere else, remove its `cites` link, as the rule on citations requires.
- **Item 44, text.** "never ends" reads as a statement about time, while the reason says "has an end". Write "A chain has no end if it comes back to a field that is already in it." / «У цепочки нет конца, если она возвращается к полю, которое в ней уже есть.»
- **Item 45, text.**
  - "…that have the same `answersTo` as it does." / «…у которых тот же `answersTo`, что у него.»
  - "Where they do," → "Where they name different fields," / «Если они называют разные поля,».
- **Item 46b, reason.** The previous sentence says that the types and RuntimeChecks are generated from a field's values. Name them the same way: "…the types and RuntimeChecks generated from that field's values would inherit the field's defect." / «…типы и RuntimeChecks, сгенерированные из значений этого поля, унаследовали бы его изъян.»

Rejected: "So" → "Thus", and "whose values break the rules" → "whose source breaks the rules". "So" is the agreed drafts' way of drawing a consequence, and the rules on a field's source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh) are rules on the values that the field may have.

Report, as your final message: the keys you changed and the files you wrote.
