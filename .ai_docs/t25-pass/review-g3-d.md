## Review of group 3, input g3-d: three drafts

All three drafts are **not ready**. Each needs fixes the author can make, and one question needs the owner's answer.

My input covers three drafts: s-5hb9k2e34dgn284, s-czxaqvaesmu3gru and s-cdachayybfvg4na. Points 1 and 2 of the brief's "Points to look at" are about drafts in `review-input-g3-b.md`, which I did not review.

### Checklist

| Rule | 7.2.6 A list and its declaration | 7.2.6a The list of a project's own kinds | 7.1.19 An object in a list |
|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✗ "gives one of its values": "its" can mean the member or the list | ✗ "the rule that lists it by its file, its sid and its location" reads as if the rule lists the member by its file | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✗ "the lists of the rules", "member": a rule's `TextRule.list` is not cited where it is first used | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✗ "A member names a kind by its property …, and gives the kind's `needsCode` by its property `needsCode`"; in the reason, "declared in the extension of the schema, which nobody approves, and listed in a rule" | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ |
| Pairing test of the reason | ✓ | ✓ | ✓ |

**Оценка: A list and its declaration (s-5hb9k2e34dgn284)**
- согласованность: ✗ Строка 10.1.35 говорит «gives an exact enumeration», а черновик — «holds the keyword `enum`». Поэтому `enum`, к которому ведёт `$ref`, не проверяется; это исправляет автор. Кроме того, исключение списков собственных типов сужает первое предложение строки 10.1.35 (вопрос 1). Сверено со строкой 10.1.35 и её решениями от 2026-11-13, с 5.1, 1.5.2, 8.4, s-gb8s9657a65hqmv, s-33fw3ga4ctd94dq и s-avvnasjhsfkgajh.
- целостность: ✗ По заметкам, в правиле 8.4 `declaredIn` заменяется на `jsonSchema` как «техническая замена». Но `jsonSchema` там значило бы не то, что ему даёт строка 10.1.35 (вопрос 1). С s-cdachayybfvg4na, s-czxaqvaesmu3gru и impl.json всё сходится.
- целесообразность: ✓ Проблема названа: список правила и схема или код расходятся незаметно (строка 10.1.35).
- избыточность: ✓
- недостаточность: ✗ Не сказано, что `sheriff binding` делает со списком, у элемента-объекта которого нет нужного свойства. Без этого значения список неполон, и `sheriff binding` отвергает его ещё раз, за лишнее значение символа или `enum`.

**Оценка: The list of a project's own kinds of node (s-czxaqvaesmu3gru)**
- согласованность: ✗ Черновик берёт все правила, которые уточняют 8.3, где бы они ни стояли. Правило 8.4 и согласованный узел «What the SpecSheriff tools read in the project's own guidelines» берут только правила собственных guidelines проекта. Сверено с 8.3, 8.4 и его решением от 2026-11-10, с 5.2, 10.1.35, s-5z5gnu7pahr82xp и extension.schema.json.
- целостность: ✓ Вместе с исключением в s-5hb9k2e34dgn284 каждый такой список проверяет ровно один узел. Элемент без свойства отвергает s-cdachayybfvg4na.
- целесообразность: ✗ «exactly one» отвергает тип, перечисленный дважды с тем же `needsCode`. Этого не требуют ни правило 8.4, ни решение от 2026-11-10.
- избыточность: ✓
- недостаточность: ✓

**Оценка: An object in a list (s-cdachayybfvg4na)**
- согласованность: ✓ Сверено со строкой 10.1.36, с 5.1, с типами элементов списка в node.schema.json и с validate.ts.
- целостность: ✓ s-5hb9k2e34dgn284 передаёт этому узлу элемент без свойства.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

### Findings

