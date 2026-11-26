# T25 One thought per sentence, in the method — continuation

**Now: stage 3, step B, group 1 (`sheriff validate`), batch 6, the last of the group.** Step A is committed and pushed as 41e3778. The plan of stage 3 is `t25-pass/stage3-plan.md`. Nothing of step B is committed yet: it is committed when the session closes. The unit and end-to-end tests passed after batch 5 (unit 363, end-to-end 86); `npm test` as a whole, with pytest, is run before the commit.

Batch 5 is done (28 of the 48 notes): new:tools-2-entries, new:tools-7-1-approval-by, s-j9r8z4xdrfkfs47. The specification's approval status is the last entry of `approvalStatus` (`ownerSettings`, `modelFlags`); `approvalRule`, `approvalRuleNode` and `specificationApproved` are gone. `sheriff reindex` replaces an earlier release's approving rule of `project.json` by an entry, archives or deletes the rule, and adds the draft rule on when the tests run (`testsRunRule()` in `model.ts`), naming it (`report.added`). In this repository it did so: `sheriff.config.json` holds the owner's entry, s-p92k6vfe3ju27at is in `specs/_archive/guidelines.json`, and the new rule s-rsfqzpkwpuunzed, worded as tools/5 (s-7unxytshhc4md54) says, was approved on the owner's behalf. `sheriff binding` checks the entries against the commit's parent (`entryFindings`); `push-mode.ts` reads the entries of each commit; `sheriff init` writes the rule on when the tests run; `guide(spec, approved)`. In the tests, `approveSpecification` appends an entry, `BASE` holds the rule on when the tests must pass, and `OWN` is a `project.json` with the rule on when the tests run. Parts done of notes of later groups: the APPROVAL_RULE part of new:tools-11-approve; the entries read by push-mode in s-b6qdtghnyha3fhk; the rule that `sheriff init` writes in s-7unxytshhc4md54; the reindex's rewrite of the approving rule and of `writesSpecSheriffGuidelines` from s-gb8s9657a65hqmv.

Before the commit that closes the session, the git hooks in the plugin's data directory are refreshed by running the session start by hand (`internal/release.md`): batch 4 changed `hooks/staged.sh`, and the old one would make the pre-commit hook refuse this repository's guidelines as copies.

Batch 4 is done (25 of the 48 notes): s-6bmnsbskg6en4nf. The SpecSheriff tools recognize the repository where the guidelines are written only by `SPECSHERIFF_GUIDELINES_REPO` (`writesGuidelines(root)` in `spec-files.ts`), never by `writesSpecSheriffGuidelines`, which `loadConfig` accepts and ignores and `sheriff reindex` removes (it did so in this repository). `hooks/staged.sh` points the variable at the directory it writes out when the variable names the repository's root. The variable is set for the Windows user (`D:\SpecSheriff`) and in `.claude/settings.local.json` (`env`), and this session's commands see it. In the tests, `repo()` marks its root with `writing(root)` unless `{ writes: false }`; `taking()` passes that; `current(env)` in `test/plugin.ts` hands the hooks the variable as last set. `CLAUDE.md` and `internal/release.md` say how the repository is recognized. The parts of s-t383grkn3q68dpf and s-st6td4mua9uqt9z that make `judgedHere` stop reading the old setting are done; the rest of those notes stays in groups 3 and 8.

Batch 3 is done (24 of the 48 notes): s-uxmkwbnpgtjzkgv, s-7pk89t8z6wymmj9 and its g6 proposal. What it built:
- `src/approved-wording.ts`: `approvedWordings(root, spec)` gives each node's last approved wording (from the files, else from the latest commit on the branch that holds it, else from an earlier approval, the node then named) and its links as the commit that added its last approval holds them (the files until that commit is made). Its tests are in `test/unit/approved-wording.test.ts`.
- `model.ts`: `listedBy(spec, wordings, refined)` reads the members of every rule of `project.json` that refines a rule, in their last approved wordings; `levelsOf(spec, wordings)` uses it, and so does the map (`outline(spec, wordings)`). `fixtureGlobs` still reads the files as they are: that is the note of group 3.
- `modelOf(spec, flags)` holds `approvalStatus` and `strict`; `modelFlags(root, config, spec)` in `config.ts` gives them, the approval status still from the approving rule until batch 5.
- The project's own checks run right after the checks of keys and of the schema; `sheriff validate --strict`; a string member; `reportedUnlessStrict`; a check that changes a file that git does not ignore is refused.
- The fixtures approve the rule on levels (`good()` in the validate tests, `project()` in the map tests).

