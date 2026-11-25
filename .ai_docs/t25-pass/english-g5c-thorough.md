### D:\SpecSheriff\.ai_docs\t25-pass\english-group5c.md · s-vuujweu57sxsa58 — Domains that use one another in a cycle

TRANSLATION:
**Заголовок:** Домены спецификации, которые используют друг друга по кругу.
**Текст:** Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` отклоняет изменение, после которого домены используют друг друга по кругу (§s-bncp7gtyaukur8e). В отказе названы домены одного такого круга, в том порядке, в котором каждый использует следующий.
Один домен использует другой, если у заголовка домена первого (§s-yggv9myedprnaa7) есть связь `consumes` с разделом второго. Домены используют друг друга по кругу, если цепочка доменов, каждый из которых использует следующий, приводит обратно к домену, с которого она начинается.
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или является черновиком (§s-bncp7gtyaukur8e).
**Причина:** Только связи `consumes` в заголовках доменов говорят, какой домен какой использует (§s-yggv9myedprnaa7). Узел, который опирается на то, что утверждает другой домен, связан с тем узлом этого домена, который это утверждает, связью любого типа (§s-hr7j7scmfkkjnws). Поэтому проверка, которая шла бы по связям всех типов, отклоняла бы домены, которые друг друга не используют.
**Пример:** У заголовка домена `requests` есть связь `consumes` с разделом домена `users`. У заголовка `users` есть такая же связь с разделом `requests`. `sheriff validate` отклоняет изменение и называет `requests` и `users`. В другом проекте связь `consumes` с разделом `users` есть только у заголовка `requests`, а правило из `users` цитирует правило из `requests`. Там `sheriff validate` принимает изменение. Самая вероятная ошибка — счесть эту цитату использованием `requests` доменом `users`.

TWO READINGS:
- "by a link of any type": (а) тип связи может быть любым — какой выберет автор; (б) связь каждого типа годится и встречается. Контекст поддерживает (а). Кроме того, оборот стоит в конце и может читаться как относящийся к "states it" («утверждает это связью»), а не к "links".
- "the node of that domain that states it": "it" = «то, что утверждает другой домен» ("what another domain states"); второе "that" может относиться к "node" (узел утверждает) или к "domain" (домен утверждает). Контекст поддерживает «узел».
- "the domain that it starts from": "it" = цепочка (скорее всего) или домен.
- "There `sheriff validate` accepts the change": во втором проекте никакое изменение не названо; "the change" скорее всего означает «изменение, которое вводит описанные связи».

LANGUAGE:
- "A node that relies on what another domain states links to the node" → "A node that relies on what another domain states has a link to the node" — "states links" читается на первом проходе как глагол с дополнением («утверждает связи»).
- "would refuse domains that do not use one another" → "would refuse a change in which the domains do not use one another" — в остальном тексте отклоняют изменение, а не домены; не уверен, что замена точно передаёт задуманное.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5c.md · s-gvafe6bnstwab8b — Sections of the technical appendix matched to the domains

TRANSLATION:
**Заголовок:** Разделы технического приложения, сопоставленные с доменами спецификации.
**Текст:** Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает JSON-файл в `specs/tech/`, только если это один из следующих (§s-zefk589ykh37b8u, §s-vghy37e3p2325ah):
- `specs/tech/stack.json` или `specs/tech/debt.json`;
- файл, названный по домену, `specs/tech/<domain>.json`, где `<domain>` — имя домена.

Любой другой файл технического приложения (§s-tj38pvm38nepaf5) `sheriff validate` отклоняет и называет этот файл.
В файле, названном по домену, `sheriff validate` принимает каждый раздел ниже первого узла верхнего уровня этого файла, только если заголовки, ведущие к этому разделу, ведут также к разделу этого домена (§s-vghy37e3p2325ah). Заголовки, ведущие к разделу, — это заголовки разделов, которые его содержат, сверху вниз, а за ними заголовок самого раздела. Любой другой раздел файла `sheriff validate` отклоняет: называет его по файлу, sid и расположению (§s-kag2m9tzdnduxdx) и называет его заголовок.
Первый узел верхнего уровня в файле, названном по домену, представляет сам домен, поэтому заголовки, ведущие к разделу этого файла, начинаются ниже этого узла. Каждый следующий узел верхнего уровня считается узлом под первым, как при вычислении расположений (§s-ygg5kpcxgzq3m7w). В домене заголовки, ведущие к разделу, начинаются с заголовка раздела, который является узлом верхнего уровня одного из файлов домена или дочерним узлом заголовка домена (§s-yggv9myedprnaa7).
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или является черновиком (§s-vghy37e3p2325ah).
**Причина:** Чтобы узнать, как имплементировано правило домена, читатель смотрит в файл технического приложения, названный по этому домену. Там он идёт по тем же заголовкам, которые ведут к правилу в домене (§s-vj7ercem526zd6v). Раздел этого файла, которому не соответствует ни один раздел домена, содержит имплементацию, которую такой читатель не находит.
**Пример:** В домене `requests` есть раздел с заголовком «Intake», а в нём раздел с заголовком «Validation». В `specs/tech/requests.json` первый узел верхнего уровня содержит раздел «Intake», а тот — раздел «Validation», и `sheriff validate` принимает оба. Ещё один раздел «Validation» находится непосредственно под первым узлом верхнего уровня файла, и `sheriff validate` его отклоняет. Самая вероятная ошибка — принять этот раздел, потому что в домене есть раздел «Validation», хотя в домене этот раздел находится под «Intake».

TWO READINGS:
- "any other file of the technical appendix": (а) любой другой JSON-файл в `specs/tech/`; (б) любой другой файл технического приложения, в том числе не JSON. Первое предложение говорит только о JSON-файлах, так что контекст скорее за (а), но слова другие.
- "each section below the file's first top-level node": (а) на любой глубине под этим узлом; (б) только непосредственно под ним. Пример поддерживает (а).
- "any other section of the file": (а) любой раздел под первым узлом, не прошедший условие; (б) любой раздел файла вообще, включая сам первый узел верхнего уровня и следующие узлы верхнего уровня, если они разделы. Контекст скорее за (а).
- "is treated as a node under the first": (а) как дочерний узел первого; (б) как узел где-то под первым. Ссылка на вычисление расположений поддерживает (а).
- "a section that is a top-level node of one of the domain's files or a child of the domain's header": (а) раздел, который является узлом верхнего уровня либо дочерним узлом заголовка; (б) заголовки начинаются с заголовка раздела либо с дочернего узла заголовка. Контекст поддерживает (а).
- "start below that node": (а) заголовок этого узла в цепочку не входит; (б) цепочка начинается с непосредственных дочерних узлов. Практически совпадают, но (а) прямо не сказано.

LANGUAGE:
- "holds an implementation that such a reader does not find" → "holds an implementation that such a reader will not find" — речь о следствии, а не о привычном действии; настоящее время читается как констатация факта.
- "naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming its title" → "naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and giving its title" — повтор "naming … and naming" в двух разных смыслах («обозначить» и «сообщить»).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5c.md · s-uxmkwbnpgtjzkgv — The level in a domain's header

TRANSLATION:
**Заголовок:** Уровень в заголовке домена.
**Текст:** Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает заголовок домена (§s-yggv9myedprnaa7), содержащий уровень, только если собственные guidelines проекта (§s-u7tw6m8npxmv5tu) перечисляют этот уровень (§s-nkyty4dy9x2v2a4, §s-j3v4y4d3sbmdgfp). Заголовок содержит уровень как значение своего свойства `level`.
Любой другой заголовок, содержащий уровень, `sheriff validate` отклоняет: называет заголовок по файлу, sid и расположению (§s-kag2m9tzdnduxdx) и называет уровень. Заголовок без уровня эту проверку проходит.
Как и любой список в собственных guidelines проекта, уровни инструменты SpecSheriff читают в последней одобренной формулировке (§s-a8fn72xa782wvbk) каждого правила, которое их перечисляет (§s-t9j29hppag2nren). Поэтому уровень, который добавляет только черновая формулировка, принимается лишь после одобрения этой формулировки.
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или является черновиком (§s-j3v4y4d3sbmdgfp).
**Причина:** Диаграмма доменов помещает каждый домен в строку его уровня (§s-4azsb49pj6sech8). Порядок уровней в списке уровней задаёт порядок строк (§s-nkyty4dy9x2v2a4). Поэтому у уровня вне этого списка строки нет.
**Пример:** Одобренное правило в `project.json` уточняет правило об уровне домена и перечисляет `core` и `edge`. `sheriff validate` принимает каждый заголовок, содержащий `core` или `edge`, и каждый заголовок без уровня. Участник команды добавляет `platform` в список этого правила, и правило становится черновиком. Пока новая формулировка не одобрена, `sheriff validate` отклоняет каждый заголовок, содержащий `platform`, и называет `platform`. Самая вероятная ошибка — взять список из черновой формулировки.

TWO READINGS:
- "As with every list in the project's own guidelines": (а) так же, как инструменты поступают с любым списком в собственных guidelines; (б) «вместе с каждым списком». Контекст поддерживает (а).
- "the last approved wording": (а) самая недавняя одобренная формулировка; (б) окончательная одобренная формулировка. Контекст поддерживает (а).
- "refuses any other header that contains a level, naming the header … and naming the level": «называет уровень» — (а) уровень, которого нет в списке; (б) уровень заголовка вообще. Совпадают по факту, различие только в подаче.

LANGUAGE:
- "An approved rule of `project.json`" → "An approved rule in `project.json`" — правило находится в файле, а не принадлежит ему.
- "the last approved wording" → "the most recently approved wording" — снимает прочтение «окончательная».

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5c.md · s-3anv9qcmx8pwp2w — An identifier followed to its end

TRANSLATION:
**Заголовок:** Идентификатор, прослеженный до его конца.
**Текст:** Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает поле с `identifierOf` (§s-qpdnkejr5xzc6j3), только если выполняются оба условия:
- его `identifierOf` называет RecordType (§s-7vm323mhry2enx3), который в своём `identifiedBy` называет одно из своих полей полем, идентифицирующим его записи данных (§s-6eb92ddch7shuvu);
- цепочка идентификаторов, начинающаяся с этого поля, заканчивается полем без `identifierOf` (§s-cqys6wqrnfzu5ac).

Любое другое поле с `identifierOf` `sheriff validate` отклоняет и называет RecordType, содержащий это поле, по файлу, sid и расположению (§s-kag2m9tzdnduxdx). В отказе названы также поле и каждое условие, которое поле не выполняет. Поле названо указателем JSON Pointer на схему поля внутри `schema` этого RecordType, например `/properties/accounts/items`.
Цепочка идентификаторов, начинающаяся с поля, идёт к полю, которое идентифицирует записи данных того RecordType, который назван в `identifierOf` исходного поля. Если у того поля тоже есть `identifierOf`, цепочка продолжается так же. Цепочка, которая второй раз приходит к идентифицирующему полю одного и того же RecordType, никогда не заканчивается.
Поля RecordType здесь — те, которые он объявляет в своём `schema` (§s-6eb92ddch7shuvu), и те, которые он берёт через `refines` (§s-sn6au3vcr9uy5pm) у другого RecordType. `sheriff validate` выполняет эту проверку везде, где `schema` какого-либо RecordType содержит `identifierOf`, на любой глубине, например в схеме элементов списка.
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или является черновиком (§s-qpdnkejr5xzc6j3, §s-cqys6wqrnfzu5ac).
**Причина:** Поле с `identifierOf` берёт свой тип у поля в конце своей цепочки идентификаторов (§s-6eb92ddch7shuvu, §s-cqys6wqrnfzu5ac). Поэтому типы и RuntimeChecks, сгенерированные из RecordType, содержащего это поле (§s-e877bnfa559tvk9), могут дать полю тип, только если у цепочки есть конец.
**Пример:** У RecordType `statement` есть поле `accountId`, чей `identifierOf` называет RecordType `account`. `identifiedBy` у RecordType `account` называет его поле `number` типа `string`. Цепочка, начинающаяся с `accountId`, заканчивается на `number`, и `sheriff validate` принимает поле. RecordType `left` и `right` идентифицируются каждый полем, чей `identifierOf` называет другой RecordType, поэтому цепочки, начинающиеся с этих полей, никогда не заканчиваются. `sheriff validate` отклоняет оба поля. Самая вероятная ошибка — пройти только первый шаг каждой цепочки и поэтому принять оба поля.

TWO READINGS:
- "An identifier followed to its end": "its end" — (а) конец цепочки идентификаторов (так по тексту); (б) конец самого идентификатора. Сам заголовок цепочку не называет.
- "the RecordType that the field's `identifierOf` names": "the field's" — (а) поля, с которого начинается цепочка; (б) только что названного идентифицирующего поля ("the field that identifies…"). Контекст поддерживает (а).
- "Where that field has `identifierOf` too": "that field" — скорее всего идентифицирующее поле, к которому пришла цепочка, но в предыдущем предложении названы два поля.
- "A RecordType's fields here": "here" — (а) в этой проверке или этом узле; (б) в этом абзаце. Скорее всего (а).
- "whose `identifierOf` names the other": "the other" — другой RecordType (скорее всего) или другое поле.

LANGUAGE:
- "ends in a field without `identifierOf`" → "ends at a field without `identifierOf`" — в примере того же узла стоит "ends at `number`"; "ends in" читается скорее как «заканчивается чем-то (результатом)».
- "A chain that goes to the identifying field of the same RecordType a second time" → "A chain that reaches the identifying field of one RecordType a second time" — "the same RecordType" не имеет, с чем сравниваться: ранее в предложении RecordType не назван; не уверен, что замена полностью сохраняет смысл.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5c.md · s-c2r9jndrjbtbsv6 — What a RecordType variant must agree with

TRANSLATION:
**Заголовок:** С чем должен согласовываться RecordType variant.
**Текст:** Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` сверяет каждый RecordType variant (§s-z3dnru6qqdf9m6j) с его RecordType (§s-7vm323mhry2enx3).
`sheriff validate` считает RecordType variant каждый RecordType, который в своём `answersTo` называет значения, которым он соответствует. RecordType данного RecordType variant — это тот RecordType, у которого есть поля, выбирающие вариант, и с которым RecordType variant связан связью `refines` (§s-sn6au3vcr9uy5pm). Поля, выбирающие вариант RecordType, — те, которые этот RecordType называет в своём `chosenBy`. Если `chosenBy` у него нет, это поля, названные в `chosenBy` того RecordType, у которого `chosenBy` есть и до которого он доходит через наименьшее число связей `refines`.
Поля, которые объявляет RecordType, — это свойства его `schema` (§s-6eb92ddch7shuvu). Имена полей сравниваются посимвольно. Если RecordType не содержится ни в одном разделе, его ближайшим разделом считается та часть спецификации, которую называет его расположение (§s-kag2m9tzdnduxdx).
`sheriff validate` принимает RecordType variant, только если выполняются все условия:
- у него есть связь `refines` ровно с одним RecordType, у которого есть поля, выбирающие вариант (§s-bmyzn6zuds6czqm);
- он объявлен в том же разделе базовой спецификации, что и его RecordType (§s-vtpxwqe7ncmn5bz): ближайший раздел, содержащий RecordType variant, — это ближайший раздел, содержащий его RecordType;
- он объявляет хотя бы одно поле (§s-47q37qk27yvt3pa);
- имя каждого поля, которое он объявляет, отличается от имени любого поля, которое его RecordType объявляет или берёт через `refines` у другого RecordType (§s-hrguxwcsdm57vxf);
- поля, которые называет его `answersTo`, — в точности поля, выбирающие вариант его RecordType (§s-swturmy7hmhfvt4);
- каждое значение, которое его `answersTo` называет для поля, — одно из значений этого поля, как их собирают инструменты SpecSheriff (§s-5nf87c3e3jg9v7c, §s-27aycne77epeaq6);
- его `answersTo` отличается от `answersTo` любого другого RecordType variant того же RecordType (§s-5z8vjzmc3s983gk).

