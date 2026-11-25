// Splits the lists of changes of the drafts and of the rows of the three tables of checks into batches, from which reader
// agents extract the owner's rulings as `meta.decisions` in English. Writes decisions-in-<n>.json.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const nf = JSON.parse(fs.readFileSync(new URL("newform.json", here), "utf8"));
const items = [];
for (const [loc, d] of Object.entries(nf)) {
  if (loc === "10.1") continue;
  items.push({ location: loc, sid: d.sidValue ?? `(the sid of present ${d.from})`, title: d.title, decisionsAlready: d.decisions ?? [], changes: d.changes ?? [] });
}
for (const f of ["table-10-1.json", "table-11-3.json", "table-12-12.json"]) {
  const t = JSON.parse(fs.readFileSync(new URL(f, here), "utf8"));
  items.push({ location: `head of ${f.replace(".json", "")}`, sid: t.head.sid, title: t.head.title, decisionsAlready: t.head.decisions ?? [], changes: Array.isArray(t.head.changes) ? t.head.changes : [t.head.changes].filter(Boolean) });
  for (const r of t.tables.flatMap(g => g.rows)) {
    if (r.fate === "deleted" || /^to /.test(r.fate ?? "")) continue;
    items.push({ location: `row ${r.num ?? "(unnumbered)"} of ${f.replace(".json", "")}`, sid: "(a new sid for the row's check)", title: r.en.slice(0, 120), decisionsAlready: r.decisions ?? [], changes: [r.change].filter(Boolean) });
  }
}
const n = 4;
const size = Math.ceil(items.length / n);
for (let i = 0; i < n; i++) fs.writeFileSync(new URL(`decisions-in-${i + 1}.json`, here), JSON.stringify(items.slice(i * size, (i + 1) * size), null, 2) + "\n");
console.log(items.length, "items in", n, "batches of up to", size);
