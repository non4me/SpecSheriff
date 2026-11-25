# T25, group 8: the English of every node

This file holds the final English of every node of group 8 of stage 2 of T25, as `tools-drafts.json` holds it after propose-group8.mjs: the drafts of items 57 to 63 of the appendix of the tools, which describe the hooks, the guard before an agent's edit, the agent's hooks for Codex CLI, how a git hook finds the SpecSheriff tools, the project's own tools in a git hook, and the two plugins. It also holds the new row 10.1.37b of the main table of checks.
Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.
propose-group8.mjs writes this file; edit the script, not this file.

## s-477gtdrkw34dzxw — The hooks

**Title:** The hooks

**Text:**

The SpecSheriff tools run at the moments at which the checks run (§s-epaw9sgyaajzn8g), through the following hooks:
- the git hooks, which `sheriff init` writes into `.githooks/` (§s-7unxytshhc4md54), and each of which runs the SpecSheriff tools that a plugin keeps on the machine (§s-4mej6ccn7xu3d3p):
  - `pre-commit`, which runs the tools that rewrite files and the checks that read the commit being made (§s-npnmwyt6s3gypwe);
  - `commit-msg`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), then `sheriff commit-message`, and then, only after `sheriff commit-message` has passed, `sheriff review` (§s-4kd2pave7vm4hmd);
  - `pre-push`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), and then the tests (§s-b6qdtghnyha3fhk) once it has compared the working tree with what the push sends (§s-8a5eyy5n5hnsgrs).
- the agent's hooks, which the plugin for Claude Code declares (§s-zh2vcr3xjumppg5) and which `sheriff init --agent codex` writes into the project for Codex CLI (§s-n76wt2bkqdmh78x):
  - when a session starts, a hook that turns the git hooks on (§s-jgcveum8dwdnyzr) and asks for the settings of the reviewer (§s-p29yawkkkgk7kxb);
  - before an edit made with the file-editing tools, a hook that runs `sheriff guard` (§s-st6td4mua9uqt9z);
  - after such an edit or a shell command, a hook that writes what is generated from the nodes and runs the checks (§s-hcmpjmwtgfwzncu).

At a commit, the pre-commit and commit-msg hooks write what is staged out to a directory of its own. They run the SpecSheriff tools there, with that directory as git's working tree, against the repository's history.

Each check that these hooks or the agent's hook after an edit run reads the commit being made. At a commit, that commit is what is staged. After an edit, it is the working tree's difference from the last commit. Besides that commit, such a check reads only the following:
- the SpecSheriff guidelines and the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g), with their schemas, as the SpecSheriff plugin delivers them (§s-bsya3febm6u64ab);
- the repository's history and the commit message, where the node of the check says so.

**Reason:**

A check reads the commit being made, because judging anything else would pass or refuse what is not being committed. Hooks that the repository keeps and the plugins declare run each check at its moment in every clone, whoever makes the change (§s-epaw9sgyaajzn8g).

**Example:**

A developer stages a change to rule R and leaves a second change to R unstaged. At the commit, `sheriff validate` reads R as it is staged. The most likely mistake is to run the checks over the working tree, so that they judge the second change, which the commit does not hold.

**Todo (2026-10-28):** The export and the map follow a change that reaches the working tree through git — a pull, a merge, a checkout — only at the next edit an agent makes or the next commit; post-merge and post-checkout hooks running `sheriff markdown` and `sheriff map` would close that.

## new:tools-6-pre-commit — The pre-commit hook

A new node, split from `s-477gtdrkw34dzxw`, with the sid s-npnmwyt6s3gypwe.

**Title:** The pre-commit hook

**Text:**

