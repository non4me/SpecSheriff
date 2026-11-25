// Check 10.1.3: the owner accepted both proposals (2026-11-12, «оба»). The archive leaves the check, and the reason now
// says why the check exists in the words of node 1.2.2. Accepting proposals is not agreement to the check, which is
// asked for separately.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.3");
const [text, reason] = r.proposals;
r.en = text.en;
r.ru = text.ru;
r.reason = reason.en.replace(/^Reason: /, "");
r.ruReason = reason.ru.replace(/^Обоснование: /, "");
r.change +=
  " После решения по архиву (2026-11-12) вы приняли оба новых предложения: архив из проверки ушёл, текст говорит об узлах спецификации; " +
  "обоснование теперь объясняет, зачем нужна проверка, словами правила 1.2.2.";
delete r.proposals;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.3:", r.en, "|", r.reason);
