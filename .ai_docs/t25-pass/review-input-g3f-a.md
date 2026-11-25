# Group 3 drafts of round f for review (generated 2026-11-24T14:50:08.796Z)

## How two versions of code are compared | key new:tools-7-2-changed-line | sid s-u6mj5yv8ngnz79v | tools 7.2.1a (new, after "What a commit adds, changes and removes in the code and the tests")

### Text

The SpecSheriff tools compare two versions of a symbol (§s-kgbzk2ph9e6jfb4), a test (§s-zrsc6asgmhv8tnc) or a file bound as a whole by their syntax trees (§s-9j2mmnuuwmx5ksn). They parse each version with the tree-sitter grammar of its file's language. Two versions differ where their trees differ once the following are left out of both:

each comment, other than a first line of the file that opens with `#!`;

in a test, the test's name, other than its SpecTag (§s-8xw4mgvpexyvw5q).

A syntax tree holds the kind of each of its nodes and the text of each token, such as an identifier or a literal. So renaming an identifier changes the tree, and so does any edit inside a string literal. Whitespace changes the tree only where the grammar makes it part of the syntax, such as the indentation of a line in Python or YAML.

The SpecSheriff tools parse the following files with a grammar:

a file whose language a description covers (§s-33fw3ga4ctd94dq), with the grammar of its language;

a file bound as a whole (§s-kgbzk2ph9e6jfb4) whose name ends in `.yaml`, `.yml`, `.css`, `.sql`, `.sh` or `.json`, with the grammar of YAML, CSS, SQL, Bash or JSON.

In any other file, two versions differ where their text differs.

### Reason

A change to the code makes the SpecSheriff tools check that code against its rules again (§s-9j2mmnuuwmx5ksn). A syntax tree keeps whatever can alter what the code does and drops the whitespace that the language gives no meaning. So comparing trees counts exactly the edits that can matter. Where the SpecSheriff tools have no grammar, comparing the text counts every edit, so that no change to the code passes unchecked.

### Examples

```json
[
  {
    "en": "A commit re-wraps the call `send(to, subject, body);` onto three lines and adds a comment above it. Both versions give the same syntax tree, so the commit changes no code. The most likely mistake is to compare the lines, which counts the re-wrapped call as a change.",
    "ru": "Коммит переносит вызов `send(to, subject, body);` на три строки и добавляет над ним комментарий. Обе версии дают одно и то же синтаксическое дерево, поэтому коммит код не меняет. Самая вероятная ошибка — сравнивать строки: тогда перенесённый вызов засчитывается как изменение."
  },
  {
    "en": "A commit renames the test `@spec s-… refuses an empty name` to `@spec s-… refuses a blank name` and changes nothing else in it. With the test's name left out, both versions give the same tree, so the commit leaves the test unchanged. The most likely mistake is to keep the test's name in the tree, which counts the renamed test as changed.",
    "ru": "Коммит переименовывает тест `@spec s-… refuses an empty name` в `@spec s-… refuses a blank name` и больше ничего в нём не меняет. Без названия теста обе версии дают одно и то же дерево, поэтому коммит оставляет тест неизменным. Самая вероятная ошибка — оставлять название теста в дереве: тогда переименованный тест засчитывается как изменённый."
  },
  {
    "en": "A commit indents the key `retries` by two more spaces in a YAML file bound as a whole, which nests the key in the key above it. The grammar of YAML makes indentation part of the syntax, so the two versions give different trees, and the commit changes the file. The most likely mistake is to compare only the tokens, which lets the nested key pass as unchanged.",
    "ru": "Коммит увеличивает на два пробела отступ ключа `retries` в файле YAML, привязанном целиком, и тем вкладывает этот ключ в ключ выше. Грамматика YAML делает отступ частью синтаксиса, поэтому две версии дают разные деревья, и коммит меняет файл. Самая вероятная ошибка — сравнивать только токены: тогда вложенный ключ проходит как неизменённый."
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
    "to": "s-kgbzk2ph9e6jfb4"
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
    "to": "s-33fw3ga4ctd94dq"
  }
]
```

### The current node

(none: this node is new)

## What a commit adds, changes and removes in the code and the tests | key s-2x58az67bm6cxq2 | sid s-2x58az67bm6cxq2 | tools 7.2.1

### Text

The SpecSheriff tools find what a commit adds, changes and removes in the system's code (§s-hheus6f395ynqvc), including its tests. They compare each file as the commit leaves it with the same file in the commit's parent. For a merge commit, the parent is its first parent. The first commit of a repository is compared with an empty repository. A file that the commit moves or renames is compared with the file at its earlier path.

