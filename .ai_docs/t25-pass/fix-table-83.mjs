// Check 10.1.24 is agreed in the proposed wording (the owner, 2026-11-13: «принято и согласовано»). Its English was read
// once in that wording and needs no fix.
// Check 10.1.25 in the new form: its approved words as the text, with their Russian, what it affects, its test, the
// Russian of tools 7.1.20, and one whole proposed wording. The meaning stays; the words follow agreed 2.4 ("SpecSheriff,
// where they are written"), "other than" replaces the archaic "but", and "keeps" replaces "holds", whose Russian
// rendering «держит» read awkwardly.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

const a = rows.find((x) => x.num === "10.1.24");
a.en = "Every rule of a project's own guidelines refines or extends a rule of the SpecSheriff guidelines";
a.ru = "Каждое правило собственных guidelines проекта уточняет или расширяет правило SpecSheriff guidelines";
a.change =
  "Вы приняли формулировку (2026-11-13): «реализует» → «расширяет». Собственные guidelines проекта никогда не реализуют SpecSheriff guidelines (ваше решение от 2026-11-08); " +
  "«уточняет или расширяет» — слова согласованного 2.3, оба случая обозначает одна связь `refines` (ваше решение от 2026-11-11).";
delete a.proposals;
a.agreed = "2026-11-13";

const r = rows.find((x) => x.num === "10.1.25");
r.ru = "Ни один проект, кроме того, в котором пишутся SpecSheriff guidelines, не держит их копии или копии их схемы";
r.change = "Одобренная формулировка не менялась. Изменение — в предложенной формулировке.";
r.about =
  "Затрагивает каждый проект, кроме самого SpecSheriff. Проект пользуется SpecSheriff guidelines и их схемой из плагина SpecSheriff и не хранит их копий (правило 2.4). " +
  "Копией инструменты считают `spec.json` и `tools.json` в `specs/_guidelines/` и любой файл в `specs/_schema/`, кроме `project.schema.json`. " +
  "Копия, изменённая в одном проекте, стала бы второй версией guidelines, которую не читает никто из их авторов.";
r.tests = ["unit/validate.test.ts: refuses, outside the repository the SpecSheriff guidelines are written in, a copy of them or of their schema"];
t.toolsRu["s-6bmnsbskg6en4nf"] = {
  title: "Никаких копий SpecSheriff guidelines",
  text:
    "`sheriff validate` отклоняет копию SpecSheriff guidelines или их схемы вне репозитория, в котором они пишутся. Копия — это:\n\n" +
    "- `spec.json` или `tools.json` в `specs/_guidelines/`;\n- любой файл в `specs/_schema/`, кроме `project.schema.json`.",
  reason: "У этого узла нет обоснования — пробел, допишем на шаге инструментов.",
};
r.proposals = [
  {
    en: "No project other than SpecSheriff, where the SpecSheriff guidelines are written, keeps a copy of them or of their schema",
    ru: "Ни один проект, кроме SpecSheriff, где пишутся SpecSheriff guidelines, не хранит их копию или копию их схемы",
    why:
      "Смысл прежний. «кроме того, в котором пишутся» → «кроме SpecSheriff, где пишутся» — слова согласованного 2.4. «держит» → «хранит»: «держит копию» звучит криво. " +
      "В английском «but» в значении «кроме» заменено на «other than», как в согласованной 10.1.22.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(a.num, "| agreed |", a.en);
console.log(r.num, "| proposal:", r.proposals[0].en);
