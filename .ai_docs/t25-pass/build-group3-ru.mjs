// Writes group3-ru.json: the Russian of what the drafts of group 3 hold only in English and the owner's page shows in its
// Russian parts — the stage-3 notes, the removed passages, the notes in a location and the approved nodes of tools.json that the drafts replace or are carved from. Each entry keeps the English it renders, so
// gen-group3-page.mjs refuses a Russian that a changed draft has made out of date. It is build-group2-ru.mjs adapted to
// group 3.
//
// The script adds only the entries that group3-ru.json lacks, and reports each entry whose English has changed since;
// such an entry is corrected by hand in group3-ru.json, which from then on holds the Russian that the page shows.
// Usage: node build-group3-ru.mjs
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const read = (u) => JSON.parse(fs.readFileSync(new URL(u, here), "utf8"));
const drafts = read("tools-drafts.json");
const group2 = read("group2-ru.json");
const outUrl = new URL("group3-ru.json", here);
const out = fs.existsSync(outUrl) ? read("group3-ru.json") : {};

const STAGE3 = {
  "s-j9r8z4xdrfkfs47": "binding.ts:138-162 читает правило project.json, которое одобряет спецификацию (model.ts: approvalRule, statusNow, APPROVAL_RULE), и отвергает коммит, который возвращает спецификацию в черновик без отзыва одобрения этого правила. Вместо этого он должен сравнивать записи в sheriff.config.json о статусе одобрения, о режиме strict и о выбранных расширениях с записями первого родителя коммита, прочитанными так, как их переписал бы sheriff reindex. Записи родителя должны без изменений и в том же порядке идти первыми для каждой настройки, а каждая следующая запись должна называть ответственного за спецификацию так, как ответственных называет project.json после коммита. config.ts (KEYS) должен принимать эти записи, а описывать их должен config.schema.json, который ещё предстоит добавить в moved/specs/_schema/. Ветка APPROVAL_RULE в approvals.ts:97 убирается. Тесты в binding.test.ts:500 и :513 сначала переписываются для записей, и у них будет SpecTag s-j9r8z4xdrfkfs47. Тесты в :464 и :596 убираются: одобрение спецификации, пока у кода нет SpecTag, решают sheriff settings (s-chsfpkgpmfk4fft) и правило 10.6. Тест в :444 перешёл к s-3xx2eukc8gtd2tx вместе с группой 2.",
  "new:tools-7-1-extensions-delivered": "Выбранные проектом расширения не читает никакой код. Каждая команда, которая их читает, должна сначала проверить, что файл каждого выбранного расширения лежит по своему пути в папке инструментов SpecSheriff (guidelines/extensions/<name>.json), а в репозитории, где пишутся SpecSheriff guidelines, — по пути specs/_guidelines/extensions/<name>.json. Иначе команда должна назвать каждое недостающее расширение и версию, которую печатает sheriff --version, и завершиться отказом; sheriff reindex при этом ничего не записывает. Тесты пишутся первыми. sheriff guard (guard.ts) тоже загружает модель, поэтому он должен отвергать любую правку, пока какого-либо выбранного расширения нет.",
  "s-2x58az67bm6cxq2": "binding.ts:68-102 (readCommit) считает изменённой каждую строку с `@spec` (diff.ts:146 и :160) и относит удалённую строку к символу с тем же именем. Он должен считать SpecTag символа, файла или теста изменённым, только если различаются их тексты, чтобы переформатирование комментария вокруг неизменного SpecTag ничего не меняло. Он должен читать файлы, привязанные целиком (SpecTag в начале файла, записи sheriff.bindings.json), и засчитывать файлу любое изменение его текста и SpecTag его записи. Он должен определять, что коммит удаляет, — для s-w93jfnqynfa47pf и для строки 10.1.41. У тестов в binding.test.ts:89 и :108 должен быть SpecTag s-2x58az67bm6cxq2. Сначала пишутся новые тесты: для файла, привязанного целиком, для записи файла привязок, для удалённых строк и для переформатированного комментария вокруг SpecTag. При переносе решения от 2026-11-06 остаются в узле.",
  "new:tools-7-2-changed-line": "diff.ts:130-190 (codeChanges) сопоставляет все удалённые строки файла со всеми его добавленными строками; он должен сопоставлять их внутри каждого участка, который заменяет сравнение git. Он не засчитывает имя, переименованное повсюду (diff.ts:176-188); это убирается, и тест в binding.test.ts:42 сначала переписывается так, чтобы переименование засчитывалось. diff.ts:146 и :160 считают изменённой каждую строку с `@spec`; они убираются, потому что s-2x58az67bm6cxq2 засчитывает изменение SpecTag по его тексту. binding.ts:42-51 (testLines) считает изменённой любую строку теста; тест должен читаться так же, как код, без учёта его названия вне SpecTag, а testLines убирается, как говорит и s-utf4mbt7ref8g9c. normalize (diff.ts:78) вырезает `//`, `/*…*/` и `#` в файле, язык которого не охватывает ни одно описание; там он больше не используется, потому что такой файл привязан целиком и засчитывается любое его изменение. У тестов в binding.test.ts:42, :49, :56, :69 и :79 должен быть SpecTag s-u6mj5yv8ngnz79v; тест для переименованного теста пишется первым. diff.ts:49 должен передавать --diff-algorithm=myers, чтобы настройки git на машине не могли изменить участки.",
  "new:tools-7-2-draft-rule": "binding.ts:180 и :205 отвергают SpecTag узла-черновика у изменённого символа или теста, глядя только на код, каким его оставляет коммит. Они должны читать и SpecTag родителя коммита, засчитывать то, что коммит удаляет (s-2x58az67bm6cxq2), засчитывать файлы, привязанные целиком, и записи файла привязок. Отвергать коммит они должны, только если узел — правило того типа узлов, который перечисляет s-5z5gnu7pahr82xp, и черновик в спецификации, какой её оставляет коммит. У частей тестов в binding.test.ts:29 и :101, которые касаются черновика, и у теста в :36 должен быть SpecTag s-w93jfnqynfa47pf. Сначала пишутся тесты для удалённого символа и для SpecTag, снятого с правила-черновика.",
  "s-t383grkn3q68dpf": "Сейчас ни одна из двух команд не строит списки из всех SpecTag. reindex.ts не строит ни одного списка: reindex.ts:283-330 только переименовывают тесты внутри meta.tests. binding.ts:215-254 строит списки только из SpecTag над символами и сравнивает символы, которые называет запись meta.code (binding.ts:240-249). binding.ts:72-73 читает только файлы, которые соответствуют glob-шаблонам кода и тестов. Обе команды должны читать также файлы каждой собственной проверки и каждого генератора проекта, SpecTag в начале файла и записи sheriff.bindings.json и строить списки так, как их определяет новая формулировка «What `sheriff reindex` writes» (s-ztseyetus7np6br). Сравнение символов убирается, а node.schema.json убирает `symbols` из meta.code. binding.ts должен судить узлы файлов, которые хранит репозиторий, включая узлы в ячейках; judgedHere читает writesSpecSheriffGuidelines, и это убирается. У теста в binding.test.ts:125 должен быть SpecTag s-t383grkn3q68dpf; тесты в :132 и :138 убираются вместе со сравнением символов.",
  "proposal:s-ztseyetus7np6br-g3": "Сейчас reindex.ts не строит ни одного из двух списков: reindex.ts:283-330 только переименовывают тесты внутри meta.tests. Он должен строить meta.code и meta.tests так, как их определяет этот узел. Источники — SpecTag в каждом файле, в котором инструменты SpecSheriff ищут SpecTag, включая файлы собственных проверок и генераторов проекта, SpecTag в начале файла и записи sheriff.bindings.json; запись meta.code называет только файл. Тесты пишутся первыми.",
  "proposal:new-tools-1-settings-g3": "config.ts и binding.ts читают SpecTag только из файлов, которые соответствуют glob-шаблонам кода и тестов, и из файлов сгенерированных типов; sheriff.bindings.json пока не читает никакой код (s-trwczfskj5zmuft). Они должны читать каждую запись этого файла как SpecTag того файла, который запись называет.",
  "s-5hb9k2e34dgn284": "binding.ts:255-262 и функция declaration (binding.ts:391-407) читают TextRule.list.declaredIn и сравнивают элементы как текст с enum, массивом или ключами объекта. Они должны читать jsonSchema и valueList, которые должен определить node.schema.json (todo строки 10.1.35). Каждое значение должно проверяться через Ajv 2020 по схеме, на которую указывает указатель, с разрешёнными ссылками файла. Если в этом месте, напрямую или через $ref, есть enum, его значение, которого нет в списке, должно отвергаться. Строковые литералы символа, который называет valueList, должны сравниваться со значениями как текст. Список, у которого есть элемент-объект без своего свойства, должен оставаться непроверенным: такой элемент отвергает s-cdachayybfvg4na. Судить нужно только узлы файлов, которые хранит репозиторий, включая узлы в ячейках. Сравнение с ключами объекта убирается. Тесты в binding.test.ts:144 (сейчас s-xqs2e24mx5253ye) и :406 сначала переписываются для jsonSchema и valueList, и у них будет SpecTag s-5hb9k2e34dgn284.",
  "new:tools-7-2-own-kinds": "Собственные типы узлов проекта не сравнивает ни одна проверка: binding.ts:255-262 через declaredIn сравнивает с элементами списка имена, которые расширение объявляет в `kinds`, а needsCode не сравнивает никогда. Он должен сравнивать элементы списков тех правил project.json, которые уточняют s-vsh384ybt4w25a2, взятые вместе и только там, с типами узлов из specs/_schema/project.schema.json: имя с именем и needsCode с needsCode. Он должен отвергать тип узлов, который не перечисляет ни один элемент, и принимать тип узлов, перечисленный дважды с одним и тем же needsCode. Тесты пишутся первыми. Элемент-объект без своего свойства оставлен s-cdachayybfvg4na, и тогда список не сравнивается. Узел реализует строку 10.1.35a (proposal:row-10-1-35a), которую impl.json должен вести к нему.",
  "proposal:s-gb8s9657a65hqmv-g3": "reindex.ts должен удалять TextRule.list.declaredIn, который указывает на поле `kinds` в specs/_schema/project.schema.json, и переписывать любой другой declaredIn так, как говорит согласованный узел. Тесты пишутся первыми.",
  "s-cdachayybfvg4na": "validate.ts:298-307 (objectsInLists) отвергает так, как говорит этот узел, но судит каждый узел spec.nodes: узлы, взятые из плагина, он судит, а узлы в ячейках TableRule пропускает. Его комментарий ссылается на s-v7vd4ydrwexsgsj, убранное правило. Он должен судить узлы файлов, которые хранит репозиторий, включая узлы в ячейках, и ссылаться на s-cdachayybfvg4na. Тест в validate.test.ts:501 сохраняет свой SpecTag.",
};

