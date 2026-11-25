# Second review of the 22 follow-on drafts: the report

The skill `specsheriff-terminology-review` was loaded. `node .claude/vt/writing-rules.mjs` printed 25 rules and the pairing test. I edited no file. The working copies I made are in the scratchpad: `C:/Users/PC/AppData/Local/Temp/claude/a0dc34c442b04427/8cff5ff8-2618-4605-ba3d-4c860a64081a/scratchpad/fo1.md` and `diff.txt`.

# Second review of the follow-on drafts

**Summary.** Round b applied every finding of the first review, in the wording the reports gave. The main session made two deliberate changes, both for reasons that hold: it dropped `$id` from the imports and it moved the shebang exception into s-33fw3ga4ctd94dq. The split of s-ezq8csd433vj6fj was done correctly.

Seventeen drafts are ready, some with nits. Five are not ready:
- **s-j4t9vusnsajmqdw (the meta-schema):** the path the author wrote exists only in the guidelines repository, not in a project. Also, its `false` paragraph has no effect under JSON Schema's own rules.
- **s-33fw3ga4ctd94dq:** a Python shebang followed by a blank line is left open, and paragraph 8 can be read two ways.
- **s-u6mj5yv8ngnz79v:** adding a `$comment` would count as a change to the code.
- **s-g7auhqvzzbkw644:** it lacks the row's exception for a file's first top-level node.
- **s-suv42g8r3ra2h6b:** the sentence carried over from the removed node no longer has a reason to exist.

Drafts are numbered 1–22 in the order of `review-input-fo2.md`. Number 16, s-h5rfyy9j8nnhx62, is the removal, so it has no wording to check (–).

## Checklist

| Rule | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

The words behind each ✗:
- **#9, rule 7.1:**
  - Paragraph 6 says "before that comment", but the comment is named only in paragraph 5.
  - In paragraph 3, "In place of a comment above it, a definition's…" uses "it" before the definition is named.
  - Paragraph 3 also says "JSON Schema, which allows no comments".
  - Paragraph 10 says "the symbol that a SpecTag is above", which does not fit JSON Schema.
- **#9, rule 7.2.5:** paragraph 8 says "…are not code outside every symbol", which defines by negation.
- **#18, rule 7.2.4.4:** paragraph 2 says "`$vocabulary` marks…" without naming the object the key belongs to.
- **#8, rule 7.5.2:** "The path of titles of a section is the titles of…" is not natural English (nit).

---

## 1. s-yauyedny2yzvs4c: ready
Оценка:
- согласованность: ✓ §s-7kc8dw7zdz63q53, §s-cb9rbh8q88a84xp, §s-ypa92gpcj3f5zj8
- целостность: ✓ §s-76becsjwmasc2r2, §s-zefk589ykh37b8u
- целесообразность: ✓ пункт 2.9
- избыточность: ✓
- недостаточность: ✓

The first review's fix is applied word for word. No findings.

## 2. s-76becsjwmasc2r2: ready
Оценка:
- согласованность: ✓ §s-8p52mzm3y33cf7z, §s-qscrdhf6kj57gbx, §s-cb9rbh8q88a84xp
- целостность: ✓ §s-yauyedny2yzvs4c, §s-gvafe6bnstwab8b, §s-zefk589ykh37b8u
- целесообразность: ✓ 2.9, 4.6 Б
- избыточность: ✓
- недостаточность: ✓

All four fixes and the stage-3 note are applied. No findings.

## 3. s-yhe32vrbygjyd66 (new, dictated by the first review): ready, with one nit
Оценка:
- согласованность: ✓ §s-axjr5ex3p7ys3nd, §s-4npdup7mjkva69y, §s-ezq8csd433vj6fj (без пересечения)
- целостность: ✗ (мелочь) обоснование говорит «RuntimeCheck не работает в проекте», а по §s-suv42g8r3ra2h6b (абзац 14) и §s-dbk2vyeg8z5jxna такой `$ref` не даёт `sheriff types` записать ни одного файла
- целесообразность: ✓ 3.4
- избыточность: ✓ (частичное пересечение с §s-suv42g8r3ra2h6b в другой команде принято первым ревью)
- недостаточность: ✓

The location ("after 'A RecordType that refers to a RecordType outside its part of the system'") is correct. That is the title of s-ezq8csd433vj6fj.

