// Node 3.4 "RecordType": the findings of the reviewer specsheriff-rule-reviewer on the two sentences added by
// fix-newform-43.mjs. The subject of the text's sentence is named, the reason says "no single provider" as the
// agreed reason does, and its conclusion goes, since it restated the text. The citation of s-96df5fcfqsvex9d
// goes, since that rule is on the values domains add and backed nothing in the sentence; it cites this node itself.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

n.text = swap(n.text, "It is the format of the part common to the data of all the domains using it (§s-96df5fcfqsvex9d).", "That RecordType is the format of the part common to the data of all the domains using it.");
n.ruText = swap(n.ruText, "Это формат общей части данных всех доменов, которые его используют (§s-96df5fcfqsvex9d).", "Такой RecordType — это формат общей части данных всех доменов, которые его используют.");
n.reason = swap(n.reason, "Where no domain provides a format, the part common to the domains using it belongs to none of them, so it is agreed in contracts.", "Where a RecordType has no single provider, the part of the data common to the domains using it belongs to none of them.");
n.ruReason = swap(n.ruReason, "Если ни один домен не предоставляет формат, его часть, общая для доменов, которые его используют, не принадлежит ни одному из них, поэтому её согласуют в контрактах.", "Если у RecordType нет отдельного поставщика, часть данных, общая для доменов, которые его используют, не принадлежит ни одному из них.");
n.changes.push("Абзац 3, последняя фраза: вместо «Это» названо подлежащее, «Такой RecordType». Правка рецензента.");
n.changes.push("Абзац 3: снята ссылка на правило о значениях, которые добавляют домены. Она не подкрепляла сказанное в этой фразе, а само правило ссылается на этот узел.");
n.changes.push("Абзац 2 обоснования: вместо «ни один домен не предоставляет формат» сказано «нет отдельного поставщика», как в согласованном абзаце 3 обоснования. Снят вывод «поэтому её согласуют в контрактах»: его уже содержит текст. Правка рецензента.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
console.log("---");
console.log(n.reason);
console.log("---");
console.log(n.ruText);
console.log("---");
console.log(n.ruReason);
