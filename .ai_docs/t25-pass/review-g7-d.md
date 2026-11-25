# Review g7-d: items 55 and 56, and the proposals on items 44 and 47

The report of specsheriff-rule-reviewer on review-input-g7-d.md, 2026-11-25, as the main session saved it. The reviewer read the skill `specsheriff-terminology-review` from its synced copy under `C:/Users/PC/.claude/skills/synced/`.

Summary: of the four drafts, only item 44 is ready. Item 55 contradicts two agreed nodes, item 56 leaves one case undefined, and item 47 needs one shorter sentence.

## Item 55: `s-nk8td3ez58gahc4`, "A RecordType its variants refine": not ready

Checklist lines with ✗:
- 7.2.1: "A RecordType … generates": `sheriff types` is the one that acts.
- 7.2.2: the node opens with "… generates … what this node says", which states nothing of its own.
- 7.2.7: "RuntimeChecks", "`answersTo`" and "SpecTag" are not cited at their first use.
- 7.4.2 and the pairing test: the reason goes through the text paragraph by paragraph.
- 7.6.3: the example never says that `address` is guaranteed, so the mistake it names has no effect.

«Оценка»:
- согласованность: ✗ s-a8fn72xa782wvbk ничего не генерирует из узла, который ни разу не одобрен, а черновой вариант при этом попадает в объединение и в `then`. С s-suv42g8r3ra2h6b другой порядок полей типа варианта, если его `refines` называет фрагмент раньше RecordType.
- целостность: ✗ Те же два стыка. Вопросы 3 и 4 к базе уже записаны.
- целесообразность: ✓ Пары `if`/`then` в `allOf` — образец с json-schema.org.
- избыточность: ✗ Мелочь: «A combination of values holds…» повторяет 12.6.
- недостаточность: ✗ Не сказано, куда идут пары, если `schema` уже содержит `allOf`.

Findings, all for the author:
1. The first sentence → "For a RecordType of which RecordType variants exist (§s-z3dnru6qqdf9m6j), `sheriff types` writes a definition and a type that also describe the fields of each variant. In every other respect, it writes them as it writes those of any RecordType (§s-suv42g8r3ra2h6b)." / «Для RecordType, у которого есть варианты RecordType (§s-z3dnru6qqdf9m6j), `sheriff types` пишет определение и тип, которые описывают и поля каждого варианта. Во всём остальном он пишет их так же, как определение и тип любого RecordType (§s-suv42g8r3ra2h6b).» With the readers' fix, "of which RecordType variants exist" → "that has RecordType variants".
2. The second sentence, settled by the agreed s-a8fn72xa782wvbk, with a `cites` link to it → "The variants of such a RecordType are the RecordType variants whose RecordType it is, as the check of RecordType variants determines (§s-c2r9jndrjbtbsv6), each in the approved wording from which `sheriff types` generates (§s-a8fn72xa782wvbk)." / «Варианты такого RecordType — это те варианты RecordType, чей RecordType — он, как это определяет проверка вариантов RecordType (§s-c2r9jndrjbtbsv6), каждый в той одобренной формулировке, из которой генерирует `sheriff types` (§s-a8fn72xa782wvbk).»
3. "The type of a variant holds … `answersTo` names.", settled by s-suv42g8r3ra2h6b → "The type of a variant is written as the type of any RecordType (§s-suv42g8r3ra2h6b), except that each field that selects a variant is required in it and takes only the value that the variant's `answersTo` (§s-c2r9jndrjbtbsv6) names." / «Тип варианта пишется так же, как тип любого RecordType (§s-suv42g8r3ra2h6b), но каждое поле, выбирающее вариант, в нём обязательно и принимает только то значение, которое называет `answersTo` варианта (§s-c2r9jndrjbtbsv6).»
4. The schema of the extension allows `allOf` in a RecordType's `schema` → "In a file of RuntimeChecks (§s-e877bnfa559tvk9), the RecordType's definition also holds a pair of `if` and `then` for each of its variants, at the end of its `allOf`:" / «В файле RuntimeChecks (§s-e877bnfa559tvk9) определение RecordType содержит ещё и пару `if` и `then` для каждого из его вариантов — в конце своего `allOf`:»
5. "for each variant, a type whose name is that of the variant's type" → "for each variant, the variant's type;" / «для каждого варианта — тип этого варианта;»
6. After "the SpecTag", add "(§s-5z5gnu7pahr82xp)" and a `cites` link to that node.
7. The reason → "A data record holds the fields of its RecordType together with those of the RecordType variant that its values select (§s-z3dnru6qqdf9m6j). The types and RuntimeChecks generated from the RecordType describe such a data record in the form that each language has for fields that depend on the value of another field." / «Запись данных содержит поля своего RecordType вместе с полями того варианта RecordType, который выбирают её значения (§s-z3dnru6qqdf9m6j). Типы и RuntimeChecks, сгенерированные из RecordType, описывают такую запись данных в той форме, которая есть в каждом языке для полей, зависящих от значения другого поля.»
8. The example: after "correspond to `email` and `sms`", add ", and the first declares the guaranteed field `address`" / «, и первый объявляет гарантированное поле `address`».
9. Cut "A combination of values holds one value of each field that selects a variant.": rule 12.6 already says it.
10. `stage3` also covers leaving out variants that were never approved, and appending the pairs to an existing `allOf`.
11. TERM, for the docs: the union of flat types matches TypeScript's discriminated union, fully with one selecting field and in part with several.

