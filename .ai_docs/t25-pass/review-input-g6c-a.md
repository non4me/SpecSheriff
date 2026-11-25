# Group 6 drafts for the review (generated 2026-11-25T00:40:05.251Z)

## The approvals of nodes | key new:tools-11-section | sid s-e75g25ajrm2kqj5 | tools 11 (new section, in place of the node “How an approval is recorded”)

### Text

How the SpecSheriff tools record the approval of a node (§s-67vekyup7y8smap) and the withdrawal of that approval (§s-fpq35tf3pehgk64), and how they tell whether an approval is in force.

### Reason

(none)

### Outgoing links

```json
[
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

## How an approval is recorded | key s-v4qus7raqnwzneb | sid s-v4qus7raqnwzneb | tools 11.1

### Text

`specs/_approvals.jsonl` (§s-zefk589ykh37b8u) records each approval (§s-67vekyup7y8smap) of a wording of a node (§s-5ah25f6gy99panq), and each withdrawal of such an approval (§s-fpq35tf3pehgk64), on a line of its own. `sheriff approve` (§s-upkur92ry6332y5) and `sheriff approve --withdraw` (§s-xybjqp2rxh8gszf) append each line that they write to the end of the file. Each line is the text that `JSON.stringify` writes, with no whitespace, for an object that holds only the following keys, in this order:

`sid`, the sid of the node;

`fingerprint`, the fingerprint of the wording that the line approves, or whose approval the line withdraws (§s-f5brvuuu6xmkj6t);

`withdrawn`, which only a line that withdraws an approval holds, with the value `true`;

`by`, the email address set in the git configuration of whoever approves the wording or withdraws its approval.

A line that holds `withdrawn` is a withdrawal, and any other line is an approval. An approval of a wording of a node is in force where the latest line for the node's sid and that wording's fingerprint is an approval. Of the lines for one sid and one fingerprint, the latest is the one that comes last in the file.

A node's last approval is the last line for the node's sid that is an approval, whether or not a later line withdraws that approval.

### Reason

A node's approval decides whether its code may change, so the SpecSheriff tools take the approval from a record that no edit to the node changes and that keeps every approval and every withdrawal, each with the email address of whoever made it.

### Examples

```json
[
  {
    "en": "Rule R was approved with the wording whose fingerprint is F1, then reworded and approved with the fingerprint F2. Someone then withdrew R's approval, which appended a withdrawal for F1 and then one for F2. No approval of any of R's wordings is in force, so R is a draft, and R's last approval is the line that approved F2. The most likely mistake is to treat R as approved because a line in the file approves its current wording, although a later line withdraws that approval.",
    "ru": "Правило R одобрили с формулировкой, отпечаток которой F1, затем переформулировали и одобрили с отпечатком F2. Потом кто-то отозвал одобрение R, что добавило строку отзыва для F1, а за ней — для F2. Ни одно одобрение ни одной из формулировок R не в силе, поэтому R — черновик, а последнее одобрение R — строка, одобрившая F2. Самая вероятная ошибка — считать R одобренным, потому что в файле есть строка, одобряющая его нынешнюю формулировку, хотя более поздняя строка отзывает это одобрение."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-67vekyup7y8smap"
  },
  {
    "type": "implements",
    "to": "s-9g7jj8z4yf9kq93"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-5ah25f6gy99panq"
  },
  {
    "type": "cites",
    "to": "s-fpq35tf3pehgk64"
  },
  {
    "type": "cites",
    "to": "s-upkur92ry6332y5"
  },
  {
    "type": "cites",
    "to": "s-xybjqp2rxh8gszf"
  },
  {
    "type": "cites",
    "to": "s-f5brvuuu6xmkj6t"
  },
  {
    "type": "cites",
    "to": "s-7unxytshhc4md54"
  }
]
```

### The current node

Title: How an approval is recorded

`sheriff approve <sid>...` appends to `specs/_approvals.jsonl` one line per node. The line holds the node's sid, the fingerprint of its wording and, as `by`, the email git is configured with. It sets the node's status to `approved`. Where the latest line for the node and that fingerprint is already an approval, it appends nothing and only sets the status. It refuses:

- a section and a domain's header;
- a node of the SpecSheriff guidelines the project takes;
- a node none of whose owners is the one approving, naming its owners;
- the rule that approves the specification, unless the one approving is one of the specification's owners (§s-qzthyh7yqvfhsa2).

An approval stands for a wording of a node where the latest line for that node and that wording's fingerprint is an approval. The latest line is the one standing last in `specs/_approvals.jsonl`.

`sheriff approve --withdraw <sid>...` withdraws the approval of each wording of the node for which one stands, whether the node holds that wording or not. For each such wording it appends a line. The line holds the node's sid, that wording's fingerprint, `withdrawn: true` and, as `by`, the email git is configured with. It makes the node a draft.

Where no approval stands for any wording of the node, it appends nothing. Anyone may withdraw an approval. `sheriff approve --withdraw` refuses:

- a section and a domain's header;
- a node of the SpecSheriff guidelines the project takes;
- the rule that approves the specification, unless the one withdrawing is one of the specification's owners (§s-qzthyh7yqvfhsa2).

The fingerprint is a SHA-256 hash of one canonical string. The string holds the node's title, text and reason and the values its NodeKind adds beside them. It holds neither the owners a node names nor what the reindex builds. In the string:

- the keys of an object are sorted;
- a list keeps its own order.

In that string the reason stands under the key `rationale`, the name earlier releases gave it. Earlier releases gave a field of type `one of` an empty list of its own values where the domains add its values. In that string such a field stands in that form.

An owner is named by an email.

Reason: One line appended per approval keeps every approval ever given. The lines two branches append merge without a conflict where git merges the approvals by union, as `sheriff init` has it do (§s-7unxytshhc4md54).

SHA-256 is a hash every language provides. The email git is configured with is the one a commit names its author by. So an approval and the commit carrying it name the same person.

The owners a node names say who reads its wording, not what the wording is. What the reindex builds is no one's wording.

A fingerprint changes with the name and value of every key in its string. A release writing the wording in another form would otherwise make a draft every node approved before it, though no wording changed.

A section's and a header's status is built (§s-9kfdycuq34beqvs), so nobody approves them. No edit of the approvals passes the guard (§s-83ev4wwesbwnhnp), so a line once appended can be taken out only through git. The commands therefore refuse what no line may record.

A withdrawal takes back the node's approval, not that of one of its wordings (§s-5ah25f6gy99panq). An approval left standing for an earlier wording would let an edit restore that wording with the status `approved`. With the latest line deciding, a withdrawal cannot be undone by typing a status back.

## The fingerprint of a node's wording | key new:tools-11-fingerprint | sid s-f5brvuuu6xmkj6t | tools 11.2 (new)

### Text

The fingerprint of a node's wording (§s-5ah25f6gy99panq) is the SHA-256 hash of the UTF-8 bytes of one string. The hash is written as 64 lowercase hexadecimal digits.

That string is the text that `JSON.stringify` writes, with no whitespace, for an object built from the node. In that text, the keys of each object are sorted by their UTF-16 code units. Each list keeps the order of its items.

The object holds every property of the node except the following:

its `location`, its `sid`, its `kind` and its `status`;

its links and its `meta`;

the nodes under it;

the values gathered beside a field (§s-ju5vcanbjph7mgh), since `sheriff reindex` builds those values from other nodes (§s-ztseyetus7np6br);

the `archived` field of a node of the archive (§s-f2b5zvc565s242f);

in a `TableRule` (§s-5fewsp22mmdz7y6), each cell that holds a node, since that node has a fingerprint of its own.

For a node in a cell of a `TableRule`, the object also holds the key `cell`. Its value is an object that holds the following, which are part of the node's wording:

`column`, the heading of the node's column;

`group`, the heading of the node's group, which is `null` where the table's rows are not grouped;

`row`, an object that holds the text of each cell in the node's row that holds text, under the key of that cell's column.

The following keys and kinds of node, which `sheriff reindex` renames in what an earlier release wrote (§s-gb8s9657a65hqmv), appear in the object under their earlier names:

the node's `reason`, under the key `rationale`;

a `TextRule.list.jsonSchema` or a `TextRule.list.valueList` (§s-eferktypcj7njt5), in a `TextRule.list` that holds only one of the two, under the key `declaredIn`, with the `pointer` of the `jsonSchema` or the `symbol` of the `valueList` under the key `declaration`;

the name of a kind of node in the source of a field's values (§s-xfu2gpzddjnmgks), where those values are the sids of that kind's nodes: `TextRule` as `rule`, `RecordType` as `recordType`, and `header` as `domain`.

For a field whose values come from the source `domains` (§s-gb8s9657a65hqmv), earlier releases wrote an empty list of its own values under the key `values`. Where such a field has no list of its own values, the field appears in the object with an empty list under the key `values`.

### Reason

An approval records a wording by its fingerprint, so that a change to that wording leaves the node without an approval in force, and no other change does (§s-5ah25f6gy99panq). A string built the same way everywhere gives every machine and every release the same fingerprint for the same wording.

### Examples

```json
[
  {
    "en": "A rule is approved, and an edit adds an example to it. The rule's fingerprint changes, so no approval of its new wording is in force, and `sheriff reindex` makes the rule a draft. A later edit adds a link to the rule and moves it to another section, and its fingerprint stays the same. The most likely mistake is to leave the examples out of the object, so that the rule stays approved with an example that no owner has read.",
    "ru": "Правило одобрено, и правка добавляет в него пример. Отпечаток правила меняется, поэтому ни одно одобрение его новой формулировки не в силе, и `sheriff reindex` делает правило черновиком. Более поздняя правка добавляет правилу связь и переносит его в другой раздел, и его отпечаток остаётся прежним. Самая вероятная ошибка — не включать примеры в объект: тогда правило остаётся одобренным с примером, которого не читал ни один ответственный."
  },
  {
    "en": "Each row of a `TableRule` holds a rule and a text that says what a failure of that rule costs. The cost in one row changes from `refused` to `reported`. The fingerprint of the rule in that row changes, since the text cells of its row are part of its wording, and the fingerprint of the `TableRule` changes too. The most likely mistake is to build the object for the rule from its own properties alone, so that the rule stays approved with a cost that no owner has approved.",
    "ru": "Каждая строка `TableRule` содержит правило и текст, который говорит, чего стоит нарушение этого правила. Стоимость в одной строке меняется с `refused` на `reported`. Отпечаток правила в этой строке меняется, потому что текстовые ячейки его строки входят в его формулировку, и отпечаток `TableRule` тоже меняется. Самая вероятная ошибка — строить объект правила только из его собственных свойств: тогда правило остаётся одобренным со стоимостью, которую не одобрял ни один ответственный."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-5ah25f6gy99panq"
  },
  {
    "type": "implements",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-ju5vcanbjph7mgh"
  },
  {
    "type": "cites",
    "to": "s-ztseyetus7np6br"
  },
  {
    "type": "cites",
    "to": "s-f2b5zvc565s242f"
  },
  {
    "type": "cites",
    "to": "s-gb8s9657a65hqmv"
  },
  {
    "type": "cites",
    "to": "s-eferktypcj7njt5"
  },
  {
    "type": "cites",
    "to": "s-xfu2gpzddjnmgks"
  }
]
```

### The current node

(none: this node is new)

## Approving a node | key new:tools-11-approve | sid s-upkur92ry6332y5 | tools 11.3 (new)

### Text

`sheriff approve <sid>...` approves each node that it names (§s-67vekyup7y8smap). For each such node, it appends to `specs/_approvals.jsonl` an approval (§s-v4qus7raqnwzneb) of the node's current wording (§s-5ah25f6gy99panq). The approval holds the email address of whoever runs the command.

`sheriff approve` then sets the status of each node that it names to `approved`. Where an approval of a node's current wording is already in force, `sheriff approve` appends nothing for that node and only sets the node's status.

Where a node that `sheriff approve` names is a `TableRule` (§s-5fewsp22mmdz7y6), the command also approves each node in the table's cells, in the same way as it approves a node that it names. It appends these approvals after that of the `TableRule`, in the order of the table's rows and, within a row, in the order of its columns.

`sheriff approve` refuses each of the following:

a sid that names no node in the files that the repository keeps, such as the sid of a node of the SpecSheriff guidelines or of a chosen extension (§s-9ttvcwpqkehm58g) in a project other than SpecSheriff itself, since such a project takes those nodes from the plugin (§s-bsya3febm6u64ab);

a section or, where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the header of a domain (§s-yccuyqbypzzx2gu), since `sheriff reindex` derives the approval status of either from other nodes (§s-ztseyetus7np6br);

a node whose owners do not include whoever runs the command (§s-6sk8uet75dmq5qz).

Each refusal names the sid concerned. The refusal of a node whose owners do not include whoever runs the command also names the node's owners.

Where `sheriff approve` refuses any sid named in the run, it records none of the run's approvals. Where git's configuration sets no email address, `sheriff approve` refuses to run.

After it records the approvals, `sheriff approve` runs `sheriff reindex` (§s-ztseyetus7np6br).

### Reason

Recording every approval through one command lets the SpecSheriff tools check, before an approval is recorded, that whoever gives it is an owner of the node (§s-67vekyup7y8smap).

### Examples

```json
[
  {
    "en": "A rule of a project's base specification is a `TableRule`, each row of which holds one state of a request as a node. An owner adds two rows, whose nodes are drafts, and runs `sheriff approve` with the table's sid. `sheriff approve` appends an approval of the table's new wording and one approval of the node in each new row. The most likely mistake is to approve only the table, so that the nodes of the new rows stay drafts.",
    "ru": "Правило базовой спецификации проекта — `TableRule`, каждая строка которой содержит одно состояние заявки как узел. Ответственный добавляет две строки, узлы которых — черновики, и запускает `sheriff approve` с sid таблицы. `sheriff approve` добавляет одобрение новой формулировки таблицы и по одному одобрению узла в каждой новой строке. Самая вероятная ошибка — одобрить только таблицу: тогда узлы новых строк остаются черновиками."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-67vekyup7y8smap"
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
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-bsya3febm6u64ab"
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
    "to": "s-ztseyetus7np6br"
  },
  {
    "type": "cites",
    "to": "s-6sk8uet75dmq5qz"
  },
  {
    "type": "cites",
    "to": "s-5ah25f6gy99panq"
  }
]
```

### The current node

(none: this node is new)

## Withdrawing the approval of a node | key new:tools-11-withdraw | sid s-xybjqp2rxh8gszf | tools 11.4 (new)

### Text

`sheriff approve --withdraw <sid>...` withdraws the approval of each node that it names (§s-fpq35tf3pehgk64). For each approval in force of a wording (§s-5ah25f6gy99panq) of such a node, whether or not the node holds that wording now, the command appends to `specs/_approvals.jsonl` a line that withdraws that approval (§s-v4qus7raqnwzneb). Each such line holds the email address of whoever runs the command. The command appends these lines in the order in which the first line for each such wording comes in the file.

`sheriff approve --withdraw` then sets the status of each node that it names to `draft`. Where no approval of any wording of a node is in force, `sheriff approve --withdraw` appends nothing for that node and only sets the node's status.

Where a node that `sheriff approve --withdraw` names is a `TableRule` (§s-5fewsp22mmdz7y6), the command withdraws only the approvals of the table's own wordings. To withdraw the approval of a node in a cell of the table, whoever runs the command names that node.

`sheriff approve --withdraw` records a withdrawal by whoever runs it, whether or not they are among the node's owners. It refuses each of the following:

a sid that names no node in the files that the repository keeps, such as the sid of a node of the SpecSheriff guidelines or of a chosen extension (§s-9ttvcwpqkehm58g) in a project other than SpecSheriff itself, since such a project takes those nodes from the plugin (§s-bsya3febm6u64ab);

a section or, where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the header of a domain (§s-yccuyqbypzzx2gu), since `sheriff reindex` derives the approval status of either from other nodes (§s-ztseyetus7np6br).

Each refusal names the sid concerned. Where `sheriff approve --withdraw` refuses any sid named in the run, it records none of the run's withdrawals. Where git's configuration sets no email address, `sheriff approve --withdraw` refuses to run.

After it records the withdrawals, `sheriff approve --withdraw` runs `sheriff reindex` (§s-ztseyetus7np6br).

### Reason

A withdrawal takes back the approval of the node, not only that of the wording that the node holds now (§s-fpq35tf3pehgk64). An approval left in force for an earlier wording would let an edit that restores that wording make the node approved again without any owner approving it.

### Examples

```json
[
  {
    "en": "Rule R was approved, reworded and approved again, so an approval of each of its wordings is in force. A developer who is not an owner of R finds that R is wrong and runs `sheriff approve --withdraw` with R's sid. The command appends a withdrawal for each of those wordings, and R becomes a draft. The most likely mistake is to withdraw only the approval of R's current wording, so that an edit that restores R's earlier wording makes R approved again.",
    "ru": "Правило R одобрили, переформулировали и одобрили снова, поэтому в силе одобрение каждой из его формулировок. Разработчик, который не является ответственным за R, считает, что R ошибочно, и запускает `sheriff approve --withdraw` с sid R. Команда добавляет отзыв для каждой из этих формулировок, и R становится черновиком. Самая вероятная ошибка — отозвать только одобрение нынешней формулировки R: тогда правка, которая возвращает прежнюю формулировку R, снова делает R одобренным."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-fpq35tf3pehgk64"
  },
  {
    "type": "cites",
    "to": "s-5ah25f6gy99panq"
  },
  {
    "type": "cites",
    "to": "s-v4qus7raqnwzneb"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-bsya3febm6u64ab"
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
    "to": "s-ztseyetus7np6br"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  }
]
```

### The current node

(none: this node is new)
