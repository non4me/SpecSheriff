### s-xr5xxa9cxf2mq5u — Which runner runs the reviewer
TRANSLATION:
**Заголовок:** Какой runner запускает reviewer.
**Текст:** `sheriff review` передаёт входные данные reviewer тому или иному runner, то есть CLI агента, запущенному для этого запуска (§s-avvnasjhsfkgajh). Runner — это `claude` (§s-3wh8uhgn9jr2k74) или `codex` (§s-u2n5hwwqkb6zk4z).
`sheriff review` запускает тот runner, который назван в `review.runner` в `sheriff.config.json` (§s-zefk589ykh37b8u). Если `review.runner` не задан, он запускает runner того плагина SpecSheriff, чьи инструменты выполняют `sheriff review`. Этот runner назван в файле `agent`, который сборка записывает рядом с `release`:
- `claude` для плагина для Claude Code (§s-zh2vcr3xjumppg5);
- `codex` для плагина для Codex CLI (§s-2pdy9gw2jrjvfb4).
Инструменты SpecSheriff, в которых такого файла нет, берут `claude`.
Общие для всего проекта настройки reviewer в `sheriff.config.json` — это `review.runner` и `review.minutes`; вторая задаёт ограничение времени одного запуска (§s-wgedv32rdaqca9k).
**Причина:** У пользователя с одним агентом нет другого агента, которого можно запустить, поэтому runner следует за плагином, который есть у пользователя. Проект, которому нужен один reviewer для всех, называет его в `review.runner`.
TWO READINGS:
- "started for the run": какой запуск имеется в виду, раньше не сказано. Вероятнее всего, это запуск reviewer, то есть одно выполнение `sheriff review`.
- "beside `release`": (а) рядом с файлом `release`; (б) рядом с релизом, то есть с веткой или сборкой `release`. Контекст скорее за (а), но слово «файл» при `release` не стоит.
- "the build": не сказано, сборка чего. Вероятнее всего, сборка инструментов SpecSheriff или плагина.
- "SpecSheriff tools that hold no such file": (а) те отдельные инструменты, в которых нет файла; (б) экземпляр (копия) инструментов SpecSheriff, в каталоге которого нет файла. Контекст за (б).
- "take `claude`": (а) используют `claude` как runner; (б) принимают значение `claude`. Смысл близкий, но глагол неточный.
- "the runner follows the plugin": (а) runner определяется плагином; (б) runner идёт после плагина. Контекст за (а).
- "names it in `review.runner`": "it" указывает на "one reviewer", хотя `review.runner` называет runner, а не reviewer. Читатель должен сам отождествить одно с другим.
LANGUAGE:
- "SpecSheriff tools that hold no such file take `claude`" → "SpecSheriff tools that have no such file use `claude`" — инструменты не «держат» файл и не «берут» runner; не уверен, что "have" точно передаёт, где должен лежать файл.
- "the runner follows the plugin that the user has" → "the runner is determined by the plugin that the user has" — "follows" здесь образное и читается как «идёт следом».