The pre-commit hook runs the following, in this order (§s-pcnyfp7gev7syax):
- the project's own tools for that hook that the project's own guidelines list as tools that rewrite files (§s-t9j29hppag2nren, §s-n4m5zvh96yb299p);
- `sheriff types` (§s-a8fn72xa782wvbk), which generates from the nodes as they are staged;
- the project's other tools for that hook (§s-n4m5zvh96yb299p);
- `sheriff validate`, which first makes the check for a key written more than once (§s-7zqsstgnuc772ba) and the validation against the schema (§s-xzcw3hv4hmxz7h7), and runs the project's own checks only after these have passed (§s-7pk89t8z6wymmj9);
- `sheriff binding` and `sheriff citations`, only after the check for a key written more than once and the validation against the schema have passed;
- where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb), `sheriff markdown` (§s-e3495enbc5h75c3) and `sheriff map` (§s-rpv4fkdqqguptqd), in the working tree.

The hook writes what is staged out to its directory (§s-477gtdrkw34dzxw) once the project's tools that rewrite files have run. `sheriff types` and the checks run in that directory.

The checks read each file that `sheriff types` writes in the form in which that file is staged. The hook writes each such file into the working tree instead, in place of whatever is at the same path, and names it as a file to be staged. The hook stages nothing.

A failure to write the export or the map is reported and stops nothing.

**Reason:**

At every commit, each check judges the commit in the form in which its author makes it (§s-pcnyfp7gev7syax). So whatever rewrites files runs before the checks, and what the hook generates waits in the working tree until the author stages it, since what a commit holds is its author's choice.

**Example:**

A developer edits a RecordType, an owner approves the new wording, and the developer stages the specification and commits. `sheriff types` generates the RecordType's new types from the staged nodes, and the hook writes them into the working tree and names them. `sheriff binding` refuses the commit, since the staged types differ from what the approved wording produces (§s-dbk2vyeg8z5jxna). The developer stages the new types and commits again. The most likely mistake is to let the checks read the types that `sheriff types` has just written, so that the commit passes with the old types staged.

## new:tools-6-push-compare — The working tree compared with what a push sends

A new node, split from `s-477gtdrkw34dzxw`, with the sid s-8a5eyy5n5hnsgrs.

**Title:** The working tree compared with what a push sends

**Text:**

Before a push for which it runs the tests (§s-b6qdtghnyha3fhk), the pre-push hook refuses the push where a file is in either of the following cases, and names each such file:
- the file differs between the working tree and a commit that the tests judge;
- the file is in only one of them, including a file that is in the working tree and has never been added to git.

A commit that the tests judge is a commit to which the push creates or updates a ref, directly or through a tag, and that meets the conditions under which the tests run (§s-b6qdtghnyha3fhk). A commit that leaves the specification a draft is never compared, since the tests do not judge it.

The hook leaves out the files that the working tree ignores. Where it refuses nothing, it runs the tests in the working tree.

**Reason:**

The tests run in the working tree, which holds what each checkout installs or builds for itself, so they judge a pushed commit only where the working tree holds what that commit holds.

**Example:**

A developer commits a change and leaves an edit of `src/a.ts` uncommitted. The specification is approved, and the project's own guidelines name a push as the moment at which the tests run. The pre-push hook refuses the push and names `src/a.ts`. The most likely mistake is to run the tests in the working tree as it is, so that they pass or fail because of an edit that the pushed commit does not hold.

## new:tools-6-hooks-on — Turning the git hooks on when a session starts

A new node, split from `s-477gtdrkw34dzxw`, with the sid s-jgcveum8dwdnyzr.

**Title:** Turning the git hooks on when a session starts

**Text:**

When a session starts in a repository whose root holds `sheriff.config.json`, the agent's hook (§s-477gtdrkw34dzxw) does the following with git's `core.hooksPath`:
- where it is unset, the hook sets it to `.githooks` and says so;
- where it names another directory, the hook says that the git hooks that `sheriff init` writes (§s-7unxytshhc4md54) do not run.

The hook also names each git hook in `.githooks/` in either of the following cases:
- git's index holds the hook without the executable mode;
- on a system whose files keep the executable bit, the hook's file lacks that bit.

