# Group 8 drafts for the review (generated 2026-11-25T16:42:53.279Z)

## The hooks | key s-477gtdrkw34dzxw | sid s-477gtdrkw34dzxw | tools 6

### Text

The following hooks run the SpecSheriff tools, and with them the checks before and after an agent's edit, on a commit and on a push (§s-epaw9sgyaajzn8g):

the git hooks, which `sheriff init` writes into `.githooks/` (§s-7unxytshhc4md54), and each of which runs the SpecSheriff tools that a plugin keeps on the machine (§s-4mej6ccn7xu3d3p):

`pre-commit`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), `sheriff types` and the checks (§s-npnmwyt6s3gypwe);

`commit-msg`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), then `sheriff commit-message`, and then, only after `sheriff commit-message` has passed, `sheriff review` (§s-4kd2pave7vm4hmd);

`pre-push`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), then compares the working tree with what the push sends (§s-8a5eyy5n5hnsgrs), and runs the tests (§s-b6qdtghnyha3fhk) only where that comparison has refused nothing.

the agent's hooks, which the plugin for Claude Code declares (§s-zh2vcr3xjumppg5) and which `sheriff init --agent codex` writes into the project for Codex CLI (§s-n76wt2bkqdmh78x):

when a session starts, a hook that turns the git hooks on (§s-jgcveum8dwdnyzr) and has the agent ask the user for the settings of each runner (§s-p29yawkkkgk7kxb);

before an edit made with the file-editing tools, a hook that runs `sheriff guard` (§s-st6td4mua9uqt9z);

after such an edit or a shell command, a hook that writes what is generated from the nodes and runs the checks (§s-hcmpjmwtgfwzncu).

On a commit, the pre-commit hook and the commit-msg hook each write out what is staged to a directory of its own. They run `sheriff types` and the checks there, with that directory as git's working tree, against the repository's history.

Each check run by the pre-commit hook, the commit-msg hook or the agent's hook after an edit reads the commit being made. On a commit, that commit is what is staged. After an edit, it is the working tree's difference from the last commit. Besides that commit, such a check reads only the following:

the SpecSheriff guidelines and the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g), with the schema of the guidelines and that of each such extension that has one, as they are delivered with the SpecSheriff tools that run the check (§s-bsya3febm6u64ab);

the settings of the reviewer's runner in the git configuration of the user who commits, for the review (§s-tnz9zgqx8c629a7);

the repository's history and the commit message, where the node on how the check is made (§s-4kd2pave7vm4hmd) says so.

### Reason

A check reads the commit being made, because judging anything else would pass or refuse what is not being committed. The hooks that the repository keeps and those that the plugin for Claude Code declares run each check at the moment set for it in every clone, whoever makes the change (§s-epaw9sgyaajzn8g).

### Examples

