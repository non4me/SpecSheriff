# Group 3 drafts for the confirming review (generated 2026-11-24T12:15:12.086Z)

## A list and its declaration | key s-5hb9k2e34dgn284 | sid s-5hb9k2e34dgn284 | tools 7.2.6

### Text

`sheriff binding` accepts a `TextRule.list` (§s-eferktypcj7njt5) only where each of the following holds (§s-f5mm7tagez38ffz):

where the list has a `TextRule.list.jsonSchema`, each of its values is valid, under JSON Schema 2020-12, against the schema at the place to which that property points;

where the schema at that place holds the keyword `enum`, directly or through `$ref`, each value of that `enum` is one of the list's values;

where the list has a `TextRule.list.valueList`, the symbol (§s-kgbzk2ph9e6jfb4) to which that property points declares exactly the list's values.

`sheriff binding` refuses every other `TextRule.list`, naming the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming each value concerned. Where the file, the place or the symbol to which the list points cannot be found, the refusal names it.

Each member of a list gives one of the list's values. For a member that is an object, the value is the value of its property that `TextRule.list.property` names. `sheriff binding` checks a list only where each of its members that is an object holds that property, which the check of an object in a list requires (§s-cdachayybfvg4na).

A symbol declares the text of each string literal within its lines, as the SpecSheriff tools read a file whose language a description covers (§s-33fw3ga4ctd94dq). A value of the list matches such a literal where the value, written as text, is the literal's text.

`sheriff binding` checks the list of each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). The lists of a project's own kinds of node (§s-vsh384ybt4w25a2) are checked only by the check of those lists (§s-czxaqvaesmu3gru). `sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-f5mm7tagez38ffz).

### Reason

A rule's list and the schema or the code that declares the same values are written separately, so either can gain or lose a value unnoticed. Comparing them at every commit keeps the values that the system accepts in line with those that the rule states.

### Examples

```json
[
  {
    "en": "A rule lists the states of a request: `open`, `done` and `cancelled`. Its `TextRule.list.jsonSchema` points to `#/properties/state` in `schema/request.schema.json`, and the schema at that place holds `\"enum\": [\"open\", \"done\", \"cancelled\", \"held\"]`. `sheriff binding` refuses the list and names `held`, a value of the `enum` that the list does not hold. The most likely mistake is to check only that each value of the list is valid against the schema. All three are, so a state that the schema accepts and the rule does not state would pass.",
    "ru": "Правило перечисляет состояния запроса: `open`, `done` и `cancelled`. Его `TextRule.list.jsonSchema` указывает на `#/properties/state` в `schema/request.schema.json`, и схема в этом месте содержит `\"enum\": [\"open\", \"done\", \"cancelled\", \"held\"]`. `sheriff binding` отвергает список и называет `held` — значение `enum`, которого нет в списке. Самая вероятная ошибка — проверять только, что каждое значение списка корректно относительно схемы. Это верно для всех трёх, поэтому состояние, которое схема принимает, а правило не утверждает, прошло бы."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-f5mm7tagez38ffz"
  },
  {
    "type": "cites",
    "to": "s-eferktypcj7njt5"
  },
  {
    "type": "cites",
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-cdachayybfvg4na"
  },
  {
    "type": "cites",
    "to": "s-33fw3ga4ctd94dq"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-vsh384ybt4w25a2"
  },
  {
    "type": "cites",
    "to": "s-czxaqvaesmu3gru"
  }
]
```

### The current node

Title: A list and its declaration

`sheriff binding` compares the members of each list a node holds with the declaration the list names in the code, the schema or the settings. A member that is an object is compared by the property the list names.

Reason: (none)

## The list of a project's own kinds of node | key new:tools-7-2-own-kinds | sid s-czxaqvaesmu3gru | tools 7.2.6a (new, after "A list and its declaration")

### Text

`sheriff binding` accepts the kinds of node that the project's extension of the schema adds in its field `kinds` (§s-xm8rz4uupb73gu5) only where each of the following holds (§s-hhnahzmhahf8jht, §s-f5mm7tagez38ffz):

taken together, the members of the `TextRule.list` (§s-eferktypcj7njt5) of the rules in the project's own guidelines (§s-u7tw6m8npxmv5tu) that refine the rule on a project's own kinds of node (§s-vsh384ybt4w25a2) include a member for each of those kinds;

each such member gives its kind the same `needsCode` as the field `kinds` gives it;

each such member names one of those kinds.

`sheriff binding` refuses a commit after which a kind or a member fails one of the conditions above. The refusal names each such kind or member. For a member, it also names the rule that lists the member, by that rule's file, sid and location (§s-kag2m9tzdnduxdx).

A member names a kind by its property that `TextRule.list.property` names (§s-cdachayybfvg4na). It gives the kind's `needsCode` by its property `needsCode`. `sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-f5mm7tagez38ffz).

### Reason

A project's own kind of node is declared in the extension of the schema, which nobody approves, but listed in a rule, which an owner approves (§s-hhnahzmhahf8jht). Comparing the two keeps each kind, and whether its nodes require an implementation in code, in line with what an owner has approved.

### Examples

