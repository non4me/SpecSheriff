# Follow-up review of base-questions.md, part A (sections 1 and 2): the report

I loaded the `specsheriff-terminology-review` skill and printed the checklist with `node .claude/vt/writing-rules.mjs`. I read the two briefs, `fix-brief-bq-b.md`, the notes, both first reviews, and every node and agreed draft that sections 1 and 2 cite, in `moved/` and `tools-drafts.json`. I edited nothing.

This covers 12 items, so the report is well over 300 words. As in review A, the item-by-item format the brief asks for governs.

**Overall:** 4 items are ready now: 1.1, 1.2, 2.1 and 2.2. Three more are ready once the author makes one fix each: 2.4, 2.5 and 2.8. Five are not ready: 1.3, 2.3, 2.6, 2.7 and 2.9. The defects are concentrated in the three reasons the author wrote in round b and in the Domains rule.

## Checklist (covers 1.1–1.3 and 2.1–2.9)

- **1.2.3 A rule is made of its text and its reason:** ✓
- **7.1 The goal, the reader and the scope:**
  - ✗ 2.7, reason: "as §s-t5uw8zfxzhfdg86 allows" reads "as allows" once the sid is removed. In "has agreed to it", "it" could be the status or what the status covers.
  - ✗ 2.3, reason: "every file that a generator writes, rely on what came before". The text after the colon is about what comes after, not before.
  - ✗ (nit) 2.6: "that no SpecTag (§…) binds as follows" first reads as "binds as follows".
  - ✓ for the rest.
- **7.2.1 Who must act:** ✗ 2.9, the new Domains rule: "the term is moved to the contracts section" names no actor. ✓ for the rest.
- **7.2.2 The order of the text:** ✓
- **7.2.3 General words:** ✓
- **7.2.4 Naming:**
  - ✗ 2.7: "whoever is accountable for what it covers" names an owner by another phrase. The sentence the owner accepted on 2026-11-20 says "one of its owners".
  - ✗ 2.3, an agreed sentence of the reason: "Adopting the method". No node defines "the method", and proposal 3.1 says "SpecSheriff" for the same thing.
  - ✓ for the rest.
- **7.2.4.1 Coined names:** ✓
- **7.2.4.2 What a name says:** ✓
- **7.2.4.3 A general word in a name:** ✓
- **7.2.4.4 Properties:** ✓
- **7.2.4.5 Relations to other entities:** ✓
- **7.2.5 Definition by negation:** ✓
- **7.2.6 Lists that restrict:** ✓ (the new row of table 11.3 lists what is allowed)
- **7.2.7 Words that take their meaning from the specification:** ✓
- **7.3.1 The title:** ✓
- **7.3.2 Thoughts and sentences:** ✗ 2.3, reason: "nothing rewrites a file … and no check reads nodes …" sets two facts side by side after the colon. ✓ for the rest.
- **7.3.3 The contents of a node:** ✓
- **7.4.1 Counts in prose:** ✓
- **7.4.2 The reason:**
  - ✗ 2.6: "So such code is only reported, and only once the specification is approved, until its owners decide by the `strict` flag…" restates the text's three cases.
  - ✗ 2.7: "Each status claims … So the status is set only by such an act" is false for a section, whose status nobody sets (item 2 of the text).
  - ✓ for the rest.
- **7.5.1 Superfluous rules:** ✓
- **7.5.2 The length of a sentence:** ✗ 2.3: the second paragraph of the reason is one sentence of 45 words. ✓ for the rest.
- **7.5.3 Rules as tables:** ✓
- **7.6.1 The language of the specification:** ✓
- **7.6.2 Capital letters:** ✓
- **7.6.3 Examples:** ✓ (2.3's example follows option A, and 2.9's agrees with its text; an example for 2.6 is proposed below)
- **Pairing test:** ✓
  - 2.3: the reason's first paragraph grounds the text's last paragraph, and the second speaks of the order as a whole.
  - 2.7: its sentences fall on items 1 and 3, then 2, so not in the text's order.

## Оценка

