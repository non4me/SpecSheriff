// The owner's comment of 2026-11-10 on 8.4, on the sentence about `schema`: «с новой строки». A text breaks only between paragraphs, so the sentence opens one.
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
swap("ruText", "(§s-xm8rz4uupb73gu5). Посредством `schema`", "(§s-xm8rz4uupb73gu5).\n\nПосредством `schema`");
swap("text", "(§s-xm8rz4uupb73gu5). Through its `schema`", "(§s-xm8rz4uupb73gu5).\n\nThrough its `schema`");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.ruText.split("\n\n").slice(0, 2).join("\n---\n"));
