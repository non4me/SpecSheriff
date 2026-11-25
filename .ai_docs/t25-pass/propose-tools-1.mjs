// Proposes the new wording of "Where the files are" (s-zefk589ykh37b8u), tools 1: one node holding a
// table of what is kept where, in place of the proposal of 2026-11-21 to make it a section of eight rules.
// The wording is written part by part, so that the page of the node shows each part in English and in
// Russian beside what changed in it and the nodes it cites.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsUrl = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(draftsUrl, "utf8"));
const sid = "s-zefk589ykh37b8u";
const draft = drafts[sid];
if (!draft) throw new Error("run agree-tools-1-instructions.mjs first");

// kind: "p" a paragraph, "th" the head of the table, "tr" a row of the table, "li" an item of the list
// that the paragraph before it opens. Each part: en, ru, change (in Russian, for the owner).
const parts = [
  { kind: "p",
    en: "The SpecSheriff tools find each file of a project at the path given below, relative to the root of the repository:",
    ru: "Инструменты SpecSheriff находят каждый файл проекта по пути, указанному ниже относительно корня репозитория:",
    change: "Новая вводная фраза: узел теперь открывается тем, что он задаёт." },
  { kind: "th", en: ["What is kept", "Where"], ru: ["Что хранится", "Где"], change: "Вместо сплошного перечня — таблица «что хранится — где»." },
  { kind: "tr",
    en: ["The base specification, if the project has not chosen the Domains extension", "`specs/base/`"],
    ru: ["Базовая спецификация, если проект не выбрал расширение Domains", "`specs/base/`"],
    change: "Новое. Раньше узел знал только спецификацию, разделённую на домены; домены теперь — расширение, которое проект может не выбрать." },
  { kind: "tr",
    en: ["The base specification, if the project has chosen the Domains extension (§s-h6h25ctd3yryudh)", "each domain in `specs/<domain>/`, opening with its header in `specs/<domain>/00-<domain>.json`; the contracts section in `specs/contracts/`"],
    ru: ["Базовая спецификация, если проект выбрал расширение Domains (§s-h6h25ctd3yryudh)", "каждый домен — в `specs/<domain>/`, начиная с его заголовка в `specs/<domain>/00-<domain>.json`; раздел контрактов — в `specs/contracts/`"],
    change: "Пути прежние. Добавлено условие: так хранится спецификация проекта, выбравшего расширение Domains." },
  { kind: "tr",
    en: ["The technical appendix (§s-vj7ercem526zd6v)", "`specs/tech/`: the section that implements a part of the base specification in `<part>.json`, where `<part>` is `base` or the name of the domain; the stack in `stack.json`; the technical debt in `debt.json`"],
    ru: ["Техническое приложение (§s-vj7ercem526zd6v)", "`specs/tech/`: раздел, который реализует часть базовой спецификации, — в `<part>.json`, где `<part>` — `base` или имя домена; стек — в `stack.json`; технический долг — в `debt.json`"],
    change: "Было: «раздел домена — в `<domain>.json`». Теперь файл раздела назван по части базовой спецификации, которую раздел реализует, и это работает и без доменов." },
  { kind: "tr",
    en: ["The project's own guidelines (§s-u7tw6m8npxmv5tu)", "`specs/_guidelines/project.json`"],
    ru: ["Собственные guidelines проекта (§s-u7tw6m8npxmv5tu)", "`specs/_guidelines/project.json`"],
    change: "Без изменений по смыслу." },
  { kind: "tr",
    en: ["The SpecSheriff guidelines, each extension of the guidelines (§s-mbmnsnxenmavu3z) and the appendix of the tools", "`specs/_guidelines/spec.json`, `specs/_guidelines/extensions/<name>.json` and `specs/_guidelines/tools.json`"],
    ru: ["SpecSheriff guidelines, каждое расширение guidelines (§s-mbmnsnxenmavu3z) и описание инструментов", "`specs/_guidelines/spec.json`, `specs/_guidelines/extensions/<name>.json` и `specs/_guidelines/tools.json`"],
    change: "Добавлены файлы расширений guidelines, по вашему решению: каждое расширение — в своём файле." },
  { kind: "tr",
    en: ["The schema of the SpecSheriff guidelines (§s-eferktypcj7njt5)", "`specs/_schema/`: `node.schema.json` for a node, `section-file.schema.json` for the file of a part, `archive-file.schema.json` for a file of the archive, `extension.schema.json` for the project's extension of the schema"],
    ru: ["Схема SpecSheriff guidelines (§s-eferktypcj7njt5)", "`specs/_schema/`: `node.schema.json` — для узла, `section-file.schema.json` — для файла части, `archive-file.schema.json` — для файла архива, `extension.schema.json` — для расширения схемы, которое добавляет проект"],
    change: "Добавлен `archive-file.schema.json`: архив теперь проверяется своей схемой." },
  { kind: "tr",
    en: ["The schema of each extension of the guidelines that has one", "`specs/_schema/extensions/<name>.schema.json`"],
    ru: ["Схема каждого расширения guidelines, у которого она есть", "`specs/_schema/extensions/<name>.schema.json`"],
    change: "Новое: у каждого расширения guidelines своя схема, которая дополняет схему guidelines." },
  { kind: "tr",
    en: ["The project's extension of the schema", "`specs/_schema/project.schema.json`"],
    ru: ["Расширение схемы, которое добавляет проект", "`specs/_schema/project.schema.json`"],
    change: "Путь прежний. Убраны два предложения, которые повторяли другие узлы: что расширение проверяется по схеме расширения (это говорит «The schema and a project's extension») и что любой другой файл в `specs/_schema/` отклоняется как копия схемы (это говорит «No copy of the SpecSheriff guidelines»)." },
  { kind: "tr",
    en: ["The approvals (§s-67vekyup7y8smap)", "`specs/_approvals.jsonl`"],
    ru: ["Одобрения (§s-67vekyup7y8smap)", "`specs/_approvals.jsonl`"],
    change: "Без изменений по смыслу." },
  { kind: "tr",
    en: ["The entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2)", "`specs/_status.jsonl`"],
    ru: ["Записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2) и её флаг `strict` (§s-q3pfzyaxvpr2zj2)", "`specs/_status.jsonl`"],
    change: "Новое. Статус одобрения спецификации теперь задают записи ответственных, а не правило в `project.json`; флаг `strict` тоже новый. Файл выбран мной." },
  { kind: "tr",
    en: ["The archive of removed nodes (§s-f2b5zvc565s242f)", "`specs/_archive/<name>.json`"],
    ru: ["Архив удалённых узлов (§s-f2b5zvc565s242f)", "`specs/_archive/<name>.json`"],
    change: "Без изменений по смыслу." },
  { kind: "tr",
    en: ["The bindings file (§s-kgbzk2ph9e6jfb4)", "`sheriff.bindings.json`"],
    ru: ["Bindings file (§s-kgbzk2ph9e6jfb4)", "`sheriff.bindings.json`"],
    change: "Новое: файл привязок для форматов без комментариев. Правило 1.5.2 требует держать его в корне репозитория; имя выбрано мной." },
  { kind: "tr",
    en: ["The settings of the SpecSheriff tools that the project shares", "`sheriff.config.json`"],
    ru: ["Настройки инструментов SpecSheriff, общие для всего проекта", "`sheriff.config.json`"],
    change: "Без изменений по смыслу." },
  { kind: "tr",
    en: ["The settings of the reviewer's runs, which each user confirms (§s-xr5xxa9cxf2mq5u)", "the user's git configuration"],
    ru: ["Настройки запусков рецензента, которые подтверждает каждый пользователь (§s-xr5xxa9cxf2mq5u)", "git-конфигурация этого пользователя"],
    change: "Без изменений по смыслу." },
  { kind: "tr",
    en: ["The map and the readable export, if the project has chosen the Views extension", "`specs/_viewer/` and `md-version/`, rebuilt after every change to the specification and not kept in git"],
    ru: ["Карта и экспорт для чтения, если проект выбрал расширение Views", "`specs/_viewer/` и `md-version/`; они строятся заново после каждого изменения спецификации и не хранятся в git"],
    change: "Пути прежние. Добавлено условие: карта и экспорт теперь — расширение Views, которое проект может не выбрать." },
  { kind: "p",
    en: "A part of the specification that is divided into one file per section keeps those files in its directory.",
    ru: "Часть спецификации, разделённая на файлы по одному на раздел, хранит эти файлы в своей папке.",
    change: "Без изменений по смыслу." },
  { kind: "p",
    en: "Only the repository where the SpecSheriff guidelines are written keeps the SpecSheriff guidelines, the extensions of the guidelines, the appendix of the tools and the schema of the guidelines and of their extensions. Every other project reads them from the plugin of its agent (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4).",
    ru: "SpecSheriff guidelines, расширения guidelines, описание инструментов и схему guidelines и их расширений хранит только репозиторий, в котором пишутся SpecSheriff guidelines. Все остальные проекты читают их из плагина своего агента (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4).",
    change: "Два прежних абзаца (о guidelines и о схеме) сведены в один. Добавлены расширения guidelines и их схемы." },
  { kind: "p",
    en: "`sheriff.config.json` holds:",
    ru: "`sheriff.config.json` содержит:",
    change: "Раньше настройки были описаны тремя отдельными абзацами; теперь это один список." },
  { kind: "li",
    en: "the glob patterns that name where the system's code is kept and where its tests are kept (§s-hheus6f395ynqvc);",
    ru: "glob-шаблоны, которые указывают, где хранится код системы и где хранятся её тесты (§s-hheus6f395ynqvc);",
    change: "Без изменений по смыслу." },
  { kind: "li",
    en: "the command that runs each check and each generator that the project's own guidelines add (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze), with the glob patterns that name the files of its code and of its tests (§s-utf4mbt7ref8g9c);",
    ru: "команду, которая запускает каждую проверку и каждый генератор, добавленные собственными guidelines проекта (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze), вместе с glob-шаблонами, которые указывают файлы кода и тестов этой проверки или этого генератора (§s-utf4mbt7ref8g9c);",
    change: "Без изменений по смыслу." },
  { kind: "li",
    en: "the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g);",
    ru: "расширения guidelines, выбранные проектом (§s-9ttvcwpqkehm58g);",
    change: "Новое. Правило 1.7.5 требует записывать выбор в конфигурацию репозитория; место выбрано мной." },
  { kind: "li",
    en: "the command that runs the tests on a push (§s-m4h279nbaqkpa3t);",
    ru: "команду, которая запускает тесты при push (§s-m4h279nbaqkpa3t);",
    change: "Новое в этом узле: эта настройка уже есть в инструментах и в руководстве, но узел её не называл." },
  { kind: "li",
    en: "the settings of the reviewer that the project shares (§s-xr5xxa9cxf2mq5u);",
    ru: "настройки рецензента, общие для всего проекта (§s-xr5xxa9cxf2mq5u);",
    change: "Новое в этом узле, со ссылкой на узел «Who runs the reviewer», который их перечисляет." },
  { kind: "li",
    en: "`\"writesSpecSheriffGuidelines\": true`, only in the repository where the SpecSheriff guidelines are written.",
    ru: "`\"writesSpecSheriffGuidelines\": true` — только в репозитории, где пишутся SpecSheriff guidelines.",
    change: "Без изменений по смыслу." },
  { kind: "p",
    en: "The SpecSheriff tools look for SpecTags only in the files that these glob patterns name as code or as tests.",
    ru: "Инструменты SpecSheriff ищут SpecTag только в файлах, которые эти glob-шаблоны указывают как код или как тесты.",
    change: "Было: «код и тесты читаются на SpecTag, а файл, не указанный ни как код, ни как тесты, не читается ни на что; так конфигурация и собственные инструменты репозитория остаются вне кода системы». Теперь то же сказано утвердительно, через «только»; что из этого следует для кода системы, говорит правило 9.1." },
  { kind: "p",
    en: "The SpecSheriff tools find the following in `project.json`:",
    ru: "В `project.json` инструменты SpecSheriff находят:",
    change: "Без изменений по смыслу." },
  { kind: "li",
    en: "the specification's owners, whom its top node names;",
    ru: "ответственных за спецификацию, которых называет её верхний узел;",
    change: "Без изменений по смыслу." },
  { kind: "li",
    en: "if the project has chosen the Domains extension, the levels of the domains: the members of the `TextRule.list` of its rule that refines §s-nkyty4dy9x2v2a4;",
    ru: "если проект выбрал расширение Domains, — уровни доменов: элементы `TextRule.list` его правила, которое уточняет §s-nkyty4dy9x2v2a4;",
    change: "Добавлено условие: уровни есть только у доменов, а домены теперь — расширение." },
  { kind: "li",
    en: "the files kept as fixtures of tests: the glob patterns that its rule refining §s-6hha5en226aj8hu lists;",
    ru: "файлы, которые хранятся как фикстуры тестов: glob-шаблоны, которые перечисляет его правило, уточняющее §s-6hha5en226aj8hu;",
    change: "Без изменений по смыслу." },
  { kind: "li",
    en: "the project's own tools that rewrite files, which its rule refining §s-pcnyfp7gev7syax lists;",
    ru: "собственные инструменты проекта, которые переписывают файлы, — их перечисляет его правило, уточняющее §s-pcnyfp7gev7syax;",
    change: "Новое: правило 10.12 требует запускать такие инструменты первыми, поэтому инструментам SpecSheriff нужен их перечень." },
  { kind: "li",
    en: "the formats besides JSON that allow no comments, which its rule refining §s-kgbzk2ph9e6jfb4 names.",
    ru: "форматы помимо JSON, в которых нельзя писать комментарии, — их называет его правило, уточняющее §s-kgbzk2ph9e6jfb4.",
    change: "Новое: по правилу 1.5.2 файл такого формата привязывается к правилам через bindings file." },
  { kind: "p",
    en: "The documentation is the Markdown files that the repository keeps outside `specs/`.",
    ru: "Документация — это Markdown-файлы, которые репозиторий хранит вне `specs/`.",
    change: "«Документы» заменены на «документацию», по вашему решению по строке 10.1.39." }
];

