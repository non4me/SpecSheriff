// The owner of 2026-11-10 on 9.2: «Реализующее правило может реализовывать его напрямую или через цепочку правил, в которой каждое реализует предыдущее» →
// their «Правило также может быть реализовано через цепочку связанных с ним правил», with the link named, since "linked" alone would count a `cites` or a
// `refines` too, and with "or such a node", as the sentence before it says.
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
swap("text", "The implementing rule may implement it directly or through rules that implement those in turn.", "Such a rule or node may also be implemented through a chain of rules linked to it by `implements` links.");
swap("ruText", "Реализующее правило может реализовывать его напрямую или через цепочку правил, в которой каждое реализует предыдущее.", "Правило или такой узел также могут быть реализованы через цепочку правил, связанных с ними связями `implements`.");
b.changes = [...b.changes, "По вашим словам: «Правило или такой узел также могут быть реализованы через цепочку правил, связанных с ними связями `implements`». Связь названа, иначе засчитывались бы и `cites`, и `refines`."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text.split("\n\n")[1]);
console.log(b.ruText.split("\n\n")[1]);
