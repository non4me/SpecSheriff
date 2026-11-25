# Group 5 drafts for the final review (generated 2026-11-24T21:12:46.268Z)

## Where the values of a field with `enum` are collected from | key s-5nf87c3e3jg9v7c | sid s-5nf87c3e3jg9v7c | tools 7.1.18

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the SpecSheriff tools collect the values of a field with `enum` (§s-xfu2gpzddjnmgks) from its source, which is exactly one of the following:

its own list, where the field's schema holds `enum`: the members of that `enum`, in their order;

the names of the parts of the base specification (§s-gqavjzcmubg5pvk, §s-5x737t9nee4zgaa), where the field's `x-enumSource.from` is `parts`;

the sids of the nodes of a project's own kind (§s-mt6auv3jz8m5gzh), where the field's `x-enumSource.from` is `kind`: the sid of each node of the base specification whose kind the field's `x-enumSource.kind` names, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the parts of the base specification are the domains and the contracts section (§s-z6tq6a3btnvvwx7). The name of each such part is the name of its folder under `specs/` (§s-zefk589ykh37b8u), such as `contracts` or `requests`.

Otherwise, the parts of the base specification are the sections whose location (§s-kag2m9tzdnduxdx) is `base/` or `contracts/` followed by a single number. The name of each such part is the title of its section.

`sheriff reindex` writes each value collected from the names of the parts or from the sids into the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br), together with the sid of the node that the value comes from:

for a domain's name, the domain's header (§s-yggv9myedprnaa7);

for the name `contracts`, the first top-level node of the first file of `specs/contracts/` in the code-point order of the files' paths;

for the title of a section, that section;

for a sid, the node whose sid it is.

`sheriff reindex` writes the values in the order of the nodes that they come from: their files in the code-point order of the files' paths, and the nodes of one file in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w).

The SpecSheriff tools collect the values of a field with `enum` at any depth within a RecordType's `schema` (§s-6eb92ddch7shuvu), such as in the schema of the members of a list.

### Reason

A field's values are used by `sheriff reindex`, `sheriff validate`, the check of RecordType variants and `sheriff types` (§s-ztseyetus7np6br, §s-agc6fb3vx46pc23, §s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Collected in a single way, they are the same for each of these uses and on every machine.

### Examples

```json
[
  {
    "en": "In a project that has chosen the Domains extension, the RecordType of an audit log entry has a field `part` whose `x-enumSource.from` is `parts`. The base specification is kept in `specs/contracts/`, `specs/requests/` and `specs/users/`. `sheriff reindex` writes `contracts`, `requests` and `users` into the field's `x-enumSource.gathered`. With `contracts` it writes the sid of the first top-level node of the first file of `specs/contracts/`. With each domain's name it writes the sid of that domain's header. The most likely mistake is to leave out `contracts`, which is a part of the base specification although it is not a domain.",
    "ru": "В проекте, который выбрал расширение Domains, у RecordType записи журнала аудита есть поле `part`, `x-enumSource.from` которого — `parts`. Базовая спецификация хранится в `specs/contracts/`, `specs/requests/` и `specs/users/`. `sheriff reindex` записывает `contracts`, `requests` и `users` в `x-enumSource.gathered` этого поля. Вместе с `contracts` он записывает sid первого узла верхнего уровня первого файла `specs/contracts/`. Вместе с именем каждого домена он записывает sid заголовка этого домена. Самая вероятная ошибка — пропустить `contracts`: это часть базовой спецификации, хотя и не домен."
  },
  {
    "en": "In a project without the Domains extension, `specs/base/` holds the top-level sections titled “Requests” and “Users”, and `specs/contracts/` holds the section titled “Contracts”. The RecordType of an audit log entry has a field `part` whose `x-enumSource.from` is `parts`. That field is given the title of each of those sections, together with the sid of that section. The most likely mistake is to give the field the names of the folders, `base` and `contracts`.",
    "ru": "В проекте без расширения Domains в `specs/base/` находятся разделы верхнего уровня «Requests» и «Users», а в `specs/contracts/` — раздел «Contracts». У RecordType записи журнала аудита есть поле `part`, `x-enumSource.from` которого — `parts`. Это поле получает название каждого из этих разделов вместе с sid этого раздела. Самая вероятная ошибка — дать полю имена папок, `base` и `contracts`."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-xfu2gpzddjnmgks"
  },
  {
    "type": "implements",
    "to": "s-gqavjzcmubg5pvk"
  },
  {
    "type": "implements",
    "to": "s-mt6auv3jz8m5gzh"
  },
  {
    "type": "cites",
    "to": "s-hzuzn8hbq6q9q4s"
  },
  {
    "type": "cites",
    "to": "s-5x737t9nee4zgaa"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-tdm3rwsppnuh6dm"
  },
  {
    "type": "cites",
    "to": "s-z6tq6a3btnvvwx7"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-yggv9myedprnaa7"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-ju5vcanbjph7mgh"
  },
  {
    "type": "cites",
    "to": "s-ztseyetus7np6br"
  },
  {
    "type": "cites",
    "to": "s-ygg5kpcxgzq3m7w"
  },
  {
    "type": "cites",
    "to": "s-6eb92ddch7shuvu"
  },
  {
    "type": "cites",
    "to": "s-agc6fb3vx46pc23"
  },
  {
    "type": "cites",
    "to": "s-c2r9jndrjbtbsv6"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  }
]
```

