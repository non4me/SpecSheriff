# Group 1 drafts for review (generated 2026-11-24T00:59:48.340Z)

## The review of a commit | key s-vp24dqydygztqbt | sid s-vp24dqydygztqbt | tools 7.3.4

### Text

`sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae).

`sheriff review` asks for a verdict only on a commit for which the reviewer makes at least one of the following judgements (§s-epaw9sgyaajzn8g):

the judgement on the code that the commit adds or changes (§s-rd9nftptjuz6bwv);

the judgement on each statement in the commit's message that a rule's implementation needs no change (§s-kgqxg4gunzynwsv);

the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves (§s-4bwa4zepd4nwcv8).

On such a commit, `sheriff review` gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q). The files generated from the specification, which it leaves out of the commit's change, are the files that `sheriff types` writes (§s-a8fn72xa782wvbk). It names to the reviewer each of those files that the commit changes.

### Reason

Each run of the reviewer costs the person who commits (§s-tnz9zgqx8c629a7), so `sheriff review` runs it only on a commit for which a judgement is due.

### Examples

```json
[
  {
    "en": "A commit changes only the wording of a draft rule. It changes no code, holds no statement that a rule's implementation needs no change, and approves no node. So `sheriff review` runs no reviewer, and the commit passes the review. The most likely mistake is to run the reviewer on every commit, which makes the person who commits pay for a run that has nothing to judge.",
    "ru": "Коммит меняет только формулировку правила-черновика. Он не меняет кода, не содержит утверждения, что реализацию правила менять не нужно, и не одобряет ни одного узла. Поэтому `sheriff review` не запускает рецензента, и коммит проходит ревью. Самая вероятная ошибка — запускать рецензента при каждом коммите: тогда тот, кто делает коммит, платит за запуск, которому нечего судить."
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

`sheriff review` refuses a commit in which the reviewer finds that the changed code does something that its rules do not say, or leaves out something that they require (§s-zn4vrdpnv9bch62). Each finding names the rule, the file and the line.

The reviewer makes this judgement on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests. Besides what every review gives (§s-vp24dqydygztqbt), `sheriff review` gives the reviewer the changed code. That is each of the following, whole as the commit leaves it, with its file, its lines and the SpecTags (§s-8xw4mgvpexyvw5q) that bind it:

each symbol (§s-kgbzk2ph9e6jfb4) whose code the commit adds or changes (§s-2x58az67bm6cxq2);

each file bound as a whole that the commit adds or changes;

each test that the commit adds or changes, together with the wording (§s-nyh9yk22ba6g77q) of the rule that its SpecTag names.

The reviewer refuses the commit where any of the following holds:

a changed symbol or file does something, or a changed test checks something, that no rule its SpecTags name states;

the changed code other than tests leaves out something required by a rule that the commit's message or a SpecTag on that code names;

a changed symbol or file carries a SpecTag naming a rule that it does not implement;

a changed symbol or file carries `@spec none` (§s-5z5gnu7pahr82xp), but implements the system's logic (§s-2jcmb9xe9d64t2t).

A finding on code that carries `@spec none` but implements the system's logic names as its rule the rule on how code is bound to its rules (§s-kgbzk2ph9e6jfb4).

### Reason

A SpecTag shows only which rule a piece of code is meant to implement. Whether the code does only what that rule says, including in the unchanged lines around a change, can be told only by reading it.

### Examples

```json
[
  {
    "en": "A commit changes one line of the function `close`, whose SpecTag names a rule saying that an account can be closed only when its balance is zero. An unchanged line of the same function also sends the account holder an email. The reviewer is given the whole function and finds that no rule its SpecTag names states the email. `sheriff review` refuses the commit, naming the rule and that line. The most likely mistake is to give the reviewer only the changed line, so that the email passes.",
    "ru": "Коммит меняет одну строку функции `close`, SpecTag которой называет правило: счёт можно закрыть, только если его баланс равен нулю. Неизменённая строка той же функции ещё и отправляет владельцу счёта письмо. Рецензент получает функцию целиком и находит, что письма не утверждает ни одно правило, которое называет её SpecTag. `sheriff review` отклоняет коммит, называя правило и эту строку. Самая вероятная ошибка — передать рецензенту только изменённую строку: тогда письмо проходит."
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
    "to": "s-nyh9yk22ba6g77q"
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

`sheriff review` refuses a commit whose message, in the reviewer's judgement, falsely states that a rule's implementation needs no change (§s-nudrdn5xvcg262k). Each finding names the rule. `sheriff review` refuses such a commit only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2). Where the commit leaves it a draft, the commit passes this check silently.

A commit's message makes such a statement by a trailer (§s-7gab4ptjt2khfr5). The reviewer makes this judgement for each rule that such a trailer names, whatever the specification's approval status.

For each such rule, `sheriff review` gives the reviewer the tests and the code bound to the rule as the commit leaves them, each whole, with its file, its lines and its SpecTags. They are the tests and the code whose SpecTags name the rule, or name a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to the rule, directly or through a chain of such links (§s-6fw72j65jkqrfpf).

### Reason

Whether a rule's tests and code still fit its new wording depends on what the wording changed, and on all of them, including those that the commit leaves as they were.

### Examples

```json
[
  {
    "en": "A commit corrects a misspelt word in the text of an approved rule and changes none of its tests or code. Its message ends with the trailer `Implementation-Needs-No-Change: s-…`, which names the rule. The reviewer is given both wordings of the rule, its tests and its code, and finds that they do what the new wording says. The commit passes. The most likely mistake is to give the reviewer only the code that the commit changes, which here is none, so that the statement is judged against nothing.",
    "ru": "Коммит исправляет опечатку в тексте одобренного правила и не меняет ни его тестов, ни кода. Его сообщение заканчивается trailer `Implementation-Needs-No-Change: s-…`, который называет это правило. Рецензент получает обе формулировки правила, его тесты и код и находит, что они делают то, что говорит новая формулировка. Коммит проходит. Самая вероятная ошибка — передать рецензенту только код, который меняет коммит, а здесь его нет: тогда утверждение не с чем сверить."
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
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "cites",
    "to": "s-7gab4ptjt2khfr5"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-6fw72j65jkqrfpf"
  }
]
```

### The current node

(none: this node is new)

## The judgement on an approved node of the technical appendix | key new:tools-7-3-review-appendix | sid s-4bwa4zepd4nwcv8 | tools 7.3.4c (new, after "The judgement on a statement that a rule's implementation needs no change")

### Text

`sheriff review` refuses a commit that approves a node of the technical appendix (§s-tj38pvm38nepaf5) where the reviewer finds any of the following in that node (§s-4p9amamvp2bry7b):

it contradicts a rule of the base specification (§s-5x737t9nee4zgaa);

it implements a rule of the base specification without refining it.

Each finding names the node and the rule of the base specification that the finding concerns. `sheriff review` refuses such a commit whatever the specification's approval status (§s-qzthyh7yqvfhsa2).

The reviewer makes this judgement for each node of the technical appendix for which all of the following hold:

the commit adds an entry that approves the node to `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb), whoever made the approval;

the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification.

For each such node, `sheriff review` gives the reviewer the rules of the base specification that the rule on what the reviewer is given lists for it (§s-nyh9yk22ba6g77q). That list names the rules in the same top-level section of the base specification as a rule that the node implements. A top-level section of the base specification is one whose location (§s-kag2m9tzdnduxdx) is a part's name, a slash and one number, such as `base/3` or `requests/2`.

### Reason

An approval holds only the email address that git's configuration gave when the approval was made (§s-v4qus7raqnwzneb). An approval that an agent makes on an owner's behalf (§s-t5uw8zfxzhfdg86) therefore looks the same as the owner's own. So the reviewer judges every such node whose approval a commit adds.

### Examples

```json
[
  {
    "en": "An agent implementing an approved rule that an idle session expires adds a node of the technical appendix that sets the idle limit at 30 minutes. The node has an `implements` link to that rule, and the agent approves it on the owner's behalf. Another rule of the same top-level section keeps a session open while a file is being uploaded, which the node's limit breaks during a long upload. `sheriff review` refuses the commit, naming the node and that rule. The most likely mistake is to skip the review because an agent, not an owner, approved the node.",
    "ru": "Агент, который реализует одобренное правило о том, что неактивная сессия истекает, добавляет узел технического приложения, который задаёт предел неактивности в 30 минут. У узла есть связь `implements` с этим правилом, и агент одобряет его от имени ответственного. Другое правило того же раздела верхнего уровня оставляет сессию открытой, пока загружается файл, а предел из узла нарушает это во время долгой загрузки. `sheriff review` отклоняет коммит, называя узел и это правило. Самая вероятная ошибка — пропустить ревью, потому что узел одобрил агент, а не ответственный."
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
    "to": "s-t5uw8zfxzhfdg86"
  }
]
```

### The current node

(none: this node is new)

## How a commit message states that a rule's implementation needs no change | key new:tools-9-no-change-trailer | sid s-7gab4ptjt2khfr5 | tools 9 (new, after the new section "SpecTags in the code and the tests")

### Text

A commit's message states that a rule's implementation needs no change (§s-ddd2e96uke4y83j, §s-nudrdn5xvcg262k) by the trailer `Implementation-Needs-No-Change: <sid>`, in which `<sid>` is the sid of that rule. The message holds one such trailer for each such rule.

The SpecSheriff tools read the trailers of a message as `git interpret-trailers --parse` reads them. They read a trailer with that key as such a statement only where its value is a single sid.

### Reason

A trailer is the form that git itself gives a statement about a commit, so git and other tools read it without parsing the message's prose.

### Examples

```json
[
  {
    "en": "A commit changes the text of an approved rule only to correct a misspelt word. Its message ends with the line `Implementation-Needs-No-Change: s-…`, which names the rule. The most likely mistake is to write the statement into the message's prose, such as “the code needs no change for s-…”, which the SpecSheriff tools do not read.",
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

the commit's change, less the files generated from the specification;

the wording of each rule or term (§s-khqsmy6mhejkrhg) that the commit's message names;

the wording of each rule to which a SpecTag (§s-8xw4mgvpexyvw5q) binds code or a test that the commit adds or changes;

for each rule whose implementation, according to the commit's message, needs no change: the rule's wording as it was before the commit and as it is after it, and the tests and the code bound to the rule, directly or through a chain of `implements` links (§s-sn6au3vcr9uy5pm), as they are after it;

for each node of the technical appendix (§s-qmmzf9nksfsa3qp) that is approved in the commit and has an `implements` link to a rule of the base specification (§s-5x737t9nee4zgaa):

the node's wording;

the wording of each rule of the base specification that the node implements, that has a link to or from such a rule, or that is in the same top-level section of the base specification as such a rule.

A node's wording here is its title, its text, its reason, its examples and the fields its kind adds, as an approval covers them (§s-5ah25f6gy99panq).

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