For each such hook, it says how to make the hook executable on every system: `chmod +x <hook>` and `git update-index --chmod=+x <hook>`, then a commit. It changes neither the mode of a file nor git's index. It leaves out the project's own tools in `.githooks/<hook>.d/`, which run by the interpreter that their first line names (§s-n4m5zvh96yb299p).

**Reason:**

On a system whose files keep the executable bit, git skips a hook that cannot be executed and refuses nothing, so a commit there would pass no check. The session start reaches every clone, while a hook that git skips cannot report itself. The session start leaves the mode to the author, since recording the mode is staging.

**Example:**

A repository set up on Windows has its git hooks committed without the executable mode. A developer clones it on Linux and starts a session. The session start names each hook and says how to make it executable. The most likely mistake is to make the hooks executable in the working tree without saying so, which leaves the index as it was, so that each of the other clones still gets hooks that git skips.

## new:tools-6-reviewer-settings — The reviewer's settings asked for when a session starts

A new node, split from `s-477gtdrkw34dzxw`, with the sid s-p29yawkkkgk7kxb.

**Title:** The reviewer's settings asked for when a session starts

**Text:**

When a session starts, the agent's hook of the plugin for Claude Code (§s-zh2vcr3xjumppg5) writes into the user's git configuration, with `git config --global`, each setting of the runner `claude` (§s-tnz9zgqx8c629a7) that the user has given as an option of that plugin. It does so in any repository, wherever the configuration lacks the setting or holds another value.

Then, in a repository whose root holds `sheriff.config.json`, the agent's hook of either SpecSheriff plugin names each setting that the user's git configuration lacks for the runner that `sheriff review` would run at a commit there (§s-xr5xxa9cxf2mq5u). That runner is the one that `review.runner` names, or otherwise the runner of the SpecSheriff tools that the git hooks would take there (§s-4mej6ccn7xu3d3p). With each setting, the hook names the default that `sheriff review` takes for it. It asks the agent to do the following:
- to offer the user each default to confirm or replace;
- to write with `git config --global` the value that the user gives in reply, including the default.

The hook asks so once for each runner on each machine. After asking, it records `true` in the user's git configuration as `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked`. While that record holds `true`, the hook asks nothing.

**Reason:**

A run of the reviewer is paid for by the user who commits, so that user chooses its settings (§s-tnz9zgqx8c629a7), once, as soon as an agent can ask. The git hooks run the reviewer outside the agent, so they read those settings from the user's git configuration, where the session start also writes the options that Claude Code asked for.

**Example:**

A user installs the plugin for Codex CLI and opens a repository that has taken up the method. The session start names `specsheriff.review.codexModel` and `specsheriff.review.codexEffort` with their defaults, and the agent asks the user about them. The user confirms the effort and names a model, and the agent writes both. The most likely mistake is to write the defaults without asking, so that the user pays for settings that the user never chose.

## new:tools-6-after-edit — The agent's hook after an edit

A new node, split from `s-477gtdrkw34dzxw`, with the sid s-hcmpjmwtgfwzncu.

**Title:** The agent's hook after an edit

**Text:**

After an agent's edit made with the file-editing tools, or after a shell command that the agent runs, the agent's hook runs the SpecSheriff tools where either of the following holds:
- the last commit or the working tree, other than the files that git ignores, differs from what the hook noted in the clone's git directory when the checks last ran;
- nothing is noted.

Where it runs them, the hook runs the following, in this order:
- `sheriff reindex` (§s-ztseyetus7np6br), where the files that differ include a file under `specs/`, `sheriff.config.json`, or a file in which the SpecSheriff tools look for SpecTags, as the settings in `sheriff.config.json` (§s-zefk589ykh37b8u) set them;
- where the files that differ include a file under `specs/` or `sheriff.config.json`, or where `sheriff reindex` has written a file: `sheriff markdown` (§s-e3495enbc5h75c3) and `sheriff map` (§s-rpv4fkdqqguptqd), if the project has chosen the Views extension (§s-qgg6sfawtmwvrbb);
- `sheriff types` (§s-a8fn72xa782wvbk), under the same condition, and also where the files that differ include the code of a project's own generator (§s-km4x4s26kv7pjze);
- `sheriff validate`, `sheriff binding` and `sheriff citations`, which read the working tree, with its difference from the last commit as the commit being made.