const REMOVED = {
  "s-j9r8z4xdrfkfs47": [
    "Связь `implements` с основной таблицей проверок (s-jau82aq9juv9zzh): узел реализует строки 10.1.27, 10.1.27a и 10.1.27b.",
    "Связь `implements` с «The specification's approval status» (s-qzthyh7yqvfhsa2): узел реализует строку 10.1.27, которая проверяет это правило, и ссылается на правило.",
    "Связь `implements` с «Code and tests without a SpecTag» (s-kkbqcb9xrpaepwn) и абзацы о символе и тесте без SpecTag: они перешли в «Code and tests outside the commit that no SpecTag binds» (s-3xx2eukc8gtd2tx), согласованный с группой 2.",
    "Правило в `project.json`, которое одобряет спецификацию, и отзыв одобрения этого правила: 2026-11-13 вы заменили и то и другое записями в `sheriff.config.json` (правило 10.6, строка 10.1.27).",
    "Ссылка на «The commands» (s-f5rz6b7dhxejjts): вместо неё узел ссылается на «What `sheriff reindex` changes in what an earlier release wrote» (s-gb8s9657a65hqmv), как записано в файле продолжения.",
    "«Where the commit has no parent, it takes the specification before the commit as a draft»: у коммита без родителя нет записей родителя, так что каждая его запись относится к тем, что идут после них.",
  ],
  "s-2x58az67bm6cxq2": [
    "Связь `implements` с основной таблицей проверок (s-jau82aq9juv9zzh): узел реализует правила 9.4 и 1.5.2, а строку 10.1.28a реализует «The code and the tests of a draft rule» (s-w93jfnqynfa47pf).",
    "«A line holding a SpecTag, before the commit or after it, counts for the symbol the SpecTag marks»: теперь SpecTag засчитывается по своему тексту (правило 9.4 и решение по нему от 2026-11-10), так что переформатированный комментарий вокруг неизменного SpecTag ничего не меняет.",
    "Исключение для строки, которая отличается только «in an identifier the commit renames throughout»: 2026-11-11 вы убрали это исключение из правила 9.4.",
    "Исключение для строки, которая отличается только «in a comment» и «in the sid a citation names»: «How two versions of code are compared» (s-u6mj5yv8ngnz79v) не учитывает комментарии, а sid в ссылке — часть комментария.",
    "«of the system's code outside its tests»: узел охватывает и тесты, а этот оборот не используется (.claude/vt/rules.md).",
  ],
  "s-t383grkn3q68dpf": [
    "Связь `implements` с основной таблицей проверок (s-jau82aq9juv9zzh): узел реализует строку 10.1.34.",
    "Сравнение символов, которые называет запись `meta.code`: `meta.code` называет файлы (строка 10.1.34; «What `sheriff reindex` writes»).",
  ],
  "s-5hb9k2e34dgn284": [
    "Связь `implements` с основной таблицей проверок (s-jau82aq9juv9zzh): узел реализует строку 10.1.35.",
    "Связь `implements` с убранным «A member of `TextRule.list` may be an object» (s-v7vd4ydrwexsgsj), который в архиве заменён на s-eferktypcj7njt5: узел реализует строку 10.1.35, которая проверяет это правило, и ссылается на него.",
    "«the declaration the list names in the code, the schema or the settings»: `TextRule.list.declaredIn` заменён на `TextRule.list.jsonSchema` и `TextRule.list.valueList` (ваши решения от 2026-11-13 по строке 10.1.35), а сравнение с ключами объекта JSON убирается (todo этой строки).",
  ],
  "proposal:s-hhnahzmhahf8jht": [
    "«That rule's `TextRule.list.declaredIn` refers to the field `kinds` of the JSON Schema»: 2026-11-13 вы заменили `declaredIn` (строка 10.1.35), в поле `kinds` нет схемы для имени типа узлов, а инструменты SpecSheriff находят список по связи `refines` (s-czxaqvaesmu3gru).",
  ],
  "s-cdachayybfvg4na": [
    "Связи `implements` с основной таблицей проверок (s-jau82aq9juv9zzh) и с убранным «A member of `TextRule.list` may be an object» (s-v7vd4ydrwexsgsj): узел реализует строку 10.1.36.",
  ],
};

