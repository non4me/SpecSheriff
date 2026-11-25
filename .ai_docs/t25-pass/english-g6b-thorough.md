### D:\SpecSheriff\.ai_docs\t25-pass\english-group6b.md · s-v4qus7raqnwzneb
TRANSLATION:
**Заголовок:** Как фиксируется одобрение.
**Текст:** `specs/_approvals.jsonl` фиксирует каждое одобрение формулировки узла спецификации и каждый отзыв такого одобрения отдельной строкой. `sheriff approve` и `sheriff approve --withdraw` дописывают каждую строку, которую пишут, в конец файла. Каждая строка — это текст, который `JSON.stringify` пишет без пробельных символов для объекта, содержащего только следующие ключи, в таком порядке:
- `sid` — sid узла;
- `fingerprint` — `fingerprint` формулировки, которую строка одобряет или одобрение которой строка отзывает;
- `withdrawn` со значением `true`; его содержит только строка, отзывающая одобрение;
- `by` — email, заданный в конфигурации git у того, кто одобряет формулировку или отзывает её одобрение.

Строка, содержащая `withdrawn`, — отзыв, любая другая строка — одобрение. Одобрение формулировки узла действует, если самая поздняя строка для sid узла и `fingerprint` этой формулировки является одобрением. Из строк для одного sid и одного `fingerprint` самая поздняя та, что стоит в файле последней.

Последнее одобрение узла — это последняя строка для sid узла, являющаяся одобрением, независимо от того, отзывает ли это одобрение более поздняя строка.
**Обоснование:** Одобрение узла определяет, можно ли менять его код. Поэтому инструменты SpecSheriff берут одобрение из записи, которую не меняет никакая правка узла и которая хранит каждое одобрение и каждый отзыв, каждый с адресом того, кто его сделал.
**Пример:** Правило R одобрили в формулировке с `fingerprint` F1, затем переформулировали и одобрили с `fingerprint` F2. Потом кто-то отозвал одобрение R, и в файл был дописан отзыв для F1, а затем для F2. Ни одно одобрение формулировок R не действует, поэтому R — черновик, а последнее одобрение R — строка, одобрившая F2. Самая вероятная ошибка — считать R одобренным, потому что какая-то строка файла одобряет его текущую формулировку, хотя более поздняя строка это одобрение отзывает.
TWO READINGS:
- "which only a line that withdraws an approval holds": (а) только такая строка содержит ключ `withdrawn`; (б) только такая строка содержит значение `true`. Контекст за (а).
- "the address of whoever made it": «адрес» без уточнения — (а) email; (б) любой другой адрес. Контекст за email; "it" — одобрение или отзыв.
LANGUAGE:
- "no edit of the node changes" → "no edit to the node changes" — an edit is made "to" a thing.
- "the address of whoever made it" → "the email address of whoever made it" — a general word without its object; the list above says "email address".

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6b.md · new:tools-11-fingerprint
TRANSLATION:
**Заголовок:** `fingerprint` формулировки узла.
**Текст:** `fingerprint` формулировки узла спецификации — это хеш SHA-256 от байтов UTF-8 одной строки. Хеш записывается 64 шестнадцатеричными цифрами в нижнем регистре.

Эта строка — текст, который `JSON.stringify` пишет без пробельных символов для объекта, построенного из узла. В этом тексте ключи каждого объекта отсортированы по кодовым единицам UTF-16. Каждый список сохраняет порядок своих элементов.

Объект содержит все свойства узла, кроме следующих:
- его `location`, `sid`, `kind` и `status`;
- его связи и его `meta`;
- узлы под ним;
- значения, собранные рядом с полем, которые `sheriff reindex` строит из других узлов;
- поле `archived` у узла архива;
- в `TableRule` — каждая ячейка, содержащая узел, поскольку у этого узла свой `fingerprint`.

Для узла в ячейке `TableRule` объект содержит ещё ключ `cell`. Его значение — объект, содержащий следующее (всё это часть формулировки узла):
- `column` — заголовок столбца узла;
- `group` — заголовок группы узла, равный `null`, если строки таблицы не сгруппированы;
- `row` — объект, содержащий текст каждой ячейки с текстом в строке узла, под ключом столбца этой ячейки.

Следующие ключи и типы узлов, которые `sheriff reindex` переименовывает в написанном более ранним релизом, входят в объект под именами, которые писал этот ранний релиз:
- `reason` узла — под ключом `rationale`;
- `TextRule.list.jsonSchema` или `TextRule.list.valueList` в `TextRule.list`, содержащем только одно из двух, — под ключом `declaredIn`, причём `pointer` первого или `symbol` второго — под ключом `declaration`;
- имя типа узла там, где значения поля — это sid узлов этого типа: `TextRule` как `rule`, `RecordType` как `recordType`, `header` как `domain`.

Для поля, значения которого берутся из источника `domains`, более ранние релизы писали пустой список его собственных значений под ключом `values`. Если у такого поля нет списка собственных значений, поле входит в объект с этим пустым списком.
**Обоснование:** Одобрение фиксирует формулировку по её `fingerprint`, чтобы изменение этой формулировки, и ничего другого, оставляло узел без действующего одобрения. Строка, построенная везде одинаково, даёт на каждой машине и в каждом релизе один и тот же `fingerprint` для одной и той же формулировки.
**Пример 1:** Правило одобрено, и правка добавляет к нему пример. `fingerprint` правила меняется, поэтому одобрение новой формулировки не действует, и `sheriff reindex` делает правило черновиком. Более поздняя правка добавляет связь к правилу и переносит его в другой раздел, а `fingerprint` остаётся прежним. Самая вероятная ошибка — не включить примеры в объект, из-за чего правило остаётся одобренным с примером, который не читал ни один ответственный.
**Пример 2:** Каждая строка `TableRule` содержит правило и текст о том, чего стоит нарушение этого правила. В одной строке эта цена меняется с `refused` на `reported`. `fingerprint` правила в этой строке меняется, так как текстовые ячейки его строки входят в его формулировку; меняется и `fingerprint` самого `TableRule`. Самая вероятная ошибка — строить объект для правила только из его собственных свойств, из-за чего правило остаётся одобренным с ценой, которую не одобрял ни один ответственный.
TWO READINGS:
- "That string": отсылает к "one string" из предыдущего абзаца — строке, от которой берётся хеш.
- "The object holds every property": "The object" отсылает к "an object built from the node" из предыдущего абзаца.
- "the name of a kind of node, where a field's values are the sids of that kind's nodes": (а) имя типа узла, записанное в объявлении поля, значения которого — sid узлов этого типа; (б) имя типа самого узла, если на узлы такого типа ссылается какое-то поле. Контекст за (а), так как `kind` узла из объекта исключён. Где именно стоит имя, текст не говорит.
- "a change to that wording, and to nothing else, leaves the node without an approval in force": (а) только изменение формулировки, а не чего-либо ещё, лишает узел действующего одобрения; (б) одобрения лишает изменение, затронувшее формулировку и больше ничего. Контекст за (а).
- "adds a link to the rule": (а) добавляет правилу связь, то есть в его `refs`; (б) добавляет где-то связь, указывающую на это правило. Контекст не различает; `fingerprint` не меняется в обоих случаях.
- "under the names that the earlier release wrote": "the earlier release" — тот же ранний релиз, что и "an earlier release" выше; в конце узла уже "earlier releases" во множественном числе, так что неясно, один релиз имеется в виду или несколько.
LANGUAGE:
- "the text of each cell that holds text in the node's row" → "the text of each cell in the node's row that holds text" — the place modifier belongs to "cell", not to "holds text".
- "a change to that wording, and to nothing else, leaves" → "only a change to that wording leaves" — the inserted phrase can be read as describing the change; not sure the replacement keeps the intended emphasis.
- "the text of what a failure of that rule costs" → "text that says what a failure of that rule costs" — "the text of what ... costs" does not parse on first reading.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6b.md · new:tools-11-approve
TRANSLATION:
**Заголовок:** Одобрение узла.
**Текст:** `sheriff approve <sid>...` одобряет каждый узел, который в ней назван. Для каждого такого узла команда дописывает в `specs/_approvals.jsonl` одобрение текущей формулировки узла. В одобрении указан тот, кто запускает команду.

