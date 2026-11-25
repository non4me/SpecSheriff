# T25 One thought per sentence, in the method — continuation

**First step of the next session: start stage 3** (below), with the first agreed draft that carries a note on the changes the SpecSheriff tools need.

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
