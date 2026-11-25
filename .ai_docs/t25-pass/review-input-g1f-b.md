# Group 1 drafts for review (generated 2026-11-23T23:11:25.444Z)

## A section with a rule in it | key s-zhen42p6mnaxu7w | sid s-zhen42p6mnaxu7w | tools 7.1.11

### Text

`sheriff validate` accepts a section of the specification in the files that the repository keeps only where the section contains a rule (§s-exxuckgakfxkycp). It refuses any other section, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx).

A section contains a rule where at least one of the nodes directly under it is one of the following:

a node of the kind `TextRule` or `TableRule` (§s-5fewsp22mmdz7y6), or, where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), of the kind `RecordType` (§s-ktfstpv8rurznrp);

a term or a node of a project's own kind (§s-pctqj9wqaq8762t);

a section that contains a rule.

### Reason

A section whose rules have all been moved or removed still looks like a part of the specification. Its approval status, which the SpecSheriff tools derive from the nodes under it (§s-9kfdycuq34beqvs), does not show that the section contains no rule.

### Examples

```json
[
  {
    "en": "A section holds only a nested section, whose last rule was moved to another file. `sheriff validate` refuses both sections, since neither contains a rule. The most likely mistake is to refuse only the nested section.",
    "ru": "Раздел содержит только вложенный раздел, последнее правило которого перенесено в другой файл. `sheriff validate` отвергает оба раздела, потому что ни в одном из них нет правила. Самая вероятная ошибка — отвергнуть только вложенный раздел."
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
  },
  {
    "type": "cites",
    "to": "s-9kfdycuq34beqvs"
  }
]
```

### The current node

Title: A section with a rule in it

`sheriff validate` reads the children of every section, and those of each section inside it, for a node that counts as a rule (§s-7445ahgjck2aefg).

Reason: (none)

## `exempts` links | key s-qvgzubkrafadqgf | sid s-qvgzubkrafadqgf | tools 7.1.12

### Text

`sheriff validate` accepts an `exempts` link (§s-gf6n8ge4mke3pr2, §s-6u54kfn4ze29r6h) only where all of the following hold:

the node that declares the link is a node of the project's own guidelines, kept in `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);

the link's target is a section or a rule, a rule being a node of the kind `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) or `RecordType` (§s-ktfstpv8rurznrp), or of a project's own kind (§s-vsh384ybt4w25a2);

the text of the node that declares the link cites the target (§s-cxtt6jvhqcey2k9).

`sheriff validate` refuses any other `exempts` link, naming the node that declares it by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and naming the link's target.

### Reason

An `exempts` link lifts the requirement that the system's code implement its target (§s-6fw72j65jkqrfpf). So a link that the rule on exempting a rule does not allow (§s-gf6n8ge4mke3pr2) would hide a rule that the system's code does not implement.

### Examples

```json
[
  {
    "en": "The section on the stack holds a rule that chooses the programming language. A rule of `project.json` exempts that rule, since no symbol in the code can implement that choice. The exempting rule's text gives that reason and cites the rule that it exempts. The exempting rule also declares an `exempts` link to that rule, and `sheriff validate` accepts the link. The most likely mistake is to cite the exempted rule only in the reason, in which case `sheriff validate` refuses the link.",
    "ru": "Раздел стека содержит правило, которое выбирает язык программирования. Правило `project.json` освобождает это правило от имплементации, потому что ни один символ в коде не может реализовать этот выбор. Текст освобождающего правила приводит эту причину и ссылается на правило, которое оно освобождает. Освобождающее правило также объявляет с этим правилом связь `exempts`, и `sheriff validate` эту связь принимает. Самая вероятная ошибка — сослаться на освобождаемое правило только в обосновании: тогда `sheriff validate` связь отвергает."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-6u54kfn4ze29r6h"
  },
  {
    "type": "cites",
    "to": "s-gf6n8ge4mke3pr2"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
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
    "to": "s-vsh384ybt4w25a2"
  },
  {
    "type": "cites",
    "to": "s-cxtt6jvhqcey2k9"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-6fw72j65jkqrfpf"
  }
]
```

### The current node

Title: `consumes` and `exempts` links

`sheriff validate` reads what stands at each end of every `consumes` and `exempts` link:

