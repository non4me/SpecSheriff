# Group 1 drafts for review (generated 2026-11-24T02:21:17.842Z)

## The review of a commit | key s-vp24dqydygztqbt | sid s-vp24dqydygztqbt | tools 7.3.4

### Text

`sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae). Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv).

`sheriff review` asks for a verdict only on a commit for which the reviewer makes at least one of the following judgements (§s-epaw9sgyaajzn8g):

the judgement on the code that the commit adds or changes (§s-rd9nftptjuz6bwv);

the judgement on each statement in the commit's message that a rule's implementation needs no change (§s-kgqxg4gunzynwsv);

the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves (§s-4bwa4zepd4nwcv8).

Where `sheriff review` asks for a verdict, it gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q). The files generated from the specification, which `sheriff review` leaves out of the commit's change, are the files that `sheriff types` writes (§s-a8fn72xa782wvbk). `sheriff review` tells the reviewer which of those files the commit changes.

### Reason

Each run of the reviewer is paid for by the user who commits (§s-tnz9zgqx8c629a7), so `sheriff review` runs the reviewer only on a commit that needs one of its judgements.

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

`sheriff review` refuses a commit where the independent reviewer (§s-m4h279nbaqkpa3t) refuses it for a defect in the code that the commit adds or changes (§s-zn4vrdpnv9bch62). Each finding names the rule that it concerns, the file and the line.

The reviewer judges the changed code on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests. Besides what `sheriff review` gives the reviewer in every review (§s-vp24dqydygztqbt), it gives the reviewer the changed code other than the files generated from the specification. That is each of the following, in full, as the commit leaves it, with its file, its lines and the SpecTags (§s-8xw4mgvpexyvw5q) that bind it:

each symbol (§s-kgbzk2ph9e6jfb4) whose code the commit adds or changes (§s-2x58az67bm6cxq2);

each file that the commit adds or changes and that is bound as a whole;

each test that the commit adds or changes.

The reviewer refuses the commit where any of the following holds:

a changed symbol or file whose SpecTags name rules does something that none of those rules states;

a changed test checks something that the rule its SpecTag names does not state;

the changed code other than tests leaves out something required by a rule that a SpecTag on that code names, or that the commit's message names anywhere other than in an `Implementation-Needs-No-Change` trailer (§s-7gab4ptjt2khfr5);

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

`sheriff review` refuses a commit whose message, in the judgement of the independent reviewer (§s-m4h279nbaqkpa3t), falsely states that a rule's implementation needs no change (§s-nudrdn5xvcg262k). Each finding names the rule. `sheriff review` refuses a commit on such a finding only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2). Where the commit leaves it a draft, the commit passes this check silently.

A commit's message states that a rule's implementation needs no change by means of a trailer (§s-7gab4ptjt2khfr5). The reviewer judges the statement about each rule that such a trailer names, whatever the specification's approval status. For each such rule, `sheriff review` gives the reviewer the tests and the code bound to the rule (§s-6fw72j65jkqrfpf) as the commit leaves them, each in full, with its file, its lines and its SpecTags (§s-8xw4mgvpexyvw5q).

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

Each finding names the node and the rule of the base specification that the finding concerns. `sheriff review` refuses a commit on such a finding whatever the specification's approval status (§s-qzthyh7yqvfhsa2).

The reviewer judges each node of the technical appendix for which all of the following hold:

the commit adds to `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb) an entry that approves the node, whoever made the approval;

the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification.

In the rule on what the reviewer is given (§s-nyh9yk22ba6g77q), a top-level section of the base specification is a section whose location (§s-kag2m9tzdnduxdx) consists of the name of a part, a slash and a single number, such as `base/3` or `requests/2`. For a rule that is in no section (§s-qmmzf9nksfsa3qp), the rules in the same top-level section are the other rules of the same part of the base specification that are in no section either.

### Reason

An approval names whoever made it only by the email address that git was configured with (§s-v4qus7raqnwzneb). An approval that an agent makes on an owner's behalf (§s-t5uw8zfxzhfdg86) therefore looks the same as the owner's own approval. So the reviewer judges every node of the technical appendix that implements a rule of the base specification, whoever approved it.

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

## The reviewer's verdict | key new:tools-10-verdict | sid s-68ds99w8wd67aae | tools 10.2 (new)

### Text

`sheriff review` refuses a commit on which it asks for a verdict (§s-vp24dqydygztqbt) unless the runner (§s-xr5xxa9cxf2mq5u) gives a verdict that `sheriff review` can read (§s-94k7b6r5kf65udf).

The runner's CLI is given the schema of the verdict. It answers with a JSON object that conforms to that schema. The verdict passes or refuses the commit. It lists its findings. Each finding names the sids of the nodes that it concerns and the problem. A finding that concerns code also names the file and, where the problem lies at a line, that line. Each finding also names the judgement that it belongs to (§s-vp24dqydygztqbt).

`sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict and either passes the commit with no finding or refuses it with at least one.

### Reason

A verdict whose meaning `sheriff review` had to guess, such as a pass that lists a finding, would let `sheriff review` decide the commit in place of the independent reviewer (§s-m4h279nbaqkpa3t).

### Examples

```json
[
  {
    "en": "The runner answers with a verdict that passes the commit and lists one finding. That answer is not a verdict that `sheriff review` can read, so `sheriff review` refuses the commit. The most likely mistake is to pass the commit and drop the finding, which means deciding for the reviewer what it meant.",
    "ru": "Runner отвечает вердиктом, который пропускает коммит и перечисляет одно замечание. Этот ответ — не вердикт, который `sheriff review` может прочитать, поэтому `sheriff review` отклоняет коммит. Самая вероятная ошибка — пропустить коммит и отбросить замечание: так инструмент решает за рецензента, что тот имел в виду."
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
  }
]
```

### The current node

(none: this node is new)

## The list of code that no SpecTag binds | key proposal:s-weuyx98r7c923ab | sid s-weuyx98r7c923ab | tools 2.11

### Text

`sheriff untagged` lists, by file and symbol, the system's code (§s-hheus6f395ynqvc) that no SpecTag (§s-8xw4mgvpexyvw5q) binds (§s-9rtrj24myzjvshu). The check for code without a SpecTag names this command in its warning and in its refusal (§s-kkbqcb9xrpaepwn).

### Reason

The check for code without a SpecTag covers all such code in one warning, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn). `sheriff untagged` lists that code symbol by symbol for whoever has to bind each symbol to the rules it implements.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-kkbqcb9xrpaepwn"
  },
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
    "to": "s-9rtrj24myzjvshu"
  }
]
```

### The current node

(none: this node is new)