```json
[
  {
    "en": "A developer stages a change to rule R and leaves a second change to R unstaged. On the commit, `sheriff validate` reads R as it is staged. The most likely mistake is to run the checks on the working tree, so that they judge the second change, which the commit does not hold.",
    "ru": "Разработчик добавляет в стейджинг одно изменение правила R, а второе изменение R оставляет вне стейджинга. При коммите `sheriff validate` читает R в том виде, в каком оно находится в стейджинге. Самая вероятная ошибка — запускать проверки на рабочем дереве: тогда они оценивают второе изменение, которого коммит не содержит."
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
    "to": "s-7unxytshhc4md54"
  },
  {
    "type": "cites",
    "to": "s-4mej6ccn7xu3d3p"
  },
  {
    "type": "cites",
    "to": "s-npnmwyt6s3gypwe"
  },
  {
    "type": "cites",
    "to": "s-n4m5zvh96yb299p"
  },
  {
    "type": "cites",
    "to": "s-4kd2pave7vm4hmd"
  },
  {
    "type": "cites",
    "to": "s-b6qdtghnyha3fhk"
  },
  {
    "type": "cites",
    "to": "s-8a5eyy5n5hnsgrs"
  },
  {
    "type": "cites",
    "to": "s-zh2vcr3xjumppg5"
  },
  {
    "type": "cites",
    "to": "s-n76wt2bkqdmh78x"
  },
  {
    "type": "cites",
    "to": "s-jgcveum8dwdnyzr"
  },
  {
    "type": "cites",
    "to": "s-p29yawkkkgk7kxb"
  },
  {
    "type": "cites",
    "to": "s-st6td4mua9uqt9z"
  },
  {
    "type": "cites",
    "to": "s-hcmpjmwtgfwzncu"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-bsya3febm6u64ab"
  },
  {
    "type": "cites",
    "to": "s-bpdqd9v72wg7vsz"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-hr7j7scmfkkjnws"
  },
  {
    "type": "cites",
    "to": "s-jau82aq9juv9zzh"
  },
  {
    "type": "cites",
    "to": "s-kh8qcd5kxgh9z3j"
  },
  {
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  },
  {
    "type": "cites",
    "to": "s-9kfdycuq34beqvs"
  },
  {
    "type": "cites",
    "to": "s-tnz9zgqx8c629a7"
  }
]
```

### The current node

Title: The hooks

Each check lives in a command a git hook calls:

- `.githooks/pre-commit` runs `sheriff export` and `sheriff render`, then `sheriff validate`, `sheriff binding` and `sheriff citations`, and last `sheriff types`;
- `.githooks/commit-msg` runs `sheriff message` and then `sheriff review` on the file git hands it;
- `.githooks/pre-push` runs the tests of the system's code and of the project's own checks and generators, by the command `sheriff.config.json` names as its `testCommand`, as §s-b6qdtghnyha3fhk says.

A clone turns the git hooks on with `git config core.hooksPath .githooks`. The `SessionStart` hook of the agent, the plugin's for Claude Code or the project's for Codex (§s-n76wt2bkqdmh78x), runs that command where `core.hooksPath` is unset, saying so. It reports where `core.hooksPath` names another directory.

The `SessionStart` hook also names each git hook in `.githooks/` in one of these cases:

- git's index holds it without the executable mode;
- on a system whose files keep the executable bit, its file lacks the bit.

It says how to make each one executable on every system: `chmod +x <hook>` and `git update-index --chmod=+x <hook>`, then a commit. It changes neither the mode of a file nor git's index.

The `SessionStart` hook of the plugin for Claude Code writes into the user's git configuration, by `git config --global`, each setting of the runner `claude` (§s-xr5xxa9cxf2mq5u) the user has given as an option of that plugin (§s-zh2vcr3xjumppg5). It writes a setting wherever the configuration lacks it or holds another value.

Where the git configuration lacks a setting of the runner `sheriff review` would take at a commit in the repository (§s-xr5xxa9cxf2mq5u, §s-4mej6ccn7xu3d3p), the `SessionStart` hook of either agent names each such setting. With each, it names the default `sheriff review` takes for it. It asks the agent to do the following:

- to offer the user each default to confirm or replace;
- to write with `git config --global` the value the user answers, the default included.

It asks so once for each runner on each machine, and marks it asked in the git configuration, as `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked`. Where the mark stands, it asks nothing.

At a commit, the checks read what is staged. What is staged is written out to a directory of its own and read there against the repository's history. The export and the map are written in the working tree. A failure to write them is reported and stops nothing.

Whatever the checks found, `sheriff types` then runs in the directory the staged files are written out to. The pre-commit hook copies each file `sheriff types` writes there into the working tree, in place of what stands at the same path. The hook stages none of them. What `sheriff types` refuses stops the commit.

Before a push that runs the tests (§s-b6qdtghnyha3fhk), the pre-push hook compares the working tree with the commit each ref the push creates or updates names, directly or through a tag. It leaves aside the files the working tree ignores. It refuses the push where a file is in one of these cases, naming each such file:

