# base-questions.md: the paragraphs changed since base-questions.before-d.md

# T25: the questions about the base specification that stage 2 deferred

This file gathers the questions and the changes concerning the base specification that the review of the appendix of the tools deferred, and every change to the base that the owner has already decided on. The main session shows it to the owner on one page. The briefs are `briefs/t25-base-questions-brief.md`, `fix-brief-bq-b.md` for round b, `fix-brief-bq-c.md` for round c and `fix-brief-bq-d.md` for round d; `base-questions-notes.md` says how each finding in each round's reports was addressed. The earlier versions are `base-questions.before-b.md`, `base-questions.before-c.md` and `base-questions.before-d.md`.

## 1. Changes made without asking

Each change below is one of these: a rename that a decision makes, a replacement that changes no meaning, or a new link. A rename falls under the owner's rule "What a decision removes or renames is removed or renamed without asking again". A replacement that changes no meaning is approved on the owner's behalf, as the rule on what an agent approves on an owner's behalf allows (§s-t5uw8zfxzhfdg86). A link is not part of what an approval covers (§s-5ah25f6gy99panq), so adding one does not need an owner's agreement. The main session makes each change, and the node stays agreed; the main session reports the change in one line. Changes 1.3 and 1.4 are made together with proposal 2.6, once the owner accepts it, so that rule 9.5 and the nodes that restate it or name its check change together.

### 1.1 Two replacements in the same sentences of an agreed node of the appendix of the tools

**Follows from:**
- the item in "Found and owed" from group 6 (2026-11-24): an approval "is in force" in the appendix of the tools and in row 10.1.8, while some nodes still say that it "stands". Rules 1.3.3 and 10.3 get the same replacement in their proposals, 2.7 and 2.4;
- the item in "Found and owed" from group 5 (2026-11-24), line 1664 of `t25-one-thought.md`: s-ztseyetus7np6br writes "a field that has an `enum`" for the term "a field with `enum`" of rule 12.7, a technical replacement that is due the next time that node changes. It changes now, so the replacement is made here. s-agc6fb3vx46pc23 keeps the phrase until its next change.

**The changes,** in `proposal:s-ztseyetus7np6br`, in its later version `proposal:s-ztseyetus7np6br-g3`, and in `new:tools-2-reindex-writes`, all three of which are drafts of s-ztseyetus7np6br:
- "…stays approved while an approval of its current wording stands (§s-v4qus7raqnwzneb)." becomes "…stays approved while an approval of its current wording is in force (§s-v4qus7raqnwzneb).";
- "the values gathered for each field that has an `enum` whose values come from elsewhere in the specification" becomes "the values gathered for each field with `enum` whose values come from elsewhere in the specification".

### 1.3 "carries no SpecTag" becomes "that no SpecTag binds" in rules 1.3.2, 10.6 and 10.7

**Follows from:** the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a, which proposal 2.6 carries out in rule 9.5. These rules restate rule 9.5 in its earlier wording. Proposal 2.7 rewrites rule 1.3.3's reason, which also restated rule 9.5, without that phrase. The second example of rule 10.6, about two symbols that "have no SpecTag", stays as it is: such symbols are among those that no SpecTag binds.

### 1.4 The same rename in four agreed nodes of the appendix of the tools

**Follows from:** the same rulings of 2026-11-17 as in 1.3. These nodes name rule 9.5, or its check, in the earlier wording. Reviewer A of round b found them.

**The changes:**
- s-3xx2eukc8gtd2tx (`new:tools-7-2-outside`), its text: "…as the rule on code and tests without a SpecTag (§s-5z5gnu7pahr82xp) requires (§s-kkbqcb9xrpaepwn):" becomes "…as the rule requires (§s-kkbqcb9xrpaepwn) for code and tests that no SpecTag (§s-5z5gnu7pahr82xp) binds:"; Russian «…так, как требует (§s-kkbqcb9xrpaepwn) правило о коде и тестах, которые не привязаны ни одним SpecTag (§s-5z5gnu7pahr82xp):»;
- s-3xx2eukc8gtd2tx, its reason: "The approval status and the `strict` flag decide what code without a SpecTag outside the commit costs the commit: nothing, a warning or a refusal." becomes "The approval status and the `strict` flag decide what code that is outside the commit, and that no SpecTag binds, costs the commit: nothing, a warning or a refusal."; Russian «Статус одобрения и флаг `strict` определяют, чего стоит коммиту код, который находится за пределами коммита и не привязан ни одним SpecTag: ничего, предупреждения или отказа.»;
- s-weuyx98r7c923ab (`proposal:s-weuyx98r7c923ab`), its text: "The check for code without a SpecTag names this command in its warning and in its refusal (§s-kkbqcb9xrpaepwn)." becomes "The check for such code names this command in its warning and in its refusal (§s-kkbqcb9xrpaepwn)."; Russian «Проверка такого кода называет эту команду в своём предупреждении и отказе (§s-kkbqcb9xrpaepwn).»;
- s-weuyx98r7c923ab, its reason: "The check for code without a SpecTag covers all such code in one warning, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn)." becomes "The check covers in one warning all the code that no SpecTag binds, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn)."; Russian «Проверка сообщает обо всём коде, который не привязан ни одним SpecTag, одним предупреждением, чтобы оно не заслоняло другие находки (§s-kkbqcb9xrpaepwn).»;
- s-chsfpkgpmfk4fft (`new:tools-2-settings`): "the check for code without a SpecTag" becomes "the check for code that no SpecTag binds"; Russian «- `sheriff untagged` — для проверки кода, который не привязан ни одним SpecTag (§s-weuyx98r7c923ab);»;
- s-f5rz6b7dhxejjts (`proposal:s-f5rz6b7dhxejjts-g7`): "symbols of the system's code that have no SpecTag (§s-8xw4mgvpexyvw5q)" becomes "symbols of the system's code that no SpecTag (§s-8xw4mgvpexyvw5q) binds"; Russian «…перечисляет символы кода системы, которые не привязаны ни одним SpecTag (§s-8xw4mgvpexyvw5q), каждый с его файлом (§s-weuyx98r7c923ab);».

