# Group 4 drafts for review (generated 2026-11-24T16:22:56.349Z)

## How a project's own check is run | key s-7pk89t8z6wymmj9 | sid s-7pk89t8z6wymmj9 | tools 7.1.23

### Text

Where a check that a project's own guidelines add (§s-2fau85dfyyeq66m) fails, `sheriff validate` refuses the change. It only reports the failure where the rule that lists the check says so (§s-ujm7nfxkk9j3464). The refusal or the report names the check and shows what the check printed on its standard output and its standard error. Where the check printed nothing, it shows the check's exit status.

`sheriff validate` runs each such check by the command that `sheriff.config.json` names for it (§s-zefk589ykh37b8u). The check runs in the directory in which `sheriff validate` runs, which at a commit holds what the commit contains (§s-477gtdrkw34dzxw). On its standard input, the check receives the model of the specification in the form that `sheriff json` prints (§s-w6gybeqn2ttydqx). A check passes only where its process ends with the exit status zero.

The rule that `sheriff.config.json` names for a check lists the check by a member of its `TextRule.list` (§s-eferktypcj7njt5) whose value (§s-5hb9k2e34dgn284) is the check's name. The check's failure is only reported where that member is an object whose property `onFailure` is `reported`. Where the rule lists no member whose value is the check's name, `sheriff validate` refuses the change, naming the check and the rule.

`sheriff validate` runs the project's own checks after it has validated the files against the schema of the specification (§s-xzcw3hv4hmxz7h7) and before every other check that it makes (§s-pcnyfp7gev7syax). It makes those other checks whatever the project's own checks find.

`sheriff validate` refuses the change where a check adds, changes or removes a file in the directory in which it runs, other than a file that git ignores. The refusal names the check and each such file (§s-pcnyfp7gev7syax).

Given the option `--strict`, `sheriff validate` hands each of the project's own checks a model in which the specification is approved and its `strict` flag is on (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). It does so whatever the entries for the approval status and the flag hold. Its other checks are the same with or without the option.

`sheriff validate` runs the project's own checks regardless of whether the specification is approved or a draft (§s-ujm7nfxkk9j3464).

### Reason

Run by `sheriff validate`, a project's own check runs wherever the checks of the SpecSheriff guidelines run and reads the same files. So it binds every participant, rather than depending on whoever remembers to run it (§s-2fau85dfyyeq66m).

### Examples

```json
[
  {
    "en": "The rule that lists the project's own checks has `name` as its `TextRule.list.property`, and one of its members is `{\"name\": \"no-secrets\", \"onFailure\": \"reported\"}`. The check `no-secrets` finds a token in a file, prints the file's path and exits with the status 1. `sheriff validate` reports the failure, showing the path, and the commit passes. The most likely mistake is to refuse the commit because the check's exit status is not zero.",
    "ru": "У правила, которое перечисляет собственные проверки проекта, `TextRule.list.property` — `name`, и один из его элементов — `{\"name\": \"no-secrets\", \"onFailure\": \"reported\"}`. Проверка `no-secrets` находит токен в файле, печатает путь к файлу и завершается с кодом 1. `sheriff validate` сообщает о неудаче, показывая путь, и коммит проходит. Самая вероятная ошибка — отвергнуть коммит потому, что код завершения проверки не равен нулю."
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
    "type": "cites",
    "to": "s-q3pfzyaxvpr2zj2"
  }
]
```

### The current node

Title: How a project's own check is run

`sheriff validate` runs each check a project's own guidelines add (§s-2fau85dfyyeq66m), by the command the settings name for it.

- The check runs in the directory the other checks read.
- The check is handed on its standard input what `sheriff model` prints.
- An exit code other than zero refuses, or is reported where the rule listing the check says it reports.
- What the check printed is shown with it.

Reason: (none)

## Generated copies against the nodes | key s-dbk2vyeg8z5jxna | sid s-dbk2vyeg8z5jxna | tools 7.2.8

### Text

`sheriff binding` refuses each file that `sheriff types` writes (§s-a8fn72xa782wvbk) where the file's text in the repository differs from what `sheriff types` would write, line endings aside (§s-dwxjxb7rw4w5yn3). It also refuses each such file that the repository lacks. Each refusal names the file and says that `sheriff types` writes it anew.

`sheriff binding` generates in memory, from the approved wordings of the nodes (§s-qyjw8xez6t6adc3), the files that `sheriff types` would write, and writes none of them.

`sheriff binding` also refuses each of the following, which keeps `sheriff types` from writing any file (§s-a8fn72xa782wvbk):

a file in the list of the files for the types and the RuntimeChecks (§s-e877bnfa559tvk9, §s-pvzms7d8kxb8dk2) whose name ends in none of `.ts`, `.py` and `.json`;

a file in that list whose path leads outside the repository;

a second rule in the section of the technical appendix (§s-tj38pvm38nepaf5) for the stack that lists such files;

a name that cannot be generated (§s-suv42g8r3ra2h6b);

a path to which `sheriff types` would write different texts, such as a path that two of the project's own generators (§s-km4x4s26kv7pjze) print with different content.

The refusal names the rule, the node or the path concerned.

`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-dwxjxb7rw4w5yn3).

