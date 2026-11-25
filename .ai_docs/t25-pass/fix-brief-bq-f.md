# T25: the last English fixes to the questions about the base specification

EngStickler's fast reader read the paragraphs that round e changed; its report is `english-bqe-fast.md`. Apply the fixes below to `base-questions.md` and to the same sentences in `bq-pages.json`, then run `node gen-bq-pages.mjs` again. Change no meaning. Add a short section "Round f" to `base-questions-notes.md`.

Apply:
1. Section 2's introduction: "such proposals here are proposal 2.9 and the reasons in proposals 2.3, 2.6 and 2.7" becomes "here, what goes to specsheriff-rule-reviewer is proposal 2.9 and the reasons in proposals 2.3, 2.6 and 2.7".
2. 2.2: "Russian of the new sentence" becomes "The Russian text of the new sentence".
3. 2.5: "Rule 10.12 runs the project's own tools on a push" becomes "Rule 10.12 has the project's own tools run on a push".
4. 2.6: "what binds and what does not" becomes "which SpecTags bind code and which do not".
5. 3.5: "nor one that its RecordType reaches" becomes "nor one that its RecordType reaches through `refines`", if item 55 means the chain of `refines` links; otherwise say what "reaches" means there.
6. 3.6: "The reverse case goes wrong too" becomes "The reverse case has the same defect".
7. 4.3: "each gain a sentence, with code and tests" becomes "each gain a sentence, and their code and tests change too".
8. 4.6, in both places: "the last citation of a shared term from every domain but one" becomes "a shared term's citations from every domain but one, so that only one domain still cites the term".
9. 4.7: "that that release has been published" becomes "that the release has been published". Option A's title becomes "The `x-` prefix on both keywords: `x-identifierOf` and `x-enumSource`".

Not applied:
- "costs the commit" in change 1.4 stays: the project says what a failure "costs" in the same sense, and reviewer A wrote the wording.
- "Integrity" stays, and "is defined" does not become "must be defined", as `fix-brief-bq-e.md` settled.
