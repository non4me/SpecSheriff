# Group 6 drafts for the review (generated 2026-11-24T23:28:27.210Z)

## Turning the `strict` flag on | key new:tools-2-strict | sid s-nxgkp988mej79eg | tools 2.10c (new, after “Approving the specification”)

### Text

`sheriff settings` refuses to turn the `strict` flag on (§s-q3pfzyaxvpr2zj2) where a check that the flag makes stricter would refuse a commit or a push that changes nothing, if the specification were approved and the flag were on. The refusal names, for each check that would refuse, the command that lists what that check finds (§s-chsfpkgpmfk4fft). Where no such check would refuse, `sheriff settings` records the entry that turns the flag on (§s-d3nkw9b6mn98vuw).

The checks that the `strict` flag makes stricter, and the cases in which each would refuse such a commit, are the following:

the check of code and tests outside the commit (§s-3xx2eukc8gtd2tx) that no SpecTag (§s-8xw4mgvpexyvw5q) binds, where `sheriff untagged` would list any code (§s-weuyx98r7c923ab);

each of the project's own checks (§s-2fau85dfyyeq66m), which the rule that lists it may make stricter (§s-q3pfzyaxvpr2zj2), where it refuses the change when `sheriff validate --strict` runs it (§s-7pk89t8z6wymmj9).

`sheriff settings` records an entry that turns the `strict` flag off without running any check.

### Reason

The flag lets the owners make the checks stricter by an act of their own without stopping all work when they do (§s-q3pfzyaxvpr2zj2). Turned on while such a check would refuse a commit that changes nothing, the flag would make every commit fail until that check passed.

### Examples

```json
[
  {
    "en": "The specification is a draft, and no SpecTag binds two functions of an old file. An owner runs `sheriff settings strict on`. `sheriff settings` refuses to turn the flag on and names `sheriff untagged`, which lists those functions. The most likely mistake is to turn the flag on because the specification is a draft. The first commit after the specification is approved is then refused for code that it does not change.",
    "ru": "Спецификация — черновик, и две функции старого файла не связывает ни один SpecTag. Ответственный запускает `sheriff settings strict on`. `sheriff settings` отказывается включить флаг и называет `sheriff untagged`, которая перечисляет эти функции. Самая вероятная ошибка — включить флаг, потому что спецификация — черновик. Тогда первый коммит после одобрения спецификации отвергается из-за кода, которого он не меняет."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-q3pfzyaxvpr2zj2"
  },
  {
    "type": "cites",
    "to": "s-d3nkw9b6mn98vuw"
  },
  {
    "type": "cites",
    "to": "s-chsfpkgpmfk4fft"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-3xx2eukc8gtd2tx"
  },
  {
    "type": "cites",
    "to": "s-weuyx98r7c923ab"
  },
  {
    "type": "cites",
    "to": "s-2fau85dfyyeq66m"
  },
  {
    "type": "cites",
    "to": "s-7pk89t8z6wymmj9"
  }
]
```

### The current node

(none: this node is new)

## How a project's own check is run | key proposal:s-7pk89t8z6wymmj9-g6 | sid s-7pk89t8z6wymmj9 | tools 7.1.23

### Text

Where a check that a project's own guidelines add (§s-2fau85dfyyeq66m) fails, `sheriff validate` refuses the change. Where the rule that lists the check says that the check's failure is only reported, `sheriff validate` reports the failure instead (§s-ujm7nfxkk9j3464). The refusal or the report names the check and shows what the check printed to its standard output and its standard error. Where the check printed nothing, the refusal or the report shows the check's exit status.

`sheriff validate` runs each of the project's own checks with the command that `sheriff.config.json` names for it (§s-zefk589ykh37b8u). The check runs in the directory in which `sheriff validate` runs. On a commit, that directory holds what the commit contains (§s-477gtdrkw34dzxw). On its standard input, the check receives the model of the specification in the form that `sheriff json` prints (§s-w6gybeqn2ttydqx). A check passes only if its process exits with status zero.

In its `TextRule.list` (§s-eferktypcj7njt5), the rule that `sheriff.config.json` names for a check lists the check as a member whose value (§s-5hb9k2e34dgn284) is the check's name. `sheriff validate` reads that rule in its last approved wording (§s-a8fn72xa782wvbk). Where the rule, in that wording, lists no member whose value is the check's name, `sheriff validate` refuses the change. The refusal names the check and the rule, and says that the rule's last approved wording does not list the check.