### Reason

A generated file kept in the repository is part of the system's code. A copy edited by hand or left behind its nodes would implement what no owner has approved (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).

### Examples

```json
[
  {
    "en": "A RecordType is reworded and becomes a draft, and the types generated from it stay as its last approved wording produces them. A commit edits `src/types.ts` by hand to match the new wording. `sheriff binding` refuses `src/types.ts`, since its text differs from what the last approved wording produces. The most likely mistake is to generate the types from the draft wording, which lets the edited file pass.",
    "ru": "RecordType переформулируют, и он становится черновиком, а типы, порождённые из него, остаются такими, какими их даёт его последняя одобренная формулировка. Коммит вручную меняет `src/types.ts` под новую формулировку. `sheriff binding` отвергает `src/types.ts`, потому что его текст отличается от того, что даёт последняя одобренная формулировка. Самая вероятная ошибка — порождать типы из формулировки-черновика: тогда изменённый файл проходит."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-dwxjxb7rw4w5yn3"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  },
  {
    "type": "cites",
    "to": "s-qyjw8xez6t6adc3"
  },
  {
    "type": "cites",
    "to": "s-pvzms7d8kxb8dk2"
  },
  {
    "type": "cites",
    "to": "s-suv42g8r3ra2h6b"
  },
  {
    "type": "cites",
    "to": "s-km4x4s26kv7pjze"
  },
  {
    "type": "cites",
    "to": "s-kh8qcd5kxgh9z3j"
  },
  {
    "type": "cites",
    "to": "s-e877bnfa559tvk9"
  },
  {
    "type": "cites",
    "to": "s-tj38pvm38nepaf5"
  }
]
```

### The current node

Title: Generated copies against the nodes

`sheriff binding` generates in memory the copies the nodes produce, and compares them with what is committed. The copies are:

- the files the technical appendix lists for the types and RuntimeChecks (§s-pvzms7d8kxb8dk2);
- the files each of the project's own generators prints, run as `sheriff types` runs it (§s-km4x4s26kv7pjze).

Each copy is compared with what the last commit holds instead while a node it waits for is a draft (§s-f5rz6b7dhxejjts). Each such node is reported.

It refuses:

- a list of the files for the types and RuntimeChecks naming a file of another extension or a path outside the repository;
- a path a project's generator prints outside the repository or under `specs/`;
- two rules of the stack each defining such a list;
- a name that cannot be generated (§s-suv42g8r3ra2h6b);
- a RecordType holding two fields of type `variant`, its inherited ones counted.

Reason: (none)
