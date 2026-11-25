# T25, stage 2, group 6: round b, the findings to apply

The first review found the section node ready and the other eleven drafts close to it. Its six reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`:
- the reviewers' reports `review-g6-a.md`, `review-g6-b.md`, `review-g6-c.md` and `review-g6-d.md`;
- the readers' reports `english-g6-fast.md` and `english-g6-thorough.md`.

Apply every finding that a report marks as one the author can fix, nits and cuts included, and every finding of the readers that a careful native writer would accept and that no earlier round rejected for a reason that holds. Use `fix-group6-b.mjs`, idempotent from a backup `tools-drafts.before-group6-b.json` that it makes on its first run, as in groups 4 and 5. Add a "Round b" section to `group6-notes.md`, placed first, that says for each finding what was done or why it was rejected. Then write `english-group6b.md`, the English of every changed node, in the format of `english-group6.md`. Do not touch `.ai_docs/INDEX.md` or anything under `specs/`.

## The points the reviewers left open, and how they are settled

None of them goes to the owner now. Each is settled by an agreed rule, or belongs to the base specification, which the review of this part does not change: under the owner's rule "One part at a time", a change that another part needs is recorded and taken up after this part is done. The main session records those in the continuation file.

- **Review b, finding 7: the bindings file.** Rule 10.6 asks for the checks of the whole specification and all of the code before an approval, and the bindings file binds code to the specification. Add it to the list of what the one commit adds, with a `cites` link to s-trwczfskj5zmuft.
- **Review b, finding 9: an archived node of an extension's kind, and a reference from the project's extension of the schema to the extension's `$defs`.** The reviewer reports that the example of rule 1.7.6 warns against exactly this failure, so rule 1.7.6 already covers it. Add both cases to what a withdrawal is refused for. Name an archived node by its file and its location, since it has no sid, and name a reference by the file of the project's schema and the JSON Pointer of the reference.
- **Review c, finding 1: no rule of the base asks for a way to take the method out.** This is a gap of the base specification, not of the draft. Keep `sheriff init` and `sheriff remove` in one node, as you did. The main session records the gap, for a rule of the base to be proposed after the appendix of the tools is done.
- **Review c, finding 4: the hint about `testCommand`.** Once the rule that `sheriff init` writes is approved, every push is refused until `testCommand` is set. State in the node that `sheriff init` says how to set `testCommand` where `sheriff.config.json` has none, so that the code's hint has a rule.
- **Review a, F4: whether a node's kind is part of its fingerprint.** The fingerprint implements rule 1.3.5, which says what a wording is. Follow rule 1.3.5 as it is agreed, and say in the node's `stage3` or notes which reading of 1.3.5 the draft follows. The main session records the question for the base.
- **Review a, W4: whether withdrawing a `TableRule`'s approval withdraws the approvals of the nodes in its cells.** The reviewer reports that rule 1.3.7 supports your reading that it does not. State it in the node, so that a reader does not have to infer it, and give the way to withdraw a cell's node: name that node. The main session records the asymmetry with rule 1.3.4 for the base.

## Other guidance

- **Review c, finding 3 on the proposal on `sheriff reindex`:** remove a draft rule of `project.json` that refines the rule on the approval status, as the reviewer words it. The owner's ruling of 2026-11-13 and the rule "What a decision removes or renames is removed or renamed without asking again" settle it.
- **Review d's cuts:** make them. A sentence that says what no rule requires is cut, as the owner's rule "What no rule requires is not proposed" says. Record in item 5 of your list the paragraph of s-chsfpkgpmfk4fft that goes when that node next changes.
- **"makes a check" and "runs a check":** the agreed drafts write "makes this check" for what a command does, so keep it there. Where one sentence uses "makes" twice in two senses, as in "makes the checks that the flag makes stricter", write "runs the checks".
- **Every reader's finding on "every other", "the same X" with nothing to compare it with, a verb left without its object, and a participle that attaches to the wrong noun** is to be applied, as your brief's lessons say.

Report, as your final message: the keys you changed, the findings you rejected and why, and any question that, in your judgement, only the owner can answer, with the rule or ruling you checked it against.
