// The reviewer of 2026-11-10 on 8.3: the cited node 5.2 concerns only the extension of the schema, so the citation stands beside it,
// which also fixes the reading of the owner's words as two things. English "its own" gave way to "the project's own", since a later "its" competed with it.
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
swap("text", "A project's extension of the schema and its own guidelines (§s-xm8rz4uupb73gu5) declare,", "A project's extension of the schema (§s-xm8rz4uupb73gu5) and the project's own guidelines declare,");
swap("ruText", "Расширение схемы и guidelines проекта (§s-xm8rz4uupb73gu5) объявляют", "Расширение схемы (§s-xm8rz4uupb73gu5) и guidelines проекта объявляют");
b.changes = [...b.changes, "Ссылка перенесена к расширению схемы: она подтверждает только его. Ваши слова не изменились."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
