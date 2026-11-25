# T25, stage 2, group 4: round c, the findings to apply

The follow-up review of round b found no draft ready. Its six reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`:
- the reviewers' reports `review-g4b-a.md`, `review-g4b-b.md`, `review-g4b-c.md` and `review-g4b-d.md`;
- the readers' reports `english-g4b-fast.md` and `english-g4b-thorough.md`.

Apply every finding that a report marks as one the author can fix, and every finding of the readers that a careful native writer would accept, with `fix-group4-c.mjs`. Make the script idempotent: it starts from a backup `tools-drafts.before-group4-c.json` that it makes on its first run. Add a "Round c" section to `group4-notes.md` that says, for each finding, what was done or why it was rejected. Then write `english-group4c.md`, the English of every changed node, in the format of `english-group4.md`. Do not touch `.ai_docs/INDEX.md` or anything under `specs/`.

## Rulings on the points that the reviewers left to the owner or to the main session

Write each ruling into the draft concerned. Record its basis in the draft's `change` field and in the notes.

1. **The reason of rule 10.12 (review b-a, finding 5 on the proposal).** The proposal on 10.12 changes the node, so the node must now conform as a whole, under the rule "An agreed node is brought into line with the rules when it changes, never in a sweep". The owner sees the whole new wording on the page anyway.
   - Take the reviewer's candidate reason, which replaces all four paragraphs, with "apply to everyone" in place of "hold for everyone", as `docs/principles.md` has it.
   - Correct the agreed Russian «на том, что уже прошло проверки проекта» with it.
   - List the new reason in the proposal's `change` field, saying why the agreed reason failed the pairing test.

2. **Files that git ignores (review b-a, finding 3 on row 10.1.37a).** Step 2 of 10.12 says that none of the project's own checks and other tools changes a file, while row 10.1.37a lets a check change a file that git ignores. The two must say the same. A check that writes a cache into an ignored folder is ordinary, and a file that git ignores never enters a commit. So bring step 2 in the proposal on 10.12 into line with the row: none of them changes a file other than one that git ignores. State it in positive form if you can. List the change in the proposal's `change` field.

3. **Row 10.1.37b (review b-a, finding 2 on row 10.1.37a).** The missing row for the refusal in s-n4m5zvh96yb299p would be implemented by a node outside group 4, so it is not added now. The rule "While one group is being discussed, no node outside it is changed" applies. Record it in the notes for item 57 ("The hooks"), as a row that table 10.1 needs because its head says that it lists every check.

4. **Rules that stop being free of the requirement of implementation (review b-c, question 2).** Ruling 6 of round b closed the gap for an exemption that ends, and the same reasoning covers every other way in which a rule comes under that requirement.
   - Take the reviewer's general wording for the fourth item of row 10.1.41, with the new `cites` link to s-2r7k2aeyusgy6fw.
   - Write the matching item into s-jgejd5rpd9d43pd, in its own words.
   - Use the positive form "stops reaching it" wherever the old wording stays, as review b-c's findings B1 and C1 say.
   - Add review b-c's cost note C2 to the row's `change` field.

5. **The question on merge commits.** Apply the three fixes that review b-c gives to the question in `group4-notes.md`:
   - the recommendation and its reason come first;
   - the wording on what the developer sees under A covers lagging tests or code;
   - the cost of A names the risk that remains: a merged commit made without the hooks is not checked again at the merge.

   Merge in review b-b's and review b-d's wordings of that risk if they add anything. Keep answer A in the drafts, with review b-c's wordings A1 and D2.

## Other points

- **Review b-a on rule 10.12.** Use finding 1's wording: the exception applies on a commit, and those checks run right after the first step. Apply findings 2 and 3, and record finding 4 for item 57.
- **Review b-b, finding B1.** `sheriff citations` leaves out each file that git treats as binary, such as an image, because row 10.1.39 covers code, tests and documentation only. Note that this repository's own pictures hold `§` followed by a digit.
- **Review b-b, Russian renderings.** Render "citation" and "cite" as «ссылка» and «ссылаться», as the agreed rules 1.2.2 and 10.11 and rows 10.1.38 and 10.1.39 do (A2, B4).
- **The agreed sentence on files without comments** in `new:tools-1-project`. The node is changing, so bring it into line now: "the files whose format allows no comments, other than JSON files", in Russian to match. List it in the `change` field.
- **The example of row 10.1.41.** Its last sentence opens with "But not:", which is no English construction. Write it as the other examples do: "The most likely mistake is to …".
- **The test's SpecTag.** In the example of s-jgejd5rpd9d43pd, a test "carries" R's SpecTag, as other nodes say, rather than "declares" it.
- **Phrases kept from groups 1 to 3**, such as "makes this check" and "leaves out", stay as in round b. Where a reader questions another phrase that the agreed drafts use, keep it unless it is wrong, and say so in the notes.
- Every citation has its link, the Russian cites the same sids as the English, and every link target exists. Every new sid is unique. Run the script's own checks, as in rounds a and b.

Report, as your final message: the keys you changed, each ruling and how you carried it out, the findings you rejected and why, and the final text of the question for the owner.
