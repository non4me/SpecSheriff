# Group 1 drafts for review (generated 2026-11-23T23:11:25.392Z)

## Who an added approval names | key new:tools-7-1-approval-by | sid s-75ue25v6r23jkk8 | tools 7.1.5a (new, after "An approved node's approval")

### Text

`sheriff validate` accepts an approval (§s-v4qus7raqnwzneb) that a commit adds to `specs/_approvals.jsonl` only where both of the following hold:

its node is in the files that the repository keeps;

it names an owner of that node (§s-6sk8uet75dmq5qz) as of that commit (§s-acacahc8c9estmr).

`sheriff validate` refuses any other approval that the commit adds. The refusal names the sid and the email address that the approval holds. Where the node is in the files that the repository keeps, the refusal also names the node's file, its location (§s-kag2m9tzdnduxdx) and its owners.

An approval is added by a commit where `specs/_approvals.jsonl` holds more lines identical to that approval after the commit than it held in the commit's parent. For a merge commit, the parent is its first parent. `sheriff validate` reads the parent's approvals in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv).

`sheriff validate` takes a node's owners from the model of the specification (§s-w6gybeqn2ttydqx). Of the lines that a commit adds, it checks only approvals.

### Reason

Only a node's owners may approve it, while anyone may withdraw an approval (§s-67vekyup7y8smap, §s-fpq35tf3pehgk64). A node's owners may change from one commit to the next, so each approval is judged against the owners as of the commit that adds it. A later change of owners then leaves in force the approvals given before it.

### Examples

```json
[
  {
    "en": "The nearest section above a rule names `a@example.com` as its owner. A commit adds an approval of the rule by `b@example.com`, and `sheriff validate` refuses it, naming both addresses. A commit that adds the same approval and also makes `b@example.com` an owner of that section is accepted. The most likely mistake is to judge the approval against the owners named in the commit's parent, which would refuse that second commit.",
    "ru": "Ближайший раздел над правилом называет ответственным `a@example.com`. Коммит добавляет одобрение правила от `b@example.com`, и `sheriff validate` его отвергает, называя оба адреса. Коммит, который добавляет то же одобрение и к тому же делает `b@example.com` ответственным за этот раздел, принимается. Самая вероятная ошибка — оценивать одобрение по ответственным в родительском коммите: тогда второй коммит был бы отвергнут."
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
    "to": "s-v4qus7raqnwzneb"
  },
  {
    "type": "cites",
    "to": "s-6sk8uet75dmq5qz"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
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
    "to": "s-67vekyup7y8smap"
  },
  {
    "type": "cites",
    "to": "s-fpq35tf3pehgk64"
  }
]
```

### The current node

(none: this node is new)

## Values built from other nodes | key s-agc6fb3vx46pc23 | sid s-agc6fb3vx46pc23 | tools 7.1.9

### Text

`sheriff validate` refuses each node in which a value built from other nodes differs from the value that `sheriff reindex` would write (§s-ztseyetus7np6br). `sheriff validate` computes the following values:

the links pointing at each node (§s-bpdqd9v72wg7vsz, §s-xdk44dt9uxdeb2b), compared without regard to their order;

the approval status of each section (§s-9kfdycuq34beqvs, §s-k3hrk8u9uz9mpz7);

where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of the header of each domain (§s-yccuyqbypzzx2gu, §s-bn8rvk6du2jkf2d);

where the project has chosen the Domains extension, the index of the sections in the header of each domain (§s-2r59txnms5serdr, §s-6n2ab7escdtspwe);

where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered for each field that has an `enum` (§s-ju5vcanbjph7mgh, §s-93jpnb4c96qhwbu).

`sheriff validate` checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). The refusal names the node by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and names the value that differs.

### Reason

After an edit to one node, a value built from it stays out of date until `sheriff reindex` runs. Computing every such value again reveals a commit that holds an out-of-date value or a value written by hand.

### Examples

