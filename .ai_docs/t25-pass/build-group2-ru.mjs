// Writes group2-ru.json: the Russian of what the drafts of group 2 hold only in English and the owner's page shows in its
// Russian parts — the stage-3 notes, the removed passages, the notes in a location, the reviewer's verdicts and the
// approved nodes of tools.json that the drafts replace or are carved from. Each entry keeps the English it renders, so
// gen-group2-page.mjs refuses a Russian that a changed draft has made out of date.
//
// The script adds only the entries that group2-ru.json lacks, and reports each entry whose English has changed since;
// such an entry is corrected by hand in group2-ru.json, which from then on holds the Russian that the page shows.
// Usage: node build-group2-ru.mjs
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const read = (u) => JSON.parse(fs.readFileSync(new URL(u, here), "utf8"));
const drafts = read("tools-drafts.json");
const assessments = read("group2-assessments.json");
const outUrl = new URL("group2-ru.json", here);
const out = fs.existsSync(outUrl) ? read("group2-ru.json") : {};

const STAGE3 = {
  "s-vp24dqydygztqbt": "review.ts:68-73 (changesCode) и review.ts:306 запускают ревью только для коммита, который меняет код. Ревью должно идти при каждом коммите, для которого нужно одно из суждений: и при коммите, сообщение которого содержит trailer `Implementation-Needs-No-Change` (s-7gab4ptjt2khfr5), и при коммите, который добавляет одобрение узла технического приложения со связью implements с правилом базовой спецификации. review.ts:106-108 исключает только typeFiles(spec).paths; исключаться должен каждый файл, который пишет sheriff types, в том числе файлы собственных генераторов проекта, а review.ts:115-118 должен называть только те из них, которые меняет коммит. review.ts:319 должен передавать каждое замечание так, как его описывает s-68ds99w8wd67aae, а если коммит оставляет спецификацию черновиком, — не учитывать замечаний суждения об утверждении, что реализацию правила менять не нужно (ответ B на вопрос 1). Тесты в gates.test.ts:227, :240, :256 и :273 должны получить s-vp24dqydygztqbt. При переносе решения от 2026-11-05 о том, что символ судится целиком, переходят в s-rd9nftptjuz6bwv.",
  "new:tools-7-3-review-code": "review.ts:83-90 передаёт runner только изменённые символы файлов, которые читаются как код, и передаёт целиком изменённые символы сгенерированных файлов типов, потому что binding.ts:62-64 читает эти файлы как код; исключаться должен каждый файл, который пишет sheriff types. Передаваться должны и каждый изменённый файл, привязанный целиком, и каждый изменённый тест, целиком, с файлом, строками и SpecTag; формулировка правила, которое называет SpecTag изменённого теста, приходит с правилом 10.4 в предложенном виде. review.ts:52-65 (SYSTEM_PROMPT) должен назвать отказы этого узла, включая изменённый тест и текст после `@spec none`, и называть `@spec none` этим именем, а не «SpecTag, который не называет ни одного узла». Тесты в gates.test.ts:384 и :397 должны получить s-rd9nftptjuz6bwv, а тест в :397 должен ожидать во входных данных изменённые тесты.",
  "new:tools-7-3-review-statement": "review.ts не выносит суждения о таком утверждении. reviewInput должен передавать для каждого правила, которое называет trailer `Implementation-Needs-No-Change`, формулировку правила до коммита и после него и каждый тест и фрагмент кода, привязанные к правилу напрямую или через связи implements, целиком в том виде, в каком их оставляет коммит. SYSTEM_PROMPT должен запрашивать это суждение, а замечания этого суждения не должны отклонять коммит, который оставляет спецификацию черновиком (ответ B на вопрос 1). Его тесты пишутся первыми.",
  "new:tools-7-3-review-appendix": "review.ts не выносит суждения о таком узле. reviewInput должен находить среди одобрений, которые добавляет коммит (addedApprovals в approvals.ts), каждый узел технического приложения со связью implements с правилом базовой спецификации и передавать его формулировку и правила, которые перечисляет для него s-nyh9yk22ba6g77q; раздел верхнего уровня берётся из расположения, а правило вне раздела получает другие правила своей части, которые тоже не входят ни в один раздел. SYSTEM_PROMPT должен запрашивать это суждение. Его тесты пишутся первыми. При переносе в meta.decisions этого узла записывается, что получает правило вне раздела: это следует из решения от 2026-11-20 по правилу 10.4.",
  "new:tools-9-no-change-trailer": "Ни один код не читает такой trailer. message.ts должен читать trailer сообщения так, как это делает git interpret-trailers --parse, и сравнивать ключ в точности; суждение о таком утверждении (s-kgqxg4gunzynwsv) и проверка тестов и кода, которые отстают от правила (s-txbwsthdqhvyzd2, пункт 37), должны читать именно его. Его тесты пишутся первыми.",
  "s-xr5xxa9cxf2mq5u": "Код не меняется. Тесты в codex.test.ts:73 и config.test.ts:45 сохраняют s-xr5xxa9cxf2mq5u; часть config.test.ts:27 о review.minutes должна получить s-wgedv32rdaqca9k. Ваш todo от 2026-10-27 (другие runner) остаётся на этом узле; todo агента от 2026-11-06 (дерево процессов) при переносе переходит в s-wgedv32rdaqca9k. Решения узла при переносе переходят к узлам, которых они касаются: решения от 2026-10-27, 2026-10-31 и 2026-11-02 (runner codex) остаются здесь; решение от 2026-11-02 (согласие пользователя на стоимость прогона) переходит в s-tnz9zgqx8c629a7; решение от 2026-11-05 — в s-avvnasjhsfkgajh и s-68ds99w8wd67aae.",
  "new:tools-10-verdict": "review.ts:208-224 (VERDICT_SCHEMA) должен давать каждому замечанию `nodes`, список sid, и `problem`, а также `judgement` — суждение, к которому относится замечание (ответ B на вопрос 1), и `file` и `line`, равные null, если замечание не касается кода или строки; --output-schema у Codex требует каждого свойства, поэтому каждое обязательно и может быть null. readVerdict (review.ts:286-302) и отказ (review.ts:319) следуют этой схеме. Тесты в gates.test.ts:264, :357 и :362 должны получить s-68ds99w8wd67aae.",
  "new:tools-10-start": "Код не меняется, кроме valueList списка (todo строки 10.1.35). Тесты в gates.test.ts:371 и :377 должны получить s-avvnasjhsfkgajh. Тест, написанный из этого узла, должен показать, что из того, что CLI runner хранит для пользователя, в прогон не попадает ничего, кроме данных входа; для `claude` код передаёт `--setting-sources \"\"`, `--strict-mcp-config` и `--disable-slash-commands`, и хватает ли их, проверит этот тест.",
  "new:tools-10-limit": "review.ts:179-191 (runCli) завершает только процесс, который запустил spawnSync. В Windows Codex CLI, установленный через npm, запускает настоящий Codex дочерним процессом, и тот продолжает работать после предела времени (todo агента от 2026-11-06 на s-xr5xxa9cxf2mq5u). runCli должен завершать всё дерево процессов, которое запустил runner; его тест пишется первым и сначала падает, а todo удаляется, когда тест проходит.",
  "new:tools-10-claude": "Код не меняется. Тест в gates.test.ts:281 должен получить s-3wh8uhgn9jr2k74.",
  "new:tools-10-codex": "Код не меняется. Тесты в gates.test.ts:293 и :317 должны получить s-u2n5hwwqkb6zk4z.",
  "new:tools-10-settings": "review.ts:125-127 и :240 не должны передавать флаг для пустой настройки, а сейчас передают `--model \"\"`, `--fallback-model \"\"`, `--effort \"\"` и `model_reasoning_effort=''`. Тесты в gates.test.ts:169 и :186 должны получить s-tnz9zgqx8c629a7.",
  "s-5z5gnu7pahr82xp": "code.ts:63 (TAG) принимает любой текст после `@spec none`, а рецензент судит, говорит ли он, чего требует технология (s-rd9nftptjuz6bwv). Текст, который начинается с `@spec` и не имеет ни одной из форм, например `@spec none` без текста, должен отвергаться с сообщением, которое называет формы (s-9rtrj24myzjvshu). Код, у которого есть `@spec none` рядом с другим SpecTag, должен отвергаться (s-9rtrj24myzjvshu). binding.ts:136 (coded) и :202 должны принимать собственный тип проекта как правило, только если его `needsCode` истинно. При переносе решения этого узла от 2026-09-22, 2026-10-08 и 2026-10-27 переходят в s-33fw3ga4ctd94dq, а решение от 2026-10-27 прежнего 3.3 записывается здесь и в s-zrsc6asgmhv8tnc, как говорит файл продолжения.",
  "new:tools-8-symbol": "code.ts:195-208 применяет SpecTag первого реэкспорта ряда к последующим реэкспортам, у которых SpecTag нет, каким бы ни был этот SpecTag; он должен делать это только для `@spec none`, как говорит решение от 2026-10-08. Тесты в code.test.ts:9-47 должны получить s-33fw3ga4ctd94dq.",
  "new:tools-8-file-start": "code.ts:122-125 (readCode) ничего не читает в файле на языке, для которого нет описания, и binding.ts такие файлы не читает. Они должны читать SpecTag в начале каждого такого файла, которому соответствуют glob-шаблоны кода и формат которого допускает комментарии, пропуская первую строку, только если она начинается с `#!` или `<?`. Тест в code.test.ts:78 должен ожидать эти SpecTag и получить s-5qdjyf6t898rsd4; остальные тесты пишутся первыми.",
  "s-9rtrj24myzjvshu": "binding.ts:167-184 отвергает символ верхнего уровня без SpecTag при любом коммите, а code.ts сообщает о SpecTag не на месте в любом файле. Отвергаться должно только то, что коммит добавляет или меняет в коде системы или в файле привязок, включая SpecTag, добавленный не над символом (ваши решения от 2026-11-17 по строкам 10.1.26 и 10.1.26a): символ или файл, который должен быть привязан целиком, но который не привязывает ни один SpecTag; SpecTag не на месте; текст, который начинается с `@spec`, но не имеет ни одной из форм; запись в файле привязок для файла, который не относится к коду помимо тестов или формат которого допускает комментарии; SpecTag, узел которого не относится ни к одному типу из s-5z5gnu7pahr82xp; код, у которого есть `@spec none` рядом с другим SpecTag. Неизменённый код с любым из этого обрабатывает s-3xx2eukc8gtd2tx. binding.ts:171-173 (сообщение в черновике) переходит в s-3xx2eukc8gtd2tx, а binding.ts:180 (узел-черновик на изменённом символе) — в строку 10.1.28a (s-2x58az67bm6cxq2). Тесты в binding.test.ts:23 и :95 должны получить s-9rtrj24myzjvshu; тесты новых отказов пишутся первыми.",
  "new:tools-7-2-no-node": "binding.ts:179 и :201 отвергают SpecTag, который не называет ни одного узла, в коде и в тестах; читаться должны и записи файла привязок. Проверка ссылок вне спецификации (binding.ts:519-537, s-m8nmfsxkcfu7cjp) тоже отвергает такой sid. Она должна оставить этому узлу только SpecTag в коде системы, его тестах и файле привязок, чтобы один SpecTag отвергался один раз, и сохранить за собой SpecTag в собственных инструментах репозитория (правило 10.10; пункт 35). Часть binding.test.ts:29 о SpecTag, который не называет ни одного узла, должна получить s-36x8amvunmv2kp5; её часть об узле-черновике переходит к строке 10.1.28a.",
  "new:tools-7-2-outside": "binding.ts:171-173 и :190-197 сообщают о каждом таком символе и тесте, пока спецификация — черновик, и отвергают их, пока она одобрена. Пока спецификация — черновик, они должны пропускать их молча; пока она одобрена и флаг strict выключен, — давать одно предупреждение на все, называя sheriff untagged (s-weuyx98r7c923ab); при включённом флаге — отвергать. По вашим решениям от 2026-11-17 по строкам 10.1.26 и 10.1.26a то же относится к неизменённому коду, SpecTag которого ничего не привязывают, и к неизменённому тесту, SpecTag которого называет не правило. Статус и флаг должны читаться из записей в sheriff.config.json, а не из правила в project.json (binding.ts:138-162). Тесты в binding.test.ts:444 и :574 сначала переписываются для этого узла и получают s-3xx2eukc8gtd2tx.",
  "proposal:s-weuyx98r7c923ab": "sheriff untagged ещё не существует (пункт 6 команд). Он должен перечислять каждый символ и каждый файл, который должен быть привязан целиком, в коде, который не привязывает ни один SpecTag, по тому же признаку, который применяет s-9rtrj24myzjvshu.",
  "s-zrsc6asgmhv8tnc": "Код не меняется. У тестов плагина в test_plugin.py нет SpecTag в их пометке; они должны получить s-zrsc6asgmhv8tnc. Решение от 2026-10-27 прежнего 3.3 при переносе записывается здесь.",
  "s-utf4mbt7ref8g9c": "binding.ts:202 принимает тест, который называет термин, и отвергает тест, который называет TableRule или RecordType; он должен принимать только типы, перечисленные в s-5z5gnu7pahr82xp, и отвергать только тест, который коммит добавляет или меняет (ваше решение от 2026-11-17 по строке 10.1.26a), оставляя неизменённый тест узлу s-3xx2eukc8gtd2tx. binding.ts:42-51 (testLines) и code.ts:277 (onlySpecTagged) должны перестать считать неизменённым тест, единственное изменение которого ставит `@spec ` перед голым sid (s-9j2mmnuuwmx5ksn), и binding.test.ts:561 переписывается первым. binding.ts:363-384 (projectToolTests) удаляется вместе с binding.test.ts:426, потому что решение от 2026-11-13 по s-sfjka4zc4rhfu67 сняло эти требования. binding.ts:190-197 (сообщение в черновике) переходит в s-3xx2eukc8gtd2tx. Тесты в binding.test.ts:101, :253 и :554 и code.test.ts:56 получают s-utf4mbt7ref8g9c, а первые два переписываются для типов этого узла.",
  "new:tools-7-2-rule-test": "binding.ts:181 учитывает SpecTag изменённого символа только для TextRule или собственного типа проекта, которому нужен код (coded). Он должен учитывать каждый тип, перечисленный в s-5z5gnu7pahr82xp, файлы, привязанные целиком, и записи файла привязок; затем binding.ts:210-212 отвергает, как сейчас, засчитывая и пропускаемый тест, и тест, который ожидаемо падает. Тест в binding.test.ts:116 должен получить s-8wp7xm7g3u8gscq.",
  "new:tools-8-bindings": "Ни один код не читает sheriff.bindings.json. binding.ts, reindex.ts (который строит meta.code из SpecTag, s-rwqzepmrt77rv35) и message.ts (s-ef93u6cnbs2sevr) должны читать его записи как SpecTag их файлов. sheriff binding должен отвергать запись, путь которой не называет ни одного файла, и файл, который не является корректным JSON или не содержит объекта такой формы. Его тесты пишутся первыми.",
};

