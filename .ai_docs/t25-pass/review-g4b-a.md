# Review of group 4, input b-a (confirming round)

None of the four drafts is ready yet. Every finding below can be fixed by the author except two, which go to the owner, and one, which goes to the main session.

I checked these against the first round:
- **Review a's findings:** all seven on `s-7pk89t8z6wymmj9` and all seven on `s-dbk2vyeg8z5jxna` were applied, or settled by rulings 1–4.
- **The readers' findings** on these two drafts were applied. The phrase "makes this check" was kept, and the reason given for keeping it holds.
- **The proposal on 10.12** changes nothing outside its `change` field. I compared its English and Russian with `newform.json`.

The brief's points that fall in this input:
- **Row 10.1.39b:** the author's reading holds. s-a8fn72xa782wvbk names those nodes and has an `implements` link to s-f8fmudceuyaj942.
- **Item 33:** the author's reading holds, provided the owner agrees to the proposal on 10.12 and to row 10.1.37a at the same time.
- **The question on merge commits:** it is put in terms of what a developer sees, it opens with the recommendation, and it gives each option's cost. s-qqs2svksmjct753 and s-txbwsthdqhvyzd2 carry answer A exactly as the question describes it.

---

## `s-7pk89t8z6wymmj9`: "How a project's own check is run" (not ready)

**Checklist**
1.2.3 ✓ · 7.1 ✗ "the `strict` flag is as its entries set it": "its" names nothing in that paragraph. Also "In the cases that the rule on the `strict` flag names": the sid stands in for the cases. · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test ✓

**Оценка**
- согласованность: ✗ обоснование («везде, где выполняются проверки SpecSheriff guidelines») шире того, что делают хуки: commit-msg и pre-push не запускают `sheriff validate` (s-477gtdrkw34dzxw). Сверено с s-2fau85dfyyeq66m, s-ujm7nfxkk9j3464, предложением по 10.12, s-7zqsstgnuc772ba, new:tools-7-1-validate, s-chsfpkgpmfk4fft, s-qzthyh7yqvfhsa2, s-q3pfzyaxvpr2zj2, s-w6gybeqn2ttydqx, proposal:new-tools-1-project-g4, принципами.
- целостность: ✓ s-chsfpkgpmfk4fft ссылается на узел, и её утверждение остаётся верным. Порядок держится при условии, что согласовано предложение по 10.12.
- целесообразность: ✓ этого требуют строки 10.1.37 и 10.1.37a, правило 10.8 и `--strict` в s-chsfpkgpmfk4fft.
- избыточность: ✓ предложение о последней одобренной формулировке повторяет абзац proposal:new-tools-1-project-g4. Этого требует решение 4 брифа.
- недостаточность: ✗ если проверку перечисляет только формулировка-черновик, отказ говорит «правило не перечисляет проверку», хотя разработчик видит её в правиле.

**Findings**
1. **WORDING FIX (author).** Paragraph 7 has three problems:
   - "its entries" points back to nothing named in its paragraph.
   - Rule 10.7 names two cases. Approval while the flag is on is already covered by the sentence before, so the sentence's only real content is turning the flag on.
   - The cited s-chsfpkgpmfk4fft does not say that the checks run. Rule 10.6 says so.

   Replace paragraph 7:
   - EN: "Before `sheriff settings` records an approval of the specification, it runs the project's own checks (§s-chsfpkgpmfk4fft, §s-qzthyh7yqvfhsa2). It passes them a model in which the specification is approved and the `strict` flag is as the entries in `sheriff.config.json` set it. Before `sheriff settings` turns the `strict` flag on, it runs the project's own checks as `sheriff validate --strict` runs them (§s-q3pfzyaxvpr2zj2)."
   - RU: «Прежде чем записать одобрение спецификации, `sheriff settings` запускает собственные проверки проекта (§s-chsfpkgpmfk4fft, §s-qzthyh7yqvfhsa2). Он передаёт им модель, в которой спецификация одобрена, а флаг `strict` такой, каким его задают записи в `sheriff.config.json`. Прежде чем включить флаг `strict`, `sheriff settings` запускает собственные проверки проекта так, как их запускает `sheriff validate --strict` (§s-q3pfzyaxvpr2zj2).»
2. **WORDING FIX (author).** Replace the reason's first sentence:
   - EN: "`sheriff validate` runs a project's own checks together with the checks of the SpecSheriff guidelines that it makes, on the same files."
   - RU: «`sheriff validate` запускает собственные проверки проекта вместе с теми проверками SpecSheriff guidelines, которые выполняет сам, на тех же файлах.»