Любой другой RecordType variant `sheriff validate` отклоняет и называет его по файлу, sid и расположению (§s-kag2m9tzdnduxdx). В отказе сказано также, какие из условий выше RecordType variant не выполняет. Для последнего условия отказ называет ещё и каждый другой RecordType variant с тем же `answersTo`.
Когда `sheriff validate` проверяет файлы по схеме спецификации, он отклоняет RecordType variant, чей `answersTo` даёт полю больше одного значения (§s-xzcw3hv4hmxz7h7, §s-swturmy7hmhfvt4).
Если RecordType variant не выполняет первое условие, `sheriff validate` проверяет его дальше только по третьему, потому что каждое из остальных условий сравнивает RecordType variant с его RecordType.
Если у RecordType нет `chosenBy`, а два RecordType, у которых `chosenBy` есть и до которых он доходит через наименьшее число связей `refines`, называют в своих `chosenBy` разные поля, `sheriff validate` отклоняет по первому условию каждый RecordType variant, который его уточняет. В отказе названы оба этих RecordType.
`sheriff validate` выполняет эти проверки независимо от того, одобрена спецификация или является черновиком (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk).
**Причина:** Запись данных содержит поля своего RecordType вместе с полями того RecordType variant, который соответствует значениям этой записи данных (§s-z3dnru6qqdf9m6j). Только если каждый RecordType variant согласуется со своим RecordType, у каждой записи данных есть один набор полей, который могут описать типы и RuntimeChecks, сгенерированные из RecordType (§s-e877bnfa559tvk9).
**Пример:** RecordType `notification` называет `channel` в своём `chosenBy`, а значения `channel` — `email` и `app`. Он уточняет `message`, фрагмент формата, объявляющий поле `text`. RecordType variant в том же разделе, что и `notification`, уточняет `notification`, называет в своём `answersTo` значение `email` для `channel` и объявляет `address`, и `sheriff validate` его принимает. Другой RecordType variant от `notification` называет для `channel` значение `sms` и объявляет `text`. `sheriff validate` его отклоняет, потому что `sms` не является значением `channel`, а `text` `notification` берёт у `message`. Самая вероятная ошибка — сравнивать имена полей RecordType variant только с теми, которые `notification` объявляет в собственном `schema`, из-за чего `text` упускается.