Затем `sheriff approve` устанавливает статус узла в `approved`. Если одобрение текущей формулировки узла уже действует, команда ничего не дописывает и только устанавливает статус.

Если названный в `sheriff approve` узел — `TableRule`, команда одобряет и каждый узел в ячейках таблицы, так же как одобряет названный ей узел. Эти одобрения она дописывает после одобрения `TableRule`, в порядке строк таблицы, а внутри строки — в порядке столбцов.

`sheriff approve` отказывает в каждом из следующих случаев:
- sid не называет ни одного узла в файлах, которые хранит репозиторий. Пример — sid узла SpecSheriff guidelines или выбранного расширения в проекте, отличном от самого SpecSheriff: такой проект берёт эти узлы из плагина;
- раздел или, если проект выбрал расширение Domains, заголовок домена, поскольку статус одобрения того и другого `sheriff reindex` выводит из других узлов;
- узел, для которого запускающий команду не является ответственным.

Каждый отказ называет соответствующий sid. Отказ для узла, для которого запускающий не является ответственным, называет также ответственных за узел.

Если `sheriff approve` отказывает хотя бы по одному sid, названному в запуске, команда ничего не фиксирует. Если в конфигурации git не задан email, `sheriff approve` отказывается запускаться.

Зафиксировав одобрения, `sheriff approve` запускает `sheriff reindex`, который заново выводит статус одобрения каждого раздела.
**Обоснование:** Поскольку каждое одобрение фиксируется одной командой, инструменты SpecSheriff могут до фиксации одобрения проверить, что дающий его — ответственный за узел.
**Пример:** Правило базовой спецификации проекта — `TableRule`, каждая строка которого содержит одно состояние запроса в виде узла. Ответственный добавляет две строки, узлы которых — черновики, и запускает `sheriff approve` с sid таблицы. `sheriff approve` дописывает одобрение новой формулировки таблицы и по одному одобрению узла в каждой новой строке. Самая вероятная ошибка — одобрить только таблицу, из-за чего узлы новых строк остаются черновиками.
TWO READINGS:
- "as it approves a node that it names": (а) тем же способом, каким одобряет названный узел; (б) в то время как одобряет названный узел. Контекст за (а).
- "it records nothing": (а) не фиксирует ничего вообще, в том числе по остальным sid запуска; (б) ничего не фиксирует по отклонённому sid. Контекст за (а).
- "`sheriff approve` then sets the node's status": "the node" — каждый названный узел из предыдущего абзаца.
- "the files that the repository keeps": (а) файлы, которые лежат в репозитории; (б) файлы, которые репозиторий сохраняет, а не удаляет. Контекст за (а).
LANGUAGE:
- "the files that the repository keeps" → "the files kept in the repository" — a repository does not "keep" files as an agent; the passive is the usual wording.
- "a node of which whoever runs the command is not an owner" → "a node that whoever runs the command is not an owner of" — "of which whoever" stacks two relatives and is hard to parse.
- "The refusal of a node of which whoever runs the command is not an owner" → "The refusal of a node that whoever runs the command is not an owner of" — the same construction.
- "any sid that the run names" → "any sid given to the run" — a run does not name anything; the person or the command line does.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6b.md · new:tools-11-withdraw
TRANSLATION:
**Заголовок:** Отзыв одобрения узла.
**Текст:** `sheriff approve --withdraw <sid>...` отзывает одобрение каждого узла, который в ней назван. Если одобрение какой-либо формулировки такого узла действует — содержит узел эту формулировку сейчас или нет, — команда дописывает в `specs/_approvals.jsonl` строку, отзывающую это одобрение. В каждой такой строке указан тот, кто запускает команду. Команда дописывает эти строки в порядке первой строки в файле для каждой из этих формулировок.

Затем `sheriff approve --withdraw` устанавливает статус узла в `draft`. Если ни одно одобрение формулировок узла не действует, команда ничего не дописывает и только устанавливает статус.

Если названный в `sheriff approve --withdraw` узел — `TableRule`, команда отзывает только одобрения собственных формулировок таблицы. Чтобы отозвать одобрение узла в ячейке таблицы, запускающий команду называет этот узел.

`sheriff approve --withdraw` фиксирует отзыв от имени запускающего, входит он в число ответственных за узел или нет. Команда отказывает в каждом из следующих случаев:
- sid не называет ни одного узла в файлах, которые хранит репозиторий. Пример — sid узла SpecSheriff guidelines или выбранного расширения в проекте, отличном от самого SpecSheriff: такой проект берёт эти узлы из плагина;
- раздел или, если проект выбрал расширение Domains, заголовок домена, поскольку статус одобрения того и другого `sheriff reindex` выводит из других узлов.

Каждый отказ называет соответствующий sid. Если `sheriff approve --withdraw` отказывает хотя бы по одному sid, названному в запуске, команда ничего не фиксирует. Если в конфигурации git не задан email, `sheriff approve --withdraw` отказывается запускаться.