Where `sheriff reindex` refuses, the hook runs nothing after it.

The hook hands the agent what `sheriff types` and the checks refuse, and names each node that `sheriff reindex` makes a draft. It hands them to Claude Code by exiting with code 2 and writing them to its standard error. It hands them to Codex as the agent's hooks for Codex CLI say (§s-n76wt2bkqdmh78x).

Once the checks end, whatever they found, the hook notes the last commit and the working tree as they were when the checks began. So a file changed while the checks run is checked at the next run.

**Reason:**

The checks run where the agent works, so that a mistake is found at the edit that makes it (§s-epaw9sgyaajzn8g). They run only where something has changed since they last ran, so that a session that only reads the repository through the shell is not held up.

**Example:**

An agent adds the SpecTag of rule R to a function in a new file, `src/order.ts`. The hook runs `sheriff reindex`, which adds `src/order.ts` to the `meta.code` of R, and the checks then accept that list. The most likely mistake is to run `sheriff reindex` only where a file under `specs/` has changed, so that `sheriff binding` refuses the `meta.code` of R after an edit to code alone (§s-t383grkn3q68dpf).

## s-st6td4mua9uqt9z — An edit judged before it is made

**Title:** An edit judged before it is made

**Text:**

`sheriff guard` refuses each of the following edits by an agent (§s-83ev4wwesbwnhnp):
- an edit that leaves approved a node that it adds, or a node whose wording (§s-5ah25f6gy99panq) or approval status (§s-tgrnpagrb58tya7) it changes, while no approval of that wording is in force (§s-v4qus7raqnwzneb);
- an edit that adds or changes code bound to a rule (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp), other than tests, while no test of the system's code (§s-hheus6f395ynqvc) declares that rule's SpecTag (§s-zrsc6asgmhv8tnc);
- an edit of `specs/_approvals.jsonl`, whatever it changes;
- an edit that adds, changes or removes an entry in the list `approvalStatus`, `strict` or `extensions` of `sheriff.config.json` (§s-d3nkw9b6mn98vuw).

The refusal names each such node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and each such rule by its sid and its location. For an edit of `specs/_approvals.jsonl`, it names `sheriff approve`, which records an approval and its withdrawal (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). For an edit of an entry, it names the list and `sheriff settings` (§s-chsfpkgpmfk4fft).

While the installed SpecSheriff plugin lacks an extension that the project has chosen, `sheriff guard` refuses every edit and names each missing extension (§s-mhsb6fjsq5xn6c9).

`sheriff guard` judges an edit made with Claude Code's `Write`, `Edit` or `MultiEdit`, and a patch that Codex's `apply_patch` applies (§s-n76wt2bkqdmh78x). It reads the edit, as the agent's harness describes it, on its standard input. It builds each file as the edit would leave it, without writing it to disk. Where the edit would not apply, as where `Edit` names text that the file does not hold, `sheriff guard` lets the tool refuse it.

`sheriff guard` judges the nodes in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It leaves out each node whose approval status is derived from other nodes, such as a section (§s-9kfdycuq34beqvs). It leaves to the checks after the edit (§s-hcmpjmwtgfwzncu) a file of the specification that the edit would leave other than valid JSON.

`sheriff guard` finds the code that an edit adds or changes as it finds what a commit adds or changes (§s-2x58az67bm6cxq2), comparing each file as it is with the file as the edit would leave it. It looks for the test among the tests of the working tree as the edit would leave it.

`sheriff guard` reads the lists of `sheriff.config.json` from the file as it is and as the edit would leave it. A `sheriff.config.json` that is missing or is not valid JSON is read as holding none of those lists.

