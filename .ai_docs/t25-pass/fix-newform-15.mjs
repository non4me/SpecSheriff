// The owner's comment of 2026-11-07 on 1.1.3: the list of what is dropped bears on rules in general,
// so it moves into section 7 with the part of the reason that grounds it, as a node of its own, 7.4
// (room made by insert-node.mjs 7.4). 1.1.3 keeps the owner's words only.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const path = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
const ru = JSON.parse(fs.readFileSync(new URL("full-ru.json", here), "utf8"));
let p13;
(function walk(ns) {
  for (const x of ns) {
    if (x.location.endsWith("/1.13")) p13 = x;
    if (x.children) walk(x.children);
  }
})(spec.nodes);
const first = s => s.split("\n\n")[0];
const rest = s => s.split("\n\n").slice(1).join("\n\n");

const g = d["1.1.3"];
if (g.from !== "1.13") throw new Error("1.1.3 is not the present 1.13");
const list = rest(g.text), ruList = rest(g.ruText);
g.text = first(g.text);
g.ruText = first(g.ruText);
g.reason = first(g.reason);
g.ruReason = first(g.ruReason);
g.changes = [
  "Заголовок — по вашему комментарию: речь здесь не о всей спецификации, а только о guidelines.",
  "Стоит перед узлом о базе, по вашему комментарию: 1.1.2 называет три части, а 1.1.3–1.1.5 раскрывают их по одной.",
  "Текст и обоснование — ваша формулировка, дословно. SpecSheriff в общих правилах пока не упоминается, по вашему решению.",
  "Нынешний текст 1.13 и его обоснование уходят отсюда: абзац 1 — его говорят 1.1.2, 1.1.4 и 1.1.5; список того, какое правило отбрасывается, с обоснованием — в 7.4, по вашему комментарию.",
  "Сохраняет sid 1.13. Единственная ссылка на него, из обоснования 5.8 («The method governs the specification and the code bound to it»), перейдёт на 1.1.2, где сказано, что регулируют guidelines.",
];

const fresh = {
  from: "1.13", sid: "new",
  title: "A rule is dropped where it governs another process or states the obvious",
  text: list,
  reason: p13.reason,
  ruTitle: "Правило отбрасывается, если регулирует другой процесс или утверждает очевидное",
  ruText: ruList,
  ruReason: ru["1.13"].reason,
  changes: [
    "Новый узел, по вашему комментарию: это правило о правилах в целом, и место ему в разделе 7.",
    "Заголовок новый.",
    "Текст — абзац 2 нынешнего 1.13. «Anything else» в первом пункте раскрыто: «anything but how the specification is kept, changed and implemented», потому что абзац 1, на который оно опиралось, здесь не стоит.",
    "Обоснование — нынешнее обоснование 1.13, дословно.",
    "Новый sid: нынешний sid 1.13 остаётся у 1.1.3.",
  ],
};
const out = {};
for (const [k, v] of Object.entries(d)) {
  if (k === "7.5" && !out["7.4"]) out["7.4"] = fresh;
  out[k] = v;
}
if (!out["7.4"]) out["7.4"] = fresh;
fs.writeFileSync(path, JSON.stringify(out, null, 2) + "\n");

const page = new URL("base-structure.html", here);
const lines = fs.readFileSync(page, "utf8").split("\n");
if (!lines.some(l => l.trim().startsWith('["7.4",'))) {
  const i = lines.findIndex(l => l.trim().startsWith('["7.3",'));
  const indent = lines[i].slice(0, lines[i].indexOf("["));
  lines.splice(i + 1, 0, indent + JSON.stringify(["7.4", "part", 0, "1.13", "part of 1.13: What the specification governs", "уходит сюда: Правило отбрасывается, если регулирует другой процесс или утверждает очевидное"]) + ",");
}
const j = lines.findIndex(l => l.trim().startsWith('["1.1.3",'));
const t = lines[j].trim(), comma = t.endsWith(",");
const row = JSON.parse(comma ? t.slice(0, -1) : t);
row[8] = ["2.5", "2.6", "7.4"];
lines[j] = lines[j].slice(0, lines[j].indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
fs.writeFileSync(page, lines.join("\n"));
console.log("1.1.3:", g.text, "|", g.reason, "\n7.4:", fresh.text.replace(/\n/g, " / "));