const REMOVED = {
  "s-vp24dqydygztqbt": [
    "Связь `implements` с основной таблицей проверок (s-jau82aq9juv9zzh): узел каждого суждения реализует свою строку (10.1.43, 10.1.43a, 10.1.25a).",
    "Связь `implements` с «How code is bound to its rules» (s-kgbzk2ph9e6jfb4) и ссылки на «The symbols a commit changes» (s-2x58az67bm6cxq2) и «What is considered the system's code» (s-hheus6f395ynqvc): они перешли вместе с суждением о коде в s-rd9nftptjuz6bwv.",
    "Ссылка на «Who runs the reviewer» (s-xr5xxa9cxf2mq5u): вердикт описывает «The reviewer's verdict» (s-68ds99w8wd67aae) в новом разделе «Who runs the reviewer» (s-v36s7dm8s3yewtr).",
    "`RecordType.fields` и значения собственного NodeKind проекта: формулировку, которую получает рецензент, теперь определяет s-nyh9yk22ba6g77q, включая `schema` у RecordType как поле, которое добавляет его тип.",
  ],
  "s-xr5xxa9cxf2mq5u": [
    "Связь `implements` с «What the reviewer is given» (s-nyh9yk22ba6g77q): теперь её имеет «How a runner is started» (s-avvnasjhsfkgajh), потому что этот узел отделяет runner от сессии, в которой сделано изменение. Этот узел по-прежнему ссылается на правило.",
    "Ссылка на «What the reviewer is given» (s-nyh9yk22ba6g77q) об ответе, который нельзя прочитать: «The reviewer's verdict» (s-68ds99w8wd67aae) реализует «A commit whose review cannot be carried out is refused» (s-94k7b6r5kf65udf), где это теперь сказано.",
    "Ссылки на «The hooks» (s-477gtdrkw34dzxw) и на плагины (s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4) о том, когда спрашивается настройка: они перешли вместе с настройками в «The settings of each runner» (s-tnz9zgqx8c629a7).",
    "Список переменных окружения runner: он перешёл в «How a runner is started» (s-avvnasjhsfkgajh).",
  ],
  "s-5z5gnu7pahr82xp": [
    "Связь `implements` с «A node's lists of its code and its tests» (s-rwqzepmrt77rv35): она перенаправлена на «The SpecTag» (s-8xw4mgvpexyvw5q), который теперь определяет, что такое SpecTag, как говорит файл продолжения.",
    "Ссылки на основную таблицу проверок (s-jau82aq9juv9zzh) и на «How a test declares the node it is written from» (s-zrsc6asgmhv8tnc): абзацы, которые на них ссылались, перешли в «How a symbol carries its SpecTags» (s-33fw3ga4ctd94dq), а SpecTag теста — отдельный узел нового раздела.",
    "Где у символа стоят его SpecTag, парсер и описания языков: это перешло в «How a symbol carries its SpecTags» (s-33fw3ga4ctd94dq).",
  ],
  "s-9rtrj24myzjvshu": [
    "Связь `implements` с основной таблицей проверок (s-jau82aq9juv9zzh): узел реализует строку 10.1.26 (s-k6dzuajejrw4cej).",
    "Связь `implements` с «Code and tests without a SpecTag» (s-kkbqcb9xrpaepwn) и ссылка на «From a draft to an approved specification, and back» (s-j9r8z4xdrfkfs47): код за пределами коммита теперь обрабатывает «Code and tests outside the commit that no SpecTag binds» (s-3xx2eukc8gtd2tx).",
    "Связь `implements` с «What is considered the system's code» (s-hheus6f395ynqvc): узел опирается на это правило и ссылается на него.",
    "Ссылка на «How a test declares the node it is written from» (s-zrsc6asgmhv8tnc) и предложение о тестах: тесты проверяет «The SpecTags the tests carry» (s-utf4mbt7ref8g9c).",
    "Предложение «sid SpecTag ищется среди узлов»: оно перешло в «A SpecTag that names no node» (s-36x8amvunmv2kp5), который реализует строку 10.1.28.",
    "Предложение «sid SpecTag на изменённом символе ищется среди одобренных»: это строка 10.1.28a (s-wpadgy2budcxa3v), которую пункт 29, «The symbols a commit changes» (s-2x58az67bm6cxq2), берёт на себя и для кода, и для тестов.",
    "Предложение «Конфигурация репозитория, его собственные инструменты и их тесты не являются кодом системы»: это говорит правило 9.1 (s-hheus6f395ynqvc), а согласованный узел «Project-wide settings» говорит, в каких файлах инструменты SpecSheriff читают SpecTag.",
  ],
  "s-zrsc6asgmhv8tnc": [
    "Связи `implements` с «A node's lists of its code and its tests» (s-rwqzepmrt77rv35) и «The test comes before the code» (s-rah8b37kytb682y): они перенаправлены на «A test's reference to its rule» (s-nrjxfvpkq3m8hzm) и «The SpecTag» (s-8xw4mgvpexyvw5q), которые теперь требуют, где стоит ссылка теста, как говорит инвентарь.",
  ],
  "s-utf4mbt7ref8g9c": [
    "Связь `implements` с основной таблицей проверок (s-jau82aq9juv9zzh): узел реализует строку 10.1.26a (s-ay6wntm2dxcgpnp).",
    "Связь `implements` с «Where a SpecTag may appear» (s-sfjka4zc4rhfu67) и два пункта о тестах собственных проверок и генераторов проекта: вы сняли эти требования 2026-11-13, и это правило их больше не требует.",
    "Связь `implements` с «A node's lists of its code and its tests» (s-rwqzepmrt77rv35): списки проверяет «A node's `meta.code` and `meta.tests`» (s-t383grkn3q68dpf), пункт 30.",
    "Связь `implements` с «Code and tests without a SpecTag» (s-kkbqcb9xrpaepwn) и ссылка на «From a draft to an approved specification, and back» (s-j9r8z4xdrfkfs47): тест за пределами коммита обрабатывает s-3xx2eukc8gtd2tx.",
    "Ссылки на «The test comes before the code» (s-rah8b37kytb682y) и «The commands» (s-f5rz6b7dhxejjts) вместе с пунктом, который освобождал тест, единственное изменение которого ставит `@spec ` перед голым sid: по правилу 9.4 (s-9j2mmnuuwmx5ksn) такое изменение — изменение теста.",
    "Пункт о том, что SpecTag изменённых символов ищутся среди тестов: это строка 10.1.31, которую реализует «A test for each rule whose code a commit changes» (s-8wp7xm7g3u8gscq).",
    "Предложение «SpecTag теста, текст которого меняет коммит, сверяется с одобренными узлами»: это строка 10.1.28a (s-wpadgy2budcxa3v), пункт 29.",
    "Имя NodeKind, которое вы убрали 2026-11-10 (s-vsh384ybt4w25a2).",
  ],
};

