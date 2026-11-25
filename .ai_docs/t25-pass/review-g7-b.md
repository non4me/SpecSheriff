# Review g7-b: "Building the map" and "Drawing the diagram of the domains"

The report of specsheriff-rule-reviewer on review-input-g7-b.md, 2026-11-25, as the main session saved it. The reviewer could not load the skill `specsheriff-terminology-review`, so its term check rests on general knowledge only.

## `s-rpv4fkdqqguptqd`, "Building the map": not ready

Checklist lines with ✗:
- 7.2.2: "`sheriff map` first removes everything … It then writes there …" gives steps in prose.
- 7.2.3: the reason's "with no format kept between them and the page".
- 7.3.2: three sentences state two thoughts each: "it refuses to run, and the refusal names…"; "each with its licence notice, and loads nothing from the network"; "They come in this order, and each holds…".
- 7.6.3: the example says "first holds the section of the contracts section. It then holds the header of the domain `accounts`". In code-point order `accounts` comes before `contracts`, and the first phrase is garbled.
- The pairing test passes, but the reason's sentences ground paragraphs 3, 7 and 3, out of order.

«Оценка»:
- согласованность: ✗ Показ узла в ячейке его расположением противоречит 13.2 («только название и статус одобрения»). Порядок доменов по кодовым точкам расходится с уточнением владельца от 2026-11-14: «карта упорядочивает домены по тому же правилу» (t25-one-thought.md, строка 1063).
- целостность: ✓ Узлы, которые должны измениться, названы в заметках автора: «The hooks» (пункт 57), 13.2 (вопрос 5) и тест 13.2.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ Слова «keeps in no file» неверны: структура записана в саму страницу (generated.ts:109). Слова «each holds the top-level nodes» противоречат пунктам о вложенности.

Findings:
1. **The order of the domains on the map.** On 2026-11-14 the owner agreed that "the map orders its domains by the same rule" (t25-one-thought.md:1063). The author's notes treat this as the agent's own note. Option A: contracts first, then the domains row by row from the top, in the order of `s-jzm6qw992j3bnxt`. Option B: code-point order, as drafted, which withdraws the ruling. The reviewer recommends A.
2. **A node in a cell on the map** (question 5 for the base specification). "Is shown by its location" contradicts the agreed 13.2. Rule 8.6 offers an alternative: a node in a cell is named by its column and its row. The draft cannot be final until the owner answers. The reviewer recommends the location, consistent with item 51.
3. Paragraph 1: "…it refuses to run, and the refusal names the Views extension." → "In any other project, it refuses to run. The refusal names the Views extension." / «В любом другом проекте он отказывается работать. Отказ называет расширение Views.»
4. Paragraph 2 → "`sheriff map` writes the map into `specs/_viewer/` (§s-zefk589ykh37b8u) as follows:
   - it first removes everything in that folder;
   - it then writes two files there: the web page `index.html`, which draws the map, and a `.gitignore` file that holds `*`.

   That `.gitignore` file makes git ignore the folder's contents whatever the repository's own ignore files say." (the main session merged the thorough reader's "writes two files there"). Russian: «`sheriff map` записывает карту в `specs/_viewer/` (§s-zefk589ykh37b8u) так: … Этот файл `.gitignore` заставляет git игнорировать содержимое папки, что бы ни говорили собственные файлы игнорирования репозитория.»
5. Paragraph 3 → "…from an outline in Markdown that `sheriff map` builds from the nodes and writes only into the page itself. The page holds markmap and every library that markmap needs, each with its licence notice. The page loads nothing from the network." / «…который `sheriff map` строит из узлов и записывает только в саму страницу. Страница содержит markmap и все библиотеки, которые нужны markmap, каждую с её лицензионным уведомлением. Страница ничего не загружает из сети.»
6. The sentence that introduces the branches → "The outline has the following top-level branches, in this order. None of them represents a node. Each holds the nodes of the files listed with it:" (the main session merged the readers' "None … represents a node" and "listed"). Russian: «У структуры есть следующие ветви верхнего уровня, в таком порядке. Ни одна из них не представляет узла. Каждая содержит узлы файлов, перечисленных при ней:»
7. The `Guidelines` item: "whose file the model … holds" → "whose nodes the model of the specification holds". The Russian «файл которого содержит модель» reads as "whose file holds the model" → «узлы которого входят в модель спецификации».
8. The reason: "no format kept" → the thorough reader's "with nothing stored between the nodes and the page" (the main session's choice) / «без того, что хранилось бы между узлами и страницей».
9. The example changes with finding 1. For option A it is to show contracts first and then the domains row by row.

## `new:tools-4-diagram` (`s-jzm6qw992j3bnxt`), "Drawing the diagram of the domains": not ready, ready once the author applies the fixes

