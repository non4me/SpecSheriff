# Group 1 drafts for review (generated 2026-11-23T19:50:28.494Z)

## A node's location | key proposal:s-kag2m9tzdnduxdx | sid s-kag2m9tzdnduxdx | spec 8.5

### Text

A node's location names where it is in the specification: the part it is in, followed by its place there. A node's place is its number among the nodes under the same parent. A term takes no number. Its place is the term's name.

The node at the top of a file of the guidelines or of the technical appendix takes as its location the part's name and the file's. In each such file, the nodes are numbered under the location of the file's top node.

An extension of the guidelines (§s-mbmnsnxenmavu3z) may define a kind of node that a part of the base specification opens with. A node of such a kind takes the part's name alone as its location, with no number. The nodes under it are numbered together with the other nodes at the top of the part.

The location is computed from where the node is and is never written by hand.

### Reason

A location tells a reader where a node is. Because it is computed, it can never disagree with where the node is.

A node that a part opens with describes the part as a whole, so the part's name locates it. The nodes under it are numbered with the part's other nodes, so that their locations do not depend on which of the part's files holds them.

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-rwqzepmrt77rv35"
  },
  {
    "type": "cites",
    "to": "s-vsh384ybt4w25a2"
  },
  {
    "type": "cites",
    "to": "s-mbmnsnxenmavu3z"
  }
]
```

### The current node

Title: A node's location

A node's location names where it is in the specification: the part it is in, followed by its place there. A node's place is its number among the nodes under the same parent. A term takes no number. Its place is the term's name.

The node at the top of a file of the guidelines or of the technical appendix takes as its location the part's name and the file's. In each such file, the nodes are numbered under the location of the file's top node.

The location is computed from where the node is and is never written by hand.

Reason: A location tells a reader where a node is. Because it is computed, it can never disagree with where the node is.

## The approval status of a domain's header | key proposal:domains-header-status | sid s-yccuyqbypzzx2gu | domains 11.1.4a (new, after "A domain's header carries the index built from its sections")

### Text

A domain's header (§s-yggv9myedprnaa7) has an approval status (§s-tgrnpagrb58tya7), which the SpecSheriff tools derive as they derive a section's (§s-9kfdycuq34beqvs). They derive it from every node of the domain other than a section and other than the header itself, in whichever of the domain's documents the node is kept. Nobody approves a header.

### Reason

A header, like a section, requires nothing, so it leaves an owner nothing to agree to. Its approval status shows at a glance whether the whole domain is approved, which helps where only the headers are visible.

### Examples

```json
[
  {
    "en": "A domain holds two sections, and one rule in one of them is a draft. The header's approval status is draft. Once that rule is approved, the header is approved too, though nobody approved the header.",
    "ru": "В домене два раздела, и одно правило в одном из них — черновик. Статус одобрения заголовка — черновик. Когда это правило одобрят, заголовок тоже станет одобренным, хотя заголовок никто не одобрял."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "refines",
    "to": "s-9kfdycuq34beqvs"
  },
  {
    "type": "cites",
    "to": "s-yggv9myedprnaa7"
  },
  {
    "type": "cites",
    "to": "s-tgrnpagrb58tya7"
  }
]
```

### The current node

(none: this node is new)

## null | key proposal:11-3-header-status-row | sid s-bn8rvk6du2jkf2d | domains 11.3.2a (new row of the table of checks of the Domains extension, after row 11.3.2)

### Text

The approval status of a domain's header is derived from the approval statuses of all the other nodes of the domain

### Reason

(none)

### Outgoing links

```json
[
  {
    "type": "checks",
    "to": "s-yccuyqbypzzx2gu"
  }
]
```

### The current node

(none: this node is new)

## null | key proposal:row-10-1-8 | sid s-cey3k9xxjvkpyqz | spec 10.1.8 (row of the main table of checks)

### Text

Every node of the specification outside the SpecSheriff guidelines that a project uses and the extensions that it has chosen, except a section and any other node that nobody approves, is approved only while an approval of its current wording is in force

### Reason

(none)

### Outgoing links

```json
[
  {
    "type": "checks",
    "to": "s-9g7jj8z4yf9kq93"
  },
  {
    "type": "checks",
    "to": "s-5ah25f6gy99panq"
  }
]
```

### The current node

(none: this node is new)

## What a link is | key proposal:s-sn6au3vcr9uy5pm | sid s-sn6au3vcr9uy5pm | spec 6.1

### Text

A link is a directed relation from one node to another. Every link states its meaning through its type. The types of link are:

`implements` — the linking node states how the linked one is implemented.

`refines` — the linking node states the linked node more precisely, states it for a narrower case, or extends it. A node extends another when it adds a requirement on the other node's subject that the other leaves open, such as a value that the other leaves to each project. The linking node leaves every requirement of the linked node in force. Where the linking node states how the linked node is implemented, the link is of type `implements` instead.

`constrains` — the linking node states a condition the linked rule depends on.

`exempts` — the linking node exempts the linked rule, or every rule under the linked section, from being implemented (§s-gf6n8ge4mke3pr2).

`checks` — the linking node is a check, and it verifies that the linked rule is followed. Such a link is written by hand.

`cites` — the linking node cites the linked one (§s-cxtt6jvhqcey2k9), and no other type says how the two relate to each other. So the linking node has no link of another type to the linked one.

`term-relation` — the linking term and the linked term are bound, for as long as both exist, in the ratio the link carries.

`uses` — what the linking term names makes use of what the linked term names while taking part in a process. The link carries no ratio. A term that only starts a process, such as an operator who starts an export, uses nothing the process uses.

An extension of the guidelines or a project's own guidelines (§s-u7tw6m8npxmv5tu) may define further types of link. Each such type states its meaning and contradicts no rule of the SpecSheriff guidelines.

### Reason

A link without a type records only that somebody thought of two nodes together. No check can evaluate it. No diagram can draw it. A type named without its meaning is the same guess, one step removed.

A project may need a relation that the guidelines do not provide for, so its own guidelines may add a type of link, as they may add a kind of node.

One type records both refining and extending a node, since the line between the two is thin and no check can tell them apart. A node that weakened the node it refines would make that node untrue wherever the weaker node applies.

### Examples

```json
[
  {
    "en": "`uses`: a user fills in a form while signing up.",
    "ru": "`uses`: пользователь заполняет форму при регистрации."
  },
  {
    "en": "`refines`, extending a rule: a rule of a project's own guidelines lists the files that the project's tests use as fixtures, which the rule it refines leaves to each project. The closest mistake is an `implements` link from that rule, which does not state how the rule it builds on is implemented.",
    "ru": "`refines`, расширение правила: правило собственных guidelines проекта перечисляет файлы, которые тесты проекта используют как фикстуры, — это уточняемое правило оставляет каждому проекту. Ближайшая ошибка — связь `implements` от этого правила: оно не показывает, как выполняется правило, на которое опирается."
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

## null | key proposal:row-10-1-17 | sid s-83natrftdsmttsu | spec 10.1.17 (row of the main table of checks)

### Text

No sentence of the specification is written in capital letters. The only exceptions are abbreviations, constants and special designations, such as part numbers, one or two in a row. The deterministic check uses this criterion: no sentence contains three or more consecutive words written in capital letters

### Reason

(none)

### Examples

```json
[
  {
    "en": "“REST API” in a sentence passes: two abbreviations in a row. “HTTP REST API” is refused, though each of its words is an abbreviation: three words in capitals in a row.",
    "ru": "«REST API» в предложении проходит: две аббревиатуры подряд. «HTTP REST API» отвергается, хотя каждое его слово — аббревиатура: три слова заглавными подряд."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "checks",
    "to": "s-m6upmfq64kw5h4r"
  }
]
```

### The current node

(none: this node is new)

## What `sheriff reindex` writes | key proposal:s-ztseyetus7np6br | sid s-ztseyetus7np6br | tools 2.2 (new)

### Text

`sheriff reindex` writes into the files of the specification everything that the SpecSheriff tools compute from the specification, the code and the tests:

a sid for each node that has none, including a node in a cell of a `TableRule` (§s-9spq78kdwsxr759, §s-5fewsp22mmdz7y6);

the location of each node, as the SpecSheriff tools compute it (§s-kag2m9tzdnduxdx, §s-ygg5kpcxgzq3m7w);

the links pointing at each node, rebuilt from the links that the nodes declare (§s-bpdqd9v72wg7vsz);

the lists `meta.code` and `meta.tests` of each node, built from the SpecTags that bind code and tests to the node (§s-rwqzepmrt77rv35): `meta.code` names each code file that holds a symbol bound by such a SpecTag, and `meta.tests` names each such test by its file and its name;

the approval status of each section, derived from every node under it other than a section, the nodes in the cells of a `TableRule` included (§s-9kfdycuq34beqvs);

where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of each domain's header (§s-yccuyqbypzzx2gu);

where the project has chosen the Domains extension, the index of the sections in the header of each domain that has sections (§s-2r59txnms5serdr);

where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered for each field that has an `enum` whose values come from elsewhere in the specification, in the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh).

In the files that the repository keeps, an approved node whose approval status is set by approvals stays approved while an approval of its current wording stands (§s-v4qus7raqnwzneb). `sheriff reindex` makes each remaining such node a draft and names it.

`sheriff reindex` writes only the files that the repository keeps. It writes a file only when the text it would write differs from the file's text. It names each file that it writes.

`sheriff reindex` writes each file as `JSON.stringify` writes the file's data with an indent of two spaces, with a line feed at the end, with each node's `location` and `sid` first, and with all the other keys in the order that the file already has them.

### Reason

What the SpecSheriff tools can compute from the specification, the code and the tests, the tools write themselves, so that it always agrees with its sources and nobody spends effort writing it. Because it is rebuilt in full on every run, it is correct regardless of what an earlier run left behind (§s-jsqxdx47wkkj7gp).

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-9spq78kdwsxr759"
  },
  {
    "type": "implements",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "implements",
    "to": "s-bpdqd9v72wg7vsz"
  },
  {
    "type": "implements",
    "to": "s-rwqzepmrt77rv35"
  },
  {
    "type": "implements",
    "to": "s-9kfdycuq34beqvs"
  },
  {
    "type": "implements",
    "to": "s-2r59txnms5serdr"
  },
  {
    "type": "implements",
    "to": "s-ju5vcanbjph7mgh"
  },
  {
    "type": "implements",
    "to": "s-jsqxdx47wkkj7gp"
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
    "to": "s-hzuzn8hbq6q9q4s"
  },
  {
    "type": "implements",
    "to": "s-5ah25f6gy99panq"
  },
  {
    "type": "cites",
    "to": "s-v4qus7raqnwzneb"
  },
  {
    "type": "implements",
    "to": "s-yccuyqbypzzx2gu"
  },
  {
    "type": "cites",
    "to": "s-ygg5kpcxgzq3m7w"
  }
]
```

### The current node

(none: this node is new)
