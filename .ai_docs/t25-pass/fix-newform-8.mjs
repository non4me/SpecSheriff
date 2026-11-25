// The owner's comment of 2026-11-07 on 1.1.3's reason: the selected "Тогда те же правила можно" gives
// way to "Это позволяет реализовать спецификацию на другом техническом стеке...", the sentence
// going on as it stands.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const path = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
const ru = JSON.parse(fs.readFileSync(new URL("full-ru.json", here), "utf8"));
let present;
(function walk(ns) {
  for (const n of ns) {
    if (n.location.endsWith("/1.16")) present = n;
    if (n.children) walk(n.children);
  }
})(spec.nodes);

const rep = (s, a, b) => {
  if (!s.includes(a)) throw new Error(`not found: ${a}`);
  return s.replace(a, b);
};
const n = d["1.1.3"];
n.reason = rep(present.reason, "The same rules can then be implemented on another stack,", "This lets the specification be implemented on another technical stack,");
n.ruReason = rep(ru["1.16"].reason, "Тогда те же правила можно реализовать на другом стеке,", "Это позволяет реализовать спецификацию на другом техническом стеке,");
n.changes = [
  "Заголовок — ваш, из комментария.",
  "Текст — нынешний 1.16, дословно.",
  "Обоснование — нынешнее 1.16, кроме начала первой фразы: «Тогда те же правила можно реализовать на другом стеке» — ваша правка «Это позволяет реализовать спецификацию на другом техническом стеке».",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.reason, "\n", n.ruReason);
