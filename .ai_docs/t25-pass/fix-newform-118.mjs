// The reviewer of 2026-11-10 on the removal in 8.3: of what stood behind the reference, only the order of test and code for a project's own
// kinds is held nowhere else (agreed 1.4.1 says "a rule"), so it is stated here in plain words. No node defines "the check of lists".
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.3"];
if (b.sidValue !== "s-vsh384ybt4w25a2") throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (!b[field].includes(from)) throw new Error(`${field}: no "${from}"`);
  b[field] = b[field].replace(from, to);
};
swap("text", "whether the nodes of that kind need code.\n\n", "whether the nodes of that kind need code. The test of a node that needs code is written before its code.\n\n");
swap("ruText", "нужен ли узлам этого типа код.\n\n", "нужен ли узлам этого типа код. Тест узла, которому нужен код, пишется раньше его кода.\n\n");
swap("text", "The check of lists compares the list with it (§s-jau82aq9juv9zzh).", "At each commit, a check compares that list with that extension (§s-jau82aq9juv9zzh).");
swap("ruText", "Проверка списков сравнивает с ним этот список (§s-jau82aq9juv9zzh).", "При каждом коммите проверка сравнивает этот список с этим расширением (§s-jau82aq9juv9zzh).");
b.changes = [...b.changes, "Вместо убранного предложения своими словами сказано то единственное, чего нет в других правилах: тест узла, которому нужен код, пишется раньше кода."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
