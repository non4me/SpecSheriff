# The review of base-questions.md, part A: the report of specsheriff-rule-reviewer

I loaded the `specsheriff-terminology-review` skill. I printed the checklist with `node .claude/vt/writing-rules.mjs`. I read every node and agreed draft the items cite, in `moved/` and `tools-drafts.json`.

The report covers 16 items, so it runs well past the 300-word limit. The brief asks for findings item by item, and that format governs.

## What applies to many items

- **G1, the author can fix it.** Each decision written for 1.1 to 1.6 has no `type` field. The schema `node.schema.json` requires `date`, `problem`, `ruling` and `type`. Add `"type": "textual"` to each.
- **G2, the author can fix it.** None of the new wordings in Q2 to Q9 has a Russian rendering or a Russian `change` field. The owner agrees to the Russian, so each needs both before the page.
- **G3, the author can fix it.** Some options don't say what a person sees: Q4 C, Q5 C and D, Q7 B, Q8 B, Q9 B.
- **G4, the author can fix it.** The file and the brief disagree on how section 1 reaches the owner:
  - line 23 and section 4 of the file say these changes are "shown as proposals";
  - the brief says they are approved on the owner's behalf;
  - `.claude/vt/rules.md` supports the file: "A change to an agreed node that only carries out a decision … is shown to the owner as a proposal";
  - `CLAUDE.md` supports the brief.

  Pick one and say it in both places.

## Checklist

Each line covers every item in my part. The items are 1.1 to 1.7 and Q1 to Q9.

- **1.2.3 A rule is made of its text and its reason:** ✗ Q5 row 10.1.28a: "since they follow only approved wordings". That is a reason inside the row's text. ✓ for the rest.
- **7.1 The goal, the reader and the scope:** ✓ (the problem with 1.6 is under 7.2.7).
- **7.2.1 Who must act:** ✗ Q9: "a skill … works with those of the user's session". A skill is not the agent that works with a model. ✓ for the rest.
- **7.2.2 The order of the text:** ✓
- **7.2.3 General words:** ✗ Q3: "the same place in the structure" does not say the structure of what. ✓ for the rest.
- **7.2.4 Naming:** ✗ Q9: "the user". Rule 4.3 already uses "the user" for a user of the system. ✗ Q8: "the method". The agreed s-7unxytshhc4md54 says "SpecSheriff". ✓ for the rest.
- **7.2.4.1 Coined names:** ✓
- **7.2.4.2 What a name says:** ✓
- **7.2.4.3 A general word in a name:** ✓
- **7.2.4.4 Properties:** ✓
- **7.2.4.5 Relations to other entities:** ✓
- **7.2.5 Definition by negation:** ✓
- **7.2.6 Lists that restrict:** ✓
- **7.2.7 Words that take their meaning from the specification:**
  - ✗ 1.6: "binds". The base doesn't say whether a SpecTag naming a section binds anything. It also doesn't say whether `@spec none` binds: under 9.3 it binds no rule, but under 1.5.2 it binds the symbol it stands before.
  - ✗ Q3: "folder of the base specification (§s-kag2m9tzdnduxdx)". The agreed drafts cite §s-5x737t9nee4zgaa for this phrase. "the stack section and the technical debt section" is not cited at all.

  ✓ for the rest.
- **7.3.1 The title:** ✓
- **7.3.2 Thoughts and sentences:** ✗ 1.5: the push item states two checks with different conditions in one sentence. ✓ for the rest.
- **7.3.3 The contents of a node:** ✓
- **7.4.1 Counts in prose:** ✗ 1.3: "run in three steps". This sentence is agreed. ✓ for the rest.
- **7.4.2 The reason:** ✗ in three agreed reasons, each of which goes through its text item by item: the second paragraph of 1.3's reason, 1.6's reason and 1.7's reason. ✗ Q8's reason. ✓ for the rest.
- **7.5.1 Superfluous rules:** ✓
- **7.5.2 The length of a sentence:** ✗ 1.1: the new sentence runs to 45 words. ✗ 1.5: the push item runs to about 70 words. ✓ for the rest.
- **7.5.3 Rules as tables:** ✓
- **7.6.1 The language of the specification:** ✓
- **7.6.2 Capital letters:** ✓
- **7.6.3 Examples:** ✗ 1.3: the example says "A scan for secrets runs after them". The agreed pre-commit hook now runs the project's other tools before `sheriff validate`. ✓ for the rest.
- **Pairing test:** ✗ 1.3, 1.6 and 1.7 (agreed reasons), and Q8. ✓ for the rest.

