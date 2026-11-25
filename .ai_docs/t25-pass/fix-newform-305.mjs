// Node 12.3.2: the owner agreed to the proposal on 2026-11-14 («Принято»), in the wording that fix-newform-300.mjs to
// fix-newform-304.mjs wrote. The node takes that wording, and the proposal is cleared.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.2"];
const p = n.proposals[0];
const part = (s, head, next) => {
  const from = s.indexOf(head);
  const to = next ? s.indexOf(next) : s.length;
  if (from < 0 || to < 0) throw new Error("12.3.2 proposal does not split at " + head);
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
  "Вы согласовали новую формулировку (2026-11-14): узел ссылается на 12.3.1 вместо собственного определения RecordType и перечисляет, что содержит RecordType; пункт о записи с полем, которого нет в RecordType, убран; условие на несколько полей записывается отдельным правилом со связью с RecordType.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
const t = d["12.3.3"];
console.log("12.3.2 agreed.\n--- 12.3.3:", t.sidValue, t.agreed || "", "\n" + t.title + "\n" + t.text + "\nWHY: " + t.reason + "\nRU: " + t.ruTitle + "\n" + t.ruText + "\nRU WHY: " + t.ruReason);
