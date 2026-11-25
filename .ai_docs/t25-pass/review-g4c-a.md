The four drafts are reviewed. Three are ready. "Generated copies checked against their nodes" (`s-dbk2vyeg8z5jxna`) is not ready: one sentence is now in the wrong place, which round c caused. No finding needs the owner. The skill `specsheriff-terminology-review` was in context.

**Checks of round b and the brief's points**
- **Round b's findings:** every finding of review b-a on these drafts, and every reader's finding on them, was applied or rejected for a reason that holds.
- **The proposal on 10.12** changes only what its `change` field lists. I compared it with `newform.json`.
- **Row 10.1.39b gets no node of its own:** the author's reading holds. `s-a8fn72xa782wvbk` has an `implements` link to `s-f8fmudceuyaj942`.
- **Item 33:** the author's reading holds, provided the owner agrees to the proposal on 10.12 and to row 10.1.37a in the same answer.

## Checklist
Columns: **A** `s-7pk89t8z6wymmj9` · **B** `proposal:row-10-1-37a` · **C** `proposal:s-pcnyfp7gev7syax-g4` · **D** `s-dbk2vyeg8z5jxna`

| Rule | A | B | C | D |
|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ (a row takes the table's reason, as 10.1.35a does) | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✗ "…refuses it in the same way. The refusal names the file and the generator." |
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
| Pairing test of the reason | ✓ | ✓ | ✓ (two purposes, not in the text's order) | ✓ |

The Russian renders every clause of all four drafts.

## A. `s-7pk89t8z6wymmj9` "How a project's own check is run": **ready**
- **Nit, no fix needed:** paragraph 4 names only "the files of the specification". The key check (`s-7zqsstgnuc772ba`) and rule 10.12 also cover the archive and the schema. Nothing contradicts: "only once" sets a condition that must hold, and `s-7zqsstgnuc772ba` stops `sheriff validate` anyway.

**Оценка**
- согласованность: ✓ сверено с s-2fau85dfyyeq66m и его решением от 2026-11-04, s-ujm7nfxkk9j3464, s-vj67ztqkuhxbv7s, предложением по s-pcnyfp7gev7syax, s-7zqsstgnuc772ba, new:tools-7-1-validate, s-qzthyh7yqvfhsa2, s-q3pfzyaxvpr2zj2, s-chsfpkgpmfk4fft, s-w6gybeqn2ttydqx, s-477gtdrkw34dzxw, s-y5yk7eu6h4zrjpr, proposal:new-tools-1-project-g4, принципами.
- целостность: ✓ s-chsfpkgpmfk4fft описывает `sheriff validate --strict` так же, как узел. Порядок держится, если предложение по 10.12 и строка 10.1.37a согласуются вместе с узлом. Хуки (пункт 57) и `moved/impl.json` записаны в заметках.
- целесообразность: ✓ этого требуют строки 10.1.37 и 10.1.37a, правила 10.8 и 10.7, и s-chsfpkgpmfk4fft называет `--strict`.
- избыточность: ✓ предложение о последней одобренной формулировке повторяет proposal:new-tools-1-project-g4 по решению 4 раунда b.
- недостаточность: ✓

## B. `proposal:row-10-1-37a` (row 10.1.37a): **ready**
No findings.

**Оценка**
- согласованность: ✓ второй шаг 10.12 теперь так же исключает файлы, которые git игнорирует. Сверено с s-pcnyfp7gev7syax, s-7pk89t8z6wymmj9, s-2fau85dfyyeq66m, шапкой s-jau82aq9juv9zzh.
- целостность: ✓ строку реализует s-7pk89t8z6wymmj9. Строка для отказа из s-n4m5zvh96yb299p отложена на пункт 57 (решение 3 раунда c).
- целесообразность: ✓ этого требуют правило 10.12 и шапка таблицы 10.1.
- избыточность: ✓
- недостаточность: ✓ файл, который проверка создаёт, покрыт словами «каталог … таким, каким он был».

## C. `proposal:s-pcnyfp7gev7syax-g4` (rule 10.12): **ready**; one fix goes into the notes, not the node
- **Notes fix (author).** Round c widened step 2: each of the project's own tools must leave every file except those git ignores. The note for item 57 is now narrower than step 2 in two places. The text it gives for row 10.1.37b covers only "what the commit contains". The hook's present refusal (`s-n4m5zvh96yb299p`) covers only the staged files and the message. Neither catches a tool that changes an unstaged file or adds a new file that git does not ignore. Add to "Changes outside the group found in round c", item 1: "Row 10.1.37b and the hook's refusal follow step 2 of the new rule 10.12: each of the project's own tools leaves the files in the working tree as they were, except those that git ignores."

**Оценка**
- согласованность: ✓ исключение намеренно отступает от решения 2026-11-17 (проверки SpecSheriff guidelines последними), и поле change объясняет почему. Фраза о CI повторяет принцип о детерминированных проверках. Сверено с new:tools-7-1-validate, s-7zqsstgnuc772ba, s-d5cgda5bdsn7bzy, s-emrfpzw2d5bgb6x, s-7pk89t8z6wymmj9, s-vj67ztqkuhxbv7s, решениями узла.
- целостность: ✗ запись для пункта 57 (текст строки 10.1.37b и отказ хука s-n4m5zvh96yb299p) уже нового второго шага: она не охватывает незастейдженный и новый неигнорируемый файл.
- целесообразность: ✓ противоречие с new:tools-7-1-validate реальное.
- избыточность: ✓
- недостаточность: ✓

## D. `s-dbk2vyeg8z5jxna` "Generated copies checked against their nodes": **not ready**
1. **WORDING FIX (author), introduced in round c.** Round c added the sentence on refusing the generator just before "The refusal names the file and the generator." That refusal now reads as the generator's refusal, which has no file. Move the sentence so that it directly follows "A file that only one of the two commits holds also differs." The sentence on refusing the generator then ends the paragraph.
   - EN: move "The refusal names the file and the generator."
   - RU: move «Отказ называет файл и генератор.» so that it directly follows «Файл, который есть только в одном из двух коммитов, тоже различается.»
2. **Nit (author).** In "Where the repository lacks such a file, it also refuses the commit", "it" can point to the repository. The Russian «он» has the same two masculine antecedents. It is a nit because no reader will take the repository as what refuses.
   - EN: "Where the repository lacks such a file, `sheriff binding` also refuses the commit."
   - RU: «Если в репозитории нет такого файла, `sheriff binding` также отвергает коммит.»
3. **TERM.** "copy", in the title only.
   - In SysML, «copy» links one requirement to a read-only copy of another (the skill's registry gives no edition). For traceability readers (group 3) it is a false friend, though "generated" and the text's "file" make the meaning clear (inference).
   - Recommendation: keep the word, which agreed rows 10.1.39a and 10.14 already use, and gloss it in the docs as "generated code kept in the repository". No node changes, so nothing is lost.

**Оценка**
- согласованность: ✓ сверено с s-dwxjxb7rw4w5yn3 и его решением от 2026-11-18, s-km4x4s26kv7pjze, s-qyjw8xez6t6adc3, s-kh8qcd5kxgh9z3j, s-a8fn72xa782wvbk, s-y5yk7eu6h4zrjpr, s-2x58az67bm6cxq2, s-hheus6f395ynqvc, s-pvzms7d8kxb8dk2, s-suv42g8r3ra2h6b, proposal:new-tools-1-project-g4.
- целостность: ✓ s-a8fn72xa782wvbk опирается на перечень отказов, а его дефект записан. Строку 10.1.39b реализует s-a8fn72xa782wvbk. `moved/impl.json` записан.
- целесообразность: ✓ этого требуют строка 10.1.39a и правило 10.9.
- избыточность: ✓
- недостаточность: ✓

## Findings only the owner can answer
None in this input.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/review-input-g4c-a.md
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group4-notes.md
- D:/SpecSheriff/specs/_guidelines/tools.json
