I loaded the skill `specsheriff-terminology-review` and ran the checklist. All four drafts are **not ready**. Each one needs fixes the author can make, and rule 9.4 also has one question for the owner.

**Checklist.** The columns are: **A** `new:tools-7-2-changed-line` · **B** `s-2x58az67bm6cxq2` · **C** `proposal:s-9j2mmnuuwmx5ksn` · **D** `proposal:s-kgbzk2ph9e6jfb4`

| Rule | A | B | C | D |
|---|---|---|---|---|
| 1.2.3 Text and reason | ✓ | ✓ | ✓ | ✓ |
| 7.1 Goal, reader, scope | ✗ the first sentence compares "a file bound as a whole by their syntax trees", but the last sentence compares some of these files by their text | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 Order of the text | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✗ "the kind of each of its nodes": the specification already uses "node" and a node's `kind` for other things | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words from the specification | ✗ "a file bound as a whole" is cited at its second use, not its first | ✓ | ✓ | ✓ |
| 7.3.1 Title | ✓ | ✓ | ✗ "A change to a SpecTag" covers only the first sentence | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 Contents of a node | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 Reason | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 Sentence length | ✗ "a first line of the file" | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✗ "deletes one line … so the two versions give different syntax trees" is false for a blank line or a comment line | ✓ | ✓ |
| Pairing test | ✓ | ✓ | ✓ | ✓ |

The fixes from round e are all in place, word for word. The two rejections ("Provided that", "ignore") are justified.

---

### A. `new:tools-7-2-changed-line` (s-u6mj5yv8ngnz79v): not ready

**Оценка**
- согласованность ✓ — решение от 2026-11-24, решение по 9.4 от 2026-11-11 (переименование меняет код), 9.4 в предложении группы, s-33fw3ga4ctd94dq, s-5qdjyf6t898rsd4, s-trwczfskj5zmuft.
- целостность ✗ — первое предложение сравнивает по деревьям каждый файл, привязанный целиком, а последнее сравнивает часть таких файлов по тексту. s-7vpsdsy8dpqdy6r опирается на узел верно.
- целесообразность ✓ — сравнение деревьев проще прежних серий строк и само решает, какие пробельные символы значимы.
- избыточность ✓ — не найдено.
- недостаточность ✗ — не сказано, как сравнивать версию с синтаксической ошибкой. Абзац о дереве не называет вложенность, а на ней держится пример с YAML.

**Findings**
1. **WORDING FIX (author).** This fixes 7.1, 7.2.7 and the misreading "bound … by their syntax trees". Replace the first two sentences with:
   - EN: "Where the SpecSheriff tools have a grammar of a file's language, they compare two versions of a symbol or a file bound as a whole (§s-kgbzk2ph9e6jfb4), or of a test (§s-zrsc6asgmhv8tnc), by their syntax trees. They parse each version with the tree-sitter grammar of that language."
   - RU: «Где у инструментов SpecSheriff есть грамматика языка файла, они сравнивают две версии символа или файла, привязанного целиком (§s-kgbzk2ph9e6jfb4), или теста (§s-zrsc6asgmhv8tnc) по их синтаксическим деревьям. Каждую версию они разбирают грамматикой tree-sitter для этого языка.»
   - The `implements` link to rule 9.4 stays, so dropping its citation from this sentence breaks nothing.
2. **WORDING FIX and TERM (author).** Paragraph 2 leaves out nesting. A reader who compares only kinds and tokens makes exactly the mistake that example 3 describes. "Node" and "kind" already have other meanings in the specification; "construct" is free.
   - EN: "A syntax tree holds the kind of each construct of the code, how the constructs nest, and the text of each token, such as an identifier or a literal."
   - RU: «Синтаксическое дерево содержит вид каждой конструкции кода, вложенность конструкций друг в друга и текст каждого токена, например идентификатора или литерала.»
3. **WORDING FIX (author), for 7.5.2.** Write "each comment, other than the file's first line where it opens with `#!`;". The Russian stays as it is.
4. **DOUBT (author or coordinator).** tree-sitter returns a tree even for a version with errors, such as a Helm template saved as `.yaml` or Jinja inside `.sql`. In such a tree the nesting can be lost, so a re-indented key would pass as unchanged (inference). Add before "In any other file":
   - EN: "Where the grammar finds a syntax error in either version, the two versions differ where their text differs."
   - RU: «Если грамматика находит синтаксическую ошибку хотя бы в одной из двух версий, версии различаются, если различается их текст.»

### B. `s-2x58az67bm6cxq2`: not ready

**Оценка**
- согласованность ✓ — 9.4 и 1.5.2 в предложениях группы, решения по 9.4 от 2026-11-10 и 2026-11-11, s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c, s-w93jfnqynfa47pf.
- целостность ✗ — «дают разные синтаксические деревья» не охватывает файлы, которые s-u6mj5yv8ngnz79v сравнивает по тексту.
- целесообразность ✓ — одно определение для всех проверок коммита.
- избыточность ✓ — не найдено.
- недостаточность ✗ — «строка, которую коммит добавляет» больше нигде не определена. Её определяет сравнение git, а оно зависит от настроек `diff.algorithm` и `diff.indentHeuristic` на машине. Это расходится с принципом «Deterministic checks hold every participant to the contract».

