# Nodes of sections 11, 12, 13 as they will stand (generated 2026-11-10T00:41:02.442Z)

A node with a draft takes it from newform.json. A node moving unchanged takes the present node of spec.json.

## 11.1 | moves unchanged | from present 3.1 | s-hheus6f395ynqvc

Title: The system's code is the code implementing the specification, and its tests
Russian title: Код системы — это код, реализующий спецификацию, и его тесты

Text:
The system's code is the code implementing the specification outside its guidelines, and the tests verifying that code. The implementing code includes code written by hand and code generated from the specification's nodes.

The repository's configuration, its own tools and the tests of those tools are not the system's code. A project's own checks and generators are among those tools (§s-km4x4s26kv7pjze). The two are told apart by where each lives.

Reason:
Code and its tests are written together, the test first (§s-rah8b37kytb682y). A rule counts as implemented only by a symbol carrying its SpecTag together with a passing test carrying its SpecTag (§s-6fw72j65jkqrfpf). So the tests belong with the code they verify.

Code generated from a node is part of the system as much as code written by hand. The repository's configuration and its own tools serve the work on the system, not what the system does. Where a file lives reads the same to every check, so it decides on which side the file is.

Russian text:
(none yet)

Russian reason:
(none yet)

## 11.2 | drafted | from present 1.8 | s-zg6bvg7jrcpu8vf

Title: A top-level section is reviewed whole before its implementation begins
Russian title: Раздел верхнего уровня проверяется целиком до начала его реализации

Text:
Before the implementation of a top-level section of the base specification begins, that section is reviewed whole.

Reason:
Read whole, a section shows the gaps and the contradictions between its rules, which no single rule shows. Found before the code is written, they are settled in the specification, not guessed in the code.

Russian text:
Прежде чем начнётся реализация раздела верхнего уровня базовой спецификации, этот раздел проверяют целиком.

Russian reason:
Прочитанный целиком, раздел показывает пробелы и противоречия между своими правилами, которых не показывает ни одно правило в отдельности. Найденные до того, как написан код, они решаются в спецификации, а не угадываются в коде.

What changed against the present node:
- Текст — первая фраза абзаца 2 нынешнего 1.8, дословно.
- Обоснование новое: нынешнее обоснование 1.8 держит то, что остаётся в 1.3.2.
- По вашему решению основные правила не называют домены и RecordType.

## 11.3 | moves unchanged | from present 3.3 | s-rwqzepmrt77rv35

Title: Three records, each answering a different question
Russian title: Три записи, каждая отвечает на свой вопрос

Text:
A rule is bound to its implementation by three records:

- a SpecTag carrying the node's sid, on the symbol in the code that implements it;
- a SpecTag carrying the node's sid, declared by the test written from it where a run of the tests reports it;
- the node's `meta.code` and `meta.tests`, the lists of that code and those tests.

All three are written by hand. They must agree.

Reason:
Each record answers a different question. The SpecTag on a symbol says what the symbol implements. The SpecTag a test declares says which rule the test is written from. Reported by a run of the tests, it makes the run itself a report of which rules are covered. The lists say what implements a rule, to a reader who has the rule open.

The SpecTag on a symbol and the one a test declares take one form, since each binds the code or the test to a node by its sid. A reference in that form is told apart from a sid that is only mentioned.

Russian text:
(none yet)

Russian reason:
(none yet)

## 11.4 | drafted | from present 3.4 | s-qxpqtnbgmydusx2

Title: A rule whose code changes has a test
Russian title: У правила, чей код меняется, есть тест

Text:
A rule has at least one test where a commit adds or changes the code written for it. So does a node of a project's own NodeKind that needs code. Code generated from a node owes no test.

Reason:
A rule whose code has no test is carried out on trust. A change that leaves it so is refused where it is made, which is when a test costs least to write.

Code generated from a node is held by every commit to what the node produces (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3). So a test of its own would verify the generator rather than the system's code.

Russian text:
У правила есть хотя бы один тест, если коммит добавляет или меняет код, написанный для него. Так же и у узла собственного NodeKind проекта, которому нужен код. Код, сгенерированный из узла, теста не требует.

Russian reason:
Правило, у кода которого нет теста, выполняется на доверии. Изменение, которое оставляет его таким, отклоняется там, где его делают: тогда тест дешевле всего написать.

Код, сгенерированный из узла, каждый коммит держит в соответствии с тем, что даёт узел (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3). Поэтому собственный тест такого кода проверял бы генератор, а не код системы.

What changed against the present node:
- Заголовок новый.
- Текст — абзац 3 нынешнего 3.4, дословно.
- Обоснование — вторая и третья фразы абзаца 4 и абзац 3 нынешнего обоснования 3.4. «Both are refused where the change is made» → «A change that leaves it so is refused where it is made»: второй случай ушёл в 1.5.2. К ссылке на 11.1 добавлена ссылка на 11.2, где сказано об ожидании.
- По вашему решению основные правила не называют домены и RecordType.

