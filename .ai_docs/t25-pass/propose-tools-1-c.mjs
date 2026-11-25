// Applies specsheriff-rule-reviewer's second report on "Where the files are" (s-zefk589ykh37b8u): the names of
// the files of the extensions, of the other sections of the technical appendix and of the archive, the names a
// domain may take, the paragraph on a part divided into files cut, and the node's links rebuilt from its text.
// It also stores the Russian rendering of the approved wording, which the page shows beside the English.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsUrl = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(draftsUrl, "utf8"));
const sid = "s-zefk589ykh37b8u";
const draft = drafts[sid];
const p = draft.proposal;
if (!p.reviewed.startsWith("specsheriff-rule-reviewer, 2026-11-21: findings applied")) throw new Error("unexpected state");

function compose(parts, lang) {
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    const q = parts[i];
    const v = q[lang];
    if (q.kind === "th") out.push(`| ${v.join(" | ")} |\n|---|---|`);
    else if (q.kind === "tr") out.push(`| ${v.join(" | ")} |`);
    else if (q.kind === "li") out.push(`- ${v}`);
    else out.push(v);
    const next = parts[i + 1];
    if (!next) break;
    const sameBlock = (q.kind === "th" || q.kind === "tr") && next.kind === "tr" || (q.kind === "li" && next.kind === "li") || (q.kind === "p" && next.kind === "li");
    out.push(sameBlock ? "\n" : "\n\n");
  }
  return out.join("");
}
const find = (start) => {
  const i = p.parts.findIndex((q) => (Array.isArray(q.en) ? q.en[0] : q.en).startsWith(start));
  if (i < 0) throw new Error("part not found: " + start);
  return p.parts[i];
};

const domain = find("Each domain");
domain.en[1] = "`specs/<domain>/`, where `<domain>` is the domain's name, distinct from the name of every other directory that this table names under `specs/`";
domain.ru[1] = "`specs/<domain>/`, где `<domain>` — имя домена, отличное от имени любой другой папки в `specs/`, которую называет эта таблица";
domain.change += " Добавлено, что имя домена отличается от имён других папок в `specs/`: инструменты не принимают домен с именем `contracts` или `tech`.";

const tech = find("The technical appendix");
tech.en[1] = "`specs/tech/`, each of its sections in a file of its own: the section for the stack in `stack.json`, the technical debt in `debt.json`, and each other section in a file of any other name";
tech.ru[1] = "`specs/tech/`, каждый его раздел — в отдельном файле: раздел стека — в `stack.json`, технический долг — в `debt.json`, каждый другой раздел — в файле с любым другим именем";
tech.change += " Имя файла остальных разделов задаёт автор: от него зависят только расположения узлов в файле.";

const ext = find("The SpecSheriff guidelines, each extension");
ext.en[1] = "`specs/_guidelines/spec.json`, `specs/_guidelines/extensions/<name>.json` and `specs/_guidelines/tools.json`, where `<name>` is the name under which `sheriff.config.json` lists the extension";
ext.ru[1] = "`specs/_guidelines/spec.json`, `specs/_guidelines/extensions/<name>.json` и `specs/_guidelines/tools.json`, где `<name>` — имя, под которым расширение указано в `sheriff.config.json`";

const extSchema = find("The schema of each extension");
extSchema.en[1] = "`specs/_schema/extensions/<name>.schema.json`, where `<name>` is the name under which `sheriff.config.json` lists the extension";
extSchema.ru[1] = "`specs/_schema/extensions/<name>.schema.json`, где `<name>` — имя, под которым расширение указано в `sheriff.config.json`";

const archive = find("The archive of removed nodes");
archive.en[1] = "every JSON file in `specs/_archive/`, each named after the part of the specification that its nodes were removed from, such as `contracts.json` or `guidelines.json`";
archive.ru[1] = "все JSON-файлы в `specs/_archive/`, каждый из которых назван по части спецификации, из которой удалены его узлы, например `contracts.json` или `guidelines.json`";
archive.change = "Было «`specs/_archive/<name>.json`», без объяснения, что такое `<name>`. Теперь сказано, что инструменты читают как архив каждый JSON-файл этой папки и как назван файл, в который попадает удалённый узел. Правило именования выбрано мной: так уже назван архив, собранный на этапе 1.";

const cut = p.parts.findIndex((q) => q.kind === "p" && q.en.startsWith("A part of the specification that is divided"));
if (cut < 0) throw new Error("paragraph not found");
p.parts.splice(cut, 1);
p.removed.push("Абзац «Часть спецификации, разделённая на файлы по одному на раздел, хранит эти файлы в своей папке»: каждая строка таблицы уже называет папку своей части.");

p.text = compose(p.parts, "en");
p.ruText = compose(p.parts, "ru");
p.reviewed = "specsheriff-rule-reviewer, 2026-11-21: passed after the fixes of its second report";

// The links: an `implements` link to each rule whose files the table places, a `cites` link to every other node it cites.
const implementsSet = ["s-k73czmpkazcx7mu", "s-eferktypcj7njt5", "s-f2b5zvc565s242f", "s-a4rbry4hsu34hy8", "s-67vekyup7y8smap",
  "s-qzthyh7yqvfhsa2", "s-q3pfzyaxvpr2zj2", "s-kgbzk2ph9e6jfb4", "s-vj7ercem526zd6v"];
