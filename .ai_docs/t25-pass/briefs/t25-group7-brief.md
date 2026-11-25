# T25, stage 2, group 7: draft the nodes of items 51 to 56

You draft the new wordings of the nodes of the appendix of the SpecSheriff tools that items 51 to 56 cover in the order of the review. The order is in `D:/SpecSheriff/.ai_docs/t25-pass/stage2-inventory.md`, section "Proposed order of the review". The items are:

- 51: "What the export, the guide and `sheriff show` write of a node" (s-k4nqjr96ux7a5m7), tools 5;
- 52: "Building the map" (s-rpv4fkdqqguptqd), tools 4, with the nodes that the appendix needs for the diagram of the domains (s-4azsb49pj6sech8) and for the order of the domains in a row of that diagram (s-uw9n84edf7cbe9n);
- 53: "Where the types and RuntimeChecks generated from the RecordTypes are written" (s-pvzms7d8kxb8dk2), tools 17;
- 54: "What a RecordType generates" (s-suv42g8r3ra2h6b), tools 18;
- 55: "A RecordType its variants refine" (s-nk8td3ez58gahc4), tools 19;
- 56: "The type each neutral type of a field gives" (s-4npdup7mjkva69y), tools 20.

The owner will see all these nodes on one page and agree to the group with one answer. So every draft must be final: specsheriff-rule-reviewer reviews each node after you, and EngStickler's readers read it, before the owner sees it. The owner must never see a draft that is still open to change. A wording is final only when it meets all of these conditions:
- it states what the SpecSheriff tools must do;
- it is consistent with the whole specification;
- it leaves to the owner only the questions that no rule, ruling or code can settle.

Groups 1 to 6 took between four and eight rounds of review. Most of their findings were of a few kinds, listed under "Lessons from groups 1 to 6" below. Get these points right in the first draft.

## What to read first

1. `D:/SpecSheriff/CLAUDE.md` and `D:/SpecSheriff/docs/principles.md`.
2. The rules on how a rule is written: the last section of `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`, which `node D:/SpecSheriff/.claude/vt/writing-rules.mjs` prints as a checklist. Also read the rules in `D:/SpecSheriff/.claude/vt/rules.md` from "A proposal is based on the owner's earlier rulings on its subject" onward.
3. `stage2-inventory.md`: the opening sections ("How to read this file", "Questions that affect many nodes", "Open problems in the new form…", "The targets of the links"), and the entry of each node of the group.
4. The new form:
   - `moved/specs/_guidelines/spec.json` for the base;
   - the extensions under `moved/specs/_guidelines/extensions/`. For items 51 and 52, read the Views extension (`views.json`) whole, and rules 11.2.2 and 11.2.3 of the Domains extension (`domains.json`). For items 53 to 56, read the RecordType extension (`recordtype.json`) whole, table 12.12 included;
   - `moved/impl.json`, which maps each row of a table of checks to the nodes of the appendix that implement it.
5. The current appendix, `D:/SpecSheriff/specs/_guidelines/tools.json`, for the current wording of each node.
6. The agreed drafts in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`: items 1 to 8 and groups 1 to 6, which the owner agreed to by 2026-11-25. They are the model for the format, the style and the level of detail. Every agreed draft is binding on you: never change one, and cite it where your node relies on it.
   - A proposal key with a `base` holds a newer agreed wording of the draft named in `base`, and that newer wording is the one in force.
   - For items 51 and 52, read the agreed drafts of the section "The commands", "The commands that `sheriff` accepts" (s-f5rz6b7dhxejjts) first.
   - For items 53 to 56, read the drafts of group 5 (items 44 to 47) first. They rely on item 56 for the forms in which a RecordType's `schema` names another RecordType.
7. The section "Changes still needed outside the group", or "Changes needed outside the group", of `group1-notes.md` to `group6-notes.md`. Make each change that falls into group 7, and say in your notes how you made it. `group5-notes.md` owes item 56 the changes in its points 2, 3, 10 and 15:
   - item 56 states the forms in which a RecordType's `schema` names another RecordType: `$ref` with `#` and the RecordType's sid, and the value of `identifierOf`. Items 44 and 47 are then to cite item 56, a technical replacement that you write as a proposal with `base`;
   - item 56 cites s-5nf87c3e3jg9v7c for the order of the gathered values instead of restating it;
   - no row of table 12.12 checks that a `$ref` within a RecordType's `schema` points to a RecordType that exists;
   - one convention for SpecSheriff's own keywords in a RecordType's `schema`: `x-enumSource` carries the `x-` prefix, while `identifierOf`, `identifiedBy`, `chosenBy` and `answersTo` carry none;
   - rows 12.12.6 and 12.12.7 look only at a RecordType variant's own `schema`, so the fields that a variant takes on from a fragment of a format, or from a RecordType that refines its RecordType, are compared with nothing.
   Each of these that only the base specification or table 12.12 can settle is a question for the base specification: see the first lesson below.
