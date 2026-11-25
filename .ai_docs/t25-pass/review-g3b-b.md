# Group 3, confirming review: s-2x58az67bm6cxq2, changed-line, draft-rule, proposal:s-9j2mmnuuwmx5ksn

Only "A line that changes the code" is ready. The other three drafts each need small fixes from the author, and Q1 needs one addition. Every fix from review B is in place, word for word or with a stated reason that holds. The sentences that round b wrote in the author's words all match their Russian.

Columns: **2X** s-2x58az67bm6cxq2 · **CL** new:tools-7-2-changed-line · **DR** new:tools-7-2-draft-rule · **94** proposal:s-9j2mmnuuwmx5ksn

| Rule | 2X | CL | DR | 94 |
|---|---|---|---|---|
| 1.2.3 | ✓ | ✓ | ✓ | ✓ |
| 7.1 | ✗ the paragraph "A commit changes a symbol … where one of its lines changes the code" comes seven paragraphs before "changes only … both … hold", so a reader takes an added symbol as changed | ✓ | ✓ | ✗ "in code bound by a SpecTag before each symbol" leaves open a comment outside the symbols of such a file |
| 7.2.1–7.2.6 (all sub-rules) | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 | ✓ | ✓ | ✗ "each symbol" has no citation | ✗ "A change to a SpecTag": SpecTag has no citation at its first use (agreed sentence) |
| 7.3.1 | ✗ the title says "changes", but the node also defines what a commit adds, removes and leaves unchanged | ✓ | ✓ | ✓ |
| 7.3.2–7.6.3 | ✓ | ✓ | ✓ | ✓ |
| Pairing test | ✓ | ✓ | ✓ | ✓ |

## s-2x58az67bm6cxq2 — not ready

1. **Author.** The first sentence of the reason is false: s-3xx2eukc8gtd2tx and s-8wp7xm7g3u8gscq also judge code and tests that a commit leaves unchanged. Replace the reason with:
   - EN: "The checks of a commit judge code and tests according to whether the commit adds, changes, removes or leaves them unchanged. A single definition of each of these lets every check judge the same code and tests in the same way."
   - RU: «Проверки коммита оценивают код и тесты в зависимости от того, добавляет ли их коммит, меняет, удаляет или оставляет неизменными. Единое определение каждого из этих случаев позволяет каждой проверке одинаково оценивать одни и те же код и тесты.»
2. **Author.** The node does not say that a test's lines include its decorators. Without that, adding `@pytest.mark.skip` to a test changes no test, so row 10.1.41 never applies. The code already includes them (`D:/SpecSheriff/skills/tools/src/code.ts:249`). Replace the sentence on a symbol's lines with:
   - EN: "The lines of a symbol or a test run from its first line to its last, including its decorators."
   - RU: «Строки символа или теста идут от его первой строки до последней, включая его декораторы.»
3. **Author.** Move the paragraph "A commit changes only the symbols, files bound as a whole and tests that both…" so that it follows the first paragraph. The text does not change.
4. **Author.** Change the title:
   - EN: "What a commit adds, changes and removes in the code and the tests"
   - RU: «Что коммит добавляет, меняет и удаляет в коде и тестах»

**Оценка**
- согласованность: ✗ первое предложение обоснования неверно: s-3xx2eukc8gtd2tx и s-8wp7xm7g3u8gscq оценивают и неизменённое. Пробельные символы в файле, привязанном целиком, засчитываются вопреки решению 2026-11-11 (см. Q1). Сверено также с s-kgbzk2ph9e6jfb4, предложением по 9.4, s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c, s-rd9nftptjuz6bwv; принципы ✓.
- целостность: ✓ s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c, s-8wp7xm7g3u8gscq, s-3xx2eukc8gtd2tx, s-rd9nftptjuz6bwv читаются верно; s-w93jfnqynfa47pf получает «удаляет».
- целесообразность: ✓ одно определение для `sheriff binding`, `sheriff review`, `sheriff commit-message`.
- избыточность: ✓
- недостаточность: ✗ строки теста без его декораторов (строка 10.1.41, s-c4y63t285gg7jz7). С 2026-11-17 открыт вопрос о строке кода вне всякого символа и теста.

## new:tools-7-2-changed-line — ready

No findings.

