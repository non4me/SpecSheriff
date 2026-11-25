### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-c.md · new:tools-7-1-extensions-delivered
TRANSLATION: Среди команд, которые читают выбранные расширения, есть и `sheriff guard`. Она проверяет правку агента до того, как правка сделана (§s-st6td4mua9uqt9z).
TWO READINGS:
- "also include": «также» означает «кроме команд, названных раньше». В этом абзаце таких команд нет, и читатель не знает, чего именно «также».
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-c.md · s-2x58az67bm6cxq2
TRANSLATION:
- Коммит изменяет символ или тест, если строка этого символа или теста меняет код (§s-u6mj5yv8ngnz79v).
- Тест, который коммит переименовывает вне его SpecTag и больше никак не меняет, тоже остаётся тем же тестом (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).
- Коммит изменяет файл, привязанный целиком, если он меняет любую часть текста файла, включая комментарий или пробельные символы (§s-kgbzk2ph9e6jfb4).

TWO READINGS:
- "where a line of that symbol or test changes the code": «where» значит либо условие («если»), либо место («в том случае, когда»). Контекст склоняет к условию.
- "a line of that symbol or test changes the code": (а) строка сама изменена в коммите, и эта правка считается изменением кода; (б) строка как часть кода влияет на поведение. Контекст склоняет к (а), но «the code» не сказано, чей именно: этого символа или всей системы.
- "outside its SpecTag": (а) переименована та часть имени, что не входит в SpecTag; (б) переименование сделано в другом месте, не там, где стоит SpecTag. Контекст склоняет к (а).
- "also stays the same test": «also» ссылается на утверждение, которое в этой секции не названо. Вероятно, речь о тесте, который вообще не менялся.
- "it changes any part of the file's text": «it» это либо коммит (вероятнее), либо файл.
- "including a comment or whitespace": (а) включая правку комментария или пробелов; (б) включая сам комментарий как часть текста. Контекст склоняет к (а).

LANGUAGE:
- "where a line of that symbol or test changes the code" → "if a line of that symbol or test is a line that changes the code" — «where» в роли условия читается и как место, а слово «changes» употреблено дважды с разными подлежащими. Я не уверен, что замена сохраняет смысл, потому что неясно, о чём именно говорит строка.
- "that the commit renames outside its SpecTag" → "that the commit renames only in a part of its name other than its SpecTag" — «renames outside» без уточнения читается двояко. Замена верна лишь для SpecTag, стоящего в имени. Для pytest mark смысл другой.
- "where it changes any part" → "if the commit changes any part" — «where» как условие и «it» без ясного антецедента.
- "where it changes" → "if it changes" — отдельное вхождение того же приёма (третье предложение, «where» как условие).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-c.md · new:tools-7-2-changed-line
TRANSLATION: Если читать каждую строку как токены языка её файла, то отбрасывается то, что не может изменить поведение кода: например комментарии и пробельные символы между токенами.
TWO READINGS:
- "leaves out": не сказано, откуда отбрасывается. Вероятно, из сравнения строки до и после коммита.
- "its file": файл, в котором стоит строка (а не файл языка). Читается однозначно.
LANGUAGE:
- "Reading each line as the tokens of the language of its file" → "Reading each line as a sequence of tokens of the language of its file" — строка читается не «как токены», а «как последовательность токенов». Артикль «the» перед «tokens» тоже неестествен.
- "leaves out what cannot alter what the code does" → "leaves out of the comparison what cannot alter what the code does" — у глагола нет дополнения «откуда». Я не уверен, что «the comparison» верно: это моё предположение.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-c.md · new:tools-7-2-draft-rule
TRANSLATION: Он берёт статус одобрения каждого правила, названного этими SpecTag, из спецификации в том виде, в каком её оставляет коммит.
TWO READINGS:
- "It": в этом абзаце нет названного подлежащего. Вероятно, это проверка или команда, о которой говорит узел.
- "those SpecTags": ссылка на SpecTag, не названные в этом абзаце. Вероятно, SpecTag кода и тестов, названные в соседнем предложении узла.
- "that those SpecTags name from the specification": «from the specification» относится к «takes» (вероятнее) или к «name». Во втором случае получилось бы «правило, которое SpecTag называют из спецификации».
- "as the commit leaves it": «it» это спецификация (вероятнее) или статус одобрения.
LANGUAGE:
- "takes the approval status of each rule that those SpecTags name from the specification" → "takes, from the specification, the approval status of each rule that those SpecTags name" — придаточное «that those SpecTags name» разделяет «takes» и «from the specification», и фраза читается двояко. Смысл сохраняется.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-c.md · s-t383grkn3q68dpf
TRANSLATION: Наиболее вероятная ошибка — учитывать только SpecTag, расположенные над символами. Тогда `sheriff binding` отказал бы этому `meta.code` за то, что в нём назван `src/texts.json`.
TWO READINGS:
- "which would make": «which» относится ко всей ошибке (вероятнее) или к «the SpecTags placed above symbols».
- "that `meta.code`": какое именно `meta.code`, не названо. Вероятно, имеется в виду `meta.code` из примера этого узла.
LANGUAGE:
- "that `meta.code`" → "a `meta.code` that" — «that» указывает на сущность, которой нет в тексте. Замена меняет смысл, если речь об одном конкретном `meta.code` из примера.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-c.md · s-5hb9k2e34dgn284
TRANSLATION:
- Если файл, место или символ, на которые указывает список, найти не удаётся, отказ называет тот из них, которого не хватает.
- Для члена списка, который является объектом, значение — это значение свойства, которое называет `TextRule.list.property`.
- `TextRule.list.jsonSchema` правила указывает на `#/properties/state` в `schema/request.schema.json`, а схема в этом месте содержит `"enum": ["open", "done", "cancelled", "held"]`.

