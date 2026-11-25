// 7.7 is present 6.4 (s-6j8ystpj2yzcchq) moved unchanged, approved by the owner on 2026-11-06 at the start of this task (its decision of that day; its approval record
// is newer than the last commit). Having no draft, the page showed it by its titles alone. A draft with its text, reason and Russian reading makes it show whole, marked agreed.
// The script also lists every page row that still has no draft.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
if (d["7.7"]) throw new Error("7.7 has a draft already");
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
let n;
const walk = (x) => { if (x.sid === "s-6j8ystpj2yzcchq") n = x; (x.children ?? []).forEach(walk); };
spec.nodes.forEach(walk);
if (!n || n.status !== "approved") throw new Error("present 6.4 is not approved");

const entry = {
  from: "6.4", sid: "kept",
  title: n.title,
  ruTitle: "Узел содержит то, что применяется вместе, и ничего, что применяется порознь",
  text: n.text,
  reason: n.reason,
  ruText: "Требования, которые читателю нужны вместе, чтобы правильно выполнить любое из них, стоят в одном узле. Требование, которое правильно выполняется без остальных требований своего узла, стоит в отдельном узле. Главная мысль и её уточнения (§s-juucyammgq4shq8) считаются одним требованием.",
  ruReason: "Правило применяют по тому узлу, в котором его читают. Нужное ему требование, стоящее в другом узле, упустит тот, кто читает правило отдельно. Требование, собранное из нескольких узлов, выполнить труднее, чем сказанное целиком в одном узле. Главную мысль, прочитанную без её уточнений, выполнят и там, где они её сужают.\n\nУзел одобряют, на него ссылаются и его связывают с кодом целиком. SpecTag, называющий узел с требованиями, которые выполняются порознь, не говорит, какое из них выполняет код.",
  changes: ["Переносится без изменений. Вы одобрили его 2026-11-06, в начале этой задачи."],
  sidValue: "s-6j8ystpj2yzcchq",
  agreed: "2026-11-06",
};
const out = {};
for (const [k, v] of Object.entries(d)) {
  out[k] = v;
  if (k === "7.6") out["7.7"] = entry;
}
if (!out["7.7"]) throw new Error("7.6 not found");
fs.writeFileSync(draftsPath, JSON.stringify(out, null, 2) + "\n");

const page = fs.readFileSync(new URL("base-structure.html", here), "utf8");
const missing = [];
for (const l of page.split("\n")) {
  const t = l.trim();
  if (!/^\["[0-9.]+","(split|part|move|same|new)"/.test(t)) continue;
  const row = JSON.parse(t.endsWith(",") ? t.slice(0, -1) : t);
  if (!out[row[0]]) missing.push(`${row[0]} ${row[1]} from ${row[3]}: ${row[4]}`);
}
console.log("rows with no draft:", missing.length);
missing.forEach((m) => console.log(" ", m));