const cited = [...new Set([...`${p.text}\n${p.reason}`.matchAll(/§(s-[2-9a-hjkmnp-z]{15})/g)].map((m) => m[1]))];
p.refs = [
  ...implementsSet.map((to) => ({ type: "implements", to })),
  ...cited.filter((to) => !implementsSet.includes(to)).map((to) => ({ type: "cites", to }))
];

draft.approvedRu = [
  "Части спецификации хранятся в `specs/`:",
  "- каждый домен — в `specs/<domain>/`, начиная с его заголовка в `specs/<domain>/00-<domain>.json`;\n- контракты — в `specs/contracts/`;\n- техническое приложение — в `specs/tech/`, каждый его раздел в отдельном файле: раздел домена — в `<domain>.json`, раздел стека — в `stack.json`, раздел технического долга — в `debt.json`;\n- guidelines — в `specs/_guidelines/`.",
  "Часть, разделённая на файлы по одному на раздел, хранит свои файлы в своей папке.",
  "В `specs/_guidelines/` собственные guidelines проекта хранятся в `project.json`. В репозитории, где пишутся SpecSheriff guidelines, там же хранятся база — в `spec.json` и описание инструментов — в `tools.json`. Все остальные проекты читают базу и описание инструментов из плагина своего агента (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4).",
  "Схема хранится в `specs/_schema/` репозитория, где пишутся SpecSheriff guidelines. Все остальные проекты читают её из плагина. Схема состоит из файлов:\n- `node.schema.json` — для узла и его метаданных;\n- `section-file.schema.json` — для файла части;\n- `extension.schema.json` — схема расширения.",
  "Расширение схемы, которое добавляет проект (§s-eferktypcj7njt5), хранится в `specs/_schema/project.schema.json`. Оно проверяется по схеме расширения и читается вместе со схемой (§s-xzcw3hv4hmxz7h7). Любой другой файл, который другой проект хранит в `specs/_schema/`, отклоняется как копия схемы.",
  "Одобрения хранятся в `specs/_approvals.jsonl`. Архив удалённых узлов хранится в `specs/_archive/<name>.json`.",
  "`specs/_viewer/` (карта) и `md-version/` (экспорт для чтения) строятся заново после каждого изменения спецификации. Ни то, ни другое не хранится в git.",
  "Инструменты SpecSheriff предоставляют команду `sheriff`. В терминале она запускается как `node <tools>/dist/cli.js` из инструментов, которые плагин хранит на машине (§s-4mej6ccn7xu3d3p). `<tools>` — папка данных плагина для Claude Code или папка `tools/` плагина для Codex CLI в кэше Codex.",
  "Их плагин для pytest, пакет `pytest-specsheriff`, устанавливается через pip из ветки `release`: `pip install \"pytest-specsheriff @ git+https://github.com/non4me/SpecSheriff@release#subdirectory=skills/pytest-specsheriff\"`.",
  "Настройки инструментов SpecSheriff, общие для проекта, хранятся в `sheriff.config.json` в корне репозитория. Настройки запусков рецензента, которые подтверждает каждый пользователь, хранятся в git-конфигурации пользователя (§s-xr5xxa9cxf2mq5u). Настройка `\"writesSpecSheriffGuidelines\": true` отмечает репозиторий, где пишутся SpecSheriff guidelines.",
  "Среди настроек glob-шаблоны указывают, где находится код системы и где находятся её тесты. Код и тесты читаются на SpecTag, а файл, не указанный ни как код, ни как тесты, не читается ни на что. Так конфигурация репозитория, его собственные инструменты и их тесты остаются вне кода системы по тому, где они лежат (§s-hheus6f395ynqvc).",
  "Среди настроек есть и команда, которая запускает каждую проверку и каждый генератор, добавленные собственными guidelines проекта (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze). Для каждого из них настройки содержат и glob-шаблоны, указывающие файлы его кода и его тестов (§s-utf4mbt7ref8g9c).",
  "Документы — это markdown-файлы, которые репозиторий хранит вне `specs/`.",
  "Инструменты спецификации — это файлы инструментов SpecSheriff. Проект хранит только те файлы, которые пишет `sheriff init`. Репозиторий, где пишутся SpecSheriff guidelines, хранит их в `skills/`, где тесты читаются на SpecTag, которые в них объявлены.",
  "В `project.json` находятся:\n- ответственные за спецификацию — те, кого называет её верхний узел;\n- уровни, на которых стоят домены, — элементы `TextRule.list` её правила, уточняющего §s-nkyty4dy9x2v2a4;\n- правило, которое одобряет спецификацию, — её правило, уточняющее §s-qzthyh7yqvfhsa2;\n- файлы, которые хранятся как фикстуры тестов, — те, что указывают glob-шаблоны, перечисленные её правилом, уточняющим §s-6hha5en226aj8hu."
].join("\n\n");

fs.writeFileSync(draftsUrl, JSON.stringify(drafts, null, 2) + "\n");
console.log("proposal revised:", p.parts.length, "parts;", p.refs.length, "links:", p.refs.map((r) => r.type[0] + ":" + r.to).join(" "));
