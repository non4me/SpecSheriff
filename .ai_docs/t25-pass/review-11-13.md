# The reviewer's report on sections 11 to 13 (2026-11-10), applied section by section

The rows of the tables of checks stay in English only: the drafts and the page hold only a placeholder for them.

**Verdict: passes after the fixes below. Three doubts go to the owner, at 11.2, 11.6 and 13.11.** This covers 30 nodes with ready text, so it runs past my usual 300 words for one rule. Russian is given only where the input holds one. No term needs a rename or a gloss here.

## Section 11

**11.1** WORDING FIX, title: "What counts as the system's code" / «Что считается кодом системы».
CUT, reason: "The rules binding code to the specification hold only the system's code, not what serves the work on it. Where a file lives reads the same to every check, so it draws that line."

**11.2** DELETE. It names no subject, no check can catch a breach, and it binds a person's habit ("A rule names the component that carries it out").
DOUBT: this loses a sentence of present 1.8, so the owner decides. I recommend deleting. If kept: "One of a section's owners reads a top-level section of the base specification whole before its implementation begins." / «Один из ответственных за раздел читает раздел верхнего уровня базовой спецификации целиком до начала его реализации.»

**11.3** WORDING FIX, title: "The records binding a rule to its implementation" / «Записи, связывающие правило с его реализацией».
Text (drops the count, and the node/rule mix):
"A rule is bound to its implementation by these records:
- a SpecTag carrying the rule's sid, on the symbol in the code that implements the rule;
- a SpecTag carrying the rule's sid, on the test written from the rule, where a run of the tests reports it;
- the rule's `meta.code` and `meta.tests`, the lists of that code and those tests.

All of them are written by hand. They must agree."

CUT, reason: "Each record answers a different question: what a symbol implements, which rule a test is written from, and, to a reader with the rule open, what implements it."

**11.4** CUT, reason:
EN: "A rule whose code has no test is carried out on trust. The change that leaves it so is when a test costs least to write. Generated code is already held by every commit to what its node produces (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3)."
RU: «Правило, у кода которого нет теста, выполняется на доверии. Изменение, которое оставляет его таким, — момент, когда тест дешевле всего написать. Сгенерированный код и так каждый коммит держит в соответствии с тем, что даёт его узел (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).»

**11.5** WORDING FIX, text. "Every test" also catches tests of a project's other tools, which carry no SpecTag.
EN: "Every test of the system's code carries the SpecTag of the node it is written from. That node is a rule or a node of a project's own NodeKind (§s-vsh384ybt4w25a2)."
RU: «Каждый тест кода системы связан SpecTag с узлом, из которого он написан. Этот узел — правило или узел собственного NodeKind проекта (§s-vsh384ybt4w25a2).»
In the reason, both languages: §s-ef93u6cnbs2sevr becomes §s-7445ahgjck2aefg, the node that says a section requires nothing.

**11.6** WORDING FIX, text (main thought first):
EN: "A symbol required only by the technology the system is built with carries a SpecTag that names no node and gives its reason. Such a symbol implements none of the system's logic. Examples are a module's re-exports and the glue a framework, a library or the infrastructure needs."
RU: «На символе, который нужен только технологии, на которой построена система, стоит SpecTag, который не называет узла и даёт свою причину. Такой символ не реализует никакой логики системы. Примеры — реэкспорты модуля и связующий код, нужный фреймворку, библиотеке или инфраструктуре.»
DOUBT: nothing says what counts as a valid reason, and `review.ts:59` refuses such a SpecTag only on code holding logic. I recommend "and names what the technology requires of it" / «и называет, что требует от него технология».

**11.7** SPLIT. The symbol and the test are carried out apart.
- *Keeps the sid.* Title: "Only code a commit changes must name an approved node" / «Одобренный узел обязан называть только код, который меняет коммит». Text: paragraph 1 as it stands.
 Reason EN: "A rule under revision is a draft while the code written against its earlier wording still stands. So only code a commit changes can be held to an approved node. A SpecTag counts as code because it decides which node the code is held to."
 Reason RU: «Правило на пересмотре остаётся черновиком, пока стоит код, написанный по его прежней формулировке. Поэтому к одобренному узлу можно привязать только код, который меняет коммит. SpecTag считается кодом, потому что он решает, какому узлу должен соответствовать код.»
