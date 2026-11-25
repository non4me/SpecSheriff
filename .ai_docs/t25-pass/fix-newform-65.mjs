// Node 4.4: the owner's comment of 2026-11-09 joined the first two sentences of the text. «Описания», in the plural, agrees
// with their «каждое из них»; the English follows.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["4.4"];

const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error("not found: " + from);
  n[field] = n[field].replace(from, to);
};
swap("text", "The section of the technical debt holds rules alone. Each of them describes one problem of the system's implementation as it stands.", "The section of the technical debt holds only descriptions, and each of them describes one problem of the system's implementation as it stands.");
swap("ruText", "Раздел технического долга содержит только правила. Каждое из них описывает одну проблему реализации системы такой, какая она есть.", "Раздел технического долга содержит только описания, и каждое из них описывает одну проблему реализации системы такой, какая она есть.");
n.changes.push("Первая фраза — ваша формулировка, по комментарию на странице.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n\n")[0]);
