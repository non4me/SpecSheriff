# Review of the follow-on drafts, part A: the report

I reviewed all eight drafts of part A. Only one, s-gvafe6bnstwab8b, is ready as written (it has one nit). Each of the other seven needs the fixes below, and one of them, s-ezq8csd433vj6fj, needs a split.

The checklist comes from `node .claude/vt/writing-rules.mjs`, which read 25 rules from `newform.json`. The brief asks for eight reports, so the 300-word limit applies to each draft.

---

## 1. s-yauyedny2yzvs4c "Term nodes outside the contracts section"
**Verdict:** passes after the fix below.

Checklist:
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✗ "is checked by the node on terms defined in a domain" (a node checks nothing)
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✓
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test of the reason ✓

Оценка:
- согласованность: ✓ — сверено с §s-ypa92gpcj3f5zj8, §s-7kc8dw7zdz63q53, §s-cb9rbh8q88a84xp и решением от 2026-11-12
- целостность: ✓ — стыкуется с §s-76becsjwmasc2r2 и §s-zefk589ykh37b8u; todo снято по делу
- целесообразность: ✓ — без абзаца проверка отвергала бы термин домена, который разрешает §s-cb9rbh8q88a84xp
- избыточность: ✓ — не найдено
- недостаточность: ✓ — не найдено

