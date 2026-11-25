# Follow-up review g7b-c: items 53 and 54, the entry in the bindings file, and three proposals

The report of specsheriff-rule-reviewer on review-input-g7b-c.md, 2026-11-25, as the main session saved it. Item 53, the new node s-h5rfyy9j8nnhx62 and item 54 are not ready. The proposals on generated copies and on project-wide settings are ready; the proposal on the review is ready once one `change` note is fixed. Nothing is for the owner.

## Checklist lines with ✗

Item 53 (`s-pvzms7d8kxb8dk2`):
- 7.3.1: the title does not cover the validator.
- 7.3.3: "The JSON Schema validator … treats `format` as an assertion." is a requirement of its own.
- 7.4.2 and the pairing test: "makes that choice, in a list that the SpecSheriff tools read" repeats paragraph 2, and the reason's sentences follow the paragraphs in order.

Every other line ✓, for all six drafts.

## «Оценка»

- s-pvzms7d8kxb8dk2: целостность ✗ (предложение о `format` — отдельное требование к валидатору проекта; обоснование ссылается на s-vj7ercem526zd6v, а в новой форме выбор, касающийся всей системы, относит к разделу о стеке узел s-mm2de262g3jkapu); избыточность ✗ (второе предложение обоснования пересказывает второй абзац); недостаточность ✗ (не сказано, какое правило брать, если 12.3 реализует ещё и правило стека без списка, например правило о валидаторе).
- s-h5rfyy9j8nnhx62, s-suv42g8r3ra2h6b and the three proposals: every criterion ✓.

## Findings, all for the author

1. Item 53: move the `format` sentence, unchanged, into a new node after s-h5rfyy9j8nnhx62 that implements s-e877bnfa559tvk9. Title "The validator of the RuntimeChecks" / «Валидатор RuntimeChecks». Reason "A validator that treats `format` only as an annotation accepts a date that is no date." / «Валидатор, который считает `format` только аннотацией, пропускает дату, которая датой не является.» Question 8 for the base specification decides the node's final home later.
2. Item 53, the reason → "Where the generated code goes concerns the whole system, so the technical appendix describes it in its section on the stack (§s-mm2de262g3jkapu)." / «Куда записывается сгенерированный код — выбор, который касается всей системы, поэтому техническое приложение описывает его в своём разделе о стеке (§s-mm2de262g3jkapu).», with a `cites` link to s-mm2de262g3jkapu.
3. Item 53: "That rule is the one that has an `implements` link to…" → "That rule is the one that has both a `TextRule.list` and an `implements` link to…" / «Это то правило, у которого есть и `TextRule.list`, и связь `implements` с…». types.ts already reads it this way.
4. s-h5rfyy9j8nnhx62, the reason → "The code generated from a RecordType is bound to it (§s-ktfstpv8rurznrp), so the RuntimeChecks can be found from each RecordType, as its types can." / «Код, сгенерированный из RecordType, привязан к нему (§s-ktfstpv8rurznrp), поэтому RuntimeChecks можно найти от каждого RecordType так же, как его типы.» With the thorough reader's "each RecordType's RuntimeChecks can be found starting from it".
5. Item 54: "They take no RecordType twice." → "They take each RecordType only the first time that they reach it." / «Каждый RecordType они берут, только когда доходят до него впервые.»
6. `proposal:s-vp24dqydygztqbt-g7`: the example is the same as in the agreed base, yet its `change` says «Добавлено…»; set it to «Как в согласованной формулировке.»

## Other checks

Every proposal changes only what its `change` field lists, and each defect it fixes is real. Apart from finding 6, round b added no new defect. None of the questions for the base specification blocks these drafts.

## The main session's decisions

Every finding is applied as worded, with the readers' changes in `english-g7b-fast.md` and `english-g7b-thorough.md`. The new node of finding 1 takes the key `new:tools-17-validator` and a new sid.
