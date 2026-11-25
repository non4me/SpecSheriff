# T25, group 8, round b: the English of every node that the round changes

This file holds the final English, after round b, of every node and proposal of group 8 that fix-group8-b.mjs changes or adds, each in full: the hooks, the guard before an agent's edit, the agent's hooks for Codex CLI, how a git hook finds the SpecSheriff tools, the project's own tools in a git hook, row 10.1.37b, the two plugins, and the skills of the plugins, now four nodes.
Each node is given under its key in `tools-drafts.json`: its title, its text, its reason, its examples and its todos.
fix-group8-b.mjs writes this file; edit the script, not this file.

## s-477gtdrkw34dzxw — The hooks

**Title:** The hooks

**Text:**

The following hooks run the SpecSheriff tools, and with them the checks before and after an agent's edit, on a commit and on a push (§s-epaw9sgyaajzn8g):
- the git hooks, which `sheriff init` writes into `.githooks/` (§s-7unxytshhc4md54), and each of which runs the SpecSheriff tools that a plugin keeps on the machine (§s-4mej6ccn7xu3d3p):
  - `pre-commit`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), `sheriff types` and the checks (§s-npnmwyt6s3gypwe);
  - `commit-msg`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), then `sheriff commit-message`, and then, only after `sheriff commit-message` has passed, `sheriff review` (§s-4kd2pave7vm4hmd);
  - `pre-push`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), then compares the working tree with what the push sends (§s-8a5eyy5n5hnsgrs), and runs the tests (§s-b6qdtghnyha3fhk) only where that comparison has refused nothing.
- the agent's hooks, which the plugin for Claude Code declares (§s-zh2vcr3xjumppg5) and which `sheriff init --agent codex` writes into the project for Codex CLI (§s-n76wt2bkqdmh78x):
  - when a session starts, a hook that turns the git hooks on (§s-jgcveum8dwdnyzr) and has the agent ask the user for the settings of each runner (§s-p29yawkkkgk7kxb);
  - before an edit made with the file-editing tools, a hook that runs `sheriff guard` (§s-st6td4mua9uqt9z);
  - after such an edit or a shell command, a hook that writes what is generated from the nodes and runs the checks (§s-hcmpjmwtgfwzncu).

On a commit, the pre-commit hook and the commit-msg hook each write out what is staged to a directory of its own. They run `sheriff types` and the checks there, with that directory as git's working tree, against the repository's history.

Each check run by the pre-commit hook, the commit-msg hook or the agent's hook after an edit reads the commit being made. On a commit, that commit is what is staged. After an edit, it is the working tree's difference from the last commit. Besides that commit, such a check reads only the following:
- the SpecSheriff guidelines and the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g), with the schema of the guidelines and that of each such extension that has one, as they are delivered with the SpecSheriff tools that run the check (§s-bsya3febm6u64ab);
- the settings of the reviewer's runner in the git configuration of the user who commits, for the review (§s-tnz9zgqx8c629a7);
- the repository's history and the commit message, where the node on how the check is made (§s-4kd2pave7vm4hmd) says so.

**Reason:**

A check reads the commit being made, because judging anything else would pass or refuse what is not being committed. The hooks that the repository keeps and those that the plugin for Claude Code declares run each check at the moment set for it in every clone, whoever makes the change (§s-epaw9sgyaajzn8g).

**Example:**

A developer stages a change to rule R and leaves a second change to R unstaged. On the commit, `sheriff validate` reads R as it is staged. The most likely mistake is to run the checks on the working tree, so that they judge the second change, which the commit does not hold.

**Todo (2026-10-28):** The export and the map catch up with a change that reaches the working tree through git — a pull, a merge, a checkout — only at the next edit an agent makes or the next commit. Post-merge and post-checkout hooks running `sheriff markdown` and `sheriff map` would remove that delay.

## new:tools-6-pre-commit — The pre-commit hook

A new node, split from `s-477gtdrkw34dzxw`, with the sid s-npnmwyt6s3gypwe.

**Title:** The pre-commit hook

**Text:**