Where it refuses an edit, `sheriff guard` writes the refusal to its standard error and exits with code 2. It makes these checks regardless of whether the specification is approved or a draft.

**Reason:**

`sheriff guard` judges each file as the edit would leave it, so that an edit that the rule on an agent's edit forbids is refused before anything is written (§s-83ev4wwesbwnhnp). It judges only what the edit changes, so that what other files already hold never holds up an edit that the rule allows.

**Example:**

An owner asks the agent to approve the specification, and the agent tries to add an entry to `approvalStatus` in `sheriff.config.json` with its editing tool. `sheriff guard` refuses the edit and names `approvalStatus` and `sheriff settings`, and the agent runs `sheriff settings status approved`. The most likely mistake is to judge only the files under `specs/`, so that the entry is written without `sheriff settings`, which checks that whoever records it is an owner.

## s-n76wt2bkqdmh78x — The agent's hooks for Codex CLI

**Title:** The agent's hooks for Codex CLI

**Text:**

The agent's hooks for Codex are in the project's `.codex/hooks.json`, where `sheriff init --agent codex` writes them (§s-7unxytshhc4md54). They are the following:
- one when a session starts;
- one before an edit made with `apply_patch`;
- one after such an edit or a shell command.

Each hook holds only the lookup of the plugin for Codex CLI in Codex's cache (§s-4mej6ccn7xu3d3p) and a call to the plugin's script for that hook: `hooks/session-start.sh`, `hooks/guard.sh` or `hooks/after-edit.sh`. Where a hook finds no plugin, it does nothing.

The scripts do what the agent's hooks do (§s-477gtdrkw34dzxw). In a repository without `sheriff.config.json` at its root, they do nothing.

Codex blocks a tool's call only on an answer that a hook writes as JSON to its standard output. So the scripts answer Codex as follows, and exit with code 0:
- before an edit that `sheriff guard` refuses: `{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny", "permissionDecisionReason": <the refusal>}}`;
- after an edit or a shell command for which the hook has something to hand the agent (§s-hcmpjmwtgfwzncu): `{"decision": "block", "reason": <what it hands the agent>}`.

A script knows that it serves Codex from the file `agent` in the folder of the plugin's SpecSheriff tools (§s-xr5xxa9cxf2mq5u).

Before an edit, `sheriff guard` does the following:
- it reads from the patch each file that the patch adds, updates, deletes or moves;
- it applies the patch to those files in memory, taking a moved file as deleted at its old path and added at its new one;
- it judges each of those files as an edit made with the file-editing tools (§s-st6td4mua9uqt9z).

`sheriff guard` refuses the whole patch in either of the following cases:
- it refuses one of the patch's files;
- it cannot read or apply the patch.

**Reason:**

Codex takes hooks only from the project, where its user trusts each hook as it is written, so the project's hooks only find and call the scripts that each release of the plugin brings. The scripts answer Codex in the form that Codex reads, so that its agent is held to the same checks as an agent in Claude Code.

**Example:**

A patch adds `src/new.ts` and changes `specs/_approvals.jsonl`. `sheriff guard` refuses the patch, and `hooks/guard.sh` writes the denial as JSON with the refusal in `permissionDecisionReason`, so Codex applies no part of the patch. The most likely mistake is to exit with code 2, as for Claude Code, which Codex does not treat as a refusal, so that the patch is applied.

## s-4mej6ccn7xu3d3p — A git hook runs the SpecSheriff tools that a plugin keeps on the machine

**Title:** A git hook runs the SpecSheriff tools that a plugin keeps on the machine

**Text:**

When a session starts, the plugin for Claude Code (§s-zh2vcr3xjumppg5) copies the SpecSheriff tools that it holds into its data directory, where the copy there is of another release or missing. The data directory is `<plugins>/data/specsheriff-specsheriff-marketplace/`. `<plugins>` is `CLAUDE_CODE_PLUGIN_CACHE_DIR` where that variable is set, and `~/.claude/plugins` otherwise.

