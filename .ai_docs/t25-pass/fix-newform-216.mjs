// The owner of 2026-11-11 on agreed 6.1: its list of link types gains `overrides`, which agreed 12.1.2 has an
// extension's node hold; the line is the owner's chosen wording, so 6.1 stays agreed, now as of this day.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["6.1"];
if (b.sidValue !== "s-sn6au3vcr9uy5pm") throw new Error("unexpected 6.1");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
const ex = "- `exempts` — the linking node exempts the linked rule, or every rule under the linked section, from being implemented (§s-gf6n8ge4mke3pr2).";
swap("text", ex, ex + "\n- `overrides` — the linking node, of an extension, changes the linked main rule in a project using that extension (§s-e6stjaxkn44ys4m).");
const ruEx = "- `exempts` — связывающий узел освобождает от реализации связанное правило или каждое правило под связанным разделом (§s-gf6n8ge4mke3pr2).";
swap("ruText", ruEx, ruEx + "\n- `overrides` — связывающий узел расширения изменяет связанное основное правило в проекте, который использует это расширение (§s-e6stjaxkn44ys4m).");
b.changes.push("По вашему решению от 11 ноября в список типов связей добавлен `overrides`, которым узел расширения меняет основное правило (согласованный 12.1.2). При переносе 6.1 получит связь cites на s-e6stjaxkn44ys4m, а на шаге инструментов тип войдёт в перечень схемы.");
b.agreed = "2026-11-11";
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
