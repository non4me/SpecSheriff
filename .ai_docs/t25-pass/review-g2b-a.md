**Seven drafts reviewed. None is ready yet.** Most fixes are small wording fixes the author can make. Three findings matter more: P1 of B contradicts its own list, D goes against the owner's ruling of 2026-11-20 in one case, and F needs a change for answer A to Q1 that Q1 does not mention. I edited no file. The skill is loaded.

Drafts: A = s-vp24dqydygztqbt, B = review-code, C = review-statement, D = review-appendix, E = no-change-trailer, F = proposal:s-nyh9yk22ba6g77q, G = proposal:s-m4h279nbaqkpa3t.

Every fix from the first review is in place, word for word or with a reader's rewording that keeps the meaning. Those rewordings are: "each in full", "judged", "by means of", "a single number" and "goes unnoticed". Review C's refusal of `@spec none` is in B word for word. Every round-b sentence keeps the meaning of its Russian.

## Checklist

| Rule | A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|---|
| 1.2.3 Text and reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.1 Goal, reader, scope | ✗ "It tells the reviewer" (could be `sheriff types`) | ✗ P1 "does something that none of its rules states, or leaves out something" | ✓ | ✓ | ✓ | ✓ | ✗ "needs no change, while the specification is approved" (the condition can be read as part of the statement) |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 Order of the text | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words from the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ "the main table of checks", "the table of checks of an extension", "the system's code", "a project's own checks and generators": none cited at first use |
| 7.3.1 Title | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 Contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ the tests before the shared branch, when the checks run, and the reviewer's judgements can each be applied alone |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ its three paragraphs justify P2–P3, P4a and P4b in order |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 Sentence length | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ | ✓ | n/a | ✓ |
| Pairing test | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |

## A. s-vp24dqydygztqbt "The review of a commit": not ready

Both fixes are the author's. Both are breaches of the global "Writing" rule.
- P3 starts with "On such a commit", which points back into another paragraph. Replace it with "Where `sheriff review` asks for a verdict, it gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q)." / «Если `sheriff review` запрашивает вердикт, он передаёт рецензенту всё, что для коммита перечисляет правило о том, что получает рецензент (§s-nyh9yk22ba6g77q).»
- "It tells" → "`sheriff review` tells the reviewer which of those files the commit changes." / «`sheriff review` сообщает рецензенту, какие из этих файлов меняет коммит.»

Оценка
- согласованность: ✓ s-m4h279nbaqkpa3t (при ответе A на Q1), s-epaw9sgyaajzn8g, s-68ds99w8wd67aae, s-94k7b6r5kf65udf, решения 10.4 от 2026-11-01 и 2026-11-04.
- целостность: ✓ s-rd9nftptjuz6bwv, s-kgqxg4gunzynwsv, s-4bwa4zepd4nwcv8, s-a8fn72xa782wvbk; при ответе A нужна правка F.
- целесообразность: ✓ s-tnz9zgqx8c629a7.
- избыточность: ✓
- недостаточность: ✓

## B. review-code: not ready

The fix is the author's. Read literally, P1 refuses any code with `@spec none`, since that code has no rules. It also refuses a test that "leaves out" something. Both contradict items 3 and 5 of the same node and s-2jcmb9xe9d64t2t. This is the defect the first review found in round a, brought back in P1.
- P1, first sentence → "`sheriff review` refuses a commit where the independent reviewer (§s-m4h279nbaqkpa3t) refuses it for a defect in the code that the commit adds or changes (§s-zn4vrdpnv9bch62)." / «`sheriff review` отклоняет коммит, если независимый рецензент (§s-m4h279nbaqkpa3t) отклоняет его из-за дефекта в коде, который коммит добавляет или меняет (§s-zn4vrdpnv9bch62).»

