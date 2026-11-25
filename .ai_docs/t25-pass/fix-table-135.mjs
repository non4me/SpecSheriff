// Table 10.1: the English of the agreed cost cells of rows 10.1.26 and 10.1.26a gets the verb it lacked, after
// EngStickler's readers had read it. The Russian text and the meaning stay the same.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("table-10-1.json", here);
fs.copyFileSync(file, new URL("table-10-1.before-135.json", here));
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
for (const [num, what] of [["10.1.26", "a symbol"], ["10.1.26a", "a test"]]) {
  const r = rows.find((x) => x.num === num);
  const from = `refused; for ${what} that the commit leaves unchanged, as §s-kkbqcb9xrpaepwn says`;
  if (r.cost !== from) throw new Error(`row ${num}: cost not as expected`);
  r.cost = `refused; for ${what} that the commit leaves unchanged, the result is what §s-kkbqcb9xrpaepwn says`;
}
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("ok");