**WORDING FIX (nit), first sentence of the reason.** Change the links to match: `cites` s-suv42g8r3ra2h6b in place of s-e877bnfa559tvk9.
- EN: "A `$ref` that names no RecordType leaves `sheriff types` unable to generate any file (§s-suv42g8r3ra2h6b)."
- RU: «Из-за `$ref`, который не называет RecordType, `sheriff types` не может сгенерировать ни одного файла (§s-suv42g8r3ra2h6b).»

## 4. s-c2r9jndrjbtbsv6: ready once two links are removed
Оценка:
- согласованность: ✓ §s-z3dnru6qqdf9m6j (определение добавляемых полей теперь только там), §s-47q37qk27yvt3pa, §s-gc7uwxtkrnpa2t9, §s-n94dfdsdzue2kur
- целостность: ✗ (связи) связи `cites` на §s-xfu2gpzddjnmgks и §s-jau82aq9juv9zzh без ссылки в узле
- целесообразность: ✓ 3.5, 3.6
- избыточность: ✓
- недостаточность: ✓

The doubt on the first condition and the cut are applied. The `cites` link to s-nk8td3ez58gahc4 was correctly dropped with the cut.

**Fix (links only, no change of status):** remove the `cites` links to s-xfu2gpzddjnmgks and s-jau82aq9juv9zzh. No field of the node cites them, and the agreed node had the same defect. CLAUDE.md allows a `cites` link only where the node cites its target.

## 5. s-qg2yqec2cgmcg2w: ready
Оценка: ✓ по всем пяти — §s-c7zj6mraw8w83py, §s-c2r9jndrjbtbsv6, §s-4npdup7mjkva69y, §s-xzcw3hv4hmxz7h7; 3.7.

No findings.

## 6. s-f5brvuuu6xmkj6t: ready
Оценка: ✓ по всем пяти — §s-5ah25f6gy99panq (редакция 4.1 А), §s-gb8s9657a65hqmv, §s-st6td4mua9uqt9z (сравнивает отпечатки).

No findings.

## 7. s-gvafe6bnstwab8b: ready
Оценка: ✓ по всем пяти — §s-vghy37e3p2325ah, §s-zefk589ykh37b8u, §s-vj7ercem526zd6v; 4.2 А.

No findings.

## 8. s-g7auhqvzzbkw644: ready after the fix below
Оценка:
- согласованность: ✓ §s-ujnb23vbw3y8cne, §s-ygg5kpcxgzq3m7w
- целостность: ✓ §s-gvafe6bnstwab8b
- целесообразность: ✓ 4.2 А
- избыточность: ✓
- недостаточность: ✗ строка §s-ujnb23vbw3y8cne прямо исключает первый узел верхнего уровня файла, названного по папке; узел этого не говорит, и по абзацу 0 такой узел (его путь заголовков начинается ниже его самого) отвергался бы

**WORDING FIX, the end of paragraph 2.** Read literally, paragraph 0 would refuse the root node of every such file.
- EN: "`sheriff validate` also leaves out that node itself."
- RU: «Сам этот узел `sheriff validate` тоже пропускает.»

**WORDING FIX (nit), paragraph 1.**
- EN: "The path of titles of a section consists of the titles of the sections that hold it, …"
- RU: use the Russian of the row: «Путь заголовков раздела — это заголовки разделов, которые его содержат, сверху вниз, а за ними заголовок самого раздела.»