## 11.5 | drafted | from present none | s-8xw4mgvpexyvw5q

Title: What a test's SpecTag names
Russian title: Что называет SpecTag теста

Text:
Every test carries the SpecTag of the node it is written from. That node is a rule or a node of a project's own NodeKind (§s-vsh384ybt4w25a2).

Reason:
A test verifies that the code carries out what a node requires. A term only introduces an entity, so it holds no behaviour to verify. A section requires nothing (§s-ef93u6cnbs2sevr).

Russian text:
Каждый тест связан SpecTag с узлом, из которого он написан. Этот узел — правило или узел собственного NodeKind проекта (§s-vsh384ybt4w25a2).

Russian reason:
Тест проверяет, что код выполняет то, что требует узел. Термин только вводит сущность, поэтому в нём нет поведения, которое можно проверить. Раздел ничего не требует (§s-ef93u6cnbs2sevr).

What changed against the present node:
- Новый узел: требование из абзаца о тестах нынешнего 3.4, вынесенное из заповеди 1.4.2.
- По вашему решению термин из перечисления убран: термин только вводит сущность.
- Обоснование новое, у каждого исключённого вида узла своя причина. Прошло рецензента.
- По вашему решению основные правила не называют домены и RecordType.

## 11.6 | drafted | from present 3.5 | s-ezq67wu75updp98

Title: A symbol that implements no rule says so
Russian title: Символ, который не реализует правила, говорит об этом

Text:
Some symbols implement none of the system's logic but are required by the technology the system is built with. Such a symbol carries a SpecTag that names no node and gives its reason. Examples are a module's re-exports and the glue a framework, a library or the infrastructure needs.

Reason:
Code that serves the technology the system is built with exists because of how the system is built, not because of what it does. So there is no rule for it to cite. Demanding one teaches people to attach whichever sid is nearest. Marking it explicitly keeps 'nobody gave it a SpecTag' apart from 'there is nothing for a SpecTag to name'.

Russian text:
Некоторые символы не реализуют никакой логики системы, но требуются технологией, на которой система построена. На таком символе стоит SpecTag, который не называет узла и даёт свою причину. Примеры — реэкспорты модуля и связующий код, нужный фреймворку, библиотеке или инфраструктуре.

Russian reason:
Код, который обслуживает технологию, на которой построена система, существует из-за того, как система построена, а не из-за того, что она делает. Поэтому у него нет правила, на которое он мог бы сослаться. Требование такого правила приучает ставить ближайший попавшийся sid. Явная пометка отделяет «никто не поставил ему SpecTag» от «SpecTag нечего называть».

What changed against the present node:
- Заголовок — вторая половина нынешнего заголовка 3.5.
- Текст — абзац 2 нынешнего 3.5, дословно, без «instead»: то, вместо чего, осталось в 1.5.2.
- Обоснование — абзац 2 обоснования 3.5, дословно.

## 11.7 | drafted | from present 3.5 | s-9j2mmnuuwmx5ksn

Title: Only changed code and changed tests must name an approved node
Russian title: Одобренный узел обязаны называть только изменённые код и тесты

Text:
Only a symbol whose code a commit changes must name an approved node. A change to its SpecTags is a change to its code. These change no code:
- rewording the rest of its comments;
- moving a citation onto another sid;
- renaming an identifier everywhere it is spelled.

A test a commit adds or changes carries the SpecTag of an approved node it is written from (§s-8xw4mgvpexyvw5q). Rewriting a test's reference to its node into another form that names the same node changes no test.

Reason:
A rule under revision is a draft while the code written against its earlier wording still stands. So only a symbol whose code changes must name an approved node. A comment reworded, a citation moved or a name changed everywhere it is spelled changes nothing the code does.

A SpecTag counts as code because it decides which node the code is held to. Were a change to it not counted, a SpecTag could be moved onto a draft node, or onto one the code does not implement, with nothing refusing it.

A rule under revision is a draft while the tests written against its earlier wording still stand. So only a test a commit adds or changes must name an approved node.

A reference rewritten into another form names the same node, so the test is held to nothing new. Counted as a change, it would refuse, at the commit rewriting it, every test whose node is under revision.

Russian text:
Называть одобренный узел обязан только символ, код которого коммит меняет. Изменение его SpecTag — это изменение его кода. Код не меняют:
- переформулировка остальных его комментариев;
- перенос ссылки на другой sid;
- переименование идентификатора везде, где он написан.

Тест, который коммит добавляет или меняет, связан SpecTag с одобренным узлом, из которого он написан (§s-8xw4mgvpexyvw5q). Переписать ссылку теста на его узел в другую форму, называющую тот же узел, — не значит изменить тест.

Russian reason:
Правило на пересмотре остаётся черновиком, пока стоит код, написанный по его прежней формулировке. Поэтому называть одобренный узел обязан только символ, код которого меняется. Переформулированный комментарий, перенесённая ссылка или имя, изменённое везде, где оно написано, не меняют ничего из того, что делает код.