const LOCATION = {
  "new:tools-7-3-review-code": "tools 7.3.4a (новый, после «The review of a commit»)",
  "new:tools-7-3-review-statement": "tools 7.3.4b (новый, после «The judgement on the code that a commit changes»)",
  "new:tools-7-3-review-appendix": "tools 7.3.4c (новый, после «The judgement on a statement that a rule's implementation needs no change»)",
  "new:tools-9-no-change-trailer": "tools 9 (новый, после нового раздела «SpecTags in the code and the tests»)",
  "new:tools-10-section": "tools 10 (новый раздел, вместо узла «Who runs the reviewer»)",
  "new:tools-10-verdict": "tools 10.2 (новый)",
  "new:tools-10-start": "tools 10.3 (новый)",
  "new:tools-10-limit": "tools 10.4 (новый)",
  "new:tools-10-claude": "tools 10.5 (новый)",
  "new:tools-10-codex": "tools 10.6 (новый)",
  "new:tools-10-settings": "tools 10.7 (новый)",
  "new:tools-8-section": "tools 8 (новый раздел, вместо узла «The SpecTag, and how a symbol carries it»)",
  "new:tools-8-symbol": "tools 8.2 (новый)",
  "new:tools-8-file-start": "tools 8.3 (новый)",
  "new:tools-8-bindings": "tools 8.4 (новый)",
  "new:tools-7-2-no-node": "tools 7.2.2a (новый, после «SpecTags on the system's code other than tests»)",
  "new:tools-7-2-outside": "tools 7.2.2b (новый, после «A SpecTag that names no node»)",
  "s-zrsc6asgmhv8tnc": "tools 8.5 (перенесён из tools 9 в новый раздел)",
  "new:tools-7-2-rule-test": "tools 7.2.4a (новый, после «The SpecTags the tests carry»)",
};

