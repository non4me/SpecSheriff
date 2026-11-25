// After swap-nodes.mjs 1.3.6 1.3.7 and 1.3.7 1.3.8, by the reviewer of 2026-11-10: 1.3.5 what an approval covers, 1.3.6 an agent approves in an owner's name,
// 1.3.7 who may withdraw an approval, 1.3.8 how a section's approval status is built, the most particular. The notes naming the old numbers follow.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const [g, w, s] = [d["1.3.6"], d["1.3.7"], d["1.3.8"]];
if (g.sidValue !== "s-t5uw8zfxzhfdg86" || w.sidValue !== "s-fpq35tf3pehgk64" || s.sidValue !== "s-9kfdycuq34beqvs") throw new Error("unexpected order");
g.changes = g.changes.map((c) => c.replace("это говорит 1.3.8", "это говорит 1.3.7"));
s.changes = [...s.changes, "Стоит последним в 1.3: он самый частный."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("1.3.5–1.3.8:", ["1.3.5", "1.3.6", "1.3.7", "1.3.8"].map((k) => d[k].title).join(" | "));
