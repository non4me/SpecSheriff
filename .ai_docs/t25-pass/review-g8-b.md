# The first review of group 8, part b: the report of specsheriff-rule-reviewer

The skill `specsheriff-terminology-review` could not be loaded with the Skill tool ("Unknown skill"). As the brief allows, I read its SKILL.md from `C:/Users/PC/.claude/skills/synced/a08d2aec-…/specsheriff-terminology-review/SKILL.md`.

**None of the four drafts is ready.** Three need only fixes the author can make. The guard draft (`s-st6td4mua9uqt9z`) also needs one answer from the owner, on base question 4.

The points from the brief that fall in my input:
- **The split of "The hooks":** the author's reading holds for the three new nodes. Each can be carried out without the others (rule 7.3.3), and the list of the hooks in s-477gtdrkw34dzxw cites each of them.
- **`sheriff markdown` and `sheriff map` only with the Views extension:** the author's reading holds. Both agreed command nodes (s-e3495enbc5h75c3, s-rpv4fkdqqguptqd) refuse to run without that extension.
- **Base question 3:** it does not block the guard. The agreed node s-8wp7xm7g3u8gscq reads "code bound to a rule" the same way.
- **Base question 4:** the guard cannot be final until the owner answers it (see the guard draft below).

---

## 1. `new:tools-6-hooks-on` — Turning the git hooks on when a session starts — **not ready**

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
- 7.4.2 The reason ✗ The reason never says why the hook turns the git hooks on, which is the node's title and first paragraph. "would pass no check" can be read as "would fail every check", and the Russian «не прошёл бы ни одной проверки» reads that way.
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✗ "which run by the interpreter that their first line names" is ungrammatical.
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test ✗ Reason sentences 1–2 ground paragraph 2, and sentence 3 grounds paragraph 3, in order. Paragraph 1 is grounded by nothing.

**Оценка**
- согласованность: ✓ сверено с 10.2 (s-epaw9sgyaajzn8g), s-7unxytshhc4md54 (sheriff init задаёт core.hooksPath), s-n4m5zvh96yb299p, s-4mej6ccn7xu3d3p, черновиками s-477gtdrkw34dzxw и s-zh2vcr3xjumppg5, решением 2026-11-02 на s-477gtdrkw34dzxw.
- целостность: ✓ «The hooks» ссылается на узел; узел о плагине для Claude Code (без sheriff.config.json хуки только копируют инструменты и пишут параметры) с ним совпадает.
- целесообразность: ✗ обоснование называет только проблему хуков без бита исполнения и не называет, зачем включать хуки через core.hooksPath.
- избыточность: ✓ не найдена; «собственные инструменты… их запускает интерпретатор» повторяет s-n4m5zvh96yb299p (см. CUT).
- недостаточность: ✗ не сказано, в каких настройках git задаётся core.hooksPath; код задаёт его в настройках репозитория.

**Findings** (all can be fixed by the author)
- **WORDING FIX, the reason.** Replace it with:
  - EN: "In a clone where git does not run the git hooks, no check runs on a commit. A git hook that git does not run cannot report this, while the session start reaches every clone. The session start leaves recording a hook's mode to the author, since what a commit holds is the author's choice."
  - RU: «В клоне, где git не запускает git-хуки, ни одна проверка коммита не выполняется. Git-хук, который git не запускает, сам сообщить об этом не может, а начало сессии доходит до каждого клона. Запись режима хука начало сессии оставляет автору, потому что содержимое коммита выбирает его автор.»
- **WORDING FIX, the scope of `core.hooksPath`.** The code sets it in the repository's own configuration (`session-start.sh` line 26).
  - EN: "where it is unset, the hook sets it to `.githooks` in the repository's git configuration and says so;"
  - RU: «если эта настройка не задана, хук задаёт ей значение `.githooks` в настройках git этого репозитория и сообщает об этом;»