const VERDICT = {
  "s-vp24dqydygztqbt": "две правки рецензента внесены дословно; предложение для ответа B на вопрос 1 — в словах автора",
  "new:tools-7-3-review-code": "правка рецензента внесена дословно",
  "new:tools-7-3-review-statement": "правка рецензента внесена; её второе предложение написано для ответа B на вопрос 1",
  "new:tools-7-3-review-appendix": "три правки рецензента внесены дословно",
  "new:tools-9-no-change-trailer": "правка рецензента внесена дословно",
  "new:tools-10-section": "узел готов",
  "s-xr5xxa9cxf2mq5u": "две правки рецензента внесены дословно",
  "new:tools-10-verdict": "две правки рецензента внесены дословно; одно предложение добавлено для ответа B на вопрос 1",
  "new:tools-10-start": "правка рецензента и вариант A его вопроса S2, который координатор отнёс к работе автора, внесены дословно",
  "new:tools-10-limit": "узел готов",
  "new:tools-10-claude": "правка рецензента к русскому тексту внесена дословно",
  "new:tools-10-codex": "две правки рецензента внесены дословно",
  "new:tools-10-settings": "пять правок рецензента внесены дословно",
  "new:tools-8-section": "узел готов",
  "s-5z5gnu7pahr82xp": "узел готов",
  "new:tools-8-symbol": "узел готов",
  "new:tools-8-file-start": "узел готов",
  "new:tools-8-bindings": "правка рецензента внесена дословно",
  "s-zrsc6asgmhv8tnc": "правка рецензента внесена дословно",
  "s-9rtrj24myzjvshu": "три правки рецензента внесены дословно; вопрос о неизменённом коде решён вашими решениями от 2026-11-17",
  "new:tools-7-2-no-node": "правка рецензента внесена дословно",
  "new:tools-7-2-outside": "две правки рецензента внесены дословно; изменение узла «The list of code that carries no SpecTag» показано как предложение этой группы",
  "s-utf4mbt7ref8g9c": "узел готов",
  "new:tools-7-2-rule-test": "три правки рецензента внесены дословно",
  "proposal:s-nyh9yk22ba6g77q": "готово при ответе B на вопрос 1; при ответе A пятый пункт получил бы условие одобренной спецификации",
  "proposal:s-weuyx98r7c923ab": "написано словами рецензента, чтобы выполнить ваши решения от 2026-11-17 по строкам 10.1.26 и 10.1.26a; как узел его ещё не проверял ни один рецензент",
};

