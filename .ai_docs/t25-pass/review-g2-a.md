**Six drafts reviewed: none is ready to show as it stands.** Most fixes are wording the author can apply. Two findings need the owner (Q2 and Q3). The Q1 option B should be dropped, because rulings already made settle it.

Drafts: A = s-vp24dqydygztqbt (the review of a commit), B = review-code (s-rd9nftptjuz6bwv), C = review-statement (s-kgqxg4gunzynwsv), D = review-appendix (s-4bwa4zepd4nwcv8), E = no-change-trailer (s-7gab4ptjt2khfr5), F = proposal:s-nyh9yk22ba6g77q.

## Checklist (one row per rule, one column per draft)

| Rule | A | B | C | D | E | F |
|---|---|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✗ "the reviewer finds" (no citation of s-m4h279nbaqkpa3t) | ✗ "in the reviewer's judgement"; "its SpecTags" (P3) | ✗ "the reviewer finds" | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✗ "a changed symbol or file does something, or a changed test checks something" (two conditions in one item) | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✗ "adds an entry that approves the node to `specs/_approvals.jsonl`" | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✗ "The most likely mistake is to skip the review because an agent, not an owner, approved the node" (not the mistake closest to the case shown) | ✓ | ✓ |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## A. s-vp24dqydygztqbt — The review of a commit — **not ready** (waits on Q2)

Оценка
- согласованность: ✗ первый абзац («отклоняет коммит, если его отклоняет вердикт») противоречит C: в черновике замечание о trailer не отклоняет коммит, но вердикт с таким замечанием отклоняет (Q2). Сверено с s-m4h279nbaqkpa3t, s-epaw9sgyaajzn8g, s-nyh9yk22ba6g77q, s-68ds99w8wd67aae, s-94k7b6r5kf65udf.
- целостность: ✓ s-xr5xxa9cxf2mq5u, s-rd9nftptjuz6bwv, s-kgqxg4gunzynwsv, s-4bwa4zepd4nwcv8, s-a8fn72xa782wvbk; всё содержимое прежнего узла перенесено.
- целесообразность: ✓ s-tnz9zgqx8c629a7 (запуск оплачивает тот, кто делает коммит).
- избыточность: ✓ список суждений ссылается на 1.6.1 и 10.2, а не повторяет их.
- недостаточность: ✓

- **WORDING FIX** (author; the change is in the English only): in the reason and the example, replace "the person who commits" with "the user who commits", as s-tnz9zgqx8c629a7 says. The Russian stays as it is.

## B. new:tools-7-3-review-code — The judgement on the code that a commit changes — **not ready**

Оценка
- согласованность: ✗ пункт 1, прочитанный буквально, отклоняет любой код с `@spec none` и так противоречит пункту 4 и s-2jcmb9xe9d64t2t. Пункт 2 сверяет изменённый код с правилом, которое названо только в trailer; это противоречит решению от 2026-11-19 (s-7gab4ptjt2khfr5, s-nudrdn5xvcg262k).
- целостность: ✗ сгенерированные файлы (s-a8fn72xa782wvbk) не исключены из изменённого кода, хотя A и 10.4 их исключают. Правка s-2x58az67bm6cxq2 в notes названа (п. 29).
- целесообразность: ✓ строка 10.1.43 и её todo.
- избыточность: ✗ «вместе с формулировкой правила» повторяет четвёртый пункт 10.4 по варианту A.
- недостаточность: ✓

- **WORDING FIX** (author): P1 "the reviewer finds" → "the independent reviewer (§s-m4h279nbaqkpa3t) finds" / «независимый рецензент (§s-m4h279nbaqkpa3t) находит». Add a `cites` link.
- **WORDING FIX** (author): P2 →
  - EN: "The reviewer judges the changed code on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests. Besides what `sheriff review` gives the reviewer in every review (§s-vp24dqydygztqbt), it gives the reviewer the changed code other than the files generated from the specification. That is each of the following, …"
  - RU: «Рецензент судит изменённый код при каждом коммите, который добавляет или меняет код системы (§s-hheus6f395ynqvc), в том числе его тесты. Помимо того, что `sheriff review` передаёт рецензенту при каждом ревью (§s-vp24dqydygztqbt), он передаёт рецензенту изменённый код, кроме файлов, сгенерированных из спецификации. Это каждое из следующего…»
  - This also fixes two smaller defects: the English says "what every review gives" while the Russian says «получает», and "this judgement" points back into another paragraph.
  - For stage 3: review.ts:83-90 now gives the changed symbols of the generated type files whole, because binding.ts:62-64 reads those files as code. The notes must say that stage 3 leaves them out.
- **WORDING FIX** (author): split the first refusal item into two:
  - "a changed symbol or file whose SpecTags name rules does something that none of those rules states;" / «изменённый символ или файл, SpecTag которого называют правила, делает то, чего не утверждает ни одно из этих правил;»
  - "a changed test checks something that the rule its SpecTag names does not state;" / «изменённый тест проверяет то, чего не утверждает правило, которое называет его SpecTag;»