- a `consumes` link, for a domain's header at its start and a section of another domain at its end;
- an `exempts` link, for a node of `project.json` at its start, and a rule, a node of a project's own NodeKind or a section at its end.

Reason: (none)

## `consumes` links | key new:tools-7-1-consumes | sid s-p3n666zfjdrrw6a | tools 7.1.12a (new, after "`exempts` links")

### Text

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a `consumes` link only where it goes from a domain's header to a section in the files of another domain (§s-yggv9myedprnaa7, §s-rdavpdea67hsntf). A domain's files are those in its folder, `specs/<domain>/` (§s-zefk589ykh37b8u).

`sheriff validate` refuses any other `consumes` link, naming the node that declares it by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and naming the link's target.

### Reason

The index in a domain's header, and the check for a cycle in which domains use one another, both read from the `consumes` links which domain uses which section (§s-2r59txnms5serdr, §s-bncp7gtyaukur8e). Any other `consumes` link would make the index wrong or the cycle check give a wrong result.

### Examples

```json
[
  {
    "en": "The header of the domain `requests` declares a `consumes` link to the section of the domain `users` that describes how a user signs in, and `sheriff validate` accepts the link. The most likely mistake is to point the link at the rule in that section that the domain `requests` relies on, in which case `sheriff validate` refuses the link.",
    "ru": "Заголовок домена `requests` объявляет связь `consumes` с разделом домена `users`, описывающим, как пользователь входит в систему, и `sheriff validate` эту связь принимает. Самая вероятная ошибка — направить связь на то правило этого раздела, на которое опирается домен `requests`: тогда `sheriff validate` связь отвергает."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-rdavpdea67hsntf"
  },
  {
    "type": "cites",
    "to": "s-tdm3rwsppnuh6dm"
  },
  {
    "type": "cites",
    "to": "s-yggv9myedprnaa7"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
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
    "to": "s-bncp7gtyaukur8e"
  }
]
```

### The current node

(none: this node is new)

## A link from the SpecSheriff guidelines to an extension of the guidelines | key new:tools-7-1-guidelines-to-extension | sid s-75r4pg4wdqu3gw5 | tools 7.1.12b (new, after "`consumes` links")

### Text

`sheriff validate` refuses each link that a rule of the SpecSheriff guidelines (§s-u7tw6m8npxmv5tu) declares to a node of an extension of the guidelines (§s-mbmnsnxenmavu3z, §s-zyaf34chxugtjyn). The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx), and names the link's type and its target. `sheriff validate` runs this check only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u). There it reads every node of `specs/_guidelines/spec.json` other than a section, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).

### Reason

In the repository where the SpecSheriff guidelines are written, the extensions of the guidelines are kept beside them. A link from a rule of the guidelines to a node of an extension therefore resolves and passes every other check.

### Examples

```json
[
  {
    "en": "A rule of `spec.json` cites a rule of an extension and declares the `cites` link that the citation requires. `sheriff validate` refuses that link.",
    "ru": "Правило `spec.json` цитирует правило расширения и объявляет связь `cites`, которой требует цитата. `sheriff validate` отвергает эту связь."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-zyaf34chxugtjyn"
  },
  {
    "type": "cites",
    "to": "s-u7tw6m8npxmv5tu"
  },
  {
    "type": "cites",
    "to": "s-mbmnsnxenmavu3z"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  }
]
```

### The current node

(none: this node is new)

## `implements` and `refines` links in the appendices and in a project's own guidelines | key s-yprj7d6tnvauggr | sid s-yprj7d6tnvauggr | tools 7.1.21

### Text

In the files that the repository keeps, `sheriff validate` refuses each of the following nodes, other than a section, where the node lacks the link listed for it:

a node of the technical appendix (§s-tj38pvm38nepaf5) outside the section on the stack (§s-vj7ercem526zd6v) and the technical debt section (§s-2r7k2aeyusgy6fw): an `implements` link (§s-sn6au3vcr9uy5pm) to a node of the base specification (§s-5x737t9nee4zgaa, §s-694brc6fytwxc5v);

a node of the appendix of the tools (§s-a4rbry4hsu34hy8): an `implements` link to a rule of the SpecSheriff guidelines (§s-u7tw6m8npxmv5tu) or of an extension of the guidelines (§s-mbmnsnxenmavu3z, §s-9c8t99cz34p28sg);

