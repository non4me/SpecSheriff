The four drafts are not ready to show yet. Three can be fixed by the agent alone. The capitals node needs one answer from the owner first.

The skill `specsheriff-terminology-review` was in context. `node .claude/vt/writing-rules.mjs` ran, and the checklist below comes from its output. Labels used below:
- **D1:** s-qzyacnqwvaeaps4 (links and citations)
- **D2:** s-pvnnr844f3y964m (links between terms)
- **D3:** s-e2vdhfsndy5stq9 (capitals)
- **D4:** s-zhen42p6mnaxu7w (sections)

## Checklist

| Rule | D1 | D2 | D3 | D4 |
|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✗ "since a quotation keeps the spelling of what it quotes" is a reason inside the text | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✗ "location", "the index of sections in a domain's header", "the values gathered beside a field" | ✗ "term node" (6.5 and row 10.1.15 do not define it), "location" | ✗ "location" | ✗ "location", "the RecordType extension" |
| 7.3.1 The title | ✓ | ✗ "The types of a link between terms": the node also refuses a `term-relation` or `uses` link that is not between terms | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✗ "a link whose target is a sid that no node of the model of the specification holds": row 10.1.12 can be checked without the definition of a citation | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✗ "So every property is read except those that hold links, other nodes or values built from other nodes" restates the text, and nothing says why links and citations are checked | ✓ | ✗ explains the two criteria, not why the check exists | ✗ "The kinds of the nodes under a section show whether it contains a rule…" justifies paragraph 2 |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✗ "in which a citation does not count" repeats "except" | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ (the run in the example is outside the parts 7.1 names) | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✗ "Two abbreviations in a row, such as REST API, pass" is not the mistake closest to the typical case | ✓ (has none; one proposed below) |
| Pairing test | ✗ sentences 1–2 justify paragraph 4 and sentence 3 justifies paragraph 3, one paragraph each; only the order is reversed | ✓ | ✗ sentences 1–2 justify list item 1 and sentence 3 item 2, in order | ✗ sentences 1–2 justify paragraph 1 and sentence 3 paragraph 2, in order |

## Оценка

**D1 s-qzyacnqwvaeaps4**
- согласованность: ✓ — правило 6.3 (s-cxtt6jvhqcey2k9), строки 10.1.12–10.1.14, согласованный узел «The model of the specification» (s-w6gybeqn2ttydqx), решение по строке 10.1.12 от 2026-11-13, правило 8.6.
- целостность: ✓ — s-nh8b2hjvzasdxmd по-прежнему верно ссылается на этот узел ради ссылок; с s-agc6fb3vx46pc23 и s-qvgzubkrafadqgf узел не пересекается.
- целесообразность: ✗ — обоснование не называет проблему: связи, указывающие на узел, неполны, если у ссылки нет связи.
- избыточность: ✗ — «in which a citation does not count» повторяет «except»; последний абзац о ячейках `TableRule` уже следует из «every property».
- недостаточность: ✗ — не объяснены «location», указатель разделов и собранные значения; пункт 2 предполагает, что у процитированного sid есть узел; «up to a space» уже, чем код (любой пробельный символ), и одиночный `§` не определён.

**D2 s-pvnnr844f3y964m**
- согласованность: ✓ — правило 6.5 (s-76dutms9uv6uha2), строка 10.1.15 и её графа «refused, and settled with the specification's owners», решение от 2026-11-10 об удалении NodeKind.
- целостность: ✓ — термин, ссылающийся на термин через `term-relation`, проходит и этот узел, и D1; на узел никто не ссылается.
- целесообразность: ✓ — проблема названа.
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — не сказано, проверяются ли узлы в ячейках `TableRule`: D1, D3 и согласованный s-vke5hakwf3uyrjs говорят это явно, а код такие узлы не обходит. «term node» и «location» не объяснены.

**D3 s-e2vdhfsndy5stq9**
- согласованность: ✗ — узел отвергает «HTTP REST API», как требуют правило 7.6.2 (s-m6upmfq64kw5h4r) и критерий строки 10.1.17, но второе предложение той же строки называет аббревиатуры исключением. С правилами 7.1, 7.6.1 и решением от 2026-11-13 расхождений нет.
- целостность: ✓ — на узел никто не ссылается; читаемые части совпадают с перечнем правила 7.1 (s-qeensty237e6mmm).
- целесообразность: ✗ — обоснование объясняет критерии, а не то, зачем нужна проверка.
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — не сказано:
  - что отделяет слово: в коде соседняя буква, цифра или подчёркивание;
  - какие двойные кавычки: в коде прямые и типографские;
  - что читается в элементе-объекте `TextRule.list`.

  «location» не объяснено.