3. **WORDING FIX (author).** Replace the last sentence of paragraph 3:
   - EN: "Where the rule, in that wording, lists no member whose value is the check's name, `sheriff validate` refuses the change. The refusal names the check and the rule, and says that the rule's last approved wording does not list the check."
   - RU: «Если в этой формулировке в правиле нет элемента, значение которого — имя проверки, `sheriff validate` отвергает изменение. Отказ называет проверку и правило и говорит, что последняя одобренная формулировка правила эту проверку не перечисляет.»

---

## `proposal:row-10-1-37a`: row 10.1.37a (not ready)

**Checklist**
1.2.3 ✓ (the row takes its reason from table 10.1 and rule 10.12, as rows 10.1.35a and 10.1.43b do) · 7.1 ✗ "leaves every file … as it was" does not say that a file the check creates is refused · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test ✓

**Оценка**
- согласованность: ✗ второй шаг правила 10.12 говорит, что собственные проверки «не меняют файлов» вообще, а строка разрешает менять файлы, которые git игнорирует. Сверено с s-pcnyfp7gev7syax, s-ujm7nfxkk9j3464, s-7pk89t8z6wymmj9, s-jau82aq9juv9zzh.
- целостность: ✗ отказы s-n4m5zvh96yb299p (собственный инструмент проекта меняет то, что в стейджинге) по-прежнему без строки, а таблица называет себя полным перечнем. Строка уже, чем s-7pk89t8z6wymmj9: та отвергает и добавленный файл.
- целесообразность: ✓ этого требуют правило 10.12 и шапка таблицы 10.1.
- избыточность: ✓
- недостаточность: ✗ файл, который проверка создаёт.

**Findings**
1. **WORDING FIX (author).**
   - Text EN: "A check that a project's own guidelines add (§s-2fau85dfyyeq66m) leaves the directory in which it runs as it was, other than the files that git ignores"
   - Text RU: «Проверка, которую добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m), оставляет каталог, в котором она выполняется, таким, каким он был, кроме файлов, которые git игнорирует»
   - Cost EN: "refused, naming the check and each file that it added, changed or removed"
   - Cost RU: «отвергается с указанием проверки и каждого файла, который она добавила, изменила или удалила»
2. **DOUBT (main session; the owner is not needed).** Ruling 2 rests on table 10.1 listing every check. On that same basis, s-n4m5zvh96yb299p's refusal of a project's own tool that changes the staged files needs a row too, and the notes defer it to item 57 without one. So the ruling as carried out contradicts the agreed head of s-jau82aq9juv9zzh. I propose row 10.1.37b:
   - EN: "Each of the project's own tools that runs on a commit after the tools that rewrite files (§s-pcnyfp7gev7syax) leaves what the commit contains as it was", cost "refused, naming the tool".
   - RU: «Каждый собственный инструмент проекта, который запускается при коммите после инструментов, переписывающих файлы (§s-pcnyfp7gev7syax), оставляет содержимое коммита таким, каким оно было» / «отвергается с указанием инструмента».
3. **DOUBT (owner).** The row exempts files that git ignores, and the agreed step 2 of 10.12 has no such exemption. I recommend keeping 10.12 as it is and reading it together with "After the first step, nothing changes what the commit contains". The alternative is for step 2 to say "none of which changes a file that git does not ignore".

---

## `proposal:s-pcnyfp7gev7syax-g4`: "The order in which tools and checks run on a commit and on a push" (not ready)

**Checklist**
1.2.3 ✓ · 7.1 ✗ "As an exception" does not say what it is an exception to. It follows "goes through only if every check passes", so a reader may take it as an exception to that sentence. "which therefore run first" contradicts step 1 · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✗ "of its archive or of its schema", with no citation · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✗ the reason goes through the text paragraph by paragraph · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✗ the agreed example's "the checks of the SpecSheriff guidelines run last" is no longer true · Pairing test ✗ order → exception → generators → tools that cannot run