a node of the project's own guidelines (§s-u7tw6m8npxmv5tu): a `refines` link (§s-sn6au3vcr9uy5pm) to a rule of the SpecSheriff guidelines or of an extension that the project has chosen (§s-3dashdedvu4xgfb, §s-9ttvcwpqkehm58g).

The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx).

`sheriff validate` determines which part of the specification a node belongs to from the path of its file (§s-zefk589ykh37b8u). It checks a node in a cell of a `TableRule` as it checks any other node (§s-5fewsp22mmdz7y6).

### Reason

A node linked to the rule it builds on can be found whenever that rule changes. Only a reader can judge whether the two still agree.

### Examples

```json
[
  {
    "en": "A rule of `project.json` lists the project's test fixtures and declares an `implements` link to the rule on such fixtures. `sheriff validate` refuses the rule of `project.json`, since it declares no `refines` link. With a `refines` link in its place, the rule passes.",
    "ru": "Правило `project.json` перечисляет фикстуры тестов проекта и объявляет связь `implements` с правилом о таких фикстурах. `sheriff validate` отвергает правило `project.json`: у него нет связи `refines`. Со связью `refines` вместо неё правило проходит."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-694brc6fytwxc5v"
  },
  {
    "type": "implements",
    "to": "s-9c8t99cz34p28sg"
  },
  {
    "type": "implements",
    "to": "s-3dashdedvu4xgfb"
  },
  {
    "type": "cites",
    "to": "s-tj38pvm38nepaf5"
  },
  {
    "type": "cites",
    "to": "s-vj7ercem526zd6v"
  },
  {
    "type": "cites",
    "to": "s-2r7k2aeyusgy6fw"
  },
  {
    "type": "cites",
    "to": "s-5x737t9nee4zgaa"
  },
  {
    "type": "cites",
    "to": "s-a4rbry4hsu34hy8"
  },
  {
    "type": "cites",
    "to": "s-u7tw6m8npxmv5tu"
  },
  {
    "type": "cites",
    "to": "s-mbmnsnxenmavu3z"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  }
]
```

### The current node

Title: `implements` and `refines` links of the appendices and a project's own guidelines

`sheriff validate` resolves the outgoing `implements` and `refines` links of each node but a section, and reads the part of the node each names.

Reason: (none)

## Copies of the files that the SpecSheriff plugin delivers | key s-6bmnsbskg6en4nf | sid s-6bmnsbskg6en4nf | tools 7.1.20

### Text

`sheriff validate` refuses each copy of a file that is common to every project and comes with the SpecSheriff tools in the SpecSheriff plugin (§s-zefk589ykh37b8u, §s-rnbm4v8hsta6heq). It accepts such a file only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u).

A copy is any of the following files that the repository keeps:

`specs/_guidelines/spec.json` and `specs/_guidelines/tools.json`;

each file in `specs/_guidelines/extensions/`;

each file in `specs/_schema/` or in a folder under it, other than `specs/_schema/project.schema.json`.

The refusal names each copy. As long as the repository keeps a copy, `sheriff validate` runs only the check for copies.

### Reason

In a project, the SpecSheriff tools read the files common to every project from the SpecSheriff plugin (§s-zefk589ykh37b8u). A copy in the project's repository is read by people and agents, but not by any of the SpecSheriff tools. So it falls behind the plugin's files unnoticed.

### Examples

```json
[
  {
    "en": "A project copies `node.schema.json` into `specs/_schema/` to read it beside its own extension of the schema. `sheriff validate` refuses the copy and names it. It accepts `specs/_schema/project.schema.json`, the project's own extension of the schema.",
    "ru": "Проект копирует `node.schema.json` в `specs/_schema/`, чтобы читать его рядом со своим расширением схемы. `sheriff validate` отвергает копию и называет её. `specs/_schema/project.schema.json`, собственное расширение схемы проекта, он принимает."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-rnbm4v8hsta6heq"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  }
]
```

### The current node

Title: No copy of the SpecSheriff guidelines

`sheriff validate` refuses a copy of the SpecSheriff guidelines or of their schema outside the repository they are written in. A copy is:

- a `spec.json` or a `tools.json` under `specs/_guidelines/`;
- any file under `specs/_schema/` but `project.schema.json`.

Reason: (none)
