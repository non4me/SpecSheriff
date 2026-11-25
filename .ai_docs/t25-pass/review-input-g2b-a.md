# Group 1 drafts for review (generated 2026-11-24T01:49:50.751Z)

## The review of a commit | key s-vp24dqydygztqbt | sid s-vp24dqydygztqbt | tools 7.3.4

### Text

`sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae).

`sheriff review` asks for a verdict only on a commit for which the reviewer makes at least one of the following judgements (§s-epaw9sgyaajzn8g):

the judgement on the code that the commit adds or changes (§s-rd9nftptjuz6bwv);

the judgement on each statement in the commit's message that a rule's implementation needs no change (§s-kgqxg4gunzynwsv);

the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves (§s-4bwa4zepd4nwcv8).

On such a commit, `sheriff review` gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q). The files generated from the specification, which `sheriff review` leaves out of the commit's change, are the files that `sheriff types` writes (§s-a8fn72xa782wvbk). It tells the reviewer which of those files the commit changes.

### Reason

Each run of the reviewer is paid for by the user who commits (§s-tnz9zgqx8c629a7), so `sheriff review` runs it only on a commit that needs one of its judgements.

### Examples

```json
[
  {
    "en": "A commit changes only the wording of a draft rule. It changes no code, its message contains no statement that a rule's implementation needs no change, and it approves no node. So `sheriff review` does not run the reviewer, and the commit passes the review. The most likely mistake is to run the reviewer on every commit, which makes the user who commits pay for a run that has nothing to judge.",
    "ru": "Коммит меняет только формулировку правила-черновика. Он не меняет кода, его сообщение не содержит утверждения, что реализацию правила менять не нужно, и он не одобряет ни одного узла. Поэтому `sheriff review` не запускает рецензента, и коммит проходит ревью. Самая вероятная ошибка — запускать рецензента при каждом коммите: тогда тот, кто делает коммит, платит за запуск, которому нечего судить."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-nyh9yk22ba6g77q"
  },
  {
    "type": "implements",
    "to": "s-epaw9sgyaajzn8g"
  },
  {
    "type": "cites",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-68ds99w8wd67aae"
  },
  {
    "type": "cites",
    "to": "s-rd9nftptjuz6bwv"
  },
  {
    "type": "cites",
    "to": "s-kgqxg4gunzynwsv"
  },
  {
    "type": "cites",
    "to": "s-tj38pvm38nepaf5"
  },
  {
    "type": "cites",
    "to": "s-4bwa4zepd4nwcv8"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  },
  {
    "type": "cites",
    "to": "s-tnz9zgqx8c629a7"
  }
]
```

### The current node

Title: The review of a commit

`sheriff review` has a runner judge every commit that changes the system's code. A runner is an agent's CLI, started apart from the session that wrote the code (§s-xr5xxa9cxf2mq5u). The runner is given:

- the commit's message;
- the commit's change, less the files generated from the nodes, each of which is named to it with what it holds;
- each node the message or a changed symbol's SpecTag names, with its text and its reason. A RecordType is given with its `RecordType.fields`, and a node of a project's own NodeKind with the values its NodeKind declares;
- each symbol of the system's code outside its tests the commit changes, whole as the commit leaves it, with its file, its lines and its SpecTags.

The symbols are those `sheriff binding` finds changed (§s-2x58az67bm6cxq2). A symbol's SpecTags are its own or those of the symbol it stands in.

The runner judges the commit against the nodes. It judges each changed symbol, whole, against the nodes its SpecTags name.

It refuses the commit where the code:

- does something no named node states in its text;
- leaves out what a named node requires.

It also refuses the commit where a changed symbol:

- does something no node its SpecTags name states in its text;
- carries a SpecTag naming a node it does not implement;
- carries the SpecTag that names no node while it implements the system's logic.

A finding of the last sort names as its node the rule that every symbol carries a SpecTag (§s-kgbzk2ph9e6jfb4).

Reason: A SpecTag says which node a symbol is held to. The checks can tell that a SpecTag names a node that exists, not that the symbol does what that node says. Nor can they tell whether a symbol whose SpecTag names no node carries the system's logic. A reader of the code can tell both.

A changed symbol is judged whole, since a change anywhere in it counts as a change of the whole symbol. The whole symbol is then held to the nodes the commit names. Shown only the changed lines, the reviewer would pass the lines beside them that do what no node says.

## The judgement on the code that a commit changes | key new:tools-7-3-review-code | sid s-rd9nftptjuz6bwv | tools 7.3.4a (new, after "The review of a commit")

### Text

`sheriff review` refuses a commit in which the independent reviewer (§s-m4h279nbaqkpa3t) finds that the changed code does something that none of its rules states, or leaves out something that they require (§s-zn4vrdpnv9bch62). Each finding names the rule that it concerns, the file and the line.

The reviewer judges the changed code on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests. Besides what `sheriff review` gives the reviewer in every review (§s-vp24dqydygztqbt), it gives the reviewer the changed code other than the files generated from the specification. That is each of the following, in full as the commit leaves it, with its file, its lines and the SpecTags (§s-8xw4mgvpexyvw5q) that bind it:

each symbol (§s-kgbzk2ph9e6jfb4) whose code the commit adds or changes (§s-2x58az67bm6cxq2);

each file that the commit adds or changes and that is bound as a whole;

each test that the commit adds or changes.

The reviewer refuses the commit where any of the following holds:

a changed symbol or file whose SpecTags name rules does something that none of those rules states;

a changed test checks something that the rule its SpecTag names does not state;

the changed code other than tests leaves out something required by a rule that a SpecTag on that code names, or that the commit's message names other than in an `Implementation-Needs-No-Change` trailer (§s-7gab4ptjt2khfr5);

a changed symbol or file carries a SpecTag naming a rule that it does not implement;

a changed symbol or file carries `@spec none` (§s-5z5gnu7pahr82xp), but implements the system's logic (§s-2jcmb9xe9d64t2t);

a changed symbol or file carries `@spec none` whose text does not say what the technology that the system is built with requires of it (§s-5z5gnu7pahr82xp).

A finding on code that carries `@spec none` names the rule on how code is bound to its rules (§s-kgbzk2ph9e6jfb4) as the rule that it concerns.

### Reason

A SpecTag shows only which rule a piece of code is meant to implement. Whether the code does only what that rule says, including in the unchanged lines around a change, can be judged only by reading it.

### Examples

```json
[
  {
    "en": "A commit changes one line of the function `close`, whose SpecTag names a rule saying that an account can be closed only when its balance is zero. An unchanged line of the same function also sends the account holder an email. The reviewer is given the whole function and finds that no rule its SpecTag names says anything about the email. `sheriff review` refuses the commit, naming the rule and that line. The most likely mistake is to give the reviewer only the changed line, so that the email goes unnoticed.",
    "ru": "Коммит меняет одну строку функции `close`, SpecTag которой называет правило: счёт можно закрыть, только если его баланс равен нулю. Неизменённая строка той же функции ещё и отправляет владельцу счёта письмо. Рецензент получает функцию целиком и находит, что о письме не говорит ни одно правило, которое называет её SpecTag. `sheriff review` отклоняет коммит, называя правило и эту строку. Самая вероятная ошибка — передать рецензенту только изменённую строку: тогда письмо проходит незамеченным."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-zn4vrdpnv9bch62"
  },
  {
    "type": "cites",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-vp24dqydygztqbt"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-2x58az67bm6cxq2"
  },
  {
    "type": "cites",
    "to": "s-7gab4ptjt2khfr5"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-2jcmb9xe9d64t2t"
  }
]
```

### The current node

(none: this node is new)

## The judgement on a statement that a rule's implementation needs no change | key new:tools-7-3-review-statement | sid s-kgqxg4gunzynwsv | tools 7.3.4b (new, after "The judgement on the code that a commit changes")

### Text

`sheriff review` refuses a commit whose message, in the judgement of the independent reviewer (§s-m4h279nbaqkpa3t), falsely states that a rule's implementation needs no change (§s-nudrdn5xvcg262k). Each finding names the rule.

A commit's message states that a rule's implementation needs no change by means of a trailer (§s-7gab4ptjt2khfr5). The reviewer makes this judgement for each rule that such a trailer names, only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2).

For each such rule, `sheriff review` gives the reviewer the tests and the code bound to the rule (§s-6fw72j65jkqrfpf) as the commit leaves them, each in full, with its file, its lines and its SpecTags (§s-8xw4mgvpexyvw5q).

### Reason

Whether a rule's tests and code fit its wording after the commit can be judged only by reading all of them, including those that the commit leaves as they were.

### Examples

```json
[
  {
    "en": "The specification is approved, and a commit corrects a misspelt word in the text of an approved rule without changing its tests or code. Its message ends with the trailer `Implementation-Needs-No-Change: s-…`, which names the rule. The reviewer is given the rule's wording before the commit and after it, its tests and its code, and finds that they fit the new wording. The commit passes. The most likely mistake is to give the reviewer only the code that the commit changes, and here there is none, so that the statement is judged against nothing.",
    "ru": "Спецификация одобрена, и коммит исправляет опечатку в тексте одобренного правила, не меняя ни его тестов, ни кода. Его сообщение заканчивается trailer `Implementation-Needs-No-Change: s-…`, который называет это правило. Рецензент получает формулировку правила до коммита и после него, его тесты и код и находит, что они подходят к новой формулировке. Коммит проходит. Самая вероятная ошибка — передать рецензенту только код, который меняет коммит, а здесь его нет: тогда утверждение не с чем сверить."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-nudrdn5xvcg262k"
  },
  {
    "type": "cites",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "cites",
    "to": "s-7gab4ptjt2khfr5"
  },
  {
    "type": "cites",
    "to": "s-6fw72j65jkqrfpf"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  }
]
```

### The current node

(none: this node is new)

## The judgement on a node of the technical appendix that a commit approves | key new:tools-7-3-review-appendix | sid s-4bwa4zepd4nwcv8 | tools 7.3.4c (new, after "The judgement on a statement that a rule's implementation needs no change")

### Text

`sheriff review` refuses a commit that approves a node of the technical appendix (§s-tj38pvm38nepaf5) where the independent reviewer (§s-m4h279nbaqkpa3t) finds that any of the following is true of that node (§s-4p9amamvp2bry7b):

the node contradicts a rule of the base specification (§s-5x737t9nee4zgaa);

the node implements a rule of the base specification without refining that rule.

Each finding names the node and the rule of the base specification that the finding concerns. `sheriff review` refuses such a commit whatever the specification's approval status (§s-qzthyh7yqvfhsa2).

The reviewer judges each node of the technical appendix for which all of the following hold:

the commit adds to `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb) an entry that approves the node, whoever made the approval;