Зафиксировав отзывы, `sheriff approve --withdraw` запускает `sheriff reindex`.
**Обоснование:** Отзыв снимает одобрение с узла, а не только с формулировки, которую узел содержит сейчас. Одобрение, оставленное в силе для более ранней формулировки, позволило бы правке, восстанавливающей ту формулировку, снова сделать узел одобренным, хотя ни один ответственный его не одобрял.
**Пример:** Правило R одобрили, переформулировали и одобрили снова, так что действует одобрение каждой из его формулировок. Разработчик, не являющийся ответственным за R, обнаруживает, что R неверно, и запускает `sheriff approve --withdraw` с sid правила R. Команда дописывает отзыв для каждой из этих формулировок, и R становится черновиком. Самая вероятная ошибка — отозвать одобрение только текущей формулировки R, из-за чего правка, восстанавливающая прежнюю формулировку, снова делает R одобренным.
TWO READINGS:
- "it appends to `specs/_approvals.jsonl` a line": "it" — (а) команда; (б) ближайшие существительные, узел или одобрение. По смыслу (а), но подлежащее-команда осталось в предыдущем предложении.
- "a line that withdraws that approval": (а) одна строка на узел; (б) по строке на каждую формулировку с действующим одобрением. Дальнейшие "Each such line", "these lines" и пример говорят за (б), но само предложение стоит в единственном числе.
- "in the order of the first line in the file for each of those wordings": "those wordings" во множественном числе выше не названы, там "a wording". Вероятный смысл: строки-отзывы идут в том порядке, в каком в файле стоят первые строки соответствующих формулировок.
- "it records nothing": (а) не фиксирует ничего вообще; (б) ничего не фиксирует по отклонённому sid. Контекст за (а).
- "`sheriff approve --withdraw` then sets the node's status": "the node" — каждый названный узел из предыдущего абзаца.
- "without any owner approving it": "it" — (а) узел; (б) восстановленная формулировка. Смысл почти одинаков.
- "the files that the repository keeps": (а) файлы, которые лежат в репозитории; (б) файлы, которые репозиторий сохраняет. Контекст за (а).
LANGUAGE:
- "Where an approval of a wording (§s-5ah25f6gy99panq) of such a node is in force, whether or not the node holds that wording, it appends to `specs/_approvals.jsonl` a line that withdraws that approval (§s-v4qus7raqnwzneb)." → "For each wording (§s-5ah25f6gy99panq) of such a node whose approval is in force, whether or not the node holds that wording now, the command appends to `specs/_approvals.jsonl` a line that withdraws that approval (§s-v4qus7raqnwzneb)." — the singular sentence is followed by plural back-references, and "it" has no subject nearby.
- "in the order of the first line in the file for each of those wordings" → "in the order in which the first lines for those wordings come in the file" — "the order of the first line" is not an order; not sure the replacement keeps the meaning.
- "the files that the repository keeps" → "the files kept in the repository" — the same wording as in the node on approving.
- "any sid that the run names" → "any sid given to the run" — a run does not name anything.
- "whoever runs the command names that node" → "whoever runs the command names that node's sid" — the command takes sids; not sure the author wants this precision.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6b.md · new:tools-2-entries
TRANSLATION:
**Заголовок:** Записи настроек, которые меняет только ответственный.
**Текст:** `sheriff.config.json` хранит записи каждой настройки, которую меняет только ответственный за спецификацию, в отдельном списке под отдельным ключом:
- `approvalStatus` — для статуса одобрения спецификации: каждая запись содержит `status` со значением `approved` или `draft` и `by`;
- `strict` — для флага `strict` спецификации: каждая запись содержит `on` со значением `true` или `false` и `by`;
- `extensions` — для расширений guidelines, выбранных проектом: каждая запись содержит `name` (имя расширения), `chosen` со значением `true` или `false` и `by`.

`by` в записи содержит email ответственного, внёсшего изменение. Запись содержит только ключи, перечисленные выше для её списка.

`sheriff settings` дописывает каждую запись в конец её списка. В коммите каждый список начинается с записей, которые в этом списке содержит родитель коммита. Поэтому последняя запись списка — самая поздняя.

Статус одобрения спецификации и её флаг `strict` имеют значение, которое задаёт последняя запись соответствующего списка. Проект выбрал ровно те расширения, для которых последняя запись, называющая расширение, задаёт `chosen` равным `true`.

Если в `sheriff.config.json` нет записи о статусе одобрения, спецификацию не одобрял ни один ответственный, и она — черновик. Если нет записи о флаге `strict`, флаг имеет значение, которое схема `sheriff.config.json` даёт как `default` для `on` записи.

`sheriff settings` фиксирует запись, только если она меняет значение своей настройки. Иначе команда ничего не фиксирует и сообщает, что настройка уже имеет это значение.
**Обоснование:** Записи хранят каждое изменение, внесённое ответственным в эти настройки, с адресом внёсшего, а последняя запись каждого списка задаёт значение своей настройки. `sheriff reindex` пишет запись вместо правила, которым более ранний релиз одобрял спецификацию. Поскольку ни одна запись не содержит ничего зависящего от момента её написания, проверка записей никогда не принимает запись, которую пишет `sheriff reindex`, за изменённую.
**Пример:** `approvalStatus` содержит `{"status": "approved", "by": "a@example.com"}`, а за ней `{"status": "draft", "by": "b@example.com"}`. Спецификация — черновик, так как последняя запись возвращает её в черновик. Самая вероятная ошибка — считать спецификацию одобренной, потому что одна из записей её одобряет.
TWO READINGS:
- "The entries of the settings that only an owner changes" (заголовок): (а) настройки, которые менять вправе только ответственный; (б) настройки, которые фактически меняет только ответственный. Контекст за (а).
- "each setting that only an owner of the specification changes": те же два прочтения; контекст за (а).
- "never takes the entry that `sheriff reindex` writes for a changed one": (а) никогда не принимает запись, написанную `sheriff reindex`, за изменённую запись; (б) никогда не берёт запись, которую `sheriff reindex` пишет вместо изменённой записи. Контекст за (а).
- "says that the setting already has that value": "that value" выше не названо; вероятно, значение, которое просили установить.
- "the value that the last entry of its list sets": "its" — (а) список каждой из двух настроек; (б) список спецификации, как в стоящем рядом "its `strict` flag". Контекст за (а).
- "the rule by which an earlier release approved the specification": (а) правило, посредством которого в более раннем релизе одобрялась спецификация; (б) сам релиз одобрял спецификацию по этому правилу. Контекст за (а): одобряет ответственный, а не релиз.
LANGUAGE:
- "The entries of the settings that only an owner changes" → "The entries of the settings that only an owner may change" — the plain present reads as a habit, not a restriction; not sure the author wants "may" in a rule's title.
- "each setting that only an owner of the specification changes" → "each setting that only an owner of the specification may change" — the same.
- "each have the value that the last entry of its list sets" → "each have the value that the last entry of their own list sets" — plural "each have" with singular "its", next to another "its" with a different antecedent.
- "the rule by which an earlier release approved the specification" → "the rule through which the specification was approved under an earlier release" — a release approves nothing; not sure the replacement keeps the meaning.
- "the check of the entries" → "the check on the entries" — a check is made "on" a thing.
- "never takes the entry that `sheriff reindex` writes for a changed one" → "never mistakes the entry that `sheriff reindex` writes for a changed one" — "takes ... for" is split by "writes" and reads as "writes for".
- "returns it to draft" → "makes it a draft again" — missing article, and "return to draft" is not an established phrase.
- "each with the address of the owner who made it" → "each with the email address of the owner who made it" — a general word without its object.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6b.md · new:tools-2-approve-spec
TRANSLATION:
**Заголовок:** Одобрение спецификации.
**Текст:** Прежде чем `sheriff settings` зафиксирует запись, одобряющую спецификацию, команда выполняет все проверки, которых правило о статусе одобрения спецификации требует до одобрения спецификации. Это проверки, которые делают `sheriff validate`, `sheriff binding` и `sheriff citations`, и проверка на узел, из которого ничего не генерируется, которую делает `sheriff types`.

