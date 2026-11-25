The skill `specsheriff-terminology-review` is loaded. The checklist below comes from `node .claude/vt/writing-rules.mjs`, which reads `moved/specs/_guidelines/spec.json`.

None of the five drafts is ready. The section node needs no change, but its children do: draft 10.1 needs a rewrite of its text, and drafts 10.2 to 10.4 need fixes. Every finding is one the author can fix, and none needs the owner.

---

## 1. `new:tools-10-section`, "Who runs the reviewer" (s-v36s7dm8s3yewtr): **ready**

**Checklist:** 1.2.3 ✓ (a section, not a rule) · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ (no reason) · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test ✓ (no reason)

**Оценка**
- согласованность: ✓ Сравнено с разделами «The commands» (s-qk8ezwujq95er7x) и «SpecTags in the code and the tests» (s-6c4hyyrnprekk32). Текст построен по той же форме «How …».
- целостность: ✓ Текст охватывает все семь дочерних узлов, от s-xr5xxa9cxf2mq5u до s-tnz9zgqx8c629a7.
- целесообразность: ✓ Узел разделён по правилу 7.3.3, как узел «The commands».
- избыточность: ✓ не найдено.
- недостаточность: ✓ не найдено.

No findings. The section and its first child have similar titles, "Who runs the reviewer" and "Which runner runs the reviewer". I did not raise this, because the owner agreed the same pattern for "The commands" on 2026-11-22.

---

## 2. `s-xr5xxa9cxf2mq5u`, "Which runner runs the reviewer": **not ready**

**Checklist:**
- 1.2.3 ✓
- 7.1 ✓
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✗ "the build" is a general word without what it applies to.
- 7.2.4 ✗ The reason says "one reviewer for everyone … names it", but `review.runner` names a runner, not a reviewer.
- 7.2.4.1 ✓
- 7.2.4.2 ✓
- 7.2.4.3 ✓
- 7.2.4.4 ✓
- 7.2.4.5 ✓
- 7.2.5 ✓
- 7.2.6 ✓
- 7.2.7 ✗ "the reviewer's input" is neither explained nor cited. "started for the run" points back to a run that nothing names.
- 7.3.1 ✓
- 7.3.2 ✗ Three sentences each hold two thoughts:
  - "…to a runner, which is an agent's CLI…";
  - "The file `agent`, which the build writes beside `release`, names…";
  - "…and `review.minutes`, which sets the time limit…".
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✓
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✓
- Pairing test ✓ (the two sentences ground the second paragraph in reverse order)

**Оценка**
- согласованность: ✓ Сравнено с «Project-wide settings» (new:tools-1-settings) и «Where the files are» (s-zefk589ykh37b8u), с решениями узла от 2026-10-27 и 2026-11-02 и с config.ts:118.
- целостность: ✓ «Project-wide settings» по-прежнему верно ссылается на этот узел. Ссылки из s-477gtdrkw34dzxw и из плагинов должны перейти на s-tnz9zgqx8c629a7 (пункт 7 заметок автора).
- целесообразность: ✓
- избыточность: ✓ не найдено.
- недостаточность: ✗ «the reviewer's input» не объяснён. `release` читается как ветка `release`, которую называют другие узлы, а не как файл.

**WORDING FIX (the author can fix):** replace the text with the wording below and add a `cites` link to s-nyh9yk22ba6g77q. The fix also states the default positively, as `.claude/vt/rules.md` requires ("A configurable value is stated with its default value…").

> `sheriff review` hands everything that the independent reviewer is given (§s-nyh9yk22ba6g77q) to a runner. A runner is an agent's CLI that `sheriff review` starts for each review (§s-avvnasjhsfkgajh). The runner is `claude` (§s-3wh8uhgn9jr2k74) or `codex` (§s-u2n5hwwqkb6zk4z).
>
> `sheriff review` runs the runner that `review.runner` in `sheriff.config.json` names (§s-zefk589ykh37b8u). The default of `review.runner` is the runner of the SpecSheriff plugin whose tools run `sheriff review`. The build of each SpecSheriff plugin writes the file `agent` into the folder of the plugin's SpecSheriff tools. That file names the plugin's runner:
> - `claude` for the plugin for Claude Code (§s-zh2vcr3xjumppg5);
> - `codex` for the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4).
>
> SpecSheriff tools that hold no such file take `claude`.
>
> The project-wide settings of the reviewer in `sheriff.config.json` are `review.runner` and `review.minutes`. `review.minutes` sets the time limit of a run of the reviewer (§s-wgedv32rdaqca9k).