**A list and its declaration: not ready.**
- **WORDING FIX** (author): replace "one of its values" with "one of the list's values". RU: «одно из значений списка».
- **DOUBT** (author; the row's "gives" settles it): the second condition becomes "where the schema at that place holds the keyword `enum`, directly or through `$ref`, each value of that `enum` is one of the list's values;". RU: «если схема в этом месте содержит ключевое слово `enum`, напрямую или через `$ref`, каждое значение этого `enum` — одно из значений списка;».
- **DOUBT** (author; this is what the notes intend by "one fault refused once"): replace "A member that lacks that property is refused only by …" with "`sheriff binding` checks a list only where each of its members that is an object holds that property, which the check of an object in a list requires (§s-cdachayybfvg4na)." RU: «`sheriff binding` проверяет список, только если каждый его элемент, который является объектом, содержит это свойство, чего требует проверка объекта в списке (§s-cdachayybfvg4na).»
- **WORDING FIX** (author): replace "A list of a rule that refines … is checked only by the node on such lists (§s-czxaqvaesmu3gru)." with "The lists of a project's own kinds of node (§s-vsh384ybt4w25a2) are checked only by the check of those lists (§s-czxaqvaesmu3gru)." RU: «Списки собственных типов узлов проекта (§s-vsh384ybt4w25a2) проверяет только проверка этих списков (§s-czxaqvaesmu3gru).»
- **Russian** (author): in the reason, «в границах тех» becomes «в соответствии с теми». The check holds in both directions, and «в границах» says only one.

**The list of a project's own kinds of node: not ready.**
- **DOUBT** (author), the first condition: "taken together, the members of the `TextRule.list` (§s-eferktypcj7njt5) of the rules in the project's own guidelines (§s-u7tw6m8npxmv5tu) that refine the rule on a project's own kinds of node (§s-vsh384ybt4w25a2) include a member for each of those kinds;". RU: «элементы `TextRule.list` (§s-eferktypcj7njt5) правил собственных guidelines проекта (§s-u7tw6m8npxmv5tu), которые уточняют правило о собственных типах узлов проекта (§s-vsh384ybt4w25a2), вместе содержат элемент для каждого из этих типов;». Add `cites` links to both new sids.
  - The third condition becomes "each such member names one of those kinds." RU: «каждый такой элемент называет один из этих типов.»
- **WORDING FIX** (author), the refusal: "The refusal names each such kind or member. For a member, it also names the rule that lists the member, by that rule's file, sid and location (§s-kag2m9tzdnduxdx)." RU: «Отказ называет каждый такой тип или элемент. Для элемента он называет также правило, которое перечисляет этот элемент, — файл, sid и расположение этого правила (§s-kag2m9tzdnduxdx).»
- **WORDING FIX** (author), the third paragraph: "A member names a kind by its property that `TextRule.list.property` names (§s-cdachayybfvg4na). It gives the kind's `needsCode` by its property `needsCode`." RU: «Элемент называет тип своим свойством, которое называет `TextRule.list.property` (§s-cdachayybfvg4na). `needsCode` типа он даёт своим свойством `needsCode`.»
- **WORDING FIX** (author), the reason: "and listed in a rule" becomes "but listed in a rule", and in Russian «и перечисляется» becomes «но перечисляется». Also, «в границах одобренного» becomes «в соответствии с одобренным».

**An object in a list: not ready.**
- **WORDING FIX** (author), the example. A savings account is not something every system has, which CLAUDE.md requires of an example. New wording: "A rule lists the roles of a user as objects, and its `TextRule.list.property` is `name`. One member is `{\"title\": \"operator\"}`. `sheriff validate` refuses that member and names `name`. The most likely mistake is to take the member's only property as its value." RU: «Правило перечисляет роли пользователя как объекты, и его `TextRule.list.property` — `name`. Один из элементов — `{"title": "operator"}`. `sheriff validate` отвергает этот элемент и называет `name`. Самая вероятная ошибка — считать значением элемента его единственное свойство.»
- **WORDING FIX** (author), the reason. s-5hb9k2e34dgn284 no longer speaks of a "declaration", so the reason should not either. Replace "The list's declaration is compared with that value" with "`sheriff binding` compares that value with the schema or the symbol to which the list points". RU: «`sheriff binding` сравнивает это значение со схемой или символом, на которые указывает список».

**TERM.** `needsCode` partly matches OpenFastTrace's "needs" (registry of 2026-11-09). In OpenFastTrace, each item names the kinds of artifact it must be covered in, such as `impl`. `needsCode` is set once for a whole kind of node, and it is true or false. My recommendation is a gloss in the docs only, with no change to any node, since the owner settled the name in 8.4 (inference).

**Point 3 of the brief.** The author's reading holds in part:
- The ruling of 2026-11-10 settles what is compared: the name and the `needsCode`.
- Rule 7.3.3 settles that the check is a node of its own.
- Rule 8.4 ("holds each added kind") settles that a kind no list names is refused.
- Two things are not settled: "exactly one", which the author can fix as above, and the exemption from row 10.1.35, which is question 1.

### The question only the owner can answer

**Q1.** Rule 8.4 says that the list of a project's own kinds points to the field `kinds`. That is the owner's own wording of 2026-11-10: «ссылается на поле `kinds`». The notes plan to rewrite it from `declaredIn` to `jsonSchema` as a technical replacement. Under row 10.1.35, `jsonSchema` means that every value in the list is valid against the schema at that place. The field `kinds` holds no schema for a kind's name. So s-5hb9k2e34dgn284 has to exempt these lists, and the base then promises a check for them that no tool makes.

- **Recommended:** remove the sentence about `declaredIn` from rule 8.4, and show that removal to the owner as a proposal. s-czxaqvaesmu3gru finds the kinds without that sentence, and the three drafts stay as they are. Cost: one agreed rule is reopened, and a list that `sheriff reindex` has already rewritten keeps a `jsonSchema` that no check reads.
- **Alternative:** the author's replacement. Cost: rule 8.4 and row 10.1.35 promise a validation that the appendix of the tools exempts.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/review-input-g3-d.md
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group3-notes.md
