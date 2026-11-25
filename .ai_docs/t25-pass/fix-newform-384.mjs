// Node 7.2.3, the proposal of fix-newform-380.mjs to fix-newform-383.mjs: the owner's correction of 2026-11-16 to the
// first sentence of the reason («нет разговора вокруг -> нет контекста»), used as given.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-384.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const p = d["7.2.3"].proposals[0];
const pairs = [
  ["Reason: A rule has no conversation around it to say what a general word applies to.", "Reason: A rule has no context to show what a general word applies to."],
  ["Обоснование: У правила нет разговора вокруг, который подсказал бы, к чему относится общее слово.", "Обоснование: У правила нет контекста, который подсказал бы, к чему относится общее слово."],
];
for (const [a, b] of pairs) {
  const k = p.en.includes(a) ? "en" : p.ru.includes(a) ? "ru" : null;
  if (!k) throw new Error("not found: " + a);
  p[k] = p[k].replace(a, b);
}
const stale = "Стало: «У правила нет разговора вокруг, который подсказал бы, к чему относится общее слово.";
if (!p.why.includes(stale)) throw new Error("why not found");
p.why = p.why.replace(stale, "Стало: «У правила нет контекста, который подсказал бы, к чему относится общее слово.");
p.why += " «Нет разговора вокруг» заменено на «нет контекста» по вашей правке от 16 ноября.";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(p.en.split("Reason: ")[1]);
console.log(p.ru.split("Обоснование: ")[1]);
