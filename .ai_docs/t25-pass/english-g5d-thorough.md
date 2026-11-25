### tools-drafts.json · s-vuujweu57sxsa58 — Reason
TRANSLATION: Узел спецификации, который опирается на то, что утверждает другой домен спецификации, имеет связь, какого бы то ни было типа, с тем узлом этого домена, который это утверждает (§s-hr7j7scmfkkjnws). Поэтому проверка, которая шла бы по связям всех типов, отклоняла бы изменения, в которых домены не используют друг друга.
TWO READINGS:
- "do not use one another": (а) в изменении ни один домен не использует никакой другой; (б) домены не используют друг друга взаимно, то есть A использует B, но B не использует A, и цикла нет. Заголовок узла (про цикл) говорит в пользу (б), но сама фраза читается скорее как (а).
- "the node of that domain that states it": (а) «который это утверждает» относится к узлу; (б) относится к домену. Контекст говорит в пользу (а).
- "has a link": (а) констатация: такая связь всегда есть; (б) требование: связь должна быть. Ссылка на правило говорит в пользу (а).
LANGUAGE:
- "changes in which domains do not use one another" → "changes in which no domains use one another in a cycle" — as written, the sentence denies any use between domains, not only mutual use; I am not sure the replacement is the intended meaning.

### tools-drafts.json · s-gvafe6bnstwab8b — Text
TRANSLATION: `sheriff validate` отклоняет любой другой JSON-файл в `specs/tech/`, где находится техническое приложение (§s-tj38pvm38nepaf5), и называет этот файл. `sheriff validate` отклоняет любой другой раздел ниже первого узла верхнего уровня этого файла, называя раздел по его файлу, его sid и его расположению (§s-kag2m9tzdnduxdx) и приводя его название.
TWO READINGS:
- "which holds the technical appendix (§s-tj38pvm38nepaf5), naming the file": (а) файл называет `sheriff validate`; (б) файл называет техническое приложение, ближайшее существительное перед причастием. Верно (а), но читатель спотыкается.
- "naming it by its file, its sid and its location": (а) "it" — отклонённый раздел; (б) "it" — первый узел верхнего уровня, ближайшее существительное. Контекст говорит в пользу (а).
- "below the file's first top-level node": (а) вложен в этот узел в дереве; (б) расположен в файле после него. Следующий абзац правила говорит в пользу (а).
LANGUAGE:
- "refuses any other JSON file under `specs/tech/`, which holds the technical appendix (§s-tj38pvm38nepaf5), naming the file" → "refuses any other JSON file under `specs/tech/`, which holds the technical appendix (§s-tj38pvm38nepaf5), and names that file" — the participle is separated from its subject by a relative clause and attaches to the wrong noun.

### tools-drafts.json · s-gvafe6bnstwab8b — Reason
TRANSLATION: Раздел этого файла, которому не соответствует ни один раздел домена, содержит имплементацию, которую такой читатель не найдёт.
TWO READINGS:
- "such a reader": (а) тот самый читатель из первых предложений абзаца, который ищет имплементацию правила в файле, названном по домену; (б) любой читатель такого рода. Смысл почти один, вероятнее (а).
LANGUAGE:
- "such a reader" → "that reader" — the reader was already introduced as "a reader" and "the reader"; "such a" suggests a kind of reader that has not been defined.

### tools-drafts.json · s-uxmkwbnpgtjzkgv — Example
TRANSLATION: Одобренное правило в `project.json` уточняет правило об уровне домена и перечисляет `core` и `edge`.
TWO READINGS:
- "the rule on a domain's level": (а) правило об уровне домена, то есть о поле «уровень» в заголовке домена; (б) правило, действующее на уровне домена. Заголовок узла говорит в пользу (а).
LANGUAGE:
- "the rule on a domain's level" → "the rule about a domain's level" — "on ... level" reads first as "at the level of".

### tools-drafts.json · s-3anv9qcmx8pwp2w — Text
TRANSLATION: Цепочка, которая во второй раз достигает идентифицирующего поля одного RecordType, никогда не заканчивается.
TWO READINGS:
- "the identifying field of one RecordType a second time": (а) второй раз приходит к идентифицирующему полю того же RecordType, в котором уже была; (б) приходит к полю какого-то одного, отдельно взятого RecordType. Контекст говорит в пользу (а).
LANGUAGE:
- "of one RecordType a second time" → "of the same RecordType a second time" — "one" in the sense of "the same" is not idiomatic here.

