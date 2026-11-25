// The first group of the table of checks is renamed (the owner, 2026-11-12: «да, переименовываем»): "The specification
// alone" / «Только спецификация», beside "The specification and the code". The rows under it stay agreed, since the owner
// accepted the change.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const g = t.tables[0];
if (g.heading !== "The specification on its own") throw new Error("the first group's heading has changed");
g.heading = "The specification alone";
g.ruHeading = "Только спецификация";
const h = t.head.groups[0];
h.en = "The specification alone";
h.ru = "Только спецификация";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(g.heading, "|", g.ruHeading);