- it differs between the working tree and the commit;
- it stands in only one of them;
- it stands in the working tree without having been added.

Otherwise it runs the tests in the working tree.

The agent's hooks are Claude Code's, which the plugin for Claude Code declares (§s-zh2vcr3xjumppg5), and Codex's, which `sheriff init` writes into the project (§s-n76wt2bkqdmh78x). Before an edit made with the file tools or with `apply_patch`, `sheriff guard` judges it.

After such an edit or a shell command (Claude Code's `Bash` or `PowerShell`), the checks run over the working tree where one of the following holds:

- the last commit or the working tree, the files it ignores left aside, differs from what the hook noted in the clone's git directory once the checks last ran;
- nothing is noted.

The checks read the working tree's difference from the last commit as the commit. They run in this order:

- first, where a file under `specs/`, `sheriff.config.json` or a file the settings name as the code of a project's own generator differs, `sheriff reindex`, `sheriff export`, `sheriff render` and `sheriff types`;
- then `sheriff validate`, `sheriff binding` and `sheriff citations`.

What they refuse is reported to the agent. So is each node that `sheriff reindex` made a draft, a section and a domain's header left out (§s-9kfdycuq34beqvs).

An edit made through the shell is not judged before it is made. Nor is a file `sheriff types` writes after an edit. The checks after them and at the commit still read them.

Reason: A hook runs each check where the commit is made, so that none depends on whoever commits remembering it. Kept in the repository and turned on by one setting, the hooks are the same in every clone.

The agent's hooks come with the plugin for Claude Code and with the project for Codex, so that every clone's agent is held by them. They turn the git hooks on, so that no clone's gate depends on its user remembering to.

The checks read the working tree against the last commit, so where neither changed since they last ran they would find what they found then. The reindex, the export, the map and the types are made from `specs/` and `sheriff.config.json` alone. Run only where a change can bear on them, they hold up no session reading the repository through the shell. Compared with where they last ran, a change made between calls, by a command left running or by hand, is checked at the next call.

A node the reindex made a draft waits for its owners again. An agent not told goes on as if the node were still approved. A section's or a header's status follows its nodes, so reporting it would only repeat them.

On a system whose files keep the executable bit, git skips a hook whose file lacks it, printing a hint and refusing nothing. So a commit there passes no check while the hooks are on. The session start reaches every clone, among them those where the git hooks are skipped and so cannot report. It reaches, too, every repository whose hooks were committed or staged again without the mode.

The session start leaves the mode to the author, since a mode changed in the working tree alone is a difference the pre-push hook refuses. Recording the mode in the index is staging, which is the author's choice.

The settings the reviewer runs at are a choice of what the user pays, so only the user makes it (§s-xr5xxa9cxf2mq5u). The user makes it once, when they install the plugin, as they decide to take the plugin itself, so that no later session is interrupted by it.

Claude Code asks for a plugin's options when it enables the plugin, and hands them to the plugin's own components. The git hooks that run the reviewer run outside Claude Code. So the plugin's session start writes the options where the git hooks read them, in any repository, so that a project set up later finds them there. It writes them wherever they differ, so that a change the user makes to them reaches the reviewer.

Codex asks nothing for a plugin it installs, and its agent's hooks stand in the project (§s-n76wt2bkqdmh78x). So the first session in a repository taking the method is the earliest its user can be asked. A user Claude Code enabled the plugin for without asking is in the same case. A hook cannot ask the user anything, so it has the agent ask.

The question is put once, its mark keeping it from being put again, since a setting left unanswered is named at every review it costs (§s-xr5xxa9cxf2mq5u). Only the runner that would run is asked for, since a user is asked only about what they will pay for.

The types and RuntimeChecks generated from the RecordTypes are generated after every edit an agent makes and at every commit, so that they follow the nodes at the first edit or commit after every node they are generated from is approved (§s-kh8qcd5kxgh9z3j), and a person who edits the nodes without an agent has no hook between edits.

At a commit they are generated from the staged nodes, because a commit is judged only by what it holds (§s-jau82aq9juv9zzh). What `sheriff types` refuses there is a fault of that commit. The copy it writes is the one that commit has to hold.

At a commit `sheriff types` runs after the checks, so that they read what is staged rather than a copy the hook wrote. It runs whatever they found, since the check of the generated copies is among them and refuses exactly the commit whose copies it writes. After an edit it runs before them, so that they read the copies the edited nodes produce rather than report ones about to be replaced.

The copy goes to the working tree, since the directory the commit is written out to is gone once the hook ends, and the author stages from the working tree. It replaces whatever stands at that path, since a generated copy is never edited (§s-kh8qcd5kxgh9z3j).

What a commit holds is its author's choice, so the hook stages nothing. A commit holding a copy left behind nodes that are all approved still does not pass. The check at the commit comparing each kept generated copy with what the staged nodes produce refuses that commit until its author stages the new copy.

A failure to write the export or the map stops no commit, since the commit holds neither, and every check reads the commit being made and never what it does not hold (§s-jau82aq9juv9zzh).

A test run judges a commit only where the files it reads are those the commit holds, since every check reads the commit being made and never what it does not hold (§s-jau82aq9juv9zzh). The tests run in the working tree rather than in a copy of the commit, because they need what each checkout installs or builds for itself, which a copy of the commit lacks.

The files the working tree ignores are left out of the comparison of the working tree with each commit, because each checkout makes or keeps its own copy of them. So where a commit holds such a file, as a commit of a build's output does, the working tree's copy need not match it.

The refusal names the files the push is refused for, because whether each is committed, removed or ignored is for whoever pushes to decide.

## The pre-commit hook | key new:tools-6-pre-commit | sid s-npnmwyt6s3gypwe | tools 6a (new, after “The hooks”)

### Text

The pre-commit hook runs the following, in this order (§s-pcnyfp7gev7syax):

the project's own tools for that hook that the project's own guidelines (§s-u7tw6m8npxmv5tu) list as tools that rewrite files (§s-t9j29hppag2nren, §s-n4m5zvh96yb299p);

`sheriff types` (§s-a8fn72xa782wvbk), run on the files as they are staged;

the project's other tools for that hook (§s-n4m5zvh96yb299p);

`sheriff validate` (§s-6uqu6vn5fnp7fwb), which first checks for a key written more than once (§s-7zqsstgnuc772ba) and validates against the schema (§s-xzcw3hv4hmxz7h7), and runs the project's own checks (§s-2fau85dfyyeq66m, §s-7pk89t8z6wymmj9) only after both have passed;

`sheriff binding` (§s-p34692nwceaxq2p) and `sheriff citations` (§s-bgegrkhrgpefs69), only after the check for a key written more than once and the validation against the schema have passed;

where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb), `sheriff markdown` (§s-e3495enbc5h75c3) and `sheriff map` (§s-rpv4fkdqqguptqd), in the working tree.

