## Checklist

I loaded the skill and ran `node .claude/vt/writing-rules.mjs`. The columns are: **A** `proposal:s-nyh9yk22ba6g77q-g3` (10.4) · **B** `proposal:s-vp24dqydygztqbt` (7.3.4) · **C** `proposal:new-tools-10-verdict` (10.2) · **D** `new:tools-7-3-review-comments` (7.3.4d).

| Rule | A | B | C | D |
|---|---|---|---|---|
| 1.2.3 Text and reason | ✓ | ✓ | ✓ | ✓ |
| 7.1 Goal, reader, scope | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 Order of the text | ✓ | ✓ | ✓ | ✗ "A commit adds or changes a comment where … It also changes a comment where …": two conditions of one kind, written as separate sentences |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✗ "finds a problem with a comment where either of the following holds": the list gives the only grounds but does not say "only" |
| 7.2.7 Words from the specification | ✓ | ✓ | ✓ | ✗ "a file bound as a whole" is not cited at its first use |
| 7.3.1 Title | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 Contents of a node | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 Reason | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 Sentence length | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ (none needed) | ✓ | ✓ | ✓ |
| Pairing test | ✓ | ✓ | ✓ | ✓ |

## A. proposal:s-nyh9yk22ba6g77q-g3: not ready

Review B's fix B1 is in place word for word. The restored links are right, because the node's decisions cite s-vsh384ybt4w25a2 and s-km4x4s26kv7pjze.

- **A1 (author fix).** Node D's third item gives the reviewer the next symbol, or the whole file, for a comment that is not directly above a symbol. One example is a comment that a blank line separates from the next function (s-33fw3ga4ctd94dq). This item does not give the wording of that code's rules, because the code neither holds the comment nor lies directly below it. Use the principle's own words, and leave it to node D to say which code a comment describes:
  - "…binds to code or a test that the commit adds or changes, or that is described by a comment that the commit adds or changes;"
  - «…привязывает к коду или тесту, добавленному или изменённому коммитом либо описанному комментарием, который коммит добавляет или меняет;»

**Оценка**
- согласованность: ✓ сверено с принципом в редакции 2026-11-24, с предложением по 1.6.1 (s-m4h279nbaqkpa3t), с s-rd9nftptjuz6bwv, s-kgqxg4gunzynwsv и s-4bwa4zepd4nwcv8.
- целостность: ✗ для комментария, от которого символ отделён пустой строкой, и для комментария, за которым нет символа, s-7vpsdsy8dpqdy6r передаёт рецензенту следующий символ или весь файл. Формулировок правил этого кода пункт не даёт.
- целесообразность: ✓ по 9.4 (s-9j2mmnuuwmx5ksn) коммит, меняющий только комментарий, кода не меняет. Без этого пункта рецензент не получил бы правил, с которыми он сверяет комментарий.
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена, кроме пробела, названного в строке о целостности.

## B. proposal:s-vp24dqydygztqbt: ready

Fixes D1 and D2 are in place word for word, and the `change` field describes both. There are no findings.

It is not a finding that a commit changing only comments is refused when the reviewer gives no answer that `sheriff review` can read. The ruling of 2026-11-20 on rule 10.5 settles this: the commit is refused whenever the reviewer must make at least one judgement.

**Оценка**
- согласованность: ✓ сверено с принципом (замечание о комментарии только предупреждает), с s-7vpsdsy8dpqdy6r, s-kgqxg4gunzynwsv, s-68ds99w8wd67aae и с решением 2026-11-20 по 10.5 (s-94k7b6r5kf65udf).
- целостность: ✓ сверено с s-epaw9sgyaajzn8g, s-nyh9yk22ba6g77q, s-rd9nftptjuz6bwv, s-4bwa4zepd4nwcv8 и s-a8fn72xa782wvbk.
- целесообразность: ✓ без нового пункта коммит, меняющий только комментарии, не запускал бы рецензента. Цену этого владелец принял 2026-11-24.
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

## C. proposal:new-tools-10-verdict: ready, with one finding outside the node

Fix E1 is in place word for word.

- **C1 (author fix, in the notes and in rule 10.5).** The last example of rule 10.5 (s-94k7b6r5kf65udf) now contradicts this node, because a verdict that passes the commit and lists a finding on a comment can be read. The notes do not name rule 10.5 among the nodes that must change. Add it to the notes, and propose its example as a change that carries out the owner's decision. This also settles group 2's item 17.
  - "The answer passes the commit but reports a finding on code."
  - «Ответ пропускает коммит, но называет замечание о коде.»

