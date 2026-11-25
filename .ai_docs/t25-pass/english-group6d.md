# T25, group 6, round d: the English sentences that changed

This file holds only the English sentences of group 6 that round d changed, as `tools-drafts.json` holds them after fix-group6-d.mjs. Each sentence is given under the key of its node in `tools-drafts.json`, with the node's title.
fix-group6-d.mjs writes this file; edit the script, not this file.

## s-v4qus7raqnwzneb — How an approval is recorded

- Each line is the text that `JSON.stringify` writes, with no whitespace outside string values, for an object that holds only the following keys, in this order:
- `withdrawn`, with the value `true`, which appears only in a line that withdraws an approval;
- A node's last approval is the latest line for the node's sid and the fingerprint of its current wording, where that line is an approval.
- Otherwise, a node's last approval is the last line for the node's sid that is an approval, whether or not a later line withdraws that approval.

## new:tools-11-fingerprint — The fingerprint of a node's wording

- The fingerprint of a node's wording (§s-5ah25f6gy99panq) is the SHA-256 hash of the UTF-8 bytes of a single string.
- That string is the text that `JSON.stringify` writes, with no whitespace outside string values, for an object built from the node.
- An approval records a wording by its fingerprint, so that a change to that wording leaves the node without an approval in force, and no other change to the node does (§s-5ah25f6gy99panq).
- Each row of a `TableRule` holds a rule and text that says what a failure of that rule costs.

## new:tools-11-approve — Approving a node

- Where `sheriff approve` refuses any sid named in the run, it records none of the run's approvals and changes no node's status.

## new:tools-11-withdraw — Withdrawing the approval of a node

- For each approval of a wording (§s-5ah25f6gy99panq) of such a node, where that approval is in force and whether or not the node holds that wording now, the command appends to `specs/_approvals.jsonl` a line that withdraws that approval (§s-v4qus7raqnwzneb).
- The command appends these lines in the order in which the first line for each such wording appears in the file.
- Where `sheriff approve --withdraw` refuses any sid named in the run, it records none of the run's withdrawals and changes no node's status.

## new:tools-2-entries — The entries of the settings that only an owner changes

- An entry's `by` holds the email address of the owner who made the change that the entry records.
- Where `sheriff.config.json` holds no entry for the `strict` flag, the flag has the value that the schema of `sheriff.config.json` gives as the `default` of an entry's `on` (§s-zefk589ykh37b8u).
- The entries keep every change that an owner has made to these settings, each with the email address of the owner who made it, but only the last entry of each list sets the value of its setting.
- `sheriff reindex` writes an entry in place of the rule through which an owner approved the specification in an earlier release (§s-gb8s9657a65hqmv).
- Since no entry holds anything that depends on when it is written, the check on the entries (§s-j9r8z4xdrfkfs47) never mistakes the entry that `sheriff reindex` writes for an entry that was changed.

## new:tools-2-approve-spec — Approving the specification

- The checks before an approval treat everything else that the repository keeps, such as the archive (§s-f2b5zvc565s242f), the other lines of `specs/_approvals.jsonl` and the entries in `sheriff.config.json`, as unchanged by that one commit.
- It refuses to record the approval in each case in which it would refuse to turn the flag on.
- The run of `sheriff settings` ends with that refusal.
- The refusal is the same as the refusal to turn the flag on in that case.
- R is then not among the rules that the assumed commit includes, and the owner never sees what R lacks.

## new:tools-2-strict — Turning the `strict` flag on

- The checks that the `strict` flag makes stricter, the cases in which each would refuse a commit or a push that changes nothing, and the command that the refusal to turn the flag on names for each are the following:
- the check for code and tests outside the commit (§s-3xx2eukc8gtd2tx) that no SpecTag (§s-8xw4mgvpexyvw5q) binds: it would refuse where `sheriff untagged` (§s-weuyx98r7c923ab) would list anything, and the refusal names `sheriff untagged`;
- `sheriff settings` also refuses to turn the `strict` flag on while the files of the specification fail the check for a key written more than once (§s-7zqsstgnuc772ba) or the validation against their schema (§s-xzcw3hv4hmxz7h7).
- The refusal names `sheriff validate`, which lists what those checks find.

## new:tools-2-extension-off — Withdrawing the choice of an extension

- A node other than the extension's own nodes depends on the extension where any of the following holds, whether or not the node is in the archive (§s-f2b5zvc565s242f):
- A reference in the project's extension of the schema (§s-xm8rz4uupb73gu5) depends on the extension of the guidelines where the reference points to a definition that the `$defs` of that extension's schema add (§s-xzcw3hv4hmxz7h7).
- The `fields` of the project's extension of the schema depend on the extension of the guidelines where they set conditions for a kind that the `kinds` of that extension's schema add.
- The refusal names each such reference and each such kind by the file of the project's extension of the schema and the JSON Pointer to that reference or kind.

## s-7unxytshhc4md54 — Setting a repository up and taking SpecSheriff out of it

- it turns the hooks on by setting git's `core.hooksPath` to `.githooks`, and says how to set `core.hooksPath` where it cannot set it.
- The draft rule's `TextRule.list` (§s-eferktypcj7njt5) lists `push` (§s-b6qdtghnyha3fhk).
- It leaves as it is any other hook or declaration that differs from what it would write, and any `.claude/settings.json` or `.codex/hooks.json` that is not JSON, and names each.
- Where the repository's hooks previously ran from elsewhere, from `.git/hooks/` or from another folder that `core.hooksPath` named, `sheriff init` names each hook found there, apart from git's samples.
- It names each folder `.githooks/<hook>.d/` that it leaves, and says that the project's own tools in that folder (§s-n4m5zvh96yb299p) no longer run.
- Without the union merge, git reports a conflict in that file.

## proposal:s-gb8s9657a65hqmv-g6 — What `sheriff reindex` changes in what an earlier release wrote

- The name of a kind of node is also changed in each of these places:
- where `specs/_approvals.jsonl` already exists, the lines of `specs/_confirmations.jsonl`, with `owner` renamed to `by`, are appended to it, and `specs/_confirmations.jsonl` is removed;
- where `sheriff.config.json` holds no entry that sets the specification's approval status, a draft rule of `project.json` that refines the rule on that status is moved to the archive with the reason "The specification's approval status is recorded in `sheriff.config.json`" if it was ever approved, and is deleted otherwise (§s-f2b5zvc565s242f);
- in the run that archives or deletes a rule of `project.json` that refines the rule on the specification's approval status, whether that rule is approved or a draft, where `project.json` is left holding no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added under the top node of `project.json`;

## proposal:s-7pk89t8z6wymmj9-g6 — How a project's own check is run

- At a commit, that directory holds what the commit contains (§s-477gtdrkw34dzxw).