## Оценка

- **1.1 (правило 13.1)**
  - согласованность ✓ (вопрос 1 группы 7, ответ «А»; s-k4nqjr96ux7a5m7, s-rpv4fkdqqguptqd; правила 8.5 и 8.6)
  - целостность ✓ (13.2, 8.6)
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✓
- **1.2 (правило 13.2):** согласованность, целостность, целесообразность, избыточность и недостаточность — ✓, по тем же узлам, что в 1.1.
- **1.3 (правило 10.12)**
  - согласованность ✓ (вопрос 1 группы 8, ответ «А»; new:tools-6-pre-commit; строка 10.1.37b)
  - целостность ✗ пример показывает поиск секретов после проверок структуры, а согласованный хук pre-commit запускает его до `sheriff validate`
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✗ текст больше не говорит, что проверки структуры идут после первого шага
- **1.4 (правило 10.3)**
  - согласованность ✓ (вопрос 2 группы 8, ответ «А»; s-st6td4mua9uqt9z; строка 10.1.8)
  - целостность ✓ (правила 1.3.1 и 1.3.5)
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✓
- **1.5 (правило 10.2)**
  - согласованность ✗ пересказ строки 10.1.37b шире самой строки: он включает собственные проверки проекта и не исключает файлы, которые git игнорирует
  - целостность ✓ (правило 10.12, строка 10.1.37b)
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✗ неясно, относится ли «пока спецификация имеет статус `approved`» к обеим проверкам
- **1.6 (правило 9.5)**
  - согласованность ✓ (решения от 2026-11-17 о строках 10.1.26 и 10.1.26a; s-weuyx98r7c923ab, s-3xx2eukc8gtd2tx)
  - целостность ✗ правило 1.3.2 (текст), правила 1.3.3 и 10.6 (обоснования) и правило 10.7 (пример) по-прежнему говорят «без SpecTag»
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✗ база не говорит, привязывает ли что-нибудь SpecTag, который называет раздел, и привязывает ли `@spec none`
- **1.7 (правило 1.3.3)**
  - согласованность ✓ (строка 10.1.8, s-v4qus7raqnwzneb)
  - целостность ✗ согласованные s-ztseyetus7np6br и new:tools-2-reindex-writes всё ещё пишут «stands»
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✓
- **В1**
  - согласованность ✗ вопрос уже решён: страница группы 6 показала эту асимметрию с её причиной, и владелец ответил «ок» (s-xybjqp2rxh8gszf)
  - целостность ✓
  - целесообразность ✗ решать нечего
  - избыточность ✓
  - недостаточность ✓
- **В2**
  - согласованность ✓ (принцип «Nothing unapproved is implemented», правила 10.3 и 9.2)
  - целостность ✗ четвёртый пункт правила 1.3.2 пересказывает правило 1.3.5 не полностью, и это не названо
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✓
- **В3**
  - согласованность ✓ (решение от 2026-11-18 по строке 11.3.5; правила 1.1.2, 4.1, 1.7.3)
  - целостность ✗ папка сослана не на тот узел; второе предложение строки относится и к `stack.json` и `debt.json`; правило 11.1.1 остаётся без проверки
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✗ не назван риск для проекта без доменов, у которого в `base.json` есть свои разделы
- **В4**
  - согласованность ✓ (первое предложение правила 1.5.2; принцип «Rule, test and code bound by the sid»)
  - целостность ✗ не названы s-9rtrj24myzjvshu и new-tools-7-3-review-code
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✗ не сказано, как отличить SpecTag в начале файла от SpecTag символа, которым файл открывается
- **В5**
  - согласованность ✓ (правило 10.15 и его пример; строка 10.1.39a)
  - целостность ✗ правило 9.6 говорит то же, что строка 10.1.42, и при варианте А должно измениться тоже
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✓
- **В6**
  - согласованность ✓ (решения от 2026-11-13 и 2026-11-17 по правилу 10.10; s-st6td4mua9uqt9z; строка 10.1.31)
  - целостность ✓
  - целесообразность ✗ это не вопрос: решение от 2026-11-13 его уже решает
  - избыточность ✓
  - недостаточность ✓
