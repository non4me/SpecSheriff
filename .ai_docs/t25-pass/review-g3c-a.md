**Group 3, round c, input g3c-a: final review**

I loaded the skill `specsheriff-terminology-review` and printed the checklist with `node .claude/vt/writing-rules.mjs`. Five drafts and the proposal on rule 9.4 are **ready**. "Project-wide settings" needs one fix, and Q1's text needs to cover more files. The author can make both changes. Every fix that reviews A, B and C gave is in place word for word, in English and in Russian. Each sentence that round c wrote in the author's own words keeps the meaning of its Russian.

Columns: **J** s-j9r8z4xdrfkfs47 · **E** new:tools-7-1-extensions-delivered · **X** s-2x58az67bm6cxq2 · **L** new:tools-7-2-changed-line · **D** new:tools-7-2-draft-rule · **94** proposal:s-9j2mmnuuwmx5ksn · **S** proposal:new-tools-1-settings-g3

| Rule | J | E | X | L | D | 94 | S |
|---|---|---|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ "read only the files that match …, the files into which …, and the bindings file" |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (none needed) |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## Verdicts and findings

**J "Entries that only an owner of the specification records", E "The chosen extensions and the installed plugin", X "What a commit adds, changes and removes in the code and the tests", L "A line that changes the code", D "The code and the tests of a draft rule": ready.** None of the five has a finding.

**94 "A change to a SpecTag": ready.** Q1, which this proposal depends on, needs one fix from the author (below).

**S "Project-wide settings": not ready.** It changes only the sentence and the link that its `change` describes. One fix, which the author can make:
- **WORDING FIX (rule 7.2.2 and the base rule "Writing").** The changed sentence now names three kinds of file in prose, in 52 words. Replace part 7 with the text below, and record the change in `change`.
  - EN: "To find the SpecTags (§s-8xw4mgvpexyvw5q) that bind code and tests to their rules, the SpecSheriff tools read only the following files:" followed by three items: "the files that match the glob patterns for code or for tests in `sheriff.config.json`;" / "the files into which `sheriff types` writes the types (§s-pvzms7d8kxb8dk2);" / "the bindings file (§s-trwczfskj5zmuft)." Then a separate paragraph: "A file that matches both a pattern for code and a pattern for tests is read as a test."
  - RU: «Чтобы найти SpecTag (§s-8xw4mgvpexyvw5q), которые привязывают код и тесты к их правилам, инструменты SpecSheriff читают только следующие файлы:» followed by «файлы, которые соответствуют glob-шаблонам кода или тестов в `sheriff.config.json`;» / «файлы, в которые `sheriff types` записывает типы (§s-pvzms7d8kxb8dk2);» / «файл привязок (§s-trwczfskj5zmuft).» The last sentence stays as it is.

**Q1: one fix, which the author can make.** Since whitespace joined Q1, Q1's scope no longer matches the drafts written for answer A.
- Draft X counts a change only to whitespace in *every* file bound as a whole, including a JSON file bound by an entry in the bindings file.
- Q1's heading, its "Why" paragraph and the Russian page speak only of a file bound by SpecTags at its start. They also say that JSON "raise[s] no conflict".
- So an owner who chooses A does not see that re-indenting such a JSON file also requires the commit message to name its rule and starts a review the project pays for. The proposal's own `question` already says "a file bound as a whole".

The fix:
- Heading: "…in a file bound as a whole".
- In the "Why" paragraph, replace "JSON and the other formats without comments raise no conflict over comments." with "A file bound by an entry in the bindings file, such as a JSON file, has no comments, but a change only to its whitespace raises the same conflict."
- Title of the Russian page: «Вопрос 1. Меняет ли код правка комментария или пробельных символов в файле, привязанном целиком (например, в таблице стилей, файле SQL, YAML или shell со SpecTag в начале либо в файле JSON, привязанном записью в файле привязок)?»
- On the Russian page, after «…а у такого файла описания нет.», add: «В файле JSON, привязанном записью в файле привязок, комментариев нет, но правка одних пробельных символов в нём по правилу 1.5.2 тоже меняет код, вопреки вашему решению от 2026-11-11.»

