# T25, group 6, round e: the English sentences that changed

This file holds only the English sentences of group 6 that round e changed, as `tools-drafts.json` holds them after fix-group6-e.mjs. Each sentence is given under the key of its node in `tools-drafts.json`, with the node's title.
fix-group6-e.mjs writes this file; edit the script, not this file.

## s-v4qus7raqnwzneb — How an approval is recorded

- A node's last approval is the latest line for the node's sid and the fingerprint of its current wording, if that line is an approval.
- Otherwise, a node's last approval is the latest line for the node's sid that is an approval, whether or not a later line withdraws that approval.

## new:tools-11-withdraw — Withdrawing the approval of a node

- For each approval of a wording (§s-5ah25f6gy99panq) of such a node, if that approval is in force, whether or not the node still holds that wording, the command appends to `specs/_approvals.jsonl` a line that withdraws that approval (§s-v4qus7raqnwzneb).

## new:tools-2-entries — The entries of the settings that only an owner changes

- The entries keep every change that an owner has made to the settings that only an owner of the specification changes, each with the email address of the owner who made it, but only the last entry of each list sets the value of its setting.

## new:tools-2-approve-spec — Approving the specification

- The refusal names what the refusal to turn the flag on names in that case.

## new:tools-2-strict — Turning the `strict` flag on

- the check for code and tests outside the commit (§s-3xx2eukc8gtd2tx) that no SpecTag (§s-8xw4mgvpexyvw5q) binds: it would refuse where `sheriff untagged` (§s-weuyx98r7c923ab) would list anything, and the refusal to turn the flag on names `sheriff untagged`;
- each of the project's own checks (§s-2fau85dfyyeq66m), any of which a rule of the project's own guidelines (§s-u7tw6m8npxmv5tu) may make stricter (§s-q3pfzyaxvpr2zj2): such a check would refuse where `sheriff validate --strict` would refuse because of that check (§s-7pk89t8z6wymmj9), and the refusal to turn the flag on names `sheriff validate --strict`.

## new:tools-2-extension-off — Withdrawing the choice of an extension

- A reference in the project's extension of the schema (§s-xm8rz4uupb73gu5) depends on the extension of the guidelines where the reference points to a definition that the `$defs` of the schema of that extension of the guidelines add (§s-xzcw3hv4hmxz7h7).
- The `fields` of the project's extension of the schema depend on the extension of the guidelines where they set conditions for a kind that the `kinds` of the schema of that extension of the guidelines add.

## s-7unxytshhc4md54 — Setting a repository up and taking SpecSheriff out of it

- Where the repository's hooks previously ran from elsewhere, that is, from `.git/hooks/` or from another folder that `core.hooksPath` pointed to, `sheriff init` names each hook found there, apart from git's sample hooks.
- It names each folder `.githooks/<hook>.d/` that it leaves in place, and says that the project's own tools in that folder (§s-n4m5zvh96yb299p) no longer run.
- Without the union merge, git would report a conflict in that file.

## proposal:s-gb8s9657a65hqmv-g6 — What `sheriff reindex` changes in what an earlier release wrote

- in the run that archives or deletes a rule of `project.json` that refines the rule on the specification's approval status, whether the archived or deleted rule is approved or a draft, where `project.json` is left holding no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added under the top node of `project.json`;
