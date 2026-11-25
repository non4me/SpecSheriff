# Group 1 drafts for review (generated 2026-11-24T01:49:50.804Z)

## Which runner runs the reviewer | key s-xr5xxa9cxf2mq5u | sid s-xr5xxa9cxf2mq5u | tools 10.1

### Text

`sheriff review` hands everything that the independent reviewer is given (§s-nyh9yk22ba6g77q) to a runner. A runner is an agent's CLI that `sheriff review` starts for each review (§s-avvnasjhsfkgajh). The runner is `claude` (§s-3wh8uhgn9jr2k74) or `codex` (§s-u2n5hwwqkb6zk4z).

`sheriff review` runs the runner that `review.runner` in `sheriff.config.json` names (§s-zefk589ykh37b8u). The default of `review.runner` is the runner of the SpecSheriff plugin whose tools run `sheriff review`. The build of each SpecSheriff plugin writes the file `agent` into the folder of the plugin's SpecSheriff tools. That file names the plugin's runner:

`claude` for the plugin for Claude Code (§s-zh2vcr3xjumppg5);

`codex` for the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4).

SpecSheriff tools that have no such file use `claude`.

The project-wide settings of the reviewer in `sheriff.config.json` are `review.runner` and `review.minutes`. `review.minutes` sets the time limit of a run of the reviewer (§s-wgedv32rdaqca9k).

### Reason

A user with one agent has no other agent to run, so the default runner is that of the plugin that the user has installed. A project that wants one runner for everyone names it in `review.runner`.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-nyh9yk22ba6g77q"
  },
  {
    "type": "cites",
    "to": "s-avvnasjhsfkgajh"
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
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-zh2vcr3xjumppg5"
  },
  {
    "type": "cites",
    "to": "s-2pdy9gw2jrjvfb4"
  },
  {
    "type": "cites",
    "to": "s-wgedv32rdaqca9k"
  }
]
```

### The current node

Title: Who runs the reviewer

`sheriff review` hands the reviewer's input to a runner. The runner's CLI is given the schema of the verdict. It answers in JSON held to that schema.

The verdict passes or refuses the commit. It names the findings, each with its node, file, line and problem. `sheriff review` reads as an answer that cannot be read (§s-nyh9yk22ba6g77q):

- an answer that passes the commit with a finding;
- an answer that refuses the commit with none.

A runner is started:

- with none of the user's settings, memory or hooks;
- with a system prompt of its own;
- in an empty working directory;
- with every tool its command line can turn off turned off;
- as a program, never through a shell.

A CLI installed as a command script, as npm installs it on Windows, is started as the program and the arguments the script names.

A runner's environment holds only the variables that name:

- the search path of programs, the folders of the operating system and of the user, and the user's name;
- the locale;
- a proxy, the hosts it skips and the certificates to trust;
- where the runner's CLI keeps its sign-in, the sign-in itself, and the provider serving the model.

The runner `claude` is the Claude Code CLI in print mode. It asks for the model and the reasoning effort the settings below give. Where that model is overloaded or not offered, it falls back to the fallback model they give.

The runner `codex` is the Codex CLI in `codex exec`, with a Codex home of its own. That home is made in a temporary directory for the run and deleted after it. It holds a copy of the user's sign-in and nothing else.

The runner `codex` runs with:

- its sandbox read-only;
- its session not kept;
- no skill offered.

The runner `codex` asks for the model and the reasoning effort the settings below give. Where the model is empty, it asks for no model.

`sheriff review` reads the settings of each runner from the git configuration of the user who commits:

- `specsheriff.review.claudeModel`, `specsheriff.review.claudeFallbackModel` and `specsheriff.review.claudeEffort` for the runner `claude`;
- `specsheriff.review.codexModel` and `specsheriff.review.codexEffort` for the runner `codex`.

An empty `codexModel` stands for the model Codex chooses for the signed-in account.

A setting the configuration holds, empty or not, is confirmed. The hooks and the skills of either plugin ask for no setting the configuration holds.

The hooks and the skills write a setting only as the user whose configuration it is answers. Where the user answers with the default, they write it as any other value. The session start (§s-477gtdrkw34dzxw) and the skill `spec-init` (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) say when each setting is asked for.

The defaults are:

- for the runner `claude`, the model `opus` at the reasoning effort `high`, falling back to `sonnet`;
- for the runner `codex`, the model Codex chooses, at the reasoning effort `high`.

Where the configuration lacks a setting of the runner that runs, `sheriff review` takes that setting's default. With every review held so, it names each setting it took a default for and how the user confirms it.

The settings of the reviewer in `sheriff.config.json` are `review.runner` and `review.minutes`. `sheriff review` takes no model and no effort from that file.

`review.minutes` is the time after which a run is ended. Unless set, it is twenty minutes.

Unless `review.runner` is set, the runner is that of the plugin whose tools run `sheriff review`. The `agent` file the build writes beside `release` names that runner:

- `claude` for the plugin for Claude Code;
- `codex` for the plugin for Codex CLI.

Tools holding no such file take `claude`.

Reason: A runner judges the code against the nodes alone, not against what its author meant. So how it is started keeps from it everything of the session that wrote the code. Print mode and `codex exec` answer once and exit, with no session around them to carry anything over.

A CLI held to the schema of the verdict answers in a form `sheriff review` can read. An answer that contradicts itself leaves open which half the reviewer meant. Taking either half would decide for the reviewer.

A shell in between reads the arguments by its own syntax. On Windows, ending that shell at the time limit leaves the CLI it started running. A command script runs only through a shell, so the program it starts is started instead.

A list of what to strip would fall behind unseen, so the environment lists what passes. An agent sets variables of its own for the session it runs, and a new release may add more. The git hooks set git's variables to the repository. A CLI started in its empty directory would then read the repository through them.

A variable the run needs, left off the list, fails the run instead. The commit is then refused, saying why.

A run of the reviewer is paid for by the user who commits, from their own account. So it runs at the models and the efforts that user has confirmed. Those settings are kept on the user's machine rather than in the project, which every clone shares.

The git hooks read the git configuration with no agent running. The configuration outlives an update or a removal of either plugin. Its global scope serves every project of the user, so one answer on each machine holds wherever they commit.

A confirmed setting holds its value, so that a release of the SpecSheriff tools offering other defaults changes nothing a user has confirmed.

Where a setting is not confirmed, the review still runs at its default. A commit whose review cannot be held is refused (§s-nyh9yk22ba6g77q). Refusing would then hold every commit of a user nobody has asked yet, as one committing from a terminal or in CI. The default is named with every review it runs, so that nobody pays long without knowing at what.

Whether code does only what its rules say is the one judgement among the checks, so it is asked at high effort. With Codex, high was the lowest effort tried at which the reviewer refused, in every run, a change it must refuse. At lower efforts it passed that change in some runs or in all.

Nothing was measured with Claude. Its runner is asked the same effort so that the two runners judge alike.

The default of the runner `claude` is `opus`, the model Anthropic names as its default, rather than its most capable model. That model costs the user more for each review. The runner falls back to `sonnet` so that a review is held where `opus` is overloaded or not offered.

Which models Codex offers depends on how its user signs in. So the default of the runner `codex` is the one Codex chooses for that account.

Codex offers no run without tools. So its runner turns off every tool a setting reaches. For the same reason, its sandbox lets nothing be written.

A user with one agent has no other to run, so the runner follows the plugin a user has. A project wanting one reviewer for everyone names it.

The limit on a run's time is long, since it ends a run that hangs rather than hurrying one that reads a large change.

## The reviewer's verdict | key new:tools-10-verdict | sid s-68ds99w8wd67aae | tools 10.2 (new)

### Text

`sheriff review` refuses a commit on which it asks for a verdict (§s-vp24dqydygztqbt) unless the runner (§s-xr5xxa9cxf2mq5u) gives a verdict that `sheriff review` can read (§s-94k7b6r5kf65udf).

The runner's CLI is given the schema of the verdict. It answers with a JSON object that conforms to that schema. The verdict passes or refuses the commit and lists its findings. Each finding names the sids of the nodes that it concerns and the problem. A finding that concerns code also names the file and, where the problem lies at a line, that line.

`sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict and either passes the commit with no finding or refuses it with at least one.

