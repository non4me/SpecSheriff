# T25: the questions about the base specification that stage 2 deferred

This file gathers the questions about the base specification, and the changes to it, that the review of the appendix of the tools deferred, and every change to the base that the owner has already decided on. The main session shows it to the owner on one page. The briefs are `briefs/t25-base-questions-brief.md`, `fix-brief-bq-b.md` for round b, `fix-brief-bq-c.md` for round c and `fix-brief-bq-d.md` for round d; `base-questions-notes.md` says how each finding in each round's reports was addressed. The earlier versions are `base-questions.before-b.md`, `base-questions.before-c.md` and `base-questions.before-d.md`.

Nothing here has been written into a node. The base specification was read from `moved/specs/_guidelines/spec.json` and its extensions, together with the agreed drafts of changes to the base in `tools-drafts.json` (the keys `proposal:s-…` whose sid is a node of the base). The locations below are those of `moved/`.

Sources:
- `t25-one-thought.md`: the section "Found and owed", and line 79, which defers a question about rules 3.2 and 10.1.6;
- `group1-notes.md` to `group8-notes.md`: the questions for the base specification, the questions for the owner, and the lists of changes needed outside each group;
- the owner's answers on the pages of groups 7 and 8 (2026-11-25).

Summary:
- **1. Changes made without asking:** 4.
- **2. Proposals that carry out a decision already made:** 9.
- **3. New proposals for agreement:** 8.
- **4. Questions for the owner:** 7.
- **5. Dropped items:** 15.

Every new or changed wording in sections 2 to 4 still goes to EngStickler's readers, and, where it is a wording of its own, to specsheriff-rule-reviewer, before the owner sees it. Each decision written below for `meta.decisions` has `"type": "textual"`.

---

## 1. Changes made without asking

Each change below is one of these: a rename that a decision requires, a replacement that changes no meaning, or a new link. A rename falls under the owner's rule "What a decision removes or renames is removed or renamed without asking again". A replacement that changes no meaning is approved on the owner's behalf, as the rule on what an agent approves on an owner's behalf allows (§s-t5uw8zfxzhfdg86). A link is not part of what an approval covers (§s-5ah25f6gy99panq), so adding one does not need an owner's agreement. The main session makes each change, and the node stays agreed; the main session reports the change in one line. Changes 1.3 and 1.4 are made together with proposal 2.6, once the owner accepts it, so that rule 9.5 and the nodes that restate it or name its check change together.

### 1.1 Two replacements in the same sentences of an agreed node of the appendix of the tools

**Follows from:**
- the item in "Found and owed" from group 6 (2026-11-24): an approval "is in force" in the appendix of the tools and in row 10.1.8, while some nodes still say that it "stands". Rules 1.3.3 and 10.3 get the same replacement in their proposals, 2.7 and 2.4;
- the item in "Found and owed" from group 5 (2026-11-24), line 1664 of `t25-one-thought.md`: s-ztseyetus7np6br uses "a field that has an `enum`" in place of the term "a field with `enum`" of rule 12.7. Replacing that wording with the term is a technical replacement that is due when that node next changes. It changes now, so the replacement is made here. s-agc6fb3vx46pc23 keeps the phrase until its next change.

The Russian of these sentences already says «в силе» and «поле с `enum`», so both replacements change the English only.

**The changes,** in `proposal:s-ztseyetus7np6br`, in its later version `proposal:s-ztseyetus7np6br-g3`, and in `new:tools-2-reindex-writes`, all three of which are drafts of s-ztseyetus7np6br:
- "…stays approved while an approval of its current wording stands (§s-v4qus7raqnwzneb)." becomes "…stays approved while an approval of its current wording is in force (§s-v4qus7raqnwzneb).";
- "the values gathered for each field that has an `enum` whose values come from elsewhere in the specification" becomes "the values gathered for each field with `enum` whose values come from elsewhere in the specification".

Report line: «В согласованном узле описания инструментов о том, что пишет `sheriff reindex`, «stands» заменено на «is in force», как в строке 10.1.8, а «a field that has an `enum`» — на «a field with `enum`», как в правиле 12.7; русский текст не менялся.»

### 1.2 The node on the validator of the RuntimeChecks implements rule 12.4

**Follows from:** rule 12.4, "Data records conform to their RecordType" (s-wxcmpbvy9bzkfj9): "The RuntimeCheck generated from the RecordType (§s-e877bnfa559tvk9) refuses a nonconforming data record before that part of the system outputs it or writes it to its store." A data record whose `birthDate` is `"2026-02-30"` does not conform to a RecordType whose field has `"format": "date"`. So rule 12.4 already requires what the agreed node "The validator of the RuntimeChecks" (`new:tools-17-validator`, s-axxezge5duzemgs, agreed 2026-11-25) states. This settles group 7's base question 8, formerly question 17 of this file.

**The change:** s-axxezge5duzemgs gains an `implements` link to s-wxcmpbvy9bzkfj9. A link changes no status. The node's consistency mark becomes ✓. No rule of the base changes.

Report line: «Узел о валидаторе RuntimeChecks получил связь `implements` с правилом 12.4, которое уже требует отвергать запись с неверным `format`; правила базы не менялись.»

### 1.3 "carries no SpecTag" becomes "that no SpecTag binds" in rules 1.3.2, 10.6 and 10.7

**Follows from:** the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a, which proposal 2.6 carries out in rule 9.5. These rules restate rule 9.5 in its earlier wording. Proposal 2.7 rewrites, without the phrase "carries no SpecTag", rule 1.3.3's reason, which also restated rule 9.5. The second example of rule 10.6, about two symbols that "have no SpecTag", stays as it is: such symbols are among those that no SpecTag binds.

**The changes:**
- rule 1.3.2 (s-utvqbypzhmgndug), its first item: "…and the checks give no warning about code that is outside the commit and carries no SpecTag (§s-kkbqcb9xrpaepwn)." becomes "…and the checks give no warning about code that is outside the commit and that no SpecTag binds (§s-kkbqcb9xrpaepwn)."; Russian «…и проверки не предупреждают о коде за пределами коммита без SpecTag (§s-kkbqcb9xrpaepwn).» becomes «…и проверки не предупреждают о коде, который находится за пределами коммита и не привязан ни одним SpecTag (§s-kkbqcb9xrpaepwn).»;
- rule 10.6 (s-qzthyh7yqvfhsa2), its text: "for example a symbol without a SpecTag (§s-8xw4mgvpexyvw5q)" becomes "for example a symbol that no SpecTag (§s-8xw4mgvpexyvw5q) binds"; Russian «например, символ без SpecTag» becomes «например, символ, который не привязан ни одним SpecTag»;
- rule 10.6, its reason: "Old code without a SpecTag may still work correctly" becomes "Old code that no SpecTag binds may still work correctly"; Russian «Старый код без SpecTag может работать правильно» becomes «Старый код, который не привязан ни одним SpecTag, может работать правильно»;
- rule 10.7 (s-q3pfzyaxvpr2zj2), its first example: "Under the rule on code without a SpecTag (§s-kkbqcb9xrpaepwn), code that a commit does not change and that carries no SpecTag makes the checks refuse the commit." becomes "Under the rule on code that no SpecTag binds (§s-kkbqcb9xrpaepwn), code that a commit does not change and that no SpecTag binds makes the checks refuse the commit."; Russian «По правилу о коде, который не привязан ни одним SpecTag (§s-kkbqcb9xrpaepwn), код, который коммит не меняет и который не привязан ни одним SpecTag, тогда приводит к тому, что проверки отклоняют этот коммит.»

Report line: «В правилах 1.3.2, 10.6 и 10.7 «без SpecTag» заменено на «не привязан ни одним SpecTag», как в правиле 9.5 по вашим решениям от 2026-11-17.»

### 1.4 The same rename in four agreed nodes of the appendix of the tools

**Follows from:** the same rulings of 2026-11-17 as in 1.3. These nodes name rule 9.5, or its check, in the earlier wording. Reviewer A of round b found them.

**The changes:**
- s-3xx2eukc8gtd2tx (`new:tools-7-2-outside`), its text: "…as the rule on code and tests without a SpecTag (§s-5z5gnu7pahr82xp) requires (§s-kkbqcb9xrpaepwn):" becomes "…as the rule requires (§s-kkbqcb9xrpaepwn) for code and tests that no SpecTag (§s-5z5gnu7pahr82xp) binds:"; Russian «…так, как требует (§s-kkbqcb9xrpaepwn) правило о коде и тестах, которые не привязаны ни одним SpecTag (§s-5z5gnu7pahr82xp):»;
- s-3xx2eukc8gtd2tx, its reason: "The approval status and the `strict` flag decide what code without a SpecTag outside the commit costs the commit: nothing, a warning or a refusal." becomes "The approval status and the `strict` flag decide what code that is outside the commit, and that no SpecTag binds, costs the commit: nothing, a warning or a refusal."; Russian «Статус одобрения и флаг `strict` определяют, чего стоит коммиту код, который находится за пределами коммита и не привязан ни одним SpecTag: ничего, предупреждения или отказа.»;
- s-weuyx98r7c923ab (`proposal:s-weuyx98r7c923ab`), its text: "The check for code without a SpecTag names this command in its warning and in its refusal (§s-kkbqcb9xrpaepwn)." becomes "The check for such code names this command in its warning and in its refusal (§s-kkbqcb9xrpaepwn)."; Russian «Проверка такого кода называет эту команду в своём предупреждении и отказе (§s-kkbqcb9xrpaepwn).»;
- s-weuyx98r7c923ab, its reason: "The check for code without a SpecTag covers all such code in one warning, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn)." becomes "In one warning, the check covers all the code that no SpecTag binds, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn)."; Russian «Проверка сообщает обо всём коде, который не привязан ни одним SpecTag, одним предупреждением, чтобы оно не заслоняло другие находки (§s-kkbqcb9xrpaepwn).»;
- s-chsfpkgpmfk4fft (`new:tools-2-settings`): "the check for code without a SpecTag" becomes "the check for code that no SpecTag binds"; Russian «- `sheriff untagged` — для проверки кода, который не привязан ни одним SpecTag (§s-weuyx98r7c923ab);»;
- s-f5rz6b7dhxejjts (`proposal:s-f5rz6b7dhxejjts-g7`): "symbols of the system's code that have no SpecTag (§s-8xw4mgvpexyvw5q)" becomes "symbols of the system's code that no SpecTag (§s-8xw4mgvpexyvw5q) binds"; Russian «…перечисляет символы кода системы, которые не привязаны ни одним SpecTag (§s-8xw4mgvpexyvw5q), каждый с его файлом (§s-weuyx98r7c923ab);».

Report line: «В четырёх согласованных узлах описания инструментов «без SpecTag» заменено на «не привязан ни одним SpecTag», как в правиле 9.5.»

---

## 2. Proposals that carry out a decision already made

Each is shown to the owner as one complete new wording, with a Russian `change` field. A proposal is not checked by specsheriff-rule-reviewer where it only carries out a decision, as `.claude/vt/rules.md` says. A proposal with a wording of its own goes to specsheriff-rule-reviewer first; here, what goes to specsheriff-rule-reviewer is proposal 2.9 and the reasons in proposals 2.3, 2.6 and 2.7. Where a change touches a node that contains a sentence that breaks a rule on how a node is written, the new wording brings that sentence into line with the rule, as the owner's rule "An agreed node is brought into line with the rules when it changes, never in a sweep" says. Such sentences are marked in the `change` field.

### 2.1 Rule 13.1, "The human-readable export" (s-ce24ynwabt5yx8h, `_guidelines/extensions/views/13.1`)

**Decision carried out:** group 7, question 1, option A (the owner, 2026-11-25, «А.», in answer to «Согласны с группой 7 и с вариантом А в обоих вопросах?»): a node that has no title, such as a node in a cell of a `TableRule`, is labelled with its location, and a link names it by its sid and its location. Group 7's base questions 5 and 9 are merged here.

**As it stands:** "It shows each link with the node at the link's other end: that node's sid, location (§s-kag2m9tzdnduxdx) and title."

**New wording** (the reason and the example stay as they are):

> The human-readable export is the specification written for a person to read, for example in Markdown. It contains every node with every value that the node's file holds for that node. It shows each link with the node at the link's other end: that node's sid, location (§s-kag2m9tzdnduxdx) and title. Where that node has no title, such as a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6), the export shows only its sid and location.
>
> The export keeps the order and the nesting of the nodes: each node is followed by its children, nested under it.

Russian of the changed paragraph: «Читаемый экспорт — это спецификация, записанная для чтения человеком, например в Markdown. Он содержит каждый узел со всеми значениями, которые хранит для этого узла его файл. Каждую связь он показывает с sid, расположением (§s-kag2m9tzdnduxdx) и заголовком узла на другом конце этой связи. Если у этого узла нет заголовка, как у узла в ячейке `TableRule` (§s-5fewsp22mmdz7y6), экспорт показывает только его sid и расположение.»

Links: a new `cites` link to s-5fewsp22mmdz7y6.

`change`: «Новое предложение: узел без заголовка, например узел в ячейке `TableRule`, экспорт показывает в связи только по sid и расположению. Так вы решили на странице группы 7 (вопрос 1, вариант А, 2026-11-25).»

Decision for `meta.decisions`: date 2026-11-25; problem "The rule named the node at the other end of a link by its title, but a node in a cell of a `TableRule` has no title."; ruling "The owner chose option A of the question on how a node that has no title is shown and named («А.»): such a node is named by its sid and its location."; type textual.

### 2.2 Rule 13.2, "The map of the specification" (s-zu8ne3wq84zchc4, `_guidelines/extensions/views/13.2`)

**Decision carried out:** the same as in 2.1.

**New wording** (the reason and the example stay as they are):

> The map is the specification seen from above. It is drawn from the nodes and holds no facts of its own.
>
> The map shows only the title and the approval status (§s-tgrnpagrb58tya7) of each node, nested as the nodes are nested in the specification. It labels a node that has no title, such as a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6), with its location (§s-kag2m9tzdnduxdx). A branch of the map can be opened and closed, so that a reader goes to the part they came for while the rest of the map stays in view.
>
> The top-level branches of the map appear in this order: the guidelines, the appendix of the tools, the base specification and the technical appendix (§s-qmmzf9nksfsa3qp).

The Russian text of the new sentence: «Узел без заголовка, например узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6), карта подписывает расположением (§s-kag2m9tzdnduxdx).» The Russian of the sentence about a branch of the map stays as it is.

Links: new `cites` links to s-5fewsp22mmdz7y6 and s-kag2m9tzdnduxdx.

`change`: «Новое предложение: узел без заголовка, например узел в ячейке `TableRule`, карта подписывает расположением. Так вы решили на странице группы 7 (вопрос 1, вариант А, 2026-11-25). В предложении о ветке карты поправлен только английский текст; смысл тот же.»

Decision for `meta.decisions`: date 2026-11-25; problem "The map showed each node's title, but a node in a cell of a `TableRule` has no title."; ruling "The owner chose option A of the question on how a node that has no title is shown and named («А.»): the map labels such a node with its location."; type textual.

Integrity: rule 8.6 says that a node in a cell "has no title of its own. Its column and its row name it". The second of those sentences says what identifies the node within its table, and stays true. The agreed drafts s-k4nqjr96ux7a5m7 and s-rpv4fkdqqguptqd already carry out the decision.

