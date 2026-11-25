# Group 3 drafts for the final review (generated 2026-11-24T12:40:26.252Z)

## Entries that only an owner of the specification records | key s-j9r8z4xdrfkfs47 | sid s-j9r8z4xdrfkfs47 | tools 7.2.3

### Text

For a setting that only an owner of the specification changes (§s-chsfpkgpmfk4fft), `sheriff binding` accepts a commit's change to the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) only where both of the following hold:

after the commit, the first entries for that setting are all those that the commit's parent holds for it, unchanged and in the same order;

each entry that follows them names an owner of the specification (§s-6sk8uet75dmq5qz).

`sheriff binding` refuses every other change to the entries for a setting that only an owner of the specification changes. The refusal names the setting, each entry concerned and the specification's owners.

`sheriff binding` reads the entries of the commit's parent in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv). For a merge commit, the parent is its first parent. `sheriff binding` takes the specification's owners from `project.json` (§s-zefk589ykh37b8u) as the commit leaves it.

`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-pa8t49pqpwscuq7, §s-y5w6xwvwh857azx, §s-dxzq5rd6eeteza4).

### Reason

Removing, editing or moving an entry already recorded, or recording an entry in the name of a person who is not an owner, could change a setting that only an owner of the specification changes without an act of an owner (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-9ttvcwpqkehm58g).

### Examples

```json
[
  {
    "en": "The latest entry for the specification's approval status approves the specification, and the entry before it returned the specification to draft. A person deletes the latest entry by hand, so that the specification would be a draft again. `sheriff binding` refuses the commit, since the first entries for that setting are no longer those of the commit's parent. The most likely mistake is to check only the added entries, which lets the commit return the specification to draft without an owner's entry.",
    "ru": "Последняя запись о статусе одобрения спецификации одобряет её, а запись перед ней возвращала спецификацию в черновик. Человек вручную удаляет последнюю запись, чтобы спецификация снова стала черновиком. `sheriff binding` отвергает коммит, потому что первыми записями для этой настройки больше не являются записи родительского коммита. Самая вероятная ошибка — проверять только добавленные записи: тогда коммит возвращает спецификацию в черновик без записи ответственного."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-pa8t49pqpwscuq7"
  },
  {
    "type": "implements",
    "to": "s-y5w6xwvwh857azx"
  },
  {
    "type": "implements",
    "to": "s-dxzq5rd6eeteza4"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-chsfpkgpmfk4fft"
  },
  {
    "type": "cites",
    "to": "s-6sk8uet75dmq5qz"
  },
  {
    "type": "cites",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "cites",
    "to": "s-q3pfzyaxvpr2zj2"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-gb8s9657a65hqmv"
  }
]
```

### The current node

Title: From a draft to an approved specification, and back

`sheriff binding` holds the specification's passage from a draft to approved and back (§s-qzthyh7yqvfhsa2). It reads the rule that approves the specification in `project.json`.

It takes the specification before a commit as the commit's first parent holds it, read as `sheriff reindex` would rewrite it (§s-f5rz6b7dhxejjts). Where the commit has no parent, it takes the specification before the commit as a draft.

While the commit leaves the specification a draft, `sheriff binding` reports each of these rather than refusing it, where the commit does not change it (§s-kkbqcb9xrpaepwn):

- a symbol of the system's code outside its tests that carries no SpecTag;
- a test that carries no SpecTag.

While the commit leaves the specification approved, both are refused.

A commit that puts the specification back to draft passes only where it adds to the approvals a withdrawal of that rule's approval, of whichever wording, by one of the specification's owners as the commit holds them.

Reason: (none)

## The chosen extensions and the installed plugin | key new:tools-7-1-extensions-delivered | sid s-mhsb6fjsq5xn6c9 | tools 7.1.2a (new, after "How the schema of the specification is composed")

### Text

A command of the SpecSheriff tools that reads the chosen extensions of the guidelines (§s-mbmnsnxenmavu3z, §s-9ttvcwpqkehm58g) runs only where the installed SpecSheriff plugin delivers each of them (§s-j5qmmdq4m26mdvw). Where the plugin lacks any of them, the command refuses to run. The refusal names each missing extension and the version of the SpecSheriff tools in the plugin. `sheriff reindex` then leaves every file unchanged.

The commands that read the chosen extensions include `sheriff validate`, `sheriff binding` and `sheriff reindex`, which, as they compose the schema of the specification, add to it the schema of each chosen extension that has one (§s-xzcw3hv4hmxz7h7). The commands that read the chosen extensions also include `sheriff guard`, which checks an agent's edit before it is made (§s-st6td4mua9uqt9z). The plugin delivers an extension where the extension's file is at the path given for each extension of the guidelines (§s-zefk589ykh37b8u).

Each command that reads the chosen extensions makes this check regardless of whether the specification is approved or a draft (§s-j5qmmdq4m26mdvw).

### Reason

Without an extension's file, the SpecSheriff tools can neither compose the schema that the extension adds nor run the checks of its table (§s-gpzs5fcxvp6jkrp). A command that ran without the file would accept on one machine what the same command refuses on a machine whose plugin delivers the extension.

### Examples

```json
[
  {
    "en": "A project chooses an extension that a new release of the SpecSheriff plugin delivers. A team member's machine still has an earlier release, which does not deliver it. On that machine, `sheriff validate` refuses to run, naming the extension and the earlier release's version, so the git hook refuses the commit. The most likely mistake is to compose the schema without the missing extension, which lets the command accept, on that machine, a node that the extension's checks would refuse.",
    "ru": "Проект выбирает расширение, которое поставляет новый выпуск плагина SpecSheriff. На машине одного из участников команды всё ещё стоит более ранний выпуск, который его не поставляет. На этой машине `sheriff validate` отказывается выполняться и называет расширение и версию более раннего выпуска, поэтому git hook отвергает коммит. Самая вероятная ошибка — составить схему без недостающего расширения: тогда команда на этой машине принимает узел, который отвергли бы проверки расширения."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-j5qmmdq4m26mdvw"
  },
  {
    "type": "cites",
    "to": "s-mbmnsnxenmavu3z"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-xzcw3hv4hmxz7h7"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-gpzs5fcxvp6jkrp"
  },
  {
    "type": "cites",
    "to": "s-st6td4mua9uqt9z"
  }
]
```

### The current node

(none: this node is new)

## What a commit adds, changes and removes in the code and the tests | key s-2x58az67bm6cxq2 | sid s-2x58az67bm6cxq2 | tools 7.2.1

### Text

The SpecSheriff tools find what a commit adds, changes and removes in the system's code (§s-hheus6f395ynqvc), including its tests. They compare each file as the commit leaves it with the same file in the commit's parent. For a merge commit, the parent is its first parent. The first commit of a repository is compared with an empty repository. A file that the commit moves or renames is compared with the file at its earlier path.

A commit changes only the symbols (§s-kgbzk2ph9e6jfb4), files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) and tests (§s-zrsc6asgmhv8tnc) that both the commit's parent and the commit hold. It adds each of them that only the commit holds. It removes each of them that only the commit's parent holds.

A commit changes a symbol or a test where a line of that symbol or test changes the code (§s-u6mj5yv8ngnz79v). The lines of a symbol or a test run from its first line to its last, including its decorators. A line that changes the code changes every symbol and every test that holds it, so a change in a nested symbol also changes each symbol that encloses it.

A line that the commit removes is read in the commit's parent. A line that it adds is read in the file as the commit leaves it. A symbol or a test of the parent is the same as the one of the same name in the file as the commit leaves it. A test that the commit renames outside its SpecTag, and changes in no other way, also stays the same test (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).

A commit changes a file bound as a whole where it changes any part of the file's text, including a comment or whitespace (§s-kgbzk2ph9e6jfb4).

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
    "en": "A commit rewords a comment in a stylesheet bound by SpecTags at its start. The commit changes the stylesheet, since any change to the text of a file bound as a whole counts. The most likely mistake is to leave the comment out, as the SpecSheriff tools do in a file whose language a description covers.",
    "ru": "Коммит меняет формулировку комментария в таблице стилей, привязанной SpecTag в начале файла. Коммит меняет таблицу стилей, потому что засчитывается любое изменение текста файла, привязанного целиком. Самая вероятная ошибка — не учитывать комментарий, как это делают инструменты SpecSheriff в файле на языке, для которого есть описание."
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

## A line that changes the code | key new:tools-7-2-changed-line | sid s-u6mj5yv8ngnz79v | tools 7.2.1a (new, after "The code and the tests that a commit changes")

### Text

In a file whose language a description covers (§s-33fw3ga4ctd94dq), the SpecSheriff tools decide which of the lines that a commit removes or adds change the code (§s-9j2mmnuuwmx5ksn). They read each line as the tokens of the file's language, as follows:

they leave out comments;

they read each string literal, or the part of one on the line, as one token;

in a test (§s-zrsc6asgmhv8tnc), they leave out the test's name, other than its SpecTag (§s-8xw4mgvpexyvw5q).

The SpecSheriff tools compare each run of consecutive lines that the commit removes with the run of lines that it adds in its place. They take the runs from git's comparison of the two versions of the file, made with the Myers algorithm, git's default, whatever git's settings on the machine. They leave out of both runs each line that holds no token, such as a blank line or a line that holds only a comment.

Where the two runs hold the same number of lines, the SpecSheriff tools pair the lines in order. Both lines of a pair change the code where either of the following holds:

the tokens of the two lines differ;

in Python, the indentation of the two lines differs.

Where the two runs hold different numbers of lines, every line of both runs changes the code.

### Reason

A change to the code makes the SpecSheriff tools check that code against its rules again (§s-9j2mmnuuwmx5ksn). Reading each line as the tokens of the language of its file leaves out what cannot alter what the code does, such as comments and the whitespace between tokens.

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
  }
]
```

