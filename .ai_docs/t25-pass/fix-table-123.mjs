// Check 10.1.37 is agreed unchanged (the owner, 2026-11-13, «ок»). The Russian rendering of check 10.1.38 is brought
// into line with its English wording, which does not change.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const a = rows.find((x) => x.num === "10.1.37");
a.change = "Вы согласились с проверкой без изменений (2026-11-13).";
a.agreed = "2026-11-13";

const b = rows.find((x) => x.num === "10.1.38");
b.ru =
  "Ни один файл репозитория, кроме спецификации и fixtures тестов проверки, которая читает ссылки или расположения (§s-6hha5en226aj8hu), не называет узел по его расположению";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.37 agreed; 10.1.38:", b.ru);
