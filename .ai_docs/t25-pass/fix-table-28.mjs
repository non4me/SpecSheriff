// Check 10.1.3: the owner took the reviewer's proposal (2026-11-12, «Заменяй»): the reason's first sentence names every
// way an archived node is named by its sid, not only a `supersedes` link. The second sentence stays.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.3");
r.reason = "A `supersedes` link and a citation in the code, the tests or the documents may name an archived node by its sid. Given to another node, that sid would name two nodes.";
r.ruReason = "Связь `supersedes` и ссылка в коде, тестах или документах могут называть архивный узел по его sid. Данный другому узлу, этот sid называл бы два узла.";
r.change += " По замечанию рецензента первое предложение обоснования заменено, принято вами 2026-11-12: теперь оно называет и ссылки в коде, тестах и документах, а не только связь `supersedes`.";
delete r.proposals;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.3 reason:", r.reason);
