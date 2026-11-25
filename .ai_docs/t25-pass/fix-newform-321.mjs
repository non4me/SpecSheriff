// Nodes 12.4.2 and 12.4.3, after the reviewer's report on the new node 12.4.2. Every sentence of 12.4.2 was the owner's, so
// the reviewer's fixes go to the owner as a proposal. The diagram is drawn by the SpecSheriff tools and shows which domains
// each domain uses; its placement rules form a list; a domain whose header names no level gets a row of its own below the
// levels. The owner's purpose sentence is dropped, since 12.2.3 and 12.4.1 already state it. The order of the domains is
// applied without the rows (the map uses it alone), so it becomes node 12.4.3 with the sid of present 1.41,
// s-uw9n84edf7cbe9n: 1.41 is then not archived, and the map's citation and the tools' tests stay valid. That undoes the
// owner's merge of 2026-11-09, so it is put to the owner. "Stands" becomes "comes", as the owner prefers for a position.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));

d["12.4.2"].proposals = [
  {
    where: "текст и обоснование; порядок доменов уходит в новый узел 12.4.3",
    en: [
      "Title: The diagram of the domains",
      "",
      "Text: The SpecSheriff tools draw a diagram of the domains that shows which domains each domain uses (§s-yggv9myedprnaa7). On the diagram:",
      "",
      "- domains of the same level are placed in one row;",
      "- the smaller a level's number, the higher its row;",
      "- domains whose header names no level are placed in a row of their own, below the rows of the levels;",
      "- the domains in each row follow the order of the domains (§s-uw9n84edf7cbe9n).",
      "",
      "Reason: A drawing of the domains made by hand drifts from their headers. Every such drawing is also laid out in its own way. The diagram that the tools draw from the headers in one layout shows the architecture of the whole system as the specification states it.",
    ].join("\n"),
    ru: [
      "Заголовок: Схема доменов",
      "",
      "Текст: Инструменты SpecSheriff строят схему доменов, на которой видно, какими доменами пользуется каждый домен (§s-yggv9myedprnaa7). На схеме:",
      "",
      "- домены одного уровня выстраиваются в одну линию;",
      "- чем меньше номер уровня, тем выше его линия;",
      "- домены, в заголовке которых уровень не назван, выстраиваются в отдельную линию ниже линий всех уровней;",
      "- домены каждой линии идут в порядке доменов (§s-uw9n84edf7cbe9n).",
      "",
      "Обоснование: Схема доменов, нарисованная вручную, расходится с их заголовками. К тому же каждая такая схема разложена по-своему. Схема, которую инструменты строят из заголовков по одной раскладке, показывает архитектуру всей системы такой, какой её описывает спецификация.",
    ].join("\n"),
    why: "По замечаниям рецензента: названо, кто строит схему и что на ней видно; правила расположения — списком; сказано, где домен без уровня; обоснование говорит, зачем схема строится инструментами.",
  },
];

d["12.4.3"] = {
  from: "1.41",
  sid: "kept",
  title: "The order of the domains",
  text: "The SpecSheriff tools show the domains in one order, computed from the `consumes` links of their headers:\n\n- each domain comes after every domain it uses;\n- it comes as close as possible before the first domain that uses it;\n- where the links put two domains in the same place, they come in the order of their names.",
  reason: "Computed from the links alone, the order cannot disagree with them. The map of the specification and the diagram of the domains therefore show the domains in the same order.",
  examples: [
    "Requests uses accounts, and billing uses no domain and is used by none. The order is billing, accounts, requests: accounts comes right before requests, not first by its name.",
  ],
  ruTitle: "Порядок доменов",
  ruText: "Инструменты SpecSheriff показывают домены в одном порядке, вычисленном по связям `consumes` их заголовков:\n\n- каждый домен идёт после всех доменов, которыми пользуется;\n- он идёт как можно ближе перед первым доменом, который им пользуется;\n- если связи ставят два домена на одно место, они идут в порядке своих имён.",
  ruReason: "Порядок вычисляется только из связей, поэтому не расходится с ними. Поэтому карта спецификации и схема доменов показывают домены в одном порядке.",
  ruExamples: [
    "Домен requests пользуется accounts, а billing ничем не пользуется, и им никто не пользуется. Порядок: billing, accounts, requests — accounts идёт прямо перед requests, а не первым по имени.",
  ],
  changes: [
    "Предложение рецензента: порядок доменов — отдельный узел, потому что карта спецификации применяет его без линий схемы, а тесты инструментов проверяют его отдельно. Это отменяет ваше решение от 9 ноября включить порядок в схему, поэтому решать вам.",
    "Сохраняет sid нынешнего 1.41: тогда 1.41 не уходит в архив, а ссылка карты на него и тесты инструментов остаются верны.",
    "Текст — нынешний 1.41 и абзац из согласованного 12.4.1; подлежащее — инструменты SpecSheriff, «stands» заменено на «comes»; «перед первым доменом, который им пользуется» уточняет «перед доменами», как это делает тест инструментов.",
    "Обоснование и пример новые.",
  ],
  sidValue: "s-uw9n84edf7cbe9n",
};
const ordered = {};
for (const [k, v] of Object.entries(d)) {
  if (k === "12.4.3") continue;
  ordered[k] = v;
  if (k === "12.4.2") ordered["12.4.3"] = d["12.4.3"];
}
fs.writeFileSync(file, JSON.stringify(ordered, null, 2) + "\n");

const pageFile = new URL("base-structure.html", here);
let page = fs.readFileSync(pageFile, "utf8");
const row = `["12.4.2","new",0,"","The diagram of the domains","Схема доменов","","",[],""]`;
if (!page.includes(row)) throw new Error("row 12.4.2 not found");
page = page.replace(row, row + `,\n      ["12.4.3","move",0,"1.41","The order of the domains","Порядок доменов"]`);
fs.writeFileSync(pageFile, page);
console.log("12.4.2 proposal and 12.4.3 written");
