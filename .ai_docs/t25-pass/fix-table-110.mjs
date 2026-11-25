// Check 10.1.26a: the owner's new wording of draft 10.8 (2026-11-13) says a SpecTag is used only in the code and the tests
// that implement the system, so "of the system's code" comes back into 10.1.26a. Shown to the owner with 10.8, as one
// proposal; the row keeps its agreed wording until the owner accepts it.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const a = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.26a");
a.proposals = [
  {
    en: "Every test of the system's code carries a SpecTag that names the rule it tests. The SpecTag is placed where the appendix of the tools prescribes for the test's language | refused",
    ru: "У каждого теста кода системы есть SpecTag, который ссылается на правило, которое тест проверяет. SpecTag стоит там, где его ставит описание инструментов для языка теста | отклоняется",
    why: "Следует из новой формулировки 10.8: SpecTag есть только в коде и тестах системы. Возвращаются слова «кода системы».",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.26a proposal:", a.proposals[0].ru);
