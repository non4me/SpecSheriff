**Group 3, round g: review of three drafts** (`proposal:row-10-1-43`, `proposal:s-vp24dqydygztqbt`, `proposal:s-94k7b6r5kf65udf`)

The skill `specsheriff-terminology-review` is loaded, and I ran `node .claude/vt/writing-rules.mjs`. The verdicts:
- `proposal:row-10-1-43` is not ready.
- `proposal:s-vp24dqydygztqbt` is ready once one word is fixed in its `change` field.
- `proposal:s-94k7b6r5kf65udf` is ready, with one question for the owner.

## Checklist

**R** = `proposal:row-10-1-43` · **V** = `proposal:s-vp24dqydygztqbt` · **E** = `proposal:s-94k7b6r5kf65udf`

| Rule | R | V | E |
|---|---|---|---|
| 1.2.3 Text and reason | ✓ (a row, like the others) | ✓ | ✓ |
| 7.1 Goal, reader, scope | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ |
| 7.2.2 Order of the text | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ ("only on a commit…") | ✓ |
| 7.2.7 Words from the specification | ✓ | ✓ | ✓ |
| 7.3.1 Title | ✓ (a cell has none) | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ |
| 7.3.3 Contents of a node | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ |
| 7.4.2 Reason | ✓ (none) | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ |
| 7.5.2 Sentence length | ✗ "the rules that the commit names say": longer than it needs to be, and the reader stumbles at "names say" | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ (none needed) | ✓ (agrees with the four grounds) | ✓ (agrees with s-68ds99w8wd67aae) |
| Pairing test | ✓ (no reason) | ✓ | ✓ |

## R. `proposal:row-10-1-43`: not ready

**R1. WORDING FIX (the author can fix).** Rule 1.6.1, which the row checks, says "the rules named in the commit". That wording was set on 2026-11-20 as an English-only fix that kept the meaning (`agree-10-2.mjs`).

The `change` field explains the new words as «правила называет коммит, а не код». That reading leaves out tests. Row 10.1.42 does not require the commit message to name the rules of tests, and s-rd9nftptjuz6bwv judges a test against the rule its own SpecTag names.

Replace the text with:
- "The system's code (§s-hheus6f395ynqvc) that a commit changes outside the files generated from the specification (§s-qyjw8xez6t6adc3) does what the rules named in the commit say, and nothing they do not"
- «Код системы (§s-hheus6f395ynqvc), который коммит меняет вне файлов, сгенерированных из спецификации (§s-qyjw8xez6t6adc3), делает то, что говорят названные в коммите правила, и ничего сверх этого»

The `change` fields also need fixing:
- **The part's `change`:** replace «"The rules that the commit names": правила называет коммит, а не код.» with «"The rules named in the commit": слова правила 1.6.1. В прежнем "it names" было неясно, называет ли правила код или коммит.»
- **The top-level `change`:** this second change is missing from it. Add: «Кроме того, "the rules it names" стало "the rules named in the commit", как в правиле 1.6.1.»

