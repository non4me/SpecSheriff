# Review of the follow-on drafts, part B: the report

# Follow-on drafts, part B: specsheriff-rule-reviewer's report

I'm reviewing nine drafts. Five aren't ready: s-33fw3ga4ctd94dq, s-2x58az67bm6cxq2, s-9rtrj24myzjvshu and s-m8nmfsxkcfu7cjp each need a fix. Two problems run through them:
- **Tests are not excluded.** The binding of code outside every symbol is written for every file, so it also reaches test files. Rule 1.5.2 binds only code other than tests.
- **JSON Schema is underspecified.** The text doesn't say what a line of a `$comment` is. It calls `$id` an import, and `$id` imports nothing.

The skill was in context, `writing-rules.mjs` printed 25 rules and the pairing test, and I edited nothing.

---

## 1. s-33fw3ga4ctd94dq, tools 8.2: not ready

1. 1.2.3 Text and reason ✓
2. 7.1 Goal, reader, scope ✗ Para 0 says that in every described language a symbol's SpecTags are lines of the comment directly above it. Para 3 then gives `$comment` for JSON Schema without saying that it replaces that comment.
3. 7.2.1 Who must act ✓
4. 7.2.2 Order ✓
5. 7.2.3 General words ✓
6. 7.2.4 Naming ✓
7. 7.2.4.1 ✓
8. 7.2.4.2 ✓
9. 7.2.4.3 ✓
10. 7.2.4.4 Properties ✓
11. 7.2.4.5 ✓
12. 7.2.5 ✓
13. 7.2.6 ✓
14. 7.2.7 Words from the specification ✗ Para 5, "other than its imports": what an import is in JSON Schema is said only in para 8.
15. 7.3.1 Title ✓
16. 7.3.2 One thought ✗ Para 8: "A JSON file is in JSON Schema where …, and the `$schema` and the `$id` of that object count as its imports."
17. 7.3.3 ✓
18. 7.4.1 ✓
19. 7.4.2 Reason ✓
20. 7.5.1 ✓
21. 7.5.2 Length ✗ The same sentence of para 8, 37 words.
22. 7.5.3 ✓
23. 7.6.1 ✓
24. 7.6.2 ✓
25. 7.6.3 Examples ✓
26. Pairing test ✓

**Оценка**
- согласованность: ✗ абзац 5 привязывает первым комментарием и код вне всех символов тестового файла, то есть сами тесты. Но тест объявляет один SpecTag (§s-zrsc6asgmhv8tnc), а §s-kgbzk2ph9e6jfb4 привязывает так только код помимо тестов. Сверено также с §s-k6dzuajejrw4cej, §s-5qdjyf6t898rsd4 и §s-trwczfskj5zmuft.
- целостность: ✗ §s-u6mj5yv8ngnz79v сравнивает текст `$comment` как код, потому что для грамматики JSON это строка, а не комментарий. Тогда правка текста `$comment` меняла бы определение, вопреки правилу 9.4 (§s-9j2mmnuuwmx5ksn), хотя по JSON Schema 2020-12 Core, §8.3, `$comment` — комментарий. §s-u6mj5yv8ngnz79v должен исключать из деревьев текст `$comment`, кроме SpecTag. §s-5qdjyf6t898rsd4 нового предложения не требует: он охватывает только языки, которых не охватывает ни одно описание.
- целесообразность: ✓ вопросы 4.3 А и 4.4 Б называют этот узел.
- избыточность: ✓ не найдено.
- недостаточность: ✗ остаются три открытых вопроса:
  - может ли shebang стоять перед первым комментарием (у точки входа на TypeScript `#!/usr/bin/env node` идёт раньше любого комментария);
  - считается ли в Python ряд строк с `#` одним комментарием;
  - считается ли ключ `$defs` кодом вне всех символов (если да, каждому файлу RuntimeChecks нужен `$comment` верхнего уровня, которого §s-suv42g8r3ra2h6b не пишет).

**Russian:** in para 3, «где нет комментариев» is a nit: the English says the format allows none. The wording below fixes it.

