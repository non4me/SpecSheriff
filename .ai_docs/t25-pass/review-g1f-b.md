I loaded the skill `specsheriff-terminology-review` and ran `node .claude/vt/writing-rules.mjs`. I changed no file. I applied the 300-word limit to each draft separately.

**Three drafts are not ready and three are ready.** `s-zhen42p6mnaxu7w`, `s-qvgzubkrafadqgf` and `new:tools-7-1-consumes` each need small fixes, and the author can make all of them. `new:tools-7-1-guidelines-to-extension`, `s-yprj7d6tnvauggr` and `s-6bmnsbskg6en4nf` are ready. Round e kept the meaning of the Russian in all six drafts.

Labels: **A** s-zhen42p6mnaxu7w · **B** s-qvgzubkrafadqgf · **C** new:tools-7-1-consumes (s-p3n666zfjdrrw6a) · **D** new:tools-7-1-guidelines-to-extension (s-75r4pg4wdqu3gw5) · **E** s-yprj7d6tnvauggr · **F** s-6bmnsbskg6en4nf

## Checklist

| Rule | A | B | C | D | E | F |
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
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✗ "a term or a node of a project's own kind (§s-pctqj9wqaq8762t)": rule 8.2 defines neither | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ (one check over three parts, which share how the part is found) | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ (a typical case only, which is enough here) | ✓ | ✓ |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## A — s-zhen42p6mnaxu7w — **not ready**

Round e kept the Russian meaning: the only change there is «Самая вероятная ошибка».

- **WORDING FIX (7.2.7), the author's to make.** "Term" is not among the words that rule 7.1 lets a node use unexplained. The group cites rule 3.3 for it, and draft B cites rule 8.3 for "a project's own kind". Rule 8.2 has no links, so the reader cannot reach either definition from this node. The Russian also takes the owner's form from terms-ru.md. Add `cites` links to s-khqsmy6mhejkrhg and s-vsh384ybt4w25a2.
  - EN: "a term (§s-khqsmy6mhejkrhg) or a node of a project's own kind (§s-vsh384ybt4w25a2, §s-pctqj9wqaq8762t);"
  - RU: «термин (§s-khqsmy6mhejkrhg) или узел собственного типа в проекте (§s-vsh384ybt4w25a2, §s-pctqj9wqaq8762t);»

**Оценка**
- согласованность: ✓ — сверено с 8.1, 8.2, 8.3, 8.6, 12.3a, 1.3.3, 1.3.8 и его решением от 2026-11-06, строкой 10.1.18.
- целостность: ✓ — строка 10.1.18 в impl.json уже ведёт к узлу. Правка кода (читать только файлы репозитория) названа в stage3.
- целесообразность: ✓ — раздел без правил выглядит частью спецификации, а его статус одобрения этого не показывает.
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — «термин» и «собственный тип узла» не связаны с определяющими их узлами 3.3 и 8.3.

## B — s-qvgzubkrafadqgf — **not ready**

Round e rewrote the example. The Russian keeps its meaning, and «приводит эту причину» matches rule 9.8. The author can make both fixes below.

- **WORDING FIX ("Writing"): a phrase that points back to another paragraph.** "Any other `exempts` link" opens paragraph 2 but refers to paragraph 1. Round d joined the paragraphs of "Link types reserved for terms" for the same reason.
- **WORDING FIX (целостность): two nodes refuse the same link.** An `exempts` link to a sid that has no node is refused both by this node and by "The target of a link" (s-c4rn9fj4czk768b). Round c removed the same double refusal from "Link types reserved for terms".

The new opening below makes both fixes, and it also drops "in the specification" after "location", as drafts A, D and E already do. The list stays as it is. Add a `cites` link to s-w6gybeqn2ttydqx. Stage 3: validate.ts:253 is to leave such a link to the check of the link's target.

- EN, paragraph 1: "`sheriff validate` accepts an `exempts` link (§s-gf6n8ge4mke3pr2, §s-6u54kfn4ze29r6h) only where the link is allowed. It refuses any other `exempts` link, naming the node that declares it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming the link's target. It checks only an `exempts` link whose target is a node of the model of the specification (§s-w6gybeqn2ttydqx)."
- EN, paragraph 2 (it introduces the list): "An `exempts` link is allowed where all of the following hold:"
- RU, абзац 1: «`sheriff validate` принимает связь `exempts` (§s-gf6n8ge4mke3pr2, §s-6u54kfn4ze29r6h), только если она допустима. Любую другую связь `exempts` он отвергает, называя файл, sid и расположение (§s-kag2m9tzdnduxdx) узла, который её объявляет, и цель связи. Он проверяет только связь `exempts`, цель которой — узел модели спецификации (§s-w6gybeqn2ttydqx).»
- RU, абзац 2: «Связь `exempts` допустима, если выполнено всё следующее:»