Q1's other checks hold:
- Only the owner can answer it. The ruling of 2026-11-17 that a change anywhere in such a file counts does not mention comments.
- Each option states its cost and which agreed rule it changes.
- The drafts written for A agree with one another.

**TERM:** none of these drafts introduces a new term. The glosses already listed for the docs still apply.

## Оценка

**J**
- согласованность: ✓ строки 10.1.27, 10.1.27a, 10.1.27b и их решения (2026-11-13, -17, -18), правила 10.6, 10.7, 1.7.5, s-chsfpkgpmfk4fft, s-gb8s9657a65hqmv, s-75ue25v6r23jkk8.
- целостность: ✓ пункты 40, 48, 49, impl.json и todo строки 10.1.27 названы в заметках.
- целесообразность: ✓ иначе запись можно удалить или переставить вручную, в обход `sheriff settings`.
- избыточность: ✓
- недостаточность: ✓

**E**
- согласованность: ✓ строка 10.1.27c и решение 2026-11-18, s-xzcw3hv4hmxz7h7, s-chsfpkgpmfk4fft, s-zefk589ykh37b8u, s-gpzs5fcxvp6jkrp.
- целостность: ✓ пункт 58 (s-st6td4mua9uqt9z) и impl.json названы в заметках.
- целесообразность: ✓ у участника команды стоит более ранний выпуск плагина.
- избыточность: ✓
- недостаточность: ✓

**X**
- согласованность: ✓ 9.4 (с предложением), 1.5.2, s-5qdjyf6t898rsd4, s-trwczfskj5zmuft, s-5z5gnu7pahr82xp, s-9rtrj24myzjvshu, s-3xx2eukc8gtd2tx, s-8wp7xm7g3u8gscq. Пробельные символы засчитываются по ответу A на Q1.
- целостность: ✓ s-w93jfnqynfa47pf, s-u6mj5yv8ngnz79v, пункт 38 (строка 10.1.41).
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓ строка кода вне символов и тестов — открытый пункт 10 группы 2, назван при Q1.

**L**
- согласованность: ✓ 9.4 и решения 2026-11-11 (пробелы, отступ Python, переименование), s-33fw3ga4ctd94dq, s-zrsc6asgmhv8tnc.
- целостность: ✓ с s-2x58az67bm6cxq2 и предложением по 9.4: «язык описан» и «символы определимы» обозначают одни и те же файлы (s-5qdjyf6t898rsd4).
- целесообразность: ✓ решение 2026-11-11.
- избыточность: ✓
- недостаточность: ✓

**D**
- согласованность: ✓ принцип «Nothing unapproved is implemented», 1.3.2, строка 10.1.28a (решения 2026-11-13, -17), строка 10.1.41 (решение 2026-11-20), s-5z5gnu7pahr82xp.
- целостность: ✓ «удаляет» определяет s-2x58az67bm6cxq2; impl.json назван в заметках.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**94**
- согласованность: ✓ снимает противоречие с 1.5.2; сверено с решениями по 9.4 (2026-11-10, -11, -17), s-5qdjyf6t898rsd4, s-33fw3ga4ctd94dq, s-zrsc6asgmhv8tnc.
- целостность: ✓ стыкуется с s-2x58az67bm6cxq2 и s-u6mj5yv8ngnz79v; при ответах B и C изменения названы в заметках.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓ комментарий вне символов описанного файла теперь охвачен.

**S**
- согласованность: ✓ 1.5.2, s-trwczfskj5zmuft, s-zefk589ykh37b8u (`sheriff.bindings.json`), s-9rtrj24myzjvshu.
- целостность: ✓ теперь верны пример s-t383grkn3q68dpf и абзац о записях в s-2x58az67bm6cxq2; изменение кода записано в `stage3`.
- целесообразность: ✓ из-за «только» инструменты не читали файл привязок.
- избыточность: ✓
- недостаточность: ✓

## Findings only the owner can answer
None new. Q1 remains the group's only question for the owner.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group3-notes.md`