- **DOUBT** (author can fix, since it carries out the trailer ruling of 2026-11-19): in the second refusal item, after "required by", write "a rule that a SpecTag on that code names, or that the commit's message names other than in an `Implementation-Needs-No-Change` trailer (§s-7gab4ptjt2khfr5);" / «…правило, которое называет SpecTag на этом коде или которое сообщение коммита называет иначе, чем в trailer `Implementation-Needs-No-Change` (§s-7gab4ptjt2khfr5);». Add a `cites` link.
- **CUT** (author): in the third item of the list of what is given, cut ", together with the wording (§s-nyh9yk22ba6g77q) of the rule that its SpecTag names". With option A of Q1, rule 10.4 already gives that wording. Drop the link as well.
- **WORDING FIX** (Russian only): «которое он не реализует» → «которое этот символ или файл не реализует», because «он» can also be read as the SpecTag.

## C. new:tools-7-3-review-statement — The judgement on a statement that a rule's implementation needs no change — **not ready**

Оценка
- согласованность: ✗ рецензент судит в черновике, а замечание отбрасывается; это противоречит A (P1) и s-68ds99w8wd67aae (Q2).
- целостность: ✓ s-7gab4ptjt2khfr5, s-txbwsthdqhvyzd2, s-6fw72j65jkqrfpf, s-ddd2e96uke4y83j.
- целесообразность: ✗ в черновике тот, кто делает коммит, платит за запуск, результат которого выбрасывается. По 10.5 такой коммит отклоняется, если рецензент недоступен, хотя строка 10.1.43a в черновике проходит.
- избыточность: ✗ второе предложение P3 повторяет 9.2.
- недостаточность: ✓

- **WORDING FIX** (author): "in the judgement of the independent reviewer (§s-m4h279nbaqkpa3t)" / «по суждению независимого рецензента (§s-m4h279nbaqkpa3t)». In P3, "its SpecTags (§s-8xw4mgvpexyvw5q)". Add links for both.
- **CUT** (author): P3 →
  - EN: "For each such rule, `sheriff review` gives the reviewer the tests and the code bound to the rule (§s-6fw72j65jkqrfpf) as the commit leaves them, each whole, with its file, its lines and its SpecTags (§s-8xw4mgvpexyvw5q)."
  - RU: «Для каждого такого правила `sheriff review` передаёт рецензенту тесты и код, привязанные к правилу (§s-6fw72j65jkqrfpf), в том виде, в каком их оставляет коммит, каждый целиком, с его файлом, строками и SpecTag (§s-8xw4mgvpexyvw5q).»
  - Drop the link to s-sn6au3vcr9uy5pm.
- **WORDING FIX** (author): the reason ignores a commit that changes only the tests, where there is no new wording. New reason:
  - EN: "Whether a rule's tests and code fit its wording after the commit can be told only by reading all of them, including those that the commit leaves as they were."
  - RU: «Подходят ли тесты и код правила к его формулировке после коммита, можно узнать, только прочитав их все, в том числе те, которые коммит оставляет как были.»
- **WORDING FIX** (author): the first sentence of P2 →
  - EN: "A commit's message states that a rule's implementation needs no change by a trailer (§s-7gab4ptjt2khfr5)."
  - RU: «Сообщение коммита утверждает, что реализацию правила менять не нужно, с помощью trailer (§s-7gab4ptjt2khfr5).»
- **DOUBT**: Q2 (owner).

## D. new:tools-7-3-review-appendix — The judgement on an approved node of the technical appendix — **not ready**

Оценка
- согласованность: ✗ в обосновании сказано, что одобрение «содержит только email». Согласно s-v4qus7raqnwzneb, запись одобрения также содержит sid и отпечаток формулировки. Решения 2026-11-19 и 2026-11-20 соблюдены (s-t5uw8zfxzhfdg86, s-4p9amamvp2bry7b).
- целостность: ✓ s-kag2m9tzdnduxdx, s-nyh9yk22ba6g77q, s-vp24dqydygztqbt.
- целесообразность: ✓
- избыточность: ✗ первые два предложения P4 повторяют 10.4 и третий абзац A.
- недостаточность: ✗ если базовая спецификация не разделена на разделы, её правила не входят ни в один раздел верхнего уровня (Q3).

