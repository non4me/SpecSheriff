# Follow-up review of base-questions.md, part B (sections 3 to 5): the report

## Checklist

Each line covers every new wording in sections 3 to 5. The skill was already in context, and I ran `node .claude/vt/writing-rules.mjs` myself.

- **1.2.3 A rule is made of its text and its reason:** ✓
- **7.1 The goal, the reader and the scope:** ✗ In the new main-table row of 4.2, "the same titles lead to it as to a section of the base specification … the first top-level node represents that folder" can be read as matching a section in *any* folder.
- **7.2.1 Who must act:** ✗ In 4.1, the fourth item of rule 1.3.2 says "the rule is automatically set to `draft`" without naming who sets it.
- **7.2.2 The order of the text:** ✓
- **7.2.3 General words:** ✗ In 3.1, "the hooks and the declarations that setting the repository up wrote" does not say what is declared.
- **7.2.4 Naming:** ✓
- **7.2.4.1 Coined names:** ✓
- **7.2.4.2 What a name says:** ✓
- **7.2.4.3 A general word in a name:** ✓
- **7.2.4.4 Properties:** ✓
- **7.2.4.5 Relations to other entities:** ✓
- **7.2.5 Definition by negation:** ✓
- **7.2.6 Lists that restrict:** ✓
- **7.2.7 Words that take their meaning from the specification:** ✗ Two phrases are not cited:
  - "the bindings file" in 3.1;
  - "the file of the section for the stack and that of the technical debt section" in row 11.3.5 as 4.2 narrows it.
- **7.3.1 The title:** ✗ Under option B of 4.5, rule 10.10 keeps the title "Where a SpecTag may appear" but no longer limits where a SpecTag may appear.
- **7.3.2 Thoughts and sentences:** ✓
- **7.3.3 The contents of a node:** ✓
- **7.4.1 Counts in prose:** ✓
- **7.4.2 The reason:** ✓
- **7.5.1 Superfluous rules:** ✓
- **7.5.2 The length of a sentence:** ✗ The second sentence of 3.1 runs to about 48 words.
- **7.5.3 Rules as tables:** ✓
- **7.6.1 The language of the specification:** ✓
- **7.6.2 Capital letters:** ✓
- **7.6.3 Examples:** ✓
- **Pairing test:** ✓

## Оценка

**3.1**
- согласованность ✗ удаление стирает записи, которые по правилам 10.6 и 10.7 вносит только ответственный, а строка 10.1.27 запрещает коммиту удалять такую запись (вопрос ответственному); сравнено с s-7unxytshhc4md54, 1.7.5 и принципом «What SpecSheriff is for»
- целостность ✗ слова «хуки и объявления» не охватывают `core.hooksPath` и строку `.gitattributes`, которые удаляет s-7unxytshhc4md54
- целесообразность ✓ (связи `implements` узлов s-7unxytshhc4md54 и s-jn3rauw6a8zeefn, строка 10.1.23)
- избыточность ✓ (10.13, 2.5, 1.7.5)
- недостаточность ✗ «файл привязок» без ссылки; у «объявлений» не сказано, что объявлено

**3.2**
- согласованность ✗ второй пункт противоречит согласованному s-tnz9zgqx8c629a7: если настройки нет, `sheriff review` берёт значение по умолчанию и называет его в каждом ревью
- целостность ✓ (s-kq6wmdud9c7j2k9, s-tnz9zgqx8c629a7, s-p29yawkkkgk7kxb, 1.6.1)
- целесообразность ✓ (решение от 2026-11-02, строка 10.1.23)
- избыточность ✓
- недостаточность ✗ не покрыт случай, когда настройка ещё не подтверждена