// A source of an «Оценка» that is not the file of a report; none is left.
const SOURCE = {};

const APPROVED = {
  "s-vp24dqydygztqbt": {
    ruTitle: "Ревью коммита",
    ru: "`sheriff review` даёт runner судить каждый коммит, который меняет код системы. Runner — это CLI агента, запущенный отдельно от сессии, в которой написан код (§s-xr5xxa9cxf2mq5u). Runner получает:\n\n- сообщение коммита;\n- изменение коммита, кроме файлов, сгенерированных из узлов, каждый из которых ему назван вместе с тем, что он содержит;\n- каждый узел, который называет сообщение или SpecTag изменённого символа, с его текстом и обоснованием. RecordType передаётся со своими `RecordType.fields`, а узел собственного NodeKind проекта — со значениями, которые объявляет его NodeKind;\n- каждый символ кода системы помимо тестов, который меняет коммит, целиком в том виде, в каком его оставляет коммит, с его файлом, строками и SpecTag.\n\nЭто символы, которые `sheriff binding` находит изменёнными (§s-2x58az67bm6cxq2). SpecTag символа — его собственные или SpecTag символа, внутри которого он стоит.\n\nRunner судит коммит по узлам. Каждый изменённый символ он судит целиком по узлам, которые называют его SpecTag.\n\nОн отклоняет коммит, если код:\n\n- делает то, чего не утверждает в своём тексте ни один названный узел;\n- упускает то, чего требует названный узел.\n\nОн отклоняет коммит и тогда, когда изменённый символ:\n\n- делает то, чего не утверждает в своём тексте ни один узел, который называют его SpecTag;\n- имеет SpecTag, который называет узел, который символ не реализует;\n- имеет SpecTag, который не называет никакого узла, хотя символ реализует логику системы.\n\nЗамечание последнего вида называет своим узлом правило о том, что у каждого символа есть SpecTag (§s-kgbzk2ph9e6jfb4).",
  },
  "s-xr5xxa9cxf2mq5u": {
    ruTitle: "Кто запускает рецензента",
    ru: "`sheriff review` передаёт входные данные рецензента runner. CLI runner получает схему вердикта. Он отвечает в JSON, который соответствует этой схеме.\n\nВердикт пропускает или отклоняет коммит. Он называет замечания, каждое с его узлом, файлом, строкой и проблемой. `sheriff review` считает ответом, который нельзя прочитать (§s-nyh9yk22ba6g77q):\n\n- ответ, который пропускает коммит с замечанием;\n- ответ, который отклоняет коммит без замечаний.\n\nRunner запускается:\n\n- без настроек, памяти и хуков пользователя;\n- со своим системным промптом;\n- в пустом рабочем каталоге;\n- с выключенным каждым инструментом, который можно выключить из его командной строки;\n- как программа, никогда — через shell.\n\nCLI, установленный как командный скрипт, как его устанавливает npm в Windows, запускается как программа с аргументами, которые называет скрипт.\n\nОкружение runner содержит только переменные, которые задают:\n\n- путь поиска программ, папки операционной системы и пользователя и имя пользователя;\n- локаль;\n- прокси, хосты, к которым обращаются в обход него, и сертификаты, которым следует доверять;\n- где CLI runner хранит данные входа, сами данные входа и провайдера, который обслуживает модель.\n\nRunner `claude` — это Claude Code CLI в режиме print. Он запрашивает модель и effort, которые задают настройки ниже. Если эта модель перегружена или недоступна, он переходит на резервную модель, которую они задают.\n\nRunner `codex` — это Codex CLI в режиме `codex exec` со своим домашним каталогом Codex. Этот каталог создаётся во временной папке на время прогона и удаляется после него. В нём есть копия данных входа пользователя, и больше ничего.\n\nRunner `codex` работает:\n\n- с песочницей только для чтения;\n- без сохранения сессии;\n- без предложенных skill.\n\nRunner `codex` запрашивает модель и effort, которые задают настройки ниже. Если модель пуста, он не запрашивает модели.\n\n`sheriff review` читает настройки каждого runner из конфигурации git пользователя, который делает коммит:\n\n- `specsheriff.review.claudeModel`, `specsheriff.review.claudeFallbackModel` и `specsheriff.review.claudeEffort` — для runner `claude`;\n- `specsheriff.review.codexModel` и `specsheriff.review.codexEffort` — для runner `codex`.\n\nПустой `codexModel` означает модель, которую Codex выбирает для учётной записи, под которой выполнен вход.\n\nНастройка, которая есть в конфигурации, пустая или нет, считается подтверждённой. Хуки и skill обоих плагинов не спрашивают ни о какой настройке, которая есть в конфигурации.\n\nХуки и skill записывают настройку только так, как ответил пользователь, чья это конфигурация. Если пользователь отвечает значением по умолчанию, они записывают его как любое другое значение. Когда спрашивается каждая настройка, говорят начало сессии (§s-477gtdrkw34dzxw) и skill `spec-init` (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4).\n\nЗначения по умолчанию:\n\n- для runner `claude` — модель `opus` с effort `high` и переходом на `sonnet`;\n- для runner `codex` — модель, которую выбирает Codex, с effort `high`.\n\nЕсли в конфигурации нет настройки runner, который запускается, `sheriff review` берёт значение этой настройки по умолчанию. При каждом таком ревью он называет каждую настройку, для которой взял значение по умолчанию, и то, как пользователь её подтверждает.\n\nНастройки рецензента в `sheriff.config.json` — `review.runner` и `review.minutes`. Ни модели, ни effort `sheriff review` из этого файла не берёт.\n\n`review.minutes` — время, после которого прогон завершается. Если оно не задано, это двадцать минут.\n\nЕсли `review.runner` не задан, runner — тот, что у плагина, инструменты которого запускают `sheriff review`. Файл `agent`, который сборка пишет рядом с `release`, называет этот runner:\n\n- `claude` — для плагина для Claude Code;\n- `codex` — для плагина для Codex CLI.\n\nИнструменты, у которых нет такого файла, берут `claude`.",
  },
  "s-5z5gnu7pahr82xp": {
    ruTitle: "SpecTag и то, где он стоит у символа",
    ru: "SpecTag — это текст `@spec <sid>` или `@spec none` с последующим обоснованием. Форма `@spec none` стоит только у символа.\n\nSpecTag символа — строка комментария непосредственно над ним, над его декораторами, если они есть. Этот комментарий:\n\n- в TypeScript и JavaScript — doc-комментарий символа;\n- в Python — строка комментария.\n\nУ символа, который реализует несколько правил, несколько SpecTag. У теста SpecTag стоит в его названии или в пометке на нём (§s-zrsc6asgmhv8tnc).\n\nСимвол, который не реализует никакого правила, говорит об этом `@spec none` с последующей причиной, по которой у него нет SpecTag правила. Если такой символ стоит первым в ряду реэкспортов без пустой строки между ними, он говорит это за весь ряд.\n\nУ символа строку SpecTag могут делить с ним только ограничители комментария, чтобы сканирование находило текст SpecTag в любом языке.\n\nУ какого символа стоит SpecTag, находится разбором файла с помощью tree-sitter и грамматики языка файла. Парсер используется сам по себе, без программы и без проверки типов.\n\nОписание каждого языка называет, что в нём считается объявлением и что — тестом. Описаны TypeScript, JavaScript и Python.",
  },
  "s-zrsc6asgmhv8tnc": {
    ruTitle: "Как тест объявляет узел, из которого он написан",
    ru: "Тест объявляет свой SpecTag:\n\n- в TypeScript и JavaScript — начиная им своё название: `test(\"@spec s-… what it checks\", …)`;\n- в Python — пометкой на тесте `@pytest.mark.spec(\"@spec s-…\")`;\n- в другом языке — так, как говорит описание этого языка.\n\nПлагин для pytest инструментов SpecSheriff, `pytest-specsheriff`, регистрирует пометку. Он также ставит SpecTag в начало названия, которое сообщает прогон.",
  },
  "s-9rtrj24myzjvshu": {
    ruTitle: "SpecTag в коде системы",
    ru: "`sheriff binding` читает SpecTag каждого символа кода системы. SpecTag привязывает символ к узлу, который символ реализует. Код системы — это код, который реализует спецификацию, включая его тесты.\n\n- У теста SpecTag стоит в его названии или в пометке на нём (§s-zrsc6asgmhv8tnc), поэтому символы тестов не читаются.\n- Конфигурация репозитория, его собственные инструменты и их тесты не являются кодом системы (§s-hheus6f395ynqvc) и не читаются.\n- Вложенный символ покрывает SpecTag символа, внутри которого он стоит.\n- sid SpecTag ищется среди узлов. sid SpecTag на изменённом символе ищется среди одобренных. Символ меняется, если к нему относится строка, которую меняет коммит (§s-2x58az67bm6cxq2).\n- Пока коммит оставляет спецификацию черновиком (§s-j9r8z4xdrfkfs47), символ без SpecTag, который коммит не меняет, сообщается по символу, а не отвергается (§s-kkbqcb9xrpaepwn).",
  },
  "s-utf4mbt7ref8g9c": {
    ruTitle: "SpecTag, которые есть у тестов",
    ru: "`sheriff binding` читает каждый тест на SpecTag, который у него есть.\n\n- SpecTag теста сверяется с правилами, терминами и узлами собственного NodeKind проекта. SpecTag теста, текст которого меняет коммит, сверяется с одобренными.\n- Тест, единственное изменение которого ставит `@spec ` перед голым sid, который у него был (§s-f5rz6b7dhxejjts), не считается изменённым (§s-rah8b37kytb682y).\n- У теста с голым sid нет SpecTag. Всё, что о нём сообщается или по нему отвергается, называет `sheriff reindex`, который записывает SpecTag.\n- Пока коммит оставляет спецификацию черновиком (§s-j9r8z4xdrfkfs47), тест без SpecTag, который коммит не меняет, сообщается по тесту, а не отвергается (§s-kkbqcb9xrpaepwn).\n- sid SpecTag изменённых символов ищутся среди sid, которые называют SpecTag тестов.\n- Для каждой собственной проверки и каждого генератора проекта, код которых меняет коммит, sid правила, которое их перечисляет, ищется среди sid, которые называют SpecTag тестов. Код такой проверки или генератора — файлы, которые настройки называют его кодом.\n- Каждый тест в файлах, которые настройки называют тестами собственной проверки или генератора проекта, читается на SpecTag правила, которое их перечисляет (§s-sfjka4zc4rhfu67).",
  },
  "s-j9r8z4xdrfkfs47": {
    ruTitle: "От черновика к одобренной спецификации и обратно",
    ru: "`sheriff binding` следит за переходом спецификации от черновика к одобренной и обратно (§s-qzthyh7yqvfhsa2). Правило, которое одобряет спецификацию, он читает в `project.json`.\n\nСпецификацию до коммита он берёт в том виде, в каком её содержит первый родитель коммита, прочитанной так, как её переписал бы `sheriff reindex` (§s-f5rz6b7dhxejjts). Если у коммита нет родителя, спецификацию до коммита он считает черновиком.\n\nПока коммит оставляет спецификацию черновиком, `sheriff binding` сообщает о каждом из следующего, а не отвергает его, если коммит это не меняет (§s-kkbqcb9xrpaepwn):\n\n- символ кода системы помимо тестов, у которого нет SpecTag;\n- тест, у которого нет SpecTag.\n\nПока коммит оставляет спецификацию одобренной, и то и другое отвергается.\n\nКоммит, который возвращает спецификацию в черновик, проходит, только если добавляет в одобрения отзыв одобрения этого правила, какой бы ни была его формулировка, одним из ответственных за спецификацию в том виде, в каком их содержит коммит.",
  },
};

