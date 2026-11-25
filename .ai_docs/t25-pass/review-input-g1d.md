# Group 1 drafts for review (generated 2026-11-23T22:29:51.490Z)

## How a node's location is computed | key new:tools-7-1-location | sid s-ygg5kpcxgzq3m7w | tools 7.1.4a (new, after "Locations computed anew")

### Text

The SpecSheriff tools compute a node's location (§s-kag2m9tzdnduxdx) from the path of its file and its place in the specification. They compute it for each node of the specification in the files that the repository keeps.

The first node at the top of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5) takes as its location the path of that file under `specs/`, without `.json` (§s-zefk589ykh37b8u). Such locations include `_guidelines/spec`, `_guidelines/extensions/domains` and `tech/stack`. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), a domain's header (§s-yggv9myedprnaa7) takes the domain's name as its location. Every other node's location is one of the following, followed by a slash and the node's place:

in a file of the guidelines, of the appendix of the tools or of the technical appendix, the location of the first node at the top of that file, as in `_guidelines/spec/1.3.4`;

in the base specification (§s-5x737t9nee4zgaa), the name of the folder under `specs/` that holds the node's file, as in `base/3.2`, `contracts/1` or `requests/2`.

Every node is numbered except the following:

a term (§s-khqsmy6mhejkrhg), whose place is the term's name;

the first node at the top of a file of the guidelines, of the appendix of the tools or of the technical appendix;

a domain's header.

A numbered node's place is its position among the numbered nodes under its parent, counted from one. Where the parent is numbered too, the parent's place and a dot come before that position, as in `3.2`.

The SpecSheriff tools take the numbered nodes under a node in the order of the node's children. Under a `TableRule` (§s-5fewsp22mmdz7y6), the nodes in its cells come after its children, row by row through its groups and, within a row, column by column.

In a folder of the base specification, the nodes at the top of its files and the children of a domain's header are considered nodes under one parent. The SpecSheriff tools take them file by file, in the code-point order of the files' paths. The nodes at the top of one file are taken in the order in which the file lists them. The children of a domain's header take the header's place in that order.

In a file of the guidelines, of the appendix of the tools or of the technical appendix, each further node at the top of the file is numbered under the location of the first node, after that node's children.

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
    "to": "s-khqsmy6mhejkrhg"
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
  },
  {
    "type": "cites",
    "to": "s-a4rbry4hsu34hy8"
  }
]
```

### The current node

(none: this node is new)

## What a link is | key proposal:s-sn6au3vcr9uy5pm | sid s-sn6au3vcr9uy5pm | spec 6.1

### Text

A link is a directed relation from one node to another. Every link states its meaning through its type. The types of link are:

`implements` — the linking node states how the linked one is implemented.

`refines` — the linking node states the linked node more precisely, states it for a narrower case, or extends it. A node extends another when it adds a requirement on the other node's subject that the other leaves open, such as a value that the other leaves to each project. The linking node leaves every requirement of the linked node in force.

`constrains` — the linking node states a condition the linked rule depends on.

`exempts` — the linking node exempts the linked rule, or every rule under the linked section, from being implemented (§s-gf6n8ge4mke3pr2).

`checks` — the linking node is a check, and it verifies that the linked rule is followed. Such a link is written by hand.

`cites` — the linking node cites the linked one (§s-cxtt6jvhqcey2k9), and no other type says how the two relate to each other. So the linking node has no link of another type to the linked one.

`term-relation` — the linking term (§s-khqsmy6mhejkrhg) and the linked term are bound, for as long as both exist, in the ratio the link carries.

`uses` — what the linking term names makes use of what the linked term names while taking part in a process. The link carries no ratio. A term that only starts a process, such as an operator who starts an export, uses nothing the process uses.

An extension of the guidelines or a project's own guidelines (§s-u7tw6m8npxmv5tu) may define further types of link. Each such type states its meaning and contradicts no rule of the SpecSheriff guidelines.

### Reason

A link without a type records only that somebody thought of two nodes together. No check can evaluate it. No diagram can draw it. A type named without its meaning is the same guess, one step removed.

### Examples

```json
[
  {
    "en": "`uses`: a user fills in a form while signing up.",
    "ru": "`uses`: пользователь заполняет форму при регистрации."
  },
  {
    "en": "`refines`, extending a rule: a rule of a project's own guidelines lists the fixtures of the tests of a check that reads citations, a list that the rule it refines leaves to each project. The closest mistake is an `implements` link from that rule: the rule does not state how the rule it builds on is implemented.",
    "ru": "`refines`, расширение правила: правило собственных guidelines проекта перечисляет фикстуры тестов проверки, которая читает ссылки, — этот перечень уточняемое правило оставляет каждому проекту. Ближайшая ошибка — связь `implements` от этого правила: оно не показывает, как выполняется правило, на которое опирается."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-gf6n8ge4mke3pr2"
  },
  {
    "type": "cites",
    "to": "s-cxtt6jvhqcey2k9"
  },
  {
    "type": "cites",
    "to": "s-u7tw6m8npxmv5tu"
  },
  {
    "type": "cites",
    "to": "s-vsh384ybt4w25a2"
  },
  {
    "type": "cites",
    "to": "s-khqsmy6mhejkrhg"
  }
]
```

### The current node

Title: What a link is

A link is a directed relation from one node to another. Every link states its meaning through its type. The types of link are:
- `implements` — the linking node states how the linked one is implemented.
- `refines` — the linking node states the linked node more precisely, or for a narrower case.
- `constrains` — the linking node states a condition the linked rule depends on.
- `exempts` — the linking node exempts the linked rule, or every rule under the linked section, from being implemented (§s-gf6n8ge4mke3pr2).
- `checks` — the linking node is a check, and it verifies that the linked rule is followed. Such a link is written by hand.
- `cites` — the linking node cites the linked one (§s-cxtt6jvhqcey2k9), and no other type says how the two relate to each other. So the linking node has no link of another type to the linked one.
- `term-relation` — the linking term and the linked term are bound, for as long as both exist, in the ratio the link carries.
- `uses` — what the linking term names makes use of what the linked term names while taking part in a process. The link carries no ratio. A term that only starts a process, such as an operator who starts an export, uses nothing the process uses.

An extension of the guidelines or a project's own guidelines (§s-u7tw6m8npxmv5tu) may define further types of link. Each such type states its meaning and contradicts no rule of the SpecSheriff guidelines.

Reason: A link without a type records only that somebody thought of two nodes together. No check can evaluate it. No diagram can draw it. A type named without its meaning is the same guess, one step removed.

A project may need a relation that the guidelines do not provide for, so its own guidelines may add a type of link, as they may add a kind of node.

## A location that differs from the computed one | key s-stxmhq3hgfndvn6 | sid s-stxmhq3hgfndvn6 | tools 7.1.4

### Text

`sheriff validate` refuses each node whose location (§s-kag2m9tzdnduxdx) differs from the one computed for it (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx). The refusal names the node's file and sid, the location that the file holds and the location computed.

`sheriff validate` checks each node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6).

### Reason

A location tells a reader where a node is only while it is the computed one. `sheriff reindex` writes every location after each edit that an agent makes (§s-477gtdrkw34dzxw), so a location that differs was written by hand, or left by a move of the node that no `sheriff reindex` followed.

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
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  }
]
```

### The current node

Title: Locations computed anew

`sheriff validate` computes in memory the location of each node from where it is, and compares it with the location its file holds.

Reason: (none)
