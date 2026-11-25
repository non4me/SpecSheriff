// The owner of 2026-11-10 on 8.4: the last sentence of the first paragraph, on `needsCode`, also starts a new line inside the paragraph.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.4"];
if (b.sidValue !== "s-hhnahzmhahf8jht") throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("ruText", "SpecSheriff guidelines. `needsCode` типа узлов", "SpecSheriff guidelines.\n`needsCode` типа узлов");
swap("text", "for every node. A kind's `needsCode`", "for every node.\nA kind's `needsCode`");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.ruText.split("\n\n")[0]);
console.log(b.text.split("\n\n").length, "paragraphs");