SpecTag считается кодом, потому что он решает, какому узлу должен соответствовать код. Если бы его изменение не считалось, SpecTag можно было бы перенести на узел-черновик или на узел, который код не реализует, и ничто бы этого не отклонило.

Правило на пересмотре остаётся черновиком, пока стоят тесты, написанные по его прежней формулировке. Поэтому называть одобренный узел должен только тест, который коммит добавляет или меняет.

Ссылка, переписанная в другую форму, называет тот же узел, поэтому к тесту не предъявляется ничего нового. Если бы это считалось изменением, то при коммите, который переписывает ссылки, отклонялся бы каждый тест, чей узел на пересмотре.

What changed against the present node:
- Текст — абзац 3 нынешнего 3.5, вторая фраза абзаца 2 и абзац 4 нынешнего 3.4, дословно, кроме «of an approved one» → «of an approved node it is written from (§1.5.2)»: слова, к которым отсылало «one», остались в 1.5.2.
- Обоснование — абзацы 3–4 обоснования 3.5 и абзацы 5–6 обоснования 3.4, дословно.
- Ссылка о SpecTag теста теперь ведёт в 10.5, куда перенесён этот абзац.

## 11.8 | drafted | from present 3.2 | s-ef93u6cnbs2sevr

Title: A commit that changes code names the nodes it serves
Russian title: Коммит, меняющий код, называет узлы, которым служит

Text:
Every commit that changes code names, by its sid, each approved node whose implementation it adds or changes. This covers:
- a node whose text has just changed;
- an existing node the code contradicted.

Outside the tests, every SpecTag on a symbol the commit adds or changes names a node the commit's message names, or is the SpecTag that names none. The message names no section.

Reason:
The message and the SpecTags on the code name the same nodes so that the message says which nodes the commit serves. A section is refused because it requires nothing a change could serve.

Russian text:
Каждый коммит, меняющий код, называет по sid каждый одобренный узел, реализацию которого он добавляет или меняет. Сюда входят:
- узел, текст которого только что изменился;
- существующий узел, которому код противоречил.

Вне тестов каждый SpecTag на символе, который коммит добавляет или меняет, называет узел, названный в сообщении коммита, или это SpecTag, не называющий никакого узла. Сообщение не называет ни одного раздела.

Russian reason:
Сообщение и SpecTag на коде называют одни и те же узлы, чтобы сообщение говорило, каким узлам служит коммит. Раздел отклоняется, потому что не требует ничего, чему могло бы служить изменение.

What changed against the present node:
- Текст — абзацы 2–3 нынешнего 3.2, обоснование — его абзац 2, дословно.
- Сохраняет sid 3.2: на эту часть указывают проверки и ссылки о том, что раздел и заголовок домена ничего не требуют.
- По вашему решению основные правила не называют домены и RecordType.

## 11.9 | moves unchanged | from present 3.6 | s-6fw72j65jkqrfpf

Title: An approved rule is implemented or exempted
Russian title: Одобренное правило реализуется или освобождается

Text:
Every approved rule is implemented, and so is every approved node of a project's own NodeKind that needs code (§s-vsh384ybt4w25a2). Such a rule or node is implemented when both hold:
- a symbol of the system's code carries its SpecTag;
- a test carries its SpecTag and passes.

A SpecTag or a test naming a rule that implements such a rule or node counts for it. The implementing rule may implement it directly or through rules that implement those in turn.

The requirement to be implemented holds for every rule of the specification except those of:
- the SpecSheriff guidelines;
- the project's own guidelines;
- the technical debt (§s-2r7k2aeyusgy6fw).

A node of the project's own guidelines exempts a rule, or a node of a project's own NodeKind, from being implemented. It does so through an `exempts` link to that rule or node, or to a section it stands under (§s-sn6au3vcr9uy5pm). The exempting node gives the reason in its own text.

Reason:
An approved rule states what holds of the system it specifies: what the system does or how it is built. So an approved rule the system's code does not carry out leaves the specification stating what does not hold of the system.

A SpecTag shows where the code carries the rule out (§s-kgbzk2ph9e6jfb4). A test naming the rule shows that the code does what the rule says, but only while the test passes. Every test of the system's code must pass at a push while the specification is approved (§s-jau82aq9juv9zzh). Only both together show by a check that the code does what the rule says.

A SpecTag or a test of a rule implementing it counts, since an implementing rule is how the rule it implements is carried out (§s-sn6au3vcr9uy5pm).

The SpecSheriff guidelines are carried out by the tools and the skills that apply them, never by code a SpecTag binds. A project does not hold that code. The repository writing the guidelines keeps it out of the system's code by where it lives (§s-hheus6f395ynqvc).

A project's own guidelines hold what only its specification needs (§s-bsya3febm6u64ab). They are carried out by those tools and skills and by people, not by the system's code. A rule of the technical debt describes a problem set aside, which is not required of the system and goes once it is solved (§s-2r7k2aeyusgy6fw).

