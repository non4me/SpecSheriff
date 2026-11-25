# Group 6, input d: review report

Neither draft is ready yet. The author can fix every finding below, and none of them needs the owner.

## `new:tools-2-strict`: "Turning the `strict` flag on" (s-nxgkp988mej79eg)

**Verdict: not ready.**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✗ The opening sentence has 37 words: "`sheriff settings` refuses to turn … if the specification were approved and the flag were on."
- 7.2.3 General words ✓
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✗ `sheriff settings` is first used in the first sentence, but s-chsfpkgpmfk4fft is cited only in the second.
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✗ "`sheriff settings` records an entry that turns the `strict` flag off without running any check." This states that something no rule requires is not done (s-2jcmb9xe9d64t2t).
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✗ "The first commit after the specification is approved is then refused…" cannot happen. While the flag is on, `sheriff settings` refuses the approval itself (s-m59dqwkw2e96wne, rule 10.6).
- Pairing test ✓ The reason's two sentences give the flag's purpose and the ground for the refusal. They do not go through the paragraphs of the text one by one.

**Оценка**
- согласованность: ✗ пример и второе предложение обоснования расходятся с s-m59dqwkw2e96wne и правилом 10.6 (s-qzthyh7yqvfhsa2): при включённом флаге отвергается само одобрение спецификации, а не первый коммит после него. С правилами 10.7 (s-q3pfzyaxvpr2zj2, решения от 2026-11-17) и 9.5 (s-kkbqcb9xrpaepwn) и с узлами s-3xx2eukc8gtd2tx, s-weuyx98r7c923ab и s-7pk89t8z6wymmj9 расхождений нет.
- целостность: ✗ s-m59dqwkw2e96wne отсылает к этому узлу за проверками, которые флаг делает строже, но узел не говорит, над какими файлами они выполняются. Последний абзац s-chsfpkgpmfk4fft повторяет то, что называет отказ.
- целесообразность: ✓ процедуру требует правило 10.7. Флаг делает строже только проверку из правила 9.5 и собственные проверки проекта. Ни одно расширение (domains, recordtype, views) флаг не упоминает.
- избыточность: ✗ предложение «The refusal names…» повторяет последний абзац s-chsfpkgpmfk4fft. Последний абзац узла говорит о том, чего не требует ни одно правило.
- недостаточность: ✗ не сказано, над чем выполняются проверки: над рабочим деревом или над последним коммитом.

**WORDING FIX, with one added statement (author).** Replace the first paragraph. The second sentence is new content: it names the files the checks read, as s-m59dqwkw2e96wne does for the approval.
- EN: "`sheriff settings` (§s-chsfpkgpmfk4fft) refuses to turn the `strict` flag on (§s-q3pfzyaxvpr2zj2) where a check that the flag makes stricter would refuse a commit or push that changes nothing. It makes these checks on the files in the working tree, as if the specification were approved and the flag were on. The refusal names, for each check that would refuse, the command that lists what that check finds. Where no such check would refuse, `sheriff settings` records the entry that turns the flag on (§s-d3nkw9b6mn98vuw)."
- RU: «`sheriff settings` (§s-chsfpkgpmfk4fft) отказывается включить флаг `strict` (§s-q3pfzyaxvpr2zj2), если проверка, которую флаг делает строже, отвергла бы коммит или push, который ничего не меняет. Эти проверки она выполняет над файлами рабочего дерева так, будто спецификация одобрена, а флаг включён. Отказ называет для каждой проверки, которая отвергла бы такой коммит или push, команду, перечисляющую то, что эта проверка находит. Если ни одна такая проверка его не отвергла бы, `sheriff settings` вносит запись, которая включает флаг (§s-d3nkw9b6mn98vuw).»
- This also fixes the current Russian, which narrows "would refuse" to «отвергла бы такой коммит» and drops the push.

**DOUBT (author).** The example and the reason describe what happens in the wrong place. While the specification is a draft, the flag blocks the approval, not every commit.
- Example, last two sentences, EN: "The most likely mistake is to turn the flag on because the specification is a draft. `sheriff settings` then refuses to approve the specification until a SpecTag binds both functions."
- Example, RU: «Самая вероятная ошибка — включить флаг, потому что спецификация — черновик. Тогда `sheriff settings` отказывается одобрить спецификацию, пока SpecTag не свяжет обе функции.»
- Reason, second sentence, EN: "…the flag would make every commit fail, or keep the specification from being approved, until that check passed."
- Reason, RU: «…флаг заставил бы отвергать каждый коммит или не дал бы одобрить спецификацию, пока эта проверка не пройдёт.»

