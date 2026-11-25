# Group 1 drafts for review (generated 2026-11-23T19:50:39.381Z)

## The target of a link | key new:tools-7-1-link-target | sid s-c4rn9fj4czk768b | tools 7.1.7a (new, before "Outgoing links and citations")

### Text

`sheriff validate` refuses each link whose target is a sid that no node of the model of the specification holds (§s-w6gybeqn2ttydqx, §s-x8usyy38qa56k6a). It checks each link that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). The refusal names the node that declares the link by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and names the link's type and its target.

### Reason

Only a link whose target is a node of the specification can be followed, and only such a link is built into the node that it points at (§s-bpdqd9v72wg7vsz).

### Examples

```json
[
  {
    "en": "A rule keeps a `refines` link to a rule that a later commit removed and archived. `sheriff validate` refuses the link, since no node of the specification holds the removed rule's sid any longer.",
    "ru": "Правило сохраняет связь `refines` с правилом, которое более поздний коммит удалил и отправил в архив. `sheriff validate` отвергает эту связь: ни у одного узла спецификации больше нет sid удалённого правила."
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

## Outgoing links and citations | key s-qzyacnqwvaeaps4 | sid s-qzyacnqwvaeaps4 | tools 7.1.7

### Text

`sheriff validate` refuses each of the following in a node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6):

a sid other than its own that the node cites without declaring a link whose target is that sid (§s-vwyke96ggxx79je);

a `cites` link to a node that the node does not cite, or to a node to which the node also declares a link of another type (§s-vwyke96ggxx79je);

a citation by location (§s-kag2m9tzdnduxdx, §s-whftqmshzc5wzhw).

The refusal names the node by its file, its sid and its location, and names the link or the citation.

A `§` followed by a sid and then by no lower-case letter or digit cites that sid, in text in backticks too (§s-cxtt6jvhqcey2k9). A `§` followed by one or more other characters, up to a whitespace character, a comma, a semicolon or a closing parenthesis, is a citation by location, unless it is in text in backticks.

`sheriff validate` reads every property of the node for citations except the following (§s-cxtt6jvhqcey2k9):

its links;

the nodes under it, the nodes in its cells included;

the index of the sections in a domain's header (§s-2r59txnms5serdr) and the values gathered in a field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh), which are built from other nodes.

### Reason

Whoever changes a node learns from the links pointing at it which nodes rely on it (§s-cxtt6jvhqcey2k9). Those links are complete only where every citation, in whatever property of a node it stands, names a node by its sid and is matched by a declared link.

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
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-2r59txnms5serdr"
  },
  {
    "type": "cites",
    "to": "s-ju5vcanbjph7mgh"
  }
]
```

### The current node

Title: Outgoing links and citations

`sheriff validate` resolves the target of every outgoing link among the sids that exist.

It reads the citations in every node and sets them against the links the node makes:

- A `§` followed by a sid and then by no lower-case letter or digit cites that sid.
- A `§` followed by anything else, up to a space, a comma, a semicolon or a closing parenthesis, is a citation by a location.
- Text in backticks counts in the check as any other text does, except a citation by a location (§s-bpdqd9v72wg7vsz).
- A header's index and the values gathered beside a field are not read.

Reason: A node may show, in backticks, what a refused citation looks like.

## Link types reserved for terms | key s-pvnnr844f3y964m | sid s-pvnnr844f3y964m | tools 7.1.8

### Text

`sheriff validate` accepts a link of type `term-relation` or `uses` only where it goes from a term node (§s-ypa92gpcj3f5zj8) to another term node (§s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx). It accepts a link of any other type, `cites` included, only where at least one of its ends is a node other than a term node.

`sheriff validate` refuses every other link that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). The refusal names the node that declares the link by its file, its sid and its location (§s-kag2m9tzdnduxdx), and names the link's type and its target. It says that the link is to be settled with the specification's owners.

### Reason

Whether two terms are bound, and how, says how the entities (§s-9w3u3wn37wksyxd) that they name relate, which is for the specification's owners to decide. So the refusal sends whoever wrote the link to them, rather than suggesting a type.

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
  }
]
```

### The current node

Title: The NodeKinds at the ends of a link

`sheriff validate` looks up the NodeKind of the node at each end of every outgoing link and sets it against the link's type.

Reason: (none)

## A run of words in capitals | key s-e2vdhfsndy5stq9 | sid s-e2vdhfsndy5stq9 | tools 7.1.10

### Text

`sheriff validate` refuses each run of three or more words set in capitals (§s-m6upmfq64kw5h4r, §s-83natrftdsmttsu). The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), the property that holds the run, and the run.

`sheriff validate` checks each node of the specification in the files that the repository keeps, whatever its status. It reads a node's title, text and reason, each string in each member of its `TextRule.list`, and each text cell of a `TableRule` (§s-qeensty237e6mmm). It reads a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6) as it reads any other node.

In what it reads:

a word set in capitals is two or more characters long, starts with a capital letter, ends with a capital letter or a digit, holds only capital letters, digits and hyphens, of any script, and has no letter, digit or underscore immediately before or after it;

a run is three or more such words with only spaces or tabs between them;

text in backticks or in straight or typographic double quotation marks is left out.

### Reason

The check does not understand the text, so it recognises a phrase set in capitals by its form alone. That form is drawn exactly, so that ordinary capitalisation and quotations, which keep the spelling of what they quote (§s-7anvune6h4f6mbr), are never refused.

### Examples

```json
[
  {
    "en": "A rule's text ends with the words “WITHOUT ANY EXCEPTION”, written as part of its sentence. `sheriff validate` refuses the node and names that run. The closest mistake is to let three abbreviations in a row, such as HTTP REST API, pass: `sheriff validate` refuses them too.",
    "ru": "Текст правила заканчивается словами «WITHOUT ANY EXCEPTION», написанными как часть предложения. `sheriff validate` отвергает узел и называет эти слова. Ближайшая ошибка — пропустить три аббревиатуры подряд, например HTTP REST API: `sheriff validate` отвергает и их."
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

## A section with a rule in it | key s-zhen42p6mnaxu7w | sid s-zhen42p6mnaxu7w | tools 7.1.11

### Text

`sheriff validate` accepts a section of the specification in the files that the repository keeps only where the section contains a rule (§s-exxuckgakfxkycp). It refuses any other section, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx).

A section contains a rule where at least one of the nodes directly under it is one of the following:

a node of the kind `TextRule` or `TableRule` (§s-5fewsp22mmdz7y6), or, where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), of the kind `RecordType` (§s-ktfstpv8rurznrp);

a term or a node of a project's own kind (§s-pctqj9wqaq8762t);

a section that contains a rule.

### Reason

A section whose rules have all been moved or removed still reads as a part of the specification. Its derived status gives no sign of it.

### Examples

```json
[
  {
    "en": "A section holds only a nested section, whose last rule was moved to another file. `sheriff validate` refuses both sections, since neither contains a rule. The closest mistake is to refuse only the nested section.",
    "ru": "Раздел содержит только вложенный раздел, последнее правило которого перенесено в другой файл. `sheriff validate` отвергает оба раздела, потому что ни в одном из них нет правила. Ближайшая ошибка — отвергнуть только вложенный раздел."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-exxuckgakfxkycp"
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
    "to": "s-hzuzn8hbq6q9q4s"
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

### The current node

Title: A section with a rule in it

`sheriff validate` reads the children of every section, and those of each section inside it, for a node that counts as a rule (§s-7445ahgjck2aefg).

Reason: (none)
