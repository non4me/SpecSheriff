I loaded the skill and ran `node .claude/vt/writing-rules.mjs` in D:/SpecSheriff. I changed no file. There are five drafts, so the 300-word limit applies to each draft's findings, as in the earlier reviews of this group.

L = `proposal:s-kag2m9tzdnduxdx` (8.5) · H = `proposal:domains-header-status` · R8 = `proposal:row-10-1-8` · C = `proposal:row-10-1-17` · A = `proposal:s-83ev4wwesbwnhnp` (10.3)

## Checklist

| Rule | L | H | R8 | C | A |
|---|---|---|---|---|---|
| 1.2.3 Text and reason | ✓ | ✓ | ✓ (a row has no reason) | ✓ (same) | ✓ |
| 7.1 Goal, reader, scope | ✗ "the top-level node of a file": a file may hold several top-level nodes (s-ygg5kpcxgzq3m7w numbers "each further top-level node") | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 Order of the text | ✓ | ✓ | ✗ the rule and four exclusions are in one 46-word sentence. The owner's ruling of 2026-11-13 on row 10.1.11 says: main rule first, exceptions separately | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ ("stands" beside "in force": the coordinator's ruling keeps it) |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words from the specification | ✓ | ✓ | ✗ "approval status" and "the extensions that the project has chosen" have no citation. A cites 1.3.1 for the same words | ✓ | ✗ "SpecTag (§s-rah8b37kytb682y)": rule 1.4.1 does not define SpecTag. Rule 9.3 does (agreed sentence) |
| 7.3.1 Title | ✓ | ✓ | ✓ (a cell has no title) | ✓ (same) | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 Contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ (limits, not counts of what the specification holds) | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 Sentence length | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ | ✓ ("HTTP REST API" is quoted in an example) | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ (none, none needed) | ✓ | ✓ (none, none needed) |
| Pairing test | ✓ (one sentence about the whole rule) | ✓ (R1 → T3, R2 → T1–2, not in order) | ✓ (no reason) | ✓ (no reason) | ✓ (each sentence covers both kinds of edit) |

## L — "A node's location": **not ready**

Round e kept the meaning of the Russian. The exception is the Russian of item 2, which does not render "followed by"; the fix below covers it.

**WORDING FIX (author, inside the proposal, so the owner sees it in the list of changes).**
- **Two gaps.** Rule 8.5 disagrees with s-ygg5kpcxgzq3m7w and with model.ts:85–89 in two places:
  - only the *first* top-level node of a file takes the part's name and the file's name;
  - the appendix of the tools, which rule 2.1 puts outside the guidelines, is covered there but not here.
- **The third review's view.** It held that 8.5 does not need the appendix of the tools, because only this repository keeps `tools.json`. But this repository is checked by 8.5 too, so under 8.5 the top node of `tools.json` would get a number.
- **Item 2:**
  - EN: "the first top-level node of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5), which takes as its location the part's name followed by the file's name;"
  - RU: «первый узел на вершине файла guidelines, описания инструментов (§s-a4rbry4hsu34hy8) или технического приложения (§s-tj38pvm38nepaf5), расположение которого — имя части, а за ним имя файла;»
- **Paragraph 2, first sentence:**
  - EN: "In each file of the guidelines, of the appendix of the tools or of the technical appendix, the nodes are numbered under the location of the file's first top-level node."
  - RU: «Каждый файл guidelines, описания инструментов или технического приложения нумерует свои узлы под расположением своего первого узла на вершине.»
- **Link:** add a `cites` link to s-a4rbry4hsu34hy8.

**Q1** stays a question for the owner, and each option states its cost.

**Оценка**
- согласованность: ✓ при ответе A на Q1. Сверено с 1.1.2, 1.1.4, 1.1.5, 1.7.1, 1.7.3, 3.3, 11.1.2, 11.1.3 и решениями на 8.5 от 2026-11-04 и 2026-11-05.
- целостность: ✗ — по 2.1 описание инструментов не входит в guidelines, поэтому 8.5 нумерует узел на вершине `tools.json`. А s-ygg5kpcxgzq3m7w и model.ts дают ему `_guidelines/tools`. s-stxmhq3hgfndvn6 и s-ztseyetus7np6br остаются верными.
- целесообразность: ✓ — новая форма 8.5 не говорит, где расположен заголовок домена, а одобренный бывший 1.4 это говорил.
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — если в файле несколько узлов на вершине, не сказано, какой из них получает имя части и имя файла.

## H — "The approval status of a domain's header": **ready**

No findings. Round e kept the meaning.