**WORDING FIX** (second paragraph). It also removes the clash between "refuses each … outside `specs/contracts/`" and "also accepts". It folds in the sentence "allows it there", which was a CUT.
- EN: "Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` makes an exception for a term node whose file is in a domain's folder, `specs/<domain>/`, as the rule on a term defined in a domain allows (§s-cb9rbh8q88a84xp). It checks whether the term belongs in that domain as the node on terms defined in a domain says (§s-76becsjwmasc2r2)."
- RU: «Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` делает исключение для узла-термина, файл которого находится в папке домена `specs/<domain>/`, как позволяет правило о термине, определённом в домене (§s-cb9rbh8q88a84xp). Принадлежит ли термин этому домену, он проверяет так, как говорит узел о терминах, определённых в домене (§s-76becsjwmasc2r2).»

---

## 2. s-76becsjwmasc2r2 "Terms defined in a domain" (new)
**Verdict:** passes after the fixes below.

Checklist:
- 1.2.3 ✓
- 7.1 ✗ "a term node in the folder of a domain that a node cites" ("that" can attach to "domain"); "named after it" ("it" can be the term or the domain)
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✓
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

Оценка:
- согласованность: ✗ — обоснование и заметка stage 3 ограничивают узлы базовой спецификацией и техническим приложением, а текст, §s-cb9rbh8q88a84xp, §s-8p52mzm3y33cf7z и §s-qscrdhf6kj57gbx говорят о любом узле
- целостность: ✓ — сверено с §s-yauyedny2yzvs4c, §s-gvafe6bnstwab8b, §s-zefk589ykh37b8u, §s-hr7j7scmfkkjnws
- целесообразность: ✓ — две новые строки таблицы Domains и вариант Б вопроса 4.6
- избыточность: ✓ — не найдено
- недостаточность: ✗ — «each node outside the domain» включает и узлы `specs/tech/<domain>.json`, которые разрешены

**WORDING FIX** (first item).
- EN: "a term node in a domain's folder, where a node outside that domain and outside the part of the technical appendix named after that domain cites the term or links to it (§s-8p52mzm3y33cf7z);"
- RU: «узел-термин в папке домена, если на этот термин ссылается или с ним связан узел вне этого домена и вне части технического приложения, названной по этому домену (§s-8p52mzm3y33cf7z);»

**WORDING FIX** (second item, nit): replace "in one domain" with "in the same domain" / «в одном и том же домене».

**WORDING FIX** (the refusal's second sentence).
- EN: "A refusal of the first kind also names each node that cites the term or links to it from outside the domain and outside the part of the technical appendix named after the domain."
- RU: «Отказ первого вида называет также каждый узел вне домена и вне части технического приложения, названной по этому домену, который ссылается на термин или связан с ним.»

**WORDING FIX** (reason): replace "of the base specification and of the technical appendix" with "in the specification" / «в спецификации». Make the stage-3 note match.

---

## 3. s-ezq8csd433vj6fj "References from one RecordType to another"
**Verdict:** not ready as drafted. It is ready once split as below.

Checklist:
- 1.2.3 ✓
- 7.1 ✓
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✓
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
- 7.3.2 ✓
- 7.3.3 ✗ "`sheriff validate` refuses each `$ref` … that names no RecordType" can be carried out without the rest of the node
- 7.4.1 ✓
- 7.4.2 ✗ the reason speaks only of references between parts of the system, not of this refusal
- 7.5.1 ✓
- 7.5.2 ✓
- 7.5.3 ✓
- 7.6.1 ✓
- 7.6.2 ✓
- 7.6.3 ✓
- Pairing test ✓

Оценка:
- согласованность: ✓ — §s-axjr5ex3p7ys3nd, §s-4npdup7mjkva69y, §s-8ht2hn88cu2qwz9
- целостность: ✓ — §s-suv42g8r3ra2h6b сохраняет свой отказ в `sheriff types`; противоречия нет
- целесообразность: ✓ — вопрос 3.4
- избыточность: ✓ — с §s-suv42g8r3ra2h6b пересекается частично, в другой команде; допустимо
- недостаточность: ✗ — обоснование не объясняет новую проверку

**Fix: split the node.** Rule s-6j8ystpj2yzcchq allows this without asking the owner.
- s-ezq8csd433vj6fj keeps its agreed wording, title included. Drop the `-bq` draft.
- Add a new node, 7.1.14a. Its links: `implements` s-axjr5ex3p7ys3nd; `cites` s-hzuzn8hbq6q9q4s, s-6eb92ddch7shuvu, s-4npdup7mjkva69y and s-e877bnfa559tvk9.
  - Title: "What a `$ref` within a RecordType names" / «Что называет `$ref` внутри RecordType»
  - Text (EN): "Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a `$ref` at any depth within a RecordType's `schema` (§s-6eb92ddch7shuvu) only where its value is `#` followed by the sid of a RecordType (§s-4npdup7mjkva69y, §s-axjr5ex3p7ys3nd). It refuses any other `$ref`, naming the RecordType that holds it by its sid and quoting the `$ref`.

    `sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-axjr5ex3p7ys3nd)."
  - Text (RU): «Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает `$ref` на любой глубине внутри `schema` RecordType (§s-6eb92ddch7shuvu), только если его значение — `#`, за которым следует sid какого-либо RecordType (§s-4npdup7mjkva69y, §s-axjr5ex3p7ys3nd). Любой другой `$ref` он отвергает, называя по sid RecordType, который его содержит, и приводя сам `$ref`.

    `sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-axjr5ex3p7ys3nd).»
  - Reason (EN): "A `$ref` that names no RecordType does not resolve in the file of RuntimeChecks, so the RuntimeCheck generated from its RecordType fails in the project (§s-e877bnfa559tvk9). `sheriff validate` runs on every change, so it catches such a `$ref` whatever files the stack lists."
  - Reason (RU): «`$ref`, который не называет RecordType, не разрешается в файле RuntimeChecks, поэтому RuntimeCheck, сгенерированный из его RecordType, не работает в проекте (§s-e877bnfa559tvk9). `sheriff validate` выполняется при каждом изменении, поэтому находит такой `$ref`, какие бы файлы ни перечислял стек.»

---

## 4. s-c2r9jndrjbtbsv6 "What a RecordType variant must agree with"
**Verdict:** passes after the fix below.

Checklist:
- 1.2.3 ✓
- 7.1 ✓
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✓
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

Оценка:
- согласованность: ✓ — §s-z3dnru6qqdf9m6j, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-gc7uwxtkrnpa2t9, §s-n94dfdsdzue2kur
- целостность: ✗ — «проверяет дальше только по третьему условию, потому что другие сравнивают вариант с его RecordType» теперь неверно: «добавляет» исключает поля его RecordType, так что третье условие тоже зависит от него; если RecordType несколько, оно не определено
- целесообразность: ✓ — решения 3.5 и 3.6
- избыточность: ✗ (мелочь) — определение добавляемых полей повторяет §s-z3dnru6qqdf9m6j и абзац §s-nk8td3ez58gahc4
- недостаточность: ✓ — не найдено

**DOUBT** (required by decision 3.5; can be approved on the owner's behalf). Replace the paragraph on the first condition.
- EN: "Where a RecordType variant fails the first condition, the refusal names only that condition, since each of the other conditions compares the RecordType variant with its RecordType."
- RU: «Если вариант RecordType не выполняет первого условия, отказ называет только это условие, потому что каждое из других условий сравнивает вариант RecordType с его RecordType.»
- In stage 3 the `continue` at validate.ts:384-386 then stays.

**CUT:** the paragraph "A RecordType variant adds the fields … (§s-z3dnru6qqdf9m6j, §s-nk8td3ez58gahc4)". The third condition then reads "it adds at least one field (§s-z3dnru6qqdf9m6j, §s-47q37qk27yvt3pa);" / «он добавляет хотя бы одно поле (§s-z3dnru6qqdf9m6j, §s-47q37qk27yvt3pa);». This cut is the author's call.

---

## 5. s-qg2yqec2cgmcg2w "The top level of a RecordType's `schema`" (new)
**Verdict:** passes after the fixes below. A node of its own is the right home for this check, as it is for `enum` in s-dk3zfkbhc3v6xbp.

Checklist:
- 1.2.3 ✓
- 7.1 ✗ "lacks it when it validates" (two referents of "it"; the first points to the previous paragraph)
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✓
- 7.2.4 ✓
- 7.2.4.1 ✓
- 7.2.4.2 ✓
- 7.2.4.3 ✓
- 7.2.4.4 ✓
- 7.2.4.5 ✓
- 7.2.5 ✓
- 7.2.6 ✓
- 7.2.7 ✓
- 7.3.1 ✗ the title does not set the node apart from the top-level checks in s-c2r9jndrjbtbsv6
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

Оценка:
- согласованность: ✓ — §s-c7zj6mraw8w83py, §s-4npdup7mjkva69y, §s-gb8s9657a65hqmv
- целостность: ✓ — §s-dk3zfkbhc3v6xbp, §s-c2r9jndrjbtbsv6
- целесообразность: ✓ — вопрос 3.7
- избыточность: ✓ — не найдено
- недостаточность: ✓ (мелочь) — что схема узнаёт вариант по `answersTo`, говорит только §s-c2r9jndrjbtbsv6

**WORDING FIX** (title): "`\"type\": \"object\"` in a RecordType's `schema`" / «`"type": "object"` в `schema` RecordType».

