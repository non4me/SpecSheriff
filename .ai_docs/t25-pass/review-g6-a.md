The skill `specsheriff-terminology-review` was already loaded. I edited no file.

Columns: **S** = `new:tools-11-section`, **R** = `s-v4qus7raqnwzneb`, **F** = `new:tools-11-fingerprint`, **A** = `new:tools-11-approve`, **W** = `new:tools-11-withdraw`.

| Checklist line | S | R | F | A | W |
|---|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✗ "So an approval that an agent makes … has the same form" | ✓ | ✗ "In a project other than SpecSheriff itself, … come with the plugin" | ✗ same paragraph |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ | ✗ "of such a node whose approval is in force" |
| 7.2.1 Who must act | ✓ | ✗ "Each line is appended … (§s-upkur…, §s-xybjqp…)": the actor appears only as sids | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✗ "in a list that holds only one of them" | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✗ "A line that holds no `withdrawn` is an approval" | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ | ✓ | ✗ "the node's current wording" is not cited to 1.3.5 | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✗ "…sorted by their UTF-16 code units, and each list keeps its order" | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✗ see the pairing test | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✗ "the header of a domain where the project has chosen…, whose approval status…" | ✗ same, and the 35-word sentence in W1 |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ (the Russian of example 1 needs a fix, F3) | ✓ | ✓ |
| Pairing test of the reason | ✓ | ✗ reason sentence 1 grounds text sentence 1 (the record is kept apart), and sentence 2 grounds text sentence 2 (lines are appended), in order | ✓ | ✓ | ✓ |

**Оценка — `new:tools-11-section`**
- согласованность ✓: сравнено с s-zefk589ykh37b8u (строка «The approvals of nodes»), с согласованными разделами s-qk8ezwujq95er7x и s-v36s7dm8s3yewtr (их текст тоже вида «How …»), с 1.3.4 и 1.3.7.
- целостность ✓: раздел охватывает ровно узлы 11.1–11.4.
- целесообразность ✓: узел «How an approval is recorded» разделён по правилу 7.3.3.
- избыточность ✓
- недостаточность ✓

**Оценка — `s-v4qus7raqnwzneb`**
- согласованность ✓: сравнено с 1.3.3–1.3.7, с s-gb8s9657a65hqmv (g3 и g6), s-95w92rnjuv3sst8, s-75ue25v6r23jkk8 и с решением от 2026-11-06 о порядке строк. В базе 1.3.3 и 10.3 то же понятие пока названо «stands»; их стоит выровнять при следующем изменении.
- целостность ✗: s-a8fn72xa782wvbk, s-txbwsthdqhvyzd2 и s-4bwa4zepd4nwcv8 остаются верны. Но `migrateApprovals` в approvals.ts пишет строки `_confirmations.jsonl` перед уже имеющимися строками, а этот узел и g3 говорят «appended». В stage3 этого нет. Тест «reads the confirmations an earlier release wrote…» описывает s-gb8s9657a65hqmv, а не этот текст.
- целесообразность ✓
- избыточность ✗: второй абзац повторяет перечень ключей и обоснование s-4bwa4zepd4nwcv8.
- недостаточность ✓

**Оценка — `s-f5brvuuu6xmkj6t`**
- согласованность ✓: сравнено с 1.3.5, с 8.6, со схемой `TableRule` в moved (`columns[].key/heading`; у групп `heading` равен `null`), с s-gb8s9657a65hqmv-g6, s-ju5vcanbjph7mgh, 2.6, 10.1.35 (`pointer`, `symbol`) и с model.ts.
- целостность ✓: s-txbwsthdqhvyzd2 переводится на этот sid (пункт 2 заметок).
- целесообразность ✓
- избыточность ✓
- недостаточность ✗: `kind` не входит в отпечаток. Поэтому смена типа узла, например `TextRule` → `term`, которому по s-5z5gnu7pahr82xp код не нужен, сохраняет одобрение. Правило 1.3.5 об этом молчит.

