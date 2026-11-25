# Group 1 drafts for review (generated 2026-11-23T16:37:45.110Z)

## A location that differs from the computed one | key s-stxmhq3hgfndvn6 | sid s-stxmhq3hgfndvn6 | tools 7.1.4

### Text

`sheriff validate` refuses each node whose location differs from the one computed for it (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx). The refusal names the node's file and sid, the location that the file holds and the location computed.

`sheriff validate` checks each node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). It leaves out the archive, whose nodes keep the locations they had when they were removed (§s-f2b5zvc565s242f).

### Reason

`sheriff reindex` writes every location after each edit (§s-ztseyetus7np6br). A location that differs from the computed one was therefore written by hand, or left by a move that no `sheriff reindex` followed.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-tvxhtjbj7mmpmnx"
  },
  {
    "type": "cites",
    "to": "s-ygg5kpcxgzq3m7w"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-f2b5zvc565s242f"
  },
  {
    "type": "cites",
    "to": "s-ztseyetus7np6br"
  }
]
```

### The current node in tools.json

Title: Locations computed anew

`sheriff validate` computes in memory the location of each node from where it is, and compares it with the location its file holds.

Reason: (none)

## How a node's location is computed | key new:tools-7-1-location | sid s-ygg5kpcxgzq3m7w | tools 7.1.4a (new, after "Locations computed anew")

### Text

The SpecSheriff tools compute each node's location (§s-kag2m9tzdnduxdx) from the path of the node's file and from the node's place in the specification.

The node at the top of a file of the guidelines or of the technical appendix takes as its location the path of that file under `specs/`, without `.json` (§s-zefk589ykh37b8u). Such locations are `_guidelines/spec`, `_guidelines/extensions/domains` and `tech/stack`. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), a domain's header takes the domain's name as its location (§s-yggv9myedprnaa7).

Every other node's location is one of the following, followed by a slash and the node's place:

in a file of the guidelines or of the technical appendix, the location of the node at the top of that file, as in `_guidelines/spec/1.3.4`;

in the base specification, the name of the folder under `specs/` that holds the node's file, as in `base/3.2`, `contracts/1` or `requests/2`.

Every node is numbered except a term, the node at the top of a file of the guidelines or of the technical appendix, and a domain's header. A numbered node's place is its position among the numbered nodes under its parent, counted from one. Where the parent is numbered too, the parent's place and a dot come before that position, as in `3.2`. A term's place is the term's name.

The SpecSheriff tools take the numbered nodes under a node in the order of the node's children. Under a `TableRule` (§s-5fewsp22mmdz7y6), the nodes in its cells come after its children, row by row through its groups and, within a row, column by column.

In a folder of the base specification, the nodes at the top of its files and the children of a domain's header count as nodes under one parent. The SpecSheriff tools take them file by file, in the code-point order of the files' paths.

### Reason

A folder of the base specification may hold several files (§s-zefk589ykh37b8u). Its files are numbered as one sequence, so that no two of its nodes take the same location. The files are taken in the code-point order of their paths, so that every machine computes the same locations.

### Examples

```json
[
  {
    "en": "A domain `requests` is kept in two files: `specs/requests/00-requests.json` holds its header, and `specs/requests/intake.json` holds two sections. The header's location is `requests`, and the sections are `requests/1` and `requests/2`. The fourth node of the second section is a `TableRule`, `requests/2.4`, and the node in the cell of its third row is `requests/2.4.3`. A term `request` in `specs/contracts/terms.json` is `contracts/request`. The closest mistake is to number each file from one, which gives the first section of every file the location `requests/1`.",
    "ru": "Домен `requests` хранится в двух файлах: в `specs/requests/00-requests.json` — его заголовок, в `specs/requests/intake.json` — два раздела. Расположение заголовка — `requests`, разделов — `requests/1` и `requests/2`. Четвёртый узел второго раздела — `TableRule` `requests/2.4`, а узел в ячейке его третьей строки — `requests/2.4.3`. Термин `request` в `specs/contracts/terms.json` — `contracts/request`. Ближайшая ошибка — нумеровать каждый файл с единицы: тогда первый раздел каждого файла получает расположение `requests/1`."
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
    "to": "s-5fewsp22mmdz7y6"
  }
]
```

### The current node in tools.json

(none: this node is new)

## An approved node without a standing approval | key s-95w92rnjuv3sst8 | sid s-95w92rnjuv3sst8 | tools 7.1.5

### Text

`sheriff validate` refuses each approved node for which no approval of its current wording stands (§s-v4qus7raqnwzneb, §s-cey3k9xxjvkpyqz). The refusal names the node by its file, its sid and its location.

`sheriff validate` checks each node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). It leaves out each section and, where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), each domain's header. `sheriff reindex` derives the status of these from the nodes under them (§s-ztseyetus7np6br).

### Reason

A node's status is written in its file, where anyone can type `approved`, while only `sheriff approve` records an approval (§s-v4qus7raqnwzneb). Comparing the two finds a status typed by hand, and a status left `approved` after the wording changed. The SpecSheriff guidelines and the extensions that a project takes from the plugin are approved where they are written (§s-bsya3febm6u64ab). So only the files that the repository keeps are checked.

### Examples

```json
[
  {
    "en": "An agent changes the text of an approved rule, and the change is committed without `sheriff reindex`. `sheriff validate` refuses the rule, since no approval stands for its new wording. Had `sheriff reindex` run, it would have made the rule a draft, and the check would have passed.",
    "ru": "Агент меняет текст одобренного правила, и изменение коммитят без `sheriff reindex`. `sheriff validate` отвергает правило: для его новой формулировки нет действующего одобрения. Если бы `sheriff reindex` был запущен, он сделал бы правило черновиком, и проверка прошла бы."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-cey3k9xxjvkpyqz"
  },
  {
    "type": "cites",
    "to": "s-v4qus7raqnwzneb"
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
    "to": "s-ztseyetus7np6br"
  },
  {
    "type": "cites",
    "to": "s-bsya3febm6u64ab"
  }
]
```

### The current node in tools.json

Title: An approved node's approval

`sheriff validate` looks up each approved node in the approvals. The latest line for the node's sid and the fingerprint of its wording must be an approval. These nodes are left out:

- the nodes of the SpecSheriff guidelines the project takes;
- a section and a domain's header.

`sheriff validate` looks up whoever an approval's line names among the owners of its node, as the commit holds them. It does so for each approval the commit adds to the approvals of its parent. The approvals of the parent are read as `sheriff reindex` would rewrite them (§s-f5rz6b7dhxejjts).

Reason: (none)

## Who an added approval names | key new:tools-7-1-approval-by | sid s-75ue25v6r23jkk8 | tools 7.1.5a (new, after "An approved node's approval")

### Text

`sheriff validate` accepts an approval that a commit adds to `specs/_approvals.jsonl` only where it names an owner of its node (§s-6sk8uet75dmq5qz) as of that commit (§s-acacahc8c9estmr). It refuses any other approval that the commit adds. The refusal names the node by its file, its sid and its location, the email address that the approval names, and the node's owners.

An approval is added by a commit where `specs/_approvals.jsonl` holds more lines equal to that approval after the commit than in the commit's parent. For a merge commit, the parent is its first parent. `sheriff validate` reads the parent's approvals in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv).

`sheriff validate` checks only the approvals of nodes in the files that the repository keeps. It finds a node's owners as the model of the specification gives them (§s-w6gybeqn2ttydqx). Of the lines that a commit adds, it checks only approvals, since anyone may withdraw an approval (§s-fpq35tf3pehgk64).

### Reason

A node's owners may change from one commit to the next. Each approval is judged once, against the owners in the commit that adds it. A later change of owners then leaves in force the approvals given before it.

### Examples

```json
[
  {
    "en": "The nearest section above a rule names `a@example.com` as its owner. A commit adds an approval of the rule by `b@example.com`, and `sheriff validate` refuses it, naming both addresses. A commit that also makes `b@example.com` an owner of that section is accepted. The closest mistake is to judge the approval against the owners that the commit's parent holds, which would refuse that second commit.",
    "ru": "Ближайший раздел над правилом называет ответственным `a@example.com`. Коммит добавляет одобрение правила от `b@example.com`, и `sheriff validate` его отвергает, называя оба адреса. Коммит, который к тому же делает `b@example.com` ответственным за этот раздел, принимается. Ближайшая ошибка — оценивать одобрение по ответственным в родительском коммите: тогда второй коммит был бы отвергнут."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-acacahc8c9estmr"
  },
  {
    "type": "cites",
    "to": "s-6sk8uet75dmq5qz"
  },
  {
    "type": "cites",
    "to": "s-gb8s9657a65hqmv"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  },
  {
    "type": "cites",
    "to": "s-fpq35tf3pehgk64"
  }
]
```

### The current node in tools.json

(none: this node is new)