Batch 2 is done: s-7zqsstgnuc772ba, s-cdachayybfvg4na, s-yprj7d6tnvauggr, s-gvafe6bnstwab8b and its bq proposal, new:tools-7-1-appendix-sections, proposal:new-tools-7-1-term-contracts-bq, new:tools-7-1-term-domain, new:tools-11-fingerprint (20 of the 48 notes done). The fixture `taking()` now chooses every extension unless the given settings name their own; the rule on levels is in the Domains extension, so a project's rule refining it needs that extension chosen. Copying the schemas of the extensions (`extensions/`) into the plugin waits for batch 6, since `specs/_schema/` holds none yet.

Group 1 is the 48 notes whose `stage3` names `validate.ts`, `model.ts`, `schema.ts` or `values.ts` (filter `/(validate|model|schema|values)\.ts/`). `node .ai_docs/t25-pass/mark-done.mjs "<by>" <key>...` writes `stage3Done`; the open notes are listed with the scratch script `group1.mjs` (any session: filter tools-drafts.json by that regex and by no `stage3Done`). Done so far, 11: new:tools-7-1-location, proposal:new-tools-11-fingerprint-bq (both by step A), s-stxmhq3hgfndvn6, s-95w92rnjuv3sst8, new:tools-7-1-one-header, s-pvnnr844f3y964m, s-e2vdhfsndy5stq9, s-qvgzubkrafadqgf, new:tools-7-1-consumes, s-vuujweu57sxsa58, new:tools-7-1-link-target.

What batch 1 built that later batches use:
- `config.ts` reads the entries `approvalStatus`, `strict` and `extensions`; `ownerSettings(config, strictDefault(root))` gives their values; `specs/_schema/config.schema.json` is new (default of `strict` is false) and the build copies it. Nothing yet takes the specification's approval status from the entries.
- A file that the plugin delivers carries `taken: true` (`withTaken`); validate's `kept` is the nodes of the other files.
- The domain checks run only where `domains` is chosen; `isDomain` leaves out `base`; a header's status counts its own children; a domain without sections has no index (`headerIndex` returns undefined).
- The test fixtures choose all three extensions by default (`ALL_EXTENSIONS` in `test/fixture.ts`); `table()` moved there. Test files are edited with the scratch script `replace.mjs` (blocks `<<<<<<< OLD` / `======= NEW` / `>>>>>>> END`), since every Edit of a test makes the plugin's hook print about 6 KB; after each change to tests, `node .ai_docs/t25-pass/stage3/fill-tests.mjs` and `npx sheriff reindex`.
- Interim: the header in `specs/_schema/node.schema.json` no longer requires `level` and `sections` (the new Domains schema does not); `code` stays required until the full schema is adopted.

Still open in notes that batch 1 carried out in part:
- s-vke5hakwf3uyrjs and s-zhen42p6mnaxu7w: the RecordType parts only where the RecordType extension is chosen (RecordType batch).
- s-agc6fb3vx46pc23 and s-qzyacnqwvaeaps4: read the gathered values from `enumSource.gathered` only (RecordType batch).
- s-uxmkwbnpgtjzkgv: `levelsOf` reads every refining rule in its last approved wording (the batch on the last approved wording).

The remaining batch of group 1:
6. The full new schema (`t25-pass/moved/specs/_schema/`, with `extensions/domains.schema.json` and `recordtype.schema.json`) composed with each chosen extension, and every RecordType note: s-3anv9qcmx8pwp2w, s-c2r9jndrjbtbsv6, s-5nf87c3e3jg9v7c, new:tools-7-1-enum-values, s-ezq8csd433vj6fj, new:tools-7-1-ref-names and their proposals. In step A this schema made 179 of 316 unit tests fail, since the fixtures were written against the old schema.

Notes that the regex puts in group 1 but that belong to later groups, by the code they change: s-nh8b2hjvzasdxmd and s-m8nmfsxkcfu7cjp (`binding.ts`, group 3); the rest of new:tools-11-approve (`approvals.ts`, group 4); new:tools-2-approve-spec and new:tools-2-strict (`sheriff settings`, group 6); new:tools-4-diagram (group 7); s-7unxytshhc4md54 and new:tools-6-pre-commit (group 8).

