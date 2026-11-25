The skill `specsheriff-terminology-review` was already loaded. The checklist script ran. I compared both drafts with their round-b texts and with every report of round b. I also read the moved rules 12.7 to 12.12, 1.1.2, 3.1, 8.3 and 5.2, the agreed drafts they rely on, `recordtype.schema.json` and `values.ts`.

# Item 46a: `s-5nf87c3e3jg9v7c`, "Where the values of a field with `enum` are collected from"

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✗ This breach holds under answer A. The words are "the parts of the base specification are the sections whose location … is `base/` or `contracts/` followed by a single number".
  - The agreed s-4bwa4zepd4nwcv8 calls `base` "a part", with `base/3` a top-level section inside it ("the same part of the base specification").
  - The agreed 8.5 uses "a part of the base specification" for what a location starts with.
  - See finding 1.
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✓
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
- 7.6.3 Examples ✓ (finding 5 is a nit)
- Pairing test ✓

**Оценка**
- согласованность: ✗ При ответе А «части базовой спецификации» здесь — разделы `base/N` и `contracts/N`. В согласованных 8.5 и s-4bwa4zepd4nwcv8 часть — это `base`, `contracts` или домен, а `base/3` — раздел внутри неё. С 12.7, 12.8, 12.9, с 12.11 и его решением от 2026-11-18, с 3.1, s-ygg5kpcxgzq3m7w, s-zefk589ykh37b8u, s-ztseyetus7np6br, s-agc6fb3vx46pc23, s-a8fn72xa782wvbk и со схемой RecordType расхождений нет.
- целостность: ✗ При ответе А придётся переформулировать либо правило 12.11, либо 8.5 и s-4bwa4zepd4nwcv8. Заметки этого не называют. s-c2r9jndrjbtbsv6, s-dk3zfkbhc3v6xbp и s-ezq8csd433vj6fj остаются верны.
- целесообразность: ✓ Одинаковые значения нужны `reindex`, `validate`, проверке вариантов и `types`.
- избыточность: ✓ не найдена; сверено с s-zefk589ykh37b8u, s-ju5vcanbjph7mgh и s-ztseyetus7np6br.
- недостаточность: ✓ не найдена.

**Verdict: not ready.** The English text, the reason and the links need no change. The author can apply findings 2 to 4 without another review.

1. **DOUBT (for the owner; the author adds it to the question).** Review b-c reported this cost of answer A. Round c neither applied it nor rejected it.
   - Add to the costs of A: «В правиле 8.5 и в узле s-4bwa4zepd4nwcv8, которые вы согласовали, «часть базовой спецификации» — папка (`base`, `contracts` или домен), а `base/3` — раздел внутри неё. При варианте А в правиле 12.11 и в этом узле то же слово означает раздел `base/3`. Чтобы слово значило одно и то же, придётся переформулировать либо правило 12.11, либо эти два узла;»
   - Add to B: «Слово «часть базовой спецификации» значит то же, что в правиле 8.5 и в узле s-4bwa4zepd4nwcv8.»
   - My view (inference): this cost weakens the case for A.
2. **The question (author).** Under A, a contracts section whose terms sit at the top level of its files gives no value. s-ygg5kpcxgzq3m7w gives no term a number. Replace the bullet «если базовая спецификация не разделена…» with: «если в `specs/base/` или в `specs/contracts/` нет раздела верхнего уровня, например термины контрактов лежат прямо на верхнем уровне их файлов, эта папка не даёт ни одного значения, хотя в проекте с доменами контракты всегда дают `contracts`. Поле, у которого не осталось значений, `sheriff validate` отвергает по строке 12.12.12;»
3. **WORDING FIX (author, Russian only), example 1.** «записывает в `x-enumSource.gathered` поля `contracts`, `requests` и `users`» can also be read as "writes the fields contracts, requests and users". Use: «`sheriff reindex` записывает `contracts`, `requests` и `users` в `x-enumSource.gathered` этого поля.»
4. **WORDING FIX (author, `removed`).** Items 1 and 5 still give 46b its round-a title. Replace “The values and the source of a field with `enum`” with “Fields with `enum` that `sheriff validate` accepts”.
5. **Nit, example 2.** In "…of an audit log entry, whose `x-enumSource.from`…", "whose" stands next to "entry". It is a nit because only a field has `x-enumSource`, so the reader still finds the right noun.
   - EN: "The RecordType of an audit log entry has a field `part` whose `x-enumSource.from` is `parts`. The field gets the title of each of those sections, each with the sid of its section."
   - RU: «У RecordType записи журнала аудита есть поле `part`, `x-enumSource.from` которого — `parts`. Это поле получает название каждого из этих разделов вместе с sid этого раздела.»

The four [check] points on item 46 all hold. None of the gaps the notes record outside the group is a defect of these drafts. Every other finding of round b was applied in its reviewer's words or rejected for a reason that holds. Round c added no defect to the English. **TERM:** no new term since round b.

# Item 46b: `s-dk3zfkbhc3v6xbp`, "Fields with `enum` that `sheriff validate` accepts"

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✓
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
- Pairing test ✓

**Оценка**
- согласованность: ✓ 12.7, 12.8, 8.3, 5.2, строки 12.12.11–12.12.13 и их решения от 2026-11-19, s-czxaqvaesmu3gru, s-xzcw3hv4hmxz7h7, а также `uniqueItems` и запрет держать `enum` вместе с `x-enumSource` в recordtype.schema.json.
- целостность: ✓ Правка impl.json и отмена отказа validate.ts:354-356 названы в заметках. s-3anv9qcmx8pwp2w говорит о JSON Pointer теми же словами.
- целесообразность: ✓
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

**Verdict: ready.** There are no findings. The round-c changes (the title, "pass its mistake on to", "an entry of the job log" and «журнала задач») are correct in both languages.

# Only the owner can answer

- What the `parts` source gives without the Domains extension, A or B. Before the page is built, the question needs the costs from findings 1 and 2.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group5-notes.md`, `D:/SpecSheriff/.ai_docs/t25-pass/review-g5b-c.md`
