# Review of group 3, input c: s-t383grkn3q68dpf and proposal:s-ztseyetus7np6br-g3

Neither draft is ready. The skill `specsheriff-terminology-review` was loaded, and the checklist came from `node .claude/vt/writing-rules.mjs`.

## s-t383grkn3q68dpf, "A node's `meta.code` and `meta.tests`": not ready

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✗ "above a symbol of the file (§s-33fw3ga4ctd94dq)": rule 1.5.2 (s-kgbzk2ph9e6jfb4) defines "symbol". s-33fw3ga4ctd94dq only says where the SpecTag goes.
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test of the reason ✓

**Оценка**
- согласованность: ✗ — слова «кода системы» в обоих пунктах сужают строку 10.1.34 (s-tqdmk6jakx97wra) и правило 9.7 (s-rwqzepmrt77rv35). Это противоречит решению владельца от 2026-11-13: собственная проверка проекта считается кодом правила, которое её перечисляет (t25-one-thought.md:773). Противоречит и примеру правила 10.10 (s-sfjka4zc4rhfu67). Сверено также с 1.5.2, 9.1, 9.3, 9.4, s-zrsc6asgmhv8tnc, s-5qdjyf6t898rsd4, s-trwczfskj5zmuft, s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c и «Project-wide settings».
- целостность: ✗ — s-ztseyetus7np6br описывает те же списки другими словами и без этого сужения. Поэтому `sheriff binding` отвергнет то, что пишет `sheriff reindex`, для кода и тестов собственных проверок проекта. Строка 10.1.34, правила 9.7 и 8.6 остаются верными.
- целесообразность: ✓ — проблема настоящая: списки правят вручную или коммитят, не запустив reindex (s-ztseyetus7np6br, 9.7).
- избыточность: ✗ — абзацы 2–3 повторяют пункты о списках в s-ztseyetus7np6br и три способа привязки из правила 1.5.2.
- недостаточность: ✓ — не найдено.

**Findings**

1. **DOUBT (the author can fix it: the ruling of 2026-11-13 settles it).** The words "of the system's code" in both list items leave out the code and tests of a project's own checks and generators. Those carry the SpecTag of the rule that lists them, which rule 10.10 allows, and they count as that rule's code. Row 10.1.34 and s-ztseyetus7np6br both include them.
   - **Fix A**, which also removes the repetition and the 7.2.7 breach. Paragraph 1 becomes:
     - EN: "`sheriff binding` refuses each node whose `meta.code` or `meta.tests` (§s-rwqzepmrt77rv35) differs from the list that `sheriff reindex` would write there (§s-ztseyetus7np6br) from the SpecTags (§s-8xw4mgvpexyvw5q) as the commit leaves the code and the tests (§s-tqdmk6jakx97wra). The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and gives that list."
     - RU: «`sheriff binding` отвергает каждый узел, `meta.code` или `meta.tests` (§s-rwqzepmrt77rv35) которого отличается от списка, который `sheriff reindex` записал бы туда (§s-ztseyetus7np6br) по SpecTag (§s-8xw4mgvpexyvw5q) в том виде, в каком коммит оставляет код и тесты (§s-tqdmk6jakx97wra). Отказ называет файл, sid и расположение узла (§s-kag2m9tzdnduxdx) и приводит этот список.»
     - Paragraphs 2 and 3 go, together with the links that only they back.
   - **Fix B**, if paragraphs 2 and 3 stay:
     - Replace "each file of the system's code (§s-hheus6f395ynqvc) other than tests" with "each file, other than a test file,". In Russian, «каждого файла кода системы (§s-hheus6f395ynqvc) помимо тестов» becomes «каждого файла, кроме файла тестов,».
     - Change "each test of the system's code that" to "each test that". In Russian, «тест кода системы, который» becomes «тест, который».
     - Write "above a symbol (§s-kgbzk2ph9e6jfb4) of the file" and add a `cites` link to s-kgbzk2ph9e6jfb4.

2. **WORDING FIX (reason).** A test implements nothing; 9.7 says a test is written for a node.
   - EN: replace "that do not implement the node, or would hide some that do" with "that are not bound to the node, or would hide some that are".
   - RU: replace «которые не реализуют узел, или скрыл бы те, которые реализуют» with «не привязанные к узлу, или скрыл бы привязанные».

3. **Author: the `stage3` notes are wrong.** Today reindex.ts builds neither list: lines 283–330 only rename tests inside `meta.tests`. binding.ts:72–73 reads only the files matched by the `code` and `tests` globs. Both `stage3` fields should say that, and that both commands must also read the files of each own check and generator.

## proposal:s-ztseyetus7np6br-g3, "What `sheriff reindex` writes": not ready

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✗ "bound by a SpecTag naming the node": this is the node's first use of SpecTag, and it cites nothing.
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test of the reason ✓

**Оценка**
- согласованность: ✓ — сверено со строкой 10.1.34 и её решениями от 2026-11-13 и 2026-11-17, правилами 1.5.2 и 9.7, s-5qdjyf6t898rsd4, s-trwczfskj5zmuft и решением владельца от 2026-11-13 о собственных проверках.
- целостность: ✗ — «code file» охватывает и файлы тестов, ведь тесты тоже код (9.1). Глагол «binds» расходится с «declares» в s-zrsc6asgmhv8tnc и s-t383grkn3q68dpf.
- целесообразность: ✓ — без правки `sheriff binding` отвергал бы файлы, привязанные целиком.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

**Finding**

4. **WORDING FIX (the author can fix it).** All edits stay inside the item that the `change` field describes.
   - EN:
     - "each code file" → "each file, other than a test file,"
     - "a SpecTag naming" → "a SpecTag (§s-8xw4mgvpexyvw5q) naming"
     - "each test that a SpecTag naming the node binds" → "each test that declares a SpecTag naming the node (§s-zrsc6asgmhv8tnc)"
     - Add `cites` links to both nodes.
   - RU:
     - «каждый файл кода» → «каждый файл, кроме файла тестов,»
     - «привязанный SpecTag, который» → «привязанный SpecTag (§s-8xw4mgvpexyvw5q), который»
     - «каждый тест, привязанный SpecTag, который называет этот узел,» → «каждый тест, который объявляет SpecTag, называющий этот узел (§s-zrsc6asgmhv8tnc),»

## Remaining points

- **Terms:** no term findings. Nothing new is introduced. `meta.code` and `meta.tests` correspond to what OpenFastTrace (OFT) calls `impl` and `utest` coverage (inference); a gloss is enough.
- **The brief's three points to look at** all concern drafts in inputs b and d. None of them bears on these two drafts.
- **Questions only the owner can answer:** none.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-one-thought.md (line 773)
- D:/SpecSheriff/skills/tools/src/reindex.ts
- D:/SpecSheriff/skills/tools/src/binding.ts