The pre-commit hook runs the following, in this order (§s-pcnyfp7gev7syax):
- the project's own tools for that hook that the project's own guidelines (§s-u7tw6m8npxmv5tu) list as tools that rewrite files (§s-t9j29hppag2nren, §s-n4m5zvh96yb299p);
- `sheriff types` (§s-a8fn72xa782wvbk), run on the files as they are staged;
- the project's other tools for that hook (§s-n4m5zvh96yb299p);
- `sheriff validate` (§s-6uqu6vn5fnp7fwb), which first checks for a key written more than once (§s-7zqsstgnuc772ba) and validates against the schema (§s-xzcw3hv4hmxz7h7), and runs the project's own checks (§s-2fau85dfyyeq66m, §s-7pk89t8z6wymmj9) only after both have passed;
- `sheriff binding` (§s-p34692nwceaxq2p) and `sheriff citations` (§s-bgegrkhrgpefs69), only after the check for a key written more than once and the validation against the schema have passed;
- where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb), `sheriff markdown` (§s-e3495enbc5h75c3) and `sheriff map` (§s-rpv4fkdqqguptqd), in the working tree.

The hook writes out what is staged to a directory of its own (§s-477gtdrkw34dzxw) once the project's tools that rewrite files have run. `sheriff types` and the checks run in that directory.

The hook writes each file that `sheriff types` writes into the working tree, not into that directory, in place of whatever is at the same path, and names it as a file for the author to stage. The checks therefore read each such file as it is staged. The hook itself stages nothing.

A failure of `sheriff markdown` or `sheriff map` to write its files is reported, and does not make the hook refuse the commit.

**Reason:**

On every commit, each check judges the commit in its final form (§s-pcnyfp7gev7syax). So the tools that rewrite files run before the checks, and what the hook generates waits in the working tree until the author stages it, since what a commit holds is its author's choice.

**Example:**

A developer edits a RecordType, an owner approves the new wording, and the developer stages the specification and commits. `sheriff types` generates the RecordType's new types from the staged nodes, and the hook writes them into the working tree and names them. `sheriff binding` refuses the commit, since the staged types differ from what the approved wording produces (§s-dbk2vyeg8z5jxna). The developer stages the new types and commits again. The most likely mistake is to let the checks read the types that `sheriff types` has just written, so that the commit passes with the old types staged.

## new:tools-6-push-compare — The working tree compared with what a push sends

A new node, split from `s-477gtdrkw34dzxw`, with the sid s-8a5eyy5n5hnsgrs.

**Title:** The working tree compared with what a push sends

**Text:**

Before a push for which it runs the tests (§s-b6qdtghnyha3fhk), the pre-push hook compares the working tree with each commit that the tests judge: each commit to which the push creates or updates a ref, directly or through a tag, and that meets the conditions under which the tests run.

The hook refuses the push where either of the following holds for a file, and names each such file:
- the file differs between the working tree and such a commit;
- the file is in only one of them, including a file in the working tree that git does not track.

The hook leaves out the files that git ignores. Where it does not refuse the push, it runs the tests in the working tree.

**Reason:**

The tests run in the working tree, which holds what each checkout installs or builds for itself, so they judge a pushed commit only where the working tree holds what that commit holds.

**Example:**

A developer commits a change and leaves an edit to `src/a.ts` uncommitted. The specification is approved, and the project's own guidelines name a push as the moment at which the tests run. The pre-push hook refuses the push and names `src/a.ts`. The most likely mistake is to run the tests in the working tree as it is, so that they pass or fail because of an edit that the pushed commit does not hold.

## new:tools-6-hooks-on — Turning the git hooks on when a session starts

A new node, split from `s-477gtdrkw34dzxw`, with the sid s-jgcveum8dwdnyzr.

**Title:** Turning the git hooks on when a session starts

**Text:**

In a repository whose root holds `sheriff.config.json`, the agent's hook run when a session starts (§s-477gtdrkw34dzxw) does the following with git's `core.hooksPath`:
- where it is unset, the hook sets it to `.githooks` in the repository's git configuration and says so;
- where it points to a different directory, the hook says that the git hooks that `sheriff init` writes (§s-7unxytshhc4md54) do not run.

The hook also names each git hook in `.githooks/` in either of the following cases:
- git's index holds that git hook without the executable mode;
- on a system whose files keep the executable bit, the git hook's file lacks that bit.

For each such git hook, the agent's hook says how to make the git hook executable on every system: `chmod +x <hook>` and `git update-index --chmod=+x <hook>`, then a commit. It leaves the mode of each file and git's index as they are. It leaves out the project's own tools in `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p).

**Reason:**

In a clone where git does not run the git hooks, no check runs on a commit. A git hook that git does not run cannot report that it was skipped, while the hook run when a session starts reaches every clone. The hook run when a session starts leaves recording a git hook's mode to the author of the next commit, since what a commit holds is its author's choice.

**Example:**

