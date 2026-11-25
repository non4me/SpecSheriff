# Group 4, input b, final review: items 34 and 35

Both drafts are **ready**. I found one nit in the notes, shared by both drafts, and one TERM. Neither changes a node's wording.

I loaded the skill. I read both briefs, every earlier report on these items and the round-d notes, and changed no file. None of the brief's "Points to look at" concerns these two items.

## s-nh8b2hjvzasdxmd: "A node's location outside the specification" (**ready**)

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
- согласованность: ✓ сверено с предложением по 8.5 (s-kag2m9tzdnduxdx) и его решением от 2026-11-05, с 1.2.2 (s-9spq78kdwsxr759), с s-ygg5kpcxgzq3m7w, s-w6gybeqn2ttydqx и s-zefk589ykh37b8u, со строкой 10.1.38 (s-u5hfbygfyqv4wmf), с 10.11 (s-6hha5en226aj8hu), с `proposal:new-tools-1-project-g4` и с принципами.
- целостность: ✓ с s-qzyacnqwvaeaps4 и s-m8nmfsxkcfu7cjp нет ни разрыва, ни перекрытия: `§5.8` отвергает только s-m8nmfsxkcfu7cjp, а `base/3.2` — только этот узел. Правка `moved/impl.json` названа в заметках. Заметка `stage3` неполна, это находка 1.
- целесообразность: ✓ без этой проверки расположение, оставшееся вне `specs/` после переупорядочивания, никто не заметит.
- избыточность: ✓ не найдено.
- недостаточность: ✓ не найдено. Расположения из удалённой или переименованной папки либо файла узел не отвергает. Но по истории git ни здесь, ни в saloon такого не было, так что случай гипотетический.

## s-m8nmfsxkcfu7cjp: "A citation outside the specification" (**ready**)

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
- согласованность: ✓ сверено со строкой 10.1.39 (s-e84nggntkrcyumq), её решениями и todo, с 2.6 (s-f2b5zvc565s242f) и решением владельца от 2026-11-12, с 9.1 (s-hheus6f395ynqvc), 10.10, 10.11, 6.3 (s-cxtt6jvhqcey2k9), s-36x8amvunmv2kp5, s-trwczfskj5zmuft и решением 5 раунда b.
- целостность: ✓ SpecTag в коде системы, включая тесты, и в файле привязок проверяет s-36x8amvunmv2kp5, теми же словами. Всё остальное вне `specs/` проверяет этот узел. Заметка `stage3` неполна, это находка 1.
- целесообразность: ✓ иначе мёртвый sid или номер вместо sid вне спецификации никто не заметит.
- избыточность: ✓ не найдено.
- недостаточность: ✓ не найдено. Я проверил все текстовые файлы вне `specs/`. Отвергнута была бы только заглушка в `reindex.ts:104`, о которой говорит `stage3`, а `§` с цифрой не встречается нигде.

## Findings

1. **Notes only, a nit, both drafts; the author can fix it.** Ruling 1 of round d says the SpecSheriff tools take the `refines` links from the commit of the last approval. `fixtureGlobs` finds the rule on fixtures by such a link (`model.ts:43`), but both `stage3` notes mention only the last approved wording. This is a nit because each note already defers to the proposal. In both notes, replace "it is to read the rule in its last approved wording, as proposal:new-tools-1-project-g4 says." with "it is to read the rule in its last approved wording, with its refines links taken from the commit that added that approval (s-5ah25f6gy99panq), as proposal:new-tools-1-project-g4 says."
   - For `group4-ru.json`: «…читать правило в последней одобренной формулировке, а его связи refines брать из коммита, добавившего это одобрение (s-5ah25f6gy99panq), как говорит proposal:new-tools-1-project-g4.»
2. **TERM, s-m8nmfsxkcfu7cjp.** A sid that names no node is close to what OpenFastTrace calls an orphaned link. The registry only says that its links "can be orphaned or outdated".
   - Fit: partial (inference). OpenFastTrace means links between its specification items, while this node refuses any sid in any file.
   - I could not fetch its guide in this run, so its exact definition is unverified.
   - I recommend a gloss in the docs and no change to the node, which costs the node nothing.

## Earlier rounds and round d

- **Review c-b:** every finding was applied word for word.
- **Round c readers:** their accepted points were applied. The rejections hold. The thorough reader's two readings of "It leaves out the following" give the same behaviour for every item.
- **Round d:** compared with `tools-drafts.before-group4-d.json`, it changes only the wordings those reports asked for, and it brought in no defect. No reader has read the round-d English yet, so I read each changed sentence myself.

## Only the owner can answer

None.

No web source was used. The search for OpenFastTrace's guide returned nothing relevant.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/skills/tools/src/model.ts`, `D:/SpecSheriff/skills/tools/src/binding.ts`
