# T25, stage 2, group 5: round d, the last fixes

The final review found items 41, 43, 44, 46b and 47 ready, and items 42, 45 and 46a one fix away. Its reports are `review-g5c-a.md` to `review-g5c-d.md`, and the readers' reports are `english-g5c-fast.md` and `english-g5c-thorough.md`, all in `D:/SpecSheriff/.ai_docs/t25-pass/`.

Apply them with `fix-group5-d.mjs`, idempotent from a backup `tools-drafts.before-group5-d.json`, as in earlier rounds. Add a "Round d" section to `group5-notes.md`, placed first. Then write `english-group5d.md`, which holds every sentence that round d changes, each under its key, for EngStickler's readers. Do not touch `.ai_docs/INDEX.md` or anything under `specs/`.

## The question for the owner stays, with two more costs

**This section replaces the first version of this brief, which withdrew the question and switched item 46a to answer B. Ignore that version, and undo anything you already changed under it.** The question is the owner's: its answer changes what the specification states, and the owner's ruling of 2026-11-18 on rule 12.11 (s-gqavjzcmubg5pvk) ties the parts to the division of the base specification into sections that rule 1.1.2 (s-qmmzf9nksfsa3qp) describes. That ruling supports answer A, so the drafts keep answer A, and A stays the recommendation.

Add review c-d's findings 1 and 2 to the question in `group5-notes.md`:
- **Finding 1, a cost of A.** In the agreed proposal on rule 8.5 (s-kag2m9tzdnduxdx) and in the agreed s-4bwa4zepd4nwcv8, "a part of the base specification" is what a location starts with: `base`, `contracts` or a domain, with `base/3` a section inside `base`. Rule 12.11 and item 46a, under A, give the same phrase to a section such as `base/3`. So one of the two meanings needs a name of its own, which a later proposal puts to the owner. State this as review c-d wrote it, shortened where that loses nothing.
- **What B gains and costs.** B keeps the meaning that rule 8.5 gives the phrase. Without the Domains extension, though, the field then has only the two values `base` and `contracts`, which no section added or removed ever changes. Rule 12.11, which cites the division into sections of rule 1.1.2, would then need a new wording too.
- **Finding 2.** Replace the risk that begins «если базовая спецификация не разделена…» with the wording review c-d gives.

Keep the question readable, as round c's brief asked: the recommendation and its reason first, then each option with what a person sees and what it costs. End with «Выбираете А?».

## Other fixes

- **Item 42:** review c-a's WORDING FIX on "any other section below the file's first top-level node".
- **Item 45:** review c-c's finding 1 (the citation of s-5x737t9nee4zgaa). Record finding 2, on variants of a RecordType and of the RecordType that it refines declaring the same field, under "Changes needed outside the group", for item 56 and row 12.12.7.
- **Item 41:** review c-a's nit on "states links to".
- **Items 44 and 47:** review c-b's nits 1 to 4.
- **Item 46a:** review c-d's findings 3 to 5.
- The readers' findings that a careful native writer would accept and that no earlier round rejected for a reason that holds, for example "in their `chosenBy`" in item 45.

Report, as your final message: the keys you changed, how you carried out the ruling, and the findings you rejected and why.