// The approved nodes of tools.json, by sid.
const tools = read("../../specs/_guidelines/tools.json");
const nodeOf = new Map();
const walk = (n) => { if (n.sid) nodeOf.set(n.sid, n); (n.children || []).forEach(walk); };
tools.nodes.forEach(walk);

const stale = [];
const put = (section, key, entry) => {
  out[section] ??= {};
  const have = out[section][key];
  if (have === undefined) { out[section][key] = entry; return; }
  if (JSON.stringify(Array.isArray(have) ? have.map((x) => x.en) : have.en) !== JSON.stringify(Array.isArray(entry) ? entry.map((x) => x.en) : entry.en)) stale.push(`${section} of ${key}`);
};
for (const [k, ru] of Object.entries(STAGE3)) put("stage3", k, { en: drafts[k].stage3, ru });
for (const [k, list] of Object.entries(REMOVED)) {
  const en = drafts[k].proposal.removed;
  if (en.length !== list.length) throw new Error(`${k}: ${en.length} removed passages, ${list.length} in Russian`);
  put("removed", k, en.map((e, i) => ({ en: e, ru: list[i] })));
}
for (const [k, ru] of Object.entries(LOCATION)) put("location", k, { en: drafts[k].location, ru });
for (const [k, ru] of Object.entries(VERDICT)) put("verdict", k, { en: assessments[k].verdict, ru });
for (const [k, ru] of Object.entries(SOURCE)) put("source", k, { en: assessments[k].source, ru });
for (const [sid, a] of Object.entries(APPROVED)) {
  const n = nodeOf.get(sid);
  if (!n) throw new Error(`no approved node ${sid} in tools.json`);
  put("approved", sid, { title: n.title, en: n.text, ruTitle: a.ruTitle, ru: a.ru });
}
fs.writeFileSync(outUrl, JSON.stringify(out, null, 2) + "\n");
console.log("group2-ru.json written");
if (stale.length) console.log(`out of date, to correct by hand in group2-ru.json:\n${stale.join("\n")}`);
