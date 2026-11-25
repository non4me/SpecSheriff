# The follow-up review of group 8, part b: the report of specsheriff-rule-reviewer

The Skill tool could not load `specsheriff-terminology-review` ("Unknown skill"), so I read its SKILL.md from `C:/Users/PC/.claude/skills/synced/a08d2aec-…/specsheriff-terminology-review/`.

**None of the four drafts is ready.** The author can fix every finding. Nothing new needs the owner, apart from question 2, which is already on the page. Round b applied every finding of the first review, except where noted in R1 and G4.

---

## 1. `new:tools-6-hooks-on`: Turning the git hooks on when a session starts. **Not ready**

**Checklist**
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
- 7.2.7 ✓
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
- Pairing test ✓: sentences 1 and 2 ground the node as a whole, and sentence 3 grounds one choice made in paragraph 3.

**Оценка**
- согласованность: ✓ сверено с 10.2 (s-epaw9sgyaajzn8g), s-7unxytshhc4md54, s-n4m5zvh96yb299p, s-477gtdrkw34dzxw, s-zh2vcr3xjumppg5, s-n76wt2bkqdmh78x и с решениями от 2026-10-30 и 2026-11-02.
- целостность: ✗ текст требует называть и файл хука, которого нет в индексе git. Код называет только хуки из индекса, а совет `git update-index` для других файлов не работает, хотя в `stage3` сказано, что код не меняется (H1). Решение от 2026-10-30 сюда не переносится (H2).
- целесообразность: ✓ проблема названа: без git-хуков ни одна проверка при коммите не выполняется.
- избыточность: ✓ не найдена. s-7unxytshhc4md54 включает хуки при `sheriff init`, а этот узел делает это при каждой сессии.
- недостаточность: ✓ не найдена.

**Findings**
- **H1 WORDING FIX.** `session-start.sh` names only the hooks that git's index holds, and `git update-index --chmod=+x` fails for any other file. Change the lead of paragraph 2, and its `change` field to match:
  - EN: "The hook also names each git hook in `.githooks/` that git's index holds, in either of the following cases:"
  - RU: «Хук также называет каждый git-хук в `.githooks/`, который есть в индексе git, в любом из следующих случаев:»
- **H2.** The owner's decision of 2026-10-30, on the security review of turning the hooks on, bears on this node. The `stage3` of s-477gtdrkw34dzxw should copy it here as well (principle "A rule is self-sufficient").
- **Nit (the Russian word order).** Reason, sentence 3: «Хук, который запускается при начале сессии, оставляет запись режима git-хука автору следующего коммита, потому что содержимое коммита выбирает его автор.»

---

## 2. `new:tools-6-reviewer-settings`: The settings of each runner when a session starts. **Not ready**

**Checklist**
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
- 7.2.7 ✓
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
- Pairing test ✓: the reason's sentences match the text's paragraphs in reverse order.

**Оценка**
- согласованность: ✓ сверено с s-tnz9zgqx8c629a7, s-xr5xxa9cxf2mq5u, s-4mej6ccn7xu3d3p, s-zh2vcr3xjumppg5, s-n76wt2bkqdmh78x, new:tools-15-spec-init и с решением от 2026-11-02.
- целостность: ✓ «The hooks» называет эти настройки так же. spec-init опирается на ключ `…Asked`. Перенацеливание ссылки из s-tnz9zgqx8c629a7 записано в заметках.
- целесообразность: ✓ прогон рецензента оплачивает тот, кто делает коммит.
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

**Findings**
- **R1 WORDING FIX.** "While that key is `true`, the hook does not ask about that runner's settings" states what does not happen. That breaks the owner's rule "A rule says what holds" (`.claude/vt/rules.md`), which the settlement of round b does not address. The first review's fix had removed this negation, and the merge with the fast reader's wording brought it back. Replace the sentence with:
  - EN: "It makes the request about a runner only until that runner's key is `true`."
  - RU: «С просьбой о настройках runner хук обращается, только пока ключ этого runner не равен `true`.»
- **Nit.** Use the agreed name from s-xr5xxa9cxf2mq5u:
  - EN: "or otherwise the runner of the SpecSheriff plugin whose tools the git hooks would take there"
  - RU: «а иначе — runner того плагина SpecSheriff, инструменты которого взяли бы там git-хуки»