**3.3**
- согласованность ✓ (8.5, 1.3.5, s-vke5hakwf3uyrjs, `cellNode` в схеме)
- целостность ✓ (10.1.2, 1.3.4)
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**3.4**
- согласованность ✓ (12.2, 12.10, 12.12.2, s-4npdup7mjkva69y, s-suv42g8r3ra2h6b)
- целостность ✓ (s-ezq8csd433vj6fj)
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**3.5**
- согласованность ✓ (s-nk8td3ez58gahc4, решения на 12.6 и 12.12.7 от 2026-11-19)
- целостность ✓ (12.12.4, s-c2r9jndrjbtbsv6, пример 12.6)
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**3.6**
- согласованность ✓ (страница от 2026-11-19, 12.6, s-dk3zfkbhc3v6xbp)
- целостность ✓
- целесообразность ✓
- избыточность ✓
- недостаточность ✗ обратный случай не проверяется: `additionalProperties` на верхнем уровне `schema` RecordType, у которого есть варианты, отвергает поля каждого варианта

**3.7**
- согласованность ✓ (12.2, 12.4, s-4npdup7mjkva69y, миграция g7)
- целостность ✓ (12.12.8, 12.12.11)
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**3.8**
- согласованность ✓ (12.1, 3.1, 12.12.5)
- целостность ✓ (s-ezq8csd433vj6fj)
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**4.1**
- согласованность ✓ (принцип «Nothing unapproved is implemented», 9.2, 10.3, s-f5brvuuu6xmkj6t)
- целостность ✓ (1.3.2, s-st6td4mua9uqt9z)
- целесообразность ✓
- избыточность ✗ новый четвёртый пункт 1.3.2 повторяет второе предложение 1.3.5
- недостаточность ✓

**4.2**
- согласованность ✓ (решение от 2026-11-18, 1.1.2, 4.1, 1.7.3)
- целостность ✗ после сужения 11.3.5 ни одна строка не требует, чтобы раздел в файле, названном по домену, совпадал с разделом именно этого домена; сейчас это проверяют 11.3.5 и s-gvafe6bnstwab8b
- целесообразность ✓
- избыточность ✓
- недостаточность ✗ суженная 11.3.5 не ссылается на 4.1

**4.3**
- согласованность ✓ (1.5.2, принцип «Rule, test and code bound by the sid»)
- целостность ✓ (10.1.26, s-33fw3ga4ctd94dq, s-9rtrj24myzjvshu, s-2x58az67bm6cxq2)
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**4.4**
- согласованность ✓ (10.15, 9.6, 10.1.28a, 10.1.42)
- целостность ✗ при Б не названы строка 10.1.26, s-33fw3ga4ctd94dq и s-9rtrj24myzjvshu
- целесообразность ✓
- избыточность ✓
- недостаточность ✗ при Б вместе с А вопроса 4.3 верхний уровень файла RuntimeChecks нечем привязать: JSON не допускает комментариев

**4.5**
- согласованность ✗ вариант Б отходит от решения от 2026-11-13 («SpecTag appears only in the code that implements the system and in the tests of that code»), и это не сказано
- целостность ✗ при Б заголовок 10.10 не соответствует тексту
- целесообразность ✓
- избыточность ✓ (10.1.28, 10.1.39, s-m8nmfsxkcfu7cjp)
- недостаточность ✓

**4.6**
- согласованность ✗ основание не говорит, что слова решения от 2026-11-12 («is defined in that domain») и обоснование правила из 2.9 говорят в пользу Б
- целостность ✗ формулировка Б опускает часть технического приложения
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**4.7:** ни один узел базы при рекомендуемом варианте не меняется, поэтому блока нет.

---

## Verdict and findings

**Verdict:** the part passes after the fixes below. As in review A, the per-item format of the brief takes priority over the 300-word limit. "Author" marks a finding the author can fix; "owner" marks one only the owner can answer.

**How the first review was handled.** In my part, every finding of the first review was applied, and every rejection gives a reason that holds. Two applied wordings now have defects, which I list under 3.1 and dropped item 3. The three recommendations that depart from the reviewers' wording:
- **4.4:** the move to B holds.
- **4.2:** it holds once the folder scope is restored (finding below).
- **2.9:** outside my part, except where 4.6 depends on it.

