The skill `specsheriff-terminology-review` was loaded, and I ran `node .claude/vt/writing-rules.mjs`. I changed no file. There are seven drafts, so I applied the 300-word limit to each draft's findings rather than to the whole report.

**Earlier findings:** every earlier finding on these subjects has been dealt with. That covers report A's advice on rule 8.5, the doubts in reports A and B about the header's approval status, report B's move into "What `sheriff reindex` writes", report C's doubt on row 10.1.17 and report D's constraints on rule 6.1.

## Checklist

L = 8.5 · H = header-status rule · R11 = row 11.3.2a · R8 = row 10.1.8 · K = 6.1 · C = row 10.1.17 · X = "What `sheriff reindex` writes"

| Rule | L | H | R11 | R8 | K | C | X |
|---|---|---|---|---|---|---|---|
| 1.2.3 Text and reason | ✓ | ✓ | ✓ (no reason, like the agreed rows) | ✓ (same) | ✓ | ✓ (same) | ✓ |
| 7.1 Goal, reader, scope | ✓ | ✓ | ✓ | ✗ "any other node that nobody approves" also reads as "that nobody has approved" | ✓ | ✗ "such as part numbers, one or two in a row" reads as limiting part numbers alone | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 Order of the text | ✗ three exceptions to numbering ("A term takes no number", "the part's name and the file's", "the part's name alone") sit in three paragraphs, not in a list | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words from the specification | ✗ "base specification" (new); "term" and "technical appendix" (agreed) are not cited | ✗ "the domain's documents" (s-k73czmpkazcx7mu) | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.1 Title | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✗ "has an approval status (§…), which the SpecSheriff tools derive as they derive a section's" puts two facts side by side | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 Contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✗ reason paragraph 2 justifies text paragraph 3, and its `reasonChange` says so | ✓ | ✓ | ✓ | ✗ reason paragraph 3 comments on the `refines` item alone | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 Sentence length | ✗ ", with no number" repeats "alone" | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ "as the SpecSheriff tools compute it" repeats the list's opening |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ ("HTTP REST API" is a quotation in an example) | ✓ |
| 7.6.3 Examples | ✓ (none; one proposed) | ✓ (closest mistake missing; DOUBT) | ✓ | ✓ | ✗ second example: "lists the files that the project's tests use as fixtures" | ✓ | ✓ |
| Pairing test | ✗ reason P2 S1 → text P3 S2, S2 → P3 S3 | ✓ | ✓ | ✓ | ✗ reason P3 S1 → `refines` S1, S2 → `refines` S3 | ✓ | ✓ |

## Оценка

**L (8.5)**
- согласованность: ✗ — третий абзац добавляет исключение к решению 2026-11-04 на 8.5 («нумеруется всё, кроме термина»), и решает это владелец (Q1). С 1.7.2, 1.7.3, 1.7.6 (s-j8y62pa9hzz6nwx), 11.1.1, 11.1.3 и model.ts расхождений нет.
- целостность: ✗ — названы s-ygg5kpcxgzq3m7w, s-ztseyetus7np6br и код. Не названы комментарий схемы к `location` («the node a part opens with», без условия о расширении) и тест model.test.ts о контрактах.
- целесообразность: ✓ — новая форма 8.5 не говорит, где находится заголовок домена.
- избыточность: ✗ — «, with no number»; «may define a kind» повторяет посылку 1.7.6.
- недостаточность: ✗ — нет ссылок для «base specification», «term», «technical appendix»; нет примера.

**H (правило о статусе заголовка)**
- согласованность: ✗ — связь `refines` к 1.3.8 не подходит ни под нынешнее, ни под предлагаемое значение 6.1. Сверено с решением 2026-11-06 на 1.3.8, а также с 1.3.1, 1.3.3, 1.7.2, 1.7.3, 11.1.2, 11.1.3 и решением 2026-11-18 на 11.3.1.
- целостность: ✗ — согласованный 10.3 (s-83ev4wwesbwnhnp) исключает только раздел («unless the node is a section»), а не заголовок. Комментарий схемы Domains («built from the nodes under it») тоже должен измениться. Ни то ни другое в заметках не названо.
- целесообразность: ✓ — решение 2026-11-06 о заголовке в новой форме нигде не записано.
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — 1.3.8 говорит, из каких узлов выводится статус, а не когда он «одобрен» (это говорит 1.3.3). У «documents» нет ссылки.

