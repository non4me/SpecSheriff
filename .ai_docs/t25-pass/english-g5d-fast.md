### english-group5d.md · s-vuujweu57sxsa58 — Domains that use one another in a cycle, Reason
TRANSLATION: Узел, который опирается на то, что утверждает другой домен, имеет связь любого типа с тем узлом этого домена, который это утверждает (§s-hr7j7scmfkkjnws). Поэтому проверка, которая шла бы по связям всех типов, отклоняла бы изменения, в которых домены вообще не используют друг друга.
TWO READINGS:
- "of whatever type": (а) связь любого типа, какой выбрал автор узла; (б) связь любого типа допустима, и тип не говорит о том, что узел опирается на другой. Контекст («links of every type» в следующем предложении) поддерживает (б).
- "in which domains do not use one another": (а) домены вообще не используют друг друга; (б) домены не используют друг друга по циклу (как в заголовке). Предложение читается как (а), хотя имеется в виду, скорее всего, (б).
LANGUAGE:
- "refuse changes in which domains do not use one another" → "refuse changes in which domains do not use one another in a cycle" — в заголовке есть "in a cycle", а здесь нет. Без него фраза говорит об отсутствии любого использования. Замена сохраняет смысл, если имелся в виду цикл.

### english-group5d.md · s-gvafe6bnstwab8b — Sections of the technical appendix matched to the domains, Text
TRANSLATION: `sheriff validate` отклоняет любой другой JSON-файл в `specs/tech/`, где лежит техническое приложение (§s-tj38pvm38nepaf5), и называет этот файл. `sheriff validate` отклоняет любую другую секцию ниже первого узла верхнего уровня в файле, называя её по файлу, sid и расположению (§s-kag2m9tzdnduxdx) и указывая её заголовок.
TWO READINGS:
- "any other JSON file": «другой» по отношению к чему, в этом отрывке не сказано. Скорее всего, это любой файл, кроме файлов, сопоставленных доменам.
- "which holds the technical appendix": (а) `specs/tech/` содержит техническое приложение; (б) этот JSON-файл содержит его. Контекст поддерживает (а).
- "the file's first top-level node": «the file» нигде в отрывке не назван. Скорее всего, это файл технического приложения, сопоставленный домену.
- "any other section": «другая» по отношению к секциям, сопоставленным секциям домена (из заголовка). В отрывке это не сказано.
- "naming it by its file, its sid and its location": «it» — секция. «its file» читается как файл этой секции.
- "giving its title": «its» — заголовок секции.
LANGUAGE:
- "naming it by its file, its sid and its location" → "identifying it by its file, its sid and its location" — "name … by" так не говорят. Здесь перечислены три способа указать секцию. Замена сохраняет смысл.

### english-group5d.md · s-gvafe6bnstwab8b — Sections of the technical appendix matched to the domains, Reason
TRANSLATION: Секция этого файла, которая не соответствует ни одной секции домена, содержит реализацию, которую такой читатель не найдёт.
TWO READINGS:
- "that file": в отрывке не названо, какой именно файл. Скорее всего, файл технического приложения из пункта Text.
- "the domain": какой домен, не сказано. Скорее всего, домен, которому сопоставлен файл.
- "such a reader": читатель не назван ни в этом абзаце, ни в предыдущем. Скорее всего, это читатель или инструмент, который ищет реализацию по секциям домена.
LANGUAGE:
- "such a reader" → no safe replacement — «such» ссылается на то, чего в тексте нет. Нужно назвать читателя, например "a reader that looks up an implementation by the domain's sections". Совпадает ли это с замыслом, неизвестно.

### english-group5d.md · s-uxmkwbnpgtjzkgv — The level in a domain's header, Example
TRANSLATION: Одобренное правило в `project.json` уточняет правило об уровне домена и перечисляет `core` и `edge`.
TWO READINGS:
- "lists `core` and `edge`": (а) перечисляет уровни доменов; (б) перечисляет что-то другое, например домены. Контекст («level») поддерживает (а), но из самого предложения это не следует.
- "the rule on a domain's level": какое именно правило, не названо. Скорее всего, правило из guidelines об уровне домена.
LANGUAGE:
- "lists `core` and `edge`" → "lists `core` and `edge` as the levels" — без дополнения не видно, что это за значения.
- "the rule on a domain's level" → "the rule on the level of a domain" — "on a domain's level" можно прочитать как "на уровне домена", то есть правило действует на этом уровне. Замена с "about" сохраняет смысл, если автор имел в виду правило об уровне.

### english-group5d.md · s-3anv9qcmx8pwp2w — An identifier followed to its end, Text
TRANSLATION: Цепочка, которая во второй раз доходит до идентифицирующего поля одного RecordType, никогда не заканчивается.
TWO READINGS:
- "one RecordType": (а) одного и того же RecordType, который цепочка уже проходила; (б) какого-либо одного RecordType. Контекст поддерживает (а).
- "never ends": (а) цепочка бесконечна, то есть цикл; (б) проверка на ней не завершается. Контекст поддерживает (а).
LANGUAGE:
- "the identifying field of one RecordType a second time" → "the identifying field of the same RecordType a second time" — "one" здесь читается как числительное, а не как "тот же самый". Замена сохраняет смысл (a).