## 2. Proposals that carry out a decision already made

Each is shown to the owner as one complete new wording, with a Russian `change` field. A proposal is not checked by specsheriff-rule-reviewer where it only carries out a decision, as `.claude/vt/rules.md` says. A proposal with a wording of its own goes to specsheriff-rule-reviewer first: here proposal 2.9 and the reasons in proposals 2.3, 2.6 and 2.7. Where a change touches a node that contains a sentence breaking a rule on how a node is written, the proposal brings that sentence into line with the rule, as the owner's rule "An agreed node is brought into line with the rules when it changes, never in a sweep" says. Such sentences are marked in the `change` field.

### 2.2 Rule 13.2, "The map of the specification" (s-zu8ne3wq84zchc4, `_guidelines/extensions/views/13.2`)

Russian of the new sentence: «Узел без заголовка, например узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6), карта подписывает расположением (§s-kag2m9tzdnduxdx).» The Russian of the sentence on a branch stays as it is.

`change`: «Новое предложение: узел без заголовка, например узел в ячейке `TableRule`, карта подписывает расположением. Так вы решили на странице группы 7 (вопрос 1, вариант А, 2026-11-25). В предложении о ветке карты поправлен только английский текст; смысл тот же.»

### 2.3 Rule 10.12, "The order in which tools and checks run on a commit and on a push" (s-pcnyfp7gev7syax, `_guidelines/spec/10.12`)

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
> **Reason:** A project may run tools of its own on a commit or a push, such as a scan that checks that nothing internal reaches a public repository. Adopting SpecSheriff must not stop them, even where the SpecSheriff tools cannot run, for example on a machine without the SpecSheriff plugin. A team that needs the checks of the git hooks to apply to everyone runs them in CI.
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

### 2.4 Rule 10.3, "An agent's edit is checked before it is made" (s-83ev4wwesbwnhnp, `_guidelines/spec/10.3`)

Integrity and risk: the agreed `s-st6td4mua9uqt9z` ("An edit judged before it is made") already says both: `sheriff guard` judges only a node that the edit adds or changes, and it judges only the system's code, other than tests. In this repository, writing the tools' tests first then rests only on the owner's choice of 2026-10-28 in `CLAUDE.md`, and no guard enforces it. This risk is reported to the owner in one line.

### 2.5 Rule 10.2, "When the checks run" (s-epaw9sgyaajzn8g, `_guidelines/spec/10.2`)

**Decisions carried out:** the owner's agreement to rule 10.12 (`proposal:s-pcnyfp7gev7syax-g4`, 2026-11-24) and to row 10.1.37b (`proposal:row-10-1-37b`, s-yn5tdx2bp4f5rq7, 2026-11-25). Rule 10.12 runs the project's own tools on a push, and row 10.1.37b checks on a push what they change, regardless of the specification's approval status. Rule 10.2 names only the tests on a push (the item in "Found and owed" from the review of group 8, 2026-11-25).

Integrity: read literally, the item for the moment after an agent's edit also covers row 10.1.37b, since that check needs neither a commit message nor a run of the tests. None of a project's own tools for a git hook runs after an edit, so the check has nothing to examine there.

### 2.6 Rule 9.5, "Code and tests without a SpecTag" (s-kkbqcb9xrpaepwn, `_guidelines/spec/9.5`)

**Decisions carried out:** the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a: code or a test that a commit leaves unchanged is treated as rule 9.5 says, whether it carries no SpecTag or its SpecTags bind nothing, such as a SpecTag that names a section. The agreed `proposal:s-weuyx98r7c923ab` (`sheriff untagged`, agreed 2026-11-24) already lists "the system's code … that no SpecTag binds". Group 2's notes, item 15, found that rule 9.5 still says "carries no SpecTag". Proposal 2.8 says in rule 1.5.2 what binds and what does not. Changes 1.3 and 1.4 make the same rename in the nodes that restate rule 9.5 or name its check.

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

### 2.7 Rule 1.3.3, "When the status is approved" (s-9g7jj8z4yf9kq93, `_guidelines/spec/1.3.3`)

**Decisions carried out:** the item in "Found and owed" from group 6 (2026-11-24), "stands" becoming "is in force", in English only. The agreed reason also restated rule 9.5 in the wording that change 1.3 renames; the new reason no longer restates it. The agreed reason justifies the items of the text one by one, which the rule on reasons forbids, so the proposal brings it into line with that rule, and the change to rule 1.3.3 is a proposal rather than a change made without asking.

> The specification, a section and a rule have different approval conditions:
> - The specification as a whole is approved if an owner has carried out the approval procedure by hand (§s-qzthyh7yqvfhsa2).
> - A section is approved while every rule in it is approved (§s-9kfdycuq34beqvs). Nobody approves the section itself.
> - A rule is approved while an approval of its present wording is in force (§s-5ah25f6gy99panq).
>
> **Reason:** The status `approved` claims that an owner, or an agent on an owner's behalf as the rule on such approvals allows (§s-t5uw8zfxzhfdg86), has agreed to what the status covers. So the status holds only while that agreement holds. A section requires nothing of its own, so an owner has nothing in it to agree to beyond its rules.

Russian of what changes:
- the third item: «Правило одобрено, пока в силе одобрение его нынешней формулировки (§s-5ah25f6gy99panq).» (unchanged);
- the reason: «Статус `approved` утверждает, что ответственный или агент от его имени, как позволяет правило о таких одобрениях (§s-t5uw8zfxzhfdg86), согласился с тем, к чему этот статус относится. Поэтому статус действует, только пока действует это согласие. Раздел сам ничего не требует, поэтому ответственному не с чем в нём соглашаться, кроме его правил.»

`change`:
- «Третий пункт: по-английски «stands» стало «is in force», как в строке 10.1.8; по-русски и было «в силе». Во втором пункте поправлен только английский текст.»
- «Обоснование приведено к правилам о том, как пишется узел, раз узел всё равно меняется: прежнее обосновывало пункты текста по одному, что запрещает правило об обосновании. Новое говорит, что утверждает статус, и сохраняет согласованную вами 2026-11-20 мысль об агенте, который одобряет от имени ответственного. Фраза о коде за пределами коммита ушла вместе с прежним обоснованием.»

