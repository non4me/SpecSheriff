# Group 4 drafts for the confirming review (generated 2026-11-24T17:40:51.582Z)

## How a project's own check is run | key s-7pk89t8z6wymmj9 | sid s-7pk89t8z6wymmj9 | tools 7.1.23

### Text

Where a check that a project's own guidelines add (§s-2fau85dfyyeq66m) fails, `sheriff validate` refuses the change. Where the rule that lists the check says that the check's failure is only reported, `sheriff validate` reports the failure instead (§s-ujm7nfxkk9j3464). The refusal or the report names the check and shows what the check printed on its standard output and its standard error. Where the check printed nothing, it shows the check's exit status.

`sheriff validate` runs each of the project's own checks with the command that `sheriff.config.json` names for it (§s-zefk589ykh37b8u). The check runs in the directory in which `sheriff validate` runs. On a commit, that directory holds what the commit contains (§s-477gtdrkw34dzxw). On its standard input, the check receives the model of the specification in the form that `sheriff json` prints (§s-w6gybeqn2ttydqx). A check passes only if its process exits with status zero.

In its `TextRule.list` (§s-eferktypcj7njt5), the rule that `sheriff.config.json` names for a check lists the check as a member whose value (§s-5hb9k2e34dgn284) is the check's name. `sheriff validate` reads that rule in its last approved wording (§s-a8fn72xa782wvbk). Where that member is an object whose `onFailure` is `reported`, the rule says that the check's failure is only reported. Where the rule, in that wording, lists no member whose value is the check's name, `sheriff validate` refuses the change. The refusal names the check and the rule, and says that the rule's last approved wording does not list the check.

`sheriff validate` runs the project's own checks only once the files of the specification have passed the check for a key written more than once (§s-7zqsstgnuc772ba) and the validation against their schema (§s-xzcw3hv4hmxz7h7). It runs them before the rest of its checks (§s-pcnyfp7gev7syax). It makes the rest of its checks whatever the project's own checks find.

`sheriff validate` refuses the change where one of the project's own checks adds, changes or removes a file in the directory in which the check runs, other than a file that git ignores (§s-vj67ztqkuhxbv7s). The refusal names the check and each such file.

Given the option `--strict`, `sheriff validate` gives each of the project's own checks a model of the specification in which the specification is approved and the specification's `strict` flag is on (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). It does so whatever the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) set the approval status and the flag to. The other checks of `sheriff validate` give the same results with or without the option.

Before `sheriff settings` records an approval of the specification, it runs the project's own checks (§s-chsfpkgpmfk4fft, §s-qzthyh7yqvfhsa2). It gives them a model in which the specification is approved and the `strict` flag has the value that the entries in `sheriff.config.json` set. Before `sheriff settings` turns the `strict` flag on, it runs the project's own checks as `sheriff validate --strict` runs them (§s-q3pfzyaxvpr2zj2).

`sheriff validate` runs the project's own checks regardless of whether the specification is approved or a draft (§s-ujm7nfxkk9j3464).

### Reason

`sheriff validate` runs a project's own checks together with the checks of the SpecSheriff guidelines that it makes, on the same files. So such a check binds every participant, rather than depending on whoever remembers to run it (§s-2fau85dfyyeq66m).

### Examples

