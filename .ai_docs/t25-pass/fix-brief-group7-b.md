# T25, stage 2, group 7: round b, the first review applied

You apply the first review of the drafts of group 7. The brief for group 7, `briefs/t25-group7-brief.md`, still holds: its constraints, its lessons and the phrases of the owner's English.

## What to read

The six reports are in `D:/SpecSheriff/.ai_docs/t25-pass/`:
- `review-g7-a.md` to `review-g7-d.md`, the reports of the four specsheriff-rule-reviewer agents;
- `english-g7-fast.md` and `english-g7-thorough.md`, the findings of EngStickler's two readers.

Each file ends with the main session's decisions. Apply every finding that those decisions apply, in the words that the reports give. Where a reviewer replaces a whole sentence and a reader replaces a phrase in the same sentence, take the reviewer's sentence and apply the reader's phrase inside it where it still fits, such as "labelled with" for "shown by". Where `english-g7-fast.md` and `english-g7-thorough.md` give different words for one phrase, `english-g7-thorough.md` wins.

## The main session's decisions that change a draft beyond the reports' own words

1. **The order of the domains on the map follows the owner's ruling.** On 2026-11-14 the owner agreed that "the map orders its domains by the same rule" as the diagram of the domains (`t25-one-thought.md`, line 1063). So the branch `Base specification` holds the contracts section first, then the domains row by row from the top, each row in the order that `new:tools-4-diagram` gives, and the row `No level` last. Rewrite the example of `s-rpv4fkdqqguptqd` to show it.
2. **Item 56 gives a type to every schema that TypeScript and Python can express**, as the owner's rule "Maximum functionality over shortcuts" requires. Add these rows to the table, each with "—" as the neutral type of an earlier release:
   - `const`: the literal of its value, in TypeScript and in Python's `Literal[...]`;
   - `oneOf` or `anyOf`: the union of the types that its members give;
   - a `type` that lists several types: the union of the types that each gives;
   - an object with `properties`, written inline: an object type of its own, its fields given as the fields of a RecordType are given, written inline in TypeScript and as a nested `TypedDict` in Python;
   - `allOf`, written inline: the intersection in TypeScript; in Python, the fields of every member merged, as for `refines`.
   Then say that a schema that matches no row gives what `{}` gives. Choose the Python name of a nested `TypedDict`, state it in the node, and say in `stage3` what the code must do.
3. **New proposals on agreed nodes**, as the first lesson of the brief says:
   - on the list of commands (`proposal:s-f5rz6b7dhxejjts-g7`): add, at the first use in each line, the citations that rule 7.2.7 requires for SpecTag, RuntimeChecks, RecordType, todo, the approval status, the `strict` flag and the extensions of the guidelines. The `change` field lists each one. The owner's rule "An agreed node is brought into line with the rules when it changes, never in a sweep" requires this;
   - on "Project-wide settings" (`proposal:new-tools-1-settings-g3`), as review g7-c's finding 5 says;
   - on "The review of a commit" (s-vp24dqydygztqbt), as review g7-c's finding 6 says.
4. **Item 53 is split**, as review g7-c's finding 1 says. The new node gets a new sid, checked to be unique, under the key `new:tools-17-bindings-entry`. `proposal:s-dbk2vyeg8z5jxna-g7` cites the new node.
5. **Two questions for the owner.** Write them in `group7-notes.md` under "Questions for the owner". Each gives the recommendation and the ruling it rests on first, then each option with what a person sees, and every cost and risk that remains. The drafts assume the recommended answer, and the notes say which sentences change under the other answer.
   - **A node that has no title.** A node in a cell of a `TableRule` has no title (rule 8.6). Rule 13.1 says that the export and `sheriff show` name the node at the other end of a link by its sid, location and title, and rule 13.2 says that the map shows each node's title. Recommendation: such a node is shown by its location, and named in a link and in the list of gathered values by its sid and location. The other option: name it by the heading of its column and the text of its row, as rule 8.6 does. Either answer later changes rules 13.1 and 13.2, which waits until the appendix of the tools is done.
   - **`sheriff markdown` and `sheriff map` in a project that has not chosen the Views extension.** The agreed list of commands records this as open. Recommendation: the command refuses to run and names the Views extension, so that a person who runs it by hand learns why nothing was written. The other option: the command writes nothing, prints a notice and ends successfully. Under either answer, the hooks run the two commands only where the project has chosen the Views extension (item 57).
6. **Questions about the base specification** that this round adds to the seven in `group7-notes.md`:
   - question 8: whether rule 12.3 requires a validator that asserts `format` (review g7-c's finding 8). Item 53 keeps its sentence on `format` until then, without "not only as an annotation";
   - the change to rules 13.1 and 13.2 that the answer to the first question for the owner calls for.
7. **The readers' findings that only ask for more context** around a sentence whose earlier sentences or citations already give it are rejected, and your notes say so in one line each.

## What to write

1. `fix-group7-b.mjs`: on its first run, it copies `tools-drafts.json` to `tools-drafts.before-group7-b.json`; on every run, it rebuilds the group's keys from that copy. Run it twice, check that both runs give the same file, and check that no key outside the group and its new proposals differs from the copy.
2. `english-group7b.md`: the final English of every node and proposal that this round changes, each in full, under its key and title, for EngStickler's readers.
3. In `group7-notes.md`, a section "Round b" that says, for each finding of the six reports, how you applied it or why you did not. Update "Questions for the owner", "Questions for the base specification" and "Changes still needed outside the group".

Do not change anything under `specs/`, and do not touch `.ai_docs/INDEX.md`, `tasks.md` or `t25-one-thought.md`. Make no commit.

## Your final report

Short, in English: the keys changed or added, the two questions for the owner as the notes state them, and anything you could not settle.
