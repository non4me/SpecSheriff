# Review of group 4 drafts, input D: item 40 and the proposal on `new:tools-1-project`

I read the brief at `D:/SpecSheriff/.ai_docs/t25-pass/review-brief-group4.md` and followed it. I changed no file.

## `s-b6qdtghnyha3fhk`: "The tests, run before a push"

**Verdict: not ready.** Two checklist lines fail (7.2.4.4 and 7.2.7), and there is one gap. The author can fix all of them. The author's reading on the brief's point about item 40 holds:
- **Reading `push` from the project's own guidelines** follows from the row decision of 2026-11-17 on s-aufnqn6t7y2me7a, from s-x8uzc8z44pwtd3h, and from the agreed approach in `new:tools-1-project`.
- **A push that only deletes refs.** No change reaches the shared branch, and git passes a deleted ref with an all-zeroes object name, so the hook can tell. Source: git-scm.com/docs/githooks, read in this run.
- **The missing `testCommand`.** The draft now refuses only where the tests must run. This removes the defect noted in `t25-one-thought.md`.

**WORDING FIX 1 (7.2.7, author).** "The system's code" and "the project's own checks and generators" are not cited at first use. Add `cites` links to all three nodes.
- EN: "refuses a push where the tests of the system's code (§s-hheus6f395ynqvc) and of the project's own checks (§s-2fau85dfyyeq66m) and generators (§s-km4x4s26kv7pjze) fail (§s-aufnqn6t7y2me7a)."
- RU: «отвергает push, если тесты кода системы (§s-hheus6f395ynqvc) и собственных проверок (§s-2fau85dfyyeq66m) и генераторов (§s-km4x4s26kv7pjze) проекта не проходят (§s-aufnqn6t7y2me7a).»

**WORDING FIX 2 (7.2.4.4, author).** "`sheriff.config.json` gives as its `testCommand`" uses neither of the forms the rule allows. Also, "says so" can be read two ways, and "runs them by the command" copies the Russian construction.
- S2 EN: "It runs them with the command that the project-wide settings give as their `testCommand` (§s-zefk589ykh37b8u)."
- S2 RU: «Он запускает их командой, которую настройки, общие для проекта, задают как `testCommand` (§s-zefk589ykh37b8u).»
- S4 EN: "Where the hook must run the tests and the project-wide settings give no `testCommand`, it refuses the push and says that `testCommand` is missing."
- S4 RU: «Если хук должен запустить тесты, а настройки, общие для проекта, не задают `testCommand`, он отвергает push и сообщает, что `testCommand` не задан.»

**WORDING FIX 3 (7.2.7, author).** "A ref whose commit" is explained only in the next paragraph.
- Paragraph 2 lead, EN: "The pre-push hook runs the tests only where the push creates or updates a ref that names, directly or through a tag, a commit that meets both of the following conditions:"
- RU: «Хук pre-push запускает тесты, только если push создаёт или обновляет ref, который напрямую или через тег называет коммит, удовлетворяющий обоим следующим условиям:»
- Delete "The commit of a ref is…" / «Коммит ref — это…».

**WORDING FIX 4 (7.2.7, plain words, author).** Three problems in the rest of paragraph 3:
- "The tests run where a rule…" can be read as saying where the tests run.
- "Refines" means the `refines` link, but nothing cites the node that defines it.
- The rule on when the tests must pass is cited by description only, without its sid.

Replace the rest of paragraph 3 with:
- EN: "The SpecSheriff tools look for `push` in the `TextRule.list` (§s-eferktypcj7njt5) of each rule of `project.json` that has a `refines` link (§s-sn6au3vcr9uy5pm) to the rule on when the tests must pass (§s-x8uzc8z44pwtd3h). Where a member of such a list has the value `push` (§s-5hb9k2e34dgn284), the project's own guidelines name a push as the moment at which the tests run."
- RU: «Инструменты SpecSheriff ищут `push` в `TextRule.list` (§s-eferktypcj7njt5) каждого правила `project.json`, у которого есть связь `refines` (§s-sn6au3vcr9uy5pm) с правилом о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h). Если у элемента такого списка значение `push` (§s-5hb9k2e34dgn284), собственные guidelines проекта называют push моментом запуска тестов.»
- Add a `cites` link to s-sn6au3vcr9uy5pm.

**WORDING FIX 5 (gap, author).** When a push updates several refs, the reason can differ from one ref to the next.
- Paragraph 4, EN: "Where the push creates or updates a ref and the pre-push hook runs no test, the hook says so. For each ref that the push creates or updates, it names the reason: in the commit that the ref names, the specification is a draft, the project's own guidelines do not name a push as the moment at which the tests run, or both."
- RU: «Если push создаёт или обновляет ref, а хук pre-push не запускает тестов, хук говорит об этом. Для каждого ref, который push создаёт или обновляет, он называет причину: в коммите, который называет этот ref, спецификация — черновик, собственные guidelines проекта не называют push моментом запуска тестов или и то и другое.»
- Update `stage3` to match.

**CUT (author decides).** The first condition restates rule 10.6, and its words "an entry approves it" give the entry an act that belongs to an owner.
- EN: "the commit leaves the specification approved (§s-qzthyh7yqvfhsa2);"
- RU: «коммит оставляет спецификацию одобренной (§s-qzthyh7yqvfhsa2);»
- Items 37 and 38 of this group already use this short form.

**WORDING FIX 6 (Russian title).** «Тесты перед push» drops "run". Use «Тесты, запускаемые перед push».

