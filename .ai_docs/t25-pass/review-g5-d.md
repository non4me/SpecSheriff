## Item 46a: `s-5nf87c3e3jg9v7c`, "Where the values of a field with `enum` are collected"

**Checklist**
- 1.2.3 Text and reason ✓
- 7.1 Goal and reader ✗ "its own list: the members of the field's `enum`, in their order". This is the only source given with no condition for when it applies.
- 7.2.1 Who must act ✓
- 7.2.2 Order ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✓. "A field with `enum`" was settled by the owner's ruling of 2026-11-19 (see TERM below).
- 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✗ "the names of the parts of the base specification (§s-gqavjzcmubg5pvk)". "Base specification" lacks §s-5x737t9nee4zgaa, which all 10 agreed drafts cite at first use.
- 7.3.1 Title ✓ · 7.3.2 Thoughts and sentences ✓ · 7.3.3 Contents of a node ✓
- 7.4.1 Counts ✓ · 7.4.2 Reason ✓
- 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓
- 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 Examples ✓
- Pairing test ✓

**Оценка**
- согласованность: ✗ (вопрос владельцу). Без расширения Domains источник `parts` даёт только `base` и `contracts`. Правило 12.11 ссылается на 1.1.2, где базовая спецификация делится на разделы, и говорит: «A part added or removed adds or removes a value». Пункт 47 этой же группы считает частью системы без Domains раздел верхнего уровня `specs/base/`. С Domains прочтение автора совпадает с примером 12.11, с согласованным 8.5 и с s-ygg5kpcxgzq3m7w. Сравнивал также с 12.7, 12.8, 12.9, 3.1, s-ztseyetus7np6br, s-agc6fb3vx46pc23, s-a8fn72xa782wvbk и s-4npdup7mjkva69y.
- целостность: ✓. s-c2r9jndrjbtbsv6 и s-dk3zfkbhc3v6xbp остаются верными. s-4npdup7mjkva69y повторяет порядок значений; это закроет пункт 56, и в заметках это названо. Согласованные s-ztseyetus7np6br и s-agc6fb3vx46pc23 пишут «a field that has an `enum`», то есть тот же термин в другом написании. Это нужно записать в файл продолжения.
- целесообразность: ✓. Один способ сбора значений нужен `reindex`, `validate`, проверке вариантов и `types`, поэтому деление узла по 7.3.3 оправдано.
- избыточность: ✗. Первое предложение второго абзаца повторяет s-zefk589ykh37b8u. Первое предложение третьего абзаца по-русски звучит как тавтология.
- недостаточность: ✗. Не сказано, когда применяется первый источник.

**Verdict: not ready.**

- **DOUBT (owner):** what the source `parts` gives without the Domains extension. See the list at the end.
- **WORDING FIX (author):** the first list item.
  - EN: "its own list, where the field's schema holds `enum`: the members of that `enum`, in their order;"
  - RU: «его собственный перечень, если схема поля содержит `enum`: элементы этого `enum` в их порядке;»
- **WORDING FIX (author):** in the second list item, cite "(§s-gqavjzcmubg5pvk, §s-5x737t9nee4zgaa)" in both languages, and add a `cites` link to s-5x737t9nee4zgaa.
- **CUT (author):** delete "The folders that hold the parts … the folder of each domain." / «Папки, в которых хранятся части … папка каждого домена.» The cited s-zefk589ykh37b8u already lists these folders, with the condition under which each applies. The sentence leaves that condition out. The example already shows `contracts`.
- **CUT (author):** merge the first two sentences of the third paragraph.
  - EN: "`sheriff reindex` writes each value collected from the names of the parts or from the sids into the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br), together with the sid of the node that the value comes from. It writes the values in the order of those nodes: …"
  - RU: «`sheriff reindex` записывает каждое значение, собранное из имён частей или из sid, в `x-enumSource.gathered` поля (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br) вместе с sid узла, из которого это значение приходит. Записывает он значения в порядке этих узлов: …»
- **WORDING FIX (author, Russian only):**
  - «sid узлов собственного типа в проекте». This is the owner's term in terms-ru.md and what the agreed drafts use.
  - In the example, «записи журнала аудита» instead of «записи audit log».
- **TERM:** "a field with `enum`" against the JSON Schema 2020-12 keyword `enum`.
  - Fit: partial. The schema in `moved/` says a field with `x-enumSource` never also has `enum`, yet the method calls it "a field with `enum`".
  - The owner decided this name on 2026-11-19 (rows 12.12.9, 12.12.11 and 12.12.12). Recommendation: keep it, apply the first fix above, and add a gloss in the docs (inference). Cost: none in the nodes.

[check] points:
- The split holds.
- Including `contracts` holds: the example in 12.11 and rule 3.1 both support it.
- Taking the first top-level node of the first file holds: it follows from 8.5's "a part … opens with", and no rule names another node.
- None of the gaps outside the group is a defect of this draft.

## Item 46b: `new:tools-7-1-enum-values` (s-dk3zfkbhc3v6xbp), "The values and the source of a field with `enum`"