### Reason

A verdict whose meaning `sheriff review` had to guess, such as a pass that lists a finding, would let `sheriff review` decide the commit in place of the reviewer.

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
  }
]
```

### The current node

(none: this node is new)

## How a runner is started | key new:tools-10-start | sid s-avvnasjhsfkgajh | tools 10.3 (new)

### Text

`sheriff review` starts a runner (§s-xr5xxa9cxf2mq5u) separately from the session that made the change, so that the runner is given nothing from that session (§s-nyh9yk22ba6g77q). It starts the runner:

with none of the user's settings, memory or hooks;

with a system prompt of its own;

in an empty working directory;

with every tool turned off that its command-line options can turn off;

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

## The time limit of a run | key new:tools-10-limit | sid s-wgedv32rdaqca9k | tools 10.4 (new)

### Text

`sheriff review` ends a run of the independent reviewer (§s-m4h279nbaqkpa3t) that is still running after the number of minutes that `review.minutes` in `sheriff.config.json` specifies (§s-zefk589ykh37b8u). The default of `review.minutes` is twenty. `sheriff review` ends the run together with every process that the runner (§s-xr5xxa9cxf2mq5u) has started, directly or through another process.

### Reason

A run of the reviewer that hangs, together with the processes it has started, keeps running at the expense of the user who commits until it is ended. The default time limit is long, so that it ends a run that hangs rather than one that reads a large change.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-94k7b6r5kf65udf"
  },
  {
    "type": "cites",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  }
]
```

### The current node

(none: this node is new)

## The runner `claude` | key new:tools-10-claude | sid s-3wh8uhgn9jr2k74 | tools 10.5 (new)

### Text

The runner `claude` (§s-xr5xxa9cxf2mq5u) is the Claude Code CLI in print mode. It runs with its session not kept. It requests the model and the reasoning effort that the settings of the runner specify (§s-tnz9zgqx8c629a7). Where that model is overloaded or unavailable, it falls back to the fallback model that those settings specify.

### Reason

In print mode, the CLI answers once and exits, with no session that could carry an earlier conversation into the review (§s-m4h279nbaqkpa3t).

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

## The runner `codex` | key new:tools-10-codex | sid s-u2n5hwwqkb6zk4z | tools 10.6 (new)

### Text

The runner `codex` (§s-xr5xxa9cxf2mq5u) is the Codex CLI run as `codex exec`, with a Codex home of its own. That home is created in a temporary directory for the run and deleted after it. It holds only a copy of the user's credentials.

The runner `codex` runs with:

its sandbox read-only;

its session not kept;

no skill offered.

It requests the model and the reasoning effort that the settings of the runner specify (§s-tnz9zgqx8c629a7). Where `specsheriff.review.codexModel` is empty, it requests no model.

### Reason

Codex offers no run without its own home and tools, so the runner restricts both: the home holds only the credentials, and the sandbox lets no tool write anything.

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