The hook writes out what is staged to a directory of its own (§s-477gtdrkw34dzxw) once the project's tools that rewrite files have run. `sheriff types` and the checks run in that directory.

The hook writes each file that `sheriff types` writes into the working tree, not into that directory, in place of whatever is at the same path, and names it as a file for the author to stage. The checks therefore read each such file as it is staged. The hook itself stages nothing.

A failure of `sheriff markdown` or `sheriff map` to write its files is reported, and does not make the hook refuse the commit.

### Reason

On every commit, each check judges the commit in its final form (§s-pcnyfp7gev7syax). So the tools that rewrite files run before the checks, and what the hook generates waits in the working tree until the author stages it, since what a commit holds is its author's choice.

### Examples

```json
[
  {
    "en": "A developer edits a RecordType, an owner approves the new wording, and the developer stages the specification and commits. `sheriff types` generates the RecordType's new types from the staged nodes, and the hook writes them into the working tree and names them. `sheriff binding` refuses the commit, since the staged types differ from what the approved wording produces (§s-dbk2vyeg8z5jxna). The developer stages the new types and commits again. The most likely mistake is to let the checks read the types that `sheriff types` has just written, so that the commit passes with the old types staged.",
    "ru": "Разработчик меняет RecordType, ответственный одобряет новую формулировку, а разработчик добавляет спецификацию в стейджинг и делает коммит. `sheriff types` порождает новые типы этого RecordType из узлов в стейджинге, а хук записывает их в рабочее дерево и называет их. `sheriff binding` отвергает коммит, потому что типы в стейджинге отличаются от того, что даёт одобренная формулировка (§s-dbk2vyeg8z5jxna). Разработчик добавляет новые типы в стейджинг и снова делает коммит. Самая вероятная ошибка — дать проверкам читать типы, которые только что записал `sheriff types`: тогда коммит проходит со старыми типами в стейджинге."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-pcnyfp7gev7syax"
  },
  {
    "type": "implements",
    "to": "s-kh8qcd5kxgh9z3j"
  },
  {
    "type": "cites",
    "to": "s-t9j29hppag2nren"
  },
  {
    "type": "cites",
    "to": "s-n4m5zvh96yb299p"
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
    "to": "s-7pk89t8z6wymmj9"
  },
  {
    "type": "cites",
    "to": "s-qgg6sfawtmwvrbb"
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
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-dbk2vyeg8z5jxna"
  },
  {
    "type": "cites",
    "to": "s-bpdqd9v72wg7vsz"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-hr7j7scmfkkjnws"
  },
  {
    "type": "cites",
    "to": "s-jau82aq9juv9zzh"
  },
  {
    "type": "cites",
    "to": "s-u7tw6m8npxmv5tu"
  },
  {
    "type": "cites",
    "to": "s-2fau85dfyyeq66m"
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
  }
]
```

