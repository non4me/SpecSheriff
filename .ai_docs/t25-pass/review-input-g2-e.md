# Group 1 drafts for review (generated 2026-11-24T00:59:48.531Z)

## A SpecTag that names no node | key new:tools-7-2-no-node | sid s-36x8amvunmv2kp5 | tools 7.2.2a (new, after "SpecTags on the system's code other than tests")

### Text

`sheriff binding` accepts a SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) only where its sid names a node of the model of the specification (§s-w6gybeqn2ttydqx). It checks each such SpecTag in the system's code (§s-hheus6f395ynqvc), including its tests and the bindings file (§s-trwczfskj5zmuft). It refuses any other such SpecTag, naming the file, the line and the sid (§s-w4g56n2bs753rt3).

It refuses such a SpecTag whether or not the commit changes the code or the test that the SpecTag is on, and whether the specification is approved or a draft.

### Reason

A SpecTag whose sid names no node binds its code or test to nothing, whether the sid was mistyped or its node was removed. A removed node leaves such SpecTags in code that the commit removing the node does not touch, so every SpecTag is looked up at every commit.

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
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-trwczfskj5zmuft"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  }
]
```

### The current node

(none: this node is new)

## Code and tests outside the commit that carry no SpecTag | key new:tools-7-2-outside | sid s-3xx2eukc8gtd2tx | tools 7.2.2b (new, after "A SpecTag that names no node")

### Text

`sheriff binding` gives the warning and the refusal that the rule on code and tests without a SpecTag requires (§s-kkbqcb9xrpaepwn) for each of the following that the commit leaves unchanged (§s-2x58az67bm6cxq2):

a symbol (§s-kgbzk2ph9e6jfb4) or a file to be bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) of the system's code (§s-hheus6f395ynqvc) that no SpecTag (§s-5z5gnu7pahr82xp) binds;

a test of the system's code that declares no SpecTag (§s-zrsc6asgmhv8tnc).

It reads the specification's approval status and its `strict` flag from the latest entries in `sheriff.config.json` that set them, as the commit leaves that file (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2).

The warning and the refusal name `sheriff untagged`, which lists such code by file and symbol (§s-weuyx98r7c923ab).

### Reason

The approval status and the `strict` flag decide what such code costs, and a commit may change either of them. So they are read as the commit leaves them.

### Examples

```json
[
  {
    "en": "A commit adds the entry that approves the specification while its `strict` flag is off, and old code elsewhere carries no SpecTag. The commit is judged by the specification as the commit leaves it, approved, so the commit passes with the warning, which names `sheriff untagged`. The most likely mistake is to judge the commit by the status before it, a draft, so that the commit that approves the specification passes without the warning.",
    "ru": "Коммит добавляет запись, которая одобряет спецификацию, при выключенном флаге `strict`, а у старого кода в другом месте нет SpecTag. Коммит оценивается по спецификации в том виде, в каком он её оставляет, — одобренной, поэтому коммит проходит с предупреждением, которое называет `sheriff untagged`. Самая вероятная ошибка — оценивать коммит по статусу до него, черновику: тогда коммит, который одобряет спецификацию, проходит без предупреждения."
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
    "to": "s-hheus6f395ynqvc"
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
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "cites",
    "to": "s-q3pfzyaxvpr2zj2"
  },
  {
    "type": "cites",
    "to": "s-weuyx98r7c923ab"
  }
]
```

### The current node

(none: this node is new)

## The SpecTags the tests carry | key s-utf4mbt7ref8g9c | sid s-utf4mbt7ref8g9c | tools 7.2.4

### Text

`sheriff binding` refuses each test of the system's code (§s-hheus6f395ynqvc) that the commit adds or changes (§s-2x58az67bm6cxq2) and that declares no SpecTag where the description of its language places it (§s-zrsc6asgmhv8tnc, §s-ay6wntm2dxcgpnp). The refusal names the test, its file and its line.

It also refuses each test, changed or not, whose SpecTag (§s-5z5gnu7pahr82xp) names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule.

A test whose name or mark holds a bare sid (§s-gb8s9657a65hqmv) declares no SpecTag. Its refusal names `sheriff reindex`, which writes the SpecTag.

`sheriff binding` reads the tests in each file that the glob patterns for tests in `sheriff.config.json` match, where a description covers the file's language (§s-33fw3ga4ctd94dq). For a test that the commit leaves unchanged and that declares no SpecTag, the check of code and tests outside the commit applies instead (§s-3xx2eukc8gtd2tx). `sheriff binding` makes this check whether the specification is approved or a draft.

### Reason

A test counts toward the rule that its SpecTag names when the SpecSheriff tools judge whether that rule is implemented (§s-6fw72j65jkqrfpf). A test with no SpecTag, or with one that names a section or a term, counts toward no rule.

### Examples

```json
[
  {
    "en": "A test opens its name with `@spec s-…`, where the sid is that of the term `request`. `sheriff binding` refuses the test, since a term is not a rule. The most likely mistake is to accept the test because the term exists, as an earlier release did.",
    "ru": "Название теста начинается с `@spec s-…`, где sid — sid термина `request`. `sheriff binding` отвергает тест, потому что термин — не правило. Самая вероятная ошибка — принять тест, потому что термин существует, как это делал прежний выпуск."
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
    "to": "s-zrsc6asgmhv8tnc"
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

`sheriff binding` accepts a commit that adds or changes code bound to a rule (§s-5z5gnu7pahr82xp) only where a test of the system's code (§s-hheus6f395ynqvc) declares that rule's SpecTag (§s-m82tz4mp3f9r3fg). It takes the tests as the commit leaves them. It refuses any other such commit, naming the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx).

The code here is each symbol and each file bound as a whole, other than tests, that the commit adds or changes (§s-2x58az67bm6cxq2). A rule is bound to such code where one of the code's SpecTags names the rule.

A test counts here whether or not the commit changes it, including a test marked as skipped. `sheriff binding` makes this check whether the specification is approved or a draft.

### Reason

A rule's test is written before its code (§s-rah8b37kytb682y). So code added or changed for a rule that no test names was written before the rule's test, or without one.

### Examples

```json
[
  {
    "en": "A commit adds a function whose SpecTag names a rule, and no test in the repository declares that rule's SpecTag. `sheriff binding` refuses the commit and names the rule. The most likely mistake is to look for the test only among the tests that the commit changes, which refuses a commit whose test was committed earlier.",
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
