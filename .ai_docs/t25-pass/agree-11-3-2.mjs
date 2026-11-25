// Row 11.3.2 and the change to 11.1.3 are agreed (the owner, 2026-11-18: «Окей, оставляем - согласованно»).
// Writes the accepted sentence into 11.1.3, which remains agreed, and marks row 11.3.2 agreed.
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");

const t = read("table-11-3.json");
const r = t.tables[0].rows.find((x) => x.num === "11.3.2");
r.agreed = "2026-11-18";
delete r.proposals;
r.change += " Вы согласовали её 18 ноября вместе с правкой 11.1.3: требование стоит в 11.1.3, а эта строка — его проверка, как в таблице 10.1.";
write("table-11-3.json", t);

const nf = read("newform.json");
const n = nf["11.1.3"];
const p = n.proposals?.[0];
if (!p) throw new Error("no proposal on 11.1.3");
n.text = n.text.split(p.replaces.en).join(p.en);
n.ruText = n.ruText.split(p.replaces.ru).join(p.ru);
if (!n.text.includes(p.en) || !n.ruText.includes(p.ru)) throw new Error("11.1.3 not changed");
n.changes.push("Вы приняли 18 ноября («Окей, оставляем - согласованно») правку по вашему решению: указатель в заголовке обязателен, только если у домена есть разделы, — маленький домен может их не иметь. Согласование сохраняется.");
delete n.proposals;
write("newform.json", nf);
console.log("11.1.3:", p.en);