**Оценка**
- согласованность: ✓ сверено с принципом, с s-7vpsdsy8dpqdy6r, s-vp24dqydygztqbt и s-94k7b6r5kf65udf (решения 2026-11-14 и 2026-11-20).
- целостность: ✗ последний пример 10.5 (s-94k7b6r5kf65udf) теперь противоречит узлу, а заметки его не называют.
- целесообразность: ✓ без этой правки вердикт, который пропускает коммит с предупреждением о комментарии, не читался бы, и коммит отклонялся бы.
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

## D. new:tools-7-3-review-comments: not ready

F1 follows the coordinator's ruling 4, and fixes F3 and F4 are in place.

- **D1 (author fix).** As paragraph 3 reads now, re-indenting a TypeScript block, or moving a function together with its doc comment, adds lines that hold comments. Either commit would then start a paid run. The owner's ruling of 2026-11-24 says that indentation in TypeScript does not deserve the reviewer's attention. Replace the first two sentences of paragraph 3 with one sentence, and add a `cites` link to s-2x58az67bm6cxq2:
  - "A commit adds or changes a comment where, with whitespace left out, the comment's text differs from the text of every comment in the same file in the commit's parent (§s-2x58az67bm6cxq2)."
  - «Коммит добавляет или меняет комментарий, если без учёта пробельных символов текст комментария отличается от текста каждого комментария того же файла в родителе коммита (§s-2x58az67bm6cxq2).»
- **D2 (author fix).** s-u6mj5yv8ngnz79v also leaves a test's name out of the trees. As worded, a renamed test therefore counts as a changed comment. Replace the sentence in paragraph 2:
  - "…the comments are the parts of the file that the SpecSheriff tools leave out of the trees as comments."
  - «…комментарии — это те части файла, которые инструменты SpecSheriff не включают в деревья как комментарии.»
- **D3 (author fix, rule 7.2.7).** Cite the phrase at its first use: "for a comment in a file bound as a whole (§s-kgbzk2ph9e6jfb4): that file;" / «для комментария в файле, привязанном целиком (§s-kgbzk2ph9e6jfb4), — этот файл;»
- **D4 (author fix, rule 7.2.6).** "The reviewer finds a problem with a comment only where either of the following holds:" / «Рецензент находит проблему в комментарии, только если выполнено одно из следующего:»
- **D5 (author fix).** A comment in a method is also in the method's class, so the implementer would have to ask which of the two the reviewer gets. Replace the second item:
  - "for a comment in a symbol (§s-kgbzk2ph9e6jfb4) or a test, or directly above one (§s-33fw3ga4ctd94dq): the innermost such symbol or test;"
  - «для комментария в символе (§s-kgbzk2ph9e6jfb4) или тесте либо непосредственно над символом или тестом (§s-33fw3ga4ctd94dq) — самый внутренний из таких символов или тестов;»
- **D6 (wording fix, English only; the Russian already reads this way).**
  - In paragraph 1, write "on a comment that a commit adds or changes".
  - In paragraph 4, write "`sheriff review` gives the reviewer the code that each such comment describes, in addition to what it gives the reviewer in every review (§s-vp24dqydygztqbt)." As worded now, "it" comes before its subject, right after a sentence about the reviewer.
- **D7 (Russian fix).** In the third item, «если после него ничего нет» → «если после него нет ни символа, ни теста». The English "none" means no symbol or test, not nothing at all.

**Оценка**
- согласованность: ✗ коммит, который только меняет отступы строк TypeScript или переносит функцию вместе с её комментарием, запускает платный прогон рецензента. Это противоречит решению владельца от 2026-11-24 («отступы в ts — нет») и выходит за принятую цену. Сверено также с принципом, с 9.4 и 1.6.1 и со строкой 10.1.43b.
- целостность: ✗ имя теста по абзацу 2 считается комментарием (s-u6mj5yv8ngnz79v). Третий пункт списка расходится с 10.4 (s-nyh9yk22ba6g77q). Сверено также с s-rd9nftptjuz6bwv, s-vp24dqydygztqbt, s-33fw3ga4ctd94dq и s-2x58az67bm6cxq2.
- целесообразность: ✓ комментарий, расходящийся с кодом, вводит читателя в заблуждение, а по принципу замечание о таком комментарии только предупреждает.
- избыточность: ✓ не найдена.
- недостаточность: ✗ для комментария во вложенном символе не сказано, какой символ получает рецензент.

**Terms:** no TERM finding. "Warning" has its usual meaning from compilers and linters, a report that blocks nothing (inference), and rule 9.5 (s-kkbqcb9xrpaepwn) uses it in that sense.

## Findings only the owner can answer

None.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group3-notes.md`, `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`, `D:/SpecSheriff/.ai_docs/t25-one-thought.md`
