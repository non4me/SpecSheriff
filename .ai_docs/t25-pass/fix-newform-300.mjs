// Node 12.3.2, not yet agreed: a proposal carrying out node 12.3.1, which the owner agreed to on 2026-11-14. Node 12.3.1
// now says what a RecordType is, so 12.3.2 cites it instead of defining a RecordType again, and no longer says that
// domains pass data to one another: domains offer their data. "Structure" becomes "format", the owner's word in 12.3.1.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.2"];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
const text = swap(
  n.text,
  "A data structure the domains pass to one another or keep in a store is described by a node of its own, a RecordType. The RecordType states:",
  "Each data format is described by a node of its own, a RecordType (§s-7vm323mhry2enx3). The RecordType states:",
);
const ruText = swap(
  n.ruText,
  "Структура данных, которую домены передают друг другу или хранят в хранилище, описывается отдельным узлом — RecordType. RecordType говорит:",
  "Каждый формат данных описывается отдельным узлом — RecordType (§s-7vm323mhry2enx3). RecordType говорит:",
);
const reason = swap(n.reason, "A structure is part of what the system is,", "A data format is part of what the system is,");
const ruReason = swap(n.ruReason, "Структура — часть того, что такое система,", "Формат данных — часть того, что такое система,");

n.proposals = [
  {
    where: "заголовок, первое предложение текста, первое предложение обоснования",
    en: "Title: Data formats are described in the specification\n\nText: " + text + "\n\nReason: " + reason,
    ru: "Заголовок: Форматы данных описываются в спецификации\n\nТекст: " + ruText + "\n\nОбоснование: " + ruReason,
    why: "Узел 12.3.1, который вы согласовали, теперь говорит, что такое RecordType. Поэтому 12.3.2 ссылается на него вместо собственного определения и больше не говорит, что домены передают данные друг другу. «Структура» заменена на «формат», как в 12.3.1.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.proposals[0].ru);
