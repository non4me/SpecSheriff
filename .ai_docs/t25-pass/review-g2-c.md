I loaded the skill `specsheriff-terminology-review` without trouble. I read the brief, the input file, every draft in `tools-drafts.json` that these five nodes touch or are cited by, the new form under `moved/`, the current `tools.json`, the continuation file and `review.ts`/`code.ts`.

# Review of group 2, input c: five drafts

## Checklist (`node .claude/vt/writing-rules.mjs`)

Columns: **claude** = new:tools-10-claude, **codex** = new:tools-10-codex, **settings** = new:tools-10-settings, **§8** = new:tools-8-section, **8.1** = s-5z5gnu7pahr82xp.

| Rule | claude | codex | settings | §8 | 8.1 |
|---|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ (a section has no reason) | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✗ "only from these settings", which the last paragraph's defaults contradict | ✓ | ✗ "including a node in a cell of a `TableRule`" also reads as a term in a cell |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✗ reason: "to carry anything over" | ✓ | ✗ reason: "the efforts" | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✗ "An empty `codexModel`" | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✗ "The runner `claude`": runner is not cited | ✗ "The runner `codex`": same | ✗ "each runner", "every review" and, in the reason, "the reviewer" are not cited | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ (none) | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ (none) | ✓ (none; one is proposed below) | ✓ | ✓ | ✗ "which does not say what requires the code" does not match the text |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ (none) | ✓ |

## Оценка

**new:tools-10-claude**
- согласованность: ✓ — сверено с 10.4 (s-nyh9yk22ba6g77q), с решением от 2026-11-02 у s-xr5xxa9cxf2mq5u (opus с переходом на sonnet) и с s-avvnasjhsfkgajh.
- целостность: ✓ — сверено с s-xr5xxa9cxf2mq5u, s-avvnasjhsfkgajh, s-tnz9zgqx8c629a7 и s-u2n5hwwqkb6zk4z.
- целесообразность: ✓ — узел выделен по 7.3.3 (s-6j8ystpj2yzcchq).
- избыточность: ✓
- недостаточность: ✗ — узел не говорит, что сессия не сохраняется. При этом код передаёт `--no-session-persistence` (review.ts:132), тест называется «…with no … session», а узел runner `codex` это говорит.

**new:tools-10-codex**
- согласованность: ✓ — сверено с решениями от 2026-11-02 (runner `codex`) и 2026-11-05, с s-avvnasjhsfkgajh и с review.ts:234-276.
- целостность: ✓ — сверено с s-xr5xxa9cxf2mq5u и s-tnz9zgqx8c629a7.
- целесообразность: ✓
- избыточность: ✓ — фраза «Where the model is empty…» здесь и фраза о пустом `codexModel` в s-tnz9zgqx8c629a7 описывают разные стороны: что передаёт runner и что значит значение.
- недостаточность: ✓

**new:tools-10-settings**
- согласованность: ✗ — фраза «hooks … of each SpecSheriff plugin» неверна для Codex: его плагин хуков не объявляет (s-2pdy9gw2jrjvfb4), а хуки Codex лежат в проекте (s-n76wt2bkqdmh78x). С решением от 2026-11-02 и с s-477gtdrkw34dzxw узел согласован.
- целостность: ✗ — п. 7 заметок неточен. В s-zh2vcr3xjumppg5 и s-2pdy9gw2jrjvfb4 фраза «marks the runner asked» должна ссылаться на s-477gtdrkw34dzxw, где отметка `specsheriff.review.*Asked` определена. Если же перенаправить на этот узел их ссылку «когда спрашивают», ссылки замкнутся по кругу.
- целесообразность: ✓
- избыточность: ✗ — три предложения о том, что хуки и skill спрашивают и записывают, повторяют согласованные s-477gtdrkw34dzxw, s-zh2vcr3xjumppg5 и s-2pdy9gw2jrjvfb4.
- недостаточность: ✗ — фраза «only from these settings» противоречит абзацу о значениях по умолчанию.

**new:tools-8-section**
- согласованность: ✓ — сверено с s-sfjka4zc4rhfu67, s-hheus6f395ynqvc и с решением от 2026-11-13 у строки 10.1.26a: только код системы и его тесты содержат SpecTag.
- целостность: ✓ — сверено с дочерними узлами s-5z5gnu7pahr82xp, s-33fw3ga4ctd94dq, s-5qdjyf6t898rsd4, s-trwczfskj5zmuft и s-zrsc6asgmhv8tnc.
- целесообразность: ✓ — устроен так же, как new:tools-2-section, согласованный 2026-11-22.
- избыточность: ✓
- недостаточность: ✓