Where that member is an object whose `onFailure` is `reported`, the rule says that the check's failure is only reported. Where that member's `onFailure` is `reportedUnlessStrict`, `sheriff validate` reports the check's failure while the specification's `strict` flag (§s-q3pfzyaxvpr2zj2) is off, and refuses the change while the flag is on. It reads the flag in the model of the specification that it gives the check.

`sheriff validate` runs the project's own checks only after the files of the specification have passed the check for a key written more than once (§s-7zqsstgnuc772ba) and the validation against their schema (§s-xzcw3hv4hmxz7h7). It runs them before the rest of its checks (§s-pcnyfp7gev7syax). It makes the rest of its checks regardless of what the project's own checks find.

`sheriff validate` refuses the change where one of the project's own checks adds, changes or removes a file in the directory in which the check runs, other than a file that git ignores (§s-vj67ztqkuhxbv7s). The refusal names the check and each such file.

Given the option `--strict`, `sheriff validate` gives each of the project's own checks a model of the specification in which the specification is approved and the specification's `strict` flag is on (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). It does so regardless of how the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) set the approval status and the flag. The other checks of `sheriff validate` give the same results with or without the option.

Before `sheriff settings` records an approval of the specification (§s-m59dqwkw2e96wne), it runs the project's own checks (§s-chsfpkgpmfk4fft, §s-qzthyh7yqvfhsa2). It gives them a model in which the specification is approved and the `strict` flag has the value that the entries in `sheriff.config.json` set. Before `sheriff settings` turns the `strict` flag on (§s-nxgkp988mej79eg), it runs the project's own checks as `sheriff validate --strict` runs them.

`sheriff validate` runs the project's own checks regardless of whether the specification is approved or a draft (§s-ujm7nfxkk9j3464).

### Reason

Whenever `sheriff validate` makes its checks of the SpecSheriff guidelines, it also runs a project's own checks, on the same files. Such a check therefore binds every participant, rather than depending on whoever remembers to run it (§s-2fau85dfyyeq66m).

### Examples

