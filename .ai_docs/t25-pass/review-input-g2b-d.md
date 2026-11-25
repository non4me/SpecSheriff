# Group 1 drafts for review (generated 2026-11-24T01:49:50.910Z)

## SpecTags on the system's code other than tests | key s-9rtrj24myzjvshu | sid s-9rtrj24myzjvshu | tools 7.2.2

### Text

`sheriff binding` refuses each of the following in the system's code (§s-hheus6f395ynqvc) that the commit adds or changes (§s-2x58az67bm6cxq2), other than tests, whether the specification is approved or a draft (§s-k6dzuajejrw4cej):

a symbol (§s-kgbzk2ph9e6jfb4) that no SpecTag (§s-5z5gnu7pahr82xp) binds;

a file that is to be bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) and that no SpecTag binds;

in a file whose language a description covers (§s-33fw3ga4ctd94dq), a SpecTag in any comment other than the one directly above a symbol;

in such a file, a SpecTag that shares its line with anything other than the comment's delimiters;

in a file to be bound by SpecTags at its start (§s-5qdjyf6t898rsd4), a SpecTag on a line after that start;

where a SpecTag may stand, a text that opens with `@spec` but has neither form of a SpecTag (§s-5z5gnu7pahr82xp), such as `@spec none` with no text after it;

an entry in the bindings file (§s-trwczfskj5zmuft) for a file that is not part of the system's code other than tests, or whose format allows comments;

a SpecTag whose sid names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule (§s-5z5gnu7pahr82xp);

code that carries `@spec none` together with another SpecTag.

The refusal names the file, and the symbol and the line where they apply.

A SpecTag or an entry of a kind that this list refuses binds nothing. Code that the commit leaves unchanged and that no SpecTag binds is handled by the check of code and tests outside the commit (§s-3xx2eukc8gtd2tx).

### Reason

A SpecTag that cannot be attached to one symbol or one file, or that names a node that no code can implement, binds nothing. The code that it is meant to bind is then as unbound as code with no SpecTag.

### Examples

