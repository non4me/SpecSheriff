**Report on group 4, input a**

Both drafts are **not ready**. Three findings need the owner; the author can fix the rest.

---

## `s-7pk89t8z6wymmj9`: "How a project's own check is run" (not ready)

**Findings**

1. **The order of the checks (only the owner can answer).** The draft runs the project's own checks after two other checks: the check for a key written more than once (s-7zqsstgnuc772ba, row 10.1.1) and the validation against the schema (row 10.1.2).
   - Rule 10.12 (s-pcnyfp7gev7syax), which the owner agreed, puts every check of table 10.1 after the project's own checks.
   - Where either of those two checks refuses, `sheriff validate` stops, so the project's own checks never run.
   - The agreed "Validation against the schema before a command works on the files" pulls the other way, so the draft quietly picks one of two agreed nodes.
   - I recommend that rule 10.12 say the project's own checks run once the files have passed those two checks.
   - On the brief's point: the author's reading does not hold as written.

2. **"before every other check that it makes" is false (author can fix, after point 1).** The check for a key written more than once also runs before them. Replace paragraph 4 and add a `cites` link to s-7zqsstgnuc772ba:
   - EN: "`sheriff validate` runs the project's own checks only once the files of the specification have passed the check for a key written more than once (§s-7zqsstgnuc772ba) and the validation against their schema (§s-xzcw3hv4hmxz7h7). It runs them before each of its other checks (§s-pcnyfp7gev7syax). It makes those other checks whatever the project's own checks find."
   - RU: «Собственные проверки проекта `sheriff validate` запускает, только когда файлы спецификации прошли проверку на ключ, записанный больше одного раза (§s-7zqsstgnuc772ba), и проверку на соответствие своей схеме (§s-xzcw3hv4hmxz7h7). Он запускает их до каждой из остальных своих проверок (§s-pcnyfp7gev7syax). Эти остальные проверки он выполняет, что бы ни нашли собственные проверки проекта.»

3. **The refusal of a check that changes a file has no row in table 10.1 (only the owner can answer).** Rule 10.12 requires the refusal, so it is not "what no rule requires", unlike item 39's dropped refusal. But table 10.1 says it lists every check.
   - The author should record this under "Table 10.1" in the notes, as was done for rule 10.10.
   - Only the owner can add a row.

4. **Pointing words (author can fix).**
   - Paragraph 2: "each such check" points back to the previous paragraph. Use "each of the projects own checks" / «каждую собственную проверку проекта».
   - Paragraph 5: "a check" could mean any check. Use "one of the project's own checks" / «одна из собственных проверок проекта».

5. **Two thoughts in one sentence (author can fix, rule 7.3.2).** Split the sentence about the directory:
   - EN: "The check runs in the directory in which `sheriff validate` runs. At a commit, that directory holds what the commit contains (§s-477gtdrkw34dzxw)."
   - RU: «Проверка выполняется в каталоге, в котором выполняется `sheriff validate`. При коммите этот каталог содержит то, что содержит коммит (§s-477gtdrkw34dzxw).»

6. **A gap with the approval procedure (author can fix).** Rule 10.6 runs row 10.1.37 "as if the specification were approved". `--strict` also forces the `strict` flag on, so nothing covers the case where the flag is off. Add:
   - EN: "Where the approval procedure runs the project's own checks (§s-qzthyh7yqvfhsa2), `sheriff settings` hands each of them a model in which the specification is approved, with the `strict` flag as its entries hold it."
   - RU: «Когда процедура одобрения запускает собственные проверки проекта (§s-qzthyh7yqvfhsa2), `sheriff settings` передаёт каждой из них модель, в которой спецификация одобрена, а флаг `strict` такой, каким его задают записи.»

7. **The example is not a typical case (author can fix).** A project would refuse a leaked token rather than only report it.
   - Replace `no-secrets` with `spelling`.
   - Replace "finds a token in a file, prints the file's path" with "finds a misspelt word in a node's text, prints the node's sid".
   - Replace "showing the path" with "showing the sid".
   - RU: «находит слово с опечаткой в тексте узла, печатает sid узла», «показывая sid».

