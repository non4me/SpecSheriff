I ran `node .claude/vt/writing-rules.mjs`, and the `specsheriff-terminology-review` skill was in context. I changed no file. I applied the 300-word limit to each draft separately.

**None of the seven drafts is ready.** Every one needs at least one small fix that the author can make. L still waits for Q1 and C still waits for Q2. Every finding of the second review (review-g1b-a to -d) on these seven drafts has been addressed. The one place where the author departed from a reviewer's wording is "the SpecSheriff plugin" in G's closest mistake. That follows the group's decision on naming the plugin, and it holds.

Labels used below:
- **L** is new:tools-7-1-location (s-ygg5kpcxgzq3m7w)
- **V** is s-agc6fb3vx46pc23
- **C** is s-e2vdhfsndy5stq9
- **T** is s-pvnnr844f3y964m
- **G** is new:tools-7-1-link-target (s-c4rn9fj4czk768b)
- **K** is s-6bmnsbskg6en4nf
- **E** is new:tools-7-1-guidelines-to-extension (s-75r4pg4wdqu3gw5)

## Checklist

| Rule | L | V | C | T | G | K | E |
|---|---|---|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ | ✓ ("run" is defined in paragraph 4, as round b accepted for "copy") | ✓ | ✓ | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ reason: "is read by people and agents but by none of the SpecSheriff tools, so it falls behind…" states two relations | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ (the runs in the example are quotations, and examples are outside what 7.1 lists) | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ (one wording fix below) | ✓ | ✓ | ✓ | ✓ (one wording fix below) |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## Оценка

**L**
- согласованность: ✓ — сверено с 8.5 и его предложением (Q1), 1.1.4, 1.1.5, 2.1, 3.1, 3.2, 8.6, 11.1.3, «Where the files are» и model.ts:67–110.
- целостность: ✓ — s-stxmhq3hgfndvn6 и proposal:s-ztseyetus7np6br ссылаются на узел и остаются верными; правки кода названы в stage 3.
- целесообразность: ✓ — 8.5 не говорит ни о ячейках, ни о нескольких файлах одной папки, ни о порядке файлов.
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — узлы `specs/_guidelines/tools.json` не получают расположения: описание инструментов не входит в guidelines (2.1), а код даёт им `_guidelines/tools`. Кроме того, узел не говорит, каково место термина.

**V**
- согласованность: ✓ — 1.3.8 и его решение от 2026-11-06, 6.4, 11.1.4, 12.9, строки 10.1.10, 10.1.16, 11.3.2 и 12.12.14, proposal:s-ztseyetus7np6br, «Validation against the schema…».
- целостность: ✓ — расположения сверяет s-stxmhq3hgfndvn6; s-95w92rnjuv3sst8 не проверяет разделы и заголовки, так что пересечения нет; зависимости перечислены в dependsOn.
- целесообразность: ✓ — построенное значение устаревает после правки или вписывается вручную.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

**C**
- согласованность: ✓ при ответе A на Q2 — 7.1, 7.6.1, 7.6.2, строка 10.1.17 и её решение от 2026-11-13, validate.ts:158–172.
- целостность: ✓ — stage 3 назван.
- целесообразность: ✓ — проблема названа.
- избыточность: ✓ — не найдено.
- недостаточность: ✗ — «typographic double quotation marks» не говорит, пропускаются ли «…» и „…“. Код пропускает только “…”.

**T**
- согласованность: ✓ — 6.5 и его решение от 2026-11-16, строка 10.1.15, 7.2.4, s-w6gybeqn2ttydqx, validate.ts:147–151.
- целостность: ✓ — связь с sid, у которого нет узла, отвергает только G.
- целесообразность: ✓ — проблема названа.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

**G**
- согласованность: ✓ — строка 10.1.12 и её решение от 2026-11-13, 2.3, 6.3, 6.4, s-w6gybeqn2ttydqx.
- целостность: ✓ — T и E эту проверку не повторяют; перенос в impl.json назван.
- целесообразность: ✓ — после архивации цели связь на неё остаётся.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

**K**
- согласованность: ✓ — 1.7.1, 2.5, строка 10.1.25, третий столбец «Where the files are».
- целостность: ✓ — «Where the files are» остаётся верным; stage 3 (`SPECSHERIFF_GUIDELINES_REPO`) назван.
- целесообразность: ✓ — копия незаметно отстаёт от действующих файлов.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

**E**
- согласованность: ✓ — 1.7.3, строка 10.1.20a и её todo, 2.1, 2.3, 6.4.
- целостность: ✓ — цитаты покрывает s-qzyacnqwvaeaps4.
- целесообразность: ✓ — в репозитории guidelines такая связь проходит все прочие проверки.
- избыточность: ✓ — не найдено.
- недостаточность: ✓ — не найдено.

## Findings

All of these are the author's to fix unless marked otherwise.

### L "How a node's location is computed": not ready
- **WORDING FIX (insufficiency):** the text gives no location to the nodes of `tools.json`. In paragraphs 2 and 8, and in the list items that name such a file:
  - EN: "a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix"
  - RU: «файл guidelines, описания инструментов (§s-a4rbry4hsu34hy8) или технического приложения»
  - Cite it at the first use and add the `cites` link. Rule 8.5 does not need this, because only this repository keeps that file.
