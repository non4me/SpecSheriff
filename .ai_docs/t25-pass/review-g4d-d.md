## Group 4, final review: item 40 and the proposal on `new:tools-1-project`

Both drafts are ready. The only findings are two nits, and none needs the owner. The skill `specsheriff-terminology-review` was in context, and I changed no file.

**Checklist** (`node .claude/vt/writing-rules.mjs`; A = `s-b6qdtghnyha3fhk` "Running the tests before a push", B = `proposal:new-tools-1-project-g4` "What the SpecSheriff tools read in the project's own guidelines")

| Rule | A | B |
|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ ("both of the following" also appears in agreed nodes) | ✓ |
| 7.4.2 The reason | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ (no example needed) |
| Pairing test of the reason | ✓ | ✓ |

**Оценка — A (`s-b6qdtghnyha3fhk`)**
- согласованность: ✓ сверено со строкой 10.1.44 (s-aufnqn6t7y2me7a) и её решениями от 2026-11-17 и 2026-11-18, с s-x8uzc8z44pwtd3h, 10.6, 1.3.2, 1.3.5, s-a8fn72xa782wvbk, s-5hb9k2e34dgn284, «The hooks» (s-477gtdrkw34dzxw) и её решением от 2026-10-31, «Project-wide settings», с решениями узла от 2026-11-06 и с принципом «Nothing unapproved is implemented».
- целостность: ✓ механизм тот же, что в B. Изменение «The hooks» (пункт 57) названо в заметках. Есть расхождение двух согласованных узлов (N2), но не по вине черновика.
- целесообразность: ✓ проект, который не запускает тесты при push, не получает отказ (решение от 2026-11-17). Push, который только удаляет ref, ничего не приносит в общую ветку.
- избыточность: ✓ абзац 3 отчасти повторяет B. Так нужно, пока у B нет sid; к тому же абзац добавляет «на момент этого коммита» и значение `push`.
- недостаточность: ✓ не найдена.

**Оценка — B (`proposal:new-tools-1-project-g4`)**
- согласованность: ✓ сверено с `new:tools-1-project`, s-a8fn72xa782wvbk, 1.3.2, 1.3.5, 10.15, 9.8 и её решением от 2026-11-11, `new:tools-2-generator`, `new:tools-7-2-own-kinds` и её обоснованием, s-7pk89t8z6wymmj9, строкой 10.1.44 и с принципами.
- целостность: ✓ связи `refines` защищены так же, как у RecordType. Связи `exempts` защищает правило 9.8. A читает правила так же.
- целесообразность: ✓ хуку pre-push нужно знать, назван ли push, и ни черновик, ни правка связи не могут выключить тесты.
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

**Verdicts:** A is **ready**. B is **ready**.

- Every finding of the third review was applied: F1 to F4, and D1 in both drafts. Every finding of its readers was either applied or rejected for a reason that holds.
- Round d added no defect.
- B changes only what its `change` field lists.
- The author's reading of item 40 holds.

**Nit N1 (A, author can fix):** two nodes describe one mechanism in different words. Also, "the approval of that wording" leaves open which approval counts when one wording was approved twice. This is a nit because that case is rare, and "last approved wording" already points to the last approval.
- EN: "from the commit that added the approval of that wording" → "from the commit that added the rule's last approval to `specs/_approvals.jsonl`".
- RU: «из коммита, который добавил одобрение этой формулировки» → «из коммита, который добавил последнее одобрение этого правила в `specs/_approvals.jsonl`».

**Nit N2 (notes only, author can fix):** s-x8uzc8z44pwtd3h says "name where the tests run". Row 10.1.44 and both drafts say "the moment at which the tests run". This should be recorded under "Changes needed outside the group" and fixed when s-x8uzc8z44pwtd3h next changes.

**TERM:** no finding.

**Findings only the owner can answer:** none.

Files:
- `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`
- `D:/SpecSheriff/.ai_docs/t25-pass/group4-notes.md`
