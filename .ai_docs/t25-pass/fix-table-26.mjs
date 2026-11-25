// Check 10.1.3: the owner took both proposals (2026-11-12, «оба»): the text names the archive, and the reason says why
// an archived node's sid is never given to another. Taking them is no agreement to the node, which is asked apart.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.3");
const [text, reason] = r.proposals;
r.en = text.en;
r.ru = text.ru;
r.reason = reason.en.replace(/^Reason: /, "");
r.ruReason = reason.ru.replace(/^Обоснование: /, "");
r.change =
  "«No two nodes share a sid» стало «No two nodes, including those in the archive, share a sid»: рядом с 10.1.4, где те же слова означают только узлы вне архива, не было видно, входит ли архив. " +
  "Добавлено обоснование: почему sid архивного узла не отдают другому. Оба предложения приняты вами 2026-11-12.";
delete r.proposals;
delete r.noReason;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.3:", r.en, "|", r.reason);