- **В7**
  - согласованность ✗ вариант Б противоречит правилу владельца «A release carries out every rule it contains»
  - целостность ✓ (правило 10.10, строка 10.1.39)
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✗ первую половину правила 10.10, где вообще может стоять SpecTag, строка не проверяет
- **В8**
  - согласованность ✓ (s-7unxytshhc4md54; принцип «What SpecSheriff is for»)
  - целостность ✗ раздел 10 по своему тексту — о процедурах, которые пишут спецификацию
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✗ правило не говорит, что `sheriff remove` удаляет и записи о статусе одобрения, флаге `strict` и выбранных расширениях
- **В9**
  - согласованность ✓ (решение от 2026-11-02; s-tnz9zgqx8c629a7)
  - целостность ✗ модель и усилие рецензента задаёт s-tnz9zgqx8c629a7, а не s-xr5xxa9cxf2mq5u
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✗ «the user» в базе уже значит пользователя системы (правило 4.3)

## Verdicts and findings

### 1.1, rule 13.1: ready after G1

- **WORDING FIX, the author can fix it.** Split the new sentence so that it states one thing at a time.
  - EN: "…that node's sid, location (§s-kag2m9tzdnduxdx) and title. Where that node has no title, such as a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6), the export shows only its sid and location."
  - RU: «…с sid, расположением (§s-kag2m9tzdnduxdx) и заголовком узла на другом конце этой связи. Если у этого узла нет заголовка, как у узла в ячейке `TableRule` (§s-5fewsp22mmdz7y6), экспорт показывает только его sid и расположение.»

### 1.2, rule 13.2: ready after G1

### 1.3, rule 10.12: not ready

- **WORDING FIX, the author can fix it.** "Before any other check" no longer requires the checks of structure to run after the tools that rewrite files. The reason still says so, but a reason requires nothing (rule 1.2.3).
  - EN: "the following checks run after the first step and before any other check:"
  - RU: «следующие проверки выполняются после первого шага и раньше любой другой проверки:»
- **WORDING FIX on the example, the author can fix it.** The current order is what the hook no longer does. This change only shows what option A allows.
  - EN: "…then write their files. A scan for secrets runs next. The checks that each key is written only once in each object and that each file complies with its JSON Schema follow, and the other checks of the SpecSheriff guidelines run last, on the final files."
  - RU: «…записывают свои файлы. Дальше запускается поиск секретов. За ним идут проверки того, что каждый ключ записан в каждом объекте только один раз и что каждый файл соответствует своей JSON Schema, а остальные проверки SpecSheriff guidelines запускаются последними, на окончательных файлах.»
- **DOUBT, only the owner can answer it** (these sentences are agreed):
  - "run in three steps" counts the items of the list that follows (rule 7.4.1). A fix would be "run in the following steps".
  - The second paragraph of the reason grounds the steps and the exception one by one, which fails the pairing test.

### 1.4, rule 10.3: ready after G1

### 1.5, rule 10.2: not ready

- **WORDING FIX, the author can fix it.** Make two items out of one. Make the paraphrase match row 10.1.37b, and add a `cites` link to s-2fau85dfyyeq66m.
  - EN, first item: "on a push: the check that each of the project's own tools that runs after the tools that rewrite files, other than the project's own checks (§s-2fau85dfyyeq66m), leaves the files as they were, except for those that git ignores (§s-yn5tdx2bp4f5rq7);"
  - EN, second item: "on a push, where the project's own guidelines (§s-u7tw6m8npxmv5tu) name a push as the moment at which the tests run, and as long as the specification has the status `approved`: the tests of the system's code and of the project's own checks and generators;"
  - RU, первый пункт: «при push — проверка того, что каждый собственный инструмент проекта, который выполняется после инструментов, переписывающих файлы, кроме собственных проверок проекта (§s-2fau85dfyyeq66m), оставляет файлы такими, какими они были, кроме тех, которые git игнорирует (§s-yn5tdx2bp4f5rq7);»
  - RU, второй пункт: «при push, если собственные guidelines проекта (§s-u7tw6m8npxmv5tu) называют push моментом запуска тестов, и пока спецификация имеет статус `approved`, — тесты кода системы и собственных проверок и генераторов проекта;»

### 1.6, rule 9.5: not ready

- **WORDING FIX, the author can fix it.** As 1.6 now stands, the case the rulings target can slip through. Under 1.5.2, a SpecTag before a symbol "binds that symbol", so code with a SpecTag naming a section counts as bound. Add the sentence that the agreed s-9rtrj24myzjvshu already states to rule 1.5.2, where binding is defined. Q4 also rewrites 1.5.2, so the sentence can go in with it.
  - EN: "A SpecTag that names a node other than a rule, such as a section, binds nothing."
  - RU: «SpecTag, который называет узел, не являющийся правилом, например раздел, ничего не привязывает.»
