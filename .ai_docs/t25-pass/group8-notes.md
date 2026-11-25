# T25, stage 2, group 8: notes on the drafts of items 57 to 63

propose-group8.mjs copied `tools-drafts.json` to `tools-drafts.before-group8.json` and wrote the drafts of group 8 into `tools-drafts.json`. It also wrote `english-group8.md`, the English of every node of the group, for EngStickler's readers. The script was run twice and gave the same `tools-drafts.json` and `english-group8.md` both times. Only the fourteen keys of the group differ from the copy.

The script checks the following before it writes:
- every citation has its link, and every `cites` link has a citation or a decision of the node that cites its target;
- the Russian cites the same sids as the English, and the code in backticks is the same in both languages;
- every link target exists in `moved/`, `tools.json` or the drafts;
- the seven new sids have the form of a sid and are held by nothing in `specs/`, `moved/` or the drafts before the script;
- no citation by location outside backticks, and none of the phrases that the agreed drafts avoid ("carries", "stands", "the tools" alone, "counts as", "every other", `sheriff export`, `sheriff render`, `sheriff message` and others);
- every example names its most likely mistake;
- no agreed draft is changed, and no key outside the group differs from the copy.

After round a, the group held thirteen drafts of nodes of the appendix of the tools and one proposal of a new row of the main table of checks. Round b split the node on the skills into four, so the group now holds sixteen drafts and the proposal of row 10.1.37b. Ten of the sixteen are new nodes. Three questions are put to the owner, and, after round c, two questions are recorded for the base specification.

## Round f: one sentence of s-st6td4mua9uqt9z

fix-group8-f.mjs (from `tools-drafts.before-group8-f.json`, two runs identical) replaces round e's sentence on an invalid file, which read at first as "the edit to the checks", with the coordinator's wording: "A file of the specification that would be invalid JSON after the edit is left to the checks that run after the edit (§s-hcmpjmwtgfwzncu)." The Russian keeps its meaning and does not follow the English word for word, so it stays; `english-group8f.md` holds the one sentence, and nothing else is applied.

## Round e: the readers' last findings applied

fix-group8-e.mjs applies the findings of `english-g8d-fast.md` and `english-g8d-thorough.md` that `fix-brief-group8-e.md` lists, and only those. On its first run it copied `tools-drafts.json` to `tools-drafts.before-group8-e.json`; on every run it rebuilds the keys of the group from that copy and runs the checks of fix-group8-d.mjs. Two runs gave the same `tools-drafts.json` and `english-group8e.md`, and no key outside the group differs from the copy. Ten keys changed: s-477gtdrkw34dzxw, `new:tools-6-after-edit`, s-st6td4mua9uqt9z, s-4mej6ccn7xu3d3p, s-n4m5zvh96yb299p, s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4, `new:tools-15-skills`, `new:tools-15-spec-init` and `new:tools-15-spec-settings`. `english-group8e.md` holds only the sentences that the round changes, each under its key.

Each finding is applied in the words of the brief. The Russian changes only where the meaning changes: the questions in the chat in `spec-settings`, the file-editing tool in the example of the guard, the rule on the order in the reason of s-n4m5zvh96yb299p, the plugin from which `spec-init` runs, and the release with the same version in the reason of s-2pdy9gw2jrjvfb4. No `change` field needed a change, since each still compares the final wording with the approved one.

## Round d: the final review applied

fix-group8-d.mjs applies `review-g8c.md` and the readers' findings that `fix-brief-group8-d.md` names, with the main session's decisions in that brief. On its first run it copied `tools-drafts.json` to `tools-drafts.before-group8-d.json`; on every run it rebuilds the keys of the group from that copy and runs the checks of fix-group8-c.mjs. Two runs gave the same `tools-drafts.json` and `english-group8d.md`. Sixteen keys changed, all but `new:tools-6-hooks-on`, and no key outside the group differs from the copy. `english-group8d.md` holds the final English of the sixteen keys, each in full.

- **The final review.** P1, P2, N1 and its three nits, I1 and its nit, S1 and the nits on the ready drafts are applied in the words of the report. In s-477gtdrkw34dzxw, the item on the hook that runs when a session starts now says that the hook "updates the copy of the SpecSheriff tools that the plugin for Claude Code keeps", since the plugin for Codex CLI keeps no copy (s-4mej6ccn7xu3d3p). In `new:tools-6-pre-commit`, "The hook itself leaves git's index as it is" replaces "The hook itself stages nothing", and the part's `change` says that this is the owner's ruling of 2026-10-31 worded positively.
- **The readers.** Every finding that the brief lists is applied, with one change of wording: "the two being compared as semantic versions" is written "the versions being compared as semantic versions", since "the two" is a count in prose, which the script refuses. "The plugin declares the following agent's hooks to Claude Code:" drops the citation of s-477gtdrkw34dzxw, as the reader words it; the item on the scripts of the agent's hooks still cites that node, so the link stays.
- **The change field on the refusal where Node.js is missing** (s-4mej6ccn7xu3d3p) said that the question had been recorded for the base. Round a's question 1 left that list, since the page shows the refusal and why the draft drops it, so the sentence now reads «Ваше согласие с группой решает и это.».
- **The change fields that the page shows.** Found while the page was built: four referred to items of the notes of groups 2, 3 and 6, one to the continuation file, and the title's change of s-4mej6ccn7xu3d3p quoted "careful native writer". Each now says what it refers to: the agreement to that group, the step of T25, and why "that" was added.
- **The questions.** Options 1B, 2B and 3B gain a "Risk:" line, and question 2's quotation under B follows the item as round c worded it. The page asks the same.

## Round c: the follow-up review applied

fix-group8-c.mjs applies `review-g8b-a.md` to `review-g8b-d.md` and the readers' findings that `fix-brief-group8-c.md` names, with the main session's decisions in that brief. On its first run it copied `tools-drafts.json` to `tools-drafts.before-group8-c.json`; on every run it rebuilds the keys of the group from that copy and runs the checks of fix-group8-b.mjs. Two runs gave the same `tools-drafts.json` and `english-group8c.md`. Only the seventeen keys of the group differ from the copy. No node is added. `english-group8c.md` holds the final English of all seventeen keys, each in full.

### The main session's decisions

1. **"The hook that runs when a session starts"** replaces "the hook run when a session starts" in every draft, and «хук, который запускается при начале сессии» every Russian form; the script makes the English change in every part, reason and example, and refuses no form of it.
2. **The `pre-push` item of "The hooks":** "then compares the working tree with each commit that the tests judge (§s-8a5eyy5n5hnsgrs), and runs the tests (§s-b6qdtghnyha3fhk) only where it refuses nothing at that comparison".
3. **What a rule says holds.** Besides R1 and A3, these negative statements became positive:
   - the pre-commit hook: "A failure of `sheriff markdown` or `sheriff map` to write its files is reported, and the hook judges the commit by its other steps alone";
   - the guard: "It builds in memory each file …" for "… without writing it to disk", "would be invalid JSON after the edit" and "is read as if each of those lists were empty";
   - the agent's hooks for Codex: "it calls the plugin's script … only where it finds the plugin" for "Where a hook finds no plugin, it does nothing", and "The scripts run only in a repository whose root holds `sheriff.config.json`";
   - the git hook's lookup: "The plugin for Codex CLI keeps its SpecSheriff tools only in its directory in Codex's cache" for "keeps no copy";
   - the plugin for Codex CLI: "The agent's hooks for Codex are only in the project" (review g8b-d, 2.1);
   - the push: "Otherwise, where it refuses nothing, it runs the tests".

   These negative forms stay, since each is the only exact one:
   - the conditions of a refusal, such as "while no approval of that node's wording is in force", "while no test of the system's code declares that rule's SpecTag", "cannot read or apply the patch" and "where the hook finds the tools of neither plugin": they state when the refusal or the fallback happens;
   - what a message says, such as "the git hooks that `sheriff init` writes do not run" and "the SpecSheriff tools ran no check";
   - git's own terms, "a file … that git does not track";
   - "The hook itself stages nothing", the owner's ruling of 2026-10-31, which also leaves room for the project's own tools that rewrite files to stage;
   - "unless one of the project's own tools fails", the words of rule 10.12;
   - "for which it runs nothing" and "has failed" in the node on the project's own tools, in the reviewer's and the reader's words;
   - the reasons' "no check runs on a commit" and "cannot report that it was skipped", which name the problem that the rule solves.