### new:tools-10-verdict — The reviewer's verdict
TRANSLATION:
**Заголовок:** Вердикт reviewer.
**Текст:** `sheriff review` отклоняет коммит, если runner не выдаёт вердикта, который `sheriff review` может прочитать (§s-94k7b6r5kf65udf). В отказе сказано, почему вердикт не удалось прочитать: например, runner не установлен или запуск вышел за своё ограничение времени (§s-wgedv32rdaqca9k).
CLI этого runner получает схему вердикта. Он отвечает объектом JSON, который удерживается в рамках этой схемы. Вердикт пропускает или отклоняет коммит и перечисляет свои замечания. Каждое замечание называет sid узлов спецификации, которых оно касается, и проблему, а если касается кода — файл и строку.
`sheriff review` считает вердиктом, который нельзя прочитать, каждое из следующего:
- ответ, который не удерживается в рамках схемы вердикта;
- вердикт, который пропускает коммит и при этом содержит замечание;
- вердикт, который отклоняет коммит и не содержит ни одного.
**Причина:** `sheriff review` пропускает коммит только по вердикту, смысл которого ему не приходится угадывать. Ответ, удержанный в рамках схемы и не противоречащий сам себе, читается без догадок.
**Пример:** Runner отвечает вердиктом, который пропускает коммит и содержит одно замечание. `sheriff review` читает его как вердикт, который нельзя прочитать, и отклоняет коммит. Самая вероятная ошибка — пропустить коммит и отбросить замечание: так за reviewer решают, что он имел в виду.
TWO READINGS:
- "a JSON object held to that schema": (а) объект, который соответствует схеме; (б) объект, который CLI принудительно ограничивает схемой. При (б) следующий пункт о несоответствующем ответе выглядит невозможным.
- "an answer that is not held to the schema of the verdict": (а) ответ, не соответствующий схеме; (б) ответ, к которому схему не применяли. Контекст за (а).
- "An answer held to the schema": те же два чтения, контекст за «соответствующий схеме».
- "lists its findings": (а) замечания вердикта; (б) замечания к коммиту. Смысл почти один, контекст за (а).
- "The most likely mistake is to pass the commit": не сказано, чья ошибка. Вероятнее всего, того, кто реализует `sheriff review`. В тексте узла "passes the commit" делает вердикт, здесь — `sheriff review`.
- "which decides for the reviewer what it meant": (а) решает вместо reviewer; (б) решает в пользу reviewer. Контекст за (а). "it" — reviewer или вердикт; вероятнее reviewer.
LANGUAGE:
- "a JSON object held to that schema" → "a JSON object that conforms to that schema" — "held to" значит «от которого требуют соблюдения», а не «соответствует»; не уверен, не имелось ли в виду именно принуждение со стороны CLI.
- "an answer that is not held to the schema of the verdict" → "an answer that does not conform to the schema of the verdict" — то же.
- "An answer held to the schema and consistent with itself" → "An answer that conforms to the schema and is consistent with itself" — то же.
- "reads it as a verdict that cannot be read" → "treats it as a verdict that cannot be read" — «читает как нечитаемый» звучит парадоксом; в тексте узла стоит "treats".

