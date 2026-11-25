Both drafts are **not ready**. Round b applied or validly rejected every round-a finding on them, but three defects in tools 3 and two in the reindex proposal remain. All are author-fixable.

The skill `specsheriff-terminology-review` was loaded. The checklist below is from `node .claude/vt/writing-rules.mjs`.

## s-7unxytshhc4md54 — Setting a repository up and taking SpecSheriff out of it — **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
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
- 7.2.6 Lists that restrict ✗ "it stages each hook there that holds what it would write…": nothing says these hooks are all that `sheriff init` stages (T2)
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
- согласованность: ✗ решение от 2026-11-02 («…naming each, and nothing else») раньше стояло только в обосновании. Обоснование сокращено, и теперь этого требования в узле нет, хотя тест «…and stages nothing else» его по-прежнему проверяет (T2). Остальное сверено с 10.2 (s-epaw9sgyaajzn8g), 10.6 (s-qzthyh7yqvfhsa2) и решением от 2026-11-13, 1.6.4 (s-x8uzc8z44pwtd3h), 10.13 (s-jsqxdx47wkkj7gp), s-t9j29hppag2nren, s-b6qdtghnyha3fhk, 10.1.18 (s-exxuckgakfxkycp), s-zhen42p6mnaxu7w, s-d3nkw9b6mn98vuw, s-trwczfskj5zmuft и с принципами.
- целостность: ✗ узел противоречит сам себе. Первый пункт списка `sheriff remove` убирает хук прежнего выпуска. Абзац после списка оставляет «each hook and declaration that differs from what `sheriff init` writes», а значит, оставляет и этот хук (T1). Узлы, которые цитируют этот (s-4mej6ccn7xu3d3p, s-zh2vcr3xjumppg5, s-n76wt2bkqdmh78x, s-f5rz6b7dhxejjts, s-gb8s9657a65hqmv-g6), остаются верны.
- целесообразность: ✓ проблема названа: 10.6 сняло правило об одобрении, строка 10.1.18 отвергает раздел без правила, а 1.6.4 требует назвать момент запуска тестов.
- избыточность: ✓ сверено с s-4mej6ccn7xu3d3p, s-n4m5zvh96yb299p, s-zh2vcr3xjumppg5 и s-zefk589ykh37b8u.
- недостаточность: ✗ не сказано, что `sheriff init` делает с объявлением, изменённым вручную: слова «any other file» его не покрывают (T3).

## proposal:s-gb8s9657a65hqmv-g6 — What `sheriff reindex` changes in what an earlier release wrote — **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
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
- согласованность: ✗ по правилу 2.6 (s-f2b5zvc565s242f) узел, который когда-либо одобряли, уходит в архив. Черновик правила об одобрении часто был одобрен: прежний выпуск возвращал спецификацию в черновик отзывом одобрения этого правила (approvals.ts пишет `withdrawn`). Предложение такой черновик удаляет, а его `change` исходит из того, что черновик «ни разу не был одобрен» (R1). Остальное сверено с решением от 2026-11-13, 10.13, s-t9j29hppag2nren, s-7unxytshhc4md54, s-d3nkw9b6mn98vuw, s-f5brvuuu6xmkj6t и s-j9r8z4xdrfkfs47.
- целостность: ✓ сверено с s-j9r8z4xdrfkfs47, s-f5brvuuu6xmkj6t (`pointer`, `symbol`), s-zhen42p6mnaxu7w, s-b6qdtghnyha3fhk и s-ztseyetus7np6br.
- целесообразность: ✓ дефект реален: единственное правило `project.json` этого репозитория — одобренное s-p92k6vfe3ju27at.
- избыточность: ✓
- недостаточность: ✗ условие «once such a rule is archived or removed» остаётся верным и в каждом следующем запуске. Поэтому можно прочитать, что правило о тестах добавляется всякий раз, когда его нет (R2).

## Findings

The author's readings in my input hold. Keeping one node is settled by the round-b brief and row 10.1.23. The draft rule that lists `push` rests on 1.6.4, row 10.1.18, s-b6qdtghnyha3fhk and the ruling of 2026-11-06. The proposal changes only what its `change` lists. The two Russian points and the stage-3 note are nits; everything else blocks.

**T1. WORDING FIX** (the author): the sentence came in with round a, and its `change` does not list it.
- EN: "`sheriff remove` leaves each hook and declaration that differs from every text that `sheriff init` writes now or wrote in an earlier release, and names it."
- RU: «Каждый хук и каждое объявление, которые не совпадают ни с одним текстом, который `sheriff init` пишет сейчас или писал в прежнем выпуске, `sheriff remove` оставляет и называет.»

**T2.** (the author, carrying out the ruling of 2026-11-02): add a new paragraph after the list on the hooks.
- EN: "`sheriff init` stages only the git hooks."
- RU: «`sheriff init` добавляет в стейджинг только git-хуки.»

**T3. WORDING FIX** (the author; init.ts already behaves this way):
- EN: "It leaves as it is any other hook, declaration or file that differs from what it would write, and names each."
- RU: «Любой другой хук, объявление или файл, который отличается от того, что он записал бы, он оставляет как есть и называет.»

**Nits, Russian only:** «настраивает git сливать» in the text and in example 2 should read «настраивает git так, чтобы он сливал». «и называет каждое» should read «и называет каждый из них».

**R1.** (the author, by rule 2.6): replace the item on the draft rule and correct its `change`.
- EN: "until `sheriff.config.json` holds an entry that sets the specification's approval status, a draft rule of `project.json` that refines the rule on that status is moved to the archive with that reason where it was ever approved, and deleted otherwise (§s-f2b5zvc565s242f);"
- RU: «пока в `sheriff.config.json` нет записи, задающей статус одобрения спецификации, черновик правила `project.json`, которое уточняет правило об этом статусе, уходит в архив с той же причиной, если его когда-либо одобряли, а иначе удаляется (§s-f2b5zvc565s242f);»

**R2. WORDING FIX** (the author): replace the item that adds the rule on the tests.
- EN: "in the run that archives or deletes such a rule, where `project.json` is left holding no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added under the top node of `project.json`;"
- RU: «в том запуске, который переносит такое правило в архив или удаляет его, если в `project.json` не остаётся правила, которое уточняет правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h), под верхний узел `project.json` добавляется черновик правила о том, когда запускаются тесты, который пишет `sheriff init` (§s-7unxytshhc4md54);»

**DOUBT, an optional example for the reindex proposal:**
- EN: "In a project that an earlier release set up, the approved rule that approves the specification is the only rule of `project.json`. `sheriff reindex` replaces it with an entry and, in the same run, adds the draft rule on when the tests run. The most likely mistake is to add that rule again in a later run, after the project has deleted it."
- RU: «В проекте, который настроил прежний выпуск, одобренное правило, одобряющее спецификацию, — единственное правило `project.json`. `sheriff reindex` заменяет его записью и в том же запуске добавляет черновик правила о том, когда запускаются тесты. Самая вероятная ошибка — добавить это правило снова в одном из следующих запусков, после того как проект его удалил.»

**Stage-3 note (nit):** reindex.ts:208–218 still adds the old approval rule wherever `project.json` lacks one. The proposal's `stage3` should say this goes; otherwise R1's removal and that addition would undo each other on every run.

**TERM:** I question no term.

**Only the owner can answer:** nothing.

Files I read: `D:/SpecSheriff/.ai_docs/t25-pass/review-input-g6b-c.md`, `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group6-notes.md`, `D:/SpecSheriff/skills/tools/src/init.ts` and `D:/SpecSheriff/skills/tools/src/reindex.ts`.
