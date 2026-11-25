// The owner's comment of 2026-11-10 on 8.3, on the sentence «Тест узла, которому нужен код, пишется раньше его кода.»:
// the order of test and code is regulated by another rule, so here it is superfluous. The sentence added by fix-newform-118.mjs goes.
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
swap("text", " The test of a node that needs code is written before its code.\n\n", "\n\n");
swap("ruText", " Тест узла, которому нужен код, пишется раньше его кода.\n\n", "\n\n");

const before = b.changes.length;
b.changes = b.changes.filter((c) => !c.startsWith("Вместо убранного предложения своими словами"));
if (b.changes.length !== before - 1) throw new Error("the change line on the added sentence was not found");
b.changes = [...b.changes, "Предложение о том, что тест пишется раньше кода, убрано по вашему комментарию: порядок теста и кода регулируется другим правилом."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);

for (const k of ["1.4.1", "11.4"]) {
  const n = d[k];
  console.log(`\n--- ${k} ${n?.agreed ? "agreed" : "not agreed"}: ${n?.title}\n${n?.text}\n${n?.ruText}`);
}
