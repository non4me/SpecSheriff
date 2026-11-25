# Group 2 review, input D: five drafts (items 22 to 26)

None of the five drafts is ready yet. The author can fix almost everything below with the exact words given. One question is for the owner (Q1, at the end). The skill `specsheriff-terminology-review` was in context, and `node .claude/vt/writing-rules.mjs` ran (25 rules and the pairing test). I changed no file.

---

## 1. `new:tools-8-symbol`: "How a symbol carries its SpecTags" (s-33fw3ga4ctd94dq) — **not ready**

**Checklist**
- 1.2.3 Text and reason ✓
- 7.1 Goal, reader, scope ✗ "with no program": it is unclear what that excludes. "in Python, a comment line": this allows only one SpecTag, yet the code reads every comment line directly above the symbol.
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✓
- 7.2.4 ✓
- 7.2.4.1 ✓
- 7.2.4.2 ✓
- 7.2.4.3 ✓
- 7.2.4.4 ✓
- 7.2.4.5 ✓
- 7.2.5 ✓
- 7.2.6 ✓
- 7.2.7 ✗ "In a file whose language a description covers": "description" is explained only in the last paragraph.
- 7.3.1 ✓
- 7.3.2 ✗ The reason's sentence "…can tell which symbol the SpecTag binds, and gives the same answer…" holds two thoughts.
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✓
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✓
- Pairing test ✓ (both sentences justify the one choice of place; "There" ties them)

**Оценка**
- согласованность ✓ — сверено с 1.5.2 (s-kgbzk2ph9e6jfb4), 9.3 (s-8xw4mgvpexyvw5q), решениями s-5z5gnu7pahr82xp от 2026-09-22, 2026-10-08 и 2026-10-27, и с code.ts.
- целостность ✓ — s-5qdjyf6t898rsd4, s-zrsc6asgmhv8tnc, s-9rtrj24myzjvshu и s-utf4mbt7ref8g9c находят здесь, что такое описание языка. Пробел в 1.5.2 (операторы верхнего уровня, которые не символы) записан в заметках, п. 10.
- целесообразность ✓ — без этого узла неизвестно, где у символа стоит SpecTag и как инструменты его находят.
- избыточность ✓ — не найдено.
- недостаточность ✗ — «описание» объяснено поздно; «with no program» непонятно; в Python допускается только одна строка; не сказано, что происходит с реэкспортом ряда, у которого есть свой SpecTag.

**Findings** (all fixable by the author; the sentences marked "agreed" appear on the page as changes)
- **WORDING FIX.** Paragraph 1 opens with: "In a file whose language is described in the folder `languages/` of the SpecSheriff tools," / «В файле на языке, описанном в папке `languages/` инструментов SpecSheriff,». In the last paragraph, cut "The descriptions are the files in the folder `languages/` of the SpecSheriff tools." / «Описания — это файлы в папке `languages/` инструментов SpecSheriff.»
- **WORDING FIX** (agreed sentence). "in Python, one or more comment lines." / «в Python — одна или несколько строк комментария.» The code reads every comment line directly above the symbol, and a symbol bound to two rules needs two lines.
- **WORDING FIX** (agreed sentence; my reading of the decision of 2026-09-22, an inference). "They parse each file on its own, with the parser alone and no type checker." / «Они разбирают каждый файл отдельно, только парсером и без проверки типов.»
- **WORDING FIX** (implementer question). "…carries `@spec none`, that SpecTag also binds each later re-export of the run that carries no SpecTag of its own." / «…есть `@spec none`, этот SpecTag привязывает и каждый следующий реэкспорт ряда, у которого нет своего SpecTag.» This matches code.ts:199.
- **WORDING FIX**, reason. "There a parser, unlike a scan of the text, tells which symbol the SpecTag binds, the same way for the same file every time." / «Там парсер, в отличие от поиска по тексту, определяет, какой символ привязывает SpecTag, — одинаково для одного и того же файла каждый раз.»
- **Russian.** «Делить строку с SpecTag могут только ограничители комментария.» The English says "delimiters", in the plural.
- **Example.** "…so that the SpecTag is directly above no symbol…" / «…тогда SpecTag не стоит непосредственно ни над каким символом…»

---

## 2. `new:tools-8-file-start`: "SpecTags at the start of a file" (s-5qdjyf6t898rsd4) — **not ready**

**Checklist**
- 1.2.3 ✓
- 7.1 ✗ "The SpecTags of such a file" points back to the paragraph before. "The text that follows `@spec none` runs…" reads as a rule for every `@spec none`.
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✓
- 7.2.4 ✓
- 7.2.4.1 ✓
- 7.2.4.2 ✓
- 7.2.4.3 ✓
- 7.2.4.4 ✓
- 7.2.4.5 ✓
- 7.2.5 ✓
- 7.2.6 ✓
- 7.2.7 ✓
- 7.3.1 ✓
- 7.3.2 ✓
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✓
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✗ "The most likely mistake is to put the SpecTag after a licence comment": a licence comment of one line is the first line, which is not counted, so the SpecTag after it does bind the file.
- Pairing test ✓

