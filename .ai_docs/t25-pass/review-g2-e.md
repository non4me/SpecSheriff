The skill is loaded and every check below was run. All four drafts are **not ready**, and every finding is one the author can fix. None needs the owner. Each node passes once its fixes are applied.

## Checklist (from `node .claude/vt/writing-rules.mjs`)

Columns: **NN** = `new:tools-7-2-no-node`, **OC** = `new:tools-7-2-outside`, **TC** = `s-utf4mbt7ref8g9c`, **RT** = `new:tools-7-2-rule-test`.

| Rule | NN | OC | TC | RT |
|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✗ "whether or not the commit changes … and whether the specification is approved or a draft": two qualifications of one kind, not set out as a list | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✗ "makes this check": the nearest check named is the one on code outside the commit | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✗ "without a SpecTag (§s-kkbqcb9xrpaepwn)": the word SpecTag is first cited only in item 1 | ✗ "declares no SpecTag where the description of its language places it": neither SpecTag nor description is cited at first use | ✗ "each symbol and each file bound as a whole" has no citation |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✗ the second paragraph's sentence states two thoughts | ✓ | ✓ | ✗ "A test counts here whether or not the commit changes it, including a test marked as skipped." |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✗ the reason goes through the text (see the pairing test) | ✗ "So they are read as the commit leaves them" restates paragraph 2 | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ |
| Pairing test of the reason | ✗ sentence 1 grounds paragraph 1, sentence 2 grounds paragraph 2, in order | ✓ | ✓ | ✓ |

---

## `new:tools-7-2-no-node` — "A SpecTag that names no node" — not ready

**DOUBT (the author can fix it):** paragraph 1 never says which state of the specification the sid is looked up in. The node's own example only works against the specification as the commit leaves it, and "The bindings file" already says "as the commit leaves it". Paragraph 1 also places the bindings file inside the system's code. Under rule 9.1, configuration is not the system's code (inference). Replace sentences 1–2:
- EN: "`sheriff binding` accepts a SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) only where its sid names a node of the model of the specification (§s-w6gybeqn2ttydqx) as the commit leaves it. It checks each such SpecTag in the system's code (§s-hheus6f395ynqvc), including the tests, and in the bindings file (§s-trwczfskj5zmuft)."
- RU: «`sheriff binding` принимает SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp), только если его sid называет узел модели спецификации (§s-w6gybeqn2ttydqx) в том виде, в каком её оставляет коммит. Он проверяет каждый такой SpecTag в коде системы (§s-hheus6f395ynqvc), в том числе в тестах, а также в файле привязок (§s-trwczfskj5zmuft).»

**WORDING FIX (author):** paragraph 2. This fixes rules 7.3.2 and 7.2.2, and the "It" that points back into paragraph 1.
- EN: "`sheriff binding` refuses a SpecTag whose sid names no node at every commit, whether or not:
  - the commit changes the code or the test that the SpecTag binds;
  - the specification is approved."
- RU: «`sheriff binding` отвергает SpecTag, sid которого не называет ни одного узла, при каждом коммите независимо от того:
  - меняет ли коммит код или тест, привязанный этим SpecTag;
  - одобрена ли спецификация.»

**WORDING FIX (author):** the reason, to pass the pairing test.
- EN: "Once a node is removed, every SpecTag that names it binds its code or test to nothing, wherever that SpecTag stands."
- RU: «После удаления узла каждый SpecTag, который его называет, привязывает свой код или тест ни к чему, где бы этот SpecTag ни стоял.»

**DOUBT (author), a change outside this node:** row 10.1.28 speaks of every SpecTag. Rule 10.10 (s-sfjka4zc4rhfu67) also allows SpecTags in the repository's own tools, which this node does not read. Item 35 of the notes, as worded, would leave those SpecTags unchecked. Item 35 should leave to s-36x8amvunmv2kp5 only "the SpecTags in the system's code, its tests and the bindings file".

**TERM:** "A SpecTag that names no node" corresponds to an orphaned link in [OFT] (inference; the registry names the status without defining it, so this is unverified). Keep the node's wording. The gloss belongs in the docs and costs nothing in the specification.

**Оценка**
- согласованность: ✗ фраза «including its tests and the bindings file» относит файл привязок к коду системы, что расходится с 9.1 (s-hheus6f395ynqvc) (вывод). С остальным сверено: строка 10.1.28 и её решение от 2026-11-13, решение владельца от 2026-11-20 о проверках в черновике, s-5z5gnu7pahr82xp, s-9rtrj24myzjvshu, s-w6gybeqn2ttydqx, s-gb8s9657a65hqmv (узел архива теряет sid).
- целостность: ✗ строка 10.1.28 требует проверять каждый SpecTag. SpecTag в собственных инструментах репозитория (10.10) останутся без проверки, если пункт 35 уберёт из s-m8nmfsxkcfu7cjp все SpecTag.
- целесообразность: ✓ удалённый узел оставляет SpecTag в коде, которого коммит не касается. Файл привязок сейчас не проверяется (binding.ts:179, :201).
- избыточность: ✓ не найдена, если пункт 35 выполнен; s-9rtrj24myzjvshu проверяет только узел, который не является правилом.
- недостаточность: ✗ не сказано, что модель берётся в том виде, в каком её оставляет коммит, а на этом держатся пример и обоснование.

