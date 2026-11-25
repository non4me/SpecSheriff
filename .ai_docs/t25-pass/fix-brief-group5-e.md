# T25, stage 2, group 5: round e, the last fixes

The check of round d found items 41 to 45, 46b and 47 ready, with nits only, and item 46a not ready. Its reports are `review-g5d-a.md` to `review-g5d-d.md`, and the readers' reports are `english-g5d-fast.md` and `english-g5d-thorough.md`, all in `D:/SpecSheriff/.ai_docs/t25-pass/`.

Apply them with `fix-group5-e.mjs`, idempotent from a backup `tools-drafts.before-group5-e.json`, as in earlier rounds. Add a "Round e" section to `group5-notes.md`, placed first, that says for each finding what was done or why it was rejected. Then write `english-group5e.md`, which holds every sentence that round e changes, each under its key, for EngStickler's readers. Do not touch `.ai_docs/INDEX.md` or anything under `specs/`.

## Item 46a and the question

Apply review d-d's findings 1 and 2. Both follow from agreed nodes, so they are the author's to make, and the drafts keep answer A.
- **Finding 1.** The agreed rule 3.1 and the agreed s-zefk589ykh37b8u make the contracts section one section, kept in the folder `specs/contracts/`. So, without the Domains extension, the parts are the contracts section, named `contracts` after its folder, and the sections whose location is `base/` followed by a single number, each named by its title. Use the reviewer's wording for the paragraph and for example 2, and make the changes to the question that the finding lists.
- **Finding 2.** The agreed s-ygg5kpcxgzq3m7w already calls `base`, `contracts` and a domain "a folder of the base specification". So, under answer A, the two agreed nodes that call the same thing "a part of the base specification" take the word "folder" instead: the proposal on rule 8.5 (s-kag2m9tzdnduxdx) and s-4bwa4zepd4nwcv8, the node on what the reviewer judges when a node of the technical appendix is approved. The meaning of neither node changes, so choosing A also decides this renaming, and the owner does not see those nodes again. State this in the cost of A, in the reviewer's words, naming each node by what it says rather than by its sid. Record the renaming under "Changes still needed outside the group", to be made once the owner has chosen A.
- Add «сохранённые записи с прежними значениями перестанут проходить RuntimeCheck» to the risk of A about a project that later chooses the Domains extension, and to the cost of B.
- In example 2, write the field's values as the values of the field, so that the sentence does not read as giving the field a title. For example: "The values of that field are `contracts`, “Requests” and “Users”, each with the sid of the node that it comes from."

## The nits and the readers' findings

Apply every nit of `review-g5d-a.md`, `review-g5d-b.md` and `review-g5d-c.md`, and every finding of the readers that a careful native writer would accept and that no earlier round rejected for a reason that holds. Among them:
- **Item 41:** "would refuse changes after which no domains use one another in a cycle", as review d-a gives it.
- **Item 42:** "refuses any other JSON file under `specs/tech/`, which holds the technical appendix (§s-tj38pvm38nepaf5), and names that file"; "that reader" in place of "such a reader"; the Russian «не найдёт».
- **Item 43:** "the rule about a domain's level".
- **Item 44:** both readers read "of one RecordType a second time" as unclear, and round c's reader rejected "the same RecordType". Write instead: "A chain that comes back to an identifying field that it has already reached never ends." / «Цепочка, которая возвращается к идентифицирующему полю, до которого уже доходила, никогда не заканчивается.»
- **Item 45:** "also names every other RecordType variant that has the same `answersTo`"; "each of the other conditions". Rewrite the sentence on RecordTypes that name different fields, so that "links name" no longer reads as a noun phrase and the refusal is plainly of every variant that refines the RecordType without a `chosenBy`. Keep round b's ruling and the words "that it reaches through the fewest `refines` links".
- **Item 46b:** "pass that mistake on"; "the rules about their source".
- **Item 47:** the opening sentence must keep the word "only" before the list, as the owner's rule "A rule says what holds, not what does not hold" requires of a list of the only cases. Make it read without a long noun phrase between the verb and "unreported", for example: "`sheriff validate` lets a reference from one RecordType (§s-7vm323mhry2enx3) to another pass without a report only in the following cases (§s-8ht2hn88cu2qwz9):". In the example, write the last sentence so that it plainly describes a field: "A field `user` that holds only a user's identifier, with no reference to the RecordType of a user, has the type `string` and no `identifierOf`."

Report, as your final message: the keys you changed, the final text of the question for the owner, and the findings you rejected and why.
