### english-group6.md · new:tools-11-section
TRANSLATION: Заголовок: «Одобрения узлов». Текст: Как инструменты SpecSheriff записывают одобрение узла и отзыв этого одобрения и как они определяют, действует ли одобрение.
TWO READINGS: none
LANGUAGE:
- "The approvals of nodes" → "Approvals of nodes" — a title that names a general subject takes no definite article; "The approvals" reads as some particular approvals already mentioned.

### english-group6.md · s-v4qus7raqnwzneb
TRANSLATION: Заголовок: «Как записывается одобрение». Текст: `specs/_approvals.jsonl` записывает каждое одобрение формулировки узла и каждый отзыв такого одобрения отдельной строкой. Каждая строка дописывается в конец файла. Каждая строка — это текст, который пишет `JSON.stringify`, без пробельных символов, для объекта только со следующими ключами, в этом порядке:
- `sid` — sid узла;
- `fingerprint` — `fingerprint` (отпечаток) формулировки, которую строка одобряет или одобрение которой строка отзывает;
- `withdrawn` со значением `true` — только в строке, отзывающей одобрение;
- `by` — email, который конфигурация git задаёт для того, кто одобряет или отзывает.

Строка называет того, кто одобряет или отзывает, только этим email. Поэтому одобрение, которое агент делает от имени ответственного, имеет ту же форму, что и одобрение самого ответственного.

Строка без `withdrawn` — одобрение. Одобрение формулировки узла действует, если самая поздняя строка для sid узла и `fingerprint` этой формулировки — одобрение. Самая поздняя строка — последняя в файле.

Последнее одобрение узла — последняя строка для sid узла, являющаяся одобрением, независимо от того, отзывает ли его более поздняя строка.

Причина: Одобрение записывается отдельно от узла, чтобы никто не мог сделать узел одобренным, отредактировав узел. Строки в файл только дописываются, чтобы каждое одобрение оставалось зафиксированным вместе с тем, кто его дал.

Пример: Правило R одобрили с формулировкой, `fingerprint` которой F1, затем переформулировали и одобрили с F2. Потом кто-то отозвал одобрение R, из-за чего был дописан отзыв для F1, а затем для F2. Ни одно одобрение формулировки R не действует, поэтому R — черновик, а последнее одобрение R — строка, одобрившая F2. Самая вероятная ошибка — считать R одобренным, потому что строка в файле одобряет его текущую формулировку, хотя более поздняя строка это одобрение отзывает.
TWO READINGS:
- "The latest line is the last one in the file.": (а) самая поздняя строка — последняя строка всего файла; (б) последняя в файле среди строк с этим sid и этим `fingerprint`. Буквально читается (а), контекст требует (б).
- "stays on record with whoever gave it": (а) остаётся записанным вместе с указанием того, кто его дал; (б) остаётся записанным «у» того, кто его дал. Контекст — (а).
- "No approval of R's wording is in force": (а) не действует одобрение текущей формулировки R; (б) не действует одобрение ни одной из формулировок R. Пример подразумевает (б), но единственное число "wording" читается как (а).
LANGUAGE:
- "for whoever approves or withdraws" → "for whoever approves the wording or withdraws the approval" — "withdraw" needs an object; without one it reads as "leaves".
- "A line names whoever approves or withdraws only by that email address" → "A line names whoever approves the wording or withdraws the approval only by that email address" — the same missing object.

### english-group6.md · new:tools-11-fingerprint
TRANSLATION: Заголовок: «`fingerprint` формулировки узла». Текст: `fingerprint` формулировки узла — это хеш SHA-256 от байтов UTF-8 одной строки, записанный 64 шестнадцатеричными цифрами в нижнем регистре. Эта строка — текст, который пишет `JSON.stringify`, без пробельных символов, для объекта, построенного из узла. В этом тексте ключи каждого объекта отсортированы по кодовым единицам UTF-16, а каждый список сохраняет свой порядок.

Объект содержит все свойства узла, кроме следующих:
- его `location`, `sid`, `kind` и `status`;
- его связи и его `meta`;
- узлы под ним;
- значения, собранные рядом с полем, которые `sheriff reindex` строит из других узлов;
- поле `archived` узла архива;
- в `TableRule` — каждая ячейка, содержащая узел, поскольку у этого узла свой `fingerprint`.

Для узла в ячейке `TableRule` объект содержит также ключ `cell`. Его значение — объект, содержащий следующее, что является частью формулировки узла:
- `column` — заголовок столбца узла;
- `group` — заголовок группы узла, равный `null`, если строки таблицы не сгруппированы;
- `row` — объект с текстом каждой ячейки строки узла, содержащей текст, под ключом столбца этой ячейки.

Следующие имена, которые `sheriff reindex` меняет в том, что записал более ранний релиз, появляются в объекте так, как их писал более ранний релиз:
- `reason` узла — под ключом `rationale`;
- `TextRule.list.jsonSchema` или `TextRule.list.valueList`, в списке, который содержит только одно из них, — под ключом `declaredIn`, а его `pointer` или `symbol` — под ключом `declaration`;
- имя типа узла, sid узлов которого являются значениями поля: `TextRule` как `rule`, `RecordType` как `recordType`, `header` как `domain`.

Для поля, значения которого берутся из источника `domains`, более ранние релизы писали пустой список его собственных значений под ключом `values`. Если у такого поля нет списка собственных значений, оно появляется в объекте с этим пустым списком.

Причина: Одобрение записывает формулировку по её `fingerprint`, чтобы изменение этой формулировки, и ничего другого, оставляло узел без действующего одобрения. Строка, построенная везде одинаково, даёт каждой машине и каждому релизу один и тот же `fingerprint` для одной и той же формулировки.

Пример 1: Правило одобрено, и правка добавляет к нему пример. `fingerprint` правила меняется, поэтому одобрение новой формулировки не действует, и `sheriff reindex` делает правило черновиком. Более поздняя правка добавляет связь к правилу и переносит его в другую секцию, а его `fingerprint` остаётся прежним. Самая вероятная ошибка — не включить примеры в объект, так что правило остаётся одобренным с примером, который не читал ни один ответственный.