### 2.8 Rule 1.5.2, "How code is bound to its rules" (s-kgbzk2ph9e6jfb4, `_guidelines/spec/1.5.2`)

**Decisions carried out:** the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a, which proposal 2.6 carries out. Under rule 1.5.2, a SpecTag before a symbol "binds that symbol", so a symbol whose SpecTag names a section counts as bound, and the case that the rulings target slips through rule 9.5. The agreed s-9rtrj24myzjvshu already says that such a SpecTag binds nothing. Rule 1.5.2 says that code that implements no rule has a SpecTag that says so, but neither it nor rule 9.3, under which a SpecTag binds a rule to code, says whether that SpecTag binds the code. The agreed appendix (s-33fw3ga4ctd94dq, s-9rtrj24myzjvshu) treats such a SpecTag as one that binds the code. Reviewer A of the first review found this gap.

Russian:
- the first paragraph, which keeps its agreed Russian and gains one clause: «Код системы (§s-hheus6f395ynqvc) помимо тестов привязан к правилам, которые он реализует, с помощью SpecTag (§s-8xw4mgvpexyvw5q). У кода, который не реализует никакого правила, есть SpecTag, который говорит об этом, и этот SpecTag тоже привязывает код.»
- the new sentence of the third paragraph, after «SpecTag в начале файла и запись в файле привязок привязывают весь файл.»: «SpecTag, который называет узел, не являющийся правилом, например раздел, ничего не привязывает.»

### 2.9 Terms that only one domain needs: rule 3.2, row 10.1.6, and a rule and two rows of the Domains extension

The note of 2026-11-12 left one point open: whether a term in the contracts section that only one domain needs is an error. That point is question 4.6. The wordings below follow its recommended answer, B, under which such a term is refused. Under A:
- rule 3.2 says "may instead let one of the parts … define the terms that no other part of the base specification needs";
- the new Domains rule opens with "A term may be defined in a domain (§s-ypa92gpcj3f5zj8) if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it (§s-vj7ercem526zd6v).";
- its reason becomes "A term that only one domain needs belongs to that domain's subject area, so a reader finds it beside the rules that need it.";
- the second row of table 11.3 is not added.

> **Title:** A term is defined once
>
> Where a section needs terms of its own, they are added to the contracts section. An extension of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g) may instead require one of the parts into which the base specification is divided (§s-qmmzf9nksfsa3qp) to define the terms that no other part of the base specification needs. Wherever it is defined, a term is defined once: one term that names two things is refused, and so are two terms that name one.
>
> **Reason:** A term defined once, where every rule that needs it can cite it, means the same thing in each of those rules.

Russian: заголовок «Термин определяется один раз»; текст «Если разделу необходимы собственные термины, их добавляют в контракты. Выбранное проектом расширение guidelines (§s-9ttvcwpqkehm58g) может вместо этого требовать, чтобы одна из частей, на которые разделена базовая спецификация (§s-qmmzf9nksfsa3qp), определяла термины, которые не нужны никакой другой части базовой спецификации. Где бы термин ни был определён, он определяется один раз: один термин, называющий две вещи, или два термина, называющие одну, отклоняются.»; обоснование «Термин, определённый один раз там, где на него могут сослаться все правила, которым он нужен, означает в каждом из них одно и то же.»

`change`: «Новое предложение: выбранное расширение guidelines может потребовать, чтобы часть базовой спецификации определяла термины, которые не нужны никакой другой её части. Так исполняется ваше решение от 2026-11-12, записанное на строке 10.1.6, для расширения Domains; расширение не может отменить это правило (правило 1.7.2), поэтому правило должно само это допускать, не называя расширения (правило 1.7.3). Заголовок больше не говорит «в контрактах», так как это теперь не единственное место. Обоснование заменено: прежнее говорило о разделе, который придумывает собственные слова, а это новое предложение теперь допускает. Согласованный русский текст первого предложения сохранён; в последнем предложении поправлен только английский текст.»

Links: none added. The row's `checks` link to s-ypa92gpcj3f5zj8 serves for the new citation.

> **Title:** A term defined in a domain
>
> A term is defined in a domain (§s-ypa92gpcj3f5zj8) if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it (§s-vj7ercem526zd6v). Before any other node cites such a term or links to it, whoever writes that citation or link moves the term to the contracts section (§s-z6tq6a3btnvvwx7).
>
> **Reason:** A term that only one domain needs belongs to that domain's subject area, so the contracts section keeps only what the domains share.
>
> **Example:** The domain of users defines the term "account", which only its own rules and the part of the technical appendix named after it cite. A rule of the domain of requests then needs the term. Whoever writes that rule moves the term to the contracts section before the rule cites it. The most likely mistake is to define the term a second time in the domain of requests.

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

### 3.1 A rule on setting a repository up and taking SpecSheriff out of it (formerly question 8)

