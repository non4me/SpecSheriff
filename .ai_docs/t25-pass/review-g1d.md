**Verdicts.** L (`new:tools-7-1-location`) is ready once the owner answers Q1 with A. A (`s-stxmhq3hgfndvn6`) and K (`proposal:s-sn6au3vcr9uy5pm`) are not ready: each needs small fixes that the author can make. No new question for the owner arises.

The terminology skill was loaded, and I ran `node .claude/vt/writing-rules.mjs` myself. I changed no file. As in earlier rounds, the 300-word limit applies to each draft separately.

## Checklist

| Rule | L | K | A |
|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✗ "An extension of the guidelines" (last paragraph) and "ratio" (the `term-relation` item) have no citation | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ (the 39-word sentence states one thought) | ✓ | ✓ ("X, so Y" is one relation under 7.3.2; a split is given below for readability) |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ (none needed) |
| Pairing test of the reason | ✓ | ✓ | ✓ |

## Оценка

**L**
- согласованность: ✓ при ответе A на Q1. Сверено с предложением к 8.5, 2.1, 1.1.4, 1.1.5, 3.3, 8.6, 11.1.3, «Where the files are» и model.ts:52–110. Полный путь файла расширения уточняет слова 8.5 «имя части и имя файла» (вывод).
- целостность: ✓. На узел ссылаются s-stxmhq3hgfndvn6 и proposal:s-ztseyetus7np6br, обе ссылки остаются верными; правки кода названы в stage3. Одно замечание (вывод): в moved/ верхние узлы файлов расширений стоят в `…/domains/11` и `…/recordtype/12`. По L и по согласованному 8.5 они станут `_guidelines/extensions/domains` и `…/recordtype`, а таблица 11.3 станет `…/domains/3`. Заметки этого не называют.
- целесообразность: ✓.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

**K (6.1)**
- согласованность: ✓. Сверено с 1.7.2, 2.3, 2.4, 4.2, 4.4 и его решением от 2026-11-09, 6.5, 6.6, 9.8, 10.11 и строками 10.1.22–10.1.24. Фразу о том, что требования остаются в силе, не нарушает ни одна связь `refines` в moved/ (вывод). Отдельно проверены 9.5 → 1.5.2, 12.3a → 1.2.3 и 12.6 → 12.3.
- целостность: ✓. 1.7.2 по-прежнему верно ссылается на 6.1. 4.2 и обоснование 2.3 говорят, что техническое приложение «расширяет» базу, хотя его связи — `implements`; по смыслу это совместимо, а тип связи задают строки 10.1.22–10.1.24 (вывод).
- целесообразность: ✓ — 2.3 и строка 10.1.24 говорят «уточняет или расширяет»; решение владельца от 2026-11-11.
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — у «extension of the guidelines» и «ratio» нет ссылки при первом употреблении. Обе фразы — из согласованного текста.

**A (s-stxmhq3hgfndvn6)**
- согласованность: ✓. Сверено с 8.5, строкой 10.1.5 и её решением от 2026-11-12, 6.3, «The hooks» (s-477gtdrkw34dzxw) и validate.ts:88–91.
- целостность: ✓ — impl.json связывает строку 10.1.5 с этим узлом; правки кода названы в stage3.
- целесообразность: ✓.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

## L — new:tools-7-1-location, "How a node's location is computed": ready, once the owner answers Q1 with A

**Earlier findings.** All three findings of review-g1c-b are fixed. The author departed from the report in one place: the term item cites rule 3.3, where the report asked for rule 3.2. The author's reason holds. Rule 3.3 says what a term is, and rule 3.2 says only where a term is defined. The proposal for rule 8.5, on which this node rests, cites 3.3 too.

**The 39-word sentence** states one thought. Nothing in it can be cut without losing a kind of file or a citation that rule 7.2.7 requires, so no change is needed.

- **Optional readability fix (author):** the subject runs 22 words before its verb. Putting the scope first makes it read more easily and matches the node's two other sentences about these files. Apply only if the author wants it:
  - EN: "In a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5), the first node at the top of the file takes as its location the file's path under `specs/`, without `.json` (§s-zefk589ykh37b8u)."
  - RU: «В файле guidelines, описания инструментов (§s-a4rbry4hsu34hy8) или технического приложения (§s-tj38pvm38nepaf5) первый узел на вершине файла получает расположением путь к файлу внутри `specs/` без `.json` (§s-zefk589ykh37b8u).»
- **Notes (author):** add the change of locations named under целостность above.

**The example** agrees with the text. Its closest mistake, numbering each file from one, is a mistake the paragraph on folders forbids.

**TERM:** none. "Code-point order" is used in its Unicode sense.

## K — proposal:s-sn6au3vcr9uy5pm, "What a link is": not ready

**Earlier findings.** Every finding of review-g1c-a is addressed. The sentence on `implements` was cut without asking the owner, and that holds: the sentence was the author's own addition and never part of the agreed wording, so cutting it returns 6.1 to its agreed meaning.