Пример 2: Каждая строка `TableRule` содержит правило и текст о том, чего стоит невыполнение этого правила. Цена в одной строке меняется с `refused` на `reported`. `fingerprint` правила в этой строке меняется, так как текстовые ячейки его строки входят в его формулировку, и `fingerprint` самого `TableRule` тоже меняется. Самая вероятная ошибка — строить объект правила только из его собственных свойств, так что правило остаётся одобренным с ценой, которую не одобрял ни один ответственный.
TWO READINGS:
- "written as 64 lowercase hexadecimal digits": (а) так записан хеш; (б) так записана строка ("one string" стоит ближе). Контекст — (а).
- "in a list that holds only one of them": (а) в свойстве `list` узла, где есть только одно из двух (нет обоих сразу); (б) в каком-то списке, содержащем ровно один такой элемент. Вероятно (а), но "a list" не говорит, что это `TextRule.list`.
- "and to nothing else": (а) только изменение формулировки, а не изменение чего-либо иного, лишает узел действующего одобрения; (б) изменение, которое затрагивает формулировку и больше ничего. Контекст — (а).
- "adds a link to the rule and moves it to another section": (а) добавляет правилу связь (исходящую); (б) добавляет связь, указывающую на правило. "it" — правило (не связь). Контекст — (а).
- "The following names": указывает на перечень ниже, но первые два пункта называют не имена, а значения под ключами; читатель ждёт списка имён.
LANGUAGE:
- "the name of a kind of node whose nodes' sids are a field's values" → "the name of a kind of node, where a field's values are the sids of the nodes of that kind" — the double possessive "whose nodes' sids" is hard to parse.
- "the object of the rule" → "the object for the rule" — "the object of the rule" reads as "the purpose of the rule".

### english-group6.md · new:tools-11-approve
TRANSLATION: Заголовок: «Одобрение узла». Текст: `sheriff approve <sid>...` одобряет каждый узел, который называет. Для каждого такого узла команда дописывает в `specs/_approvals.jsonl` одобрение текущей формулировки узла, которое называет того, кто запускает команду.

Затем `sheriff approve` устанавливает статус узла в `approved`. Если одобрение текущей формулировки узла уже действует, команда ничего не дописывает и только устанавливает статус.

Если узел, названный `sheriff approve`, — `TableRule`, команда одобряет также каждый узел в ячейках таблицы, для которого не действует одобрение его текущей формулировки. Эти одобрения она дописывает после одобрения `TableRule`, в порядке строк таблицы.

`sheriff approve` отказывает в каждом из следующих случаев:
- sid, который не называет никакого узла в файлах, хранящихся в репозитории;
- секция, а также заголовок домена, если проект выбрал расширение Domains, чей статус одобрения `sheriff reindex` выводит из других узлов;
- узел, ни одним из ответственных за который не является тот, кто запускает команду.

В проекте, отличном от самого SpecSheriff, узлы SpecSheriff guidelines и выбранного расширения приходят с плагином, а не из файлов, хранящихся в репозитории.

Каждый отказ называет соответствующий sid. Отказ по узлу, среди ответственных за который нет запускающего команду, называет также этих ответственных.

Если `sheriff approve` отказывает хотя бы по одному узлу, названному в запуске, она ничего не записывает. Если конфигурация git не задаёт email, `sheriff approve` отказывается запускаться.

Записав одобрения, `sheriff approve` запускает `sheriff reindex`, который заново выводит статус одобрения каждой секции.

Причина: Запись каждого одобрения через одну команду позволяет инструментам SpecSheriff проверить до записи одобрения, что тот, кто его даёт, — ответственный за узел.

Пример: Правило базовой спецификации проекта — `TableRule`, каждая строка которого содержит одно состояние запроса как узел. Ответственный добавляет две строки, узлы которых — черновики, и запускает `sheriff approve` с sid таблицы. `sheriff approve` дописывает одобрение новой формулировки таблицы и по одному одобрению для узла в каждой новой строке. Самая вероятная ошибка — одобрить только таблицу, так что узлы новых строк остаются черновиками.
TWO READINGS:
- "an approval of the node's current wording (§s-v4qus7raqnwzneb), which names whoever runs the command": (а) запускающего называет одобрение; (б) запускающего называет формулировка. Контекст — (а).
- "a section, and the header of a domain where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm, §s-yccuyqbypzzx2gu), whose approval status `sheriff reindex` derives from other nodes": "whose" — (а) и секции, и заголовка домена; (б) только заголовка домена; (в) расширения Domains. Контекст — (а), грамматика допускает все три.
- "In a project other than SpecSheriff itself, the nodes of the SpecSheriff guidelines and of a chosen extension (§s-9ttvcwpqkehm58g) come with the plugin": абзац не говорит, что из этого следует для `sheriff approve`. Читатель должен сам догадаться, что такие узлы подпадают под первый пункт отказа (их sid не называет узла в файлах репозитория).
LANGUAGE:
- "a node none of whose owners (§s-6sk8uet75dmq5qz) is whoever runs the command" → "a node of which whoever runs the command is not an owner (§s-6sk8uet75dmq5qz)" — "none of whose owners is whoever" is a construction a native writer would avoid.
- "come with the plugin rather than from the files that the repository keeps" → "come with the plugin rather than being read from the files that the repository keeps" — "come with … rather than from" joins two prepositions that do not share the verb; I am not sure "being read" is the verb the author meant.

### english-group6.md · new:tools-11-withdraw
TRANSLATION: Заголовок: «Отзыв одобрения узла». Текст: `sheriff approve --withdraw <sid>...` отзывает одобрение каждого узла, который называет. Для каждой формулировки такого узла, одобрение которой действует, — независимо от того, имеет ли узел эту формулировку сейчас, — команда дописывает в `specs/_approvals.jsonl` строку, отзывающую это одобрение. Каждая такая строка называет того, кто запускает команду.

Затем `sheriff approve --withdraw` устанавливает статус узла в `draft`. Если не действует одобрение ни одной формулировки узла, команда ничего не дописывает и только устанавливает статус.

`sheriff approve --withdraw` записывает отзыв от любого, кто её запускает, независимо от того, является ли этот человек ответственным за узел. Она отказывает в каждом из следующих случаев:
- sid, который не называет никакого узла в файлах, хранящихся в репозитории;
- секция, а также заголовок домена, если проект выбрал расширение Domains, чей статус одобрения `sheriff reindex` выводит из других узлов.

В проекте, отличном от самого SpecSheriff, узлы SpecSheriff guidelines и выбранного расширения приходят с плагином, а не из файлов, хранящихся в репозитории.

