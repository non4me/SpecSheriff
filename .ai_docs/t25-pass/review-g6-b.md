# Review of group 6, input b: three drafts in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`

None of the three drafts is ready. Each has checklist failures that you can fix. Two points need the owner: one in the approval node, and one in the withdrawal node.

## new:tools-2-entries (s-d3nkw9b6mn98vuw): "The entries of the settings that only an owner changes". Not ready

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
- 7.2.4.4 Properties ✗ "Where `approvalStatus` holds no entry", "Where `strict` holds no entry", "the last entry of `extensions`": each key appears without the object it belongs to.
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✓
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✗ "`sheriff settings` appends each entry to the end of its list, and a commit keeps the entries of its parent first": two facts with no relation between them.
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✗ "so that this entry has the same text whenever it is written": the reason stops before saying why that matters.
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test of the reason ✓

**Оценка**
- согласованность: ✗ значение `by` определено через `sheriff settings`, а запись, которую пишет `sheriff reindex`, называет ответственного, который последним одобрил прежнее правило (s-gb8s9657a65hqmv). Сверено с s-qzthyh7yqvfhsa2, s-q3pfzyaxvpr2zj2, s-9ttvcwpqkehm58g, s-9g7jj8z4yf9kq93, s-chsfpkgpmfk4fft, s-j9r8z4xdrfkfs47, s-zefk589ykh37b8u.
- целостность: ✓ s-j9r8z4xdrfkfs47, s-83ev4wwesbwnhnp, s-v4qus7raqnwzneb (там тот же принцип: последняя строка — самая поздняя), s-gb8s9657a65hqmv.
- целесообразность: ✓ ни один узел не задавал вид записей; правила 10.6 и 10.7 говорят только «самая поздняя запись».
- избыточность: ✓
- недостаточность: ✗ `strict` содержит список записей, а не значение флага. Неясно, где `config.schema.json` задаёт булево значение флага по умолчанию (s-zefk589ykh37b8u).

**Findings**
1. **WORDING FIX** (you can fix): "The value of an entry's `by` is the email address by which `sheriff settings` names the owner who made the change." becomes "An entry's `by` holds the email address of the owner who made the change." / «`by` записи содержит адрес электронной почты ответственного, сделавшего изменение.»
2. **WORDING FIX** (you can fix): "`sheriff settings` appends each entry to the end of its list. A commit keeps the entries of its parent first (§s-j9r8z4xdrfkfs47)." / «`sheriff settings` добавляет каждую запись в конец её списка. Коммит оставляет записи родительского коммита первыми (§s-j9r8z4xdrfkfs47).»
3. **WORDING FIX** (you can fix; it also settles where the default is set): "Where `sheriff.config.json` holds no entry for the approval status, no owner has approved the specification, so the specification is a draft (§s-9g7jj8z4yf9kq93). Where it holds no entry for the `strict` flag, the flag has the value that the schema of `sheriff.config.json` gives as the `default` of an entry's `on` (§s-zefk589ykh37b8u)." / «Если в `sheriff.config.json` нет ни одной записи статуса одобрения, ни один ответственный не одобрял спецификацию, поэтому она черновик (§s-9g7jj8z4yf9kq93). Если в нём нет ни одной записи флага `strict`, флаг имеет значение, которое схема `sheriff.config.json` задаёт как `default` для `on` записи (§s-zefk589ykh37b8u).»
   - Also replace "the last entry of `extensions` that names the extension" with "the last entry that names the extension" / «последняя запись, называющая расширение».
4. **WORDING FIX** (you can fix): the last sentence of the reason becomes "An entry holds nothing that depends on when it is written, so the check of the entries (§s-j9r8z4xdrfkfs47) never takes that entry for a changed one." / «Запись не содержит ничего, что зависит от времени её создания, поэтому проверка записей (§s-j9r8z4xdrfkfs47) никогда не принимает эту запись за изменённую.»

## new:tools-2-approve-spec (s-m59dqwkw2e96wne): "Approving the specification". Not ready

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✗ the opening sentence is about 40 words long, with a list after the colon.
- 7.2.3 General words ✗ "the model of the specification … that the node on such checks gives for this run": the sentence does not say what the model represents.
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✗ "The project's own checks": first use, with no citation of s-2fau85dfyyeq66m.
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
- согласованность: ✗ проверку строки 10.1.39b (s-f8fmudceuyaj942) делает `sheriff types` (s-a8fn72xa782wvbk), и она не входит в «these checks». Поэтому одобрение, при котором нашлась только эта проблема, вносится без подтверждения, а s-qzthyh7yqvfhsa2 требует подтверждения, если проверки нашли хоть что-то. Сверено также с s-epaw9sgyaajzn8g, s-q3pfzyaxvpr2zj2, s-chsfpkgpmfk4fft, s-nxgkp988mej79eg, s-7pk89t8z6wymmj9 (предложение g6), s-dbk2vyeg8z5jxna, `moved/impl.json`.
- целостность: ✗ весь код считается добавленным, а bindings file — не изменённым. Поэтому отказы s-9rtrj24myzjvshu по записям bindings file (s-trwczfskj5zmuft) ответственный не видит. При этом заметки автора к s-7unxytshhc4md54 сами относят этот файл к коду проекта.
- целесообразность: ✓ правило 10.6 требует этого запуска. По s-f5rz6b7dhxejjts проверено, что остальные проверки делают другие команды.
- избыточность: ✓
- недостаточность: ✗ какую модель спецификации получают собственные проверки проекта, сказано только ссылкой на s-7pk89t8z6wymmj9.

