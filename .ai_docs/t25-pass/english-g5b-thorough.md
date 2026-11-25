### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · preamble (lines 1–5)
TRANSLATION: T25, группа 5, раунд b: английский текст каждого изменённого узла. Файл содержит английский текст каждого узла группы 5, изменённого в раунде b, в том виде, в каком он хранится в `tools-drafts.json` после fix-group5-b.mjs. В раунде b изменился каждый узел группы. Каждый узел приведён под своим ключом из `tools-drafts.json`: заголовок, текст, обоснование и примеры. Этот файл пишет fix-group5-b.mjs; править нужно скрипт, а не этот файл.
TWO READINGS: none
LANGUAGE:
- "after fix-group5-b.mjs" → "after fix-group5-b.mjs has run" — a script is not a moment in time; the verb is missing.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-vuujweu57sxsa58
TRANSLATION:
**Заголовок:** Домены спецификации, которые используют друг друга по кругу.
**Текст:** Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` отклоняет изменение, в котором домены используют друг друга по кругу (§s-bncp7gtyaukur8e). В отказе названы домены одного такого цикла в том порядке, в котором каждый использует следующий.
Один домен использует другой, если заголовок первого домена (§s-yggv9myedprnaa7) имеет связь `consumes` с разделом второго. Учитывается только та связь, которую принимает проверка связей `consumes` (§s-p3n666zfjdrrw6a). Домены используют друг друга по кругу, если цепочка доменов, каждый из которых использует следующий, возвращается к своему первому домену.
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или является черновиком (§s-bncp7gtyaukur8e).
**Обоснование:** Только связи `consumes` в заголовках доменов говорят, какой домен какой использует (§s-yggv9myedprnaa7). Узел, который опирается на утверждение другого домена, имеет связь любого типа с тем узлом этого домена, который это утверждает (§s-hr7j7scmfkkjnws). Поэтому проверка, которая шла бы по связям всех типов, отклоняла бы домены, которые друг друга не используют.
**Пример:** Заголовок домена `requests` имеет связь `consumes` с разделом домена `users`. Заголовок `users` имеет такую же связь с разделом `requests`. `sheriff validate` отклоняет изменение и называет `requests` и `users`. В другом проекте только заголовок `requests` имеет связь `consumes` с разделом `users`, а одно из правил `users` цитирует правило `requests`. Там `sheriff validate` принимает изменение. Самая вероятная ошибка — счесть эту цитату использованием `requests` доменом `users`.
TWO READINGS:
- "refuses the change where domains use one another in a cycle": (а) «отклоняет изменение, если домены используют друг друга по кругу»; (б) «отклоняет то изменение, в котором домены используют друг друга по кругу». Первое "Where" в том же предложении значит «если», поэтому контекст склоняет к (а), но второе "where" стоит сразу после "the change" и читается как (б).
- "has a link of any type to the node of that domain that states it": (а) «имеет связь какого-либо типа (неважно какого)»; (б) «имеет связи всех типов». Кроме того, неясно, описание это («обычно имеет») или требование («должен иметь»). Контекст склоняет к (а) и к требованию.
LANGUAGE:
- "Only a link that the check of `consumes` links accepts is taken into account" → "Only a link that passes the check of `consumes` links is taken into account" — "links accepts" makes the reader take "links" for a verb at first; the meaning is kept.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-gvafe6bnstwab8b
TRANSLATION:
**Заголовок:** Разделы технического приложения, сопоставленные с доменами спецификации.
**Текст:** Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает JSON-файл в `specs/tech/`, только если он является одним из следующих (§s-zefk589ykh37b8u, §s-vghy37e3p2325ah):
- `specs/tech/stack.json` или `specs/tech/debt.json`;
- файл, названный по имени домена, `specs/tech/<domain>.json`, где `<domain>` — имя домена.

Любой другой файл технического приложения `sheriff validate` отклоняет (§s-tj38pvm38nepaf5), называя этот файл.
В файле, названном по имени домена, `sheriff validate` принимает каждый раздел ниже первого узла верхнего уровня этого файла, только если заголовки, ведущие к этому разделу, ведут и к какому-то разделу этого домена (§s-vghy37e3p2325ah). Заголовки, ведущие к разделу, — это заголовки разделов, которые его содержат, сверху вниз, а за ними заголовок самого раздела. Любой другой раздел файла `sheriff validate` отклоняет, называя его файл, sid и расположение (§s-kag2m9tzdnduxdx), а также его заголовок.
Первый узел верхнего уровня в файле, названном по имени домена, представляет сам домен, поэтому заголовки, ведущие к разделу этого файла, начинаются ниже этого узла. Каждый следующий узел верхнего уровня считается узлом под первым, как при вычислении расположений (§s-ygg5kpcxgzq3m7w). В домене заголовки, ведущие к разделу, начинаются с раздела, который является узлом верхнего уровня одного из файлов домена или дочерним узлом заголовка домена (§s-yggv9myedprnaa7).
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или является черновиком (§s-vghy37e3p2325ah).
**Обоснование:** Чтобы узнать, как реализовано правило домена, читатель смотрит в файл технического приложения, названный по имени этого домена. Там он идёт по тем же заголовкам, которые ведут к правилу в домене (§s-vj7ercem526zd6v). Раздел этого файла, которому не соответствует ни один раздел домена, содержит реализацию, которую такой читатель не находит.
**Пример:** В домене `requests` есть раздел «Intake», который содержит раздел «Validation». В `specs/tech/requests.json` первый узел верхнего уровня содержит раздел «Intake», который содержит раздел «Validation», и `sheriff validate` принимает оба. Ещё один раздел «Validation» находится непосредственно под первым узлом верхнего уровня, и его `sheriff validate` отклоняет. Самая вероятная ошибка — принять этот раздел, потому что в домене есть раздел «Validation», хотя в домене он находится под «Intake».
TWO READINGS:
- "each section below the file's first top-level node": (а) «каждый раздел на любой глубине под первым узлом»; (б) «каждый раздел непосредственно под первым узлом». Пример («directly under») склоняет к (а).
- "a section that is a top-level node of one of the domain's files or a child of the domain's header": (а) «с раздела, который является либо узлом верхнего уровня, либо дочерним узлом заголовка»; (б) «либо с раздела — узла верхнего уровня, либо с любого дочернего узла заголовка (не обязательно раздела)». Контекст склоняет к (а).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-uxmkwbnpgtjzkgv
TRANSLATION:
**Заголовок:** Уровень в заголовке домена.
**Текст:** Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает заголовок домена (§s-yggv9myedprnaa7), содержащий уровень, только если этот уровень перечислен в собственных guidelines проекта (§s-u7tw6m8npxmv5tu, §s-nkyty4dy9x2v2a4, §s-j3v4y4d3sbmdgfp). Заголовок содержит уровень как значение своего `level`.
Любой другой заголовок, содержащий уровень, `sheriff validate` отклоняет, называя файл, sid и расположение заголовка (§s-kag2m9tzdnduxdx), а также уровень. Заголовок без уровня эту проверку проходит.
Как и любой список в собственных guidelines проекта, уровни инструменты SpecSheriff читают в последней одобренной формулировке (§s-a8fn72xa782wvbk) каждого правила, которое их перечисляет (§s-t9j29hppag2nren). Поэтому уровень, который добавляет только черновая формулировка, принимается лишь после того, как эта формулировка одобрена.
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или является черновиком (§s-j3v4y4d3sbmdgfp).
**Обоснование:** Диаграмма доменов помещает каждый домен в строку его уровня (§s-4azsb49pj6sech8). Порядок уровней в их списке задаёт порядок строк (§s-nkyty4dy9x2v2a4). Поэтому у уровня вне этого списка нет строки.
**Пример:** Одобренное правило из `project.json` уточняет правило об уровне домена и перечисляет `core` и `edge`. `sheriff validate` принимает каждый заголовок, содержащий `core` или `edge`, и каждый заголовок без уровня. Участник команды добавляет `platform` в его список, и правило становится черновиком. Пока новая формулировка не одобрена, `sheriff validate` отклоняет каждый заголовок, содержащий `platform`, называя `platform`. Самая вероятная ошибка — взять список из черновой формулировки.
TWO READINGS:
- "adds `platform` to its list": "its" может относиться (а) к одобренному правилу из `project.json`, названному двумя предложениями раньше; (б) к «правилу об уровне домена» из SpecSheriff guidelines; (в) грамматически — к "A team member". Вероятнее всего (а), но между "its" и этим правилом стоит целое предложение о заголовках.
- "the last approved wording": (а) «самая недавняя одобренная формулировка»; (б) «окончательная одобренная формулировка». Контекст склоняет к (а).
LANGUAGE:
- "as the value of its `level`" → "as the value of its `level` field" — a bare key name reads as if the header had "a level of a level"; the noun is missing.
- "The order of the levels in their list" → "The order of the levels in the list of levels" — "their list" has no clear owner (the levels do not own a list), and the next sentence says "that list" as if it had been named.
- "the last approved wording" → "the most recently approved wording" — "last" can also mean final.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-3anv9qcmx8pwp2w
TRANSLATION:
**Заголовок:** Идентификатор, прослеженный до своего конца.
**Текст:** Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает поле с `identifierOf` (§s-qpdnkejr5xzc6j3), только если выполнены оба условия:
- его `identifierOf` называет RecordType (§s-7vm323mhry2enx3), который в своём `identifiedBy` называет одно из своих полей полем, идентифицирующим его записи данных (§s-6eb92ddch7shuvu);
- цепочка идентификаторов, начинающаяся с этого поля, заканчивается полем без `identifierOf` (§s-cqys6wqrnfzu5ac).

Любое другое поле с `identifierOf` `sheriff validate` отклоняет, называя файл, sid и расположение RecordType, который содержит это поле (§s-kag2m9tzdnduxdx). В отказе названы также поле и каждое условие, которое оно не выполняет. Поле названо указателем JSON Pointer на схему поля внутри `schema` этого RecordType, например `/properties/accounts/items`.
Цепочка идентификаторов, начинающаяся с поля, идёт к полю, которое идентифицирует записи данных того RecordType, который назван в `identifierOf` этого поля. Если и у того поля есть `identifierOf`, цепочка продолжается так же. Цепочка, которая второй раз приходит к идентифицирующему полю одного и того же RecordType, не заканчивается никогда.
Полями RecordType здесь считаются те, которые он объявляет в своём `schema` (§s-6eb92ddch7shuvu), и те, которые он получает через `refines` (§s-sn6au3vcr9uy5pm) от другого RecordType. `sheriff validate` выполняет эту проверку везде, где `schema` RecordType содержит `identifierOf`, на любой глубине, например в схеме элементов списка.
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или является черновиком (§s-qpdnkejr5xzc6j3, §s-cqys6wqrnfzu5ac).
**Обоснование:** Поле с `identifierOf` берёт свой тип у поля в конце своей цепочки идентификаторов (§s-6eb92ddch7shuvu, §s-cqys6wqrnfzu5ac). Поэтому типы и RuntimeChecks, сгенерированные из RecordType, содержащего это поле (§s-e877bnfa559tvk9), могут дать полю тип, только если у цепочки есть конец.
**Пример:** У RecordType `statement` есть поле `accountId`, чей `identifierOf` называет RecordType `account`. `identifiedBy` у RecordType `account` называет его поле `number` типа `string`. Цепочка, начинающаяся с `accountId`, заканчивается на `number`, и `sheriff validate` принимает поле. RecordType `left` и `right` идентифицируются каждый полем, чей `identifierOf` называет другой RecordType, так что их цепочки не заканчиваются. `sheriff validate` отклоняет оба поля. Самая вероятная ошибка — пройти только первый шаг каждой цепочки, что приняло бы оба поля.
TWO READINGS:
- "An identifier followed to its end": "its end" читается как «конец идентификатора», хотя конец есть у цепочки идентификаторов. Вероятно, имеется в виду «цепочка идентификаторов, прослеженная до конца».
- "the field's `identifierOf` names": "the field" может быть (а) полем, с которого начинается цепочка; (б) только что названным идентифицирующим полем ("the field that identifies the data records"). Контекст склоняет к (а).
- "so their chains never end": "their" грамматически относится к RecordType `left` и `right`, а цепочки определены для полей. Вероятно, имеются в виду цепочки этих двух полей.
LANGUAGE:
- "ends in a field without `identifierOf`" → "ends at a field without `identifierOf`" — the example says "ends at `number`"; "ends in" suggests a result rather than a last element.
- "which would accept both fields" → "which would lead to both fields being accepted" — a mistake does not accept anything; the clause has no agent that can accept.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-c2r9jndrjbtbsv6
TRANSLATION:
**Заголовок:** С чем должен согласовываться вариант RecordType.
**Текст:** Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` проверяет каждый вариант RecordType (§s-z3dnru6qqdf9m6j) на соответствие его RecordType.
`sheriff validate` считает вариантом RecordType каждый RecordType, который в своём `answersTo` называет значения, которым он соответствует. RecordType варианта — это тот RecordType, у которого есть поля, выбирающие вариант, и на который у варианта RecordType есть связь `refines` (§s-sn6au3vcr9uy5pm). Поля, выбирающие вариант RecordType, — это те, которые RecordType называет в своём `chosenBy`. Если он не называет ни одного, это поля, названные в `chosenBy` ближайшего RecordType вверх по его цепочке связей `refines`, у которого есть `chosenBy`.
Поля, которые объявляет RecordType, — это свойства его `schema` (§s-6eb92ddch7shuvu). Имена полей сравниваются посимвольно. Если RecordType не содержится ни в одном разделе, его ближайшим разделом считается та часть базовой спецификации, которая его содержит (§s-kag2m9tzdnduxdx).
`sheriff validate` принимает вариант RecordType, только если выполнено всё следующее:
- у него есть связь `refines` ровно с одним RecordType, имеющим поля, выбирающие вариант (§s-bmyzn6zuds6czqm);
- он объявлен в том же разделе базовой спецификации, что и его RecordType (§s-vtpxwqe7ncmn5bz): ближайший раздел, содержащий вариант RecordType, — это ближайший раздел, содержащий его RecordType;
- он объявляет хотя бы одно поле (§s-47q37qk27yvt3pa);
- имя каждого поля, которое он объявляет, отличается от имени каждого поля, которое его RecordType объявляет или получает через `refines` от другого RecordType (§s-hrguxwcsdm57vxf);
- поля, названные в его `answersTo`, — это в точности поля, выбирающие вариант его RecordType (§s-swturmy7hmhfvt4);
- каждое значение, которое его `answersTo` называет для поля, — одно из значений этого поля, как их собирают инструменты SpecSheriff (§s-5nf87c3e3jg9v7c, §s-27aycne77epeaq6);
- его `answersTo` отличается от `answersTo` любого другого варианта его RecordType (§s-5z8vjzmc3s983gk).

