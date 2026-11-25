// Node 7.2.2: the owner accepted the proposal of fix-newform-375.mjs to fix-newform-377.mjs on 2026-11-16
// («согласовано»). Its text and reason become the draft's wording, and the proposal is removed.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-378.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.2"];
const field = (s, label, next) => {
  const from = s.indexOf(label + ": ");
  if (from < 0) throw new Error("no " + label);
  const rest = s.slice(from + label.length + 2);
  const end = next ? rest.indexOf("\n\n" + next + ": ") : -1;
  return end < 0 ? rest : rest.slice(0, end);
};
const p = n.proposals[0];
n.text = field(p.en, "Text", "Example");
n.reason = field(p.en, "Reason");
n.ruText = field(p.ru, "Текст", "Пример");
n.ruReason = field(p.ru, "Обоснование");
delete n.proposals;
n.changes.push("Вы приняли 16 ноября новую редакцию: обоснование говорит о правиле в целом (узел 7.4.2); «главной мысли» ссылается на 7.3.2, где определена мысль (узел 7.2.7); предложение о списках короче (узел 7.5.2); «одно утверждение следует из другого» (узел 7.2.3).");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(JSON.stringify({ text: n.text, reason: n.reason, ruText: n.ruText, ruReason: n.ruReason }, null, 2));
