// Node 12.4.1, agreed: the owner agreed on 2026-11-14 («согласовано») to the proposal that fix-newform-316.mjs,
// fix-newform-318.mjs and fix-newform-319.mjs wrote, and to moving the diagram into node 12.4.2. The proposal's title and
// text become the node's; the reason is the owner's and does not change.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.4.1"];
const parse = (s, labels) => {
  const out = {};
  const re = new RegExp("^(" + labels.join("|") + "): ", "m");
  let rest = s;
  let key = null;
  const parts = rest.split(new RegExp("^(?=(?:" + labels.join("|") + "): )", "m"));
  for (const part of parts) {
    const m = part.match(re);
    if (!m) continue;
    key = m[1];
    out[key] = part.slice(m[0].length).trim();
  }
  return out;
};
const p = n.proposals[0];
const en = parse(p.en, ["Title", "Text", "Reason"]);
const ru = parse(p.ru, ["Заголовок", "Текст", "Обоснование"]);
if (!en.Title || !en.Text || !ru["Заголовок"] || !ru["Текст"]) throw new Error("proposal not parsed");
if (en.Reason !== n.reason || ru["Обоснование"] !== n.ruReason) throw new Error("the reason was not meant to change");
n.title = en.Title;
n.text = en.Text;
n.ruTitle = ru["Заголовок"];
n.ruText = ru["Текст"];
delete n.proposals;
n.agreed = "2026-11-14";
n.changes.push(
  "Согласован заново 14 ноября («согласовано») под новое название раздела 12.4 «Домены: иерархия»: заголовок «Уровень домена в иерархии», первая фраза — ваше определение уровня, список уровней идёт от вершины иерархии вниз, номер уровня — место в этом списке.",
  "Абзац о схеме и фраза о визуализации вынесены в новый узел 12.4.2, с вашего согласия.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(["Title: " + n.title, "", "Text: " + n.text, "", "Reason: " + n.reason].join("\n"));