Любой другой вариант RecordType `sheriff validate` отклоняет, называя его файл, sid и расположение (§s-kag2m9tzdnduxdx). В отказе сказано также, какие из условий выше вариант RecordType не выполняет. Для последнего условия отказ называет и каждый другой вариант RecordType с тем же `answersTo`.
Когда `sheriff validate` проверяет файлы по схеме спецификации, он отклоняет `answersTo`, который даёт полю больше одного значения (§s-xzcw3hv4hmxz7h7, §s-swturmy7hmhfvt4).
Если вариант RecordType не выполняет первое условие, `sheriff validate` проверяет его только по третьему, поскольку каждое из остальных сравнивает вариант RecordType с его RecordType.
Если RecordType ничего не называет в своём `chosenBy`, а два RecordType, одинаково близких вверх по его цепочке связей `refines`, называют в своих `chosenBy` разные поля, `sheriff validate` отклоняет каждый вариант RecordType, который уточняет его, по первому условию. В отказе названы оба этих RecordType.
`sheriff validate` выполняет эти проверки независимо от того, одобрена спецификация или является черновиком (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk).
**Обоснование:** Запись данных содержит поля своего RecordType вместе с полями того варианта RecordType, который соответствует её значениям (§s-z3dnru6qqdf9m6j). Только если каждый вариант RecordType согласуется со своим RecordType, у каждой записи данных есть один набор полей, который могут описать типы и RuntimeChecks, сгенерированные из RecordType (§s-e877bnfa559tvk9).
**Пример:** RecordType `notification` называет `channel` в своём `chosenBy`, и значения `channel` — `email` и `app`. Он уточняет фрагмент формата с именем `message`, который объявляет поле `text`. Вариант RecordType в том же разделе, что и `notification`, уточняет `notification`, называет в своём `answersTo` значение `email` для `channel` и объявляет `address`, и `sheriff validate` его принимает. Другой вариант RecordType называет `sms` для `channel` и объявляет `text`. `sheriff validate` его отклоняет, поскольку `sms` не является значением `channel`, а `notification` получает `text` от `message`. Самая вероятная ошибка — сравнивать имена полей варианта RecordType только с теми, которые `notification` объявляет в собственном `schema`, из-за чего `text` упускается.
TWO READINGS:
- "refuses each RecordType variant that refines it under the first condition": "under the first condition" относится (а) к "refuses" — «отклоняет по первому условию каждый вариант, который его уточняет»; (б) к "refines it" — «каждый вариант, который уточняет его по первому условию». Смысл подсказывает (а), порядок слов — (б). "it" — RecordType, который ничего не называет в `chosenBy`.
- "checks it only against the third, since each of the others compares": "the others" — (а) все условия, кроме третьего (включая первое); (б) все, кроме первого и третьего. Вероятнее (б), но тогда слова обоснования не покрывают первое условие.
- "the fragment of a format named `message`": (а) фрагмент формата, который называется `message`; (б) фрагмент того формата, который называется `message`. Контекст склоняет к (а).
LANGUAGE:
- "two RecordTypes equally near up its chain of `refines` links" → "two RecordTypes at the same distance up its chain of `refines` links" — "equally near up" strings three modifiers together and has no reference point for "near".
- "refuses each RecordType variant that refines it under the first condition" → "refuses, under the first condition, each RecordType variant that refines it" — puts the phrase next to the verb it belongs to.
- "the fragment of a format named `message`" → "a fragment of a format named `message`" — the fragment is mentioned for the first time, so "the" has nothing to point to; the replacement does not remove the second reading above.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-5nf87c3e3jg9v7c
TRANSLATION:
**Заголовок:** Где собираются значения поля с `enum`.
**Текст:** Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), инструменты SpecSheriff собирают значения поля с `enum` (§s-xfu2gpzddjnmgks) из его источника, которым является ровно одно из следующего:
- его собственный список, если схема поля содержит `enum`: элементы этого `enum` в их порядке;
- имена частей базовой спецификации (§s-gqavjzcmubg5pvk, §s-5x737t9nee4zgaa), если `x-enumSource.from` поля равен `parts`;
- sid узлов собственного типа проекта (§s-mt6auv3jz8m5gzh), если `x-enumSource.from` поля равен `kind`: sid каждого узла базовой спецификации, тип которого назван в `x-enumSource.kind` поля, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6).

Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), части базовой спецификации — это домены и раздел contracts (§s-z6tq6a3btnvvwx7). Имя каждой такой части — это имя её папки в `specs/` (§s-zefk589ykh37b8u), например `contracts` или `requests`. Имя домена берётся из заголовка домена (§s-yggv9myedprnaa7). Имя `contracts` берётся из первого узла верхнего уровня первого файла в `specs/contracts/` в порядке кодовых точек путей файлов.
В остальных случаях части базовой спецификации — это разделы, расположение которых (§s-kag2m9tzdnduxdx) — `base/` или `contracts/` и одно число. Имя каждой такой части — заголовок её раздела, и имя берётся из этого раздела.
Значение, собранное из sid, берётся из узла, которому этот sid принадлежит.
`sheriff reindex` записывает каждое значение, собранное из имён частей или из sid, в `x-enumSource.gathered` поля (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br) вместе с sid узла, из которого значение берётся. Он записывает значения в порядке этих узлов: их файлы — в порядке кодовых точек путей файлов, а узлы одного файла — в том порядке, в котором их обходит вычисление расположений (§s-ygg5kpcxgzq3m7w).
Так инструменты SpecSheriff собирают значения каждого поля с `enum` на любой глубине внутри `schema` RecordType (§s-6eb92ddch7shuvu), например в схеме элементов списка.
**Обоснование:** Значения поля записывает `sheriff reindex` (§s-ztseyetus7np6br), сравнивает с их источником `sheriff validate` (§s-agc6fb3vx46pc23), а читают проверка вариантов RecordType и `sheriff types` (§s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Собранные единственным способом, они одинаковы для каждого из этих применений и на каждой машине.
**Пример 1:** В проекте, выбравшем расширение Domains, у RecordType записи audit log есть поле `part`, чей `x-enumSource.from` равен `parts`. Базовая спецификация хранится в `specs/contracts/`, `specs/requests/` и `specs/users/`. `sheriff reindex` записывает `contracts`, `requests` и `users` в `x-enumSource.gathered` поля. С `contracts` он записывает sid первого узла верхнего уровня первого файла в `specs/contracts/`. С именем каждого домена он записывает sid заголовка этого домена. Самая вероятная ошибка — пропустить `contracts`, который является частью базовой спецификации, хотя и не является доменом.
**Пример 2:** В проекте без расширения Domains `specs/base/` содержит разделы верхнего уровня «Requests» и «Users», а `specs/contracts/` содержит раздел «Contracts». Поле `part` того же RecordType получает заголовок каждого из этих разделов, каждый с sid своего раздела. Самая вероятная ошибка — дать полю имена папок, `base` и `contracts`.
TWO READINGS:
- "Where the values of a field with `enum` are collected": (а) «откуда (из какого источника) собираются значения»; (б) «в каком месте происходит сбор». Текст склоняет к (а).
- "A domain's name comes from the domain's header": (а) «текст имени домена берётся из заголовка домена» — это противоречит предыдущему предложению, где имя — это имя папки; (б) «узлом, из которого происходит это значение (и чей sid записывается), считается заголовок домена». Дальнейший текст ("the sid of the node that the value comes from") показывает (б), но читатель сначала прочтёт (а).
- "The name `contracts` comes from the first top-level node": те же два прочтения: (а) слово `contracts` взято из этого узла; (б) этот узел считается узлом-источником значения. Вероятно (б).
- "and the name comes from that section": те же два прочтения; в прочтении (а) фраза повторяет первую половину предложения. Вероятно (б).
- "the sids of the nodes of a project's own kind": (а) «sid узлов собственного типа проекта (типа, который проект добавил)»; (б) «sid узлов такого типа, какой свойствен проекту вообще». Контекст склоняет к (а).
- "the same RecordType": отсылает к RecordType записи audit log из Примера 1, то есть за пределы своего абзаца, и притом к другому проекту (там выбрано расширение Domains, здесь нет).
LANGUAGE:
- "Where the values of a field with `enum` are collected" → "Where the values of a field with `enum` are collected from" — without "from" the title asks for a place of collecting, not a source.
- "A domain's name comes from the domain's header" → "The node that a domain's name comes from is the domain's header" — "comes from" is used as a term for the value's node of origin but is not introduced as one; I am not sure the replacement says what was meant.
- "the same RecordType" → "the RecordType of an audit log entry" — a phrase that points back to another example; the thing should be named again.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · new:tools-7-1-enum-values (s-dk3zfkbhc3v6xbp)
TRANSLATION:
Новый узел, выделенный из `s-5nf87c3e3jg9v7c`, с sid s-dk3zfkbhc3v6xbp.
**Заголовок:** Какие поля с `enum` принимает `sheriff validate`.
**Текст:** Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` принимает поле с `enum` (§s-xfu2gpzddjnmgks), только если выполнены оба условия:
- его источник даёт ему хотя бы одно значение, когда инструменты SpecSheriff собирают его значения (§s-5nf87c3e3jg9v7c, §s-buug8n5eh7tdnsv);
- если его `x-enumSource.from` равен `kind`, его `x-enumSource.kind` называет один из типов узлов, которые расширение схемы проекта добавляет в своём поле `kinds` (§s-xm8rz4uupb73gu5, §s-hcgmz4v5avbj3nt).

Любое другое поле с `enum` `sheriff validate` отклоняет, называя файл, sid и расположение RecordType, который его содержит (§s-kag2m9tzdnduxdx). В отказе названы также поле, каждое условие, которое оно не выполняет, и — если поле не выполняет условие о типе узла — этот тип. Поле названо указателем JSON Pointer на схему поля внутри `schema` RecordType, например `/properties/accounts/items`.
Когда `sheriff validate` проверяет файлы по схеме спецификации, он отклоняет поле, чей собственный `enum` содержит какое-то значение больше одного раза (§s-xzcw3hv4hmxz7h7, §s-upj45kydz8727be). Схема расширения RecordType требует, чтобы каждый `enum` внутри `schema` RecordType (§s-6eb92ddch7shuvu) содержал каждое значение только один раз.
`sheriff validate` проверяет каждое поле с `enum` на любой глубине внутри `schema` каждого RecordType в файлах, которые хранит репозиторий. Он выполняет эти проверки независимо от того, одобрена спецификация или является черновиком (§s-upj45kydz8727be, §s-buug8n5eh7tdnsv, §s-hcgmz4v5avbj3nt).
**Обоснование:** Типы и RuntimeChecks поля генерируются из его значений (§s-e877bnfa559tvk9). Поэтому поле без значений или со значениями, нарушающими правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), внесло бы свою ошибку в сгенерированный код.
**Пример:** У RecordType записи журнала задачи есть поле `step`, чей `x-enumSource.from` равен `kind`, а `x-enumSource.kind` равен `TextRule`. `sheriff validate` отклоняет поле и называет `TextRule`. Как только `x-enumSource.kind` называет `jobStep` — тип узла, который добавляет расширение схемы проекта, — и базовая спецификация содержит узел этого типа, поле проходит. Самая вероятная ошибка — принять `TextRule`, потому что его определяет схема SpecSheriff guidelines.
TWO READINGS:
- "adds in its field `kinds`": "its" — (а) расширения схемы; (б) проекта; (в) поля с `enum`, о котором идёт речь в пункте. Контекст склоняет к (а).
- "in the files that the repository keeps": (а) «во всех файлах спецификации, которые лежат в репозитории»; (б) «в тех файлах, которые репозиторий сохраняет (в отличие от удаляемых или сгенерированных)». Какое из двух имеется в виду, по тексту не определить.
- "The RecordType of a job's log entry": (а) «запись в журнале одной задачи»; (б) «запись журнала задач (job log)». Не определить.
LANGUAGE:
- "in the files that the repository keeps" → "in the files kept in the repository" — a repository does not "keep" files as an agent; I am not sure this is the set of files meant.
- "would therefore put its mistake into the generated code" → "would therefore carry its error into the generated code" — "put its mistake into" is not an English collocation.
- "The RecordType of a job's log entry" → "The RecordType of an entry of the job log" — a possessive on "job" attaches the log to one job; I am not sure which log is meant.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5b.md · s-ezq8csd433vj6fj
TRANSLATION:
**Заголовок:** RecordType, который ссылается на RecordType вне своей части системы.
**Текст:** Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` пропускает ссылку одного RecordType (§s-7vm323mhry2enx3) на другой без сообщения только в следующих случаях (§s-8ht2hn88cu2qwz9):
- от RecordType вне раздела contracts (§s-z6tq6a3btnvvwx7) — на RecordType той же части системы или на фрагмент формата (§s-7vm323mhry2enx3, §s-rpkq8y79fwg5k92);
- от фрагмента формата — на другой фрагмент формата (§s-hn9m9dhxaazjn3y).

`sheriff validate` сообщает о каждом RecordType, содержащем любую другую ссылку, называя по sid и этот RecordType, и тот RecordType, на который он ссылается (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y). Изменение при этом проходит.
RecordType ссылается на другой RecordType одним из двух способов:
- его `schema` (§s-6eb92ddch7shuvu) содержит на любой глубине `$ref`, указывающий на тот RecordType, или `identifierOf`, называющий его (§s-qpdnkejr5xzc6j3);
- у него есть связь `refines` (§s-sn6au3vcr9uy5pm) с тем RecordType.

Фрагмент формата — это RecordType раздела contracts. Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), часть системы, к которой принадлежит RecordType, — это домен, файлы которого содержат этот RecordType. В остальных случаях это раздел в `specs/base/`, который содержит RecordType и расположение которого (§s-kag2m9tzdnduxdx) — `base/` и одно число. Те RecordType в `specs/base/`, которые не содержатся ни в одном таком разделе, считаются образующими вместе одну часть системы.
`sheriff validate` выполняет эту проверку независимо от того, одобрена спецификация или является черновиком (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).
**Обоснование:** RecordType может ссылаться на другой RecordType на любой глубине своего `schema` и через свои связи `refines`. Поэтому только проверка, которая читает их все, находит каждую ссылку, нарушающую правило о том, на что RecordType может ссылаться (§s-8ht2hn88cu2qwz9).
**Пример:** В домене `requests` у RecordType запроса есть поле `address` с `$ref` на фрагмент формата с именем `address`. У него есть также поле `user`, чей `identifierOf` называет RecordType пользователя в домене `users`. `sheriff validate` сообщает о RecordType запроса, называя по sid и его, и RecordType пользователя, и пропускает изменение. Самая вероятная ошибка — не сообщить о ссылке в поле `user`, потому что это поле содержит только идентификатор. Чтобы хранить идентификатор пользователя без такой ссылки, домен `requests` использует поле типа `string`.
TWO READINGS:
- "all of them": (а) «все глубины `schema` и все связи `refines`»; (б) «все RecordType»; (в) «все ссылки». Вероятнее (а), но "depth" стоит в единственном числе, и множественному "them" соответствуют только связи `refines`.
- "the fragment of a format named `address`": (а) фрагмент формата, который называется `address`; (б) фрагмент формата, называющегося `address`. Контекст склоняет к (а).
- "To keep a user's identifier": (а) «чтобы хранить идентификатор пользователя»; (б) «чтобы сохранить (не потерять, оставить) идентификатор пользователя». Контекст склоняет к (а).
- "on what a RecordType may refer to": "may" — (а) разрешение («на что RecordType разрешено ссылаться»); (б) возможность («на что он может сослаться»). Контекст склоняет к (а).
LANGUAGE:
- "naming by its sid both that RecordType and the RecordType that it refers to" → "naming each by its sid: that RecordType and the RecordType that it refers to" — a singular "its" before "both" has two owners.
- "naming by its sid both it and the RecordType of a user" → "naming each by its sid: that RecordType and the RecordType of a user" — the same singular "its" for two things, and "both it" is awkward.
- "all of them" → "the whole `schema` and every `refines` link" — "them" has no plural antecedent that covers the depths of the `schema`.
- "the fragment of a format named `address`" → "a fragment of a format named `address`" — first mention, so "the" has nothing to point to; the replacement does not remove the second reading above.
- "To keep a user's identifier" → "To store a user's identifier" — "keep" also means "not lose".
