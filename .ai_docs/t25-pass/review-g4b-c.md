I reviewed the four drafts in `D:/SpecSheriff/.ai_docs/t25-pass/review-input-g4b-c.md`, and none is ready yet. Every fix is the author's to make, except two points listed at the end, which go to the owner. All round-a findings on these drafts were either applied or rejected for reasons that hold. One round-b fix brought in a new defect (D1 below).

Short names used below: **A** = `s-txbwsthdqhvyzd2`, **B** = `s-jgejd5rpd9d43pd`, **C** = `proposal:row-10-1-41-g4`, **D** = `s-qqs2svksmjct753`.

## Checklist

| Rule | A | B | C | D |
|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✗ "Each merged commit was checked when it was made." This sentence is in the text but requires nothing |
| 7.1 The goal, the reader and the scope | ✗ "where it is bound in any of its parents": "its" can be read as the code's or the test's parents | ✓ | ✓ | ✗ "naming, by its file, its sid and its location (…), each node": "its" points forward and first reads as the message's |
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
| 7.2.7 Words that take their meaning from the specification | ✗ "the fingerprint of the rule's wording": first use, no citation | ✓ | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✗ "counts only what the merge changes relative to every one of its parents": the first item says the same again | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ |

**The brief's points that fall in this input** all hold:
- **Item 37:** moving the check to `sheriff commit-message` is right, and so is reading a change of the approved wording by fingerprint.
- **Item 38:** leaving out everything under `specs/_guidelines/` is right.
- **Item 39:** dropping the refusal of a sid that names no node is right.

A script check confirmed that every citation has a link and that the Russian cites the same sids as the English.

## A — `s-txbwsthdqhvyzd2` "An approved rule whose tests or code lag behind it": **not ready**

**A1 (author).** The merge paragraph breaks 7.1 and 7.5.2. Replace the lead sentence and the second item:
- EN: "`sheriff commit-message` judges a merge commit as follows, since each merged commit was checked when it was made:
  - the merge changes a rule's approved wording, or adds, changes or removes a test or code, only where it does so relative to each of its parents;
  - code or a test is bound to a rule before the commit where it is bound in any of the merge commit's parents."
- RU: «Коммит слияния `sheriff commit-message` оценивает следующим образом, потому что каждый влитый коммит был проверен, когда его делали:
  - слияние меняет одобренную формулировку правила или добавляет, меняет или удаляет тест или код, только если оно делает это относительно каждого из своих родителей;
  - код или тест привязан к правилу до коммита, если он привязан хотя бы в одном из родителей коммита слияния.»
- Update the list "What goes if the owner does not choose A" in `group4-notes.md` to match.

**A2 (author).** Fixes 7.2.7.
- EN: "the fingerprint (§s-v4qus7raqnwzneb) of the rule's wording as the commit leaves it differs from…"
- RU: «отпечаток (§s-v4qus7raqnwzneb) формулировки правила…»

**Оценка**
- согласованность: ✓ — 10.1.40 (s-ddd2e96uke4y83j) и его решения от 2026-11-19 и 2026-11-20, 10.1.41 (цепочка `implements`), 10.1.43a, 9.2, s-7gab4ptjt2khfr5, s-v4qus7raqnwzneb, s-75ue25v6r23jkk8, s-gb8s9657a65hqmv. Абзац о слиянии сужает для этой проверки сравнение с первым родителем из s-2x58az67bm6cxq2; это вопрос ответственному.
- целостность: ✓ — s-477gtdrkw34dzxw, s-f5rz6b7dhxejjts, impl.json и todo строки 10.1.40 названы в заметках.
- целесообразность: ✓ — 10.1.40, решения от 2026-11-19.
- избыточность: ✗ — вводная фраза абзаца о слиянии повторяет его первый пункт.
- недостаточность: ✓.

## B — `s-jgejd5rpd9d43pd` "An approved rule without code or a test": **not ready**

**B1 (author).** The rule "A rule says what holds" in `.claude/vt/rules.md` asks for the positive form.
- EN: replace "or no longer reaches it" with "or stops reaching it".
- RU: replace «удалена или больше до него не доходит» with «удаляется или перестаёт до него доходить».

**B2 (author).** In the Russian example, «не может не пройти» says the skipped test passes. The English says only that it cannot fail. Use «который не может упасть ни при одном запуске тестов».

**B3 (author).** In the Russian, replace «ни как ожидающий неудачи» with «ни как ожидаемо падающий». That is the owner's word in the agreed row 10.1.41, and one thing should have one name.

**Оценка**
- согласованность: ✓ — 10.1.41, 9.1, 9.2, 9.8 (решение от 2026-11-11), 1.3.5, 8.3, s-5z5gnu7pahr82xp, s-75ue25v6r23jkk8, s-2x58az67bm6cxq2, s-33fw3ga4ctd94dq, s-36x8amvunmv2kp5.
- целостность: ✓ — дополнение к s-33fw3ga4ctd94dq и impl.json названы в заметках; четвёртый пункт совпадает с предложением по строке 10.1.41.
- целесообразность: ✓ — 10.1.41, урегулирование 6.
- избыточность: ✓.
- недостаточность: ✗ — правило, перенесённое из `specs/tech/debt.json` (одобрение сохраняется, 1.3.5), и узлы собственного типа, которым стала нужна реализация (8.3), подпадают под 9.2, не входя ни в один коммит. Вопрос 2 ниже.