**D4 s-zhen42p6mnaxu7w**
- согласованность: ✓ — правила 8.1 (s-7445ahgjck2aefg), 8.2 (s-pctqj9wqaq8762t), 8.6, 12.3a (s-ktfstpv8rurznrp), 1.3.3, 2.6, решение от 2026-11-10 о собственном типе узлов.
- целостность: ✓ — перечень покрывает все типы узлов схемы, расширений и собственные типы проекта; код считает правилом то же множество типов.
- целесообразность: ✓ — проблема реальна и названа.
- избыточность: ✗ — «whatever its status» и третье предложение обоснования.
- недостаточность: ✗ — не объяснены «location» и «the RecordType extension».

## Findings

The 300-word limit was applied to each node separately, since there are four.

### D1 — passes after the fixes below; the agent can settle all of them
- **WORDING FIX (7.2.7):**
  - Item 4 → "a citation by location (§s-kag2m9tzdnduxdx, §s-whftqmshzc5wzhw)." / «ссылка по расположению (§s-kag2m9tzdnduxdx, §s-whftqmshzc5wzhw).»
  - Third excluded property → "the index of the sections in a domain's header (§s-2r59txnms5serdr) and the values gathered in a field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh), which are built from other nodes." / «указателя разделов в заголовке домена (§s-2r59txnms5serdr) и значений, собранных в `x-enumSource.gathered` поля (§s-ju5vcanbjph7mgh): они построены из других узлов.»
  - Add the three `cites` links.
- **WORDING FIX:** item 2 → "a sid other than its own that the node cites without declaring a link whose target is that sid (§s-vwyke96ggxx79je);" / «sid, кроме собственного, на который узел ссылается, не объявляя связи, цель которой — этот sid (§s-vwyke96ggxx79je);».
  - Delete "A citation of the node's own sid needs no link." / «Ссылка узла на собственный sid связи не требует.»
  - The exception then sits with the item it narrows, and the item no longer assumes the cited sid exists.
- **DOUBT (agent):** "followed by anything else, up to a space" → "followed by one or more other characters, up to a whitespace character" / «за которым следует один или более других знаков, до пробельного символа». This is what model.ts:114 does.
- **DOUBT (agent, 7.3.3):** move row 10.1.12 into a node of its own. The sid stays with the citations, which is what s-nh8b2hjvzasdxmd cites it for.
- **WORDING FIX (reason):** "Whoever changes a node learns from the links pointing at it which nodes rely on it (§s-cxtt6jvhqcey2k9). Those links are complete only where every citation, in whatever property of a node it stands, names a node by its sid and is matched by a declared link." / «Тот, кто меняет узел, узнаёт, какие узлы на него опираются, по связям, указывающим на него (§s-cxtt6jvhqcey2k9). Эти связи полны, только если каждая ссылка, в каком бы свойстве узла она ни стояла, называет узел по его sid и ей соответствует объявленная связь.»
- **CUT:**
  - ", in which a citation does not count" / «, в которых ссылка не учитывается».
  - The author decides on the last paragraph.

### D2 — passes after the fixes below; the agent can settle all of them
- **DOUBT (agent, the scope the group decided):** paragraph 2 → "…that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6)." / «…которую объявляет узел спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6), …».
- **WORDING FIX (7.2.7):** "from a term node (§s-ypa92gpcj3f5zj8) to another term node (§s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx)" / «от узла-термина (§s-ypa92gpcj3f5zj8) к другому узлу-термину (…)», citing it as s-vke5hakwf3uyrjs does. Also "its location (§s-kag2m9tzdnduxdx)".
- **WORDING FIX (reason):** the reference to 7.2.4 Naming is attached to "only the owners can decide", which 7.2.4 does not say. Replace with "…how the entities (§s-9w3u3wn37wksyxd) that they name relate, which is for the specification's owners to decide." / «…как соотносятся сущности (§s-9w3u3wn37wksyxd), которые они называют, а решать это ответственным за спецификацию.»
- **WORDING FIX (title):** "Link types reserved for terms" / «Типы связей, закреплённые за терминами».
- **TERM:** the example says "in which ratio".
  - The property is the link's `ratio`, which the schema describes as the UML multiplicity at each end. [AM4] relationships also carry a multiplicity (registry).
  - The plain word "ratio" is a false friend: in ordinary English it means a quotient.
  - Recommended: "and with which `ratio`" / «и с каким `ratio`». Renaming the key would need a schema migration and is out of scope.
