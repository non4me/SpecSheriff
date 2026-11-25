**s-c2r9jndrjbtbsv6, "What a RecordType variant must agree with" (item 45, tools 7.1.16)**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✓ ("the part of the specification that its location names" has one meaning under answer А and under answer Б)
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓ ("fields that select a variant" is the wording of row 12.12.8)
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✓ ("base specification" now cites s-5x737t9nee4zgaa, and a link backs the citation)
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓ (the sentence with "since" is a condition with its cause, a form the agreed s-qqs2svksmjct753 also uses)
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test of the reason ✓

**Оценка**
- согласованность: ✓ Сверено с 12.6 (s-z3dnru6qqdf9m6j) и его решениями от 2026-11-16 и 2026-11-19, со строками 12.12.4–12.12.10 и их решениями, с 12.1, 12.10 и 3.1, с согласованными проектами s-sn6au3vcr9uy5pm и s-kag2m9tzdnduxdx, с recordtype.schema.json, с s-5nf87c3e3jg9v7c, s-dk3zfkbhc3v6xbp, s-3anv9qcmx8pwp2w, s-xzcw3hv4hmxz7h7 и с принципами. Имена полей сравниваются посимвольно, как в JSON Schema 2020-12.
- целостность: ✓ impl.json отдаёт строки 12.12.4–12.12.10 этому узлу. s-5nf87c3e3jg9v7c ссылается на этот узел и остаётся верным. Ответ А или Б по источнику `parts` узел не затрагивает. Другие узлы менять не нужно.
- целесообразность: ✓ Проблема названа в `change` и `stage3`: код берёт первую связь `refines`, привязывает вариант к части, которая объявила значение, и считает поля типа `variant`. Узел решает её так, как требуют строки 12.12.4–12.12.10.
- избыточность: ✓ не найдена. Сверено с 12.6, строками 12.12.7 и 12.12.8, s-3anv9qcmx8pwp2w и s-dk3zfkbhc3v6xbp.
- недостаточность: ✓ в узле не найдена. В строках 12.12.6 и 12.12.7 есть пробел: поля, которые вариант берёт из фрагмента формата, не проверяются. Он относится к пункту 56, как и находка 2 ревью c-c.

**Verdict: ready.** Only nits are left. Round d applied finding 1 of review c-c and recorded its finding 2 outside the group. It also dealt with every reader's finding on this node, and each rejection gives a reason that holds. It added no new defect to the English.

1. **WORDING FIX** (nit; the author can fix it). In round d the English changed "it" to "the refusal", but the Russian still says «он», right after «вариант RecordType». It is only a nit because a reader still takes «он» to mean «отказ», the subject of the sentence before. RU: «Для последнего условия отказ называет также каждый другой вариант RecordType с тем же `answersTo`.»
2. **CUT** (nit; the author can make it). In the `change` of the paragraph on two equally near RecordTypes, delete «Если таких RecordType больше двух, правило то же, и отказ называет каждый.» The word «несколько» already says this, and «больше двух» refers to a wording the owner never saw.
3. **Nit, no change proposed.** The reason says data records have one set of fields "only where" each variant agrees with its RecordType. That holds for conditions 1 and 4 to 7. Conditions 2 and 3 serve the other aims of rule 12.6. The reason speaks of the rule as a whole, which is acceptable.
4. **TERM:** no new term.

**The [check] points hold.** Rule 12.10 lets a variant also refine a fragment of a format, so "exactly one" is needed. JSON Schema 2020-12 core (section 4.2.2) treats two strings as equal only if they match code point for code point. The `fieldName` pattern allows only ASCII names, so comparing character for character gives the same result. None of the gaps in the notes is a defect of this draft.

**To add outside the group** (item 56, beside finding 2 of review c-c): rows 12.12.6 and 12.12.7 look only at the variant's own `schema`.
- A variant that also refines a fragment takes on the fragment's fields, and nothing compares them with its RecordType's fields.
- A variant that adds fields only through a fragment fails condition 3.

**Only the owner can answer:** nothing for this node now.

The draft is in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`.
