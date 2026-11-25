// Revises the proposed wording of "Where the files are" (s-zefk589ykh37b8u) after the owner's remarks of 2026-11-21:
// the files that every project shares get a second table, with their paths in the plugin and in the repository where
// the SpecSheriff guidelines are written; the entries of the specification's approval status and of its `strict` flag
// are kept in `sheriff.config.json`; the row for `specs/_approvals.jsonl` stays until T28.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsUrl = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(draftsUrl, "utf8"));
const sid = "s-zefk589ykh37b8u";
const draft = drafts[sid];
const p = draft.proposal;
if (!p.reviewed.startsWith("specsheriff-rule-reviewer, 2026-11-21: passed")) throw new Error("unexpected state");

function compose(parts, lang) {
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    const q = parts[i];
    const v = q[lang];
    if (q.kind === "th") out.push(`| ${v.join(" | ")} |\n|${v.map(() => "---").join("|")}|`);
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
const first = (q) => (Array.isArray(q.en) ? q.en[0] : q.en);
const at = (start) => {
  const i = p.parts.findIndex((q) => first(q).startsWith(start));
  if (i < 0) throw new Error("part not found: " + start);
  return i;
};

// The rows of the files that the plugin carries leave the first table, and so do the entries in `specs/_status.jsonl`.
for (const start of ["The SpecSheriff guidelines, each extension", "The schema of the SpecSheriff guidelines", "The schema of each extension",
  "The entries that set the specification's approval status"]) p.parts.splice(at(start), 1);

const approvals = p.parts[at("The approvals")];
approvals.change = "Без изменений по смыслу. По вашему решению строка остаётся до задачи T28, которая перенесёт одобрения в сами узлы и уберёт эту строку.";

const settings = p.parts[at("The settings of the SpecSheriff tools")];
settings.en[0] = "The settings of the SpecSheriff tools that the project shares, among them the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2), and the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g)";
settings.ru[0] = "Настройки инструментов SpecSheriff, общие для всего проекта, среди них записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2) и её флаг `strict` (§s-q3pfzyaxvpr2zj2), и расширения guidelines, выбранные проектом (§s-9ttvcwpqkehm58g)";
settings.change = "Путь прежний. По вашему решению здесь же хранятся записи статуса одобрения спецификации и флага `strict`, рядом с выбранными расширениями: правило 1.7.5 требует записывать выбор расширений в конфигурацию репозитория. Что ещё содержит этот файл, говорит отдельный новый узел, который я покажу после этого.";

// The last paragraph gives way to the second table.
p.parts.splice(at("Only the repository where the SpecSheriff guidelines are written"), 1);
const name = "`<name>`";
p.parts.push(
  {
    kind: "p",
    en: "The files that every project shares come with the SpecSheriff tools that the plugin keeps on the machine (§s-4mej6ccn7xu3d3p). The tools find each of these files at the path in the second column below, relative to the folder that holds the running tools. The repository where the SpecSheriff guidelines are written keeps these files at the path in the third column, relative to its root, and its tools read them there:",
    ru: "Файлы, общие для всех проектов, приходят вместе с инструментами SpecSheriff, которые плагин хранит на машине (§s-4mej6ccn7xu3d3p). Инструменты находят каждый из этих файлов по пути во втором столбце ниже, относительно папки, в которой лежат запущенные инструменты. Репозиторий, где пишутся SpecSheriff guidelines, хранит эти файлы по пути в третьем столбце, относительно своего корня, и его инструменты читают их там:",
    change: "Новое, по вашему замечанию. Каждая установка из маркетплейса кладёт плагин в своё место, поэтому путь дан от папки инструментов, которую они находят по своему расположению. Пути в `specs/` верны только для репозитория SpecSheriff. Этот абзац и таблица под ним заменили прежний последний абзац."
  },
  { kind: "th", en: ["What is kept", "Path in the plugin", "Path in the repository where the SpecSheriff guidelines are written"],
    ru: ["Что хранится", "Путь в плагине", "Путь в репозитории, где пишутся SpecSheriff guidelines"],
    change: "Вторая таблица: файлы, которые несёт плагин." },
  { kind: "tr", en: ["The SpecSheriff guidelines", "`guidelines/spec.json`", "`specs/_guidelines/spec.json`"],
    ru: ["SpecSheriff guidelines", "`guidelines/spec.json`", "`specs/_guidelines/spec.json`"],
    change: "Путь в плагине назван впервые. Сборка инструментов уже кладёт этот файл туда." },
  { kind: "tr", en: ["Each extension of the guidelines (§s-mbmnsnxenmavu3z)", `\`guidelines/extensions/<name>.json\``, `\`specs/_guidelines/extensions/<name>.json\``],
    ru: ["Каждое расширение guidelines (§s-mbmnsnxenmavu3z)", `\`guidelines/extensions/<name>.json\``, `\`specs/_guidelines/extensions/<name>.json\``],
    change: "Файлы расширений guidelines, по вашему решению: каждое расширение — в своём файле. Путь в плагине выбран мной по образцу `guidelines/spec.json`." },
  { kind: "tr", en: ["The appendix of the tools (§s-a4rbry4hsu34hy8)", "`guidelines/tools.json`", "`specs/_guidelines/tools.json`"],
    ru: ["Описание инструментов (§s-a4rbry4hsu34hy8)", "`guidelines/tools.json`", "`specs/_guidelines/tools.json`"],
    change: "Путь в плагине назван впервые. Сборка инструментов уже кладёт этот файл туда." },
  { kind: "tr", en: ["The schema of the SpecSheriff guidelines (§s-eferktypcj7njt5): `node.schema.json` for a node, `section-file.schema.json` for the file of a part of the specification, `archive-file.schema.json` for a file of the archive, `config.schema.json` for `sheriff.config.json`, and `extension.schema.json` for an extension of the schema, whether an extension of the guidelines or the project adds it", "`guidelines/_schema/`", "`specs/_schema/`"],
    ru: ["Схема SpecSheriff guidelines (§s-eferktypcj7njt5): `node.schema.json` — для узла, `section-file.schema.json` — для файла части спецификации, `archive-file.schema.json` — для файла архива, `config.schema.json` — для `sheriff.config.json`, `extension.schema.json` — для расширения схемы, которое добавляет расширение guidelines или проект", "`guidelines/_schema/`", "`specs/_schema/`"],
    change: "Путь в плагине назван впервые; сборка уже кладёт схему туда. `status.schema.json` заменён на `config.schema.json`, схему самого `sheriff.config.json`: по вашему решению от 17 ноября значение флага `strict` по умолчанию задаёт только схема. Имя файла выбрано мной." },
  { kind: "tr", en: ["The schema of each extension of the guidelines that has one", `\`guidelines/_schema/extensions/<name>.schema.json\``, `\`specs/_schema/extensions/<name>.schema.json\``],
    ru: ["Схема каждого расширения guidelines, у которого она есть", `\`guidelines/_schema/extensions/<name>.schema.json\``, `\`specs/_schema/extensions/<name>.schema.json\``],
    change: "Путь в плагине выбран мной по образцу схемы guidelines." },
  {
    kind: "p",
    en: `${name} is the name of the extension, the one under which \`sheriff.config.json\` lists the extension once the project has chosen it. No other project keeps a copy of these files (§s-6bmnsbskg6en4nf).`,
    ru: `${name} — имя расширения, под которым \`sheriff.config.json\` указывает расширение, когда проект его выбрал. Ни один другой проект не хранит копию этих файлов (§s-6bmnsbskg6en4nf).`,
    change: "`<name>` пояснён один раз, под таблицей. Ссылка ведёт на узел, который отклоняет копию этих файлов в любом другом проекте: так дубликата не бывает."
  }
);

p.reason = "The SpecSheriff tools find the files of every project at the same paths, so no setting has to say where a file is kept. A person or an agent finds each file at the same path in any project. The tools find the files that every project shares from their own folder, because each installation puts the plugin in a different place.";
p.ruReason = "Инструменты SpecSheriff находят файлы любого проекта по одним и тем же путям, поэтому ни одна настройка не должна указывать, где лежит файл. Человек или агент находит каждый файл по тому же пути в любом проекте. Файлы, общие для всех проектов, инструменты находят от своей папки, потому что каждая установка кладёт плагин в своё место.";
p.reasonChange = "Новое: у узла не было обоснования. Третье предложение добавлено вместе со второй таблицей.";

p.removed = p.removed.map((r) => r.replace("его заменили записи ответственных в `specs/_status.jsonl`.", "его заменили записи ответственных в `sheriff.config.json`."));
p.removed.push(
  "Строка о `specs/_status.jsonl`: по вашему решению записи статуса одобрения спецификации и флага `strict` хранятся в `sheriff.config.json`, рядом с выбранными расширениями.",
  "Последний абзац о том, что guidelines и схему хранит только репозиторий SpecSheriff: его заменила вторая таблица с путями в плагине."
);

p.text = compose(p.parts, "en");
p.ruText = compose(p.parts, "ru");
p.reviewed = "pending: revised after the owner's remarks of 2026-11-21";

const implementsSet = ["s-k73czmpkazcx7mu", "s-eferktypcj7njt5", "s-f2b5zvc565s242f", "s-a4rbry4hsu34hy8", "s-67vekyup7y8smap",
  "s-qzthyh7yqvfhsa2", "s-q3pfzyaxvpr2zj2", "s-9ttvcwpqkehm58g", "s-kgbzk2ph9e6jfb4", "s-vj7ercem526zd6v"];
const cited = [...new Set([...`${p.text}\n${p.reason}`.matchAll(/§(s-[2-9a-hjkmnp-z]{15})/g)].map((m) => m[1]))];
p.refs = [
  ...implementsSet.map((to) => ({ type: "implements", to })),
  ...cited.filter((to) => !implementsSet.includes(to)).map((to) => ({ type: "cites", to }))
];

draft.rulings = draft.rulings || [];
draft.rulings.push({
  date: "2026-11-21",
  problem: "The proposal gave the paths of the SpecSheriff guidelines and their schema under `specs/` as if every project kept them, kept the entries of the specification's approval status and of its `strict` flag in a file of their own, and listed `specs/_approvals.jsonl`, which T28 is to replace.",
  ruling: "The owner: the schema of the SpecSheriff guidelines is kept in the plugin's folder, and only the repository where it is written keeps it under `specs/`; the entries of the specification's approval status and of its `strict` flag are kept in `sheriff.config.json`; the row for `specs/_approvals.jsonl` stays until T28."
});

fs.writeFileSync(draftsUrl, JSON.stringify(drafts, null, 2) + "\n");
console.log("proposal revised:", p.parts.length, "parts;", p.refs.length, "links:", p.refs.map((r) => r.type[0] + ":" + r.to).join(" "));
