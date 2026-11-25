// Check 10.1.22: the owner accepted the proposal (2026-11-13: «принимаю»): ", and every rule of the technical debt refines
// one" is removed, as agreed 4.4 says a description of a shortcoming may refine a node but need not. One fix to the English
// alone: "except a section" for the archaic "but a section"; the Russian «кроме раздела» stays. Its agreement is asked next.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.22");
r.en =
  "Every node of the technical appendix except a section, outside the sections of the stack and of the technical debt, implements a node of the base specification";
r.ru = "Каждый узел технического приложения, кроме раздела, вне разделов стека и технического долга, реализует узел базовой спецификации";
r.change =
  "Вы приняли предложение (2026-11-13): ушло «, и каждое правило технического долга уточняет такой узел», потому что по согласованному 4.4 описание недостатка может уточнять узел, но не обязано. " +
  "Только в английском: «except a section» вместо устаревшего «but a section»; русский не меняется.";
delete r.proposals;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.en);
