// The owner, 2026-11-10, on 7.8: the ban on a general word holds for a field used apart from its object, the boundary the skill
// spec-review gives; a field written through its named object is covered by the next paragraph.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["7.8"];
if (n.sidValue !== "s-9w3u3wn37wksyxd") throw new Error("7.8 is another node");
const swap = (field, a, b) => { if (!n[field].includes(a)) throw new Error("missing: " + a); n[field] = n[field].replace(a, b); };
swap("text", "— a term, a field —", "— a term, a field used apart from its object —");
swap("ruText", "— термин, поле —", "— термин, поле, используемое отдельно от своего объекта, —");
n.changes = [...n.changes, "По вашему решению запрет на общее слово относится к полю, используемому отдельно от своего объекта."];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n")[0]);