- *New sid.* Title: "A test a commit adds or changes names an approved node" / «Тест, который коммит добавляет или меняет, называет одобренный узел». Text: paragraph 2 as it stands.
 Reason EN: "A rule under revision is a draft while the tests written against its earlier wording still stand. So only a test a commit adds or changes is held to an approved node. A reference rewritten into another form holds the test to nothing new."
 Reason RU: «Правило на пересмотре остаётся черновиком, пока стоят тесты, написанные по его прежней формулировке. Поэтому одобренный узел должен называть только тест, который коммит добавляет или меняет. Ссылка, переписанная в другую форму, не предъявляет к тесту ничего нового.»

**11.8** WORDING FIX, first sentence:
EN: "The message of every commit that changes code names, by its sid, each approved node whose implementation the commit adds or changes."
RU: «Сообщение каждого коммита, меняющего код, называет по sid каждый одобренный узел, реализацию которого коммит добавляет или меняет.»
Reason (the present one is circular):
EN: "The message tells the reader of the history and the reviewer (§s-nyh9yk22ba6g77q) which rules a change to the code carries out. A section requires nothing a change could carry out."
RU: «Сообщение говорит читающему историю и рецензенту (§s-nyh9yk22ba6g77q), какие правила выполняет изменение кода. Раздел не требует ничего, что изменение могло бы выполнить.»

**11.9** SPLIT and WORDING FIX. The present text contradicts agreed 1.3.2, and "rule of the technical debt" contradicts key 4.4.
- *Keeps the sid.* Title: "An approved rule is implemented" / «Одобренное правило реализуется».
 Text: "While the specification is approved, every approved rule is implemented, and so is every approved node of a project's own NodeKind that needs code (§s-vsh384ybt4w25a2). Such a rule or node is implemented when both hold:
 - a symbol of the system's code carries its SpecTag;
 - a test carries its SpecTag and passes.

 A SpecTag or a test naming a rule that implements such a rule or node counts for it. The implementing rule may implement it directly or through rules that implement those in turn.

 This does not hold for:
 - the rules of the SpecSheriff guidelines;
 - the rules of the project's own guidelines;
 - the descriptions of shortcomings in the technical debt (§s-2r7k2aeyusgy6fw);
 - a rule or node exempted from being implemented (§<new sid>)."

 Reason: "An approved rule the system's code does not carry out leaves the specification stating what does not hold of the system. Only a symbol and a passing test together show by a check that the code does what the rule says. The guidelines and the technical debt state nothing the system's code must do."
- *New sid.* Title: "A project's own guidelines may exempt a rule from being implemented" / «Собственные guidelines проекта могут освободить правило от реализации». Text: paragraph 4 as it stands.
 Reason: "A rule the system's code cannot carry out, or that no test can verify, would be reported for as long as it stands. Made a node, the exemption is approved with its reason by one of that node's owners."

## Section 12

**12.1** WORDING FIX, text:
EN: "Whatever is generated from the nodes is regenerated after every change to them. That covers:
- a readable export, for example in markdown;
- the map;
- the instructions an agent reads.

What is generated into the system's code waits for the approval of its nodes instead (§s-qyjw8xez6t6adc3).

What is generated is never edited. Nothing is ever read back from it into the specification.

Where a generated copy is kept, it is checked against what the nodes produce, unless it waits."

RU: «Всё, что генерируется из узлов, генерируется заново после каждого изменения узлов. Сюда входят:
- читаемый экспорт, например в markdown;
- карта;
- инструкции, которые читает агент.

То, что генерируется в код системы, вместо этого ждёт одобрения своих узлов (§s-qyjw8xez6t6adc3).

Сгенерированное никогда не редактируется. Ничто из него никогда не переносится обратно в спецификацию.

Сгенерированная копия, которая хранится, сверяется с тем, что дают узлы, если только она не ждёт.»

CUT, reason:
EN: "A copy that is edited, fed back into the nodes or left behind them would be a second version of the rules. Whoever read the stale version would implement a rule that no longer holds. Regenerated at every change, a readable copy stays a view of the one source."
RU: «Копия, которую редактируют, переносят обратно в узлы или оставляют отставать от них, была бы второй версией правил. Тот, кто прочёл устаревшую версию, реализовал бы правило, которое больше не действует. Читаемая копия, которую генерируют заново при каждом изменении, остаётся представлением единственного источника.»