**R11 (строка 11.3.2a)**
- согласованность: ✓ — по образцу строки 10.1.10 (s-k3hrk8u9uz9mpz7) и её русского текста, который продиктовал владелец. Она шире правила ровно так же, как 10.1.10 шире 1.3.8.
- целостность: ✓ — на строку ссылается s-agc6fb3vx46pc23, impl.json назван.
- целесообразность: ✓ — validate.ts:99 уже сравнивает этот статус.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

**R8 (строка 10.1.8)**
- согласованность: ✓ — 1.3.3, 1.7.2, 1.7.3, решение 2026-11-18, s-95w92rnjuv3sst8.
- целостность: ✗ — то же исключение нужно и в 10.3 (s-83ev4wwesbwnhnp).
- целесообразность: ✓ — иначе строка требовала бы одобрения от заголовка.
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — «который никто не одобряет» читается и как «которого никто не одобрил».

**K (6.1)**
- согласованность: ✗ — во втором примере правило перечисляет все фикстуры проекта, а s-6hha5en226aj8hu разрешает перечислять только фикстуры проверки, читающей ссылки или расположения. Сверено с решением 2026-11-11, а также с 1.1.3, 1.7.2, 2.3, 2.4, 4.2, 4.4, 12.6, s-gpzs5fcxvp6jkrp и строкой 10.1.24.
- целостность: ✗ — таблица в заметках относит связь H → 1.3.8 к расширению, а это не так. Остальные связи `refines` подходят.
- целесообразность: ✓ — 10.1.24 и s-yprj7d6tnvauggr требуют `refines` от расширяющего правила.
- избыточность: ✓ — «не ослабляет» обобщает 1.7.2, 2.3 и 4.2 на любую связь `refines`; это не повтор.
- недостаточность: ✓ — не найдено.

**C (строка 10.1.17)**
- согласованность: ✓ — 7.6.2, решение 2026-11-13, s-e2vdhfsndy5stq9.
- целостность: ✓ — на неё опирается s-e2vdhfsndy5stq9.
- целесообразность: ✓ — вторая фраза обещала исключение, которое отвергают третья фраза и 7.6.2.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

**X («What `sheriff reindex` writes»)**
- согласованность: ✓ — 1.3.8, правило H, 11.1.3 с решением 2026-11-18, 8.6, строка 11.3.2, s-agc6fb3vx46pc23.
- целостность: ✓ — ссылки на s-ygg5kpcxgzq3m7w и s-yccuyqbypzzx2gu на месте.
- целесообразность: ✓ — прежний пункт выводил статус заголовка из узлов под ним, а их часто нет.
- избыточность: ✗ — «as the SpecSheriff tools compute it».
- недостаточность: ✗ — оговорка об узлах в ячейках есть у статуса раздела, но не у статуса заголовка.

## L, proposal:s-kag2m9tzdnduxdx, "A node's location": **not ready**

- **Q1 is a real question for the owner.** It amends the decision of 2026-11-04. The plan of 2026-11-10 to settle this in part 14 was never carried out. Each option states its cost.
- **WORDING FIX (author), paragraph 3:**
  - EN: "Where an extension of the guidelines (§s-mbmnsnxenmavu3z) defines a kind of node that a part of the base specification (§s-5x737t9nee4zgaa) opens with, a node of that kind takes the part's name alone as its location. The nodes under it are numbered together with the other nodes at the top of the part."
  - RU: «Если расширение guidelines (§s-mbmnsnxenmavu3z) определяет тип узла, которым открывается часть базовой спецификации (§s-5x737t9nee4zgaa), узел этого типа получает расположением одно имя части. Узлы под ним нумеруются вместе с остальными узлами на вершине части.»
  - Add a `cites` link to s-5x737t9nee4zgaa. Rule 1.7.6 already assumes that an extension adds kinds.