### new:tools-10-start — How a runner is started
TRANSLATION:
**Заголовок:** Как запускается runner.
**Текст:** `sheriff review` запускает runner отдельно от сессии, которая внесла изменение, чтобы runner ничего из этой сессии не получил (§s-nyh9yk22ba6g77q). Он запускает runner:
- без каких-либо настроек, памяти и хуков пользователя;
- с собственным системным промптом;
- в пустом рабочем каталоге;
- с выключенным каждым инструментом, который можно выключить из его командной строки;
- как программу, никогда не через оболочку.
CLI, который npm устанавливает в Windows как командный скрипт, запускается как та программа, которую запускает этот скрипт, с теми аргументами, которые скрипт ей передаёт.
Окружение runner содержит только те переменные, которые разрешает список этого узла. Они называют:
- путь поиска программ, папки операционной системы и пользователя, имя пользователя;
- локаль;
- прокси, хосты, которые он пропускает, и сертификаты, которым следует доверять;
- место, где CLI этого runner хранит свой вход, сам вход, и провайдера, обслуживающего модель.
**Причина:** Runner судит об изменении только по правилам (§s-nyh9yk22ba6g77q), поэтому ничто из сессии, внёсшей изменение, не должно (или не может) до него дойти.
**Список чего:** переменные, которые может содержать окружение runner; каждая сопоставляется независимо от регистра, а имя, оканчивающееся на `*`, соответствует каждому имени, которое начинается с того, что стоит перед `*`.
**Пример:** Сессия агента устанавливает собственные переменные, а git-хук устанавливает `GIT_DIR` на репозиторий. Ни того, ни другого в списке нет, поэтому до runner не доходит ни то, ни другое, и он не может прочитать репозиторий через `GIT_DIR` из своего пустого рабочего каталога. Самая вероятная ошибка — вместо этого вычищать список известных переменных: так пропускается каждая переменная, которую добавляет новый выпуск агента.
TWO READINGS:
- "starts a runner apart from the session": (а) отдельно от сессии, вне её; (б) помимо сессии, в дополнение к ней. Контекст за (а).
- "the session that made the change": какое изменение, раньше не сказано. Вероятнее всего, изменение, которое коммитят.
- "They name": "They" — переменные. "name" подходит к пути и локали, но плохо подходит к "the sign-in itself": переменная содержит данные входа, а не называет их.
- "the hosts that it skips": (а) хосты, которые прокси пропускает, то есть не обслуживает; (б) хосты, к которым обращаются в обход прокси. Вероятно, имелось в виду (б), но подлежащим стоит прокси.
- "its sign-in": (а) сохранённые учётные данные; (б) сам акт входа. Контекст за (а).
- "may reach it": "may" — (а) запрет: не должно дойти; (б) возможность: не может дойти. Контекст за (а). "it" — runner или "the change"; контекст за runner.
- "to strip a list of known variables": (а) удалять из окружения переменные из известного списка; (б) сокращать сам список известных переменных. Контекст за (а).
LANGUAGE:
- "starts a runner apart from the session" → "starts a runner outside the session" — "apart from" чаще значит «кроме, помимо».
- "with every tool that its command line can turn off turned off" → "with every tool turned off that its command line can turn off" — два "turn off" подряд заставляют перечитывать.
- "the search path of programs" → "the search path for programs" — неверный предлог.
- "the hosts that it skips" → "the hosts that bypass it" — хосты обходят прокси, а не прокси их пропускает; не уверен, что это задуманный смысл.
- "where the runner's CLI keeps its sign-in, the sign-in itself" → "where the runner's CLI keeps its credentials, the credentials themselves" — "sign-in" означает действие, а не хранимые данные; не уверен, что "credentials" не шире задуманного.
- "They name:" → "They give:" — переменная с токеном не «называет» вход.
- "each matched whatever its case" → "each matched regardless of case" — устойчивое выражение.
- "to strip a list of known variables instead" → "to remove a list of known variables from the environment instead" — "strip a list" читается как «урезать список».

### new:tools-10-limit — The time limit of a run
TRANSLATION:
**Заголовок:** Ограничение времени запуска.
**Текст:** `sheriff review` завершает запуск reviewer, который всё ещё идёт по истечении числа минут, заданного `review.minutes` в `sheriff.config.json` (§s-zefk589ykh37b8u). Он завершает запуск вместе с каждым процессом, который запустил runner. Если `review.minutes` не задан, ограничение равно двадцати минутам.
**Причина:** Процесс, оставленный работать после ограничения, продолжал бы стоить денег тому, кто коммитит. Ограничение большое, чтобы оно завершало зависший запуск, а не тот, который читает большое изменение.
TWO READINGS: none
LANGUAGE:
- "would go on costing the person who commits" → "would go on costing the person who commits money" — у "cost" здесь нет прямого дополнения, фраза обрывается.

### new:tools-10-claude — The runner `claude`
TRANSLATION:
**Заголовок:** Runner `claude`.
**Текст:** Runner `claude` — это CLI Claude Code в режиме print. Он запрашивает модель и reasoning effort, которые заданы настройками этого runner (§s-tnz9zgqx8c629a7). Если эта модель перегружена или не предлагается, он переходит на запасную модель, заданную теми же настройками.
**Причина:** Режим print отвечает один раз и завершается; вокруг него нет сессии, которая могла бы что-либо перенести дальше.
TWO READINGS:
- "It asks for the model and the reasoning effort": (а) запускается с этой моделью, требует её у сервиса; (б) спрашивает модель у пользователя. Контекст за (а). В узле о настройках "ask for a setting" значит именно (б), и два значения одного глагола сталкиваются.
- "not offered": не сказано, кем. Вероятно, модель недоступна для учётной записи или у провайдера.
LANGUAGE:
- "It asks for the model and the reasoning effort" → "It requests the model and the reasoning effort" — "ask for" в соседнем узле значит «спрашивать у пользователя».

