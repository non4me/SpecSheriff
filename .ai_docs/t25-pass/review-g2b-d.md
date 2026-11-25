The skill `specsheriff-terminology-review` was in context. I ran `node .claude/vt/writing-rules.mjs`, which printed 25 rules and the pairing test. Every fix from reviews D and E is in place. Each one is either word for word or adapted to answer B, and the reason given for each adaptation holds. One draft is ready. The other four each need small fixes that the author can make.

## Checklist

Columns: **9R** = s-9rtrj24myzjvshu, **NN** = new:tools-7-2-no-node, **OC** = new:tools-7-2-outside, **TC** = s-utf4mbt7ref8g9c, **RT** = new:tools-7-2-rule-test.

| Rule | 9R | NN | OC | TC | RT |
|---|---|---|---|---|---|
| 1.2.3 Text and reason | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.1 Goal, reader, scope | ✗ "in the system's code … that the commit adds or changes" misses a SpecTag added outside any symbol, and every entry of the bindings file | ✗ "the code or the test that the SpecTag binds": the reason says such a SpecTag binds nothing | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 Order of the text | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words from the specification | ✓ | ✓ | ✓ | ✓ | ✗ "declares that rule's SpecTag": "declares" takes its narrower meaning from s-zrsc6asgmhv8tnc, which is not cited |
| 7.3.1 The title | ✓ | ✓ | ✗ "that carry no SpecTag": item 2 also covers a test whose SpecTag names a node that is not a rule | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 Contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✗ "has neither form of a SpecTag" assumes s-5z5gnu7pahr82xp lists exactly two forms | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 Sentence length | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ | ✓ |
| Pairing test | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## s-9rtrj24myzjvshu — not ready

1. **Author.** The opening sentence limits the list to "the system's code that the commit adds or changes", and s-2x58az67bm6cxq2 counts that by changed symbols. Two items of the list then fail:
   - **A misplaced SpecTag passes.** A commit adds a SpecTag above an old function, with a blank line between them. That changes no symbol (9.4 and its ruling of 2026-11-17), so the SpecTag is not refused. The function stays unbound, and in a draft nothing reports it. This is the most likely mistake that the example of s-33fw3ga4ctd94dq names, and code.ts:217 refuses it today.
   - **The bindings-file item never applies.** An entry of the bindings file is not the system's code (9.1), as s-36x8amvunmv2kp5 now says.
   - EN: "`sheriff binding` refuses each of the following that the commit adds or changes (§s-2x58az67bm6cxq2) in the system's code (§s-hheus6f395ynqvc), other than tests, or in the bindings file (§s-trwczfskj5zmuft), whether the specification is approved or a draft (§s-k6dzuajejrw4cej):"
   - RU: «`sheriff binding` отвергает каждое из следующего, что коммит добавляет или меняет (§s-2x58az67bm6cxq2) в коде системы (§s-hheus6f395ynqvc), помимо тестов, или в файле привязок (§s-trwczfskj5zmuft), независимо от того, одобрена спецификация или она черновик (§s-k6dzuajejrw4cej):»
2. **Author (rule 7.4.1).** In item 6, write "but has none of the forms of a SpecTag (§s-5z5gnu7pahr82xp)". The Russian already says «ни одной из форм».
3. **Author (Russian, item 3).** «на языке, который охватывает описание» can be read in either direction. This is the defect that review E fixed in s-utf4mbt7ref8g9c. Write: «в файле на языке, для которого есть описание (§s-33fw3ga4ctd94dq), SpecTag в любом комментарии, кроме комментария непосредственно над символом;»

**Оценка**
- согласованность: ✗ запись файла привязок отнесена к коду системы, тогда как s-36x8amvunmv2kp5 и 9.1 (s-hheus6f395ynqvc) их разделяют. Сверено также со строкой 10.1.26 и её решениями от 2026-11-13 и 2026-11-17, с 1.5.2, 10.10, s-5z5gnu7pahr82xp, s-33fw3ga4ctd94dq и s-5qdjyf6t898rsd4.
- целостность: ✗ SpecTag, добавленный не над символом, не отвергается. Пункт 2 заметок (s-2x58az67bm6cxq2) должен сказать и то, когда коммит добавляет или меняет SpecTag и запись файла привязок.
- целесообразность: ✓ строка 10.1.26 и решение от 2026-11-13.
- избыточность: ✓ не найдена; граница с s-36x8amvunmv2kp5, s-trwczfskj5zmuft и s-3xx2eukc8gtd2tx чистая.
- недостаточность: ✗ пункт о записи файла привязок не может сработать при нынешней вводной фразе.

## new:tools-7-2-no-node — not ready

**Author.** In item 1 of paragraph 2, "the code or the test that the SpecTag binds" contradicts the node's own reason: by 9.3, a SpecTag that names no node binds nothing.
- EN: "the commit changes the code or the test that the SpecTag is meant to bind;"
- RU: «меняет ли коммит код или тест, который этот SpecTag должен привязывать;»

**Оценка**
- согласованность: ✗ «that the SpecTag binds» расходится с 9.3 (s-8xw4mgvpexyvw5q) и с обоснованием самого узла. Сверено также с 9.1, строкой 10.1.28 и её решением от 2026-11-13, решением от 2026-11-20, s-w6gybeqn2ttydqx и s-gb8s9657a65hqmv.
- целостность: ✓ пункт 3 заметок (s-m8nmfsxkcfu7cjp) назван.
- целесообразность: ✓ удалённый узел оставляет SpecTag в коде, которого коммит не касается.
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

