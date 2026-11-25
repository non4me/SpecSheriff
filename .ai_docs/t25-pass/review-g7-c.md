# Review g7-c: items 53 and 54, and the proposals on generated copies and on what `sheriff reindex` changes

The report of specsheriff-rule-reviewer on review-input-g7-c.md, 2026-11-25, as the main session saved it. The reviewer read the skill `specsheriff-terminology-review` from its synced copy. The two proposals are ready; items 53 and 54 are not.

## Checklist lines with ✗

Item 53 (`s-pvzms7d8kxb8dk2`):
- 7.2.7: "the technical appendix lists" in paragraph 1 has no citation at its first use.
- 7.3.1: the title covers neither the entry in the bindings file nor the validator.
- 7.3.2: "So it reads the list …, and a rule that has never been approved lists no file"; "It changes no other entry, and names the bindings file where it writes it".
- 7.3.3: the paragraphs on the entry in the bindings file, and the sentence on `format`, can each be carried out without the list of files.
- 7.4.2 and the pairing test: sentences 1–2 of the reason justify paragraphs 1–2, and sentence 3 justifies paragraphs 7–8, in order.

Item 54 (`s-suv42g8r3ra2h6b`): 7.2.7, "RecordType variants" without a citation of 12.6. Every other line ✓, for both proposals as well.

## Item 53, "Where the types and RuntimeChecks generated from the RecordTypes are written": not ready

1. Split the node. Paragraphs 7–8 move into a new node after this one: "The entry of the bindings file for a file of RuntimeChecks" / «Запись в файле привязок для файла RuntimeChecks». The new node implements s-ktfstpv8rurznrp, takes the current reason's last sentence as its reason and the example's sentence about the entry. This node keeps the first two sentences of its reason. The proposal on generated copies then cites the new node.
2. Paragraph 1: "…that it generates from the RecordTypes (§s-7vm323mhry2enx3) only into the files that the technical appendix (§s-tj38pvm38nepaf5) lists for them." Delete "Where the technical appendix lists no such file, `sheriff types` writes no types and no RuntimeChecks." / «…которые он генерирует из RecordType (§s-7vm323mhry2enx3), только в файлы, которые для них перечисляет техническое приложение (§s-tj38pvm38nepaf5).» Add a `cites` link to s-tj38pvm38nepaf5.
3. Paragraph 3: "`sheriff types` reads the list in that rule's last approved wording (§s-a8fn72xa782wvbk). A rule that has never been approved lists no file. `sheriff types` takes the rule's `implements` links from where the SpecSheriff tools take the `refines` links of a rule of the project's own guidelines (§s-t9j29hppag2nren): from the commit that added the rule's last approval or, until that commit is made, from the files of the specification." / «`sheriff types` читает список в последней одобренной формулировке этого правила (§s-a8fn72xa782wvbk). Правило, которое ни разу не одобряли, не перечисляет ни одного файла. Связи `implements` этого правила `sheriff types` берёт там же, где инструменты SpecSheriff берут связи `refines` правила собственных guidelines проекта (§s-t9j29hppag2nren): из коммита, который добавил последнее одобрение правила, а пока такого коммита нет — из файлов спецификации.»
4. Paragraph 8: "…holds another value for that path. It leaves every other entry as it is. When it writes the entry, it names the bindings file." / «`sheriff types` вносит эту запись, если в файле привязок её нет или под этим путём в нём другое значение. Остальные записи он оставляет как есть. Внеся запись, он называет файл привязок.» With the readers' "a different value".
5. Measured on the saloon: its code glob is `src/**/*.ts`, and its stack lists `src/generated/checks.json`. s-9rtrj24myzjvshu refuses an entry of the bindings file for a file outside the system's code, so it would refuse this entry. Propose a change to "Project-wide settings" (`proposal:new-tools-1-settings-g3`), adding to the system's code "the files into which `sheriff types` writes the types and the RuntimeChecks (§s-pvzms7d8kxb8dk2);" / «файлы, в которые `sheriff types` записывает типы и RuntimeChecks (§s-pvzms7d8kxb8dk2);».
6. s-vp24dqydygztqbt leaves "the files that `sheriff types` writes" out of the reviewer's view. This node makes `sheriff.bindings.json` one of them, so entries written by hand would be hidden from the reviewer. Propose the change now: "writes" becomes "generates", «записывает» becomes «порождает».
7. Before any RecordType is approved, the entry would be an empty list, which s-9rtrj24myzjvshu refuses. Add: "`sheriff types` writes a file of RuntimeChecks, and its entry, only where the file holds at least one definition." / «Файл RuntimeChecks и его запись `sheriff types` записывает, только если в файле есть хотя бы одно определение.»
8. The sentence on `format` binds the project's validator, which no SpecSheriff tool carries out or checks, and rule 12.3 already leaves that validator to the technical appendix. Under the standard `$schema`, asserting `format` is an option of the validator; JSON Schema 2020-12 lets a schema demand it only through the format-assertion vocabulary in a meta-schema of its own (Validation §7.2.2). The reviewer recommends recording this as question 8 for the base specification, a sentence for rule 12.3, and keeping the sentence here until it is answered.
9. Cut "not only as an annotation": a negation that adds nothing to "as an assertion".
10. Russian: «Проверка сгенерированных копий» → «Проверка порождённых копий», the name that s-a8fn72xa782wvbk uses.

