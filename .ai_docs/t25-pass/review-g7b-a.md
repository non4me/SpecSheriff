# Follow-up review g7b-a: item 51 and the proposal on the list of commands

The report of specsheriff-rule-reviewer on review-input-g7b-a.md, 2026-11-25, as the main session saved it. `sheriff show` is ready; item 51, the export and the proposal on the list of commands are not. The author can fix every finding. The proposal changes only what its `change` field lists, and the defect it fixes is real.

## Checklist lines with ✗

- Item 51, 7.2.7: "metadata" is defined nowhere; this node and s-jk8v3srrved7ram send the reader to each other.
- The list of commands, 7.2.7: "the independent reviewer", "the system's code", "the approved wordings" and "a project's own check or generator" have no citation.

## «Оценка»

- s-k4nqjr96ux7a5m7: недостаточность ✗ («metadata» нигде не определено; после вставок раунда b слова «instead» и «these tables» указывают на далёкие абзацы); остальные ✓.
- new:tools-5-export: согласованность ✗ (ссылка на 2.5, s-bsya3febm6u64ab, должна подтверждать, что описание инструментов берётся из плагина, но 2.5 говорит это только о SpecSheriff guidelines и расширениях; об описании инструментов это говорит «Where the files are», s-zefk589ykh37b8u); остальные ✓.
- new:tools-5-show: все ✓ (мелочь: не сказано, что делает команда без аргумента; show.ts в этом случае отказывает).
- proposal:s-f5rz6b7dhxejjts-g7: целостность ✗ (сомнение базового узла о Views снимается ответом на Q2, но ни предложение, ни заметки не говорят, что ответ запишут в `meta.decisions`, а сомнение уберут); недостаточность ✗ (четыре понятия без ссылки).

## Findings

Item 51:
1. "`sheriff guide` leaves out each node's metadata, the value of the node's `meta` (§s-jk8v3srrved7ram)." / «`sheriff guide` опускает метаданные каждого узла — значение его `meta` (§s-jk8v3srrved7ram).»
2. "The following values are written in a form of their own instead of as JSON:" / «Следующие значения записываются не в виде JSON, а в особом виде:». And "In a cell of the table of a `TextRule.list` and of a table of a `TableRule`:" / «В ячейке таблицы `TextRule.list` и таблицы `TableRule`:».

The export:
3. "…that the project takes from the plugin (§s-bsya3febm6u64ab, §s-zefk589ykh37b8u)." / «…которые проект берёт из плагина (§s-bsya3febm6u64ab, §s-zefk589ykh37b8u).»

The list of commands, with the `cites` links and each listed in `change`:
4. - "asks the independent reviewer (§s-m4h279nbaqkpa3t) for its verdict…" / «запрашивает вердикт независимого рецензента (§s-m4h279nbaqkpa3t) по коммиту…»
   - "generates parts of the system's code (§s-hheus6f395ynqvc) from the approved wordings of the nodes (§s-qyjw8xez6t6adc3), for example…" / «порождает части кода системы (§s-hheus6f395ynqvc) из одобренных формулировок узлов (§s-qyjw8xez6t6adc3), например…»
   - "…which a project's own check (§s-2fau85dfyyeq66m) or generator (§s-km4x4s26kv7pjze) reads (§s-w6gybeqn2ttydqx);" / «…которую читает собственная проверка (§s-2fau85dfyyeq66m) или генератор проекта (§s-km4x4s26kv7pjze, §s-w6gybeqn2ttydqx);»
5. Russian only: «вместе с её узлом» → «вместе с его узлом».
6. Add to the notes: once Q2 is answered, the answer goes into the base node's `meta.decisions` and its `doubt` is removed.

The questions for the owner in `group7-notes.md`:
7. Q1: add to option B's cost "Different nodes get the same label: every refused row of the main table of checks reads “What is checked: refused”." / «Разные узлы получают одну подпись: каждая строка основной таблицы проверок с отказом читается «What is checked: refused».»
8. Q2: s-mhsb6fjsq5xn6c9 refuses where a chosen extension is missing from the plugin, not where none is chosen, so the recommendation cites it "by analogy" / «по аналогии».

The author's other readings hold: the split into three nodes, and no row of a table of checks. No draft waits on a question for the base specification.

## The main session's decisions

- Every finding is applied as worded, with the readers' changes in `english-g7b-fast.md` and `english-g7b-thorough.md`.
- Finding 6 also goes into the continuation file, so that the main session records the answer to Q2 on the base node when the owner gives it.
- The minor point on `sheriff show` with no argument: the node says that `sheriff show` refuses to run without an argument, as show.ts does.
- Findings 7 and 8 merge with finding 4 of review g7b-b on Q1: the author restates option B's "what a person sees" once.
