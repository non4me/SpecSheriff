**Group 3, input g3b-d: the confirming review of four drafts**

Three drafts are **not ready** and one is **ready**. Q1 is not checked here: `proposal:s-9j2mmnuuwmx5ksn` is in another reviewer's input.

- **Round a's fixes:** every fix from `review-g3-d.md` is in place word for word, in English and in Russian.
- **The author's own sentences:** each sentence in `english-group3-changed.md` for these nodes keeps the meaning of the Russian.

### Checklist

| Rule | s-5hb9k2e34dgn284 | s-czxaqvaesmu3gru | s-cdachayybfvg4na | proposal 8.4 |
|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✗ conditions 2–3, "each such member": it can be read as "a member for one of those kinds", and then condition 3 says nothing | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ | ✓ | ✗ "`TextRule.list.members`" cites nothing |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✗ "so a rule lists those kinds" restates paragraph 2 |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ (none; one proposed below) |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✗ sentence 1 grounds `needsCode` (paragraph 1), then sentence 2 grounds the listing rule (paragraph 2), in that order |

### s-5hb9k2e34dgn284, "A list and its declaration": not ready

**DOUBT (author can fix, through a proposal on the agreed s-gb8s9657a65hqmv).** The sentence "The lists of a project's own kinds of node … (§s-czxaqvaesmu3gru)." contradicts row 10.1.35, which checks every list that has a `jsonSchema`.
- The exemption only matters for a list that s-gb8s9657a65hqmv rewrites from a `declaredIn` naming the field `kinds`. Neither this repository's `specs/` nor the saloon's holds such a list.
- The exemption also leaves one list unchecked: that of a rule outside `project.json` that refines 8.3.

The vt rule "An error is fixed at its source" applies. The fix:
- Delete the sentence in both languages, with its links to s-vsh384ybt4w25a2 and s-czxaqvaesmu3gru, and the matching clause of `stage3`.
- In s-gb8s9657a65hqmv, add this item before the two items on `declaredIn`: "`TextRule.list.declaredIn` is removed where it points to the field `kinds` of the project's extension of the schema (§s-xm8rz4uupb73gu5);" / «`TextRule.list.declaredIn` удаляется, если указывает на поле `kinds` расширения схемы проекта (§s-xm8rz4uupb73gu5);».
- In the next item, write "to any other place in a JSON Schema" / «если указывает в другое место JSON Schema».

**Оценка**
- согласованность: ✗ Исключение противоречит строке 10.1.35: она проверяет каждый список с `jsonSchema`. Сверено со строкой 10.1.35 и её решениями от 2026-11-13, с 5.1, 1.5.2, 8.3, 8.4, s-33fw3ga4ctd94dq, s-gb8s9657a65hqmv и s-avvnasjhsfkgajh.
- целостность: ✗ Список правила вне `project.json`, которое уточняет 8.3, не проверяет ни этот узел, ни s-czxaqvaesmu3gru. Источник исключения — пункт s-gb8s9657a65hqmv о `declaredIn`. С s-cdachayybfvg4na узел стыкуется.
- целесообразность: ✓ Проблема названа строкой 10.1.35: список и схема или код расходятся незаметно.
- избыточность: ✓
- недостаточность: ✓

### s-czxaqvaesmu3gru, "The list of a project's own kinds of node": not ready

**DOUBT (author can fix; the owner sees the new row as a proposal).** This node implements row 10.1.35 and cites it twice. Yet the row's text says nothing about kinds or `needsCode`: only its `checks` link points to 8.4. Table 10.1 claims to be "the complete list of the checks", but none of its rows states the check that 8.4 describes.

The fix is a new row after 10.1.35, with the cost "refused", a `checks` link to s-hhnahzmhahf8jht, and this text:
- EN: "Each kind of node that the project's extension of the schema (§s-xm8rz4uupb73gu5) adds is listed, with the same `needsCode`, in the rules of the project's own guidelines that refine the rule on a project's own kinds of node (§s-vsh384ybt4w25a2). Each kind that those rules list is one that the extension adds"
- RU: «Каждый тип узлов, который добавляет расширение схемы проекта (§s-xm8rz4uupb73gu5), перечислен, с тем же `needsCode`, в правилах собственных guidelines проекта, которые уточняют правило о собственных типах узлов проекта (§s-vsh384ybt4w25a2). Каждый тип, который перечисляют эти правила, добавлен этим расширением»

Three changes follow from the new row:
- row 10.1.35 drops its `checks` link to 8.4;
- this node's `implements` link and both citations of s-f5mm7tagez38ffz move to the new row;
- `impl.json` maps the new row to this node.

**WORDING FIX (author).** In conditions 2 and 3, replace "each such member" with "each member of the `TextRule.list` of those rules". In the Russian, «каждый такой элемент» becomes «каждый элемент `TextRule.list` этих правил».

**DOUBT (author can fix).** A member that is an object and lacks its property is refused twice: here, because it names no kind, and by s-cdachayybfvg4na. s-5hb9k2e34dgn284 leaves the same case to s-cdachayybfvg4na, so that one fault is refused once.

