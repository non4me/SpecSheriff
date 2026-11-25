# Group 7 drafts for the review (generated 2026-11-25T11:46:52.576Z)

## A RecordType its variants refine | key s-nk8td3ez58gahc4 | sid s-nk8td3ez58gahc4 | tools 19

### Text

A RecordType of which RecordType variants exist (§s-z3dnru6qqdf9m6j) generates, besides what any RecordType generates (§s-suv42g8r3ra2h6b), what this node says. Its variants are the RecordType variants whose RecordType it is, as the check of RecordType variants determines (§s-c2r9jndrjbtbsv6). `sheriff types` takes them in the order in which it takes the RecordTypes.

In a file of RuntimeChecks, the RecordType's definition also holds `allOf`, with a pair of `if` and `then` for each of its variants:

`if` is `{"properties": {<field>: {"const": <value>}, …}, "required": [<field>, …]}`, with each field and value that the variant's `answersTo` names;

`then` is `{"$ref": "#<sid>"}`, with the sid of the variant, which points to the variant's definition.

A variant's definition is written as the definition of any RecordType, except that it holds only the fields that the variant adds to its RecordType. These are the fields that the variant declares and the fields of each RecordType that it reaches through `refines` links (§s-sn6au3vcr9uy5pm), other than its RecordType and the RecordTypes that its RecordType reaches.

In a file of types, the RecordType's type is the union of the following members, each a type of its own:

for each variant, a type whose name is that of the variant's type (§s-suv42g8r3ra2h6b);

where a combination of values of the fields that select a variant has no variant, a type for the other combinations, whose name is the name of the RecordType's type followed by `Other`.

A combination of values holds one value of each field that selects a variant. The type of a variant holds the RecordType's fields, followed by the fields that the variant adds. In it, each field that selects a variant is required and takes only the value that the variant's `answersTo` names.

The type for the other combinations holds the RecordType's fields. Where one field selects a variant, that field takes only the values to which no variant corresponds. Where several fields select a variant, each of them takes all its values.

The union is written `export type <name> = <member> | …` in TypeScript and `<name> = Union["<member>", …]` in Python. The union has the SpecTag of the RecordType. Each member has the SpecTag of the RecordType that it comes from: a variant's type that of the variant, and the type for the other combinations that of the RecordType.

The values of a field that selects a variant are those that the SpecSheriff tools collect for it (§s-5nf87c3e3jg9v7c).

### Reason

A data record holds the fields of its RecordType together with those of the RecordType variant that its values select (§s-z3dnru6qqdf9m6j). JSON Schema states this with pairs of `if` and `then`. TypeScript and Python state it with a union of flat types, which the values of the fields that select a variant tell apart.

### Examples

```json
[
  {
    "en": "The RecordType `notification` names `channel` in its `chosenBy`, and the values of `channel` are `email`, `sms` and `app`. Its variants, titled “notification by email” and “notification by SMS”, correspond to `email` and `sms`. Its definition holds a pair of `if` and `then` for each of them, and its type `Notification` is the union of `NotificationByEmail`, `NotificationBySMS` and `NotificationOther`, in which `channel` takes only `app`. The most likely mistake is to let `channel` take every value in `NotificationOther`, so that a data record whose `channel` is `email` and that has no `address` passes the type.",
    "ru": "RecordType `notification` называет `channel` в своём `chosenBy`, а значения `channel` — `email`, `sms` и `app`. Его варианты с названиями «notification by email» и «notification by SMS» соответствуют `email` и `sms`. Его определение содержит по паре `if` и `then` для каждого из них, а его тип `Notification` — объединение `NotificationByEmail`, `NotificationBySMS` и `NotificationOther`, в котором `channel` принимает только `app`. Самая вероятная ошибка — позволить `channel` принимать в `NotificationOther` любое значение: тогда запись данных, у которой `channel` равно `email` и нет `address`, проходит проверку типа."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-e877bnfa559tvk9"
  },
  {
    "type": "cites",
    "to": "s-z3dnru6qqdf9m6j"
  },
  {
    "type": "cites",
    "to": "s-suv42g8r3ra2h6b"
  },
  {
    "type": "cites",
    "to": "s-c2r9jndrjbtbsv6"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-5nf87c3e3jg9v7c"
  }
]
```

