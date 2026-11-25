# Group 1 drafts for review (generated 2026-11-23T23:11:25.489Z)

## A node's location | key proposal:s-kag2m9tzdnduxdx | sid s-kag2m9tzdnduxdx | spec 8.5

### Text

A node's location names where it is in the specification: the part it is in, followed by its place there. A node's place is its number among the nodes under the same parent. The following nodes take no number:

a term (§s-khqsmy6mhejkrhg), whose place is the term's name;

the top-level node of a file of the guidelines or of the technical appendix (§s-tj38pvm38nepaf5), which takes as its location the part's name followed by the file's name;

a node of a kind that an extension of the guidelines (§s-mbmnsnxenmavu3z) defines and that a part of the base specification (§s-5x737t9nee4zgaa) opens with, which takes the part's name alone as its location.

In each file of the guidelines or of the technical appendix, the nodes are numbered under the location of the file's top-level node. The nodes under a node whose location is the part's name alone are numbered together with the other top-level nodes of the part.

The location is computed from where the node is and is never written by hand.

### Reason

A location is computed from where a node is, so it always shows a reader where to find the node.

### Examples

```json
[
  {
    "en": "A rule kept in `specs/_guidelines/spec.json` as the fifth node of the file's eighth section is at `_guidelines/spec/8.5`. Where an extension makes a part `requests` open with a header, the header is at `requests`, and the part's first section, kept in another of its files, is at `requests/1`. The most likely mistake is to number the header, which would put that section at `requests/2`.",
    "ru": "Правило, которое хранится в `specs/_guidelines/spec.json` пятым узлом восьмого раздела этого файла, расположено в `_guidelines/spec/8.5`. Если расширение открывает часть `requests` заголовком, заголовок расположен в `requests`, а первый раздел части, хранящийся в другом её файле, — в `requests/1`. Самая вероятная ошибка — пронумеровать заголовок: тогда этот раздел оказался бы в `requests/2`."
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
    "to": "s-khqsmy6mhejkrhg"
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

## The approval status of a domain's header | key proposal:domains-header-status | sid s-yccuyqbypzzx2gu | domains 11.1.4a (new, after "A domain's header carries the index built from its sections")

### Text

The SpecSheriff tools derive the approval status (§s-tgrnpagrb58tya7) of a domain's header (§s-yggv9myedprnaa7) in the same way as they derive a section's (§s-9kfdycuq34beqvs). The header is approved while every node of the domain other than its sections and the header itself is approved, in whichever of the domain's documents (§s-k73czmpkazcx7mu) the node is kept. Nobody approves a header.

### Reason

A header, like a section, requires nothing, so it leaves an owner nothing to agree to. Its approval status shows at a glance whether the whole domain is approved, which helps where only the headers are visible.

### Examples

```json
[
  {
    "en": "A domain is kept in two documents: the first holds its header and a section under it, and the second holds another section, one rule of which is a draft. The header's approval status is draft. Once that rule is approved, the header becomes approved too, though nobody approved the header. The most likely mistake is to derive the header's approval status only from the nodes under the header, and so to show the header as approved while a rule in the second document is still a draft.",
    "ru": "Домен хранится в двух документах: в первом — его заголовок и раздел под ним, во втором — ещё один раздел, и одно правило в нём — черновик. Статус одобрения заголовка — черновик. Когда это правило одобрят, заголовок тоже станет одобренным, хотя заголовок никто не одобрял. Самая вероятная ошибка — выводить статус одобрения заголовка только из узлов под заголовком и тем самым показывать заголовок одобренным, пока правило во втором документе ещё черновик."
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
    "type": "refines",
    "to": "s-tgrnpagrb58tya7"
  },
  {
    "type": "cites",
    "to": "s-k73czmpkazcx7mu"
  },
  {
    "type": "refines",
    "to": "s-9g7jj8z4yf9kq93"
  }
]
```

### The current node

(none: this node is new)

## null | key proposal:row-10-1-8 | sid s-cey3k9xxjvkpyqz | spec 10.1.8 (row of the main table of checks)

### Text

Every node of the specification outside both the SpecSheriff guidelines that a project uses and the extensions that the project has chosen, except a section and any other node whose approval status is derived from other nodes, is approved only while an approval of its current wording is in force

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

## null | key proposal:row-10-1-17 | sid s-83natrftdsmttsu | spec 10.1.17 (row of the main table of checks)

### Text

No sentence of the specification is written in capital letters. The only exceptions are abbreviations, constants and special designations, such as part numbers, where there are no more than two of them in a row. The deterministic check uses this criterion: no sentence contains three or more consecutive words written in capital letters

### Reason

(none)

### Examples

```json
[
  {
    "en": "“REST API” in a sentence passes: two consecutive abbreviations. “HTTP REST API” is refused, though each of its words is an abbreviation: three consecutive words in capitals.",
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

## An agent's edit is checked before it is made | key proposal:s-83ev4wwesbwnhnp | sid s-83ev4wwesbwnhnp | spec 10.3

### Text

Before an agent's edit is made, the SpecSheriff tools refuse it if it would do any of the following:

leave a node approved with a wording for which no approval stands (§s-5ah25f6gy99panq), unless the node is a section or any other node whose approval status (§s-tgrnpagrb58tya7) is derived from other nodes;

change the code written for a rule, including a rule of a project's own kind (§s-vsh384ybt4w25a2), while no test has that rule's SpecTag (§s-rah8b37kytb682y);

change the approvals, or the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) or its `strict` flag (§s-q3pfzyaxvpr2zj2), or the record of the extensions that the project has chosen (§s-9ttvcwpqkehm58g), other than through the procedures that record or withdraw them.

The refusal before an edit applies only to an edit whose request names the files it writes to and what it writes to them. A shell command names neither.

### Reason

A check that runs later sees only the result: the approvals, which it takes as given, and a commit that contains a test together with the code it tests. So only a check made before an edit can keep an agent from making a decision that only the owners may make, or from writing code before its test.

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
  },
  {
    "type": "cites",
    "to": "s-tgrnpagrb58tya7"
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
