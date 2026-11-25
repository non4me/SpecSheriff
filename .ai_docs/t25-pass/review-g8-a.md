# The first review of group 8, part a: the report of specsheriff-rule-reviewer

The Skill tool could not load `specsheriff-terminology-review` ("Unknown skill"). I read its SKILL.md from `C:/Users/PC/.claude/skills/synced/a08d2aec-…/specsheriff-terminology-review/SKILL.md` instead.

---

## 1. `s-477gtdrkw34dzxw`: "The hooks". Verdict: **not ready** (the author can make every fix)

**Checklist**
- 1.2.3 Text and reason ✓
- 7.1 Goal ✗ "these hooks" points back to the previous paragraph. It reads as all three git hooks, pre-push included.
- 7.2.1 ✓ · 7.2.2 ✓
- 7.2.3 General words ✗ "where the node of the check says so": this doesn't say whether it means the table's row or the node on how the check is made.
- 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓
- 7.2.6 ✓ ("reads only" lists what is allowed, which is the right choice)
- 7.2.7 ✗ "the commit being made" is first used in the `pre-commit` item but explained only in the third paragraph. "the tools that rewrite files" has no citation.
- 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓
- Pairing test ✓ (the two sentences ground the third paragraph, then the first, so not in order. The list of changes of 2026-11-11 assigned the first sentence here.)

**Оценка**
- согласованность: ✗ — первое предложение относит к хукам и момент перед одобрением спецификации, а там проверки запускает `sheriff settings` (s-epaw9sgyaajzn8g, s-m59dqwkw2e96wne). «They run the SpecSheriff tools there» противоречит s-npnmwyt6s3gypwe: `sheriff markdown` и `sheriff map` работают в рабочем дереве. В обосновании «the plugins declare», но хуки объявляет только плагин для Claude Code (s-zh2vcr3xjumppg5, s-n76wt2bkqdmh78x).
- целостность: ✗ — «these hooks» включает pre-push, а тесты читают то, что установлено в рабочей копии (s-8a5eyy5n5hnsgrs), то есть больше, чем допускает список «reads only». Ссылки на этот узел из s-7pk89t8z6wymmj9, s-stxmhq3hgfndvn6, s-tnz9zgqx8c629a7 и s-b6qdtghnyha3fhk остаются верными.
- целесообразность: ✓ — разделение требует правило 7.3.3. Абзац о том, что читает проверка, перенесён сюда по списку изменений основной таблицы от 2026-11-11.
- избыточность: ✓ — сравнивал с s-npnmwyt6s3gypwe, s-hcmpjmwtgfwzncu, s-8a5eyy5n5hnsgrs, s-qzthyh7yqvfhsa2; повторов нет.
- недостаточность: ✗ — список «reads only» не называет настройки runner, которые `sheriff review` читает из конфигурации git (s-tnz9zgqx8c629a7).

**Findings**
1. **WORDING FIX** (opening sentence): "The following hooks run the SpecSheriff tools, and with them the checks before and after an agent's edit, on a commit and on a push (§s-epaw9sgyaajzn8g):" / «Инструменты SpecSheriff, а с ними и проверки до и после правки агента, при коммите и при push (§s-epaw9sgyaajzn8g), запускают следующие хуки:»
2. **WORDING FIX** (the `pre-commit` item): "`pre-commit`, which runs the project's own tools for that hook (§s-n4m5zvh96yb299p), `sheriff types` and the checks (§s-npnmwyt6s3gypwe);" / «`pre-commit`, который запускает собственные инструменты проекта для этого хука (§s-n4m5zvh96yb299p), `sheriff types` и проверки (§s-npnmwyt6s3gypwe);»
3. **WORDING FIX**: "They run the SpecSheriff tools there" → "They run the checks there" / «Они запускают там проверки».
4. **WORDING FIX**: "Each check that these hooks or the agent's hook after an edit run" → "Each check that the pre-commit hook, the commit-msg hook or the agent's hook after an edit runs" / «Каждая проверка, которую запускает хук pre-commit, хук commit-msg или хук агента после правки,»
5. **WORDING FIX** (add a list item and a `cites` link): "the settings of the reviewer's runner in the git configuration of the user who commits, for the review (§s-tnz9zgqx8c629a7);" / «настройки runner рецензента в конфигурации git пользователя, который делает коммит, — для ревью (§s-tnz9zgqx8c629a7);»
6. **WORDING FIX**: "where the node of the check says so" → "where the node on how the check is made (§s-4kd2pave7vm4hmd) says so" / «там, где это говорит узел о том, как выполняется проверка (§s-4kd2pave7vm4hmd)».
7. **WORDING FIX** (reason): "the plugins declare" → "the plugin for Claude Code declares" / «объявляет плагин для Claude Code».
8. **WORDING FIX** (Russian only): «только если `sheriff commit-message` ничего не отверг» → «только после того, как проверка `sheriff commit-message` пройдена». The English says "only after … has passed".