**12.2** MOVE TO PART 14: RuntimeChecks and the citation of s-e877bnfa559tvk9 leave. 14.3.3 gains "They wait for their RecordTypes as §s-qyjw8xez6t6adc3 says."
Text EN: "What is generated from the nodes into the system's code waits for those nodes. It is regenerated only once every node it is generated from is approved. Until then, no commit changes it. This covers what a project's own generators write (§s-km4x4s26kv7pjze)."
Text RU: «То, что генерируется из узлов в код системы, ждёт этих узлов. Оно генерируется заново только тогда, когда одобрен каждый узел, из которого оно генерируется. До тех пор ни один коммит его не меняет. Сюда входит то, что пишут собственные генераторы проекта (§s-km4x4s26kv7pjze).»
CUT, reason EN: "Regenerated from a draft node, code would implement what none of the node's owners has approved (§s-utvqbypzhmgndug). Waiting lets a change to the node be committed before its approval, as a change to any rule is."
Reason RU: «Сгенерированный заново из узла-черновика, код реализовал бы то, чего не одобрил ни один из ответственных за узел (§s-utvqbypzhmgndug). Ожидание позволяет закоммитить изменение узла до его одобрения, как и изменение любого правила.»

**12.3** WORDING FIX, title (no shared generator stays among the main rules): "A project's own generators of code" / «Собственные генераторы кода проекта». In the text: §s-kh8qcd5kxgh9z3j becomes §s-qyjw8xez6t6adc3.

**12.4** MOVE TO PART 14. A node there with an `overrides` link takes the level branches, each domain's place and the order, citing §s-nkyty4dy9x2v2a4, since §s-uw9n84edf7cbe9n goes to the archive.
Text: "The map is the specification seen from above. It is a mindmap drawn from the nodes each time it is built. It holds no fact of its own.

The map shows the structure of the specification and the approval status of each node, and nothing else. It is drawn from the nesting and the titles alone.

A branch opens and closes, so a reader goes to the part they came for while the whole stays in view around it.

The branches stand in this order:
- the guidelines first;
- then contracts;
- then the other sections of the base specification;
- the technical appendix last."

CUT, reason: "A specification is read one rule at a time and has to be understood as a whole. A mindmap gives both: the shape of everything and the detail of whatever is opened."

## Section 13

**13.1** WORDING FIX, title ("when" has left for 1.6.1): "The table of checks, with what each failure costs" / «Таблица проверок и цена отказа каждой из них».
Paragraph 2, which does not hold after an edit (tools/6):
EN: "Each check reads the change being made: the commit or, after an agent's edit, the working tree's difference from the last commit. It also reads the history behind that change where its row says so. It never reads what that change does not hold."
RU: «Каждая проверка читает вносимое изменение: коммит или, после правки агента, отличие рабочего дерева от последнего коммита. Историю за этим изменением она читает там, где так сказано в её строке. Она никогда не читает того, чего в этом изменении нет.»
CUT "A check refuses unless its row says otherwise.", which 1.6.1 and every row already say.
CUT, reason:
EN: "A person asking whether a commit will go through must find the whole answer in one place. Spread across several rules, the answer comes apart, and one rule ends up contradicting another without anybody seeing it. A failure a commit did not cause is reported rather than refused, since it is not the fault of whoever's commit found it."
RU: «Человек, который спрашивает, пройдёт ли коммит, должен найти весь ответ в одном месте. Разнесённый по нескольким правилам, ответ распадается, и одно правило начинает противоречить другому, а никто этого не видит. Сбой, которого коммит не вызывал, сообщается, а не отклоняется, потому что это не вина того, чей коммит его обнаружил.»

Rows, in English only, since no Russian of the table exists in the drafts.

