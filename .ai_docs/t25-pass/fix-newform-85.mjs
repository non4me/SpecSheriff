// The owner, 2026-11-09, on 2.5: a section is deleted outright only when nothing is left in it. "Node" rather than "rule", since
// a section also holds terms and sections.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["2.5"];
if (n.sidValue !== "s-f2b5zvc565s242f") throw new Error("2.5 is another node");
const swap = (field, a, b) => { if (!n[field].includes(a)) throw new Error("missing: " + a); n[field] = n[field].replace(a, b); };
swap("text", "A section is deleted outright, whatever cited it.", "A section with no node left in it is deleted outright, whatever cited it.");
swap("ruText", "Раздел удаляется окончательно, что бы на него ни ссылалось.", "Раздел, в котором не осталось ни одного узла, удаляется окончательно, что бы на него ни ссылалось.");
n.changes = [...n.changes, "По вашему замечанию уточнено, что раздел удаляется окончательно, когда в нём не осталось ни одного узла."];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n\n")[1]);