### new:tools-10-codex — The runner `codex`
TRANSLATION:
**Заголовок:** Runner `codex`.
**Текст:** Runner `codex` — это CLI Codex в `codex exec`, с собственным домашним каталогом Codex. Этот каталог создаётся во временном каталоге на время запуска и удаляется после него. В нём лежит копия входа пользователя и больше ничего.
Runner `codex` работает:
- с песочницей только для чтения;
- без сохранения своей сессии;
- без предложенных skill.
Он запрашивает модель и reasoning effort, которые заданы настройками этого runner (§s-tnz9zgqx8c629a7). Если модель пуста, он не запрашивает никакой модели.
**Причина:** Codex не предлагает запуска без домашнего каталога и без собственных инструментов, поэтому runner ограничивает и то и другое: в домашнем каталоге лежит только вход, а песочница не даёт ничего записать.
TWO READINGS:
- "It holds a copy": "It" — (а) домашний каталог Codex; (б) временный каталог. Контекст за (а).
- "a copy of the user's sign-in": (а) копия сохранённых учётных данных; (б) копия «входа» как действия. Контекст за (а).
- "It asks for the model" и "it asks for no model": те же два чтения, что в узле о `claude` — запрашивает у сервиса или спрашивает у пользователя. Контекст за первое.
- "Where the model is empty": пуста не модель, а настройка модели. Вероятно, имеется в виду пустое значение `codexModel`.
- "Codex offers no run without a home and tools of its own": (а) у Codex нет запуска без домашнего каталога и без своих инструментов; (б) "of its own" относится только к "tools". Неясно и чьи это «свои» — Codex или запуска.
- "confines both": "both" — домашний каталог и инструменты. Дальше сказано про каталог и песочницу, а не про инструменты, и соответствие приходится достраивать.
LANGUAGE:
- "is the Codex CLI in `codex exec`" → "is the Codex CLI run as `codex exec`" — `codex exec` это команда, а не режим, «в» котором находится CLI; не уверен в задуманном.
- "a copy of the user's sign-in" → "a copy of the user's credentials" — "sign-in" означает действие; не уверен, что "credentials" не шире задуманного.
- "the home holds only the sign-in" → "the home holds only the credentials" — то же.
- "It asks for the model and the reasoning effort" → "It requests the model and the reasoning effort" — как в узле о `claude`.
- "it asks for no model" → "it requests no model" — то же.
- "the runner confines both" → "the runner restricts both" — "confine" значит «запереть внутри», к каталогу и инструментам не подходит.

