// The owner of 2026-11-10 on 9.2: «Так же и у каждого одобренного узла собственного типа в проекте» → «То же самое распространяется и на каждый одобренный узел
// собственного типа…», the rest of the sentence as it stood; the English follows, "The same holds for every approved node…".
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.2"];
if (b.sidValue !== "s-6fw72j65jkqrfpf" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "So must every approved node of a project's own kind that requires an implementation in code", "The same holds for every approved node of a project's own kind that requires an implementation in code");
swap("ruText", "Так же и у каждого одобренного узла собственного типа в проекте, которому требуется имплементация кода", "То же самое распространяется и на каждый одобренный узел собственного типа в проекте, которому требуется имплементация кода");
b.changes = [...b.changes, "По вашим словам: «То же самое распространяется и на каждый одобренный узел собственного типа…»."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text.split("\n")[0]);
console.log(b.ruText.split("\n")[0]);
