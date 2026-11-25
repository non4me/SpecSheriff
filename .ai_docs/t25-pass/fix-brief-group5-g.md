# T25, stage 2, group 5: round g, the readers' last findings

EngStickler's readers read round f, in `english-g5f-fast.md` and `english-g5f-thorough.md`. Apply the fixes below with `fix-group5-g.mjs`, idempotent from a backup `tools-drafts.before-group5-g.json`, as in earlier rounds. Each changes only the English, or brings the Russian into line with an English sentence whose meaning stays as the owner will read it. Then rebuild the page with `build-group5-ru.mjs` and `gen-group5-page.mjs`, add a short "Round g" section to `group5-notes.md`, placed first, and write `english-group5g.md` with only the sentences that round g changed, each under its key. Do not publish the page, and do not touch `.ai_docs/INDEX.md` or anything under `specs/`.

- **Item 42, text.** "every other" reads as "every second". Write "refuses any other JSON file of the technical appendix (§s-tj38pvm38nepaf5) under `specs/tech/`, and names that file."
- **Item 44, text.** The chain starts at a field that it does not "reach", so a chain that comes back to its first field was not covered. Write: "A chain never ends if it comes back to a field that is already in it." / «Цепочка никогда не заканчивается, если возвращается к полю, которое в ней уже есть.»
- **Item 45, text.**
  - "the refusal also names each of the other RecordType variants of its RecordType that have the same `answersTo`."
  - Keep "can name different fields in their `chosenBy`", and replace "In that case," with "Where they do," («Если называют,»), so that the refusal plainly depends on the fields being different.
- **Item 46a, text.** "The name of each of the other parts is its title." The Russian stays.
- **Item 46b, reason.** "So, if `sheriff validate` accepted a field that has no values, or whose values break the rules about their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), the code generated from that field would inherit the field's defect." / «Поэтому, если бы `sheriff validate` принимал поле без значений или со значениями, которые нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), код, сгенерированный из этого поля, унаследовал бы его изъян.»

Rejected, with the reason to record in the notes:
- **Item 47, "stays silent about" → "reports nothing about".** The owner's rule "A rule says what holds, not what does not hold" prefers the positive verb, and both readers translated the sentence as meant («молчит», «ничего не сообщает»).
- **"refuses" → "rejects".** "Refuses" is the verb of every agreed node for what `sheriff validate` does not accept.

Report, as your final message: the keys you changed and the files you wrote.