**Оценка**
- согласованность: ✗
  - «which therefore run first» противоречит первому шагу и обоснованию («Whatever rewrites files runs first»).
  - «from the most specific to the most general» не верно при исключении.
  - Согласованное русское обоснование «на том, что уже прошло проверки проекта» противоречит «Каждый шаг запускается, что бы ни нашли предыдущие».

  Сверено с new:tools-7-1-validate, s-7zqsstgnuc772ba, s-d5cgda5bdsn7bzy, s-emrfpzw2d5bgb6x, s-jau82aq9juv9zzh, s-7pk89t8z6wymmj9, принципами.
- целостность: ✗
  - При push исключение требует проверок строк 10.1.1 и 10.1.2 до тестов, а хук pre-push их не делает (s-477gtdrkw34dzxw, s-b6qdtghnyha3fhk).
  - Не назван узел хуков: pre-commit запускает `sheriff binding` и `sheriff citations`, что бы ни нашёл `sheriff validate` (skills/tools/hooks/pre-commit), а `sheriff binding` не проверяет повторённые ключи.
- целесообразность: ✓ противоречие с new:tools-7-1-validate реальное (решение 1).
- избыточность: ✓
- недостаточность: ✗ не сказано, исключением из чего служит новый абзац.

**Findings**
1. **WORDING FIX (author).** Replace the paragraph that introduces the list. The basis of ruling 1 (new:tools-7-1-validate, s-7zqsstgnuc772ba) covers only commands run on a commit. If the main session wants the push covered as well, s-b6qdtghnyha3fhk must run these checks before the tests instead.
   - EN: "On a commit, as an exception to the steps above, the project's own checks and the other checks of the SpecSheriff guidelines run only once the following checks have passed, so these checks run right after the first step:"
   - RU: «При коммите, в виде исключения из описанных выше шагов, собственные проверки проекта и остальные проверки SpecSheriff guidelines запускаются, только когда прошли следующие проверки, поэтому эти проверки выполняются сразу после первого шага:»
2. **WORDING FIX (author).** Add citations to the first item, with `cites` links, as the agreed s-7zqsstgnuc772ba does: "of its archive (§s-f2b5zvc565s242f) or of its schema (§s-eferktypcj7njt5)" / «её архива (§s-f2b5zvc565s242f) или её схемы (§s-eferktypcj7njt5)».
3. **WORDING FIX (author).** Replace the example, and list the change in the `change` field:
   - EN: "A project's own guidelines list a formatter. On a commit, the formatter rewrites the files in the commit first, and the generators of the SpecSheriff tools then write their files. The checks that each property has one value and that each file complies with its JSON Schema follow. A scan for secrets runs next, and the other checks of the SpecSheriff guidelines run last, on the final files."
   - RU: «Собственные guidelines проекта перечисляют форматтер. При коммите форматтер сначала переписывает файлы коммита, а затем генераторы инструментов SpecSheriff записывают свои файлы. За ними следуют проверки того, что у каждого свойства одно значение и что каждый файл соответствует своей JSON Schema. После этого запускается поиск секретов, а остальные проверки SpecSheriff guidelines запускаются последними, на окончательных файлах.»
4. **WORDING FIX (author, in the notes).** Add to item 57 that the pre-commit hook must not run `sheriff binding` and `sheriff citations` once `sheriff validate` refuses a key or a file.
5. **DOUBT (owner).** The agreed reason fails the pairing test, and the node is changing, so it must now conform as a whole. A candidate reason that replaces all four paragraphs:
   - EN: "A project may run tools of its own on a commit or a push, such as a scan that checks that nothing internal reaches a public repository. Adopting the method must not stop them, even where the SpecSheriff tools cannot run, as on a machine without the plugin. A team that needs the checks to hold for everyone runs them in CI.

     The order lets every check rely on what it reads. Whatever rewrites files runs before any check, so every check reads the commit in its final form. A generator runs after any formatter, so that no formatter changes what it generates. A check that reads the nodes runs only on files that have passed the checks of their structure. A tool that changed the commit after the checks would let through what no check had read."
   - RU: «Проект может запускать при коммите или push свои инструменты, например проверку того, что ничего внутреннего не попадает в публичный репозиторий. Переход на метод не должен их останавливать, даже там, где инструменты SpecSheriff не могут запуститься, например на машине без плагина. Команда, которой нужно, чтобы проверки действовали для всех, запускает их в CI.

     Порядок позволяет каждой проверке полагаться на то, что она читает. Всё, что переписывает файлы, запускается раньше любой проверки, поэтому каждая проверка читает коммит в окончательном виде. Генератор запускается после любого форматтера, чтобы ни один форматтер не менял того, что он генерирует. Проверка, которая читает узлы, запускается только на файлах, которые прошли проверки своей структуры. Инструмент, который менял бы коммит после проверок, пропустил бы то, чего не читала ни одна проверка.»

