// The owner of 2026-11-11 on 9.4: the first sentence is theirs, «Изменение SpecTag считается изменением
// самого теста или кода, в котором он присутствует» (their «считаются» brought to agree with «изменение»,
// «присутсвует» spelled right, a comma before «в котором»).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-9j2mmnuuwmx5ksn" || b.agreed) throw new Error("unexpected 9.4");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "A change to the SpecTag of a test or of a symbol is a change to that test or that code.", "A change to a SpecTag counts as a change to the test or the code in which it is present.");
swap("ruText", "Изменение SpecTag теста или символа — это изменение самого теста или кода.", "Изменение SpecTag считается изменением самого теста или кода, в котором он присутствует.");
b.changes.push("Первая фраза текста — ваша, дословно: «Изменение SpecTag считается изменением самого теста или кода, в котором он присутствует». Исправлены только «считаются» на «считается», «присутсвует» на «присутствует» и добавлена запятая перед «в котором».");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text + "\n" + b.ruText);
