# T25, stage 2, group 5: draft the nodes of items 41 to 47

You draft the new wordings of the nodes of the appendix of the SpecSheriff tools that items 41 to 47 cover in the order of the review. The order is in `D:/SpecSheriff/.ai_docs/t25-pass/stage2-inventory.md`, section "Proposed order of the review". The items implement rows of the tables of checks of two extensions of the guidelines, Domains (table 11.3) and RecordType (table 12.12):

- 41: "No circular dependency between the domains" (s-vuujweu57sxsa58), row 11.3.4;
- 42: "A file of the technical appendix named after a domain" (s-gvafe6bnstwab8b), row 11.3.5;
- 43: "A header's level" (s-uxmkwbnpgtjzkgv), row 11.3.6;
- 44: "An identifier followed to its end" (s-3anv9qcmx8pwp2w), rows 12.12.2 and 12.12.3;
- 45: "What a RecordType variant must agree with" (s-c2r9jndrjbtbsv6), rows 12.12.4 to 12.12.10;
- 46: "Where the values of a field of type `one of` are collected" (s-5nf87c3e3jg9v7c), rows 12.12.11 to 12.12.13;
- 47: "A used domain's RecordType, only from the declared sections" (s-ezq8csd433vj6fj), rows 12.12.15 and 12.12.16.

The owner will see all these nodes on one page and agree to the group with one answer. So every draft must be final: specsheriff-rule-reviewer reviews each node after you, and EngStickler's readers read it, before the owner sees it. The owner must never see a draft that is still open to change. A wording is final only when it meets all of these conditions:
- it states what the SpecSheriff tools must do;
- it is consistent with the whole specification;
- it leaves to the owner only the questions that no rule, ruling or code can settle.

Groups 1 to 4 took six, four, eight and five rounds of review. Most of their findings were of a few kinds, listed under "Lessons from groups 1 to 4" below. Get these points right in the first draft.

## What to read first