- **Code note:** the second message at validate.ts:150 does not name the link's target. The stage-3 note should say so.

### D3 — not ready until the owner answers the DOUBT; the agent settles the rest
- **DOUBT (owner):** the node refuses three abbreviations in a row, such as HTTP REST API, as 7.6.2 and the criterion of row 10.1.17 require.
  - The row's second sentence, dictated by the owner, names abbreviations as an exception, so a reader of the row expects them to pass.
  - t25-one-thought.md line 1226 planned to raise this with the owner at this step. On 2026-11-20 the agent settled it without asking (line 86).
  - The source of the conflict is the row. Recommended: the row's exception reads "abbreviations…, one or two in a row". Show the example below together with the question.
- **WORDING FIX (1.2.3 and the reason):** cut ", since a quotation keeps the spelling of what it quotes (§s-7anvune6h4f6mbr)" from the text. New reason: "The check does not understand the text, so it recognises a phrase set in capitals by its form alone. That form is drawn exactly, so that ordinary capitalisation and quotations, which keep the spelling of what they quote (§s-7anvune6h4f6mbr), are never refused." / «Проверка не понимает текста, поэтому распознаёт фразу, набранную заглавными, только по её форме. Эта форма определена точно, чтобы обычное написание с заглавной и цитаты, которые сохраняют написание того, что цитируют (§s-7anvune6h4f6mbr), никогда не отвергались.»
- **WORDING FIX (the Russian drops "three or more"):** «слова подряд — это три или более таких слова, между которыми только пробелы или табуляции;».
- **WORDING FIX (example):**
  - Put "WITHOUT ANY EXCEPTION" in double quotation marks.
  - Third sentence → "The closest mistake is to let three abbreviations in a row, such as HTTP REST API, pass: `sheriff validate` refuses them too." / «Ближайшая ошибка — пропустить три аббревиатуры подряд, например HTTP REST API: `sheriff validate` отвергает и их.»
- **DOUBT (agent, matching validate.ts:158-172):**
  - Item 1 adds "and has no letter, digit or underscore immediately before or after it" / «и непосредственно перед ним и после него нет буквы, цифры или подчёркивания».
  - Item 3 → "straight or typographic double quotation marks" / «прямых или типографских двойных кавычках».
  - "the text in each member" → "each string in each member" / «каждую строку в каждом элементе».
- **WORDING FIX (7.2.7):** "its location (§s-kag2m9tzdnduxdx)".
- **TERM:** "word set in capitals" has no established equivalent. [BCP14] keywords such as MUST NOT are at most two words, so they pass, which agrees with 7.6.2 (inference). No change needed.

### D4 — passes after the fixes below; the agent can settle all of them
- **CUT (pairing test):** the third sentence of the reason / «Типы узлов под разделом показывают, есть ли в нём правило, без чтения их формулировок.»
- **CUT:** ", whatever its status" / «, каким бы ни был его статус».
  - "its" can be read as the section's or the rule's.
  - The code checks every section and counts a rule of any status, and the text says that without the phrase.
- **WORDING FIX (7.2.7):** "its location (§s-kag2m9tzdnduxdx)" and "the RecordType extension (§s-hzuzn8hbq6q9q4s)", citing it as s-vke5hakwf3uyrjs does.
- **DOUBT (agent, example):** "A section holds only a nested section, whose last rule was moved to another file. `sheriff validate` refuses both sections, since neither contains a rule. The closest mistake is to refuse only the nested section." / «Раздел содержит только вложенный раздел, последнее правило которого перенесено в другой файл. `sheriff validate` отвергает оба раздела, потому что ни в одном из них нет правила. Ближайшая ошибка — отвергнуть только вложенный раздел.»

**Only one finding needs the owner:** the D3 question on abbreviations. The agent can settle everything else. I found no contradiction with the agreed drafts in tools-drafts.json.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-one-thought.md (lines 86 and 1226)
- D:/SpecSheriff/skills/tools/src/validate.ts (lines 150 and 158-172)
- D:/SpecSheriff/skills/tools/src/model.ts (line 114)