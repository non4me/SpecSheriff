// Applies specsheriff-rule-reviewer's findings on the proposal for "Where the files are" (s-zefk589ykh37b8u):
// the node keeps the table of what is kept where, and the lists of what sheriff.config.json and project.json
// hold become two new nodes after it, drafted here and shown to the owner after it. The earlier proposal is
// kept in the draft as `proposalA`.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsUrl = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(draftsUrl, "utf8"));
const sid = "s-zefk589ykh37b8u";
const draft = drafts[sid];
if (!draft?.proposal) throw new Error("run propose-tools-1.mjs first");
if (!draft.proposalA) draft.proposalA = draft.proposal;

function compose(parts, lang) {
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const v = p[lang];
    if (p.kind === "th") out.push(`| ${v.join(" | ")} |\n|---|---|`);
    else if (p.kind === "tr") out.push(`| ${v.join(" | ")} |`);
    else if (p.kind === "li") out.push(`- ${v}`);
    else out.push(v);
    const next = parts[i + 1];
    if (!next) break;
    const sameBlock = (p.kind === "th" || p.kind === "tr") && next.kind === "tr"
      || (p.kind === "li" && next.kind === "li")
      || (p.kind === "p" && next.kind === "li");
    out.push(sameBlock ? "\n" : "\n\n");
  }
  return out.join("");
}
const same = "Без изменений по смыслу.";

