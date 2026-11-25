# T25, stage 2, group 5: round b, the findings to apply

Six reports on your drafts of group 5 are in `D:/SpecSheriff/.ai_docs/t25-pass/`:
- the reviewers' reports `review-g5-a.md`, `review-g5-b.md`, `review-g5-c.md` and `review-g5-d.md`;
- the readers' reports `english-g5-fast.md` and `english-g5-thorough.md`.

Only item 42 was found ready. Apply every finding that a report marks as one the author can fix, and every finding of the readers that a careful native writer would accept, with `fix-group5-b.mjs`. Make the script idempotent: it starts from a backup `tools-drafts.before-group5-b.json` that it makes on its first run. Add a "Round b" section to `group5-notes.md`, placed first, that says for each finding what was done or why it was rejected. Then write `english-group5b.md`, the English of every changed node, in the format of `english-group5.md`. Do not touch `.ai_docs/INDEX.md` or anything under `specs/`.

## Rulings on the points that the reviewers left to the owner

1. **Which fields select a variant when two RecordTypes are equally near (review c, finding 7).** Row 12.12.4 requires that a RecordType variant refine exactly one RecordType that has fields that select a variant, so the same row settles the case. Where a RecordType names nothing in its `chosenBy` and two RecordTypes equally near up its `refines` links name different fields, `sheriff validate` refuses each RecordType variant of that RecordType under the first condition, and the refusal names both RecordTypes. Word it in the narrowest way that says this, and record its basis.

2. **One convention for SpecSheriff's own keywords in a RecordType's `schema` (review d, question 2).** Whether they carry the `x-` prefix (`x-enumSource`) or not (`identifierOf`) is best settled together with item 56, which states the form of the names that `$ref` and `identifierOf` use. It is not settled in group 5. Record it under "Changes needed outside the group", for item 56.

3. **The check of rule 1.1.2 in a project without the Domains extension (review a).** It is recorded in the continuation file, to be put to the owner before stage 3 changes the code. In the notes on item 42, add the fact that review a gives: today's code refuses a wrongly named file under `specs/tech/` in a project without the extension, and stage 3 removes that refusal.

4. **What the source `parts` gives in a project without the Domains extension (review d, question 1): the one question for the owner.** The owner generalised rule 12.11 on 2026-11-18 to "the names of the parts into which the base specification is divided", citing rule 1.1.2, which divides the base specification into sections. Item 47 of this group already treats a top-level section of `specs/base/` as a part of the system in a project without the extension.
   - Write into `s-5nf87c3e3jg9v7c` the recommended answer: in a project without the Domains extension, the parts are the top-level sections of `specs/base/` and the section in `specs/contracts/`; the name of such a part is the title of that section, and the node a value comes from is that section. Keep the folder names of the domains, and `contracts`, in a project with the extension.
   - Check that the example and the reason of the node still hold, and say in the notes which sentences change if the owner chooses the other answer.
   - Write the question for the owner into the notes, in Russian, under «Вопрос ответственному». Put it in terms of what a person sees in the values of a field such as an audit log's `part`. Give the recommendation and its reason first, then each option with what it costs, including every risk that remains. The options are at least:
     - **A (recommended):** the sections, named by their titles, as above. Cost: a value changes when its section is retitled, as a domain's value changes when its folder is renamed.
     - **B:** the folder names, `base` and `contracts`, as drafted in round a. Cost: without domains the field gets two values that never change, and rule 12.11's "a part added or removed adds or removes a value" almost never happens.

## Other points

- Apply review a's fixes to items 41 and 43. For item 43, give `new:tools-1-project` its sid, which changes no wording, so that item 43 can cite it instead of restating it. Check the new sid for uniqueness across `specs/`, `moved/` and `tools-drafts.json`.
- Apply review b's fixes to items 44 and 47, and review c's fixes to item 45, including finding 1 on what `sheriff validate` checks of a variant that fails the first condition.
- Apply review d's fixes to items 46a and 46b, including the new title of 46b.
- Review d's DOUBT on how a refusal names a field at depth applies to items 44 and 46b alike. Settle it once, in the same words in both nodes, for example by the path of the field from the RecordType's `schema`.
- Use "is taken into account" or "is considered", never "counts" or "is counted", outside counting. Use "makes this check" as the agreed drafts do.
- Every citation has its link, the Russian cites the same sids as the English, and every link target exists. Run the script's own checks, as in round a.

Report, as your final message: the keys you changed, each ruling and how you carried it out, the findings you rejected and why, and the final text of the question for the owner.
