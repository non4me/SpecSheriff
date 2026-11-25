# The follow-up review of group 8, part c: the report of specsheriff-rule-reviewer

The Skill tool could not load `specsheriff-terminology-review`, so I read its SKILL.md from `C:/Users/PC/.claude/skills/synced/a08d2aec-…/specsheriff-terminology-review/`, as the brief allows.

**Summary:** none of the four drafts is ready yet, but the author can fix every finding without the owner. Every first-review finding was applied, or set aside for a reason that holds. Round b brought in findings A, C, D and F while it applied the readers' wordings and the main session's decisions.

## s-n76wt2bkqdmh78x "The agent's hooks for Codex CLI": not ready

- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✗ "A script reads from the file `agent` in the folder of the plugin's SpecSheriff tools (§…) that it serves Codex": a reader first takes "that it serves Codex" as a clause about "tools"
- 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓
- Pairing test ✓

**Оценка**
- согласованность: ✓ сверено с s-st6td4mua9uqt9z (guard пишет отказ в stderr с кодом 2, скрипт переводит его в JSON; неприменимый патч отвергает guard), s-hcmpjmwtgfwzncu, s-xr5xxa9cxf2mq5u, s-7unxytshhc4md54, s-2pdy9gw2jrjvfb4, s-83ev4wwesbwnhnp, s-epaw9sgyaajzn8g, с решением от 2026-11-02 и с документацией Codex о хуках.
- целостность: ✗ узел отсылает к перечню хуков (s-477gtdrkw34dzxw). В этом перечне у хука при начале сессии нет обязанности, которую ему даёт s-4mej6ccn7xu3d3p: называть хуки, записанные более ранним выпуском (находка E).
- целесообразность: ✓ агент в Codex проходит те же проверки, что и в Claude Code. Тонким хукам проекта не нужно новое доверие при каждом выпуске.
- избыточность: ✓ сверено с s-st6td4mua9uqt9z, s-hcmpjmwtgfwzncu, s-2pdy9gw2jrjvfb4.
- недостаточность: ✓

## s-4mej6ccn7xu3d3p "A git hook runs the SpecSheriff tools that a plugin keeps on the machine": not ready

- 1.2.3 ✓
- 7.1 ✗ "it calls the script for that hook in their `hooks/`" reads as a call made in every case, even where Node.js is missing
- 7.2.1 ✓ · 7.2.2 ✓
- 7.2.3 General words ✗ "and gives a notice": the sentence does not say what the notice says
- 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓
- Pairing test ✓

**Оценка**
- согласованность: ✓ сверено с правилом 10.12 (proposal:s-pcnyfp7gev7syax-g4), решениями узла от 2026-11-02 и 2026-11-05, s-7unxytshhc4md54, s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4, s-p29yawkkkgk7kxb, s-n4m5zvh96yb299p.
- целостность: ✗ то же, что в предыдущем узле: перечень хуков (s-477gtdrkw34dzxw) не даёт хуку при начале сессии называть хуки более раннего выпуска (находка E).
- целесообразность: ✓
- избыточность: ✗ третий пункт списка и абзац о случае, когда инструменты не могут выполняться, дважды говорят, что хук запускает собственные инструменты проекта (находка B).
- недостаточность: ✗ по списку сообщение выдаёт каждый git-хук, а абзац называет только pre-commit и pre-push. Не сказано, вызывает ли хук скрипт, когда Node.js нет (находка B).

## s-n4m5zvh96yb299p "The project's own tools in a git hook": not ready

- 1.2.3 ✓
- 7.1 ✗ "…tools that rewrite files for which it runs nothing, where that path points into its own folder": "for which" comes right after "files", and "its" comes right after "that path"
- 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓
- 7.4.2 ✓ the sentence on the first line stays, by decision C6
- 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓
- Pairing test ✓

**Оценка**
- согласованность: ✓ сверено с правилом 10.12 (g4), решением от 2026-11-21 по s-t9j29hppag2nren, решением от 2026-11-05 по этому узлу, s-npnmwyt6s3gypwe, s-477gtdrkw34dzxw, s-hheus6f395ynqvc, строками 10.1.37a и 10.1.37b.
- целостность: ✓ s-4mej6ccn7xu3d3p, s-7unxytshhc4md54, s-jgcveum8dwdnyzr и s-t9j29hppag2nren остаются верны.
- целесообразность: ✓
- избыточность: ✓ сверено с s-npnmwyt6s3gypwe и s-4mej6ccn7xu3d3p.
- недостаточность: ✓

## proposal:row-10-1-37b: not ready

- 1.2.3 ✓ (the row has no reason, like rows 10.1.2 and 10.1.37a)
- 7.1 ✗ "leaves the working tree, other than the files that git ignores, what is staged and the commit message as they were" can also be read as three exceptions
- 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓
- Pairing test ✓ (does not apply, since the row has no reason)

