# T25, stage 2, group 4: round b, the findings to apply

Six reports on your drafts of group 4 are in `D:/SpecSheriff/.ai_docs/t25-pass/`:
- the reviewers' reports `review-g4-a.md`, `review-g4-b.md`, `review-g4-c.md` and `review-g4-d.md`;
- the readers' reports `english-g4-fast.md` and `english-g4-thorough.md`.

No draft was found ready. Apply every finding that a report marks as one the author can fix, and every finding of the readers that a careful native writer would accept, with `fix-group4-b.mjs`. Make the script idempotent: it starts from a backup `tools-drafts.before-group4-b.json` that it makes on its first run. Add a "Round b" section to `group4-notes.md` that says, for each finding, what was done, or why it was rejected. Then write `english-group4b.md`, the English of every changed or new node, in the format of `english-group4.md`. Do not touch `.ai_docs/INDEX.md` or anything under `specs/`.

## Rulings on the points that the reviewers left to the owner

The main session has settled all but one of these points. Each settlement rests on an agreed node, a principle or an earlier ruling, named below. Write each settlement into the draft concerned, and record its basis in the draft's `change` field and in the notes.

1. **When a project's own checks run (review a, finding 1).** The agreed draft "Validation against the schema before a command works on the files" (`new:tools-7-1-validate`) has `sheriff validate` validate the files before any check that reads their nodes, and stop when the schema refuses a file. A project's own check reads the nodes through the model on its standard input, so it runs only after that validation. Rule 10.12 (s-pcnyfp7gev7syax) puts every check of the SpecSheriff guidelines after the project's own checks. The two agreed nodes contradict each other.
   - Keep the order in s-7pk89t8z6wymmj9, with the wording that review a's finding 2 gives.
   - Check in the agreed node on a key written more than once (s-7zqsstgnuc772ba) whether that check also stops `sheriff validate`. Name it before the project's own checks only if it does.
   - Write a proposal on rule 10.12, under a key such as `proposal:s-pcnyfp7gev7syax-g4`, as a complete new wording that says the project's own checks and the other checks of the SpecSheriff guidelines run only on files that have passed those checks. State it in positive form. Keep every other sentence of 10.12 as agreed.
   - Its `change` field says that the proposal brings 10.12 into line with the agreed draft "Validation against the schema before a command works on the files".

2. **The refusal of a check that changes a file (review a, finding 3).** Rule 10.12 requires that refusal, and table 10.1 lists every check. Add a row to table 10.1, as group 3 added rows 10.1.35a and 10.1.43b: a new node in the cell, numbered 10.1.37a, implemented by s-7pk89t8z6wymmj9, with the matching entry for `moved/impl.json` listed in the notes. The row covers only the project's own checks that `sheriff validate` runs. Record in the notes, for item 57 ("The hooks"), that the other project's own tools of the second step of 10.12 also change no file.

3. **The files of a project's generator whose listing rule is a draft (review a, finding 1 on s-dbk2vyeg8z5jxna).** Rule 10.9 (s-km4x4s26kv7pjze) says that while the rule that lists a generator is a draft, the code that the generator has written stays as it is. So s-dbk2vyeg8z5jxna refuses any change that a commit makes to the files of such a generator, compared with the commit's parent. Record review a's finding 3 on s-a8fn72xa782wvbk in the notes as a defect of an agreed node, to be fixed when that node next changes.

