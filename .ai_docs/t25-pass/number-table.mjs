// The owner of 2026-11-11: each check of table 10.1 that stays in the node is named 10.1.1, 10.1.2, … in the order of
// the tables, and is reviewed one at a time as a rule; rows leaving for an extension take no number here.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
let k = 0;
for (const g of t.tables) for (const r of g.rows) r.num = r.fate === "stays" ? `10.1.${++k}` : null;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("numbered", k);