TWO READINGS:
- "the values that it corresponds to": "it" — RecordType (скорее всего); какие значения (значения полей, выбирающих вариант) здесь не сказано.
- "the RecordType that has fields that select a variant": (а) RecordType с собственным `chosenBy`; (б) также RecordType без `chosenBy`, у которого такие поля есть по следующему определению (через `refines`). Определение ниже делает верным (б), но при первом чтении понимается (а).
- "Where it has no `chosenBy`": "it" — RecordType из предыдущего предложения; "and that it reaches" — тот же RecordType. Читается, но три местоимения подряд относятся к разным RecordType.
- "the part of the specification that its location names … is treated as its nearest section": "its" оба раза — RecordType (скорее всего); второе может читаться как «ближайший раздел этой части».
- "checks it further only against the third, since each of the remaining conditions compares": "the remaining conditions" — (а) все, кроме первого и третьего; (б) все после третьего. Контекст поддерживает (а).
- "two RecordTypes that have a `chosenBy` and that it reaches through the fewest `refines` links name different fields in theirs": (а) ровно два таких RecordType; (б) любые два из нескольких. Тогда "names both of those RecordTypes" при трёх и более неясно. "theirs" — их `chosenBy`.
- "each RecordType variant that refines it": "it" — RecordType без `chosenBy` из начала предложения (скорее всего), но ближе стоят «два RecordType».
- "a fragment of a format that declares the field `text`": "that declares" относится (а) к фрагменту формата; (б) к формату, фрагментом которого он является. Контекст поддерживает (а).
- "which overlooks `text`": "which" — такое сравнение (скорее всего), а не `schema`.
- "For the last condition, it also names": "it" — отказ ("The refusal") из предыдущего предложения; ближе стоит "the RecordType variant".

