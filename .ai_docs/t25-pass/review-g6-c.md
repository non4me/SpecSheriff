# Group 6 review, part c: `sheriff init` and `sheriff remove` (tools 3) and the `sheriff reindex` proposal

Both drafts are **not ready**. The questions are the owner's only where marked "owner"; everything else the author can fix.

## s-7unxytshhc4md54 — "Setting a repository up and taking SpecSheriff out of it" — not ready

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
- 7.2.7 Words that take their meaning from the specification ✗ "a rule that refines the rule on when the tests must pass": the tools find this rule only by its `refines` link, and the link type is not cited.
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✗ "Its `TextRule.list` … lists `push` …, and the list's `of` is …" sets two facts side by side.
- 7.3.3 The contents of a node ✓ The rewrite of 2026-11-07 applied this rule and kept one node, and the owner approved it. See finding 1.
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
- согласованность: ✗ правило, которое пишет `sheriff init`, не имеет обоснования, а правило 1.2.3 (s-dpe5kcz4eamv39g) составляет правило из текста и обоснования. Остальное сверено с 10.6 (s-qzthyh7yqvfhsa2) и решением от 2026-11-13, с 1.6.4 (s-x8uzc8z44pwtd3h), s-t9j29hppag2nren, s-b6qdtghnyha3fhk, s-d3nkw9b6mn98vuw, строкой 10.1.18 (s-exxuckgakfxkycp), s-zhen42p6mnaxu7w и с принципами.
- целостность: ✗ `sheriff remove` не реализует ни одного правила базы (строка 10.1.23). Узел держит его при `sheriff init`, и этот пробел не виден.
- целесообразность: ✓ проблема реальна: раздел `project.json` без правила отвергает строка 10.1.18, а правило об одобрении спецификации снято решением от 2026-11-13.
- избыточность: ✓
- недостаточность: ✗ текст не говорит, что у правила есть связь `refines`, хотя только по ней его находят (s-t9j29hppag2nren). init.ts просит задать `testCommand`, а текст этого не требует, и `stage3` эту подсказку не убирает.

**Findings.** The author's reading on writing the draft rule that lists `push` holds: rule 1.6.4, row 10.1.18 and s-b6qdtghnyha3fhk support it.

1. **DOUBT (owner).** The notes keep `sheriff remove` in this node because, on its own, it would implement no rule (row 10.1.23). That argument hides a gap: no rule of the base asks for a way to take the method out. The owner either adds such a rule or accepts the gap.
2. **WORDING FIX (author).**
   - The first sentence of the paragraph becomes:
     - EN: "That section holds, as a draft, a rule with a `refines` link (§s-sn6au3vcr9uy5pm) to the rule on when the tests must pass (§s-x8uzc8z44pwtd3h)."
     - RU: «Этот раздел содержит черновик правила со связью `refines` (§s-sn6au3vcr9uy5pm) на правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h).»
   - The last sentence is split at ", and":
     - EN: "… lists `push` (§s-b6qdtghnyha3fhk). The list's `of` is …"
     - RU: «… перечисляет `push` (§s-b6qdtghnyha3fhk). `of` этого списка — …»
   - Add a `cites` link to s-sn6au3vcr9uy5pm.
3. **Author (rule 1.2.3).** Add a reason to the rule that `sheriff init` writes:
   - EN: "Its reason is “Running the tests before every push keeps a change whose tests fail from reaching the project's shared branch.”"
   - RU: «Его обоснование — «Running the tests before every push keeps a change whose tests fail from reaching the project's shared branch.»»
4. **Author.** Either the text states the `testCommand` hint that init.ts gives, or `stage3` removes it. Once the rule is approved, every push is refused until a `testCommand` is set.
5. **Russian (author).**
   - In the reason, «Принять метод и отказаться от него можно каждое одной командой» becomes «Принять метод можно одной командой, и отказаться от него — тоже одной».
   - In example 3, «записать один раздел» becomes «записать раздел без правила».

**TERM:** I question no term.

## proposal:s-gb8s9657a65hqmv-g6 — "What `sheriff reindex` changes in what an earlier release wrote" — not ready

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
- 7.2.7 Words that take their meaning from the specification ✗ "of its archive", "`TextRule.list.declaredIn`" and "an entry that approves the specification" are not cited at their first use.
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
- согласованность: ✓ сверено с решением от 2026-11-13 (s-qzthyh7yqvfhsa2), с 1.6.4 (s-x8uzc8z44pwtd3h), s-t9j29hppag2nren, s-ztseyetus7np6br, s-f5brvuuu6xmkj6t, 10.13 (s-jsqxdx47wkkj7gp) и s-7unxytshhc4md54.
- целостность: ✗ черновик правила об одобрении, который писал каждый прежний `sheriff init`, остаётся в `project.json`. Если ответственный его одобрит, следующий `sheriff reindex` одобрит спецификацию без проверок правила 10.6. Форма записи (s-d3nkw9b6mn98vuw) не процитирована.
- целесообразность: ✓ дефект реален: единственное правило `project.json` этого репозитория — одобренное s-p92k6vfe3ju27at.
- избыточность: ✓
- недостаточность: ✗ «then» и «its top node» допускают чтение «в каждом запуске». Последний абзац сузил «wrote or read» до «wrote».

**Findings.** The defect the proposal fixes is real. The proposal changes more than its `change` field lists (finding 1).

1. **Author.** The last paragraph now says "wrote" where the first sentence says "wrote or read". Test files with bare sids, and a `sheriff.config.json` that holds `writesSpecSheriffGuidelines`, then go unnamed. The `change` field calls this «Без изменений по смыслу», which is not accurate.
   - EN: "…because an earlier release wrote or read that file differently…"
   - RU: «…записал или прочитал этот файл иначе…»
2. **WORDING FIX (author).** The new item becomes:
   - EN: "where `project.json`, once such a rule is archived or removed, holds no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run that `sheriff init` writes (§s-7unxytshhc4md54) is added under the top node of `project.json`;"
   - RU: «если после переноса в архив или удаления такого правила в `project.json` нет правила, которое уточняет правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h), под верхний узел `project.json` добавляется черновик правила о том, когда запускаются тесты, который пишет `sheriff init` (§s-7unxytshhc4md54);»
3. **Author.** The ruling of 2026-11-13 ("no rule in between") and the rule "What a decision removes… is removed without asking again" settle this. Add after the item on the archive:
   - EN: "until `sheriff.config.json` holds an entry that sets the specification's approval status, a draft rule of `project.json` that refines the rule on that status is removed (§s-f2b5zvc565s242f);"
   - RU: «пока в `sheriff.config.json` нет записи, задающей статус одобрения спецификации, черновик правила `project.json`, которое уточняет правило об этом статусе, удаляется (§s-f2b5zvc565s242f);»
4. **Author (rule 7.2.7).** Cite at first use, with a link for each:
   - "its archive (§s-f2b5zvc565s242f)"
   - "`TextRule.list.declaredIn` (§s-eferktypcj7njt5)"
   - "an entry that approves the specification (§s-d3nkw9b6mn98vuw)"

## Questions only the owner can answer
- tools 3, finding 1: should the base specification gain a rule on taking the method out, so that `sheriff remove` has a rule to implement?

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group6-notes.md`
