# Group 7 drafts for the review (generated 2026-11-25T11:46:52.420Z)

## How a node is written in Markdown | key s-k4nqjr96ux7a5m7 | sid s-k4nqjr96ux7a5m7 | tools 5

### Text

`sheriff markdown` (§s-e3495enbc5h75c3), `sheriff show` (§s-2dhbqy43tcm6qj2) and `sheriff guide` (§s-jk8v3srrved7ram) write a node in Markdown in this order:

a heading that holds the node's location (§s-kag2m9tzdnduxdx) and its title, or only its location where the node is in a cell of a `TableRule` (§s-5fewsp22mmdz7y6) and so has no title;

a line that holds the node's sid, its kind and its approval status (§s-tgrnpagrb58tya7);

the node's text, and then its reason;

each other value that the node's file holds for it, other than its links and the nodes under it, under the value's key: a value that is text as it is, and any other value as JSON;

the node's links, each with its type, its direction, its ratio (§s-bckzdwd35d2nefa) where it has one, and the sid, location and title of the node at the other end.

The following values are written in a form of their own instead:

a `TextRule.list` (§s-eferktypcj7njt5) any of whose members is an object: its other values as JSON, and its members as a table;

the values gathered beside a field (§s-ju5vcanbjph7mgh), which a RecordType's `schema` (§s-6eb92ddch7shuvu) holds in the field's `x-enumSource.gathered`: as a list after the JSON of the `schema`, from which they are left out;

the `columns` and `groups` of a `TableRule`: as a table for each group of rows, under the group's heading where the group has one.

The first column of the table of a `TextRule.list` is for the property that `TextRule.list.property` names. Its other columns follow in the order in which their properties first appear. The table has a row for each member, and a member that is not an object is written in the first column alone.

The list of the values gathered beside a field is headed by the JSON Pointer to the field's schema within the RecordType's `schema`, such as `/properties/part`. It gives each value with the sid, location and title of the node that the value comes from.

A table of a `TableRule` has a column for each column of the `TableRule`, under that column's heading, and a row for each row of the group. A cell that holds text holds that text. A cell that holds a node holds the node's location and its text.

In a cell of these tables, a list or an object is written as JSON on one line, each line break as `<br>`, and each `|` as `\|`.

A node in a cell of a `TableRule` is also written with the following, before its text, since they are part of its wording (§s-5ah25f6gy99panq):

the heading of its column;

the heading of its group, where the table's rows are grouped;

the text of each cell of its row that holds text, under the heading of that cell's column.

Where a command writes the nodes under a node, it writes them after that node. It writes them in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w), so the nodes in the cells of a `TableRule` come after its children. Each of those nodes takes a heading one level deeper than that of the node above it, down to the sixth level, the deepest that Markdown has. A top-level node of a file, and the node that `sheriff show` prints, take a heading of the first level.

### Reason

Every command that writes a node for a reader writes it in one form, so a reader who knows that form from one command can read the output of any other. In that form, a reader sees everything that the node's file holds for the node without opening the file (§s-ce24ynwabt5yx8h). From each sid, the reader also learns the location and title of the node that the sid names.

### Examples