**Findings**
5. **WORDING FIX** (you can fix)
   - Paragraph 1: "Before `sheriff settings` records an entry that approves the specification (§s-chsfpkgpmfk4fft, §s-d3nkw9b6mn98vuw), it runs every check that the rule on the specification's approval status requires before an approval (§s-qzthyh7yqvfhsa2). These are the checks that `sheriff validate`, `sheriff binding` and `sheriff citations` make (§s-4kd2pave7vm4hmd), and the check for a node from which nothing is generated, which `sheriff types` makes (§s-f8fmudceuyaj942)." / «Прежде чем `sheriff settings` вносит запись, которая одобряет спецификацию (§s-chsfpkgpmfk4fft, §s-d3nkw9b6mn98vuw), она выполняет каждую проверку, которую правило о статусе одобрения спецификации требует перед одобрением (§s-qzthyh7yqvfhsa2). Это проверки, которые делают `sheriff validate`, `sheriff binding` и `sheriff citations` (§s-4kd2pave7vm4hmd), и проверка узла, из которого ничего не генерируется, которую делает `sheriff types` (§s-f8fmudceuyaj942).»
   - Paragraph 4: "`sheriff settings` makes the check for a node from which nothing is generated as `sheriff types` does (§s-a8fn72xa782wvbk), but writes no file." / «Проверку узла, из которого ничего не генерируется, `sheriff settings` делает так же, как `sheriff types` (§s-a8fn72xa782wvbk), но не пишет ни одного файла.»
6. **WORDING FIX** (you can fix; also add a `cites` link to s-2fau85dfyyeq66m): "The project's own checks (§s-2fau85dfyyeq66m) receive a model of the specification (§s-w6gybeqn2ttydqx) in which the specification is approved and its `strict` flag has the value that the entries set (§s-7pk89t8z6wymmj9)." / «Собственные проверки проекта (§s-2fau85dfyyeq66m) получают модель спецификации (§s-w6gybeqn2ttydqx), в которой спецификация одобрена, а флаг `strict` имеет значение, которое задают записи (§s-7pk89t8z6wymmj9).»
7. **DOUBT** (you can fix; it goes to the owner only if you read rule 10.6 as leaving this file out): add "the bindings file (§s-trwczfskj5zmuft);" / «bindings file (§s-trwczfskj5zmuft);» to the list of what the commit adds, with a `cites` link.

## new:tools-2-extension-off (s-n4ny597qdv9c9bu): "Withdrawing the choice of an extension". Not ready

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
- 7.2.7 Words that take their meaning from the specification ✓
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✗ the reason's two sentences justify paragraphs 1 and 2 in turn.
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test of the reason ✗ sentence 1 grounds the refusal, and sentence 2 grounds the list, in order.

**Оценка**
- согласованность: ✓ s-j8y62pa9hzz6nwx, s-9ttvcwpqkehm58g, s-chsfpkgpmfk4fft, s-d3nkw9b6mn98vuw, s-mhsb6fjsq5xn6c9, `extension.schema.json`.
- целостность: ✓ s-chsfpkgpmfk4fft, s-gb8s9657a65hqmv, s-zefk589ykh37b8u.
- целесообразность: ✓ правило 1.7.6 требует отказа с перечнем узлов.
- избыточность: ✓
- недостаточность: ✗ после отзыва расширения следующий коммит не пройдёт проверку схемы, если есть одно из двух. Первое — узел архива того типа, который добавляет расширение: `archive-file.schema.json` проверяет такой узел по схеме расширения, а sid у него нет. Второе — ссылка `project.schema.json` на определение в `$defs` расширения: в `recordtype.schema.json` такие определения есть уже сейчас. Именно от этой ошибки предостерегает пример правила 1.7.6.

**Findings**
8. **WORDING FIX** (you can fix): the reason becomes "An extension's schema declares, and its file holds, everything that the extension adds, so those two show every node that a withdrawal would leave relying on rules and definitions that no longer hold in the project (§s-j8y62pa9hzz6nwx)." / «Схема расширения объявляет, а его файл содержит всё, что добавляет расширение, поэтому по ним видно каждый узел, который отзыв выбора расширения оставил бы опирающимся на правила и определения, которые в проекте больше не действуют (§s-j8y62pa9hzz6nwx).»
9. **DOUBT** (owner): the archive case and the `$defs` case lie outside rule 1.7.6. Your notes set the `$defs` case aside because "no rule or extension needs it now", but the RecordType extension has `$defs` today. I recommend widening rule 1.7.6 so that the withdrawal is also refused in these two cases. An archived node would be named by its file and its location, since it has no sid.

## Points to look at
- **One node for all three settings:** your reading holds. s-j9r8z4xdrfkfs47 checks the three lists the same way, and rule 7.3.3 keeps them together.
- **One commit that adds every node:** your reading holds. Adding the approvals in force is needed for row 10.1.41. Findings 5 and 7 complete it.
- **How a node depends on an extension:** your reading holds for nodes of the specification. Finding 9 covers the rest.

**TERM:**
- "Approving the specification" partly matches "requirements baseline" ([IREB] CPRE Glossary 2.0; [29148]:2018). Unlike a baseline, the method's approval fixes no version: it sets how strictly the checks treat the code. I recommend a gloss in the docs only, which costs nothing in the nodes.
- The keys `strict` and `extensions` hold lists of entries. Readers used to tsconfig-style files may expect a boolean and a list of names (unverified).

## Questions only the owner can answer
- Finding 9.
- Finding 7, only if you keep the bindings file out of the commit.