---

## `s-dbk2vyeg8z5jxna`: "Generated copies checked against their nodes" (not ready)

**Checklist**
1.2.3 ✓ · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✗ "each change that a commit makes … A change is any difference": this gives "change" a meaning other than the one in s-2x58az67bm6cxq2, where a change is kept apart from an addition and a removal · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test ✓

**Оценка**
- согласованность: ✗ «change» в абзаце 3 значит не то, что в s-2x58az67bm6cxq2. Сверено с s-dwxjxb7rw4w5yn3, s-km4x4s26kv7pjze, s-qyjw8xez6t6adc3, s-kh8qcd5kxgh9z3j, s-a8fn72xa782wvbk, s-y5yk7eu6h4zrjpr, s-hheus6f395ynqvc, proposal:new-tools-1-project-g4.
- целостность: ✓ s-a8fn72xa782wvbk опирается на перечень отказов, а её дефект записан в заметках. Строку 10.1.39b реализует s-a8fn72xa782wvbk.
- целесообразность: ✓ этого требуют строка 10.1.39a и правило 10.9.
- избыточность: ✓
- недостаточность: ✗ коммит слияния и первый коммит в абзаце 3; генератор, который отказывает при запуске командой `sheriff binding`.

**Findings**
1. **WORDING FIX (author).** Replace paragraph 3. Besides the 7.2.4 breach, "a file of one of the project's own generators" first reads as the generator's own source file. Citing s-2x58az67bm6cxq2 settles which parent a merge commit and the first commit are compared with. Add a `cites` link to s-2x58az67bm6cxq2.
   - EN: "While the rule that lists one of the project's own generators (§s-km4x4s26kv7pjze) is a draft, `sheriff binding` refuses each file of that generator that differs between the commit's parent (§s-2x58az67bm6cxq2) and the commit. A file of the generator is one at a path that the generator prints when `sheriff binding` runs it as `sheriff types` runs a generator whose rule is approved (§s-y5yk7eu6h4zrjpr). A file that only one of the two commits holds also differs. The refusal names the file and the generator."
   - RU: «Пока правило, которое перечисляет один из собственных генераторов проекта (§s-km4x4s26kv7pjze), — черновик, `sheriff binding` отвергает каждый файл этого генератора, который различается в родительском коммите (§s-2x58az67bm6cxq2) и в коммите. Файл генератора — файл по пути, который печатает генератор, когда `sheriff binding` запускает его так, как `sheriff types` запускает генератор, правило которого одобрено (§s-y5yk7eu6h4zrjpr). Файл, который есть только в одном из двух коммитов, тоже различается. Отказ называет файл и генератор.»
2. **DOUBT (author can settle; it adds a refusal).** If the generator fails when run this way, `sheriff binding` cannot learn its paths. A hand edit then passes without a word, against rule 10.9. Add:
   - EN: "Where `sheriff types` would refuse the generator so run (§s-y5yk7eu6h4zrjpr), `sheriff binding` refuses it in the same way."
   - RU: «Если `sheriff types` отверг бы генератор, запущенный так (§s-y5yk7eu6h4zrjpr), `sheriff binding` отвергает его так же.»
3. **TERM.** "Last approved wording" fits the [29148] 2018 term "baseline" (a formally approved version, fixed at a specific time) and the [IREB] requirements baseline only in part: SpecSheriff keeps it for each node, and it moves with each approval (inference). This calls for a note in the docs, not a change to any node.

---

## Findings only the owner can answer

1. **The reason of rule 10.12** (finding 5 on the proposal): take the candidate whole reason, or keep the agreed reason with its added paragraph. Either way, the agreed Russian «на том, что уже прошло проверки проекта» is to be corrected.
2. **Files that git ignores** (finding 3 on row 10.1.37a): keep step 2 of 10.12 as it is, which I recommend, or add "that git does not ignore".

For the main session, not the owner: row 10.1.37b (finding 2 on row 10.1.37a).

Files:
- `D:/SpecSheriff/.ai_docs/t25-pass/review-input-g4b-a.md`
- `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`
- `D:/SpecSheriff/.ai_docs/t25-pass/group4-notes.md`
- `D:/SpecSheriff/skills/tools/hooks/pre-commit`
