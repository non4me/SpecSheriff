// Check 10.1.10 in the owner's own words (2026-11-13: «Статус одобрения раздела — консолидирует статус входящих в него
// узлов»), which take in both proposals: the domain's header is gone, and the status is the approval status. The English
// is written from the meaning of the Russian. The check's agreement is asked for separately.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.10");
r.en = "The approval status of a section combines the approval statuses of the nodes in it";
r.ru = "Статус одобрения раздела консолидирует статус входящих в него узлов";
r.change =
  "Ваша формулировка (2026-11-13): «Статус одобрения раздела — консолидирует статус входящих в него узлов»; тире перед глаголом убрано. " +
  "Она включает оба предложения: заголовка домена больше нет, речь о статусе одобрения. Английский написан по смыслу русского.";
delete r.proposals;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, r.en, "|", r.ru);