**The problem.** No rule of the base requires a way to take SpecSheriff out of a repository, or to set one up. The agreed node "Setting a repository up and taking SpecSheriff out of it" (s-7unxytshhc4md54) describes both. Its `implements` links go to rules 10.2, 10.13 and 1.1.6, which say nothing of either procedure. The agreed node on the skill `spec-remove` (s-jn3rauw6a8zeefn) links to rule 2.5 only because the agreed row 10.1.23 requires an `implements` link to some rule (group 8's base question 2; the item in "Found and owed" from group 6). The agreed node on the skill `spec-init` (s-ttsc8tpnu46q53s) runs `sheriff init`, but its only `implements` link goes to the rule on what the reviewer judges (s-m4h279nbaqkpa3t), since it asks for the reviewer's settings. The owner's rule "A defect found is fixed at once" says that the owner is not asked when to fix a defect, so this is shown as a new rule for agreement.

> **Title:** Setting a repository up and taking SpecSheriff out of it
>
> One procedure of the SpecSheriff tools sets a repository up for those tools, and another takes SpecSheriff out of it. Taking SpecSheriff out removes what setting the repository up wrote outside the specification. It also removes the settings of the SpecSheriff tools that the repository's configuration holds, including the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2), its `strict` flag (§s-q3pfzyaxvpr2zj2) and the extensions that the project has chosen (§s-9ttvcwpqkehm58g). It leaves the specification, the bindings file (§s-kgbzk2ph9e6jfb4), the system's code (§s-hheus6f395ynqvc), and the repository's own tools and their tests as they are.
>
> **Reason:** A project can take up SpecSheriff or stop using it without knowing which files and settings the SpecSheriff tools need, and keeps its specification, which states what its system does, either way.

Russian: заголовок «Настройка репозитория и удаление из него SpecSheriff»; текст «Одна процедура инструментов SpecSheriff настраивает для этих инструментов репозиторий, а другая удаляет из него SpecSheriff. Удаление SpecSheriff убирает то, что настройка репозитория записала вне спецификации. Оно убирает и настройки инструментов SpecSheriff, которые содержит конфигурация репозитория, в том числе записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2), её флаг `strict` (§s-q3pfzyaxvpr2zj2) и выбранные проектом расширения (§s-9ttvcwpqkehm58g). Спецификацию, файл привязок (§s-kgbzk2ph9e6jfb4), код системы (§s-hheus6f395ynqvc), а также собственные инструменты репозитория и их тесты оно оставляет как есть.»; обоснование «Проект может начать или перестать пользоваться SpecSheriff, не зная, какие файлы и настройки нужны инструментам SpecSheriff, и в любом случае сохраняет свою спецификацию, которая говорит, что делает его система.»

Risk: anyone who runs the removal also removes the entries that only an owner records, as the agreed s-7unxytshhc4md54 already says, so running the setup again leaves the specification a draft until an owner runs the approval procedure. Running the setup again also leaves no extension chosen, although rule 1.7.6 keeps an extension chosen while a node depends on it. Until an owner chooses each such extension again (rule 1.7.5), `sheriff validate` refuses every node of a kind that the extension adds, since the schema is composed only from the chosen extensions (rule 5.1). A draft specification only weakens the checks, and anyone can skip the git hooks anyway, with `git commit --no-verify`.

Russian of the risk: «Риск: тот, кто запускает удаление, удаляет и записи, которые вносит только ответственный, — так уже говорит согласованный s-7unxytshhc4md54, — поэтому после повторной настройки спецификация остаётся черновиком, пока ответственный не проведёт процедуру одобрения. После повторной настройки не выбрано и ни одно расширение, хотя правило 1.7.6 оставляет расширение выбранным, пока от него зависит узел. Пока ответственный снова не выберет каждое такое расширение (правило 1.7.5), `sheriff validate` отвергает каждый узел того типа, который это расширение добавляет, так как схема собирается только из выбранных расширений (правило 5.1). Черновик спецификации лишь ослабляет проверки, а пропустить git-хуки и так может любой, с помощью `git commit --no-verify`.»

### 3.2 A rule on the model and the reasoning effort that an agent uses (formerly question 9)

**The problem.** The agreed node "The skills of the SpecSheriff plugins" (s-kq6wmdud9c7j2k9) says that the skills run with the model and the reasoning effort that the user has chosen. No rule of the base says so, so that node also links to rule 2.5 only to satisfy row 10.1.23 (group 8's base question 2). The owner ruled on 2026-11-02, as recorded on s-xr5xxa9cxf2mq5u, that "no choice that costs a user tokens is made without their consent": the skills use the model and the effort of the user's session, and every run outside it, at present only the reviewer's, uses the model and the effort that the user has confirmed on their machine. On 2026-11-25 the owner decided that `spec`, `spec-review` and `spec-adopt` are to be described in nodes of their own in task T34. The new rule names a skill only as the place where an agent runs; a rule that names the skills belongs to task T34. The owner's rule "A defect found is fixed at once" applies here too.

> **Title:** Who chooses an agent's model and reasoning effort
>
> Wherever the SpecSheriff tools or a skill of a SpecSheriff plugin runs an agent, that agent uses a model and a reasoning effort chosen by the person on whose machine it runs:
> - the agent of a session in which a skill runs, and any agent that the skill starts, use those of that person's session;
> - any other agent, such as the reviewer (§s-m4h279nbaqkpa3t), uses those that the person has confirmed on that machine. Until the person confirms them, it uses defaults. The SpecSheriff tools name each default in every run that uses it.
>
> **Reason:** Whoever runs an agent pays for that run, so only they decide what it costs.
>
> **Example:** A skill of a SpecSheriff plugin starts an agent to review a draft. That agent uses the model and the reasoning effort of the session in which the skill runs. The most likely mistake is a skill that names a model or an effort of its own, so that the person pays for a run they did not choose.

Russian: заголовок «Кто выбирает модель и усилие рассуждения агента»; текст «Где бы инструменты SpecSheriff или skill плагина SpecSheriff ни запускали агента, этот агент работает с моделью и усилием рассуждения, которые выбрал человек, на чьей машине он работает:
- агент сессии, в которой работает skill, и любой агент, которого этот skill запускает, работают с моделью и усилием сессии этого человека;
- любой другой агент, например рецензент (§s-m4h279nbaqkpa3t), работает с теми, которые этот человек подтвердил на этой машине. Пока человек их не подтвердил, агент работает со значениями по умолчанию. Инструменты SpecSheriff называют каждое такое значение в каждом запуске, который его использует.»; обоснование «Тот, кто запускает агента, платит за этот запуск, поэтому только он решает, сколько этот запуск стоит.»; пример «Skill плагина SpecSheriff запускает агента, чтобы проверить черновик. Этот агент работает с моделью и усилием рассуждения сессии, в которой работает skill. Самая вероятная ошибка — skill, который сам называет модель или усилие, так что человек платит за запуск, которого не выбирал.»

Decision for `meta.decisions`: date 2026-11-02; problem "The reviewer ran with the models that the tools or the project's settings chose, though each run is paid for by the user who commits."; ruling "The owner: no choice that costs a user tokens is made without their consent. The skills use the model and the effort that the user has chosen in their session; every other run, at present only the reviewer's, uses the model and the effort that the user has confirmed on their machine."; type textual.

`change`: «Новое правило по вашему решению от 2026-11-02: модель и усилие рассуждения агента выбирает человек, на чьей машине он работает, так как он и платит за запуск. Пока человек не подтвердил настройки, агент использует значения по умолчанию, и инструменты SpecSheriff называют их, как уже говорит согласованный узел о настройках каждого runner. Правило называет skill только как место, где работает агент; правило, которое называет сами навыки, будет в задаче T34. Правило говорит «человек, на чьей машине работает агент», а не «пользователь», так как в базе «user» значит пользователя системы (правило 4.3).»

### 3.3 Rule 8.6, "A rule may be a table": no term in a cell (formerly question 11)

**The problem.** Rule 8.6 lets a cell hold "a node of a kind that the specification's schema declares, such as a rule or a term", and says that a node in a cell has no title. Rule 8.5 locates a term by its name. So a term in a cell has no name and so no location, and rules 3.2 and 10.1.7, which compare terms by name, cannot apply to it. Rule 8.6 thus contradicts itself. The review of s-vke5hakwf3uyrjs found this on 2026-11-22 (`t25-one-thought.md`, line 80), and that agreed node already counts only the sids of the nodes in cells. A list that named only what is forbidden, a term, would let other kinds with a title into a cell unnoticed: a section, a `TableRule` and a RecordType (rule 7.2.6).

**New wording** (the reason stays as it is, except for an English-only rewording of its second sentence):

### 3.5 Rule 12.6 and rows 12.12.6 and 12.12.7: the fields that a RecordType variant adds (formerly question 14)

**The problem.** The agreed item 55 (s-nk8td3ez58gahc4, agreed 2026-11-25) already defines the fields that a variant adds: those that it declares and those that it takes through `refines` from a RecordType other than its RecordType and the RecordTypes that its RecordType reaches. Rows 12.12.6 and 12.12.7, and the last sentence of rule 12.6, look only at the fields that the variant declares. So a variant whose fragment of a format holds a field with the name of one of its RecordType's fields passes, and a variant that adds fields only through a fragment is refused (group 7's base question 3). Keeping only the declared fields would reopen the agreed item 55, so this proposal brings the base into line with that node.

