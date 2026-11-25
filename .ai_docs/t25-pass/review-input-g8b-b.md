# Group 8 drafts for the review (generated 2026-11-25T16:42:53.333Z)

## Turning the git hooks on when a session starts | key new:tools-6-hooks-on | sid s-jgcveum8dwdnyzr | tools 6c (new, after “The working tree compared with what a push sends”)

### Text

In a repository whose root holds `sheriff.config.json`, the agent's hook run when a session starts (§s-477gtdrkw34dzxw) does the following with git's `core.hooksPath`:

where it is unset, the hook sets it to `.githooks` in the repository's git configuration and says so;

where it points to a different directory, the hook says that the git hooks that `sheriff init` writes (§s-7unxytshhc4md54) do not run.

The hook also names each git hook in `.githooks/` in either of the following cases:

git's index holds that git hook without the executable mode;

on a system whose files keep the executable bit, the git hook's file lacks that bit.

For each such git hook, the agent's hook says how to make the git hook executable on every system: `chmod +x <hook>` and `git update-index --chmod=+x <hook>`, then a commit. It leaves the mode of each file and git's index as they are. It leaves out the project's own tools in `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p).

### Reason

In a clone where git does not run the git hooks, no check runs on a commit. A git hook that git does not run cannot report that it was skipped, while the hook run when a session starts reaches every clone. The hook run when a session starts leaves recording a git hook's mode to the author of the next commit, since what a commit holds is its author's choice.

### Examples

```json
[
  {
    "en": "A repository set up on Windows has its git hooks committed without the executable mode. A developer clones it on Linux and starts a session. The hook run when a session starts names each git hook and says how to make it executable. The most likely mistake is to make the git hooks executable in the working tree without saying so, which leaves the index as it was, so that each of the other clones still gets git hooks that git skips.",
    "ru": "Репозиторий, настроенный в Windows, содержит git-хуки, закоммиченные без исполняемого режима. Разработчик клонирует его в Linux и начинает сессию. Хук, который запускается при начале сессии, называет каждый git-хук и сообщает, как сделать его исполняемым. Самая вероятная ошибка — молча сделать git-хуки исполняемыми в рабочем дереве: индекс остаётся прежним, и каждый другой клон по-прежнему получает git-хуки, которые git пропускает."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-epaw9sgyaajzn8g"
  },
  {
    "type": "cites",
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-7unxytshhc4md54"
  },
  {
    "type": "cites",
    "to": "s-n4m5zvh96yb299p"
  }
]
```

### The current node

(none: this node is new)

## The settings of each runner when a session starts | key new:tools-6-reviewer-settings | sid s-p29yawkkkgk7kxb | tools 6d (new, after “Turning the git hooks on when a session starts”)

### Text

In Claude Code, the hook run when a session starts writes into the user's git configuration, with `git config --global`, each setting of the runner `claude` (§s-tnz9zgqx8c629a7) that the user has given as an option of the plugin for Claude Code (§s-zh2vcr3xjumppg5). It does so in any repository, where the configuration lacks the setting or holds a different value.

Then, in a repository whose root holds `sheriff.config.json`, the agent's hook run when a session starts (§s-477gtdrkw34dzxw), in Claude Code or in Codex CLI, names each setting of the runner that `sheriff review` would run on a commit there (§s-xr5xxa9cxf2mq5u), where the user's git configuration lacks that setting.

That runner is the one that `review.runner` in `sheriff.config.json` names, or otherwise the runner of the agent whose plugin's SpecSheriff tools the git hooks would take there (§s-4mej6ccn7xu3d3p). With each setting, the hook names the default that `sheriff review` takes for it. It asks the agent to do the following:

to offer the user each default to confirm or replace;

to write with `git config --global` the value that the user gives in reply, even where that value is the default.

The hook makes this request once for each runner on each machine. After making it, the hook sets `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked` to `true` in the user's git configuration. While that key is `true`, the hook does not ask about that runner's settings.

### Reason

A run of the reviewer is paid for by the user who commits, so the user who commits chooses the reviewer's settings (§s-tnz9zgqx8c629a7), once, as soon as an agent can ask. The git hooks run the reviewer outside the agent, so they read those settings from the user's git configuration, where the hook run when a session starts also writes the options that Claude Code asked the user for.