- **CUT (author):** reason paragraph 2, in both languages. It also claims that locations "do not depend on which of the part's files holds them", which is not accurate: s-ygg5kpcxgzq3m7w numbers by file order. Its content goes into the new decision.
- **DOUBT (owner, agreed sentences):** cite "term (§s-ypa92gpcj3f5zj8)" and "technical appendix (§s-tj38pvm38nepaf5)". Gather the three exceptions into one list after "A node's place is its number among the nodes under the same parent".
- **DOUBT (proposed example):**
  - EN: "Rule 8.5 of `specs/_guidelines/spec.json` is at `_guidelines/spec/8.5`. Where an extension makes a part `requests` open with a header, the header is at `requests`, and the part's first section, kept in another of its files, is at `requests/1`. The closest mistake is to number the header, which would put that section at `requests/2`."
  - RU: «Правило 8.5 файла `specs/_guidelines/spec.json` расположено в `_guidelines/spec/8.5`. Если расширение открывает часть `requests` заголовком, заголовок расположен в `requests`, а первый раздел части, хранящийся в другом её файле, — в `requests/1`. Ближайшая ошибка — пронумеровать заголовок: тогда этот раздел оказался бы в `requests/2`.»

## H, proposal:domains-header-status, "The approval status of a domain's header": **not ready**

- **WORDING FIX (author), text** (cites s-k73czmpkazcx7mu):
  - EN: "The SpecSheriff tools derive the approval status (§s-tgrnpagrb58tya7) of a domain's header (§s-yggv9myedprnaa7) as they derive a section's (§s-9kfdycuq34beqvs). The header is approved while every node of the domain other than a section and other than the header itself is approved, in whichever of the domain's documents (§s-k73czmpkazcx7mu) the node is kept. Nobody approves a header."
  - RU: «Инструменты SpecSheriff выводят статус одобрения (§s-tgrnpagrb58tya7) заголовка домена (§s-yggv9myedprnaa7) так же, как статус раздела (§s-9kfdycuq34beqvs). Заголовок одобрен, пока одобрен каждый узел домена, кроме раздела и самого заголовка, в каком бы из документов домена (§s-k73czmpkazcx7mu) этот узел ни хранился. Заголовок никто не одобряет.»
- **Link (author):** `refines` → s-9kfdycuq34beqvs becomes `cites`. The rule adds a rule beyond the guidelines (1.7.2), and it adds no requirement on a section's status. Remove this link's row from Q3's table.
- **DOUBT (owner), rule 10.3 (s-83ev4wwesbwnhnp):** "unless the node is a section" → "unless the node is a section or another node whose approval status is derived from other nodes" / «если только это не раздел или другой узел, статус одобрения которого выводится из других узлов». Today guard.ts:117 already skips headers without any rule saying so.
- **DOUBT (example):**
  - EN: "A domain is kept in two documents: the first holds its header, and the second holds its two sections, one rule of which is a draft. The header's approval status is draft. Once that rule is approved, the header becomes approved too, though nobody approved the header. The closest mistake is to derive the header's status only from the nodes under the header, of which there are none here, and so to show the header approved while a rule of the domain is still a draft."
  - RU: «Домен хранится в двух документах: в первом — его заголовок, во втором — два его раздела, и одно правило в них — черновик. Статус одобрения заголовка — черновик. Когда это правило одобрят, заголовок тоже станет одобренным, хотя заголовок никто не одобрял. Ближайшая ошибка — выводить статус заголовка только из узлов под заголовком, которых здесь нет, и тем самым показывать заголовок одобренным, пока правило домена ещё черновик.»
- **Question (author):** the ruling of 2026-11-06 on 1.3.8 already settles Q2. Present the three nodes as carrying out that ruling, and drop options B and C.
- **Stage 3 (author):** model.ts:218 skips a header's children, and the nodes in cells as well. The notes' claim that "the code derives it from every node of the domain" is wrong.

