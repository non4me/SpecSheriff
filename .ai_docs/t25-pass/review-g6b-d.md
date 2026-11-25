# Group 6, input d, round b: follow-up review

The node on turning the `strict` flag on is not ready, but the author can fix every finding. The proposal on how a project's own check is run is ready: it has only nits. Nothing goes to the owner.

The skill `specsheriff-terminology-review` was loaded. The checklist was printed by `node .claude/vt/writing-rules.mjs`.

---

## `new:tools-2-strict`: "Turning the `strict` flag on" (s-nxgkp988mej79eg)

**Verdict: not ready** (the author can fix it).

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✗
  - "and its refusal names `sheriff validate --strict`" can be read as the check's own refusal at a commit.
  - "any of which the rule that lists it may make stricter" reads as if only the listing rule makes a check stricter.
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
- Pairing test ✓ The first sentence of the reason gives the flag's purpose, and the second justifies the refusal as a whole.

**Оценка**
- согласованность: ✗ «the rule that lists it» уже правила 10.7 (s-q3pfzyaxvpr2zj2): строже проверку может сделать любое правило собственных guidelines проекта, а сама проверка читает флаг из модели (s-w6gybeqn2ttydqx). Так же шире говорит и собственное поле `change` этого пункта. Расхождений нет с 9.5 (s-kkbqcb9xrpaepwn), s-3xx2eukc8gtd2tx, s-weuyx98r7c923ab, s-chsfpkgpmfk4fft, s-m59dqwkw2e96wne, s-d3nkw9b6mn98vuw и предложением по s-7pk89t8z6wymmj9.
- целостность: ✓ s-m59dqwkw2e96wne опирается на первый абзац. Предложение, убранное из s-7pk89t8z6wymmj9, теперь говорит второй пункт. Пересечение с последним абзацем s-chsfpkgpmfk4fft записано в п. 5 заметок.
- целесообразность: ✓ процедуру требует правило 10.7. Ни одно расширение (domains, recordtype, views) флаг не упоминает.
- избыточность: ✓ кроме уже записанного пересечения с s-chsfpkgpmfk4fft.
- недостаточность: ✗ (мелочь) не сказано, что делать, если файлы спецификации не проходят проверку ключей или схемы: тогда `sheriff validate --strict` собственные проверки не запускает.

**WORDING FIX 1 (author).** Replace the second paragraph and its list. Add a `cites` link to s-u7tw6m8npxmv5tu.

Why:
- "its refusal" points to each check. Under s-7pk89t8z6wymmj9, a project's own check's refusal at a commit names the check, not `sheriff validate --strict`.
- "the rule that lists it" implies that only `onFailure` makes a check stricter. The tools could read `onFailure`, and the ground for running every check would be gone.
- The Russian «каждая … проверка …, любую из которых» joins a singular noun to a plural relative pronoun.

EN:
"The checks that the `strict` flag makes stricter, the cases in which each would refuse such a commit or push, and the command that the refusal to turn the flag on names for each are the following:
- the check for code and tests outside the commit (§s-3xx2eukc8gtd2tx) that no SpecTag (§s-8xw4mgvpexyvw5q) binds: it would refuse where `sheriff untagged` (§s-weuyx98r7c923ab) would list any code, and the refusal names `sheriff untagged`;
- each of the project's own checks (§s-2fau85dfyyeq66m), any of which a rule of the project's own guidelines (§s-u7tw6m8npxmv5tu) may make stricter (§s-q3pfzyaxvpr2zj2): such a check would refuse where `sheriff validate --strict` refuses the change because of it (§s-7pk89t8z6wymmj9), and the refusal names `sheriff validate --strict`."

RU:
«Проверки, которые флаг `strict` делает строже, случаи, в которых каждая из них отвергла бы такой коммит или push, и команда, которую для каждой из них называет отказ включить флаг, — следующие:
- проверка кода и тестов вне коммита (§s-3xx2eukc8gtd2tx), которые не связывает ни один SpecTag (§s-8xw4mgvpexyvw5q): она отвергла бы, если `sheriff untagged` (§s-weuyx98r7c923ab) перечислила бы хоть какой-то код, и отказ называет `sheriff untagged`;
- каждая из собственных проверок проекта (§s-2fau85dfyyeq66m), любую из которых правило собственных guidelines проекта (§s-u7tw6m8npxmv5tu) может сделать строже (§s-q3pfzyaxvpr2zj2): такая проверка отвергла бы, если `sheriff validate --strict` отвергает изменение из-за неё (§s-7pk89t8z6wymmj9), и отказ называет `sheriff validate --strict`.»

