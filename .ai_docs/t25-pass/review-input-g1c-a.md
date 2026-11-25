# Group 1 drafts for review (generated 2026-11-23T20:18:20.176Z)

## A node's location | key proposal:s-kag2m9tzdnduxdx | sid s-kag2m9tzdnduxdx | spec 8.5

### Text

A node's location names where it is in the specification: the part it is in, followed by its place there. A node's place is its number among the nodes under the same parent. The following nodes take no number:

a term (§s-ypa92gpcj3f5zj8), whose place is the term's name;

the node at the top of a file of the guidelines or of the technical appendix (§s-tj38pvm38nepaf5), which takes as its location the part's name and the file's;

where an extension of the guidelines (§s-mbmnsnxenmavu3z) defines a kind of node that a part of the base specification (§s-5x737t9nee4zgaa) opens with, a node of that kind, which takes the part's name alone as its location.

In each file of the guidelines or of the technical appendix, the nodes are numbered under the location of the file's top node. The nodes under a node that a part opens with are numbered together with the other nodes at the top of the part.

The location is computed from where the node is and is never written by hand.

### Reason

A location tells a reader where a node is. Because it is computed, it can never disagree with where the node is.

### Examples

```json
[
  {
    "en": "A rule kept in `specs/_guidelines/spec.json` as the fifth node of its eighth section is at `_guidelines/spec/8.5`. Where an extension makes a part `requests` open with a header, the header is at `requests`, and the part's first section, kept in another of its files, is at `requests/1`. The closest mistake is to number the header, which would put that section at `requests/2`.",
    "ru": "Правило, которое хранится в `specs/_guidelines/spec.json` пятым узлом его восьмого раздела, расположено в `_guidelines/spec/8.5`. Если расширение открывает часть `requests` заголовком, заголовок расположен в `requests`, а первый раздел части, хранящийся в другом её файле, — в `requests/1`. Ближайшая ошибка — пронумеровать заголовок: тогда этот раздел оказался бы в `requests/2`."
  }
]
```

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
  },
  {
    "type": "cites",
    "to": "s-ypa92gpcj3f5zj8"
  },
  {
    "type": "cites",
    "to": "s-tj38pvm38nepaf5"
  },
  {
    "type": "cites",
    "to": "s-5x737t9nee4zgaa"
  }
]
```

### The current node

Title: A node's location

A node's location names where it is in the specification: the part it is in, followed by its place there. A node's place is its number among the nodes under the same parent. A term takes no number. Its place is the term's name.

The node at the top of a file of the guidelines or of the technical appendix takes as its location the part's name and the file's. In each such file, the nodes are numbered under the location of the file's top node.

The location is computed from where the node is and is never written by hand.

Reason: A location tells a reader where a node is. Because it is computed, it can never disagree with where the node is.

## An agent's edit is checked before it is made | key proposal:s-83ev4wwesbwnhnp | sid s-83ev4wwesbwnhnp | spec 10.3

### Text

Before an agent's edit is made, the SpecSheriff tools refuse it if it would do any of the following:

leave a node approved with a wording for which no approval stands (§s-5ah25f6gy99panq), unless the node is a section or another node whose approval status is derived from other nodes;

change the code written for a rule, including a rule of a project's own kind (§s-vsh384ybt4w25a2), while no test has that rule's SpecTag (§s-rah8b37kytb682y);

change the approvals, the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) or its `strict` flag (§s-q3pfzyaxvpr2zj2), or the record of the extensions that the project has chosen (§s-9ttvcwpqkehm58g), other than through the procedures that record or withdraw them.

The refusal before an edit applies only to an edit whose request names the files it writes to and what it writes to them. A shell command names neither.

### Reason

An agent that could set an approval status, write an approval, set the `strict` flag or choose an extension itself could make a decision that only the owners make. Every later check takes the approvals as given, so they can be guarded only where they are written.

A commit contains a test and its code together, whichever of them was written first, so the order of the work can be enforced only where the edits are made. Before a shell command runs, no deterministic check can tell which files it will change or how.

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-5ah25f6gy99panq"
  },
  {
    "type": "cites",
    "to": "s-vsh384ybt4w25a2"
  },
  {
    "type": "cites",
    "to": "s-rah8b37kytb682y"
  },
  {
    "type": "cites",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "cites",
    "to": "s-q3pfzyaxvpr2zj2"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-67vekyup7y8smap"
  },
  {
    "type": "cites",
    "to": "s-sfjka4zc4rhfu67"
  }
]
```

### The current node

Title: An agent's edit is checked before it is made

Before an agent's edit is made, the SpecSheriff tools refuse it if it would do any of the following:
- leave a node approved with a wording for which no approval stands (§s-5ah25f6gy99panq), unless the node is a section;
- change the code written for a rule, including a rule of a project's own kind (§s-vsh384ybt4w25a2), while no test has that rule's SpecTag (§s-rah8b37kytb682y);
- change the approvals, the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) or its `strict` flag (§s-q3pfzyaxvpr2zj2), or the record of the extensions that the project has chosen (§s-9ttvcwpqkehm58g), other than through the procedures that record or withdraw them.

The refusal before an edit applies only to an edit whose request names the files it writes to and what it writes to them. A shell command names neither.

Reason: An agent that could set an approval status, write an approval, set the `strict` flag or choose an extension itself could make a decision that only the owners make. Every later check takes the approvals as given, so they can be guarded only where they are written.

A commit contains a test and its code together, whichever of them was written first, so the order of the work can be enforced only where the edits are made. Before a shell command runs, no deterministic check can tell which files it will change or how.

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

## The approval status of a domain's header | key proposal:domains-header-status | sid s-yccuyqbypzzx2gu | domains 11.1.4a (new, after "A domain's header carries the index built from its sections")

### Text

The SpecSheriff tools derive the approval status (§s-tgrnpagrb58tya7) of a domain's header (§s-yggv9myedprnaa7) as they derive a section's (§s-9kfdycuq34beqvs). The header is approved while every node of the domain other than a section and other than the header itself is approved, in whichever of the domain's documents (§s-k73czmpkazcx7mu) the node is kept. Nobody approves a header.

### Reason

A header, like a section, requires nothing, so it leaves an owner nothing to agree to. Its approval status shows at a glance whether the whole domain is approved, which helps where only the headers are visible.

### Examples

```json
[
  {
    "en": "A domain is kept in two documents: the first holds its header, and the second holds its two sections, one rule of which is a draft. The header's approval status is draft. Once that rule is approved, the header becomes approved too, though nobody approved the header. The closest mistake is to derive the header's status only from the nodes under the header, of which there are none here, and so to show the header approved while a rule of the domain is still a draft.",
    "ru": "Домен хранится в двух документах: в первом — его заголовок, во втором — два его раздела, и одно правило в них — черновик. Статус одобрения заголовка — черновик. Когда это правило одобрят, заголовок тоже станет одобренным, хотя заголовок никто не одобрял. Ближайшая ошибка — выводить статус заголовка только из узлов под заголовком, которых здесь нет, и тем самым показывать заголовок одобренным, пока правило домена ещё черновик."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-9kfdycuq34beqvs"
  },
  {
    "type": "cites",
    "to": "s-yggv9myedprnaa7"
  },
  {
    "type": "cites",
    "to": "s-tgrnpagrb58tya7"
  },
  {
    "type": "cites",
    "to": "s-k73czmpkazcx7mu"
  }
]
```

### The current node

(none: this node is new)