```json
[
  {
    "en": "The main table of checks (§s-jau82aq9juv9zzh) is a `TableRule` whose column “What is checked” holds a node in each row and whose column “On failure” holds text. `sheriff show` prints the node of one of its rows under the node's location. With it, `sheriff show` prints the heading “What is checked” of the node's column and the text of its row's cell under “On failure”, such as “refused”. The most likely mistake is to print the node without the text of its row, so that its reader does not see what a failure of the check costs.",
    "ru": "Основная таблица проверок (§s-jau82aq9juv9zzh) — это `TableRule`, в столбце «What is checked» которой в каждой строке находится узел, а в столбце «On failure» — текст. `sheriff show` печатает узел одной из её строк под расположением этого узла. Вместе с ним `sheriff show` печатает заголовок «What is checked» столбца этого узла и текст ячейки его строки под «On failure», например «refused». Самая вероятная ошибка — напечатать узел без текста его строки: тогда его читатель не видит, чего стоит неудача проверки."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-ce24ynwabt5yx8h"
  },
  {
    "type": "cites",
    "to": "s-e3495enbc5h75c3"
  },
  {
    "type": "cites",
    "to": "s-2dhbqy43tcm6qj2"
  },
  {
    "type": "cites",
    "to": "s-jk8v3srrved7ram"
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
    "to": "s-tgrnpagrb58tya7"
  },
  {
    "type": "cites",
    "to": "s-bckzdwd35d2nefa"
  },
  {
    "type": "cites",
    "to": "s-eferktypcj7njt5"
  },
  {
    "type": "cites",
    "to": "s-ju5vcanbjph7mgh"
  },
  {
    "type": "cites",
    "to": "s-6eb92ddch7shuvu"
  },
  {
    "type": "cites",
    "to": "s-5ah25f6gy99panq"
  },
  {
    "type": "cites",
    "to": "s-ygg5kpcxgzq3m7w"
  },
  {
    "type": "cites",
    "to": "s-jau82aq9juv9zzh"
  }
]
```

### The current node

Title: What the export, the guide and `sheriff show` write of a node

`sheriff export` and `sheriff show` write a node with every value its file holds for it. They write each link with its type, its direction, its ratio where it holds one, and the sid, location and title of the node at the other end.

`sheriff guide` writes each node of the guidelines as the export does, except its metadata.

Each of them writes as JSON, under the value's key, a value that is not text, other than the node's links and children. These values are written otherwise:

- A `TextRule.list` any of whose members is an object (§s-v7vd4ydrwexsgsj) has its other values written as JSON and its members as a table. The table has a column for each property a member holds, the one the list names first and the others in the order they first appear. It has a row for each member, a primitive member in the first column alone. A cell holding a list or an object holds it as JSON on one line, a `|` escaped.
- The values gathered beside a field of type `one of` are left out of the JSON. They are written after the JSON as a list under the field's name, each with the sid, location and title of the node it comes from.

The export and the guide write a node's children after it, each under a heading one level deeper than its parent's. `sheriff show` writes the node alone.

Reason: A person reads the specification in the export, since a structure a schema checks is hard to read (§s-kh8qcd5kxgh9z3j). A person or an agent reads one node through `sheriff show`. A value either leaves out is one its reader never learns of and works without, such as `RecordType.fields`, a `TextRule.list` or a decision taken on the node (§s-gqbj8849rf224qa). A sid alone tells a reader nothing of the node it names.

An agent reads the guide whole before it works on the specification, to follow the guidelines. It needs each node as it binds, its links included, since a link may exempt a rule from implementation or narrow it. The metadata serves whoever changes a node, who reads it whole through `sheriff show`. Written into the guide, the metadata would only lengthen what every agent reads.

JSON is the form the file already holds a value in, so its reader learns no form of its own for it. The export and the guide keep the tree of the file they are written from. `sheriff show` is asked for one node.

Written as JSON, a list of objects spreads each member over lines and repeats every property's name, so its members are hard to compare. A table puts each member on one row and each property down one column. The file names a gathered value's node by its sid alone.

## Writing the human-readable export | key new:tools-5-export | sid s-e3495enbc5h75c3 | tools 5a (new, after “How a node is written in Markdown”)

### Text

`sheriff markdown` writes the human-readable export (§s-ce24ynwabt5yx8h) only where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). In any other project, it refuses to run, and the refusal names the Views extension.

`sheriff markdown` first removes everything in `md-version/` (§s-zefk589ykh37b8u). It then writes there a `.gitignore` file that holds `*`. That file makes git ignore the folder's contents whatever the repository's own ignore files say.

`sheriff markdown` writes one Markdown file for each file of the specification whose nodes the model of the specification holds (§s-w6gybeqn2ttydqx). These include the files of the SpecSheriff guidelines, of the chosen extensions and of the appendix of the tools that the project takes from the plugin (§s-bsya3febm6u64ab).

