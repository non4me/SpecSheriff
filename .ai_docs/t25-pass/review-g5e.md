## Item 45, `s-c2r9jndrjbtbsv6`, "What a RecordType variant must agree with"

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
- 7.3.2 Thoughts and sentences ✓ (the new "In that case …, since …" sentence pairs a condition with its cause. The agreed s-qqs2svksmjct753 uses the same form.)
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
- согласованность: ✓ Сверено с 12.6 (s-z3dnru6qqdf9m6j) и его решениями, со строками 12.12.4–12.12.10 и их решениями от 2026-11-19, с решением 1 из fix-brief-group5-b.md, а также с s-sn6au3vcr9uy5pm, s-kag2m9tzdnduxdx, s-xzcw3hv4hmxz7h7 и s-5nf87c3e3jg9v7c.
- целостность: ✓ Правки раунда e смысла не меняют. s-5nf87c3e3jg9v7c и s-dk3zfkbhc3v6xbp по-прежнему верны. Переименование при ответе А не затрагивает фразу «the part of the specification that its location names»: в 8.5 остаётся «the part it is in».
- целесообразность: ✓ Код берёт первую связь `refines` и считает поля типа `variant` (`stage3`). Узел заменяет это строками 12.12.4–12.12.10.
- избыточность: ✓ не найдена; сверено с 12.6, 12.12.7, 12.12.8 и s-dk3zfkbhc3v6xbp.
- недостаточность: ✓ в узле не найдена. Пробел строк 12.12.6–12.12.7 записан к пункту 56.

## Item 46a, `s-5nf87c3e3jg9v7c`, "Where the values of a field with `enum` are collected from"

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✓ (the clash that review d-d found goes away with the renaming that choosing A decides)
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✓
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✗ "The contracts section is named `contracts`, after its folder, and each other part by its title." (finding 1)
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
- согласованность: ✓ при ответе А. Сверено с 12.7, 12.9, 12.11 и его решением от 2026-11-18, 1.1.2, 3.1, 11.1.1, s-zefk589ykh37b8u, s-yauyedny2yzvs4c, s-ygg5kpcxgzq3m7w, s-ezq8csd433vj6fj и строкой 12.12.12. Расхождение с 8.5 и s-4bwa4zepd4nwcv8 снимает переименование.
- целостность: ✓ Переименование названо и смысла не меняет, но в 8.5 его надо распространить и на соседние слова (находка 4). s-c2r9jndrjbtbsv6 и s-dk3zfkbhc3v6xbp верны.
- целесообразность: ✓ Одни и те же значения нужны `sheriff reindex`, `sheriff validate`, проверке вариантов RecordType и `sheriff types`.
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

## Verdicts and findings

**Item 45: ready**, with nits only. **Item 46a: not ready**, because of one wording fix. The question needs one fix. Round e dealt with every earlier finding, with one exception: review d-d's new risk for answer Б landed among its gains (finding 2).

1. **WORDING FIX, 46a (author).** The sentence states two thoughts. Both round-e readers also read "each other" as "one another".
   - EN: "The contracts section is named `contracts`, after its folder. Each of the other parts is named by its title."
   - RU: «Контракты называются `contracts`, по имени их папки. Каждая из остальных частей называется по своему названию.»
2. **WORDING FIX, the question (author).** In Б, the sentence «Если выберет, … перестанут проходить RuntimeCheck.» stands under «Что это даёт». fix-brief-group5-e put it among Б's costs. Move it to open «Что это стоит».
3. **Nit, the question.** Cost 5 of А assumes that a contracts section exists. Append: «; если нет и раздела контрактов, значений не остаётся, и `sheriff validate` отвергает поле (строка 12.12.12)».
4. **Nit, the notes.** The renaming changes neither node's meaning: in both, the phrase names `base`, `contracts` or a domain. In 8.5, "the part's name alone" (RU «одно имя части») must also become "the folder's name alone" (RU «одно имя папки»), both in that item and in the paragraph after the list. Otherwise one sentence calls the same thing a folder and a part.
5. **Nits, 45 (agreeing with the round-e readers).**
   - "For the last condition," becomes "Where the RecordType variant fails the last condition," (RU «Если вариант RecordType не выполняет последнего условия,»).
   - In the paragraph on a RecordType without a `chosenBy`, the first sentence becomes: "…the RecordTypes that have a `chosenBy` and that it reaches through the fewest `refines` links can name different fields in their `chosenBy`." RU: «…RecordType, у которых есть `chosenBy` и к которым от него ведёт наименьшее число связей `refines`, могут называть в своих `chosenBy` разные поля.»

Reject the thorough reader's "one number": the agreed s-4bwa4zepd4nwcv8 and item 47 both say "a single number".

**TERM:** no new term.

## Only the owner can answer
- What the `parts` source yields in a project without the Domains extension: А (recommended, with findings 2 to 4 applied) or Б.