**Оценка**
- согласованность ✗ — первая строка не учитывается ни в каком формате, поэтому перед SpecTag может стоять строка содержимого. Это расходится с 1.5.2 («как можно ближе к началу, насколько позволяет формат»), и пример противоречит тексту.
- целостность ✓ — s-9rtrj24myzjvshu, s-trwczfskj5zmuft («формат допускает комментарии»), 9.1 (s-hheus6f395ynqvc).
- целесообразность ✓ — правило 1.5.2 от 2026-11-17 требует SpecTag в начале файла, который инструменты не разбирают.
- избыточность ✓ — не найдено.
- недостаточность ✗ — третий абзац не ограничен файлами, привязанными SpecTag в начале.

**Findings** (author)
- **WORDING FIX** (recommended). "The file's first line is not counted where it opens with `#!` or `<?`, so that a shebang or a declaration that the format requires first, such as an XML declaration, may come before them." / «Первая строка файла не учитывается, если она начинается с `#!` или `<?`, чтобы перед ними могли стоять shebang или объявление, которое формат требует первым, например объявление XML.»
  - Cost: a format whose required first line starts some other way, such as `%!PS`, cannot carry SpecTags at its start (inference).
  - Minimum alternative: keep the current rule and make the example say "a licence comment of several lines".
- **WORDING FIX.** "The SpecTags at the start of a file are on the lines…" / «SpecTag в начале файла стоят в строках…»
- **WORDING FIX.** "In a file bound by SpecTags at its start, the text that follows `@spec none` runs…" / «В файле, привязанном SpecTag в начале, текст после `@spec none` идёт…»

---

## 3. `new:tools-8-bindings`: "The bindings file" (s-trwczfskj5zmuft) — **not ready**

**Checklist**
- 1.2.3 ✓
- 7.1 ✓
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✗ "an object of that form" points back to another paragraph.
- 7.2.4 ✓
- 7.2.4.1 ✓
- 7.2.4.2 ✓
- 7.2.4.3 ✓
- 7.2.4.4 ✓
- 7.2.4.5 ✓
- 7.2.5 ✓
- 7.2.6 ✓
- 7.2.7 ✗ "a file of the system's code other than tests": not cited, and there is no link to s-hheus6f395ynqvc.
- 7.3.1 ✓
- 7.3.2 ✗ The reason's sentence "…only by the file's path, and the path stays the same when the file is moved…" sets two facts side by side, and the second is false: the file's path changes, the entry's does not.
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✓
- 7.5.1 ✓
- 7.5.2 ✗ "Such a format is JSON, … list for it" runs to 30 words. "tests whose format allows no comments" can be read as attaching "whose format" to "tests".
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✓
- Pairing test ✓

**Оценка**
- согласованность ✓ — 1.5.2; строка 10.1.26b (s-ffkv5qnqvet7bga) и её решение от 2026-11-17; «Where the files are» (s-zefk589ykh37b8u); «What the SpecSheriff tools read in the project's own guidelines»; «Project-wide settings».
- целостность ✓ — s-9rtrj24myzjvshu, s-5qdjyf6t898rsd4, s-36x8amvunmv2kp5, s-3xx2eukc8gtd2tx; узлы, которые должны измениться, названы в заметках (п. 5, 6, 9).
- целесообразность ✓ — файл без комментариев иначе привязать нельзя.
- избыточность ✗ — первое предложение третьего абзаца повторяет третий способ правила 1.5.2.
- недостаточность ✓ — не найдено.

**Findings** (author)
- **CUT and WORDING FIX.** Replace paragraph 3 with: "The SpecSheriff tools treat a file's format as allowing no comments where the file's name ends in `.json`, or where the file matches the glob patterns that the project's own guidelines (§s-u7tw6m8npxmv5tu) list for such formats." / «Инструменты SpecSheriff считают, что формат файла не допускает комментариев, если имя файла оканчивается на `.json` или если файл соответствует glob-шаблонам, которые собственные guidelines проекта (§s-u7tw6m8npxmv5tu) перечисляют для таких форматов.»
- **WORDING FIX.** Move paragraph 4 to the end of paragraph 2 and write "of this form" there. The Russian sentence stays as it is.
- **WORDING FIX**, reason, first sentence. "An entry keeps the path it names when its file is moved or renamed." / «Запись сохраняет путь, который она называет, когда её файл переносят или переименовывают.»

---

## 4. `s-zrsc6asgmhv8tnc`: "How a test declares the rule it is written from" — **not ready**