**Оценка**
- согласованность: ✓ сверено со вторым шагом правила 10.12, строкой 10.1.37a, s-2fau85dfyyeq66m, s-n4m5zvh96yb299p.
- целостность: ✓ расхождение с правилом 10.2 на push уже записано в «Found and owed».
- целесообразность: ✓ эту строку обещало поле изменений строки 10.1.37a.
- избыточность: ✓ строка 10.1.37a охватывает только проверки проекта, а эта строка их исключает.
- недостаточность: ✓

## Findings (the author can fix each one)

**A. WORDING FIX** (s-n76wt2bkqdmh78x). Delete the sentence on the file `agent`, and make the lead-in of the JSON list:
- EN: "Where the file `agent` in the folder of the plugin's SpecSheriff tools (§s-xr5xxa9cxf2mq5u) names `codex`, the scripts answer Codex with JSON written to their standard output, and exit with code 0:"
- RU: «Если файл `agent` в папке инструментов SpecSheriff плагина (§s-xr5xxa9cxf2mq5u) называет `codex`, скрипты отвечают Codex в виде JSON, который пишут в свой стандартный вывод, и завершаются с кодом 0:»

**B. WORDING FIX** (s-4mej6ccn7xu3d3p). The code gives the notice only from pre-commit and pre-push, as the paragraph below the list says. Change the list and the paragraph as follows:
- Item 1: "of either plugin" becomes "of each plugin". The Russian stays as it is.
- Item 2: "where the SpecSheriff tools can run, it calls the script for that hook in their `hooks/`;" / «если инструменты SpecSheriff могут выполняться, вызывает скрипт для этого хука в их папке `hooks/`;»
- Item 3: cut "and gives a notice" / «и выдаёт сообщение».
- The paragraph's second sentence: "In either case, the hook lets the commit or the push through unless one of the project's own tools fails (§s-pcnyfp7gev7syax)." / «В любом из этих случаев хук пропускает коммит или push, если ни один из собственных инструментов проекта не завершился неудачей (§s-pcnyfp7gev7syax).»

**C. WORDING FIX** (s-n4m5zvh96yb299p). Replace the sentence on listed paths:
- EN: "Where a path in the project's list of tools that rewrite files points into the hook's own folder, `.githooks/<hook>.d/`, and the hook runs nothing for that path, the hook names the path."
- RU: «Если путь из перечня инструментов проекта, переписывающих файлы, ведёт в собственную папку хука `.githooks/<hook>.d/` и хук ничего для этого пути не запускает, хук называет этот путь.»

**D. WORDING FIX** (row 10.1.37b). Read as three exceptions, the row would let a tool change what is staged and the commit message. Replace the end of the row:
- EN: "…leaves the commit message, what is staged and the working tree as they were, except for the files of the working tree that git ignores"
- RU: «…оставляет сообщение коммита, то, что находится в стейджинге, и рабочее дерево такими, какими они были, кроме файлов рабочего дерева, которые git игнорирует»

**E. WORDING FIX** (s-477gtdrkw34dzxw, outside my input). Change the item on the hook run when a session starts:
- EN: "when a session starts, a hook that turns the git hooks on (§s-jgcveum8dwdnyzr), names each hook that holds what an earlier release of `sheriff init` wrote (§s-4mej6ccn7xu3d3p), and has the agent ask the user for the settings of each runner (§s-p29yawkkkgk7kxb);"
- RU: «при начале сессии — хук, который включает git-хуки (§s-jgcveum8dwdnyzr), называет каждый хук, который содержит то, что записал более ранний выпуск `sheriff init` (§s-4mej6ccn7xu3d3p), и через агента запрашивает у пользователя настройки каждого runner (§s-p29yawkkkgk7kxb);»

**F. Change fields.** In s-4mej6ccn7xu3d3p, two parts say «Без изменений» although they changed: the paragraph on the hook run when a session starts, and the sentence after its list. Add to them:
- «Было: «The script run when a session starts names each of these hooks…». Без изменений по смыслу: назван хук, как в остальных узлах группы.»
- «Было: «For each, it says that `sheriff init` replaces it (§s-7unxytshhc4md54).» Без изменений по смыслу.»

In s-n76wt2bkqdmh78x, the `change` of the third paragraph does not mention its first sentence. Add: «Было: «The scripts do what the agent's hooks do (§s-477gtdrkw34dzxw).» Без изменений по смыслу.»

**Not a finding, for stage 3.** Codex's hooks documentation says that a `block` answer after a tool call replaces the result the model sees (read 2026-11-25, https://learn.chatgpt.com/docs/hooks). So after a shell command, the agent sees the refusals instead of the command's output.

**The three questions** each open with the recommendation and its basis, then give each option with what a person sees and what it costs. None of them, nor the remaining question on the base specification, holds back these drafts.

**Only the owner can answer:** none.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/skills/tools/assets/githook`, `D:/SpecSheriff/skills/claude-code/hooks/session-start.sh`

## The main session's decisions

They are in fix-brief-group8-c.md, which holds the decisions on all six reports of the follow-up review.