- **WORDING FIX, a negative statement** (.claude/vt/rules.md, "A rule says what holds"). The owner's ruling of 2026-11-02 settles the meaning, not the form.
  - EN: "It leaves the mode of each file and git's index as they are."
  - RU: «Режим файлов и индекс git он оставляет как есть.»
- **CUT.**
  - EN: "It leaves out the project's own tools in `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p)."
  - RU: «Собственные инструменты проекта в `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p) хук пропускает.»

---

## 2. `new:tools-6-reviewer-settings` — The reviewer's settings asked for when a session starts — **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✗ "The reviewer's settings": the text and s-tnz9zgqx8c629a7 call these "the settings of each runner". s-xr5xxa9cxf2mq5u uses "settings of the reviewer" for `review.runner` and `review.minutes`.
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✗ "the one that `review.runner` names" does not name the object the key belongs to.
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✓
- 7.3.1 The title ✗ The title covers only the asking, while paragraph 1 writes the options of the plugin for Claude Code.
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✗ "The hook asks so once" is not idiomatic.
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test ✓ (sentence 1 grounds paragraphs 2–3 and sentence 2 grounds paragraph 1, not in order)

**Оценка**
- согласованность: ✗ «хук агента любого из плагинов SpecSheriff»: по s-n76wt2bkqdmh78x и s-477gtdrkw34dzxw хуки для Codex принадлежат проекту, а не плагину. С s-tnz9zgqx8c629a7, s-xr5xxa9cxf2mq5u, s-4mej6ccn7xu3d3p и решением 2026-11-02 — ✓.
- целостность: ✓ s-kq6wmdud9c7j2k9 (spec-init) опирается на отметку `…Asked`, которую узел задаёт. При смене названия «The hooks» тоже должен говорить «settings of each runner».
- целесообразность: ✓ запуск рецензента оплачивает пользователь; Codex при установке ничего не спрашивает.
- избыточность: ✓ не найдена; второе предложение абзаца 2 добавляет к s-xr5xxa9cxf2mq5u, какие инструменты возьмут git-хуки.
- недостаточность: ✓ не найдена; случай, когда пользователь не ответил, закрывает s-tnz9zgqx8c629a7.

**Findings** (all can be fixed by the author)
- **WORDING FIX, whose hook asks.** Add a `cites` link to s-477gtdrkw34dzxw.
  - EN: replace "the agent's hook of either SpecSheriff plugin" with "the agent's hook run when a session starts (§s-477gtdrkw34dzxw), in Claude Code or in Codex CLI,"
  - RU: «хук агента, который запускается при начале сессии (§s-477gtdrkw34dzxw), в Claude Code или в Codex CLI,»
- **WORDING FIX, the object of `review.runner`.**
  - EN: "the one that `review.runner` in `sheriff.config.json` names"
  - RU: «которого называет `review.runner` в `sheriff.config.json`»
- **WORDING FIX, the title.** Then "The hooks" says "asks for the settings of each runner".
  - EN: "The settings of each runner at the start of a session"
  - RU: «Настройки каждого runner при начале сессии»
- **WORDING FIX, paragraph 3.** This also removes the negation "asks nothing", which could be read as "asks about no runner at all".
  - EN: "The hook makes this request once for each runner on each machine. After making it, the hook records `true` in the user's git configuration as `specsheriff.review.claudeAsked` or `specsheriff.review.codexAsked`. While that record holds `true`, the hook passes over that runner."
  - RU: «Хук обращается с этой просьбой один раз для каждого runner на каждой машине. Обратившись с ней, хук записывает `true` в настройки git пользователя как `specsheriff.review.claudeAsked` или `specsheriff.review.codexAsked`. Пока там записано `true`, хук этот runner пропускает.»
- **WORDING FIX, the example.** Codex runs the session start only in a project that `sheriff init --agent codex` has set up.
  - EN: "opens a repository that `sheriff init --agent codex` has set up"
  - RU: «открывает репозиторий, который настроил `sheriff init --agent codex`»

---

## 3. `new:tools-6-after-edit` — The agent's hook after an edit — **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✗ In "as they were when the checks began", it is unclear whether that moment is before `sheriff reindex` or before `sheriff validate`. The code notes the state after the regeneration (`changed.mjs snapshot`).
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✗ "under the same condition": the item before it holds two conditions, one of which is the Views extension.
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✗ "SpecTags" is used without citing s-8xw4mgvpexyvw5q, and the node has no link to it.
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
- Pairing test ✓

**Оценка**
- согласованность: ✗ «as the settings in `sheriff.config.json` set them» противоречит согласованному «Project-wide settings»: файлы типов и файл привязок задают не эти настройки. Запуск reindex после правки кода расходится с решением 2026-11-05, но это решают согласованные s-ztseyetus7np6br и s-t383grkn3q68dpf, и поле change это показывает. С 10.2, 10.14, s-e3495enbc5h75c3 и s-rpv4fkdqqguptqd — ✓.
- целостность: ✗ s-st6td4mua9uqt9z оставляет этому хуку файл, который не является корректным JSON, а хук не передаёт агенту отказ `sheriff reindex`. s-npnmwyt6s3gypwe сообщает о сбое markdown и map, а здесь об этом ничего нет. В stage3 файлы собственных проверок и генераторов названы файлами, где ищут SpecTag, вопреки «Project-wide settings».
- целесообразность: ✓ ошибка находится при той правке, которая её вносит; сессия, которая только читает репозиторий, не задерживается.
- избыточность: ✗ «which read the working tree, with its difference from the last commit as the commit being made» повторяет черновик s-477gtdrkw34dzxw.
- недостаточность: ✗ не сказано, какие файлы отличаются, если ничего не отмечено; что хук отмечает после отказа reindex; передаётся ли агенту сбой markdown или map.

**Findings** (all can be fixed by the author)
- **WORDING FIX, the `sheriff reindex` item.** Add a `cites` link to s-8xw4mgvpexyvw5q, and drop the link to s-zefk589ykh37b8u.
  - EN: "`sheriff reindex` (§s-ztseyetus7np6br), where the files that differ include a file under `specs/`, `sheriff.config.json`, or a file that the SpecSheriff tools read to find SpecTags (§s-8xw4mgvpexyvw5q);"
  - RU: «`sheriff reindex` (§s-ztseyetus7np6br), если среди отличающихся файлов есть файл внутри `specs/`, `sheriff.config.json` или файл, который инструменты SpecSheriff читают, чтобы найти SpecTag (§s-8xw4mgvpexyvw5q);»
- **WORDING FIX, when nothing is noted.** Insert after the first list:
  - EN: "Where nothing is noted, the hook takes every file as one that differs."
  - RU: «Если ничего не отмечено, хук считает отличающимся каждый файл.»
- **WORDING FIX, the `sheriff types` item.**
  - EN: "`sheriff types` (§s-a8fn72xa782wvbk), where the files that differ include a file under `specs/`, `sheriff.config.json` or the code of a project's own generator (§s-km4x4s26kv7pjze), or where `sheriff reindex` has written a file;"
  - RU: «`sheriff types` (§s-a8fn72xa782wvbk), если среди отличающихся файлов есть файл внутри `specs/`, `sheriff.config.json` или код собственного генератора проекта (§s-km4x4s26kv7pjze) либо `sheriff reindex` записал какой-либо файл;»
- **WORDING FIX, when `sheriff reindex` refuses.** This matches `after-edit.sh`.
  - EN: "Where `sheriff reindex` refuses, the hook stops after it and notes the last commit and the working tree as they are then."
  - RU: «Если `sheriff reindex` отказывает, хук на нём останавливается и отмечает последний коммит и рабочее дерево такими, какие они в этот момент.»
- **WORDING FIX, what the hook hands the agent.**
  - EN: "The hook hands the agent what `sheriff reindex`, `sheriff types` and the checks refuse, and names each node that `sheriff reindex` makes a draft."
  - RU: «Хук передаёт агенту то, что отвергают `sheriff reindex`, `sheriff types` и проверки, и называет каждый узел, который `sheriff reindex` делает черновиком.»
- **WORDING FIX, a failure of the views.** Add this sentence, as the pre-commit hook reports such a failure.
  - EN: "A failure of `sheriff markdown` or `sheriff map` is handed to the agent and stops nothing."
  - RU: «Сбой `sheriff markdown` или `sheriff map` передаётся агенту и ничего не останавливает.»
- **WORDING FIX, the moment that is noted.**
  - EN: "…as they were when `sheriff validate` began."
  - RU: «…такими, какими они были, когда начал работу `sheriff validate`.»
- **CUT.** Drop ", which read the working tree, with its difference from the last commit as the commit being made" (RU «, которые читают рабочее дерево, принимая его отличие от последнего коммита за создаваемый коммит»). Write "the agent's hook (§s-477gtdrkw34dzxw)" in the first sentence instead, as the sibling node does, and add the link.
- **WORDING FIX, the example.** Without a test, the guard refuses the edit the example describes.
  - EN: "An agent that has written the test of rule R adds the SpecTag of R to a function…"
  - RU: «Агент, который уже написал тест правила R, добавляет SpecTag правила R к функции…»
- **The `stage3` note.** It should drop the files of a project's own checks and generators from the files read for SpecTags.

---

## 4. `s-st6td4mua9uqt9z` — An edit judged before it is made — **not ready**

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
- 7.4.2 The reason ✗ "what other files already hold": the text also leaves out the nodes of the edited file that the edit does not touch.
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✗ "that the edit would leave other than valid JSON" is unnatural English.
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test ✓

**Оценка**
- согласованность: ✗ первый пункт сужает дословный текст согласованного правила 10.3 («leave a node approved»; вопрос 4). С s-8wp7xm7g3u8gscq, s-d3nkw9b6mn98vuw, s-chsfpkgpmfk4fft, s-2x58az67bm6cxq2, s-v4qus7raqnwzneb и s-n76wt2bkqdmh78x — ✓.
- целостность: ✗ тест «names sheriff reindex where only a test carrying a bare sid…» остаётся привязанным к узлу, а текст этого не требует. Файл, который не является корректным JSON, передаётся в s-hcmpjmwtgfwzncu; нужна правка 3.
- целесообразность: ✓ запрещённая правка отвергается до записи.
- избыточность: ✓ не найдена; абзац о недостающем расширении ссылается на s-mhsb6fjsq5xn6c9, но передаёт отказ не полностью.
- недостаточность: ✗ отказ при правке кода, когда тест называет правило голым sid, не описан. Не указана версия инструментов в отказе при недостающем расширении.

**Findings**
- **DOUBT (only the owner can answer).** Base question 4 applies to this draft. Read literally, rule 10.3 also refuses an edit that leaves untouched an approved node with a stale wording. Recommendation: accept the author's reading and change 10.3 as question 4 proposes. Either way the agent learns the same thing, since `sheriff reindex` makes such a node a draft after the edit and names it (inference). Only the owner can confirm this, because it narrows what an agreed rule states.
- **WORDING FIX, the bare sid.** Add this sentence to the paragraph on what the refusal names, with a `cites` link to s-gb8s9657a65hqmv. Alternatively, drop that behaviour and its test in stage 3.
  - EN: "Where a test names such a rule only by a bare sid (§s-gb8s9657a65hqmv), the refusal also names `sheriff reindex`, which writes the test's SpecTag."
  - RU: «Если тест называет такое правило только голым sid (§s-gb8s9657a65hqmv), отказ называет ещё и `sheriff reindex`, который записывает SpecTag теста.»
- **WORDING FIX, the refusal for a missing extension.** s-mhsb6fjsq5xn6c9 requires the version as well.
  - EN: "…names each missing extension and the version of the SpecSheriff tools in the plugin (§s-mhsb6fjsq5xn6c9)."
  - RU: «…называет каждое недостающее расширение и версию инструментов SpecSheriff в плагине (§s-mhsb6fjsq5xn6c9).»
- **WORDING FIX, reason sentence 2.**
  - EN: "It judges only what the edit adds or changes, so that what the edit leaves as it was never holds up the edit."
  - RU: «Он оценивает только то, что правка добавляет или меняет, чтобы правку никогда не задерживало то, что она оставляет как было.»
- **WORDING FIX, English only.** Replace "would leave other than valid JSON" with "would leave as invalid JSON".
- **TERM.** Every term in the four drafts was already defined before them: hook, session start, runner, guard, staging. Hook and session start mean what git, Claude Code and Codex call them (`hooks.json` uses SessionStart, PreToolUse and PostToolUse), so they fit. "Runner" was settled in s-xr5xxa9cxf2mq5u, agreed on 2026-11-24. In CI tools such as GitHub Actions and GitLab, a runner is a machine that runs CI jobs, so it may mislead readers of group 1 (unverified: not in the skill's registry). A gloss in the docs would settle it at no cost to the specification.

---

**Only the owner can answer:**
1. Base question 4: whether the guard's first item judges only the nodes that an edit adds or changes. Recommendation: yes, with rule 10.3 changed as question 4 proposes.

Files:
- `D:/SpecSheriff/.ai_docs/t25-pass/review-input-g8-b.md`
- `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`
- `D:/SpecSheriff/.ai_docs/t25-pass/group8-notes.md`
- `D:/SpecSheriff/skills/claude-code/hooks/session-start.sh`
- `D:/SpecSheriff/skills/claude-code/hooks/after-edit.sh`
- `D:/SpecSheriff/skills/claude-code/hooks/changed.mjs`
- `D:/SpecSheriff/skills/tools/src/guard.ts`

## The main session's decisions

`new:tools-6-hooks-on`:
- The reason: applied, with "the hook run when a session starts" in place of "the session start", as the readers asked.
- `core.hooksPath` in the repository's git configuration: applied.
- "It leaves the mode of each file and git's index as they are": applied.
- The removal of "which run by the interpreter that their first line names": applied. The node on the project's own tools states it.

`new:tools-6-reviewer-settings`:
- Whose hook asks: applied. It replaces the thorough reader's "the agent's hook of each SpecSheriff plugin".
- The object of `review.runner`: applied.
- The title: applied. The drafting agent chooses a title that covers both paragraphs, such as "The settings of each runner when a session starts". The item of "The hooks" on this hook then names the settings in the same words.
- Paragraph 3: applied, merged with the fast reader's change: the hook sets the key to `true`, and while that key is `true`, the hook does not ask about that runner's settings.
- The example: applied.

`new:tools-6-after-edit`:
- The `sheriff reindex` item: applied. It replaces the thorough reader's wording of the same item.
- When nothing is recorded: applied, as "Where nothing is recorded, the hook treats every file as one that differs."
- The `sheriff types` item: applied.
- When `sheriff reindex` refuses: applied. The sentence names what `sheriff reindex` refuses, as its agreed node names it.
- What the hook hands the agent: applied, as "the refusals of `sheriff reindex`, of `sheriff types` and of the checks".
- A failure of the views: applied, worded as in the pre-commit hook.
- The moment that is recorded: applied.
- The removal of ", which read the working tree, with its difference from the last commit as the commit being made": applied. The fast reader's change to that clause no longer applies.
- The example: applied.
- The `stage3` note: applied.

`s-st6td4mua9uqt9z`:
- Base question 4 asks whether the first item judges only the nodes that an edit adds or changes. It is put to the owner on the page of group 8, as question 2, in the same way as question 1. The draft keeps the reading of option A. The question states what a person sees under each option. Under option A, an edit passes, and `sheriff reindex` makes the untouched node a draft after the edit and names it. Under option B, the edit is refused until the agent sets that node to draft.
- The bare sid: applied.
- The version in the refusal for a missing extension: applied.
- Reason sentence 2: applied.
- "would leave other than valid JSON": applied as the fast reader's decision says: "that would not be valid JSON after the edit".
- The term "runner": not applied. The node of group 1 settled it, and the reviewer finds that the term fits.
