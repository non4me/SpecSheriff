// Node 12.4.3, agreed again: the owner agreed on 2026-11-14 («согласовано») to the proposal that fix-newform-338.mjs and
// fix-newform-339.mjs wrote, the owner's own order of the domains of one row, together with leaving the placement of a
// domain with several sources or several users within its row to the appendix of the tools. The proposal's title, text,
// reason and example become the node's.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.4.3"];
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
const en = parse(p.en, ["Title", "Text", "Reason", "Examples"]);
const ru = parse(p.ru, ["Заголовок", "Текст", "Обоснование", "Примеры"]);
for (const v of [en.Title, en.Text, en.Reason, en.Examples, ru["Заголовок"], ru["Текст"], ru["Обоснование"], ru["Примеры"]]) if (!v) throw new Error("proposal not parsed");
n.title = en.Title;
n.text = en.Text;
n.reason = en.Reason;
n.examples = [en.Examples];
n.ruTitle = ru["Заголовок"];
n.ruText = ru["Текст"];
n.ruReason = ru["Обоснование"];
n.ruExamples = [ru["Примеры"]];
delete n.proposals;
n.agreed = "2026-11-14";
n.changes.push("Согласован заново 14 ноября («согласовано») в вашей формулировке порядка: сначала, по алфавиту, домены без связей в линии; затем каждый домен справа от всех доменов линии, которыми он пользуется, как можно ближе к ним. Сложные случаи расстановки определяет описание инструментов.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(["Title: " + n.title, "", "Text: " + n.text, "", "Reason: " + n.reason, "", "Example: " + n.examples[0]].join("\n"));
