# Group 3 drafts for review (generated 2026-11-24T11:42:32.188Z)

## The code and the tests that a commit changes | key s-2x58az67bm6cxq2 | sid s-2x58az67bm6cxq2 | tools 7.2.1

### Text

The SpecSheriff tools find what a commit adds, changes and removes in the system's code (§s-hheus6f395ynqvc), including its tests. They compare each file as the commit leaves it with the same file in the commit's parent. For a merge commit, the parent is its first parent. A file that the commit moves or renames is compared with the file at its earlier path.

The commit changes a symbol (§s-kgbzk2ph9e6jfb4) or a test (§s-zrsc6asgmhv8tnc) where one of its lines changes the code (§s-u6mj5yv8ngnz79v). A symbol's lines run from its first line to its last, including its decorators. A line that changes the code changes every symbol and every test that holds it, so a change in a nested symbol also changes each symbol that encloses it.

A line that the commit removes is read in the commit's parent. A line that it adds is read in the file as the commit leaves it. A symbol or a test of the parent is the same as the one of the same name in the file as the commit leaves it. Of the symbols and the tests that a commit changes, it adds those that the commit's parent does not hold. It removes those that the commit's parent holds and the file as the commit leaves it does not.

The commit changes a file bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) where it changes any of the file's text, including a comment or spacing (§s-kgbzk2ph9e6jfb4). The commit adds such a file where the commit's parent holds no file at its path. It removes such a file where it does not leave the file in the repository.

A commit also changes each symbol, file bound as a whole and test whose SpecTags (§s-8xw4mgvpexyvw5q) it changes (§s-9j2mmnuuwmx5ksn). A commit changes the SpecTags of a symbol, a file or a test where a SpecTag binds it either in the commit's parent or after the commit, but not in both. Two SpecTags are the same only where their texts are the same, including the text after `@spec none` (§s-5z5gnu7pahr82xp).

The SpecTags of a file that the bindings file (§s-trwczfskj5zmuft) binds are those that the file's entry holds. A commit adds an entry of the bindings file where the commit's parent holds no entry for the same file. It changes an entry whose SpecTags differ from those of the same file's entry in the parent.

A commit adds or changes each SpecTag on a line that it adds, and each SpecTag in an entry that it adds or changes. The exception is a SpecTag that binds the same symbol, file or test, with the same text, as in the commit's parent.

A commit leaves unchanged each symbol, file bound as a whole and test that it leaves in the repository and neither adds nor changes.

### Reason

Each check of a commit judges only what the commit adds, changes or removes. One account of what that is lets every check judge the same changes, each with the whole of the code that its SpecTags bind (§s-9j2mmnuuwmx5ksn).

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
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
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

In a file whose language a description covers (§s-33fw3ga4ctd94dq), the SpecSheriff tools decide which of the lines that a commit removes or adds change the code (§s-9j2mmnuuwmx5ksn). They read each line as the tokens of the file's language, leaving out comments and reading each string literal as one token. In a test (§s-zrsc6asgmhv8tnc), they also leave out the test's name, other than its SpecTag (§s-8xw4mgvpexyvw5q).

The SpecSheriff tools compare each run of consecutive lines that the commit removes with the run of lines that it adds in its place. They leave out of both runs each line that holds no token, such as a blank line or a line that holds only a comment.

Where the two runs hold the same number of lines, the SpecSheriff tools pair the lines in order. Both lines of a pair change the code where either of the following holds:

the tokens of the two lines differ;

in Python, the indentation of the two lines differs.

Where the two runs hold different numbers of lines, every line of both runs changes the code.

### Reason

A change to the code makes the SpecSheriff tools check that code against its rules again (§s-9j2mmnuuwmx5ksn). Read as the tokens of its language, a line changes the code only where the change can alter what the code does. The same change then counts the same way on every machine.

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

`sheriff binding` refuses a commit that adds, changes or removes (§s-2x58az67bm6cxq2) code or a test that a SpecTag (§s-8xw4mgvpexyvw5q) naming a draft rule binds (§s-wpadgy2budcxa3v). The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It also names the symbol, the file or the test, with its file and its line.

`sheriff binding` reads the SpecTags both in the commit's parent and as the commit leaves the code and the tests. It reads whether a rule is a draft in the specification as the commit leaves it. A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp).

`sheriff binding` makes this check whether the specification is approved or a draft (§s-utvqbypzhmgndug, §s-wpadgy2budcxa3v).

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
  }
]
```

### The current node

(none: this node is new)