New findings, all the author's to fix:

- **WORDING FIX (7.2.7, agreed sentences, applied inside the proposal):**
  - EN: "…bound, for as long as both exist, in the ratio the link carries (§s-bckzdwd35d2nefa)."
  - RU: «…соединены, пока существуют оба, в соотношении, которое указывает связь (§s-bckzdwd35d2nefa).»
  - EN: "An extension of the guidelines (§s-mbmnsnxenmavu3z) or a project's own guidelines (§s-u7tw6m8npxmv5tu) may define…"
  - RU: «Расширение guidelines (§s-mbmnsnxenmavu3z) или собственные guidelines проекта (§s-u7tw6m8npxmv5tu) могут определять…»
  - Add `cites` links to both sids.
- **WORDING FIX (decision, ruling).** The quotation marks present the agent's English notes as the owner's words. The only records of that reason, line 1274 and the Russian line 10 of fix-table-4.mjs, are both the agent's wording. Use the form of the node's other decisions:
  - "The owner: one link, `refines`, covers both refining and extending, since the line between them is thin and no check could tell them apart. The meaning of `refines` in this rule is widened to cover extending."
- **WORDING FIX (decision, problem).** "Rule 2.3" names a node by its number, which rule 1.2.2 forbids. Replace it with:
  - "The rule on a project's own guidelines (§s-u7tw6m8npxmv5tu) and the row of the main table of checks that checks it say that a rule of a project's own guidelines refines or extends a rule. This rule gave `refines` only the meaning of refining, and no type of link expressed extending."
- **WORDING FIX (`change` of the `refines` item).** It says rules 2.3, 1.7.2 and 4.2 cover links «из одной части в другую», but 2.3 and 1.7.2 bind links within the guidelines. It also says rows 10.1.22–10.1.24 set the type «каждой части», which overstates what the rows cover. It also reports cutting a sentence the owner never saw. Replace everything from «Фраза «связывающий узел…» to the end with:
  - «Фраза «связывающий узел оставляет в силе каждое требование связанного» — новая для связей, которых не касаются правила 2.3, 1.7.2 и 4.2, например 4.1 → 1.1.4 или 9.5 → 1.5.2: эти правила требуют её только от собственных guidelines проекта, от расширения guidelines и от технического приложения. Ни одна существующая связь `refines` её не нарушает. Где подходят и `implements`, и `refines`, тип задают строки 10.1.22–10.1.24: для технического приложения, описания инструментов и собственных guidelines проекта.»
  - In `question`, add after "extending": "and adds that the linking node leaves every requirement of the linked node in force".

**The example** agrees with the text and with rule 10.11, and its closest mistake is one the text forbids.

**TERM:**
- "extends": a partial fit with UML's «extend» between use cases, which inserts behaviour at the base use case's extension points (unverified). It is also partial against SysML `refine`, which has no separate "extend". Keep the word; the docs gloss is already tracked in item 7 of the notes.
- "ratio": the same meaning as what UML and ArchiMate 4 call multiplicity. A gloss in the docs is enough.

## A — s-stxmhq3hgfndvn6, "A location that differs from the computed one": not ready

**Earlier findings.** The fix from review-g1b-a (citing rule 8.5) is in place, and review-g1c-b found nothing new on this draft.

- **WORDING FIX (author), the reason's second sentence.** Under 7.3.2 it states one relation, not two thoughts as the brief suggests. At 33 words, with alternatives inside the consequence, it still reads more easily split at "so". The content stays the same:
  - EN: "`sheriff reindex` writes every location after each edit that an agent makes (§s-477gtdrkw34dzxw). So a location that differs was written by hand, or was left by a move of the node that no `sheriff reindex` followed."
  - RU: «`sheriff reindex` пишет каждое расположение после каждой правки, которую делает агент (§s-477gtdrkw34dzxw). Поэтому расположение, которое отличается от вычисленного, написано вручную или осталось после переноса узла, за которым не последовал `sheriff reindex`.»

**TERM:** none.

## Questions only the owner can answer

None new. Q1 (rule 8.5) still decides L.

Files used:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/review-g1c-a.md
- D:/SpecSheriff/.ai_docs/t25-pass/review-g1c-b.md
- D:/SpecSheriff/.ai_docs/t25-pass/review-g1b-a.md
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/extensions/domains.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/extensions/recordtype.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/impl.json
- D:/SpecSheriff/.ai_docs/t25-pass/fix-table-4.mjs
- D:/SpecSheriff/.ai_docs/t25-one-thought.md
- D:/SpecSheriff/specs/_guidelines/tools.json
- D:/SpecSheriff/skills/tools/src/model.ts
- D:/SpecSheriff/skills/tools/src/validate.ts
- C:/Users/PC/.claude/skills/vt/terms-ru.md