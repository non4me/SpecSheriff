# Notes on base-questions.md

## Round b

The brief is `fix-brief-bq-b.md`. The version before this round is `base-questions.before-b.md`, a copy made before the rewrite. The reports are `review-bq-a.md`, `review-bq-b.md` and `english-bq-fast.md`. Nothing under `specs/`, in `moved/` or in `tools-drafts.json` was edited, no commit was made, and `INDEX.md`, `tasks.md` and `t25-one-thought.md` were not touched.

### How the file was reorganised

The file now has the four sections of the brief, then the dropped items and the Russian summary:

| Section | Items | From the first version |
|---|---|---|
| 1. Changes made without asking | 3 | "stands" in three appendix nodes (review A, 1.7); question 17; the rename in rules 1.3.2, 10.6 and 10.7 (review A, 1.6) |
| 2. Proposals that carry out a decision | 9 | changes 1.1 to 1.6; 1.7 (rule 1.3.3); question 6 merged into 2.4; a new proposal 2.8 on rule 1.5.2; question 10's wordings as 2.9 |
| 3. New proposals for agreement | 8 | questions 8, 9, 11, 12, 14, 15, 16, 18 |
| 4. Questions for the owner | 7 | questions 2, 3, 4, 5, 7, 10, 13 |
| 5. Dropped items | 16 | the 15 earlier items, and question 1 |

Three choices that the brief left to the author:
- **Question 6 and change 1.4 share one proposal, 2.4.** Both change rule 10.3, and the owner's rule "A change to an approved wording is proposed as a single, complete new wording" asks for one wording of a node. The proposal records both decisions.
- **Proposal 2.8, on rule 1.5.2, is new.** It holds the sentence that review A's finding on 1.6 asks for. That sentence carries out the same rulings of 2026-11-17 as proposal 2.6, so it is a proposal of section 2. Without its first sentence, "binds" in rule 9.5 would also catch code whose SpecTag says that it implements no rule, which review A's 7.2.7 line raised.
- **Question 10's wordings are proposal 2.9.** The brief narrows question 10 to the one point that the note of 2026-11-12 left open. The wordings that carry out that decision fit section 2's definition, so they are there, written under the recommended answer of question 4.6, and question 4.6 says what changes under the other answer.

The rename of "carries no SpecTag" in rule 1.3.3, which the brief lists under section 1, is in proposal 2.7, since rule 1.3.3 is a proposal now. The rewritten reason of rule 1.3.3 no longer holds that phrase.

### Review A (`review-bq-a.md`)

**G1, the `type` of each decision.** Applied: each decision for `meta.decisions` has `type` textual, and the file says so once at the top.

**G2, Russian for the new wordings.** Applied: every new or changed wording in sections 2 to 4 has its Russian rendering and a Russian `change` field.

**G3, what a person sees.** Applied to question 4.3 C, question 4.4 C and D, question 4.5's options and the proposals of section 3, which say what a person sees in one line each. Questions 8 and 9 of the first version have no options now.

**G4, how section 1 reaches the owner.** Settled by the brief: section 1 holds only what is made without asking and reported in one line; section 2 holds the proposals shown to the owner. The introduction of each section says so.

**Checklist lines:**
- 1.2.3, row 10.1.28a's "since they follow only approved wordings": moot. Question 4.4 now recommends B, and option A's wording is no longer written out.
- 7.2.1, question 9's "a skill … works with": applied, in the words of review A's text: "the agent of a session in which a skill runs, and any agent that the skill starts, work with those of that person's session".
- 7.2.3, question 3's "the same place in the structure": applied: the row now says that the same titles lead to the section, in review A's words.
- 7.2.4, question 9's "the user": applied: "the person on whose machine it runs". Question 8's "the method": applied: "SpecSheriff", in review A's words.
- 7.2.7, 1.6's "binds": applied by proposal 2.8, which says that a SpecTag naming a node other than a rule binds nothing and that a SpecTag saying that code implements no rule binds that code. Question 3's citation of a folder: applied: §s-5x737t9nee4zgaa, with "the section for the stack and the technical debt section" citing §s-vj7ercem526zd6v.
- 7.3.2, 1.5's push item: applied: two items, in review A's words.
- 7.4.1, 1.3's "run in three steps": applied in proposal 2.3: "run in the following steps", review A's own fix.
- 7.4.2 and the pairing test, the reasons of 1.3, 1.6 and 1.7: applied as the brief settles: each proposal rewrites its reason, and the `change` field says so. These three reasons are the author's own wording and still need the reviewer. Question 8's reason: applied in review A's words.
- 7.5.2, 1.1's sentence of 45 words: applied: split in review A's words. 1.5's push item: applied by the split.
- 7.6.3, 1.3's example: applied in review A's words.

**The assessments (Оценка).**
- 1.3, integrity and insufficiency: applied: the example changed, and the paragraph says "after the first step and before any other check".
- 1.5, consistency and insufficiency: applied: the item matches row 10.1.37b, and the condition on `approved` stands in the item on the tests only.
- 1.6, integrity: applied as change 1.3 and proposal 2.7. Insufficiency: applied as proposal 2.8.
- 1.7, integrity: applied as change 1.1.
- Question 1: applied: dropped item 16.
- Question 2, integrity: applied: rule 1.3.2's fourth item is named and gets a new wording under either option.
- Question 3, integrity and insufficiency: applied: the folder's citation, the row's wording, the risk in review A's words, and rule 11.1.1. Rule 11.1.1 keeps its check: row 11.3.5 is narrowed to the names of the files of the technical appendix rather than deleted. That narrowing is the author's own and still needs the reviewer.
- Question 4, integrity and insufficiency: applied: s-9rtrj24myzjvshu and the judgement on code are named in option A's cost, and the agreed node s-33fw3ga4ctd94dq settles how a SpecTag at the start of a file is told apart.
- Question 5, integrity: applied: rule 9.6 is named under option A. The recommendation moved to B: review A asked that the basis weigh rule 1.5.2's reason, which favours B, and the owner's rule "An error is fixed at its source, never written into the design" points the same way.
- Question 6, justification: applied: proposal 2.4.
- Question 7, consistency: applied: option B of the first version is gone, and its place is the change to rule 10.10. Insufficiency: applied: the gap is stated, and option B of question 4.5 is recommended.
- Question 8, integrity: applied: section 10's text changes to cover the procedures that SpecSheriff provides; see below. Insufficiency: applied: the rule names the entries that `sheriff remove` deletes.
- Question 9, integrity: applied: the `implements` link comes from s-tnz9zgqx8c629a7. Insufficiency: applied: "the person on whose machine it runs".

