// Node 3.4 "RecordType": the reviewer's wording fix of the English of the owner's fourth paragraph, since "its" could
// point at the other domain. The Russian, the owner's own, stays as it is.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];

const from = "only if its header names, in its `consumes` links,";
if (!n.text.includes(from)) throw new Error("not found: " + from);
n.text = n.text.replace(from, "only if its own header names, in its `consumes` links,");
n.changes.push("Абзац 4, только английский текст: \"its own header\", чтобы \"its\" нельзя было отнести к другому домену. Правка рецензента.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n\n")[3]);