### new:tools-10-settings — The settings of each runner
TRANSLATION:
**Заголовок:** Настройки каждого runner.
**Текст:** `sheriff review` читает настройки каждого runner из конфигурации git того пользователя, который коммитит:
- `specsheriff.review.claudeModel`, `specsheriff.review.claudeFallbackModel` и `specsheriff.review.claudeEffort` — для runner `claude` (§s-3wh8uhgn9jr2k74);
- `specsheriff.review.codexModel` и `specsheriff.review.codexEffort` — для runner `codex` (§s-u2n5hwwqkb6zk4z).
`sheriff review` берёт модель и reasoning effort только из этих настроек. Пустой `codexModel` означает модель, которую Codex выбирает для учётной записи, под которой выполнен вход.
Настройка, которая есть в конфигурации, пустая или нет, подтверждена. Хуки и skill каждого плагина SpecSheriff спрашивают только ту настройку, которой в конфигурации нет. Они записывают настройку только так, как отвечает пользователь, чья это конфигурация. Если пользователь отвечает значением по умолчанию, они записывают его как любое другое значение. Начало сессии (§s-477gtdrkw34dzxw) и skill `spec-init` (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) говорят, когда спрашивается каждая настройка.
Значения по умолчанию:
- для runner `claude` — модель `opus` с reasoning effort `high`, с переходом на `sonnet`;
- для runner `codex` — модель, которую выбирает Codex, с reasoning effort `high`.
Если в конфигурации нет какой-то настройки того runner, который запускается, `sheriff review` берёт для неё значение по умолчанию. При каждом ревью, которое идёт на значении по умолчанию, `sheriff review` называет каждую настройку, для которой он взял значение по умолчанию, и то, как пользователь эту настройку подтверждает.
**Причина:** Запуск reviewer оплачивает пользователь, который коммитит, со своей учётной записи. Поэтому он идёт на тех моделях и с теми усилиями, которые этот пользователь подтвердил на своей машине. Пока пользователь их не подтвердил, каждое ревью сообщает пользователю, на чём оно шло.
**Пример:** Пользователь один раз подтверждает `specsheriff.review.claudeModel` командой `git config --global`. С этого момента каждый проект на этой машине запускает reviewer на этой модели, в том числе после обновления плагина или его удаления и повторной установки. Самая вероятная ошибка — хранить модель в `sheriff.config.json`, общем для всех клонов: тогда каждый, кто коммитит, платит за выбор одного человека.
TWO READINGS:
- "is confirmed": (а) считается подтверждённой, это состояние; (б) её подтверждают, это действие, которое кто-то выполняет. Контекст за (а).
- "ask only for a setting that the configuration lacks": (а) спрашивают у пользователя только отсутствующую настройку; (б) запрашивают, то есть требуют, только её. Контекст за (а). В узлах о `claude` и `codex` "asks for" значит другое.
- "only as the user whose configuration it is answers": (а) только в том виде, в каком ответил пользователь; (б) только тогда, когда пользователь отвечает. Конец "it is answers" разбирается лишь со второго раза.
- "The session start (§s-477gtdrkw34dzxw) and the skill `spec-init`": (а) узлы о начале сессии и о skill, где сказано, когда спрашивают; (б) само начало сессии и сам skill. Событие не может «говорить», поэтому контекст за (а).
- "the runner that runs": (а) runner, который запускается в этом ревью; (б) runner, который что-то выполняет. Контекст за (а).
- "So it runs at the models": "it" — (а) запуск reviewer; (б) reviewer. Смысл один.
- "the efforts": без определения слово читается как «усилия» вообще. Имеется в виду reasoning effort.
- "Until the user confirms them": "them" — модели и reasoning effort из предыдущего предложения. По тексту узла подтверждаются настройки.
LANGUAGE:
- "They write a setting only as the user whose configuration it is answers" → "They write a setting only with the value that the user whose configuration it is gives" — "as … answers" двусмысленно, а "it is answers" сбивает разбор; не уверен, что задуман именно смысл «в том виде», а не «тогда, когда».
- "The session start (§s-477gtdrkw34dzxw) and the skill `spec-init` (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) say when" → "The nodes on the session start (§s-477gtdrkw34dzxw) and on the skill `spec-init` (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) say when" — событие не «говорит»; не уверен, что имеются в виду узлы.
- "a setting of the runner that runs" → "a setting of the runner in use" — "the runner that runs" тавтологично.
- "names each setting whose default it took, and how the user confirms that setting" → "names each setting whose default it took, and says how the user confirms that setting" — "names" не сочетается с "how …".
- "it runs at the models and the efforts" → "it runs with the models and the reasoning efforts" — голое "efforts" не опознаётся как reasoning effort; "at the models" не сочетается.
- "what it ran at" → "which settings it ran with" — "ran at" с "what" неестественно; не уверен, что "settings" точно покрывает задуманное.