```json
[
  {
    "en": "A section holds a `TableRule`, one cell of which holds a draft node, and every other node under the section is approved. `sheriff validate` computes the section's approval status as draft, and refuses the section if its file marks it approved. The most likely mistake is to count only the nodes in a node's `children`, which leaves out the node in the cell.",
    "ru": "Раздел содержит `TableRule`, в одной из ячеек которого — узел-черновик, а все остальные узлы под разделом одобрены. `sheriff validate` вычисляет статус одобрения раздела как «черновик» и отвергает раздел, если его файл отмечает раздел одобренным. Самая вероятная ошибка — считать только узлы из `children` узла: так узел в ячейке пропускается."
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

## The target of a link | key new:tools-7-1-link-target | sid s-c4rn9fj4czk768b | tools 7.1.7a (new, before "Outgoing links and citations")

### Text

`sheriff validate` accepts a link only where its target is the sid of a node of the model of the specification (§s-w6gybeqn2ttydqx, §s-x8usyy38qa56k6a). It refuses any other link declared by a node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). The refusal names the node that declares the link by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and names the link's type and its target.

### Reason

Only a link whose target is a node of the specification can be followed. Only such a link appears among the links pointing at its target (§s-bpdqd9v72wg7vsz).

### Examples

```json
[
  {
    "en": "A rule still has a `refines` link to a rule that a later commit removed and archived. `sheriff validate` refuses the link, since no node of the specification holds the removed rule's sid any longer. The most likely mistake is to look for the target only among the nodes in the files that the repository keeps. That mistake would refuse a `refines` link from a rule of a project's own guidelines to a rule of the SpecSheriff guidelines, which the project takes from the SpecSheriff plugin. `sheriff validate` accepts that link.",
    "ru": "В правиле по-прежнему есть связь `refines` с правилом, которое более поздний коммит удалил и отправил в архив. `sheriff validate` отвергает эту связь: ни у одного узла спецификации больше нет sid удалённого правила. Самая вероятная ошибка — искать цель только среди узлов в файлах, которые хранит репозиторий. Такая ошибка отвергла бы связь `refines` от правила собственных guidelines проекта к правилу SpecSheriff guidelines, которые проект берёт из плагина SpecSheriff. `sheriff validate` эту связь принимает."
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

## Citations and the links that match them | key s-qzyacnqwvaeaps4 | sid s-qzyacnqwvaeaps4 | tools 7.1.7

### Text

`sheriff validate` refuses each of the following in a node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6):

a sid other than its own that the node cites without declaring a link whose target is that sid (§s-vwyke96ggxx79je);

a `cites` link to a node that the node does not cite, or to a node to which the node also declares a link of another type (§s-vwyke96ggxx79je);

a citation by location (§s-kag2m9tzdnduxdx, §s-whftqmshzc5wzhw).

The refusal names the node by its file, its sid and its location, and names the link or the citation.

A `§` followed by a sid cites that sid, in text in backticks too, where no lower-case letter or digit follows the sid (§s-cxtt6jvhqcey2k9). Any other `§` followed by one or more characters, up to a whitespace character, a comma, a semicolon or a closing parenthesis, is a citation by location, unless it is in text in backticks.

`sheriff validate` reads every property of a node for citations except the following (§s-cxtt6jvhqcey2k9):

its links;

the nodes under it, including the nodes in its cells;

the index of the sections in a domain's header (§s-2r59txnms5serdr) and the values gathered in a field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh), which are built from other nodes.

### Reason

Whoever changes a node learns from the links pointing at it which nodes rely on it (§s-cxtt6jvhqcey2k9). Those links are complete only where every citation, in whatever property of a node it appears, names a node by its sid and is matched by a declared link.

### Examples

```json
[
  {
    "en": "A node's reason shows `§base/3.2`, a citation by location, in backticks, and `sheriff validate` accepts it. The same characters without backticks are refused as a citation by location. In backticks, a `§` followed by a sid still counts as a citation, so the node must declare a link to the node with that sid.",
    "ru": "Обоснование узла показывает `§base/3.2`, ссылку по расположению, в обратных кавычках, и `sheriff validate` это принимает. Те же символы без обратных кавычек отвергаются как ссылка по расположению. В обратных кавычках `§` с sid всё равно считается ссылкой, поэтому узел должен объявить связь с узлом, у которого этот sid."
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

`sheriff validate` accepts a link of type `term-relation` or `uses` only where both of its ends are term nodes (§s-ypa92gpcj3f5zj8, §s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx). It accepts a link of any other type, including `cites`, only where at least one of its ends is a node other than a term node. `sheriff validate` refuses every other link declared by a node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It checks only a link whose target is a node of the model of the specification (§s-w6gybeqn2ttydqx). The refusal names the node that declares the link by its file, its sid and its location (§s-kag2m9tzdnduxdx), and names the link's type and its target. It says that the link is to be agreed with the specification's owners.

### Reason

Whether two terms are bound, and how, shows how the entities (§s-9w3u3wn37wksyxd) that they name relate to one another. The specification's owners decide that, so the refusal sends whoever wrote the link to them, rather than suggesting a type.

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

## A run of words in capitals | key s-e2vdhfsndy5stq9 | sid s-e2vdhfsndy5stq9 | tools 7.1.10

### Text

`sheriff validate` refuses each run of three or more words set in capitals (§s-m6upmfq64kw5h4r, §s-83natrftdsmttsu). The refusal names the run, the property that holds it, and the node by its file, its sid and its location (§s-kag2m9tzdnduxdx).

`sheriff validate` checks each node of the specification in the files that the repository keeps, whatever its approval status. It reads a node's title, text and reason, each string in each member of its `TextRule.list`, and each text cell of a `TableRule` (§s-qeensty237e6mmm, §s-5fewsp22mmdz7y6). It reads a node in a cell of a `TableRule` as it reads any other node.

In what `sheriff validate` reads, a word set in capitals is a sequence of two or more consecutive characters that meet each of these conditions:

each of them is a capital letter of any script, a digit or a hyphen;

the first is a capital letter, and the last is a capital letter or a digit;

no letter, digit or underscore comes immediately before or after them.

A run is three or more words set in capitals with only spaces or tabs between them. Text in backticks, in straight double quotation marks or in curly double quotation marks (“…”) is not read.

### Reason

The check does not understand the text, so it recognises a phrase set in capitals by its form alone. That form is defined exactly, so that ordinary capitalisation and quotations, which keep the spelling of what they quote (§s-7anvune6h4f6mbr), are never refused.

### Examples

```json
[
  {
    "en": "A rule's text ends with the words “WITHOUT ANY EXCEPTION”, written as part of a sentence, outside backticks and quotation marks. `sheriff validate` refuses the node and names that run. The most likely mistake is to let three abbreviations in a row, such as “HTTP REST API”, pass: `sheriff validate` refuses them too.",
    "ru": "Текст правила заканчивается словами «WITHOUT ANY EXCEPTION», написанными как часть предложения, вне обратных кавычек и кавычек. `sheriff validate` отвергает узел и называет эти слова. Самая вероятная ошибка — пропустить три аббревиатуры подряд, например «HTTP REST API»: `sheriff validate` отвергает и их."
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