1. `D:/SpecSheriff/CLAUDE.md` and `D:/SpecSheriff/docs/principles.md`.
2. The rules on how a rule is written: the last section of `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`, which `node D:/SpecSheriff/.claude/vt/writing-rules.mjs` prints as a checklist. Also read the rules in `D:/SpecSheriff/.claude/vt/rules.md` from "A proposal is based on the owner's earlier rulings on its subject" onward.
3. `stage2-inventory.md`: the opening sections ("How to read this file", "Questions that affect many nodes", "Open problems in the new form…", "The targets of the links"), and the entry of each node of the group.
4. The new form: the extensions Domains and RecordType under `moved/specs/_guidelines/extensions/`, with their tables of checks 11.3 and 12.12 and every rule those rows check; `moved/specs/_guidelines/spec.json` for the base; and `moved/impl.json`, which maps each row of a table of checks to the nodes of the appendix that implement it.
5. The current appendix, `D:/SpecSheriff/specs/_guidelines/tools.json`, for the current wording of each node.
6. The agreed drafts in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`: items 1 to 8 and groups 1 to 4, which the owner agreed to by 2026-11-24. They are the model for the format, the style and the level of detail. Every agreed draft is binding on you: never change one, and cite it where your node relies on it.
   - A proposal key with a `base` holds a newer agreed wording of the draft named in `base`, and that newer wording is the one in force.
   - Group 4 settled how the SpecSheriff tools read a rule of `project.json`: each list in its last approved wording, and its `refines` links from the commit that added its last approval (`proposal:new-tools-1-project-g4`). Where your node reads a rule that a project writes, follow it.
7. The section "Changes still to be made to nodes and files outside the group", or "Changes needed outside the group", of `group1-notes.md` to `group4-notes.md`. Make each change that falls into group 5, and say in your notes how you made it.
8. The owner's rulings: search the long file `D:/SpecSheriff/.ai_docs/t25-one-thought.md`, by sid and by title, for every sid of the group and for the rows that each node implements. Its sections "Settled with the owner" and "Found and owed" also apply to this group. The owner gave many rulings on domains (2026-11-16 to 2026-11-18) and on RecordType (2026-11-14 to 2026-11-21, including the ruling that everything about RecordType follows JSON Schema 2020-12). Read the `meta.decisions` of each row the node implements, and of the rules those rows check.
9. The code that makes each check, in `D:/SpecSheriff/skills/tools/src/`, and the tests of that code. A draft says what the code must do. Where the code does something else, the draft follows the rules and the rulings, and your notes say what must change in stage 3.

## How to draft

- Each node of a check opens with what the command refuses and what the refusal names, as the agreed drafts do.
- Each node has an `implements` link to each row whose check it makes, not to the whole table.
- Where a node holds two separate requirements, split it into nodes within its section, as the rule "A node is split within its section without asking" says. A new node gets a new sid: 15 characters from `23456789abcdefghjkmnpqrstuvwxyz` after `s-`, checked to be unique across `specs/`, `moved/` and `tools-drafts.json`.
- Propose an example wherever a reader, especially an agent, would still ask what the rule looks like in practice. The example shows the rule as the text states it, and its "most likely mistake" is a mistake that the text forbids.
- Carry out without asking the owner what a decision has already settled, such as a renamed command or a removed term.
- Settle every question that the specification, the owner's rulings or the code can settle, and say in your notes how you settled it.
- A change to a node the owner has already agreed to, outside the appendix of the tools, is written as a proposal: one complete new wording, with a list in Russian of what changed and why. Bring a sentence of that node that breaks a rule on how a node is written into line inside the same proposal, never as a separate question. A change to an agreed draft in `tools-drafts.json` is a proposal with `base` set to that draft's key.
- Never touch any node outside the group, in `specs/` or in the drafts. A change that a node outside the group needs goes into your notes.

## Lessons from groups 1 to 4

- **Look for contradictions between agreed rules before you write anything.** In group 4, the agreed rule 10.12 and the agreed draft on validation against the schema disagreed about when a project's own checks run, and this surfaced only in the first review. Before drafting, read every rule that your node relies on, and check whether any two of them disagree for the case your node covers. Where they do, write the proposal that resolves it.
- **A question for the owner is checked against the rulings and principles first.** Under `vt`'s rules, a question that a stated principle or ruling already decides is not asked. In group 4, which wording of a draft rule the SpecSheriff tools read was settled by the principle "Nothing unapproved is implemented" and by rule 1.3.2.
- **A gap that an agreed list leaves is closed the way the list closes its other cases.** In group 4, a rule whose exemption ends was added to the list of what makes a commit include an approved rule, as the owner had added the removal of an `implements` link.
- **Draft or approved.** Each node of a check says whether its check runs while the specification is a draft, and cites the ruling or the row that says so. Write "regardless of whether the specification is approved or a draft".
- **Citations (rule 7.2.7).** At its first use in a node, every word that takes its meaning from the specification cites the node that defines it, with a `cites` link. This covers words such as "the system's code", "the project's own guidelines", "SpecTag", "fingerprint" and "the model of the specification". Cite one node for one concept everywhere. Look each sid up; never recall one. Never drop a `cites` link that a decision or any other field of the node still cites.
- **The reason.** It says why the rule exists, in as few sentences as that takes, and passes the pairing test.
- **One check, one node; one statement, one home.** Do not restate in a node what another node already states; cite it.
- **Pointing back.** A phrase such as "it", "that code" or "such a commit" refers only to something named in the same paragraph. Place a sentence that says what a refusal names right after the sentence about that refusal.
- **A general word carries its object**, as in "the model of the specification", "the files of the specification" and "the section of the technical appendix on the stack".
- **Phrases the owner's English uses.**
  - Use "refuses", "refused" and "refusal" for what a check does, and "The most likely mistake" in examples.
  - Use "top-level node", "the files that the repository keeps", "the commit message" and "conforms to the schema".
  - Use "only after … have passed", never "only once … have passed", which reads as "a single time".
  - Use "is treated as" or "is considered", never "counts as": the owner reserves "counts" for counting.
  - A link or a ref "points to" a node or a commit, never "points at" it.
  - Use "including X", never "X included"; "code other than tests", never "outside its tests".
  - Use "printed to its standard output", and "is listed for that purpose", never "is named for that purpose".
- **Russian.**
  - `ru` renders the English completely, by meaning, and every `change` is in Russian. Use the owner's renderings in `C:/Users/PC/.claude/skills/vt/terms-ru.md`.
  - Write «ответственный», never «владелец»; «у X есть SpecTag», never «несёт»; «ревью» for the review and «рецензент» for the reviewer; «замечание» for a finding; «отвергает» for what a command refuses.
  - Render "citation" and "cite" as «ссылка» and «ссылаться», as the agreed rules do. «Тип» always takes its object, as in «тип узлов».
- **`change` fields compare the final wording with the approved one.** They never tell the history of the rounds: no "Раунд", no reviewer and no report file. Keep the history in your notes.

## What to write

1. `D:/SpecSheriff/.ai_docs/t25-pass/propose-group5.mjs`, a script that copies `tools-drafts.json` to `tools-drafts.before-group5.json` and then writes a draft for each node of the group into `tools-drafts.json`, with the same fields as the agreed drafts. A new node's key is `new:<short name>`. Run the script twice and check that it gives the same file both times, and that no key outside the group differs from the copy.
2. `D:/SpecSheriff/.ai_docs/t25-pass/group5-notes.md`, in English:
   - for each node: its key, its title, the rows it implements, how you settled each question you settled, and what must change in the code in stage 3;
   - the questions that only the owner can answer, each with the options in terms of what a person sees, what each costs and your recommendation. Keep this list as short as the rules allow;
   - the changes still needed to nodes outside the group.
3. `D:/SpecSheriff/.ai_docs/t25-pass/english-group5.md`: the final English of every node of the group, each under its key and title, with its title, text, reason and examples, for EngStickler's readers.

Do not change anything under `specs/`, and do not touch `D:/SpecSheriff/.ai_docs/INDEX.md`, `tasks.md` or `t25-one-thought.md`.

## Your final report

Short, in English: the keys and titles of the drafts written, how many questions are left for the owner, and anything you could not settle. The main session will send each draft to specsheriff-rule-reviewer and send you the reports to act on, so keep your notes current.
