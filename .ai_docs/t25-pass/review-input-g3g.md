# Group 3 drafts of round g for review (generated 2026-11-24T15:09:58.087Z)

## undefined | key proposal:row-10-1-43 | sid s-zn4vrdpnv9bch62 | spec 10.1.43

### Text

The system's code (§s-hheus6f395ynqvc) that a commit changes outside the files generated from the specification (§s-qyjw8xez6t6adc3) does what the rules that the commit names say, and nothing they do not

### Reason

(none)

### Outgoing links

```json
[
  {
    "type": "checks",
    "to": "s-nyh9yk22ba6g77q"
  },
  {
    "type": "checks",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-qyjw8xez6t6adc3"
  }
]
```

### The current node

(none: this node is new)

## The review of a commit | key proposal:s-vp24dqydygztqbt | sid s-vp24dqydygztqbt | tools 7.3.4

### Text

`sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae). Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv). In that case, it refuses the commit only where the verdict lists a finding on code or on a node that the commit approves.

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

## A commit whose review cannot be carried out is refused | key proposal:s-94k7b6r5kf65udf | sid s-94k7b6r5kf65udf | spec 10.5

### Text

The SpecSheriff tools refuse a commit for which the reviewer must make at least one judgement (§s-m4h279nbaqkpa3t) unless the reviewer gives an answer that the tools can read. The refusal says why the review could not be carried out.

### Reason

A review that lets a commit through whenever it could not be carried out is a review nobody can rely on.

### Examples

```json
[
  {
    "en": "No reviewer is installed.",
    "ru": "Рецензент не установлен."
  },
  {
    "en": "The reviewer's run does not end within its time limit.",
    "ru": "Запуск рецензента не укладывается в отведённое время."
  },
  {
    "en": "The run ends with an error.",
    "ru": "Запуск завершается ошибкой."
  },
  {
    "en": "The answer passes the commit but reports a finding on code.",
    "ru": "Ответ пропускает коммит, но называет замечание о коде.",
    "change": "Было: «The answer passes the commit but reports a finding». Теперь «a finding on code»: ответ, который пропускает коммит с замечанием о комментарии, — читаемый вердикт."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-m4h279nbaqkpa3t"
  }
]
```

### The current node

Title: A commit whose review cannot be carried out is refused

The SpecSheriff tools refuse a commit for which the reviewer must make at least one judgement (§s-m4h279nbaqkpa3t) unless the reviewer gives an answer that the tools can read. The refusal says why the review could not be carried out.

Reason: A review that lets a commit through whenever it could not be carried out is a review nobody can rely on.