const partsA = [
  { kind: "p",
    en: "The SpecSheriff tools find each file of a project at the path given below, relative to the root of the repository:",
    ru: "Инструменты SpecSheriff находят каждый файл проекта по пути, указанному ниже относительно корня репозитория:",
    change: "Новая вводная фраза: узел теперь открывается тем, что он задаёт." },
  { kind: "th", en: ["What is kept", "Where"], ru: ["Что хранится", "Где"],
    change: "Вместо сплошного перечня — таблица «что хранится — где»." },
  { kind: "tr",
    en: ["The base specification, if the project has not chosen the Domains extension (§s-h6h25ctd3yryudh)", "`specs/base/`"],
    ru: ["Базовая спецификация, если проект не выбрал расширение Domains (§s-h6h25ctd3yryudh)", "`specs/base/`"],
    change: "Новое. Раньше узел знал только спецификацию, разделённую на домены; домены теперь — расширение, которое проект может не выбрать. Папка выбрана мной." },
  { kind: "tr",
    en: ["Each domain, if the project has chosen the Domains extension", "`specs/<domain>/`, where `<domain>` is the domain's name"],
    ru: ["Каждый домен, если проект выбрал расширение Domains", "`specs/<domain>/`, где `<domain>` — имя домена"],
    change: "Путь прежний, добавлено условие. Убрано, что домен открывается заголовком в файле `specs/<domain>/00-<domain>.json`: инструменты находят заголовок домена по типу узла в любом файле папки домена и такого имени файла не требуют." },
  { kind: "tr",
    en: ["The contracts section (§s-z6tq6a3btnvvwx7)", "`specs/contracts/`"],
    ru: ["Контракты (§s-z6tq6a3btnvvwx7)", "`specs/contracts/`"],
    change: "Без изменений по смыслу. По правилу 3.1 контракты бывают и в спецификации без доменов, поэтому эта строка не зависит от расширения Domains." },
  { kind: "tr",
    en: ["The technical appendix (§s-vj7ercem526zd6v)", "`specs/tech/`, each of its sections in a file of its own: the section for the stack in `stack.json`, the technical debt in `debt.json`"],
    ru: ["Техническое приложение (§s-vj7ercem526zd6v)", "`specs/tech/`, каждый его раздел — в отдельном файле: раздел стека — в `stack.json`, технический долг — в `debt.json`"],
    change: "Убрано «раздел домена — в `<domain>.json`». По правилу 4.1 у приложения есть раздел для каждого раздела верхнего уровня базовой спецификации, под названием этого раздела, а не по одному разделу на домен." },
  { kind: "tr",
    en: ["The project's own guidelines (§s-u7tw6m8npxmv5tu)", "`specs/_guidelines/project.json`"],
    ru: ["Собственные guidelines проекта (§s-u7tw6m8npxmv5tu)", "`specs/_guidelines/project.json`"],
    change: "Путь прежний. Что инструменты SpecSheriff читают в этом файле, теперь говорит отдельный новый узел, который я покажу после этого." },
  { kind: "tr",
    en: ["The SpecSheriff guidelines, each extension of the guidelines (§s-mbmnsnxenmavu3z) and the appendix of the tools (§s-a4rbry4hsu34hy8)", "`specs/_guidelines/spec.json`, a file named after each extension in `specs/_guidelines/extensions/`, and `specs/_guidelines/tools.json`"],
    ru: ["SpecSheriff guidelines, каждое расширение guidelines (§s-mbmnsnxenmavu3z) и описание инструментов (§s-a4rbry4hsu34hy8)", "`specs/_guidelines/spec.json`, файл с именем каждого расширения в `specs/_guidelines/extensions/` и `specs/_guidelines/tools.json`"],
    change: "Добавлены файлы расширений guidelines, по вашему решению: каждое расширение — в своём файле." },
  { kind: "tr",
    en: ["The schema of the SpecSheriff guidelines (§s-eferktypcj7njt5)", "`specs/_schema/`: `node.schema.json` for a node, `section-file.schema.json` for the file of a part of the specification, `archive-file.schema.json` for a file of the archive, `status.schema.json` for an entry of `specs/_status.jsonl`, and `extension.schema.json` for an extension of the schema, whether an extension of the guidelines or the project adds it"],
    ru: ["Схема SpecSheriff guidelines (§s-eferktypcj7njt5)", "`specs/_schema/`: `node.schema.json` — для узла, `section-file.schema.json` — для файла части спецификации, `archive-file.schema.json` — для файла архива, `status.schema.json` — для записи в `specs/_status.jsonl`, `extension.schema.json` — для расширения схемы, которое добавляет расширение guidelines или проект"],
    change: "Добавлены `archive-file.schema.json`, по которому проверяется архив, и `status.schema.json`. Второй нужен потому, что по вашему решению от 17 ноября значение флага `strict` по умолчанию задаёт только схема; имя файла выбрано мной. Уточнено, что `extension.schema.json` проверяет любое расширение схемы, а не только то, которое добавляет проект." },
  { kind: "tr",
    en: ["The schema of each extension of the guidelines that has one", "a file named after the extension in `specs/_schema/extensions/`"],
    ru: ["Схема каждого расширения guidelines, у которого она есть", "файл с именем расширения в `specs/_schema/extensions/`"],
    change: "Новое: у расширения guidelines может быть своя схема, которая дополняет схему guidelines." },
  { kind: "tr",
    en: ["The project's extension of the schema", "`specs/_schema/project.schema.json`"],
    ru: ["Расширение схемы, которое добавляет проект", "`specs/_schema/project.schema.json`"],
    change: "Путь прежний. Убраны два предложения, которые повторяли другие узлы описания инструментов: что это расширение проверяется по схеме расширения (это говорит «The schema and a project's extension») и что любой другой файл в `specs/_schema/` отклоняется как копия схемы (это говорит «No copy of the SpecSheriff guidelines»)." },
  { kind: "tr",
    en: ["The approvals (§s-67vekyup7y8smap)", "`specs/_approvals.jsonl`"],
    ru: ["Одобрения (§s-67vekyup7y8smap)", "`specs/_approvals.jsonl`"],
    change: same },
  { kind: "tr",
    en: ["The entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2)", "`specs/_status.jsonl`"],
    ru: ["Записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2) и её флаг `strict` (§s-q3pfzyaxvpr2zj2)", "`specs/_status.jsonl`"],
    change: "Новое. Статус одобрения спецификации теперь задают записи ответственных, а не правило в `project.json`; флаг `strict` тоже новый. Файл выбран мной." },
  { kind: "tr",
    en: ["The archive of removed nodes (§s-f2b5zvc565s242f)", "every file in `specs/_archive/`"],
    ru: ["Архив удалённых узлов (§s-f2b5zvc565s242f)", "все файлы в `specs/_archive/`"],
    change: "Было «`specs/_archive/<name>.json`», без объяснения, что такое `<name>`. Инструменты читают как архив любой файл этой папки, это теперь и сказано." },
  { kind: "tr",
    en: ["The bindings file (§s-kgbzk2ph9e6jfb4)", "`sheriff.bindings.json`"],
    ru: ["Файл привязок (§s-kgbzk2ph9e6jfb4)", "`sheriff.bindings.json`"],
    change: "Новое: файл привязок для форматов, в которых нельзя писать комментарии. Правило 1.5.2 требует держать его в корне репозитория; имя выбрано мной." },
  { kind: "tr",
    en: ["The settings of the SpecSheriff tools that the project shares", "`sheriff.config.json`"],
    ru: ["Настройки инструментов SpecSheriff, общие для всего проекта", "`sheriff.config.json`"],
    change: "Путь прежний. Что содержит этот файл, теперь говорит отдельный новый узел, который я покажу после этого." },
  { kind: "tr",
    en: ["The map (§s-zu8ne3wq84zchc4) and the human-readable export (§s-ce24ynwabt5yx8h), if the project has chosen the Views extension (§s-qgg6sfawtmwvrbb)", "`specs/_viewer/` and `md-version/`, which git ignores"],
    ru: ["Карта (§s-zu8ne3wq84zchc4) и читаемый экспорт (§s-ce24ynwabt5yx8h), если проект выбрал расширение Views (§s-qgg6sfawtmwvrbb)", "`specs/_viewer/` и `md-version/`, которые git игнорирует"],
    change: "Пути прежние. Добавлено условие: карта и экспорт теперь — расширение Views. Убрано, что они строятся заново после каждого изменения: это говорит узел «The hooks»." },
  { kind: "tr",
    en: ["The documentation", "every Markdown file that the repository keeps outside `specs/`"],
    ru: ["Документация", "все Markdown-файлы, которые репозиторий хранит вне `specs/`"],
    change: "Было отдельным предложением: «документы — это markdown-файлы, которые репозиторий хранит вне `specs/`». Теперь это строка таблицы, и «документы» заменены на «документацию», по вашему решению по строке 10.1.39." },
  { kind: "p",
    en: "A part of the specification that is divided into one file per section keeps those files in its directory.",
    ru: "Часть спецификации, разделённая на файлы по одному на раздел, хранит эти файлы в своей папке.",
    change: same },
  { kind: "p",
    en: "Only the repository where the SpecSheriff guidelines are written keeps the SpecSheriff guidelines, the extensions of the guidelines, the appendix of the tools and the schema of the guidelines and of their extensions. Every other project reads them from the plugin that holds the running SpecSheriff tools (§s-4mej6ccn7xu3d3p).",
    ru: "SpecSheriff guidelines, расширения guidelines, описание инструментов и схему guidelines и их расширений хранит только репозиторий, в котором пишутся SpecSheriff guidelines. Все остальные проекты читают их из плагина, в котором находятся запущенные инструменты SpecSheriff (§s-4mej6ccn7xu3d3p).",
    change: "Два прежних абзаца, о guidelines и о схеме, сведены в один; добавлены расширения guidelines и их схемы. Было «из плагина своего агента». Но git-хук берёт инструменты того из двух плагинов, чей выпуск новее (узел «A git hook runs the SpecSheriff tools a plugin keeps on the machine»), поэтому теперь сказано «из плагина, в котором находятся запущенные инструменты»." }
];

