// Node 3.4 "RecordType": the first paragraph of the text is the owner's wording of 2026-11-09, word for word in
// Russian with its spelling put right; the English follows it.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

n.text = swap(n.text, "A RecordType (§s-6eb92ddch7shuvu) is the format of the data domains pass to one another or keep in a store. A domain uses it in its API.", "A RecordType (§s-6eb92ddch7shuvu) is a format of data. Domains use a RecordType in their API for passing data to the next domain and for storage.");
n.ruText = swap(n.ruText, "RecordType (§s-6eb92ddch7shuvu) — это формат данных, которые домены передают друг другу или держат в хранилище. Его домен использует в своём API.", "RecordType (§s-6eb92ddch7shuvu) — это формат данных. Домены используют RecordType в своём API для передачи данных следующему домену и для хранения.");
n.changes.push("Абзац 1 — ваша формулировка, дословно; английский текст следует за ней.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n\n")[0]);
console.log("---");
console.log(n.ruText.split("\n\n")[0]);
