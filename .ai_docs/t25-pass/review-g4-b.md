# Review of group 4, input b: items 34 and 35

Both drafts are **not ready**. Draft 34 needs fixes the author can make. Draft 35 needs author fixes and one answer from the owner. None of the brief's "Points to look at" covers these two items.

## s-nh8b2hjvzasdxmd — "A location outside the specification"

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✗ "Such text counts only on its own": "Such text" points back to the numbered form defined in the paragraph before. Its example, `tech/stack`, belongs to the other kind of location.
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
- 7.2.7 Words that take their meaning from the specification ✗ "the project's own guidelines" has no citation of s-u7tw6m8npxmv5tu.
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
- согласованность: ✓ сверено с 1.2.2 (s-9spq78kdwsxr759), предложением по 8.5 (s-kag2m9tzdnduxdx), s-ygg5kpcxgzq3m7w, 10.11 (s-6hha5en226aj8hu) и её решениями, строкой 10.1.38 (s-u5hfbygfyqv4wmf), s-zefk589ykh37b8u и решением от 2026-11-10 об удалении NodeKind.
- целостность: ✓ с s-m8nmfsxkcfu7cjp и s-qzyacnqwvaeaps4 нет пересечений: `§5.8` отвергает только s-m8nmfsxkcfu7cjp, а `§base/3.2` — только этот узел. Правка impl.json для строки 10.1.39 названа в заметках, пункт 6.
- целесообразность: ✓ без этой проверки никто бы не заметил устаревшее расположение в документации.
- избыточность: ✓ фразу о `sheriff validate` убрали, потому что её говорит s-qzyacnqwvaeaps4.
- недостаточность: ✗ из-за «Such text» неясно, относится ли условие «стоит отдельно» к обоим пунктам. Условие «ends in no number» не решает, что делать с термином, имя которого кончается цифрой (`contracts/OAuth2`), а код считает такое имя расположением.

**Findings** (the author can fix all of them)
1. **WORDING FIX** (rule 7.2.7). EN: "`sheriff binding` leaves out each file that the project's own guidelines (§s-u7tw6m8npxmv5tu) list as a fixture of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu)." Add a `cites` link to s-u7tw6m8npxmv5tu. RU: «`sheriff binding` оставляет без проверки каждый файл, который собственные guidelines проекта (§s-u7tw6m8npxmv5tu) перечисляют как fixture тестов проверки, читающей цитаты или расположения (§s-6hha5en226aj8hu).» The current Russian «не проверяет файлы» drops "each".
2. **WORDING FIX** (rule 7.1). "Such text" points back across a paragraph. The `vt` rules reserve "counts" for counting. The Russian «считается» has no complement. EN: "`sheriff binding` takes text as a location only where the text stands on its own, not as part of a longer path or name, such as `tech/stack` in `specs/tech/stack.json`." RU: «`sheriff binding` считает текст расположением, только если этот текст стоит отдельно, а не входит в более длинный путь или имя, как `tech/stack` в `specs/tech/stack.json`.»
3. **WORDING FIX** (owner's ruling of 2026-11-21 that conditions are written in positive form). This wording matches what binding.ts:423 does. Second item of the first list, EN: "the location of a term (§s-khqsmy6mhejkrhg) or of the first top-level node of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5), as the model of the specification (§s-w6gybeqn2ttydqx) holds it, such as `contracts/request` or `tech/stack`." The last item of the next list then drops its two citations. RU: «расположение термина (§s-khqsmy6mhejkrhg) или первого узла верхнего уровня файла guidelines, описания инструментов (§s-a4rbry4hsu34hy8) или технического приложения (§s-tj38pvm38nepaf5) — такое, каким оно есть в модели спецификации (§s-w6gybeqn2ttydqx), например `contracts/request` или `tech/stack`.»
4. **WORDING FIX.** The current wording does not say in what order the parts come. EN: "…consists of one of the following, followed by a slash and one or more numbers separated by dots:" RU: «…состоит из одного из следующего, за которым следуют косая черта и один или несколько номеров, разделённых точками:»
5. **WORDING FIX.** Change the title to "A node's location outside the specification", so that it matches the Russian «Расположение узла».
6. **WORDING FIX** (reason). This check itself notices a stale location, so "without any check noticing" is not accurate. EN: "…and no other check would notice it." RU: «…и ни одна другая проверка этого бы не заметила.»

**TERM:** the draft introduces no new term. "location" is the owner's word (2026-11-05), and no established vocabulary has an equivalent (unverified). "fixture" matches the xUnit "test fixture" only partly (unverified, not in the registry): there it means any prepared test state, here only the listed files. Rule 10.11 already agreed the term.

## s-m8nmfsxkcfu7cjp — "A citation outside the specification"

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✗ two exceptions of the same kind sit in separate paragraphs: "except the sid of a SpecTag…" and "leaves out each file…".
- 7.2.3 General words ✓
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✗ "`sheriff citations` reads the following files:" lists what is read. A file left off that list would go unnoticed, and in that case the rule calls for a list of what is left out (finding 5).
- 7.2.7 Words that take their meaning from the specification ✗ "the project's own guidelines" has no citation of s-u7tw6m8npxmv5tu.
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✗ "In the files that it reads, `sheriff citations` checks each word that has the form of a sid" repeats the first list. Only the exception that follows is new.
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test of the reason ✓

**Оценка**
- согласованность: ✗ шаблон sid повторён в тексте, а 5.1 (s-eferktypcj7njt5) говорит, что схема — единственное описание структуры. Остальное сверено и согласуется: 2.6 (s-f2b5zvc565s242f) и решение от 2026-11-12, решения по строке 10.1.39 от 2026-11-13 и 2026-11-20, 10.10 (s-sfjka4zc4rhfu67), s-36x8amvunmv2kp5, proposal:new-tools-1-settings-g3, s-a8fn72xa782wvbk.
- целостность: ✗ строка 10.1.39 говорит о «коде», а 10.10 допускает SpecTag в любых собственных инструментах репозитория. Узел читает только код, который назван в `sheriff.config.json`. Обоснование ссылается на 1.2.2, хотя это утверждение делает 6.3 (s-cxtt6jvhqcey2k9).
- целесообразность: ✓ кроме этой проверки, устаревший sid или номер вместо sid за пределами спецификации не замечает ничто.
- избыточность: ✗ шаблон sid повторяет схему. Предложение «The check of a SpecTag that names no node checks…» пересказывает s-36x8amvunmv2kp5.
- недостаточность: ✓ не найдено.

**Findings**
1. **WORDING FIX** (author; rules 7.2.2, 7.2.7 and 7.5.2). Replace the paragraphs "In the files that it reads…" and "`sheriff citations` leaves out each file…" with one list, and add a `cites` link to s-u7tw6m8npxmv5tu. EN: "`sheriff citations` leaves out the following:
   - each file that the project's own guidelines (§s-u7tw6m8npxmv5tu) list as a fixture of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu);
   - the sid of each SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) in the system's code or its tests, which the check of a SpecTag that names no node looks up instead (§s-36x8amvunmv2kp5)."

   RU: «`sheriff citations` оставляет без проверки следующее:
   - каждый файл, который собственные guidelines проекта (§s-u7tw6m8npxmv5tu) перечисляют как fixture тестов проверки, читающей цитаты или расположения (§s-6hha5en226aj8hu);
   - sid каждого SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) в коде системы или в его тестах: такой sid вместо него ищет проверка SpecTag, который не называет ни одного узла (§s-36x8amvunmv2kp5).»
