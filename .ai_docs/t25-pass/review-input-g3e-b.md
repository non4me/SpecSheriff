# Group 3 drafts of round e for review (generated 2026-11-24T14:24:39.098Z)

## What the checks enforce, and when they run | key proposal:s-m4h279nbaqkpa3t | sid s-m4h279nbaqkpa3t | spec 1.6.1

### Text

Two things are checked mechanically:

that the specification conforms to the rules of the guidelines that the main table of checks, or the table of checks of an extension, lists;

that the specification and the code still agree with each other.

Every check except the review is deterministic.

In the review, an independent reviewer judges the following (§s-nyh9yk22ba6g77q):

on every commit that changes code: whether that code does what the rules named in the commit say and does nothing that they do not say;

on every commit that adds or changes a comment in the code or in a test: whether each such comment is consistent with the code that it describes and with the rules that this code implements;

on a commit whose message states that a rule's implementation needs no change: whether that statement is true;

on a commit in which a node of the technical appendix (§s-qmmzf9nksfsa3qp) is approved, if the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification: whether the node refines the rules of the base specification that it implements and contradicts no rule of the base specification.

The checks run when a commit is made. Where an agent writes the specification, the tests or the code, the checks also run after each of its edits (§s-epaw9sgyaajzn8g). Some of its edits are refused before they are made (§s-83ev4wwesbwnhnp). As long as the specification has the status `approved`, the tests of the system's code and of a project's own checks and generators must pass before a change reaches the project's shared branch. The project's own guidelines (§s-u7tw6m8npxmv5tu) name where the tests run, such as on every push or on a shared server before a merge.

A failed check refuses the change, unless the table that lists the check says otherwise (§s-jau82aq9juv9zzh).

### Reason

Every check but the review is binary, so a refusal requires nobody's judgement. A check that sometimes refuses for a reason nobody can reproduce is bypassed at the first opportunity and never trusted again. The review needs a reviewer, because no script can decide whether code does only what its rules say, whether a comment agrees with the code and its rules, whether a rule's implementation really needs no change, or whether a node of the technical appendix agrees with the base specification.

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

## What the reviewer is given | key proposal:s-nyh9yk22ba6g77q-g3 | sid s-nyh9yk22ba6g77q | spec 10.4

### Text

The SpecSheriff tools give the independent reviewer (§s-m4h279nbaqkpa3t) of a commit the following:

the commit's message;

the commit's change, excluding the files generated from the specification;

the wording of each rule or term (§s-khqsmy6mhejkrhg) that the commit's message names;

the wording of each rule that a SpecTag (§s-8xw4mgvpexyvw5q) binds to code or a test that the commit adds or changes, or in which the commit adds or changes a comment;

for each rule whose implementation, according to the commit's message, needs no change: the rule's wording as it was before the commit and as it is after it, and the tests and the code bound to the rule, directly or through a chain of `implements` links (§s-sn6au3vcr9uy5pm), as they are after it;

for each node of the technical appendix (§s-qmmzf9nksfsa3qp) that is approved in the commit and has an `implements` link to a rule of the base specification (§s-5x737t9nee4zgaa):

the node's wording;

the wording of each rule of the base specification that the node implements, that has a link to or from such a rule, or that is in the same top-level section of the base specification as such a rule.

In this rule, a node's wording is its title, its text, its reason, its examples and the fields its kind adds, as an approval covers them (§s-5ah25f6gy99panq).

The SpecSheriff tools give the reviewer nothing from the session in which the change was made. They tell the reviewer that each file left out of the change is generated from the specification. The reviewer treats what a rule requires of generated code as implemented by that code.

### Reason

The reviewer makes the judgements that no deterministic check can make: whether code does only what its rules say, whether a comment agrees with the code and its rules, whether a rule's implementation really needs no change, and whether an approved node of the technical appendix agrees with the base specification. It can judge only from what it is shown. Shown what each judgement needs, and nothing of what the author of the change meant, it judges by the rules alone.

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
  }
]
```

### The wording the owner agreed to (proposal:s-nyh9yk22ba6g77q)

Title: What the reviewer is given

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

Reason: The reviewer makes the judgements that no deterministic check can make: whether code does only what its rules say, whether a rule's implementation really needs no change, and whether an approved node of the technical appendix agrees with the base specification. It can judge only from what it is shown. Shown what each judgement needs, and nothing of what the author of the change meant, it judges by the rules alone.

## undefined | key proposal:row-10-1-43b | sid s-td4e3rdga6azav9 | spec 10.1.43b (new row of the main table of checks, after row 10.1.43a)

### Text

Each comment that a commit adds or changes in the code or in a test is consistent with the code that it describes and with the rules that this code implements

### Reason

(none)

### Outgoing links

```json
[
  {
    "type": "checks",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "checks",
    "to": "s-nyh9yk22ba6g77q"
  }
]
```

### The current node

(none: this node is new)

## The review of a commit | key proposal:s-vp24dqydygztqbt | sid s-vp24dqydygztqbt | tools 7.3.4

### Text

`sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae). Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv). In that case, it refuses the commit only where the verdict lists at least one other finding.