LANGUAGE:
- "name different fields in theirs" → "name different fields in their `chosenBy`" — "theirs" отстоит от "`chosenBy`" на два придаточных, читатель спотыкается.
- "refuses, under the first condition, each RecordType variant that refines it" → "refuses each RecordType variant that refines it, as failing the first condition" — "under the first condition" читается как «при первом условии»; не уверен, что замена точно передаёт задуманное.
- "checks it further only against the third" → "checks it further only against the third condition" — эллипсис через придаточное.
- "Another RecordType variant of `notification` names `sms` for `channel`" → "Another RecordType variant of `notification` names `sms` for `channel` in its `answersTo`" — в предыдущем предложении место названо, здесь опущено.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5c.md · s-5nf87c3e3jg9v7c — Where the values of a field with `enum` are collected from

TRANSLATION:
**Заголовок:** Откуда собираются значения поля с `enum`.
**Текст:** Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), инструменты SpecSheriff собирают значения поля с `enum` (§s-xfu2gpzddjnmgks) из его источника, а источник — ровно одно из следующего:
- собственный список поля, если схема поля содержит `enum`: элементы этого `enum` в их порядке;
- имена частей базовой спецификации (§s-gqavjzcmubg5pvk, §s-5x737t9nee4zgaa), если `x-enumSource.from` поля равен `parts`;
- sid узлов собственного типа в проекте (§s-mt6auv3jz8m5gzh), если `x-enumSource.from` поля равен `kind`: sid каждого узла базовой спецификации, тип которого назван в `x-enumSource.kind` поля, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6).

Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), части базовой спецификации — это домены спецификации и раздел contracts (§s-z6tq6a3btnvvwx7). Имя каждой такой части — имя её папки в `specs/` (§s-zefk589ykh37b8u), например `contracts` или `requests`.
Иначе части базовой спецификации — это разделы, расположение которых (§s-kag2m9tzdnduxdx) — `base/` или `contracts/` и одно число после. Имя каждой такой части — заголовок её раздела.
`sheriff reindex` записывает каждое значение, собранное из имён частей или из sid, в `x-enumSource.gathered` поля (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br) вместе с sid узла, из которого значение происходит:
- для имени домена — заголовок домена (§s-yggv9myedprnaa7);
- для имени `contracts` — первый узел верхнего уровня первого файла в `specs/contracts/` в порядке кодовых точек путей файлов;
- для заголовка раздела — этот раздел;
- для sid — узел, чей это sid.

