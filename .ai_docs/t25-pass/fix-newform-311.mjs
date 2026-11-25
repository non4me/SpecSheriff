// Node 12.3.3, agreed: the owner agreed to it on 2026-11-14 («ок»), in the wording that fix-newform-309.mjs and
// fix-newform-310.mjs wrote: types and RuntimeChecks are generated from the RecordTypes.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.3"];
n.agreed = "2026-11-14";
n.changes.push("Вы согласовали эту формулировку 14 ноября («ок»).");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.3.3 agreed:", n.title);
