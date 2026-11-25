**Review of three group 1 drafts, round b.** D1 is `new:tools-7-1-guidelines-to-extension` (s-75r4pg4wdqu3gw5), "A link from the SpecSheriff guidelines to an extension". D2 is s-yprj7d6tnvauggr, "`implements` and `refines` links of the appendices and of a project's own guidelines". D3 is s-6bmnsbskg6en4nf, "Copies of the files that the plugin delivers". The terminology skill was loaded.

**Checklist** (D1 · D2 · D3)
- 1.2.3 A rule is made of its text and its reason: ✓ · ✓ · ✓
- 7.1 The goal, the reader and the scope: ✓ · ✓ · ✓
- 7.2.1 Who must act: ✓ · ✓ · ✓
- 7.2.2 The order of the text: ✓ · ✓ · ✓
- 7.2.3 General words: ✓ · ✓ · ✗ "in the plugin" and "from the plugin" call a specific thing something other than its name, which is "the SpecSheriff plugin"
- 7.2.4 Naming: ✓ · ✓ · ✓
- 7.2.4.1 Coined names: ✓ · ✓ · ✓
- 7.2.4.2 What a name says: ✓ · ✓ · ✓
- 7.2.4.3 A general word in a name: ✓ · ✓ · ✓
- 7.2.4.4 Properties: ✓ · ✓ · ✓
- 7.2.4.5 Relations to other entities: ✓ · ✓ · ✓
- 7.2.5 Definition by negation: ✓ · ✓ · ✓
- 7.2.6 Lists that restrict: ✓ · ✓ · ✓
- 7.2.7 Words that take their meaning from the specification: ✓ · ✗ in item 1, "an `implements` link" cites nothing at its first use; rule 6.1 is cited only later, at `refines` · ✓ ("copy" is defined in the next paragraph; rule 7.2.2 puts the main thought first, and rule 7.1 settles the conflict)
- 7.3.1 The title: ✓ · ✓ · ✓
- 7.3.2 Thoughts and sentences: ✓ · ✓ · ✓
- 7.3.3 The contents of a node: ✓ · ✓ · ✓
- 7.4.1 Counts in prose: ✓ · ✓ · ✓
- 7.4.2 The reason: ✓ · ✓ · ✓
- 7.5.1 Superfluous rules: ✓ · ✓ · ✓
- 7.5.2 The length of a sentence: ✓ · ✓ · ✗ "makes this check alone" can also be read as "makes this check by itself"
- 7.5.3 Rules as tables: ✓ · ✓ · ✓
- 7.6.1 The language of the specification: ✓ · ✓ · ✓
- 7.6.2 Capital letters: ✓ · ✓ · ✓
- 7.6.3 Examples: ✓ (D1 has none; one is proposed below) · ✓ · ✓
- Pairing test of the reason: ✓ · ✓ · ✓

**Оценка, D1**
- согласованность: ✓ сверено с s-chk5hnzmcpeqj25, s-zyaf34chxugtjyn, s-u7tw6m8npxmv5tu и s-zefk589ykh37b8u. Сверено и с s-a4rbry4hsu34hy8: описание инструментов не входит в guidelines, поэтому `tools.json` не читается. В moved/spec.json нет ни одной связи с узлом расширения.
- целостность: ✓ цитаты покрывает s-qzyacnqwvaeaps4. Строка 10.1.20a в impl.json пуста, и её заполнение уже есть в списке долгов.
- целесообразность: ✓ в репозитории guidelines такая связь разрешается и проходит все прочие проверки.
- избыточность: ✗ последнее предложение повторяет путь расширений из s-zefk589ykh37b8u.
- недостаточность: ✓ не найдена.