**Оценка**
- согласованность: ✓ 9.4 и решения 2026-11-11 (пробелы, отступ Python, переименование), s-33fw3ga4ctd94dq, s-zrsc6asgmhv8tnc, принцип детерминированных проверок.
- целостность: ✓ s-2x58az67bm6cxq2, s-utf4mbt7ref8g9c.
- целесообразность: ✓ решение 2026-11-11.
- избыточность: ✓
- недостаточность: ✓

## new:tools-7-2-draft-rule — not ready

1. **Author.** "symbol" needs a citation at its first use, as the group's own list of citations requires. Add a `cites` link to s-kgbzk2ph9e6jfb4, and write:
   - EN: "It also names each symbol (§s-kgbzk2ph9e6jfb4) and each test concerned, …"
   - RU: «Он называет также каждый затронутый символ (§s-kgbzk2ph9e6jfb4) и тест …»

**Оценка**
- согласованность: ✓ принцип «Nothing unapproved is implemented», 1.3.2 (s-utvqbypzhmgndug) и его пример, строка 10.1.28a (решения 2026-11-13, 2026-11-17), строка 10.1.41 (решение 2026-11-20), s-5z5gnu7pahr82xp.
- целостность: ✓ s-2x58az67bm6cxq2, s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c, s-8wp7xm7g3u8gscq.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓ (метка пропуска — через поправку 2 к s-2x58az67bm6cxq2)

## proposal:s-9j2mmnuuwmx5ksn — not ready

1. **Author.** Write the narrowed scope in the words of rule 1.5.2. The same change goes into Q1's option A, on the Russian page as well.
   - EN: "…rewording the comments in the tests or in a file whose symbols the checks can identify (§s-kgbzk2ph9e6jfb4)…"
   - RU: «…комментариев в тестах или в файле, символы которого проверки могут определить (§s-kgbzk2ph9e6jfb4)…»
2. **Owner (agreed sentence).** Cite SpecTag at its first use, "A change to a SpecTag (§s-8xw4mgvpexyvw5q)", and add the matching link. Rule 7.2.7 requires this.
3. **Owner.** Add an example:
   - EN: "A commit rewords a comment inside a function bound by a SpecTag directly above it, and changes nothing else, so it does not change the function. But not: a commit that rewords a comment in a stylesheet bound by SpecTags at its start leaves the stylesheet unchanged."
   - RU: «Коммит переформулирует комментарий внутри функции, привязанной SpecTag непосредственно над ней, и больше ничего не меняет, поэтому функцию он не меняет. Но не так: коммит, который переформулирует комментарий в таблице стилей, привязанной SpecTag в начале файла, оставляет таблицу стилей неизменной.»

**Оценка**
- согласованность: ✓ снимает противоречие с 1.5.2 (s-kgbzk2ph9e6jfb4); сверено с решениями по 9.4 (2026-11-10, 2026-11-11, 2026-11-17), s-2x58az67bm6cxq2, s-u6mj5yv8ngnz79v, s-33fw3ga4ctd94dq; сужение решения 2026-11-11 и есть Q1.
- целостность: ✓ при A других изменений не нужно; при B или C изменения перечислены в заметках.
- целесообразность: ✓ реальное противоречие двух согласованных правил, наименьшая правка.
- избыточность: ✓
- недостаточность: ✗ комментарий вне символов такого файла (описание рядом с SpecTag, уровень модуля) не охвачен; s-u6mj5yv8ngnz79v опускает оба.

## Q1

- **Only the owner can answer it: holds.** Rules 9.4 and 1.5.2 are both agreed, and both were confirmed on 2026-11-17.
- **Put in terms of what a person sees: holds.**
- **The drafts agree with Q1: holds.** s-2x58az67bm6cxq2 and its example 2, s-u6mj5yv8ngnz79v and the 9.4 proposal all follow answer A.
- **The costs: one is missing (author).** Under A, s-2x58az67bm6cxq2 also counts an edit that only changes whitespace. On 2026-11-11 the owner ruled that spacing within a line is not counted. Fix:
  - Name that ruling among the rulings searched first.
  - In the question and in option A, write "a comment or the whitespace" / «комментария или пробельных символов».

## For the owner only

1. Q1, with the whitespace added.
2. The SpecTag citation in the agreed first sentence of 9.4.
3. The example proposed for 9.4.
4. Recorded as open on 2026-11-17: what a line of code outside every symbol and test changes. This review does not depend on it, but it should be tracked.

Drafts: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`. Notes: `D:/SpecSheriff/.ai_docs/t25-pass/group3-notes.md`.