## Item 56: `s-4npdup7mjkva69y`, "The type that the schema of a field gives": not ready

Checklist lines with ✗:
- 1.2.3: "The rows that give the same type … are listed apart because …" puts a "why" into the text.
- 7.2.1: "Each value … is taken once" and "The types and the RuntimeChecks take the values alike" name no actor.
- 7.2.7: "RuntimeChecks" is not cited at its first use, and "values gathered beside it" appears in a table cell before its citation.

«Оценка»:
- согласованность: ✓ Сверено с s-6eb92ddch7shuvu, строками 12.12.2 и 12.12.3, s-3anv9qcmx8pwp2w, s-ezq8csd433vj6fj, s-suv42g8r3ra2h6b, s-5nf87c3e3jg9v7c, предложением по s-gb8s9657a65hqmv, решениями от 2026-10-31 и 2026-11-19.
- целостность: ✗ Поле, чей `identifierOf` не называет RecordType с `identifiedBy`, отвергает s-3anv9qcmx8pwp2w. Этот узел не говорит, какой тип и какой RuntimeCheck такое поле даёт.
- целесообразность: ✓
- избыточность: ✗ Мелочь: фраза о строках, перечисленных отдельно.
- недостаточность: ✗ Схема вне строк таблицы молча даёт `unknown`/`Any`.