### 3.1 — not ready
- **WORDING FIX (author).** This replaces sentences 2 and 3. The current wording misses `core.hooksPath` and the `.gitattributes` line. It also leaves "declarations" without saying what is declared, and leaves "the bindings file" uncited.
  - EN: "Taking SpecSheriff out removes what setting the repository up wrote outside the specification. It also removes the settings of the SpecSheriff tools that the repository's configuration holds, including the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2), its `strict` flag (§s-q3pfzyaxvpr2zj2) and the extensions that the project has chosen (§s-9ttvcwpqkehm58g). It leaves the specification, the bindings file (§s-kgbzk2ph9e6jfb4), the system's code (§s-hheus6f395ynqvc), and the repository's own tools and their tests as they are."
  - RU: «Удаление SpecSheriff убирает то, что настройка репозитория записала вне спецификации. Оно убирает и настройки инструментов SpecSheriff, которые содержит конфигурация репозитория, в том числе записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2), её флаг `strict` (§s-q3pfzyaxvpr2zj2) и выбранные проектом расширения (§s-9ttvcwpqkehm58g). Спецификацию, файл привязок (§s-kgbzk2ph9e6jfb4), код системы (§s-hheus6f395ynqvc), а также собственные инструменты репозитория и их тесты оно оставляет как есть.»
  - Add `cites` links to s-kgbzk2ph9e6jfb4 and s-hheus6f395ynqvc.
- **DOUBT (owner).** Rules 10.6 and 10.7 let only an owner record these entries. Row 10.1.27 says that no commit removes an approval-status entry. Under rule 3.1, anyone who runs the removal deletes them, and running the setup again then leaves the specification a draft with no act by an owner (inference). The agreed s-7unxytshhc4md54 already behaves this way. The page should show this tension next to the rule.
- **Nit.** s-ttsc8tpnu46q53s (`spec-init`) runs `sheriff init`, so it could gain an `implements` link to the new rule, as `spec-remove` does.

### 3.2 — not ready
- **WORDING FIX (author).** The second item contradicts the agreed s-tnz9zgqx8c629a7, under which the reviewer runs with unconfirmed defaults and names them.
  - EN: "- any other agent, such as the reviewer (§s-m4h279nbaqkpa3t), works with those that the person has confirmed on that machine. Until the person confirms them, it works with defaults, and the SpecSheriff tools name each default in every run that uses it."
  - RU: «- любой другой агент, например рецензент (§s-m4h279nbaqkpa3t), работает с теми, которые этот человек подтвердил на этой машине. Пока человек их не подтвердил, агент работает со значениями по умолчанию, и инструменты SpecSheriff называют каждое такое значение в каждом запуске, который его использует.»
  - Update the Russian summary line for 3.2 to match.
- **Author.** The last sentence of the `change` field says that «Пользователь» was replaced, but the owner never saw a draft with that word. Replace it with: «Правило говорит «человек, на чьей машине работает агент», а не «пользователь», так как в базе «user» значит пользователя системы (правило 4.3).»
- **DOUBT (owner), proposed example.**
  - EN: "A skill of a SpecSheriff plugin starts an agent to review a draft. That agent works with the model and the reasoning effort of the session in which the skill runs. The most likely mistake is a skill that names a model or an effort of its own, so that the person pays for a run they did not choose."
  - RU: «Skill плагина SpecSheriff запускает агента, чтобы проверить черновик. Этот агент работает с моделью и усилием рассуждения сессии, в которой работает skill. Самая вероятная ошибка — skill, который сам называет модель или усилие, так что человек платит за запуск, которого не выбирал.»

### 3.3 — ready (nits)
- The note "(the first two sentences of the reason stay as they are)" should read "(the reason stays as it is)": the reason has only those two sentences.
- "Whose nodes need no title" does not settle the case of a project's own kind (rule 8.3).
- "What a person sees" leaves out a domain's header, which also has a title.

### 3.4 — ready (nit)
- The note on shifted row numbers should also name 3.6 and 3.7.