**Item findings.**
- 1.1, the split sentence: applied in review A's words, English and Russian.
- 1.3, "after the first step and before any other check": applied in review A's words. The example: applied in review A's words. The doubts on "run in three steps" and on the reason: settled by the brief; applied in proposal 2.3.
- 1.5, the two items and the `cites` link to s-2fau85dfyyeq66m: applied in review A's words.
- 1.6, the sentence for rule 1.5.2: applied in review A's words, in proposal 2.8, with a second sentence on a SpecTag that says that code implements no rule, for the reason given above. The rename in four other nodes: applied as change 1.3 and in proposal 2.7. The second example of rule 10.6 stays, since the symbols it describes have no SpecTag at all, and change 1.3 says so. The doubt on the reason: settled by the brief; applied in proposal 2.6.
- 1.7, the three appendix nodes that still say "stands": applied as change 1.1. The doubt on the reason: settled by the brief; applied in proposal 2.7, which keeps the owner's sentence of 2026-11-20 on an agent approving on an owner's behalf.
- Question 1: applied: dropped item 16.
- Question 2, the reason: applied in review A's words. Rule 1.3.2's fourth item: applied. TERM, a gloss of "wording" as a baseline in the docs: recorded here for the docs; no node changes.
- Question 3, the cell of the row: applied in review A's words, with the `cites` link to s-5x737t9nee4zgaa. The risk: applied in review A's words, with "base.json" written as "technical appendix", since the file of a project without domains is not named in any node. Rule 11.1.1: applied, as above.
- Question 4, the two agreed nodes in option A's cost: applied. Who tells a SpecTag at the start of a file from a symbol's SpecTag: applied, naming s-33fw3ga4ctd94dq. Option C labelled: applied. The example: applied in review A's words, as the brief settles.
- Question 5, rule 9.6: applied. The reason taken out of row 10.1.28a's text: moot under the new recommendation, B; option A's cost names what changes. The weighing of rule 1.5.2's reason: applied, and it moved the recommendation to B.
- Question 6: applied as proposal 2.4, with the new item in review A's words, English and Russian, and the risk for this repository in one line.
- Question 7, option B replaced with the change to rule 10.10: applied. The stated risk, a quoting document: applied: under the new option B, the risk is restated. The doubt on the gap: settled by the brief; the gap is stated, and option B of question 4.5 is recommended, because the owner's ruling of 2026-11-17 restricts what such a SpecTag names and because no new setting is needed.
- Question 8, not a question of timing: applied: proposal 3.1. The basis: applied: the defect is the `implements` links that do not hold. "The method": applied, review A's wording for the title, the text and the reason. The doubt on the entries: settled by the brief; the rule names the entries that set the approval status, the `strict` flag and the chosen extensions, and says what `sheriff remove` leaves, as the agreed s-7unxytshhc4md54 says. Section 10: settled by the brief; the rule stays in section 10, whose text changes. Section 10 already holds the approval procedure (rule 10.6), the procedure that turns the `strict` flag on (rule 10.7) and the rule on procedures that write the specification (rule 10.13); a new section for one or two rules would split the procedures across sections. Section 2, the only other candidate, holds the parts of the specification.
- Question 9, not a question of timing: applied: proposal 3.2. "The user": applied in review A's words, with the title "Who chooses an agent's model and reasoning effort". The `implements` link from s-tnz9zgqx8c629a7: applied. The skills named only as the place where an agent runs: applied, in the problem and in the `change` field.

### Review B (`review-bq-b.md`)

**Checklist lines.**
- 7.1, rule 3.2's two sentences that read as contradicting rules: applied: review B's sentence with "instead", and the sentences reordered so that the term defined once comes last, "wherever it is defined". Rule 12.6's "other than its RecordType and …": applied in review B's words.
- 7.2.3, row 10.1.6's "a place that an extension … gives to terms": applied in review B's words. Rule 12.2's "is an object": moot, since the sentence is cut.
- 7.2.4, "uses" in the Domains rule, where `uses` is also a link type: applied: the title is "A term defined in a domain", the text speaks of citing and linking, and rule 3.2 and its reason say "needs", the owner's word on 2026-11-12. Review B's own wordings said "uses"; the change follows review B's finding.
- 7.2.6, rule 8.6's list of what is forbidden: applied in review B's words: a node "whose nodes need no title".
- 7.2.7, "folder" in rule 3.2: applied: review B's "one of the parts into which the base specification is divided (§s-qmmzf9nksfsa3qp)". "uses" in the Domains rule: applied as above.
- 7.4.2, rule 3.2's reason: applied: review B's reason, with "needs". Rule 8.6's third sentence of the reason: applied: cut.
- 7.5.1, rule 12.2's sentence and question 15's paragraph of rule 12.6: applied: both cut.
- 7.5.2, rule 12.6's sentence of 37 words: applied: review B's two sentences. Row 10.1.6: applied in review B's words.
- Pairing test, rule 8.6: applied by the cut.

**The assessments.**
- Question 10, consistency, integrity and insufficiency: applied: option C dropped, rule 3.2's reason replaced, the technical appendix allowed, the move to the contracts section before another domain cites the term, the `cites` links of rule 3.2 named, the decision of 2026-11-12 written for the new rule's `meta.decisions`. "Folder" no longer appears in rule 3.2. The Domains rule cites rule 4.1 (s-vj7ercem526zd6v) for the part of the technical appendix named after a domain, rather than row 11.3.5 (s-vghy37e3p2325ah) as review B wrote: question 4.2 narrows row 11.3.5, and rule 4.1 states that structure in any project.
- Question 11: applied as proposal 3.3.
- Question 12, redundancy and insufficiency: applied: the row says "names a RecordType" and cites rule 12.2 for a RecordType, in review B's words; the form `#<sid>` stays in s-4npdup7mjkva69y.
- Question 14, insufficiency: applied by review B's wording of rule 12.6.
- Question 15: applied as proposal 3.6, with the paragraph cut and the row kept.
- Question 16, consistency, integrity, redundancy and insufficiency: applied as proposal 3.7: rule 12.2 unchanged, a row, and no definition of "object" needed.
- Question 18, the missing `cites` link: applied.