- **1.1, 1.2:** согласованность, целостность, целесообразность, избыточность, недостаточность — все ✓.
  - 1.1 сравнено со строкой 10.1.8 и s-v4qus7raqnwzneb. Остальные «stands» в согласованных узлах есть только в именах тестов и в полях `change`.
  - 1.2 сравнено с правилами 12.2 («any bounds on the field's value») и 12.4.
- **1.3**
  - согласованность ✓ (решения от 2026-11-17)
  - целостность ✗ правило 10.7 осталось без русского текста; о согласованных узлах описания инструментов — см. 2.6
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✓
- **2.1, 2.2:** все пять ✓ (вопрос 1 группы 7; s-k4nqjr96ux7a5m7, s-rpv4fkdqqguptqd; правила 8.5 и 8.6).
- **2.3**
  - согласованность ✓ (вопрос 1 группы 8; s-npnmwyt6s3gypwe, s-n4m5zvh96yb299p)
  - целостность ✓ (правило 10.2, строки 10.1.37a и 10.1.37b)
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✓
- **2.4**
  - согласованность ✗ поле `change` говорит, что SpecTag бывает только в коде системы, а решение от 2026-11-17 о правиле 10.10 это уже изменило; новое решение называет «прочтением буквально» то, что решение от 2026-11-04 на этом же узле требовало намеренно
  - целостность ✓ (s-st6td4mua9uqt9z; риск для этого репозитория назван)
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✓
- **2.5**
  - согласованность ✗ пересказ строки 10.1.37b уже самой строки: «the files» вместо сообщения коммита, стейджинга и рабочего дерева
  - целостность ✓ (правило 10.12, s-n4m5zvh96yb299p, s-477gtdrkw34dzxw)
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✓
- **2.6**
  - согласованность ✓ (решения от 2026-11-17; s-weuyx98r7c923ab, s-3xx2eukc8gtd2tx)
  - целостность ✗ не названы четыре согласованных узла описания инструментов, которые называют правило 9.5 или его проверку прежним именем (список в 1.3)
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✓
- **2.7**
  - согласованность ✗ обоснование «Each status … is set only by such an act» противоречит второму пункту текста: раздел никто не одобряет; «whoever is accountable» заменяет принятое 2026-11-20 «one of its owners»
  - целостность ✓ (правила 1.3.4, 1.3.6, 10.6)
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✓
- **2.8**
  - согласованность ✓ (s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c; правило 12.3a: RecordType — правило)
  - целостность ✓ (правила 9.3, 9.5, 1.4.2)
  - целесообразность ✓
  - избыточность ✓
  - недостаточность ✓
- **2.9**
  - согласованность ✗ правило 3.2 позволяет части определять термины, «которые нужны только этой части», а новое правило Domains разрешает ссылаться на такой термин и части технического приложения
  - целостность ✓ (правила 3.1, 11.1.5, 1.7.2, 1.7.3; s-yauyedny2yzvs4c)
  - целесообразность ✓ (решение от 2026-11-12)
  - избыточность ✓
  - недостаточность ✗ второе предложение говорит только об узле другого домена: раздел контрактов и другие разделы технического приложения не охвачены, и не сказано, кто переносит термин

## Verdicts and findings

### 1.1: ready
No findings.

### 1.2: ready
- **Nit (author).** Section 1's introduction grounds 1.2 on the rule about what a decision removes or renames. That rule does not cover adding a link. The real basis is that an approval does not cover a node's links (§s-5ah25f6gy99panq).

### 1.3: not ready
- **Integrity (author).** Four agreed nodes of the appendix of the tools still name rule 9.5, or its check, in the old words. Add them to 1.3, or as a new item 1.4, as 1.1 does for "stands". The Russian in each becomes «не привязан(ы) ни одним SpecTag».
  - s-3xx2eukc8gtd2tx (`new:tools-7-2-outside`):
    - text: "the rule on code and tests without a SpecTag" → "the rule on code and tests that no SpecTag binds";
    - reason: "code without a SpecTag outside the commit" → "code outside the commit that no SpecTag binds".
  - s-weuyx98r7c923ab (`proposal:s-weuyx98r7c923ab`), text and reason: "The check for code without a SpecTag" → "The check for code that no SpecTag binds".
  - s-chsfpkgpmfk4fft (`new:tools-2-settings`): "the check for code without a SpecTag" → "the check for code that no SpecTag binds".
  - s-f5rz6b7dhxejjts (`proposal:s-f5rz6b7dhxejjts-g7`): "symbols of the system's code that have no SpecTag (§…)" → "symbols of the system's code that no SpecTag (§…) binds".
- **Author: the Russian of rule 10.7's example is missing.** RU: «По правилу о коде, который не привязан ни одним SpecTag (§s-kkbqcb9xrpaepwn), код, который коммит не меняет и который не привязан ни одним SpecTag, тогда приводит к тому, что проверки отклоняют этот коммит.»
- **WORDING FIX (author), Russian of rule 1.3.2.** In the current wording, «который» can attach to «коммита».
  - RU: «…и проверки не предупреждают о коде, который находится за пределами коммита и не привязан ни одним SpecTag (§s-kkbqcb9xrpaepwn).»
- **Nit.** Make the changes in 1.3 when the owner accepts 2.6, so that rule 9.5 and the rules that restate it change together.

### 2.1: ready
### 2.2: ready

### 2.3: not ready
- **WORDING FIX (author), second paragraph of the reason.**
  - EN: "The order lets every check rely on what it reads: files in their final form and, where it reads nodes, nodes whose structure has passed its checks."
  - RU: «Порядок позволяет каждой проверке полагаться на то, что она читает: на файлы в окончательном виде, а если она читает узлы, — на узлы, структура которых уже прошла свои проверки.»
- **WORDING FIX (author), an agreed sentence brought into line, as section 2 of `fix-brief-bq-b.md` says.**
  - EN: "Adopting SpecSheriff must not stop them, even where the SpecSheriff tools cannot run, for example on a machine without the SpecSheriff plugin."
  - RU: «Переход на SpecSheriff не должен их останавливать, даже там, где инструменты SpecSheriff не могут запуститься, например на машине без плагина SpecSheriff.»
  - Add to `change`: «В обосновании «the method» стало «SpecSheriff», а «the plugin» — «the SpecSheriff plugin», как в правиле 1.7.1.»
- **CUT (nit; the owner's choice, since the sentence was agreed on 2026-11-24).** "A team that needs the checks of the git hooks to apply to everyone runs them in CI." answers an objection rather than saying why the rule exists. `docs/principles.md` holds the same sentence, so keeping it is defensible.

### 2.4: ready after one fix
- **Author.** The `change` field misstates what rule 10.10 now says, and the new decision misdescribes the 2026-11-04 decision on this same node. Two fixes:
  - **RU, second bullet of `change`:** «Второй пункт. Было: «код, написанный для правила». Теперь: «код системы, кроме её тестов». Ваше решение от 2026-11-13 о правиле 10.10 сняло требования к тестам собственных проверок проекта. С 2026-11-17 SpecTag может стоять и в собственных инструментах репозитория, но называет там только правило guidelines; правило 10.3 теста, написанного первым, для такого кода не требует. Согласованный узел о `sheriff guard` уже так и проверяет.»
  - **EN, problem of the second decision:** "Following the owner's ruling of 2026-11-04 on the rule on where a SpecTag may appear (s-sfjka4zc4rhfu67), the rule held the code of a project's own checks and generators to a test written first."

### 2.5: ready after one fix
- **WORDING FIX (author).** Make the new push item match row 10.1.37b.
  - EN: "…other than the project's own checks (§s-2fau85dfyyeq66m), leaves the commit message, what is staged and the working tree as they were, except for the files that git ignores (§s-yn5tdx2bp4f5rq7);"
  - RU: «…оставляет сообщение коммита, то, что находится в стейджинге, и рабочее дерево такими, какими они были, кроме файлов, которые git игнорирует (§s-yn5tdx2bp4f5rq7);»

### 2.6: not ready
- **WORDING FIX (author), the reason.**
  - EN: "Code and tests written before their rules may have no SpecTag that binds them and still work correctly. Refusing every commit while such code exists would stop all work until all of it was bound to rules. So the owners decide, by approving the specification and by its `strict` flag, when such code is reported and when it must be bound."
  - RU: «…Поэтому ответственные сами решают — одобрением спецификации и её флагом `strict`, — когда о таком коде сообщают и когда его нужно привязать.»
- **WORDING FIX (author), Russian of the first sentence.**
  - RU: «Код, который находится за пределами коммита и не привязан ни одним SpecTag (§s-8xw4mgvpexyvw5q), проверки обрабатывают так:»
- **Integrity (author).** Name the four appendix nodes listed under 1.3.
- **WORDING FIX (nit).**
  - EN: "The checks treat code that is outside the commit, and that no SpecTag (§s-8xw4mgvpexyvw5q) binds, as follows:"
- **DOUBT (owner): a second example, showing the case that the rulings of 2026-11-17 target.**
  - EN: "An old function carries a SpecTag that names the section holding the rules it implements. That SpecTag binds nothing, so while the specification is approved and its `strict` flag is off, a commit that leaves the function unchanged passes with the warning. The most likely mistake is to treat the function as bound because it carries a SpecTag."
  - RU: «У старой функции есть SpecTag, который называет раздел с правилами, которые она реализует. Этот SpecTag ничего не привязывает, поэтому, пока спецификация одобрена, а её флаг `strict` выключен, коммит, который не меняет эту функцию, проходит с предупреждением. Самая вероятная ошибка — считать функцию привязанной, потому что у неё есть SpecTag.»

### 2.7: not ready
- **WORDING FIX (author), the reason.** Update `change` to match.
  - EN: "The status `approved` claims that an owner, or an agent on an owner's behalf as the rule on what an agent approves on an owner's behalf allows (§s-t5uw8zfxzhfdg86), has agreed to what the status covers. So the status holds only while that agreement holds. A section requires nothing of its own, so it leaves an owner nothing to agree to beyond its rules."
  - RU: «Статус `approved` утверждает, что ответственный или агент от его имени, как позволяет правило о том, что агент одобряет от имени ответственного (§s-t5uw8zfxzhfdg86), согласился с тем, к чему этот статус относится. Поэтому статус действует, только пока действует это согласие. Раздел сам ничего не требует, поэтому ответственному не с чем в нём соглашаться, кроме его правил.»

### 2.8: ready after one fix
- **Author.** The Russian rewrites the agreed Russian of the first two sentences, and `change` does not say so. Keep the agreed Russian; the same applies to the versions of rule 1.5.2 in questions 4.3 and 4.4.
  - RU: «Код системы (§s-hheus6f395ynqvc) помимо тестов привязан к правилам, которые он реализует, с помощью SpecTag (§s-8xw4mgvpexyvw5q). У кода, который не реализует никакого правила, есть SpecTag, который говорит об этом, и этот SpecTag тоже привязывает код. SpecTag, который называет узел, не являющийся правилом, например раздел, ничего не привязывает.»
- **The second sentence holds.** s-9rtrj24myzjvshu would refuse code marked `@spec none` unless that SpecTag binds the code, and s-33fw3ga4ctd94dq already treats it as binding.
- **Nit.** The "binds nothing" sentence would read better in paragraph 3, right after "…bind the whole file.", where binding is defined.

### 2.9: not ready
- **WORDING FIX (author), consistency.** Make rule 3.2 match the Domains rule, which also lets the technical appendix cite a domain's term.
  - EN, rule 3.2, second sentence: "…define the terms that, within the base specification, only that part needs."
  - RU: «…определять термины, которые в базовой спецификации нужны только этой части.»
- **WORDING FIX (author), rule 7.2.1 and insufficiency.** Name who moves the term, and cover every other node, not only a node of another domain.
  - EN, second sentence of the Domains rule: "Before any other node cites such a term or links to it, whoever writes that citation or link moves the term to the contracts section (§s-z6tq6a3btnvvwx7)."
  - RU: «Прежде чем любой другой узел сошлётся на такой термин или свяжется с ним, тот, кто пишет эту ссылку или связь, переносит термин в раздел контрактов (§s-z6tq6a3btnvvwx7).»
  - EN, in the example: "Whoever writes that rule moves the term to the contracts section before the rule cites it."
  - RU, in the example: «Тот, кто пишет это правило, переносит термин в раздел контрактов, прежде чем правило сошлётся на него.»
- **The two ways the author departed from review B both hold.**
  - Citing rule 4.1 rather than row 11.3.5 is right: it cites a rule rather than a check, and question 4.2 still changes the row.
  - "Before a node … cites" names an act that a check can see. It covers only one case, which the fix above closes.

### Terms
- **TERM, "binds" and "that no SpecTag binds".**
  - Fit: partial. In [OFT] (registry), an item in code covers a specification item; in [SysML] (registry), a design element satisfies a requirement. Neither has a tag that binds code to no rule, as `@spec none` does (inference).
  - Recommendation: keep the word and add a gloss in the docs. Cost: nothing in the nodes.
- **TERM, "accountable" (2.7).**
  - Fit: a false friend. The word recalls the Accountable role of a RACI matrix (unverified: RACI is not in the registry), while the base calls that person "owner".
  - Recommendation: use "owner". The 2.7 fix already does this.

### The first review's findings in my part
All were applied, with two gaps:
- review A's consistency finding on 1.5 was applied only in part (2.5);
- review A's integrity finding on 1.6 missed the appendix nodes (1.3, 2.6).

The rejections in the notes for my part hold.

## Ready, and what should not reach the owner
- **Ready:** 1.1, 1.2, 2.1, 2.2.
- **Ready after the author's fixes:** 2.4, 2.5, 2.8.
- **Not ready:** 1.3, 2.3, 2.6, 2.7, 2.9.
- **Should not reach the owner:** none. Section 1 reaches the owner only as one-line reports, by design.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/base-questions.md`, `D:/SpecSheriff/.ai_docs/t25-pass/base-questions-notes.md`, `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`. My lookup scripts are `C:/Users/PC/AppData/Local/Temp/claude/a0dc34c442b04427/8cff5ff8-2618-4605-ba3d-4c860a64081a/scratchpad/show.mjs` and `C:/Users/PC/AppData/Local/Temp/claude/a0dc34c442b04427/8cff5ff8-2618-4605-ba3d-4c860a64081a/scratchpad/find.mjs`.

Sources: the skill's registry of vocabularies, for [OFT] and [SysML].
