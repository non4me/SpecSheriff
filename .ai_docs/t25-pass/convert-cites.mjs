// Turns every citation of a draft by its new number, §[n], into a citation by sid, §<sid>, in every
// field of newform.json, as a rule cites (the owner, 2026-11-07: links go to the sid, never to the
// location). Run after assign-sids.mjs; a §[n] naming no draft throws.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
let count = 0;
const conv = s => s.replace(/§\[([0-9.]+)\]/g, (_, n) => {
  if (!d[n] || !d[n].sidValue) throw new Error(`§[${n}] names no draft with a sid`);
  count++;
  return "§" + d[n].sidValue;
});
for (const v of Object.values(d)) for (const f of ["title", "text", "reason", "ruTitle", "ruText", "ruReason"]) if (typeof v[f] === "string") v[f] = conv(v[f]);
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(`citations converted: ${count}; left: ${(JSON.stringify(d).match(/§\[/g) || []).length}`);