Эти проверки читают спецификацию как одобренную, что бы ни задавали записи в `sheriff.config.json`. Они оценивают файлы рабочего дерева так, как если бы один коммит добавлял следующее:
- каждый узел спецификации в файлах, которые хранит репозиторий;
- действующее одобрение каждого одобренного узла;
- весь код системы, включая тесты;
- файл привязок (bindings file).

Всё остальное, что хранит репозиторий, проверки считают не изменённым этим коммитом: например, архив, остальные строки `specs/_approvals.jsonl` и записи в `sheriff.config.json`. Собственные проверки проекта получают модель спецификации, в которой спецификация одобрена, а её флаг `strict` имеет значение, заданное этими записями.

`sheriff settings` делает проверку на узел, из которого ничего не генерируется, так же, как `sheriff types`, но не пишет файлов.

`sheriff settings` показывает ответственному, одобряющему спецификацию, всё, что находят эти проверки: каждый отказ, предупреждение и сообщение. Если они ничего не находят, команда фиксирует запись. Иначе она фиксирует запись только после того, как ответственный подтвердит одобрение, как сказано в узле о `sheriff settings`.

Пока флаг `strict` включён, `sheriff settings` сначала выполняет проверки, которые флаг делает строже, как при просьбе включить флаг. Если любая из них отклонила бы коммит, ничего не меняющий, `sheriff settings` отказывается фиксировать одобрение и других проверок не делает. Этот отказ такой же, как тот, что `sheriff settings` даёт, отказываясь включить флаг.
**Обоснование:** Проверки при коммите оценивают только то, что содержит коммит, поэтому никогда не показывают всего, чего ещё недостаёт спецификации и коду. Проверки перед одобрением оценивают всю спецификацию и весь код как один коммит и потому показывают ответственному всё, чего ещё недостаёт, до того как он одобрит спецификацию.
**Пример:** Спецификация — черновик, её флаг `strict` выключен. У одобренного правила R нет ни кода, ни теста, а одна старая функция не связана SpecTag ни с каким узлом. Агент запускает `sheriff settings status approved` без подключённого терминала. `sheriff settings` называет R, сообщая, что у R нет кода и теста, называет функцию и ничего не фиксирует. Ответственный соглашается на одобрение, и агент запускает команду снова с `--confirm`. Самая вероятная ошибка — прочитать одобрение R как такое, которое уже содержит родитель коммита. Тогда R не входит в правила, включённые в коммит, и ответственный так и не увидит, чего недостаёт R.
TWO READINGS:
- "These checks read the specification as approved" (начало второго абзаца): "These checks" — проверки, перечисленные в предыдущем абзаце.
- "it records the entry" (оба раза в пятом абзаце): "the entry" — запись, одобряющая спецификацию, названная только в первом абзаце.
- "`sheriff settings` first runs the checks": "first" — (а) раньше всех остальных проверок узла; (б) раньше фиксации записи. Следующее предложение ("makes no other check") говорит за (а).
- "the commit's parent" и "the rules that the commit includes" (пример): в примере никакой коммит не назван. Вероятно, это воображаемый единый коммит из текста узла.
- "no SpecTag binds an old function": (а) у старой функции нет SpecTag; (б) ни один SpecTag не связывает старую функцию с этим правилом. Контекст за (а).
- "they never show everything": (а) никогда не показывают всё целиком, только часть; (б) никогда ничего из этого не показывают. Контекст за (а).
- "the files that the repository keeps" и "everything else that the repository keeps": (а) то, что лежит в репозитории; (б) то, что репозиторий сохраняет. Контекст за (а).
LANGUAGE:
- "the files that the repository keeps" → "the files kept in the repository" — a repository does not "keep" files as an agent.
- "everything else that the repository keeps" → "everything else kept in the repository" — the same.
- "These checks read the specification as approved" → "These checks treat the specification as approved" — "read as" suggests interpreting a text; "treat" is used for the same thing in the next paragraph.
- "no SpecTag binds an old function" → "an old function has no SpecTag" — the negative subject invites the reading "no single SpecTag".
- "to read R's approval as one that the commit's parent already holds" → "to treat R's approval as one that the parent of that imagined commit already holds" — the example names no commit; not sure the replacement says what was meant.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6b.md · new:tools-2-strict
TRANSLATION:
**Заголовок:** Включение флага `strict`.
**Текст:** `sheriff settings` отказывается включать флаг `strict`, если какая-либо проверка, которую флаг делает строже, отклонила бы коммит или push, ничего не меняющий. Команда делает эти проверки на файлах рабочего дерева так, как если бы спецификация была одобрена, а флаг включён. Для каждой проверки, которая отказала бы, отказ называет команду, перечисляющую то, что эта проверка находит. Если ни одна такая проверка не отказала бы, `sheriff settings` фиксирует запись, включающую флаг.

Проверки, которые флаг `strict` делает строже, случаи, в которых каждая отклонила бы такой коммит или push, и команда, которую называет её отказ, таковы:
- проверка на код и тесты вне коммита, не связанные никаким SpecTag: она отказала бы там, где `sheriff untagged` перечислила бы какой-либо код, и её отказ называет `sheriff untagged`;
- каждая из собственных проверок проекта, любую из которых может сделать строже правило, перечисляющее её: такая проверка отказала бы там, где `sheriff validate --strict` отклоняет изменение из-за неё, и её отказ называет `sheriff validate --strict`.
**Обоснование:** Флаг позволяет ответственным сделать проверки строже собственным действием, не останавливая при этом всю работу. Будь флаг включён, пока какая-либо проверка, которую он делает строже, отклоняла бы ничего не меняющий коммит, каждый коммит был бы отклонён, или спецификацию нельзя было бы одобрить, пока эта проверка не пройдёт.
**Пример:** Спецификация — черновик, и две функции в старом файле не связаны никаким SpecTag. Ответственный запускает `sheriff settings strict on`. `sheriff settings` отказывается включать флаг и называет `sheriff untagged`, которая перечисляет эти функции. Самая вероятная ошибка — включить флаг, потому что спецификация — черновик. Тогда `sheriff settings` отказывается одобрять спецификацию, пока обе функции не будут связаны SpecTag.
TWO READINGS:
- "the command that its refusal names" (вводная фраза списка): "its refusal" — (а) отказ `sheriff settings`, относящийся к этой проверке; (б) собственный отказ проверки отклонить коммит. Первый абзац говорит за (а), грамматика за (б).
- "its refusal names `sheriff untagged`": те же два прочтения.
- "its refusal names `sheriff validate --strict`": те же два прочтения.
- "any of which the rule that lists it may make stricter": "may" — (а) правилу разрешено сделать проверку строже; (б) правило, возможно, делает её строже. Контекст за (а). Кроме того, здесь строже делает правило, а везде вокруг — флаг.
- "refuses the change because of it": "the change" не названо — речь шла о коммите, ничего не меняющем. "it" — такая проверка.
- "code and tests outside the commit (§s-3xx2eukc8gtd2tx) that no SpecTag (§s-8xw4mgvpexyvw5q) binds": придаточное относится (а) к коду и тестам; (б) к коммиту. Контекст за (а).
- "no SpecTag binds two functions in an old file": (а) у двух функций нет SpecTag; (б) нет такого SpecTag, который связывал бы сразу две функции. Контекст за (а).
- "until a SpecTag binds both functions": (а) пока у каждой функции не появится SpecTag; (б) пока один SpecTag не свяжет обе. Контекст за (а).
LANGUAGE:
- "the command that its refusal names" → "the command that the refusal of `sheriff settings` names for it" — "its" points to the check, but the refusal is that of `sheriff settings`; not sure this is what was meant.
- "its refusal names `sheriff untagged`" → "the refusal names `sheriff untagged` for it" — the same.
- "its refusal names `sheriff validate --strict`" → "the refusal names `sheriff validate --strict` for it" — the same.
- "no SpecTag binds two functions in an old file" → "two functions in an old file have no SpecTag" — the negative subject with a number reads as "no single SpecTag".
- "until a SpecTag binds both functions" → "until each of the two functions has a SpecTag" — reads as one SpecTag for both.
- "by an act of their own" → "by their own deliberate act" — unidiomatic; not sure "deliberate" is intended.
- "a commit or push that changes nothing" → "a commit or a push that changes nothing" — the second article is needed when two distinct things are meant.
- "such a commit or push" → "such a commit or such a push" — the same.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6b.md · new:tools-2-extension-off
TRANSLATION:
**Заголовок:** Отзыв выбора расширения.
**Текст:** `sheriff settings` отказывается фиксировать запись, отзывающую выбор расширения guidelines, пока от этого расширения что-либо зависит. Отказ называет каждый зависящий от расширения узел по его файлу, sid и расположению. Если от расширения ничего не зависит, `sheriff settings` фиксирует запись.

