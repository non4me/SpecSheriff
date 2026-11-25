# T25, stage 2, group 5: notes on the drafts of items 41 to 47

`propose-group5.mjs` wrote eight keys into `tools-drafts.json`: seven drafts of existing nodes of the appendix of the tools and one new node, split from item 46.
It first copied `tools-drafts.json` to `tools-drafts.before-group5.json`, and it rebuilds the group from that copy on every run.
Two runs gave identical `tools-drafts.json` and `english-group5.md`.
No key outside the group differs from the copy, and the script refuses to write if one does.
`english-group5.md` holds the English of every node of the group, for EngStickler's readers.

**One question is left for the owner**, on what the source `parts` gives in a project without the Domains extension; it is under «Вопрос ответственному» in the section on round f. Every other question is settled by a rule, a ruling, an agreed draft, the code or the coordinator's rulings.

The sections on rounds h, g, f, e, d, c and b come first, the latest first. Each supersedes the sections below it wherever they differ.

## Agreed

On 2026-11-24 the owner agreed to group 5 by answering «А» to the question on what the source `parts` gives in a project without the Domains extension. The question said that an answer of A with no remark on the nodes also agrees to the whole group. `agree-group5.mjs` marked the eight keys of the group as agreed and recorded answer A as a decision of s-5nf87c3e3jg9v7c.

`rename-folder-group5.mjs` made the renaming that answer A decides, item 14 of the list at the end of this file. In the agreed proposal on rule 8.5 (s-kag2m9tzdnduxdx) and in the agreed "The judgement on a node of the technical appendix that a commit approves" (s-4bwa4zepd4nwcv8), "a part of the base specification" became "a folder of the base specification". The words that name the same thing in the same sentences became "folder" too:
- in rule 8.5, "the part's name alone" and "the other top-level nodes of the part";
- in s-4bwa4zepd4nwcv8, "the name of a part", which item 14 did not list. That paragraph would otherwise call `base` a part and a folder in two adjacent sentences.

The Russian followed: «папка базовой спецификации», «одно имя папки», «на вершине папки» and «имени папки». Both nodes stay agreed, and each has a ruling dated 2026-11-24 that records the replacement. The decisions of rule 8.5 and the question of its draft keep their words, since they record what was decided and asked then. `english-rename-folder-group5.md` lists the changed English sentences for EngStickler's readers.

## Round h: the readers' findings on round g applied

`fix-group5-h.mjs` applies the findings of `english-g5g-fast.md` and `english-g5g-thorough.md` in the words of `fix-brief-group5-h.md`. It copies `tools-drafts.json` to `tools-drafts.before-group5-h.json` on its first run and rebuilds from that copy on every run. Two runs gave identical `tools-drafts.json` and `english-group5h.md`, and the checks of the earlier rounds pass. `english-group5h.md` lists every English sentence that round h changed. The question for the owner is unchanged and stays in the section on round f.

**Keys changed:** four keys: `s-gvafe6bnstwab8b` (42), `s-3anv9qcmx8pwp2w` (44), `s-c2r9jndrjbtbsv6` (45) and `new:tools-7-1-enum-values` (46b). No key outside the group changed.

### Applied

- **42:** "refuses any other JSON file under `specs/tech/`, and names that file." The words "of the technical appendix" read as narrowing the files refused, while the node's first sentence speaks of every JSON file under `specs/tech/`. The node now cites s-tj38pvm38nepaf5 nowhere, so its `cites` link to that node is removed. The approved node never had that link, so `removed` is unchanged.
- **44:** "A chain has no end if it comes back to a field that is already in it." / «У цепочки нет конца, если она возвращается к полю, которое в ней уже есть.» The reason says "has an end", and "never ends" read as a statement about time.
- **45:** "…that have the same `answersTo` as it does." / «…у которых тот же `answersTo`, что у него.»; "Where they name different fields," / «Если они называют разные поля,» in place of "Where they do,".
- **46b:** "…the types and RuntimeChecks generated from that field's values would inherit the field's defect." The Russian is «…типы и RuntimeCheck, сгенерированные из значений этого поля, унаследовали бы его изъян.» It keeps «RuntimeCheck», the form of the Russian sentence before it, rather than the brief's «RuntimeChecks», so that one thing has one spelling in the node.

### Rejected

- **"So" → "Thus":** "So" is the agreed drafts' way of drawing a consequence.
- **"whose values break the rules" → "whose source breaks the rules":** the rules on a field's source (s-xfu2gpzddjnmgks, s-mt6auv3jz8m5gzh) are rules on the values that the field may have.

### The page

`build-group5-ru.mjs` and `gen-group5-page.mjs` rebuilt `group5-page/index.html` from the drafts as round h leaves them. The page's check against naming a round now covers round h too.

## Round g: the readers' last findings applied

`fix-group5-g.mjs` applies the findings of `english-g5f-fast.md` and `english-g5f-thorough.md` in the words of `fix-brief-group5-g.md`. It copies `tools-drafts.json` to `tools-drafts.before-group5-g.json` on its first run and rebuilds from that copy on every run. Two runs gave identical `tools-drafts.json` and `english-group5g.md`, and the checks of the earlier rounds pass. `english-group5g.md` lists every English sentence that round g changed. The question for the owner is unchanged and stays in the section on round f.

**Keys changed:** five keys: `s-gvafe6bnstwab8b` (42), `s-3anv9qcmx8pwp2w` (44), `s-c2r9jndrjbtbsv6` (45), `s-5nf87c3e3jg9v7c` (46a) and `new:tools-7-1-enum-values` (46b). No key outside the group changed.

### Applied

- **42:** "any other JSON file of the technical appendix", since "every other" reads as "every second". The Russian «Любой другой» already said this.
- **44:** "A chain never ends if it comes back to a field that is already in it." / «Цепочка никогда не заканчивается, если возвращается к полю, которое в ней уже есть.» A chain starts at a field that it does not "reach", so the former wording did not cover a chain that comes back to its first field.
- **45:** "the refusal also names each of the other RecordType variants of its RecordType that have the same `answersTo`" / «отказ называет также каждый из других вариантов его RecordType с тем же `answersTo`». "Where they do," («Если называют,») replaces "In that case,", so that the refusal plainly depends on the fields being different.
- **46a:** "The name of each of the other parts is its title." The Russian stays.
- **46b:** "So, if `sheriff validate` accepted a field that has no values, or whose values break the rules about their source (…), the code generated from that field would inherit the field's defect." The Russian follows it.

### Rejected

- **47, "stays silent about" → "reports nothing about":** the owner's rule "A rule says what holds, not what does not hold" prefers the positive verb, and both readers translated the sentence as meant («молчит», «ничего не сообщает»).
- **"refuses" → "rejects":** "refuses" is the verb that every agreed node uses for what `sheriff validate` does not accept.

### The page

`build-group5-ru.mjs` and `gen-group5-page.mjs` rebuilt `group5-page/index.html` from the drafts as round g leaves them. The page's check against naming a round now covers round g too.

## Round f: the check of round e applied

`fix-group5-f.mjs` applies the findings of `review-g5e.md`, `english-g5e-fast.md` and `english-g5e-thorough.md`, as `fix-brief-group5-f.md` says. It copies `tools-drafts.json` to `tools-drafts.before-group5-f.json` on its first run and rebuilds from that copy on every run. Each patch fails if it does not find the text it replaces. Two runs gave identical `tools-drafts.json` and `english-group5f.md`, and the checks of the earlier rounds pass. `english-group5f.md` lists every English sentence that round f changed, under its key and field.

**Keys changed:** six keys: `s-gvafe6bnstwab8b` (42), `s-3anv9qcmx8pwp2w` (44), `s-c2r9jndrjbtbsv6` (45), `s-5nf87c3e3jg9v7c` (46a), `new:tools-7-1-enum-values` (46b) and `s-ezq8csd433vj6fj` (47). Items 41 and 43 are unchanged. No key outside the group changed. Item 46a keeps answer A.

### Review e

- **Finding 1 (46a):** applied in the reviewer's words: "The contracts section is named `contracts`, after its folder. Each of the other parts is named by its title." The Russian is the reviewer's.
- **Finding 2 (the question):** applied. In option Б, the sentence on a project that later chooses the Domains extension now opens «Что это стоит», since the stored records that stop passing their RuntimeCheck are a cost.
- **Finding 3 (the question):** applied to the risk of a `specs/base/` without a top-level section: «Если нет и раздела контрактов, значений не остаётся, и `sheriff validate` отвергает поле (строка 12.12.12)». It is a sentence of its own rather than a clause after a semicolon.
- **Finding 4 (the notes):** applied to item 14 of the list at the end of this file. In rule 8.5, "the part's name alone" becomes "the folder's name alone" in the item on a node that opens a part of the base specification and in the paragraph after the list. In that paragraph, "the other top-level nodes of the part" becomes "the other top-level nodes of the folder" too, for the same reason: otherwise one sentence calls the same thing a folder and a part.
- **Finding 5 (45):** applied in the reviewer's words, "Where the RecordType variant fails the last condition, …" and "…the RecordTypes that have a `chosenBy` and that it reaches through the fewest `refines` links can name different fields in their `chosenBy`", with the reviewer's Russian.

### The readers' findings that were applied, in the brief's words

- **42:** "`sheriff validate` refuses every other JSON file of the technical appendix (§s-tj38pvm38nepaf5) under `specs/tech/`, and names that file." The Russian follows it. In the reason, "that the reader will not find" (both readers); the Russian «которую читатель не найдёт».
- **44:** "A chain never ends if it comes back to an identifying field that it has already reached." / «Цепочка никогда не заканчивается, если возвращается к идентифицирующему полю, до которого уже доходила.» (thorough).
- **45:** "that refines the RecordType that has no `chosenBy`" (thorough); the Russian «который уточняет RecordType, у которого нет `chosenBy`».
- **46a, example 2:** "The most likely mistake is to use the title “Contracts” as a value in place of `contracts`." (fast); the Russian «использовать как значение название «Contracts» вместо `contracts`».
- **46b, reason:** "So the generated code would inherit the defect of a field that has no values, or whose values break the rules about their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh)." (both readers on "that mistake"). The Russian follows it: «Поэтому сгенерированный код унаследовал бы изъян поля, у которого нет значений или значения которого нарушают правила об их источнике (…)».
- **47:** "`sheriff validate` stays silent about a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases (§s-8ht2hn88cu2qwz9):" (thorough on "to another pass"). The Russian said «пропускает без сообщения ссылку»; it now says «не сообщает о ссылке … только в следующих случаях», the wording the brief gives.

### Two changes made for the owner's page

- **The letter of the answer.** The `change` of the item "for the title of a section, that section;" in 46a named answer A with a Latin letter; it now has the Cyrillic «А» that the question uses.
- **Option Б of the question** no longer says «как в первой версии узла». The page shows no history of the drafts, and the owner never saw that version.

### The readers' findings that were not applied, and why