A repository set up on Windows has its git hooks committed without the executable mode. A developer clones it on Linux and starts a session. The hook run when a session starts names each git hook and says how to make it executable. The most likely mistake is to make the git hooks executable in the working tree without saying so, which leaves the index as it was, so that each of the other clones still gets git hooks that git skips.

## new:tools-6-reviewer-settings — The settings of each runner when a session starts

A new node, split from `s-477gtdrkw34dzxw`, with the sid s-p29yawkkkgk7kxb.

**Title:** The settings of each runner when a session starts

**Text:**

In Claude Code, the hook run when a session starts writes into the user's git configuration, with `git config --global`, each setting of the runner `claude` (§s-tnz9zgqx8c629a7) that the user has given as an option of the plugin for Claude Code (§s-zh2vcr3xjumppg5). It does so in any repository, where the configuration lacks the setting or holds a different value.

Then, in a repository whose root holds `sheriff.config.json`, the agent's hook run when a session starts (§s-477gtdrkw34dzxw), in Claude Code or in Codex CLI, names each setting of the runner that `sheriff review` would run on a commit there (§s-xr5xxa9cxf2mq5u), where the user's git configuration lacks that setting.

That runner is the one that `review.runner` in `sheriff.config.json` names, or otherwise the runner of the agent whose plugin's SpecSheriff tools the git hooks would take there (§s-4mej6ccn7xu3d3p). With each setting, the hook names the default that `sheriff review` takes for it. It asks the agent to do the following:
- to offer the user each default to confirm or replace;
- to write with `git config --global` the value that the user gives in reply, even where that value is the default.

The hook makes this request once for each runner on each machine. After making it, the hook sets `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked` to `true` in the user's git configuration. While that key is `true`, the hook does not ask about that runner's settings.

**Reason:**

A run of the reviewer is paid for by the user who commits, so the user who commits chooses the reviewer's settings (§s-tnz9zgqx8c629a7), once, as soon as an agent can ask. The git hooks run the reviewer outside the agent, so they read those settings from the user's git configuration, where the hook run when a session starts also writes the options that Claude Code asked the user for.

**Example:**

A user installs the plugin for Codex CLI and opens a repository that `sheriff init --agent codex` has set up. The hook run when a session starts names `specsheriff.review.codexModel` and `specsheriff.review.codexEffort` with their defaults, and the agent asks the user about them. The user confirms the effort and names a model, and the agent writes both. The most likely mistake is to write the defaults without asking, so that the user pays for settings that the user never chose.

## new:tools-6-after-edit — The agent's hook after an edit

A new node, split from `s-477gtdrkw34dzxw`, with the sid s-hcmpjmwtgfwzncu.

**Title:** The agent's hook after an edit

**Text:**

After an agent's edit made with the file-editing tools, or after a shell command that the agent runs, the agent's hook (§s-477gtdrkw34dzxw) runs the SpecSheriff tools where either of the following holds:
- the last commit or the working tree, other than the files that git ignores, differs from what the hook recorded in the clone's git directory when the checks last ran;
- nothing is recorded.

Where nothing is recorded, the hook treats every file as one that differs.

Where it runs them, the hook runs the following, in this order:
- `sheriff reindex` (§s-ztseyetus7np6br), where the files that differ include `sheriff.config.json`, a file under `specs/`, or a file that the SpecSheriff tools read to find SpecTags (§s-8xw4mgvpexyvw5q);
- `sheriff markdown` (§s-e3495enbc5h75c3) and `sheriff map` (§s-rpv4fkdqqguptqd), where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb), and either the files that differ include `sheriff.config.json` or a file under `specs/`, or `sheriff reindex` has written a file;
- `sheriff types` (§s-a8fn72xa782wvbk), where the files that differ include `sheriff.config.json`, a file under `specs/` or the code of a project's own generator (§s-km4x4s26kv7pjze), or where `sheriff reindex` has written a file;
- `sheriff validate` (§s-6uqu6vn5fnp7fwb), `sheriff binding` (§s-p34692nwceaxq2p) and `sheriff citations` (§s-bgegrkhrgpefs69).

Where `sheriff reindex` refuses anything, for example a pair of values under one key (§s-w5wg69pvvhedsws) or a file that the schema refuses (§s-xzcw3hv4hmxz7h7), the hook stops after it. It then records the last commit and the working tree as they are at that moment.

The hook hands the agent the refusals of `sheriff reindex`, of `sheriff types` and of the checks, and names each node that `sheriff reindex` makes a draft. It hands them to Claude Code by exiting with code 2 and writing them to its standard error. It hands them to Codex in the answer that the agent's hooks for Codex CLI write (§s-n76wt2bkqdmh78x).