A rule the system's code cannot carry out, or that no test can verify, would be reported for as long as it stands. So such a rule is exempted. The exemption is a node, which one of its owners approves with its reason.

Russian text:
(none yet)

Russian reason:
(none yet)

## 12.1 | drafted | from present 1.1 | s-kh8qcd5kxgh9z3j

Title: What is generated from the nodes is regenerated and never edited
Russian title: То, что генерируется из узлов, генерируется заново и никогда не редактируется

Text:
Whatever is generated from the nodes — a readable export (for example, in markdown), the map, the instructions an agent reads — is regenerated after every change to them, unless it waits for them (§s-qyjw8xez6t6adc3). It is never edited. Nothing is ever read back from it into the specification.

Where a generated copy is kept, it is checked against what the nodes produce, unless it waits.

Reason:
A copy that is edited, fed back into the nodes or left behind them would be a second version of the rules. Sooner or later one version would change and the other would not. Whoever read the unchanged one would then implement a rule that no longer holds.

A readable copy is needed all the same, because a structure a schema can check is hard for a person to read. Regenerated by the tools at every change and checked against the nodes, a copy is a view of the one source rather than a second one.

Russian text:
Всё, что генерируется из узлов: читаемый экспорт (например, в markdown), карта, инструкции, которые читает агент. Всё это генерируется заново после каждого изменения узлов, если только оно не ждёт их (§s-qyjw8xez6t6adc3). Оно никогда не редактируется. Ничто из этого никогда не переносится обратно в спецификацию.

Сгенерированная копия, которая хранится, сверяется с тем, что дают узлы, если только она не ждёт.

Russian reason:
Копия, которую редактируют, переносят обратно в узлы или оставляют отставать от них, была бы второй версией правил. Рано или поздно одна версия изменилась бы, а другая нет. Тогда тот, кто прочёл неизменённую, реализовал бы правило, которое больше не действует.

Читаемая копия тем не менее нужна, потому что структуру, которую может проверить схема, человеку трудно читать. Копия, которую инструменты генерируют заново при каждом изменении и сверяют с узлами, — это представление единственного источника, а не второй источник.

What changed against the present node:
- Заголовок новый.
- Текст — абзацы 2 и 4 нынешнего 1.1, дословно, и вставка «unless it waits for them (§11.2)» в первую фразу: исключение, которое ушло в 11.2, названо в правиле, которое оно сужает.
- Обоснование — абзацы 1–2 нынешнего обоснования 1.1, дословно.
- Сохраняет sid 1.1: на копии указывают шесть ссылок из девяти и тест экспорта. Три ссылки об ожидании, из 10.4, 11.4 и описания хуков, перейдут на 11.2.

## 12.2 | drafted | from present 1.1 | s-qyjw8xez6t6adc3

Title: Code generated from the nodes waits for their approval
Russian title: Код, сгенерированный из узлов, ждёт их одобрения

Text:
What is generated from the nodes into the system's code — its types and RuntimeChecks (§s-e877bnfa559tvk9), and what a project's own generators write (§s-km4x4s26kv7pjze) — waits for its nodes. It is regenerated only once every node it is generated from is approved. Until then, no commit changes it.

Reason:
Code generated from a node is part of the system. Regenerated from a draft node, it would implement what none of the node's owners has approved (§s-utvqbypzhmgndug). Waiting, it lets a change to the node be committed before its approval, as a change to any rule is. Since no commit changes it meanwhile, it is still never edited (§s-kh8qcd5kxgh9z3j).

A copy that waits is left behind its nodes only until every one of them is approved. Meanwhile its lag is reported (§s-jau82aq9juv9zzh), so that nobody takes it for current.

Russian text:
То, что генерируется из узлов в код системы: её типы и RuntimeChecks (§s-e877bnfa559tvk9), а также то, что пишут собственные генераторы проекта (§s-km4x4s26kv7pjze), — ждёт своих узлов. Оно генерируется заново только тогда, когда одобрен каждый узел, из которого оно генерируется. До тех пор ни один коммит его не меняет.

Russian reason:
Код, сгенерированный из узла, — часть системы. Если сгенерировать его заново из узла-черновика, он реализует то, чего не одобрил ни один из ответственных за узел (§s-utvqbypzhmgndug). Пока такой код ждёт, изменение узла можно закоммитить до одобрения узла, как изменение любого правила. Поскольку ни один коммит тем временем код не меняет, он по-прежнему никогда не редактируется (§s-kh8qcd5kxgh9z3j).

Ждущая копия отстаёт от своих узлов только до тех пор, пока не одобрен каждый из них. Тем временем о её отставании сообщается (§s-jau82aq9juv9zzh), чтобы никто не принял её за актуальную.