const removedA = [
  "Абзац о запуске `sheriff` в терминале и абзац об установке плагина для pytest через pip — по вашему решению: это инструкции для пользователя, и они есть в руководстве.",
  "Перечни того, что содержат `sheriff.config.json` и `project.json`, и предложение о том, где инструменты ищут SpecTag, перенесены в два новых узла, которые я покажу после этого. Они говорят не о том, где лежит файл, а о том, что в нём.",
  "Правило в `project.json`, от которого зависел статус одобрения спецификации: его заменили записи ответственных в `specs/_status.jsonl`.",
  "Что настройки запусков рецензента хранятся в git-конфигурации каждого пользователя: это говорит узел «Who runs the reviewer».",
  "Абзац о файлах инструментов: что проект хранит только файлы, которые пишет `sheriff init`, уже следует из правила 2.5 и узлов о плагинах; что в этом репозитории тесты инструментов лежат в `skills/`, задаёт его собственный `sheriff.config.json`."
];

draft.proposal = {
  title: "Where the files are",
  ruTitle: "Где лежат файлы",
  parts: partsA,
  text: compose(partsA, "en"),
  ruText: compose(partsA, "ru"),
  reason: "The SpecSheriff tools find the files of every project at the same paths, so no setting has to say where a file is kept. A person or an agent finds each file at the same path in any project.",
  ruReason: "Инструменты SpecSheriff находят файлы любого проекта по одним и тем же путям, поэтому ни одна настройка не должна указывать, где лежит файл. Человек или агент находит каждый файл по тому же пути в любом проекте.",
  reasonChange: "Новое: у узла не было обоснования.",
  removed: removedA,
  date: "2026-11-21",
  reviewed: "specsheriff-rule-reviewer, 2026-11-21: findings applied"
};