Rows that stay, reworded:
- Every node outside the SpecSheriff guidelines a project takes, a section left out, is approved only where the latest record for it and its wording's fingerprint is an approval
- The status of each section is the one the nodes under it produce
- A node a commit removes, outside the SpecSheriff guidelines a project takes, is deleted where it is a section or no approval of it was ever given, and otherwise stands in the archive with the reason for its removal
- No approved node, and no section, sets three words or more running in capitals outside a name quoted from the code
- Every node of the technical appendix but a section, outside the sections of the stack and of the technical debt, implements a node of the base specification
- Every section of the technical appendix but those of the stack and of the technical debt stands under the title of a top-level section of the base specification
- Every rule of the appendix of the tools (§s-uxtyyen92jygth4) implements a rule of the guidelines outside that appendix
- Every rule of a project's own guidelines refines a rule of the SpecSheriff guidelines
- Every test of the system's code carries the SpecTag of a rule or of a node of a project's own NodeKind that exists, and a test a commit adds or changes that of an approved one
- Where a node's `meta.code` names the symbols in a file, it names exactly those that carry the node's SpecTag
- Where `TextRule.list.declaredIn` names a declaration in the code, the schema or the settings, `TextRule.list` matches it
- Each member of `TextRule.list` that is an object holds the property the list names
- Every copy generated from the nodes and kept in the repository is exactly what the nodes produce now, or, while it waits for a draft node, left unchanged by the commit: neither edited by hand nor left behind nodes that are all approved
- A commit that changes code names every approved node the SpecTags on its changed symbols outside the tests name, and no section

MOVE TO PART 14, by their opening words:
- No two RecordTypes
- Every domain has a header
- The values gathered beside a field
- A `consumes` link
- The domains do not use one another
- A RecordType of a domain names
- A RecordType holds at most one
- every RecordType variant row, and No two variants
- every row on a field of type `one of`
- A list of values a domain adds
- A field whose values are the sids
- A field of type `identifier of`
- the level row, which becomes "A domain's header that names a level names one the project's own guidelines list" (14.4.1)

**13.2** CUT, reason: "A project taking up the method holds code and tests written before its rules, and those rules are approved only as its owners review them. Refusing every symbol and test without a SpecTag would refuse every commit, the project's setup included, until all of them had their rules."

**13.3** CUT the reason's last sentence.

**13.4** WORDING FIX, title: "Who approves the specification as a whole" / «Кто одобряет спецификацию целиком».
CUT, reason: "Whether the specification is approved decides how strictly the checks hold its code and tests, so its owners decide it, both ways. Approved while code or tests carry no SpecTag, the specification would refuse the next commit for code or tests that commit did not touch."

**13.5** WORDING FIX. "Deterministic" moved to 1.6.1, so citing 13.1 alone loses it. Replace from "Each counts":
"Each counts among the table of checks (§s-jau82aq9juv9zzh):
- it is deterministic, as every check but the review is (§s-m4h279nbaqkpa3t);
- it reads only what those checks may read;
- it runs wherever those checks run;
- it refuses unless the rule listing it says it reports."

CUT, reason: "A project's own NodeKinds and properties carry requirements no check of the SpecSheriff guidelines knows. Run and held as the shared checks are, a project's check holds every participant, rather than resting on whoever remembers to run it."

**13.6** WORDING FIX, last sentence: "Each such check or generator whose code a commit adds or changes has a test carrying that SpecTag."
CUT, reason: "A test is all that holds a project's check or generator to its rule, since the code of the repository's tools carries no SpecTag (§s-hheus6f395ynqvc). A test carrying the SpecTag of a draft rule would have the code implement what nobody approved (§s-utvqbypzhmgndug)."

**13.7** CUT, reason: "A project may guard at a commit or a push what the method does not govern, such as that nothing internal reaches a public repository. Taking up the method must not stop that. The SpecSheriff tools run first, since the project's tools may extend their checks but never override them."

**13.8** Nothing.

**13.9** SPLIT and MOVE TO PART 14. Leaving for part 14: `RecordType.fields`, the files of types and RuntimeChecks, and what a RecordType requires counting as carried out (§s-e877bnfa559tvk9). I added "the commit's message", as tools 7.3.4 gives it.
- *Keeps the sid and title.* Text: "The independent reviewer of a commit is given the following, and nothing of the session that wrote the code:
 - the commit's message;
 - the commit's change, less the files generated from the specification;
 - the text and the reason of the nodes the commit's message and the SpecTags on its symbols outside the tests name;
 - for such a node of a project's own NodeKind, also the properties its NodeKind declares (§s-vsh384ybt4w25a2).

 Each file left out is named to the reviewer as generated from the nodes. The check of the generated copies compares it with what the nodes produce."

 Reason: "Given nothing of the session that wrote the code, the reviewer reads the code against the nodes rather than against its author's intent. A node's reason tells the reviewer how to read a case its text leaves open. A file withheld and not named reads to the reviewer as missing."
