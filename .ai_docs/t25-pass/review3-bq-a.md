# Third review of base-questions.md, part A: the report

I loaded `specsheriff-terminology-review` and printed the checklist with `node .claude/vt/writing-rules.mjs`. I read both briefs, `fix-brief-bq-c.md`, the notes' "Round c", the diff from `base-questions.before-c.md`, and every node and draft that sections 1 and 2 cite. I edited nothing. The item-by-item format means the report runs past 300 words, as in round b.

**Verdict:** 10 items are ready: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6 and 2.8. Three are not ready: 1.4, 2.7 and 2.9. Two of the defects come from my own round-b wording: the garden paths in 1.4, and the phrase "within the base specification" in 2.9.

## Checklist (1.1–1.4, both introductions, 2.2–2.9)

- **1.2.3 A rule is made of its text and its reason:** ✓
- **7.1 The goal, the reader and the scope:**
  - ✗ 1.4, s-weuyx98r7c923ab: "The check for code that no SpecTag binds names this command". "binds names" first reads as one phrase. Its reason has the same problem in "…binds covers…".
  - ✗ 1.4, s-3xx2eukc8gtd2tx: the reason has "…that no SpecTag binds costs the commit". In the text, "that no SpecTag binds (§s-5z5gnu7pahr82xp) requires" puts the citation of the form of a SpecTag on "binds".
  - ✗ 2.9, row 2: "every such node is in one domain" can mean each node is in some domain, so nodes of two domains would pass.
  - ✗ 2.9, the rule: "…cite or link to is defined" read literally also covers a term that no node cites, and row 2 does not cover that term.
  - ✓ for the rest.
- **7.2.1 Who must act:** ✓
- **7.2.2 The order of the text:** ✓
- **7.2.3 General words:** ✓
- **7.2.4 Naming:** ✓
- **7.2.4.1 Coined names:** ✓
- **7.2.4.2 What a name says:** ✓
- **7.2.4.3 A general word in a name:** ✓
- **7.2.4.4 Properties:** ✓
- **7.2.4.5 Relations to other entities:** ✓
- **7.2.5 Definition by negation:** ✓
- **7.2.6 Lists that restrict:** ✓
- **7.2.7 Words that take their meaning from the specification:** ✓
- **7.3.1 The title:** ✓
- **7.3.2 Thoughts and sentences:** ✓
- **7.3.3 The contents of a node:** ✓
- **7.4.1 Counts in prose:** ✓
- **7.4.2 The reason:** ✓
- **7.5.1 Superfluous rules:** ✓
- **7.5.2 The length of a sentence:** ✗ (nit) 2.7: "on an owner's behalf as the rule on what an agent approves on an owner's behalf allows" says "on an owner's behalf" twice.
- **7.5.3 Rules as tables:** ✓
- **7.6.1 The language of the specification:** ✓
- **7.6.2 Capital letters:** ✓
- **7.6.3 Examples:** ✓ (both examples of 2.6, and the examples of 2.3 and 2.9)
- **Pairing test:** ✓ (2.3, 2.6, 2.7 and 2.9 each speak of the rule as a whole)

## Оценка

