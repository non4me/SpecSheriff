### english-group3-changed-c.md · new:tools-7-1-extensions-delivered
TRANSLATION: К командам, которые читают выбранные расширения, относится также `sheriff guard`: она проверяет правку агента до того, как эта правка сделана (§s-st6td4mua9uqt9z).
TWO READINGS: none
LANGUAGE: none

### english-group3-changed-c.md · s-2x58az67bm6cxq2
TRANSLATION:
- Коммит изменяет символ или тест, если какая-либо строка этого символа или теста изменяет код (§s-u6mj5yv8ngnz79v).
- Тест, который коммит переименовывает за пределами его SpecTag и больше никак не изменяет, тоже остаётся тем же тестом (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).
- Коммит изменяет файл, привязанный целиком, если изменяет любую часть текста файла, включая комментарий или пробельные символы (§s-kgbzk2ph9e6jfb4).

TWO READINGS:
- "a line of that symbol or test changes the code": (1) сама строка символа что-то делает с кодом, то есть буквально «строка изменяет код»; (2) строка, которую коммит удалил или добавил, относится к определённым в другом узле «строкам, изменяющим код». Контекст (ссылка на узел) говорит в пользу (2), но без этого узла читатель поймёт (1).
- "renames outside its SpecTag": (1) коммит меняет ту часть имени теста, которая не является SpecTag; (2) коммит переименовывает тест где-то в другом месте, не там, где находится SpecTag. Контекст говорит в пользу (1).

LANGUAGE:
- "renames outside its SpecTag" → "renames without changing the SpecTag in its name" — «rename outside X» по-английски не говорят: глагол rename не сочетается с указанием места. Замена сохраняет смысл, только если SpecTag всегда является частью имени теста; для теста со SpecTag в pytest mark я в этом не уверен.

### english-group3-changed-c.md · new:tools-7-2-changed-line
TRANSLATION: Чтение каждой строки как токенов языка её файла отбрасывает то, что не может изменить поведение кода, например комментарии и пробельные символы между токенами.
TWO READINGS: none
LANGUAGE:
- "the tokens of the language of its file" → "the tokens of its file's language" — цепочка из трёх «of»; в тексте того же узла уже написано "the tokens of the file's language".
- "leaves out what cannot alter what the code does" → "leaves out anything that cannot alter what the code does" — два «what» подряд заставляют перечитывать.

### english-group3-changed-c.md · new:tools-7-2-draft-rule
TRANSLATION: Статус одобрения каждого правила, которое называют эти SpecTag, она (`sheriff binding`) берёт из спецификации в том виде, в каком её оставляет коммит.
TWO READINGS:
- "that those SpecTags name from the specification": (1) «берёт … из спецификации» — "from the specification" относится к "takes"; (2) «SpecTag называют [правило] из спецификации» — "from the specification" относится к "name". Контекст говорит в пользу (1), но при первом чтении получается (2).
- "as the commit leaves it": "it" — (1) спецификация; (2) правило. Контекст говорит в пользу (1).

LANGUAGE:
- "It takes the approval status of each rule that those SpecTags name from the specification as the commit leaves it." → "From the specification as the commit leaves it, it takes the approval status of each rule that those SpecTags name." — "from the specification" стоит сразу после глагола "name" и прочитывается как его дополнение.

### english-group3-changed-c.md · s-t383grkn3q68dpf
TRANSLATION: Наиболее вероятная ошибка — учитывать только SpecTag, размещённые над символами; тогда `sheriff binding` отказала бы этому `meta.code` за то, что оно называет `src/texts.json`.
TWO READINGS: none
LANGUAGE: none

### english-group3-changed-c.md · s-5hb9k2e34dgn284
TRANSLATION:
- Если файл, место или символ, на которые указывает список, не удаётся найти, отказ называет то из них, что отсутствует.
- Для члена списка, который является объектом, значением считается значение того свойства, которое называет `TextRule.list.property`.
- `TextRule.list.jsonSchema` этого правила указывает на `#/properties/state` в `schema/request.schema.json`, а схема в этом месте содержит `"enum": ["open", "done", "cancelled", "held"]`.

