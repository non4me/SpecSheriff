// Node 12.2.1, agreed: its title follows the owner's new title of section 12.2, "Domains: decomposition" («Домены:
// декомпозиция»), on the owner's instruction of 2026-11-14 («да, приведи»). The title changes from "The division of the
// specification" to "Decomposition of the specification"; nothing else in the node changes.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.2.1"];
n.title = "Decomposition of the specification";
n.ruTitle = "Декомпозиция спецификации";
n.changes.push("Заголовок приведён к новому названию раздела 12.2 «Домены: декомпозиция», по вашему решению (2026-11-14): «Декомпозиция спецификации» вместо «Деление спецификации».");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.2.1 title:", n.title, "|", n.ruTitle);