Checklist lines with ✗:
- 7.2.2: "first place each domain … They then place the domain itself" gives steps in prose.
- 7.2.7: the first use of "level" ("each level that the header … contains") has no citation; it is cited only in the next item.
- 7.4.2: the reason goes through the text paragraph by paragraph.
- 7.5.2: "each other domain to a section of which a `consumes` link of its header points" ("its" can be read as the other domain's); "which only domains that use one another in a cycle leave"; "to be taken at once".
- Pairing test ✗.

«Оценка»:
- согласованность: ✓ Сверено с 11.2.2, 11.2.3 и её решениями от 2026-11-14, а также с 11.1.3, 11.2.1, 11.3.3, 11.3.4, 11.3.6, решением владельца от 2026-11-08 о подписи уровня и с `s-t9j29hppag2nren`.
- целостность: ✓
- целесообразность: ✓ 11.2.3 явно оставляет сложные случаи описанию инструментов.
- избыточность: ✗ Пункт «the rows of the levels follow the order…» повторяет 11.2.2.
- недостаточность: ✗ Уровень вне списка получает свою линию по пункту 3, а его домен попадает в `No level` по пункту 5. Не сказано, что домен ставится сразу после уже поставленных.

Findings, all for the author:
1. Items 3 and 5 → "- each level that the project's own guidelines list (§s-t9j29hppag2nren) and that the header of at least one domain contains has a row of its own, labelled with the level's number (§s-nkyty4dy9x2v2a4) and its name, such as `2 services`;
   - below the rows of the levels, a row labelled `No level` holds each domain whose header contains none of those levels, where there is such a domain." / «- у каждого уровня, который перечислен в собственных guidelines проекта (§s-t9j29hppag2nren) и есть в заголовке хотя бы одного домена, есть своя линия, подписанная номером уровня (§s-nkyty4dy9x2v2a4) и его именем, например `2 services`; - ниже линий уровней линия, подписанная `No level`, содержит каждый домен, в заголовке которого нет ни одного из этих уровней, если такой домен есть.»
2. Item 2 → "an arrow leads from each domain to each domain that it uses, that is, to each other domain that holds a section to which a `consumes` link of the first domain's header points;" / «стрелка ведёт от каждого домена к каждому домену, которым он пользуется, то есть к каждому другому домену, на раздел которого указывает связь `consumes` заголовка первого из них;»
3. Paragraph 2 → "To place a domain, the SpecSheriff tools:
   - first place, in the same way, each domain of its row that it uses and that they have not yet started to place;
   - then place the domain itself, right after the domains already placed in its row.

   They take the domains of each row in this order (§s-uw9n84edf7cbe9n):" / «Чтобы поставить домен, инструменты SpecSheriff: - сначала тем же способом ставят каждый домен его линии, которым он пользуется и который они ещё не начали ставить; - затем ставят сам домен — сразу после доменов, уже поставленных в его линии. Домены каждой линии они берут в таком порядке (§s-uw9n84edf7cbe9n):»
4. The last item of the order → "last, each domain not yet placed, which remains only where domains of the row use one another in a cycle (§s-bncp7gtyaukur8e)." / «последним — каждый ещё не поставленный домен; такой домен остаётся, только если домены линии пользуются друг другом по кругу (§s-bncp7gtyaukur8e).»
5. The sentence on ties → "Where the steps above leave a choice between several domains, the SpecSheriff tools take them in the alphabetical order of their names." / «Где описанные шаги оставляют выбор между несколькими доменами, инструменты SpecSheriff берут их в алфавитном порядке имён.»
6. The reason → "The rule on the order of the domains in a row leaves its harder cases to the appendix of the tools (§s-uw9n84edf7cbe9n). This node settles them, together with how the rows are labelled, so that the same headers give the same diagram on every machine." / «Правило о порядке доменов в линии оставляет свои более сложные случаи описанию инструментов (§s-uw9n84edf7cbe9n). Этот узел решает их, а также то, как подписаны линии, так что из одних и тех же заголовков на любой машине получается одна и та же схема.»
7. Cut the item "the rows of the levels follow the order of the levels' numbers from the top": it restates 11.2.2, which the node implements.

## Points to look at, as the reviewer judged them

- The refusal without the Views extension holds: "Where the files are" and rule 1.7.1 settle it. Item 57 must change, and the notes say so.
- No branch for each level holds, under 13.2.
- The code-point order of the domains on the map does not hold: finding 1.
- The diagram as a node of its own, with a todo, holds, under rule 7.3.3 and the rule that a release carries out every rule it contains.
- No check of a row of a table: holds for both drafts.
- Questions for the base specification: the map cannot be final until question 5 is answered. The diagram depends on none of the seven.

## The main session's decisions

- **Finding 1 is settled by the owner's ruling, so it is not a question.** On 2026-11-14 the owner agreed that "the map orders its domains by the same rule" as the diagram (t25-one-thought.md:1063). The draft follows option A, and the example changes with it.
- **Finding 2 is the group's one question for the owner.** Rule 13.2 does not cover a node that has no title. The page of group 7 asks it, with the reviewer's recommendation: the location, as item 51 writes the heading of such a node. The change to 13.2 that the answer calls for is recorded under "Found and owed", for after stage 2.
- Findings 3 to 9 of the map and 1 to 7 of the diagram are applied as worded, with the readers' words where this file says so.
