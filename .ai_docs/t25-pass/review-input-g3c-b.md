# Group 3 drafts for the final review (generated 2026-11-24T12:40:26.307Z)

## A node's `meta.code` and `meta.tests` | key s-t383grkn3q68dpf | sid s-t383grkn3q68dpf | tools 7.2.5

### Text

`sheriff binding` refuses each node whose `meta.code` or `meta.tests` (§s-rwqzepmrt77rv35) differs from the list that `sheriff reindex` would write there (§s-ztseyetus7np6br) from the SpecTags (§s-8xw4mgvpexyvw5q) as the commit leaves the code and the tests (§s-tqdmk6jakx97wra). The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and gives that list.

`sheriff binding` compares the entries of a node's `meta.code` and `meta.tests` regardless of their order. It checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It makes this check regardless of whether the specification is approved or a draft (§s-tqdmk6jakx97wra).

### Reason

`sheriff reindex` writes a node's `meta.code` and `meta.tests` from the SpecTags (§s-ztseyetus7np6br), but a person may edit them by hand or commit without running it. A list that differs from the SpecTags would show a reader code or tests that are not bound to the node, or would hide some that are.

### Examples

```json
[
  {
    "en": "Rule R is implemented by the function `render` in `src/page.ts` and by `src/texts.json`, which the bindings file binds to R. The `meta.code` of R names both files, and `sheriff binding` accepts it. The most likely mistake is to take into account only the SpecTags placed above symbols, which would make `sheriff binding` refuse that `meta.code` for naming `src/texts.json`.",
    "ru": "Правило R реализуют функция `render` в `src/page.ts` и файл `src/texts.json`, который файл привязок привязывает к R. `meta.code` правила R называет оба файла, и `sheriff binding` его принимает. Самая вероятная ошибка — учитывать только SpecTag над символами: тогда `sheriff binding` отверг бы этот `meta.code` за то, что он называет `src/texts.json`."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-tqdmk6jakx97wra"
  },
  {
    "type": "cites",
    "to": "s-rwqzepmrt77rv35"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
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
    "to": "s-ztseyetus7np6br"
  }
]
```

### The current node

Title: A node's `meta.code` and `meta.tests`

`sheriff binding` collects the SpecTags on the code and on the tests across the repository, and compares them with each node's `meta.code` and `meta.tests`.

Reason: (none)

## A list and its declaration | key s-5hb9k2e34dgn284 | sid s-5hb9k2e34dgn284 | tools 7.2.6

### Text

`sheriff binding` accepts a `TextRule.list` (§s-eferktypcj7njt5) only where each of the following holds (§s-f5mm7tagez38ffz):

where the list has a `TextRule.list.jsonSchema`, each of its values is valid, under JSON Schema 2020-12, against the schema at the place to which that property points;

where the schema at that place holds the keyword `enum`, directly or through `$ref`, each value of that `enum` is one of the list's values;

where the list has a `TextRule.list.valueList`, the symbol (§s-kgbzk2ph9e6jfb4) to which that property points declares exactly the list's values.

`sheriff binding` refuses every other `TextRule.list`, naming the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming each value concerned. Where the file, the place or the symbol to which the list points cannot be found, the refusal names the one that is missing.

Each member of a list gives one of the list's values. For a member that is an object, the value is the value of the property that `TextRule.list.property` names. `sheriff binding` checks a list only where each of its members that is an object holds that property, which the check of an object in a list requires (§s-cdachayybfvg4na).

A symbol declares the text of each string literal within its lines, as the SpecSheriff tools read a file whose language a description covers (§s-33fw3ga4ctd94dq). A value of the list matches such a literal where the value, written as text, is the literal's text.

