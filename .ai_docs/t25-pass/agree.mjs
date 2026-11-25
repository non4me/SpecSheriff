// Marks drafts the owner agreed to in their new form: node agree.mjs <date> <n>... It is approved by
// `npx sheriff approve` once it stands in spec.json with that wording; a later change to the draft
// takes the mark off again, by hand, since agreement covers one wording only.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const [date, ...nodes] = process.argv.slice(2);
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("the first argument is the date");
for (const n of nodes) {
  if (!d[n]) throw new Error(`no draft ${n}`);
  d[n].agreed = date;
}
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("agreed:", nodes.join(" "));
