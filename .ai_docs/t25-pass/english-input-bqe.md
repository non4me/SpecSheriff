# base-questions.md: the paragraphs changed since base-questions.before-e.md

# T25: the questions about the base specification that stage 2 deferred

This file gathers the questions about the base specification, and the changes to it, that the review of the appendix of the tools deferred, and every change to the base that the owner has already decided on. The main session shows it to the owner on one page. The briefs are `briefs/t25-base-questions-brief.md`, `fix-brief-bq-b.md` for round b, `fix-brief-bq-c.md` for round c and `fix-brief-bq-d.md` for round d; `base-questions-notes.md` says how each finding in each round's reports was addressed. The earlier versions are `base-questions.before-b.md`, `base-questions.before-c.md` and `base-questions.before-d.md`.

## 1. Changes made without asking

Each change below is one of these: a rename that a decision requires, a replacement that changes no meaning, or a new link. A rename falls under the owner's rule "What a decision removes or renames is removed or renamed without asking again". A replacement that changes no meaning is approved on the owner's behalf, as the rule on what an agent approves on an owner's behalf allows (§s-t5uw8zfxzhfdg86). A link is not part of what an approval covers (§s-5ah25f6gy99panq), so adding one does not need an owner's agreement. The main session makes each change, and the node stays agreed; the main session reports the change in one line. Changes 1.3 and 1.4 are made together with proposal 2.6, once the owner accepts it, so that rule 9.5 and the nodes that restate it or name its check change together.

### 1.1 Two replacements in the same sentences of an agreed node of the appendix of the tools

**Follows from:**
- the item in "Found and owed" from group 6 (2026-11-24): an approval "is in force" in the appendix of the tools and in row 10.1.8, while some nodes still say that it "stands". Rules 1.3.3 and 10.3 get the same replacement in their proposals, 2.7 and 2.4;
- the item in "Found and owed" from group 5 (2026-11-24), line 1664 of `t25-one-thought.md`: s-ztseyetus7np6br uses "a field that has an `enum`" in place of the term "a field with `enum`" of rule 12.7. Replacing that wording with the term is a technical replacement that is due when that node next changes. It changes now, so the replacement is made here. s-agc6fb3vx46pc23 keeps the phrase until its next change.

### 1.3 "carries no SpecTag" becomes "that no SpecTag binds" in rules 1.3.2, 10.6 and 10.7

**Follows from:** the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a, which proposal 2.6 carries out in rule 9.5. These rules restate rule 9.5 in its earlier wording. Proposal 2.7 rewrites, without the phrase "carries no SpecTag", rule 1.3.3's reason, which also restated rule 9.5. The second example of rule 10.6, about two symbols that "have no SpecTag", stays as it is: such symbols are among those that no SpecTag binds.

### 1.4 The same rename in four agreed nodes of the appendix of the tools

**The changes:**
- s-3xx2eukc8gtd2tx (`new:tools-7-2-outside`), its text: "…as the rule on code and tests without a SpecTag (§s-5z5gnu7pahr82xp) requires (§s-kkbqcb9xrpaepwn):" becomes "…as the rule requires (§s-kkbqcb9xrpaepwn) for code and tests that no SpecTag (§s-5z5gnu7pahr82xp) binds:"; Russian «…так, как требует (§s-kkbqcb9xrpaepwn) правило о коде и тестах, которые не привязаны ни одним SpecTag (§s-5z5gnu7pahr82xp):»;
- s-3xx2eukc8gtd2tx, its reason: "The approval status and the `strict` flag decide what code without a SpecTag outside the commit costs the commit: nothing, a warning or a refusal." becomes "The approval status and the `strict` flag decide what code that is outside the commit, and that no SpecTag binds, costs the commit: nothing, a warning or a refusal."; Russian «Статус одобрения и флаг `strict` определяют, чего стоит коммиту код, который находится за пределами коммита и не привязан ни одним SpecTag: ничего, предупреждения или отказа.»;
- s-weuyx98r7c923ab (`proposal:s-weuyx98r7c923ab`), its text: "The check for code without a SpecTag names this command in its warning and in its refusal (§s-kkbqcb9xrpaepwn)." becomes "The check for such code names this command in its warning and in its refusal (§s-kkbqcb9xrpaepwn)."; Russian «Проверка такого кода называет эту команду в своём предупреждении и отказе (§s-kkbqcb9xrpaepwn).»;
- s-weuyx98r7c923ab, its reason: "The check for code without a SpecTag covers all such code in one warning, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn)." becomes "In one warning, the check covers all the code that no SpecTag binds, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn)."; Russian «Проверка сообщает обо всём коде, который не привязан ни одним SpecTag, одним предупреждением, чтобы оно не заслоняло другие находки (§s-kkbqcb9xrpaepwn).»;
- s-chsfpkgpmfk4fft (`new:tools-2-settings`): "the check for code without a SpecTag" becomes "the check for code that no SpecTag binds"; Russian «- `sheriff untagged` — для проверки кода, который не привязан ни одним SpecTag (§s-weuyx98r7c923ab);»;
- s-f5rz6b7dhxejjts (`proposal:s-f5rz6b7dhxejjts-g7`): "symbols of the system's code that have no SpecTag (§s-8xw4mgvpexyvw5q)" becomes "symbols of the system's code that no SpecTag (§s-8xw4mgvpexyvw5q) binds"; Russian «…перечисляет символы кода системы, которые не привязаны ни одним SpecTag (§s-8xw4mgvpexyvw5q), каждый с его файлом (§s-weuyx98r7c923ab);».