`sheriff binding` checks the list of each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). `sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-f5mm7tagez38ffz).

### Reason

A rule's list and the schema or the code that declares the same values are written separately, so either can gain or lose a value unnoticed. Comparing them at every commit keeps the values that the system accepts in line with those that the rule states.

### Examples

```json
[
  {
    "en": "A rule lists the states of a request: `open`, `done` and `cancelled`. The rule's `TextRule.list.jsonSchema` points to `#/properties/state` in `schema/request.schema.json`, and the schema at that place holds `\"enum\": [\"open\", \"done\", \"cancelled\", \"held\"]`. `sheriff binding` refuses the list and names `held`, a value of the `enum` that the list does not hold. The most likely mistake is to check only that each value of the list is valid against the schema. All three are, so a state that the schema accepts and the rule does not state would pass.",
    "ru": "Правило перечисляет состояния запроса: `open`, `done` и `cancelled`. `TextRule.list.jsonSchema` этого правила указывает на `#/properties/state` в `schema/request.schema.json`, и схема в этом месте содержит `\"enum\": [\"open\", \"done\", \"cancelled\", \"held\"]`. `sheriff binding` отвергает список и называет `held` — значение `enum`, которого нет в списке. Самая вероятная ошибка — проверять только, что каждое значение списка корректно относительно схемы. Это верно для всех трёх, поэтому состояние, которое схема принимает, а правило не утверждает, прошло бы."
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
  }
]
```

### The current node

Title: A list and its declaration

`sheriff binding` compares the members of each list a node holds with the declaration the list names in the code, the schema or the settings. A member that is an object is compared by the property the list names.

Reason: (none)

## The list of a project's own kinds of node | key new:tools-7-2-own-kinds | sid s-czxaqvaesmu3gru | tools 7.2.6a (new, after "A list and its declaration")

### Text

`sheriff binding` accepts the kinds of node that the project's extension of the schema adds in its field `kinds` (§s-xm8rz4uupb73gu5) only where each of the following holds (§s-hhnahzmhahf8jht, §s-cgkkksc7efxhcst):

taken together, the members of the `TextRule.list` (§s-eferktypcj7njt5) of the rules in the project's own guidelines (§s-u7tw6m8npxmv5tu) that refine the rule on a project's own kinds of node (§s-vsh384ybt4w25a2) include a member for each of those kinds;

each member of the `TextRule.list` of those rules gives its kind the same `needsCode` as the field `kinds` gives it;

each member of the `TextRule.list` of those rules names one of those kinds.

`sheriff binding` refuses a commit after which a kind or a member fails one of the conditions above. The refusal names each such kind or member. For a member, it also names the rule that lists the member, by that rule's file, sid and location (§s-kag2m9tzdnduxdx).

A member names a kind by its property that `TextRule.list.property` names (§s-cdachayybfvg4na). It gives the kind's `needsCode` by its property `needsCode`. `sheriff binding` compares the kinds with the members only where each member that is an object holds the property that `TextRule.list.property` names, which the check of an object in a list requires (§s-cdachayybfvg4na). `sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-cgkkksc7efxhcst).

### Reason

A project's own kind of node is declared in the extension of the schema, which nobody approves, but listed in a rule, which an owner approves (§s-hhnahzmhahf8jht). Comparing the two keeps the declaration of each kind, including whether its nodes require an implementation in code, in line with what an owner has approved.

### Examples