Оценка
- согласованность: ✗ P1 противоречит пунктам 3 и 5 и s-2jcmb9xe9d64t2t; остальное сверено с s-zn4vrdpnv9bch62 (todo от 2026-11-20), s-7gab4ptjt2khfr5, s-5z5gnu7pahr82xp, s-kgbzk2ph9e6jfb4.
- целостность: ✓ s-vp24dqydygztqbt, s-2x58az67bm6cxq2 (п. 29), s-nyh9yk22ba6g77q (предложение).
- целесообразность: ✓ строка 10.1.43.
- избыточность: ✓
- недостаточность: ✓

## C. review-statement: not ready

The fix is the author's. "this judgement" in P2 and "each such rule" in P3 both point into other paragraphs. Merge P2 and P3 into one paragraph and replace its second sentence with: "The reviewer judges the statement about each rule that such a trailer names, only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2)." / «Рецензент судит утверждение о каждом правиле, которое называет такой trailer, только если коммит оставляет спецификацию одобренной (§s-qzthyh7yqvfhsa2).»

Оценка
- согласованность: ✓ s-nudrdn5xvcg262k (решение 2026-11-20), s-qzthyh7yqvfhsa2, s-6fw72j65jkqrfpf.
- целостность: ✗ при ответе A пункт 10.4 об утверждении всё равно передаёт рецензенту материалы в черновике (s-nyh9yk22ba6g77q, s-vp24dqydygztqbt). Правка — в F.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

## D. review-appendix: not ready

All three fixes are the author's.
- **The ruling of 2026-11-20.** The owner chose the rules of the same top-level section over the whole base specification, to save the reviewer's tokens. Some rules may sit directly in a part, beside its sections. Nothing in 1.1.2 or 8.5 forbids this (my inference). For such a rule, "the whole part" pulls in every section of that part, which can be the whole base specification. Replace the last sentence with: "For a rule that is in no section (§s-qmmzf9nksfsa3qp), the rules in the same top-level section are the other rules of the same part of the base specification that are in no section either." / «Для правила, которое не входит ни в один раздел (§s-qmmzf9nksfsa3qp), правила того же раздела верхнего уровня — это другие правила той же части базовой спецификации, которые тоже не входят ни в один раздел.» In a base specification with no sections, this still gives the whole base, as now.
- **P2 points back to P1.** P2 says "refuses such a commit" → "refuses a commit on such a finding whatever the specification's approval status (§s-qzthyh7yqvfhsa2)" / «отклоняет коммит по такому замечанию, каков бы ни был статус одобрения спецификации (§s-qzthyh7yqvfhsa2)».
- **The reason.** "this judgement" has nothing to refer to inside the reason, and the Russian says «Поэтому» twice. The last sentence becomes "So the reviewer judges every node of the technical appendix that implements a rule of the base specification, whoever approved it." / «Так что рецензент судит каждый узел технического приложения, который реализует правило базовой спецификации, кто бы его ни одобрил.»

Оценка
- согласованность: ✗ «вся часть» для правила вне раздела расходится с решением 10.4 от 2026-11-20; сверено также с s-4p9amamvp2bry7b, s-t5uw8zfxzhfdg86, s-v4qus7raqnwzneb.
- целостность: ✓ s-kag2m9tzdnduxdx, s-qmmzf9nksfsa3qp, s-nyh9yk22ba6g77q.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

## E. no-change-trailer: not ready (one fix)

The fix is the author's. "such a statement" in P2 points back to P1 → "They read a trailer as a statement that a rule's implementation needs no change only where its key is spelt exactly `Implementation-Needs-No-Change` and its value is a single sid." / «Trailer они читают как утверждение, что реализацию правила менять не нужно, только если его ключ написан в точности как `Implementation-Needs-No-Change`, а его значение — один sid.»

**TERM:** "trailer" is git's own term and means the same thing here. I read git-scm.com, git-interpret-trailers, in this run: a trailer is a key-value pair separated by a colon, and the key is ASCII letters, digits and hyphens. The page does not say whether keys are compared by case, so the exact comparison is the tools' own choice.

Оценка
- согласованность: ✓ решение 2026-11-19, s-ddd2e96uke4y83j, s-nudrdn5xvcg262k, s-qqs2svksmjct753.
- целостность: ✓ s-kgqxg4gunzynwsv, s-txbwsthdqhvyzd2 (п. 4).
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