## 2. Proposals that carry out a decision already made

Each is shown to the owner as one complete new wording, with a Russian `change` field. A proposal is not checked by specsheriff-rule-reviewer where it only carries out a decision, as `.claude/vt/rules.md` says. A proposal with a wording of its own goes to specsheriff-rule-reviewer first; such proposals here are proposal 2.9 and the reasons in proposals 2.3, 2.6 and 2.7. Where a change touches a node that contains a sentence that breaks a rule on how a node is written, the new wording brings that sentence into line with the rule, as the owner's rule "An agreed node is brought into line with the rules when it changes, never in a sweep" says. Such sentences are marked in the `change` field.

### 2.2 Rule 13.2, "The map of the specification" (s-zu8ne3wq84zchc4, `_guidelines/extensions/views/13.2`)

Russian of the new sentence: «Узел без заголовка, например узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6), карта подписывает расположением (§s-kag2m9tzdnduxdx).» The Russian of the sentence about a branch of the map stays as it is.

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
> **Reason:** A project may run tools of its own on a commit or a push, such as a scan that checks that nothing internal reaches a public repository. Adopting SpecSheriff must not stop them, even where the SpecSheriff tools cannot run, for example on a machine without the SpecSheriff plugin. A team that needs the checks that the git hooks run to apply to everyone runs them in CI.
>
> The order lets every check rely on what it reads: files in their final form and, where it reads nodes, nodes whose structure has passed the structure checks.
>
> **Example:** A project's own guidelines list a formatter. On a commit, the formatter rewrites the files in the commit first, and the generators of the SpecSheriff tools then write their files. A scan for secrets, one of the project's own tools for the pre-commit hook, runs next. The checks that each key is written only once in each object and that each file complies with its JSON Schema follow, and the other checks of the SpecSheriff guidelines run last, on the final files.

### 2.4 Rule 10.3, "An agent's edit is checked before it is made" (s-83ev4wwesbwnhnp, `_guidelines/spec/10.3`)

Integrity and risk: the agreed `s-st6td4mua9uqt9z` ("An edit judged before it is made") already says both: `sheriff guard` judges only a node that the edit adds or changes, and it judges only the system's code, other than tests. In this repository, the practice of writing the tools' tests first therefore rests only on the owner's choice of 2026-10-28 in `CLAUDE.md`, and no guard enforces it. This risk is reported to the owner in one line.

### 2.5 Rule 10.2, "When the checks run" (s-epaw9sgyaajzn8g, `_guidelines/spec/10.2`)

**Decisions carried out:** the owner's agreement to rule 10.12 (`proposal:s-pcnyfp7gev7syax-g4`, 2026-11-24) and to row 10.1.37b (`proposal:row-10-1-37b`, s-yn5tdx2bp4f5rq7, 2026-11-25). Rule 10.12 runs the project's own tools on a push, and row 10.1.37b checks on a push what they change, regardless of the specification's approval status. For a push, rule 10.2 names only the tests (the item in "Found and owed" from the review of group 8, 2026-11-25).

### 2.6 Rule 9.5, "Code and tests without a SpecTag" (s-kkbqcb9xrpaepwn, `_guidelines/spec/9.5`)

**Decisions carried out:** the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a: code or a test that a commit leaves unchanged is treated as rule 9.5 says, whether it carries no SpecTag or carries only SpecTags that bind nothing, such as one that names a section. The agreed `proposal:s-weuyx98r7c923ab` (`sheriff untagged`, agreed 2026-11-24) already lists "the system's code … that no SpecTag binds". Group 2's notes, item 15, found that rule 9.5 still says "carries no SpecTag". Proposal 2.8 says in rule 1.5.2 what binds and what does not. Changes 1.3 and 1.4 make the same rename in the nodes that restate rule 9.5 or name its check.

### 2.7 Rule 1.3.3, "When the status is approved" (s-9g7jj8z4yf9kq93, `_guidelines/spec/1.3.3`)