### 2.3 Rule 10.12, "The order in which tools and checks run on a commit and on a push" (s-pcnyfp7gev7syax, `_guidelines/spec/10.12`)

**Decision carried out:** group 8, question 1, option A (the owner, 2026-11-25, «А», in answer to «Согласны с группой 8 и с вариантом А во всех трёх вопросах?»): the pre-commit hook runs the project's own tools that change no file before `sheriff validate`, and rule 10.12 says "before any other check" instead of "right after the first step".

**As it stands:** the agreed wording of `proposal:s-pcnyfp7gev7syax-g4` (agreed 2026-11-24).

**New wording in full:**

> On a commit and on a push, the project's own tools, the SpecSheriff tools and the checks run in the following steps:
> 1. the tools that rewrite files: first the project's own tools of that kind that its own guidelines (§s-u7tw6m8npxmv5tu) list, such as formatters, and then the generators, both those of the SpecSheriff tools and the project's own (§s-km4x4s26kv7pjze);
> 2. the project's own checks (§s-2fau85dfyyeq66m) and the rest of the project's own tools, each of which leaves the files as they were, except for those that git ignores;
> 3. the checks of the SpecSheriff guidelines (§s-jau82aq9juv9zzh).
>
> After the first step, nothing changes what the commit contains. Each step runs regardless of what the earlier steps found. The commit or the push goes through only if every check passes and no tool fails.
>
> On a commit, as an exception to the steps above, the following checks run after the first step and before any other check:
> - the check that, in each object (§s-d5cgda5bdsn7bzy) of a file of the specification, of its archive (§s-f2b5zvc565s242f) or of its schema (§s-eferktypcj7njt5), each key is written only once;
> - the check that every file of the specification complies with its JSON Schema (§s-emrfpzw2d5bgb6x).
>
> The project's own checks and the other checks of the SpecSheriff guidelines run only after these checks have passed.
>
> Where the SpecSheriff tools cannot run, the project's own tools still run. The commit or the push then goes through unless one of them fails. Whoever makes the commit or the push is told that no SpecSheriff check ran.
>
> **Reason:** A project may run tools of its own on a commit or a push, such as a scan that checks that nothing internal reaches a public repository. Adopting SpecSheriff must not stop them, even where the SpecSheriff tools cannot run, for example on a machine without the SpecSheriff plugin. A team that needs the checks that the git hooks run to apply to everyone runs them in CI.
>
> The order lets every check rely on what it reads: files in their final form and, where it reads nodes, nodes whose structure has passed the structure checks.
>
> **Example:** A project's own guidelines list a formatter. On a commit, the formatter rewrites the files in the commit first, and the generators of the SpecSheriff tools then write their files. A scan for secrets, one of the project's own tools for the pre-commit hook, runs next. The checks that each key is written only once in each object and that each file complies with its JSON Schema follow, and the other checks of the SpecSheriff guidelines run last, on the final files.

Russian of what changes:
- «При коммите и при push собственные инструменты проекта, инструменты SpecSheriff и проверки запускаются по следующим шагам:»
- «При коммите, в виде исключения из описанных выше шагов, следующие проверки выполняются после первого шага и раньше любой другой проверки:»
- the reason's first paragraph, its second sentence: «Переход на SpecSheriff не должен их останавливать, даже там, где инструменты SpecSheriff не могут запуститься, например на машине без плагина SpecSheriff.»
- the reason's second paragraph: «Порядок позволяет каждой проверке полагаться на то, что она читает: на файлы в окончательном виде, а если она читает узлы, — на узлы, структура которых уже прошла проверки структуры.»
- the example: «Собственные guidelines проекта перечисляют форматтер. При коммите форматтер сначала переписывает файлы коммита, а затем генераторы инструментов SpecSheriff записывают свои файлы. Дальше запускается поиск секретов — один из собственных инструментов проекта для хука pre-commit. За ним идут проверки того, что каждый ключ записан в каждом объекте только один раз и что каждый файл соответствует своей JSON Schema, а остальные проверки SpecSheriff guidelines запускаются последними, на окончательных файлах.»

`change`:
- «Было: «…сразу после первого шага выполняются следующие проверки». Теперь: «…выполняются после первого шага и раньше любой другой проверки». Так вы решили на странице группы 8 (вопрос 1, вариант А, 2026-11-25): хук pre-commit запускает остальные собственные инструменты проекта, которые не меняют файлов, до `sheriff validate`. Проверки структуры по-прежнему идут после всего, что переписывает файлы, и раньше любой другой проверки.»
- «Пример: поиск секретов, один из собственных инструментов проекта для хука pre-commit, теперь идёт до проверок структуры, как разрешает это решение.»
- «Приведено к правилам о том, как пишется узел, раз узел всё равно меняется: «в три шага» стало «по следующим шагам», так как правило 7.4.1 запрещает счёт в тексте; второй абзац обоснования разбирал шаги по одному, что запрещает правило об обосновании, и теперь говорит о порядке в целом. В обосновании «the method» стало «SpecSheriff», а «the plugin» — «the SpecSheriff plugin», как в правиле 1.7.1.»

Decision for `meta.decisions`: date 2026-11-25; problem "The pre-commit hook could run the project's own tools that change no file only before `sheriff validate` or only after it, while this rule ran the structure checks right after the first step."; ruling "The owner chose option A («А»): the structure checks run after the first step and before any other check, so the rest of the project's own tools may run before them."; type textual.

Integrity: the agreed `new:tools-6-pre-commit` (s-npnmwyt6s3gypwe) already follows option A.

### 2.4 Rule 10.3, "An agent's edit is checked before it is made" (s-83ev4wwesbwnhnp, `_guidelines/spec/10.3`)

**Decisions carried out:**
- group 8, question 2, option A (the owner, 2026-11-25, «А»): `sheriff guard` judges only a node that the edit adds, or whose wording or approval status it changes;
- the owner's ruling of 2026-11-13 on rule 10.10, which removed the requirements on the tests of a project's own checks. So the second item names the system's code. This was question 6 of the first version, which the reviewers found settled (group 8's base question 1);
- the item in "Found and owed" from group 6 (2026-11-24): "stands" becomes "is in force", in English only.

One node gets one proposal, so all three decisions are in this wording.

**As it stands:** the agreed wording of `proposal:s-83ev4wwesbwnhnp` (agreed 2026-11-24).

**New wording in full** (the reason stays as it is):

> Before an agent's edit is made, the SpecSheriff tools refuse it if it would do any of the following:
> - leave a node approved where the edit adds that node or changes its wording or approval status (§s-tgrnpagrb58tya7) and no approval of that node's wording is in force (§s-5ah25f6gy99panq), unless the node is a section or any other node whose approval status is derived from other nodes;
> - change the system's code (§s-hheus6f395ynqvc), other than its tests, that is written for a rule, including a rule of a project's own kind (§s-vsh384ybt4w25a2), while no test has that rule's SpecTag (§s-8xw4mgvpexyvw5q, §s-rah8b37kytb682y);
> - change the approvals, or the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) or its `strict` flag (§s-q3pfzyaxvpr2zj2), or the record of the extensions that the project has chosen (§s-9ttvcwpqkehm58g), other than through the procedures that record or withdraw them.
>
> The refusal before an edit applies only to an edit whose request names the files it writes to and what it writes to them. A shell command names neither.

Russian of the changed items:
- «оставила бы одобренным узел, который она добавляет или у которого меняет формулировку или статус одобрения (§s-tgrnpagrb58tya7), если на формулировку этого узла нет одобрения в силе (§s-5ah25f6gy99panq), кроме раздела и любого другого узла, статус одобрения которого выводится из других узлов;»
- «изменила бы код системы (§s-hheus6f395ynqvc), кроме её тестов, написанный для правила, в том числе для правила собственного типа в проекте (§s-vsh384ybt4w25a2), пока ни у одного теста нет SpecTag этого правила (§s-8xw4mgvpexyvw5q, §s-rah8b37kytb682y);»

Links: a new `cites` link to s-hheus6f395ynqvc.

`change`:
- «Первый пункт. Было: «оставила бы узел одобренным при формулировке, на которую нет одобрения в силе…». Теперь проверка касается только узла, который правка добавляет или у которого меняет формулировку или статус одобрения. Так вы решили на странице группы 8 (вопрос 2, вариант А, 2026-11-25): правка, которая оставляет узел как был, не принимает за ответственных никакого решения. По-английски «stands» стало «is in force», как в строке 10.1.8; по-русски и было «в силе».»
- «Второй пункт. Было: «код, написанный для правила». Теперь: «код системы, кроме её тестов». Ваше решение от 2026-11-13 о правиле 10.10 сняло требования к тестам собственных проверок проекта. С 2026-11-17 SpecTag может стоять и в собственных инструментах репозитория, но называет там только правило guidelines; правило 10.3 теста, написанного первым, для такого кода не требует. Согласованный узел о `sheriff guard` уже так и проверяет.»

Decisions for `meta.decisions`:
- date 2026-11-25; problem "Read literally, the rule refused an edit after which any node of the specification was approved with a wording for which no approval was in force, even a node that the edit left as it was."; ruling "The owner chose option A («А»): the refusal applies only to a node that the edit adds, or whose wording or approval status it changes, since an edit that leaves a node as it was makes no decision that only the owners may make."; type textual;
- date 2026-11-13; problem "Following the owner's ruling of 2026-11-04 on the rule on where a SpecTag may appear (s-sfjka4zc4rhfu67), the rule required a test written first for the code of a project's own checks and generators."; ruling "Carrying out the owner's ruling of 2026-11-13 on the rule on where a SpecTag may appear (s-sfjka4zc4rhfu67), which removed the requirements on the tests of a project's own checks: the rule requires a test written first only for the system's code, other than its tests."; type textual.

Integrity and risk: the agreed `s-st6td4mua9uqt9z` ("An edit judged before it is made") already says both: `sheriff guard` judges only a node that the edit adds or changes, and it judges only the system's code, other than tests. In this repository, the practice of writing the tools' tests first therefore rests only on the owner's choice of 2026-10-28 in `CLAUDE.md`, and no guard enforces it. This risk is reported to the owner in one line.

### 2.5 Rule 10.2, "When the checks run" (s-epaw9sgyaajzn8g, `_guidelines/spec/10.2`)

**Decisions carried out:** the owner's agreement to rule 10.12 (`proposal:s-pcnyfp7gev7syax-g4`, 2026-11-24) and to row 10.1.37b (`proposal:row-10-1-37b`, s-yn5tdx2bp4f5rq7, 2026-11-25). Rule 10.12 has the project's own tools run on a push, and row 10.1.37b checks on a push what they change, regardless of the specification's approval status. For a push, rule 10.2 names only the tests (the item in "Found and owed" from the review of group 8, 2026-11-25).

**New wording in full** (the reason stays as it is):

> The SpecSheriff tools run the checks at these moments:
> - before an agent's edit is made: the checks that can tell from the edit itself that it would break a rule, and that refuse it (§s-83ev4wwesbwnhnp);
> - after each edit by an agent: every check that needs neither a commit message nor a run of the tests, from the main table of checks (§s-jau82aq9juv9zzh) or from the table of checks of an extension;
> - on a commit: every check in those tables except the tests and the review;
> - on a commit for which the list of the reviewer's judgements (§s-m4h279nbaqkpa3t) names at least one judgement: also the review, in which an independent reviewer makes every judgement that the list names for that commit;
> - on a push: the check that each of the project's own tools that run after the tools that rewrite files, other than the project's own checks (§s-2fau85dfyyeq66m), leaves the commit message, what is staged and the working tree as they were, except for the files that git ignores (§s-yn5tdx2bp4f5rq7);
> - on a push, where the project's own guidelines (§s-u7tw6m8npxmv5tu) name a push as the moment at which the tests run, and as long as the specification has the status `approved`: the tests of the system's code and of the project's own checks and generators;
> - before the approval procedure records an approval of the specification: the checks that the rule on the specification's approval status names (§s-qzthyh7yqvfhsa2), run over the whole specification and all of the system's code.
>
> After an agent's edit, the SpecSheriff tools tell the agent what the checks refuse.

Russian of the changed items:
- «при push — проверка того, что каждый собственный инструмент проекта, который выполняется после инструментов, переписывающих файлы, кроме собственных проверок проекта (§s-2fau85dfyyeq66m), оставляет сообщение коммита, то, что находится в стейджинге, и рабочее дерево такими, какими они были, кроме файлов, которые git игнорирует (§s-yn5tdx2bp4f5rq7);»
- «при push, если собственные guidelines проекта (§s-u7tw6m8npxmv5tu) называют push моментом запуска тестов, и пока спецификация имеет статус `approved`, — тесты кода системы и собственных проверок и генераторов проекта;»

Links: new `cites` links to s-yn5tdx2bp4f5rq7 and s-2fau85dfyyeq66m.

`change`: «Было: при push — только тесты. Добавлен отдельный пункт: при push запускается и проверка строки 10.1.37b — что собственные инструменты проекта, которые выполняются после инструментов, переписывающих файлы, оставляют сообщение коммита, стейджинг и рабочее дерево как были. С этой строкой вы согласились в группе 8 (2026-11-25), а правило 10.12, с которым вы согласились в группе 4, запускает эти инструменты и при push. Эта проверка идёт при любом статусе спецификации, поэтому условие о статусе `approved` осталось только в пункте о тестах.»

Decision for `meta.decisions`: date 2026-11-25; problem "The list named only the tests among the checks that run on a push, while rule 10.12 runs the project's own tools on a push and row 10.1.37b checks what they change."; ruling "Carrying out the owner's agreement to rule 10.12 (2026-11-24) and to row 10.1.37b (2026-11-25): the check of row 10.1.37b is listed among the checks that run on a push."; type textual.

Integrity: read literally, the item for the moment after an agent's edit also covers row 10.1.37b, since that check needs neither a commit message nor a run of the tests. None of a project's own tools for a git hook runs after an edit, so the check has nothing to examine there.

### 2.6 Rule 9.5, "Code and tests without a SpecTag" (s-kkbqcb9xrpaepwn, `_guidelines/spec/9.5`)

**Decisions carried out:** the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a: code or a test that a commit leaves unchanged is treated as rule 9.5 says, whether it carries no SpecTag or carries only SpecTags that bind nothing, such as one that names a section. The agreed `proposal:s-weuyx98r7c923ab` (`sheriff untagged`, agreed 2026-11-24) already lists "the system's code … that no SpecTag binds". Group 2's notes, item 15, found that rule 9.5 still says "carries no SpecTag". Proposal 2.8 says in rule 1.5.2 which SpecTags bind code and which do not. Changes 1.3 and 1.4 make the same rename in the nodes that restate rule 9.5 or name its check.

**New wording in full:**

