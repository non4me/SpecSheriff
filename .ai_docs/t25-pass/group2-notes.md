# T25, stage 2, group 2: notes on the drafts of items 20 to 26

The drafts of items 20 to 26 are in `tools-drafts.json`: six nodes of the appendix of the tools, rewritten, sixteen new nodes and two new sections.
Two proposals on nodes outside those items sit beside them:

- `proposal:s-nyh9yk22ba6g77q`, rule 10.4, which carries out rules 1.6.1 and 9.1 and the agreed reason of rule 10.4;
- `proposal:s-weuyx98r7c923ab`, the agreed "The list of code that carries no SpecTag", changed to carry out the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a.

Group 2 has no question for the owner.

Four rounds wrote the drafts:

- round a, `propose-group2.mjs`: the drafts;
- round b, `fix-group2-b.mjs`: the reviews `review-g2-a.md` to `review-g2-e.md` and the readers' reports `english-g2-*.md`;
- round c, `fix-group2-c.mjs`: the confirming reviews `review-g2b-a.md` to `review-g2b-d.md` and the reader's report `english-g2b-fast.md`;
- round d, `fix-group2-d.mjs`: the final reviews `review-g2c-a.md` and `review-g2c-b.md` and the reader's report `english-g2c-fast.md`.

Each round also carried out the coordinator's rulings of that round.

`gen-group2-page.mjs` builds the owner's page, `group2-page/index.html`. `group2-ru.json` holds the Russian of what the drafts hold only in English and the page shows in its Russian parts; `build-group2-ru.mjs` wrote it and reports each entry whose English has changed since.

## Round d: how the drafts were changed

`fix-group2-d.mjs` copied `tools-drafts.json` to `tools-drafts.before-group2-d.json` before its first run, and rebuilds the keys of the group from that copy on every run. The copy is byte for byte the file that round c wrote. Two runs gave identical `tools-drafts.json`, `english-group2.md` and `english-group2-changed-d.md`.

The script runs the checks of round c before it writes. It now also refuses a draft of the group that still mentions Q1 or Q2 outside its assessment, and no key outside the group may differ from the copy.

### The coordinator's rulings, as applied

- **Every fix that the final reviews mark as the author's** is applied in their own English and Russian: A1 to A3, B1, B2, C1, D1, E1, F1 and F2 of review A, and review B's cut in the codex node, its settings fix, its fix to the doubt on s-9rtrj24myzjvshu and its rule-test fix. One word differs from review A's F1: "including the tests" stands for its "tests included", since the agreed drafts avoid that construction.
- **Review A's F3 example** is added to `proposal:s-weuyx98r7c923ab`. An example proposed with a change to an agreed node is part of the proposal, and the owner agrees to it with the group.
- **Q1 is dropped.** Earlier rulings already give its answer B:
  - the item in the principle "Deterministic checks hold every participant to the contract" sets no condition;
  - rule 1.6.1 (ruling of 2026-11-19) and rule 10.2 (ruling of 2026-11-20) have the reviewer judge the statement;
  - rule 10.5 (ruling of 2026-11-20) refuses a commit without a readable answer;
  - row 10.1.43a (ruling of 2026-11-20) passes while the specification is a draft.

  Under `vt`'s rule, a question that a stated ruling already decides is not asked. The `dependsOn` entries are gone. The `change` notes of "The review of a commit", the judgement on a statement and "The reviewer's verdict" cite those rulings, and so do their `stage3` fields.

### The reader's findings

These were applied without changing the meaning:

- "decide the commit" became "decide the outcome of the commit" (verdict);
- "refuses a commit on such a finding" became "refuses a commit because of such a finding" (review-statement, review-appendix);
- "has none of the forms" became "matches none of the forms", "may stand" became "may be placed", and "a text that opens with" became "text that begins with" (s-9rtrj24myzjvshu);
- "wherever that SpecTag stands" became "wherever that SpecTag is placed" (the reason of no-node), the one other place where the group's English says that a SpecTag "stands";
- "its own home" became "its own home directory" (the reason of codex);
- "one of its judgements" became "one of the reviewer's judgements" (the reason of "The review of a commit");
- "That is each of the following, in full" became "That code consists of the following, each in full", and "anywhere other than in" became "outside" (review-code);
- "is a section whose location" became "means a section whose location" (review-appendix).

