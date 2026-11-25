# Group 3 drafts of round e for review (generated 2026-11-24T14:24:39.042Z)

## A change to a SpecTag | key proposal:s-9j2mmnuuwmx5ksn | sid s-9j2mmnuuwmx5ksn | spec 9.4

### Text

A change to a SpecTag (§s-8xw4mgvpexyvw5q) is considered a change to the test or the code that the SpecTag binds.

As long as the SpecTag stays the same, none of the following changes the test or the code:

renaming a test;

adding, removing or rewording a comment;

changing whitespace that, in the language of its file, does not affect what the code does.

In a file whose comments and whitespace the checks (§s-jau82aq9juv9zzh) cannot tell from its code, every edit changes the code.

### Reason

Tests and code that change are checked again against the rules their SpecTags name. This rule draws the line between an edit to a test or code that can affect that check and one that cannot.

### Examples

```json
[
  {
    "en": "A commit re-indents a block of TypeScript code, adds a comment above it and changes nothing else, so it changes no code. But not: a commit that indents a key of a YAML file further, which moves the key under the key above it, leaves the code unchanged.",
    "ru": "Коммит меняет отступы блока кода TypeScript, добавляет над ним комментарий и больше ничего не меняет, поэтому код он не меняет. Но не так: коммит, который увеличивает отступ ключа в файле YAML и тем переносит этот ключ под ключ выше, код не меняет.",
    "change": "Новый пример: граница, которую провело ваше решение от 2026-11-24."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-jau82aq9juv9zzh"
  }
]
```

### The current node

Title: A change to a SpecTag

A change to a SpecTag is considered a change to the test or the code that the SpecTag binds. Renaming a test or rewording the comments in the code and the tests changes neither the test nor the code, as long as the SpecTag stays the same.

Reason: Tests and code that change are checked again against the rules their SpecTags name. This rule draws the line between an edit to a test or code that can affect that check and one that cannot.

## What a commit adds, changes and removes in the code and the tests | key s-2x58az67bm6cxq2 | sid s-2x58az67bm6cxq2 | tools 7.2.1

### Text

The SpecSheriff tools find what a commit adds, changes and removes in the system's code (§s-hheus6f395ynqvc), including its tests. They compare each file as the commit leaves it with the same file in the commit's parent. For a merge commit, the parent is its first parent. The first commit of a repository is compared with an empty repository. A file that the commit moves or renames is compared with the file at its earlier path.

A commit changes only the symbols (§s-kgbzk2ph9e6jfb4), files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) and tests (§s-zrsc6asgmhv8tnc) that both the commit's parent and the commit hold. It adds each of them that only the commit holds. It removes each of them that only the commit's parent holds.

A commit changes a symbol or a test where a line of that symbol or test changes the code (§s-u6mj5yv8ngnz79v). The lines of a symbol or a test run from its first line to its last, including its decorators. A line that changes the code changes every symbol and every test that holds it, so a change in a nested symbol also changes each symbol that encloses it.

A line that the commit removes is read in the commit's parent. A line that it adds is read in the file as the commit leaves it. A symbol or a test of the parent is the same as the one of the same name in the file as the commit leaves it. A test that the commit renames, keeping its SpecTag and changing nothing else in it, also stays the same test (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).

A commit changes a file bound as a whole where a line of that file changes the code (§s-u6mj5yv8ngnz79v).

A commit also changes each symbol, file bound as a whole and test whose SpecTags it changes (§s-9j2mmnuuwmx5ksn). A commit changes the SpecTags of a symbol, a file or a test where a SpecTag binds it either in the commit's parent or after the commit, but not in both. Two SpecTags are the same only where their texts are the same, including the text after `@spec none` (§s-5z5gnu7pahr82xp).

A commit adds an entry of the bindings file (§s-trwczfskj5zmuft) where the commit's parent holds no entry for the same file. It changes an entry whose SpecTags differ from those of the same file's entry in the parent.

A commit adds or changes each SpecTag of the following kinds:

a SpecTag on a line that the commit adds;

a SpecTag in an entry that the commit adds or changes.

The exception is a SpecTag that binds the same symbol, file or test, with the same text, as in the commit's parent.

A commit leaves unchanged each symbol, file bound as a whole and test that it leaves in the repository and neither adds nor changes.

### Reason

The checks of a commit judge code and tests according to whether the commit adds, changes, removes or leaves them unchanged. A single definition of each of these lets every check judge the same code and tests in the same way.

### Examples