### tools-drafts.json · s-3anv9qcmx8pwp2w — Example
TRANSLATION: Каждый из RecordType `left` и `right` идентифицируется полем, чьё `identifierOf` называет другой RecordType, поэтому цепочки, которые начинаются в этих полях, никогда не заканчиваются.
TWO READINGS: none
LANGUAGE: none

### tools-drafts.json · s-c2r9jndrjbtbsv6 — Text
TRANSLATION: [условие списка] он объявлен в том же разделе базовой спецификации (§s-5x737t9nee4zgaa), что и его RecordType (§s-vtpxwqe7ncmn5bz): […]. Для последнего условия отказ называет также каждый другой вариант RecordType с тем же `answersTo`. Если вариант RecordType не выполняет первое условие, `sheriff validate` проверяет его дальше только по третьему условию, поскольку каждое из остальных условий сравнивает вариант RecordType с его RecordType. Если у RecordType нет `chosenBy`, а те RecordType, у которых `chosenBy` есть и до которых он доходит через наименьшее число связей `refines`, называют в своих `chosenBy` разные поля, `sheriff validate` отклоняет каждый вариант RecordType, который его уточняет, за невыполнение первого условия. Отказ называет каждый из этих RecordType.
TWO READINGS:
- "names each other RecordType variant with the same `answersTo` as well": (а) отказ вдобавок называет все прочие варианты с тем же `answersTo`; (б) "as well" относится к `answersTo`: варианты, у которых тоже такой же `answersTo`. Кроме того, "each other" на мгновение читается как «друг друга». Контекст говорит в пользу (а).
- "each of the remaining conditions": (а) все условия, кроме первого и третьего; (б) все условия, кроме первого, включая третье. Верно может быть только (а), потому что третье условие вариант с его RecordType не сравнивает.
- "refuses each RecordType variant that refines it for failing the first condition": (а) отклоняет каждый такой вариант и указывает причиной первое условие; (б) отклоняет только те из них, которые не выполнили первое условие. Контекст говорит в пользу (а).
- "that refines it": "it" — RecordType без `chosenBy` из начала предложения; между ними стоит множественное "the RecordTypes that have a `chosenBy`", но единственное число снимает сомнение.
- "each of those RecordTypes": (а) те RecordType с `chosenBy`, до которых доходят через наименьшее число связей; (б) отклонённые варианты RecordType, названные последними. Контекст говорит в пользу (а).
LANGUAGE:
- "names each other RecordType variant with the same `answersTo` as well" → "also names every other RecordType variant that has the same `answersTo`" — "each other" reads as the reciprocal pronoun, and the trailing "as well" has two possible attachments.
- "each of the remaining conditions" → "each of the other conditions" — "remaining" after "the first" and "the third" does not say which conditions are left.
- "through the fewest `refines` links name different fields" → "through the fewest `refines` links, name different fields" is not a correct fix (a comma between subject and verb); a native writer would split the sentence, for example "… the RecordTypes with a `chosenBy` that it reaches through the fewest `refines` links may disagree on the fields that their `chosenBy` names. In that case …" — "links name" is first read as a noun phrase. I am not sure the split keeps the meaning exactly.
- "refuses each RecordType variant that refines it for failing the first condition" → "refuses each RecordType variant that refines it, as failing the first condition" — "refuse X for failing Y" presupposes that X failed Y, which is reading (б); I am not sure which is meant.

### tools-drafts.json · s-c2r9jndrjbtbsv6 — Example
TRANSLATION: Другой вариант RecordType `notification` называет в своём `answersTo` значение `sms` для `channel` и объявляет `text`.
TWO READINGS: none
LANGUAGE: none

