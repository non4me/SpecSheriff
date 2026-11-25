// The owner of 2026-11-12 on check 10.1.1: «1 и согласовано» — the reviewer's "No object in a file…" taken, and the
// check agreed with its reason.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.1");
r.en = r.proposal.en;
r.ru = r.proposal.ru;
delete r.proposal;
r.change = "«No file … gives one property two values» стало «No object in a file … gives one property two values»: «одному свойству» не говорило, какого объекта. Добавлено обоснование.";
r.agreed = "2026-11-12";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, r.en, "| agreed", r.agreed);