**TERM: no finding.** "Pre-push hook", "ref", "push" and "refuses" match git's own documentation (githooks).

**Checklist:**
- 1.2.3 Text and reason ✓
- 7.1 Goal, reader, scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 Order ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 General word in a name ✓
- 7.2.4.4 Properties ✗ "`sheriff.config.json` gives as its `testCommand`", "gives no `testCommand`"
- 7.2.4.5 Relations ✓
- 7.2.5 Negation ✓
- 7.2.6 Restricting lists ✓
- 7.2.7 Words from the specification ✗ "the system's code", "the project's own checks and generators", "a ref whose commit", "a rule that refines the rule on when the tests must pass"
- 7.3.1 Title ✓
- 7.3.2 Thoughts ✓
- 7.3.3 Contents ✓
- 7.4.1 Counts ✓
- 7.4.2 Reason ✓
- 7.5.1 Superfluous ✓
- 7.5.2 Length ✓
- 7.5.3 Tables ✓
- 7.6.1 Language ✓
- 7.6.2 Capitals ✓
- 7.6.3 Examples ✓
- Pairing test ✓

**Оценка**
- согласованность: ✓ — сверено с s-x8uzc8z44pwtd3h, 10.2 (s-epaw9sgyaajzn8g), строкой 10.1.44 и её решениями от 2026-11-17 и 2026-11-18, 10.6, 10.12, «The hooks» (s-477gtdrkw34dzxw), `proposal:new-tools-1-settings-g3`, принципами.
- целостность: ✓ — опирается на `proposal:new-tools-1-project-g4`; «The hooks» (пункт 57) в заметках названа. Пункту 57 стоит решить, сравнивать ли рабочее дерево с коммитом ref, который не удовлетворяет условиям.
- целесообразность: ✓ — тесты, которые не проходят, не должны попадать в общую ветку, но только там, где проект выбрал push (решение от 2026-11-17).
- избыточность: ✗ — первое условие пересказывает 10.6 (CUT).
- недостаточность: ✗ — не сказано, какую причину называть, если push обновляет несколько ref (WORDING FIX 5).

## `proposal:new-tools-1-project-g4`: "What the SpecSheriff tools read in the project's own guidelines"

**Verdict: not ready.** The proposal changes only what its `change` field lists. One checklist line fails (7.2.7). Record each fix below in the `change` field.

**WORDING FIX 1 (7.2.7, author).** The sentence that the proposal rewords does not cite the node that defines `refines`.
- EN: "by its `refines` link (§s-sn6au3vcr9uy5pm) to that other rule"
- RU: «по его связи `refines` (§s-sn6au3vcr9uy5pm) с тем другим правилом»

**DOUBT (agreed sentence, citation only).** The first `TextRule.list`, in the item on levels, has no citation. Add "(§s-eferktypcj7njt5)" in English and in Russian. The author can add it to this proposal, and the owner accepts it with the proposal.

**WORDING FIX 2 (gap, author).** The new item does not say which value the SpecSheriff tools act on, while the item on the project's own tools does. A project that writes "on every push" would see the hook ignore it with no message.
- EN: "…(§s-x8uzc8z44pwtd3h), such as `push` (§s-b6qdtghnyha3fhk);"
- RU: «…(§s-x8uzc8z44pwtd3h), например `push` (§s-b6qdtghnyha3fhk);»

**DOUBT (owner).** Neither the node nor any ruling says whether the SpecSheriff tools read the members of a `project.json` rule that is a draft. The question covers every item of the node. If the tools read draft rules, anyone can edit the rule to remove `push` and so switch off the test gate without an owner (inference).
- **Recommendation (inference):** read each rule in its last approved wording, as s-a8fn72xa782wvbk does.
- **Cost:** one sentence in this node, plus code in stage 3. A new rule then takes effect only once approved.

**Checklist:**
- 1.2.3 ✓
- 7.1 ✓
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✓
- 7.2.4 ✓
- 7.2.4.1 ✓
- 7.2.4.2 ✓
- 7.2.4.3 ✓
- 7.2.4.4 ✓
- 7.2.4.5 ✓
- 7.2.5 ✓
- 7.2.6 ✓
- 7.2.7 ✗ "`TextRule.list`" in the item on levels, "its `refines` link"
- 7.3.1 ✓
- 7.3.2 ✓
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✓
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✓
- Pairing test ✓ (the second sentence of the reason covers both paragraphs)

**Оценка**
- согласованность: ✓ — сверено с s-x8uzc8z44pwtd3h, строкой 10.1.44, 10.2, `new:tools-1-project` и его решением от 2026-11-21, правилами о «carries» и об «инструментах SpecSheriff», terms-ru («тип узлов»).
- целостность: ✓ — новый пункт стыкуется с s-b6qdtghnyha3fhk; s-zefk589ykh37b8u не затронут.
- целесообразность: ✓ — хуку pre-push нужно знать, называют ли собственные guidelines проекта push.
- избыточность: ✓ — что значит `push`, говорит s-b6qdtghnyha3fhk, а этот узел говорит только, где читаются элементы списка.
- недостаточность: ✗ — пункт не называет значение `push`; не решено, читаются ли черновые правила.

## Findings only the owner can answer

1. Do the SpecSheriff tools read a `project.json` rule that is a draft, or only its last approved wording? This applies to every item of "What the SpecSheriff tools read in the project's own guidelines", and matters most for `push`.
