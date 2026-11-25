I loaded the `specsheriff-terminology-review` skill without trouble. The checklist comes from `node .claude/vt/writing-rules.mjs`, which reads `moved/specs/_guidelines/spec.json`.

**Overall:** "The time limit of a run" is ready. The other five are not ready. The author can fix all but one finding. The remaining one, on "How a runner is started", is a question for the owner.

**Did round b apply the first review's fixes?**
- **R, V, S, L, X:** reviews B and C's fixes are in place word for word. Where the readers changed a word ("have … use", "hold:", "still running", "specifies", "keeps running at the expense of"), the change keeps the meaning.
- **C:** round b dropped "around it" from the English reason but left «вокруг него» in the Russian. Finding C1 below fixes this.
- **Sentences round b wrote itself:** each one keeps the meaning of its Russian, except that one.

## Checklist

Columns: **R** = s-xr5xxa9cxf2mq5u, **V** = new:tools-10-verdict, **S** = new:tools-10-start, **L** = new:tools-10-limit, **C** = new:tools-10-claude, **X** = new:tools-10-codex.

| Rule | R | V | S | L | C | X |
|---|---|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✗ "with a system prompt of its own" can also be read as the CLI's own default prompt | ✓ | ✓ | ✓ |
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
| 7.2.6 Lists that restrict | ✓ | ✓ | ✗ "with none of the user's settings, memory or hooks" lists what is forbidden, though something let in would go unnoticed | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✗ "independent reviewer" cites 10.4, not 1.6.1, which defines it | ✗ "the reviewer" in the reason has no citation | ✓ | ✓ | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✗ "The verdict passes or refuses the commit and lists its findings" | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ "the home holds only the credentials, and the sandbox lets no tool write anything" restates the text |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ (none needed) | ✓ | ✓ | ✓ (none needed) | ✓ (none needed) | ✓ |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## s-xr5xxa9cxf2mq5u, "Which runner runs the reviewer": **not ready**

- **R1 (author, 7.2.7).** Cite 1.6.1 where "independent reviewer" first appears. The existing `implements` link backs the citation.
  - EN: "`sheriff review` hands everything that the independent reviewer (§s-m4h279nbaqkpa3t) is given (§s-nyh9yk22ba6g77q) to a runner."
  - RU: «`sheriff review` передаёт runner всё, что получает (§s-nyh9yk22ba6g77q) независимый рецензент (§s-m4h279nbaqkpa3t).»
- **R2 (author, the "Writing" rule).** "no such file" points back across a paragraph break, which the rule forbids.
  - EN: "SpecSheriff tools that have no file `agent` use `claude`."
  - RU: «Инструменты SpecSheriff, у которых нет файла `agent`, берут `claude`.»

**Оценка**
- согласованность: ✓ сверено с new:tools-1-settings, s-zefk589ykh37b8u, с решениями узла от 2026-10-27, 2026-10-31 и 2026-11-02, с config.ts:118 и copy-assets.mjs:97.
- целостность: ✓ new:tools-1-settings по-прежнему ссылается на этот узел верно. Ссылки из s-477gtdrkw34dzxw, s-zh2vcr3xjumppg5 и s-2pdy9gw2jrjvfb4 на настройки runner и на отметку о вопросе после разделения больше не держатся. Они названы в п. 7 заметок, а эти узлы идут позже в том же проходе.
- целесообразность: ✓ пользователю с одним агентом не нужно выбирать runner.
- избыточность: ✓ не найдено. Фраза о `review.minutes` только перечисляет общие настройки, на которые ссылается new:tools-1-settings.
- недостаточность: ✓ не найдено.

## new:tools-10-verdict, "The reviewer's verdict" (s-68ds99w8wd67aae): **not ready**

- **V1 (author, 7.3.2).** Split the sentence that holds two thoughts.
  - EN: "The verdict passes or refuses the commit. It lists its findings."
  - RU: «Вердикт пропускает или отклоняет коммит. Он перечисляет свои замечания.»
- **V2 (author, 7.2.7).** Cite 1.6.1 for "the reviewer" in the reason, and add a `cites` link to s-m4h279nbaqkpa3t.
  - EN: "… decide the commit in place of the independent reviewer (§s-m4h279nbaqkpa3t)."
  - RU: «… о коммите решал бы `sheriff review`, а не независимый рецензент (§s-m4h279nbaqkpa3t).»

**Оценка**
- согласованность: ✓ сверено с правилом 10.5 (s-94k7b6r5kf65udf) и решением по нему от 2026-11-14, с s-vp24dqydygztqbt, с решением от 2026-11-05 и с review.ts:286-302.
- целостность: ✓ s-vp24dqydygztqbt ссылается на этот узел из-за замечаний вердикта. Вопрос инвентаря о схеме вердикта для новых суждений закрыт: замечание называет sid узлов.
- целесообразность: ✓
- избыточность: ✓ не найдено. Первый абзац повторяет 10.5 для `sheriff review` и runner и служит рамкой для третьего абзаца.
- недостаточность: ✓ не найдено.

## new:tools-10-start, "How a runner is started" (s-avvnasjhsfkgajh): **not ready**

- **S1 (author, 7.1).** Clarify the second item. It is an agreed sentence, so list the change in the change list. The code replaces the CLI's default prompt (review.ts:135).
  - EN: "with a system prompt that `sheriff review` writes for it;"
  - RU: «с системным промптом, который для него пишет `sheriff review`;»
- **S2 (owner, 7.2.6).** See the question at the end of this report.

