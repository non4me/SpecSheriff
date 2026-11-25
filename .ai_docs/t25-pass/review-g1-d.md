**Review of three group 1 drafts.** D1 is s-75r4pg4wdqu3gw5, D2 is s-yprj7d6tnvauggr and D3 is s-6bmnsbskg6en4nf. The terminology skill was loaded.

**Checklist** (D1 · D2 · D3)
- 1.2.3 A rule is made of its text and its reason: ✓ · ✗ the reason's "One type, `refines`, records both refining and extending" says how a link type is used, which rule 6.1 does not yet say · ✓
- 7.1 The goal, the reader and the scope: ✓ · ✓ · ✓
- 7.2.1 Who must act: ✗ "A citation of a node of an extension is refused through the link…" names no actor · ✓ · ✓
- 7.2.2 The order of the text: ✓ · ✓ · ✓
- 7.2.3 General words: ✓ · ✗ "tells which part a node belongs to" (part of what?) · ✗ "recognise by an environment variable" (a specific variable left unnamed)
- 7.2.4 Naming: ✓ · ✓ · ✓
- 7.2.4.1 Coined names: ✓ · ✓ · ✓
- 7.2.4.2 What a name says: ✓ · ✓ · ✓
- 7.2.4.3 A general word in a name: ✓ · ✓ · ✓
- 7.2.4.4 Properties: ✓ · ✓ · ✓
- 7.2.4.5 Relations to other entities: ✓ · ✓ · ✓
- 7.2.5 Definition by negation: ✓ · ✓ · ✓
- 7.2.6 Lists that restrict: ✓ · ✓ · ✓
- 7.2.7 Words that take their meaning from the specification: ✗ "the SpecSheriff guidelines" and "an extension of the guidelines" are cited to a row, not to s-u7tw6m8npxmv5tu and s-mbmnsnxenmavu3z · ✗ "technical appendix", "base specification", "section on the stack", "technical debt section", "appendix of the tools", "extension of the guidelines" and "project's own guidelines" are cited only to rows, not to s-tj38pvm38nepaf5, s-5x737t9nee4zgaa, s-vj7ercem526zd6v, s-2r7k2aeyusgy6fw, s-a4rbry4hsu34hy8, s-mbmnsnxenmavu3z and s-u7tw6m8npxmv5tu · ✓
- 7.3.1 The title: ✓ · ✓ · ✓
- 7.3.2 Thoughts and sentences: ✓ · ✓ · ✗ "accepts these files only in the repository…, which the SpecSheriff tools recognise by an environment variable" states two facts
- 7.3.3 The contents of a node: ✓ · ✓ (the cases are needed together: the appendix of the tools and a project's own guidelines link to the same rules with different types) · ✓
- 7.4.1 Counts in prose: ✓ · ✓ · ✓
- 7.4.2 The reason: ✗ "The folder of each node's file shows…" comments on the text's definition · ✗ the reason says why each link type is chosen, not why the check exists · ✗ "A copy is found by its path, since a project keeps nothing else at these paths" comments on the list and claims what no rule states
- 7.5.1 Superfluous rules: ✓ · ✓ · ✓
- 7.5.2 The length of a sentence: ✓ · ✗ "refuses each such node in the files that the repository keeps that lacks that link" (the second "that" clause can attach to "repository") · ✓
- 7.5.3 Rules as tables: ✓ · ✓ · ✓
- 7.6.1 The language of the specification: ✓ · ✓ · ✓
- 7.6.2 Capital letters: ✓ · ✓ · ✓
- 7.6.3 Examples: ✓ · ✗ "since a project's own guidelines … never implement them" suggests that the `implements` link itself is refused, which the text does not say · ✓
- Pairing test of the reason: ✓ · ✗ sentence 1 justifies the list items in order and sentence 2 justifies item 3 · ✗ sentences 1–2 justify paragraph 1's first sentence and sentence 3 justifies the list

**Оценка, D1**
- согласованность: ✗ условие «репозиторий хранит `specs/_guidelines/spec.json`» противоречит согласованному s-zefk589ykh37b8u. По нему этот репозиторий инструменты узнают только по `SPECSHERIFF_GUIDELINES_REPO`. С s-chk5hnzmcpeqj25, s-zyaf34chxugtjyn и принципами расхождений нет.
- целостность: ✓ сверено с s-qzyacnqwvaeaps4, s-6bmnsbskg6en4nf, s-bpdqd9v72wg7vsz и s-mbmnsnxenmavu3z. Изменения в impl.json и снятие todo строки уже в списке долгов.
- целесообразность: ✓ в репозитории guidelines такая связь разрешается и проходит все прочие проверки.
- избыточность: ✗ третий абзац повторяет s-qzyacnqwvaeaps4.
- недостаточность: ✓ не найдена.

**Оценка, D2**
- согласованность: ✗ третий пункт требует `refines` и от правила, которое расширяет. Согласованный 6.1 (s-sn6au3vcr9uy5pm) определяет `refines` только как «точнее или для более узкого случая». Решение 2026-10-30 на 2.5 («refines or implements») заменено решениями 2026-11-08 и 2026-11-13.
- целостность: ✗ 6.1 нужно расширить раньше, и сделать это без показа владельцу нельзя:
  - решение 2026-11-11 не даёт формулировки, а слово «расширяет» нигде не определено;
  - новое значение затронет каждую связь `refines`: s-e6stjaxkn44ys4m, s-gpzs5fcxvp6jkrp, s-z3dnru6qqdf9m6j (вариант RecordType «расширяет» поля через `refines`) и s-2r7k2aeyusgy6fw;
  - формулировка должна отделить `refines` от `implements`, хотя s-mm2de262g3jkapu говорит, что приложение «расширяет и уточняет» базу;
  - формулировка не должна разрешать ослабление правила (s-m42rsngtayk9g3g).

  Показать 6.1 как предложение, без рецензента, до D2.
- целесообразность: ✓ узел без связи не найдут, когда изменится правило, на которое он опирается (обоснования s-mm2de262g3jkapu и s-uxtyyen92jygth4).
- избыточность: ✗ обоснование пересказывает 6.1. Первое предложение второго абзаца текста повторяет первый абзац.
- недостаточность: ✗ в stage3 сказано «a section is no target», а пункт 1, как и строка 10.1.22, принимает любой узел базовой спецификации. Пример и stage3 («expect an `implements` link refused») расходятся с текстом.

**Оценка, D3**
- согласованность: ✓ сверено с s-zefk589ykh37b8u, s-bsya3febm6u64ab и s-rnbm4v8hsta6heq. `tools.json` покрывает s-zefk589ykh37b8u.
- целостность: ✓ s-zefk589ykh37b8u остаётся верным, а список совпадает с третьим столбцом его второй таблицы.
- целесообразность: ✓ копия незаметно отстаёт от действующих файлов.
- избыточность: ✗ придаточное о переменной окружения повторяет s-zefk589ykh37b8u.
- недостаточность: ✗ найдя копию, код прекращает остальные проверки (validate.ts:44), а узел этого не говорит. Без такой остановки s-vke5hakwf3uyrjs отверг бы каждый sid копии как повтор (вывод).

**Verdict.** D1 and D3 pass after the fixes. D2 is not ready. Only the widening of rule 6.1 needs the owner; the agent settles everything else.

**D1**
- DOUBT, settled by the agreed s-zefk589ykh37b8u: replace paragraph 2's first sentence with "`sheriff validate` makes this check only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u)." / «Эту проверку `sheriff validate` делает только в репозитории, где пишутся SpecSheriff guidelines (§s-zefk589ykh37b8u).» Then merge paragraphs 1 and 2.

**D2**
- DOUBT for the owner: rule 6.1 is widened first (целостность).
- WORDING FIX, reason: "A node linked to the rule it builds on is found whenever that rule changes. Only a reader can judge whether the two still agree." / «Узел, связанный с правилом, на которое он опирается, находят при каждом изменении этого правила. Согласуются ли они, решает только читатель.»
- WORDING FIX: paragraph 1 becomes "In the files that the repository keeps, `sheriff validate` refuses each of the following nodes, other than a section, that lacks the link named for it:" / «В файлах, которые хранит репозиторий, `sheriff validate` отвергает каждый из следующих узлов, кроме раздела, у которого нет названной для него связи:». Drop paragraph 2's first sentence. "which part" becomes "which part of the specification" / «к какой части спецификации».
- WORDING FIX, example: "`sheriff validate` refuses the rule, since it declares no `refines` link." / «`sheriff validate` отвергает правило: у него нет связи `refines`.»
- Stage 3: apply "a section is no target" to items 2 and 3 only.
- TERM `refines`: it fits [SysML] refine only partly (inference). Keep it under the owner's ruling and add a gloss in the docs.

**D3**
- WORDING FIX: replace paragraph 2 with a second sentence in paragraph 1: "It accepts such a file only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u)." / «Такой файл он принимает только в репозитории, где пишутся SpecSheriff guidelines (§s-zefk589ykh37b8u).» Russian: «…файлов, которые общие для всех проектов и поставляются…».
- DOUBT: add "While the repository keeps a copy, `sheriff validate` makes this check alone." / «Пока репозиторий хранит копию, `sheriff validate` делает только эту проверку.»

**D1 and D3**
- CUT: the last sentence of each reason. In D1, also paragraph 3 and its link to s-qzyacnqwvaeaps4.

**D1 and D2**
- WORDING FIX: cite the defining nodes listed under 7.2.7 where each term first appears.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/skills/tools/src/validate.ts`