the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification.

A top-level section of the base specification, in the rule on what the reviewer is given (§s-nyh9yk22ba6g77q), is a section whose location (§s-kag2m9tzdnduxdx) is the name of a part, a slash and a single number, such as `base/3` or `requests/2`. For a rule that is in no section (§s-qmmzf9nksfsa3qp), the top-level section is the whole part of the base specification that the rule is in.

### Reason

An approval names whoever made it only by the email address that git was configured with (§s-v4qus7raqnwzneb). An approval that an agent makes on an owner's behalf (§s-t5uw8zfxzhfdg86) therefore looks the same as the owner's own approval. So the reviewer judges every node that this judgement covers, whoever approved it.

### Examples

```json
[
  {
    "en": "An agent that is implementing an approved rule saying that an idle session expires adds a node of the technical appendix that sets the idle limit to 30 minutes. The node has an `implements` link to that rule, and the agent approves it on the owner's behalf. Another rule of the same top-level section keeps a session open while a file is being uploaded, which the node's limit breaks during a long upload. `sheriff review` refuses the commit, naming the node and that rule. The most likely mistake is to give the reviewer only the rule that the node implements, so that the contradiction with the rule on uploads goes unnoticed.",
    "ru": "Агент, который реализует одобренное правило о том, что неактивная сессия истекает, добавляет узел технического приложения, который задаёт предел неактивности в 30 минут. У узла есть связь `implements` с этим правилом, и агент одобряет его от имени ответственного. Другое правило того же раздела верхнего уровня оставляет сессию открытой, пока загружается файл, а предел из узла нарушает это во время долгой загрузки. `sheriff review` отклоняет коммит, называя узел и это правило. Самая вероятная ошибка — передать рецензенту только правило, которое реализует узел: тогда противоречие с правилом о загрузке проходит незамеченным."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-4p9amamvp2bry7b"
  },
  {
    "type": "cites",
    "to": "s-tj38pvm38nepaf5"
  },
  {
    "type": "cites",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-5x737t9nee4zgaa"
  },
  {
    "type": "cites",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "cites",
    "to": "s-v4qus7raqnwzneb"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-nyh9yk22ba6g77q"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-qmmzf9nksfsa3qp"
  },
  {
    "type": "cites",
    "to": "s-t5uw8zfxzhfdg86"
  }
]
```