Nit on the Russian only: in paragraph 3, «путь заголовков» (the owner's row) shares the word «заголовок» with «заголовок домена» (the owner's word for a domain's header). The English is unambiguous, so I propose no change unless the owner wants one.

## 9. s-33fw3ga4ctd94dq: not ready
Оценка:
- согласованность: ✗ (мелочь) «JSON Schema, which allows no comments» расходится с JSON Schema 2020-12 Core §8.3 и с §s-u6mj5yv8ngnz79v, где `$comment` — комментарий
- целостность: ✓ §s-kgbzk2ph9e6jfb4, §s-2x58az67bm6cxq2, §s-9rtrj24myzjvshu, §s-suv42g8r3ra2h6b
- целесообразность: ✓ 4.3 А, 4.4 Б
- избыточность: ✓
- недостаточность: ✗ в Python shebang сам имеет вид комментария: если после него пустая строка, первым комментарием оказывается shebang, и SpecTag под ним ничего не привязывают; абзац 8 читается двояко

**DOUBT, paragraph 6.** This settles the Python case and removes the pointer back to paragraph 5.
- EN: "A shebang, a first line that opens with `#!`, may come before the file's first comment. In Python, where a shebang has the form of a comment, the file's first comment is the first comment after the shebang."
- RU: «Перед первым комментарием файла может стоять shebang — первая строка, которая начинается с `#!`. В Python, где shebang имеет вид комментария, первый комментарий файла — это первый комментарий после shebang.»

**WORDING FIX, first sentence of paragraph 8.** The current sentence can mean that every top-level key is outside the code, or that only these three are. The round-b decision to drop `$id` from the imports makes sense only under the second reading. The fix keeps that reading and states it positively. The paragraph's second sentence stays.
- EN: "In JSON Schema, the code outside every symbol is each key of the top-level object, with its value, other than `$schema`, `$defs` and `$comment`."
- RU: «В JSON Schema код вне всех символов — это каждый ключ объекта верхнего уровня вместе с его значением, кроме `$schema`, `$defs` и `$comment`.»

**WORDING FIX (nit), paragraph 3.**
- EN: "In JSON Schema, whose JSON syntax allows no comments, …" and "A definition's SpecTags are whole lines of the string in its `$comment`, in place of a comment above the definition (§s-kgbzk2ph9e6jfb4)."
- RU: «В JSON Schema, где синтаксис JSON не допускает комментариев, …» and «SpecTag определения — это целые строки текста в его `$comment`, вместо комментария над определением (§s-kgbzk2ph9e6jfb4).»

**DOUBT (nit), paragraph 10, an agreed sentence.** In JSON Schema a SpecTag is not above its symbol.
- EN: replace "the symbol that a SpecTag is above" with "the symbol that a SpecTag binds".
- RU: «Символ, который привязывает SpecTag, инструменты SpecSheriff находят…»

**DOUBT (an optional example; the whole-line rule is new and easy to get wrong).**
- EN: "In JSON Schema, a definition whose `$comment` is `"@spec s-…\nChecks an address."` is bound by that SpecTag, the first whole line of the string. The most likely mistake is `"$comment": "Checks an address. @spec s-…"`, where the SpecTag shares its line with other text and binds nothing."
- RU: «В JSON Schema определение, у которого `$comment` — `"@spec s-…\nChecks an address."`, привязано этим SpecTag — первой целой строкой текста. Самая вероятная ошибка — `"$comment": "Checks an address. @spec s-…"`: SpecTag делит строку с другим текстом и ничего не привязывает.»

## 10. s-2x58az67bm6cxq2: ready
Оценка: ✓ по всем пяти — §s-kgbzk2ph9e6jfb4, §s-33fw3ga4ctd94dq, §s-weuyx98r7c923ab, §s-rd9nftptjuz6bwv, §s-3xx2eukc8gtd2tx.

The doubt is applied as dictated. No findings.

## 11. s-weuyx98r7c923ab: ready
Оценка: ✓ по всем пяти — §s-kkbqcb9xrpaepwn, §s-3xx2eukc8gtd2tx (теперь считает этот код).

No findings.

## 12. s-9rtrj24myzjvshu: ready, with one nit
Оценка:
- согласованность: ✓ §s-kgbzk2ph9e6jfb4, §s-k6dzuajejrw4cej
- целостность: ✓ §s-3xx2eukc8gtd2tx
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ (мелочь) строка SpecTag в JSON Schema — строка файла или строка текста `$comment`?

**WORDING FIX (nit), item 5.** `sheriff types` writes the SpecTag on the same file line as `"$comment": "`.
- EN: "in such a file, a SpecTag that shares its line with anything other than the comment's delimiters, where in JSON Schema a SpecTag's line is a line of the string in the `$comment`;"
- RU: «в таком файле SpecTag, который делит строку с чем-либо, кроме ограничителей комментария, причём в JSON Schema строка SpecTag — это строка текста в `$comment`;»

## 13. s-rd9nftptjuz6bwv: ready
Оценка: ✓ по всем пяти — §s-zn4vrdpnv9bch62, §s-vp24dqydygztqbt, §s-2x58az67bm6cxq2.

No findings.

## 14. s-suv42g8r3ra2h6b: ready once the doubt is settled
Оценка:
- согласованность: ✓ §s-33fw3ga4ctd94dq, §s-dbk2vyeg8z5jxna, §s-nk8td3ez58gahc4
- целостность: ✗ правило о пустом файле требует изменения кода (types.ts сейчас пишет файл и с пустым `$defs`), а заметка stage 3 этого не называет
- целесообразность: ✗ проблема, ради которой правило было в §s-h5rfyy9j8nnhx62 (запись в файле привязок без SpecTag), ушла вместе с записью
- избыточность: ✓
- недостаточность: ✓

**DOUBT, paragraph 4 ("writes a file of RuntimeChecks only where…").** The owner's rule "A rule whose problem cannot be named is removed" applies here (inference).
- A RuntimeChecks file with an empty `$defs` has no symbols and, by s-33fw3ga4ctd94dq, no code outside them. Nothing in it needs binding.
- I recommend deleting the sentence. That costs nothing, since today's code already writes such a file. The `change` of s-h5rfyy9j8nnhx62 would then say that the rule is dropped with the bindings entry.
- If the sentence stays, stage 3 must add: "types.ts is to write no file of RuntimeChecks where it generates no definition."

## 15. s-dbk2vyeg8z5jxna: ready
Оценка: ✓ по всем пяти — §s-dwxjxb7rw4w5yn3, §s-qyjw8xez6t6adc3; unchanged by round b.

No findings.

## 16. s-h5rfyy9j8nnhx62 (removal): ready
Оценка:
- согласованность: ✓
- целостность: ✓
- целесообразность: ✓ 4.4 Б
- избыточность: ✓
- недостаточность: ✓

The first review's nit is applied in `change`. Its sentence about s-suv42g8r3ra2h6b follows whatever is settled in finding 14.

## 17. s-m8nmfsxkcfu7cjp: ready
Оценка: ✓ по всем пяти — §s-sfjka4zc4rhfu67, §s-69pwmwyrk6efag2, §s-36x8amvunmv2kp5.

The new reason passes the pairing test. No findings.

## 18. s-j4t9vusnsajmqdw: not ready
Оценка:
- согласованность: ✗ путь `specs/_schema/extensions/…` есть только в репозитории guidelines; в проекте схемы расширений поставляются с инструментами в `guidelines/_schema/extensions/` (§s-zefk589ykh37b8u)
- целостность: ✗ §s-zefk589ykh37b8u должен получить строку для метасхемы
- целесообразность: ✓ Р8, 4.7 Б
- избыточность: ✗ (мелочь) второе предложение абзаца 1 и абзац 3 оба говорят, что проверяет метасхема
- недостаточность: ✗ `$vocabulary` и его `false` действуют только для схемы, метасхема которой — эта (Core §8.1.2); `schema` RecordType её не объявляет, а относительный `$id` нельзя назвать в `$schema` (§8.1.1)

**DOUBT, the file.** This carries out decision 4.7, so it can be approved on the owner's behalf. It needs `cites` s-zefk589ykh37b8u. Replace the second sentence of paragraph 0:
- EN: "The SpecSheriff tools keep that meta-schema in the file `recordtype-meta.schema.json`, in the same folder as that schema (§s-zefk589ykh37b8u). The meta-schema's `$id` is `recordtype-meta.schema.json`."
- RU: «Инструменты SpecSheriff хранят эту метасхему в файле `recordtype-meta.schema.json` в той же папке, что и эту схему (§s-zefk589ykh37b8u). `$id` метасхемы — `recordtype-meta.schema.json`.»

s-zefk589ykh37b8u gains a row in its second table, with `cites` s-j4t9vusnsajmqdw:
- "The meta-schema of a RecordType's `schema` (§s-j4t9vusnsajmqdw) | `guidelines/_schema/extensions/recordtype-meta.schema.json` | `specs/_schema/extensions/recordtype-meta.schema.json`"
- RU: «Метасхема `schema` RecordType (§s-j4t9vusnsajmqdw)».

**DOUBT, paragraph 2.** JSON Schema 2020-12 Core §8.1.2 (read during this run) has three relevant points:
- `$vocabulary` is ignored in a document that is not being processed as a meta-schema.
- `false` concerns only "schemas that declare this meta-schema with `$schema`".
- §8.1.1 requires a URI with a scheme in `$schema`.

The following is inference. A `$ref` from the extension's schema does not make this meta-schema the meta-schema of a RecordType's `schema`. Question 4.7 already accepted that a tool must "load that meta-schema". The wording below keeps the relative `$id`, the agreed convention, and states the effect accurately. It also fixes rule 7.2.4.4 and uses the positive word "optional", which is JSON Schema's own.
- EN: "The meta-schema's `$vocabulary` marks SpecSheriff's vocabulary as optional, with `false`. So a JSON Schema tool that takes the meta-schema as the meta-schema of a RecordType's `schema`, but does not know that vocabulary, still processes that `schema`."
- RU: «`$vocabulary` метасхемы отмечает словарь SpecSheriff как необязательный значением `false`. Поэтому инструмент JSON Schema, который берёт эту метасхему как метасхему `schema` RecordType, но не знает этого словаря, всё равно обрабатывает эту `schema`.»

**TERM**, `urn:specsheriff:vocabulary:recordtype`:
- JSON Schema accepts the value, since it needs only a URI with a scheme (Core §8.1.2, read this run).
- RFC 8141 §1 (read this run) says that a name starting with `urn:` is a URN only if its namespace identifier is registered. "specsheriff" is not registered (inference).
- JSON Schema's own vocabularies use https URIs, such as `https://json-schema.org/draft/2020-12/vocab/core` (not checked in this run).
- Recommendation (nit): an https URI on a domain the project controls. Cost: one value here and in stage 3.

**CUT (nit):** drop the second sentence of paragraph 1 and open paragraph 3 with it.
- EN: "At any depth within a RecordType's `schema`, the meta-schema checks the value of each of these keywords as …"
- RU: «На любой глубине `schema` RecordType метасхема проверяет значение каждого из этих ключевых слов так, как …»

## 19. s-3xx2eukc8gtd2tx: ready
Оценка: ✓ по всем пяти — §s-kkbqcb9xrpaepwn, §s-9rtrj24myzjvshu (абзац 12), §s-2x58az67bm6cxq2.

The change is limited to what s-9rtrj24myzjvshu hands this check. No findings.

## 20. s-u6mj5yv8ngnz79v: not ready
Оценка:
- согласованность: ✗ исключён только текст `$comment`, ключ остаётся в дереве: добавление или удаление `$comment` без SpecTag меняло бы определение, вопреки §s-9j2mmnuuwmx5ksn («adding, removing or rewording a comment») и правилу 1.5.2, где `$comment` — свойство для комментария
- целостность: ✓ §s-33fw3ga4ctd94dq, §s-2x58az67bm6cxq2
- целесообразность: ✓ 4.4 Б
- избыточность: ✓
- недостаточность: ✓

**WORDING FIX, item 2.** It carries out what the main session ruled: `$comment` is a comment. The stage-3 note changes with it.
- EN: "in a file in JSON Schema (§s-33fw3ga4ctd94dq), each `$comment`, other than the SpecTags in it;"
- RU: «в файле на JSON Schema (§s-33fw3ga4ctd94dq) — каждый `$comment`, кроме SpecTag в нём;»

## 21. s-qqs2svksmjct753: ready
Оценка: ✓ по всем пяти — §s-7sk3s553ukzwtbm, §s-2x58az67bm6cxq2, §s-kgbzk2ph9e6jfb4 (символ — именованная единица, поэтому изменение нужно).

No findings.

## 22. s-nk8td3ez58gahc4: ready
Оценка: ✓ по всем пяти — §s-suv42g8r3ra2h6b, §s-c2r9jndrjbtbsv6, §s-e877bnfa559tvk9.

The added sentence settles the first review's nit. No findings.

---

## Ready

- **Ready with no findings:** s-yauyedny2yzvs4c, s-76becsjwmasc2r2, s-qg2yqec2cgmcg2w, s-f5brvuuu6xmkj6t, s-gvafe6bnstwab8b, s-2x58az67bm6cxq2, s-weuyx98r7c923ab, s-rd9nftptjuz6bwv, s-dbk2vyeg8z5jxna, s-m8nmfsxkcfu7cjp, s-3xx2eukc8gtd2tx, s-qqs2svksmjct753, s-nk8td3ez58gahc4 and the removal s-h5rfyy9j8nnhx62.
- **Ready with nits only:** s-yhe32vrbygjyd66 and s-9rtrj24myzjvshu. s-c2r9jndrjbtbsv6 is also ready once its two uncited links are removed.
- **Not ready:**
  - s-g7auhqvzzbkw644: the first-node exception;
  - s-33fw3ga4ctd94dq: the Python shebang and paragraph 8;
  - s-u6mj5yv8ngnz79v: `$comment` as a whole;
  - s-j4t9vusnsajmqdw: the file's path, the row in s-zefk589ykh37b8u, and paragraph 2;
  - s-suv42g8r3ra2h6b: the doubt on paragraph 4.

Files read: `D:/SpecSheriff/.ai_docs/t25-pass/review-input-fo2.md`, `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/base-questions.md`, `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_schema/extensions/recordtype.schema.json`, `D:/SpecSheriff/skills/tools/src/types.ts`.

Sources:
- [JSON Schema 2020-12 Core](https://json-schema.org/draft/2020-12/json-schema-core)
- [RFC 8141, Uniform Resource Names](https://www.rfc-editor.org/rfc/rfc8141)