```json
[
  {
    "en": "The project's extension of the schema adds the kind `procedure` with `needsCode: true`, and the rule that lists the project's own kinds lists `procedure` with `needsCode: false`. `sheriff binding` refuses the commit and names `procedure`. The most likely mistake is to compare only the names of the kinds. The commit would then pass, although the rule says that the nodes of the kind `procedure` require no code and the schema says that they do.",
    "ru": "Расширение схемы проекта добавляет тип `procedure` с `needsCode: true`, а правило, которое перечисляет собственные типы проекта, перечисляет `procedure` с `needsCode: false`. `sheriff binding` отвергает коммит и называет `procedure`. Самая вероятная ошибка — сравнивать только имена типов. Тогда коммит прошёл бы, хотя правило говорит, что узлам типа `procedure` код не требуется, а схема — что требуется."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-cgkkksc7efxhcst"
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

The value of a member that is an object is the value of the property that `TextRule.list.property` names. `sheriff binding` compares that value with the schema or the symbol to which the list points (§s-5hb9k2e34dgn284), so a member without that property has no value to compare.

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

A rule in the project's own guidelines refines the rule on a project's own kinds of node (§s-vsh384ybt4w25a2). That rule's `TextRule.list.members` (§s-eferktypcj7njt5) holds each added kind of node with its `needsCode`. That rule's `TextRule.list.property` names the key holding a kind's name.

At each commit, a check verifies that the JSON Schema and the project's own guidelines agree on the name and `needsCode` of each new kind of node (§s-jau82aq9juv9zzh).

### Reason

Only the project knows whether the nodes of a kind it adds are carried out by code, by tools or by people. Nobody approves an extension of the schema, so this rule subjects each such kind, and whether its nodes require an implementation in code, to an owner's approval.

### Examples

```json
[
  {
    "en": "A project adds the kind `procedure` for the steps that an operator carries out by hand. Its extension of the schema declares `\"procedure\": {\"needsCode\": false, \"schema\": {}}` in the field `kinds`. The rule of the project's own guidelines that refines the rule on a project's own kinds of node has `TextRule.list.property` set to `name`, and its `TextRule.list.members` holds `{\"name\": \"procedure\", \"needsCode\": false}`. The most likely mistake is to declare the kind only in the extension of the schema, which nobody approves.",
    "ru": "Проект добавляет тип `procedure` для шагов, которые оператор выполняет вручную. Его расширение схемы объявляет `\"procedure\": {\"needsCode\": false, \"schema\": {}}` в поле `kinds`. У правила собственных guidelines проекта, которое уточняет правило о собственных типах узлов, `TextRule.list.property` — `name`, а его `TextRule.list.members` содержит `{\"name\": \"procedure\", \"needsCode\": false}`. Самая вероятная ошибка — объявить тип только в расширении схемы, которое никто не одобряет."
  }
]
```

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
  },
  {
    "type": "cites",
    "to": "s-eferktypcj7njt5"
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

## What `sheriff reindex` changes in what an earlier release wrote | key proposal:s-gb8s9657a65hqmv-g3 | sid s-gb8s9657a65hqmv | tools 2.3 (new)

### Text

`sheriff reindex` rewrites whatever an earlier release of the SpecSheriff tools wrote or read differently from the release that `sheriff reindex` belongs to. It does so after it has merged the duplicate keys (§s-w5wg69pvvhedsws), and before it validates the files. In every file of the specification and of its archive, it makes the following changes:

a node's key `id` becomes `location`, and a node's key `rationale` becomes `reason`;

the kinds of node `record` and `recordType` become `RecordType`, `rule` becomes `TextRule`, and `domain` becomes `header`;

a node's status `""` becomes `draft`, and `checked` becomes `approved`;

a node's key `owner`, which holds an email address, becomes `owners`, which holds a list that contains that email address;

a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), as follows: each field becomes a property whose schema is the one given for the field's neutral type (§s-4npdup7mjkva69y); the field's `text` becomes the property's `description`; each field that the RecordType marks as required is listed in the schema's `required`; a field that is required only "where it holds a value" becomes an optional property; and `unknown: "refused"` becomes `additionalProperties: false`;

the source of a field's values becomes the field's `x-enumSource` (§s-xfu2gpzddjnmgks);

`TextRule.list.declaredIn` is removed where it points to the field `kinds` of the project's extension of the schema (§s-xm8rz4uupb73gu5);

`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema` where it points to any other place in a JSON Schema;

`TextRule.list.declaredIn` becomes `TextRule.list.valueList` where it names a declaration in code;

a link of the type `supersedes` is removed (§s-sn6au3vcr9uy5pm);

a node of the archive loses its sid and every link that points to it (§s-f2b5zvc565s242f, §s-bpdqd9v72wg7vsz).

A renamed key keeps its place among the node's keys. A kind of node is also renamed where a field's values are the sids of that kind's nodes, and where the project's extension of the schema declares `fields` for that kind.

A bare sid is a word that has the form of a sid and occurs in one of these places:

it opens a test's name, followed by a space or by the end of the name;

it is the only argument of the test's mark.

`sheriff reindex` also makes the following changes:

`specs/_confirmations.jsonl` becomes `specs/_approvals.jsonl`, and the key `owner` in each of its lines becomes `by`;

where `specs/_approvals.jsonl` already exists, the lines of `specs/_confirmations.jsonl`, with that key renamed, are appended to it, and `specs/_confirmations.jsonl` is removed;

until `sheriff.config.json` holds an entry that sets the specification's approval status, an approved rule of `project.json` that refines the rule on that status (§s-qzthyh7yqvfhsa2) is replaced by an entry that approves the specification;

that entry names the owner who last approved that rule;

that rule is moved to the archive (§s-f2b5zvc565s242f), with the reason "Replaced by the entry in `sheriff.config.json` that records the specification's approval status";

the key `writesSpecSheriffGuidelines` is removed from `sheriff.config.json` (§s-zefk589ykh37b8u) before the SpecSheriff tools validate that file;

in each file that `sheriff.config.json` names as tests of the system's code or of a project's own check or generator, `@spec ` is inserted before each bare sid.

`sheriff reindex` leaves unchanged a RecordType that holds a field of type `variant`, a field whose values come from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field.

Where a node of the specification is of a kind, or holds a link of a type, that an extension of the guidelines adds, and the project has yet to choose that extension (§s-9ttvcwpqkehm58g), `sheriff reindex` names that extension.

A renamed key and a renamed kind of node leave a node's fingerprint unchanged (§s-v4qus7raqnwzneb). `sheriff reindex` names each file that it changes in this way, including the files of the specification.

### Reason

Each file and each test of a project is written in the form of the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them differently rewrites them, so that nobody has to rewrite a project by hand and no approval is lost because of a rename.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-jsqxdx47wkkj7gp"
  },
  {
    "type": "implements",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "implements",
    "to": "s-f2b5zvc565s242f"
  },
  {
    "type": "implements",
    "to": "s-5ah25f6gy99panq"
  },
  {
    "type": "cites",
    "to": "s-w5wg69pvvhedsws"
  },
  {
    "type": "cites",
    "to": "s-6eb92ddch7shuvu"
  },
  {
    "type": "cites",
    "to": "s-xfu2gpzddjnmgks"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-v4qus7raqnwzneb"
  },
  {
    "type": "cites",
    "to": "s-4npdup7mjkva69y"
  },
  {
    "type": "cites",
    "to": "s-bpdqd9v72wg7vsz"
  },
  {
    "type": "cites",
    "to": "s-xm8rz4uupb73gu5"
  }
]
```