Каждый отказ называет соответствующий sid. Если `sheriff approve --withdraw` отказывает хотя бы по одному узлу, названному в запуске, она ничего не записывает. Записав отзывы, она запускает `sheriff reindex`.

Причина: Отзыв забирает одобрение узла, а не только одобрение той формулировки, которую узел имеет сейчас. Одобрение, оставшееся в силе для более ранней формулировки, позволило бы правке, восстанавливающей эту формулировку, снова сделать узел одобренным без одобрения какого-либо ответственного.

Пример: Правило R одобрили, переформулировали и одобрили снова, так что действует одобрение каждой из его формулировок. Разработчик, не являющийся ответственным за R, считает R неверным и запускает `sheriff approve --withdraw` с sid R. Команда дописывает отзыв для каждой из этих формулировок, и R становится черновиком. Самая вероятная ошибка — отозвать только одобрение текущей формулировки R, так что правка, восстанавливающая более раннюю формулировку R, снова делает R одобренным.
TWO READINGS:
- "For each wording (§s-5ah25f6gy99panq) of such a node whose approval is in force": "whose approval" — (а) одобрение формулировки; (б) одобрение узла. Контекст — (а).
- "records a withdrawal by whoever runs it": (а) записывает отзыв, сделанный любым запустившим; (б) записывает отзыв, указывая запустившего. Контекст — (а).
- "a section, and the header of a domain where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm, §s-yccuyqbypzzx2gu), whose approval status `sheriff reindex` derives from other nodes": "whose" — (а) и секции, и заголовка домена; (б) только заголовка; (в) расширения. Контекст — (а).
- "that person": запускать команду может и агент; "person" читается как «человек».
- "In a project other than SpecSheriff itself, the nodes of the SpecSheriff guidelines and of a chosen extension (§s-9ttvcwpqkehm58g) come with the plugin": абзац не говорит, что из этого следует для команды; читатель сам догадывается, что такие узлы подпадают под первый пункт отказа.
LANGUAGE:
- "come with the plugin rather than from the files that the repository keeps" → "come with the plugin rather than being read from the files that the repository keeps" — mismatched prepositions after one verb; I am not sure "being read" is the verb the author meant.
- "finds R wrong" → "finds that R is wrong" — "finds R wrong" is terse and reads as a verdict rather than a discovery.

### english-group6.md · new:tools-2-entries
TRANSLATION: Заголовок: «Записи настроек, которые меняет только ответственный». Текст: `sheriff.config.json` хранит записи каждой настройки, которую меняет только ответственный за спецификацию, в её собственном списке под собственным ключом:
- `approvalStatus` — для статуса одобрения спецификации: каждая запись содержит `status` со значением `approved` или `draft` и `by`;
- `strict` — для флага `strict` спецификации: каждая запись содержит `on` со значением `true` или `false` и `by`;
- `extensions` — для расширений guidelines, выбранных проектом: каждая запись содержит `name` (имя расширения), `chosen` со значением `true` или `false` и `by`.

Значение `by` записи — email, которым `sheriff settings` называет ответственного, сделавшего изменение. Запись содержит только ключи, указанные выше для её списка.

`sheriff settings` дописывает каждую запись в конец её списка, а коммит держит записи своего родителя первыми. Поэтому последняя запись списка — самая поздняя.

Статус одобрения спецификации и её флаг `strict` имеют значения, которые задаёт последняя запись их списков. Проект выбрал ровно те расширения, для которых последняя запись `extensions`, называющая расширение, устанавливает `chosen` в `true`.

Если в `approvalStatus` нет записей, спецификацию не одобрил ни один ответственный, и она — черновик. Если в `strict` нет записей, флаг имеет значение по умолчанию, которое задаёт схема `sheriff.config.json`.

`sheriff settings` записывает запись, только если она меняет значение своей настройки. Иначе команда ничего не записывает и сообщает, что настройка уже имеет это значение.

Причина: Записи хранят каждое изменение, которое ответственный внёс в эти настройки, каждое — с тем, кто его внёс, а последняя запись каждого списка даёт своей настройке значение. `sheriff reindex` пишет запись вместо правила, которым более ранний релиз одобрял спецификацию. Запись не содержит ничего, что зависит от момента её записи, так что эта запись имеет один и тот же текст, когда бы её ни записали.

Пример: `approvalStatus` содержит `{"status": "approved", "by": "a@example.com"}`, а за ней `{"status": "draft", "by": "b@example.com"}`. Спецификация — черновик, так как последняя запись возвращает её в черновик. Самая вероятная ошибка — считать спецификацию одобренной, потому что одна из записей её одобряет.
TWO READINGS:
- "a commit keeps the entries of its parent first": (а) коммит сохраняет записи родительского коммита в начале каждого списка, а новые идут после; (б) коммит «сначала» (прежде всего остального) сохраняет записи родителя. Контекст — (а). Неясно также, требование это или описание.
- "this entry": (а) запись, которую пишет `sheriff reindex` (названа предложением раньше); (б) любая запись, о которой идёт речь в этом же предложении. Вероятно (а), но "An entry … this entry" в одном предложении читается как (б).
- "whenever it is written": (а) в какой бы момент её ни записали; (б) каждый раз, когда её записывают. Контекст — (а).
LANGUAGE:
- "have the values that the last entry of their lists sets" → "each have the value that the last entry of its list sets" — two settings, two lists and one "last entry" do not agree in number.
- "gives its setting a value" → "gives its setting its current value" — "a value" suggests some value or other; I am not sure "current" is the exact sense meant.
- "each with whoever made it" → "each with the address of whoever made it" — "with whoever made it" reads as "in that person's company".

### english-group6.md · new:tools-2-approve-spec
TRANSLATION: Заголовок: «Одобрение спецификации». Текст: Прежде чем `sheriff settings` запишет запись, одобряющую спецификацию, она запускает все проверки, которых правило о статусе одобрения спецификации требует перед одобрением: проверки, которые делают `sheriff validate`, `sheriff binding` и `sheriff citations`.

Эти проверки читают спецификацию как одобренную, что бы ни задавали записи в `sheriff.config.json`. Они оценивают файлы рабочего дерева как один коммит, добавляющий следующее:
- каждый узел спецификации в файлах, хранящихся в репозитории;
- действующее одобрение каждого одобренного узла;
- весь код системы, включая её тесты.