A failure of `sheriff markdown` or `sheriff map` to write its files is handed to the agent, and does not stop the hook.

Once the checks end, whether or not they refuse anything, the hook records the last commit and the working tree as they were when `sheriff validate` began. So a file changed while the checks run is checked at the next run.

**Reason:**

The checks run where the agent works, so that a mistake is found at the edit that makes it (§s-epaw9sgyaajzn8g). They run only where something has changed since they last ran, so that a session that only reads the repository through the shell is not held up.

**Example:**

An agent that has written the test of rule R adds the SpecTag of R to a function in a new file, `src/order.ts`. The hook runs `sheriff reindex`, which adds `src/order.ts` to the `meta.code` of R, and the checks then accept that list. The most likely mistake is to run `sheriff reindex` only where a file under `specs/` has changed, so that `sheriff binding` refuses the `meta.code` of R after an edit to code alone (§s-t383grkn3q68dpf).

## s-st6td4mua9uqt9z — An edit judged before it is made

**Title:** An edit judged before it is made

**Text:**

`sheriff guard` refuses each of the following edits by an agent (§s-83ev4wwesbwnhnp):
- an edit after which a node that it adds, or a node whose wording (§s-5ah25f6gy99panq) or approval status (§s-tgrnpagrb58tya7) it changes, is approved while no approval of that node's wording is in force (§s-v4qus7raqnwzneb);
- an edit that adds or changes code bound to a rule (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp), other than tests, while no test of the system's code (§s-hheus6f395ynqvc) declares that rule's SpecTag (§s-zrsc6asgmhv8tnc);
- an edit to `specs/_approvals.jsonl`, whatever it changes;
- an edit that adds, changes or removes an entry in one of the lists `approvalStatus`, `strict` and `extensions` of `sheriff.config.json` (§s-d3nkw9b6mn98vuw).

The refusal names each such node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and each such rule by its sid and its location. Where a test names such a rule only by a bare sid (§s-gb8s9657a65hqmv), the refusal also names `sheriff reindex`, which writes the test's SpecTag.

For an edit to `specs/_approvals.jsonl`, the refusal names `sheriff approve`, which records an approval and its withdrawal (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). For an edit to an entry of one of those lists, it names the list and `sheriff settings` (§s-chsfpkgpmfk4fft).

While the installed SpecSheriff plugin lacks an extension that the project has chosen, `sheriff guard` refuses every edit, and names each missing extension and the version of the SpecSheriff tools in the plugin (§s-mhsb6fjsq5xn6c9).

`sheriff guard` judges an edit made with Claude Code's `Write`, `Edit` or `MultiEdit`, and a patch that Codex's `apply_patch` applies (§s-n76wt2bkqdmh78x). It reads the edit, as the agent's harness describes it, from its standard input. It builds each file as the edit would leave it, without writing it to disk. Where an edit made with `Edit` or `MultiEdit` would not apply, for example where it names text that the file does not hold, `sheriff guard` lets the tool refuse it.

`sheriff guard` judges the nodes in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It leaves out each node whose approval status is derived from other nodes, such as a section (§s-9kfdycuq34beqvs). It leaves to the checks after the edit (§s-hcmpjmwtgfwzncu) a file of the specification that would not be valid JSON after the edit.

`sheriff guard` finds the code that an edit adds or changes in the same way as it finds what a commit adds or changes (§s-2x58az67bm6cxq2), comparing each file as it is with the file as the edit would leave it. It looks for a test that declares the rule's SpecTag among the tests of the working tree as the edit would leave it.

`sheriff guard` reads the lists of `sheriff.config.json` from the file as it is and as the edit would leave it. A `sheriff.config.json` that is missing or is not valid JSON is read as holding none of those lists.

Where it refuses an edit, `sheriff guard` writes the refusal to its standard error and exits with code 2. `sheriff guard` refuses these edits regardless of whether the specification is approved or a draft.

**Reason:**

`sheriff guard` judges each file as the edit would leave it, so that an edit that the rule on an agent's edit forbids is refused before anything is written (§s-83ev4wwesbwnhnp). It judges only what the edit adds or changes, so that what the edit leaves as it was never holds up the edit.

**Example:**

An owner asks the agent to approve the specification, and the agent tries to add an entry to `approvalStatus` in `sheriff.config.json` with its editing tool. `sheriff guard` refuses the edit and names `approvalStatus` and `sheriff settings`, and the agent runs `sheriff settings status approved`. The most likely mistake is to judge only the files under `specs/`, so that the entry is written without `sheriff settings`, which checks that whoever records it is an owner.

