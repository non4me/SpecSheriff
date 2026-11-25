// Check 10.1.18 is agreed (the owner, 2026-11-13: «ок»), as shown: "Every section contains at least one rule" | refused,
// no proposal, "contains" in place of "holds", as agreed 8.1 says.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.18");
r.agreed = "2026-11-13";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "| agreed", r.agreed);