**Оценка**
- согласованность: ✓ сверено с 10.4 (s-nyh9yk22ba6g77q), с решением от 2026-11-05, с s-u2n5hwwqkb6zk4z и с review.ts:126-191 и 269.
- целостность: ✓ s-xr5xxa9cxf2mq5u ссылается на этот узел в определении runner. Todo строки 10.1.35 (`valueList`) выполнен.
- целесообразность: ✓
- избыточность: ✓ не найдено.
- недостаточность: ✗ первый пункт не называет серверы MCP и slash-команды, которые код уже не пропускает (review.ts:130-131). Он пропустит и то, что добавит новый выпуск CLI.

## new:tools-10-limit, "The time limit of a run" (s-wgedv32rdaqca9k): **ready**

There are no findings.

**Оценка**
- согласованность: ✓ сверено с 10.5 (s-94k7b6r5kf65udf, пример о пределе времени), с new:tools-1-settings и с todo от 2026-11-06.
- целостность: ✓ s-xr5xxa9cxf2mq5u ссылается на этот узел. Изменение runCli в этапе 3 названо в поле stage3.
- целесообразность: ✓ todo от 2026-11-06: на Windows Codex продолжал работать после предела.
- избыточность: ✓ не найдено.
- недостаточность: ✓ не найдено.

## new:tools-10-claude, "The runner `claude`" (s-3wh8uhgn9jr2k74): **not ready**

- **C1 (author, Russian).** Make the Russian reason match the English, which no longer says "around it":
  - RU: «В режиме print CLI отвечает один раз и завершается, без сессии, которая могла бы перенести в ревью прежний разговор (§s-m4h279nbaqkpa3t).»

**Оценка**
- согласованность: ✓ сверено с решением от 2026-11-02 (opus с переходом на sonnet), с s-tnz9zgqx8c629a7, s-avvnasjhsfkgajh и review.ts:132.
- целостность: ✓ s-xr5xxa9cxf2mq5u и s-tnz9zgqx8c629a7 ссылаются на этот узел.
- целесообразность: ✓
- избыточность: ✓ не найдено.
- недостаточность: ✓ не найдено.

## new:tools-10-codex, "The runner `codex`" (s-u2n5hwwqkb6zk4z): **not ready**

- **X1 (author).** The third paragraph has two problems. It opens with "It", which points back to a runner named in another paragraph. "requests no model" is also a negative statement, which `.claude/vt/rules.md` rules out ("A rule says what holds").
  - EN: "The runner `codex` requests the model and the reasoning effort that the settings of the runner specify (§s-tnz9zgqx8c629a7). Where `specsheriff.review.codexModel` is empty, it leaves the choice of the model to Codex."
  - RU: «Runner `codex` запрашивает модель и effort, которые задают настройки этого runner (§s-tnz9zgqx8c629a7). Если `specsheriff.review.codexModel` пуст, он оставляет выбор модели за Codex.»
- **X2 (author, 7.4.2, CUT).** Cut the reason's clause after the colon, which restates the text.
  - EN: "Codex offers no run without its own home and tools, so the runner restricts both."
  - RU: «Codex не предлагает прогона без своего домашнего каталога и инструментов, поэтому runner ограничивает и то и другое.»

**Оценка**
- согласованность: ✓ сверено с решениями от 2026-11-02 и 2026-11-05, с s-tnz9zgqx8c629a7 (пустой `codexModel` значит модель, которую выбирает Codex), с s-avvnasjhsfkgajh и с review.ts:236-276.
- целостность: ✓ s-avvnasjhsfkgajh ссылается на этот узел из-за домашнего каталога Codex.
- целесообразность: ✓
- избыточность: ✗ вторая половина обоснования повторяет текст.
- недостаточность: ✓ не найдено.

**Terms:** round b brings in no new term. "runner" was the owner's choice on 2026-10-27. It only partly matches what developers call a CI runner (GitHub Actions, GitLab; this is unverified, since the skill's registry does not cover it). I would keep the word and add the gloss "not a CI runner" in the docs (inference).

## Findings only the owner can answer

1. **S2: what should a runner take from what its CLI keeps for the user?** Today the node lists what the runner does not take: "with none of the user's settings, memory or hooks".
   - **A (recommended): list what it does take.**
     - EN: "with only the credentials from what its CLI keeps for the user;"
     - RU: «только с данными входа из того, что его CLI хранит для пользователя;»
     - Gain: anything else in the user's setup of the CLI stays out of the review, as the node's own example argues for variables. That includes a user's MCP servers, their slash commands and whatever a new Claude Code or Codex release adds.
     - Cost: an agreed sentence changes.
     - Cost: the test written from this node must show that nothing else from the user's Claude Code setup reaches the run. The code already passes `--setting-sources ""`, `--strict-mcp-config` and `--disable-slash-commands`. Whether those flags are enough is unverified.
   - **B: keep the list as it is.**
     - Cost: rule 7.2.6 stays breached.
     - Cost: the list leaves out the MCP servers and slash commands that the code already keeps out, and whatever a new release adds goes unnoticed.

Files read: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group2-notes.md`, `D:/SpecSheriff/.ai_docs/t25-pass/review-g2-b.md`, `D:/SpecSheriff/.ai_docs/t25-pass/review-g2-c.md`, `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`, `D:/SpecSheriff/skills/tools/src/review.ts`, `D:/SpecSheriff/skills/tools/src/config.ts`, `D:/SpecSheriff/skills/tools/scripts/copy-assets.mjs`.