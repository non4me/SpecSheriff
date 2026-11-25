# Group 1 drafts for review (generated 2026-11-24T02:21:17.894Z)

## How a runner is started | key new:tools-10-start | sid s-avvnasjhsfkgajh | tools 10.3 (new)

### Text

`sheriff review` starts a runner (§s-xr5xxa9cxf2mq5u) separately from the session that made the change, so that the runner is given nothing from that session (§s-nyh9yk22ba6g77q). It starts the runner:

with only the credentials from what its CLI keeps for the user;

with a system prompt that `sheriff review` writes for it;

in an empty working directory;

with its tools turned off, as far as its command-line options allow;

as a program, never through a shell.

A CLI that npm installs on Windows as a command script is started as the program that the script starts, with the arguments that the script gives it.

The runner's environment holds only the variables that the list of this node allows and, for the runner `codex`, the variable that names its own Codex home (§s-u2n5hwwqkb6zk4z). The variables of the list hold:

the search path for programs, the folders of the operating system and of the user, and the user's name;

the locale;

a proxy, the hosts to reach without it, and the certificates to trust;

where the runner's CLI keeps its credentials, the credentials themselves, and the provider serving the model.

### Reason

Anything that reaches the runner from the session that made the change, such as the user's memory or the repository through git's variables, lets it judge by more than the rules (§s-nyh9yk22ba6g77q). A shell between `sheriff review` and the runner would read the runner's arguments, such as the schema of the verdict, by its own syntax and could change them.

### Examples

```json
[
  {
    "en": "Claude Code sets `CLAUDECODE` for its session, and git sets `GIT_DIR` to the repository for each hook it runs. Neither variable is in the list, so neither reaches the runner. The runner therefore cannot read the repository through `GIT_DIR` from its empty working directory. The most likely mistake is to remove only the variables on a list of known ones, which misses each variable that a new release of an agent adds.",
    "ru": "Claude Code задаёт для своей сессии `CLAUDECODE`, а git задаёт `GIT_DIR` на репозиторий для каждого хука, который запускает. Ни одной из этих переменных нет в списке, поэтому ни одна не доходит до runner. Значит, runner не может прочитать репозиторий через `GIT_DIR` из своего пустого рабочего каталога. Самая вероятная ошибка — убирать только переменные из списка известных: так пропускается каждая переменная, которую добавляет новый выпуск агента."
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
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  },
  {
    "type": "cites",
    "to": "s-u2n5hwwqkb6zk4z"
  }
]
```

### The current node

(none: this node is new)

## The runner `codex` | key new:tools-10-codex | sid s-u2n5hwwqkb6zk4z | tools 10.6 (new)

### Text

The runner `codex` (§s-xr5xxa9cxf2mq5u) is the Codex CLI run as `codex exec`, with a Codex home of its own. That home is created in a temporary directory for the run and deleted after it. It holds only a copy of the user's credentials.

The runner `codex` runs with:

its sandbox read-only;

its session not kept;

no skill offered.

The runner `codex` requests the model and the reasoning effort that the settings of the runner specify (§s-tnz9zgqx8c629a7). Where `specsheriff.review.codexModel` is empty, it leaves the choice of the model to Codex.

### Reason

Codex offers no way to run without its own home and tools, so the runner restricts both.

### Examples

```json
[
  {
    "en": "`sheriff review` makes a temporary directory, copies the user's `auth.json` into it, and starts `codex exec` with `CODEX_HOME` set to that directory, so the user's own configuration and skills stay out of the run. The most likely mistake is to leave `CODEX_HOME` at the user's own Codex home, which brings that configuration and those skills into the review.",
    "ru": "`sheriff review` создаёт временный каталог, копирует в него `auth.json` пользователя и запускает `codex exec` с `CODEX_HOME`, указывающим на этот каталог, поэтому собственная конфигурация и skill пользователя в прогон не попадают. Самая вероятная ошибка — оставить `CODEX_HOME` на собственном домашнем каталоге Codex пользователя: тогда эта конфигурация и эти skill попадают в ревью."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  },
  {
    "type": "cites",
    "to": "s-tnz9zgqx8c629a7"
  }
]
```

### The current node

(none: this node is new)

## The settings of each runner | key new:tools-10-settings | sid s-tnz9zgqx8c629a7 | tools 10.7 (new)

### Text

`sheriff review` reads the settings of each runner (§s-xr5xxa9cxf2mq5u) from the git configuration of the user who commits:

