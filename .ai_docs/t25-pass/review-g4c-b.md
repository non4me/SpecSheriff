I loaded the skill and both briefs, read every earlier report and the round b and round c notes, and changed no file. Both drafts are ready. The first draft has two `change` notes that misstate what the code does today, and those notes must be corrected before the page is built. None of the brief's "Points to look at" concerns these two items.

## s-nh8b2hjvzasdxmd: "A node's location outside the specification" (verdict: **ready**)

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
- 7.6.3 Examples ✓
- Pairing test of the reason ✓

**Оценка**
- согласованность: ✓ сверено с 8.5 (`proposal:s-kag2m9tzdnduxdx`), 1.2.2 (s-9spq78kdwsxr759), s-ygg5kpcxgzq3m7w, s-w6gybeqn2ttydqx, s-zefk589ykh37b8u, строкой 10.1.38 (s-u5hfbygfyqv4wmf), 10.11 (s-6hha5en226aj8hu), `proposal:new-tools-1-project-g4`, с решением 8.5 от 2026-11-05 и с принципами.
- целостность: ✓ с s-qzyacnqwvaeaps4 и s-m8nmfsxkcfu7cjp нет ни разрыва, ни перекрытия. Правка `moved/impl.json` названа в заметках. Двоичные файлы эта проверка читает, а s-m8nmfsxkcfu7cjp их пропускает. Это безвредно: я проверил, и ни один двоичный файл репозитория не содержит текста в форме расположения.
- целесообразность: ✓ без этой проверки никто не заметит расположение, оставшееся вне `specs/` после переупорядочивания.
- избыточность: ✓ не найдено.
- недостаточность: ✓ не найдено. Я проверил: ни здесь, ни в saloon вне `specs/` нет текста в новой форме расположения.

**Findings**
1. **Notes only; the author can fix this.** Two `change` notes say «так и делает код сейчас». That is not true. I re-ran the pattern from `binding.ts:424`, and it refuses:
   - `base/3.2` inside `base/3.2.json` and inside `base/3.2-old`;
   - `tech/stack` inside `tech/stack-old`;
   - `tech/3`, and `contracts/7` even where no `contracts` folder exists.

   The `stage3` note already says that both behaviours change, so only the `change` notes contradict it. Replace them as follows:
   - Paragraph "stands alone": «Новое: часть более длинного пути или имени расположением не считается. Перед текстом код так и делает, а после текста пока нет: например, он отвергает `base/3.2` в `base/3.2.json`; это исправляется в стадии 3.»
   - Paragraph "Text has the form…": «Новое: какой текст имеет форму расположения, — по узлу «How a node's location is computed». Код сейчас берёт начала расположений из постоянного списка и потому отвергает, например, `tech/3`, которое расположением не является; это исправляется в стадии 3.»
2. **WORDING FIX, a nit.** The reason says a location "changes whenever" the specification is reordered. That overstates it, since a reordering elsewhere leaves this node's location as it is. It is a nit because a careful reader takes the intended meaning.
   - EN: "A node's location can change whenever the specification is reordered, while its sid never changes (§s-9spq78kdwsxr759)."
   - RU: «Расположение узла может измениться всякий раз, когда спецификацию переупорядочивают, а его sid не меняется никогда (§s-9spq78kdwsxr759).»

## s-m8nmfsxkcfu7cjp: "A citation outside the specification" (verdict: **ready**)

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
- 7.6.3 Examples ✓
- Pairing test of the reason ✓

**Оценка**
- согласованность: ✓ сверено со строкой 10.1.39 (s-e84nggntkrcyumq), её решениями от 2026-11-13 и 2026-11-20 и её todo, с 2.6 (s-f2b5zvc565s242f), 9.1 (s-hheus6f395ynqvc), 10.10 (s-sfjka4zc4rhfu67), 10.11, 6.3 (s-cxtt6jvhqcey2k9), s-36x8amvunmv2kp5, s-trwczfskj5zmuft, с решением владельца от 2026-11-12 о ссылках на архивный узел и с решением 5 раунда b.
- целостность: ✓ s-36x8amvunmv2kp5 проверяет SpecTag в коде системы и в файле привязок. Этот узел проверяет всё остальное вне `specs/`, а s-qzyacnqwvaeaps4 — ссылки внутри узлов. Правки `reindex.ts:104` и `impl.json` названы.
- целесообразность: ✓ иначе никто не заметит вне спецификации sid, который не называет ни одного узла, или номер вместо sid.
- избыточность: ✓ не найдено.
- недостаточность: ✓ не найдено. Я проверил по текущему `specs/`: если читать все текстовые файлы вне `specs/`, отвергнут был бы только sid-заглушка в `reindex.ts:104`, и `stage3` о нём говорит.

**Findings**
1. **WORDING FIX, a nit.** The draft says "in the system's code (§…) or its tests". Write it as s-36x8amvunmv2kp5 does, since that is the check this item hands the sid to. It is a nit because 9.1 already counts the tests as part of the system's code, and the agreed 10.10 itself says "or in its tests".
   - EN: "the sid of each SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) in the system's code (§s-hheus6f395ynqvc), including its tests, which is left to the check for a SpecTag that names no node."
   - RU: «sid каждого SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) в коде системы (§s-hheus6f395ynqvc), включая его тесты: такой sid оставлен проверке SpecTag, который не называет ни одного узла.»
2. **TERM: "a file that git treats as binary".** This is git's own idea: I read the gitattributes documentation in this run. A file counts as binary when its `diff` attribute is unset, or, with no attribute set, when git looks at its contents and finds they are not text. The meaning is the same, so I recommend no change. For "fixture", the gloss already recorded for the docs stands: it matches the xUnit "test fixture" only in part (unverified).

## Earlier rounds and round c
- Every finding of review b-b was applied: A1 to A4 on the first draft, B1 to B5 on the second. The readers' "makes this check" and "leaves out" were kept, as groups 1 to 3 have them, and that reason holds.
- Round c brought no new defect into either node. Its new `stage3` note on path boundaries (finding A3) is what now contradicts the older `change` note in finding 1 above.

## Only the owner can answer
None.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json` (both keys), `D:/SpecSheriff/skills/tools/src/binding.ts` (lines 410–432 and 519–537).
