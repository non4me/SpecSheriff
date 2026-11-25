# T25, stage 2, group 6: round c, the follow-up review applied

The follow-up review found the section node and the proposal on how a project's own check is run ready, two more drafts ready with nits, and the rest one round away. No report leaves a question for the owner. The six reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`:
- the reviewers' reports `review-g6b-a.md`, `review-g6b-b.md`, `review-g6b-c.md` and `review-g6b-d.md`;
- the readers' reports `english-g6b-fast.md` and `english-g6b-thorough.md`.

Apply every finding that a report marks as one the author can fix, nits, cuts and doubts included, with `fix-group6-c.mjs`, idempotent from a backup `tools-drafts.before-group6-c.json`, as in round b. Add a "Round c" section to `group6-notes.md`, placed first, that says for each finding what was done or why it was rejected. Then write `english-group6c.md`, the English of every changed node, in the format of `english-group6.md`. Do not touch `.ai_docs/INDEX.md` or anything under `specs/`.

## Rulings on the points that the reports leave to the main session

- **Review b-b, X3 (the `fields` of the project's extension of the schema, and the whole of an archived node).** Rule 1.7.6's example covers it, as it covered round a's finding 9. Apply X3 as the reviewer words it.
- **Review b-b, A3, and review b-d, nit b, on the same paragraph of the proposal on how a project's own check is run.** The owner's rule "One statement, one home" decides: the node on approving the specification states which model the project's own checks receive, so cut the paragraph "Before `sheriff settings` records an approval…" from the proposal, together with any citation and `cites` link that only it uses. Say so in the proposal's `change` field.
- **Review b-c, R1.** Rule 2.6 decides: a draft rule on the approval status that was ever approved is moved to the archive, and one never approved is deleted. Apply R1 and correct the `change` field, and add the `stage3` note on reindex.ts:208–218.
- **Review b-d, the doubt on files that fail the key or schema checks.** Add the reviewer's sentence. Rule 10.7 settles it, since the flag must not be turned on while a commit would be refused.

## The readers' findings

The proposal on `sheriff reindex` is a new wording of an agreed node, so it is checked as a whole, as the owner's rule "An agreed node is brought into line with the rules when it changes, never in a sweep" says. Its agreed sentences that both readers read two ways are therefore brought into line in this proposal, and listed in its `change` field:
- "until `sheriff.config.json` holds an entry that sets …" → "where `sheriff.config.json` holds no entry that sets …", in every item that uses it;
- "has yet to choose that extension" → "has not chosen that extension";
- "occurs in one of these places" → "meets one of these conditions".

Apply, among the others that a careful native writer would accept:
- "a node of which whoever runs the command is not an owner" → "a node whose owners do not include whoever runs the command", in both places;
- "any sid that the run names" → "any sid named in the run";
- "in a line of its own" → "on a line of its own"; "edit of the node" → "edit to the node";
- "the address of whoever made it" → "the email address of whoever made it";
- "`sheriff init` sets git to merge" → "`sheriff init` configures git to merge", here and in example 2;
- "The SpecSheriff tools keep those texts" → "The SpecSheriff tools store those texts";
- "each one does not run until it is moved" → "none of them runs until it is moved";
- "no SpecTag binds two functions in an old file" → "two functions in an old file have no SpecTag", and "until a SpecTag binds both functions" → "until each of the two functions has a SpecTag";
- "a commit or push" → "a commit or a push";
- "These checks read the specification as approved" → "… treat the specification as approved";
- "while the last entry of each list sets" → "and the last entry of each list sets";
- "never takes the entry … for a changed one" → "never mistakes the entry … for a changed one";
- "returns it to draft" → "makes it a draft again";
- "rules and definitions that no longer hold in the project" → "… that no longer apply in the project".

Keep, as the agreed drafts write them: "the files that the repository keeps", "the settings that only an owner of the specification changes" (the title of the agreed s-chsfpkgpmfk4fft), "makes this check", and "beside a field" (rule 12.9).

Report, as your final message: the keys you changed, the findings you rejected and why, and any question that, in your judgement, only the owner can answer, with the rule or ruling you checked it against.
