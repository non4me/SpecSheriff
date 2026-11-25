# The final review of group 8, round c: the report of specsheriff-rule-reviewer

**Final review of group 8 (round c)**

Four of the 17 drafts are not ready, and the author can fix all four without the owner. The other 13 are ready, with only nits. Nothing new needs the owner beyond the three questions already on the page.

The Skill tool could not load `specsheriff-terminology-review` ("Unknown skill"). I read its SKILL.md from `C:/Users/PC/.claude/skills/synced/…/specsheriff-terminology-review/SKILL.md` instead. Round c brings in no new term, so there is no TERM finding.

**Checklist titles:** 1.2.3 Text and reason · 7.1 Goal, reader, scope · 7.2.1 Who must act · 7.2.2 Order of the text · 7.2.3 General words · 7.2.4 Naming · 7.2.4.1 Coined names · 7.2.4.2 What a name says · 7.2.4.3 General word in a name · 7.2.4.4 Properties · 7.2.4.5 Relations · 7.2.5 Definition by negation · 7.2.6 Lists that restrict · 7.2.7 Words from the specification · 7.3.1 Title · 7.3.2 Thoughts and sentences · 7.3.3 Contents of a node · 7.4.1 Counts in prose · 7.4.2 The reason · 7.5.1 Superfluous rules · 7.5.2 Length of a sentence · 7.5.3 Rules as tables · 7.6.1 Language · 7.6.2 Capitals · 7.6.3 Examples · P = the pairing test.

## Checklist and «Оценка» for each draft

**s-477gtdrkw34dzxw.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- согласованность: ✓ — s-epaw9sgyaajzn8g, s-npnmwyt6s3gypwe, s-8a5eyy5n5hnsgrs, s-b6qdtghnyha3fhk, s-tnz9zgqx8c629a7
- целостность: ✓ — пункт `pre-push` теперь совпадает с s-8a5eyy5n5hnsgrs, пункт о начале сессии — с s-4mej6ccn7xu3d3p; s-7pk89t8z6wymmj9 и s-n76wt2bkqdmh78x держатся
- целесообразность: ✓ — указатель хуков для 10.2
- избыточность: ✓
- недостаточность: ✓ (нит: не названо обновление копии инструментов)

**new:tools-6-pre-commit.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- согласованность: ✓ — 10.12 при ответе A на вопрос 1, решение 2026-10-31, s-7pk89t8z6wymmj9, s-dbk2vyeg8z5jxna
- целостность: ✓ — s-477gtdrkw34dzxw, s-n4m5zvh96yb299p, s-hcmpjmwtgfwzncu
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓ — куда пишет `sheriff types`, теперь сказано в тексте

**new:tools-6-push-compare.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- 7.5.2 ✗ "Otherwise, where it refuses nothing"
- согласованность: ✗ — русский текст относит условия запуска тестов к ref, а s-b6qdtghnyha3fhk ставит их коммиту (P2)
- целостность: ✓ — пункт `pre-push` в s-477gtdrkw34dzxw
- целесообразность: ✓
- избыточность: ✗ — «Otherwise» повторяет «where it refuses nothing» (P1)
- недостаточность: ✓

**new:tools-6-hooks-on.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- согласованность: ✓ — 10.2, s-7unxytshhc4md54, session-start.sh (индекс, core.fileMode)
- целостность: ✓ — s-n4m5zvh96yb299p
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**new:tools-6-reviewer-settings.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- согласованность: ✓ — s-xr5xxa9cxf2mq5u (имя совпадает), s-tnz9zgqx8c629a7
- целостность: ✓ — s-ttsc8tpnu46q53s
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**new:tools-6-after-edit.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- согласованность: ✓ — s-w5wg69pvvhedsws, s-ztseyetus7np6br, согласованный узел об отказах `sheriff validate`
- целостность: ✓ — ссылки на s-4kd2pave7vm4hmd и s-9kfdycuq34beqvs добавлены
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**s-st6td4mua9uqt9z.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- согласованность: ✓ — 10.3 (вопрос 2), s-d3nkw9b6mn98vuw, s-chsfpkgpmfk4fft, s-mhsb6fjsq5xn6c9
- целостность: ✓ — s-n76wt2bkqdmh78x, s-hcmpjmwtgfwzncu
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**s-n76wt2bkqdmh78x.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- P ✓ because sentence 2's conclusion is the premise of sentences 3–4, so the reason is one argument.
- согласованность: ✓ — документация Codex от 2026-11-25, решение 2026-11-02, s-2pdy9gw2jrjvfb4
- целостность: ✓
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ — первый пункт о патче расходится с patch.ts (N1)