### new:tools-8-section — SpecTags in the code and the tests
TRANSLATION:
**Заголовок:** SpecTag в коде и в тестах.
**Текст:** В каком виде SpecTag (§s-8xw4mgvpexyvw5q) есть у кода системы (§s-hheus6f395ynqvc) и у её тестов, и как инструменты SpecSheriff их читают.
TWO READINGS:
- "read them": "them" — (а) SpecTag; (б) код и тесты. Контекст за (а).
- "its tests": "its" — (а) тесты системы; (б) тесты кода. Смысл почти один.
LANGUAGE: none

### s-5z5gnu7pahr82xp — The form of a SpecTag
TRANSLATION:
**Заголовок:** Форма записи SpecTag.
**Текст:** SpecTag (§s-8xw4mgvpexyvw5q) записывается в одной из следующих форм:
- `@spec <sid>`, где `<sid>` — sid правила, которое код имплементирует или по которому написан тест (§s-sfjka4zc4rhfu67);
- `@spec none`, за которым следуют пробел и то, чего технология, на которой построена система, требует от кода (§s-2jcmb9xe9d64t2t).
Правило здесь — это узел спецификации типа `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) или `RecordType` (§s-ktfstpv8rurznrp) либо собственного типа узлов проекта (§s-vsh384ybt4w25a2), включая узел в ячейке `TableRule`.
У кода, который имплементирует несколько правил, есть SpecTag для каждого из них. У кода, который не имплементирует ни одного правила, единственный SpecTag — `@spec none`. У теста SpecTag есть только в форме `@spec <sid>` (§s-nrjxfvpkq3m8hzm).
**Причина:** Одна фиксированная форма записи позволяет инструментам SpecSheriff находить каждый SpecTag по его тексту, в любом языке. Это относится и к SpecTag, которым помечен технический код (§s-2jcmb9xe9d64t2t), чтобы такой код оставался видимым.
**Пример:** У функции, которую веб-фреймворк вызывает для регистрации маршрутов и в которой нет логики системы, есть `@spec none the web framework requires a function that registers the routes`. Самая вероятная ошибка — `@spec none helper`: здесь не сказано, что требует этого кода.
TWO READINGS:
- "by what the technology the system is built with requires of the code": (а) за `@spec none` следует формулировка требования технологии к коду; (б) следует сам требуемый технологией предмет. Пример подтверждает (а). Три придаточных без союзов разбираются со второго раза.
- "One fixed form": в тексте узла форм две ("in one of these forms"), а причина говорит об одной. Читатель не знает, имеется ли в виду общий префикс `@spec` или одна из двух форм.
- "in any language": (а) в любом языке программирования; (б) на любом естественном языке. Контекст за (а), но не сказано.
- "That includes the SpecTag that marks technical code": "That" — то, что инструменты находят каждый SpecTag. Отсылка к целому предложению понятна, но не названа.
- "which does not say what requires the code": (а) не говорит, что именно требует этот код, то есть какая технология; (б) не говорит, что требуется от кода. Грамматика даёт (а), а форма в тексте узла описана как (б): "what the technology … requires of the code".
LANGUAGE:
- "followed by a space and by what the technology the system is built with requires of the code" → "followed by a space and by a statement of what the technology that the system is built with requires of the code" — за тегом следует формулировка, а не само требуемое; пропущенные "that" затрудняют разбор.
- "calls to register the routes" → "calls to register routes" — "the routes" с определённым артиклем, хотя маршруты раньше не названы.
- "a function that registers the routes" → "a function that registers routes" — то же, внутри текста SpecTag.
- "which does not say what requires the code" → "which does not say what the technology requires of the code" — расходится с формулировкой формы в тексте узла; не уверен, какой из двух смыслов задуман.