```json
[
  {
    "en": "A commit deletes one line inside the function `close` and changes nothing else in it. The deleted line is read in the commit's parent, where it is in `close`, so the commit changes `close`. The most likely mistake is to look only at the lines that the commit adds, which misses a change made by deleting lines.",
    "ru": "Коммит удаляет одну строку внутри функции `close` и больше ничего в ней не меняет. Удалённая строка читается в родительском коммите, где она находится в `close`, поэтому коммит меняет `close`. Самая вероятная ошибка — смотреть только на строки, которые коммит добавляет: тогда изменение, сделанное удалением строк, пропускается."
  },
  {
    "en": "A commit rewords a comment in a stylesheet bound by SpecTags at its start and changes nothing else in it. The SpecSheriff tools read the stylesheet's lines with the grammar of CSS and leave out the comment, so the commit leaves the stylesheet unchanged. The most likely mistake is to count any change to the text of a file bound as a whole, which makes a reworded comment a change to the code.",
    "ru": "Коммит меняет формулировку комментария в таблице стилей, привязанной SpecTag в начале файла, и больше ничего в ней не меняет. Инструменты SpecSheriff читают строки таблицы стилей по грамматике CSS и опускают комментарий, поэтому коммит оставляет таблицу стилей неизменной. Самая вероятная ошибка — засчитывать любое изменение текста файла, привязанного целиком: тогда переформулированный комментарий становится изменением кода."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-9j2mmnuuwmx5ksn"
  },
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
    "to": "s-zrsc6asgmhv8tnc"
  },
  {
    "type": "cites",
    "to": "s-u6mj5yv8ngnz79v"
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
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  }
]
```

### The current node

Title: The symbols a commit changes

`sheriff binding` finds which symbols of the system's code outside its tests the commit changes.

- A changed line counts for the symbol it stands in. A change anywhere in a symbol is a change of the whole symbol.
- A line holding a SpecTag, before the commit or after it, counts for the symbol the SpecTag marks, even where it stands outside the symbol's body.

A symbol does not count as changed where each of its changed lines:

- is not a line holding a SpecTag;
- differs from the line it replaces only in a comment, in the sid a citation names, or in an identifier the commit renames throughout.

Reason: (none)

## A line that changes the code | key new:tools-7-2-changed-line | sid s-u6mj5yv8ngnz79v | tools 7.2.1a (new, after "What a commit adds, changes and removes in the code and the tests")

### Text

The SpecSheriff tools decide which of the lines that a commit removes or adds change the code (§s-9j2mmnuuwmx5ksn). They read each line as the tokens of the file's language in each of the following files:

a file whose language a description covers (§s-33fw3ga4ctd94dq);

a file bound as a whole (§s-kgbzk2ph9e6jfb4) whose name ends in `.yaml`, `.yml`, `.css`, `.sql`, `.sh` or `.json`.

They parse such a file bound as a whole with the tree-sitter grammar of its format: YAML, CSS, SQL, Bash or JSON. They read the tokens of a line as follows:

they leave out comments;

they read each string literal, or the part of one on the line, as one token;

in a test (§s-zrsc6asgmhv8tnc), they leave out the test's name, other than its SpecTag (§s-8xw4mgvpexyvw5q).

The SpecSheriff tools compare each run of consecutive lines that the commit removes with the run of lines that it adds in its place. They take the runs from git's comparison of the two versions of the file, made with the Myers algorithm, git's default, whatever git's settings on the machine. They leave out of both runs each line that holds no token, such as a blank line or a line that holds only a comment.

Where the two runs hold the same number of lines, the SpecSheriff tools pair the lines in order. Both lines of a pair change the code where either of the following holds:

the tokens of the two lines differ;

the whitespace of the two lines differs where the file's language gives whitespace a meaning, such as the indentation of a line in Python or YAML.

Where the two runs hold different numbers of lines, every line of both runs changes the code.

In any other file, every line that the commit removes or adds changes the code.

### Reason

A change to the code makes the SpecSheriff tools check that code against its rules again (§s-9j2mmnuuwmx5ksn). Reading each line as the tokens of the language of its file leaves out what cannot alter what the code does, such as comments and whitespace to which the language gives no meaning.

### Examples

