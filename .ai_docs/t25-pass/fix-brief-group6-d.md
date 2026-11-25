# T25, stage 2, group 6: round d and the owner's page

The final review found the section node, the fingerprint, approving a node, withdrawing its approval, the proposal on how a project's own check is run and withdrawing the choice of an extension ready, with nits. The other drafts are one fix away. Its reports are `review-g6c-a.md` to `review-g6c-d.md`, and the readers' reports are `english-g6c-fast.md` and `english-g6c-thorough.md`. Two steps remain before the owner sees the group: round d, then the page.

## Round d: the last fixes

Apply them with `fix-group6-d.mjs`, idempotent from a backup `tools-drafts.before-group6-d.json`, as in earlier rounds. Apply every finding and nit that a report marks as one the author can fix, with these rulings:

- **Review c-a, R1 (a node's last approval).** Rule 1.3.3 settles it, so it does not go to the owner. When an edit restores an earlier wording whose approval is in force, that wording is the approved one, and no command could otherwise clear the refusal that s-txbwsthdqhvyzd2 would then give on every commit. Apply the reviewer's wording, and say in the node's `change` field which agreed rules it follows from.
- **Review c-d, fix 2, and review c-b, A1, on the same paragraph of "Approving the specification".** The owner's rule "One statement, one home" decides between them: take review c-d's form, which refers to the node on turning the flag on for the cases, and keep the sentence that says the run ends with the refusal. For example: "While the `strict` flag is on, `sheriff settings` first runs the checks that the flag makes stricter, as it does when asked to turn the flag on (§s-nxgkp988mej79eg). It refuses to record the approval in each case in which it would refuse to turn the flag on. The run of `sheriff settings` ends with that refusal, which is the same as the refusal to turn the flag on in that case."
- **Review c-c, T-1 and R-1, and nits N1 to N4.** Apply them, and correct each `change` field they touch.
- **Review c-b, E1 and X-n1; review c-d, fixes 1 and 3; review c-a, R2, F1, A1 and W1.** Apply them.

Of the readers' findings, apply those that a careful native writer would accept and that no earlier round rejected for a reason that holds. Among them:
- "For each approval in force of a wording" → "For each approval of a wording that is in force";
- "which only a line that withdraws an approval holds" → "which appears only in a line that withdraws an approval";
- "under an earlier release" → "in an earlier release";
- "ran from elsewhere before" → "previously ran from elsewhere"; "git raises a conflict" → "git reports a conflict";
- "On a commit, that directory holds" → "At a commit, that directory holds", since the proposal brings that agreed node into line as it changes;
- "the JSON Pointer to it" → "the JSON Pointer to that reference or kind";
- "a text that says what a failure … costs" → "text that says what a failure … costs";
- "every change that an owner made" → "every change that an owner has made";
- "the rules that this commit includes" → "the rules that that one commit includes", or another wording that points to the assumed commit.

Keep "the values gathered beside a field" (rule 12.9) and the other phrases that earlier rounds kept for reasons that hold. Add a "Round d" section to `group6-notes.md`, placed first. Then write `english-group6d.md`, which holds only the sentences that round d changed, each under its key.

## The page

Build the owner's page for group 6 as group 5's was built:
- `group6-assessments.json`: the «Оценка» of each key, five lines per key, in the form of `group5-assessments.json`. Take each key's lines from its latest report, `review-g6c-a.md` to `review-g6c-d.md`. Where a line reports a problem that round d fixed, write the line as it holds after round d, with the nodes it was compared with.
- `group6-ru.json` and `build-group6-ru.mjs`: the Russian of everything the page shows in its Russian parts and the drafts hold only in English, in the form of `group5-ru.json`, including the new `removed` entries.
- `gen-group6-page.mjs`, adapted from `gen-group5-page.mjs`, which writes `group6-page/index.html`.

The page follows the rules that group 5's page followed:
- **Each node in full:** each key of the group is one section, with its wording in English and in Russian. A proposal shows the agreed wording beside the new one. Then come what changed, its «Оценка» and what is bound to the node.
- **The order:** the section "The approvals of nodes" and its four nodes; then the entries of the settings that only an owner changes, approving the specification, turning the `strict` flag on and withdrawing the choice of an extension; then "Setting a repository up and taking SpecSheriff out of it"; then the two proposals on agreed nodes.
- **What changed:** «Что изменилось» says, in Russian, what the node said before and what it says now, place by place. A new node is marked as new, and each new node split out of "How an approval is recorded" says so. A new example of an approved node is marked «Новое: у одобренного узла примеров не было». No round, no reviewer and no report is named anywhere on the page.
- **Words:** the Russian says «ответственный», never «владелец», for the owner of a node.
- **The end of the page:** the group has no question for the owner. Say so in one paragraph, as group 3's page did, and end with «Согласны с группой 6?».
- **Before that:** a list of the nodes outside the group that change only to carry out a decision, each with one line on what changes. Leave out what is deferred to a later group, to the next change of a node, or to stage 3.
- **Style:** the page opens dark, as group 5's does.

Do not publish the page, and do not touch `.ai_docs/INDEX.md` or anything under `specs/`. Report, as your final message:
- the keys that round d changed, and the findings it rejected, with the reason for each;
- the files you wrote;
- anything the page could not show as these rules ask.
