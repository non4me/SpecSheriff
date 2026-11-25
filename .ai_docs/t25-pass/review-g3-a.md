Skill `specsheriff-terminology-review` is loaded in context. The checklist below is what `node .claude/vt/writing-rules.mjs` printed. The three "Points to look at" are about s-w93jfnqynfa47pf, s-2x58az67bm6cxq2 and s-czxaqvaesmu3gru. None of them is in input g3-a, so I did not assess them.

---

## s-j9r8z4xdrfkfs47, "Entries that only an owner of the specification records": not ready

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
- 7.2.7 Words that take their meaning from the specification ✗ "`project.json`" is not cited at its first use
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✗ reason: "…is decided by its latest entry, which only an owner records" puts two facts side by side
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
- согласованность: ✓ сравнено с 10.6, 10.7, 1.7.5, строками 10.1.27/27a/27b и их решениями (2026-11-13, -17, -18), s-chsfpkgpmfk4fft, s-75ue25v6r23jkk8, s-gb8s9657a65hqmv, s-3xx2eukc8gtd2tx, 10.3.
- целостность: ✗ Узел «The tests, run before a push» (s-b6qdtghnyha3fhk) ссылается на этот узел, чтобы определить, одобрена ли спецификация в коммите, но узел больше этого не говорит, а заметки его не называют. Что последняя запись стоит в файле последней, должны сказать пункты 48 и 49, а заметки называют только 48.
- целесообразность: ✓ проблема названа. Требование, чтобы прежние записи шли первыми и в том же порядке, — самая простая проверка, которая ловит и перестановку.
- избыточность: ✗ абзац со списком настроек повторяет первый абзац s-chsfpkgpmfk4fft.
- недостаточность: ✓ не найдено.

**Findings** (the author can fix all of them)
1. **WORDING FIX:** "from `project.json` (§s-zefk589ykh37b8u) as the commit leaves it" / «из `project.json` (§s-zefk589ykh37b8u) в том виде…». The node already has the link.
2. **WORDING FIX:** "Where an entry names a person who is not an owner…" states its condition in the negative, against "A rule says what holds" (the owner's ruling of 2026-11-21). Replace the two sentences on the refusal with: "The refusal names the setting, each entry concerned and the specification's owners." / «Отказ называет настройку, каждую затронутую запись и ответственных за спецификацию.»
3. **WORDING FIX:** the reason says that removing "an earlier entry" *would* change the setting. That is false for an entry before the latest one. New reason: "Removing, editing or moving an entry already recorded, or recording an entry in the name of a person who is not an owner, could change a setting that only an owner of the specification changes without an act of an owner (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-9ttvcwpqkehm58g)." / «Удаление, исправление или перестановка уже внесённой записи, как и внесение записи от имени человека, который не является ответственным, могли бы изменить настройку, которую меняет только ответственный за спецификацию, без действия ответственного (…).»
4. **CUT:** the paragraph "The settings that only an owner … are the following:" and its list. They copy s-chsfpkgpmfk4fft, which the first paragraph already cites ("One statement, one home"). The copy would also miss any setting added there later. The `cites` link to s-mbmnsnxenmavu3z goes with it.
5. **Notes:**
   - Name s-b6qdtghnyha3fhk among the nodes that must change.
   - Items 48 and 49 must define an entry that holds nothing that depends on when it is written, such as a time. Otherwise the parent's entry as `sheriff reindex` would rewrite it (s-gb8s9657a65hqmv) differs from the committed entry.
   - The `APPROVAL_RULE` branch is at approvals.ts:97, not at :111-114.
6. **TERM:** an entry is never edited and a later entry decides. This is the [ADR] rule (Nygard 2011, from the skill's registry): a record is superseded, never edited. The meaning is the same, so a gloss in the docs is enough, at no cost.

## new:tools-7-1-extensions-delivered (s-mhsb6fjsq5xn6c9), "The chosen extensions and the installed plugin": not ready

**Checklist**
- 1.2.3 ✓
- 7.1 ✓
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
- 7.2.7 ✓
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
- согласованность: ✓ строка 10.1.27c и решение 2026-11-18, 1.7.1, 1.7.5, 1.7.6, 1.7.7, s-chsfpkgpmfk4fft, s-zefk589ykh37b8u, s-xzcw3hv4hmxz7h7, «Validation against the schema before a command works on the files».
- целостность: ✓ запись для строки 10.1.27c в impl.json названа в заметках. Пересечения с узлом о валидации по схеме нет.
- целесообразность: ✓ участник команды на более раннем выпуске — реальный случай, и решение простейшее.
- избыточность: ✓ не найдено.
- недостаточность: ✗ из текста не видно, что команда отвергает: там только «stops». Отказ коммита, которого требует строка, виден лишь в примере. Не показано и то, что `sheriff guard` отказывает в каждой правке агента.

**Findings**
1. **WORDING FIX (author):** replace the second sentence with: "Where the plugin lacks any of them, the command refuses to run. The refusal names each missing extension and the version of the SpecSheriff tools in the plugin." / «Если плагину недостаёт хотя бы одного из них, команда отказывается выполняться. Отказ называет каждое недостающее расширение и версию инструментов SpecSheriff в плагине.» Change the example to match: "`sheriff validate` refuses to run, naming the extension and the earlier release's version, so…" / «`sheriff validate` отказывается выполняться и называет расширение и версию более раннего выпуска, поэтому…»
2. **DOUBT (owner):** `sheriff guard` loads the model, and the model holds the chosen extensions. So on such a machine `sheriff guard` refuses every edit the agent makes until the plugin is updated, and the notes do not show the owner this. I recommend accepting it and saying so on the page: every commit from that machine is refused anyway.

## Questions only the owner can answer
- Whether `sheriff guard` refuses all of the agent's edits on a machine whose plugin lacks a chosen extension. This decides what the product does.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/specs/_guidelines/tools.json` (s-b6qdtghnyha3fhk), `D:/SpecSheriff/skills/tools/src/approvals.ts`.
