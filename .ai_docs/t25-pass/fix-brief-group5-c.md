# T25, stage 2, group 5: round c, the findings to apply

The follow-up review found items 42, 44 and 46b ready, and the other drafts close to it. Its six reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`:
- the reviewers' reports `review-g5b-a.md`, `review-g5b-b.md`, `review-g5b-c.md` and `review-g5b-d.md`;
- the readers' reports `english-g5b-fast.md` and `english-g5b-thorough.md`.

No report raises a new question for the owner. Apply every finding that a report marks as one the author can fix, nits included, and every finding of the readers that a careful native writer would accept and that no earlier round rejected for a reason that holds. Use `fix-group5-c.mjs`, idempotent from a backup `tools-drafts.before-group5-c.json` that it makes on its first run, as in round b. Add a "Round c" section to `group5-notes.md`, placed first, that says for each finding what was done or why it was rejected. Then write `english-group5c.md`, the English of every changed node, in the format of `english-group5.md`. Do not touch `.ai_docs/INDEX.md` or anything under `specs/`.

## What to apply

- **Item 41:** review b-a's CUT of the sentence on the check of `consumes` links, with its `cites` link and the end of its `change`.
- **Item 43:** review b-a's Russian fix of the comparison «Как и любой перечень…».
- **Item 44:** review b-b's nits: the rejection of the reader's two readings in the notes; «своей `schema`» in Russian, as in item 47; the `stage3` sentence on validate.ts:427.
- **Item 45:** review b-c's findings 1 to 5. Finding 1 replaces "equally near" with "that it reaches through the fewest `refines` links", which keeps ruling 1 of round b. Finding 3 keeps the meaning of "nearest section" the same under answer A and under answer B.
- **Item 46a:** review b-d's WORDING FIX 1 on "comes from", which keeps the words of rule 12.9 and explains them where they are first used, and its fixes 2 and 3. Update the notes' paragraph "If the owner chooses B" to name what changes after the fix.
- **Item 46b:** review b-d's FIX 1 in `stage3` and in the notes.
- **Item 47:** review b-b's three wording fixes and its nit on the `change` of paragraph 1.

## The question for the owner

Keep answer A as the recommendation, with its reason: the owner's ruling of 2026-11-18 ties rule 12.11 to rule 1.1.2, which divides the base specification into sections. Add to A's cost every risk that remains, as the reviewers wrote them, shortened where that loses nothing:
- review b-d's three risks: two sections with the same title give one value twice, and a record then does not say which section it means; several top-level sections in `specs/contracts/` give several values; a base specification that is not divided into sections gives no value, and `sheriff validate` refuses the field under row 12.12.12;
- review b-a's risk: nodes of `specs/base/` outside every top-level section give no value, although item 47 treats the RecordTypes among them as one part of the system;
- review b-b's risk: if the project later chooses the Domains extension, every value changes under A, while under B the domains' names replace `base` and `contracts` stays.

Keep the question readable: the recommendation and its reason first, then each option with what a person sees and what it costs. End with «Выбираете А?».

Report, as your final message: the keys you changed, the findings you rejected and why, and the final text of the question for the owner.