**Оценка**
- согласованность: ✓ — 9.2, 9.8 и его решения, строка 10.1.19 с решением и todo от 2026-11-13, 8.3, 8.6, 12.3a, 6.3, «Where the files are».
- целостность: ✗ — связь `exempts` к sid без узла отвергают два узла: этот и s-c4rn9fj4czk768b.
- целесообразность: ✓ — недопустимая связь скрыла бы правило, которое код системы не реализует.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

## C — new:tools-7-1-consumes — **not ready**

Round e kept the Russian meaning. The author can make both fixes below.

- **WORDING FIX: the same two problems as in B.** Paragraph 2 points back with "any other `consumes` link", and a link to a missing sid is refused twice. Join the two paragraphs, add one sentence, and drop "in the specification". Add a `cites` link to s-w6gybeqn2ttydqx. Stage 3: validate.ts:259–260 is to leave such a link to the check of the link's target.
  - EN: "Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a `consumes` link only where it goes from a domain's header to a section in the files of another domain (§s-yggv9myedprnaa7, §s-rdavpdea67hsntf). A domain's files are those in its folder, `specs/<domain>/` (§s-zefk589ykh37b8u). `sheriff validate` refuses any other `consumes` link, naming the node that declares it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming the link's target. It checks only a `consumes` link whose target is a node of the model of the specification (§s-w6gybeqn2ttydqx)."
  - RU: «Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает связь `consumes`, только если она идёт от заголовка домена к разделу в файлах другого домена (§s-yggv9myedprnaa7, §s-rdavpdea67hsntf). Файлы домена — это файлы в его папке `specs/<domain>/` (§s-zefk589ykh37b8u). Любую другую связь `consumes` `sheriff validate` отвергает, называя файл, sid и расположение (§s-kag2m9tzdnduxdx) узла, который её объявляет, и цель связи. Он проверяет только связь `consumes`, цель которой — узел модели спецификации (§s-w6gybeqn2ttydqx).»

**Оценка**
- согласованность: ✓ — 11.1.3, 11.1.4, строки 11.3.3 и 11.3.4 с решением о цикле, «Where the files are», «One header for each domain». Расхождение 11.1.5 («любого типа») со строкой 11.3.3 уже записано (пункт 1 изменений вне группы).
- целостность: ✗ — связь `consumes` к sid без узла отвергают два узла: этот и s-c4rn9fj4czk768b.
- целесообразность: ✓ — указатель в заголовке домена и проверка цикла зависят от связей `consumes`.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

## D — new:tools-7-1-guidelines-to-extension — **ready**

Round e kept the Russian meaning. No findings.

**Оценка**
- согласованность: ✓ — 1.7.1, 1.7.3, 2.1, 2.3, строка 10.1.20a и её todo, «Where the files are». Ни один узел moved/spec.json сейчас не связан с узлом расширения.
- целостность: ✓ — цитату без связи отвергает s-qzyacnqwvaeaps4, связь к sid без узла отвергает s-c4rn9fj4czk768b. Перенос строки 10.1.20a в impl.json назван (пункт 4).
- целесообразность: ✓ — в репозитории guidelines такая связь проходит все прочие проверки.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

## E — s-yprj7d6tnvauggr — **ready**

Round e changed «находят» to «можно найти». Both are general statements, so the meaning is kept. The draft depends on the proposal for rule 6.1, as its `dependsOn` field records.

**Оценка**
- согласованность: ✓ — при согласии с предложением по 6.1. Сверено с 2.2, 2.3, 4.1, 4.2, 4.4, строками 10.1.22 (решение от 2026-11-13), 10.1.23 и 10.1.24 (решения от 2026-11-11), 1.7.5, «Where the files are», new:tools-1-project.
- целостность: ✓ — правки `partOf` и validate.ts:443–468 названы в stage3.
- целесообразность: ✓ — связь даёт найти узел, когда меняется правило, на которое он опирается.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

## F — s-6bmnsbskg6en4nf — **ready**

Round e changed «действующих файлов» to «файлов плагина». In a project these are the same files, so the meaning is kept.

**Оценка**
- согласованность: ✓ — 1.7.1, 2.5, строка 10.1.25, второй и третий столбцы «Where the files are» и `SPECSHERIFF_GUIDELINES_REPO`.
- целостность: ✓ — «Where the files are» ссылается на узел и остаётся верным. Правки кода названы в stage3.
- целесообразность: ✓ — копия незаметно отстаёт от файлов плагина.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

## Terms

No draft introduces a new term. The earlier term findings still stand:
- the docs should explain that `refines` also covers extending (item 7 of the changes outside the group);
- a "copy" here matches "vendoring" only in part (unverified);
- a `consumes` link matches a DDD downstream context that uses an upstream one only in part (inference).

## Questions only the owner can answer

None.

Files used:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.before-group1-e.json
- D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/extensions/domains.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/impl.json
- D:/SpecSheriff/skills/tools/src/validate.ts