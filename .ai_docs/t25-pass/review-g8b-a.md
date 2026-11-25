# The follow-up review of group 8, part a: the report of specsheriff-rule-reviewer

The Skill tool could not load `specsheriff-terminology-review` ("Unknown skill"). I read its SKILL.md from `C:/Users/PC/.claude/skills/synced/a08d2aec-…/specsheriff-terminology-review/SKILL.md` instead.

Every finding of the first review was applied. Two of the applied fixes brought in new defects: finding 1.3 in "The hooks" and finding 2.4 in "The pre-commit hook" (H1 and P1 below). None of the round-b settlements contradicts an agreed node, a principle or a ruling. Question 1 in `group8-notes.md` is in the required form: the recommendation and its basis come first, then each option with what a person sees and what it costs.

---

## `s-477gtdrkw34dzxw`, "The hooks": **not ready** (the author can make every fix)

**H1 (new in round b).** "They run `sheriff types` and the checks there" says the commit-msg hook runs `sheriff types`. It doesn't: it runs only `sheriff commit-message` and `sheriff review` there (s-npnmwyt6s3gypwe; `skills/tools/hooks/commit-msg`). The fix:
- EN: "Each of them runs its checks there, with that directory as git's working tree, against the repository's history."
- RU: «Каждый из них запускает там свои проверки, сделав этот каталог рабочим деревом git и сверяясь с историей репозитория.»

**H2 (rule 7.2.7, new in round b).** `sheriff types` in the `pre-commit` item has no citation. Write "`sheriff types` (§s-a8fn72xa782wvbk)" in both languages, and add a `cites` link.

**H3 (rule 7.2.7; a nit, since the first sentence of s-p29yawkkkgk7kxb cites the definition).** Write "the settings of each runner (§s-tnz9zgqx8c629a7, §s-p29yawkkkgk7kxb)". In Russian: «настройки каждого runner (§s-tnz9zgqx8c629a7, §s-p29yawkkkgk7kxb)».

**H4.** In the `pre-push` item, "compares the working tree with what the push sends" says every ref is compared. Round a settled that reading the other way. The fix:
- EN: "compares the working tree with each commit that the tests judge (§s-8a5eyy5n5hnsgrs)"
- RU: «сравнивает рабочее дерево с каждым коммитом, который оценивают тесты (§s-8a5eyy5n5hnsgrs)»

**Checklist**
- ✓: 1.2.3 Text and reason · 7.1 Goal · 7.2.1 Who must act · 7.2.2 Order · 7.2.3 General words · 7.2.4 Naming · 7.2.4.1 Coined names · 7.2.4.2 What a name says · 7.2.4.3 General word in a name · 7.2.4.4 Properties · 7.2.4.5 Relations · 7.2.5 Negation · 7.2.6 Lists that restrict (the list of what a check reads names what is allowed)
- 7.2.7 Words from the specification ✗: `sheriff types` has no citation; "runner" cites s-p29yawkkkgk7kxb rather than the node that defines it.
- ✓: 7.3.1 Title · 7.3.2 Thoughts · 7.3.3 Contents · 7.4.1 Counts · 7.4.2 Reason · 7.5.1 Superfluous · 7.5.2 Length · 7.5.3 Tables · 7.6.1 Language · 7.6.2 Capitals · 7.6.3 Examples
- Pairing test ✓: the first sentence grounds paragraph 3 and the second grounds paragraph 1, so not in order.

**Оценка**
- согласованность: ✗ — H1 приписывает `sheriff types` хуку commit-msg (s-npnmwyt6s3gypwe). Пункт `pre-push` шире, чем s-8a5eyy5n5hnsgrs (H4). С s-epaw9sgyaajzn8g, s-pcnyfp7gev7syax, s-tnz9zgqx8c629a7 и s-bsya3febm6u64ab расхождений нет.
- целостность: ✓ — ссылки на этот узел из s-7pk89t8z6wymmj9, s-b6qdtghnyha3fhk, s-n4m5zvh96yb299p, s-4mej6ccn7xu3d3p, s-n76wt2bkqdmh78x, s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4, s-tnz9zgqx8c629a7, s-stxmhq3hgfndvn6 и трёх узлов о хуках агента остаются верными.
- целесообразность: ✓ — правилу 10.2 нужен узел приложения, а список ведёт к узлу каждого хука (7.3.3).
- избыточность: ✓ — абзац о каталоге лишь частично повторён в s-npnmwyt6s3gypwe, который ссылается сюда.
- недостаточность: ✓ — пробелов не нашёл.

---

## `new:tools-6-pre-commit`, "The pre-commit hook": **not ready** (the author's fixes; question 1 for the owner is already on the page)

**P1 (rules 7.1 and 7.3.2, new in round b).** The sentence beginning "The hook writes each file that `sheriff types` writes into the working tree…" has 37 words and two problems:
- "into the working tree" can attach to `sheriff types` rather than to the hook;
- the sentence states two facts side by side: the hook writes the file, and it names the file.