## s-n76wt2bkqdmh78x — The agent's hooks for Codex CLI

**Title:** The agent's hooks for Codex CLI

**Text:**

The agent's hooks for Codex are in the project's `.codex/hooks.json`, where `sheriff init --agent codex` writes them (§s-7unxytshhc4md54). They are the following:
- one when a session starts;
- one before an edit made with `apply_patch`;
- one after such an edit or a shell command.

Each hook only looks up the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4) in Codex's cache (§s-4mej6ccn7xu3d3p), and calls the plugin's script for that hook: `hooks/session-start.sh`, `hooks/guard.sh` or `hooks/after-edit.sh`. Where a hook finds no plugin, it does nothing.

Each script runs what the list of the hooks gives for its hook (§s-477gtdrkw34dzxw). In a repository without `sheriff.config.json` at its root, the scripts do nothing.

The scripts answer Codex with JSON written to their standard output, and exit with code 0:
- before an edit that `sheriff guard` (§s-st6td4mua9uqt9z) refuses: `{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny", "permissionDecisionReason": <the refusal>}}`;
- after an edit or a shell command for which the hook has something to hand the agent (§s-hcmpjmwtgfwzncu): `{"decision": "block", "reason": <what it hands the agent>}`.

A script reads from the file `agent` in the folder of the plugin's SpecSheriff tools (§s-xr5xxa9cxf2mq5u) that it serves Codex.

Before an edit, `sheriff guard` does the following:
- it reads each file that the patch adds, updates, deletes or moves, at the path that the patch gives, relative to the directory in which the session works;
- it applies the patch to those files in memory, treating a moved file as deleted at its old path and added at its new one;
- it judges each of those files as it judges an edit made with the file-editing tools (§s-st6td4mua9uqt9z).

`sheriff guard` refuses the whole patch in either of the following cases:
- it refuses one of the patch's files;
- it cannot read or apply the patch.

**Reason:**

The agent's hooks for Codex hold an agent working in Codex to the same checks, before and after each edit, as an agent in Claude Code. Codex runs a project's hook only after its user has trusted the hook as it is written. So a hook that only finds the plugin and calls its scripts needs no new trust when a release of the plugin changes what the scripts do.

**Example:**

A patch adds `src/new.ts` and changes `specs/_approvals.jsonl`. `sheriff guard` refuses the patch, and `hooks/guard.sh` writes the denial as JSON with the refusal in `permissionDecisionReason`, so Codex applies no part of the patch. The most likely mistake is to write the refusal to standard output as plain text, which Codex ignores before a tool's call, so that the patch is applied.

## s-4mej6ccn7xu3d3p — A git hook runs the SpecSheriff tools that a plugin keeps on the machine

**Title:** A git hook runs the SpecSheriff tools that a plugin keeps on the machine

**Text:**

When a session starts, the plugin for Claude Code (§s-zh2vcr3xjumppg5) copies the SpecSheriff tools that it holds into its data directory, unless its data directory already holds a copy of the same release. The data directory is `<plugins>/data/specsheriff-specsheriff-marketplace/`. `<plugins>` is `CLAUDE_CODE_PLUGIN_CACHE_DIR` where that variable is set, and `~/.claude/plugins` otherwise.

The plugin for Codex CLI (§s-2pdy9gw2jrjvfb4) keeps no copy. Its SpecSheriff tools are in its directory in Codex's cache, `<Codex home>/plugins/cache/specsheriff-marketplace/specsheriff/<version>/tools/`. `<Codex home>` is `CODEX_HOME` where that variable is set, and `~/.codex` otherwise.

`~` is the user's home directory, which on Windows is the user's profile directory.

Each git hook that `sheriff init` writes (§s-7unxytshhc4md54) does the following:
- it looks up the SpecSheriff tools of either plugin;
- it calls the script for that hook in their `hooks/`;
- where the SpecSheriff tools cannot run, it runs the project's own tools for that hook (§s-n4m5zvh96yb299p) and gives a notice.

Where the hook finds the SpecSheriff tools of both plugins, it takes those whose `release` file opens with the higher version, compared as semantic versions. Where their versions are equal, it takes either.

The script for the hook runs what the list of the hooks gives for that hook (§s-477gtdrkw34dzxw), including the project's own tools for that hook.

