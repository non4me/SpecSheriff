The skill `specsheriff-terminology-review` was in context. I ran `node .claude/vt/writing-rules.mjs`, which printed 25 rules and the pairing test. I edited no file.

**None of the six drafts is ready yet. Every remaining fix is small and the author's to make.** Every fix from the confirming reviews is in place word for word. In review-statement, the review's sentence was adapted to answer B, and the reason given for that holds. The sentences round c wrote keep their Russian meaning, and the drafts written for B agree with each other and with Q1. Two findings need attention, A1 and F1, and Q1 should not go to the owner.

Columns: **A** s-vp24dqydygztqbt · **B** review-code · **C** review-statement · **D** review-appendix · **E** verdict · **F** proposal:s-weuyx98r7c923ab

## Checklist

| Rule | A | B | C | D | E | F |
|---|---|---|---|---|---|---|
| 1.2.3 Text and reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.1 Goal, reader, scope | ✗ "refuses a commit where the verdict … refuses it" together with "disregards each finding": what happens when every finding is disregarded is left open | ✓ | ✓ | ✓ | ✓ | ✗ "binds (§s-9rtrj24myzjvshu)": that node's test of binding does not fit tests |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✗ "The runner's CLI is given the schema" | ✓ |
| 7.2.2 Order of the text | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✗ "passes this check silently" (no check was named before) | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words from the specification | ✓ | ✗ "bound as a whole" is not cited | ✓ | ✓ | ✓ | ✓ |
| 7.3.1 Title | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 Contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 Sentence length | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ | ✓ | n/a (one proposed in F3) |
| Pairing test | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## A. s-vp24dqydygztqbt — not ready

- **A1, WORDING FIX (author).** Add after the third sentence of paragraph 1: "In that case, it refuses the commit only where the verdict lists at least one other finding." / «В этом случае он отклоняет коммит, только если вердикт перечисляет хотя бы одно другое замечание.»
- **A2, WORDING FIX (author).** Paragraph 2 reads "for which the reviewer must make at least one of the following judgements", the wording of rule 10.5. / «по которому рецензент должен вынести хотя бы одно из следующих суждений».
  - Item 3 becomes: "the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves and that implements a rule of the base specification (§s-5x737t9nee4zgaa, §s-4bwa4zepd4nwcv8)." / «суждение о каждом узле технического приложения (§s-tj38pvm38nepaf5), который одобряется в коммите и реализует правило базовой спецификации (§s-5x737t9nee4zgaa, §s-4bwa4zepd4nwcv8).»
  - Add a `cites` link to s-5x737t9nee4zgaa.
- **A3, Russian (author).** In the reason, «по которому нужно суждение» becomes «по которому нужно одно из его суждений».

Оценка
- согласованность: ✓ сверено с принципом «Deterministic checks hold every participant to the contract», с s-m4h279nbaqkpa3t (решения 2026-11-19), с s-epaw9sgyaajzn8g и s-94k7b6r5kf65udf (решения 2026-11-20), с s-nudrdn5xvcg262k (решение 2026-11-20), с s-nyh9yk22ba6g77q и s-a8fn72xa782wvbk.
- целостность: ✗ пункт 3 шире суждения s-4bwa4zepd4nwcv8. Без условия связи `implements` он запускает платное ревью при одобрении любого узла приложения, например узла о стеке.
- целесообразность: ✓ s-tnz9zgqx8c629a7.
- избыточность: ✓ не найдена. Предложение о черновике пересекается с s-kgqxg4gunzynwsv, но без него первое предложение было бы неверно в черновике.
- недостаточность: ✗ не сказано, отклоняется ли в черновике коммит, вердикт которого отклоняет его только из-за отброшенных замечаний (s-68ds99w8wd67aae).

## B. review-code — not ready

- **B1, WORDING FIX (author, 7.2.7).** Item 2 becomes "each file that the commit adds or changes and that is bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft);" / «каждый файл, привязанный целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), который коммит добавляет или меняет;».
  - Add `cites` links to both nodes.
  - This matches what s-9rtrj24myzjvshu and s-8wp7xm7g3u8gscq already do.
- **B2, Russian title (author).** «Суждение о коде, изменённом коммитом». The current «о коде, который меняет коммит» reads first as "code that changes the commit".

Оценка
- согласованность: ✓ s-zn4vrdpnv9bch62 (todo 2026-11-20, отказ «naming the rule and the line»), s-7gab4ptjt2khfr5 (решение 2026-11-19), s-5z5gnu7pahr82xp, s-kgbzk2ph9e6jfb4, s-2jcmb9xe9d64t2t, s-zrsc6asgmhv8tnc (у теста один SpecTag).
- целостность: ✓ s-vp24dqydygztqbt, s-nyh9yk22ba6g77q (предложение), s-68ds99w8wd67aae; s-2x58az67bm6cxq2 названа в п. 2 заметок.
- целесообразность: ✓ строка 10.1.43.
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

## C. review-statement — not ready

- **C1, WORDING FIX (author).** The last sentence of paragraph 1 becomes "Where the commit leaves it a draft, `sheriff review` disregards such a finding silently." / «Если коммит оставляет её черновиком, `sheriff review` молча не учитывает такое замечание.» This also uses the same verb as A.

Оценка
- согласованность: ✓ принцип, s-m4h279nbaqkpa3t, s-epaw9sgyaajzn8g, s-nudrdn5xvcg262k (решения 2026-11-20), s-qzthyh7yqvfhsa2, s-6fw72j65jkqrfpf.
- целостность: ✓ s-vp24dqydygztqbt, s-68ds99w8wd67aae, s-nyh9yk22ba6g77q (пятый пункт без изменений), s-ddd2e96uke4y83j.
- целесообразность: ✓ строка 10.1.43a.
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