---

## `new:tools-7-2-outside` — "Code and tests outside the commit that carry no SpecTag" — not ready

**WORDING FIX (author):** paragraph 1 and its list. "Gives the warning … for each of the following" reads as one warning per item. Rule 9.5 gives a single warning for all such code and says nothing while the specification is a draft. Item 1 also lacks "other than tests", so symbols in test files would count as untagged.
- EN: "`sheriff binding` treats each of the following that the commit leaves unchanged (§s-2x58az67bm6cxq2) as the rule on code and tests without a SpecTag (§s-5z5gnu7pahr82xp) requires (§s-kkbqcb9xrpaepwn):
  - in the system's code (§s-hheus6f395ynqvc) other than tests, a symbol (§s-kgbzk2ph9e6jfb4) or a file to be bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that no SpecTag binds;
  - a test of the system's code that declares no SpecTag (§s-zrsc6asgmhv8tnc)."
- RU: «`sheriff binding` обрабатывает каждое из следующего, что коммит оставляет неизменным (§s-2x58az67bm6cxq2), так, как требует (§s-kkbqcb9xrpaepwn) правило о коде и тестах без SpecTag (§s-5z5gnu7pahr82xp):
  - в коде системы (§s-hheus6f395ynqvc), кроме тестов, — символ (§s-kgbzk2ph9e6jfb4) или файл, который должен быть привязан целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), если его не привязывает ни один SpecTag;
  - тест кода системы, который не объявляет SpecTag (§s-zrsc6asgmhv8tnc).»

**CUT (author):** paragraph 2. "From the latest entries in `sheriff.config.json` that set them" restates 10.6, 10.7 and the agreed "Project-wide settings". Its "It" also points back into paragraph 1.
- EN: "`sheriff binding` takes the specification's approval status and its `strict` flag as the commit leaves them (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2)."
- RU: «Статус одобрения спецификации и её флаг `strict` `sheriff binding` берёт в том виде, в каком их оставляет коммит (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2).»

**CUT (author):** paragraph 3 and its link to s-weuyx98r7c923ab. The agreed "The list of code that carries no SpecTag" already says that this check names `sheriff untagged`.

**WORDING FIX (author):** the reason. "Such code" points into the text, and the second sentence restates paragraph 2.
- EN: "The approval status and the `strict` flag decide what code without a SpecTag outside the commit costs, and the commit itself may change either of them."
- RU: «Статус одобрения и флаг `strict` определяют, чего стоит код без SpecTag за пределами коммита, а сам коммит может изменить любой из них.»

**WORDING FIX (author):** the Russian title. «Коммита без SpecTag» can be read as "a commit without a SpecTag". Use «Код и тесты без SpecTag за пределами коммита».

**Оценка**
- согласованность: ✗ формулировка «gives the warning … for each» читается как предупреждение на каждый символ, а 9.5 (s-kkbqcb9xrpaepwn) даёт одно предупреждение на весь такой код и молчит в черновике. С остальным сверено: 10.6, 10.7, решения 2026-11-17 по строкам 10.1.26 и 10.1.26a, указание о флаге после коммита (t25-one-thought.md:828).
- целостность: ✗ первый пункт списка не исключает тесты, тогда как s-9rtrj24myzjvshu говорит о коде «other than tests». Передача обязанностей от s-j9r8z4xdrfkfs47 (пункт 27) названа.
- целесообразность: ✓ правилу 9.5 нужен исполнитель в инструментах, а коммит может сам менять статус и флаг.
- избыточность: ✗ третий абзац повторяет s-weuyx98r7c923ab; «latest entries in `sheriff.config.json`» повторяет 10.6, 10.7 и «Project-wide settings».
- недостаточность: ✓ не найдена после первой правки.

---

## `s-utf4mbt7ref8g9c` — "The SpecTags the tests carry" — not ready

**WORDING FIX (author):** paragraphs 1 and 2 become one paragraph with a list, and the last sentence of paragraph 4 goes. Three problems are fixed:
- "Where the description of its language places it" is wrong for TypeScript, JavaScript and Python. s-zrsc6asgmhv8tnc sets the place for those languages; a description (s-33fw3ga4ctd94dq) says only what counts as a test.
- "This check" can be read as the check of code outside the commit.
- The refusal in paragraph 2 named nothing.
- EN: "`sheriff binding` refuses each of the following tests of the system's code (§s-hheus6f395ynqvc), whether the specification is approved or a draft:
  - a test that the commit adds or changes (§s-2x58az67bm6cxq2) and that declares no SpecTag (§s-5z5gnu7pahr82xp) in the place set for the test's language (§s-zrsc6asgmhv8tnc, §s-ay6wntm2dxcgpnp);
  - a test, changed or not, whose SpecTag names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule (§s-5z5gnu7pahr82xp).
  Each refusal names the test, its file and its line."
