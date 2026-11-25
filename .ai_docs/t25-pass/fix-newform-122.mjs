// The owner's comment of 2026-11-10 on 8.3, on the fragment «Расширение схемы проекта»: «Расширение схемы и guidelines проекта». Their words go in verbatim.
// Read as two things, the project's extension of the schema and the project's own guidelines, since agreed 14.1.1 reserves "extension of the guidelines"
// for what the plugin delivers, so the verb follows into the plural.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.3"];
if (b.sidValue !== "s-vsh384ybt4w25a2") throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("ruText", "Расширение схемы проекта (§s-xm8rz4uupb73gu5) объявляет", "Расширение схемы и guidelines проекта (§s-xm8rz4uupb73gu5) объявляют");
swap("text", "A project's extension of the schema (§s-xm8rz4uupb73gu5) declares,", "A project's extension of the schema and its own guidelines (§s-xm8rz4uupb73gu5) declare,");
b.changes = [...b.changes, "Выделенное вами начало первого предложения заменено вашими словами: «Расширение схемы и guidelines проекта». Прочитано как две вещи, расширение схемы и собственные guidelines проекта, поэтому глагол во множественном числе: «объявляют»."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);

const cited = Object.entries(d).find(([, v]) => v && v.sidValue === "s-xm8rz4uupb73gu5");
console.log(`\n--- cited: ${cited?.[0]} ${cited?.[1].agreed ? "agreed" : "not agreed"}: ${cited?.[1].title}\n${cited?.[1].text}`);