Both rows already have a `checks` link to s-z3dnru6qqdf9m6j, which serves for the new citation, so no link is added.

### 3.6 Two rows of table 12.12: `additionalProperties` and `unevaluatedProperties` at the top level of a RecordType variant and of a RecordType that has variants (formerly question 15)

**The problem.** A variant's definition is reached through `then` from its RecordType's definition. There, `additionalProperties` or `unevaluatedProperties` at the top level of the variant's `schema` refuses the fields of its RecordType, so every data record of the variant is refused. The page accepted on 2026-11-19 establishes that a variant does not write `unevaluatedProperties` («Вариант не пишет unevaluatedProperties»). Rule 12.6 already says that a data record holds the fields of its variant alongside those of its RecordType, so no sentence is added to rule 12.6. Dropping such a keyword silently, in `sheriff types`, would be the defect that `.claude/vt/rules.md` names, dropping data silently.

The reverse case fails too. Under JSON Schema 2020-12 (Core, 10.3.2.3), `additionalProperties` depends only on `properties` and `patternProperties` in its own schema object. At the top level of the definition of a RecordType that has variants, it therefore refuses each field that a variant adds through `allOf` and `then` (s-nk8td3ez58gahc4). The accepted page uses `unevaluatedProperties: false` there, which does see those fields. Each row states one thought, so the two rows stay separate.

**New wording.** Two new rows of table 12.12, after row 12.12.7, each with a `checks` link to s-z3dnru6qqdf9m6j. The first is checked through the schema of the RecordType extension, as s-dk3zfkbhc3v6xbp checks `enum`, since a variant names its values in its own `answersTo`. The second is checked by `sheriff validate` with the variants that s-c2r9jndrjbtbsv6 finds, since only other nodes show whether a RecordType has variants.

The first row:

Russian: «Верхний уровень `schema` варианта RecordType не содержит ни `additionalProperties`, ни `unevaluatedProperties` | отвергается»

The second row:

Russian: «Верхний уровень `schema` RecordType, у которого есть варианты RecordType, не содержит `additionalProperties` | отвергается»

### 3.7 A row of table 12.12: `"type": "object"` in a RecordType's `schema` (formerly question 16)

**New wording.** A new row of table 12.12, after the row that proposal 3.4 adds, with `checks` links to s-6eb92ddch7shuvu and s-wxcmpbvy9bzkfj9:

### 3.8 A row of table 12.12: a RecordType is declared in the base specification (formerly question 18)

**The problem.** Rule 12.1 requires a RecordType to be declared in a section of the base specification, or, for a fragment of a format, in the contracts section. The contracts section is a section of its own within the base specification (rule 3.1, §s-z6tq6a3btnvvwx7), so the row admits a fragment of a format declared there. No row of table 12.12 checks rule 12.1's requirement. A RecordType kept elsewhere, such as in `specs/tech/`, belongs to no part of the system under the agreed item 47, so the reference checks skip it (group 5's notes, round d). The owner's rules "What can run as a deterministic process is automated" and "A release carries out every rule it contains" leave no other choice.

### 4.1 Whether a node's kind is part of its wording (formerly question 2)

**The problem.** Rule 1.3.5 lists what an approval covers: the title, the text, the reason, the examples and the fields that the kind adds. It does not list the kind itself. The agreed fingerprint (`new:tools-11-fingerprint`, s-f5brvuuu6xmkj6t, agreed 2026-11-25) leaves the kind out, as the code does (`NOT_WORDING` in model.ts). So an agent can turn an approved rule into a term and the node stays approved, although a term needs no code. The reverse turns a term into a rule that code must now implement, without the approval of any owner (review g6-a, F4).

