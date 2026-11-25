# T25: round e of the questions about the base specification — the English only

Round e fixes the English of `base-questions.md` after round d. Three reports read it:
- `english-bqd-fast.md` and `english-bqd-thorough.md`, EngStickler's two readers on the paragraphs that round d changed;
- `english-bqd-new29.md`, the fast reader on `new29.md`, your draft of proposal 2.9, whose text is now in the file.

Round e changes no meaning. Where a finding would change what a wording means, do not apply it: list it in your report, with the reason. Before you start, copy the file to `base-questions.before-e.md`, and add a section "Round e" to `base-questions-notes.md`. Edit no node, make no commit, and do not touch `INDEX.md`, `tasks.md` or `t25-one-thought.md`.

## What to apply

Apply every finding in the "LANGUAGE" lists of the three reports, except these:
- "Integrity:" stays. It is the name that the owner gave to one of the five criteria («целостность»).
- "rename" stays where it names the change that a decision makes, as `fix-brief-bq-d.md` settled. Where a sentence says that a wording is renamed, write that the wording is replaced, as in 2.7's "the wording that change 1.3 replaces".
- "The system's implementing code" in row 10.1.26 stays, as `fix-brief-bq-c.md` settled.
- "run in the following steps" in rule 10.12 stays: the rest of the rule refers to the steps.
- "is defined in a domain … if" and "A term node is in a domain if" stay in the present tense. A rule of the guidelines states what holds, so "must" is not used.
- Where a finding replaces a term that the specification already uses, such as "the section for the stack" or "the domain of users", look the term up in `moved/specs/_guidelines/spec.json` and keep the spelling that the agreed nodes use.
- "counts only the sids" (3.3): say what s-vke5hakwf3uyrjs does with those sids, in the words of that node.
- "counts for nothing" (4.5): write what it means, for example "although no check treats such a SpecTag as binding anything".
- "its present wording" and "its current wording": use the word that rule 1.3.5 and row 10.1.8 use, in both places.

Also resolve these readings that the readers found ambiguous:
- 1.3: put "without the phrase "carries no SpecTag"" next to "rewrites".
- 2.6: "whether it carries no SpecTag or carries only SpecTags that bind nothing, such as one that names a section".
- 2.8: "such a SpecTag" names two different SpecTags in two sentences. Name each one in words.
- 3.1: say that the skill `spec-init` runs `sheriff init`, and that the node describing it has only one `implements` link.
- 3.8: "the row" becomes "the proposed row", and "leave no other choice" says which choice is left.
- 4.3: "rule 1.5.2 already binds, by SpecTags at its start, a file …" puts "its" after "file". "the code of the same file" and "a file with such statements" name the file and the statements they mean.
- 4.4: "leave out the files" becomes "do not apply to the files". "these nodes agreed in group 7 change:" becomes "the following nodes, agreed in group 7, change:". Say whether the changed clauses of row 10.1.26 replace clauses of question 4.3's wording or are added to it.
- 4.5: "both halves" names the two restrictions of rule 10.10. "It also departs" becomes "Option B also departs".
- 4.6: "another domain's last citation of a shared term" says plainly that every domain but one stops citing the term.
- 4.7: "Risk: it departs" becomes "Risk: option A departs".

When round e is done, report what changed and list every finding that you did not apply, with the reason.
