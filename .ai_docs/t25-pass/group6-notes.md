# T25, stage 2, group 6: notes on the drafts of items 48 to 50

`propose-group6.mjs` writes the drafts of the group into `tools-drafts.json`. It first copies the file to `tools-drafts.before-group6.json`, and on every later run it rebuilds the keys of the group from that copy. It checks each draft before it writes:
- each citation has a link, and each `cites` link has a citation or a decision that cites its target;
- the Russian cites the same sids as the English, and the code in backticks is the same in both;
- each link points to a node of the new form, of `tools.json` or of the drafts;
- the new sids have the form of a sid and are held by nothing in `specs/`, `moved/` or the drafts;
- no agreed draft is changed, and no key outside the group differs from the copy.

The script was run twice, and both runs gave the same `tools-drafts.json`. Only the twelve keys of the group differ from `tools-drafts.before-group6.json`: the ten drafts and the two proposals. The agreed drafts on which the proposals are built are unchanged. The script also writes `english-group6.md`, the English of every node of the group, for EngStickler's readers.

The brief is `briefs/t25-group6-brief.md`. Nothing under `specs/` was changed, and no node outside the group was touched.

## Agreed

On 2026-11-25 the owner agreed to group 6 by answering «ок» to «Согласны с группой 6?». The group had no question for the owner. `agree-group6.mjs` marked the twelve keys of the group as agreed: the ten drafts of items 48 to 50 and the two proposals to change agreed nodes. The page that the owner agreed to is https://claude.ai/artifact/NgiWg8MMpfF26QnAWiAntZ.

## Round f: four last swaps

`fix-group6-f.mjs` applies the four English swaps that `fix-brief-group6-f.md` lists from `english-g6e-fast.md` and `english-g6e-thorough.md`, idempotent from `tools-drafts.before-group6-f.json`; two runs gave the same file, the checks of round e pass, and only `new:tools-2-entries`, `s-7unxytshhc4md54` and `proposal:s-gb8s9657a65hqmv-g6` differ from the copy, with their Russian unchanged. The readers' other findings on round e are rejected, since each one reads the sentence as meant once the node's earlier sentences are in view, or asks for a term that earlier rounds kept for a reason that still holds. `english-group6f.md` holds only the sentences that changed, the page was rebuilt with `build-group6-ru.mjs` and `gen-group6-page.mjs` and is not published, and the main session is also to add rows to `INDEX.md` for `fix-group6-f.mjs`, `english-group6f.md` and `tools-drafts.before-group6-f.json`.

## Round e: the readers' last findings

`fix-group6-e.mjs` applies the fixes that `fix-brief-group6-e.md` lists from `english-g6d-fast.md` and `english-g6d-thorough.md`. It copies `tools-drafts.json` to `tools-drafts.before-group6-e.json` on its first run and rebuilds from that copy on every run. Two runs gave the same file, and the checks of round d pass. Eight keys differ from the copy: `s-v4qus7raqnwzneb`, `new:tools-11-withdraw`, `new:tools-2-entries`, `new:tools-2-approve-spec`, `new:tools-2-strict`, `new:tools-2-extension-off`, `s-7unxytshhc4md54` and `proposal:s-gb8s9657a65hqmv-g6`. Each fix changes only the English, except in the two nodes where the brief gives a Russian wording: the `strict` flag and approving the specification. `english-group6e.md` holds only the sentences that changed. `build-group6-ru.mjs` and `gen-group6-page.mjs` were run again: no Russian entry went out of date, and `group6-page/index.html` shows the new wordings. The page is not published. The main session is also to add rows to `INDEX.md` for `fix-group6-e.mjs`, `english-group6e.md` and `tools-drafts.before-group6-e.json`.

## Round d: the final review applied, and the owner's page

`fix-group6-d.mjs` applies `review-g6c-a.md` to `review-g6c-d.md`, `english-g6c-fast.md` and `english-g6c-thorough.md`, as `fix-brief-group6-d.md` says. It copies `tools-drafts.json` to `tools-drafts.before-group6-d.json` on its first run and rebuilds from that copy on every run. Two runs gave the same file. Eleven keys differ from the copy, every key of the group except the section, and the checks of round c pass. `english-group6d.md` holds only the English sentences that this round changed, each under its key.

### The points that the brief settles