### The current node

Title: A RecordType its variants refine

A RecordType that variants refine is written as the union of its members. Its variants are RecordTypes each answering to values of its choosing fields. The choosing fields are the fields whose values choose which variant a RecordType is.

The union is written:

- in JSON Schema, as a definition holding `oneOf` the members;
- in TypeScript, as a union type;
- in Python, as `<name> = Union[...]`.

Its members are:

- each variant, referred to by the name of its type;
- where some combination of the choosing fields' values has no variant, a member for those combinations.

The member for those combinations is named by the RecordType's name followed by `Other`. It has a type and a definition of its own. The type carries a SpecTag with the RecordType's sid.

A variant holds each choosing field, required and fixed to the value it answers to. It holds its own fields:

- inside the RecordType's field of type `variant`, beside the fields that field holds;
- where the RecordType has no such field, beside the RecordType's fields.

The variant's node decides whether a property nobody declared is refused there and around it.

The member for the other combinations holds the RecordType's fields, its choosing fields required where their node says so. Its definition refuses every combination of values a variant answers to. Its type gives a choosing field:

- where one field chooses, the values no variant answers to;
- where several fields choose, all its values.

The RecordType's node decides whether a property nobody declared is refused.

A field of type `variant` is required where its object holds a field and is not declared otherwise, whether or not variants refine its RecordType.

Reason: A union whose members the choosing fields tell apart is how JSON Schema, TypeScript and Python each state that a RecordType's fields depend on its values. With the choosing fields required in every variant, at most one member matches.

A value that brings no fields of its own has no variant, as the rule on variants says (§s-z3dnru6qqdf9m6j). So the RecordType itself answers for it, under a name its own name gives and with its own SpecTag.

Each member follows its own node on undeclared properties, so that no node's setting overrides another's. A RuntimeCheck can refuse every combination of values a variant claims. A type can name only the values each field holds, which is exact where one field chooses.

An object with no field in it holds nothing, so the field for it is not declared.

## The type that the schema of a field gives | key s-4npdup7mjkva69y | sid s-4npdup7mjkva69y | tools 20

### Text

Within a RecordType's `schema` (§s-6eb92ddch7shuvu), the schema of each field gives, in TypeScript and in Python, the type that the table below names. The last column of the table names the neutral type that an earlier release of the SpecSheriff tools wrote in place of each schema (§s-gb8s9657a65hqmv).

| Field's schema | TypeScript | Python | Neutral type that an earlier release wrote |
|---|---|---|---|
| `{"$ref": "#<sid>"}` | the name of the type of the RecordType that has that sid | that name, as a string | record |
| `{"identifierOf": "<sid>"}` | what the field at the end of its chain of identifiers gives (§s-3anv9qcmx8pwp2w) | what that field gives | identifier of |
| `{"enum": [<its values>]}` | the union of its values as literals | `Literal[<its values>]` | one of, with a list of its own |
| `{"x-enumSource": <its source>}` | the union of the values gathered beside it as literals | `Literal[<the values gathered beside it>]` | one of, with values from elsewhere |
| `{"type": "string"}` | `string` | `str` | text |
| `{"type": "string", "format": "email"}` | `string` | `str` | email address |
| `{"type": "string", "format": "date-time"}` | `string` | `str` | instant |
| `{"type": "string", "format": "date"}` | `string` | `str` | date |
| `{"type": "string", "format": "duration"}` | `string` | `str` | duration |
| `{"type": "integer"}`, with its bounds | `number` | `int` | whole number |
| `{"type": "number"}`, with its bounds | `number` | `float` | number |
| `{"type": "boolean"}` | `boolean` | `bool` | yes/no |
| `{"type": "array", "items": <its members' schema>}`, with its bounds on how many members it holds | `<its members' type>[]` | `list[<its members' type>]` | list of |
| `{"type": "object", "additionalProperties": <its values' schema>}`, with no `properties` | `Record<string, <its values' type>>` | `dict[str, <its values' type>]` | map of |
| `{}` | `unknown` | `Any` | any value |

A field's schema falls under the first row of the table whose keywords it holds with the values that the row gives. In a row, a value in angle brackets means any value of the kind that it names. Any other keyword of a field's schema, such as `description`, `format` or a bound, leaves the type as the row gives it. The same table gives the type of the members of a list and of the values of a map from their schemas.

