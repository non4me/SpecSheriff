# EngStickler's thorough reader on english-group8.md: the findings and the main session's decision on each

The thorough reader read `english-group8.md` on 2026-11-25. This file keeps each finding of the reader that `english-g8-fast.md` does not already decide, with the main session's decision. A finding that repeats one of the fast reader's findings is decided in `english-g8-fast.md`. The reader's Russian translations matched the meaning of the drafts except where a finding below says otherwise.

## Applied: the drafting agent makes these changes in round b

`s-477gtdrkw34dzxw`:
- "Each check that these hooks or the agent's hook after an edit run reads the commit being made" puts two verbs side by side, and "these hooks" points to another paragraph → "Each check run by the pre-commit or commit-msg hook, or by the agent's hook after an edit, reads the commit being made".
- The reason: "Hooks that the repository keeps and the plugins declare" reads as one group of hooks → "The hooks that the repository keeps and those that the plugins declare".
- "a hook that turns the git hooks on and asks for the settings of the reviewer" does not say whom it asks → "a hook that turns the git hooks on (§s-jgcveum8dwdnyzr) and has the agent ask the user for the reviewer's settings (§s-p29yawkkkgk7kxb)".

`new:tools-6-pre-commit`:
- "which first makes the check for a key written more than once and the validation against the schema" → "which first checks for a key written more than once (§s-7zqsstgnuc772ba) and validates against the schema (§s-xzcw3hv4hmxz7h7), and runs the project's own checks only after both have passed". "Makes … the validation" is not English.
- "The hook writes what is staged out to its directory" → "The hook writes out what is staged to its directory".

`new:tools-6-push-compare`:
- "where a file is in either of the following cases" → "where either of the following holds for a file".
- "the file is in only one of them, including a file that is in the working tree and has never been added to git" → "the file is in only one of them; this includes a file that is in the working tree and has never been added to git".
- The example: "leaves an edit of `src/a.ts` uncommitted" → "leaves an edit to `src/a.ts` uncommitted". The agreed nodes say "an edit to".

`new:tools-6-hooks-on`:
- The reason: "cannot report itself" → "cannot report that it was skipped".
- The reason: "leaves the mode to the author" → "leaves the mode to the author of the next commit".

`new:tools-6-reviewer-settings`:
- "the agent's hook of the plugin for Claude Code" → "the agent's hook that the plugin for Claude Code declares (§s-zh2vcr3xjumppg5)"; "the agent's hook of either SpecSheriff plugin" → "the agent's hook of each SpecSheriff plugin".
- "including the default" → "even where that value is the default".
- "the runner of the SpecSheriff tools that the git hooks would take there" → say whose runner it is: the runner of the agent whose plugin's SpecSheriff tools the git hooks would take there (§s-4mej6ccn7xu3d3p).
- "the options that Claude Code asked for" → "the options that Claude Code asked the user for".

`new:tools-6-after-edit`:
- "a file under `specs/`, `sheriff.config.json`, or a file in which …" → "`sheriff.config.json`, a file under `specs/`, or a file in which …", so that "under" cannot apply to `sheriff.config.json`; the same order in the other items.
- "as the settings in `sheriff.config.json` set them": "them" reads two ways. Say "a file among those in which the settings in `sheriff.config.json` (§s-zefk589ykh37b8u) have the SpecSheriff tools look for SpecTags", or an equally exact wording.
- "The hook hands the agent what `sheriff types` and the checks refuse" → "The hook hands the agent the refusals of `sheriff types` and of the checks".

`s-st6td4mua9uqt9z`:
- "an edit of `specs/_approvals.jsonl`" → "an edit to `specs/_approvals.jsonl`", in all three places.
- "For an edit of an entry, it names the list" → "For an edit to an entry of one of those lists, it names the list".
- "It reads the edit … on its standard input" → "It reads the edit … from its standard input".
- "as it finds what a commit adds or changes" → "in the same way as it finds what a commit adds or changes".
- "It looks for the test" → "It looks for a test that declares the rule's SpecTag".