### The current node

(none: this node is new)

## How a commit message states that a rule's implementation needs no change | key new:tools-9-no-change-trailer | sid s-7gab4ptjt2khfr5 | tools 9 (new, after the new section "SpecTags in the code and the tests")

### Text

A commit's message states that a rule's implementation needs no change (§s-ddd2e96uke4y83j, §s-nudrdn5xvcg262k) with the trailer `Implementation-Needs-No-Change: <sid>`, in which `<sid>` is the sid of that rule. The message contains one such trailer for each rule about which it makes that statement.

The SpecSheriff tools read the trailers of a message as `git interpret-trailers --parse` reads them. They read a trailer as such a statement only where its key is spelt exactly `Implementation-Needs-No-Change` and its value is a single sid.

### Reason

A trailer is the form that git itself provides for a statement about a commit, so git and other tools read it without parsing the message's prose.

### Examples

```json
[
  {
    "en": "A commit changes the text of an approved rule only to correct a misspelt word. Its message ends with the line `Implementation-Needs-No-Change: s-…`, which names the rule. The most likely mistake is to write the statement in the message's prose, such as “the code needs no change for s-…”, which the SpecSheriff tools do not read as such a statement.",
    "ru": "Коммит меняет текст одобренного правила только для того, чтобы исправить опечатку. Его сообщение заканчивается строкой `Implementation-Needs-No-Change: s-…`, которая называет это правило. Самая вероятная ошибка — написать утверждение в тексте сообщения, например «для s-… код менять не нужно»: инструменты SpecSheriff не читают такой текст как утверждение."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-ddd2e96uke4y83j"
  },
  {
    "type": "implements",
    "to": "s-nudrdn5xvcg262k"
  }
]
```

