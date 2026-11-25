### s-xr5xxa9cxf2mq5u
TRANSLATION: Какой runner запускает reviewer. `sheriff review` передаёт входные данные reviewer'а runner'у, то есть CLI агента, запущенному на время этого запуска (§s-avvnasjhsfkgajh). Runner — это `claude` (§s-3wh8uhgn9jr2k74) или `codex` (§s-u2n5hwwqkb6zk4z). `sheriff review` запускает тот runner, который назван в `review.runner` в `sheriff.config.json` (§s-zefk589ykh37b8u). Если `review.runner` не задан, запускается runner того плагина SpecSheriff, чьи инструменты выполняют `sheriff review`. Этот runner назван в файле `agent`, который сборка кладёт рядом с `release`: `claude` для плагина для Claude Code (§s-zh2vcr3xjumppg5), `codex` для плагина для Codex CLI (§s-2pdy9gw2jrjvfb4). Инструменты SpecSheriff, у которых такого файла нет, берут `claude`. Общие для проекта настройки reviewer'а в `sheriff.config.json` — `review.runner` и `review.minutes`, которая задаёт лимит времени запуска (§s-wgedv32rdaqca9k). Причина: у пользователя с одним агентом нет другого агента, чтобы его запустить, поэтому runner определяется тем плагином, который у пользователя есть. Проект, которому нужен один reviewer для всех, называет его в `review.runner`.
TWO READINGS:
- "which sets the time limit of a run": «которая задаёт лимит» относится к `review.minutes` (глагол в единственном числе, это предпочтительно) или ко всей паре настроек.
- "names it in `review.runner`": «it» — это "one reviewer" (буквально: называет reviewer'а) или runner (то, что на самом деле называется в `review.runner`). Контекст предпочитает runner.
- "that runner": runner плагина, чьи инструменты выполняют `sheriff review`. Это наиболее вероятно.
LANGUAGE:
- "the runner follows the plugin that the user has" → "the runner is determined by the plugin that the user has installed" — "follows" здесь неестественно, а "has" без "installed" неточно. Смысл сохраняется.
- "SpecSheriff tools that hold no such file take `claude`" → "SpecSheriff tools that have no such file use `claude`" — "hold" и "take" здесь звучат как калька. Замену я считаю точной по смыслу, но не уверен до конца.

### new:tools-10-verdict
TRANSLATION: Вердикт reviewer'а. `sheriff review` отклоняет коммит, если runner не дал вердикта, который `sheriff review` может прочитать (§s-94k7b6r5kf65udf). В отказе сказано, почему вердикт нельзя было прочитать, например: runner не установлен или запуск вышел за лимит времени (§s-wgedv32rdaqca9k). CLI runner'а получает схему вердикта и отвечает JSON-объектом, который должен соответствовать этой схеме. Вердикт пропускает или отклоняет коммит и перечисляет его finding'и. Каждый finding называет sid'ы узлов, которых он касается, и проблему, а если он касается кода — файл и строку. `sheriff review` считает вердиктом, который нельзя прочитать, каждое из следующего: ответ, не соответствующий схеме вердикта; вердикт, который пропускает коммит и при этом содержит finding; вердикт, который отклоняет коммит и не содержит ни одного. Причина: `sheriff review` пропускает коммит только по вердикту, смысл которого не нужно угадывать, а ответ, соответствующий схеме и не противоречащий самому себе, читается без угадывания. Пример: runner отвечает вердиктом, который пропускает коммит и перечисляет один finding. `sheriff review` считает его нечитаемым вердиктом и отклоняет коммит. Вероятнее всего ошибка в том, чтобы пропустить коммит и отбросить finding, а это значит решить за reviewer'а, что он имел в виду.
TWO READINGS:
- "lists its findings": «its» — finding'и вердикта или finding'и коммита. Предпочтительно первое.
- "which decides for the reviewer what it meant": «which» — вся описанная ошибка (пропустить коммит и отбросить finding), а не "the finding". «it» — reviewer.
- "with a finding": «с хотя бы одним finding'ом» или «ровно с одним». Контекст предпочитает «хотя бы одним».
LANGUAGE:
- "went beyond its time limit" → "exceeded its time limit" — "went beyond" в таком значении технический автор не напишет.
- "held to that schema" → "that conforms to that schema" — "held to" как «соответствующий» звучит как калька. "Held to" ближе к «обязанный следовать», а "conforms" называет результат, так что оттенок немного меняется.
- "is not held to the schema of the verdict" → "does not conform to the schema of the verdict" — та же причина.
- "An answer held to the schema and consistent with itself" → "An answer that conforms to the schema and is internally consistent" — "held to" и "consistent with itself" — кальки.
- "which decides for the reviewer what it meant" → "which means deciding for the reviewer what it meant" — "which" не ясно указывает на действие целиком. Замена сохраняет смысл.

### new:tools-10-start
TRANSLATION: Как запускается runner. `sheriff review` запускает runner отдельно от сессии, в которой сделано изменение, чтобы runner ничего не получил из этой сессии (§s-nyh9yk22ba6g77q). Runner запускается без пользовательских настроек, памяти и hooks, с собственным системным промптом, в пустой рабочей директории, с отключёнными всеми инструментами, которые можно отключить его командной строкой, и как программа, а не через shell. CLI, который npm на Windows устанавливает как командный скрипт, запускается как та программа, которую запускает скрипт, с теми аргументами, которые скрипт ей передаёт. В окружении runner'а есть только переменные, которые разрешает список этого узла. Они называют: путь поиска программ, папки операционной системы и пользователя и имя пользователя; локаль; прокси, хосты, которые он пропускает, и сертификаты, которым доверять; где CLI runner'а хранит свой sign-in, сам sign-in и провайдера, обслуживающего модель. Причина: runner судит об изменении только по правилам (§s-nyh9yk22ba6g77q), поэтому ничто из сессии, где сделано изменение, не должно до него доходить. Список: переменные, которые может содержать окружение runner'а; имена сопоставляются без учёта регистра, а имя, заканчивающееся на `*`, подходит под любое имя, начинающееся с того, что стоит перед `*`. Пример: сессия агента задаёт свои переменные, а git hook задаёт `GIT_DIR` со ссылкой на репозиторий. Ни одной из них нет в списке, поэтому ни одна не доходит до runner'а, который потому не может прочитать репозиторий через `GIT_DIR` из своей пустой рабочей директории. Вероятнее всего ошибка в том, чтобы вместо этого вычищать список известных переменных: он пропускает каждую переменную, которую добавит новый релиз агента.
TWO READINGS:
- "apart from the session that made the change": «отдельно от сессии» (отдельный процесс) или «кроме сессии» (как в "apart from X"). Контекст предпочитает первое.
- "may reach it": «may» — запрет (не должно доходить), а не возможность. Контекст предпочитает запрет. «it» — runner.
- "Neither is in the list, so neither reaches the runner": «neither» объединяет переменные сессии агента (их несколько) и `GIT_DIR`; формально «neither» относится к двум предметам, а названо несколько.
- "which misses each variable": «which» — подход «вычищать список известных переменных», а не сам список.
- "that the list of this node allows": «may hold» в списке — разрешение, а не возможность.
- "the sign-in itself": переменные «называют» сам sign-in, хотя в них, скорее, лежат его данные. Вероятно, имеются в виду переменные с данными входа.
LANGUAGE:
- "apart from the session" → "separately from the session" — "apart from" двусмысленно.
- "with every tool that its command line can turn off turned off" → "with every tool turned off that its command-line options can turn off" — «turn off … turned off» подряд, и командная строка ничего не отключает, это делают её опции. Смысл сохраняется.
- "the search path of programs" → "the search path for programs" — предлог.
- "its sign-in" → "its credentials" — "sign-in" как существительное для сохранённых данных входа неестественно. Я не уверен, что "credentials" точно передаёт смысл.
- "the sign-in itself" → "the credentials themselves" — та же причина, замена с той же оговоркой.
- "a proxy, the hosts that it skips and the certificates to trust" → "a proxy, the hosts that bypass it and the certificates to trust" — "skips" здесь неточное слово для no_proxy.
- "strip a list of known variables" → "remove only a fixed list of known variables" — удаляют переменные, а не список.
- "each variable" → "every variable" — "every" естественнее для «любая».
- "each matched whatever its case" → "each matched regardless of case" — "whatever its case" звучит как калька.

### new:tools-10-limit
TRANSLATION: Лимит времени запуска. `sheriff review` завершает запуск reviewer'а, который всё ещё идёт после числа минут, заданного в `review.minutes` в `sheriff.config.json` (§s-zefk589ykh37b8u). Запуск завершается вместе со всеми процессами, которые запустил runner. Если `review.minutes` не задан, лимит равен двадцати минутам. Причина: процесс, оставшийся работать после лимита, продолжал бы стоить денег тому, кто делает коммит. Лимит большой, чтобы он обрывал запуск, который завис, а не тот, который читает крупное изменение.
TWO READINGS: none
LANGUAGE:
- "that is still going" → "that is still running" — "going" в этом значении не принято в технической прозе.
- "that `review.minutes` in `sheriff.config.json` gives" → "that `review.minutes` in `sheriff.config.json` specifies" — настройка не "gives" число. Смысл сохраняется.
- "go on costing the person who commits" → "keep costing the person who commits money" — без объекта "costing" может читаться как «стоить усилий». Я не уверен, что в оригинале имелись в виду именно деньги.

### new:tools-10-claude
TRANSLATION: Runner `claude`. Runner `claude` — это CLI Claude Code в режиме print. Он запрашивает модель и reasoning effort, которые задают настройки runner'а (§s-tnz9zgqx8c629a7). Если эта модель перегружена или не предлагается, он переходит на запасную модель, которую задают те же настройки. Причина: режим print отвечает один раз и завершается, и вокруг него нет сессии, которая могла бы что-то перенести.
TWO READINGS:
- "not offered": недоступна для аккаунта пользователя или не предоставляется сервисом в данный момент. Контекст не выбирает.
- "around it": «it» — режим print или его ответ. Скорее режим print.
LANGUAGE:
- "that the settings of the runner give" → "that the settings of the runner specify" — "give" в значении «задают» неестественно.
- "to the fallback model that those settings give" → "to the fallback model that those settings specify" — та же причина.
- "not offered" → "unavailable" — "not offered" неоднозначно. Замена может чуть изменить смысл, если имелось в виду «не предлагается аккаунту».
- "with no session around it to carry anything over" → "with no session to carry anything over" — "around it" лишнее и звучит как калька.

### new:tools-10-codex
TRANSLATION: Runner `codex`. Runner `codex` — это CLI Codex в режиме `codex exec` с собственным Codex home. Этот home создаётся во временной директории на время запуска и после него удаляется. В нём лежит только копия sign-in пользователя. Runner `codex` запускается с read-only sandbox, без сохранения сессии и без предложенных skill'ов. Он запрашивает модель и reasoning effort, которые задают настройки runner'а (§s-tnz9zgqx8c629a7). Если модель пуста, он не запрашивает никакой модели. Причина: Codex не предлагает запуска без собственного home и собственных инструментов, поэтому runner ограничивает и то, и другое: в home лежит только sign-in, а sandbox не позволяет ничего записывать.
TWO READINGS:
- "a home and tools of its own": «of its own» — собственные у Codex (он всегда приносит свои) или у runner'а. Контекст предпочитает Codex.
- "Codex offers no run without a home and tools of its own": нет режима запуска без home и инструментов, либо нет запуска без ЛЮБОГО из них. Контекст предпочитает «без обоих».
- "It holds": «it» — Codex home (а не временная директория). Скорее home.
LANGUAGE:
- "the Codex CLI in `codex exec`" → "the Codex CLI run as `codex exec`" — предлог "in" здесь неточен.
- "That home is made" → "That home is created" — "made" разговорнее.
- "a copy of the user's sign-in" → "a copy of the user's credentials" — см. замечание о "sign-in" как существительном. Смысл может чуть смещаться.
- "its session not kept" → "its session not saved" — "kept" неоднозначно, возможно «не сохраняется». Я не уверен, что замена точна.
- "a home and tools of its own" → "its own home and tools" — естественнее.

### new:tools-10-settings
TRANSLATION: Настройки каждого runner'а. `sheriff review` читает настройки каждого runner'а из git-конфигурации пользователя, который делает коммит: `specsheriff.review.claudeModel`, `specsheriff.review.claudeFallbackModel` и `specsheriff.review.claudeEffort` для runner'а `claude` (§s-3wh8uhgn9jr2k74); `specsheriff.review.codexModel` и `specsheriff.review.codexEffort` для runner'а `codex` (§s-u2n5hwwqkb6zk4z). Модель и reasoning effort берутся только из этих настроек. Пустой `codexModel` означает модель, которую Codex выбирает для аккаунта, в который выполнен вход. Настройка, которая есть в конфигурации, пустая или нет, подтверждена. Hooks и skill'ы каждого плагина SpecSheriff спрашивают только о той настройке, которой в конфигурации нет. Они записывают настройку только так, как ответит пользователь, чья это конфигурация. Если пользователь отвечает значением по умолчанию, они записывают его как любое другое значение. Начало сессии (§s-477gtdrkw34dzxw) и skill `spec-init` (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) говорят, когда о какой настройке спрашивают. Значения по умолчанию: для runner'а `claude` — модель `opus` с reasoning effort `high`, с переходом на `sonnet`; для runner'а `codex` — модель, которую выбирает Codex, с reasoning effort `high`. Если в конфигурации нет настройки того runner'а, который запускается, `sheriff review` берёт значение этой настройки по умолчанию. При каждом ревью, которое идёт со значением по умолчанию, `sheriff review` называет каждую настройку, значение которой он взял по умолчанию, и то, как пользователь её подтверждает. Причина: запуск reviewer'а оплачивает пользователь, делающий коммит, со своего аккаунта. Поэтому он идёт на тех моделях и с теми уровнями effort, которые этот пользователь подтвердил на своей машине. Пока пользователь их не подтвердил, каждое ревью сообщает ему, с какими значениями оно шло. Пример: пользователь один раз подтверждает `specsheriff.review.claudeModel` командой `git config --global`. С этого момента каждый проект на этой машине запускает reviewer'а на этой модели, в том числе после обновления плагина или после его удаления и повторной установки. Вероятнее всего ошибка в том, чтобы хранить модель в `sheriff.config.json`, который общий для каждого клона, и тогда каждый, кто делает коммит, платит за выбор одного человека.
TWO READINGS:
- "is confirmed": кем и в каком смысле. Скорее «считается подтверждённой пользователем». Читатель может понять и «проверена системой».
- "They write a setting only as the user whose configuration it is answers": «only as» — «только в том виде, как ответит» (значение берётся из ответа) или «только тогда, когда ответит» (по времени). Контекст слегка предпочитает первое.
- "ask only for a setting that the configuration lacks": «ask for» — запрашивают у пользователя значение (скорее это) или требуют наличия настройки.
- "falling back to `sonnet`": подлежащее — модель `opus` или runner. Скорее runner.
- "which every clone shares": «which» — `sheriff.config.json` (скорее), а не модель.
- "so it runs": «it» — запуск reviewer'а или reviewer.
- "The session start" и "say when": подлежащее — неодушевлённое событие, которое «говорит». Вероятно, имеются в виду узлы, описывающие начало сессии.
LANGUAGE:
- "only as the user whose configuration it is answers" → "only with the value that the user whose configuration it is gives as the answer" — "as … answers" двусмысленно. Замена выбирает первое прочтение, поэтому смысл может измениться.
- "The session start (§s-477gtdrkw34dzxw) and the skill `spec-init`" → "The rule on session start (§s-477gtdrkw34dzxw) and the skill `spec-init`" — событие не может "say". Я не уверен, что в §s-477gtdrkw34dzxw именно правило.
- "falling back to `sonnet`" → "with `sonnet` as the fallback model" — висячее причастие.
- "the runner that runs" → "the runner being run" — "the runner that runs" неуклюже.
- "With every review that runs at a default" → "In every review that runs with a default setting" — "runs at a default" звучит как калька.
- "names each setting whose default it took, and how the user confirms that setting" → "reports each setting whose default it took, and states how the user confirms that setting" — один глагол "names" для двух разных объектов.
- "runs at the models and the efforts" → "runs with the models and the reasoning effort levels" — "at a model" и "efforts" множественного числа неестественны.
- "what it ran at" → "which settings it ran with" — висящий предлог, калька.
- "runs the reviewer at that model" → "runs the reviewer with that model" — "at" не сочетается с "model".
- "A setting that the configuration holds, empty or not, is confirmed" → "A setting that the configuration holds, empty or not, counts as confirmed" — пассив без агента, неясно, кто подтверждает.

### new:tools-8-section
TRANSLATION: SpecTag'и в коде и в тестах. Как код системы (§s-hheus6f395ynqvc) и её тесты содержат SpecTag (§s-8xw4mgvpexyvw5q) (по-русски: «у кода и тестов есть SpecTag») и как инструменты SpecSheriff их читают.
TWO READINGS:
- "its tests": тесты системы или тесты кода. Скорее тесты системы.
LANGUAGE:
- "How the system's code (§s-hheus6f395ynqvc) and its tests carry SpecTags (§s-8xw4mgvpexyvw5q), and how the SpecSheriff tools read them." → "This section states how the system's code (§s-hheus6f395ynqvc) and its tests carry SpecTags (§s-8xw4mgvpexyvw5q), and how the SpecSheriff tools read them." — предложение без сказуемого. Замена добавляет подлежащее и глагол, смысл не меняется.

### s-5z5gnu7pahr82xp
TRANSLATION: Форма SpecTag. SpecTag (§s-8xw4mgvpexyvw5q) записывается в одной из этих форм: `@spec <sid>`, где `<sid>` — sid правила, которое реализует код или из которого написан тест (§s-sfjka4zc4rhfu67); `@spec none`, после которого идут пробел и то, что технология, на которой построена система, требует от кода (§s-2jcmb9xe9d64t2t). Правило здесь — это узел типа `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) или `RecordType` (§s-ktfstpv8rurznrp), либо собственного типа проекта (§s-vsh384ybt4w25a2), включая узел в ячейке `TableRule`. Код, реализующий несколько правил, имеет SpecTag для каждого из них. Код, не реализующий ни одного правила, имеет `@spec none` как единственный SpecTag. У теста SpecTag есть только в форме `@spec <sid>` (§s-nrjxfvpkq3m8hzm). Причина: одна фиксированная форма позволяет инструментам SpecSheriff находить каждый SpecTag по тексту в любом языке. Это относится и к SpecTag, помечающему технический код (§s-2jcmb9xe9d64t2t), чтобы такой код оставался видимым. Пример: функция, которую веб-фреймворк вызывает для регистрации маршрутов и в которой нет никакой логики системы, имеет `@spec none the web framework requires a function that registers the routes`. Вероятнее всего ошибка — `@spec none helper`: он не говорит, что требует этот код.
TWO READINGS:
- "the code" и "the test" в "where `<sid>` is the sid of a rule that the code implements or that the test is written from": определённые артикли без названного ранее антецедента. Это код (символ) или тест, к которому прикреплён SpecTag.
- "including a node in a cell of a `TableRule`": «включая» относится ко всему перечню видов узлов или только к собственному типу проекта. Скорее ко всему перечню.
- "A test carries a SpecTag": «один SpecTag» или «хотя бы один». Для кода выше сказано, что их может быть несколько. Для теста контекст не решает.
- "in any language": язык программирования или естественный язык. Контекст предпочитает язык программирования.
- "That includes": «That» — возможность находить SpecTag по тексту, либо сама фиксированная форма. Скорее первое.
LANGUAGE:
- "followed by a space and by what the technology the system is built with requires of the code" → "followed by a space and a statement of what the technology the system is built with requires of the code" — не видно, что это свободный текст, и дважды повторено "by". Замена добавляет "a statement of", что уточняет, но не меняет смысл.
- "A rule here is a node of the kind" → "In this rule, a rule is a node of the kind" — "here" без ясной точки отсчёта. Я не уверен, что "this rule" так же естественно.
- "which does not say what requires the code" → "which does not say what requires this code" — «what» ближе к вопросительному местоимению, а "the code" без антецедента. Смысл сохраняется.

### Замечание о расположении ключей
Ключи `new:tools-10-*` и `new:tools-8-section` — это ключи из `tools-drafts.json`, а не sid'ы. Файл-источник для всех узлов: C:\Users\PC\AppData\Local\Temp\claude\a0dc34c442b04427\ff0169d8-4f54-448d-935e-3651d0703a36\scratchpad\g2-english\part-b.md