**WORDING FIX**, paras 3 and 8. The JSON Schema sentence moves up, so that imports are explained before para 5. "Whole lines" fixes two things:
- "the lines" would make every line of the `$comment` a SpecTag, but §s-suv42g8r3ra2h6b puts other text after the SpecTag;
- read as a line of the file, a line with `$comment` always also holds `"$comment": "`, so item 5 of §s-9rtrj24myzjvshu would refuse it.

"Count" becomes "is considered" because the owner keeps "counts" for counting, as `proposal:s-dbk2vyeg8z5jxna-g7` already applied.
- Para 3: "A JSON file is in JSON Schema where its top-level object's `$schema` is `https://json-schema.org/draft/2020-12/schema`. In JSON Schema, which allows no comments, the symbols of a file are the definitions under the `$defs` of its top-level object. In place of a comment above it, a definition's SpecTags are whole lines of the string in its `$comment` (§s-kgbzk2ph9e6jfb4). The `$schema` and the `$id` of the top-level object are considered the file's imports."
  «Файл JSON написан на JSON Schema, если `$schema` его объекта верхнего уровня — `https://json-schema.org/draft/2020-12/schema`. В JSON Schema, где комментарии не допускаются, символы файла — это определения в `$defs` его объекта верхнего уровня. Вместо комментария над определением его SpecTag — это целые строки текста в его `$comment` (§s-kgbzk2ph9e6jfb4). `$schema` и `$id` объекта верхнего уровня считаются импортами файла.»
- Para 8: "The description of each language names what is considered a symbol, an import and a test in that language. TypeScript, JavaScript, Python and JSON Schema are described." The Russian stays as it is.

**DOUBT**, para 5. It carries out rule 1.5.2, which binds only code other than tests. It also needs a `cites` link to s-hheus6f395ynqvc.
"In a file of the system's code (§s-hheus6f395ynqvc) other than tests, the code outside every symbol, other than its imports, is bound by the SpecTags in the file's first comment (§s-kgbzk2ph9e6jfb4). Those SpecTags bind that code only where the comment comes before any code and is not directly above a symbol. In JSON Schema, those SpecTags are whole lines of the `$comment` of the file's top-level object."
«В файле кода системы (§s-hheus6f395ynqvc) помимо тестов код вне всех символов, кроме импортов, привязывают SpecTag в первом комментарии файла (§s-kgbzk2ph9e6jfb4). Эти SpecTag привязывают такой код, только если комментарий стоит раньше любого кода и не находится непосредственно над символом. В JSON Schema такие SpecTag — это целые строки `$comment` объекта верхнего уровня файла.»

**DOUBT**, add after para 5: "A shebang, a first line that opens with `#!`, may come before that comment." «Перед этим комментарием может стоять shebang — первая строка, которая начинается с `#!`.»
- Why: s-5qdjyf6t898rsd4 and s-u6mj5yv8ngnz79v already make an exception for such a line.
- Without it, in a TypeScript file such as `skills/tools/src/cli.ts`, the SpecTags never come before any code. My inference is that the TS/JS grammars parse that line as a node of its own, not as a comment.

