# Review g7-a: item 51 and the proposal on the list of commands

The report of specsheriff-rule-reviewer on review-input-g7-a.md, 2026-11-25, as the main session saved it. The reviewer read the skill `specsheriff-terminology-review` from its synced copy.

## `s-k4nqjr96ux7a5m7`, "How a node is written in Markdown": not ready, ready after the fixes

Checklist lines with ✗:
- 7.2.2 and 7.3.2: "a list or an object is written as JSON on one line, each line break as `<br>`, and each `|` as `\|`" sets three requirements of one kind side by side.
- 7.2.4: "A cell that holds text holds that text" names two different cells by one word.
- 7.4.2 and the pairing test: the reason justifies the list items one by one.
- 7.6.3: the example leaves out the heading of the group, which the text requires for table 10.1.

«Оценка»:
- согласованность: ✗ первая фраза относит `sheriff guide` к командам, которые пишут «каждое другое значение» узла, а согласованный узел о `sheriff guide` (s-jk8v3srrved7ram) пишет узлы без метаданных.
- целостность: ✗ узел называет узел на другом конце связи и узел, из которого пришло собранное значение, «по sid, расположению и названию», а у узла в ячейке `TableRule` названия нет (8.6).
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ не сказано, как узел в ячейке назван в связи и в списке собранных значений, и как обоснование отделено от текста.

Findings, all for the author:
1. After the paragraph on the list of gathered values, add: "A node in a cell of a `TableRule`, which has no title, is named in a link and in the list of gathered values by its sid and location alone." / «Узел в ячейке `TableRule`, у которого нет названия, в связи и в списке собранных значений назван только своим sid и расположением.» The same gap is in rule 13.1 of the base.
2. After the first list, add: "`sheriff guide` leaves out each node's metadata (§s-jk8v3srrved7ram)." / «`sheriff guide` опускает метаданные каждого узла (§s-jk8v3srrved7ram).»
3. "In a cell of these tables:" followed by the items "a list or an object is written as JSON on one line;", "each line break is written as `<br>`;" and "each `|` is written as `\|`." / «В ячейке этих таблиц:» и пункты «список или объект записывается в виде JSON в одну строку;», «каждый перенос строки записывается как `<br>`;», «каждый `|` записывается как `\|`.»
4. "A cell of the `TableRule` that holds text is written as that text. A cell that holds a node is written as the node's location and its text." / «Ячейка `TableRule` с текстом записывается этим текстом. Ячейка с узлом записывается расположением этого узла и его текстом.»
5. English only: "down to the sixth level" → "capped at the sixth level".
6. The reason → "Every command that writes a node for a reader writes it in one form, so a reader who knows that form from one command can read the output of any other. In that form, a reader sees everything that the node's file holds for the node, and where each of its links leads, without opening the file (§s-ce24ynwabt5yx8h)." / «Каждая команда, которая записывает узел для читателя, записывает его в одном виде, поэтому читатель, знакомый с этим видом по одной команде, может читать вывод любой другой. В этом виде читатель видит всё, что файл узла хранит для этого узла, и то, куда ведёт каждая его связь, не открывая файла (§s-ce24ynwabt5yx8h).» With the thorough reader's "the same form".
7. The example: "…prints the heading “What is checked” of the node's column, the heading of its group, such as “The specification alone”, and the text of its row's cell under “On failure”, such as “refused”." / «…печатает заголовок «What is checked» столбца этого узла, заголовок его группы, например «The specification alone», и текст ячейки его строки под «On failure», например «refused».»
8. The author's call: nothing says how the reason is set apart from the text; the code writes "*Why:*". Option: "the node's text, and then its reason under the key `reason`;".
9. TERM, for the docs: "human-readable export" fits ISO/IEC/IEEE 42010's "view" only in part. The GFM details (six heading levels, `\|`, inline `<br>`) were checked against the GFM spec.

## `new:tools-5-export`, "Writing the human-readable export": not ready

Checklist lines with ✗:
- 7.2.7: "of the appendix of the tools that the project takes from the plugin (§s-bsya3febm6u64ab)": "appendix of the tools" has no citation, and 2.5 neither defines it nor says that the project takes it from the plugin.
- 7.4.2 and the pairing test: each sentence of the reason justifies one paragraph, and the third restates paragraph 1.
- 7.6.3: the example leaves out `md-version/_guidelines/extensions/views.md` and `…/domains.md`, which the text requires, and `project.json`, which `sheriff init` always writes.

«Оценка»: согласованность ✓; целостность ✓; целесообразность ✓; избыточность ✗ («These include…» повторяет узел о модели спецификации, «So the SpecSheriff guidelines are exported to…» повторяет пример); недостаточность ✗ (нет ссылки на определение описания инструментов; пример расходится с текстом).