- **1.1:** согласованность, целостность, целесообразность, избыточность, недостаточность — все ✓ (правило 12.7, строка 10.1.8, второй случай s-t5uw8zfxzhfdg86).
- **1.2, 2.1, 2.2:** все пять ✓ (как в ревью b).
- **1.3:** все пять ✓. Сравнено с s-utvqbypzhmgndug, s-qzthyh7yqvfhsa2 и s-q3pfzyaxvpr2zj2; «тогда» есть и в согласованном русском примере 10.7.
- **1.4:** все пять ✓. Других согласованных узлов описания инструментов со старыми словами нет. Примеры с «no SpecTag» в s-chsfpkgpmfk4fft, s-3xx2eukc8gtd2tx, s-m59dqwkw2e96wne и s-nxgkp988mej79eg остаются верными.
- **2.3:** все пять ✓ (s-npnmwyt6s3gypwe).
- **2.4:** все пять ✓. Решение от 2026-11-04 на s-83ev4wwesbwnhnp сверено, s-st6td4mua9uqt9z тоже.
- **2.5:** все пять ✓ (строка 10.1.37b).
- **2.6:** все пять ✓ (s-9rtrj24myzjvshu, s-3xx2eukc8gtd2tx, s-weuyx98r7c923ab).
- **2.7:** все пять ✓ (s-t5uw8zfxzhfdg86, s-9kfdycuq34beqvs, s-5ah25f6gy99panq, s-qzthyh7yqvfhsa2).
- **2.8:** все пять ✓. Запись в файле привязок содержит SpecTag, поэтому новое предложение её охватывает. Несуществующий sid отвергает строка 10.1.28.
- **2.9**
  - согласованность ✗. Правило 3.2 «позволяет» части определять термины, а правило Domains по варианту Б отвергает такой термин в разделе контрактов, вопреки первому предложению 3.2 (правило 1.7.2). Термин, который нужен только части технического приложения, правило 3.2 в домен не пускает, а строка 2 требует его там.
  - целостность ✓ (правила 3.1, 4.1, 11.1.5, 1.7.2, 1.7.3; s-yauyedny2yzvs4c и его todo; строки 10.1.6 и 11.3.1–11.3.6)
  - целесообразность ✓ (решение от 2026-11-12)
  - избыточность ✓
  - недостаточность ✓

## Items

**1.1: ready.**
- **Nit (author), section 1's introduction.** It says each change either renames what a decision renames or adds a link. Neither replacement in 1.1 is a decision's rename. Replace its first two sentences with: "Each change below is one of these: a rename that a decision makes, a replacement that changes no meaning, or a new link. A rename falls under the owner's rule "What a decision removes or renames is removed or renamed without asking again". A replacement that changes no meaning is approved on the owner's behalf, as the rule on what an agent approves on an owner's behalf allows (§s-t5uw8zfxzhfdg86)." In the last sentence, write "the nodes that restate it or name its check".

**1.3: ready.**
- **Nit (author).** "Rule 1.3.3 gets the same rename in its proposal, 2.7" is now out of date. Write: "Proposal 2.7 rewrites rule 1.3.3's reason, which also restated rule 9.5, without that phrase."

**1.4: not ready (author).** Fix the garden paths. Give the Russian in full instead of "in the number and gender that the sentence needs": «без SpecTag» cannot simply be swapped for the new phrase.
- s-3xx2eukc8gtd2tx, text:
  - EN: "…as the rule requires (§s-kkbqcb9xrpaepwn) for code and tests that no SpecTag (§s-5z5gnu7pahr82xp) binds:"
  - RU: «…так, как требует (§s-kkbqcb9xrpaepwn) правило о коде и тестах, которые не привязаны ни одним SpecTag (§s-5z5gnu7pahr82xp):»
- s-3xx2eukc8gtd2tx, reason:
  - EN: "The approval status and the `strict` flag decide what code that is outside the commit, and that no SpecTag binds, costs the commit: nothing, a warning or a refusal."
  - RU: «Статус одобрения и флаг `strict` определяют, чего стоит коммиту код, который находится за пределами коммита и не привязан ни одним SpecTag: ничего, предупреждения или отказа.»
- s-weuyx98r7c923ab, text:
  - EN: "The check for such code names this command in its warning and in its refusal (§s-kkbqcb9xrpaepwn)."
  - RU: «Проверка такого кода называет эту команду в своём предупреждении и отказе (§s-kkbqcb9xrpaepwn).»
- s-weuyx98r7c923ab, reason:
  - EN: "The check covers in one warning all the code that no SpecTag binds, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn)."
  - RU: «Проверка сообщает обо всём коде, который не привязан ни одним SpecTag, одним предупреждением, чтобы оно не заслоняло другие находки (§s-kkbqcb9xrpaepwn).»
- s-chsfpkgpmfk4fft, RU: «- `sheriff untagged` — для проверки кода, который не привязан ни одним SpecTag (§s-weuyx98r7c923ab);»
- s-f5rz6b7dhxejjts, RU: «…перечисляет символы кода системы, которые не привязаны ни одним SpecTag (§s-8xw4mgvpexyvw5q), каждый с его файлом (§s-weuyx98r7c923ab);»

