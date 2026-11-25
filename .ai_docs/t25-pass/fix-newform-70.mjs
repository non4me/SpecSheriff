// Node 6.1: the reviewer's fixes of 2026-11-09 (review-6.md). What a header's index and gathered values are belongs to part
// 14, so the list says only values built from other nodes; the reason grounds the whole text.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["6.1"];

const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error("not found: " + from);
  n[field] = n[field].replace(from, to);
};
swap("text", "- a header's index of its sections;\n- the values gathered beside a field.", "- values built from other nodes.");
swap("ruText", "- указателя разделов в заголовке;\n- значений, собранных рядом с полем.", "- значений, построенных из других узлов.");
swap("text", "A node of the archive is not held to this rule (§s-bpdqd9v72wg7vsz).", "A node of the archive is not held to this rule.");
swap("ruText", "На узел архива это правило не распространяется (§s-bpdqd9v72wg7vsz).", "На узел архива это правило не распространяется.");
n.reason = "A link says how a node bears on another, so that node declares it. A citation relies on the node it names as a link does. With no link of its own, a citation is seen only where it is written. Whoever changes the node it names then misses it.\n\nA value built from other nodes copies what they hold. The links stay with those nodes.\n\nA node of the archive is no longer part of the specification. Whoever changes a node it names has nothing to miss.";
n.ruReason = "Связь говорит, как узел относится к другому узлу, поэтому её объявляет этот узел. Ссылка полагается на узел, который называет, так же, как связь. Без собственной связи ссылку видно только там, где она написана. Тогда тот, кто меняет названный ею узел, её пропускает.\n\nЗначение, построенное из других узлов, копирует то, что они содержат. Связи остаются у этих узлов.\n\nУзел архива больше не часть спецификации. Тому, кто меняет названный им узел, нечего пропустить.";
n.changes.push("Правки рецензента: в списке вместо указателя и собранных значений, которые относятся к расширению, сказано «значения, построенные из других узлов»; обоснование теперь объясняет весь текст; убрана ссылка на узел 6.2.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
