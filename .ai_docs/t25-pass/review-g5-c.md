**s-c2r9jndrjbtbsv6, "What a RecordType variant must agree with": not ready**

The skill was in context. My input file holds only item 45.

**Checklist**
- 1.2.3 ✓
- 7.1 ✓
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✓
- 7.2.4 ✗ "A RecordType variant is a RecordType that names, in its `answersTo`, the values…": this defines the name more broadly than 12.6, which also requires the `refines` link and the place.
- 7.2.4.1 ✓
- 7.2.4.2 ✓
- 7.2.4.3 ✗ The general word "variant" stands alone: "A variant that fails the first condition…" and, in the reason, "the variant whose values it holds". The owner ruled on 2026-11-05 that it is always "a RecordType variant".
- 7.2.4.4 ✓
- 7.2.4.5 ✓
- 7.2.5 ✓
- 7.2.6 ✓
- 7.2.7 ✗ Three terms are used before they are explained:
  - "`answersTo`" is first used in item 5 and explained only in paragraph 4.
  - "fields that select a variant" in item 1 cites row 12.12.4, which does not define it.
  - "declares" is first used in items 3–4 and explained only in paragraph 5.
- 7.3.1 ✓
- 7.3.2 ✓
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✓
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✓
- Pairing test ✓

**Оценка**
- согласованность: ✗ Абзац 3 говорит, что каждое из остальных условий сравнивает вариант с его RecordType. Третье условие («хотя бы одно поле») этого не делает. Кроме того, абзац 4 определяет вариант шире, чем 12.6. С 12.3a, 12.10, 3.1, 6.1, строками 12.12.4–12.12.10, s-dbk2vyeg8z5jxna и s-vke5hakwf3uyrjs противоречий нет.
- целостность: ✓ impl.json, s-5nf87c3e3jg9v7c, s-dk3zfkbhc3v6xbp, обоснование 12.7.
- целесообразность: ✓ Проблема названа: код берёт первую связь `refines`, привязывает вариант к части, объявившей значение, и считает поля типа `variant`.
- избыточность: ✗ «Поля RecordType — те, что он объявляет, и те, что он берёт через `refines`» повторяет строку 12.12.7 и ту же фразу в s-3anv9qcmx8pwp2w.
- недостаточность: ✗ Не сказано, кто проверяет «ровно одно значение» из строки 12.12.8. «Ближайший RecordType выше» неоднозначен, когда на одном расстоянии два RecordType называют `chosenBy`.

**Findings**

All findings are the author's to fix, except the DOUBT.

1. **WORDING FIX.** Paragraph 3 is false. Replace it:
   - EN: "Where a RecordType variant fails the first condition, `sheriff validate` checks it only against the third, since each of the others compares the variant with its RecordType."
   - RU: «Если вариант RecordType не выполняет первого условия, из остальных `sheriff validate` проверяет только третье, потому что каждое из других сравнивает вариант с его RecordType.»
   - Add to `stage3`: drop the `continue` at validate.ts:384-386.

2. **WORDING FIX.** Restructure the opening so the definitions come before the list.
   - Open with:
     - EN: "Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` checks each RecordType variant (§s-z3dnru6qqdf9m6j) against its RecordType."
     - RU: «…`sheriff validate` сверяет каждый вариант RecordType (§s-z3dnru6qqdf9m6j) с его RecordType.»
   - Then paragraph 4, with its first sentence replaced:
     - EN: "`sheriff validate` treats as a RecordType variant each RecordType that names, in its `answersTo`, the values that it corresponds to."
     - RU: «Вариантом RecordType `sheriff validate` считает каждый RecordType, который называет в своём `answersTo` значения, которым он соответствует.»
   - Then the sentence on `schema`.
   - Then the list, introduced by:
     - EN: "It accepts a RecordType variant only where all of the following hold:"
     - RU: «Он принимает вариант RecordType, только если выполнено всё следующее:»
   - In item 4, write "every field that its RecordType declares or takes through `refines` from another RecordType" (RU: «любого поля, которое его RecordType объявляет или берёт через `refines` из другого RecordType»).
   - Delete "The fields of a RecordType are…".

3. **WORDING FIX** to the reason:
   - EN: "…together with those of the RecordType variant that corresponds to its values… Only where every RecordType variant agrees…"
   - RU: «…вместе с полями того варианта RecordType, который соответствует её значениям… Только если каждый вариант RecordType согласуется…»

4. **WORDING FIX.** Add this sentence and a `cites` link to s-xzcw3hv4hmxz7h7:
   - EN: "`sheriff validate` refuses an `answersTo` that gives a field more than one value when it validates the files against the schema of the specification (§s-xzcw3hv4hmxz7h7, §s-swturmy7hmhfvt4)."
   - RU: «`sheriff validate` отвергает `answersTo`, который даёт полю больше одного значения, когда проверяет файлы по схеме спецификации (§s-xzcw3hv4hmxz7h7, §s-swturmy7hmhfvt4).»

5. **WORDING FIX**, Russian only:
   - «какое из условий» becomes «какие из условий».
   - «в том виде, в каком их собирают» becomes «которые собирают».

6. **CUT** in the example: replace "for both reasons" so that it names them.
   - EN: "…refuses it, since `sms` is not a value of `channel` and `notification` takes `text` from `message`."
   - RU: «…отвергает его, потому что `sms` — не значение `channel`, а `notification` берёт `text` из `message`.»

7. **DOUBT** (owner): which fields select a variant when a RecordType refines two RecordTypes at the same distance and both name `chosenBy`?

8. **TERM:** no rename. A RecordType variant is a branch of a discriminated union, as the owner's own gloss of 2026-10-25 says. `chosenBy` corresponds to OpenAPI `discriminator.propertyName` (unverified). `refines` here means what [AM4] calls specialization; the fit is partial, and 6.1 covers it. A gloss is enough.

**[check] points**
- "Exactly one" holds, by 12.6 and 12.10.
- "Character for character" holds: JSON Schema 2020-12 §4.2.2 compares strings code point for code point. The ruling of 2026-10-30 on letter case concerns only RecordType names.
- "Nearest section" holds, by 12.3a.

None of the gaps the notes list is a defect of this draft. One more gap, outside the group: no row of table 12.12 checks that `chosenBy` names a field of its RecordType.

**For the owner:** finding 7.

The draft is in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`.