**TERM**, "import":
- **Where readers know it:** in TypeScript, JavaScript and Python an import brings names in from another module (unverified: this is not in the skill's registry).
- **What JSON Schema says**, from JSON Schema 2020-12 Core, read in this run: `$schema` identifies the dialect and its meta-schema (§8.1.1). `$id` gives the schema resource its own canonical URI (§8.2.1).
- **Fit:** partial for `$schema` (inference: it names a document the file depends on). A false friend for `$id`, which names the file itself.
- **Recommendation:** keep `$schema` and drop `$id`. No file that `sheriff types` writes holds `$id` (§s-suv42g8r3ra2h6b, para 3), so no case in the specification needs it.
- **Cost:** none for generated files. A hand-written JSON Schema file with `$id` binds it by its top-level `$comment`, which it needs anyway for its other top-level keywords (inference).

## 2. s-2x58az67bm6cxq2, tools 7.2.1: not ready

All 26 lines are ✓ except one:
- 3\. 7.2.1 Who must act ✗ Para 3, "is treated as one more symbol", names no actor.

**Оценка**
- согласованность: ✓ сверено с §s-kgbzk2ph9e6jfb4, §s-u6mj5yv8ngnz79v и §s-9j2mmnuuwmx5ksn.
- целостность: ✗ две проблемы:
  - в тестовом файле код вне всех символов — это тесты и блоки `describe`. Такой символ без SpecTag `sheriff untagged` перечислял бы как непривязанный (§s-weuyx98r7c923ab), а рецензент получал бы все тесты файла (§s-rd9nftptjuz6bwv);
  - §s-3xx2eukc8gtd2tx (пункт 1) и §s-qqs2svksmjct753 (абзац 1) называют только символы (§s-kgbzk2ph9e6jfb4, именованные единицы) и файлы, привязанные целиком. Их нужно проверить, а §s-3xx2eukc8gtd2tx — дополнить, потому что §s-9rtrj24myzjvshu передаёт ему этот код отдельным пунктом.
- целесообразность: ✓ вопрос 4.3 А.
- избыточность: ✓ не найдено.
- недостаточность: ✗ не сказано, кто считает этот код символом и для каких проверок. Не сказано и то, что такой символ не охватывает символы файла (абзац 2 говорит, что символ занимает строки от своей первой до последней).

**Russian:** ✓

**DOUBT**, para 3. It applies the scope of rule 1.5.2. It names the actor, as s-weuyx98r7c923ab and s-rd9nftptjuz6bwv already assume. It also keeps the symbol from enclosing others.
"In each file of the system's code other than tests, if a description covers the file's language (§s-33fw3ga4ctd94dq), the SpecSheriff tools treat the code outside every symbol, other than imports, as one more symbol of that file. That symbol holds that code alone. A finding names it by the file alone."
«В каждом файле кода системы помимо тестов, если язык файла охватывает описание (§s-33fw3ga4ctd94dq), инструменты SpecSheriff считают код вне всех символов, кроме импортов, ещё одним символом этого файла. В этот символ входит только этот код. Находка называет его только по файлу.»

## 3. s-weuyx98r7c923ab, tools 2.11: ready (one nit), once §2 is applied

All 26 lines are ✓.

**Оценка**
- согласованность: ✓ сверено с §s-kkbqcb9xrpaepwn и §s-3xx2eukc8gtd2tx.
- целостность: ✗ предупреждение по §s-3xx2eukc8gtd2tx называет эту команду, но не считает код вне всех символов. Это тот же пункт, что в разделе 2.
- целесообразность: ✓
- избыточность: ✓ §s-2x58az67bm6cxq2 говорит о находках, а перечень — не находка.
- недостаточность: ✓ не найдено.

**Russian:** ✓

**WORDING FIX (nit)**, para 1. As written, "lists the code outside every symbol" can be read as listing that code whether a SpecTag binds it or not.
"`sheriff untagged` names the code outside every symbol of a file, which the SpecSheriff tools treat as one more symbol (§s-2x58az67bm6cxq2), by the file's name alone."
«Код файла вне всех символов, который инструменты SpecSheriff считают ещё одним символом (§s-2x58az67bm6cxq2), `sheriff untagged` называет только именем файла.»

## 4. s-9rtrj24myzjvshu, tools 7.2.2: not ready

All 26 lines are ✓ except three:
- 2\. 7.1 ✗ Item 8, "not part of the system's code other than tests, whose format allows comments": "whose" can attach to "tests".
- 10\. 7.2.4.4 ✗ (nit) Item 4, "in any `$comment`", names no object.
- 14\. 7.2.7 ✗ Item 2, "a file whose language a description covers", is the first use, but the citation comes only in item 4.

**Оценка**
- согласованность: ✓ отказ записи для файла на описанном языке следует из слов «для любого другого файла» в §s-kgbzk2ph9e6jfb4. Сверено с §s-k6dzuajejrw4cej и §s-trwczfskj5zmuft.
- целостность: ✗ абзац 12 передаёт неизменённый код §s-3xx2eukc8gtd2tx, а тот кода вне всех символов не называет.
- целесообразность: ✓
- избыточность: ✓ пункт 2 повторял бы пункт 1, только если символом считать и неименованный код. Для читателя, который понимает символ как именованную единицу, пункт нужен (вывод).
- недостаточность: ✗ пункт 5 для `$comment` (что считать строкой) решается фиксом раздела 1.

**Russian:** ✗ Item 8 reads as "not part of the code *and* whose format allows comments".

**WORDING FIX**
- Item 2: "in a file whose language a description covers (§s-33fw3ga4ctd94dq), the code outside every symbol, other than imports (§s-2x58az67bm6cxq2), that no SpecTag binds;" / «в файле на языке, для которого есть описание (§s-33fw3ga4ctd94dq), код вне всех символов, кроме импортов (§s-2x58az67bm6cxq2), который не привязывает ни один SpecTag;»
- Item 8: "an entry in the bindings file (§s-trwczfskj5zmuft) for a file that is not part of the system's code other than tests, for a file whose format allows comments, or for a file whose language a description covers;" / «запись в файле привязок (§s-trwczfskj5zmuft) для файла, который не относится к коду системы помимо тестов, для файла, формат которого допускает комментарии, или для файла на языке, для которого есть описание;»
- Item 4 (nit): "in JSON Schema in the `$comment` of any object" / «а в JSON Schema — в `$comment` любого объекта».

## 5. s-rd9nftptjuz6bwv, tools 7.3.4a: ready (one nit), once §2 is applied

All 26 lines are ✓ except one:
- 3\. 7.2.1 ✗ (nit) Para 5, "is given", names no actor.

**Оценка**
- согласованность: ✓ сверено с §s-zn4vrdpnv9bch62, §s-vp24dqydygztqbt и §s-7vpsdsy8dpqdy6r.
- целостность: ✓ если §s-2x58az67bm6cxq2 ограничен файлами помимо тестов. Иначе рецензент получает все тесты файла.
- целесообразность: ✓
- избыточность: ✓ абзац 5 прямо говорит то, что следует из пункта 2 через §s-2x58az67bm6cxq2 (вывод).
- недостаточность: ✗ (мелочь) в абзаце 5 нет условия «если коммит добавляет или меняет этот код».

**Russian:** ✓

**WORDING FIX (nit)**, para 5: "Where the commit adds or changes the code outside every symbol of a file, which the SpecSheriff tools treat as one more symbol (§s-2x58az67bm6cxq2), `sheriff review` gives the reviewer that code in the same way." / «Если коммит добавляет или меняет код файла вне всех символов, который инструменты SpecSheriff считают ещё одним символом (§s-2x58az67bm6cxq2), `sheriff review` передаёт рецензенту этот код так же.»

## 6. s-suv42g8r3ra2h6b, tools 18: ready

All 26 lines are ✓.

**Оценка**
- согласованность: ✓ сверено с §s-kgbzk2ph9e6jfb4, §s-33fw3ga4ctd94dq и §s-dbk2vyeg8z5jxna.
- целостность: ✗ (мелочь, в другом узле) §s-nk8td3ez58gahc4 в абзаце 12 говорит, какой SpecTag у типа варианта, но не говорит, какой у определения варианта. «Its RecordType» в этом узле означает RecordType, который вариант уточняет.
- целесообразность: ✓ вопрос 4.4 Б.
- избыточность: ✓
- недостаточность: ✓

**Russian:** ✓. No findings on this node's own wording.

## 7. s-dbk2vyeg8z5jxna, tools 7.2.8: ready

All 26 lines are ✓.

**Оценка**
- согласованность: ✓ сверено с §s-dwxjxb7rw4w5yn3 и §s-qyjw8xez6t6adc3.
- целостность: ✓ ссылки на §s-trwczfskj5zmuft и §s-h5rfyy9j8nnhx62 ушли вместе с абзацем. SpecTag в `$comment` сверяет сравнение текста в абзаце 0.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**Russian:** ✓. No findings.

## 8. s-h5rfyy9j8nnhx62, removal: ready (one nit)

The checklist has nothing to check: there is no wording, so all 26 lines are n/a.

**Оценка**
- согласованность: ✓ узел никогда не был одобрен в `specs/`, а по правилу владельца узел, удалённый из спецификации-черновика, удаляется, а не архивируется. Его заменяет §s-suv42g8r3ra2h6b.
- целостность: ✓ на узел ссылался только §s-dbk2vyeg8z5jxna, и его черновик эту ссылку убирает.
- целесообразность: ✓ удаление названо в вопросе 4.4 Б.
- избыточность: ✓
- недостаточность: ✗ (мелочь) вместе с узлом уходит и правило «файл RuntimeChecks пишется, только если в нём есть хотя бы одно определение», а `change` об этом не говорит.

## 9. s-m8nmfsxkcfu7cjp, tools 7.3.1: not ready

All 26 lines are ✓ except two:
- 2\. 7.1 ✗ (nit) Para 4, "outside the system's code (§…) whose sid": "whose" can attach to "code".
- 19\. 7.4.2 Reason ✗ The reason says why citations are refused, not why the new SpecTag check exists.

**Оценка**
- согласованность: ✓ сверено с §s-sfjka4zc4rhfu67 (вариант Б) и §s-69pwmwyrk6efag2.
- целостность: ✓ SpecTag в коде системы и в файле привязок по-прежнему проверяет §s-36x8amvunmv2kp5.
- целесообразность: ✓ вопрос 4.5 Б.
- избыточность: ✓
- недостаточность: ✓

**Russian:** ✗ (nit) In para 4, «sid которого» can attach to «кода».

**DOUBT**, reason. Adding a third sentence would fail the pairing test, so the agreed sentences are reworded instead.
"Outside the specification, a citation or a SpecTag comes with no link to the node that it names (§s-cxtt6jvhqcey2k9). So a sid that names no node, a SpecTag that names anything but a rule of the guidelines (§s-sfjka4zc4rhfu67) or a number in place of a sid would mislead every reader, and no other check would notice it."
«За пределами спецификации у ссылки или SpecTag нет связи с узлом, который они называют (§s-cxtt6jvhqcey2k9). Поэтому sid, который не называет ни одного узла, SpecTag, который называет что-либо кроме правила guidelines (§s-sfjka4zc4rhfu67), или номер вместо sid вводили бы в заблуждение каждого читателя, и ни одна другая проверка этого бы не заметила.»

**WORDING FIX (nit)**, para 4, first sentence: "`sheriff citations` also refuses each SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) that is outside the system's code (§s-hheus6f395ynqvc) and whose sid names a node that is not a rule of the guidelines (§s-sfjka4zc4rhfu67, §s-69pwmwyrk6efag2)." / «`sheriff citations` отвергает также каждый SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp), который стоит вне кода системы (§s-hheus6f395ynqvc) и sid которого называет узел, не являющийся правилом guidelines (§s-sfjka4zc4rhfu67, §s-69pwmwyrk6efag2).»