- **Nit.** The reason still says "the reviewer's settings", the phrase the first review removed from the title. Replace it:
  - EN: "the settings of each runner"
  - RU: «настройки каждого runner»

---

## 3. `new:tools-6-after-edit`: The agent's hook after an edit. **Not ready**

**Checklist**
- 1.2.3 ✓
- 7.1 ✗ "what the hook recorded … when the checks last ran": after `sheriff reindex` refuses, the hook records the state although no check has run.
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
- 7.2.7 ✓
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
- Pairing test ✓

**Оценка**
- согласованность: ✓ сверено с 10.2, 10.14, s-ztseyetus7np6br, s-t383grkn3q68dpf, s-e3495enbc5h75c3, s-rpv4fkdqqguptqd, s-a8fn72xa782wvbk, s-npnmwyt6s3gypwe, s-n76wt2bkqdmh78x, s-st6td4mua9uqt9z. Отступления от решений 2026-11-05 и 2026-11-06 объяснены в полях change.
- целостность: ✗ решения от 2026-11-05 и 2026-11-06, которые `stage3` переносит сюда, цитируют s-4kd2pave7vm4hmd и s-9kfdycuq34beqvs, а связей с этими узлами у узла нет (A4).
- целесообразность: ✓ ошибка находится при той правке, которая её вносит.
- избыточность: ✓ не найдена.
- недостаточность: ✗ неясно, с какой записью сравнивать после отказа `sheriff reindex` (A1).

**Findings**
- **A1 WORDING FIX.** First list item:
  - EN: "the last commit or the working tree, other than the files that git ignores, differs from what the hook last recorded in the clone's git directory;"
  - RU: «последний коммит или рабочее дерево, кроме файлов, которые git игнорирует, отличается от того, что хук в последний раз записал в каталоге git клона;»
- **A2 WORDING FIX.** In "Where it runs them", the pronouns point two paragraphs back, and "them" can be read as "every file". The base rule "Writing" keeps such a word within its paragraph. Replace with:
  - EN: "Where the hook runs the SpecSheriff tools, it runs the following, in this order:"
  - RU: «Если хук запускает инструменты SpecSheriff, он выполняет следующее в таком порядке:»
- **A3 WORDING FIX.** "does not stop the hook" breaks the same rule as R1. Replace the sentence with:
  - EN: "A failure of `sheriff markdown` or `sheriff map` to write its files is handed to the agent, and the hook goes on to the next step."
  - RU: «Если `sheriff markdown` или `sheriff map` не может записать свои файлы, это передаётся агенту, и хук переходит к следующему шагу.»
  - The pre-commit hook, which is in another reviewer's input, uses the same negative form.
- **A4.** Add `cites` links to s-4kd2pave7vm4hmd and s-9kfdycuq34beqvs as `keptForDecisions`, as `s-npnmwyt6s3gypwe` does. Otherwise `sheriff citations` refuses the node once stage 3 copies the decisions. The `stage3` of s-477gtdrkw34dzxw should also name which 2026-11-05 decisions it copies here.
- **Nit.** The `location` field still says "after “The reviewer's settings asked for when a session starts”".

---

## 4. `s-st6td4mua9uqt9z`: An edit judged before it is made. **Not ready**

**Checklist**
- 1.2.3 ✓
- 7.1 ✓
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✗ "the lists of `sheriff.config.json`" (and "one of those lists"): `code` and `tests` are lists of that file too.
- 7.2.4 ✓
- 7.2.4.1 ✓
- 7.2.4.2 ✓
- 7.2.4.3 ✓
- 7.2.4.4 ✓
- 7.2.4.5 ✓
- 7.2.5 ✓
- 7.2.6 ✓
- 7.2.7 ✓
- 7.3.1 ✓
- 7.3.2 ✓
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✗ "what the edit leaves as it was never holds up the edit": a missing chosen extension makes the guard refuse every edit.
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✓
- Pairing test ✓