const LOCATION = {
  "new:tools-7-1-extensions-delivered": "tools 7.1.2a (новый, после «How the schema of the specification is composed»)",
  "new:tools-7-2-changed-line": "tools 7.2.1a (новый, после «What a commit adds, changes and removes in the code and the tests»)",
  "new:tools-7-2-draft-rule": "tools 7.2.2c (новый, после «Code and tests outside the commit that no SpecTag binds»)",
  "new:tools-7-2-own-kinds": "tools 7.2.6a (новый, после «A list and its declaration»)",
  "proposal:s-ztseyetus7np6br-g3": "tools 2.2 (новый)",
  "proposal:new-tools-1-settings-g3": "tools 2 (новый, после «Where the files are»)",
  "proposal:s-gb8s9657a65hqmv-g3": "tools 2.3 (новый)",
  "proposal:row-10-1-35a": "spec 10.1.35a (новая строка основной таблицы проверок, после строки 10.1.35)",
};


// The approved nodes of tools.json that a draft of the group rewrites or is carved from. The Russian of
// s-j9r8z4xdrfkfs47 is the one group 2's page showed.
const APPROVED = {
  "s-j9r8z4xdrfkfs47": { ruTitle: group2.approved["s-j9r8z4xdrfkfs47"].ruTitle, ru: group2.approved["s-j9r8z4xdrfkfs47"].ru },
  "s-2x58az67bm6cxq2": {
    ruTitle: "Символы, которые меняет коммит",
    ru: "`sheriff binding` определяет, какие символы кода системы вне его тестов меняет коммит.\n\n- Изменённая строка засчитывается символу, в котором она стоит. Изменение в любом месте символа — изменение всего символа.\n- Строка с SpecTag, до коммита или после него, засчитывается символу, который этот SpecTag помечает, даже если она стоит вне тела символа.\n\nСимвол не считается изменённым, если каждая из его изменённых строк:\n\n- не является строкой с SpecTag;\n- отличается от строки, которую заменяет, только комментарием, sid, который называет ссылка, или идентификатором, который коммит переименовывает повсюду.",
  },
  "s-t383grkn3q68dpf": {
    ruTitle: "`meta.code` и `meta.tests` узла",
    ru: "`sheriff binding` собирает SpecTag на коде и на тестах по всему репозиторию и сравнивает их с `meta.code` и `meta.tests` каждого узла.",
  },
  "s-5hb9k2e34dgn284": {
    ruTitle: "Список и его объявление",
    ru: "`sheriff binding` сравнивает элементы каждого списка узла с объявлением, которое список называет в коде, схеме или настройках. Элемент-объект сравнивается по свойству, которое называет список.",
  },
  "s-cdachayybfvg4na": {
    ruTitle: "Объект в списке",
    ru: "`sheriff validate` ищет в каждом элементе `TextRule.list`, который является объектом, свойство, которое называет список (§s-v7vd4ydrwexsgsj). Элемент без этого свойства отвергается.",
  },
};


