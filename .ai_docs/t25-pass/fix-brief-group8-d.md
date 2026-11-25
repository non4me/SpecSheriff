# T25, stage 2, group 8: round d, the final review and the readers' last findings

You apply the final review of round c and the readers' findings on `english-group8c.md`. The brief for group 8 and the briefs of rounds b and c still hold, except where this brief changes them.

## What to read

- `review-g8c.md`, the final review. It found 13 drafts ready and 4 not ready, with no new question for the owner.
- `english-g8c-fast.md` and `english-g8c-thorough.md`, the readers' findings.

This brief holds the main session's decisions on all three reports.

## The final review

Apply every finding and every nit of `review-g8c.md`, in the words that it gives:
- P1 and P2 in `new:tools-6-push-compare`;
- N1 and its three nits in `s-n76wt2bkqdmh78x`;
- I1 and its nit in `new:tools-15-spec-init`;
- S1 in `new:tools-15-spec-settings`;
- the nits on the ready drafts: the order of the sentence on the test in `s-st6td4mua9uqt9z`; "The hook itself leaves git's index as it is" in `new:tools-6-pre-commit`; and, in `s-477gtdrkw34dzxw`, that the hook that runs when a session starts keeps the plugin's copy of the SpecSheriff tools up to date (§s-4mej6ccn7xu3d3p);
- in `group8-notes.md`: a "Risk:" line for options 1B, 2B and 3B, with "none found" where none remains, and the quotation in question 2 brought into line with the item as round c worded it.

## The readers' findings to apply

- "only where it refuses nothing at that comparison" (`s-477gtdrkw34dzxw`) → "only where that comparison gives it no reason to refuse the push";
- "The hook names each such file as one for the author to stage." → "The hook tells the author to stage each such file.";
- "each commit that a ref which the push creates or updates points to, directly or through a tag, and that meets" → "each commit that is pointed to, directly or through a tag, by a ref that the push creates or updates, and that meets";
- "It makes the request about a runner only until that runner's key is `true`." → "The hook stops making the request about a runner once that runner's key is `true`.";
- "in any repository, where the configuration lacks" → "in any repository, whenever the configuration lacks";
- "is handed to the agent" (a failure of `sheriff markdown` or `sheriff map`) → "is reported to the agent";
- "Once the checks end" → "Once the checks have finished";
- "A `sheriff.config.json` that is missing or invalid JSON" → "… that is missing or is not valid JSON";
- "which records an approval and its withdrawal" → "which records approvals and their withdrawals";
- "text that the file does not hold" → "text that the file does not contain";
- "what the list of the hooks gives for its hook" and "… for that hook" → "specifies for";
- "names `codex`" → "contains `codex`";
- "it looks up the plugin" and "it looks up the SpecSheriff tools" → "it looks for";
- the list of the hooks for Codex: "one that runs when a session starts", "one that runs before an edit made with `apply_patch`", "one that runs after such an edit or a shell command", and the same form in Russian;
- "the scripts answer Codex with JSON written to their standard output, and exit with code 0" → no comma before "and exit";
- "opens with the higher version, compared as semantic versions" → "begins with the higher version, the two being compared as semantic versions";
- "runs, of the files there, only those, and names any other file there" → "runs only those files, and names any other file in that directory";
- "where it opens with `#!`" → "where it starts with `#!`";
- "whatever the SpecSheriff tools can do there" → "whether or not the SpecSheriff tools can run there";
- "one of the project's own tools that runs after the tools that rewrite files" → "… that run after …";
- "at the points that the order of that hook sets" → "at the points set by the order of that hook's steps";
- row 10.1.37b → "A project's own tool that runs on a commit or a push after the tools that rewrite files (§s-pcnyfp7gev7syax), unless it is a check that a project's own guidelines add (§s-2fau85dfyyeq66m), leaves the commit message, what is staged and the working tree as they were, except for the files of the working tree that git ignores";
- "Of the plugin, the project keeps only its declaration and the calls to its tools." → "Of all this, the project keeps only the declaration of the plugin and the calls to the plugin's tools.";
- in `s-zh2vcr3xjumppg5`, put the examples next to "each file common to every project", as the thorough reader words it, and write "The plugin declares the following agent's hooks to Claude Code:";
- "The agent's hooks for Codex are only in the project" → "The agent's hooks for Codex are in the project, not in the plugin";
- "the agent of each SpecSheriff plugin" → "the agent that each SpecSheriff plugin is written for";
- "then turns to the settings" → "then moves on to the settings";
- "So `spec-remove` offers to remove the plugin" → "So `spec-remove` only offers to remove the plugin".

## The readers' findings not applied, and why

- "a key written more than once" → "a duplicate key": the agreed nodes use "a key written more than once".
- "without the executable mode": git's own term is the mode of a file.
- "the settings that only an owner of the specification changes" → "may change": the agreed nodes name these settings so.
- "asked for none of the reviewer's settings" → "did not ask for any": both are negative, and I1's nit rewords the phrase anyway.
- "published under the Claude account" and similar wordings in the notes: not part of a node.
- Every finding that only asks for context that the node's earlier sentences or citations already give.

## What to write

1. `fix-group8-d.mjs`, as the earlier rounds did, with `tools-drafts.before-group8-d.json`.
2. `english-group8d.md`: the final English of every node that this round changes, each in full.
3. In `group8-notes.md`, a section "Round d".
4. Run `build-group8-ru.mjs` and `gen-group8-page.mjs` again, so that the page shows the drafts of round d. Check the page in Chrome at widths of 1066 px and 390 px. Do not publish it.

Do not change anything under `specs/`, and do not touch `.ai_docs/INDEX.md`, `tasks.md` or `t25-one-thought.md`. Make no commit.

## Your final report

Short, in English: the keys changed, what you checked on the page, and anything you could not settle.
