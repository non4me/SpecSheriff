The skill `specsheriff-terminology-review` was loaded. Both drafts are **not ready**: each has one defect that the author can fix, and nothing in either needs the owner. Round c applied every round-b finding on these drafts or rejected it for a reason that holds. Each defect below was introduced in round b or round c.

## s-7unxytshhc4md54 — Setting a repository up and taking SpecSheriff out of it — **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✗ "It leaves as it is any other hook, declaration or file that differs from what it would write" (finding T-1)
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓ (fixed by "`sheriff init` stages only the git hooks", as the ruling of 2026-11-02 requires)
- 7.2.7 Words that take their meaning from the specification ✓
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test of the reason ✓

**Оценка**
- согласованность: ✓ сверено с 10.6 (s-qzthyh7yqvfhsa2) и решением от 2026-11-13, с 1.6.4 (s-x8uzc8z44pwtd3h), 10.2 (s-epaw9sgyaajzn8g), 10.13 (s-jsqxdx47wkkj7gp), s-b6qdtghnyha3fhk, s-t9j29hppag2nren, 7.1.11 (s-zhen42p6mnaxu7w) и строкой 10.1.18 (s-exxuckgakfxkycp). Также сверено с решениями узла от 2026-11-02 и 2026-11-06 и с принципами.
- целостность: ✗ под слова «any other … file» попадают `.gitattributes` и `.claude/settings.json`, которые сам узел велит дополнять. Попадают под них и существующие `sheriff.config.json` и `project.json`: init.ts их не называет, и `stage3` этого изменения не требует (T-1). Узлы, которые цитируют этот (s-4mej6ccn7xu3d3p, s-zh2vcr3xjumppg5, s-n76wt2bkqdmh78x, предложение по s-gb8s9657a65hqmv), остаются верны.
- целесообразность: ✓ проблема названа: 10.6 сняло правило об одобрении, а раздел без правила отвергает строка 10.1.18.
- избыточность: ✓ сверено с s-4mej6ccn7xu3d3p, s-n4m5zvh96yb299p, s-zh2vcr3xjumppg5 и s-zefk589ykh37b8u.
- недостаточность: ✗ мелочь: не сказано, что делает `sheriff init`, если не может задать `core.hooksPath` (N2).

**T-1. WORDING FIX** (the author can fix). The approved text said "replaces no other file". The new "leaves as it is any other … file" also covers files that the node's own paragraphs have `sheriff init` change: it appends a line to `.gitattributes` and adds keys to `.claude/settings.json`. It also requires `sheriff init` to name an existing `sheriff.config.json` and `project.json`, which init.ts does not do. So the note «Без изменений по смыслу» in that part's `change` is wrong.
- EN: "It leaves as it is any other hook or declaration that differs from what it would write, and any `.claude/settings.json` or `.codex/hooks.json` that is not JSON, and names each."
- RU: «Любой другой хук или объявление, которые отличаются от того, что он записал бы, а также `.claude/settings.json` или `.codex/hooks.json`, который не является JSON, он оставляет как есть и называет каждый из них.»

Correct that part's `change` to match.

**Nits**, which a careful reader does not need fixed before the owner reads the node:
- **N1, Russian only:** «каждый хук там» → «каждый хук в этой папке». The context already makes the folder clear.
- **N2:** the item "it turns the hooks on …" should end ", and, where it cannot set it, says how to set it." In Russian: «…, а если не может, говорит, как его задать.» This is what init.ts does outside a git repository. It is a nit because only the message is missing.

## proposal:s-gb8s9657a65hqmv-g6 — What `sheriff reindex` changes in what an earlier release wrote — **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✗ "in the run that archives or deletes such a rule" (finding R-1)
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✓
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test of the reason ✓

**Оценка**
- согласованность: ✓ сверено с 2.6 (s-f2b5zvc565s242f), 10.6 и решением от 2026-11-13, с 10.13, s-t9j29hppag2nren, s-7unxytshhc4md54, s-d3nkw9b6mn98vuw и s-f5brvuuu6xmkj6t. Также сверено с s-xm8rz4uupb73gu5: `fields` задаются по имени типа, так и в extension.schema.json.
- целостность: ✓ сверено с s-zhen42p6mnaxu7w, s-b6qdtghnyha3fhk и s-v4qus7raqnwzneb. `stage3` верно убирает код reindex.ts:208–218, который иначе каждый раз возвращал бы правило об одобрении.
- целесообразность: ✓ дефект реален: единственное правило `project.json` этого репозитория — одобренное s-p92k6vfe3ju27at, которое уточняет 10.6.
- избыточность: ✓
- недостаточность: ✗ слова «such a rule» читаются как черновик из предыдущего пункта. Тогда случай одобренного правила остаётся открытым, а это случай этого репозитория и пример самого узла (R-1).

**R-1. WORDING FIX** (the author can fix). If "such a rule" means only the draft rule of the item before it, the rule on the tests is not added in the approved-rule case. In that case the section is left with no rule, and the node's example contradicts its text.
- EN: "in the run that archives or deletes a rule of `project.json` that refines the rule on the specification's approval status, whether that rule is approved or a draft, where `project.json` is left holding no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added under the top node of `project.json`;"
- RU: «в том запуске, который переносит в архив или удаляет правило `project.json`, уточняющее правило о статусе одобрения спецификации, — одобренное или черновик, — если в `project.json` не остаётся правила, которое уточняет правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h), под верхний узел `project.json` добавляется черновик правила о том, когда запускаются тесты, который пишет `sheriff init` (§s-7unxytshhc4md54);»

**Nits:**
- **N3:** "The name of a kind of node is also renamed" → "… is also changed". In Russian: «Имя типа узлов меняется также в каждом из этих мест:». It is a nit because "renaming a name" repeats itself but does not mislead.
- **N4:** for a draft rule, no entry is written, so "the same reason" ("Replaced by the entry …") names an entry that does not exist. Replace it with the reason "The specification's approval status is recorded in `sheriff.config.json`". In Russian: «с причиной "The specification's approval status is recorded in `sheriff.config.json`"». It is a nit because the string only informs whoever reads the archive.

## The author's settled points
- Keeping tools 3 as one node holds: the round-b ruling and row 10.1.23 settle it.
- The draft rule that lists `push` holds: rule 1.6.4, row 10.1.18, s-b6qdtghnyha3fhk, s-t9j29hppag2nren and the ruling of 2026-11-06 support it.
- The proposal changes only what its `change` lists.

**TERM:** I question no term.

**Only the owner can answer:** nothing.

Files I read:
- D:/SpecSheriff/.ai_docs/t25-pass/review-input-g6c-c.md
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.before-group6-c.json
- D:/SpecSheriff/.ai_docs/t25-pass/group6-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/review-g6b-c.md
- D:/SpecSheriff/.ai_docs/t25-pass/english-g6b-fast.md
- D:/SpecSheriff/.ai_docs/t25-pass/english-g6b-thorough.md
- D:/SpecSheriff/skills/tools/src/init.ts
- D:/SpecSheriff/skills/tools/src/reindex.ts
