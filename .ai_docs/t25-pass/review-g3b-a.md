Skill `specsheriff-terminology-review` is loaded. My input (g3b-a) holds neither proposal and not Q1, so this report doesn't check them.

## s-j9r8z4xdrfkfs47, "Entries that only an owner of the specification records": **not ready**

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
- согласованность: ✓ сравнено с 10.6, 10.7, 1.7.5, строками 10.1.27/27a/27b и их решениями (2026-11-13, -17, -18), s-chsfpkgpmfk4fft, s-75ue25v6r23jkk8, s-gb8s9657a65hqmv, s-3xx2eukc8gtd2tx и узлом «What the SpecSheriff tools read in the project's own guidelines» (ответственные названы в верхнем узле `project.json`).
- целостность: ✓ в заметках названы s-b6qdtghnyha3fhk, пункты 48 и 49, записи impl.json для 27a и 27b и todo строки 10.1.27; s-9rtrj24myzjvshu и s-utf4mbt7ref8g9c больше не ссылаются на этот узел.
- целесообразность: ✓ проблема названа. Записи родителя должны идти первыми, а каждая новая запись должна называть ответственного. Это простейшая проверка, которая ловит и перестановку записей.
- избыточность: ✓ не найдено.
- недостаточность: ✓ не найдено.

All four of review A's fixes are in place, word for word. The sentence the author wrote in their own words keeps the meaning of the Russian.

**Findings** (the author can fix both)
1. **WORDING FIX:** the list gives the only cases in which a change is accepted, but the sentence that introduces it says "provided that" rather than "only". That breaches "A rule says what holds" in `.claude/vt/rules.md`; the agreed s-75ue25v6r23jkk8 says "only where". Putting "only where" straight after "changes (§…)" would read as "an owner changes only where…", so the sentence is reordered:
   "For a setting that only an owner of the specification changes (§s-chsfpkgpmfk4fft), `sheriff binding` accepts a commit's change to the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) only where both of the following hold:"
   «Для настройки, которую меняет только ответственный за спецификацию (§s-chsfpkgpmfk4fft), `sheriff binding` принимает изменение, которое коммит вносит в записи в `sheriff.config.json` (§s-zefk589ykh37b8u), только если выполнено и то и другое:»
2. **WORDING FIX (Russian only):** in the reason, «исправление» means correcting a mistake, but "editing" means any change. The reason should open «Удаление, правка или перестановка уже внесённой записи, …», with the rest unchanged.

## new:tools-7-1-extensions-delivered (s-mhsb6fjsq5xn6c9), "The chosen extensions and the installed plugin": **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✗ "compose the schema of the specification with the schema of each chosen extension"
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
- согласованность: ✗ фраза «compose the schema of the specification with the schema of each chosen extension» расходится с 5.1 (s-eferktypcj7njt5) и s-xzcw3hv4hmxz7h7. Там схема спецификации — это результат сборки, и схемы выбранных расширений уже входят в неё. Остальное сверено со строкой 10.1.27c и её решением от 2026-11-18, с 1.7.1, 1.7.5, 1.7.6, 1.7.7, s-chsfpkgpmfk4fft, s-zefk589ykh37b8u и s-gb8s9657a65hqmv.
- целостность: ✓ в заметках названы запись impl.json для 10.1.27c и пункт 58 (s-st6td4mua9uqt9z). С s-chsfpkgpmfk4fft и s-xzcw3hv4hmxz7h7 нет ни пробела, ни пересечения.
- целесообразность: ✓ более ранний выпуск плагина на машине участника команды — реальный случай. Отказ выполняться до начала любой работы — простейшее решение.
- избыточность: ✓ не найдено.
- недостаточность: ✓ не найдено. Что отказ `sheriff guard` значит для правки агента, скажет пункт 58.

Review A's fixes are in place, word for word. Review A's doubt about `sheriff guard` is settled by the owner's ruling of 2026-11-18 on row 10.1.27c, and the change note on the page shows the owner what follows from it. The two sentences the author wrote in their own words keep the meaning of the Russian.

**Finding** (the author can fix it)
1. **WORDING FIX:** under 5.1 and s-xzcw3hv4hmxz7h7, the tools compose the schema of the specification. That schema already includes each chosen extension's schema, so "compose it with" treats it as an input. Also, not every extension has a schema. The replacement for the first sentence of paragraph 2:
   "The commands that read the chosen extensions include `sheriff validate`, `sheriff binding` and `sheriff reindex`, which, as they compose the schema of the specification, add to it the schema of each chosen extension that has one (§s-xzcw3hv4hmxz7h7)."
   «Среди команд, которые читают выбранные расширения, — `sheriff validate`, `sheriff binding` и `sheriff reindex`, которые, составляя схему спецификации, добавляют в неё схему каждого выбранного расширения, у которого она есть (§s-xzcw3hv4hmxz7h7).»

**TERM:** neither draft introduces a new term. "Delivers" is the owner's wording, and "compose the schema" is the term of the agreed s-xzcw3hv4hmxz7h7.

## Findings only the owner can answer
None.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/review-input-g3b-a.md`
