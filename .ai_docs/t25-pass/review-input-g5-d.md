# Group 5 drafts for review (generated 2026-11-24T20:03:26.365Z)

## Where the values of a field with `enum` are collected | key s-5nf87c3e3jg9v7c | sid s-5nf87c3e3jg9v7c | tools 7.1.18

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the SpecSheriff tools collect the values of a field with `enum` (§s-xfu2gpzddjnmgks) from its one source:

its own list: the members of the field's `enum`, in their order;

the names of the parts of the base specification (§s-gqavjzcmubg5pvk), where the field's `x-enumSource.from` is `parts`: the name of each folder under `specs/` that holds a part of the base specification (§s-zefk589ykh37b8u);

the sids of the nodes of a project's own kind (§s-mt6auv3jz8m5gzh), where the field's `x-enumSource.from` is `kind`: the sid of each node of the base specification whose kind the field's `x-enumSource.kind` names, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).

The folders that hold the parts of the base specification are `specs/contracts/` and either `specs/base/` or the folder of each domain. A value collected from the names of the parts comes from the node that its part opens with. For a domain, that node is its header (§s-yggv9myedprnaa7). For any other part, it is the first top-level node of the first of the part's files in the code-point order of their paths. A value collected from the sids comes from the node whose sid it is.

The values collected from the names of the parts or from the sids are the values gathered beside the field (§s-ju5vcanbjph7mgh). `sheriff reindex` writes each of them into the field's `x-enumSource.gathered` (§s-ztseyetus7np6br), together with the sid of the node that it comes from. It writes them in the order of those nodes: their files in the code-point order of the files' paths, and the nodes of one file in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w).

The SpecSheriff tools collect in this way the values of each field with `enum` at any depth within a RecordType's `schema` (§s-6eb92ddch7shuvu), such as in the schema of the members of a list.

### Reason

`sheriff reindex` writes the gathered values beside the field (§s-ztseyetus7np6br), and `sheriff validate` compares them with what their source gives (§s-agc6fb3vx46pc23). The check of RecordType variants and the generated types also rely on a field's values (§s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Collected in one way, the values are the same for each of them and on every machine.

### Examples

```json
[
  {
    "en": "In a base specification divided into domains, the RecordType of an audit log entry has a field `part` whose `x-enumSource.from` is `parts`. The base specification is kept in `specs/contracts/`, `specs/requests/` and `specs/users/`. `sheriff reindex` writes `contracts`, `requests` and `users` into the field's `x-enumSource.gathered`. With `contracts` it writes the sid of the first top-level node of the first file of `specs/contracts/`. With each domain's name it writes the sid of that domain's header. The most likely mistake is to leave out `contracts`, which is a part of the base specification although it is not a domain.",
    "ru": "В базовой спецификации, разделённой на домены, у RecordType записи audit log есть поле `part`, `x-enumSource.from` которого — `parts`. Базовая спецификация хранится в `specs/contracts/`, `specs/requests/` и `specs/users/`. `sheriff reindex` записывает в `x-enumSource.gathered` поля `contracts`, `requests` и `users`. Вместе с `contracts` он записывает sid первого узла верхнего уровня первого файла `specs/contracts/`. Вместе с именем каждого домена он записывает sid заголовка этого домена. Самая вероятная ошибка — пропустить `contracts`: это часть базовой спецификации, хотя и не домен."
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
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-yggv9myedprnaa7"
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

## The values and the source of a field with `enum` | key new:tools-7-1-enum-values | sid s-dk3zfkbhc3v6xbp | tools 7.1.18a (new, after “Where the values of a field with `enum` are collected”)

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a field with `enum` (§s-xfu2gpzddjnmgks) only where both of the following hold:

its source gives it at least one value, as the SpecSheriff tools collect its values (§s-5nf87c3e3jg9v7c, §s-buug8n5eh7tdnsv);

where its `x-enumSource.from` is `kind`, its `x-enumSource.kind` names one of the kinds of node that the project's extension of the schema adds in its field `kinds` (§s-xm8rz4uupb73gu5, §s-hcgmz4v5avbj3nt).

`sheriff validate` refuses any other field with `enum`, naming the RecordType that holds it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also names the field and, where the field fails the second condition, the kind.

`sheriff validate` refuses a field whose own `enum` holds a value more than once when it validates the files against the schema of the specification (§s-xzcw3hv4hmxz7h7, §s-upj45kydz8727be). The schema of the RecordType extension requires each `enum` within a RecordType's `schema` (§s-6eb92ddch7shuvu) to hold each value once.

`sheriff validate` checks each field with `enum` at any depth within the `schema` of each RecordType in the files that the repository keeps. It makes these checks regardless of whether the specification is approved or a draft (§s-upj45kydz8727be, §s-buug8n5eh7tdnsv, §s-hcgmz4v5avbj3nt).

### Reason

The types and RuntimeChecks generated for a field accept only the field's values (§s-e877bnfa559tvk9). So a field that has no value, or whose source names a kind that no node can have, admits no data record.

### Examples

```json
[
  {
    "en": "The RecordType of a step of a job has a field `chapter` whose `x-enumSource.from` is `kind` and whose `x-enumSource.kind` is `TextRule`. `sheriff validate` refuses the field and names `TextRule`. Once the field names `chapter`, a kind that the project's extension of the schema adds, and the base specification holds a node of that kind, the field passes. The most likely mistake is to accept `TextRule`, since the schema of the SpecSheriff guidelines defines that kind.",
    "ru": "У RecordType шага задачи есть поле `chapter`, `x-enumSource.from` которого — `kind`, а `x-enumSource.kind` — `TextRule`. `sheriff validate` отвергает это поле и называет `TextRule`. Когда поле называет `chapter`, тип узлов, который добавляет расширение схемы проекта, а в базовой спецификации есть узел этого типа, поле проходит проверку. Самая вероятная ошибка — принять `TextRule` потому, что этот тип узлов определяет схема SpecSheriff guidelines."
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
  }
]
```

### The current node

(none: this node is new)