The rows that give the same type, such as those whose schema holds `{"type": "string"}`, are listed apart because an earlier release wrote each of them as a neutral type of its own.

A field with `identifierOf` gives what `{}` gives where its chain of identifiers has no end.

A RecordType's `schema` names another RecordType only in the following forms:

a `$ref` whose value is `#` followed by the RecordType's sid, which points to the `$anchor` of that RecordType's definition (§s-suv42g8r3ra2h6b);

an `identifierOf` whose value is the RecordType's sid.

Each value gathered beside a field (§s-ju5vcanbjph7mgh) is taken once, at the place where it first appears in the field's `x-enumSource.gathered` (§s-5nf87c3e3jg9v7c). The types and the RuntimeChecks take the values alike.

In a file of RuntimeChecks, `sheriff types` writes each field's schema as the RecordType's `schema` holds it, with the following changes at any depth:

`x-enumSource` is replaced by `enum`, which holds the values gathered beside the field;

`identifierOf` is replaced, in its place, by each keyword of the schema of the field at the end of the chain of identifiers, other than that schema's `description`;

where that chain has no end, `identifierOf` is removed.

### Reason

JSON Schema is the standard for which every language has a validator. So a field's schema serves as its RuntimeCheck, which checks alike in every language what a type in TypeScript or Python cannot state, such as a bound or a format. Each language's own type for a value is the one that its code reads without a conversion. An identifier has the type of the field that identifies the RecordType that it names. So a value that moves from that field to a field that refers to it keeps its type and passes the same RuntimeCheck.

### Examples

