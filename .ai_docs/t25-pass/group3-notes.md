# T25, stage 2, group 3: notes on the drafts of items 27 to 32

The drafts of items 27 to 32 are in `tools-drafts.json`: five nodes of the appendix of the tools, rewritten, and four new nodes.
A proposal sits beside them: `proposal:s-ztseyetus7np6br-g3`, a change to the agreed "What `sheriff reindex` writes", added at the coordinator's request.
Round b added two proposals on agreed rules of the guidelines: `proposal:s-9j2mmnuuwmx5ksn` (rule 9.4) and `proposal:s-hhnahzmhahf8jht` (rule 8.4).
Round c added three more proposals: `proposal:new-tools-1-settings-g3` ("Project-wide settings"), `proposal:s-gb8s9657a65hqmv-g3` (the node on earlier releases) and `proposal:row-10-1-35a` (a new row of the main table of checks).
Round e carried out the owner's ruling of 2026-11-24 on Q1 and the principle that the owner changed the same day. It added four proposals on rules of the guidelines and on group 2's agreed drafts, a new row of the main table of checks and a new node of the appendix of the tools. Group 3 has no question for the owner: every question was settled by a rule, a ruling or the code.

`propose-group3.mjs` wrote the drafts:

- It copied `tools-drafts.json` to `tools-drafts.before-group3.json` before its first run, and on every run it rebuilds the keys of the group from that copy.
- Before it writes, it checks each draft: each citation has a link, each `cites` link has a citation, the Russian cites the same sids as the English, no citation by location is outside backticks, each link points at a known node, the new sids are unique across `specs/`, `moved/` and the drafts, and each example names its most likely mistake.
- It refuses to write where a key outside the group would differ from the copy.
- It also writes `english-group3.md`, the English of every node of the group, for EngStickler's readers.

Two runs gave identical `tools-drafts.json` and `english-group3.md`. Only the ten keys of the group differ from `tools-drafts.before-group3.json`, and the agreed `proposal:s-ztseyetus7np6br` is byte for byte as it was.

The phrase checks read only the changed items of the proposal. Its other sentences are agreed in group 1 and stay as they are, including "while an approval of its current wording stands", which the agreed drafts of later groups would write as "is in force".

## Agreed

The owner agreed to group 3 on 2026-11-24: «ок», in answer to «Согласны с группой 3?».

`agree-group3.mjs` records the agreement. It copied `tools-drafts.json` to `tools-drafts.before-agree-group3.json` and rebuilds the group from that copy, and two runs gave identical files.
- It marks the 27 keys that `group3-assessments.json` assesses as agreed on 2026-11-24 and adds the agreement to each key's `rulings`.
- It writes 9 decisions into the `meta.decisions` of their proposals, each naming the owner's agreement, and removes the proposed fields: rule 9.4, rule 1.5.2, rule 10.5, rule 1.6.1 (two), row 10.1.43, row 10.1.43b (two) and the judgement on code.
- Every sid that a decision cites has a link, except s-xhcmchcngykvn2k. The decision of 2026-11-20 that `proposal:new-spec-1-6-tests` took over from rule 1.6.1 cites that node of the old form, which the new form drops, so no link can point to it.
- No key outside the group changed.

**Proposals that override an earlier agreed draft through `base`.** Stage 3 moves the newer wording, not the one in `base`:
- `proposal:s-ztseyetus7np6br-g3` over `proposal:s-ztseyetus7np6br` ("What `sheriff reindex` writes");
- `proposal:new-tools-1-settings-g3` over `new:tools-1-settings` ("Project-wide settings");
- `proposal:s-gb8s9657a65hqmv-g3` over `new:tools-2-reindex-earlier` (the node on earlier releases);
- `proposal:s-nyh9yk22ba6g77q-g3` over `proposal:s-nyh9yk22ba6g77q` (rule 10.4);
- `proposal:s-vp24dqydygztqbt` over `s-vp24dqydygztqbt` ("The review of a commit");
- `proposal:new-tools-10-verdict` over `new:tools-10-verdict` ("The reviewer's verdict");
- `proposal:new-tools-7-3-review-code` over `new:tools-7-3-review-code` ("The judgement on the code that a commit changes").

The proposals on rules of the new form (9.4, 1.5.2, 1.6.1 with its two split nodes, 8.4 and 10.5) and on rows 10.1.35a, 10.1.43 and 10.1.43b replace the wording in `newform.json` and `moved/` at stage 3. `proposal:new-spec-1-6-runs` was deleted before the owner saw the page, and rule 1.6.1's sentences on when the checks run are gone with it.

**Technical replacements that stage 3 applies**, as the page lists them:
- rules 1.3.1 (s-tgrnpagrb58tya7) and 6.1 (s-sn6au3vcr9uy5pm): `declaredIn` {file, declaration} becomes `jsonSchema` {file, pointer};
- row 10.1.35 (s-f5mm7tagez38ffz) loses its `checks` link to rule 8.4;
- rule 8.4: its new decision is written in `meta.decisions` in place of the decision of 2026-11-10 on `declaredIn`;
- group 2's agreed drafts s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c, s-8wp7xm7g3u8gscq and s-trwczfskj5zmuft: "regardless of whether the specification is approved or a draft", an English-only fix;
- rule 1.2.6 (s-xqs2e24mx5253ye): "The checks" cites s-5j9s5dstbawdd69 in place of s-m4h279nbaqkpa3t;
- rules 1.3.2 (s-utvqbypzhmgndug), 1.3.3 (s-9g7jj8z4yf9kq93) and 10.6 (s-qzthyh7yqvfhsa2): the tests that must pass cite s-x8uzc8z44pwtd3h in place of s-m4h279nbaqkpa3t;
- row 10.1.44 (s-aufnqn6t7y2me7a): its `checks` link goes to s-x8uzc8z44pwtd3h in place of s-m4h279nbaqkpa3t.

The other items of the list of changes outside the group (the impl.json mappings, `config.schema.json`, items 38, 40, 48, 49 and 58, and `.ai_docs/INDEX.md`) stay as that list records them.

## Round h: the last fixes before the owner's page

`fix-group3-h.mjs` applies `review-g3g.md` and the coordinator's rulings of round h. It copied `tools-drafts.json` to `tools-drafts.before-group3-h.json` before its first run and rebuilds the group from that copy. Two runs gave identical files. Nine keys changed and one was added. It writes `english-group3.md` and `english-group3-changed-h.md`.

