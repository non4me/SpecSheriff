# Group 3 drafts for the confirming review (generated 2026-11-24T12:15:12.034Z)

## A node's `meta.code` and `meta.tests` | key s-t383grkn3q68dpf | sid s-t383grkn3q68dpf | tools 7.2.5

### Text

`sheriff binding` refuses each node whose `meta.code` or `meta.tests` (§s-rwqzepmrt77rv35) differs from the list that `sheriff reindex` would write there (§s-ztseyetus7np6br) from the SpecTags (§s-8xw4mgvpexyvw5q) as the commit leaves the code and the tests (§s-tqdmk6jakx97wra). The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and gives that list.

`sheriff binding` compares each list regardless of the order of its entries. It checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It makes this check regardless of whether the specification is approved or a draft (§s-tqdmk6jakx97wra).

### Reason

`sheriff reindex` writes a node's `meta.code` and `meta.tests` from the SpecTags (§s-ztseyetus7np6br), but a person may edit them by hand or commit without running it. A list that differs from the SpecTags would show a reader code or tests that are not bound to the node, or would hide some that are.

### Examples

```json
[
  {
    "en": "Rule R is implemented by the function `render` in `src/page.ts` and by `src/texts.json`, which the bindings file binds to R. The `meta.code` of R names both files, and `sheriff binding` accepts it. The most likely mistake is to count only the SpecTags placed above symbols, which would make `sheriff binding` refuse that `meta.code` for naming `src/texts.json`.",
    "ru": "Правило R реализуют функция `render` в `src/page.ts` и файл `src/texts.json`, который файл привязок привязывает к R. `meta.code` правила R называет оба файла, и `sheriff binding` его принимает. Самая вероятная ошибка — считать только SpecTag над символами: тогда `sheriff binding` отверг бы этот `meta.code` за то, что он называет `src/texts.json`."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-tqdmk6jakx97wra"
  },
  {
    "type": "cites",
    "to": "s-rwqzepmrt77rv35"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-ztseyetus7np6br"
  }
]
```

### The current node

Title: A node's `meta.code` and `meta.tests`

`sheriff binding` collects the SpecTags on the code and on the tests across the repository, and compares them with each node's `meta.code` and `meta.tests`.

Reason: (none)

## What `sheriff reindex` writes | key proposal:s-ztseyetus7np6br-g3 | sid s-ztseyetus7np6br | tools 2.2 (new)

### Text

`sheriff reindex` writes into the files of the specification everything that the SpecSheriff tools compute from the specification, the code and the tests:

a sid for each node that has none, including a node in a cell of a `TableRule` (§s-9spq78kdwsxr759, §s-5fewsp22mmdz7y6);

the location of each node (§s-kag2m9tzdnduxdx, §s-ygg5kpcxgzq3m7w);

the links pointing at each node, rebuilt from the links that the nodes declare (§s-bpdqd9v72wg7vsz);

the list `meta.code` of each node (§s-rwqzepmrt77rv35), naming each file, other than a test file, that holds code bound by a SpecTag (§s-8xw4mgvpexyvw5q) naming the node, including a file bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft);

the list `meta.tests` of each node, naming each test that declares a SpecTag naming the node (§s-zrsc6asgmhv8tnc), by its file and its name;

the approval status of each section, derived from every node under it other than a section, including the nodes in the cells of a `TableRule` (§s-9kfdycuq34beqvs);

where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of the header of each domain, derived from every node of the domain other than its sections and the header itself, including the nodes in the cells of a `TableRule` (§s-yccuyqbypzzx2gu);

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
  },
  {
    "type": "cites",
    "to": "s-5qdjyf6t898rsd4"
  },
  {
    "type": "cites",
    "to": "s-trwczfskj5zmuft"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-zrsc6asgmhv8tnc"
  }
]
```

### The wording the owner agreed to (proposal:s-ztseyetus7np6br)

Title: What `sheriff reindex` writes

`sheriff reindex` writes into the files of the specification everything that the SpecSheriff tools compute from the specification, the code and the tests:

a sid for each node that has none, including a node in a cell of a `TableRule` (§s-9spq78kdwsxr759, §s-5fewsp22mmdz7y6);

the location of each node (§s-kag2m9tzdnduxdx, §s-ygg5kpcxgzq3m7w);

the links pointing at each node, rebuilt from the links that the nodes declare (§s-bpdqd9v72wg7vsz);

the lists `meta.code` and `meta.tests` of each node, built from the SpecTags that bind code and tests to the node (§s-rwqzepmrt77rv35): `meta.code` names each code file that holds a symbol bound by such a SpecTag, and `meta.tests` names each such test by its file and its name;

the approval status of each section, derived from every node under it other than a section, including the nodes in the cells of a `TableRule` (§s-9kfdycuq34beqvs);

where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of the header of each domain, derived from every node of the domain other than its sections and the header itself, including the nodes in the cells of a `TableRule` (§s-yccuyqbypzzx2gu);

where the project has chosen the Domains extension, the index of the sections in the header of each domain that has sections (§s-2r59txnms5serdr);

where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered for each field that has an `enum` whose values come from elsewhere in the specification, in the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh).

In the files that the repository keeps, an approved node whose approval status is set by approvals stays approved while an approval of its current wording stands (§s-v4qus7raqnwzneb). `sheriff reindex` makes each remaining such node a draft and names it.

`sheriff reindex` writes only the files that the repository keeps. It writes a file only when the text it would write differs from the file's text. It names each file that it writes.

`sheriff reindex` writes each file as `JSON.stringify` writes the file's data with an indent of two spaces, with a line feed at the end, with each node's `location` and `sid` first, and with all the other keys in the order in which the file already has them.

Reason: The SpecSheriff tools themselves write whatever they can compute from the specification, the code and the tests, so that it always agrees with its sources and nobody spends effort writing it. Because it is rebuilt in full on every run, it is correct regardless of what an earlier run left behind (§s-jsqxdx47wkkj7gp).