### 3.5 — ready (nit)
- Add a decision for `meta.decisions`, as 3.3 has:
  - problem: "Rule 12.6 and rows 12.12.6 and 12.12.7 looked only at the fields that a variant declares, while the agreed s-nk8td3ez58gahc4 generates a variant from every field that it adds.";
  - ruling: written from the owner's answer;
  - type: textual.

### 3.6 — not ready
- **Author.** Add a second row after the new one, with a `checks` link to s-z3dnru6qqdf9m6j and a sentence in s-c2r9jndrjbtbsv6:
  - EN: "The top level of the `schema` of a RecordType that has RecordType variants holds no `additionalProperties` | refused"
  - RU: «Верхний уровень `schema` RecordType, у которого есть варианты RecordType, не содержит `additionalProperties` | отвергается»
  - Basis: JSON Schema 2020-12 Core, 10.3.2.3, which I read in this run. `additionalProperties` depends only on `properties` and `patternProperties` in its own schema object. At the top of the RecordType's definition, it therefore refuses each field that a variant adds through `allOf`/`then` (s-nk8td3ez58gahc4).
  - This is the mistake a JSON Schema user is most likely to make. The accepted page uses `unevaluatedProperties: false`, which does see those fields.

### 3.7 — ready (nit)
- Say where the row goes, for example after the row of 3.4.

### 3.8 — ready (nit)
- The row cites 1.1.4 for "the base specification", while 4.2 and 2.9 cite 1.1.2 (s-qmmzf9nksfsa3qp), the rule that defines that part.

### 4.1 — not ready
- **CUT (author), under either option.** Cut the fourth item of rule 1.3.2. Rule 1.3.5's second sentence already states it ("One statement, one home"), and the item names no actor.
  - The `change` field of 1.3.2 becomes: «Четвёртый пункт удалён: правило 1.3.5 уже говорит, что изменение формулировки делает узел черновиком, а пункт пересказывал его не полностью.»
  - Option B's cost then reads "rule 1.3.2's fourth item still goes".

### 4.2 — not ready
- **WORDING FIX (author), second sentence of the new row.** This restores the domain scope that row 11.3.5 and item 42 check now, as the ruling of 2026-11-18 requires.
  - EN: "In a file of the technical appendix named after a folder of the base specification (§s-5x737t9nee4zgaa), the first top-level node represents that folder, and the section of the base specification that the titles lead to is in that folder"
  - RU: «В файле технического приложения, названном по папке базовой спецификации (§s-5x737t9nee4zgaa), первый узел верхнего уровня представляет эту папку, а раздел базовой спецификации, к которому ведут те же заголовки, находится в этой папке»
- **WORDING FIX (author), row 11.3.5 as narrowed.**
  - EN: "…and that of the technical debt section (§s-vj7ercem526zd6v) is named after a domain"
  - RU: «…и файла раздела технического долга (§s-vj7ercem526zd6v), назван по домену»
  - Also say that the row drops its `checks` link to s-qmmzf9nksfsa3qp, which moves to the new row.
- **Nit.** The phrase "item 42 splits, its check of the sections implementing the new row" is hard to follow. Spell out which part goes where.

### 4.3 — ready (nit)
- In row 10.1.26, read without the sids, two phrases say nothing:
  - "in one of the ways that §s-kgbzk2ph9e6jfb4 names:" → "in one of the following ways (§s-kgbzk2ph9e6jfb4):" (RU «одним из следующих способов (§s-kgbzk2ph9e6jfb4):»);
  - "what §s-kkbqcb9xrpaepwn says" → "what the rule on code that no SpecTag binds says (§s-kkbqcb9xrpaepwn)".

### 4.4 — not ready
- **Author.** Under B, add these to "Nodes concerned" and to the cost:
  - row 10.1.26;
  - s-33fw3ga4ctd94dq;
  - s-9rtrj24myzjvshu, which refuses a SpecTag that is not directly above a symbol.

  The changed clause of row 10.1.26:
  - EN: "each symbol that the checks can identify, by a SpecTag directly before it or, in a file whose format allows no comments, in the symbol's property for a comment;"
  - RU: «каждый символ, который проверки могут определить, — SpecTag непосредственно перед ним или, в файле, формат которого не допускает комментариев, в свойстве символа для комментария;»