Узел, не входящий в собственные узлы расширения, зависит от расширения, если выполняется любое из следующего:
- тип узла — один из тех, что добавляет `kinds` схемы расширения;
- узел содержит свойство, которое `fields` схемы расширения добавляет типу этого узла;
- у узла есть связь, тип которой — один из `linkTypes` схемы расширения;
- у узла есть связь, содержащая свойство, которое добавляет `link` схемы расширения;
- у узла есть связь с узлом в файле расширения.

Узел архива зависит от расширения, если его тип — один из тех, что добавляет `kinds` схемы расширения. Отказ называет такой узел по его файлу и расположению, так как sid у него нет.

Ссылка в расширении схемы, принадлежащем проекту, зависит от расширения, если указывает на определение, которое добавляет `$defs` схемы расширения. Отказ называет такую ссылку по файлу расширения схемы проекта и JSON Pointer ссылки.

`sheriff settings` проверяет каждый узел в файлах, которые хранит репозиторий, включая узел в ячейке `TableRule`, каждый узел архива и каждую ссылку в расширении схемы проекта. Команда делает эту проверку независимо от того, одобрена спецификация или является черновиком.
**Обоснование:** Схема расширения объявляет, а его файл содержит всё, что расширение добавляет. Поэтому эти два источника показывают всё, что после отзыва выбора расширения осталось бы опирающимся на правила и определения, которые в проекте больше не действуют.
**Пример:** Проект выбрал расширение RecordType с именем `recordtype`, и базовая спецификация проекта содержит RecordType. Ответственный запускает `sheriff settings extension recordtype off`. `sheriff settings` отказывает и называет этот RecordType по его файлу, sid и расположению. Самая вероятная ошибка — искать только связи с узлами расширения, из-за чего узел типа, добавленного расширением, остаётся незамеченным.
TWO READINGS:
- "A reference in the project's extension of the schema (§s-xm8rz4uupb73gu5) depends on the extension": "the extension" — (а) расширение guidelines, выбор которого отзывают; (б) только что названное расширение схемы проекта. Контекст за (а).
- "the `$defs` of the extension's schema": "the extension's schema" — (а) схема расширения guidelines; (б) расширение схемы проекта. Контекст за (а).
- "those two show everything": "those two" — схема расширения и файл расширения из того же предложения.
- "rules and definitions that no longer hold in the project": "hold" — (а) больше не действуют; (б) больше не содержатся. Контекст за (а).
- "the files that the repository keeps": (а) файлы, которые лежат в репозитории; (б) файлы, которые репозиторий сохраняет. Контекст за (а).
LANGUAGE:
- "so those two show everything that withdrawing the choice of the extension would leave relying on rules and definitions that no longer hold in the project" → "so the two together show everything that would still rely on rules and definitions that no longer apply in the project once the choice of the extension is withdrawn" — "would leave relying on" stacks three verb forms and has to be read twice.
- "the files that the repository keeps" → "the files kept in the repository" — a repository does not "keep" files as an agent.
- "A reference in the project's extension of the schema (§s-xm8rz4uupb73gu5) depends on the extension where" → "A reference in the project's extension of the schema (§s-xm8rz4uupb73gu5) depends on the extension of the guidelines where" — two different extensions in one sentence; the general word needs its object.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6b.md · s-7unxytshhc4md54
TRANSLATION:
**Заголовок:** Настройка репозитория и удаление SpecSheriff из него.
**Текст:** `sheriff init` настраивает репозиторий для инструментов SpecSheriff. Для git-хуков команда делает следующее:
- пишет их в `.githooks/`;
- добавляет в индекс (stage) с исполняемым режимом 100755 каждый хук там, содержащий то, что она бы записала, если только индекс git уже не содержит этот хук с этим режимом, и называет каждый добавленный хук;
- если добавить хук в индекс не удаётся, называет хук и сообщает, как добавить его исполняемым;
- включает хуки, устанавливая `core.hooksPath` в `.githooks`.

`sheriff init` пишет следующее для агента, названного опцией `--agent` (`claude` или `codex`), или для `claude`, если опция не задана:
- для `claude` добавляет marketplace и плагин в `.claude/settings.json` так, как их объявляет проект, сохраняя там все прочие ключи;
- для `codex` пишет хуки агента для Codex в `.codex/hooks.json`, сохраняя там все прочие хуки.

Любое другое имя агента `sheriff init` отклоняет, называя поддерживаемых агентов.

`sheriff init` настраивает git на слияние `specs/_approvals.jsonl` объединением (union). Что делает `sheriff init`, зависит от состояния, которое `git check-attr merge specs/_approvals.jsonl` сообщает для атрибута `merge` этого файла:
- если git сообщает, что атрибут не задан, `sheriff init` дописывает строку `specs/_approvals.jsonl merge=union` в файл `.gitattributes` в корне репозитория и пишет этот файл, если его нет;
- если git сообщает `union`, `sheriff init` ничего не дописывает;
- если git сообщает любое другое состояние атрибута, `sheriff init` ничего не дописывает и называет это состояние.

Вне git-репозитория `sheriff init` дописывает эту строку в `.gitattributes`, если файл её ещё не содержит (без учёта пробелов и окончаний строк). Дописанная строка начинается с новой строки и заканчивается тем же окончанием строки, что и остальные строки файла.