## C — `proposal:row-10-1-41-g4` (row 10.1.41): **not ready**

The proposal changes only what its `change` field lists: it adds one item and turns the third item's full stop into a semicolon. The new citation is backed by the row's existing `checks` link to s-gf6n8ge4mke3pr2.

**C1 (author).** Apply the same positive-form fix in the new item and add it to `change`.
- EN: "is removed or stops reaching it".
- RU: «удаляется или перестаёт до него доходить». This also matches «удаляется» in the third item.

**C2 (author).** The `question` field says "None", but the new item has a cost the owner should see. Add to `change`: "While the specification is approved, a commit that leaves an exempting node a draft, such as a rewording that awaits its owner, is refused until each rule that the node exempts has code and a test, unless the new wording is approved in the same commit."

**Оценка**
- согласованность: ✓ — 9.2, 9.8 (освобождение действует, только пока узел одобрен), 1.3.5 (связи не входят в формулировку), решения строки от 2026-11-20.
- целостность: ✓ — s-jgejd5rpd9d43pd содержит тот же пункт; table-10-1.json и страница таблицы названы в заметках.
- целесообразность: ✓ — урегулирование 6.
- избыточность: ✓.
- недостаточность: ✗ — как у s-jgejd5rpd9d43pd: перенос из технического долга и собственный тип, которому стала нужна реализация.

## D — `s-qqs2svksmjct753` "The nodes that a commit message must name": **not ready**

**D1 (author).** The round-b fix of the readers' point brought in a new 7.1 defect.
- EN: "It refuses any other message. For each node whose sid the message lacks, the refusal names the node's file, sid and location (§s-kag2m9tzdnduxdx)."
- RU: «Любое другое сообщение он отвергает. Для каждого узла, sid которого в сообщении нет, отказ называет файл, sid и расположение узла (§s-kag2m9tzdnduxdx).»

**D2 (author).** Fixes 1.2.3. Join the two merge sentences into one, as A does.
- EN: "For a merge commit, `sheriff commit-message` counts only the code that the merge adds or changes relative to each of its parents, since each merged commit was checked when it was made."
- RU: «Для коммита слияния `sheriff commit-message` учитывает только код, который слияние добавляет или меняет относительно каждого из своих родителей, потому что каждый влитый коммит был проверен, когда его делали.»

**Оценка**
- согласованность: ✓ — 10.1.42, 9.6 (решения от 2026-11-11 и 2026-11-17), s-2x58az67bm6cxq2 (слияние — вопрос ответственному), s-36x8amvunmv2kp5, s-5qdjyf6t898rsd4, s-trwczfskj5zmuft.
- целостность: ✓ — s-f5rz6b7dhxejjts, s-477gtdrkw34dzxw и impl.json названы в заметках.
- целесообразность: ✓ — 10.1.42.
- избыточность: ✓.
- недостаточность: ✓.

## The merge question («Вопрос ответственному»)

The question is put in terms of what a developer sees. Both drafts carry answer A exactly as the question describes it. Three fixes for the author:
- **Order.** The rule "One question per message" puts the recommendation and its reason first, so «Рекомендую А: …» moves before the options.
- **What the developer sees under A.** Replace «отстают тесты одобренного правила, нужен trailer или изменение тестов» with «отстают тесты или код одобренного правила, нужен trailer или изменение отстающих тестов или кода». A conflict resolution that changes a test but not its code is the likelier case.
- **The cost of A.** The rule "Every option is offered with its cost" requires the remaining risk, which A's cost leaves out. Add: «Остаётся риск: влитый коммит, сделанный без хуков, например с `--no-verify`, при слиянии заново не проверяется; при Б слияние проверило бы его код.»

**Terms.** No term needs the owner.
- "merge commit", "parent", "trailer" and "scissors line" are git's own words, with the same meaning (unverified: git's documentation was not read in this run).
- "skipped" and "expected to fail" match pytest's skip and xfail (same meaning, unverified).
- "lag behind" partly matches OpenFastTrace's "outdated" coverage; a gloss for the docs is already recorded in the notes.

## Questions only the owner can answer

1. **Merge commits:** A, as recommended, once the three fixes to the question are made.
2. **Row 10.1.41's new item covers only the end of an exemption.** An approved rule can come under rule 9.2's requirement to be implemented in two other ways, and no commit then includes it. This is the same gap that settlement 6 closed for exemptions. The main session could settle it as it settled point 6, but it widens what the row states.
   - A node moved out of `specs/tech/debt.json` keeps its approval (rule 1.3.5).
   - A project's own kind can come to require code (rule 8.3).

   I recommend this wording for the row's fourth item. B's fourth item would then follow in its own words.
   - EN: "the rule stops being one of the rules to which the requirement that a rule be implemented does not apply (§s-6fw72j65jkqrfpf), for example because its exemption from implementation ends (§s-gf6n8ge4mke3pr2) or because it is moved out of the technical debt (§s-2r7k2aeyusgy6fw)."
   - RU: «правило перестаёт быть одним из правил, к которым не относится требование реализации (§s-6fw72j65jkqrfpf), например потому, что заканчивается его освобождение от реализации (§s-gf6n8ge4mke3pr2) или его переносят из технического долга (§s-2r7k2aeyusgy6fw).»
   - This needs a new `cites` link to s-2r7k2aeyusgy6fw. The cost is one item reworded in two nodes.