### Examples

```json
[
  {
    "en": "A user installs the plugin for Codex CLI and opens a repository that `sheriff init --agent codex` has set up. The hook run when a session starts names `specsheriff.review.codexModel` and `specsheriff.review.codexEffort` with their defaults, and the agent asks the user about them. The user confirms the effort and names a model, and the agent writes both. The most likely mistake is to write the defaults without asking, so that the user pays for settings that the user never chose.",
    "ru": "Пользователь устанавливает плагин для Codex CLI и открывает репозиторий, который настроил `sheriff init --agent codex`. Хук, который запускается при начале сессии, называет `specsheriff.review.codexModel` и `specsheriff.review.codexEffort` с их значениями по умолчанию, и агент спрашивает о них пользователя. Пользователь подтверждает уровень рассуждений и называет модель, и агент записывает оба значения. Самая вероятная ошибка — записать значения по умолчанию, не спросив: тогда пользователь платит за настройки, которых он не выбирал."
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
    "to": "s-zh2vcr3xjumppg5"
  },
  {
    "type": "cites",
    "to": "s-tnz9zgqx8c629a7"
  },
  {
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  },
  {
    "type": "cites",
    "to": "s-4mej6ccn7xu3d3p"
  },
  {
    "type": "cites",
    "to": "s-477gtdrkw34dzxw"
  }
]
```

### The current node

(none: this node is new)

## The agent's hook after an edit | key new:tools-6-after-edit | sid s-hcmpjmwtgfwzncu | tools 6e (new, after “The reviewer's settings asked for when a session starts”)

### Text

After an agent's edit made with the file-editing tools, or after a shell command that the agent runs, the agent's hook (§s-477gtdrkw34dzxw) runs the SpecSheriff tools where either of the following holds:

the last commit or the working tree, other than the files that git ignores, differs from what the hook recorded in the clone's git directory when the checks last ran;

nothing is recorded.

Where nothing is recorded, the hook treats every file as one that differs.

Where it runs them, the hook runs the following, in this order:

`sheriff reindex` (§s-ztseyetus7np6br), where the files that differ include `sheriff.config.json`, a file under `specs/`, or a file that the SpecSheriff tools read to find SpecTags (§s-8xw4mgvpexyvw5q);

`sheriff markdown` (§s-e3495enbc5h75c3) and `sheriff map` (§s-rpv4fkdqqguptqd), where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb), and either the files that differ include `sheriff.config.json` or a file under `specs/`, or `sheriff reindex` has written a file;

`sheriff types` (§s-a8fn72xa782wvbk), where the files that differ include `sheriff.config.json`, a file under `specs/` or the code of a project's own generator (§s-km4x4s26kv7pjze), or where `sheriff reindex` has written a file;

`sheriff validate` (§s-6uqu6vn5fnp7fwb), `sheriff binding` (§s-p34692nwceaxq2p) and `sheriff citations` (§s-bgegrkhrgpefs69).

Where `sheriff reindex` refuses anything, for example a pair of values under one key (§s-w5wg69pvvhedsws) or a file that the schema refuses (§s-xzcw3hv4hmxz7h7), the hook stops after it. It then records the last commit and the working tree as they are at that moment.

The hook hands the agent the refusals of `sheriff reindex`, of `sheriff types` and of the checks, and names each node that `sheriff reindex` makes a draft. It hands them to Claude Code by exiting with code 2 and writing them to its standard error. It hands them to Codex in the answer that the agent's hooks for Codex CLI write (§s-n76wt2bkqdmh78x).

A failure of `sheriff markdown` or `sheriff map` to write its files is handed to the agent, and does not stop the hook.

Once the checks end, whether or not they refuse anything, the hook records the last commit and the working tree as they were when `sheriff validate` began. So a file changed while the checks run is checked at the next run.

### Reason

The checks run where the agent works, so that a mistake is found at the edit that makes it (§s-epaw9sgyaajzn8g). They run only where something has changed since they last ran, so that a session that only reads the repository through the shell is not held up.

### Examples

