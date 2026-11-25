# T25: round c of the questions about the base specification — the main session's decisions

Round c applies the decisions below to `base-questions.md`. Four reports read the file after round b:
- `review2-bq-a.md`, the follow-up review of sections 1 and 2;
- `review2-bq-b.md`, the follow-up review of sections 3 to 5;
- `english-bqb-fast.md` and `english-bqb-thorough.md`, EngStickler's two readers.

Before you start, copy the file to `base-questions.before-c.md`. Add a section "Round c" to `base-questions-notes.md` that says, for each finding, how it was applied or why not. Edit no node, make no commit, and do not touch `INDEX.md`, `tasks.md` or `t25-one-thought.md`.

"Apply" below means: apply the finding in the report's own wording, with its Russian, unless this brief gives other words. Every finding not named below is applied as its report proposes.

## Review A of round b (`review2-bq-a.md`)

- **1.2, nit.** Apply: section 1's introduction says that a change adds only a link, which an approval does not cover (§s-5ah25f6gy99panq), so no owner's agreement is needed.
- **1.3.** Apply all four findings:
  - the four agreed nodes of the appendix of the tools, as a new change 1.4;
  - the Russian of rule 10.7's example;
  - the Russian of rule 1.3.2;
  - the nit: changes 1.3 and 1.4 are made together with proposal 2.6, once the owner accepts it. Say so in their introduction.
- **2.3.**
  - The second paragraph of the reason: apply the reviewer's single sentence.
  - "Adopting the method" and "the plugin": apply.
  - The cut of the sentence on CI: rejected. The owner agreed to the sentence on 2026-11-24, and `docs/principles.md`, which the owner wrote, holds the same sentence.
- **2.4.** Apply both fixes. In the problem of the second decision, write "required a test written first for the code of a project's own checks and generators" instead of "held … to a test written first". Both readers found "hold X to a test" unidiomatic.
- **2.5.** Apply.
- **2.6.**
  - The reason: its last sentence becomes "So the owners decide when such code is reported, by approving the specification, and when it must be bound, by turning its `strict` flag on." Write the Russian to match.
  - The Russian of the first sentence, the integrity finding and the English nit: apply.
  - The second example: apply it as a proposed example. The owner sees it on the page with the rest of the proposal.
  - The first example ends with "But not: …". Rewrite that sentence as "The most likely mistake is to refuse the commit because of the two old files, or to list their symbols in the warning."
- **2.7.**
  - The reason: apply the reviewer's wording, except the last sentence. It becomes "A section requires nothing of its own, so an owner has nothing in it to agree to beyond its rules."
  - "The agreed reason fails the pairing test" names a label from the checklist. Write instead: "The agreed reason grounds the items of the text one by one, which the rule on reasons forbids".
  - "rule 1.3.3 becomes a proposal" becomes "the change to rule 1.3.3 is a proposal".
- **2.8.**
  - Keep the agreed Russian of the first two sentences, here and in questions 4.3 and 4.4.
  - The nit: apply. The sentence "A SpecTag that names a node that is not a rule, such as a section, binds nothing" moves into the paragraph that says what a SpecTag binds, after "…bind the whole file". The proposal then changes two paragraphs, and `change` says so.
  - "Review A of round b found this" is wrong: the first review found it. Write "Reviewer A of the first review found this gap."
  - "treats it as binding" becomes "treats such a SpecTag as one that binds the code".
  - Check that "Rule 9.3" is the rule on a SpecTag that says code implements no rule, and correct the number if it is not.
- **2.9.** Apply the fix to rule 3.2 and the fix to the Domains rule's second sentence and its example. Then apply the decision on question 4.6 below.
- **Terms.** Nothing to change in the nodes.

## Review B of round b (`review2-bq-b.md`)

- **3.1.**
  - The wording fix: apply, with the two new `cites` links.
  - The doubt on the entries that only an owner records: not a question for the owner. The owner agreed to s-7unxytshhc4md54, which removes those entries in the same way. Running the setup again leaves the specification a draft until an owner runs the approval procedure. A draft specification only weakens checks, and anyone can skip the git hooks anyway, with `git commit --no-verify`. Add a line "Risk:" to 3.1 that says this in two sentences, in English and in Russian.
  - The nit on `spec-init` (s-ttsc8tpnu46q53s): apply. It gains an `implements` link to the new rule, and the cost counts four links.