Всё остальное, что хранит репозиторий, — например архив, прочие строки `specs/_approvals.jsonl` и записи в `sheriff.config.json` — проверки считают не изменённым этим коммитом. Собственные проверки проекта получают ту модель спецификации, которую узел о таких проверках даёт для этого запуска.

`sheriff settings` также называет каждый узел, из которого `sheriff types` ничего бы не сгенерировала, потому что одобренная формулировка узла опирается на узел, который никогда не был одобрен. Она находит эти узлы так же, как `sheriff types`, но не пишет файлов.

`sheriff settings` показывает ответственному, одобряющему спецификацию, каждый отказ, каждое предупреждение и каждый отчёт, которые дают эти проверки. Если их нет, она записывает запись. Иначе она записывает запись только после того, как ответственный подтвердит одобрение, как сказано в узле о `sheriff settings`.

Пока флаг `strict` включён, `sheriff settings` сначала выполняет проверки, которые флаг делает строже, — так же, как перед включением флага. Если какая-либо из них отказала бы коммиту, который ничего не меняет, `sheriff settings` отказывается записывать одобрение и не делает других проверок. Этот отказ — тот же, что `sheriff settings` даёт перед включением флага.

Запись, возвращающую спецификацию в черновик, `sheriff settings` записывает, не запуская никаких проверок.

Причина: Проверки при коммите оценивают только то, что содержит коммит, поэтому они никогда не показывают всего, чего ещё не хватает спецификации и коду. Оценивая один коммит, добавляющий всю спецификацию и весь код, они показывают ответственному каждый такой пробел до того, как он одобрит спецификацию.

Пример: Спецификация — черновик, флаг `strict` выключен. У одобренного правила R нет ни кода, ни теста, и старая функция не связана SpecTag ни с каким узлом. Агент запускает `sheriff settings status approved` без подключённого терминала. `sheriff settings` называет R, сообщая, что у R нет кода и теста, называет функцию и ничего не записывает. Ответственный соглашается, и агент запускает команду снова с `--confirm`. Самая вероятная ошибка — прочитать одобрение R как такое, которое уже есть в родителе коммита. Тогда R не входит в число правил, которые включает коммит, и ответственный никогда не видит, чего не хватает R.
TWO READINGS:
- "that the node on such checks gives for this run (§s-7pk89t8z6wymmj9)": "gives" — (а) узел о собственных проверках определяет, какую модель они получают; (б) узел сам «выдаёт» модель. "this run" в абзаце не названо: скорее всего, запуск проверок командой `sheriff settings` перед одобрением.
- "because the node's approved wording relies on a node that has never been approved": причина — (а) того, что `sheriff types` ничего бы не сгенерировала; (б) того, что `sheriff settings` называет узел. Контекст — (а).
- "these checks" (в абзаце "`sheriff settings` shows the owner…"): проверки названы тремя абзацами выше; неясно, входят ли сюда узлы, найденные «как `sheriff types`», из предыдущего абзаца.
- "That refusal is the one that `sheriff settings` gives before it turns the flag on.": (а) текст отказа тот же, что при отказе включить флаг; (б) отказ выдаётся до включения флага (флаг потом включается). Контекст — (а), но "before it turns the flag on" говорит, что флаг включается, хотя при отказе он не включается.
- "first makes the checks that the flag makes stricter": "first" — (а) раньше остальных проверок перед одобрением; (б) раньше всего остального. Контекст — (а).
- "every such gap": «пробел» раньше не назван; указывает на "everything that the specification and the code still lack".
LANGUAGE:
- "the approval in force of each approved node" → "the approval that is in force for each approved node" — "in force of" runs two phrases together.
- "shows the owner who approves the specification every refusal, warning and report that these checks give" → "shows every refusal, warning and report that these checks give to the owner who is approving the specification" — the long indirect object before the direct one makes the reader stumble at "the specification every refusal".
- "makes the checks that the flag makes stricter" → "runs the checks that the flag makes stricter" — "makes" twice in two senses; "run a check" is the usual collocation.
- "as it does before it turns the flag on" → "as it does when it is asked to turn the flag on" — "before it turns the flag on" presupposes that the flag is turned on; I am not sure this keeps the intended moment.
- "gives before it turns the flag on" → "gives when it refuses to turn the flag on" — the same presupposition; I am not sure this keeps the intended meaning.

### english-group6.md · new:tools-2-strict
TRANSLATION: Заголовок: «Включение флага `strict`». Текст: `sheriff settings` отказывается включать флаг `strict`, если проверка, которую флаг делает строже, отказала бы коммиту или push, который ничего не меняет, будь спецификация одобрена, а флаг включён. Отказ называет для каждой проверки, которая отказала бы, команду, перечисляющую то, что эта проверка находит. Если ни одна такая проверка не отказала бы, `sheriff settings` записывает запись, включающую флаг.

Проверки, которые флаг `strict` делает строже, и случаи, в которых каждая отказала бы такому коммиту, следующие:
- проверка кода и тестов вне коммита, которые не связаны SpecTag ни с каким узлом, — если `sheriff untagged` перечислила бы какой-либо код;
- каждая из собственных проверок проекта, которую правило, перечисляющее её, может сделать строже, — если она отказывает изменению, когда её запускает `sheriff validate --strict`.

Запись, выключающую флаг `strict`, `sheriff settings` записывает, не запуская никаких проверок.

Причина: Флаг позволяет ответственным сделать проверки строже собственным действием, не останавливая при этом всю работу. Включённый в момент, когда такая проверка отказала бы коммиту, который ничего не меняет, флаг заставил бы каждый коммит падать, пока эта проверка не пройдёт.

