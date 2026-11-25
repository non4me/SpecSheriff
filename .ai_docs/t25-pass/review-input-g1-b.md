# Group 1 drafts for review (generated 2026-11-23T16:37:45.154Z)

## Values built from other nodes | key s-agc6fb3vx46pc23 | sid s-agc6fb3vx46pc23 | tools 7.1.9

### Text

`sheriff validate` computes each of the following values as `sheriff reindex` writes them (§s-ztseyetus7np6br), for each node of the specification in the files that the repository keeps:

the links pointing at the node (§s-bpdqd9v72wg7vsz, §s-xdk44dt9uxdeb2b), compared without regard to their order;

the approval status of a section, with the nodes in the cells of a `TableRule` counted among the nodes under the section (§s-9kfdycuq34beqvs, §s-5fewsp22mmdz7y6, §s-k3hrk8u9uz9mpz7);

where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the index of sections in a domain's header, which the header holds only where the domain has sections (§s-2r59txnms5serdr, §s-6n2ab7escdtspwe);

where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered beside a field with `enum` (§s-ju5vcanbjph7mgh, §s-93jpnb4c96qhwbu).

`sheriff validate` refuses each node whose value differs from the one computed. The refusal names the node by its file, its sid and its location, and names the value.

### Reason

Each of these values is built from other nodes, so an edit to one node leaves another node's value out of date until `sheriff reindex` runs. Computing every such value anew finds a commit that holds an out-of-date value, or one written by hand.

### Examples

```json
[
  {
    "en": "A node of `tools.json` gains an `implements` link to a row of the main table of checks, and the change is committed without `sheriff reindex`. `sheriff validate` refuses the row, since the links pointing at it lack the new link.",
    "ru": "Узел `tools.json` получает связь `implements` со строкой основной таблицы проверок, и изменение коммитят без `sheriff reindex`. `sheriff validate` отвергает эту строку: среди связей, указывающих на неё, нет новой связи."
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
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-tdm3rwsppnuh6dm"
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
  }
]
```

### The current node in tools.json

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

A domain may be divided into several documents (§s-k73czmpkazcx7mu), only one of which holds its header. So only a reading of all the domain's files shows a missing header or a second one.

### Examples

```json
[
  {
    "en": "A domain `requests` is divided into `specs/requests/00-requests.json` and `specs/requests/intake.json`, and its header was copied into both files. `sheriff validate` refuses the domain and names both files. Had the header been moved rather than copied, the domain would pass.",
    "ru": "Домен `requests` разделён на `specs/requests/00-requests.json` и `specs/requests/intake.json`, и его заголовок скопирован в оба файла. `sheriff validate` отвергает домен и называет оба файла. Если бы заголовок перенесли, а не скопировали, домен прошёл бы проверку."
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

### The current node in tools.json

(none: this node is new)

## `consumes` links | key new:tools-7-1-consumes | sid s-p3n666zfjdrrw6a | tools 7.1.12a (new, after "`exempts` links")

### Text

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a `consumes` link only where it goes from a domain's header to a section in the files of another domain (§s-yggv9myedprnaa7, §s-rdavpdea67hsntf). It refuses any other `consumes` link, naming the node that declares it by its file, its sid and its location, and naming the link's target.

### Reason

A domain's header states what the domain uses (§s-yggv9myedprnaa7), so a `consumes` link from it says which domain uses the section that it names. The domain of each end is the folder of that end's file (§s-zefk589ykh37b8u).

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
  }
]
```

### The current node in tools.json

(none: this node is new)

## `exempts` links | key s-qvgzubkrafadqgf | sid s-qvgzubkrafadqgf | tools 7.1.12

### Text

`sheriff validate` accepts an `exempts` link (§s-gf6n8ge4mke3pr2, §s-6u54kfn4ze29r6h) only where all of the following hold:

the node that declares the link is a node of the project's own guidelines, kept in `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);

the link's target is a section or a rule, that is, a node of the kind `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) or `RecordType` (§s-ktfstpv8rurznrp), or of a project's own kind (§s-vsh384ybt4w25a2);

the text of the node that declares the link cites the target (§s-cxtt6jvhqcey2k9).

`sheriff validate` looks for that citation only in the text of the node. It refuses any other `exempts` link, naming the node that declares it by its file, its sid and its location, and naming the link's target.

### Reason

The exempting node says in its own text why the exemption is made (§s-gf6n8ge4mke3pr2), so a citation of the target counts only there.

### Examples

```json
[
  {
    "en": "A rule of `project.json` exempts a rule on printed receipts, since the system prints nothing. Its text says so and cites that rule, and it declares an `exempts` link to that rule, so `sheriff validate` accepts the link. The closest mistake is to cite the rule only in the reason, and `sheriff validate` then refuses the link.",
    "ru": "Правило `project.json` освобождает правило о печатных чеках, потому что система ничего не печатает. Его текст говорит это и ссылается на то правило, а само оно объявляет с тем правилом связь `exempts`, поэтому `sheriff validate` связь принимает. Ближайшая ошибка — сослаться на правило только в обосновании: тогда `sheriff validate` связь отвергает."
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
  }
]
```

### The current node in tools.json

Title: `consumes` and `exempts` links

`sheriff validate` reads what stands at each end of every `consumes` and `exempts` link:

- a `consumes` link, for a domain's header at its start and a section of another domain at its end;
- an `exempts` link, for a node of `project.json` at its start, and a rule, a node of a project's own NodeKind or a section at its end.

Reason: (none)
