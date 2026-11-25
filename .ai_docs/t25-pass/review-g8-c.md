# The first review of group 8, part c: the report of specsheriff-rule-reviewer

# Group 8, input c: review report

The skill `specsheriff-terminology-review` would not load through the Skill tool, so I read its SKILL.md from `C:/Users/PC/.claude/skills/synced/…/specsheriff-terminology-review/`.

Overall: three drafts are not ready, but the author can fix every finding without the owner. Row 10.1.37b is ready.

---

## A. `s-n76wt2bkqdmh78x` "The agent's hooks for Codex CLI": not ready

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✗ — "Codex blocks a tool's call only on an answer that a hook writes as JSON to its standard output." This sentence gives a reason inside the text.
- 7.1 The goal, the reader and the scope ✗ — "The scripts do what the agent's hooks do (§s-477gtdrkw34dzxw)". Without the sid the sentence is circular.
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
- 7.2.7 Words that take their meaning from the specification ✗ — "before an edit that `sheriff guard` refuses" is the first use of `sheriff guard` and has no citation. "the plugin for Codex CLI" cites the git-hook node, not s-2pdy9gw2jrjvfb4.
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✗ — the reason's "Codex takes hooks only from the project, where its user trusts each hook…, so…" states two relations.
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✗ — "Codex takes hooks only from the project" is not true (see A2).
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✗ — "which Codex does not treat as a refusal" contradicts Codex's current documentation.
- Pairing test ✓

**Оценка**
- согласованность: ✗ Текст, обоснование и пример расходятся с текущей документацией Codex. Код 2 тоже блокирует вызов. Хуки берутся из системного и пользовательского `hooks.json` и из плагинов. Кроме того, s-st6td4mua9uqt9z оставляет неприменимую правку инструменту, а этот узел неприменимый патч отвергает. Сверено с s-83ev4wwesbwnhnp, s-epaw9sgyaajzn8g, s-477gtdrkw34dzxw, s-hcmpjmwtgfwzncu, s-xr5xxa9cxf2mq5u, s-2pdy9gw2jrjvfb4, s-7unxytshhc4md54.
- целостность: ✗ Нужно изменить s-st6td4mua9uqt9z (см. A6). Привязанный тест «reads the paths of a patch from the directory the session works in» требует того, чего текст не говорит.
- целесообразность: ✓ Задача названа: агент в Codex проходит те же проверки, что и агент в Claude Code. Хуки проекта, которые только находят и вызывают скрипты, — самый простой путь.
- избыточность: ✓ Сверено с s-st6td4mua9uqt9z, s-hcmpjmwtgfwzncu, s-2pdy9gw2jrjvfb4.
- недостаточность: ✗ Не сказано, от какого каталога отсчитываются пути патча.

**Findings (all for the author)**
- **A1 WORDING FIX.** Codex's documentation now says that exit code 2 also blocks a call. After a call, `block` does not block anything: Codex replaces the tool's result with the reason. The owner's ruling still stands in what it requires: the scripts answer in JSON.
  - Replace "Codex blocks … standard output. So the scripts answer Codex as follows, and exit with code 0:" with "The scripts answer Codex with JSON written to their standard output, and exit with code 0:" / «Скрипты отвечают Codex в виде JSON, который пишут в свой стандартный вывод, и завершаются с кодом 0:».
  - In the example, the mistake becomes: "The most likely mistake is to write the refusal to standard output as plain text, which Codex ignores before a tool's call, so that the patch is applied." / «Самая вероятная ошибка — написать отказ в стандартный вывод обычным текстом, который Codex перед вызовом инструмента игнорирует, и тогда патч применяется.»
- **A2 WORDING FIX** (reason). Codex also loads hooks from system files, user files and plugins. A new reason:
  - EN: "The agent's hooks for Codex hold an agent working in Codex to the same checks, before and after each edit, as an agent in Claude Code. Codex runs a project's hook only once its user has trusted the hook as it is written. So a hook that only finds the plugin and calls its scripts needs no new trust when a release of the plugin changes what the scripts do."
  - RU: «Хуки агента для Codex подчиняют агента, работающего в Codex, тем же проверкам до и после каждой правки, что и агента в Claude Code. Codex выполняет хук проекта только после того, как пользователь доверился этому хуку в том виде, в каком он записан. Поэтому хуку, который лишь находит плагин и вызывает его скрипты, не нужно нового доверия, когда выпуск плагина меняет то, что делают скрипты.»
  - The last sentence is an inference: Codex records trust against the hash of the hook itself.