`sheriff init` пишет каждый из следующих файлов, если его нет:
- `sheriff.config.json`, содержащий только `code` и `tests`, каждый — пустой список glob-шаблонов;
- `specs/_guidelines/project.json`, верхний узел которого — раздел, называющий ответственным за спецификацию email, заданный в конфигурации git.

Этот раздел содержит черновиком правило со связью `refines` с правилом о том, когда тесты должны проходить. Заголовок правила — «When the tests run». Его текст — «The tests run on every push.» Его обоснование — «Running the tests before every push keeps a change whose tests fail from reaching the project's shared branch.»

`TextRule.list` правила перечисляет `push`. `of` списка — «the moments at which the tests run».

Если в конфигурации git не задан email, `sheriff init` не пишет `project.json` и сообщает, как задать этот адрес.

Если `sheriff.config.json` содержит пустой список glob-шаблонов для кода или для тестов либо не содержит `testCommand`, `sheriff init` сообщает, как задать недостающее.

`sheriff init` заменяет хук или объявление, которое она пишет в `.claude/settings.json` или `.codex/hooks.json`, если этот хук или объявление содержит то, что писал более ранний релиз `sheriff init`, и называет каждое. Любой другой файл, отличающийся от того, что она бы записала, команда оставляет как есть и называет. Поэтому при повторном запуске `sheriff init` ничего не меняет.

Хук или объявление содержит написанное более ранним релизом, если без учёта окончаний строк совпадает с одним из текстов, которые писали более ранние релизы. Инструменты SpecSheriff хранят эти тексты.

Если раньше хуки репозитория запускались из другого места (из `.git/hooks/` или из другой папки, названной в `core.hooksPath`), `sheriff init` называет каждый найденный там хук, кроме образцов git. Команда сообщает, что каждый из них не запускается, пока его не перенесут в `.githooks/<hook>.d/`.

`sheriff remove` убирает из репозитория то, что `sheriff init` пишет вне `specs/`, для каждого агента, который поддерживает `sheriff init`:
- каждый git-хук, marketplace и плагин в `.claude/settings.json` и хуки агента для Codex в `.codex/hooks.json`, если каждый содержит то, что `sheriff init` пишет сейчас или писала в более раннем релизе;
- каждую строку файла `.gitattributes` в корне репозитория, совпадающую со строкой, которую туда дописывает `sheriff init`, без учёта пробелов и окончаний строк;
- `core.hooksPath`, если он называет `.githooks`;
- ключ в `.claude/settings.json` или `.codex/hooks.json`, оставшийся пустым, и любой из этих файлов, если в нём не осталось ключей;
- `.gitattributes`, если в нём остались только пустые строки;
- `.githooks/`, `.claude/` или `.codex/`, если папка осталась пустой;
- `sheriff.config.json`, что бы он ни содержал, включая записи настроек, которые меняет только ответственный за спецификацию.

`sheriff remove` оставляет каждый хук и каждое объявление, отличающееся от того, что пишет `sheriff init`, и называет его. `specs/` и файл привязок (bindings file) команда оставляет как есть и называет каждый из них. Она называет каждую оставленную папку `.githooks/<hook>.d/` и сообщает, что собственные инструменты проекта в ней больше не запускаются.

`sheriff remove` ничего не добавляет в индекс. При повторном запуске команда ничего не меняет.
**Обоснование:** Принятие метода и отказ от него требуют по одной команде, чтобы никому не нужно было знать каждый файл и каждую настройку, нужные инструментам SpecSheriff. То, что пишет `sheriff init`, доходит до каждого клона через git, поэтому проверки работают одинаково у всех, кто работает над проектом. Каждая команда меняет только то, что служит инструментам SpecSheriff, а остальной репозиторий оставляет проекту.
**Пример 1:** Кто-то запускает `sheriff init` в проекте на Windows. Git на Windows не читает исполняемый режим из файла, поэтому `sheriff init` добавляет в индекс с режимом 100755 каждый записанный ею хук и называет его. Самая вероятная ошибка — сделать хуки исполняемыми только на диске: git на Windows этот режим не записывает, и клон на Linux или macOS не запускает ни одного хука.
**Пример 2:** Две ветки одобряют по узлу, и каждая дописывает строку в `specs/_approvals.jsonl`. Поскольку `sheriff init` настроила git на слияние этого файла объединением, слияние сохраняет обе строки и ставит строку вливаемой ветки последней. Без слияния объединением git сообщает о конфликте в этом файле. Самая вероятная ошибка — разрешить конфликт, оставив строки одной ветки, из-за чего теряется одобрение, сделанное в другой.
**Пример 3:** Ответственный запускает `sheriff init` в новом репозитории. `project.json` после этого содержит раздел, который называет ответственного и содержит черновиком правило о том, когда запускаются тесты. Поэтому первый коммит проходит проверку того, что каждый раздел содержит правило. Самая вероятная ошибка — написать раздел без правила, что эта проверка отклоняет.
TWO READINGS:
- "The SpecSheriff tools keep those texts": (а) инструменты хранят у себя эти тексты, чтобы с ними сравнивать; (б) инструменты сохраняют эти тексты нетронутыми, не заменяя их. Контекст за (а), но предыдущий абзац говорит о замене, что подталкивает к (б).
- "leaves each hook and declaration that differs from what `sheriff init` writes": (а) отличается от того, что `sheriff init` пишет сейчас — тогда противоречит списку выше, где убирается и написанное ранним релизом; (б) отличается от всего, что `sheriff init` пишет или писала. Список выше говорит за (б).
- "it stages each hook there that holds what it would write, with the executable mode 100755": "with the executable mode 100755" — (а) добавляет в индекс с этим режимом; (б) то, что она записала бы с этим режимом. Контекст за (а).
- "appends that line to `.gitattributes`": "that line" — строка `specs/_approvals.jsonl merge=union` из списка в предыдущем абзаце.
- "That section holds, as a draft, a rule": "That section" — раздел из последнего пункта списка в предыдущем абзаце.
- "and writes that file where it is missing": (а) создаёт файл, если его нет, и дописывает строку; (б) записывает файл целиком. Контекст за (а).
- "the settings that only an owner of the specification changes": (а) вправе менять только ответственный; (б) фактически меняет только ответственный. Контекст за (а).
- "says how to set what it lacks": "it" — `sheriff.config.json`.
- "It says that each one does not run until it is moved": второе "it" — хук; первое "It" — `sheriff init`.
LANGUAGE:
- "`sheriff init` sets git to merge" → "`sheriff init` configures git to merge" — "set git to" is not an English collocation.
- "Because `sheriff init` set git to merge that file by union" → "Because `sheriff init` configured git to merge that file by union" — the same.
- "The SpecSheriff tools keep those texts." → "The SpecSheriff tools store those texts." — "keep" also means "leave unchanged", the opposite of the replacement just described.
- "each one does not run until it is moved" → "none of them will run until it is moved" — "each ... does not" is avoided in English in favour of "none".
- "So, run again, `sheriff init` changes nothing" → "So `sheriff init`, when run again, changes nothing" — two fronted elements with commas read as a stutter.
- "that differs from what `sheriff init` writes" → "that differs from everything that `sheriff init` writes now or wrote in an earlier release" — as written it contradicts the list above; not sure this is the meaning intended.
- "the settings that only an owner of the specification changes" → "the settings that only an owner of the specification may change" — the plain present reads as a habit, not a restriction.
- "and writes that file where it is missing" → "creating that file where it is missing" — "appends to the file and writes the file" puts the two acts in the wrong order.
- "which that check refuses" → "which fails that check" — a check refuses a commit, not a section; not sure the replacement keeps the meaning.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6b.md · proposal:s-gb8s9657a65hqmv-g6
TRANSLATION:
Предложение: полная новая формулировка согласованного черновика `proposal:s-gb8s9657a65hqmv-g3`, узел s-gb8s9657a65hqmv.
**Заголовок:** Что `sheriff reindex` меняет в написанном более ранним релизом.
**Текст:** `sheriff reindex` переписывает всё, что более ранний релиз инструментов SpecSheriff писал или читал иначе, чем релиз, к которому принадлежит `sheriff reindex`. Команда делает это после слияния дублирующихся ключей и до валидации файлов. В каждом файле спецификации и её архива она вносит следующие изменения:
- ключ узла `id` становится `location`;
- ключ узла `rationale` становится `reason`;
- типы узла `record` и `recordType` становятся `RecordType`;
- тип узла `rule` становится `TextRule`;
- тип узла `domain` становится `header`;
- статус узла `""` становится `draft`;
- статус узла `checked` становится `approved`;
- ключ узла `owner`, содержащий email, становится `owners`, содержащим список с этим email;
- `fields` и `unknown` у RecordType становятся его `schema`, а именно:
  - каждое поле становится свойством, схема которого — та, что задана для нейтрального типа поля;
  - `text` поля становится `description` свойства;
  - каждое поле, которое RecordType помечает обязательным, перечисляется в `required` схемы;
  - поле, обязательное только «where it holds a value», становится необязательным свойством;
  - `unknown: "refused"` становится `additionalProperties: false`;