Пример: Спецификация — черновик, и две функции старого файла не связаны SpecTag ни с каким узлом. Ответственный запускает `sheriff settings strict on`. `sheriff settings` отказывается включать флаг и называет `sheriff untagged`, которая перечисляет эти функции. Самая вероятная ошибка — включить флаг, потому что спецификация — черновик. Тогда первый коммит после одобрения спецификации получает отказ из-за кода, который он не меняет.
TWO READINGS:
- "the check of code and tests outside the commit (§s-3xx2eukc8gtd2tx) that no SpecTag (§s-8xw4mgvpexyvw5q) binds": "that no SpecTag binds" — (а) код и тесты без SpecTag; (б) коммит; (в) проверка. Контекст — (а).
- "which the rule that lists it may make stricter (§s-q3pfzyaxvpr2zj2)": (а) придаточное без ограничения — любую собственную проверку правило вправе сделать строже; (б) ограничение — только те проверки, которые правило делает строже. Запятая даёт (а); пункт списка «проверки, которые флаг делает строже» требует (б). "may" — разрешение или возможность, не различить.
- "where it refuses the change": "the change" не названо; выше речь о коммите, который ничего не меняет.
- "without stopping all work when they do": "when they do" — (а) в момент, когда ответственные делают проверки строже; (б) когда проверки срабатывают. Контекст — (а).
- "such a check" (в Reason): отсылает к проверкам, которые флаг делает строже; в абзаце названы только "the checks".
LANGUAGE:
- "the check of code and tests" → "the check on code and tests" — a check is made "on" something; "check of" is unusual.
- "by an act of their own" → "by a decision of their own" — "an act of their own" is not idiomatic here; I am not sure "decision" keeps the meaning exactly.
- "two functions of an old file" → "two functions in an old file" — functions are "in" a file.

### english-group6.md · new:tools-2-extension-off
TRANSLATION: Заголовок: «Отзыв выбора расширения». Текст: `sheriff settings` отказывается записывать запись, отзывающую выбор расширения guidelines, пока какой-либо узел зависит от этого расширения. Отказ называет каждый такой узел по его файлу, sid и расположению. Если ни один узел не зависит от расширения, `sheriff settings` записывает запись.

Узел, не являющийся собственным узлом расширения, зависит от расширения, если выполняется что-либо из следующего:
- тип узла — один из тех, которые добавляет `kinds` схемы расширения;
- узел содержит свойство, которое `fields` схемы расширения добавляет к типу этого узла;
- у узла есть связь, тип которой — один из `linkTypes` схемы расширения;
- у узла есть связь, содержащая свойство, которое добавляет `link` схемы расширения;
- у узла есть связь с узлом в файле расширения.

`sheriff settings` проверяет каждый узел в файлах, хранящихся в репозитории, включая узел в ячейке `TableRule`. Она делает эту проверку независимо от того, одобрена спецификация или является черновиком.

Причина: Будучи отозвано, пока от него ещё зависит узел, расширение оставило бы этот узел опирающимся на правила и определения, которые больше не действуют в проекте. Всё, что расширение добавляет в спецификацию, либо объявлено в его схеме, либо содержится в его файле, поэтому эти два места показывают каждый зависящий от него узел.

Пример: Проект выбрал расширение RecordType с именем `recordtype`, и его базовая спецификация содержит RecordType. Ответственный запускает `sheriff settings extension recordtype off`. `sheriff settings` отказывает и называет этот RecordType по его файлу, sid и расположению. Самая вероятная ошибка — искать только связи с узлами расширения, так что узел типа, добавленного расширением, остаётся незамеченным.
TWO READINGS:
- "the node has a link to a node in the extension's file": (а) исходящая связь от узла к узлу расширения; (б) любая связь, включая входящую запись. Контекст — (а).
- "Withdrawn while a node still depends on it, an extension would leave that node relying on rules": отозван выбор расширения, а не само расширение; фраза читается как «расширение отозвано».
LANGUAGE:
- "Withdrawn while a node still depends on it, an extension would leave" → "If the choice of an extension were withdrawn while a node still depended on the extension, that node would be left" — the passage elsewhere says that the choice is withdrawn, not the extension.

### english-group6.md · s-7unxytshhc4md54
TRANSLATION: Заголовок: «Настройка репозитория и удаление SpecSheriff из него». Текст: `sheriff init` настраивает репозиторий для инструментов SpecSheriff. С git-хуками она делает следующее:
- записывает их в `.githooks/`;
- добавляет в индекс с исполняемым режимом 100755 каждый хук там, который содержит то, что она записала бы, и которого в индексе git ещё нет с этим режимом, называя каждый;
- если добавить хук в индекс не удаётся, называет хук и говорит, как добавить его как исполняемый;
- включает хуки, устанавливая `core.hooksPath` в `.githooks`.

`sheriff init` пишет для агента, которого называет опция `--agent` (`claude` или `codex`), а если опция не задана — для `claude`:
- для `claude` добавляет marketplace и плагин в `.claude/settings.json` так, как их объявляет проект, сохраняя там любые другие ключи;
- для `codex` записывает хуки агента для Codex в `.codex/hooks.json`, сохраняя там любые другие хуки.

Любое другое имя агента `sheriff init` отклоняет, называя агентов, для которых она пишет.

`sheriff init` заставляет git сливать одобрения объединением (union). Что делает `sheriff init`, зависит от состояния, которое `git check-attr merge specs/_approvals.jsonl` сообщает для атрибута merge одобрений:
- если git сообщает, что атрибут не задан, `sheriff init` дописывает строку `specs/_approvals.jsonl merge=union` в `.gitattributes` в корне репозитория и создаёт этот файл, если его нет;
- если git сообщает `union`, ничего не дописывает;
- если git сообщает любое другое состояние атрибута, ничего не дописывает и называет это состояние.

Вне git-репозитория `sheriff init` дописывает строку, если файл её ещё не содержит (без учёта пробелов и окончаний строк). Дописанная строка начинает отдельную строку и заканчивается так же, как строки файла.

Если их нет, `sheriff init` создаёт следующие файлы:
- `sheriff.config.json`, содержащий только `code` и `tests`, каждый — пустой список glob-шаблонов;
- `specs/_guidelines/project.json`, верхний узел которого — секция, называющая ответственным за спецификацию email, заданный в конфигурации git.

Эта секция содержит, как черновик, правило, уточняющее правило о том, когда тесты должны проходить. Заголовок правила — «When the tests run». Его текст — «The tests run on every push.» Его `TextRule.list` перечисляет `push`, а `of` списка — «the moments at which the tests run».

Если конфигурация git не задаёт email, `sheriff init` не пишет `project.json` и говорит, как задать этот адрес.

`sheriff init` заменяет хук или объявление, содержащее то, что записал более ранний релиз `sheriff init`, и называет каждое. Любой другой файл, отличающийся от того, что она записала бы, она оставляет как есть и называет. Поэтому при повторном запуске `sheriff init` ничего не меняет.

