# Group 8 drafts for the review (generated 2026-11-25T16:09:07.966Z)

## Turning the git hooks on when a session starts | key new:tools-6-hooks-on | sid s-jgcveum8dwdnyzr | tools 6c (new, after “The working tree compared with what a push sends”)

### Text

When a session starts in a repository whose root holds `sheriff.config.json`, the agent's hook (§s-477gtdrkw34dzxw) does the following with git's `core.hooksPath`:

where it is unset, the hook sets it to `.githooks` and says so;

where it names another directory, the hook says that the git hooks that `sheriff init` writes (§s-7unxytshhc4md54) do not run.

The hook also names each git hook in `.githooks/` in either of the following cases:

git's index holds the hook without the executable mode;

on a system whose files keep the executable bit, the hook's file lacks that bit.

For each such hook, it says how to make the hook executable on every system: `chmod +x <hook>` and `git update-index --chmod=+x <hook>`, then a commit. It changes neither the mode of a file nor git's index. It leaves out the project's own tools in `.githooks/<hook>.d/`, which run by the interpreter that their first line names (§s-n4m5zvh96yb299p).

### Reason

On a system whose files keep the executable bit, git skips a hook that cannot be executed and refuses nothing, so a commit there would pass no check. The session start reaches every clone, while a hook that git skips cannot report itself. The session start leaves the mode to the author, since recording the mode is staging.

### Examples