**Оценка — `s-upkur92ry6332y5`**
- согласованность ✗: про `TableRule` узел говорит уже, чем 1.3.4 («every node in its cells that is a draft»). Узел-черновик в ячейке, которому вернули прежнюю, одобренную формулировку, так и останется черновиком.
- целостность ✓: сравнено с s-f5rz6b7dhxejjts, s-75ue25v6r23jkk8, 2.5 и 1.7.5.
- целесообразность ✓
- избыточность ✗: абзац «In a project other than SpecSheriff itself…» пересказывает 2.5.
- недостаточность ✗: не задан порядок одобрений в строке, где узлов несколько.

**Оценка — `s-xybjqp2rxh8gszf`**
- согласованность ✓: сравнено с 1.3.7, с решениями от 2026-10-31 и 2026-11-06 и с approvals.ts.
- целостность ✓: сравнено с s-75ue25v6r23jkk8 и s-95w92rnjuv3sst8.
- целесообразность ✓
- избыточность ✗: тот же абзац о проекте, который не является самим SpecSheriff.
- недостаточность ✗: нет отказа, когда в git не задан адрес почты. Не сказано, что отзыв делает с `TableRule`. Не задан порядок строк.

## Verdicts and findings

**`new:tools-11-section`: ready.** No findings.

**`s-v4qus7raqnwzneb`: not ready.** The author can fix all five findings.
- **R1. WORDING FIX** (the reason). Replace it with:
  - EN: "A node's approval decides whether its code may change, so the SpecSheriff tools take it from a record that no edit of the node changes and that keeps every approval and every withdrawal with whoever made it."
  - RU: «От одобрения узла зависит, можно ли менять его код, поэтому инструменты SpecSheriff берут одобрение из записи, которую не меняет ни одна правка узла и которая хранит каждое одобрение и каждый отзыв вместе с тем, кто их сделал.»
- **R2. CUT** the paragraph "A line names whoever … the owner's own approval." and its `cites` link to s-t5uw8zfxzhfdg86. The reason of s-4bwa4zepd4nwcv8 is still backed by "holds only the following keys" and by the `by` item.
- **R3. WORDING FIX:**
  - EN: "A line that holds `withdrawn` is a withdrawal, and any other line is an approval."
  - RU: «Строка с `withdrawn` — это отзыв, а любая другая строка — одобрение.»
- **R4. WORDING FIX:**
  - EN: "`sheriff approve` (§s-upkur92ry6332y5) and `sheriff approve --withdraw` (§s-xybjqp2rxh8gszf) append each line that they write to the end of the file."
  - RU: «`sheriff approve` (§s-upkur92ry6332y5) и `sheriff approve --withdraw` (§s-xybjqp2rxh8gszf) добавляют каждую строку, которую пишут, в конец файла.»
- **R5. Notes:** stage 3 must make `migrateApprovals` append the old confirmations after the existing lines. The test "reads the confirmations…" should move to s-gb8s9657a65hqmv.

**`s-f5brvuuu6xmkj6t`: not ready.**
- **F1. WORDING FIX:**
  - EN: "…sorted by their UTF-16 code units. Each list keeps the order of its items."
  - RU: «…по их кодовым единицам UTF-16. Каждый список сохраняет порядок своих элементов.»
- **F2. WORDING FIX:** "in a list that holds" becomes "in a `TextRule.list` that holds". RU: «в `TextRule.list`, где есть только одно из них».
- **F3. Russian of example 1:** «поэтому одобрение его новой формулировки не в силе» becomes «поэтому ни одно одобрение его новой формулировки не в силе».
- **F4. DOUBT, for the owner:** should a node's kind be part of its wording? I would include it, under its earlier name as is already done for field values (inference). That way an agent cannot turn a rule into a term and keep the approval while the rule loses its need for code. The cost is that nodes an earlier release wrote as `record` could lose their approval (unverified).

**`s-upkur92ry6332y5`: not ready.**
- **A1. DOUBT, the author can fix it, since 1.3.4 settles it.** Replace the paragraph on `TableRule`:
  - EN: "Where a node that `sheriff approve` names is a `TableRule` (§s-5fewsp22mmdz7y6), the command also approves each node in the table's cells, as it approves a node that it names. It appends these approvals after that of the `TableRule`, in the order of the table's rows and, within a row, in the order of its columns."
  - RU: «Если узел, который называет `sheriff approve`, — `TableRule` (§s-5fewsp22mmdz7y6), команда одобряет и каждый узел в ячейках таблицы так же, как узел, который она называет. Эти одобрения она добавляет после одобрения `TableRule`, в порядке строк таблицы, а внутри строки — в порядке её столбцов.»
