# Item 46a: `s-5nf87c3e3jg9v7c`, "Where the values of a field with `enum` are collected from"

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✗ This holds under answer A, in "the parts of the base specification are the sections whose location … is `base/` or `contracts/` followed by a single number". The agreed s-4bwa4zepd4nwcv8 and 8.5 call `base` itself the part (finding 2).
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
- согласованность: ✗ При ответе А «часть базовой спецификации» — это раздел `base/N`. В согласованных 8.5 и s-4bwa4zepd4nwcv8 часть — это `base`, `contracts` или домен (находка 2). Разделы `contracts/N` как отдельные части расходятся с 3.1, s-zefk589ykh37b8u, s-yauyedny2yzvs4c и примером 12.11 (находка 1). С 12.7, 12.8, 12.9, 1.1.2, s-ygg5kpcxgzq3m7w, s-ztseyetus7np6br, s-agc6fb3vx46pc23, s-a8fn72xa782wvbk и схемой RecordType расхождений нет.
- целостность: ✗ При ответе А придётся поменять 8.5 и s-4bwa4zepd4nwcv8, а вопрос откладывает это на потом (находка 2). s-c2r9jndrjbtbsv6, s-dk3zfkbhc3v6xbp и s-ezq8csd433vj6fj по-прежнему верны.
- целесообразность: ✓ Одни и те же значения нужны `sheriff reindex`, `sheriff validate`, проверке вариантов RecordType и `sheriff types`.
- избыточность: ✓ не найдена; сверено с 12.9, s-ztseyetus7np6br и s-ygg5kpcxgzq3m7w.
- недостаточность: ✓ не найдена.

# Item 46b: `s-dk3zfkbhc3v6xbp`, "Fields with `enum` that `sheriff validate` accepts"

**Checklist**
- 1.2.3 ✓ · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test ✓

**Оценка**
- согласованность: ✓ Сверено с 12.7, 12.8, 8.3, 5.2, строками 12.12.11–12.12.13 и их решениями от 2026-11-19, s-czxaqvaesmu3gru, s-xzcw3hv4hmxz7h7, а также с `uniqueItems` и запретом держать `enum` вместе с `x-enumSource` в схеме RecordType.
- целостность: ✓ Правка impl.json и отмена отказа на validate.ts:354-356 названы в заметках. s-3anv9qcmx8pwp2w говорит о JSON Pointer теми же словами.
- целесообразность: ✓ Типы и RuntimeCheck генерируются из значений поля (12.3).
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

# Findings

Round d added no defect. Every finding of round c was either applied or rejected for a reason that holds. The [check] points on item 46 hold, except where finding 1 says otherwise. None of the gaps outside the group is a defect of these drafts. No new term.

**46a: not ready.** It carries answer A exactly as the question describes it.

1. **DOUBT (author; the agreed rules settle it).** Answer A turns each top-level section of `specs/contracts/` into a separate part. The agreed 3.1, s-zefk589ykh37b8u and s-yauyedny2yzvs4c make the contracts section one section: the folder `specs/contracts/`. The example of 12.11 and this node's paragraph on Domains also give it one value.
   - EN: "Otherwise, the parts of the base specification are the contracts section and the sections whose location (§s-kag2m9tzdnduxdx) is `base/` followed by a single number. The contracts section is named `contracts`, after its folder, and each other part by its title."
   - RU: «Иначе части базовой спецификации — это контракты и разделы, расположение которых (§s-kag2m9tzdnduxdx) — `base/` и одно число. Контракты называются `contracts`, по имени их папки, а каждая из остальных частей — по своему названию.»
   - Example 2, last two sentences: "That field is given `contracts`, “Requests” and “Users”, each with the sid of the node that it comes from. The most likely mistake is to give it the title “Contracts” in place of `contracts`." / «Это поле получает `contracts`, «Requests» и «Users», каждое — вместе с sid узла, из которого оно приходит. Самая вероятная ошибка — дать ему название «Contracts» вместо `contracts`.»
   - The question changes too:
     - cost 4 goes;
     - cost 5 keeps only `specs/base/`;
     - cost 7 loses «Contracts»;
     - A gets a new cost: «значения смешивают имя папки и названия разделов».

2. **DOUBT (author, the question).** Cost 1 puts off naming the new term. Under A the owner would then see agreed nodes a second time, against the rule "Only a finished wording is shown, once".
   - Replace «одному из двух значений понадобится своё имя; его я предложу вам отдельно» with «в этих двух узлах она станет «папкой базовой спецификации», как в согласованном узле о вычислении расположения; смысл не меняется» (inference).
   - Replace «в узле s-4bwa4zepd4nwcv8» with «в узле о суждении рецензента об одобряемом узле технического приложения», since a bare sid does not tell the owner what the node says.
   - Add to cost 7 and to answer B: «сохранённые записи с прежними значениями перестанут проходить RuntimeCheck».

**46b: ready.** No findings.

# Only the owner can answer
- What the `parts` source gives without the Domains extension: answer A, with findings 1 and 2 applied, or answer B.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group5-notes.md`, `D:/SpecSheriff/.ai_docs/t25-pass/review-g5-d.md`