4. **The `implements` links of the skills.** The agreed s-yprj7d6tnvauggr (row 10.1.23) refuses a node of the appendix of the tools, other than a section, that has no `implements` link to a rule of the SpecSheriff guidelines or of an extension. So s-kq6wmdud9c7j2k9 and s-jn3rauw6a8zeefn keep their link to 2.5 (s-bsya3febm6u64ab), the nearest rule, and their `stage3` says so. Question 2 for the base specification is added as review g8b-d words it.
5. **Codex's public directory.** Codex's documentation on building plugins says: "Plugins containing lifecycle hooks aren't eligible for the public plugin directory", and "Lifecycle hooks are supported for plugins installed manually in Codex desktop" (developers.openai.com/codex/plugins/build, read 2026-11-25). Its documentation on hooks says that enabled plugins can supply bundled hooks, which the user reviews and trusts before they run, and that a plugin update that changes a bundled script needs a new review (learn.chatgpt.com/docs/hooks, read 2026-11-25). So the approved reason still holds, and it is back in the reason of s-n76wt2bkqdmh78x: "Codex's public plugin directory admits no plugin that contains hooks, so the agent's hooks for Codex are in the project." The `reasonChange` of s-n76wt2bkqdmh78x and of s-2pdy9gw2jrjvfb4 name what was kept, moved and dropped. No todo is added.
6. **The todo on s-kq6wmdud9c7j2k9** reads "`spec`, `spec-review` and `spec-adopt` are to be described in nodes of their own; no node describes them yet."
7. **Questions 2 and 3** in the notes are reworded below.
8. **Codex's `block` answer** after a shell command: recorded in the `stage3` of s-n76wt2bkqdmh78x for the release rehearsal.

### Review g8b-a

- H1: applied, with the reader's "of their own".
- H2: applied, with a `cites` link to s-a8fn72xa782wvbk.
- H3: applied.
- H4: applied in decision 2's wording.
- P1: applied, with the reader's "replacing whatever is at the same path".
- P2: applied.
- P3: left as it is, as the reviewer says.
- N1: applied in the `change` field.

### Review g8b-b

- H1, the lead of the list of git hooks: applied, with its `change`.
- H2: the `stage3` of s-477gtdrkw34dzxw copies the decision of 2026-10-30 to s-jgcveum8dwdnyzr too.
- The Russian word order of the reason of s-jgcveum8dwdnyzr: applied, with the reader's English "leaves it to the author of the next commit to record a git hook's mode".
- R1: applied.
- The nit on the runner: applied, with the reader's "would use there", and "uses for it".
- The nit on the reason: "the settings of each runner".
- A1, A2 and A3: applied.
- A4: applied; s-4kd2pave7vm4hmd and s-9kfdycuq34beqvs are in `keptForDecisions`, and the `stage3` of s-477gtdrkw34dzxw names the two decisions of 2026-11-05 that it copies.
- The nit on `location`: applied.
- G1, G2 and G3: applied; the condition on a draft is in the lead, and the last sentence is deleted.
- G4: applied to both `change` fields.
- The nit "as the SpecSheriff tools find": applied.
- The nit on question 2: applied (decision 7).

### Review g8b-c

- A: applied; the sentence on the file `agent` is in the lead of the list of answers.
- B: applied, item 1 as "of each plugin".
- C: applied.
- D: applied.
- E: applied in s-477gtdrkw34dzxw.
- F: applied to the three `change` fields.
- The note on `block`: decision 8.

### Review g8b-d

- 1.1: applied.
- 1.2: applied to the `reasonChange`.
- 1.3: applied: the reason's last sentence, the example's `specs/_guidelines/extensions/`, and the Russian name of the hook.
- 2.1: applied.
- 2.2: decision 5.
- 2.3: applied, as "at the root of the repository where the SpecSheriff guidelines are written, which also holds the marketplace for Claude Code".
- 3.1 and 3.2: applied.
- 4.1: applied, with the reader's "asks before that run".
- 4.2: applied.
- 4.3: applied to the `stage3` of both skills.
- 4.4, the example: applied.
- 5.1: applied.
- 5.2: decision 4; question 2 for the base specification below.
- 6.1: applied, with the reader's "which an owner who works remotely does not have".
- 6.2: applied.
- 6.3: applied; the window comes first.
- The rewording of question 3: decision 7.

### The readers' findings

Every finding that `fix-brief-group8-c.md` lists is applied, in the drafts where it occurs. "A pair of values under one key" became "a key written more than once whose values it cannot merge", in the words of the agreed s-w5wg69pvvhedsws, which merges such values and refuses those it cannot merge. What `sheriff guard` reads from a patch follows patch.ts: it takes the path of each file from the patch and reads from disk each such file other than one that the patch adds. The script now accepts "one of the two", which the reader's wording for the push needs, and still refuses "the two" elsewhere. The findings that the brief does not list are not applied, for the reasons that it gives.

## Round b: the first review applied

fix-group8-b.mjs applies `review-g8-a.md` to `review-g8-d.md`, `english-g8-fast.md` and `english-g8-thorough.md`, with the main session's decisions at the end of each report and in `fix-brief-group8-b.md`. On its first run it copied `tools-drafts.json` to `tools-drafts.before-group8-b.json`; on every run it rebuilds the keys of the group from that copy. It runs the checks of propose-group8.mjs, and also refuses "at a commit", "at a push", "the session start", "each other", "noted", "these hooks" and "only once" in the English of a draft. Two runs gave the same `tools-drafts.json` and `english-group8b.md`. Only the fourteen keys of the group and the three new keys differ from the copy.

**Keys changed:** all fourteen keys of round a. **Keys added:** `new:tools-15-spec-init` (s-ttsc8tpnu46q53s), `new:tools-15-spec-remove` (s-jn3rauw6a8zeefn) and `new:tools-15-spec-settings` (s-h343yq2mua648eg). The new sids were generated with the alphabet of rule 1.2.2, and the script checks that nothing in `specs/`, `moved/` or the drafts holds them.

`english-group8b.md` holds the final English of all seventeen keys, each in full.

The sections after this one describe round a. Where round b changed a node, this section says how, and it prevails. The table of keys gains the three nodes of round b: `new:tools-15-spec-init` (s-ttsc8tpnu46q53s), "The skill `spec-init`", tools 15b, implements 1.6.2; `new:tools-15-spec-remove` (s-jn3rauw6a8zeefn), "The skill `spec-remove`", tools 15c, implements 2.5; `new:tools-15-spec-settings` (s-h343yq2mua648eg), "The skill `spec-settings`", tools 15d, implements 1.7.5. `new:tools-15-skills` now implements 2.5, and `new:tools-6-reviewer-settings` is titled "The settings of each runner when a session starts".