// What rounds e to g changed or added.
Object.assign(STAGE3, {
  "s-2x58az67bm6cxq2": "binding.ts:68-102 (readCommit) считает изменённой каждую строку с `@spec` (diff.ts:146 и :160) и относит удалённую строку к символу с тем же именем. Он должен сравнивать две версии символа, теста или файла по их синтаксическим деревьям, как говорит s-u6mj5yv8ngnz79v, и считать SpecTag символа, файла или теста изменённым, только если различаются их тексты, чтобы переформатирование комментария вокруг неизменного SpecTag ничего не меняло. Он должен читать файлы, привязанные целиком (SpecTag в начале файла, записи sheriff.bindings.json), сравнивая две версии такого файла, как говорит s-u6mj5yv8ngnz79v, и засчитывая изменение SpecTag записи как изменение её файла. Он должен определять, что коммит удаляет, — для s-w93jfnqynfa47pf и для строки 10.1.41. У тестов в binding.test.ts:89 и :108 должен быть SpecTag s-2x58az67bm6cxq2. Сначала пишутся новые тесты: для файла, привязанного целиком, для записи файла привязок, для удалённых строк и для переформатированного комментария вокруг SpecTag. При переносе решения от 2026-11-06 остаются в узле.",
  "new:tools-7-2-changed-line": "diff.ts:130-190 (codeChanges) сопоставляет удалённые строки файла с добавленными и не засчитывает имя, переименованное повсюду (diff.ts:176-188); и то и другое убирается. diff.ts:146 и :160 считают изменённой каждую строку с `@spec`; они убираются, потому что s-2x58az67bm6cxq2 засчитывает изменение SpecTag по его тексту. binding.ts:42-51 (testLines) считает изменённой любую строку теста; он убирается. normalize (diff.ts:78) вырезает `//`, `/*…*/` и `#` в файле, язык которого не охватывает ни одно описание; он убирается. Инструменты SpecSheriff должны разбирать обе версии каждого символа, теста и файла, привязанного целиком, через tree-sitter (грамматиками TypeScript, JavaScript и Python, а для файла, привязанного целиком, с подходящим расширением — грамматиками YAML, CSS, SQL, Bash и JSON) и сравнивать деревья без комментариев, кроме первой строки, начинающейся с `#!`, и без названия теста, кроме его SpecTag. В любом другом файле сравнивается текст. У тестов в binding.test.ts:42, :49, :56, :69 и :79 должен быть SpecTag s-u6mj5yv8ngnz79v. Сначала пишутся тесты для перенесённого вызова, переименованного теста, ключа YAML с новым отступом, переформулированного комментария CSS, `a:hover` против `a :hover` в CSS, `x=1` против `x = 1` в Bash и изменённого шебанга.",
  "proposal:new-tools-10-verdict": "Схема вердикта должна позволять замечанию называть суждение о комментариях. review.ts должен читать вердикт, который пропускает коммит и перечисляет только замечания о комментариях, и не читать вердикт, который пропускает коммит с любым другим замечанием.",
  "new:tools-7-3-review-comments": "Никакой код не спрашивает рецензента о комментариях. review.ts должен запрашивать вердикт на каждом коммите, который добавляет или меняет комментарий в коде системы, кроме файлов, которые записывает `sheriff types`. Комментарий меняется так, как говорит этот узел: в файле, деревья которого строят инструменты SpecSheriff, — комментарий, не включённый в деревья; в любом другом файле — каждая изменённая строка, а комментарий от кода отличает рецензент. review.ts должен передавать рецензенту код, который описывает каждый такой комментарий, как его перечисляет этот узел, и сообщать каждое замечание о комментарии как предупреждение, не отклоняя коммит. Тесты пишутся первыми.",
});
Object.assign(LOCATION, {
  "proposal:new-spec-1-6-checks": "spec 1.6.1 (новый, выделен из правила 1.6.1, перед ним)",
  "proposal:new-spec-1-6-tests": "spec 1.6.4 (новый, выделен из правила 1.6.1)",
  "proposal:s-m4h279nbaqkpa3t": "spec 1.6.2 (на месте правила 1.6.1, после нового правила о том, что держат проверки)",
  "proposal:row-10-1-43b": "spec 10.1.43b (новая строка основной таблицы проверок, после строки 10.1.43a)",
  "new:tools-7-3-review-comments": "tools 7.3.4d (новый, после «The judgement on a node of the technical appendix that a commit approves»)",
  "proposal:new-tools-7-3-review-code": "tools 7.3.4a (после «The review of a commit»)",
});