- **Integrity, the author can fix it.** The same rename is owed in four other nodes, as replacements the author reports in one line:
  - the first item of rule 1.3.2 (s-utvqbypzhmgndug), "carries no SpecTag" in its text;
  - the reason of rule 1.3.3;
  - rule 10.6 (s-qzthyh7yqvfhsa2), its text ("a symbol without a SpecTag") and its reason;
  - the example of rule 10.7 (s-q3pfzyaxvpr2zj2).
- **DOUBT, only the owner can answer it.** The agreed reason goes through the three cases of the text one by one, which fails the pairing test.

### 1.7, rule 1.3.3: ready

- **Integrity, the author can fix it.** The file says the appendix of the tools uses "is in force". Several agreed nodes of that appendix still say "stands": `proposal:s-ztseyetus7np6br`, its later version `-g3`, and `new:tools-2-reindex-writes`. Name them, and make the same replacement there.
- **DOUBT, only the owner can answer it.** The agreed reason goes through the three cases of the text one by one, which fails the pairing test.

### Q1, withdrawing a `TableRule`'s approval: should not reach the owner

The owner has already settled this. The page of group 6 showed, in Russian, that withdrawing a table's approval withdraws only the table's own approval, and why. The owner answered «ок». Rules 1.3.7 and 1.3.4, read as they are, already give option B. Move Q1 to section 3, citing s-xybjqp2rxh8gszf and the agreement of 2026-11-25.

### Q2, whether a node's kind is part of its wording: not ready

- **WORDING FIX, the author can fix it.** In the new reason, "its kind is part of that" refers back to what the wording states, not to the wording itself.
  - EN: "A node requires only what its wording states. Its kind belongs to that wording, since the kind decides, for example, whether code must implement the node. So an approval lapses…"
  - RU: «Узел требует только того, что говорит его формулировка. Его тип входит в эту формулировку, потому что тип решает, например, должен ли код реализовывать этот узел. Поэтому одобрение теряет силу…»