`sheriff reindex` записывает значения в порядке узлов, из которых они происходят: файлы узлов — в порядке кодовых точек путей файлов, а узлы одного файла — в порядке, в котором их обходит вычисление расположений (§s-ygg5kpcxgzq3m7w).
Инструменты SpecSheriff собирают значения поля с `enum` на любой глубине внутри `schema` RecordType (§s-6eb92ddch7shuvu), например в схеме элементов списка.
**Причина:** Значения поля используют `sheriff reindex`, `sheriff validate`, проверка RecordType variant и `sheriff types` (§s-ztseyetus7np6br, §s-agc6fb3vx46pc23, §s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Собранные единым способом, они одинаковы для каждого из этих применений и на каждой машине.
**Пример 1:** В проекте, выбравшем расширение Domains, у RecordType записи audit log есть поле `part`, чей `x-enumSource.from` равен `parts`. Базовая спецификация хранится в `specs/contracts/`, `specs/requests/` и `specs/users/`. `sheriff reindex` записывает `contracts`, `requests` и `users` в `x-enumSource.gathered` поля. С `contracts` он записывает sid первого узла верхнего уровня первого файла в `specs/contracts/`. С именем каждого домена он записывает sid заголовка этого домена. Самая вероятная ошибка — пропустить `contracts`, который является частью базовой спецификации, хотя и не домен.
**Пример 2:** В проекте без расширения Domains `specs/base/` содержит разделы верхнего уровня с заголовками «Requests» и «Users», а `specs/contracts/` — раздел с заголовком «Contracts». Поле `part` у RecordType записи audit log, чей `x-enumSource.from` равен `parts`, получает заголовок каждого из этих разделов, каждый с sid своего раздела. Самая вероятная ошибка — дать полю имена папок, `base` и `contracts`.

TWO READINGS:
- "a field with `enum`": (а) поле, в схеме которого есть ключ `enum`; (б) любое поле с перечислимыми значениями, включая поля только с `x-enumSource`. Список требует (б), но первый пункт ("where the field's schema holds `enum`") заставляет читать название как (а).
- "its own list": "its" — поля (скорее всего), а не источника.
- "the sids of the nodes of a project's own kind": (а) узлы одного собственного типа, названного в поле; (б) узлы любого собственного типа проекта. Продолжение после двоеточия поддерживает (а).
- "Otherwise": отсылает к условию предыдущего абзаца — «если проект не выбрал расширение Domains»; в самом абзаце условие не названо.
- "`contracts/` followed by a single number": (а) одно число (один уровень нумерации); (б) одна цифра. Контекст поддерживает (а).
- "their files in the code-point order of the files' paths": "their" — узлов (скорее всего) или значений.
- "The field `part` of the RecordType of an audit log entry, whose `x-enumSource.from` is `parts`": "whose" относится к полю (по смыслу), но стоит сразу после "entry" и "RecordType".
- "each with the sid of its section": "each" — каждый заголовок; читается однозначно только со второго раза из-за двух "each" подряд.

LANGUAGE:
- "the check of RecordType variants" → "the check on RecordType variants" — "check of" звучит как калька; обычно "check on" или "check of X against Y".
- "gets the title of each of those sections" → "is given the title of each of those sections" — "gets" разговорно для текста спецификации, и в следующем предложении стоит "give the field".
- "Collected in a single way" → "Collected in one way only" — "in a single way" читается и как «одним разом»; не уверен, что замена точно передаёт задуманное.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5c.md · new:tools-7-1-enum-values — Fields with `enum` that `sheriff validate` accepts

TRANSLATION:
Новый узел, выделенный из `s-5nf87c3e3jg9v7c`, с sid s-dk3zfkbhc3v6xbp.
**Заголовок:** Поля с `enum`, которые принимает `sheriff validate`.
**Текст:** Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает поле с `enum` (§s-xfu2gpzddjnmgks), только если выполняются оба условия:
- его источник даёт ему хотя бы одно значение, когда инструменты SpecSheriff собирают его значения (§s-5nf87c3e3jg9v7c, §s-buug8n5eh7tdnsv);
- если его `x-enumSource.from` равен `kind`, его `x-enumSource.kind` называет один из типов узла, которые расширение схемы проекта добавляет в своём поле `kinds` (§s-xm8rz4uupb73gu5, §s-hcgmz4v5avbj3nt).

Любое другое поле с `enum` `sheriff validate` отклоняет и называет RecordType, содержащий это поле, по файлу, sid и расположению (§s-kag2m9tzdnduxdx). В отказе названы также поле, каждое условие, которое поле не выполняет, и, если поле не выполняет условие о типе узла, этот тип. Поле названо указателем JSON Pointer на схему поля внутри `schema` этого RecordType, например `/properties/accounts/items`.
Когда `sheriff validate` проверяет файлы по схеме спецификации, он отклоняет поле, чей собственный `enum` содержит какое-либо значение больше одного раза (§s-xzcw3hv4hmxz7h7, §s-upj45kydz8727be). Схема расширения RecordType требует, чтобы каждый `enum` внутри `schema` RecordType (§s-6eb92ddch7shuvu) содержал каждое значение только один раз.
`sheriff validate` проверяет каждое поле с `enum` на любой глубине внутри `schema` каждого RecordType в файлах, которые хранит репозиторий. Он выполняет эти проверки независимо от того, одобрена спецификация или является черновиком (§s-upj45kydz8727be, §s-buug8n5eh7tdnsv, §s-hcgmz4v5avbj3nt).
**Причина:** Типы и RuntimeChecks поля генерируются из его значений (§s-e877bnfa559tvk9). Поэтому поле без значений или со значениями, нарушающими правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), передало бы свою ошибку сгенерированному коду.
**Пример:** У RecordType записи журнала задач есть поле `step`, чей `x-enumSource.from` равен `kind`, а `x-enumSource.kind` — `TextRule`. `sheriff validate` отклоняет поле и называет `TextRule`. Как только `x-enumSource.kind` называет `jobStep`, тип узла, который добавляет расширение схемы проекта, и в базовой спецификации есть узел этого типа, поле проходит. Самая вероятная ошибка — принять `TextRule`, потому что его определяет схема SpecSheriff guidelines.