`s-n76wt2bkqdmh78x`:
- "A script knows that it serves Codex from the file `agent`" attaches "from the file" to "serves" → "A script reads from the file `agent` in the folder of the plugin's SpecSheriff tools (§s-xr5xxa9cxf2mq5u) that it serves Codex".
- "taking a moved file as deleted at its old path" → "treating a moved file as deleted at its old path".
- "it reads from the patch each file that the patch adds, updates, deletes or moves" reads two ways: the paths from the patch, or the files' contents. Say which, as the code does it.
- The reason: "where its user trusts each hook as it is written" → say what the trust covers, as Codex's documentation states it, so that the reason shows why the project's hooks must not change with each release.

`s-4mej6ccn7xu3d3p`:
- "The script run when a session starts names" → "The script that runs when a session starts names".
- "it says that `sheriff init` replaces it" → "it says that running `sheriff init` again replaces that hook".

`s-n4m5zvh96yb299p`:
- "The hook names each path in that list" → "The hook names each path in the project's list of tools that rewrite files".
- "one of the other tools" → "one of the tools that the project's own guidelines do not list as tools that rewrite files".
- "The hook makes this check regardless of whether …": the check is named in the paragraph before. Put the sentence into the paragraph that states the refusal.
- "These files are among the repository's own tools" → "The files in `.githooks/<hook>.d/` are among the repository's own tools (§s-hheus6f395ynqvc)".
- The reason: "so that those tools run on every machine" → "so that the project's own tools run on every machine".
- "in git's own environment, so that it reads the working tree" → "…, so it reads the working tree", since the clause states a consequence.

`proposal:row-10-1-37b`:
- "other than a check that a project's own guidelines add" stands after "the tools that rewrite files" and can attach to them. Move it after "A project's own tool".
- "except for the files that git ignores" can apply to all three objects. Put it after "the working tree": "leaves the working tree, other than the files that git ignores, what is staged and the commit message as they were".

`s-zh2vcr3xjumppg5`:
- "keep its copy of the SpecSheriff tools" → "keep the plugin's copy of the SpecSheriff tools up to date"; "write the settings that the user gave as its options" → "… as the plugin's options".
- "the marketplace under `extraKnownMarketplaces`, whose source is the branch `release`" attaches "whose" to `extraKnownMarketplaces` → "the marketplace under `extraKnownMarketplaces`, with the branch `release` of the repository where the SpecSheriff guidelines are written as its source, and with `autoUpdate` on".
- The reason: "An agent takes up a skill only where it is installed" → "… only where the skill is installed", also in `s-2pdy9gw2jrjvfb4`.
- The reason: "of one release to the agent of every clone together" → "all of one release, to the agent in every clone".

`s-2pdy9gw2jrjvfb4`:
- "That file is beside the file that lists the plugin for Claude Code" is vague, and the two files are in different directories. Name both files and say that the branch `release` of the same repository holds them.
- The reason: "which brings the same release of the skills and the SpecSheriff tools as the plugin for Claude Code, while each agent updates its own plugin" reads two ways → "and each release of that plugin brings the same skills and SpecSheriff tools as the same release of the plugin for Claude Code. Each agent updates its own plugin."

`new:tools-15-skills`:
- "For each other setting" reads as "each other" → "For any other setting", as the owner's English writes "any other".
- The reason: "so that the agent of either SpecSheriff plugin follows the same steps" → "so that the agents of both SpecSheriff plugins follow the same steps".

## Not applied, and why

- "the settings that only an owner of the specification changes" → "may change": the agreed nodes name these settings so.
- "the tools that rewrite files and the checks that read the commit being made": the relative clause can attach only to the checks.
- "A commit that leaves the specification a draft": the reader read it as meant.
- "so they judge a pushed commit only where …": the reader read it as meant.
