The four drafts in `review-input-g4d-a.md` are all **ready**. Round d added no new defect, and none of my findings is for the owner. I found only nits: two notes that still describe an older wording, and one reader's finding that the notes rejected for a reason that is not quite right. The skill `specsheriff-terminology-review` was in context.

**Checks the brief asked for**
- **The third review's findings:** every finding of `review-g4c-a.md` and of both readers on these drafts was applied, or rejected for a reason that holds. The one exception is a reason given in the notes, covered in the nit on draft C below.
- **Round d against round c:** I compared each draft with `tools-drafts.before-group4-d.json`. Every edit is a fix that one of those reports asked for, and none brings a new defect.
- **The proposal on rule 10.12:** it changes only what its `change` field lists. I compared it with `newform.json` 10.12, which the owner agreed on 2026-11-18.
- **Row 10.1.39b gets no node of its own:** the author's reading holds. `s-a8fn72xa782wvbk` has an `implements` link to `s-f8fmudceuyaj942` and names each node it leaves out by its sid.
- **Item 33:** the author's reading holds, as long as the owner agrees to the proposal on 10.12 and to row 10.1.37a in the same answer as `s-7pk89t8z6wymmj9`.

## Checklist
Columns: **A** `s-7pk89t8z6wymmj9` · **B** `proposal:row-10-1-37a` · **C** `proposal:s-pcnyfp7gev7syax-g4` · **D** `s-dbk2vyeg8z5jxna`

| Rule | A | B | C | D |
|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ (a row takes the table's reason) | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ (a row has no title) | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ ("three steps" counts the rule's own steps) | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ |
| Pairing test of the reason | ✓ | ✓ | ✓ (paragraph 2 gives instances of one purpose, not the text in order) | ✓ |

The Russian of all four drafts renders every clause. Every citation has its link.

## A. `s-7pk89t8z6wymmj9` "How a project's own check is run": **ready**
- **Nit (author):** the `change` note of the paragraph on the refusal still paraphrases the old step 2 («собственные проверки проекта не меняют файлов»). It is a nit because the paragraph itself has the exception for files that git ignores. Fix: «собственные проверки проекта оставляют файлы такими, какими они были, кроме тех, которые git игнорирует».

**Оценка**
- согласованность: ✓ сверено с s-2fau85dfyyeq66m, s-ujm7nfxkk9j3464, s-vj67ztqkuhxbv7s, предложением по s-pcnyfp7gev7syax, s-7zqsstgnuc772ba, new:tools-7-1-validate, s-w6gybeqn2ttydqx, s-5hb9k2e34dgn284, s-a8fn72xa782wvbk, s-qzthyh7yqvfhsa2, s-q3pfzyaxvpr2zj2, s-chsfpkgpmfk4fft, s-477gtdrkw34dzxw, proposal:new-tools-1-project-g4 и с принципами.
- целостность: ✓ при условии, что предложение по 10.12 и строка 10.1.37a согласуются вместе с узлом. Изменения хуков записаны для пункта 57.
- целесообразность: ✓ этого требуют строки 10.1.37 и 10.1.37a и правила 10.6–10.8.
- избыточность: ✓
- недостаточность: ✓

## B. `proposal:row-10-1-37a` (row 10.1.37a): **ready**
- **Nit (author):** the draft's `question` field still says "none of which changes a file". It is a nit because that field is not part of the node. Fix: "whose second step requires each of a project's own checks to leave the files as they were, except for those that git ignores".

**Оценка**
- согласованность: ✓ сверено с s-pcnyfp7gev7syax (шаг 2 предложения), s-7pk89t8z6wymmj9, s-2fau85dfyyeq66m и шапкой s-jau82aq9juv9zzh.
- целостность: ✓ строку реализует s-7pk89t8z6wymmj9. Строка 10.1.37b отложена на пункт 57.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓ при коммите `staged.sh` делает каталог с застейдженными файлами рабочим деревом git, так что правила игнорирования git там действуют.

## C. `proposal:s-pcnyfp7gev7syax-g4` (rule 10.12): **ready**
- **Nit (notes only):** the fast reader found two readings of "the project's own tools still run" and said that the context does not decide between them. The notes rejected this with "where the context decides, as the readers say", which misstates what the reader wrote. The text still holds:
  - the opening sentence names the project's own tools apart from the checks;
  - "the rest of the project's own tools" in step 2 means the tools other than those of step 1;
  - `s-4mej6ccn7xu3d3p` and draft A run a project's own check only inside `sheriff validate`.

  The note's reason for keeping "each of which" says that checks are among the tools, which argues for the wrong reading. It should say instead that "each of which" covers both items named before it. No change to the node.

**Оценка**
- согласованность: ✓ сверено с new:tools-7-1-validate, s-7zqsstgnuc772ba, s-d5cgda5bdsn7bzy, s-emrfpzw2d5bgb6x, s-7pk89t8z6wymmj9, s-vj67ztqkuhxbv7s, s-4mej6ccn7xu3d3p, s-n4m5zvh96yb299p, решениями узла и принципом о CI.
- целостность: ✓ изменения хуков и строка 10.1.37b записаны для пункта 57.
- целесообразность: ✓ противоречие с new:tools-7-1-validate реальное.
- избыточность: ✓
- недостаточность: ✓

## D. `s-dbk2vyeg8z5jxna` "Generated copies checked against their nodes": **ready**
No findings. The sentence on the refusal is now where review c-a asked, and `sheriff binding` is named in the place of "it".

**Оценка**
- согласованность: ✓ сверено с s-dwxjxb7rw4w5yn3, s-km4x4s26kv7pjze, s-qyjw8xez6t6adc3, s-a8fn72xa782wvbk, s-y5yk7eu6h4zrjpr, s-2x58az67bm6cxq2, s-hheus6f395ynqvc, s-kh8qcd5kxgh9z3j и proposal:new-tools-1-project-g4.
- целостность: ✓ дефект s-a8fn72xa782wvbk записан. Строку 10.1.39b реализует s-a8fn72xa782wvbk.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**Terms:** none new. The glosses for "copy" and for "last approved wording" against "baseline" are already recorded for the docs.

## Findings only the owner can answer
None in this input.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/review-input-g4d-a.md
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.before-group4-d.json
- D:/SpecSheriff/.ai_docs/t25-pass/group4-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/newform.json