- **3.2.** Apply the wording fix, the fix to `change` and the proposed example.
- **3.3.** Apply the first and the third nit. The second nit, on a project's own kind, is rejected: the kind's declaration in the schema says whether its nodes have a title.
- **3.4, 3.5, 3.7, 3.8.** Apply the nits.
- **3.6.** Apply the second row, with its basis in JSON Schema 2020-12. The new row and the existing new row stay two rows, since each states one thought.
- **4.1.** Apply the cut of the fourth item of rule 1.3.2, under either option.
- **4.2.** Apply both fixes and the nit.
- **4.3.** Apply both nits.
- **4.4.** Apply all three findings.
- **4.5.** Apply all three findings.
- **4.6.** The recommendation changes to B. The owner's ruling of 2026-11-12 says that "a term that one domain needs is defined in that domain". The owner's rule "A proposal is based on the owner's earlier rulings on its subject" puts those words first. Option B also makes the place of every term follow from which nodes cite it, so a check decides it. The cost of B, a commit that fails until a term is moved, stays in its risk. So:
  - question 4.6 recommends B, states the ruling's words as its basis, and keeps A as the other option, with A's reason from the review;
  - B's first sentence takes the review's wording, which names the part of the technical appendix too; B's "What a person sees" gets the same addition;
  - proposal 2.9 is written for B: the new Domains rule opens with B's first sentence, keeps the second sentence as review A fixed it, and keeps its reason "so the contracts section keeps only what the domains share"; the second row of table 11.3 joins 2.9, with its node and its code in the list of other nodes that change;
  - 2.9's note on question 4.6 says that its wordings follow the recommended B, and what changes under A.
- **4.7.** Ready. Apply the readers' findings below.
- **Dropped item 3.** Apply: the technical replacement moves into change 1.1.

## EngStickler's readers (`english-bqb-fast.md`, `english-bqb-thorough.md`)

Apply every finding in the "LANGUAGE" lists of both reports, with these exceptions and settlements:
- "Integrity:" stays. It is the name the owner gave to one of the five criteria («целостность»), not a label of the author's.
- "The main session" stays. Everyone who reads this file knows which session that is.
- "keeps the node agreed" becomes "and the node stays agreed".
- "The system's implementing code" in row 10.1.26 stays: the row's agreed wording keeps it, and question 4.3 changes only "for a symbol".
- "the same titles lead to it as to a section": rewrite it so that it says the section of the technical appendix has the same path of titles as a section of the base specification. Review B's fix to the row's second sentence keeps "the titles lead to"; make the two sentences use the same words.
- "which the page cites by number" (3.4): name the page or the file meant.
- "the item of "Found and owed"" becomes "the item in "Found and owed"" in every place.
- "goes", meaning that a link or a node is removed, becomes "is removed" in every place.
- "until the term moves" and "until the section moves" become "is moved" in every place.
- "a property for a comment" becomes "a comment property" in every place.

Also resolve these readings that the readers found ambiguous:
- section 2's introduction says that the proposals go without the reviewer's check, while 2.9 and the reasons in 2.3, 2.6 and 2.7 went to the reviewer. Say that a proposal goes without the reviewer's check where it only carries out the decision, and that a proposal with a wording of its own goes to specsheriff-rule-reviewer first;
- 2.3's example: say that the scan for secrets is one of the project's own tools for the pre-commit hook, so that it plainly runs before the structure checks under option A;
- 2.4: "both decisions are in this wording" lists three; say "all three";
- 2.4: "this is reported to the owner in one line" becomes "this risk is reported to the owner in one line"; "already says both" names the two decisions;
- 2.6: "with one warning for all such code, which says that such code exists": make "which" plainly refer to the warning;
- 4.1: "under the earlier names `rule`, `recordType` and `domain`": say what "earlier" refers to, or drop it if it says nothing;
- 4.2: "a project … is refused" becomes "a commit in a project … is refused".

When round c is done, report what changed and list every wording you wrote yourself that no report dictated.
