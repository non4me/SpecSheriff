// The owner of 2026-11-11 on 9.4: the title did not match the node's meaning, which turns on whether the
// SpecTag changes; of the options put, they chose "A change to a SpecTag" / «Изменение SpecTag».
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-9j2mmnuuwmx5ksn" || b.agreed) throw new Error("unexpected 9.4");

b.title = "A change to a SpecTag";
b.ruTitle = "Изменение SpecTag";
b.changes = b.changes.map((c) => (c.startsWith("Заголовок новый") ? "Заголовок новый, выбран вами: «A change to a SpecTag» / «Изменение SpecTag». Обе фразы узла решают одно — меняется SpecTag или остаётся прежним." : c));
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.title + " / " + b.ruTitle);