### The current node

(none: this node is new)

## What the reviewer is given | key proposal:s-nyh9yk22ba6g77q | sid s-nyh9yk22ba6g77q | spec 10.4

### Text

The SpecSheriff tools give the independent reviewer (§s-m4h279nbaqkpa3t) of a commit the following:

the commit's message;

the commit's change, excluding the files generated from the specification;

the wording of each rule or term (§s-khqsmy6mhejkrhg) that the commit's message names;

the wording of each rule that a SpecTag (§s-8xw4mgvpexyvw5q) binds to code or a test that the commit adds or changes;

for each rule whose implementation, according to the commit's message, needs no change: the rule's wording as it was before the commit and as it is after it, and the tests and the code bound to the rule, directly or through a chain of `implements` links (§s-sn6au3vcr9uy5pm), as they are after it;

for each node of the technical appendix (§s-qmmzf9nksfsa3qp) that is approved in the commit and has an `implements` link to a rule of the base specification (§s-5x737t9nee4zgaa):

the node's wording;

the wording of each rule of the base specification that the node implements, that has a link to or from such a rule, or that is in the same top-level section of the base specification as such a rule.

In this rule, a node's wording is its title, its text, its reason, its examples and the fields its kind adds, as an approval covers them (§s-5ah25f6gy99panq).

