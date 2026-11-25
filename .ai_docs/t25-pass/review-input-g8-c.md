# Group 8 drafts for the review (generated 2026-11-25T16:09:08.020Z)

## The agent's hooks for Codex CLI | key s-n76wt2bkqdmh78x | sid s-n76wt2bkqdmh78x | tools 16

### Text

The agent's hooks for Codex are in the project's `.codex/hooks.json`, where `sheriff init --agent codex` writes them (§s-7unxytshhc4md54). They are the following:

one when a session starts;

one before an edit made with `apply_patch`;

one after such an edit or a shell command.

Each hook holds only the lookup of the plugin for Codex CLI in Codex's cache (§s-4mej6ccn7xu3d3p) and a call to the plugin's script for that hook: `hooks/session-start.sh`, `hooks/guard.sh` or `hooks/after-edit.sh`. Where a hook finds no plugin, it does nothing.

The scripts do what the agent's hooks do (§s-477gtdrkw34dzxw). In a repository without `sheriff.config.json` at its root, they do nothing.

Codex blocks a tool's call only on an answer that a hook writes as JSON to its standard output. So the scripts answer Codex as follows, and exit with code 0:

before an edit that `sheriff guard` refuses: `{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny", "permissionDecisionReason": <the refusal>}}`;

after an edit or a shell command for which the hook has something to hand the agent (§s-hcmpjmwtgfwzncu): `{"decision": "block", "reason": <what it hands the agent>}`.

A script knows that it serves Codex from the file `agent` in the folder of the plugin's SpecSheriff tools (§s-xr5xxa9cxf2mq5u).

Before an edit, `sheriff guard` does the following:

it reads from the patch each file that the patch adds, updates, deletes or moves;

it applies the patch to those files in memory, taking a moved file as deleted at its old path and added at its new one;

it judges each of those files as an edit made with the file-editing tools (§s-st6td4mua9uqt9z).

`sheriff guard` refuses the whole patch in either of the following cases:

it refuses one of the patch's files;

it cannot read or apply the patch.

### Reason

Codex takes hooks only from the project, where its user trusts each hook as it is written, so the project's hooks only find and call the scripts that each release of the plugin brings. The scripts answer Codex in the form that Codex reads, so that its agent is held to the same checks as an agent in Claude Code.

### Examples

```json
[
  {
    "en": "A patch adds `src/new.ts` and changes `specs/_approvals.jsonl`. `sheriff guard` refuses the patch, and `hooks/guard.sh` writes the denial as JSON with the refusal in `permissionDecisionReason`, so Codex applies no part of the patch. The most likely mistake is to exit with code 2, as for Claude Code, which Codex does not treat as a refusal, so that the patch is applied.",
    "ru": "Патч добавляет `src/new.ts` и меняет `specs/_approvals.jsonl`. `sheriff guard` отвергает патч, и `hooks/guard.sh` пишет запрет в виде JSON с отказом в `permissionDecisionReason`, поэтому Codex не применяет ни одной части патча. Самая вероятная ошибка — завершиться с кодом 2, как для Claude Code: Codex не считает это отказом, и патч применяется."
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
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-hcmpjmwtgfwzncu"
  },
  {
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  },
  {
    "type": "cites",
    "to": "s-st6td4mua9uqt9z"
  }
]
```

### The current node

Title: The agent's hooks for Codex CLI

The agent's hooks for Codex stand in the project's `.codex/hooks.json`, where `sheriff init --agent codex` writes them (§s-7unxytshhc4md54). They are:

- one when a session starts;
- one before an edit made with `apply_patch`;
- one after such an edit or a shell command.

Each holds only the lookup of the plugin for Codex CLI in Codex's cache (§s-4mej6ccn7xu3d3p) and a call to the plugin's script for that hook: `hooks/session-start.sh`, `hooks/guard.sh` or `hooks/after-edit.sh`. Where a hook finds no plugin, it does nothing.

The scripts do what the agent's hooks do (§s-477gtdrkw34dzxw). In a repository holding no `sheriff.config.json`, they do nothing.

Before an edit, `sheriff guard`:

- reads from the patch each file it adds, updates, deletes or moves;
- applies the patch to those files in memory, a moved file taken as deleted at its old path and added at its new one;
- judges each file as an edit made with the file tools (§s-st6td4mua9uqt9z).