### tools-drafts.json · s-5nf87c3e3jg9v7c — Example 2
TRANSLATION: У RecordType записи audit log есть поле `part`, чьё `x-enumSource.from` равно `parts`. Этому полю даётся название каждого из этих разделов вместе с sid этого раздела.
TWO READINGS:
- "That field is given the title of each of those sections": (а) значениями поля становятся названия разделов; (б) поле получает название (title) как свой заголовок. Заголовок узла говорит в пользу (а).
- "those sections": разделы «Requests», «Users» и «Contracts» из первого предложения примера; в самом переданном предложении они не названы.
LANGUAGE:
- "is given the title of each of those sections, together with the sid of that section" → "takes as its values the title of each of those sections, each with that section's sid" — "is given the title" reads as "is titled"; I am not sure that "takes as its values" is exactly what is meant.

### tools-drafts.json · new:tools-7-1-enum-values — Reason
TRANSLATION: Поэтому поле без значений или со значениями, которые нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), передало бы эту ошибку в сгенерированный код.
TWO READINGS:
- "the mistake": никакая ошибка раньше не названа. Скорее всего, имеется в виду само отсутствие значений или нарушение правил об источнике.
- "the rules on their source": (а) правила об источнике значений; (б) правила, записанные в их источнике. Контекст говорит в пользу (а).
LANGUAGE:
- "would therefore pass the mistake on to the generated code" → "would therefore pass that mistake on to the generated code" — the definite article points to a mistake that has not been named; "that" ties it to the two cases just listed.
- "the rules on their source" → "the rules about their source" — "on" allows the reading "located at".

### tools-drafts.json · new:tools-7-1-enum-values — Example
TRANSLATION: У RecordType записи журнала задач есть поле `step`, чьё `x-enumSource.from` равно `kind`, а `x-enumSource.kind` равно `TextRule`.
TWO READINGS: none
LANGUAGE: none

### tools-drafts.json · s-ezq8csd433vj6fj — Text
TRANSLATION: Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` не сообщает о ссылке из одного RecordType (§s-7vm323mhry2enx3) на другой только в следующих случаях (§s-8ht2hn88cu2qwz9):
TWO READINGS:
- "leaves unreported a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases": (а) во всех остальных случаях о ссылке сообщается; (б) в этих случаях молчание разрешено, а про остальные ничего не сказано. Следующий абзац правила подтверждает (а).
LANGUAGE:
- "leaves unreported a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases" → "reports every reference from one RecordType (§s-7vm323mhry2enx3) to another, except in the following cases" — the verb-object inversion and the negative verb with "only" make the reader work out a double negation.

### tools-drafts.json · s-ezq8csd433vj6fj — Example
TRANSLATION: В домене `requests` у RecordType заявки есть поле `deliveryAddress` с `$ref` на `address`, фрагмент формата. `sheriff validate` сообщает об этом RecordType, называя его и RecordType пользователя, каждый по его sid, и пропускает изменение. Поле `user`, которое хранит идентификатор пользователя без такой ссылки, имеет тип `string` и не имеет `identifierOf`.
TWO READINGS:
- "reports that RecordType": (а) RecordType заявки; (б) RecordType пользователя, названный последним в предыдущем предложении примера. Продолжение "naming it and the RecordType of a user" подтверждает (а).
- "without such a reference": ссылка поля `user` на RecordType пользователя через `identifierOf`. Она названа в предыдущем предложении примера словом "the reference", так что отсылка понятна.
- "has the type `string` and no `identifierOf`": (а) описание того, как выглядит поле без ссылки; (б) указание, как такое поле следует записывать. Вероятнее (а). При этом неясно, зачем предложение стоит после фразы о самой вероятной ошибке: оно читается как совет, а не как часть примера.
- "A field `user`": (а) другое, гипотетическое поле с тем же именем; (б) то же поле `user` из примера. Неопределённый артикль говорит в пользу (а).
LANGUAGE:
- "A field `user` that stores a user's identifier without such a reference has the type `string` and no `identifierOf`." → "A field `user` that only stores a user's identifier, and is not such a reference, has the type `string` and no `identifierOf`." — "stores … without such a reference" leaves unclear what lacks the reference, the field or the identifier; I am not sure the replacement keeps the meaning.

Files read: D:\SpecSheriff\.ai_docs\t25-pass\english-group5d.md, D:\SpecSheriff\.ai_docs\t25-pass\tools-drafts.json (English fields of the nodes named above), C:\Users\PC\.claude\skills\vt\terms-ru.md.