---

## 2. `new:tools-6-pre-commit`: "The pre-commit hook". Verdict: **not ready** (one question for the owner)

**Checklist**
- 1.2.3 ✓
- 7.1 Goal ✗ "writes each such file into the working tree instead": "instead" has nothing to refer back to.
- 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓
- 7.2.7 ✗ These are used without a citation: `sheriff validate`, `sheriff binding`, `sheriff citations`, "the export" and "the map". "the project's own guidelines" and "the project's own checks" cite s-t9j29hppag2nren and s-7pk89t8z6wymmj9 instead of the nodes that define them, s-u7tw6m8npxmv5tu and s-2fau85dfyyeq66m.
- 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓
- Pairing test ✓

**Оценка**
- согласованность: ✗ — остальные инструменты проекта идут до проверки ключа, записанного дважды, и проверки по схеме. Правило 10.12 (s-pcnyfp7gev7syax, согласовано 2026-11-24) ставит эти проверки «right after the first step». Обоснование приписывает 10.12 слова «the form in which its author makes it», а в 10.12 сказано «final form». «generates from the nodes as they are staged» расходится с s-a8fn72xa782wvbk: типы порождаются из последней одобренной формулировки. Сверено также с s-kh8qcd5kxgh9z3j, s-7pk89t8z6wymmj9, s-dbk2vyeg8z5jxna, s-n4m5zvh96yb299p, с решением 2026-10-31 и с решением 2026-11-25 о Views.
- целостность: ✗ — по плану `stage3` сюда копируются решения 2026-10-26 и 2026-10-31. Они цитируют s-bpdqd9v72wg7vsz, s-sn6au3vcr9uy5pm, s-hr7j7scmfkkjnws и s-jau82aq9juv9zzh, но ссылок `cites` на эти узлы у черновика нет.
- целесообразность: ✓ — порядок задаёт 10.12, а отдельным узлом шаги выделены по 7.3.3.
- избыточность: ✓ — фраза о каталоге частично повторяет «The hooks», но добавляет, когда этот каталог выписывается.
- недостаточность: ✓ — что сбой `sheriff types` останавливает коммит, следует из 10.12 («no tool fails»).

