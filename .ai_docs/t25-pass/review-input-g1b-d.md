# Group 1 drafts for review (generated 2026-11-23T19:50:39.429Z)

## A link from the SpecSheriff guidelines to an extension | key new:tools-7-1-guidelines-to-extension | sid s-75r4pg4wdqu3gw5 | tools 7.1.12b (new, after "`consumes` links")

### Text

`sheriff validate` refuses each link that a rule of the SpecSheriff guidelines (§s-u7tw6m8npxmv5tu) declares to a node of an extension of the guidelines (§s-mbmnsnxenmavu3z, §s-zyaf34chxugtjyn). The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx), and names the link's type and its target. `sheriff validate` makes this check only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u). There it reads every node of `specs/_guidelines/spec.json` other than a section, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). A node of an extension is a node of a file in `specs/_guidelines/extensions/`.

### Reason

In the repository where the SpecSheriff guidelines are written, the extensions are kept beside them. A link from a rule of the guidelines to a node of an extension therefore resolves and passes every other check.

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

## `implements` and `refines` links of the appendices and of a project's own guidelines | key s-yprj7d6tnvauggr | sid s-yprj7d6tnvauggr | tools 7.1.21

### Text

In the files that the repository keeps, `sheriff validate` refuses each of the following nodes, other than a section, that lacks the link named for it:

a node of the technical appendix (§s-tj38pvm38nepaf5) outside the section on the stack (§s-vj7ercem526zd6v) and the technical debt section (§s-2r7k2aeyusgy6fw): an `implements` link to a node of the base specification (§s-5x737t9nee4zgaa, §s-694brc6fytwxc5v);

a node of the appendix of the tools (§s-a4rbry4hsu34hy8): an `implements` link to a rule of the SpecSheriff guidelines (§s-u7tw6m8npxmv5tu) or of an extension of the guidelines (§s-mbmnsnxenmavu3z, §s-9c8t99cz34p28sg);

a node of the project's own guidelines (§s-u7tw6m8npxmv5tu): a `refines` link (§s-sn6au3vcr9uy5pm) to a rule of the SpecSheriff guidelines or of an extension that the project has chosen (§s-3dashdedvu4xgfb, §s-9ttvcwpqkehm58g).

The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx).

`sheriff validate` tells which part of the specification a node belongs to by the path of its file (§s-zefk589ykh37b8u). It reads a node in a cell of a `TableRule` as it reads any other node (§s-5fewsp22mmdz7y6).

### Reason

A node linked to the rule it builds on is found whenever that rule changes. Only a reader can judge whether the two still agree.

### Examples

```json
[
  {
    "en": "A rule of `project.json` lists the project's test fixtures and declares an `implements` link to the rule on such fixtures. `sheriff validate` refuses the rule, since it declares no `refines` link. With a `refines` link in its place, the rule passes.",
    "ru": "Правило `project.json` перечисляет фикстуры тестов проекта и объявляет связь `implements` с правилом о таких фикстурах. `sheriff validate` отвергает правило: у него нет связи `refines`. Со связью `refines` вместо неё правило проходит."
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

## Copies of the files that the plugin delivers | key s-6bmnsbskg6en4nf | sid s-6bmnsbskg6en4nf | tools 7.1.20

### Text

`sheriff validate` refuses each copy of the files that are common to every project and come with the SpecSheriff tools in the plugin (§s-zefk589ykh37b8u, §s-rnbm4v8hsta6heq). It accepts such a file only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u).

A copy is any of the following files that the repository keeps:

`specs/_guidelines/spec.json` and `specs/_guidelines/tools.json`;

each file in `specs/_guidelines/extensions/`;

each file in `specs/_schema/` or in a folder under it, other than `specs/_schema/project.schema.json`.

The refusal names each such file. While the repository keeps a copy, `sheriff validate` makes this check alone.

### Reason

A project reads these files from the plugin (§s-zefk589ykh37b8u). A copy in its repository is read by people and agents but by none of the SpecSheriff tools, so it falls behind the files in force unnoticed.

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
