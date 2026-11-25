# Group 4, input b, second review: items 34 and 35

Neither draft is ready. Every first-round finding on both drafts was applied, or rejected for a reason that holds: "skips" and "performs" were kept because groups 1 to 3 use "leaves out" and "makes this check". But the round-b fixes brought in new defects. All of them can be fixed by the author. None of the brief's "Points to look at" concerns these two items.

## s-nh8b2hjvzasdxmd: "A node's location outside the specification" — not ready

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✗ "the location that the model gives the first top-level node". "The model" stands without what it represents. The split in round b caused this. The Russian has a bare «модель», which the owner's term forbids.
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
- согласованность: ✓ сверено с 8.5 (s-kag2m9tzdnduxdx), 1.2.2 (s-9spq78kdwsxr759), s-ygg5kpcxgzq3m7w, строкой 10.1.38 (s-u5hfbygfyqv4wmf), 10.11 (s-6hha5en226aj8hu), s-zefk589ykh37b8u, s-w6gybeqn2ttydqx и `proposal:new-tools-1-project-g4`. Расположение заголовка домена не отвергается. Это совпадает с именем домена, а поле change это называет.
- целостность: ✓ с s-qzyacnqwvaeaps4 и s-m8nmfsxkcfu7cjp пересечений нет. Правки impl.json названы в заметках.
- целесообразность: ✓ без этой проверки устаревшее расположение вне `specs/` никто не заметил бы.
- избыточность: ✓ не найдено.
- недостаточность: ✓ не найдено. Код нарушает границу «части более длинного пути» (A3).

**Findings**
- **A1, WORDING FIX** (author). EN: "the location that the model of the specification gives the first top-level node of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5), such as `tech/stack`." RU: «расположение, которое модель спецификации даёт первому узлу верхнего уровня файла guidelines, описания инструментов (§s-a4rbry4hsu34hy8) или технического приложения (§s-tj38pvm38nepaf5), например `tech/stack`.»
- **A2, WORDING FIX, Russian only** (author). The agreed rules 1.2.2 and 10.11, rows 10.1.38 and 10.1.39, and s-qzyacnqwvaeaps4 all render "citation" and "cite" as «ссылка» and «ссылаться». This draft uses «цитата» and «цитировать» instead.
  - «…и говорит, что на узел ссылаются по его sid (§s-9spq78kdwsxr759).»
  - «…как fixture тестов проверки, которая читает ссылки или расположения (§s-6hha5en226aj8hu).»
- **A3, stage 3** (author, notes only). I ran the code's own pattern on test strings. binding.ts:424 refuses `base/3.2` inside `base/3.2.json`, `base/3.2-old` and `base/3.2/x`, and `tech/stack` inside `tech/stack-old`. The draft says such text is part of a longer path or name, so it is not a location. Add to `stage3`: "After the text, `-`, `/`, and `.` followed by a letter or a digit continue a path or a name, as they do before it."
- **A4, WORDING FIX** (author, example). The example says "refuses that line", but the text refuses each location. EN: "`sheriff binding` refuses `base/3.2` in that guide, naming the guide, the line and `base/3.2`, though no node is at that location now." RU: «`sheriff binding` отвергает `base/3.2` в этом руководстве, называя руководство, строку и `base/3.2`, хотя сейчас по этому расположению узла нет.»

## s-m8nmfsxkcfu7cjp: "A citation outside the specification" — not ready

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
- 7.2.7 Words that take their meaning from the specification ✗ "whose SpecTags". This is the first use of "SpecTag", and nothing there cites the node that defines it. The bindings-file item moved to the top in round b, so it now comes before the cited item.
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
- согласованность: ✓ сверено со строкой 10.1.39 (s-e84nggntkrcyumq), её решениями и todo, с 2.6 (s-f2b5zvc565s242f), 10.10 (s-sfjka4zc4rhfu67), 10.11, 6.3 (s-cxtt6jvhqcey2k9), s-36x8amvunmv2kp5 и строкой 10.1.28 (s-w4g56n2bs753rt3).
- целостность: ✗ заметки (пункт 33 и пункт 2 перечня «Changes still to be made») всё ещё переносят ссылку «Project-wide settings» на glob-шаблоны собственных проверок на этот узел. После решения 5 узел этих шаблонов не читает (B3).
- целесообразность: ✓ иначе мёртвый sid или номер вместо sid вне спецификации не заметит ничто.
- избыточность: ✓ не найдено.
- недостаточность: ✗ о двоичных файлах ничего не сказано (B1).

**Findings**
- **B1, DOUBT** (author can fix: row 10.1.39 covers code, tests and documentation, and a binary file is none of these). I read every tracked file outside `specs/` as UTF-8. Four of the 22 binary files hold a `§` followed by a digit: `_promo/images/png/1-how-it-works.png`, `2-what-stops-bad-code.png`, `card-6-1-one-language.png` and `card-6-10-what-no-rule-requires.png`. No text file does. Under option B, this repository would refuse its own images. Add as the second item of the list of what it leaves out, and to `stage3` and `change`. EN: "each file that git treats as binary, such as an image;" RU: «каждый файл, который git считает двоичным, например изображение;»
- **B2, WORDING FIX** (author, rule 7.2.7). EN: "the bindings file (§s-trwczfskj5zmuft), whose SpecTags (§s-5z5gnu7pahr82xp) are left to the check for a SpecTag that names no node (§s-36x8amvunmv2kp5);" RU: «файл привязок (§s-trwczfskj5zmuft): его SpecTag (§s-5z5gnu7pahr82xp) оставлены проверке SpecTag, который не называет ни одного узла (§s-36x8amvunmv2kp5);»
- **B3, notes** (author). Name another target for the "Project-wide settings" citation, or drop it. The node whose `stage3` reads those files for SpecTags is s-t383grkn3q68dpf.
- **B4, Russian only** (author, same reason as A2).
  - ruTitle: «Ссылка за пределами спецификации».
  - «…так на узел ссылаются по номеру, а не по его sid…»
  - «…проверки, которая читает ссылки или расположения…»
  - ruReason: «За пределами спецификации у ссылки нет связи с узлом, на который она ссылается (§s-cxtt6jvhqcey2k9). Поэтому ссылка на sid, который не называет ни одного узла, или номер вместо sid вводили бы в заблуждение каждого читателя, и ни одна другая проверка этого бы не заметила.»
  - Example: «…ссылается на `§s-…`…» and «…тогда ссылка проходит…»
  - In the `change` field, the quote of row 10.1.39 should read «о каждой ссылке».
- **B5, stage 3** (author, both drafts). `proposal:new-tools-1-project-g4` reads each `TextRule.list` in its last approved wording. `fixtureGlobs` (`skills/tools/src/model.ts:43`) reads the list as the commit holds it. Neither `stage3` says this changes.
- **TERM:** no new term. "fixture" matches the xUnit "test fixture" only in part (unverified); the docs gloss is already recorded.

## The merge-commit question (from the brief)
The question is put in terms of what a developer sees, and each option has a cost. Both drafts carry answer A word for word. But A's cost leaves out one remaining risk. The author can add to «Цена»: «влитый коммит, сделанный без хуков (`git commit --no-verify`, веб-редактор), при слиянии снова не проверяется». Under B, that commit would be checked at the merge.

## Only the owner can answer
None.
