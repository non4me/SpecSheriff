// The owner accepted the follow-up proposals for 1.6.1, 10.2 and 10.6 on 2026-11-18 («ок»): each now names
// the tables that refine the table of checks. Writes them into the drafts, which remain agreed.
import fs from "node:fs";
const file = new URL("newform.json", import.meta.url);
const nf = JSON.parse(fs.readFileSync(file, "utf8"));
for (const k of ["1.6.1", "10.2", "10.6"]) {
  const n = nf[k];
  const p = n.proposals?.[0];
  if (!p?.pairs) throw new Error("no proposal on " + k);
  for (const { en, ru } of p.pairs) {
    if (!n.text.includes(en.from) || !n.ruText.includes(ru.from)) throw new Error(k + ": text to replace not found");
    n.text = n.text.split(en.from).join(en.to);
    n.ruText = n.ruText.split(ru.from).join(ru.to);
  }
  n.changes.push("Вы приняли 18 ноября («ок») правку по вашему решению о таблицах проверок расширений: узел называет и таблицы, уточняющие таблицу проверок. Согласование сохраняется.");
  delete n.proposals;
}
fs.writeFileSync(file, JSON.stringify(nf, null, 2) + "\n");
console.log("1.6.1, 10.2, 10.6 changed");