Separately, "`sheriff types` and the checks run in that directory" leaves a developer asking how `sheriff types` runs there and yet writes nothing there. `stage3` answers (a second copy), but the text does not. The fix:
- Paragraph 2, second sentence: "The checks run in that directory." / «Проверки выполняются в этом каталоге.»
- Paragraph 3, EN: "For each file that `sheriff types` writes, the hook writes that file into the working tree, not into that directory, in place of whatever is at the same path. The checks therefore read each such file as it is staged. The hook names each such file as one for the author to stage. The hook itself stages nothing."
- Paragraph 3, RU: «Каждый файл, который записывает `sheriff types`, хук записывает не в этот каталог, а в рабочее дерево, на место того, что лежит по тому же пути. Поэтому проверки читают каждый такой файл в том виде, в каком он находится в стейджинге. Хук называет каждый такой файл файлом, который автору нужно добавить в стейджинг. Сам хук ничего в стейджинг не добавляет.»

**P2 (rule 7.2.3, and the Russian).** "validates against the schema" has no object, and the Russian adds «файлы». The fix, worded as s-7pk89t8z6wymmj9 words it:
- EN: "and validates the files of the specification against their schema (§s-xzcw3hv4hmxz7h7)"
- RU: «и проверяет файлы спецификации по их схеме (§s-xzcw3hv4hmxz7h7)»

**P3 (a nit).** The second sentence of the reason states two relations ("So …, and …, since …"). It reads only one way, and splitting it would pair the reason with paragraphs 1 and 3 in order, which the pairing test forbids. Leave it as it is.

**Checklist**
- ✓: 1.2.3 Text and reason
- 7.1 Goal ✗: "each file that `sheriff types` writes into the working tree" (P1).
- ✓: 7.2.1 Who must act · 7.2.2 Order
- 7.2.3 General words ✗: "validates against the schema" (P2).
- ✓: 7.2.4 Naming · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 Negation · 7.2.6 Lists that restrict · 7.2.7 Words from the specification · 7.3.1 Title
- 7.3.2 Thoughts ✗: "writes … and names it …" (P1); the reason's second sentence (the nit P3).
- ✓: 7.3.3 Contents · 7.4.1 Counts · 7.4.2 Reason · 7.5.1 Superfluous · 7.5.2 Length · 7.5.3 Tables · 7.6.1 Language · 7.6.2 Capitals · 7.6.3 Examples
- Pairing test ✓: the first sentence is a premise, and the second grounds two paragraphs in one sentence.

**Оценка**
- согласованность: ✗ — порядок расходится с «right after the first step» в 10.12 (s-pcnyfp7gev7syax). Это вопрос 1 владельцу; черновик исходит из ответа A. С s-7pk89t8z6wymmj9, s-a8fn72xa782wvbk, s-dbk2vyeg8z5jxna, s-n4m5zvh96yb299p, s-t9j29hppag2nren, решением 2026-10-31 и решением о Views согласуется.
- целостность: ✓ — стыкуется с s-477gtdrkw34dzxw, s-n4m5zvh96yb299p и s-7pk89t8z6wymmj9. Ссылки для переносимых решений сохранены.
- целесообразность: ✓ — порядок задаёт 10.12, отдельный узел требует 7.3.3.
- избыточность: ✓ — пункт о `sheriff validate` повторяет s-7pk89t8z6wymmj9 только для того, чтобы показать исключение.
- недостаточность: ✗ — где работает `sheriff types`, говорит только `stage3` (P1).

---

## `new:tools-6-push-compare`, "The working tree compared with what a push sends": **ready**

**N1 (a nit, since this field is not part of the node, though the page shows it).** The `change` field of the item "the file differs…" still says «см. абзац ниже». The definition is now above, so write «см. первый абзац».

**Checklist**
- ✓: 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3
- Pairing test ✓: the reason is a single sentence.

**Оценка**
- согласованность: ✓ — сверено с s-b6qdtghnyha3fhk, строкой 10.1.44 (s-aufnqn6t7y2me7a), 10.12 и решением 2026-10-31. «files that git ignores» — как в s-n4m5zvh96yb299p, строке 10.1.37b и s-hcmpjmwtgfwzncu.
- целостность: ✓ — стыкуется с s-b6qdtghnyha3fhk и, после правки H4, с пунктом `pre-push` в «The hooks».
- целесообразность: ✓ — без сравнения тесты оценивали бы не отправленный коммит.
- избыточность: ✓ — повторов не нашёл.
- недостаточность: ✓ — пробелов не нашёл.

**Terms:** round b brings in no new term. Git's "track" and "ignore" are used in git's own meaning, and "runner" is already recorded for a gloss in the docs (notes, item 11).

## Findings only the owner can answer

1. Question 1, the order of the pre-commit hook against rule 10.12, is already on the page of group 8. Under answer A, which the draft assumes, `new:tools-6-pre-commit` is final once P1 and P2 are fixed.

Nothing else needs the owner.

The drafts are in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, the notes in `D:/SpecSheriff/.ai_docs/t25-pass/group8-notes.md`, and the hook script that H1 relies on is `D:/SpecSheriff/skills/tools/hooks/commit-msg`.

## The main session's decisions

They are in fix-brief-group8-c.md, which holds the decisions on all six reports of the follow-up review.
