I loaded the skill and read both briefs. Each draft was checked against the moved rules, the agreed drafts, the first review's reports, the round-a texts and the code.

# Item 46a: `s-5nf87c3e3jg9v7c`, "Where the values of a field with `enum` are collected"

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✗ "A domain's name comes from the domain's header". On a first reading this says the name is read from the header, which contradicts the sentence before it (finding 1).
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
- 7.2.7 Words that take their meaning from the specification ✗ "comes from" is used in paragraphs 2 to 4 in the narrower sense of rule 12.9. That sense covers the first top-level node for `contracts`, which holds no such name. Only paragraph 5 explains the phrase and cites 12.9 (finding 1).
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✗ Two sentences breach it:
  - "The name of each such part is the title of its section, and the name comes from that section." sets two facts side by side.
  - The reason's "are written by …, compared with … by …, and read by …" sets three facts side by side.
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
- согласованность: ✓ Сравнивал с 12.7, 12.8, 12.9, с 12.11 и его решением от 2026-11-18, с 1.1.2, 3.1 и 8.5. Также с s-ygg5kpcxgzq3m7w, s-zefk589ykh37b8u, s-ztseyetus7np6br, s-agc6fb3vx46pc23, s-a8fn72xa782wvbk, s-c2r9jndrjbtbsv6, s-ezq8csd433vj6fj и s-4bwa4zepd4nwcv8. Выбор между A и B остаётся за ответственным.
- целостность: ✓ s-c2r9jndrjbtbsv6 и s-dk3zfkbhc3v6xbp остаются верными. Порядок значений в s-4npdup7mjkva69y согласует пункт 56, и это записано в заметках.
- целесообразность: ✓ Один способ сбора значений нужен `reindex`, `validate`, проверке вариантов и `types`.
- избыточность: ✓ Повтор порядка значений уже передан пункту 56.
- недостаточность: ✗ Узел говорит, что значит «comes from», только в пятом абзаце. Фразу «A domain's name comes from the domain's header» читатель поймёт как «имя берётся из заголовка», хотя предыдущее предложение говорит, что имя — это имя папки.

**Verdict: not ready.**

**WORDING FIX 1 (author): "comes from".** The first review's readers flagged this phrase. The author rejected their replacement and kept the words of rule 12.9, which is right. But round b made the phrase worse: its subject used to be "a value", and now it is "a domain's name" and "the name `contracts`", right after "the name … is the name of its folder". The fix keeps the words of 12.9 and explains them where they are first used.
- In paragraph 2, delete the last two sentences. RU: delete «Имя домена приходит…» and «Имя `contracts` приходит…».
- In paragraph 3, the second sentence becomes "The name of each such part is the title of its section." RU: «Имя каждой такой части — название её раздела.»
- Delete paragraph 4. RU: delete «Значение, собранное из sid, …».
- Paragraph 5 becomes:

  EN: "`sheriff reindex` writes each value collected from the names of the parts or from the sids into the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br), together with the sid of the node that the value comes from:
  - for a domain's name, the domain's header (§s-yggv9myedprnaa7);
  - for the name `contracts`, the first top-level node of the first file of `specs/contracts/` in the code-point order of the files' paths;
  - for the title of a section, that section;
  - for a sid, the node whose sid it is.

  `sheriff reindex` writes the values in the order of the nodes that they come from: their files in the code-point order of the files' paths, and the nodes of one file in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w)."

  RU: «`sheriff reindex` записывает каждое значение, собранное из имён частей или из sid, в `x-enumSource.gathered` поля (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br) вместе с sid узла, из которого это значение приходит:
  - для имени домена — заголовка домена (§s-yggv9myedprnaa7);
  - для имени `contracts` — первого узла верхнего уровня первого файла `specs/contracts/` в порядке кодовых точек путей файлов;
  - для названия раздела — этого раздела;
  - для sid — узла, чей это sid.

  Значения `sheriff reindex` записывает в порядке узлов, из которых они приходят: их файлы — в порядке кодовых точек путей файлов, а узлы одного файла — в том порядке, в каком их проходит вычисление расположения (§s-ygg5kpcxgzq3m7w).»

  The links stay as they are. The notes' paragraph "If the owner chooses B" must then name the list item "for the title of a section" instead of the sentence it names now.