**Other points from the brief.**
- `--strict` agrees with s-chsfpkgpmfk4fft and rule 10.7.
- `onFailure` follows the owner's ruling of 2026-11-04 on rule 10.8.
- The Russian is faithful.
- I question no term.

**Checklist**
- 1.2.3 ✓
- 7.1 ✓
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✗ "validated the files": the files of what?
- 7.2.4 ✓
- 7.2.4.1 ✓
- 7.2.4.2 ✓
- 7.2.4.3 ✓
- 7.2.4.4 ✓
- 7.2.4.5 ✓
- 7.2.5 ✓
- 7.2.6 ✓
- 7.2.7 ✓
- 7.3.1 ✓
- 7.3.2 ✗ "…runs, which at a commit holds what the commit contains"
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✓
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✗ the example's check, a scan for secrets, only reports what it finds
- Pairing test ✓

**Оценка**
- согласованность: ✗ порядок противоречит правилу 10.12 (s-pcnyfp7gev7syax): строки 10.1.1 и 10.1.2 идут раньше собственных проверок, а при отказе любой из них собственные проверки не выполняются. Сверено также с s-2fau85dfyyeq66m, s-ujm7nfxkk9j3464, s-q3pfzyaxvpr2zj2, s-chsfpkgpmfk4fft, s-w6gybeqn2ttydqx, s-y5yk7eu6h4zrjpr, принципами.
- целостность: ✗ отказ проверки, которая меняет файл, не покрыт ни одной строкой таблицы 10.1 (s-jau82aq9juv9zzh), а в заметках это не записано. Сверено с s-477gtdrkw34dzxw, «Validation against the schema…», s-zefk589ykh37b8u.
- целесообразность: ✓ этого требуют строка 10.1.37 и правило 10.8, а s-chsfpkgpmfk4fft ссылается на `--strict`.
- избыточность: ✓
- недостаточность: ✗ процедура одобрения при выключенном флаге `strict`, а также поведение собственных проверок при отказе проверки ключей или схемы.

---

## `s-dbk2vyeg8z5jxna`: "Generated copies against the nodes" (not ready)

**Findings**

1. **Files of a project's generator whose listing rule is a draft (only the owner can answer).** Under s-y5yk7eu6h4zrjpr, `sheriff types` does not run such a generator. So no paragraph of this draft checks its files, and a hand edit passes.
   - That breaks rule 10.9 ("stays as it is"), rule 10.14 and row 10.1.39a.
   - I recommend refusing any change to those files, compared with the last commit.

2. **"would write" depends on refusals (author can fix).** Under s-a8fn72xa782wvbk, any refusal means `sheriff types` writes no file, so paragraph 1 would compare nothing. Paragraph 2 also misreads 10.15.
   - Paragraph 1, EN: "`sheriff binding` refuses each file that `sheriff types` generates (§s-a8fn72xa782wvbk) where the file's text in the repository differs, line endings aside, from what `sheriff types` generates for it (§s-dwxjxb7rw4w5yn3)."
   - Paragraph 1, RU: «`sheriff binding` отвергает каждый файл, который порождает `sheriff types` (§s-a8fn72xa782wvbk), если текст этого файла в репозитории, без учёта окончаний строк, отличается от того, что порождает для него `sheriff types` (§s-dwxjxb7rw4w5yn3).»
   - Paragraph 2, EN: "`sheriff binding` generates in memory, from the last approved wording of each node (§s-qyjw8xez6t6adc3), the files that `sheriff types` would generate."
   - Paragraph 2, RU: «`sheriff binding` порождает в памяти из последней одобренной формулировки каждого узла (§s-qyjw8xez6t6adc3) файлы, которые породил бы `sheriff types`.»
   - In the last item of the list, "to which … would write" becomes "for which … would generate".

3. **A defect in the agreed s-a8fn72xa782wvbk (author can fix).** Its phrase "refuses anything that `sheriff types` would write", read literally, keeps `sheriff types` from ever rewriting a stale file. Record this in the continuation file, to be fixed when that node next changes.

