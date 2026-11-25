// Lists, for the split nodes named on the command line, the page rows they go to and their present
// title, text and reason from spec.json.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const h = fs.readFileSync(new URL("base-structure.html", here), "utf8");
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
const olds = process.argv.slice(2);

const present = {};
(function walk(ns) {
  for (const n of ns) {
    present[n.location.replace("_guidelines/spec/", "")] = n;
    if (n.children) walk(n.children);
  }
})(spec.nodes);

const rows = [];
for (const line of h.split("\n")) {
  const t = line.trim();
  if (!/^\["[0-9.]+","(split|part|move|same|new)"/.test(t)) continue;
  rows.push(JSON.parse(t.replace(/,$/, "")));
}

for (const o of olds) {
  const p = present[o];
  console.log(`\n=== ${o} ${p.sid} [${p.kind}] ${p.title}`);
  for (const r of rows.filter(r => r[3] === o)) console.log(`  -> ${r[0]} ${r[1]} | ${r[4]} | ${r[5]}`);
  console.log("TEXT:\n" + p.text + "\nREASON:\n" + p.reason);
  if (p.list) console.log("LIST:", JSON.stringify(p.list));
}
