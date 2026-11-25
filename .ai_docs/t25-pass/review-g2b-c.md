The skill `specsheriff-terminology-review` is loaded. Three of the six drafts are ready and three are not. The settings node has five fixes, and the bindings file and the test-declaration node have one each. All seven are wordings the author can apply. None of them is a question for the owner.

Every fix from the first round (`review-g2-c.md`, `review-g2-d.md`) is in place, word for word or with harmless changes ("With every review" became "In every review", "runs at" became "runs with", "stands" became "is placed"). No fix was rejected.

## Checklist (`node .claude/vt/writing-rules.mjs`)

Columns: **S** = new:tools-10-settings, **F** = s-5z5gnu7pahr82xp, **Y** = new:tools-8-symbol, **T** = new:tools-8-file-start, **B** = new:tools-8-bindings, **D** = s-zrsc6asgmhv8tnc.

| Rule | S | F | Y | T | B | D |
|---|---|---|---|---|---|---|
| 1.2.3 Text and reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.1 Goal, reader, scope | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ "anything other than one SpecTag" lets `@spec none …` through |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 Order of the text | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✗ "the configuration" (¶3, ¶5) | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words from the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.1 Title | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 Contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✗ "Until the user confirms them, each review tells the user which settings it ran with." repeats ¶5 | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 Length of a sentence | ✗ "the value that the user whose configuration it is gives in answer" reads awkwardly | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Pairing test | ✗ reason sentence 1 matches ¶1, sentence 2 matches ¶2–3, sentence 3 matches ¶5 | ✓ | ✓ (both sentences justify one place; "There" ties them) | ✓ | ✓ | ✓ |

## new:tools-10-settings — **not ready**

All five fixes are for the author.

1. **¶3, last sentence** ("The nodes on the session start … say when each setting is asked for").
   - Problem: the sentence does nothing but point elsewhere.
   - Problem: s-zh2vcr3xjumppg5 and s-2pdy9gw2jrjvfb4 are the two plugin nodes, not nodes about `spec-init`.
   - Problem: the Russian («говорят начало сессии … и skill») leaves out "the nodes on".
   - Fix: cut the sentence and move its citations into sentence 2. Point 2 below also renames "the configuration" in the same paragraph, so ¶3 becomes:
     - EN: "A setting that the user's git configuration holds, empty or not, counts as confirmed. The agent's hooks (§s-477gtdrkw34dzxw) and the skills of each SpecSheriff plugin (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) ask only for a setting that this configuration lacks. They write a setting into a user's git configuration only with the value that this user gives in answer. Where the user answers with the default, they write it like any other value."
     - RU: «Настройка, которая есть в конфигурации git пользователя, пустая или нет, считается подтверждённой. Хуки агента (§s-477gtdrkw34dzxw) и skill каждого плагина SpecSheriff (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) спрашивают только о настройке, которой в этой конфигурации нет. Они записывают настройку в конфигурацию git пользователя только со значением, которое этот пользователь дал в ответ. Если пользователь отвечает значением по умолчанию, они записывают его как любое другое значение.»
   - This also fixes the 7.5.2 line.
2. **¶5, first sentence** (rule 7.2.3). "The configuration" is far from ¶1, and rule 9.1 uses "the repository's configuration" for something else.
   - EN: "Where the user's git configuration lacks a setting of the runner in use, `sheriff review` takes that setting's default."
   - RU: «Если в конфигурации git пользователя нет настройки runner, который запускается, `sheriff review` берёт значение этой настройки по умолчанию.»
3. **Empty settings are left open.** The node says only what an empty `codexModel` means. Today the code passes empty values on as `--model ""`, `--fallback-model ""` and `--effort ""` (review.ts:125-127), and as `model_reasoning_effort=''` (review.ts:240).
   - The fix generalises the rule the owner agreed for `codexModel`. It replaces ¶2's second sentence:
     - EN: "Where a setting is empty, the runner requests no value for it, so the runner's CLI uses a value of its own. An empty `specsheriff.review.codexModel`, for example, means the model that Codex chooses for the signed-in account."
     - RU: «Если настройка пуста, runner не запрашивает для неё значения, поэтому CLI runner использует собственное значение. Например, пустой `specsheriff.review.codexModel` означает модель, которую Codex выбирает для учётной записи, под которой выполнен вход.»
   - Stage 3 then has to omit empty flags in review.ts:125-127 and :240.
4. **Reason** (rule 7.4.2 and the pairing test).
   - EN: "A run of the reviewer (§s-m4h279nbaqkpa3t) is paid for by the user who commits, from their own account. So that user alone controls the models and the reasoning efforts that the reviewer runs with."
   - RU: «Прогон рецензента (§s-m4h279nbaqkpa3t) оплачивает пользователь, который делает коммит, из своей учётной записи. Поэтому только этот пользователь распоряжается моделями и effort, с которыми работает рецензент.»

