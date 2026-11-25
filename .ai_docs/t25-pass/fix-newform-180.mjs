// The owner of 2026-11-10 on 9.4: «связывают с ним SpecTag» → «связывают с ним, используя SpecTag» (the comma added); the English follows, "is bound to it using a SpecTag".
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
swap("ruText", "и связывают с ним SpecTag (§s-8xw4mgvpexyvw5q).", "и связывают с ним, используя SpecTag (§s-8xw4mgvpexyvw5q).");
swap("text", "and carries that node's SpecTag (§s-8xw4mgvpexyvw5q).", "and is bound to it using a SpecTag (§s-8xw4mgvpexyvw5q).");
b.changes = [...b.changes, "По вашим словам: «связывают с ним, используя SpecTag»; запятая добавлена."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text.split("\n")[0]);
console.log(b.ruText.split("\n")[0]);
