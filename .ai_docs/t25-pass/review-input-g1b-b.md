# Group 1 drafts for review (generated 2026-11-23T19:50:39.332Z)

## Values built from other nodes | key s-agc6fb3vx46pc23 | sid s-agc6fb3vx46pc23 | tools 7.1.9

### Text

`sheriff validate` computes the following values as `sheriff reindex` writes them (§s-ztseyetus7np6br):

the links pointing at each node (§s-bpdqd9v72wg7vsz, §s-xdk44dt9uxdeb2b), compared without regard to their order;

the approval status of each section (§s-9kfdycuq34beqvs, §s-k3hrk8u9uz9mpz7);

where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of each domain's header (§s-yccuyqbypzzx2gu, §s-bn8rvk6du2jkf2d);

where the project has chosen the Domains extension, the index of sections in each domain's header (§s-2r59txnms5serdr, §s-6n2ab7escdtspwe);

where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered beside each field with `enum` (§s-ju5vcanbjph7mgh, §s-93jpnb4c96qhwbu).

`sheriff validate` checks each node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). It refuses each node whose value in its file differs from the one computed. The refusal names the node by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and says which of these values differs.

### Reason

Each of these values is built from other nodes, so an edit to one node leaves another node's value out of date until `sheriff reindex` runs. Computing every such value anew finds a commit that holds an out-of-date value, or one written by hand.

### Examples

```json
[
  {
    "en": "A section holds a `TableRule`, one cell of which holds a draft node, and every other node under the section is approved. `sheriff validate` computes the section's approval status as draft, and refuses the section if its file marks it approved. The closest mistake is to count only the nodes in a node's `children`, which leaves out the node in the cell.",
    "ru": "Раздел содержит `TableRule`, в одной из ячеек которой — узел-черновик, а все остальные узлы под разделом одобрены. `sheriff validate` вычисляет статус одобрения раздела как «черновик» и отвергает раздел, если его файл отмечает раздел одобренным. Ближайшая ошибка — считать только узлы из `children` узла: так узел в ячейке пропускается."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-xdk44dt9uxdeb2b"
  },
  {
    "type": "implements",
    "to": "s-k3hrk8u9uz9mpz7"
  },
  {
    "type": "implements",
    "to": "s-bn8rvk6du2jkf2d"
  },
  {
    "type": "implements",
    "to": "s-6n2ab7escdtspwe"
  },
  {
    "type": "implements",
    "to": "s-93jpnb4c96qhwbu"
  },
  {
    "type": "cites",
    "to": "s-ztseyetus7np6br"
  },
  {
    "type": "cites",
    "to": "s-bpdqd9v72wg7vsz"
  },
  {
    "type": "cites",
    "to": "s-9kfdycuq34beqvs"
  },
  {
    "type": "cites",
    "to": "s-tdm3rwsppnuh6dm"
  },
  {
    "type": "cites",
    "to": "s-yccuyqbypzzx2gu"
  },
  {
    "type": "cites",
    "to": "s-2r59txnms5serdr"
  },
  {
    "type": "cites",
    "to": "s-hzuzn8hbq6q9q4s"
  },
  {
    "type": "cites",
    "to": "s-ju5vcanbjph7mgh"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  }
]
```

### The current node

Title: Indexes, incoming links, gathered values and the statuses of sections and headers, rebuilt

`sheriff validate` rebuilds these in memory and compares them with what is committed:

- the index of each domain's header, the header read as it now stands in the domain's files;
- the incoming links;
- the values gathered beside each field (§s-ju5vcanbjph7mgh);
- the status of each section and domain's header (§s-9kfdycuq34beqvs).

Reason: (none)

## One header for each domain | key new:tools-7-1-one-header | sid s-8esbyvaj2yx5eqf | tools 7.1.9a (new, after "Values built from other nodes")

### Text

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a domain only where the domain's files hold exactly one header (§s-yggv9myedprnaa7, §s-ctj5v22yn7wr7n4). A domain's files are those in its folder, `specs/<domain>/` (§s-zefk589ykh37b8u).

`sheriff validate` refuses any other domain. The refusal names the domain's folder and, for each header that the domain's files hold, the header's file and sid.

### Reason

A domain may be kept in several files (§s-k73czmpkazcx7mu). So only a reading of all of them shows a missing header or a second one.

### Examples

```json
[
  {
    "en": "The domain `requests` is kept in `specs/requests/00-requests.json` and `specs/requests/intake.json`, and whoever split it opened the second file with a new header as well. `sheriff validate` refuses the domain and names both headers. Once the second file holds only sections, the domain passes.",
    "ru": "Домен `requests` хранится в `specs/requests/00-requests.json` и `specs/requests/intake.json`, и тот, кто его разделил, открыл второй файл ещё одним, новым заголовком. `sheriff validate` отвергает домен и называет оба заголовка. Когда во втором файле остаются только разделы, домен проходит проверку."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-ctj5v22yn7wr7n4"
  },
  {
    "type": "cites",
    "to": "s-tdm3rwsppnuh6dm"
  },
  {
    "type": "cites",
    "to": "s-yggv9myedprnaa7"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-k73czmpkazcx7mu"
  }
]
```