`specsheriff.review.claudeModel`, `specsheriff.review.claudeFallbackModel` and `specsheriff.review.claudeEffort`, for the runner `claude` (§s-3wh8uhgn9jr2k74);

`specsheriff.review.codexModel` and `specsheriff.review.codexEffort`, for the runner `codex` (§s-u2n5hwwqkb6zk4z).

`sheriff review` takes the model and the reasoning effort only from these settings and their defaults. Where a setting is empty, the runner requests no value for it, so the runner's CLI uses a value of its own. An empty `specsheriff.review.codexModel`, for example, means the model that Codex chooses for the signed-in account.

A setting that the user's git configuration holds, empty or not, counts as confirmed. The agent's hooks (§s-477gtdrkw34dzxw) and the skills of each SpecSheriff plugin (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) ask only for a setting that this configuration lacks. They write a setting into a user's git configuration only with the value that this user gives in reply. Where the user answers with the default, they write it like any other value.

The defaults are:

for the runner `claude`, the model `opus` at the reasoning effort `high`, with `sonnet` as the fallback model;

for the runner `codex`, the model that Codex chooses, at the reasoning effort `high`.

Where the user's git configuration lacks a setting of the runner in use, `sheriff review` takes that setting's default. In every review (§s-m4h279nbaqkpa3t) that runs with a default setting, `sheriff review` names each setting whose default it took, and says how the user confirms that setting.

### Reason

A run of the reviewer (§s-m4h279nbaqkpa3t) is paid for by the user who commits, from their own account. So that user alone controls the models and the reasoning efforts that the reviewer runs with.

### Examples

```json
[
  {
    "en": "A user confirms `specsheriff.review.claudeModel` once with `git config --global`. From then on, every review made with the runner `claude` on that machine runs with that model, including after the plugin is updated, or removed and installed again. The most likely mistake is to keep the model in `sheriff.config.json`, which every clone shares, so that everyone who commits pays for one person's choice.",
    "ru": "Пользователь один раз подтверждает `specsheriff.review.claudeModel` командой `git config --global`. С тех пор каждое ревью, которое runner `claude` выполняет на этой машине, идёт на этой модели, в том числе после обновления плагина или после его удаления и повторной установки. Самая вероятная ошибка — хранить модель в `sheriff.config.json`, общем для всех клонов: тогда за выбор одного человека платит каждый, кто делает коммит."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  },
  {
    "type": "cites",
    "to": "s-3wh8uhgn9jr2k74"
  },
  {
    "type": "cites",
    "to": "s-u2n5hwwqkb6zk4z"
  },
  {
    "type": "cites",
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-zh2vcr3xjumppg5"
  },
  {
    "type": "cites",
    "to": "s-2pdy9gw2jrjvfb4"
  }
]
```

### The current node

(none: this node is new)

## SpecTags on the system's code other than tests | key s-9rtrj24myzjvshu | sid s-9rtrj24myzjvshu | tools 7.2.2

### Text

`sheriff binding` refuses each of the following that the commit adds or changes (§s-2x58az67bm6cxq2) in the system's code (§s-hheus6f395ynqvc), other than tests, or in the bindings file (§s-trwczfskj5zmuft), whether the specification is approved or a draft (§s-k6dzuajejrw4cej):

a symbol (§s-kgbzk2ph9e6jfb4) that no SpecTag (§s-5z5gnu7pahr82xp) binds;

a file that is to be bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) and that no SpecTag binds;

in a file whose language a description covers (§s-33fw3ga4ctd94dq), a SpecTag in any comment other than the one directly above a symbol;

in such a file, a SpecTag that shares its line with anything other than the comment's delimiters;

in a file to be bound by SpecTags at its start (§s-5qdjyf6t898rsd4), a SpecTag on a line after that start;

where a SpecTag may stand, a text that opens with `@spec` but has none of the forms of a SpecTag (§s-5z5gnu7pahr82xp), such as `@spec none` with no text after it;

an entry in the bindings file (§s-trwczfskj5zmuft) for a file that is not part of the system's code other than tests, or whose format allows comments;

a SpecTag whose sid names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule (§s-5z5gnu7pahr82xp);

code that carries `@spec none` together with another SpecTag.

The refusal names the file and, where it concerns a symbol or a line, that symbol or line.

A SpecTag or an entry of a kind that this list refuses binds nothing. Code that the commit leaves unchanged and that no SpecTag binds is handled by the check of code and tests outside the commit (§s-3xx2eukc8gtd2tx).

