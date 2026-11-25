// The owner's comment of 2026-11-09 on node 3.4 "RecordType": both uses of "стоит" read "объявляется".
// The English follows. The owner's own edit dictates the word, so the agreement question stays with them.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

n.text = swap(n.text, "A RecordType stands in the domain that first provides it.", "A RecordType is declared in the domain that first provides it.");
n.text = swap(n.text, "the section holding that RecordType.", "the section where that RecordType is declared.");
n.ruText = swap(n.ruText, "RecordType стоит в домене, который первым его предоставляет.", "RecordType объявляется в домене, который первым его предоставляет.");
n.ruText = swap(n.ruText, "раздел, в котором стоит этот RecordType.", "раздел, в котором объявляется этот RecordType.");
n.changes = n.changes.map(c => c.replace("RecordType стоит в домене, который первым", "RecordType объявляется в домене, который первым"));
n.changes.push("По вашему комментарию «стоит» заменено на «объявляется» в обоих местах, английский текст изменён вместе с русским.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
console.log("---");
console.log(n.ruText);
console.log("---");
console.log(n.reason);
console.log("---");
console.log(n.ruReason);