**Verdict items.**
- Russian renderings and `change` fields, and the `cites` links of rules 3.2 and 8.6 and of the row of question 18: applied. Rule 8.6 now cites no new node, since the reason's third sentence is cut.
- Question 10, the framing: applied: question 4.6 asks only the open point; option C is dropped. Sentence 3 of rule 3.2: applied, with "needs" for "uses". Row 10.1.6: applied in review B's words. The reason of rule 3.2: applied, with "needs". The Domains rule: applied in substance, with the citation of rule 4.1 and "Before a node of another domain cites such a term or links to it" for "Where a node of another domain needs such a term", which states the condition as an act that a check can see. The example: applied in review B's words, with "the part of the technical appendix named after it". TERM, DDD's bounded context: recorded here for the docs; no node changes.
- Question 11: applied as proposal 3.3, in review B's words, with the reason's third sentence cut.
- Question 12: applied as proposal 3.4, in review B's words. The note on row numbers: applied in 3.4.
- Question 13, TERM and the evidence paragraph: applied in review B's words; option B's cost adds the meta-schema, and the Russian summary takes review B's sentence.
- Question 14: applied as proposal 3.5, in review B's words.
- Question 15: applied as proposal 3.6.
- Question 16: applied as proposal 3.7, in review B's words.
- Question 17: applied as change 1.2.
- Question 18: applied as proposal 3.8, with the `cites` link.
- Dropped item 3: applied in review B's words. Dropped item 10: applied: the sentence is cut.

### EngStickler's fast reader (`english-bq-fast.md`)

Applied:
- "The base read is" → "The base specification was read from"; "the agreed drafts of the base" → "the agreed drafts of changes to the base".
- "decision Р8", with a Cyrillic letter → "decision R8", in English and in the summary.
- «Оценка» and «согласованность» in the English text → "assessment" and "consistency" (change 1.2).
- "rule 1.5.2 says so" in question 2, option B → the option names rule 1.3.5.
- Every "stands" used for "is": "stands inside a symbol" → "is inside a symbol"; "may stand under any title" → "may have any title"; "stands for the folder" → "represents that folder"; "once the definition stands in the file" → "is in the file"; "stand inside a RecordType's `schema`" → "appear inside". "As it stands" stays, as an English idiom.
- "only before `sheriff validate` or after it" → "either only before `sheriff validate` or only after it".
- "the project's other own tools" → "the project's own tools that change no file", where it named them for the first time.
- Rule 10.3's first item → "leave a node approved where the edit adds that node or changes its wording or approval status … and no approval of that node's wording is in force", which the reader proposed in substance.
- "the item after an agent's edit" → "the item for the moment after an agent's edit".
- "drops that refusal outside the Domains extension" → "in projects that do not use the Domains extension"; "Rule 4.1 asks for" → "requires".
- "uses a form that the tools already read" → "uses a way of binding that the SpecSheriff tools already read".
- "what rule 10.15 means to allow" → "is meant to allow".
- "holds a project's own check … to a test" → reworded in proposal 2.4's decision: "held a project's own check that carries a SpecTag to a test written first".
- "It counts toward nothing" → "counts for nothing", in options B and C of question 4.5.
- "the owner chose that … are described" → "decided that … are to be described"; "work at the model" → "work with the model and the effort".
- "runs an agent" agreeing with "a skill": applied in the rule's text, "the SpecSheriff tools or a skill … runs".
- "The contracts section then holds" → "so the contracts section keeps"; "left that point to be asked" → quoted from the note instead.
- "a node of a kind that the specification's schema declares other than a term" → moot: review B's wording replaces it. "nothing moves there" → "nothing is moved" in the `change` field.
- "so references of both forms are then checked alike" → the sentence is gone with the options.
- "the gathered values" → "the collected values" in question 4.7; agreed nodes keep "gathered", which is their term.
- "had not been found published" → "As far as the search of 2026-11-25 could tell, that release had not been published."
- "the agreed appendix nodes that name `x-enumSource` rename it" → "are changed to name it `enumSource`".
- "which the page accepted on 2026-11-19 says" → the sentence is rewritten in proposal 3.6.
- "dropped without a word" → the option is gone; proposal 3.6 says "dropping such a keyword silently".
- "through the check of the schema" → the option is gone; proposal 3.7 names "the extension's schema".
- "so the checks of references pass it by" → "skip it".
- "the two directions" → question 1 is dropped; "grounds the approval … in" → gone with it.
- "takes the kind in" → "includes the kind"; "are approved once more" → "have to be approved again".
- "Nobody then has to know" → review A's reason replaces it. "none exists" → gone with the question's form.

Not applied:
- "is labelled with its location" → "is identified by": kept, since the owner's decision on the page of group 7 says "labelled", and the map shows a label.
- "But not:" in the example of rule 9.5: kept, since it is the form of the agreed examples of the base, such as those of rules 1.3.2, 10.6 and 10.7, and only the phrase that the rulings of 2026-11-17 change is changed.
- "the tests of the system's code and of the project's own checks and generators": kept, the agreed phrase of rule 10.2.
- The reader's notes that say "none", and its TWO READINGS where it chose the intended reading: no change, except where a LANGUAGE finding covered the same words.

### What the reviewer has not yet checked

These wordings are the author's own in round b, so a reviewer reads them before the owner sees them:
- the reasons of rules 10.12, 9.5 and 1.3.3 in proposals 2.3, 2.6 and 2.7;
- the second sentence of proposal 2.8, on a SpecTag that says that code implements no rule;
- row 11.3.5, narrowed, and the split of item 42, in question 4.2;
- rule 1.5.2 under option B of question 4.4;
- rule 10.10's second paragraph and the row under option B of question 4.5;
- option B of question 4.6;
- the text of section 10 in proposal 3.1, and the entries named in its rule;
- the Domains rule and its row in proposal 2.9, where they differ from review B's wording.

