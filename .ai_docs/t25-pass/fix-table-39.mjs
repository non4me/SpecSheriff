// Check 10.1.6 of the table of checks, in the new form: what it touches, its test, and one proposal. Its English was
// already brought into line with the agreed Russian ("is in the contracts section" in place of "stands in contracts"),
// which needs no proposal. Like the agreed 10.1.3 and 10.1.5, the proposal speaks of the nodes of the specification: an
// archived term node is in the archive, not in the contracts section.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.6");
r.about =
  "Затрагивает каждый узел-термин спецификации: он должен стоять в разделе contracts. Термин определяется один раз, в contracts (правило 3.2); " +
  "узел-термин в другом разделе значил бы, что этот раздел вводит свои слова.";
r.tests = ["unit/validate.test.ts: refuses a term node standing outside contracts"];
r.proposals = [
  {
    en: "Every term node of the specification is in the contracts section",
    ru: "Каждый узел термина в спецификации находится в contracts",
    why:
      "Как в согласованных 10.1.3 и 10.1.5. Архивный узел-термин лежит в архиве, а не в contracts; без слов «в спецификации» проверка охватывала бы и его. " +
      "Инструменты и сейчас проверяют только узлы спецификации (validate.ts).",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.6 proposals:", r.proposals.length);