```json
[
  {
    "en": "The `schema` of the RecordType `statement` holds `\"accountId\": {\"identifierOf\": \"s-…\", \"description\": \"The account.\"}`, where `s-…` is the sid of the RecordType `account`. The field that identifies `account` is `number`, whose schema is `{\"type\": \"string\", \"maxLength\": 34}`. In TypeScript, `accountId` has the type `string`, and in the RuntimeChecks its schema is `{\"type\": \"string\", \"maxLength\": 34, \"description\": \"The account.\"}`. The most likely mistake is to leave `identifierOf` in the RuntimeCheck: a JSON Schema validator does not know that keyword, so it does not check that `accountId` is a string.",
    "ru": "`schema` RecordType `statement` содержит `\"accountId\": {\"identifierOf\": \"s-…\", \"description\": \"The account.\"}`, где `s-…` — sid RecordType `account`. Поле, которое идентифицирует `account`, — `number` со схемой `{\"type\": \"string\", \"maxLength\": 34}`. На TypeScript у `accountId` тип `string`, а в RuntimeChecks его схема — `{\"type\": \"string\", \"maxLength\": 34, \"description\": \"The account.\"}`. Самая вероятная ошибка — оставить `identifierOf` в RuntimeCheck: валидатор JSON Schema этого слова не знает и потому не проверяет, что `accountId` — строка."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-e877bnfa559tvk9"
  },
  {
    "type": "cites",
    "to": "s-6eb92ddch7shuvu"
  },
  {
    "type": "cites",
    "to": "s-gb8s9657a65hqmv"
  },
  {
    "type": "cites",
    "to": "s-3anv9qcmx8pwp2w"
  },
  {
    "type": "cites",
    "to": "s-suv42g8r3ra2h6b"
  },
  {
    "type": "cites",
    "to": "s-ju5vcanbjph7mgh"
  },
  {
    "type": "cites",
    "to": "s-5nf87c3e3jg9v7c"
  }
]
```

### The current node

Title: The type each neutral type of a field gives

Each neutral type a field may have gives what the table below says, in a file of RuntimeChecks and in a file of types.

A field of type `one of` gives the values of its own list, in its order. Where its values come from elsewhere, it gives those gathered beside it (§s-ju5vcanbjph7mgh), in this order:

- by the node each comes from, the files of the specification in the code-point order of their paths and the nodes of a file in the order they stand;
- the members of one list in their order.

| Field's type | JSON Schema | TypeScript | Python |
|---|---|---|---|
| text | `{"type": "string"}` | `string` | `str` |
| email address | `{"type": "string", "format": "email"}` | `string` | `str` |
| whole number | `{"type": "integer"}`, with its bounds | `number` | `int` |
| number | `{"type": "number"}`, with its bounds | `number` | `float` |
| yes/no | `{"type": "boolean"}` | `boolean` | `bool` |
| instant | `{"type": "string", "format": "date-time"}` | `string` | `str` |
| date | `{"type": "string", "format": "date"}` | `string` | `str` |
| duration | `{"type": "string", "format": "duration"}` | `string` | `str` |
| any value | `{}` | `unknown` | `Any` |
| one of | `{"enum": [<its values>]}` | the union of its values as literals | `Literal[<its values>]` |
| list of | `{"type": "array", "items": <its members' type>}`, with its bounds on how many members it holds | `<its members' type>[]` | `list[<its members' type>]` |
| map of | `{"type": "object", "additionalProperties": <its values' type>}` | `Record<string, <its values' type>>` | `dict[str, <its values' type>]` |
| record | `{"$ref": "#/$defs/<its type's name>"}` | its type's name | its type's name, as a string |
| identifier of | what the field identifying that RecordType gives | what that field gives | what that field gives |
| variant | an object holding its fields | an object holding its fields | its own type |

Reason: JSON Schema is the standard every language has a validator for. The bounds on a number's value and on how many members a field of type `list of` holds are already named in the nodes as JSON Schema names them.

Each language's own type for a value is the one its code reads without a conversion. An instant, a date and a duration travel as text, each in the form of ISO 8601 its `format` names.

A bound is carried by the RuntimeChecks alone, which run alike in every language. A type in Python can state none.

An identifier has the type of the field that identifies the RecordType it names. That way a value moving from that field to a field referring to it keeps its type and passes the same RuntimeCheck.

The generator reads a field's values in one place, whatever their source. `sheriff validate` already compares the gathered values with their source (§s-agc6fb3vx46pc23), so the generator collects nothing again. A fixed order makes each file come out the same at every run, which the comparison of generated copies needs.

## An identifier followed to its end | key proposal:s-3anv9qcmx8pwp2w-g7 | sid s-3anv9qcmx8pwp2w | tools 7.1.17

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a field with `identifierOf` (§s-qpdnkejr5xzc6j3) only where both of the following hold:

its `identifierOf` holds the sid of a RecordType (§s-7vm323mhry2enx3, §s-4npdup7mjkva69y) that names, in its `identifiedBy`, one of its fields as the field that identifies its data records (§s-6eb92ddch7shuvu);

the chain of identifiers that starts at the field ends in a field without `identifierOf` (§s-cqys6wqrnfzu5ac).

`sheriff validate` refuses any other field with `identifierOf`, naming the RecordType that holds it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also names the field and each condition that the field fails. It names the field by the JSON Pointer to the field's schema within the RecordType's `schema`, such as `/properties/accounts/items`.

The chain of identifiers that starts at a field goes to the field that identifies the data records of the RecordType that the field's `identifierOf` names. Where that field has `identifierOf` too, the chain goes on in the same way. A chain has no end if it comes back to a field that is already in it.

A RecordType's fields here are those that it declares in its `schema` (§s-6eb92ddch7shuvu) and those that it takes through `refines` (§s-sn6au3vcr9uy5pm) from another RecordType. `sheriff validate` makes this check wherever a RecordType's `schema` holds `identifierOf`, at any depth, such as in the schema of the members of a list.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-qpdnkejr5xzc6j3, §s-cqys6wqrnfzu5ac).

### Reason

A field with `identifierOf` takes its type from the field at the end of its chain of identifiers (§s-6eb92ddch7shuvu, §s-cqys6wqrnfzu5ac). The types and RuntimeChecks generated from the RecordType that holds the field (§s-e877bnfa559tvk9) can therefore give the field a type only where that chain has an end.

### Examples

```json
[
  {
    "en": "The RecordType `statement` has a field `accountId` whose `identifierOf` names the RecordType `account`. The `identifiedBy` of the RecordType `account` names its field `number`, of type `string`. The chain that starts at `accountId` ends at `number`, and `sheriff validate` accepts the field. The RecordTypes `left` and `right` are each identified by a field whose `identifierOf` names the other RecordType, so the chains that start at those fields never end. `sheriff validate` refuses both fields. The most likely mistake is to follow only the first step of each chain and so accept both fields.",
    "ru": "У RecordType `statement` есть поле `accountId`, `identifierOf` которого называет RecordType `account`. `identifiedBy` RecordType `account` называет его поле `number` типа `string`. Цепочка, которая начинается у `accountId`, кончается на `number`, и `sheriff validate` принимает поле. RecordType `left` и `right` идентифицируются каждый полем, `identifierOf` которого называет другой RecordType, поэтому цепочки, которые начинаются у этих полей, не кончаются никогда. `sheriff validate` отвергает оба поля. Самая вероятная ошибка — пройти только первый шаг каждой цепочки и так принять оба поля."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-qpdnkejr5xzc6j3"
  },
  {
    "type": "implements",
    "to": "s-cqys6wqrnfzu5ac"
  },
  {
    "type": "cites",
    "to": "s-hzuzn8hbq6q9q4s"
  },
  {
    "type": "cites",
    "to": "s-7vm323mhry2enx3"
  },
  {
    "type": "cites",
    "to": "s-6eb92ddch7shuvu"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-e877bnfa559tvk9"
  },
  {
    "type": "cites",
    "to": "s-xfu2gpzddjnmgks"
  },
  {
    "type": "cites",
    "to": "s-4npdup7mjkva69y"
  }
]
```

### The wording the owner agreed to (s-3anv9qcmx8pwp2w)

Title: An identifier followed to its end

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a field with `identifierOf` (§s-qpdnkejr5xzc6j3) only where both of the following hold:

its `identifierOf` names a RecordType (§s-7vm323mhry2enx3) that names, in its `identifiedBy`, one of its fields as the field that identifies its data records (§s-6eb92ddch7shuvu);

the chain of identifiers that starts at the field ends in a field without `identifierOf` (§s-cqys6wqrnfzu5ac).

`sheriff validate` refuses any other field with `identifierOf`, naming the RecordType that holds it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also names the field and each condition that the field fails. It names the field by the JSON Pointer to the field's schema within the RecordType's `schema`, such as `/properties/accounts/items`.

The chain of identifiers that starts at a field goes to the field that identifies the data records of the RecordType that the field's `identifierOf` names. Where that field has `identifierOf` too, the chain goes on in the same way. A chain has no end if it comes back to a field that is already in it.

A RecordType's fields here are those that it declares in its `schema` (§s-6eb92ddch7shuvu) and those that it takes through `refines` (§s-sn6au3vcr9uy5pm) from another RecordType. `sheriff validate` makes this check wherever a RecordType's `schema` holds `identifierOf`, at any depth, such as in the schema of the members of a list.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-qpdnkejr5xzc6j3, §s-cqys6wqrnfzu5ac).

