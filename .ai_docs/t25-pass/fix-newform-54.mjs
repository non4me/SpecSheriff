// Node 13.1.1: the owner's comment on the page replaced «только удлиняют то» by «только увеличивает объем того», the verb
// agreeing with its subject «Правила»; the English follows.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["13.1.1"];

const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error("not found: " + from);
  n[field] = n[field].replace(from, to);
};
swap("ruReason", "только удлиняют то, что читает его агент", "только увеличивают объём того, что читает его агент");
swap("reason", "only lengthen what its agent reads", "only increase the volume of what its agent reads");
n.changes.push("Обоснование: «только увеличивают объём того, что читает его агент», по вашему комментарию.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.reason);
console.log(n.ruReason);
