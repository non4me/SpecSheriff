# Group 1 drafts for review (generated 2026-11-23T20:18:20.228Z)

## How a node's location is computed | key new:tools-7-1-location | sid s-ygg5kpcxgzq3m7w | tools 7.1.4a (new, after "Locations computed anew")

### Text

The SpecSheriff tools compute a node's location (§s-kag2m9tzdnduxdx) from the path of its file and its place in the specification. They compute it for each node of the specification in the files that the repository keeps.

The first node at the top of a file of the guidelines or of the technical appendix (§s-tj38pvm38nepaf5) takes as its location the path of that file under `specs/`, without `.json` (§s-zefk589ykh37b8u). Such locations include `_guidelines/spec`, `_guidelines/extensions/domains` and `tech/stack`. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), a domain's header (§s-yggv9myedprnaa7) takes the domain's name as its location.

Every other node's location is one of the following, followed by a slash and the node's place:

in a file of the guidelines or of the technical appendix, the location of the first node at the top of that file, as in `_guidelines/spec/1.3.4`;

in the base specification (§s-5x737t9nee4zgaa), the name of the folder under `specs/` that holds the node's file, as in `base/3.2`, `contracts/1` or `requests/2`.

Every node is numbered except the following:

a term (§s-ypa92gpcj3f5zj8);

the first node at the top of a file of the guidelines or of the technical appendix;

a domain's header.

A numbered node's place is its position among the numbered nodes under its parent, counted from one. Where the parent is numbered too, the parent's place and a dot come before that position, as in `3.2`.

The SpecSheriff tools take the numbered nodes under a node in the order of the node's children. Under a `TableRule` (§s-5fewsp22mmdz7y6), the nodes in its cells come after its children, row by row through its groups and, within a row, column by column.

In a folder of the base specification, the nodes at the top of its files and the children of a domain's header are considered nodes under one parent. The SpecSheriff tools take them file by file, in the code-point order of the files' paths. The nodes at the top of one file are taken in the order in which the file lists them. The children of a domain's header take the header's place in that order.

In a file of the guidelines or of the technical appendix, each further node at the top of the file is numbered under the location of the first node, after that node's children.

### Reason

`sheriff reindex` writes the locations that `sheriff validate` checks (§s-ztseyetus7np6br, §s-stxmhq3hgfndvn6). Both therefore need one computation that gives every node a location of its own, the same on every machine.

### Examples

```json
[
  {
    "en": "A domain `requests` is kept in three files: `specs/requests/00-requests.json` holds its header, `specs/requests/intake.json` holds one section, and `specs/requests/review.json` holds another. The header's location is `requests`, and the sections are `requests/1` and `requests/2`. The fourth node of the second section is a `TableRule`, `requests/2.4`, each of whose rows holds one node, so the node in its third row is `requests/2.4.3`. The closest mistake is to number each file from one, which gives both sections the location `requests/1`.",
    "ru": "Домен `requests` хранится в трёх файлах: в `specs/requests/00-requests.json` — его заголовок, в `specs/requests/intake.json` — один раздел, в `specs/requests/review.json` — другой. Расположение заголовка — `requests`, разделов — `requests/1` и `requests/2`. Четвёртый узел второго раздела — `TableRule` `requests/2.4`, в каждой строке которого по одному узлу, поэтому узел в его третьей строке — `requests/2.4.3`. Ближайшая ошибка — нумеровать каждый файл с единицы: тогда оба раздела получают расположение `requests/1`."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-tj38pvm38nepaf5"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
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
    "to": "s-5x737t9nee4zgaa"
  },
  {
    "type": "cites",
    "to": "s-ypa92gpcj3f5zj8"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-ztseyetus7np6br"
  },
  {
    "type": "cites",
    "to": "s-stxmhq3hgfndvn6"
  }
]
```

### The current node

(none: this node is new)

## Values built from other nodes | key s-agc6fb3vx46pc23 | sid s-agc6fb3vx46pc23 | tools 7.1.9

### Text

`sheriff validate` refuses each node in which a value built from other nodes differs from the value that `sheriff reindex` would write (§s-ztseyetus7np6br). It computes the following values:

the links pointing at each node (§s-bpdqd9v72wg7vsz, §s-xdk44dt9uxdeb2b), compared without regard to their order;

the approval status of each section (§s-9kfdycuq34beqvs, §s-k3hrk8u9uz9mpz7);

where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of each domain's header (§s-yccuyqbypzzx2gu, §s-bn8rvk6du2jkf2d);

where the project has chosen the Domains extension, the index of sections in each domain's header (§s-2r59txnms5serdr, §s-6n2ab7escdtspwe);