**Checklist**
- 1.2.3 ✓
- 7.1 ✗ "an error that names the test where the mark holds…": "where" can attach to "the test".
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✓
- 7.2.4 ✓
- 7.2.4.1 ✓
- 7.2.4.2 ✓
- 7.2.4.3 ✓
- 7.2.4.4 ✓
- 7.2.4.5 ✓
- 7.2.5 ✓
- 7.2.6 ✓
- 7.2.7 ✓
- 7.3.1 ✓
- 7.3.2 ✓
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✗ "so the plugin for pytest moves the SpecTag from the mark into the name that the run reports" retells paragraph 3.
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✓ (no examples; one is proposed below)
- Pairing test ✗ The first sentence justifies the TypeScript item, and the second justifies the Python item and paragraph 3, in that order.

**Оценка**
- согласованность ✓ — 1.4.2 (s-nrjxfvpkq3m8hzm), 9.3, s-5z5gnu7pahr82xp, s-gb8s9657a65hqmv, s-utf4mbt7ref8g9c, решения от 2026-10-27 и 2026-11-06, код плагина.
- целостность ✓ — s-utf4mbt7ref8g9c и s-3xx2eukc8gtd2tx остаются верны; тесты плагина получают SpecTag (заметки, п. 17).
- целесообразность ✓ — отчёт прогона показывает, из какого правила написан тест.
- избыточность ✗ — второе предложение обоснования пересказывает третий абзац.
- недостаточность ✓ — не найдено.

**Findings** (author)
- **CUT.** Cut the reason's second sentence. The decision of 2026-10-27 already records why Python uses a mark. What remains: "A run of the tests reports each test by its name, so the SpecTag stands where that report shows it." / «Прогон тестов сообщает о каждом тесте по его названию, поэтому SpecTag стоит там, где его показывает этот отчёт.»
- **WORDING FIX.** "Where the mark holds anything other than one SpecTag, the plugin stops the run with an error that names the test." / «Если пометка содержит что-либо, кроме одного SpecTag, плагин останавливает прогон с ошибкой, которая называет тест.»
- **DOUBT, proposed example.** The author adds it, and the owner sees it on the page. "In TypeScript, `test(\"@spec s-… refuses an empty name\", …)` declares the SpecTag of the rule it is written from. The most likely mistake is to put the SpecTag only in the name of the `describe` block that holds the tests. That block is not a test, so no test in it declares a SpecTag." / «В TypeScript `test("@spec s-… refuses an empty name", …)` объявляет SpecTag правила, из которого написан тест. Самая вероятная ошибка — поставить SpecTag только в название блока `describe`, в котором лежат тесты. Этот блок — не тест, поэтому ни один тест в нём не объявляет SpecTag.» The TypeScript description counts only `test` and `it` as tests.

---

## 5. `s-9rtrj24myzjvshu`: "SpecTags on the system's code other than tests" — **not ready**

**Checklist**
- 1.2.3 ✓
- 7.1 ✗ "a SpecTag outside the comment directly above a symbol" also reaches `@spec` inside a string literal. "in a file bound by SpecTags at its start" misses a file whose only SpecTag is misplaced, because such a file is not bound.
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✗ "makes this check" points back to another paragraph.
- 7.2.4 ✓
- 7.2.4.1 ✓
- 7.2.4.2 ✓
- 7.2.4.3 ✓
- 7.2.4.4 ✓
- 7.2.4.5 ✓
- 7.2.5 ✓
- 7.2.6 ✓
- 7.2.7 ✗ "after its start": "start" has the meaning that s-5qdjyf6t898rsd4 gives it, and is not cited there.
- 7.3.1 ✓
- 7.3.2 ✓
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✓
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✓
- Pairing test ✓

**Оценка**
- согласованность ✗ — обоснование говорит, что код под таким SpecTag «так же не привязан, как код без SpecTag», а текст отвергает такой SpecTag и в неизменённом коде, который стоимость строки 10.1.26 отсылает к 9.5 (Q1). Последний пункт уже, чем s-5z5gnu7pahr82xp («`@spec none` — единственный SpecTag»).
- целостность ✗ — отказ для `@spec`, не имеющего ни одной из форм, нужен по stage3 узла s-5z5gnu7pahr82xp, но не записан ни в одном узле.
- целесообразность ✓ — строка 10.1.26 и решение от 2026-11-13.
- избыточность ✓ — не найдено; разделение с s-36x8amvunmv2kp5 и s-3xx2eukc8gtd2tx чистое.
- недостаточность ✗ — см. 7.1 выше.

