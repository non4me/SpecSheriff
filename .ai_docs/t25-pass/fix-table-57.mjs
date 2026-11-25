// Check 10.1.14 of the table of checks, in the new form: what it touches, its test, and one proposal like those of the
// agreed 10.1.3 to 10.1.13. Its English already says "except in" in place of "outside", following the agreed Russian;
// that needs no proposal.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.14");
r.about =
  "Затрагивает каждую ссылку `§` в узле спецификации, за которой стоит не sid, а расположение. Расположение меняется, когда узлы переставляют, и такая ссылка указала бы на другой узел; " +
  "поэтому ссылаются только по sid (правило 1.2.2). Внутри обратных кавычек, то есть в тексте, процитированном как код, такая запись допустима: узел может показать, как выглядит отклоняемая ссылка.";
r.tests = ["unit/validate.test.ts: refuses a node citing another by its location"];
r.proposals = [
  {
    en: "No node of the specification cites another by its location except in text quoted as code",
    ru: "Ни один узел спецификации не ссылается на другой по его расположению вне текста, процитированного как код",
    why:
      "Как в согласованных 10.1.3–10.1.13. Архивный узел хранит свою последнюю формулировку как есть, и править её ради этой проверки никто не будет. Инструменты и сейчас читают ссылки только в узлах спецификации.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.14 proposals:", r.proposals.length);
