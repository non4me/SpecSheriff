# T25, stage 2, group 8: round e, the readers' last findings

You apply the readers' findings on `english-group8d.md` that this brief lists, and only those. The reports are `english-g8d-fast.md` and `english-g8d-thorough.md`. The briefs of the earlier rounds still hold.

## The findings to apply

- "The skills give the agent that each SpecSheriff plugin is written for the same procedures" → "The skills give the same procedures to the agent that each SpecSheriff plugin is written for";
- "The plugin declares the following agent's hooks to Claude Code:" → "The plugin declares the following hooks of the agent to Claude Code:";
- "Where the user chooses the questions" → "Where the user chooses questions in the chat";
- in the example of `s-st6td4mua9uqt9z`, "with its editing tool" → "with a file-editing tool";
- in the reason of `s-n4m5zvh96yb299p`, "They run in the order in which tools and checks run (§s-pcnyfp7gev7syax)" → "They run at the points that the rule on the order of tools and checks sets (§s-pcnyfp7gev7syax)";
- in `s-n4m5zvh96yb299p`, the sentence with two conditions → "Where the hook runs the SpecSheriff tools, it also refuses the commit or the push if one of the project's own tools that run after the tools that rewrite files does any of the following, regardless of whether the specification is approved or a draft";
- "On a commit, that commit is what is staged." → "On a commit, the commit being made is what is staged.";
- "A `sheriff.config.json` that is missing or is not valid JSON is read as if each of those lists were empty." → "Where `sheriff.config.json` is missing or is not valid JSON, `sheriff guard` treats each of those lists as empty.";
- "It leaves to the checks after the edit (§s-hcmpjmwtgfwzncu) a file of the specification that would be invalid JSON after the edit." → "It leaves a file of the specification that would be invalid JSON after the edit to the checks that run after the edit (§s-hcmpjmwtgfwzncu).";
- in `new:tools-6-after-edit`, drop "either" from "and either the files that differ include …, or `sheriff reindex` has written a file";
- "at the edit that makes it" → "at the edit that introduces it";
- "and why: no plugin's SpecSheriff tools are on the machine, or Node.js is missing or older than that version" → "and why: either no plugin's SpecSheriff tools are on the machine, or Node.js is missing or older than that version";
- "`spec-init` runs `sheriff init` (…), with the option `--agent codex` in the plugin for Codex CLI" → "… adding the option `--agent codex` where it runs from the plugin for Codex CLI";
- "with the arguments of each change that the user asks for" → "with the arguments for each change that the user asks for";
- "holds the same skills and SpecSheriff tools as the same release of the plugin for Claude Code" → "holds the same skills and SpecSheriff tools as the release of the plugin for Claude Code with the same version".

Change the Russian only where its meaning changes. Each `change` field still compares the final wording with the approved one.

## Not applied, and why

- "judge", "hold", "hand", "the files that the repository keeps", "the settings that only an owner … changes", "the options that Claude Code asked the user for": decided in the earlier rounds, for the reasons given there.
- "it refuses one of the patch's files": a check refuses a thing, such as a file, in the owner's English.
- "byte order" → "ordered by the bytes": the agreed wording of the node.
- "unless it is a check" → "and is not a check", and "it takes either set" → "either": they reverse changes that the previous round made for a stated reason.
- "only where an owner makes it" → "only if": "where" for a condition is the owner's English.
- "does not make the request about a runner whose key is `true`": a negative form, which round c replaced.
- Every finding that only asks for context that the node's earlier sentences or citations already give.

## What to write

1. `fix-group8-e.mjs`, as the earlier rounds did, with `tools-drafts.before-group8-e.json`.
2. `english-group8e.md`: only the sentences that this round changes, each with its key.
3. A section "Round e" in `group8-notes.md`.
4. Run `build-group8-ru.mjs` and `gen-group8-page.mjs` again, and check the page in Chrome at widths of 1066 px and 390 px. Do not publish it.

Make no commit, and do not touch `INDEX.md`, `tasks.md` or `t25-one-thought.md`.

## Your final report

Short, in English: the keys changed and what you checked on the page.