- **Integrity, the author can fix it.** Name rule 1.3.2's fourth item, "title, text or reason". It retells rule 1.3.5 and leaves out the examples, the fields and, under option A, the kind.
- **TERM.** "Wording" then covers everything an approval fixes. That partly matches what [29148] 2018 calls a baseline: a formally approved version, fixed at a time (from the skill's registry). I recommend keeping the word and adding a gloss in the docs (inference). The gloss costs nothing in the nodes.

### Q3, a check of the technical appendix's structure without domains: not ready

- **WORDING FIX, the author can fix it.** Replace the "What is checked" cell of the new row. The fix also removes "stands for", a phrase the agreed drafts avoid. Add a `cites` link to s-5x737t9nee4zgaa.
  - EN: "For every section of the technical appendix (§s-tj38pvm38nepaf5), other than the section for the stack and the technical debt section (§s-vj7ercem526zd6v), the same titles lead to it as to a section of the base specification (§s-qmmzf9nksfsa3qp): the titles of the sections that hold it, from the top down, followed by its own. In a file of the technical appendix named after a folder of the base specification (§s-5x737t9nee4zgaa), the first top-level node represents that folder"
  - RU: «К каждому разделу технического приложения (§s-tj38pvm38nepaf5), кроме раздела стека и раздела технического долга (§s-vj7ercem526zd6v), ведут те же заголовки, что и к разделу базовой спецификации (§s-qmmzf9nksfsa3qp): заголовки разделов, которые его содержат, сверху вниз, а за ними его собственный. В файле технического приложения, названном по папке базовой спецификации (§s-5x737t9nee4zgaa), первый узел верхнего уровня представляет эту папку»
- **The author can fix it.** Option A names no risk for the user. Add one.
  - EN: "Risk: a project without domains whose `base.json` holds a section that the base specification lacks, such as one on deployment, is refused until the section moves."
- **The author can fix it.** Name rule 11.1.1 (s-h6h25ctd3yryudh). Row 11.3.5 is the only check on it.

### Q4, code at the top level of a file: not ready

- **The author can fix it.** Option A's cost leaves out two agreed nodes that change:
  - s-9rtrj24myzjvshu refuses any SpecTag that is not directly above a symbol;
  - new-tools-7-3-review-code gives the reviewer only changed symbols and files bound as a whole.
- **The author can fix it.** The question must also say who settles how a SpecTag at the start of a file is told apart from the SpecTag of a symbol that opens the file. The agreed tools node 8.2 already settles a similar case: a blank line under a SpecTag leaves it binding nothing.
- **The author can fix it.** Option C contradicts the principle "Rule, test and code bound by the sid". Label it so.
- **DOUBT, only the owner can answer it.** I propose an example for rule 1.5.2.
  - EN: "A Python file defines a function and ends with a call that starts a server, outside every function. A comment at the start of the file holds the SpecTag of the rule that the call implements. The most likely mistake is to leave the call bound to no rule because the file's symbols carry SpecTags."
  - RU: «Файл Python определяет функцию и заканчивается вызовом, который запускает сервер, вне всех функций. Комментарий в начале файла содержит SpecTag правила, которое реализует этот вызов. Самая вероятная ошибка — оставить вызов не привязанным ни к одному правилу, потому что у символов файла есть SpecTag.»

### Q5, a file of RuntimeChecks bound to every RecordType: not ready

- **The author can fix it.** Under option A, rule 9.6 (s-ef93u6cnbs2sevr) must change too. It states row 10.1.42 word for word. A is cheapest only if this is left out, and that is not stated.
- **WORDING FIX, the author can fix it.** Take the reason out of row 10.1.28a's text.
  - EN: "A draft rule is not implemented: no commit adds or changes a test, or code outside the files generated from the specification (§s-qyjw8xez6t6adc3), that a SpecTag naming the rule binds"
  - RU: «Черновое правило не реализуется: ни один коммит не добавляет и не меняет тест или код вне файлов, сгенерированных из спецификации (§s-qyjw8xez6t6adc3), которые привязывает SpecTag, называющий это правило»
- **The author can fix it.** The basis for the recommendation should weigh the reason of rule 1.5.2, which favours option B: "Binding each file … as precisely as its format allows". B leaves rule 9.6 and both rows as they are.

### Q6, rule 10.3 and the repository's own tools: should not reach the owner

The owner's ruling of 2026-11-13 on rule 10.10 settles this question: the requirements on the tests of a project's own checks are removed. Make it decided change 1.8, with the risk about this repository reported in one line.

- **WORDING FIX, the author can fix it.** The new item should use the agreed phrase from 1.5.2.
  - EN: "change the system's code (§s-hheus6f395ynqvc), other than its tests, that is written for a rule, including a rule of a project's own kind (§s-vsh384ybt4w25a2), while no test has that rule's SpecTag (§s-8xw4mgvpexyvw5q, §s-rah8b37kytb682y);"
  - RU: «изменила бы код системы (§s-hheus6f395ynqvc), кроме её тестов, написанный для правила, в том числе для правила собственного типа в проекте (§s-vsh384ybt4w25a2), пока ни у одного теста нет SpecTag этого правила (§s-8xw4mgvpexyvw5q, §s-rah8b37kytb682y);»

### Q7, no check of SpecTags outside the system's code: not ready

- **The author can fix it.** Option B leaves a rule that nothing carries out, which the owner's rule "A release carries out every rule it contains" forbids. The real alternative is that rule 10.10 drops its restriction. Replace B with that.
- **The author can fix it.** The stated risk, a document that quotes a SpecTag, already breaches rule 10.10. Rule 10.10 allows a SpecTag outside the system's code only in the repository's own tools and their tests.
- **DOUBT, only the owner can answer it.** The proposed row doesn't check that half of rule 10.10, so a gap remains either way:
  - no setting tells the tools which files are the repository's own tools, so that half cannot be checked;
  - either a setting names those paths, or rule 10.10 drops the restriction on where a SpecTag may appear.

### Q8, a rule on setting a repository up and removing SpecSheriff: not ready, and not a question of "now or in T34"

The owner's rule "A defect found is fixed at once" says "the owner is not asked when to fix it". Show the new rule for agreement instead.

- **The author can fix it.** The basis is inaccurate. s-7unxytshhc4md54 is agreed, so nothing unapproved ships. The real defect is the `implements` links that don't hold, which row 10.1.23 forces.
- **WORDING FIX and TERM, the author can fix it.** "The method" is not a term of the base: it appears only in the reason of rule 10.12, and the agreed node says "SpecSheriff". It is a name with no established match and no definition in the specification. Replace it; this costs nothing.
  - EN, title: "Setting a repository up and taking SpecSheriff out of it"
  - EN, text: "One procedure of the SpecSheriff tools sets a repository up for them, and another takes SpecSheriff out of it. Taking SpecSheriff out removes what setting the repository up wrote outside the specification. It leaves the specification, the code and the tests as they are."
  - EN, reason (passes the pairing test): "A project can take up SpecSheriff or stop using it without knowing which files and settings the SpecSheriff tools need, and keeps its specification, which states what its system does, either way."
  - RU, заголовок: «Настройка репозитория и удаление из него SpecSheriff»
  - RU, текст: «Одна процедура инструментов SpecSheriff настраивает для них репозиторий, а другая удаляет из него SpecSheriff. Удаление SpecSheriff убирает то, что настройка репозитория записала вне спецификации. Спецификацию, код и тесты оно оставляет как есть.»
  - RU, обоснование: «Проект может начать или перестать пользоваться SpecSheriff, не зная, какие файлы и настройки нужны инструментам SpecSheriff, и в любом случае сохраняет свою спецификацию, которая говорит, что делает его система.»
- **DOUBT, only the owner can answer it.** The agreed s-7unxytshhc4md54 also deletes the entries for the approval status, the `strict` flag and the chosen extensions. The new rule doesn't say so. Should it?
- **The author can fix it.** Section 10's own text covers only checks and the procedures that write the specification. Either change that text or name another section for the new rule.

### Q9, a rule on the model and the reasoning effort: not ready, and not a question of timing

The same owner's rule applies as in Q8: show the new rule for agreement, not a choice of when.

- **TERM, the author can fix it.** "The user" is a false friend inside the specification. Rule 4.3 uses "the user" for a user of the system, and the owner's word for any such user is «оператор» (terms-ru, 2026-10-08). In [29148] a user is a stakeholder of the system being specified ((unverified): the skill's registry gives no definition). I recommend renaming it in this node; this costs nothing. The agreed tools nodes keep "the user", with a gloss in the docs.
  - EN, text: "…works with a model and a reasoning effort chosen by the person on whose machine it runs:
    - the agent of a session in which a skill runs, and any agent that the skill starts, work with those of that person's session;
    - any other agent, such as the reviewer (§s-m4h279nbaqkpa3t), works with those that the person has confirmed on that machine."
  - EN, reason: "Whoever runs an agent pays for that run, so only they decide what it costs."
  - RU, текст: «…работает с моделью и усилием рассуждения, которые выбрал человек, на чьей машине он работает:
    - агент сессии, в которой работает skill, и любой агент, которого этот skill запускает, работают с моделью и усилием сессии этого человека;
    - любой другой агент, например рецензент (§s-m4h279nbaqkpa3t), работает с теми, которые этот человек подтвердил на этой машине.»
  - RU, обоснование: «Тот, кто запускает агента, платит за этот запуск, поэтому только он решает, сколько этот запуск стоит.»
