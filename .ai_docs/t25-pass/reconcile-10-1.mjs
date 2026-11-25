// Reconciles the two versions of node 10.1 before the drafts are moved into the specification files.
// The head in table-10-1.json stands, since the owner agreed to it as a TableRule. The draft in newform.json
// is the old text node, whose reason the owner changed on 2026-11-17. Those paragraphs move into the reasons
// of the checks they explain, as the head's list of changes, accepted on 2026-11-11, says.
// This script proposes the reason of row 10.1.40 and records the reconciliation on the page.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const path = new URL("table-10-1.json", here);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const row = rows.find((r) => r.num === "10.1.40");
if (!row) throw new Error("row 10.1.40 not found");

row.proposals = [
  {
    en: "Reason: When a rule runs ahead of its tests or its code, or tests run ahead of the code, that is drift worth knowing about. The drift is not the fault of whoever made the commit that revealed it. So this check only reports the drift.",
    ru: "Обоснование: Правило, обогнавшее свои тесты или код, или тесты, обогнавшие код, — это расхождение, о котором стоит знать, и не вина того, чей коммит его обнаружил. Поэтому эта проверка только сообщает о расхождении.",
    why: "Это абзац прежнего обоснования 10.1 в редакции, которую вы согласовали 17 ноября, дословно. Изменена одна фраза: «Поэтому проверка расхождения только сообщает» стала «Поэтому эта проверка только сообщает о расхождении», так как обоснование теперь стоит у самой проверки. Перенос следует из списка изменений шапки 10.1, который вы приняли 11 ноября: «почему некоторые проверки только сообщают, перейдёт в обоснования этих проверок».",
  },
];

const line = "19 ноября, при переносе черновиков в файлы спецификации: остаётся эта шапка. Черновик 10.1 в newform.json — прежний текстовый узел; 17 ноября вы согласовали в нём правки обоснования. Абзацы этого обоснования переходят туда, где их обещал этот список изменений: о расхождении — в обоснование строки 10.1.40; о несделанном одобренном правиле — в обоснование строки 10.1.41; о том, что проверка читает делаемый коммит, — в обоснование узла описания инструментов «The hooks», когда до него дойдёт очередь. Абзац о коде и тестах без SpecTag не переносится: его причины даёт 9.5, на который ссылаются строки 10.1.26 и 10.1.26a.";
if (!t.head.changes.includes(line)) t.head.changes.push(line);

const doubt = "Сейчас обсуждается обоснование строки 10.1.40, перенесённое из прежнего обоснования 10.1. Следующим будет обоснование строки 10.1.41.";
t.doubts = [doubt];

fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("row 10.1.40: reason proposed; head: reconciliation recorded");
