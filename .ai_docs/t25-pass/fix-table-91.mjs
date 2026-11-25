// Check 10.1.27: the owner accepted the wording of fix-table-90.mjs (2026-11-13, «ок»). It becomes the row's wording;
// the owner is asked to agree to the check separately. The reading of its English changed two phrases and kept the
// meaning: "entry about" says what the entry does, and "as of the commit that adds it" cannot be read as the commit
// listing the owners itself.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.27");
r.en =
  "Each new entry recording the specification's approval status names one of the specification's owners as of the commit that adds it. " +
  "No commit removes or changes such an entry";
r.cost = "refused";
r.ru =
  "Каждая новая запись о статусе одобрения спецификации называет одного из ответственных за спецификацию, какими их указывает добавивший её коммит. " +
  "Ни один коммит не удаляет и не меняет такую запись";
r.ruCost = "отклоняется";
r.change =
  "Вы приняли эту формулировку (2026-11-13). По согласованному 10.6 спецификацию одобряет или возвращает в черновик отдельная запись её ответственного, правила-посредника нет. " +
  "Первое предложение проверяет, что запись сделал ответственный; второе не даёт изменить статус, удалив или поправив последнюю запись. Охраняет теперь только 10.6.";
delete r.proposals;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.en);
