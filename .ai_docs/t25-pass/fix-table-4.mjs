// The owner of 2026-11-11: one link, `refines`, covers both refining and extending, since the line between them is
// thin and no check could tell them apart; the row of table 10.1 says "refines or extends" and is checked by that
// one link; agreed 6.1's meaning of `refines` is widened at its turn, right after 10.1.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((r) => r.n === 42);
if (!r) throw new Error("no row");
r.change = "Ушло «или реализует»: по вашему решению от 8 ноября guidelines проекта никогда не реализуют SpecSheriff guidelines. По вашему решению от 11 ноября — «уточняет или расширяет», как в согласованном 2.3; оба случая держит одна связь `refines`, значение которой в 6.1 расширяется: граница между ними тонкая, и проверка их не различит.";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("ok");