TWO READINGS:
- "that the project's extension of the schema adds in its field `kinds`": "its" — расширения схемы (скорее всего) или поля, которое проверяется.
- "the files that the repository keeps": (а) файлы спецификации, отслеживаемые в репозитории; (б) любые файлы, лежащие в репозитории. Контекст не решает.
- "the condition on the kind": второе условие списка; названо описательно, читатель должен сам сопоставить.
- "It makes these checks": "It" — `sheriff validate` (назван в том же абзаце); "these checks" — все проверки узла, включая проверку по схеме, или только два условия списка. Скорее всего все.
- "with values that break the rules on their source": "their" — значений (скорее всего) или полей.
- "would therefore pass its mistake on": "its mistake" — ошибка поля; для второго случая ("values that break the rules") ошибка скорее в значениях или источнике.
- "the field passes": (а) проходит эту проверку; (б) принимается `sheriff validate` вообще. Практически совпадают.

LANGUAGE:
- "in the files that the repository keeps" → "in the files kept in the repository" — репозиторий не «хранит» как действующее лицо; не уверен, что замена сохраняет задуманное ограничение (см. два прочтения).
- "The RecordType of an entry of the job log" → "The RecordType of a job log entry" — двойное "of … of"; в соседнем узле уже написано "an audit log entry".
- "A field with no value" → "A field with no values" — речь об отсутствии значений в наборе; единственное число читается как «поле без значения (пустое)».

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5c.md · s-ezq8csd433vj6fj — A RecordType that refers to a RecordType outside its part of the system

