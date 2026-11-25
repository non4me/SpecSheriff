// Records row 12.12.16 and the new row after it as agreed, which completes table 12.12; renumbers the rows in the order
// of the table, a mechanical change; and gathers the English of the rows the owner agreed on 2026-11-19 for
// EngStickler's thorough reader.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const tFile = new URL("table-12-12.json", here);
fs.copyFileSync(tFile, new URL("table-12-12.before-renumber.json", here));
const t = JSON.parse(fs.readFileSync(tFile, "utf8"));
const rows = t.tables[0].rows;

for (const r of rows.filter((x) => x.num === "12.12.16" || x.n === 26.5)) {
  const p = r.proposals[0];
  r.en = p.en;
  r.ru = p.ru;
  delete r.proposals;
  r.agreed = "2026-11-19";
  r.change += " Вы согласовали её 19 ноября («ок»).";
}

const renumbered = [];
let i = 0;
for (const r of rows) {
  if (r.fate === "deleted") continue;
  const next = `12.12.${++i}`;
  if (r.num !== next) {
    renumbered.push(`${r.num ?? "новая"} → ${next}`);
    r.change += ` Номер строки — ${next}: 19 ноября строки перенумерованы по порядку таблицы, после того как вы согласовали её целиком.`;
  }
  r.num = next;
}
fs.writeFileSync(tFile, JSON.stringify(t, null, 2) + "\n");

const agreedToday = rows.filter((r) => r.agreed === "2026-11-19" && r.fate !== "deleted");
const md = [
  "# The English of the rows of table 12.12 that the owner agreed on 2026-11-19",
  "",
  ...agreedToday.map((r) => `- ${r.num}: ${r.en}`),
  "",
].join("\n");
fs.writeFileSync(new URL("english-12-12.md", here), md);
console.log(renumbered.join("; "));
console.log(md);