- **41, "So" → "Otherwise"** (fast): "So" is the agreed drafts' way of drawing a consequence from the sentences before it, and the reader saw the sentence without them.
- **41, "no domains use one another in a cycle"** (fast, two readings): both readings say the same thing, and the reader favoured the meant one.
- **42, "that file", "the domain", "an implementation" and "any other JSON file"** (fast): each is named in the sentences before it, which the reader did not see.
- **45, "checks it further only against the third condition" → "goes on to check it only against the third condition"** (fast): "checks it further" is ordinary English, and the thorough reader read it as meant. The change would be one of style only.
- **45, "the same `answersTo`", "its RecordType", "In that case", "that refines", "accepts it", "the first condition" and "the third condition"** (both readers): each reader favoured the meant reading, and the list of conditions is in the same node.
- **46a, "a single number" → "one number"** (thorough): the agreed s-4bwa4zepd4nwcv8 and item 47 both say "a single number", and "number" is not read as "digit" in a location such as `base/12`.
- **46a, "and the name of every other part is its title"** (thorough): finding 1 of review e splits the sentence in its own words instead.
- **46b, "would therefore make the generated code wrong"** (thorough): the brief's sentence keeps the idea that the field's defect is carried over, which this proposal drops.
- **47, "accepts a reference … without reporting it"** (fast) and **"leaves a reference … unreported"** (thorough): "leaves … unreported" was flagged by a reader before; the brief's "stays silent about" replaces both.
- **47, the readings of the example** ("holds only a user's identifier", "with no reference to the RecordType of a user"): each reader favoured the meant reading, and the two readings of the second phrase say almost the same thing.

### Sentences in the author's own words

None in English. In Russian, the 42 and 47 sentences follow the brief's English, and «Поэтому сгенерированный код унаследовал бы изъян поля…» in 46b follows the brief's English sentence.

### Вопрос ответственному

**Что получает поле со значениями из имён частей базовой спецификации в проекте без расширения Domains?**

Пример: у RecordType записи журнала аудита есть поле `part`, значения которого — имена частей базовой спецификации (правило 12.11). В проекте с доменами поле получает `contracts` и имя каждого домена, например `requests` и `users`. Вопрос — что оно получает в проекте, который расширение Domains не выбрал.

**Рекомендую А.** 18 ноября вы обобщили правило 12.11 до «имён частей, на которые разделена базовая спецификация» и сослались на правило 1.1.2, а оно делит базовую спецификацию на разделы. Пункт 47 этой группы тоже считает частью системы раздел верхнего уровня `specs/base/`.

- **А (рекомендую): контракты и разделы верхнего уровня `specs/base/`.** Поле получает `contracts`, по имени папки контрактов, и название каждого раздела верхнего уровня в `specs/base/`, например «Requests» и «Users». Контракты остаются одной частью, как в правиле 3.1. Каждое значение записывается вместе с sid узла, из которого оно приходит, так что видно, какой узел его дал. Что это стоит:
  - в двух узлах, которые вы согласовали, — в правиле 8.5 о расположении узла и в узле о суждении рецензента об одобряемом узле технического приложения — «часть базовой спецификации» означает то, с чего начинается расположение узла: `base`, `contracts` или домен. Раздел `base/3` в них лежит внутри части `base`. При варианте А правило 12.11 и узел о том, откуда собираются значения поля с `enum`, называют частью сам раздел `base/3`. Поэтому в тех двух узлах «часть базовой спецификации» станет «папкой базовой спецификации», как уже сказано в согласованном узле о вычислении расположения. Смысл этих узлов не меняется, так что выбор А решает и это переименование, и заново вам их показывать не нужно;
  - значения смешивают имя папки, `contracts`, и названия разделов, например «Requests»;
  - значение меняется, когда раздел переименовывают, так же как значение домена меняется, когда переименовывают его папку. Вариант RecordType, который называет прежнее название, придётся поправить в том же коммите, иначе проверка вариантов его отвергнет. Записи данных, которые система уже сохранила с прежним значением, перестанут проходить RuntimeCheck, как и при переименовании папки домена;
  - два раздела верхнего уровня `specs/base/` с одинаковым названием дадут одно значение дважды, и по записи журнала с таким значением нельзя понять, о каком из двух разделов речь. Так же раздел с названием «contracts» совпадёт со значением `contracts`. Строка 12.12.11 не проверяет повтор среди собранных значений, поэтому такой повтор никто не отвергнет, пока для него нет своей проверки;
  - если в `specs/base/` нет раздела верхнего уровня, например все её правила лежат прямо на верхнем уровне файлов, `specs/base/` не даёт ни одного значения, и у поля остаётся одно значение `contracts`. Если нет и раздела контрактов, значений не остаётся, и `sheriff validate` отвергает поле (строка 12.12.12);
  - узлы `specs/base/` вне разделов верхнего уровня значения не дают, хотя пункт 47 считает RecordType среди них одной частью системы;
  - если проект позже выберет расширение Domains, названия разделов сменятся именами доменов, и сохранённые записи с прежними значениями перестанут проходить RuntimeCheck;
  - название может содержать пробелы и любые знаки, поэтому значения выглядят как «Request intake», а не как короткие имена.
- **Б: имена папок, `base` и `contracts`.** Что это даёт: слово «часть базовой спецификации» значит то же, что в правиле 8.5 и в узле о суждении рецензента, и ничего переименовывать не нужно. Значения всегда короткие и не меняются, пока проект не выберет расширение Domains. Что это стоит: если проект выберет расширение Domains, вместо `base` появятся имена доменов, `contracts` останется, а сохранённые записи с прежними значениями перестанут проходить RuntimeCheck. Без доменов поле получает только два значения, `base` и `contracts`, которые не меняет ни один добавленный или удалённый раздел. Фраза правила 12.11 «часть, добавленная или удалённая, добавляет или удаляет значение» без доменов почти никогда не срабатывает, и источник `parts` в таком проекте почти бесполезен. Правило 12.11, которое ссылается на деление базовой спецификации на разделы по правилу 1.1.2, тогда тоже придётся переформулировать.

Выбираете А?

### Changes needed outside the group, found in round f

- **Item 14 of the list at the end of this file** now also renames "the part's name alone" and "the other top-level nodes of the part" in rule 8.5 (review e, finding 4).
- **`.ai_docs/INDEX.md`:** item 9 of that list now also names the files of round f and of the owner's page.

## Round e: the check of round d applied

`fix-group5-e.mjs` applies the findings of `review-g5d-a.md` to `review-g5d-d.md`, `english-g5d-fast.md` and `english-g5d-thorough.md`, as `fix-brief-group5-e.md` says. It copies `tools-drafts.json` to `tools-drafts.before-group5-e.json` on its first run and rebuilds from that copy on every run; each patch fails where it does not find the text it replaces. Two runs gave identical `tools-drafts.json` and `english-group5e.md`, and the checks of the earlier rounds pass. `english-group5e.md` holds every English sentence that round e changed, under its key and field.

**Keys changed:** all eight keys of the group; no key outside it. Item 46a keeps answer A.

### Review d-d: item 46a and the question

- **Finding 1 (the contracts section is one section):** applied in the reviewer's words. Without the Domains extension, the parts are the contracts section, named `contracts` after its folder, and the sections whose location is `base/` followed by a single number, each named by its title. The agreed rule 3.1 and the agreed "Where the files are" (s-zefk589ykh37b8u) make the contracts section one section, in the folder `specs/contracts/`. Example 2 now reads "The values of that field are “Requests”, “Users” and `contracts`…", in the order of the nodes the values come from, and its most likely mistake is to take the title “Contracts” as a value. The question changes as the finding lists: the risk of several sections in `specs/contracts/` goes, the risk of a folder without a top-level section keeps only `specs/base/`, and the risk of a later choice of the Domains extension no longer names «Contracts». A new cost says that the values mix a folder's name and the titles of sections.
- **Finding 2 (the renaming that answer A decides):** applied. The agreed node on how a location is computed (s-ygg5kpcxgzq3m7w) already says "a folder of the base specification" for `base`, `contracts` and a domain. Under answer A, the two agreed nodes that call the same thing "a part of the base specification" take the word "folder" instead: the proposal on rule 8.5 (s-kag2m9tzdnduxdx) and the node on what the reviewer judges when a node of the technical appendix is approved (s-4bwa4zepd4nwcv8). Neither meaning changes, so choosing A also decides this renaming, and the owner does not see those nodes again. The question says so in the first cost of A, naming each node by what it says. The renaming is recorded under the changes outside the group, to be made once the owner has chosen A.
- **The stored records:** «сохранённые записи с прежними значениями перестанут проходить RuntimeCheck» is added to A's risk of a later choice of the Domains extension, and to the cost of B.
- **46b:** ready; no findings.

### Review d-a: items 41 to 43

- **41:** applied, "would refuse changes after which no domains use one another in a cycle", with review d-a's Russian.
- **42:** applied, «которую этот читатель не найдёт» in Russian. In English, "that reader" replaces "such a reader", as the brief says; the clause reads "which that reader will not find", since "that that reader" would repeat the word.
- **43:** no findings.

### Review d-b: items 44 and 47

- **Nit 1 (44, `stage3`):** applied in the reviewer's words: validate.ts:423 refuses where identifierOf names no RecordType or the named RecordType has no identifiedBy.
- **Nit 2 (47, the `change` of paragraph 4):** applied; the second «Новое:» is gone.
- **Nit 3 (the notes):** the round-c readers' alternative readings are rejected, each because the reader favoured the meant reading and no other makes sense. In item 44: "one of its fields" (the RecordType that `identifierOf` names; a field has no fields of its own here), "that field" (the identifying field that the chain has just reached) and "here" (in this check). In item 47: "its own part of the system" (the referring RecordType's, the subject of the list item), "such a reference" (any reference outside the listed cases, which the sentence before names) and "Otherwise, it is" ("it" is the part of the system that the sentence before defines).

### Review d-c: item 45

- **Nit 1:** applied, «Для последнего условия отказ называет также…».
- **Nit 2:** applied; «Если таких RecordType больше двух, правило то же, и отказ называет каждый.» is deleted from the `change`.
- **Nit 3 (the reason covers conditions 1 and 4 to 7 most):** no change, as the reviewer proposes none; the reason speaks of the rule as a whole.
- **To add outside the group:** rows 12.12.6 and 12.12.7 look only at a variant's own `schema`; recorded below.

### The brief's wordings and the readers' findings that were applied