**WORDING FIX** (second paragraph, merged into the first).
- EN: "So, when `sheriff validate` validates the files against the schema of the specification (§s-xzcw3hv4hmxz7h7), it refuses a RecordType whose `schema` lacks `\"type\": \"object\"` at its top level."
- RU: «Поэтому, когда `sheriff validate` проверяет файлы на соответствие схеме спецификации (§s-xzcw3hv4hmxz7h7), он отвергает RecordType, `schema` которого не содержит `"type": "object"` на верхнем уровне.»
- Nit: add §s-c2r9jndrjbtbsv6 after "RecordType variant", with a `cites` link.

---

## 6. s-f5brvuuu6xmkj6t "The fingerprint of a node's wording"
**Verdict:** passes after the fix below. Leaving `TextRule` out of the fingerprint is within decision 4.1, which left that choice to this node.

Checklist:
- 1.2.3 ✓
- 7.1 ✗ "the node's `kind`, and the name of a kind … `TextRule` as `rule`" beside "except where the kind is `TextRule`" (which comes first, the rename or the exclusion?)
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✓
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

Оценка:
- согласованность: ✓ — §s-5ah25f6gy99panq, вопрос 4.1 (А)
- целостность: ✓ — §s-st6td4mua9uqt9z не меняется; §s-gb8s9657a65hqmv
- целесообразность: ✓ — иначе правило превращается в термин без одобрения
- избыточность: ✓ — не найдено
- недостаточность: ✗ — то же, что в строке 7.1

**WORDING FIX.**
- First sentence of the new paragraph.
  - EN: "The object holds the node's `kind`, except where the kind is `TextRule` or its earlier name, `rule`."
  - RU: «Объект содержит `kind` узла, кроме случая, когда тип — `TextRule` или его прежнее имя `rule`.»
- Split the last list item into two.
  - EN: "the node's `kind`: `RecordType` as `recordType` and `header` as `domain`;" and "the name of a kind of node in the source of a field's values (§s-xfu2gpzddjnmgks), where those values are the sids of that kind's nodes: `TextRule` as `rule`, `RecordType` as `recordType`, and `header` as `domain`."
  - RU: «`kind` узла: `RecordType` как `recordType`, `header` как `domain`;» and «имя типа узлов в источнике значений поля (§s-xfu2gpzddjnmgks), если эти значения — sid узлов этого типа: `TextRule` как `rule`, `RecordType` как `recordType`, `header` как `domain`.»

---

## 7. s-gvafe6bnstwab8b "Files of the technical appendix named after the domains"
**Verdict:** passes.

Checklist:
- 1.2.3 ✓
- 7.1 ✓
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✓
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

Оценка:
- согласованность: ✓ — §s-vghy37e3p2325ah в редакции 4.2, §s-zefk589ykh37b8u, решение узла от 2026-10-31
- целостность: ✓ — проверка разделов перешла в §s-g7auhqvzzbkw644 без пробела
- целесообразность: ✓ — вопрос 4.2 (А)
- избыточность: ✓ — не найдено
- недостаточность: ✓ — не найдено

