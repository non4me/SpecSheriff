# T25, stage 2, group 8: round c, the follow-up review applied

You apply the follow-up review of the drafts of group 8. The brief for group 8, `briefs/t25-group8-brief.md`, still holds, and so does `fix-brief-group8-b.md`, except where this brief changes it.

## What to read

The six reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`:
- `review-g8b-a.md` to `review-g8b-d.md`, the reports of the four specsheriff-rule-reviewer agents;
- `english-g8b-fast.md` and `english-g8b-thorough.md`, the findings of EngStickler's two readers on `english-group8b.md`.

This brief holds the main session's decisions on all six reports. Each report ends with a line that points here.

**Apply every finding of the four reviewers**, nits included, in the words that the reports give, except where a decision below says otherwise. **Apply the readers' findings that the list below names**, and only those. Where a reviewer replaces a sentence and a reader changes a phrase in it, take the reviewer's sentence. Then apply the reader's phrase inside it where it still fits.

## The main session's decisions on the reviewers' findings

1. **The name of the hook.** Write "the hook that runs when a session starts" everywhere, in place of "the hook run when a session starts". The thorough reader found that the reduced form is read wrongly at first. This changes decision 2 of `fix-brief-group8-b.md`. In Russian, write «хук, который запускается при начале сессии» everywhere.
2. **The `pre-push` item of "The hooks"** (review g8b-a, H4): a comparison refuses nothing; the hook does. Write that the hook compares the working tree with each commit that the tests judge (§s-8a5eyy5n5hnsgrs), and runs the tests (§s-b6qdtghnyha3fhk) only where it refuses nothing at that comparison, or an equally exact wording.
3. **What a rule says holds.** Review g8b-b's R1 and A3 apply the owner's rule "A rule says what holds". Apply the same rule to the pre-commit hook's sentence on a failure of `sheriff markdown` or `sheriff map`, and to every other negative statement of the group that the reviewers did not name. Where the negative form is the only exact one, keep it, and say why in your notes.
4. **The `implements` links of the skills** (review g8b-d, finding 5.2). Check whether the specification requires each node of the appendix to implement a node of the base, in `moved/specs/_guidelines/spec.json` and the agreed drafts. If it does not, remove each `implements` link that does not hold, from s-kq6wmdud9c7j2k9 and s-jn3rauw6a8zeefn. If it does, keep the nearest link and say so in your notes. In both cases, add question 2 for the base specification as the reviewer words it.
5. **The dropped reason on Codex's public directory** (review g8b-d, finding 2.2). Check the current documentation of Codex on hooks in plugins and on what its public directory admits, and cite what you read. If the approved reason still holds, put it back into the reason of s-n76wt2bkqdmh78x. If it does not, add a todo to s-2pdy9gw2jrjvfb4: whether the agent's hooks for Codex move into the plugin. That todo is for the owner after stage 2. Either way, the `reasonChange` names what was dropped.
6. **A todo names no task of this repository.** "A task after T25" is a label from this repository's notes, which the guidelines must not carry. The todo on s-kq6wmdud9c7j2k9 says only: "`spec`, `spec-review` and `spec-adopt` are to be described in nodes of their own; no node describes them yet."
7. **Question 3 in the notes** is reworded as review g8b-d says. Question 2 in the notes gains "Risk: none found" under option A. The slowdown under option B is marked as an estimate that was not measured.
8. **The note on Codex's `block` answer** (review g8b-c): after a shell command, Codex shows the agent the refusals instead of the command's output. Record it in the `stage3` of s-n76wt2bkqdmh78x, for the release rehearsal.

## The readers' findings to apply

From both readers, in the drafts that this round changes:
- "the hook run when a session starts" → "the hook that runs when a session starts" (decision 1);
- "in place of whatever is at the same path" → "replacing whatever is at the same path";
- "reaches every clone" → "runs in every clone";
- "leaves recording a git hook's mode to the author of the next commit" → "leaves it to the author of the next commit to record a git hook's mode";
- "on a system whose files keep the executable bit" → "on a file system that keeps the executable bit";
- "the default that `sheriff review` takes for it" → "uses for it"; "the git hooks would take there" → "would use there";
- "a pair of values under one key" → the words that the agreed node on `sheriff reindex` uses for a key written more than once; check them;
- "a file that the schema refuses" → "a file that does not conform to its schema";
- "Each hook only looks up … and calls …" → "Each hook does only two things: it looks up … and it calls …";
- "the directory in which the session works" → "the session's working directory";
- "needs no new trust" → "does not have to be trusted again";
- "before a tool's call" → "before a tool call";
- "each file that the patch adds, updates, deletes or moves" is read from disk, but an added file is not on disk. Say what `sheriff guard` reads for each kind of change, as guard.ts does;
- "wherever, and from whichever plugin, a machine keeps them" → "wherever a machine keeps them and whichever plugin they come from";
- "it takes either" → "it takes either set";
- "runs only those files" → "runs, of the files there, only those";
- "Each of the project's own tools runs regardless of what the others find" → "Each of the project's own tools runs even where another of them has failed";
- "guard what the checks of SpecSheriff do not, such as a scan for secrets" → "check what the checks of the SpecSheriff tools do not check, for example by scanning for secrets";
- "A carriage return that ends the line is left out" → "… is ignored";
- "An agent takes up a skill only where the skill is installed" → "An agent can use a skill only where the skill is installed";
- "all of one release" → "all from the same release";
- "so each user installs the plugin for Codex CLI" → "so each user has to install the plugin for Codex CLI";
- "A skill takes `<plugin>` from the path" → "A skill derives `<plugin>` from the path";
- "work by the same procedures and checks" → "follow the same procedures and are held to the same checks";
- "the configuration lacks" in `spec-init` → "the user's git configuration lacks"; "asks before it" → "asks before that run";
- "beyond any one project" → "not for any one project";
- in `spec-settings`, "After the questions" and "Once the terminal window closes" → "Where the user chooses the questions" and "Where the user chooses the terminal window, … once the window closes";
- "which an owner working remotely lacks" → "which an owner who works remotely does not have";
- "is approved while no approval …" → "has the status `approved` while no approval …";
- "a test that declares the rule's SpecTag" → "a test that declares the SpecTag of the rule to which that code is bound";
- "an extension that the project has chosen" in the guard → "an extension of the guidelines that the project has chosen";
- "in the same way as it finds what a commit adds or changes" → "in the same way as the SpecSheriff tools find what a commit adds or changes";
- "Before a push for which it runs the tests" → "Before a push for which the tests are to run";
- "each commit to which the push creates or updates a ref, directly or through a tag" → "each commit that a ref which the push creates or updates points to, directly or through a tag";
- "the file is in only one of them, including a file in the working tree that git does not track" → "the file is in only one of the two, even where it is a file in the working tree that git does not track";
- "each checkout installs or builds for itself" → "each clone installs or builds for itself";
- "each write out what is staged to a directory of its own" → "each write out what is staged to a directory of their own".

## The readers' findings not applied, and why

- "judge" and "judges": the agreed nodes use "judge" in this sense, as `english-g8-fast.md` decided.
- "the executable mode" → "not executable": git's own term is the mode of a file.
- "the answer that the agent's hooks for Codex CLI write" → "response": the owner's ruling of 2026-11-02 says the scripts "answer" Codex.
- "the settings that only an owner of the specification changes" → "may change": the agreed nodes name these settings so.
- "against the repository's history": the reader read it as meant.
- Every finding that only asks for context that the node's earlier sentences or citations already give.

## What to write

1. `fix-group8-c.mjs`: on its first run, it copies `tools-drafts.json` to `tools-drafts.before-group8-c.json`; on every run, it rebuilds the group's keys from that copy. Run it twice, and check that both runs give the same file. Check that no key outside the group differs from the copy.
2. `english-group8c.md`: the final English of every node that this round changes, each in full, under its key and title.
3. In `group8-notes.md`, a section "Round c" that says, for each finding, how you applied it or why you did not. Update the questions and the changes still needed outside the group.

Do not change anything under `specs/`, and do not touch `.ai_docs/INDEX.md`, `tasks.md` or `t25-one-thought.md`. Make no commit.

## Your final report

Short, in English: the keys changed, what you found in Codex's documentation for decision 5, and anything you could not settle.