### The current node

(none: this node is new)

## The code and the tests of a draft rule | key new:tools-7-2-draft-rule | sid s-w93jfnqynfa47pf | tools 7.2.2c (new, after "Code and tests outside the commit that no SpecTag binds")

### Text

`sheriff binding` refuses a commit that adds, changes or removes (§s-2x58az67bm6cxq2) code or a test bound by a SpecTag (§s-8xw4mgvpexyvw5q) that names a draft rule (§s-wpadgy2budcxa3v). It does so regardless of whether the specification is approved or a draft (§s-utvqbypzhmgndug).

The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It also names each symbol (§s-kgbzk2ph9e6jfb4) and each test concerned, with its file and its line, and each other file concerned. Where the commit removes a symbol or a test, its line is read in the commit's parent.

`sheriff binding` reads the SpecTags both in the commit's parent and as the commit leaves the code and the tests. It takes the approval status of each rule that those SpecTags name from the specification as the commit leaves it. A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp).

### Reason

A draft rule may still be incomplete or wrong, so code or a test written, changed or removed for it would follow a wording that no owner has approved (§s-utvqbypzhmgndug).

### Examples

```json
[
  {
    "en": "A rule that a function implements is reworded and becomes a draft. Before an owner approves the new wording, a commit deletes the function. `sheriff binding` refuses the commit and names the rule. The most likely mistake is to read the SpecTags only as the commit leaves the code, which lets the deletion pass, since no SpecTag naming the rule is left.",
    "ru": "Правило, которое реализует функция, переформулируют, и оно становится черновиком. До того как ответственный одобрит новую формулировку, коммит удаляет функцию. `sheriff binding` отвергает коммит и называет правило. Самая вероятная ошибка — читать SpecTag только в том виде, в каком коммит оставляет код: тогда удаление проходит, потому что SpecTag, называющего правило, не остаётся."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-wpadgy2budcxa3v"
  },
  {
    "type": "cites",
    "to": "s-2x58az67bm6cxq2"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-utvqbypzhmgndug"
  },
  {
    "type": "cites",
    "to": "s-kgbzk2ph9e6jfb4"
  }
]
```

