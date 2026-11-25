The skill `specsheriff-terminology-review` was loaded, and I printed the checklist with `node .claude/vt/writing-rules.mjs`. All three drafts are ready: items 41 and 42 have one optional nit each, and item 43 has no findings.

## Checklist (each node checked whole)

| Rule | 41 `s-vuujweu57sxsa58` | 42 `s-gvafe6bnstwab8b` | 43 `s-uxmkwbnpgtjzkgv` |
|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ |
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
- согласованность ✓ — сверено: строка 11.3.4 (s-bncp7gtyaukur8e) и её решение от 2026-10-30; 11.1.3 (s-yggv9myedprnaa7) и её решение от 2026-11-17; 11.1.5 (s-hr7j7scmfkkjnws) и её решение от 2026-11-14; 11.2.3 (s-uw9n84edf7cbe9n); согласованный s-p3n666zfjdrrw6a.
- целостность ✓ — «использует» определено так же, как связи, которые принимает s-p3n666zfjdrrw6a. Обоснование того узла остаётся верным. `moved/impl.json` связывает строку 11.3.4 только с этим узлом.
- целесообразность ✓ — связи любых типов пересекают границы доменов (11.1.5), поэтому узел должен сказать, по каким связям ищется круг.
- избыточность ✓
- недостаточность ✓

**42**
- согласованность ✓ — сверено: строка 11.3.5 (s-vghy37e3p2325ah) и её решение от 2026-11-18; 1.1.2 (s-qmmzf9nksfsa3qp), 1.1.5 (s-tj38pvm38nepaf5), 4.1 (s-vj7ercem526zd6v), 8.5 (s-kag2m9tzdnduxdx); согласованные s-zefk589ykh37b8u (в `specs/tech/` лежит техническое приложение, а домен не может называться `stack` или `debt`) и s-ygg5kpcxgzq3m7w.
- целостность ✓ — пересечения с s-yprj7d6tnvauggr нет. Пробел для проекта без расширения Domains лежит вне узла. Он записан в `t25-one-thought.md` (строка 1626) как вопрос ответственному до этапа 3.
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**43**
- согласованность ✓ — сверено: 11.2.1 (s-nkyty4dy9x2v2a4), 11.2.2 (s-4azsb49pj6sech8), строка 11.3.6 (s-j3v4y4d3sbmdgfp) и её решение от 2026-11-18; согласованные s-t9j29hppag2nren и s-a8fn72xa782wvbk; 1.3.2 (s-utvqbypzhmgndug); свойство `level` в `domains.schema.json`.
- целостность ✓ — s-t9j29hppag2nren читает уровни только при выбранном расширении Domains, как и этот узел.
- целесообразность ✓
- избыточность ✓ — абзац 3 своими словами говорит, на что опирается проверка. Ссылка на s-t9j29hppag2nren это подтверждает.
- недостаточность ✓

## Verdicts and findings

Round d applied every finding of `review-g5c-a.md` and of both g5c readers. Each rejection still holds: "matched to" names the matching that `sheriff validate` makes, and "last approved wording" is the term of s-a8fn72xa782wvbk.

**41: ready.**
- **Nit, WORDING FIX** (author; optional). The reason's last sentence is the author's own wording. Its phrase "domains do not use one another" leaves out "in a cycle", which is the phrase the text defines. In the two-domain example it still reads correctly, so this is only a nit.
  - EN: "So a check that followed links of every type would refuse changes after which no domains use one another in a cycle."
  - RU: «Поэтому проверка, которая шла бы по связям любого типа, отвергала бы изменения, после которых никакие домены не используют друг друга по кругу.»

**42: ready.**
- **Nit, Russian** (author). Round d changed the reason's English to "will not find", but the Russian still has «не находит». Replace it with «…которую такой читатель не найдёт.» The meaning does not change.
- The new clause ", which holds the technical appendix (§…)" passes 7.3.2. It is the same kind of explanatory clause as in the agreed s-jgejd5rpd9d43pd.

**43: ready.** No findings.

**[check] points:**
- Item 42: the author's reading holds. The file's name already matches the domain's name.
- Item 43: the [check] no longer applies, because the node now cites s-t9j29hppag2nren.

**Gaps outside the group:** none of them is a defect of these drafts.

**TERM:** round d brought in no new term. The earlier notes on terms are recorded for the docs.

**Only the owner can answer:** nothing in these drafts.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.before-group5-d.json
- D:/SpecSheriff/.ai_docs/t25-pass/group5-notes.md
