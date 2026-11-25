# T25: the questions about the base specification, round b

You apply the review of `base-questions.md`. The brief `briefs/t25-base-questions-brief.md` still holds, except where this brief changes it.

## What to read

- `review-bq-a.md` and `review-bq-b.md`, the reports of the two specsheriff-rule-reviewer agents;
- `english-bq-fast.md`, the findings of EngStickler's fast reader.

This brief holds the main session's decisions on all three reports.

## How the file is reorganised

The reviewers found that most items are not choices for the owner. The file is rewritten into four sections:

1. **Changes made without asking.** A change that only removes or renames what a decision removes or renames, as the owner's rule "What a decision removes or renames is removed or renamed without asking again" allows: "stands" becoming "is in force" in rule 1.3.3 and in the agreed appendix nodes that review A names; the `implements` link of question 17; the rename of "carries no SpecTag" in rules 1.3.2, 1.3.3, 10.6 and 10.7 that review A lists under 1.6. Each is listed with the exact change and the decision it follows from. The main session makes them and reports each in one line.
2. **Proposals that carry out a decision already made.** Changes 1.1 to 1.6 and question 6, which becomes change 1.8 under the owner's ruling of 2026-11-13, as review A says. Each needs a new wording of its own, so each is shown to the owner as a proposal: one complete new wording, with a Russian `change` field. Where such a change touches a sentence of the node that breaks a rule on how a node is written, bring that sentence into line in the same proposal, as the owner's rule "An agreed node is brought into line with the rules when it changes, never in a sweep" says. This covers "run in three steps" and the pairing of the reasons in 1.3, 1.6 and 1.7, which review A raised as doubts. Rule 1.3.3 therefore becomes a proposal here, not a change made without asking.
3. **New proposals for agreement.** Each is a new or changed wording that no earlier decision settles, but where the rules leave no real choice: questions 8, 9, 11, 12, 14, 15, 16 and 18, as the reviewers say. Show each as one complete wording, with its reason, its links and a Russian rendering, and no options. Questions 8 and 9 are not questions of timing: the owner's rule "A defect found is fixed at once" forbids asking when to fix a defect.
4. **Questions for the owner.** Only questions 2, 3, 4, 5, 7, 10 and 13 remain, with the reviewers' changes:
   - question 10 narrows to the one point that the note of 2026-11-12 left open, and drops option C, as review B says;
   - question 7 replaces option B with the change to rule 10.10, and states the gap that review A's doubt names: no setting tells the SpecSheriff tools which files are the repository's own tools. Recommend one of the ways out, with its basis;
   - question 13 gives the whole of what the two JSON Schema posts say, and option B's cost adds the meta-schema, as review B says.

Question 1 moves to the dropped items, citing the owner's «ок» to group 6, as review A says. Keep section "Dropped items" and the Russian summary, updated to the new sections.

## The reviewers' findings

Apply every finding of both reviews that the author can fix, in the words that the reports give, including G1 to G3 of review A. Where a finding is marked as one only the owner can answer:
- the doubts on agreed sentences of 1.3, 1.6 and 1.7 are settled as section 2 above says;
- review A's doubt on question 8, whether the new rule names the entries that `sheriff remove` deletes: state in the rule exactly what the agreed s-7unxytshhc4md54 removes, in general words that cover those entries;
- review A's doubt on question 4, the example: add it;
- review A's note on question 8 and section 10: choose the section for the new rule, or change section 10's text, and say why.

G4 is settled as section 1 and section 2 above say, following `.claude/vt/rules.md`.

## The fast reader's findings

Apply each LANGUAGE finding of `english-bq-fast.md`, except where it conflicts with the owner's English or with an agreed term:
- keep "judge", "holds" for what a commit holds, "makes this check", "the files that the repository keeps", and "the settings that only an owner changes";
- keep a term of an agreed node as that node writes it.

In particular, fix: "decision Р8", which has a Cyrillic letter, to "decision R8"; the Russian words «Оценка» and «согласованность» in the English text; "rule 1.5.2 says so" in question 2, option B, which should read 1.3.5; "The base read is"; and every "stands" used for "is", such as "stands inside a symbol".

## What to write

1. A new version of `base-questions.md`, with the four sections above. Before you write it, copy the current file to `base-questions.before-b.md`.
2. In a new file `base-questions-notes.md`, a section "Round b" that says, for each finding of the three reports, how you applied it or why you did not.

Do not edit any node, make no commit, and do not touch `INDEX.md`, `tasks.md` or `t25-one-thought.md`.

## Your final report

Short, in English: how many items are in each of the four sections, and anything you could not settle.
