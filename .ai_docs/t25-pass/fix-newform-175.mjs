// The owner of 2026-11-10 on 9.4: «Тест не меняется» → «Тест не считается изменённым», "A test does not count as changed".
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
swap("text", "A test does not change where only its name changes", "A test does not count as changed where only its name changes");
swap("ruText", "Тест не меняется, если меняется только его название", "Тест не считается изменённым, если меняется только его название");
const last = b.changes.length - 1;
b.changes[last] = "По вашим словам: тест не считается изменённым, если меняется только его название, а SpecTag по-прежнему называет тот же узел. Обоснование вслед за этим.";
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