### The current node

(none: this node is new)

## The working tree compared with what a push sends | key new:tools-6-push-compare | sid s-8a5eyy5n5hnsgrs | tools 6b (new, after “The pre-commit hook”)

### Text

Before a push for which it runs the tests (§s-b6qdtghnyha3fhk), the pre-push hook compares the working tree with each commit that the tests judge: each commit to which the push creates or updates a ref, directly or through a tag, and that meets the conditions under which the tests run.

The hook refuses the push where either of the following holds for a file, and names each such file:

the file differs between the working tree and such a commit;

the file is in only one of them, including a file in the working tree that git does not track.

The hook leaves out the files that git ignores. Where it does not refuse the push, it runs the tests in the working tree.

### Reason

The tests run in the working tree, which holds what each checkout installs or builds for itself, so they judge a pushed commit only where the working tree holds what that commit holds.

### Examples

```json
[
  {
    "en": "A developer commits a change and leaves an edit to `src/a.ts` uncommitted. The specification is approved, and the project's own guidelines name a push as the moment at which the tests run. The pre-push hook refuses the push and names `src/a.ts`. The most likely mistake is to run the tests in the working tree as it is, so that they pass or fail because of an edit that the pushed commit does not hold.",
    "ru": "Разработчик делает коммит изменения, а правку `src/a.ts` оставляет вне коммита. Спецификация одобрена, и собственные guidelines проекта называют push моментом запуска тестов. Хук pre-push отвергает push и называет `src/a.ts`. Самая вероятная ошибка — запускать тесты в рабочем дереве как есть: тогда они проходят или падают из-за правки, которой нет в отправленном коммите."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-aufnqn6t7y2me7a"
  },
  {
    "type": "cites",
    "to": "s-b6qdtghnyha3fhk"
  }
]
```

### The current node

(none: this node is new)