```json
[
  {
    "en": "A commit changes the line `return total; // in cents` to `return total;  // the total in cents`. The two lines hold the same tokens, so neither of them changes the code. The most likely mistake is to compare the lines as text, which counts a reworded comment as a change to the code.",
    "ru": "Коммит меняет строку `return total; // in cents` на `return total;  // the total in cents`. В обеих строках одни и те же токены, поэтому ни одна из них не меняет код. Самая вероятная ошибка — сравнивать строки как текст: тогда переформулированный комментарий засчитывается как изменение кода."
  },
  {
    "en": "A commit renames the test `@spec s-… refuses an empty name` to `@spec s-… refuses a blank name` and changes nothing else in it. Its lines hold the same tokens, so the commit leaves the test unchanged. The most likely mistake is to read the test's name as a token, which counts the renamed test as changed.",
    "ru": "Коммит переименовывает тест `@spec s-… refuses an empty name` в `@spec s-… refuses a blank name` и больше ничего в нём не меняет. В его строках те же токены, поэтому коммит оставляет тест неизменным. Самая вероятная ошибка — читать название теста как токен: тогда переименованный тест засчитывается как изменённый."
  },
  {
    "en": "A commit indents the key `retries` in a YAML file bound as a whole by two more spaces, which moves the key under the key above it. The line holds the same tokens as before, but its indentation, to which YAML gives a meaning, differs, so the line changes the code. The most likely mistake is to leave out all whitespace, as in TypeScript, which lets the moved key pass as unchanged.",
    "ru": "Коммит увеличивает на два пробела отступ ключа `retries` в файле YAML, привязанном целиком, и тем переносит этот ключ под ключ выше. Токены строки прежние, но её отступ, которому YAML придаёт значение, другой, поэтому строка меняет код. Самая вероятная ошибка — опускать все пробельные символы, как в TypeScript: тогда перенесённый ключ проходит как неизменённый."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-9j2mmnuuwmx5ksn"
  },
  {
    "type": "cites",
    "to": "s-33fw3ga4ctd94dq"
  },
  {
    "type": "cites",
    "to": "s-zrsc6asgmhv8tnc"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-kgbzk2ph9e6jfb4"
  }
]
```

### The current node

(none: this node is new)

## How code is bound to its rules | key proposal:s-kgbzk2ph9e6jfb4 | sid s-kgbzk2ph9e6jfb4 | spec 1.5.2

### Text

The system's code (§s-hheus6f395ynqvc) outside its tests is bound to the rules it implements by SpecTags (§s-8xw4mgvpexyvw5q). Code that implements no rule has a SpecTag that says so.

A symbol is a named unit of code, such as a function, a class or a member of one, a type, a constant or a component. Whoever writes code binds it to its rules in one of the following ways:

by a SpecTag directly before each symbol, if the checks (§s-jau82aq9juv9zzh) can identify the file's symbols;

by SpecTags in a comment placed as near the start of the file as its format allows, if the checks cannot identify the file's symbols;

by an entry in the bindings file at the root of the repository, for a file whose format allows no comments.

A SpecTag before a symbol binds that symbol and every symbol nested in it. SpecTags at the start of a file, and an entry in the bindings file, bind the whole file. A change anywhere in a file bound as a whole is a change to the code its SpecTags bind. The only exception is an edit to a comment or to whitespace that changes no code (§s-9j2mmnuuwmx5ksn).

The formats that allow no comments are JSON and those that a project's own guidelines (§s-u7tw6m8npxmv5tu) name as allowing none.

Each entry in the bindings file names an existing file and holds that file's SpecTags.

### Reason

Binding each file of the system's code as precisely as its format allows lets the checks immediately find code that has lost its link to the specification.

### Examples

```json
[
  {
    "en": "A stylesheet whose symbols the checks cannot identify has its SpecTag in a comment at its start.",
    "ru": "У файла стилей, символы которого проверки не могут определить, SpecTag стоит в комментарии в начале файла."
  },
  {
    "en": "A JSON file that holds the texts a user interface shows has an entry in the bindings file. The entry names the JSON file and holds its SpecTags.",
    "ru": "У файла JSON с текстами, которые показывает пользовательский интерфейс, есть запись в файле привязок. Запись называет этот файл JSON и содержит его SpecTag."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-jau82aq9juv9zzh"
  },
  {
    "type": "cites",
    "to": "s-u7tw6m8npxmv5tu"
  },
  {
    "type": "cites",
    "to": "s-9j2mmnuuwmx5ksn"
  }
]
```

### The current node

Title: How code is bound to its rules

The system's code (§s-hheus6f395ynqvc) outside its tests is bound to the rules it implements by SpecTags (§s-8xw4mgvpexyvw5q). Code that implements no rule has a SpecTag that says so.

A symbol is a named unit of code, such as a function, a class or a member of one, a type, a constant or a component. Whoever writes code binds it to its rules in one of the following ways:
- by a SpecTag directly before each symbol, if the checks (§s-jau82aq9juv9zzh) can identify the file's symbols;
- by SpecTags in a comment placed as near the start of the file as its format allows, if the checks cannot identify the file's symbols;
- by an entry in the bindings file at the root of the repository, for a file whose format allows no comments.

A SpecTag before a symbol binds that symbol and every symbol nested in it. SpecTags at the start of a file, and an entry in the bindings file, bind the whole file. A change anywhere in a file bound as a whole is a change to the code its SpecTags bind.

The formats that allow no comments are JSON and those that a project's own guidelines (§s-u7tw6m8npxmv5tu) name as allowing none.

Each entry in the bindings file names an existing file and holds that file's SpecTags.

Reason: Binding each file of the system's code as precisely as its format allows lets the checks immediately find code that has lost its link to the specification.
