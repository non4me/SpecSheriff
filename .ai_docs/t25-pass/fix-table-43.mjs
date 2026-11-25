// Check 10.1.8 is agreed with its three proposals (the owner, 2026-11-12: «сам узел согласован», after the wording with all
// three was shown). The approvals are to move into the nodes in T28, which leaves the base wording as it is: the base speaks
// of an approval of the current wording being in force, whatever keeps it.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.8");
r.en =
  "Every node of the specification outside the SpecSheriff guidelines a project uses, except a section, is approved only while an approval of its current wording is in force";
r.ru =
  "Каждый узел спецификации вне SpecSheriff guidelines, которые использует проект, кроме раздела, одобрен, только пока в силе одобрение его нынешней формулировки";
r.change =
  "Вы приняли все три предложения и согласовали проверку (2026-11-12): заголовок домена ушёл в расширение «Домены»; «uses», как в 2.4 и 1.3.7; " +
  "слова 1.3.3 вместо «отпечатка»; «узел спецификации», так как у архивного узла нет sid. Как хранится одобрение — в журнале или, после T28, в самом узле, — решает описание инструментов.";
delete r.proposals;
r.agreed = "2026-11-12";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, r.en, "| agreed", r.agreed);