**Options.**
- **A (recommended). The kind is part of the wording.** What a person sees: changing a node's kind makes the node a draft, and the guard refuses an agent's edit that leaves such a node approved. Cost: rule 1.3.5 changes, and rule 1.3.2's fourth item is removed; the agreed fingerprint node includes the kind, under the names that earlier releases wrote for the kinds that have since been renamed, `rule`, `recordType` and `domain`, as it already does for the sources of a field's values; code and tests in stage 3. Each approval recorded before this release lapses for every node whose fingerprint gains the kind. The fingerprint can leave out the kind `TextRule`, so that only terms, RecordTypes and `TableRule`s have to be approved again; that choice belongs to the fingerprint node. Risk: none found.
- **B. The kind stays outside the wording, and rule 1.3.5 says so.** What a person sees: a rule turned into a term keeps its approval. Cost: one item in rule 1.3.5's list of what an approval survives; rule 1.3.2's fourth item is still removed. Risk: an agent can remove the requirement for code from an approved rule without an owner's approval.

> The wording an approval covers is a node's kind, title, text, reason and examples, and the fields the node's kind adds alongside them, such as `TextRule.list`. A change to any of these makes the node a draft, even where the change is made by one of the node's owners. The wording of a node in a cell of a `TableRule` also includes the text cells of its row and the headings of its column and of its group.
>
> An approval survives a change to:
> - the node's links or its metadata;
> - who its owners are;
> - what is built into it from other nodes;
> - where it is in the specification.
>
> **Reason:** A node requires only what its wording states. Its kind belongs to that wording, since the kind decides, for example, whether code must implement the node. So an approval lapses when that wording changes, and not otherwise. Everything else about a node changes as the specification grows around it.

### 4.2 A check of the structure of the technical appendix in a project without the Domains extension (formerly question 3)

**Recommendation: A, one row of the main table that applies in every project, with row 11.3.5 narrowed to the names of the files.** Basis:
- the owner's ruling of 2026-11-18 on row 11.3.5: "the technical appendix refines how the rules of the base specification are implemented, so its structure matches that of the base specification, its domains and their sections included, as far as needed". The ruling states a property of the base specification as a whole;
- the owner's rule "A release carries out every rule it contains", and today's code, which already refuses a wrongly named file in a project without domains;
- a domain is a folder of the base specification (rule 8.5, as group 5 renamed the term on 2026-11-24). So a row worded in terms of folders covers a project with domains too, and names no extension (rule 1.7.3). Its second sentence keeps the check, now made by row 11.3.5 and item 42, that a section in a file named after a domain matches a section of that domain. Row 11.3.5 keeps what the main table cannot state without naming the extension: that each file of the technical appendix is named after a domain. So rule 11.1.1 keeps its check.

> **What is checked:** Every section of the technical appendix (§s-tj38pvm38nepaf5), other than the section for the stack, the technical debt section (§s-vj7ercem526zd6v) and the first top-level node of a file named after a folder of the base specification (§s-5x737t9nee4zgaa), has the same path of titles as a section of the base specification (§s-qmmzf9nksfsa3qp): the titles of the sections that hold it, from the top down, followed by its own. In such a file, the path of titles starts below the first top-level node, which represents that folder, and the section of the base specification with the same path of titles is in that folder
>
> **On failure:** refused

Russian: «У каждого раздела технического приложения (§s-tj38pvm38nepaf5), кроме раздела стека, раздела технического долга (§s-vj7ercem526zd6v) и первого узла верхнего уровня файла, названного по папке базовой спецификации (§s-5x737t9nee4zgaa), тот же путь заголовков, что и у раздела базовой спецификации (§s-qmmzf9nksfsa3qp): заголовки разделов, которые его содержат, сверху вниз, а за ними его собственный. В таком файле путь заголовков начинается ниже первого узла верхнего уровня, который представляет эту папку, а раздел базовой спецификации с тем же путём заголовков находится в этой папке | отвергается»

Row 11.3.5, narrowed, keeping its `checks` links to s-h6h25ctd3yryudh and s-vj7ercem526zd6v; the `checks` link to s-vj7ercem526zd6v serves for its new citation, and its `checks` link to s-qmmzf9nksfsa3qp moves to the new row:

### 4.3 Code at the top level of a file, outside every symbol (formerly question 4)

**Recommendation: A, SpecTags at the start of such a file bind its code that is outside every symbol and is not an import.** Basis:
- the first sentence of rule 1.5.2: the system's code other than tests is bound by SpecTags to the rules it implements;
- the principle "Rule, test and code bound by the sid": the code that implements a rule is bound to it by a SpecTag;
- rule 1.5.2 already binds, by SpecTags at its start, a file whose symbols cannot be identified, so this uses a way of binding that the SpecSheriff tools already read.

**Options.**
- **A (recommended). SpecTags at the start of the file bind its code that is outside every symbol and is not an import.** What a person sees: a file with such statements has a SpecTag at its start; a commit that changes such a statement names in its message the rule that the SpecTag at the file's start names, and the reviewer is given the statement. Cost: rule 1.5.2 and row 10.1.26 change; in stage 3 these agreed appendix nodes each gain a sentence, with code and tests: the node on how a symbol carries its SpecTags (s-33fw3ga4ctd94dq), the node on what a commit changes (s-2x58az67bm6cxq2), the node on the list of code that no SpecTag binds (`proposal:s-weuyx98r7c923ab`), the node that refuses any SpecTag that is not directly above a symbol (s-9rtrj24myzjvshu), and the judgement on the code that a commit changes (`proposal:new-tools-7-3-review-code`), which gives the reviewer only changed symbols and files bound as a whole. Risk: the description of each language must say what counts as an import.
- **B. Every statement of such a file other than an import is inside a symbol.** What a person sees: a file with a top-level call is refused until the call is moved into a function. Cost: a new refusal and a row. Risk: some languages and frameworks expect code at the top level, as in a Python entry point.
- **C. Code outside every symbol stays unbound, and rule 1.5.2 says so.** This contradicts the principle "Rule, test and code bound by the sid". What a person sees: no change; a commit that changes only a top-level statement names no rule, and the reviewer never sees it. Cost: one sentence. Risk: logic written at the top level escapes every binding check and the review.

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
> **Examples:** the two agreed examples, and a new one: "A Python file defines a function and ends with a call that starts a server, outside every function. A comment at the start of the file holds the SpecTag of the rule that the call implements. The most likely mistake is to leave the call bound to no rule because the file's symbols carry SpecTags."

