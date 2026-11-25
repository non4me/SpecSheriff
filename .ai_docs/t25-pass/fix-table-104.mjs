// The owner accepted the split of check 10.1.26 (2026-11-13, «ок»), so it is agreed: 10.1.26 for code and the new 10.1.26a
// for tests, in the wordings of fix-table-103.mjs, and 10.1.29 is deleted, since 10.1.26 now contains its requirement.
// Accepting a final wording is agreeing to it (.claude/vt/rules.md).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

for (const num of ["10.1.26", "10.1.26a"]) {
  const r = rows.find((x) => x.num === num);
  const [en, cost] = r.proposals[0].en.split(" | ");
  const [ru, ruCost] = r.proposals[0].ru.split(" | ");
  Object.assign(r, { en, cost, ru, ruCost });
  r.change =
    (num === "10.1.26"
      ? "Проверка разделена по вашему решению (2026-11-13): эта — только о коде, «реализующий код системы» (9.1); в неё вошла 10.1.29. "
      : "Новая проверка, по вашему решению (2026-11-13): только о тестах; место SpecTag — как его ставит описание инструментов для языка теста (узел 9). ") +
    "Вы приняли эту формулировку в тот же день.";
  delete r.proposals;
  r.agreed = "2026-11-13";
}
const z = rows.find((x) => x.num === "10.1.29");
z.fate = "deleted";
z.change = "Удаляется (вы, 2026-11-13): её требование — последнее предложение новой 10.1.26. Строка ни разу не одобрялась в новой форме, поэтому удаляется, а не уходит в архив.";
delete z.proposals;
delete z.agreed;
z.num = null;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.26, 10.1.26a agreed; 10.1.29 deleted");
const next = rows.find((x) => x.num === "10.1.31");
console.log(JSON.stringify(next, null, 1));