> `sheriff review` передаёт runner всё, что получает независимый рецензент (§s-nyh9yk22ba6g77q). Runner — это CLI агента, который `sheriff review` запускает для каждого ревью (§s-avvnasjhsfkgajh). Runner — `claude` (§s-3wh8uhgn9jr2k74) или `codex` (§s-u2n5hwwqkb6zk4z).
>
> `sheriff review` запускает тот runner, который называет `review.runner` в `sheriff.config.json` (§s-zefk589ykh37b8u). По умолчанию `review.runner` — это runner того плагина SpecSheriff, чьи инструменты запускают `sheriff review`. Сборка каждого плагина SpecSheriff записывает файл `agent` в папку инструментов SpecSheriff этого плагина. Этот файл называет runner плагина:
> - `claude` — для плагина для Claude Code (§s-zh2vcr3xjumppg5);
> - `codex` — для плагина для Codex CLI (§s-2pdy9gw2jrjvfb4).
>
> Инструменты SpecSheriff, у которых нет такого файла, берут `claude`.
>
> Общие для всего проекта настройки рецензента в `sheriff.config.json` — это `review.runner` и `review.minutes`. `review.minutes` задаёт предел времени прогона рецензента (§s-wgedv32rdaqca9k).

**WORDING FIX (the author can fix), reason:**
- Replace "one reviewer for everyone" with "one runner for everyone".
- In Russian, replace «один рецензент для всех» with «один runner для всех».

---

## 3. `new:tools-10-verdict`, "The reviewer's verdict" (s-68ds99w8wd67aae): **not ready**

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
- 7.2.6 ✗ "treats each of the following as a verdict that cannot be read" lists what is forbidden. An answer wrongly let in would pass a commit unnoticed, so the list must name what is allowed. The owner's ruling of 2026-11-14 on rule 10.5 settles the same point.
- 7.2.7 ✗ "the runner" is uncited.
- 7.3.1 ✓
- 7.3.2 ✓
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✗ The first sentence of the reason restates the first paragraph, and no sentence names the problem the rule solves.
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✓
- Pairing test ✗ The first sentence of the reason grounds paragraph 1. The second, "An answer held to the schema and consistent with itself…", grounds paragraphs 2 and 3, in order.

**Оценка**
- согласованность: ✗ Первое предложение, прочитанное отдельно, отклоняет и коммит, по которому вердикт не запрашивался. Это противоречит примеру s-vp24dqydygztqbt («runs no reviewer, and the commit passes»). Список того, что нельзя прочитать, расходится с решением от 2026-11-14 по правилу 10.5 (s-94k7b6r5kf65udf).
- целостность: ✓ s-vp24dqydygztqbt ссылается на этот узел из-за замечаний вердикта, и эта ссылка по-прежнему верна. Исправление примера правила 10.5 уже записано в заметках (пункт 13).
- целесообразность: ✓
- избыточность: ✗ «The refusal says why…» и примеры причин повторяют текст и примеры правила 10.5.
- недостаточность: ✗ Неясно, какую строку называет замечание о коде, которого нет.

**WORDING FIX (the author can fix), paragraph 1, sentence 1.** Add `cites` links to s-vp24dqydygztqbt and s-xr5xxa9cxf2mq5u.
> `sheriff review` refuses a commit on which it asks for a verdict (§s-vp24dqydygztqbt) unless the runner (§s-xr5xxa9cxf2mq5u) gives a verdict that `sheriff review` can read (§s-94k7b6r5kf65udf).

> `sheriff review` отклоняет коммит, по которому запрашивает вердикт (§s-vp24dqydygztqbt), если только runner (§s-xr5xxa9cxf2mq5u) не даёт вердикт, который `sheriff review` может прочитать (§s-94k7b6r5kf65udf).

**CUT (the author decides):** "The refusal says why no verdict could be read, for example … (§s-wgedv32rdaqca9k)." Rule 10.5 already states it. The link to s-wgedv32rdaqca9k goes with the sentence.

**WORDING FIX (the author can fix), paragraph 2:**
- Replace "held to that schema" with "that conforms to that schema".
- Replace the last sentence. The new wording answers what line a finding names about code that is missing.

> Each finding names the sids of the nodes that it concerns and the problem. A finding that concerns code also names the file and, where the problem lies at a line, that line.

> Каждое замечание называет sid узлов, которых оно касается, и проблему. Замечание, которое касается кода, называет также файл, а если проблема находится в определённой строке — эту строку.

