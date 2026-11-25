The skill `specsheriff-terminology-review` is loaded and `node .claude/vt/writing-rules.mjs` ran. Item 42 is ready. Items 41 and 43 each need one small fix, which the author can make.

## Checklist (applied to each whole node)

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
- согласованность ✓ — сверено с 11.1.3 (s-yggv9myedprnaa7) и его решениями от 2026-10-30 и 2026-11-17, с 11.1.5 (s-hr7j7scmfkkjnws), со строкой 11.3.4 (s-bncp7gtyaukur8e), с 11.2.3 (s-uw9n84edf7cbe9n) и с s-p3n666zfjdrrw6a.
- целостность ✓ — обоснование s-p3n666zfjdrrw6a и порядок 11.2.3 опираются на эту проверку и остаются верными.
- целесообразность ✓ — связи между правилами свободно пересекают границы доменов (11.1.5).
- избыточность ✗ — второе предложение абзаца 2 повторяет первое (см. ниже).
- недостаточность ✓

**42**
- согласованность ✓ — сверено со строкой 11.3.5 (s-vghy37e3p2325ah) и её решением от 2026-11-18, с 4.1 (s-vj7ercem526zd6v), 1.1.2 (s-qmmzf9nksfsa3qp), 11.1.1 (s-h6h25ctd3yryudh), s-zefk589ykh37b8u, 8.5 (s-kag2m9tzdnduxdx) и s-ygg5kpcxgzq3m7w.
- целостность ✓ — с s-yprj7d6tnvauggr пересечения нет. Пробел для проекта без расширения Domains лежит вне узла и записан в файле продолжения (решение 3).
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

**43**
- согласованность ✓ — сверено с 11.2.1 (s-nkyty4dy9x2v2a4), 11.2.2 (s-4azsb49pj6sech8), строкой 11.3.6 (s-j3v4y4d3sbmdgfp) и её решением от 2026-11-18, с s-t9j29hppag2nren, s-a8fn72xa782wvbk и принципом «Nothing unapproved is implemented». Расхождение, которое нашло первое ревью, снято.
- целостность ✓ — у s-t9j29hppag2nren изменился только `sidValue`. Этот sid встречается только в этом узле и в узле 43.
- целесообразность ✓
- избыточность ✓
- недостаточность ✓

## Verdicts and findings

Round b applied every finding of review a on these drafts. Its reasons for rejecting the readers' findings still hold: "runs this check", "counts" and "the rule about". The sentence the author wrote alone in item 41 reads correctly.

**41: not ready.**
- **CUT** (the author can fix): delete "Only a link that the check of `consumes` links accepts is taken into account (§s-p3n666zfjdrrw6a)." and its Russian, «Учитывается только связь, которую принимает проверка связей `consumes` (§s-p3n666zfjdrrw6a).»
  - Why: the sentence before it already limits "uses" to a link from a header to a section of another domain, and that is exactly the link s-p3n666zfjdrrw6a accepts. The sentence adds no thought.
  - Also: remove the `cites` link to s-p3n666zfjdrrw6a, and end that paragraph's `change` after «(ваше решение от 2026-10-30 по строке 11.3.4).»

**42: ready.** The author's [check] reading holds: the first node's title is not compared.

**43: not ready.**
- **WORDING FIX** (Russian only; round b introduced the defect): in «Как и любой перечень…, инструменты SpecSheriff читают», the comparison attaches to «инструменты». Replace the sentence with: «Инструменты SpecSheriff читают уровни так же, как любой перечень собственных guidelines проекта: в последней одобренной формулировке (§s-a8fn72xa782wvbk) каждого правила, которое их перечисляет (§s-t9j29hppag2nren).» The English stays as it is.
- **Nit:** "each rule that lists them" is looser than the agreed node's "every rule that refines the rule on a domain's level". The citation settles this, so no change is needed.
- **TERM:** "last approved wording" is close to what [29148] 2018 calls a baseline, "a formally approved version of a configuration item". The fit is partial, since a baseline usually covers a set of items (inference). Keep the method's term and add a gloss in the docs only.

**The owner's question (item 46a, outside my input).** Its form holds, but option A is missing one cost. Without domains, nodes in `specs/base/` that are in no top-level section give no value. Item 47, however, treats the RecordTypes among them as one part of the system, so the question's claim «вариант A делает то же» is not exact. Under B, the value `base` covers them. Add to A's cost: «узлы `specs/base/` вне разделов верхнего уровня значения не дают, хотя пункт 47 считает RecordType среди них одной частью системы».

**Findings only the owner can answer:** none in these drafts.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group5-notes.md