«Оценка»: согласованность ✓; целостность ✗ (s-9rtrj24myzjvshu отвергнет запись для файла вне шаблонов кода, s-vp24dqydygztqbt скроет от рецензента записи, сделанные вручную, требование к валидатору относится к 12.3); целесообразность ✓; избыточность ✗ (второе предложение первого абзаца повторяет первое через отрицание); недостаточность ✗ (не сказано, что записывается, когда в файле RuntimeChecks нет ни одного определения).

## Item 54, "What a RecordType generates": not ready

1. With item 55: the draft says a RecordType with variants generates item 55's output "in addition", while item 55 replaces two things: the RecordType's type becomes a union, and a variant's definition holds only the fields it adds. Replace the last sentence of paragraph 7: "Where RecordType variants (§s-z3dnru6qqdf9m6j) of a RecordType exist, the node on such a RecordType (§s-nk8td3ez58gahc4) says what the RecordType and each of its variants generate in place of, or in addition to, what this node says." / «Если у RecordType есть варианты RecordType (§s-z3dnru6qqdf9m6j), узел о таком RecordType (§s-nk8td3ez58gahc4) говорит, что этот RecordType и каждый его вариант генерируют вместо сказанного в этом узле или в дополнение к нему.», with a `cites` link to s-z3dnru6qqdf9m6j. Item 55's opening sentence has the same fault.
2. With rule 6.1 and JSON Schema: rule 6.1 says the refining node leaves every requirement of the linked node in force. When a field is declared twice, the draft keeps only the last schema, which can drop the bound of the refined RecordType; JSON Schema's `allOf` keeps both. "…the field's schema in a definition is an `allOf` that holds their schemas in the order in which they are taken. In a type, the field has the type that the last of these schemas gives (§s-4npdup7mjkva69y)." / «…схема поля в определении — это `allOf`, который содержит их схемы в том порядке, в каком они взяты. В типе у поля тот тип, который даёт последняя из этих схем (§s-4npdup7mjkva69y).» The example: "…`street` with the type that `user` gives it, and then `name`. The definition `User` checks `street` against the schemas of both RecordTypes." / «…`street` с типом, который даёт ему `user`, а затем `name`. Определение `User` проверяет `street` по схемам обоих RecordType.»
3. The third case of a name that cannot be generated: "a `$ref` names a sid that no RecordType has, so the type that the `$ref` refers to has no name." / «`$ref` называет sid, которого нет ни у одного RecordType, поэтому у типа, на который указывает `$ref`, нет имени.»
4. Russian, the reason: «проверка сгенерированных копий» → «проверка порождённых копий».

«Оценка»: согласованность ✗ (схема последнего объявления отменяет требование уточняемого RecordType вопреки 6.1); целостность ✗ («in addition» расходится с пунктом 55); целесообразность ✓; избыточность ✓; недостаточность ✓.

## `proposal:s-dbk2vyeg8z5jxna-g7`: ready

It changes only what its `change` lists, and the defect is real. If item 53 is split, the citation moves to the new node. A note for the continuation file: read literally, the agreed s-a8fn72xa782wvbk ("refuses anything that `sheriff types` would write") would not let a missing entry be written, as it already does not let a differing file be rewritten.

## `proposal:s-gb8s9657a65hqmv-g7`: ready

It changes only the two listed items and adds one `cites` link. Both defects are real and both match the page that the owner accepted on 2026-11-19.

## The reviewer's questions for the owner

1. Where the requirement that the validator assert `format` belongs (item 53, finding 8).
2. Whether to agree to item 53's entry in the bindings file, and the paragraph on generated copies that checks it, now, or after the answer to question 6 for the base specification, whose recommendation would replace both.

## The main session's decisions

- **Neither question goes to the owner now.** Both concern the base specification, and the owner's rule "One part at a time" keeps them until the appendix of the tools is done. The drafts follow the base as it stands:
  - question 1 becomes question 8 for the base specification, under "Found and owed": whether rule 12.3 requires a validator that asserts `format`. The sentence stays in item 53 until then, without "not only as an annotation";
  - for question 2, the entry and its check are agreed now. If the answer to question 6 changes them, the nodes change then.
- Findings 1 to 7 and 9 to 10 of item 53 are applied. Findings 5 and 6 are proposals on agreed nodes, as the first lesson of the brief for group 7 says.
- Findings 1 to 4 of item 54 are applied. Finding 1 also applies to item 55's opening sentence, which review g7-d rewrites.
- The note on s-a8fn72xa782wvbk goes under "Found and owed", to be fixed the next time that node changes.
