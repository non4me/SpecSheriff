# Group 1 drafts for review (generated 2026-11-23T16:37:45.245Z)

## A link from the SpecSheriff guidelines to an extension | key new:tools-7-1-guidelines-to-extension | sid s-75r4pg4wdqu3gw5 | tools 7.1.12b (new, after "`consumes` links")

### Text

`sheriff validate` refuses each link that a rule of the SpecSheriff guidelines declares to a node of an extension of the guidelines (§s-zyaf34chxugtjyn). The refusal names the rule by its file, its sid and its location, and names the link's type and its target.

`sheriff validate` makes this check only where the repository keeps `specs/_guidelines/spec.json`, the file of the SpecSheriff guidelines (§s-zefk589ykh37b8u). It reads every node of that file other than a section, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). A node of an extension is a node of a file in `specs/_guidelines/extensions/`.

A citation of a node of an extension is refused through the link that the citation requires (§s-qzyacnqwvaeaps4).

### Reason

In the repository where the SpecSheriff guidelines are written, the extensions are kept beside them. A link from a rule of the guidelines to a node of an extension therefore resolves and passes every other check. The folder of each node's file shows whether the node belongs to the SpecSheriff guidelines or to an extension.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-zyaf34chxugtjyn"
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
    "to": "s-qzyacnqwvaeaps4"
  }
]
```

### The current node in tools.json

(none: this node is new)

## `implements` and `refines` links of the appendices and of a project's own guidelines | key s-yprj7d6tnvauggr | sid s-yprj7d6tnvauggr | tools 7.1.21

### Text

`sheriff validate` requires each of the following nodes, other than a section, to declare the link named for it:

a node of the technical appendix outside the section on the stack and the technical debt section: an `implements` link to a node of the base specification (§s-694brc6fytwxc5v);

a node of the appendix of the tools: an `implements` link to a rule of the SpecSheriff guidelines or of an extension of the guidelines (§s-9c8t99cz34p28sg);

a node of the project's own guidelines: a `refines` link to a rule of the SpecSheriff guidelines or of an extension that the project has chosen (§s-3dashdedvu4xgfb, §s-9ttvcwpqkehm58g).

`sheriff validate` refuses each such node in the files that the repository keeps that lacks that link. The refusal names the node by its file, its sid and its location.

`sheriff validate` tells which part a node belongs to by the path of its file (§s-zefk589ykh37b8u). It reads a node in a cell of a `TableRule` as it reads any other node (§s-5fewsp22mmdz7y6).

### Reason

The type of a link says how a node builds on its target: a node of an appendix describes how its target is implemented, while a rule of a project's own guidelines refines or extends its target. One type, `refines`, records both refining and extending, since no check can tell them apart.

### Examples

```json
[
  {
    "en": "A rule of `project.json` lists the project's test fixtures and declares an `implements` link to the rule on such fixtures. `sheriff validate` refuses it, since a project's own guidelines refine the SpecSheriff guidelines and never implement them. With a `refines` link in its place, the rule passes.",
    "ru": "Правило `project.json` перечисляет фикстуры тестов проекта и объявляет связь `implements` с правилом о таких фикстурах. `sheriff validate` его отвергает: собственные guidelines проекта уточняют SpecSheriff guidelines и никогда их не реализуют. Со связью `refines` вместо неё правило проходит."
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
    "to": "s-9ttvcwpqkehm58g"
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

### The current node in tools.json

Title: `implements` and `refines` links of the appendices and a project's own guidelines

`sheriff validate` resolves the outgoing `implements` and `refines` links of each node but a section, and reads the part of the node each names.

Reason: (none)

## Copies of the files that the plugin delivers | key s-6bmnsbskg6en4nf | sid s-6bmnsbskg6en4nf | tools 7.1.20

### Text

`sheriff validate` refuses each copy of the files common to every project, which come with the SpecSheriff tools in the plugin (§s-zefk589ykh37b8u, §s-rnbm4v8hsta6heq). The refusal names each such file. A copy is any of the following files that the repository keeps:

`specs/_guidelines/spec.json` and `specs/_guidelines/tools.json`;

each file in `specs/_guidelines/extensions/`;

each file in `specs/_schema/` or in a folder under it, other than `specs/_schema/project.schema.json`.

`sheriff validate` accepts these files only in the repository where the SpecSheriff guidelines are written, which the SpecSheriff tools recognise by an environment variable (§s-zefk589ykh37b8u).

### Reason

A project reads these files from the plugin (§s-zefk589ykh37b8u). A copy in its repository is read by people and agents but by none of the SpecSheriff tools, so it falls behind the files in force unnoticed. A copy is found by its path, since a project keeps nothing else at these paths.

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

### The current node in tools.json

Title: No copy of the SpecSheriff guidelines

`sheriff validate` refuses a copy of the SpecSheriff guidelines or of their schema outside the repository they are written in. A copy is:

- a `spec.json` or a `tools.json` under `specs/_guidelines/`;
- any file under `specs/_schema/` but `project.schema.json`.

Reason: (none)