> **Title:** Code and tests that no SpecTag binds
>
> The checks treat code that is outside the commit, and that no SpecTag (§s-8xw4mgvpexyvw5q) binds, as follows:
> - while the specification is a draft, the commit passes without a warning;
> - while the specification is approved and its `strict` flag (§s-q3pfzyaxvpr2zj2) is off, the commit passes, and a single warning for all such code says that such code exists;
> - while the specification is approved and its `strict` flag is on, the commit is refused.
>
> Code outside the commit means the system's code that the commit leaves unchanged, tests included. The warning in the second case and the refusal in the third each name the command of the SpecSheriff tools that lists that code by file and symbol.
>
> **Reason:** Code and tests written before their rules may have no SpecTag that binds them and still work correctly. Refusing every commit while such code exists would stop all work until all of it was bound to rules. So the owners decide when such code is reported, by approving the specification, and when it must be bound, by turning its `strict` flag on.
>
> **Examples:**
> - The specification is approved, and its `strict` flag is off. A commit changes one file, whose symbols all carry SpecTags, while two old files elsewhere carry none. The commit passes, and the checks warn once that no SpecTag binds some code outside the commit, naming the command that lists that code. Were the specification a draft, the same commit would pass with no warning. The most likely mistake is to refuse the commit because of the two old files, or to list their symbols in the warning.
> - An old function carries a SpecTag that names the section holding the rules it implements. That SpecTag binds nothing, so while the specification is approved and its `strict` flag is off, a commit that leaves the function unchanged passes with the warning. The most likely mistake is to treat the function as bound because it carries a SpecTag.

Russian:
- title «Код и тесты, которые не привязаны ни одним SpecTag»;
- first sentence «Код, который находится за пределами коммита и не привязан ни одним SpecTag (§s-8xw4mgvpexyvw5q), проверки обрабатывают так:»; the items and the second paragraph keep their Russian;
- reason «Код и тесты, написанные раньше своих правил, могут быть не привязаны ни одним SpecTag и при этом работать правильно. Если отклонять каждый коммит, пока такой код есть, вся работа остановится, пока весь этот код не привяжут к правилам. Поэтому ответственные решают, когда о таком коде сообщают, — одобряя спецификацию, и когда его нужно привязать, — включая её флаг `strict`.»;
- the first example: «…и проверки один раз предупреждают, что за пределами коммита есть код, не привязанный ни одним SpecTag, и называют команду, которая выводит этот код. Будь спецификация черновиком, тот же коммит прошёл бы без предупреждения. Самая вероятная ошибка — отклонить коммит из-за двух старых файлов или перечислить их символы в предупреждении.»;
- the second example: «У старой функции есть SpecTag, который называет раздел с правилами, которые она реализует. Этот SpecTag ничего не привязывает, поэтому, пока спецификация одобрена, а её флаг `strict` выключен, коммит, который не меняет эту функцию, проходит с предупреждением. Самая вероятная ошибка — считать функцию привязанной, потому что у неё есть SpecTag.»

Links: the reason no longer cites s-qzthyh7yqvfhsa2, so that `cites` link is removed unless another field cites it.

`change`:
- «Было: «код … без SpecTag». Теперь: «код, который не привязан ни одним SpecTag». По вашим решениям от 2026-11-17 о строках 10.1.26 и 10.1.26a это правило действует и на код, SpecTag которого ничего не привязывают, например SpecTag, который называет раздел. Так уже говорит согласованный узел о `sheriff untagged`. Заголовок и первый пример приведены к тем же словам.»
- «Обоснование приведено к правилам о том, как пишется узел, раз узел всё равно меняется: прежнее разбирало три случая текста по одному, что запрещает правило об обосновании. Новое говорит, зачем правило в целом.»
- «Первый пример: последнее предложение теперь называет самую вероятную ошибку. Новый второй пример показывает случай, ради которого приняты решения от 2026-11-17: SpecTag, который называет раздел.»

Decision for `meta.decisions`: date 2026-11-17; problem "The rule covered only code that carries no SpecTag, while the rulings on rows 10.1.26 and 10.1.26a give the same result to code whose SpecTags bind nothing."; ruling "Carrying out the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a: the rule covers code outside the commit that no SpecTag binds."; type textual.

### 2.7 Rule 1.3.3, "When the status is approved" (s-9g7jj8z4yf9kq93, `_guidelines/spec/1.3.3`)

**Decisions carried out:** the item in "Found and owed" from group 6 (2026-11-24), "stands" becoming "is in force", in English only. The agreed reason also restated rule 9.5 in the wording that change 1.3 replaces; the new reason no longer restates it. The agreed reason justifies the items of the text one by one, which the rule on reasons forbids, so the proposal brings it into line with that rule, and the change to rule 1.3.3 is a proposal rather than a change made without asking.

**New wording in full:**

> The specification, a section and a rule have different conditions for being approved:
> - The specification as a whole is approved if an owner has carried out the approval procedure by hand (§s-qzthyh7yqvfhsa2).
> - A section is approved while every rule in it is approved (§s-9kfdycuq34beqvs). Nobody approves the section itself.
> - A rule is approved while an approval of its current wording is in force (§s-5ah25f6gy99panq).
>
> **Reason:** The status `approved` claims that an owner, or an agent on an owner's behalf as the rule on such approvals allows (§s-t5uw8zfxzhfdg86), has agreed to what the status covers. So the status holds only while that agreement holds. A section states no requirement of its own, so an owner has nothing in it to agree to beyond its rules.

Russian of what changes:
- the third item: «Правило одобрено, пока в силе одобрение его нынешней формулировки (§s-5ah25f6gy99panq).» (unchanged);
- the reason: «Статус `approved` утверждает, что ответственный или агент от его имени, как позволяет правило о таких одобрениях (§s-t5uw8zfxzhfdg86), согласился с тем, к чему этот статус относится. Поэтому статус действует, только пока действует это согласие. Раздел сам ничего не требует, поэтому ответственному не с чем в нём соглашаться, кроме его правил.»

Links: the reason no longer cites s-m4h279nbaqkpa3t and s-kkbqcb9xrpaepwn, so those `cites` links are removed. Group 3's technical replacement of s-m4h279nbaqkpa3t by s-x8uzc8z44pwtd3h in this reason then has nothing to replace.

`change`:
- «Третий пункт: по-английски «stands» стало «is in force», как в строке 10.1.8; по-русски и было «в силе». Во втором пункте поправлен только английский текст.»
- «Обоснование приведено к правилам о том, как пишется узел, раз узел всё равно меняется: прежнее обосновывало пункты текста по одному, что запрещает правило об обосновании. Новое говорит, что утверждает статус, и сохраняет согласованную вами 2026-11-20 мысль об агенте, который одобряет от имени ответственного. Фраза о коде за пределами коммита ушла вместе с прежним обоснованием.»

Decision for `meta.decisions`: none; the change to the English word is a replacement, and the change to the reason records no new ruling.

### 2.8 Rule 1.5.2, "How code is bound to its rules" (s-kgbzk2ph9e6jfb4, `_guidelines/spec/1.5.2`)

**Decisions carried out:** the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a, which proposal 2.6 carries out. Under rule 1.5.2, a SpecTag before a symbol "binds that symbol", so a symbol whose SpecTag names a section counts as bound, and the case that the rulings target escapes rule 9.5. The agreed s-9rtrj24myzjvshu already says that a SpecTag that names a section binds nothing. Rule 1.5.2 says that code that implements no rule has a SpecTag that says so, but neither it nor rule 9.3, under which a SpecTag binds a rule to code, says whether that SpecTag binds the code. The agreed appendix (s-33fw3ga4ctd94dq, s-9rtrj24myzjvshu) treats a SpecTag that says that code implements no rule as one that binds that code. Reviewer A of the first review found this gap.

**As it stands:** the agreed wording of `proposal:s-kgbzk2ph9e6jfb4` (agreed 2026-11-24).

**The two paragraphs that change** (everything else stays as it is, unless the owner chooses otherwise in questions 4.3 and 4.4):

> The system's code (§s-hheus6f395ynqvc) other than tests is bound by SpecTags (§s-8xw4mgvpexyvw5q) to the rules it implements. Code that implements no rule has a SpecTag that says so, and that SpecTag binds the code too.

> A SpecTag before a symbol binds that symbol and every symbol nested in it. SpecTags at the start of a file, and an entry in the bindings file, bind the whole file. A SpecTag that names a node that is not a rule, such as a section, binds nothing. A change anywhere in a file bound as a whole is a change to the code its SpecTags bind. The only exception is an edit that changes no code (§s-9j2mmnuuwmx5ksn): an edit to a comment that leaves its SpecTags as they are, or to whitespace that does not affect what the code does.

Russian:
- the first paragraph, which keeps its agreed Russian and gains one clause: «Код системы (§s-hheus6f395ynqvc) помимо тестов привязан к правилам, которые он реализует, с помощью SpecTag (§s-8xw4mgvpexyvw5q). У кода, который не реализует никакого правила, есть SpecTag, который говорит об этом, и этот SpecTag тоже привязывает код.»
- the new sentence of the third paragraph, after «SpecTag в начале файла и запись в файле привязок привязывают весь файл.»: «SpecTag, который называет узел, не являющийся правилом, например раздел, ничего не привязывает.»

`change`: «Меняются два абзаца. В первом: SpecTag, который говорит, что код не реализует никакого правила, тоже привязывает этот код. В третьем, где сказано, что привязывает SpecTag, новое предложение: SpecTag, который называет не правило, например раздел, ничего не привязывает. Без них правило 9.5 по вашим решениям от 2026-11-17 о строках 10.1.26 и 10.1.26a не охватило бы код, SpecTag которого называет раздел, и охватило бы код с SpecTag о том, что правила нет. Так уже говорит согласованное описание инструментов. Согласованный русский текст первых двух предложений сохранён.»

Decision for `meta.decisions`: date 2026-11-17; problem "Under this rule a SpecTag before a symbol bound that symbol whatever it named, so code whose SpecTag names a section counted as bound, and the rule did not say whether a SpecTag saying that code implements no rule binds that code."; ruling "Carrying out the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a: a SpecTag that names a node that is not a rule binds nothing, and a SpecTag that says the code implements no rule binds that code."; type textual.

### 2.9 Terms that only one domain needs: rule 3.2, row 10.1.6, and a rule and two rows of the Domains extension

**Decision carried out:** the owner's decision of 2026-11-12, recorded on row 10.1.6 (s-7kc8dw7zdz63q53): "The extension for domains extends it: a term that several domains need is defined in the contracts section, and a term that one domain needs is defined in that domain." Since 2026-11-16 an extension no longer changes a rule of the guidelines (rule 1.7.2), so rule 3.2 and row 10.1.6 must allow it first. The review of `new:tools-7-1-term-contracts` (s-yauyedny2yzvs4c) deferred this on 2026-11-22 (`t25-one-thought.md`, line 79), and that agreed node holds a todo to the same effect.

The note of 2026-11-12 left one point open: whether a term in the contracts section that only one domain needs is an error. That point is question 4.6. The wordings below follow its recommended answer, B, under which such a term is refused. Under answer A:
- rule 3.2 says "may instead let one of the parts … define the terms that no other part of the base specification needs";
- the new Domains rule opens with "A term may be defined in a domain (§s-ypa92gpcj3f5zj8) if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it (§s-vj7ercem526zd6v).";
- its reason becomes "A term that only one domain needs belongs to that domain's subject area, so a reader finds it beside the rules that need it.";
- the second row of table 11.3 is not added.

These wordings are new, so each is sent to specsheriff-rule-reviewer before the owner sees it.

**Rule 3.2** (s-ypa92gpcj3f5zj8), now titled "A term is defined once, in the contracts section". New wording:

> **Title:** A term is defined once
>
> Where a section needs terms of its own, they are added to the contracts section. An extension of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g) may instead require one of the parts into which the base specification is divided (§s-qmmzf9nksfsa3qp) to define the terms that no other part of the base specification needs. Wherever it is defined, a term is defined once: one term that names two things is refused, and so are two terms that name the same thing.
>
> **Reason:** A term that is defined once, in a place where every rule that needs it can cite it, means the same thing in each of those rules.

Russian: заголовок «Термин определяется один раз»; текст «Если разделу необходимы собственные термины, их добавляют в контракты. Выбранное проектом расширение guidelines (§s-9ttvcwpqkehm58g) может вместо этого требовать, чтобы одна из частей, на которые разделена базовая спецификация (§s-qmmzf9nksfsa3qp), определяла термины, которые не нужны никакой другой части базовой спецификации. Где бы термин ни был определён, он определяется один раз: один термин, называющий две вещи, или два термина, называющие одну, отклоняются.»; обоснование «Термин, определённый один раз там, где на него могут сослаться все правила, которым он нужен, означает в каждом из них одно и то же.»

Links: new `cites` links to s-9ttvcwpqkehm58g and s-qmmzf9nksfsa3qp.

`change`: «Новое предложение: выбранное расширение guidelines может потребовать, чтобы часть базовой спецификации определяла термины, которые не нужны никакой другой её части. Так исполняется ваше решение от 2026-11-12, записанное на строке 10.1.6, для расширения Domains; расширение не может отменить это правило (правило 1.7.2), поэтому правило должно само это допускать, не называя расширения (правило 1.7.3). Заголовок больше не говорит «в контрактах», так как это теперь не единственное место. Обоснование заменено: прежнее говорило о разделе, который придумывает собственные слова, а это новое предложение теперь допускает. Согласованный русский текст первого предложения сохранён; в последнем предложении поправлен только английский текст.»

**Row 10.1.6** (s-7kc8dw7zdz63q53), now "Every term node of the specification is in the contracts section | refused". New wording:

> **What is checked:** Every term node of the specification is in the contracts section, or in a part of the base specification where a chosen extension of the guidelines allows terms to be defined (§s-ypa92gpcj3f5zj8)
>
> **On failure:** refused

Russian: «Каждый узел-термин спецификации находится в разделе контрактов или в части базовой спецификации, где выбранное расширение guidelines позволяет определять термины (§s-ypa92gpcj3f5zj8) | отвергается»

Links: none added. The row's `checks` link to s-ypa92gpcj3f5zj8 covers the new citation.

`change`: «Добавлено второе место для термина — часть базовой спецификации, где выбранное расширение позволяет определять термины, как теперь говорит правило 3.2.»

**A new rule of the Domains extension**, in section 11.1 after rule 11.1.5, with a `refines` link to s-ypa92gpcj3f5zj8 and `cites` links to s-vj7ercem526zd6v and s-z6tq6a3btnvvwx7:

> **Title:** A term defined in a domain
>
> A term is defined in a domain (§s-ypa92gpcj3f5zj8) if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it (§s-vj7ercem526zd6v). Before any other node cites such a term or links to it, whoever writes that citation or link moves the term to the contracts section (§s-z6tq6a3btnvvwx7).
>
> **Reason:** A term that only one domain needs belongs to that domain's subject area, so the contracts section keeps only what the domains share.
>
> **Example:** The domain of users defines the term "account", which only its own rules and the part of the technical appendix named after it cite. A rule of the domain of requests then needs the term. Whoever writes that rule moves the term to the contracts section before the rule cites it. The most likely mistake is to define the term again in the domain of requests.

Russian: заголовок «Термин, определённый в домене»; текст «Термин определяется в домене (§s-ypa92gpcj3f5zj8), если на него ссылается или с ним связан хотя бы один узел и каждый такой узел находится в этом домене или в части технического приложения, названной по нему (§s-vj7ercem526zd6v). Прежде чем любой другой узел сошлётся на такой термин или свяжется с ним, тот, кто пишет эту ссылку или связь, переносит термин в раздел контрактов (§s-z6tq6a3btnvvwx7).»; обоснование «Термин, который нужен только одному домену, принадлежит предметной области этого домена, поэтому раздел контрактов содержит только то, что домены делят между собой.»; пример «Домен пользователей определяет термин «учётная запись», на который ссылаются только его собственные правила и часть технического приложения, названная по нему. Затем этот термин понадобился правилу домена заявок. Тот, кто пишет это правило, переносит термин в раздел контрактов, прежде чем правило сошлётся на него. Самая вероятная ошибка — определить этот термин второй раз в домене заявок.»