The SpecSheriff tools give the reviewer nothing from the session in which the change was made. They tell the reviewer that each file left out of the change is generated from the specification. The reviewer treats what a rule requires of generated code as implemented by that code.

### Reason

The reviewer makes the judgements that no deterministic check can make: whether code does only what its rules say, whether a rule's implementation really needs no change, and whether an approved node of the technical appendix agrees with the base specification. It can judge only from what it is shown. Shown what each judgement needs, and nothing of what the author of the change meant, it judges by the rules alone.

### Outgoing links

```json
[
  {
    "type": "refines",
    "to": "s-jau82aq9juv9zzh"
  },
  {
    "type": "cites",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-khqsmy6mhejkrhg"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-qmmzf9nksfsa3qp"
  },
  {
    "type": "cites",
    "to": "s-5x737t9nee4zgaa"
  },
  {
    "type": "cites",
    "to": "s-5ah25f6gy99panq"
  },
  {
    "type": "cites",
    "to": "s-vsh384ybt4w25a2"
  },
  {
    "type": "cites",
    "to": "s-km4x4s26kv7pjze"
  }
]
```

### The current node

Title: What the reviewer is given

The SpecSheriff tools give the independent reviewer of a commit the following:

- the commit's message;
- the commit's change, less the files generated from the specification;
- the wording of each rule or term that the commit's message names;
- the wording of each rule to which a SpecTag (§s-8xw4mgvpexyvw5q) binds code that the commit adds or changes, not counting the tests;
- for each rule whose implementation, according to the commit's message, needs no change: the rule's wording as it was before the commit and as it is after it, and the tests and the code bound to the rule, directly or through a chain of `implements` links, as they are after it;
- for each node of the technical appendix (§s-qmmzf9nksfsa3qp) that is approved in the commit and has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification:
  - the node's wording;
  - the wording of each rule of the base specification that the node implements, that has a link to or from such a rule, or that is in the same top-level section of the base specification as such a rule.

A node's wording here is its title, its text, its reason, its examples and the fields its kind adds, as an approval covers them (§s-5ah25f6gy99panq).

The SpecSheriff tools give the reviewer nothing from the session in which the change was made. They tell the reviewer that each file left out of the change is generated from the specification. The reviewer treats what a rule requires of generated code as implemented by that code.

Reason: The reviewer makes the judgements that no deterministic check can make: whether code does only what its rules say, whether a rule's implementation really needs no change, and whether an approved node of the technical appendix agrees with the base specification. It can judge only from what it is shown. Shown what each judgement needs, and nothing of what the author of the change meant, it judges by the rules alone.

## What the checks enforce, and when they run | key proposal:s-m4h279nbaqkpa3t | sid s-m4h279nbaqkpa3t | spec 1.6.1

### Text

Two things are checked mechanically:

that the specification conforms to the rules of the guidelines that the main table of checks, or the table of checks of an extension, lists;

that the specification and the code still agree with each other.

Every check except the review is deterministic.

In the review, an independent reviewer judges the following (§s-nyh9yk22ba6g77q):

on every commit that changes code: whether that code does what the rules named in the commit say and does nothing that they do not say;

on a commit whose message states that a rule's implementation needs no change, while the specification is approved (§s-qzthyh7yqvfhsa2): whether that statement is true;

on a commit in which a node of the technical appendix (§s-qmmzf9nksfsa3qp) is approved, if the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification: whether the node refines the rules of the base specification that it implements and contradicts no rule of the base specification.

The checks run when a commit is made. Where an agent writes the specification, the tests or the code, the checks also run after each of its edits (§s-epaw9sgyaajzn8g). Some of its edits are refused before they are made (§s-83ev4wwesbwnhnp). As long as the specification has the status `approved`, the tests of the system's code and of a project's own checks and generators must pass before a change reaches the project's shared branch. The project's own guidelines (§s-u7tw6m8npxmv5tu) name where the tests run, such as on every push or on a shared server before a merge.