- **The author can fix it.** The `implements` link should come from s-tnz9zgqx8c629a7, "The settings of each runner". s-xr5xxa9cxf2mq5u says nothing in its text about the model or the effort.
- **The author can fix it.** The basis says that the rule naming the skills waits for T34. The proposed rule names "a skill of a SpecSheriff plugin" all the same. Say that it names skills only as the place where an agent runs.

## Should not reach the owner as questions

- **Q1:** the owner's «ок» to group 6, on a page that showed this asymmetry, has settled it.
- **Q6:** the ruling of 2026-11-13 settles it, so it becomes a decided change.
- **Q8 and Q9 as choices of timing:** the owner's rule "A defect found is fixed at once" forbids asking when to fix a defect. Both go to the owner only as new rules for agreement.
- **Q7's option B:** it contradicts "A release carries out every rule it contains". Replace it with the change to rule 10.10.

The file reviewed is `D:/SpecSheriff/.ai_docs/t25-pass/base-questions.md`. The lookup scripts I wrote are in `C:/Users/PC/AppData/Local/Temp/claude/a0dc34c442b04427/8cff5ff8-2618-4605-ba3d-4c860a64081a/scratchpad/`. I changed no file in the repository.

Sources: the skill's registry of vocabularies, for [29148] 2018 (baseline) and [IREB] CPRE Glossary 2.0.

## The main session's decisions

They are in fix-brief-bq-b.md, which holds the decisions on all three reports of this review.