Decision for `meta.decisions`: date 2026-11-12; problem "It was not settled where a term is defined when the base specification is divided into domains."; ruling "The owner: a term that several domains need is defined in the contracts section, and a term that one domain needs is defined in that domain."; type textual.

`change`: «Новое правило: так исполняется ваше решение от 2026-11-12. Термин определяется в домене, если на него ссылается хотя бы один узел и каждый такой узел находится в этом домене или в части технического приложения, названной по нему; эта часть тоже может на него ссылаться, так как описывает, как реализован домен. Правило 11.1.5 требует, чтобы узел другого домена, который опирается на такой термин, ссылался на него; поэтому до такой ссылки тот, кто её пишет, переносит термин в раздел контрактов.»

**Two new rows of table 11.3**, after row 11.3.6, each with a `checks` link to the new rule and a `cites` link to s-vj7ercem526zd6v.

The first row:

> **What is checked:** Only the nodes of a domain, and those of the part of the technical appendix named after it (§s-vj7ercem526zd6v), cite a term node defined in that domain or link to it
>
> **On failure:** refused

Russian: «На узел-термин, определённый в домене, ссылаются или связаны с ним только узлы этого домена и узлы части технического приложения, названной по нему (§s-vj7ercem526zd6v) | отвергается»

`change` of the first row: «Новая строка: на термин, определённый в домене, ссылаются только узлы этого домена и части технического приложения, названной по нему.»

The second row:

> **What is checked:** A term node is in a domain if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it (§s-vj7ercem526zd6v)
>
> **On failure:** refused

Russian: «Узел-термин находится в домене, если на него ссылается или с ним связан хотя бы один узел и каждый такой узел находится в этом домене или в части технического приложения, названной по нему (§s-vj7ercem526zd6v) | отвергается»

`change` of the second row: «Новая строка: термин в разделе контрактов, на который ссылаются только узлы одного домена и части технического приложения, названной по нему, отвергается, пока его не перенесут в этот домен. Так исполняются слова вашего решения от 2026-11-12: «a term that one domain needs is defined in that domain».»

Other nodes that change: the agreed node s-yauyedny2yzvs4c, as its todo says; one or two nodes of the appendix of the tools, for the two new rows; code and tests in stage 3.

---

## 3. New proposals for agreement

Each is a new or changed wording that no earlier decision settles, but for which the rules leave no real choice, so each is shown as one complete wording, without options. Each still goes to specsheriff-rule-reviewer and to EngStickler's readers before the owner sees it.

### 3.1 A rule on setting a repository up and taking SpecSheriff out of it (formerly question 8)

**The problem.** No rule of the base requires a way to set a repository up, or to take SpecSheriff out of it. The agreed node "Setting a repository up and taking SpecSheriff out of it" (s-7unxytshhc4md54) describes both. Its `implements` links go to rules 10.2, 10.13 and 1.1.6, which say nothing about either procedure. The agreed node on the skill `spec-remove` (s-jn3rauw6a8zeefn) links to rule 2.5 only because the agreed row 10.1.23 requires an `implements` link to some rule (group 8's base question 2; the item in "Found and owed" from group 6). The skill `spec-init`, which the agreed node s-ttsc8tpnu46q53s describes, runs `sheriff init`, but that node has only one `implements` link, to the rule on what the reviewer judges (s-m4h279nbaqkpa3t), since the skill asks for the reviewer's settings. The owner's rule "A defect found is fixed at once" says that the owner is not asked when to fix a defect, so this is shown as a new rule for agreement.

**Where it goes.** Section 10, "The checks and the procedures" (s-m4dxqgfgew9afer), after rule 10.13. Section 10 already holds the procedures that SpecSheriff provides: the approval procedure (10.6), the procedure that turns the `strict` flag on (10.7) and the rule that a procedure writing the specification is idempotent (10.13). Its text, "How a change to the specification or the code is checked, and how a procedure that writes the specification behaves", covers only the procedures that write the specification. So the section's text changes to:

> How a change to the specification or the code is checked, and how the procedures that SpecSheriff provides behave.

Russian: «Как проверяется изменение спецификации или кода и как ведут себя процедуры, которые даёт SpecSheriff.»

A section needs no approval, but the owner sees the change to its text with the rule.

**New wording:**

> **Title:** Setting a repository up and taking SpecSheriff out of it
>
> One procedure of the SpecSheriff tools sets a repository up for those tools, and another takes SpecSheriff out of it. Taking SpecSheriff out removes what setting the repository up wrote outside the specification. It also removes the settings of the SpecSheriff tools that the repository's configuration holds, including the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2), its `strict` flag (§s-q3pfzyaxvpr2zj2) and the extensions that the project has chosen (§s-9ttvcwpqkehm58g). It leaves the specification, the bindings file (§s-kgbzk2ph9e6jfb4), the system's code (§s-hheus6f395ynqvc), and the repository's own tools and their tests as they are.
>
> **Reason:** A project can take up SpecSheriff or stop using it without knowing which files and settings the SpecSheriff tools need, and keeps its specification, which states what its system does, either way.

Russian: заголовок «Настройка репозитория и удаление из него SpecSheriff»; текст «Одна процедура инструментов SpecSheriff настраивает для этих инструментов репозиторий, а другая удаляет из него SpecSheriff. Удаление SpecSheriff убирает то, что настройка репозитория записала вне спецификации. Оно убирает и настройки инструментов SpecSheriff, которые содержит конфигурация репозитория, в том числе записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2), её флаг `strict` (§s-q3pfzyaxvpr2zj2) и выбранные проектом расширения (§s-9ttvcwpqkehm58g). Спецификацию, файл привязок (§s-kgbzk2ph9e6jfb4), код системы (§s-hheus6f395ynqvc), а также собственные инструменты репозитория и их тесты оно оставляет как есть.»; обоснование «Проект может начать или перестать пользоваться SpecSheriff, не зная, какие файлы и настройки нужны инструментам SpecSheriff, и в любом случае сохраняет свою спецификацию, которая говорит, что делает его система.»

Links: `cites` links to s-qzthyh7yqvfhsa2, s-q3pfzyaxvpr2zj2, s-9ttvcwpqkehm58g, s-kgbzk2ph9e6jfb4 and s-hheus6f395ynqvc. In the appendix of the tools, s-7unxytshhc4md54, s-jn3rauw6a8zeefn and s-ttsc8tpnu46q53s gain an `implements` link to the new rule, and s-jn3rauw6a8zeefn has its link to rule 2.5 removed.

`change`: «Новое правило. Согласованный узел описания инструментов о `sheriff init` и `sheriff remove` описывает обе процедуры, но ни одно правило базы их не требует, и его связи `implements` ведут к правилам, которые о них молчат. Правило говорит общими словами то, что удаляет согласованный узел, включая записи о статусе одобрения, флаге `strict` и выбранных расширениях, и то, что он оставляет. Текст раздела 10 расширен с процедур, которые пишут спецификацию, на все процедуры, которые даёт SpecSheriff.»

What a person sees: no change in behaviour. Cost: one new rule, the text of section 10, and four links.

Risk: anyone who runs the removal also removes the entries that only an owner records, as the agreed s-7unxytshhc4md54 already says, so running the setup again leaves the specification a draft until an owner runs the approval procedure. Running the setup again also leaves no extension chosen, although rule 1.7.6 keeps an extension chosen while a node depends on it. Until an owner chooses each such extension again (rule 1.7.5), `sheriff validate` refuses every node of a kind that the extension adds, since the schema is composed only from the chosen extensions (rule 5.1). A draft specification only weakens the checks, and anyone can skip the git hooks anyway, with `git commit --no-verify`.

Russian of the risk: «Риск: тот, кто запускает удаление, удаляет и записи, которые вносит только ответственный, — так уже говорит согласованный s-7unxytshhc4md54, — поэтому после повторной настройки спецификация остаётся черновиком, пока ответственный не проведёт процедуру одобрения. После повторной настройки не выбрано и ни одно расширение, хотя правило 1.7.6 оставляет расширение выбранным, пока от него зависит узел. Пока ответственный снова не выберет каждое такое расширение (правило 1.7.5), `sheriff validate` отвергает каждый узел того типа, который это расширение добавляет, так как схема собирается только из выбранных расширений (правило 5.1). Черновик спецификации лишь ослабляет проверки, а пропустить git-хуки и так может любой, с помощью `git commit --no-verify`.»

### 3.2 A rule on the model and the reasoning effort that an agent uses (formerly question 9)

