# T25, stage 2, group 8: draft the nodes of items 57 to 63

You draft the new wordings of the nodes of the appendix of the SpecSheriff tools that items 57 to 63 cover in the order of the review. The order is in `D:/SpecSheriff/.ai_docs/t25-pass/stage2-inventory.md`, section "Proposed order of the review". Group 8 is the last group of stage 2. Its items are:

- 57: "The hooks" (s-477gtdrkw34dzxw), tools 6;
- 58: "An edit judged before it is made" (s-st6td4mua9uqt9z), tools 7.3.2;
- 59: "The agent's hooks for Codex CLI" (s-n76wt2bkqdmh78x), tools 16;
- 60: "A git hook runs the SpecSheriff tools a plugin keeps on the machine" (s-4mej6ccn7xu3d3p), tools 12;
- 61: "The project's own tools in a git hook" (s-n4m5zvh96yb299p), tools 13;
- 62: "The plugin for Claude Code carries everything its work needs" (s-zh2vcr3xjumppg5), tools 14;
- 63: "The plugin for Codex CLI carries everything its work needs" (s-2pdy9gw2jrjvfb4), tools 15.

The owner will see all these nodes on one page and agree to the group with one answer. So every draft must be final: specsheriff-rule-reviewer reviews each node after you, and EngStickler's readers read it, before the owner sees it. A wording is final only when it meets all of these conditions:
- it states what the SpecSheriff tools must do;
- it is consistent with the whole specification;
- it leaves to the owner only the questions that no rule, ruling or code can settle.

Groups 1 to 7 took between four and eight rounds of review. Most of their findings were of a few kinds, listed under "Lessons from groups 1 to 7" below. Get these points right in the first draft.

## What to read first