The SpecSheriff tools cannot run where the hook finds the tools of neither plugin, or where Node.js is missing or older than the version that the `engines` field of their `package.json` names. In either case, the hook runs the project's own tools for that hook, and lets the commit or the push through unless one of them fails (§s-pcnyfp7gev7syax). The pre-commit and pre-push hooks then say that the SpecSheriff tools ran no check, and why: no plugin's SpecSheriff tools are on the machine, or Node.js is missing or older than that version, which the hooks name.

The hook run when a session starts (§s-477gtdrkw34dzxw) names each of the following hooks that holds what an earlier release of `sheriff init` wrote:
- each git hook in `.githooks/`;
- each of the agent's hooks for Codex in `.codex/hooks.json`.

For each such hook, it says that running `sheriff init` again replaces that hook.

**Reason:**

A git hook written once into a project finds the SpecSheriff tools wherever, and from whichever plugin, a machine keeps them, so that the checks keep up with each release of the plugin without any change to the project. Where those tools cannot run, the project's own tools keep guarding the commit and the push, as the rule on the order of tools and checks requires (§s-pcnyfp7gev7syax).

**Example:**

A user has both plugins: the plugin for Claude Code at release 0.7.0 and the plugin for Codex CLI at release 0.6.0. Each git hook runs the SpecSheriff tools of 0.7.0 from the data directory of the plugin for Claude Code, even when the commit is made from Codex. The most likely mistake is to take the tools of the agent that is running, so that a commit made from Codex is checked by the earlier release.

## s-n4m5zvh96yb299p — The project's own tools in a git hook

**Title:** The project's own tools in a git hook

**Text:**

A project's own tools for a git hook are the files directly in `.githooks/<hook>.d/` whose first line names their interpreter. Each git hook that `sheriff init` writes (§s-7unxytshhc4md54) runs only those files, and names any other file there.

A first line names an interpreter where it opens with `#!`, followed by a path and at most one argument. A carriage return that ends the line is left out.

Where the hook runs the SpecSheriff tools (§s-4mej6ccn7xu3d3p), it runs the project's own tools at the points that the order of that hook sets (§s-477gtdrkw34dzxw, §s-pcnyfp7gev7syax):
- first, those that the project's own guidelines list as tools that rewrite files (§s-t9j29hppag2nren), in the order of that list;
- later, the other tools, in the byte order of their names.

The hook names each path in the project's list of tools that rewrite files for which it runs nothing, where that path points into its own folder, `.githooks/<hook>.d/`.

Where the SpecSheriff tools cannot run (§s-4mej6ccn7xu3d3p), the hook runs all of the project's own tools for that hook in the byte order of their names.

The hook runs each of the project's own tools as follows:
- from the root of the working tree, with the interpreter that the tool's first line names, in the environment that git gives the hook, so that the tool reads the working tree and git's index;
- with the arguments that git hands the hook, and with a copy of the standard input that git hands the hook.

Each of the project's own tools runs regardless of what the others find. The hook fails where one of them exits with a code other than zero.

Where the hook runs the SpecSheriff tools, it also refuses the commit or the push, regardless of whether the specification is approved or a draft, where one of the project's own tools that runs after the tools that rewrite files does any of the following (§s-yn5tdx2bp4f5rq7):
- adds, changes or removes a file of the working tree, other than a file that git ignores;
- changes what is staged;
- changes the commit message.

The hook names each tool that makes it fail, and each file that such a tool added, changed or removed.

A project's own tools for a git hook are among the repository's own tools (§s-hheus6f395ynqvc).

**Reason:**

A project's own tools guard what the checks of SpecSheriff do not, such as a scan for secrets, so they run on every machine, whatever the SpecSheriff tools can do there. They run in the order in which tools and checks run (§s-pcnyfp7gev7syax), so that none of them changes what a check has read. A tool is recognised by its first line rather than by the executable bit, since a file committed from a system without that bit loses it.

**Example:**

`.githooks/pre-commit.d/` holds `scan` and `tidy`, and the project's own guidelines list `pre-commit.d/tidy` as a tool that rewrites files. On a commit, `tidy` runs first and stages the files that it rewrites. `scan` runs after `sheriff types`, and the hook refuses the commit where `scan` changes any file that git does not ignore. The most likely mistake is to run both in the byte order of their names, so that `scan` reads the files before `tidy` has rewritten them.

## proposal:row-10-1-37b — row 10.1.37b of the main table of checks

A new row of the main table of checks, with the sid s-yn5tdx2bp4f5rq7. Its cost on failure: “refused, naming the tool and each file that it added, changed or removed”.

