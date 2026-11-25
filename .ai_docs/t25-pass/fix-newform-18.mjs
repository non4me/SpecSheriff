// The owner's ruling of 2026-11-07 on 1.1.4: its text is the owner's three sentences only. "How it is
// done ... technical appendix" goes, a repeat of 1.1.5. The list of what a rule of the base never
// names, with the paragraph allowing a technology named by example, moves into section 4 as a node
// of its own, 4.4 (room made by insert-node.mjs 4.4), beside the other nodes refining 1.1.4; the
// second sentence of 1.1.4's reason goes with it.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const path = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
const ru = JSON.parse(fs.readFileSync(new URL("full-ru.json", here), "utf8"));
let p16;
(function walk(ns) {
  for (const x of ns) {
    if (x.location.endsWith("/1.16")) p16 = x;
    if (x.children) walk(x.children);
  }
})(spec.nodes);
const sentences = s => s.split(/(?<=\.) (?=[A-ZА-ЯЁ])/);

const b = d["1.1.4"];
if (b.from !== "1.16") throw new Error("1.1.4 is not from 1.16");
b.text = sentences(b.text.split("\n\n")[0]).slice(0, 3).join(" ");
b.ruText = sentences(b.ruText.split("\n\n")[0]).slice(0, 3).join(" ");
const [r1, r2] = sentences(b.reason), [rr1, rr2] = sentences(b.ruReason);
b.reason = r1;
b.ruReason = rr1;
b.changes = [
  "Заголовок — ваш, из комментария.",
  "Текст — ваши три фразы, дословно; исправлены только написание («бизнес-логику», «требуется», «может», «нюансами») и пунктуация, во второй фразе «и описывает» стало «оно описывает». Нынешний текст 1.16 уходит: первая фраза заменена вашими, «Как это сделано… описывается в техническом приложении» повторяла 1.1.5, а перечень того, что правило базы не называет, с примером в скобках — в 4.4.",
  "Обоснование — первая фраза нынешнего обоснования 1.16 с вашей правкой «Это позволяет реализовать спецификацию на другом техническом стеке». Вторая фраза уходит в 4.4.",
  "Сохраняет sid 1.16: на него ссылаются узлы, которые уточняют сам принцип, — 4.5, 4.6, 4.1 и обоснование 2.3.",
];

const [t1, t2] = p16.text.split("\n\n");
const [rt1, rt2] = ru["1.16"].text.split("\n\n");
const fresh = {
  from: "1.16", sid: "new",
  title: "Which technologies the base specification does not name",
  text: sentences(t1)[1].replace(/^It names no/, "A rule of the base specification names no") + "\n\n" + t2,
  reason: r2 + " Named by example, where the rule does not depend on it, a technology makes the rule easier to read and binds nothing.",
  ruTitle: "Какие технологии базовая спецификация не называет",
  ruText: sentences(rt1)[1].replace(/^Оно не называет/, "Правило базовой спецификации не называет") + "\n\n" + rt2,
  ruReason: rr2 + " Технология, названная как пример там, где правило от неё не зависит, облегчает чтение и ничего не связывает.",
  changes: [
    "Новый узел, по вашему решению: перечень того, что правило базы не называет, — частность к 1.1.4, и место ему рядом с 4.5 и 4.6, которые тоже уточняют 1.1.4.",
    "Заголовок новый.",
    "Текст — вторая фраза и абзац 2 нынешнего 1.16, дословно, кроме подлежащего: «It names no» стало «A rule of the base specification names no», потому что узел читается отдельно.",
    "Обоснование — вторая фраза нынешнего обоснования 1.16, дословно, и новая фраза об исключении для примера в скобках: у нынешнего узла обоснования для него не было.",
    "Новый sid: нынешний sid 1.16 остаётся у 1.1.4.",
  ],
};
const out = {};
for (const [k, v] of Object.entries(d)) {
  if (k === "4.5" && !out["4.4"]) out["4.4"] = fresh;
  out[k] = v;
}
if (!out["4.4"]) out["4.4"] = fresh;
fs.writeFileSync(path, JSON.stringify(out, null, 2) + "\n");

const page = new URL("base-structure.html", here);
const lines = fs.readFileSync(page, "utf8").split("\n");
if (!lines.some(l => l.trim().startsWith('["4.4",'))) {
  const i = lines.findIndex(l => l.trim().startsWith('["4.3",'));
  const indent = lines[i].slice(0, lines[i].indexOf("["));
  lines.splice(i + 1, 0, indent + JSON.stringify(["4.4", "part", 0, "1.16", "part of 1.16: The base specification names no technology", "уходит сюда: Какие технологии базовая спецификация не называет"]) + ",");
}
const j = lines.findIndex(l => l.trim().startsWith('["1.1.4",'));
const t = lines[j].trim(), comma = t.endsWith(",");
const row = JSON.parse(comma ? t.slice(0, -1) : t);
row[8] = Array.from(new Set([...(row[8] || []), "4.4", "4.5", "4.6"]));
lines[j] = lines[j].slice(0, lines[j].indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
fs.writeFileSync(page, lines.join("\n"));
console.log("1.1.4:", b.ruText, "|", b.ruReason, "\n4.4:", fresh.ruText.replace(/\n/g, " / "), "|", fresh.ruReason);