## F. proposal:s-nyh9yk22ba6g77q: not ready

The fix is the author's, and it follows from answer A to Q1. Item 5 still gives the reviewer, in a draft, the material for a judgement that is not made there. A finding on that material would refuse the commit, against row 10.1.43a. Replace item 5 with:
- EN: "where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2), for each rule whose implementation, according to the commit's message, needs no change: the rule's wording as it was before the commit and as it is after it, and the tests and the code bound to the rule, directly or through a chain of `implements` links (§s-sn6au3vcr9uy5pm), as they are after it;"
- RU: «если коммит оставляет спецификацию одобренной (§s-qzthyh7yqvfhsa2), для каждого правила, реализация которого, согласно сообщению коммита, не требует изменений: формулировку правила в том виде, в каком она была до коммита и в каком стала после него, а также тесты и код, привязанные к правилу напрямую или через цепочку связей `implements` (§s-sn6au3vcr9uy5pm), в том виде, в каком они стали после коммита;»
- Add a `cites` link to s-qzthyh7yqvfhsa2 and mark the draft `dependsOn` Q1.

Оценка
- согласованность: ✓ 1.6.1, 9.1, обоснование 10.4, решения от 2026-11-01, 2026-11-04 и 2026-11-20.
- целостность: ✗ пятый пункт без условия одобренной спецификации (s-nudrdn5xvcg262k, s-kgqxg4gunzynwsv).
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

## G. proposal:s-m4h279nbaqkpa3t: not ready

- **The new item (author).** "while the specification is approved" can be read as part of the statement. Replace the item with "on a commit that leaves the specification approved (§s-qzthyh7yqvfhsa2) and whose message states that a rule's implementation needs no change: whether that statement is true;" / «при коммите, который оставляет спецификацию одобренной (§s-qzthyh7yqvfhsa2) и в сообщении которого сказано, что реализацию правила менять не нужно, — верно ли это утверждение;»
- **Citations at first use (author, no meaning changed).**
  - "the main table of checks (§s-jau82aq9juv9zzh), or the table of checks of an extension (§s-gpzs5fcxvp6jkrp)" / «в основной таблице проверок (§s-jau82aq9juv9zzh) или в таблице проверок расширения (§s-gpzs5fcxvp6jkrp)»
  - "the system's code (§s-hheus6f395ynqvc) and of a project's own checks (§s-2fau85dfyyeq66m) and generators (§s-km4x4s26kv7pjze)" / «кода системы (§s-hheus6f395ynqvc) и собственных проверок (§s-2fau85dfyyeq66m) и генераторов (§s-km4x4s26kv7pjze) проекта»
  - Add `cites` links to all four.
- **Reason and split (author drafts, owner agrees).** This applies only if the owner answers A, since only then does 1.6.1 change. Rule 7.3.3 calls for a split, and `.claude/vt/rules.md` lets the author split a node without asking. Each new node gets a reason that speaks of it as a whole. The reworded agreed sentences go to the owner as proposals. Keep the sid on the node with the reviewer's judgements, which 10.2 cites.
- **Q1 in group2-notes.md (author).** It is a question only the owner can answer, and no earlier ruling settles it. Option A's cost already names the change to the principle. Two fixes:
  - "What you see" → "in a draft, a commit whose only reason for a review is an `Implementation-Needs-No-Change` trailer either passes without a review, or waits for the reviewer."
  - Add to option A's costs: "Cost: the item of rule 10.4 on such a statement gains the same condition (`proposal:s-nyh9yk22ba6g77q`)."

Оценка
- согласованность: ✗ до изменения принципа «Deterministic checks hold every participant to the contract»; стоимость A это называет. Сверено с s-nudrdn5xvcg262k, s-epaw9sgyaajzn8g, s-qzthyh7yqvfhsa2.
- целостность: ✗ s-nyh9yk22ba6g77q должен получить то же условие, а Q1 этого не называет.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

## Questions only the owner can answer

Only Q1, unchanged apart from the two fixes to its wording under G.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group2-notes.md`