// Check 10.1.32: the owner objected to «несёт» in the Russian (2026-11-13: «несёт - опять?»). The owner's renderings
// (terms-ru.md) and the agreed checks 10.1.26 and 10.1.26a say «есть SpecTag». The Russian of the approved words and of the
// proposal follow them; the English is unchanged.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.32");
r.ru = "У каждого теста собственной проверки или генератора проекта есть SpecTag правила, которое его перечисляет, а у теста, который коммит добавляет или меняет, — SpecTag одобренного правила";
r.proposals[0].ru = "У каждого теста собственной проверки проекта есть SpecTag правила, которое перечисляет эту проверку | отклоняется";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].ru);