> **What is checked:** The system's implementing code (§s-hheus6f395ynqvc) is bound by SpecTags as follows (§s-kgbzk2ph9e6jfb4): each symbol that the checks can identify, by a SpecTag directly before it; the code of the same file that is outside every symbol and is not an import, by SpecTags at the file's start; any other file, by SpecTags at its start or by an entry in the bindings file. Each SpecTag names a rule implemented by the code that it binds, or says that the code implements none
>
> **On failure:** refused; for code that the commit leaves unchanged, the result is what the rule on code that no SpecTag binds says (§s-kkbqcb9xrpaepwn)

Russian: «Реализующий код системы (§s-hheus6f395ynqvc) привязан SpecTag следующим образом (§s-kgbzk2ph9e6jfb4): каждый символ, который проверки могут определить, — SpecTag непосредственно перед ним; код того же файла вне всех символов, кроме импортов, — SpecTag в начале файла; любой другой файл — SpecTag в его начале или записью в файле привязок. Каждый SpecTag называет правило, которое реализует привязанный им код, или говорит, что этот код не реализует никакого правила | отклоняется; для кода, который коммит не меняет, — как говорит правило о коде, который не привязан ни одним SpecTag (§s-kkbqcb9xrpaepwn)»

### 4.4 A file of RuntimeChecks, bound as a whole to every RecordType for which it holds a definition (formerly question 5)

**Nodes concerned:** under B, rule 1.5.2 (s-kgbzk2ph9e6jfb4), row 10.1.26 (s-k6dzuajejrw4cej), and the agreed appendix nodes s-33fw3ga4ctd94dq, s-9rtrj24myzjvshu, s-h5rfyy9j8nnhx62, s-suv42g8r3ra2h6b and s-dbk2vyeg8z5jxna; under A, rule 9.6, "The nodes a commit message names" (s-ef93u6cnbs2sevr), row 10.1.28a (s-wpadgy2budcxa3v) and row 10.1.42 (s-7sk3s553ukzwtbm).

**Options.**
- **A. Rows 10.1.28a and 10.1.42, and rule 9.6, leave out the files generated from the specification.** What a person sees: a commit that approves one RecordType regenerates the file of RuntimeChecks and passes, even while another RecordType in the file is being revised; its message names only what the developer changed by hand. Cost: rule 9.6 and two rows change, and so do their agreed appendix nodes (s-w93jfnqynfa47pf, s-qqs2svksmjct753); code and tests in stage 3. Risk: the history of a generated file no longer names its nodes in each commit message, and every generated file is exempted from those rows to solve a problem with one file.
- **B (recommended). Each definition is bound on its own, by a SpecTag in its `$comment`.** What a person sees: as under A, and the commit message names only the RecordType that changed. Cost: rule 1.5.2 gains a way of binding for a file whose format allows no comments but gives each of its symbols a comment property, and row 10.1.26 changes to match; the node on how a symbol carries its SpecTags (s-33fw3ga4ctd94dq) gains a description of JSON Schema as a language whose symbols are the definitions under `$defs`; the node that refuses a SpecTag that is not directly above a symbol (s-9rtrj24myzjvshu) accepts one in a comment property; these nodes agreed in group 7 change: the node on the entry in the bindings file for a file of RuntimeChecks (s-h5rfyy9j8nnhx62) is removed, the node on what a RecordType generates (s-suv42g8r3ra2h6b) says that the `$comment` is written, and the check of generated copies (s-dbk2vyeg8z5jxna) no longer compares that entry; code and tests in stage 3. Risk: nodes agreed on 2026-11-25 are changed again.
- **C. A file of RuntimeChecks for each RecordType.** What a person sees: one generated JSON file for each RecordType, each bound to its RecordType by its own entry. Cost: the agreed list of files and its refusals (s-pvzms7d8kxb8dk2) change. Risk: a project's list of generated files grows with every RecordType.
- **D. Nothing changes.** What a person sees: every commit that changes a RecordType names every RecordType of the file in its message, and while any of them is a draft, no commit that changes the file goes through. Cost: none. Risk: no change to another RecordType can be committed while one is under revision.

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

**The changed clauses of row 10.1.26 under B,** added to the wording of question 4.3:
- "each symbol that the checks can identify, by a SpecTag directly before it or, in a file whose format allows no comments, in the symbol's comment property;"; Russian «каждый символ, который проверки могут определить, — SpecTag непосредственно перед ним или, в файле, формат которого не допускает комментариев, в свойстве символа для комментария;»;
- "the code of the same file that is outside every symbol and is not an import, by SpecTags at the file's start or, in a file whose format allows no comments, in the comment property of the file's top-level object;"; Russian «код того же файла вне всех символов, кроме импортов, — SpecTag в начале файла или, в файле, формат которого не допускает комментариев, в свойстве для комментария объекта верхнего уровня этого файла;».

`change` of row 10.1.26 under B: «Для файла без комментариев добавлена привязка SpecTag в свойстве для комментария: у символа и у объекта верхнего уровня.»

### 4.5 No check that a SpecTag outside the system's code names a rule of the guidelines (formerly question 7)

**Options.**
- **A. A setting names the paths of the repository's own tools, and rows check both halves.** What a person sees: a project lists the paths of its own tools; a SpecTag outside the system's code and outside those paths is refused, and so is a SpecTag within those paths that names anything but a rule of the guidelines. Cost: a new setting, with its schema and node; two rows; code and tests. Risk: a project that forgets to list a tool's path has that tool's SpecTags refused.
- **B (recommended). Rule 10.10 drops the restriction on where such a SpecTag appears, and a row checks what it names.** What a person sees: a SpecTag anywhere outside the system's code that names anything but a rule of the guidelines is refused, and the refusal names its file and its line. Cost: rule 10.10's title and a sentence of its text; a row; a sentence in an appendix node, such as s-m8nmfsxkcfu7cjp; code and tests in stage 3. Risk: a guide may now quote a SpecTag that names a rule of the guidelines, although such a SpecTag counts for nothing. It also departs from the owner's ruling of 2026-11-13, under which a SpecTag appears only in the system's code and its tests. The ruling of 2026-11-17 extended that only to the repository's own tools and their tests.
- **C. Rule 10.10 drops both restrictions, and no row is added.** What a person sees: a SpecTag outside the system's code may name any node, and nothing refuses it. Cost: a sentence of rule 10.10. Risk: a SpecTag that is in a tool and names a rule of the base specification tells a reader that the tool implements that rule, although it counts for nothing.