**Findings** (author, unless marked)
- **WORDING FIX.** Opening sentence: "`sheriff binding` refuses each of the following in the system's code (§s-hheus6f395ynqvc) other than tests (§s-k6dzuajejrw4cej), whether the specification is approved or a draft:" / «`sheriff binding` отвергает в коде системы (§s-hheus6f395ynqvc) помимо тестов (§s-k6dzuajejrw4cej) каждое из следующего, независимо от того, одобрена спецификация или она черновик:». Delete the first sentence of the last paragraph. Its Russian, «выполняет эту проверку, одобрена ли спецификация…», reads as if the command checks whether the specification is approved.
- **WORDING FIX**, item 3. "…a SpecTag in any comment other than the one directly above a symbol;" / «…SpecTag в любом комментарии, кроме комментария непосредственно над символом;»
- **WORDING FIX**, item 5. "in a file to be bound by SpecTags at its start (§s-5qdjyf6t898rsd4), a SpecTag on a line after that start;" / «в файле, который должен быть привязан SpecTag в начале (§s-5qdjyf6t898rsd4), SpecTag на строке после этого начала;»
- **WORDING FIX**, last item. "code that carries `@spec none` together with another SpecTag." / «код, у которого есть `@spec none` вместе с другим SpecTag.»
- **Missing item.** "where a SpecTag may stand, a text that opens with `@spec` but has neither form of a SpecTag (§s-5z5gnu7pahr82xp), such as `@spec none` with no text after it;" / «там, где может стоять SpecTag, текст, который начинается с `@spec`, но не имеет ни одной из форм SpecTag (§s-5z5gnu7pahr82xp), например `@spec none` без текста после него;». If the refusal is to name the forms, as the stage3 field of s-5z5gnu7pahr82xp says, the text must say so too.
- **Notes, item 16** (if the owner chooses A in Q1). Add that after the upgrade, every commit is refused while the code carries a SpecTag naming a term or a section, which the earlier rule "the node it implements" allowed.

---

## TERM (all five drafts)

- **"bindings file"**: none of the registry's vocabularies has a matching term.
  - Outside the registry, the REUSE Specification 3.3 (2024-11-14, read during this run) has the same mechanism. Its `REUSE.toml` `[[annotations]]` select files by `path` and record licence data for files that cannot hold a comment header.
  - Fit: partial. A REUSE path may be a glob and its file may sit in any directory, while a bindings entry names one file from the root.
  - Advice: keep the name and add a gloss in the docs. Cost: the docs only.
- **"SpecTags at the start of a file"** corresponds to REUSE's comment header, which sits "as close to the top of the file as possible" (same source).
  - Fit: partial. REUSE leaves the position as a recommendation, while SpecSheriff fixes it by a rule on lines.
  - Advice: a gloss in the docs.
- **SpecTag**: in code it corresponds to the coverage tag of [OFT], and in a test to `verify` in [SysML].
  - Fit: partial. An OFT tag is not attached to a symbol, and it carries an artifact type and a revision.
  - Advice: a gloss, no rename.
- **Language and pytest words**: "mark", "doc comment", "decorator", "re-export" and "shebang" are the languages' and pytest's own words, used in the same meaning (pytest's "registering marks" is unverified).
- **"description of a language"**: no established term; it collides with none (inference).

---

## Questions only the owner can answer

**Q1 (s-9rtrj24myzjvshu; s-utf4mbt7ref8g9c raises the same question for tests). Is a commit refused because old code it leaves alone carries a SpecTag that binds nothing?**

"Binds nothing" covers three cases: a misplaced SpecTag, a SpecTag naming a node that is not a rule (a section or a term), and a SpecTag beside `@spec none`.

The draft refuses such a SpecTag in every commit, draft included. Three things point the other way:
- Row 10.1.26's cost sends "a symbol that the commit leaves unchanged" to rule 9.5.
- Rule 9.5 speaks only of code that carries no SpecTag.
- The draft's own reason says such code is "as unbound as code with no SpecTag".

On current behaviour: code.ts already refuses a misplaced SpecTag in unchanged code, but refusing a SpecTag that names a non-rule node is new.

- **A. Refuse it, as drafted.**
  - Gain: such a SpecTag is found at once.
  - Cost: after the upgrade, a project whose old code names a term or a section cannot commit until that code is retagged.
  - Cost: the reason and row 10.1.26's cost must say why this case is stricter than code with no SpecTag.
- **B. Handle it as rule 9.5 handles code with no SpecTag** (recommended, inference: it is what the row's cost and the draft's reason already say).
  - Gain: an upgrade never stops work.
  - Cost: s-3xx2eukc8gtd2tx and rule 9.5 must also cover such SpecTags.
  - Cost: in a draft they go unreported.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group2-notes.md`, `D:/SpecSheriff/skills/tools/src/code.ts`, `D:/SpecSheriff/skills/tools/src/binding.ts`, `D:/SpecSheriff/skills/pytest-specsheriff/src/pytest_specsheriff/__init__.py`

Sources:
- [REUSE Specification 3.3](https://reuse.software/spec-3.3/)