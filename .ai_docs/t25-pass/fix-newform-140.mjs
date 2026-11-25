// The owner of 2026-11-10 on 8.4's sentence on `needsCode`: «можно уточнить там - имплементация кода». Their words go in: «требуется ли его узлам имплементация кода».
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
swap("ruText", "`needsCode` типа узлов говорит, требуется ли имплементация его узлов.", "`needsCode` типа узлов говорит, требуется ли его узлам имплементация кода.");
swap("text", "A kind's `needsCode` says whether the implementation of its nodes is required.", "A kind's `needsCode` says whether its nodes require an implementation in code.");
b.changes = [...b.changes, "По вашему уточнению: «требуется ли его узлам имплементация кода»."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.ruText.split("\n\n")[0]);
console.log(b.text.split("\n\n")[0]);
