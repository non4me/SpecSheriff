// The owner of 2026-11-10 on 8.4: the sentence on `schema` starts a new line by a single line break, the paragraph stays, its sentences forming one group.
// They were told a Markdown export shows a single line break as a space.
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
swap("ruText", "(§s-xm8rz4uupb73gu5).\n\nПосредством `schema`", "(§s-xm8rz4uupb73gu5).\nПосредством `schema`");
swap("text", "(§s-xm8rz4uupb73gu5).\n\nThrough its `schema`", "(§s-xm8rz4uupb73gu5).\nThrough its `schema`");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(JSON.stringify(b.ruText.slice(0, 130)));
console.log(b.text.split("\n\n").length, "paragraphs");