where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered beside each field with `enum` (§s-ju5vcanbjph7mgh, §s-93jpnb4c96qhwbu).

`sheriff validate` checks each node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). The refusal names the node by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and says which of these values differs.

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

## A run of words in capitals | key s-e2vdhfsndy5stq9 | sid s-e2vdhfsndy5stq9 | tools 7.1.10

### Text

`sheriff validate` refuses each run of three or more words set in capitals (§s-m6upmfq64kw5h4r, §s-83natrftdsmttsu). The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), the property that holds the run, and the run.

`sheriff validate` checks each node of the specification in the files that the repository keeps, whatever its status. It reads a node's title, text and reason, each string in each member of its `TextRule.list`, and each text cell of a `TableRule` (§s-qeensty237e6mmm, §s-5fewsp22mmdz7y6). It reads a node in a cell of a `TableRule` as it reads any other node.

In what it reads, a word set in capitals is two or more characters that meet each of these conditions:

each of them is a capital letter of any script, a digit or a hyphen;

the first is a capital letter, and the last is a capital letter or a digit;

no letter, digit or underscore stands immediately before or after them.

A run is three or more such words with only spaces or tabs between them. Text in backticks or in straight or typographic double quotation marks is left out.

### Reason

The check does not understand the text, so it recognises a phrase set in capitals by its form alone. That form is drawn exactly, so that ordinary capitalisation and quotations, which keep the spelling of what they quote (§s-7anvune6h4f6mbr), are never refused.

### Examples

```json
[
  {
    "en": "A rule's text ends with the words “WITHOUT ANY EXCEPTION”, written as part of its sentence. `sheriff validate` refuses the node and names that run. The closest mistake is to let three abbreviations in a row, such as “HTTP REST API”, pass: `sheriff validate` refuses them too.",
    "ru": "Текст правила заканчивается словами «WITHOUT ANY EXCEPTION», написанными как часть предложения. `sheriff validate` отвергает узел и называет эти слова. Ближайшая ошибка — пропустить три аббревиатуры подряд, например «HTTP REST API»: `sheriff validate` отвергает и их."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-83natrftdsmttsu"
  },
  {
    "type": "cites",
    "to": "s-m6upmfq64kw5h4r"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-qeensty237e6mmm"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-7anvune6h4f6mbr"
  }
]
```

### The current node

Title: Words running in capitals

`sheriff validate` reads the title, text and reason of every approved node, and of every section and domain's header, for three words or more running in capitals.

- Each such word has two characters or more.
- The words are separated only by spaces or tabs.
- Anything in backticks or double quotation marks is left out.

Reason: (none)

## Link types reserved for terms | key s-pvnnr844f3y964m | sid s-pvnnr844f3y964m | tools 7.1.8

### Text

`sheriff validate` accepts a link of type `term-relation` or `uses` only where both of its ends are term nodes (§s-ypa92gpcj3f5zj8, §s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx). It accepts a link of any other type, `cites` included, only where at least one of its ends is a node other than a term node.

`sheriff validate` refuses every other link that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). It checks only a link whose target is a node of the model of the specification (§s-w6gybeqn2ttydqx). The refusal names the node that declares the link by its file, its sid and its location (§s-kag2m9tzdnduxdx), and names the link's type and its target. It says that the link is to be settled with the specification's owners.

### Reason

Whether two terms are bound, and how, says how the entities (§s-9w3u3wn37wksyxd) that they name relate. The specification's owners decide that, so the refusal sends whoever wrote the link to them, rather than suggesting a type.

### Examples

```json
[
  {
    "en": "A term cites another term and declares a `cites` link to it. `sheriff validate` refuses that link and sends the author to the owners. They decide whether the terms are bound by a `term-relation` link, and with which `ratio`, or by a `uses` link.",
    "ru": "Термин ссылается на другой термин и объявляет с ним связь `cites`. `sheriff validate` отвергает эту связь и отсылает автора к ответственным. Те решают, связаны ли термины связью `term-relation`, и с каким `ratio`, или связью `uses`."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-s79v9mmyw56hgpx"
  },
  {
    "type": "cites",
    "to": "s-ypa92gpcj3f5zj8"
  },
  {
    "type": "cites",
    "to": "s-76dutms9uv6uha2"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-9w3u3wn37wksyxd"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  }
]
```

### The current node

Title: The NodeKinds at the ends of a link

`sheriff validate` looks up the NodeKind of the node at each end of every outgoing link and sets it against the link's type.

Reason: (none)

## The target of a link | key new:tools-7-1-link-target | sid s-c4rn9fj4czk768b | tools 7.1.7a (new, before "Outgoing links and citations")

### Text