## Round c

The brief is `fix-brief-bq-c.md`. The version before this round is `base-questions.before-c.md`, a copy made before the rewrite. The reports are `review2-bq-a.md`, `review2-bq-b.md`, `english-bqb-fast.md` and `english-bqb-thorough.md`. Nothing under `specs/`, in `moved/` or in `tools-drafts.json` was edited, no commit was made, and `INDEX.md`, `tasks.md` and `t25-one-thought.md` were not touched.

The sections now hold: 1, four changes; 2, nine proposals; 3, eight proposals; 4, seven questions; 5, fifteen dropped items. Change 1.4 is new, and dropped item 3 moved into change 1.1.

### Review A of round b (`review2-bq-a.md`)

- **Checklist, 7.1 and 7.4.2 on 2.7's reason; 7.2.4 on "whoever is accountable":** applied: the reviewer's reason, with the brief's last sentence.
- **Checklist, 7.1, 7.3.2 and 7.5.2 on 2.3's reason:** applied: the reviewer's single sentence.
- **Checklist, 7.1 on 2.6's first sentence:** applied: the commas of the nit.
- **Checklist, 7.2.1 on 2.9's "the term is moved":** applied: the reviewer's second sentence, which names whoever writes the citation or link.
- **Checklist, 7.2.4 on "Adopting the method":** applied, with "the SpecSheriff plugin".
- **Checklist, 7.4.2 on 2.6's reason:** applied in the brief's words.
- **1.2, nit:** applied: section 1's introduction says that a link is not part of what an approval covers.
- **1.3, the four appendix nodes:** applied as change 1.4, in the reviewer's words.
- **1.3, the Russian of rule 10.7's example and of rule 1.3.2:** applied in the reviewer's words.
- **1.3, nit:** applied: changes 1.3 and 1.4 are made with proposal 2.6, and section 1's introduction and the summary say so.
- **2.3, the reason and "Adopting SpecSheriff":** applied in the reviewer's words, English and Russian, with the line added to `change`.
- **2.3, the cut of the sentence on CI:** rejected, as the brief says: the owner agreed to the sentence on 2026-11-24, and `docs/principles.md` holds the same sentence.
- **2.4, both fixes:** applied: the Russian `change` in the reviewer's words; the problem of the second decision in the brief's words, "required a test written first for the code of a project's own checks and generators".
- **2.5:** applied in the reviewer's words, with "that run after" from the fast reader.
- **2.6, the reason:** applied in the brief's words, with Russian to match. **The Russian of the first sentence, the integrity finding and the nit:** applied; the four appendix nodes are named in 2.6 by pointing to change 1.4. **The second example:** applied as a proposed example. **The first example's "But not:":** replaced by the brief's sentence.
- **2.7, the reason:** applied in the reviewer's words, except the last sentence, which is the brief's. The phrase on the pairing test and "rule 1.3.3 becomes a proposal" are replaced by the brief's words.
- **2.8:** the agreed Russian of the first two sentences is kept, here and in questions 4.3 and 4.4. The "binds nothing" sentence moved into the third paragraph, after "…bind the whole file", and `change` says that two paragraphs change. The origin is now "Reviewer A of the first review". "treats it as binding" became "treats such a SpecTag as one that binds the code".
- **2.8, the check of rule 9.3:** rule 9.3 (s-8xw4mgvpexyvw5q) is "The SpecTag": "A SpecTag binds a rule to the code that implements it and to the tests written for it." The rule that says that code implementing no rule has a SpecTag saying so is rule 1.5.2. The sentence now says that neither rule 1.5.2 nor rule 9.3 says whether that SpecTag binds the code.
- **2.9, rule 3.2 and the Domains rule's second sentence and example:** applied in the reviewer's words, English and Russian; then rewritten for B of question 4.6, as below.
- **Terms ("binds", "accountable"):** nothing changes in the nodes; "accountable" is gone with the new reason of 2.7.

### Review B of round b (`review2-bq-b.md`)

- **Checklist, 7.1 on 4.2's row:** applied with the reviewer's second sentence, in the words of "path of titles" that the brief asks for.
- **Checklist, 7.2.1 on rule 1.3.2's fourth item:** applied by its cut (4.1).
- **Checklist, 7.2.3 and 7.2.7 on 3.1, and 7.5.2 on its second sentence:** applied: the reviewer's wording, with the `cites` links to s-kgbzk2ph9e6jfb4 and s-hheus6f395ynqvc.
- **Checklist, 7.2.7 on row 11.3.5:** applied: the citation of s-vj7ercem526zd6v.
- **Checklist, 7.3.1 on rule 10.10's title:** applied: "What a SpecTag names".
- **3.1, the doubt on the entries that only an owner records:** settled by the brief; a line "Risk:" in two sentences, in English and in Russian. **The nit on `spec-init`:** applied: s-ttsc8tpnu46q53s gains an `implements` link, and the cost counts four links.
- **3.2:** the wording fix, the fix to `change` and the example are applied in the reviewer's words; the Russian summary line follows.
- **3.3:** the first nit applied, with an exception for the English-only rewording of the reason's second sentence that the readers asked for; the third nit applied, a domain's header added to what a person sees. The second nit, on a project's own kind: rejected, as the brief says: the kind's declaration in the schema says whether its nodes have a title.
- **3.4, 3.5, 3.7, 3.8:** the nits applied: the note on row numbers names 3.4, 3.6, 3.7 and 3.8; 3.5 has a decision for `meta.decisions`; 3.7 says that its row goes after the row of 3.4; 3.8 cites s-qmmzf9nksfsa3qp.
- **3.6:** the second row applied, with its basis in JSON Schema 2020-12 (Core, 10.3.2.3) as the reviewer read it. The two rows stay apart, as the brief says.
- **4.1:** the fourth item of rule 1.3.2 is cut under either option, with the reviewer's `change` in Russian; option B's cost says that the item "is still removed".
- **4.2:** both fixes applied, the second sentence of the row in "path of titles" words; the `checks` link of row 11.3.5 to s-qmmzf9nksfsa3qp is removed and moves to the new row; the split of item 42 is spelled out.
- **4.3:** both nits applied to row 10.1.26, with Russian.
- **4.4:** the three findings applied: the added nodes in "Nodes concerned" and in B's cost, the clause of row 10.1.26 under B, the sentence on the top-level object, and "Cost: none" in D.
- **4.5:** the three findings applied: the new title, the added risk and the wording of what a person sees.
- **4.6:** rewritten as the brief decides: B is recommended, with the ruling's words as its basis; A stays as the other option, with A's reason from the review; B's first sentence takes the review's wording, with the part of the technical appendix; B's "What a person sees" names that part too.
- **Proposal 2.9 for B:** the Domains rule opens with B's first sentence, keeps review A's second sentence and its reason "so the contracts section keeps only what the domains share"; the second row of table 11.3 joins it, with its node and its code in the list of other nodes that change; the note says what changes under A.
- **4.7:** ready; the readers' findings are applied.
- **Dropped item 3:** moved into change 1.1, as the reviewer suggests.