`sheriff review` asks for a verdict only on a commit for which the reviewer must make at least one of the following judgements (§s-epaw9sgyaajzn8g):

the judgement on the code that the commit adds or changes (§s-rd9nftptjuz6bwv);

the judgement on each comment that the commit adds or changes (§s-7vpsdsy8dpqdy6r);

the judgement on each statement in the commit's message that a rule's implementation needs no change (§s-kgqxg4gunzynwsv);

the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves and that implements a rule of the base specification (§s-5x737t9nee4zgaa, §s-4bwa4zepd4nwcv8).

Where `sheriff review` asks for a verdict, it gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q). The files generated from the specification, which `sheriff review` leaves out of the commit's change, are the files that `sheriff types` writes (§s-a8fn72xa782wvbk). `sheriff review` tells the reviewer which of those files the commit changes.

### Reason

Each run of the reviewer is paid for by the user who commits (§s-tnz9zgqx8c629a7), so `sheriff review` runs the reviewer only on a commit that needs one of the reviewer's judgements.

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
  },
  {
    "type": "cites",
    "to": "s-5x737t9nee4zgaa"
  },
  {
    "type": "cites",
    "to": "s-7vpsdsy8dpqdy6r"
  }
]
```

### The wording the owner agreed to (s-vp24dqydygztqbt)

Title: The review of a commit

`sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae). Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv). In that case, it refuses the commit only where the verdict lists at least one other finding.

`sheriff review` asks for a verdict only on a commit for which the reviewer must make at least one of the following judgements (§s-epaw9sgyaajzn8g):

the judgement on the code that the commit adds or changes (§s-rd9nftptjuz6bwv);

the judgement on each statement in the commit's message that a rule's implementation needs no change (§s-kgqxg4gunzynwsv);

the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves and that implements a rule of the base specification (§s-5x737t9nee4zgaa, §s-4bwa4zepd4nwcv8).

Where `sheriff review` asks for a verdict, it gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q). The files generated from the specification, which `sheriff review` leaves out of the commit's change, are the files that `sheriff types` writes (§s-a8fn72xa782wvbk). `sheriff review` tells the reviewer which of those files the commit changes.

Reason: Each run of the reviewer is paid for by the user who commits (§s-tnz9zgqx8c629a7), so `sheriff review` runs the reviewer only on a commit that needs one of the reviewer's judgements.

## The reviewer's verdict | key proposal:new-tools-10-verdict | sid s-68ds99w8wd67aae | tools 10.2

### Text

`sheriff review` refuses a commit on which it asks for a verdict (§s-vp24dqydygztqbt) unless the runner (§s-xr5xxa9cxf2mq5u) gives a verdict that `sheriff review` can read (§s-94k7b6r5kf65udf).

`sheriff review` gives the runner's CLI the schema of the verdict. The runner's CLI answers with a JSON object that conforms to that schema. The verdict passes or refuses the commit. It lists its findings. Each finding names the sids of the nodes that it concerns and the problem. A finding that concerns code also names the file and, where the problem lies at a line, that line. Each finding also names the judgement that it belongs to (§s-vp24dqydygztqbt).

`sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict. A verdict that passes the commit lists no finding other than findings on comments (§s-7vpsdsy8dpqdy6r). A verdict that refuses the commit lists at least one finding that is not on a comment.

### Reason

A verdict whose meaning `sheriff review` had to guess, such as a pass that lists a finding on code, would let `sheriff review` decide the outcome of the commit in place of the independent reviewer (§s-m4h279nbaqkpa3t).

### Examples

```json
[
  {
    "en": "The runner answers with a verdict that passes the commit and lists one finding on code. That answer is not a verdict that `sheriff review` can read, so `sheriff review` refuses the commit. The most likely mistake is to pass the commit and drop the finding, which means deciding for the reviewer what it meant.",
    "ru": "Runner отвечает вердиктом, который пропускает коммит и перечисляет одно замечание о коде. Этот ответ — не вердикт, который `sheriff review` может прочитать, поэтому `sheriff review` отклоняет коммит. Самая вероятная ошибка — пропустить коммит и отбросить замечание: так инструмент решает за рецензента, что тот имел в виду.",
    "change": "Было: «…и перечисляет одно замечание». Теперь «одно замечание о коде»: пропуск с замечанием о комментарии — читаемый вердикт."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-94k7b6r5kf65udf"
  },
  {
    "type": "cites",
    "to": "s-vp24dqydygztqbt"
  },
  {
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  },
  {
    "type": "cites",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-7vpsdsy8dpqdy6r"
  }
]
```

### The wording the owner agreed to (new:tools-10-verdict)

Title: The reviewer's verdict

`sheriff review` refuses a commit on which it asks for a verdict (§s-vp24dqydygztqbt) unless the runner (§s-xr5xxa9cxf2mq5u) gives a verdict that `sheriff review` can read (§s-94k7b6r5kf65udf).

`sheriff review` gives the runner's CLI the schema of the verdict. The runner's CLI answers with a JSON object that conforms to that schema. The verdict passes or refuses the commit. It lists its findings. Each finding names the sids of the nodes that it concerns and the problem. A finding that concerns code also names the file and, where the problem lies at a line, that line. Each finding also names the judgement that it belongs to (§s-vp24dqydygztqbt).

`sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict and either passes the commit with no finding or refuses it with at least one.

Reason: A verdict whose meaning `sheriff review` had to guess, such as a pass that lists a finding, would let `sheriff review` decide the outcome of the commit in place of the independent reviewer (§s-m4h279nbaqkpa3t).

## The judgement on a comment that a commit adds or changes | key new:tools-7-3-review-comments | sid s-7vpsdsy8dpqdy6r | tools 7.3.4d (new, after "The judgement on a node of the technical appendix that a commit approves")

### Text

`sheriff review` reports as a warning each finding of the independent reviewer (§s-m4h279nbaqkpa3t) on a comment that the commit adds or changes (§s-td4e3rdga6azav9). It refuses no commit because of such a finding. Each such finding names the file, the line and the problem.

The reviewer judges the comments that the SpecSheriff tools leave out when they read a line of code (§s-u6mj5yv8ngnz79v). A commit adds or changes such a comment where it adds a line that holds part of the comment. The reviewer judges the text of a comment other than its SpecTags (§s-8xw4mgvpexyvw5q), since a change to a SpecTag is a change to the code (§s-9j2mmnuuwmx5ksn).

The reviewer makes this judgement on every commit that adds or changes such a comment, including a commit that changes no code. Besides what `sheriff review` gives the reviewer in every review (§s-vp24dqydygztqbt), it gives the reviewer each symbol (§s-kgbzk2ph9e6jfb4), test or file bound as a whole that holds such a comment. Each is given in full, as the commit leaves it, with its file, its lines and the SpecTags that bind it.

The reviewer finds a problem with a comment where either of the following holds:

the comment states something that the code it describes does not do;

the comment contradicts a rule that a SpecTag on that code names.

### Reason

A comment that no longer matches its code misleads whoever reads the code next, and only reading both can show the mismatch. A comment does not change what the system does, so a problem with one is worth a warning but not a refused commit.

### Examples

```json
[
  {
    "en": "A commit changes only the comment above `roundPrice`, which now says that the function rounds halves up, while the function rounds them to the nearest even number. `sheriff review` reports the reviewer's finding as a warning and lets the commit pass. The most likely mistake is to refuse the commit, as for a defect in the code.",
    "ru": "Коммит меняет только комментарий над `roundPrice`: теперь он говорит, что функция округляет половины вверх, а она округляет их до ближайшего чётного. `sheriff review` сообщает замечание рецензента как предупреждение и пропускает коммит. Самая вероятная ошибка — отклонить коммит, как при дефекте в коде."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-td4e3rdga6azav9"
  },
  {
    "type": "cites",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-u6mj5yv8ngnz79v"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-9j2mmnuuwmx5ksn"
  },
  {
    "type": "cites",
    "to": "s-vp24dqydygztqbt"
  },
  {
    "type": "cites",
    "to": "s-kgbzk2ph9e6jfb4"
  }
]
```

### The current node

(none: this node is new)