TWO READINGS:
- "the one that is missing": (а) то из трёх, которого нет, один; (б) если нет нескольких, названы все недостающие. Предложение говорит только об одном.
- "a member that is an object": «member» — это член списка (вероятнее) или член JSON-объекта, пара «ключ-значение» в терминологии JSON.
- "the value is the value": «the value» первого слова не определено: чьё это значение. Вероятно, значение члена списка, по которому он сопоставляется.
- "The rule's": какое правило, не названо. Вероятно, правило из примера этого узла.
LANGUAGE:
- "For a member that is an object" → "For a list member that is an object" — без слова «list» «member» двусмысленно (см. выше).
- "the refusal names the one that is missing" → "the refusal names the one that cannot be found" — в предложении одно и то же названо двумя разными словами: «cannot be found» и «is missing». Я не уверен, что замена нужна. Если «missing» значит «отсутствует в своём файле», смысл меняется.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-c.md · new:tools-7-2-own-kinds
TRANSLATION:
- Сравнение этих двух держит объявление каждого типа узлов, включая то, требуется ли для его узлов имплементация в коде, в соответствии с тем, что одобрил ответственный.
- Тогда коммит прошёл бы, хотя правило говорит, что узлы типа `procedure` не требуют кода, а схема говорит, что требуют.

TWO READINGS:
- "the two": чего именно два, не названо. Вероятно, объявление типов в расширении схемы и список типов в правилах собственных guidelines проекта.
- "an owner": любой ответственный (вероятнее, по форме) или тот, кто отвечает за соответствующий раздел.
- "The commit would then pass": «then» относится к условию, которого в этом абзаце нет (проверка не делается). Читатель вынужден его восстанавливать.
- "the rule" и "the schema": какое правило и какая схема, не названо. Вероятно, правило из собственных guidelines проекта и расширение схемы проекта.
LANGUAGE:
- "Comparing the two keeps the declaration of each kind" → "Comparing the two ensures that the declaration of each kind stays in line with what an owner has approved" — сравнение само ничего не «держит»: оно проверяет. Замена меняет подлежащее смысла: действует проверка, а не сравнение.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-c.md · s-cdachayybfvg4na
TRANSLATION: Значение члена списка, который является объектом, — это значение свойства, которое называет `TextRule.list.property`.
TWO READINGS:
- "a member that is an object": член списка (вероятнее) или член JSON-объекта.
- "The value of a member": значение, о котором идёт речь, не названо: для какой цели оно берётся. Вероятно, для сопоставления членов списка.
LANGUAGE:
- "The value of a member that is an object" → "The value of a list member that is an object" — без слова «list» «member» двусмысленно (термин JSON).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-c.md · proposal:s-9j2mmnuuwmx5ksn
TRANSLATION: Переименование теста или переформулирование комментариев в тестах либо в файле, символы которого проверки могут определить, не меняет ни тест, ни код, пока SpecTag остаётся прежним (§s-kgbzk2ph9e6jfb4). (Слова ревьюера для суженной области, вставленные в согласованное предложение.)
TWO READINGS:
- "the comments in the tests or in a file whose symbols the checks can identify": «in» относится ко «comments» (вероятнее): комментарии в тестах либо в таком файле. Либо «or» соединяет «renaming a test» и «rewording the comments».
- "the SpecTag": чей SpecTag, не названо: теста, который переименован, или любого SpecTag в файле. Контекст склоняет к SpecTag теста.
- "the code": какой код, не названо. Вероятно, код в файле, где переписаны комментарии.
- "the narrowed scope": суженная относительно чего, не названо.
LANGUAGE:
- "set into the agreed sentence" → "inserted into the agreed sentence" — «set into» употребляется о вставке драгоценных камней и не подходит для текста.
- "The reviewer's words for the narrowed scope" → "The reviewer's wording of the narrowed scope" — «words for» передаёт «слова для», а по-английски говорят «wording of».

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3.md · proposal:new-tools-1-settings-g3
TRANSLATION:
Предложение: полная новая формулировка согласованного узла `new:tools-1-settings`.