const removed = [
  "Абзац о запуске `sheriff` в терминале и абзац об установке плагина для pytest через pip — по вашему решению: это инструкции пользователю, и они есть в руководстве.",
  "Правило в `project.json`, от которого зависел статус одобрения спецификации: его заменили записи ответственных в `specs/_status.jsonl`.",
  "Абзац о файлах инструментов: что проект хранит только файлы, которые пишет `sheriff init`, уже следует из правила 2.5 и узла о плагине для Claude Code; что в этом репозитории тесты инструментов лежат в `skills/`, задаёт его собственный `sheriff.config.json`.",
  "Где запускаются тесты (правило 1.6.1) в перечень `project.json` не включено: это указание для людей, инструменты SpecSheriff его не читают, а тесты запускают командой из `sheriff.config.json`."
];

const reason = {
  en: "The SpecSheriff tools read these files in every project. A path shared by every project lets the tools find each file without a setting that names it, and lets a person or an agent find the file in any project.",
  ru: "Инструменты SpecSheriff читают эти файлы в каждом проекте. Путь, общий для всех проектов, позволяет инструментам найти каждый файл без настройки, которая его указывает, а человеку или агенту — найти этот файл в любом проекте."
};

function compose(lang) {
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

draft.proposal = {
  title: "Where the files are",
  ruTitle: "Где лежат файлы",
  text: compose("en"),
  ruText: compose("ru"),
  reason: reason.en,
  ruReason: reason.ru,
  parts,
  removed,
  reasonChange: "Новое: у узла не было обоснования.",
  date: "2026-11-21"
};
fs.writeFileSync(draftsUrl, JSON.stringify(drafts, null, 2) + "\n");
const cited = [...new Set(draft.proposal.text.match(/s-[2-9a-hjkmnp-z]{15}/g))];
console.log("proposal written;", parts.length, "parts;", cited.length, "nodes cited:", cited.join(" "));