- **Review c-a, R1 (a node's last approval).** Applied as the reviewer words it. The part's `change` says that it follows from rule 1.3.3, under which the node is approved in the restored wording, and from rule 10.15, which the second sentence still carries out. It also says why: otherwise s-txbwsthdqhvyzd2 would refuse every later commit, and no command could clear that refusal.
- **Review c-d, fix 2, and review c-b, A1.** The last paragraph of "Approving the specification" takes review c-d's form. It refers to the node on turning the flag on for the cases, and keeps the sentence that the run ends with the refusal. The brief's sentence "The run … ends with that refusal, which is the same as …" is split in two, one thought each.
- **Review c-c, T-1, R-1 and N1 to N4.** Applied, and each `change` they touch is corrected. N2 reads "and says how to set `core.hooksPath` where it cannot set it", which names the setting instead of repeating "it". N4 gives the draft rule its own archive reason. The proposal's `change` and `stage3` say so.
- **Review c-b, E1 and X-n1; review c-d, fixes 1 and 3; review c-a, R2, F1, A1 and W1.** Applied as worded. Fix 1 adds "naming sheriff validate" to `stage3`.
- **Review c-d, the stage-3 nit** on the proposal on a project's own check: its `stage3` now says that the agreed draft's `stage3` is to name s-m59dqwkw2e96wne and s-nxgkp988mej79eg when the stage-3 notes are merged.

### The readers' findings that were applied

- Every replacement that the brief lists. "For each approval in force of a wording" reads "For each approval of a wording … of such a node, where that approval is in force and whether or not …", since "a wording that is in force" would attach "in force" to the wording. "The rules that this commit includes" reads "the rules that the assumed commit includes".
- **"How an approval is recorded" and the fingerprint:** "with no whitespace" became "with no whitespace outside string values", since the text of a node holds spaces. "Of one string" became "of a single string". "And no other change does" became "and no other change to the node does", since a withdrawal also leaves a node without an approval.
- **Withdrawing:** "comes in the file" became "appears in the file".
- **The entries:** "the owner who made the change" names the change that the entry records. "Where it holds no entry" names `sheriff.config.json`, since "it" followed a sentence about the specification. "For a changed one" became "for an entry that was changed".
- **Approving the specification:** "as unchanged by that commit" became "by that one commit", which names the assumed commit again.
- **The `strict` flag:** "would list any code" became "would list anything", since `sheriff untagged` lists tests too.
- **Withdrawing an extension:** "the extension's schema" became "that extension's schema" where the project's extension of the schema is named in the same sentence.
- **Tools 3:** "The rule's `TextRule.list`" became "The draft rule's", since the paragraph before names two rules. "The project's own tools in it" became "in that folder".
- **The proposal on `sheriff reindex`:** "with that key renamed" names the key: "with `owner` renamed to `by`".
- **The examples of the two proposals** now carry `change` notes: the first example of the proposal on a project's own check is as agreed, and the other two are new.

### The readers' findings that were not applied, and why

- **"makes a check" → "performs" or "runs"** (fast, in several nodes): the brief keeps "makes this check", and the agreed nodes write "makes" for a check.
- **"refuses each of the following" → "any of the following"** (fast): seven drafts of the appendix outside this group write "refuses each of the following" (one thing, one spelling).
- **"the values gathered beside a field"** (both): the words of rule 12.9, as the brief says.
- **"under the key of that cell's column"** (fast): the schema of a `TableRule` keeps each cell under its column's key.
- **"by an act of their own"** (fast): the words of rule 10.7's agreed reason.
- **"holds what it would write" → "matches"** (fast, tools 3): the node defines "holds what an earlier release wrote" in a paragraph of its own, and the approved text uses those words.
- **"takes out of a repository" → "removes from"** (fast): the words of the node's approved title.
- **"none of them runs until it is moved"** (both): both readers read it as intended.
- **"A release that writes or reads them in a different form" → "A later release …"** (fast, unsure): the sentence before names the form that "different" is compared with, and "later" would leave out a release that is older.
- **"an object that holds only the following keys"** (thorough): the item on `withdrawn` says which lines hold that key.
- **"That string" and "The object" in later paragraphs** (thorough): each names its thing again, as the rule "Writing" asks of a paragraph that refers back.
- **"each cell in the node's row that holds text"** (both): the order that round c chose at the thorough reader's request; both readers read it as intended.
- **"first runs"** (thorough): the next sentences say that the run ends with the refusal, so "first" means before any other check.
- **"may make stricter"** (both): "may" gives a permission, as in rule 10.7.
- **"since it has no sid"** after a paragraph that names nodes by their sids (thorough): the paragraph states the exception right after the list that brings in the nodes of the archive.
- **"the first line for each such wording"** (thorough): the first line for a wording is always an approval, so both readings name the same line.
- **"refuses the change"**, **"a file in the directory"** (thorough, the proposal on a project's own check): agreed sentences that both readers read as intended.
- **"without any owner approving it"**, **"may change"**, **"as a project declares them"**, **"each hook there"**, **"those entries"**, **"the check for a node from which nothing is generated"**, **"records a withdrawal by whoever runs it"**, **"the check on the entries"**, **"where it is missing"**, **"every link that points to it"**, **"leaves unchanged a RecordType …"**, **"The flag is then turned on"**: each reader resolved the reference as intended, or both readings mean the same.
- **"which the owner has agreed to"** (both): the preamble of `english-group6c.md`, not a node.

### The page

`build-group6-ru.mjs` writes `group6-ru.json`, the Russian of the stage-3 notes, the removed passages, the notes in the locations and the two approved nodes of tools.json that the page shows. `group6-assessments.json` holds the «Оценка» of each key, five lines each, as they hold after round d. `gen-group6-page.mjs` writes `group6-page/index.html`. The page is not published.

## Round c: the six reports of the follow-up review applied

`fix-group6-c.mjs` applies the reports `review-g6b-a.md` to `review-g6b-d.md`, `english-g6b-fast.md` and `english-g6b-thorough.md`, as `fix-brief-group6-c.md` says. It copies `tools-drafts.json` to `tools-drafts.before-group6-c.json` on its first run and rebuilds from that copy on every run. Two runs gave the same file. Eleven keys differ from the copy: every key of the group except the section, which both reviews found ready. `english-group6c.md` holds the English of every changed node.

The script runs the checks of `fix-group6-b.mjs` and one more: a part whose `change` says «Без изменений» or «Как в согласованной формулировке» must contain its agreed wording word for word. That check found eleven parts of tools 3 (s-7unxytshhc4md54) whose `change` said «Без изменений», although round a had reworded them without changing their meaning. Each such `change` now quotes the approved wording and says «Без изменений по смыслу».

### The points that the brief settles

- **Review b-b, X3.** Applied, with three changes to the reviewer's words, each needed for one meaning:
  - the last item reads "the node is outside the archive and has a link to a node in the extension's file". The reviewer's "a node outside the archive has a link…" would make any node of the specification the subject of that item;
  - the refusal names "each such reference and each such kind by the file of the project's extension of the schema and the JSON Pointer to it". The reviewer's "that file" had no antecedent once the sentence before it was replaced;
  - the last paragraph checks "each reference in the project's extension of the schema and each kind in its `fields`", since a reference need not be in `fields`.
  The paragraph also says "the extension of the guidelines" wherever the project's extension of the schema is named beside it, as the thorough reader asked.
- **Review b-b, A3, and review b-d, nit b.** The paragraph "Before `sheriff settings` records an approval…" is cut from the proposal on how a project's own check is run, with its `cites` link to s-chsfpkgpmfk4fft and the link to s-m59dqwkw2e96wne, which only that paragraph used. The proposal's `change` and `removed` say so. In "Approving the specification", the citation of s-7pk89t8z6wymmj9 moves from the end of the sentence on the model to the first mention of the project's own checks, since the cut paragraph was what that citation backed. That node's `change` says that it alone now states which model the checks receive.
- **Review b-c, R1.** Applied: a draft rule on the approval status is moved to the archive "with the same reason" if it was ever approved, and deleted otherwise. Its `change` is corrected, and the proposal's `stage3` says that the code at reindex.ts:208–218, which adds the approval rule wherever `project.json` lacks one, goes.
- **Review b-d, the doubt.** The reviewer's sentence is a paragraph of its own after the list, with `cites` links to s-7zqsstgnuc772ba and s-xzcw3hv4hmxz7h7. The node's `stage3` says so too.

### Review b-a

- F1, F2, A1, W1, W2 and R1 are applied as worded.
- The notes that change no node: the line on rule 1.3.6 under "The changes owed to group 6" now says that the list of keys of a line settles it. The word "entry" in s-4bwa4zepd4nwcv8 is item 19 below, and the page builder's line for the new example of s-v4qus7raqnwzneb is item 20.

### Review b-b

- E1, E2 and E3 are applied. A1 is applied with "a commit or a push", as the brief asks. A2 is applied in the three paragraphs that the reviewer names, and A4 as worded.
- X1 is applied, with a `cites` link to s-chsfpkgpmfk4fft. X2 is superseded by X3.

### Review b-c

- T1 and T3 are applied as worded. T2 is a paragraph of its own after the list on the hooks. Its `change` says that the requirement moves into the text from the approved reason, which round a shortened.
- The Russian nits are applied, in the text and in example 2.
- R1 and R2 are applied, with "where … holds no entry" for "until … holds an entry", as the brief asks. The optional example is added. It names the old rule by what it refines, since "the approved rule that approves the specification" repeats the verb.
- The stage-3 note is added.

### Review b-d

- Wording fix 1 is applied, with "a commit or a push". Its "refuses the change because of it" reads "would refuse because of that check", since both readers found "the change" unnamed there.
- Fix 2, the stage-3 nit and the doubt are applied. Nits a and c are applied, and nit b is moot, since its paragraph is cut.

### The readers' findings that were applied

- Every replacement that the brief lists, in every place where its phrase occurs.
- **"How an approval is recorded":** "take it" became "take the approval". In the item on `withdrawn`, "which only a line that withdraws an approval holds" now follows the key's name directly.
- **The fingerprint:**
  - "which `sheriff reindex` builds" became "since `sheriff reindex` builds those values";
  - "it appears in the object with that empty list" became "the field appears in the object with an empty list under the key `values`";
  - "the first or the second" became "the `jsonSchema`" and "the `valueList`";
  - "under the names that the earlier release wrote" became "under their earlier names";
  - "the text of each cell that holds text in the node's row" became "the text of each cell in the node's row that holds text";
  - the item on a kind's name says where the name stands: in the source of a field's values;
  - in example 2, "the text of what a failure … costs" became "a text that says what a failure … costs".
- **Approving and withdrawing:**
  - "as it approves" became "in the same way as it approves";
  - "it records nothing" became "it records none of the run's approvals" or "withdrawals";
  - "the node's status" became "the status of each node that it names";
  - "which takes those nodes from the plugin" became "since such a project takes those nodes from the plugin";
  - "The approval names whoever runs the command" became "The approval holds the email address of whoever runs the command", and likewise for a withdrawal;
  - the first sentence on withdrawing names the command, and runs over each approval in force, so that the plural lines after it have an antecedent. The order of the lines reads "in the order in which the first line for each such wording comes in the file".
- **The entries:** "the last entry of its list" became "the last entry of that setting's list". "The rule by which an earlier release approved the specification" became "the rule through which an owner approved the specification under an earlier release". "The check of the entries" became "the check on the entries", and "address" became "email address".
- **Approving the specification:**
  - "it records the entry" names the entry that approves the specification;
  - in the example, "no SpecTag binds an old function" became "an old function has no SpecTag";
  - in the example, "the commit's parent" became "the single commit that the checks assume", since no commit was named.
- **The `strict` flag:** "its refusal" became "the refusal" (review b-d's fix 1).
- **Withdrawing an extension:** the reason no longer reads "would leave relying on". It says what "would rely on rules and definitions that no longer apply in the project once the choice of the extension is withdrawn".
- **Tools 3:**
  - the executable mode comes right after "stages";
  - "and writes that file" became "creating that file";
  - the paragraph on a repository outside git names the line instead of "that line", and the paragraph on the draft rule names "the top node of `project.json`" instead of "That section";
  - "what it lacks" became "what the file lacks";
  - "So, run again," became "So `sheriff init`, when run again,";
  - "puts the line of the branch being merged last" became "after the line from the current branch";
  - "which that check refuses" became "so that the check refuses the first commit";
  - the draft rule's text reads "The tests run before every push.", as its reason does. The fast reader read "on every push" two ways: before a push is accepted, or after it.
- **The proposal on `sheriff reindex`:**
  - "that entry" and "that rule" in neighbouring items are named;
  - the sentence on renaming a kind became a list that says where the name stands and that either place suffices;
  - "the test's mark" became "a test's mark";
  - "with that reason" became "with the same reason";
  - in the English reason, "is written in the form of the release" became "follows the form used by the release", and "differently" became "in a different form". The agreed Russian is unchanged.
- **The proposal on a project's own check:**
  - "only reported while the flag is off" became "that, while the flag is off, the check's failure is only reported";
  - in the English reason, "its checks of the SpecSheriff guidelines" became "the checks that the SpecSheriff guidelines require", and "whoever remembers" became "someone remembering". The agreed Russian is unchanged;
  - example 2 ends "refused because of that check".

### The readers' findings that were not applied, and why

- **Kept as the brief says:** "the files that the repository keeps", "the settings that only an owner of the specification changes", "makes this check" and "beside a field".
- **"by an act of their own"** (both readers): the words of the agreed reason of rule 10.7, as in round b.
- **"the node on `sheriff settings`"** (fast): "on" after a noun for a piece of writing is standard English, as in "a chapter on", and agreed nodes write "the rule on when the tests must pass".
- **"On a commit" → "At a commit"** (thorough): an agreed sentence that both readers read as intended.
- **"refuses the change"** in the first sentence of the proposal on a project's own check (thorough): an agreed sentence; "the change" is what `sheriff validate` checks, as in the agreed nodes on that command.
- **"the refusal or the report"** beside "is only reported" (thorough): the report is the one that says a failure is only reported, so both words mean the same thing.
- **"wrote or read differently"** (fast): both readings are meant, as the reader says.
- **"any other place in a JSON Schema"** (thorough): the item before names the only other place.
- **"it appends nothing"** (fast), "That string" and "The object" (thorough), "loses its sid and every link that points to it" (fast), "without any owner approving it" and "they never show everything" (thorough): each reader resolved the reference as intended, or both readings mean the same.
- **"adds a link to the rule"** (thorough): either reading leaves the fingerprint unchanged, which is what the example shows.
- **"names that node's sid"** (thorough): the drafts say throughout that a command names a node by its sid.
- **"the check for code and tests outside the commit that no SpecTag binds"** (thorough): the title of the node that it cites, s-3xx2eukc8gtd2tx.
- **"may make stricter"** (both): "may" gives a permission, as in rule 10.7.
- **"the agreed draft"** (both): this is the preamble of `english-group6b.md`, not a node. `english-group6c.md` says "the draft …, which the owner has agreed to".

### Questions for the owner

None. Every finding was one that the author can fix, or one that the brief settles.

## Round b: the six reports of the first review applied

`fix-group6-b.mjs` applies the reports `review-g6-a.md` to `review-g6-d.md`, `english-g6-fast.md` and `english-g6-thorough.md`, as `fix-brief-group6-b.md` says. It copies `tools-drafts.json` to `tools-drafts.before-group6-b.json` on its first run and rebuilds from that copy on every run. Two runs gave the same file. Eleven keys differ from the copy: every key of the group except the section, which review a found ready. The script runs the checks of `propose-group6.mjs` before it writes. `english-group6b.md` holds the English of every changed node.

### The points that the brief settles

- **Review b, finding 7:** the bindings file is the fourth item of what the one commit adds before an approval, with a `cites` link to s-trwczfskj5zmuft.
- **Review b, finding 9:** a withdrawal is also refused in two more cases:
  - while a node of the archive has a kind that the extension adds; the refusal names that node by its file and location;
  - while the project's extension of the schema refers to a definition in the extension's `$defs`; the refusal names the file and the JSON Pointer of the reference.
- **Review c, finding 1:** `sheriff init` and `sheriff remove` stay in one node. The gap in the base, which has no rule on taking the method out, is for the main session to record.
- **Review c, finding 4:** the node says that `sheriff init` says how to set what `sheriff.config.json` lacks: an empty list of glob patterns for code or tests, or no `testCommand`. `stage3` asks the code to give that hint for an existing file too.
- **Review a, F4:** the fingerprint follows rule 1.3.5 as agreed, so a node's kind is not part of its wording. Its `stage3` says so, for the main session to record the question for the base.
- **Review a, W4:** the withdrawal node says that withdrawing a `TableRule`'s approval withdraws only the approvals of the table's own wordings, and that a node in a cell is withdrawn by naming it. The asymmetry with rule 1.3.4 is for the main session to record.
- **Review c, finding 3:** the proposal on `sheriff reindex` removes a draft rule of `project.json` that refines the rule on the approval status.
- **Review d's cuts:** the last paragraphs of "Turning the `strict` flag on" and "Approving the specification" (an entry recorded "without running any check") are gone. The sentence of the proposal on s-7pk89t8z6wymmj9 about the run before the flag is turned on is gone too. Item 5 of the list below records the paragraph of s-chsfpkgpmfk4fft that goes.
- **"makes" and "runs":** "makes this check" stays where a command makes a check. "first makes the checks that the flag makes stricter" became "first runs the checks".

### Review a

- **R1 to R4:** applied, with one change to R1: "each with the address of whoever made it" for "with whoever made it", which both readers read as "in that person's company".
- **R5:** recorded in the `stage3` of s-v4qus7raqnwzneb (`migrateApprovals` is to append) and in that of the proposal on `sheriff reindex`, to which the test "reads the confirmations an earlier release wrote…" moves.
- **F1 to F3:** applied. F1's split also made the opening paragraph two paragraphs: the hash, then the string.
- **F4:** as the brief settles it, above.
- **A1 to A5:** applied. A3 and A4 are applied in both the approving and the withdrawing node.
- **W1 to W3:** applied. **W4:** as the brief settles it, above.
- **Consistency note on rules 1.3.3 and 10.3,** which still say "stands": recorded in item 16 below.
- **TERM** (fingerprint and OFT's revision; an approval in force and a baseline): recorded for the docs in item 17 below.

### Review b

- **Findings 1 to 4:** applied. Finding 3's sentence on the default of the `strict` flag replaces the one that cited only the schema. In finding 4's last sentence of the reason, the entry that `sheriff reindex` writes is named instead of "that entry". The readers found that "that entry", after a sentence on any entry, pointed back to the wrong thing.
- **Findings 5 and 6:** applied. The check of row 10.1.39b is now among the checks that the procedure runs, so what it finds also needs the owner's confirmation. The model that the project's own checks receive is stated, and cites s-2fau85dfyyeq66m.
- **Findings 7 and 9:** as the brief settles them, above.
- **Finding 8:** applied, with "everything that withdrawing the choice of the extension would leave relying on…", since the reason now covers nodes of the archive and references as well as nodes.
- **TERM** ("approving the specification" and a requirements baseline; `strict` and `extensions` holding lists): recorded for the docs.

### Review c

- **Finding 2:** applied. The rule's `TextRule.list` and its `of` are a paragraph of their own, which names "the rule's `TextRule.list`", so that "Its" does not point back across paragraphs.
- **Finding 3:** the rule that `sheriff init` writes now has a reason, in the reviewer's words.
- **Finding 5:** applied in Russian. The English of the reason and of example 3 changed with the readers' findings.
- **The proposal on `sheriff reindex`:** findings 1 to 4 are applied. Finding 1's correction also corrects the `change` field, which had called the narrowing to "wrote" «без изменений по смыслу».

### Review d

- **"Turning the `strict` flag on":**
  - the first paragraph is the reviewer's, which says that the checks run on the files of the working tree;
  - the example and the second sentence of the reason are the reviewer's, since while the flag is on, the approval itself is refused;
  - the last paragraph is cut.

  The list now also names the command that each check's refusal names. Review d asks that the last paragraph of s-chsfpkgpmfk4fft go when that node next changes, because this node states it. Before this change, this node named the commands only through that paragraph.
- **The proposal on s-7pk89t8z6wymmj9:**
  - the paragraph on `onFailure` is the reviewer's, which sends `reportedUnlessStrict` through the general rule of the first paragraph;
  - the cut is made, and the `change` field says «прежде одна проверка не могла этого выразить: понадобились бы две».
- **TERM** (`reportedUnlessStrict` and GCC's `-Werror`): recorded for the docs.

### The readers' findings that were applied

- **"How an approval is recorded":**
  - "withdraws" now has its object ("whoever approves the wording or withdraws its approval");
  - "the latest line" is the latest of the lines for one sid and one fingerprint;
  - "whether or not a later line withdraws that approval";
  - "No approval of any of R's wordings is in force".
- **The fingerprint:**
  - the hash and the string are two sentences;
  - "each cell that holds text in the node's row";
  - "The following keys and kinds of node";
  - "the `pointer` of the first or the `symbol` of the second";
  - "the name of a kind of node, where a field's values are the sids of that kind's nodes";
  - "the object for the rule".
- **Approving a node:**
  - "The approval names whoever runs the command" is a sentence of its own;
  - "a node of which whoever runs the command is not an owner";
  - "one approval of the node".
- **Withdrawing an approval:**
  - "whether or not they are among the node's owners", since an agent may run the command;
  - "finds that R is wrong".
- **The entries:**
  - "whose value is the name of an extension";
  - "In a commit, each list begins with the entries that the commit's parent holds in that list";
  - "each have the value that the last entry of its list sets";
  - "each with the address of the owner who made it".
- **Approving the specification:**
  - "before the specification is approved";
  - "as if one commit added";
  - "the approval that is in force for";
  - "what these checks find: every refusal, warning and report";
  - "as it does when asked to turn the flag on";
  - "the same as the one that `sheriff settings` gives when it refuses to turn the flag on";
  - "The owner agrees to the approval";
  - a reason that no longer opens with a participle attached to the wrong noun.
- **Turning the `strict` flag on:** "the check for code and tests", the term of the agreed s-weuyx98r7c923ab; "such a commit or push"; "two functions in an old file".
- **Withdrawing the choice of an extension:** the reason no longer says that the extension itself is withdrawn; "the project's base specification".
- **Setting a repository up:**
  - "For the git hooks";
  - the stage item reordered;
  - "writes the following for the agent";
  - "the agents that it supports";
  - "any other agent name";
  - "sets git to merge `specs/_approvals.jsonl`" and "the `merge` attribute of that file";
  - "the `.gitattributes` file";
  - "that matches the line";
  - "appends that line to `.gitattributes`";
  - "starts on a line of its own and ends with the same line ending as the other lines of the file";
  - "writes each of the following files where it is missing";
  - the declaration explained at its first use;
  - "does not run until it is moved";
  - "Adopting the method and removing it each take one command";
  - "run the same way";
  - "Someone runs `sheriff init` in a project on Windows";
  - "Git on Windows does not read the executable mode from a file";
  - "Because `sheriff init` set git to merge that file by union";
  - "a conflict in that file";
  - "the section without a rule".
- **The proposal on `sheriff reindex`:** the new item reads "the draft rule on when the tests run, which `sheriff init` writes"; the paragraph on naming the rule opens with "When `sheriff reindex` adds the draft rule…".
- **The proposal on s-7pk89t8z6wymmj9:** "reads the flag from the model"; "The member that lists the check `spelling`".

### The readers' findings that were not applied, and why

- **Agreed sentences of the two proposals that break no rule:**
  - in the node on `sheriff reindex`: "until", "has yet to choose", "occurs in one of these places", "in the form of the release", "loses its sid and every link", "the test's mark", "differently from the release";
  - in s-7pk89t8z6wymmj9: "In its `TextRule.list`", "On a commit", "adds, changes or removes a file in the directory".
  Groups 3 and 4 kept these sentences, since an agreed sentence that breaks no rule stays.
- **"makes a check" → "runs a check"** (both readers, several nodes): kept where a command makes a check, as the brief and groups 3 to 5 keep it. The one sentence that used "makes" in two senses now says "runs".
- **"The approvals of nodes" → "Approvals of nodes"** (the thorough reader, the section): review a found the section ready. Its title is the name that "Where the files are" gives the file, and the agreed sections say "The commands".
- **"beside a field" → "next to a field"** (the fast reader): "beside their field" is the wording of the agreed rule 12.9, "Gathered values are written beside their field".
- **"by an act of their own"** (both readers, the `strict` flag): the words of the agreed reason of rule 10.7, which this reason restates.
- **"the agent's hooks for Codex"** and **"as a project declares them"** (the fast reader): the terms of the agreed nodes on Codex's hooks and on the plugin for Claude Code.
- **The paragraph signals** of the wording lint on the first paragraph of the withdrawing node and of the `strict` node: each paragraph states one procedure, and the second is the reviewer's text.

## The keys

| Item | Key | Sid | Title | Implements |
|---|---|---|---|---|
| 48 | `new:tools-11-section` | s-e75g25ajrm2kqj5 | The approvals of nodes (a section) | — |
| 48 | `s-v4qus7raqnwzneb` | s-v4qus7raqnwzneb | How an approval is recorded | 1.3.4 (s-67vekyup7y8smap), 1.3.3 (s-9g7jj8z4yf9kq93) |
| 48 | `new:tools-11-fingerprint` | s-f5brvuuu6xmkj6t | The fingerprint of a node's wording | 1.3.5 (s-5ah25f6gy99panq), 8.6 (s-5fewsp22mmdz7y6) |
| 48 | `new:tools-11-approve` | s-upkur92ry6332y5 | Approving a node | 1.3.4 (s-67vekyup7y8smap) |
| 48 | `new:tools-11-withdraw` | s-xybjqp2rxh8gszf | Withdrawing the approval of a node | 1.3.7 (s-fpq35tf3pehgk64) |
| 48 | `new:tools-2-entries` | s-d3nkw9b6mn98vuw | The entries of the settings that only an owner changes | 10.6, 10.7, 1.7.5 |
| 48 | `new:tools-2-approve-spec` | s-m59dqwkw2e96wne | Approving the specification | 10.6, 10.7, 10.2 (s-epaw9sgyaajzn8g) |
| 48 | `new:tools-2-strict` | s-nxgkp988mej79eg | Turning the `strict` flag on | 10.7 (s-q3pfzyaxvpr2zj2) |
| 49 | `new:tools-2-extension-off` | s-n4ny597qdv9c9bu | Withdrawing the choice of an extension | 1.7.6 (s-j8y62pa9hzz6nwx) |
| 50 | `s-7unxytshhc4md54` | s-7unxytshhc4md54 | Setting a repository up and taking SpecSheriff out of it | 10.2 (s-epaw9sgyaajzn8g), 10.13 (s-jsqxdx47wkkj7gp), 1.1.6 (s-6sk8uet75dmq5qz) |
| proposal | `proposal:s-gb8s9657a65hqmv-g6` (base `proposal:s-gb8s9657a65hqmv-g3`) | s-gb8s9657a65hqmv | What `sheriff reindex` changes in what an earlier release wrote | as agreed |
| proposal | `proposal:s-7pk89t8z6wymmj9-g6` (base `s-7pk89t8z6wymmj9`) | s-7pk89t8z6wymmj9 | How a project's own check is run | as agreed, and 10.7 (s-q3pfzyaxvpr2zj2), which was cited before |

No node of the group implements a row of a table of checks: every node is a procedure, or a record that procedures and checks read. `moved/impl.json` maps no row to s-v4qus7raqnwzneb or s-7unxytshhc4md54, so it needs no change.

The locations are those that the drafts give: tools 11 becomes a section, with the four nodes on approvals as 11.1 to 11.4. The four nodes on the settings follow the agreed node on `sheriff settings` (s-chsfpkgpmfk4fft, tools 2.10) as 2.10a to 2.10d, since each says what `sheriff settings` does.

## Decisions that apply to the whole group

- **Form.** A node of a procedure opens with what the command does, and a refusal with what the command refuses; the next sentence says what the refusal names.
- **Splitting.** Rule 7.3.3 splits "How an approval is recorded" into the record, the fingerprint, approving and withdrawing, as groups 2 and the commands split their nodes: each can be carried out with the others cited. The section takes a new sid, and s-v4qus7raqnwzneb stays with the record, since most agreed drafts cite it for the record (an approval in force, a node's last approval, the email address that names the approver). "Setting a repository up and taking SpecSheriff out of it" is not split. `sheriff remove` takes out exactly what `sheriff init` writes, so a reader needs both parts together. A node for `sheriff remove` alone would also implement no rule, which row 10.1.23 refuses.
- **Draft or approved.** The node on withdrawing an extension says that its check runs regardless of the approval status, since rule 1.7.6 has no condition. The node on approving the specification and the node on the `strict` flag say how they read the status ("as approved", "if the specification were approved"). The nodes on approving and withdrawing a node are procedures whose refusals do not depend on the status, as before.
- **Citations at first use (rule 7.2.7).** Approval (1.3.4), wording (1.3.5), withdrawal (1.3.7), agent on an owner's behalf (1.3.6), fingerprint (the new node), `TableRule` (8.6), gathered values (12.9), archive (2.6), `TextRule.list` (5.1), chosen extension (1.7.5), Domains extension (s-tdm3rwsppnuh6dm) and a header's derived status (s-yccuyqbypzzx2gu), owners (1.1.6), the settings that only an owner changes (s-chsfpkgpmfk4fft), approval status (10.6), `strict` flag (10.7), the system's code (9.1), SpecTag (9.3), the project's own checks (10.8), the model of the specification (s-w6gybeqn2ttydqx), location (8.5), the git hooks (s-4mej6ccn7xu3d3p), the project's own tools (s-n4m5zvh96yb299p), the bindings file (s-trwczfskj5zmuft).
- **Kept `cites` links.** The decisions of s-v4qus7raqnwzneb cite s-5ah25f6gy99panq and s-7unxytshhc4md54, and those of s-7unxytshhc4md54 cite s-qzthyh7yqvfhsa2 and s-pcnyfp7gev7syax. Each link stays on the node that keeps the decision in stage 3, as each draft's `stage3` field says. The withdrawal node takes the decisions of 2026-10-31 and of 2026-11-06 on withdrawing each wording, so it keeps a link to s-5ah25f6gy99panq.
- **Words.** "refuses", "is in force" (never "stands"), "the most likely mistake", "any other" (never "every other", which the approved text of tools 3 used), "the SpecSheriff tools", no count of what code declares. In Russian: «отвергает», «ответственный», «в силе», «отпечаток», «запись» for an entry, «отзыв» for a withdrawal, «в стейджинг». `sheriff approve`, `sheriff init` and `sheriff remove` are «он», as `sheriff reindex` is in the agreed Russian; `sheriff settings` is «она», as in its agreed node.
- **`removed` and `stage3`** are in English, as in groups 3 to 5; the `change` fields compare each part with the approved wording, in Russian, and tell no history of rounds.

## The drafts

### `new:tools-11-section` — "The approvals of nodes"

A section in place of the node, as "The commands" and "Who runs the reviewer" became sections. Its title is the name that "Where the files are" gives the file of approvals. Its text states its purpose.

### `s-v4qus7raqnwzneb` — "How an approval is recorded"

What was settled:
- **The line.** The exact form of a line, with the order of its keys, as approvals.ts writes it. The path cites "Where the files are", as the continuation file asked.
- **"In force".** "Stands" becomes "is in force", the words of the agreed row 10.1.8 and of s-95w92rnjuv3sst8.
- **A node's last approval** is defined here: the last line for its sid without `withdrawn`, whether or not a later line withdraws it. The agreed s-a8fn72xa782wvbk and s-txbwsthdqhvyzd2 use the term and cite this node, and rule 10.15 says that generated code follows the last approved wording even after a withdrawal.
- **An approval on an owner's behalf** (the inventory left this unclear) has the same form as the owner's own, since a line holds only the keys that the node lists and names its maker only by `by`. Round b cut the sentence that said so (review a, R2); the reason of the agreed s-4bwa4zepd4nwcv8 still rests on the list of keys. Rule 1.3.6 asks the tools nothing more, so the node does not implement 1.3.6.
- **The reason** is two sentences on the record as a whole (rule 7.4.2). The six approved paragraphs explained the text paragraph by paragraph. What they said about the union merge is now an example of tools 3, and what they said about the fingerprint and withdrawal moved with those nodes.
- **NodeKind** goes (X4).

Stage 3: see the draft's `stage3`. In short, the function for a node's last approval is added, and the tests and decisions are split between the four nodes.

### `new:tools-11-fingerprint` — "The fingerprint of a node's wording"

What was settled:
- **What the string leaves out** is listed, as rule 7.2.6 asks where a property left out by mistake would go unnoticed. Then every other property, the examples included, is in the wording, as rule 1.3.5 requires since the ruling of 2026-11-14. The list matches model.ts (`NOT_WORDING`), apart from `owner`, `owners` and `sections`: they are held only by sections and headers, which have no fingerprint.
- **A `TableRule`.** A cell that holds a node is left out of the table's object. The schema's comment calls such a node "a node of its own", and rule 1.3.4 approves it on its own. A text cell stays, being part of the table's wording.
- **A node in a cell** gains the key `cell`, with `column`, `group` and `row`, which are part of its wording under rule 1.3.5. The key names are new; no code handles a `TableRule` yet.
- **Names of earlier releases.** The agreed s-gb8s9657a65hqmv requires that a renamed key and a renamed kind leave the fingerprint unchanged. So the node lists each rename that reaches the object:
  - the reason, under `rationale`, as before;
  - `TextRule.list.jsonSchema` and `TextRule.list.valueList`, under `declaredIn`, with `pointer` and `symbol` under `declaration`. Row 10.1.35's todo gives these key names. A list that holds both keys was never written by an earlier release, so it keeps its own names;
  - the kind named as the kind whose sids are a field's values, as model.ts does (`EARLIER_KINDS`).
  The other renames of s-gb8s9657a65hqmv concern properties that the object leaves out (location, kind, status, owners). Any other change of a node's form, such as a RecordType's `fields` becoming its `schema`, makes the node a draft, as the continuation file records.
- **The empty list of a field whose values the domains add** stays, worded as s-gb8s9657a65hqmv words it, since `sheriff reindex` leaves such a RecordType unchanged and its approval must stay in force.
- **The hash** is written exactly: SHA-256 of the UTF-8 bytes, 64 lowercase hexadecimal digits, keys sorted by UTF-16 code units, as model.ts computes it.

### `new:tools-11-approve` — "Approving a node"

What was settled:
- **A `TableRule`** approved as a whole approves each node in its cells that has no approval of its current wording in force (rule 1.3.4, the ruling of 2026-11-14). The approvals follow that of the table in the order of the rows, so that a run always appends the same lines.
- **The nodes of the SpecSheriff guidelines and of a chosen extension** are refused as sids that name no node in the files that the repository keeps. Rule 2.5 says that they come with the plugin, and they are approved where they are written. In the repository where they are written, they are in those files and can be approved.
- **The refusal of the rule that approved the specification** goes (rule 10.6, the ruling of 2026-11-13).
- **What the code already does** is now in the text: the run records all or nothing, refuses without an email address in git, and runs `sheriff reindex` afterwards.

### `new:tools-11-withdraw` — "Withdrawing the approval of a node"

What was settled:
- **A node of a chosen extension** is refused, as rule 1.3.7 requires since the ruling of 2026-11-18. The refusal of the rule that approved the specification goes.
- **A `TableRule`.** Withdrawing its approval withdraws only its own approvals. Rule 1.3.4 lets an owner approve a whole table at once, but no rule withdraws the approvals of the nodes in its cells with it.
- **The reason** cites rule 1.3.7 instead of rule 1.3.5, since the new 1.3.5 says nothing about withdrawals. The link to s-5ah25f6gy99panq stays, since the text cites it for "wording" and a decision that moves into this node cites it.

### `new:tools-2-entries` — "The entries of the settings that only an owner changes"

What was settled:
- **One node for the entries of all three settings.** The continuation file had planned the entries of the approval status and of the `strict` flag for "How an approval is recorded", and those of the extensions for a node on rule 1.7.5. The agent had decided that alone. The agreed s-j9r8z4xdrfkfs47 checks the entries of the three settings in the same way, so one node states their form, and both other nodes would only restate it.
- **The form.** Three lists under their own keys, `approvalStatus`, `strict` and `extensions`, each entry holding the value and `by`. The key names are the agent's choice; `config.schema.json`, to be added in stage 3, is to describe them. `strict` holds a boolean, since the ruling of 2026-11-17 makes its default `false` in the schema.
- **The latest entry is the last one** (group 3's notes, item 6): `sheriff settings` appends, and s-j9r8z4xdrfkfs47 keeps the parent's entries first.
- **An entry holds only its keys**, so nothing in it depends on when it is written (group 3's notes, item 6, from review A). The reason says why: the entry that `sheriff reindex` writes for an earlier release's approval must be the same text whenever it is written, or s-j9r8z4xdrfkfs47 would refuse the commit.
- **No entry.** Without an entry, the specification is a draft, by rule 1.3.3, and the `strict` flag takes the schema's default, by the ruling of 2026-11-17. That is not a default named in the guidelines.
- **An entry that changes nothing** is not recorded, so that running a command twice adds nothing.

### `new:tools-2-approve-spec` — "Approving the specification"

What was settled:
- **Which checks run.** Those of `sheriff validate`, `sheriff binding` and `sheriff citations`. Of the checks in the tables, only `sheriff commit-message` reads the commit message, only `sheriff review` makes the review, and only the pre-push hook runs the tests, so these three commands make every check that rule 10.6 requires.
- **What the one commit adds.** Rule 10.6 says "as if one commit added the whole specification and all of the system's code". The node makes the commit add each node, the approval in force of each approved node, and all of the code and tests. Everything else stays as the parent holds it. The reasons are these:
  - without the approvals, an approved rule with neither code nor tests would not be one that the commit includes, so row 10.1.41 would pass it, while rule 10.6 names exactly such a rule among what the owner sees;
  - with the archive added, the check of the archive (s-j4webte36gkraju) would refuse every node of the archive as added without a removed node;
  - with every line of the approvals and every entry added, the checks would report the approvals of removed nodes and the entries of former owners, which tell the owner nothing that the specification lacks.
  A consequence the owner may notice: an approval in force given by someone who is no longer an owner of its node is shown by the check of row 10.1.9 (s-75ue25v6r23jkk8), since the commit adds it. That is what rule 10.6 asks for, so it is not put to the owner.
- **Row 10.1.39b** is reported without writing a file (group 4's notes, round b, item 5). The generation in memory that s-dbk2vyeg8z5jxna already uses can give it.
- **The `strict` flag.** While it is on, the refusal of rule 10.7 comes first and is the same as before turning the flag on. Rule 10.7 names the same cases for both procedures.
- **What the checks read** in this run (the files of the working tree) is said here. Rule 10.6's reviewer had asked "The hooks" (item 57) to say it, but the run is made by `sheriff settings`, not by a hook.
- **Returning the specification to draft:** round b cut the sentence that said it runs no check, since no rule requires a check there (review d).

### `new:tools-2-strict` — "Turning the `strict` flag on"

What was settled:
- **Which checks the flag makes stricter.** In the guidelines, only the check of code without a SpecTag outside the commit (rule 9.5, s-3xx2eukc8gtd2tx). A commit that changes nothing leaves all of the code outside it, so that check refuses where `sheriff untagged` lists anything.
- **The project's own checks.** Any of them may be made stricter by a rule of the project's own guidelines (rule 10.7), and the SpecSheriff tools cannot tell which. So each is run as `sheriff validate --strict` runs it. The agreed s-7pk89t8z6wymmj9 said so too; its proposal moves the statement here. The agreed s-chsfpkgpmfk4fft names `sheriff validate --strict` in the refusal for them.
- **Files that fail the key or schema checks.** `sheriff validate` runs the project's own checks only after those checks pass, so `sheriff settings` refuses to turn the flag on while they fail (review b-d's doubt, settled by rule 10.7).
- **"Or a push".** The text keeps the words of rule 10.7. No check at a push is made stricter by the flag, so the list names commit checks only.
- **Turning the flag off:** round b cut the sentence that said it runs no check, since no rule requires a check there (review d).

### `new:tools-2-extension-off` — "Withdrawing the choice of an extension"

What was settled:
- **Choosing an extension** needs no node of its own: the agreed s-chsfpkgpmfk4fft already says that `sheriff settings` records a choice only where the plugin delivers the extension, and the entries node gives the form.
- **How a node depends on an extension.** Rule 1.7.6 lists a kind, a property, a type of link and a link to the extension's nodes. The node says where the SpecSheriff tools find each: the `kinds`, `fields`, `linkTypes` and `link` of the extension's schema (`extension.schema.json` defines these keys), and the extension's file. A property that the extension adds to a link is a property of the link a node has, so it is listed with the types of link.
- **Which nodes are checked.** Only those in the files that the repository keeps: by rules 1.7.3 and 1.7.4, no node of the SpecSheriff guidelines or of another extension depends on an extension.
- **The refusal** names each node by its file, sid and location, as the other refusals of the appendix do.

Rounds b and c added the cases that rule 1.7.6's example warns of, as the briefs of those rounds settle them:
- a node of the archive depends on the extension in each way that the list names, except through a link to the extension's nodes, since the composed schema validates the whole of an archived node;
- a reference in the project's extension of the schema depends on the extension where it points to a definition in the extension's `$defs`;
- the `fields` of the project's extension of the schema depend on the extension where they set conditions for a kind that the extension adds.

Still not covered: a file of the specification that holds a property that the extension's `file` adds. No extension adds a property to a file today, so this is recorded and not proposed.

### `s-7unxytshhc4md54` — "Setting a repository up and taking SpecSheriff out of it"

What was settled:
- **The rule that approved the specification** is no longer written. The owner replaced it with entries on 2026-11-13 (rule 10.6).
- **`project.json` is left with a section that holds a rule.** Without that rule, row 10.1.18 (s-zhen42p6mnaxu7w) would refuse the section at the first commit after `sheriff init`. Rule 1.6.4 (s-x8uzc8z44pwtd3h) requires a project's own guidelines to name where the tests run, so `sheriff init` writes that rule as a draft, as it wrote the approval rule before (the ruling of 2026-11-06 on this node: "the rule is written in every project, as a draft"):
  - the rule names `push`, the only moment at which the SpecSheriff tools run the tests (s-b6qdtghnyha3fhk); a team's CI stays out of the design (`.claude/vt/rules.md`);
  - while the rule is a draft, the SpecSheriff tools treat it as listing nothing (s-t9j29hppag2nren), so the tests run at a push only after an owner approves the rule and the specification;
  - the rule's title, "When the tests run", and its list's `of`, "the moments at which the tests run", use the words of row 10.1.44 and s-b6qdtghnyha3fhk, not the "where" of rule 1.6.4, which group 4's notes record as to be aligned.
- **No entry of the owner's settings is written** by `sheriff init` (the inventory's open point). Only an owner approves the specification, turns the `strict` flag on and chooses an extension (rules 10.6, 10.7 and 1.7.5). `sheriff remove` takes out `sheriff.config.json` with its entries, which only the SpecSheriff tools use and which git's history keeps.
- **The bindings file** stays when `sheriff remove` runs, and is named, as `specs/` is. It holds the SpecTags of files whose format allows no comments. So it belongs to the project's code as the SpecTags in comments do, which `sheriff remove` leaves too. `sheriff init` does not write it.
- **"Both agents" and "the two it takes"** count what `AGENTS` in init.ts declares (rule 7.4.1). The continuation file asked for this fix.
- **Links (X2).** The node implements rule 10.2 (s-epaw9sgyaajzn8g) instead of the main table of checks. It implements rule 1.1.6, since `sheriff init` names the specification's owner, and rule 10.13, since `sheriff init` writes `project.json`. The `implements` links to rule 10.3 and rule 10.6 go: 10.3 is one of the moments of 10.2, and no rule approves the specification any more. A `cites` link to 10.6 stays for the decisions that cite it.
- **The reason** is three sentences on the node as a whole (rule 7.4.2). The approved reason had eleven paragraphs that explained the text one by one. The executable mode, the union merge and the new rule in `project.json` are explained by examples.
- **"Keeping every other key"** became "keeping any other key", and "It replaces no other file" became "It leaves as it is any other hook, declaration or file", since a rule says what holds. The declaration is added because init.ts also leaves a declaration changed by hand (review b-c, T3).
- **"`sheriff init` stages only the git hooks"** is in the text, as the ruling of 2026-11-02 requires. The approved reason held it until round a shortened the reason (review b-c, T2).
- **`sheriff remove`** leaves a hook or a declaration that matches no text that `sheriff init` writes now or wrote in an earlier release, as the first item of its list implies (review b-c, T1).
- **The draft rule's text** reads "The tests run before every push.", as its reason does.

## The proposals

The coordinator asked for two proposals that fix the defects raised in items 1 and 6 of the list below, following group 4's precedent. Each is one complete new wording, built in the script from the agreed draft named in `base`. A part that does not change keeps its agreed wording, and its `change` says «Как в согласованной формулировке.»

### `proposal:s-gb8s9657a65hqmv-g6` — "What `sheriff reindex` changes in what an earlier release wrote"

What changes:
- **The draft rule on the approval status.** Where `sheriff.config.json` holds no entry for the approval status, a draft rule of `project.json` that refines that status is moved to the archive with the same reason if it was ever approved, and is deleted otherwise (rule 2.6). Such a draft was often approved once, since an earlier release made the specification a draft by withdrawing that rule's approval (review b-c, R1).
- **The new item.** In the run that moves the rule that approved the specification to the archive, or archives or deletes its draft, where `project.json` is then left with no rule that refines rule 1.6.4 (s-x8uzc8z44pwtd3h), `sheriff reindex` adds the draft rule on when the tests run that `sheriff init` writes, listing `push`. A new paragraph says that `sheriff reindex` names that rule, since the SpecSheriff tools read it only after an owner approves it. The script writes the rule, not a manual step in the release notes, by the owner's rule "What can run as a deterministic process is automated".
- **Why it is tied to the migration.** The coordinator's wording was "where `project.json` holds no rule that refines s-x8uzc8z44pwtd3h after the migration". The item adds the rule only in the run that archives the approval rule or archives or deletes its draft, for these reasons:
  - only those projects lose something. Their section may be left without a rule, which row 10.1.18 refuses. A project whose approval rule was approved also ran the tests at a push under the earlier release;
  - the migration runs once, so a second run changes nothing (rule 10.13);
  - a rule that the project later deletes is not written again. A condition that did not depend on the migration would make every run of `sheriff reindex` write the rule back, which is no longer "what an earlier release wrote".
- **Renamed keys inside a list.** The keys inside `jsonSchema` and `valueList` are renamed: `declaration` becomes `pointer` or `symbol`. Row 10.1.35's todo gives the new keys, by the owner's rulings of 2026-11-13, and "The fingerprint of a node's wording" relies on the renames. This was item 1's second bullet; it goes into the same proposal, since a proposal carries every change that the agent would make.
- **Sentences brought into line:**
  - the first use of an extension of the guidelines, of the system's code and of a project's own check or generator now cites its rule (7.2.7);
  - "names each file that it changes in this way" pointed back to the renames of the previous sentence, while it meant every change, so it now says so in its own paragraph;
  - the fingerprint is cited at s-f5brvuuu6xmkj6t, and s-v4qus7raqnwzneb stays cited for the approval that stays in force;
  - the agreed sentences that both readers read two ways, as `fix-brief-group6-c.md` lists them, and the English of the reason. The proposal's `change` lists each.
- **An example** shows the run that adds the draft rule on when the tests run, and the mistake of adding it again later.
- **Unchanged:** every other part.

Stage 3: see the proposal's `stage3`. It also removes the code at reindex.ts:208–218 that adds the approval rule wherever `project.json` lacks one, since that addition and the archiving or deletion of the draft would undo each other on every run. In this repository and in the saloon, the first `sheriff reindex` of the release writes the rule, and the owner approves it. Until then, their pushes run no tests.

### `proposal:s-7pk89t8z6wymmj9-g6` — "How a project's own check is run"

What changes:
- **A new value of `onFailure`.** With `reportedUnlessStrict`, `sheriff validate` reports the check's failure while the `strict` flag is off, and refuses the change while the flag is on. The flag is read in the model that the check receives, so `sheriff validate --strict`, and the run before the flag is turned on, refuse such a failure.
- **A deviation from the coordinator's wording, with the reason.** The coordinator wrote that "a project's own check whose rule marks its failure as only reported refuses" while the flag is on. That reading would make the SpecSheriff tools decide, for every such check, that its failure refuses the change under the flag, which contradicts three agreed statements:
  - the owner's ruling of 2026-11-04 on rule 10.8: "whether one refuses or reports is decided by that rule, which its owner confirms, and not by the settings of the tools";
  - row 10.1.37's cost: "refused, or reported where the rule listing it says so";
  - rule 10.7, under which "a rule ... of a project's own guidelines may make a check stricter"; its second example says that the project's own guidelines "may refine" a check. The appendix of the tools is not among the rules that 10.7 names (rule 2.1).
  So the rule that lists the check makes it stricter through the new value, which is exactly what 10.7's second example describes, and a check whose rule says `reported` still only reports. If the coordinator wants the blanket reading all the same, it needs the owner's decision, because it changes row 10.1.37 and the ruling on 10.8.
- **Paragraphs.** The paragraph on the listing rule is split, so that everything about `onFailure` is in one paragraph.
- **The paragraph on `sheriff settings` goes,** with its `cites` link to s-chsfpkgpmfk4fft. By the owner's rule "One statement, one home", the group's nodes on approving the specification (s-m59dqwkw2e96wne) and on turning the flag on (s-nxgkp988mej79eg) say what it said (fix-brief-group6-c.md).
- **Links.** The link to rule 10.7 becomes an `implements` link, and the proposal's `change` says so.
- **A second example** shows the new value and the mistake of reading the flag from the entries instead of from the model.
- **The English of the reason** is clearer, with the same meaning; the agreed Russian is unchanged.

The group's node "Turning the `strict` flag on" already runs each of the project's own checks as `sheriff validate --strict` runs them, so it needs no change.

## Questions for the owner

None. Each point that could have been one is settled above by a rule or a ruling:
- the framing of the run before an approval, by rule 10.6, its example and row 10.1.41;
- the draft rule that `sheriff init` writes, by rule 1.6.4, row 10.1.18 and the ruling of 2026-11-06 on tools 3;
- the bindings file left by `sheriff remove`, the way the node treats the SpecTags in comments;
- the project's own checks under the `strict` flag, by the agreed s-chsfpkgpmfk4fft and s-7pk89t8z6wymmj9;
- the key names of the entries and of the fingerprint, which are details of the implementation that no rule fixes;
- in the two proposals, the condition under which the migration writes the rule on when the tests run, by rule 10.13 and by the subject of that node, and the value `reportedUnlessStrict`, by rule 10.7, row 10.1.37 and the ruling of 2026-11-04 on rule 10.8.

If the coordinator prefers the blanket reading of the second proposal, under which every check marked `reported` refuses while the flag is on, that reading is a question for the owner, since it changes row 10.1.37's cost and departs from the ruling on rule 10.8.

## The changes owed to group 6 by groups 1 to 5, and how they were made

- **Group 3's notes, item 6:** the latest entry is the last one in `sheriff.config.json`, and an entry holds nothing that depends on when it is written. Both are in `new:tools-2-entries`.
- **Group 3's notes, item 5, and group 4's notes, item 7:** `config.schema.json` is to describe the entries. The entries node names the keys; the schema itself waits for stage 3.
- **Group 4's notes, round b, item 5:** the approval procedure obtains the report of row 10.1.39b without writing anything. This is in `new:tools-2-approve-spec`.
- **The continuation file:**
  - s-v4qus7raqnwzneb and s-7unxytshhc4md54 no longer say that a rule of `project.json` sets the approval status;
  - "How an approval is recorded" cites "Where the files are" for the path of the approvals;
  - "both agents" in tools 3 is gone, which closes the item under "Found and owed";
  - the run before an approval says what its checks read.
- **The inventory:**
  - rule 1.3.6 (s-t5uw8zfxzhfdg86) is settled by the list of keys of a line in s-v4qus7raqnwzneb: a line made on an owner's behalf holds the same keys as one that the owner makes;
  - rule 1.3.7 (s-fpq35tf3pehgk64) has its implementing node;
  - the fingerprint of a `TableRule` (rule 8.6) is covered;
  - the record of the chosen extensions is settled for `sheriff init` and `sheriff remove`.

## Changes still needed outside the group

1. **"What `sheriff reindex` changes in what an earlier release wrote" (`proposal:s-gb8s9657a65hqmv-g3`), agreed:** carried out in the group by `proposal:s-gb8s9657a65hqmv-g6`: the citation of the fingerprint, the keys renamed inside `jsonSchema` and `valueList`, and the draft rule on when the tests run that the migration writes. See "The proposals" above.
2. **"An approved rule whose tests or code lag behind it" (s-txbwsthdqhvyzd2), agreed:** a technical replacement: "the fingerprint (§s-v4qus7raqnwzneb)" is to cite s-f5brvuuu6xmkj6t.
3. **"What `sheriff reindex` writes" (`proposal:s-ztseyetus7np6br-g3`), agreed:** "while an approval of its current wording stands" is to read "is in force", an English-only replacement; the Russian already says «в силе».
4. **"The commands that `sheriff` accepts" (s-f5rz6b7dhxejjts), agreed:** its line on `sheriff approve` cites s-v4qus7raqnwzneb, which now leads to the approving and withdrawing nodes through its citations. Citing the section s-e75g25ajrm2kqj5 instead would be a technical replacement when the node next changes.
5. **"The settings that only an owner of the specification changes" (s-chsfpkgpmfk4fft), agreed:** when it next changes:
   - its last paragraph goes: "A refusal caused by the `strict` flag names, for each check that would refuse, the command that lists what that check finds", with its items on `sheriff untagged` and `sheriff validate --strict`. "Turning the `strict` flag on" (s-nxgkp988mej79eg) now states it, check by check (review d);
   - it may cite s-m59dqwkw2e96wne, s-nxgkp988mej79eg and s-n4ny597qdv9c9bu, which say how it records or refuses each change.
   Nothing contradicts until then.
6. **"How a project's own check is run" (s-7pk89t8z6wymmj9), agreed:** carried out in the group by `proposal:s-7pk89t8z6wymmj9-g6`, with the value `reportedUnlessStrict`. See "The proposals" above for why the rule that lists the check decides.
7. **"The chosen extensions and the installed plugin" (s-mhsb6fjsq5xn6c9), agreed:** `sheriff settings` reads the chosen extensions, so it refuses to run while the plugin lacks one of them. A project can then withdraw such an extension only after installing a release that delivers it, or by an owner's entry written by hand, which s-j9r8z4xdrfkfs47 accepts. Recorded; no change proposed.
8. **"An edit judged before it is made" (s-st6td4mua9uqt9z), item 58:** the entries that `sheriff guard` protects (rule 10.3) are the lists `approvalStatus`, `strict` and `extensions` of `sheriff.config.json`, as `new:tools-2-entries` names them.
9. **"The hooks" (s-477gtdrkw34dzxw), item 57:** the run of the checks before an approval is described by s-m59dqwkw2e96wne, so "The hooks" need not describe it.
10. **The plugins (s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4), items 62 and 63:** on 2026-11-18 the owner agreed that a skill `spec-settings` opens `sheriff settings` in a window of its own, or asks in the chat when the owner works remotely. If it is to ship in this release, the plugins' nodes are to list it.
11. **Stage 3, the repositories:** under `proposal:s-gb8s9657a65hqmv-g6`, the first `sheriff reindex` of the release writes the draft rule on when the tests run into this repository's `project.json` and into the saloon's. The owner then approves it in each, so that their pushes run the tests again.
    - wherever a schema describes the members of the rule that lists a project's own checks, it is to admit the value `reportedUnlessStrict` of `onFailure` (`proposal:s-7pk89t8z6wymmj9-g6`); validate.ts is to read that value as the proposal's `stage3` says.
12. **Stage 3, the tests:** the names of the tests at e2e/init.test.ts:112 ("naming the two it takes") and :159 ("for both agents") lose their counts. The test at :248 is rewritten for the new draft rule. The tests of `approve.test.ts`, `model.test.ts` and reindex.test.ts:205 are split between the four nodes on approvals, as each draft's `stage3` says.
13. **The continuation file:** the item "tools/3's 'both agents'" under "Found and owed" is resolved by this group.
14. **`.ai_docs/INDEX.md`:** the brief forbade touching it. The main session still has to add rows for `propose-group6.mjs`, `group6-notes.md`, `english-group6.md`, `tools-drafts.before-group6.json` and `briefs/t25-group6-brief.md`.
15. **The page of the group:** it is to show the two proposals, each beside the agreed wording of its base, as the rule "A change to an approved wording is proposed as a single, complete new wording" asks.
16. **Questions for the base specification, for the main session to record** (the brief of round b; the owner's rule "One part at a time"):
    - whether a node's kind is part of the wording that an approval covers (rule 1.3.5; review a, F4);
    - whether withdrawing a `TableRule`'s approval should also withdraw the approvals of the nodes in its cells, since rule 1.3.4 lets an owner approve them together (review a, W4);
    - a rule of the base on taking the method out, which `sheriff remove` would implement (review c, finding 1);
    - rules 1.3.3 (s-9g7jj8z4yf9kq93) and 10.3 (s-83ev4wwesbwnhnp) still say that an approval "stands"; "is in force" is the term of the appendix and of row 10.1.8, an English-only replacement when they next change (review a).
17. **The docs** (the reviewers' TERM notes; no node changes):
    - a fingerprint corresponds partly to OpenFastTrace's revision, which the author assigns instead of computing it (review a);
    - "an approval in force" and "approving the specification" correspond partly to a baseline (ISO/IEC/IEEE 29148, IREB), which covers a set of requirements and fixes a version (reviews a and b);
    - `reportedUnlessStrict` works like a warning that GCC's `-Werror` turns into an error, and `reported` like `-Wno-error=` (review d);
    - the keys `strict` and `extensions` of `sheriff.config.json` hold lists of entries, not a boolean and a list of names (review b).
18. **`.ai_docs/INDEX.md`:** the main session is also to add rows for `fix-group6-b.mjs`, `english-group6b.md` and `tools-drafts.before-group6-b.json`.
19. **"The judgement on a node of the technical appendix that a commit approves" (s-4bwa4zepd4nwcv8), agreed:** it calls a line of `specs/_approvals.jsonl` "an entry that approves the node". Group 6 makes "entry" the word for an entry of the settings in `sheriff.config.json`. The node is to read "a line that approves the node" when it next changes, an English-only replacement (review b-a).
20. **The page of the group:**
    - s-v4qus7raqnwzneb's example has no `change` note, since the approved node had no example. The page builder is to add «Новое: у одобренного узла примеров не было», as group 5's builder does. The same holds for the example of `proposal:s-gb8s9657a65hqmv-g6`, whose agreed base has none (review b-a);
    - the new entry in the `removed` field of `proposal:s-7pk89t8z6wymmj9-g6` is in English, as `removed` is in groups 3 to 5; the builder is to render it in Russian.
21. **`.ai_docs/INDEX.md`:** the main session is also to add rows for `fix-group6-c.mjs`, `english-group6c.md` and `tools-drafts.before-group6-c.json`, and for round d and the page: `fix-group6-d.mjs`, `english-group6d.md`, `tools-drafts.before-group6-d.json`, `build-group6-ru.mjs`, `group6-ru.json`, `group6-assessments.json`, `gen-group6-page.mjs` and `group6-page/index.html`.

## What was not touched

Nothing under `specs/`; no node outside the group in `specs/`; no draft outside the group, the agreed bases of the two proposals included, since each proposal is a new key beside its base; `.ai_docs/INDEX.md`, `tasks.md` and `t25-one-thought.md`.
