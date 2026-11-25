// Node 6.1: the owner accepted the proposal of fix-newform-264.mjs (2026-11-14, «ок»): the link type `checks`. This was the
// last item still to be done after table 10.1. Part 12 starts with node 12.1.2, agreed on 2026-11-09: a proposal carrying
// out what the owner accepted for check 10.1.20 on 2026-11-13, that the text of a node declaring an `overrides` link cites
// the rule that the link names.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const a = d["6.1"];
const p = a.proposals[0];
a.text = p.en.replace(/^Text: /, "");
a.ruText = p.ru.replace(/^Текст: /, "");
delete a.proposals;
a.changes.push("Вы приняли предложение (2026-11-14): новый тип связи `checks`, по вашему решению от 11 ноября.");

const n = d["12.1.2"];
const en = "Its node stating the change holds a link of type `overrides` to that rule.";
const ru = "Его узел, задающий изменение, содержит связь типа `overrides` к этому правилу.";
if (!n.text.includes(en) || !n.ruText.includes(ru)) throw new Error("12.1.2 anchor not found");
n.proposals = [
  {
    where: "новое предложение после второго",
    en: "Text: " + n.text.replace(en, en + " The text of that node cites the rule it changes."),
    ru: "Текст: " + n.ruText.replace(ru, ru + " Текст этого узла ссылается на правило, которое он изменяет."),
    why:
      "Вы приняли это для проверки 10.1.20 (2026-11-13): «Текст узла, который объявляет связь `overrides`, ссылается на узел, который эта связь называет». Проверка следит за правилом, поэтому само правило должно это говорить.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("6.1 agreed; 12.1.2 proposal set");