- *New sid.* Title: "What the reviewer of a commit refuses" / «Что отклоняет рецензент коммита». Text: "The reviewer refuses the commit where the code does something no named node's text states, or leaves out what one requires. What the rule listing a project's generator says it writes counts as carried out by what that generator wrote. The reviewer names the node and the line of each finding."
 Reason: "Whether code does only what its rules say cannot be decided by a script. A refusal naming the node and the line can be checked by anyone."
- *New sid.* Title: "A review that cannot be held refuses the commit" / «Рецензия, которую нельзя провести, отклоняет коммит». Text: "A review that cannot be held refuses the commit and says why. That is the case where:
 - there is no reviewer to run;
 - a run does not end;
 - an answer cannot be read."

 Reason: "A review that passes whenever it could not be held is a review nobody can rely on."

**13.10** CUT ", so running it again is always safe". WORDING FIX: "into the model" becomes "into the nodes".

**13.11** DOUBT: `sheriff message`, the review and the tests cannot run after an edit (tools/6). I recommend the first sentence read:
EN: "Where an agent writes the specification, the tests or the code, the checks that need neither a commit's message nor a run of the tests run after each of its edits."
RU: «Где агент пишет спецификацию, тесты или код, проверки, которым не нужны ни сообщение коммита, ни запуск тестов, запускаются после каждой его правки.»

**13.12** WORDING FIX, title ("judged" collides with the review, "the one judgement" in 1.6.1): "An agent's edit is checked before it is made" / «Правку агента проверяют до того, как она сделана».
Item 2 EN: "change the code written for a rule, or for a node of a project's own NodeKind that needs code (§s-vsh384ybt4w25a2), while no test carries the SpecTag of that rule or node (§s-rah8b37kytb682y);"
Item 2 RU: «изменила бы код, написанный для правила или для узла собственного NodeKind проекта, которому нужен код (§s-vsh384ybt4w25a2), пока ни один тест не связан SpecTag с этим правилом или узлом (§s-rah8b37kytb682y);»
Item 3 RU: «изменила бы код собственной проверки или генератора проекта, пока ни один тест не связан SpecTag с правилом, которое его перечисляет (§s-sfjka4zc4rhfu67);»
CUT, reason:
EN: "Every later check takes the approvals as given, so they can be held only where they are written. A commit holds a test and its code together whichever was written first, so the order of the work can be held only where the edits are made."
RU: «Каждая следующая проверка принимает одобрения как данность, поэтому удержать их можно только там, где их пишут. Коммит держит тест и его код вместе, что бы ни было написано первым, поэтому порядок работы можно удержать только там, где делаются правки.»

## Order, repeats and what part 14 owes

**Order.** Section 11 should run general to particular: 11.1, 11.9, 11.3, 11.5, 11.4, 11.6, 11.7 and its test half, 11.8, the exemption last. Section 12 holds. Section 13 should follow the table with the reviewer's nodes, 13.11 and 13.12, then 13.2 to 13.4, then 13.5 to 13.8, and 13.10 last.

**Stated twice.** 13.3 and the first sentence of 13.11 repeat 1.3.2 and 1.6.1, 11.6 repeats 1.2.6 and 1.5.2, and 12.4's "drawn from the nodes" repeats 12.1. All but 12.1 are agreed text citing these nodes, so they stay and are kept short.

**Part 14 owes** one rule that a domain's header counts as a section wherever a main rule speaks of sections, and one that a RecordType counts as a rule for 11.4, 11.5 and 11.9.

**Before showing:** the lists of what changed still use former numbers, in 11.4, 11.7, 12.1, 12.2, 13.11 and 13.12. Every citation added or dropped above needs its link at the move.

## Section 11, now section 9 "Tests and code", consolidated by a fresh reviewer (2026-11-10), applied by fix-newform-163.mjs (page v345)

Held to the day's rulings: NodeKind gone, a test implied wherever code is required, a retelling node deleted, a reason saying why the rule exists (7.14), a title naming its matter (7.4), pairs joined by "or" as lists (7.6), technical debt as descriptions of shortcomings (4.4). The whole drafts are in `newform.json`; what is not there:

