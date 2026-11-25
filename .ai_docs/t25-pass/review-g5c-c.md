**s-c2r9jndrjbtbsv6, "What a RecordType variant must agree with" (item 45, tools 7.1.16)**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✓ (the "part" is now the one the location names, so it means the same under answer А and answer Б)
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓ ("fields that select a variant" is the wording of row 12.12.8)
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✗ "in the same section of the base specification" does not cite s-5x737t9nee4zgaa at its first use (finding 1)
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
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
- согласованность: ✓ Сверено с 12.6 (s-z3dnru6qqdf9m6j) и его решениями от 2026-11-16 и 2026-11-19, а также с 12.1, 12.2, 12.3a и 12.10. Сверено с 3.1: раздел контрактов — раздел базовой спецификации, поэтому второе условие покрывает и случай из 12.6, когда RecordType объявлен в контрактах. Сверено со строками 12.12.4–12.12.10 и их решениями и с согласованными предложениями по s-kag2m9tzdnduxdx и s-sn6au3vcr9uy5pm. Сверено с recordtype.schema.json: `chosenBy` не бывает пустым, а значение в `answersTo` — одна строка. Сверено также с s-xzcw3hv4hmxz7h7, s-5nf87c3e3jg9v7c, s-dk3zfkbhc3v6xbp и принципами.
- целостность: ✓ impl.json отдаёт строки 12.12.4–12.12.10 этому узлу. s-5nf87c3e3jg9v7c ссылается на этот узел и остаётся верным. Ближайший раздел определён через расположение узла, поэтому ответ А или Б по источнику `parts` этот узел не затрагивает. Другие узлы менять не нужно.
- целесообразность: ✓ Проблема названа в полях `change` и `stage3`: код берёт первую связь `refines`, привязывает вариант к части, которая объявила значение, и считает поля типа `variant`. Узел решает её так, как требуют строки 12.12.4–12.12.10, без лишнего.
- избыточность: ✓ не найдена. Сверено с 12.6, строками 12.12.4–12.12.10, s-3anv9qcmx8pwp2w и s-dk3zfkbhc3v6xbp.
- недостаточность: ✗ Не сказано, входят ли в поля, которые RecordType «берёт через `refines`», поля вариантов того RecordType, который он уточняет. От этого зависит, заметит ли четвёртое условие повтор имени поля (находка 2).

**Verdict: not ready.** It needs one fix, which the author can make, and after it the node is ready. Round c applied every finding of review b-c and the readers' findings, or rejected them for reasons that still hold. It introduced no new defect.

1. **WORDING FIX** (the author can fix it; rule 7.2.7). The other drafts cite s-5x737t9nee4zgaa for "base specification", for example s-5nf87c3e3jg9v7c and s-yprj7d6tnvauggr; this draft does not. Add a `cites` link to s-5x737t9nee4zgaa and write:
   - EN: "it is declared in the same section of the base specification (§s-5x737t9nee4zgaa) as its RecordType (§s-vtpxwqe7ncmn5bz): …"
   - RU: «он объявлен в том же разделе базовой спецификации (§s-5x737t9nee4zgaa), что и его RecordType (§s-vtpxwqe7ncmn5bz): …»

2. **DOUBT** (only the owner can answer it, when item 56 is drafted; it does not hold up this node). Take a RecordType `B` that refines `A` and has no `chosenBy`. `A`'s fields then select `B`'s variants, which 12.6 allows.
   - A variant of `A` for `email` declares `address`, and a variant of `B` for `email` also declares `address`. Every condition in the node accepts both.
   - On the page the owner accepted, `refines` becomes `allOf` with `$ref`. So a data record of `B` with `email` would get `address` from both variants (inference).
   - Record this under "Changes still needed outside the group", for item 56 and row 12.12.7.

3. **TERM:** no new term. The earlier glosses stay in the docs only.

**[check] points.** "Exactly one" holds, by 12.6 and 12.10. "Character for character" also holds. JSON Schema compares the names of properties as strings (unverified in this run). The ruling of 2026-10-30 covers only the names of RecordTypes. None of the gaps the notes list is a defect of this draft.

**Only the owner can answer:** finding 2, when item 56 is drafted.

The draft is in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`.