4. **General words (author can fix, rule 7.2.3).**
   - EN: "the files for the types and the RuntimeChecks (§s-e877bnfa559tvk9) generated from the RecordTypes (§s-7vm323mhry2enx3) (§s-pvzms7d8kxb8dk2)". Add a link to s-7vm323mhry2enx3.
   - RU: «…для типов и RuntimeChecks (§s-e877bnfa559tvk9), порождаемых из RecordTypes (§s-7vm323mhry2enx3)…».
   - EN: "a name of a type or a definition that cannot be generated (§s-suv42g8r3ra2h6b)".
   - RU: «имя типа или определения, если это имя нельзя породить (§s-suv42g8r3ra2h6b)».

5. **A misplaced clause (author can fix).** In the third item, "that lists such files" can be read as describing the stack.
   - EN: "a second rule that lists such files in the section of the technical appendix for the stack (§s-tj38pvm38nepaf5);"
   - RU: «второе правило, которое перечисляет такие файлы, в разделе технического приложения о стеке (§s-tj38pvm38nepaf5);»

6. **Which refusal (author can fix).** "The refusal names…" follows a list of several refusals.
   - EN: "Each of these refusals names the rule, the node or the path concerned."
   - RU: «Каждый из этих отказов называет соответствующее правило, узел или путь.»

7. **The reason (author can fix).** A copy left behind its nodes implements a wording that an owner once approved and has since replaced, not "what no owner has approved". "The system's code" is also used without a citation (rule 7.2.7); add a link to s-hheus6f395ynqvc.
   - EN: "A generated file kept in the repository is part of the system's code (§s-hheus6f395ynqvc). Edited by hand, it would implement what no owner has approved. Left behind its nodes, it would implement a wording that its owners have since replaced (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3)."
   - RU: «Порождённый файл, который хранится в репозитории, — часть кода системы (§s-hheus6f395ynqvc). Изменённый вручную, он реализовывал бы то, чего не одобрил ни один ответственный. Отставший от своих узлов, он реализовывал бы формулировку, которую ответственные уже заменили (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).»

**Point 10.1.39b from the brief.** The author's reading holds: s-a8fn72xa782wvbk names those nodes and implements the row. One consequence is my inference: rule 10.6 runs row 10.1.39b before an approval, and `sheriff types` writes files, so s-chsfpkgpmfk4fft has to obtain that report without writing anything.

The Russian is faithful, and I question no term.

**Checklist**
- 1.2.3 ✓
- 7.1 ✗ "the section of the technical appendix (§…) for the stack that lists such files"
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✗ "the types", "a name"
- 7.2.4 ✓
- 7.2.4.1 ✓
- 7.2.4.2 ✓
- 7.2.4.3 ✓
- 7.2.4.4 ✓
- 7.2.4.5 ✓
- 7.2.5 ✓
- 7.2.6 ✓
- 7.2.7 ✗ "the system's code" in the reason, with no citation
- 7.3.1 ✓
- 7.3.2 ✓
- 7.3.3 ✓
- 7.4.1 ✓
- 7.4.2 ✓
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✓
- Pairing test ✓

**Оценка**
- согласованность: ✗ обоснование расходится с правилом 10.15 (s-qyjw8xez6t6adc3). Сверено также с s-dwxjxb7rw4w5yn3, s-a8fn72xa782wvbk, s-y5yk7eu6h4zrjpr, s-km4x4s26kv7pjze, s-kh8qcd5kxgh9z3j, s-pvzms7d8kxb8dk2, s-suv42g8r3ra2h6b.
- целостность: ✗ дословное прочтение s-a8fn72xa782wvbk блокирует запись устаревшего файла; файлы генератора, правило которого в черновике, не проверяются.
- целесообразность: ✓ этого требует строка 10.1.39a; todo от 2026-11-06 выполнено.
- избыточность: ✓
- недостаточность: ✗ файлы генератора, правило которого в черновике; что сравнивается, когда `sheriff types` отказывает.

---

## Questions only the owner can answer

1. Should rule 10.12 let the project's own checks run after the check for a key written more than once and the validation against the schema? Should they be skipped where either refuses?
2. Should table 10.1 gain a row for rule 10.12's requirement that a project's own check changes no file?
3. Should the files of a project's generator whose listing rule is a draft be held to the last commit?