Хук или объявление содержит записанное более ранним релизом, если, без учёта окончаний строк, совпадает с одним из текстов, которые писали более ранние релизы. Эти тексты хранят инструменты SpecSheriff.

Если хуки репозитория раньше запускались из другого места — из `.git/hooks/` или другой папки, названной в `core.hooksPath`, — `sheriff init` называет каждый найденный там хук, кроме образцов git. Она говорит, что каждый из них больше не запускается, пока не будет перенесён в `.githooks/<hook>.d/`.

`sheriff remove` убирает из репозитория то, что `sheriff init` пишет вне `specs/`, для каждого агента, для которого пишет `sheriff init`:
- каждый git-хук, marketplace и плагин в `.claude/settings.json` и хуки агента для Codex в `.codex/hooks.json`, если каждый содержит то, что `sheriff init` пишет сейчас или писала в более раннем релизе;
- каждую строку `.gitattributes` в корне репозитория, совпадающую со строкой, которую туда дописывает `sheriff init` (без учёта пробелов и окончаний строк);
- `core.hooksPath`, если он называет `.githooks`;
- ключ `.claude/settings.json` или `.codex/hooks.json`, оставшийся пустым, и любой из этих файлов, если в нём не осталось ключей;
- `.gitattributes`, если в нём остались только пустые строки;
- `.githooks/`, `.claude/` или `.codex/`, если папка осталась пустой;
- `sheriff.config.json`, что бы он ни содержал, включая записи настроек, которые меняет только ответственный за спецификацию.

`sheriff remove` оставляет каждый хук и каждое объявление, отличающиеся от того, что пишет `sheriff init`, и называет их. `specs/` и файл привязок она оставляет как есть и называет каждый из них. Она называет каждую папку `.githooks/<hook>.d/`, которую оставляет, и говорит, что собственные инструменты проекта в ней больше не запускаются.

`sheriff remove` ничего не добавляет в индекс. При повторном запуске ничего не меняет.

Причина: Принятие метода и его удаление — каждое одна команда, чтобы никому не нужно было знать каждый файл и каждую настройку, нужные инструментам SpecSheriff. То, что пишет `sheriff init`, доходит до каждого клона через git, поэтому проверки выполняются одинаково для всех, кто работает над проектом. Каждая команда меняет только то, что служит инструментам SpecSheriff, а остальной репозиторий оставляет проекту.

Пример 1: Проект на Windows запускает `sheriff init`. Git там не берёт исполняемый режим из файла, поэтому `sheriff init` добавляет в индекс каждый записанный ею хук с режимом 100755 и называет его. Самая вероятная ошибка — сделать хуки исполняемыми только на диске: git на Windows этот режим не записывает, и клон на Linux или macOS не запускает ни одного хука.

Пример 2: Две ветки одобряют по узлу, и каждая дописывает строку в `specs/_approvals.jsonl`. Поскольку `sheriff init` настроила git сливать этот файл объединением, слияние сохраняет обе строки и ставит строку вливаемой ветки последней. Без слияния объединением git выдаёт там конфликт. Самая вероятная ошибка — разрешить конфликт, оставив строки одной ветки, что теряет одобрение, сделанное в другой.

Пример 3: Ответственный запускает `sheriff init` в новом репозитории. `project.json` после этого содержит секцию, которая называет ответственного и содержит, как черновик, правило о том, когда запускаются тесты. Поэтому первый коммит проходит проверку того, что каждая секция содержит правило. Самая вероятная ошибка — записать одну только секцию, которую эта проверка отклоняет.
TWO READINGS:
- "each hook there that holds what it would write and that git's index does not already hold with that mode": "it would write" — (а) то, что записала бы `sheriff init`; (б) то, что записал бы хук. Контекст — (а). "holds" в двух смыслах: хук «содержит» текст, индекс «содержит» хук.
- "`sheriff init` has git merge the approvals (§s-v4qus7raqnwzneb) by union": (а) настраивает git так, чтобы он сливал; (б) прямо сейчас заставляет git выполнить слияние. Контекст — (а). "the approvals" — файл `specs/_approvals.jsonl`, не сами одобрения.
- "Outside a git repository, `sheriff init` appends the line unless the file already holds it": "the line" и "the file" названы только в списке предыдущего абзаца (строка `specs/_approvals.jsonl merge=union`, файл `.gitattributes`).
- "a hook or a declaration": "declaration" нигде в узле не определено; вероятно, запись marketplace и плагина в `.claude/settings.json` и хуки в `.codex/hooks.json`. То же в "each hook and declaration".
- "stages each hook that it wrote with the mode 100755": (а) добавляет в индекс с режимом 100755; (б) хук, который она записала с режимом 100755. Контекст — (а).
- "Since `sheriff init` had git merge that file by union": (а) «поскольку `sheriff init` настроила git сливать»; (б) при первом чтении "had git merge" читается как past perfect с существительным "git merge". Контекст — (а).
- "for each agent for which `sheriff init` writes": (а) для всех агентов, которых поддерживает `sheriff init` (и claude, и codex); (б) для агента, для которого `sheriff init` писала в этом репозитории. Список ниже говорит за (а).
- "Without the union merge, git raises a conflict there": "there" — в файле `specs/_approvals.jsonl`; место названо двумя предложениями раньше.
LANGUAGE:
- "`sheriff init` writes for the agent that the option `--agent` names, `claude` or `codex`, and for `claude` where the option is not given:" → "`sheriff init` writes the following for the agent that the option `--agent` names, `claude` or `codex`, or for `claude` where the option is not given:" — "writes" has no object, and "and for `claude`" reads as "for both".
- "naming the agents for which it writes" → "naming the agents that it supports" — "writes" without an object; I am not sure "supports" keeps the meaning exactly.
- "for each agent for which `sheriff init` writes" → "for each agent that `sheriff init` supports" — the same; the same doubt.
- "refuses any other name of an agent" → "refuses any other agent name" — "name of an agent" is a word-for-word genitive.
- "the merge attribute of the approvals" → "the `merge` attribute of the approvals file" — the attribute belongs to a file, not to approvals.
- "The appended line starts a line of its own" → "The appended line starts on a line of its own" — "a line starts a line" does not make sense as written.
- "no longer runs until it is moved" → "will not run until it is moved" — "no longer" and "until" contradict each other.
- "Taking up the method and taking it out are each one command" → "Adopting the method and removing it each take one command" — "taking it out" has no place it is taken out of, and an activity "is" not a command.
- "A project on Windows runs `sheriff init`." → "`sheriff init` is run in a project on Windows." — a project does not run a command.
- "Git there takes no executable mode from a file" → "Git on Windows does not read the executable mode from a file" — "takes no executable mode" is not idiomatic.

