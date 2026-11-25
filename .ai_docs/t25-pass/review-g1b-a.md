Four drafts are covered here: A s-stxmhq3hgfndvn6, B s-ygg5kpcxgzq3m7w, C s-95w92rnjuv3sst8 and D s-75ue25v6r23jkk8.

## Checklist (applied to each whole node)

| Rule | A | B | C | D |
|---|---|---|---|---|
| 1.2.3 Text and reason | ✓ | ✓ | ✓ | ✓ |
| 7.1 Goal, reader, scope | ✓ | ✗ "The node at the top of a file" (paragraphs 2–4) clashes with paragraph 8's "a further node at the top of the file" | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 Order of the text | ✓ | ✗ the opening sentence has 33 words, so it is not short | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✗ "its part" | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words from the specification | ✗ "location" cites s-ygg5kpcxgzq3m7w, not 8.5, the rule that defines it | ✓ | ✓ | ✓ |
| 7.3.1 Title | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✗ "Where the project has chosen…, a domain's header is the node that its part opens with, so it takes…" states a condition and a cause. Reason sentence 1: "`sheriff reindex` writes…, and `sheriff validate` compares…" sets two facts side by side | ✓ | ✓ |
| 7.3.3 Contents of a node | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 Sentence length | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ (none needed) | ✗ "A term `request` in `specs/contracts/terms.json` is `contracts/request`." is a second case, and it rests on 8.5 rather than on this node | ✓ | ✓ |
| Pairing test | ✓ | ✓ | ✓ | ✓ |

## Оценка

**A — s-stxmhq3hgfndvn6**
- согласованность: ✓ — сверено с 8.5 (s-kag2m9tzdnduxdx), строкой 10.1.5 и её решением от 2026-11-12, 6.3 (s-cxtt6jvhqcey2k9: архив не входит в спецификацию) и узлом «The hooks» (s-477gtdrkw34dzxw).
- целостность: ✓ — вычисление вынесено в s-ygg5kpcxgzq3m7w. На него ссылается proposal:s-ztseyetus7np6br, а impl.json уже связывает строку 10.1.5 с этим узлом.
- целесообразность: ✓ — расположение, написанное вручную или оставшееся после переноса без `sheriff reindex`, вводит читателя в заблуждение.
- избыточность: ✓ — не найдено. Второй абзац задаёт охват в форме, принятой для всей группы.
- недостаточность: ✓ — не найдено.

**B — s-ygg5kpcxgzq3m7w**
- согласованность: ✓ при условии — исключение заголовка из нумерации согласуется с 8.5 только после того, как владелец примет предложение к 8.5 (вопрос 1). Без этого предложения оно противоречит решению по 8.5 от 2026-11-04. Путь файла расширения целиком уточняет слова 8.5 «имя части и имя файла» (вывод: противоречия нет). Код даёт `_guidelines/domains`, и это названо в stage3. Сверено также с 3.1 (контракты входят в базовую спецификацию), 8.6, 11.1.1, 11.1.3 и узлом «Where the files are».
- целостность: ✓ — названы 8.5 (вопрос 1), s-ztseyetus7np6br, 8.6 (термин в ячейке, долг 6) и изменения кода в stage 3.
- целесообразность: ✓ — 8.5 не говорит о ячейках, о нескольких файлах одной папки и о порядке файлов. Код сортирует файлы с учётом локали.
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — не задано место дочерних узлов заголовка среди других верхних узлов его файла. Кроме того, при нескольких верхних узлах абзац 2 даёт второму узлу путь файла, а абзац 8 — номер.

**C — s-95w92rnjuv3sst8**
- согласованность: ✓ при условии — исключение заголовка шире строки 10.1.8, пока владелец не примет предложения вопроса 2 (решение от 2026-11-06 по 1.3.8). Сверено со строкой 10.1.8 и её решением от 2026-11-18, а также с 2.5, 1.3.4, 1.3.5 и s-v4qus7raqnwzneb.
- целостность: ✓ — s-st6td4mua9uqt9z по-прежнему ссылается верно. Проверка строки 10.1.9 перенесена в s-75ue25v6r23jkk8, и замена в impl.json названа.
- целесообразность: ✓ — статус одобрения в файле можно поставить вручную или оставить после правки формулировки.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