### The wording the owner agreed to (new:tools-2-reindex-earlier)

Title: What `sheriff reindex` changes in what an earlier release wrote

`sheriff reindex` rewrites whatever an earlier release of the SpecSheriff tools wrote or read differently from the release that `sheriff reindex` belongs to. It does so after it has merged the duplicate keys (§s-w5wg69pvvhedsws), and before it validates the files. In every file of the specification and of its archive, it makes the following changes:

a node's key `id` becomes `location`, and a node's key `rationale` becomes `reason`;

the kinds of node `record` and `recordType` become `RecordType`, `rule` becomes `TextRule`, and `domain` becomes `header`;

a node's status `""` becomes `draft`, and `checked` becomes `approved`;

a node's key `owner`, which holds an email address, becomes `owners`, which holds a list that contains that email address;

a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), as follows: each field becomes a property whose schema is the one given for the field's neutral type (§s-4npdup7mjkva69y); the field's `text` becomes the property's `description`; each field that the RecordType marks as required is listed in the schema's `required`; a field that is required only "where it holds a value" becomes an optional property; and `unknown: "refused"` becomes `additionalProperties: false`;

the source of a field's values becomes the field's `x-enumSource` (§s-xfu2gpzddjnmgks);

`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema` where it points to a place in a JSON Schema;

`TextRule.list.declaredIn` becomes `TextRule.list.valueList` where it names a declaration in code;

a link of the type `supersedes` is removed (§s-sn6au3vcr9uy5pm);

a node of the archive loses its sid and every link that points to it (§s-f2b5zvc565s242f, §s-bpdqd9v72wg7vsz).

A renamed key keeps its place among the node's keys. A kind of node is also renamed where a field's values are the sids of that kind's nodes, and where the project's extension of the schema declares `fields` for that kind.

A bare sid is a word that has the form of a sid and occurs in one of these places:

it opens a test's name, followed by a space or by the end of the name;

it is the only argument of the test's mark.

`sheriff reindex` also makes the following changes:

`specs/_confirmations.jsonl` becomes `specs/_approvals.jsonl`, and the key `owner` in each of its lines becomes `by`;

where `specs/_approvals.jsonl` already exists, the lines of `specs/_confirmations.jsonl`, with that key renamed, are appended to it, and `specs/_confirmations.jsonl` is removed;

until `sheriff.config.json` holds an entry that sets the specification's approval status, an approved rule of `project.json` that refines the rule on that status (§s-qzthyh7yqvfhsa2) is replaced by an entry that approves the specification;

that entry names the owner who last approved that rule;

that rule is moved to the archive (§s-f2b5zvc565s242f), with the reason "Replaced by the entry in `sheriff.config.json` that records the specification's approval status";

the key `writesSpecSheriffGuidelines` is removed from `sheriff.config.json` (§s-zefk589ykh37b8u) before the SpecSheriff tools validate that file;

in each file that `sheriff.config.json` names as tests of the system's code or of a project's own check or generator, `@spec ` is inserted before each bare sid.

`sheriff reindex` leaves unchanged a RecordType that holds a field of type `variant`, a field whose values come from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field.

Where a node of the specification is of a kind, or holds a link of a type, that an extension of the guidelines adds, and the project has yet to choose that extension (§s-9ttvcwpqkehm58g), `sheriff reindex` names that extension.

A renamed key and a renamed kind of node leave a node's fingerprint unchanged (§s-v4qus7raqnwzneb). `sheriff reindex` names each file that it changes in this way, including the files of the specification.

Reason: Each file and each test of a project is written in the form of the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them differently rewrites them, so that nobody has to rewrite a project by hand and no approval is lost because of a rename.

## null | key proposal:row-10-1-35a | sid s-cgkkksc7efxhcst | spec 10.1.35a (new row of the main table of checks, after row 10.1.35)

### Text

Each kind of node that the project's extension of the schema (§s-xm8rz4uupb73gu5) adds is listed, with the same `needsCode`, in the rules of the project's own guidelines that refine the rule on a project's own kinds of node (§s-vsh384ybt4w25a2). Each kind that those rules list is one that the extension adds

### Reason

(none)

### Outgoing links

```json
[
  {
    "type": "checks",
    "to": "s-hhnahzmhahf8jht"
  },
  {
    "type": "cites",
    "to": "s-xm8rz4uupb73gu5"
  },
  {
    "type": "cites",
    "to": "s-vsh384ybt4w25a2"
  }
]
```

### The current node

(none: this node is new)
