# Third review of base-questions.md, part B: the report

# Third review of base-questions.md, part B (sections 3 to 5, and the second row of table 11.3 in proposal 2.9)

The skill was already in context. I ran `node .claude/vt/writing-rules.mjs` myself, and I edited no file.

## Checklist

These lines cover every new wording in sections 3 to 5 and the second row of table 11.3.

- **1.2.3 A rule is made of its text and its reason:** ✓
- **7.1 The goal, the reader and the scope:** ✗
  - 4.2, the new row: it does not say whether the first top-level node of a file named after a folder must match a section itself, or whether its title starts the path of titles ("the titles of the sections that hold it, from the top down … the first top-level node represents that folder").
  - 2.9, the second row of table 11.3: "every such node is in one domain" can be read as "each node is in some domain".
- **7.2.1 Who must act:** ✓
- **7.2.2 The order of the text:** ✓
- **7.2.3 General words:** ✓
- **7.2.4 Naming:** ✓
- **7.2.4.1 Coined names:** ✓
- **7.2.4.2 What a name says:** ✓
- **7.2.4.3 A general word in a name:** ✓
- **7.2.4.4 Properties:** ✓
- **7.2.4.5 Relations to other entities:** ✓
- **7.2.5 Definition by negation:** ✓
- **7.2.6 Lists that restrict:** ✓
- **7.2.7 Words that take their meaning from the specification:** ✗ The second row of table 11.3 says "the part of the technical appendix named after that domain" with no citation. The Domains rule cites rule 4.1 (§s-vj7ercem526zd6v) for the same phrase.
- **7.3.1 The title:** ✓ (rule 10.10's new title fits both of its paragraphs)
- **7.3.2 Thoughts and sentences:** ✗ In 3.2, the second item says "Until the person confirms them, it works with defaults, and the SpecSheriff tools name each default in every run that uses it". That puts two facts side by side. The wording is mine, from round b.
- **7.3.3 The contents of a node:** ✓
- **7.4.1 Counts in prose:** ✓
- **7.4.2 The reason:** ✓
- **7.5.1 Superfluous rules:** ✓
- **7.5.2 The length of a sentence:** ✓
- **7.5.3 Rules as tables:** ✓
- **7.6.1 The language of the specification:** ✓
- **7.6.2 Capital letters:** ✓
- **7.6.3 Examples:** ✓
- **Pairing test:** ✓

## Оценка

**3.1**
- согласованность ✗ удаление снимает выбор расширений, хотя правило 1.7.6 (s-j8y62pa9hzz6nwx) оставляет расширение выбранным, пока от него зависит узел; после повторной настройки схема собирается без них (5.1, s-xzcw3hv4hmxz7h7), а строка «Риск» говорит только о черновике
- целостность ✗ «Проблема» утверждает, что s-ttsc8tpnu46q53s ссылается на правило 2.5 только ради строки 10.1.23; на деле его единственная связь `implements` ведёт к s-m4h279nbaqkpa3t
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**3.2**
- согласованность ✓ (s-tnz9zgqx8c629a7, решение от 2026-11-02, s-kq6wmdud9c7j2k9)
- целостность ✓
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**3.3, 3.4, 3.7, 3.8, 4.1, 4.3, 4.7:** все пять ✓. Раунд c внёс только замечания второго ряда; сравнено с узлами, названными в review2-bq-b.md, а для 4.1 ещё с s-f5brvuuu6xmkj6t.

**3.5**
- согласованность ✗ связь `cites` с s-z3dnru6qqdf9m6j рядом с уже имеющейся связью `checks` запрещают правило 6.1 (s-sn6au3vcr9uy5pm) и строка 10.1.13
- целостность ✓
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**3.6**
- согласованность ✓
- целостность ✗ вторую строку нельзя проверить схемой расширения: есть ли у RecordType варианты, видно только по другим узлам (s-c2r9jndrjbtbsv6)
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**4.2**
- согласованность ✗ связь `cites` с s-vj7ercem526zd6v рядом со связью `checks` (правило 6.1, строка 10.1.13)
- целостность ✗ строка не говорит того, что говорит пункт 42 (s-gvafe6bnstwab8b): первый узел файла, названного по домену, ни с чем не сопоставляется, и путь заголовков начинается ниже него
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**4.4**
- согласованность ✓
- целостность ✗ при Б строка 10.1.26 по-прежнему требует для кода верхнего уровня «SpecTags at the file's start», а правило 1.5.2 при Б привязывает его через свойство для комментария объекта верхнего уровня
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**4.5**
- согласованность ✗ новая строка ссылается на s-hheus6f395ynqvc без связи `cites` (правило 6.3, строка 10.1.13)
- целостность ✓
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**4.6**
- согласованность ✗ (вывод) правило 3.2 в редакции 2.9 разрешает расширению лишь «позволить» части определять термины; правило Domains при Б этого требует и отвергает такой термин в контрактах; правило 1.7.2 требует, чтобы правило расширения не противоречило правилу 3.2
- целостность ✓
- целесообразность ✓ (решение от 2026-11-12)
- избыточность ✓
- недостаточность ✓

**Вторая строка таблицы 11.3**
- согласованность ✓ (правило Domains из 2.9, первая новая строка, 11.1.5)
- целостность ✓ (с первой строкой пересекается только там, где нарушены оба предложения правила)
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**Раздел 5:** все пять ✓.

---

## Verdict: the part passes after the fixes below

As in round b, the per-item format of the brief takes priority over the 300-word limit.

**How round c was handled.** Every finding of my earlier report was applied. The two rejections hold: the nit on a project's own kind, and the doubt on 3.1 that the brief settles. The change of 4.6 to B holds. The author's concern about the second row of table 11.3 is resolved. The row's "at least one node" matches the natural reading of the rule, whose "that domain" assumes that some node cites the term. Round c introduced four new defects: the sentence on `spec-init` in 3.1, the `cites` link in 4.2, the word "each" in 3.6, and my own sentence in 3.2.

### 3.1 — not ready
- **WORDING FIX (author).** In "The problem", replace the round-c sentence on the two skills with this (English only):
  > "The agreed node on the skill `spec-remove` (s-jn3rauw6a8zeefn) links to rule 2.5 only because the agreed row 10.1.23 requires an `implements` link to some rule (group 8's base question 2; the item in "Found and owed" from group 6). The agreed node on the skill `spec-init` (s-ttsc8tpnu46q53s) runs `sheriff init`, but its only `implements` link goes to the rule on what the reviewer judges (s-m4h279nbaqkpa3t), since it asks for the reviewer's settings."
- **Author (inference).** The risk line leaves out the extensions. `sheriff init` writes a `sheriff.config.json` that holds only `code` and `tests` (s-7unxytshhc4md54). Add these sentences after the risk line's first sentence:
  - EN: "Running the setup again also leaves no extension chosen, although rule 1.7.6 keeps an extension chosen while a node depends on it. Until an owner chooses each such extension again (rule 1.7.5), `sheriff validate` refuses every node of a kind that the extension adds, since the schema is composed only from the chosen extensions (rule 5.1)."
  - RU: «После повторной настройки не выбрано и ни одно расширение, хотя правило 1.7.6 оставляет расширение выбранным, пока от него зависит узел. Пока ответственный снова не выберет каждое такое расширение (правило 1.7.5), `sheriff validate` отвергает каждый узел того типа, который это расширение добавляет, так как схема собирается только из выбранных расширений (правило 5.1).»
  - Add to the summary line: «…и не выбирает расширений, так что узлы их типов отвергаются, пока ответственный их снова не выберет.»

### 3.2 — not ready
- **WORDING FIX (author).** Split the last sentence of the second item into two:
  - EN: "Until the person confirms them, it works with defaults. The SpecSheriff tools name each default in every run that uses it."
  - RU: «Пока человек их не подтвердил, агент работает со значениями по умолчанию. Инструменты SpecSheriff называют каждое такое значение в каждом запуске, который его использует.»

### 3.5 — not ready
- **Author.** Replace "Both rows gain a `cites` link to s-z3dnru6qqdf9m6j" with: "Both rows already have a `checks` link to s-z3dnru6qqdf9m6j, which serves for the new citation, so no link is added." Row 10.1.13 refuses a `cites` link beside a link of another type. This defect was already there in round b, and I missed it.

### 3.6 — not ready
- **Author.** Replace ", and each checked through the schema of the RecordType extension, as s-dk3zfkbhc3v6xbp checks `enum`" with: ". The first is checked through the schema of the RecordType extension, as s-dk3zfkbhc3v6xbp checks `enum`, since a variant names its values in its own `answersTo`. The second is checked by `sheriff validate` with the variants that s-c2r9jndrjbtbsv6 finds, since only other nodes show whether a RecordType has variants".
- **Nit.** The title covers only the first row.

### 4.2 — not ready
- **WORDING FIX (author).** Rewrite the new row so that it agrees with item 42:
  - EN: "Every section of the technical appendix (§s-tj38pvm38nepaf5), other than the section for the stack, the technical debt section (§s-vj7ercem526zd6v) and the first top-level node of a file named after a folder of the base specification (§s-5x737t9nee4zgaa), has the same path of titles as a section of the base specification (§s-qmmzf9nksfsa3qp): the titles of the sections that hold it, from the top down, followed by its own. In such a file, the path of titles starts below the first top-level node, which represents that folder, and the section of the base specification with the same path of titles is in that folder"
  - RU: «У каждого раздела технического приложения (§s-tj38pvm38nepaf5), кроме раздела стека, раздела технического долга (§s-vj7ercem526zd6v) и первого узла верхнего уровня файла, названного по папке базовой спецификации (§s-5x737t9nee4zgaa), тот же путь заголовков, что и у раздела базовой спецификации (§s-qmmzf9nksfsa3qp): заголовки разделов, которые его содержат, сверху вниз, а за ними его собственный. В таком файле путь заголовков начинается ниже первого узла верхнего уровня, который представляет эту папку, а раздел базовой спецификации с тем же путём заголовков находится в этой папке | отвергается»
- **Author.** In row 11.3.5, drop "with a `cites` link to s-vj7ercem526zd6v". The row's `checks` link to that node already serves for the citation.
- **Nit.** §s-5x737t9nee4zgaa is rule 1.1.4, which says nothing of folders. The agreed rule 8.5 cites it in the same way.

### 4.3 — ready (nit)
- "in one of the following ways" introduces clauses that apply together. Better: "as follows (§s-kgbzk2ph9e6jfb4):" (RU «следующим образом»).

### 4.4 — not ready
- **Author.** Under B, row 10.1.26 must also change its second clause:
  - EN: "the code of the same file outside every symbol, other than imports, by SpecTags at the file's start or, in a file whose format allows no comments, in the comment property of the file's top-level object;"
  - RU: «код того же файла вне всех символов, кроме импортов, — SpecTag в начале файла или, в файле, формат которого не допускает комментариев, в свойстве для комментария объекта верхнего уровня этого файла;»
  - Add a `change` field for the row: «Для файла без комментариев добавлена привязка SpecTag в свойстве для комментария: у символа и у объекта верхнего уровня.»
- **Nit.** "Nodes concerned" under B leaves out s-h5rfyy9j8nnhx62, s-suv42g8r3ra2h6b and s-dbk2vyeg8z5jxna.

### 4.5 — not ready
- **Author.** Add a `cites` link to s-hheus6f395ynqvc to the new row.
- **Nit.** In the new risk sentence, the second "which" is ambiguous. Split it: "…its tests. The ruling of 2026-11-17 extended that only to the repository's own tools and their tests."

### 4.6 — not ready
- **Author (inference).** Under B, the second sentence of rule 3.2 in proposal 2.9 changes:
  - EN: "…may instead require one of the parts into which the base specification is divided (§s-qmmzf9nksfsa3qp) to define the terms that, within the base specification, only that part needs."
  - RU: «…может вместо этого требовать, чтобы одна из частей, на которые разделена базовая спецификация (§s-qmmzf9nksfsa3qp), определяла термины, которые в базовой спецификации нужны только этой части.»
  - Also add rule 3.2 to "Nodes concerned".
  - 2.9's note on A must say that rule 3.2 then keeps "let … define".
  - "Reason for A" then begins: "Under A, rule 3.2 only lets an extension allow a part to define its terms, so a term in the contracts section is never wrong…".
- **Nit (summary).** «так говорит ваше решение» should be «так следует из вашего решения».

### The second row of table 11.3 (2.9) — not ready
- **WORDING FIX (author).** The Russian uses «ссылаются» with a singular subject, «хотя бы один узел».
  - EN: "A term node that at least one node cites or links to, where each such node is in one and the same domain or in the part of the technical appendix named after that domain (§s-vj7ercem526zd6v), is in that domain"
  - RU: «Узел-термин, на который ссылается или с которым связан хотя бы один узел, причём каждый такой узел находится в одном и том же домене или в части технического приложения, названной по этому домену (§s-vj7ercem526zd6v), находится в этом домене | отвергается»
  - Add a `cites` link to s-vj7ercem526zd6v. The first row, in part A, needs the same citation.
- **For part A.** Row 10.1.6 already has a `checks` link to s-ypa92gpcj3f5zj8, so adding a `cites` link beside it breaks row 10.1.13.

### Section 5 — ready
- **Nit (summary 3.6).** «не пишет … `additionalProperties` и `unevaluatedProperties`» should be «ни …, ни …».

**TERM:** nothing new.

**Should not reach the owner at all:** none.

**Ready:** 3.3, 3.4, 3.7, 3.8, 4.1, 4.3, 4.7, and dropped items 1 to 15.

The file I reviewed, unchanged: `D:/SpecSheriff/.ai_docs/t25-pass/base-questions.md`. I compared it with `D:/SpecSheriff/.ai_docs/t25-pass/base-questions.before-c.md`.