---

## Answers to the brief's points
- **Removal of s-h5rfyy9j8nnhx62:** deleting it is right. The only gap is the nit in §8.
- **`$schema` and `$id` as imports:** keep `$schema` and drop `$id` (the TERM finding in §1).
- **A bindings-file entry for a file in a described language:** refusing it follows from rule 1.5.2's "for any other file".
- **s-5qdjyf6t898rsd4 under 4.3:** it needs no sentence, but s-33fw3ga4ctd94dq should take over its shebang exception.
- **Long sentences:** the only new one is para 8 of s-33fw3ga4ctd94dq.
- **Nodes outside part B that must change:** s-3xx2eukc8gtd2tx, s-u6mj5yv8ngnz79v, and as a nit s-nk8td3ez58gahc4. s-qqs2svksmjct753 needs a check.

## Ready
- s-dbk2vyeg8z5jxna
- s-suv42g8r3ra2h6b
- s-h5rfyy9j8nnhx62 (removal, one nit)
- s-weuyx98r7c923ab and s-rd9nftptjuz6bwv (nits only, once the s-2x58az67bm6cxq2 fix is applied)

Not ready: s-33fw3ga4ctd94dq, s-2x58az67bm6cxq2, s-9rtrj24myzjvshu, s-m8nmfsxkcfu7cjp.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/review-input-fo-b.md
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/skills/tools/src/cli.ts (a TypeScript file that opens with a shebang)

Sources:
- [JSON Schema 2020-12 Core](https://json-schema.org/draft/2020-12/json-schema-core)