### EngStickler's readers (`english-bqb-fast.md`, `english-bqb-thorough.md`)

Applied, besides the settlements of the brief ("Integrity:" and "The main session" kept; "keeps the node agreed" → "and the node stays agreed"; "The system's implementing code" kept; "path of titles"; the page named in 3.4; "the item in"; "is removed"; "is moved"; "comment property"):
- 1.1 and 1.3: "take/takes the same replacement/rename" → "get/gets"; 1.2: "assessment for consistency" → "consistency mark"; 1.3: "in its earlier words" → "in its earlier wording".
- Section 2's introduction: "a node that contains a sentence breaking a rule"; "into line with the rule".
- 2.2: "It labels a node … with its location"; "while the rest of the map stays in view", English only.
- 2.3: "only before … or only after it"; "the structure checks"; "the rest of the project's own tools".
- 2.4: "may make"; "requires a test written first only for the system's code".
- 2.5: "that run after"; "None of a project's own tools for a git hook runs".
- 2.6: "is treated as rule 9.5 says"; "The warning in the second case and the refusal in the third"; the reason in the brief's words.
- 2.7: "the change to the English word", "the change to the reason".
- 2.9: "in a part of the base specification where a chosen extension of the guidelines allows terms to be defined"; "when the base specification is divided into domains".
- Section 3's introduction: "but for which the rules leave no real choice".
- 3.1: "the change to its text".
- 3.2: "at present only the reviewer's, works with"; "ran with the models"; "In section 10, whose text 3.1 rewords".
- 3.3: "locates a term by its name"; "A requirement that is a node in a cell", English only.
- 3.4: "refuses a `$ref` that names no RecordType when `sheriff types` runs".
- 3.5: "so this proposal carries that node out".
- 3.6: the title with "leaves to its RecordType the fields"; "no sentence is added to rule 12.6".
- 3.7: the sentence rewritten after the thorough reader, with "is changed in stage 3 to say so" for the fast reader's future tense.
- 3.8: "the reference checks".
- 4.1: "earlier names" now says that earlier releases wrote them for the kinds since renamed; "without an owner's approval"; "without any owner's approval"; "lapses when that wording changes, and not otherwise".
- 4.2: "worded in terms of folders"; "is moved"; "contrary to the reason given for rule 4.1"; "is recorded on the new row too"; "a commit in a project … is refused".
- 4.3: "is moved"; "binds, by SpecTags at its start, a file whose symbols cannot be identified"; "names in its message the rule that the SpecTag at the file's start names"; "every binding check"; "gets the technical replacement".
- 4.4: "every generated file is exempted from those rows to solve a problem with one file"; "the node on the entry … is removed"; "the node on what a RecordType generates … says that the `$comment` is written"; "no change to another RecordType can be committed"; "comment property" in all three places.
- 4.5: "a SpecTag that is in a tool and names"; "a SpecTag within those paths that names"; "although such a SpecTag counts for nothing".
- 4.6: "Cost:" of B no longer says "as A"; "is moved" in every place.
- 4.7: "New information"; "The search of 2026-11-25 found no sign that that release has been published."; "the migration and the schema all change"; "in which `enumSource` has no prefix"; "changed to call it `enumSource`".

Not applied:
- "the repository's own tools" → "the project's own tools" in 3.1 (fast reader): kept, since "the repository's own tools" is the term of rules 9.1 and 10.10, the sense that the reader's own condition excludes from the replacement.
- "Integrity:" → "Consistency:" (thorough reader): kept, as the brief settles.

The readings that the brief asked to resolve are resolved in the words listed above: section 2's introduction on the reviewer's check; 2.3's example, which names the scan for secrets as one of the project's own tools for the pre-commit hook; 2.4's "all three" and "this risk", and "already says both", which now names the two things; 2.6's warning; 4.1's "earlier names"; 4.2's "a commit in a project".

### Wordings written by the author in round c, which no report dictated

- Section 1's introduction, in the sense that the brief and review A give.
- Change 1.1's second replacement and its sources, from review B's suggested reason, and its report line; change 1.4's introduction and report line.
- Section 2's introduction, its sentence on the reviewer's check.
- 2.2: the Russian «карта подписывает его расположением» and the added line of `change`.
- 2.3: the example's sentence on the scan for secrets, in English and in Russian; the added line of `change` on the example.
- 2.4: the integrity line that names what s-st6td4mua9uqt9z says.
- 2.5: the updated `change`.
- 2.6: the second item, "the commit passes, and a single warning for all such code says that such code exists"; the third line of `change`.
- 2.7: the Russian of the `change` line on the reason.
- 2.8: the sentence on rules 1.5.2 and 9.3; the added clause of the Russian first paragraph; the `change`.
- 2.9: the first sentence under A; the wording of row 10.1.6 and its Russian; the second row of table 11.3 and its Russian, with its `change`; the updated `change` of the Domains rule.
- 3.1: the risk line, in the sense the brief gives, in English and in Russian.
- 3.2: the updated `change`.
- 3.3: the note on the reason and the added line of `change`.
- 3.4: the sentence on row numbers.
- 3.6: the paragraph on the reverse case and the updated `change`.
- 4.1: the wording on the names that earlier releases wrote; "names nobody who sets the status".
- 4.2: the row in "path of titles" words and its Russian; the basis sentence on the check of a domain's sections; the spelled-out split of item 42; the updated `change`.
- 4.3: the added line of row 10.1.26's `change`.
- 4.4: the wording of B's cost list and of the added line of `change`.
- 4.5: "rule 10.10's title and a sentence of its text"; the added clause of `change`.
- 4.6: the problem, the basis and the options, in the sense that the brief and review B give.
- The Russian summary.