## R11, proposal:11-3-header-status-row: **ready**

No findings. It becomes final once H is agreed.

## R8, proposal:row-10-1-8: **not ready**

- **WORDING FIX (author):**
  - EN: "…, except a section and any other node whose approval status is derived from other nodes, is approved only while…"
  - RU: «…, кроме раздела и любого другого узла, статус одобрения которого выводится из других узлов, одобрен, только пока…»
  - Read as "that nobody has approved", the proposed wording would exempt exactly the node the row exists to catch. The new words match s-95w92rnjuv3sst8.

## K, proposal:s-sn6au3vcr9uy5pm, "What a link is": **not ready**

- **CUT (author):** reason paragraph 3, in both languages. Record its content in the 2026-11-11 decision in `meta.decisions`.
- **WORDING FIX (author), second example:**
  - EN: "`refines`, extending a rule: a rule of a project's own guidelines lists the fixtures of the tests of a check that reads citations, a list that the rule it refines leaves to each project. The closest mistake is an `implements` link from that rule: the rule does not state how the rule it builds on is implemented."
  - RU: «`refines`, расширение правила: правило собственных guidelines проекта перечисляет фикстуры тестов проверки, которая читает ссылки, — этот перечень уточняемое правило оставляет каждому проекту. Ближайшая ошибка — связь `implements` от этого правила: оно не показывает, как выполняется правило, на которое опирается.»
- **WORDING FIX (author), Russian:** «…связь имеет тип `implements`, а не `refines`». The rendering dropped "instead".
- **Question (author):** the ruling of 2026-11-11 already settles that one type covers both. Option B contradicts that ruling, and option C keeps the contradiction with 10.1.24 that report D found. What the owner still has to decide is the two sentences the ruling did not give: "leaves every requirement of the linked node in force", and the precedence of `implements`.
- **TERM:**
  - `refines` fits [SysML] refine and deriveReqt, and the [29148] derived requirement, only in part.
  - In UML, «extend» means something else (unverified, not in the registry). It does no harm while "extends" stays prose.
  - Keep the owner's name. In the docs, gloss the no-weakening rule as the parent's contract that a subclass keeps (inference). Cost: the docs only.

## C, proposal:row-10-1-17: **not ready until the owner answers**

- **WORDING FIX (author), English only:** "…, such as part numbers, where there are one or two of them in a row." The Russian already says «если их одно или два подряд».
- **Q4 is a real question for the owner.** The row is in the owner's own words. P5 was settled without the owner, and line 1226 of the continuation file deferred it to this step.

## X, proposal:s-ztseyetus7np6br: **not ready**

- **CUT (author):** "as the SpecSheriff tools compute it" / «так, как его вычисляют инструменты SpecSheriff».
- **WORDING FIX (author), header item:**
  - EN: "…the approval status of each domain's header, derived from the domain's nodes, those in the cells of a `TableRule` included (§s-yccuyqbypzzx2gu);"
  - RU: «…статус одобрения заголовка каждого домена, выведенный из узлов домена, в том числе из узлов в ячейках `TableRule` (§s-yccuyqbypzzx2gu);»

## Questions only the owner can answer

1. **Q1 (rule 8.5):** where a node that a part opens with is located (options A, B or C).
2. **Q3, narrowed (rule 6.1):** whether to accept the no-weakening sentence and the `implements` precedence.
3. **Q4 (row 10.1.17):** whether to add "one or two in a row".
4. **Proposals on agreed wording:** the citations in 8.5 and the list of its exceptions, and the widening of rule 10.3.
5. **The examples proposed** for 8.5 and for the header rule.

Q2 needs no question: the ruling of 2026-11-06 settles it.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json (10.3 is s-83ev4wwesbwnhnp)
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/extensions/domains.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_schema/extensions/domains.schema.json
- D:/SpecSheriff/skills/tools/src/model.ts (line 218)
- D:/SpecSheriff/skills/tools/src/guard.ts (line 117)
- D:/SpecSheriff/.ai_docs/t25-one-thought.md (lines 86, 1185, 1226, 1274, 1280)