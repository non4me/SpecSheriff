// Check 10.1.12 is agreed in the owner's words (2026-11-13, «ок»). Check 10.1.13 in the new form: its approved words as
// the text, with their Russian, what it touches, its tests, and one proposal whose changes interlock (the sentence is split
// in two), shown as one with each change named.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.13");
r.en = r.was.split(" | ")[0];
r.ru =
  "Узел, ссылающийся на другой, держит связь с ним, а связь типа `cites` стоит, только если её узел ссылается на узел, который она называет, и не держит к нему связи другого типа";
r.about =
  "Затрагивает каждую ссылку `§sid` в узле спецификации и каждую связь `cites`. Ссылка без связи отклоняется, связь `cites` без ссылки тоже. " +
  "Связь `cites` рядом со связью другого типа к тому же узлу отклоняется: другой тип уже говорит, как узлы связаны (правило 6.3 и тип `cites` в 6.1). Архивный узел этому правилу не подчиняется (6.3).";
r.tests = [
  "unit/validate.test.ts: refuses a link to no node, and a citation without a link or a cites link without a citation",
  "unit/validate.test.ts: refuses a cites link beside a link of another type to the same node",
];
r.proposals = [
  {
    en: "A node of the specification that cites another node declares a link to it. A link of type `cites` is valid only where its node cites the node the link names and declares no link of another type to that node",
    ru: "Узел спецификации, который ссылается на другой узел, объявляет связь с ним. Связь типа `cites` допустима, только если её узел ссылается на узел, который она называет, и не объявляет к этому узлу связи другого типа",
    why:
      "Четыре правки вместе: (1) одна мысль в предложении (7.5) — две фразы; (2) «узел спецификации» — согласованное 6.3 прямо освобождает от этого правила архивный узел; " +
      "(3) «объявляет связь» вместо «держит связь» — слова согласованного 6.3; (4) «допустима» вместо «стоит».",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.13 proposals:", r.proposals.length);