```json
[
  {
    "en": "The rule that lists the project's own checks has `name` as its `TextRule.list.property`, and one of its members is `{\"name\": \"spelling\", \"onFailure\": \"reported\"}`. The check `spelling` finds a misspelt word in a node's text, prints the node's sid and exits with status 1. `sheriff validate` reports the failure, showing the sid, and the commit passes. The most likely mistake is to refuse the commit because the check's exit status is not zero.",
    "ru": "У правила, которое перечисляет собственные проверки проекта, `TextRule.list.property` — `name`, и один из его элементов — `{\"name\": \"spelling\", \"onFailure\": \"reported\"}`. Проверка `spelling` находит слово с опечаткой в тексте узла, печатает sid узла и завершается с кодом 1. `sheriff validate` сообщает о неудаче, показывая sid, и коммит проходит. Самая вероятная ошибка — отвергнуть коммит потому, что код завершения проверки не равен нулю."
  },
  {
    "en": "The member of the check `spelling` is `{\"name\": \"spelling\", \"onFailure\": \"reportedUnlessStrict\"}`. While the `strict` flag is off, `sheriff validate` reports each misspelt word, and the commit passes. An owner runs `sheriff settings strict on`, and the check fails when `sheriff validate --strict` runs it, so `sheriff settings` refuses to turn the flag on and names `sheriff validate --strict`. The most likely mistake is to read the flag from the entries in `sheriff.config.json` rather than from the model that the check receives. The flag is then turned on, and the next commit is refused.",
    "ru": "Элемент проверки `spelling` — `{\"name\": \"spelling\", \"onFailure\": \"reportedUnlessStrict\"}`. Пока флаг `strict` выключен, `sheriff validate` сообщает о каждом слове с опечаткой, и коммит проходит. Ответственный запускает `sheriff settings strict on`, и проверка не проходит, когда её запускает `sheriff validate --strict`, поэтому `sheriff settings` отказывается включить флаг и называет `sheriff validate --strict`. Самая вероятная ошибка — читать флаг из записей в `sheriff.config.json`, а не из модели, которую получает проверка. Тогда флаг включается, и следующий коммит отвергается."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-ujm7nfxkk9j3464"
  },
  {
    "type": "implements",
    "to": "s-vj67ztqkuhxbv7s"
  },
  {
    "type": "implements",
    "to": "s-2fau85dfyyeq66m"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-w6gybeqn2ttydqx"
  },
  {
    "type": "cites",
    "to": "s-eferktypcj7njt5"
  },
  {
    "type": "cites",
    "to": "s-5hb9k2e34dgn284"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  },
  {
    "type": "cites",
    "to": "s-7zqsstgnuc772ba"
  },
  {
    "type": "cites",
    "to": "s-xzcw3hv4hmxz7h7"
  },
  {
    "type": "cites",
    "to": "s-pcnyfp7gev7syax"
  },
  {
    "type": "cites",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "implements",
    "to": "s-q3pfzyaxvpr2zj2"
  },
  {
    "type": "cites",
    "to": "s-chsfpkgpmfk4fft"
  },
  {
    "type": "cites",
    "to": "s-m59dqwkw2e96wne"
  },
  {
    "type": "cites",
    "to": "s-nxgkp988mej79eg"
  }
]
```

### The wording the owner agreed to (s-7pk89t8z6wymmj9)

Title: How a project's own check is run

Where a check that a project's own guidelines add (§s-2fau85dfyyeq66m) fails, `sheriff validate` refuses the change. Where the rule that lists the check says that the check's failure is only reported, `sheriff validate` reports the failure instead (§s-ujm7nfxkk9j3464). The refusal or the report names the check and shows what the check printed to its standard output and its standard error. Where the check printed nothing, the refusal or the report shows the check's exit status.

`sheriff validate` runs each of the project's own checks with the command that `sheriff.config.json` names for it (§s-zefk589ykh37b8u). The check runs in the directory in which `sheriff validate` runs. On a commit, that directory holds what the commit contains (§s-477gtdrkw34dzxw). On its standard input, the check receives the model of the specification in the form that `sheriff json` prints (§s-w6gybeqn2ttydqx). A check passes only if its process exits with status zero.

In its `TextRule.list` (§s-eferktypcj7njt5), the rule that `sheriff.config.json` names for a check lists the check as a member whose value (§s-5hb9k2e34dgn284) is the check's name. `sheriff validate` reads that rule in its last approved wording (§s-a8fn72xa782wvbk). Where that member is an object whose `onFailure` is `reported`, the rule says that the check's failure is only reported. Where the rule, in that wording, lists no member whose value is the check's name, `sheriff validate` refuses the change. The refusal names the check and the rule, and says that the rule's last approved wording does not list the check.

`sheriff validate` runs the project's own checks only after the files of the specification have passed the check for a key written more than once (§s-7zqsstgnuc772ba) and the validation against their schema (§s-xzcw3hv4hmxz7h7). It runs them before the rest of its checks (§s-pcnyfp7gev7syax). It makes the rest of its checks regardless of what the project's own checks find.

`sheriff validate` refuses the change where one of the project's own checks adds, changes or removes a file in the directory in which the check runs, other than a file that git ignores (§s-vj67ztqkuhxbv7s). The refusal names the check and each such file.

Given the option `--strict`, `sheriff validate` gives each of the project's own checks a model of the specification in which the specification is approved and the specification's `strict` flag is on (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). It does so regardless of how the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) set the approval status and the flag. The other checks of `sheriff validate` give the same results with or without the option.

Before `sheriff settings` records an approval of the specification, it runs the project's own checks (§s-chsfpkgpmfk4fft, §s-qzthyh7yqvfhsa2). It gives them a model in which the specification is approved and the `strict` flag has the value that the entries in `sheriff.config.json` set. Before `sheriff settings` turns the `strict` flag on, it runs the project's own checks as `sheriff validate --strict` runs them (§s-q3pfzyaxvpr2zj2).

`sheriff validate` runs the project's own checks regardless of whether the specification is approved or a draft (§s-ujm7nfxkk9j3464).

Reason: Whenever `sheriff validate` makes its checks of the SpecSheriff guidelines, it also runs a project's own checks, on the same files. Such a check therefore binds every participant, rather than depending on whoever remembers to run it (§s-2fau85dfyyeq66m).
