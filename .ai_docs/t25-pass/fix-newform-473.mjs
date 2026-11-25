// The owner agreed on 2026-11-18 («ок») to replace «узел вне этого расширения» in 1.7.6 with «узел спецификации, который не
// входит в это расширение», and so to 1.7.6 in that wording: the owner first asked for «узел спецификации», and the agent
// pointed out that the extension's own nodes are nodes of the specification too (1.1.2, 2.3).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-473.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["1.7.6"];
const r = [
  ["text", "stays chosen while a node outside the extension depends on it.", "stays chosen while a node of the specification that is not part of the extension depends on it."],
  ["ruText", "остаётся выбранным, пока от него зависит узел вне этого расширения.", "остаётся выбранным, пока от него зависит узел спецификации, который не входит в это расширение."],
];
for (const [field, a, b] of r) {
  if (!n[field].includes(a)) throw new Error("missing in " + field);
  n[field] = n[field].split(a).join(b);
}
n.changes.push("Согласовано 18 ноября («ок»): «узел вне этого расширения» заменено на «узел спецификации, который не входит в это расширение» — ваше «узел спецификации» и уточнение, что узлы самого расширения не в счёт.");
n.agreed = "2026-11-18";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
