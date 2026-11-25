# Review of round e, group 3: four drafts in review-input-g3e-a.md

Two of the four drafts are ready. "A line that changes the code" and the proposal for rule 1.5.2 are not. The skill `specsheriff-terminology-review` was loaded. No term needs a new gloss.

Verdicts and findings:

**proposal:s-9j2mmnuuwmx5ksn — ready.** No findings.

**s-2x58az67bm6cxq2 — ready.** Its paragraph 3 changes only if fix 1 below is adopted.

**new:tools-7-2-changed-line — not ready.**

1. **Author can fix.** Two problems share one fix.
   - "Where the two runs hold different numbers of lines, every line of both runs changes the code" contradicts rule 9.4 and the ruling. Re-wrapping `foo(a, b, c);` onto five lines changes nothing: the installed tree-sitter-javascript gives the same tree for both versions. The draft still counts it as a change.
   - "such as the indentation of a line in Python or YAML" leaves open which whitespace counts (the brief's choice 2). An agent would have to ask. Comparing tokens also misses whitespace that is itself syntax:
     - `return x;` against `return⏎x;` gives the same tokens and a different tree (checked);
     - `div.x` against `div .x` in CSS, and `a=b` against `a = b` in Bash (inference).
   - **Fix:** compare syntax trees. The runs, the pairing and the whitespace bullet then go. Redraft both nodes around this sentence, then send them to a fresh review:
     - "A commit changes a symbol, a test or a file bound as a whole where the grammar gives its two versions different syntax trees, comments and a test's name other than its SpecTag left out."
     - «Коммит меняет символ, тест или файл, привязанный целиком, если грамматика даёт двум его версиям разные синтаксические деревья; комментарии и название теста, кроме его SpecTag, не учитываются.»
2. **Author can fix, if lines are kept.** A blank line inside a string literal holds part of that literal, so removing one changes the code. Write "such as a blank line outside a string literal" / «например пустую строку вне строкового литерала».
3. **Author can fix.** A shebang is a comment, so a commit that changes the interpreter passes. Write "they leave out comments, other than a first line opening with `#!`;" / «опускают комментарии, кроме первой строки, начинающейся с `#!`;».

The brief's choice 1 holds: naming the formats by extension is the right home. A description of YAML would make s-5qdjyf6t898rsd4 and s-9rtrj24myzjvshu refuse the SpecTags of a YAML file.

**proposal:s-kgbzk2ph9e6jfb4 — not ready.**

4. **Author can fix.** Keep the `cites` link to s-qzthyh7yqvfhsa2. The node's decision of 2026-11-04 cites it, and validate.ts:141 refuses a citation that has no link. The proposal for rule 10.4 also drops two links that its decisions cite.

Findings that only the owner can answer: none.

---

### proposal:s-9j2mmnuuwmx5ksn
1.2.3 A rule is made of its text and its reason ✓
7.1 The goal, the reader and the scope ✓
7.2.1 Who must act ✓
7.2.2 The order of the text ✓
7.2.3 General words ✓
7.2.4 Naming ✓
7.2.4.1 Coined names ✓
7.2.4.2 What a name says ✓
7.2.4.3 A general word in a name ✓
7.2.4.4 Properties ✓
7.2.4.5 Relations to other entities ✓
7.2.5 Definition by negation ✓
7.2.6 Lists that restrict ✓
7.2.7 Words that take their meaning from the specification ✓
7.3.1 The title ✓
7.3.2 Thoughts and sentences ✓
7.3.3 The contents of a node ✓
7.4.1 Counts in prose ✓
7.4.2 The reason ✓
7.5.1 Superfluous rules ✓
7.5.2 The length of a sentence ✓
7.5.3 Rules as tables ✓
7.6.1 The language of the specification ✓
7.6.2 Capital letters ✓
7.6.3 Examples ✓
Pairing test of the reason ✓

«Оценка»
- согласованность ✓ — решение от 2026-11-24, принцип «Deterministic checks hold every participant to the contract», решения по 9.4 от 2026-11-10, 2026-11-11 и 2026-11-17, s-5z5gnu7pahr82xp.
- целостность ✗ — s-u6mj5yv8ngnz79v засчитывает перенос строк в TypeScript как изменение кода вопреки третьему пункту списка. Исправляется в s-u6mj5yv8ngnz79v, сам 9.4 не меняется. Узлы s-2x58az67bm6cxq2, s-kgbzk2ph9e6jfb4, s-7vpsdsy8dpqdy6r и строки 10.1.28a, 10.1.40 держатся.
- целесообразность ✓ — названо противоречие 9.4 и 1.5.2 для файла, привязанного целиком. Его снимают один список и правило по умолчанию.
- избыточность ✓ — не найдено (сравнивал с s-kgbzk2ph9e6jfb4 и s-u6mj5yv8ngnz79v).
- недостаточность ✓ — не найдено.

### s-2x58az67bm6cxq2
1.2.3 ✓ · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test ✓

«Оценка»
- согласованность ✓ — 9.4 и 1.5.2 в предложениях группы, s-5qdjyf6t898rsd4, s-trwczfskj5zmuft, s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c, s-3xx2eukc8gtd2tx.
- целостность ✓ — новое предложение верно опирается на s-u6mj5yv8ngnz79v. Если там примут сравнение деревьев, изменится абзац 3.
- целесообразность ✓ — без него правка комментария в файле, привязанном целиком, меняла бы код.
- избыточность ✓ — не найдено.
- недостаточность ✓ — не найдено. Строка вне символов — открытый пункт 10 группы 2.

### new:tools-7-2-changed-line
1.2.3 ✓
7.1 ✗ "where the file's language gives whitespace a meaning, such as the indentation of a line in Python or YAML": a reader cannot apply it without asking.
7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test ✓

«Оценка»
- согласованность ✗ — правило «разное число строк — код меняет каждая строка» противоречит 9.4 и решению от 2026-11-24 для переносов строк.
- целостность ✓ — выбор расширений файлов вместо описаний согласован с s-33fw3ga4ctd94dq, s-5qdjyf6t898rsd4, s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c и s-zrsc6asgmhv8tnc. Узлы s-7vpsdsy8dpqdy6r и s-2x58az67bm6cxq2 опираются на него верно.
- целесообразность ✗ — проще и точнее сравнивать синтаксические деревья: отпадают серии, пары и перечень значимых пробельных символов (вывод).
- избыточность ✓ — не найдено.
- недостаточность ✗ — не сказано, какие пробельные символы значимы, а также не решены пустая строка внутри строкового литерала и шебанг.

### proposal:s-kgbzk2ph9e6jfb4
1.2.3 ✓ · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test ✓

«Оценка»
- согласованность ✓ — 9.4 в предложении группы, решения от 2026-11-17 и 2026-11-24.
- целостность ✗ — снятая ссылка `cites` на s-qzthyh7yqvfhsa2 нужна: её цитирует решение узла от 2026-11-04, и без неё `sheriff validate` отвергнет узел.
- целесообразность ✓ — противоречие с 9.4 снято одним предложением.
- избыточность ✓ — исключение кратко повторяет 9.4, но без него два правила противоречат друг другу.
- недостаточность ✓ — не найдено.

Files:
- The drafts: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`
- The citation check: `D:/SpecSheriff/skills/tools/src/validate.ts` (line 141) and `D:/SpecSheriff/skills/tools/src/model.ts` (the function `citations`)
- The script behind the "(checked)" claims about the syntax tree: `C:/Users/PC/AppData/Local/Temp/claude/a0dc34c442b04427/ff0169d8-4f54-448d-935e-3651d0703a36/scratchpad/asi.mjs`
