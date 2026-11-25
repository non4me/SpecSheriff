# T25, stage 2, group 8: round b, the first review applied

You apply the first review of the drafts of group 8. The brief for group 8, `briefs/t25-group8-brief.md`, still holds: its constraints, its lessons and the phrases of the owner's English.

## What to read

The six reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`:
- `review-g8-a.md` to `review-g8-d.md`, the reports of the four specsheriff-rule-reviewer agents;
- `english-g8-fast.md` and `english-g8-thorough.md`, the findings of EngStickler's two readers.

Each file ends with the main session's decisions. Apply every finding that those decisions apply, in the words that the reports give. Where a reviewer replaces a whole sentence and a reader replaces a phrase in the same sentence, take the reviewer's sentence. Then apply the reader's phrase inside it where it still fits. Where `english-g8-fast.md` and `english-g8-thorough.md` give different words for one phrase, `english-g8-thorough.md` wins, unless a decision says otherwise.

## The main session's decisions that change a draft beyond the reports' own words

1. **"On a commit" and "on a push".** Rules 10.2 and 10.12 of the base say "on a commit" and "on a push", and EngStickler's list of calques gives "at a commit" as a calque. Write "on a commit" and "on a push" in every draft of the group. Leave agreed nodes outside the group as they are.
2. **"The hook run when a session starts"** is the one name of that hook in every draft. Never make "the session start" the subject of a verb.
3. **The skills node is split into four**, as review g8-d's finding 1 says: the list of the skills keeps s-kq6wmdud9c7j2k9, and `spec-init`, `spec-remove` and `spec-settings` each get a node of their own. Each new node gets a new sid, checked to be unique across `specs/`, `moved/` and `tools-drafts.json`, under the keys `new:tools-15-spec-init`, `new:tools-15-spec-remove` and `new:tools-15-spec-settings`. Each implements the rows or rules that review g8-d names. Each carries the decisions of its skill that review g8-d's finding 6 lists.
4. **`spec-init`'s steps.** Under option A of the third question below, the node of `spec-init` states each step that an agreed node requires of it. Check s-7unxytshhc4md54 for which values `sheriff init` leaves to be set, and state the question about `code`, `tests` and `testCommand` if that node requires it. Keep the step of committing only if an agreed node requires it. Otherwise, `stage3` removes it from SKILL.md. `stage3` also brings SKILL.md into line with s-7unxytshhc4md54 on the approval of the specification. Add a todo to s-kq6wmdud9c7j2k9: `spec`, `spec-review` and `spec-adopt` are to be described in nodes of their own, which no node does yet.
5. **The change to `s-st6td4mua9uqt9z` from review g8-c (A6)** goes into that draft, since it is in the group.
6. **Three questions for the owner.** Write them in `group8-notes.md` under "Questions for the owner". Each opens with the recommendation and the ruling or rule it rests on. Then each option follows, with what a person sees, and every cost and risk that remains. The drafts assume the recommended answer, and the notes say which sentences change under the other answer.
   - **Question 1: the order of the pre-commit hook against "right after the first step" in rule 10.12** (review g8-a, finding 2.1, and base question 2). Recommendation A: the hook runs the project's other tools before `sheriff validate`, and after stage 2 rule 10.12 says "before any other check" instead of "right after the first step". That wording states what the exception is for, as the `change` of the agreed exception says. Option B: rule 10.12 stays, and `sheriff validate` gains an option that makes only the two checks of structure. The hook runs it right after the first step and runs `sheriff validate` again after the project's other tools. Under both options, the hook refuses the same commits. B adds an option to the agreed list of commands and to the agreed node of `sheriff validate`, and runs the checks of structure twice.
   - **Question 2: whether `sheriff guard` judges only the nodes that an edit adds or changes** (review g8-b, base question 4). Recommendation A: yes, as the reason of rule 10.3 says: an agent that could set an approval status could make a decision that only the owners make. After stage 2 rule 10.3 says so. Under option A, an edit to a file that holds an untouched node approved with a wording that no approval is in force for passes. `sheriff reindex` then makes that node a draft after the edit and names it. Option B: the literal words of rule 10.3. `sheriff guard` refuses any edit after which such a node is approved, wherever it is, and names the node. The agent then sets it to draft. B reads every file of the specification before each edit.
   - **Question 3: the skills that no node describes** (review g8-d, finding 7). Recommendation A, as decision 4 above says: the node of `spec-init` states what agreed nodes require of it, and a todo plus a task after T25 describe `spec`, `spec-review` and `spec-adopt`. The basis is the principle "Nothing unapproved is implemented", which these skills do not yet meet. They do not meet it in the approved nodes either, so the gap is not new. Option B: group 8 describes those three skills now, which adds three or more nodes and at least one more round of review.
7. **Base question 1** (Node.js missing) leaves the list for the base specification. The page shows in Russian the refusal that the approved node had and why the draft drops it, so the owner's agreement to the group settles it. Questions 2 and 4 become questions 1 and 2 for the owner. Question 3 stays in the list for the base specification.
8. **Found and owed**, for your notes under "Changes still needed outside the group": rule 10.2 names only the tests on a push, while rule 10.12 and row 10.1.37b also check the project's own tools on a push.
9. **The readers' findings that only ask for more context** around a sentence whose earlier sentences or citations already give it are rejected, and your notes say so in one line each.

## What to write

1. `fix-group8-b.mjs`: on its first run, it copies `tools-drafts.json` to `tools-drafts.before-group8-b.json`; on every run, it rebuilds the group's keys from that copy. Run it twice, and check that both runs give the same file. Check that no key outside the group and its new keys differs from the copy.
2. `english-group8b.md`: the final English of every node and proposal that this round changes, each in full, under its key and title, for EngStickler's readers.
3. In `group8-notes.md`, a section "Round b" that says, for each finding of the six reports, how you applied it or why you did not. Update "Questions for the owner", "Questions for the base specification" and "Changes still needed outside the group".

Do not change anything under `specs/`, and do not touch `.ai_docs/INDEX.md`, `tasks.md` or `t25-one-thought.md`. Make no commit.

## Your final report

Short, in English: the keys changed or added, the three questions for the owner as the notes state them, and anything you could not settle.
