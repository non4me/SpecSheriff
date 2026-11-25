# Group 1 drafts for review (generated 2026-11-23T16:37:45.200Z)

## Outgoing links and citations | key s-qzyacnqwvaeaps4 | sid s-qzyacnqwvaeaps4 | tools 7.1.7

### Text

`sheriff validate` refuses each of the following in a node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6):

a link whose target is a sid that no node of the model of the specification holds (§s-w6gybeqn2ttydqx, §s-x8usyy38qa56k6a);

a sid that the node cites without declaring a link to the node that holds that sid (§s-vwyke96ggxx79je);

a `cites` link to a node that the node does not cite, or to a node to which the node also declares a link of another type (§s-vwyke96ggxx79je);

a citation by location (§s-whftqmshzc5wzhw).

The refusal names the node by its file, its sid and its location, and names the link or the citation.

A `§` followed by a sid and then by no lower-case letter or digit cites that sid, in text in backticks too (§s-cxtt6jvhqcey2k9). A citation of the node's own sid needs no link. A `§` followed by anything else, up to a space, a comma, a semicolon or a closing parenthesis, is a citation by location, unless it is in text in backticks.

`sheriff validate` reads every property of the node for citations except the following, in which a citation does not count (§s-cxtt6jvhqcey2k9):

its links;

the nodes under it, the nodes in its cells included;

the index of sections in a domain's header and the values gathered beside a field, which are built from other nodes.

`sheriff validate` reads the text cells of a `TableRule`, and the headings of its columns and groups, as properties of the `TableRule`.

### Reason

A citation may stand in any property of a node, its decisions included. So every property is read except those that hold links, other nodes or values built from other nodes. A sid in backticks still names a node, while a location in backticks only shows what a refused citation looks like.

### Examples

```json
[
  {
    "en": "A node's reason shows a refused citation as `§base/3.2`, in backticks, and `sheriff validate` accepts it. The same characters without backticks are refused as a citation by location. A sid in backticks still counts as a citation, so the node must declare a link to that sid's node.",
    "ru": "Обоснование узла показывает отвергаемую ссылку как `§base/3.2`, в обратных кавычках, и `sheriff validate` это принимает. Те же символы без обратных кавычек отвергаются как ссылка по расположению. Sid в обратных кавычках всё равно считается ссылкой, поэтому узел должен объявить связь с узлом этого sid."
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
    "type": "implements",
    "to": "s-vwyke96ggxx79je"
  },
  {
    "type": "implements",
    "to": "s-whftqmshzc5wzhw"
  },
  {
    "type": "implements",
    "to": "s-cxtt6jvhqcey2k9"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  }
]
```

### The current node in tools.json

Title: Outgoing links and citations

`sheriff validate` resolves the target of every outgoing link among the sids that exist.

It reads the citations in every node and sets them against the links the node makes:

- A `§` followed by a sid and then by no lower-case letter or digit cites that sid.
- A `§` followed by anything else, up to a space, a comma, a semicolon or a closing parenthesis, is a citation by a location.
- Text in backticks counts in the check as any other text does, except a citation by a location (§s-bpdqd9v72wg7vsz).
- A header's index and the values gathered beside a field are not read.

Reason: A node may show, in backticks, what a refused citation looks like.

## The types of a link between terms | key s-pvnnr844f3y964m | sid s-pvnnr844f3y964m | tools 7.1.8

### Text

`sheriff validate` accepts a link of type `term-relation` or `uses` only where it goes from a term node to another term node (§s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx). It accepts a link of any other type, `cites` included, only where at least one of its ends is a node other than a term node.

`sheriff validate` refuses every other link that a node of the specification in the files that the repository keeps declares. The refusal names the node that declares the link by its file, its sid and its location, and names the link's type and its target. It says that the link is to be settled with the specification's owners.

### Reason

Whether two terms are bound, and how, says how the entities that they name relate, which only the specification's owners can decide (§s-9w3u3wn37wksyxd). So the refusal sends whoever wrote the link to them, rather than suggesting a type.

### Examples

