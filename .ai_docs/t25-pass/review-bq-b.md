# The review of base-questions.md, part B: the report of specsheriff-rule-reviewer

Part B of `base-questions.md` isn't ready for the owner. Of the nine questions in my part, only question 13 is a real choice for the owner. Seven others are already settled by an earlier ruling or an agreed node, and question 10 should shrink to the one sub-point the owner left open. Dropped item 3 states a fact wrongly. The skill was in context and the checklist script ran. Nothing was edited.

## Checklist
Applied to every new wording in my part: 3.2, row 10.1.6, the new Domains rule and its row (Q10); 8.6 (Q11); the new rows (Q12, Q15, Q18); 12.6 and rows 12.12.6/7 (Q14/15); 12.2 (Q16).

1. 1.2.3 Text and reason ✓ (the new rows follow the tables' convention of a row without a reason)
2. 7.1 Goal, reader, scope ✗ 3.2: "they are added to the contracts section. An extension … may give a folder…" reads as two rules that contradict each other. 12.6: "other than its RecordType and the RecordTypes that its RecordType reaches" can be read two ways.
3. 7.2.1 Who must act ✓
4. 7.2.2 Order of the text ✓
5. 7.2.3 General words ✗ row 10.1.6: "a place that an extension … gives to terms". 12.2: "is an object".
6. 7.2.4 Naming ✗ new Domains rule: "a term that only one domain uses", while `uses` is also a link type between terms (6.1).
7. 7.2.4.1 ✓
8. 7.2.4.2 ✓
9. 7.2.4.3 ✓
10. 7.2.4.4 ✓
11. 7.2.4.5 ✓
12. 7.2.5 ✓
13. 7.2.6 Lists that restrict ✗ 8.6: "other than a term" names what is forbidden, so other kinds that have a title get into a cell unnoticed: a section, a `TableRule` ("A `TableRule` has a title"), and a RecordType, whose name rule 12.1 and row 12.12.1 compare.
14. 7.2.7 Words with a meaning from the specification ✗ 3.2: "a folder of the base specification (§s-kag2m9tzdnduxdx)", but rule 8.5 does not define a folder. Domains rule: "uses" is not explained.
15. 7.3.1 ✓
16. 7.3.2 ✓
17. 7.3.3 ✓
18. 7.4.1 ✓
19. 7.4.2 The reason ✗ 3.2 keeps its reason "Where a section coins its own words, a reader cannot tell…", which the new third sentence now allows. 8.6's new reason sentence "so a term has no place in a cell" explains the wording.
20. 7.5.1 Superfluous rules ✗ 12.2: "each of its data records is an object". 12.6: Q15's paragraph.
21. 7.5.2 Sentence length ✗ 12.6: the 37-word sentence "The fields that a RecordType variant adds are…". Row 10.1.6: "a place that an extension of the guidelines that the project has chosen gives".
22. 7.5.3 ✓
23. 7.6.1 ✓
24. 7.6.2 ✓
25. 7.6.3 Examples ✓ (an example for the new Domains rule is proposed below)
26. Pairing test ✗ 8.6: the reason's sentences ground, in order, the table, the node in a cell, and the exclusion of a term.

## Оценка

**Q10**
- согласованность: ✗ обоснование 3.2 противоречит новому третьему предложению. Вариант C пересматривает решение от 2026-11-12 без нового факта. Сравнено с 3.1, 1.7.2, 1.7.3, 1.7.4, 8.5, 10.1.7.
- целостность: ✗ строка 11.3 отвергает ссылку на термин домена из технического приложения, которое 11.1.1 не относит ни к одному домену. Строка сталкивается с 11.1.5. Не названы связи `cites` у 3.2.
- целесообразность: ✓ решение 2026-11-12, правило 1.7.2.
- избыточность: ✓ 3.1, 10.1.7, s-vke5hakwf3uyrjs.
- недостаточность: ✗ «пользуется» не определено. «Папка» — понятие описания инструментов. Решение 2026-11-12 не названо для `meta.decisions` нового правила.

**Q11**
- согласованность: ✓ 8.5 (согласован 2026-11-24), s-vke5hakwf3uyrjs.
- целостность: ✗ в ячейку по-прежнему попадают раздел, `TableRule` и RecordType.
- целесообразность: ✓ правило 8.6 противоречит само себе.
- избыточность: ✗ третье предложение обоснования.
- недостаточность: ✗ то же, что в целостности.

**Q12**
- согласованность: ✓ 12.10, 12.12.2, s-4npdup7mjkva69y, s-suv42g8r3ra2h6b.
- целостность: ✓ s-ezq8csd433vj6fj назван.
- целесообразность: ✓
- избыточность: ✗ «`#` followed by the sid» повторяет s-4npdup7mjkva69y.
- недостаточность: ✗ `schema` отсылает к 12.2, где `schema` не упоминается.

**Q14**
- согласованность: ✓ s-nk8td3ez58gahc4, s-suv42g8r3ra2h6b, решение 12.6 от 2026-11-19.
- целостность: ✓ s-c2r9jndrjbtbsv6, 12.12.4, пример 12.6.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ оборот «other than its RecordType and…» читается двояко.

**Q15**
- согласованность: ✗ принятая 2026-11-19 страница отнесла это к формату узла на шаге инструментов.
- целостность: ✗ абзац опирается на то, чего нет в базе: что RecordType решает о полях, не объявленных ни одним RecordType (12.2 этого не перечисляет).
- целесообразность: ✓
- избыточность: ✗ уже требуют 12.6 («A data record holds the fields of its RecordType variant alongside…») и 12.4.
- недостаточность: ✓

**Q16**
- согласованность: ✗ страница: «12.2 — без изменений». Согласованный s-4npdup7mjkva69y исключает вариант Б.
- целостность: ✗ риск варианта В оценён вопреки строкам 12.12.8 и 12.12.11.
- целесообразность: ✓
- избыточность: ✗ следует из «each of its fields» (12.2) и 12.4.
- недостаточность: ✗ «object» в базе не определено.

**Q18**
- согласованность: ✓ 12.1, 12.6, 12.12.5, s-ezq8csd433vj6fj.
- целостность: ✗ цитата §s-5x737t9nee4zgaa без связи `cites`.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

Q13 and Q17 change no wording of the base, so they get no Оценка block.

## Verdict: not ready

**Across my part (author):** no new wording in section 2 has its Russian rendering or a `change` field. Rule 3.2, rule 8.6 and the row of Q18 also lack the `cites` links that their new citations need.

**Q10, not ready.**
- **The framing (author).** The decision of 2026-11-12 settles the main point. The only open point is the one that note left: is a term in the contracts section that only one domain uses an error (t25-one-thought.md, line 1250)? Drop option C. Its risk also misreads rule 3.1, which itself excepts a term.
- **WORDING FIX, sentence 3 of 3.2:**
  - EN: "An extension of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g) may instead let one of the parts into which the base specification is divided (§s-qmmzf9nksfsa3qp) define the terms that only that part uses."
  - RU: «Выбранное проектом расширение guidelines (§s-9ttvcwpqkehm58g) может вместо этого позволить одной из частей, на которые разделена базовая спецификация (§s-qmmzf9nksfsa3qp), определять термины, которыми пользуется только эта часть.»
- **WORDING FIX, row 10.1.6:**
  - EN: "Every term node of the specification is in the contracts section or in a part of the base specification that a chosen extension of the guidelines lets define its own terms (§s-ypa92gpcj3f5zj8)"
  - RU: «Каждый узел-термин спецификации находится в разделе контрактов или в части базовой спецификации, которой выбранное расширение guidelines позволяет определять собственные термины (§s-ypa92gpcj3f5zj8)»
- **DOUBT, the reason of 3.2 (author, follows from A):**
  - EN: "A term defined once, where every rule that uses it can cite it, means the same thing in each of those rules."
  - RU: «Термин, определённый один раз там, где на него могут сослаться все правила, которые им пользуются, означает в каждом из них одно и то же.»
- **DOUBT, the new Domains rule (author writes it into A, the owner sees it there).** As drafted, the rule and its row refuse a citation from the technical appendix. Rule 11.1.5 also requires a node of another domain that relies on the term to link to it.
  - Text, EN: "A term may be defined in a domain (§s-ypa92gpcj3f5zj8) where only the nodes of that domain, and those of the section of the technical appendix that has the domain's name (§s-vghy37e3p2325ah), cite the term or link to it. Where a node of another domain needs such a term, the term is first moved to the contracts section (§s-z6tq6a3btnvvwx7)."
  - Text, RU: «Термин может быть определён в домене (§s-ypa92gpcj3f5zj8), если на него ссылаются или связаны с ним только узлы этого домена и узлы раздела технического приложения, который носит имя домена (§s-vghy37e3p2325ah). Если такой термин нужен узлу другого домена, термин сначала переносят в раздел контрактов (§s-z6tq6a3btnvvwx7).»
  - The row changes to match.
- **DOUBT, an example for the new Domains rule:**
  - EN: "The domain of users defines the term "account", which only its own rules and the section of the technical appendix named after it cite. A rule of the domain of requests then needs the term. The term is moved to the contracts section before that rule cites it. The most likely mistake is to define the term a second time in the domain of requests."
  - RU: «Домен пользователей определяет термин «учётная запись», на который ссылаются только его собственные правила и раздел технического приложения с его именем. Затем этот термин понадобился правилу домена заявок. Прежде чем это правило сошлётся на термин, термин переносят в раздел контрактов. Самая вероятная ошибка — определить этот термин второй раз в домене заявок.»
- **TERM.** This matches DDD (DDD Reference 2015): a bounded context's ubiquitous language, with shared terms in a shared kernel or published language. The fit is partial, because DDD lets one word mean different things in different contexts, while row 10.1.7 forbids that (inference). A gloss in the docs is enough; no rename.

**Q11, not ready.**
- **The framing (author).** This is not a question. Rule 8.6 contradicts itself, since a term is placed by its name (agreed 8.5) and a node in a cell has no title. The agreed s-vke5hakwf3uyrjs already counts only the sids of nodes in cells. Show the fix as a proposal, with no options.
- **WORDING FIX, 8.6:**
  - EN: "Each cell of the table holds either text or a node of a kind that the specification's schema declares and whose nodes need no title, such as a rule."
  - RU: «Каждая ячейка таблицы содержит либо текст, либо узел того типа, который объявляет схема спецификации и узлам которого заголовок не нужен, например правило.»
- **CUT:** the reason's third sentence.

**Q12, not ready as a question.**
- **The framing (author).** Option B is ruled out by the owner's rules "What can run as a deterministic process is automated" and "A release carries out every rule it contains". Show the row as a proposed new node.
- **WORDING FIX, the row:**
  - EN: "Each `$ref` within a RecordType (§s-6eb92ddch7shuvu), at any depth, names a RecordType"
  - RU: «Каждый `$ref` внутри RecordType (§s-6eb92ddch7shuvu), на любой глубине, называет RecordType»
  - The form `#<sid>` stays where s-4npdup7mjkva69y states it.
- **Note (author).** The rows inserted by Q12 and Q18 shift the numbers of rows 12.12.2 to 12.12.7 that the page cites by number.

**Q13, ready after one fix (only the owner can answer).**
- **TERM.** The "new evidence" paragraph gives only half of what the two JSON Schema posts say. "The Last Breaking Change" (2023-02-23) forbids, in the next release, "keywords that are not declared by a listed vocabulary". "Custom Annotations Will Continue" (2023-02-22) keeps `x-` keywords as annotations.
- **WORDING FIX, the evidence paragraph:**
  - EN: "…announced in February 2023 that its next release will forbid keywords that no listed vocabulary declares, while keywords starting with `x-` stay allowed as annotations. So `enumSource` stays valid only if SpecSheriff's vocabulary is declared through `$vocabulary` in a meta-schema."
  - Summary 13, RU: «Новое: проект JSON Schema в 2023 году объявил, что следующая версия запретит слова, которых не объявляет ни один указанный словарь; слова с `x-` останутся аннотациями.»
- **B's cost (author):** add the meta-schema that declares the vocabulary.

**Q14, not ready.**
- **The framing (author).** The agreed s-nk8td3ez58gahc4 (2026-11-25) already defines the fields that a variant adds. Option B would reopen that agreed node. Show the change as a proposal that carries it out.
- **WORDING FIX, 12.6:**
  - EN: "A RecordType variant adds the fields that it declares. It also adds each field that it takes through `refines` from another RecordType, unless its RecordType is that RecordType or reaches it through `refines`."
  - RU: «Вариант RecordType добавляет поля, которые он объявляет. Он добавляет и каждое поле, которое получает через `refines` от другого RecordType, если только его RecordType не является этим RecordType и не достигает его через `refines`.»

**Q15, not ready.**
- **The framing (author).** The page accepted on 2026-11-19 settles this: «Вариант не пишет unevaluatedProperties». Option B is the silent dropping that rules.md calls the defect.
- **CUT:** the paragraph added to 12.6. Keep the row, checked through the extension's schema, as s-dk3zfkbhc3v6xbp does for `enum`. Show it as a proposal.

**Q16, not ready, and not a question for the owner.**
- **CUT:** the sentence added to 12.2.
- **The change (author).** The extension's schema requires `"type": "object"`, and an agreed node of the appendix says so, in stage 3. Following rows 12.12.8 and 12.12.11, table 12.12 probably also needs a row for it (inference). That row is shown as a proposal.
  - EN: "The top level of the `schema` of each RecordType other than a RecordType variant holds `"type": "object"`"
  - RU: «Верхний уровень `schema` каждого RecordType, кроме варианта RecordType, содержит `"type": "object"`»

**Q17, not a question.** Rule 12.4 already requires the validator to check `format`. The fix is only an `implements` link, which leaves the node's status as it is. Report it in one line.

**Q18, ready as a proposal after the fix.** Add a `cites` link to s-5x737t9nee4zgaa. Option B is ruled out for the same reason as in Q12.

**Dropped items.**
- 1, 2, 4–9 and 11–15: the reasons hold.
- 3: **WORDING FIX** (EN; section 3 has no Russian). s-agc6fb3vx46pc23 names no `x-enumSource`, so only one of the two nodes changes under Q13 B.
  - EN: "Under question 13, option B, s-ztseyetus7np6br changes anyway, and the replacement can be made in it then. s-agc6fb3vx46pc23 keeps it until its next change."
- 10: **CUT** "The two phrases do not mean the same thing…". It contradicts group 4's own note that the wording "is to match", and the deferral rests on the project's rule without it.

## Should not reach the owner at all
- **Q17:** it is only a link change.
- **Q16 as a question:** no node of the base changes. At most it adds a row, shown as a proposal.

Q11, Q12, Q14, Q15 and Q18 should reach the owner only as proposed wordings, not as choices.

Files used: `D:/SpecSheriff/.ai_docs/t25-pass/base-questions.md`, `D:/SpecSheriff/.ai_docs/t25-pass/recordtype-jsonschema.html`, `D:/SpecSheriff/.ai_docs/t25-one-thought.md` (lines 79–80 and 1250).

Sources:
- [json-schema.org, "Custom Annotations Will Continue"](https://json-schema.org/blog/posts/custom-annotations-will-continue)
- [json-schema.org, "The Last Breaking Change"](https://json-schema.org/blog/posts/the-last-breaking-change)

## The main session's decisions

They are in fix-brief-bq-b.md, which holds the decisions on all three reports of this review.