```json
[
  {
    "en": "The project's extension of the schema adds the kind `procedure` with `needsCode: true`, and the rule that lists the project's own kinds lists `procedure` with `needsCode: false`. `sheriff binding` refuses the commit and names `procedure`. The most likely mistake is to compare only the names of the kinds. The rule would then say that the nodes of the kind `procedure` require no code, while the schema says that they do.",
    "ru": "Расширение схемы проекта добавляет тип `procedure` с `needsCode: true`, а правило, которое перечисляет собственные типы проекта, перечисляет `procedure` с `needsCode: false`. `sheriff binding` отвергает коммит и называет `procedure`. Самая вероятная ошибка — сравнивать только имена типов. Тогда правило говорило бы, что узлам типа `procedure` код не требуется, а схема — что требуется."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-f5mm7tagez38ffz"
  },
  {
    "type": "implements",
    "to": "s-hhnahzmhahf8jht"
  },
  {
    "type": "cites",
    "to": "s-xm8rz4uupb73gu5"
  },
  {
    "type": "cites",
    "to": "s-vsh384ybt4w25a2"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-cdachayybfvg4na"
  },
  {
    "type": "cites",
    "to": "s-eferktypcj7njt5"
  },
  {
    "type": "cites",
    "to": "s-u7tw6m8npxmv5tu"
  }
]
```

### The current node

(none: this node is new)

## An object in a list | key s-cdachayybfvg4na | sid s-cdachayybfvg4na | tools 7.1.19

### Text

`sheriff validate` accepts a member of a `TextRule.list` (§s-eferktypcj7njt5) that is an object only where `TextRule.list.property` names a property and the member holds that property (§s-yuu4ccgch68yzxb). It refuses any other such member. The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), the member's position in the list and, where the list names one, the property.

`sheriff validate` checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It makes this check regardless of whether the specification is approved or a draft (§s-yuu4ccgch68yzxb).

### Reason

The value of a member that is an object is the value of its property that `TextRule.list.property` names. `sheriff binding` compares that value with the schema or the symbol to which the list points (§s-5hb9k2e34dgn284), so a member without that property has no value to compare.

### Examples

```json
[
  {
    "en": "A rule lists the roles of a user as objects, and its `TextRule.list.property` is `name`. One member is `{\"title\": \"operator\"}`. `sheriff validate` refuses that member and names `name`. The most likely mistake is to take the member's only property as its value.",
    "ru": "Правило перечисляет роли пользователя как объекты, и его `TextRule.list.property` — `name`. Один из элементов — `{\"title\": \"operator\"}`. `sheriff validate` отвергает этот элемент и называет `name`. Самая вероятная ошибка — считать значением элемента его единственное свойство."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-yuu4ccgch68yzxb"
  },
  {
    "type": "cites",
    "to": "s-eferktypcj7njt5"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-5hb9k2e34dgn284"
  }
]
```

### The current node

Title: An object in a list

`sheriff validate` reads each member of a `TextRule.list` that is an object for the property the list names (§s-v7vd4ydrwexsgsj). A member lacking it is refused.

Reason: (none)

## How a project's own kind of node is declared and checked | key proposal:s-hhnahzmhahf8jht | sid s-hhnahzmhahf8jht | spec 8.4

### Text

A project adds a new kind of node to its JSON Schema, in the field `kinds` (§s-xm8rz4uupb73gu5).
Through its `schema`, a new kind of node may add fields of its own, beyond those the schema of the SpecSheriff guidelines sets for every node.
A kind's `needsCode` says whether its nodes require an implementation in code.

A rule in the project's own guidelines refines the rule on a project's own kinds of node (§s-vsh384ybt4w25a2). That rule's `TextRule.list.members` holds each added kind of node with its `needsCode`. That rule's `TextRule.list.property` names the key holding a kind's name.

At each commit, a check verifies that the JSON Schema and the project's own guidelines agree on the name and `needsCode` of each new kind of node (§s-jau82aq9juv9zzh).

### Reason

Only the project knows whether the nodes of a kind it adds are carried out by code, by tools or by people. Nobody approves an extension of the schema, so a rule lists those kinds.

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-xm8rz4uupb73gu5"
  },
  {
    "type": "cites",
    "to": "s-vsh384ybt4w25a2"
  },
  {
    "type": "cites",
    "to": "s-jau82aq9juv9zzh"
  }
]
```

### The current node

Title: How a project's own kind of node is declared and checked

A project adds a new kind of node to its JSON Schema, in the field `kinds` (§s-xm8rz4uupb73gu5).
Through its `schema`, a new kind of node may add fields of its own, beyond those the schema of the SpecSheriff guidelines sets for every node.
A kind's `needsCode` says whether its nodes require an implementation in code.

A rule in the project's own guidelines refines the rule on a project's own kinds of node (§s-vsh384ybt4w25a2). That rule's `TextRule.list.members` holds each added kind of node with its `needsCode`. That rule's `TextRule.list.property` names the key holding a kind's name. That rule's `TextRule.list.declaredIn` refers to the field `kinds` of the JSON Schema.

At each commit, a check verifies that the JSON Schema and the project's own guidelines agree on the name and `needsCode` of each new kind of node (§s-jau82aq9juv9zzh).

Reason: Only the project knows whether the nodes of a kind it adds are carried out by code, by tools or by people. Nobody approves an extension of the schema, so a rule lists those kinds.
