**Group 5 review, input A (items 41 to 43)**

The skill `specsheriff-terminology-review` is loaded and the checklist script ran. Item 42 is ready. Items 41 and 43 need fixes that the author can make, and one question goes to the owner.

---

## Item 41: `s-vuujweu57sxsa58`, "Domains that use one another in a cycle"

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
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
- 7.6.3 Examples ✗ "There `sheriff validate` accepts both domains": the text accepts or refuses the change, never domains.
- Pairing test of the reason ✓

**Оценка**
- согласованность ✓ — сверено с 11.1.3 (s-yggv9myedprnaa7) и решением от 2026-11-17 о событиях, 11.1.5 (s-hr7j7scmfkkjnws), строкой 11.3.4 (s-bncp7gtyaukur8e) и решением от 2026-10-30, 11.2.3 (s-uw9n84edf7cbe9n), s-p3n666zfjdrrw6a.
- целостность ✓ — обоснование s-p3n666zfjdrrw6a и порядок доменов 11.2.3 опираются на эту проверку и остаются верны; moved/impl.json связывает 11.3.4 с этим узлом.
- целесообразность ✓ — проблема названа: связи между правилами свободно пересекают границы доменов (11.1.5).
- избыточность ✓
- недостаточность ✓

**Verdict: not ready.** It is ready once the two fixes below are applied.

- **WORDING FIX** (author): "Only a link that the check of `consumes` links accepts is counted" becomes "Only a link that the check of `consumes` links accepts is taken into account". The owner reserves "count" for counting. Only the English changes, and «Учитывается…» stays as it is.
- **WORDING FIX** (author, example): "There `sheriff validate` accepts both domains." becomes "There `sheriff validate` accepts the change." In Russian: «Там `sheriff validate` принимает изменение.»
- **TERM**: "use one another in a cycle" means what developers call a dependency cycle (Acyclic Dependencies Principle, R. C. Martin; unverified, not in the registry). In [DDD] terms, a domain that uses another is downstream of it (inference). The fit is the same meaning. Keep the word "use" and put "dependency cycle" beside it in the docs table, which costs nothing in the specification.

---

## Item 42: `s-gvafe6bnstwab8b`, "Sections of the technical appendix matched to the domains"

**Checklist:** all 25 rules ✓ (1.2.3, 7.1, 7.2.1, 7.2.2, 7.2.3, 7.2.4, 7.2.4.1 to 7.2.4.5, 7.2.5, 7.2.6, 7.2.7, 7.3.1, 7.3.2, 7.3.3, 7.4.1, 7.4.2, 7.5.1, 7.5.2, 7.5.3, 7.6.1, 7.6.2, 7.6.3). Pairing test of the reason ✓: the reason is one argument (where the reader looks, then what the reader misses), not one justification per paragraph.

**Оценка**
- согласованность ✓ — строка 11.3.5 (s-vghy37e3p2325ah) и решение от 2026-11-18, 4.1 (s-vj7ercem526zd6v), 1.1.2 (s-qmmzf9nksfsa3qp), 11.1.1–11.1.2, s-zefk589ykh37b8u, 8.5 (s-kag2m9tzdnduxdx), s-ygg5kpcxgzq3m7w.
- целостность ✓ — с s-yprj7d6tnvauggr, который проверяет правила приложения по связи `implements`, пересечения нет. Пробел для проекта без расширения Domains лежит вне узла (см. вопрос владельцу).
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**Verdict: ready.**

- **[check] The first node's title is not compared.** The author's reading holds. "Where the files are" makes `specs/tech/<domain>.json` the section that implements the domain. Rule 8.5 gives that node the location `tech/<domain>`. A domain's name is its folder name, so nothing gives the domain a title to compare with.
- **Gap 4 (no row checks the technical appendix without the Domains extension)** is not a defect of this node, which belongs to the Domains extension. One fact is missing from the notes, though. Today's code (validate.ts:446-452, `isDomain('base')`) refuses `specs/tech/foo.json` in a project without the extension. Stage 3 removes that refusal and puts nothing in its place.
- **TERM**: "the titles that lead to a section" is a phrase the node coins and defines where it first uses it. The nearest familiar name is a breadcrumb trail (inference). Keep it.