4. **Which wording of a rule of `project.json` the SpecSheriff tools read (review d, the doubt on the proposal).** Base rule 1.3.2 (s-utvqbypzhmgndug) says that a draft rule is not implemented, and the principle "Nothing unapproved is implemented" says the same. Rule 10.15 (s-qyjw8xez6t6adc3) generates code from the last approved wording of each node. Reading a draft wording would also let anyone switch off the tests at a push, or a project's own check, by editing the rule that lists them.
   - Add to `proposal:new-tools-1-project-g4` a sentence saying that the SpecSheriff tools read each rule of `project.json` in its last approved wording, and that a rule which has never been approved lists nothing. Cite s-utvqbypzhmgndug and s-qyjw8xez6t6adc3, with links.
   - The agreed draft "How a project's own code generator is run" still runs a generator only while the rule that lists it is approved, as rule 10.9 says. Make sure that the new sentence does not contradict it.
   - Bring s-7pk89t8z6wymmj9 and s-b6qdtghnyha3fhk into line with the sentence, where they read a rule of `project.json` as the commit keeps it.
   - A check that `sheriff.config.json` names, and that only a draft wording lists, is refused as unlisted. Say so in the notes. It takes effect once its rule is approved.

5. **The files that `sheriff citations` reads (review b, finding 5).** Row 10.1.39 (s-e84nggntkrcyumq) speaks of each citation "in the code, the tests or the documentation", not only in the code that the settings name. So take option B: `sheriff citations` reads every file that the repository keeps outside `specs/`, leaving out the bindings file and the test fixtures, as s-nh8b2hjvzasdxmd does for locations. The list of files that it reads goes. Record for stage 3 that the placeholder sid in `skills/tools/src/reindex.ts:104` must be rewritten.

6. **A commit that ends an exemption (review c, question 2).** Row 10.1.41 lists the changes that make a commit include an approved rule, and the owner included the removal of an `implements` link (2026-11-20). A rule whose exemption ends without code or a test is the same gap.
   - Write a proposal on row 10.1.41 (s-c4y63t285gg7jz7) as a complete new wording that adds one item: the rule stops being exempted, because an `exempts` link that reached it is removed or the node that declares that link becomes a draft (s-gf6n8ge4mke3pr2).
   - Add the same item to s-jgejd5rpd9d43pd.

7. **Merge commits (review c, question 1): the one question for the owner.** Under the agreed s-2x58az67bm6cxq2, a merge commit is compared with its first parent. So its message must name every node bound to the code that it brings in, and repeat each trailer of the merged commits, and git's default message "Merge branch …" is refused.
   - Write into s-qqs2svksmjct753 and s-txbwsthdqhvyzd2 the answer that the reviewer recommends: for a merge commit, `sheriff commit-message` considers only what the merge changes relative to every one of its parents, since each merged commit was checked when it was made. Change neither s-2x58az67bm6cxq2 nor any other check.
   - Write the question for the owner into the notes, in Russian, under "Вопрос ответственному". Put it in terms of what a developer sees under each answer. Give each option's cost, and the recommendation first.
   - Name in the notes the sentences that go if the owner rejects the recommendation.

## Other points

- Apply review c's DOUBT on the `implements` chain in s-txbwsthdqhvyzd2: the record of row 10.1.40 settles it, as the report says.
- Apply review c's DOUBT on the scissors line and `core.commentChar` in s-qqs2svksmjct753. git passes the commit-msg hook the message before git removes the comments and the scissors line.
- Apply review d's CUT of the first condition, the per-ref reason (fix 5) and the Russian title.
- Apply review d's DOUBT that adds the citation of `TextRule.list` to the item on levels in the proposal.
- In the example of s-7pk89t8z6wymmj9, use the check `spelling`, as review a's finding 7 says.
- Settle review a's finding 6, on the approval procedure and the `strict` flag, from the agreed node of the approval procedure (s-chsfpkgpmfk4fft) and rule 10.7.
- Where the readers question a phrase that agreed drafts of groups 1 to 3 also use, such as "makes this check", keep it as those drafts have it unless it is wrong. Say in the notes which phrases you kept, and why.
- Every new sid comes from `sheriff reindex`'s alphabet and is checked against `specs/`, `moved/` and `tools-drafts.json` for uniqueness.
- Every citation has its link, the Russian cites the same sids as the English, and every link target exists. Run the script's own checks, as in round a.

Report, as your final message: the keys you changed or added, each settlement and how you carried it out, the findings you rejected and why, and the text of the question for the owner.
