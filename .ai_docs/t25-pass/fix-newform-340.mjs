// Node 12.4.2, agreed on 2026-11-14: the owner's comment on the page that shows the base specification, the same day
// («тут можно убрать - это регламентирует следующее правило. Это звучит непонятно»), removes the last item of its list,
// "the domains in each row follow the order of the domains (§s-uw9n84edf7cbe9n)": node 12.4.3 governs the order within a
// row. The change is the owner's own, so the node stays agreed.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.4.2"];
const cut = (s, a) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, "");
};
n.text = cut(n.text, "\n- the domains in each row follow the order of the domains (§s-uw9n84edf7cbe9n).");
n.ruText = cut(n.ruText, "\n- домены каждой линии идут в порядке доменов (§s-uw9n84edf7cbe9n).");
n.text = n.text.replace(/;\n- domains whose header names no level are all placed in a single row of their own, below the rows of the levels;$/, ";\n- domains whose header names no level are all placed in a single row of their own, below the rows of the levels.");
n.ruText = n.ruText.replace(/;\n- домены, в заголовке которых уровень не назван, выстраиваются в отдельную линию ниже линий всех уровней;$/, ";\n- домены, в заголовке которых уровень не назван, выстраиваются в отдельную линию ниже линий всех уровней.");
if (!n.text.endsWith(".") || !n.ruText.endsWith(".")) throw new Error("the list does not end with a full stop: " + n.text.slice(-60) + " | " + n.ruText.slice(-60));
n.changes.push("По вашему комментарию от 14 ноября убран последний пункт списка, «домены каждой линии идут в порядке доменов»: порядок внутри линии регламентирует 12.4.3.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.ruText);