---

## Item 43: `s-uxmkwbnpgtjzkgv`, "The level in a domain's header"

**Checklist**
- 1.2.3 ✓
- 7.1 ✗ "is listed only after that wording is approved": the draft wording does list the level. The intended meaning is "is accepted".
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
- 7.2.7 ✗ "last approved wording" is not cited. s-a8fn72xa782wvbk defines it.
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

**Оценка**
- согласованность ✗ — третий абзац берёт связи `refines` из файлов, а согласованный «What the SpecSheriff tools read in the project's own guidelines» (proposal:new-tools-1-project-g4) — из коммита последнего одобрения правила (§s-5ah25f6gy99panq).
- целостность ✓ — 11.2.1 (s-nkyty4dy9x2v2a4), 11.2.2 (s-4azsb49pj6sech8), строка 11.3.6 и решение от 2026-11-18, `level` в domains.schema.json.
- целесообразность ✓
- избыточность ✗ — третий абзац пересказывает тот же согласованный узел (правило «One statement, one home»).
- недостаточность ✓

**Verdict: not ready.**

- **[check] Repeating the agreed node because it has no sid.** The author's reading does not hold. New nodes in these drafts get their sid when another node has to cite them: s-p3n666zfjdrrw6a, s-ygg5kpcxgzq3m7w and this group's own s-dk3zfkbhc3v6xbp. The restatement is also partial, as the ✗ lines above show.
  - Fix (author): give `new:tools-1-project` its sid, which changes no wording, and replace paragraph 3 with:
    - EN: "As with every list in the project's own guidelines, the SpecSheriff tools read the levels in the last approved wording (§s-a8fn72xa782wvbk) of each rule that lists them (§‹sid of new:tools-1-project›). So a level that only a draft wording adds is accepted only after that wording is approved."
    - RU: «Как и любой перечень собственных guidelines проекта, инструменты SpecSheriff читают уровни в последней одобренной формулировке (§s-a8fn72xa782wvbk) каждого правила, которое их перечисляет (§‹sid›). Поэтому уровень, который добавляет только формулировка-черновик, принимается лишь после того, как эту формулировку одобрят.»
  - The links follow: add `cites` to ‹sid› and to s-a8fn72xa782wvbk. Remove the `cites` links to s-zefk589ykh37b8u, s-sn6au3vcr9uy5pm and s-utvqbypzhmgndug, which the node no longer cites.
- **WORDING FIX** (author, paragraph 1): "accepts the level that a domain's header (§…) contains only where…" becomes "accepts a domain's header (§s-yggv9myedprnaa7) that contains a level only where…". Then "any other header" in paragraph 2 refers back to headers, not levels. In Russian: «принимает заголовок домена (§s-yggv9myedprnaa7), который содержит уровень, только если…».
- **WORDING FIX** (author, example): after the first sentence, add the typical case:
  - EN: "`sheriff validate` accepts each header that contains `core` or `edge`, and each header that contains no level."
  - RU: «`sheriff validate` принимает каждый заголовок, который содержит `core` или `edge`, и каждый заголовок, который не содержит уровня.»
- **TERM**: "level". In [C4], the levels are kinds of diagram at different zoom (context, container, component, code), so the word is a partial false friend for developers (inference). The owner settled "level" in 11.2.1 (decisions of 2026-10-27, 2026-11-09 and 2026-11-14). Keep it and add "not to be confused with C4 levels" to the docs table.

---

## Only the owner can answer

1. **Gap 4.** With the Domains extension off, no row of the main table of checks checks that the technical appendix follows the structure of the base specification, which rule 1.1.2 requires. Stage 3 will also remove today's refusal of a wrongly named file under `specs/tech/` in such a project, so the gap should be put to the owner before stage 3 changes the code.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group5-notes.md`, `D:/SpecSheriff/skills/tools/src/validate.ts`
