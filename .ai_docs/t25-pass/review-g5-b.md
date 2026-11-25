The skill `specsheriff-terminology-review` is loaded. I printed the checklist with `node .claude/vt/writing-rules.mjs`. My input holds two drafts, items 44 and 47, both in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`. Neither is ready, but every fix below is one the author can make, and nothing has to go to the owner.

## Item 44: `s-3anv9qcmx8pwp2w`, "An identifier followed to its end": **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✗ "a RecordType that it has already passed" can be read two ways; in the reason, "the RecordType" refers back to nothing named
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
- 7.2.7 Words that take their meaning from the specification ✓ (every citation has a link)
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓ (both checks follow the same chain over the same fields, and condition 2 implies condition 1; the agreed s-vke5hakwf3uyrjs also holds several rows)
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
- согласованность: ✓ 12.2 (s-6eb92ddch7shuvu) и решение 2026-10-31; строки 12.12.2 и 12.12.3 и решения 2026-11-19; 12.6 (поля, взятые через `refines`); комментарий схемы к `identifiedBy`; 12.3 (s-e877bnfa559tvk9); s-4npdup7mjkva69y; s-a8fn72xa782wvbk.
- целостность: ✓ с s-ezq8csd433vj6fj не пересекается. Форму, в которой `identifierOf` называет RecordType, задаёт пункт 56 (s-4npdup7mjkva69y), и заметки это записывают. В impl.json строки 12.12.2 и 12.12.3 остаются за этим узлом.
- целесообразность: ✓ если у цепочки нет конца, генератор (12.3) не может дать полю тип.
- избыточность: ✓
- недостаточность: ✗ Неясно, считается ли пройденным RecordType, в котором цепочка начинается. Если считается, отвергается поле `parent`, которое ссылается на свой же RecordType (дерево). Кроме того, «условие» стоит в единственном числе, хотя поле может не выполнить оба.

**Findings** (all can be fixed by the author)
1. **WORDING FIX.** The code in `validate.ts:424` counts only the RecordTypes that the chain goes to. The wording should say the same.
   - EN: "A chain that goes to the identifying field of the same RecordType a second time never ends."
   - RU: «Цепочка, которая во второй раз ведёт к идентифицирующему полю одного и того же RecordType, не кончается никогда.»
2. **WORDING FIX.** A field that fails the first condition also fails the second.
   - EN: "the condition that the field fails" → "each condition that the field fails"
   - RU: «условие» → «каждое условие, которое поле не выполняет»
3. **WORDING FIX** in the reason.
   - EN: "generated from the RecordType that holds the field"
   - RU: «сгенерированные из RecordType, который содержит это поле»

## Item 47: `s-ezq8csd433vj6fj`, "A RecordType that refers outside its part of the system": **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✗ "accepts a reference … only in the following cases" reads as "refuses the rest", but the row's cost is only a report
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
- 7.2.7 Words that take their meaning from the specification ✓ (every citation has a link)
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✗ Its first sentence repeats the reason of 12.10. Its second sentence, "A field with `identifierOf` is such a reference too…", justifies one bullet of the text.
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✗ "a schema within its `schema` (§…), at any depth, holds"
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test of the reason ✗ Sentence 1 pairs with paragraphs 1–2, and sentence 2 with the `identifierOf` bullet, in order.

**Оценка**
- согласованность: ✓ 12.1 и решения 2026-11-16 и 2026-11-19; 12.10 и решения 2026-11-14; строки 12.12.15 и 12.12.16 с ценой «reported by the node's sid» (согласованы 2026-11-19); s-4bwa4zepd4nwcv8; s-ygg5kpcxgzq3m7w; s-zefk589ykh37b8u; 12.6.
- целостность: ✓ s-3anv9qcmx8pwp2w не судит, в какой части системы находится RecordType. s-a8fn72xa782wvbk понимает «refers to» так же. Правка impl.json и пункт 56 названы в заметках.
- целесообразность: ✓ Сейчас эту проверку не делает никакой код, а ссылки встречаются на любой глубине `schema` и в связях `refines`.
- избыточность: ✗ Обоснование повторяет обоснование s-8ht2hn88cu2qwz9.
- недостаточность: ✗ Не сказано, как сообщение называет RecordType, на который ссылаются. Фраза «RecordTypes that no such section holds» буквально включает и фрагменты из `specs/contracts/`.

**Findings** (all can be fixed by the author)
1. **WORDING FIX**, the opening and the report:
   - EN: "…`sheriff validate` lets a reference from one RecordType (§…) to another pass without a report only in the following cases (§…):" and "…reports each RecordType that holds any other reference, naming by its sid both that RecordType and the RecordType that it refers to (§…, §…)."
   - RU: «…`sheriff validate` пропускает без сообщения ссылку одного RecordType (§…) на другой только в следующих случаях (§…):» и «…сообщает, называя по sid и его, и RecordType, на который он ссылается (§…, §…).»
2. **WORDING FIX**, the reason:
   - EN: "A RecordType can refer to another RecordType at any depth of its `schema` and through its `refines` links. So only a check that reads all of them finds each reference that breaks the rule on what a RecordType may refer to (§s-8ht2hn88cu2qwz9)."
   - RU: «RecordType может ссылаться на другой RecordType на любой глубине своей `schema` и через свои связи `refines`. Поэтому только проверка, которая читает их все, находит каждую ссылку, нарушающую правило о том, на что может ссылаться RecordType (§s-8ht2hn88cu2qwz9).»
3. **WORDING FIX**, the RecordTypes outside any section:
   - EN: "The RecordTypes in `specs/base/` that no such section holds…"
   - RU: «RecordType в `specs/base/`, которые не содержит ни один такой раздел, …»
4. **CUT**:
   - EN: "its `schema` (§…) holds, at any depth, …"
   - RU: «его `schema` (§…) на любой глубине содержит…»

## The points marked [check] and the gaps
- **Item 47, reported rather than refused:** the author's reading holds. Table 12.12, which the owner agreed to on 2026-11-19, sets the cost "reported by the node's sid".
- **Item 47, what a part of the system is:** the author's reading holds. Without the Domains extension, 12.1 and the 2026-11-19 rulings settle it, and s-4bwa4zepd4nwcv8 defines a top-level section by its location in the same way. With the Domains extension, the domain is the part, by the 2026-11-14 ruling on 12.10, which was put in terms of domains.
- **None of the gaps is a defect of these two drafts.**
  - The form in which `$ref` and `identifierOf` name a RecordType is for item 56 to state, and it must be agreed before stage 3.
  - An `identifiedBy` that no field refers to can be dropped now. Row 12.12.2 refuses it as soon as a field refers to it, and an input guard is proposed only where no check downstream finds the same fault. It needs no later question to the owner.
  - A `$ref` that points to nothing falls outside rows 12.12.15 and 12.12.16.

**TERM:** I question no term. The owner decided `identifierOf` and `identifiedBy`, part of the system, and fragment of a format. For the docs only, `identifiedBy` and `identifierOf` could be glossed as a primary key and a foreign key from relational modelling (unverified: the registry has no entry for it).

**Questions only the owner can answer:** none.
