**Verdicts.** All three drafts are not ready. Each needs small fixes that the author can make, and no question goes to the owner.

The terminology skill was in context, and I ran `node .claude/vt/writing-rules.mjs` myself. I changed no file. As in earlier rounds, the 300-word limit applies to each draft separately.

A = `s-stxmhq3hgfndvn6` · K = `proposal:s-sn6au3vcr9uy5pm` · X = `proposal:s-ztseyetus7np6br`

## Checklist

| Rule | A | K | X |
|---|---|---|---|
| 1.2.3 Text and reason | ✓ | ✓ | ✓ |
| 7.1 Goal, reader, scope | ✓ | ✓ | ✗ "other than its sections and the header itself, including those in the cells of a `TableRule`": the plural "those" agrees with "its sections", so the inclusion can be read as part of the exclusion |
| 7.2.1 Who must act | ✓ | ✓ | ✓ |
| 7.2.2 Order of the text | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ |
| 7.2.7 Words from the specification | ✓ | ✓ | ✓ ("approval status" and "header" first appear with the nodes that set the status in question, 1.3.8 and s-yccuyqbypzzx2gu) |
| 7.3.1 Title | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ |
| 7.3.3 Contents of a node | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ |
| 7.5.2 Sentence length | ✓ | ✗ "adds a requirement on a question … such as a value": not natural English (a calque of «требование по вопросу»), and a value is not a question | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ (none needed) | ✓ | ✓ (none needed) |
| Pairing test | ✓ | ✓ | ✓ |

## Оценка

**A**
- согласованность: ✗ — третье предложение обоснования называет только две причины: расположение написано вручную или узел перенесли без `sheriff reindex`. По s-ygg5kpcxgzq3m7w место узла — это его номер среди узлов того же родителя. Поэтому расположение меняется и тогда, когда без `sheriff reindex` добавили или удалили соседний узел. При варианте A вопроса Q1 оно меняется и с новой версией инструментов. Сверено с 8.5, s-ygg5kpcxgzq3m7w, строкой 10.1.5, s-477gtdrkw34dzxw и validate.ts:88–91.
- целостность: ✓ — impl.json связывает строку 10.1.5 с этим узлом. Ссылки на него из s-ygg5kpcxgzq3m7w и X остаются верными.
- целесообразность: ✓.
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — схема в moved/ требует от узла только `sid` и `title`, `location` в ней не обязателен. Текст не говорит, отвергается ли узел без расположения. validate.ts:90 такой узел отвергает.

**K**
- согласованность: ✓ — сверено с 1.7.1, 2.3, 3.3, 6.4, 6.6, 10.11, строками 10.1.22–10.1.24 и решениями от 2026-11-11 и 2026-11-17.
- целостность: ✓ — 1.6.1 и 10.11 по-прежнему верно опираются на 6.1.
- целесообразность: ✓ — решение владельца от 2026-11-11.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

**X**
- согласованность: ✓ — пункт о заголовке говорит то же, что s-yccuyqbypzzx2gu, а пункт о разделе — то же, что 1.3.8. Сверено также с 1.3.5, 6.4, 9.7, 10.13, 11.1.3, 11.1.4, 12.9, s-v4qus7raqnwzneb и s-agc6fb3vx46pc23.
- целостность: ✓ — s-agc6fb3vx46pc23 и s-ygg5kpcxgzq3m7w остаются верными. Расхождение в model.ts:218 записано в правках кода для этапа 3.
- целесообразность: ✓.
- избыточность: ✓ — оговорка об исключённых узлах повторяет правило о статусе заголовка, но без неё не к чему прикрепить добавление узлов в ячейках (вывод).
- недостаточность: ✓ — не найдено.

## A — not ready

**Earlier fix:** the split is in place. The Russian matches review-g1d word for word. The English, reworded after the readers, keeps its meaning.

- **DOUBT (author can fix: the reason is new and was never agreed), reason sentence 3:**
  - EN: "So a location that differs from the computed one was left behind by a change that no run of `sheriff reindex` has followed yet, such as an edit made without an agent."
  - RU: «Поэтому расположение, которое отличается от вычисленного, осталось от изменения, после которого `sheriff reindex` ещё не запускался, например от правки без агента.»
- **DOUBT (author can fix: row 10.1.5 requires it, and the code already does it), text sentence 1:**
  - EN: "`sheriff validate` refuses each node whose location (§s-kag2m9tzdnduxdx) is missing or differs from the one computed for it (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx)."
  - RU: «`sheriff validate` отвергает каждый узел, расположение которого (§s-kag2m9tzdnduxdx) отсутствует или отличается от вычисленного для него (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx).»
- **TERM:** none.

## K — not ready

**Earlier fixes:** all seven are in place word for word: both citations with their links, the problem, the ruling, the `change` and the `question`. The other sentences round e changed keep the agreed Russian: the first sentence of the `refines` item, "show", and the example.

- **WORDING FIX (author):**
  - EN: "A node extends another when it adds a requirement on something that the other leaves open within its own subject, such as a value that the other leaves to each project."
  - RU: «Узел расширяет другой, если добавляет требование к тому, что другой оставляет открытым в своём предмете, например к значению, которое тот оставляет каждому проекту.»
- **TERM:** nothing new. The docs gloss of "extends" is already item 7 of the notes.

## X — not ready

**Earlier fixes:** review-g1d gave none for this draft. The header item now says what s-yccuyqbypzzx2gu says. Round e's English fixes to agreed sentences keep the Russian.

- **WORDING FIX (author), header item:** "…other than its sections and the header itself, including the nodes in the cells of a `TableRule` (§s-yccuyqbypzzx2gu);". The Russian stays as it is, since it already says «из узлов».
- **TERM:** none.

## Questions only the owner can answer

None.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/review-g1d.md
- D:/SpecSheriff/.ai_docs/t25-pass/english-group1-changed.md
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/extensions/domains.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_schema/node.schema.json
- D:/SpecSheriff/specs/_guidelines/tools.json
- D:/SpecSheriff/skills/tools/src/validate.ts