// Applies specsheriff-rule-reviewer's report on the revised "Where the files are" (s-zefk589ykh37b8u): the paths in
// the plugin counted from the folder of the tools, the closing sentence on copies replaced by a citation, the
// approvals named as those of nodes, the project's extension of the schema cited, a new reason, the files of the
// technical appendix restored as the approved wording and the code have them, and `config.schema.json` in a row of
// its own, since rule 5.1 limits the schema of the guidelines to the specification's nodes and files.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsUrl = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(draftsUrl, "utf8"));
const sid = "s-zefk589ykh37b8u";
const draft = drafts[sid];
const p = draft.proposal;
if (!p.reviewed.startsWith("pending: revised after the owner's remarks")) throw new Error("unexpected state");

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

const domain = p.parts[at("Each domain")];
domain.en[1] = "`specs/<domain>/`, where `<domain>` is the domain's name, which is neither `stack` nor `debt` nor the name of any other directory that this table names under `specs/`";
domain.ru[1] = "`specs/<domain>/`, где `<domain>` — имя домена; это не `stack`, не `debt` и не имя другой папки в `specs/`, которую называет эта таблица";
domain.change += " Добавлено, что домен не называется `stack` или `debt`: иначе файл его раздела технического приложения совпал бы с файлом стека или технического долга.";

// The technical appendix: one row for each kind of section that rule 4.1 lists, with the file the code expects.
const tech = at("The technical appendix");
p.parts.splice(tech, 1,
  { kind: "tr", en: ["The section of the technical appendix (§s-vj7ercem526zd6v) that implements a domain, if the project has chosen the Domains extension", "`specs/tech/<domain>.json`"],
    ru: ["Раздел технического приложения (§s-vj7ercem526zd6v), который реализует домен, если проект выбрал расширение Domains", "`specs/tech/<domain>.json`"],
    change: "Восстановлено из согласованной формулировки: раздел домена — в `<domain>.json`. По этому имени `sheriff validate` сопоставляет файл приложения с доменом (узел «A file of the technical appendix named after a domain»). В прошлой редакции я заменил это на «каждый другой раздел — в файле с любым другим именем», и это было ошибкой: правило 4.1 других разделов не знает." },
  { kind: "tr", en: ["The section of the technical appendix that implements the base specification, if the project has not chosen the Domains extension", "`specs/tech/base.json`"],
    ru: ["Раздел технического приложения, который реализует базовую спецификацию, если проект не выбрал расширение Domains", "`specs/tech/base.json`"],
    change: "Новое: без расширения Domains базовая спецификация лежит в `specs/base/`, и её раздел приложения назван так же. Имя выбрано мной." },
  { kind: "tr", en: ["The section of the technical appendix for the stack", "`specs/tech/stack.json`"],
    ru: ["Раздел технического приложения о стеке", "`specs/tech/stack.json`"],
    change: "Путь прежний, теперь в своей строке." },
  { kind: "tr", en: ["The technical debt", "`specs/tech/debt.json`"],
    ru: ["Технический долг", "`specs/tech/debt.json`"],
    change: "Путь прежний, теперь в своей строке." }
);

const projectSchema = p.parts[at("The project's extension of the schema")];
projectSchema.en[0] = "The project's extension of the schema (§s-xm8rz4uupb73gu5)";
projectSchema.ru[0] = "Расширение схемы, которое добавляет проект (§s-xm8rz4uupb73gu5)";

const approvals = p.parts[at("The approvals")];
approvals.en[0] = "The approvals of nodes (§s-67vekyup7y8smap)";
approvals.ru[0] = "Одобрения узлов (§s-67vekyup7y8smap)";
approvals.change = "Было «Одобрения»: теперь в той же таблице есть и записи статуса одобрения спецификации, поэтому сказано, чьи это одобрения. По вашему решению строка остаётся до задачи T28, которая перенесёт одобрения в сами узлы и уберёт эту строку.";

const shared = p.parts[at("The files that every project shares")];
shared.en = "The files that every project shares come with the SpecSheriff tools that a plugin keeps on the machine (§s-4mej6ccn7xu3d3p). The tools find each of these files at the path in the second column below, relative to their own folder, the one that holds their `dist/`. Only the repository where the SpecSheriff guidelines are written keeps these files under `specs/`, each at the path in the third column (§s-6bmnsbskg6en4nf). In that repository, the tools read the files there:";
shared.ru = "Файлы, общие для всех проектов, приходят вместе с инструментами SpecSheriff, которые плагин хранит на машине (§s-4mej6ccn7xu3d3p). Инструменты находят каждый из этих файлов по пути во втором столбце ниже, относительно своей папки — той, где лежит их `dist/`. Только репозиторий, где пишутся SpecSheriff guidelines, хранит эти файлы в `specs/`, каждый — по пути в третьем столбце (§s-6bmnsbskg6en4nf). В этом репозитории инструменты читают файлы там:";
shared.change = "Новое, по вашему замечанию. Каждая установка из маркетплейса кладёт плагин в своё место, поэтому путь дан от папки самих инструментов: они находят её по своему расположению. Пути в `specs/` есть только в репозитории SpecSheriff, а копию в другом проекте отклоняет узел «No copy of the SpecSheriff guidelines». Этот абзац и таблица под ним заменили прежний последний абзац.";

