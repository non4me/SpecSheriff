**Group 5, final review: items 41 to 43**

Items 41 and 43 are ready. Item 41 has one nit. Item 42 needs one wording fix, which you can make. Before reviewing, I loaded the skill `specsheriff-terminology-review` and ran `node .claude/vt/writing-rules.mjs`.

## Checklist (each node checked whole)

| Rule | 41 `s-vuujweu57sxsa58` | 42 `s-gvafe6bnstwab8b` | 43 `s-uxmkwbnpgtjzkgv` |
|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✗ "refuses any other section of the file": read literally, this also refuses the file's first top-level node, which paragraph 4 says represents the domain | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ |
| Pairing test of the reason | ✓ | ✓ | ✓ |

## Оценка

**41**
- согласованность ✓ — сверено со строкой 11.3.4 (s-bncp7gtyaukur8e) и её решением от 2026-10-30, с 11.1.3 (s-yggv9myedprnaa7) и его решением от 2026-11-17, с 11.1.5 (s-hr7j7scmfkkjnws), 11.2.3 (s-uw9n84edf7cbe9n), с согласованными s-p3n666zfjdrrw6a и s-7pk89t8z6wymmj9 («refuses the change»).
- целостность ✓ — после сокращения определение «использует» совпадает с тем, что принимает s-p3n666zfjdrrw6a. Обоснование s-p3n666zfjdrrw6a и порядок 11.2.3 по-прежнему верны. `moved/impl.json` связывает строку 11.3.4 с этим узлом.
- целесообразность ✓ — связи любых типов пересекают границы доменов (11.1.5).
- избыточность ✓
- недостаточность ✓ — «после которого» охватывает и круг, существовавший до изменения.

**42**
- согласованность ✓ — сверено со строкой 11.3.5 (s-vghy37e3p2325ah) и её решением от 2026-11-18, с 4.1 (s-vj7ercem526zd6v), 1.1.2 (s-qmmzf9nksfsa3qp), 11.1.1 (s-h6h25ctd3yryudh), 8.5 (s-kag2m9tzdnduxdx), с согласованными s-zefk589ykh37b8u и s-ygg5kpcxgzq3m7w.
- целостность ✓ — с s-yprj7d6tnvauggr пересечения нет. Пробел для проекта без расширения Domains лежит вне узла и записан в файле продолжения.
- целесообразность ✓
- избыточность ✓
- недостаточность ✗ — абзац 3 буквально отвергает первый узел верхнего уровня файла, если тот — раздел. Абзац 4 при этом говорит, что этот узел представляет домен.

**43**
- согласованность ✓ — сверено с 11.2.1 (s-nkyty4dy9x2v2a4), 11.2.2 (s-4azsb49pj6sech8), строкой 11.3.6 (s-j3v4y4d3sbmdgfp) и её решением от 2026-11-18, с согласованными s-t9j29hppag2nren и s-a8fn72xa782wvbk, с 1.3.2 (s-utvqbypzhmgndug), со свойством `level` в `domains.schema.json`.
- целостность ✓ — s-t9j29hppag2nren изменился только тем, что получил sid.
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

## Verdicts and findings

Round c applied every round-b finding on these items, and each rejection still holds.

**41: ready.**
- **Nit, WORDING FIX** (you can fix it). The reason's second sentence was written in round c. "what another domain states links to" first reads "states links" as a verb and its object. Optional replacement: "A node that relies on what another domain states has a link, of whatever type, to the node of that domain that states it (§s-hr7j7scmfkkjnws)." The Russian stays. It is only a nit, because the sentence reads correctly on a second look and the Russian is not affected.

**42: not ready.**
- **WORDING FIX** (you can fix it). The file's first top-level node is not "below" itself, so "any other section of the file" also covers that node. Where that node is a section, an agent following the text literally would refuse it. Replace the sentence with:
  - EN: "`sheriff validate` refuses any other section below the file's first top-level node, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming its title."
  - RU: «Любой другой раздел под первым узлом верхнего уровня файла `sheriff validate` отвергает, называя файл, sid и расположение (§s-kag2m9tzdnduxdx) раздела, а также его название.»
- **[check]:** your reading holds. The file is named after the domain, and nothing gives a domain a title to compare.

**43: ready.** The [check] on repeating the agreed node no longer applies: the node now cites s-t9j29hppag2nren.

**Gaps outside the group:** none is a defect of these drafts.

**TERM:** these drafts bring in no new term.

**Only the owner can answer:** nothing in these drafts.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group5-notes.md