8. The owner's rulings: search the long file `D:/SpecSheriff/.ai_docs/t25-one-thought.md`, by sid and by title, for every sid of the group and for the rows that each node implements. Its sections "Settled with the owner" and "Found and owed" also apply to this group. Read the `meta.decisions` of each row the node implements, and of the rules those rows check. Two rulings bear directly on this group:
   - the paragraph on the agreed draft "The commands that `sheriff` accepts" in that file says that whether `sheriff export` and `sheriff render` write files only in a project that has chosen the Views extension is settled when the nodes on the export and the map are reviewed. Settle it in items 51 and 52. Whether the hooks then run those commands only in such a project belongs to "The hooks" (s-477gtdrkw34dzxw), item 57 of group 8: record what item 57 must say in your notes;
   - the same paragraph says that the new wording of item 51 (s-k4nqjr96ux7a5m7) takes over two statements from the approved wording of "The commands" (s-f5rz6b7dhxejjts): `sheriff show` finds a node by its sid or by its location, and the export writes one file for each file of the specification.
9. The code that makes each check or runs each procedure, in `D:/SpecSheriff/skills/tools/src/`, and the tests of that code. A draft says what the code must do. Where the code does something else, the draft follows the rules and the rulings, and your notes say what must change in stage 3.

Task T28, a later task of the same release, will move each approval into the node that it approves. Do not anticipate it: draft what the agreed rules say now.

Task T29, which waits until after T25, moves the owner's viewer of the specification into the plugin. That viewer draws the diagram of the domains by level. Item 52 states what the SpecSheriff tools must do under rules 11.2.2 and 11.2.3, whichever task builds it. A release carries out every rule it contains. So say in your notes which command draws the diagram today, if any, and what the release of T25 lacks to carry out rules 11.2.2 and 11.2.3.

## How to draft

- Each node of a check opens with what the command refuses and what the refusal names, as the agreed drafts do. A node of a procedure opens with what the command does, in the order in which it does it. Most nodes of this group describe what a command writes: such a node opens with what the command writes, and where.
- Each node has an `implements` link to each row or rule that it implements, not to the whole table.
- Where a node holds two separate requirements, split it into nodes within its section, as the rule "A node is split within its section without asking" says. A new node gets a new sid: 15 characters from `23456789abcdefghjkmnpqrstuvwxyz` after `s-`, checked to be unique across `specs/`, `moved/` and `tools-drafts.json`.
- Propose an example wherever a reader, especially an agent, would still ask what the rule looks like in practice. The example shows the rule as the text states it, and its "most likely mistake" is a mistake that the text forbids.
- Carry out without asking the owner what a decision has already settled, such as a renamed command or a removed term.
- Settle every question that the specification, the owner's rulings or the code can settle, and say in your notes how you settled it.
- A change to a node the owner has already agreed to, outside the appendix of the tools, is written as a proposal: one complete new wording, with a list in Russian of what changed and why. Bring a sentence of that node that breaks a rule on how a node is written into line inside the same proposal, never as a separate question. A change to an agreed draft in `tools-drafts.json` is a proposal with `base` set to that draft's key.
- Never touch any node outside the group, in `specs/` or in the drafts, except through a proposal. A change that a node outside the group needs, and that no proposal of the group makes, goes into your notes.

## Lessons from groups 1 to 6