**WORDING FIX** (nit; the reason's second sentence also covers the stack and debt files).
- EN: "A JSON file under `specs/tech/` that is named after no domain, other than the files of the stack and the technical debt, holds an implementation that the reader will not find."
- RU: «Файл JSON в `specs/tech/`, который не назван ни по одному домену и не является файлом стека или технического долга, содержит реализацию, которую читатель не найдёт.»

---

## 8. s-g7auhqvzzbkw644 "Sections of the technical appendix matched to the base specification" (new)
**Verdict:** passes after the fix below.

Checklist:
- 1.2.3 ✓
- 7.1 ✓
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✓
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

Оценка:
- согласованность: ✓ — §s-ujnb23vbw3y8cne, §s-qmmzf9nksfsa3qp, §s-vj7ercem526zd6v, решение от 2026-11-18
- целостность: ✗ — «каждый следующий узел верхнего уровня — под первым» сказано только для файла, названного по папке, а §s-ygg5kpcxgzq3m7w так нумерует любой файл
- целесообразность: ✓ — вопрос 4.2 (А)
- избыточность: ✓ — не найдено
- недостаточность: ✗ — то же: путь названий для файла вроде `specs/tech/intake.json` открыт

**WORDING FIX.** Move the last sentence of the third paragraph to the end of the second paragraph.
- EN: "In each file of the technical appendix, each top-level node after the first is treated as a node under the first, as in the computation of locations (§s-ygg5kpcxgzq3m7w)."
- RU: «В каждом файле технического приложения каждый узел верхнего уровня после первого считается узлом под первым, как при вычислении расположения (§s-ygg5kpcxgzq3m7w).»

**WORDING FIX** (nit; "the domain's header" points back to a domain that the paragraph does not name).
- EN: "Where the folder is a domain's (§s-tdm3rwsppnuh6dm), they may also start with the title of a child of that domain's header (§s-yggv9myedprnaa7)."
- RU: «Если это папка домена (§s-tdm3rwsppnuh6dm), они могут начинаться и с названия дочернего узла заголовка этого домена (§s-yggv9myedprnaa7).»
- Nit: the row this node implements says "path of titles" / «путь заголовков», but the node says "the titles that lead to". One thing should have one name.

---

## 9. s-j4t9vusnsajmqdw "The metaschema of a RecordType's `schema`" (new)
**Verdict:** passes after the fixes below.

Checklist:
- 1.2.3 ✓
- 7.1 ✓
- 7.2.1 ✓
- 7.2.2 ✓
- 7.2.3 ✓
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

Оценка:
- согласованность: ✓ — решение R8 от 2026-11-19, вопрос 4.7 (Б), §s-4npdup7mjkva69y, §s-5nf87c3e3jg9v7c, §s-dk3zfkbhc3v6xbp
- целостность: ✓ — §s-xzcw3hv4hmxz7h7 не меняется
- целесообразность: ✓ — проверено: JSON Schema объявила запрет слов вне объявленных словарей
- избыточность: ✗ (мелочь) — третий абзац повторяет первый
- недостаточность: ✗ — нет имени файла и `$id` метасхемы, URI словаря и того, обязателен ли он в `$vocabulary`; не сказано, что слова проверяются на любой глубине

**DOUBT** (exact values for the implementer; the author chooses them).
- Add the file name, the meta-schema's `$id` and the vocabulary's URI.
- Add to the second paragraph: "The meta-schema checks these keywords at any depth within a RecordType's `schema`." / «Метасхема проверяет эти ключевые слова на любой глубине `schema` RecordType.»
- Say whether `$vocabulary` marks SpecSheriff's vocabulary as required. I would mark it `false` (inference), so that other JSON Schema tools can still read the schema.

**TERM:** "metaschema". JSON Schema's own writing spells it "meta-schema" (json-schema.org, "The Last Breaking Change", 2023-02-23, read during this run). The meaning is the same. I recommend that spelling. It costs only this node, since no other node uses the word.

**WORDING FIX:**
- In the first paragraph, replace "carry with that schema" with "provide together with that schema". The Russian stays as it is.
- In the reason, replace "without a prefix" with "without the prefix `x-`" / «без приставки `x-`».
- In the Russian, replace «слова» with «ключевые слова».

**CUT:** the fourth paragraph. Move "by a `$ref`" into the first paragraph. "in place of the metaschema of JSON Schema 2020-12" describes the change, not the node.

---

**Ready:** s-gvafe6bnstwab8b. Every other draft is ready once its fixes are applied; s-ezq8csd433vj6fj also needs the split. The brief's points on s-h5rfyy9j8nnhx62, the details of 4.4 and s-5qdjyf6t898rsd4 belong to part B.

Files read: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/base-questions.md` and `D:/SpecSheriff/.ai_docs/t25-pass/newform.json`.
