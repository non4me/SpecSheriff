# T25, stage 3: the plan

Stage 3 moves every agreed draft into `specs/`, approves it, and then carries out the 140 notes on the changes the
SpecSheriff tools need, tests first. This plan was written on 2026-11-26 from a measurement, described below. It
supersedes the order shown on the page move-plan.html in one respect only: the code that the move itself needs is
written in step A, and every other note waits until the nodes are approved.

## What the measurement showed

The base in its new form (`moved/specs/`, built on 2026-11-20) was copied over `specs/` in a scratch worktree of
HEAD df14925, and the present build of the tools was run on it.

- `sheriff validate` refused only the archive, because the present code validates `specs/_archive/*.json` against
  the schema of a section file.
- Without the archive, it also refused the locations of the nodes of the extensions: the present code gives
  `_guidelines/domains/1` where the new form says `_guidelines/extensions/domains/11`.
- After `sheriff reindex`, the remaining refusals all came from the present `tools.json` and `project.json`,
  which still link to nodes of the old base.
- `sheriff binding` refused the lists `meta.tests` of 26 nodes, which the new form dropped because a later rule has
  the reindex build them.
- `sheriff citations` refused four sids in the documentation that the new form archives.
- The present code walks only `children`, so it neither checks nor approves the 75 nodes in the cells of a
  `TableRule`.
- The present fingerprint counts a `TableRule`'s cells, nodes included, as its wording. The agreed node "The
  fingerprint of a node's wording" says otherwise. An approval recorded with the present code would therefore
  lapse once that node is implemented.

## Step A: the move, in one commit

Nothing reaches `main` until every check and `npm test` pass on the moved specification. If a session closes before
then, the scripts and a patch of the working tree are saved to `t25-work`, and `main` is left clean at its last
commit.

1. `stage3/assemble.mjs` builds the new files into `stage3/specs/` and writes `stage3/report.md`:
   - the base: `moved/specs/` with every base draft of `tools-drafts.json` (locations `spec`, `domains`,
     `recordtype`, `views`) applied over it, the latest draft of each sid winning;
   - `tools.json`: the present appendix with every tools draft applied, the latest draft of each sid winning, the new
     nodes and sections placed where their drafts say, removed nodes archived;
   - `project.json`: its links moved to the nodes that replace the archived ones;
   - the schema files and the archive.
2. The rehearsal: the built files are copied over a scratch worktree of HEAD and the present tools are run on them.
   Each refusal is either a defect of the assembly, fixed in `assemble.mjs`, or a change the code needs for the move.
3. The code the move needs, each change with its test written first and seen failing, the test carrying the SpecTag
   of the node it is written from:
   - the model reads the nodes in the cells of a `TableRule`;
   - the fingerprint, as "The fingerprint of a node's wording" says;
   - the locations, as "How a node's location is computed" says;
   - a file of the archive validated against its own schema, as "Validation of a file of the archive" says;
   - whatever else the rehearsal shows the move cannot pass without.
4. The SpecTags of the existing tests re-pointed where a stage-3 note says a test "is to carry" another sid.
5. `meta.tests` and `meta.code` written from the SpecTags, by a script, until the reindex builds them.
6. The citations in the documentation re-pointed to the node that replaces each archived one.
7. On `main`: the built files copied in, the tools built, the git hooks refreshed by hand (`internal/release.md`),
   `sheriff reindex`, then `sheriff approve` for every agreed node on the owner's behalf, then every check and
   `npm test`. The commit "SpecSheriff guidelines: the new form …" is made and pushed when the session closes.

## Step B onwards: the notes, one group at a time

The remaining notes are carried out grouped by the code they change, in this order, since later groups read what
earlier ones build:

1. `sheriff validate` (`validate.ts`, `model.ts`, `schema.ts`): items 1 to 18 and the checks of the extensions.
2. `sheriff reindex` (`reindex.ts`): the lists of code and tests, what it rewrites from earlier releases.
3. The SpecTags and the bindings file (`code.ts`, `binding.ts`, `diff.ts`): the syntax-tree comparison, the bindings
   file, SpecTags at the start of a file, the draft rule's code.
4. The commit message and the approvals (`message.ts`, `approvals.ts`): the trailer, the entries only an owner
   records, the lagging tests and code.
5. The reviewer (`review.ts`): the judgements, the verdict, the runners.
6. The commands: `untagged`, `json`, `todos`, `guide`, `settings`, the generators, `types` and the RecordType's JSON
   Schema.
7. The views: the Markdown export, the map, the diagram of the domains (T29 ships the viewer).
8. The hooks, `sheriff init` and `sheriff remove`, the plugins and their skills.

Within a group, each note's test is written first and seen failing, then the code, then `npm test`. A note that is
done is marked in `tools-drafts.json` (`stage3Done`), so that the count of what remains is read, never recalled.
