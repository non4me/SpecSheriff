# T25, stage 2, group 4: round e and the owner's page

The final review found all twelve drafts ready. Its reports, `review-g4d-a.md` to `review-g4d-d.md`, leave only nits, and its readers' reports are `english-g4d-fast.md` and `english-g4d-thorough.md`. Two steps remain before the owner sees the group: round e, then the page.

## Round e: the nits

Apply every nit that the four final reports give, with `fix-group4-e.mjs`, idempotent from a backup `tools-drafts.before-group4-e.json`, as in earlier rounds. That covers:
- the wording fixes, such as N1 and N2 of review d-c and N1 of review d-d;
- the fixes to `change`, `question` and `stage3` fields and to the notes;
- review d-d's N2, recorded under "Changes needed outside the group".

Of the readers' findings on round d, apply those that a careful native writer would accept and that no earlier round rejected for a reason that holds. Examples:
- "point at another node" → "point to another node";
- "the section of the technical appendix … for the stack" → "… on the stack";
- "printed on its standard output" → "printed to its standard output";
- "A rule that has never been approved lists nothing" → "A rule that has never been approved counts as listing nothing". Both readers have now flagged this sentence twice.

Keep the phrases kept from groups 1 to 3, as before.

Add a "Round e" section to `group4-notes.md`, placed first. Then write `english-group4e.md`, which holds only the sentences that round e changed, each under its key, so that EngStickler's readers can read them.

## The page

Build the owner's page for group 4 as group 3's was built:
- `group4-assessments.json`: the «Оценка» of each key, taken from the final reports `review-g4d-*.md`, five lines per key, in the form of `group3-assessments.json`;
- `group4-ru.json` and `build-group4-ru.mjs`: the Russian of everything the page shows in its Russian parts and the drafts hold only in English, in the form of `group3-ru.json`;
- `gen-group4-page.mjs`, adapted from `gen-group3-page.mjs`, which writes `group4-page/index.html`.

The page follows the rules that group 3's page followed:
- **Each node in full:** each key of the group is one section, with its wording in English and in Russian. A proposal shows the agreed wording beside the new one. Then come what changed, its «Оценка» and what is bound to the node.
- **The order:** the eight drafts of items 33 to 40 in the order of the review, then row 10.1.37a, then the three proposals to change agreed nodes (rule 10.12, row 10.1.41 and `new:tools-1-project`).
- **What changed:** «Что изменилось» says, in Russian, what the node said before and what it says now, place by place. A new node is marked as new. It describes the final wording against the current or agreed wording, never the history of the rounds: no round, no reviewer and no report is named anywhere on the page.
- **Words:** the Russian says «ответственный», never «владелец», for the owner of a node.
- **The question:** at the end of the page, the one question that only the owner can answer, on merge commits, as `group4-notes.md` holds it. It gives the recommendation first, then each option with what a developer sees and its cost.
- **Before the question:** a list of the nodes outside the group that change only to carry out a decision, each with one line on what changes. Use the notes' "Changes needed outside the group" for this, and leave out what is deferred to a later group or to stage 3.
- **Style:** the page opens dark, as group 3's does.

Do not publish the page, and do not touch `.ai_docs/INDEX.md` or anything under `specs/`. Report, as your final message:
- the keys that round e changed, and the findings it rejected, with the reason for each;
- the files you wrote;
- anything the page could not show as these rules ask.