```json
[
  {
    "en": "The rule that lists the project's own checks has `name` as its `TextRule.list.property`, and one of its members is `{\"name\": \"spelling\", \"onFailure\": \"reported\"}`. The check `spelling` finds a misspelt word in a node's text, prints the node's sid and exits with status 1. `sheriff validate` reports the failure, showing the sid, and the commit passes. The most likely mistake is to refuse the commit because the check's exit status is not zero.",
    "ru": "У правила, которое перечисляет собственные проверки проекта, `TextRule.list.property` — `name`, и один из его элементов — `{\"name\": \"spelling\", \"onFailure\": \"reported\"}`. Проверка `spelling` находит слово с опечаткой в тексте узла, печатает sid узла и завершается с кодом 1. `sheriff validate` сообщает о неудаче, показывая sid, и коммит проходит. Самая вероятная ошибка — отвергнуть коммит потому, что код завершения проверки не равен нулю."
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
    "type": "cites",
    "to": "s-q3pfzyaxvpr2zj2"
  },
  {
    "type": "cites",
    "to": "s-chsfpkgpmfk4fft"
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

## null | key proposal:row-10-1-37a | sid s-vj67ztqkuhxbv7s | spec 10.1.37a (new row of the main table of checks, after row 10.1.37)

### Text

A check that a project's own guidelines add (§s-2fau85dfyyeq66m) leaves the directory in which it runs as it was, except the files that git ignores

### Reason

(none)

### Outgoing links

```json
[
  {
    "type": "checks",
    "to": "s-pcnyfp7gev7syax"
  },
  {
    "type": "cites",
    "to": "s-2fau85dfyyeq66m"
  }
]
```

### The current node

(none: this node is new)

## The order in which tools and checks run on a commit and on a push | key proposal:s-pcnyfp7gev7syax-g4 | sid s-pcnyfp7gev7syax | spec 10.12

### Text

On a commit and on a push, the project's own tools, the SpecSheriff tools and the checks run in three steps:

the tools that rewrite files: first the project's own tools of that kind that its own guidelines (§s-u7tw6m8npxmv5tu) list, such as formatters, and then the generators, both those of the SpecSheriff tools and the project's own (§s-km4x4s26kv7pjze);

the project's own checks (§s-2fau85dfyyeq66m) and the rest of the project's own tools, each of which leaves the files as they were, except those that git ignores;

the checks of the SpecSheriff guidelines (§s-jau82aq9juv9zzh).

After the first step, nothing changes what the commit contains. Each step runs regardless of what the earlier steps found. The commit or the push goes through only if every check passes and no tool fails.

On a commit, as an exception to the steps above, the following checks run right after the first step:

the check that, in each object (§s-d5cgda5bdsn7bzy) of a file of the specification, of its archive (§s-f2b5zvc565s242f) or of its schema (§s-eferktypcj7njt5), each key is written only once;

the check that every file of the specification complies with its JSON Schema (§s-emrfpzw2d5bgb6x).

The project's own checks and the other checks of the SpecSheriff guidelines run only once these checks have passed.

Where the SpecSheriff tools cannot run, the project's own tools still run. The commit or the push then goes through unless one of them fails. Whoever makes the commit or the push is told that no SpecSheriff check ran.

### Reason

A project may run tools of its own on a commit or a push, such as a scan that checks that nothing internal reaches a public repository. Adopting the method must not stop them, even where the SpecSheriff tools cannot run, for example on a machine without the plugin. A team that needs the checks to apply to everyone runs them in CI.

The order lets every check rely on what it reads. Whatever rewrites files runs before any check, so every check reads the commit in its final form. A generator runs after any formatter, so that no formatter changes what it generates. A check that reads the nodes runs only on files that have passed the checks of their structure. A tool that changed the commit after the checks would let through what no check had read.

### Examples

```json
[
  {
    "en": "A project's own guidelines list a formatter. On a commit, the formatter rewrites the files in the commit first, and the generators of the SpecSheriff tools then write their files. Next come the checks that each key is written only once in each object and that each file complies with its JSON Schema. A scan for secrets runs after them, and the other checks of the SpecSheriff guidelines run last, on the final files.",
    "ru": "Собственные guidelines проекта перечисляют форматтер. При коммите форматтер сначала переписывает файлы коммита, а затем генераторы инструментов SpecSheriff записывают свои файлы. Дальше идут проверки того, что каждый ключ записан в каждом объекте только один раз и что каждый файл соответствует своей JSON Schema. После них запускается поиск секретов, а остальные проверки SpecSheriff guidelines запускаются последними, на окончательных файлах."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "refines",
    "to": "s-jau82aq9juv9zzh"
  },
  {
    "type": "cites",
    "to": "s-u7tw6m8npxmv5tu"
  },
  {
    "type": "cites",
    "to": "s-km4x4s26kv7pjze"
  },
  {
    "type": "cites",
    "to": "s-2fau85dfyyeq66m"
  },
  {
    "type": "cites",
    "to": "s-d5cgda5bdsn7bzy"
  },
  {
    "type": "cites",
    "to": "s-emrfpzw2d5bgb6x"
  },
  {
    "type": "cites",
    "to": "s-f2b5zvc565s242f"
  },
  {
    "type": "cites",
    "to": "s-eferktypcj7njt5"
  }
]
```

### The current node

Title: The order in which tools and checks run on a commit and on a push

On a commit and on a push, the project's own tools, the SpecSheriff tools and the checks run in three steps:
1. the tools that rewrite files: first the project's own tools of that kind that its own guidelines (§s-u7tw6m8npxmv5tu) list, such as formatters, and then the generators, both those of the SpecSheriff tools and the project's own (§s-km4x4s26kv7pjze);
2. the project's own checks (§s-2fau85dfyyeq66m) and the rest of the project's own tools, none of which changes a file;
3. the checks of the SpecSheriff guidelines (§s-jau82aq9juv9zzh).

After the first step, nothing changes what the commit contains. Each step runs regardless of what the earlier steps found. The commit or the push goes through only if every check passes and no tool fails.

Where the SpecSheriff tools cannot run, the project's own tools still run. The commit or the push then goes through unless one of them fails. Whoever makes the commit or the push is told that no SpecSheriff check ran.

Reason: A project may run tools of its own on a commit or a push, such as a scan that checks that nothing internal reaches a public repository, and adopting the method must not stop them.

The order runs from the most specific to the most general. Whatever rewrites files runs first, so every check reads the commit in its final form. The checks of the SpecSheriff guidelines run last, after the project's own checks. A tool that changed the commit after the checks would let through what no check had read.

The generators, both those of the SpecSheriff tools and the project's own, run after the project's other tools that rewrite files, so that no formatter changes what they generate.

Where the SpecSheriff tools cannot run, as on a machine without the plugin, the project's own tools still guard the commit, and a team that needs the checks to hold for everyone runs them in CI.

## Generated copies checked against their nodes | key s-dbk2vyeg8z5jxna | sid s-dbk2vyeg8z5jxna | tools 7.2.8

### Text

`sheriff binding` refuses each file that `sheriff types` generates (§s-a8fn72xa782wvbk) where the file's text in the repository differs, line endings aside, from what `sheriff types` generates for it (§s-dwxjxb7rw4w5yn3). Where the repository lacks such a file, it also refuses the commit. Each refusal names the file and says that running `sheriff types` regenerates it.

`sheriff binding` generates in memory, from the last approved wording of each node (§s-qyjw8xez6t6adc3), the files that `sheriff types` would generate. It writes none of them.

While the rule that lists one of the project's own generators (§s-km4x4s26kv7pjze) is a draft, `sheriff binding` refuses each file of that generator that differs between the commit's parent (§s-2x58az67bm6cxq2) and the commit. A file of the generator is one at a path that the generator prints when `sheriff binding` runs it as `sheriff types` runs a generator whose rule is approved (§s-y5yk7eu6h4zrjpr). A file that only one of the two commits holds also differs. Where `sheriff types` would refuse the generator so run, `sheriff binding` refuses it in the same way. The refusal names the file and the generator.

`sheriff binding` also refuses each of the following, any one of which keeps `sheriff types` from writing any file at all (§s-a8fn72xa782wvbk):

a file in the list of the files (§s-pvzms7d8kxb8dk2) for the types and the RuntimeChecks (§s-e877bnfa559tvk9) generated from the RecordTypes (§s-7vm323mhry2enx3), where the file's name does not end in `.ts`, `.py` or `.json`;

a file in that list whose path leads outside the repository;

a second rule, in the section of the technical appendix (§s-tj38pvm38nepaf5) for the stack, that lists such files;

the name of a type or of a definition, where that name cannot be generated (§s-suv42g8r3ra2h6b);

a path for which `sheriff types` would generate different texts, such as a path that two of the project's own generators print with different content.

Each of these refusals names the rule, the node or the path concerned.

`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-dwxjxb7rw4w5yn3).

### Reason

A generated file kept in the repository is part of the system's code (§s-hheus6f395ynqvc). Edited by hand, it would implement what no owner has approved. Lagging behind its nodes, it would implement a wording that the owners of those nodes have since replaced (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).

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
    "type": "implements",
    "to": "s-km4x4s26kv7pjze"
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
    "to": "s-y5yk7eu6h4zrjpr"
  },
  {
    "type": "cites",
    "to": "s-pvzms7d8kxb8dk2"
  },
  {
    "type": "cites",
    "to": "s-e877bnfa559tvk9"
  },
  {
    "type": "cites",
    "to": "s-7vm323mhry2enx3"
  },
  {
    "type": "cites",
    "to": "s-tj38pvm38nepaf5"
  },
  {
    "type": "cites",
    "to": "s-suv42g8r3ra2h6b"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-kh8qcd5kxgh9z3j"
  },
  {
    "type": "cites",
    "to": "s-2x58az67bm6cxq2"
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
