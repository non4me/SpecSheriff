// Check 10.1.11 is agreed in its simpler wording (the owner, 2026-11-13: «да, согласовано»).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.11");
r.agreed = "2026-11-13";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "| agreed", r.agreed);
