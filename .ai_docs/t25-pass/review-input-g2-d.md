# Group 1 drafts for review (generated 2026-11-24T00:59:48.484Z)

## How a symbol carries its SpecTags | key new:tools-8-symbol | sid s-33fw3ga4ctd94dq | tools 8.2 (new)

### Text

In a file whose language a description covers, the SpecTags (§s-5z5gnu7pahr82xp) of a symbol (§s-kgbzk2ph9e6jfb4) are lines of the comment directly above it, above its decorators where it has any. That comment is:

in TypeScript and JavaScript, the symbol's doc comment;

in Python, a comment line.

Only the delimiters of the comment may share a SpecTag's line.

Where the first of a run of re-exports, with no blank line between them, carries `@spec none`, that SpecTag binds the whole run.

The SpecSheriff tools find the symbol that a SpecTag is above by parsing the file with tree-sitter and the grammar of the file's language. They use the parser alone, with no program and no type checker.

A description of each language names what counts in it as a symbol and as a test. The descriptions are the files in the folder `languages/` of the SpecSheriff tools. TypeScript, JavaScript and Python are described.

### Reason

A SpecTag sits where a reader of the symbol already looks. There a parser, unlike a scan of the text, can tell which symbol the SpecTag binds, and gives the same answer for the same file every time.

### Examples

```json
[
  {
    "en": "In TypeScript, `/** @spec s-… */` directly above `export function close()` binds the function and every symbol nested in it. The most likely mistake is a blank line between the comment and the function, so that the SpecTag is above no symbol and binds nothing.",
    "ru": "В TypeScript `/** @spec s-… */` непосредственно над `export function close()` привязывает функцию и каждый вложенный в неё символ. Самая вероятная ошибка — пустая строка между комментарием и функцией: тогда SpecTag не стоит ни над каким символом и ничего не привязывает."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  }
]
```

### The current node

(none: this node is new)

## SpecTags at the start of a file | key new:tools-8-file-start | sid s-5qdjyf6t898rsd4 | tools 8.3 (new)

### Text

A file of the system's code (§s-hheus6f395ynqvc) other than tests carries its SpecTags (§s-5z5gnu7pahr82xp) at its start where all of the following hold (§s-kgbzk2ph9e6jfb4):

the SpecSheriff tools cannot identify the file's symbols, because no description covers its language (§s-33fw3ga4ctd94dq);

the file's format allows comments (§s-trwczfskj5zmuft).

The SpecTags of such a file are on the lines that come before its first line holding a letter or a digit outside a SpecTag. The file's first line is not counted, so that a line that the format requires first, such as an XML declaration, may come before them.

The text that follows `@spec none` runs to the end of its line, less any characters at its end that are neither letters nor digits.

### Reason

The lines before a file's content can be told apart in any language without parsing. So the SpecTags of a file that the SpecSheriff tools cannot parse are kept there.

### Examples

```json
[
  {
    "en": "A stylesheet starts with `/* @spec s-… */`, followed by its rules. An XML file starts with its declaration, `<?xml version=\"1.0\"?>`, followed by `<!-- @spec s-… -->`. The most likely mistake is to put the SpecTag after a licence comment at the start of the file. The words of the licence then come first, and the SpecTag binds nothing.",
    "ru": "Таблица стилей начинается с `/* @spec s-… */`, за которым идут её правила. Файл XML начинается со своего объявления `<?xml version=\"1.0\"?>`, за которым идёт `<!-- @spec s-… -->`. Самая вероятная ошибка — поставить SpecTag после комментария с лицензией в начале файла. Тогда первыми идут слова лицензии, и SpecTag ничего не привязывает."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-33fw3ga4ctd94dq"
  },
  {
    "type": "cites",
    "to": "s-trwczfskj5zmuft"
  }
]
```

### The current node

(none: this node is new)

## The bindings file | key new:tools-8-bindings | sid s-trwczfskj5zmuft | tools 8.4 (new)

### Text

`sheriff binding` accepts an entry in the bindings file (§s-kgbzk2ph9e6jfb4), `sheriff.bindings.json` (§s-zefk589ykh37b8u), only where the entry's path names a file that the repository keeps as the commit leaves it (§s-ffkv5qnqvet7bga). It refuses any other entry, naming its path.

The bindings file holds a JSON object. Each key of the object is the path of a file from the root of the repository, with forward slashes. The value of each key is the list of the SpecTags (§s-5z5gnu7pahr82xp) of that file, each a string.

An entry binds a file of the system's code other than tests whose format allows no comments. Such a format is JSON, in a file whose name ends in `.json`, or a format whose files match the glob patterns that the project's own guidelines list for it (§s-u7tw6m8npxmv5tu).

The SpecSheriff tools refuse a `sheriff.bindings.json` that is not valid JSON or does not hold an object of that form.

### Reason

An entry names its file only by the file's path, and the path stays the same when the file is moved or renamed. So only a check of every entry against the repository shows that a file has lost its SpecTags.

### Examples

```json
[
  {
    "en": "`src/ui/texts.json` holds the texts that a user interface shows, and the bindings file holds the entry `\"src/ui/texts.json\": [\"@spec s-…\"]`. The most likely mistake is to rename the file to `src/ui/labels.json` and leave the entry as it was. `sheriff binding` then refuses the entry, and the renamed file carries no SpecTag.",
    "ru": "`src/ui/texts.json` содержит тексты, которые показывает пользовательский интерфейс, а файл привязок содержит запись `\"src/ui/texts.json\": [\"@spec s-…\"]`. Самая вероятная ошибка — переименовать файл в `src/ui/labels.json` и оставить запись прежней. Тогда `sheriff binding` отвергает запись, а у переименованного файла нет SpecTag."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-ffkv5qnqvet7bga"
  },
  {
    "type": "implements",
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-u7tw6m8npxmv5tu"
  }
]
```

### The current node

(none: this node is new)

## How a test declares the rule it is written from | key s-zrsc6asgmhv8tnc | sid s-zrsc6asgmhv8tnc | tools 8.5 (moved from tools 9 into the new section)

### Text

A test declares the SpecTag (§s-5z5gnu7pahr82xp) of the rule it is written from (§s-nrjxfvpkq3m8hzm):

in TypeScript and JavaScript, by opening its name with it, as in `test("@spec s-… what it checks", …)`;

in Python, by a mark on the test, `@pytest.mark.spec("@spec s-…")`;

in a further language, as the description of that language says (§s-33fw3ga4ctd94dq).

A test declares one SpecTag.

The plugin for pytest of the SpecSheriff tools, `pytest-specsheriff`, registers the mark. It puts the test's SpecTag at the start of the name that a run reports for the test.

The plugin stops the run with an error that names the test where the mark holds anything other than one SpecTag. Where the mark holds a bare sid (§s-gb8s9657a65hqmv), the error also names `sheriff reindex`, which writes the SpecTag.

### Reason

A run of the tests reports each test by its name, so the SpecTag stands where that report shows it. The name of a Python function cannot hold a SpecTag, so the plugin for pytest moves the SpecTag from the mark into the name that the run reports.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-nrjxfvpkq3m8hzm"
  },
  {
    "type": "implements",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-33fw3ga4ctd94dq"
  },
  {
    "type": "cites",
    "to": "s-gb8s9657a65hqmv"
  }
]
```