What changed against the present node:
- Заголовок новый.
- Текст — абзац 3 нынешнего 1.1, дословно, кроме убранного «instead»: противопоставление с соседним абзацем ушло вместе с ним.
- Обоснование — абзацы 3–4 нынешнего обоснования 1.1, дословно. К «it is still never edited» добавлена ссылка на 11.1, где это сказано.
- Новый sid; тест генерируемых типов перейдёт сюда.

## 12.3 | moves unchanged | from present 5.6 | s-km4x4s26kv7pjze

Title: A project's own generators join the shared one
Russian title: Собственные генераторы проекта присоединяются к общему

Text:
A project's own guidelines may add generators of code. They are listed in a rule of theirs refining this one, with what each writes from which nodes. A project's generator writes the same from the same nodes. What it writes waits for that rule as for the nodes it is written from (§s-kh8qcd5kxgh9z3j).

Reason:
Code generated from a project's own NodeKinds and properties is written by no generator of the SpecSheriff guidelines. A copy is checked against what its nodes produce only where the same nodes always produce the same. Code from a generator whose rule is a draft implements what nobody approved (§s-utvqbypzhmgndug).

Russian text:
(none yet)

Russian reason:
(none yet)

## 12.4 | moves unchanged | from present 4.1 | s-zu8ne3wq84zchc4

Title: The map is a mindmap of the specification
Russian title: Карта — это mindmap спецификации

Text:
The map is the specification seen from above. It is a mindmap drawn from the nodes each time it is built. It holds no fact of its own.

The map shows the structure and the status of each node, and nothing else. The structure is a domain, the parts under it, then the rules, down to the individual rule. It is drawn from the nesting, the titles and the level of each domain alone.

A branch opens and closes, so a reader goes to the part they came for while the whole stays in view around it.

The branches stand in this order:
- the guidelines first;
- then contracts;
- then a branch for each level of the domains, from the top, holding its domains in the order §s-uw9n84edf7cbe9n gives;
- the technical appendix last.

Reason:
A specification is read one rule at a time and has to be understood as a whole. The two pull against each other. The full text is more than anyone holds at once. An extract loses where the rule sits.

A mindmap answers both: the shape of everything, and the detail of whatever is opened.

A diagram kept apart from the nodes is a second copy of the specification and disagrees with it silently. So the map is drawn from the nodes at each build rather than kept beside them.

The levels and the order of the domains carry how the domains bear on one another. Shown on the map, the statuses tell which parts of the specification wait for their owners while the whole stays in view.

Russian text:
(none yet)

Russian reason:
(none yet)

## 13.1 | drafted | from present 5.1 | s-jau82aq9juv9zzh

Title: What is checked, when, and what a failure costs
Russian title: Что проверяется, когда и чего стоит отказ

Text:
Every check, with what its failure costs, is a row of the tables below.

Each check reads the commit being made, and the history behind it where its row says so. It never reads what the commit does not hold.

A check refuses unless its row says otherwise.

[The two tables, "The specification on its own" and "The specification and the code", as they stand.]

Reason:
A person asking whether a commit will go through must find the whole answer in one place. Spread across several rules, the answer comes apart, and one rule ends up contradicting another without anybody seeing it.

A check reads the commit being made, because a judgement of anything else would pass or refuse what is not being committed.

A rule outrunning its tests or its code, or tests outrunning the code, is drift worth knowing about, and not the fault of whoever's commit found it. So the check of drift only reports. An approved rule not implemented is reported rather than refused, since a rule is approved before its test and its code are written (§s-rah8b37kytb682y).

A symbol or a test without a SpecTag that a commit leaves alone while the specification is a draft is reported for the reason §s-kkbqcb9xrpaepwn gives.

Russian text:
Каждая проверка вместе с тем, чего стоит её отказ, — строка таблиц ниже.

Каждая проверка читает делаемый коммит, а там, где так сказано в её строке, — и историю за ним. Она никогда не читает того, чего в коммите нет.

Проверка отклоняет, если её строка не говорит иного.

[Две таблицы, «Спецификация сама по себе» и «Спецификация и код», без изменений.]

Russian reason:
Человек, который спрашивает, пройдёт ли коммит, должен найти весь ответ в одном месте. Разнесённый по нескольким правилам, ответ распадается, и одно правило начинает противоречить другому, а никто этого не видит.

Проверка читает делаемый коммит, потому что суждение о чём-то другом пропустило бы или отклонило то, что не коммитится.

Правило, обогнавшее свои тесты или код, или тесты, обогнавшие код, — это расхождение, о котором стоит знать, и не вина того, чей коммит его обнаружил. Поэтому проверка расхождения только сообщает. Одобренное правило, которое не реализовано, сообщается, а не отклоняется, поскольку правило одобряют до того, как написаны его тест и код (§s-rah8b37kytb682y).

Символ или тест без SpecTag, которые коммит не трогает, пока спецификация — черновик, сообщаются по причине, которую даёт §s-kkbqcb9xrpaepwn.

