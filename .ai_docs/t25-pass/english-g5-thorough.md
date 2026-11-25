### D:\SpecSheriff\.ai_docs\t25-pass\english-group5.md · s-vuujweu57sxsa58
TRANSLATION:
**Заголовок:** Домены спецификации, которые используют друг друга по кругу

**Текст:** Там, где проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` отклоняет изменение, если домены используют друг друга по кругу (§s-bncp7gtyaukur8e). В отказе названы домены одного такого круга, в том порядке, в котором каждый использует следующий.

Домен использует другой домен, если в его заголовке домена (§s-yggv9myedprnaa7) есть связь `consumes` с разделом другого домена. Учитывается только та связь, которую принимает проверка связей `consumes` (§s-p3n666zfjdrrw6a). Домены используют друг друга по кругу, если цепочка доменов, в которой каждый использует следующий, возвращается к своему первому домену.

`sheriff validate` делает эту проверку независимо от того, одобрена спецификация или является draft (§s-bncp7gtyaukur8e).

**Обоснование:** Только связи `consumes` в заголовках доменов говорят, какой домен какой использует (§s-yggv9myedprnaa7). У узла, который опирается на то, что утверждает другой домен, есть связь любого типа с узлом того домена (§s-hr7j7scmfkkjnws). Поэтому проверка, которая шла бы по тем связям, отклоняла бы домены, которые друг друга не используют.

**Пример:** В заголовке домена `requests` есть связь `consumes` с разделом домена `users`. В заголовке `users` есть такая же связь с разделом `requests`. `sheriff validate` отклоняет изменение и называет `requests` и `users`. В другом проекте такая связь есть только в заголовке `requests`, а правило из `users` цитирует правило из `requests`. Там `sheriff validate` принимает оба домена. Самая вероятная ошибка — счесть это цитирование использованием `requests` доменом `users`.

TWO READINGS:
- "where the domains use one another in a cycle": (а) все домены проекта вместе образуют один круг; (б) какие-то из доменов образуют круг. Определение ниже говорит в пользу (б), но определённый артикль подсказывает (а).
- "has a link of any type to that domain's node": (а) у такого узла обязательно есть связь, причём тип её может быть любым; (б) у такого узла бывает связь какого угодно типа, не обязательно `consumes`. Контекст склоняет к (а). Кроме того, "that domain's node" читается так, будто у домена один узел; вероятно, имеется в виду узел того домена, на который опираются.
- "those links": (а) связи любого типа между узлами из предыдущего предложения; (б) связи `consumes` из первого предложения. Контекст склоняет к (а).
- "only the header of `requests` has such a link": (а) связь `consumes` с разделом `users`; (б) связь `consumes` с разделом `requests`, как в предыдущем предложении, что бессмысленно. Имеется в виду (а), но цель связи не названа.

LANGUAGE:
- "that domain's node" → "a node of that domain" — определённая форма подразумевает единственный узел домена. Не уверен, что замена сохраняет смысл, если имелся в виду именно тот узел, на который опираются.
- "Only a link that the check of `consumes` links accepts is counted" → "A link counts only if the check of `consumes` links accepts it" — подлежащее с длинным придаточным перед коротким сказуемым читается с трудом.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5.md · s-gvafe6bnstwab8b
TRANSLATION:
**Заголовок:** Разделы технического приложения, сопоставленные с доменами спецификации

**Текст:** Там, где проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает JSON-файл в `specs/tech/`, только если он является одним из следующих (§s-zefk589ykh37b8u, §s-vghy37e3p2325ah):
- `specs/tech/stack.json` или `specs/tech/debt.json`;
- файл, названный по домену, `specs/tech/<domain>.json`, где `<domain>` — имя домена.

Любой другой файл технического приложения `sheriff validate` отклоняет (§s-tj38pvm38nepaf5) и называет этот файл.

В файле, названном по домену, `sheriff validate` принимает каждый раздел ниже первого узла верхнего уровня этого файла, только если те же заголовки ведут к разделу того домена (§s-vghy37e3p2325ah). Заголовки, ведущие к разделу, — это заголовки разделов, которые его содержат, сверху вниз, а затем собственный заголовок раздела. Любой другой раздел файла `sheriff validate` отклоняет, называя его по файлу, sid и расположению (§s-kag2m9tzdnduxdx) и называя его заголовок.

Первый узел верхнего уровня в файле, названном по домену, представляет сам домен, поэтому заголовки, ведущие к разделу этого файла, начинаются ниже этого узла. Каждый следующий узел верхнего уровня этого файла считается узлом под первым, как при вычислении расположений (§s-ygg5kpcxgzq3m7w). В домене заголовки, ведущие к разделу, начинаются с раздела, который является узлом верхнего уровня одного из файлов домена или дочерним узлом заголовка домена (§s-yggv9myedprnaa7).

`sheriff validate` делает эту проверку независимо от того, одобрена спецификация или является draft (§s-vghy37e3p2325ah).

**Обоснование:** Читатель ищет, как реализовано правило домена, в файле технического приложения, названном по этому домену. Там читатель идёт по тем же заголовкам, которые ведут к правилу в домене (§s-vj7ercem526zd6v). Раздел этого файла, которому не соответствует ни один раздел домена, содержит реализацию, которую такой читатель не найдёт.

**Пример:** В домене `requests` есть раздел с заголовком «Intake», в котором есть раздел с заголовком «Validation». В `specs/tech/requests.json` первый узел верхнего уровня содержит раздел «Intake», в котором есть раздел «Validation», и `sheriff validate` принимает оба. Ещё один раздел «Validation» находится прямо под первым узлом верхнего уровня файла, и `sheriff validate` его отклоняет. Самая вероятная ошибка — принять этот раздел, потому что в домене есть раздел «Validation», хотя тот раздел находится под «Intake».

TWO READINGS:
- "each section below the file's first top-level node": (а) каждый раздел на любой глубине под первым узлом; (б) только разделы непосредственно под ним. Пример говорит в пользу (а).
- "the same titles": к этому месту никакие заголовки ещё не названы, и читатель не знает, с чем они «те же». Скорее всего, это заголовки, ведущие к самому разделу файла, которые определены только следующим предложением.
- "that domain": домен не назван в этом предложении явно. Скорее всего, это домен, по которому назван файл.
- "looks for how a rule of a domain is implemented in the file of the technical appendix named after that domain": (а) ищет в этом файле, как реализовано правило; (б) ищет, как правило реализовано в этом файле. Контекст склоняет к (а).
- "although that section is under “Intake”": "that section" в этом предложении дважды указывает на разные разделы. Первое вхождение — раздел файла, второе — раздел домена. Читатель может отнести второе к разделу файла, который как раз не под «Intake».

LANGUAGE:
- "only where the same titles lead to a section of that domain" → "only where the titles that lead to it also lead to a section of that domain" — «the same» без названного объекта сравнения.
- "A reader looks for how a rule of a domain is implemented in the file of the technical appendix named after that domain." → "To find how a rule of a domain is implemented, a reader looks in the file of the technical appendix named after that domain." — снимает двойное прикрепление обстоятельства места.
- "although that section is under “Intake”" → "although the domain's section is under “Intake”" — одно указательное выражение для двух разных разделов в одном предложении.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5.md · s-uxmkwbnpgtjzkgv
TRANSLATION:
**Заголовок:** Уровень в заголовке домена

**Текст:** Там, где проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает уровень, который содержит заголовок домена (§s-yggv9myedprnaa7), только если собственные guidelines проекта (§s-u7tw6m8npxmv5tu) перечисляют этот уровень (§s-nkyty4dy9x2v2a4, §s-j3v4y4d3sbmdgfp). Заголовок содержит свой уровень в своём `level`.

Любой другой заголовок, содержащий уровень, `sheriff validate` отклоняет, называя заголовок по файлу, sid и расположению (§s-kag2m9tzdnduxdx) и называя уровень. Заголовок, не содержащий уровня, эту проверку проходит.

Инструменты SpecSheriff читают те уровни в последней одобренной формулировке каждого правила из `project.json` (§s-zefk589ykh37b8u), у которого есть связь `refines` (§s-sn6au3vcr9uy5pm) с правилом об уровне домена (§s-nkyty4dy9x2v2a4). Правило в статусе draft не реализуется (§s-utvqbypzhmgndug), поэтому уровень, который добавляет только формулировка в статусе draft, считается перечисленным лишь после одобрения этой формулировки.

`sheriff validate` делает эту проверку независимо от того, одобрена спецификация или является draft (§s-j3v4y4d3sbmdgfp).

**Обоснование:** Диаграмма доменов помещает каждый домен в строку его уровня (§s-4azsb49pj6sech8). Порядок уровней в их списке задаёт порядок строк (§s-nkyty4dy9x2v2a4). Поэтому у уровня вне этого списка нет строки.

**Пример:** Одобренное правило из `project.json` уточняет правило об уровне домена и перечисляет `core` и `edge`. Участник команды добавляет в его список `platform`, и правило становится draft. Пока новая формулировка не одобрена, `sheriff validate` отклоняет каждый заголовок, содержащий `platform`, называя `platform`. Самая вероятная ошибка — прочитать список в формулировке со статусом draft.

TWO READINGS:
- "those levels": уровни не названы в этом абзаце. Скорее всего, это уровни, которые перечисляют собственные guidelines проекта, из первого абзаца.
- "the rule on a domain's level": (а) правило об уровне домена; (б) правило, находящееся на уровне домена. Контекст склоняет к (а). Фраза встречается дважды в тексте и один раз в примере.
- "with a `refines` link": (а) связь есть у правила; (б) связь есть у формулировки. По смыслу (а).
- "is listed only after that wording is approved": (а) считается перечисленным только после одобрения; (б) физически вносится в список только после одобрения, хотя в черновой формулировке он уже записан. По смыслу (а).

LANGUAGE:
- "refuses any other header that contains a level" → "refuses a header that contains any other level" — предыдущее предложение говорит о принятии уровня, а не заголовка, поэтому «any other header» не с чем сопоставить.
- "read those levels in the last approved wording" → "read the listed levels from the last approved wording" — «read from» естественнее для источника данных, и указание назад заменено названием.
- "the rule on a domain's level" → "the rule about a domain's level" — «on» рядом с «level» читается и как место. То же в "to the rule on a domain's level" и в "refines the rule on a domain's level".
- "A header contains its level in its `level`." → "A header holds its level in its `level` field." — «contains its level in its level» звучит как тавтология без слова «field».
- "to read the list in the draft wording" → "to take the list from the draft wording" — «read in» не говорит, что список берут как источник.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5.md · s-3anv9qcmx8pwp2w
TRANSLATION:
**Заголовок:** Идентификатор, прослеженный до конца

**Текст:** Там, где проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает поле с `identifierOf` (§s-qpdnkejr5xzc6j3), только если выполняются оба условия:
- его `identifierOf` называет RecordType (§s-7vm323mhry2enx3), который в своём `identifiedBy` называет одно из своих полей полем, идентифицирующим его записи данных (§s-6eb92ddch7shuvu);
- цепочка идентификаторов, начинающаяся с этого поля, заканчивается полем без `identifierOf` (§s-cqys6wqrnfzu5ac).

Любое другое поле с `identifierOf` `sheriff validate` отклоняет, называя RecordType, который его содержит, по файлу, sid и расположению (§s-kag2m9tzdnduxdx). В отказе также названы поле и условие, которое поле не выполняет.

Цепочка идентификаторов, начинающаяся с поля, идёт к полю, которое идентифицирует записи данных того RecordType, который назван в `identifierOf` поля. Если у того поля тоже есть `identifierOf`, цепочка продолжается тем же образом. Цепочка, которая возвращается к RecordType, уже ею пройденному, никогда не заканчивается.

Поля RecordType здесь — это те, которые он объявляет в своём `schema` (§s-6eb92ddch7shuvu), и те, которые он берёт через `refines` (§s-sn6au3vcr9uy5pm) у другого RecordType. `sheriff validate` делает эту проверку везде, где `schema` какого-либо RecordType содержит `identifierOf`, на любой глубине, например в схеме элементов списка.

`sheriff validate` делает эту проверку независимо от того, одобрена спецификация или является draft (§s-qpdnkejr5xzc6j3, §s-cqys6wqrnfzu5ac).

**Обоснование:** Поле с `identifierOf` берёт свой тип у поля в конце своей цепочки идентификаторов (§s-6eb92ddch7shuvu, §s-cqys6wqrnfzu5ac). Поэтому типы и RuntimeChecks, генерируемые из RecordType (§s-e877bnfa559tvk9), могут дать полю тип, только если у цепочки есть конец.

**Пример:** У RecordType `statement` есть поле `account`, чей `identifierOf` называет RecordType `account`. `identifiedBy` у `account` называет его поле `number` типа `string`. Эта цепочка заканчивается на `number`, и `sheriff validate` принимает поле. RecordType `left` и `right` идентифицируются каждый полем, чей `identifierOf` называет другой RecordType, поэтому их цепочки никогда не заканчиваются. `sheriff validate` отклоняет оба поля. Самая вероятная ошибка — пройти только первый шаг каждой цепочки, что принимает их обе.

TWO READINGS:
- "the RecordType that the field's `identifierOf` names": "the field's" может относиться (а) к начальному полю цепочки; (б) к только что упомянутому идентифицирующему полю. По смыслу (а).
- "The `identifiedBy` of `account` names its field `number`": `account` — и поле в `statement`, и RecordType. По смыслу здесь RecordType `account`, но читатель может отнести к полю.
- "That chain": в примере цепочка до этого не названа. Скорее всего, это цепочка идентификаторов, начинающаяся с поля `account` в `statement`.
- "which accepts both of them": "them" — (а) оба поля; (б) обе цепочки. Скорее (а).
- "naming the RecordType that holds it by its file, its sid and its location": "its" — (а) файл, sid и расположение RecordType; (б) поля. Грамматика склоняет к (а).

LANGUAGE:
- "ends in a field without `identifierOf`" → "ends at a field without `identifierOf`" — в примере написано «ends at»; «ends in» скорее значит «оканчивается чем-то как результатом».
- "that it has already passed" → "that it has already passed through" — «pass a RecordType» читается как «миновать», а не «пройти через».
- "those that it takes through `refines` (§s-sn6au3vcr9uy5pm) from another RecordType" → "those that it inherits from another RecordType through a `refines` link" — «takes through» не сочетается. Не уверен, что «inherits» точно совпадает со значением связи `refines` в guidelines.
- "which accepts both of them" → "which leads to accepting both fields" — ошибка сама ничего не принимает, а «them» не названо.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5.md · s-c2r9jndrjbtbsv6
TRANSLATION:
**Заголовок:** Чему должен соответствовать вариант RecordType

**Текст:** Там, где проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает вариант RecordType (§s-z3dnru6qqdf9m6j), только если выполняется всё следующее:
- у него есть связь `refines` (§s-sn6au3vcr9uy5pm) ровно с одним RecordType, у которого есть поля, выбирающие вариант (§s-bmyzn6zuds6czqm);
- он объявлен в том же разделе базовой спецификации, что и его RecordType (§s-vtpxwqe7ncmn5bz): ближайший раздел, содержащий вариант, является ближайшим разделом, содержащим его RecordType;
- он объявляет хотя бы одно поле (§s-47q37qk27yvt3pa);
- имя каждого поля, которое он объявляет, отличается от имени каждого поля его RecordType (§s-hrguxwcsdm57vxf);
- поля, которые называет его `answersTo`, — это в точности поля, выбирающие вариант его RecordType (§s-swturmy7hmhfvt4);
- каждое значение, которое его `answersTo` называет для поля, является одним из значений этого поля, как их собирают инструменты SpecSheriff (§s-5nf87c3e3jg9v7c, §s-27aycne77epeaq6);
- его `answersTo` отличается от `answersTo` любого другого варианта его RecordType (§s-5z8vjzmc3s983gk).

Любой другой вариант RecordType `sheriff validate` отклоняет, называя его по файлу, sid и расположению (§s-kag2m9tzdnduxdx). В отказе также сказано, какие из условий выше вариант не выполняет. Для последнего условия в нём также назван каждый другой вариант с таким же `answersTo`.

Вариант, не выполняющий первое условие, отклоняется только по этой причине, поскольку каждое из остальных условий сравнивает вариант с его RecordType.

Вариант RecordType — это RecordType, который в своём `answersTo` называет значения, которым он соответствует (§s-z3dnru6qqdf9m6j). RecordType варианта — это RecordType, у которого есть поля, выбирающие вариант, и с которым у варианта есть связь `refines`. Поля, выбирающие вариант RecordType, — это те, которые RecordType называет в своём `chosenBy`. Если он не называет ни одного, это те, которые называет в своём `chosenBy` ближайший RecordType вверх по его связям `refines`.

Поля, которые RecordType объявляет, — это свойства его `schema` (§s-6eb92ddch7shuvu). Поля RecordType — это те, которые он объявляет, и те, которые он берёт через `refines` у другого RecordType. Имена полей сравниваются символ за символом. Если RecordType не содержится ни в одном разделе, его ближайшим разделом считается та часть базовой спецификации, которая его содержит (§s-kag2m9tzdnduxdx).

`sheriff validate` делает эти проверки независимо от того, одобрена спецификация или является draft (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk).

**Обоснование:** Запись данных содержит поля своего RecordType вместе с полями того варианта, значения которого она содержит (§s-z3dnru6qqdf9m6j). Только если каждый вариант согласуется со своим RecordType, у каждой записи данных есть один набор полей, который могут описать типы и RuntimeChecks, генерируемые из RecordType (§s-e877bnfa559tvk9).

**Пример:** RecordType `notification` называет `channel` в своём `chosenBy`, а значения `channel` — `email` и `app`. Он уточняет фрагмент формата `message`, который объявляет поле `text`. Вариант в том же разделе уточняет `notification`, называет в своём `answersTo` значение `email` для `channel` и объявляет `address`, и `sheriff validate` его принимает. Другой вариант называет `sms` для `channel` и объявляет `text`, и `sheriff validate` отклоняет его по обеим причинам. Самая вероятная ошибка — сравнивать имена полей варианта только с теми, которые `notification` объявляет сам, из-за чего пропускается `text`.

TWO READINGS:
- "it has a `refines` link (§s-sn6au3vcr9uy5pm) to exactly one RecordType that has fields that select a variant": (а) среди RecordType, с которыми у варианта есть связь `refines`, ровно один имеет поля, выбирающие вариант, а другие связи `refines` допустимы; (б) у варианта всего одна связь `refines`, и она ведёт к такому RecordType. Определение «A variant's RecordType» склоняет к (а).
- "is refused for that reason alone": (а) в отказе названа только эта причина, остальные условия не проверяются; (б) одной этой причины достаточно для отказа. Придаточное с «since» склоняет к (а).
- "the values that it corresponds to": "it" — (а) вариант; (б) его `answersTo`. Скорее (а).
- "the nearest RecordType up its `refines` links": (а) ближайший RecordType по связям `refines`, даже если он сам ничего не называет в `chosenBy`; (б) ближайший из тех, которые что-то называют в `chosenBy`. По смыслу (б), но текст этого не говорит.
- "the variant whose values it holds": (а) вариант, значения из `answersTo` которого стоят в выбирающих полях записи данных; (б) вариант, значения полей которого запись содержит. По смыслу (а).
- "the fragment of a format `message`": (а) фрагмент формата с именем `message`; (б) фрагмент некоторого формата `message`. По терминологии проекта (а).
- "for both reasons": причины выше в примере не названы причинами. Скорее всего, это значение `sms`, которого нет среди значений `channel`, и имя `text`, совпадающее с полем, взятым у `message`.

LANGUAGE:
- "the nearest RecordType up its `refines` links names in its `chosenBy`" → "the nearest RecordType along its `refines` links that names any names in its `chosenBy`" — «up its links» не сочетается, и условие «который что-то называет» опущено. Не уверен, что замена передаёт задуманный смысл.
- "those that it takes through `refines` from another RecordType" → "those that it inherits from another RecordType through a `refines` link" — «takes through» не сочетается; та же оговорка о слове «inherits», что и в предыдущем узле.
- "the fragment of a format `message`" → "the fragment of a format named `message`" — без «named» имя прикрепляется к «format».
- "refuses it for both reasons" → "refuses it on both counts" — «both reasons» требует названных ранее причин. Не уверен, нужно ли вместо этого назвать оба условия явно.
- "which misses `text`" → "which overlooks `text`" — «misses» у действия-сравнения двусмысленно («не попадает» или «не замечает»).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5.md · s-5nf87c3e3jg9v7c
TRANSLATION:
**Заголовок:** Откуда собираются значения поля с `enum`

**Текст:** Там, где проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), инструменты SpecSheriff собирают значения поля с `enum` (§s-xfu2gpzddjnmgks) из его единственного источника:
- его собственный список: элементы `enum` этого поля, в их порядке;
- имена частей базовой спецификации (§s-gqavjzcmubg5pvk), если `x-enumSource.from` поля равен `parts`: имя каждой папки в `specs/`, содержащей часть базовой спецификации (§s-zefk589ykh37b8u);
- sid узлов собственного типа узлов проекта (§s-mt6auv3jz8m5gzh), если `x-enumSource.from` поля равен `kind`: sid каждого узла базовой спецификации, тип которого назван в `x-enumSource.kind` поля, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6).

Папки, содержащие части базовой спецификации, — это `specs/contracts/` и либо `specs/base/`, либо папка каждого домена. Значение, собранное из имён частей, происходит от узла, которым открывается его часть. Для домена этот узел — его заголовок домена (§s-yggv9myedprnaa7). Для любой другой части это первый узел верхнего уровня в первом из файлов части в порядке кодовых точек их путей. Значение, собранное из sid, происходит от узла, чьим sid оно является.

Значения, собранные из имён частей или из sid, — это значения, собранные рядом с полем (§s-ju5vcanbjph7mgh). `sheriff reindex` записывает каждое из них в `x-enumSource.gathered` поля (§s-ztseyetus7np6br) вместе с sid узла, от которого оно происходит. Он записывает их в порядке этих узлов: их файлы — в порядке кодовых точек путей файлов, а узлы одного файла — в том порядке, в котором их проходит вычисление расположений (§s-ygg5kpcxgzq3m7w).

Инструменты SpecSheriff собирают таким образом значения каждого поля с `enum` на любой глубине внутри `schema` RecordType (§s-6eb92ddch7shuvu), например в схеме элементов списка.

**Обоснование:** `sheriff reindex` записывает собранные значения рядом с полем (§s-ztseyetus7np6br), а `sheriff validate` сравнивает их с тем, что даёт их источник (§s-agc6fb3vx46pc23). На значения поля опираются также проверка вариантов RecordType и генерируемые типы (§s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Собранные одним способом, значения одинаковы для каждого из них и на каждой машине.

**Пример:** В базовой спецификации, разделённой на домены, у RecordType записи audit log есть поле `part`, у которого `x-enumSource.from` равен `parts`. Базовая спецификация хранится в `specs/contracts/`, `specs/requests/` и `specs/users/`. `sheriff reindex` записывает `contracts`, `requests` и `users` в `x-enumSource.gathered` поля. С `contracts` он записывает sid первого узла верхнего уровня первого файла из `specs/contracts/`. С именем каждого домена он записывает sid заголовка этого домена. Самая вероятная ошибка — пропустить `contracts`, который является частью базовой спецификации, хотя и не является доменом.

TWO READINGS:
- "from its one source:": (а) у поля один источник, и он — один из трёх перечисленных; (б) список ниже описывает состав одного источника, то есть значения берутся из всех трёх пунктов. По смыслу (а), но двоеточие и список из трёх пунктов подсказывают (б).
- "comes from the node that its part opens with": (а) этот узел записывается как узел, от которого значение происходит, хотя само значение — имя папки; (б) значение берётся из содержимого этого узла. Абзац выше говорит, что значение — имя папки, поэтому (а), но «comes from» читается как (б).
- "its part": часть, имя которой является этим значением; ближайший альтернативный антецедент — узел.
- "gathered beside the field": (а) значения хранятся рядом с полем, в его `x-enumSource.gathered`; (б) значения собираются в месте рядом с полем. По смыслу (а).
- "the same for each of them": "them" не названо в этом предложении. Скорее всего, это `sheriff reindex`, `sheriff validate`, проверка вариантов RecordType и генерируемые типы из двух предыдущих предложений.
- "the nodes of a project's own kind": (а) узлы того собственного типа узлов, который назван в поле; (б) узлы любого собственного типа узлов проекта. Уточнение после двоеточия склоняет к (а).

LANGUAGE:
- "from its one source:" → "from its source, which is exactly one of the following:" — «its one source», за которым идут три пункта, заставляет читателя остановиться.
- "comes from the node that its part opens with" → "is attributed to the node that its part opens with" — «comes from» утверждает, что значение взято из узла. Не уверен, что «is attributed to» точно передаёт задуманное. То же в "comes from the node whose sid it is" и "the node that it comes from".
- "are the values gathered beside the field" → "are the values stored beside the field" — «gather beside» не сочетается; не уверен, не является ли «gathered» закреплённым словом из-за ключа `gathered`. То же в "writes the gathered values beside the field".
- "The SpecSheriff tools collect in this way the values of each field" → "In this way, the SpecSheriff tools collect the values of each field" — обстоятельство между глаголом и прямым дополнением, порядок слов не английский.
- "Collected in one way, the values are the same for each of them and on every machine." → "Because the values are collected in one way, every command and check that uses them gets the same values on every machine." — «each of them» без названного антецедента. Не уверен, что «every command and check» покрывает и генерируемые типы.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5.md · new:tools-7-1-enum-values
TRANSLATION:
**Заголовок:** Значения и источник поля с `enum`

**Текст:** Там, где проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает поле с `enum` (§s-xfu2gpzddjnmgks), только если выполняются оба условия:
- его источник даёт ему хотя бы одно значение, как инструменты SpecSheriff собирают его значения (§s-5nf87c3e3jg9v7c, §s-buug8n5eh7tdnsv);
- если его `x-enumSource.from` равен `kind`, его `x-enumSource.kind` называет один из типов узлов, которые расширение схемы проекта добавляет в своём поле `kinds` (§s-xm8rz4uupb73gu5, §s-hcgmz4v5avbj3nt).

Любое другое поле с `enum` `sheriff validate` отклоняет, называя RecordType, который его содержит, по файлу, sid и расположению (§s-kag2m9tzdnduxdx). В отказе также названо поле и, если поле не выполняет второе условие, тип узла.

Поле, собственный `enum` которого содержит значение более одного раза, `sheriff validate` отклоняет, когда проверяет файлы по схеме спецификации (§s-xzcw3hv4hmxz7h7, §s-upj45kydz8727be). Схема расширения RecordType требует, чтобы каждый `enum` внутри `schema` RecordType (§s-6eb92ddch7shuvu) содержал каждое значение один раз.

`sheriff validate` проверяет каждое поле с `enum` на любой глубине внутри `schema` каждого RecordType в файлах, которые хранит репозиторий. Он делает эти проверки независимо от того, одобрена спецификация или является draft (§s-upj45kydz8727be, §s-buug8n5eh7tdnsv, §s-hcgmz4v5avbj3nt).

**Обоснование:** Типы и RuntimeChecks, генерируемые для поля, принимают только значения этого поля (§s-e877bnfa559tvk9). Поэтому поле, у которого нет ни одного значения или источник которого называет тип узла, которого не может быть ни у одного узла, не допускает ни одной записи данных.

**Пример:** У RecordType шага задачи есть поле `chapter`, у которого `x-enumSource.from` равен `kind`, а `x-enumSource.kind` равен `TextRule`. `sheriff validate` отклоняет поле и называет `TextRule`. Как только поле называет `chapter` — тип узла, который добавляет расширение схемы проекта, — и в базовой спецификации есть узел этого типа, поле проходит. Самая вероятная ошибка — принять `TextRule`, поскольку схема SpecSheriff guidelines определяет этот тип.

TWO READINGS:
- "refuses a field whose own `enum` holds a value more than once when it validates the files against the schema of the specification": (а) отклоняет такое поле в тот момент, когда проверяет файлы по схеме; (б) `enum` содержит значение более одного раза в момент проверки. По смыслу (а); "it" — `sheriff validate`.
- "to hold each value once": (а) не более одного раза, то есть без повторов; (б) ровно один раз, то есть каждое значение обязано присутствовать. По смыслу (а).
- "as the SpecSheriff tools collect its values": (а) «при том способе сбора значений, которым пользуются инструменты SpecSheriff»; (б) «в тот момент, когда инструменты собирают значения». Скорее (а).
- "Once the field names `chapter`": `chapter` — и имя поля, и имя типа узла. Читатель может понять «поле называет себя» вместо «`x-enumSource.kind` поля называет тип `chapter`».
- "since the schema of the SpecSheriff guidelines defines that kind": (а) причина, по которой ошибку совершают; (б) причина, по которой принять `TextRule` — ошибка. По смыслу (а).
- "in the files that the repository keeps": (а) в файлах спецификации, которые находятся в репозитории; (б) в файлах, которые репозиторий сохраняет, в отличие от игнорируемых git. Неясно, какое из двух имелось в виду.

LANGUAGE:
- "refuses a field whose own `enum` holds a value more than once when it validates the files against the schema of the specification" → "When `sheriff validate` validates the files against the schema of the specification, it refuses a field whose own `enum` holds a value more than once" — придаточное времени стоит рядом с «holds» и прикрепляется к нему.
- "to hold each value once" → "to hold each value only once" — без «only» читается как «ровно один раз».
- "in the files that the repository keeps" → "in the files kept in the repository" — репозиторий как действующее лицо при «keep» не сочетается. Не уверен, что замена сохраняет смысл, если имелось в виду «отслеживаемые git».
- "Once the field names `chapter`" → "Once the field's `x-enumSource.kind` names `chapter`" — называет не поле, а его `x-enumSource.kind`; иначе совпадение имён путает.
- "admits no data record" → "allows no data record" — «admit» в этом значении редкое и книжное.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5.md · s-ezq8csd433vj6fj
TRANSLATION:
**Заголовок:** RecordType, который ссылается за пределы своей части системы

**Текст:** Там, где проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает ссылку из одного RecordType (§s-7vm323mhry2enx3) на другой только в следующих случаях (§s-8ht2hn88cu2qwz9):
- из RecordType вне раздела contracts (§s-z6tq6a3btnvvwx7) — на RecordType той же части системы или на фрагмент формата (§s-7vm323mhry2enx3, §s-rpkq8y79fwg5k92);
- из фрагмента формата — на другой фрагмент формата (§s-hn9m9dhxaazjn3y).

`sheriff validate` сообщает о каждом RecordType, содержащем любую другую ссылку, называя его по sid и называя RecordType, на который он ссылается (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y). Изменение при этом проходит.

RecordType ссылается на другой RecordType одним из двух способов:
- схема внутри его `schema` (§s-6eb92ddch7shuvu), на любой глубине, содержит `$ref`, указывающий на тот RecordType, или `identifierOf`, который его называет (§s-qpdnkejr5xzc6j3);
- у него есть связь `refines` (§s-sn6au3vcr9uy5pm) с тем RecordType.

Фрагмент формата — это RecordType в разделе contracts. Там, где проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), часть системы, к которой принадлежит RecordType, — это домен, в файлах которого находится этот RecordType. Иначе это раздел в `specs/base/`, который содержит RecordType и расположение которого (§s-kag2m9tzdnduxdx) — `base/` и одно число. RecordType, которые не содержатся ни в одном таком разделе, считаются принадлежащими одной части системы.

`sheriff validate` делает эту проверку независимо от того, одобрена спецификация или является draft (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).

**Обоснование:** RecordType, который ссылается на RecordType другой части системы, меняется всякий раз, когда та часть меняет тот RecordType, хотя в его собственной части ничего не изменилось (§s-8ht2hn88cu2qwz9). Поле с `identifierOf` — тоже такая ссылка, поскольку оно берёт свой тип у RecordType, который называет (§s-6eb92ddch7shuvu).

**Пример:** В домене `requests` у RecordType запроса есть поле `address` с `$ref` на фрагмент формата `address`. У него также есть поле `user`, чей `identifierOf` называет RecordType пользователя в домене `users`. `sheriff validate` сообщает о RecordType запроса по его sid, называет RecordType пользователя и пропускает изменение. Самая вероятная ошибка — не сообщить о поле `user`, потому что оно содержит только идентификатор. Домен `requests` может хранить идентификатор пользователя в поле типа `string`, которое не ссылается ни на какой RecordType.

TWO READINGS:
- "are treated as belonging to one part of the system": (а) все такие RecordType вместе считаются одной общей частью системы; (б) каждый считается принадлежащим какой-то одной части. По смыслу (а).
- "whenever that part changes that RecordType": "that RecordType" — (а) RecordType, на который ссылаются; (б) ссылающийся RecordType. По смыслу (а).
- "though nothing in its own part has changed": "its" — (а) ссылающегося RecordType; (б) RecordType, на который ссылаются. По смыслу (а).
- "the RecordType of another part of the system": (а) какой-то RecordType другой части; (б) единственный RecordType другой части. По смыслу (а), артикль подсказывает (б).
- "naming it by its sid and naming the RecordType that it refers to": "it" — RecordType, о котором сообщают; неясно, чем назван второй RecordType (тоже по sid или иначе).
- "can keep a user's identifier in a field of type `string`": (а) допустимая альтернатива, которая не даёт сообщения; (б) констатация возможности без рекомендации. Положение после фразы об ошибке склоняет к (а), но связь с ошибкой не названа.
- "the fragment of a format `address`": (а) фрагмент формата с именем `address`; (б) фрагмент некоторого формата `address`. По терминологии проекта (а).
- "to leave the field `user` unreported": текст правила говорит, что сообщается о RecordType, а не о поле. Читатель может решить, что сообщение называет поле.

LANGUAGE:
- "refers to the RecordType of another part of the system" → "refers to a RecordType of another part of the system" — определённый артикль подразумевает один RecordType у части.
- "changes whenever that part changes that RecordType, though nothing in its own part has changed" → "changes whenever the other part changes the RecordType referred to, though nothing in the referring RecordType's own part has changed" — три указателя назад с двумя возможными антецедентами в одном предложении.
- "are treated as belonging to one part of the system" → "are treated as together forming one part of the system" — «one part» читается и как «какая-то одна». Не уверен, что замена точно передаёт задуманное.
- "the fragment of a format `address`" → "the fragment of a format named `address`" — без «named» имя прикрепляется к «format».
- "to leave the field `user` unreported" → "to leave the reference in the field `user` unreported" — сообщается о ссылке и RecordType, а не о поле. Не уверен, что это задуманный смысл.
- "which refers to no RecordType" → "which does not refer to any RecordType" — «refers to no X» звучит книжно и замедляет чтение.
