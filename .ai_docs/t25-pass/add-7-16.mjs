// The owner of 2026-11-11: a node may hold examples, a permission rather than a duty, in a property of its own, so
// that agents and people grasp a rule from a case; proposed wherever a node is drafted or changed. Adds node 7.16 at
// the end of section 7 "How a rule is written", with a sid drawn now and checked unique.
import fs from "node:fs";
import { randomInt } from "node:crypto";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
if (d["7.16"]) throw new Error("7.16 exists");

const alphabet = "23456789abcdefghjkmnpqrstuvwxyz";
const taken = new Set();
const scan = (text) => { for (const m of text.matchAll(/s-[2-9a-hjkmnp-z]{15}/g)) taken.add(m[0]); };
scan(fs.readFileSync(draftsPath, "utf8"));
for (const dir of ["../../specs/_guidelines/", "../../specs/_archive/", "../../specs/"]) {
  const url = new URL(dir, here);
  if (!fs.existsSync(url)) continue;
  for (const f of fs.readdirSync(url)) if (f.endsWith(".json")) scan(fs.readFileSync(new URL(f, url), "utf8"));
}
let sid;
do { sid = "s-" + Array.from({ length: 15 }, () => alphabet[randomInt(alphabet.length)]).join(""); } while (taken.has(sid));

d["7.16"] = {
  from: "",
  sid: "new",
  sidValue: sid,
  title: "A node may show examples",
  ruTitle: "Узел может приводить примеры",
  text: "A node may hold examples of what its text requires, apart from its text, in its property `examples`. An example shows a typical case and, where it helps, the nearest mistake. An example requires nothing. Where an example and the text disagree, the text holds and the example is mended.",
  ruText: "Узел может приводить примеры того, чего требует его текст, отдельно от текста, в своём свойстве `examples`. Пример показывает обычный случай и, где это помогает, ближайшую ошибку. Пример ничего не требует. Если пример и текст расходятся, верен текст, а пример исправляют.",
  reason: "A reader, an agent above all, grasps a rule faster from a case than from its text alone. Kept apart from the text, an example neither lengthens it nor reads as a further requirement.",
  ruReason: "Читатель, прежде всего агент, понимает правило по случаю быстрее, чем по одному тексту. Отдельно от текста пример не удлиняет его и не читается как ещё одно требование.",
  changes: ["Новый узел, по вашему решению от 11 ноября: примеры — возможность, а не обязанность; их предлагают, когда узел пишут или меняют. Согласованный 1.3.5 затем назовёт примеры среди того, что покрывает одобрение; на шаге инструментов схема получит необязательное свойство `examples`, а экспорт, показ узла и `sheriff guide` будут его выводить."],
};
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const at = lines.findIndex((l) => l.trim().startsWith('["7.15",'));
if (at < 0) throw new Error("row 7.15 not found");
if (!lines[at].trim().endsWith(",")) lines[at] = lines[at] + ",";
lines.splice(at + 1, 0, "      " + JSON.stringify(["7.16", "new", 0, "", "A node may show examples", "Узел может приводить примеры", "", "Новый узел, по вашему решению от 11 ноября.", [], ""]));
fs.writeFileSync(pagePath, lines.join("\n"));
console.log(sid);