A failed check refuses the change, unless the table that lists the check says otherwise (§s-jau82aq9juv9zzh).

### Reason

Every check but the review is binary, so a refusal requires nobody's judgement. A check that sometimes refuses for a reason nobody can reproduce is bypassed at the first opportunity and never trusted again. The review needs a reviewer, because no script can decide whether code does only what its rules say, whether a rule's implementation really needs no change, or whether a node of the technical appendix agrees with the base specification.

Run after each of an agent's edits, a check finds a mistake where it is made. The order in which the test and the code are written can be seen only edit by edit, since a commit contains the test and the code together.

The tests are not run on a commit, since a test suite takes longer than anyone should wait for a commit. A change not yet shared misleads nobody, so its tests can wait until it is shared. Where they run is the project's choice, since some suites take hours or need what a developer's machine lacks. While the specification is a draft, the work is focused on the specification itself, so no test has to pass.

### Examples

```json
[
  {
    "en": "A project whose tests need a database states in its own guidelines that the tests run on a shared server before a merge. A push from a developer's machine then runs no tests, and the merge waits until the tests pass.",
    "ru": "Проект, тестам которого нужна база данных, называет в собственных guidelines, что тесты запускаются на общем сервере перед слиянием. Тогда push с машины разработчика тестов не запускает, а слияние ждёт, пока тесты пройдут."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-nyh9yk22ba6g77q"
  },
  {
    "type": "cites",
    "to": "s-qmmzf9nksfsa3qp"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-epaw9sgyaajzn8g"
  },
  {
    "type": "cites",
    "to": "s-83ev4wwesbwnhnp"
  },
  {
    "type": "cites",
    "to": "s-u7tw6m8npxmv5tu"
  },
  {
    "type": "cites",
    "to": "s-jau82aq9juv9zzh"
  },
  {
    "type": "cites",
    "to": "s-qzthyh7yqvfhsa2"
  }
]
```

### The current node

Title: What the checks enforce, and when they run

Two things are checked mechanically:
- that the specification conforms to the rules of the guidelines that the main table of checks, or the table of checks of an extension, lists;
- that the specification and the code still agree with each other.

Every check except the review is deterministic.

In the review, an independent reviewer judges the following (§s-nyh9yk22ba6g77q):
- on every commit that changes code: whether that code does what the rules named in the commit say and does nothing that they do not say;
- on a commit whose message states that a rule's implementation needs no change: whether that statement is true;
- on a commit in which a node of the technical appendix (§s-qmmzf9nksfsa3qp) is approved, if the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification: whether the node refines the rules of the base specification that it implements and contradicts no rule of the base specification.

The checks run when a commit is made. Where an agent writes the specification, the tests or the code, the checks also run after each of its edits (§s-epaw9sgyaajzn8g). Some of its edits are refused before they are made (§s-83ev4wwesbwnhnp). As long as the specification has the status `approved`, the tests of the system's code and of a project's own checks and generators must pass before a change reaches the project's shared branch. The project's own guidelines (§s-u7tw6m8npxmv5tu) name where the tests run, such as on every push or on a shared server before a merge.

A failed check refuses the change, unless the table that lists the check says otherwise (§s-jau82aq9juv9zzh).

Reason: Every check but the review is binary, so a refusal requires nobody's judgement. A check that sometimes refuses for a reason nobody can reproduce is bypassed at the first opportunity and never trusted again. The review needs a reviewer, because no script can decide whether code does only what its rules say, whether a rule's implementation really needs no change, or whether a node of the technical appendix agrees with the base specification.

Run after each of an agent's edits, a check finds a mistake where it is made. The order in which the test and the code are written can be seen only edit by edit, since a commit contains the test and the code together.

The tests are not run on a commit, since a test suite takes longer than anyone should wait for a commit. A change not yet shared misleads nobody, so its tests can wait until it is shared. Where they run is the project's choice, since some suites take hours or need what a developer's machine lacks. While the specification is a draft, the work is focused on the specification itself, so no test has to pass.
