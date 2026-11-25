// The owner, 2026-11-10, on 8.2: NodeKind says nothing by itself and is explained nowhere earlier in the guidelines, so the node says
// a kind of the project's own. "Kind" of the owner's "type or kind", since agreed 5.2 says "its own kinds of node" and the types are
// those of links, fields and RecordTypes. Only 8.2 changes here.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.2"];
if (b.sidValue !== "s-pctqj9wqaq8762t") throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (!b[field].includes(from)) throw new Error(`no "${from}" in ${field}`);
  b[field] = b[field].replace(from, to);
};
swap("text", "- a node of a project's own NodeKind the section holds;", "- a node of a project's own kind that the section holds;");
swap("reason", "nodes of a project's own NodeKind or sections", "nodes of a project's own kind or sections");
swap("ruText", "- узел собственного NodeKind проекта, который раздел содержит;", "- узел собственного вида в проекте, содержащийся в разделе;");
swap("ruReason", "узлы собственного NodeKind проекта или разделы", "узлы собственного вида в проекте или разделы");
b.changes.push("«NodeKind» заменён по вашему слову: имя нигде не объяснено. Было «a project's own NodeKind», «собственного NodeKind проекта». Стало «a project's own kind», «собственного вида в проекте».");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