- **42:** "and names that file" (thorough: the participle attached to the wrong noun).
- **43:** "the rule about a domain's level" (thorough); "lists the levels `core` and `edge`" (fast).
- **44:** "A chain that comes back to an identifying field that it has already reached never ends." / «Цепочка, которая возвращается к идентифицирующему полю, до которого уже доходила, никогда не заканчивается.» (both readers on "of one RecordType a second time"; the brief's wording). It says the same as before, since each RecordType has one identifying field.
- **45:** "also names every other RecordType variant that has the same `answersTo`" (both); "each of the other conditions" (thorough); the sentence on the RecordTypes that disagree is split, as the thorough reader proposed, so that "links name" no longer reads as a noun phrase and the refusal is plainly of every RecordType variant that refines the RecordType without a `chosenBy`. Round b's ruling and the words "that it reaches through the fewest `refines` links" stay. "for failing the first condition" became "since each such RecordType variant fails the first condition" (fast and thorough). In the example, "names `email` as the value of `channel`" (fast).
- **46a:** example 2 gives the field's values as values (both readers: "is given the title" read as titling the field).
- **46b:** "pass that mistake on" (thorough); "the rules about their source" (thorough).
- **47:** "lets a reference … pass without a report only in the following cases", the brief's wording, which keeps "only" before the list and no long noun phrase before "unreported" (both readers); the example's last sentence in the brief's words (thorough: "without such a reference" and the dangling sense).

### The readers' findings that were not applied, and why

- **"naming it by its file…" → "identifying it by …"** (fast, 42): the agreed drafts' phrase for what a refusal names, as in s-cdachayybfvg4na.
- **"any other JSON file" with no antecedent** (fast, 42): the list just before it says which files are accepted; the reader read only the one sentence.
- **"checks it further only against the third condition" → "against no condition other than the third"** (fast, 45): the owner's rule "A rule says what holds, not what does not hold" prefers "only" to a negation.
- **"break the rules" → "violate the rules"** (fast, 46b): "break the rules" is ordinary English for rules of any kind.
- **"does not report …, except in the following cases" and "reports every reference …, except …"** (both, 47): the owner's rule asks for "only" before a list of the only cases; the brief's wording keeps it.
- **"reports the reference in that RecordType"** (fast, 47): rows 12.12.15 and 12.12.16 report the RecordType by its sid, and the text says so.
- **41, "has a link" as a statement or a requirement** (thorough): the sentence restates rule 11.1.5, which it cites; a reason states no requirement.

### Sentences in the author's own words

"which that reader will not find" (42); "lists the levels `core` and `edge`" (43); the three sentences on RecordTypes that disagree (45, after the thorough reader's proposal); "The values of that field are “Requests”, “Users” and `contracts`, each with the sid of the node that it comes from" and "to take the title “Contracts” as a value in place of `contracts`" (46a). Every other change is a reviewer's, a reader's or the brief's wording.

### Вопрос ответственному

*Superseded by the question in the section on round f, which applies review e's findings 2 and 3.*

### Changes needed outside the group, found in round e

- **Under answer A, once the owner has chosen it** (review d-d, finding 2; item 14 of the list at the end of this file): in the agreed proposal on rule 8.5, "A node's location" (s-kag2m9tzdnduxdx), and in the agreed "The judgement on a node of the technical appendix that a commit approves" (s-4bwa4zepd4nwcv8), "a part of the base specification" becomes "a folder of the base specification", the words of the agreed "How a node's location is computed" (s-ygg5kpcxgzq3m7w). Neither meaning changes, so the change is a technical replacement that the owner's choice of A decides, and it is reported in one line. Under answer B, nothing is renamed, and rule 12.11 needs a new wording instead.
- **Item 56, rows 12.12.6 and 12.12.7** (review d-c): both look only at a variant's own `schema`. A RecordType variant that also refines a fragment of a format takes on the fragment's fields, and nothing compares them with its RecordType's fields. A RecordType variant that adds fields only through a fragment fails the third condition. To be settled with review c-c's finding 2; both are item 15 of the list at the end of this file.
- **`.ai_docs/INDEX.md`:** item 9 of the list at the end of this file now also names `fix-group5-e.mjs`, `english-group5e.md` and `tools-drafts.before-group5-e.json`.

## Round d: the final review applied

`fix-group5-d.mjs` applies the findings of `review-g5c-a.md` to `review-g5c-d.md`, `english-g5c-fast.md` and `english-g5c-thorough.md`, as the corrected `fix-brief-group5-d.md` says. It copies `tools-drafts.json` to `tools-drafts.before-group5-d.json` on its first run and rebuilds from that copy on every run; each patch fails where it does not find the text it replaces. Two runs gave identical `tools-drafts.json` and `english-group5d.md`, and the checks of the earlier rounds pass. `english-group5d.md` holds every English sentence that round d changed, under its key and field.

**Keys changed:** all eight keys of the group; no key outside it.

**The first version of the brief**, which switched item 46a to answer B and withdrew the question, was replaced before the script first ran, so nothing was written under it. Item 46a keeps answer A, and A stays the recommendation.

### The question for the owner

The corrected brief's section is carried out in the question below: review c-d's finding 1 is a new cost of answer А, its finding 2 replaces the risk that began «если базовая спецификация не разделена…», and answer Б now says what it gains and what it costs, including the new wording that rule 12.11 would then need. The drafts are unchanged by it.

### Review c-a: items 41 to 43

- **41, the nit on "states links to":** applied in review c-a's words, "has a link, of whatever type, to the node of that domain that states it". The Russian stays.
- **42, the WORDING FIX:** applied, "refuses any other section below the file's first top-level node", with the thorough reader's "giving its title" for the second "naming". The Russian is review c-a's.
- **43:** ready; no change from this report.

### Review c-b: items 44 and 47

- **Nit 1 (44, `stage3`):** applied: validate.ts:423 refuses only where the named RecordType has no `identifiedBy`; it is also to refuse the field where `identifiedBy` names none of that RecordType's fields.
- **Nit 2 (the notes):** the fast reader's alternative readings of round b are rejected. In item 44, "by its file, its sid and its location" can only be the RecordType's, since a field has no file, sid or location; the first "its" of the first condition can only be the field's, since only the field has `identifierOf`. In item 47, "whose location" can only be the section's, since the sentence defines a part of the system by the section's location. Each has one sensible reading, the one the reader favoured.
- **Nit 3 (47, the `change` of paragraph 4):** applied in review c-b's words.
- **Nit 4 (the notes):** added to the changes outside the group below.

### Review c-c: item 45

- **Finding 1:** applied, "in the same section of the base specification (§s-5x737t9nee4zgaa) as its RecordType", with a `cites` link.
- **Finding 2 (variants of a RecordType and of the RecordType that it refines declaring the same field):** under the changes outside the group, for item 56 and row 12.12.7.

### Review c-d: item 46a

- **Findings 1 and 2:** in the question below, as the corrected brief says.
- **Finding 3 (the Russian of example 1):** applied, «`sheriff reindex` записывает `contracts`, `requests` и `users` в `x-enumSource.gathered` этого поля.»
- **Finding 4 (`removed`):** applied; both items now give item 46b its title "Fields with `enum` that `sheriff validate` accepts".
- **Finding 5 (the second example):** applied, in two sentences, so that "whose" stands next to the field; "is given" replaces "gets", from the thorough reader.

### The readers' findings that were applied

- **41:** "refuse changes in which domains do not use one another" (thorough: the other sentences refuse a change, not domains).
- **42:** "refuses any other JSON file under `specs/tech/`, which holds the technical appendix" (thorough: the first sentence speaks of JSON files only); "and giving its title" (thorough); "will not find" (thorough).
- **43:** "An approved rule in `project.json`" (thorough).
- **44:** "A chain that reaches the identifying field of one RecordType a second time" (thorough: "the same RecordType" had nothing to compare with); "names the other RecordType" (thorough).
- **45:** "in their `chosenBy`" (both); "against the third condition" (thorough); "for failing the first condition" (thorough: "under the first condition" read as "at the first condition"); "in its `answersTo`" in the example (thorough); "For the last condition, the refusal names … as well" (thorough: "it" stood next to the variant); "the RecordTypes that have a `chosenBy` … name different fields" and "The refusal names each of those RecordTypes" (thorough: "two RecordTypes" and "both" left open the case of three or more). The last fix keeps ruling 1 of round b for two RecordTypes and gives the same answer for more; the part's `change` says so.
- **46a:** "That field is given the title…" (thorough: "gets").
- **46b:** "A field with no values" (thorough); "pass the mistake on" (fast: "its mistake" gave the field a mistake); "a job log entry" (thorough: "of … of", and "an audit log entry" stands beside it).
- **47:** "leaves unreported a reference … only in the following cases" (thorough: "to another unreported" read as one phrase); a field `deliveryAddress` with a `$ref` to `address` (thorough: the field and the fragment had one name); "reports that RecordType" (thorough); "A field `user` that stores a user's identifier without such a reference has the type `string` and no `identifierOf`." (thorough: the dangling infinitive and "would have").

### The readers' findings that were not applied, and why

- **"matched to the domains" → "that match the domains"** (fast, 42): the node is about the matching that `sheriff validate` performs, so "matched to" names it.
- **"the last approved wording" → "the most recently approved wording"** (thorough, 43): the term of the agreed s-a8fn72xa782wvbk; the reason of rounds b and c holds.
- **The title of item 44 and "ends in" → "ends at"** (both, 44): the approved title and the wording of the agreed row 12.12.3; the reasons of round b hold.
- **"the values that it corresponds to"** (thorough, 45): the wording of rule 12.6; the reason of round c holds.
- **"the RecordType that has fields that select a variant" read at first as "with its own `chosenBy`"** (thorough, 45): the next sentence defines the phrase, and the reader chose the defined reading.
- **"a field with `enum`"** (thorough, 46a): the owner's term of rule 12.7 (the ruling of 2026-11-19); review d of round a recommended keeping it.
- **"the check of RecordType variants" → "the check on"** (thorough, 46a): "the check of …" is the agreed drafts' phrase, as in "the check of `consumes` links".
- **"Collected in a single way" → "in one way only"** (thorough, 46a): the reader was unsure, and round b took "in a single way" from a reader of its own.
- **"pass its mistake on" → "carry the error over"** (fast, 46b): "carry" is kept out of the nodes; "its" became "the".
- **"in the files that the repository keeps"** (thorough, 46b): the agreed drafts' phrase; the reason of rounds b and c holds.
- **"are treated as together forming one part" → "as one part"** (thorough, 47): round c took "together forming" from a reader, since "one part" alone read as "each in some one part".
- **"The change still passes"** (thorough, 47): "still" reads as "all the same" after a report, and the change is the one that `sheriff validate` checks.
- **"There `sheriff validate` accepts the change"** (thorough, 41): the change is the one that makes the links that the example describes, as in the example's first project.
- **"what a RecordType may refer to"** (thorough, 47): the title of rule 12.10.

### Sentences in the author's own words

"refuse changes in which domains do not use one another" (41, after the reader); "refuses any other JSON file under `specs/tech/`, which holds the technical appendix" (42); in item 45, "the RecordTypes that have a `chosenBy` … name different fields in their `chosenBy`", "for failing the first condition" and "The refusal names each of those RecordTypes"; "That field is given the title of each of those sections, together with the sid of that section" (46a); "A field `user` that stores a user's identifier …" and the field `deliveryAddress` (47). Every other change is a reviewer's or a reader's wording.

### Вопрос ответственному

*Superseded by the question in the section on round e, which applies review d-d's findings 1 and 2.*

### Changes needed outside the group, found in round d

- **Item 56 and row 12.12.7** (review c-c, finding 2): take a RecordType `B` that refines `A` and has no `chosenBy`, so that `A`'s fields select `B`'s variants, as rule 12.6 allows. A RecordType variant of `A` for `email` that declares `address` and a RecordType variant of `B` for `email` that also declares `address` both pass every condition of item 45. On the page that the owner accepted, `refines` becomes `allOf` with `$ref`, so a data record of `B` for `email` would get `address` from both variants. To be settled when item 56 is drafted; row 12.12.7 may need to cover the fields that the variants of the refined RecordType declare.
- **Table 12.12** (review c-b, nit 4): no row checks that a RecordType is kept in the base specification, as rule 12.1 requires. Item 47 gives a RecordType kept elsewhere, such as in `specs/tech/`, no part of the system. It is the same kind of gap as a `$ref` that points to no RecordType.
- **The docs** (review c-b, TERM): "fragment of a format" matches DDD's shared kernel only in part.
- `.ai_docs/INDEX.md` still has to list `fix-group5-d.mjs`, `english-group5d.md` and `tools-drafts.before-group5-d.json`.

## Round c: the six reports of the follow-up review applied

`fix-group5-c.mjs` applies the findings of `review-g5b-a.md` to `review-g5b-d.md`, `english-g5b-fast.md` and `english-g5b-thorough.md`, as `fix-brief-group5-c.md` says. It copies `tools-drafts.json` to `tools-drafts.before-group5-c.json` on its first run and rebuilds from that copy on every run; each patch fails where it does not find the text it replaces. Two runs gave identical `tools-drafts.json` and `english-group5c.md`. The script runs the checks of round b, and also refuses "equally near" and "put its mistake". `english-group5c.md` holds the English of every changed node.

**Keys changed:** all eight keys of the group. Items 42, 44 and 46b were found ready; they changed only by the reviewers' nits, the readers' findings and their `stage3`. No key outside the group changed.

### Review b-a: items 41 to 43

- **41, the CUT:** applied. "Only a link that the check of `consumes` links accepts is taken into account" and its Russian are deleted, with the `cites` link to s-p3n666zfjdrrw6a; the paragraph's `change` now ends after «(ваше решение от 2026-10-30 по строке 11.3.4).»
- **42:** ready; no change from this report.
- **43, the Russian:** applied, «Инструменты SpecSheriff читают уровни так же, как любой перечень собственных guidelines проекта: …». The English stays.
- **43, the nit on "each rule that lists them":** no change, as the report says; the citation of s-t9j29hppag2nren settles which rules.
- **TERM ("last approved wording" and a baseline):** for the docs only, added below.
- **The owner's question:** the risk on the nodes of `specs/base/` outside every top-level section is added to answer А, and the claim «вариант A делает то же» is removed.

### Review b-b: items 44 and 47

- **44, the readers' two readings of "the field's `identifierOf`"** (paragraph 3): rejected. Only reading (a), the field where the chain starts, makes sense, since the identifying field that the sentence names next is reached only through that `identifierOf`.
- **44, the pointer `/properties/accounts/items`:** no change; paragraph 4 says that the check covers the schema of a list's members, and the sentence stays the same in items 44 and 46b.
- **44, «своей `schema`»:** applied, as in item 47.
- **44, `stage3`:** applied: at validate.ts:427 (`if (!next) break`) the loop also stops without refusing anything where an `identifierOf` names no RecordType, and the field where the chain starts is to be refused there too.
- **47, the report:** applied, with the readers' "each by its sid", since "its" before two RecordTypes had two owners: "naming that RecordType and each RecordType that it refers to by such a reference, each by its sid". The Russian is review b-b's.
- **47, the reason:** applied, "only a check that reads a RecordType's whole `schema` and all its `refines` links".
- **47, the example's last sentence:** applied, with the reader's "store" for "keep": "To store a user's identifier without such a reference, the field `user` would have the type `string` and no `identifierOf`."
- **47, the nit on the `change` of paragraph 1:** applied, «проходят без сообщения».
- **The owner's question:** the risk of a later choice of the Domains extension is added, to answer А and, as its effect, to answer Б.

### Review b-c: item 45

- **Finding 1:** applied: "the RecordType that has a `chosenBy` and that it reaches through the fewest `refines` links", in paragraph 2 and in the sentence on the tie, with "refuses, under the first condition, each RecordType variant that refines it". Ruling 1 of round b is kept. "Names nothing in its `chosenBy`" became "has no `chosenBy`" (the fast reader): the schema gives `chosenBy` at least one member, so the two say the same. The `stage3` follows, and adds that the search goes through all of a RecordType's `refines` links, those to a fragment of a format included.
- **Finding 2:** applied, "it refuses a RecordType variant whose `answersTo` gives a field more than one value".
- **Finding 3:** applied, "the part of the specification that its location names (§s-kag2m9tzdnduxdx)". The phrase means the same under answer А and under answer Б.
- **Finding 4:** applied, "against its RecordType (§s-7vm323mhry2enx3)", with a `cites` link.
- **Finding 5:** applied: the `change` of paragraph 2 now says «Новое: RecordType варианта — тот из уточняемых им RecordType, у которого есть поля, выбирающие вариант. Код сейчас берёт первую связь `refines`.»

### Review b-d: items 46a and 46b

- **46a, WORDING FIX 1 ("comes from"):** applied in review b-d's words. Paragraph 2 lost its last two sentences, paragraph 3 its second half, and paragraph 4 is gone; the paragraph on `sheriff reindex` now lists the node each value comes from, where the phrase of rule 12.9 is first used. The `change` fields moved with the sentences.
- **46a, WORDING FIX 2 (the reason):** applied.
- **46a, WORDING FIX 3 (the second example):** applied.
- **46a, the paragraph "If the owner chooses B":** rewritten below.
- **46b, FIX 1:** applied to `stage3`: the refusal of a value declared more than once (validate.ts:354-356) goes, since the schema refuses a value repeated in a field's own `enum` and row 12.12.11 does not count the gathered values. The notes on 46b say so below.
- **The owner's question:** review b-d's three risks are added to answer А.

### If the owner chooses Б

Under answer Б, these change in `s-5nf87c3e3jg9v7c`:
- the paragraph "Otherwise, the parts of the base specification are the sections whose location (§…) is `base/` or `contracts/` followed by a single number. The name of each such part is the title of its section." becomes "Otherwise, the parts of the base specification are `base` and `contracts`, each named by its folder under `specs/`.";
- the list item "for the title of a section, that section;" becomes "for the name `base`, the first top-level node of the first file of `specs/base/` in the code-point order of the files' paths;";
- the second example is removed;
- the `change` fields of those two parts, and the node's `stage3`, follow.

Nothing else in the group changes: item 45 now names the nearest section by "the part of the specification that its location names", and item 47 defines a part of the system on its own.

### The readers' findings that were applied

- **41:** "refuses a change after which domains use one another in a cycle" (thorough: "the change where" read as a relative clause); "leads back to the domain that it starts from" (fast: "its first domain", and its clash with "the first … the second"); "links to the node of that domain that states it, by a link of any type" (both: "has a link of any type").
- **42:** "start with the title of a section that is …" (fast: whether the top section's own title is included).
- **43:** "as the value of its property `level`" (thorough: the bare key); "the list of levels" (thorough: "their list"); "adds `platform` to that rule's list" (both: "its list").
- **44:** "the chains that start at those fields" (thorough: "their chains" pointed to the RecordTypes); "follow only the first step of each chain and so accept both fields" (thorough: a mistake accepts nothing).
- **45:** "checks it further only against the third, since each of the remaining conditions …" (thorough: "the others"); "corresponds to the data record's values" (fast: "its values"); "It refines `message`, a fragment of a format that …" (thorough: "the fragment … named"); "Another RecordType variant of `notification`" (fast).
- **46a:** the title "Where the values of a field with `enum` are collected from" (thorough: without "from" it asks for a place); the location of item 46b and the `change` fields that name the title follow. "The SpecSheriff tools collect the values of a field with `enum` at any depth …" replaces "In this way, …" (fast).
- **46b:** the title "Fields with `enum` that `sheriff validate` accepts" (fast: two code spans next to each other); "pass its mistake on to the generated code" (thorough: "put its mistake into" is no collocation; its "carry" is a word kept out of the nodes); "an entry of the job log" (thorough: "a job's log entry").
- **47:** "leaves a reference … unreported only in the following cases" (fast: "pass without a report" is a calque); "a RecordType in the contracts section" (fast); "a RecordType of its own part of the system" (fast: "the same" had no antecedent); "a `$ref` to `address`, a fragment of a format" (both); "store" (thorough).
- **The preamble of `english-group5c.md`:** "after fix-group5-c.mjs has run" (thorough).

### The readers' findings that were not applied, and why

- **"the last approved wording" → "the latest approved wording"** (both, 43): the term of the agreed s-a8fn72xa782wvbk, which the node cites for it.
- **The title "An identifier followed to its end"** (both, 44): the approved title; round b's reason holds.
- **"ends in a field" → "ends at"** (thorough, 44): the condition quotes row 12.12.3; round b's reason holds.
- **"It names the field"** (fast, 44): "it" is the refusal or `sheriff validate`, and both readings say the same, as the reader notes.
- **"the values that it corresponds to" → "answers to"** (fast, 45): rule 12.6 says "names the values it corresponds to", and the reader was unsure.
- **"the third", "the first", "the last" condition** (fast, 45): the list stands right above, and its position is the shortest name a condition has.
- **"gets the title of each of those sections"** (fast, 46a): review b-d's wording, and the reader was unsure of the replacement.
- **"the sids of the nodes of a project's own kind"** (thorough, 46a): the reader's reading (a) is the meaning, and the words after the colon say which kind.
- **"in the files that the repository keeps"** (thorough, 46b): the phrase of the agreed drafts; round b's reason holds.
- **"its field `kinds`"** (both, 46b): the phrase of the agreed s-czxaqvaesmu3gru; the readers chose the meant reading.
- **"own" in "a field whose own `enum`"** (fast, 46b): the reader's favoured reading is the meaning.
- **"on what a RecordType may refer to"** (thorough, 47): the title of rule 12.10, which the reason names.

### Sentences in the author's own words

"refuses a change after which domains use one another in a cycle" and "leads back to the domain that it starts from" (41); "start with the title of a section" (42); "as the value of its property `level`" and "adds `platform` to that rule's list" (43); "follow only the first step of each chain and so accept both fields" (44); "checks it further only against the third, since each of the remaining conditions …", "corresponds to the data record's values" and "has no `chosenBy`" (45); "The SpecSheriff tools collect the values of a field with `enum` at any depth …" (46a); "pass its mistake on to the generated code" (46b); "leaves a reference … unreported" and "of its own part of the system" (47). Every other change is a reviewer's or a reader's wording.

### Вопрос ответственному

*Superseded by the question in the section on round d, which adds review c-d's findings 1 and 2 and what answer Б gains and costs.*

### Changes needed outside the group, found in round c

- **The docs** (review b-a, TERM): "last approved wording" corresponds only in part to the baseline of ISO/IEC/IEEE 29148, which usually covers a set of items. Added to item 13 of the list at the end of this file.

`.ai_docs/INDEX.md` still has to list `fix-group5-c.mjs`, `english-group5c.md` and `tools-drafts.before-group5-c.json`.

## Round b: the six reports applied

`fix-group5-b.mjs` applies the findings of `review-g5-a.md` to `review-g5-d.md`, `english-g5-fast.md` and `english-g5-thorough.md`, as `fix-brief-group5-b.md` says. It copies `tools-drafts.json` to `tools-drafts.before-group5-b.json` on its first run and rebuilds from that copy on every run; each patch fails where it does not find the text it replaces. Two runs gave identical `tools-drafts.json` and `english-group5b.md`. The script runs the checks of round a (citations against links, the Russian citing the same sids, link targets existing, code in backticks the same in both languages, a "regardless" sentence in each check, banned words, no history of rounds in a `change` field, no key outside the group changed) and two more: no bare "variant" in item 45, and the agreed node that gets its sid changes in nothing else. `english-group5b.md` holds the English of every changed node.

**Keys changed:** all eight keys of the group, and `new:tools-1-project` and `proposal:new-tools-1-project-g4`, which get the sid s-t9j29hppag2nren and change in nothing else. Item 42 was found ready; it changed only by the readers' findings and in its `stage3`.

### The coordinator's rulings, as carried out

1. **Two RecordTypes equally near (review c, finding 7).** Item 45 now says: "Where a RecordType names nothing in its `chosenBy`, and two RecordTypes equally near up its chain of `refines` links name different fields in theirs, `sheriff validate` refuses each RecordType variant that refines it under the first condition. The refusal names both of those RecordTypes." Its basis, in the part's `change`: row 12.12.4 requires exactly one RecordType with fields that select a variant, and here there are two sets of such fields. The definition of the selecting fields now says "the nearest RecordType up its chain of `refines` links that has a `chosenBy`", which also closes the thorough reader's reading (a).
2. **One convention for SpecSheriff's own keywords (review d, question 2).** Not settled in group 5. It is under "Changes still needed outside the group", for item 56.
3. **The check of rule 1.1.2 without the Domains extension (review a).** Item 42's notes and its `stage3` now say that today's code refuses a wrongly named file under `specs/tech/` in a project without the extension (`isDomain('base')`), and that stage 3 removes that refusal and puts nothing in its place. The continuation file records the gap, to be put to the owner before stage 3 changes the code.
4. **What the source `parts` gives without the Domains extension (review d, question 1).** Item 46a now holds the recommended answer, A:
   - with the Domains extension, the parts are the domains and the contracts section, each named by its folder, as in round a;
   - otherwise, the parts are the sections whose location is `base/` or `contracts/` followed by a single number, each named by its title, and each value comes from its section.
   A second example shows the case without the extension. The reason still holds: it speaks of who writes, compares and reads the values, whatever their source. The first example still holds: it is the case with the extension. *Superseded by "If the owner chooses Б" in the section on round c.* If the owner chooses B, three things change: the paragraph that opens "Otherwise, the parts of the base specification are the sections…" becomes "Otherwise, the parts are `base` and `contracts`, each named by its folder, and each value comes from the first top-level node of the first of the part's files in the code-point order of their paths"; the second example is removed; and the `change` of that paragraph and the `stage3` of the node follow. Rule 12.11 changes in neither case.

### Вопрос ответственному

*Superseded by the question in the section on round c, which adds the risks of answer А that the follow-up review found.*

### Review a: items 41 to 43

- **41, "is counted":** applied, "is taken into account"; the Russian «Учитывается» stays.
- **41, the example:** applied, "There `sheriff validate` accepts the change." / «Там `sheriff validate` принимает изменение.»
- **41, TERM (dependency cycle):** for the docs only; no node changes (see the changes outside the group).
- **42:** ready. The fact on today's code without the extension is added to the notes and to `stage3` (ruling 3).
- **42, TERM (breadcrumb trail):** for the docs only.
- **43, the restatement:** applied. `new:tools-1-project` and its agreed proposal `proposal:new-tools-1-project-g4` get the sid s-t9j29hppag2nren, generated with the alphabet of rule 1.2.2 and checked against `specs/`, `moved/` and `tools-drafts.json` (the script checks it again on every run); nothing else in them changes. Paragraph 3 is now review a's sentence, citing s-a8fn72xa782wvbk for "last approved wording" (7.2.7) and s-t9j29hppag2nren; "is listed" became "is accepted" (7.1). The `cites` links to s-zefk589ykh37b8u, s-sn6au3vcr9uy5pm and s-utvqbypzhmgndug are removed, since the node no longer cites them; this also removes the inconsistency that review a found, the `refines` links read from the files rather than from the commit of the last approval.
- **43, paragraph 1:** applied, "accepts a domain's header (§…) that contains a level only where…".
- **43, the example:** the typical case is added after the first sentence.
- **43, TERM ("not to be confused with C4 levels"):** for the docs only.

### Review b: items 44 and 47

- **44, finding 1 (which RecordType is passed):** applied: "A chain that goes to the identifying field of the same RecordType a second time never ends." The part's `change` says that a field `parent` that refers to its own RecordType is accepted, as validate.ts:424 already does.
- **44, finding 2:** applied, "each condition that the field fails".
- **44, finding 3:** applied, "generated from the RecordType that holds the field".
- **47, finding 1:** applied: "lets a reference … pass without a report only in the following cases", and the report names "by its sid both that RecordType and the RecordType that it refers to". The example follows.
- **47, finding 2 (the reason):** applied in review b's words. The sentence on `identifierOf` left the reason; the example still shows it.
- **47, finding 3:** applied, "The RecordTypes in `specs/base/` that no such section holds", with the thorough reader's "together forming one part of the system".
- **47, finding 4 (CUT):** applied, "its `schema` (§…) holds, at any depth, …".
- **Gaps:** review b's view on the dropped `identifiedBy` refusal and on a `$ref` to nothing is recorded under the changes outside the group.

### Review c: item 45

- **Finding 1:** applied in review c's words, "the RecordType variant" for "the variant" (7.2.4.3). The `stage3` now says that the `continue` at validate.ts:384-386 goes, so that the third condition is still checked.
- **Finding 2:** applied. The node opens with "checks each RecordType variant … against its RecordType"; then the paragraph of definitions, opening with "`sheriff validate` treats as a RecordType variant each RecordType that names, in its `answersTo`, …" (7.2.4: the node no longer defines the name more broadly than rule 12.6); then the sentence on `schema`; then the list, "`sheriff validate` accepts a RecordType variant only where all of the following hold:". Item 4 now reads "every field that its RecordType declares or takes through `refines` from another RecordType", and "The fields of a RecordType are…" is deleted. Every term is now explained before the list uses it (7.2.7).
- **Finding 3:** applied to the reason.
- **Finding 4:** applied, with a `cites` link to s-xzcw3hv4hmxz7h7; the sentence opens with its "When" clause, as the thorough reader asked of the same construction in item 46b.
- **Finding 5:** applied, «какие из условий» and «которые собирают».
- **Finding 6:** applied; the example names both reasons.
- **Finding 7 (DOUBT):** ruling 1.
- **7.2.4.3 throughout:** every "variant" alone is now "RecordType variant", including "every other RecordType variant of its RecordType" in the last condition; the script checks it.
- **TERM:** for the docs only.
- **The gap that no row checks that `chosenBy` names a field of its RecordType:** under the changes outside the group.

### Review d: items 46a and 46b

- **46a, the first source:** applied, "its own list, where the field's schema holds `enum`: the members of that `enum`, in their order".
- **46a, base specification (7.2.7):** applied, with a `cites` link to s-5x737t9nee4zgaa.
- **46a, the CUT of the sentence on folders:** applied; the two paragraphs of ruling 4 now say which parts each case gives.
- **46a, the merge of paragraph 3:** applied in review d's words.
- **46a, the Russian:** applied, «sid узлов собственного типа в проекте» and «записи журнала аудита».
- **46a, DOUBT (owner):** ruling 4 and the question above.
- **46b, the title:** applied, "Which fields with `enum` `sheriff validate` accepts" / «Какие поля с `enum` принимает `sheriff validate`».
- **46b, the reason:** applied, with a `cites` link to s-mt6auv3jz8m5gzh. "carry its mistake into the code" became "put its mistake into the generated code", since "carry" is a word the owner keeps out of the nodes.
- **46b, the first condition:** applied, "when the SpecSheriff tools collect its values".
- **46b, what the refusal names:** applied, with "each condition that the field fails", as in item 44.
- **46b, the example:** applied in review d's words.
- **DOUBT (how a refusal names a field at depth):** settled once, in the same words in items 44 and 46b: "It names the field by the JSON Pointer to the field's schema within the RecordType's `schema`, such as `/properties/accounts/items`." JSON Schema itself, and Ajv, name a place in a schema by a JSON Pointer, and the owner ruled that everything about RecordType follows JSON Schema. Each `stage3` says so.
- **TERM (`x-` prefix):** ruling 2.
- **Review d's note for the continuation file**, that the agreed s-ztseyetus7np6br and s-agc6fb3vx46pc23 write "a field that has an `enum`" for the same term: under the changes outside the group, since the brief forbids touching the continuation file.

### The readers' findings that were applied

- **41:** "where domains use one another in a cycle", without "the" (thorough: "all the domains" was a possible reading); "One domain uses another where the header of the first … to a section of the second" (fast: "its header"); "the node of that domain that states it" (thorough: "that domain's node"); "followed links of every type" (both: "those links"); in the example, "a `consumes` link to a section of `users`" (thorough: the link's target was not named).
- **42:** "only where the titles that lead to it also lead to a section of that domain" (both: "the same titles" compared with nothing named); "To find how a rule of a domain is implemented, a reader looks in the file…" (thorough); "although the domain's section is under “Intake”" (both).
- **43:** "A header contains a level as the value of its `level`" (both: the tautology); the owner's verb "contains" is kept, so neither "states" nor "holds" was taken. "to take the list from the draft wording" (thorough).
- **44:** in the example, the field is `accountId`, so that `account` names only the RecordType (thorough); "The chain that starts at `accountId`" (thorough: "That chain"); "which would accept both fields" (both).
- **45:** "the fragment of a format named `message`" (thorough); "in the same section as `notification`" (fast); "which overlooks `text`" (thorough); "declares in its own `schema`" (fast: "declares itself"); "up its chain of `refines` links" (fast).
- **46a:** "from its source, which is exactly one of the following" (both: "its one source"); "In this way, the SpecSheriff tools collect…" (thorough: the word order); the reason now names its uses, so that "each of them" has an antecedent (both).
- **46b:** "When `sheriff validate` validates the files…, it refuses…" (thorough: the "when" clause attached to "holds"); "to hold each value only once" (thorough); the example no longer gives the field and the kind one name (thorough).
- **47:** the title "A RecordType that refers to a RecordType outside its part of the system" (fast: "refers outside" had no object); "the fragment of a format named `address`" (thorough); "to leave the reference in the field `user` unreported" (thorough); the example's last sentence now says how to avoid the reference (thorough: the link to the mistake was not named); "lets … pass without a report" settles the readers' doubt on "accepts" too.

### The readers' findings that were not applied, and why

- **"makes this check" → "runs this check"** (both, every node): the brief keeps "makes this check", as the agreed drafts write it.
- **"A link counts only if…"** (thorough, 41): the owner keeps "count" for counting; review a's "is taken into account" is applied instead.
- **"ends in a field" → "ends at a field"** (thorough, 44): the condition quotes row 12.12.3, which the owner agreed to; the example says "ends at".
- **"takes through `refines`" → "inherits"** (thorough, 44 and 45): rule 12.6, agreed, says "takes through `refines` from another RecordType", and the readers were themselves unsure that "inherits" fits.
- **"gathered beside the field" → "stored beside the field"** (both, 46a): "gathered" is the word of rule 12.9 and of the schema's key `gathered`.
- **"comes from" → "is attributed to"** (thorough, 46a): rule 12.9 says "the node it comes from", and the reader was unsure of the replacement.
- **"the files that the repository keeps" → "the files in the repository"** (both, 46b): the phrase of the agreed drafts, which the brief of round a names.
- **"agree with" → "be consistent with"** (fast, 45): the title is unchanged since its approval, and "agree with" is ordinary English.
- **"the rule on a domain's level" → "the rule about"** (thorough, 43): the agreed drafts write "the rule on …"; the text no longer uses the phrase, and the example keeps it.
- **"admits no data record"** (thorough, 46b): the sentence is gone with the new reason.
- **"An identifier followed to its end" → "A chain of identifiers that reaches an end"** (fast, 44): the title is the approved one, and the reader was unsure of the replacement.
- **"which refers to no RecordType"** (thorough, 47): the sentence is gone with the new example.

### Sentences in the author's own words

Every sentence that no report dictated: in item 41, "One domain uses another where the header of the first … to a section of the second"; in item 45, the two sentences of ruling 1 and "the nearest RecordType up its chain of `refines` links that has a `chosenBy`"; in item 46a, the two paragraphs of ruling 4 and the second example; in items 44 and 46b, the sentence on the JSON Pointer; in item 46b, "put its mistake into the generated code"; in item 47, the example's last sentence. These need a reviewer.

### Changes needed outside the group, found in round b

These are added to the list at the end of this file:
- for item 56, the convention for SpecSheriff's own keywords in a RecordType's `schema` (ruling 2);
- the gap that no row of table 12.12 checks that `chosenBy` names a field of its RecordType (review c);
- the term "a field that has an `enum`" in the agreed s-ztseyetus7np6br and s-agc6fb3vx46pc23 (review d), for the continuation file;
- `new:tools-1-project` now has a sid, so item 5 of that list is carried out;
- the reviewers' TERM notes, for the docs.

## The keys

| Item | Key | Title | Rows |
|---|---|---|---|
| 41 | `s-vuujweu57sxsa58` | Domains that use one another in a cycle | 11.3.4 |
| 42 | `s-gvafe6bnstwab8b` | Sections of the technical appendix matched to the domains | 11.3.5 |
| 43 | `s-uxmkwbnpgtjzkgv` | The level in a domain's header | 11.3.6 |
| 44 | `s-3anv9qcmx8pwp2w` | An identifier followed to its end | 12.12.2, 12.12.3 |
| 45 | `s-c2r9jndrjbtbsv6` | What a RecordType variant must agree with | 12.12.4 to 12.12.10 |
| 46 | `s-5nf87c3e3jg9v7c` | Where the values of a field with `enum` are collected from | none; implements rules 12.7, 12.8 and 12.11 |
| 46 | `new:tools-7-1-enum-values` (s-dk3zfkbhc3v6xbp) | Fields with `enum` that `sheriff validate` accepts | 12.12.11 to 12.12.13 |
| 47 | `s-ezq8csd433vj6fj` | A RecordType that refers to a RecordType outside its part of the system | 12.12.15, 12.12.16 |

The titles are those of round c.

## Decisions that apply to the whole group

- **Rows.** Each node of a check implements each row whose check it makes, and none implements the main table of checks (X1, as in groups 1 to 4). Row 12.12.1 is implemented by the agreed s-vke5hakwf3uyrjs and row 12.12.14 by the agreed s-agc6fb3vx46pc23, so no node of this group takes them.
- **Which extension.** Each node of a Domains check opens with "Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm)", and each node of a RecordType check with "Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s)", as the agreed s-p3n666zfjdrrw6a, s-8esbyvaj2yx5eqf and s-vke5hakwf3uyrjs do (X3).
- **Form.** Each node of a check opens with what `sheriff validate` accepts or refuses, and the next sentence says what the refusal names: the file, the sid and the location of the node, as in the agreed drafts. Where the row is "reported by the node's sid" (item 47), the report names the sid, as the row says.
- **Draft or approved.** Every row of the group has a cost with no condition: "refused" for rows 11.3.4 to 11.3.6 and 12.12.2 to 12.12.13, and "reported by the node's sid" for rows 12.12.15 and 12.12.16. So each node says "regardless of whether the specification is approved or a draft" and cites its rows. Node 46's first half (`s-5nf87c3e3jg9v7c`) is a procedure, not a check, so it says nothing about it.
- **Positive form.** Each check is stated as what is accepted, followed by "refuses any other" (the rule "A rule says what holds, not what does not hold", and rule 7.2.6, since a reference or a variant let through would go unnoticed). Rows 11.3.4, 12.12.10 and 12.12.16 are worded with a negation or with "only"; the nodes state them positively: a cycle is refused where a chain leads back to its first domain; a variant's `answersTo` "differs from" every other; a fragment refers to another fragment.
- **The JSON Schema form of a RecordType.** The owner ruled on 2026-11-19 that everything about RecordType follows JSON Schema 2020-12 and accepted the page recordtype-jsonschema.html. So the nodes speak of a RecordType's `schema`, its fields as the properties of that schema, and the keywords `identifierOf`, `identifiedBy`, `chosenBy`, `answersTo`, `x-enumSource` and `$ref`. "A field of type `one of`" became "a field with `enum`", and "a field of type `identifier of`" became "a field with `identifierOf`" (X4), as rows 12.12.2, 12.12.3 and 12.12.9 to 12.12.13 already say. The forms in which `$ref` and `identifierOf` name a RecordType (by its sid, as the accepted page shows for `$ref`) are not stated in this group; item 56 is to state them (see the changes outside the group).
- **"A field with `enum`" includes a field whose values come from `x-enumSource`.** Rule 12.7 calls every field whose values come from one of the three sources "a field with `enum`", while the schema of the RecordType extension keeps a field's own list in `enum` and the other two sources in `x-enumSource`, with the gathered values in `x-enumSource.gathered`. The agreed s-ztseyetus7np6br and s-agc6fb3vx46pc23 already speak of "a field that has an `enum`" whose values are gathered into `x-enumSource.gathered`, so the group reads the term the same way. Item 46 says where each source's values are, and row 12.12.9's "the `enum` of that field" is read as the values that item 46 collects, as the ruling of 2026-11-19 on that row says ("a field's values, from whatever source, are listed in its `enum`").
- **Agreed drafts without a sid.** "What the SpecSheriff tools read in the project's own guidelines" has no sid yet. Item 43 relies on it for how the levels are read, so it states in one sentence what that node implies for the levels and cites rule 1.3.2 (s-utvqbypzhmgndug), as the agreed node itself does. Where a draft relies on the validation against the schema, it cites s-xzcw3hv4hmxz7h7, as group 4 did.
- **Citations at first use (rule 7.2.7).** The Domains extension (s-tdm3rwsppnuh6dm), the RecordType extension (s-hzuzn8hbq6q9q4s), a domain's header and a `consumes` link (11.1.3, s-yggv9myedprnaa7), the project's own guidelines (2.3), a level and the rule on it (11.2.1), location (8.5), the computation of locations (s-ygg5kpcxgzq3m7w), technical appendix (1.1.5), a `refines` link (6.1), draft (1.3.2), RecordType, part of the system and fragment of a format (12.1), a RecordType's `schema` and its identifying field (12.2), RuntimeChecks (12.3), a RecordType variant, `chosenBy` and `answersTo` (12.6), a field with `enum` (12.7), the sids of a project's own kind (12.8), gathered values (12.9), the names of the parts (12.11), `identifierOf` (row 12.12.2), the contracts section (3.1), `TableRule` (8.6), the project's extension of the schema (5.2).
- **Words.** "refuses", "accepts", "the most likely mistake", "is treated as", "points to", "the SpecSheriff tools", never "the tools" alone, and no "carries", "stands", "counts as" or "only once". A section's title is «название» in Russian, as rule 4.1 renders it, since «заголовок» would read as a domain's header in these nodes. In Russian: «отвергает», «ответственный», «расширение Domains», «заголовок домена», «вариант RecordType», «запись данных», «фрагмент формата», «поле с `enum`», «тип узлов», «уточняет» for `refines`, «в контрактах».
- **`removed` and `stage3`** are in English, as in groups 3 and 4; the page of the group needs their Russian, which the main session builds.
- **Kept `cites` links.** A decision of s-3anv9qcmx8pwp2w and of s-c2r9jndrjbtbsv6 cites s-xfu2gpzddjnmgks, and a decision of s-c2r9jndrjbtbsv6 cites the main table of checks (s-jau82aq9juv9zzh). Their `cites` links stay (the brief, "Citations"). The script checks every node's decisions in `tools.json` for such citations.

## The changes owed to group 5 by groups 1 to 4

The sections "Changes still to be made to nodes and files outside the group" and "Changes needed outside the group" of `group1-notes.md` to `group4-notes.md` were searched for the sids of the group, its titles, the tools locations 7.1.13 to 7.1.18 and 7.1.22, rows 11.3.4 to 11.3.6 and 12.12.2 to 12.12.16, and "item 41" to "item 47". None of them names a change that falls into group 5. The continuation file names three, all carried out:
- row 12.12.11 is implemented by item 46 (line 211 of the continuation file): the new node `new:tools-7-1-enum-values` implements it;
- item 47 is to stop checking the `consumes` links against RecordTypes, to examine the types of fields nested in other types, and to say what counts as a reference (lines 1062 and 1300): done, with the cost the agreed rows give ("reported"), as open problem P4 of the inventory says;
- item 45 is to state the check of the names of a variant's fields, the refusal of a variant without a `refines` link, and the variant's place in the section of its RecordType (lines 366 to 368): done.

## The drafts

### Item 41: `s-vuujweu57sxsa58` — "Domains that use one another in a cycle" (row 11.3.4)

Location tools 7.1.13, unchanged. The title was "No circular dependency between the domains"; the new one uses the verb of rule 11.1.3 and row 11.3.4, "use".

How the questions were settled:
- **Which links make a cycle.** Only the `consumes` links of the headers, by the owner's ruling of 2026-10-30, recorded on row 11.3.4. The node also counts only a `consumes` link that the agreed s-p3n666zfjdrrw6a accepts, so a link from a rule, or to a rule, makes no use. The code does the same (validate.ts:260-263).
- **Notifications through events** (rule 11.1.3, the ruling of 2026-11-17) need no sentence: such a notification is no `consumes` link, so the definition of "uses" leaves it out.
- **Which cycle the refusal names.** One cycle, the first the check finds. Naming every cycle would cost time exponential in the number of domains, and once one cycle is broken the next run names the next. The order in which the check walks the domains is the code's; the node says only that the refusal names one cycle, in the order of use.
- **The reason** says why only `consumes` links count, which is what the node adds to row 11.3.4: rule 11.1.5 lets any node link to any node of another domain.

Stage 3: the check is to run only where the Domains extension is chosen; the test at validate.test.ts:323 carries the node's SpecTag; a test that a citation between rules of two domains makes no cycle is written first. Otherwise the code already does what the node says.

The author's assessment: consistent with 11.1.3, 11.1.5, row 11.3.4 and its decision, and the agreed s-p3n666zfjdrrw6a, whose reason relies on this check; no overlap with s-p3n666zfjdrrw6a, which judges each link alone.

### Item 42: `s-gvafe6bnstwab8b` — "Sections of the technical appendix matched to the domains" (row 11.3.5)

Location tools 7.1.22, unchanged. The title was "A file of the technical appendix named after a domain".

How the questions were settled:
- **What "the same name and the same place in the structure" means** (row 11.3.5). The owner's ruling of 2026-11-18 on the row: the structure of the technical appendix matches that of the base specification, the domains and their sections included, as far as needed, and the check runs one way. The agreed "Where the files are" (s-zefk589ykh37b8u) keeps the section of the technical appendix that implements a domain in `specs/tech/<domain>.json`, so the file's name is the domain's name. Below the file's first top-level node, a section matches a section of the domain by its title and by the titles of the sections that hold it. **[check]** The first top-level node of the file represents the domain, and its title is not compared: the agreed table identifies that section with the file, and nothing states what title it must have.
- **Further top-level nodes of a file** are treated as nodes under the first, as the agreed "How a node's location is computed" (s-ygg5kpcxgzq3m7w) numbers them. In the domain, the sections at the top of its files and the children of its header start the titles, as that node treats them as nodes under one parent.
- **The contracts section.** With the Domains extension, "Where the files are" gives no file of the technical appendix for the contracts section, and the owner said that the check "has nothing to do with the contracts section". So a file `specs/tech/contracts.json`, or `specs/tech/base.json`, is refused like any file named after no domain.
- **The stack and the technical debt.** Their files are accepted as they are, and their sections are not compared (row 11.3.5).
- **Only sections are matched.** Rules of the technical appendix are not compared by title; a rule of the appendix has its counterpart through its `implements` link, which the agreed s-yprj7d6tnvauggr checks.
- **What the refusal names.** A file named after no domain is refused once, naming the file; the code now refuses each of its top-level nodes. A section is named by its file, sid, location and title.

Stage 3: refuse a misnamed file once; compare the sections below the first top-level node by the titles that lead to them; run only with the Domains extension, so that `specs/tech/base.json` is refused there; the test at validate.test.ts:315 carries the node's SpecTag; a test of a section placed elsewhere is written first.

**Round b (review a, the coordinator's ruling 3).** In a project without the Domains extension, today's code refuses a wrongly named file under `specs/tech/`, such as `specs/tech/foo.json` (validate.ts:446-452, since `isDomain('base')` holds). Stage 3, which runs this check only with the extension, removes that refusal and puts nothing in its place. The check of rule 1.1.2 in such a project is recorded in the continuation file, to be put to the owner before stage 3 changes the code.

The author's assessment: consistent with rules 1.1.2 and 4.1, row 11.3.5 and its ruling, "Where the files are" and "How a node's location is computed". The gap that the continuation file noted on 2026-11-18 stays outside the group: without the Domains extension no row checks that the technical appendix matches the base specification (see the changes outside the group).

### Item 43: `s-uxmkwbnpgtjzkgv` — "The level in a domain's header" (row 11.3.6)

Location tools 7.1.15, unchanged. The title was "A header's level".

How the questions were settled:
- **A header without a level passes.** The owner made the level optional on 2026-11-09 (rule 11.2.1), and row 11.3.6 says "may contain". The code refuses such a header today (validate.ts:248).
- **No list of levels.** A header that contains a level is refused where the project's own guidelines list no levels: the owner's description of the check on 2026-11-18, recorded in the continuation file. The positive form "accepts … only where the project's own guidelines list that level" covers both cases.
- **Which wording of the levels rule is read.** The last approved wording, as the agreed "What the SpecSheriff tools read in the project's own guidelines" (`proposal:new-tools-1-project-g4`) says for every rule of `project.json`: the principle "Nothing unapproved is implemented" and rule 1.3.2. That node also reads the members of every rule that refines the levels rule, in their order. Round b gave that agreed node the sid s-t9j29hppag2nren, and the node now cites it in review a's sentence instead of restating it.
- **Where the level is.** In the header's `level`, as `extensions/domains.schema.json` defines it.
- **The reason.** The diagram of the domains places a domain in the row of its level (rule 11.2.2), and the list of levels orders the rows (rule 11.2.1); a level outside the list has no row.

Stage 3: accept a header without a level; read the levels as the agreed node says (all refining rules, in order, each in its last approved wording) where levelsOf takes the last rule as its file holds it; run only with the Domains extension; the test at validate.test.ts:290 carries the node's SpecTag; tests for a header without a level and for a level only a draft wording adds are written first.

The author's assessment: consistent with 11.2.1, 11.2.2, row 11.3.6 and its ruling, and the agreed reading of `project.json`. The example shows that consequence, since a reader would most likely read the list in the draft.

### Item 44: `s-3anv9qcmx8pwp2w` — "An identifier followed to its end" (rows 12.12.2 and 12.12.3)

Location tools 7.1.17, unchanged. Title unchanged.

How the questions were settled:
- **One node or two.** The owner split the row in two on 2026-11-19, since each requirement can be met without the other. The node keeps both as the two conditions of one main thought, "a field with `identifierOf` is followed to its end": both read the same chain, starting at the same field, and the first step of the chain is what row 12.12.2 checks. Rule 7.3.3 treats a main thought and its conditions as one requirement, as the agreed s-vke5hakwf3uyrjs does for three rows.
- **A chain that reaches a RecordType without an identifying field.** It does not end in a field without `identifierOf`, so the field at its start is refused under row 12.12.3, besides the field that names that RecordType, which is refused under row 12.12.2. The code stops quietly there today (validate.ts:425-434).
- **Which fields a RecordType has.** Those that it declares in its `schema` and those that it takes through `refines`, as rule 12.6 says and the schema's comment on `identifiedBy` says ("its own or inherited"); the code does the same.
- **At any depth.** `identifierOf` anywhere within a RecordType's `schema`, such as the members of a list; the code does the same for the former nested types.
- **An `identifiedBy` that names none of the RecordType's fields where no field refers to the RecordType.** No row of table 12.12 checks it; row 12.12.2 checks only a RecordType that a field refers to. The code refuses it (validate.ts:419). Since the table of checks lists every check, and no rule requires this one, the refusal goes in stage 3 (see the changes outside the group).
- **A reference by `identifierOf` to a RecordType of another part of the system** is item 47's report; this node does not judge where the RecordType referred to is.

Stage 3: read `identifierOf` and `identifiedBy` in the JSON Schema form; refuse the field at the start of a chain that reaches a RecordType without an identifying field; drop the refusal at validate.ts:419; run only with the RecordType extension; the tests at validate.test.ts:406 and :427 are rewritten first and carry the node's SpecTag.

The author's assessment: consistent with 12.2 and its decision of 2026-10-31, rows 12.12.2 and 12.12.3 and their rulings, 12.10 and the ruling of 2026-11-14 on identifiers.

### Item 45: `s-c2r9jndrjbtbsv6` — "What a RecordType variant must agree with" (rows 12.12.4 to 12.12.10)

Location tools 7.1.16, unchanged. Title unchanged.

How the questions were settled:
- **One node for seven rows.** The rows are the conditions of one main thought, "a variant agrees with its RecordType", and each of them needs the same definitions: what a variant is, which RecordType it is a variant of, which fields select a variant, which fields a RecordType has. Rule 7.3.3 keeps a main thought and its conditions in one node, as the old node did and as the inventory's item 45 proposes.
- **What a variant is.** A RecordType that names, in its `answersTo`, the values it corresponds to (rule 12.6; the schema's comment on `answersTo`). The code recognises it the same way.
- **Which RecordType it is a variant of, and exactly one.** **[check]** Rule 12.10 lets a RecordType refine a fragment of a format, so a variant may have a `refines` link to a fragment besides its RecordType. Rule 12.6 makes a variant the variant of one RecordType, the one whose fields select it. So the variant's RecordType is the one RecordType, among those it refines, that has fields that select a variant, and a variant with no such RecordType, or with several, is refused (row 12.12.4). The code takes the first `refines` link to any RecordType, which would refuse a correct variant that refines a fragment first.
- **Which fields select a variant.** Those in the RecordType's `chosenBy`, or, where it names none, in that of the nearest RecordType up its `refines` links (rule 12.6, "named by the RecordType itself or by a RecordType that it refines"; the schema's comment on `answersTo`).
- **"The same section"** (row 12.12.5). The nearest section that holds each; where no section holds a RecordType, the part of the base specification that holds it. Rule 12.1 declares a RecordType in a section; the second sentence only closes the case of a RecordType at the top of a part, such as a child of a domain's header.
- **What a variant "declares".** The properties of its `schema` (the ruling of 2026-11-19; the page the owner accepted). Row 12.12.6 asks for at least one, and row 12.12.7 for names that differ from every field of its RecordType, those taken through `refines` included.
- **How the names of fields are compared.** **[check]** Character for character. The continuation file left this to the step that changes the tools ("whether the names of fields are compared regardless of letter case"). JSON Schema compares the names of properties character for character, and by the rule "A decision about a data structure is weighed against JSON Schema first" and the owner's ruling of 2026-11-19, RecordType follows JSON Schema. The owner's ruling of 2026-10-30 that ignores letter case concerns the names of RecordTypes, not of fields.
- **The values of a selecting field** (row 12.12.9). As item 46 collects them, which covers a field whose values come from `x-enumSource`, as the ruling of 2026-11-19 on the row says.
- **A variant without a RecordType** is checked only against the third condition (round b, review c's finding 1); the code checks none of the others today (validate.ts:384-386).
- **Two RecordTypes equally near** (round b, the coordinator's ruling 1): each RecordType variant of such a RecordType is refused under the first condition, and the refusal names both.
- **Dropped:** the part that declares a value (s-xfwuvd3funutmsw, archived; rule 12.6 and the ruling of 2026-11-16), and the count of fields of type `variant` (the ruling of 2026-11-19).

Stage 3: see the draft's `stage3`. In short: recognise a variant by `answersTo`, choose its RecordType among its `refines` links, compare the nearest sections, read the fields from `schema` including those taken through `refines`, read the values as item 46 collects them, group the duplicates by RecordType, and drop the two old checks.

The author's assessment: consistent with 12.6 and its decisions of 2026-11-16 and 2026-11-19, rows 12.12.4 to 12.12.10 and their rulings, 12.10, and the agreed s-dbk2vyeg8z5jxna, whose stage 3 also drops the field of type `variant`.

### Item 46: `s-5nf87c3e3jg9v7c` — "Where the values of a field with `enum` are collected from" (rules 12.7, 12.8 and 12.11)

Location tools 7.1.18, unchanged. The title was "Where the values of a field of type `one of` are collected" (X4).

**The split.** The old node held how the values are collected and the refusals of the check. The collecting is needed without the refusals by `sheriff reindex` (s-ztseyetus7np6br), by `sheriff validate` for the gathered values (s-agc6fb3vx46pc23), by the check of variants (item 45) and by `sheriff types`. So by rule 7.3.3 and the rule "A node is split within its section without asking", it stays here, and the check of rows 12.12.11 to 12.12.13 is the new node below. The old node's sid stays with the collecting, which its title names and which s-c2r9jndrjbtbsv6 cites it for.

How the questions were settled:
- **The sources** are those of rule 12.7: its own list, the names of the parts (12.11) and the sids of the nodes of a project's own kind (12.8). The lists that the domains added (removed on 2026-11-16) and the names of the domains (replaced on 2026-11-18) go, with the four refusals about those lists.
- **The names of the parts.** *Superseded in round b by the coordinator's ruling 4: with the Domains extension, as below; without it, the recommended answer A, the top-level sections of `specs/base/` and `specs/contracts/` by their titles, put to the owner.* **[check]** The name of each folder under `specs/` that holds a part of the base specification: `contracts`, and `base` or each domain's name. The agreed proposal on rule 8.5 and "How a node's location is computed" name a node's part by that folder, as in `base/3.2`, `contracts/1` and `requests/2`. Rule 12.11's example includes the contracts section among the values. The code today reads only the domains' headers, and so leaves out `contracts`. The other reading, the top-level sections of the base specification, was set aside: rule 12.11 speaks of the parts "into which the base specification is divided", and the agreed location of a node names those parts.
- **The node that a value comes from** (rule 12.9 writes each value with it). **[check]** For a sid, the node itself. For a part's name, the node that the part opens with: a domain's header, or, for `contracts` and `base`, the first top-level node of the first of the part's files in the code-point order of their paths. The agreed proposal on rule 8.5 speaks of "the node a part opens with" for a domain's header; the other parts have no header, so their first node in the order in which locations are computed stands in. No rule names another node.
- **The order of the gathered values.** By the nodes they come from, as the owner ruled on 2026-11-05 for "The type each neutral type of a field gives" (s-4npdup7mjkva69y). The node states the order where the values are written, so that item 56 can cite it.
- **Nodes in cells.** A node of a project's own kind in a cell of a `TableRule` gives a value too, as every check of groups 1 to 4 counts nodes in cells.
- **No refusal.** The node is a procedure, so it has no "regardless" sentence.

Stage 3: see the draft's `stage3`. In short: read the JSON Schema form, give `parts` the names of the folders, contracts included, each from the node its part opens with, take the kind's nodes in cells too, and drop the source `domains` and its lists.

### `new:tools-7-1-enum-values` (s-dk3zfkbhc3v6xbp) — "Fields with `enum` that `sheriff validate` accepts" (round a: "The values and the source of a field with `enum`"; round b: "Which fields with `enum` `sheriff validate` accepts")

**Round c (review b-d, FIX 1).** Today's code refuses a value declared more than once, including a gathered one (validate.ts:354-356). That refusal goes in stage 3: the schema refuses a value repeated in a field's own `enum`, and row 12.12.11 does not count the gathered values, so a value gathered twice is not refused. Under answer А, two top-level sections with the same title give such a value; the question to the owner names this risk. (rows 12.12.11 to 12.12.13)

Location tools 7.1.18a, new, after item 46. The sid was generated with the alphabet of rule 1.2.2 and checked against `specs/`, `moved/` and `tools-drafts.json` (the script checks it again on every run).

How the questions were settled:
- **Row 12.12.11** is made by the validation against the schema: `extensions/recordtype.schema.json` sets `uniqueItems` on every `enum` within a RecordType's `schema` (moved/report.md; the continuation file, line 211). The gathered values are kept in `x-enumSource.gathered`, not in `enum`, so they are not counted, as the row says.
- **Row 12.12.12** counts the values as item 46 collects them, so a source elsewhere in the specification that gives no value is refused too, as the code does today for a domain's list.
- **Row 12.12.13.** **[check]** Only a kind that the project's extension of the schema adds in its field `kinds`. Rule 12.8 lets the values be "the sids of the nodes of one of the project's own kinds of node" only. The code accepts the kinds of the SpecSheriff guidelines too (validate.ts:374), and the inventory read "names a kind that exists" as "a kind that the schema defines"; the rule is narrower.
- **The reason** covers the node as a whole: a field's type and RuntimeCheck accept only its values, so a field with no value, or with a source that can never give one, admits no data record.

Stage 3: read the JSON Schema form; count values as item 46 collects them; accept only the project's own kinds; a test of a repeated value in an own `enum` is written first; the tests at validate.test.ts:417 and :514 are rewritten first and carry the new sid.

The author's assessment of both halves of item 46: consistent with 12.7, 12.8, 12.9, 12.11 and their decisions, rows 12.12.11 to 12.12.14, the agreed s-ztseyetus7np6br, s-agc6fb3vx46pc23, s-a8fn72xa782wvbk and s-czxaqvaesmu3gru (which defines the project's own kinds the same way).

### Item 47: `s-ezq8csd433vj6fj` — "A RecordType that refers to a RecordType outside its part of the system" (rows 12.12.15 and 12.12.16)

Location tools 7.1.14, unchanged. The title was "A used domain's RecordType, only from the declared sections".

How the questions were settled:
- **Reported, not refused.** Rows 12.12.15 and 12.12.16, agreed on 2026-11-19, say "reported by the node's sid". An older note of the continuation file (2026-11-14) recommended refusing; the agreed rows prevail (open problem P4 of the inventory).
- **The `consumes` links are no longer read.** Rule 12.10 replaced the archived rule s-5yvpn4zhuqmv5bq: a RecordType refers to no RecordType of another part of the system, whatever the `consumes` links say (the owner, 2026-11-14).
- **What counts as a reference** (the continuation file's note: "say what counts as a domain accepting a RecordType, since a check sees only a field's type or a `refines` link"). A `$ref` or an `identifierOf` at any depth within the RecordType's `schema`, and a `refines` link. The owner's ruling of 2026-11-14 settles `identifierOf`: an identifier of another part's data record is stored as an ordinary value, so a field with `identifierOf` that names another part's RecordType is a reference. The example shows it, since a reader would most likely leave it out.
- **What a part of the system is for the tools.** **[check]** Rule 12.1: "a top-level section of the base specification or a domain", which the owner confirmed on 2026-11-19 ("in the specification, a section or a domain"). With the Domains extension, the domain; without it, the section of `specs/base/` whose location is `base/` and a single number, defined by its location as the agreed s-4bwa4zepd4nwcv8 defines a top-level section. The RecordTypes in no section of `specs/base/` are treated as one part, as s-4bwa4zepd4nwcv8 treats the rules in no section.
- **What a fragment of a format is.** A RecordType of the contracts section: rule 12.1 declares only fragments there, by the owner's ruling of 2026-11-16 ("the contracts section declares no RecordType except fragments of formats").
- **Which references are accepted** is a list of what is allowed (rule 7.2.6), since a reference let through would go unnoticed.

Stage 3: no code makes this check. It is to be written in validate.ts, its tests first, as the draft's `stage3` lists.

The author's assessment: consistent with 12.1, 12.10 and their decisions, rows 12.12.15 and 12.12.16, and item 44, which does not judge where the RecordType referred to is.

## Questions for the owner

One, since round b: what the source `parts` gives in a project without the Domains extension. It is under «Вопрос ответственному» in the section on round f.

## Changes still needed outside the group

1. **`moved/impl.json`:**
   - rows 12.12.11 (s-upj45kydz8727be), 12.12.12 (s-buug8n5eh7tdnsv) and 12.12.13 (s-hcgmz4v5avbj3nt) → s-dk3zfkbhc3v6xbp (now `[]`);
   - rows 12.12.15 (s-rpkq8y79fwg5k92) and 12.12.16 (s-hn9m9dhxaazjn3y) → s-ezq8csd433vj6fj (now `[]`);
   - rows 11.3.4 to 11.3.6 and 12.12.2 to 12.12.10 keep their nodes.
2. **"The type each neutral type of a field gives" (s-4npdup7mjkva69y), item 56:**
   - it is to state the forms in which a RecordType's `schema` names another RecordType: `$ref` with `#` and the RecordType's sid, as the page the owner accepted on 2026-11-19 shows, and the value of `identifierOf`. Items 44 and 47 rely on "a `$ref` that points to a RecordType" and "an `identifierOf` that names it", and are to cite item 56 once it says so (a technical replacement);
   - it states the order of the gathered values; it is to cite `s-5nf87c3e3jg9v7c`, which now states it where the values are written, instead of restating it.
3. **Table 12.12:**
   - no row checks that a RecordType's `identifiedBy` names one of its fields where no field refers to the RecordType. The code refuses it (validate.ts:419), and stage 3 drops that refusal, since the table lists every check and no rule requires it. To be raised when table 12.12 next changes, if anyone wants it kept;
   - no row checks that a `$ref` within a RecordType's `schema` points to a RecordType that exists. Item 47 reports a `$ref` to another part's RecordType, but none to nothing. To be raised with item 56, which defines the `$ref`.
4. **Without the Domains extension, no row checks that the technical appendix matches the structure of the base specification** (rule 1.1.2). The continuation file noted this on 2026-11-18, to be raised after table 11.3 was agreed. Item 42 belongs to the Domains extension and cannot close it.
5. **"What the SpecSheriff tools read in the project's own guidelines" (`new:tools-1-project`)** got the sid s-t9j29hppag2nren in round b, as the brief asked, and item 43 cites it. Stage 3 writes that sid into the node when it moves the drafts into `specs/`.
6. **"Values built from other nodes" (s-agc6fb3vx46pc23), agreed:** it compares "the values gathered for each field that has an `enum`" with what `sheriff reindex` would write. It may cite s-5nf87c3e3jg9v7c for what the source gives when it next changes; nothing in it contradicts the group.
7. **The schema in moved/** (not a node, so this waits for stage 3): `extensions/recordtype.schema.json` is to declare `identifierOf` (and its value), which rows 12.12.2 and 12.12.3 and items 44 and 47 use; the continuation file already lists the vocabulary of SpecSheriff for stage 3.
8. **The decisions of the archived rules.** The `implements` links of the group to s-xfwuvd3funutmsw, s-gzfq3x8hesj227e and s-5yvpn4zhuqmv5bq go with the new wordings, as the `removed` fields say. Nothing else in the group points to the archive.
9. **`.ai_docs/INDEX.md`:** the brief forbade touching it. The main session still has to add rows for `propose-group5.mjs`, `fix-group5-b.mjs`, `fix-group5-c.mjs`, `fix-group5-d.mjs`, `english-group5d.md`, `tools-drafts.before-group5-d.json`, `fix-group5-e.mjs`, `english-group5e.md`, `tools-drafts.before-group5-e.json`, `fix-group5-f.mjs`, `english-group5f.md`, `tools-drafts.before-group5-f.json`, `fix-group5-g.mjs`, `english-group5g.md`, `tools-drafts.before-group5-g.json`, `fix-group5-h.mjs`, `english-group5h.md`, `tools-drafts.before-group5-h.json`, `rename-folder-group5.mjs`, `english-rename-folder-group5.md`, `tools-drafts.before-rename-folder-group5.json`, `group5-assessments.json`, `group5-ru.json`, `build-group5-ru.mjs`, `gen-group5-page.mjs`, `group5-page/index.html`, `group5-notes.md`, `english-group5.md`, `english-group5b.md`, `english-group5c.md`, `tools-drafts.before-group5.json`, `tools-drafts.before-group5-b.json` and `tools-drafts.before-group5-c.json`.
10. **Item 56, SpecSheriff's own keywords in a RecordType's `schema`** (review d, question 2; the coordinator's ruling 2): `x-enumSource` carries the `x-` prefix of OpenAPI's specification extensions, while `identifierOf`, `identifiedBy`, `chosenBy` and `answersTo` carry none. One convention is to be settled with item 56, which states the forms that `$ref` and `identifierOf` use. It touches the schema, rows 12.12.2 and 12.12.3, and items 44 to 47.
11. **Table 12.12:** no row checks that a RecordType's `chosenBy` names a field of that RecordType (review c). To be raised when the table next changes.
12. **The continuation file** (review d): the agreed s-ztseyetus7np6br and s-agc6fb3vx46pc23 write "a field that has an `enum`" for the term "a field with `enum`" of rule 12.7, which covers a field whose values come from `x-enumSource`. The main session is to record this in the continuation file, which the brief forbids this agent to touch; it is a technical replacement for when those nodes next change.
13. **The docs** (the reviewers' TERM notes; no node changes): "use one another in a cycle" is a dependency cycle (review a); "level" is not one of C4's levels (review a); "the titles that lead to a section" is close to a breadcrumb trail (review a); a RecordType variant is a branch of a discriminated union, and `chosenBy` corresponds to OpenAPI's `discriminator.propertyName` (review c); `identifiedBy` and `identifierOf` may be glossed as a primary key and a foreign key (review b); "a field with `enum`" fits JSON Schema's `enum` only in part (review d); "last approved wording" corresponds only in part to the baseline of ISO/IEC/IEEE 29148 (review b-a).
14. **Done on 2026-11-24 by `rename-folder-group5.mjs`, with "the name of a part" in s-4bwa4zepd4nwcv8 as well; see the section «Agreed».** **Under answer A, once the owner has chosen it** (review d-d, finding 2): in the agreed proposal on rule 8.5, "A node's location" (s-kag2m9tzdnduxdx), and in the agreed "The judgement on a node of the technical appendix that a commit approves" (s-4bwa4zepd4nwcv8), "a part of the base specification" becomes "a folder of the base specification". These are the words of the agreed "How a node's location is computed" (s-ygg5kpcxgzq3m7w). In rule 8.5, the item on a node that opens a part of the base specification says "the part's name alone", and the paragraph after the list says "the part's name alone" and "the other top-level nodes of the part"; each becomes "the folder's name alone" or "the other top-level nodes of the folder", and the Russian «одно имя части» and «на вершине части» become «одно имя папки» and «на вершине папки». Otherwise one sentence would call the same thing a folder and a part. The meaning of neither node changes, so the owner's choice of A decides this renaming: it is a technical replacement, reported to the owner in one line, and the owner does not see the two nodes again. Under answer B, nothing is renamed, and rule 12.11 needs a new wording instead.
15. **Item 56, rows 12.12.6 and 12.12.7** (review c-c, finding 2, from round d; review d-c, from round e): both rows look only at a RecordType variant's own `schema`.
   - A RecordType variant of `A` and a RecordType variant of `B`, a RecordType that refines `A` and has no `chosenBy`, can both declare `address` for `email`; a data record of `B` for `email` would then get `address` from both.
   - A RecordType variant that also refines a fragment of a format takes on the fragment's fields, and nothing compares them with its RecordType's fields.
   - A RecordType variant that adds fields only through a fragment fails the third condition of item 45.
   To be settled when item 56 is drafted; row 12.12.7, and perhaps row 12.12.6, may need to cover these fields.

## What was not touched

Nothing under `specs/`; no node outside the group, in `specs/` or in the drafts; `.ai_docs/INDEX.md`, `tasks.md` and `t25-one-thought.md`.
