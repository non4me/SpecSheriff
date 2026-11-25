**Verdict: none of the five drafts is ready.** The skill `specsheriff-terminology-review` is loaded and I ran `node .claude/vt/writing-rules.mjs`. Round e's fixes are all in place word for word: A1, A2 (citations, the count, the split, item 11) and C1. The wording of B and D is ready, but both lack their decisions and links.

## Checklist

**A** proposal:s-m4h279nbaqkpa3t · **B** proposal:new-spec-1-6-checks · **C** proposal:new-spec-1-6-runs · **D** proposal:new-spec-1-6-tests · **E** proposal:row-10-1-43b

| Rule | A | B | C | D | E |
|---|---|---|---|---|---|
| 1.2.3 Text and reason | ✓ | ✓ | ✓ | ✓ | ✓ (no reason, like 41 of the 48 rows) |
| 7.1 Goal, reader, scope | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✗ "Some of its edits are refused before they are made": no actor | ✓ | ✓ |
| 7.2.2 Order of the text | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words from the specification | ✗ "the files generated from the specification" has no citation | ✓ | ✗ "The checks" has no citation | ✓ | ✗ as in A |
| 7.3.1 Title | ✓ | ✓ | ✓ | ✓ | ✓ (a cell has none) |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 Contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 Reason | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 Sentence length | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ (the example agrees with the text) | ✓ |
| Pairing test | ✓ | ✓ | ✓ | ✓ | ✓ |

## A. proposal:s-m4h279nbaqkpa3t — not ready

**A1 — WORDING FIX, the author can fix.** Three problems, one fix:
- In item 1, "code" is wider than "the system's code" in the agreed s-rd9nftptjuz6bwv.
- "Generated from the specification" has no citation. An agent that writes code from the specification may count its own code as generated. s-qyjw8xez6t6adc3 says which tools and generators produce generated code.
- "code other than the files" mixes code and files.

The change narrows item 1 to match an agreed node, so it is listed in `change`. Item 1:
- "on every commit that changes the system's code (§s-hheus6f395ynqvc) outside the files generated from the specification (§s-qyjw8xez6t6adc3): whether that code does what the rules named in the commit say and does nothing that they do not say;"
- «при каждом коммите, меняющем код системы (§s-hheus6f395ynqvc) вне файлов, сгенерированных из спецификации (§s-qyjw8xez6t6adc3), — делает ли этот код то, что говорят названные в коммите правила, и ничего сверх этого;»

Add `cites` links to both sids.

**A2 — the author can fix (decisions only).** After the split, all eight decisions stay on this node, which breaks the principle "A rule is self-sufficient".
- Keep here: both decisions of 2026-11-19, and the decision of 2026-11-20 on `implements`.
- Move to s-5j9s5dstbawdd69: the decision of 2026-11-08, and the decision of 2026-11-18 on the table of checks of an extension.
- Move to s-x8uzc8z44pwtd3h: the decision of 2026-11-17, the decision of 2026-11-18 on generators, and the decision of 2026-11-20 on the reason.
- Add a `proposedDecision` for leaving out the generated files (group 2, item 11), here and on E.

**A3 — the author can fix.** Row 10.1.44 (s-aufnqn6t7y2me7a) `checks` this sid for the tests, and the tests are now in D. Move that link to s-x8uzc8z44pwtd3h, and add it to item 14 of the notes.

**Оценка**
- согласованность: ✗ «code» в п. 1 шире «кода системы» в согласованном s-rd9nftptjuz6bwv (и в 9.5). В остальном сверено с принципом в редакции 2026-11-24, с 10.2, 10.4 и его предложением, 10.5, s-7vpsdsy8dpqdy6r, строками 10.1.43, 10.1.43a и 10.1.43b.
- целостность: ✗ решения 1.6.1 не распределены по четырём узлам. Строка 10.1.44 проверяет этот sid, а не узел о тестах, и пункт 14 заметок этого не называет. Ссылки из 1.2.6, 1.3.2, 1.3.3 и 10.6 названы.
- целесообразность: ✓ без этого суждения комментарии не проверял бы никто (9.4 в предложении группы). Ревью, которое может только пропустить, снято (п. 11 группы 2).
- избыточность: ✓ не найдена.
- недостаточность: ✗ у «files generated from the specification» нет ссылки на s-qyjw8xez6t6adc3.