These were rejected:

- "the changed code other than tests" → "changed code": the article refers to the code that the commit changes, which the node has named.
- "the commit's message" → "the commit message": the agreed term of rule 10.4 and of every node of the group.
- "leaves out something required by a rule" → "omits something that a rule requires": "leaves out" is the verb of the approved wording and of review A's fix, and the reader's likeliest reading is the meaning.
- "whatever the specification's approval status" → "regardless of …": idiomatic English, and the reader's reading is the meaning.
- "declares that rule's SpecTag" → "carries": "declares" is the term of s-zrsc6asgmhv8tnc, which the sentence cites.
- "the code means the symbols" → "“code” means": the specification does not put a defined word in quotes, and "In this check" already limits the definition.
- "also" (verdict), "They" and "that model" (settings): in each node, the word refers to something named in the sentence before it.

No fix was left out because it would change the meaning.

## Decisions that apply to the whole group

- **Rows.** Each node of a check implements the rows whose checks it runs (X1). "Code and tests outside the commit that no SpecTag binds" also implements rows 10.1.26 and 10.1.26a, since it runs their checks for unchanged code.
- **Splits.** Three nodes held requirements that a reader can carry out separately, so each was split within its section (the rule "A node is split within its section without asking"; rule 7.3.3):
  - "The review of a commit" into the review itself and one node for each of the reviewer's judgements (rows 10.1.43, 10.1.43a, 10.1.25a);
  - "Who runs the reviewer" into which runner runs, the verdict, how a runner is started, the time limit, each runner and the runners' settings;
  - "The SpecTag, and how a symbol carries it" into the form of a SpecTag, how a symbol carries it, SpecTags at the start of a file and the bindings file.
- **Sections.** The last two splits each get a new section, as "The commands" did when it was split (`new:tools-2-section`, agreed 2026-11-22). "How a test declares the rule it is written from" moves into the section on SpecTags.
- **One check, one node.** "A SpecTag that names no node" (row 10.1.28) is the only node that refuses a SpecTag whose sid names no node, for code, tests and the bindings file alike. The nodes for rows 10.1.26 and 10.1.26a refuse only a SpecTag whose node exists and is not a rule.
- **What a rule is.** The form of a SpecTag defines it once: a node of kind `TextRule`, `TableRule`, `RecordType`, or a project's own kind whose nodes need code (decision D3 of 2026-11-10), including a node in a cell. A term is no longer one.
- **Draft or approved.** The checks of rows 10.1.26, 10.1.26a, 10.1.28 and 10.1.31 run in a draft too, by the owner's ruling of 2026-11-20. The check of row 10.1.26b runs at every commit, by the ruling of 2026-11-17 on that row. Each of those nodes says so. While the specification is a draft, the reviewer judges an `Implementation-Needs-No-Change` statement too, but `sheriff review` disregards its findings, by the rulings listed under "Q1 is dropped".
- **The cost of those rulings, in one line:** while the specification is a draft, a commit with an `Implementation-Needs-No-Change` trailer pays for a run of the reviewer whose finding on that trailer is disregarded, and it is refused when the reviewer gives no readable answer.
- **Code and tests outside the commit.** Code or a test that the commit leaves unchanged gets the result of rule 9.5, by the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a. That holds both where it carries no SpecTag and where its SpecTags bind nothing.
- **Words.** "Code other than tests", never "outside its tests" (`.claude/vt/rules.md`). In Russian: «у X есть SpecTag», never «несёт»; «ревью» for the review and «рецензент» for the reviewer; «замечание» for a finding; «данные входа» for credentials; «отвергает» for what `sheriff binding` refuses. «runner» and «trailer» stay in English.
- **Citations at first use (rule 7.2.7).** SpecTag (9.3), the system's code (9.1), technical appendix (1.1.5), base specification (1.1.4), independent reviewer (1.6.1), symbol (1.5.2), the bindings file (1.5.2), a file bound as a whole (s-5qdjyf6t898rsd4, s-trwczfskj5zmuft), location (8.5), approval status (10.6), the `strict` flag (10.7), `implements` (6.1), the model of the specification (s-w6gybeqn2ttydqx), technical code (1.2.7), the settings of each runner (s-tnz9zgqx8c629a7), where a test declares its SpecTag (s-zrsc6asgmhv8tnc).