It refuses the whole patch where:

- it refuses one of the patch's files;
- it cannot read or apply the patch.

Reason: Codex admits no plugin carrying hooks into its public directory, so the hooks are the project's.

Codex runs a project's hooks once its user trusts the project and each hook as it stands. A hook holding only the lookup and the call changes only where its lookup does. It is then trusted again. What the scripts do follows the release.

A hook that finds no plugin does nothing, so removing the plugin leaves no hook failing in the project.

Codex hands an edit as one patch, which may touch several files. The patch is applied whole. So the guard judges each file and refuses the patch whole.

## A git hook runs the SpecSheriff tools that a plugin keeps on the machine | key s-4mej6ccn7xu3d3p | sid s-4mej6ccn7xu3d3p | tools 12

### Text

When a session starts, the plugin for Claude Code (§s-zh2vcr3xjumppg5) copies the SpecSheriff tools that it holds into its data directory, where the copy there is of another release or missing. The data directory is `<plugins>/data/specsheriff-specsheriff-marketplace/`. `<plugins>` is `CLAUDE_CODE_PLUGIN_CACHE_DIR` where that variable is set, and `~/.claude/plugins` otherwise.

The plugin for Codex CLI (§s-2pdy9gw2jrjvfb4) keeps no copy. Its SpecSheriff tools are in its directory in Codex's cache, `<Codex home>/plugins/cache/specsheriff-marketplace/specsheriff/<version>/tools/`. `<Codex home>` is `CODEX_HOME` where that variable is set, and `~/.codex` otherwise.

`~` is the user's home directory, which on Windows is the user's profile directory.

Each git hook that `sheriff init` writes holds the following:

the lookup of those SpecSheriff tools;

a call to the script for that hook in their `hooks/`;

the run of the project's own tools for that hook (§s-n4m5zvh96yb299p) and a notice, for the case in which the SpecSheriff tools cannot run.

Where the hook finds the SpecSheriff tools of both plugins, it takes those whose `release` file opens with the higher version, compared as semantic versions. Where their versions are equal, it takes either.

The script for the hook runs what the hook is to run (§s-477gtdrkw34dzxw), including the project's own tools for that hook.

The SpecSheriff tools cannot run where the hook finds the tools of neither plugin, or where Node.js is missing or older than the SpecSheriff tools need. In either case, the hook runs the project's own tools for that hook, and lets the commit or the push through unless one of them fails (§s-pcnyfp7gev7syax). The pre-commit and pre-push hooks then say that no check of SpecSheriff ran, and why: no plugin's SpecSheriff tools are on the machine, or Node.js is missing or older than the version that they name.

The script run when a session starts names each of the following hooks that holds what an earlier release of `sheriff init` wrote:

each git hook in `.githooks/`;

each of the agent's hooks for Codex in `.codex/hooks.json`.

For each such hook, it says that `sheriff init` replaces it (§s-7unxytshhc4md54).

### Reason

A git hook written once into a project finds the SpecSheriff tools wherever, and from whichever plugin, a machine keeps them, so that the checks follow each release of the plugin without any change to the project. Where those tools cannot run, the project's own tools keep guarding the commit and the push, as the rule on the order of tools and checks requires (§s-pcnyfp7gev7syax).

### Examples

```json
[
  {
    "en": "A user has both plugins: the plugin for Claude Code at release 0.7.0 and the plugin for Codex CLI at release 0.6.0. Each git hook runs the SpecSheriff tools of 0.7.0 from the data directory of the plugin for Claude Code, also when the commit is made from Codex. The most likely mistake is to take the tools of the agent that is running, so that a commit made from Codex is checked by the earlier release.",
    "ru": "У пользователя оба плагина: плагин для Claude Code выпуска 0.7.0 и плагин для Codex CLI выпуска 0.6.0. Каждый git-хук запускает инструменты SpecSheriff выпуска 0.7.0 из папки данных плагина для Claude Code, и тогда, когда коммит сделан из Codex. Самая вероятная ошибка — брать инструменты того агента, который работает: тогда коммит из Codex проверяет более ранний выпуск."
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
    "to": "s-bsya3febm6u64ab"
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
    "to": "s-n4m5zvh96yb299p"
  },
  {
    "type": "cites",
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-7unxytshhc4md54"
  }
]
```

