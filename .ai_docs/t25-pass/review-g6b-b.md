The skill was in context. I edited no file.

**Checklist** (`node .claude/vt/writing-rules.mjs`). E = `new:tools-2-entries`, A = `new:tools-2-approve-spec`, X = `new:tools-2-extension-off`.

| Line | E | A | X |
|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✗ "the JSON Pointer of the reference" can be read two ways (X2) |
| 7.2.1 Who must act | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✗ "`sheriff settings` appends each entry": first use, not cited (E3) | ✗ "which `sheriff types` makes (§s-f8fmudceuyaj942)": the sid is the row's, not the node on the command (A4) | ✗ `sheriff settings` is never cited and has no link (X1) |
| 7.3.1 The title | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✗ "…no owner has approved the specification, so the specification is a draft": two relations (E1) | ✗ "refuses to record the approval and makes no other check" (A1) | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✗ "records nothing and": adds nothing after "only where" (E2) | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ |
| Pairing test of the reason | ✓ | ✓ | ✓ |

**Оценка — E**
- согласованность: ✓ s-qzthyh7yqvfhsa2, s-q3pfzyaxvpr2zj2, s-9ttvcwpqkehm58g, s-9g7jj8z4yf9kq93, s-chsfpkgpmfk4fft, s-j9r8z4xdrfkfs47, s-zefk589ykh37b8u (согласованный черновик), s-w6gybeqn2ttydqx, proposal:s-gb8s9657a65hqmv-g6, решение от 2026-11-17 о значении по умолчанию.
- целостность: ✓ s-j9r8z4xdrfkfs47, s-m59dqwkw2e96wne, s-nxgkp988mej79eg, s-n4ny597qdv9c9bu, proposal:s-gb8s9657a65hqmv-g6. s-st6td4mua9uqt9z указан в пункте 8 заметок.
- целесообразность: ✓ вид записей не задавал ни один узел. s-j9r8z4xdrfkfs47 проверяет три списка одинаково, поэтому решение автора дать один узел на три настройки верно.
- избыточность: ✓
- недостаточность: ✓ `config.schema.json` добавляется в stage 3, это записано в заметках.

**Оценка — A**
- согласованность: ✗ узел говорит «a commit that changes nothing», а правило 10.7 и s-nxgkp988mej79eg говорят «a commit or push», хотя узел называет этот отказ тем же самым (A1). Набор проверок сверен с правилом 10.6 и с тем, какая команда делает каждую строку: s-dbk2vyeg8z5jxna, s-jgejd5rpd9d43pd, s-nh8b2hjvzasdxmd, s-m8nmfsxkcfu7cjp, s-a8fn72xa782wvbk, s-txbwsthdqhvyzd2.
- целостность: ✓ s-7pk89t8z6wymmj9-g6, s-nxgkp988mej79eg, s-chsfpkgpmfk4fft, s-j4webte36gkraju, s-j9r8z4xdrfkfs47, s-trwczfskj5zmuft, s-75ue25v6r23jkk8.
- целесообразность: ✓ запуск требует правило 10.6. Решение автора проверять всё как один коммит верно: без одобрений в силе строка 10.1.41 не показала бы правило без кода.
- избыточность: ✗ (мелочь, A3) то же самое о модели для собственных проверок проекта говорит абзац proposal:s-7pk89t8z6wymmj9-g6 «Before `sheriff settings` records an approval…». Его лучше убрать оттуда, как ревью d убрало там предложение о флаге.
- недостаточность: ✓

**Оценка — X**
- согласованность: ✓ s-j8y62pa9hzz6nwx, s-9ttvcwpqkehm58g, s-xzcw3hv4hmxz7h7, `extension.schema.json`, `archive-file.schema.json`, proposal:s-gb8s9657a65hqmv-g6, s-j4webte36gkraju.
- целостность: ✗ узел работает с `sheriff settings` и его аргументами, но не цитирует s-chsfpkgpmfk4fft и не ссылается на него (X1).
- целесообразность: ✓ отказ требует правило 1.7.6.
- избыточность: ✓
- недостаточность: ✗ решение автора верно для узлов, но не для расширения схемы проекта. После отзыва s-xzcw3hv4hmxz7h7 отвергнет расширение схемы проекта, чьи `fields` задают условия для типа из `kinds` расширения. Пример этого узла делает именно так для RecordType. Узел архива составная схема проверяет целиком, а черновик учитывает у него только тип. Обоснование при этом обещает «everything» (X3).