**CUT (author decides).** Cut the last paragraph. s-chsfpkgpmfk4fft already records `strict off`. The last paragraph of s-m59dqwkw2e96wne has the same defect.

**Integrity (author).** Add to item 5 of "Changes still needed": when s-chsfpkgpmfk4fft next changes, its last paragraph goes, because this node states it.

**TERM.** The node adds no new term. The name `strict` was settled by the owner on 2026-11-17.

## `proposal:s-7pk89t8z6wymmj9-g6`: "How a project's own check is run"

**Verdict: passes after the fixes below.**

The proposal changes only what its `change` field lists. The defect it fixes is real: under the agreed wording, a single check could not report while the flag is off and refuse while it is on, which is what rule 10.7's second example describes. The `change` field overstates this, though. «Прежде это нельзя было выразить» should read «прежде одна проверка не могла этого выразить: понадобились бы две».

**Checklist**
- 7.3.2 Thoughts and sentences ✗ "reports the check's failure while … off, and refuses the change while the flag is on" states two relations.
- Every other rule (1.2.3, 7.1, 7.2.1–7.2.7, 7.3.1, 7.3.3, 7.4.1, 7.4.2, 7.5.1–7.5.3, 7.6.1–7.6.3) ✓
- Pairing test ✓

**Оценка**
- согласованность: ✗ второе предложение нового абзаца обходит общее правило. Первый абзац и правило 10.8 (s-2fau85dfyyeq66m) требуют отказа, если правило, перечисляющее проверку, не говорит, что о её неудаче только сообщается, а говорит это только `reported`. Исправленная формулировка согласуется с решением владельца от 2026-11-04, со стоимостью в строке 10.1.37 (s-ujm7nfxkk9j3464), с правилом 10.7 и с s-w6gybeqn2ttydqx, где модель несёт флаг.
- целостность: ✓ s-m59dqwkw2e96wne опирается на первые два предложения абзаца о `sheriff settings`, а s-nxgkp988mej79eg — на абзац о `--strict`. Схема элементов и validate.ts названы в `stage3`. Значения `onFailure` больше нигде не перечислены.
- целесообразность: ✓ дефект настоящий, и новое значение — самый простой способ его устранить.
- избыточность: ✗ последнее предложение абзаца о `sheriff settings` повторяет второй пункт s-nxgkp988mej79eg.
- недостаточность: ✓ при неизвестном значении `onFailure` изменение отвергается по первому абзацу.

**WORDING FIX (author).** Replace the fourth paragraph. This fixes 7.3.2, sends `reportedUnlessStrict` through the general rule of the first paragraph, and repairs "that member", which now points back to a member named in the previous paragraph.
- EN: "Where the member that lists the check is an object whose `onFailure` is `reported`, the rule says that the check's failure is only reported. Where that member's `onFailure` is `reportedUnlessStrict`, the rule says that the check's failure is only reported while the specification's `strict` flag (§s-q3pfzyaxvpr2zj2) is off. `sheriff validate` reads the flag from the model of the specification that it gives the check."
- RU: «Если элемент, который перечисляет проверку, — объект, у которого `onFailure` равно `reported`, правило говорит, что о неудаче проверки только сообщается. Если `onFailure` этого элемента равно `reportedUnlessStrict`, правило говорит, что о неудаче проверки только сообщается, пока флаг `strict` спецификации (§s-q3pfzyaxvpr2zj2) выключен. Флаг `sheriff validate` читает из модели спецификации, которую передаёт проверке.»

**CUT (author decides).** Cut "Before `sheriff settings` turns the `strict` flag on (§s-nxgkp988mej79eg), it runs the project's own checks as `sheriff validate --strict` runs them." Its citation and the `cites` link to s-nxgkp988mej79eg go with it.

**TERM: `reportedUnlessStrict`.**
- The closest familiar case is GCC's `-Werror`, which the current manual describes as "Make all warnings into errors". GCC's `-Wno-error=NAME` keeps one warning a warning even under `-Werror`.
- Fit: partial. The `strict` flag works like `-Werror` for this value, and `reported` works like `-Wno-error=`. Unlike a build option, the flag is an act an owner records.
- Recommendation: keep the name, and add the gloss to the docs for developers. It costs nothing in the node (inference).

## Questions only the owner can answer

None.

Sources:
- [GCC: Options to Request or Suppress Warnings](https://gcc.gnu.org/onlinedocs/gcc/gcc-command-options/options-to-request-or-suppress-warnings.html)