The plugin for Codex CLI (§s-2pdy9gw2jrjvfb4) keeps no copy. Its SpecSheriff tools are in its directory in Codex's cache, `<Codex home>/plugins/cache/specsheriff-marketplace/specsheriff/<version>/tools/`. `<Codex home>` is `CODEX_HOME` where that variable is set, and `~/.codex` otherwise.

`~` is the user's home directory, which on Windows is the user's profile directory.

Each git hook that `sheriff init` writes holds the following:
- the lookup of those SpecSheriff tools;
- a call to the script for that hook in their `hooks/`;
- the run of the project's own tools for that hook (§s-n4m5zvh96yb299p) and a notice, for the case in which the SpecSheriff tools cannot run.

Where the hook finds the SpecSheriff tools of both plugins, it takes those whose `release` file opens with the higher version, compared as semantic versions. Where their versions are equal, it takes either.

The script for the hook runs what the hook is to run (§s-477gtdrkw34dzxw), including the project's own tools for that hook.

The SpecSheriff tools cannot run where the hook finds the tools of neither plugin, or where Node.js is missing or older than the SpecSheriff tools need. In either case, the hook runs the project's own tools for that hook, and lets the commit or the push through unless one of them fails (§s-pcnyfp7gev7syax). The pre-commit and pre-push hooks then say that no check of SpecSheriff ran, and why: no plugin's SpecSheriff tools are on the machine, or Node.js is missing or older than the version that they name.

The script run when a session starts names each of the following hooks that holds what an earlier release of `sheriff init` wrote:
- each git hook in `.githooks/`;
- each of the agent's hooks for Codex in `.codex/hooks.json`.

For each such hook, it says that `sheriff init` replaces it (§s-7unxytshhc4md54).

**Reason:**

A git hook written once into a project finds the SpecSheriff tools wherever, and from whichever plugin, a machine keeps them, so that the checks follow each release of the plugin without any change to the project. Where those tools cannot run, the project's own tools keep guarding the commit and the push, as the rule on the order of tools and checks requires (§s-pcnyfp7gev7syax).

**Example:**

A user has both plugins: the plugin for Claude Code at release 0.7.0 and the plugin for Codex CLI at release 0.6.0. Each git hook runs the SpecSheriff tools of 0.7.0 from the data directory of the plugin for Claude Code, also when the commit is made from Codex. The most likely mistake is to take the tools of the agent that is running, so that a commit made from Codex is checked by the earlier release.

## s-n4m5zvh96yb299p — The project's own tools in a git hook

**Title:** The project's own tools in a git hook

**Text:**

A project's own tools for a git hook are the files directly in `.githooks/<hook>.d/` whose first line names their interpreter. Each git hook that `sheriff init` writes runs only those files, and names each other file there.

A first line names an interpreter where it opens with `#!`, followed by a path and at most one argument. A carriage return that ends the line is left out.

Where the hook runs the SpecSheriff tools (§s-4mej6ccn7xu3d3p), it runs the project's own tools at the points that the order of that hook sets (§s-477gtdrkw34dzxw, §s-pcnyfp7gev7syax):
- first, those that the project's own guidelines list as tools that rewrite files (§s-t9j29hppag2nren), in the order of that list;
- later, the other tools, in the byte order of their names.

The hook names each path in that list for which it runs nothing.

Where the SpecSheriff tools cannot run (§s-4mej6ccn7xu3d3p), the hook runs all of the project's own tools for that hook in the byte order of their names.

Each of the project's own tools does the following:
- it runs from the root of the working tree, by the interpreter that its first line names, in git's own environment, so that it reads the working tree and git's index;
- it is handed the arguments that git hands the hook, and a copy of the standard input that git hands it.

Each of them runs regardless of what the others find. The hook fails where one of them ends with an exit code other than zero.