**Verdict:** none of the three drafts is ready. Each passes after the fixes below, and none of the fixes needs the owner.

**E: not ready.**
- **E1 WORDING FIX:** "…no owner has approved the specification. The specification is then a draft (§s-9g7jj8z4yf9kq93)." / «…ни один ответственный не одобрял спецификацию. Тогда спецификация — черновик (§s-9g7jj8z4yf9kq93).»
- **E2 CUT**, which also follows the owner's rule "A rule says what holds": "Otherwise it says that the setting already has that value." / «Иначе она сообщает, что настройка уже имеет это значение.»
- **E3 WORDING FIX:** "`sheriff settings` (§s-chsfpkgpmfk4fft) appends…", and the same in Russian.

**A: not ready.**
- **A1 WORDING FIX:** "Where any of them would refuse a commit or push that changes nothing, `sheriff settings` refuses to record the approval. Its run ends with that refusal." / «Если хотя бы одна из них отвергла бы коммит или push, который ничего не меняет, `sheriff settings` отказывается вносить одобрение. На этом отказе её запуск заканчивается.»
- **A2 WORDING FIX:** the rule "Writing" says that a phrase pointing back to another paragraph must name its subject again. The thorough reader raised this in round a, and the notes do not answer it. In paragraphs 2, 3 and 5, "These checks", "The checks" and "these checks" become "the checks before an approval" / «проверки перед одобрением».
- **A3:** a nit, explained under «избыточность».
- **A4 WORDING FIX:** "(§s-a8fn72xa782wvbk, §s-f8fmudceuyaj942)", and the same in Russian.

**X: not ready.**
- **X1 WORDING FIX:** "`sheriff settings` (§s-chsfpkgpmfk4fft) refuses…", and the same in Russian, with a `cites` link.
- **X2 WORDING FIX:** "the JSON Pointer to the reference". A `$ref` itself holds a JSON Pointer, so the current words can mean either. The Russian already means the location.
- **X3 DOUBT**, for the author. It follows from rule 1.7.6's example, on the same basis as round a's finding 9, and it supersedes X2.
  - Paragraph 2: "…, including a node of the archive (§s-f2b5zvc565s242f), depends…" / «…, в том числе узел архива (§s-f2b5zvc565s242f), зависит…». Last item: "a node outside the archive has a link to a node in the extension's file." / «у узла вне архива есть связь с узлом из файла расширения.»
  - Paragraph 3: "The refusal names a node of the archive by its file and its location, since it has no sid." / «Узел архива отказ называет по его файлу и расположению, потому что sid у него нет.»
  - Paragraph 4, added after its first sentence: "Its `fields` depend on the extension where they set conditions for a kind that the `kinds` of the extension's schema add." / «Его `fields` зависят от расширения, если задают условия для типа, который добавляют `kinds` схемы расширения.» Its refusal sentence becomes: "The refusal names such a reference or kind by that file and the JSON Pointer to it." / «Такую ссылку или такой тип отказ называет по этому файлу и указателю JSON Pointer на них.»
  - Paragraph 5: "each reference and each kind in the `fields` of the project's extension of the schema" / «каждую ссылку и каждый тип в `fields` расширения схемы проекта».

**TERM:** "JSON Pointer" is the term of RFC 6901, read in this run: "a string syntax for identifying a specific value within a JSON document". The meaning is the same. Keep it, at no cost.

**Findings only the owner can answer:** none. X3 goes to the owner only if the main session reads rule 1.7.6 as covering nodes alone.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group6-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_schema/archive-file.schema.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_schema/extension.schema.json

Source: [RFC 6901](https://www.rfc-editor.org/rfc/rfc6901)
