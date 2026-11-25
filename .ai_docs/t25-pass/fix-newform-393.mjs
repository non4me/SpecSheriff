// The TableRule 7.2.4 and its cell nodes 7.2.4.1 to 7.2.4.5, agreed by the owner on 2026-11-16 («я уже согласовал все
// узлы внутри таблицы»): fixes to the English alone, after EngStickler's readers read the head and its table; the
// Russian, and so the agreed meaning, does not change.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-393.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const swap = (o, f, a, b) => {
  if (!o[f].includes(a)) throw new Error(`not found in ${f}: ${a.slice(0, 60)}`);
  o[f] = o[f].replace(a, b);
};
const h = d["7.2.4"];
swap(h, "text", "- a concept of the subject area, such as", "- a concept from the subject area, such as");
swap(h, "text", "- a concept of the guidelines, such as", "- a concept from the guidelines, such as");
swap(h, "text", "Its last two columns are examples and require nothing.", "Its last two columns hold examples, which require nothing.");
swap(h, "reason", "only where the name means the same thing in all of them.", "only if the name means the same thing in all of them.");
h.table.columns[3].en = "The mistake closest to that case";
const row = (i, k, a, b) => { const c = h.table.rows[i][k]; if (!c.en.includes(a)) throw new Error("cell: " + a); c.en = c.en.replace(a, b); };
row(1, 3, "userData, which says only whose the data are.", "userData, which says only whose data they are.");
swap(d["7.2.4.2"], "text", "says what its entity is, by how the entity is used or by what it holds.", "says what the named entity is, in terms of how the entity is used or what it holds.");
swap(d["7.2.4.3"], "text", "only when it is joined with what it applies to.", "only when it is combined with what it applies to.");
swap(d["7.2.4.4"], "text", "also names the object that the property belongs to, using only these forms:", "also names the object that the property belongs to, in one of these forms only:");
swap(d["7.2.4.4"], "text", "A property gets a name of its own only where", "A property is given a name of its own only where");
swap(d["7.2.4.5"], "text", "keeps the name of each and states the relation in words.", "keeps the name of each and states the relation in ordinary words.");
for (const k of ["7.2.4", "7.2.4.2", "7.2.4.3", "7.2.4.4", "7.2.4.5"]) d[k].changes.push("После согласования, по замечаниям читателей EngStickler, поправлен только английский; русский текст и смысл не изменились.");
for (const k of ["7.2.4.1", "7.2.4.2", "7.2.4.3", "7.2.4.4", "7.2.4.5"]) d[k].agreed = "2026-11-16";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