### The current node

(none: this node is new)

## A change to a SpecTag | key proposal:s-9j2mmnuuwmx5ksn | sid s-9j2mmnuuwmx5ksn | spec 9.4

### Text

A change to a SpecTag (§s-8xw4mgvpexyvw5q) is considered a change to the test or the code that the SpecTag binds. Renaming a test, or rewording the comments in the tests or in a file whose symbols the checks can identify (§s-kgbzk2ph9e6jfb4), changes neither the test nor the code, as long as the SpecTag stays the same.

### Reason

Tests and code that change are checked again against the rules their SpecTags name. This rule draws the line between an edit to a test or code that can affect that check and one that cannot.

### Examples

```json
[
  {
    "en": "A commit rewords a comment inside a function bound by a SpecTag directly above it, and changes nothing else, so it does not change the function. But not: a commit that rewords a comment in a stylesheet bound by SpecTags at its start leaves the stylesheet unchanged.",
    "ru": "Коммит переформулирует комментарий внутри функции, привязанной SpecTag непосредственно над ней, и больше ничего не меняет, поэтому функцию он не меняет. Но не так: коммит, который переформулирует комментарий в таблице стилей, привязанной SpecTag в начале файла, оставляет таблицу стилей неизменной."
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
    "to": "s-kgbzk2ph9e6jfb4"
  }
]
```