**Decisions carried out:** the item in "Found and owed" from group 6 (2026-11-24), "stands" becoming "is in force", in English only. The agreed reason also restated rule 9.5 in the wording that change 1.3 replaces; the new reason no longer restates it. The agreed reason justifies the items of the text one by one, which the rule on reasons forbids, so the proposal brings it into line with that rule, and the change to rule 1.3.3 is a proposal rather than a change made without asking.

> The specification, a section and a rule have different conditions for being approved:
> - The specification as a whole is approved if an owner has carried out the approval procedure by hand (§s-qzthyh7yqvfhsa2).
> - A section is approved while every rule in it is approved (§s-9kfdycuq34beqvs). Nobody approves the section itself.
> - A rule is approved while an approval of its current wording is in force (§s-5ah25f6gy99panq).
>
> **Reason:** The status `approved` claims that an owner, or an agent on an owner's behalf as the rule on such approvals allows (§s-t5uw8zfxzhfdg86), has agreed to what the status covers. So the status holds only while that agreement holds. A section states no requirement of its own, so an owner has nothing in it to agree to beyond its rules.

### 2.8 Rule 1.5.2, "How code is bound to its rules" (s-kgbzk2ph9e6jfb4, `_guidelines/spec/1.5.2`)

**Decisions carried out:** the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a, which proposal 2.6 carries out. Under rule 1.5.2, a SpecTag before a symbol "binds that symbol", so a symbol whose SpecTag names a section counts as bound, and the case that the rulings target escapes rule 9.5. The agreed s-9rtrj24myzjvshu already says that a SpecTag that names a section binds nothing. Rule 1.5.2 says that code that implements no rule has a SpecTag that says so, but neither it nor rule 9.3, under which a SpecTag binds a rule to code, says whether that SpecTag binds the code. The agreed appendix (s-33fw3ga4ctd94dq, s-9rtrj24myzjvshu) treats a SpecTag that says that code implements no rule as one that binds that code. Reviewer A of the first review found this gap.

### 2.9 Terms that only one domain needs: rule 3.2, row 10.1.6, and a rule and two rows of the Domains extension

The note of 2026-11-12 left one point open: whether a term in the contracts section that only one domain needs is an error. That point is question 4.6. The wordings below follow its recommended answer, B, under which such a term is refused. Under answer A:
- rule 3.2 says "may instead let one of the parts … define the terms that no other part of the base specification needs";
- the new Domains rule opens with "A term may be defined in a domain (§s-ypa92gpcj3f5zj8) if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it (§s-vj7ercem526zd6v).";
- its reason becomes "A term that only one domain needs belongs to that domain's subject area, so a reader finds it beside the rules that need it.";
- the second row of table 11.3 is not added.

These wordings are new, so each is sent to specsheriff-rule-reviewer before the owner sees it.

> **Title:** A term is defined once
>
> Where a section needs terms of its own, they are added to the contracts section. An extension of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g) may instead require one of the parts into which the base specification is divided (§s-qmmzf9nksfsa3qp) to define the terms that no other part of the base specification needs. Wherever it is defined, a term is defined once: one term that names two things is refused, and so are two terms that name the same thing.
>
> **Reason:** A term that is defined once, in a place where every rule that needs it can cite it, means the same thing in each of those rules.

Links: none added. The row's `checks` link to s-ypa92gpcj3f5zj8 covers the new citation.

> **Title:** A term defined in a domain
>
> A term is defined in a domain (§s-ypa92gpcj3f5zj8) if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it (§s-vj7ercem526zd6v). Before any other node cites such a term or links to it, whoever writes that citation or link moves the term to the contracts section (§s-z6tq6a3btnvvwx7).
>
> **Reason:** A term that only one domain needs belongs to that domain's subject area, so the contracts section keeps only what the domains share.
>
> **Example:** The domain of users defines the term "account", which only its own rules and the part of the technical appendix named after it cite. A rule of the domain of requests then needs the term. Whoever writes that rule moves the term to the contracts section before the rule cites it. The most likely mistake is to define the term again in the domain of requests.

Other nodes that change: the agreed node s-yauyedny2yzvs4c, as its todo says; one or two nodes of the appendix of the tools, for the two new rows; code and tests in stage 3.

### 3.1 A rule on setting a repository up and taking SpecSheriff out of it (formerly question 8)

