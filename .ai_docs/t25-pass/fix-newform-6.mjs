// The owner's comments of 2026-11-07 on 1.1.1's reason: the first sentence, a remnant of the reason on
// generated copies, goes; the reason is the owner's own sentence on the links, without "an agent".
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.1.1"];
n.reason = "The structure of the specification and the links between its nodes help in understanding the context and the dependencies of each node.";
n.ruReason = "Структура и связи между узлами помогают понимать контекст и зависимости каждого узла.";
n.changes[2] = "Обоснование — ваша фраза из комментария. Нынешнее обоснование 1.1 целиком о сгенерированных копиях и уходит с ними в 11.1 и 11.2.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.reason);
