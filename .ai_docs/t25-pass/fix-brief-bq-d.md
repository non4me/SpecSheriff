# T25: round d of the questions about the base specification — the main session's decisions

Round d applies the decisions below to `base-questions.md`. Four reports read the file after round c:
- `review3-bq-a.md`, the third review of sections 1 and 2;
- `review3-bq-b.md`, the third review of sections 3 to 5 and of the second row of table 11.3 in proposal 2.9;
- `english-bqc-fast.md` and `english-bqc-thorough.md`, EngStickler's two readers on the paragraphs that round c changed.

Before you start, copy the file to `base-questions.before-d.md`. Add a section "Round d" to `base-questions-notes.md` that says, for each finding, how it was applied or why not. Edit no node, make no commit, and do not touch `INDEX.md`, `tasks.md` or `t25-one-thought.md`.

"Apply" below means: apply the finding in the report's own wording, with its Russian, unless this brief gives other words. Every finding not named below is applied as its report proposes.

## Review A (`review3-bq-a.md`)

Apply every finding, nits included, with these settlements:
- **2.9, the rule and row 2.** Use review A's wording for both: "A term is defined in a domain … if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it". It settles review B's finding on the same row and both readers' findings on the rule's first sentence. Add review B's `cites` link to s-vj7ercem526zd6v to row 2, and to every other new row that names the part of the technical appendix named after a domain, unless the row already has a `checks` link to that node.
- **2.9, rule 3.2.** Use review A's wording: "…may instead require one of the parts … to define the terms that no other part of the base specification needs." Review B's finding on 4.6 asks for the same change in other words; review A's words also cover a term that only the technical appendix cites.
- **The nit for the main session**, that the owner's page shows 2.1, 2.2, 2.4, 2.5 and 2.8 in full, is the main session's to carry out. Nothing changes in the file.

## Review B (`review3-bq-b.md`)

Apply every finding, nits included, with these settlements:
- **3.1, the risk line.** Apply the sentences on the extensions. The removal deletes the record of the chosen extensions as the rule says, so the risk is real, and the owner sees it on the page.
- **4.2, the nit on §s-5x737t9nee4zgaa.** Rejected for now: the agreed rule 8.5 cites the same node in the same way, and a change to that citation belongs to rule 8.5.
- **4.6.** Rule 3.2 takes review A's wording, as above. Apply the rest: rule 3.2 joins "Nodes concerned", the note on A says that rule 3.2 then keeps "let … define", and "Reason for A" begins as the review proposes.
- **The second row of table 11.3.** Use review A's wording, as above.
- **Row 10.1.6.** Remove the `cites` link to s-ypa92gpcj3f5zj8 that round c added: the row's `checks` link to that node serves for the citation.

## EngStickler's readers (`english-bqc-fast.md`, `english-bqc-thorough.md`)

Apply every finding in the "LANGUAGE" lists of both reports, with these exceptions:
- "rename" stays wherever it names what a decision renames. The owner's rule "What a decision removes or renames is removed or renamed without asking again" uses the word, and section 1's introduction now tells a rename apart from a replacement.
- "A `TableRule` has a title, a text and a reason" stays. It is the agreed wording, and "a text" names the field.
- "The system's implementing code" in row 10.1.26 stays, as `fix-brief-bq-c.md` settled.
- "the node on how a symbol carries its SpecTags" stays: "How a symbol carries its SpecTags" is that node's title.
- "stays valid however many domains cite it" stays. It means "whatever the number".
- "works with" becomes "uses" in the new rule of 3.2, in its example and in its `change` field. Where a sentence quotes a ruling as it is already recorded, the quotation stays as recorded.
- A finding on a sentence that review A's or review B's wording replaces is moot.

Also resolve these readings that the readers found ambiguous:
- 2.9 and 3.6 each say "two new rows" and show one row in English. Show each new row in full, in English and in Russian.
- 3.8: say in the problem whether the contracts section is part of the base specification, citing the rule that says so, so that the row plainly admits a fragment of a format declared there.
- 4.7: "neither keyword" and "both" name the two keywords before they are used.
- The title of the file's introduction: "gathers what … deferred about the base specification" becomes "gathers the questions and the changes concerning the base specification that the review of the appendix of the tools deferred".

When round d is done, report what changed and list every wording you wrote yourself that no report dictated.
