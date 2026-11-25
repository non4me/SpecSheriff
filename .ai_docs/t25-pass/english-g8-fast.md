# EngStickler's fast reader on english-group8.md: the findings and the main session's decision on each

The fast reader read `english-group8.md` on 2026-11-25. This file keeps each finding of the reader that asks for a change, with the main session's decision. The reader's Russian translations matched the meaning of the drafts except where a finding below says otherwise. The thorough reader's findings that this file does not cover are in `english-g8-thorough.md`.

## Applied: the drafting agent makes these changes in round b

`s-477gtdrkw34dzxw`:
- "`pre-push`, which runs the project's own tools for that hook, and then the tests once it has compared the working tree with what the push sends" reads two ways: the comparison may come before the tests, or be their condition. Say both: the hook runs the project's own tools for that hook, then compares the working tree with what the push sends (§s-8a5eyy5n5hnsgrs), and runs the tests (§s-b6qdtghnyha3fhk) only where that comparison has refused nothing.
- "the pre-commit and commit-msg hooks write what is staged out to a directory of its own" → "the pre-commit hook and the commit-msg hook each write out what is staged to a directory of its own".
- "with their schemas": say which of the guidelines and the extensions have a schema, so that the phrase reads one way.
- "as the SpecSheriff plugin delivers them": there are two plugins. Say "as they are delivered with the SpecSheriff tools that run the check", or an equally exact wording.
- "at its moment" → "at the moment set for it".
- The example: "run the checks over the working tree" → "run the checks on the working tree".
- The todo: split it into two sentences, and name what the hooks would remove: "The export and the map catch up with a change that reaches the working tree through git — a pull, a merge, a checkout — only at the next edit an agent makes or the next commit. Post-merge and post-checkout hooks running `sheriff markdown` and `sheriff map` would remove that delay."

`new:tools-6-pre-commit`:
- "`sheriff types`, which generates from the nodes as they are staged": the verb has no object. Name what `sheriff types` writes, as its agreed node (§s-a8fn72xa782wvbk) names it.
- "The hook writes each such file into the working tree instead": the sentence does not say what "instead" replaces. Say that `sheriff types` writes its files into the working tree rather than into the hook's directory, and that the checks therefore read each such file as it is staged. Check the code for which of the two the hook does.
- "names it as a file to be staged" → "names it as a file for the author to stage".
- "A failure to write the export or the map is reported and stops nothing" → "A failure to write the export or the map is reported, and does not make the hook refuse the commit".
- The reason: "So whatever rewrites files runs before the checks" → "So the tools that rewrite files run before the checks".

`new:tools-6-push-compare`:
- "the files that the working tree ignores" → "the files that git ignores".
- "Where it refuses nothing" → "Where it does not refuse the push".

`new:tools-6-hooks-on`:
- "where it names another directory" → "where it points to a different directory".
- "which run by the interpreter that their first line names" → "which are run by the interpreter that their first line names".
- "so a commit there would pass no check" → "so no check would run on a commit there".
- "The session start reaches every clone", "The session start leaves the mode to the author" and, in the example, "The session start names each hook" → "the hook run when a session starts", the name that the plugins' nodes use.
- "For each such hook, it says how": "it" can be either hook. Name the agent's hook, and in the list say "that git hook" and "the git hook's file".

`new:tools-6-reviewer-settings`:
- "wherever the configuration lacks the setting or holds another value" → "where the configuration lacks the setting or holds a different value".
- "names each setting that the user's git configuration lacks for the runner that `sheriff review` would run at a commit there" → "names each setting of the runner that `sheriff review` would run at a commit there (§s-xr5xxa9cxf2mq5u), where the user's git configuration lacks that setting".
- "The hook asks so once" → "The hook asks this once".
- "it records `true` in the user's git configuration as `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked`. While that record holds `true`, the hook asks nothing." → "it sets `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked` to `true` in the user's git configuration. While that key is `true`, the hook does not ask."
- The reason: "so that user chooses its settings" reads as "so that" and leaves "its" open → "so the user who commits chooses the reviewer's settings".
- "the session start" in the reason and in the example → "the hook run when a session starts".

`new:tools-6-after-edit`:
- "noted" and "notes" → "recorded" and "records", in all three places.
- The second item opens with its condition, while the others open with the command. Open each item with the command, and state each condition in full, so that "under the same condition" goes: `sheriff markdown` and `sheriff map` run where the project has chosen the Views extension and the files that differ include `sheriff.config.json` or a file under `specs/`, or `sheriff reindex` has written a file; `sheriff types` runs where the files that differ include `sheriff.config.json`, a file under `specs/` or the code of a project's own generator, or `sheriff reindex` has written a file.
- "with its difference from the last commit as the commit being made" → "and treat its difference from the last commit as the commit being made".
- "Where `sheriff reindex` refuses": the verb has no object. Name what `sheriff reindex` refuses, as its agreed node names it (`new:tools-2-reindex-twice` says "refuses a node").
- "as the agent's hooks for Codex CLI say" → "in the answer that the agent's hooks for Codex CLI write (§s-n76wt2bkqdmh78x)".
- "whatever they found" → "whether or not they refuse anything".

