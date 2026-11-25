// Node 12.3.1: the owner asked whether the exception could say, more briefly, «общий формат, используемый в нескольких
// доменах» (2026-11-14). That alone would also fit the format of an order, which the domain of orders outputs and the domain
// of invoices uses, and would move it to the contracts section. An address differs in being used only as part of other
// formats. So the exception says, briefly, "a shared format used only as part of the formats of several domains", and the
// reason follows it.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.3.1"].proposals[0];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
p.en = swap(p.en, "The exception is a format whose data appears only inside the records of several domains.", "The exception is a shared format used only as part of the formats of several domains.");
p.en = swap(p.en, "A format whose data appears in several domains belongs to none of them.", "A format used only as part of the formats of several domains belongs to none of them.");
p.ru = swap(p.ru, "Исключение — формат данных, которые встречаются только внутри записей нескольких доменов.", "Исключение — общий формат, который используется только как часть форматов нескольких доменов.");
p.ru = swap(p.ru, "Формат, данные которого появляются в нескольких доменах, не принадлежит ни одному из них.", "Формат, который используется только как часть форматов нескольких доменов, не принадлежит ни одному из них.");
p.why = "See fix-newform-282.mjs to fix-newform-294.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.3.1: the exception shortened");
