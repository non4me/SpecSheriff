I've reviewed all three drafts and none is ready. One question needs the owner: rule 9.4 and rule 1.5.2 contradict each other on comments. The skill `specsheriff-terminology-review` was loaded. Drafts: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`; code checked: `D:/SpecSheriff/skills/tools/src/diff.ts`.

## s-2x58az67bm6cxq2 "The code and the tests that a commit changes" — not ready

**Checklist**
1.2.3 ✓ · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✗ "each SpecTag on a line that it adds, and each SpecTag in an entry that it adds or changes": two items of one kind written as prose, not a list · 7.2.3 ✓ · 7.2.4 ✗ "Of the symbols and the tests that a commit changes, it adds those…": in this node "changes" includes adding and removing, but the agreed nodes that cite it use "adds or changes" to mean code that is not removed · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✗ the same sentence as 7.2.2 holds two thoughts · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test ✓

**Оценка**
- согласованность: ✗ абзац 4 противоречит согласованному 9.4 (s-9j2mmnuuwmx5ksn) для комментария в файле со SpecTag в начале; 1.5.2 (s-kgbzk2ph9e6jfb4) говорит обратное. Это вопрос владельцу. С принципами противоречий нет.
- целостность: ✗ узел считает добавленное и удалённое тоже «изменённым». Поэтому согласованные s-9rtrj24myzjvshu, s-utf4mbt7ref8g9c, s-8wp7xm7g3u8gscq и s-rd9nftptjuz6bwv охватывают и удалённый код. Сверено также с s-3xx2eukc8gtd2tx, s-u6mj5yv8ngnz79v, s-w93jfnqynfa47pf и строкой 10.1.41 (s-c4y63t285gg7jz7).
- целесообразность: ✓ одно определение изменения для `sheriff binding`, `sheriff review` и `sheriff commit-message`.
- избыточность: ✗ первое предложение абзаца о файле привязок повторяет 1.5.2 и s-trwczfskj5zmuft.
- недостаточность: ✗ не сказано, с чем сравнивается первый коммит репозитория. Перемещённый файл, привязанный целиком, по абзацу 4 считается добавленным. Переименованный тест не попадает ни в одну категорию.

**Findings**
- **DOUBT (author can fix: the agreed nodes settle it).** Under the draft, deleting a symbol or a test that has no SpecTag is refused by s-9rtrj24myzjvshu and s-utf4mbt7ref8g9c. Deleting a rule's code together with its tests is refused by s-8wp7xm7g3u8gscq. s-rd9nftptjuz6bwv would have to show removed code "as the commit leaves it". Three edits fix this:
  1. In paragraph 3, replace the last two sentences with "A test is also the same where the commit changes only its name outside its SpecTag (§s-9j2mmnuuwmx5ksn)." / «Тест остаётся тем же и тогда, когда коммит меняет только его название вне его SpecTag (§s-9j2mmnuuwmx5ksn).»
  2. Delete the second and third sentences of paragraph 4.
  3. Before the last paragraph, add "A commit changes only the symbols, files bound as a whole and tests that both the commit's parent and the commit hold. It adds each of them that only the commit holds. It removes each of them that only the commit's parent holds." / «Коммит меняет только те символы, файлы, привязанные целиком, и тесты, которые есть и в родительском коммите, и в самом коммите. Каждый из них, который есть только в коммите, он добавляет. Каждый, который есть только в родительском коммите, он удаляет.»
  
  The second edit also settles the moved file.
- **DOUBT (owner).** A reworded comment in a file bound as a whole: see point 2 below.
- **WORDING FIX.** Paragraph 7 becomes: "A commit adds or changes each SpecTag of the following kinds:" with the items "- a SpecTag on a line that the commit adds;" and "- a SpecTag in an entry that the commit adds or changes." The sentence "The exception is…" stays after the list. / «Коммит добавляет или меняет каждый SpecTag следующих видов:» with «- SpecTag на строке, которую коммит добавляет;» and «- SpecTag в записи, которую коммит добавляет или меняет.»
- **DOUBT (author: diff.ts already compares the first commit with an empty tree).** After "first parent." add "The first commit of a repository is compared with an empty repository." / «Первый коммит репозитория сравнивается с пустым репозиторием.»
- **CUT.** "The SpecTags of a file that the bindings file (§s-trwczfskj5zmuft) binds are those that the file's entry holds." 1.5.2 already says this.
- **CUT.** In the reason, ", each with the whole of the code that its SpecTags bind (§s-9j2mmnuuwmx5ksn)". It is unclear what "its" refers to. Russian: drop «, каждое — вместе со всем кодом, который привязывают его SpecTag (§s-9j2mmnuuwmx5ksn)».

## new:tools-7-2-changed-line "A line that changes the code" — not ready

**Checklist**
1.2.3 ✓ · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✗ "leaving out comments and reading each string literal as one token. In a test, they also leave out…": three rules of one kind written as prose, not a list · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test ✓