The path of each Markdown file is the path of its file below `specs/`, placed below `md-version/`, with `.md` in place of `.json`. For a file that the project takes from the plugin, its path below `specs/` is the one at which the repository where the SpecSheriff guidelines are written keeps that file (§s-zefk589ykh37b8u). So the SpecSheriff guidelines are exported to `md-version/_guidelines/spec.md`.

Each Markdown file holds the top-level nodes of its file in their order. Each of them is written as a node is written in Markdown (§s-k4nqjr96ux7a5m7), followed by all the nodes under it.

### Reason

The export is written anew from the nodes at every run, so it shows the specification as the nodes state it (§s-kh8qcd5kxgh9z3j). Kept out of git, it never becomes a second copy of the specification that a commit could change. A project gets the export only where it has chosen the Views extension, since a project uses an extension only by its own choice (§s-mbmnsnxenmavu3z).

### Examples

```json
[
  {
    "en": "A project that has chosen the Views and Domains extensions keeps `specs/contracts/terms.json` and `specs/requests/intake.json`, and takes the SpecSheriff guidelines and the appendix of the tools from the plugin. `sheriff markdown` writes `md-version/contracts/terms.md`, `md-version/requests/intake.md`, `md-version/_guidelines/spec.md` and `md-version/_guidelines/tools.md`. The most likely mistake is to write only the files that the repository keeps, which leaves the guidelines that the project follows out of the export.",
    "ru": "Проект, который выбрал расширения Views и Domains, хранит `specs/contracts/terms.json` и `specs/requests/intake.json`, а SpecSheriff guidelines и описание инструментов берёт из плагина. `sheriff markdown` записывает `md-version/contracts/terms.md`, `md-version/requests/intake.md`, `md-version/_guidelines/spec.md` и `md-version/_guidelines/tools.md`. Самая вероятная ошибка — записать только файлы, которые хранит репозиторий: тогда guidelines, которым следует проект, в экспорт не попадают."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-ce24ynwabt5yx8h"
  },
  {
    "type": "implements",
    "to": "s-kh8qcd5kxgh9z3j"
  },
  {
    "type": "cites",
    "to": "s-qgg6sfawtmwvrbb"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  },
  {
    "type": "cites",
    "to": "s-bsya3febm6u64ab"
  },
  {
    "type": "cites",
    "to": "s-k4nqjr96ux7a5m7"
  },
  {
    "type": "cites",
    "to": "s-mbmnsnxenmavu3z"
  }
]
```

### The current node

(none: this node is new)

## Printing one node | key new:tools-5-show | sid s-2dhbqy43tcm6qj2 | tools 5b (new, after “Writing the human-readable export”)

### Text

`sheriff show` prints to its standard output the node whose sid (§s-9spq78kdwsxr759) or location (§s-kag2m9tzdnduxdx) is the command's argument, written as a node is written in Markdown (§s-k4nqjr96ux7a5m7). It prints the node alone, without the nodes under it.

`sheriff show` looks for the node among the nodes that the model of the specification holds (§s-w6gybeqn2ttydqx), including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). Where none of them has that sid or that location, `sheriff show` refuses the argument and names it.

### Reason

A node is read on its own (§s-x4zcbk5ekebd9ua). `sheriff show` gives a person or an agent everything that the node's file holds for one node, and where each of its links leads, without opening the files of the specification.

### Examples

```json
[
  {
    "en": "`sheriff show _guidelines/spec/8.5` prints the rule on a node's location in the same form as `sheriff show` with that rule's sid does. The rule's children, if it had any, would not be printed. The most likely mistake is to look the argument up among the sids alone, so that a location is refused.",
    "ru": "`sheriff show _guidelines/spec/8.5` печатает правило о расположении узла в том же виде, что и `sheriff show` с sid этого правила. Дочерние узлы правила, будь они у него, напечатаны не были бы. Самая вероятная ошибка — искать аргумент только среди sid: тогда расположение отвергается."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-a4rbry4hsu34hy8"
  },
  {
    "type": "cites",
    "to": "s-9spq78kdwsxr759"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-k4nqjr96ux7a5m7"
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
    "to": "s-x4zcbk5ekebd9ua"
  }
]
```

