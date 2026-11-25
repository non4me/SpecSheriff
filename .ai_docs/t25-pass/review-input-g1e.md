# Group 1 drafts for review (generated 2026-11-23T23:01:34.133Z)

## A location that differs from the computed one | key s-stxmhq3hgfndvn6 | sid s-stxmhq3hgfndvn6 | tools 7.1.4

### Text

`sheriff validate` refuses each node whose location (§s-kag2m9tzdnduxdx) differs from the one computed for it (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx). The refusal names the node's file and sid, the location that the file holds and the computed location.

`sheriff validate` checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).

### Reason

A location tells a reader where a node is only while it is the computed one. `sheriff reindex` writes every location after each edit that an agent makes (§s-477gtdrkw34dzxw). So a location that differs from the computed one was written by hand, or was left behind when the node was moved and `sheriff reindex` did not run afterwards.

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

## What a link is | key proposal:s-sn6au3vcr9uy5pm | sid s-sn6au3vcr9uy5pm | spec 6.1

### Text

A link is a directed relation from one node to another. Every link states its meaning through its type. The types of link are:

`implements` — the linking node states how the linked one is implemented.

`refines` — the linking node states more precisely what the linked node states, states it for a narrower case, or extends the linked node. A node extends another when it adds a requirement on a question that the other leaves open within its own subject, such as a value that the other leaves to each project. The linking node leaves every requirement of the linked node in force.

`constrains` — the linking node states a condition the linked rule depends on.

`exempts` — the linking node exempts the linked rule, or every rule under the linked section, from being implemented (§s-gf6n8ge4mke3pr2).

`checks` — the linking node is a check, and it verifies that the linked rule is followed. Such a link is written by hand.

`cites` — the linking node cites the linked one (§s-cxtt6jvhqcey2k9), and no other type says how the two relate to each other. So the linking node has no link of another type to the linked one.

`term-relation` — the linking term (§s-khqsmy6mhejkrhg) and the linked term are bound, for as long as both exist, in the ratio the link carries (§s-bckzdwd35d2nefa).

`uses` — what the linking term names makes use of what the linked term names while taking part in a process. The link carries no ratio. A term that only starts a process, such as an operator who starts an export, uses nothing the process uses.

An extension of the guidelines (§s-mbmnsnxenmavu3z) or a project's own guidelines (§s-u7tw6m8npxmv5tu) may define further types of link. Each such type states its meaning and contradicts no rule of the SpecSheriff guidelines.

### Reason

A link without a type records only that somebody thought of two nodes together. No check can evaluate it. No diagram can show it. A type named without its meaning is the same guess, one step removed.

### Examples

```json
[
  {
    "en": "`uses`: a user fills in a form while signing up.",
    "ru": "`uses`: пользователь заполняет форму при регистрации."
  },
  {
    "en": "`refines`, extending a rule: a rule of a project's own guidelines lists the fixtures of the tests of a check that reads citations, a list that the rule it refines leaves to each project. The most likely mistake is an `implements` link from the project's rule: that rule does not state how the rule it refines is implemented.",
    "ru": "`refines`, расширение правила: правило собственных guidelines проекта перечисляет фикстуры тестов проверки, которая читает ссылки, — этот перечень уточняемое правило оставляет каждому проекту. Самая вероятная ошибка — связь `implements` от правила проекта: оно не показывает, как выполняется правило, которое оно уточняет."
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
  },
  {
    "type": "cites",
    "to": "s-bckzdwd35d2nefa"
  },
  {
    "type": "cites",
    "to": "s-mbmnsnxenmavu3z"
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

## What `sheriff reindex` writes | key proposal:s-ztseyetus7np6br | sid s-ztseyetus7np6br | tools 2.2 (new)

### Text

`sheriff reindex` writes into the files of the specification everything that the SpecSheriff tools compute from the specification, the code and the tests:

a sid for each node that has none, including a node in a cell of a `TableRule` (§s-9spq78kdwsxr759, §s-5fewsp22mmdz7y6);

the location of each node (§s-kag2m9tzdnduxdx, §s-ygg5kpcxgzq3m7w);

the links pointing at each node, rebuilt from the links that the nodes declare (§s-bpdqd9v72wg7vsz);

the lists `meta.code` and `meta.tests` of each node, built from the SpecTags that bind code and tests to the node (§s-rwqzepmrt77rv35): `meta.code` names each code file that holds a symbol bound by such a SpecTag, and `meta.tests` names each such test by its file and its name;

the approval status of each section, derived from every node under it other than a section, including the nodes in the cells of a `TableRule` (§s-9kfdycuq34beqvs);

where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of the header of each domain, derived from every node of the domain other than its sections and the header itself, including those in the cells of a `TableRule` (§s-yccuyqbypzzx2gu);

where the project has chosen the Domains extension, the index of the sections in the header of each domain that has sections (§s-2r59txnms5serdr);

where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered for each field that has an `enum` whose values come from elsewhere in the specification, in the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh).

In the files that the repository keeps, an approved node whose approval status is set by approvals stays approved while an approval of its current wording stands (§s-v4qus7raqnwzneb). `sheriff reindex` makes each remaining such node a draft and names it.

`sheriff reindex` writes only the files that the repository keeps. It writes a file only when the text it would write differs from the file's text. It names each file that it writes.

`sheriff reindex` writes each file as `JSON.stringify` writes the file's data with an indent of two spaces, with a line feed at the end, with each node's `location` and `sid` first, and with all the other keys in the order in which the file already has them.

### Reason

The SpecSheriff tools themselves write whatever they can compute from the specification, the code and the tests, so that it always agrees with its sources and nobody spends effort writing it. Because it is rebuilt in full on every run, it is correct regardless of what an earlier run left behind (§s-jsqxdx47wkkj7gp).

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