**Оценка**
- согласованность: ✓ — решение 2026-11-06 на 1.3.8, одобренный бывший 1.6, 1.3.1, 1.3.3, 1.7.2, 1.7.3, 11.1.2, 11.1.3.
- целостность: ✓ — 10.3 и строка 10.1.8 меняются в этой же группе. s-st6td4mua9uqt9z уже пропускает «a section and a domain's header». s-95w92rnjuv3sst8, s-agc6fb3vx46pc23, s-ztseyetus7np6br и строка 11.3.2a сходятся с правилом. Комментарий схемы Domains и model.ts:218 названы в заметках.
- целесообразность: ✓ — ни один узел новой формы не говорит, как выводится статус заголовка.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

## R8 — row 10.1.8: **not ready**

Round e kept the meaning: «вне … и вне …» already said "both".

**WORDING FIX (author).** This follows the form of row 10.1.11, which the owner ruled on 2026-11-13, and adds the citations. Add `cites` links to s-9ttvcwpqkehm58g and s-tgrnpagrb58tya7.
- EN: "Every node of the specification is approved only while an approval of its current wording is in force. The check leaves out the following nodes:
  - the nodes of the SpecSheriff guidelines that a project uses and of the extensions that the project has chosen (§s-9ttvcwpqkehm58g);
  - sections and any other nodes whose approval status (§s-tgrnpagrb58tya7) is derived from other nodes"
- RU: «Каждый узел спецификации одобрен, только пока в силе одобрение его нынешней формулировки. Проверка пропускает следующие узлы:
  - узлы SpecSheriff guidelines, которые использует проект, и узлы выбранных им расширений (§s-9ttvcwpqkehm58g);
  - разделы и любые другие узлы, статус одобрения (§s-tgrnpagrb58tya7) которых выводится из других узлов»

**Оценка**
- согласованность: ✓ — 1.3.1, 1.3.3, 1.3.5, 1.3.8, 1.7.2, 1.7.3, 2.5, решение 2026-11-18 на строке.
- целостность: ✓ — 10.3 получает те же слова. s-95w92rnjuv3sst8 пропускает разделы и заголовки.
- целесообразность: ✓ — иначе строка требовала бы одобрения заголовка, которого никто не одобряет.
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — у «approval status» и «extensions that the project has chosen» нет ссылок, а 10.3 ссылается на 1.3.1 при тех же словах.

## C — row 10.1.17: **ready, once the owner answers Q2 with A**

Round e kept the meaning: «одно или два» says "no more than two".

**Author (Q2 in the notes):**
- Option A states no cost. Add: "Cost: the row you dictated gains one clause. The tools need no change, since `sheriff validate` already refuses three abbreviations in a row."
- The `question` field still reads "only one or two in a row". Change it to "only where there are no more than two of them in a row".

**Оценка**
- согласованность: ✓ при ответе A — 7.6.2 («one word, or two in a row»), решение 2026-11-13, validate.ts:165.
- целостность: ✓ — s-e2vdhfsndy5stq9 опирается на строку, и ошибка в его примере остаётся ошибкой только при A.
- целесообразность: ✓ — вторая фраза обещала исключение, которое отвергают третья фраза и 7.6.2.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

## A — rule 10.3: **not ready**

**WORDING FIX (author, an agreed sentence inside the proposal).** Add a `cites` link to s-8xw4mgvpexyvw5q.
- EN: "while no test has that rule's SpecTag (§s-8xw4mgvpexyvw5q, §s-rah8b37kytb682y);"
- RU: «пока ни у одного теста нет SpecTag этого правила (§s-8xw4mgvpexyvw5q, §s-rah8b37kytb682y);»

**WORDING FIX (author, Russian only).** Round e added "or" to the English (fix 5), but the Russian still reads the entries as a gloss on the approvals.
- RU: «изменила бы одобрения, или записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2) или её флаг `strict` (§s-q3pfzyaxvpr2zj2), или запись о выбранных проектом расширениях (§s-9ttvcwpqkehm58g), иначе чем через процедуры, которые их записывают или отзывают.»

**Оценка**
- согласованность: ✓ — решение 2026-11-06 на 1.3.8, одобренный бывший 5.12, 1.7.2, 1.7.3, решения на 10.3 от 2026-10-28 по 2026-11-18, строка 10.1.8.
- целостность: ✓ — s-st6td4mua9uqt9z и guard.ts:117 уже пропускают заголовок. Строка 10.1.8 меняется в этой же группе.
- целесообразность: ✓ — без этой правки 10.3 противоречил бы правилу о статусе заголовка (1.7.2).
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — «SpecTag» ссылается на 1.4.1, а SpecTag определяет 9.3.

No term findings: "top-level node" is the ordinary word for a node at the top of a tree (inference).

## Findings only the owner can answer

1. **Q1 (rule 8.5):** where a node that a part opens with is located.
2. **Q2 (row 10.1.17):** whether to add "where there are no more than two of them in a row".

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json (2.1 is s-a4rbry4hsu34hy8, 9.3 is s-8xw4mgvpexyvw5q, row 10.1.11 is s-qb79dcw694x2h63)
- D:/SpecSheriff/skills/tools/src/model.ts (lines 85–89)