A commit changes only the symbols (§s-kgbzk2ph9e6jfb4), files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) and tests (§s-zrsc6asgmhv8tnc) that both the commit's parent and the commit hold. It adds each of them that only the commit holds. It removes each of them that only the commit's parent holds.

A commit changes a symbol, a test or a file bound as a whole where its two versions give different syntax trees (§s-u6mj5yv8ngnz79v). The tree of a symbol or a test spans it from its first line to its last, including its decorators. So a change in a nested symbol also changes each symbol that encloses it.

A symbol or a test of the commit's parent is the same as the one of the same name in the file as the commit leaves it. A test that the commit renames, keeping its SpecTag and changing nothing else in it, also stays the same test (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).

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
    "en": "A commit deletes one line inside the function `close` and changes nothing else in it. The version of `close` in the commit's parent holds that line, so the two versions give different syntax trees, and the commit changes `close`. The most likely mistake is to look only at the lines that the commit adds, which misses a change made by deleting lines.",
    "ru": "Коммит удаляет одну строку внутри функции `close` и больше ничего в ней не меняет. Версия `close` в родительском коммите содержит эту строку, поэтому две версии дают разные синтаксические деревья, и коммит меняет `close`. Самая вероятная ошибка — смотреть только на строки, которые коммит добавляет: тогда изменение, сделанное удалением строк, пропускается."
  },
  {
    "en": "A commit rewords a comment in a stylesheet bound by SpecTags at its start and changes nothing else in it. The SpecSheriff tools parse both versions with the grammar of CSS and leave the comment out of both trees. The trees are the same, so the commit does not change the stylesheet's code. The most likely mistake is to count any change to the text of a file bound as a whole as a change to its code.",
    "ru": "Коммит меняет формулировку комментария в таблице стилей, привязанной SpecTag в начале файла, и больше ничего в ней не меняет. Инструменты SpecSheriff разбирают обе версии грамматикой CSS и исключают комментарий из обоих деревьев. Деревья одинаковы, поэтому коммит не меняет кода таблицы стилей. Самая вероятная ошибка — считать любое изменение текста файла, привязанного целиком, изменением его кода."
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

## A change to a SpecTag | key proposal:s-9j2mmnuuwmx5ksn | sid s-9j2mmnuuwmx5ksn | spec 9.4

### Text

A change to a SpecTag (§s-8xw4mgvpexyvw5q) is considered a change to the test or the code that the SpecTag binds.

As long as the SpecTag stays the same, none of the following changes the test or the code:

renaming a test;

adding, removing or rewording a comment;

changing whitespace that, in the language of its file, does not affect what the code does.

In a file whose comments and whitespace the checks (§s-jau82aq9juv9zzh) cannot tell apart from its code, every edit changes the code.

### Reason

Tests and code that change are checked again against the rules their SpecTags name. This rule draws the line between an edit to a test or code that can affect that check and one that cannot.

### Examples

```json
[
  {
    "en": "A commit re-indents a block of TypeScript code, adds a comment above it and changes nothing else, so it changes no code. By contrast, a commit that indents a key of a YAML file further, which nests the key in the key above it, changes the code.",
    "ru": "Коммит меняет отступы блока кода TypeScript, добавляет над ним комментарий и больше ничего не меняет, поэтому код он не меняет. Напротив, коммит, который увеличивает отступ ключа в файле YAML и тем вкладывает этот ключ в ключ выше, код меняет.",
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

## How code is bound to its rules | key proposal:s-kgbzk2ph9e6jfb4 | sid s-kgbzk2ph9e6jfb4 | spec 1.5.2

### Text

The system's code (§s-hheus6f395ynqvc) outside its tests is bound to the rules it implements by SpecTags (§s-8xw4mgvpexyvw5q). Code that implements no rule has a SpecTag that says so.

A symbol is a named unit of code, such as a function, a class or a member of one, a type, a constant or a component. Whoever writes code binds it to its rules in one of the following ways:

by a SpecTag directly before each symbol, if the checks (§s-jau82aq9juv9zzh) can identify the file's symbols;

by SpecTags in a comment placed as near the start of the file as its format allows, if the checks cannot identify the file's symbols;

by an entry in the bindings file at the root of the repository, for a file whose format allows no comments.

A SpecTag before a symbol binds that symbol and every symbol nested in it. SpecTags at the start of a file, and an entry in the bindings file, bind the whole file. A change anywhere in a file bound as a whole is a change to the code its SpecTags bind. The only exception is an edit that changes no code (§s-9j2mmnuuwmx5ksn): an edit to a comment, or to whitespace that does not affect what the code does.

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
    "to": "s-qzthyh7yqvfhsa2"
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