Заголовок: Общие настройки проекта.

Текст:

`sheriff.config.json` (§s-zefk589ykh37b8u) содержит общие настройки инструментов SpecSheriff:
- glob-шаблоны, которым соответствуют файлы с кодом системы (§s-hheus6f395ynqvc), и те, которым соответствуют файлы с её тестами;
- для каждой проверки и каждого генератора, которые добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): правило, которое его перечисляет, его имя в этом правиле, команда, которая его запускает, и glob-шаблоны, которым соответствуют файлы с его кодом и его тестами (§s-utf4mbt7ref8g9c);
- записи, задающие статус одобрения спецификации (§s-qzthyh7yqvfhsa2) и её флаг `strict` (§s-q3pfzyaxvpr2zj2), и записи, фиксирующие, какие расширения guidelines (§s-mbmnsnxenmavu3z) выбрал проект (§s-9ttvcwpqkehm58g);
- команда, которая запускает тесты кода системы и собственных проверок и генераторов проекта (§s-477gtdrkw34dzxw);
- общие настройки ревьюера (§s-xr5xxa9cxf2mq5u).

Инструменты SpecSheriff отказывают `sheriff.config.json`, который не является корректным JSON или не соответствует своей схеме (§s-zefk589ykh37b8u).

Чтобы найти SpecTag (§s-8xw4mgvpexyvw5q), которые привязывают код и тесты к их правилам, инструменты SpecSheriff читают только файлы, которым соответствуют glob-шаблоны для кода или для тестов в `sheriff.config.json`, файлы, в которые `sheriff types` записывает типы (§s-pvzms7d8kxb8dk2), и файл привязок (§s-trwczfskj5zmuft). Файл, соответствующий и шаблону для кода, и шаблону для тестов, читается как тест.

Причина: настройка, которая хранится в репозитории, одинакова в каждом клоне, поэтому инструменты SpecSheriff ведут себя одинаково для всех, кто работает над проектом.

TWO READINGS:
- "and those holding its tests": «those» это файлы (вероятнее) или glob-шаблоны; «holding» подходит только файлам.
- "its `strict` flag": флаг спецификации (вероятнее) или флаг статуса одобрения.
- "the rule that lists it": «it» относится к каждой проверке и каждому генератору по отдельности (распределительно).
- "its schema": схема файла `sheriff.config.json` (вероятнее) или схема JSON.
- "the glob patterns for code or for tests in `sheriff.config.json`": «in» относится к шаблонам (вероятнее), а не к «read».
- "the types": какие типы, не названо. Вероятно, типы RecordType.
- "is read as a test": считается тестом при поиске SpecTag. Подразумевается, что в нём ищут SpecTag, как в тестах, а не как в коде.
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3.md · proposal:s-gb8s9657a65hqmv-g3
TRANSLATION:
Предложение: полная новая формулировка согласованного узла `new:tools-2-reindex-earlier`.

Заголовок: Что `sheriff reindex` меняет в том, что записал более ранний релиз.

Текст:

`sheriff reindex` переписывает всё, что более ранний релиз инструментов SpecSheriff записал или прочитал иначе, чем релиз, которому принадлежит `sheriff reindex`. Он делает это после слияния дублирующихся ключей (§s-w5wg69pvvhedsws) и перед проверкой файлов. В каждом файле спецификации и её архива он вносит такие изменения:
- ключ узла `id` становится `location`, а ключ узла `rationale` становится `reason`;
- типы узлов `record` и `recordType` становятся `RecordType`, `rule` становится `TextRule`, а `domain` становится `header`;
- статус узла `""` становится `draft`, а `checked` становится `approved`;
- ключ узла `owner`, содержащий адрес email, становится `owners`, который содержит список с этим адресом;
- `fields` и `unknown` RecordType становятся его `schema` (§s-6eb92ddch7shuvu) так: каждое поле становится свойством, схема которого — та, что задана для нейтрального типа поля (§s-4npdup7mjkva69y); `text` поля становится `description` свойства; каждое поле, которое RecordType отмечает как обязательное, перечисляется в `required` схемы; поле, обязательное только в случае, когда оно содержит значение, становится необязательным свойством; а `unknown: "refused"` становится `additionalProperties: false`;
- источник значений поля становится `x-enumSource` поля (§s-xfu2gpzddjnmgks);
- `TextRule.list.declaredIn` удаляется, если указывает на поле `kinds` расширения схемы проекта (§s-xm8rz4uupb73gu5);
- `TextRule.list.declaredIn` становится `TextRule.list.jsonSchema`, если указывает на любое другое место в JSON Schema;
- `TextRule.list.declaredIn` становится `TextRule.list.valueList`, если называет объявление в коде;
- связь типа `supersedes` удаляется (§s-sn6au3vcr9uy5pm);
- узел архива теряет свой sid и каждую связь, которая указывает на него (§s-f2b5zvc565s242f, §s-bpdqd9v72wg7vsz).

Переименованный ключ сохраняет своё место среди ключей узла. Тип узла также переименовывается, если значения поля — это sid узлов этого типа и если расширение схемы проекта объявляет `fields` для этого типа.

Голый sid — это слово, имеющее форму sid и встречающееся в одном из таких мест:
- оно открывает имя теста, за ним идёт пробел или конец имени;
- оно — единственный аргумент метки теста.

`sheriff reindex` также вносит такие изменения:
- `specs/_confirmations.jsonl` становится `specs/_approvals.jsonl`, а ключ `owner` в каждой его строке становится `by`;
- если `specs/_approvals.jsonl` уже существует, строки `specs/_confirmations.jsonl` с переименованным ключом дописываются в него, а `specs/_confirmations.jsonl` удаляется;
- пока в `sheriff.config.json` нет записи, которая задаёт статус одобрения спецификации, одобренное правило из `project.json`, уточняющее правило об этом статусе (§s-qzthyh7yqvfhsa2), заменяется записью, которая одобряет спецификацию;
- эта запись называет ответственного, который последним одобрил это правило;
- это правило переносится в архив (§s-f2b5zvc565s242f) с причиной «Replaced by the entry in `sheriff.config.json` that records the specification's approval status»;
- ключ `writesSpecSheriffGuidelines` удаляется из `sheriff.config.json` (§s-zefk589ykh37b8u) до того, как инструменты SpecSheriff проверяют этот файл;
- в каждом файле, который `sheriff.config.json` называет тестами кода системы или собственной проверки либо генератора проекта, перед каждым голым sid вставляется `@spec `.

`sheriff reindex` оставляет без изменений RecordType, который содержит поле типа `variant`, поле, значения которого берутся из источника `domains`, или поле, чей собственный список значений пуст, и называет этот RecordType и каждое такое поле.

Если узел спецификации имеет тип, или содержит связь типа, который добавляет расширение guidelines, а проект это расширение ещё не выбрал (§s-9ttvcwpqkehm58g), `sheriff reindex` называет это расширение.

Переименованный ключ и переименованный тип узла оставляют `fingerprint` узла неизменным (§s-v4qus7raqnwzneb). `sheriff reindex` называет каждый файл, который он изменяет таким образом, включая файлы спецификации.

Причина: каждый файл и каждый тест проекта записан в виде релиза инструментов SpecSheriff, который последним записал или прочитал его. Релиз, который записывает или читает их иначе, переписывает их, чтобы никому не приходилось переписывать проект вручную и чтобы ни одно одобрение не терялось из-за переименования.