TRANSLATION:
**Заголовок:** RecordType, который ссылается на RecordType вне своей части системы.
**Текст:** Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` не сообщает о ссылке одного RecordType (§s-7vm323mhry2enx3) на другой только в следующих случаях (§s-8ht2hn88cu2qwz9):
- от RecordType вне раздела contracts (§s-z6tq6a3btnvvwx7) — на RecordType своей же части системы или на фрагмент формата (§s-7vm323mhry2enx3, §s-rpkq8y79fwg5k92);
- от фрагмента формата — на другой фрагмент формата (§s-hn9m9dhxaazjn3y).

`sheriff validate` сообщает о каждом RecordType, который содержит любую другую ссылку, и называет этот RecordType и каждый RecordType, на который тот такой ссылкой ссылается, каждый по его sid (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y). Изменение при этом проходит.
RecordType ссылается на другой RecordType одним из двух способов:
- его `schema` (§s-6eb92ddch7shuvu) содержит на любой глубине `$ref`, указывающий на тот RecordType, или `identifierOf`, который его называет (§s-qpdnkejr5xzc6j3);
- у него есть связь `refines` (§s-sn6au3vcr9uy5pm) с тем RecordType.

Фрагмент формата — это RecordType в разделе contracts. Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), часть системы, к которой принадлежит RecordType, — это домен спецификации, в файлах которого находится этот RecordType. Иначе это раздел в `specs/base/`, который содержит этот RecordType и расположение которого (§s-kag2m9tzdnduxdx) — `base/` и одно число после. RecordType в `specs/base/`, не содержащиеся ни в одном таком разделе, считаются вместе одной частью системы.
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или является черновиком (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).
**Причина:** RecordType может ссылаться на другой RecordType на любой глубине своего `schema` и через свои связи `refines`. Поэтому только проверка, которая читает весь `schema` RecordType и все его связи `refines`, находит каждую ссылку, нарушающую правило о том, на что RecordType может ссылаться (§s-8ht2hn88cu2qwz9).
**Пример:** В домене `requests` у RecordType запроса есть поле `address` с `$ref` на `address`, фрагмент формата. У него есть также поле `user`, чей `identifierOf` называет RecordType пользователя в домене `users`. `sheriff validate` сообщает о RecordType запроса, называет его и RecordType пользователя, каждый по sid, и пропускает изменение. Самая вероятная ошибка — не сообщить о ссылке в поле `user`, потому что это поле содержит только идентификатор. Чтобы хранить идентификатор пользователя без такой ссылки, поле `user` имело бы тип `string` и не имело бы `identifierOf`.

TWO READINGS:
- "leaves a reference from one RecordType … to another unreported only in the following cases": "unreported" стоит далеко от "leaves"; на первом проходе "to another unreported" читается как «на другой, о котором не сообщено». Смысл: не сообщает о ссылке только в этих случаях.
- "to a RecordType of its own part of the system or to a fragment of a format": "its own" — RecordType-источника (скорее всего).
- "each RecordType that it refers to by such a reference": "such a reference" — «любая другая ссылка» (не входящая в перечисленные случаи), скорее всего; может читаться и как «ссылка вообще».
- "The change still passes": никакое изменение в узле раньше не названо; скорее всего изменение, которое проверяет `sheriff validate`. "still" — (а) «тем не менее»; (б) «по-прежнему».
- "Otherwise, it is the section of `specs/base/`": "it" — часть системы, к которой принадлежит RecordType (названа в предыдущем предложении того же абзаца).
- "what a RecordType may refer to": "may" — разрешение (на что позволено ссылаться); контекст это подтверждает, но возможно и «на что может (способен) ссылаться».
- "a `$ref` to `address`, a fragment of a format": поле и фрагмент формата названы одинаково (`address`); читатель может принять это за ссылку поля на самого себя.
- "reports the RecordType of a request": (а) тот самый RecordType запроса из примера; (б) RecordType какого-либо запроса. Неопределённый артикль во втором упоминании подталкивает к (б).

LANGUAGE:
- "To store a user's identifier without such a reference, the field `user` would have the type `string` and no `identifierOf`" → "A field `user` that stores a user's identifier without such a reference has the type `string` and no `identifierOf`" — висячий инфинитив: «хранить» относится не к полю как действующему лицу, и "would have" без условия; не уверен, что замена точно сохраняет оттенок совета.
- "are treated as together forming one part of the system" → "are treated as one part of the system" — "as together forming" тяжеловесно; смысл тот же.
- "`sheriff validate` reports the RecordType of a request" → "`sheriff validate` reports that RecordType" — повторное упоминание уже названного объекта требует определённой ссылки.