**The problem.** No rule of the base requires a way to set a repository up, or to take SpecSheriff out of it. The agreed node "Setting a repository up and taking SpecSheriff out of it" (s-7unxytshhc4md54) describes both. Its `implements` links go to rules 10.2, 10.13 and 1.1.6, which say nothing about either procedure. The agreed node on the skill `spec-remove` (s-jn3rauw6a8zeefn) links to rule 2.5 only because the agreed row 10.1.23 requires an `implements` link to some rule (group 8's base question 2; the item in "Found and owed" from group 6). The skill `spec-init`, which the agreed node s-ttsc8tpnu46q53s describes, runs `sheriff init`, but that node has only one `implements` link, to the rule on what the reviewer judges (s-m4h279nbaqkpa3t), since the skill asks for the reviewer's settings. The owner's rule "A defect found is fixed at once" says that the owner is not asked when to fix a defect, so this is shown as a new rule for agreement.

### 3.2 A rule on the model and the reasoning effort that an agent uses (formerly question 9)

**The problem.** The agreed node "The skills of the SpecSheriff plugins" (s-kq6wmdud9c7j2k9) says that the skills run with the model and the reasoning effort that the user has chosen. No rule of the base says so, so that node also links to rule 2.5 only to satisfy row 10.1.23 (group 8's base question 2). The owner ruled on 2026-11-02, as recorded in s-xr5xxa9cxf2mq5u, that "no choice that costs a user tokens is made without their consent": the skills use the model and the effort of the user's session, and every run outside it, at present only the reviewer's, uses the model and the effort that the user has confirmed on their machine. On 2026-11-25 the owner decided that `spec`, `spec-review` and `spec-adopt` are to be described in nodes of their own in task T34. The new rule names a skill only as the place where an agent runs; a rule that names the skills belongs to task T34. The owner's rule "A defect found is fixed at once" applies here too.

> **Title:** Who chooses an agent's model and reasoning effort
>
> Wherever the SpecSheriff tools or a skill of a SpecSheriff plugin runs an agent, that agent uses a model and a reasoning effort chosen by the person on whose machine it runs:
> - the agent of a session in which a skill runs, and any agent that the skill starts, use those of that person's session;
> - any other agent, such as the reviewer (§s-m4h279nbaqkpa3t), uses those that the person has confirmed on that machine. Until the person confirms them, it uses the defaults. The SpecSheriff tools name each default in every run that uses it.
>
> **Reason:** Whoever runs an agent pays for that run, so only they decide what it costs.
>
> **Example:** A skill of a SpecSheriff plugin starts an agent to review a draft. That agent uses the model and the reasoning effort of the session in which the skill runs. The most likely mistake is a skill that names a model or an effort of its own, so that the person pays for a model or an effort that they did not choose.

Decision for `meta.decisions`: date 2026-11-02; problem "The reviewer ran with the models that the tools or the project's settings chose, though each run is paid for by the user who commits."; ruling "The owner: no choice that costs a user tokens is made without their consent. The skills use the model and the reasoning effort that the user has chosen in their session; every other run, at present only the reviewer's, uses the model and the reasoning effort that the user has confirmed on their machine."; type textual.

### 3.3 Rule 8.6, "A rule may be a table": no term in a cell (formerly question 11)

**The problem.** Rule 8.6 lets a cell hold "a node of a kind that the specification's schema declares, such as a rule or a term", and says that a node in a cell has no title. Rule 8.5 locates a term by its name. So a term in a cell has no name and so no location, and rules 3.2 and 10.1.7, which compare terms by name, cannot apply to it. Rule 8.6 thus contradicts itself. The review of s-vke5hakwf3uyrjs found this on 2026-11-22 (`t25-one-thought.md`, line 80), and that agreed node already refuses, for a node in a cell, only a sid that more than one node holds. A list that named only what is forbidden, a term, would let other kinds that have a title into a cell unnoticed: a section, a `TableRule` and a RecordType (rule 7.2.6).

**New wording** (the reason stays as it is, except for a rewording of its second sentence in English only):

### 3.4 A row of table 12.12: each `$ref` names a RecordType (formerly question 12)

**The problem.** No row of table 12.12 checks that a `$ref` within a RecordType names a RecordType. The agreed item 54 (s-suv42g8r3ra2h6b) refuses a `$ref` that names no RecordType when `sheriff types` runs, and only where the stack lists a file of types. Where it lists only a file of RuntimeChecks, or none, the reference passes, and the RuntimeCheck then fails to compile in the project (group 7's base question 1). The owner's rules "What can run as a deterministic process is automated" and "A release carries out every rule it contains" leave no choice but to add the row.

### 3.5 Rule 12.6 and rows 12.12.6 and 12.12.7: the fields that a RecordType variant adds (formerly question 14)

**The problem.** The agreed item 55 (s-nk8td3ez58gahc4, agreed 2026-11-25) already defines the fields that a variant adds: those that it declares and those that it takes through `refines` from a RecordType that is neither its own RecordType nor one that its RecordType reaches. Rows 12.12.6 and 12.12.7, and the last sentence of rule 12.6, consider only the fields that the variant declares. So a variant whose fragment of a format holds a field with the same name as one of its RecordType's fields passes, and a variant that adds fields only through a fragment is refused (group 7's base question 3). Keeping only the declared fields would reopen the agreed item 55, so this proposal brings the base into line with that node.

Both rows already have a `checks` link to s-z3dnru6qqdf9m6j, which covers the new citation, so no link is added.

### 3.6 Two rows of table 12.12: `additionalProperties` and `unevaluatedProperties` at the top level of a RecordType variant and of a RecordType that has variants (formerly question 15)

**The problem.** A variant's definition is reached through `then` from its RecordType's definition. There, `additionalProperties` or `unevaluatedProperties` at the top level of the variant's `schema` rejects the fields of its RecordType, so every data record of the variant is rejected. The page that the owner accepted on 2026-11-19 establishes that a variant does not write `unevaluatedProperties` («Вариант не пишет unevaluatedProperties»). Rule 12.6 already says that a data record holds the fields of its variant alongside those of its RecordType, so no sentence is added to rule 12.6. Dropping such a keyword silently, in `sheriff types`, would be the defect that `.claude/vt/rules.md` names: dropping data silently.

The reverse case goes wrong too. Under JSON Schema 2020-12 (Core, 10.3.2.3), `additionalProperties` depends only on `properties` and `patternProperties` in its own schema object. At the top level of the definition of a RecordType that has variants, it therefore rejects each field that a variant adds through `allOf` and `then` (s-nk8td3ez58gahc4). The accepted page uses `unevaluatedProperties: false` there, which does see those fields. Each row states one thought, so the two rows stay separate.

### 3.8 A row of table 12.12: a RecordType is declared in the base specification (formerly question 18)

**The problem.** Rule 12.1 requires a RecordType to be declared in a section of the base specification, or, for a fragment of a format, in the contracts section. The contracts section is a section of its own within the base specification (rule 3.1, §s-z6tq6a3btnvvwx7), so the proposed row admits a fragment of a format declared there. No row of table 12.12 checks rule 12.1's requirement. A RecordType kept elsewhere, such as in `specs/tech/`, belongs to no part of the system under the agreed item 47, so the reference checks skip it (group 5's notes, round d). The owner's rules "What can run as a deterministic process is automated" and "A release carries out every rule it contains" leave no choice but to add the row.

### 4.1 Whether a node's kind is part of its wording (formerly question 2)

**The problem.** Rule 1.3.5 lists what an approval covers: the title, the text, the reason, the examples and the fields that the kind adds. It does not list the kind itself. The agreed fingerprint (`new:tools-11-fingerprint`, s-f5brvuuu6xmkj6t, agreed 2026-11-25) leaves the kind out, as the code does (`NOT_WORDING` in model.ts). So an agent can turn an approved rule into a term and the node stays approved, although a term needs no code. The reverse change turns a term into a rule that code must now implement, without the approval of any owner (review g6-a, F4).

**Options.**
- **A (recommended). The kind is part of the wording.** What a person sees: changing a node's kind makes the node a draft, and the guard refuses an agent's edit that leaves such a node approved. Cost: rule 1.3.5 changes, and rule 1.3.2's fourth item is removed; the agreed fingerprint node is changed to include the kind, under the names `rule`, `recordType` and `domain`, which earlier releases wrote for the kinds that have since been renamed, as it already does for the sources of a field's values; code and tests in stage 3. Each approval recorded before this release lapses for every node whose fingerprint gains the kind. The fingerprint can leave out the kind `TextRule`, so that only terms, RecordTypes and `TableRule`s have to be approved again; that choice belongs to the fingerprint node. Risk: none found.
- **B. The kind stays outside the wording, and rule 1.3.5 says so.** What a person sees: a rule turned into a term keeps its approval. Cost: one item in rule 1.3.5's list of the changes that an approval survives; rule 1.3.2's fourth item is still removed. Risk: an agent can remove the requirement for code from an approved rule without an owner's approval.

### 4.2 A check of the structure of the technical appendix in a project without the Domains extension (formerly question 3)

**Recommendation: A, one row of the main table that applies in every project, with row 11.3.5 narrowed to the names of the files.** Basis:
- the owner's ruling of 2026-11-18 on row 11.3.5: "the technical appendix refines how the rules of the base specification are implemented, so its structure matches that of the base specification, its domains and their sections included, as far as needed". The ruling states a property that holds for the base specification as a whole;
- the owner's rule "A release carries out every rule it contains", and today's code, which already refuses a wrongly named file in a project without domains;
- a domain is a folder of the base specification (rule 8.5, as group 5 renamed the term on 2026-11-24). So a row worded in terms of folders covers a project with domains too, and names no extension (rule 1.7.3). Its second sentence keeps the check, now made by row 11.3.5 and item 42, that a section in a file named after a domain matches a section of that domain. Row 11.3.5 keeps what the main table cannot state without naming the extension: that each file of the technical appendix is named after a domain. So rule 11.1.1 keeps its check.

**Options.**
- **A (recommended). A row of the main table, and row 11.3.5 narrowed to the names of the files.** What a person sees: in every project, `sheriff validate` refuses a section of the technical appendix that matches no section of the base specification, as it does now in a project with domains. Cost: a new row; row 11.3.5 changes; the agreed item 42 (s-gvafe6bnstwab8b) splits in two: its paragraphs on the sections below a file's first top-level node implement the new row in every project, and its paragraphs on the names of the files under `specs/tech/` implement row 11.3.5; code and tests in stage 3. Risk: a commit in a project without domains whose technical appendix holds a section that the base specification lacks, such as one on deployment, is refused until the section is moved, for example into the stack section.
- **B. No check without the Domains extension.** What a person sees: in a project without domains, a section of the technical appendix may have any title. Cost: none; stage 3 drops today's refusal, as item 42 says. Risk: the appendix drifts from the base, and a reader looks for a rule's implementation where it is not, contrary to the reason given for rule 4.1.

> **What is checked:** Every section of the technical appendix (§s-tj38pvm38nepaf5), other than the stack section, the technical debt section (§s-vj7ercem526zd6v) and the first top-level node of a file named after a folder of the base specification (§s-5x737t9nee4zgaa), has the same path of titles as a section of the base specification (§s-qmmzf9nksfsa3qp): the titles of the sections that hold it, from the top down, followed by its own title. In such a file, the path of titles starts below the first top-level node, which represents that folder, and the section of the base specification with the same path of titles is in that folder
>
> **On failure:** refused

Row 11.3.5, narrowed, keeping its `checks` links to s-h6h25ctd3yryudh and s-vj7ercem526zd6v; the `checks` link to s-vj7ercem526zd6v covers its new citation, and its `checks` link to s-qmmzf9nksfsa3qp moves to the new row:

> **What is checked:** Every file of the technical appendix other than the file of the stack section and that of the technical debt section (§s-vj7ercem526zd6v) is named after a domain
>
> **On failure:** refused

### 4.3 Code at the top level of a file, outside every symbol (formerly question 4)

**Recommendation: A, SpecTags at the start of such a file bind its code that is outside every symbol and is not an import.** Basis:
- the first sentence of rule 1.5.2: the system's code other than tests is bound by SpecTags to the rules it implements;
- the principle "Rule, test and code bound by the sid": the code that implements a rule is bound to it by a SpecTag;
- under rule 1.5.2, a file whose symbols cannot be identified is already bound by SpecTags at its start, so this uses a way of binding that the SpecSheriff tools already read.

**Options.**
- **A (recommended). SpecTags at the start of the file bind its code that is outside every symbol and is not an import.** What a person sees: a file with statements outside every symbol has a SpecTag at its start; a commit that changes such a statement names in its message the rule that the SpecTag at the file's start names, and the reviewer is given the statement. Cost: rule 1.5.2 and row 10.1.26 change; in stage 3 these agreed appendix nodes each gain a sentence, with code and tests: the node on how a symbol carries its SpecTags (s-33fw3ga4ctd94dq), the node on what a commit changes (s-2x58az67bm6cxq2), the node on the list of code that no SpecTag binds (`proposal:s-weuyx98r7c923ab`), the node that refuses any SpecTag that is not directly above a symbol (s-9rtrj24myzjvshu), and the judgement on the code that a commit changes (`proposal:new-tools-7-3-review-code`), which gives the reviewer only changed symbols and files bound as a whole. Risk: the description of each language must say what counts as an import.
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
> **Examples:** the two agreed examples, and a new one: "A Python file defines a function and ends with a call, outside every function, that starts a server. A comment at the start of the file holds the SpecTag of the rule that the call implements. The most likely mistake is to leave the call unbound because the file's symbols carry SpecTags."

> **What is checked:** The system's implementing code (§s-hheus6f395ynqvc) is bound by SpecTags as follows (§s-kgbzk2ph9e6jfb4): each symbol that the checks can identify, by a SpecTag directly before it; in a file whose symbols the checks can identify, the code that is outside every symbol and is not an import, by SpecTags at the file's start; any other file, by SpecTags at its start or by an entry in the bindings file. Each SpecTag names a rule implemented by the code that it binds, or says that the code implements none
>
> **On failure:** refused; for code that the commit leaves unchanged, the result is what the rule on code that no SpecTag binds says (§s-kkbqcb9xrpaepwn)

Russian: «Реализующий код системы (§s-hheus6f395ynqvc) привязан SpecTag следующим образом (§s-kgbzk2ph9e6jfb4): каждый символ, который проверки могут определить, — SpecTag непосредственно перед ним; в файле, символы которого проверки могут определить, код вне всех символов, кроме импортов, — SpecTag в начале файла; любой другой файл — SpecTag в его начале или записью в файле привязок. Каждый SpecTag называет правило, которое реализует привязанный им код, или говорит, что этот код не реализует никакого правила | отклоняется; для кода, который коммит не меняет, — как говорит правило о коде, который не привязан ни одним SpecTag (§s-kkbqcb9xrpaepwn)»

### 4.4 A file of RuntimeChecks, bound as a whole to every RecordType for which it holds a definition (formerly question 5)

**Options.**
- **A. Rows 10.1.28a and 10.1.42, and rule 9.6, do not apply to the files generated from the specification.** What a person sees: a commit that approves one RecordType regenerates the file of RuntimeChecks and passes, even while another RecordType in the file is being revised; its message names only what the developer changed by hand. Cost: rule 9.6 and two rows change, and so do their agreed appendix nodes (s-w93jfnqynfa47pf, s-qqs2svksmjct753); code and tests in stage 3. Risk: the history of a generated file no longer names its nodes in each commit message, and every generated file is exempted from those rows to solve a problem with one file.
- **B (recommended). Each definition is bound on its own, by a SpecTag in its `$comment`.** What a person sees: as under A, and the commit message names only the RecordType that changed. Cost: rule 1.5.2 gains a way of binding for a file whose format allows no comments but gives each of its symbols a comment property, and row 10.1.26 changes to match; the node on how a symbol carries its SpecTags (s-33fw3ga4ctd94dq) gains a description of JSON Schema as a language whose symbols are the definitions under `$defs`; the node that refuses a SpecTag that is not directly above a symbol (s-9rtrj24myzjvshu) accepts one in a comment property; the following nodes, agreed in group 7, change: the node on the entry in the bindings file for a file of RuntimeChecks (s-h5rfyy9j8nnhx62) is removed, the node on what is generated from a RecordType (s-suv42g8r3ra2h6b) says that the `$comment` is written, and the check of generated copies (s-dbk2vyeg8z5jxna) no longer compares that entry; code and tests in stage 3. Risk: nodes agreed on 2026-11-25 are changed again.
- **C. A file of RuntimeChecks for each RecordType.** What a person sees: one generated JSON file for each RecordType, each bound to its RecordType by its own entry. Cost: the agreed list of files and its refusals (s-pvzms7d8kxb8dk2) change. Risk: a project's list of generated files grows with every RecordType.
- **D. Nothing changes.** What a person sees: every commit that changes a RecordType names every RecordType of the file in its message, and while any of them is a draft, no commit that changes the file goes through. Cost: none. Risk: no change to another RecordType can be committed while one is under revision.

**The changed clauses of row 10.1.26 under B,** each replacing the clause of question 4.3's wording that it extends:
- "each symbol that the checks can identify, by a SpecTag directly before it or, in a file whose format allows no comments, in the symbol's comment property;"; Russian «каждый символ, который проверки могут определить, — SpecTag непосредственно перед ним или, в файле, формат которого не допускает комментариев, в свойстве символа для комментария;»;
- "in a file whose symbols the checks can identify, the code that is outside every symbol and is not an import, by SpecTags at the file's start or, in a file whose format allows no comments, in the comment property of the file's top-level object;"; Russian «в файле, символы которого проверки могут определить, код вне всех символов, кроме импортов, — SpecTag в начале файла или, в файле, формат которого не допускает комментариев, в свойстве для комментария объекта верхнего уровня этого файла;».

### 4.5 No check that a SpecTag outside the system's code names a rule of the guidelines (formerly question 7)

**The problem.** Rule 10.10 (s-sfjka4zc4rhfu67) says: "Outside the system's code, a SpecTag may appear only in the repository's own tools and their tests, such as a project's own checks (§s-2fau85dfyyeq66m) and generators (§s-km4x4s26kv7pjze), and may name only a rule of the guidelines." No row of table 10.1 checks either of its two restrictions, on where such a SpecTag may appear and on what it names. The agreed node of row 10.1.39 (s-m8nmfsxkcfu7cjp) checks only that a sid in such a file names a node (group 4's notes, item 5). The owner's rule "A release carries out every rule it contains" forbids leaving the rule unchecked.

A gap remains whichever restriction is checked. The project-wide settings name the code and the tests of a project's own checks and generators, but no setting tells the SpecSheriff tools which files are the repository's own tools as a whole, such as the tools in `.githooks/<hook>.d/` or, in this repository, the SpecSheriff tools. So the first restriction, on where a SpecTag may appear, cannot be checked as written.

**Options.**
- **A. A setting names the paths of the repository's own tools, and rows check both restrictions of rule 10.10.** What a person sees: a project lists the paths of its own tools; a SpecTag outside the system's code and outside those paths is refused, and so is a SpecTag within those paths that names anything but a rule of the guidelines. Cost: a new setting, with its schema and node; two rows; code and tests. Risk: a project that forgets to list a tool's path has that tool's SpecTags refused.
- **B (recommended). Rule 10.10 drops the restriction on where such a SpecTag appears, and a row checks what it names.** What a person sees: a SpecTag anywhere outside the system's code that names anything but a rule of the guidelines is refused, and the refusal names its file and its line. Cost: rule 10.10's title and a sentence of its text; a row; a sentence in an appendix node, such as s-m8nmfsxkcfu7cjp; code and tests in stage 3. Risk: a guide may now quote a SpecTag that names a rule of the guidelines, although no check treats such a SpecTag as binding anything. Option B also departs from the owner's ruling of 2026-11-13, under which a SpecTag appears only in the system's code and its tests. The ruling of 2026-11-17 extended it only to the repository's own tools and their tests.
- **C. Rule 10.10 drops both restrictions, and no row is added.** What a person sees: a SpecTag outside the system's code may name any node, and nothing refuses it. Cost: a sentence of rule 10.10. Risk: a SpecTag that is in a tool and names a rule of the base specification tells a reader that the tool implements that rule, although no check counts it as implementing that rule.

### 4.6 A term in the contracts section that only one domain needs (formerly question 10)

**Recommendation: B, such a term is refused.** Basis:
- the owner's ruling of 2026-11-12 says that "a term that one domain needs is defined in that domain". The owner's rule "A proposal is based on the owner's earlier rulings on its subject" gives those words priority;
- under B, the place of every term follows from which nodes cite it, so a check can determine it;
- the new rule's reason in proposal 2.9, "so the contracts section keeps only what the domains share", holds only under B.

**Options.**
- **A. A term in the contracts section stays valid however many domains cite it.** What a person sees: a term that only one domain needs may stay in the contracts section, or be defined in that domain. Cost: rule 3.2 keeps "may instead let one of the parts … define"; the Domains rule of proposal 2.9 opens with "A term may be defined in a domain … if at least one node cites it or links to it and every such node is in that domain or in the part of the technical appendix named after it"; its reason becomes "A term that only one domain needs belongs to that domain's subject area, so a reader finds it beside the rules that need it"; and the second row of table 11.3 is not added. Risk: the contracts section may hold terms that only one domain needs. Reason for A: under A, rule 3.2 only lets an extension allow a part to define its own terms, so a term in the contracts section is never wrong, and refusing such a term would make a commit fail whenever the commit removes the last citation of a shared term from every domain but one.
- **B (recommended). Such a term is refused.** What a person sees: `sheriff validate` refuses a term in the contracts section if at least one node cites it or links to it and every such node is in one domain or in the part of the technical appendix named after that domain, until the term is moved into that domain. Cost: proposal 2.9 as it stands, with the second row of table 11.3, its node and its code. Risk: removing the last citation of a shared term from every domain but one makes the commit fail until the term is moved.

### 4.7 One convention for SpecSheriff's own keywords within a `schema` (formerly question 13)

There is new information that bears on the choice. The JSON Schema project announced in February 2023 that its next release would forbid keywords that no listed vocabulary declares, while keywords starting with `x-` would stay allowed as annotations ([json-schema.org, "The Last Breaking Change", 2023-02-23](https://json-schema.org/blog/posts/the-last-breaking-change); [json-schema.org, "Custom Annotations Will Continue", 2023-02-22](https://json-schema.org/blog/posts/custom-annotations-will-continue)). So `enumSource` will stay valid only if SpecSheriff's vocabulary is declared through `$vocabulary` in a meta-schema. A search on 2026-11-25 found no sign that that release has been published.

**Options.**
- **A. `x-identifierOf`, the `x-` prefix on both `identifierOf` and `enumSource`.** What a person sees: `x-identifierOf` and `x-enumSource` are read as annotations by any JSON Schema tool, with no vocabulary to declare. Cost: rows 12.12.2 and 12.12.3, items 44, 47 and 56, the migration and the schema all change. Risk: option A departs from decision R8 of the accepted page.
- **B (recommended). `enumSource`, declared with `identifierOf` in a vocabulary of SpecSheriff's own.** What a person sees: no prefix on either keyword. Cost: a meta-schema that declares SpecSheriff's vocabulary through `$vocabulary`, referred to by the schema of the RecordType extension; the agreed appendix nodes that name `x-enumSource` are changed to call it `enumSource` (s-ztseyetus7np6br and its later proposal, s-5nf87c3e3jg9v7c, s-dk3zfkbhc3v6xbp, s-gb8s9657a65hqmv and its later proposals, s-qzyacnqwvaeaps4, s-k4nqjr96ux7a5m7, s-4npdup7mjkva69y). No node of the base changes. Risk: a JSON Schema tool that a project points at a node file, rather than at a RuntimeCheck, sees two keywords that it cannot read unless it loads that meta-schema.
