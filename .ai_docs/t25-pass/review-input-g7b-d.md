# Group 7 drafts for the review (generated 2026-11-25T12:20:52.405Z)

## A RecordType that its variants refine | key s-nk8td3ez58gahc4 | sid s-nk8td3ez58gahc4 | tools 19

### Text

For a RecordType that has RecordType variants (§s-z3dnru6qqdf9m6j), `sheriff types` writes a definition and a type that also describe the fields of each variant. Otherwise, it writes them as it writes those of any RecordType (§s-suv42g8r3ra2h6b). The variants of such a RecordType are the RecordType variants whose RecordType it is, as the check of RecordType variants determines (§s-c2r9jndrjbtbsv6), each in the approved wording from which `sheriff types` generates (§s-a8fn72xa782wvbk). `sheriff types` takes them in the order in which it takes the RecordTypes.

In a file of RuntimeChecks (§s-e877bnfa559tvk9), the RecordType's definition also holds a pair of `if` and `then` for each of its variants, at the end of its `allOf`:

`if` is `{"properties": {<field>: {"const": <value>}, …}, "required": [<field>, …]}`, with each field and value that the variant's `answersTo` (§s-c2r9jndrjbtbsv6) names;

`then` is `{"$ref": "#<sid>"}`, with the sid of the variant, which points to the variant's definition.

A variant's definition is written as the definition of any RecordType, except that it holds only the fields that the variant adds to its RecordType. These are the fields that the variant declares and the fields of each RecordType that it reaches through `refines` links (§s-sn6au3vcr9uy5pm), other than its RecordType and the RecordTypes that its RecordType reaches.

In a file of types, the RecordType's type is the union of the following members, each a type of its own:

for each variant, the variant's type;

where a combination of values of the fields that select a variant has no variant, a type for the combinations that have no variant, whose name is the name of the RecordType's type followed by `Other`.

The type of a variant is written as the type of any RecordType (§s-suv42g8r3ra2h6b), except that each field that selects a variant is required in it and takes only the value that the variant's `answersTo` (§s-c2r9jndrjbtbsv6) names.

The type for the combinations that have no variant holds the RecordType's fields. Where one field selects a variant, that field takes only the values to which no variant corresponds. Where several fields select a variant, each of them takes all its values.

The union is written `export type <name> = <member> | …` in TypeScript and `<name> = Union["<member>", …]` in Python. The union has the SpecTag (§s-5z5gnu7pahr82xp) of the RecordType. Each member has the SpecTag of the RecordType that it comes from: a variant's type has the SpecTag of the variant, and the type for the combinations that have no variant has the SpecTag of the RecordType.

The values of a field that selects a variant are those that the SpecSheriff tools collect for it (§s-5nf87c3e3jg9v7c).

### Reason

A data record holds the fields of its RecordType together with those of the RecordType variant that its values select (§s-z3dnru6qqdf9m6j). The types and RuntimeChecks generated from the RecordType describe such a data record in the form that each language has for fields that depend on the value of another field.

### Examples

