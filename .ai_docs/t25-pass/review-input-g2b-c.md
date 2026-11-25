# Group 1 drafts for review (generated 2026-11-24T01:49:50.858Z)

## The settings of each runner | key new:tools-10-settings | sid s-tnz9zgqx8c629a7 | tools 10.7 (new)

### Text

`sheriff review` reads the settings of each runner (§s-xr5xxa9cxf2mq5u) from the git configuration of the user who commits:

`specsheriff.review.claudeModel`, `specsheriff.review.claudeFallbackModel` and `specsheriff.review.claudeEffort`, for the runner `claude` (§s-3wh8uhgn9jr2k74);

`specsheriff.review.codexModel` and `specsheriff.review.codexEffort`, for the runner `codex` (§s-u2n5hwwqkb6zk4z).

`sheriff review` takes the model and the reasoning effort only from these settings and their defaults. An empty `specsheriff.review.codexModel` means the model that Codex chooses for the signed-in account.

A setting that the configuration holds, empty or not, counts as confirmed. The agent's hooks (§s-477gtdrkw34dzxw) and the skills of each SpecSheriff plugin ask only for a setting that the configuration lacks. They write a setting only with the value that the user whose configuration it is gives in answer. Where the user answers with the default, they write it like any other value. The nodes on the session start (§s-477gtdrkw34dzxw) and on the skill `spec-init` (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) say when each setting is asked for.

The defaults are:

for the runner `claude`, the model `opus` at the reasoning effort `high`, with `sonnet` as the fallback model;

for the runner `codex`, the model that Codex chooses, at the reasoning effort `high`.

Where the configuration lacks a setting of the runner in use, `sheriff review` takes that setting's default. In every review (§s-m4h279nbaqkpa3t) that runs with a default setting, `sheriff review` names each setting whose default it took, and says how the user confirms that setting.

### Reason

A run of the reviewer (§s-m4h279nbaqkpa3t) is paid for by the user who commits, from their own account. So it runs with the models and the reasoning efforts that this user has confirmed on their machine. Until the user confirms them, each review tells the user which settings it ran with.

### Examples

```json
[
  {
    "en": "A user confirms `specsheriff.review.claudeModel` once with `git config --global`. From then on, every review that the runner `claude` makes on that machine runs with that model, including after the plugin is updated, or removed and installed again. The most likely mistake is to keep the model in `sheriff.config.json`, which every clone shares, so that everyone who commits pays for one person's choice.",
    "ru": "Пользователь один раз подтверждает `specsheriff.review.claudeModel` командой `git config --global`. С тех пор каждое ревью, которое runner `claude` выполняет на этой машине, идёт на этой модели, в том числе после обновления плагина или после его удаления и повторной установки. Самая вероятная ошибка — хранить модель в `sheriff.config.json`, общем для всех клонов: тогда за выбор одного человека платит каждый, кто делает коммит."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  },
  {
    "type": "cites",
    "to": "s-3wh8uhgn9jr2k74"
  },
  {
    "type": "cites",
    "to": "s-u2n5hwwqkb6zk4z"
  },
  {
    "type": "cites",
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-zh2vcr3xjumppg5"
  },
  {
    "type": "cites",
    "to": "s-2pdy9gw2jrjvfb4"
  }
]
```

### The current node

(none: this node is new)

## The form of a SpecTag | key s-5z5gnu7pahr82xp | sid s-5z5gnu7pahr82xp | tools 8.1

### Text

A SpecTag (§s-8xw4mgvpexyvw5q) is written in one of these forms:

`@spec <sid>`, where `<sid>` is the sid of a rule that the code carrying the SpecTag implements, or that the test carrying it is written from (§s-sfjka4zc4rhfu67);

`@spec none`, followed by a space and a statement of what the technology that the system is built with requires of the code that carries the SpecTag (§s-2jcmb9xe9d64t2t).

The rule that a SpecTag `@spec <sid>` names is a node of one of these kinds, including one in a cell of a `TableRule`:

`TextRule`;

`TableRule` (§s-5fewsp22mmdz7y6);

`RecordType` (§s-ktfstpv8rurznrp);

a project's own kind whose nodes require an implementation in code (§s-vsh384ybt4w25a2).

