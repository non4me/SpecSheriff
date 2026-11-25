# EngStickler's fast reader on new29.md, the author's draft of proposal 2.9 in round d: the report

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 1
TRANSLATION: Заметка от 2026-11-12 оставила открытым один вопрос: является ли ошибкой термин в разделе contracts, который нужен только одному домену. Этот вопрос — вопрос 4.6. Формулировки ниже следуют его рекомендованному ответу B, при котором такой термин отклоняется. При ответе A:
TWO READINGS:
- "The note of 2026-11-12": the text never names this note, so a reader cannot tell which document it is. It is most likely an earlier note of the same work.
- "that only one domain needs": it most likely modifies "a term" (a term that only one domain needs). It could also modify "the contracts section" (a section that only one domain needs). The first reading is clearly favoured.
- "its recommended answer": "its" most likely refers to question 4.6. It could refer to "one point", which is the same thing.
- "Under A": answer A of question 4.6. It is not introduced earlier. Only "B" has been mentioned.
LANGUAGE:
- "Under A:" → "Under answer A:" — A is not defined before, so a bare letter after a sentence about B is abrupt.

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 2
TRANSLATION: - правило 3.2 говорит: «может вместо этого позволить одной из частей … определять термины, которые не нужны никакой другой части базовой спецификации»;
TWO READINGS:
- "may instead let": "may" most likely means permission. "Instead" means instead of adding the terms to the contracts section. The quote has no subject because the ellipsis hides it, so the reader cannot tell who is permitted. The subject is probably an extension of the guidelines.
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 3
TRANSLATION: - новое правило расширения Domains начинается так: «Термин может быть определён в домене (§s-ypa92gpcj3f5zj8), если хотя бы один узел ссылается на него или связан с ним и каждый такой узел находится в этом домене или в части технического приложения, названной по нему (§s-vj7ercem526zd6v).»;
TWO READINGS:
- "A term may be defined in a domain": "may" is permission (allowed to be defined there) or possibility (can happen to be defined there). Permission is favoured, since this is the weaker alternative to the refusal in B.
- "if": a sufficient condition ("if") or the only condition ("only if"). Context favours "only if", but the text does not say so.
- "named after it": "it" is most likely the domain. It could be the term. The domain is favoured.
- "at least one node cites it or links to it and every such node": the "and" most likely joins two conditions. "Such node" means a node that cites or links.
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 4
TRANSLATION: - его обоснование становится: «Термин, который нужен только одному домену, относится к предметной области этого домена, поэтому читатель находит его рядом с правилами, которым он нужен.»;
TWO READINGS:
- "its reason": "its" most likely refers to the new Domains rule. It could refer to the opening sentence quoted just before it.
- "finds it beside the rules that need it": both "it" refer to the term. "Beside" is meant as "next to in the specification", not physically.
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 5
TRANSLATION: - вторая строка таблицы 11.3 не добавляется.
TWO READINGS: none
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 7
TRANSLATION: Эти формулировки новые, поэтому каждая отправляется в specsheriff-rule-reviewer до того, как её увидит ответственный.
TWO READINGS:
- "These wordings": the wordings listed just above, under A, or the wordings below, under B. The B wordings below are favoured, because the following sections give them in full. The position of the sentence right after the A list favours the other reading.
- "it": the wording, in the sense "each wording". The owner is the person who sees it.
LANGUAGE:
- "each goes to specsheriff-rule-reviewer" → "each is sent to specsheriff-rule-reviewer" — "goes to" is a calque of the Russian "идёт к". A native writer would say that something is sent or submitted to a reviewer.

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 9
TRANSLATION: Правило 3.2 (s-ypa92gpcj3f5zj8), которое теперь называется «Термин определяется один раз, в разделе contracts». Новая формулировка:
TWO READINGS:
- "now titled": "now" means "at present, before this change". The new title follows below. The reader could take it as the title after the change.
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 11
TRANSLATION: Заголовок: «Термин определяется один раз».
Текст: «Если разделу нужны собственные термины, они добавляются в раздел contracts. Выбранное проектом расширение guidelines (§s-9ttvcwpqkehm58g) может вместо этого требовать, чтобы одна из частей, на которые разделена базовая спецификация (§s-qmmzf9nksfsa3qp), определяла термины, которые не нужны никакой другой части базовой спецификации. Где бы термин ни определялся, он определяется один раз: отклоняется один термин, называющий две вещи, а также два термина, называющие одну вещь.»
Обоснование: «Термин, определённый один раз там, где на него может сослаться каждое правило, которому он нужен, означает одно и то же в каждом из этих правил.»
TWO READINGS:
- "Where a section needs terms of its own": "where" is "whenever" or "in the case that". "Its own" is the terms of that section, not terms of the specification as a whole.
- "may instead require": "may" is permission. The extension is allowed to impose the requirement. "Instead" means instead of adding the terms to the contracts section.
- "the terms that no other part of the base specification needs": all such terms, or only those the part chooses to define. The reader most likely reads it as all terms that only this part needs.
- "so are two terms that name one": "one" most likely means "one thing". It could be read as "one another" or as "one term".
- "where every rule that needs it can cite it": "where" is a place, meaning the single place where the term is defined. It could be a condition, meaning "provided that every rule can cite it". The place reading is favoured. Both "it" refer to the term. "Those rules" are the rules that need the term.
LANGUAGE:
- "two terms that name one" → "two terms that name the same thing" — the bare "one" after "name" is an ellipsis a reader must resolve. The replacement keeps the meaning.
- "A term defined once, where every rule that needs it can cite it, means" → "A term that is defined once, in a place where every rule that needs it can cite it, means" — the long inserted clause between subject and verb is hard to parse, and "where" without a noun is a calque of "там, где". Not sure the replacement keeps the meaning exactly. It makes the place reading explicit.

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 19
TRANSLATION: Связи: новые связи `cites` с s-9ttvcwpqkehm58g и s-qmmzf9nksfsa3qp.
TWO READINGS: none
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 23
TRANSLATION: Строка 10.1.6 (s-7kc8dw7zdz63q53), которая теперь читается «Каждый узел-термин спецификации находится в разделе contracts | отклоняется». Новая формулировка:
TWO READINGS:
- "now": at present, before the change. The new wording follows below.
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 25
TRANSLATION: Что проверяется: каждый узел-термин спецификации находится в разделе contracts или в той части базовой спецификации, где выбранное расширение guidelines позволяет определять термины (§s-ypa92gpcj3f5zj8).
При несоответствии: отклоняется.
TWO READINGS:
- "a chosen extension": chosen by the project. The text does not say by whom.
- "(§s-ypa92gpcj3f5zj8)": it most likely belongs to "allows terms to be defined", meaning rule 3.2. It could belong to the whole condition.
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 31
TRANSLATION: Связи: новых нет. Существующая связь строки `checks` с s-ypa92gpcj3f5zj8 покрывает новую ссылку.
TWO READINGS:
- "serves for the new citation": the existing link is enough for the new citation. It could also be read as "the link is used for the purpose of the new citation". The first is favoured.
LANGUAGE:
- "serves for the new citation" → "covers the new citation" — "serves for" is a calque of "служит для". A native writer would say "covers" or "is enough for". Not sure whether the author means "covers" or "is meant to replace"; "covers" is the likelier meaning.

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 35
TRANSLATION: Новое правило расширения Domains, в разделе 11.1 после правила 11.1.5, со связью `refines` с s-ypa92gpcj3f5zj8 и связями `cites` с s-vj7ercem526zd6v и s-z6tq6a3btnvvwx7:
TWO READINGS: none
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 37
TRANSLATION: Заголовок: «Термин, определённый в домене»
TWO READINGS: none
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 39
TRANSLATION: Термин определён в домене (§s-ypa92gpcj3f5zj8), если хотя бы один узел ссылается на него или связан с ним и каждый такой узел находится в этом домене или в части технического приложения, названной по нему (§s-vj7ercem526zd6v). Прежде чем любой другой узел сошлётся на такой термин или свяжется с ним, тот, кто пишет эту ссылку или связь, переносит термин в раздел contracts (§s-z6tq6a3btnvvwx7).
TWO READINGS:
- "A term is defined in a domain ... if": a statement of fact (such a term counts as defined in the domain). It could also be a requirement (such a term must be defined in the domain). It can also be read as "if and only if". The text does not say which. The requirement reading is favoured by the second table row below.
- "named after it": "it" is most likely the domain. It could be the term.
- "any other node": other than the nodes of that domain and of the part of the appendix named after it. It could mean "other than the node that already cites the term". The first is favoured.
- "such a term": a term that is defined in a domain in the sense of the first sentence. It could mean a term that only one domain cites. These are the same terms.
- "that citation or link": the citation or link written by the "other node". It is a back-reference to a thing named only in a subordinate clause.
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 41
TRANSLATION: Обоснование: Термин, который нужен только одному домену, принадлежит предметной области этого домена, поэтому раздел contracts содержит только то, что домены делят между собой.
TWO READINGS:
- "what the domains share": shared by all domains, or by more than one. The reader favours "by more than one", since this follows from the first clause.
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 43
TRANSLATION: Пример: Домен пользователей определяет термин "account", на который ссылаются только его собственные правила и часть технического приложения, названная по этому домену. Затем термин понадобился правилу домена запросов. Тот, кто пишет это правило, переносит термин в раздел contracts до того, как правило сошлётся на него. Самая вероятная ошибка — определить термин второй раз в домене запросов.
TWO READINGS:
- "its own rules": the rules of the domain of users. "It" in "named after it" is also the domain.
- "then": later in time. It could be read as "in that case". Time is favoured.
- "the domain of requests": the text gives no explanation. It is a domain whose subject area is requests.
- "A rule of the domain of requests then needs the term": it is not clear whether this rule cites it yet. The next sentence shows it does not cite it yet.
LANGUAGE:
- "define the term a second time" → "define the term again" — "a second time" is a natural calque of "во второй раз". "Again" is shorter and more idiomatic. The replacement keeps the meaning.

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 47
TRANSLATION: Решение для `meta.decisions`: дата 2026-11-12; проблема «Не было решено, где определяется термин, когда базовая спецификация разделена на домены.»; решение «Ответственный: термин, который нужен нескольким доменам, определяется в разделе contracts, а термин, который нужен одному домену, определяется в этом домене.»; тип textual.
TWO READINGS:
- "several domains": two or more, or three or more. "Several" in English normally means more than two. Then the case of exactly two domains is not covered by the ruling. Two or more is favoured by context.
- "when": "if" (in the case that) or "at the time that". The first is favoured.
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 51
TRANSLATION: Две новые строки таблицы 11.3, после строки 11.3.6, каждая со связью `checks` с новым правилом и связью `cites` с s-vj7ercem526zd6v.
TWO READINGS:
- "the new rule": the new rule of the Domains extension described above. It is not named in this sentence.
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 55
TRANSLATION: Что проверяется: только узлы домена и узлы той части технического приложения, которая названа по нему (§s-vj7ercem526zd6v), ссылаются на узел-термин, определённый в этом домене, или связаны с ним.
При несоответствии: отклоняется.
TWO READINGS:
- "named after it": "it" is most likely the domain. It could be the term node.
- "cite a term node defined in that domain or link to it": "it" is the term node. "Or link to it" could also be read as a separate predicate of "only the nodes", with the same sense.
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 65
TRANSLATION: Что проверяется: узел-термин находится в домене, если хотя бы один узел ссылается на него или связан с ним и каждый такой узел находится в этом домене или в части технического приложения, названной по нему (§s-vj7ercem526zd6v).
При несоответствии: отклоняется.
TWO READINGS:
- "A term node is in a domain if": a statement of fact, or the requirement that the node must be in the domain whenever the condition holds. As a check with "refused" on failure, the second is favoured. The text does not say it. It is also unclear whether "if" means "if and only if".
- "is in a domain" and "is in that domain": it could mean "is located in the files of the domain" or "is defined in the domain". The second is likelier.
- "named after it": "it" is most likely the domain. It could be the term node.
LANGUAGE:
- "A term node is in a domain if" → "A term node is in a domain whenever" — it does not change the meaning. Not sure whether "if and only if" was meant, so the replacement is only a possible fix for the direction of the condition.

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\new29.md · line 73
TRANSLATION: Другие узлы, которые меняются: согласованный узел s-yauyedny2yzvs4c, как сказано в его todo; один или два узла описания инструментов для двух новых строк; код и тесты на стадии 3.
TWO READINGS:
- "the agreed s-yauyedny2yzvs4c": "agreed" most likely means that the owner has agreed to the node. It could mean "the node that was agreed upon as the one to change".
- "its todo": the todo of that node.
- "a node of the appendix of the tools, or two": one or two nodes. The text does not say whether the two are one per row or both for one row.
- "stage 3": a stage of a plan that is not described in this passage.
LANGUAGE:
- "the agreed s-yauyedny2yzvs4c" → "the agreed node s-yauyedny2yzvs4c" — the noun is missing, so the adjective is followed by a bare identifier.
- "a node of the appendix of the tools, or two" → "one or two nodes of the appendix of the tools" — "a node ..., or two" is a calque of the Russian "узел, или два". The replacement keeps the meaning.

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\splice.mjs · line 2
TRANSLATION: использование: node splice.mjs <целевой файл> <начальный маркер> <конечный маркер> <файл с заменой>
Заменяет текст от начального маркера (включительно) до конечного маркера (не включая).
TWO READINGS:
- "Replaces the text": it is not said what replaces it, but the replacement file in the usage line suggests the content of that file. The text is replaced in the target file.
LANGUAGE: none

### C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\8cff5ff8-2618-4605-ba3d-4c860a64081a\scratchpad\changed-paras2.py · line 1
TRANSLATION: Копирует в один файл абзацы base-questions.md, которые отличаются от более ранней версии. Каждый абзац остаётся под заголовком своего пункта.
TWO READINGS:
- "an earlier version": an earlier version of base-questions.md, or of each paragraph. The first is favoured.
- "its item": the item of base-questions.md that the paragraph belongs to.
LANGUAGE:
- "Each paragraph stays under the heading of its item" → "Each paragraph is kept under the heading of its item" — "stays" suggests that the paragraph was there before and has not moved. The script copies it to a new file. "Is kept" says what the script does.
