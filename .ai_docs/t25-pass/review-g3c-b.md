I loaded the skill `specsheriff-terminology-review` and ran `node .claude/vt/writing-rules.mjs`. My input holds seven drafts. Q1 is in another reviewer's input, so I did not check it.

## Checklist

Columns: **A** s-t383grkn3q68dpf · **B** s-5hb9k2e34dgn284 · **C** new:tools-7-2-own-kinds · **D** s-cdachayybfvg4na · **E** proposal:s-hhnahzmhahf8jht · **F** proposal:s-gb8s9657a65hqmv-g3 · **G** proposal:row-10-1-35a

| Rule | A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (no reason, like 41 of the 48 rows of table 10.1) |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ agreed item: "a RecordType's `fields` and `unknown` become its `schema` …, as follows: each field becomes …; the field's `text` becomes …; … and `unknown: "refused"` becomes …" | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ "with the same `needsCode`" |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (`needsCode` is defined by rule 8.4, which the row's `checks` link names, as row 10.1.34 does for `meta.code`) |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (a cell has no title) |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ agreed items: the RecordType item above; "a node's key `id` becomes `location`, and a node's key `rationale` becomes `reason`", and the other items that pair two renames | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✗ "by its property that `TextRule.list.property` names" | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (none needed) | ✓ (rows hold none) |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ | ✓ (sentence 1 is the premise of sentence 2, whose conclusion covers paragraphs 2 and 3 together) | ✓ | ✓ (no reason) |

## Оценка

**A. s-t383grkn3q68dpf**
- согласованность: ✓. Сверено со строкой 10.1.34 (s-tqdmk6jakx97wra) и её решениями от 2026-11-13 и 2026-11-17, а также с правилами 9.7 и 1.5.2.
- целостность: ✓, но только вместе с proposal:s-ztseyetus7np6br-g3 и proposal:new-tools-1-settings-g3. Без них пример неверен.
- целесообразность: ✓. Списки правят вручную или коммитят, не запустив `sheriff reindex`.
- избыточность: ✓, не найдена.
- недостаточность: ✓, не найдена.

**B. s-5hb9k2e34dgn284**
- согласованность: ✓. Сверено со строкой 10.1.35 и её решениями от 2026-11-13, с правилом 5.1 и с s-avvnasjhsfkgajh (`valueList` → `ALLOWED`).
- целостность: ✓. Исключение снято. Список собственных типов узлов теряет `declaredIn` при `sheriff reindex` (F), и сверяет его s-czxaqvaesmu3gru. Элемент-объект без свойства оставлен s-cdachayybfvg4na.
- целесообразность: ✓. Список и схема или код расходятся незаметно.
- избыточность: ✓, не найдена.
- недостаточность: ✓, не найдена.

**C. new:tools-7-2-own-kinds**
- согласованность: ✓. Сверено:
  - с правилами 8.3 и 8.4 и с решением от 2026-11-10;
  - с согласованным узлом «What the SpecSheriff tools read in the project's own guidelines»: правила `project.json` находятся по `refines` и берутся вместе;
  - с extension.schema.json.
- целостность: ✓. Узел реализует строку 10.1.35a, а отказ элементу без свойства оставлен s-cdachayybfvg4na.
- целесообразность: ✓. Код сравнивает только имена (binding.ts:255-262).
- избыточность: ✓, не найдена.
- недостаточность: ✓, не найдена.

**D. s-cdachayybfvg4na**
- согласованность: ✓. Сверено со строкой 10.1.36, с правилом 5.1 и с validate.ts.
- целостность: ✓. B и C оставляют этот отказ ему.
- целесообразность: ✓. У элемента без свойства нет значения для сравнения.
- избыточность: ✓, не найдена.
- недостаточность: ✓, не найдена.

**E. proposal:s-hhnahzmhahf8jht (8.4)**
- согласованность: ✓. Сверено с решениями по 10.1.35 от 2026-11-13 и с правилами 5.2 и 8.3. Решение от 2026-11-10 о `declaredIn` заменяется новым, как сказано в `change`.
- целостность: ✓. `change` называет строку 10.1.35a, связь строки 10.1.35 и пункт в F.
- целесообразность: ✓. Убранное предложение обещало проверку по схеме, которой в поле `kinds` нет.
- избыточность: ✓, не найдена.
- недостаточность: ✓, не найдена.

**F. proposal:s-gb8s9657a65hqmv-g3**
- согласованность: ✓. Сверено с согласованной формулировкой от 2026-11-21, с решениями по 10.1.35 и с s-5ah25f6gy99panq.
- целостность: ✓. Других узлов менять не нужно.
- целесообразность: ✓. Иначе B проверял бы список по несуществующей схеме.
- избыточность: ✓, не найдена.
- недостаточность: ✗. `change` не называет цену правки: одобренное правило с таким списком становится черновиком (замечание 4).

**G. proposal:row-10-1-35a**
- согласованность: ✓. Сверено с правилами 8.4, 8.3 и 5.2 и с форматом строк таблицы 10.1.
- целостность: ✓. Строка 10.1.35 теряет связь `checks` с 8.4, а impl.json ведёт новую строку к C.
- целесообразность: ✓. Ни одна строка таблицы не называла проверку из 8.4.
- избыточность: ✓, не найдена.
- недостаточность: ✓, не найдена.

## Verdicts and findings

**Ready:** A, B, D. **Not ready:** C, E, F, G.

- Every fix from review-g3b-c and review-g3b-d is in place word for word, in both languages.
- Every round-c sentence written in the author's own words keeps the meaning of its Russian.
- F differs from its base only in the two items its `change` names and in one `cites` link.

1. **WORDING FIX (author), C, paragraph 3.** "by its property that … names" is the construction that round c removed from two other nodes. The citation also points to the wrong node: s-cdachayybfvg4na does not say this, rule 8.4 does.
   - EN: "A member names a kind by the property that `TextRule.list.property` names (§s-hhnahzmhahf8jht)."
   - RU: «Элемент называет тип узлов тем своим свойством, которое называет `TextRule.list.property` (§s-hhnahzmhahf8jht).»

2. **TERM (author), Russian.** The owner's decision of 2026-11-10 in terms-ru.md says «тип» always takes its object. Change the bare «тип» to «тип узлов» in these places:
   - C, condition 2: «своему типу»;
   - C, paragraph 2: «тип или элемент»;
   - C, paragraph 3: «сравнивает типы»;
   - C, example: «тип `procedure`» and «собственные типы проекта»;
   - E, example: «добавляет тип `procedure`».

3. **WORDING FIX (author), G.** "with the same `needsCode`" names neither the kind nor what the value must match.
   - EN: "…is listed, with the `needsCode` that the extension gives it, in the rules…"
   - RU: «…перечислен, с тем `needsCode`, который ему даёт расширение, в правилах…»

4. **WORDING FIX (author), F, the Russian `change`.** Removing `declaredIn` is not a rename, so an approved rule whose list loses it becomes a draft (inference from s-5ah25f6gy99panq and s-ztseyetus7np6br). Add: «Удаление `declaredIn` — не переименование: одобренное правило, из списка которого `sheriff reindex` его удаляет, становится черновиком, и `sheriff reindex` его называет. В этом репозитории и в saloon такого списка нет.»

5. **DOUBT (owner), F, agreed sentences.** F changes, so its agreed sentences now come under the checklist.
   - The RecordType item packs five steps into one item (rules 7.2.2 and 7.3.2). I propose the same words with each step as a nested item, and without the last "and" / «а».
   - Items 1–3 and the item on `specs/_confirmations.jsonl` each pair two renames (rule 7.3.2).

No new terms.

**Only the owner can answer:** finding 5.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/review-input-g3c-b.md
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json
- C:/Users/PC/.claude/skills/vt/terms-ru.md