**FIX 2 to the second item's `change` field (author).** The field says that the agreed node on a project's own checks requires this run. The proposal in the same group removes that sentence from that node. Replace its last sentence with:

«Поэтому `sheriff settings` запускает каждую собственную проверку так, как её запускает `sheriff validate --strict`. Прежде это говорил и согласованный узел о таких проверках, а предложение группы 6 переносит это сюда.»

**Nit, `stage3`.** Replace "for each that finds anything" with "for each check that would refuse". A failing check marked `reported` is only reported, even under `--strict`.

**DOUBT, nit (the author can settle it under rule 10.7).** The case left open is the one in недостаточность above. It is a nit because the entry turning the flag on cannot be committed until the files pass those checks, and the owner can turn the flag off before then. To close it, add:
- EN: "`sheriff settings` also refuses to turn the flag on while the files of the specification fail the check for a key written more than once (§s-7zqsstgnuc772ba) or the validation against their schema (§s-xzcw3hv4hmxz7h7)."
- RU: «`sheriff settings` отказывается включить флаг и тогда, когда файлы спецификации не проходят проверку на ключ, записанный больше одного раза (§s-7zqsstgnuc772ba), или проверку на соответствие своей схеме (§s-xzcw3hv4hmxz7h7).»

**Round a.** Every finding of review d and of both readers was applied. The rejections ("by an act of their own", "makes a check") still hold.

**TERM.** The node brings in no new term. The owner settled the name `strict` on 2026-11-17 (s-q3pfzyaxvpr2zj2).

---

## `proposal:s-7pk89t8z6wymmj9-g6`: "How a project's own check is run"

**Verdict: ready** (nits only).

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
- 7.2.7 Words that take their meaning from the specification ✓ (see nit b)
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
- согласованность: ✓ правило 10.8 (s-2fau85dfyyeq66m) и решение от 2026-11-04 (решает правило, которое перечисляет проверку), второй пример правила 10.7, стоимость строки 10.1.37 (s-ujm7nfxkk9j3464), s-w6gybeqn2ttydqx (модель содержит флаг), s-chsfpkgpmfk4fft, s-m59dqwkw2e96wne.
- целостность: ✓ убранное предложение говорит s-nxgkp988mej79eg. s-chsfpkgpmfk4fft и s-m59dqwkw2e96wne по-прежнему верны. В `moved/impl.json` строка 10.1.37 указывает на этот узел. Схема и validate.ts названы в `stage3`.
- целесообразность: ✓ дефект настоящий: одна проверка не могла сообщать при выключенном флаге и отвергать при включённом. Новое значение — самое простое решение.
- избыточность: ✓ значения `onFailure` нигде больше не названы (поиск по `specs/`, `moved/` и черновикам).
- недостаточность: ✓ неизвестное значение отвергается по первому абзацу.

The proposal changes only what its `change` fields list, apart from nit a.

**Nit a, `change` field.** The link to rule 10.7 changed from `cites` to `implements`, and no field says so. Add: «Связь с правилом 10.7 теперь `implements`: узел реализует его второй пример.»

**Nit b, WORDING FIX.** The citation for `sheriff settings` stands late in the sentence of its first use. It is a nit because the citation is already in that sentence.
- EN: "Before `sheriff settings` (§s-chsfpkgpmfk4fft) records an approval of the specification (§s-m59dqwkw2e96wne), it runs the project's own checks (§s-qzthyh7yqvfhsa2)."
- RU: «Прежде чем внести одобрение спецификации (§s-m59dqwkw2e96wne), `sheriff settings` (§s-chsfpkgpmfk4fft) запускает собственные проверки проекта (§s-qzthyh7yqvfhsa2).»

**Nit c, RU.** «Флаг `sheriff validate` читает…» reads at first as "the `sheriff validate` flag", and that command does have a flag, `--strict`. Replace it with «`sheriff validate` читает флаг из модели спецификации, которую передаёт проверке.»

**TERM.** `reportedUnlessStrict` was glossed by review d, and item 17 of the notes records the gloss. There is nothing new to add.

---

## Questions only the owner can answer

None.

Files read: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.before-group6-b.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group6-notes.md`, `D:/SpecSheriff/.ai_docs/t25-pass/review-g6-d.md`, `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`, `D:/SpecSheriff/skills/tools/src/validate.ts`.