- **A2. WORDING FIX:** "an approval (§s-v4qus7raqnwzneb) of the node's current wording (§s-5ah25f6gy99panq)", with a `cites` link to s-5ah25f6gy99panq. RU: «одобрение (§s-v4qus7raqnwzneb) нынешней формулировки узла (§s-5ah25f6gy99panq)».
- **A3. WORDING FIX, in A and W.** Delete the paragraph "In a project other than…" and make the first refusal read:
  - EN: "a sid that names no node in the files that the repository keeps, such as the sid of a node of the SpecSheriff guidelines or of a chosen extension (§s-9ttvcwpqkehm58g) in a project other than SpecSheriff itself, which takes those nodes from the plugin (§s-bsya3febm6u64ab);"
  - RU: «sid, который не называет ни одного узла в файлах, которые хранит репозиторий, например sid узла SpecSheriff guidelines или выбранного расширения (§s-9ttvcwpqkehm58g) в проекте, который не является самим SpecSheriff и берёт эти узлы из плагина (§s-bsya3febm6u64ab);»
- **A4. WORDING FIX, English only, in A and W:** "a section or, where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the header of a domain (§s-yccuyqbypzzx2gu), since `sheriff reindex` derives the approval status of either from other nodes (§s-ztseyetus7np6br);"
- **A5. WORDING FIX, in A and W:** "refuses any node that the run names" becomes "refuses any sid that the run names". RU: «отвергает хотя бы один sid, который называет запуск».

**`s-xybjqp2rxh8gszf`: not ready.**
- **W1. WORDING FIX, English only:** "Where an approval of a wording (§s-5ah25f6gy99panq) of such a node is in force, whether or not the node holds that wording, it appends to `specs/_approvals.jsonl` a line that withdraws that approval (§s-v4qus7raqnwzneb)."
- **W2. DOUBT, the author can fix it.** Add:
  - EN: "Where git's configuration sets no email address, `sheriff approve --withdraw` refuses to run."
  - RU: «Если конфигурация git не задаёт адрес электронной почты, `sheriff approve --withdraw` отказывается работать.»
  - The code already refuses in this case (cli.ts:87).
- **W3. DOUBT, the author can fix it.** Add:
  - EN: "It appends these lines in the order of the first line in the file for each of those wordings."
  - RU: «Эти строки он добавляет в порядке первых строк файла для каждой из этих формулировок.»
- **W4. DOUBT, for the owner:** should withdrawing a `TableRule`'s approval also withdraw the approvals of the nodes in its cells? Rule 1.3.7 supports the author's reading that it does not. Under that reading, though, anyone who finds a table wrong stops changes only to code bound to the table itself. Whichever way the owner decides, the node should say so.

**TERM.**
- "fingerprint": partial fit with [OFT] *revision*, whose change makes coverage outdated. An OFT revision is assigned by the author, while a fingerprint is computed from the wording (inference). Keep the word and gloss it in the docs; this costs no node.
- "approval in force": partial fit with [29148:2018] *baseline*, "a formally approved version … fixed at a specific time". The difference is that a baseline covers a set of requirements and an approval covers one node (inference). Keep the phrase and gloss it in the docs.

**The brief's point on splitting the node:** the author's reading holds. Rule 7.3.3 and the rule "A node is split within its section without asking" settle it. Every agreed node that cites the old sid for the record still holds. Notes items 2–4 name the nodes that must re-cite.

**Questions only the owner can answer:**
1. F4: whether a node's kind is part of its fingerprint.
2. W4: whether withdrawing a `TableRule`'s approval withdraws the approvals of the nodes in its cells.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group6-notes.md
- D:/SpecSheriff/skills/tools/src/approvals.ts
- D:/SpecSheriff/skills/tools/src/model.ts
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_schema/node.schema.json