- **WORDING FIX** (author): P1 "the independent reviewer (§s-m4h279nbaqkpa3t)" / «независимый рецензент (§s-m4h279nbaqkpa3t)». P3 opens "The reviewer judges each node of the technical appendix for which all of the following hold:" / «Рецензент судит каждый узел технического приложения, для которого выполнено всё следующее:».
- **WORDING FIX** (author): the first condition → "the commit adds to `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb) an entry that approves the node, whoever made the approval;". The Russian stays as it is.
- **CUT** (author): P4 →
  - EN: "A top-level section of the base specification, in the rule on what the reviewer is given (§s-nyh9yk22ba6g77q), is a section whose location (§s-kag2m9tzdnduxdx) is a part's name, a slash and one number, such as `base/3` or `requests/2`."
  - RU: «Раздел верхнего уровня базовой спецификации в правиле о том, что получает рецензент (§s-nyh9yk22ba6g77q), — это раздел, расположение (§s-kag2m9tzdnduxdx) которого — имя части, косая черта и одно число, например `base/3` или `requests/2`.»
- **WORDING FIX** (author): the first sentence of the reason →
  - EN: "An approval names whoever made it only by the email address that git was configured with (§s-v4qus7raqnwzneb)."
  - RU: «Одобрение указывает, кто его сделал, только через email, с которым был настроен git (§s-v4qus7raqnwzneb).»
- **WORDING FIX** (author): the mistake in the example →
  - EN: "The most likely mistake is to give the reviewer only the rule that the node implements, so that the contradiction with the rule on uploads passes."
  - RU: «Самая вероятная ошибка — передать рецензенту только правило, которое реализует узел: тогда противоречие с правилом о загрузке проходит.»
- **TERM:** "refines" corresponds to SysML *refine* (partial fit). In ISO/IEC/IEEE 29148 such a node is a derived requirement, the child of its parent (inference). A gloss in the docs is enough. I raise no doubt.

## E. new:tools-9-no-change-trailer — How a commit message states that a rule's implementation needs no change — **not ready** (two small fixes)

Оценка
- согласованность: ✗ английский пример говорит, что инструменты SpecSheriff «не читают» текст сообщения. По s-qqs2svksmjct753 они проверяют каждый sid в сообщении. Русский текст говорит точнее: «не читают… как утверждение». Решение от 2026-11-19 соблюдено.
- целостность: ✓ s-txbwsthdqhvyzd2 (п. 37), s-kgqxg4gunzynwsv, s-qqs2svksmjct753 (sid, который не называет узла или называет раздел, уже отклоняется).
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ не сказано, сравнивается ли ключ с учётом регистра.

- **WORDING FIX** (author): end the example with "…, which the SpecSheriff tools do not read as such a statement." The Russian stays as it is.
- **DOUBT** (author; the trailer's name is the agent's technical decision by the ruling of 2026-11-19): say how the key is matched, for example:
  - EN: "They read a trailer as such a statement only where its key is spelt exactly `Implementation-Needs-No-Change` and its value is a single sid."
  - RU: «Trailer они читают как такое утверждение, только если его ключ написан в точности как `Implementation-Needs-No-Change`, а его значение — один sid.»
  - git's documentation does not say whether trailer keys are compared with their case.
- **TERM:** "trailer" is git's own term and means the same thing here (git-scm.com, git-interpret-trailers).

## F. proposal:s-nyh9yk22ba6g77q — What the reviewer is given — **ready** (wording)

Оценка
- согласованность: ✓ 1.6.1, 9.1, 9.3. «not counting the tests» противоречило 1.6.1, 9.1 и обоснованию самого 10.4, и предложение это исправляет.
- целостность: ✓ s-rd9nftptjuz6bwv, s-vp24dqydygztqbt.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

- **DOUBT** (author): Q1 is not an open choice, because agreed rulings already decide it:
  - 1.6.1 (agreed 2026-11-20) has the reviewer judge whether the changed code does what the rules named in the commit say;
  - 9.1 counts the tests as code;
  - the agreed reason of 10.4 says the reviewer is "shown what each judgement needs".
  
  So show the change as a proposal that carries out those rulings, and drop option B. Its cost claim holds (inference, via rows 10.1.40 and 10.1.28a).

## Questions only the owner can answer

1. **Q2.** While the specification is a draft, should the reviewer still run, at the cost of the user who commits, to judge an `Implementation-Needs-No-Change` statement whose finding is then discarded?
   - **A (recommended): no.** The item of 1.6.1 gains "while the specification is approved", and 10.2 follows it by reference. C then drops "whatever the specification's approval status" and its sentence on passing silently. A stays as written.
   - **B: yes.** A and "The reviewer's verdict" (s-68ds99w8wd67aae) must then say that a verdict whose only findings belong to this judgement passes in a draft. Each such commit still pays for the run, and it is refused when no reviewer answers (10.5).
2. **Q3.** In a base specification that is not divided into sections (1.1.2 allows this), which rules are in "the same top-level section" as a rule?
   - **A (recommended, inference): the whole part.** The reviewer then reads more rules for each such node.
   - **B: none.** Only the implemented and the linked rules are given, which is the set the owner turned down on 2026-11-20.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group2-notes.md`, `D:/SpecSheriff/skills/tools/src/review.ts`, `D:/SpecSheriff/skills/tools/src/binding.ts`.