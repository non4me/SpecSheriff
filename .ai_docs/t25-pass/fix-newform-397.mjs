// Node 7.6.1, agreed: a proposal. Its reason ended with a requirement, "A quotation must match what it quotes letter for
// letter", while node 1.2.3 says that a reason requires nothing, so nobody would check or apply it. The requirement
// moves into the text, joined to the sentence on quotations: a quotation matches what it quotes letter for letter, and
// so keeps its language, one relation and so one thought (node 7.3.2). The reason loses its last paragraph. The owner
// agreed to take up this node on 2026-11-16 («да только эти три»). The temporary key "7.6.1~" holds it for the checker.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-397.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.6.1"];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a.slice(0, 60));
  return s.replace(a, b);
};
const text = swap(n.text, "A quotation, such as a name from the code or text the system shows its users, keeps the language of what it quotes.",
  "A quotation, such as a name from the code or text the system shows its users, matches what it quotes letter for letter, and so keeps its language.");
const ruText = swap(n.ruText, "Цитата, например имя из кода или текст, который система показывает пользователям, сохраняет язык того, что цитирует.",
  "Цитата, например имя из кода или текст, который система показывает пользователям, совпадает с тем, что она цитирует, буква в букву и поэтому сохраняет его язык.");
const reason = swap(n.reason, "\n\nA quotation must match what it quotes letter for letter.", "");
const ruReason = swap(n.ruReason, "\n\nЦитата должна совпадать с тем, что она цитирует, буква в букву.", "");
n.proposals = [
  {
    where: "текст и обоснование",
    en: [`Title: ${n.title}`, "", `Text: ${text}`, "", `Reason: ${reason}`].join("\n"),
    ru: [`Заголовок: ${n.ruTitle}`, "", `Текст: ${ruText}`, "", `Обоснование: ${ruReason}`].join("\n"),
    why: "Требование из обоснования перенесено в текст. Было в тексте: «Цитата, например имя из кода или текст, который система показывает пользователям, сохраняет язык того, что цитирует». Стало: «Цитата, например имя из кода или текст, который система показывает пользователям, совпадает с тем, что она цитирует, буква в букву и поэтому сохраняет его язык». Из обоснования убран последний абзац: «Цитата должна совпадать с тем, что она цитирует, буква в букву». Узел 1.2.3, который вы оставили в основах, говорит, что обоснование ничего не требует: требование в обосновании никто не проверил бы и не применил. Совпадение буква в букву и сохранение языка — одно отношение «X, и поэтому Y», то есть одна мысль по 7.3.2.",
  },
];
d["7.6.1~"] = { ...n, text, ruText, reason, ruReason };
delete d["7.6.1~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