- **A3 WORDING FIX.** "Each script runs what the list of the hooks gives for its hook (§s-477gtdrkw34dzxw)." / «Каждый скрипт выполняет то, что перечень хуков указывает для его хука (§s-477gtdrkw34dzxw).»
- **A4 WORDING FIX.** Write "`sheriff guard` (§s-st6td4mua9uqt9z)" at its first use. Write "the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4)" and add a `cites` link to that node.
- **A5 DOUBT, fixable by the author.** The tests and `guard.ts` already resolve the patch's paths against the session's directory (`cwd`); the text should say so. New first item:
  - EN: "it reads each file that the patch adds, updates, deletes or moves, at the path that the patch gives, relative to the directory in which the session works;"
  - RU: «читает каждый файл, который патч добавляет, обновляет, удаляет или перемещает, по пути, который указан в патче, относительно каталога, в котором работает сессия;»
- **A6 (change to s-st6td4mua9uqt9z).**
  - EN: "Where an edit made with `Edit` or `MultiEdit` would not apply, as where it names text that the file does not hold, `sheriff guard` lets the tool refuse it."
  - RU: «Если правку, сделанную `Edit` или `MultiEdit`, нельзя применить, например когда она называет текст, которого в файле нет, `sheriff guard` оставляет отказ инструменту.»
- **TERM:** none.

---

## B. `s-4mej6ccn7xu3d3p` "A git hook runs the SpecSheriff tools that a plugin keeps on the machine": not ready

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✗ — "runs what the hook is to run (§s-477gtdrkw34dzxw)" is circular without the sid. In "the version that they name", "they" could be the hooks or the SpecSheriff tools.
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
- 7.2.7 Words that take their meaning from the specification ✗ — "Each git hook that `sheriff init` writes" is the first use, and the citation comes only in the last paragraph.
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
- согласованность: ✓ Сверено с s-pcnyfp7gev7syax (решение 2026-11-14, группа 4), s-bsya3febm6u64ab, s-7unxytshhc4md54, s-n4m5zvh96yb299p, s-zefk589ykh37b8u, s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4.
- целостность: ✗ Текст поручает запуск собственных инструментов проекта при отсутствии Node.js самому git-хуку, а `stage3` поручает его `sheriff.sh`. Тест о равных версиях требует инструментов плагина для Claude Code, а текст говорит «любые».
- целесообразность: ✓
- избыточность: ✓ Сверено с s-jgcveum8dwdnyzr, s-7unxytshhc4md54.
- недостаточность: ✗ Не сказано, где названа нужная версия Node.js.

**Findings (all for the author)**
- **B1.** The text and `stage3` disagree about which component falls back. The simplest fix keeps the text, because the git hook already holds the fallback. Then `stage3` should say that `assets/githook` checks Node.js against `engines.node` in the tools' `package.json` before it calls the script. Replace the cannot-run paragraph:
  - EN: "The SpecSheriff tools cannot run where the hook finds the tools of neither plugin, or where Node.js is missing or older than the version that the `engines` field of their `package.json` names. In either case, the hook runs the project's own tools for that hook, and lets the commit or the push through unless one of them fails (§s-pcnyfp7gev7syax). The pre-commit and pre-push hooks then say that no check of SpecSheriff ran, and why: no plugin's SpecSheriff tools are on the machine, or Node.js is missing or older than that version, which the hooks name."
  - RU: «Инструменты SpecSheriff не могут выполняться, если хук не находит инструментов ни одного плагина или если Node.js нет либо он старее версии, которую называет поле `engines` их `package.json`. В любом из этих случаев хук запускает собственные инструменты проекта для этого хука и пропускает коммит или push, если ни один из них не завершился неудачей (§s-pcnyfp7gev7syax). Тогда хуки pre-commit и pre-push сообщают, что ни одна проверка SpecSheriff не выполнялась, и почему: на машине нет инструментов SpecSheriff ни одного плагина или Node.js нет либо он старее этой версии, которую хуки называют.»
- **B2 WORDING FIX.** "The script for the hook runs what the list of the hooks gives for that hook (§s-477gtdrkw34dzxw), including the project's own tools for that hook." / «Скрипт хука выполняет то, что для этого хука указывает перечень хуков (§s-477gtdrkw34dzxw), в том числе собственные инструменты проекта для этого хука.»
- **B3 WORDING FIX.** Write "Each git hook that `sheriff init` writes (§s-7unxytshhc4md54)" at the first use.
- **B4.** `stage3` should rename the test "…those of the plugin for Claude Code where the two are equal…", because the text, as approved, says "either".
- **On the Node.js point:** the author's reading holds. Rule 10.12, as agreed, and its decision of 2026-11-14 speak of every case in which the SpecSheriff tools cannot run, and the base specification prevails over the appendix.