**Findings**
5. **WORDING FIX (author).** Rewrite the first two sentences of paragraph 3, so that they also cover files compared by text:
   - EN: "A commit changes a symbol, a test or a file bound as a whole where its two versions differ (§s-u6mj5yv8ngnz79v). A symbol or a test runs from its first line to its last, including its decorators."
   - RU: «Коммит меняет символ, тест или файл, привязанный целиком, если две его версии различаются (§s-u6mj5yv8ngnz79v). Символ или тест занимает строки от своей первой до последней, включая его декораторы.»
6. **DOUBT (author).** Round f dropped round e's wording on how git compares the files. Restore it at the end of paragraph 1:
   - EN: "A line that the commit adds or removes is one that git shows as added or removed when it compares the two versions of the file with the Myers algorithm, git's default, whatever git's settings on the machine."
   - RU: «Строка, которую коммит добавляет или удаляет, — это строка, которую git показывает добавленной или удалённой, когда сравнивает две версии файла алгоритмом Майерса, принятым в git по умолчанию, при любых настройках git на машине.»
7. **WORDING FIX (author), for 7.6.3.** Write "deletes the line `log(id);` inside the function `close`" / «удаляет строку `log(id);` внутри функции `close`».
8. **WORDING FIX (author).** "the one of the same name" leaves open how nested symbols with the same name are paired, such as `A.close` and `B.close`. Write "the one with the same name, nested in symbols with the same names," / «тот, что с тем же именем и вложен в символы с теми же именами,».
9. The node's list of removed sentences still calls s-u6mj5yv8ngnz79v by its old title, "A line that changes the code".

### C. `proposal:s-9j2mmnuuwmx5ksn`: not ready, waiting for the owner's answer on the title

**Оценка**
- согласованность ✓ — решение от 2026-11-24, принцип в редакции от 2026-11-24, решения от 2026-11-10, 2026-11-11 и 2026-11-17.
- целостность ✓ — s-u6mj5yv8ngnz79v, s-2x58az67bm6cxq2, предложение по 1.5.2 и s-7vpsdsy8dpqdy6r опираются на узел верно.
- целесообразность ✓ — снимает противоречие между 9.4 и 1.5.2.
- избыточность ✓ — не найдено.
- недостаточность ✓ — не найдено.

**Findings**
10. **DOUBT (owner).** The owner chose the title on 2026-11-11, for a narrower text. The node now also covers whitespace and files whose comments cannot be told apart from their code, and neither concerns a SpecTag. Proposed title: "Which edits change a test or code" / «Какие правки меняют тест или код».

### D. `proposal:s-kgbzk2ph9e6jfb4`: not ready

**Оценка**
- согласованность ✗ — пояснение «правка комментария» шире, чем 9.4. В файле, привязанном SpecTag в начале, эти SpecTag стоят в комментарии, и их правка по 9.4 меняет код.
- целостность ✓ — ссылка на s-qzthyh7yqvfhsa2 восстановлена. Сверено с s-5qdjyf6t898rsd4, s-trwczfskj5zmuft и s-2x58az67bm6cxq2.
- целесообразность ✓ — без исключения правило противоречило бы 9.4.
- избыточность ✓ — исключение кратко повторяет 9.4, но без него два правила противоречат друг другу.
- недостаточность ✓ — не найдено.

**Findings**
11. **WORDING FIX (author).** Narrow the exception to what rule 9.4 allows:
    - EN: "…(§s-9j2mmnuuwmx5ksn): an edit to a comment that leaves its SpecTags as they are, or to whitespace that does not affect what the code does."
    - RU: «…(§s-9j2mmnuuwmx5ksn): правка комментария, оставляющая его SpecTag прежними, или пробельных символов, не влияющих на то, что делает код.»
12. **Agreed sentence: the author drafts it and the owner accepts it with the group.** Since the node is changing, the rule "Code other than tests is referred to in plain words" in `.claude/vt/rules.md` now requires rewording its first sentence:
    - EN: "The system's code (§s-hheus6f395ynqvc) other than tests is bound…"
    - RU: «Код системы (§s-hheus6f395ynqvc) помимо тестов привязан…»
    - The `change` field must list this rewording. It should also say «Добавлено одно предложение» instead of «Изменено».

**Only the owner can answer:** finding 10, the title of rule 9.4. Finding 12 changes an agreed sentence, so it also needs the owner's acceptance on the group's page.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.claude/vt/rules.md` (line 425), `D:/SpecSheriff/skills/tools/src/diff.ts` (line 49: `git diff` runs with no diff algorithm given, so it follows each machine's settings)