2. **CUT** (author; rule 5.1). The agreed s-gb8s9657a65hqmv also writes only "has the form of a sid". Cut "`s-` followed by 15 characters from `23456789abcdefghjkmnpqrstuvwxyz`," in English and «— `s-` и 15 символов из `…`, —» in Russian.
3. **WORDING FIX** (author). In the reason, cite §s-cxtt6jvhqcey2k9 in place of §s-9spq78kdwsxr759, in English and in Russian, and add a `cites` link to s-cxtt6jvhqcey2k9.
4. **WORDING FIX** (author; example). "refuses it" reads as refusing the commit. EN: "That commit changes no file outside `specs/`, yet `sheriff citations` refuses the sid in the guide, naming the guide, the line and the sid." RU: «Этот коммит не меняет ни одного файла вне `specs/`, но `sheriff citations` отвергает этот sid в руководстве, называя руководство, строку и sid.»
5. **DOUBT** (owner; rules 7.2.6 and 10.10, row 10.1.39). I measured this repository's tracked files outside `specs/` that are neither Markdown nor matched by the test patterns. They hold 48 distinct sids that this check would never read, in files such as `skills/tools/src/*.ts`, `scripts/release.mjs` and `skills/tools/hooks/pre-push`. Today the only sid among them that names no node is the placeholder in `D:/SpecSheriff/skills/tools/src/reindex.ts:104`.
   - **(A)** Keep the list, and narrow row 10.1.39 to the code that the settings name. Cost: a stale sid in a tool's comment goes unseen.
   - **(B)** Read every file that the repository keeps outside `specs/`, leaving out the bindings file, as s-nh8b2hjvzasdxmd already does for locations. Cost: the placeholder in `reindex.ts:104` would be refused and has to be rewritten.

   I recommend B (inference): it satisfies rule 7.2.6 and matches the sibling node.

## Only the owner can answer
1. Finding 5 on s-m8nmfsxkcfu7cjp: which files `sheriff citations` reads (A or B).