- **Order now** (old numbers of this morning's section 9 → new): 9.1 → 9.1, 9.9 split → 9.2 (keeps s-6fw72j65jkqrfpf) and 9.11 (new s-gf6n8ge4mke3pr2), 9.2 → 9.3, 9.5 → 9.4, 9.4 → 9.5, 9.7 split → 9.6 tests (new s-8ykvuqhvtjh66hj) and 9.8 code (keeps s-9j2mmnuuwmx5ksn), 9.6 → 9.7, 9.8 → 9.9, 9.3 → 9.10.
- 9.1 cites s-2fau85dfyyeq66m beside s-km4x4s26kv7pjze, since the latter covers only generators; its reason keeps why the tests are on the side of the code.
- 9.10 (present 3.3) keeps only what is its own: the lists are written by hand and list exactly what carries the node's SpecTag; its items retold 1.5.2 and 9.4, the lists are the schema's, "three" is a count (7.12). Where a test's SpecTag stands moved to 9.4.
- 9.7 (technical code) keeps only the form of its SpecTag: agreed 1.2.7 defines technical code with these examples, 1.5.2 requires the SpecTag saying so.
- 9.9's reason keeps why the message is checked against the SpecTags.
- 9.11's reason cites 1.3.4 (s-67vekyup7y8smap) for who approves, instead of saying it.
- **DOUBT D1** (this morning's 11.2): 9.3, reading a top-level section whole before its implementation, names a person's habit no check can catch; recommended: delete. Its text is the "if kept" wording, "reads" over "reviewed", which collides with the review of a commit (1.6.1).
- **DOUBT D2** (this morning's 11.6): 9.7's "gives its reason": any non-empty text counts (`code.ts:63`), and `review.ts:59` refuses such a SpecTag only on code holding logic; recommended: "states what the technology requires of the symbol" / «говорит, что требует от символа технология».
- **DOUBT D3** (new): 9.4 admits only a node of a project's own kind "that requires an implementation in code", and counts it as a rule for agreed 1.4.2; today `binding.ts:198` accepts a test naming any node of a project's own kind, and a term too; recommended: the restriction. The tools and row 70 of the table of checks drop the term in any case.
- **For the tools step:** `binding.ts:293` reports an unimplemented rule whatever the specification's status, while 9.2 holds only while the specification is approved; the appendix of the tools says whether a draft specification still reports one.
- **TERM:** "implemented" partly fits [OFT]'s coverage (impl, utest) and [SysML]'s satisfy and verify, SpecSheriff also requiring a passing test and counting a SpecTag of an implementing rule: a gloss in the docs, no rename. "Exempts" has no counterpart; kept.

## Section 13, now section 10 "The checks and the procedures", consolidated by a fresh reviewer with the full checklist (2026-11-11)

Numbers: this report's 13.1–13.10 are 10.1–10.10, 13.11 is 10.12, 13.12 is 10.13; 10.11 is the generated copies, agreed. Verdict: not ready; every finding falls on present wordings (5.1–5.12), so each goes to the owner as a proposal at its node's turn. "R" means the section "Section 13" above.

- Checklist ✗ per node: 10.1 (7.4 "when", 7.8, 7.9 NodeKind, 7.14, pairing); 10.2 (7.5, 7.14, pairing); 10.3 (7.14); 10.4 (7.8, 7.14, pairing); 10.5 (7.9, 7.14); 10.6 (7.5, 7.14, pairing); 10.7 (7.14); 10.8 (7.14); 10.9 (7.5, 7.6, 7.7, 7.9, 7.14, pairing); 10.10 (1.2.3, 7.3, 7.5, 7.8, 7.14, pairing); 10.12 (7.8); 10.13 (7.14). Commit as actor: 10.1 rows, 10.2, 10.4, 10.6. Node beside rule: 10.1 rows, 10.9, 10.13 item 2. A main rule citing an extension: 10.6, 10.9, the reasons of 10.1 and 10.4 once 10.2 moves. Retelling: 10.3, sentences 2–4 of 10.6. A sid making the statement: 10.5.
- Section text: "How a change to the specification or to the code is checked, and how the procedures that write the specification, or what is generated from it, behave." / «Как проверяется изменение спецификации или кода и как ведут себя процедуры, которые пишут спецификацию или то, что из неё генерируется.»
- 10.1: title as R13.1; CUT "A check refuses unless its row says otherwise." (1.6.1 holds it); DOUBT paragraph 2 as R13.1 (after an agent's edit the tools read the working tree against the last commit, tools/6); reason cut to its paragraph 1; rows as R13.1, but MOVE to 12.5 the waiting clause of the copy row, the row on a copy that waits and the generators; MOVE to Migration the draft costs in three rows and the row on approving the specification; no commit as actor (as 9.5); "a rule, a rule of a project's own kind included"; the message row as 9.5, the `exempts` row "to a rule or a section its text cites" (9.7); DOUBT: R13.1 says "refines", the row "refines or implements", agreed 2.3 "refines or extends", no link type means "extends".
- 10.2: MOVE whole to Migration, its `refines` links becoming `overrides` to 1.5.2, 1.4.2 and 10.1; "the symbol or the test is not changed in the commit"; reason as R13.2 without "and those rules are approved only as its owners review them"; DOUBT: agreed 1.3.2's sentence citing this node and its reason paragraph "An existing project migrating…" breach 12.1.3 once 10.2 moves, and go to Migration too.
- 10.3: DOUBT DELETE (agreed 1.3.2 "a push runs no test" and 1.6.1 state it; its reason opens with 1.3.2's); if kept, its generators go to 12.5.
- 10.4: title "The specification's approval status is its owners' act"; MOVE to Migration the refusal to approve while a SpecTag is missing; "A commit in which the specification goes back to draft is refused unless it holds one of the specification's owners withdrawing the approval of that rule."; reason: "An approval is recorded only for a node's wording (§s-5ah25f6gy99panq). So the specification's approval is held by a rule whose approval only its owners give or withdraw."
- 10.5: as R13.5, opening "Each is held as the checks of the table of checks are (§s-jau82aq9juv9zzh):"; reason as R13.5 with "kinds of node".
- 10.6: MOVE the generators to 12.5, title "A project's own checks are tested against the rule listing them"; CUT sentences 2–4; reason "The code of a project's check is not the system's code and carries no SpecTag (§s-hheus6f395ynqvc). So a test is all that binds the check to its rule."
- 10.7: DOUBT: where the SpecSheriff tools cannot run, paragraph 3 refuses everything, yet tools/12 lets the commit through; proposed "Where the SpecSheriff tools cannot run, the project's tools still run. The commit or the push then goes through unless one of them fails."; reason as R13.7.
- 10.8: reason cut to its first sentence.
- 10.9: MOVE to Domains by `overrides` the items on `RecordType.fields`, the types and RuntimeChecks, what a RecordType requires; MOVE to 12.5 the two items on a project's generator, with "Each file left out…" and "It counts as carried out:"; "for such a rule of a project's own kind, also the properties that kind declares"; split under 7.6 and 7.7: the third node of R13.9, «Рецензия, которую нельзя провести, отклоняет коммит» («…и сообщает почему. Это так, если: нет рецензента, которого можно запустить; запуск не завершается; ответ невозможно прочитать.»); reason cut to its first sentence; DOUBT: tools 7.3.4 also gives the reviewer the commit's message and each changed symbol whole.
- 10.10: CUT ", so running it again is always safe"; DOUBT: delete paragraph 2 and the reason's last sentence (no tool or check carries paragraph 2 out); if kept, a subject, "into the nodes", its "because" to the reason.
- 10.12: DOUBT as R13.11 (the message check, the review and the tests cannot run after an edit); reason "among every other refusal" / «среди всех остальных отказов».
- 10.13: title as R13.12; item 2 "change the code written for a rule, a rule of a project's own kind included (§s-vsh384ybt4w25a2), while no test carries that rule's SpecTag (§s-rah8b37kytb682y);" / «изменила бы код, написанный для правила, в том числе для правила собственного типа в проекте (§s-vsh384ybt4w25a2), пока ни один тест не связан SpecTag с этим правилом (§s-rah8b37kytb682y);»; item 3 Russian as R13.12, MOVE "or generator" to 12.5; reason: cut its first sentence, the "So" of its second and paragraph 2 (retell 1.3.4, 1.3.6); DOUBT: tools/6 does not check an edit made through a shell before it is made.
- Order: 10.1, 10.12, 10.13, 10.9, the review that cannot be held, 10.4, 10.3 if kept, 10.5, 10.6, 10.8, 10.7, 10.10, 10.11.
- Migration takes: 10.2; the refusal to approve in 10.4; the draft costs and the approving row of 10.1; the part of 1.3.2 named above; tools 7.2.2–7.2.4. TERM: "Migration" reads as a schema or data migration; "Adoption" (the skill `spec-adopt`) fits better (inference); the owner's choice.
- Outside section 10: agreed 9.1 cites 12.5.2 (s-km4x4s26kv7pjze), which breaches 12.1.3.
