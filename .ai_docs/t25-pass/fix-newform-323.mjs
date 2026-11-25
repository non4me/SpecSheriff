// Node 12.4.2, agreed: the owner agreed on 2026-11-14 («согласовано») to the proposal that fix-newform-321.mjs and
// fix-newform-322.mjs wrote, and to moving the order of the domains into node 12.4.3. The proposal's title, text and reason
// become the node's.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.4.2"];
const parse = (s, labels) => {
  const out = {};
  const re = new RegExp("^(" + labels.join("|") + "): ");
  for (const part of s.split(new RegExp("^(?=(?:" + labels.join("|") + "): )", "m"))) {
    const m = part.match(re);
    if (m) out[m[1]] = part.slice(m[0].length).trim();
  }
  return out;
};
const p = n.proposals[0];
const en = parse(p.en, ["Title", "Text", "Reason"]);
const ru = parse(p.ru, ["Заголовок", "Текст", "Обоснование"]);
for (const v of [en.Title, en.Text, en.Reason, ru["Заголовок"], ru["Текст"], ru["Обоснование"]]) if (!v) throw new Error("proposal not parsed");
n.title = en.Title;
n.text = en.Text;
n.reason = en.Reason;
n.ruTitle = ru["Заголовок"];
n.ruText = ru["Текст"];
n.ruReason = ru["Обоснование"];
delete n.proposals;
n.agreed = "2026-11-14";
n.changes = [
  "Новый узел: абзац о схеме из 12.4.1, согласованный 9 ноября, переписанный по замечаниям рецензента.",
  "Схему строят инструменты SpecSheriff; на ней видно, как домены взаимосвязаны (ваши слова); правила расположения — списком; домены без уровня — отдельной линией ниже всех уровней.",
  "Ваша фраза о визуализации убрана: её уже говорят 12.2.3 и 12.4.1. Обоснование новое.",
  "Порядок доменов вынесен в узел 12.4.3, с вашего согласия.",
  "Вы согласовали эту формулировку 14 ноября («согласовано»).",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(["Title: " + n.title, "", "Text: " + n.text, "", "Reason: " + n.reason].join("\n"));