### Reason

A SpecTag that cannot be attached to one symbol or one file, or that names a node that no code can implement, binds nothing. The code that it is meant to bind is then as unbound as code with no SpecTag.

### Examples

```json
[
  {
    "en": "A commit adds a function that carries `/** @spec s-… */`, whose sid is that of the section that holds the rules that the function implements. `sheriff binding` refuses the SpecTag, since a section requires nothing that code could implement. The most likely mistake is to accept the SpecTag because its node exists, which leaves the function bound to no rule.",
    "ru": "Коммит добавляет функцию, у которой есть `/** @spec s-… */`, sid которого — sid раздела, где лежат правила, которые реализует функция. `sheriff binding` отвергает этот SpecTag, потому что раздел не требует ничего, что мог бы реализовать код. Самая вероятная ошибка — принять SpecTag, потому что его узел существует: тогда функция не привязана ни к одному правилу."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-k6dzuajejrw4cej"
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
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-33fw3ga4ctd94dq"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
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
    "to": "s-w6gybeqn2ttydqx"
  },
  {
    "type": "cites",
    "to": "s-3xx2eukc8gtd2tx"
  }
]
```

### The current node

Title: SpecTags on the system's code

`sheriff binding` reads the SpecTag of every symbol of the system's code. A SpecTag binds a symbol to the node the symbol implements. The system's code is the code that implements the specification, its tests included.

- A test carries its SpecTag in its name or in a mark on it (§s-zrsc6asgmhv8tnc), so the symbols of the tests are not read.
- The repository's configuration, its own tools and their tests are not the system's code (§s-hheus6f395ynqvc), and are not read.
- An inner symbol is covered by the SpecTag of the symbol it stands in.
- The sid of a SpecTag is looked up among the nodes. That of a SpecTag on a changed symbol is looked up among the approved ones. A symbol changes where a line the commit changes counts for it (§s-2x58az67bm6cxq2).
- While the commit leaves the specification a draft (§s-j9r8z4xdrfkfs47), a symbol carrying no SpecTag that the commit does not change is reported by the symbol, not refused (§s-kkbqcb9xrpaepwn).

Reason: (none)

## A test for each rule whose code a commit changes | key new:tools-7-2-rule-test | sid s-8wp7xm7g3u8gscq | tools 7.2.4a (new, after "The SpecTags the tests carry")

### Text

`sheriff binding` accepts a commit that adds or changes code bound to a rule (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp) only where a test of the system's code (§s-hheus6f395ynqvc) declares that rule's SpecTag (§s-zrsc6asgmhv8tnc, §s-m82tz4mp3f9r3fg). It takes the tests as the commit leaves them. It refuses any commit that does not meet this condition, naming the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx).

In this check, the code means the symbols (§s-kgbzk2ph9e6jfb4) and the files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that the commit adds or changes (§s-2x58az67bm6cxq2), other than tests. A rule is bound to such code where one of the code's SpecTags names the rule.

In this check, a test is taken into account whether or not the commit changes it. A test marked as skipped or as expected to fail is taken into account too. `sheriff binding` runs this check whether the specification is approved or a draft.

### Reason

A rule's test is written before its code (§s-rah8b37kytb682y). So code added or changed for a rule that no test names was written before the rule's test, or without one.

### Examples

```json
[
  {
    "en": "A commit adds a function whose SpecTag names a rule, and no test in the repository declares that rule's SpecTag. `sheriff binding` refuses the commit and names the rule. The most likely mistake is to look for the test only among the tests that the commit changes, in which case `sheriff binding` refuses a commit whose test was committed earlier.",
    "ru": "Коммит добавляет функцию, SpecTag которой называет правило, и ни один тест в репозитории не объявляет SpecTag этого правила. `sheriff binding` отвергает коммит и называет правило. Самая вероятная ошибка — искать тест только среди тестов, которые меняет коммит: тогда отвергается коммит, тест которого был закоммичен раньше."
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
    "to": "s-kgbzk2ph9e6jfb4"
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
    "to": "s-5qdjyf6t898rsd4"
  },
  {
    "type": "cites",
    "to": "s-trwczfskj5zmuft"
  },
  {
    "type": "cites",
    "to": "s-2x58az67bm6cxq2"
  },
  {
    "type": "cites",
    "to": "s-rah8b37kytb682y"
  },
  {
    "type": "cites",
    "to": "s-zrsc6asgmhv8tnc"
  }
]
```

### The current node

(none: this node is new)
