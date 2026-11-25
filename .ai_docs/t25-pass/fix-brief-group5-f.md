# T25, stage 2, group 5: round f and the owner's page

The check of round e found item 45 ready and item 46a one wording fix away. Its report is `review-g5e.md`, and its readers' reports are `english-g5e-fast.md` and `english-g5e-thorough.md`. Two steps remain before the owner sees the group: round f, then the page.

## Round f: the last fixes

Apply them with `fix-group5-f.mjs`, idempotent from a backup `tools-drafts.before-group5-f.json`, as in earlier rounds.

**Review e's findings 1 to 5**, in the reviewer's words:
- finding 1, the sentence on how the parts are named in item 46a;
- findings 2 and 3, the question;
- finding 4, the renaming in rule 8.5 under answer A, recorded in the notes;
- finding 5, item 45.

**The readers' findings to apply**, written as given here:
- **Item 42, text.** The clause on `specs/tech/` keeps pulling "names" onto "which". Write: "`sheriff validate` refuses every other JSON file of the technical appendix (§s-tj38pvm38nepaf5) under `specs/tech/`, and names that file."
- **Item 42, reason.** "…holds an implementation that the reader will not find."
- **Item 44, text.** "A chain never ends if it comes back to an identifying field that it has already reached." / «Цепочка никогда не заканчивается, если возвращается к идентифицирующему полю, до которого уже доходила.»
- **Item 45, text.** "…that refines the RecordType that has no `chosenBy`…", in place of "…without a `chosenBy`…".
- **Item 46a, example 2.** "The most likely mistake is to use the title “Contracts” as a value in place of `contracts`."
- **Item 46b, reason.** "that mistake" has nothing to point back to. Write: "So the generated code would inherit the defect of a field that has no values, or whose values break the rules about their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh)." Keep the Russian in step with it.
- **Item 47, text.** "to another pass" reads as a noun phrase, and "leaves … unreported" was flagged in round c. Write: "`sheriff validate` stays silent about a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases (§s-8ht2hn88cu2qwz9):". The Russian «не сообщает о ссылке … только в следующих случаях» already says this.

Reject the other readers' findings of round e, giving the reason for each in the notes. Among them: "So" in item 41's reason, which is the agreed drafts' way of drawing a consequence, and "a single number", which the agreed s-4bwa4zepd4nwcv8 and item 47 use.

Add a "Round f" section to `group5-notes.md`, placed first. Then write `english-group5f.md`, which holds only the sentences that round f changed, each under its key, so that EngStickler's readers can read them.

## The page

Build the owner's page for group 5 as group 4's was built:
- `group5-assessments.json`: the «Оценка» of each key, five lines per key, in the form of `group4-assessments.json`. Take each key's lines from its latest report: `review-g5e.md` for items 45 and 46a, `review-g5d-a.md` to `review-g5d-d.md` for the other items. For item 46a, the lines of review e say «✓ при ответе А»: keep that condition.
- `group5-ru.json` and `build-group5-ru.mjs`: the Russian of everything the page shows in its Russian parts and the drafts hold only in English, in the form of `group4-ru.json`.
- `gen-group5-page.mjs`, adapted from `gen-group4-page.mjs`, which writes `group5-page/index.html`.

The page follows the rules that group 4's page followed:
- **Each node in full:** each key of the group is one section, with its wording in English and in Russian. A proposal shows the agreed wording beside the new one. Then come what changed, its «Оценка» and what is bound to the node.
- **The order:** the drafts of items 41 to 47 in the order of the review, with item 46b right after item 46a.
- **What changed:** «Что изменилось» says, in Russian, what the node said before and what it says now, place by place. A new node is marked as new, and item 46b also says that it was split out of item 46a. It describes the final wording against the current wording, never the history of the rounds: no round, no reviewer and no report is named anywhere on the page.
- **Words:** the Russian says «ответственный», never «владелец», for the owner of a node.
- **The question:** at the end of the page, the one question that only the owner can answer, on the `parts` source, as `group5-notes.md` holds it after round f. It gives the recommendation first, then each option with what a person sees and what it costs.
- **Before the question:** a list of the nodes outside the group that change only to carry out a decision, each with one line on what changes. Include the renaming of "a part of the base specification" to "a folder of the base specification" in the agreed proposal on rule 8.5 and in the agreed node on what the reviewer judges when a node of the technical appendix is approved, and say that it is made only if the owner chooses A. Leave out what is deferred to a later group or to stage 3.
- **Style:** the page opens dark, as group 4's does.

Do not publish the page, and do not touch `.ai_docs/INDEX.md` or anything under `specs/`. Report, as your final message:
- the keys that round f changed, and the findings it rejected, with the reason for each;
- the files you wrote;
- anything the page could not show as these rules ask.