What changed against the present node:
- Заголовок — нынешний 5.1.
- Текст — новая первая фраза, вводящая таблицы, затем абзацы 3–4 нынешнего 5.1 и обе таблицы, дословно.
- Обоснование — абзацы 1 и 4, первая фраза абзаца 3 и первые две фразы абзаца 5 нынешнего обоснования, дословно. Последняя фраза абзаца 5 ушла в 1.6.1.
- Сохраняет sid 5.1.
- По вашему решению основные правила не называют домены и RecordType.

## 13.2 | moves unchanged | from present 5.2 | s-kkbqcb9xrpaepwn

Title: Code and tests without a SpecTag while the specification is a draft
Russian title: Код и тесты без SpecTag, пока спецификация — черновик

Text:
A symbol of the system's code outside its tests, or a test, that carries no SpecTag is reported rather than refused where all of these hold:
- the project's specification is a draft;
- the commit does not change the symbol or the test.

Reason:
A project taking up the method holds code and tests written before its rules. Its rules are approved only as its owners review them. A SpecTag added to a symbol, or to a test that named no node, is a change that must then name an approved node (§s-kgbzk2ph9e6jfb4, §s-rah8b37kytb682y). Refusing every symbol and test without one would refuse every commit, the project's setup included, until all of them had their rules.

While the specification is a draft, the work is above all on the specification, the code and the tests secondary in it.

Only what a commit leaves alone is relieved. So no draft node is implemented, and every change to code is reviewed.

Russian text:
(none yet)

Russian reason:
(none yet)

## 13.3 | moves unchanged | from present 5.3 | s-xhcmchcngykvn2k

Title: Tests at a push while the specification is a draft
Russian title: Тесты при push, пока спецификация — черновик

Text:
While a project's specification is a draft, neither the tests of the system's code nor those of the project's own checks and generators are run at a push.

Reason:
While the specification is a draft, the work is above all on the specification, the code and the tests secondary in it. A push that waited for every test would slow that work. The tests of the project's own checks and generators go with those of the system's code, since a push runs them together (§s-jau82aq9juv9zzh).

Russian text:
(none yet)

Russian reason:
(none yet)

## 13.4 | moves unchanged | from present 5.4 | s-qzthyh7yqvfhsa2

Title: The specification's status is its owners' act
Russian title: Статус спецификации — решение её ответственных

Text:
A rule of the project's own guidelines refining this one states that the specification is approved. The specification is approved while that rule is approved, and a draft otherwise. Only the specification's owners approve that rule or withdraw its approval.

A commit that makes a draft specification approved is refused unless every symbol of the system's code outside its tests, and every test, carries a SpecTag. A commit that puts the specification back to draft is refused unless it records one of the specification's owners withdrawing the approval of that rule.

Reason:
Whether the specification is approved decides how strictly the checks hold its code and tests (§s-kkbqcb9xrpaepwn, §s-xhcmchcngykvn2k). So its owners decide it, both ways.

They must be able to put it back to draft, whatever leads them to it. While the specification changes at its core, as when another version of it is adopted or the system's architecture changes, the code and the tests are secondary.

Approved while code or tests carry no SpecTag, the specification would refuse the next commit for code or tests that commit did not touch.

Anyone could put its rule back to draft by an edit of its wording, or remove it. So only a withdrawal by one of the specification's owners puts the specification back.

Russian text:
(none yet)

Russian reason:
(none yet)

## 13.5 | moves unchanged | from present 5.5 | s-2fau85dfyyeq66m

Title: A project's own checks join the shared ones
Russian title: Собственные проверки проекта присоединяются к общим

Text:
A project's own guidelines may add checks. They are listed in a rule of theirs refining this one, with what each checks and what a failure costs. Each counts among the checks of §s-jau82aq9juv9zzh:
- it is held to all §s-jau82aq9juv9zzh says of a check;
- it runs wherever those checks run;
- it refuses unless the rule listing it says it reports.

Reason:
A project's own NodeKinds and properties carry requirements no check of the SpecSheriff guidelines knows. A project's check runs where the shared checks run and is held to what they are held to. So it holds every participant as they do, rather than resting on whoever remembers to run it.

Listed in one rule, the project's part of whether a commit goes through stands in one place. What a failure costs is approved there by one of the specification's owners (§s-67vekyup7y8smap).

Russian text:
(none yet)

Russian reason:
(none yet)

## 13.6 | moves unchanged | from present 5.7 | s-sfjka4zc4rhfu67

Title: A project's own checks and generators are tested against the rule listing them
Russian title: Собственные проверки и генераторы проекта тестируются по правилу, которое их перечисляет

Text:
Every test of a project's own check or generator carries the SpecTag of the rule listing it (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze). The test is written before the code it tests. A test a commit adds or changes carries that SpecTag only once the rule is approved. Each such check or generator whose code a commit adds or changes has a test carrying it.