### The current node

(none: this node is new)

## The commands that `sheriff` accepts | key proposal:s-f5rz6b7dhxejjts-g7 | sid s-f5rz6b7dhxejjts | tools 2.1

### Text

The SpecSheriff tools are run as `sheriff <command>` and accept only the following commands. Each command is listed with its purpose and the nodes that describe it:

`sheriff validate`: checks that the specification holds together and that each change to it follows the guidelines (§s-4kd2pave7vm4hmd);

`sheriff binding`: checks the specification against the code and the tests that are bound to it (§s-4kd2pave7vm4hmd);

`sheriff citations`: checks that each sid cited in the code, the tests and the documentation names a node of the specification (§s-4kd2pave7vm4hmd);

`sheriff guard`: checks an agent's edit before it is made, and refuses an edit that the SpecSheriff guidelines forbid (§s-4kd2pave7vm4hmd);

`sheriff commit-message`: checks a commit's message against the code that the commit changes (§s-4kd2pave7vm4hmd);

`sheriff review`: asks the independent reviewer for its verdict on a commit (§s-4kd2pave7vm4hmd);

`sheriff init`: sets a repository up for SpecSheriff (§s-7unxytshhc4md54);

`sheriff remove`: removes SpecSheriff from a repository and leaves the repository's specification as it is (§s-7unxytshhc4md54);

`sheriff approve`: records an owner's approval of a node, or the withdrawal of that approval (§s-v4qus7raqnwzneb);

`sheriff reindex`: writes into the specification what the SpecSheriff tools compute from it, and rewrites in its own form what an earlier release wrote (§s-ztseyetus7np6br, §s-gb8s9657a65hqmv, §s-w5wg69pvvhedsws);

`sheriff types`: generates parts of the system's code from the approved wordings of the nodes, for example the types and RuntimeChecks for the RecordTypes (§s-a8fn72xa782wvbk);

`sheriff json`: prints as JSON the model of the specification, which a project's own check or generator reads (§s-w6gybeqn2ttydqx);

`sheriff todos`: prints every todo of the specification together with its node (§s-fprt8xysafzjqv9);

`sheriff guide`: prints the guidelines that the project follows, which an agent reads before it works on the specification (§s-jk8v3srrved7ram);

`sheriff settings`: shows and changes the specification's approval status, its `strict` flag and the extensions of the guidelines that the project has chosen (§s-chsfpkgpmfk4fft);

`sheriff untagged`: lists the symbols of the system's code that have no SpecTag, each with its file (§s-weuyx98r7c923ab);

`sheriff show`: prints one node, found by its sid or its location (§s-2dhbqy43tcm6qj2);

`sheriff markdown`: writes a human-readable export of the specification as Markdown (§s-e3495enbc5h75c3);

`sheriff map`: writes a map of the specification's structure (§s-rpv4fkdqqguptqd).

`sheriff` with no command prints the list of the commands. `sheriff --version` prints the version number of the SpecSheriff tools. `sheriff` with any other word in place of a command reports that word as unknown, prints the list of the commands and exits with code 2.

### Reason

