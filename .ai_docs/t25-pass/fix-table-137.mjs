// Table 10.1: the owner accepted on 2026-11-17 («принимаю») the proposals of fix-table-136.mjs. The proposals for rows
// 10.1.26, 10.1.28a, 10.1.34, 10.1.41 and 10.1.42 are written into the rows, and the new row 10.1.26b is marked agreed.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("table-10-1.json", here);
fs.copyFileSync(file, new URL("table-10-1.before-137.json", here));
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
for (const num of ["10.1.26", "10.1.28a", "10.1.34", "10.1.41", "10.1.42"]) {
  const r = rows.find((x) => x.num === num);
  if (!r || !r.proposals || r.proposals.length !== 1) throw new Error(`row ${num} has no single proposal`);
  r.en = r.proposals[0].en;
  r.ru = r.proposals[0].ru;
  delete r.proposals;
  r.change = `${r.change ?? ""} 17 ноября вы приняли правку под 1.5.2 («принимаю»): «код, который привязывает SpecTag» вместо «символа».`.trim();
  r.agreed = "2026-11-17";
}
const nr = rows.find((x) => x.num === "10.1.26b");
if (!nr) throw new Error("row 10.1.26b not found");
nr.agreed = "2026-11-17";
nr.change = `${nr.change} Вы согласовали её 17 ноября («принимаю»).`;
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("ok");