**Оценка**
- согласованность: ✓ — сверено с решением от 2026-11-02 у s-xr5xxa9cxf2mq5u, с s-477gtdrkw34dzxw, s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4 (у Codex хуки в проекте), с черновиками s-3wh8uhgn9jr2k74 и s-u2n5hwwqkb6zk4z.
- целостность: ✓ — s-xr5xxa9cxf2mq5u, s-3wh8uhgn9jr2k74 и s-u2n5hwwqkb6zk4z ссылаются на этот узел; ссылки хуков и плагинов будут перенаправлены в пунктах 57, 62 и 63 порядка ревью (заметки, п. 7).
- целесообразность: ✓ — прогон оплачивает пользователь (решение от 2026-11-02).
- избыточность: ✗ — последнее предложение ¶3 только отсылает к другим узлам и своей мысли не добавляет. Повтор с узлами хуков и плагинов принят по совету ревью C.
- недостаточность: ✗ — не сказано, что значит пустая настройка, кроме `codexModel`.

## s-5z5gnu7pahr82xp — **ready**

No findings.

**Оценка**
- согласованность: ✓ — 9.3, 10.10 (s-sfjka4zc4rhfu67), 1.2.7, 1.4.2, 8.6, 12.3a, 8.3, решение D3 от 2026-11-10, «`exempts` links».
- целостность: ✓ — s-9rtrj24myzjvshu, s-rd9nftptjuz6bwv, s-utf4mbt7ref8g9c, s-36x8amvunmv2kp5, s-8wp7xm7g3u8gscq.
- целесообразность: ✓ — сомнение D2 снято правилом 1.2.7.
- избыточность: ✓
- недостаточность: ✓

## new:tools-8-symbol — **ready**

No findings.

**Оценка**
- согласованность: ✓ — 1.5.2, решения от 2026-09-22 и 2026-10-08, code.ts:199 (записано в stage3).
- целостность: ✓ — s-5qdjyf6t898rsd4, s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c, s-zrsc6asgmhv8tnc; пробел в 1.5.2 записан в заметках (п. 10).
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

## new:tools-8-file-start — **ready**

No findings.

**Оценка**
- согласованность: ✓ — 1.5.2 («как можно ближе к началу»), 9.1; пример согласуется с текстом.
- целостность: ✓ — s-9rtrj24myzjvshu, s-trwczfskj5zmuft, s-33fw3ga4ctd94dq.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓ — цена для формата с другой обязательной первой строкой названа в поле `change`.

## new:tools-8-bindings — **not ready**

One fix for the author.

- **¶1, second sentence.** The other binding-check nodes in the group all say that they also run in a draft. This node does not, so a reader may conclude that it does not. Row 10.1.26b costs "refused" with no exception, and the ruling of 2026-11-17 on that row says "on every commit".
  - EN: "At every commit, whether the specification is approved or a draft, it refuses any other entry, naming its path."
  - RU: «При каждом коммите, независимо от того, одобрена спецификация или она черновик, любую другую запись он отвергает, называя её путь.»

**Оценка**
- согласованность: ✓ — 1.5.2, 10.1.26b и решение от 2026-11-17, «Where the files are», «What the SpecSheriff tools read in the project's own guidelines».
- целостность: ✓ — s-9rtrj24myzjvshu, s-36x8amvunmv2kp5, s-5qdjyf6t898rsd4; узлы, которые должны измениться, названы в заметках (п. 5, 6, 9).
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ — не сказано, что проверка идёт при каждом коммите и в черновике.

## s-zrsc6asgmhv8tnc — **not ready**

One fix for the author.

- **¶4, first sentence** (rule 7.1). The plugin refuses anything but `@spec <sid>` (`TAG`, `__init__.py`:13), but "one SpecTag" also lets `@spec none …` through.
  - EN: "Where the mark holds anything other than one SpecTag `@spec <sid>`, the plugin stops the run with an error that names the test."
  - RU: «Если пометка содержит что-либо, кроме одного SpecTag `@spec <sid>`, плагин останавливает прогон с ошибкой, которая называет тест.»

**Оценка**
- согласованность: ✓ — 1.4.2, 9.3, s-5z5gnu7pahr82xp, s-gb8s9657a65hqmv, решение от 2026-10-27.
- целостность: ✓ — s-utf4mbt7ref8g9c, s-3xx2eukc8gtd2tx.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ — из текста не ясно, ошибка ли `@spec none …` в пометке.

## Terms

The drafts use no new term since the first round. The earlier advice still stands. "runner" is close to the CI runner of GitHub Actions (partial fit), so the docs should gloss it rather than rename it. "Bindings file", "SpecTag" and "description of a language" each need only a gloss in the docs.

## Questions only the owner can answer

None.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group2-notes.md`, `D:/SpecSheriff/skills/tools/src/review.ts`, `D:/SpecSheriff/skills/pytest-specsheriff/src/pytest_specsheriff/__init__.py`