### english-group5d.md · s-3anv9qcmx8pwp2w — An identifier followed to its end, Example
TRANSLATION: Каждый из RecordType `left` и `right` идентифицируется полем, у которого `identifierOf` называет другой RecordType, поэтому цепочки, начинающиеся с этих полей, никогда не заканчиваются.
TWO READINGS:
- "are each identified by a field": (а) у каждого есть своё идентифицирующее поле; (б) каждый идентифицируется некоторым полем (возможно, общим). Контекст поддерживает (а).
LANGUAGE:
- none

### english-group5d.md · s-c2r9jndrjbtbsv6 — What a RecordType variant must agree with, Text
TRANSLATION:
- Оно объявлено в той же секции базовой спецификации (§s-5x737t9nee4zgaa), что и его RecordType (§s-vtpxwqe7ncmn5bz):
- По последнему условию отказ называет также каждый другой вариант RecordType с тем же `answersTo`.
- Если вариант RecordType не выполняет первое условие, `sheriff validate` проверяет его дальше только по третьему условию, так как каждое из остальных условий сравнивает вариант RecordType с его RecordType.
- Если у RecordType нет `chosenBy`, а RecordType, у которых `chosenBy` есть и до которых он доходит через наименьшее число связей `refines`, называют в своих `chosenBy` разные поля, `sheriff validate` отклоняет каждый вариант RecordType, который его уточняет, за невыполнение первого условия.
- Отказ называет каждый из этих RecordType.
TWO READINGS:
- "it is declared": «it» — вариант RecordType. Подлежащее вынесено в предыдущее предложение, которого в отрывке нет.
- "For the last condition": какое условие последнее, неясно. Третье ли оно, из отрывка не видно.
- "each other RecordType variant with the same `answersTo` as well": (а) отказ называет и отклонённый вариант, и каждый другой вариант с тем же `answersTo`; (б) "as well" относится к "with the same `answersTo`", то есть варианты, у которых то же самое и по другому признаку. Контекст поддерживает (а). "The same" — тот же, что у отклонённого варианта.
- "checks it further only against the third condition": (а) кроме первого условия проверяет только по третьему; (б) после провала первого проверка идёт только по третьему и на этом заканчивается. Практически это одно и то же. Но "further" можно прочитать и как "дальше по списку".
- "the remaining conditions": остальные после первого и третьего. Если последнее условие — не третье, то вторым и последним, и тогда "the last condition" в предыдущем пункте совпадает с одним из них.
- "that it reaches": «it» — RecordType без `chosenBy`. "reaches" — по каким связям: по тем, где этот RecordType уточняет другие (вверх по `refines`). В тексте направление не названо.
- "the RecordTypes … name different fields": (а) «и» входит в условие "Where", и оба условия должны выполняться вместе; (б) «и» продолжает перечень уточнений. Контекст поддерживает (а).
- "that refines it": «it» — RecordType без `chosenBy`, а не RecordType, у которого он есть.
- "for failing the first condition": (а) вариант не выполняет первое условие; (б) RecordType не выполняет его. Ближайшее существительное — «it» (RecordType), но по смыслу правила проваливает условие вариант: (а).
- "those RecordTypes": (а) только RecordType с `chosenBy`, называющие разные поля; (б) вместе с RecordType без `chosenBy`. Контекст поддерживает (а).
LANGUAGE:
- "checks it further only against the third condition" → "checks it against no condition other than the third" — "further only" двусмысленно по расположению. Замена сохраняет смысл (а) выше, но если автор имел в виду (б), уверенности нет.
- "refuses each RecordType variant that refines it for failing the first condition" → "refuses each RecordType variant that refines it, because the variant fails the first condition" — "for failing" без подлежащего: ближайшим подлежащим выглядит "it" (RecordType). Замена сохраняет смысл (а).
- "each other RecordType variant with the same `answersTo` as well" → "also names each other RecordType variant that has the same `answersTo`" — "as well" в конце фразы после определения тянется не к тому слову. Замена сохраняет смысл (а).

### english-group5d.md · s-c2r9jndrjbtbsv6 — What a RecordType variant must agree with, Example
TRANSLATION: Другой вариант RecordType для `notification` называет `sms` для `channel` в своём `answersTo` и объявляет `text`.
TWO READINGS:
- "declares `text`": (а) объявляет поле `text`; (б) объявляет значение или тип `text`. Контекст поддерживает (а).
LANGUAGE:
- "names `sms` for `channel` in its `answersTo`" → "gives `sms` as the value of `channel` in its `answersTo`" — "names X for Y" так не говорят. Здесь `sms` — значение поля `channel`. Замена сохраняет смысл, если именно это имелось в виду.

