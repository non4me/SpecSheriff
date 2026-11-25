// The owner of 2026-11-11 on the row of table 10.1 on a project's own guidelines: "refines or extends", as agreed 2.3
// says, so a link type `extends` is owed (agreed 6.1, the schema and the tools), taken up at 6.1's turn after 10.1.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((r) => r.n === 42);
if (!r || !/project's own guidelines refines/.test(r.en)) throw new Error("unexpected row");
r.en = "Every rule of a project's own guidelines refines or extends a rule of the SpecSheriff guidelines";
r.ru = "Каждое правило собственных guidelines проекта уточняет или расширяет правило SpecSheriff guidelines";
r.change = "Ушло «или реализует»: по вашему решению от 8 ноября guidelines проекта никогда не реализуют SpecSheriff guidelines. По вашему решению от 11 ноября — «уточняет или расширяет», как в согласованном 2.3; для этого нужен тип связи `extends` в 6.1, в схеме и в инструментах.";
t.doubts = [];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.en);
