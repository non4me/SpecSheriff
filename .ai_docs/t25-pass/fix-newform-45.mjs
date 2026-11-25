// Node 3.4 "RecordType": the finding of the reviewer specsheriff-rule-reviewer, on the current version of its
// skill, on the sentence of the reason: what belongs to no domain is the format of the common part, since each
// domain's data are its own.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

n.reason = swap(n.reason, "the part of the data common to the domains using it belongs to none of them.", "the format of the part of the data common to the domains using it belongs to none of them.");
n.ruReason = swap(n.ruReason, "часть данных, общая для доменов, которые его используют, не принадлежит ни одному из них.", "формат части данных, общей для доменов, которые его используют, не принадлежит ни одному из них.");
n.changes.push("Абзац 2 обоснования: ни одному домену не принадлежит формат общей части, а не сами данные, потому что данные каждого домена — его собственные. Правка рецензента.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.reason.split("\n\n")[1]);
console.log("---");
console.log(n.ruReason.split("\n\n")[1]);
