// The owner of 2026-11-12: «применяй все предлагаемые значения для правильных формулировок английского — статус узлов
// при этом не меняй». Applies every English fix in english-review.json but those the agent judged no error, to the
// drafts of the new form and to the table of checks; the Russian and every node's agreement stay as they are. A draft
// field kept from spec.json ("=X.Y") is written out in full with the fix. Prints each fix it could not place.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const drafts = read("newform.json");
const table = read("table-10-1.json");
const review = read("english-review.json");
const spec = read("../../specs/_guidelines/spec.json");
const present = {};
(function walk(ns) { for (const n of ns) { present[n.location.replace("_guidelines/spec/", "=")] = n; if (n.children) walk(n.children); } })(spec.nodes);
const rows = Object.fromEntries(table.tables.flatMap((g) => g.rows).filter((r) => r.num).map((r) => [r.num, r]));

const failed = [];
let applied = 0;
const replaceIn = (obj, key, f) => {
  let v = obj[key];
  if (typeof v === "string" && v.startsWith("=")) v = present[v]?.[key] ?? v;
  if (typeof v !== "string" || !v.includes(f.was)) return false;
  obj[key] = v.replace(f.was, f.proposed);
  return true;
};
for (const f of review.findings) {
  if (f.verdict === "drop") continue;
  let ok = false;
  if (f.num === "10.1 (head)") ok = replaceIn(table.head, f.field, f);
  else if (rows[f.num]) {
    const r = rows[f.num];
    if (f.field === "text") ok = replaceIn(r, "en", f);
    else if (f.field === "onFailure") ok = replaceIn(r, "cost", f);
    else if (f.field === "reason") ok = replaceIn(r, "reason", f);
    else if (f.field === "proposals") ok = (r.proposals ?? []).some((p) => replaceIn(p, "en", f));
  } else if (drafts[f.num]) {
    const d = drafts[f.num];
    if (f.field === "examples") ok = (d.examples ?? []).some((_, i) => replaceIn(d.examples, i, f));
    else ok = replaceIn(d, f.field, f);
  }
  if (ok) { applied++; f.applied = true; } else failed.push(`${f.num} ${f.field}: ${f.was}`);
}
fs.writeFileSync(new URL("newform.json", here), JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("table-10-1.json", here), JSON.stringify(table, null, 2) + "\n");
fs.writeFileSync(new URL("english-review.json", here), JSON.stringify(review, null, 2) + "\n");
console.log("applied", applied, "failed", failed.length);
for (const x of failed) console.log("  NOT PLACED:", x);