**Checklist**
- 1.2.3 ✓ · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓
- 7.2.4 ✓ (same as 46a) · 7.2.4.1–7.2.4.5 ✓
- 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓
- 7.3.1 Title ✗ "The values and the source of a field with `enum`". Node 46a is also about the values and the source, so the title does not set this node apart.
- 7.3.2 ✓ · 7.3.3 ✓
- 7.4.1 Counts ✓. "Both of the following" is the wording of five agreed drafts.
- 7.4.2 Reason ✗ "or whose source names a kind that no node can have". `TextRule`, the example's case, is a kind that many nodes have. The reason also leaves out the repeated value.
- 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓
- 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓
- Pairing test ✓

**Оценка**
- согласованность: ✓. Сравнивал с 12.7, 12.8, 8.3, 5.2, строками 12.12.11–12.12.13 и решениями по ним, с s-czxaqvaesmu3gru (та же формулировка о `kinds`) и с s-xzcw3hv4hmxz7h7 (проект не может объявить `TextRule` своим типом). Мета-схема JSON Schema 2020-12 задаёт для `enum` только `{"type":"array","items":true}`. Значит, оба условия нужны.
- целостность: ✓. Изменение `moved/impl.json` в заметках названо. Форма отказа расходится с пунктом 44; это исправление ниже.
- целесообразность: ✗. Обоснование не называет проблему, которую решает второе условие.
- избыточность: ✓.
- недостаточность: ✗. Не сказано, как отказ называет вложенное поле, например элементы списка. Тот же пробел есть в пункте 44.

**Verdict: not ready.**

- **WORDING FIX (author), title:**
  - EN: "Which fields with `enum` `sheriff validate` accepts"
  - RU: «Какие поля с `enum` принимает `sheriff validate`»
- **WORDING FIX (author), reason.** Also add a `cites` link to s-mt6auv3jz8m5gzh.
  - EN: "The types and RuntimeChecks of a field are generated from its values (§s-e877bnfa559tvk9). A field with no value, or with values that break the rules on their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), would therefore carry its mistake into the code."
  - RU: «Типы и RuntimeCheck поля генерируются из его значений (§s-e877bnfa559tvk9). Поэтому поле без значений или со значениями, которые нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), перенесло бы свою ошибку в код.»
- **WORDING FIX (author), first condition.** The current Russian «в том виде, в каком» means "in the form in which", not "as".
  - EN: "its source gives it at least one value when the SpecSheriff tools collect its values (…);"
  - RU: «когда инструменты SpecSheriff собирают его значения, его источник даёт ему хотя бы одно значение (…);»
- **WORDING FIX (author), what the refusal names.** This brings it in line with item 44.
  - EN: "The refusal also names the field, the condition that the field fails and, where that is the condition on the kind, the kind."
  - RU: «Отказ называет также само поле, условие, которое поле не выполняет, и, если это условие о типе узлов, сам тип.»
- **WORDING FIX (author), example.** In the current example the field and the kind are both called `chapter`, so "the field names `chapter`" can be read two ways.
  - EN: "The RecordType of a job's log entry has a field `step` whose `x-enumSource.from` is `kind` and whose `x-enumSource.kind` is `TextRule`. `sheriff validate` refuses the field and names `TextRule`. Once `x-enumSource.kind` names `jobStep`, a kind that the project's extension of the schema adds, and the base specification holds a node of that kind, the field passes. The most likely mistake is to accept `TextRule` because the schema of the SpecSheriff guidelines defines it."
  - RU: «У RecordType записи журнала задачи есть поле `step`, `x-enumSource.from` которого — `kind`, а `x-enumSource.kind` — `TextRule`. `sheriff validate` отвергает это поле и называет `TextRule`. Когда `x-enumSource.kind` называет `jobStep` — тип узлов, который добавляет расширение схемы проекта, — а в базовой спецификации есть узел этого типа, поле проходит проверку. Самая вероятная ошибка — принять `TextRule` на том основании, что этот тип узлов определяет схема SpecSheriff guidelines.»
- **DOUBT (author, for the whole group):** how a refusal names a field at depth. Items 44 and 46b do not say.
- **TERM:** `x-enumSource`. The `x-` prefix matches OpenAPI 3.1's specification extensions (§4.9, read during this review), so the fit is the same meaning. But `identifierOf`, also a SpecSheriff keyword (row 12.12.2), has no prefix, so one vocabulary follows two conventions. This goes to the owner.

[check] point: accepting only the project's own kinds holds. It follows from rule 12.8 and the agreed s-czxaqvaesmu3gru.

## Questions only the owner can answer

1. **What a field whose values are the names of the parts gets in a project without domains.** Under the draft, an audit-log field `part` gets only `base` and `contracts`.
   - **Folder names (as drafted).** Gain: the names stay stable, and the draft agrees with the agreed 8.5 and with how locations are computed. Cost: without domains the source is nearly useless, and 12.11's "a part added or removed adds or removes a value" almost never happens.
   - **One value per top-level section of `specs/base/`, plus `contracts`.** Gain: this agrees with 1.1.2, with 12.1 and with item 47. Cost: a section's name (its title or its location) changes when the section is reworded or moved, and no rule says which name to use.
   - I lean towards the sections (inference).
2. **One convention for SpecSheriff's own keywords inside a RecordType's `schema`:** with the `x-` prefix (`x-enumSource`) or without it (`identifierOf`). This is best settled with item 56. Cost: the schema, rows 12.12.2 and 12.12.3, and items 44 to 47.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group5-notes.md`, `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_schema/extensions/recordtype.schema.json`