---

## C. `s-n4m5zvh96yb299p` "The project's own tools in a git hook": not ready

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✗ — "names each other file there" reads as the reciprocal "each other". "one of the other tools" and "These files" point back to other paragraphs. In the reason, "so that those tools run" could mean either set of tools.
- 7.2.1 Who must act ✗ — "Each of the project's own tools does the following: … it is handed": the hook, which hands the arguments, is hidden.
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
- 7.2.7 Words that take their meaning from the specification ✗ — `sheriff init` has neither a citation nor a link.
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✗ — see the pairing test.
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✗ — "where `scan` changes any file": the text excepts the files that git ignores.
- Pairing test ✗ — the reason's first sentence explains the folder and its second the first line, in the text's order. It says nothing about the order of the tools or the refusal of changes.

**Оценка**
- согласованность: ✓ Сверено с s-pcnyfp7gev7syax, решением 2026-11-21 по s-t9j29hppag2nren, s-npnmwyt6s3gypwe, s-477gtdrkw34dzxw, s-hheus6f395ynqvc, строкой 10.1.37a (s-vj67ztqkuhxbv7s).
- целостность: ✓ Узел реализует строку 10.1.37b. s-7unxytshhc4md54 и s-4mej6ccn7xu3d3p, которые ссылаются на него, остаются верны.
- целесообразность: ✓
- избыточность: ✓ Сверено с s-npnmwyt6s3gypwe, s-7pk89t8z6wymmj9.
- недостаточность: ✗ По фразе «each path in that list for which it runs nothing» каждый хук называл бы и пути чужих хуков.

**Findings (all for the author)**
- **C1.** "The hook names each path in that list that points into its own folder, `.githooks/<hook>.d/`, and for which it runs nothing." / «Хук называет каждый путь из этого перечня, который ведёт в его собственную папку `.githooks/<hook>.d/` и для которого он ничего не запускает.»
- **C2.** "and names each of the other files there" / «и называет каждый из остальных файлов в этой папке».
- **C3.** Rewrite the list of how a tool runs. This also fixes the Russian «поэтому», which renders "so that" as a result rather than a purpose.
  - EN: "The hook runs each of the project's own tools as follows: – from the root of the working tree, by the interpreter that the tool's first line names, in git's own environment, so that the tool reads the working tree and git's index; – with the arguments that git hands the hook, and with a copy of the standard input that git hands the hook." The next sentence becomes "Each of the project's own tools runs regardless of what the others find."
  - RU: «Хук запускает каждый собственный инструмент проекта так: – из корня рабочего дерева, интерпретатором, который назван в первой строке инструмента, в собственном окружении git, чтобы инструмент читал рабочее дерево и индекс git; – с аргументами, которые git передаёт хуку, и с копией стандартного ввода, который git передаёт хуку.» The next sentence becomes «Каждый собственный инструмент проекта выполняется независимо от того, что нашли остальные.»
- **C4.** Two phrases that point back:
  - "one of the project's own tools that runs after the tools that rewrite files" / «один из собственных инструментов проекта, который выполняется после инструментов, переписывающих файлы,».
  - "A project's own tools for a git hook are among the repository's own tools (§s-hheus6f395ynqvc)." / «Собственные инструменты проекта для git-хука относятся к собственным инструментам репозитория (§s-hheus6f395ynqvc).»
- **C5.** Write "`sheriff init` writes (§s-7unxytshhc4md54)" and add a `cites` link to that node.
- **C6.** A new reason:
  - EN: "A project's own tools guard what the checks of SpecSheriff do not, such as a scan for secrets, so they run on every machine, whatever the SpecSheriff tools can do there. They run in the order in which tools and checks run (§s-pcnyfp7gev7syax), so that none of them changes what a check has read."
  - RU: «Собственные инструменты проекта охраняют то, чего не охраняют проверки SpecSheriff, например ищут секреты, поэтому они выполняются на каждой машине, что бы там ни могли инструменты SpecSheriff. Они выполняются в том порядке, в котором выполняются инструменты и проверки (§s-pcnyfp7gev7syax), чтобы ни один из них не менял того, что уже прочитала проверка.»
  - The author decides whether the argument about the first line stays, as a third sentence.
- **C7.** In the example: "changes any file that git does not ignore" / «меняет какой-либо файл, который git не игнорирует».
- **On the point that tools that rewrite files may stage their output:** the reading holds. Rule 10.12 fixes the commit only after the first step, and the ruling of 2026-10-31 binds the hook, not a tool that an approved list names.

---