### The current node

(none: this node is new)

## `consumes` links | key new:tools-7-1-consumes | sid s-p3n666zfjdrrw6a | tools 7.1.12a (new, after "`exempts` links")

### Text

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a `consumes` link only where it goes from a domain's header to a section in the files of another domain (§s-yggv9myedprnaa7, §s-rdavpdea67hsntf). A domain's files are those in its folder, `specs/<domain>/` (§s-zefk589ykh37b8u).

`sheriff validate` refuses any other `consumes` link, naming the node that declares it by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and naming the link's target.

### Reason

The index in a domain's header, and the check for a cycle in which domains use one another, both learn from the `consumes` links which domain uses which section (§s-2r59txnms5serdr, §s-bncp7gtyaukur8e). Any other `consumes` link would show a use that no domain makes.

### Examples

```json
[
  {
    "en": "The header of the domain `requests` declares a `consumes` link to the section of the domain `users` that describes how a user signs in, and `sheriff validate` accepts the link. The closest mistake is to point the link at the rule in that section that the domain relies on, and `sheriff validate` then refuses the link.",
    "ru": "Заголовок домена `requests` объявляет связь `consumes` с разделом домена `users`, который описывает, как пользователь входит в систему, и `sheriff validate` эту связь принимает. Ближайшая ошибка — направить связь на то правило этого раздела, на которое опирается домен: тогда `sheriff validate` связь отвергает."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-rdavpdea67hsntf"
  },
  {
    "type": "cites",
    "to": "s-tdm3rwsppnuh6dm"
  },
  {
    "type": "cites",
    "to": "s-yggv9myedprnaa7"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-2r59txnms5serdr"
  },
  {
    "type": "cites",
    "to": "s-bncp7gtyaukur8e"
  }
]
```

### The current node

(none: this node is new)

## `exempts` links | key s-qvgzubkrafadqgf | sid s-qvgzubkrafadqgf | tools 7.1.12

### Text

`sheriff validate` accepts an `exempts` link (§s-gf6n8ge4mke3pr2, §s-6u54kfn4ze29r6h) only where all of the following hold:

the node that declares the link is a node of the project's own guidelines, kept in `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);

the link's target is a section or a rule, a rule being a node of the kind `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) or `RecordType` (§s-ktfstpv8rurznrp), or of a project's own kind (§s-vsh384ybt4w25a2);

the text of the node that declares the link cites the target (§s-cxtt6jvhqcey2k9).

`sheriff validate` refuses any other `exempts` link, naming the node that declares it by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and naming the link's target.

### Reason

A node states what it requires in its text, while its reason requires nothing (§s-dpe5kcz4eamv39g). So only a citation in the text of the exempting node shows that its approved wording names what it exempts (§s-gf6n8ge4mke3pr2).

### Examples

```json
[
  {
    "en": "A rule of `project.json` exempts the rule of the stack that chooses the programming language, since no symbol of the code can implement that choice. The exempting rule's text says so and cites that rule of the stack. The exempting rule also declares an `exempts` link to it, so `sheriff validate` accepts the link. The closest mistake is to cite the rule of the stack only in the reason, and `sheriff validate` then refuses the link.",
    "ru": "Правило `project.json` освобождает от имплементации правило стека, выбирающее язык программирования, потому что ни один символ в коде не может реализовать этот выбор. Текст освобождающего правила говорит это и ссылается на правило стека. Освобождающее правило также объявляет с ним связь `exempts`, поэтому `sheriff validate` связь принимает. Ближайшая ошибка — сослаться на правило стека только в обосновании: тогда `sheriff validate` связь отвергает."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-6u54kfn4ze29r6h"
  },
  {
    "type": "cites",
    "to": "s-gf6n8ge4mke3pr2"
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
    "to": "s-ktfstpv8rurznrp"
  },
  {
    "type": "cites",
    "to": "s-vsh384ybt4w25a2"
  },
  {
    "type": "cites",
    "to": "s-cxtt6jvhqcey2k9"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-dpe5kcz4eamv39g"
  }
]
```

### The current node

Title: `consumes` and `exempts` links

`sheriff validate` reads what stands at each end of every `consumes` and `exempts` link:

- a `consumes` link, for a domain's header at its start and a section of another domain at its end;
- an `exempts` link, for a node of `project.json` at its start, and a rule, a node of a project's own NodeKind or a section at its end.

Reason: (none)