The second row of table 11.3 deserves the reviewer's attention: review B's first sentence of the Domains rule, read literally, also covers a term that no node cites. The row requires at least one citing node, so that such a term may stay where it is.

## Round d

The brief is `fix-brief-bq-d.md`. The version before this round is `base-questions.before-d.md`, a copy made before the edits. The reports are `review3-bq-a.md`, `review3-bq-b.md`, `english-bqc-fast.md` and `english-bqc-thorough.md`. Nothing under `specs/`, in `moved/` or in `tools-drafts.json` was edited, no commit was made, and `INDEX.md`, `tasks.md` and `t25-one-thought.md` were not touched. The counts of the sections did not change: 4, 9, 8, 7 and 15.

### Review A (`review3-bq-a.md`)

- **Checklist, 7.1 on 1.4 (the garden paths in s-weuyx98r7c923ab and s-3xx2eukc8gtd2tx):** applied in the reviewer's wordings, English and Russian, each Russian sentence written in full.
- **Checklist, 7.1 on 2.9 (row 2's "in one domain", and the rule's term that no node cites):** applied: the rule and row 2 take the reviewer's wording, as the brief settles.
- **Checklist, 7.5.2 on 2.7 ("on an owner's behalf" twice):** applied: "as the rule on such approvals allows", with the Russian.
- **2.9, consistency (rule 3.2 "let" against the refusal under B):** applied: rule 3.2 takes the reviewer's "may instead require one of the parts … to define the terms that no other part of the base specification needs", with its Russian and `change`.
- **1.1, nit on section 1's introduction:** applied in the reviewer's words, with "the nodes that restate it or name its check".
- **1.3, nit:** applied in the reviewer's words.
- **1.4:** applied; "in the number and gender that the sentence needs" is gone, since each Russian sentence is given.
- **2.2, nit:** applied: «его» is dropped in the Russian and in `change`.
- **2.7:** the first sentence of "Decisions carried out" is the reviewer's; the cut of the reason is applied.
- **2.9, item 1:** applied; under A the first sentence takes the same words with "may be defined".
- **2.9, item 2:** applied, with the note on A that rule 3.2 then says "may instead let … define".
- **2.9, item 3:** applied: the agreed Russian of rule 3.2's first sentence, «Если разделу необходимы собственные термины, их добавляют в контракты.», and its ending «…отклоняются.» are kept, and `change` says so.
- **Nit for the main session** (the page shows 2.1, 2.2, 2.4, 2.5 and 2.8 in full): nothing changes in the file, as the brief says.

### Review B (`review3-bq-b.md`)

- **Checklist, 7.1 on 4.2's row:** applied: the reviewer's wording, which leaves the first top-level node of such a file out and starts the path of titles below it.
- **Checklist, 7.1 on the second row of table 11.3:** settled by review A's wording, as the brief says.
- **Checklist, 7.2.7 on the second row's citation:** applied: both rows of table 11.3 cite s-vj7ercem526zd6v and have a `cites` link to it, since neither has a `checks` link to that node.
- **Checklist, 7.3.2 on 3.2:** applied: the sentence is split, with "uses" from the brief.
- **3.1, the sentence on `spec-init`:** applied in the reviewer's words. The `implements` link from s-ttsc8tpnu46q53s to the new rule stays, since `spec-init` runs `sheriff init`.
- **3.1, the risk line:** applied: the reviewer's sentences on the extensions, English and Russian, and the addition to the summary line.
- **3.2:** applied.
- **3.5:** applied: the reviewer's sentence on the existing `checks` link.
- **3.6:** applied: the reviewer's sentence on how each row is checked; the title now covers both rows, in the author's words.
- **4.2:** the row in the reviewer's wording; row 11.3.5 no longer adds a `cites` link, and the text says that its `checks` link serves. The nit on §s-5x737t9nee4zgaa: rejected for now, as the brief says: the agreed rule 8.5 cites the same node in the same way.
- **4.3, nit:** applied: "as follows (§s-kgbzk2ph9e6jfb4):", Russian «следующим образом».
- **4.4:** the second clause of row 10.1.26 under B and its `change` field are applied; "Nodes concerned" names s-h5rfyy9j8nnhx62, s-suv42g8r3ra2h6b and s-dbk2vyeg8z5jxna.
- **4.5:** the `cites` link to s-hheus6f395ynqvc and the split of the risk sentence are applied.
- **4.6:** rule 3.2 takes review A's wording, as the brief settles; rule 3.2 joins "Nodes concerned"; option A's cost says that rule 3.2 then keeps "let … define"; "Reason for A" begins as the reviewer proposes. The summary nit, «так следует из вашего решения», is applied.
- **Row 10.1.6:** the `cites` link to s-ypa92gpcj3f5zj8 that round c added is removed, as the brief says, and the text says that the `checks` link serves.
- **Section 5, the summary nit on 3.6:** applied: «ни …, ни …».

### EngStickler's readers (`english-bqc-fast.md`, `english-bqc-thorough.md`)