### The current node

Title: A git hook runs the SpecSheriff tools a plugin keeps on the machine

When a session starts, the plugin for Claude Code (§s-zh2vcr3xjumppg5) copies the SpecSheriff tools it carries into its data directory. It copies them where the copy there is of another release or missing. The data directory is `<plugins>/data/specsheriff-specsheriff-marketplace/`. `<plugins>` is `CLAUDE_CODE_PLUGIN_CACHE_DIR` where it is set and `~/.claude/plugins` otherwise.

The plugin for Codex CLI (§s-2pdy9gw2jrjvfb4) keeps no copy. Its tools stand in its directory in Codex's cache, `<Codex home>/plugins/cache/specsheriff-marketplace/specsheriff/<version>/tools/`. `<Codex home>` is `CODEX_HOME` where it is set and `~/.codex` otherwise.

`~` is the user's home directory, on Windows their profile directory.

Each git hook `sheriff init` writes holds:

- the lookup of those tools;
- a call to the script for that hook in their `hooks/`;
- what it does where it finds none;
- the run of the project's own tools (§s-n4m5zvh96yb299p).

Where the hook finds the tools of both plugins, it takes those whose `release` file opens with the higher version, compared as semantic versions. Where the two versions are equal, it takes either.

The hook's script runs what the hook is to run (§s-477gtdrkw34dzxw). It refuses where Node.js is missing or older than the tools need, naming the version they need.

Where the hook finds the tools of neither plugin, it runs the project's own tools (§s-n4m5zvh96yb299p). It then lets the commit or the push through unless one of them fails. The pre-commit and pre-push hooks then say that no check of SpecSheriff ran, because they found the SpecSheriff tools of no plugin on the machine.

The script run when a session starts names each of these hooks that holds what an earlier release of `sheriff init` wrote:

- each git hook in `.githooks/`;
- each of the agent's hooks for Codex in `.codex/hooks.json`.

For each, it says that `sheriff init` replaces it (§s-7unxytshhc4md54).

Reason: Claude Code keeps each version of a plugin in a directory of its own, which changes with every update. It keeps the plugin's data directory across updates. So the plugin keeps a copy of its release there, at a path a hook written once can name.

Codex keeps the one installed version of a plugin in its cache. It deletes the cache when the plugin is removed, while it leaves the plugin's data directory. A copy kept there would outlive the plugin. So the hook looks in the cache, which goes with the plugin.

The hook looks for the tools of both plugins because a user may move from one agent to the other. It takes the higher release because that release holds every fix of the lower.

A hook that finds no tools is most often one whose user removed the plugin. Refusing would hold every commit of that user while checking nothing, so the hook lets it through and says so. The hooks stay on so that the project's own tools keep running. So the notice recurs at every commit and push.

Where the tools are found but cannot run, the plugin is there and its user expects the checks to hold, so the script refuses.

A hook is a file of the project, which only a commit changes. So a hook written by an earlier release keeps its lookup until `sheriff init` replaces it. The session start says so, because it runs in every clone.

## The project's own tools in a git hook | key s-n4m5zvh96yb299p | sid s-n4m5zvh96yb299p | tools 13

### Text

A project's own tools for a git hook are the files directly in `.githooks/<hook>.d/` whose first line names their interpreter. Each git hook that `sheriff init` writes runs only those files, and names each other file there.

A first line names an interpreter where it opens with `#!`, followed by a path and at most one argument. A carriage return that ends the line is left out.

Where the hook runs the SpecSheriff tools (§s-4mej6ccn7xu3d3p), it runs the project's own tools at the points that the order of that hook sets (§s-477gtdrkw34dzxw, §s-pcnyfp7gev7syax):

first, those that the project's own guidelines list as tools that rewrite files (§s-t9j29hppag2nren), in the order of that list;

later, the other tools, in the byte order of their names.

The hook names each path in that list for which it runs nothing.

Where the SpecSheriff tools cannot run (§s-4mej6ccn7xu3d3p), the hook runs all of the project's own tools for that hook in the byte order of their names.

Each of the project's own tools does the following:

it runs from the root of the working tree, by the interpreter that its first line names, in git's own environment, so that it reads the working tree and git's index;

it is handed the arguments that git hands the hook, and a copy of the standard input that git hands it.