**Оценка**
- согласованность: ✗ первый пункт сужает согласованное правило 10.3. Это вопрос 2 на странице. С s-mhsb6fjsq5xn6c9, s-d3nkw9b6mn98vuw, s-chsfpkgpmfk4fft, s-2x58az67bm6cxq2, s-gb8s9657a65hqmv, s-n76wt2bkqdmh78x всё согласовано.
- целостность: ✓ файл, который после правки не будет корректным JSON, проверяет s-hcmpjmwtgfwzncu и передаёт агенту отказ. Неприменимый патч отвергает s-n76wt2bkqdmh78x. Оба привязанных теста покрыты текстом.
- целесообразность: ✓ запрещённая правка отвергается до записи.
- избыточность: ✓ не найдена.
- недостаточность: ✗ не сказано, какие списки `sheriff.config.json` имеются в виду (G1).

**Findings**
- **G1 WORDING FIX.** Name the lists.
  - Paragraph 3, EN: "For an edit to an entry of `approvalStatus`, `strict` or `extensions`, it names that list and `sheriff settings` (§s-chsfpkgpmfk4fft)."
  - Paragraph 3, RU: «Для правки записи в `approvalStatus`, `strict` или `extensions` он называет этот список и `sheriff settings` (§s-chsfpkgpmfk4fft).»
  - Paragraph 8, EN: "`sheriff guard` reads the lists `approvalStatus`, `strict` and `extensions` from `sheriff.config.json` as it is and as the edit would leave it."
  - Paragraph 8, RU: «Списки `approvalStatus`, `strict` и `extensions` `sheriff guard` читает из `sheriff.config.json` в нынешнем виде и в том виде, в каком его оставит правка.»
- **G2 WORDING FIX.** Reason, sentence 2:
  - EN: "It judges only the nodes and the code that the edit adds or changes, so that a node or code that the edit leaves as it was never holds up the edit."
  - RU: «Он оценивает только те узлы и тот код, которые правка добавляет или меняет, чтобы правку никогда не задерживали узел или код, которые она оставляет как были.»
- **G3 WORDING FIX.** "these edits" in the last paragraph points back eight paragraphs. Move the condition into the lead and delete the last sentence:
  - EN: "`sheriff guard` refuses each of the following edits by an agent (§s-83ev4wwesbwnhnp), regardless of whether the specification is approved or a draft:"
  - RU: «`sheriff guard` отвергает каждую из следующих правок агента (§s-83ev4wwesbwnhnp) независимо от того, одобрена спецификация или является черновиком:»
  - s-mhsb6fjsq5xn6c9 already covers a missing extension.
- **G4: the `change` fields.**
  - The first item's change says «Без изменений по смыслу», which question 2 contradicts. Replace that phrase with: «Сужено: оцениваются только узлы, которые правка добавляет или у которых меняет формулировку либо статус одобрения, как делает guard.ts; об этом вопрос 2 на этой странице.»
  - The change of the paragraph on the tools leaves out finding A6. Add: «Добавлено, что неприменимую правку `Edit` или `MultiEdit` `sheriff guard` оставляет отказу инструмента, как делает guard.ts.»
- **Nit.** `sheriff guard` itself finds nothing in a commit. Replace "as it finds" with:
  - EN: "in the same way as the SpecSheriff tools find what a commit adds or changes"
  - RU: «так же, как инструменты SpecSheriff находят то, что добавляет или меняет коммит»
- **Nit: question 2 in the notes.** The recommendation and its basis come first, as they should. Option A lacks a line on risk; add "Risk: none found". The cost given for option B ("slows each edit") was never measured: mark it as a hypothesis or time it.

**TERM:** no new term. "Runner" was settled in group 1. The names of the hooks match what Claude Code and Codex call them (SessionStart, PreToolUse, PostToolUse). "git's index" means what git means by it.

---

**Only the owner can answer:** nothing new. Question 2 stays on the page, and the guard's first list item and reason sentence 2 depend on the owner's answer.

Files:
- `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`
- `D:/SpecSheriff/.ai_docs/t25-pass/group8-notes.md`
- `D:/SpecSheriff/skills/claude-code/hooks/session-start.sh`
- `D:/SpecSheriff/skills/claude-code/hooks/after-edit.sh`
- `D:/SpecSheriff/skills/claude-code/hooks/changed.mjs`
- `D:/SpecSheriff/skills/tools/src/guard.ts`

## The main session's decisions

They are in fix-brief-group8-c.md, which holds the decisions on all six reports of the follow-up review.