TWO READINGS:
- "the value is the value of the property": первое "the value" — (1) то значение списка, которое даёт этот член (оно названо в предыдущем предложении абзаца); (2) значение самого объекта целиком. Контекст говорит в пользу (1).
- "the place": слово общего значения без объекта. Скорее всего — место в JSON Schema, на которое указывает `TextRule.list.jsonSchema`; в этом предложении это не сказано.

LANGUAGE:
- "the value is the value of the property" → "its value is the value of the property" — без "its" не видно, чьё значение имеется в виду.

### english-group3-changed-c.md · new:tools-7-2-own-kinds
TRANSLATION:
- Сравнение этих двух вещей удерживает объявление каждого типа узла — включая то, требуется ли имплементация его узлов в коде, — в соответствии с тем, что одобрил ответственный.
- Тогда коммит прошёл бы, хотя правило говорит, что узлы типа `procedure` не требуют кода, а схема говорит, что требуют.

TWO READINGS:
- "the two": указывает на предыдущее предложение. Это (1) расширение схемы и правило или (2) объявление типа в расширении схемы и его упоминание в списке правила. Смысл близкий, но сами «две вещи» нигде не названы парой.
- "the schema": (1) расширение схемы проекта; (2) базовая схема. Контекст говорит в пользу (1).

LANGUAGE:
- "the nodes of the kind `procedure`" → "nodes of the kind `procedure`" — речь об узлах этого типа вообще, определённый артикль лишний.

### english-group3-changed-c.md · s-cdachayybfvg4na
TRANSLATION: Значение члена списка, который является объектом, — это значение свойства, которое называет `TextRule.list.property`.
TWO READINGS: none
LANGUAGE: none

### english-group3-changed-c.md · proposal:s-9j2mmnuuwmx5ksn
TRANSLATION: Переименование теста или переформулирование комментариев в тестах либо в файле, символы которого проверки способны определить (§s-kgbzk2ph9e6jfb4), не изменяет ни тест, ни код, при условии что SpecTag остаётся тем же.
TWO READINGS:
- "as long as the SpecTag stays the same": (1) условие — «если SpecTag не меняется»; (2) длительность — «до тех пор, пока SpecTag не меняется». Контекст говорит в пользу (1).
- "the SpecTag": не названо, чей это SpecTag. Скорее всего — SpecTag того теста или того кода, о котором идёт речь; предложение перед этим говорит о SpecTag в общем смысле.
- "in the tests or in a file whose symbols the checks can identify": придаточное "whose symbols the checks can identify" относится (1) только к "a file"; (2) и к тестам, и к файлу. Грамматика говорит в пользу (1).
- "the checks": в этом абзаце никакие проверки раньше не названы. Скорее всего — проверки коммита, которые выполняют инструменты SpecSheriff.

LANGUAGE:
- "the comments in the tests" → "a comment in a test" — дальше в предложении стоит единственное число ("neither the test nor the code"), а "the tests" с определённым артиклем не указывает ни на какие названные тесты. Не уверен, что замена сохраняет смысл, если имелись в виду все комментарии сразу.

### english-group3.md · proposal:new-tools-1-settings-g3
TRANSLATION:
**Заголовок:** Настройки на уровне проекта

**Текст:** `sheriff.config.json` (§s-zefk589ykh37b8u) содержит настройки инструментов SpecSheriff, действующие для всего проекта:
- glob-шаблоны, которым соответствуют файлы с кодом системы (§s-hheus6f395ynqvc) и файлы с её тестами;
- для каждой проверки и каждого генератора, которые добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): правило, в списке которого они указаны, их имя в этом правиле, команда, которая их запускает, и glob-шаблоны, которым соответствуют файлы с их кодом и их тестами (§s-utf4mbt7ref8g9c);
- записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2) и её флаг `strict` (§s-q3pfzyaxvpr2zj2), и записи, которые фиксируют, какие расширения guidelines (§s-mbmnsnxenmavu3z) выбрал проект (§s-9ttvcwpqkehm58g);
- команда, которая запускает тесты кода системы и тесты собственных проверок и генераторов проекта (§s-477gtdrkw34dzxw);
- настройки reviewer, действующие для всего проекта (§s-xr5xxa9cxf2mq5u).

