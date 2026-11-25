// Check 10.1.7 is agreed with its proposal (the owner, 2026-11-12: «беру и согласовано»).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.7");
const [text] = r.proposals;
r.en = text.en;
r.ru = text.ru;
r.change =
  "«Of the specification» добавлено: удалённый термин лежит в архиве, и новый термин может взять его имя. Принято и согласовано вами 2026-11-12.";
delete r.proposals;
r.agreed = "2026-11-12";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, r.en, "| agreed", r.agreed);
