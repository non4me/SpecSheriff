# Group 5 drafts for the follow-up review (generated 2026-11-24T20:31:22.369Z)

## An identifier followed to its end | key s-3anv9qcmx8pwp2w | sid s-3anv9qcmx8pwp2w | tools 7.1.17

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a field with `identifierOf` (§s-qpdnkejr5xzc6j3) only where both of the following hold:

its `identifierOf` names a RecordType (§s-7vm323mhry2enx3) that names, in its `identifiedBy`, one of its fields as the field that identifies its data records (§s-6eb92ddch7shuvu);

the chain of identifiers that starts at the field ends in a field without `identifierOf` (§s-cqys6wqrnfzu5ac).

`sheriff validate` refuses any other field with `identifierOf`, naming the RecordType that holds it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also names the field and each condition that the field fails. It names the field by the JSON Pointer to the field's schema within the RecordType's `schema`, such as `/properties/accounts/items`.

The chain of identifiers that starts at a field goes to the field that identifies the data records of the RecordType that the field's `identifierOf` names. Where that field has `identifierOf` too, the chain goes on in the same way. A chain that goes to the identifying field of the same RecordType a second time never ends.

A RecordType's fields here are those that it declares in its `schema` (§s-6eb92ddch7shuvu) and those that it takes through `refines` (§s-sn6au3vcr9uy5pm) from another RecordType. `sheriff validate` makes this check wherever a RecordType's `schema` holds `identifierOf`, at any depth, such as in the schema of the members of a list.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-qpdnkejr5xzc6j3, §s-cqys6wqrnfzu5ac).

### Reason

A field with `identifierOf` takes its type from the field at the end of its chain of identifiers (§s-6eb92ddch7shuvu, §s-cqys6wqrnfzu5ac). The types and RuntimeChecks generated from the RecordType that holds the field (§s-e877bnfa559tvk9) can therefore give the field a type only where that chain has an end.

### Examples

```json
[
  {
    "en": "The RecordType `statement` has a field `accountId` whose `identifierOf` names the RecordType `account`. The `identifiedBy` of the RecordType `account` names its field `number`, of type `string`. The chain that starts at `accountId` ends at `number`, and `sheriff validate` accepts the field. The RecordTypes `left` and `right` are each identified by a field whose `identifierOf` names the other, so their chains never end. `sheriff validate` refuses both fields. The most likely mistake is to follow only the first step of each chain, which would accept both fields.",
    "ru": "У RecordType `statement` есть поле `accountId`, `identifierOf` которого называет RecordType `account`. `identifiedBy` RecordType `account` называет его поле `number` типа `string`. Цепочка, которая начинается у `accountId`, кончается на `number`, и `sheriff validate` принимает поле. RecordType `left` и `right` идентифицируются каждый полем, `identifierOf` которого называет другой, поэтому их цепочки не кончаются никогда. `sheriff validate` отвергает оба поля. Самая вероятная ошибка — пройти только первый шаг каждой цепочки: тогда оба поля были бы приняты."
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
  }
]
```

### The current node

Title: An identifier followed to its end

`sheriff validate` looks up the RecordType that each field of type `identifier of` names. Among the fields of that RecordType, it looks up the one the RecordType names as identifying it.

- Where that field is itself an identifier, the RecordType it names is followed in the same way, until a field of another type is reached.
- A RecordType reached twice is refused.

Reason: (none)

## A RecordType that refers to a RecordType outside its part of the system | key s-ezq8csd433vj6fj | sid s-ezq8csd433vj6fj | tools 7.1.14

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` lets a reference from one RecordType (§s-7vm323mhry2enx3) to another pass without a report only in the following cases (§s-8ht2hn88cu2qwz9):

from a RecordType outside the contracts section (§s-z6tq6a3btnvvwx7), to a RecordType of the same part of the system or to a fragment of a format (§s-7vm323mhry2enx3, §s-rpkq8y79fwg5k92);

from a fragment of a format, to another fragment of a format (§s-hn9m9dhxaazjn3y).

`sheriff validate` reports each RecordType that holds any other reference, naming by its sid both that RecordType and the RecordType that it refers to (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y). The change still passes.

A RecordType refers to another RecordType in either of these ways:

its `schema` (§s-6eb92ddch7shuvu) holds, at any depth, a `$ref` that points to that RecordType or an `identifierOf` that names it (§s-qpdnkejr5xzc6j3);

it has a `refines` link (§s-sn6au3vcr9uy5pm) to that RecordType.

A fragment of a format is a RecordType of the contracts section. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the part of the system that a RecordType belongs to is the domain whose files hold the RecordType. Otherwise, it is the section of `specs/base/` that holds the RecordType and whose location (§s-kag2m9tzdnduxdx) is `base/` followed by a single number. The RecordTypes in `specs/base/` that no such section holds are treated as together forming one part of the system.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).

### Reason

A RecordType can refer to another RecordType at any depth of its `schema` and through its `refines` links. So only a check that reads all of them finds each reference that breaks the rule on what a RecordType may refer to (§s-8ht2hn88cu2qwz9).

### Examples

```json
[
  {
    "en": "In the domain `requests`, the RecordType of a request has a field `address` with a `$ref` to the fragment of a format named `address`. It also has a field `user` whose `identifierOf` names the RecordType of a user in the domain `users`. `sheriff validate` reports the RecordType of a request, naming by its sid both it and the RecordType of a user, and lets the change pass. The most likely mistake is to leave the reference in the field `user` unreported because that field holds only an identifier. To keep a user's identifier without such a reference, the domain `requests` uses a field of type `string`.",
    "ru": "В домене `requests` у RecordType заявки есть поле `address` с `$ref` на фрагмент формата с именем `address`. Есть у него и поле `user`, `identifierOf` которого называет RecordType пользователя в домене `users`. `sheriff validate` сообщает о RecordType заявки, называя по sid и его, и RecordType пользователя, и пропускает изменение. Самая вероятная ошибка — не сообщать о ссылке в поле `user` потому, что это поле содержит только идентификатор. Чтобы хранить идентификатор пользователя без такой ссылки, домен `requests` использует поле типа `string`."
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
  }
]
```

### The current node

Title: A used domain's RecordType, only from the declared sections

A using domain takes a RecordType of a used domain only from the sections its domain's header names in its `consumes` links. Otherwise `sheriff validate` reports it (§s-5yvpn4zhuqmv5bq).

- A RecordType names another by a field's type or by its `refines` link.
- The report gives the sid of the RecordType that names the other. The change is not refused.

Reason: (none)