Each of them runs regardless of what the others find. The hook fails where one of them ends with an exit code other than zero.

Where the hook runs the SpecSheriff tools, it also refuses the commit or the push where one of the other tools does any of the following (§s-yn5tdx2bp4f5rq7):

adds, changes or removes a file of the working tree, other than a file that git ignores;

changes what is staged;

changes the commit message.

The hook makes this check regardless of whether the specification is approved or a draft.

The hook names each tool that makes it fail, and each file that such a tool added, changed or removed.

These files are among the repository's own tools (§s-hheus6f395ynqvc).

### Reason

A project keeps its own tools for a hook in a folder that the hook reads without the SpecSheriff tools, so that those tools run on every machine, whatever the SpecSheriff tools can do there (§s-pcnyfp7gev7syax). A tool is recognised by its first line rather than by the executable bit, since a file committed from a system without that bit loses it.

### Examples

```json
[
  {
    "en": "`.githooks/pre-commit.d/` holds `scan` and `tidy`, and the project's own guidelines list `pre-commit.d/tidy` as a tool that rewrites files. At a commit, `tidy` runs first and stages the files that it rewrites. `scan` runs after `sheriff types`, and the hook refuses the commit where `scan` changes any file. The most likely mistake is to run both in the byte order of their names, so that `scan` reads the files before `tidy` has rewritten them.",
    "ru": "В `.githooks/pre-commit.d/` лежат `scan` и `tidy`, и собственные guidelines проекта перечисляют `pre-commit.d/tidy` как инструмент, переписывающий файлы. При коммите `tidy` выполняется первым и добавляет в стейджинг файлы, которые переписывает. `scan` выполняется после `sheriff types`, и хук отвергает коммит, если `scan` меняет какой-либо файл. Самая вероятная ошибка — запускать оба в порядке байтов их имён: тогда `scan` читает файлы до того, как `tidy` их переписал."
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
    "to": "s-yn5tdx2bp4f5rq7"
  },
  {
    "type": "cites",
    "to": "s-4mej6ccn7xu3d3p"
  },
  {
    "type": "cites",
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-t9j29hppag2nren"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  }
]
```

### The current node

Title: The project's own tools in a git hook

Each git hook `sheriff init` writes runs the project's own tools for it after the checks of the SpecSheriff tools (§s-pcnyfp7gev7syax). They are the files directly in `.githooks/<hook>.d/` whose first line names their interpreter. They run in the byte order of their names. The hook names each other file there and does not run it.

A first line names an interpreter where it opens with `#!`, followed by a path and at most one argument. A carriage return closing the line is left out.

The hook runs the project's tools whatever the checks found. That includes the script refusing where Node.js is missing or too old. The hook runs them also where it finds no SpecSheriff tools (§s-4mej6ccn7xu3d3p).

Each of the project's tools:

- runs from the root of the working tree, by the interpreter its first line names, in git's own environment, so it reads the working tree and git's index;
- is handed the arguments git hands the hook and a copy of the standard input git hands it.

Each of them runs, whatever the others find. The hook fails where:

- the checks refuse;
- one of the project's tools ends with an exit code other than zero;
- one of the project's tools changes the staged files or the commit's message.

The hook names each of the project's tools that makes it fail.

These files are among the repository's own tools, not the system's code (§s-hheus6f395ynqvc).

Reason: A repository taking up the method has its hooks in `.githooks/`, which `core.hooksPath` names. So git runs the project's own tools nowhere else. Kept in a folder of their own, the project's tools are the project's files. `sheriff init` neither replaces them nor names them as changed by hand.

Each of them runs, so that each reports what it would report alone.

A tool is chosen by its first line rather than by the executable bit. A file committed from a system that keeps no executable bit loses that bit.

The pre-push hook's input names the refs pushed, which a tool judging a push needs as the hook does.

## null | key proposal:row-10-1-37b | sid s-yn5tdx2bp4f5rq7 | spec 10.1.37b (new row of the main table of checks, after row 10.1.37a)

### Text

A project's own tool that runs on a commit or a push after the tools that rewrite files (§s-pcnyfp7gev7syax), other than a check that a project's own guidelines add (§s-2fau85dfyyeq66m), leaves the working tree, what is staged and the commit message as they were, except for the files that git ignores

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