1. `D:/SpecSheriff/CLAUDE.md` and `D:/SpecSheriff/docs/principles.md`.
2. The rules on how a rule is written: the last section of `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`, which `node D:/SpecSheriff/.claude/vt/writing-rules.mjs` prints as a checklist. Also read the rules in `D:/SpecSheriff/.claude/vt/rules.md` from "A proposal is based on the owner's earlier rulings on its subject" onward.
3. `stage2-inventory.md`: the opening sections ("How to read this file", "Questions that affect many nodes", "Open problems in the new form…", "The targets of the links"), and the entry of each node of the group.
4. The new form: `moved/specs/_guidelines/spec.json` for the base, with every rule on the hooks, the plugins, the reviewer and the agent's edits; the extensions under `moved/specs/_guidelines/extensions/`; and `moved/impl.json`, which maps each row of a table of checks to the nodes of the appendix that implement it.
5. The current appendix, `D:/SpecSheriff/specs/_guidelines/tools.json`, for the current wording of each node.
6. The agreed drafts in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`: items 1 to 8 and groups 1 to 7, which the owner agreed to by 2026-11-25. They are binding: never change one, and cite it where your node relies on it. A proposal key with a `base` holds a newer agreed wording of the draft named in `base`, and that newer wording is the one in force. Read first the agreed drafts of the commands (`sheriff guard`, `sheriff commit-message`, `sheriff review`, `sheriff markdown`, `sheriff map`, `sheriff types`, `sheriff settings`), of the settings that only an owner changes, and of the approvals of nodes.
7. The section "Changes still needed outside the group", or "Changes needed outside the group", of `group1-notes.md` to `group7-notes.md`. Make each change that falls into group 8, and say in your notes how you made it. In particular:
   - `group7-notes.md`, items 1 and 10: the hooks run `sheriff markdown` and `sheriff map` only where the project has chosen the Views extension, as the owner ruled on 2026-11-25 (answer A to the second question of group 7); `sheriff types` now also writes the bindings file; whether the hooks redraw the diagram of the domains waits for the command that draws it (task T29);
   - `group6-notes.md`, items 8, 9 and 10: the entries that `sheriff guard` protects; the run of the checks before an approval, which "The hooks" need not describe; the skill `spec-settings` in the plugins' lists, if it ships in this release;
   - the notes of groups 2, 3 and 4, wherever they name one of the sids of this group.
8. The owner's rulings: search the long file `D:/SpecSheriff/.ai_docs/t25-one-thought.md`, by sid and by title, for every sid of the group and for the rows that each node implements. Its sections "Settled with the owner" and "Found and owed" also apply to this group. Read the `meta.decisions` of each row the node implements, and of the rules those rows check. The owner's ruling of 2026-11-02 on Codex CLI applies: in Codex a hook's exit code 2 does not block, so the scripts answer Codex in JSON.
9. The code that makes each check or runs each procedure, in `D:/SpecSheriff/skills/tools/src/`, the hook scripts of the plugins under `D:/SpecSheriff/skills/claude-code/` and `D:/SpecSheriff/skills/codex/`, `.githooks/` in the repository, and the tests of that code. A draft says what the code must do. Where the code does something else, the draft follows the rules and the rulings, and your notes say what must change in stage 3.

Task T28, a later task of the same release, will move each approval into the node that it approves. Task T29 will move the owner's viewer of the specification into the plugin and add the command that draws the diagram of the domains. Do not anticipate either: draft what the agreed rules say now, and record in your notes what T28 or T29 will change.

## How to draft

- Each node of a check opens with what is refused and what the refusal names. A node of a procedure, such as a hook, opens with what runs and when, in the order in which it runs.
- Each node has an `implements` link to each row or rule that it implements, not to the whole table.
- Where a node holds two separate requirements, split it into nodes within its section, as the rule "A node is split within its section without asking" says. A new node gets a new sid: 15 characters from `23456789abcdefghjkmnpqrstuvwxyz` after `s-`, checked to be unique across `specs/`, `moved/` and `tools-drafts.json`.
- Propose an example wherever a reader, especially an agent, would still ask what the rule looks like in practice. The example shows the rule as the text states it, and its "most likely mistake" is a mistake that the text forbids.
- Carry out without asking the owner what a decision has already settled, such as a renamed command or a removed term.
- Settle every question that the specification, the owner's rulings or the code can settle, and say in your notes how you settled it.
- A change to a node the owner has already agreed to is written as a proposal: one complete new wording, with a list in Russian of what changed and why. A change to an agreed draft in `tools-drafts.json` is a proposal with `base` set to that draft's key. Bring a sentence of that node that breaks a rule on how a node is written into line inside the same proposal.
- Never touch any node outside the group, in `specs/` or in the drafts, except through a proposal.

## Lessons from groups 1 to 7

- **A finding that an earlier ruling of the owner settles is applied, never put to the owner.** In group 7, the order of the domains on the map was first drafted against the owner's ruling of 2026-11-14 and then corrected. Search the owner's rulings before you settle any point.
- **A defect that the group's subject brings to light in an agreed node is fixed by a proposal in the group.**
- **A question about the base specification is not put to the owner during stage 2.** List it in your notes under "Questions for the base specification", with what it would change and why. Your draft follows the base as it stands.
- **Look for contradictions between agreed rules before you write anything.** Where two agreed rules disagree for the case your node covers, write the proposal that resolves it, or list a question for the base specification.
- **A term keeps the meaning that the agreed nodes give it.** Search the agreed drafts and the new form for each term, and use it in their sense.
- **A question for the owner is checked against the rulings and principles first.** A question that remains gives the recommendation and its basis first, then each option with what a person sees and every cost and risk that remains.
- **Draft or approved.** Each node of a check says whether its check runs while the specification is a draft: "regardless of whether the specification is approved or a draft", or the case that the rulings set.
- **Citations (rule 7.2.7).** At its first use in a node, every word that takes its meaning from the specification cites the node that defines it, with a `cites` link. Look each sid up; never recall one.
- **The reason** says why the rule exists, in as few sentences as that takes, and passes the pairing test.
- **One statement, one home.** Do not restate what another node states; cite it.
- **Pointing back.** "It", "that code" or "such a commit" refers only to something named in the same paragraph. A paragraph that opens with "They" or "It" names its subject again.
- **A general word carries its object**, such as "the files of the specification".
- **Phrases the owner's English uses.**
  - "refuses", "refused" and "refusal" for what a check does; "makes this check"; "refuses each of the following" before a list of refusals; "The most likely mistake" in examples.
  - "top-level node", "the files that the repository keeps", "the commit message", "conforms to the schema".
  - "only after … have passed", never "only once …"; "is treated as" or "is considered", never "counts as"; "points to", never "points at"; "including X", never "X included"; "code other than tests".
  - "printed to its standard output"; "any other", never "every other"; "has no end" or "is never reached" for a state.
  - "The name of X is Y", never "X is named by Y"; two verbs of one subject next to it; "only" in the sentence that introduces a list of the only cases.
  - A check refuses a thing (a file, a list, a commit), never "a fault" or "things".
  - "with or without bounds", never "with any bounds"; "so" or "and so" for a consequence, "so that" only for a purpose.
- **Russian.** `ru` renders the English completely, by meaning, and every `change` is in Russian. Use the owner's renderings in `C:/Users/PC/.claude/skills/vt/terms-ru.md`: «ответственный», never «владелец»; «у X есть SpecTag»; «ревью» and «рецензент»; «замечание»; «отвергает». RecordType, TableRule and SpecTag stay in Latin letters and are not declined. Git's operations keep git's names: commit, push, merge.
- **`change` fields compare the final wording with the approved one.** They never tell the history of the rounds. A node or an example that the approved wording did not have gets the `change` «Новое»; an example copied unchanged from a base gets «Как в согласованной формулировке.».
- **Applying the readers' findings.** A finding that repeats one that an earlier round rejected for a stated reason, or that only asks for context the node's earlier sentences or citations already give, is rejected, and your notes say so in one line.

## What to write

1. `D:/SpecSheriff/.ai_docs/t25-pass/propose-group8.mjs`, a script that copies `tools-drafts.json` to `tools-drafts.before-group8.json` and then writes a draft for each node of the group into `tools-drafts.json`, with the same fields as the agreed drafts. A new node's key is `new:<short name>`. Run the script twice and check that it gives the same file both times, and that no key outside the group differs from the copy.
2. `D:/SpecSheriff/.ai_docs/t25-pass/group8-notes.md`, in English: for each node, its key, its title, the rows or rules it implements, how you settled each question, and what must change in the code in stage 3; the questions that only the owner can answer; the questions for the base specification; the changes still needed outside the group.
3. `D:/SpecSheriff/.ai_docs/t25-pass/english-group8.md`: the final English of every node of the group, each under its key and title, with its title, text, reason and examples, for EngStickler's readers.

Do not change anything under `specs/`, and do not touch `D:/SpecSheriff/.ai_docs/INDEX.md`, `tasks.md` or `t25-one-thought.md`. Make no commit.

## Your final report

Short, in English: the keys and titles of the drafts written, how many questions are left for the owner and for the base specification, and anything you could not settle.
