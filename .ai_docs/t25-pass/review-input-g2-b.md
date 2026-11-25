# Group 1 drafts for review (generated 2026-11-24T00:59:48.390Z)

## Who runs the reviewer | key new:tools-10-section | sid s-v36s7dm8s3yewtr | tools 10 (new section, in place of the node "Who runs the reviewer")

### Text

How `sheriff review` runs the independent reviewer (§s-m4h279nbaqkpa3t), and how it reads the reviewer's verdict.

### Reason

(none)

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

(none: this node is new)

## Which runner runs the reviewer | key s-xr5xxa9cxf2mq5u | sid s-xr5xxa9cxf2mq5u | tools 10.1

### Text

`sheriff review` hands the reviewer's input to a runner, which is an agent's CLI started for the run (§s-avvnasjhsfkgajh). The runner is `claude` (§s-3wh8uhgn9jr2k74) or `codex` (§s-u2n5hwwqkb6zk4z).

`sheriff review` runs the runner that `review.runner` in `sheriff.config.json` names (§s-zefk589ykh37b8u). Where `review.runner` is not set, it runs the runner of the SpecSheriff plugin whose tools run `sheriff review`. The file `agent`, which the build writes beside `release`, names that runner:

`claude` for the plugin for Claude Code (§s-zh2vcr3xjumppg5);

`codex` for the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4).

SpecSheriff tools that hold no such file take `claude`.

The project-wide settings of the reviewer in `sheriff.config.json` are `review.runner` and `review.minutes`, which sets the time limit of a run (§s-wgedv32rdaqca9k).

### Reason

A user with one agent has no other agent to run, so the runner follows the plugin that the user has. A project that wants one reviewer for everyone names it in `review.runner`.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-m4h279nbaqkpa3t"
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

`sheriff review` refuses a commit where the runner gives no verdict that `sheriff review` can read (§s-94k7b6r5kf65udf). The refusal says why no verdict could be read, for example that the runner is not installed or that the run went beyond its time limit (§s-wgedv32rdaqca9k).

The runner's CLI is given the schema of the verdict. It answers with a JSON object held to that schema. The verdict passes or refuses the commit and lists its findings. Each finding names the sids of the nodes that it concerns and the problem, and, where it concerns code, the file and the line.

`sheriff review` treats each of the following as a verdict that cannot be read:

an answer that is not held to the schema of the verdict;

a verdict that passes the commit with a finding;

a verdict that refuses the commit with none.

### Reason

`sheriff review` lets a commit through only on a verdict whose meaning it need not guess. An answer held to the schema and consistent with itself can be read without guessing.

### Examples

```json
[
  {
    "en": "The runner answers with a verdict that passes the commit and lists one finding. `sheriff review` reads it as a verdict that cannot be read and refuses the commit. The most likely mistake is to pass the commit and drop the finding, which decides for the reviewer what it meant.",
    "ru": "Runner отвечает вердиктом, который пропускает коммит и перечисляет одно замечание. `sheriff review` считает его вердиктом, который нельзя прочитать, и отклоняет коммит. Самая вероятная ошибка — пропустить коммит и отбросить замечание: так инструмент решает за рецензента, что тот имел в виду."
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
    "to": "s-wgedv32rdaqca9k"
  }
]
```

### The current node

(none: this node is new)

## How a runner is started | key new:tools-10-start | sid s-avvnasjhsfkgajh | tools 10.3 (new)

### Text

`sheriff review` starts a runner apart from the session that made the change, so that the runner is given nothing from that session (§s-nyh9yk22ba6g77q). It starts the runner:

with none of the user's settings, memory or hooks;

with a system prompt of its own;

in an empty working directory;

with every tool that its command line can turn off turned off;

as a program, never through a shell.

A CLI that npm installs on Windows as a command script is started as the program that the script starts, with the arguments that the script gives it.

The runner's environment holds only the variables that the list of this node allows. They name:

the search path of programs, the folders of the operating system and of the user, and the user's name;

the locale;

a proxy, the hosts that it skips and the certificates to trust;

where the runner's CLI keeps its sign-in, the sign-in itself, and the provider serving the model.

### Reason

The runner judges the change by the rules alone (§s-nyh9yk22ba6g77q), so nothing from the session that made the change may reach it.

### Examples

```json
[
  {
    "en": "An agent's session sets variables of its own, and a git hook sets `GIT_DIR` to the repository. Neither is in the list, so neither reaches the runner, which therefore cannot read the repository through `GIT_DIR` from its empty working directory. The most likely mistake is to strip a list of known variables instead, which misses each variable that a new release of an agent adds.",
    "ru": "Сессия агента задаёт свои переменные, а git-хук задаёт `GIT_DIR` на репозиторий. Их нет в списке, поэтому ни одна из них не доходит до runner, и он не может прочитать репозиторий через `GIT_DIR` из своего пустого рабочего каталога. Самая вероятная ошибка — вместо этого убирать список известных переменных: так пропускается каждая переменная, которую добавляет новый выпуск агента."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-nyh9yk22ba6g77q"
  }
]
```

### The current node

(none: this node is new)

## The time limit of a run | key new:tools-10-limit | sid s-wgedv32rdaqca9k | tools 10.4 (new)

### Text

`sheriff review` ends a run of the reviewer that is still going after the number of minutes that `review.minutes` in `sheriff.config.json` gives (§s-zefk589ykh37b8u). It ends the run together with every process that the runner has started. Unless `review.minutes` is set, the limit is twenty minutes.

### Reason

A process left running after the limit would go on costing the person who commits. The limit is long, so that it ends a run that hangs rather than one that reads a large change.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-94k7b6r5kf65udf"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  }
]
```

### The current node

(none: this node is new)