- **R1, in the reviewer's words:** row 10.1.43 says "the rules named in the commit", as rule 1.6.1 does, and both `change` fields say so.
- **R2:** `proposal:new-tools-7-3-review-code` (new, on group 2's agreed s-rd9nftptjuz6bwv) judges the changed code "outside the files generated from the specification". It carries the proposed decision on the generated files.
- **V1:** the `change` field of `proposal:s-vp24dqydygztqbt` no longer says «ещё и».
- **E1, settled by the owner's ruling of 2026-11-24** («не блокировать, а предупреждать»): rule 10.5 takes option B in the reviewer's words. A commit that needs only the judgement on comments is not refused when the review cannot be carried out; the tools report why as a warning. The first sentence of "The reviewer's verdict" says the same for `sheriff review`. Both `change` fields cite the ruling, and rule 10.5 carries it as its `proposedDecision`.
- **One node for "the files generated from the specification":** s-qyjw8xez6t6adc3, the base rule "Code generated from approved wordings". It says what the SpecSheriff tools and a project's own generators generate as the system's code, and s-a8fn72xa782wvbk ("What `sheriff types` generates") cites it. A base rule can cite it, while a node of the appendix of the tools would not suit rule 1.6.1 and the rows. "The judgement on a comment that a commit adds or changes" and the R2 proposal now cite it, as rule 1.6.1 and rows 10.1.43 and 10.1.43b already did. The sentence of "The review of a commit" that cites s-a8fn72xa782wvbk names the files that `sheriff types` writes, which is that node's subject, so it stays.
- **The readers**, as the coordinator listed: "extends from its first line", "however git is configured on the machine", "a grammar for a file's language" (twice), "treats as changes exactly the edits that can matter", "treats every edit as a change", "produce the same / different (syntax) trees", "when that line starts with `#!`", "is bound by SpecTags to the rules it implements", and "for every commit" / "for a commit" in rule 1.6.1's list. The other findings are rejected as style, or because the context settles them.
- **The page:** 27 sections. The «Оценка» blocks of row 10.1.43, rule 10.5 and `proposal:s-vp24dqydygztqbt` read as the review's would once its fixes are in; the block of the R2 proposal is the author's. The page says «владел» twice, both times as «владельцу счёта», the account owner in the agreed example of s-rd9nftptjuz6bwv, shown in the proposal and in the agreed wording beside it.
- `.ai_docs/INDEX.md` is still to list `fix-group3-h.mjs`, `english-group3-changed-h.md` and `tools-drafts.before-group3-h.json`.

## Round g: the reviews of round f

`fix-group3-g.mjs` applies the reviews of round f (`review-g3f-a.md`, `review-g3f-b.md`, `review-g3f-c.md`), the readers' reports on it (`english-g3f-fast.md`, `english-g3f-thorough.md`) and the coordinator's rulings of round g.

- It copied `tools-drafts.json` to `tools-drafts.before-group3-g.json` before its first run, and on every run it rebuilds the keys of the group from that copy.
- It runs the checks of round f. A `cites` link that a decision carried by the proposal cites now counts as cited.
- It refuses to write where a key outside the group would change, other than the deleted key.
- It writes `english-group3.md` and `english-group3-changed-g.md`.

Two runs gave identical files. Twelve keys changed, two were added and one was deleted.

### What changed

- **`proposal:new-spec-1-6-runs` is deleted** (review B, C1; the coordinator's ruling 1). Its sentences restated rules 10.2 and 10.3, and its reason restated their reasons. Nothing cited the node, and no decision of rule 1.6.1 concerns when the checks run. The Russian `change` of `proposal:s-m4h279nbaqkpa3t` says that these sentences left rule 1.6.1 because rules 10.2 and 10.3 already state them.
- **The decisions of rule 1.6.1** (review B, A2) are carried in each proposal's `meta.decisions`:
  - `proposal:s-m4h279nbaqkpa3t` keeps both decisions of 2026-11-19 and the decision of 2026-11-20 on `implements`;
  - `proposal:new-spec-1-6-checks` takes the decision of 2026-11-08 and the decision of 2026-11-18 on the table of checks of an extension;
  - `proposal:new-spec-1-6-tests` takes the decision of 2026-11-17, the decision of 2026-11-18 on generators and the decision of 2026-11-20 on the reason.
  The script refuses to write unless all eight are placed. Each `change` field says so in one line.
- **The files generated from the specification** (review B, A1 and E1): the judgement on code names "the system's code (§s-hheus6f395ynqvc) outside the files generated from the specification (§s-qyjw8xez6t6adc3)", in the reviewer's words, and the judgement on comments and row 10.1.43b say "outside" and cite s-qyjw8xez6t6adc3. "That the code implements or that the test is written from" replaces "this code … this test", after both readers. `proposal:s-m4h279nbaqkpa3t` and `proposal:row-10-1-43b` carry a second proposed decision on the generated files, in `proposedDecisions`.
- **Row 10.1.43, `proposal:row-10-1-43`** (new; the coordinator's ruling 3): "The system's code (§s-hheus6f395ynqvc) that a commit changes outside the files generated from the specification (§s-qyjw8xez6t6adc3) does what the rules that the commit names say, and nothing they do not". Its cost stays. It carries the proposed decision on the generated files.
- **Rule 10.5, `proposal:s-94k7b6r5kf65udf`** (new; review C, C1): only the last example changes, in the reviewer's words: "The answer passes the commit but reports a finding on code." This settles item 17 of group 2's list.
- **Rule 9.4** (review A, finding 10; the coordinator's ruling 2): retitled "Which edits change a test or code" / «Какие правки меняют тест или код». The `change` field lists the new title. The example says "so the commit changes no code" and "nests the key under the key above it", after the readers.
- **Rule 1.5.2** (review A, findings 11 and 12; the coordinator's ruling 2): the first sentence says "The system's code (§s-hheus6f395ynqvc) other than tests is bound…", and the exception says "an edit to a comment that leaves its SpecTags as they are, or to whitespace that does not affect what the code does", both in the reviewer's words. The `change` field says «Добавлено одно предложение» and lists the reworded first sentence.
- **"How two versions of code are compared"** (review A, findings 1 to 4, in the reviewer's words):
  - the first two sentences start from "Where the SpecSheriff tools have a grammar of a file's language", which removes the misreading "bound … by their syntax trees";
  - the tree holds "how the constructs nest";
  - "other than the file's first line where it opens with `#!`";
  - a new sentence: where the grammar finds a syntax error in either version, the two versions differ where their text differs.
  - After the readers: "A change to whitespace changes the tree", "YAML, CSS, SQL, Bash or JSON respectively", "drops the whitespace to which the language gives no meaning", "no grammar of a file's language", and "nests the key under the key above it".
- **`s-2x58az67bm6cxq2`** (review A, findings 5 to 9, in the reviewer's words): the Myers sentence is restored at the end of paragraph 1. A symbol, a test or a file changes "where its two versions differ", so files compared by text are covered. A symbol "runs from its first line to its last". Versions pair by "the one with the same name, nested in symbols with the same names". Example 1 deletes the line `log(id);` and says "contains". The removed sentence names the node by its new title.
- **Rule 10.4** (review C, A1): "…or that is described by a comment that the commit adds or changes", in the reviewer's words.
- **"The review of a commit"**: "only where the verdict lists a finding on code or on a node that the commit approves". The word "also" is dropped, since the thorough reader read it as requiring both findings.
- **"The reviewer's verdict"**: "a judgement other than the one on comments", after both readers.
- **"The judgement on a comment that a commit adds or changes"** (review C, D1 to D7, in the reviewer's words): a comment is added or changed where its text, with whitespace left out, differs from every comment of the same file in the parent, so re-indenting TypeScript starts no review. The comments are "the parts of the file that the SpecSheriff tools leave out of the trees as comments". The node also says:
  - "on a comment that a commit adds or changes";
  - "(§s-kgbzk2ph9e6jfb4)" after "a file bound as a whole";
  - "the innermost such symbol or test";
  - "only where either of the following holds";
  - `sheriff review` is the subject of the sentence on the code given;
  - «если после него нет ни символа, ни теста», and in English "where no symbol or test follows it".
  - After the readers: "outside the files generated", "judges comments on every commit that adds or changes a comment", and "a problem with a comment".

### Sentences in the author's own words

`english-group3-changed-g.md` lists every English sentence that differs from round f. Those not named above as the reviewer's words are the author's: the wording of row 10.1.43, the sentence on the review of a commit without "also", and the readers' fixes.

### Findings rejected, with the reason

- **"has the status `approved`" → "the approval status"**, **"Where they run"**, **"name where and when"**, **"A failed check refuses the change"**, **"binary"**, **"still agree"** and **"the work is focused"**: agreed sentences of rule 1.6.1 that break no rule.
- **"leaves the specification a draft"** and **"decide the outcome of the commit"**: agreed sentences of group 2.
- **"A symbol or a test of the commit's parent" → "in"**: applied as part of the reviewer's finding 8.
- **"holds" → "contains", "records"**: applied in example 1 of `s-2x58az67bm6cxq2`; elsewhere "holds" is the reviewer's own word for what a tree holds.
- **"nobody's judgement"**: style, in an agreed sentence.
- **"other than its SpecTag"** for a test's name: the readers' favoured reading is the meant one, and the example of a renamed test shows it.

## Round f: syntax trees, the split of rule 1.6.1, and the judgement on comments

`fix-group3-f.mjs` applies the reviews of round e (`review-g3e-a.md`, `review-g3e-b.md`), the readers' reports on it (`english-g3e-fast.md`, `english-g3e-thorough.md`) and the coordinator's rulings of round f.

- It copied `tools-drafts.json` to `tools-drafts.before-group3-f.json` before its first run, and on every run it rebuilds the keys of the group from that copy.
- It runs the checks of round e, with two more:
  - a `cites` link that a decision of the node cites, as `citedInDecisions` records, is kept;
  - every agreed sentence of rule 1.6.1 is found, word for word, in one of the four nodes of the split, unless the proposals list it as changed.
- It writes `english-group3.md` and `english-group3-changed-f.md`.

Two runs gave identical files. Thirteen keys differ from the copy: ten that round f changed and three that it added.

### What changed

- **Syntax trees, not lines** (review A, finding 1; the coordinator's ruling 1). `new:tools-7-2-changed-line` (sid s-u6mj5yv8ngnz79v) is now titled "How two versions of code are compared". The tools compare two versions of a symbol, a test or a file bound as a whole by their tree-sitter syntax trees. Comments are left out, other than a first line of the file that opens with `#!` (review A, finding 3). A test's name is left out, other than its SpecTag.
  - A tree holds the kind of each node and the text of each token, so renaming an identifier changes the code (the ruling of 2026-11-11), and so does a blank line inside a string literal (review A, finding 2).
  - Whitespace counts only where the grammar makes it part of the syntax. This settles review B's question on which whitespace counts: `a:hover` against `a :hover` in CSS and `x=1` against `x = 1` in Bash give different trees, and a re-wrapped call in TypeScript gives the same tree.
  - The formats stay named by file extension. In any other file, two versions differ where their text differs.
  - The runs, the pairing of lines and the bullet on whitespace are gone. The three examples show a re-wrapped call, a renamed test and a re-indented YAML key.
- **`s-2x58az67bm6cxq2`** rests on the trees: a symbol, a test or a file bound as a whole changes where its two versions give different trees. The paragraph on reading removed and added lines is gone; the pairing of versions by name, and the renamed test, stay. Example 1 still holds: the parent's version of `close` holds the deleted line, so the trees differ. Example 2 says that the stylesheet's code is unchanged and names the mistake as counting any change to the text "as a change to its code", after the readers.
- **Rule 1.6.1 is split** (review B, A1 and A2; the coordinator's ruling 2). Items 11 and 12 of group 2's list of changes outside the group fell due when the rule changed.
  - `proposal:s-m4h279nbaqkpa3t` keeps the sid and the reviewer's judgements, which rule 10.2 cites. Its new title is "What the independent reviewer judges", and its first sentence says "In the review of a commit". The judgements on code and on comments leave out the files generated from the specification (item 11). The judgement on comments says "or that this test is written from" (review B, A1). The base specification is cited at first use. Its reason is about the judgements as a whole.
  - `proposal:new-spec-1-6-checks` (new, s-5j9s5dstbawdd69), "What the checks enforce": "The following are checked mechanically" (rule 7.4.1), the two tables of checks cited at first use, "Every check except the review (§s-m4h279nbaqkpa3t) is deterministic", and the sentence on a failed check. Its reason is the first two sentences of the agreed reason.
  - `proposal:new-spec-1-6-runs` (new, s-ec6meku7xd34ych), "The checks on a commit and on an agent's edits": the agreed paragraph, with the second paragraph of the agreed reason. The first sentence of that reason is rewritten, since "Run after each of an agent's edits" read as an order (the thorough reader).
  - `proposal:new-spec-1-6-tests` (new, s-x8uzc8z44pwtd3h), "When the tests must pass": the agreed sentences, with the system's code and a project's own checks and generators cited at first use, and the agreed third paragraph of the reason and the agreed example.
  - Each `change` field lists what changed. The owner agrees to every changed agreed sentence with the group.
- **Row 10.1.43b** (review B, C1): "or that this test is written from", and the files generated from the specification are left out.
- **Rule 10.4, `proposal:s-nyh9yk22ba6g77q-g3`** (review B, B1): the rules of code or a test "that holds, or lies directly below, a comment that the commit adds or changes", in the reviewer's words. The `cites` links to s-vsh384ybt4w25a2 and s-km4x4s26kv7pjze are restored: the decisions of the agreed proposal cite them (`citedInDecisions`). No link is dropped.
- **Rule 1.5.2, `proposal:s-kgbzk2ph9e6jfb4`** (review A, finding 4): the `cites` link to s-qzthyh7yqvfhsa2 is restored, since the node's decision of 2026-11-04 cites it. No link is dropped. The exception now reads one way only, after the thorough reader: "an edit that changes no code (§s-9j2mmnuuwmx5ksn): an edit to a comment, or to whitespace that does not affect what the code does".
- **Rule 9.4, `proposal:s-9j2mmnuuwmx5ksn`** (the readers): the example says "By contrast, a commit that indents a key of a YAML file further, which nests the key in the key above it, changes the code". "cannot tell apart from its code".
- **"The review of a commit", `proposal:s-vp24dqydygztqbt`** (review B, D1 and D2, in the reviewer's words): while the specification is a draft, the commit is refused only where the verdict also lists a finding on code or on a node that the commit approves. The example names the fourth ground: the commit changes no comment in the code.
- **"The reviewer's verdict", `proposal:new-tools-10-verdict`** (review B, E1, in the reviewer's words): the readable answer is a list of two kinds. The reason says "a verdict that passes the commit and lists a finding on code", after both readers on "a pass".
- **"The judgement on a comment that a commit adds or changes", `new:tools-7-3-review-comments`** (review B, F1 to F4; the coordinator's ruling 4):
  - paragraph 1 in the reviewer's words (F3): "only as a warning", and the finding names each rule that the comment contradicts;
  - paragraph 2 (F2): every comment in the system's code other than the generated files; in a file whose trees the tools build, the comments are what the tools leave out of the trees; in any other file, the reviewer itself tells the comments apart from the code;
  - paragraph 3 (F2): removing one line of a comment changes the comment; "where the commit adds" and "except its SpecTags", after the thorough reader;
  - the code given to the reviewer (F1, as the coordinator ruled): for a comment in a file bound as a whole, that file; for a comment in a symbol or a test, or directly above one, that symbol or test; for any other comment, the symbol or the test that follows it, or the whole file where none follows it;
  - the reason split in the reviewer's words (F4), with "warrants a warning, but not a refusal of the commit" after the fast reader;
  - the example's mistake: "as `sheriff review` does for a defect in the code", after both readers.

### Sentences in the author's own words

`english-group3-changed-f.md` lists every English sentence that differs from round e. Those taken from a review are named above as the reviewer's words. All others are the author's, among them every sentence of "How two versions of code are compared", the reasons of the four nodes of rule 1.6.1's split, and the list of the code that the reviewer gets for a comment.

### Findings rejected, with the reason

- **"As long as" → "Provided that"** in rule 9.4 (the thorough reader): "as long as the SpecTag stays the same" is the agreed wording, and "provided that" is a phrase that earlier rounds removed.
- **"SpecTags at the start of a file, and an entry in the bindings file, bind the whole file"** (the thorough reader) and **"the code its SpecTags bind"** for an entry (the fast reader): agreed sentences of rule 1.5.2 that break no rule; rule 1.5.2 says that an entry holds its file's SpecTags.
- **"should wait"**, **"Every check but the review is binary"**, **"Where they run"** and **"no test has to pass"** in rule 1.6.1: agreed sentences that break no rule. Only the sentence that read as an order was rewritten.
- **"that this code implements" → "that that code implements"** (the thorough reader): the principle's own words, which the owner agreed to.
- **"nothing of what the author of the change meant"** and **"Shown what each judgement needs"** in rule 10.4: agreed sentences of group 2 that break no rule.
- **"deciding for the reviewer what it meant"** in the verdict's example: an agreed sentence of group 2.
- **"finding on" → "finding about"** (the thorough reader): "a finding on" is the term of group 2's agreed nodes, such as "each finding on a statement".
- **"leave out" → "ignore"** (the fast reader): style; "leave out of the trees" says what the tools do.
- **"with its file, its lines" → "the path of its file, its line numbers"** (the thorough reader): the words of the agreed judgement on code (s-rd9nftptjuz6bwv).
- **The findings on "A line that changes the code"** of round e: the node is rewritten, so its old sentences are gone.

## Round e: the owner's ruling on Q1

`fix-group3-e.mjs` carries out the owner's ruling of 2026-11-24 on Q1 and the principle "Deterministic checks hold every participant to the contract", which the owner changed the same day.

- It copied `tools-drafts.json` to `tools-drafts.before-group3-e.json` before its first run, and on every run it rebuilds the keys of the group from that copy.
- It runs the checks of round d, and refuses to write where a field still names Q1 or where a key outside the group would change.
- It writes `english-group3.md` and `english-group3-changed-e.md`, which lists every English sentence that round e adds or rewrites. All of them are in the author's own words, since no review has read them yet.

Two runs gave identical files. Ten keys differ from the copy: three that round e changed and seven that it added.

### The ruling and the principle

The owner's ruling of 2026-11-24, word for word: «Нужно подходить дифференцированно, в зависимости от реального эффекта правок. Правка форматирования должна считаться изменением, достойным внимания рецензента и ревьювера, только там, где это влияет на логику. Например, отступы в yaml — да, отступы в ts — нет. Правки в комментариях нужно проверять на соответствие (но не блокировать, а предупреждать) в случае проблем с ними. Опять же с исключением для SpecTag — он должен обеспечивать правильную связь.»

The same day, the owner agreed to a change of the principle "Deterministic checks hold every participant to the contract" in `docs/principles.md`. The independent reviewer also judges, for every commit that adds or changes a comment in the code, whether each such comment is consistent with the code that it describes and with the rules that this code implements. Its finding about such a comment is only a warning. The cost that the owner accepted: a commit that changes only comments also starts a paid run of the reviewer.

### What round e changed

- **Rule 9.4, `proposal:s-9j2mmnuuwmx5ksn`:** rewritten. With the SpecTag unchanged, renaming a test, adding, removing or rewording a comment, and changing whitespace that does not affect what the code does in the language of its file change neither the test nor the code. In a file whose comments and whitespace the checks cannot tell from its code, every edit changes the code. Its `dependsOn` is gone, and its `question` says that it carries out the ruling. Its `proposedDecision` records the ruling.
- **Rule 1.5.2, `proposal:s-kgbzk2ph9e6jfb4` (new):** after "A change anywhere in a file bound as a whole is a change to the code its SpecTags bind", a new sentence makes the one exception: an edit to a comment or to whitespace that changes no code, citing rule 9.4. Its `proposedDecision` records the ruling.
  - The agreed node in `moved/` holds a `cites` link to s-qzthyh7yqvfhsa2 that no citation matches. The proposal drops that link; a change to a link leaves the status as it is.
- **Rule 1.6.1, `proposal:s-m4h279nbaqkpa3t` (new):** the list of the reviewer's judgements gains the judgement on comments, in the principle's words. The reason names it among what no script can decide. Its `proposedDecision` cites the principle.
- **Rule 10.4, `proposal:s-nyh9yk22ba6g77q-g3` (new, on the proposal agreed in group 2):** the reviewer also gets the wording of each rule that a SpecTag binds to code or a test in which the commit adds or changes a comment. A commit that changes only a comment changes no code, so the agreed item would not give the reviewer those rules. The reason names the new judgement.
  - The agreed proposal holds `cites` links to s-vsh384ybt4w25a2 and s-km4x4s26kv7pjze that no citation matches. This proposal drops them.
- **Rule 10.2:** unchanged. It runs the review on every commit for which the list in rule 1.6.1 names a judgement, so the new judgement needs no word there.
- **Row 10.1.43b, `proposal:row-10-1-43b` (new, sid s-td4e3rdga6azav9):** "Each comment that a commit adds or changes in the code or in a test is consistent with the code that it describes and with the rules that this code implements". Its "On failure" cell reads "reported as a warning, naming the file and the line of the comment". The table already states a check that only reports in this way: "reported by the node's sid". Rule 1.6.1 says that a failed check refuses the change unless the table says otherwise, so the row must say it. Its `proposedDecision` cites the principle.
- **Rows 10.1.28a and 10.1.40:** unchanged. Both turn on a change to code or tests, which rule 9.4 defines, so a commit that changes only comments triggers neither, and does not have to name a rule in its message.
- **"The judgement on a comment that a commit adds or changes", `new:tools-7-3-review-comments` (new, sid s-7vpsdsy8dpqdy6r, tools 7.3.4d):** `sheriff review` reports each finding on a comment as a warning and refuses no commit because of it. The reviewer judges the comments that the SpecSheriff tools leave out when they read a line of code, on every commit that adds a line holding part of one, even where the commit changes no code. It gets each symbol, test or file holding such a comment in full. A SpecTag is not judged here, since a change to it is a change to the code. The node implements row 10.1.43b.
- **"The review of a commit", `proposal:s-vp24dqydygztqbt` (new, on group 2's agreed draft):** the list of judgements for which `sheriff review` asks a verdict gains the judgement on comments.
- **"The reviewer's verdict", `proposal:new-tools-10-verdict` (new, on group 2's agreed draft):** a verdict that passes the commit may list findings on comments; one that refuses it lists at least one other finding. The reason and the example say "a finding on code".
- **"A line that changes the code", `new:tools-7-2-changed-line`:** the SpecSheriff tools read a line as tokens in a file whose language a description covers, and in a file bound as a whole whose name ends in `.yaml`, `.yml`, `.css`, `.sql`, `.sh` or `.json`, which they parse with the tree-sitter grammar of YAML, CSS, SQL, Bash or JSON. Whitespace counts where the file's language gives it a meaning, such as the indentation of a line in Python or YAML. In any other file, every line that the commit removes or adds changes the code. A third example shows a re-indented YAML key.
- **"What a commit adds, changes and removes in the code and the tests", `s-2x58az67bm6cxq2`:** a file bound as a whole changes where a line of it changes the code. Example 2 now shows a reworded comment in a stylesheet that leaves the stylesheet unchanged. Its `dependsOn` is gone.

### Where the formats are named

The coordinator asked first to check s-33fw3ga4ctd94dq and the nodes on how the SpecSheriff tools read a language. In the agreed drafts of group 2, "a file whose language a description covers" means a file whose symbols the SpecSheriff tools identify: s-33fw3ga4ctd94dq, s-5qdjyf6t898rsd4, s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c and s-5hb9k2e34dgn284 all read it that way. A description of YAML, CSS, SQL, Bash or JSON without symbols would make s-5qdjyf6t898rsd4 refuse SpecTags at the start of such a file, and would change the meaning of the other four. So round e leaves "description" as it is and names the formats in the one node that reads them: "A line that changes the code". That node states which files are read as tokens, by which grammar, and what holds in any other file.

The release's formats are those most often bound as a whole: settings (YAML, JSON), stylesheets (CSS), queries (SQL) and scripts (shell). tree-sitter has a grammar for each. Which whitespace each format gives a meaning is a matter for the code and its tests, as for Python's indentation: the node states the requirement and names the indentation in Python and YAML as examples.

### What round e left for the coordinator

- The page of group 3 is not rebuilt, as asked. `gen-group3-page.mjs` still holds Q1 and the order of round d, `group3-ru.json` lacks the Russian of the new stage-3 notes and locations, and `group3-assessments.json` lacks the seven new keys and still names Q1 for `s-2x58az67bm6cxq2`. They are updated once the reviewers find the drafts of round e ready.

## Round d: how the drafts were changed

`fix-group3-d.mjs` applied the final reviews, `review-g3c-a.md` and `review-g3c-b.md`, the reports of EngStickler's readers on round c, `english-g3c-fast.md` and `english-g3c-thorough.md`, and the coordinator's rulings of round d.

- It copied `tools-drafts.json` to `tools-drafts.before-group3-d.json` before its first run, and on every run it rebuilds the keys of the group from that copy.
- It runs the checks of round c. It also checks that the split of the agreed items of `proposal:s-gb8s9657a65hqmv-g3` keeps every word of each item, apart from the joining "and", the repeated subjects and the antecedent written out.
- It writes `english-group3.md` and `english-group3-changed-d.md`.

Two runs gave identical files. Fourteen keys differ from the copy: every key of the group except `proposal:s-ztseyetus7np6br-g3`, which round d did not touch. The earlier sections describe the earlier rounds; this section prevails where it differs.

### What changed

- **Review A, `proposal:new-tools-1-settings-g3`:** the changed sentence is now a lead phrase and a list of three kinds of file, in the reviewer's words. The sentence on a file that matches both patterns is a paragraph of its own. The `change` field says so.
- **Review A, Q1:** Q1 covers every file bound as a whole, including a JSON file bound by an entry in the bindings file. The heading, the "Why" paragraph and the Russian page are fixed in the reviewer's words. The reason in the Russian `change` of `proposal:s-9j2mmnuuwmx5ksn` is widened in the same words, so that it agrees with Q1.
- **The location of "A line that changes the code"** named the node it follows by that node's title before round b. It now names "What a commit adds, changes and removes in the code and the tests".
- **Review B, own-kinds:** the first sentence of paragraph 3 says "by the property" and cites rule 8.4. The Russian says «тип узлов» in the places the reviewer listed.
- **Review B, `proposal:s-hhnahzmhahf8jht`:** «тип узлов» in the Russian of the example.
- **Review B, `proposal:row-10-1-35a`:** "with the `needsCode` that the extension gives it".
- **Review B, `proposal:s-gb8s9657a65hqmv-g3`:** the `change` field states the cost: removing `declaredIn` is not a rename, so an approved rule whose list loses it becomes a draft, and `sheriff reindex` names it.
- **The coordinator's ruling on review B's finding 5:** the agreed items of the node on earlier releases are split mechanically inside the proposal. The RecordType item is a list of nested steps with the same words. Each item that paired renames is one item per rename. Where a split item would lack its subject, the subject is repeated ("the kind of node", "a node's status"), and "its lines" is written out as "each line of `specs/_confirmations.jsonl`". The Russian `change` lists this in one line.
- **The readers:**
  - "renames, keeping its SpecTag and changing nothing else in it" for "renames outside its SpecTag". Both readers found "rename outside" unnatural, and a Python test's SpecTag is in its mark, not in its name;
  - "where the commit changes any part" for "where it changes any part": "it" could be the file;
  - "From the specification as the commit leaves it, `sheriff binding` takes …": after "name", "from the specification" read as that verb's object (both readers);
  - "its value is the value of the property": "the value" alone did not say whose;
  - "the refusal names the one that cannot be found", so that one thing is not named by two words.

### The owner's page

`gen-group3-page.mjs` writes `group3-page/index.html`. It is `gen-group2-page.mjs` adapted to group 3, and it is not published: the main session checks it in a browser and publishes it.

- `group3-assessments.json` holds the five lines of one «Оценка» per key, taken from the latest review of that key: `review-g3c-a.md` or `review-g3c-b.md`, or `review-g3b-c.md` for `proposal:s-ztseyetus7np6br-g3`. Each line assesses the final wording, so a line that a review marked ✗ before a later fix now says what makes it ✓.
- `build-group3-ru.mjs` writes `group3-ru.json`, the Russian of what the drafts hold only in English: the stage-3 notes, the removed passages, the locations, the verdicts and the approved nodes of tools.json that the drafts rewrite or are carved from.
- The page has 15 sections, in the order of items 27 to 32, each proposal next to the nodes that it serves. After them come four lines on nodes changed only to carry out a decision, and Q1.
- The page was opened in a browser: every section opens, every link to a section finds it, and the page does not scroll sideways.

### The coordinator's fixes after round d

The coordinator checked the page in a browser and asked for three fixes, all made at their source.

- **No history of the rounds** (the rule "Only a finished wording is shown, once"). A final step of `fix-group3-d.mjs` rewrites every `change` field of the drafts and of the parts of the proposals. Each field now compares the final wording with the approved or agreed one, or says in one line why a new part exists. No field names a round, a review, a reviewer or a reader, and the script refuses to write if one does.
  - The removed passages that only an intermediate draft held are no longer listed as removed: two in `s-2x58az67bm6cxq2` and one in `s-t383grkn3q68dpf`.
  - `group3-assessments.json` holds only the five lines of each «Оценка», and the page no longer shows the report, the verdict or a note.
  - The history of the `change` fields is in this file's sections on rounds b, c and d, and in full in `tools-drafts.before-group3-d.json`.
- **«ответственный», never «владелец»** (terms-ru.md): in the page's heading and opening paragraph, and in the Russian stage-3 note of `s-j9r8z4xdrfkfs47`.
- **Two English fixes in `s-5hb9k2e34dgn284`**, in the coordinator's words after the readers' reports on round d (`english-g3d-fast.md`, `english-g3d-thorough.md`). They replace the readers' fixes of round d to the same sentences:
  - "The value of a member that is an object is the value of the member's property that `TextRule.list.property` names." This matches the node's reason. In Russian: «Значение элемента, который является объектом, — значение того его свойства, которое называет `TextRule.list.property`.»
  - "Where the file to which the list points, the place in it or the symbol cannot be found, the refusal names the one that cannot be found." "The place" now says what it is a place in. In Russian: «Если не найдены файл, на который указывает список, место в нём или символ, отказ называет то, что не найдено.»
  - The coordinator rejected the readers' other findings on round d: in each case, the sentence before it in the node gives the antecedent or the parallel that the reader missed.

After these fixes the page has no "Раунд", no "review-g3" and no «владел», and all 15 sections open.

### Sentences in the author's own words

`english-group3-changed-d.md` lists them: the readers' fixes above, apart from those in `s-5hb9k2e34dgn284`, which the coordinator's wording replaced. No other sentence of round d departs from a review's or the coordinator's words.

### Findings rejected, with the reason

- **Agreed sentences that break no rule** (both readers). Review B checked these proposals and named only the items now split. Under the coordinator's ruling, an agreed sentence that breaks no rule stays. The readers' findings on such sentences:
  - in the node on earlier releases: "occurs in one of these places", "until `sheriff.config.json` holds an entry", "has yet to choose", "is written in the form of the release", "A kind of node is also renamed where" and "the test's mark";
  - in "Project-wide settings": "is read as a test" and "those holding its tests";
  - in rule 9.4: "the comments in the tests" and "the checks".
- **"list member" for "member"** (fast reader): "member" is the term of `TextRule.list.members`.
- **"where" as a condition** (fast reader): it is the condition word of every agreed node.
- **"also include"** (fast reader): the commands it adds to are named in the sentence before it, in the same paragraph.
- **"the tokens of its file's language", "anything that cannot alter"** and **"leaves out of the comparison"** (readers, "A line that changes the code"): style; both readers' Russian has the meaning, and the final review found the node ready.
- **"that `meta.code`", "the place", "Comparing the two … ensures", "the nodes of the kind"** and **"The commit would then pass"**: each reader chose the meant reading, or the change would alter what the sentence says.
- **The row's missing final period** (both readers): no row of table 10.1 ends with a period.
- **"On failure: refused."** (fast reader): the header line of `english-group3.md`, not the row, which now reads "Its "On failure" cell reads: refused."

## Round c: how the drafts were changed

`fix-group3-c.mjs` applied the confirming reviews, `review-g3b-a.md` to `review-g3b-d.md`, the reports of EngStickler's readers on round b, `english-g3b-fast.md` and `english-g3b-thorough.md`, and the coordinator's rulings of round c.

- It copied `tools-drafts.json` to `tools-drafts.before-group3-c.json` before its first run. On every run it rebuilds the keys of the group from that copy, part by part.
- It runs the checks of round b before it writes, and refuses to write where a key outside the group would change. It also checks that each proposal built on an agreed draft differs from that draft only in the parts its `change` names, that the new row's sid is unique, and that each proposal has a `question` and a Russian `change`.
- It writes `english-group3.md` and `english-group3-changed-c.md`, which lists each sentence of round c written in the author's own words.

Two runs gave identical `tools-drafts.json`, `english-group3.md` and `english-group3-changed-c.md`. Fifteen keys differ from the copy: the twelve of round b and three new proposals. The agreed `proposal:s-ztseyetus7np6br`, `new:tools-1-settings` and `new:tools-2-reindex-earlier` are unchanged.

The sections "Round b" and "The drafts" below describe the earlier rounds. Where round c changed a node, this section says how, and it prevails.

### The coordinator's rulings, as applied

1. **What reviews B and D left "for the owner only"** went into the proposals. The owner agrees to them with the group, and each proposal's Russian `change` lists them:
   - `proposal:s-9j2mmnuuwmx5ksn` cites SpecTag in the agreed first sentence of rule 9.4, and holds review B's example;
   - `proposal:s-hhnahzmhahf8jht` holds review D's new second sentence of the reason and review D's example.
2. **Q1:** the question and option A name "a comment or the whitespace" («комментария или пробельных символов»). The owner's ruling of 2026-11-11 on whitespace is among the rulings searched first. The narrowed scope of rule 9.4 uses the wording of rule 1.5.2, in the proposal and in option A: "a file whose symbols the checks can identify".
3. **New proposals that carry out agreed rules:**
   - `proposal:new-tools-1-settings-g3`, with `base: "new:tools-1-settings"`: the bindings file joins the files that the SpecSheriff tools read for SpecTags (review C, finding 2; rule 1.5.2);
   - `proposal:s-gb8s9657a65hqmv-g3`, with `base: "new:tools-2-reindex-earlier"`, the agreed draft of that node: a `declaredIn` that points to the field `kinds` is removed, and any other that points into a JSON Schema becomes `jsonSchema` (review D);
   - `proposal:row-10-1-35a`, a new row after row 10.1.35, sid s-cgkkksc7efxhcst, in the format of `proposal:11-3-header-status-row`, with review D's text. `new:tools-7-2-own-kinds` now implements the new row and cites it twice, in place of row 10.1.35;
   - the exemption of the lists of a project's own kinds is gone from `s-5hb9k2e34dgn284`, with its links to s-vsh384ybt4w25a2 and s-czxaqvaesmu3gru.
4. **A line of code outside every symbol and test** (review B, item 4) was cited under Q1 as item 10 of group 2's list; it is now under "Questions for the owner".
5. **The readers** were applied where their Russian departed from the meaning or a phrase read two ways, as listed below.

### What changed, by report

- **Review A, s-j9r8z4xdrfkfs47:** the lead sentence is reordered and says "only where"; the Russian reason says «правка».
- **Review A, extensions-delivered:** the reviewer's sentence on composing the schema: the commands add each chosen extension's schema, where it has one, as they compose the schema of the specification.
- **Review B, s-2x58az67bm6cxq2:** the reviewer's reason; "The lines of a symbol or a test", so a test's decorators count; the paragraph on what a commit changes, adds and removes follows the first paragraph; the title is "What a commit adds, changes and removes in the code and the tests".
- **Review B, draft-rule:** "symbol" cites rule 1.5.2.
- **Review B, proposal:s-9j2mmnuuwmx5ksn:** the narrowed scope in the wording of rule 1.5.2; SpecTag cited in the first sentence; the example.
- **Review C, s-t383grkn3q68dpf:** "compares the entries of a node's `meta.code` and `meta.tests` regardless of their order".
- **Review D, own-kinds:** "each member of the `TextRule.list` of those rules", twice; a member that is an object and lacks its property is left to "An object in a list", so that one fault is refused once.
- **Review D, proposal:s-hhnahzmhahf8jht:** `TextRule.list.members` cites rule 5.1; «собственных guidelines проекта» in the Russian of paragraphs 2 and 3; the new reason sentence and the example; the `change` names the new row, the change to row 10.1.35 and the proposal for s-gb8s9657a65hqmv.
- **The readers:**
  - "The commands that read the chosen extensions also include" for "They also include": both readers read "They" as the three commands before it;
  - "a line of that symbol or test" for "one of its lines": both readers read "its" as the commit;
  - the renamed test: "A test that the commit renames outside its SpecTag, and changes in no other way, also stays the same test": both readers asked the same as what, and whether the commit changes anything else in it;
  - "any part of the file's text" for "any of the file's text";
  - "the language of its file" for "their language": a line has no language;
  - "each rule that those SpecTags name" for "the rule's": no rule was named in that paragraph;
  - "take into account only" for "count only";
  - "names the one that is missing" for "names it", which had three antecedents;
  - "the value of the property that `TextRule.list.property` names", in two nodes;
  - "The rule's `TextRule.list.jsonSchema`" for "Its …", which a reader took for the request's;
  - "keeps the declaration of each kind, including whether …" for "keeps each kind, and whether …";
  - "The commit would then pass, although the rule says … and the schema says …": the earlier "The rule would then say …" made the rule's words the result of the mistake (thorough reader).

### Sentences in the author's own words

`english-group3-changed-c.md` lists them under their keys. Besides the readers' fixes above:
- in s-2x58az67bm6cxq2, the citations of a symbol, a file bound as a whole and a test move into the paragraph that the review moved to second place, where they are first used;
- review B's narrowed scope of rule 9.4 is set into the agreed sentence;
- the three new proposals set reviewers' wordings into agreed nodes, and their other parts are copied unchanged.

### Findings rejected, with the reason

- **The agreed sentences of rule 9.4** (both readers): "is considered a change" → "counts as a change", "an edit to a test or code that can affect that check and one that cannot" restructured, "can affect" → "can change the outcome of". These are the owner's agreed sentences, and no rule on how a node is written marks them as breached (review B checked the proposal and asked only for the citation of SpecTag). Under the coordinator's ruling 1 and the brief, an agreed sentence is brought into line only where it breaks such a rule.
- **The agreed sentences of rule 8.4** (both readers): "its JSON Schema" for the extension of the schema (the owner's own words of 2026-11-10, «в свою JSON-схему»), "That rule's" with two possible antecedents, "carried out by code", "sets" → "defines", "each new kind". The same reason: review D checked the proposal and found only the citation and the reason, and both readers chose the meant reading. The proposal changes only what the reviews named.
- **"unchanged and in the same order"** (fast reader: in what order?), **"Comparing them"**, **"the place"** and **"what cannot alter what the code does"**: each reader chose the meant reading, and the order is that of the commit's parent, named in the same item.
- **"where one of its lines is a line that changes the code"** (fast reader): "changes the code" is the defined term of "A line that changes the code"; the two readings of "its" are removed by "a line of that symbol or test".

## Round b: how the drafts were changed

`fix-group3-b.mjs` applied the four reviews, `review-g3-a.md` to `review-g3-d.md`, the reports of EngStickler's readers, `english-g3-fast.md` and `english-g3-thorough.md`, and the coordinator's rulings of round b.

- It copied `tools-drafts.json` to `tools-drafts.before-group3-b.json` before its first run. On every run it rebuilds the keys of the group from that copy, part by part.
- It runs the checks of `propose-group3.mjs` before it writes, and refuses to write where a key outside the group would change. It also refuses a group draft that still says "makes this check whether" or "spacing".
- It writes `english-group3.md` and `english-group3-changed.md`. The second lists each sentence of round b written in the author's own words, under its key.

Two runs gave identical `tools-drafts.json`, `english-group3.md` and `english-group3-changed.md`. Twelve keys differ from the copy: the ten of round a and two new proposals, `proposal:s-9j2mmnuuwmx5ksn` (rule 9.4) and `proposal:s-hhnahzmhahf8jht` (rule 8.4). The agreed `proposal:s-ztseyetus7np6br` is unchanged.

The section "The drafts" below describes round a. Where round b changed a node, this section says how, and it prevails.

### The coordinator's rulings, as applied

1. **`sheriff guard` without a chosen extension.** "The chosen extensions and the installed plugin" names `sheriff guard` among the commands that read the chosen extensions, and cites "An edit judged before it is made" (s-st6td4mua9uqt9z). Its Russian `change` says that on such a machine every edit by the agent is refused until the plugin is updated. The owner's ruling of 2026-11-18 on row 10.1.27c settles it, so no question goes to the owner.
2. **Comments in a file bound as a whole.** This was Q1, which the owner settled on 2026-11-24 (see round e). The drafts follow the recommended answer A: `s-2x58az67bm6cxq2` keeps "including a comment or whitespace", carries `dependsOn: "Q1"`, and keeps its example 2. `proposal:s-9j2mmnuuwmx5ksn` narrows the exemption of rule 9.4.
3. **Rule 8.4 and `declaredIn`.** `proposal:s-hhnahzmhahf8jht` removes the sentence on `declaredIn` from rule 8.4. Its `question` is "None: carries out the owner's rulings of 2026-11-13 on row 10.1.35". The rule-8.4 bullet is gone from the list of changes outside the group.
4. **s-t383grkn3q68dpf, fix A.** The node compares each list with what `sheriff reindex` would write, and its paragraphs that defined the lists are gone. `proposal:s-ztseyetus7np6br-g3` now defines both lists. Review C's finding 4 is applied to it, and its `meta.code` item names "each file, other than a test file", so the code of a project's own checks and generators stays in the list (the ruling of 2026-11-13).
5. **"makes this check regardless of whether the specification is approved or a draft"** in every node of the group. In "The code and the tests of a draft rule" the reviewer moved that sentence into the first paragraph as "It does so whether…"; it reads "It does so regardless of whether…". The same English-only fix for the agreed drafts of groups 1 and 2 is in the list of changes outside the group.
6. **"the files that the repository keeps"** stays. The readers' "tracked in the repository" is rejected.

### What changed, by report

- **Review A, s-j9r8z4xdrfkfs47:** `project.json` cites "Where the files are"; one sentence on the refusal, which names the specification's owners in every case; the reviewer's reason; the paragraph that listed the settings is cut, with its link to s-mbmnsnxenmavu3z; the stage-3 note names approvals.ts:97.
- **Review A, extensions-delivered:** "refuses to run" and what the refusal names, in the text and the example; `sheriff guard` named (ruling 1).
- **Review B, s-2x58az67bm6cxq2:** the reviewer's three edits: a renamed test is the same test; the sentences on adding and removing a file bound as a whole are deleted; a new paragraph says that a commit changes only what both the parent and the commit hold, adds what only the commit holds, and removes what only the parent holds. So "adds or changes", as the agreed nodes of group 2 use it, no longer covers removed code. Also: the first commit of a repository is compared with an empty repository; the two kinds of SpecTag that a commit adds or changes are a list; the sentence that restated rule 1.5.2 on the bindings file is cut; the reason is cut.
- **Review B, changed-line:** the three rules of reading are a list; a string literal on several lines is read in parts; the runs come from git's Myers comparison whatever the machine's settings; the reviewer's second sentence of the reason.
- **Review B, draft-rule:** "It does so regardless of whether…" in the first paragraph, and the old third paragraph gone; the refusal names each symbol, test and other file, and reads a removed one's line in the parent.
- **Review C, s-t383grkn3q68dpf:** fix A (ruling 4); the reason says "not bound to the node"; both `stage3` fields now say that reindex.ts builds neither list today, and that both commands must also read the files of the project's own checks and generators.
- **Review C, proposal:s-ztseyetus7np6br-g3:** finding 4, word for word.
- **Review D, s-5hb9k2e34dgn284:** "one of the list's values"; an `enum` reached directly or through `$ref`; a list with an object member that lacks its property is not checked, which leaves the refusal to "An object in a list"; the lists of a project's own kinds "are checked only by the check of those lists"; the Russian reason says «в соответствии с теми».
- **Review D, own-kinds:** only the rules in the project's own guidelines; "a member for each" instead of "exactly one"; the refusal names the rule "by that rule's file, sid and location"; the third paragraph in two sentences; the reason says "but listed".
- **Review D, s-cdachayybfvg4na:** the example names the roles of a user; the reason says what `sheriff binding` compares.
- **The readers:**
  - "spacing" became "whitespace": one reader rendered it as typographic spacing;
  - "all those that the commit's parent holds for it": a reader read "the first entries" as possibly only some of them;
  - "bound by a SpecTag that names a draft rule" and "takes the rule's approval status from" (draft-rule);
  - "which lets the command accept" (extensions-delivered) and "which would make `sheriff binding` refuse" (s-t383grkn3q68dpf): a mistake accepts or refuses nothing;
  - "the value is the value of its property", in two nodes: the value is not the property itself;
  - "to which the list points", after "the file, the place or the symbol";
  - "the schema at that place holds", in the example of s-5hb9k2e34dgn284;
  - "the nodes of the kind `procedure`";
  - "keeps … in line with" for "holds … to", in two reasons;
  - "A single definition of those changes" for "One account of what that is": "account" could be read as a count;
  - "A commit changes a symbol" for "The commit changes a symbol": no commit was named before in that paragraph.

### Sentences in the author's own words

`english-group3-changed.md` lists them under their keys, for the readers and the confirming review. Besides the readers' fixes above, these differ from a review's words:

- the reason of "A line that changes the code" says "whitespace" where review B wrote "spacing", to match the readers' fix in s-2x58az67bm6cxq2;
- review B's sentence on a renamed test also cites the SpecTag (s-8xw4mgvpexyvw5q), at its first use in the node;
- in "The code and the tests of a draft rule", the refusal is a paragraph of its own, so that the first paragraph does not hold five sentences;
- the English reason of "A list and its declaration" says "keeps … in line with", where review D gave only the Russian «в соответствии с теми»;
- `proposal:s-9j2mmnuuwmx5ksn` is new, in the author's words (Q1).

### Findings rejected, with the reason

- **"delivers" → "includes"** (fast reader, five places): "is delivered with the SpecSheriff plugin" is the owner's wording in rule 1.7.1 and row 10.1.27c, and the reader's Russian has the meaning.
- **"compose" → "combine" or "build"** (fast reader): "compose the schema" is the term of the agreed "How the schema of the specification is composed" (s-xzcw3hv4hmxz7h7).
- **"without an act of an owner" → "without an action by an owner" or "without any owner acting"** (both readers): review A's exact words, and both readers' Russian, «без действия ответственного», has the meaning.
- **"the files that the repository keeps" → "the files tracked in the repository"** (fast reader): the coordinator's ruling 6.
- **"the node on the form of a SpecTag" → "…on the syntax…"** (fast reader): "The form of a SpecTag" is the agreed node's title.
- **"a file whose language a description covers"** (both readers ask "a description of what?"): the agreed phrase of s-9rtrj24myzjvshu and s-utf4mbt7ref8g9c, cited to s-33fw3ga4ctd94dq; both readers read it as meant.
- **"names a kind by its property" → "in the member's property"** (thorough reader): review D's exact words, and the reader's Russian, «своим свойством», has the meaning.
- **"this check" with no check named in its paragraph** (thorough reader, several nodes): the readers read it as meant, and ruling 5 fixes the sentence; in the draft-rule node, review B's restructuring removes it.
- **"then" in "`sheriff reindex` then leaves every file unchanged"**, **"Its lines hold the same tokens"**, **"each entry that follows them names an owner"** and **whose "most likely mistake"** (readers' two readings): each reader chose the meant reading, and "The most likely mistake" is the form of every agreed example.
- **"each remaining such node" → "every other such node"** and **"items on"** (readers, proposal:s-ztseyetus7np6br-g3): the first is an agreed sentence that the change does not touch; the second was in the header of `english-group3.md`, which no longer says it.
- **The TERM notes** (ADR's superseded record for an entry, git's hunk for a run, OpenFastTrace's `impl` and `utest` coverage for `meta.code` and `meta.tests`, OpenFastTrace's "needs" for `needsCode`): each reviewer recommends a gloss in the docs and no change to a node. They are in the list of changes outside the group.

## Decisions that apply to the whole group

- **Rows.** Each node of a check has an `implements` link to each row whose check it makes, and none to the main table of checks (X1, as in groups 1 and 2).
- **Splits.** Two nodes held requirements that a reader can carry out separately, so each was split within its section (the rule "A node is split within its section without asking"; rule 7.3.3):
  - "The symbols a commit changes" (s-2x58az67bm6cxq2) into what a commit changes, a line that changes the code, and the check of row 10.1.28a;
  - "A list and its declaration" (s-5hb9k2e34dgn284) into the check of a list against its JSON Schema or its symbol, and the check of the list of a project's own kinds of node.
- **One node for rows 10.1.27, 10.1.27a and 10.1.27b.** The owner ruled that the entries of the `strict` flag are checked "in the same way" as those of the approval status (2026-11-17), and the entries of the extensions "in the same way" as those of the flag (2026-11-18). So one node makes the three checks. A reader needs all three together, so rule 7.3.3 keeps them in one node.
- **Draft or approved.** Each node of a check says that its check runs whether the specification is approved or a draft. It cites the row whose cost is "refused" with no condition, and, for row 10.1.28a, rule 1.3.2 too.
- **Which nodes are checked.** "Each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule`", as in group 1.
- **Form.** Each node of a check opens with what its command accepts or refuses, and says what the refusal names.
- **Citations at first use (rule 7.2.7).** SpecTag (9.3), the system's code (9.1), symbol (1.5.2), test (s-zrsc6asgmhv8tnc), location (8.5), approval status (10.6), the `strict` flag (10.7), extension (1.7.1), chosen (1.7.5), owner (1.1.6), the bindings file (s-trwczfskj5zmuft), a file bound as a whole (s-5qdjyf6t898rsd4, s-trwczfskj5zmuft), `TextRule.list` (5.1), `TableRule` (8.6), the project's extension of the schema (5.2), a project's own kinds (8.3), what a description covers (s-33fw3ga4ctd94dq), `meta.code` and `meta.tests` (9.7), the settings that only an owner changes (s-chsfpkgpmfk4fft).
- **Words.** "refuses", "including X", "is placed" for a SpecTag, "the most likely mistake", "code other than tests". In Russian: «отвергает», «ответственный», «статус одобрения», «расширение guidelines», «у X есть SpecTag», never «несёт».

## The drafts

### Item 27: the entries that only an owner records

**s-j9r8z4xdrfkfs47 — "Entries that only an owner of the specification records"** (tools 7.2.3). Rows 10.1.27 (s-pa8t49pqpwscuq7), 10.1.27a (s-y5w6xwvwh857azx) and 10.1.27b (s-dxzq5rd6eeteza4).

- **The change from group 2's notes, item 1, is made.** The node no longer handles code and tests without a SpecTag: s-3xx2eukc8gtd2tx, agreed with group 2, does. The node keeps row 10.1.27 and takes rows 10.1.27a and 10.1.27b.
- **Its old title**, "From a draft to an approved specification, and back", no longer fits. The specification's approval status is now set by entries in `sheriff.config.json` (rule 10.6, the owner's ruling of 2026-11-13), not by a rule in `project.json`. The continuation file's note that this node still reads the rule in `project.json` is carried out.
- **The settings** are named as the agreed node `sheriff settings` (s-chsfpkgpmfk4fft) names them, and listed in the node, so that the reader needs no other node.
- **How "removes or changes" is checked.** After the commit, the first entries for a setting must be the parent's entries for it, unchanged and in the same order. Only the latest entry decides a setting (rules 10.6 and 10.7), so an entry inserted before the parent's entries, or a reordering, would change the setting just as a deletion would. The row says "No commit removes or changes such an entry", and the ruling of 2026-11-13 says why: "nobody can change the status by deleting or editing the latest entry". Requiring the old entries as the first, in order, is the only form of that check that also catches a reordering, so it settles the question without the owner.
- **Owners "as of the commit that adds it"**: taken from `project.json` as the commit leaves it, as the agreed "Who an added approval names" does for approvals.
- **The parent's entries** are read as `sheriff reindex` would rewrite them (s-gb8s9657a65hqmv). That agreed node replaces the rule that approved the specification by an entry, so the commit that first runs a new release does not count that entry as new. The citation of s-f5rz6b7dhxejjts is retargeted to s-gb8s9657a65hqmv, as the continuation file asks.
- **Command.** `sheriff binding` keeps the check: the rows are in the group "The specification and the code", and the node was already in the section of `sheriff binding`.
- **Stage 3:** binding.ts:138-162 and the approval rule in model.ts and approvals.ts:111-114 go. The tests at binding.test.ts:500 and :513 are rewritten first for the entries. Those at :464 and :596 go, since approving the specification while code carries no SpecTag is now settled by `sheriff settings` and rule 10.6. `config.ts` and `config.schema.json` must accept the entries; `config.schema.json` is still to be added to moved/specs/_schema/. The full list is in the draft's `stage3` field.

### Item 28: rows 10.1.27a, 10.1.27b and 10.1.27c

Rows 10.1.27a and 10.1.27b are implemented by s-j9r8z4xdrfkfs47 above.

**new:tools-7-1-extensions-delivered — "The chosen extensions and the installed plugin"** (s-mhsb6fjsq5xn6c9, tools 7.1.2a, before "Validation against the schema before a command works on the files"). Row 10.1.27c (s-j5qmmdq4m26mdvw).

- **Which command makes the check.** Every command that reads the chosen extensions. Without an extension's file, no command can work by its rules: `sheriff validate`, `sheriff binding` and `sheriff reindex` cannot compose the schema (s-xzcw3hv4hmxz7h7), and `sheriff json` and `sheriff guide` cannot give its nodes. The node names the first three, which run at a commit, so the commit is refused as the row requires. It follows the agreed "Validation against the schema before a command works on the files", which also names several commands that stop.
- **"Delivers"** means that the extension's file is at the path that "Where the files are" (s-zefk589ykh37b8u) gives for each extension. That covers the repository where the SpecSheriff guidelines are written, whose extensions are in `specs/_guidelines/extensions/`.
- **The refusal** names the extension, as the row says, and the version of the SpecSheriff tools, so that the person knows to update the plugin.
- **What the owner will see:** while a machine's plugin lacks a chosen extension, `sheriff settings` stops on that machine too, since withdrawing an extension needs its schema to find the nodes that depend on it (s-j8y62pa9hzz6nwx). The remedy is to update the plugin.
- **Stage 3:** no code reads the chosen extensions yet; the tests are written first.

### Item 29: what a commit changes, and row 10.1.28a

**The change from group 2's notes, item 2, is made.** Row 10.1.28a has a node of its own for code and tests alike. The node on what a commit changes now says when a commit adds or changes a test, a file bound as a whole, a SpecTag and an entry of the bindings file, and that a change to an entry changes that file's code (rule 9.4).

**s-2x58az67bm6cxq2 — "The code and the tests that a commit changes"** (tools 7.2.1). Implements rules 9.4 (s-9j2mmnuuwmx5ksn) and 1.5.2 (s-kgbzk2ph9e6jfb4). The inventory found that the node described rule 9.4 without implementing it.

- **Actor.** The SpecSheriff tools, since `sheriff binding`, `sheriff review` and `sheriff commit-message` all rely on the node.
- **Tests are covered.** Agreed nodes of group 2 cite this node for tests that a commit adds, changes or leaves unchanged.
- **A SpecTag counts by its text.** The old node counted every line holding a SpecTag as changed. By rule 9.4 and its ruling of 2026-11-10, a SpecTag must stay the same, so a change is a SpecTag added, removed or with another text. A comment reformatted around an unchanged SpecTag changes nothing; that settles the continuation file's note of 2026-11-11.
- **A rename throughout is no longer exempt.** The owner removed that exemption from rule 9.4 on 2026-11-11 ("a rename may change what the system shows outside"). The continuation file's owed note, which still lists "identifier renamed throughout" among what a test's change forgives, predates that removal; the agreed text of 9.4 decides.
- **Removed lines and removed symbols.** A removed line is read in the parent, so deleting lines inside a symbol changes the symbol. A symbol or a test of the parent is matched by name. The node also says what a commit removes, which "The code and the tests of a draft rule" and row 10.1.41 need.
- **A file bound as a whole changes with any change of its text, including a comment or spacing.** Rule 1.5.2 says "A change anywhere in a file bound as a whole is a change to the code its SpecTags bind" (the owner's ruling of 2026-11-17). In such a file the SpecSheriff tools cannot tell a comment from code, since no description covers its language, or since its format has no comments. So the exemption of a reworded comment in rule 9.4 applies where the tools can tell comments apart: in files bound by symbols. The `change` note shows this to the owner, and example 2 shows the case.
- **Entries of the bindings file.** An entry's SpecTags are the file's SpecTags, so a change to them changes the file's code (rule 9.4). A commit adds an entry where the parent has none for the same file, and changes one whose SpecTags differ.
- **"Adds or changes a SpecTag"** is defined for the agreed "SpecTags on the system's code other than tests", which refuses a misplaced SpecTag that the commit adds or changes. Every SpecTag on an added line counts, except one that binds the same thing with the same text as in the parent.
- **Stage 3:** see the draft's `stage3` field. In short: count a SpecTag by its text, read files bound as a whole and the bindings file, tell what a commit removes; the tests at binding.test.ts:89 and :108 carry s-2x58az67bm6cxq2.

**new:tools-7-2-changed-line — "A line that changes the code"** (s-u6mj5yv8ngnz79v, tools 7.2.1a). Implements rule 9.4.

- **Why a node of its own.** The owner ruled on 2026-11-11 that the appendix states exactly how the tools read a change: spacing within a line not counted, a Python line's indentation counted. That is a requirement that can be carried out on its own (rule 7.3.3).
- **Tokens, comments left out, a string literal as one token.** A change inside a string, including its spacing, changes the code. A Python docstring is a string literal, not a comment, so a change to it changes the code. A sid cited in a comment is part of the comment.
- **A test's name**, other than its SpecTag, is left out, since rule 9.4 says that renaming a test with the same SpecTag changes nothing. In Python, the name is the function's name, and the SpecTag is in the mark.
- **Runs.** The code now pairs all removed lines of a file with all its added lines, across the places where the file changes. The node pairs them within each run that git's comparison replaces, which cannot pair lines from two places.
- **Lines with no token**, such as a blank line or a comment line, are left out, so adding or removing a comment line changes nothing, as now.
- **Stage 3:** the rename forgiveness (diff.ts:176-188) goes, and binding.test.ts:42 is rewritten first. diff.ts:146 and :160 stop counting every `@spec` line. binding.ts:42-51 (testLines) goes: a test is read as code is. The tests at binding.test.ts:42, :49, :56, :69 and :79 carry s-u6mj5yv8ngnz79v.

**new:tools-7-2-draft-rule — "The code and the tests of a draft rule"** (s-w93jfnqynfa47pf, tools 7.2.2c). Row 10.1.28a (s-wpadgy2budcxa3v).

- **Removal is refused too.** The row says "no commit adds or changes code or a test" bound to a draft rule. Deleting that code changes what the system does just as changing it does. The principle "Nothing unapproved is implemented" and rule 1.3.2 ("no code or test is written or changed for it") then require the refusal. Row 10.1.41, by the owner's ruling of 2026-11-20, also counts code bound to a rule "before the commit or after it". So the question is settled without the owner.
- **SpecTags before and after the commit.** The SpecTags of the parent count, so that a commit cannot delete a draft rule's code, or move its SpecTag to another rule, unrefused.
- **The draft status is read after the commit.** A commit that removes the rule together with its code passes, and so does one that approves the rule together with its code.
- **A rule** is a node of one of the kinds that "The form of a SpecTag" lists. A SpecTag naming a node that is not a rule is refused by the agreed nodes of rows 10.1.26 and 10.1.26a.
- **Draft or approved:** the check runs in both, by rule 1.3.2, whose clause on a draft rule has no condition, and by the row's cost. The owner's ruling of 2026-11-20 on row 10.1.40 keeps the checks that new code is bound to its rules running in a draft.
- **Stage 3:** binding.ts:180 and :205 are to read the parent's SpecTags too, count what a commit removes, count files bound as a whole and the bindings file, and refuse only for a rule of the listed kinds. The draft parts of binding.test.ts:29 and :101, and the test at :36, carry s-w93jfnqynfa47pf.

### Item 30: a node's `meta.code` and `meta.tests`

**s-t383grkn3q68dpf — "A node's `meta.code` and `meta.tests`"** (tools 7.2.5). Row 10.1.34 (s-tqdmk6jakx97wra).

- **The change from group 2's notes, item 6, is made:** files bound by SpecTags at their start and by entries of the bindings file count.
- **`meta.code` names files only.** Row 10.1.34 refers to files, and its ruling of 2026-11-17 says that the row speaks of the code that a SpecTag binds, not of a symbol. The agreed "What `sheriff reindex` writes" writes files only. So the comparison of the symbols that an entry names goes, from the code and from the schema.
- **`meta.tests`** names each test by its file and its name, as the agreed "What `sheriff reindex` writes" says.
- **The continuation file's note of 2026-11-17** asked the node to say which formats allow no comments and where the SpecTags of such a file are kept. The agreed "The bindings file" and "What the SpecSheriff tools read in the project's own guidelines" now say both, so the node only cites the bindings file.
- **Which nodes.** Only the nodes in the files that the repository keeps. The nodes of the SpecSheriff guidelines and of a chosen extension, which a project takes from the plugin, list the code of the repository where the guidelines are written (rule 9.7), so they are not checked in a project.
- **Stage 3:** binding.ts:215-254 counts only SpecTags above symbols and compares symbols; reindex.ts must build `meta.code` the same way, as `proposal:s-ztseyetus7np6br-g3` says. The test at binding.test.ts:125 carries s-t383grkn3q68dpf; those at :132 and :138 go.

### Item 31: a list and its declaration

**Open problem P1 is settled by the owner's rulings.** On 2026-11-13 the owner replaced `TextRule.list.declaredIn` by two properties of the list, `jsonSchema` and `valueList` (row 10.1.35). On 2026-11-21 the owner agreed to "What `sheriff reindex` changes in what an earlier release wrote" (s-gb8s9657a65hqmv), which rewrites `declaredIn` into those two properties. So the nodes that still say `declaredIn` take the new properties by a technical replacement, which the decision itself names; they are listed under the changes outside the group.

**s-5hb9k2e34dgn284 — "A list and its declaration"** (tools 7.2.6). Row 10.1.35 (s-f5mm7tagez38ffz).

- **The three sentences of the row** become three conditions. The second is stated positively: each value of the `enum` is one of the list's values.
- **JSON Schema 2020-12**, which the SpecSheriff tools already use for the schema of the specification.
- **The value of an object member** is its property that `TextRule.list.property` names. A member that lacks it is left to "An object in a list", so that one fault is refused once.
- **A symbol declares the text of its string literals**, as the code reads it now. The agreed "How a runner is started" (s-avvnasjhsfkgajh) already points its list at the symbol `ALLOWED` in `review.ts`, which matches this reading. A list of numbers or booleans can be checked through `jsonSchema` only; no rule or list needs more today.
- **The form of the two properties** (`file` and `pointer`, `file` and `symbol`) is not restated in the node, since rule 5.1 makes the schema the only description of the structure. node.schema.json is to define them in stage 3, as the row's todo says.
- **Stage 3:** see the draft's `stage3` field. The tests at binding.test.ts:144 and :406 are rewritten first and carry s-5hb9k2e34dgn284.

**new:tools-7-2-own-kinds — "The list of a project's own kinds of node"** (s-czxaqvaesmu3gru, tools 7.2.6a). Row 10.1.35 and rule 8.4 (s-hhnahzmhahf8jht).

- **Why a node of its own.** Row 10.1.35 checks rule 8.4 too. Rule 8.4, by the owner's ruling of 2026-11-10, compares the name and the `needsCode` of each kind between the project's extension of the schema and the rule that lists the kinds. The field `kinds` of the extension is not a JSON Schema, so validation against a schema cannot compare `needsCode`. The continuation file records that the code compares the names only, and that no check requires the rule that lists the kinds.
- **How the lists are found.** By the `refines` link to rule 8.3, as the agreed "What the SpecSheriff tools read in the project's own guidelines" reads the project's own kinds: the members of every such rule, taken together.
- **A kind that no list holds is refused**, since rules 8.3 and 8.4 require a rule that lists it.
- **Stage 3:** no code compares `needsCode`; the tests are written first.

### Item 32: an object in a list

**s-cdachayybfvg4na — "An object in a list"** (tools 7.1.19). Row 10.1.36 (s-yuu4ccgch68yzxb).

- The link to the dropped rule s-v7vd4ydrwexsgsj goes; the node implements row 10.1.36 and cites rule 5.1 for `TextRule.list`.
- A list that names no property is refused when a member is an object, as validate.ts already does; the node now says so.
- **Stage 3:** validate.ts:298-307 is to judge only the nodes of the files that the repository keeps, including those in cells, and its comment is to cite s-cdachayybfvg4na.

## The proposal

### `proposal:s-ztseyetus7np6br-g3` — "What `sheriff reindex` writes"

The coordinator asked for it, so that the reviewers check it with the group and the owner sees it on the group's page.

- **`base`** is `proposal:s-ztseyetus7np6br`, the wording that the owner agreed in group 1 on 2026-11-24. That key is untouched.
- **`question`**: "None: carries out row 10.1.34 and rule 1.5.2", as the proposals of group 2 put it.
- **The change.** The agreed item said that `meta.code` "names each code file that holds a symbol bound by such a SpecTag". Row 10.1.34 (its ruling of 2026-11-17) speaks of the code that a SpecTag binds, not of a symbol. Rule 1.5.2 also binds code by SpecTags at the start of a file and by an entry in the bindings file, which the agreed group 2 nodes s-5qdjyf6t898rsd4 and s-trwczfskj5zmuft define. Both of these bind a file as a whole. So the item now names "each code file that holds code bound by a SpecTag naming the node, including a file bound as a whole". Without the change, `sheriff binding` would refuse, under s-t383grkn3q68dpf, what `sheriff reindex` writes.
- **The split.** With the addition, the item's one sentence would hold two thoughts, on `meta.code` and on `meta.tests` (rule 7.3.2). So it became two items. The item on `meta.tests` keeps its meaning.
- **Nothing else changed.** The script copies every other part, the title and the reason from the agreed key, and each of those parts' `change` says "Как в согласованной формулировке (группа 1)".
- **Stage 3:** reindex.ts is to build `meta.code` from the SpecTags at the start of a file and from the entries of the bindings file too, as s-t383grkn3q68dpf checks.

## Questions for the owner

None. The one question that group 3 had, Q1, is settled by the owner's ruling of 2026-11-24, which round e carries out (see that section). Q1 asked whether rewording a comment, or changing only whitespace, in a file bound as a whole changes its code. Its text, its options and the drafts written for its option A are in `tools-drafts.before-group3-e.json` and in the earlier versions of this file.

**Open, and not a question of group 3:** what a line of code outside every symbol and test changes (review B of round c, item 4). It is item 10 of group 2's list of changes outside the group, on rule 1.5.2.

**Settled without the owner** (round a, confirmed by the reviews):

- a commit may not delete code of a draft rule: the principle "Nothing unapproved is implemented", rule 1.3.2, and the ruling of 2026-11-20 on row 10.1.41; review B agrees;
- renaming an identifier throughout changes code: the owner removed that exemption from rule 9.4 on 2026-11-11;
- reordering the entries of a setting is refused: row 10.1.27 and its ruling of 2026-11-13; review A agrees;
- `TextRule.list.declaredIn` stays nowhere (P1): the rulings of 2026-11-13 and 2026-11-21, and now `proposal:s-hhnahzmhahf8jht` for rule 8.4;
- the list of a project's own kinds is compared by name and `needsCode`: the ruling of 2026-11-10 on rule 8.4;
- `sheriff guard` refuses to run while a chosen extension is missing: the ruling of 2026-11-18 on row 10.1.27c (the coordinator's ruling 1).

## Changes still to be made to nodes and files outside the group

1. **`TextRule.list.declaredIn`, a technical replacement that the decisions of 2026-11-13 name** (open problem P1); rule 8.4 is covered by `proposal:s-hhnahzmhahf8jht`:
   - the lists of rules 1.3.1 (s-tgrnpagrb58tya7) and 6.1 (s-sn6au3vcr9uy5pm) in moved/: `declaredIn` {file, declaration} becomes `jsonSchema` {file, pointer};
   - `node.schema.json` in moved/: `declaredIn` goes, and `jsonSchema` and `valueList` are defined; `symbols` goes from `meta.code` (s-t383grkn3q68dpf);
   - the row's todo also names s-xr5xxa9cxf2mq5u; its list is in the agreed "How a runner is started" (s-avvnasjhsfkgajh), which already uses `valueList`;
2. **moved/impl.json:**
   - row 10.1.27a (s-y5w6xwvwh857azx) → s-j9r8z4xdrfkfs47;
   - row 10.1.27b (s-dxzq5rd6eeteza4) → s-j9r8z4xdrfkfs47;
   - row 10.1.27c (s-j5qmmdq4m26mdvw) → s-mhsb6fjsq5xn6c9;
   - row 10.1.28a (s-wpadgy2budcxa3v) → s-w93jfnqynfa47pf only, dropping s-2x58az67bm6cxq2, s-9rtrj24myzjvshu and s-utf4mbt7ref8g9c (group 2's notes, item 18);
   - row 10.1.35 (s-f5mm7tagez38ffz) → s-5hb9k2e34dgn284 only;
   - the new row 10.1.35a (s-cgkkksc7efxhcst, `proposal:row-10-1-35a`) → s-czxaqvaesmu3gru.
3. **Row 10.1.35 (s-f5mm7tagez38ffz)** drops its `checks` link to rule 8.4 (s-hhnahzmhahf8jht), once the owner agrees to `proposal:row-10-1-35a`. The change is to a link only, so the row keeps its wording and its status. When the owner agrees to `proposal:s-hhnahzmhahf8jht`, rule 8.4 gets a `meta.decisions` entry in place of the ruling of 2026-11-10 on `declaredIn` (review D of round c).
4. **Row 10.1.27 (s-pa8t49pqpwscuq7):** its todo, on rewriting the tests of the former mechanism, is carried out in stage 3 as s-j9r8z4xdrfkfs47's `stage3` field says, and is then removed.
5. **`config.schema.json`** is to describe the entries for the approval status, the `strict` flag and the chosen extensions, each naming the person by an email address. The continuation file already records that the file is to be added to moved/specs/_schema/ before stage 3.
6. **Items 48 and 49** (the nodes on the approval procedure, the `strict` flag and choosing extensions):
   - rule 10.6, rule 10.7 and the agreed `sheriff settings` (s-chsfpkgpmfk4fft) say "the latest entry", but no node says that the latest entry is the last one in `sheriff.config.json`. s-j9r8z4xdrfkfs47 makes a new entry follow the old ones, so the last is the latest. Items 48 and 49 are to say so;
   - they are to define an entry that holds nothing that depends on when it is written, such as a time. Otherwise the parent's entry as `sheriff reindex` would rewrite it (s-gb8s9657a65hqmv) differs from the committed entry (review A).
7. **"The tests, run before a push" (s-b6qdtghnyha3fhk), item 40:** it cites s-j9r8z4xdrfkfs47 to find whether the specification is approved. The node no longer says that, so item 40 is to take the status from the entries that rule 10.6 describes (review A).
8. **"An edit judged before it is made" (s-st6td4mua9uqt9z), item 58:** it is to say that `sheriff guard` refuses every edit while the installed plugin lacks a chosen extension (s-mhsb6fjsq5xn6c9, the coordinator's ruling 1).
9. **Row 10.1.41's node (s-jgejd5rpd9d43pd), item 38,** can rely on s-2x58az67bm6cxq2 for what a commit removes, and on its reading of code bound "before the commit or after it".
10. **"whether the specification is approved or a draft", an English-only fix** (the coordinator's ruling 5), when the agreed drafts move into `specs/` in stage 3: it becomes "regardless of whether the specification is approved or a draft" in s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c, new:tools-7-2-rule-test (s-8wp7xm7g3u8gscq) and new:tools-8-bindings (s-trwczfskj5zmuft). No agreed draft of group 1 uses the phrase.
11. **The docs** (the reviewers' TERM notes; no node changes):
    - an entry of a setting is never edited, and a later entry supersedes it, as in ADR (review A);
    - a run of lines corresponds partly to git's hunk, which also holds unchanged context lines (review B);
    - `meta.code` and `meta.tests` correspond to OpenFastTrace's `impl` and `utest` coverage (review C);
    - `needsCode` corresponds partly to OpenFastTrace's "needs" (review D).
12. **`.ai_docs/INDEX.md`:** the brief forbade touching it. The main session is still to add rows for `propose-group3.mjs`, `fix-group3-b.mjs`, `fix-group3-c.mjs`, `fix-group3-d.mjs`, `group3-notes.md`, `english-group3.md`, `english-group3-changed.md`, `english-group3-changed-c.md`, `english-group3-changed-d.md`, `group3-assessments.json`, `build-group3-ru.mjs`, `group3-ru.json`, `gen-group3-page.mjs`, `group3-page/index.html`, `tools-drafts.before-group3.json`, `tools-drafts.before-group3-b.json`, `tools-drafts.before-group3-c.json` and `tools-drafts.before-group3-d.json`.

13. **Round e:**
    - `moved/impl.json`: the new row 10.1.43b (s-td4e3rdga6azav9, `proposal:row-10-1-43b`) → s-7vpsdsy8dpqdy6r;
    - `table-10-1.json` and the page of table 10.1: the new row 10.1.43b after row 10.1.43a, once the owner agrees to it;
    - rule 9.4 and rule 1.5.2 take the ruling of 2026-11-24 into their `meta.decisions`, and rule 1.6.1 and row 10.1.43b take the principle, from their `proposedDecision`, once the owner agrees to them;
    - `.ai_docs/INDEX.md` is still to list `fix-group3-e.mjs`, `english-group3-changed-e.md` and `tools-drafts.before-group3-e.json`.

14. **Round f:**
    - rule 1.6.1's split moves what other rules cite it for. These citations are to point to the new nodes, a purely technical replacement: in rule 1.2.6 (s-xqs2e24mx5253ye), "The checks (§s-m4h279nbaqkpa3t)" → §s-5j9s5dstbawdd69; in rules 1.3.2 (s-utvqbypzhmgndug), 1.3.3 (s-9g7jj8z4yf9kq93) and 10.6 (s-qzthyh7yqvfhsa2), the tests that must pass before a change reaches the shared branch → §s-x8uzc8z44pwtd3h. Rules 10.2 and 10.5 and the draft "Settings of the reviewer" keep §s-m4h279nbaqkpa3t, which still holds the reviewer's judgements;
    - row 10.1.43 (s-zn4vrdpnv9bch62) says "The code changed in a commit" with no exception for the files generated from the specification, which the judgement on code now leaves out (item 11 of group 2's list). It is to say so when it next changes;
    - items 11 and 12 of group 2's list of changes outside the group are carried out by `proposal:s-m4h279nbaqkpa3t` and the three nodes split from it;
    - `moved/impl.json`: the three new nodes of the base specification implement no row; no entry is needed;
    - `.ai_docs/INDEX.md` is still to list `fix-group3-f.mjs`, `english-group3-changed-f.md` and `tools-drafts.before-group3-f.json`;
    - the page of group 3 (`gen-group3-page.mjs`, `group3-ru.json`, `group3-assessments.json`) is to take the new keys and the new order before it is rebuilt.

15. **Round g, technical replacements for stage 3 and for the page's list of nodes changed only to carry out a decision:**
    - rule 1.2.6 (s-xqs2e24mx5253ye): "The checks (§s-m4h279nbaqkpa3t)" → §s-5j9s5dstbawdd69;
    - rule 1.3.2 (s-utvqbypzhmgndug): the tests that must pass before a change reaches the shared branch, §s-m4h279nbaqkpa3t → §s-x8uzc8z44pwtd3h;
    - rule 1.3.3 (s-9g7jj8z4yf9kq93): the same, §s-m4h279nbaqkpa3t → §s-x8uzc8z44pwtd3h;
    - rule 10.6 (s-qzthyh7yqvfhsa2): the same, §s-m4h279nbaqkpa3t → §s-x8uzc8z44pwtd3h;
    - row 10.1.44 (s-aufnqn6t7y2me7a): its `checks` link to s-m4h279nbaqkpa3t → s-x8uzc8z44pwtd3h (review B, A3).
    Only a sid changes in each; no wording changes beyond it, so none needs a proposal.
    - Item 17 of group 2's list is settled by `proposal:s-94k7b6r5kf65udf`. Item 14's line on row 10.1.43 is settled by `proposal:row-10-1-43`.
    - `.ai_docs/INDEX.md` is still to list `fix-group3-g.mjs`, `english-group3-changed-g.md` and `tools-drafts.before-group3-g.json`.
    - The page of group 3 is to drop `proposal:new-spec-1-6-runs` and take `proposal:row-10-1-43` and `proposal:s-94k7b6r5kf65udf`. `group3-ru.json` holds the Russian of a removed sentence of `s-2x58az67bm6cxq2` under the old title, which is to be corrected.

## What was not touched

Nothing under `specs/`; no node outside the group, in `specs/` or in the drafts; `.ai_docs/INDEX.md`, `tasks.md` and `t25-one-thought.md`.
