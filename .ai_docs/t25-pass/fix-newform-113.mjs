// The owner, 2026-11-10: the name NodeKind goes, since it says nothing by itself and no rule explains it; "a project's own kind",
// «собственного вида в проекте». A technical replacement in agreed 6.1, the agreement kept. The others are shown at their turn.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));

const swap = (k, field, from, to) => {
  if (!d[k][field].includes(from)) throw new Error(`${k}.${field}: no "${from}"`);
  d[k][field] = d[k][field].replaceAll(from, to);
};
const EN = ["a project's own NodeKind", "a project's own kind"];
const RU = ["собственного NodeKind проекта", "собственного вида в проекте"];

for (const k of ["6.1", "11.4", "11.5", "13.12"]) {
  swap(k, "text", ...EN);
  swap(k, "ruText", ...RU);
}

swap("10.1", "text", "the values its NodeKind adds beside them", "the values its kind adds beside them");
swap("10.1", "ruText", "которые его NodeKind добавляет к ним", "которые его вид добавляет к ним");

swap("8.3", "title", "Whether a project's own NodeKind needs code", "Whether a project's own kind of node needs code");
swap("8.3", "ruTitle", ...RU);
swap("8.3", "text", ...EN);
swap("8.3", "text", "lists each such NodeKind with", "lists each such kind with");
swap("8.3", "ruText", ...RU);
swap("8.3", "ruText", "перечисляет каждый такой NodeKind и", "перечисляет каждый такой вид и");
swap("8.3", "reason", "Most NodeKinds a project adds", "Most kinds of node a project adds");
swap("8.3", "reason", "a NodeKind that needs no code", "a kind of node that needs no code");
swap("8.3", "ruReason", "Большинство NodeKind, которые добавляет проект, — это ещё один вид требований", "Большинство видов узлов, которые добавляет проект, — это ещё одна разновидность требований");
swap("8.3", "ruReason", "NodeKind, которому код не нужен", "Вид узлов, которому код не нужен");

for (const [k, n] of Object.entries(d))
  for (const f of ["title", "text", "reason", "ruTitle", "ruText", "ruReason"])
    if (typeof n[f] === "string" && n[f].includes("NodeKind")) throw new Error(`left in ${k}.${f}`);

const note = "«NodeKind» заменён по вашему решению: имя нигде не объяснено. Стало «a project's own kind», «собственный вид в проекте».";
for (const k of ["6.1", "8.3", "10.1", "11.4", "11.5", "13.12"]) d[k].changes = [...(d[k].changes ?? []), note];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("replaced");