**D — s-75ue25v6r23jkk8**
- согласованность: ✓ — сверено со строкой 10.1.9 и её решением от 2026-11-12, с 1.3.4, 1.3.7 и s-v4qus7raqnwzneb, с согласованным узлом об архиве s-j4webte36gkraju (первый родитель; одобрения родителя в том виде, в какой их переписал бы `sheriff reindex`) и с отказом владельца от 2026-10-28 ограничивать, кто назначает ответственных.
- целостность: ✓ — названы замена в impl.json, комментарий в approvals.ts:129, удаление ветки APPROVAL_RULE и привязка теста.
- целесообразность: ✓ — одобрения от тех, кто не входит в число ответственных за узел, отвергаются.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено. Коммит без родителя не назван, но так же и в согласованном узле об архиве.

## Findings

I applied the 300-word limit to each draft. Every finding of review-g1-a.md is addressed in all four drafts. One finding was fixed differently from my proposal: B cites "technical appendix" to 1.1.5 instead of 4.1. The reason given in the notes holds.

**A — not ready.** One fix, which the author makes.
- **WORDING FIX:** "`sheriff validate` refuses each node whose location (§s-kag2m9tzdnduxdx) differs from the one computed for it (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx)." / «`sheriff validate` отвергает каждый узел, расположение которого (§s-kag2m9tzdnduxdx) отличается от вычисленного для него (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx).» Add the `cites` link. The notes say every "location" cites 8.5, and this node is the one that does not.

**B — not ready.** It also depends on Q1. All the fixes below are the author's.
- **WORDING FIX, paragraph 1:** "The SpecSheriff tools compute a node's location (§s-kag2m9tzdnduxdx) from the path of its file and its place in the specification. They compute it for each node of the specification in the files that the repository keeps." / «Инструменты SpecSheriff вычисляют расположение узла (§s-kag2m9tzdnduxdx) по пути к его файлу и по его месту в спецификации. Они вычисляют его для каждого узла спецификации в файлах, которые хранит репозиторий.»
- **WORDING FIX, paragraph 2, last sentence:** "Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), a domain's header (§s-yggv9myedprnaa7) takes the domain's name as its location." / «Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), заголовок домена (§s-yggv9myedprnaa7) получает расположением имя домена.» A domain is itself a part (11.1.1), and 8.5 says why the header is located this way.
- **WORDING FIX:** "Such locations are" → "Such locations include". «Таковы расположения» → «Среди таких расположений —». As written, the three examples read as the only locations of this kind.
- **WORDING FIX, "first":** this removes the clash between paragraph 2 and paragraph 8.
  - Paragraph 2: "The first node at the top of a file…" / «Первый узел на вершине файла…».
  - Paragraph 3, item 1: "the first node at the top of that file" / «первого узла на вершине этого файла».
  - Paragraph 4, item 2: "the first node at the top of a file of the guidelines or of the technical appendix;" / «первого узла на вершине файла guidelines или технического приложения;».
  - Paragraph 8: "each further node" / «каждый следующий узел».
- **WORDING FIX, paragraph 7, a new last sentence:** "The children of a domain's header take the header's place in that order." / «Дочерние узлы заголовка домена занимают в этом порядке место заголовка.» This is what model.ts does.
- **WORDING FIX, reason sentence 1:** "`sheriff reindex` writes the locations that `sheriff validate` checks (§s-ztseyetus7np6br, §s-stxmhq3hgfndvn6)." / «`sheriff reindex` записывает расположения, которые проверяет `sheriff validate` (§s-ztseyetus7np6br, §s-stxmhq3hgfndvn6).»
- **CUT, example:** "A term `request` in `specs/contracts/terms.json` is `contracts/request`." / «Термин `request` в `specs/contracts/terms.json` — `contracts/request`.»

**C — ready, if the owner answers Q2 with A.** No new findings.

**D — not ready.** One fix, which the author makes.
- **WORDING FIX:** "The refusal names the sid and the email address that the approval holds." / «Отказ называет sid и адрес электронной почты, которые содержит одобрение.» An approval holds a node's sid and has no sid of its own (s-v4qus7raqnwzneb).

**TERM:** no finding. "Code-point order" is used in its Unicode sense, and "merge commit" and "first parent" in their git sense (inference). No established vocabulary has an equivalent of "location" (inference).

## Findings only the owner can answer

- **Q1** (proposal:s-kag2m9tzdnduxdx): B's exception for a domain's header and its example hold only under option A.
- **Q2** (domains-header-status, row-10-1-8): C's item on headers holds only under option A.

Files used:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/extensions/domains.json
- D:/SpecSheriff/skills/tools/src/model.ts (lines 67–110)
- D:/SpecSheriff/skills/tools/src/validate.ts (lines 96–113)