The fix is to insert this sentence after "…by its property `needsCode`.", and to update `stage3` to match:
- EN: "`sheriff binding` compares the kinds with the members only where each member that is an object holds the property that `TextRule.list.property` names, which the check of an object in a list requires (§s-cdachayybfvg4na)."
- RU: «`sheriff binding` сравнивает типы с элементами, только если каждый элемент, который является объектом, содержит свойство, которое называет `TextRule.list.property`, чего требует проверка объекта в списке (§s-cdachayybfvg4na).»

**Оценка**
- согласованность: ✓ Сверено с 8.3, с 8.4 и его решениями от 2026-11-10, с 2.3, 5.2, с узлом «What the SpecSheriff tools read in the project's own guidelines» и с extension.schema.json.
- целостность: ✗ Узел реализует строку 10.1.35, текст которой эту проверку не описывает, и в таблице 10.1 нет строки о сверке имени и `needsCode`. Элемент-объект без свойства отвергают и этот узел, и s-cdachayybfvg4na.
- целесообразность: ✓ Решение от 2026-11-10: сравниваются и имя, и `needsCode`.
- избыточность: ✓
- недостаточность: ✓

### s-cdachayybfvg4na, "An object in a list": ready

There are no findings.

**Оценка**
- согласованность: ✓ Сверено со строкой 10.1.36, с 5.1, с типами элементов списка в node.schema.json и с validate.ts.
- целостность: ✓ s-5hb9k2e34dgn284 оставляет этому узлу элемент без свойства. Двойной отказ устраняется в s-czxaqvaesmu3gru.
- целесообразность: ✓ Без этого свойства у элемента нет значения, которое можно сравнить.
- избыточность: ✓
- недостаточность: ✓

### proposal:s-hhnahzmhahf8jht, rule 8.4: not ready

The removal itself holds. When the owner accepts it, 8.4's `meta.decisions` needs a new entry that replaces the ruling of 2026-11-10 on `declaredIn`.

**Integrity (author can fix).** The `change` field must name the new row and the change to row 10.1.35 (see s-czxaqvaesmu3gru above), and the change to s-gb8s9657a65hqmv.

**WORDING FIX (author, into the proposal).** Change "That rule's `TextRule.list.members` holds" to "That rule's `TextRule.list.members` (§s-eferktypcj7njt5) holds", with a `cites` link. In the Russian: «`TextRule.list.members` (§s-eferktypcj7njt5) этого правила содержит».

**Russian (author, into the proposal).** In paragraphs 2 and 3, «guidelines проекта» means all of a project's guidelines (rule 2.3, 2026-11-13), while the English says "own". The fix: «Правило в собственных guidelines проекта…» and «…между JSON-схемой и собственными guidelines проекта».

**DOUBT (owner; an agreed sentence).** Reason sentence 2 becomes:
- EN: "Nobody approves an extension of the schema, so this rule subjects each such kind, and whether its nodes require an implementation in code, to an owner's approval."
- RU: «Расширение схемы никто не одобряет, поэтому по этому правилу каждый такой тип и то, требуется ли его узлам имплементация в коде, одобряет ответственный.»

**DOUBT (owner; an example).**
- EN: "A project adds the kind `procedure` for the steps that an operator carries out by hand. Its extension of the schema declares `\"procedure\": {\"needsCode\": false, \"schema\": {}}` in the field `kinds`. The rule of the project's own guidelines that refines the rule on a project's own kinds of node has `TextRule.list.property` set to `name`, and its `TextRule.list.members` holds `{\"name\": \"procedure\", \"needsCode\": false}`. The most likely mistake is to declare the kind only in the extension of the schema, which nobody approves."
- RU: «Проект добавляет тип `procedure` для шагов, которые оператор выполняет вручную. Его расширение схемы объявляет `"procedure": {"needsCode": false, "schema": {}}` в поле `kinds`. У правила собственных guidelines проекта, которое уточняет правило о собственных типах узлов, `TextRule.list.property` — `name`, а его `TextRule.list.members` содержит `{"name": "procedure", "needsCode": false}`. Самая вероятная ошибка — объявить тип только в расширении схемы, которое никто не одобряет.»

**Оценка**
- согласованность: ✓ Сверено с решениями по строке 10.1.35 от 2026-11-13, с решениями по 8.3 и 8.4 от 2026-11-10, с 5.2 и с s-czxaqvaesmu3gru.
- целостность: ✗ После правки текст строки 10.1.35 к правилу 8.4 не относится, и проверку из 8.4 не называет ни одна строка таблицы 10.1. s-gb8s9657a65hqmv нужен пункт о `declaredIn`, который указывает на поле `kinds`. `change` не называет ни того, ни другого.
- целесообразность: ✓ Убранное предложение обещало проверку по схеме, а в поле `kinds` такой схемы нет.
- избыточность: ✓
- недостаточность: ✓ Правило со списком находится по связи `refines` (s-czxaqvaesmu3gru, «What the SpecSheriff tools read in the project's own guidelines»).

**TERM.** No new terms. The gloss for `needsCode` stays in the notes' list for the docs.

### Findings only the owner can answer

1. The new reason sentence of rule 8.4 (an agreed sentence).
2. The example proposed for rule 8.4.

The owner also sees, as proposals, the new row after 10.1.35 and the change to s-gb8s9657a65hqmv.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/review-input-g3b-d.md
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group3-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/impl.json
