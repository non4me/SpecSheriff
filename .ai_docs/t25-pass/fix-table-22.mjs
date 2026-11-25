// The owner of 2026-11-12 dictated check 10.1.2: «Каждый файл спецификации соответствует своей JSON-схеме.» Its English
// waits on the owner's word; the proposals it replaces go.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.2");
r.en = "Every file of the specification matches its JSON Schema";
r.ru = "Каждый файл спецификации соответствует своей JSON-схеме";
delete r.proposals;
r.noReason = "Своего обоснования нет: зачем эта проверка, говорит обоснование согласованного 5.1, которое она охраняет, — оно показано ниже.";
r.change = "Было «Every file matches its schema». Теперь ваши слова: «Каждый файл спецификации соответствует своей JSON-схеме»; английский ждёт вашего подтверждения.";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.en, "|", r.ru);