### The current node

Title: How a test declares the node it is written from

A test declares its SpecTag:

- in TypeScript and JavaScript, by opening its name with it: `test("@spec s-… what it checks", …)`;
- in Python, by a mark on the test, `@pytest.mark.spec("@spec s-…")`;
- in a further language, as the description of that language says.

The plugin for pytest of the SpecSheriff tools, `pytest-specsheriff`, registers the mark. It also opens the name a run reports with the SpecTag.

Reason: In TypeScript and JavaScript a test's name is a string, which a SpecTag can open. A run reports that name.

A Python test is named by its function, which cannot hold a SpecTag. So a Python test's SpecTag goes into a mark. The plugin puts it where a run's report shows it.

## SpecTags on the system's code other than tests | key s-9rtrj24myzjvshu | sid s-9rtrj24myzjvshu | tools 7.2.2

### Text

`sheriff binding` refuses each of the following in the system's code (§s-hheus6f395ynqvc) other than tests (§s-k6dzuajejrw4cej):

a symbol (§s-kgbzk2ph9e6jfb4) that no SpecTag (§s-5z5gnu7pahr82xp) binds;

a file that is to be bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) and that no SpecTag binds;

in a file whose language a description covers (§s-33fw3ga4ctd94dq), a SpecTag outside the comment directly above a symbol;

in such a file, a SpecTag that shares its line with anything other than the comment's delimiters;

in a file bound by SpecTags at its start, a SpecTag on a line after its start;

an entry in the bindings file (§s-trwczfskj5zmuft) for a file that is not part of the system's code other than tests, or whose format allows comments;

a SpecTag whose sid names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule (§s-5z5gnu7pahr82xp);

code that carries `@spec none` together with a SpecTag that names a rule.

The refusal names the file, and the symbol and the line where there are any.

`sheriff binding` makes this check whether the specification is approved or a draft. For code that the commit leaves unchanged (§s-2x58az67bm6cxq2) and that no SpecTag binds, the check of code and tests outside the commit applies instead (§s-3xx2eukc8gtd2tx).

### Reason

A SpecTag that cannot be attached to one symbol or one file, or that names a node that no code can implement, binds nothing. The code under it is then as unbound as code with no SpecTag.

### Examples

```json
[
  {
    "en": "A function carries `/** @spec s-… */`, whose sid is that of the section that holds the rules that the function implements. `sheriff binding` refuses the SpecTag, since a section requires nothing that code could implement. The most likely mistake is to accept the SpecTag because its node exists, which binds the function to no rule.",
    "ru": "У функции есть `/** @spec s-… */`, sid которого — sid раздела, где лежат правила, которые реализует функция. `sheriff binding` отвергает этот SpecTag, потому что раздел не требует ничего, что мог бы реализовать код. Самая вероятная ошибка — принять SpecTag, потому что его узел существует: тогда функция не привязана ни к одному правилу."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-k6dzuajejrw4cej"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-33fw3ga4ctd94dq"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
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
    "to": "s-w6gybeqn2ttydqx"
  },
  {
    "type": "cites",
    "to": "s-2x58az67bm6cxq2"
  },
  {
    "type": "cites",
    "to": "s-3xx2eukc8gtd2tx"
  }
]
```

### The current node

Title: SpecTags on the system's code

`sheriff binding` reads the SpecTag of every symbol of the system's code. A SpecTag binds a symbol to the node the symbol implements. The system's code is the code that implements the specification, its tests included.

- A test carries its SpecTag in its name or in a mark on it (§s-zrsc6asgmhv8tnc), so the symbols of the tests are not read.
- The repository's configuration, its own tools and their tests are not the system's code (§s-hheus6f395ynqvc), and are not read.
- An inner symbol is covered by the SpecTag of the symbol it stands in.
- The sid of a SpecTag is looked up among the nodes. That of a SpecTag on a changed symbol is looked up among the approved ones. A symbol changes where a line the commit changes counts for it (§s-2x58az67bm6cxq2).
- While the commit leaves the specification a draft (§s-j9r8z4xdrfkfs47), a symbol carrying no SpecTag that the commit does not change is reported by the symbol, not refused (§s-kkbqcb9xrpaepwn).

Reason: (none)