**R2. Another node must change (the author can fix, as a proposal that carries out the same decision).** s-rd9nftptjuz6bwv implements this row (group 2's notes, item 18). It still says "The reviewer judges the changed code on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests". Generated files count as the system's code under rule 9.1, so a commit that changes only generated files still starts a paid run that can only pass. That is the very problem of item 11, and `review.ts changesCode` does the same today.

Item 14 of group 3's notes assumes that s-rd9nftptjuz6bwv already leaves these files out of the judgement. It leaves them out only of what the reviewer is given. Proposed wording, with a `cites` link to s-a8fn72xa782wvbk:
- "The reviewer judges the changed code on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests, outside the files generated from the specification (§s-a8fn72xa782wvbk)."
- «Рецензент судит изменённый код при каждом коммите, который добавляет или меняет код системы (§s-hheus6f395ynqvc), в том числе его тесты, вне файлов, сгенерированных из спецификации (§s-a8fn72xa782wvbk).»

**Оценка**
- согласованность: ✗ «the rules that the commit names» расходится с правилом 1.6.1 («named in the commit»). Пояснение в `change` не учитывает тесты: строка 10.1.42 не требует от сообщения коммита называть их правила, а s-rd9nftptjuz6bwv судит тест по правилу его SpecTag. Сверено также с 9.1, 10.15 и 10.1.43b.
- целостность: ✗ s-rd9nftptjuz6bwv по-прежнему запускает суждение о коде и на сгенерированных файлах, а заметки этот узел не называют (R2).
- целесообразность: ✓ проблема названа: пункт 11 изменений группы 2 и proposedDecision.
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

## V. `proposal:s-vp24dqydygztqbt`: ready, once its `change` field is fixed

The proposal changes only what its `change` field describes. Without "also", the sentence reads one way only.

**V1. `change` field (the author can fix).** The field still says «ещё и», the Russian counterpart of the dropped "also". Replace the item with: «пока спецификация — черновик, коммит отклоняется, только если вердикт перечисляет замечание о коде или об узле, который одобряется в коммите; было «хотя бы одно другое замечание», а замечание о комментарии коммит не отклоняет;»

**Оценка**
- согласованность: ✓ сверено с принципом в редакции 2026-11-24, с предложением по 1.6.1, с s-68ds99w8wd67aae, s-7vpsdsy8dpqdy6r, s-kgqxg4gunzynwsv, s-4bwa4zepd4nwcv8 и с решениями по 10.5.
- целостность: ✗ первый пункт списка опирается на s-rd9nftptjuz6bwv, который нужно изменить (R2). Сверено также с s-epaw9sgyaajzn8g, s-nyh9yk22ba6g77q и s-a8fn72xa782wvbk.
- целесообразность: ✓ без нового пункта коммит, меняющий только комментарии, не получил бы суждения, которого требует принцип.
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

## E. `proposal:s-94k7b6r5kf65udf`: ready as proposed

The proposal changes only the last example, as its `change` field says. The Russian is faithful.

**E1. DOUBT (only the owner can answer).** Combined with the new judgement on comments, the agreed text refuses a commit that changes only a comment whenever the reviewer gives no answer the tools can read: for example, when the run times out. The reason of 10.5 is that a review that lets commits through when it fails cannot be relied on. That reason assumes a review that can refuse, and the judgement on comments never refuses. The owner's ruling of 2026-11-24 says «не блокировать, а предупреждать». The ruling of 2026-11-20 on 10.5 was made before the judgement on comments existed.

I recommend option B (inference). Its cost is a change to the text of 10.5 and to the first sentence of s-68ds99w8wd67aae.
- **Option A:** keep the text, and such commits are refused.
- **Option B:** use this text:
  - "The SpecSheriff tools refuse a commit for which the reviewer must make at least one judgement other than the one on comments (§s-m4h279nbaqkpa3t) unless the reviewer gives an answer that the tools can read. The refusal says why the review could not be carried out. Where the commit needs only the judgement on comments, the tools report as a warning why the review could not be carried out."
  - «Инструменты SpecSheriff отклоняют коммит, по которому рецензент должен вынести хотя бы одно суждение, кроме суждения о комментариях (§s-m4h279nbaqkpa3t), если рецензент не дал ответа, который они могут прочитать. В отказе сказано, почему рецензию не удалось провести. Если коммиту нужно только суждение о комментариях, инструменты сообщают как предупреждение, почему рецензию не удалось провести.»

**Оценка**
- согласованность: ✓ сверено с s-68ds99w8wd67aae (ответ, который пропускает коммит с замечанием о комментарии, читается), с принципом и с решениями 2026-11-14 и 2026-11-20.
- целостность: ✓ закрывает пункт 17 изменений группы 2. Сверено с s-vp24dqydygztqbt и s-m4h279nbaqkpa3t.
- целесообразность: ✗ обоснование не подходит к коммиту, которому нужно только суждение о комментариях, а текст отклоняет такой коммит (E1, вопрос владельцу).
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

**Terms:** no findings. "Finding", "verdict" and "warning" are used as in group 2's agreed nodes.

## Only the owner can answer

- E1: whether a commit that needs only the judgement on comments is refused when the review cannot be carried out.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group3-notes.md`, `D:/SpecSheriff/.ai_docs/t25-pass/group2-notes.md`, `D:/SpecSheriff/.ai_docs/t25-pass/agree-10-2.mjs`, `D:/SpecSheriff/skills/tools/src/review.ts`