### The main session's decisions that change the drafts beyond the reports

1. **"On a commit" and "on a push"** in every draft of the group; the script refuses "at a commit" and "at a push".
2. **"The hook run when a session starts"** is the one name of that hook. "The session start" is never the subject of a verb; the script refuses the phrase.
3. **The skills node is split into four:** s-kq6wmdud9c7j2k9 keeps the list of the skills, the sentence on the model and the reasoning effort, the decisions of 2026-11-02 (the part on the skills' model) and of 2026-11-03 (the names of the skills), and a todo for `spec`, `spec-review` and `spec-adopt`. `spec-init` (implements 1.6.2, s-m4h279nbaqkpa3t, as review g8-d says; carries the decision of 2026-11-02), `spec-remove` (implements 2.5, s-bsya3febm6u64ab, since review g8-d names no rule for it and rule 2.2 requires one; the approved reason) and `spec-settings` (implements 1.7.5, s-9ttvcwpqkehm58g; carries the owner's ruling of 2026-11-18) each have a node. The decisions are kept in each new draft's `proposal.meta.decisions`, and the script checks their links like those of an approved node.
4. **`spec-init`'s steps (option A of question 3):** the agreed s-7unxytshhc4md54 leaves `code` and `tests` empty and writes no `testCommand`, and only says how to set them. The node of `spec-init` therefore states the question about them, as step 4 of its SKILL.md does. No agreed node requires the skill to commit, so `stage3` removes step 7 from SKILL.md. `stage3` also removes step 6, the offer to approve the rule "The specification is approved", which `project.json` no longer holds (s-7unxytshhc4md54); an owner approves the specification with `sheriff settings` (s-chsfpkgpmfk4fft). The todo on s-kq6wmdud9c7j2k9 records the three skills that no node describes.
5. **Review g8-c's A6** is in the draft of `s-st6td4mua9uqt9z`: only an edit made with `Edit` or `MultiEdit` is left to the tool to refuse, so the guard and the node on Codex agree on a patch that cannot be applied.
6. **The three questions for the owner** are below, under "Questions for the owner". The drafts assume answer A to each.
7. **Base question 1** (Node.js missing) leaves the list for the base specification: the page shows in Russian the refusal that the approved node had and why the draft drops it, so the owner's agreement to the group settles it. Base questions 2 and 4 are questions 1 and 2 for the owner. Base question 3 stays.
8. **Found and owed:** rule 10.2 names only the tests on a push, while rule 10.12 and row 10.1.37b also check the project's own tools on a push. Recorded under "Changes still needed outside the group".

### Review g8-a

`s-477gtdrkw34dzxw`:
- 1.1, the opening sentence: applied. The hooks do not run the checks before the approval of the specification, which `sheriff settings` runs.
- 1.2, the `pre-commit` item: applied; it also cites the project's own tools, so "the tools that rewrite files" no longer appears uncited.
- 1.3: applied as "They run `sheriff types` and the checks there", since `sheriff markdown` and `sheriff map` run in the working tree.
- 1.4: applied, in the thorough reader's form "Each check run by the pre-commit hook, the commit-msg hook or the agent's hook after an edit".
- 1.5, the settings of the reviewer's runner: applied, with a `cites` link to s-tnz9zgqx8c629a7.
- 1.6: applied; the node on how each check is made is the section s-4kd2pave7vm4hmd.
- 1.7: applied with the thorough reader's change: "The hooks that the repository keeps and those that the plugin for Claude Code declares".
- 1.8, the Russian: applied.
- 7.2.7: "the commit being made" is explained in the sentences that follow its first use, which is now in the paragraph on what a check reads; "the tools that rewrite files" no longer appears in this node.

`new:tools-6-pre-commit`:
- 2.1, the order against "right after the first step": question 1 for the owner. The draft keeps option A.
- 2.2: applied; it also settles the fast reader's finding that the verb has no object.
- 2.3: applied. `sheriff validate`, `sheriff binding` and `sheriff citations` cite the agreed sections that describe their checks (s-6uqu6vn5fnp7fwb, s-p34692nwceaxq2p, s-bgegrkhrgpefs69). The project's own guidelines cite s-u7tw6m8npxmv5tu, and the project's own checks cite s-2fau85dfyyeq66m beside s-7pk89t8z6wymmj9. The last paragraph reads as the main session's decision says.
- 2.4: applied, with "names it as a file for the author to stage" and the fast reader's "The checks therefore read each such file as it is staged".
- 2.5, "in its final form": applied, with the fast reader's "the tools that rewrite files" and "On every commit".
- 2.6, the links for the decisions that stage 3 copies here: applied. The draft's `keptForDecisions` names s-bpdqd9v72wg7vsz, s-sn6au3vcr9uy5pm, s-hr7j7scmfkkjnws and s-jau82aq9juv9zzh, and the script keeps their `cites` links.

`new:tools-6-push-compare`:
- 3.1: applied. It replaces the readers' changes to the same sentences and drops the sentence on a draft.
- 3.2: applied, with the fast reader's "Where it does not refuse the push".
- 3.3: applied: "a file in the working tree that git does not track".

### Review g8-b

`new:tools-6-hooks-on`:
- The reason: applied, with "the hook run when a session starts" and the thorough reader's "cannot report that it was skipped" and "the author of the next commit".
- `core.hooksPath` in the repository's git configuration: applied.
- "It leaves the mode of each file and git's index as they are": applied.
- The cut of "which run by the interpreter that their first line names": applied; s-n4m5zvh96yb299p states it.

`new:tools-6-reviewer-settings`:
- Whose hook asks: applied. Its first paragraph reads "In Claude Code, the hook run when a session starts …", and its second "the agent's hook run when a session starts (§s-477gtdrkw34dzxw), in Claude Code or in Codex CLI".
- The object of `review.runner`: applied, with the thorough reader's "the runner of the agent whose plugin's SpecSheriff tools the git hooks would take there".
- The title: "The settings of each runner when a session starts"; "The hooks" says "the settings of each runner".
- Paragraph 3: applied, merged with the fast reader's change.
- The example: applied, with "the hook run when a session starts".

`new:tools-6-after-edit`:
- The `sheriff reindex` item: applied, with the thorough reader's order "`sheriff.config.json`, a file under `specs/`". The link to s-zefk589ykh37b8u is dropped, and one to s-8xw4mgvpexyvw5q added.
- When nothing is recorded: applied.
- The `sheriff types` item: applied; the `sheriff markdown` and `sheriff map` item opens with the commands and states its condition in full, as the fast reader asks.
- When `sheriff reindex` refuses: applied, naming two of its refusals with citations (s-w5wg69pvvhedsws, s-xzcw3hv4hmxz7h7).
- What the hook hands the agent: applied, as "the refusals of `sheriff reindex`, of `sheriff types` and of the checks".
- A failure of the views: applied.
- The moment that is recorded: applied.
- The cut: applied, with "the agent's hook (§s-477gtdrkw34dzxw)" in the first sentence; the three checks cite their sections.
- The example: applied.
- The `stage3` note: applied; the files read for SpecTags are those of "Project-wide settings".

