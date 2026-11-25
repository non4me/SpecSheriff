# T25, stage 2, group 3: draft the nodes of items 27 to 32

You draft the new wordings of the nodes of the appendix of the SpecSheriff tools that items 27 to 32 cover in the order of the review. The order is in `D:/SpecSheriff/.ai_docs/t25-pass/stage2-inventory.md`, section "Proposed order of the review". The items are:

- 27: "From a draft to an approved specification, and back" (s-j9r8z4xdrfkfs47), row 10.1.27;
- 28: nodes for rows 10.1.27a (s-y5w6xwvwh857azx), 10.1.27b (s-dxzq5rd6eeteza4) and 10.1.27c (s-j5qmmdq4m26mdvw), which no node of the appendix implements yet;
- 29: "The symbols a commit changes" (s-2x58az67bm6cxq2), row 10.1.28a;
- 30: "A node's `meta.code` and `meta.tests`" (s-t383grkn3q68dpf), row 10.1.34;
- 31: "A list and its declaration" (s-5hb9k2e34dgn284), row 10.1.35;
- 32: "An object in a list" (s-cdachayybfvg4na), row 10.1.36.

The owner will see all these nodes on one page and agree to the group with one answer. So every draft must be final: each node is reviewed by specsheriff-rule-reviewer after you, and read by EngStickler's readers, before the owner sees it. The owner must never see a draft that is still open to change. A wording is final only when it states what the SpecSheriff tools must do, is consistent with the whole specification, and leaves to the owner only the questions that no rule, ruling or code can settle.

Group 1 took six rounds of review and group 2 took four. Most of their findings were of a few kinds, listed under "Lessons from groups 1 and 2" below. Get them right in the first draft.

## What to read first