Reason:
A test is all that holds a project's check or generator to its rule. The code of the repository's tools is not the system's code and carries no SpecTag (§s-hheus6f395ynqvc). What a generator writes owes no test (§s-rah8b37kytb682y), and it is withheld from the reviewer (§s-nyh9yk22ba6g77q).

The rule listing a check or generator says what it checks or writes, so its tests verify that rule. A test written first tests that rule rather than what the code happened to do. A test carrying the SpecTag of a draft rule would have the code implement what nobody approved (§s-utvqbypzhmgndug).

Russian text:
(none yet)

Russian reason:
(none yet)

## 13.7 | moves unchanged | from present 5.8 | s-pcnyfp7gev7syax

Title: At a commit and at a push, the project's own tools run after the SpecSheriff tools
Russian title: При коммите и push собственные инструменты проекта работают после инструментов SpecSheriff

Text:
At a commit and at a push, the SpecSheriff tools run their checks first, and the project's own tools that run at that moment run after them. The project's own checks run among the checks of the SpecSheriff tools, not after them (§s-2fau85dfyyeq66m).

The project's tools run whatever the checks find. They also run where the SpecSheriff tools cannot run.

The commit or the push goes through only where the checks and each of the project's tools pass. None of the project's tools changes what the commit holds.

Reason:
A project may run tools of its own at a commit or a push, such as a scan that nothing internal reaches a public repository. The method governs the specification and the code bound to it (§s-efe2cmw9asrbt2g). A tool guarding anything else is the project's own concern. Taking up the method must not stop it.

Such a tool makes no check of the method, so the table of checks does not list it. The SpecSheriff tools run first, since the project's tools may extend their checks but never override them. A tool that changed the commit would let through what no check read.

Russian text:
(none yet)

Russian reason:
(none yet)

## 13.8 | moves unchanged | from present 5.9 | s-6hha5en226aj8hu

Title: The fixtures of a check's tests are left out of the checks of citations and locations
Russian title: Fixtures тестов проверки не участвуют в проверках ссылок и расположений

Text:
The checks of citations and locations outside the specification leave out the files listed as fixtures of tests. The list is kept in a rule of the project's own guidelines that refines this one. It names only the fixtures of the tests of a check that reads citations or locations.

Reason:
Such a test feeds its check a file holding a sid or a location as data, not as a citation of a node. A test of any other check has no use for such a file, so the list holds no other. Listed in one rule of the project's own guidelines, the files left out are approved by one of the specification's owners (§s-67vekyup7y8smap) rather than set in the settings.

Russian text:
(none yet)

Russian reason:
(none yet)

## 13.9 | moves unchanged | from present 5.10 | s-nyh9yk22ba6g77q

Title: The reviewer sees only the change and the nodes it names
Russian title: Рецензент видит только изменение и узлы, которые оно называет

Text:
The independent reviewer of a commit is given the following, and nothing of the session that wrote the code:
- the commit's change, less the files generated from the specification;
- the text and the reason of the nodes the commit's message and the SpecTags on its symbols outside the tests name;
- for such a node that is a RecordType, also `RecordType.fields`;
- for such a node of a project's own NodeKind, also the properties its NodeKind declares (§s-vsh384ybt4w25a2).

Each file left out is named to the reviewer as holding one of these, which the check of the generated copies compares with what the nodes produce:
- the types and RuntimeChecks generated from the RecordTypes;
- what a project's generator wrote from the nodes it names (§s-km4x4s26kv7pjze).

The reviewer refuses the commit where the code does something no named node's text states, or leaves out what one requires. It counts as carried out:
- what a RecordType requires, by the types and RuntimeChecks generated from it (§s-e877bnfa559tvk9);
- what the rule listing a project's generator says it writes, by what that generator wrote.

The reviewer names the node and the line of each finding.

A review that cannot be held — no reviewer to run, a run that does not end, an answer that cannot be read — refuses the commit and says why.

Reason:
Given nothing of the session that wrote the code, the reviewer reads the code against the nodes rather than against its author's intent. A refusal naming the node and the line can be checked by anyone. A node's reason says what its rule protects, which tells the reviewer how to read a case its text leaves open.

The generated files are left out because the check of the generated copies already compares them with what the nodes produce. So what a RecordType requires is decided there rather than judged. A reviewer judges what a commit leaves out only from what it is shown. So a file withheld from it, or one whose content it is not told is held elsewhere, reads to it as missing.

A review that passes whenever it could not be held is a review nobody can rely on.

Russian text:
(none yet)

Russian reason:
(none yet)

## 13.10 | moves unchanged | from present 5.11 | s-jsqxdx47wkkj7gp

Title: A procedure that writes the specification is idempotent
Russian title: Процедура, которая пишет спецификацию, идемпотентна

Text:
Every procedure that writes the specification, or what is generated from it, is idempotent. Run again on what its previous run left, it gives the same result and changes nothing, so running it again is always safe.

A procedure needed only once, such as bringing existing documents into the model, is removed once it is done, because it is idempotent only on the state of the specification it was written for.