Rule 10.10: its title becomes "What a SpecTag names"; its second paragraph becomes the following, while its first paragraph and its reason stay as they are:

A new row of the main table, in the group "The specification and the code", after row 10.1.28, with a `checks` link to s-sfjka4zc4rhfu67 and a `cites` link to s-hheus6f395ynqvc:

### 4.6 A term in the contracts section that only one domain needs (formerly question 10)

**The problem.** The owner's decision of 2026-11-12, which proposal 2.9 carries out, settles where a term that only one domain needs is defined. The note of 2026-11-12 left one point open: "ask whether a term in contracts that only one domain uses is an error" (`t25-one-thought.md`, line 1250). Under proposal 2.9, a term in a domain must be moved to the contracts section before any other node cites it. The open point is the reverse: whether a term in the contracts section must be moved into a domain as soon as only that domain cites it.

**Nodes concerned:** rule 3.2 (s-ypa92gpcj3f5zj8), and the new rule of the Domains extension and its rows, in proposal 2.9.

**Recommendation: B, such a term is refused.** Basis:
- the owner's ruling of 2026-11-12 says that "a term that one domain needs is defined in that domain". The owner's rule "A proposal is based on the owner's earlier rulings on its subject" gives those words priority;
- under B, the place of every term follows from which nodes cite it, so a check can determine it;
- the reason of the new rule in proposal 2.9, "so the contracts section keeps only what the domains share", holds only under B.

**Options.**
- **A. A term in the contracts section stays valid however many domains cite it.** What a person sees: a term that only one domain needs may stay in the contracts section, or be defined in that domain. Cost: rule 3.2 keeps "may instead let one of the parts … define"; the Domains rule of proposal 2.9 opens with "A term may be defined in a domain … if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it"; its reason becomes "A term that only one domain needs belongs to that domain's subject area, so a reader finds it beside the rules that need it"; and the second row of table 11.3 is not added. Risk: the contracts section may hold terms that only one domain needs. Reason for A: under A, rule 3.2 only lets an extension allow a part to define its terms, so a term in the contracts section is never wrong, and refusing such a term would make a commit fail whenever it removes another domain's last citation of a shared term.
- **B (recommended). Such a term is refused.** What a person sees: `sheriff validate` refuses a term in the contracts section if at least one node cites it or links to it and every such node is in one domain or in the part of the technical appendix named after that domain, until the term is moved into that domain. Cost: proposal 2.9 as it stands, with the second row of table 11.3, its node and its code. Risk: removing a domain's last citation of a shared term makes the commit fail until the term is moved.

**New wording under B:** proposal 2.9 as it stands. Rule 3.2 says "may instead require one of the parts … to define the terms that no other part of the base specification needs". The new Domains rule opens with "A term is defined in a domain (§s-ypa92gpcj3f5zj8) if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it (§s-vj7ercem526zd6v)."; Russian «Термин определяется в домене (§s-ypa92gpcj3f5zj8), если на него ссылается или с ним связан хотя бы один узел и каждый такой узел находится в этом домене или в части технического приложения, названной по нему (§s-vj7ercem526zd6v).»

### 4.7 One convention for SpecSheriff's own keywords within a `schema` (formerly question 13)

**Recommendation: B, SpecSheriff's own vocabulary, in which `enumSource` has no prefix.** Basis:
- the page `recordtype-jsonschema.html`, which the owner accepted on 2026-11-19, chose in its decision R8 "a vocabulary of SpecSheriff's own, declared through `$vocabulary`" for `identifiedBy`, `identifierOf`, `chosenBy`, `answersTo` and the keyword that names the source of the collected values. The owner's rule "A proposal is based on the owner's earlier rulings on its subject" gives that choice priority;
- neither `identifierOf` nor `x-enumSource` reaches a RuntimeCheck: the agreed item 56 replaces `x-enumSource` with `enum` and `identifierOf` with the keywords of the identifying field. So the convention affects only the node files, which the SpecSheriff tools check with their own schema.

New information that bears on the choice. The JSON Schema project announced in February 2023 that its next release would forbid keywords that no listed vocabulary declares, while keywords starting with `x-` stay allowed as annotations ([json-schema.org, "The Last Breaking Change", 2023-02-23](https://json-schema.org/blog/posts/the-last-breaking-change); [json-schema.org, "Custom Annotations Will Continue", 2023-02-22](https://json-schema.org/blog/posts/custom-annotations-will-continue)). So `enumSource` will stay valid only if SpecSheriff's vocabulary is declared through `$vocabulary` in a meta-schema. A search on 2026-11-25 found no sign that that release has been published.

**Options.**
- **A. `x-identifierOf`, the `x-` prefix on both `identifierOf` and `enumSource`.** What a person sees: `x-identifierOf` and `x-enumSource` read as annotations to any JSON Schema tool, with no vocabulary to declare. Cost: rows 12.12.2 and 12.12.3, items 44, 47 and 56, the migration and the schema all change. Risk: it departs from decision R8 of the accepted page.
- **B (recommended). `enumSource`, declared with `identifierOf` in a vocabulary of SpecSheriff's own.** What a person sees: no prefix on either keyword. Cost: a meta-schema that declares SpecSheriff's vocabulary through `$vocabulary`, referred to by the schema of the RecordType extension; the agreed appendix nodes that name `x-enumSource` are changed to call it `enumSource` (s-ztseyetus7np6br and its later proposal, s-5nf87c3e3jg9v7c, s-dk3zfkbhc3v6xbp, s-gb8s9657a65hqmv and its later proposals, s-qzyacnqwvaeaps4, s-k4nqjr96ux7a5m7, s-4npdup7mjkva69y). No node of the base changes. Risk: a JSON Schema tool that a project points at a node file, rather than at a RuntimeCheck, sees two keywords that it cannot read unless it loads that meta-schema.