`s-st6td4mua9uqt9z`:
- Base question 4: question 2 for the owner. The draft keeps option A.
- The bare sid: applied, with a `cites` link to s-gb8s9657a65hqmv.
- The version in the refusal for a missing extension: applied.
- Reason sentence 2: applied.
- "would leave other than valid JSON": applied as "that would not be valid JSON after the edit".
- The term "runner": not applied, as the main session decided.

### Review g8-c

`s-n76wt2bkqdmh78x`:
- A1: applied. The `change` says that the owner's ruling of 2026-11-02 still requires the answers in JSON, and what changed in Codex since then.
- A2, the reason: applied, with "only after" for "only once", as the owner's English writes it.
- A3, A4 and A5: applied.
- A6: applied in `s-st6td4mua9uqt9z`.

`s-4mej6ccn7xu3d3p`:
- B1: applied, with the fast reader's "the SpecSheriff tools ran no check"; `stage3` says that the git hook checks Node.js against `engines.node`.
- B2, B3 and B4: applied.
- The Node.js point: settled by the page, as decision 7 says.

`s-n4m5zvh96yb299p`:
- C1: applied, in the thorough reader's form "each path in the project's list of tools that rewrite files".
- C2: applied as "names any other file there".
- C3: applied, with the fast reader's "with the interpreter" and "in the environment that git gives the hook", and "exits with a code other than zero".
- C4: applied; the sentence on a draft is in the lead-in of the refusal, as the thorough reader asks.
- C5, C6 (with the sentence on the first line kept) and C7: applied.

`proposal:row-10-1-37b`: the thorough reader's two changes are applied.

### Review g8-d

`s-zh2vcr3xjumppg5`:
- 1.1 and 1.2: applied. `plugin.json` confirms that each option's description names the default ("Default: opus").
- 1.3 and 1.4: applied.
- 1.5, the reason: applied, with "all of one release" and "the agent in every clone".
- The thorough reader's "keep the plugin's copy … up to date" and "as the plugin's options": applied.

`s-2pdy9gw2jrjvfb4`:
- 2.1 to 2.4: applied, with both `cites` links.

`new:tools-15-skills`:
- 1, the split: applied (decision 3).
- 2: applied, with `cites` links to both plugin nodes and to the three new nodes.
- 3: applied in the node of `spec-init`, with the fast reader's "offers the user the setting's default" and "writes the user's answer with `git config --global`".
- 4: applied in the node of `spec-settings`, with the fast reader's "a separate terminal window".
- 5: applied, with "run with the model and the reasoning effort that the user has chosen in the session"; the Russian says «effort».
- 6: applied in `stage3` and in the decisions of the new nodes.
- 7: question 3 for the owner; the drafts assume option A (decision 4).

### The readers' findings

Every finding of `english-g8-fast.md` and `english-g8-thorough.md` under "Applied" is applied, as the sections above say, except where a reviewer's sentence replaces the sentence and the reader's phrase no longer fits:
- the fast reader's split of the first list item of the plugin for Claude Code: review g8-d's 1.1 replaces the item;
- the fast reader's "even where another has failed": review g8-c's C3 gives "regardless of what the others find";
- the thorough reader's "so it reads": review g8-c's C3, by the main session's decision;
- the thorough reader's "one of the tools that the project's own guidelines do not list as tools that rewrite files": review g8-c's C4 gives "one of the project's own tools that runs after the tools that rewrite files";
- the thorough reader's "That file is beside …" and the reason of the plugin for Codex CLI: review g8-d's 2.3 and 2.4 replace them;
- the thorough reader's "; this includes": review g8-a's 3.1 replaces the item;
- the thorough reader's "The script that runs when a session starts names": written as "The hook run when a session starts names", the one name of that hook (decision 2).

No finding was rejected for only asking for more context.


## The keys

| Item | Key | Title | Implements |
|---|---|---|---|
| 57 | `s-477gtdrkw34dzxw` | The hooks | 10.2 (s-epaw9sgyaajzn8g) |
| 57 | `new:tools-6-pre-commit` (s-npnmwyt6s3gypwe) | The pre-commit hook | 10.12 (s-pcnyfp7gev7syax), 10.14 (s-kh8qcd5kxgh9z3j) |
| 57 | `new:tools-6-push-compare` (s-8a5eyy5n5hnsgrs) | The working tree compared with what a push sends | row 10.1.44 (s-aufnqn6t7y2me7a) |
| 57 | `new:tools-6-hooks-on` (s-jgcveum8dwdnyzr) | Turning the git hooks on when a session starts | 10.2 |
| 57 | `new:tools-6-reviewer-settings` (s-p29yawkkkgk7kxb) | The reviewer's settings asked for when a session starts | 1.6.2 (s-m4h279nbaqkpa3t) |
| 57 | `new:tools-6-after-edit` (s-hcmpjmwtgfwzncu) | The agent's hook after an edit | 10.2, 10.14 |
| 58 | `s-st6td4mua9uqt9z` | An edit judged before it is made | 10.3 (s-83ev4wwesbwnhnp) |
| 59 | `s-n76wt2bkqdmh78x` | The agent's hooks for Codex CLI | 10.3, 10.2 |
| 60 | `s-4mej6ccn7xu3d3p` | A git hook runs the SpecSheriff tools that a plugin keeps on the machine | 10.12, 2.5 (s-bsya3febm6u64ab) |
| 61 | `s-n4m5zvh96yb299p` | The project's own tools in a git hook | 10.12, row 10.1.37b (s-yn5tdx2bp4f5rq7) |
| 61 | `proposal:row-10-1-37b` (s-yn5tdx2bp4f5rq7) | row 10.1.37b of the main table of checks | checks 10.12 |
| 62 | `s-zh2vcr3xjumppg5` | The plugin for Claude Code | 2.5, 1.7.1 (s-mbmnsnxenmavu3z), 10.3 |
| 63 | `s-2pdy9gw2jrjvfb4` | The plugin for Codex CLI | 2.5, 1.7.1 |
| 62–63 | `new:tools-15-skills` (s-kq6wmdud9c7j2k9) | The skills of the SpecSheriff plugins | 1.7.5 (s-9ttvcwpqkehm58g), 1.6.2 |

The locations are tools 6 (the hooks), 6a to 6e (the five new nodes split from it, in the order of the table), 7.3.2, 12, 13, 14, 15 and 15a (the new node on the skills). Following group 7, the split nodes are placed after the node that they come from, and no section is made. The new sids were generated with the alphabet of rule 1.2.2 and checked against `specs/`, `moved/` and `tools-drafts.json`; the script checks them again on every run. Every other sid is checked by the script as a link target.

## Decisions that apply to the whole group