**Text:**

A project's own tool, other than a check that a project's own guidelines add (§s-2fau85dfyyeq66m), that runs on a commit or a push after the tools that rewrite files (§s-pcnyfp7gev7syax) leaves the working tree, other than the files that git ignores, what is staged and the commit message as they were

## s-zh2vcr3xjumppg5 — The plugin for Claude Code

**Title:** The plugin for Claude Code

**Text:**

The plugin for Claude Code, `specsheriff`, holds the following:
- the skills of the SpecSheriff plugins (§s-kq6wmdud9c7j2k9);
- the SpecSheriff tools, with each file common to every project at its path in the folder of the SpecSheriff tools (§s-zefk589ykh37b8u), such as the SpecSheriff guidelines, each extension of the guidelines (§s-mbmnsnxenmavu3z) and the appendix of the tools (§s-a4rbry4hsu34hy8);
- the scripts of the agent's hooks (§s-477gtdrkw34dzxw).

The plugin declares the agent's hooks (§s-477gtdrkw34dzxw) to Claude Code:
- the hook run when a session starts;
- the hook run before an edit made with `Write`, `Edit` or `MultiEdit`;
- the hook run after such an edit or after a shell command run with `Bash` or `PowerShell`.

The plugin declares each setting of the runner `claude` (§s-tnz9zgqx8c629a7) as one of its options. Claude Code asks the user for those options when it enables the plugin. The description of each option names the default of its setting. The option declares no default value, so that a value that Claude Code holds for it is one that the user gave.

In a repository without `sheriff.config.json` at its root, the plugin's hooks do only the following:
- keep the plugin's copy of the SpecSheriff tools up to date (§s-4mej6ccn7xu3d3p);
- write the settings that the user gave as the plugin's options (§s-p29yawkkkgk7kxb).

The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory, in `.claude-plugin/marketplace.json` at the root of the repository where the SpecSheriff guidelines are written. A project declares both in `.claude/settings.json` (§s-7unxytshhc4md54):
- the marketplace under `extraKnownMarketplaces`, with the branch `release` of that repository as its source and with `autoUpdate` on;
- the plugin under `enabledPlugins`.

Each machine runs the release that its copy of the plugin holds, until Claude Code updates that copy.

The plugin's skills and the agent's hooks run `sheriff` from the SpecSheriff tools in the plugin, as `node "${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js"`.

**Reason:**

An agent takes up a skill only where the skill is installed. Claude Code installs, updates and enables a plugin that a project declares. So the plugin brings the skills, the SpecSheriff guidelines with their extensions and the SpecSheriff tools, all of one release, to the agent in every clone. The project keeps only the declaration of the plugin and the calls to its tools.

**Example:**

A project chooses the RecordType extension. On every machine where Claude Code has updated the plugin to a release that delivers that extension, the SpecSheriff tools find the extension at `guidelines/extensions/recordtype.json` in their own folder. The most likely mistake is to keep a copy of the extension in the project, which `sheriff validate` refuses (§s-6bmnsbskg6en4nf).

## s-2pdy9gw2jrjvfb4 — The plugin for Codex CLI

**Title:** The plugin for Codex CLI

**Text:**

The plugin for Codex CLI, `specsheriff`, holds the skills of the SpecSheriff plugins (§s-kq6wmdud9c7j2k9). It holds the SpecSheriff tools, with the files common to every project (§s-zefk589ykh37b8u), and the scripts of the agent's hooks (§s-477gtdrkw34dzxw), as the plugin for Claude Code does (§s-zh2vcr3xjumppg5).

The plugin declares no hooks to Codex. The agent's hooks for Codex are in the project (§s-n76wt2bkqdmh78x). They call the scripts that the plugin holds.

The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory, in `.agents/plugins/marketplace.json` at the root of the same repository as the marketplace for Claude Code (§s-zh2vcr3xjumppg5).

The practitioner's guide, the plugin's `README.md`, gives the commands that install the plugin on a machine:
- `codex plugin marketplace add non4me/SpecSheriff@release`;
- `codex plugin add specsheriff@specsheriff-marketplace`.

The plugin's skills run `sheriff` from the SpecSheriff tools in the plugin, as `node <plugin>/tools/dist/cli.js`. A skill takes `<plugin>` from the path of its `SKILL.md`, `<plugin>/skills/<skill>/SKILL.md`.

**Reason:**