- **A defect that the group's subject brings to light in an agreed node of the appendix is fixed by a proposal in the group.** Group 6 did this for two agreed nodes: the proposal is one complete new wording, with `base` set to the agreed draft. The owner sees it on the group's page beside the agreed wording.
- **A question about the base specification is not put to the owner during stage 2.** The owner's rule "One part at a time" keeps the review in the appendix of the tools until the whole appendix is done. List such a question in your notes under "Questions for the base specification", with what it would change and why. The main session records it under "Found and owed" in the continuation file. Your draft follows the base as it stands.
- **Look for contradictions between agreed rules before you write anything.** Before drafting, read every rule that your node relies on, and check whether any two of them disagree for the case your node covers. Where they do, write the proposal that resolves it, or list a question for the base specification.
- **A term keeps the meaning that the agreed nodes give it.** In group 5, a draft first gave "a part of the base specification" a meaning that differed from the one in two agreed nodes, and the owner then had to decide a renaming. Before you use a term, search the agreed drafts and the new form for it, and use it in their sense or name the difference in your notes.
- **A question for the owner is checked against the rulings and principles first.** Under `vt`'s rules, a question that a stated principle or ruling already decides is not asked. A question that remains gives the recommendation and the ruling it rests on first, then each option with what a person sees and every cost and risk that remains.
- **A gap that an agreed list leaves is closed the way the list closes its other cases.**
- **Draft or approved.** Each node of a check says whether its check runs while the specification is a draft, and cites the ruling or the row that says so. Write "regardless of whether the specification is approved or a draft".
- **Citations (rule 7.2.7).** At its first use in a node, every word that takes its meaning from the specification cites the node that defines it, with a `cites` link. Cite one node for one concept everywhere. Look each sid up; never recall one. Never drop a `cites` link that a decision or any other field of the node still cites, and drop a `cites` link that nothing cites any more.
- **The reason.** It says why the rule exists, in as few sentences as that takes, and passes the pairing test.
- **One check, one node; one statement, one home.** Do not restate in a node what another node already states; cite it.
- **Pointing back.** A phrase such as "it", "that code" or "such a commit" refers only to something named in the same paragraph. Place a sentence that says what a refusal names right after the sentence about that refusal. Do not leave a verb out, as in "Where they do": repeat the verb and its object.
- **A general word carries its object**, as in "the model of the specification", "the files of the specification" and "the section of the technical appendix on the stack".
- **Phrases the owner's English uses.**
  - Use "refuses", "refused" and "refusal" for what a check does, and "The most likely mistake" in examples.
  - Use "top-level node", "the files that the repository keeps", "the commit message" and "conforms to the schema".
  - Use "only after … have passed", never "only once … have passed", which reads as "a single time".
  - Use "is treated as" or "is considered", never "counts as": the owner reserves "counts" for counting.
  - A link or a ref "points to" a node or a commit, never "points at" it.
  - Use "including X", never "X included"; "code other than tests", never "outside its tests".
  - Use "printed to its standard output", and "is listed for that purpose", never "is named for that purpose".
  - Use "any other", never "every other", which reads as "every second". Write "the same X as it does", never "the same X" with nothing to compare it with.
  - Write "has no end" or "is never reached" for a state, and keep "never" for time.
  - Give a name with "The name of X is Y", never "X is named by Y", which reads as naming who gave the name.
  - Keep two verbs of one subject next to it: "refuses any other file and names it", never a relative clause between them.
  - Where a list gives the only cases in which something is done, the sentence that introduces it says "only", as the owner's rule "A rule says what holds, not what does not hold" requires.
  - Write "makes this check" for a check, and "refuses each of the following" before a list of refusals, as the agreed drafts do.
  - Write "the values gathered beside a field", the words of rule 12.9.
- **Russian.**
  - `ru` renders the English completely, by meaning, and every `change` is in Russian. Use the owner's renderings in `C:/Users/PC/.claude/skills/vt/terms-ru.md`.
  - Write «ответственный», never «владелец»; «у X есть SpecTag», never «несёт»; «ревью» for the review and «рецензент» for the reviewer; «замечание» for a finding; «отвергает» for what a command refuses.
  - Render "citation" and "cite" as «ссылка» and «ссылаться», as the agreed rules do. «Тип» always takes its object, as in «тип узлов».
  - RecordType, TableRule and SpecTag stay in Latin letters and are not declined.
- **`change` fields compare the final wording with the approved one.** They never tell the history of the rounds: no "Раунд", no reviewer and no report file. Keep the history in your notes. A node or an example that the approved wording did not have gets the `change` «Новое».
- **Applying the readers' findings.** A reader's finding that only asks for more context around a sentence, where the node's earlier sentences or its citations already give that context, is rejected, and your notes say why. Group 6 spent its last two rounds on such findings.

## What to write

1. `D:/SpecSheriff/.ai_docs/t25-pass/propose-group7.mjs`, a script that copies `tools-drafts.json` to `tools-drafts.before-group7.json` and then writes a draft for each node of the group into `tools-drafts.json`, with the same fields as the agreed drafts. A new node's key is `new:<short name>`. Run the script twice and check that it gives the same file both times, and that no key outside the group differs from the copy.
2. `D:/SpecSheriff/.ai_docs/t25-pass/group7-notes.md`, in English:
   - for each node: its key, its title, the rows or rules it implements, how you settled each question you settled, and what must change in the code in stage 3;
   - the questions that only the owner can answer, each with the options in terms of what a person sees, what each costs and your recommendation. Keep this list as short as the rules allow;
   - the questions for the base specification;
   - the changes still needed to nodes outside the group, including what item 57 must say about the hooks that run `sheriff export` and `sheriff render`.
3. `D:/SpecSheriff/.ai_docs/t25-pass/english-group7.md`: the final English of every node of the group, each under its key and title, with its title, text, reason and examples, for EngStickler's readers.

Do not change anything under `specs/`, and do not touch `D:/SpecSheriff/.ai_docs/INDEX.md`, `tasks.md` or `t25-one-thought.md`.

## Your final report

Short, in English: the keys and titles of the drafts written, how many questions are left for the owner and for the base specification, and anything you could not settle. The main session will send each draft to specsheriff-rule-reviewer and send you the reports to act on, so keep your notes current.