- **"The hooks" is split, and keeps its sid as the list of the hooks.** The approved node held at least six procedures, each of which can be carried out without the others (rule 7.3.3). The agreed drafts cite s-477gtdrkw34dzxw for "the pre-push hook", "the agent's hooks", the directory of the staged files and `sheriff reindex` after an agent's edit. The node now lists every hook and names the node that describes it, as the list of commands does for the commands, so each of those citations still holds. It also keeps the paragraph on the directory of the staged files, which s-7pk89t8z6wymmj9 cites, and says what a check reads, as the list of changes of the main table, accepted on 2026-11-11, asked.
- **Which rules the nodes implement (questions X1 and X2).** No node of the group implements the main table of checks as a whole. "The hooks" implements rule 10.2 "When the checks run" (s-epaw9sgyaajzn8g), which no node of the appendix implemented. The guard implements rule 10.3. The pre-commit hook and the hook after an edit implement rule 10.14. The comparison before a push implements row 10.1.44, as part of how its check is made. `moved/impl.json` maps no row to any node of the group, so it needs no change, except the new row 10.1.37b.
- **Renamed commands.** `sheriff markdown`, `sheriff map` and `sheriff commit-message` replace `sheriff export`, `sheriff render` and `sheriff message` (the owner's ruling of 2026-11-21 and the agreed list of commands). The script refuses the old names.
- **The Views extension.** The hooks run `sheriff markdown` and `sheriff map` only where the project has chosen the Views extension, as the owner's answer A to the second question of group 7 says.
- **Draft or approved.** The guard and the refusal of row 10.1.37b say "regardless of whether the specification is approved or a draft"; neither rule 10.3 nor the new row makes an exception. The comparison before a push says that a commit that leaves the specification a draft is never compared, since s-b6qdtghnyha3fhk runs no tests for it. The other nodes describe procedures, not checks.
- **Citations at first use (rule 7.2.7).** When the checks run (10.2), the order of tools and checks (10.12), the project's own guidelines (s-t9j29hppag2nren), the project's own checks (10.8) and generators (10.9), the model's check of keys (s-7zqsstgnuc772ba) and of the schema (s-xzcw3hv4hmxz7h7), the Views extension (13), the chosen extensions (1.7.5), the files of the plugin (2.5, s-zefk589ykh37b8u), wording (1.3.5), approval status (1.3.1), an approval in force (s-v4qus7raqnwzneb), a rule's code (1.5.2, s-5z5gnu7pahr82xp), the system's code (9.1), a test's SpecTag (s-zrsc6asgmhv8tnc), the entries of the owner's settings (s-d3nkw9b6mn98vuw), location (8.5), `TableRule` (8.6), the settings of each runner (s-tnz9zgqx8c629a7), the runner (s-xr5xxa9cxf2mq5u).
- **Words.** "refuses", "is in" for where a file is, "holds" for what a plugin contains, "only after … have passed", "regardless of whether", "the SpecSheriff tools", never "the tools" alone except "the tools that rewrite files", the phrase of rule 10.12. No "carries", "stands", "counts as", "every other" or "the two". The two plugin nodes lose "carries everything its work needs" from their titles. In Russian: «отвергает», «ответственный», «стейджинг», «хуки агента», «git-хук», «рабочее дерево», «описание инструментов», «skill», «runner».
- **Kept links.** The decisions stay on their nodes, so each `cites` link to a sid that a decision of the node cites is kept: on s-477gtdrkw34dzxw to s-bpdqd9v72wg7vsz, s-sn6au3vcr9uy5pm, s-hr7j7scmfkkjnws, s-jau82aq9juv9zzh, s-kh8qcd5kxgh9z3j, s-xr5xxa9cxf2mq5u and s-9kfdycuq34beqvs; on both plugin nodes to s-xr5xxa9cxf2mq5u.

## The changes owed to group 8 by groups 1 to 7, and how they were made

- **Group 7, items 1 and 10:** the hooks run `sheriff markdown` and `sheriff map` only where the project has chosen the Views extension (s-npnmwyt6s3gypwe, s-hcmpjmwtgfwzncu). `sheriff types` also writes the bindings file: the pre-commit hook writes each file that `sheriff types` writes into the working tree, the bindings file among them, and stages none. Whether the hooks redraw the diagram of the domains waits for the command of task T29, as the brief says; nothing in the drafts anticipates it.
- **Group 6, item 8:** the guard refuses an edit that adds, changes or removes an entry in `approvalStatus`, `strict` or `extensions` of `sheriff.config.json`, the lists that s-d3nkw9b6mn98vuw defines.
- **Group 6, item 9:** "The hooks" does not describe the run of the checks before an approval; s-m59dqwkw2e96wne does.
- **Group 6, item 10:** the skill `spec-settings` ships in this release. The owner decided on 2026-11-18 that it will be made («да скилл делаем»), and the continuation file says that it is described in the appendix in this step of T25. It is listed in the new node on the skills (s-kq6wmdud9c7j2k9).
- **Group 4, round b item 4, round c item 1, round d item 1, and the changes still to be made, item 1:**
  - at a commit, `sheriff validate` runs before `sheriff binding` and `sheriff citations`, and those two run only after the check for a key written more than once and the validation against the schema have passed (s-npnmwyt6s3gypwe);
  - `.githooks/commit-msg` runs `sheriff commit-message`; the owner answered A on merge commits, so it runs on every commit;
  - after an agent's edit, no report of a node whose tests or code lag behind it: the hook runs `sheriff validate`, `sheriff binding` and `sheriff citations`, and that check moved to `sheriff commit-message`;
  - the pre-push hook runs the tests as s-b6qdtghnyha3fhk says, and compares the working tree only before a push for which it runs them (s-8a5eyy5n5hnsgrs);
  - row 10.1.37b is proposed (`proposal:row-10-1-37b`), as the change field of the agreed row 10.1.37a said it would be;
  - the project's other own tools leave the files of the working tree as they were, except those that git ignores, and what is staged and the message (s-n4m5zvh96yb299p);
  - review d's question, whether the pre-push hook compares the working tree with the commit of a ref that does not meet the conditions of s-b6qdtghnyha3fhk: settled as "no", since the tests do not judge that commit (see the draft below).
- **Group 3, item 8:** the guard refuses every edit while the installed plugin lacks a chosen extension, citing s-mhsb6fjsq5xn6c9.
- **Group 2, item 7:** the plugins and the new node on the skills cite s-tnz9zgqx8c629a7 for the settings of each runner, and s-p29yawkkkgk7kxb, which records the mark that the runner has been asked, in place of s-xr5xxa9cxf2mq5u.
- **The continuation file:**
  - "tools/6's reason is narrower than its rule: the project's generator code also triggers the derived files": the hook after an edit runs `sheriff types` where the code of a project's own generator differs, and its reason no longer says when the regeneration runs;
  - "A check reads the commit being made, because judging anything else would pass or refuse what is not being committed" is the first sentence of the reason of "The hooks", as the list of changes of 2026-11-11 says;
  - the pre-push hook no longer refuses a push without `testCommand` where the project's own guidelines do not name a push: s-b6qdtghnyha3fhk settles it, and the comparison runs only where the tests run;
  - the hook after an edit rebuilds `meta.code` and `meta.tests` after an edit to code or tests alone, since `sheriff reindex` writes them;
  - the plugin nodes list the extensions of the guidelines, their schemas and the appendix of the tools among what each plugin holds.
- **The inventory:** the report of the nodes that `sheriff reindex` makes a draft no longer names a domain's header; the pre-commit hook runs the project's own tools and `sheriff types` before the checks of the SpecSheriff guidelines (rule 10.12).

## The drafts

### Item 57: `s-477gtdrkw34dzxw` — "The hooks"

Location tools 6, unchanged. Implements 10.2. The node lists the git hooks and the agent's hooks, each with what it runs and the node that describes it, keeps the directory of the staged files, and says what a check that these hooks run reads.

How the questions were settled:
- **`sheriff review` only after `sheriff commit-message` has passed:** the owner's ruling of 2026-11-05, which was in the node's decisions only.
- **What a check reads:** the list of changes of the main table, accepted on 2026-11-11, moved this from table 10.1 to this node. The approval procedure is left out, since it is not a hook's run (group 6, item 9).
- **The todo of 2026-10-28** stays on the node, with `sheriff markdown` and `sheriff map` named.

Stage 3: see the draft's `stage3`. The decisions stay on the node, and those that concern a part now in a new node are copied there.

### Item 57: `new:tools-6-pre-commit` (s-npnmwyt6s3gypwe) — "The pre-commit hook"

Implements 10.12 and 10.14.

How the questions were settled:
- **The order** is rule 10.12's: the project's own tools that rewrite files, then `sheriff types`, then the project's other tools and the project's own checks, then the other checks of the SpecSheriff guidelines.
- **Whether the hook stages what step 1 writes.** Settled by the owner's ruling of 2026-10-31 on this node, "What a commit holds is its author's choice, so the hook stages nothing", which rule 10.12 does not contradict: it says that rewriting tools run first, not who stages their output. So:
  - a project's own tool that rewrites files runs in the working tree, as s-n4m5zvh96yb299p says, and may stage what it rewrites, by the project's choice, since the project's own guidelines, which an owner approves, list it;
  - the hook writes what is staged out to its directory only after those tools have run, so that the checks read the commit as it will be made;
  - `sheriff types` generates from the staged nodes, and the hook writes what it writes into the working tree, not into that directory. The checks read the copies as they are staged, so the check of generated copies (row 10.1.39a, s-dbk2vyeg8z5jxna) refuses a commit whose copies lag, as it did before. The example shows this.
  This keeps rule 10.12's purpose: no commit passes in any form other than the one that every check has read.
- **`sheriff binding` and `sheriff citations` after a refused key.** Rule 10.12, as agreed in group 4, runs the other checks only after the two checks of structure have passed. The node states the condition; how the hook learns that `sheriff validate` stopped there, such as an exit code of its own, is left to stage 3.
- **The place of the project's other tools.** They run after `sheriff types` and before `sheriff validate`. See question 2 for the base specification.

### Item 57: `new:tools-6-push-compare` (s-8a5eyy5n5hnsgrs) — "The working tree compared with what a push sends"

Implements row 10.1.44. The node opens with what it refuses and what the refusal names.

How the questions were settled:
- **Which commits are compared** (group 4, review d): only those that the tests judge, that is, each commit to which the push creates or updates a ref and that meets both conditions of s-b6qdtghnyha3fhk. The owner's ruling of 2026-10-31 compared the working tree with what a push sends, because "a test run judges a commit only where the files it reads are those the commit holds". A commit that the tests do not judge needs no comparison. The approved node compared every ref, so a push of two branches with different commits was always refused.
- **The two cases "only in one of them" and "in the working tree without having been added"** are one case, so they are one item, the second named as an instance of the first.

### Item 57: `new:tools-6-hooks-on` (s-jgcveum8dwdnyzr) — "Turning the git hooks on when a session starts"

Implements 10.2. Unchanged in meaning; the node adds that the hook runs only in a repository whose root holds `sheriff.config.json`, what it says where `core.hooksPath` names another directory, and that it does not name the project's own tools, as the code and the tests do.

### Item 57: `new:tools-6-reviewer-settings` (s-p29yawkkkgk7kxb) — "The reviewer's settings asked for when a session starts"

Implements 1.6.2, as the agreed node on the settings of each runner (s-tnz9zgqx8c629a7) does. Unchanged in meaning; the node says which runner the question is about (`review.runner`, or else the runner of the tools that the git hooks would take, as session-start.sh finds it), and that the mark holds `true`. It does not restate what s-tnz9zgqx8c629a7 says about writing only a value the user gives.

### Item 57: `new:tools-6-after-edit` (s-hcmpjmwtgfwzncu) — "The agent's hook after an edit"

Implements 10.2 and 10.14.

How the questions were settled:
- **`sheriff reindex` after an edit to code or tests alone.** The agreed s-ztseyetus7np6br has `sheriff reindex` write `meta.code` and `meta.tests` from the SpecTags in code and tests, and the agreed s-t383grkn3q68dpf refuses lists that differ. So `sheriff reindex` runs where a file in which the SpecSheriff tools look for SpecTags differs, as the continuation file asked. The owner's ruling of 2026-11-05 to run the regeneration only where something it reads changed is kept: a change to the documentation alone still runs only the checks.
- **`sheriff markdown`, `sheriff map` and `sheriff types`** run where `specs/` or `sheriff.config.json` differ, or where `sheriff reindex` wrote a file, since a list it rewrites is part of the export.
- **A failure of `sheriff reindex`** stops the hook, as the code does; a failure of `sheriff markdown` or `sheriff map` no longer does, as at a commit (stage 3).
- **What reaches the agent:** what `sheriff types` and the checks refuse, and each node that `sheriff reindex` makes a draft, without the exception for a domain's header (the inventory). How Claude Code and Codex receive it is said here and in item 59.

### Item 58: `s-st6td4mua9uqt9z` — "An edit judged before it is made"

Location tools 7.3.2, unchanged. Implements 10.3 only. The node opens with the four refusals, then says what each refusal names.

How the questions were settled:
- **The refusal of the code of a project's own check or generator without a test** is removed, with the `implements` link to rule 10.10: the owner removed those requirements from rule 10.10 on 2026-11-13, and rule 10.3 no longer lists the refusal (the inventory).
- **The kinds of rule** whose code needs a test are those that the agreed s-5z5gnu7pahr82xp lists, as rule 10.3 requires ("including a rule of a project's own kind"); the code checked only `TextRule`. Only the system's code is held to it, as row 10.1.31's node s-8wp7xm7g3u8gscq does and rule 10.10 implies; see question 3 for the base specification.
- **Which nodes are judged:** only a node that the edit adds, or whose wording or approval status it changes. That is what guard.ts does: a node that an edit leaves as it was is made a draft by `sheriff reindex` after the edit. The reason says why.
- **The entries of `sheriff.config.json`** (group 6, item 8), and a file that is missing or broken read as holding none of the lists, so that breaking the file cannot remove an entry unnoticed.
- **A missing chosen extension** (group 3, item 8).
- **The finding of the changed code** cites s-2x58az67bm6cxq2 instead of restating it, so files bound as a whole and entries of the bindings file count, as rule 9.4 requires.

### Item 59: `s-n76wt2bkqdmh78x` — "The agent's hooks for Codex CLI"

Location tools 16, unchanged. Implements 10.3 and 10.2 (X2).

How the questions were settled:
- **The JSON answers to Codex:** the owner's ruling of 2026-11-02 on Codex CLI, that a hook's exit code 2 does not block in Codex, so the scripts answer in JSON. The forms are those that guard.sh and after-edit.sh write.
- The rest is the approved wording, with "stand in" replaced and the reason rewritten for the node as a whole.

### Item 60: `s-4mej6ccn7xu3d3p` — "A git hook runs the SpecSheriff tools that a plugin keeps on the machine"

Location tools 12, unchanged. Implements 10.12 and 2.5.

How the questions were settled:
- **Node.js missing or too old.** Rule 10.12 says: "Where the SpecSheriff tools cannot run, the project's own tools still run. The commit or the push then goes through unless one of them fails." The draft follows the base as it stands and treats this case as tools that cannot run, as the brief requires. See question 1 for the base specification.
- **Who runs the project's own tools.** Rule 10.12 interleaves them with the steps of the SpecSheriff tools, so the hook's script runs them; the git hook that `sheriff init` writes runs them itself only where the SpecSheriff tools cannot run. Stage 3 adds the present text of the git hook to the texts of earlier releases, so that `sheriff init` replaces it and the session start names it.

### Item 61: `s-n4m5zvh96yb299p` — "The project's own tools in a git hook"

Location tools 13, unchanged. Implements 10.12 and the new row 10.1.37b.

How the questions were settled:
- **The order:** the tools that the project's own guidelines list as rewriting files (the agreed s-t9j29hppag2nren, each a path relative to `.githooks/`) first, in the order of the list; the others later, in byte order. Where the SpecSheriff tools cannot run, all of them in byte order, as the owner ruled on 2026-11-21 on s-t9j29hppag2nren.
- **The refusal of a change** now applies only to the other tools, since the first ones rewrite files by definition. It covers the files of the working tree, as the second step of rule 10.12 says, besides what is staged and the message. Where the SpecSheriff tools cannot run, only a failing tool refuses, as rule 10.12 says.
- **A listed path for which nothing runs** is named, as a file without an interpreter is.

### Item 61: `proposal:row-10-1-37b` (s-yn5tdx2bp4f5rq7)

A new row of the main table of checks, after row 10.1.37a, cost "refused, naming the tool and each file that it added, changed or removed". The agreed row 10.1.37a said in its change field that this row would be proposed with "The hooks". It is a single sentence of 44 words, like the other rows; shortening it would drop the exception for a project's own checks, which row 10.1.37a covers, or the exception for the files that git ignores. `moved/impl.json` is to map it to s-n4m5zvh96yb299p.

### Items 62 and 63: `s-zh2vcr3xjumppg5`, `s-2pdy9gw2jrjvfb4` and `new:tools-15-skills` (s-kq6wmdud9c7j2k9)

The plugin nodes keep their sids and lose "carries everything its work needs" from their titles. The paragraphs that both repeated, on `spec-init`, `spec-remove` and the model of the skills, move to the new node on the skills of both plugins ("One statement, one home"). The plugin for Codex CLI names its contents by citing the plugin for Claude Code.

How the questions were settled:
- **What the plugins hold:** the extensions of the guidelines, their schemas and the appendix of the tools, by citing the paths that the agreed "Where the files are" gives in the folder of the tools (rule 1.7.1, group 3's follow-up).
- **`spec-settings`:** the owner agreed on 2026-11-18 («да делаем») that the skill opens `sheriff settings` in a window of its own on the user's machine, and offers questions in the chat when the owner works remotely. A skill cannot tell whether the user can see the machine's desktop, as under Remote Control, so it offers both, and the user chooses. Whether Codex's sandbox lets a skill open a window is left to the rehearsal of the release (stage 3).
- **The plugin for Claude Code still implements 10.3,** since it declares the hook that runs the guard. Both plugins now also implement 1.7.1, which says that the extensions are delivered with the plugin.

## Questions for the owner

The three questions go on the page of group 8. The drafts assume answer A to each. In group 7 the owner decided a base question on which a draft depended (question 5 of group 7), and the base rules are changed after stage 2; questions 1 and 2 are handled the same way.

### Question 1. The order of the pre-commit hook against "right after the first step" in rule 10.12

**Recommendation: A.** It rests on the purpose of the exception in rule 10.12, which the `change` of the agreed exception states: a check that reads the nodes runs only on files that have passed the checks of their structure. `sheriff validate` makes the check for a key written more than once and the validation against the schema, then the project's own checks, then its other checks, all in one command (the agreed s-7pk89t8z6wymmj9). So the pre-commit hook can run the project's other tools, which change no file, only before `sheriff validate` or after it.
- **A. The hook runs the project's other tools before `sheriff validate`.** After stage 2, rule 10.12 says "the following checks run before any other check" instead of "right after the first step". What a person sees: the hook refuses the same commits as under B, and each check of the SpecSheriff guidelines and of the project still runs after the checks of structure. Cost: one sentence of rule 10.12 changes after stage 2. Risk: none found, since a tool that the order puts between them changes no file, and row 10.1.37b refuses one that does.
- **B. Rule 10.12 stays, and `sheriff validate` gains an option that makes only the two checks of structure.** The hook runs `sheriff validate` with that option right after the first step, then the project's other tools, then `sheriff validate` again. What a person sees: the same refusals as under A, and a commit takes longer, since the checks of structure run twice; how much longer was not measured. Cost: a new option in the agreed list of commands (s-f5rz6b7dhxejjts) and in the agreed node on the project's own checks (s-7pk89t8z6wymmj9), with its tests. Risk: none found.

Under B, these sentences change: in `new:tools-6-pre-commit`, the list gains an item "`sheriff validate` with that option" before "the project's other tools", and the item on `sheriff validate` says that it makes the rest of its checks.

### Question 2. Whether `sheriff guard` judges only the nodes that an edit adds or changes

**Recommendation: A.** It rests on the reason of rule 10.3: an agent that could set an approval status could make a decision that only the owners make. An edit that leaves a node as it was makes no such decision.
- **A. `sheriff guard` judges only a node that the edit adds, or whose wording or approval status it changes.** After stage 2, rule 10.3 says so ("leave approved a node that the edit adds or changes"). What a person sees: an edit to a file that holds an untouched node approved with a wording for which no approval is in force passes; `sheriff reindex` then makes that node a draft after the edit and names it to the agent (s-hcmpjmwtgfwzncu). Cost: one phrase of rule 10.3 changes after stage 2. Risk: none found.
- **B. The literal words of rule 10.3.** `sheriff guard` refuses any edit after which such a node is approved, wherever the node is, and names it. What a person sees: the edit is refused until the agent sets that node to draft, even where the edit concerns another node or file. Cost: `sheriff guard` reads every file of the specification before each edit. On a large specification this is estimated to slow each edit; the slowdown was not measured. Risk: to make its own edit, the agent changes the status of a node that its task does not concern.

Under B, these sentences change: in `s-st6td4mua9uqt9z`, the first item becomes "an edit after which a node of the specification has the status `approved` while no approval of its wording is in force", and the second sentence of the reason goes.

### Question 3. The skills that no node describes

**Recommendation: A.** Describing three skills is a task of its own. B adds three or more nodes and another round of review before the owner sees group 8. The gap is not new: the approved nodes do not describe these skills either.
- **A. The node of `spec-init` states each step that an agreed node requires of it, and a todo and a task after T25 describe the other three skills.** The node asks for `code`, `tests` and `testCommand`, which the agreed s-7unxytshhc4md54 leaves to be set. `stage3` removes from `spec-init`'s SKILL.md the offer to approve the specification, which no longer matches s-7unxytshhc4md54, and the commit, which no agreed node requires. The todo on s-kq6wmdud9c7j2k9 records `spec`, `spec-review` and `spec-adopt`. What a person sees: the plugins of this release still ship those three skills without a node, as the earlier releases did; the node on the skills names `spec`, `spec-review` and `spec-adopt` without explaining them, against rule 7.2.7; `spec-init` and `spec-remove` no longer commit, ask for a confirmation or show how a file left as it was differs (their `stage3`). Cost: one more task after T25, with its own estimate; in this release the principle "Nothing unapproved is implemented" stays unmet for those three skills.
- **B. Group 8 describes those three skills now.** What a person sees: every skill of the release has an approved node. Cost: three or more nodes and at least one more round of review before the owner sees group 8. Risk: none found.

Under B, three new nodes join the group, and the todo on s-kq6wmdud9c7j2k9 goes.

## Questions for the base specification

For the main session to record under "Found and owed". Each draft follows the base as it stands.

1. **Whether rule 10.3 holds the code of the repository's own tools to a test written first.** Rule 10.3 refuses an edit that changes "the code written for a rule". Rule 10.10 lets a SpecTag in the repository's own tools name a rule of the guidelines, and on 2026-11-13 the owner removed the requirement that the tests of a project's own checks carry the SpecTag of their rule. The guard holds only the system's code to it, as row 10.1.31's node does. Recommendation: rule 10.3 says "the system's code written for a rule".

2. **No rule of the base names the skills of the SpecSheriff plugins, or says that they leave the session's model and reasoning effort to the user. None requires a way to take the method out of a project.** s-kq6wmdud9c7j2k9 and s-jn3rauw6a8zeefn link to 2.5 until such a rule exists (review g8b-d, 5.2). The agreed s-yprj7d6tnvauggr requires each node of the appendix of the tools to implement a rule of the guidelines, so the link stays.

Round a's question 1 (Node.js missing) left this list: the page shows in Russian the refusal that the approved s-4mej6ccn7xu3d3p had and why the draft drops it, so the owner's agreement to the group settles it. Round a's questions 2 and 4 are questions 1 and 2 for the owner.

## Changes still needed outside the group

1. **`moved/impl.json`:** the new row 10.1.37b (s-yn5tdx2bp4f5rq7) → s-n4m5zvh96yb299p. **`table-10-1.json` and the page of table 10.1:** the new row after 10.1.37a, once the owner agrees to it.
2. **Citations of "The hooks" in agreed drafts, technical retargets for stage 3.** Each still holds, since "The hooks" lists the hook and cites the node that describes it; a retarget only makes it point to that node directly:
   - s-stxmhq3hgfndvn6, "`sheriff reindex` writes every location after each edit that an agent makes (§s-477gtdrkw34dzxw)" → s-hcmpjmwtgfwzncu;
   - "Project-wide settings", "the command that runs the tests … (§s-477gtdrkw34dzxw)" → s-b6qdtghnyha3fhk;
   - s-tnz9zgqx8c629a7, "The agent's hooks (§s-477gtdrkw34dzxw) and the skills of each SpecSheriff plugin (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4)" → s-p29yawkkkgk7kxb and s-kq6wmdud9c7j2k9;
   - s-7pk89t8z6wymmj9 cites s-477gtdrkw34dzxw for the directory of the staged files, which "The hooks" still holds: no change.
3. **The code, stage 3:** each draft's `stage3`. In short: the pre-commit, commit-msg and pre-push scripts run the project's own tools in the order of rule 10.12, which moves that run out of the git hook that `sheriff init` writes; `sheriff validate` signals a stop at the checks of structure; the hook after an edit runs `sheriff reindex` after an edit to code or tests and uses `sheriff markdown` and `sheriff map` only with the Views extension; sheriff.sh lets a commit through where Node.js is missing; guard.ts covers every kind of rule, the entries of `sheriff.config.json` and a missing extension; copy-assets.mjs copies the extensions, their schemas, `archive-file.schema.json` and `config.schema.json` into both plugins; the skill `spec-settings` is written.
4. **The skills and the docs, stage 3:** `skills/claude-code/skills/spec-init/SKILL.md` and its overlay for Codex keep what they say about the settings; the guides of both plugins name `spec-settings`; any text that names `sheriff message`, `sheriff export` or `sheriff render` is renamed.
5. **Task T28** will move each approval into the node that it approves. The guard's refusal of an edit of `specs/_approvals.jsonl` and its lookup of an approval in force (s-v4qus7raqnwzneb) will then change; nothing here anticipates it.
6. **Task T29** will add the command that draws the diagram of the domains. Whether the hook after an edit and the pre-commit hook run it is to be settled with that command (group 7, item 1).
7. **`.ai_docs/INDEX.md`:** the brief forbade touching it. The main session still has to add rows for `propose-group8.mjs`, `group8-notes.md`, `english-group8.md`, `tools-drafts.before-group8.json` and `briefs/t25-group8-brief.md`, and, for round b, `fix-group8-b.mjs`, `english-group8b.md`, `tools-drafts.before-group8-b.json`, `fix-brief-group8-b.md`, `review-g8-a.md` to `review-g8-d.md`, `english-g8-fast.md` and `english-g8-thorough.md`, and, for round c, `fix-group8-c.mjs`, `english-group8c.md`, `tools-drafts.before-group8-c.json`, `fix-brief-group8-c.md`, `review-g8b-a.md` to `review-g8b-d.md`, `english-g8b-fast.md` and `english-g8b-thorough.md`, and, for round d, `fix-group8-d.mjs`, `english-group8d.md`, `tools-drafts.before-group8-d.json`, `fix-brief-group8-d.md`, `review-g8c.md`, `english-g8c-fast.md` and `english-g8c-thorough.md`, and, for round e, `fix-group8-e.mjs`, `english-group8e.md`, `tools-drafts.before-group8-e.json`, `fix-brief-group8-e.md`, `english-g8d-fast.md` and `english-g8d-thorough.md`, and, for the page, `build-group8-ru.mjs`, `group8-ru.json`, `group8-assessments.json`, `gen-group8-page.mjs` and `group8-page/index.html`.
8. **The page of group 8** is built and not published: `build-group8-ru.mjs` writes `group8-ru.json`, and `gen-group8-page.mjs` writes `group8-page/index.html` from `tools-drafts.json`, `group8-ru.json` and `group8-assessments.json`, so a later round only reruns the two scripts. The «Оценка» in `group8-assessments.json` is written by hand from the latest reports and has to be revised wherever a later round changes what a line says. It is to show, in Russian, the refusal that the approved s-4mej6ccn7xu3d3p had where Node.js is missing, and why the draft drops it, and the owner's ruling of 2026-11-02 on Codex with what changed in Codex since then (the `change` of `s-n76wt2bkqdmh78x`). It also shows the restored reason on Codex's public plugin directory, with the documentation that it rests on (decision 5 of round c).
9. **Found and owed (round b):** rule 10.2 (s-epaw9sgyaajzn8g) names only the tests on a push, while rule 10.12 and row 10.1.37b also check the project's own tools on a push. For the continuation file, to be fixed when rule 10.2 next changes.
10. **The citation retargets, round b:** s-tnz9zgqx8c629a7's citation of the skills of each plugin is to point to s-kq6wmdud9c7j2k9, and its citation of what the agent's hooks ask, to s-p29yawkkkgk7kxb (item 2 above). The node on the skills now cites both plugin nodes, so those two still hold.
11. **The docs (TERM, review g8-b):** "runner" may mislead a reader who knows CI tools such as GitHub Actions, where a runner is a machine that runs CI jobs. A gloss in the docs settles it; the node of group 1 (s-xr5xxa9cxf2mq5u) keeps the term.

12. **For the release rehearsal (round c):** after a shell command, Codex shows the agent the refusals that a `block` answer holds instead of the command's output (the `stage3` of s-n76wt2bkqdmh78x).
13. **After stage 2, for the owner:** whether the agent's hooks for Codex move into the plugin is not raised, since Codex's public plugin directory still admits no plugin with hooks (decision 5 of round c). It would arise if that changes.

## What was not touched

Nothing under `specs/`; no node outside the group, in `specs/` or in the drafts; `.ai_docs/INDEX.md`, `tasks.md` and `t25-one-thought.md`. No commit was made.