`sheriff validate` accepts a link only where its target is the sid of a node of the model of the specification (§s-w6gybeqn2ttydqx, §s-x8usyy38qa56k6a). It refuses any other link that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). The refusal names the node that declares the link by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and names the link's type and its target.

### Reason

Only a link whose target is a node of the specification can be followed. Only such a link is built into that node, among the links pointing at it (§s-bpdqd9v72wg7vsz).

### Examples

```json
[
  {
    "en": "A rule keeps a `refines` link to a rule that a later commit removed and archived. `sheriff validate` refuses the link, since no node of the specification holds the removed rule's sid any longer. The closest mistake is to look for the target only among the nodes of the files that the repository keeps: a rule of a project's own guidelines refines a rule of the SpecSheriff guidelines, which the project takes from the SpecSheriff plugin, and `sheriff validate` accepts that link.",
    "ru": "Правило сохраняет связь `refines` с правилом, которое более поздний коммит удалил и отправил в архив. `sheriff validate` отвергает эту связь: ни у одного узла спецификации больше нет sid удалённого правила. Ближайшая ошибка — искать цель только среди узлов файлов, которые хранит репозиторий: правило собственных guidelines проекта уточняет правило SpecSheriff guidelines, которые проект берёт из плагина SpecSheriff, и `sheriff validate` принимает эту связь."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-x8usyy38qa56k6a"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-bpdqd9v72wg7vsz"
  }
]
```

### The current node

(none: this node is new)

## Copies of the files that the SpecSheriff plugin delivers | key s-6bmnsbskg6en4nf | sid s-6bmnsbskg6en4nf | tools 7.1.20

### Text

`sheriff validate` refuses each copy of the files that are common to every project and come with the SpecSheriff tools in the SpecSheriff plugin (§s-zefk589ykh37b8u, §s-rnbm4v8hsta6heq). It accepts such a file only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u).

A copy is any of the following files that the repository keeps:

`specs/_guidelines/spec.json` and `specs/_guidelines/tools.json`;

each file in `specs/_guidelines/extensions/`;

each file in `specs/_schema/` or in a folder under it, other than `specs/_schema/project.schema.json`.

The refusal names each copy. While the repository keeps a copy, `sheriff validate` makes only the check for copies.

### Reason

In a project, the SpecSheriff tools read the files common to every project from the SpecSheriff plugin (§s-zefk589ykh37b8u). A copy in the project's repository is read by people and agents but by none of the SpecSheriff tools, so it falls behind the files in force unnoticed.

### Examples

```json
[
  {
    "en": "A project copies `node.schema.json` into `specs/_schema/` to read it beside its own extension of the schema. `sheriff validate` refuses the copy and names it. It accepts `specs/_schema/project.schema.json`, the project's own extension of the schema.",
    "ru": "Проект копирует `node.schema.json` в `specs/_schema/`, чтобы читать его рядом со своим расширением схемы. `sheriff validate` отвергает копию и называет её. `specs/_schema/project.schema.json`, собственное расширение схемы проекта, он принимает."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-rnbm4v8hsta6heq"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  }
]
```

### The current node

Title: No copy of the SpecSheriff guidelines

`sheriff validate` refuses a copy of the SpecSheriff guidelines or of their schema outside the repository they are written in. A copy is:

- a `spec.json` or a `tools.json` under `specs/_guidelines/`;
- any file under `specs/_schema/` but `project.schema.json`.

Reason: (none)

## A link from the SpecSheriff guidelines to an extension | key new:tools-7-1-guidelines-to-extension | sid s-75r4pg4wdqu3gw5 | tools 7.1.12b (new, after "`consumes` links")

### Text

`sheriff validate` refuses each link that a rule of the SpecSheriff guidelines (§s-u7tw6m8npxmv5tu) declares to a node of an extension of the guidelines (§s-mbmnsnxenmavu3z, §s-zyaf34chxugtjyn). The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx), and names the link's type and its target. `sheriff validate` makes this check only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u). There it reads every node of `specs/_guidelines/spec.json` other than a section, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6).

### Reason

In the repository where the SpecSheriff guidelines are written, the extensions are kept beside them. A link from a rule of the guidelines to a node of an extension therefore resolves and passes every other check.

### Examples

```json
[
  {
    "en": "A rule of `spec.json` cites a rule of an extension. `sheriff validate` refuses the `cites` link that the citation requires.",
    "ru": "Правило `spec.json` цитирует правило расширения. `sheriff validate` отвергает связь `cites`, которой требует цитата."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-zyaf34chxugtjyn"
  },
  {
    "type": "cites",
    "to": "s-u7tw6m8npxmv5tu"
  },
  {
    "type": "cites",
    "to": "s-mbmnsnxenmavu3z"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  }
]
```

### The current node

(none: this node is new)
