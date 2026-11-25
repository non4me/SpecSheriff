// Row 12.12.4 and the paragraph for 12.6 are agreed (the owner, 2026-11-19, «ок»). Writes the paragraph into
// 12.6, which remains agreed, and marks the row agreed. Row 12.12.5 is shown next, in its approved wording.
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");

const t = read("table-12-12.json");
const rows = t.tables[0].rows;
const r4 = rows.find((r) => r.num === "12.12.4");
r4.en = r4.proposals[0].en;
r4.ru = r4.proposals[0].ru;
r4.agreed = "2026-11-19";
r4.change = `Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября. Вы согласовали её 19 ноября вместе с абзацем в 12.6: ${r4.proposals[0].why}`;
delete r4.proposals;
const r5 = rows.find((r) => r.num === "12.12.5");
r5.rests = ["s-z3dnru6qqdf9m6j"];
r5.impl = ["s-c2r9jndrjbtbsv6"];
r5.about = "Затрагивает каждый вариант RecordType. Без связи `refines` вариант не получает поля своего RecordType, и инструменты не знают, вариантом какого RecordType он является.";
write("table-12-12.json", t);

const nf = read("newform.json");
const n = nf["12.6"];
const { en, ru } = n.proposals[0].pairs[0];
if (n.text !== en.from || n.ruText !== ru.from) throw new Error("12.6 changed since the proposal");
n.text = en.to;
n.ruText = ru.to;
n.changes.push("Вы приняли 19 ноября («ок») абзац по вашему решению от 31 октября: поля своего варианта запись данных содержит в единственном поле типа `variant` своего RecordType. Согласование сохраняется.");
delete n.proposals;
write("newform.json", nf);
console.log("12.12.4 agreed; 12.6 changed");