**The problem.** The agreed node "The skills of the SpecSheriff plugins" (s-kq6wmdud9c7j2k9) says that the skills run with the model and the reasoning effort that the user has chosen. No rule of the base says so, so that node also links to rule 2.5 only to satisfy row 10.1.23 (group 8's base question 2). The owner ruled on 2026-11-02, as recorded in s-xr5xxa9cxf2mq5u, that "no choice that costs a user tokens is made without their consent": the skills use the model and the effort of the user's session, and every run outside it, at present only the reviewer's, uses the model and the effort that the user has confirmed on their machine. On 2026-11-25 the owner decided that `spec`, `spec-review` and `spec-adopt` are to be described in nodes of their own in task T34. The new rule names a skill only as the place where an agent runs; a rule that names the skills belongs to task T34. The owner's rule "A defect found is fixed at once" applies here too.

**Where it goes.** In section 10, whose text 3.1 rewords, after rule 10.4, "What the reviewer is given" (s-nyh9yk22ba6g77q).

**New wording:**

> **Title:** Who chooses an agent's model and reasoning effort
>
> Wherever the SpecSheriff tools or a skill of a SpecSheriff plugin runs an agent, that agent uses a model and a reasoning effort chosen by the person on whose machine it runs:
> - the agent of a session in which a skill runs, and any agent that the skill starts, use those of that person's session;
> - any other agent, such as the reviewer (§s-m4h279nbaqkpa3t), uses those that the person has confirmed on that machine. Until the person confirms them, it uses the defaults. The SpecSheriff tools name each default in every run that uses it.
>
> **Reason:** Whoever runs an agent pays for that run, so only they decide what it costs.
>
> **Example:** A skill of a SpecSheriff plugin starts an agent to review a draft. That agent uses the model and the reasoning effort of the session in which the skill runs. The most likely mistake is a skill that names a model or an effort of its own, so that the person pays for a model or an effort that they did not choose.

Russian: заголовок «Кто выбирает модель и усилие рассуждения агента»; текст «Где бы инструменты SpecSheriff или skill плагина SpecSheriff ни запускали агента, этот агент работает с моделью и усилием рассуждения, которые выбрал человек, на чьей машине он работает:
- агент сессии, в которой работает skill, и любой агент, которого этот skill запускает, работают с моделью и усилием сессии этого человека;
- любой другой агент, например рецензент (§s-m4h279nbaqkpa3t), работает с теми, которые этот человек подтвердил на этой машине. Пока человек их не подтвердил, агент работает со значениями по умолчанию. Инструменты SpecSheriff называют каждое такое значение в каждом запуске, который его использует.»; обоснование «Тот, кто запускает агента, платит за этот запуск, поэтому только он решает, сколько этот запуск стоит.»; пример «Skill плагина SpecSheriff запускает агента, чтобы проверить черновик. Этот агент работает с моделью и усилием рассуждения сессии, в которой работает skill. Самая вероятная ошибка — skill, который сам называет модель или усилие, так что человек платит за модель или усилие, которых не выбирал.»

Links: a `cites` link to s-m4h279nbaqkpa3t. In the appendix of the tools, s-kq6wmdud9c7j2k9 implements the new rule in place of rule 2.5, and s-tnz9zgqx8c629a7 ("The settings of each runner") gains an `implements` link to it.

Decision for `meta.decisions`: date 2026-11-02; problem "The reviewer ran with the models that the tools or the project's settings chose, though each run is paid for by the user who commits."; ruling "The owner: no choice that costs a user tokens is made without their consent. The skills use the model and the reasoning effort that the user has chosen in their session; every other run, at present only the reviewer's, uses the model and the reasoning effort that the user has confirmed on their machine."; type textual.

`change`: «Новое правило по вашему решению от 2026-11-02: модель и усилие рассуждения агента выбирает человек, на чьей машине он работает, так как он и платит за запуск. Пока человек не подтвердил настройки, агент использует значения по умолчанию, и инструменты SpecSheriff называют их, как уже говорит согласованный узел о настройках каждого runner. Правило называет skill только как место, где работает агент; правило, которое называет сами skills, будет в задаче T34. Правило говорит «человек, на чьей машине работает агент», а не «пользователь», так как в базе «user» значит пользователя системы (правило 4.3).»

What a person sees: no change in behaviour. Cost: one new rule and two links.

### 3.3 Rule 8.6, "A rule may be a table": no term in a cell (formerly question 11)

**The problem.** Rule 8.6 lets a cell hold "a node of a kind that the specification's schema declares, such as a rule or a term", and says that a node in a cell has no title. Rule 8.5 locates a term by its name. So a term in a cell has no name and so no location, and rules 3.2 and 10.1.7, which compare terms by name, cannot apply to it. Rule 8.6 thus contradicts itself. The review of s-vke5hakwf3uyrjs found this on 2026-11-22 (`t25-one-thought.md`, line 80), and that agreed node already refuses, for a node in a cell, only a sid that more than one node holds. A list that named only what is forbidden, a term, would let other kinds that have a title into a cell unnoticed: a section, a `TableRule` and a RecordType (rule 7.2.6).

**New wording** (the reason stays as it is, except for a rewording of its second sentence in English only):

> A rule may be set out as a table, as a node of the kind `TableRule`. A `TableRule` has a title, a text and a reason, as a `TextRule` has. It also names its table's columns. Each cell of the table holds either text or a node of a kind that the specification's schema declares and whose nodes need no title, such as a rule. A node in a cell has no title of its own. Its column and its row name it. The rows may be grouped under headings.
>
> **Reason:** A table shows at a glance what many requirements share and where they differ. A requirement that is a node in a cell can be approved, cited and bound to code on its own.

Russian of the changed sentence: «Каждая ячейка таблицы содержит либо текст, либо узел того типа, который объявляет схема спецификации и узлам которого заголовок не нужен, например правило.» The Russian of the reason stays as it is.

Links: none change.

Decision for `meta.decisions`: date of the owner's agreement; problem "The rule let a cell hold a term, which rule 8.5 locates by its name, while a node in a cell has no title."; ruling to be written from the owner's answer; type textual.

`change`: «Было: «…узел того типа, который объявляет схема спецификации, например правило или термин». Теперь ячейка содержит узел только того типа, узлам которого заголовок не нужен. Термин располагается по своему имени (правило 8.5), а у узла в ячейке заголовка нет, так что прежняя формулировка противоречила сама себе. Список того, что запрещено, пропустил бы в ячейку раздел, `TableRule` и RecordType, у которых есть заголовок. Ни в одной таблице guidelines термина в ячейке нет, а в saloon нет ни одной `TableRule`, так что ничего не переносится. Во втором предложении обоснования поправлен только английский текст.»

What a person sees: `sheriff validate` refuses a term, a section, a `TableRule`, a RecordType or a domain's header in a cell, through the schema (row 10.1.2). Cost: rule 8.6 and, in stage 3, the schema.

### 3.4 A row of table 12.12: each `$ref` names a RecordType (formerly question 12)

**The problem.** No row of table 12.12 checks that a `$ref` within a RecordType names a RecordType. The agreed item 54 (s-suv42g8r3ra2h6b) refuses a `$ref` that names no RecordType when `sheriff types` runs, and only where the stack lists a file of types. Where it lists only a file of RuntimeChecks, or none, the reference passes, and the RuntimeCheck then fails to compile in the project (group 7's base question 1). The owner's rules "What can run as a deterministic process is automated" and "A release carries out every rule it contains" leave no choice but to add the row.

**New wording.** A new row of table 12.12, after row 12.12.3, with `checks` links to s-6eb92ddch7shuvu and s-8ht2hn88cu2qwz9:

> **What is checked:** Each `$ref` within a RecordType (§s-6eb92ddch7shuvu), at any depth, names a RecordType
>
> **On failure:** refused

Russian: «Каждый `$ref` внутри RecordType (§s-6eb92ddch7shuvu), на любой глубине, называет RecordType | отвергается»

The form `#<sid>` stays where the agreed item 56 (s-4npdup7mjkva69y) states it. The new row catches a `$ref` of another form too, such as `#/$defs/x`, which does not resolve once the definition is in the file of RuntimeChecks.

`change`: «Новая строка: `$ref` внутри RecordType, который не называет RecordType, отвергается в любом проекте, а не только там, где стек перечисляет файл типов. Строка 12.12.2 уже так проверяет `identifierOf`.»

What a person sees: `sheriff validate` refuses the RecordType and names the `$ref`. Cost: a row; a sentence in the agreed item 47 (s-ezq8csd433vj6fj), which already examines references; code and tests in stage 3. The rows that 3.4, 3.6, 3.7 and 3.8 insert shift the numbers of the later rows of table 12.12, which this file, and the owner's page built from it, cite by number; the numbers here are those before the insertion.

### 3.5 Rule 12.6 and rows 12.12.6 and 12.12.7: the fields that a RecordType variant adds (formerly question 14)

**The problem.** The agreed item 55 (s-nk8td3ez58gahc4, agreed 2026-11-25) already defines the fields that a variant adds: those that it declares and those that it takes through `refines` from a RecordType that is neither its own RecordType nor one that its RecordType reaches through `refines`. Rows 12.12.6 and 12.12.7, and the last sentence of rule 12.6, consider only the fields that the variant declares. So a variant whose fragment of a format holds a field with the same name as one of its RecordType's fields passes, and a variant that adds fields only through a fragment is refused (group 7's base question 3). Keeping only the declared fields would reopen the agreed item 55, so this proposal brings the base into line with that node.

**New wording of rule 12.6** (the reason and the examples stay as they are):

> A RecordType variant adds the fields that a data record of a RecordType (§s-7vm323mhry2enx3) holds because of the values of some fields of that RecordType. The fields of the RecordType whose values decide this are the fields that select a RecordType variant. They are named by the RecordType itself or by a RecordType that it refines. Each combination of their values, one value for each field, has its own RecordType variant if the combination adds fields of its own, and only then.
>
> A RecordType variant is a RecordType that:
> - is declared where the RecordType that it is a variant of is declared: in the same section of the base specification or in the contracts section (§s-z6tq6a3btnvvwx7);
> - has a `refines` link (§s-sn6au3vcr9uy5pm) to that RecordType;
> - names the values it corresponds to, one value for each field that selects a RecordType variant.
>
> A RecordType variant adds the fields that it declares. It also adds each field that it takes through `refines` from another RecordType, unless its RecordType is that RecordType or reaches it through `refines`. A data record holds the fields of its RecordType variant alongside the fields of its RecordType. The name of each field that a RecordType variant adds differs from the name of every field that its RecordType declares or takes through `refines` from another RecordType.

Russian of what changes:
- «Вариант RecordType добавляет поля, которые запись данных RecordType (§s-7vm323mhry2enx3) содержит из-за значений некоторых полей этого RecordType.»
- «Вариант RecordType добавляет поля, которые он объявляет. Он добавляет и каждое поле, которое получает через `refines` от другого RecordType, если только его RecordType не является этим RecordType и не достигает его через `refines`. Запись данных содержит поля своего варианта RecordType рядом с полями своего RecordType. Имя каждого поля, которое добавляет вариант RecordType, отличается от имени каждого поля, которое его RecordType объявляет или получает через `refines` от другого RecordType.»

**New wording of the rows:**
- row 12.12.6: "A RecordType variant adds at least one field (§s-z3dnru6qqdf9m6j) | refused"; Russian «Вариант RecordType добавляет хотя бы одно поле (§s-z3dnru6qqdf9m6j) | отвергается»;
- row 12.12.7: "The name of each field that a RecordType variant adds (§s-z3dnru6qqdf9m6j) differs from the name of every field that its RecordType declares or takes through `refines` from another RecordType | refused"; Russian «Имя каждого поля, которое добавляет вариант RecordType (§s-z3dnru6qqdf9m6j), отличается от имени каждого поля, которое его RecordType объявляет или получает через `refines` от другого RecordType | отвергается».

Both rows already have a `checks` link to s-z3dnru6qqdf9m6j, which covers the new citation, so no link is added.

Decision for `meta.decisions`: date of the owner's agreement; problem "Rule 12.6 and rows 12.12.6 and 12.12.7 looked only at the fields that a variant declares, while the agreed s-nk8td3ez58gahc4 generates a variant from every field that it adds."; ruling to be written from the owner's answer; type textual.

`change`: «Было: «объявляет». Теперь вариант «добавляет» поля: те, что объявляет, и те, что получает через `refines` от другого RecordType, кроме своего RecordType и тех, до которых тот доходит через `refines`. Так уже генерирует определение варианта согласованный узел описания инструментов о RecordType, который уточняют его варианты (2026-11-25). Строки 12.12.6 и 12.12.7 проверяют все добавленные поля.»

What a person sees: a variant that adds only a fragment's fields passes; a variant whose fragment repeats a field of its RecordType is refused. Cost: rule 12.6 and two rows; a sentence in the agreed s-c2r9jndrjbtbsv6; code and tests in stage 3.

### 3.6 Two rows of table 12.12: `additionalProperties` and `unevaluatedProperties` at the top level of a RecordType variant and of a RecordType that has variants (formerly question 15)

**The problem.** A variant's definition is reached through `then` from its RecordType's definition. There, `additionalProperties` or `unevaluatedProperties` at the top level of the variant's `schema` rejects the fields of its RecordType, so every data record of the variant is rejected. The page that the owner accepted on 2026-11-19 establishes that a variant does not write `unevaluatedProperties` («Вариант не пишет unevaluatedProperties»). Rule 12.6 already says that a data record holds the fields of its variant alongside those of its RecordType, so no sentence is added to rule 12.6. Dropping such a keyword silently, in `sheriff types`, would be the defect that `.claude/vt/rules.md` names: dropping data silently.

The reverse case has the same defect. Under JSON Schema 2020-12 (Core, 10.3.2.3), `additionalProperties` depends only on `properties` and `patternProperties` in its own schema object. At the top level of the definition of a RecordType that has variants, it therefore rejects each field that a variant adds through `allOf` and `then` (s-nk8td3ez58gahc4). The accepted page uses `unevaluatedProperties: false` there, which does see those fields. Each row states one thought, so the two rows stay separate.

**New wording.** Two new rows of table 12.12, after row 12.12.7, each with a `checks` link to s-z3dnru6qqdf9m6j. The first is checked through the schema of the RecordType extension, as s-dk3zfkbhc3v6xbp checks `enum`, since a variant names its values in its own `answersTo`. The second is checked by `sheriff validate` with the variants that s-c2r9jndrjbtbsv6 finds, since only other nodes show whether a RecordType has variants.

The first row:

> **What is checked:** The top level of a RecordType variant's `schema` holds neither `additionalProperties` nor `unevaluatedProperties`
>
> **On failure:** refused

Russian: «Верхний уровень `schema` варианта RecordType не содержит ни `additionalProperties`, ни `unevaluatedProperties` | отвергается»

The second row:

> **What is checked:** The top level of the `schema` of a RecordType that has RecordType variants holds no `additionalProperties`
>
> **On failure:** refused

Russian: «Верхний уровень `schema` RecordType, у которого есть варианты RecordType, не содержит `additionalProperties` | отвергается»

`change`: «Две новые строки. Вариант RecordType не пишет на верхнем уровне своей `schema` ни `additionalProperties`, ни `unevaluatedProperties`, иначе каждая его запись данных отвергается; так решила страница, которую вы приняли 2026-11-19. RecordType, у которого есть варианты, не пишет на верхнем уровне `additionalProperties`: по JSON Schema 2020-12 это слово видит только поля из `properties` своего объекта и потому отвергает поля каждого варианта. Отвергать поля, которых не объявляет ни один RecordType, он может словом `unevaluatedProperties: false`, как на той же странице.»

What a person sees: `sheriff validate` refuses such a variant, or such a RecordType, and names the keyword. Cost: two rows, a sentence in the agreed s-c2r9jndrjbtbsv6, the schema of the extension, code and tests in stage 3.

### 3.7 A row of table 12.12: `"type": "object"` in a RecordType's `schema` (formerly question 16)

**The problem.** The agreed migration (`proposal:s-gb8s9657a65hqmv-g7`) writes `"type": "object"` into the `schema` of each RecordType other than a variant, since the RuntimeCheck is now the `schema` itself. Nothing requires a hand-written RecordType to hold it, and without it the RuntimeCheck accepts a value that is not an object, such as a string (group 7's base question 7). The page accepted on 2026-11-19 leaves rule 12.2 unchanged, and "each of its fields" in rule 12.2, with rule 12.4, already implies that a data record is an object. The agreed item 56 rules out generating the keyword. So the proposal is that the extension's schema requires the keyword, that an agreed node of the appendix is changed in stage 3 to say so, and that table 12.12 lists the check, as rows 12.12.8 and 12.12.11 do for theirs.

**New wording.** A new row of table 12.12, after the row that proposal 3.4 adds, with `checks` links to s-6eb92ddch7shuvu and s-wxcmpbvy9bzkfj9:

> **What is checked:** The top level of the `schema` of each RecordType other than a RecordType variant holds `"type": "object"`
>
> **On failure:** refused

Russian: «Верхний уровень `schema` каждого RecordType, кроме варианта RecordType, содержит `"type": "object"` | отвергается»

`change`: «Новая строка: `schema` каждого RecordType, кроме варианта, говорит, что запись данных — объект. Без этого RuntimeCheck принимает, например, строку. Миграция уже так пишет; правило 12.2 не меняется.»

What a person sees: `sheriff validate` refuses a RecordType whose `schema` lacks `"type": "object"`. Cost: a row, the schema of the extension and a sentence in an agreed appendix node in stage 3.

### 3.8 A row of table 12.12: a RecordType is declared in the base specification (formerly question 18)

**The problem.** Rule 12.1 requires a RecordType to be declared in a section of the base specification, or, for a fragment of a format, in the contracts section. The contracts section is a section of its own within the base specification (rule 3.1, §s-z6tq6a3btnvvwx7), so the proposed row admits a fragment of a format declared there. No row of table 12.12 checks rule 12.1's requirement. A RecordType kept elsewhere, such as in `specs/tech/`, belongs to no part of the system under the agreed item 47, so the reference checks skip it (group 5's notes, round d). The owner's rules "What can run as a deterministic process is automated" and "A release carries out every rule it contains" leave no choice but to add the row.

**New wording.** A new row of table 12.12, after row 12.12.1, with a `checks` link to s-7vm323mhry2enx3 and a `cites` link to s-qmmzf9nksfsa3qp:

> **What is checked:** Every RecordType is declared in the base specification (§s-qmmzf9nksfsa3qp)
>
> **On failure:** refused

Russian: «Каждый RecordType объявлен в базовой спецификации (§s-qmmzf9nksfsa3qp) | отвергается»

`change`: «Новая строка: RecordType вне базовой спецификации, например в техническом приложении, отвергается, как требует правило 12.1.»

What a person sees: `sheriff validate` refuses such a RecordType and names its file. Cost: a row, a sentence in an agreed appendix node such as item 47, code and tests in stage 3.

---

## 4. Questions for the owner

Each question gives the problem, the nodes concerned, the recommendation and its basis, the options with what a person sees, their cost and the risk that remains, and the full new wording under the recommended option, in English and in Russian.

### 4.1 Whether a node's kind is part of its wording (formerly question 2)

**The problem.** Rule 1.3.5 lists what an approval covers: the title, the text, the reason, the examples and the fields that the kind adds. It does not list the kind itself. The agreed fingerprint (`new:tools-11-fingerprint`, s-f5brvuuu6xmkj6t, agreed 2026-11-25) leaves the kind out, as the code does (`NOT_WORDING` in model.ts). So an agent can turn an approved rule into a term and the node stays approved, although a term needs no code. The reverse change turns a term into a rule that code must now implement, without the approval of any owner (review g6-a, F4).

**Nodes concerned:** rule 1.3.5, "What an approval covers" (s-5ah25f6gy99panq); rule 1.3.2, "What a draft means" (s-utvqbypzhmgndug), whose fourth item, "If a rule's title, text or reason changes, the rule is automatically set to `draft`", restates rule 1.3.5's second sentence without the examples, the fields and, under A, the kind, and names nobody who sets the status.

**Recommendation: A, the kind is part of the wording.** Basis:
- rule 1.3.5's reason: "A node requires only what its wording states, so an approval lapses with a change to that wording". The kind decides part of what a node requires, such as whether code must implement it (rule 9.2);
- rule 10.3's reason: only a check made before an edit keeps an agent from making a decision that only the owners may make. Turning a rule into a term is such a decision;
- the principle "Nothing unapproved is implemented": a change to a rule's wording makes it a draft until an owner approves the new wording.

**Options.**
- **A (recommended). The kind is part of the wording.** What a person sees: changing a node's kind makes the node a draft, and the guard refuses an agent's edit that leaves such a node approved. Cost: rule 1.3.5 changes, and rule 1.3.2's fourth item is removed; the agreed fingerprint node is changed to include the kind, under the names `rule`, `recordType` and `domain`, which earlier releases wrote for the kinds that have since been renamed, as it already does for the sources of a field's values; code and tests in stage 3. Each approval recorded before this release lapses for every node whose fingerprint gains the kind. The fingerprint can leave out the kind `TextRule`, so that only terms, RecordTypes and `TableRule`s have to be approved again; that choice belongs to the fingerprint node. Risk: none found.
- **B. The kind stays outside the wording, and rule 1.3.5 says so.** What a person sees: a rule turned into a term keeps its approval. Cost: one item in rule 1.3.5's list of the changes that an approval survives; rule 1.3.2's fourth item is still removed. Risk: an agent can remove the requirement for code from an approved rule without an owner's approval.

**New wording of rule 1.3.5 under A:**

> The wording an approval covers is a node's kind, title, text, reason and examples, and the fields the node's kind adds alongside them, such as `TextRule.list`. A change to any of these makes the node a draft, even where the change is made by one of the node's owners. The wording of a node in a cell of a `TableRule` also includes the text cells of its row and the headings of its column and of its group.
>
> An approval survives a change to:
> - the node's links or its metadata;
> - who its owners are;
> - what is built into it from other nodes;
> - where it is in the specification.
>
> **Reason:** A node requires only what its wording states. Its kind belongs to that wording, since the kind decides, for example, whether code must implement the node. So an approval lapses when that wording changes, and not otherwise. Everything else about a node changes as the specification grows around it.

Russian: «Формулировка, которую покрывает одобрение, — это тип узла, его заголовок, текст, обоснование и примеры, а также поля, которые добавляет тип узла, например `TextRule.list`. Изменение любого из них делает узел черновиком, даже если его вносит один из ответственных за узел. Формулировка узла в ячейке `TableRule` включает ещё текстовые ячейки его строки и заголовки его столбца и его группы.
Одобрение сохраняется при изменении:
- связей узла или его метаданных;
- того, кто за него отвечает;
- того, что встроено в него из других узлов;
- того, где он находится в спецификации.»
Обоснование: «Узел требует только того, что говорит его формулировка. Его тип входит в эту формулировку, потому что тип решает, например, должен ли код реализовывать этот узел. Поэтому одобрение теряет силу при изменении этой формулировки и ни при каком другом. Всё остальное в узле меняется по мере того, как вокруг него растёт спецификация.»

**Rule 1.3.2 under either option:** its fourth item is removed. Rule 1.3.5's second sentence already states it, and the item named nobody who sets the status ("One statement, one home").

`change` of rule 1.3.5: «Новое: тип узла входит в формулировку, которую покрывает одобрение. Смена типа, например правила на термин, делает узел черновиком. В обосновании сказано почему: тип решает, должен ли код реализовывать узел.»

`change` of rule 1.3.2: «Четвёртый пункт удалён: правило 1.3.5 уже говорит, что изменение формулировки делает узел черновиком, а пункт пересказывал его не полностью.»

Other nodes that change under A: the agreed `new:tools-11-fingerprint` (its first excluded item loses `kind`). The agreed `s-st6td4mua9uqt9z` needs no change, since it compares fingerprints.

### 4.2 A check of the structure of the technical appendix in a project without the Domains extension (formerly question 3)

**The problem.** Rule 1.1.2 says that where the base specification is divided into sections, the technical appendix inherits its structure. Rule 4.1 requires "a section for each top-level section of the base specification it implements, under that section's title". In a project that has chosen the Domains extension, row 11.3.5 checks this. In any other project, no row checks it. Today's code refuses a wrongly named file under `specs/tech/` in every project (validate.ts, `appendices`), and the agreed item 42 (s-gvafe6bnstwab8b) drops that refusal, in stage 3, in projects that do not use the Domains extension (the item in "Found and owed" from the reviewers of group 5, 2026-11-24).

**Nodes concerned:**
- rule 1.1.2, "The basic structure of the specification" (s-qmmzf9nksfsa3qp);
- rule 4.1, "What the technical appendix contains" (s-vj7ercem526zd6v);
- the main table of checks (s-jau82aq9juv9zzh);
- row 11.3.5 (s-vghy37e3p2325ah): "Every section of the technical appendix other than the stack section and the technical debt section has the same name and the same place in the structure as a domain or a section of the base specification | refused". It is the only row that checks rule 11.1.1, "Decomposition of the specification" (s-h6h25ctd3yryudh).

**Recommendation: A, one row of the main table that applies in every project, with row 11.3.5 narrowed to the names of the files.** Basis:
- the owner's ruling of 2026-11-18 on row 11.3.5: "the technical appendix refines how the rules of the base specification are implemented, so its structure matches that of the base specification, its domains and their sections included, as far as needed". The ruling states a property that holds for the base specification as a whole;
- the owner's rule "A release carries out every rule it contains", and today's code, which already refuses a wrongly named file in a project without domains;
- a domain is a folder of the base specification (rule 8.5, as group 5 renamed the term on 2026-11-24). So a row worded in terms of folders covers a project with domains too, and names no extension (rule 1.7.3). Its second sentence keeps the check, now made by row 11.3.5 and item 42, that a section in a file named after a domain matches a section of that domain. Row 11.3.5 keeps what the main table cannot state without naming the extension: that each file of the technical appendix is named after a domain. So rule 11.1.1 keeps its check.

**Options.**
- **A (recommended). A row of the main table, and row 11.3.5 narrowed to the names of the files.** What a person sees: in every project, `sheriff validate` refuses a section of the technical appendix that matches no section of the base specification, as it does now in a project with domains. Cost: a new row; row 11.3.5 changes; the agreed item 42 (s-gvafe6bnstwab8b) splits in two: its paragraphs on the sections below a file's first top-level node implement the new row in every project, and its paragraphs on the names of the files under `specs/tech/` implement row 11.3.5; code and tests in stage 3. Risk: a commit in a project without domains whose technical appendix holds a section that the base specification lacks, such as one on deployment, is refused until the section is moved, for example into the stack section.
- **B. No check without the Domains extension.** What a person sees: in a project without domains, a section of the technical appendix may have any title. Cost: none; stage 3 drops today's refusal, as item 42 says. Risk: the appendix drifts from the base, and a reader looks for a rule's implementation where it is not, contrary to the reason given for rule 4.1.

**New wording under A.**

A new row of the main table, in the group "The specification alone", after row 10.1.22, with `checks` links to s-qmmzf9nksfsa3qp and s-vj7ercem526zd6v, and `cites` links to s-tj38pvm38nepaf5 and s-5x737t9nee4zgaa:

> **What is checked:** Every section of the technical appendix (§s-tj38pvm38nepaf5), other than the stack section, the technical debt section (§s-vj7ercem526zd6v) and the first top-level node of a file named after a folder of the base specification (§s-5x737t9nee4zgaa), has the same path of titles as a section of the base specification (§s-qmmzf9nksfsa3qp): the titles of the sections that hold it, from the top down, followed by its own title. In such a file, the path of titles starts below the first top-level node, which represents that folder, and the section of the base specification with the same path of titles is in that folder
>
> **On failure:** refused

Russian: «У каждого раздела технического приложения (§s-tj38pvm38nepaf5), кроме раздела стека, раздела технического долга (§s-vj7ercem526zd6v) и первого узла верхнего уровня файла, названного по папке базовой спецификации (§s-5x737t9nee4zgaa), тот же путь заголовков, что и у раздела базовой спецификации (§s-qmmzf9nksfsa3qp): заголовки разделов, которые его содержат, сверху вниз, а за ними его собственный. В таком файле путь заголовков начинается ниже первого узла верхнего уровня, который представляет эту папку, а раздел базовой спецификации с тем же путём заголовков находится в этой папке | отвергается»

Row 11.3.5, narrowed, keeping its `checks` links to s-h6h25ctd3yryudh and s-vj7ercem526zd6v; the `checks` link to s-vj7ercem526zd6v covers its new citation, and its `checks` link to s-qmmzf9nksfsa3qp moves to the new row:

> **What is checked:** Every file of the technical appendix other than the file of the stack section and that of the technical debt section (§s-vj7ercem526zd6v) is named after a domain
>
> **On failure:** refused

Russian: «Каждый файл технического приложения, кроме файла раздела стека и файла раздела технического долга (§s-vj7ercem526zd6v), назван по домену | отвергается»

The decision of 2026-11-18 on row 11.3.5 is recorded on the new row too.

`change` of the new row: «Новая строка основной таблицы: в любом проекте у каждого раздела технического приложения тот же путь заголовков, что и у раздела базовой спецификации, и в файле, названном по папке, этот раздел находится в той же папке. Так требуют правила 1.1.2 и 4.1, и так вы решили 2026-11-18 о строке 11.3.5. Строка написана через папки базовой спецификации и поэтому не называет расширения.»

`change` of row 11.3.5: «Было: раздел технического приложения совпадает с доменом или разделом базовой спецификации. Теперь строка проверяет только, что файл технического приложения назван по домену: совпадение разделов проверяет новая строка основной таблицы.»

### 4.3 Code at the top level of a file, outside every symbol (formerly question 4)

**The problem.** Rule 1.5.2 binds all of the system's code other than tests. In a file whose symbols the checks can identify, it binds each symbol by the SpecTag before it. A statement at the top level of such a file that is neither a symbol nor an import, such as a call that starts a server, is then bound by no SpecTag (group 2's notes, item 10; group 3, "Open"). The reviewer is given only changed symbols and files bound as a whole, so it never sees such a statement either.

