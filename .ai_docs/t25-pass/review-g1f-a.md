I ran `node .claude/vt/writing-rules.mjs`. The `specsheriff-terminology-review` skill was in context. I changed no file, and I applied the 300-word limit to each draft separately.

**Summary.** Round e kept the meaning of the Russian in all six drafts: every Russian change says what the changed English says. Four drafts are ready: V, G, Ci and T. A needs one fix to its Russian. C is ready only if the owner answers Q2 with A. There are also two fixes to the author's notes, for V and T, and neither changes a node's wording.

Labels used below:
- **A** is new:tools-7-1-approval-by (s-75ue25v6r23jkk8)
- **V** is s-agc6fb3vx46pc23
- **G** is new:tools-7-1-link-target (s-c4rn9fj4czk768b)
- **Ci** is s-qzyacnqwvaeaps4
- **T** is s-pvnnr844f3y964m
- **C** is s-e2vdhfsndy5stq9

## Checklist

| Rule | A | V | G | Ci | T | C |
|---|---|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (the definition says what a word is; only the boundary condition is negative, since the characters allowed there have no simple positive name) |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (paragraph 1 spells out "three or more words set in capitals", and paragraphs 3 and 4 make it exact; this follows the opening that 7.2.2 requires) |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ ("both" counts the node's own list, as the agreed s-j4webte36gkraju does) | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (the runs in the example are quotations, and examples lie outside what 7.1 lists) |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## A — new:tools-7-1-approval-by: not ready

**WORDING FIX (the author's; Russian only).** In paragraph 2, «файл, расположение» lost the word «узла». As written, a reader can take them as the file and the line of the approval in `specs/_approvals.jsonl`. The English stays as it is.
- RU: «Если узел находится в файлах, которые хранит репозиторий, отказ называет также файл узла, его расположение (§s-kag2m9tzdnduxdx) и ответственных за него.»

**Оценка**
- согласованность: ✓ — строка 10.1.9 и её решение от 2026-11-12, 1.1.6, 1.3.4, 1.3.7, s-v4qus7raqnwzneb, s-95w92rnjuv3sst8 (действие одобрения не зависит от нынешних ответственных, как и говорит обоснование), согласованный s-j4webte36gkraju (первый родитель; одобрения родителя в том виде, в какой их переписал бы `sheriff reindex`), решение от 2026-10-28 не ограничивать, кто назначает ответственных.
- целостность: ✓ — проверка строки 10.1.9 вынесена из s-95w92rnjuv3sst8, а замена в moved/impl.json названа. Stage 3 называет ветку APPROVAL_RULE и одобрение, sid которого нет в файлах репозитория (validate.ts:109).
- целесообразность: ✓ — без проверки одобрение от человека, который не отвечает за узел, можно дописать в `specs/_approvals.jsonl` вручную.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено. Коммит без родителя не назван, как и в согласованном s-j4webte36gkraju. Код считает, что у такого коммита одобрений не было (diff.ts:32).

## V — s-agc6fb3vx46pc23: ready

The wording needs no change. It holds once the owner agrees to the header-status proposals of the same group, which raise no question.

**Notes fix (the author's).** Item 4 of "Changes still to be made to nodes and files outside the group" should add "row 12.12.14 → s-agc6fb3vx46pc23". moved/impl.json maps s-93jpnb4c96qhwbu to `[]`, while V implements it.

**Оценка**
- согласованность: ✓ — 1.3.8 и его решение от 2026-11-06, 6.4, 11.1.4, 12.9, строки 10.1.10, 10.1.16, 11.3.2 (решения от 2026-11-18), 11.3.2a и 12.12.14, proposal:s-ztseyetus7np6br, proposal:domains-header-status, согласованный new:tools-7-1-validate.
- целостность: ✗ — строка 12.12.14 в moved/impl.json не указывает на этот узел, и заметки эту замену не называют. Узел менять не нужно. s-95w92rnjuv3sst8 не проверяет разделы и заголовки, так что пересечения нет.
- целесообразность: ✓ — после правки узла построенное из него значение устаревает, а ещё его могут вписать вручную.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

## G — new:tools-7-1-link-target: ready

No findings.

**Оценка**
- согласованность: ✓ — строка 10.1.12 и её решение от 2026-11-13, 2.3, 2.6 (у узла архива нет sid), 6.4, s-w6gybeqn2ttydqx, s-j4webte36gkraju.
- целостность: ✓ — T и s-75r4pg4wdqu3gw5 эту проверку не повторяют. Замена строки 10.1.12 в moved/impl.json названа.
- целесообразность: ✓ — когда цель связи удалена и отправлена в архив, связь на неё остаётся.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — модель спецификации охватывает и цели из плагина, и узлы в ячейках.

## Ci — s-qzyacnqwvaeaps4: ready

No findings.

**Оценка**
- согласованность: ✓ — 6.3 и его решение от 2026-11-09, решение по 6.4 от 2026-11-04 (sid в обратных кавычках — тоже ссылка), строки 10.1.13 и 10.1.14, 8.5, 11.1.4, 12.9, model.ts:112–113.
- целостность: ✓ — цель связи вынесена в G. s-nh8b2hjvzasdxmd по-прежнему ссылается на этот узел верно. Stage 3 назван.
- целесообразность: ✓ — ссылка без связи не попадает в связи, указывающие на узел.
- избыточность: ✓ — не найдено. Узел уточняет 6.3, а не повторяет его: он добавляет границу sid, узлы в ячейках и `x-enumSource.gathered`.
- недостаточность: ✓ — не найдено.

## T — s-pvnnr844f3y964m: ready

The wording needs no change.

**Stage-3 fix (the author's).** T's stage 3 says that validate.ts:147–151 "already refuses both cases". But validate.ts:149 also refuses a `term-relation` or `uses` link whose target is no node, because `isTerm` is false for such a target. So such a link is refused twice, once there and once at validate.ts:138. The draft says T checks only links whose target is a node of the model. Add to stage 3: "validate.ts:149 is to skip a link whose target is no node of the model, which only s-c4rn9fj4czk768b refuses."

**Оценка**
- согласованность: ✓ — 6.5 и его решение от 2026-11-16, строка 10.1.15 и её графа «On failure», 3.2, 7.2.4, решение от 2026-11-10 об имени NodeKind, s-w6gybeqn2ttydqx.
- целостность: ✗ — по тексту связь с sid, у которого нет узла, отвергает только G. Код же (validate.ts:149) отвергает её второй раз, а stage 3 этого не называет. Узел менять не нужно.
- целесообразность: ✓ — проблема названа: как связаны два термина, решают ответственные.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

## C — s-e2vdhfsndy5stq9: ready, if the owner answers Q2 with A

No other findings.

**Оценка**
- согласованность: ✓ при ответе A на Q2 — 7.1, 7.6.1, 7.6.2, строка 10.1.17 и её решение от 2026-11-13, proposal:row-10-1-17. Без ответа A вторая фраза строки 10.1.17 освобождает аббревиатуры от запрета, а узел отвергает три подряд.
- целостность: ✓ — stage 3 (validate.ts:158–172) назван.
- целесообразность: ✓ — проверка не понимает текста, поэтому должна узнавать фразу заглавными по её форме.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено. Кавычки названы так же, как их читает код (validate.ts:165).

## Terms

None of the drafts introduces a new term, so I propose no rename. Two earlier notes still hold. A link whose target is missing matches OpenFastTrace's "orphaned" link only in part (unverified). "Merge commit" and "first parent" are used in their git sense (inference).

## Questions only the owner can answer

- **Q2** (`proposal:row-10-1-17`): should abbreviations be an exception only where there are no more than two of them in a row? C depends on the answer.

Files used:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json and tools-drafts.before-group1-e.json
- D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json, extensions/domains.json, extensions/recordtype.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/impl.json
- D:/SpecSheriff/specs/_guidelines/tools.json
- D:/SpecSheriff/skills/tools/src/validate.ts, model.ts, approvals.ts, diff.ts