**Findings**
1. **DOUBT** (only the owner can answer; this is the notes' question 2): the draft runs the project's other tools before the two checks of structure, while 10.12 runs those checks "right after the first step". There are two ways out:
   - change 10.12 to "run before any other check", as the notes recommend, after stage 2. The draft then stands.
   - keep 10.12 as it is, and give `sheriff validate` an option that makes those two checks alone, first. That is a new option and a second run of the checks.
   I recommend the first.
2. **WORDING FIX**: "`sheriff types` (§s-a8fn72xa782wvbk), run on the files as they are staged;" / «`sheriff types` (§s-a8fn72xa782wvbk), запущенный на файлах в том виде, в каком они находятся в стейджинге;». This also drops «код», which the English does not have.
3. **WORDING FIX** (7.2.7, with `cites` links):
   - "the project's own guidelines (§s-u7tw6m8npxmv5tu)";
   - "`sheriff validate` (§s-4kd2pave7vm4hmd)";
   - "the project's own checks (§s-2fau85dfyyeq66m, §s-7pk89t8z6wymmj9)";
   - the last paragraph becomes: "A failure of `sheriff markdown` or `sheriff map` to write its files is reported and stops nothing." / «Если `sheriff markdown` или `sheriff map` не может записать свои файлы, об этом сообщается, и это ничего не останавливает.»
4. **WORDING FIX**: "its directory" → "a directory of its own" / «в отдельный каталог». The second paragraph after the list becomes: "The hook writes each such file into the working tree, not into that directory, in place of whatever is at the same path, and reports it as a file to be staged. The hook itself stages nothing." / «Хук записывает каждый такой файл не в этот каталог, а в рабочее дерево, на место того, что лежит по тому же пути, и сообщает, что этот файл нужно добавить в стейджинг. Сам хук ничего в стейджинг не добавляет.» The Russian already said «Сам». With "itself", the English also leaves room for the project's own tools that rewrite files to stage what they write.
5. **WORDING FIX** (reason): "in the form in which its author makes it" → "in its final form" / «в его окончательном виде».
6. **Links** (author): add the `cites` links listed under целостность.

---

## 3. `new:tools-6-push-compare`: "The working tree compared with what a push sends". Verdict: **not ready** (the author can make every fix)

**Checklist**
- 1.2.3 ✓ · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓
- 7.2.4 Naming ✗ "the files that the working tree ignores". s-pcnyfp7gev7syax, s-7pk89t8z6wymmj9, row 10.1.37a and s-hcmpjmwtgfwzncu all say "the files that git ignores".
- 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓
- 7.2.7 ✗ "a commit that the tests judge" is used in the first item but defined only in the next paragraph.
- 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓
- Pairing test ✓ (the reason is a single sentence)

**Оценка**
- согласованность: ✗ — «files that the working tree ignores» вместо «files that git ignores» (s-pcnyfp7gev7syax, s-7pk89t8z6wymmj9, строка 10.1.37a, s-hcmpjmwtgfwzncu). В остальном узел согласуется с s-b6qdtghnyha3fhk, s-aufnqn6t7y2me7a и решением 2026-10-31.
- целостность: ✓ — стыкуется с s-b6qdtghnyha3fhk (оба условия), с пунктом pre-push в «The hooks» и с s-n4m5zvh96yb299p. В `stage3` названа правка хука и push-mode.ts.
- целесообразность: ✓ — одобренное обоснование s-b6qdtghnyha3fhk говорит, что там, где тесты не запускаются, сравнение ничего не охраняет.
- избыточность: ✗ — «A commit that leaves the specification a draft is never compared…» повторяет условие из определения и к тому же написано через отрицание.
- недостаточность: ✓ — пробелов не нашёл.

**Findings**
1. **WORDING FIX + CUT** (replaces the first two paragraphs, and drops the sentence on a draft):
   "Before a push for which it runs the tests (§s-b6qdtghnyha3fhk), the pre-push hook compares the working tree with each commit that the tests judge: each commit to which the push creates or updates a ref, directly or through a tag, and that meets the conditions under which the tests run. The hook refuses the push where either of the following holds for a file, and names each such file:
   - the file differs between the working tree and such a commit;
   - the file is in only one of them, including a file in the working tree that git does not track."
   / «Перед push, для которого он запускает тесты (§s-b6qdtghnyha3fhk), хук pre-push сравнивает рабочее дерево с каждым коммитом, который оценивают тесты: с каждым коммитом, на который push создаёт или обновляет ref, напрямую или через тег, и который удовлетворяет условиям запуска тестов. Хук отвергает push, если для какого-либо файла выполняется одно из следующих условий, и называет каждый такой файл:
   - файл отличается в рабочем дереве и в таком коммите;
   - файл есть только в одном из них, в том числе файл в рабочем дереве, который git не отслеживает.»
2. **WORDING FIX**: "The hook leaves out the files that git ignores." / «Хук не учитывает файлы, которые git игнорирует.»
3. **TERM** "has never been added to git". git's own manual (git-scm.com/docs/gitignore, current online edition) calls ignored files "intentionally untracked files". It also says that `git rm --cached` stops a file from being tracked.
   - Fit: partial. "Never added" is narrower than git's "untracked": a file that was committed once and then removed from the index is untracked but was added. The current code, `git ls-files --others`, counts that file.
   - Recommendation: "that git does not track", as in finding 1. The phrase "the files that the working tree ignores" has the same meaning as git's "ignored", so use git's word.
   - Cost: none, since the node is a draft.

---

## Points to look at in my input
- **The split, with the old sid kept for the list (implementing 10.2): holds.** Rule 7.3.3 and the vt rule "A node is split within its section without asking" allow it. The citations of this sid in other nodes still hold. Only the opening sentence claims too much (finding 1.1).
- **Staging: holds.** Rule 10.12 says only that nothing changes the commit after the first step. The ruling of 2026-10-31 on s-477gtdrkw34dzxw says the hook stages nothing. s-n4m5zvh96yb299p refuses a change to what is staged only when one of the project's other tools makes it.
- **Order: does not hold.** The pre-commit order departs from 10.12's "right after the first step" (finding 2.1).
- **Comparing only with the commits the tests judge: holds.** It follows from the reason of the ruling of 2026-10-31 and from the approved reason of s-b6qdtghnyha3fhk.
- **`sheriff markdown` and `sheriff map` only with the Views extension: holds.** The group 7 ruling recorded in `agree-group7.mjs` says so.
- **The four questions for the base specification:** question 2 blocks the pre-commit draft. Questions 1, 3 and 4 bear on none of these three drafts.
- **The code:** `skills/tools/hooks/pre-commit` and `pre-push` differ from the drafts, and each draft's `stage3` field says what changes. The code's `git check-ignore` supports the wording "files that git ignores".

## Questions only the owner can answer
1. Rule 10.12, "right after the first step" (finding 2.1): change the base wording after stage 2, or keep the base and add an option to `sheriff validate`. Until this is answered, `new:tools-6-pre-commit` cannot be final.

Files read: `D:/SpecSheriff/.ai_docs/t25-pass/review-input-g8-a.md`, `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group8-notes.md`, `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`, `D:/SpecSheriff/skills/tools/hooks/pre-commit`, `D:/SpecSheriff/skills/tools/hooks/pre-push`, `D:/SpecSheriff/skills/tools/hooks/commit-msg`.

Sources:
- [git-scm.com, gitignore documentation](https://git-scm.com/docs/gitignore)

## The main session's decisions

`s-477gtdrkw34dzxw`:
- 1.1, the opening sentence: applied. The hooks do not run the checks made before an approval of the specification. `sheriff settings` runs those.
- 1.2, the `pre-commit` item: applied.
- 1.3, "They run the SpecSheriff tools there": applied, as "They run `sheriff types` and the checks there", since `sheriff markdown` and `sheriff map` run in the working tree.
- 1.4: applied. The thorough reader asked for the same change.
- 1.5, the settings of the reviewer's runner: applied.
- 1.6: applied. The drafting agent looks up the sid of the node on how each check is made.
- 1.7, "the plugins declare": applied together with the thorough reader's change: "The hooks that the repository keeps and those that the plugin for Claude Code declares".
- 1.8, the Russian: applied.
- 7.2.7, "the commit being made" and "the tools that rewrite files": applied. Each is explained or cited at its first use.

`new:tools-6-pre-commit`:
- 2.1, the order that conflicts with "right after the first step" in rule 10.12: put to the owner on the page of group 8, as question 1. The draft keeps the order of option A. In group 7 the owner decided a base question on which a draft depended (question 5 of group 7). The base rules are changed after stage 2. This question is handled the same way. The question states what a person sees: what the hook refuses is the same under both options. Under option A, the base wording is changed after stage 2. Under option B, the commands node and `sheriff validate` gain an option that makes only the two structural checks.
- 2.2: applied. It also resolves the fast reader's finding that the verb has no object.
- 2.3: applied. Each command cites its agreed node, looked up by sid. The last paragraph becomes "A failure of `sheriff markdown` or `sheriff map` to write its files is reported, and does not make the hook refuse the commit."
- 2.4: applied, with "names it as a file for the author to stage" instead of "reports it as a file to be staged".
- 2.5: applied.
- 2.6: applied.

`new:tools-6-push-compare`:
- 3.1: applied. It replaces the readers' changes to the same sentences.
- 3.2: applied.
- 3.3: applied: "a file in the working tree that git does not track".

The points to look at: the reviewer's readings stand. The pre-commit order is question 1 above.