TWO READINGS:
- "wrote or read differently from the release": «иначе» — иначе, чем делает текущий релиз (вероятнее), либо иначе по времени. Сравнение явно не выражено.
- "It does so": «it» это `sheriff reindex`, «does so» это «переписывает».
- "its archive": архив спецификации.
- "its `schema`": схема RecordType.
- "the schema's `required`": `required` в `schema` RecordType (вероятнее), а не в схеме отдельного свойства.
- "the source of a field's values": ключ поля с источником значений (вероятнее) или сам источник.
- "A kind of node is also renamed where a field's values are the sids of that kind's nodes": «where» как условие или как место. Переименовывается не сам тип, а его имя, записанное в объявлении поля. «also» — помимо ключа `kind` узлов.
- "it": в «a node of the archive loses its sid and every link that points to it» это узел (вероятнее) или sid; на практике одно и то же.
- "occurs in one of these places": пункты ниже описывают не места, а позиции или способы.
- "the test's mark": метка pytest (вероятнее) или любая метка.
- "becomes `specs/_approvals.jsonl`": первый пункт не оговорён условием, хотя второй пункт покрывает случай, когда файл уже есть. Контекст склоняет к тому, что первый пункт верен, только если `_approvals.jsonl` ещё нет.
- "that key": ключ `owner`.
- "to it": в `specs/_approvals.jsonl` (вероятнее).
- "that entry": запись, которая заменяет правило (вероятнее), а не запись из «until»-условия.
- "that rule": одобренное правило из `project.json`.
- "a RecordType that holds a field of type `variant`, a field whose values come from the source `domains`, or a field whose own list of values is empty": (а) RecordType, содержащий поле одного из трёх видов (вероятнее: далее «names that RecordType and each such field»); (б) три отдельных объекта: RecordType, поле, поле.
- "names": сообщает имя (вероятнее), а не «даёт имя».
- "that an extension of the guidelines adds": относится и к «kind», и к «type of link» (вероятнее) или только ко второму.
- "in this way": переименованием ключа или типа (вероятнее) либо любым изменением из списка.
- "including the files of the specification": включая, в отличие от прочих файлов проекта (тестов и конфигурации).
- "that last wrote or read it": «it» относится к каждому файлу и тесту по отдельности.
- "differently": иначе, чем более ранний релиз.
- "a rename": переименование из перечня выше.
LANGUAGE:
- "wrote or read differently from the release that `sheriff reindex` belongs to" → "wrote or read in a form different from the one that the release that `sheriff reindex` belongs to writes or reads" — «differently from the release» сравнивает действия с релизом, а не с тем, как релиз действует. Замена тяжелее, но верна по смыслу.
- "occurs in one of these places" → "occurs in one of these two positions" — следующие пункты описывают позиции, а не места. Я не уверен, что «positions» сохраняет смысл: пункты можно считать и способами.
- "until `sheriff.config.json` holds an entry" → "where `sheriff.config.json` holds no entry" — «until» описывает единовременное действие, но подразумевает продолжительность. Я не уверен, что замена сохраняет смысл: «until» может значить, что замена повторяется при каждом запуске, пока записи нет.
- "A kind of node is also renamed where" → "The name of a kind of node is also replaced where" — переименовывается не сам тип узла, а его имя, записанное в другом месте.
- "is written in the form of the release" → "is written in the format of the release" — «form» вместо «format» передаёт русское «форма» (в значении «формат»).
- "A release that writes or reads them differently" → "A release that writes or reads them differently from the earlier release" — у сравнения нет второго члена. Замена добавляет «earlier», я не уверен, что это верный второй член сравнения.
- "the release of the SpecSheriff tools that last wrote or read it" → "the release of the SpecSheriff tools that last wrote it" — файл может быть записан в формате релиза, который его записал, но чтение не придаёт файлу формат. Я не уверен: возможно, автор имеет в виду релиз, который файл прочитал без ошибки.
- "the test's mark" → "the test's pytest mark" — «mark» без «pytest» неясно.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3.md · proposal:row-10-1-35a
TRANSLATION:
Предложение: новая строка основной таблицы проверок, 10.1.35a (новая строка основной таблицы проверок, после строки 10.1.35). При провале проверки: отказ.

Текст: Каждый тип узла, который добавляет расширение схемы проекта (§s-xm8rz4uupb73gu5), перечислен с тем же `needsCode` в правилах собственных guidelines проекта, которые уточняют правило о собственных типах узлов проекта (§s-vsh384ybt4w25a2). Каждый тип, который перечисляют эти правила, — это тип, который добавляет расширение. (Текст обрывается: второе предложение без точки, и в файле нет продолжения.)

TWO READINGS:
- "On failure: refused.": отказано в чём: коммиту (вероятнее) или другому действию. Не сказано.
- "with the same `needsCode`": такой же, как какой? Вероятно, как в объявлении расширения схемы.
- "is listed ... in the rules": хотя бы в одном из правил (вероятнее) или в каждом.
- "those rules": правила собственных guidelines проекта, уточняющие правило о собственных типах узлов.
LANGUAGE:
- "On failure: refused." → "On failure, the commit is refused." — фрагмент без подлежащего; что именно отклоняется, не сказано. Я не уверен, что «the commit» — верный объект: это моё предположение.
- "with the same `needsCode`" → "with the same value of `needsCode`" — пропущено «value».
- "Each kind that those rules list is one that the extension adds" → "Each kind that those rules list is one that the extension adds." — второе предложение оборвано, нет точки. Возможно, файл обрезан, и текста после «adds» нет.
