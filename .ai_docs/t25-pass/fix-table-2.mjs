// The owner of 2026-11-11 on row 40 of table 10.1: it goes back to its present meaning, "stands under the name of a
// domain", and leaves the main rules for the extension Domains (12.2, the division into domains), where the tools'
// check of an appendix file against a domain's name belongs; agreed 1.1.2 governs the main rules without a row.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((r) => r.n === 40);
if (!r) throw new Error("no row 40");
r.en = "Every section of the technical appendix but those of the stack and of the technical debt stands under the name of a domain";
r.ru = "Каждый раздел технического приложения, кроме разделов стека и технического долга, находится под именем домена";
r.fate = "to 12.2 Domains";
r.change = "По вашему решению от 11 ноября строка вернулась к прежнему смыслу и уходит в расширение «Домены» (12.2): инструменты сверяют имя файла приложения с именем домена. В основных правилах её место держит согласованный 1.1.2.";
t.doubts = t.doubts.filter((d) => !d.startsWith("Строка 40"));
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.fate, "| doubts left:", t.doubts.length);