```json
[
  {
    "en": "A term cites another term and declares a `cites` link to it. `sheriff validate` refuses that link and sends the author to the owners. They decide whether the terms are bound by a `term-relation` link, and in which ratio, or by a `uses` link.",
    "ru": "Термин ссылается на другой термин и объявляет с ним связь `cites`. `sheriff validate` отвергает эту связь и отсылает автора к ответственным. Те решают, связаны ли термины связью `term-relation`, и в каком соотношении, или связью `uses`."
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
    "to": "s-76dutms9uv6uha2"
  },
  {
    "type": "cites",
    "to": "s-9w3u3wn37wksyxd"
  }
]
```

### The current node in tools.json

Title: The NodeKinds at the ends of a link

`sheriff validate` looks up the NodeKind of the node at each end of every outgoing link and sets it against the link's type.

Reason: (none)

## A run of words in capitals | key s-e2vdhfsndy5stq9 | sid s-e2vdhfsndy5stq9 | tools 7.1.10

### Text

`sheriff validate` refuses each run of three or more words set in capitals (§s-m6upmfq64kw5h4r, §s-83natrftdsmttsu). The refusal names the node by its file, its sid and its location, the property that holds the run, and the run.

`sheriff validate` checks each node of the specification in the files that the repository keeps, whatever its status. It reads a node's title, text and reason, the text in each member of its `TextRule.list`, and each text cell of a `TableRule` (§s-qeensty237e6mmm). It reads a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6) as it reads any other node.

In what it reads:

a word set in capitals is two or more characters long, starts with a capital letter, ends with a capital letter or a digit, and holds only capital letters, digits and hyphens, of any script;

a run is three or more such words with only spaces or tabs between them;

text in backticks or in double quotation marks is left out, since a quotation keeps the spelling of what it quotes (§s-7anvune6h4f6mbr).

### Reason

A single capital letter, such as the article “A” at the start of a sentence, is ordinary capitalisation. So a word set in capitals has at least two characters. Words separated by punctuation, such as abbreviations in a list, do not form a phrase, so only spaces and tabs join a run.

### Examples

```json
[
  {
    "en": "A rule's text ends with the words WITHOUT ANY EXCEPTION, written as part of its sentence. `sheriff validate` refuses the node and names that run. Two abbreviations in a row, such as REST API, pass.",
    "ru": "Текст правила заканчивается словами WITHOUT ANY EXCEPTION, написанными как часть предложения. `sheriff validate` отвергает узел и называет эти слова. Две аббревиатуры подряд, например REST API, проходят."
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

### The current node in tools.json

Title: Words running in capitals

`sheriff validate` reads the title, text and reason of every approved node, and of every section and domain's header, for three words or more running in capitals.

- Each such word has two characters or more.
- The words are separated only by spaces or tabs.
- Anything in backticks or double quotation marks is left out.

Reason: (none)

## A section with a rule in it | key s-zhen42p6mnaxu7w | sid s-zhen42p6mnaxu7w | tools 7.1.11

### Text

`sheriff validate` accepts a section of the specification in the files that the repository keeps only where the section contains a rule (§s-exxuckgakfxkycp), whatever its status. It refuses any other section, naming it by its file, its sid and its location.

A section contains a rule where at least one of the nodes directly under it is one of the following:

a node of the kind `TextRule` or `TableRule` (§s-5fewsp22mmdz7y6), or, where the project has chosen the RecordType extension, of the kind `RecordType` (§s-ktfstpv8rurznrp);

a term or a node of a project's own kind (§s-pctqj9wqaq8762t);

a section that contains a rule.

### Reason

A section whose rules have all been moved or removed still reads as a part of the specification. Its derived status gives no sign of it. The kinds of the nodes under a section show whether it contains a rule, without reading their wording.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-exxuckgakfxkycp"
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
    "to": "s-pctqj9wqaq8762t"
  }
]
```

### The current node in tools.json

Title: A section with a rule in it

`sheriff validate` reads the children of every section, and those of each section inside it, for a node that counts as a rule (§s-7445ahgjck2aefg).

Reason: (none)
