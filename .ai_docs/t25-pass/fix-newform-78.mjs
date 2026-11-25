// The owner, 2026-11-09, on the node on citations: say outright where the link must stand. The base names no key of a file, and
// the links are not the metadata, so the sentence says "the node's list of links".
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const node = d["6.3"];
const swap = (field, a, b) => { if (!node[field].includes(a)) throw new Error("missing: " + a); node[field] = node[field].replace(a, b); };
swap("text", "every other node it cites. A node cites", "every other node it cites. The link stands in the node's list of links, apart from the citation. A node cites");
swap("ruText", "на который он ссылается. Узел ссылается", "на который он ссылается. Эта связь стоит в списке связей узла, отдельно от самой ссылки. Узел ссылается");
node.changes = [...node.changes, "По вашему предложению добавлена фраза, что связь стоит в списке связей узла, отдельно от самой ссылки."];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(node.text.split("\n")[0]);
