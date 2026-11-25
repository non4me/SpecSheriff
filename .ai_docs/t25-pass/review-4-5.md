# The reviewer's report on sections 4 and 5 (2026-11-09), applied node by node at each node's turn

Not ready: 5.4 and 5.5 need the owner. The rest pass after the fixes.

## 4.2
- WORDING FIX: the title repeats the text and says `refines`, while paragraph 3 requires `implements`. "The technical appendix carries out the base specification" / «Техническое приложение реализует базовую спецификацию».
- WORDING FIX: in the reason, paragraph 2's detail lost its ground to 1.1.5. Add: "Described less exactly, a node would leave a choice to whoever implements it (§s-tj38pvm38nepaf5)." / «Описанный менее точно, узел оставил бы выбор тому, кто его реализует (§s-tj38pvm38nepaf5).»
- WORDING FIX: «крайние случаи» → «эйджкейсы», the owner's word.
- TERM: implements; deriveReqt [SysML], derived requirement [29148:2018]; partial. Keep, gloss in the docs (inference).

## 4.3
- WORDING FIX: the title repeats the text. "The technical appendix of an instance" / «Техническое приложение инстанса».
- WORDING FIX: no node defines the word. "An instance, one running copy of the system, changes the technical appendix for itself." / «Инстанс, одна работающая копия системы, меняет техническое приложение для себя.»

## 5.1
- WORDING FIX: nothing in the reason grounds naming the property. Add: "Named, the property tells the file's author what to correct." / «Названное свойство говорит автору файла, что исправить.»

## 5.2
- WORDING FIX: in the reason, bare "extension" now reads as 13.1.1's. "An extension of the schema that changes no definition of the schema of the SpecSheriff guidelines" / «Расширение схемы, которое не меняет ни одного определения схемы SpecSheriff guidelines».

## 5.3
- WORDING FIX: the title repeats the text. "The reasons behind the structure" / «Обоснования структуры».

## 5.4
- DOUBT: a section holding only RecordTypes now fails this rule. No draft of part 13 restores them, and 13.1.2 requires its `overrides` link.
- TERM: container; [C4] container, a running application or data store; false friend, weakened by "of rules". Keep, gloss in the docs (inference).

## 5.5
- DOUBT: "the part contracts" and its files contradict agreed 3.1 (a section of the base specification). Separate contract files exist only with domains (13.2.2), so these clauses move to part 13.
- DOUBT: nothing now locates a node of a base specification using no extension. The header's location needs a part-13 node with `overrides`.
- WORDING FIX: definition by exclusion ("Any other node…"). Replace those two sentences: "A node's place is its number among the nodes under the same parent. A term takes no number. Its place is the term's name." / «Место узла — его номер среди узлов того же родителя. Термин номера не получает. Его место — имя термина.»
- WORDING FIX: the title repeats the text. "A node's location" / «Расположение узла».

## 5.8
- TERM: decision; [ADR]; partial: an ADR is its own record. Keep, gloss in the docs (inference).

## 5.9
- WORDING FIX: the title says todo, the text bare "item" (§s-me9k7g34jqb4rzn). "kept as a todo, an item of that node's `meta.todos`", then "todo" for "item" in text and reason / «хранится как todo, элемент `meta.todos` этого узла», then «todo» for «элемент».
- WORDING FIX: «это вместо этого правило» → «не элемент `meta.todos`, а правило».

## 5.10
- WORDING FIX: the title repeats the text. "The listing of every todo" / «Список всех todo».

## 5.9, added later
- WORDING FIX, outside the node on technical debt: draft 5.9 still says "the default implementation". Replace it with "A problem set aside in the system's implementation" / «Отложенная проблема реализации системы».
