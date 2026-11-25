# T25, stage 2, group 4: draft the nodes of items 33 to 40

You draft the new wordings of the nodes of the appendix of the SpecSheriff tools that items 33 to 40 cover in the order of the review. The order is in `D:/SpecSheriff/.ai_docs/t25-pass/stage2-inventory.md`, section "Proposed order of the review". The items are:

- 33: "How a project's own check is run" (s-7pk89t8z6wymmj9), row 10.1.37;
- 34: "Citing a node only by its sid" (s-nh8b2hjvzasdxmd), row 10.1.38;
- 35: "A citation outside the specification" (s-m8nmfsxkcfu7cjp), row 10.1.39;
- 36: "Generated copies against the nodes" (s-dbk2vyeg8z5jxna), row 10.1.39a, and a node for row 10.1.39b (s-f8fmudceuyaj942);
- 37: "A node whose tests or code lag behind it" (s-txbwsthdqhvyzd2), row 10.1.40;
- 38: "An approved node without code or a test" (s-jgejd5rpd9d43pd), row 10.1.41;
- 39: "A commit message names the nodes its code implements" (s-qqs2svksmjct753), row 10.1.42;
- 40: "The tests, run before a push" (s-b6qdtghnyha3fhk), row 10.1.44.

The owner will see all these nodes on one page and agree to the group with one answer. So every draft must be final: each node is reviewed by specsheriff-rule-reviewer after you, and read by EngStickler's readers, before the owner sees it. The owner must never see a draft that is still open to change. A wording is final only when it states what the SpecSheriff tools must do, is consistent with the whole specification, and leaves to the owner only the questions that no rule, ruling or code can settle.

Group 1 took six rounds of review, group 2 four and group 3 eight. Most of their findings were of a few kinds, listed under "Lessons from groups 1 to 3" below. Get them right in the first draft.

## What to read first

