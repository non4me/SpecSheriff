# Group 3 drafts of round f for review (generated 2026-11-24T14:50:08.917Z)

## What the reviewer is given | key proposal:s-nyh9yk22ba6g77q-g3 | sid s-nyh9yk22ba6g77q | spec 10.4

### Text

The SpecSheriff tools give the independent reviewer (§s-m4h279nbaqkpa3t) of a commit the following:

the commit's message;

the commit's change, excluding the files generated from the specification;

the wording of each rule or term (§s-khqsmy6mhejkrhg) that the commit's message names;

the wording of each rule that a SpecTag (§s-8xw4mgvpexyvw5q) binds to code or a test that the commit adds or changes, or that holds, or lies directly below, a comment that the commit adds or changes;

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

## The review of a commit | key proposal:s-vp24dqydygztqbt | sid s-vp24dqydygztqbt | tools 7.3.4

### Text

`sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae). Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv). In that case, it refuses the commit only where the verdict also lists a finding on code or on a node that the commit approves.

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
    "en": "A commit changes only the wording of a draft rule. It changes no code and no comment in the code, its message contains no statement that a rule's implementation needs no change, and it approves no node. So `sheriff review` does not run the reviewer, and the commit passes the review. The most likely mistake is to run the reviewer on every commit, which makes the user who commits pay for a run that has nothing to judge.",
    "ru": "Коммит меняет только формулировку правила-черновика. Он не меняет ни кода, ни комментариев в коде, его сообщение не содержит утверждения, что реализацию правила менять не нужно, и он не одобряет ни одного узла. Поэтому `sheriff review` не запускает рецензента, и коммит проходит ревью. Самая вероятная ошибка — запускать рецензента при каждом коммите: тогда тот, кто делает коммит, платит за запуск, которому нечего судить.",
    "change": "Было: «It changes no code, …». Добавлено «and no comment in the code»: суждение о комментарии — четвёртое основание запустить рецензента."
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

`sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict and that does one of the following:

passes the commit and lists only findings that belong to the judgement on comments (§s-7vpsdsy8dpqdy6r), if it lists any;

refuses the commit and lists at least one finding that belongs to another judgement.

### Reason

A verdict whose meaning `sheriff review` had to guess, such as a verdict that passes the commit and lists a finding on code, would let `sheriff review` decide the outcome of the commit in place of the independent reviewer (§s-m4h279nbaqkpa3t).

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

`sheriff review` reports each finding of the independent reviewer (§s-m4h279nbaqkpa3t) on a comment that the commit adds or changes (§s-td4e3rdga6azav9) only as a warning. Each such finding names the file, the line and the problem, and also each rule that the comment contradicts.

The reviewer judges the comments in the system's code (§s-hheus6f395ynqvc), other than in the files generated from the specification (§s-a8fn72xa782wvbk). In a file whose syntax trees the SpecSheriff tools build (§s-u6mj5yv8ngnz79v), the comments are what the SpecSheriff tools leave out of the trees. In any other file, the reviewer itself tells the comments apart from the code.

A commit adds or changes a comment where the commit adds a line that holds part of the comment. It also changes a comment where it removes a line that held part of the comment and leaves the rest of the comment in place. The reviewer judges the text of a comment, except its SpecTags (§s-8xw4mgvpexyvw5q), since a change to a SpecTag is a change to the code (§s-9j2mmnuuwmx5ksn).

The reviewer makes the judgement on comments on every commit that adds or changes one, including a commit that changes no code. Besides what it gives the reviewer in every review (§s-vp24dqydygztqbt), `sheriff review` gives the reviewer the code that each such comment describes. That code is the following, in full, as the commit leaves it, with its file, its lines and the SpecTags that bind it:

for a comment in a file bound as a whole: that file;

for a comment in a symbol (§s-kgbzk2ph9e6jfb4) or a test, or directly above one (§s-33fw3ga4ctd94dq): that symbol or test;

for any other comment: the symbol or the test that follows it, or the whole file where none follows it.

The reviewer finds a problem with a comment where either of the following holds:

the comment states something that the code it describes does not do;

the comment contradicts a rule that a SpecTag on that code names.

### Reason

A comment that no longer matches its code misleads whoever reads the code next. Only a reader of both the comment and the code can see the mismatch. A comment does not change what the system does, so a problem with one warrants a warning, but not a refusal of the commit.

### Examples

```json
[
  {
    "en": "A commit changes only the comment above `roundPrice`, which now says that the function rounds halves up, while the function rounds them to the nearest even number. `sheriff review` reports the reviewer's finding as a warning and lets the commit pass. The most likely mistake is to refuse the commit, as `sheriff review` does for a defect in the code.",
    "ru": "Коммит меняет только комментарий над `roundPrice`: теперь он говорит, что функция округляет половины вверх, а она округляет их до ближайшего чётного. `sheriff review` сообщает замечание рецензента как предупреждение и пропускает коммит. Самая вероятная ошибка — отклонить коммит, как `sheriff review` делает при дефекте в коде."
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
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
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
  },
  {
    "type": "cites",
    "to": "s-33fw3ga4ctd94dq"
  }
]
```

### The current node

(none: this node is new)
