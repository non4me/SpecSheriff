The `specsheriff-terminology-review` skill was loaded and I ran `node .claude/vt/writing-rules.mjs`. I changed no file. There are four drafts, so the 300-word limit applies to each draft's findings, as in the second review.

L = 8.5 (`proposal:s-kag2m9tzdnduxdx`) · A = 10.3 (`proposal:s-83ev4wwesbwnhnp`) · K = 6.1 (`proposal:s-sn6au3vcr9uy5pm`) · H = header status (`proposal:domains-header-status`)

## Checklist

| Rule | L | A | K | H |
|---|---|---|---|---|
| 1.2.3 Text and reason | ✓ | ✓ | ✓ | ✓ |
| 7.1 Goal, reader, scope | ✗ "The nodes under a node that a part opens with" also covers the first section of `base` or `contracts` | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 Order of the text | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words from the specification | ✗ "a term (§s-ypa92gpcj3f5zj8)" cites where a term is defined, not what a term is | ✗ "approval status" is now first used in item 1, with no citation | ✗ "term" in `term-relation` has no citation (agreed sentence) | ✓ |
| 7.3.1 Title | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 Contents of a node | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✗ "A location tells a reader where a node is" restates the text's first sentence (agreed) | ✗ see the pairing test (agreed) | ✗ reason paragraph 2 restates the text's last paragraph (agreed) | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 Sentence length | ✓ | ✓ | ✓ | ✗ "other than a section and other than the header itself" |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ (none; none needed) | ✓ | ✗ "the first holds its header": rule 11.1.2 does not recommend a document smaller than a section |
| Pairing test | ✗ reason sentence 1 → text paragraph 1, sentence 2 → paragraph 3 (agreed) | ✗ reason paragraph 1 → items 1 and 3, paragraph 2 sentence 1 → item 2, sentence 2 → the shell paragraph (agreed) | ✗ reason paragraph 1 → text paragraph 1, paragraph 2 → the last paragraph (agreed) | ✓ (sentence 1 → text sentence 3, sentence 2 → sentences 1–2: not in order) |

## Оценка

**L (8.5)**
- согласованность: ✗ — третий пункт списка дополняет решение 2026-11-04 («нумеруется каждый узел, кроме термина»). Это вопрос Q1, его решает владелец. Сверено с 1.7.2, 1.7.3, 1.7.6, 11.1.2, 11.1.3, s-ygg5kpcxgzq3m7w и одобренным бывшим 1.4 в specs/.
- целостность: ✗ — фраза «узлы под узлом, которым открывается часть» захватывает и первый раздел `base` или `contracts`, а пункт списка его исключает. s-ygg5kpcxgzq3m7w, s-stxmhq3hgfndvn6, комментарий схемы и model.test.ts в заметках названы.
- целесообразность: ✓ — новая форма 8.5 не говорит, где расположен заголовок домена, а одобренный бывший 1.4 это говорил.
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — «термин» ссылается на 3.2. Правило 3.2 говорит, где термин определяется, а что такое термин, говорит 3.3.

