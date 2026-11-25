// Check 10.1.15 is agreed in the owner's words (2026-11-13, «ок»). Check 10.1.16 in the new form: what it touches and its
// test. It needs no proposal: its English already says "derived from" in place of "produce", following the Russian, and
// nothing in the archive ruling changes it, since agreed 6.4 already says that an archived node holds no incoming link.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.16");
r.about =
  "Затрагивает входящие связи каждого узла. Вручную их никто не пишет: `sheriff reindex` строит их заново из исходящих связей других узлов (правило 6.4). " +
  "Проверка пересобирает их в памяти и отклоняет файл, где они другие: значит, их правили вручную или не запустили reindex. " +
  "У архивного узла входящих связей нет; узел SpecSheriff guidelines держит только входящие связи из самих guidelines.";
r.tests = ["unit/validate.test.ts: refuses incoming links the outgoing ones do not produce"];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.16 prepared");