Code that implements several rules carries a SpecTag for each of them. Code that implements no rule carries `@spec none` as its only SpecTag. A test carries a SpecTag only in the form `@spec <sid>` (§s-nrjxfvpkq3m8hzm).

### Reason

Fixed forms, each opening with `@spec`, let the SpecSheriff tools find every SpecTag by its text, in a file in any language. What follows `@spec none` says why the code needs no rule, so that whoever reads the code can tell whether it is technical code (§s-2jcmb9xe9d64t2t).

### Examples

```json
[
  {
    "en": "A function that a web framework calls to register routes, and that holds none of the system's logic, carries `@spec none the web framework requires a function that registers routes`. The most likely mistake is `@spec none helper`, which does not say what the technology requires of the code.",
    "ru": "У функции, которую веб-фреймворк вызывает, чтобы зарегистрировать маршруты, и в которой нет логики системы, есть SpecTag `@spec none the web framework requires a function that registers routes`. Самая вероятная ошибка — `@spec none helper`: он не говорит, что требует от кода технология."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "implements",
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-sfjka4zc4rhfu67"
  },
  {
    "type": "cites",
    "to": "s-2jcmb9xe9d64t2t"
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
    "to": "s-nrjxfvpkq3m8hzm"
  }
]
```

### The current node

Title: The SpecTag, and how a symbol carries it

A SpecTag is the text `@spec <sid>`, or `@spec none` followed by its reason. The form `@spec none` stands on a symbol only.

A symbol carries its SpecTag as a line of the comment directly above it, above its decorators where it has any. That comment is:

- in TypeScript and JavaScript, the symbol's doc comment;
- in Python, a comment line.

A symbol implementing several rules carries several SpecTags. A test carries its SpecTag in its name or in a mark on it (§s-zrsc6asgmhv8tnc).

A symbol that implements no rule says so with `@spec none`, followed by the reason it carries none. Where such a symbol stands first in a run of re-exports, with no blank line between them, it says so for the whole run.

On a symbol, only the delimiters of the comment may share a SpecTag's line, so that a scan finds a SpecTag's text in any language.

Which symbol a SpecTag stands on is found by parsing the file with tree-sitter and the grammar of the file's language. The parser is used alone, with no program and no type checker.

A description of each language names what counts in it as a declaration and as a test. TypeScript, JavaScript and Python are described.

Reason: A comment above a symbol is where an editor shows a SpecTag and where a reader of the symbol is already looking.

A scan finds a SpecTag but cannot see what it is attached to, so a SpecTag standing over nothing would pass it. The parser sees the symbol under the comment. Used alone, the parser answers the same for the same file every time. Alone, it is also cheap enough to run at every commit.

One parser with a grammar per language makes a further language a description rather than new code.

## How a symbol carries its SpecTags | key new:tools-8-symbol | sid s-33fw3ga4ctd94dq | tools 8.2 (new)

### Text

In a file whose language is described in the folder `languages/` of the SpecSheriff tools, the SpecTags (§s-5z5gnu7pahr82xp) of a symbol (§s-kgbzk2ph9e6jfb4) are lines of the comment directly above the symbol, above its decorators where it has any. That comment is:

in TypeScript and JavaScript, the symbol's doc comment;

in Python, one or more comment lines.

Only the delimiters of the comment may share a SpecTag's line.

Where the first of a run of re-exports, with no blank line between them, carries `@spec none`, that SpecTag also binds each later re-export of the run that carries no SpecTag of its own.

The SpecSheriff tools find the symbol that a SpecTag is above by parsing the file with tree-sitter and the grammar of the file's language. They parse each file on its own, with the parser alone and no type checker.

The description of each language names what counts in that language as a symbol and as a test. TypeScript, JavaScript and Python are described.

### Reason

A SpecTag sits where a reader of the symbol's code already looks. There, a parser, unlike a scan of the text, tells which symbol the SpecTag binds, the same way for the same file every time.

### Examples