### The current node

Title: Where the values of a field of type `one of` are collected

`sheriff validate` collects the values of each field of type `one of` from its one source (§s-xfu2gpzddjnmgks), which is one of these:

- its own list;
- the members of each `TextRule.list` a rule of a domain adds to it. Each such list is found through its rule's `refines` link, which leads to the RecordType of contracts holding the field. The list names that field (§s-gzfq3x8hesj227e);
- the names of the domains;
- the sids of the nodes of the NodeKind it names that stand in the base specification.

It refuses:

- a field holding no value;
- a value found in two lists that rules of domains add to the field;
- a domain's list whose rule refines no RecordType of contracts;
- a domain's list naming a field the RecordType its rule refines does not hold;
- a domain's list naming a field whose source is another;
- a NodeKind named that the schema does not hold.

Reason: (none)

## Fields with `enum` that `sheriff validate` accepts | key new:tools-7-1-enum-values | sid s-dk3zfkbhc3v6xbp | tools 7.1.18a (new, after “Where the values of a field with `enum` are collected from”)

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a field with `enum` (§s-xfu2gpzddjnmgks) only where both of the following hold:

its source gives it at least one value when the SpecSheriff tools collect its values (§s-5nf87c3e3jg9v7c, §s-buug8n5eh7tdnsv);

where its `x-enumSource.from` is `kind`, its `x-enumSource.kind` names one of the kinds of node that the project's extension of the schema adds in its field `kinds` (§s-xm8rz4uupb73gu5, §s-hcgmz4v5avbj3nt).

`sheriff validate` refuses any other field with `enum`, naming the RecordType that holds it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also names the field, each condition that the field fails and, where the field fails the condition on the kind, the kind. It names the field by the JSON Pointer to the field's schema within the RecordType's `schema`, such as `/properties/accounts/items`.

When `sheriff validate` validates the files against the schema of the specification, it refuses a field whose own `enum` holds a value more than once (§s-xzcw3hv4hmxz7h7, §s-upj45kydz8727be). The schema of the RecordType extension requires each `enum` within a RecordType's `schema` (§s-6eb92ddch7shuvu) to hold each value only once.

`sheriff validate` checks each field with `enum` at any depth within the `schema` of each RecordType in the files that the repository keeps. It makes these checks regardless of whether the specification is approved or a draft (§s-upj45kydz8727be, §s-buug8n5eh7tdnsv, §s-hcgmz4v5avbj3nt).

### Reason

The types and RuntimeChecks of a field are generated from its values (§s-e877bnfa559tvk9). A field with no values, or with values that break the rules on their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), would therefore pass the mistake on to the generated code.

### Examples

```json
[
  {
    "en": "The RecordType of a job log entry has a field `step` whose `x-enumSource.from` is `kind` and whose `x-enumSource.kind` is `TextRule`. `sheriff validate` refuses the field and names `TextRule`. Once `x-enumSource.kind` names `jobStep`, a kind that the project's extension of the schema adds, and the base specification holds a node of that kind, the field passes. The most likely mistake is to accept `TextRule` because the schema of the SpecSheriff guidelines defines it.",
    "ru": "У RecordType записи журнала задач есть поле `step`, `x-enumSource.from` которого — `kind`, а `x-enumSource.kind` — `TextRule`. `sheriff validate` отвергает это поле и называет `TextRule`. Когда `x-enumSource.kind` называет `jobStep` — тип узлов, который добавляет расширение схемы проекта, — а в базовой спецификации есть узел этого типа, поле проходит проверку. Самая вероятная ошибка — принять `TextRule` на том основании, что этот тип узлов определяет схема SpecSheriff guidelines."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-upj45kydz8727be"
  },
  {
    "type": "implements",
    "to": "s-buug8n5eh7tdnsv"
  },
  {
    "type": "implements",
    "to": "s-hcgmz4v5avbj3nt"
  },
  {
    "type": "cites",
    "to": "s-hzuzn8hbq6q9q4s"
  },
  {
    "type": "cites",
    "to": "s-xfu2gpzddjnmgks"
  },
  {
    "type": "cites",
    "to": "s-5nf87c3e3jg9v7c"
  },
  {
    "type": "cites",
    "to": "s-xm8rz4uupb73gu5"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-xzcw3hv4hmxz7h7"
  },
  {
    "type": "cites",
    "to": "s-6eb92ddch7shuvu"
  },
  {
    "type": "cites",
    "to": "s-e877bnfa559tvk9"
  },
  {
    "type": "cites",
    "to": "s-mt6auv3jz8m5gzh"
  }
]
```

### The current node

(none: this node is new)
