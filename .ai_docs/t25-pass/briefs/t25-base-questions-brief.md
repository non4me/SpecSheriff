# T25: the questions about the base specification that stage 2 deferred

You gather, in one file, every question about the base specification that the review of the appendix of the tools deferred, and every change to the base that the owner has already decided. Stage 2 is finished: the owner has agreed to every group of nodes of the appendix of the tools. Under the owner's rule "One part at a time", questions about the base waited until now. The main session will show them to the owner on one page, in groups if there are many, and the owner will answer each group at once.

Do not edit any node, in `specs/`, in `moved/` or in `tools-drafts.json`. Make no commit, and do not touch `.ai_docs/INDEX.md`, `tasks.md` or `t25-one-thought.md`.

## Where the questions are

- `D:/SpecSheriff/.ai_docs/t25-one-thought.md`, the section "Found and owed": each item there.
- The section "Questions for the base specification", or the items so named, in `D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md` to `group8-notes.md`. Some groups list them under another heading; search each file.
- The decisions on base rules that the owner already made on a group's page, which the base must now be changed to state:
  - group 7, question 1 (2026-11-25): rules 13.1 and 13.2 label a node with no title by its location, and name it by its sid and its location;
  - group 8, question 1 (2026-11-25): rule 10.12 says "before any other check" instead of "right after the first step";
  - group 8, question 2 (2026-11-25): rule 10.3's first item judges only a node that the edit adds, or whose wording or approval status it changes.
- The base is `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`, with its extensions under `moved/specs/_guidelines/extensions/`, and the agreed drafts of the base in `tools-drafts.json` (keys `proposal:s-…` with a sid of the base).

## What to check for each item

- Whether it still holds. A later agreed node or ruling may already have settled it; then say which, and drop it.
- Whether two items are the same question; then merge them.
- Which base node or nodes it concerns, by sid and location, with the node's current or agreed wording.
- Whether it is a change that only carries out what the owner has already decided, which needs no question, or a question that only the owner can answer.

## What to write

`D:/SpecSheriff/.ai_docs/t25-pass/base-questions.md`, in English:
1. **Changes already decided.** For each, the base node by sid and location, its wording as it stands, the new wording in full, the decision it carries out with its date, and its `change` in Russian. These are written later as proposals on the base nodes and are not put to the owner again.
2. **Questions for the owner.** For each: the problem in plain words; the base node or nodes concerned; the recommendation and its basis first, from the rules and the owner's rulings; then each option, with what a person sees, its cost and the risk that remains; and the full new wording of each node concerned under the recommended option. Group the questions by the part of the base they concern.
3. **Dropped items**, each with the reason.
4. A short Russian summary of each question, for the page.

Follow the rules on how a rule is written, which `node D:/SpecSheriff/.claude/vt/writing-rules.mjs` prints, for every new wording. Follow the owner's rules in `D:/SpecSheriff/.claude/vt/rules.md` from "A proposal is based on the owner's earlier rulings on its subject" onward.

## Your final report

Short, in English: how many changes are already decided, how many questions remain for the owner, grouped by part of the base, and how many items you dropped.