```json
[
  {
    "en": "In TypeScript, `/** @spec s-… */` directly above `export function close()` binds the function and every symbol nested in it. The most likely mistake is a blank line between the comment and the function: the SpecTag is then directly above no symbol and binds nothing.",
    "ru": "В TypeScript `/** @spec s-… */` непосредственно над `export function close()` привязывает функцию и каждый вложенный в неё символ. Самая вероятная ошибка — пустая строка между комментарием и функцией: тогда SpecTag не стоит непосредственно ни над каким символом и ничего не привязывает."
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

A file of the system's code (§s-hheus6f395ynqvc) other than tests carries its SpecTags (§s-5z5gnu7pahr82xp) at its start (§s-kgbzk2ph9e6jfb4) where all of the following hold:

the SpecSheriff tools cannot identify the file's symbols, because no description covers its language (§s-33fw3ga4ctd94dq);

the file's format allows comments (§s-trwczfskj5zmuft).

The SpecTags at the start of a file are on the lines that come before the first of its lines that holds a letter or a digit outside a SpecTag. The file's first line is not counted where it opens with `#!` or `<?`, so that a shebang or a declaration that the format requires to come first, such as an XML declaration, may come before them.

In a file bound by SpecTags at its start, the text that follows `@spec none` runs to the end of its line, excluding any characters at its end that are neither letters nor digits.

### Reason

The lines before a file's content can be identified in any language without parsing. So the SpecTags of a file that the SpecSheriff tools cannot parse are kept there.

### Examples

```json
[
  {
    "en": "A stylesheet starts with `/* @spec s-… */`, followed by the stylesheet's content. An XML file starts with its declaration, `<?xml version=\"1.0\"?>`, followed by `<!-- @spec s-… -->`. The most likely mistake is to put the SpecTag after a licence comment at the start of the file. The words of the licence then come first, and the SpecTag binds nothing.",
    "ru": "Таблица стилей начинается с `/* @spec s-… */`, за которым идёт её содержимое. Файл XML начинается со своего объявления `<?xml version=\"1.0\"?>`, за которым идёт `<!-- @spec s-… -->`. Самая вероятная ошибка — поставить SpecTag после комментария с лицензией в начале файла. Тогда первыми идут слова лицензии, и SpecTag ничего не привязывает."
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

`sheriff binding` accepts an entry in the bindings file (§s-kgbzk2ph9e6jfb4), `sheriff.bindings.json` (§s-zefk589ykh37b8u), only where the entry's path names a file that the commit leaves in the repository (§s-ffkv5qnqvet7bga). It refuses any other entry, naming its path.

The bindings file holds a JSON object. Each key of the object is the path of a file relative to the root of the repository, with forward slashes. The value of each key is the list of the SpecTags (§s-5z5gnu7pahr82xp) of that file, each a string. The SpecSheriff tools refuse a `sheriff.bindings.json` that is not valid JSON or does not hold an object of this form.

The SpecSheriff tools treat a file's format as allowing no comments where the file's name ends in `.json`, or where the file matches the glob patterns that the project's own guidelines (§s-u7tw6m8npxmv5tu) list for such formats.

### Reason

An entry keeps the path it names when its file is moved or renamed. So only a check of every entry against the repository shows that a file has lost its SpecTags.

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

in TypeScript and JavaScript, by starting its name with the SpecTag, as in `test("@spec s-… what it checks", …)`;

in Python, by a mark on the test, `@pytest.mark.spec("@spec s-…")`;

in any other language, as the description of that language says (§s-33fw3ga4ctd94dq).

A test declares one SpecTag.

The SpecSheriff tools' plugin for pytest, `pytest-specsheriff`, registers the mark. It puts the test's SpecTag at the start of the name that a run reports for the test.

Where the mark holds anything other than one SpecTag, the plugin stops the run with an error that names the test. Where the mark holds a bare sid (§s-gb8s9657a65hqmv), the error also names `sheriff reindex`, which writes the SpecTag.

### Reason

A test run reports each test by its name, so the SpecTag is placed where that report shows it.

### Examples

```json
[
  {
    "en": "In TypeScript, `test(\"@spec s-… refuses an empty name\", …)` declares the SpecTag of the rule it is written from. The most likely mistake is to put the SpecTag only in the name of the `describe` block that holds the tests. That block is not a test, so no test in it declares a SpecTag.",
    "ru": "В TypeScript `test(\"@spec s-… refuses an empty name\", …)` объявляет SpecTag правила, из которого написан тест. Самая вероятная ошибка — поставить SpecTag только в название блока `describe`, в котором лежат тесты. Этот блок — не тест, поэтому ни один тест в нём не объявляет SpecTag."
  }
]
```

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
