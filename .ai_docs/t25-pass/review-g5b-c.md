**s-c2r9jndrjbtbsv6, "What a RecordType variant must agree with" (item 45): not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✗ "the part of the base specification that holds it". Here the phrase means the part that a location names, such as `base`. Under answer A, s-5nf87c3e3jg9v7c uses the same phrase for a top-level section when the project has no Domains extension (finding 3).
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓ ("fields that select a variant" is the wording of row 12.12.8)
- 7.2.4.4 Properties ✗ "it refuses an `answersTo` that gives a field more than one value" does not name whose `answersTo` it is (finding 2).
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✗ "against its RecordType": the node never cites 12.1 (s-7vm323mhry2enx3), which defines RecordType (finding 4).
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
- согласованность: ✗ Абзац о двух одинаково близких RecordType при буквальном чтении отвергает вариант и тогда, когда ближе есть RecordType с `chosenBy`. Это противоречит абзацу 2 и решению 1 координатора (находка 1). Поле `change` абзаца 2 расходится с кодом (находка 5). Других противоречий нет: сверено с 12.6, 12.1, 12.3a, 12.10, 3.1, 6.1, строками 12.12.4–12.12.10 и их решениями, s-3anv9qcmx8pwp2w, s-dbk2vyeg8z5jxna, recordtype.schema.json и принципами.
- целостность: ✗ При ответе A пункт s-5nf87c3e3jg9v7c в проекте без Domains называет частями разделы верхнего уровня. Тогда для RecordType вне разделов «часть, которая его содержит» не определена (находка 3). impl.json (строки 12.12.4–12.12.10) и s-5nf87c3e3jg9v7c, который ссылается на этот узел, остаются верны.
- целесообразность: ✓ Проблема названа в `stage3`: код берёт первую связь `refines`, привязывает вариант к части, объявившей значение, и считает поля типа `variant`. Решение прямо следует строкам 12.12.4–12.12.10.
- избыточность: ✓ не найдена; сверено с 12.6, строками 12.12.7 и 12.12.8, s-3anv9qcmx8pwp2w, s-dk3zfkbhc3v6xbp и s-xzcw3hv4hmxz7h7.
- недостаточность: ✗ «Цепочка связей `refines`» не говорит, что ближайший RecordType с `chosenBy` ищется по всем связям `refines`. А RecordType может уточнять ещё и фрагмент формата (12.10) (находка 1).

**Verdict: passes after the fixes below.** The author can make all of them.

1. **WORDING FIX** (the author's own sentences). As worded, "two RecordTypes equally near" also refuses a variant when a nearer RecordType has a `chosenBy`. Ruling 1 does not ask for that. "Under the first condition" reads as attached to "refines", not to "refuses". Replace the last sentence of paragraph 2 and the sentence on the tie; `stage3` should follow:
   - "Where it names none, they are those named in the `chosenBy` of the RecordType that has a `chosenBy` and that it reaches through the fewest `refines` links." / «Если он их не называет, это поля из `chosenBy` того RecordType с `chosenBy`, к которому от него ведёт наименьшее число связей `refines`.»
   - "Where a RecordType names nothing in its `chosenBy`, and two RecordTypes that have a `chosenBy` and that it reaches through the fewest `refines` links name different fields in theirs, `sheriff validate` refuses, under the first condition, each RecordType variant that refines it." / «Если RecordType ничего не называет в своём `chosenBy`, а два RecordType с `chosenBy`, к которым от него ведёт наименьшее число связей `refines`, называют в своих `chosenBy` разные поля, `sheriff validate` отвергает по первому условию каждый вариант RecordType, который его уточняет.»
2. **WORDING FIX:** "it refuses a RecordType variant whose `answersTo` gives…" / «он отвергает вариант RecordType, у которого `answersTo` даёт…».
3. **WORDING FIX:** "Where no section holds a RecordType, the part of the specification that its location names (§s-kag2m9tzdnduxdx) is treated as its nearest section." / «…его ближайшим разделом считается часть спецификации, которую называет его расположение (§s-kag2m9tzdnduxdx).» This works under both answer A and answer B.
4. **WORDING FIX:** "against its RecordType (§s-7vm323mhry2enx3)" / «с его RecordType (§s-7vm323mhry2enx3)», with a `cites` link.
5. **The `change` of paragraph 2** says the meaning is unchanged and that the code already works this way. In fact the code takes the first `refines` link (validate.ts:312). Replace «Без изменений по смыслу.» and «Так код и делает сейчас.» with «Новое: RecordType варианта — тот из уточняемых им RecordType, у которого есть поля, выбирающие вариант. Код сейчас берёт первую связь `refines`.»

**Points marked [check]:** the reading "exactly one" holds, and so does comparing names character for character. Every finding of round a was applied or rejected for a reason that holds. None of the gaps the notes list is a defect of this draft.

**The owner's question** is put in terms of what a person sees, and each option has its cost. One risk of A is missing: "part of the base specification" would mean a section in s-5nf87c3e3jg9v7c but a folder in the node on locations. Fix 3 keeps that clash out of this node.

**Only the owner can answer:** nothing from item 45 beyond the pending question on A or B.

The draft is in D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json.