**s-4mej6ccn7xu3d3p.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- согласованность: ✓ — 10.12, s-n4m5zvh96yb299p
- целостность: ✓ — s-477gtdrkw34dzxw
- целесообразность: ✓
- избыточность: ✓ — повтор снят
- недостаточность: ✓

**s-n4m5zvh96yb299p.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- согласованность: ✓ — 10.12, s-t9j29hppag2nren
- целостность: ✓ — строка 10.1.37b
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**proposal:row-10-1-37b.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P (the row has no reason)
- согласованность: ✓ — 10.12, 10.1.37a
- целостность: ✓
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**s-zh2vcr3xjumppg5.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- согласованность: ✓ — 2.5, 1.7.1, s-6bmnsbskg6en4nf
- целостность: ✓
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**s-2pdy9gw2jrjvfb4.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- согласованность: ✓ — s-n76wt2bkqdmh78x
- целостность: ✓ — довод о каталоге перенесён
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**new:tools-15-skills.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- 7.2.7 ✗ `spec`, `spec-review` and `spec-adopt` are not explained. This is question 3.
- согласованность: ✓ — решения 2026-11-02, 2026-11-03
- целостность: ✓ — implements к 2.5 по s-yprj7d6tnvauggr
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ — три skills без узла (вопрос 3)

**new:tools-15-spec-init.** ✓ 1.2.3 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- 7.1 ✗ the reason's first sentence, "Where the project keeps its code and its tests, which command …"
- The example is confirmed by the code: `posix.matchesGlob` does not match `src/a.ts` against `src`.
- согласованность: ✓ — s-7unxytshhc4md54, s-tnz9zgqx8c629a7
- целостность: ✓
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**new:tools-15-spec-remove.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.3 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- согласованность: ✓ — s-7unxytshhc4md54
- целостность: ✓
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**new:tools-15-spec-settings.** ✓ 1.2.3 · 7.1 · 7.2.1 · 7.2.2 · 7.2.4 · 7.2.4.1 · 7.2.4.2 · 7.2.4.3 · 7.2.4.4 · 7.2.4.5 · 7.2.5 · 7.2.6 · 7.2.7 · 7.3.1 · 7.3.2 · 7.3.3 · 7.4.1 · 7.4.2 · 7.5.1 · 7.5.2 · 7.5.3 · 7.6.1 · 7.6.2 · 7.6.3 · P
- 7.2.3 ✗ "through a procedure"
- согласованность: ✓ — решение 2026-11-18, s-chsfpkgpmfk4fft
- целостность: ✓
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ — обоснование не называет процедуру (S1)

## Findings

### new:tools-6-push-compare — not ready

**P1.** "Otherwise" repeats "where it refuses nothing". It also points back to a refusal described in another paragraph, so it reads as a contrast with the sentence on ignored files just before it.
- EN: "The hook leaves out the files that git ignores. Where it refuses nothing, it runs the tests in the working tree."
- RU: «Хук не учитывает файлы, которые git игнорирует. Если он ничего не отверг, он запускает тесты в рабочем дереве.»

**P2 (Russian only).** «ref, который push создаёт или обновляет, и который удовлетворяет…» reads as the ref meeting the conditions. The end of paragraph 1 becomes:
- RU: «…с каждым коммитом, на который напрямую или через тег указывает ref, создаваемый или обновляемый этим push, если этот коммит удовлетворяет условиям запуска тестов.»

### s-n76wt2bkqdmh78x — not ready

**N1.** The first item of the patch list says that `sheriff guard` does not read a file the patch adds. patch.ts does read such a file where it already exists, and it also reads the new path of a moved file. So the notes' claim that the draft "follows patch.ts" is wrong.
- EN: "it takes from the patch the path of each file that the patch adds, updates, deletes or moves, and the new path of each moved file, each relative to the session's working directory, and reads from disk each of those files that exists;"
- RU: «берёт из патча путь каждого файла, который патч добавляет, обновляет, удаляет или перемещает, и новый путь каждого перемещённого файла, каждый относительно рабочего каталога сессии, и читает с диска каждый из этих файлов, который существует;»

**Nits:**
- "The scripts run only in a repository…" conflicts with the hook calling the script wherever it finds the plugin.
  - EN: "Each script runs what the list of the hooks gives for its hook (§s-477gtdrkw34dzxw) only in a repository whose root holds `sheriff.config.json`."
  - RU: «Каждый скрипт выполняет то, что перечень хуков указывает для его хука (§s-477gtdrkw34dzxw), только в репозитории, в корне которого есть `sheriff.config.json`.»
- The Russian of the reason, «не нужно доверие заново», is unnatural. Replace it with «Поэтому пользователю не нужно заново доверять хуку, который лишь находит плагин и вызывает его скрипты, когда выпуск плагина меняет то, что делают скрипты.»
- In the Russian list of hooks, only the first item uses the new form. Write items 2 and 3 as «хук, который запускается перед правкой…» and «хук, который запускается после…».

