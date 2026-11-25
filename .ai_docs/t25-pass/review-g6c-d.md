# Group 6, input d, round c: final review

The node on turning the `strict` flag on is **not ready**. Its only blocking problem is in the paragraph round c added, and the author can fix it. The proposal on how a project's own check is run is **ready**: it has one nit. No question goes to the owner.

The skill `specsheriff-terminology-review` was loaded. The checklist below comes from `node .claude/vt/writing-rules.mjs`.

---

## `new:tools-2-strict`: "Turning the `strict` flag on" (s-nxgkp988mej79eg) — not ready (the author can fix it)

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
- 7.2.7 Words that take their meaning from the specification ✓. Citing s-xzcw3hv4hmxz7h7 for the validation follows the group 4 decision on drafts that have no sid yet.
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
- Pairing test ✓: the first sentence of the reason gives the flag's purpose, and the second justifies the refusal as a whole.

**Оценка**
- согласованность: ✓ сверено с 10.7 (s-q3pfzyaxvpr2zj2) и его решениями от 2026-11-17, 9.5 (s-kkbqcb9xrpaepwn), s-3xx2eukc8gtd2tx, предложением по s-weuyx98r7c923ab, s-chsfpkgpmfk4fft, s-d3nkw9b6mn98vuw, s-w6gybeqn2ttydqx, предложением по s-7pk89t8z6wymmj9 и с принципами.
- целостность: ✗ правило 10.7 называет одни и те же случаи для обеих процедур. Но s-m59dqwkw2e96wne под флагом отказывает только «where any of them would refuse». Поэтому новый случай — файлы не прошли проверку ключей или схемы — на одобрение спецификации не переходит. s-chsfpkgpmfk4fft и s-7pk89t8z6wymmj9 остаются верными.
- целесообразность: ✓ процедуру требует 10.7. Ни одно расширение (domains, recordtype, views) флаг не упоминает, так что список проверок полон.
- избыточность: ✓ кроме уже записанного пересечения с последним абзацем s-chsfpkgpmfk4fft (п. 5 заметок).
- недостаточность: ✗ третий абзац не говорит, что называет отказ. Этого требуют решение группы о форме («the next sentence says what the refusal names») и образец 10.7.

**1. WORDING FIX (author).** Replace the third paragraph with:
- EN: "`sheriff settings` also refuses to turn the `strict` flag on while the files of the specification fail the check for a key written more than once (§s-7zqsstgnuc772ba) or the validation against their schema (§s-xzcw3hv4hmxz7h7). The refusal names `sheriff validate`, which lists what those checks find."
- RU: «`sheriff settings` отказывается включить флаг `strict` и тогда, когда файлы спецификации не проходят проверку на ключ, записанный больше одного раза (§s-7zqsstgnuc772ba), или проверку на соответствие своей схеме (§s-xzcw3hv4hmxz7h7). Отказ называет `sheriff validate`, который перечисляет то, что находят эти проверки.»

Also add "naming sheriff validate" to `stage3`.

**2. Fix in another draft (the author of `new:tools-2-approve-spec`, in input b).** In s-m59dqwkw2e96wne, replace "Where any of them would refuse a commit or a push that changes nothing, `sheriff settings` refuses to record the approval." Rule 10.6 already uses this form ("in the cases that the rule on that flag names").
- EN: "`sheriff settings` refuses to record the approval in each case in which it would refuse to turn the flag on (§s-nxgkp988mej79eg)."
- RU: «`sheriff settings` отказывается внести одобрение в каждом случае, в котором она отказалась бы включить флаг (§s-nxgkp988mej79eg).»

**3. Nit.** The list's opening sentence says "such a commit or a push", which points back across a paragraph. Replace it with "a commit or a push that changes nothing" (RU «коммит или push, который ничего не меняет»).

**Round b.** Every finding of review b-d and of both readers was applied. The rejections ("by an act of their own", "may", the title of s-3xx2eukc8gtd2tx) still hold.

**TERM.** No new term. The owner settled the name `strict` on 2026-11-17.

---

## `proposal:s-7pk89t8z6wymmj9-g6`: "How a project's own check is run" — ready (one nit)

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
- Pairing test ✓

**Оценка**
- согласованность: ✓ сверено с 10.8 (s-2fau85dfyyeq66m) и решением от 2026-11-04, вторым примером 10.7, строкой 10.1.37 (s-ujm7nfxkk9j3464), s-w6gybeqn2ttydqx, s-3xx2eukc8gtd2tx, s-m59dqwkw2e96wne, s-nxgkp988mej79eg, s-chsfpkgpmfk4fft.
- целостность: ✓ то, что говорил убранный абзац, теперь говорят s-m59dqwkw2e96wne и s-nxgkp988mej79eg. Все три узла, которые ссылаются на этот, по-прежнему верны.
- целесообразность: ✓ дефект настоящий. При одном значении `reported` одна проверка не может сообщать при выключенном флаге и отвергать при включённом. Новое значение — самое простое средство.
- избыточность: ✓ значения `onFailure` больше нигде не названы.
- недостаточность: ✓ код пока понимает только `reported` (validate.ts:202), и `stage3` это говорит.

The proposal changes only what its `change` field lists. Nits a and c of round b were applied, and nit b is moot because its paragraph was cut. The readers' findings were applied, or rejected for reasons that still hold.

**Nit, stage 3.** The base's `stage3` still says that `sheriff settings` runs the project's own checks "as this node says before it records an approval". When the stage-3 notes are merged, name s-m59dqwkw2e96wne and s-nxgkp988mej79eg there.

**TERM.** `reportedUnlessStrict` was already glossed in item 17 of the notes.

---

## Questions only the owner can answer
None.

The drafts reviewed are in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, compared with `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.before-group6-c.json`.