**s-5z5gnu7pahr82xp**
- согласованность: ✗ — «любой собственный тип проекта» противоречит решению D3 от 2026-11-10: тест пишется для правила или для узла собственного типа, который требует реализации в коде.
- целостность: ✗ — требование к тексту после `@spec none` не проверяет ни один узел. s-rd9nftptjuz6bwv отклоняет только `@spec none` на коде с логикой, а s-9rtrj24myzjvshu не отклоняет SpecTag, не подходящий ни под одну форму. Кроме того, «A rule here» определено только для этого узла, а s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c и s-8wp7xm7g3u8gscq ссылаются на это определение.
- целесообразность: ✓ — D2 решено правилом 1.2.7 (s-2jcmb9xe9d64t2t).
- избыточность: ✓ — сверено с s-kgbzk2ph9e6jfb4, s-8xw4mgvpexyvw5q и s-zrsc6asgmhv8tnc.
- недостаточность: ✗ — фраза о ячейке допускает термин, а s-5fewsp22mmdz7y6 разрешает термин в ячейке.

## Findings

**Verdicts:** §8 is **ready**. The other four are **not ready**.

### new:tools-10-claude — not ready
- **Author fix (7.2.7):** "The runner `claude` (§s-xr5xxa9cxf2mq5u) is …", plus a `cites` link. RU: «Runner `claude` (§s-xr5xxa9cxf2mq5u) — это …»
- **Author fix (7.2.3), the reason:** "In print mode, the CLI answers once and exits, with no session around it that could carry an earlier conversation into the review (§s-m4h279nbaqkpa3t)." The existing `implements` link backs the citation. RU: «В режиме print CLI отвечает один раз и завершается, и вокруг него нет сессии, которая могла бы перенести в ревью прежний разговор (§s-m4h279nbaqkpa3t).»
- **Owner (DOUBT):** add "It runs with its session not kept." RU: «Он работает без сохранения сессии.» Recommended: the code already does this, and the owner already agreed to the same sentence for `codex`. Cost: one sentence, no change to the code.

### new:tools-10-codex — not ready
- **Author fix (7.2.7):** "The runner `codex` (§s-xr5xxa9cxf2mq5u) is …", plus a `cites` link.
- **Change to an agreed sentence, positive form:** list it among the changes, as the author did for the other negatives: "It holds only a copy of the user's sign-in." RU: «В нём есть только копия данных входа пользователя.»
- **DOUBT, an optional example:** "`sheriff review` makes a temporary directory, copies the user's `auth.json` into it, and starts `codex exec` with `CODEX_HOME` set to that directory, so the user's own configuration and skills stay out of the run. The most likely mistake is to leave `CODEX_HOME` at the user's own Codex home, which brings that configuration and those skills into the review." RU: «`sheriff review` создаёт временный каталог, копирует в него `auth.json` пользователя и запускает `codex exec` с `CODEX_HOME`, указывающим на этот каталог, поэтому собственная конфигурация и skill пользователя в прогон не попадают. Самая вероятная ошибка — оставить `CODEX_HOME` на собственном домашнем каталоге Codex пользователя: тогда эта конфигурация и эти skill попадают в ревью.»

### new:tools-10-settings — not ready
- **Author fix (согласованность):** "The agent's hooks (§s-477gtdrkw34dzxw) and the skills of each SpecSheriff plugin ask only for …" RU: «Хуки агента (§s-477gtdrkw34dzxw) и skill каждого плагина SpecSheriff спрашивают только …»
- **Author fix (7.1):** "… only from these settings and their defaults." RU: «… только из этих настроек и их значений по умолчанию.»
- **Author fix (7.2.4.4):** "An empty `specsheriff.review.codexModel` means …" (the Russian changes the same way).
- **Author fix (7.2.7):**
  - "each runner (§s-xr5xxa9cxf2mq5u)", plus a link;
  - "With every review (§s-m4h279nbaqkpa3t) that …";
  - in the reason, "A run of the reviewer (§s-m4h279nbaqkpa3t)".