```json
[
  {
    "en": "An agent that has written the test of rule R adds the SpecTag of R to a function in a new file, `src/order.ts`. The hook runs `sheriff reindex`, which adds `src/order.ts` to the `meta.code` of R, and the checks then accept that list. The most likely mistake is to run `sheriff reindex` only where a file under `specs/` has changed, so that `sheriff binding` refuses the `meta.code` of R after an edit to code alone (§s-t383grkn3q68dpf).",
    "ru": "Агент, который уже написал тест правила R, добавляет SpecTag правила R к функции в новом файле `src/order.ts`. Хук запускает `sheriff reindex`, который добавляет `src/order.ts` в `meta.code` правила R, и затем проверки этот список принимают. Самая вероятная ошибка — запускать `sheriff reindex`, только если изменился файл внутри `specs/`: тогда после правки одного кода `sheriff binding` отвергает `meta.code` правила R (§s-t383grkn3q68dpf)."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-epaw9sgyaajzn8g"
  },
  {
    "type": "implements",
    "to": "s-kh8qcd5kxgh9z3j"
  },
  {
    "type": "cites",
    "to": "s-ztseyetus7np6br"
  },
  {
    "type": "cites",
    "to": "s-e3495enbc5h75c3"
  },
  {
    "type": "cites",
    "to": "s-rpv4fkdqqguptqd"
  },
  {
    "type": "cites",
    "to": "s-qgg6sfawtmwvrbb"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  },
  {
    "type": "cites",
    "to": "s-km4x4s26kv7pjze"
  },
  {
    "type": "cites",
    "to": "s-n76wt2bkqdmh78x"
  },
  {
    "type": "cites",
    "to": "s-t383grkn3q68dpf"
  },
  {
    "type": "cites",
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-6uqu6vn5fnp7fwb"
  },
  {
    "type": "cites",
    "to": "s-p34692nwceaxq2p"
  },
  {
    "type": "cites",
    "to": "s-bgegrkhrgpefs69"
  },
  {
    "type": "cites",
    "to": "s-w5wg69pvvhedsws"
  },
  {
    "type": "cites",
    "to": "s-xzcw3hv4hmxz7h7"
  }
]
```

### The current node

(none: this node is new)

## An edit judged before it is made | key s-st6td4mua9uqt9z | sid s-st6td4mua9uqt9z | tools 7.3.2

### Text

`sheriff guard` refuses each of the following edits by an agent (§s-83ev4wwesbwnhnp):

an edit after which a node that it adds, or a node whose wording (§s-5ah25f6gy99panq) or approval status (§s-tgrnpagrb58tya7) it changes, is approved while no approval of that node's wording is in force (§s-v4qus7raqnwzneb);

an edit that adds or changes code bound to a rule (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp), other than tests, while no test of the system's code (§s-hheus6f395ynqvc) declares that rule's SpecTag (§s-zrsc6asgmhv8tnc);

an edit to `specs/_approvals.jsonl`, whatever it changes;

an edit that adds, changes or removes an entry in one of the lists `approvalStatus`, `strict` and `extensions` of `sheriff.config.json` (§s-d3nkw9b6mn98vuw).

The refusal names each such node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and each such rule by its sid and its location. Where a test names such a rule only by a bare sid (§s-gb8s9657a65hqmv), the refusal also names `sheriff reindex`, which writes the test's SpecTag.

For an edit to `specs/_approvals.jsonl`, the refusal names `sheriff approve`, which records an approval and its withdrawal (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). For an edit to an entry of one of those lists, it names the list and `sheriff settings` (§s-chsfpkgpmfk4fft).

While the installed SpecSheriff plugin lacks an extension that the project has chosen, `sheriff guard` refuses every edit, and names each missing extension and the version of the SpecSheriff tools in the plugin (§s-mhsb6fjsq5xn6c9).

`sheriff guard` judges an edit made with Claude Code's `Write`, `Edit` or `MultiEdit`, and a patch that Codex's `apply_patch` applies (§s-n76wt2bkqdmh78x). It reads the edit, as the agent's harness describes it, from its standard input. It builds each file as the edit would leave it, without writing it to disk. Where an edit made with `Edit` or `MultiEdit` would not apply, for example where it names text that the file does not hold, `sheriff guard` lets the tool refuse it.

