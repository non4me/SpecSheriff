// Node 1.3.2: the owner's exact wording of 2026-11-17 for the bullet on a draft rule («Правило со статусом черновик не
// реализуется: для него не пишут и не меняют ни код, ни тесты. -> Правило со статусом черновик не требует реализации: для
// него наличие кода и тестов является не обязательным.»), word for word in the Russian of the proposal and by meaning in
// its English. The agent puts to the owner that this wording drops the ban on implementing a draft rule.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-419.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const p = d["1.3.2"].proposals[0];
const swap = (field, from, to) => {
  if (!p[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  p[field] = p[field].replace(from, to);
};
swap("ru", "- Правило со статусом черновик не реализуется: для него не пишут и не меняют ни код, ни тесты.", "- Правило со статусом черновик не требует реализации: для него наличие кода и тестов является не обязательным.");
swap("en", "- A draft rule is not implemented: no code or test is written or changed for it.", "- A draft rule does not require implementation: code and tests for it are optional.");
p.why += " Третий пункт — ваша формулировка от 17 ноября, дословно: «Правило со статусом черновик не требует реализации: для него наличие кода и тестов является не обязательным».";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