Инструменты SpecSheriff отказывают файлу `sheriff.config.json`, который не является корректным JSON или не соответствует своей схеме (§s-zefk589ykh37b8u).

Чтобы найти SpecTag (§s-8xw4mgvpexyvw5q), которые связывают код и тесты с их правилами, инструменты SpecSheriff читают только: файлы, соответствующие glob-шаблонам для кода или для тестов в `sheriff.config.json`; файлы, в которые `sheriff types` записывает типы (§s-pvzms7d8kxb8dk2); и bindings file (§s-trwczfskj5zmuft). Файл, который соответствует и шаблону для кода, и шаблону для тестов, читается как тест.

**Причина:** Настройка, которая хранится в репозитории, одинакова в каждом клоне, поэтому инструменты SpecSheriff ведут себя одинаково у всех, кто работает над проектом.

TWO READINGS:
- "the files holding the system's code (§s-hheus6f395ynqvc) and those holding its tests": "those" — (1) файлы, то есть одни шаблоны покрывают и код, и тесты; (2) шаблоны, то есть отдельные шаблоны для тестов. Третий абзац ("the glob patterns for code or for tests") говорит в пользу (2), грамматика — в пользу (1).
- "the rule that lists it, its name in that rule, the command that runs it": "it" — проверка или генератор, каждый в отдельности. Прочтение одно, но местоимение отсылает к двум существительным через "each … and each".
- "the glob patterns for code or for tests in `sheriff.config.json`": "in `sheriff.config.json`" относится (1) к шаблонам; (2) к тестам. Контекст говорит в пользу (1).
- "writes the types": в этом узле никакие типы раньше не названы. Скорее всего — типы, которые `sheriff types` генерирует из спецификации; читатель узнаёт это только по ссылке.

LANGUAGE:
- "is read as a test" → "is read as a file of tests" — файл не является тестом, он содержит тесты. Не уверен, что замена сохраняет смысл, если имелось в виду «каждый символ в нём считается тестом».

### english-group3.md · proposal:s-gb8s9657a65hqmv-g3
TRANSLATION:
**Заголовок:** Что `sheriff reindex` изменяет в том, что записал более ранний релиз

**Текст:** `sheriff reindex` переписывает всё, что более ранний релиз инструментов SpecSheriff записывал или читал иначе, чем релиз, к которому принадлежит сама `sheriff reindex`. Она делает это после того, как объединила дублирующиеся ключи (§s-w5wg69pvvhedsws), и до того, как проверяет файлы на корректность. В каждом файле спецификации и её архива она делает следующие изменения:
- ключ узла `id` становится `location`, а ключ узла `rationale` становится `reason`;
- типы узла `record` и `recordType` становятся `RecordType`, `rule` становится `TextRule`, а `domain` становится `header`;
- статус узла `""` становится `draft`, а `checked` становится `approved`;
- ключ узла `owner`, содержащий email-адрес, становится `owners`, содержащим список, в котором есть этот email-адрес;
- `fields` и `unknown` у RecordType становятся его `schema` (§s-6eb92ddch7shuvu) следующим образом: каждое поле становится свойством, схема которого — та, что задана для нейтрального типа этого поля (§s-4npdup7mjkva69y); `text` поля становится `description` свойства; каждое поле, которое RecordType помечает как обязательное, перечисляется в `required` схемы; поле, обязательное только «там, где оно содержит значение», становится необязательным свойством; а `unknown: "refused"` становится `additionalProperties: false`;
- источник значений поля становится `x-enumSource` этого поля (§s-xfu2gpzddjnmgks);
- `TextRule.list.declaredIn` удаляется, если указывает на поле `kinds` расширения схемы проекта (§s-xm8rz4uupb73gu5);
- `TextRule.list.declaredIn` становится `TextRule.list.jsonSchema`, если указывает на любое другое место в JSON Schema;
- `TextRule.list.declaredIn` становится `TextRule.list.valueList`, если называет объявление в коде;
- связь между узлами спецификации типа `supersedes` удаляется (§s-sn6au3vcr9uy5pm);
- узел архива теряет свой sid и все связи, которые на него указывают (§s-f2b5zvc565s242f, §s-bpdqd9v72wg7vsz).

