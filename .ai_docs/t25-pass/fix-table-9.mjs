// The owner of 2026-11-11: the node is enough named "The table of checks" (what each failure costs is the table's
// column, not its name).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
t.head.title = "The table of checks";
t.head.ruTitle = "Таблица проверок";
const i = t.head.changes.findIndex((c) => c.startsWith("Заголовок."));
if (i < 0) throw new Error("no title change");
t.head.changes[i] = "Заголовок. Был «What is checked, when, and what a failure costs»; теперь «The table of checks», по вашим словам: «когда» говорят согласованный 1.6.1 и 10.2, а цена непрохождения — колонка таблицы.";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(t.head.title, "|", t.head.ruTitle);
