# T25, stage 2, group 2: draft the nodes of items 20 to 26

You draft the new wordings of the nodes of the appendix of the SpecSheriff tools that items 20 to 26 cover in the order of the review. The order is in `D:/SpecSheriff/.ai_docs/t25-pass/stage2-inventory.md`, section "Proposed order of the review". These nodes describe the review of a commit and who runs the reviewer, the SpecTag and how a symbol carries it, the SpecTags on the system's code and on the tests, and the bindings file. They implement rows 10.1.25a, 10.1.26, 10.1.26a, 10.1.26b, 10.1.28, 10.1.31, 10.1.43 and 10.1.43a of the main table of checks. Item 26 asks whether row 10.1.26b gets a new node or a part of an existing one.

The owner will see all these nodes on one page and agree to the group with one answer. So every draft must be final: each node is reviewed by specsheriff-rule-reviewer after you, and read by EngStickler's readers, before the owner sees it. The owner must never see a draft that is still open to change. A wording is final only when it states what the SpecSheriff tools must do, is consistent with the whole specification, and leaves to the owner only the questions that no rule, ruling or code can settle.

Group 1 took six rounds of review. Most of its findings were of a few kinds, listed under "Lessons from group 1" below. Get them right in the first draft.

## What to read first

1. `D:/SpecSheriff/CLAUDE.md` and `D:/SpecSheriff/docs/principles.md`.
2. The rules on how a rule is written: the last section of `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json` (the new form of the guidelines), which `node D:/SpecSheriff/.claude/vt/writing-rules.mjs` prints as a checklist. Also read the rules in `D:/SpecSheriff/.claude/vt/rules.md` from "A proposal is based on the owner's earlier rulings on its subject" onward.
3. `stage2-inventory.md`: the opening sections ("How to read this file", "Questions that affect many nodes", "Open problems in the new form…", "The targets of the links"), and the entry of each node of the group.
4. The new form: `moved/specs/_guidelines/spec.json` (table 10.1 is in section 10; the SpecTag is defined in rule 9.3), the extensions under `moved/specs/_guidelines/extensions/`, and `moved/impl.json`, which maps each row of a table of checks to the nodes of the appendix that implement it.
5. The current appendix, `D:/SpecSheriff/specs/_guidelines/tools.json`, for the current wording of each node.
6. The agreed drafts in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`: items 1 to 8, and group 1 (items 9 to 19), which the owner agreed to on 2026-11-24. They are the model for the format, the style and the level of detail. Every agreed draft is binding on you: never change one, and cite it where your node relies on it.
7. `D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md`: its section "Changes still to be made to nodes and files outside the group" names changes that may fall into group 2. Its rounds b to f show which findings the reviewers raised and how each was settled.
8. The owner's rulings: search the long file `D:/SpecSheriff/.ai_docs/t25-one-thought.md`, by sid and by title, for every sid of the group and for the rows that each node implements. Its sections "Settled with the owner" and "Found and owed" also apply to this group. Read the `meta.decisions` of each row the node implements.
9. The code that makes each check, in `D:/SpecSheriff/skills/tools/src/` (the reviewer's runner, the SpecTag parser, the binding checks), and the tests of that code. A draft says what the code must do. Where the code does something else, the draft follows the rules and the rulings, and your notes say what must change in stage 3.

## How to draft

- Each node of a check opens with what the command refuses and what the refusal message names, as the agreed drafts do.
- Each node has an `implements` link to each row whose check it makes, not to the whole table.
- Where a node holds two separate requirements, split it into nodes within its section, as the rule "A node is split within its section without asking" says. A new node gets a new sid: 15 characters from `23456789abcdefghjkmnpqrstuvwxyz` after `s-`, checked to be unique across `specs/`, `moved/` and `tools-drafts.json`.
- Propose an example wherever a reader, especially an agent, would still ask what the rule looks like in practice. The example shows the rule as the text states it, and its "most likely mistake" is a mistake the text forbids.
- What a decision has already settled, such as a renamed command (`sheriff commit-message`, `sheriff json`, `sheriff markdown`, `sheriff map`) or a removed term ("the base"), is carried out without asking the owner.
- Settle every question that the specification, the owner's rulings or the code can settle, and say in your notes how you settled it.
- A change to a node the owner has already agreed to, outside the appendix of the tools, is written as a proposal: one complete new wording, with a list in Russian of what changed and why. A sentence of that node that breaks a rule on how a node is written is brought into line inside the same proposal, never raised as a separate question.
- Never touch any node outside the group, in `specs/` or in the drafts. A change that a node outside the group needs goes into your notes.

## Lessons from group 1

- **Citations (rule 7.2.7).** At its first use in a node, every word that takes its meaning from the specification cites the node that defines it, with a `cites` link: term (rule 3.3), a project's own kind (rule 8.3), approval status (rule 1.3.1), an extension of the guidelines (rule 1.7.1), SpecTag (rule 9.3), and so on. Look each sid up; never recall one.
- **The reason.** It says why the rule exists, in as few sentences as that takes, and passes the pairing test: each of its sentences answers to the text, and none repeats the text.
- **One check, one node.** A link whose target is not a node is refused only by "The target of a link" (s-c4rn9fj4czk768b). A node that checks links of one type checks only links whose target is a node of the model of the specification, and says so.
- **Pointing back.** A phrase such as "any other link" or "it" refers only to something named in the same paragraph.
- **Phrases the owner's English uses.** "refuses", "refused" and "refusal" for what a check does. "The most likely mistake" in examples. "top-level node" of a file. "the files that the repository keeps". "including X", never "X included". "is in force" for an approval, never "stands for" or "a standing approval". "the section on the stack".
- **Russian.** `ru` renders the English completely, by meaning. Every `change` is in Russian. Use the owner's renderings in `C:/Users/PC/.claude/skills/vt/terms-ru.md`.

## What to write

1. `D:/SpecSheriff/.ai_docs/t25-pass/propose-group2.mjs`, a script that copies `tools-drafts.json` to `tools-drafts.before-group2.json` and then writes a draft for each node of the group into `tools-drafts.json`, with the same fields as the agreed drafts. Look at the existing entries of group 1 for the exact field names: `location`, `sidValue`, `testsFrom`, `proposal` with `title`, `ruTitle`, `parts` (each with `kind`, `en`, `ru` and `change`), the reason and its Russian rendering, `examples` if any, `links`, and `stage3`. A new node's key is `new:<short name>`. Run the script twice and check that it gives the same file both times.
2. `D:/SpecSheriff/.ai_docs/t25-pass/group2-notes.md`, in English:
   - for each node: its key, its title, the rows it implements, how you settled each question you settled, and what must change in the code in stage 3;
   - the questions that only the owner can answer, each with the options in terms of what a person sees, what each costs and your recommendation. Keep this list as short as the rules allow;
   - the changes still to be made to nodes outside the group.
3. `D:/SpecSheriff/.ai_docs/t25-pass/english-group2.md`: the final English of every node of the group, each under its key and title, with its title, text, reason and examples, for EngStickler's readers.

Do not change anything under `specs/`, and do not touch `D:/SpecSheriff/.ai_docs/INDEX.md`, `tasks.md` or `t25-one-thought.md`.

## Your final report

Short, in English: the keys and titles of the drafts written, how many questions are left for the owner, and anything you could not settle. The main session will send each draft to specsheriff-rule-reviewer and send you the reports to act on, so keep your notes current.