- RU: «`sheriff binding` отвергает каждый из следующих тестов кода системы (§s-hheus6f395ynqvc) независимо от того, одобрена ли спецификация:
  - тест, который коммит добавляет или меняет (§s-2x58az67bm6cxq2) и который не объявляет SpecTag (§s-5z5gnu7pahr82xp) в месте, установленном для языка этого теста (§s-zrsc6asgmhv8tnc, §s-ay6wntm2dxcgpnp);
  - тест, изменённый или нет, SpecTag которого называет узел модели спецификации (§s-w6gybeqn2ttydqx), не являющийся правилом (§s-5z5gnu7pahr82xp).
  Каждый отказ называет тест, его файл и строку.»
- In paragraph 4 of the Russian, «если язык файла охватывает описание» reads backwards, as "if the language covers the description". Replace it with «если для языка файла есть описание (§s-33fw3ga4ctd94dq)».

**CUT (author):** in the example, ", as an earlier release did" / «, как это делал прежний выпуск». A history note adds nothing to the example.

**DOUBT (author, settled by the ruling of 2026-11-17 on row 10.1.26a, which concerned tests without a SpecTag):** "changed or not" means an old test whose SpecTag names a term is refused at every commit, even in a draft. I measured the effect:
- this repository: none of its 375 test SpecTags names a term;
- the saloon at 653a47e: 2 tests name a term.

Item 16 of the notes (the migration) should say that such tests block every commit until each is retagged to an approved rule. The same holds for code, under s-9rtrj24myzjvshu.

**Оценка**
- согласованность: ✗ фраза «where the description of its language places it» расходится с s-zrsc6asgmhv8tnc и s-33fw3ga4ctd94dq. С остальным сверено: строка 10.1.26a и её решения, 1.4.2, 9.4 и решение от 2026-11-10, решение от 2026-11-13 по 10.10.
- целостность: ✗ неизменённый тест с SpecTag термина отвергается и в черновике (в saloon таких тестов два), а пункт 16 заметок об этом молчит. Ссылка из «Project-wide settings» названа (пункт 8).
- целесообразность: ✓ тест без SpecTag правила не засчитывается ни одному правилу.
- избыточность: ✓ не найдена: голый sid определяет s-gb8s9657a65hqmv, этот узел только применяет его.
- недостаточность: ✗ отказ из второго абзаца ничего не называет, а «this check» неоднозначно.

---

## `new:tools-7-2-rule-test` — "A test for each rule whose code a commit changes" — not ready

**WORDING FIX (author):** citations at first use, plus a Russian clause that attaches to the wrong noun. In «помимо тестов, которые коммит…» the clause reads as describing the tests. Add `cites` links to s-kgbzk2ph9e6jfb4, s-5qdjyf6t898rsd4 and s-trwczfskj5zmuft.
- In paragraph 1, "code bound to a rule (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp)" / «код, привязанный к правилу (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp)».
- Paragraph 2, sentence 1:
  - EN: "The code here is each symbol (§s-kgbzk2ph9e6jfb4) and each file bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that the commit adds or changes (§s-2x58az67bm6cxq2), other than tests."
  - RU: «Код здесь — это каждый символ (§s-kgbzk2ph9e6jfb4) и каждый файл, привязанный целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), которые коммит добавляет или меняет (§s-2x58az67bm6cxq2), кроме тестов.»

**WORDING FIX (author):** paragraph 3, sentence 1 (rule 7.3.2). Row 10.1.41 pairs a skipped test with one expected to fail, so this node names both.
- EN: "A test counts here whether or not the commit changes it. A test marked as skipped or as expected to fail counts too."
- RU: «Тест здесь засчитывается, меняет ли его коммит или нет. Тест, помеченный как пропускаемый или как ожидаемо падающий, тоже засчитывается.»

**Оценка**
- согласованность: ✓ сверено со строкой 10.1.31, 1.4.1, решением 2026-11-20 о проверках в черновике, строкой 10.1.41, s-ktfstpv8rurznrp («A RecordType is a rule»), s-5z5gnu7pahr82xp, предложением по s-83ev4wwesbwnhnp.
- целостность: ✓ расширение s-2x58az67bm6cxq2 (пункт 2) и moved/impl.json (пункт 14) названы.
- целесообразность: ✓ код правила без теста нарушает 1.4.1.
- избыточность: ✓ не найдена: `sheriff guard` проверяет правку, а не коммит.
- недостаточность: ✗ ожидаемо падающий тест не назван; у «symbol» и «file bound as a whole» нет ссылок.

---

**Questions only the owner can answer:** none.

The files involved are `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json` and `D:/SpecSheriff/.ai_docs/t25-pass/group2-notes.md`.