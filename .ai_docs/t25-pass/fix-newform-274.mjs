// Node 12.2.5: the owner agreed to the proposal of fix-newform-271.mjs and fix-newform-273.mjs (2026-11-14,
// «согласовано»), so the node is agreed in that wording.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.2.5"];
const p = n.proposals[0];
const part = (s, head, next) => {
  const from = s.indexOf(head);
  const to = next ? s.indexOf(next) : s.length;
  if (from < 0 || to < 0) throw new Error("12.2.5 proposal does not split at " + head);
  return s.slice(from + head.length, to).replace(/\n+$/, "");
};
n.title = part(p.en, "Title: ", "\n\nText: ");
n.text = part(p.en, "Text: ", "\n\nReason: ");
n.reason = part(p.en, "Reason: ");
n.ruTitle = part(p.ru, "Заголовок: ", "\n\nТекст: ");
n.ruText = part(p.ru, "Текст: ", "\n\nОбоснование: ");
n.ruReason = part(p.ru, "Обоснование: ");
delete n.proposals;
n.agreed = "2026-11-14";
n.changes.push(
  "Вы согласовали новую формулировку (2026-11-14): узел, который опирается на утверждение другого домена, содержит связь с узлом, который это утверждает; связь любого типа, в любой раздел этого домена; требование назвать связывающий узел в `meta.todos` убрано.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.2.5 agreed:", n.title);
