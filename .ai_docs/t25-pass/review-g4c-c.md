The skill `specsheriff-terminology-review` was loaded. Short names used below: **A** = `s-txbwsthdqhvyzd2`, **B** = `s-jgejd5rpd9d43pd`, **C** = `proposal:row-10-1-41-g4`, **D** = `s-qqs2svksmjct753`.

## Checklist (`node .claude/vt/writing-rules.mjs`)

| Rule | A | B | C | D |
|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✗ "it makes the rule one that the system's code must implement": read with §s-6fw72j65jkqrfpf, this also covers the commit that approves the specification (C1) | ✗ "before the commit or after it changes" ("after it changes" reads as a clause, C2); "the rule becomes one that the system's code must implement" (C1) | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ (a cell, no title) | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ (the owner's ruling of 2026-11-20) | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ |

## Оценка

**A**
- согласованность: ✓ — 10.1.40 и решения от 2026-11-19 и 2026-11-20, 9.2 (цепочка `implements`), s-7gab4ptjt2khfr5, s-v4qus7raqnwzneb, s-75ue25v6r23jkk8, s-gb8s9657a65hqmv, принцип о рецензенте. Абзац о слиянии отступает от s-2x58az67bm6cxq2: это вопрос ответственному.
- целостность: ✓ — s-477gtdrkw34dzxw, s-f5rz6b7dhxejjts и impl.json названы в заметках.
- целесообразность: ✓ — 10.1.40, решения от 2026-11-19.
- избыточность: ✓.
- недостаточность: ✓.

**B**
- согласованность: ✗ — четвёртый пункт, прочитанный вместе с первым предложением 9.2, включает в коммит, одобряющий спецификацию, каждое одобренное правило. Это противоречит 10.6 и решению от 2026-11-17. С остальным узел согласован: 10.1.41, 9.1, 9.8, s-5z5gnu7pahr82xp, s-2x58az67bm6cxq2, s-33fw3ga4ctd94dq, s-zefk589ykh37b8u.
- целостность: ✓ — дополнение к s-33fw3ga4ctd94dq и impl.json названы в заметках.
- целесообразность: ✓ — 10.1.41, урегулирования 6 (раунд b) и 4 (раунд c).
- избыточность: ✓.
- недостаточность: ✗ — тот же пункт: неясно, какие правила включает коммит, одобряющий спецификацию.

**C**
- согласованность: ✗ — то же противоречие, что у B (10.6, решение от 2026-11-17). С 9.2, 9.8, 1.3.5 и решениями строки от 2026-11-13, 2026-11-17 и 2026-11-20 строка согласована.
- целостность: ✓ — в B тот же пункт; table-10-1.json и страница таблицы названы в заметках.
- целесообразность: ✓ — урегулирование 4.
- избыточность: ✓.
- недостаточность: ✗ — тот же пункт.

**D**
- согласованность: ✓ — 10.1.42 (решение от 2026-11-17), 9.6 (решение от 2026-11-11), s-2x58az67bm6cxq2 (слияние — вопрос ответственному), s-5qdjyf6t898rsd4, s-trwczfskj5zmuft. По документации git 2.50.1, хук commit-msg запускают и git commit, и git merge.
- целостность: ✓ — s-f5rz6b7dhxejjts, s-477gtdrkw34dzxw и impl.json названы в заметках.
- целесообразность: ✓ — 10.1.42.
- избыточность: ✓.
- недостаточность: ✓.

## Verdicts and findings

**A is ready**, if the owner chooses answer A on merges. **B is not ready. C is not ready. D is ready.** Every round-b finding on these four drafts was applied, and each holds. Round c brought in two new defects, C1 and C2.

**C1 (author; B1 is the same fix in B). DOUBT, which the agreed rules settle.**
- Round c reworded review b-c's "stops being one of the rules to which the requirement … does not apply" as "becomes one that the system's code must implement". That widened its meaning.
- Rule 9.2 makes this requirement depend on the specification's approval status. So the commit that approves the specification would include every approved rule, and would be refused for any rule that lacks code or a test.
- Rule 10.6 and the ruling of 2026-11-17 let the owner approve the specification with such rules, once the owner confirms. B's `stage3` note already reads the item in the narrow sense.

The fix:
- C, EN: "the rule stops falling under the exceptions to the requirement that a rule be implemented (§s-6fw72j65jkqrfpf), for example because its exemption from implementation ends (§s-gf6n8ge4mke3pr2) or because it is moved out of the technical debt (§s-2r7k2aeyusgy6fw)."
- C, RU: «правило перестаёт подпадать под исключения из требования быть реализованным (§s-6fw72j65jkqrfpf), например потому, что заканчивается его освобождение от реализации (§s-gf6n8ge4mke3pr2) или его переносят из технического долга (§s-2r7k2aeyusgy6fw).»
- B, EN: "it takes the rule out of the exceptions to the requirement that a rule be implemented (§s-6fw72j65jkqrfpf), for example by ending … or by moving …" (the rest of the item as it is now).
- B, RU: «выводит правило из числа исключений из требования быть реализованным (§s-6fw72j65jkqrfpf), например прекращает … или переносит …»
- Both `change` fields say why.

**C2 (author). WORDING FIX, English only.** Round c reordered the second item as the readers suggested. Now "after it changes" reads as a clause, and the item seems to have no verb. The fix: "a test or code that is bound to the rule, before the commit or after it, changes;". The agreed Russian stays.

**C3 (author).** The `change` field says the Russian is unchanged. Two Russian sentences differ from `table-10-1.json`:
- Restore the agreed first sentence, «…привязано к тесту, не помеченному как пропускаемый или как ожидаемо падающий, и к коду системы помимо тестов». Only the English needed the new word order.
- In the example, list in `change` that «R входит в коммит и проходит проверку» became «R входит в коммит, и коммит проходит». The new wording matches the English.

**B2 (author). WORDING FIX, Russian only.** «реализовывать не должен» can be read as "must not implement". The fix: «которые код системы реализовывать не обязан».

**Q1 (author). The merge question leaves out a risk of option A.** The rule "Every option is offered with its cost" requires every risk that remains. Add to A's cost: «Второй остающийся риск: если при разрешении конфликта слияние берёт новую одобренную формулировку правила из одного родителя, а тесты или код этого правила — из другого, проверка строки 10.1.40 этого не видит: относительно каждого родителя в отдельности слияние ничего из этого не меняет. При Б такое слияние отвергается, если прежняя формулировка — в первом родителе.»

**Nits.** A careful reader would not need any of these fixed before the owner reads the node.
- A, reason: "its" comes before the noun it refers to. The fix: "Unless the tests and code of an approved rule follow its new wording in the same commit, the rule enters the history with tests and code written for its earlier wording (§s-ddd2e96uke4y83j)." This matches the Russian.
- A, Russian example: «…но не меняет ни одного из его тестов».
- B, the `change` field of the test item: «ожидающий неудачи» → «ожидаемо падающий».
- D, example: "its message" could be read as the message of `texts.json`. The fix: "and the commit's message contains no sid" / «а в сообщении коммита нет ни одного sid».
- D, CUT in paragraph 2: drop "that the commit adds or changes", which paragraph 1 already says. In Russian, drop «которые коммит добавляет или меняет».
- D, Russian: «потому что строки после неё содержат дифф…».
- D, `stage3`: according to git 2.50.1's docs, `core.commentChar` may be `auto`, or a string (its alias is `core.commentString`). The note should say how the scissors line is found in that case.

**The brief's points that fall in this input:** the author's readings of items 37, 38 and 39 hold.

**TERM.** None needs the owner.
- "trailer", "scissors line" and the commit-msg hook on a merge are git's own terms, with the same meaning. I checked them in the git 2.50.1 docs during this run.
- "lag behind" matches OpenFastTrace's "outdated" only in part. The gloss is already recorded for the docs.
- "skipped" and "expected to fail" mean what pytest's skip and xfail mean (unverified).

## Questions only the owner can answer

1. Merge commits: answer A, once Q1 is added to the question.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group4-notes.md`, `D:/SpecSheriff/.ai_docs/t25-pass/table-10-1.json`, `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`.
