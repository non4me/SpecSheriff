// The owner's comment of 2026-11-10 on 9.3, on «из» in «с узлом, из которого он написан»: «для», so «с узлом, для которого он написан»; the English follows,
// "the node it is written for". Only that fragment; 9.5 says the same and is proposed separately.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.3"];
if (b.sidValue !== "s-8xw4mgvpexyvw5q" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("ruText", "связан SpecTag с узлом, из которого он написан,", "связан SpecTag с узлом, для которого он написан,");
swap("text", "carries the SpecTag of the node it is written from,", "carries the SpecTag of the node it is written for,");
b.changes = [...b.changes, "По вашему комментарию: «с узлом, для которого он написан»."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text.split("\n")[0]);
console.log(b.ruText.split("\n")[0]);