Findings:
1. Settled by s-3anv9qcmx8pwp2w: "A field with `identifierOf` gives what `{}` gives…" → "A field with `identifierOf` that fails the check of an identifier followed to its end (§s-3anv9qcmx8pwp2w) gives what `{}` gives." / «Поле с `identifierOf`, которое не проходит проверку идентификатора, прослеженного до конца (§s-3anv9qcmx8pwp2w), даёт то же, что `{}`.» In the last list item: "where the field fails the check of an identifier followed to its end (§s-3anv9qcmx8pwp2w), `identifierOf` is removed." / «если поле не проходит проверку идентификатора, прослеженного до конца (§s-3anv9qcmx8pwp2w), `identifierOf` удаляется.»
2. Cut "The rows that give the same type … of its own.": the first paragraph already says that the last column names each row's neutral type.
3. The two sentences on the gathered values → "`sheriff types` takes each value gathered beside a field (§s-ju5vcanbjph7mgh) once, in the type and in the RuntimeCheck (§s-e877bnfa559tvk9) alike, at the place where the value first appears in the field's `x-enumSource.gathered` (§s-5nf87c3e3jg9v7c)." / «`sheriff types` берёт каждое значение, собранное рядом с полем (§s-ju5vcanbjph7mgh), один раз, одинаково в тип и в RuntimeCheck (§s-e877bnfa559tvk9), на том месте, где это значение впервые появляется в `x-enumSource.gathered` этого поля (§s-5nf87c3e3jg9v7c).» In the table cell: "the values gathered beside it (§s-ju5vcanbjph7mgh)" / «значений, собранных рядом с ним (§s-ju5vcanbjph7mgh)». With the readers' fix, "alike" → "in the same way".
4. The reason: "the field that identifies the data records of the RecordType that it names" / «поля, которое идентифицирует записи данных названного им RecordType», as the thorough reader also asks.
5. For the owner, in the reviewer's view: some field schemas match no row of the table, and the extension's schema allows them at any depth: an object written inline with `properties`, `oneOf`, `const`, or a `type` that lists several types. Each such field silently gets `unknown` in TypeScript and `Any` in Python. Should `sheriff types` give such a schema a type of its own, or should such a field be refused?
6. TERM: a `$ref` of `#` followed by a sid matches JSON Schema 2020-12's plain-name `$anchor`. An anchor must start with a letter, and a sid starts with `s`.

## Item 44: `proposal:s-3anv9qcmx8pwp2w-g7`: ready

Every checklist line ✓. «Оценка»: every criterion ✓. No finding.

## Item 47: `proposal:s-ezq8csd433vj6fj-g7`: not ready, one wording fix

- 7.5.2 ✗: "in the forms in which a RecordType's `schema` names another RecordType" adds length without adding meaning.
- Fix: the changed list item → "its `schema` (§s-6eb92ddch7shuvu) names that RecordType at any depth, by a `$ref` or by an `identifierOf` (§s-4npdup7mjkva69y, §s-qpdnkejr5xzc6j3);" / «его `schema` (§s-6eb92ddch7shuvu) на любой глубине называет тот RecordType через `$ref` или через `identifierOf` (§s-4npdup7mjkva69y, §s-qpdnkejr5xzc6j3);»

## Points to look at, as the reviewer judged them

- A `$ref` of `#` plus the sid, and a bare sid in `identifierOf`: the author's reading holds.
- No check of a row in items 55 and 56: holds.
- The seven questions for the base specification: none of these four drafts has to wait for them.
- The proposals on items 44 and 47 change only what their `change` fields list, and each defect is real.

## The main session's decisions

- **Finding 5 of item 56 is not a question for the owner.** The node is in the appendix of the tools and says how the SpecSheriff tools carry out the generation of types that rule 12.3 requires. The owner's rule "Maximum functionality over shortcuts" (global CLAUDE.md) decides it: the tools give a type wherever TypeScript and Python can express one. The table gains rows, each with "—" as the neutral type of an earlier release:
  - `const`: the literal of its value, in TypeScript and in Python's `Literal[...]`;
  - `oneOf` or `anyOf`: the union of the types that its members give;
  - a `type` that lists several types: the union of the types that each gives;
  - an object with `properties`, written inline: an object type of its own, with its fields given as the fields of a RecordType are given, written inline in TypeScript and as a nested `TypedDict` named after the field's path in Python;
  - `allOf`, written inline: the intersection in TypeScript; in Python, the fields of every member merged, as for `refines`.
  A schema that matches no row, including any other keyword, gives what `{}` gives, and the node says so. The drafting agent works out the exact wording and the Python name of a nested `TypedDict`, and says in `stage3` what the code must do.
- Findings 1 to 11 of item 55, findings 1 to 4 and 6 of item 56, and the fix to item 47 are applied as worded, with the readers' words where `english-g7-thorough.md` says so.