Applied:
- The introduction: the brief's sentence for "gathers what … deferred"; "has already decided on"; "how each finding in each round's reports was addressed".
- Section 1: "does not need an owner's agreement". 1.1: "a technical replacement that is due the next time"; "all three of which are drafts".
- Section 2's introduction: "A proposal is not checked by specsheriff-rule-reviewer where it only carries out a decision".
- 2.3: "nodes whose structure has passed the structure checks", with the Russian «проверки структуры».
- 2.4: "`sheriff guard` judges only a node".
- 2.5: "Decisions carried out"; "the check has nothing to examine there".
- 2.6: "Decisions carried out"; "is treated as rule 9.5 says, whether it carries no SpecTag or its SpecTags bind nothing"; "its `strict` flag is off" in the first example.
- 2.7: "justifies the items of the text one by one"; "Nobody approves the section itself.", English only, with a line added to `change`.
- 2.8: "Decisions carried out"; "gains one clause".
- 2.9: rule 3.2's last sentence, "one term that names two things is refused, and so are two terms that name one", English only; the decision's problem "It was not settled where a term is defined when the base specification is divided into domains."
- 3.1: "as the agreed s-7unxytshhc4md54 already says"; "sets a repository up for those tools", with the Russian «для этих инструментов».
- 3.2: "works with" → "uses" in the rule, its example and `change`, and in the problem and the decision, which paraphrase the ruling rather than quote it; the title; "belongs to task T34".
- 3.3: "except for an English-only rewording"; "has no name and so no location".
- 3.5: "brings the base into line with that node".
- 3.6: "establishes that a variant does not write"; "so the two rows stay separate".
- 3.7: "after the row that proposal 3.4 adds".
- 3.8: "or, for a fragment of a format, in the contracts section".
- 4.1: "the kinds that have since been renamed"; "even where the change is made by one of the node's owners", English only; "without the approval of any owner".
- 4.2: "moves to the new row"; "one row of the main table that applies in every project".
- 4.3: "as in a Python entry point"; "its code that is outside every symbol and is not an import", in the recommendation, in option A, in rule 1.5.2 under A and B, and in row 10.1.26.
- 4.4: the title, "for which it holds a definition"; "gains a description of JSON Schema as a language"; "these nodes agreed in group 7 change"; "added to the wording of question 4.3".
- 4.5: "and the refusal names its file and its line"; "its second paragraph becomes the following, while …".
- 4.6: "as soon as only that domain cites it"; "so a check can determine it"; "gives those words priority", and "gives that choice priority" in 4.7 for the same phrase.
- 4.7: "would forbid"; "will stay valid only if"; "the `x-` prefix on both `identifierOf` and `enumSource`"; "A search on 2026-11-25".

Not applied, as the brief settles: "rename" where it names what a decision renames, such as the title of change 1.4 and "make the same rename" in 2.6; "A `TableRule` has a title, a text and a reason"; "The system's implementing code"; "the node on how a symbol carries its SpecTags"; "stays valid however many domains cite it". Moot, since review A's or review B's wording replaces the sentence: the readers' findings on the first sentence of the Domains rule, in 2.9 and 4.6, and the thorough reader's on "gets the same rename" in 1.3 and on "the rename of change 1.3" in 2.7.

The readings that the brief asked to resolve:
- 2.9 and 3.6: each new row is shown on its own, in English and then in Russian.
- 3.8: the problem says that the contracts section is a section of its own within the base specification, citing rule 3.1 (s-z6tq6a3btnvvwx7).
- 4.7: "neither `identifierOf` nor `x-enumSource`", and option A names both keywords.
- The introduction's first sentence takes the brief's words.

### Wordings written by the author in round d, which no report dictated

- 2.7: the line «Во втором пункте поправлен только английский текст.» in `change`.
- 2.9: the list form of the note on A; the line of rule 3.2's `change` on the English-only last sentence; "Links: none added. The row's `checks` link to s-ypa92gpcj3f5zj8 serves for the new citation." for row 10.1.6; the `change` of the first row of table 11.3; the updated `change` of the Domains rule.
- 3.6: the title, "Two rows of table 12.12: `additionalProperties` and `unevaluatedProperties` at the top level of a RecordType variant and of a RecordType that has variants".
- 3.8: the sentence on the contracts section, and "No row of table 12.12 checks rule 12.1's requirement".
- 4.2: the sentence on row 11.3.5's links.
- 4.4: the Russian of the second clause of row 10.1.26 under B, which keeps «кроме импортов».
- 4.6: option B's "What a person sees", reworded to the reviewer's condition; "New wording under B", with rule 3.2's phrase.
- 4.7: option A's "What a person sees", which names `x-identifierOf` and `x-enumSource`.
- The summary: the line on 2.9.

## Round e

The brief is `fix-brief-bq-e.md`: the English only, no change of meaning. The version before this round is `base-questions.before-e.md`. The reports are `english-bqd-fast.md`, `english-bqd-thorough.md` and `english-bqd-new29.md`. Nothing under `specs/`, in `moved/` or in `tools-drafts.json` was edited, no commit was made, and `INDEX.md`, `tasks.md` and `t25-one-thought.md` were not touched.

### Applied

