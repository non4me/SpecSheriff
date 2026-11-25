// Check 10.1.4: the owner accepted proposal 1 and agreed to the check (2026-11-12, «1 правка и согласовано»). The
// optional reason, proposal 2, was not taken, so the check has no reason of its own.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.4");
const [text] = r.proposals;
r.en = text.en;
r.ru = text.ru;
r.change =
  "«No two nodes share a location» стало «No two nodes of the specification share a location»: архивный узел хранит своё прежнее расположение, " +
  "и проверка, как и согласованная 10.1.3, говорит только об узлах спецификации. Принято вами 2026-11-12; необязательное обоснование вы не взяли.";
delete r.proposals;
r.agreed = "2026-11-12";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, r.en, "| agreed", r.agreed);