- **WORDING FIX (insufficiency):** the term item should say what a term's place is.
  - EN: "a term (§s-ypa92gpcj3f5zj8), whose place is the term's name;"
  - RU: «термина (§s-ypa92gpcj3f5zj8), место которого — имя термина;»
- **WORDING FIX:** "Every other node's location" points back to the previous paragraph, which "Writing" does not allow. Join paragraphs 2 and 3.

### V "Values built from other nodes": not ready
- **WORDING FIX (a pointing-back phrase across paragraphs):** "says which of these values differs" → "names the value that differs" / «называет значение, которое отличается».
- **WORDING FIX:** the reason's first sentence also points back.
  - EN: "After an edit to one node, a value built from it stays out of date until `sheriff reindex` runs."
  - RU: «После правки узла значение, построенное из него, остаётся устаревшим, пока не запущен `sheriff reindex`.»
- **WORDING FIX (Russian example):** «ячеек которой» → «ячеек которого», which matches how L declines `TableRule`.

### C "A run of words in capitals": not ready, and still waits for Q2
- **WORDING FIX (pointing back):**
  - "In what it reads" → "In what `sheriff validate` reads" / «В том, что читает `sheriff validate`,»
  - "such words" → "words set in capitals" / «слова, набранных заглавными,»
- **WORDING FIX (insufficiency):** name the quotation marks exactly, as the code does.
  - EN: "Text in backticks, in straight double quotation marks or in curly double quotation marks (“…”) is left out."
  - RU: «Текст в обратных кавычках, в прямых двойных кавычках или в английских двойных кавычках (“…”) не учитывается.»
- **WORDING FIX (reason):** "drawn exactly" → "defined exactly". The Russian already says «определена».
- **WORDING FIX (example):** read literally, paragraph 4 leaves out words that appear in quotation marks. The example should say where the words stand in the rule's text.
  - EN: "…written as part of its sentence, outside backticks and quotation marks."
  - RU: «…вне обратных кавычек и кавычек.»

### T "Link types reserved for terms": not ready
- **WORDING FIX:** "refuses every other link" opens paragraph 2 but refers to paragraph 1. Join the two paragraphs.

### G "The target of a link": not ready
- **WORDING FIX:** the example's last sentence runs to about 50 words and holds several thoughts. Replace the colon after "keeps" with a full stop, and do the same after «репозиторий» in the Russian.

### K "Copies of the files that the SpecSheriff plugin delivers": not ready
- **WORDING FIX (7.3.2):** split the reason's second sentence.
  - EN: "A copy in the project's repository is read by people and agents, but by none of the SpecSheriff tools. So it falls behind the files in force unnoticed."
  - RU: «Копию в репозитории проекта читают люди и агенты, но не читает ни один инструмент SpecSheriff. Поэтому она незаметно отстаёт от действующих файлов.»

### E "A link from the SpecSheriff guidelines to an extension": not ready
- **WORDING FIX (example):** the example does not say whether the rule declares the link. If it does not, the refusal comes from s-qzyacnqwvaeaps4, not from this node.
  - EN: "A rule of `spec.json` cites a rule of an extension and declares the `cites` link that the citation requires. `sheriff validate` refuses that link."
  - RU: «Правило `spec.json` цитирует правило расширения и объявляет связь `cites`, которой требует цитата. `sheriff validate` отвергает эту связь.»

### Terms
- **K:** keeping a copy of a dependency's files in your own repository is what package managers call "vendoring" (unverified: it is not in the registry). The fit is only partial: a vendored copy is used by the build, while no SpecSheriff tool reads this copy. No change to the node; at most a gloss in the docs, which costs nothing.
- **C:** every RFC 2119 keyword is one or two words long, according to the registry. So this check never refuses a keyword on its own (inference). No change.
- No other draft introduces a term.

## The last step: the second review's fixes in the other drafts

Every fix the second review asked for is in tools-drafts.json, word for word, in all eleven drafts:
- s-stxmhq3hgfndvn6, new:tools-7-1-approval-by, new:tools-7-1-consumes and s-qvgzubkrafadqgf;
- s-qzyacnqwvaeaps4, s-zhen42p6mnaxu7w and s-yprj7d6tnvauggr;
- proposal:row-10-1-8, proposal:row-10-1-17 and proposal:s-ztseyetus7np6br.

The link changes are in place as well: `exempts` now links to s-6fw72j65jkqrfpf and no longer to s-dpe5kcz4eamv39g, and s-zhen42p6mnaxu7w cites s-9kfdycuq34beqvs. s-95w92rnjuv3sst8 had no fixes to apply.

There is one difference. In s-yprj7d6tnvauggr, the sentence the reviewer wrote now ends with "(§s-5fewsp22mmdz7y6)". That is the node's first mention of `TableRule`, so rule 7.2.7 requires the citation, and the difference holds. No fix is missing.

## Questions only the owner can answer

Nothing new. Q1 (rule 8.5) still decides L, and Q2 (row 10.1.17) still decides C.

Files used:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/extensions/domains.json
- D:/SpecSheriff/specs/_guidelines/tools.json
- D:/SpecSheriff/skills/tools/src/model.ts
- D:/SpecSheriff/skills/tools/src/validate.ts