Переименованный ключ сохраняет своё место среди ключей узла. Тип узла переименовывается также, если значения какого-либо поля — это sid узлов этого типа и если расширение схемы проекта объявляет `fields` для этого типа.

«Голый» sid — это слово, которое имеет вид sid и встречается в одном из следующих мест:
- оно открывает имя теста, и за ним идёт пробел или конец имени;
- оно является единственным аргументом метки (mark) этого теста.

`sheriff reindex` делает также следующие изменения:
- `specs/_confirmations.jsonl` становится `specs/_approvals.jsonl`, а ключ `owner` в каждой его строке становится `by`;
- если `specs/_approvals.jsonl` уже существует, строки `specs/_confirmations.jsonl` с переименованным ключом дописываются в его конец, а `specs/_confirmations.jsonl` удаляется;
- до тех пор пока в `sheriff.config.json` нет записи, задающей статус одобрения спецификации, одобренное правило из `project.json`, уточняющее правило об этом статусе (§s-qzthyh7yqvfhsa2), заменяется записью, которая одобряет спецификацию;
- эта запись называет ответственного, который последним одобрил это правило;
- это правило перемещается в архив (§s-f2b5zvc565s242f) с причиной «Replaced by the entry in `sheriff.config.json` that records the specification's approval status»;
- ключ `writesSpecSheriffGuidelines` удаляется из `sheriff.config.json` (§s-zefk589ykh37b8u) до того, как инструменты SpecSheriff проверяют этот файл на корректность;
- в каждом файле, который `sheriff.config.json` называет тестами кода системы либо тестами собственной проверки или собственного генератора проекта, перед каждым «голым» sid вставляется `@spec `.

`sheriff reindex` оставляет без изменений RecordType, в котором есть поле типа `variant`, поле, значения которого берутся из источника `domains`, или поле, собственный список значений которого пуст, и называет этот RecordType и каждое такое поле.

Если узел спецификации имеет тип или содержит связь типа, которые добавляет расширение guidelines, а проекту ещё только предстоит выбрать это расширение (§s-9ttvcwpqkehm58g), `sheriff reindex` называет это расширение.

Переименованный ключ и переименованный тип узла не меняют `fingerprint` узла (§s-v4qus7raqnwzneb). `sheriff reindex` называет каждый файл, который она изменяет таким образом, включая файлы спецификации.

**Причина:** Каждый файл и каждый тест проекта записан в виде релиза инструментов SpecSheriff, который последним его записывал или читал. Релиз, который записывает или читает их иначе, переписывает их, чтобы никому не приходилось переписывать проект вручную и чтобы ни одно одобрение не было потеряно из-за переименования.

TWO READINGS:
- "wrote or read differently from the release": "differently" относится (1) к обоим глаголам — «записывал иначе или читал иначе»; (2) только к "read" — «всё, что записал, либо читал иначе». Контекст говорит в пользу (1).
- "before it validates the files": какие файлы, раньше не сказано. Скорее всего — файлы спецификации и её архива из следующего предложения.
- "every link that points to it": (1) связи, записанные в самом архивном узле как входящие; (2) связи в других узлах, указывающие на архивный узел. Формулировка "loses" говорит в пользу (1), но тогда связи в других узлах остаются висеть.
- "A kind of node is also renamed where a field's values are the sids of that kind's nodes, and where the project's extension of the schema declares `fields` for that kind.": "where" — (1) условие, как везде в этой спецификации: тип переименовывается, только если оба условия выполнены; (2) место: имя типа переименовывается также в тех местах, где оно встречается, — в объявлении поля, значения которого являются sid узлов этого типа, и в расширении схемы проекта. По смыслу подходит (2), но читатель, привыкший к условному "where", поймёт (1).
- "until `sheriff.config.json` holds an entry": (1) условие — «если такой записи ещё нет»; (2) длительность — замена повторяется, пока запись не появится. Контекст говорит в пользу (1).
- "an approved rule of `project.json` that refines the rule on that status": (1) одно такое правило; (2) каждое такое правило, если их несколько. Текст не говорит, что делать при нескольких.
- "with that key renamed": "that key" отсылает к ключу `owner` из предыдущего пункта списка, а не из этого предложения.
- "that entry names the owner who last approved that rule": "that entry" и "that rule" отсылают к предыдущему пункту списка; сам пункт — не изменение, хотя список объявлен как "the following changes".
- "that rule is moved to the archive": "that rule" отсылает на два пункта назад.
- "leaves unchanged a RecordType": (1) RecordType не меняется вообще, включая переименование ключей `id` и `rationale` и типа узла; (2) не выполняется только преобразование `fields` и `unknown` в `schema`. Буквально сказано (1); по смыслу вероятнее (2).
- "in this way": не названо, каким образом. Это (1) любым изменением, описанным в узле; (2) только переименованием ключа или типа узла из предыдущего предложения. Продолжение "including the files of the specification" говорит в пользу (1).
- "the release of the SpecSheriff tools that last wrote or read it": "that" относится (1) к релизу; (2) к инструментам. Контекст говорит в пользу (1).