**WORDING FIX 2 (author): the reason.** The current reason breaches 7.3.2. It also says that `sheriff reindex` writes all of a field's values, which is wrong for a field's own list.
- EN: "A field's values are used by `sheriff reindex`, `sheriff validate`, the check of RecordType variants and `sheriff types` (§s-ztseyetus7np6br, §s-agc6fb3vx46pc23, §s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Collected in a single way, they are the same for each of these uses and on every machine."
- RU: «Значения поля используют `sheriff reindex`, `sheriff validate`, проверка вариантов RecordType и `sheriff types` (§s-ztseyetus7np6br, §s-agc6fb3vx46pc23, §s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Собранные одним способом, они одинаковы для каждого из этих применений и на каждой машине.»

**WORDING FIX 3 (nit): the second example.** "The field `part` of the same RecordType" refers back to the first example. It is a nit because the owner reads the two examples one after the other.
- EN: "The field `part` of the RecordType of an audit log entry, whose `x-enumSource.from` is `parts`, gets the title of each of those sections, each with the sid of its section."
- RU: «Поле `part` RecordType записи журнала аудита, `x-enumSource.from` которого — `parts`, получает название каждого из этих разделов вместе с sid этого раздела.»

**[check] points.** Each still holds:
- The split into two nodes.
- With the Domains extension, `contracts` is among the parts. Rule 12.11's example, rule 3.1 and "Where the files are" all support it.
- For `contracts`, the value comes from the first top-level node of the first file, since `contracts` has no header.
- Only the project's own kinds are accepted: rules 12.8 and s-czxaqvaesmu3gru.

None of the gaps recorded outside the group is a defect of these drafts.

# Item 46b: `new:tools-7-1-enum-values` (s-dk3zfkbhc3v6xbp), "Which fields with `enum` `sheriff validate` accepts"

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
- согласованность: ✓ Сравнивал с 12.7, 12.8, 5.2, со строками 12.12.11–12.12.13 и их решениями от 2026-11-19. Также с s-czxaqvaesmu3gru, s-xzcw3hv4hmxz7h7, с `uniqueItems` у `enum` в recordtype.schema.json и с фразой о JSON Pointer в s-3anv9qcmx8pwp2w.
- целостность: ✓ для формулировки. В `stage3` не хватает одного пункта, это правка 1 ниже.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✓

**Verdict: ready.** The node's wording needs no change. Its `stage3` needs one sentence before the page is built.

**FIX 1 (author, `stage3` and the notes).** Today's code refuses a value declared more than once, including a gathered one (validate.ts:354-356). Row 12.12.11 does not count gathered values, and under answer A two sections with the same title can produce the same value twice. Add: "The refusal of a value declared more than once (validate.ts:354-356) goes: the schema refuses a value repeated in a field's own `enum`, and row 12.12.11 does not count the gathered values, so a value gathered twice is not refused."

**TERM:** JSON Pointer. RFC 6901, read during this review, defines it as "a string syntax for identifying a specific value within a … JSON document". The node uses it in that meaning, so the fit is the same meaning and nothing changes. The `x-` prefix is left to item 56, as the coordinator ruled, and I do not argue it again.

# The question for the owner

The question is put in terms of what a person sees, and the recommendation comes first. The drafts carry answer A exactly as the question describes it. But option A leaves out three risks. Add them to its list (author):
- Replace the bullet on duplicates with: «два раздела верхнего уровня с одинаковым названием, например в `specs/base/` и в `specs/contracts/`, дадут одно значение дважды, и по записи журнала с таким значением нельзя понять, о каком из двух разделов речь. Строка 12.12.11 не проверяет повтор среди собранных значений, поэтому такой повтор никто не отвергнет, пока для него нет своей проверки;»
- Add: «если в `specs/contracts/` несколько разделов верхнего уровня, например по одному в каждом файле, каждый даёт своё значение. Раздел контрактов, который правило 3.1 считает одним разделом, тогда выглядит в поле как несколько частей, а в проекте с доменами он даёт одно значение `contracts`;»
- Add: «если базовая спецификация не разделена на разделы, `specs/base/` не даёт ни одного значения. Поле, у которого не осталось значений, `sheriff validate` отвергает по строке 12.12.12;»

# Questions only the owner can answer

Only the one already in the notes: what the `parts` source gives in a project without the Domains extension (A or B). This review raises nothing new for the owner.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group5-notes.md`, `D:/SpecSheriff/skills/tools/src/validate.ts`
