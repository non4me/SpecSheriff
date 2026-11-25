### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-vuujweu57sxsa58 — Domains that use one another in a cycle
TRANSLATION: Заголовок: «Домены, использующие друг друга по циклу».
Текст: Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` отклоняет изменение, когда домены используют друг друга по циклу (§s-bncp7gtyaukur8e). Отказ называет домены одного такого цикла в порядке, в котором каждый использует следующий.
Один домен использует другой, если у заголовка домена первого (§s-yggv9myedprnaa7) есть связь `consumes` с секцией второго. Учитывается только связь, которую принимает проверка связей `consumes` (§s-p3n666zfjdrrw6a). Домены используют друг друга по циклу, если цепочка доменов, где каждый использует следующий, возвращается к своему первому домену.
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или это draft (§s-bncp7gtyaukur8e).
Причина: Только связи `consumes` в заголовках доменов говорят, какой домен что использует (§s-yggv9myedprnaa7). Узел, который опирается на то, что утверждает другой домен, имеет связь любого типа с узлом того домена, где это утверждается (§s-hr7j7scmfkkjnws). Поэтому проверка, которая шла бы по связям всех типов, отклоняла бы домены, не использующие друг друга.
Пример: У заголовка домена `requests` есть связь `consumes` с секцией домена `users`. У заголовка `users` такая же связь с секцией `requests`. `sheriff validate` отклоняет изменение и называет `requests` и `users`. В другом проекте связь `consumes` с секцией `users` есть только у заголовка `requests`, а правило `users` ссылается на правило `requests`. Там `sheriff validate` принимает изменение. Вероятнее всего ошибиться, сочтя эту ссылку использованием `requests` доменом `users`.
TWO READINGS:
- "leads back to its first domain": "its" is the chain (the first domain of the chain), or each domain (the first domain that it uses). The first reading is favoured by the context.
- "the first" / "the second" (in "the header of the first … a section of the second"): the first and the second of the two domains in the pair. This is easy to confuse with "its first domain" in the chain, which has a different meaning.
- "has a link of any type": a link of any type, not only `consumes`, is enough to exist (the favoured reading). Or: a link of whatever type happens to be there, with no requirement that it exists.
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-gvafe6bnstwab8b — Sections of the technical appendix matched to the domains
TRANSLATION: Заголовок: «Секции технического приложения, сопоставленные доменам».
Текст: Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает JSON-файл в `specs/tech/` только если он один из следующих (§s-zefk589ykh37b8u, §s-vghy37e3p2325ah):
- `specs/tech/stack.json` или `specs/tech/debt.json`;
- файл, названный по домену, `specs/tech/<domain>.json`, где `<domain>` — имя домена.
`sheriff validate` отклоняет любой другой файл технического приложения (§s-tj38pvm38nepaf5), называя файл.
В файле, названном по домену, `sheriff validate` принимает каждую секцию, вложенную в первый узел верхнего уровня файла, только если заголовки, ведущие к ней, ведут также к секции этого домена (§s-vghy37e3p2325ah). Заголовки, ведущие к секции, — это заголовки секций, которые её содержат, сверху вниз, а затем собственный заголовок секции. Любую другую секцию файла `sheriff validate` отклоняет, называя её по файлу, sid и расположению (§s-kag2m9tzdnduxdx), а также называя её заголовок.
Первый узел верхнего уровня файла, названного по домену, представляет сам домен, поэтому заголовки, ведущие к секции этого файла, начинаются ниже этого узла. Каждый следующий узел верхнего уровня файла считается узлом под первым, как при вычислении расположений (§s-ygg5kpcxgzq3m7w). В домене заголовки, ведущие к секции, начинаются с секции, которая является узлом верхнего уровня одного из файлов домена или потомком заголовка домена (§s-yggv9myedprnaa7).
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или это draft (§s-vghy37e3p2325ah).
Причина: Чтобы узнать, как реализовано правило домена, читатель смотрит в файл технического приложения, названный по этому домену. Там он идёт по тем же заголовкам, которые ведут к правилу в домене (§s-vj7ercem526zd6v). Секция этого файла, не соответствующая ни одной секции домена, содержит реализацию, которую такой читатель не найдёт.
Пример: В домене `requests` есть секция «Intake», в ней секция «Validation». В `specs/tech/requests.json` первый узел верхнего уровня файла содержит секцию «Intake», в ней секцию «Validation», и `sheriff validate` принимает обе. Другая секция «Validation» лежит прямо под первым узлом верхнего уровня файла, и `sheriff validate` её отклоняет. Вероятнее всего ошибиться, приняв эту секцию на том основании, что в домене есть секция «Validation», хотя секция домена находится под «Intake».
TWO READINGS:
- "the titles that lead to it also lead to a section of that domain": "it" is the section of the file being checked (the favoured reading), not the file.
- "start at a section that is a top-level node of one of the domain's files or a child of the domain's header": "start at" a section that is at the top of the domain's tree (the favoured reading), or "start at" the first title after such a section. The wording does not say whether that top section's own title is included.
- "below": "below the file's first top-level node" means nested inside it (the favoured reading), or "later in the file". The example confirms the first reading.
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-uxmkwbnpgtjzkgv — The level in a domain's header
TRANSLATION: Заголовок: «Уровень в заголовке домена».
Текст: Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает заголовок домена (§s-yggv9myedprnaa7), содержащий уровень, только если собственные guidelines проекта (§s-u7tw6m8npxmv5tu) перечисляют этот уровень (§s-nkyty4dy9x2v2a4, §s-j3v4y4d3sbmdgfp). Заголовок содержит уровень как значение своего `level`.
Любой другой заголовок, содержащий уровень, `sheriff validate` отклоняет, называя заголовок по файлу, sid и расположению (§s-kag2m9tzdnduxdx) и называя уровень. Заголовок без уровня эту проверку проходит.
Как и любой список в собственных guidelines проекта, уровни инструменты SpecSheriff читают в последней одобренной формулировке (§s-a8fn72xa782wvbk) каждого правила, которое их перечисляет (§s-t9j29hppag2nren). Поэтому уровень, который добавляет только формулировка-draft, принимается лишь после одобрения этой формулировки.
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или это draft (§s-j3v4y4d3sbmdgfp).
Причина: Диаграмма доменов помещает каждый домен в строку его уровня (§s-4azsb49pj6sech8). Порядок уровней в их списке задаёт порядок строк (§s-nkyty4dy9x2v2a4). Поэтому у уровня вне этого списка нет строки.
Пример: Одобренное правило `project.json` уточняет правило об уровне домена и перечисляет `core` и `edge`. `sheriff validate` принимает каждый заголовок с `core` или `edge` и каждый заголовок без уровня. Участник команды добавляет `platform` в его список, и правило становится draft. Пока новая формулировка не одобрена, `sheriff validate` отклоняет каждый заголовок с `platform`, называя `platform`. Вероятнее всего ошибиться, взяв список из формулировки-draft.
TWO READINGS:
- "the last approved wording": the most recent approved wording (the favoured reading), or the final, definitive one.
- "each rule that lists them": "them" is the levels (the favoured reading). "Their list" in the Reason is the same list.
- "its list" (in "adds `platform` to its list"): the list of the rule (the favoured reading), or the list of the header.
LANGUAGE:
- "the last approved wording" → "the latest approved wording" — "last" can be read as "final"; "latest" or "most recent" says which wording is meant.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-3anv9qcmx8pwp2w — An identifier followed to its end
TRANSLATION: Заголовок: «Идентификатор, прослеженный до конца».
Текст: Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает поле с `identifierOf` (§s-qpdnkejr5xzc6j3) только если выполнены оба условия:
- его `identifierOf` называет RecordType (§s-7vm323mhry2enx3), который в своём `identifiedBy` называет одно из своих полей как поле, идентифицирующее его записи данных (§s-6eb92ddch7shuvu);
- цепочка идентификаторов, начинающаяся с этого поля, заканчивается полем без `identifierOf` (§s-cqys6wqrnfzu5ac).
Любое другое поле с `identifierOf` `sheriff validate` отклоняет, называя RecordType, который его содержит, по файлу, sid и расположению (§s-kag2m9tzdnduxdx). Отказ называет также поле и каждое условие, которое поле не выполняет. Поле он называет JSON Pointer к схеме поля внутри `schema` RecordType, например `/properties/accounts/items`.
Цепочка идентификаторов, начинающаяся с поля, идёт к полю, которое идентифицирует записи данных RecordType, названного `identifierOf` этого поля. Если у того поля тоже есть `identifierOf`, цепочка продолжается так же. Цепочка, которая во второй раз приходит к идентифицирующему полю того же RecordType, никогда не заканчивается.
Поля RecordType здесь — те, что он объявляет в своей `schema` (§s-6eb92ddch7shuvu), и те, что он получает через `refines` (§s-sn6au3vcr9uy5pm) от другого RecordType. `sheriff validate` выполняет эту проверку везде, где `schema` RecordType содержит `identifierOf`, на любой глубине, например в схеме элементов списка.
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или это draft (§s-qpdnkejr5xzc6j3, §s-cqys6wqrnfzu5ac).
Причина: Поле с `identifierOf` берёт свой тип у поля в конце своей цепочки идентификаторов (§s-6eb92ddch7shuvu, §s-cqys6wqrnfzu5ac). Поэтому типы и RuntimeChecks, сгенерированные из RecordType, который содержит поле (§s-e877bnfa559tvk9), могут задать полю тип, только если у цепочки есть конец.
Пример: У RecordType `statement` есть поле `accountId`, чей `identifierOf` называет RecordType `account`. `identifiedBy` RecordType `account` называет его поле `number` типа `string`. Цепочка, начинающаяся с `accountId`, заканчивается на `number`, и `sheriff validate` принимает поле. RecordType `left` и `right` идентифицируются каждый полем, чей `identifierOf` называет другой, поэтому их цепочки никогда не заканчиваются. `sheriff validate` отклоняет оба поля. Вероятнее всего ошибиться, пройдя только первый шаг каждой цепочки: тогда приняли бы оба поля.
TWO READINGS:
- "An identifier followed to its end" (title): "its" is the end of the chain of identifiers. The title names the identifier, but the text speaks about a chain. The reading "the identifier's own end" does not fit.
- "naming the RecordType that holds it by its file, its sid and its location": "its" is the RecordType's (the favoured reading), or the field's.
- "its `identifierOf` names a RecordType that names, in its `identifiedBy`, one of its fields": the first "its" is the field's. The later "its" are the named RecordType's. The first "its" is the one at risk.
- "It names the field by the JSON Pointer": "It" is the refusal (the favoured reading), or `sheriff validate`. The result is the same.
LANGUAGE:
- "An identifier followed to its end" → "A chain of identifiers that has an end" — the title names the identifier while the text is about a chain. I am not sure this keeps the meaning of the title exactly.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-c2r9jndrjbtbsv6 — What a RecordType variant must agree with
TRANSLATION: Заголовок: «С чем должен согласовываться вариант RecordType».
Текст: Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` проверяет каждый вариант RecordType (§s-z3dnru6qqdf9m6j) на соответствие его RecordType.
Вариантом RecordType `sheriff validate` считает каждый RecordType, который в своём `answersTo` называет значения, которым он соответствует. RecordType варианта — это RecordType, у которого есть поля, выбирающие вариант, и с которым у варианта есть связь `refines` (§s-sn6au3vcr9uy5pm). Поля, выбирающие вариант RecordType, — те, что RecordType называет в своём `chosenBy`. Если он не называет ни одного, это поля, названные в `chosenBy` ближайшего RecordType вверх по цепочке связей `refines`, у которого есть `chosenBy`.
Поля, которые объявляет RecordType, — это свойства его `schema` (§s-6eb92ddch7shuvu). Имена полей сравниваются посимвольно. Если RecordType не содержит ни одна секция, ближайшей секцией для него считается часть базовой спецификации, которая его содержит (§s-kag2m9tzdnduxdx).
`sheriff validate` принимает вариант RecordType, только если выполнено всё следующее:
- у него есть связь `refines` ровно с одним RecordType, у которого есть поля, выбирающие вариант (§s-bmyzn6zuds6czqm);
- он объявлен в той же секции базовой спецификации, что и его RecordType (§s-vtpxwqe7ncmn5bz): ближайшая секция, содержащая вариант RecordType, — это ближайшая секция, содержащая его RecordType;
- он объявляет хотя бы одно поле (§s-47q37qk27yvt3pa);
- имя каждого объявляемого им поля отличается от имени каждого поля, которое его RecordType объявляет или получает через `refines` от другого RecordType (§s-hrguxwcsdm57vxf);
- поля, которые называет его `answersTo`, в точности совпадают с полями, выбирающими вариант его RecordType (§s-swturmy7hmhfvt4);
- каждое значение, которое его `answersTo` называет для поля, — одно из значений этого поля в том виде, как их собирают инструменты SpecSheriff (§s-5nf87c3e3jg9v7c, §s-27aycne77epeaq6);
- его `answersTo` отличается от `answersTo` каждого другого варианта RecordType того же RecordType (§s-5z8vjzmc3s983gk).
Любой другой вариант RecordType `sheriff validate` отклоняет, называя его по файлу, sid и расположению (§s-kag2m9tzdnduxdx). Отказ говорит также, какое из перечисленных условий вариант не выполняет. Для последнего условия он называет ещё каждый другой вариант RecordType с тем же `answersTo`.
Когда `sheriff validate` проверяет файлы по схеме спецификации, он отклоняет `answersTo`, который задаёт полю больше одного значения (§s-xzcw3hv4hmxz7h7, §s-swturmy7hmhfvt4).
Если вариант RecordType не выполняет первое условие, `sheriff validate` проверяет его только по третьему, поскольку каждое из остальных сравнивает вариант с его RecordType.
Если RecordType ничего не называет в `chosenBy`, а два RecordType, одинаково близкие вверх по цепочке его связей `refines`, называют в своих `chosenBy` разные поля, `sheriff validate` отклоняет по первому условию каждый вариант RecordType, который его уточняет. Отказ называет оба этих RecordType.
`sheriff validate` выполняет эти проверки независимо от того, одобрена спецификация или это draft (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk).
Причина: Запись данных содержит поля своего RecordType вместе с полями варианта RecordType, который соответствует её значениям (§s-z3dnru6qqdf9m6j). Только если каждый вариант RecordType согласован со своим RecordType, у каждой записи данных есть один набор полей, который могут описать типы и RuntimeChecks, сгенерированные из RecordType (§s-e877bnfa559tvk9).
Пример: RecordType `notification` называет `channel` в своём `chosenBy`, значения `channel` — `email` и `app`. Он уточняет фрагмент формата `message`, объявляющий поле `text`. Вариант RecordType в той же секции, что и `notification`, уточняет `notification`, называет `email` для `channel` в своём `answersTo` и объявляет `address`; `sheriff validate` его принимает. Другой вариант RecordType называет `sms` для `channel` и объявляет `text`. `sheriff validate` его отклоняет, потому что `sms` не значение `channel`, а `notification` получает `text` из `message`. Вероятнее всего ошибиться, сравнив имена полей варианта RecordType только с теми, что `notification` объявляет в своей `schema`: так `text` останется незамеченным.
TWO READINGS:
- "`sheriff validate` refuses each RecordType variant that refines it under the first condition": "under the first condition" belongs to "refuses" (the refusal is made on the first condition, the favoured reading), or to "refines". The text does not make this clear.
- "refines it" in the same sentence: "it" is the RecordType that names nothing in its `chosenBy` (the favoured reading), not one of the two RecordTypes up the chain.
- "Where a RecordType names nothing in its `chosenBy`": the RecordType has no `chosenBy` field at all, or it has one that is empty. The first reading is favoured, since the earlier paragraph says "Where it names none".
- "checks it only against the third": the third condition in the list ("it declares at least one field"). Only the ordinal says this, and the reader has to count items.
- "the first condition" and "the last condition": the first and the last item of the list, again by counting.
- "the values that it corresponds to": "it" is the RecordType that is the variant. The values correspond to the variant, not the RecordType.
- "its values" in the Reason ("the RecordType variant that corresponds to its values"): the values of the data record (the favoured reading), or the values of the RecordType.
- "Another RecordType variant names `sms`": the text does not say that this variant refines `notification` or sits in the same section. A reader assumes it.
LANGUAGE:
- "the values that it corresponds to" → "the values that it answers to" — "corresponds" is a loose word. I am not sure this keeps the meaning, since `answersTo` may be meant as a strict relation.
- "names nothing in its `chosenBy`" → "has no `chosenBy`" — "names nothing" is unusual wording. Unsure: it changes the meaning if an empty `chosenBy` is meant.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-5nf87c3e3jg9v7c — Where the values of a field with `enum` are collected
TRANSLATION: Заголовок: «Откуда собираются значения поля с `enum`».
Текст: Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), инструменты SpecSheriff собирают значения поля с `enum` (§s-xfu2gpzddjnmgks) из его источника, которым служит ровно одно из следующего:
- собственный список поля, если схема поля содержит `enum`: члены этого `enum` в их порядке;
- имена частей базовой спецификации (§s-gqavjzcmubg5pvk, §s-5x737t9nee4zgaa), если `x-enumSource.from` поля равно `parts`;
- sid узлов собственного типа проекта (§s-mt6auv3jz8m5gzh), если `x-enumSource.from` поля равно `kind`: sid каждого узла базовой спецификации, тип которого называет `x-enumSource.kind` поля, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6).
Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), частями базовой спецификации являются домены и секция contracts (§s-z6tq6a3btnvvwx7). Имя каждой такой части — имя её папки в `specs/` (§s-zefk589ykh37b8u), например `contracts` или `requests`. Имя домена берётся из заголовка домена (§s-yggv9myedprnaa7). Имя `contracts` берётся из первого узла верхнего уровня первого файла в `specs/contracts/` в порядке кодовых точек путей файлов.
Иначе частями базовой спецификации являются секции, чьё расположение (§s-kag2m9tzdnduxdx) — `base/` или `contracts/` и одно число. Имя каждой такой части — заголовок её секции, и имя берётся из этой секции.
Значение, собранное из sid, берётся из узла, чей это sid.
`sheriff reindex` записывает каждое значение, собранное из имён частей или из sid, в `x-enumSource.gathered` поля (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br) вместе с sid узла, из которого значение взято. Значения записываются в порядке этих узлов: их файлы — в порядке кодовых точек путей, узлы одного файла — в порядке, в котором их обходит вычисление расположений (§s-ygg5kpcxgzq3m7w).
Так инструменты SpecSheriff собирают значения каждого поля с `enum` на любой глубине внутри `schema` RecordType (§s-6eb92ddch7shuvu), например в схеме элементов списка.
Причина: Значения поля записывает `sheriff reindex` (§s-ztseyetus7np6br), сравнивает с источником `sheriff validate` (§s-agc6fb3vx46pc23), а читают проверка вариантов RecordType и `sheriff types` (§s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Собранные единым способом, они одинаковы для каждого из этих применений и на каждой машине.
Пример 1: В проекте с расширением Domains RecordType записи журнала аудита имеет поле `part`, у которого `x-enumSource.from` равно `parts`. Базовая спецификация лежит в `specs/contracts/`, `specs/requests/` и `specs/users/`. `sheriff reindex` записывает `contracts`, `requests` и `users` в `x-enumSource.gathered` поля. Вместе с `contracts` он записывает sid первого узла верхнего уровня первого файла `specs/contracts/`. Вместе с именем каждого домена — sid заголовка этого домена. Вероятнее всего ошибиться, пропустив `contracts`, который является частью базовой спецификации, хотя и не доменом.
Пример 2: В проекте без расширения Domains `specs/base/` содержит секции верхнего уровня «Requests» и «Users», а `specs/contracts/` — секцию «Contracts». Поле `part` того же RecordType получает заголовок каждой из этих секций, каждый с sid своей секции. Вероятнее всего ошибиться, дав полю имена папок, `base` и `contracts`.
TWO READINGS:
- "A domain's name comes from the domain's header": the name is read from the header's content (the header holds a name), or the name is the folder name and "comes from" only says which node it is attributed to (its sid is written beside it). The previous sentence says the name is the folder's name, so the second reading is favoured, but the first is possible.
- "The name `contracts` comes from the first top-level node of the first file of `specs/contracts/`": the same two readings. Here the second is the more likely.
- "in the code-point order of the files' paths": it orders the files, so "the first file" is the first in that order (the favoured reading). It could also be read as ordering the nodes.
- "the nodes of one file in the order in which the computation of locations goes through them": the order of the computation of locations (§s-ygg5kpcxgzq3m7w).
- "in their order" (in "the members of that `enum`, in their order"): the order in which they are listed in the `enum` (the favoured reading).
- "In this way": it refers back to the whole procedure of the previous paragraphs. It could be read as only the last paragraph (the `gathered` writing).
- "the same RecordType" (Example 2): the project is different from Example 1, so "same" can only mean a RecordType of the same kind (an audit log entry), not the very one.
- "each with the sid of its section": "each" is the title, "its" is the title's section.
LANGUAGE:
- "In this way, the SpecSheriff tools collect the values of each field with `enum` at any depth" → "The SpecSheriff tools collect the values of each field with `enum` at any depth in the same way" — "In this way" at the start points back vaguely. The new version keeps the meaning.
- "gets the title of each of those sections" → "has the title of each of those sections among its values" — "gets" is vague. Not sure it keeps the meaning exactly, since the field is not really assigned the titles.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · new:tools-7-1-enum-values — Which fields with `enum` `sheriff validate` accepts
TRANSLATION: Новый узел, выделенный из `s-5nf87c3e3jg9v7c`, с sid s-dk3zfkbhc3v6xbp.
Заголовок: «Какие поля с `enum` принимает `sheriff validate`».
Текст: Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает поле с `enum` (§s-xfu2gpzddjnmgks) только если выполнены оба условия:
- источник даёт ему хотя бы одно значение, когда инструменты SpecSheriff собирают его значения (§s-5nf87c3e3jg9v7c, §s-buug8n5eh7tdnsv);
- если его `x-enumSource.from` равно `kind`, его `x-enumSource.kind` называет один из типов узлов, которые расширение схемы проекта добавляет в своём поле `kinds` (§s-xm8rz4uupb73gu5, §s-hcgmz4v5avbj3nt).
Любое другое поле с `enum` `sheriff validate` отклоняет, называя RecordType, который его содержит, по файлу, sid и расположению (§s-kag2m9tzdnduxdx). Отказ называет также поле, каждое условие, которое поле не выполняет, и, если поле не выполняет условие о типе, сам тип. Поле он называет JSON Pointer к схеме поля внутри `schema` RecordType, например `/properties/accounts/items`.
Когда `sheriff validate` проверяет файлы по схеме спецификации, он отклоняет поле, чей собственный `enum` содержит значение больше одного раза (§s-xzcw3hv4hmxz7h7, §s-upj45kydz8727be). Схема расширения RecordType требует, чтобы каждый `enum` внутри `schema` RecordType (§s-6eb92ddch7shuvu) содержал каждое значение только один раз.
`sheriff validate` проверяет каждое поле с `enum` на любой глубине внутри `schema` каждого RecordType в файлах, которые хранит репозиторий. Эти проверки он выполняет независимо от того, одобрена спецификация или это draft (§s-upj45kydz8727be, §s-buug8n5eh7tdnsv, §s-hcgmz4v5avbj3nt).
Причина: Типы и RuntimeChecks поля генерируются из его значений (§s-e877bnfa559tvk9). Поэтому поле без значений или со значениями, нарушающими правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), внесло бы свою ошибку в сгенерированный код.
Пример: У RecordType записи журнала задачи есть поле `step`, у которого `x-enumSource.from` равно `kind`, а `x-enumSource.kind` равно `TextRule`. `sheriff validate` отклоняет поле и называет `TextRule`. Когда `x-enumSource.kind` называет `jobStep`, тип, который добавляет расширение схемы проекта, а в базовой спецификации есть узел этого типа, поле проходит. Вероятнее всего ошибиться, приняв `TextRule` на том основании, что схема SpecSheriff guidelines его определяет.
TWO READINGS:
- "Which fields with `enum` `sheriff validate` accepts" (title): two code spans are next to each other, so a reader can take "`enum` `sheriff validate`" as one phrase. The sense is "which fields with `enum` are accepted by `sheriff validate`".
- "its source gives it at least one value": "it" is the field. "its" before "source" is the field's.
- "its field `kinds`": "its" is the extension's (the favoured reading), or the project's.
- "where the field fails the condition on the kind, the kind": the kind named in `x-enumSource.kind`, not the kind of the field.
- "a field whose own `enum` holds a value more than once": "own" excludes values taken from `x-enumSource` (the favoured reading), or only emphasises.
LANGUAGE:
- "Which fields with `enum` `sheriff validate` accepts" → "Fields with `enum` that `sheriff validate` accepts" — two adjacent code spans make the title hard to parse. The meaning is kept.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-ezq8csd433vj6fj — A RecordType that refers to a RecordType outside its part of the system
TRANSLATION: Заголовок: «RecordType, ссылающийся на RecordType вне своей части системы».
Текст: Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` пропускает без сообщения ссылку одного RecordType (§s-7vm323mhry2enx3) на другой только в следующих случаях (§s-8ht2hn88cu2qwz9):
- от RecordType вне секции contracts (§s-z6tq6a3btnvvwx7) к RecordType той же части системы или к фрагменту формата (§s-7vm323mhry2enx3, §s-rpkq8y79fwg5k92);
- от фрагмента формата к другому фрагменту формата (§s-hn9m9dhxaazjn3y).
О каждом RecordType, содержащем любую другую ссылку, `sheriff validate` сообщает, называя по sid и этот RecordType, и тот RecordType, на который он ссылается (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y). Изменение при этом всё равно проходит.
RecordType ссылается на другой RecordType одним из двух способов:
- его `schema` (§s-6eb92ddch7shuvu) содержит на любой глубине `$ref`, указывающий на этот RecordType, или `identifierOf`, называющий его (§s-qpdnkejr5xzc6j3);
- у него есть связь `refines` (§s-sn6au3vcr9uy5pm) с этим RecordType.
Фрагмент формата — это RecordType секции contracts. Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), частью системы, к которой относится RecordType, является домен, чьи файлы содержат этот RecordType. Иначе это секция `specs/base/`, содержащая RecordType, чьё расположение (§s-kag2m9tzdnduxdx) — `base/` и одно число. RecordType в `specs/base/`, которых не содержит ни одна такая секция, считаются вместе образующими одну часть системы.
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или это draft (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).
Причина: RecordType может ссылаться на другой RecordType на любой глубине своей `schema` и через свои связи `refines`. Поэтому только проверка, читающая все эти места, находит каждую ссылку, нарушающую правило о том, на что RecordType может ссылаться (§s-8ht2hn88cu2qwz9).
Пример: В домене `requests` у RecordType запроса есть поле `address` с `$ref` на фрагмент формата `address`. Есть и поле `user`, чей `identifierOf` называет RecordType пользователя в домене `users`. `sheriff validate` сообщает о RecordType запроса, называя по sid и его, и RecordType пользователя, и пропускает изменение. Вероятнее всего ошибиться, оставив ссылку в поле `user` без сообщения на том основании, что это поле содержит только идентификатор. Чтобы хранить идентификатор пользователя без такой ссылки, домен `requests` использует поле типа `string`.
TWO READINGS:
- "naming by its sid both that RecordType and the RecordType that it refers to": "its sid" is each RecordType's own sid (the favoured reading), or one sid for the first RecordType only. The same in the Example ("naming by its sid both it and the RecordType of a user").
- "all of them" (in the Reason: "a check that reads all of them"): the antecedent is not a noun phrase. It is most likely the places where a RecordType can refer to another (the depths of its `schema` and its `refines` links), and not the references or the RecordTypes.
- "whose location is `base/` followed by a single number": "whose" is the section's (the favoured reading), not the RecordType's.
- "to a RecordType of the same part of the system": "the same" as the referring RecordType's part (the favoured reading), but "same" has no earlier antecedent in that bullet.
- "it" in "the RecordType that it refers to": the RecordType that holds the reference.
LANGUAGE:
- "lets a reference … pass without a report" → "accepts a reference … without reporting it" — "pass without a report" is a calque. The meaning is kept.
- "naming by its sid both that RecordType and the RecordType that it refers to" → "naming both that RecordType and the RecordType that it refers to, each by its sid" — "its" has no clear antecedent in the original wording. The same in the Example: "naming by its sid both it and the RecordType of a user".
- "A fragment of a format is a RecordType of the contracts section." → "A fragment of a format is a RecordType in the contracts section." — "of" is a calque of a Russian genitive. Unsure whether "of" is meant to say that the section owns the RecordType.
