# Follow-up review g7b-b: "Building the map" and "Drawing the diagram of the domains"

The report of specsheriff-rule-reviewer on review-input-g7b-b.md, 2026-11-25, as the main session saved it. Both drafts are not ready, and every finding is for the author.

## `s-rpv4fkdqqguptqd`, "Building the map": not ready

Checklist lines with ✗:
- 7.2.7: "from the top row of the diagram of the domains to its row `No level`": the diagram is cited only in the next sentence.
- 7.3.2: "from an outline in Markdown that `sheriff map` builds from the nodes and writes only into the page itself" states three facts.

«Оценка»: согласованность ✓ (кроме подписи узла в ячейке, это вопрос Q1); целостность ✓; целесообразность ✓; избыточность ✓; недостаточность ✗ (не сказано, чем подписан корень плана: код пишет `# Specification`, generated.ts:75, а без него markmap рисует пустой корень).

Findings:
1. Move the citation to the first mention of the diagram: "…from the top row of the diagram of the domains (§s-jzm6qw992j3bnxt) to its row `No level`. It takes the domains of each row in the order in which the diagram places them." / «…от верхней линии схемы доменов (§s-jzm6qw992j3bnxt) до её линии `No level`. Домены каждой линии она берёт в том порядке, в каком их ставит схема.»
2. Replace the sentence with three: "`sheriff map` builds an outline in Markdown from the nodes. It writes that outline only into the web page itself. The web page draws the map from the outline with markmap." / «`sheriff map` строит из узлов план в Markdown. Он записывает этот план только в саму веб-страницу. Веб-страница рисует карту по этому плану с помощью markmap.» In the Russian, write «план» for "outline" throughout, as round a did; «структура» also renders "structure" in the reason.
3. The code already does it: before "The outline has the following top-level branches", add "The root of the outline, labelled `Specification`, represents no node." / «Корень плана, подписанный `Specification`, не представляет узла.»
4. Q1 in `group7-notes.md`: option B's "what a person sees" contradicts its own example, since under rule 1.3.5 option B gives every refused row of a table of checks the same label. Replace it with "What a person sees: in a table of checks, the same label, such as “What is checked: refused”, on every row with the same cost, so those rows cannot be told apart; in other tables, a label built from the row's text cells, often long." / «Что видит человек: в таблице проверок одну и ту же подпись, например “What is checked: refused”, у всех строк с одинаковой ценой, так что их не отличить; в других таблицах подпись из текстовых ячеек строки, часто длинную.» Q2 is correctly built.

Round a's findings 3 to 9 are applied; finding 1 follows the ruling of 2026-11-14; finding 2 became Q1. The node is final only once the owner answers Q1.

## `new:tools-4-diagram` (s-jzm6qw992j3bnxt), "Drawing the diagram of the domains": not ready

Checklist line with ✗: 7.2.7, the reason's "the appendix of the tools" is not cited. The reviewer checked the example `e, b, d, c, a` by hand.

«Оценка»: согласованность ✓; целостность ✓; целесообразность ✓; избыточность ✗ («This order takes into account only…» не добавляет мысли: каждый шаг уже говорит «of the row»); недостаточность ✓.

Findings:
1. New in round b: "They take the domains of each row…" now opens its own paragraph, so "They" points into another paragraph. → "The SpecSheriff tools take the domains of each row in this order (§s-uw9n84edf7cbe9n):" / «Домены каждой линии инструменты SpecSheriff берут в таком порядке (§s-uw9n84edf7cbe9n):»
2. Cut "This order takes into account only the domains of the same row that a domain uses." / «Этот порядок учитывает только те домены той же линии, которыми домен пользуется.» The words "of the row" in each step already carry the owner's clarification of 2026-11-14, and the sentence can be read as ignoring the domains that use a domain, which steps 1 and 2 test.
3. The reason's first sentence → "The rule on the order of the domains in a row (§s-uw9n84edf7cbe9n) leaves its harder cases to the appendix of the tools (§s-a4rbry4hsu34hy8)." / «Правило о порядке доменов в линии (§s-uw9n84edf7cbe9n) оставляет свои более сложные случаи описанию инструментов (§s-a4rbry4hsu34hy8).», with a `cites` link to s-a4rbry4hsu34hy8.

## The main session's decisions

Every finding is applied as worded, together with the readers' changes in `english-g7b-fast.md` and `english-g7b-thorough.md` ("finally" in the diagram, "and `billing` uses `accounts`" in the map's example). The reviewer leaves no question for the owner beyond Q1 and Q2.