## B. proposal:new-spec-1-6-checks — not ready (the wording is ready; A2 applies)

**Оценка**
- согласованность: ✓ сверено с принципом, 10.1, 1.7.7, 10.8 и 10.2.
- целостность: ✗ решения от 2026-11-08 и 2026-11-18 (о таблице расширения) остались на s-m4h279nbaqkpa3t.
- целесообразность: ✓ пункт 12 группы 2, правило 7.3.3.
- избыточность: ✓ не найдена.
- недостаточность: ✓ не найдена.

## C. proposal:new-spec-1-6-runs — not ready

**C1 — DOUBT, the owner.** I recommend deleting this node, for three reasons:
- 10.2 already lists every moment at which this node says the checks run.
- 10.3 already states the refusal before an edit.
- The node's reason repeats the reason of 10.2 and the second paragraph of 10.3's reason.

By the owner's ruling of 2026-11-10, a node that only retells another node is reported for deletion. If the owner keeps it, the text needs a `cites` link to s-5j9s5dstbawdd69 and this wording:
- "The SpecSheriff tools run the checks (§s-5j9s5dstbawdd69) when a commit is made. Where an agent writes the specification, the tests or the code, the tools also run the checks after each of its edits (§s-epaw9sgyaajzn8g). Before an agent's edit is made, the tools refuse it where the edit itself shows that it would break a rule (§s-83ev4wwesbwnhnp)."
- «Инструменты SpecSheriff запускают проверки (§s-5j9s5dstbawdd69), когда делается коммит. Там, где спецификацию, тесты или код пишет агент, инструменты запускают проверки ещё и после каждой его правки (§s-epaw9sgyaajzn8g). До того как правка агента сделана, инструменты отклоняют её, если по самой правке видно, что она нарушила бы правило (§s-83ev4wwesbwnhnp).»

**Оценка**
- согласованность: ✓ сверено с 10.2, 10.3 и принципом.
- целостность: ✓ на узел никто не ссылается.
- целесообразность: ✗ не названа проблема, которую узел решает сверх 10.2 и 10.3.
- избыточность: ✗ текст повторяет 10.2 и 10.3, обоснование повторяет их обоснования.
- недостаточность: ✗ «Some of its edits» не говорит, какие правки отклоняются и кто их отклоняет.

## D. proposal:new-spec-1-6-tests — not ready (the wording is ready; A2 and A3 apply)

**Оценка**
- согласованность: ✓ сверено с 1.3.2, 1.3.3, 9.1, 10.2, 10.6, 10.8, 10.9 и решениями от 2026-11-17, 2026-11-18 и 2026-11-20.
- целостность: ✗ сюда должна перейти связь `checks` строки 10.1.44 и три решения (A2).
- целесообразность: ✓ пункт 12 группы 2.
- избыточность: ✓ не найдена: 10.2 говорит только о push.
- недостаточность: ✓ не найдена.

## E. proposal:row-10-1-43b — not ready

**E1 — WORDING FIX, the author can fix.** Add the citation and a `cites` link:
- "…other than in the files generated from the specification (§s-qyjw8xez6t6adc3), is consistent…"
- «…кроме файлов, сгенерированных из спецификации (§s-qyjw8xez6t6adc3), согласуется…»

**Оценка**
- согласованность: ✓ сверено с принципом, с A, s-7vpsdsy8dpqdy6r, строками 10.1.43, 10.1.43a и 10.1.39b, а также с 9.5.
- целостность: ✓ строку реализует s-7vpsdsy8dpqdy6r, запись в impl.json названа в п. 13.
- целесообразность: ✓ без этой строки непройденная проверка отклоняла бы коммит.
- избыточность: ✓ не найдена.
- недостаточность: ✗ у «files generated from the specification» нет ссылки.

**TERM:** no finding. "Warning" is used as in rule 9.5 and in compilers: a report that blocks nothing (inference).

**Only the owner can answer:** C1, whether to delete s-ec6meku7xd34ych.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group3-notes.md` (item 14).