1. `D:/SpecSheriff/CLAUDE.md` and `D:/SpecSheriff/docs/principles.md`.
2. The rules on how a rule is written: the last section of `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json` (the new form of the guidelines), which `node D:/SpecSheriff/.claude/vt/writing-rules.mjs` prints as a checklist. Also read the rules in `D:/SpecSheriff/.claude/vt/rules.md` from "A proposal is based on the owner's earlier rulings on its subject" onward.
3. `stage2-inventory.md`: the opening sections ("How to read this file", "Questions that affect many nodes", "Open problems in the new form…", "The targets of the links"), and the entry of each node of the group. Open problem P1 concerns item 31: find how the owner's rulings settled it before you draft.
4. The new form: `moved/specs/_guidelines/spec.json` (table 10.1 is in section 10; the approval status is rule 10.6, the `strict` flag rule 10.7), the extensions under `moved/specs/_guidelines/extensions/`, and `moved/impl.json`, which maps each row of a table of checks to the nodes of the appendix that implement it.
5. The current appendix, `D:/SpecSheriff/specs/_guidelines/tools.json`, for the current wording of each node.
6. The agreed drafts in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`: items 1 to 8, group 1 (items 9 to 19) and group 2 (items 20 to 26), which the owner agreed to on 2026-11-24. They are the model for the format, the style and the level of detail. Every agreed draft is binding on you: never change one, and cite it where your node relies on it. Rely on group 2's drafts for what a rule is, the forms of a SpecTag, a file bound as a whole and the bindings file.
7. The section "Changes still to be made to nodes and files outside the group" of both `group1-notes.md` and `group2-notes.md`. Several of its items fall into group 3: in `group2-notes.md`, items 1 (item 27), 2 (item 29), 6 (item 30) and the row 10.1.28a entry of item 18. Make each of those changes, and say in your notes how you made it.
8. The owner's rulings: search the long file `D:/SpecSheriff/.ai_docs/t25-one-thought.md`, by sid and by title, for every sid of the group and for the rows that each node implements. Its sections "Settled with the owner" and "Found and owed" also apply to this group. Read the `meta.decisions` of each row the node implements, and of rules 9.4, 9.5, 10.6 and 10.7 and of "Configuring extensions" (s-9ttvcwpqkehm58g).
9. The code that makes each check, in `D:/SpecSheriff/skills/tools/src/` (`approve.ts`, `approvals.ts`, `binding.ts`, `model.ts` and the code that finds the symbols a commit changes), and the tests of that code. A draft says what the code must do. Where the code does something else, the draft follows the rules and the rulings, and your notes say what must change in stage 3.

## How to draft

- Each node of a check opens with what the command refuses and what the refusal message names, as the agreed drafts do.
- Each node has an `implements` link to each row whose check it makes, not to the whole table.
- Where a node holds two separate requirements, split it into nodes within its section, as the rule "A node is split within its section without asking" says. A new node gets a new sid: 15 characters from `23456789abcdefghjkmnpqrstuvwxyz` after `s-`, checked to be unique across `specs/`, `moved/` and `tools-drafts.json`.
- Propose an example wherever a reader, especially an agent, would still ask what the rule looks like in practice. The example shows the rule as the text states it, and its "most likely mistake" is a mistake the text forbids.
- What a decision has already settled, such as a renamed command (`sheriff commit-message`, `sheriff json`, `sheriff markdown`, `sheriff map`) or a removed term ("the base"), is carried out without asking the owner.
- Settle every question that the specification, the owner's rulings or the code can settle, and say in your notes how you settled it.
- A change to a node the owner has already agreed to, outside the appendix of the tools, is written as a proposal: one complete new wording, with a list in Russian of what changed and why. A sentence of that node that breaks a rule on how a node is written is brought into line inside the same proposal, never raised as a separate question.
- Never touch any node outside the group, in `specs/` or in the drafts. A change that a node outside the group needs goes into your notes.

## Lessons from groups 1 and 2

- **A question for the owner is checked against the rulings first.** Both of group 2's questions turned out to be settled by earlier rulings: those of 2026-11-17 on rows 10.1.26 and 10.1.26a, and those of 2026-11-19 and 2026-11-20 on rules 1.6.1, 10.2 and 10.5 and row 10.1.43a. Each cost a round of review before it was dropped. Before you write a question, search the continuation file and the `meta.decisions` of every node concerned. Under `vt`'s rules, a question that a stated principle or ruling already decides is not asked.
- **Draft or approved.** Each node of a check says whether its check runs while the specification is a draft, and cites the ruling or the row that says so.
- **Citations (rule 7.2.7).** At its first use in a node, every word that takes its meaning from the specification cites the node that defines it, with a `cites` link: term (rule 3.3), a project's own kind (rule 8.3), approval status (rule 10.6), the `strict` flag (rule 10.7), an extension of the guidelines (rule 1.7.1), SpecTag (rule 9.3), symbol and the bindings file (rule 1.5.2), and so on. Look each sid up; never recall one.
- **The reason.** It says why the rule exists, in as few sentences as that takes, and passes the pairing test: each of its sentences answers to the text, and none repeats the text.
- **One check, one node.** A link whose target is not a node is refused only by "The target of a link" (s-c4rn9fj4czk768b). A SpecTag whose sid names no node is refused only by "A SpecTag that names no node". A node that checks one kind of thing says so, and leaves the rest to the node that checks it.
- **Pointing back.** A phrase such as "any other link", "it" or "that model" refers only to something named in the same paragraph.
- **Phrases the owner's English uses.** "refuses", "refused" and "refusal" for what a check does. "The most likely mistake" in examples. "top-level node" of a file. "the files that the repository keeps". "including X", never "X included". "is in force" for an approval, never "stands for" or "a standing approval". "the commit message". A SpecTag "is placed" somewhere, never "stands". "Code other than tests", never "outside its tests". "conforms to the schema". "credentials", never "sign-in".
- **Russian.** `ru` renders the English completely, by meaning. Every `change` is in Russian. Use the owner's renderings in `C:/Users/PC/.claude/skills/vt/terms-ru.md`. Also: «у X есть SpecTag», never «несёт»; «ревью» for the review and «рецензент» for the reviewer; «замечание» for a finding; «отвергает» for what a command refuses.

## What to write

1. `D:/SpecSheriff/.ai_docs/t25-pass/propose-group3.mjs`, a script that copies `tools-drafts.json` to `tools-drafts.before-group3.json` and then writes a draft for each node of the group into `tools-drafts.json`, with the same fields as the agreed drafts. Look at the existing entries of groups 1 and 2 for the exact field names. A new node's key is `new:<short name>`. Run the script twice and check that it gives the same file both times, and that no key outside the group differs from the copy.
2. `D:/SpecSheriff/.ai_docs/t25-pass/group3-notes.md`, in English:
   - for each node: its key, its title, the rows it implements, how you settled each question you settled, and what must change in the code in stage 3;
   - the questions that only the owner can answer, each with the options in terms of what a person sees, what each costs and your recommendation. Keep this list as short as the rules allow;
   - the changes still to be made to nodes outside the group.
3. `D:/SpecSheriff/.ai_docs/t25-pass/english-group3.md`: the final English of every node of the group, each under its key and title, with its title, text, reason and examples, for EngStickler's readers.

Do not change anything under `specs/`, and do not touch `D:/SpecSheriff/.ai_docs/INDEX.md`, `tasks.md` or `t25-one-thought.md`.

## Your final report

Short, in English: the keys and titles of the drafts written, how many questions are left for the owner, and anything you could not settle. The main session will send each draft to specsheriff-rule-reviewer and send you the reports to act on, so keep your notes current.
