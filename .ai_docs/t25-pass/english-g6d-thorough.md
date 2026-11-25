### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 8
TRANSLATION: Каждая строка — это текст, который `JSON.stringify` пишет, без пробельных символов вне строковых значений, для объекта, в котором есть только следующие ключи, в этом порядке:
TWO READINGS:
- "holds only the following keys": (а) в объекте нет никаких ключей, кроме перечисленных, но не все обязаны присутствовать; (б) в объекте есть ровно все перечисленные ключи. Контекст (пункт о `withdrawn`) поддерживает (а).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 9
TRANSLATION: `withdrawn` со значением `true`, который встречается только в строке, отзывающей одобрение;
TWO READINGS:
- "which appears only in a line that withdraws an approval": (а) только в такой строке встречается ключ `withdrawn`; (б) только в такой строке встречается значение `true`. Контекст поддерживает (а).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 10
TRANSLATION: Последнее одобрение узла спецификации — это самая поздняя строка для sid узла и `fingerprint` его нынешней формулировки, если эта строка является одобрением.
TWO READINGS:
- "the latest line for the node's sid and the fingerprint of its current wording": (а) самая поздняя строка, относящаяся и к sid узла, и к `fingerprint` нынешней формулировки; (б) последнее одобрение — это «самая поздняя строка для sid узла» плюс отдельно «`fingerprint` нынешней формулировки». Контекст поддерживает (а).
- "where that line is an approval": (а) условие — «если эта строка является одобрением»; (б) попутное пояснение — «причём эта строка является одобрением». Следующее предложение с "Otherwise" поддерживает (а).
LANGUAGE:
- ", where that line is an approval" → ", if that line is an approval" — после запятой "where" читается как пояснение, а не как условие; "if" сохраняет смысл условия.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 11
TRANSLATION: В противном случае последнее одобрение узла — это последняя строка для sid узла, являющаяся одобрением, независимо от того, отзывает ли это одобрение более поздняя строка.
TWO READINGS:
- "the last line": в предыдущем предложении стоит "the latest line", здесь "the last line". (а) Это одно и то же — строка, стоящая в файле последней; (б) это разные понятия. Контекст поддерживает (а), но разные слова заставляют искать различие.
- "Otherwise": (а) если самая поздняя строка для sid и `fingerprint` нынешней формулировки не является одобрением; (б) также если такой строки нет вовсе. Текст не говорит, входит ли (б).
LANGUAGE:
- "the last line for the node's sid that is an approval" → "the latest line for the node's sid that is an approval" — в узле определено слово "latest"; замена сохраняет смысл, только если "last" и "latest" здесь означают одно и то же.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 15
TRANSLATION: `fingerprint` формулировки узла (§s-5ah25f6gy99panq) — это хеш SHA-256 от байтов UTF-8 одной строки.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 16
TRANSLATION: Эта строка — текст, который `JSON.stringify` пишет, без пробельных символов вне строковых значений, для объекта, построенного из узла.
TWO READINGS:
- "That string": указывает на "a single string" из предыдущего абзаца узла; в своём абзаце строка заново не названа.
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 17
TRANSLATION: Одобрение записывает формулировку по её `fingerprint`, чтобы изменение этой формулировки оставляло узел без действующего одобрения, а никакое другое изменение узла не оставляло (§s-5ah25f6gy99panq).
TWO READINGS:
- "its fingerprint": (а) `fingerprint` формулировки; (б) `fingerprint` одобрения. Контекст поддерживает (а).
- "so that": (а) цель — «чтобы»; (б) следствие — «так что». Для обоснования правила годятся оба, смысл близок.
- "the node": узел в этом предложении раньше не назван (обоснование с него начинается); скорее всего, это узел, чью формулировку записывает одобрение.
LANGUAGE:
- "An approval records a wording by its fingerprint" → "An approval records a wording of a node by that wording's fingerprint" — без этого "the node" дальше в предложении не на что опереть; смысл сохраняется.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 18
TRANSLATION: Каждая строка `TableRule` содержит правило и текст, который говорит, чего стоит провал этого правила.
TWO READINGS:
- "Each row of a `TableRule`": (а) общее утверждение о любом `TableRule` — в каждой строке любой такой таблицы есть правило и текст о цене провала; (б) описание одной таблицы из примера. Примеру нужно (б), но английский говорит (а).
- "a rule and text that says": (а) "that says" относится только к "text"; (б) и к правилу, и к тексту. Контекст поддерживает (а).
LANGUAGE:
- "Each row of a `TableRule` holds" → "Each row of one `TableRule` holds" — в примере описывается конкретная таблица, а "a `TableRule`" читается как общее правило; замена сохраняет смысл, только если имелась в виду одна таблица примера.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 22
TRANSLATION: Если `sheriff approve` отказывает по какому-либо sid, названному в запуске, команда не записывает ни одного одобрения этого запуска и не меняет статус ни одного узла.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 26
TRANSLATION: Для каждого одобрения формулировки (§s-5ah25f6gy99panq) такого узла, если это одобрение действует, и независимо от того, содержит ли узел эту формулировку сейчас, команда добавляет в конец `specs/_approvals.jsonl` строку, которая отзывает это одобрение (§s-v4qus7raqnwzneb).
TWO READINGS: none
LANGUAGE:
- "For each approval of a wording (§s-5ah25f6gy99panq) of such a node, where that approval is in force and whether or not the node holds that wording now," → "For each approval in force of a wording (§s-5ah25f6gy99panq) of such a node, whether or not the node holds that wording now," — "where … and whether or not …" соединяет союзом условие и уступку, и читатель спотыкается; смысл сохраняется.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 27
TRANSLATION: Команда добавляет эти строки в том порядке, в котором в файле появляется первая строка для каждой такой формулировки.
TWO READINGS:
- "the first line for each such wording": (а) самая ранняя строка файла с `fingerprint` этой формулировки, будь то одобрение или отзыв; (б) первая из только что добавляемых строк отзыва. Контекст поддерживает (а).
- "each such wording": (а) каждая формулировка, одобрение которой действует; (б) каждая формулировка узла, когда-либо одобренная. Контекст поддерживает (а).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 28
TRANSLATION: Если `sheriff approve --withdraw` отказывает по какому-либо sid, названному в запуске, команда не записывает ни одного отзыва этого запуска и не меняет статус ни одного узла.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 32
TRANSLATION: `by` записи настройки содержит адрес электронной почты ответственного, который сделал изменение, записанное этой записью.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 33
TRANSLATION: Если в `sheriff.config.json` нет ни одной записи для флага `strict`, флаг имеет то значение, которое схема `sheriff.config.json` задаёт как `default` для `on` записи (§s-zefk589ykh37b8u).
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 34
TRANSLATION: Записи хранят каждое изменение, которое ответственный внёс в эти настройки, каждое — с адресом электронной почты внёсшего его ответственного, но значение настройки задаёт только последняя запись каждого списка.
TWO READINGS:
- "these settings": настройки раньше в обосновании не названы (оно с этого предложения начинается); скорее всего, это настройки из заголовка узла — те, что меняет только ответственный.
- "The entries": записи тоже названы только в заголовке узла; скорее всего, это записи этих настроек в `sheriff.config.json`.
LANGUAGE:
- "these settings" → "the settings that only an owner of the specification changes" — обоснование читается отдельно от заголовка, и "these" ни на что в нём не указывает; смысл сохраняется.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 35
TRANSLATION: `sheriff reindex` пишет запись вместо правила, посредством которого ответственный одобрил спецификацию в более раннем релизе (§s-gb8s9657a65hqmv).
TWO READINGS:
- "in an earlier release": (а) в более раннем релизе инструментов SpecSheriff; (б) в более раннем релизе самого проекта. Контекст поддерживает (а).
- "writes an entry in place of the rule": (а) пишет такую запись только там, где такое правило есть; (б) пишет её всегда. Контекст поддерживает (а), но предложение условия не называет.
LANGUAGE:
- "in an earlier release" → "under an earlier release of the SpecSheriff tools" — "release" без объекта не говорит, чей релиз; смысл сохраняется, только если имелся в виду релиз инструментов.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 36
TRANSLATION: Поскольку ни одна запись не содержит ничего, что зависит от времени её написания, проверка записей (§s-j9r8z4xdrfkfs47) никогда не принимает запись, которую пишет `sheriff reindex`, за запись, которую изменили.
TWO READINGS:
- "when it is written": (а) когда написана запись; (б) когда написано то, что в ней содержится. Контекст поддерживает (а).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 40
TRANSLATION: Проверки перед одобрением считают всё остальное, что хранит репозиторий, — например архив (§s-f2b5zvc565s242f), остальные строки `specs/_approvals.jsonl` и записи в `sheriff.config.json`, — не изменённым этим одним коммитом.
TWO READINGS:
- "that one commit": указывает на "one commit" из предыдущего абзаца узла ("as if one commit added the following"); в своём абзаце коммит не назван.
- "everything else": «всё, кроме перечисленного в списке предыдущего абзаца»; сам абзац не говорит, кроме чего.
- "the other lines of `specs/_approvals.jsonl`": «строки, кроме действующих одобрений одобренных узлов», названных в списке предыдущего абзаца.
LANGUAGE:
- "as unchanged by that one commit" → "as unchanged by the one commit that they assume" — "that" указывает в другой абзац; смысл сохраняется.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 41
TRANSLATION: Команда отказывается записывать одобрение в каждом случае, в котором она отказалась бы включить флаг.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 42
TRANSLATION: Запуск `sheriff settings` заканчивается этим отказом.
TWO READINGS:
- "ends with that refusal": (а) после отказа запуск прекращается, и проверки перед одобрением уже не выполняются; (б) отказ — последнее, что запуск выводит, а остальные проверки могли пройти до него. Контекст (слово "first" в начале абзаца) поддерживает (а).
LANGUAGE:
- "The run of `sheriff settings` ends with that refusal." → "After that refusal, `sheriff settings` does nothing more in that run." — исходная фраза не говорит прямо, что дальнейшие проверки не выполняются; замена сохраняет смысл, только если имелось в виду чтение (а).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 43
TRANSLATION: Этот отказ — такой же, как отказ включить флаг в этом случае.
TWO READINGS:
- "is the same as": (а) отказ содержит то же самое — называет те же команды, что и отказ включить флаг; (б) это тот же самый отказ, то есть команда отвечает, что отказывается включить флаг. Контекст поддерживает (а).
- "in that case": (а) в том из случаев "each case" (двумя предложениями раньше), который имеет место; (б) в случае, когда запуск закончился отказом. Контекст поддерживает (а).
LANGUAGE:
- "The refusal is the same as the refusal to turn the flag on in that case." → "The refusal names what the refusal to turn the flag on names in that case." — "is the same as" не говорит, в чём совпадение; замена сохраняет смысл, только если имелось в виду чтение (а).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 44
TRANSLATION: Тогда R не входит в число правил, которые включает предполагаемый коммит, и ответственный так и не видит, чего R недостаёт.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 48
TRANSLATION: Проверки, которые флаг `strict` делает строже, случаи, в которых каждая из них отказала бы коммиту или пушу, ничего не меняющему, и команда, которую для каждой из них называет отказ включить флаг, таковы:
TWO READINGS:
- "a commit or a push that changes nothing": (а) "that changes nothing" относится и к коммиту, и к пушу; (б) только к пушу. Контекст поддерживает (а).
LANGUAGE:
- "the command that the refusal to turn the flag on names for each" → "the command that the refusal to turn the flag on gives for each" — "on names" сначала читается как единое сочетание, и фразу приходится разбирать заново; не уверен, что "gives" полностью сохраняет смысл "names".

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 49
TRANSLATION: проверка на код и тесты вне коммита (§s-3xx2eukc8gtd2tx), которые не связывает ни один SpecTag (§s-8xw4mgvpexyvw5q): она отказала бы там, где `sheriff untagged` (§s-weuyx98r7c923ab) что-нибудь перечислил бы, и отказ называет `sheriff untagged`;
TWO READINGS:
- "the refusal": (а) отказ `sheriff settings` включить флаг; (б) отказ самой проверки, только что названный словами "it would refuse". Вводная фраза списка поддерживает (а), но ближайшее слово "refuse" относится к проверке, и первым читается (б).
- "that no SpecTag (§s-8xw4mgvpexyvw5q) binds": (а) относится к "code and tests"; (б) относится к "the commit". Контекст поддерживает (а).
LANGUAGE:
- "and the refusal names `sheriff untagged`" → "and the refusal to turn the flag on names `sheriff untagged`" — иначе "the refusal" читается как отказ проверки; смысл сохраняется.
- "that no SpecTag (§s-8xw4mgvpexyvw5q) binds" → "that no SpecTag (§s-8xw4mgvpexyvw5q) binds to a node" — "binds" без указания, к чему, неполно; не уверен, что добавление не сужает смысл.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 50
TRANSLATION: `sheriff settings` также отказывается включить флаг `strict`, пока файлы спецификации не проходят проверку на ключ, написанный более одного раза (§s-7zqsstgnuc772ba), или валидацию по их схеме (§s-xzcw3hv4hmxz7h7).
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 51
TRANSLATION: Отказ называет `sheriff validate` — команду, которая перечисляет, что находят эти проверки.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 55
TRANSLATION: Узел, не входящий в число собственных узлов расширения, зависит от расширения, если выполняется любое из следующих условий, независимо от того, находится ли узел в архиве (§s-f2b5zvc565s242f):
TWO READINGS:
- "the extension": расширение названо только в предыдущем абзаце узла; это расширение guidelines, выбор которого отзывают.
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 56
TRANSLATION: Ссылка в расширении схемы проекта (§s-xm8rz4uupb73gu5) зависит от расширения guidelines, если эта ссылка указывает на определение, которое добавляют `$defs` схемы этого расширения (§s-xzcw3hv4hmxz7h7).
TWO READINGS:
- "that extension's schema": (а) схема расширения guidelines; (б) схема расширения схемы проекта — в предложении названы два «расширения». Контекст поддерживает (а).
- "the extension of the guidelines": (а) то расширение guidelines, выбор которого отзывают (названо в первом абзаце узла); (б) любое расширение guidelines. Контекст поддерживает (а).
LANGUAGE:
- "that extension's schema" → "the schema of that extension of the guidelines" — в предложении два разных «extension», и "that extension" не выбирает между ними однозначно; смысл сохраняется.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 57
TRANSLATION: `fields` расширения схемы проекта зависят от расширения guidelines, если они задают условия для типа узла, который добавляют `kinds` схемы этого расширения.
TWO READINGS:
- "that extension's schema": (а) схема расширения guidelines; (б) схема расширения схемы проекта. Контекст поддерживает (а).
- "where they set conditions": (а) «если задают» — зависят `fields` целиком; (б) «в тех местах, где задают» — зависит только соответствующая часть `fields`. Следующее предложение ("each such kind") поддерживает (б).
LANGUAGE:
- "that extension's schema" → "the schema of that extension of the guidelines" — та же двусмысленность двух «extension»; смысл сохраняется.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 58
TRANSLATION: Отказ называет каждую такую ссылку и каждый такой тип узла по файлу расширения схемы проекта и по JSON Pointer к этой ссылке или этому типу.
TWO READINGS:
- "The refusal": отказ в этом абзаце не назван; это отказ `sheriff settings` записать запись, отзывающую выбор расширения, из первого абзаца узла.
- "each such kind": (а) каждый тип узла, для которого `fields` расширения схемы проекта задают условия и который добавлен расширением guidelines; (б) каждый тип узла, добавленный расширением guidelines. Контекст поддерживает (а).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 62
TRANSLATION: она включает хуки, устанавливая `core.hooksPath` git в `.githooks`, и говорит, как установить `core.hooksPath`, если не может установить его сама.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 63
TRANSLATION: `TextRule.list` (§s-eferktypcj7njt5) этого правила-черновика перечисляет `push` (§s-b6qdtghnyha3fhk).
TWO READINGS:
- "The draft rule's": правило в этом абзаце не названо; это правило «When the tests run» из предыдущего абзаца узла, которое верхний узел `project.json` содержит как черновик.
- "lists `push`": (а) `push` — единственный член списка; (б) `push` — один из членов. Предложение этого не говорит.
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 64
TRANSLATION: Она оставляет как есть любой другой хук или объявление, которые отличаются от того, что она написала бы, и любой `.claude/settings.json` или `.codex/hooks.json`, который не является JSON, и называет каждый из них.
TWO READINGS:
- "names each": (а) каждый оставленный хук, объявление и файл; (б) только каждый файл, не являющийся JSON. Контекст поддерживает (а).
LANGUAGE:
- "It leaves as it is any other hook or declaration" → "It leaves unchanged any other hook or declaration" — три "it" подряд с разными значениями ("It", "as it is", "it would write") заставляют перечитывать; смысл сохраняется.
- "that is not JSON" → "that is not valid JSON" — о содержимом файла так и пишут: оно либо корректный JSON, либо нет; смысл сохраняется.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 65
TRANSLATION: Если раньше хуки репозитория запускались из другого места — из `.git/hooks/` или из другой папки, которую называл `core.hooksPath`, — `sheriff init` называет каждый найденный там хук, кроме образцов git.
TWO READINGS:
- "from elsewhere, from `.git/hooks/` or from another folder": (а) "from `.git/hooks/` or from another folder" поясняет "elsewhere"; (б) перечисление трёх мест: откуда-то ещё, из `.git/hooks/` или из другой папки. Контекст поддерживает (а).
LANGUAGE:
- "from elsewhere, from `.git/hooks/` or from another folder that `core.hooksPath` named," → "from elsewhere, that is, from `.git/hooks/` or from another folder that `core.hooksPath` named," — без "that is" пояснение читается как перечисление; смысл сохраняется.
- "git's samples" → "git's sample hooks" — "samples" без объекта не говорит, образцы чего; смысл сохраняется.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 66
TRANSLATION: Она называет каждую папку `.githooks/<hook>.d/`, которую оставляет, и говорит, что собственные инструменты проекта в этой папке (§s-n4m5zvh96yb299p) больше не запускаются.
TWO READINGS:
- "that it leaves": (а) оставляет на месте, не удаляет; (б) покидает. Контекст поддерживает (а).
LANGUAGE:
- "each folder `.githooks/<hook>.d/` that it leaves" → "each `.githooks/<hook>.d/` folder that it leaves in place" — имя в английском ставят перед "folder", а "in place" снимает второе значение "leaves"; смысл сохраняется.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 67
TRANSLATION: Без слияния по union git сообщает о конфликте в этом файле.
TWO READINGS:
- "git reports": (а) общее утверждение — без слияния по union git всегда сообщает о конфликте; (б) что случилось бы в описанном примере. Пример требует (б), а настоящее время говорит (а).
LANGUAGE:
- "git reports a conflict in that file" → "git would report a conflict in that file" — пример описывает то, чего не произошло, и английский требует здесь "would"; смысл сохраняется.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 71
TRANSLATION: Название типа узла также меняется в каждом из этих мест:
TWO READINGS:
- "The name of a kind of node": (а) название одного из типов узла, переименованных в списке первого абзаца (`rule`, `record`, `recordType`, `domain`); (б) название любого типа узла. Контекст поддерживает (а), но абзац этого не говорит.
LANGUAGE:
- "The name of a kind of node is also changed" → "The name of a renamed kind of node is also changed" — без "renamed" фраза относится к любому типу узла; замена сохраняет смысл, только если имелись в виду переименованные типы.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 72
TRANSLATION: если `specs/_approvals.jsonl` уже существует, строки `specs/_confirmations.jsonl`, в которых `owner` переименован в `by`, добавляются в его конец, а `specs/_confirmations.jsonl` удаляется;
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 73
TRANSLATION: если в `sheriff.config.json` нет записи, задающей статус одобрения спецификации, правило-черновик из `project.json`, уточняющее правило об этом статусе, перемещается в архив с причиной «The specification's approval status is recorded in `sheriff.config.json`», если оно когда-либо было одобрено, а иначе удаляется (§s-f2b5zvc565s242f);
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 74
TRANSLATION: в том запуске, который архивирует или удаляет правило из `project.json`, уточняющее правило о статусе одобрения спецификации, — одобрено это правило или является черновиком, — если в `project.json` не остаётся ни одного правила, уточняющего правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h), под верхний узел `project.json` добавляется правило-черновик о том, когда запускаются тесты, которое пишет `sheriff init` (§s-7unxytshhc4md54);
TWO READINGS:
- "whether that rule is approved or a draft": (а) "that rule" — архивируемое или удаляемое правило из `project.json`; (б) "that rule" — правило о статусе одобрения спецификации, названное непосредственно перед этим. Контекст поддерживает (а).
- "which `sheriff init` writes": (а) то же правило, какое пишет `sheriff init`; (б) правило, которое в этот момент пишет сама `sheriff init`. Контекст поддерживает (а).
LANGUAGE:
- "whether that rule is approved or a draft" → "whether the archived or deleted rule is approved or a draft" — "that rule" стоит сразу после другого правила и читается как оно; смысл сохраняется.
- "the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54)," → "the same draft rule on when the tests run that `sheriff init` writes (§s-7unxytshhc4md54)" — придаточное с "which" читается так, будто правило пишет `sheriff init`, а не `sheriff reindex`; замена сохраняет смысл, только если имелось в виду чтение (а).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6d.md · line 78
TRANSLATION: При коммите эта директория содержит то, что содержит коммит (§s-477gtdrkw34dzxw).
TWO READINGS:
- "holds what the commit contains": (а) в директории ровно содержимое коммита и ничего сверх него; (б) в директории есть содержимое коммита и, возможно, другие файлы рабочего дерева. Предложение не выбирает между ними.
- "what the commit contains": (а) всё дерево файлов коммита; (б) только то, что коммит меняет. Контекст скорее поддерживает (а).
LANGUAGE:
- "that directory holds what the commit contains" → "that directory holds exactly the files of the commit" — исходная фраза не говорит, всё ли это и только ли это; замена сохраняет смысл, только если имелись в виду чтения (а) в обоих пунктах.