## D. review-appendix — not ready (Russian only)

- **D1, Russian title (author).** «Суждение об узле технического приложения, который одобряется в коммите». The current «узел…, который одобряет коммит» reads as "the node approves the commit", and the specification does have a rule that approves something (the specification).

Оценка
- согласованность: ✓ s-4p9amamvp2bry7b (решение 2026-11-20), s-m4h279nbaqkpa3t (решения 2026-11-19 и 2026-11-20), s-nyh9yk22ba6g77q (решение 2026-11-20), s-t5uw8zfxzhfdg86, s-v4qus7raqnwzneb.
- целостность: ✓ s-kag2m9tzdnduxdx, s-qmmzf9nksfsa3qp, s-h6h25ctd3yryudh (у домена есть разделы вида `requests/2`), расположения `base/3.2` в согласованных черновиках.
- целесообразность: ✓
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

## E. verdict — not ready

- **E1, WORDING FIX (author, 7.2.1).** The first two sentences of paragraph 2 become "`sheriff review` gives the runner's CLI the schema of the verdict. The runner's CLI answers with a JSON object that conforms to that schema." / «`sheriff review` передаёт CLI runner схему вердикта. CLI runner отвечает JSON-объектом, который соответствует этой схеме.»

Оценка
- согласованность: ✓ s-94k7b6r5kf65udf (решения 2026-11-14 и 2026-11-20), s-m4h279nbaqkpa3t, s-vp24dqydygztqbt.
- целостность: ✓ s-vp24dqydygztqbt (суждение в замечании нужно, чтобы не учитывать его в черновике), s-rd9nftptjuz6bwv, s-kgqxg4gunzynwsv, s-4bwa4zepd4nwcv8.
- целесообразность: ✓
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

## F. proposal:s-weuyx98r7c923ab — not ready

- **F1, WORDING FIX (author).** Under s-9rtrj24myzjvshu's test of binding (a SpecTag in the comment directly above a symbol), every test would be listed as unbound, because a test's SpecTag stands in its name or mark (s-zrsc6asgmhv8tnc). Yet the warning of rule 9.5 also covers tests ("tests included").
  - New first sentence: "`sheriff untagged` lists, by file and symbol, the system's code (§s-hheus6f395ynqvc), tests included, that no SpecTag (§s-8xw4mgvpexyvw5q) binds (§s-3xx2eukc8gtd2tx)." / «`sheriff untagged` перечисляет по файлам и символам код системы (§s-hheus6f395ynqvc), включая тесты, который не привязывает ни один SpecTag (§s-8xw4mgvpexyvw5q, §s-3xx2eukc8gtd2tx).»
  - Replace the `cites` link to s-9rtrj24myzjvshu with one to s-3xx2eukc8gtd2tx, and update `stage3` to match.
- **F2 (author).** The notes' list of changes outside the group needs two more items:
  - The agreed "The commands that `sheriff` accepts" (s-f5rz6b7dhxejjts) says "the symbols of the system's code that have no SpecTag". It changes once the owner accepts F.
  - Rule 9.5 still says "carries no SpecTag", although under the rulings of 2026-11-17 its result also applies to code whose SpecTags bind nothing.
- **F3, DOUBT (owner): an example.**
  - EN: "An old function carries the SpecTag `@spec s-…`, which names a section, and no other SpecTag. `sheriff untagged` lists the function with its file, since that SpecTag binds nothing. The most likely mistake is to list only code that carries no SpecTag at all, so that the function is missing from the list that the warning points to."
  - RU: «У старой функции есть SpecTag `@spec s-…`, который называет раздел, и больше никакого SpecTag. `sheriff untagged` перечисляет эту функцию с её файлом, потому что этот SpecTag ничего не привязывает. Самая вероятная ошибка — перечислять только код, у которого нет SpecTag совсем: тогда функции нет в перечне, на который указывает предупреждение.»

Оценка
- согласованность: ✗ s-9rtrj24myzjvshu задаёт для тестов неверный признак привязки (s-zrsc6asgmhv8tnc). Сверено также с решениями 2026-11-17 по строкам 10.1.26 и 10.1.26a, с s-kkbqcb9xrpaepwn и s-3xx2eukc8gtd2tx.
- целостность: ✗ согласованный узел s-f5rz6b7dhxejjts и формулировка s-kkbqcb9xrpaepwn («carries no SpecTag») заметками не названы.
- целесообразность: ✓ предупреждение по 9.5 называет эту команду, и она должна перечислять весь код, о котором оно предупреждает.
- избыточность: ✓ не найдена.
- недостаточность: ✗ тесты не названы явно, и не видно, что команда перечисляет и код, у которого есть SpecTag, ничего не привязывающий.

## Q1 (author)

Under the recommended answer B, Q1 is not a question for the owner. Earlier rulings already decide it:
- The item in the principle "Deterministic checks hold every participant to the contract" sets no condition.
- Rule 1.6.1 (ruling of 2026-11-19) and rule 10.2 (ruling of 2026-11-20) have the reviewer judge the statement.
- Rule 10.5 (ruling of 2026-11-20) refuses a commit without a readable answer whenever a judgement is due.
- Row 10.1.43a (ruling of 2026-11-20) passes while the specification is a draft.

Together these give B. Under `vt`'s rule, a question that a stated principle already decides is not asked. So drop Q1 and the `dependsOn` entries, and state B's cost in one line on the page. If the author keeps Q1 anyway, its options and costs are complete, A's change to `docs/principles.md` included.

**TERM:** none to raise. "Trailer" is git's own term, already checked in round b.

## Questions only the owner can answer

- F3: whether to add the example.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group2-notes.md`