- **Author fix (7.2.3):** in the reason, "the reasoning efforts".
- **Author fix, the example:** "From then on, every review that the runner `claude` makes on that machine runs at that model, …" RU: «С тех пор каждое ревью, которое runner `claude` выполняет на этой машине, идёт на этой модели, …» As drafted, it says every project, which is untrue for a project whose runner is `codex`.
- **DOUBT (избыточность):** recommend no change now. Keep this node as the one place that states the rule, and record in the continuation file that s-477gtdrkw34dzxw and the two plugin nodes should cite it when they next change. Fix item 7 of the notes as the Оценка line says.

### s-5z5gnu7pahr82xp — not ready
- **Author fix, following D3:** replace ¶2 with the wording below. For code, the same narrowing is my inference from s-9rtrj24myzjvshu's own reason: a node that no code can implement binds nothing.
  - EN: "The rule that a SpecTag `@spec <sid>` names is a node of one of these kinds, including one in a cell of a `TableRule`: `TextRule`; `TableRule` (§s-5fewsp22mmdz7y6); `RecordType` (§s-ktfstpv8rurznrp); a project's own kind whose nodes require an implementation in code (§s-vsh384ybt4w25a2)." Set the kinds as a bulleted list.
  - RU: «Правило, которое называет SpecTag `@spec <sid>`, — это узел одного из этих типов, в том числе в ячейке `TableRule`: `TextRule`; `TableRule` (§…); `RecordType` (§…); собственный тип проекта, узлы которого требуют реализации в коде (§…).»
- **Author fix, "the code" has nothing to refer back to:**
  - First bullet: "… a rule that the code carrying the SpecTag implements, or that the test carrying it is written from …" RU: «… которое реализует код с этим SpecTag или из которого написан тест с этим SpecTag …»
  - Second bullet: "… what the technology that the system is built with requires of the code that carries the SpecTag …"
- **Author fix, a sibling node (целостность):**
  - Add to s-rd9nftptjuz6bwv's refusals: "a changed symbol or file carries `@spec none` whose text does not say what the technology that the system is built with requires of it (§s-5z5gnu7pahr82xp)".
  - Add to s-9rtrj24myzjvshu's refusals: "a text that opens with `@spec` and has neither form of a SpecTag (§s-5z5gnu7pahr82xp)".
  - The continuation file left this open "at the tools step". If the author does not read 8.1 as settling it, it goes to the owner.
- **Author fix, the reason:** it says "One fixed form", but the text gives two, and it does not say why the D2 change was made. Replace with: "Fixed forms, each opening with `@spec`, let the SpecSheriff tools find every SpecTag by its text, in a file in any language. What follows `@spec none` says why the code needs no rule, so that whoever reads the code can tell whether it is technical code (§s-2jcmb9xe9d64t2t)." RU: «Неизменные формы, каждая из которых начинается с `@spec`, позволяют инструментам SpecSheriff находить каждый SpecTag по его тексту в файле на любом языке. То, что следует за `@spec none`, говорит, почему коду не нужно правило, чтобы тот, кто читает код, мог понять, технический ли это код (§s-2jcmb9xe9d64t2t).»
- **Author fix, the example and its Russian:** "…, which does not say what the technology requires of the code." RU: «он не говорит, что требует от кода технология». The current «что требует этот код» reads as "what this code requires".

### Terms
- **runner:** I checked this during the run. In GitHub Actions, runners are the machines that execute a workflow's jobs ([GitHub Docs](https://docs.github.com/en/enterprise-cloud@latest/actions/how-tos/using-github-hosted-runners/using-github-hosted-runners/about-github-hosted-runners)); GitLab's meaning is the same (unverified). The fit is partial: a near false friend for developers. The owner named the runner on 2026-10-27, and `review.runner` is a key in `sheriff.config.json`. Recommendation: keep the word and add the gloss "not a CI runner" in the docs (inference). A rename would cost a migration of the config key, the code and the nodes.
- **print mode, reasoning effort, sandbox, Codex home:** these are the vendors' own terms, with the same meaning. The flags in review.ts confirm them; the vendors' documentation was not re-read (unverified).
- **SpecTag:** the owner coined it on 2026-11-06. It fits partially with an [OFT] "marker of coverage". A gloss is enough.
- **`@spec none` and technical code:** no established term covers them (inference). Keep both.

## Questions only the owner can answer
1. Should "The runner `claude`" say "It runs with its session not kept"? Recommended: yes.

Sources:
- [GitHub Docs — Overview of GitHub-hosted runners](https://docs.github.com/en/enterprise-cloud@latest/actions/how-tos/using-github-hosted-runners/using-github-hosted-runners/about-github-hosted-runners)