# T25, stage 2, group 4: round d, the findings to apply

The third review found five of the twelve drafts ready, and the rest close to it. Its six reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`:
- the reviewers' reports `review-g4c-a.md`, `review-g4c-b.md`, `review-g4c-c.md` and `review-g4c-d.md`;
- the readers' reports `english-g4c-fast.md` and `english-g4c-thorough.md`.

Apply every finding that a report marks as one the author can fix, nits included, and every finding of the readers that a careful native writer would accept. Use `fix-group4-d.mjs`, idempotent from a backup `tools-drafts.before-group4-d.json` that it makes on its first run, as in earlier rounds. Add a "Round d" section to `group4-notes.md`, placed first, that says for each finding what was done or why it was rejected. Then write `english-group4d.md`, the English of every changed node, in the format of `english-group4.md`. Do not touch `.ai_docs/INDEX.md` or anything under `specs/`.

## Rulings

1. **The `refines` links of a rule of `project.json` (review c-d, D1).** Ruling 4 of round b had the SpecSheriff tools read each list in its last approved wording, so that a draft cannot switch off the tests at a push or a project's own check. An approval does not cover links (§s-5ah25f6gy99panq), so the gap remains through the `refines` link by which the rule is found. The agreed s-a8fn72xa782wvbk closes the same gap for the `refines` links of RecordTypes by taking them from the commit that added the last approval. Follow that precedent.
   - Add the reviewer's recommended sentence to `proposal:new-tools-1-project-g4`, after the sentence on the last approved wording, with a `cites` link to s-5ah25f6gy99panq.
   - Take the links the same way in paragraph 3 of s-b6qdtghnyha3fhk.
   - List the change in both `change` fields, with its basis.

2. **What makes a commit include an approved rule (review c-c, C1).** Round c's positive wording "becomes one that the system's code must implement" also covers the commit that approves the specification, because rule 9.2 ties the requirement to the specification's approval status. Rule 10.6 and the ruling of 2026-11-17 let the owner approve the specification with such rules. Take the reviewer's wording, "stops falling under the exceptions to the requirement that a rule be implemented", in row 10.1.41 and its counterpart in s-jgejd5rpd9d43pd. The phrase is not a negation of what holds: it names the exceptions, so the rule "A rule says what holds, not what does not hold" is kept. Say so in both `change` fields.

3. **The question on merge commits (review c-c, Q1).** Add the second remaining risk of answer A to its cost, in the reviewer's words or shorter. Keep the question's order: the recommendation and its reason first.

## Other points

- **s-dbk2vyeg8z5jxna:** move the sentence on the refusal, as review c-a's finding 1 says, and name `sheriff binding` in its finding 2.
- **The notes for item 57:** add review c-a's sentence on step 2 of the new rule 10.12, which covers unstaged files and new files that git does not ignore.
- **s-nh8b2hjvzasdxmd:** correct the two `change` notes that say what the code does now, as review c-b's finding 1 says, and take its reason fix.
- **s-m8nmfsxkcfu7cjp:** take review c-b's wording "in the system's code (§…), including its tests".
- **Row 10.1.41:** apply C2 and C3. Restore the agreed Russian first sentence, and list the change in the example's Russian.
- **s-b6qdtghnyha3fhk:** apply F1 to F4.
- **The readers' "only once … have passed"** may be read as "a single time". Write "only after … have passed" in s-7pk89t8z6wymmj9 and in the proposal on 10.12, and make the same change in Russian only where the Russian needs it.
- **Phrases kept from groups 1 to 3** stay as in rounds b and c.
- Every citation has its link, the Russian cites the same sids as the English, and every link target exists. Run the script's own checks, as in earlier rounds.

Report, as your final message: the keys you changed, each ruling and how you carried it out, the findings you rejected and why, and the final text of the question for the owner.
