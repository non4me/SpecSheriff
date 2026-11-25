**Checklist** (`node .claude/vt/writing-rules.mjs`). Columns: **S** = new:tools-10-start, **X** = new:tools-10-codex, **G** = new:tools-10-settings, **B** = s-9rtrj24myzjvshu, **T** = new:tools-7-2-rule-test.

| Rule | S | X | G | B | T |
|---|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ | ✗ "a test is taken into account whether or not the commit changes it. A test marked as skipped or as expected to fail is taken into account too": two qualifications of one kind written as prose, not as a list |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ | ✓ |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ | ✓ |

**Verdict:** the group passes after the fixes below. The author can make all four. Every fix from reviews B, C and D of round c is in place word for word. The reader's changes keep the meaning. Each sentence that round c wrote itself matches its Russian.

## new:tools-10-start — **ready**
No findings. The coordinator gave S2 to the author, and that holds: the owner will see the whole node, and its `change` field says that the first item's agreed meaning has changed.

**Оценка**
- согласованность: ✓ сверено с 10.4 (s-nyh9yk22ba6g77q), 1.6.1 (s-m4h279nbaqkpa3t), s-xr5xxa9cxf2mq5u, s-u2n5hwwqkb6zk4z, s-3wh8uhgn9jr2k74, согласованным «Who runs the reviewer», review.ts (claudeArgs, codexArgs, ALLOWED).
- целостность: ✓ s-xr5xxa9cxf2mq5u ссылается на узел в определении runner; изменение смысла первого пункта названо в поле `change`.
- целесообразность: ✓ 10.4: рецензент ничего не получает из сессии.
- избыточность: ✓ не найдено.
- недостаточность: ✓ не найдено; хватает ли флагов `claude`, покажет тест этапа 3 (поле `stage3`).

## new:tools-10-codex — **not ready**
- **CUT (author).** Cut ¶3's second sentence: "Where `specsheriff.review.codexModel` is empty, it leaves the choice of the model to Codex." / «Если `specsheriff.review.codexModel` пуст, он оставляет выбор модели за Codex.»
  - The settings node now states this rule for every setting, with this very case as its example.
  - The node for the runner `claude` has no such sentence.
  - It is a restatement whose content stays in its home, so it can be removed without asking the owner (`.claude/vt/rules.md`).

**Оценка**
- согласованность: ✓ сверено с s-avvnasjhsfkgajh, s-tnz9zgqx8c629a7, s-3wh8uhgn9jr2k74, согласованным «Who runs the reviewer», review.ts (codexArgs, codexRunner).
- целостность: ✓ s-avvnasjhsfkgajh ссылается на этот узел.
- целесообразность: ✓
- избыточность: ✗ второе предложение ¶3 повторяет общее правило s-tnz9zgqx8c629a7 о пустой настройке и его пример.
- недостаточность: ✓ не найдено.

## new:tools-10-settings — **not ready**
- **WORDING FIX (author).** "the runner requests no value for it" states a rule by negation. The rule "A rule says what holds" (`.claude/vt/rules.md`) forbids that, and review B rewrote the same negation in the codex node this round. Replace ¶2's second sentence:
  - EN: "Where a setting is empty, the runner leaves the choice of the setting's value to its CLI."
  - RU: «Если настройка пуста, runner оставляет выбор её значения за своим CLI.»
  - The `stage3` field stays as it is.

**Оценка**
- согласованность: ✓ сверено с s-477gtdrkw34dzxw, s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4 (опции плагина, отметка о вопросе), s-3wh8uhgn9jr2k74, s-u2n5hwwqkb6zk4z, согласованным «Who runs the reviewer».
- целостность: ✓ s-xr5xxa9cxf2mq5u, s-3wh8uhgn9jr2k74 и s-u2n5hwwqkb6zk4z ссылаются на этот узел; ссылки хуков и плагинов — п. 7 заметок.
- целесообразность: ✓ прогон оплачивает пользователь, который делает коммит.
- избыточность: ✓ не найдено (повтор с s-u2n5hwwqkb6zk4z снимается вырезкой там).
- недостаточность: ✓ не найдено.