**Nodes concerned:** rule 1.5.2 (s-kgbzk2ph9e6jfb4), in the agreed wording of `proposal:s-kgbzk2ph9e6jfb4` with proposal 2.8; row 10.1.26 (s-k6dzuajejrw4cej).

**Recommendation: A, SpecTags at the start of such a file bind its code that is outside every symbol and is not an import.** Basis:
- the first sentence of rule 1.5.2: the system's code other than tests is bound by SpecTags to the rules it implements;
- the principle "Rule, test and code bound by the sid": the code that implements a rule is bound to it by a SpecTag;
- under rule 1.5.2, a file whose symbols cannot be identified is already bound by SpecTags at its start, so this uses a way of binding that the SpecSheriff tools already read.

How a SpecTag at the start of a file is told apart from the SpecTag of a symbol that opens the file is left to the agreed appendix node "How a symbol carries its SpecTags" (s-33fw3ga4ctd94dq). It already settles a similar case: a blank line under a SpecTag leaves it binding nothing.

**Options.**
- **A (recommended). SpecTags at the start of the file bind its code that is outside every symbol and is not an import.** What a person sees: a file with statements outside every symbol has a SpecTag at its start; a commit that changes such a statement names in its message the rule that the SpecTag at the file's start names, and the reviewer is given the statement. Cost: rule 1.5.2 and row 10.1.26 change; in stage 3 these agreed appendix nodes each gain a sentence, and their code and tests change too: the node on how a symbol carries its SpecTags (s-33fw3ga4ctd94dq), the node on what a commit changes (s-2x58az67bm6cxq2), the node on the list of code that no SpecTag binds (`proposal:s-weuyx98r7c923ab`), the node that refuses any SpecTag that is not directly above a symbol (s-9rtrj24myzjvshu), and the judgement on the code that a commit changes (`proposal:new-tools-7-3-review-code`), which gives the reviewer only changed symbols and files bound as a whole. Risk: the description of each language must say what counts as an import.
- **B. Every statement of such a file other than an import is inside a symbol.** What a person sees: a file with a top-level call is refused until the call is moved into a function. Cost: a new refusal and a row. Risk: some languages and frameworks expect code at the top level, as in a Python entry point.
- **C. Code outside every symbol stays unbound, and rule 1.5.2 says so.** This contradicts the principle "Rule, test and code bound by the sid". What a person sees: no change; a commit that changes only a top-level statement names no rule, and the reviewer never sees it. Cost: one sentence. Risk: logic written at the top level escapes every binding check and the review.

**New wording of rule 1.5.2 under A,** with proposal 2.8 (the reason stays as it is):

> The system's code (§s-hheus6f395ynqvc) other than tests is bound by SpecTags (§s-8xw4mgvpexyvw5q) to the rules it implements. Code that implements no rule has a SpecTag that says so, and that SpecTag binds the code too.
>
> A symbol is a named unit of code, such as a function, a class or a member of one, a type, a constant or a component. Whoever writes code binds it to its rules in one of the following ways:
> - by a SpecTag directly before each symbol, if the checks (§s-jau82aq9juv9zzh) can identify the file's symbols;
> - by SpecTags in a comment placed as near the start of the file as its format allows, if the checks cannot identify the file's symbols;
> - by an entry in the bindings file at the root of the repository, for a file whose format allows no comments.
>
> In a file whose symbols the checks can identify, the code that is outside every symbol and is not an import is bound by SpecTags in a comment placed as near the start of the file as its format allows.
>
> A SpecTag before a symbol binds that symbol and every symbol nested in it. SpecTags at the start of a file whose symbols the checks cannot identify, and an entry in the bindings file, bind the whole file. A SpecTag that names a node that is not a rule, such as a section, binds nothing. A change anywhere in a file bound as a whole is a change to the code its SpecTags bind. The only exception is an edit that changes no code (§s-9j2mmnuuwmx5ksn): an edit to a comment that leaves its SpecTags as they are, or to whitespace that does not affect what the code does.
>
> The formats that allow no comments are JSON and those that a project's own guidelines (§s-u7tw6m8npxmv5tu) name as allowing none.
>
> Each entry in the bindings file names an existing file and holds that file's SpecTags.
>
> **Examples:** the two agreed examples, and a new one: "A Python file defines a function and ends with a call, outside every function, that starts a server. A comment at the start of the file holds the SpecTag of the rule that the call implements. The most likely mistake is to leave the call unbound because the file's symbols carry SpecTags."

Russian of what changes beyond proposal 2.8:
- «В файле, символы которого проверки могут определить, код вне всех символов, кроме импортов, привязывают SpecTag в комментарии, поставленном так близко к началу файла, как позволяет его формат.»
- «SpecTag в начале файла, символы которого проверки не могут определить, и запись в файле привязок привязывают весь файл.»
- the example: «Файл Python определяет функцию и заканчивается вызовом, который запускает сервер, вне всех функций. Комментарий в начале файла содержит SpecTag правила, которое реализует этот вызов. Самая вероятная ошибка — оставить вызов не привязанным ни к одному правилу, потому что у символов файла есть SpecTag.»

**New wording of row 10.1.26 under A.** It also gets the technical replacement that group 2's notes, item 16, deferred to the row's next change: "for a symbol" becomes "for code".

> **What is checked:** The system's implementing code (§s-hheus6f395ynqvc) is bound by SpecTags as follows (§s-kgbzk2ph9e6jfb4): each symbol that the checks can identify, by a SpecTag directly before it; in a file whose symbols the checks can identify, the code that is outside every symbol and is not an import, by SpecTags at the file's start; any other file, by SpecTags at its start or by an entry in the bindings file. Each SpecTag names a rule implemented by the code that it binds, or says that the code implements none
>
> **On failure:** refused; for code that the commit leaves unchanged, the result is what the rule on code that no SpecTag binds says (§s-kkbqcb9xrpaepwn)

Russian: «Реализующий код системы (§s-hheus6f395ynqvc) привязан SpecTag следующим образом (§s-kgbzk2ph9e6jfb4): каждый символ, который проверки могут определить, — SpecTag непосредственно перед ним; в файле, символы которого проверки могут определить, код вне всех символов, кроме импортов, — SpecTag в начале файла; любой другой файл — SpecTag в его начале или записью в файле привязок. Каждый SpecTag называет правило, которое реализует привязанный им код, или говорит, что этот код не реализует никакого правила | отклоняется; для кода, который коммит не меняет, — как говорит правило о коде, который не привязан ни одним SpecTag (§s-kkbqcb9xrpaepwn)»