Reason:
Whoever works on the specification may run such a procedure at any time, by hand or as part of a check, without knowing whether it has run before. One whose second run changed anything would damage the specification the next time it ran. A procedure written for one state of the specification can damage a later one.

Russian text:
(none yet)

Russian reason:
(none yet)

## 13.11 | drafted | from present 5.12 | s-epaw9sgyaajzn8g

Title: Where an agent writes, the checks run at each of its edits
Russian title: Где пишет агент, проверки запускаются при каждой его правке

Text:
Where an agent writes the specification, the tests or the code, the checks of the specification and of the code run after each of its edits. What they refuse is reported to the agent.

Reason:
An agent told of a refusal at the edit that caused it mends it there, rather than at the commit among every other.

Russian text:
Где агент пишет спецификацию, тесты или код, проверки спецификации и кода запускаются после каждой его правки. То, что они отклоняют, сообщается агенту.

Russian reason:
Агент, которому сообщили об отказе при той правке, которая его вызвала, исправляет его там, а не при коммите среди всех остальных.

What changed against the present node:
- Заголовок нынешнего 5.12, дословно.
- Текст — абзац 1 нынешнего 5.12, дословно.
- Обоснование — абзац 1 нынешнего обоснования, дословно.
- Новый sid: нынешний sid 5.12 остаётся у 12.12. Сюда перейдут тест хуков о проверках после правки агента и ссылка из docs/README.md о проверках при каждой правке агента. Хуки в tools.json (3, 6, 14, 16) получат связь implements и с этим узлом.

## 13.12 | drafted | from present 5.12 | s-83ev4wwesbwnhnp

Title: An agent's edit is judged before it is made
Russian title: Правку агента оценивают до того, как она сделана

Text:
Before an agent's edit is made, it is refused where it would do any of these:
- leave a node approved over a wording for which no approval stands (§s-5ah25f6gy99panq), a section left out;
- change the code written for a rule, or for a node of a project's own NodeKind that needs code (§s-vsh384ybt4w25a2), that no test carries the SpecTag of (§s-rah8b37kytb682y);
- change the code of a project's own check or generator while no test carries the SpecTag of the rule listing it (§s-sfjka4zc4rhfu67);
- change the approvals otherwise than through the procedure that records an approval or withdraws one.

Reason:
A node is approved by one of its owners, or in that owner's name by the agent working for them where its change states nothing new (§s-t5uw8zfxzhfdg86). So an agent that could set a status, or write an approval itself, could approve what none of its owners agreed to. Every later check takes the approvals as given, so they can be held only where they are written.

The procedure that records an approval takes the wording the node already holds. It refuses an approval by anyone who is none of the node's owners. A withdrawal only makes a node a draft.

A commit holds a test and its code together whichever was written first, so the order of the work can be held only where the edits are made.

Russian text:
Прежде чем правка агента сделана, она отклоняется, если сделала бы что-то из этого:
- оставила бы узел одобренным при формулировке, на которую нет одобрения (§s-5ah25f6gy99panq), кроме раздела;
- изменила бы код, написанный для правила или для узла собственного NodeKind проекта, которому нужен код (§s-vsh384ybt4w25a2), если ни один тест не использует его SpecTag (§s-rah8b37kytb682y);
- изменила бы код собственной проверки или генератора проекта, пока ни один тест не использует SpecTag правила, которое его перечисляет (§s-sfjka4zc4rhfu67);
- изменила бы одобрения иначе, чем через процедуру, которая записывает одобрение или отзывает его.

Russian reason:
Узел одобряет один из его ответственных или от имени этого ответственного агент, который на него работает, если изменение узла не говорит ничего нового (§s-t5uw8zfxzhfdg86). Поэтому агент, который мог бы выставить статус или сам записать одобрение, мог бы одобрить то, с чем не согласился ни один из ответственных. Каждая следующая проверка принимает одобрения как данность, поэтому удержать их можно только там, где их пишут.

Процедура, которая записывает одобрение, берёт формулировку, которую узел уже содержит. Она отклоняет одобрение того, кто не входит в число ответственных за узел. Отзыв только делает узел черновиком.

Коммит держит тест и его код вместе, что бы ни было написано первым, поэтому порядок работы можно удержать только там, где делаются правки.

What changed against the present node:
- Заголовок новый, как у правила tools.json о правке, которую оценивают до того, как она сделана.
- Текст — абзац 2 нынешнего 5.12, кроме начала: «Before an edit is made» стало «Before an agent's edit is made», потому что узел читается отдельно от 12.11.
- Обоснование — абзацы 2–4 нынешнего обоснования, дословно. Ссылка об одобрении от имени ответственного ведёт теперь на 9.4, куда ушло это правило.
- Сохраняет sid 5.12: на эту часть указывают шесть тестов отказов из семи, проверка правки до того, как она сделана, в tools.json и запись одобрения.
- По вашему решению основные правила не называют домены и RecordType.
