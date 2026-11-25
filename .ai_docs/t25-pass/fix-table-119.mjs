// Table 10.1, under the owner's decisions of 2026-11-16: the check on the `overrides` link goes, since an extension no
// longer changes a rule of the SpecSheriff guidelines (1.7.2); and the rows that move into an extension name it by its
// new section (11 Domains, 12 RecordType, 13 Generation of code from the nodes, 14 Adoption of an existing project).
// The note on 10.12 that spoke of an `overrides` link is brought up to date as well.
import fs from "node:fs";

const file = new URL("table-10-1.json", import.meta.url);
fs.copyFileSync(file, new URL("table-10-1.before-119.json", import.meta.url));
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const fates = {
  "to 12.3 Domains": "to 12 RecordType",
  "to 12.2 Domains": "to 11.1 Domains",
  "to 12.4 Domains": "to 11.2 Domains",
  "to 12.6 Adoption": "to 14 Adoption",
  "to 12.5 Generation": "to 13 Generation",
};
let removed = 0, moved = 0;
for (const tb of t.tables)
  for (const r of tb.rows) {
    if (r.n === 67) {
      r.fate = "deleted";
      r.change = "Уходит по вашему решению от 16 ноября: расширение больше не меняет правил SpecSheriff guidelines, только добавляет и уточняет (1.7.2), и связи `overrides` нет.";
      removed++;
    } else if (fates[r.fate]) {
      r.fate = fates[r.fate];
      moved++;
    }
  }
if (removed !== 1) throw new Error("row 67 not found");
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");

const nf = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(nf, "utf8"));
const n = d["10.12"];
const i = n.changes.findIndex((c) => c.includes("связью `overrides`"));
if (i < 0) throw new Error("note on 10.12 not found");
n.changes[i] = "Ушли «unless it waits for them (§s-qyjw8xez6t6adc3)» и «unless it waits»: правило guidelines не называет расширений (согласованный 1.7.3). Ожидание сгенерированного кода (13.1) с этим правилом пока расходится; решим у раздела 13, потому что расширение больше не меняет правил guidelines (1.7.2, 16 ноября).";
fs.writeFileSync(nf, JSON.stringify(d, null, 2) + "\n");
console.log("row 67 deleted;", moved, "rows renamed to their new sections; note on 10.12 updated");
