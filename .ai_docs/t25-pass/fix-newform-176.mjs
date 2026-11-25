// The owner of 2026-11-10 on 9.4: the sentence on a renamed test starts a new line, a single line break inside the paragraph.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-8ykvuqhvtjh66hj" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "(§s-8xw4mgvpexyvw5q). A test does not count as changed", "(§s-8xw4mgvpexyvw5q).\nA test does not count as changed");
swap("ruText", "(§s-8xw4mgvpexyvw5q). Тест не считается изменённым", "(§s-8xw4mgvpexyvw5q).\nТест не считается изменённым");
b.changes = [...b.changes, "По вашим словам: эта фраза с новой строки."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.ruText);