## s-9rtrj24myzjvshu — **not ready**
- **DOUBT (author can settle it: it carries out the owner's ruling of 2026-11-17 on row 10.1.26).** Item 9 refuses code, not a SpecTag, so the sentence "A SpecTag or an entry of a kind that this list refuses binds nothing" does not reach it.
  - Unchanged code that has both `@spec none` and `@spec s-…` therefore stays bound to the rule. s-3xx2eukc8gtd2tx then gives it nothing, while the ruling gives it the result of rule 9.5.
  - EN: "a SpecTag on code that carries `@spec none` together with another SpecTag."
  - RU: «SpecTag кода, у которого есть `@spec none` вместе с другим SpecTag.»
  - The `stage3` field should follow.

**Оценка**
- согласованность: ✓ сверено со строкой 10.1.26 (s-k6dzuajejrw4cej) и её решениями от 2026-11-13 и 2026-11-17, 1.5.2, 9.1, s-5z5gnu7pahr82xp, s-33fw3ga4ctd94dq, s-5qdjyf6t898rsd4, s-trwczfskj5zmuft, s-36x8amvunmv2kp5.
- целостность: ✗ неизменённый код с `@spec none` и SpecTag правила не получает результата правила 9.5 (s-kkbqcb9xrpaepwn), которого требует решение от 2026-11-17; то же затрагивает proposal:s-weuyx98r7c923ab. Остальное названо в п. 1, 2, 13 и 16 заметок.
- целесообразность: ✓ строка 10.1.26.
- избыточность: ✓ не найдено.
- недостаточность: ✗ тот же случай: не сказано, привязывает ли что-нибудь SpecTag рядом с `@spec none`.

## new:tools-7-2-rule-test — **not ready**
- **WORDING FIX (author, rule 7.2.2).**
  - Delete from ¶1: "It takes the tests as the commit leaves them." / «Тесты он берёт в том виде, в каком их оставляет коммит.»
  - Replace ¶3 with the following.
  - EN: "In this check, `sheriff binding` takes into account each test as the commit leaves it, including:
    - a test that the commit leaves unchanged;
    - a test marked as skipped or as expected to fail.

    `sheriff binding` runs this check whether the specification is approved or a draft."
  - RU: «В этой проверке `sheriff binding` засчитывает каждый тест в том виде, в каком его оставляет коммит, в том числе:
    - тест, который коммит оставляет неизменным;
    - тест, помеченный как пропускаемый или как ожидаемо падающий.

    `sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик.»

**Оценка**
- согласованность: ✓ сверено со строкой 10.1.31 (s-m82tz4mp3f9r3fg), 1.4.1 (s-rah8b37kytb682y), решением от 2026-11-20, 12.3a (s-ktfstpv8rurznrp), s-zrsc6asgmhv8tnc, s-utf4mbt7ref8g9c, s-36x8amvunmv2kp5.
- целостность: ✓ п. 2 и 16 заметок названы.
- целесообразность: ✓ код правила без теста нарушает 1.4.1.
- избыточность: ✓ не найдено.
- недостаточность: ✓ не найдено.

**TERM:** these drafts bring in no new term. The earlier advice stands: gloss "runner" as "not a CI runner" in the docs (inference).

## Q1
Q1 is a question only the owner can answer, because under B the user pays for a run whose finding is disregarded. No earlier ruling settles it. In the answer the owner agreed to on 2026-11-20, a check of whether the implementation is complete "reports no failure" in a draft: B does exactly that, and A goes further. Each option states its costs and what it changes in the principles and the agreed rules.

One fact on A's side could be added to Q1: the owner's own remark of 2026-11-20 that such checks in a draft are «по большому счету … избыточная операция» (`D:/SpecSheriff/.ai_docs/t25-one-thought.md`, line 242).

**Findings only the owner can answer:** none.

Files read:
- `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`
- `D:/SpecSheriff/.ai_docs/t25-pass/group2-notes.md`
- `D:/SpecSheriff/.ai_docs/t25-pass/review-g2b-b.md`, `review-g2b-c.md`, `review-g2b-d.md`
- `D:/SpecSheriff/.ai_docs/t25-pass/english-g2b-fast.md`
- `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`
- `D:/SpecSheriff/specs/_guidelines/tools.json`
- `D:/SpecSheriff/skills/tools/src/review.ts`