`change` of rule 1.5.2: «Новый абзац: в файле, символы которого определимы, код вне всех символов, кроме импортов, привязывают SpecTag в начале файла. SpecTag в начале файла привязывают весь файл теперь только там, где символы определить нельзя. Новый пример с вызовом, который запускает сервер.»

`change` of row 10.1.26: «Добавлен способ привязки кода вне всех символов. «Для символа, который коммит не меняет» стало «для кода, который коммит не меняет»: строка говорит о коде, и эту техническую замену отложили до её следующего изменения. Ссылки на правила 1.5.2 и 9.5 теперь говорят, на что они ссылаются.»

### 4.4 A file of RuntimeChecks, bound as a whole to every RecordType for which it holds a definition (formerly question 5)

**The problem.** The agreed `new:tools-17-bindings-entry` (s-h5rfyy9j8nnhx62, agreed 2026-11-25) binds a file of RuntimeChecks as a whole, by one entry in the bindings file, to every RecordType whose definition it holds. So a commit that changes one RecordType's definition changes the code bound to all of them. Two checks then refuse what rule 10.15 is meant to allow:
- row 10.1.42, and rule 9.6, which states it word for word, require the commit message to name every RecordType in the file (group 7's base question 6);
- row 10.1.28a refuses the commit while any RecordType in the file is a draft, as its agreed node `new:tools-7-2-draft-rule` (s-w93jfnqynfa47pf) reads, since the file holds that RecordType's definition from its last approved wording.

Rule 10.15's reason says that the rule "lets that file be regenerated as soon as each approval is given, yet implement only what the nodes' owners have approved".

**Nodes concerned:** under B, rule 1.5.2 (s-kgbzk2ph9e6jfb4), row 10.1.26 (s-k6dzuajejrw4cej), and the agreed appendix nodes s-33fw3ga4ctd94dq, s-9rtrj24myzjvshu, s-h5rfyy9j8nnhx62, s-suv42g8r3ra2h6b and s-dbk2vyeg8z5jxna; under A, rule 9.6, "The nodes a commit message names" (s-ef93u6cnbs2sevr), row 10.1.28a (s-wpadgy2budcxa3v) and row 10.1.42 (s-7sk3s553ukzwtbm).

**Recommendation: B, each definition in a file of RuntimeChecks is bound on its own, by a SpecTag in its `$comment`.** Basis:
- rule 1.5.2's reason: "Binding each file of the system's code as precisely as its format allows lets the checks immediately find code that has lost its link to the specification". JSON Schema gives each definition a `$comment`, so the format allows a binding for each definition;
- the principle "Rule, test and code bound by the sid";
- the owner's rule "An error is fixed at its source, never written into the design": both refusals come from binding the whole file, and B fixes the binding, while A leaves it and exempts generated files from two checks;
- B leaves rule 9.6 and rows 10.1.28a and 10.1.42 as they are. Group 7 recommended B too.

**Options.**
- **A. Rows 10.1.28a and 10.1.42, and rule 9.6, do not apply to the files generated from the specification.** What a person sees: a commit that approves one RecordType regenerates the file of RuntimeChecks and passes, even while another RecordType in the file is being revised; its message names only what the developer changed by hand. Cost: rule 9.6 and two rows change, and so do their agreed appendix nodes (s-w93jfnqynfa47pf, s-qqs2svksmjct753); code and tests in stage 3. Risk: the history of a generated file no longer names its nodes in each commit message, and every generated file is exempted from those rows to solve a problem with one file.
- **B (recommended). Each definition is bound on its own, by a SpecTag in its `$comment`.** What a person sees: as under A, and the commit message names only the RecordType that changed. Cost: rule 1.5.2 gains a way of binding for a file whose format allows no comments but gives each of its symbols a comment property, and row 10.1.26 changes to match; the node on how a symbol carries its SpecTags (s-33fw3ga4ctd94dq) gains a description of JSON Schema as a language whose symbols are the definitions under `$defs`; the node that refuses a SpecTag that is not directly above a symbol (s-9rtrj24myzjvshu) accepts one in a comment property; the following nodes, agreed in group 7, change: the node on the entry in the bindings file for a file of RuntimeChecks (s-h5rfyy9j8nnhx62) is removed, the node on what is generated from a RecordType (s-suv42g8r3ra2h6b) says that the `$comment` is written, and the check of generated copies (s-dbk2vyeg8z5jxna) no longer compares that entry; code and tests in stage 3. Risk: nodes agreed on 2026-11-25 are changed again.
- **C. A file of RuntimeChecks for each RecordType.** What a person sees: one generated JSON file for each RecordType, each bound to its RecordType by its own entry. Cost: the agreed list of files and its refusals (s-pvzms7d8kxb8dk2) change. Risk: a project's list of generated files grows with every RecordType.
- **D. Nothing changes.** What a person sees: every commit that changes a RecordType names every RecordType of the file in its message, and while any of them is a draft, no commit that changes the file goes through. Cost: none. Risk: no change to another RecordType can be committed while one is under revision.

**New wording of rule 1.5.2 under B,** with A of question 4.3 and proposal 2.8 (the reason stays as it is):

> The system's code (§s-hheus6f395ynqvc) other than tests is bound by SpecTags (§s-8xw4mgvpexyvw5q) to the rules it implements. Code that implements no rule has a SpecTag that says so, and that SpecTag binds the code too.
>
> A symbol is a named unit of code, such as a function, a class or a member of one, a type, a constant or a component. Whoever writes code binds it to its rules in one of the following ways:
> - by a SpecTag directly before each symbol, if the checks (§s-jau82aq9juv9zzh) can identify the file's symbols;
> - by a SpecTag in each symbol's comment property, such as `$comment` in JSON Schema, for a file whose format allows no comments but gives each of its symbols such a property, if the checks can identify the file's symbols;
> - by SpecTags in a comment placed as near the start of the file as its format allows, if the checks cannot identify the file's symbols;
> - by an entry in the bindings file at the root of the repository, for any other file whose format allows no comments.
>
> In a file whose symbols the checks can identify, the code that is outside every symbol and is not an import is bound by SpecTags in a comment placed as near the start of the file as its format allows or, where the format allows no comments, in the comment property of the file's top-level object.
>
> A SpecTag before a symbol, or in its comment property, binds that symbol and every symbol nested in it. SpecTags at the start of a file whose symbols the checks cannot identify, and an entry in the bindings file, bind the whole file. A SpecTag that names a node that is not a rule, such as a section, binds nothing. A change anywhere in a file bound as a whole is a change to the code its SpecTags bind. The only exception is an edit that changes no code (§s-9j2mmnuuwmx5ksn): an edit to a comment that leaves its SpecTags as they are, or to whitespace that does not affect what the code does.
>
> The formats that allow no comments are JSON and those that a project's own guidelines (§s-u7tw6m8npxmv5tu) name as allowing none.
>
> Each entry in the bindings file names an existing file and holds that file's SpecTags.

Russian of what B adds:
- «SpecTag в свойстве для комментария у каждого символа, например в `$comment` у JSON Schema, — для файла, формат которого не допускает комментариев, но даёт такое свойство каждому своему символу, если проверки могут определить символы файла;»
- «записью в файле привязок в корне репозитория — для любого другого файла, формат которого не допускает комментариев.»
- «…а если формат не допускает комментариев, — в свойстве для комментария объекта верхнего уровня этого файла.»
- «SpecTag перед символом или в его свойстве для комментария привязывает этот символ и каждый вложенный в него символ.»

**The changed clauses of row 10.1.26 under B,** each replacing the clause of question 4.3's wording that it extends:
- "each symbol that the checks can identify, by a SpecTag directly before it or, in a file whose format allows no comments, in the symbol's comment property;"; Russian «каждый символ, который проверки могут определить, — SpecTag непосредственно перед ним или, в файле, формат которого не допускает комментариев, в свойстве символа для комментария;»;
- "in a file whose symbols the checks can identify, the code that is outside every symbol and is not an import, by SpecTags at the file's start or, in a file whose format allows no comments, in the comment property of the file's top-level object;"; Russian «в файле, символы которого проверки могут определить, код вне всех символов, кроме импортов, — SpecTag в начале файла или, в файле, формат которого не допускает комментариев, в свойстве для комментария объекта верхнего уровня этого файла;».

`change` of row 10.1.26 under B: «Для файла без комментариев добавлена привязка SpecTag в свойстве для комментария: у символа и у объекта верхнего уровня.»

`change` of rule 1.5.2 under B: «Новый способ привязки: SpecTag в свойстве для комментария у каждого символа, например в `$comment` JSON Schema. Так файл RuntimeChecks привязан к каждому RecordType по отдельному определению, а не целиком ко всем сразу. Тогда коммит, который меняет один RecordType, называет только его, а пока другой RecordType этого файла — черновик, коммит проходит. Код верхнего уровня такого файла привязывает SpecTag в свойстве для комментария его объекта верхнего уровня.»

### 4.5 No check that a SpecTag outside the system's code names a rule of the guidelines (formerly question 7)

**The problem.** Rule 10.10 (s-sfjka4zc4rhfu67) says: "Outside the system's code, a SpecTag may appear only in the repository's own tools and their tests, such as a project's own checks (§s-2fau85dfyyeq66m) and generators (§s-km4x4s26kv7pjze), and may name only a rule of the guidelines." No row of table 10.1 checks either of its two restrictions, on where such a SpecTag may appear and on what it names. The agreed node of row 10.1.39 (s-m8nmfsxkcfu7cjp) checks only that a sid in such a file names a node (group 4's notes, item 5). The owner's rule "A release carries out every rule it contains" forbids leaving the rule unchecked.

A gap remains whichever restriction is checked. The project-wide settings name the code and the tests of a project's own checks and generators, but no setting tells the SpecSheriff tools which files are the repository's own tools as a whole, such as the tools in `.githooks/<hook>.d/` or, in this repository, the SpecSheriff tools. So the first restriction, on where a SpecTag may appear, cannot be checked as written.

**Nodes concerned:** rule 10.10; the main table of checks (s-jau82aq9juv9zzh).

**Recommendation: B, rule 10.10 keeps only its restriction on what such a SpecTag names, and a row checks it.** Basis:
- the owner's ruling of 2026-11-17 on rule 10.10: a SpecTag "may [appear outside the system's code], but there it names only a rule of the guidelines. Such a SpecTag never counts as implementing a rule of the base specification or of the technical appendix." The ruling's restriction is on what the SpecTag names;
- the owner's rule "A release carries out every rule it contains": under B, every sentence of rule 10.10 is checked, with no new setting;
- the check reads the files that row 10.1.39's check reads, so it costs one more comparison.

**Options.**
- **A. A setting names the paths of the repository's own tools, and rows check both restrictions of rule 10.10.** What a person sees: a project lists the paths of its own tools; a SpecTag outside the system's code and outside those paths is refused, and so is a SpecTag within those paths that names anything but a rule of the guidelines. Cost: a new setting, with its schema and node; two rows; code and tests. Risk: a project that forgets to list a tool's path has that tool's SpecTags refused.
- **B (recommended). Rule 10.10 drops the restriction on where such a SpecTag appears, and a row checks what it names.** What a person sees: a SpecTag anywhere outside the system's code that names anything but a rule of the guidelines is refused, and the refusal names its file and its line. Cost: rule 10.10's title and a sentence of its text; a row; a sentence in an appendix node, such as s-m8nmfsxkcfu7cjp; code and tests in stage 3. Risk: a guide may now quote a SpecTag that names a rule of the guidelines, although no check treats such a SpecTag as binding anything. Option B also departs from the owner's ruling of 2026-11-13, under which a SpecTag appears only in the system's code and its tests. The ruling of 2026-11-17 extended it only to the repository's own tools and their tests.
- **C. Rule 10.10 drops both restrictions, and no row is added.** What a person sees: a SpecTag outside the system's code may name any node, and nothing refuses it. Cost: a sentence of rule 10.10. Risk: a SpecTag that is in a tool and names a rule of the base specification tells a reader that the tool implements that rule, although no check counts it as implementing that rule.

**New wording under B.**

Rule 10.10: its title becomes "What a SpecTag names"; its second paragraph becomes the following, while its first paragraph and its reason stay as they are:

> Outside the system's code, such as in the repository's own tools and their tests, a SpecTag names only a rule of the guidelines. A project's own checks (§s-2fau85dfyyeq66m) and generators (§s-km4x4s26kv7pjze) are among those tools. Such a SpecTag never counts as implementing a rule of the base specification or of the technical appendix.

Russian: заголовок «Что называет SpecTag»; абзац «Вне кода системы, например в собственных инструментах репозитория и их тестах, SpecTag называет только правило guidelines. Собственные проверки проекта (§s-2fau85dfyyeq66m) и генераторы (§s-km4x4s26kv7pjze) входят в эти инструменты. Такой SpecTag никогда не считается реализацией правила базовой спецификации или технического приложения.»

A new row of the main table, in the group "The specification and the code", after row 10.1.28, with a `checks` link to s-sfjka4zc4rhfu67 and a `cites` link to s-hheus6f395ynqvc:

> **What is checked:** Every SpecTag outside the system's code (§s-hheus6f395ynqvc) names a rule of the guidelines
>
> **On failure:** refused

Russian: «Каждый SpecTag вне кода системы (§s-hheus6f395ynqvc) называет правило guidelines | отвергается»

`change` of rule 10.10: «Было: вне кода системы SpecTag «может стоять только в собственных инструментах репозитория… и может называть только правило guidelines». Теперь правило ограничивает только то, что такой SpecTag называет, и заголовок говорит «Что называет SpecTag». Ни одна настройка не говорит инструментам SpecSheriff, какие файлы — собственные инструменты репозитория, поэтому первую половину проверить было нельзя, а правило, которое ничто не проверяет, выпуск выполнять не может.»

`change` of the new row: «Новая строка: SpecTag вне кода системы, который называет что-либо кроме правила guidelines, отвергается.»

### 4.6 A term in the contracts section that only one domain needs (formerly question 10)

**The problem.** The owner's decision of 2026-11-12, which proposal 2.9 carries out, settles where a term that only one domain needs is defined. The note of 2026-11-12 left one point open: "ask whether a term in contracts that only one domain uses is an error" (`t25-one-thought.md`, line 1250). Under proposal 2.9, a term in a domain must be moved to the contracts section before any other node cites it. The open point is the reverse: whether a term in the contracts section must be moved into a domain as soon as only that domain cites it.

**Nodes concerned:** rule 3.2 (s-ypa92gpcj3f5zj8), and the new rule of the Domains extension and its rows, in proposal 2.9.

**Recommendation: B, such a term is refused.** Basis:
- the owner's ruling of 2026-11-12 says that "a term that one domain needs is defined in that domain". The owner's rule "A proposal is based on the owner's earlier rulings on its subject" gives those words priority;
- under B, the place of every term follows from which nodes cite it, so a check can determine it;
- the new rule's reason in proposal 2.9, "so the contracts section keeps only what the domains share", holds only under B.

**Options.**
- **A. A term in the contracts section stays valid however many domains cite it.** What a person sees: a term that only one domain needs may stay in the contracts section, or be defined in that domain. Cost: rule 3.2 keeps "may instead let one of the parts … define"; the Domains rule of proposal 2.9 opens with "A term may be defined in a domain … if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it"; its reason becomes "A term that only one domain needs belongs to that domain's subject area, so a reader finds it beside the rules that need it"; and the second row of table 11.3 is not added. Risk: the contracts section may hold terms that only one domain needs. Reason for A: under A, rule 3.2 only lets an extension allow a part to define its own terms, so a term in the contracts section is never wrong, and refusing such a term would make a commit fail whenever the commit removes a shared term's citations from every domain but one, so that only one domain still cites the term.
- **B (recommended). Such a term is refused.** What a person sees: `sheriff validate` refuses a term in the contracts section if at least one node cites it or links to it and every such node is in one domain or in the part of the technical appendix named after that domain, until the term is moved into that domain. Cost: proposal 2.9 as it stands, with the second row of table 11.3, its node and its code. Risk: removing a shared term's citations from every domain but one, so that only one domain still cites the term, makes the commit fail until the term is moved.

**New wording under B:** proposal 2.9 as it stands. Rule 3.2 says "may instead require one of the parts … to define the terms that no other part of the base specification needs". The new Domains rule opens with "A term is defined in a domain (§s-ypa92gpcj3f5zj8) if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it (§s-vj7ercem526zd6v)."; Russian «Термин определяется в домене (§s-ypa92gpcj3f5zj8), если на него ссылается или с ним связан хотя бы один узел и каждый такой узел находится в этом домене или в части технического приложения, названной по нему (§s-vj7ercem526zd6v).»

### 4.7 One convention for SpecSheriff's own keywords within a `schema` (formerly question 13)

**The problem.** Only `identifierOf` and `x-enumSource` appear inside a RecordType's `schema`; `identifiedBy`, `chosenBy` and `answersTo` are properties of the RecordType beside its `schema`. The two keywords follow different conventions: one has OpenAPI's `x-` prefix and the other has none (group 7's base question 2).

**Nodes concerned:** under B, no node of the base: `x-enumSource` appears only in the schema of the RecordType extension and in agreed nodes of the appendix of the tools. Under A, rows 12.12.2 (s-qpdnkejr5xzc6j3) and 12.12.3 (s-cqys6wqrnfzu5ac), which name `identifierOf`.

**Recommendation: B, SpecSheriff's own vocabulary, in which `enumSource` has no prefix.** Basis:
- the page `recordtype-jsonschema.html`, which the owner accepted on 2026-11-19, chose in its decision R8 "a vocabulary of SpecSheriff's own, declared through `$vocabulary`" for `identifiedBy`, `identifierOf`, `chosenBy`, `answersTo` and the keyword that names the source of the collected values. The owner's rule "A proposal is based on the owner's earlier rulings on its subject" gives that choice priority;
- neither `identifierOf` nor `x-enumSource` reaches a RuntimeCheck: the agreed item 56 replaces `x-enumSource` with `enum` and `identifierOf` with the keywords of the identifying field. So the convention affects only the node files, which the SpecSheriff tools check with their own schema.

There is new information that bears on the choice. The JSON Schema project announced in February 2023 that its next release would forbid keywords that no listed vocabulary declares, while keywords starting with `x-` would stay allowed as annotations ([json-schema.org, "The Last Breaking Change", 2023-02-23](https://json-schema.org/blog/posts/the-last-breaking-change); [json-schema.org, "Custom Annotations Will Continue", 2023-02-22](https://json-schema.org/blog/posts/custom-annotations-will-continue)). So `enumSource` will stay valid only if SpecSheriff's vocabulary is declared through `$vocabulary` in a meta-schema. A search on 2026-11-25 found no sign that the release has been published.

**Options.**
- **A. The `x-` prefix on both keywords: `x-identifierOf` and `x-enumSource`.** What a person sees: `x-identifierOf` and `x-enumSource` are read as annotations by any JSON Schema tool, with no vocabulary to declare. Cost: rows 12.12.2 and 12.12.3, items 44, 47 and 56, the migration and the schema all change. Risk: option A departs from decision R8 of the accepted page.
- **B (recommended). `enumSource`, declared with `identifierOf` in a vocabulary of SpecSheriff's own.** What a person sees: no prefix on either keyword. Cost: a meta-schema that declares SpecSheriff's vocabulary through `$vocabulary`, referred to by the schema of the RecordType extension; the agreed appendix nodes that name `x-enumSource` are changed to call it `enumSource` (s-ztseyetus7np6br and its later proposal, s-5nf87c3e3jg9v7c, s-dk3zfkbhc3v6xbp, s-gb8s9657a65hqmv and its later proposals, s-qzyacnqwvaeaps4, s-k4nqjr96ux7a5m7, s-4npdup7mjkva69y). No node of the base changes. Risk: a JSON Schema tool that a project points at a node file, rather than at a RuntimeCheck, sees two keywords that it cannot read unless it loads that meta-schema.

**New wording under B:** no node of the base changes. The renames in the appendix of the tools carry out the owner's choice, as the rule "What a decision removes or renames is removed or renamed without asking again" says.

---

## 5. Dropped items

Items merged into another are not listed here: group 7's base questions 5 and 9 are in proposals 2.1 and 2.2; group 8's base question 1 is in proposal 2.4; group 8's base question 2 and the item in "Found and owed" on taking SpecSheriff out are in proposals 3.1 and 3.2; group 2's item 16, "for a symbol" in row 10.1.26, is in question 4.3; group 7's base question 8 is change 1.2; "a field that has an `enum`" in s-ztseyetus7np6br, the item in "Found and owed" from group 5, is in change 1.1.

1. **Rule 10.5's last example** (the item in "Found and owed"; group 2's notes, item 17). Settled: the agreed `proposal:s-94k7b6r5kf65udf` (2026-11-24) changed the example to "The answer passes the commit but reports a finding on code". The agreed "The reviewer's verdict" (`proposal:new-tools-10-verdict`) reads no verdict from such an answer, so the example now describes a review that could not be carried out.
2. **s-a8fn72xa782wvbk, "refuses anything that `sheriff types` would write"** (the item in "Found and owed"; group 4's round b; group 7's item 4a). Not a node of the base. It stays deferred to that node's next change.
3. **Rule 10.1's two versions, in `newform.json` and in `table-10-1.json`** (the item in "Found and owed"). Not a question: stage 3 reconciles them when it moves the drafts, and shows the result to the owner.
4. **tools/6's reason, narrower than its rule** (the item in "Found and owed"). Settled: group 8 replaced the reason of "The hooks" (s-477gtdrkw34dzxw), agreed 2026-11-25. The new reason no longer speaks of what triggers the derived files.
5. **tools/3's "both agents"** (the item in "Found and owed"). Settled by group 6 (its notes, item 13): the agreed s-7unxytshhc4md54 names the agents without counting them.
6. **Rules 1.6.1 and 10.2: a review that can only pass for a commit that changes only generated files** (group 2's item 11). Settled by group 3: `proposal:s-m4h279nbaqkpa3t` and `proposal:new-tools-7-3-review-code` leave the files generated from the specification out of the reviewer's judgements (agreed 2026-11-24).
7. **Rule 1.6.1's reason and its split** (group 2's item 12). Settled by group 3: rule 1.6.1 was split, and its new reason was agreed on 2026-11-24.
8. **Row 10.1.43, with no exception for generated files** (group 3's round f). Settled by the agreed `proposal:row-10-1-43`.
9. **The rule on when the tests must pass (s-x8uzc8z44pwtd3h): "name where the tests run" against "the moment at which the tests run"** (group 4's round e, item 1). Deferred to that node's next change, as its note says. No item here changes that node.
10. **Rule 11.1.5: "The link may be of any type" includes a `consumes` link from a rule, which row 11.3.3 refuses** (group 1's item 1). Deferred to that node's next change, as the owner's rule "A node stays agreed when the owner accepts changes proposed to it" says. No item here changes rule 11.1.5, though proposal 2.9 and question 4.2 change the Domains extension.
11. **No row checks that a RecordType's `identifiedBy` names one of its fields where no field refers to the RecordType** (group 5's item 3). Dropped: rule 12.2 requires the identifying field only where another RecordType refers to it, and row 12.12.2 checks that case. The owner's rule "What no rule requires is not proposed" applies. Stage 3 drops today's refusal, as group 5 recorded.
12. **No row checks that a RecordType's `chosenBy` names a field of that RecordType** (group 5's item 11). Dropped: row 12.12.9 refuses every variant that names a value for such a field, since the field has no `enum`. A `chosenBy` that no variant answers to generates nothing.
13. **Row 10.1.44's `checks` link to rule 10.10** (group 4's item 5). Settled: group 4's page listed it among the changes that only carry out a decision, and the owner agreed to group 4 on 2026-11-24. Stage 3 removes the link; a link changes no status.
14. **The technical replacements in the base that group 3 recorded** (group 3, "Agreed" and round g): `declaredIn` becomes `jsonSchema` in rules 1.3.1 and 6.1; citations of s-m4h279nbaqkpa3t are retargeted in rules 1.2.6, 1.3.2, 1.3.3 and 10.6; the `checks` links of rows 10.1.35 and 10.1.44 change; rule 8.4 takes its new decision. Settled: group 3's page listed them, and the owner agreed to group 3 on 2026-11-24. Stage 3 applies them. Under proposal 2.7, the reason of rule 1.3.3 no longer cites s-m4h279nbaqkpa3t, so its replacement there has nothing to replace.
15. **Withdrawing the approval of a `TableRule`** (the item in "Found and owed" from group 6; formerly question 1). Settled: the page of group 6 showed, in Russian, that withdrawing a table's approval withdraws only the approval of the table's own wording, and why, and the owner answered «ок» on 2026-11-25. That paragraph is in the agreed `new:tools-11-withdraw` (s-xybjqp2rxh8gszf). Rules 1.3.4 and 1.3.7, read as they are, already allow it.

---

## 6. Краткое изложение, для страницы

**1. Изменения без вопроса** (сообщаются одной строкой):
- в согласованном узле описания инструментов о том, что пишет `sheriff reindex`, «stands» → «is in force», как в строке 10.1.8, и «a field that has an `enum`» → «a field with `enum`», как в правиле 12.7;
- узел о валидаторе RuntimeChecks получает связь `implements` с правилом 12.4, которое уже требует отвергать запись с неверным `format`;
- в правилах 1.3.2, 10.6 и 10.7 и в четырёх согласованных узлах описания инструментов «без SpecTag» → «не привязан ни одним SpecTag», по вашим решениям от 2026-11-17; это делается вместе с предложением 2.6, когда вы его примете.

**2. Предложения, которые исполняют уже принятые решения** (одна полная формулировка каждого, без вопроса):
- 2.1 и 2.2: узел без заголовка экспорт называет по sid и расположению, а карта подписывает расположением (вопрос 1 группы 7).
- 2.3: в правиле 10.12 проверки структуры идут после первого шага и раньше любой другой проверки (вопрос 1 группы 8); пример и обоснование приведены к правилам.
- 2.4: правило 10.3 касается только узла, который правка добавляет или меняет (вопрос 2 группы 8), и только кода системы помимо тестов (ваше решение от 2026-11-13).
- 2.5: в правиле 10.2 при push отдельным пунктом идёт проверка строки 10.1.37b.
- 2.6: правило 9.5 — о коде, который не привязан ни одним SpecTag (решения от 2026-11-17); обоснование приведено к правилам, добавлен второй пример.
- 2.7: правило 1.3.3 — «is in force», обоснование приведено к правилам.
- 2.8: правило 1.5.2 говорит, что SpecTag о том, что правила нет, привязывает код, а SpecTag, который называет раздел, ничего не привязывает.
- 2.9: термин, нужный только одному домену, определяется в этом домене (ваше решение от 2026-11-12): правило 3.2 позволяет расширению этого требовать, строка 10.1.6, новое правило и две строки расширения Domains, по рекомендуемому варианту Б вопроса 4.6.

**3. Новые предложения на согласование** (одна полная формулировка, без вариантов):
- 3.1: новое правило — одна процедура настраивает репозиторий для SpecSheriff, другая удаляет SpecSheriff, оставляя спецификацию; текст раздела 10 расширен на все процедуры SpecSheriff. Риск: повторная настройка оставляет спецификацию черновиком, пока ответственный её не одобрит, и не выбирает расширений, так что узлы их типов отвергаются, пока ответственный их снова не выберет.
- 3.2: новое правило — модель и усилие рассуждения агента выбирает человек, на чьей машине он работает (ваше решение от 2026-11-02); пока человек их не подтвердил, агент работает со значениями по умолчанию, и инструменты SpecSheriff их называют.
- 3.3: в ячейке `TableRule` может быть только узел, которому не нужен заголовок; термин — нет.
- 3.4: строка 12.12 — каждый `$ref` внутри RecordType называет RecordType.
- 3.5: правило 12.6 и строки 12.12.6 и 12.12.7 — о всех полях, которые добавляет вариант, в том числе через `refines`.
- 3.6: две строки 12.12 — вариант не пишет на верхнем уровне ни `additionalProperties`, ни `unevaluatedProperties`, а RecordType с вариантами не пишет на верхнем уровне `additionalProperties`.
- 3.7: строка 12.12 — `schema` RecordType, кроме варианта, содержит `"type": "object"`.
- 3.8: строка 12.12 — каждый RecordType объявлен в базовой спецификации.

**4. Вопросы ответственному.**
1. **Входит ли тип узла в формулировку.** Сейчас агент может превратить одобренное правило в термин, и одобрение сохранится. Рекомендую А: тип входит в формулировку, смена типа делает узел черновиком. Цена — один раз заново одобрить часть узлов после выхода версии.
2. **Проверка структуры технического приложения без расширения Domains.** Рекомендую А: одна строка основной таблицы для любого проекта; строка 11.3.5 проверяет только, что файл назван по домену.
3. **Код на верхнем уровне файла вне всех символов** не привязан ни одним SpecTag. Рекомендую А: его привязывают SpecTag в начале файла, кроме импортов.
4. **Файл RuntimeChecks привязан целиком ко всем своим RecordType.** Тогда сообщение коммита называет их все, а пока хоть один из них черновик, коммит, меняющий файл, отвергается. Рекомендую Б: каждое определение привязано отдельно, SpecTag в его `$comment`; так ошибка исправляется у источника.
5. **Никакая строка не проверяет правило 10.10 о SpecTag вне кода системы**, а то, где SpecTag может стоять, проверить нельзя: ни одна настройка не называет файлы собственных инструментов репозитория. Рекомендую Б: правило 10.10 ограничивает только то, что такой SpecTag называет, и новая строка это проверяет. Б отходит от вашего решения от 2026-11-13: SpecTag стоит только в коде системы и его тестах, а решение от 2026-11-17 расширило это только на собственные инструменты репозитория.
6. **Ошибка ли термин в разделе контрактов, который нужен только одному домену.** Рекомендую Б: да, такой термин отвергается, пока его не перенесут в этот домен, — так следует из вашего решения от 2026-11-12: «термин, который нужен одному домену, определяется в этом домене».
7. **Одно соглашение для собственных слов SpecSheriff в `schema`.** Рекомендую Б: собственный словарь, `enumSource` без приставки, как в решении R8 страницы, принятой 2026-11-19. Новое: проект JSON Schema объявил в 2023 году, что следующая версия запретит слова, которых не объявляет ни один указанный словарь, а слова с `x-` останутся аннотациями; при Б нужна метасхема, которая объявляет словарь SpecSheriff.
