// Table 10.1: the owner accepted on 2026-11-17 («ок») the proposal of fix-table-139.mjs for the cost cell of row 10.1.44.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("table-10-1.json", here);
fs.copyFileSync(file, new URL("table-10-1.before-140.json", here));
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.44");
if (!r || !r.proposals || r.proposals.length !== 1) throw new Error("row 10.1.44 has no single proposal");
r.cost = "the push is refused while the specification is approved, where the project's own guidelines name a push as the place where the tests run";
r.ruCost = "push отклоняется, пока спецификация одобрена, если собственные guidelines проекта называют push местом запуска тестов";
delete r.proposals;
r.change = `${r.change ?? ""} 17 ноября вы приняли правку под 1.6.1 («ок»): push отклоняется, только если guidelines проекта называют push местом запуска тестов.`.trim();
r.agreed = "2026-11-17";
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("ok");