### new:tools-15-spec-init — not ready

**I1.** The reason's first sentence opens "Where the project keeps its code and its tests," which an English reader takes first as a condition.
- EN: "The user decides where the project keeps its code and its tests, which command runs the tests and which settings the reviewer runs with."
- RU: «Пользователь решает, где проект хранит свой код и свои тесты, какая команда запускает тесты и с какими настройками работает рецензент.»

**Nit.** "the reviewer's settings" is the last use of that phrase in the drafts. Write "none of the settings of the reviewer's runner", as "The hooks" names them, and «ни о какой настройке runner рецензента».

### new:tools-15-spec-settings — not ready

**S1.** Read without its sid, "through a procedure" names no procedure.
- EN: "These settings are changed only with `sheriff settings`, which records a change only where an owner makes it (§s-chsfpkgpmfk4fft)."
- RU: «Эти настройки меняются только через `sheriff settings`, который записывает изменение, только если его вносит ответственный (§s-chsfpkgpmfk4fft).»

### Nits on drafts that are ready

- **s-st6td4mua9uqt9z:** "among the tests" can attach to "bound". Write "Among the tests of the working tree as the edit would leave it, it looks for a test that declares the SpecTag of the rule to which that code is bound." The Russian stays as it is.
- **new:tools-6-pre-commit:** see the remark on "The hook itself stages nothing" below.
- **s-477gtdrkw34dzxw:** the item on the hook that runs when a session starts does not say that it keeps the plugin's copy of the SpecSheriff tools up to date (s-4mej6ccn7xu3d3p).

## Ready

s-477gtdrkw34dzxw, new:tools-6-pre-commit, new:tools-6-hooks-on, new:tools-6-reviewer-settings, new:tools-6-after-edit, s-st6td4mua9uqt9z, s-4mej6ccn7xu3d3p, s-n4m5zvh96yb299p, proposal:row-10-1-37b, s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4, new:tools-15-skills (its 7.2.7 line waits on the answer to question 3), new:tools-15-spec-remove.

## The negative statements that round c kept (brief item 2)

The reasons the notes give hold for every kept negative but one:
- **Conditions of a refusal:** they sit in lists of what is forbidden, which rule 7.2.6 allows.
- **What a message says:** the rule itself states positively that the hook says something.
- **The reasons' sentences:** they name the problem the rule solves.
- **"unless … fails":** these are the agreed words of rule 10.12.

The exception is "The hook itself stages nothing". The owner's ruling fixes what it means, not how it is worded, and a positive form exists, as in s-jgcveum8dwdnyzr: "The hook itself leaves git's index as it is." / «Сам хук оставляет индекс git как есть.» I count this as a nit.

Two smaller points:
- "not into that directory" in the pre-commit hook is missing from the notes' list, but it holds: the "therefore" of the next sentence rests on it.
- git's own term is "untracked", not "that git does not track". The negative form holds anyway, as a condition of a refusal.

## The reason of s-n76wt2bkqdmh78x (brief item 3)

It holds. I read Codex's documentation on 2026-11-25:
- developers.openai.com/codex/plugins/build says "Plugins containing lifecycle hooks aren't eligible for the public plugin directory".
- learn.chatgpt.com/docs/hooks says Codex loads a project's hooks "only from trusted project layers" and that "new or changed hooks are marked for review".
- The same page says "If a plugin update changes a bundled script, Codex requires a new review". That supports the reason's last sentence (inference).

Two remarks, neither of them a finding:
- (inference) The plugin is installed from SpecSheriff's own marketplace, so "so … in the project" depends on the plugin staying eligible for the public directory. The plugins page also limits bundled hooks to "plugins installed manually in Codex desktop". The owner approved this reason, so I do not raise it.
- The hooks page now also lets a PreToolUse hook block "with exit code `2`" and the reason on stderr. This bears on the owner's ruling of 2026-11-02, which the node's `change` field already discusses; check it at the release rehearsal.

## The three questions (brief item 4)

Each opens with its recommendation and the basis for it. Two things are missing:
- **Risk lines.** Options 1B, 2B and 3B have none. Add a "Risk:" line to each, writing "none found" where none remains. Option 3A puts its risk under its cost, which "Every option is offered with its cost" allows.
- **An outdated quotation.** Question 2's "Under B" still quotes "is approved". Round c changed the item to "has the status `approved` while no approval of its wording is in force", so the quotation should match.

## Only the owner can answer

Questions 1 to 3, which are already on the page. Nothing new.

The drafts are in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json` and the notes in `D:/SpecSheriff/.ai_docs/t25-pass/group8-notes.md`. N1 rests on `D:/SpecSheriff/skills/tools/src/patch.ts`.