What step A holds (41e3778): the new form of the guidelines in `specs/` (spec.json, tools.json, the three extensions, the archive and its schema), all 386 nodes approved on the owner's behalf; the schema with only TableRule and its cells, `examples`, `checks` links and `TextRule.list.jsonSchema`/`valueList` added; the code that reads the new form, each change with its test written first. `sheriff validate`, `binding` and `citations` pass; binding reports ten nodes whose tests lag behind their new text. `npm test` passes: 325 unit, 86 end-to-end and 5 pytest tests. EngStickler read the English in six batches and the commit message; every fix changed the English only (about 380 fixes, logged), and the nodes those fixes made drafts were approved again on the owner's behalf. Findings rejected as false alarms, being agreed terms or standard English: "refuse", "holds", "names", "refers to", "is agreed to on the owner's behalf", "the files that the repository keeps", "the mistake closest to that case", "putting the specification live", "under which", "gathered beside", "text quoted as code", "outside every symbol", "owes", a bare sid in a decision that has no link to it, and the missing final period of a cell's text.

The task started on 2026-11-06T21:12:29Z. Tracked changes are committed and pushed to `main` when a session closes and when the task closes (the owner, 2026-11-13). The working files of T25, this file and `t25-pass/`, are saved to the branch `t25-work` when a session closes, with `node .ai_docs/t25-pass/save-to-branch.mjs --push --scratchpad <the session's scratchpad>` (the owner, 2026-11-24); that branch is never merged. The estimate in `tasks.md` was revised on 2026-11-25 to 25–45 h of work remaining. This file was cut down to the current state on 2026-11-26; the full earlier version is `t25-pass/t25-one-thought.before-compress.md`, and the branch `t25-work` holds its history.

## Where the work stands (2026-11-26)

- Stage 2, the review of the appendix of the tools, is finished: the owner agreed to all eight groups, the last on 2026-11-25.
- The questions about the base specification that stage 2 deferred are settled. The owner answered them on 2026-11-25 on three pages (`base-questions.md` holds them all); `agree-base.mjs` recorded the answers in `t25-pass/tools-drafts.json`.
- The 23 follow-on drafts of the appendix of the tools that those answers call for are written (`follow-on.mjs`), reviewed twice, read by EngStickler, and agreed on the owner's behalf (`agree-fo.mjs`, 2026-11-25). The owner was told in one line per draft.
- In `tools-drafts.json` every draft is agreed, except `commands:sids`, which is not a draft of a node.
- Nothing is waiting for the owner.

## Stage 3: the drafts move into the specification

- Each agreed draft is moved into its file under `specs/_guidelines/` and approved there with `npx sheriff approve <sid>`, on behalf of one of its owners where the owner agreed to it or it was agreed on the owner's behalf. The decisions it carries out go into its `meta.decisions`, from its `rulings`.
- A draft whose `stage3` field names changes to the SpecSheriff tools is implemented only after it is approved: its tests first, each carrying the node's SpecTag, then the code. `npm test` passes before each commit.
- The new form of the base specification is in `t25-pass/moved/specs/_guidelines/`; it moves into `specs/` in the same stage.
- The agreed Russian of the base is in `newform.json`. It does not yet carry the wordings of the follow-on drafts, so the page of the base and the page of table 10.1 show older wordings until it is updated.
- How fast nodes go is measured from the first node: the estimate of 10–15 min per node has not been measured.

## Stage 4, after stage 3

1. The skills, `skills/claude-code/README.md` (with a paragraph on moving to this release), `docs/README.md`, `docs/research/landscape.md` and the `_promo/` texts, brought to the new names and to the new wordings of the principles "Deterministic checks hold every participant to the contract" and "Nothing unapproved is implemented". The texts that restate those principles: `docs/README.md` (the paragraph on the checks), `_promo/articles/no-code-without-a-rule.md` ("One judgement, by an independent reviewer"), picture 2 and its row in `_promo/images/README.md`, the "Status" item of `CLAUDE.md`, and the skill `spec-review` where it says which approvals the agent makes on the owner's behalf.
2. The guidance on sections in `spec-review`, as the owner ruled on 2026-11-19.
3. T31, testing the skills, before the release; then `npm test`, the rehearsal and the release as `internal/release.md` says; then the saloon (`D:\specsheriff-saloon`) migrated with the published release's `sheriff reindex`.

## Found earlier and still owed