**Оценка**
- согласованность: ✓ сверено с 9.4 (s-9j2mmnuuwmx5ksn), решениями 2026-11-10 и 2026-11-11 (пробелы внутри строки не считаются, отступ в Python считается, переименование меняет код) и принципом детерминированных проверок, при условии поправки о сравнении git.
- целостность: ✓ стыкуется с s-2x58az67bm6cxq2, s-33fw3ga4ctd94dq, s-zrsc6asgmhv8tnc и s-utf4mbt7ref8g9c.
- целесообразность: ✓ этого требует решение владельца от 2026-11-11.
- избыточность: ✓
- недостаточность: ✗ не сказано, каким сравнением получены серии строк. Не сказано, как читается многострочный строковый литерал.

**Findings**
- **DOUBT (author).** The runs of lines depend on git's diff algorithm, which each machine's `diff.algorithm` setting can change. diff.ts:49 does not fix it. After the first sentence of paragraph 2, add "They take the runs from git's comparison of the two versions of the file, made with the Myers algorithm, git's default, whatever git's settings on the machine." / «Серии они берут из сравнения двух версий файла, которое git выполняет алгоритмом Майерса, своим алгоритмом по умолчанию, какими бы ни были настройки git на машине.» In stage 3, diff.ts passes `--diff-algorithm=myers`.
- **WORDING FIX.** Paragraph 1, sentences 2–3, become: "They read each line as the tokens of the file's language, as follows:" with the items "- they leave out comments;", "- they read each string literal, or the part of one on the line, as one token;" and "- in a test (§s-zrsc6asgmhv8tnc), they leave out the test's name, other than its SpecTag (§s-8xw4mgvpexyvw5q)." / «Они читают каждую строку как токены языка файла, при этом:» with «- опускают комментарии;», «- читают каждый строковый литерал или его часть на этой строке как один токен;» and «- в тесте (§s-zrsc6asgmhv8tnc) опускают название теста, кроме его SpecTag (§s-8xw4mgvpexyvw5q).»
- **WORDING FIX.** The reason's second sentence is false: a call spread over more lines counts as a change, and so does a renamed local variable, though neither changes what the code does. Replace it with "Reading lines as the tokens of their language leaves out what cannot alter what the code does, such as comments and the spacing between tokens." / «Чтение строк как токенов их языка оставляет в стороне то, что не может изменить то, что делает код, например комментарии и пробелы между токенами.»
- **TERM.** "run": git calls this a hunk (unverified). It is a partial fit, since a hunk normally holds unchanged context lines too (inference). Keep "run"; a gloss in the docs costs nothing.

## new:tools-7-2-draft-rule "The code and the tests of a draft rule" — not ready

**Checklist**
1.2.3 ✓ · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✗ "makes this check": nothing earlier in the node is called a check · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test ✓

**Оценка**
- согласованность: ✓ сверено с принципом «Nothing unapproved is implemented», 1.3.2 (s-utvqbypzhmgndug), строкой 10.1.28a (s-wpadgy2budcxa3v), строкой 10.1.41 (s-c4y63t285gg7jz7) и решением 2026-11-20 о проверках, пока спецификация — черновик.
- целостность: ✓ пересечения с s-9rtrj24myzjvshu и s-utf4mbt7ref8g9c нет. Узел верен, только если в s-2x58az67bm6cxq2 удаление не входит в «меняет».
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ не сказано, какую строку отказ называет для удалённого символа.

**Findings**
- **WORDING FIX.** Delete paragraph 3. Add as the second sentence of paragraph 1: "It does so whether the specification is approved or a draft (§s-utvqbypzhmgndug)." / «Он делает это независимо от того, одобрена спецификация или она черновик (§s-utvqbypzhmgndug).»
- **WORDING FIX.** Replace "It also names the symbol, the file or the test, with its file and its line." with "It also names each symbol and each test concerned, with its file and its line, and each other file concerned. Where the commit removes a symbol or a test, its line is read in the commit's parent." / «Он называет также каждый затронутый символ и тест с его файлом и строкой и каждый другой затронутый файл. Если коммит удаляет символ или тест, его строка берётся в родительском коммите.»

## The points the brief asked about

1. **Deleting a draft rule's code: the author's reading holds.** The principle, rule 1.3.2, and the agreed row 10.1.41, which counts code bound "before the commit" as changed, all support it. With the first fix to s-2x58az67bm6cxq2, the words "or removes" become necessary.
2. **Comments in a file bound as a whole: only the owner can settle this.**
   - JSON files and the formats that allow no comments have no comments, so there is no conflict there.
   - A file bound by SpecTags at its start is, by definition, in a language no description covers (s-5qdjyf6t898rsd4). The SpecSheriff tools have no grammar for it.
   - The current fallback (diff.ts:78) strips `#`, `//` and `/*…*/`. That misreads a CSS `#main` selector or a URL.
   - So rules 9.4 and 1.5.2 cannot both hold for such a file. I recommend keeping the draft and narrowing 9.4 to code bound by symbols.
   - The cost: in CSS, SQL, YAML or shell files, every comment edit runs a paid review and needs the rule named in the commit message. It is refused while the rule is a draft.
   - Example 2 depends on the answer.
3. **The project's own kinds:** that draft is not in my input.

**For the owner only:** point 2.