```json
[
  {
    "en": "A commit adds a function that carries `/** @spec s-… */`, whose sid is that of the section that holds the rules that the function implements. `sheriff binding` refuses the SpecTag, since a section requires nothing that code could implement. The most likely mistake is to accept the SpecTag because its node exists, which leaves the function bound to no rule.",
    "ru": "Коммит добавляет функцию, у которой есть `/** @spec s-… */`, sid которого — sid раздела, где лежат правила, которые реализует функция. `sheriff binding` отвергает этот SpecTag, потому что раздел не требует ничего, что мог бы реализовать код. Самая вероятная ошибка — принять SpecTag, потому что его узел существует: тогда функция не привязана ни к одному правилу."
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
    "to": "s-2x58az67bm6cxq2"
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

## A SpecTag that names no node | key new:tools-7-2-no-node | sid s-36x8amvunmv2kp5 | tools 7.2.2a (new, after "SpecTags on the system's code other than tests")

### Text

`sheriff binding` accepts a SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) only where its sid names a node of the model of the specification (§s-w6gybeqn2ttydqx) as the commit leaves it. It checks each such SpecTag in the system's code (§s-hheus6f395ynqvc), including the tests, and in the bindings file (§s-trwczfskj5zmuft). It refuses a SpecTag whose sid names no node of that model, naming the file, the line and the sid (§s-w4g56n2bs753rt3).

`sheriff binding` refuses a SpecTag whose sid names no node at every commit, whether or not:

the commit changes the code or the test that the SpecTag binds;

the specification is approved.

### Reason

Once a node is removed, every SpecTag that names it binds its code or test to nothing, wherever that SpecTag stands.

### Examples

```json
[
  {
    "en": "A rule is removed, while a function elsewhere still carries its SpecTag. The commit that removes the rule changes no code, and `sheriff binding` refuses the SpecTag on the function. The most likely mistake is to look up only the SpecTags on code that the commit changes, which lets the SpecTag pass until someone edits the function.",
    "ru": "Правило удаляют, а у функции в другом месте всё ещё есть его SpecTag. Коммит, удаляющий правило, не меняет кода, и `sheriff binding` отвергает SpecTag у функции. Самая вероятная ошибка — проверять только SpecTag кода, который меняет коммит: тогда SpecTag проходит, пока кто-нибудь не изменит функцию."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-w4g56n2bs753rt3"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-trwczfskj5zmuft"
  }
]
```

### The current node

(none: this node is new)

## Code and tests outside the commit that carry no SpecTag | key new:tools-7-2-outside | sid s-3xx2eukc8gtd2tx | tools 7.2.2b (new, after "A SpecTag that names no node")

### Text

`sheriff binding` treats each of the following that the commit leaves unchanged (§s-2x58az67bm6cxq2) as the rule on code and tests without a SpecTag (§s-5z5gnu7pahr82xp) requires (§s-kkbqcb9xrpaepwn):

in the system's code (§s-hheus6f395ynqvc) other than tests, a symbol (§s-kgbzk2ph9e6jfb4) or a file to be bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that no SpecTag binds (§s-9rtrj24myzjvshu);

a test of the system's code that declares no SpecTag (§s-zrsc6asgmhv8tnc), or whose SpecTag names a node that is not a rule (§s-utf4mbt7ref8g9c).

`sheriff binding` takes the specification's approval status and its `strict` flag as the commit leaves them (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2).

### Reason

The approval status and the `strict` flag decide what code without a SpecTag outside the commit costs the commit: nothing, a warning or a refusal. The commit itself may change either of them.

### Examples

```json
[
  {
    "en": "A commit adds the entry that approves the specification while its `strict` flag is off, and old code elsewhere carries no SpecTag. The commit is judged against the specification as the commit leaves it, approved, so the commit passes with the warning. The most likely mistake is to judge the commit by the status before it, a draft, which lets the commit that approves the specification pass without the warning.",
    "ru": "Коммит добавляет запись, которая одобряет спецификацию, при выключенном флаге `strict`, а у старого кода в другом месте нет SpecTag. Коммит оценивается по спецификации в том виде, в каком он её оставляет, — одобренной, поэтому коммит проходит с предупреждением. Самая вероятная ошибка — оценивать коммит по статусу до него, черновику: тогда коммит, который одобряет спецификацию, проходит без предупреждения."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-kkbqcb9xrpaepwn"
  },
  {
    "type": "cites",
    "to": "s-2x58az67bm6cxq2"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
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
    "to": "s-5qdjyf6t898rsd4"
  },
  {
    "type": "cites",
    "to": "s-trwczfskj5zmuft"
  },
  {
    "type": "cites",
    "to": "s-9rtrj24myzjvshu"
  },
  {
    "type": "cites",
    "to": "s-zrsc6asgmhv8tnc"
  },
  {
    "type": "cites",
    "to": "s-utf4mbt7ref8g9c"
  },
  {
    "type": "cites",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "cites",
    "to": "s-q3pfzyaxvpr2zj2"
  }
]
```

### The current node

(none: this node is new)

## The SpecTags the tests carry | key s-utf4mbt7ref8g9c | sid s-utf4mbt7ref8g9c | tools 7.2.4

### Text

`sheriff binding` refuses each of the following tests of the system's code (§s-hheus6f395ynqvc), whether the specification is approved or a draft:

a test that the commit adds or changes (§s-2x58az67bm6cxq2) and that declares no SpecTag (§s-5z5gnu7pahr82xp) in the place set for the test's language (§s-zrsc6asgmhv8tnc, §s-ay6wntm2dxcgpnp);

a test that the commit adds or changes and whose SpecTag names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule (§s-5z5gnu7pahr82xp).

Each refusal names the test, its file and its line.

A test whose name or mark holds a bare sid (§s-gb8s9657a65hqmv) declares no SpecTag. The refusal of such a test names `sheriff reindex`, which writes the SpecTag.

`sheriff binding` reads the tests in each file that the glob patterns for tests in `sheriff.config.json` match, where a description covers the file's language (§s-33fw3ga4ctd94dq). For a test that the commit leaves unchanged and that declares no SpecTag, or whose SpecTag names a node that is not a rule, the check of code and tests outside the commit applies instead (§s-3xx2eukc8gtd2tx).

### Reason

A test counts toward the rule that its SpecTag names when the SpecSheriff tools judge whether that rule is implemented (§s-6fw72j65jkqrfpf). A test with no SpecTag, or with one that names a section or a term, counts toward no rule.

### Examples

```json
[
  {
    "en": "A commit adds a test that opens its name with `@spec s-…`, where the sid is that of the term `request`. `sheriff binding` refuses the test, since a term is not a rule. The most likely mistake is to accept the test because the term exists.",
    "ru": "Коммит добавляет тест, название которого начинается с `@spec s-…`, где sid — sid термина `request`. `sheriff binding` отвергает тест, потому что термин — не правило. Самая вероятная ошибка — принять тест, потому что термин существует."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-ay6wntm2dxcgpnp"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-2x58az67bm6cxq2"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-zrsc6asgmhv8tnc"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  },
  {
    "type": "cites",
    "to": "s-gb8s9657a65hqmv"
  },
  {
    "type": "cites",
    "to": "s-33fw3ga4ctd94dq"
  },
  {
    "type": "cites",
    "to": "s-3xx2eukc8gtd2tx"
  },
  {
    "type": "cites",
    "to": "s-6fw72j65jkqrfpf"
  }
]
```

### The current node

Title: The SpecTags the tests carry

`sheriff binding` reads every test for the SpecTag it carries.

- A test's SpecTag is resolved against the rules, the terms and the nodes of a project's own NodeKind. That of a test whose text the commit changes is resolved against the approved ones.
- A test whose only change puts `@spec ` before the bare sid it carried (§s-f5rz6b7dhxejjts) does not count as changed (§s-rah8b37kytb682y).
- A test carrying a bare sid carries no SpecTag. Whatever is reported or refused for it names `sheriff reindex`, which writes the SpecTag.
- While the commit leaves the specification a draft (§s-j9r8z4xdrfkfs47), a test carrying no SpecTag that the commit does not change is reported by the test, not refused (§s-kkbqcb9xrpaepwn).
- The sids of the SpecTags on the changed symbols are looked up among the sids the tests' SpecTags name.
- For each of the project's own checks and generators whose code the commit changes, the sid of the rule listing it is looked up among the sids the tests' SpecTags name. The code of such a check or generator is the files the settings name as its code.
- Each test in the files the settings name as the tests of a project's own check or generator is read for the SpecTag of the rule listing it (§s-sfjka4zc4rhfu67).

Reason: (none)

## A test for each rule whose code a commit changes | key new:tools-7-2-rule-test | sid s-8wp7xm7g3u8gscq | tools 7.2.4a (new, after "The SpecTags the tests carry")

### Text

`sheriff binding` accepts a commit that adds or changes code bound to a rule (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp) only where a test of the system's code (§s-hheus6f395ynqvc) declares that rule's SpecTag (§s-m82tz4mp3f9r3fg). It takes the tests as the commit leaves them. It refuses any commit that does not meet this condition, naming the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx).

In this check, the code is each symbol (§s-kgbzk2ph9e6jfb4) and each file bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that the commit adds or changes (§s-2x58az67bm6cxq2), other than tests. A rule is bound to such code where one of the code's SpecTags names the rule.

In this check, a test counts whether or not the commit changes it. A test marked as skipped or as expected to fail counts too. `sheriff binding` runs this check whether the specification is approved or a draft.

### Reason

A rule's test is written before its code (§s-rah8b37kytb682y). So code added or changed for a rule that no test names was written before the rule's test, or without one.

### Examples

```json
[
  {
    "en": "A commit adds a function whose SpecTag names a rule, and no test in the repository declares that rule's SpecTag. `sheriff binding` refuses the commit and names the rule. The most likely mistake is to look for the test only among the tests that the commit changes, in which case `sheriff binding` refuses a commit whose test was committed earlier.",
    "ru": "Коммит добавляет функцию, SpecTag которой называет правило, и ни один тест в репозитории не объявляет SpecTag этого правила. `sheriff binding` отклоняет коммит и называет правило. Самая вероятная ошибка — искать тест только среди тестов, которые меняет коммит: тогда отклоняется коммит, тест которого был закоммичен раньше."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-m82tz4mp3f9r3fg"
  },
  {
    "type": "cites",
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
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
    "to": "s-2x58az67bm6cxq2"
  },
  {
    "type": "cites",
    "to": "s-rah8b37kytb682y"
  }
]
```

### The current node

(none: this node is new)
