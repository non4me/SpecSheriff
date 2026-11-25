// Check 10.1.9 is agreed with its proposal (the owner, 2026-11-13 local time, 2026-11-12 UTC: «беру предложение и согласую с ним»).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.9");
const [text] = r.proposals;
r.en = text.en;
r.ru = text.ru;
r.change =
  "Коммит больше не действующее лицо, и проверяются только одобрения, добавленные в коммите. Принято и согласовано вами 2026-11-12.";
delete r.proposals;
r.agreed = "2026-11-12";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, r.en, "| agreed", r.agreed);