Reason: A field with `identifierOf` takes its type from the field at the end of its chain of identifiers (§s-6eb92ddch7shuvu, §s-cqys6wqrnfzu5ac). The types and RuntimeChecks generated from the RecordType that holds the field (§s-e877bnfa559tvk9) can therefore give the field a type only where that chain has an end.

## A RecordType that refers to a RecordType outside its part of the system | key proposal:s-ezq8csd433vj6fj-g7 | sid s-ezq8csd433vj6fj | tools 7.1.14

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` stays silent about a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases (§s-8ht2hn88cu2qwz9):

from a RecordType outside the contracts section (§s-z6tq6a3btnvvwx7), to a RecordType of its own part of the system or to a fragment of a format (§s-7vm323mhry2enx3, §s-rpkq8y79fwg5k92);

from a fragment of a format, to another fragment of a format (§s-hn9m9dhxaazjn3y).

`sheriff validate` reports each RecordType that holds any other reference, naming that RecordType and each RecordType that it refers to by such a reference, each by its sid (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y). The change still passes.

A RecordType refers to another RecordType in either of these ways:

its `schema` (§s-6eb92ddch7shuvu) holds, at any depth, a `$ref` that points to that RecordType or an `identifierOf` that names it, in the forms in which a RecordType's `schema` names another RecordType (§s-4npdup7mjkva69y, §s-qpdnkejr5xzc6j3);

it has a `refines` link (§s-sn6au3vcr9uy5pm) to that RecordType.

A fragment of a format is a RecordType in the contracts section. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the part of the system that a RecordType belongs to is the domain whose files hold the RecordType. Otherwise, it is the section of `specs/base/` that holds the RecordType and whose location (§s-kag2m9tzdnduxdx) is `base/` followed by a single number. The RecordTypes in `specs/base/` that no such section holds are treated as together forming one part of the system.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).

### Reason

A RecordType can refer to another RecordType at any depth of its `schema` and through its `refines` links. So only a check that reads a RecordType's whole `schema` and all its `refines` links finds each reference that breaks the rule on what a RecordType may refer to (§s-8ht2hn88cu2qwz9).

### Examples

```json
[
  {
    "en": "In the domain `requests`, the RecordType of a request has a field `deliveryAddress` with a `$ref` to `address`, a fragment of a format. It also has a field `user` whose `identifierOf` names the RecordType of a user in the domain `users`. `sheriff validate` reports that RecordType, naming it and the RecordType of a user, each by its sid, and lets the change pass. The most likely mistake is to leave the reference in the field `user` unreported because that field holds only an identifier. A field `user` that holds only a user's identifier, with no reference to the RecordType of a user, has the type `string` and no `identifierOf`.",
    "ru": "В домене `requests` у RecordType заявки есть поле `deliveryAddress` с `$ref` на `address` — фрагмент формата. Есть у него и поле `user`, `identifierOf` которого называет RecordType пользователя в домене `users`. `sheriff validate` сообщает об этом RecordType, называя по sid его и RecordType пользователя, и пропускает изменение. Самая вероятная ошибка — не сообщать о ссылке в поле `user` потому, что это поле содержит только идентификатор. У поля `user`, которое хранит только идентификатор пользователя, без ссылки на RecordType пользователя, тип `string` и нет `identifierOf`."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-rpkq8y79fwg5k92"
  },
  {
    "type": "implements",
    "to": "s-hn9m9dhxaazjn3y"
  },
  {
    "type": "cites",
    "to": "s-hzuzn8hbq6q9q4s"
  },
  {
    "type": "cites",
    "to": "s-7vm323mhry2enx3"
  },
  {
    "type": "cites",
    "to": "s-8ht2hn88cu2qwz9"
  },
  {
    "type": "cites",
    "to": "s-z6tq6a3btnvvwx7"
  },
  {
    "type": "cites",
    "to": "s-6eb92ddch7shuvu"
  },
  {
    "type": "cites",
    "to": "s-qpdnkejr5xzc6j3"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-tdm3rwsppnuh6dm"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-4npdup7mjkva69y"
  }
]
```

### The wording the owner agreed to (s-ezq8csd433vj6fj)

Title: A RecordType that refers to a RecordType outside its part of the system

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` stays silent about a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases (§s-8ht2hn88cu2qwz9):

