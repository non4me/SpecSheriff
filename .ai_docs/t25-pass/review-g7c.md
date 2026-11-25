# Final review g7c: what round c changed, and the new node on the validator

The report of specsheriff-rule-reviewer on the brief `review3-brief-group7.md`, 2026-11-25, as the main session saved it.

## Verdicts

- `new:tools-17-validator` (s-axxezge5duzemgs), "The validator of the RuntimeChecks": not ready. Every checklist line ✓.
- `s-suv42g8r3ra2h6b`: not ready.
- `s-pvzms7d8kxb8dk2` and `s-4npdup7mjkva69y`: ready, with nits.
- Ready, with no new defect in round c's sentences: `s-k4nqjr96ux7a5m7`, `new:tools-5-export`, `new:tools-5-show`, `s-rpv4fkdqqguptqd`, `new:tools-4-diagram`, `new:tools-17-bindings-entry`, `s-nk8td3ez58gahc4`, and all seven proposals.
- Q1 and Q2 are built as the brief asks, and both match the page. Q1's label was checked against table 10.1.

## «Оценка» of the new node

- согласованность ✗: узел требует от валидатора проекта то, чего не требует правило 12.3 (s-e877bnfa559tvk9). Это вопрос 8 к базовой спецификации, отложенный основной сессией, так что автору здесь исправлять нечего.
- целостность ✓
- целесообразность ✓: по JSON Schema 2020-12 (Validation, §7.2.1) проверка `format` по умолчанию выключена.
- избыточность ✓
- недостаточность ✗: по §7.2.1 валидатор, включённый на проверку `format`, вправе считать любой формат всегда верным, так что «treats `format` as an assertion» не гарантирует, что дату, которая датой не является, отвергнут.

## Findings

`new:tools-17-validator`:
1. The text → "The JSON Schema validator that the technical appendix (§s-tj38pvm38nepaf5) names for the RuntimeChecks (§s-e877bnfa559tvk9) refuses each value that does not match the `format` of its schema, for every format that the RuntimeChecks use." / «Валидатор JSON Schema, который техническое приложение (§s-tj38pvm38nepaf5) называет для RuntimeChecks (§s-e877bnfa559tvk9), отвергает каждое значение, которое не соответствует `format` его схемы, — для каждого формата, который используют RuntimeChecks.» Question 8's recommendation in `group7-notes.md` uses the same words.
2. An example: "The RecordType `user` has the field `birthDate` with the schema `{"type": "string", "format": "date"}`. The validator refuses a data record whose `birthDate` is `"2026-02-30"`. The most likely mistake is to keep the validator's default setting, under which `format` is only an annotation, so that this data record passes." / «У RecordType `user` есть поле `birthDate` со схемой `{"type": "string", "format": "date"}`. Валидатор отвергает запись данных, у которой `birthDate` равно `"2026-02-30"`. Самая вероятная ошибка — оставить валидатор с настройкой по умолчанию, при которой `format` — только аннотация, так что эта запись данных проходит.»

`s-suv42g8r3ra2h6b`:
3. Round c's "built from" made "in which" attach to the RecordType's own `schema`, which does not hold the fields taken through `refines`. → "A definition is built from the RecordType's own `schema`. In the definition, `properties` holds these fields and `required` lists the guaranteed ones." / «Определение строится из собственной `schema` RecordType. В определении `properties` содержит эти поля, а `required` перечисляет гарантированные.»

`s-pvzms7d8kxb8dk2`, nits:
4. The reason → "Where the generated code goes is a choice that concerns the whole system, so the technical appendix describes it in its section on the stack (§s-mm2de262g3jkapu)."
5. "…refuses a list that names a file whose name has any other extension, and any other fault that keeps `sheriff types` from writing any file (§s-dbk2vyeg8z5jxna)." / «…и любой другой изъян, из-за которого `sheriff types` не может записать ни одного файла (§s-dbk2vyeg8z5jxna).»

`s-4npdup7mjkva69y`, nit:
6. "Such a field is required…" → "A field of that `TypedDict` is required where the `required` of any member of the `allOf` lists it." / «Поле этого `TypedDict` обязательно, если его перечисляет `required` хотя бы одного элемента `allOf`.»

## For the owner

No new question. Whether the validator node stays in the appendix of the tools depends on question 8 for the base specification.

## The main session's decisions

Every finding is applied as worded, together with `english-g7c-fast.md` and `english-g7c-thorough.md`. Finding 1 replaces the readers' fix to the node's text; the readers' fix to its reason stands.