`s-st6td4mua9uqt9z`:
- "an edit that leaves approved a node that it adds" → "an edit after which a node that it adds, or a node whose wording (§s-5ah25f6gy99panq) or approval status (§s-tgrnpagrb58tya7) it changes, is approved while no approval of that node's wording is in force (§s-v4qus7raqnwzneb)".
- "in the list `approvalStatus`, `strict` or `extensions`" → "in one of the lists `approvalStatus`, `strict` and `extensions`".
- "as where `Edit` names text" → "for example where `Edit` names text".
- "a file of the specification that the edit would leave other than valid JSON" → "a file of the specification that would not be valid JSON after the edit".
- "It makes these checks regardless of whether": no check is named in that paragraph → "`sheriff guard` refuses these edits regardless of whether the specification is approved or a draft."

`s-n76wt2bkqdmh78x`:
- "Each hook holds only the lookup of the plugin for Codex CLI in Codex's cache and a call to the plugin's script" → "Each hook only looks up the plugin for Codex CLI in Codex's cache (§s-4mej6ccn7xu3d3p) and calls the plugin's script for that hook".
- "Codex blocks a tool's call only on an answer" → "Codex blocks a tool call only in response to an answer".
- "it judges each of those files as an edit made with the file-editing tools" → "it judges each of those files as it judges an edit made with the file-editing tools".

`s-4mej6ccn7xu3d3p`:
- "where the copy there is of another release or missing" → "unless its data directory already holds a copy of the same release".
- "Each git hook that `sheriff init` writes holds the following: the lookup of those SpecSheriff tools; a call to the script …; the run of the project's own tools … and a notice" → verbs instead of nouns, and "those" named: each git hook looks up the SpecSheriff tools of either plugin, calls the script for that hook in their `hooks/`, and, where the SpecSheriff tools cannot run, runs the project's own tools for that hook and gives a notice.
- "older than the SpecSheriff tools need" → "older than the version that the SpecSheriff tools need".
- "say that no check of SpecSheriff ran, and why: … older than the version that they name" → "say that the SpecSheriff tools ran no check, and why: … older than the version that the SpecSheriff tools need, which the notice names".
- "the checks follow each release of the plugin" → "the checks keep up with each release of the plugin".
- The example: "also when the commit is made from Codex" → "even when the commit is made from Codex".

`s-n4m5zvh96yb299p`:
- "names each other file there" reads as "each other" → "names any other file there", as the owner's English writes "any other".
- "by the interpreter that its first line names, in git's own environment" → "with the interpreter that its first line names, in the environment that git gives the hook".
- "Each of them runs regardless of what the others find" → "Each of them runs even where another has failed".
- "ends with an exit code other than zero" → "exits with a code other than zero".
- "a copy of the standard input that git hands it" → "a copy of the standard input that git hands the hook".

`s-zh2vcr3xjumppg5`:
- "the SpecSheriff tools, with the files common to every project at the paths given for them in the folder of the SpecSheriff tools" is overloaded. Say it in two steps: the plugin holds the SpecSheriff tools, and in their folder, at the paths that §s-zefk589ykh37b8u gives, the files common to every project.
- "The plugin declares to Claude Code the agent's hooks: …" → "The plugin declares the following agent's hooks to Claude Code:", followed by a list.
- "Each option names its default and declares no default value" reads as a contradiction. Say where the default is named, as the code does it: for example, "The description of each option names the default that `sheriff review` takes, and the option declares no default value".

`new:tools-15-skills`:
- "It passes over each setting" → "It skips each setting".
- "each setting that the user has already been asked for" → "each setting of a runner whose settings the user has already been asked about".
- "offers the setting to the user at its default" → "offers the user the setting's default".
- "writes what the user answers" → "writes the user's answer with `git config --global`".
- "records that the runner has been asked" → "records that the user has been asked about that runner's settings".
- "a terminal window of its own" → "a separate terminal window".
- "They work at those that the user has chosen in the session" → "They run with the model and the reasoning effort that the user has chosen in the session".
- "It then takes up the settings of the runner" → "It then turns to the settings of the runner".

## Not applied, and why

- "judge" and "judges" for what a check, a test or `sheriff guard` does, including the title "An edit judged before it is made": the agreed nodes use "judge" in this sense, and the title is the approved one.
- "hand" and "hands" for what a hook gives the agent: the agreed nodes say "is handed the model on its standard input".
- "what the commit holds" and "does not hold": the agreed nodes use "the commit holds".
- "makes the check": a phrase of the owner's English. Only "makes … the validation" changes, as `english-g8-thorough.md` says.
- "declares that rule's SpecTag" → "carries": the agreed nodes on a test's SpecTag (§s-zrsc6asgmhv8tnc) say "declares".
- "the files that the repository keeps" → "the files tracked in the repository": a phrase of the owner's English.
- "These files are among the repository's own tools" → "the project's own tools": "the repository's own tools" is the term of the cited node §s-hheus6f395ynqvc. Only "These files" changes, as `english-g8-thorough.md` says.
- "such an edit" in "The hooks": it refers to the list item directly above it, in the same list.
- "directly or through a tag", "A script knows that it serves Codex" and "which `sheriff validate` refuses": the reader read them as meant. "A script knows …" changes only as `english-g8-thorough.md` says.
- "That file is beside the file that lists the plugin for Claude Code" → "next to": the change that `english-g8-thorough.md` applies replaces the sentence.
- "runs on a commit or a push" → "runs at a commit or a push" (`proposal:row-10-1-37b`): rules 10.2 and 10.12 of the base say "on a commit" and "on a push", and EngStickler's list of calques gives "at a commit" as a calque. The drafts of group 8 write "on a commit" and "on a push" throughout.
