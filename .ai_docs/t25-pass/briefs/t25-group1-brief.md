# T25, stage 2, group 1: draft the nodes of items 9 to 19

You draft the new wordings of the nodes of the appendix of the SpecSheriff tools that items 9 to 19 cover in the order of the review. The order is in `D:/SpecSheriff/.ai_docs/t25-pass/stage2-inventory.md`, section "Proposed order of the review". These nodes describe the checks that `sheriff validate` makes for rows 10.1.5 to 10.1.25 of the main table of checks, and for rows 11.3.1 to 11.3.3 and 12.12.14 of the tables of the Domains and RecordType extensions. Item 17 is a new node for row 10.1.20a.

The owner will see all these nodes on one page and agree to the group with one answer. So every draft must be final: each node is reviewed by specsheriff-rule-reviewer after you, and read by EngStickler's readers, before the owner sees it. The owner must never see a draft that is still open to change. A wording is final only when it states what the SpecSheriff tools must do, is consistent with the whole specification, and leaves to the owner only the questions that no rule, ruling or code can settle.

## What to read first

1. `D:/SpecSheriff/CLAUDE.md` and `D:/SpecSheriff/docs/principles.md`.
2. The rules on how a rule is written: the last section of `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json` (the new form of the guidelines), and the rules in `D:/SpecSheriff/.claude/vt/rules.md` from "A proposal is based on the owner's earlier rulings on its subject" onward.
3. `stage2-inventory.md`: the opening sections ("How to read this file", "Questions that affect many nodes", "Open problems in the new form…", "The targets of the links"), and the entry of each node of the group.
4. The new form: `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json` (table 10.1 is in section 10), `extensions/domains.json` (table 11.3), `extensions/recordtype.json` (table 12.12), and `moved/impl.json`, which maps each row of a table of checks to the nodes of the appendix that implement it.
5. The current appendix, `D:/SpecSheriff/specs/_guidelines/tools.json`, for the current wording of each node.
6. The agreed drafts of items 1 to 8 in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, above all `s-7zqsstgnuc772ba` and `s-vke5hakwf3uyrjs`. They are the model for the format, the style and the level of detail. Every agreed draft is binding on you: never change one, and cite it where your node relies on it.
7. The owner's rulings: search the long file `D:/SpecSheriff/.ai_docs/t25-one-thought.md`, by sid and by title, for every sid of the group and for the rows that each node implements. The file's paragraphs at lines 54–61 list the changes still to be made to nodes of this group. Its sections "Settled with the owner" and "Found and owed" also apply to this group. Read the `meta.decisions` of each row the node implements.
8. The code that makes each check, in `D:/SpecSheriff/skills/tools/src/`, and the tests of that code. A draft says what the code must do. Where the code does something else, the draft follows the rules and the rulings, and your notes say what must change in stage 3.

## How to draft

- Each node opens with what `sheriff validate` refuses and what the refusal message names, as the agreed drafts do.
- Each node has an `implements` link to each row whose check it makes, not to the whole table.
- Where a node holds two separate requirements, split it into nodes within its section, as the rule "A node is split within its section without asking" says. A new node gets a new sid: 15 characters from `23456789abcdefghjkmnpqrstuvwxyz` after `s-`, checked to be unique across `specs/`, `moved/` and `tools-drafts.json`.
- Propose an example wherever a reader, especially an agent, would still ask what the rule looks like in practice.
- What a decision has already settled, such as a renamed command (`sheriff commit-message`, `sheriff json`, `sheriff markdown`, `sheriff map`) or a removed term ("the base"), is carried out without asking the owner.
- Settle every question that the specification, the owner's rulings or the code can settle, and say in your notes how you settled it.
- Never touch any node outside the group, in `specs/` or in the drafts. A change that a node outside the group needs goes into your notes.

## What to write

1. `D:/SpecSheriff/.ai_docs/t25-pass/propose-group1.mjs`, a script that copies `tools-drafts.json` to `tools-drafts.before-group1.json` and then writes a draft for each node of the group into `tools-drafts.json`, with the same fields as the agreed drafts: `location`, `sidValue`, `testsFrom`, and `proposal` with `title`, `ruTitle`, `parts` (each with `kind`, `en`, `ru` and `change`), `reason` and its Russian rendering, `examples` if any, `links`. Look at the existing entries for the exact field names. A new node's key is `new:<short name>`. `ru` is the Russian rendering, as complete as the English. `change` says in Russian what changed compared with the current wording and why, or that the part is new. Run the script.
2. `D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md`, in English:
   - for each node: its key, its title, the rows it implements, how you settled each question you settled, and what must change in the code in stage 3;
   - the questions that only the owner can answer, each with the options, what each costs and your recommendation. Keep this list as short as the rules allow;
   - the changes still to be made to nodes outside the group.

Do not change anything under `specs/`, and do not touch `D:/SpecSheriff/.ai_docs/INDEX.md`.

## Your final report

Short, in English: the keys and titles of the drafts written, how many questions are left for the owner, and anything you could not settle. The main session will send each draft to specsheriff-rule-reviewer and send you the reports to act on, so keep your notes current.