- источник значений поля становится `x-enumSource` поля;
- `TextRule.list.declaredIn` удаляется, если указывает на поле `kinds` расширения схемы проекта;
- `TextRule.list.declaredIn` становится `TextRule.list.jsonSchema`, а его ключ `declaration` — `pointer`, если указывает на любое другое место в JSON Schema;
- `TextRule.list.declaredIn` становится `TextRule.list.valueList`, а его ключ `declaration` — `symbol`, если называет объявление в коде;
- связь типа `supersedes` удаляется;
- узел архива теряет свой sid и все связи, указывающие на него.

Переименованный ключ сохраняет своё место среди ключей узла. Тип узла переименовывается также там, где значения поля — это sid узлов этого типа, и там, где расширение схемы проекта объявляет `fields` для этого типа.

«Голый» sid — это слово, имеющее форму sid и встречающееся в одном из мест:
- оно открывает имя теста, и за ним идёт пробел или конец имени;
- оно — единственный аргумент метки теста.

`sheriff reindex` вносит также следующие изменения:
- `specs/_confirmations.jsonl` становится `specs/_approvals.jsonl`;
- ключ `owner` в каждой строке `specs/_confirmations.jsonl` становится `by`;
- если `specs/_approvals.jsonl` уже существует, строки `specs/_confirmations.jsonl` с переименованным ключом дописываются в него, а `specs/_confirmations.jsonl` удаляется;
- до тех пор пока `sheriff.config.json` не содержит записи, задающей статус одобрения спецификации, одобренное правило в `project.json`, уточняющее правило об этом статусе, заменяется записью, одобряющей спецификацию;
- эта запись называет ответственного, который последним одобрил это правило;
- это правило переносится в архив с причиной «Replaced by the entry in `sheriff.config.json` that records the specification's approval status»;
- до тех пор пока `sheriff.config.json` не содержит записи, задающей статус одобрения спецификации, правило-черновик в `project.json`, уточняющее правило об этом статусе, удаляется;
- если после архивации или удаления такого правила `project.json` не содержит правила, уточняющего правило о том, когда тесты должны проходить, под верхний узел `project.json` добавляется черновик правила о том, когда запускаются тесты, который пишет `sheriff init`;
- ключ `writesSpecSheriffGuidelines` удаляется из `sheriff.config.json` до того, как инструменты SpecSheriff валидируют этот файл;
- в каждом файле, который `sheriff.config.json` называет тестами кода системы, собственной проверки проекта или генератора, перед каждым «голым» sid вставляется `@spec `.

`sheriff reindex` оставляет без изменений RecordType, содержащий поле типа `variant`, поле со значениями из источника `domains` или поле с пустым собственным списком значений, и называет этот RecordType и каждое такое поле.

Если узел спецификации имеет тип или содержит связь типа, который добавляет расширение guidelines, а проект это расширение ещё не выбрал, `sheriff reindex` называет это расширение.

Добавляя черновик правила о том, когда запускаются тесты, `sheriff reindex` называет это правило, поскольку инструменты SpecSheriff читают правило только после одобрения ответственным.

Переименованный ключ и переименованный тип узла не меняют `fingerprint` узла, поэтому одобрение формулировки узла остаётся в силе.

`sheriff reindex` называет каждый файл, который переписывает из-за того, что более ранний релиз писал или читал этот файл иначе, включая файлы спецификации.
**Обоснование:** Каждый файл и каждый тест проекта написан в форме того релиза инструментов SpecSheriff, который последним его писал или читал. Релиз, который пишет или читает их иначе, переписывает их, чтобы никому не пришлось переписывать проект вручную и ни одно одобрение не потерялось из-за переименования.
TWO READINGS:
- "until `sheriff.config.json` holds an entry that sets the specification's approval status" (первое вхождение, об одобренном правиле): (а) если такой записи ещё нет — условие на момент запуска; (б) повторяющееся действие, длящееся до появления записи. Контекст за (а).
- "until `sheriff.config.json` holds an entry that sets the specification's approval status" (второе вхождение, о правиле-черновике): те же два прочтения.
- "where a field's values are the sids of that kind's nodes": (а) имя типа переименовывается в объявлении поля, значения которого — sid узлов этого типа; (б) тип переименовывается у узлов, на которые ссылается такое поле. Контекст за (а), но где стоит переименовываемое имя, не сказано.
- "the project has yet to choose that extension": (а) проект не выбрал расширение; (б) проект пока не выбрал, но выберет. Английское "has yet to" подразумевает (б).
- "the test's mark": какой тест, не названо; вероятно, pytest-метка любого теста.
- "where it points to any other place in a JSON Schema": "any other" — другое по отношению к полю `kinds` расширения схемы проекта из предыдущего пункта.
- "that entry names the owner who last approved that rule" и "that rule is moved to the archive": "that entry", "that rule" отсылают к предыдущему пункту списка; пункт о черновике идёт после них, и "that rule" там уже другое правило.
LANGUAGE:
- "until `sheriff.config.json` holds an entry that sets the specification's approval status, an approved rule" → "where `sheriff.config.json` holds no entry that sets the specification's approval status, an approved rule" — "until" with a one-time change reads as a repeated action.
- "until `sheriff.config.json` holds an entry that sets the specification's approval status, a draft rule" → "where `sheriff.config.json` holds no entry that sets the specification's approval status, a draft rule" — the same.
- "the project has yet to choose that extension" → "the project has not chosen that extension" — "has yet to" implies that it will.
- "occurs in one of these places" → "meets one of these conditions" — the two items that follow are clauses about the word, not places.
- "it is the only argument of the test's mark" → "it is the only argument of a test's pytest mark" — no test has been named, and "mark" needs its object.
- "A kind of node is also renamed where a field's values are the sids of that kind's nodes" → "The name of a kind of node is also changed in a field that declares its values to be the sids of that kind's nodes" — the sentence does not say where the name stands; not sure the replacement says what was meant.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6b.md · proposal:s-7pk89t8z6wymmj9-g6
TRANSLATION:
Предложение: полная новая формулировка согласованного черновика `s-7pk89t8z6wymmj9`, узел s-7pk89t8z6wymmj9.
**Заголовок:** Как запускается собственная проверка проекта.
**Текст:** Если проверка, добавленная собственными guidelines проекта, не проходит, `sheriff validate` отклоняет изменение. Если правило, перечисляющее проверку, говорит, что её провал только сообщается, `sheriff validate` вместо этого сообщает о провале. Отказ или сообщение называет проверку и показывает, что она вывела в стандартный вывод и в стандартный поток ошибок. Если проверка ничего не вывела, отказ или сообщение показывает её код завершения.

