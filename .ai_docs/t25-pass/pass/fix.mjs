// Applies the fixes a meaning review asked for to the outputs of the pass: each fix replaces one exact
// string in one field of one node, and fails loudly where the string is not found exactly once.
// Usage: node fix.mjs <fixes.json>   where fixes.json is [{ group, sid, field, from, to }]
import fs from "node:fs";
const dir = "D:/SpecSheriff/.ai_docs/t25-pass/pass";
const fixes = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const outs = new Map();
let failed = 0;
for (const f of fixes) {
  if (!outs.has(f.group)) outs.set(f.group, JSON.parse(fs.readFileSync(`${dir}/${f.group}.out.json`, "utf8")));
  const node = outs.get(f.group)[f.sid];
  const value = node?.[f.field] ?? "";
  const count = value.split(f.from).length - 1;
  if (count !== 1) { console.log(`FAILED ${f.group} ${f.sid} ${f.field}: found ${count} times: ${f.from.slice(0, 60)}`); failed++; continue; }
  node[f.field] = value.replace(f.from, () => f.to);
  node.changed = true;
  console.log(`fixed ${f.group} ${f.sid} ${f.field}`);
}
for (const [g, data] of outs) fs.writeFileSync(`${dir}/${g}.out.json`, JSON.stringify(data, null, 2) + "\n");
if (failed) process.exit(1);