- The introduction: "the questions about the base specification, and the changes to it, that the review … deferred".
- Section 1: "a rename that a decision requires". 1.1: "uses … in place of the term"; "Replacing that wording with the term is a technical replacement that is due when that node next changes." 1.3: "Proposal 2.7 rewrites, without the phrase "carries no SpecTag", rule 1.3.3's reason …". 1.4: "In one warning, the check covers all the code that no SpecTag binds", which also avoids the reading "binds in one warning" that the fast reader's own wording would create.
- Section 2's introduction: "such proposals here are …"; "a sentence that breaks a rule"; "the new wording brings that sentence into line", so that "proposal" no longer stands for both the proposal and its wording.
- 2.2: "the sentence about a branch of the map". 2.3: "the checks that the git hooks run", English only in the agreed reason. 2.4: "the practice of writing the tools' tests first therefore rests only on". 2.5: "For a push, rule 10.2 names only the tests".
- 2.6: the brief's "whether it carries no SpecTag or carries only SpecTags that bind nothing, such as one that names a section".
- 2.7: "the wording that change 1.3 replaces"; "have different conditions for being approved" and "current wording", English only; "A section states no requirement of its own".
- 2.8: "escapes rule 9.5"; each "such a SpecTag" now names its SpecTag: "a SpecTag that names a section binds nothing" and "a SpecTag that says that code implements no rule".
- 2.9: "Under answer A:"; "each is sent to specsheriff-rule-reviewer"; "two terms that name the same thing", English only in rule 3.2; "A term that is defined once, in a place where every rule that needs it can cite it, …"; "covers the new citation"; "define the term again"; "the agreed node s-yauyedny2yzvs4c"; "one or two nodes of the appendix of the tools".
- 3.1: "a way to set a repository up, or to take SpecSheriff out of it"; "say nothing about"; the brief's sentence on `spec-init`: the skill runs `sheriff init`, and the node that describes it has only one `implements` link.
- 3.2: "as recorded in"; "uses the defaults"; "pays for a model or an effort that they did not choose"; "the reasoning effort" in the decision.
- 3.3: "refuses, for a node in a cell, only a sid that more than one node holds", in the words of s-vke5hakwf3uyrjs; "kinds that have a title"; "a rewording … in English only".
- 3.4 and 3.8: "leave no choice but to add the row"; 3.8: "the proposed row".
- 3.5: "that is neither its own RecordType nor one that its RecordType reaches"; "consider only"; "with the same name as"; "covers the new citation".
- 3.6: "rejects the fields", "is rejected" and "rejects each field" for what a JSON Schema keyword does; "The page that the owner accepted"; "The reverse case goes wrong too."; "names: dropping data silently".
- 4.1: "The reverse change"; "is changed to include the kind, under the names `rule`, `recordType` and `domain`, which earlier releases wrote …"; "the changes that an approval survives".
- 4.2: "a property that holds for the base specification as a whole"; "the stack section", the spelling of the agreed row 11.3.5, in the new row, in row 11.3.5 and in the risk; "followed by its own title"; "covers its new citation".
- 4.3: "under rule 1.5.2, a file whose symbols cannot be identified is already bound by SpecTags at its start"; "a file with statements outside every symbol"; in row 10.1.26 under A and B, "in a file whose symbols the checks can identify, the code that is outside every symbol …", with the Russian to match; the example's "a call, outside every function, that starts a server" and "to leave the call unbound".
- 4.4: "do not apply to the files"; "the following nodes, agreed in group 7, change:"; "the node on what is generated from a RecordType", the title of s-suv42g8r3ra2h6b; "each replacing the clause of question 4.3's wording that it extends".
- 4.5: "either of its two restrictions, on where such a SpecTag may appear and on what it names"; "whichever restriction"; "the first restriction"; "both restrictions of rule 10.10"; "Option B also departs"; "extended it only to"; option B's risk "although no check treats such a SpecTag as binding anything"; option C's risk "although no check counts it as implementing that rule", which says what rule 10.10 says of such a SpecTag.
- 4.6: "the new rule's reason"; "define its own terms"; "removes the last citation of a shared term from every domain but one", in option A's reason and in option B's risk.
- 4.7: "There is new information …"; "would stay allowed as annotations"; "are read as annotations by any JSON Schema tool"; "Risk: option A departs".

### Not applied

- "Integrity:" → "Consistency:" (fast reader, 2.4 and 2.5): kept, as the brief settles.
- "None of a project's own tools for a git hook runs" → "No project's own tool …" (fast reader, 2.5): kept, since the thorough reader of round c found that "no project's own tool" reads as "the own tool of no project".
- "tests included" and "until all of it was bound to rules" (fast reader, 2.6): the reader marks no error; agreed text.
- The citation's place in "A term is defined in a domain (§s-ypa92gpcj3f5zj8)" (fast reader, 2.9): kept; rule 3.2 is the rule on where a term is defined, which that clause refines.
- "must be defined" and "must be in" (thorough reader, 2.9); "whenever" (reader of new29): kept in the present tense, as the brief settles.
- "The users domain" (thorough reader, 2.9): kept, since the agreed examples of rules 12.1 and 12.6 write "the domain of users".
- "run in the following order" (thorough reader, 2.3): kept, as the brief settles.
- "The same rename" and "the same rename" (thorough reader, 1.4 and 2.6): kept, as the brief settles, since they name the change that the rulings of 2026-11-17 make.
- "composed only from" → "built only from" (thorough reader, 3.1): kept, since "composed" is the word of the agreed node "How the schema of the specification is composed" (s-xzcw3hv4hmxz7h7).
- "Everything else about a node changes" → "may change" (thorough reader, 4.1): not applied, since it would turn the statement in the agreed reason of rule 1.3.5 into a possibility, a change of meaning.
- "The system's implementing code" (both readers, 4.3): kept, as the brief settles. "carries its SpecTags" (fast reader): the reader marks no error.
- "a SpecTag in a tool" (fast reader, 4.5): kept as "a SpecTag that is in a tool and names …", which round c took from the thorough reader so that the relative clause does not attach to "tool".
- The fast reader's notes that mark no error on 4.4 and 4.7, and the line on `changed-paras2.py`, which is not part of the file.

## Round f

The brief is `fix-brief-bq-f.md`: the last English fixes, from `english-bqe-fast.md`, with no change of meaning. The version before this round is `base-questions.before-f.md`. Nothing under `specs/`, in `moved/` or in `tools-drafts.json` was edited, no commit was made, and `INDEX.md`, `tasks.md` and `t25-one-thought.md` were not touched.

### Applied

All nine fixes of the brief, as worded there:
1. Section 2's introduction: "here, what goes to specsheriff-rule-reviewer is proposal 2.9 and the reasons in proposals 2.3, 2.6 and 2.7".
2. 2.2: "The Russian text of the new sentence".
3. 2.5: "Rule 10.12 has the project's own tools run on a push".
4. 2.6: "which SpecTags bind code and which do not".
5. 3.5: "nor one that its RecordType reaches through `refines`". Item 55 (s-nk8td3ez58gahc4) speaks of the RecordTypes that a variant "reaches through `refines` links", so the condition of the brief holds.
6. 3.6: "The reverse case has the same defect."
7. 4.3: "each gain a sentence, and their code and tests change too".
8. 4.6, in option A's reason and in option B's risk: "a shared term's citations from every domain but one, so that only one domain still cites the term".
9. 4.7: "that the release has been published"; option A's title "The `x-` prefix on both keywords: `x-identifierOf` and `x-enumSource`".

The Russian on the pages already said what fixes 3 to 9 say, so the pages needed no change for them. Fixes 1 and 2 are in parts of the file that the pages do not show.

### Two Russian sentences brought into line with the English

- 3.5, the Russian `change`: «до которых тот доходит» became «до которых тот доходит через `refines`», the Russian counterpart of fix 5.
- 3.2, the Russian of the example: «так что человек платит за запуск, которого не выбирал» became «так что человек платит за модель или усилие, которых не выбирал». Round e changed the English to "pays for a model or an effort that they did not choose" and left the Russian as it was.
