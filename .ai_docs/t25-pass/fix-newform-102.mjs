// The present 6.6, now 7.13, demanded a reason for each requirement, and so produced reasons written paragraph by paragraph. It now
// speaks of the purpose the reason gives. What 7.12 already says, that a reason speaks of the rule as a whole, is not repeated.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const path = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
if (d["7.13"]) throw new Error("7.13 already has a draft");
const row = fs.readFileSync(new URL("base-structure.html", here), "utf8").split("\n").map(l => l.trim()).find(t => t.startsWith('["7.13",'));
d["7.13"] = {
  from: "6.6", sid: "kept",
  title: "=6.6",
  ruTitle: JSON.parse(row.replace(/,$/, ""))[5],
  text: "Every requirement of a rule's text serves the purpose its reason gives. Where one does not, either the reason is rewritten or the requirement is cut.",
  reason: "A part of a rule outside its reason looks unneeded, so the next author removes it while the reason still holds.",
  ruText: "Каждое требование текста правила служит цели, которую называет его обоснование. Если какое-то не служит, либо переписывают обоснование, либо убирают это требование.",
  ruReason: "Часть правила, которую обоснование не охватывает, выглядит ненужной, и следующий автор убирает её, хотя обоснование остаётся верным.",
  changes: [
    "Заголовок нынешнего 6.6, дословно.",
    "Текст написан заново. Нынешний требовал, чтобы обоснование покрывало всё, что требует текст, с примером «для обоих требований», и из-за этого обоснования писались по абзацам.",
    "Обоснование сокращено до одной фразы.",
    "Сохраняет sid 6.6.",
  ],
  sidValue: "s-hwnzhgw5b683fc7",
};
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(d["7.13"].ruTitle);