## D. `proposal:row-10-1-37b`: ready

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓ — the row has no reason of its own, as rows 10.1.2 and 10.1.37a; the reason of rule 10.12 says why.
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
- 7.5.2 The length of a sentence ✓ — 44 words, but one thought, and each clause carries a condition.
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test ✓ — not applicable, since the row has no reason.

**Оценка**
- согласованность: ✓ Сверено со вторым шагом правила 10.12 и с «After the first step, nothing changes what the commit contains» (s-pcnyfp7gev7syax), со строкой 10.1.37a, с s-2fau85dfyyeq66m.
- целостность: ✓ Узел, который нужно поправить, назван: правило 10.2 (s-epaw9sgyaajzn8g) при push называет только тесты, а правило 10.12 и эта строка проверяют инструменты проекта и при push.
- целесообразность: ✓ Таблица заявляет полный перечень проверок, и согласованное поле изменений строки 10.1.37a обещало эту строку.
- избыточность: ✓ Строка 10.1.37a покрывает только проверки проекта, а эта строка их исключает.
- недостаточность: ✓

**On the point about this row:** it carries out decisions already made, not a new change to the base. Those decisions are the second step of rule 10.12, the table's statement that it lists every check, and the change field of row 10.1.37a, which promised this row. The rule "One part at a time" does not hold it back. Rows 10.1.35a, 10.1.43b and 10.1.37a joined the base the same way in groups 3 and 4, and item 3 of `fix-brief-group4-c.md` deferred this row to item 57.

---

## The author's four questions and what only the owner can answer

None of the four questions blocks a draft in my input.
- **Question 1** is settled when the owner agrees to s-4mej6ccn7xu3d3p, provided the group's page shows the removed refusal in Russian. Recording it again for the base specification would ask the owner twice.
- **Questions 2 to 4** do not touch these drafts.

Nothing in my input needs the owner's answer. One item should go under "Found and owed": rule 10.2 names only the tests at a push, while rule 10.12 and row 10.1.37b also check the project's own tools there.

Files read: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group8-notes.md`, `D:/SpecSheriff/skills/tools/assets/githook`, `D:/SpecSheriff/skills/claude-code/hooks/guard.sh`, `D:/SpecSheriff/skills/tools/src/guard.ts`.

Sources:
- [Codex hooks, official documentation (learn.chatgpt.com/docs/hooks, read 2026-11-25)](https://learn.chatgpt.com/docs/hooks)
- [dcg integration note on exit code 2 failing open in Codex 0.144.x on Windows (unverified)](https://raw.githubusercontent.com/Dicklesworthstone/destructive_command_guard/main/docs/codex-integration.md)

## The main session's decisions

`s-n76wt2bkqdmh78x`:
- A1: applied. The owner's ruling of 2026-11-02 still holds as to what it requires: the scripts answer Codex in JSON. The most likely mistake in the example becomes writing the refusal to standard output as plain text. The page states the ruling and what changed in Codex since then.
- A2, the reason: applied. It also resolves the thorough reader's finding about "as it is written".
- A3: applied.
- A4: applied.
- A5: applied. It also resolves the thorough reader's finding about what is read from the patch.
- A6, the change to `s-st6td4mua9uqt9z`: applied.

`s-4mej6ccn7xu3d3p`:
- B1: applied, with the fast reader's "that the SpecSheriff tools ran no check" in place of "that no check of SpecSheriff ran". `stage3` says that the git hook checks the version of Node.js against `engines.node`.
- B2: applied.
- B3: applied.
- B4: applied.
- The page shows in Russian the refusal that the approved node had where Node.js is missing, and why the draft drops it. The owner's agreement to the group then settles base question 1, as the reviewer says. Question 1 stays out of the list for the base specification.

`s-n4m5zvh96yb299p`:
- C1: applied.
- C2: not applied as worded. "names any other file there" is applied instead, as the fast reader's decision says, since the owner's English writes "any other".
- C3: applied. "so that" states a purpose here: the hook runs the tool in git's environment so that the tool can read the working tree and git's index. This overrides the thorough reader's decision "so it reads".
- C4: applied. It replaces the thorough reader's change to "These files".
- C5: applied.
- C6, the reason: applied, with the sentence about the first line kept as a third sentence, since it says why a tool is recognised by its first line.
- C7: applied.

`proposal:row-10-1-37b`: ready. The thorough reader's two changes are applied. The reviewer's reading on the promise of row 10.1.37a holds: the row implements decisions already made.

Found and owed: rule 10.2 names only the tests on a push. Rule 10.12 also runs the project's own tools on a push, and row 10.1.37b checks what they change. It goes to the continuation file under "Found and owed".