**A (10.3)**
- согласованность: ✓ — решение 2026-11-06 на 1.3.8, одобренный бывший 5.12 в specs/ («a section and a domain's header left out»), 1.7.2, 1.7.3, строка 10.1.8, s-st6td4mua9uqt9z.
- целостность: ✓ — строка 10.1.8 меняется в этой же группе. s-st6td4mua9uqt9z и guard.ts:117 уже пропускают заголовок.
- целесообразность: ✓ — без этого изменения согласованный 10.3 противоречил бы правилу о статусе заголовка (1.7.2).
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — «статус одобрения» впервые встречается в пункте 1, и ссылки на 1.3.1 там нет.

**K (6.1)**
- согласованность: ✗ — последняя фраза пункта `refines` требует связи `implements` от описания технического долга. А 4.4 и решение 2026-11-09 разрешают такому описанию уточнять узел (вывод). Сверено с 1.7.2, 2.3, 2.4, 4.1, 4.2, 4.4, 9.5, 10.11, строками 10.1.22–10.1.24 и 10.1.38–10.1.39, решениями 2026-11-08, 2026-11-11 и 2026-11-13.
- целостность: ✗ — по новому значению «расширяет» правило о статусе заголовка расширяет 1.3.1 и 1.3.3, но связей `refines` с ними у него нет (вывод). Остальные связи `refines` в moved/, которые я проверил, подходят.
- целесообразность: ✓ — 2.3 и строка 10.1.24 говорят «уточняет или расширяет», а 6.1 знал только «уточняет». Решение 2026-11-11.
- избыточность: ✗ — последняя фраза пункта `refines` отчасти повторяет строки 10.1.22–10.1.24. Второй абзац обоснования пересказывает последний абзац текста.
- недостаточность: ✗ — у слова «термин» в `term-relation` нет ссылки (согласованная фраза).

**H (статус одобрения заголовка)**
- согласованность: ✓ — решение 2026-11-06 на 1.3.8, одобренный бывший 1.6 в specs/, 1.3.1, 1.3.3, 1.7.2, 1.7.3, 11.1.2, 11.1.3, approvals.ts:91.
- целостность: ✓ — 10.3, строка 10.1.8, s-95w92rnjuv3sst8, s-agc6fb3vx46pc23, «What `sheriff reindex` writes», комментарий схемы Domains и model.ts:218 в заметках названы.
- целесообразность: ✓ — ни один узел новой формы не говорит, как выводится статус заголовка.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

## L, "A node's location": **not ready**

Every earlier finding has been dealt with. The author's reason for putting the fixes to the agreed sentences inside the proposal holds: an agreed node gets one complete new wording, with its changes listed. The example agrees with the text, and its mistake, numbering the header, is what item 3 forbids.

- **WORDING FIX (author), the paragraph after the list.** The proposed decision says "the nodes under it". The text now says "a node that a part opens with", which also catches the first section of a part — the case that item 3's `change` excludes.
  - EN: "The nodes under a node whose location is the part's name alone are numbered together with the other nodes at the top of the part."
  - RU: «Узлы под узлом, расположение которого — одно имя части, нумеруются вместе с остальными узлами на вершине части.»
- **WORDING FIX (author):** change the citation to "a term (§s-khqsmy6mhejkrhg)" / «термин (§s-khqsmy6mhejkrhg)» and move the link to that sid. Rule 3.3 says what a term is.
- **DOUBT (owner, agreed reason):** it fails the pairing test. A candidate:
  - EN: "A location is computed from where a node is, so it always shows a reader where to find the node."
  - RU: «Расположение вычисляется из того, где находится узел, поэтому всегда показывает читателю, где узел найти.»
- Q1 is still a question only the owner can answer.

## A, "An agent's edit is checked before it is made": **not ready**

**The author's claim holds.** The ruling of 2026-11-06 on 1.3.8 says, word for word: "their status is the state of what they hold, built and only shown, whatever the number of rules; their own wording is meta-information nobody approves". The change also brings back the approved former 5.12's "a section and a domain's header left out". The new form dropped those words because rule 1.7.3 forbids a rule of the guidelines to name an extension. So no question is needed. guard.ts:117 already skips a header; I checked it.

- **WORDING FIX (author):**
  - EN: "unless the node is a section or any other node whose approval status (§s-tgrnpagrb58tya7) is derived from other nodes"
  - RU: «кроме раздела и любого другого узла, статус одобрения (§s-tgrnpagrb58tya7) которого выводится из других узлов»
  - Add a `cites` link to s-tgrnpagrb58tya7.
  - Why: the notes say these are row 10.1.8's words, and that row says "any other node". «другого узла» reads as one particular node.
- **DOUBT (owner, agreed reason):** it fails the pairing test. A candidate:
  - EN: "A check that runs later sees only the result: the approvals, which it takes as given, and a commit that contains a test together with its code. So only a check made before an edit can keep an agent from making a decision that only the owners make, or from writing code before its test."
  - RU: «Проверка, которая выполняется позже, видит только результат: одобрения, которые она принимает как данность, и коммит, где тест лежит вместе со своим кодом. Поэтому только проверка до правки может не дать агенту принять решение, которое принимают только ответственные, или написать код раньше его теста.»
  - Why a shell command is left out stays in the decision of 2026-11-13.

## K, "What a link is": **not ready**

**The author's claim holds only in part.**
- The ruling of 2026-11-11 is not in any node's `meta.decisions`, in specs/ or in moved/.
- Its only word-for-word records are line 1274 of the continuation file and the comment in fix-table-4.mjs. Line 1274 reads: "the owner chose, 2026-11-11, one link `refines` for both … to draft and review".
- It settles the widening of `refines`, so the widening needs no question.
- It does not settle the two added sentences.

- **Author:** "leaves every requirement … in force" is new for a `refines` link within one part of the specification, such as 4.1 → 1.1.4 or 9.5 → 1.5.2. Rules 2.3, 2.4, 1.7.2 and 4.2 bind only links from one part to another. None of the links I checked (9.5, 10.11, 4.4) breaks it (inference). Its `change` must say it is new, and must not rest on 2.4 alone.
- **DOUBT (owner):** "Where the linking node states how the linked node is implemented, the link is of type `implements` instead." A description of technical debt states a shortcoming in how a node is implemented. Rule 4.4 and its ruling of 2026-11-09 still let that description refine the node (inference).
  - **A (recommended):** cut the sentence. Rows 10.1.22 to 10.1.24 already fix the type of link for each part. Cost: 6.1 alone no longer separates the two types for the technical appendix.
  - **B:** keep it, adding "unless the linking node describes technical debt (§s-2r7k2aeyusgy6fw)". Cost: one more exception in a definition.
- **DOUBT (owner, agreed sentences):**
  - Cut reason paragraph 2; the decision of 2026-11-17 already records it.
  - Cite the term at its first use: "the linking term (§s-khqsmy6mhejkrhg)" / «связывающий термин (§s-khqsmy6mhejkrhg)».
- **TERM:** nothing new. The docs gloss of `refines` is tracked in the notes, item 7.

## H, "The approval status of a domain's header": **not ready (the author's fixes only)**

**The author's claim holds.** The ruling of 2026-11-06 settles that a header's status is built and that nobody approves a header. Which nodes count comes from the former 1.6, which the owner approved under that ruling: "built the same way from every node of the domain but the header itself". The notes should cite those words too.

- **WORDING FIX (author), example:**
  - EN: "A domain is kept in two documents: the first holds its header and a section under it, and the second holds another section, one rule of which is a draft. The header's approval status is draft. Once that rule is approved, the header becomes approved too, though nobody approved the header. The closest mistake is to derive the header's status only from the nodes under the header, and so to show the header approved while a rule in the second document is still a draft."
  - RU: «Домен хранится в двух документах: в первом — его заголовок и раздел под ним, во втором — ещё один раздел, и одно правило в нём — черновик. Статус одобрения заголовка — черновик. Когда это правило одобрят, заголовок тоже станет одобренным, хотя заголовок никто не одобрял. Ближайшая ошибка — выводить статус заголовка только из узлов под заголовком и тем самым показывать заголовок одобренным, пока правило во втором документе ещё черновик.»
- **Links (author, inference; depends on K):** under the proposed 6.1, this rule extends 1.3.1 and 1.3.3. So the link to s-tgrnpagrb58tya7 becomes `refines`, and a `refines` link to s-9g7jj8z4yf9kq93 is added.
- **CUT:** "other than a section and other than the header itself" → "other than its sections and the header itself". The Russian needs no change.

## Questions only the owner can answer

1. **Q1 (rule 8.5):** where a node that a part opens with is located.
2. **Rule 6.1:** whether to cut the sentence that makes the link `implements`, or keep it with an exception for technical debt.
3. **The agreed reasons of 8.5, 10.3 and 6.1,** which fail the pairing test, and "term" left without a citation in 6.1: recast them as proposed, or keep them.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json (4.4 is s-2r7k2aeyusgy6fw, 3.3 is s-khqsmy6mhejkrhg)
- D:/SpecSheriff/specs/_guidelines/spec.json (the approved former 1.6 and 5.12)
- D:/SpecSheriff/.ai_docs/t25-one-thought.md (line 1274)
- D:/SpecSheriff/.ai_docs/t25-pass/fix-table-4.mjs
- D:/SpecSheriff/skills/tools/src/guard.ts (line 117)