## new:tools-7-2-outside — not ready

1. **Author (rule 7.3.1).** Under answer B the title is too narrow. Write "Code and tests outside the commit that no SpecTag binds" / «Код и тесты за пределами коммита, которые не привязывает ни один SpecTag».
2. **Author (decision X1).** For unchanged code, this node runs the checks of rows 10.1.26 and 10.1.26a. Add `implements` links to s-k6dzuajejrw4cej and s-ay6wntm2dxcgpnp. In item 16 of the notes, map both rows to s-3xx2eukc8gtd2tx as well.
3. **For the owner:** the change to s-weuyx98r7c923ab described in the last section.

**Оценка**
- согласованность: ✓ сверено с 9.5 (s-kkbqcb9xrpaepwn), 10.6, 10.7, решениями от 2026-11-17 по строкам 10.1.26 и 10.1.26a, s-9rtrj24myzjvshu и s-utf4mbt7ref8g9c.
- целостность: ✗ согласованный узел s-weuyx98r7c923ab перечисляет только код без SpecTag. Предупреждение по 9.5 называет его, но касается теперь и кода, SpecTag которого ничего не привязывают, и тестов с SpecTag не правила; заметки этот узел не называют. Ссылок `implements` на строки 10.1.26 и 10.1.26a нет (X1).
- целесообразность: ✓ коммит может сам изменить статус и флаг.
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

## s-utf4mbt7ref8g9c — ready

No findings.

**Оценка**
- согласованность: ✓ строка 10.1.26a и её решения, 1.4.2, 9.4 и решение от 2026-11-10, 10.10 и решение от 2026-11-13, s-zrsc6asgmhv8tnc, s-5z5gnu7pahr82xp, s-gb8s9657a65hqmv.
- целостность: ✓ пункты 2 и 8 заметок названы.
- целесообразность: ✓ тест без SpecTag правила не засчитывается ни одному правилу (9.2).
- избыточность: ✓ не найдена; к «Project-wide settings» узел добавляет только условие описания языка.
- недостаточность: ✓ не найдена.

## new:tools-7-2-rule-test — not ready

1. **Author (rule 7.2.7).** Cite the node on where a test declares its SpecTag, and add a `cites` link to s-zrsc6asgmhv8tnc. Otherwise a reader may count a TypeScript test whose SpecTag stands in the middle of its name.
   - EN: "declares that rule's SpecTag (§s-zrsc6asgmhv8tnc, §s-m82tz4mp3f9r3fg)"
   - RU: «объявляет SpecTag этого правила (§s-zrsc6asgmhv8tnc, §s-m82tz4mp3f9r3fg)»
2. **Author (Russian).** The English says "In this check", but the Russian says «здесь». Write «В этой проверке код — это …» and «В этой проверке тест засчитывается независимо от того, меняет ли его коммит.»
3. **Author (Russian).** Its three sibling nodes render "refuses" as «отвергает», so use «отвергает» instead of «отклоняет», in paragraph 1 and in the example.

**Оценка**
- согласованность: ✓ строка 10.1.31, 1.4.1, решение от 2026-11-20, строка 10.1.41, s-ktfstpv8rurznrp, s-5z5gnu7pahr82xp.
- целостность: ✓ пункты 2 и 16 заметок названы.
- целесообразность: ✓ код правила без теста нарушает 1.4.1.
- избыточность: ✓ не найдена.
- недостаточность: ✗ «declares» без ссылки: не сказано, что засчитывается только SpecTag в установленном месте.

**TERM:** I find no new term to question. The check of RT matches OpenFastTrace coverage in the `utest` artifact type (registry R15/R16), but only partly: SpecSheriff asks for the test only for rules whose code the commit changes. That belongs in the docs as a gloss, at no cost to the specification.

---

## For the owner

- **Q2 of the notes is already settled, in my view (the author can fix this).** The owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a say "for such code / such a test, the result is what that rule says". The check of row 10.1.26 includes where a SpecTag stands and that it names a rule (2026-11-13). The notes' own recommendation says the same. The author can drop Q2 and the `dependsOn` entries, and report what follows from the ruling instead of asking.
- **A proposal for the owner to agree to.** "The list of code that carries no SpecTag" (s-weuyx98r7c923ab, agreed 2026-11-22) has to change to carry out that ruling. Suggested wording: "`sheriff untagged` lists, by file and symbol, the system's code (§s-hheus6f395ynqvc) that no SpecTag (§s-8xw4mgvpexyvw5q) binds (§s-9rtrj24myzjvshu)." / «`sheriff untagged` перечисляет по файлам и символам код системы (§s-hheus6f395ynqvc), который не привязывает ни один SpecTag (§s-8xw4mgvpexyvw5q, §s-9rtrj24myzjvshu).» The title would become "The list of code that no SpecTag binds".
- **If the coordinator keeps Q2,** option B's costs must add two things:
  - the change to s-weuyx98r7c923ab above;
  - in old code, a SpecTag that names a section costs at most a warning, while one that names a removed node is refused at every commit (row 10.1.28).

  Neither option changes `docs/principles.md`.

Files: D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json, D:/SpecSheriff/.ai_docs/t25-pass/group2-notes.md, D:/SpecSheriff/skills/tools/src/code.ts