// The two new nodes after it, shown to the owner after it, one at a time.
const partsB = [
  { kind: "p",
    en: "`sheriff.config.json` (§s-zefk589ykh37b8u) holds the settings of the SpecSheriff tools that the project shares:",
    ru: "`sheriff.config.json` (§s-zefk589ykh37b8u) содержит настройки инструментов SpecSheriff, общие для всего проекта:",
    change: "Новый узел. Его содержание было в узле «Where the files are»." },
  { kind: "li",
    en: "the glob patterns that name where the system's code (§s-hheus6f395ynqvc) is kept and where its tests are kept;",
    ru: "glob-шаблоны, которые указывают, где хранится код системы (§s-hheus6f395ynqvc) и где хранятся его тесты;",
    change: same },
  { kind: "li",
    en: "for each check and each generator that the project's own guidelines add (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the rule that lists it, its name in that rule, the command that runs it, and the glob patterns that name the files of its code and of its tests (§s-utf4mbt7ref8g9c);",
    ru: "для каждой проверки и каждого генератора, которые добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): правило, которое их перечисляет, их имя в этом правиле, команду, которая их запускает, и glob-шаблоны, которые указывают файлы их кода и их тестов (§s-utf4mbt7ref8g9c);",
    change: "Добавлено, что запись о проверке или генераторе называет ещё правило, которое их перечисляет, и их имя в нём: инструменты это читают и требуют." },
  { kind: "li",
    en: "the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g);",
    ru: "расширения guidelines, выбранные проектом (§s-9ttvcwpqkehm58g);",
    change: "Новое. Правило 1.7.5 требует записывать выбор в конфигурацию репозитория; место выбрано мной." },
  { kind: "li",
    en: "the command that runs the tests (§s-477gtdrkw34dzxw);",
    ru: "команду, которая запускает тесты (§s-477gtdrkw34dzxw);",
    change: "Новое в этом перечне, со ссылкой на узел «The hooks», который говорит, когда эта команда выполняется." },
  { kind: "li",
    en: "the settings of the reviewer that the project shares (§s-xr5xxa9cxf2mq5u);",
    ru: "настройки рецензента, общие для всего проекта (§s-xr5xxa9cxf2mq5u);",
    change: "Новое в этом перечне, со ссылкой на узел «Who runs the reviewer», который эти настройки перечисляет." },
  { kind: "li",
    en: "`\"writesSpecSheriffGuidelines\": true`, only in the repository where the SpecSheriff guidelines are written.",
    ru: "`\"writesSpecSheriffGuidelines\": true` — только в репозитории, где пишутся SpecSheriff guidelines.",
    change: same },
  { kind: "p",
    en: "To find the SpecTags (§s-8xw4mgvpexyvw5q) that bind code and tests to their rules, the SpecSheriff tools read only the files that the glob patterns in `sheriff.config.json` name as code or as tests.",
    ru: "SpecTag (§s-8xw4mgvpexyvw5q), которые связывают код и тесты с их правилами, инструменты SpecSheriff ищут только в файлах, которые glob-шаблоны из `sheriff.config.json` указывают как код или как тесты.",
    change: "Было: «код и тесты читаются на SpecTag, а файл, не указанный ни как код, ни как тесты, не читается ни на что; так конфигурация и собственные инструменты репозитория остаются вне кода системы». Теперь то же сказано утвердительно, через «только»; что из этого следует для кода системы, говорит правило 9.1." }
];
const partsC = [
  { kind: "p",
    en: "The SpecSheriff tools read the following in the project's own guidelines (§s-u7tw6m8npxmv5tu), kept in `project.json`:",
    ru: "В собственных guidelines проекта (§s-u7tw6m8npxmv5tu), которые хранятся в `project.json`, инструменты SpecSheriff читают:",
    change: "Новый узел. Его содержание было в узле «Where the files are»." },
  { kind: "li",
    en: "the specification's owners, whom the top node of `project.json` names;",
    ru: "ответственных за спецификацию, которых называет верхний узел `project.json`;",
    change: same },
  { kind: "li",
    en: "if the project has chosen the Domains extension (§s-h6h25ctd3yryudh), the levels of the domains: the members of the `TextRule.list` of the rule that lists the levels (§s-nkyty4dy9x2v2a4);",
    ru: "если проект выбрал расширение Domains (§s-h6h25ctd3yryudh), — уровни доменов: элементы `TextRule.list` правила, которое перечисляет уровни (§s-nkyty4dy9x2v2a4);",
    change: "Добавлено условие: уровни есть только у доменов, а домены теперь — расширение." },
  { kind: "li",
    en: "the files kept as fixtures of tests: the glob patterns of the rule that lists the fixtures (§s-6hha5en226aj8hu);",
    ru: "файлы, которые хранятся как фикстуры тестов: glob-шаблоны правила, которое перечисляет фикстуры (§s-6hha5en226aj8hu);",
    change: same },
  { kind: "li",
    en: "the project's own tools that rewrite files: those that the rule listing such tools names (§s-pcnyfp7gev7syax);",
    ru: "собственные инструменты проекта, которые переписывают файлы: те, которые называет правило, перечисляющее такие инструменты (§s-pcnyfp7gev7syax);",
    change: "Новое: правило 10.12 требует запускать такие инструменты первыми, поэтому инструментам SpecSheriff нужен их перечень." },
  { kind: "li",
    en: "the formats of files, besides JSON, that allow no comments: those that the rule naming such formats names (§s-kgbzk2ph9e6jfb4).",
    ru: "форматы файлов помимо JSON, в которых нельзя писать комментарии: те, которые называет правило, перечисляющее такие форматы (§s-kgbzk2ph9e6jfb4).",
    change: "Новое: по правилу 1.5.2 файл такого формата привязывается к правилам через файл привязок." }
];
drafts["new:tools-1-settings"] = {
  location: "tools 2 (new, after \"Where the files are\")",
  agreed: false,
  proposal: {
    title: "The settings a project shares",
    ruTitle: "Настройки, общие для проекта",
    parts: partsB,
    text: compose(partsB, "en"),
    ruText: compose(partsB, "ru"),
    reason: "A setting kept in the repository is the same in every clone, so the SpecSheriff tools behave alike for everyone who works on the project.",
    ruReason: "Настройка, которая хранится в репозитории, одинакова в каждом клоне, поэтому инструменты SpecSheriff ведут себя одинаково у всех, кто работает над проектом.",
    reasonChange: "Новое.",
    removed: [],
    date: "2026-11-21",
    reviewed: "not yet: to go to specsheriff-rule-reviewer before it is shown"
  }
};
drafts["new:tools-1-project"] = {
  location: "tools 3 (new, after \"The settings a project shares\")",
  agreed: false,
  proposal: {
    title: "What the SpecSheriff tools read in the project's own guidelines",
    ruTitle: "Что инструменты SpecSheriff читают в собственных guidelines проекта",
    parts: partsC,
    text: compose(partsC, "en"),
    ruText: compose(partsC, "ru"),
    reason: "Some rules of the SpecSheriff guidelines leave a value for each project to set, such as who owns the specification. The project's owners approve such a value as a rule of the project's own guidelines, and the SpecSheriff tools read it there.",
    ruReason: "Некоторые правила SpecSheriff guidelines оставляют значение на усмотрение проекта, например кто отвечает за спецификацию. Ответственные проекта одобряют такое значение как правило его собственных guidelines, и инструменты SpecSheriff читают его оттуда.",
    reasonChange: "Новое.",
    removed: [],
    date: "2026-11-21",
    reviewed: "not yet: to go to specsheriff-rule-reviewer before it is shown"
  }
};
fs.writeFileSync(draftsUrl, JSON.stringify(drafts, null, 2) + "\n");
console.log("proposal of", sid, "rewritten;", partsA.length, "parts; two new nodes drafted");
