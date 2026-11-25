// The owner's ruling of 2026-11-07 on 1.1.4: its reason is the present 1.16's again (with the owner's
// opening "This lets the specification be implemented on another technical stack"), and its text
// takes back the sentence allowing a technology named by example. 4.4 is not needed and is removed
// by remove-node.mjs 4.4; the list of what a rule of the base never names goes with it.
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
const rep = (s, a, b) => {
  if (!s.includes(a)) throw new Error(`not found: ${a}`);
  return s.replace(a, b);
};

const b = d["1.1.4"];
if (b.from !== "1.16") throw new Error("1.1.4 is not from 1.16");
const own = b.text.split("\n\n")[0], ruOwn = b.ruText.split("\n\n")[0];
b.text = own + "\n\n" + p16.text.split("\n\n")[1];
b.ruText = ruOwn + "\n\n" + ru["1.16"].text.split("\n\n")[1];
b.reason = rep(p16.reason, "The same rules can then be implemented on another stack,", "This lets the specification be implemented on another technical stack,");
b.ruReason = rep(ru["1.16"].reason, "Тогда те же правила можно реализовать на другом стеке,", "Это позволяет реализовать спецификацию на другом техническом стеке,");
b.changes = [
  "Заголовок — ваш, из комментария.",
  "Текст: первый абзац — ваши три фразы, дословно; исправлены только написание («бизнес-логику», «требуется», «может», «нюансами») и пунктуация, во второй фразе «и описывает» стало «оно описывает». Второй абзац — абзац 2 нынешнего 1.16, дословно. Остальные фразы нынешнего 1.16 убраны по вашему решению: перечень того, что правило не называет, и «Как это сделано… описывается в техническом приложении», которая повторяла 1.1.5.",
  "Обоснование — нынешнее 1.16, кроме начала первой фразы: ваша правка «Это позволяет реализовать спецификацию на другом техническом стеке».",
  "Сохраняет sid 1.16: на него ссылаются узлы, которые уточняют сам принцип, — 4.4, 4.5, 4.1 и обоснование 2.3.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(b.ruText, "\n---\n", b.ruReason);