- **Author (inference).** Under B combined with A of question 4.3, the paragraph on code outside every symbol asks a JSON file for a comment that it cannot hold. The top level of that file is then bound by nothing. Add to that paragraph:
  - EN: "…or, where the format allows no comments, in the property for a comment of the file's top-level object."
  - RU: «…а если формат не допускает комментариев, — в свойстве для комментария объекта верхнего уровня этого файла.»
- **Nit.** Option D has no "Cost: none".

### 4.5 — not ready
- **Author.** Under B, retitle rule 10.10 "What a SpecTag names" (RU «Что называет SpecTag»).
- **Author.** Add to B's risk, so the owner sees the earlier ruling:
  - EN: "It also departs from the owner's ruling of 2026-11-13, under which a SpecTag appears only in the system's code and its tests, which the ruling of 2026-11-17 widened only to the repository's own tools and their tests."
  - Russian summary: «Б отходит от вашего решения от 2026-11-13: SpecTag стоит только в коде системы и его тестах, а решение от 2026-11-17 расширило это только на собственные инструменты репозитория.»
- **Nit.** B's "What a person sees" should say "that names anything but a rule of the guidelines", as the row does.

### 4.6 — not ready
- **Author.** The basis must state the evidence that points to B:
  - the decision of 2026-11-12 reads "is defined in that domain";
  - the reason of the new rule in 2.9, "so the contracts section keeps only what the domains share", holds only under B.

  Under A, that reason becomes:
  - EN: "A term that only one domain needs belongs to that domain's subject area, so a reader finds it beside the rules that need it."
  - RU: «Термин, который нужен только одному домену, принадлежит предметной области этого домена, поэтому читатель находит его рядом с правилами, которым он нужен.»
- **Author.** B's first sentence leaves out the part of the technical appendix that 2.9 allows to cite the term:
  - EN: "A term that only the nodes of one domain, and those of the part of the technical appendix named after the domain (§s-vj7ercem526zd6v), cite or link to is defined in that domain (§s-ypa92gpcj3f5zj8)."
  - RU: «Термин, на который ссылаются или с которым связаны только узлы одного домена и узлы части технического приложения, названной по этому домену (§s-vj7ercem526zd6v), определяется в этом домене (§s-ypa92gpcj3f5zj8).»
  - B's "What a person sees" needs the same addition.

### 4.7 — ready
The two JSON Schema posts, which I read in this run, say what the item claims. The list of nodes that name `x-enumSource` is complete.

### 5. Dropped items
- **Item 3 — not ready (author).** Round b made its reason stale. s-ztseyetus7np6br changes in change 1.1 whatever the owner answers to 4.7. `t25-one-thought.md`, line 1664, owes this technical replacement the next time the node changes, so it belongs in change 1.1. Suggested reason: "Not a node of the base. s-ztseyetus7np6br changes in change 1.1, so this technical replacement is made there. s-agc6fb3vx46pc23 keeps it until its next change."
- **Items 1, 2 and 4 to 16:** the reasons hold.

**TERM:** nothing new. The two glosses from the first review stay in the docs only: "wording" as a baseline, and DDD's bounded context.

**Should not reach the owner at all:** none.

**Ready:** 3.3, 3.4, 3.5, 3.7, 3.8, 4.3, 4.7, and dropped items 1, 2 and 4 to 16.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/base-questions.md` (reviewed, unchanged). My lookup scripts are in `C:/Users/PC/AppData/Local/Temp/claude/a0dc34c442b04427/8cff5ff8-2618-4605-ba3d-4c860a64081a/scratchpad/r2bq/`.

Sources:
- [JSON Schema 2020-12 Core](https://json-schema.org/draft/2020-12/json-schema-core)
- [json-schema.org, "The Last Breaking Change"](https://json-schema.org/blog/posts/the-last-breaking-change)
- [json-schema.org, "Custom Annotations Will Continue"](https://json-schema.org/blog/posts/custom-annotations-will-continue)