from a RecordType outside the contracts section (§s-z6tq6a3btnvvwx7), to a RecordType of its own part of the system or to a fragment of a format (§s-7vm323mhry2enx3, §s-rpkq8y79fwg5k92);

from a fragment of a format, to another fragment of a format (§s-hn9m9dhxaazjn3y).

`sheriff validate` reports each RecordType that holds any other reference, naming that RecordType and each RecordType that it refers to by such a reference, each by its sid (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y). The change still passes.

A RecordType refers to another RecordType in either of these ways:

its `schema` (§s-6eb92ddch7shuvu) holds, at any depth, a `$ref` that points to that RecordType or an `identifierOf` that names it (§s-qpdnkejr5xzc6j3);

it has a `refines` link (§s-sn6au3vcr9uy5pm) to that RecordType.

A fragment of a format is a RecordType in the contracts section. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the part of the system that a RecordType belongs to is the domain whose files hold the RecordType. Otherwise, it is the section of `specs/base/` that holds the RecordType and whose location (§s-kag2m9tzdnduxdx) is `base/` followed by a single number. The RecordTypes in `specs/base/` that no such section holds are treated as together forming one part of the system.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).

Reason: A RecordType can refer to another RecordType at any depth of its `schema` and through its `refines` links. So only a check that reads a RecordType's whole `schema` and all its `refines` links finds each reference that breaks the rule on what a RecordType may refer to (§s-8ht2hn88cu2qwz9).