1. `D:/SpecSheriff/CLAUDE.md` and `D:/SpecSheriff/docs/principles.md`. The principle "Deterministic checks hold every participant to the contract" changed on 2026-11-24: the reviewer also judges each comment that a commit adds or changes, and a finding about a comment is only a warning.
2. The rules on how a rule is written: the last section of `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`, which `node D:/SpecSheriff/.claude/vt/writing-rules.mjs` prints as a checklist. Also read the rules in `D:/SpecSheriff/.claude/vt/rules.md` from "A proposal is based on the owner's earlier rulings on its subject" onward.
3. `stage2-inventory.md`: the opening sections ("How to read this file", "Questions that affect many nodes", "Open problems in the new form…", "The targets of the links"), and the entry of each node of the group.
4. The new form: `moved/specs/_guidelines/spec.json` (table 10.1 is in section 10), the extensions under `moved/specs/_guidelines/extensions/`, and `moved/impl.json`, which maps each row of a table of checks to the nodes of the appendix that implement it.
5. The current appendix, `D:/SpecSheriff/specs/_guidelines/tools.json`, for the current wording of each node.
6. The agreed drafts in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`: items 1 to 8 and groups 1 to 3, which the owner agreed to on 2026-11-24. They are the model for the format, the style and the level of detail. Every agreed draft is binding on you: never change one, and cite it where your node relies on it.
   - A proposal key with a `base` holds a newer agreed wording of the draft named in `base`, and that newer wording is the one in force.
   - Group 3 defines several things that group 4 relies on: what a commit adds, changes and removes (`s-2x58az67bm6cxq2`); how two versions of code are compared, by syntax trees (`new:tools-7-2-changed-line`, s-u6mj5yv8ngnz79v); which edits change a test or code (the proposal on rule 9.4); the reviewer's judgement on comments; and rule 1.6.1, now split into s-m4h279nbaqkpa3t, s-5j9s5dstbawdd69 and s-x8uzc8z44pwtd3h (the tests).
7. The section "Changes still to be made to nodes and files outside the group" of `group1-notes.md`, `group2-notes.md` and `group3-notes.md`. Several of their items fall into group 4. Examples are group 2's items 3 (item 35), 4 (item 37), 5 (item 39) and 8 (item 33), and group 3's items on items 38 and 40. Make each change that falls into the group, and say in your notes how you made it.
8. The owner's rulings: search the long file `D:/SpecSheriff/.ai_docs/t25-one-thought.md`, by sid and by title, for every sid of the group and for the rows that each node implements. Its sections "Settled with the owner" and "Found and owed" also apply to this group. Read the `meta.decisions` of each row the node implements, and of the rules those rows check.
9. The code that makes each check, in `D:/SpecSheriff/skills/tools/src/`, and the tests of that code. A draft says what the code must do. Where the code does something else, the draft follows the rules and the rulings, and your notes say what must change in stage 3.

## How to draft

- Each node of a check opens with what the command refuses and what the refusal message names, as the agreed drafts do.
- Each node has an `implements` link to each row whose check it makes, not to the whole table.
- Where a node holds two separate requirements, split it into nodes within its section, as the rule "A node is split within its section without asking" says. A new node gets a new sid: 15 characters from `23456789abcdefghjkmnpqrstuvwxyz` after `s-`, checked to be unique across `specs/`, `moved/` and `tools-drafts.json`.
- Propose an example wherever a reader, especially an agent, would still ask what the rule looks like in practice. The example shows the rule as the text states it, and its "most likely mistake" is a mistake the text forbids.
- What a decision has already settled, such as a renamed command or a removed term, is carried out without asking the owner.
- Settle every question that the specification, the owner's rulings or the code can settle, and say in your notes how you settled it.
- A change to a node the owner has already agreed to, outside the appendix of the tools, is written as a proposal: one complete new wording, with a list in Russian of what changed and why. A sentence of that node that breaks a rule on how a node is written is brought into line inside the same proposal, never raised as a separate question. A change to an agreed draft in `tools-drafts.json` is a proposal with `base` set to that draft's key.
- Never touch any node outside the group, in `specs/` or in the drafts. A change that a node outside the group needs goes into your notes.

## Lessons from groups 1 to 3

- **Look for contradictions between agreed rules before you write a question.** Group 3's one real question, whether rewording a comment changes code, came from two agreed rules (1.5.2 and 9.4) that disagreed. It surfaced only in the third review. Before drafting, read every rule that your node relies on, and check whether any two of them disagree for the case your node covers.
- **A question for the owner is checked against the rulings first.** Search the continuation file and the `meta.decisions` of every node concerned. Under `vt`'s rules, a question that a stated principle or ruling already decides is not asked. In group 3 a reviewer's question on whether a commit that needs only the judgement on comments is refused was settled by the owner's ruling that such a check must not block.
- **Draft or approved.** Each node of a check says whether its check runs while the specification is a draft, and cites the ruling or the row that says so. Write "regardless of whether the specification is approved or a draft", never "whether the specification is approved or a draft".
- **Citations (rule 7.2.7).** At its first use in a node, every word that takes its meaning from the specification cites the node that defines it, with a `cites` link. Cite one node for one concept everywhere. For example, "the files generated from the specification" cites "Code generated from approved wordings" (s-qyjw8xez6t6adc3). Look each sid up; never recall one. Never drop a `cites` link that a decision or any other field of the node still cites.
- **The reason.** It says why the rule exists, in as few sentences as that takes, and passes the pairing test.
- **One check, one node; one statement, one home.** Do not restate in a node what another node already states; cite it.
- **Pointing back.** A phrase such as "it", "that code" or "such a commit" refers only to something named in the same paragraph.
- **Phrases the owner's English uses.**
  - Use "refuses", "refused" and "refusal" for what a check does, and "The most likely mistake" in examples.
  - Use "top-level node", "the files that the repository keeps", "the commit message" and "conforms to the schema".
  - Use "including X", never "X included", and "credentials", never "sign-in".
  - An approval "is in force", never "stands for".
  - A SpecTag "is placed" somewhere, never "stands".
  - Write "code other than tests", never "outside its tests".
- **Russian.**
  - `ru` renders the English completely, by meaning, and every `change` is in Russian. Use the owner's renderings in `C:/Users/PC/.claude/skills/vt/terms-ru.md`.
  - Write «ответственный», never «владелец»; «у X есть SpecTag», never «несёт»; «ревью» for the review and «рецензент» for the reviewer; «замечание» for a finding; «отвергает» for what a command refuses.
  - «Тип» always takes its object, as in «тип узлов».
- **`change` fields compare the final wording with the approved one.** They never tell the history of the rounds: no "Раунд", no reviewer, no report file. Keep the history in your notes.

## What to write

1. `D:/SpecSheriff/.ai_docs/t25-pass/propose-group4.mjs`, a script that copies `tools-drafts.json` to `tools-drafts.before-group4.json` and then writes a draft for each node of the group into `tools-drafts.json`, with the same fields as the agreed drafts. A new node's key is `new:<short name>`. Run the script twice and check that it gives the same file both times, and that no key outside the group differs from the copy.
2. `D:/SpecSheriff/.ai_docs/t25-pass/group4-notes.md`, in English:
   - for each node: its key, its title, the rows it implements, how you settled each question you settled, and what must change in the code in stage 3;
   - the questions that only the owner can answer, each with the options in terms of what a person sees, what each costs and your recommendation. Keep this list as short as the rules allow;
   - the changes still to be made to nodes outside the group.
3. `D:/SpecSheriff/.ai_docs/t25-pass/english-group4.md`: the final English of every node of the group, each under its key and title, with its title, text, reason and examples, for EngStickler's readers.

Do not change anything under `specs/`, and do not touch `D:/SpecSheriff/.ai_docs/INDEX.md`, `tasks.md` or `t25-one-thought.md`.

## Your final report

Short, in English: the keys and titles of the drafts written, how many questions are left for the owner, and anything you could not settle. The main session will send each draft to specsheriff-rule-reviewer and send you the reports to act on, so keep your notes current.