## The drafts

### Item 20: the review of a commit

**s-vp24dqydygztqbt — "The review of a commit"** (tools 7.3.4). Implements rules 10.4 and 10.2.

- `sheriff review` refuses a commit that the verdict refuses. Where the commit leaves the specification a draft, it disregards each finding on a statement that a rule's implementation needs no change, and then refuses the commit only where the verdict lists at least one other finding (review A's A1).
- It asks for a verdict only on a commit for which the reviewer must make one of the judgements. The judgement on a node of the technical appendix is due only for a node that implements a rule of the base specification (review A's A2), so approving any other node of the appendix starts no paid review.
- The generated files left out of the change are the files that `sheriff types` writes. `sheriff review` tells the reviewer which of them the commit changes.

**new:tools-7-3-review-code — "The judgement on the code that a commit changes"** (s-rd9nftptjuz6bwv, tools 7.3.4a). Row 10.1.43. Depends on the proposal for rule 10.4.

- `sheriff review` refuses a commit where the reviewer refuses it for a defect in the code that the commit adds or changes.
- The reviewer judges each changed symbol, each changed file bound as a whole and each changed test, whole, excluding the files generated from the specification. "Bound as a whole" now cites the two nodes that define it (review A's B1).
- Its Russian title is «Суждение о коде, изменённом коммитом» (review A's B2).

**new:tools-7-3-review-statement — "The judgement on a statement that a rule's implementation needs no change"** (s-kgqxg4gunzynwsv, tools 7.3.4b). Row 10.1.43a.

- The reviewer judges each such statement whatever the approval status, as rules 1.6.1 and 10.2 require.
- `sheriff review` refuses a commit because of such a finding only where the commit leaves the specification approved. Otherwise it disregards the finding silently (review A's C1), by the rulings listed under "Q1 is dropped".

**new:tools-7-3-review-appendix — "The judgement on a node of the technical appendix that a commit approves"** (s-4bwa4zepd4nwcv8, tools 7.3.4c). Row 10.1.25a.

- Refused whatever the approval status, by the owner's ruling of 2026-11-20 on the row.
- A top-level section is defined by its location. For a rule in no section, the rules in the same top-level section are the other rules of the same part that are in no section either, which follows the ruling of 2026-11-20 on rule 10.4.
- Its Russian title is «Суждение об узле технического приложения, который одобряется в коммите» (review A's D1).

**new:tools-9-no-change-trailer — "How a commit message states that a rule's implementation needs no change"** (s-7gab4ptjt2khfr5, tools 9). Rows 10.1.40 and 10.1.43a. The trailer is `Implementation-Needs-No-Change: <sid>`, read as `git interpret-trailers --parse` reads it, with its key compared exactly.

### Item 21: who runs the reviewer

**new:tools-10-section — section "Who runs the reviewer"** (s-v36s7dm8s3yewtr, tools 10). Ready.

**s-xr5xxa9cxf2mq5u — "Which runner runs the reviewer"** (tools 10.1). Ready after round c.

**new:tools-10-verdict — "The reviewer's verdict"** (s-68ds99w8wd67aae, tools 10.2). Rule 10.5.

- `sheriff review` gives the runner's CLI the schema of the verdict, and the runner's CLI answers with a JSON object that conforms to it (review A's E1).
- Each finding names the judgement that it belongs to, so that "The review of a commit" can disregard, in a draft, the findings on a statement that a rule's implementation needs no change.

**new:tools-10-start — "How a runner is started"** (s-avvnasjhsfkgajh, tools 10.3). Ready: the runner takes only the credentials from what its CLI keeps for the user.

**new:tools-10-limit — "The time limit of a run"** and **new:tools-10-claude — "The runner `claude`"** (tools 10.4 and 10.5). Ready.

**new:tools-10-codex — "The runner `codex`"** (s-u2n5hwwqkb6zk4z, tools 10.6). The sentence on an empty `codexModel` is cut, since the settings node states the rule for every setting with the same example (review B).

**new:tools-10-settings — "The settings of each runner"** (s-tnz9zgqx8c629a7, tools 10.7). Where a setting is empty, the runner leaves the choice of the setting's value to its CLI (review B). Stage 3 stops passing empty flags.

### Items 22, 24 and 26: the SpecTag, the test's SpecTag and the bindings file

**new:tools-8-section**, **s-5z5gnu7pahr82xp — "The form of a SpecTag"**, **new:tools-8-symbol**, **new:tools-8-file-start**, **new:tools-8-bindings** and **s-zrsc6asgmhv8tnc** (tools 8 to 8.5). Ready. The stage-3 note of s-5z5gnu7pahr82xp now says that each SpecTag on code carrying `@spec none` beside another SpecTag is refused, as s-9rtrj24myzjvshu does.

### Item 23: SpecTags on the system's code

**s-9rtrj24myzjvshu — "SpecTags on the system's code other than tests"** (tools 7.2.2). Row 10.1.26.

- It refuses what the commit adds or changes in the system's code other than tests, or in the bindings file.
- Its last item refuses each SpecTag on code that carries `@spec none` together with another SpecTag (review B). So such a SpecTag binds nothing, and unchanged code that carries both gets the result of rule 9.5, by the owner's ruling of 2026-11-17 on row 10.1.26.

**new:tools-7-2-no-node — "A SpecTag that names no node"** (s-36x8amvunmv2kp5, tools 7.2.2a). Row 10.1.28. Ready; round d changed one word of its reason after the reader.

**new:tools-7-2-outside — "Code and tests outside the commit that no SpecTag binds"** (s-3xx2eukc8gtd2tx, tools 7.2.2b). Rule 9.5 and rows 10.1.26 and 10.1.26a. Ready.

### Item 25: the SpecTags the tests carry

**s-utf4mbt7ref8g9c — "The SpecTags the tests carry"** (tools 7.2.4). Row 10.1.26a. Ready.

**new:tools-7-2-rule-test — "A test for each rule whose code a commit changes"** (s-8wp7xm7g3u8gscq, tools 7.2.4a). Row 10.1.31. The tests that count are a list: `sheriff binding` takes into account each test as the commit leaves it, including a test that the commit leaves unchanged and a test marked as skipped or as expected to fail (review B).

## The proposals

### `proposal:s-nyh9yk22ba6g77q` — rule 10.4, "What the reviewer is given"

- **The change:** the fourth item gives the wording of each rule that a SpecTag binds to code *or a test* that the commit adds or changes. The agreed wording says "not counting the tests". The change carries out rules 1.6.1 and 9.1 and the agreed reason of rule 10.4.
- Citations at first use and three English corrections, no meaning changed.
- The fifth item stays as agreed, since the reviewer judges a statement that a rule's implementation needs no change whatever the approval status.

### `proposal:s-weuyx98r7c923ab` — "The list of code that no SpecTag binds"

- **The change:** `sheriff untagged` lists the system's code, including the tests, that no SpecTag binds. The agreed node says "that carries no SpecTag". By the rulings of 2026-11-17, the warning of rule 9.5, which names this command, now covers code whose SpecTags bind nothing too.
- The citation is of s-3xx2eukc8gtd2tx, whose test of binding fits tests, where a test's SpecTag is in its name or mark (review A's F1).
- **The example** is review A's F3: an old function whose only SpecTag names a section is listed.
- The second sentence and the reason are the agreed ones.

## The question only the owner can answer

None. Q1, on what the reviewer does in a draft with a statement that a rule's implementation needs no change, is decided by the rulings listed under "Q1 is dropped". The page states the cost of those rulings in one line.

## What a confirming review must check

`english-group2-changed-d.md` lists each sentence that round d wrote in the author's own words, under its node's key:

- s-vp24dqydygztqbt: "`sheriff review` asks for a verdict only on a commit for which the reviewer must make at least one of the following judgements" (it completes review A's fragment), and "…so `sheriff review` runs the reviewer only on a commit that needs one of the reviewer's judgements.";
- review-code: "That code consists of the following, each in full, as the commit leaves it, with its file, its lines and the SpecTags that bind it:", and the refusal item that now says "outside an `Implementation-Needs-No-Change` trailer";
- review-statement: "`sheriff review` refuses a commit because of such a finding only where the commit leaves the specification approved.";
- review-appendix: "`sheriff review` refuses a commit because of such a finding whatever the specification's approval status.", and the definition that now says "means a section whose location";
- verdict: "…would let `sheriff review` decide the outcome of the commit in place of the independent reviewer.";
- codex: "Codex offers no way to run without its own home directory and tools, so the runner restricts both.";
- s-9rtrj24myzjvshu: "where a SpecTag may be placed, text that begins with `@spec` but matches none of the forms of a SpecTag, such as `@spec none` with no text after it;";
- no-node: "Once a node is removed, every SpecTag that names it binds its code or test to nothing, wherever that SpecTag is placed.";
- `proposal:s-weuyx98r7c923ab`: "`sheriff untagged` lists, by file and symbol, the system's code, including the tests, that no SpecTag binds." (review A's F1 with "including the tests").

## Changes still to be made to nodes and files outside the group

1. **"From a draft to an approved specification, and back" (s-j9r8z4xdrfkfs47), item 27:** its handling of code and tests without a SpecTag moves to s-3xx2eukc8gtd2tx; it keeps row 10.1.27 only.
2. **"The symbols a commit changes" (s-2x58az67bm6cxq2), item 29:** it takes row 10.1.28a for code and tests alike. It is also to say when a commit adds or changes a test, a file bound as a whole, a SpecTag and an entry of the bindings file, and that a change to an entry of the bindings file changes that file's code (rule 9.4).
3. **"A citation outside the specification" (s-m8nmfsxkcfu7cjp), item 35:** it is to leave to s-36x8amvunmv2kp5 only the SpecTags in the system's code, its tests and the bindings file. It keeps the SpecTags in the repository's own tools, which rule 10.10 allows.
4. **"A node whose tests or code lag behind it" (s-txbwsthdqhvyzd2), item 37:** it reads the trailer of s-7gab4ptjt2khfr5, so it needs the commit message and runs at the commit-msg hook.
5. **"A commit message names the nodes its code implements" (s-qqs2svksmjct753), item 39:** the SpecTags of files bound as a whole and of bindings entries count among the changed code's SpecTags.
6. **"A node's `meta.code` and `meta.tests`" (s-t383grkn3q68dpf), item 30:** files bound as a whole and bindings entries count.
7. **The plugins (s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4) and "The hooks" (s-477gtdrkw34dzxw):**
   - in both plugin nodes, "marks the runner asked" cites s-xr5xxa9cxf2mq5u; it is to cite s-477gtdrkw34dzxw, which records that mark;
   - all three are to cite s-tnz9zgqx8c629a7 for the settings of each runner when they next change. The continuation file is to record this.
8. **The agreed "Project-wide settings" (`new:tools-1-settings`):** it cites s-utf4mbt7ref8g9c for the glob patterns of the code and tests of a project's own check or generator, which that node no longer reads. To be settled with "How a project's own check is run" (item 33).
9. **"Where the types and RuntimeChecks generated from the RecordTypes are written" (s-pvzms7d8kxb8dk2), item 53:** a RuntimeCheck written as a JSON file is bound by an entry in the bindings file, which `sheriff types` would then write.
10. **Rule 1.5.2 (s-kgbzk2ph9e6jfb4), agreed:** a statement at the top level that is neither a symbol nor an import is bound by no SpecTag, while the rule binds all of the system's code. To be fixed when the node next changes.
11. **Rules 1.6.1 and 10.2 (s-m4h279nbaqkpa3t, s-epaw9sgyaajzn8g):** a commit whose only change to code is in the files that `sheriff types` writes gets a review that can only pass. Recorded for when those nodes next change.
12. **Rule 1.6.1 (s-m4h279nbaqkpa3t):** its reason follows the paragraphs of its text in order, so it fails the pairing test, and its text lacks citations at first use. It is to be brought into line, and split under rule 7.3.3, when it next changes.
13. **`CLAUDE.md`, line 119:** it says that a symbol carries `@spec <sid>` "(or `@spec none <reason>`)". Under s-5z5gnu7pahr82xp, `@spec none` is followed by a statement of what the technology that the system is built with requires of the code (review C's addendum of round c).
14. **The agreed "The commands that `sheriff` accepts" (s-f5rz6b7dhxejjts):** it says "the symbols of the system's code that have no SpecTag". It changes once the owner accepts `proposal:s-weuyx98r7c923ab` (review A's F2).
15. **Rule 9.5 (s-kkbqcb9xrpaepwn):** it still says "carries no SpecTag", although under the rulings of 2026-11-17 its result also applies to code whose SpecTags bind nothing (review A's F2).
16. **Row 10.1.26 (s-k6dzuajejrw4cej):** its cost says "for a symbol that the commit leaves unchanged", while the row speaks of code. "For code that the commit leaves unchanged" is a technical replacement for when the row next changes.
17. **Rule 10.5 (s-94k7b6r5kf65udf):** the owed fix of its last example stands.
18. **moved/impl.json:**
    - row 10.1.25a → s-4bwa4zepd4nwcv8;
    - row 10.1.26 → s-9rtrj24myzjvshu and s-3xx2eukc8gtd2tx;
    - row 10.1.26a → s-utf4mbt7ref8g9c and s-3xx2eukc8gtd2tx (s-zrsc6asgmhv8tnc prescribes the place but runs no check);
    - row 10.1.26b → s-trwczfskj5zmuft;
    - row 10.1.28 → s-36x8amvunmv2kp5;
    - row 10.1.28a → drop s-9rtrj24myzjvshu and s-utf4mbt7ref8g9c (item 29);
    - row 10.1.31 → s-8wp7xm7g3u8gscq, with s-2x58az67bm6cxq2;
    - row 10.1.40 → add s-7gab4ptjt2khfr5;
    - row 10.1.43 → s-rd9nftptjuz6bwv;
    - row 10.1.43a → s-kgqxg4gunzynwsv and s-7gab4ptjt2khfr5.
19. **The move in stage 3:** the decisions and todos of the split nodes go to the nodes they concern, as each draft's `stage3` field says.
20. **The migration of a project to the new release:**
    - `sheriff reindex` puts `@spec ` before each bare sid in the tests. Under rule 9.4 that now changes each such test, so the commit that follows changes those tests, with the consequences of rows 10.1.40 and 10.1.28a while the specification is approved.
    - Old code and tests whose SpecTag names a term or a section get what rule 9.5 gives code without a SpecTag, by the rulings of 2026-11-17. The saloon at 653a47e has 2 such tests.
    - The release notes and the migration of the saloon are to say so.
21. **The tests of the plugin for pytest** (`skills/pytest-specsheriff/tests/test_plugin.py`) are to carry s-zrsc6asgmhv8tnc in stage 3.
22. **`.ai_docs/INDEX.md`:** the brief forbade touching it. The main session is still to add the rows for `propose-group2.mjs`, `fix-group2-b.mjs`, `fix-group2-c.mjs`, `fix-group2-d.mjs`, `gen-group2-page.mjs`, `build-group2-ru.mjs`, `group2-ru.json`, `group2-page/`, `group2-notes.md`, `group2-assessments.json`, `english-group2.md`, `english-group2-changed.md`, `english-group2-changed-c.md`, `english-group2-changed-d.md` and the backups `tools-drafts.before-group2*.json`.

## What was not touched

Nothing under `specs/`; no node outside the group, in `specs/` or in the drafts; `.ai_docs/INDEX.md`, `tasks.md`, `t25-one-thought.md` and anything under `thread-trial/`.
