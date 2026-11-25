// Table 10.1: the owner agreed on 2026-11-17 («ок») to the three changes of fix-table-133.mjs. The proposals for the cost of
// rows 10.1.26 and 10.1.26a are written into the rows, and the new row 10.1.27a is marked agreed.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("table-10-1.json", here);
fs.copyFileSync(file, new URL("table-10-1.before-134.json", here));
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const T95 = "s-kkbqcb9xrpaepwn";
for (const [num, what, ruWhat] of [["10.1.26", "a symbol", "символа"], ["10.1.26a", "a test", "теста"]]) {
  const r = rows.find((x) => x.num === num);
  if (!r || !r.proposals) throw new Error(`row ${num} has no proposal`);
  r.cost = `refused; for ${what} that the commit leaves unchanged, as §${T95} says`;
  r.ruCost = `отклоняется; для ${ruWhat}, который коммит не меняет, — как говорит §${T95}`;
  delete r.proposals;
  r.change = `${r.change} 17 ноября вы согласовали новую цену («ок»): для кода, который коммит не меняет, — как говорит 9.5.`;
  r.agreed = "2026-11-17";
}
const r27a = rows.find((x) => x.num === "10.1.27a");
if (!r27a) throw new Error("row 10.1.27a not found");
r27a.agreed = "2026-11-17";
r27a.change = `${r27a.change} Вы согласовали её 17 ноября («ок»).`;
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("ok");