Where the hook runs the SpecSheriff tools, it also refuses the commit or the push where one of the other tools does any of the following (§s-yn5tdx2bp4f5rq7):
- adds, changes or removes a file of the working tree, other than a file that git ignores;
- changes what is staged;
- changes the commit message.

The hook makes this check regardless of whether the specification is approved or a draft.

The hook names each tool that makes it fail, and each file that such a tool added, changed or removed.

These files are among the repository's own tools (§s-hheus6f395ynqvc).

**Reason:**

A project keeps its own tools for a hook in a folder that the hook reads without the SpecSheriff tools, so that those tools run on every machine, whatever the SpecSheriff tools can do there (§s-pcnyfp7gev7syax). A tool is recognised by its first line rather than by the executable bit, since a file committed from a system without that bit loses it.

**Example:**

`.githooks/pre-commit.d/` holds `scan` and `tidy`, and the project's own guidelines list `pre-commit.d/tidy` as a tool that rewrites files. At a commit, `tidy` runs first and stages the files that it rewrites. `scan` runs after `sheriff types`, and the hook refuses the commit where `scan` changes any file. The most likely mistake is to run both in the byte order of their names, so that `scan` reads the files before `tidy` has rewritten them.

## proposal:row-10-1-37b — row 10.1.37b of the main table of checks

A new row of the main table of checks, with the sid s-yn5tdx2bp4f5rq7. Its cost on failure: “refused, naming the tool and each file that it added, changed or removed”.

**Text:**

A project's own tool that runs on a commit or a push after the tools that rewrite files (§s-pcnyfp7gev7syax), other than a check that a project's own guidelines add (§s-2fau85dfyyeq66m), leaves the working tree, what is staged and the commit message as they were, except for the files that git ignores

## s-zh2vcr3xjumppg5 — The plugin for Claude Code

**Title:** The plugin for Claude Code

**Text:**

The plugin for Claude Code, `specsheriff`, holds the following:
- the skills of the SpecSheriff plugins (§s-kq6wmdud9c7j2k9);
- the SpecSheriff tools, with the files common to every project at the paths given for them in the folder of the SpecSheriff tools (§s-zefk589ykh37b8u): the SpecSheriff guidelines, each extension of the guidelines (§s-mbmnsnxenmavu3z) and the appendix of the tools (§s-a4rbry4hsu34hy8), with their schemas;
- the scripts of the agent's hooks (§s-477gtdrkw34dzxw).

The plugin declares to Claude Code the agent's hooks: the hook run when a session starts, the hook before an edit made with `Write`, `Edit` or `MultiEdit`, and the hook after such an edit or a shell command run with `Bash` or `PowerShell` (§s-477gtdrkw34dzxw).

The plugin declares each setting of the runner `claude` (§s-tnz9zgqx8c629a7) as one of its options. Claude Code asks the user for those options when it enables the plugin. Each option names its default and declares no default value, so that a value that Claude Code holds for it is one that the user gave.

In a repository without `sheriff.config.json` at its root, the plugin's hooks do only the following:
- keep its copy of the SpecSheriff tools (§s-4mej6ccn7xu3d3p);
- write the settings that the user gave as its options (§s-p29yawkkkgk7kxb).

The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory. A project declares both in `.claude/settings.json` (§s-7unxytshhc4md54):
- the marketplace under `extraKnownMarketplaces`, whose source is the branch `release` of the repository where the SpecSheriff guidelines are written, with `autoUpdate` on;
- the plugin under `enabledPlugins`.

Each machine runs the release that its copy of the plugin holds, until Claude Code updates that copy.

The plugin's skills and the agent's hooks run `sheriff` from the SpecSheriff tools in the plugin, as `node "${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js"`.

**Reason:**

An agent takes up a skill only where it is installed, and Claude Code installs, updates and enables a plugin that a project declares. So the plugin brings the skills, the SpecSheriff guidelines with their extensions and the SpecSheriff tools of one release to the agent of every clone together, and the project keeps only the calls to them.

**Example:**