**2.2: ready.**
- **Nit (author), Russian.** Drop «его»: «…карта подписывает расположением (§s-kag2m9tzdnduxdx).» Make the same change in `change`.

**2.3, 2.4, 2.5, 2.6, 2.8: ready.** Every finding was applied, and no new defect appeared. "Rule 9.3" in 2.8 is now stated correctly.

**2.7: not ready (author).**
- **Author.** "Decisions carried out" still lists "in the reason, the rename of change 1.3", but the new reason drops that phrase. Replace the first sentence with: "the item in "Found and owed" from group 6 (2026-11-24), "stands" becoming "is in force", in English only. The agreed reason also restated rule 9.5 in the wording that change 1.3 renames; the new reason no longer restates it."
- **CUT (nit), the reason.**
  - EN: "…or an agent on an owner's behalf as the rule on such approvals allows (§s-t5uw8zfxzhfdg86), …"
  - RU: «…как позволяет правило о таких одобрениях (§s-t5uw8zfxzhfdg86), …»

**2.9: not ready (author).**

1. **The rule and row 2 in one wording.** The author's note is right that the two differ on a term no node cites. Row 2 also has the reading that lets two domains pass, and its Russian «ссылаются … хотя бы один узел» breaks number agreement.
   - Rule, first sentence:
     - EN: "A term is defined in a domain (§s-ypa92gpcj3f5zj8) if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it (§s-vj7ercem526zd6v)."
     - RU: «Термин определяется в домене (§s-ypa92gpcj3f5zj8), если на него ссылается или с ним связан хотя бы один узел и каждый такой узел находится в этом домене или в части технического приложения, названной по нему (§s-vj7ercem526zd6v).»
   - Row 2:
     - EN: "A term node is in a domain if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it"
     - RU: «Узел-термин находится в домене, если на него ссылается или с ним связан хотя бы один узел и каждый такой узел находится в этом домене или в части технического приложения, названной по нему»
   - This keeps what the brief settled for B's first sentence, the part of the technical appendix. It adds only the citing node that the row already requires.
   - Option B of 4.6, in its wording and in "What a person sees", follows these words (part B). Under A, the sentence takes the same words with "may be defined".
2. **Rule 3.2 is still worded for option A.**
   - Under B the Domains extension refuses a term that rule 3.2's first sentence places in the contracts section, and "let" does not allow that refusal (rule 1.7.2).
   - My phrase "within the base specification" also leaves out a term that only the technical appendix cites.
   - EN: "An extension of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g) may instead require one of the parts into which the base specification is divided (§s-qmmzf9nksfsa3qp) to define the terms that no other part of the base specification needs."
   - RU: «Выбранное проектом расширение guidelines (§s-9ttvcwpqkehm58g) может вместо этого требовать, чтобы одна из частей, на которые разделена базовая спецификация (§s-qmmzf9nksfsa3qp), определяла термины, которые не нужны никакой другой части базовой спецификации.»
   - `change`: «…может потребовать, чтобы часть базовой спецификации определяла термины, которые не нужны никакой другой её части.»
   - The note on A adds: under A, rule 3.2 says "may instead let … define".
3. **Russian of rule 3.2.** It rewrites the agreed Russian («необходимы», «в контракты», «отклоняются»), the defect already fixed in 2.8. Keep «Если разделу необходимы собственные термины, их добавляют в контракты.» and end the third sentence with «…отклоняются.» Add to `change`: «Согласованный русский текст первого предложения сохранён.»

**Nit (main session).** The owner's page must show 2.1, 2.2, 2.4, 2.5 and 2.8 in full, including the parts this file leaves out. This is what the rule "Nodes are shown in groups, each node in full" requires.

**Earlier findings:** all were applied. The rejection of the CI cut holds: the owner agreed to the sentence, and `docs/principles.md` holds the same one.

**TERM:** nothing new.

**Ready:** 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.8. **Not ready:** 1.4, 2.7, 2.9. **Should not reach the owner:** none.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/base-questions.md`, `D:/SpecSheriff/.ai_docs/t25-pass/base-questions-notes.md`, `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`, `D:/SpecSheriff/.ai_docs/t25-pass/newform.json`.