`sheriff validate` запускает каждую собственную проверку проекта командой, которую для неё называет `sheriff.config.json`. Проверка выполняется в каталоге, в котором выполняется `sheriff validate`. При коммите этот каталог содержит то, что содержит коммит. На стандартный ввод проверка получает модель спецификации в том виде, в каком её печатает `sheriff json`. Проверка проходит, только если её процесс завершается с кодом ноль.

В своём `TextRule.list` правило, которое `sheriff.config.json` называет для проверки, перечисляет проверку как элемент, значение которого — имя проверки. `sheriff validate` читает это правило в его последней одобренной формулировке. Если правило в этой формулировке не перечисляет элемента со значением, равным имени проверки, `sheriff validate` отклоняет изменение. Отказ называет проверку и правило и сообщает, что последняя одобренная формулировка правила проверку не перечисляет.

Если элемент, перечисляющий проверку, — объект с `onFailure`, равным `reported`, правило говорит, что провал проверки только сообщается. Если `onFailure` этого элемента равен `reportedUnlessStrict`, правило говорит, что провал проверки только сообщается, пока флаг `strict` спецификации выключен. `sheriff validate` читает флаг из модели спецификации, которую передаёт проверке.

`sheriff validate` запускает собственные проверки проекта только после того, как файлы спецификации прошли проверку на ключ, записанный более одного раза, и валидацию по схеме. Команда запускает их до остальных своих проверок. Остальные проверки она делает независимо от того, что находят собственные проверки проекта.

`sheriff validate` отклоняет изменение, если одна из собственных проверок проекта добавляет, меняет или удаляет файл в каталоге, в котором выполняется проверка, кроме файла, который git игнорирует. Отказ называет проверку и каждый такой файл.

С опцией `--strict` `sheriff validate` передаёт каждой собственной проверке проекта модель спецификации, в которой спецификация одобрена, а её флаг `strict` включён. Команда делает так независимо от того, как записи в `sheriff.config.json` задают статус одобрения и флаг. Остальные проверки `sheriff validate` дают одинаковые результаты с опцией и без неё.

Прежде чем `sheriff settings` зафиксирует одобрение спецификации, команда запускает собственные проверки проекта. Она передаёт им модель, в которой спецификация одобрена, а флаг `strict` имеет значение, заданное записями в `sheriff.config.json`.

`sheriff validate` запускает собственные проверки проекта независимо от того, одобрена спецификация или является черновиком.
**Обоснование:** Всякий раз, когда `sheriff validate` делает свои проверки SpecSheriff guidelines, команда запускает и собственные проверки проекта, на тех же файлах. Поэтому такая проверка обязательна для каждого участника, а не зависит от того, кто вспомнит её запустить.
**Пример 1:** У правила, перечисляющего собственные проверки проекта, `TextRule.list.property` равно `name`, и один из его элементов — `{"name": "spelling", "onFailure": "reported"}`. Проверка `spelling` находит слово с ошибкой в тексте узла, печатает sid узла и завершается с кодом 1. `sheriff validate` сообщает о провале, показывая sid, и коммит проходит. Самая вероятная ошибка — отклонить коммит, потому что код завершения проверки не ноль.
**Пример 2:** Элемент, перечисляющий проверку `spelling`, — `{"name": "spelling", "onFailure": "reportedUnlessStrict"}`. Пока флаг `strict` выключен, `sheriff validate` сообщает о каждом слове с ошибкой, и коммит проходит. Ответственный запускает `sheriff settings strict on`, и проверка не проходит, когда её запускает `sheriff validate --strict`, поэтому `sheriff settings` отказывается включать флаг и называет `sheriff validate --strict`. Самая вероятная ошибка — читать флаг из записей в `sheriff.config.json`, а не из модели, которую получает проверка. Тогда флаг включается, и следующий коммит отклоняется.
TWO READINGS:
- "the check's failure is only reported while the specification's `strict` flag (§s-q3pfzyaxvpr2zj2) is off": (а) пока флаг выключен, о провале лишь сообщается, без отказа; (б) о провале сообщается только пока флаг выключен, а при включённом не сообщается вовсе. Контекст за (а).
- "makes its checks of the SpecSheriff guidelines": (а) проверки, которые задают SpecSheriff guidelines; (б) проверки самих guidelines, то есть их текста. Контекст за (а).
- "On a commit, that directory holds what the commit contains": (а) каталог содержит только содержимое коммита; (б) каталог среди прочего содержит то, что в коммите. Контекст за (а).
- "refuses the change": "the change" в первом предложении ничем не названо; вероятно, проверяемый коммит или правка.
- "The refusal or the report names the check and shows what the check printed": сообщение, а не только отказ, показывает вывод. Но слово "report" здесь значит сообщение `sheriff validate`, а ниже "is only reported" — способ обращения с провалом; читатель может принять их за разное.
LANGUAGE:
- "the check's failure is only reported while the specification's `strict` flag (§s-q3pfzyaxvpr2zj2) is off" → "while the specification's `strict` flag (§s-q3pfzyaxvpr2zj2) is off, the check's failure is only reported" — "only" next to "while" attaches to the wrong clause.
- "makes its checks of the SpecSheriff guidelines" → "makes the checks that the SpecSheriff guidelines require" — "checks of X" reads as checks performed on X; not sure "require" is the intended relation.
- "On a commit, that directory holds" → "At a commit, that directory holds" — a hook runs "at" or "on" a commit, but a directory's state is given "at" one; "at a commit" is also the wording used in the node on approving the specification.
- "rather than depending on whoever remembers to run it" → "rather than depending on someone remembering to run it" — "depending on whoever remembers" says that it depends on a person, not on the act of remembering.