### english-group5d.md · s-5nf87c3e3jg9v7c — Where the values of a field with `enum` are collected from, Example 2
TRANSLATION: У RecordType записи в audit log есть поле `part`, у которого `x-enumSource.from` равно `parts`. Это поле получает заголовок каждой из этих секций вместе с sid этой секции.
TWO READINGS:
- "those sections": в отрывке секции не названы, назван только `parts`. Скорее всего, секции, на которые указывает `parts` (по ним собираются значения).
- "That field is given the title of each of those sections, together with the sid of that section": (а) значения поля составлены из заголовка и sid каждой секции, по одному значению на секцию; (б) поле получает заголовки как значения, а sid отдельно. Контекст поддерживает (а).
- "That field is given": (а) значения поля берутся из секций; (б) поле получает заголовки как некое свойство. Контекст поддерживает (а).
LANGUAGE:
- "That field is given the title of each of those sections, together with the sid of that section" → "The values of that field are the titles of those sections, each together with the sid of its section" — "a field is given a title" читается как присвоение названия полю, а не как набор значений. Замена сохраняет смысл (а).

### english-group5d.md · new:tools-7-1-enum-values — Fields with `enum` that `sheriff validate` accepts, Reason
TRANSLATION: Поле без значений или со значениями, которые нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), поэтому передало бы ошибку в сгенерированный код.
TWO READINGS:
- "therefore": следствие из предыдущего предложения, которого в отрывке нет. Скорее всего, из того, что `sheriff validate` такое поле принимает.
- "would": (а) условное: если бы проверка пропускала такое поле; (б) модальное «могло бы». Контекст поддерживает (а).
- "the mistake": ошибка не названа ранее в предложении. Скорее всего, это отсутствие значений или нарушение правил, то есть ошибка в поле.
- "their source": источник значений, а не поля. Контекст поддерживает такое чтение.
LANGUAGE:
- "break the rules on their source" → "violate the rules about their source" — "break the rules" обычно о людях и нормах, "violate" подходит для правил спецификации; "rules on" лучше "rules about". Замена сохраняет смысл.

### english-group5d.md · new:tools-7-1-enum-values — Fields with `enum` that `sheriff validate` accepts, Example
TRANSLATION: У RecordType записи в журнале задач есть поле `step`, у которого `x-enumSource.from` равно `kind`, а `x-enumSource.kind` равно `TextRule`.
TWO READINGS: none
LANGUAGE: none

### english-group5d.md · s-ezq8csd433vj6fj — A RecordType that refers to a RecordType outside its part of the system, Text
TRANSLATION: Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` не сообщает о ссылке одного RecordType (§s-7vm323mhry2enx3) на другой только в следующих случаях (§s-8ht2hn88cu2qwz9):
TWO READINGS:
- "leaves unreported … only in the following cases": (а) не сообщает о ссылке только в этих случаях, а во всех остальных сообщает; (б) сообщает не обо всех, а только об этих случаях. Контекст поддерживает (а).
- "to another": «another» — другой RecordType, существительное опущено.
- "the RecordType extension": (а) расширение guidelines, добавляющее RecordType; (б) расширение самих RecordType. Контекст поддерживает (а).
LANGUAGE:
- "leaves unreported a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases" → "does not report a reference from one RecordType (§s-7vm323mhry2enx3) to another RecordType, except in the following cases" — длинная именная группа между глаголом и "unreported", а "only" стоит так, что его область неясна. Замена передаёт чтение (а). Если автор имел в виду (б), смысл другой.

### english-group5d.md · s-ezq8csd433vj6fj — A RecordType that refers to a RecordType outside its part of the system, Example
TRANSLATION: В домене `requests` у RecordType запроса есть поле `deliveryAddress` с `$ref` на `address` — фрагмент формата. `sheriff validate` сообщает об этом RecordType, называя его и RecordType пользователя, каждый по sid, и пропускает изменение. Поле `user`, которое хранит идентификатор пользователя без такой ссылки, имеет тип `string` и не имеет `identifierOf`.
TWO READINGS:
- "a fragment of a format": (а) поясняет `address`; (б) поясняет `$ref`. Контекст поддерживает (а).
- "that RecordType": (а) RecordType запроса; (б) `address`. Скорее всего, (а). Но в предыдущем предложении ссылка идёт на `address`, а в этом называется RecordType пользователя, которого до этого в отрывке нет.
- "the RecordType of a user": в отрывке не представлен. Непонятно, как связана ссылка на `address` с RecordType пользователя.
- "reports that RecordType": (а) сообщает о ссылке, найденной в этом RecordType; (б) сообщает о самом RecordType как о проблеме. Контекст поддерживает (а).
- "the change": какое изменение, не сказано. Скорее всего, то, которое проверяется.
- "without such a reference": (а) без ссылки `$ref` на RecordType пользователя; (б) без любой ссылки. "such" указывает на то, чего ближе всего нет в тексте. Скорее всего, (а).
LANGUAGE:
- "reports that RecordType, naming it and the RecordType of a user" → "reports the reference in that RecordType, naming it and the RecordType of a user" — по тексту "reports that RecordType" читается как сообщение о самом RecordType. Замена верна, если по смыслу сообщается о ссылке. В правиле выше сообщается именно о ссылке.
- "without such a reference" → "without a `$ref` to the RecordType of a user" — "such" не имеет ясной отсылки. Замена верна только при чтении (а).
