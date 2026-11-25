I ran the checklist script (`node .claude/vt/writing-rules.mjs`) once. The `specsheriff-terminology-review` skill was in context. Labels used below:
- **T** is new:tools-7-1-link-target
- **D1** is s-qzyacnqwvaeaps4
- **D2** is s-pvnnr844f3y964m
- **D3** is s-e2vdhfsndy5stq9
- **D4** is s-zhen42p6mnaxu7w

None of the five drafts is ready yet. The author can fix four of them alone. D3 also waits for the owner's answer to Q4. Every finding of the first review on D1–D4 has been dealt with.

## Checklist

| Rule | T | D1 | D2 | D3 | D4 |
|---|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✗ item 1 puts five conditions into one clause | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ | ✓ | ✗ the first `TableRule` cites only §s-qeensty237e6mmm; §s-5fewsp22mmdz7y6 comes one sentence later | ✗ "derived status" in the reason cites nothing |
| 7.3.1 The title | ✓ | ✗ "Outgoing links" no longer sets the node apart from T and D2 | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✗ "can be followed, and only such a link is built into…" | ✓ | ✗ "…relate, which is for the specification's owners to decide" | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ (the runs in the example are outside what 7.1 lists) | ✓ |
| 7.6.3 Examples | ✓ (one addition proposed below) | ✓ | ✓ | ✓ | ✓ |
| Pairing test | ✓ | ✓ | ✓ | ✓ | ✓ |

## Оценка

**T s-c4rn9fj4czk768b**
- согласованность: ✓ — строка 10.1.12 (s-x8usyy38qa56k6a) и решение по ней от 2026-11-13; правила 1.2.2, 6.2, 6.4, 1.7.6; согласованный узел «The model of the specification» (s-w6gybeqn2ttydqx).
- целостность: ✓ — узел не пересекается ни с D1, ни с s-75r4pg4wdqu3gw5. Перенос строки 10.1.12 в moved/impl.json назван в group1-notes.md.
- целесообразность: ✓ — проблема реальна: после архивации цели связь на неё остаётся.
- избыточность: ✓ — повторов не найдено.
- недостаточность: ✓ — цели из плагина и узлы в ячейках покрыты ссылкой на модель спецификации.

**D1 s-qzyacnqwvaeaps4**
- согласованность: ✓ — правило 6.3, строки 10.1.13 и 10.1.14, правила 8.5, 8.6, 11.1.4, 12.9; согласованные s-vke5hakwf3uyrjs и new:tools-7-1-validate.
- целостность: ✓ — s-nh8b2hjvzasdxmd по-прежнему верно ссылается на узел ради ссылок.
- целесообразность: ✓ — проблема названа.
- избыточность: ✓ — повторов не найдено.
- недостаточность: ✗ — во фразе «one or more other characters» неясно, «другие» по сравнению с чем. Поэтому sid, за которым идёт строчная буква, не отнесён явно ни к одному из двух случаев.

**D2 s-pvnnr844f3y964m**
- согласованность: ✓ — правила 6.1 и 6.5, строка 10.1.15 и её графа «On failure», решение от 2026-11-10 об имени NodeKind, s-vke5hakwf3uyrjs.
- целостность: ✗ — связь `term-relation` или `uses` от термина к sid без узла отвергают два узла: этот, с отсылкой к ответственным, и T.
- целесообразность: ✓ — проблема названа.
- избыточность: ✓ — повторов не найдено.
- недостаточность: ✗ — из-за слова «another» узел отвергает связь термина с самим собой. Код такую связь принимает, и ни одно правило этого запрета не требует.

**D3 s-e2vdhfsndy5stq9**
- согласованность: ✗ — узел зависит от ответа на Q4: вторая фраза строки 10.1.17 называет аббревиатуры исключением, а её критерий и правило 7.6.2 их не исключают. С правилами 7.1 и 7.6.1 и с решением от 2026-11-13 расхождений нет.
- целостность: ✓ — узел читает те части узла, которые перечисляет правило 7.1. Примеры и заголовки столбцов он не читает, как и следует из 7.1 (вывод), хотя строка 10.1.17 говорит «No sentence».
- целесообразность: ✓ — проблема названа.
- избыточность: ✓ — повторов не найдено.
- недостаточность: ✗ — «of any script» грамматически относится и к дефисам. Код принимает заглавные буквы любой письменности, а дефис только ASCII.

**D4 s-zhen42p6mnaxu7w**
- согласованность: ✓ — правила 8.1, 8.2, 8.6, 12.3a, 1.3.8, а также 2.1: описание инструментов не входит в guidelines, поэтому может назвать расширение. Также s-vke5hakwf3uyrjs.
- целостность: ✓ — перечень совпадает с кодом: правилом считается узел любого типа, кроме раздела и заголовка.
- целесообразность: ✓ — проблема названа.
- избыточность: ✓ — повторов не найдено.
- недостаточность: ✗ — в обосновании «derived status» стоит без ссылки, а «it» ни на что не указывает. По-русски написано «выведенный статус» вместо принятого «статус одобрения».

## Findings

I applied the 300-word limit to each node separately.

### T — "The target of a link": not ready; passes after the author's fixes
- **WORDING FIX** (the owner's rule "A rule says what holds"; the group's decision on form). Replace the first two sentences:
  - EN: "`sheriff validate` accepts a link only where its target is the sid of a node of the model of the specification (§s-w6gybeqn2ttydqx, §s-x8usyy38qa56k6a). It refuses any other link that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6)."
  - RU: «`sheriff validate` принимает связь, только если её цель — sid узла модели спецификации (…). Любую другую связь, которую объявляет узел спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (…), он отвергает.»