A project chooses the RecordType extension. On every machine where Claude Code has updated the plugin to a release that delivers that extension, the SpecSheriff tools find the extension at `guidelines/extensions/recordtype.json` in their own folder. The most likely mistake is to keep a copy of the extension in the project, which `sheriff validate` refuses (§s-6bmnsbskg6en4nf).

## s-2pdy9gw2jrjvfb4 — The plugin for Codex CLI

**Title:** The plugin for Codex CLI

**Text:**

The plugin for Codex CLI, `specsheriff`, holds the skills of the SpecSheriff plugins (§s-kq6wmdud9c7j2k9). It holds the SpecSheriff tools, with the files common to every project, and the scripts of the agent's hooks, as the plugin for Claude Code does (§s-zh2vcr3xjumppg5).

The plugin declares no hooks to Codex. The agent's hooks for Codex are in the project, and call the scripts that the plugin holds (§s-n76wt2bkqdmh78x).

The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory, in `.agents/plugins/marketplace.json`. That file is beside the file that lists the plugin for Claude Code.

The practitioner's guide, the plugin's `README.md`, gives the commands that install the plugin on a machine:
- `codex plugin marketplace add non4me/SpecSheriff@release`;
- `codex plugin add specsheriff@specsheriff-marketplace`.

The plugin's skills run `sheriff` from the SpecSheriff tools in the plugin, as `node <plugin>/tools/dist/cli.js`. A skill takes `<plugin>` from the path of its `SKILL.md`, `<plugin>/skills/<skill>/SKILL.md`.

**Reason:**

An agent takes up a skill only where it is installed, and Codex installs a plugin only for the user who adds it. So each user installs the plugin for Codex CLI, which brings the same release of the skills and the SpecSheriff tools as the plugin for Claude Code, while each agent updates its own plugin.

## new:tools-15-skills — The skills of the SpecSheriff plugins

A new node, split from `s-zh2vcr3xjumppg5`, with the sid s-kq6wmdud9c7j2k9.

**Title:** The skills of the SpecSheriff plugins

**Text:**

Each SpecSheriff plugin holds the skills `spec`, `spec-review`, `spec-adopt`, `spec-init`, `spec-remove` and `spec-settings`.

`spec-init` runs `sheriff init` (§s-7unxytshhc4md54), with `--agent codex` in the plugin for Codex CLI. It then takes up the settings of the runner that `sheriff review` would run (§s-xr5xxa9cxf2mq5u). It passes over each setting that the user's git configuration holds, and each setting that the user has already been asked for (§s-p29yawkkkgk7kxb). For each other setting, it does the following:
- offers the setting to the user at its default, to confirm or replace;
- writes what the user answers.

`spec-init` then records that the runner has been asked, as the hook run when a session starts does (§s-p29yawkkkgk7kxb).

`spec-remove` runs `sheriff remove` (§s-7unxytshhc4md54) and then offers to remove the plugin from the machine.

`spec-settings` shows in the chat the settings that only an owner of the specification changes, as `sheriff settings` prints them (§s-chsfpkgpmfk4fft). It then offers the user either of the following ways to change them:
- `sheriff settings` in a terminal window of its own, where the session runs on a machine on which the skill can open one, after which the skill reports what changed;
- questions in the chat, after which the skill runs `sheriff settings` with the arguments of each change that the user asks for.

The skills set neither a model nor a reasoning effort, for themselves or for any agent that they start. They work at those that the user has chosen in the session.

**Reason:**

Each skill performs its procedure through the SpecSheriff tools, so that the agent of either SpecSheriff plugin follows the same steps. What a skill would make the user pay for, the reviewer's settings and the model and effort of the session, is left to the user (§s-tnz9zgqx8c629a7).

**Example:**

An owner works from a browser through Remote Control and asks the agent to choose the Views extension. `spec-settings` offers a terminal window or questions in the chat, and the owner chooses the chat. The skill runs `sheriff settings extension views on`. The most likely mistake is to open the window without asking, on a desktop that the owner cannot see.