### english-group6.md · proposal:s-gb8s9657a65hqmv-g6
TRANSLATION: Заголовок: «Что `sheriff reindex` меняет в том, что записал более ранний релиз». Текст: `sheriff reindex` переписывает всё, что более ранний релиз инструментов SpecSheriff писал или читал иначе, чем релиз, к которому принадлежит `sheriff reindex`. Она делает это после слияния повторяющихся ключей и до валидации файлов. В каждом файле спецификации и её архива она делает следующие изменения:
- ключ узла `id` становится `location`;
- ключ узла `rationale` становится `reason`;
- типы узла `record` и `recordType` становятся `RecordType`;
- тип узла `rule` становится `TextRule`;
- тип узла `domain` становится `header`;
- статус узла `""` становится `draft`;
- статус узла `checked` становится `approved`;
- ключ узла `owner`, содержащий email, становится `owners` со списком, содержащим этот email;
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
- узел архива теряет свой sid и каждую связь, указывающую на него.

Переименованный ключ сохраняет своё место среди ключей узла. Тип узла переименовывается также там, где значения поля — sid узлов этого типа, и там, где расширение схемы проекта объявляет `fields` для этого типа.

Голый sid — это слово, имеющее форму sid и встречающееся в одном из этих мест:
- оно открывает имя теста, за ним следует пробел или конец имени;
- оно — единственный аргумент метки теста.

`sheriff reindex` делает также следующие изменения:
- `specs/_confirmations.jsonl` становится `specs/_approvals.jsonl`;
- ключ `owner` в каждой строке `specs/_confirmations.jsonl` становится `by`;
- если `specs/_approvals.jsonl` уже существует, строки `specs/_confirmations.jsonl` с переименованным ключом дописываются в него, а `specs/_confirmations.jsonl` удаляется;
- пока `sheriff.config.json` не содержит записи, задающей статус одобрения спецификации, одобренное правило из `project.json`, уточняющее правило об этом статусе, заменяется записью, одобряющей спецификацию;
- эта запись называет ответственного, который последним одобрил это правило;
- это правило переносится в архив с причиной «Replaced by the entry in `sheriff.config.json` that records the specification's approval status»;
- если после этого `project.json` не содержит правила, уточняющего правило о том, когда тесты должны проходить, под его верхний узел добавляется правило-черновик о том, когда запускаются тесты, которое пишет `sheriff init`;
- ключ `writesSpecSheriffGuidelines` удаляется из `sheriff.config.json` до того, как инструменты SpecSheriff валидируют этот файл;
- в каждом файле, который `sheriff.config.json` называет тестами кода системы либо тестами собственной проверки или генератора проекта, перед каждым голым sid вставляется `@spec `.

`sheriff reindex` оставляет без изменений RecordType, содержащий поле типа `variant`, поле, значения которого берутся из источника `domains`, или поле, собственный список значений которого пуст, и называет этот RecordType и каждое такое поле.

Если узел спецификации имеет тип или содержит связь типа, которые добавляет расширение guidelines, а проект это расширение ещё не выбрал, `sheriff reindex` называет это расширение.

`sheriff reindex` называет добавленное ею правило о том, когда запускаются тесты, поскольку инструменты SpecSheriff читают это правило только после того, как его одобрит ответственный.

Переименованный ключ и переименованный тип узла не меняют `fingerprint` узла, поэтому одобрение формулировки узла остаётся в силе.

`sheriff reindex` называет каждый файл, который она переписывает из-за того, что более ранний релиз писал этот файл иначе, включая файлы спецификации.

Причина: Каждый файл и каждый тест проекта записан в форме того релиза инструментов SpecSheriff, который последним писал или читал его. Релиз, который пишет или читает их иначе, переписывает их, чтобы никому не приходилось переписывать проект вручную и ни одно одобрение не терялось из-за переименования.
TWO READINGS:
- "A kind of node is also renamed where a field's values are the sids of that kind's nodes, and where the project's extension of the schema declares `fields` for that kind.": "where" — (а) место: имя типа переименовывается и в этих местах; (б) условие: тип переименовывается, если это выполняется. Контекст — (а).
- "it is the only argument of the test's mark": "the test's mark" — тест во втором пункте не назван; вероятно, pytest-метка того теста, которому принадлежит sid.
- "until `sheriff.config.json` holds an entry that sets the specification's approval status": (а) при условии, что такой записи ещё нет; (б) повторяется снова и снова, пока запись не появится. Контекст — (а).
- "is added under its top node": "its" — (а) верхний узел `project.json`; (б) верхний узел правила. Контекст — (а).
- "names each file that it rewrites because an earlier release wrote that file differently": "because" — (а) причина переписывания; (б) причина того, что файл назван. Контекст — (а).
- "has yet to choose that extension": (а) ещё не выбрал (и, как ожидается, выберет); (б) просто не выбрал. Английская фраза подразумевает (а).
- "the draft rule on when the tests run that `sheriff init` writes": "that `sheriff init` writes" — (а) правило, которое пишет `sheriff init`; (б) тесты, которые… (исключается смыслом). Читается с запинкой, верное — (а).
LANGUAGE:
- "occurs in one of these places:" → "meets one of these conditions:" — the two items that follow are clauses ("it opens…", "it is…"), not places.
- "until `sheriff.config.json` holds an entry" → "where `sheriff.config.json` holds no entry" — "until" describes an action that continues, not a condition; I am not sure the replacement keeps the intended timing.
- "has yet to choose that extension" → "has not chosen that extension" — "has yet to" implies that the project is expected to choose it.
- "is written in the form of the release of the SpecSheriff tools that last wrote or read it" → "is written in the form used by the release of the SpecSheriff tools that last wrote or read it" — "in the form of the release" reads as "as a release".
- "a node of the archive loses its sid and every link that points to it" → "a node of the archive loses its sid, and every link that points to it is removed" — a node does not "lose" links held by other nodes.