### The current node

Title: A change to a SpecTag

A change to a SpecTag is considered a change to the test or the code that the SpecTag binds. Renaming a test or rewording the comments in the code and the tests changes neither the test nor the code, as long as the SpecTag stays the same.

Reason: Tests and code that change are checked again against the rules their SpecTags name. This rule draws the line between an edit to a test or code that can affect that check and one that cannot.

## Project-wide settings | key proposal:new-tools-1-settings-g3 | sid undefined | tools 2 (new, after "Where the files are")

### Text

`sheriff.config.json` (§s-zefk589ykh37b8u) holds the project-wide settings of the SpecSheriff tools:

the glob patterns that match the files holding the system's code (§s-hheus6f395ynqvc) and those holding its tests;

for each check and each generator that the project's own guidelines add (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the rule that lists it, its name in that rule, the command that runs it, and the glob patterns that match the files holding its code and its tests (§s-utf4mbt7ref8g9c);

the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2), and those that record which extensions of the guidelines (§s-mbmnsnxenmavu3z) the project has chosen (§s-9ttvcwpqkehm58g);

the command that runs the tests of the system's code and of the project's own checks and generators (§s-477gtdrkw34dzxw);

the project-wide settings of the reviewer (§s-xr5xxa9cxf2mq5u).

The SpecSheriff tools refuse a `sheriff.config.json` that is not valid JSON or does not conform to its schema (§s-zefk589ykh37b8u).

To find the SpecTags (§s-8xw4mgvpexyvw5q) that bind code and tests to their rules, the SpecSheriff tools read only the files that match the glob patterns for code or for tests in `sheriff.config.json`, the files into which `sheriff types` writes the types (§s-pvzms7d8kxb8dk2), and the bindings file (§s-trwczfskj5zmuft). A file that matches both a pattern for code and a pattern for tests is read as a test.

### Reason

A setting kept in the repository is the same in every clone, so the SpecSheriff tools behave alike for everyone who works on the project.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "implements",
    "to": "s-q3pfzyaxvpr2zj2"
  },
  {
    "type": "implements",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "implements",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
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
    "to": "s-utf4mbt7ref8g9c"
  },
  {
    "type": "cites",
    "to": "s-mbmnsnxenmavu3z"
  },
  {
    "type": "cites",
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-pvzms7d8kxb8dk2"
  },
  {
    "type": "cites",
    "to": "s-trwczfskj5zmuft"
  }
]
```

### The wording the owner agreed to (new:tools-1-settings)

Title: Project-wide settings

`sheriff.config.json` (§s-zefk589ykh37b8u) holds the project-wide settings of the SpecSheriff tools:

the glob patterns that match the files holding the system's code (§s-hheus6f395ynqvc) and those holding its tests;

for each check and each generator that the project's own guidelines add (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the rule that lists it, its name in that rule, the command that runs it, and the glob patterns that match the files holding its code and its tests (§s-utf4mbt7ref8g9c);

the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2), and those that record which extensions of the guidelines (§s-mbmnsnxenmavu3z) the project has chosen (§s-9ttvcwpqkehm58g);

the command that runs the tests of the system's code and of the project's own checks and generators (§s-477gtdrkw34dzxw);

the project-wide settings of the reviewer (§s-xr5xxa9cxf2mq5u).

The SpecSheriff tools refuse a `sheriff.config.json` that is not valid JSON or does not conform to its schema (§s-zefk589ykh37b8u).

To find the SpecTags (§s-8xw4mgvpexyvw5q) that bind code and tests to their rules, the SpecSheriff tools read only the files that match the glob patterns for code or for tests in `sheriff.config.json`, and the files into which `sheriff types` writes the types (§s-pvzms7d8kxb8dk2). A file that matches both a pattern for code and a pattern for tests is read as a test.

Reason: A setting kept in the repository is the same in every clone, so the SpecSheriff tools behave alike for everyone who works on the project.