A reader who knows what has to be done, or the name of a command, finds here the command for the task and the nodes that describe everything the command does.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-a4rbry4hsu34hy8"
  },
  {
    "type": "cites",
    "to": "s-4kd2pave7vm4hmd"
  },
  {
    "type": "cites",
    "to": "s-7unxytshhc4md54"
  },
  {
    "type": "cites",
    "to": "s-v4qus7raqnwzneb"
  },
  {
    "type": "cites",
    "to": "s-ztseyetus7np6br"
  },
  {
    "type": "cites",
    "to": "s-gb8s9657a65hqmv"
  },
  {
    "type": "cites",
    "to": "s-w5wg69pvvhedsws"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  },
  {
    "type": "cites",
    "to": "s-fprt8xysafzjqv9"
  },
  {
    "type": "cites",
    "to": "s-jk8v3srrved7ram"
  },
  {
    "type": "cites",
    "to": "s-chsfpkgpmfk4fft"
  },
  {
    "type": "cites",
    "to": "s-rpv4fkdqqguptqd"
  },
  {
    "type": "cites",
    "to": "s-weuyx98r7c923ab"
  },
  {
    "type": "cites",
    "to": "s-2dhbqy43tcm6qj2"
  },
  {
    "type": "cites",
    "to": "s-e3495enbc5h75c3"
  }
]
```

### The wording the owner agreed to (s-f5rz6b7dhxejjts)

Title: The commands that `sheriff` accepts

The SpecSheriff tools are run as `sheriff <command>` and accept only the following commands. Each command is listed with its purpose and the nodes that describe it:

`sheriff validate`: checks that the specification holds together and that each change to it follows the guidelines (§s-4kd2pave7vm4hmd);

`sheriff binding`: checks the specification against the code and the tests that are bound to it (§s-4kd2pave7vm4hmd);

`sheriff citations`: checks that each sid cited in the code, the tests and the documentation names a node of the specification (§s-4kd2pave7vm4hmd);

`sheriff guard`: checks an agent's edit before it is made, and refuses an edit that the SpecSheriff guidelines forbid (§s-4kd2pave7vm4hmd);

`sheriff commit-message`: checks a commit's message against the code that the commit changes (§s-4kd2pave7vm4hmd);

`sheriff review`: asks the independent reviewer for its verdict on a commit (§s-4kd2pave7vm4hmd);

`sheriff init`: sets a repository up for SpecSheriff (§s-7unxytshhc4md54);

`sheriff remove`: removes SpecSheriff from a repository and leaves the repository's specification as it is (§s-7unxytshhc4md54);

`sheriff approve`: records an owner's approval of a node, or the withdrawal of that approval (§s-v4qus7raqnwzneb);

`sheriff reindex`: writes into the specification what the SpecSheriff tools compute from it, and rewrites in its own form what an earlier release wrote (§s-ztseyetus7np6br, §s-gb8s9657a65hqmv, §s-w5wg69pvvhedsws);

`sheriff types`: generates parts of the system's code from the approved wordings of the nodes, for example the types and RuntimeChecks for the RecordTypes (§s-a8fn72xa782wvbk);

`sheriff json`: prints as JSON the model of the specification, which a project's own check or generator reads (§s-w6gybeqn2ttydqx);

`sheriff todos`: prints every todo of the specification together with its node (§s-fprt8xysafzjqv9);

`sheriff guide`: prints the guidelines that the project follows, which an agent reads before it works on the specification (§s-jk8v3srrved7ram);

`sheriff settings`: shows and changes the specification's approval status, its `strict` flag and the extensions of the guidelines that the project has chosen (§s-chsfpkgpmfk4fft);

`sheriff untagged`: lists the symbols of the system's code that have no SpecTag, each with its file (§s-weuyx98r7c923ab);

`sheriff show`: prints one node, found by its sid or its location (§s-k4nqjr96ux7a5m7);

`sheriff markdown`: writes a human-readable export of the specification as Markdown (§s-k4nqjr96ux7a5m7);

`sheriff map`: writes a map of the specification's structure (§s-rpv4fkdqqguptqd).

`sheriff` with no command prints the list of the commands. `sheriff --version` prints the version number of the SpecSheriff tools. `sheriff` with any other word in place of a command reports that word as unknown, prints the list of the commands and exits with code 2.

Reason: A reader who knows what has to be done, or the name of a command, finds here the command for the task and the nodes that describe everything the command does.
