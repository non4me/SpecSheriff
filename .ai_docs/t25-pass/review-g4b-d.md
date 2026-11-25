I'm reporting on two drafts. Neither is ready yet, and each needs only fixes the author can make. Neither raises a question that only the owner can answer.

The skill `specsheriff-terminology-review` was loaded. I read both briefs, the first review of these drafts (`review-g4-d.md`), both readers' reports, the "Round b" section of `group4-notes.md`, `fix-brief-group4-b.md`, the base draft `new:tools-1-project`, the nodes the drafts cite, and the pre-push hook script with `push-mode.ts`. I changed no file.

## 1. `s-b6qdtghnyha3fhk`: "Running the tests before a push"

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✗
  - Paragraph 2 says the guidelines count "as that commit holds them in `project.json`". Paragraph 3 says the rule is read "in its last approved wording as of that commit", which may be a wording the commit does not hold.
  - "that commit" in paragraph 3 points back to a commit named in paragraph 2.
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
- Pairing test of the reason ✓

**Оценка**
- согласованность: ✓ — сверено с s-x8uzc8z44pwtd3h, строкой 10.1.44 (s-aufnqn6t7y2me7a) и её решениями от 2026-11-17 и 2026-11-18, 10.6, 1.3.2, 10.12, 10.15, s-a8fn72xa782wvbk, s-5hb9k2e34dgn284, «The hooks» (s-477gtdrkw34dzxw), решением 4 из fix-brief и принципом «Nothing unapproved is implemented».
- целостность: ✓ — опирается на `proposal:new-tools-1-project-g4`. Изменения в «The hooks» (пункт 57) названы в заметках.
- целесообразность: ✓ — проект, который назвал push моментом запуска тестов, не пропускает в общую ветку изменение, тесты которого не проходят.
- избыточность: ✓ — абзац 3 частично повторяет `proposal:new-tools-1-project-g4`. Этого требует решение 4, а у того узла ещё нет sid. Абзац добавляет «на момент этого коммита».
- недостаточность: ✗ — условие 2 и абзац 3 называют разные формулировки правила, и непонятно, какая действует, если коммит хранит черновик (WORDING FIX 1).

**Verdict: not ready.** Every finding of the first review and of the readers was applied, or rejected for a reason that holds. The author's reading of item 40 holds: row 10.1.44 makes the refusal depend on the project's own guidelines, the follow-up of 2026-11-21 left this item to decide it, and a push that only deletes refs sends no commit.

**WORDING FIX 1 (author can fix; introduced in round b).** Ruling 4 asked to correct the places that read `project.json` "as the commit keeps it", and condition 2 is one of them.
- Condition 2, EN: "the project's own guidelines (§s-u7tw6m8npxmv5tu), as of that commit, name a push as the moment at which the tests run (§s-x8uzc8z44pwtd3h)."
- Condition 2, RU: «собственные guidelines проекта (§s-u7tw6m8npxmv5tu) на момент этого коммита называют push моментом запуска тестов (§s-x8uzc8z44pwtd3h).»
- Paragraph 3, first sentence, EN: "In the commit that a ref names, the SpecSheriff tools look for `push` in the `TextRule.list` (§s-eferktypcj7njt5) of each rule of `project.json` that has a `refines` link (§s-sn6au3vcr9uy5pm) to the rule on when the tests must pass (§s-x8uzc8z44pwtd3h)."
- Paragraph 3, first sentence, RU: «В коммите, который называет ref, инструменты SpecSheriff ищут `push` в `TextRule.list` (§s-eferktypcj7njt5) каждого правила `project.json`, у которого есть связь `refines` (§s-sn6au3vcr9uy5pm) с правилом о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h).»
- Record both changes in those parts' `change` entries.

**Note on `stage3`.** s-a8fn72xa782wvbk looks the wording up "on the current branch". Here it should be looked up in the pushed commit and its ancestors.

**TERM: no finding.** "pre-push hook", "ref" and "push" are git's own words; I took that from the first review and did not re-read git's documentation.

## 2. `proposal:new-tools-1-project-g4`: "What the SpecSheriff tools read in the project's own guidelines"

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
- Pairing test of the reason ✓

**Оценка**
- согласованность: ✓ — сверено с 1.3.2, 10.8, 10.9, 10.11, 10.15, s-x8uzc8z44pwtd3h, строкой 10.1.44, s-7pk89t8z6wymmj9, `new:tools-1-project` (согласован 2026-11-21) и принципом «Nothing unapproved is implemented».
- целостность: ✓ — новый пункт стыкуется с s-b6qdtghnyha3fhk. «How a project's own code generator is run» по-прежнему запускает генератор, только пока его правило одобрено.
- целесообразность: ✓ — хуку pre-push нужно знать, называют ли собственные guidelines проекта push.
- избыточность: ✓ — не найдена.
- недостаточность: ✗ — ссылка на 10.15 не говорит, как найти последнюю одобренную формулировку правила, если файлы хранят черновик. Это говорит s-a8fn72xa782wvbk, на который ссылаются остальные узлы группы.

**Verdict: not ready.** The proposal changes only what its `change` field lists, and each listed change is needed.

**WORDING FIX 2 (author can fix).**
- EN: "in the rule's last approved wording (§s-a8fn72xa782wvbk, §s-qyjw8xez6t6adc3)"
- RU: «в последней одобренной формулировке этого правила (§s-a8fn72xa782wvbk, §s-qyjw8xez6t6adc3)»
- Add a `cites` link to s-a8fn72xa782wvbk.

**WORDING FIX 3 (author can fix, `change` fields only).**
- `reasonChange` calls "may give" an English edit, but the Russian changed too. After «правка английского по замечаниям читателей», add «; в русском «даёт … располагает» стало «может давать … располагать»».
- The top-level `change` field does not list the English-only change "the rule" → "a rule"; add it.

## The question on merge commits

The question is put in terms of what a developer sees. The recommendation comes first, and each option states a cost. But option A's cost leaves out one risk that remains: a merged commit that was made without the hooks is never checked by rows 10.1.40 and 10.1.42. Suggested addition to A's cost: «Остаётся риск: если влитый коммит сделан без хуков (`git commit --no-verify` или в клоне, где хуки не включены), проверки строк 10.1.40 и 10.1.42 так и не увидят принесённый им код.» The drafts that carry answer A are not in my input, so I did not check them.

## Findings that only the owner can answer

None in my input.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group4-notes.md`
