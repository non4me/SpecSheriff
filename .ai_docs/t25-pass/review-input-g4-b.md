# Group 4 drafts for review (generated 2026-11-24T16:22:56.412Z)

## A location outside the specification | key s-nh8b2hjvzasdxmd | sid s-nh8b2hjvzasdxmd | tools 7.2.7

### Text

`sheriff binding` refuses each location of a node (§s-kag2m9tzdnduxdx) written in a file that the repository keeps outside `specs/`, the folder that holds the files of the specification (§s-zefk589ykh37b8u, §s-u5hfbygfyqv4wmf). The refusal names the file, the line and the location, and says that a node is cited by its sid (§s-9spq78kdwsxr759).

`sheriff binding` takes as a location each of the following, whatever the case of its letters:

text in the form of a numbered node's location (§s-ygg5kpcxgzq3m7w), such as `base/3.2` or `_guidelines/spec/1.3.4`, whether or not a node is at that location now;

a location of a node of the model of the specification (§s-w6gybeqn2ttydqx) where the location holds a slash and ends in no number, such as `contracts/request`, the location of a term (§s-khqsmy6mhejkrhg).

Text has the form of a numbered node's location where it consists of one of the following, a slash and one or more numbers separated by dots:

the name of a folder under `specs/` that holds files of the base specification (§s-5x737t9nee4zgaa);

the location of the first top-level node of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5).

Such text counts only on its own, not as part of a longer path or name: in `specs/tech/stack.json`, `tech/stack` is part of a path and is no location.

`sheriff binding` leaves out each file that the project's own guidelines list as a fixture of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu).

`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-u5hfbygfyqv4wmf).

### Reason

A node's location changes whenever the specification is reordered, while its sid never changes (§s-9spq78kdwsxr759). Outside the specification no link backs a location, so a location left in a file would point at another node, or at none, without any check noticing.

### Examples

```json
[
  {
    "en": "A guide in `docs/` says “see `base/3.2`”. `sheriff binding` refuses that line and names `base/3.2`, though no node is at that location now. The most likely mistake is to refuse only a location at which a node exists, which lets a location left behind by a removed node pass.",
    "ru": "Руководство в `docs/` говорит «см. `base/3.2`». `sheriff binding` отвергает эту строку и называет `base/3.2`, хотя сейчас по этому расположению узла нет. Самая вероятная ошибка — отвергать только расположение, по которому есть узел: тогда проходит расположение, оставшееся от удалённого узла."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-u5hfbygfyqv4wmf"
  },
  {
    "type": "implements",
    "to": "s-6hha5en226aj8hu"
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
    "to": "s-9spq78kdwsxr759"
  },
  {
    "type": "cites",
    "to": "s-ygg5kpcxgzq3m7w"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  },
  {
    "type": "cites",
    "to": "s-khqsmy6mhejkrhg"
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
    "to": "s-tj38pvm38nepaf5"
  }
]
```

### The current node

Title: Citing a node only by its sid

Wherever a node is cited, a rule, a term or a node of a project's own NodeKind, it is cited by its sid, never by its location (§s-kag2m9tzdnduxdx). `sheriff binding` holds every file of the repository to this but those under `specs/`. There `sheriff validate` checks the citations in the nodes (§s-qzyacnqwvaeaps4).

- A location of a node found in a file is refused, in any case of its letters and whether or not the node exists now.
- One exception: the fixtures of the tests of a check that reads citations or locations. Such a test needs a file holding a location, as the data it feeds the check. The files are those the project's own guidelines list as fixtures (§s-6hha5en226aj8hu).

Reason: (none)

## A citation outside the specification | key s-m8nmfsxkcfu7cjp | sid s-m8nmfsxkcfu7cjp | tools 7.3.1

### Text

`sheriff citations` refuses each of the following in the files that it reads (§s-e84nggntkrcyumq):

a word that has the form of a sid, `s-` followed by 15 characters from `23456789abcdefghjkmnpqrstuvwxyz` (§s-eferktypcj7njt5), where that sid names no node of the model of the specification (§s-w6gybeqn2ttydqx);

a `§` followed directly by a digit, such as `§5.8`, which cites a node by a number instead of its sid (§s-9spq78kdwsxr759).

Each refusal names the file, the line and the text refused.

`sheriff citations` reads the following files:

the system's code (§s-hheus6f395ynqvc) and its tests: the files that the glob patterns for code or for tests in `sheriff.config.json` match (§s-zefk589ykh37b8u), and the files that `sheriff types` writes (§s-a8fn72xa782wvbk);

the code and the tests of each of the project's own checks and generators (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the files that the glob patterns given for them in `sheriff.config.json` match;

the documentation: each Markdown file that the repository keeps outside `specs/` (§s-zefk589ykh37b8u).

In the files that it reads, `sheriff citations` checks each word that has the form of a sid, except the sid of a SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) in the system's code or its tests. The check of a SpecTag that names no node checks the sid of such a SpecTag (§s-36x8amvunmv2kp5).

`sheriff citations` leaves out each file that the project's own guidelines list as a fixture of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu).

`sheriff citations` makes this check regardless of whether the specification is approved or a draft (§s-e84nggntkrcyumq).

### Reason

Outside the specification no link backs a citation (§s-9spq78kdwsxr759). So a cited sid that names no node, or a number in place of a sid, would mislead every reader, and no other check would notice it.

### Examples

```json
[
  {
    "en": "The guide `docs/setup.md` cites `§s-…`, the sid of a rule that a later commit removes. That commit changes no file outside `specs/`, and `sheriff citations` refuses it, naming the guide, the line and the sid. The most likely mistake is to read only the files that the commit changes, which lets the citation pass until someone edits the guide.",
    "ru": "Руководство `docs/setup.md` цитирует `§s-…` — sid правила, которое удаляет более поздний коммит. Этот коммит не меняет ни одного файла вне `specs/`, и `sheriff citations` отвергает его, называя руководство, строку и sid. Самая вероятная ошибка — читать только файлы, которые меняет коммит: тогда цитата проходит, пока кто-нибудь не изменит руководство."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-e84nggntkrcyumq"
  },
  {
    "type": "implements",
    "to": "s-6hha5en226aj8hu"
  },
  {
    "type": "cites",
    "to": "s-eferktypcj7njt5"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  },
  {
    "type": "cites",
    "to": "s-9spq78kdwsxr759"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  },
  {
    "type": "cites",
    "to": "s-2fau85dfyyeq66m"
  },
  {
    "type": "cites",
    "to": "s-km4x4s26kv7pjze"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-36x8amvunmv2kp5"
  }
]
```

### The current node

Title: A citation outside the specification

`sheriff citations` resolves each sid in the code, the tests and the documents against the nodes, the archive's included. It refuses a `§` followed by a number in place of a sid, such as `§5.8`: a node is cited only by its sid.

- One exception: the fixtures of the tests of a check that reads citations or locations are not read. The files are those the project's own guidelines list as fixtures (§s-6hha5en226aj8hu).

Reason: (none)