```json
[
  {
    "en": "The RecordType `notification` names `channel` in its `chosenBy`, and the values of `channel` are `email`, `sms` and `app`. Its variants, titled “notification by email” and “notification by SMS”, correspond to `email` and `sms`, and the first declares the guaranteed field `address`. Its definition holds a pair of `if` and `then` for each of them, and its type `Notification` is the union of `NotificationByEmail`, `NotificationBySMS` and `NotificationOther`, in which `channel` takes only `app`. The most likely mistake is to let `channel` take every value in `NotificationOther`, so a data record whose `channel` is `email` and that has no `address` is accepted by the type.",
    "ru": "RecordType `notification` называет `channel` в своём `chosenBy`, а значения `channel` — `email`, `sms` и `app`. Его варианты с названиями «notification by email» и «notification by SMS» соответствуют `email` и `sms`, и первый объявляет гарантированное поле `address`. Его определение содержит по паре `if` и `then` для каждого из них, а его тип `Notification` — объединение `NotificationByEmail`, `NotificationBySMS` и `NotificationOther`, в котором `channel` принимает только `app`. Самая вероятная ошибка — позволить `channel` принимать в `NotificationOther` любое значение: тогда тип принимает запись данных, у которой `channel` равно `email` и нет `address`."
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
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
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
| `{"const": <its value>}` | the literal of its value | `Literal[<its value>]` | — |
| `{"enum": [<its values>]}` | the union of its values as literals | `Literal[<its values>]` | one of, with a list of its own |
| `{"x-enumSource": <its source>}` | the union of the values gathered beside it (§s-ju5vcanbjph7mgh) as literals | `Literal[<the values gathered beside it>]` | one of, with values from elsewhere |
| `{"oneOf": [<its members' schemas>]}` or `{"anyOf": [<its members' schemas>]}` | the union of the types that its members give | `Union[<the types that its members give>]` | — |
| `{"allOf": [<its members' schemas>]}` | the intersection of the types that its members give | a `TypedDict` of its own, which holds the fields of every member | — |
| `{"type": [<its types>]}` | the union of the types that the schema gives with each of its types in place of the list | `Union[<those types>]` | — |
| `{"type": "null"}` | `null` | `None` | — |
| `{"type": "string"}` | `string` | `str` | text |
| `{"type": "string", "format": "email"}` | `string` | `str` | email address |
| `{"type": "string", "format": "date-time"}` | `string` | `str` | instant |
| `{"type": "string", "format": "date"}` | `string` | `str` | date |
| `{"type": "string", "format": "duration"}` | `string` | `str` | duration |
| `{"type": "integer"}`, with its bounds | `number` | `int` | whole number |
| `{"type": "number"}`, with its bounds | `number` | `float` | number |
| `{"type": "boolean"}` | `boolean` | `bool` | yes/no |
| `{"type": "array", "items": <its members' schema>}`, with its bounds on how many members it holds | `<its members' type>[]` | `list[<its members' type>]` | list of |
| `{"properties": {<its fields>}}` | an object type written inline, its fields given as the fields of a RecordType are given (§s-suv42g8r3ra2h6b) | a `TypedDict` of its own | — |
| `{"type": "object", "additionalProperties": <its values' schema>}` | `Record<string, <its values' type>>` | `dict[str, <its values' type>]` | map of |
| `{}` | `unknown` | `Any` | any value |

A field's schema falls under the first row of the table whose keywords it holds with the values that the row gives. In a row, a value in angle brackets means any value of the kind that it names. Any other keyword of a field's schema, such as `description`, `format` or a bound, leaves the type as the row gives it. A schema that falls under no other row falls under the last, `{}`. The same table gives the type of the members of a list, of the values of a map and of the members of `oneOf`, `anyOf` and `allOf` from their schemas.

A field with `identifierOf` that fails the check of an identifier followed to its end (§s-3anv9qcmx8pwp2w) gives what `{}` gives.

In Python, `Literal` holds only a string, a whole number, `true`, `false` or `null`, so a `const` with any other value gives what `{}` gives. An `allOf` gives a `TypedDict` of its own in Python only where each of its members gives an object type, and gives what `{}` gives otherwise. That `TypedDict` holds the fields of the members, in the order of the members. A field that several members declare has the type that the last of them gives, as a field that a RecordType takes through `refines` does (§s-suv42g8r3ra2h6b).

In Python, each object written inline and each `allOf` that gives a `TypedDict` is written as a `TypedDict` of its own, after the type that uses it and with the same SpecTag. Its name begins with the name of the type of the RecordType whose `schema` holds it. One part follows for each step from that `schema` down to it, each with its first letter changed to uppercase:

for a field, the field's name;

for the members of a list, `Item`;

for the values of a map, `Value`;

for a member of `oneOf`, `anyOf` or `allOf`, its position in the list of members, counted from one.

For example, the object written inline as the field `address` of the RecordType `user` gives the `TypedDict` `UserAddress`. Such a name, too, cannot be generated in the cases that the node on what is generated from a RecordType lists (§s-suv42g8r3ra2h6b).

A RecordType's `schema` names another RecordType only in the following forms:

a `$ref` whose value is `#` followed by the other RecordType's sid, which points to the `$anchor` of that RecordType's definition (§s-suv42g8r3ra2h6b);

an `identifierOf` whose value is the other RecordType's sid.

`sheriff types` takes each value gathered beside a field (§s-ju5vcanbjph7mgh) once, in the type and in the RuntimeCheck (§s-e877bnfa559tvk9) in the same way, at the place where the value first appears in the field's `x-enumSource.gathered` (§s-5nf87c3e3jg9v7c).

In a file of RuntimeChecks, `sheriff types` writes each field's schema as the RecordType's `schema` holds it, with the following changes at any depth:

`x-enumSource` is replaced by `enum`, which holds the values gathered beside the field;

`identifierOf` is replaced, at the same position, by every keyword of the schema of the field at the end of the chain of identifiers, other than that schema's `description`;

where the field fails the check of an identifier followed to its end (§s-3anv9qcmx8pwp2w), `identifierOf` is removed.

### Reason

JSON Schema is the standard for which every language has a validator. So a field's schema serves as its RuntimeCheck, which checks in the same way in every language what a type in TypeScript or Python cannot state, such as a bound or a format. Each language's own type for a value is the one that its code reads without a conversion. An identifier has the type of the field that identifies the data records of the RecordType that it names. So a value that moves from that field to a field that refers to it keeps its type and passes the same RuntimeCheck.

### Examples

```json
[
  {
    "en": "The `schema` of the RecordType `statement` holds `\"accountId\": {\"identifierOf\": \"s-…\", \"description\": \"The account.\"}`, where `s-…` is the sid of the RecordType `account`. The field that identifies `account` is `number`, whose schema is `{\"type\": \"string\", \"maxLength\": 34}`. In TypeScript, `accountId` has the type `string`, and in the RuntimeChecks its schema is `{\"type\": \"string\", \"maxLength\": 34, \"description\": \"The account.\"}`. The most likely mistake is to leave `identifierOf` in the RuntimeCheck: a JSON Schema validator does not recognise that keyword, so it does not check that `accountId` is a string.",
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

## A RecordType that refers to a RecordType outside its part of the system | key proposal:s-ezq8csd433vj6fj-g7 | sid s-ezq8csd433vj6fj | tools 7.1.14

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` stays silent about a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases (§s-8ht2hn88cu2qwz9):

from a RecordType outside the contracts section (§s-z6tq6a3btnvvwx7), to a RecordType of its own part of the system or to a fragment of a format (§s-7vm323mhry2enx3, §s-rpkq8y79fwg5k92);

from a fragment of a format, to another fragment of a format (§s-hn9m9dhxaazjn3y).

`sheriff validate` reports each RecordType that holds any other reference, naming that RecordType and each RecordType that it refers to by such a reference, each by its sid (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y). The change still passes.

A RecordType refers to another RecordType in either of these ways:

its `schema` (§s-6eb92ddch7shuvu) names that RecordType at any depth, by a `$ref` or by an `identifierOf` (§s-4npdup7mjkva69y, §s-qpdnkejr5xzc6j3);

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