### english-group6.md · proposal:s-7pk89t8z6wymmj9-g6
TRANSLATION: Заголовок: «Как запускается собственная проверка проекта». Текст: Если проверка, которую добавляют собственные guidelines проекта, не проходит, `sheriff validate` отказывает изменению. Если правило, перечисляющее проверку, говорит, что её непрохождение только сообщается, `sheriff validate` вместо этого сообщает о непрохождении. Отказ или сообщение называет проверку и показывает, что проверка вывела в стандартный вывод и в стандартный поток ошибок. Если проверка ничего не вывела, отказ или сообщение показывает код завершения проверки.

`sheriff validate` запускает каждую собственную проверку проекта командой, которую для неё называет `sheriff.config.json`. Проверка выполняется в каталоге, в котором выполняется `sheriff validate`. При коммите этот каталог содержит то, что содержит коммит. На стандартный ввод проверка получает модель спецификации в том виде, в котором её печатает `sheriff json`. Проверка проходит, только если её процесс завершается с кодом ноль.

В своём `TextRule.list` правило, которое `sheriff.config.json` называет для проверки, перечисляет проверку как элемент, значение которого — имя проверки. `sheriff validate` читает это правило в его последней одобренной формулировке. Если правило в этой формулировке не перечисляет элемента, значение которого — имя проверки, `sheriff validate` отказывает изменению. Отказ называет проверку и правило и говорит, что последняя одобренная формулировка правила не перечисляет проверку.

Если этот элемент — объект, у которого `onFailure` равен `reported`, правило говорит, что непрохождение проверки только сообщается. Если `onFailure` этого элемента равен `reportedUnlessStrict`, `sheriff validate` сообщает о непрохождении проверки, пока флаг `strict` спецификации выключен, и отказывает изменению, пока флаг включён. Флаг она читает в модели спецификации, которую даёт проверке.

`sheriff validate` запускает собственные проверки проекта только после того, как файлы спецификации прошли проверку на ключ, записанный более одного раза, и валидацию по своей схеме. Она запускает их до остальных своих проверок. Остальные свои проверки она делает независимо от того, что находят собственные проверки проекта.

`sheriff validate` отказывает изменению, если одна из собственных проверок проекта добавляет, меняет или удаляет файл в каталоге, в котором выполняется проверка, кроме файла, который git игнорирует. Отказ называет проверку и каждый такой файл.

С опцией `--strict` `sheriff validate` даёт каждой собственной проверке проекта модель спецификации, в которой спецификация одобрена, а флаг `strict` спецификации включён. Она делает это независимо от того, как записи в `sheriff.config.json` задают статус одобрения и флаг. Остальные проверки `sheriff validate` дают одинаковые результаты с опцией и без неё.

Прежде чем `sheriff settings` запишет одобрение спецификации, она запускает собственные проверки проекта. Она даёт им модель, в которой спецификация одобрена, а флаг `strict` имеет значение, заданное записями в `sheriff.config.json`. Прежде чем `sheriff settings` включит флаг `strict`, она запускает собственные проверки проекта так, как их запускает `sheriff validate --strict`.

`sheriff validate` запускает собственные проверки проекта независимо от того, одобрена спецификация или является черновиком.

Причина: Всякий раз, когда `sheriff validate` делает свои проверки SpecSheriff guidelines, она запускает и собственные проверки проекта, на тех же файлах. Поэтому такая проверка обязательна для каждого участника, а не зависит от того, кто вспомнит её запустить.

Пример 1: У правила, перечисляющего собственные проверки проекта, `TextRule.list.property` равно `name`, и один из его элементов — `{"name": "spelling", "onFailure": "reported"}`. Проверка `spelling` находит слово с ошибкой в тексте узла, печатает sid узла и завершается с кодом 1. `sheriff validate` сообщает о непрохождении, показывая sid, и коммит проходит. Самая вероятная ошибка — отказать коммиту, потому что код завершения проверки не ноль.

Пример 2: Элемент проверки `spelling` — `{"name": "spelling", "onFailure": "reportedUnlessStrict"}`. Пока флаг `strict` выключен, `sheriff validate` сообщает о каждом слове с ошибкой, и коммит проходит. Ответственный запускает `sheriff settings strict on`, и проверка не проходит, когда её запускает `sheriff validate --strict`, поэтому `sheriff settings` отказывается включать флаг и называет `sheriff validate --strict`. Самая вероятная ошибка — читать флаг из записей в `sheriff.config.json`, а не из модели, которую получает проверка. Тогда флаг включается, и следующий коммит получает отказ.
TWO READINGS:
- "Where that member is an object whose `onFailure` is `reported`": "that member" назван только в предыдущем абзаце — элемент списка, значение которого равно имени проверки.
- "makes its checks of the SpecSheriff guidelines": (а) проверки, которых требуют SpecSheriff guidelines; (б) проверки, объектом которых являются сами guidelines. Контекст — (а).
- "`sheriff validate` reports the failure instead": первое предложение абзаца без оговорки говорит, что `sheriff validate` отказывает; исключение стоит во втором. "instead" — вместо отказа.
- "adds, changes or removes a file in the directory in which the check runs": (а) файл непосредственно в этом каталоге; (б) файл в каталоге и во всех вложенных. Вероятно (б), текст не говорит.
- "Before `sheriff settings` turns the `strict` flag on (§s-nxgkp988mej79eg), it runs the project's own checks": (а) запускает их, получив команду включить флаг (флаг может и не включиться); (б) флаг в итоге включается. Контекст — (а).
- "The flag is then turned on, and the next commit is refused.": "then" — (а) в случае этой ошибки; (б) после этого по времени. Контекст — (а).
LANGUAGE:
- "The member of the check `spelling` is" → "The member that lists the check `spelling` is" — the member belongs to the rule's list, not to the check.
- "On a commit, that directory holds" → "At a commit, that directory holds" — the rest of the text says "at a commit"; "on a commit" reads as "on top of a commit".
- "It reads the flag in the model of the specification that it gives the check" → "It reads the flag from the model of the specification that it gives the check" — a value is read "from" a source; Example 2 itself says "from the model".
- "makes its checks of the SpecSheriff guidelines" → "runs the checks that the SpecSheriff guidelines require" — "checks of the guidelines" reads as checks performed on the guidelines; I am not sure the replacement is the meaning intended.