LANGUAGE:
- "occurs in one of these places:" → "meets one of these conditions:" — пункты списка ("it opens…", "it is…") являются предложениями, а не местами, и вводная фраза с ними не согласуется.
- "the only argument of the test's mark" → "the only argument of a test's mark" — в этом пункте никакой тест раньше не назван: "a test's name" стоит в другом пункте.
- "until `sheriff.config.json` holds an entry" → "where `sheriff.config.json` holds no entry" — "until" обозначает длительность, а здесь условие. Не уверен, что замена сохраняет смысл, если имелось в виду именно «при каждом запуске, пока записи нет».
- "names as tests of the system's code" → "names as a file of tests of the system's code" — "each file … names as tests": единственное число не согласуется с множественным, и файл не является тестами. Кроме того, `sheriff.config.json` содержит шаблоны, а не имена файлов, так что точнее было бы "matches"; не уверен, что такая замена сохраняет смысл.
- "has yet to choose that extension" → "has not chosen that extension" — "has yet to" подразумевает, что проект это расширение обязательно выберет.
- "is written in the form of the release" → "is written in the form that the release … uses" — "in the form of X" по-английски значит «в виде X», то есть «записан как релиз».

### english-group3.md · proposal:row-10-1-35a
TRANSLATION:
(Вводная строка) Предложение: новая строка основной таблицы проверок, 10.1.35a (новая строка основной таблицы проверок, после строки 10.1.35). При невыполнении: отказ.

**Текст:** Каждый тип узла, который добавляет расширение схемы проекта (§s-xm8rz4uupb73gu5), указан с тем же `needsCode` в списках правил собственных guidelines проекта, уточняющих правило о собственных типах узлов проекта (§s-vsh384ybt4w25a2). Каждый тип, который указан в списках этих правил, — один из тех, что добавляет расширение

TWO READINGS:
- "is listed, with the same `needsCode`, in the rules": (1) тип указан в каждом из этих правил; (2) тип указан хотя бы в одном из них, то есть правила берутся вместе. Узел new:tools-7-2-own-kinds ("taken together") говорит в пользу (2), но сама строка этого не говорит.
- "with the same `needsCode`": не сказано, тот же, что где. Скорее всего — тот же, что даёт типу расширение схемы.
- "the rules of the project's own guidelines that refine the rule": "that refine" относится (1) к правилам; (2) к guidelines. Контекст говорит в пользу (1).
- "the extension": (1) расширение схемы проекта из первого предложения; (2) расширение guidelines. Контекст говорит в пользу (1).

LANGUAGE:
- "one that the extension adds" → "one that the extension adds." — в конце предложения нет точки.
- "the same `needsCode`" → "the same `needsCode` as the extension gives it" — у "the same" нет второго члена сравнения.
- "(new row of the main table of checks, after row 10.1.35)" → "(after row 10.1.35)" — скобка дословно повторяет слова, стоящие прямо перед ней.