const th = p.parts[p.parts.findIndex((q) => q.kind === "th" && q.en.length === 3)];
th.en[1] = "Path in the folder of the tools";
th.ru[1] = "Путь в папке инструментов";

const schema = p.parts[at("The schema of the SpecSheriff guidelines")];
schema.en[0] = "The schema of the SpecSheriff guidelines (§s-eferktypcj7njt5): `node.schema.json` for a node, `section-file.schema.json` for the file of a part of the specification, `archive-file.schema.json` for a file of the archive, and `extension.schema.json` for an extension of the schema, whether an extension of the guidelines or the project adds it";
schema.ru[0] = "Схема SpecSheriff guidelines (§s-eferktypcj7njt5): `node.schema.json` — для узла, `section-file.schema.json` — для файла части спецификации, `archive-file.schema.json` — для файла архива, `extension.schema.json` — для расширения схемы, которое добавляет расширение guidelines или проект";
schema.change = "Путь в папке инструментов назван впервые; сборка уже кладёт схему туда. Добавлен `archive-file.schema.json`, по которому проверяется архив. Уточнено, что `extension.schema.json` проверяет любое расширение схемы, а не только то, которое добавляет проект.";
p.parts.splice(at("The schema of the SpecSheriff guidelines") + 1, 0,
  { kind: "tr", en: ["The schema of `sheriff.config.json`, which sets the default value of the `strict` flag (§s-q3pfzyaxvpr2zj2)", "`guidelines/_schema/config.schema.json`", "`specs/_schema/config.schema.json`"],
    ru: ["Схема `sheriff.config.json`, которая задаёт значение флага `strict` по умолчанию (§s-q3pfzyaxvpr2zj2)", "`guidelines/_schema/config.schema.json`", "`specs/_schema/config.schema.json`"],
    change: "Новое, вместо `status.schema.json`: по вашему решению от 17 ноября значение флага `strict` по умолчанию задаёт только схема. Это отдельная строка, потому что правило 5.1 относит к схеме guidelines только схему узлов и файлов спецификации. Имя файла выбрано мной." });

const closing = p.parts[p.parts.length - 1];
closing.en = "`<name>` is the name of the extension, the one under which `sheriff.config.json` lists the extension once the project has chosen it.";
closing.ru = "`<name>` — имя расширения, под которым `sheriff.config.json` указывает расширение, когда проект его выбрал.";
closing.change = "`<name>` пояснён один раз, под таблицей.";

p.reason = "The SpecSheriff tools find every file without a setting that says where it is kept, whatever the project and wherever an installation has put the plugin. A person or an agent who knows where a file is kept in one project finds it in any other.";
p.ruReason = "Инструменты SpecSheriff находят каждый файл без настройки, указывающей, где он лежит, в каком бы проекте они ни работали и куда бы установка ни положила плагин. Человек или агент, знающий, где лежит файл в одном проекте, находит его в любом другом.";
p.reasonChange = "Новое: у узла не было обоснования. Оно объясняет обе таблицы.";

p.text = compose(p.parts, "en");
p.ruText = compose(p.parts, "ru");
p.reviewed = "specsheriff-rule-reviewer, 2026-11-21: passed after the fixes of its third report";

const implementsSet = ["s-k73czmpkazcx7mu", "s-eferktypcj7njt5", "s-f2b5zvc565s242f", "s-a4rbry4hsu34hy8", "s-67vekyup7y8smap",
  "s-qzthyh7yqvfhsa2", "s-q3pfzyaxvpr2zj2", "s-9ttvcwpqkehm58g", "s-kgbzk2ph9e6jfb4", "s-vj7ercem526zd6v"];
const cited = [...new Set([...`${p.text}\n${p.reason}`.matchAll(/§(s-[2-9a-hjkmnp-z]{15})/g)].map((m) => m[1]))];
p.refs = [
  ...implementsSet.map((to) => ({ type: "implements", to })),
  ...cited.filter((to) => !implementsSet.includes(to)).map((to) => ({ type: "cites", to }))
];

fs.writeFileSync(draftsUrl, JSON.stringify(drafts, null, 2) + "\n");
console.log("proposal revised:", p.parts.length, "parts;", p.refs.length, "links:", p.refs.map((r) => r.type[0] + ":" + r.to).join(" "));