const tools = read("../../specs/_guidelines/tools.json");
const nodeOf = new Map();
const walk = (n) => { if (n.sid) nodeOf.set(n.sid, n); (n.children || []).forEach(walk); };
tools.nodes.forEach(walk);

const stale = [];
const put = (section, key, entry) => {
  out[section] ??= {};
  const have = out[section][key];
  if (!have) out[section][key] = entry;
  else if (JSON.stringify({ ...have, ru: undefined, ruTitle: undefined }) !== JSON.stringify({ ...entry, ru: undefined, ruTitle: undefined })) stale.push(`${section} ${key}`);
};
for (const [k, ru] of Object.entries(STAGE3)) put("stage3", k, { en: drafts[k].stage3, ru });
for (const [k, list] of Object.entries(REMOVED)) {
  const en = drafts[k].proposal.removed;
  if (en.length !== list.length) throw new Error(`${k}: ${en.length} removed passages, ${list.length} in Russian`);
  out.removed ??= {};
  const have = out.removed[k];
  if (!have) out.removed[k] = en.map((e, i) => ({ en: e, ru: list[i] }));
  else en.forEach((e, i) => { if (have[i]?.en !== e) stale.push(`removed ${k} [${i}]`); });
}
for (const [k, ru] of Object.entries(LOCATION)) put("location", k, { en: drafts[k].location, ru });
for (const [sid, a] of Object.entries(APPROVED)) {
  const n = nodeOf.get(sid);
  if (!n) throw new Error(`${sid} is not in tools.json`);
  put("approved", sid, { title: n.title, en: n.text, ruTitle: a.ruTitle, ru: a.ru });
}
fs.writeFileSync(outUrl, JSON.stringify(out, null, 2) + "\n");
console.log("group3-ru.json written");
if (stale.length) console.log(`out of date, to correct by hand in group3-ru.json:\n${stale.join("\n")}`);