**WORDING FIX (the author can fix):** replace paragraph 3 and its list with the sentence below. It means the same, since the schema fixes the shape of the answer.
> `sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict and either passes the commit with no finding or refuses it with at least one.

> `sheriff review` читает вердикт только из ответа, который соответствует схеме вердикта и либо пропускает коммит без замечаний, либо отклоняет его хотя бы с одним замечанием.

**WORDING FIX (the author can fix), reason:**
> A verdict whose meaning `sheriff review` had to guess, such as a pass that lists a finding, would let `sheriff review` decide the commit in place of the reviewer.

> Если бы `sheriff review` приходилось угадывать смысл вердикта, например пропуска с замечанием, о коммите решал бы `sheriff review`, а не рецензент.

**WORDING FIX (the author can fix), example, sentence 2:**
> That answer is not a verdict that `sheriff review` can read, so `sheriff review` refuses the commit.

> Этот ответ — не вердикт, который `sheriff review` может прочитать, поэтому `sheriff review` отклоняет коммит.

---

## 4. `new:tools-10-start`, "How a runner is started" (s-avvnasjhsfkgajh): **not ready**

**Checklist:**
- 1.2.3 ✗ The reason says "so nothing from the session … may reach it", which states a requirement.
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
- 7.2.7 ✗ "a runner" is uncited.
- 7.3.1 ✓
- 7.3.2 ✓
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✗ The reason restates the text, and nothing in it says why the runner is started "never through a shell".
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✓ (the wording is fixed below)
- Pairing test ✓

**Оценка**
- согласованность: ✗ «holds only the variables that the list … allows» неверно для runner `codex`. Для него `sheriff review` задаёт `CODEX_HOME` (review.ts:269), чего требует согласованная формулировка s-u2n5hwwqkb6zk4z («a Codex home of its own»).
- целостность: ✓ Сравнено с правилом 10.4 (s-nyh9yk22ba6g77q), с todo строки 10.1.35 (`valueList`) и со ссылкой из узла 10.1.
- целесообразность: ✓
- избыточность: ✓ не найдено.
- недостаточность: ✓ не найдено, кроме `CODEX_HOME`.

**WORDING FIX (the author can fix):**
- In the first sentence, write "starts a runner (§s-xr5xxa9cxf2mq5u)" and in Russian «запускает runner (§s-xr5xxa9cxf2mq5u)». Add a `cites` link.
- Replace the third paragraph's first sentences with the wording below, and add a `cites` link to s-u2n5hwwqkb6zk4z.

> The runner's environment holds only the variables that the list of this node allows and, for the runner `codex`, the variable that names its own Codex home (§s-u2n5hwwqkb6zk4z). The variables of the list name:

> Окружение runner содержит только переменные, которые допускает список этого узла, и, для runner `codex`, переменную, которая задаёт его собственный домашний каталог Codex (§s-u2n5hwwqkb6zk4z). Переменные списка задают:

**WORDING FIX, Russian only (the author can fix).** «хосты, которые он пропускает» can be read as the hosts the proxy lets through, which reverses the meaning. Write instead:
> прокси, хосты, к которым обращаются в обход него, и сертификаты, которым следует доверять;

**WORDING FIX (the author can fix), reason:**
> Anything that reaches the runner from the session that made the change, such as the user's memory or the repository through git's variables, lets it judge by more than the rules (§s-nyh9yk22ba6g77q). A shell between `sheriff review` and the runner would read the runner's arguments, such as the schema of the verdict, by its own syntax and could change them.

> Всё, что доходит до runner из сессии, в которой сделано изменение, например память пользователя или репозиторий через переменные git, позволяет ему судить не только по правилам (§s-nyh9yk22ba6g77q). Shell между `sheriff review` и runner читал бы аргументы runner, например схему вердикта, по своему синтаксису и мог бы их изменить.

**WORDING FIX (the author can fix), example.** The current example has three problems:
- It says a hook sets `GIT_DIR`, but git exports `GIT_DIR` before it invokes a hook (githooks, git-scm.com).
- One sentence holds two relations ("so", "therefore").
- "strip a list of known variables" is unclear.

I checked that this session's environment holds `CLAUDECODE`.

> Claude Code sets `CLAUDECODE` for its session, and git sets `GIT_DIR` to the repository for each hook it runs. Neither variable is in the list, so neither reaches the runner. The runner therefore cannot read the repository through `GIT_DIR` from its empty working directory. The most likely mistake is to remove only the variables on a list of known ones, which misses each variable that a new release of an agent adds.

> Claude Code задаёт для своей сессии `CLAUDECODE`, а git задаёт `GIT_DIR` на репозиторий для каждого хука, который запускает. Ни одной из этих переменных нет в списке, поэтому ни одна не доходит до runner. Значит, runner не может прочитать репозиторий через `GIT_DIR` из своего пустого рабочего каталога. Самая вероятная ошибка — убирать только переменные из списка известных: так пропускается каждая переменная, которую добавляет новый выпуск агента.

---

## 5. `new:tools-10-limit`, "The time limit of a run" (s-wgedv32rdaqca9k): **not ready**

**Checklist:**
- 1.2.3 ✓
- 7.1 ✓
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✗ "the limit" in the text and in the reason is a bare general word, and in the text it points back to nothing named.
- 7.2.4 ✓
- 7.2.4.1 ✓
- 7.2.4.2 ✓
- 7.2.4.3 ✓
- 7.2.4.4 ✓
- 7.2.4.5 ✓
- 7.2.5 ✓
- 7.2.6 ✓
- 7.2.7 ✗ "the runner" and "the reviewer" are uncited.
- 7.3.1 ✓
- 7.3.2 ✓
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✗ No sentence of the reason says why a run has a time limit at all.
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✓
- Pairing test ✗ The reason's first sentence grounds the text's second sentence, and its second sentence grounds the text's third, in order.

**Оценка**
- согласованность: ✓ Сравнено с примером правила 10.5 (s-94k7b6r5kf65udf), с «Project-wide settings» и с решением от 2026-11-02 о стоимости прогона.
- целостность: ✓ Узлы 10.1 и 10.2 ссылаются на этот узел. Узел закрывает todo от 2026-11-06, а изменения этапа 3 названы.
- целесообразность: ✓ Потерянные деньги на Windows описаны в todo от 2026-11-06.
- избыточность: ✓ не найдено.
- недостаточность: ✗ Неясно, завершаются ли процессы, которые запустили дочерние процессы runner. В этапе 3 это «whole tree».

**WORDING FIX (the author can fix), text.** Add `cites` links to s-m4h279nbaqkpa3t and s-xr5xxa9cxf2mq5u. The default is stated positively, as `.claude/vt/rules.md` requires.
> `sheriff review` ends a run of the independent reviewer (§s-m4h279nbaqkpa3t) that is still going after the number of minutes that `review.minutes` in `sheriff.config.json` gives (§s-zefk589ykh37b8u). The default of `review.minutes` is twenty. `sheriff review` ends the run together with every process that the runner (§s-xr5xxa9cxf2mq5u) has started, directly or through another process.

> `sheriff review` завершает прогон независимого рецензента (§s-m4h279nbaqkpa3t), который ещё идёт по истечении числа минут, которое задаёт `review.minutes` в `sheriff.config.json` (§s-zefk589ykh37b8u). По умолчанию `review.minutes` равен двадцати. `sheriff review` завершает прогон вместе с каждым процессом, который runner (§s-xr5xxa9cxf2mq5u) запустил сам или через другой процесс.

**WORDING FIX (the author can fix), reason:**
> A run of the reviewer that hangs, together with the processes it has started, goes on costing the person who commits until it is ended. The default time limit is long, so that it ends a run that hangs rather than one that reads a large change.

> Зависший прогон рецензента вместе с запущенными им процессами продолжает стоить денег тому, кто делает коммит, пока его не завершат. Предел времени по умолчанию длинный, чтобы он завершал зависший прогон, а не прогон, который читает большое изменение.

---

## Terms

**TERM: runner.**
- **Established terms:** in CI, a GitHub Actions runner or a GitLab Runner executes a pipeline's jobs (unverified). A test runner executes tests (unverified).
- **Fit:** partial. In both vocabularies, as here, the runner executes a job on behalf of whatever orchestrates it (inference).
- **Owner's decision:** the owner chose the word on 2026-10-27, so I do not re-argue it.
- **Recommendation:** keep the word. At most, the docs' table can carry a gloss. Cost: none.

**TERM: verdict, finding.** No vocabulary in the skill's registry defines either word. Both are ordinary words of code review and audits (inference). Keep them.

## Findings only the owner can answer

None.

Files read: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group2-notes.md`, `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`, `D:/SpecSheriff/specs/_guidelines/tools.json`, `D:/SpecSheriff/skills/tools/src/review.ts`, `D:/SpecSheriff/skills/tools/src/config.ts`.