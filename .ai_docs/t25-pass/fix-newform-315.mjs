// Node 12.3.4, agreed: the owner agreed to it on 2026-11-14 («согласовано»), in the wording that fix-newform-309.mjs,
// fix-newform-310.mjs and fix-newform-312.mjs to fix-newform-314.mjs wrote: a domain outputs and writes to its store only
// data records that conform to their RecordType, and the generated RuntimeCheck refuses any other.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.4"];
n.agreed = "2026-11-14";
n.changes.push("Вы согласовали эту формулировку 14 ноября («согласовано»).");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.3.4 agreed:", n.title);
