// The owner's comment of 2026-11-10 on 8.3, on the fragment «нужен ли узлам этого типа код»: «требуется ли его имплементация». Their words go in verbatim
// and only in that fragment, in the English as well, since the Russian is a reading of it. The other places saying "need code" are put to them separately.
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
swap("ruText", "нужен ли узлам этого типа код.", "требуется ли его имплементация.");
swap("text", "whether the nodes of that kind need code.", "whether its implementation is required.");
b.changes = [...b.changes, "Выделенный вами фрагмент заменён вашими словами. Было «нужен ли узлам этого типа код», \"whether the nodes of that kind need code\". Стало «требуется ли его имплементация», \"whether its implementation is required\"."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);

let total = 0;
for (const v of Object.values(d)) {
  if (v && typeof v === "object") for (const f of ["ruText", "ruReason"]) if (typeof v[f] === "string") total += (v[f].match(/реализ/gi) ?? []).length;
}
console.log("«реализ…» in the Russian readings:", total);
