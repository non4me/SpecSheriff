// The owner's comment of 2026-11-07 on the title of "What the specification governs": it speaks of
// the guidelines, not of the whole specification, and it stands before the node on the base
// (swapped by swap-nodes.mjs 1.1.3 1.1.4).
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.1.3"];
if (n.from !== "1.13") throw new Error("1.1.3 is not the present 1.13");
n.title = "What the guidelines govern";
n.ruTitle = "Что регулируют guidelines";
n.changes = [
  "Заголовок — по вашему комментарию: речь здесь не о всей спецификации, а только о guidelines.",
  "Стоит перед узлом о базе, по вашему комментарию: части идут в том же порядке, что и в 1.1.2.",
  "Текст и обоснование — нынешний 1.13, дословно.",
];
d["1.1.4"].changes = d["1.1.4"].changes.filter(c => !c.startsWith("Стоит")).concat("Стоит после узла о guidelines, по вашему комментарию.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.title, "|", n.ruTitle);