Each item is checked against `base-questions.md` before it is acted on, since that file settled many deferred questions.
- Rule 10.2 (s-epaw9sgyaajzn8g) names only the tests among the checks run on a push, while rule 10.12 also runs the project's own tools; 10.2 is to be brought into line.
- The agreed node s-a8fn72xa782wvbk says that `sheriff binding` refuses anything that `sheriff types` would write, which read literally also refuses the bindings entry; corrected the next time the node changes.
- Rules 1.3.3 and 10.3 say an approval "stands", the appendix says it "is in force"; brought into line the next time either changes.
- Whether withdrawing a `TableRule`'s approval (1.3.7) should match approving it (1.3.4) is to be put to the owner.
- A rule of the base on removing the method from a repository (`sheriff remove`) is to be proposed to the owner.
- The drafts s-ztseyetus7np6br and s-agc6fb3vx46pc23 write "a field that has an `enum`", table 12.12 writes "a field with `enum`"; aligned the next time either changes.
- 10.5 (s-94k7b6r5kf65udf): its last example contradicts its text; fixed the next time 10.5 changes.
- 10.1 (s-jau82aq9juv9zzh) has two versions, in `newform.json` and in `table-10-1.json`; reconciled in stage 3 and shown to the owner.
- tools/6's reason is narrower than its rule, and tools/3's "both agents" counts a code declaration; fixed in stage 3.
- s-pcnyfp7gev7syax (the order of the tools and checks at a commit), to be put to the owner: "each step runs regardless of what the earlier steps found" contradicts "run only after these checks have passed", and its example puts the scan for secrets before the checks of keys and of the schema, the reverse of what its text requires.
- s-jzm6qw992j3bnxt (the diagram of the domains) says "the alphabetical order of their names" and then defines it by code points; written as "the code-point order of their names" the next time the node changes.
- s-8f6gw8c265cnj2n (who chooses an agent's model and reasoning effort) says the agent uses what the person chose, yet its second item uses the defaults until the person confirms them; brought into line the next time the node changes.
- s-5x737t9nee4zgaa (what the base specification states) introduces the only two ways a rule of the base names a technology with "as follows"; under the rule "A rule says what holds, not what does not hold", its introducing sentence says "only". Proposed to the owner the next time the node changes, since adding "only" narrows an agreed wording.
- The decisions of s-utf4mbt7ref8g9c (2026-10-31) and of s-jau82aq9juv9zzh ("a test uses a rule's or a term's sid") record that a test may name a term, while the node's text and example, and s-5z5gnu7pahr82xp, now refuse a test that names a term; check whether a decision records that change, and add one where none does.
- Two defects in `sheriff reindex` found by the fact sheet: rewriting tests that name a node by a bare sid can drop the first of two values of a key written twice, and it does not report the files it rewrites; fixed in stage 3.

## How the work is done

- A new or substantially rewritten draft goes to `specsheriff-rule-reviewer`, started anew each time, before the owner sees it. A change that carries out a decision the owner has already made is approved on the owner's behalf once the reviewer passes it, and reported in one line (`.claude/vt/rules.md`, 2026-11-25).
- The reviewer's and the readers' findings are applied in one pass. A new review round runs only when a finding changes the meaning of a rule; smaller fixes are checked by the main session itself.
- EngStickler checks the specification, the drafts of nodes, rules and instructions, commit messages and documentation. It does not check `.ai_docs`, memory, scratch scripts or the twin's data (the owner, 2026-11-26). The drafts in `t25-pass/` are given to a reader explicitly, only the paragraphs that changed.
- This file is rewritten once per completed step, and says only how things stand.
- After an edit under `specs/`, the hooks run `sheriff reindex`, `export`, `render`, `validate`, `binding` and `citations`; if they do not run, these are run by hand, and never report a check that has not run.

## Where the working files are

- `t25-pass/tools-drafts.json` — every draft of the appendix of the tools, with its `agreed` date, `rulings` and `stage3` note.
- `t25-pass/moved/specs/_guidelines/` and `newform.json` — the base in its new form, and its agreed Russian.
- `t25-pass/base-questions.md`, `follow-on.mjs`, `agree-base.mjs`, `agree-fo.mjs` — the settled questions about the base and the scripts that recorded them.
- The queue map https://claude.ai/artifact/2sAk1z1MZTsTnRqGSkqGky, republished after every completed step from the owner's first Claude account.

## When the task closes

The closing steps of `vt` and `.claude/vt/project.md`: `elapsed.mjs --since 2026-11-06T21:12:29Z`; the commit "SpecSheriff guidelines and tools: …", authored by the owner, with no assistant attribution, then push; the Done row in `tasks.md`; this file and `.ai_docs/t25-pass/` deleted; memory updated.