Findings:
1. "…and of the appendix of the tools (§s-a4rbry4hsu34hy8) that the project takes from the plugin (§s-bsya3febm6u64ab)." / «…и описания инструментов (§s-a4rbry4hsu34hy8), которые проект берёт из плагина (§s-bsya3febm6u64ab).», with a new `cites` link to s-a4rbry4hsu34hy8.
2. The example → "A project that has chosen the Views and Domains extensions keeps `specs/_guidelines/project.json`, `specs/contracts/terms.json` and `specs/requests/intake.json`, and takes the SpecSheriff guidelines, the files of those extensions and the appendix of the tools from the plugin. `sheriff markdown` writes `md-version/_guidelines/project.md`, `md-version/contracts/terms.md`, `md-version/requests/intake.md`, `md-version/_guidelines/spec.md`, `md-version/_guidelines/extensions/domains.md`, `md-version/_guidelines/extensions/views.md` and `md-version/_guidelines/tools.md`. The most likely mistake is to write only the files that the repository keeps, which leaves the guidelines that the project follows out of the export." with its Russian.
3. The reason → "A person reads in the export the whole specification of the project, including the guidelines that the project takes from the plugin. The export is written anew from the nodes at every run and kept out of git, so it never becomes a second copy of the specification that a commit could change (§s-kh8qcd5kxgh9z3j)." / «В экспорте человек читает всю спецификацию проекта, включая guidelines, которые проект берёт из плагина. Экспорт пишется заново из узлов при каждом запуске и не попадает в git, поэтому никогда не становится второй копией спецификации, которую мог бы изменить коммит (§s-kh8qcd5kxgh9z3j).» The `cites` link to s-mbmnsnxenmavu3z then goes.
4. Cut "So the SpecSheriff guidelines are exported to `md-version/_guidelines/spec.md`.": the example shows it.

## `new:tools-5-show`, "Printing one node": not ready, ready after the fixes

- 7.5.2 ✗: in "the command's argument, written as a node is written in Markdown" the participle attaches to "argument"; "the node alone, without the nodes under it" says the same thing twice.
- Fix: the first paragraph → "`sheriff show` prints to its standard output one node, written as a node is written in Markdown (§s-k4nqjr96ux7a5m7), without the nodes under it. The command's argument is that node's sid (§s-9spq78kdwsxr759) or location (§s-kag2m9tzdnduxdx)." / «`sheriff show` печатает в свой стандартный вывод один узел так, как узел записывается в Markdown (§s-k4nqjr96ux7a5m7), без узлов под ним. Аргумент команды — sid (§s-9spq78kdwsxr759) или расположение (§s-kag2m9tzdnduxdx) этого узла.»
- Cut from the example "The rule's children, if it had any, would not be printed.": a hypothetical case shows nothing.

## `proposal:s-f5rz6b7dhxejjts-g7`, "The commands that `sheriff` accepts": ready as to its change

The proposal changes only the two citations and their links that its `change` field lists, and the defect is real. Rule 7.2.7 ✗ in agreed sentences: SpecTag, RuntimeChecks, RecordTypes, todo, the approval status, the `strict` flag and the extensions of the guidelines have no citation of the node that defines them.

## The reviewer's questions for the owner

1. What `sheriff markdown` and `sheriff map` do in a project that has not chosen the Views extension. The agreed list of commands records a doubt with two options: the hooks run them only where Views is chosen, or the commands end successfully with a notice. "Where the files are" and rule 1.7.1 settle only that nothing is written. The reviewer recommends the refusal, so that a person who runs the command by hand learns why nothing was written.
2. Whether to add the missing citations to the agreed list of commands.

## The main session's decisions

- **Question 2 is not a question.** The owner's rule "An agreed node is brought into line with the rules when it changes, never in a sweep" says that a breach in the agreed sentences of a node that changes goes to the owner as part of the proposal. The proposal on the list of commands therefore also adds the citations that rule 7.2.7 requires, and its `change` field lists each one. The owner sees them on the group's page with the proposal.
- **Question 1 goes to the owner, on the page of group 7.** It decides what a person sees when they run the command by hand, and the agreed list of commands records it as open.
- **Finding 1 of item 51 joins the question of review g7-b on the map.** Both concern a node that has no title, where a rule of the base shows a node by its title: 13.1 in the export and in `sheriff show`, 13.2 on the map. The page puts them to the owner as one question, with the reviewers' recommendation: the location, and the sid in a link.
- Finding 8 of item 51 is applied: the node says how the reason is set apart from the text, in the form that the code writes today (`*Why:*`), so that a reader of the export can tell the two apart.
- The other findings are applied as worded, with the readers' words where `english-g7-thorough.md` says so.