An agent takes up a skill only where the skill is installed. Codex installs a plugin only for the user who adds it, so each user installs the plugin for Codex CLI. Each release of that plugin holds the same skills and SpecSheriff tools as the same release of the plugin for Claude Code, so that a project's users work by the same procedures and checks whichever agent each runs.

## new:tools-15-skills — The skills of the SpecSheriff plugins

A new node, split from `s-zh2vcr3xjumppg5`, with the sid s-kq6wmdud9c7j2k9.

**Title:** The skills of the SpecSheriff plugins

**Text:**

Each SpecSheriff plugin, the plugin for Claude Code (§s-zh2vcr3xjumppg5) and the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4), holds the skills `spec`, `spec-review`, `spec-adopt`, `spec-init` (§s-ttsc8tpnu46q53s), `spec-remove` (§s-jn3rauw6a8zeefn) and `spec-settings` (§s-h343yq2mua648eg).

The skills, and any agent that they start, run with the model and the reasoning effort that the user has chosen in the session.

**Reason:**

Each SpecSheriff plugin holds the same skills, so that the agent of each plugin follows the same procedures. No choice that costs the user tokens is made without the user, so the skills leave the session's model and reasoning effort to the user.

**Todo (2026-11-25):** `spec`, `spec-review` and `spec-adopt` are to be described in nodes of their own, which no node does yet. A task after T25 does it.

## new:tools-15-spec-init — The skill `spec-init`

A new node, split from `s-zh2vcr3xjumppg5`, with the sid s-ttsc8tpnu46q53s.

**Title:** The skill `spec-init`

**Text:**

`spec-init` runs `sheriff init` (§s-7unxytshhc4md54), with the option `--agent codex` in the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4).

`spec-init` then asks the user for each of the following that `sheriff.config.json` lacks, and writes each answer there (§s-7unxytshhc4md54):
- the glob patterns that match the files holding the system's code (§s-hheus6f395ynqvc);
- the glob patterns that match the files holding its tests;
- the command that runs the tests (§s-b6qdtghnyha3fhk).

`spec-init` then turns to the settings of the runner that `sheriff review` would run (§s-xr5xxa9cxf2mq5u). Unless the user's git configuration records that the user has been asked about that runner's settings (§s-p29yawkkkgk7kxb), `spec-init` does the following for each of those settings that the configuration lacks:
- offers the user the setting's default, to confirm or replace;
- writes the user's answer with `git config --global`.

`spec-init` then records that the user has been asked about that runner's settings, as the hook run when a session starts does (§s-p29yawkkkgk7kxb).

**Reason:**

The session in which `spec-init` sets a project up started before the project held `sheriff.config.json`, so the hook run when a session starts asked for none of the reviewer's settings in that session (§s-p29yawkkkgk7kxb). The user pays for the reviewer's first run, so `spec-init` asks before it.

## new:tools-15-spec-remove — The skill `spec-remove`

A new node, split from `s-zh2vcr3xjumppg5`, with the sid s-jn3rauw6a8zeefn.

**Title:** The skill `spec-remove`

**Text:**

`spec-remove` runs `sheriff remove` (§s-7unxytshhc4md54) and then offers to remove the plugin from the machine.

**Reason:**

A plugin is installed for its user on the machine, beyond any one project. So `spec-remove` offers to remove the plugin and leaves that choice to the user.

## new:tools-15-spec-settings — The skill `spec-settings`

A new node, split from `s-zh2vcr3xjumppg5`, with the sid s-h343yq2mua648eg.

**Title:** The skill `spec-settings`

**Text:**

`spec-settings` shows in the chat the settings that only an owner of the specification changes, as `sheriff settings` prints them (§s-chsfpkgpmfk4fft). It then offers the user the following ways to change them, and the user chooses one:
- questions in the chat;
- `sheriff settings` in a separate terminal window, which the skill offers only where the machine that runs the session has a graphical desktop.

After the questions, the skill runs `sheriff settings` with the arguments of each change that the user asks for. Once the terminal window closes, the skill reports how the settings that `sheriff settings` prints differ from those that it showed before.

**Reason:**

Only an owner changes these settings, through a procedure (§s-9ttvcwpqkehm58g). The terminal program needs a desktop that the owner can see, which an owner working remotely lacks, so the skill also offers the chat.

**Example:**

An owner works from a browser through Remote Control and asks the agent to choose the Views extension. `spec-settings` offers questions in the chat or a separate terminal window, and the owner chooses the chat. The skill runs `sheriff settings extension views on`. The most likely mistake is to open the window without asking, on a desktop that the owner cannot see.
