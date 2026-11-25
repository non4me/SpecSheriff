// The owner of 2026-11-10: 8.3 says what 8.4 says, «указать, требуется ли его узлам имплементация кода»; then both nodes are agreed.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.3"];
if (b.sidValue !== "s-vsh384ybt4w25a2") throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("ruText", "указать, требуется ли его имплементация.", "указать, требуется ли его узлам имплементация кода.");
swap("text", "state whether its implementation is required.", "state whether its nodes require an implementation in code.");
b.changes = [...b.changes, "По вашему решению конец первого абзаца говорит то же, что 8.4: «требуется ли его узлам имплементация кода»."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
