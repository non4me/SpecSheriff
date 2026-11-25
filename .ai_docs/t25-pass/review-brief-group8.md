# T25, stage 2, group 8: the review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What the drafts are

Group 8 covers items 57 to 63 of the order of the review in `D:/SpecSheriff/.ai_docs/t25-pass/stage2-inventory.md`, the last group of stage 2. Its nodes belong to the appendix of the tools. They describe:
- the hooks: their list, the pre-commit hook, the comparison of the working tree with what a push sends, turning the git hooks on and asking for the reviewer's settings when a session starts, and the agent's hook after an edit;
- an edit judged before it is made (`sheriff guard`);
- the agent's hooks for Codex CLI;
- a git hook that runs the SpecSheriff tools that a plugin keeps on the machine, and the project's own tools in a git hook;
- the plugins for Claude Code and for Codex CLI, and the skills of the SpecSheriff plugins.

The group also holds `proposal:row-10-1-37b`, a new row of the main table of checks that the agreed row 10.1.37a promised.

All drafts are in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, under the keys that your input file names. Your input file shows each draft's English text, reason, examples and outgoing links, beside the node's current or agreed wording. The Russian rendering and the list of changes of each draft are in `tools-drafts.json`, in the fields `ru`, `ruTitle`, `ruReason` and `change`. The author's notes are in `group8-notes.md`.

The specification is being moved into a new form, kept in `D:/SpecSheriff/.ai_docs/t25-pass/moved/` until the review ends: `moved/specs/_guidelines/spec.json`, the base of the guidelines, with every rule on the hooks, the plugins, the reviewer and the agent's edits; the extensions under `moved/specs/_guidelines/extensions/`; and `moved/impl.json`. The current appendix is `D:/SpecSheriff/specs/_guidelines/tools.json`. The drafts of items 1 to 56 in `tools-drafts.json`, which the owner agreed to by 2026-11-25, are binding: a draft that contradicts one is wrong. A proposal key with a `base` holds a newer agreed wording of the draft that `base` names, and that newer wording is the one in force.

Task T28 will move each approval into the node that it approves. Task T29 will move the owner's viewer into the plugin and add the command that draws the diagram of the domains. A finding that only anticipates T28 or T29 is not a finding.

## How to review

Read first:
- `D:/SpecSheriff/CLAUDE.md` and `D:/SpecSheriff/docs/principles.md`;
- `D:/SpecSheriff/.claude/vt/rules.md`, from "How a rule is proposed and worded" to the end;
- the last section of `moved/specs/_guidelines/spec.json`, on how a rule is written.

Then, for each draft:
- Run `node .claude/vt/writing-rules.mjs` in `D:/SpecSheriff` once, and give a verdict line for each rule it prints, applied to the whole node: ✓, or ✗ with the words that breach it.
- Assess the draft against the five criteria of the rule "Every wording is assessed against the whole specification before it is shown". Search `specs/`, `moved/` and `tools-drafts.json` for each term and concept the draft uses, and read each node found. Do not rely on memory.
- Search the owner's rulings on the draft's subject: `D:/SpecSheriff/.ai_docs/t25-one-thought.md` (search it by sid and by title), the `meta.decisions` of each node concerned, and the `change` fields of the drafts. A finding that an earlier ruling settles is not a finding: cite the ruling.
- Check the code (`D:/SpecSheriff/skills/tools/src/`, the hook scripts under `D:/SpecSheriff/skills/claude-code/` and `D:/SpecSheriff/skills/codex/`, and `.githooks/`) only to see whether the draft states what the SpecSheriff tools must do. Where the code does something else, the draft wins, and the author's notes must say what changes in stage 3.
- Check that the Russian rendering says everything the English says, with every nuance, and nothing more.
- Check each term against the vocabularies of the skill `specsheriff-terminology-review`. If the Skill tool cannot load it, read its SKILL.md from `C:/Users/PC/.claude/skills/synced/`.
- Check that each word that takes its meaning from the specification cites, at its first use in the node, the node that defines it, and that a link backs each citation.

## Points to look at

The author settled these, and a reviewer may read the rules otherwise. Say for each that falls in your input whether the author's reading holds. Where it does not, say whether the rules and rulings settle the point another way, or whether only the owner can answer it:
- "The hooks" is split into six nodes, and the old sid stays with the list of the hooks, which now implements rule 10.2.
- The pre-commit hook follows the order of rule 10.12 and stages nothing, under the owner's ruling of 2026-10-31. The project's own tools that rewrite files may stage their own output.
- Where Node.js is missing, the approved node refused the commit; the draft lets it through, as rule 10.12 says for tools that cannot run.
- A push compares the working tree only with the commits that the tests judge.
- The hooks run `sheriff markdown` and `sheriff map` only where the project has chosen the Views extension, as the owner ruled on 2026-11-25.
- `proposal:row-10-1-37b` adds a row to the main table of checks, which belongs to the base specification. Say whether the agreed row 10.1.37a commits the owner to this row, so that it carries out a decision already made, or whether it is a change to the base specification that the owner's rule "One part at a time" keeps until stage 2 is done.
- The skills of both plugins move into one node, which adds `spec-settings`.
- The author lists four questions for the base specification in `group8-notes.md`. Say whether any draft in your input cannot be final until one of them is answered.

## Your report

In English, except for the «Оценка» blocks, which are in Russian. Keep it short. For each draft, give:
- its key and title, and the verdict: **ready**, or **not ready**;
- each finding: the words concerned, what is wrong, and the fix in the exact words to apply, in English and, where the Russian changes, in Russian. Mark each finding as one the author can fix, or as a question only the owner can answer, with the reason;
- every verdict line of the checklist;
- its «Оценка» block in Russian, with one line per criterion: согласованность, целостность, целесообразность, избыточность, недостаточность.

End with a list of the findings that only the owner can answer, if any.
