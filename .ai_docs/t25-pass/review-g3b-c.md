I loaded the skill `specsheriff-terminology-review` and printed the checklist with `node .claude/vt/writing-rules.mjs`. My input holds two of the group's drafts, `s-t383grkn3q68dpf` and `proposal:s-ztseyetus7np6br-g3`. The two new proposals (`s-9j2mmnuuwmx5ksn`, `s-hhnahzmhahf8jht`) and Q1 are not in my input, so I did not review them.

## s-t383grkn3q68dpf, "A node's `meta.code` and `meta.tests`": **not ready** (one wording fix)

**The first review's fixes.** All are in place, word for word:
- Fix A, in English and in Russian. Paragraphs 2 and 3 are gone, and so are the links that only they backed.
- Finding 2, on the reason.
- Finding 3, the `stage3` note. The code bears it out: binding.ts:72-73 and :215-254, reindex.ts:283-330.

**The author's own sentence.** The last sentence of the example ("The most likely mistake…") keeps the meaning of its Russian.

**Findings**
1. **WORDING FIX (author), rule 7.2.3.** Paragraph 2 says "compares each list regardless of the order of its entries". "list" stands alone, and the lists are named only in paragraph 1, which is another paragraph.
   - EN: "`sheriff binding` compares the entries of a node's `meta.code` and `meta.tests` regardless of their order."
   - RU: «`sheriff binding` сравнивает записи `meta.code` и `meta.tests` узла без учёта их порядка.»
2. **A change outside the group (author).** This applies to both drafts. The agreed "Project-wide settings" (`new:tools-1-settings`) says that, to find SpecTags, the SpecSheriff tools read "only" two kinds of file: those that match the glob patterns, and those that `sheriff types` writes. The bindings file is neither, so `src/texts.json` in the example could never get into `meta.code`. Rule 1.5.2 says that each entry of the bindings file holds its file's SpecTags, so the change only carries out an earlier ruling. It should go into the notes' list of changes outside the group and be put to the owner as a proposal with this group. In that node:
   - EN: "…read only the files that match the glob patterns for code or for tests in `sheriff.config.json`, the files into which `sheriff types` writes the types (§s-pvzms7d8kxb8dk2), and the bindings file (§s-trwczfskj5zmuft)."
   - RU: «…читают только файлы, которые соответствуют glob-шаблонам кода или тестов в `sheriff.config.json`, файлы, в которые `sheriff types` записывает типы (§s-pvzms7d8kxb8dk2), и файл привязок (§s-trwczfskj5zmuft).»
   - Add a `cites` link to s-trwczfskj5zmuft.

**Checklist**
1.2.3 ✓ · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✗ "compares each list regardless of the order of its entries" · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test of the reason ✓

**Оценка**
- согласованность: ✓. Сверено:
  - со строкой 10.1.34 (s-tqdmk6jakx97wra) и её решениями от 2026-11-13 и 2026-11-17;
  - с правилами 9.7 (решения от 2026-11-11 и 2026-11-18), 1.5.2 и 10.10;
  - с решением от 2026-11-13 о собственных проверках проекта;
  - с узлом «Values built from other nodes» (s-agc6fb3vx46pc23), который написан в той же форме.
- целостность: ✗. Первая проблема — «Project-wide settings» не даёт читать файл привязок (замечание 2). Вторая: узел верен только вместе с `proposal:s-ztseyetus7np6br-g3`. При согласованном сейчас пункте о `meta.code` («a symbol bound by such a SpecTag») пример неверен.
- целесообразность: ✓. Списки правят вручную или коммитят, не запустив `sheriff reindex`, а строка 10.1.34 в таком случае отвергает коммит.
- избыточность: ✓, не найдена. s-agc6fb3vx46pc23 сравнивает другие значения, а состав списков определён только в предложении.
- недостаточность: ✓, не найдена.

## proposal:s-ztseyetus7np6br-g3, "What `sheriff reindex` writes": **ready**

**The first review's fixes.** Finding 4 is in place word for word, in English and in Russian, and both `cites` links are added.

**What changed.** I compared it with the agreed `proposal:s-ztseyetus7np6br`. The title, the reason and the other parts are identical in both languages. Only the item on the lists differs, now split in two, and only the four `cites` links are new. That is all the `change` field describes. The Russian of both new items renders every clause.

**Findings.** Only finding 2 above, which concerns another node; this wording needs no change.

**Checklist**
1.2.3 ✓ · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓ · 7.3.2 ✓ · 7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test of the reason ✓

**Оценка**
- согласованность: ✓. Сверено:
  - со строкой 10.1.34 и её решениями;
  - с правилами 1.5.2, 9.1, 9.7 и 10.10 и с решением от 2026-11-13 о собственных проверках проекта;
  - с узлами s-5qdjyf6t898rsd4, s-trwczfskj5zmuft и s-zrsc6asgmhv8tnc;
  - с «Project-wide settings»: файл, который подходит под оба шаблона, читается как тест, так что «test file» означает то же самое.
- целостность: ✗. «Project-wide settings» не даёт читать файл привязок (замечание 2). s-t383grkn3q68dpf и s-agc6fb3vx46pc23 остаются верными.
- целесообразность: ✓. Без правки `sheriff binding` отвергал бы файлы, привязанные целиком.
- избыточность: ✓, не найдена.
- недостаточность: ✓, не найдена.

## Terms
No term findings. The note that `meta.code` and `meta.tests` correspond to what OpenFastTrace calls `impl` and `utest` coverage (inference) is already on the notes' list for the docs.

## Questions only the owner can answer
None in these two drafts.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json (keys `s-t383grkn3q68dpf`, `proposal:s-ztseyetus7np6br-g3`, `new:tools-1-settings`)
- D:/SpecSheriff/.ai_docs/t25-pass/group3-notes.md
- D:/SpecSheriff/skills/tools/src/binding.ts
- D:/SpecSheriff/skills/tools/src/reindex.ts