**Оценка, D2**
- согласованность: ✗ действующий 6.1 (s-sn6au3vcr9uy5pm) не разрешает `refines` для расширения, а пункт 3 этого требует. Расхождение снимает только Q3. Если Q3 принят, расхождений нет: сверено с s-694brc6fytwxc5v, s-9c8t99cz34p28sg, s-3dashdedvu4xgfb, s-mm2de262g3jkapu, s-uxtyyen92jygth4, s-2r7k2aeyusgy6fw и решениями на s-u7tw6m8npxmv5tu.
- целостность: ✓ строки 10.1.22–24 в impl.json указывают на узел. Пример второго варианта 6.1 описывает тот же случай и узлу не противоречит.
- целесообразность: ✓ узел без связи не найдут, когда изменится правило, на котором он строится.
- избыточность: ✓ текст ничего не повторяет. Обоснование по мысли совпадает с обоснованиями 2.2 и 4.2, а узел проводит эти правила в жизнь (вывод).
- недостаточность: ✗ `implements` не определён там, где встречается впервые.

**Оценка, D3**
- согласованность: ✓ сверено с s-rnbm4v8hsta6heq, s-bsya3febm6u64ab (решения 2026-11-08 и 2026-11-18) и s-zefk589ykh37b8u. С узлом «Validation against the schema» противоречия нет: проверка по схеме идёт перед проверками, читающими узлы.
- целостность: ✓ s-zefk589ykh37b8u остаётся верным. Поручение из t25-one-thought.md о файлах расширений выполнено.
- целесообразность: ✓ копия незаметно отстаёт от действующих файлов.
- избыточность: ✓ не найдена. Список шире третьего столбца: это признак, по которому проверка узнаёт копию.
- недостаточность: ✓ не найдена.

**Verdict.** All three drafts pass after the fixes below. D2 passes only once the owner accepts Q3. Every finding of review-g1-d.md is addressed, except the gloss of `refines` in the docs, which no note tracks. Every fix below is the author's to make.

**D1**
- CUT: the last sentence. It restates the path in s-zefk589ykh37b8u, and sentence 3 already cites that node.
- DOUBT, an example the author may add: "A rule of `spec.json` cites a rule of an extension. `sheriff validate` refuses the `cites` link that the citation requires." / «Правило `spec.json` цитирует правило расширения. `sheriff validate` отвергает связь `cites`, которой требует цитата.»

**D2**
- WORDING FIX: in item 1, "an `implements` link (§s-sn6au3vcr9uy5pm)" / «связь `implements` (§s-sn6au3vcr9uy5pm)».
- WORDING FIX: the Russian «кроме раздела, у которого нет…» reads as "a section that lacks the link". English: "…other than a section, where the node lacks the link named for it:" / «…кроме раздела, если у узла нет названной для него связи:».
- WORDING FIX: "It checks a node in a cell of a `TableRule` as it checks any other node." / «Узел в ячейке `TableRule` он проверяет так же, как любой другой узел.»
- The Russian reason drops "still" and "can": «Согласуются ли они по-прежнему, может судить только читатель.»
- Stage 3: validate.ts:462, through model.ts:55, reads the files of the extensions as the project's own guidelines. The note must say that only `specs/_guidelines/project.json` is read that way.

**D3**
- WORDING FIX: "The refusal names each copy. While the repository keeps a copy, `sheriff validate` makes only the check for copies." / «Отказ называет каждую копию. Пока репозиторий хранит копию, `sheriff validate` делает только проверку на копии.»
- WORDING FIX: "the SpecSheriff plugin" / «плагин SpecSheriff», in the text and in the reason. The reason should open with "In a project, the SpecSheriff tools read the files common to every project from the SpecSheriff plugin (§s-zefk589ykh37b8u)." / «В проекте инструменты SpecSheriff читают файлы, общие для всех проектов, из плагина SpecSheriff (§s-zefk589ykh37b8u).»

**TERM** `refines`, used for extending a rule, fits [SysML] refine only partly (inference). Keep it under the owner's ruling of 2026-11-11 and gloss it in the docs. No node changes.

**Only the owner can answer:** Q3 (`proposal:s-sn6au3vcr9uy5pm`), the widening of rule 6.1, on which D2 depends.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md`, `D:/SpecSheriff/skills/tools/src/validate.ts`, `D:/SpecSheriff/skills/tools/src/model.ts`