```json
[
  {
    "en": "A repository set up on Windows has its git hooks committed without the executable mode. A developer clones it on Linux and starts a session. The session start names each hook and says how to make it executable. The most likely mistake is to make the hooks executable in the working tree without saying so, which leaves the index as it was, so that each of the other clones still gets hooks that git skips.",
    "ru": "Репозиторий, настроенный в Windows, содержит git-хуки, закоммиченные без исполняемого режима. Разработчик клонирует его в Linux и начинает сессию. Начало сессии называет каждый хук и сообщает, как сделать его исполняемым. Самая вероятная ошибка — молча сделать хуки исполняемыми в рабочем дереве: индекс остаётся прежним, и каждый другой клон по-прежнему получает хуки, которые git пропускает."
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

## The reviewer's settings asked for when a session starts | key new:tools-6-reviewer-settings | sid s-p29yawkkkgk7kxb | tools 6d (new, after “Turning the git hooks on when a session starts”)

### Text

When a session starts, the agent's hook of the plugin for Claude Code (§s-zh2vcr3xjumppg5) writes into the user's git configuration, with `git config --global`, each setting of the runner `claude` (§s-tnz9zgqx8c629a7) that the user has given as an option of that plugin. It does so in any repository, wherever the configuration lacks the setting or holds another value.

Then, in a repository whose root holds `sheriff.config.json`, the agent's hook of either SpecSheriff plugin names each setting that the user's git configuration lacks for the runner that `sheriff review` would run at a commit there (§s-xr5xxa9cxf2mq5u). That runner is the one that `review.runner` names, or otherwise the runner of the SpecSheriff tools that the git hooks would take there (§s-4mej6ccn7xu3d3p). With each setting, the hook names the default that `sheriff review` takes for it. It asks the agent to do the following:

to offer the user each default to confirm or replace;

to write with `git config --global` the value that the user gives in reply, including the default.

The hook asks so once for each runner on each machine. After asking, it records `true` in the user's git configuration as `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked`. While that record holds `true`, the hook asks nothing.

### Reason

A run of the reviewer is paid for by the user who commits, so that user chooses its settings (§s-tnz9zgqx8c629a7), once, as soon as an agent can ask. The git hooks run the reviewer outside the agent, so they read those settings from the user's git configuration, where the session start also writes the options that Claude Code asked for.

### Examples

```json
[
  {
    "en": "A user installs the plugin for Codex CLI and opens a repository that has taken up the method. The session start names `specsheriff.review.codexModel` and `specsheriff.review.codexEffort` with their defaults, and the agent asks the user about them. The user confirms the effort and names a model, and the agent writes both. The most likely mistake is to write the defaults without asking, so that the user pays for settings that the user never chose.",
    "ru": "Пользователь устанавливает плагин для Codex CLI и открывает репозиторий, который перешёл на метод. Начало сессии называет `specsheriff.review.codexModel` и `specsheriff.review.codexEffort` с их значениями по умолчанию, и агент спрашивает о них пользователя. Пользователь подтверждает уровень рассуждений и называет модель, и агент записывает оба значения. Самая вероятная ошибка — записать значения по умолчанию, не спросив: тогда пользователь платит за настройки, которых он не выбирал."
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
  }
]
```

### The current node

(none: this node is new)

## The agent's hook after an edit | key new:tools-6-after-edit | sid s-hcmpjmwtgfwzncu | tools 6e (new, after “The reviewer's settings asked for when a session starts”)

### Text

After an agent's edit made with the file-editing tools, or after a shell command that the agent runs, the agent's hook runs the SpecSheriff tools where either of the following holds:

the last commit or the working tree, other than the files that git ignores, differs from what the hook noted in the clone's git directory when the checks last ran;

nothing is noted.

Where it runs them, the hook runs the following, in this order:

`sheriff reindex` (§s-ztseyetus7np6br), where the files that differ include a file under `specs/`, `sheriff.config.json`, or a file in which the SpecSheriff tools look for SpecTags, as the settings in `sheriff.config.json` (§s-zefk589ykh37b8u) set them;

where the files that differ include a file under `specs/` or `sheriff.config.json`, or where `sheriff reindex` has written a file: `sheriff markdown` (§s-e3495enbc5h75c3) and `sheriff map` (§s-rpv4fkdqqguptqd), if the project has chosen the Views extension (§s-qgg6sfawtmwvrbb);

`sheriff types` (§s-a8fn72xa782wvbk), under the same condition, and also where the files that differ include the code of a project's own generator (§s-km4x4s26kv7pjze);

`sheriff validate`, `sheriff binding` and `sheriff citations`, which read the working tree, with its difference from the last commit as the commit being made.

Where `sheriff reindex` refuses, the hook runs nothing after it.

The hook hands the agent what `sheriff types` and the checks refuse, and names each node that `sheriff reindex` makes a draft. It hands them to Claude Code by exiting with code 2 and writing them to its standard error. It hands them to Codex as the agent's hooks for Codex CLI say (§s-n76wt2bkqdmh78x).

Once the checks end, whatever they found, the hook notes the last commit and the working tree as they were when the checks began. So a file changed while the checks run is checked at the next run.

### Reason

The checks run where the agent works, so that a mistake is found at the edit that makes it (§s-epaw9sgyaajzn8g). They run only where something has changed since they last ran, so that a session that only reads the repository through the shell is not held up.

### Examples

```json
[
  {
    "en": "An agent adds the SpecTag of rule R to a function in a new file, `src/order.ts`. The hook runs `sheriff reindex`, which adds `src/order.ts` to the `meta.code` of R, and the checks then accept that list. The most likely mistake is to run `sheriff reindex` only where a file under `specs/` has changed, so that `sheriff binding` refuses the `meta.code` of R after an edit to code alone (§s-t383grkn3q68dpf).",
    "ru": "Агент добавляет SpecTag правила R к функции в новом файле `src/order.ts`. Хук запускает `sheriff reindex`, который добавляет `src/order.ts` в `meta.code` правила R, и затем проверки этот список принимают. Самая вероятная ошибка — запускать `sheriff reindex`, только если изменился файл внутри `specs/`: тогда после правки одного кода `sheriff binding` отвергает `meta.code` правила R (§s-t383grkn3q68dpf)."
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
    "to": "s-zefk589ykh37b8u"
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
  }
]
```

### The current node

(none: this node is new)

## An edit judged before it is made | key s-st6td4mua9uqt9z | sid s-st6td4mua9uqt9z | tools 7.3.2

### Text

`sheriff guard` refuses each of the following edits by an agent (§s-83ev4wwesbwnhnp):

an edit that leaves approved a node that it adds, or a node whose wording (§s-5ah25f6gy99panq) or approval status (§s-tgrnpagrb58tya7) it changes, while no approval of that wording is in force (§s-v4qus7raqnwzneb);

an edit that adds or changes code bound to a rule (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp), other than tests, while no test of the system's code (§s-hheus6f395ynqvc) declares that rule's SpecTag (§s-zrsc6asgmhv8tnc);

an edit of `specs/_approvals.jsonl`, whatever it changes;

an edit that adds, changes or removes an entry in the list `approvalStatus`, `strict` or `extensions` of `sheriff.config.json` (§s-d3nkw9b6mn98vuw).

The refusal names each such node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and each such rule by its sid and its location. For an edit of `specs/_approvals.jsonl`, it names `sheriff approve`, which records an approval and its withdrawal (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). For an edit of an entry, it names the list and `sheriff settings` (§s-chsfpkgpmfk4fft).

While the installed SpecSheriff plugin lacks an extension that the project has chosen, `sheriff guard` refuses every edit and names each missing extension (§s-mhsb6fjsq5xn6c9).

`sheriff guard` judges an edit made with Claude Code's `Write`, `Edit` or `MultiEdit`, and a patch that Codex's `apply_patch` applies (§s-n76wt2bkqdmh78x). It reads the edit, as the agent's harness describes it, on its standard input. It builds each file as the edit would leave it, without writing it to disk. Where the edit would not apply, as where `Edit` names text that the file does not hold, `sheriff guard` lets the tool refuse it.

`sheriff guard` judges the nodes in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It leaves out each node whose approval status is derived from other nodes, such as a section (§s-9kfdycuq34beqvs). It leaves to the checks after the edit (§s-hcmpjmwtgfwzncu) a file of the specification that the edit would leave other than valid JSON.

`sheriff guard` finds the code that an edit adds or changes as it finds what a commit adds or changes (§s-2x58az67bm6cxq2), comparing each file as it is with the file as the edit would leave it. It looks for the test among the tests of the working tree as the edit would leave it.

`sheriff guard` reads the lists of `sheriff.config.json` from the file as it is and as the edit would leave it. A `sheriff.config.json` that is missing or is not valid JSON is read as holding none of those lists.

Where it refuses an edit, `sheriff guard` writes the refusal to its standard error and exits with code 2. It makes these checks regardless of whether the specification is approved or a draft.

### Reason

`sheriff guard` judges each file as the edit would leave it, so that an edit that the rule on an agent's edit forbids is refused before anything is written (§s-83ev4wwesbwnhnp). It judges only what the edit changes, so that what other files already hold never holds up an edit that the rule allows.

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