`sheriff guard` judges the nodes in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It leaves out each node whose approval status is derived from other nodes, such as a section (§s-9kfdycuq34beqvs). It leaves to the checks after the edit (§s-hcmpjmwtgfwzncu) a file of the specification that would not be valid JSON after the edit.

`sheriff guard` finds the code that an edit adds or changes in the same way as it finds what a commit adds or changes (§s-2x58az67bm6cxq2), comparing each file as it is with the file as the edit would leave it. It looks for a test that declares the rule's SpecTag among the tests of the working tree as the edit would leave it.

`sheriff guard` reads the lists of `sheriff.config.json` from the file as it is and as the edit would leave it. A `sheriff.config.json` that is missing or is not valid JSON is read as holding none of those lists.

Where it refuses an edit, `sheriff guard` writes the refusal to its standard error and exits with code 2. `sheriff guard` refuses these edits regardless of whether the specification is approved or a draft.

### Reason

`sheriff guard` judges each file as the edit would leave it, so that an edit that the rule on an agent's edit forbids is refused before anything is written (§s-83ev4wwesbwnhnp). It judges only what the edit adds or changes, so that what the edit leaves as it was never holds up the edit.

### Examples

```json
[
  {
    "en": "An owner asks the agent to approve the specification, and the agent tries to add an entry to `approvalStatus` in `sheriff.config.json` with its editing tool. `sheriff guard` refuses the edit and names `approvalStatus` and `sheriff settings`, and the agent runs `sheriff settings status approved`. The most likely mistake is to judge only the files under `specs/`, so that the entry is written without `sheriff settings`, which checks that whoever records it is an owner.",
    "ru": "Ответственный просит агента одобрить спецификацию, и агент пытается добавить запись в `approvalStatus` в `sheriff.config.json` своим инструментом редактирования. `sheriff guard` отвергает правку и называет `approvalStatus` и `sheriff settings`, и агент запускает `sheriff settings status approved`. Самая вероятная ошибка — оценивать только файлы внутри `specs/`: тогда запись появляется в обход `sheriff settings`, который проверяет, что её делает ответственный."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-83ev4wwesbwnhnp"
  },
  {
    "type": "cites",
    "to": "s-5ah25f6gy99panq"
  },
  {
    "type": "cites",
    "to": "s-tgrnpagrb58tya7"
  },
  {
    "type": "cites",
    "to": "s-v4qus7raqnwzneb"
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
    "to": "s-zrsc6asgmhv8tnc"
  },
  {
    "type": "cites",
    "to": "s-d3nkw9b6mn98vuw"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-upkur92ry6332y5"
  },
  {
    "type": "cites",
    "to": "s-xybjqp2rxh8gszf"
  },
  {
    "type": "cites",
    "to": "s-chsfpkgpmfk4fft"
  },
  {
    "type": "cites",
    "to": "s-mhsb6fjsq5xn6c9"
  },
  {
    "type": "cites",
    "to": "s-n76wt2bkqdmh78x"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-9kfdycuq34beqvs"
  },
  {
    "type": "cites",
    "to": "s-hcmpjmwtgfwzncu"
  },
  {
    "type": "cites",
    "to": "s-2x58az67bm6cxq2"
  },
  {
    "type": "cites",
    "to": "s-gb8s9657a65hqmv"
  }
]
```

### The current node

Title: An edit judged before it is made

`sheriff guard` builds the file as the edit would leave it, without writing it to disk.

- Each changed line counts for the symbol it stands in. A line holding a SpecTag counts for the symbol the SpecTag marks (§s-2x58az67bm6cxq2).
- The SpecTags of each changed symbol are looked up among the sids named by the SpecTags of the working tree's tests, the edited file as it would stand included.
- A node the edit leaves approved is looked up in the approvals, a section and a domain's header left out. The latest line for its sid and the fingerprint of its wording must be an approval (§s-95w92rnjuv3sst8).
- An edit of a file the settings name as the code of a project's own check or generator is refused where no test of the working tree carries the SpecTag of the rule listing it (§s-sfjka4zc4rhfu67).
- An edit of `specs/_approvals.jsonl` is refused whatever it changes, since `sheriff approve` records an approval and its withdrawal (§s-v4qus7raqnwzneb).

Reason: (none)