- **WORDING FIX (7.3.2)** in the reason:
  - EN: "Only a link whose target is a node of the specification can be followed. Only such a link is built into that node, among the links pointing at it (§s-bpdqd9v72wg7vsz)."
  - RU: «По связи можно перейти, только если её цель — узел спецификации. Только такая связь строится в этом узле среди связей, указывающих на него (…).»
- **DOUBT (author; the example).** Add the closest mistake, which comes from the text's two scopes:
  - EN: "The closest mistake is to look for the target only among the nodes of the files that the repository keeps: a rule of a project's own guidelines refines a rule of the SpecSheriff guidelines, which the project takes from the plugin, and `sheriff validate` accepts that link."
  - RU: «Ближайшая ошибка — искать цель только среди узлов файлов, которые хранит репозиторий: правило собственных guidelines проекта уточняет правило SpecSheriff guidelines, которые проект берёт из плагина, и `sheriff validate` принимает эту связь.»
- **TERM:** a link to a missing target matches OpenFastTrace's "orphaned" link only in part (inference, unverified): OpenFastTrace's term covers coverage links only. Recommendation: a note in the docs table, no change to the node. Cost: none.

### D1 — "Outgoing links and citations": not ready; passes after the author's fixes
- **WORDING FIX (7.3.1)** in the title: "Citations and the links that match them" / «Ссылки и соответствующие им связи».
- **WORDING FIX:**
  - EN: "Any other `§` followed by one or more characters, up to a whitespace character, a comma, a semicolon or a closing parenthesis, is a citation by location, unless it is in text in backticks."
  - RU: «Любой другой `§`, за которым следует один или более знаков до пробельного символа, запятой, точки с запятой или закрывающей скобки, — ссылка по расположению, если только он не стоит в тексте в обратных кавычках.»

### D2 — "Link types reserved for terms": not ready; passes after the author's fixes
- **DOUBT (author).** The word "another" adds a restriction that no rule requires. Replace the first sentence's condition:
  - EN: "…only where both of its ends are term nodes (§s-ypa92gpcj3f5zj8, §s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx)."
  - RU: «…только если оба её конца — узлы-термины (…).»
  - If the author does mean to refuse a link from a term to itself, that is a question for the owner.
- **WORDING FIX (7.3.2)** in the reason:
  - EN: "Whether two terms are bound, and how, says how the entities (§s-9w3u3wn37wksyxd) that they name relate. The specification's owners decide that, so the refusal sends whoever wrote the link to them, rather than suggesting a type."
  - RU: «Связаны ли два термина и как, говорит о том, как соотносятся сущности (…), которые они называют. Это решают ответственные за спецификацию, поэтому отказ отсылает автора связи к ним, а не подсказывает тип.»
- **DOUBT (author; overlap with T).** Add to paragraph 2, together with a `cites` link:
  - EN: "It checks only a link whose target is a node of the model of the specification (§s-w6gybeqn2ttydqx)."
  - RU: «Он проверяет только связь, цель которой — узел модели спецификации (…).»

### D3 — "A run of words in capitals": not ready until the owner answers Q4
- The open question for the owner is already in group1-notes.md as Q4 (`proposal:row-10-1-17`).
- **WORDING FIX (7.2.2; it also fixes "of any script").** Replace paragraph 3:
  - EN: "In what it reads, a word set in capitals is two or more characters that meet each of these conditions:
    - each of them is a capital letter of any script, a digit or a hyphen;
    - the first is a capital letter, and the last is a capital letter or a digit;
    - no letter, digit or underscore stands immediately before or after them.

    A run is three or more such words with only spaces or tabs between them. Text in backticks or in straight or typographic double quotation marks is left out."
  - RU: «В том, что он читает, слово, набранное заглавными, — это два или более знака, которые отвечают каждому из этих условий:
    - каждый из них — заглавная буква любой письменности, цифра или дефис;
    - первый — заглавная буква, а последний — заглавная буква или цифра;
    - непосредственно перед ними и после них нет буквы, цифры или подчёркивания.

    Слова подряд — это три или более таких слова, между которыми только пробелы или табуляции. Текст в обратных кавычках или в прямых или типографских двойных кавычках не учитывается.»
- **WORDING FIX (7.2.7):** cite at the first `TableRule`: "…each text cell of a `TableRule` (§s-qeensty237e6mmm, §s-5fewsp22mmdz7y6). It reads a node in a cell of a `TableRule` as it reads any other node." Change the Russian the same way.
- **WORDING FIX** in the example: write “HTTP REST API” / «HTTP REST API» in quotation marks, as the example of the row 10.1.17 proposal does.

### D4 — "A section with a rule in it": not ready; passes after the author's fix
- **WORDING FIX (7.2.7; the owner's Russian term "approval status" in terms-ru.md).** Replace the reason's second sentence and add a `cites` link to s-9kfdycuq34beqvs:
  - EN: "Its approval status, which the SpecSheriff tools derive from the nodes under it (§s-9kfdycuq34beqvs), does not show that the section contains no rule."
  - RU: «Его статус одобрения, который инструменты SpecSheriff выводят из узлов под ним (…), не показывает, что в разделе нет правила.»

## Questions only the owner can answer
1. Q4 (`proposal:row-10-1-17`): whether abbreviations are an exception only one or two in a row. It is already raised in group1-notes.md, and D3 depends on it.
2. Only if the author keeps "another" in D2: whether a term may be linked to itself.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json
- D:/SpecSheriff/skills/tools/src/validate.ts (lines 136–172)
- D:/SpecSheriff/skills/tools/src/model.ts (lines 112–131)