// Node 9.1: the owner accepted the proposal of fix-newform-268.mjs and fix-newform-269.mjs (2026-11-14, «ок»), so the
// node is agreed in the wording that includes it.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["9.1"];
const p = n.proposals[0];
const [en, enReason] = p.en.replace(/^Text: /, "").split("\n\nReason: ");
const [ru, ruReason] = p.ru.replace(/^Текст: /, "").split("\n\nОбоснование: ");
if (!enReason || !ruReason) throw new Error("9.1 proposal does not split into text and reason");
n.text = en;
n.reason = enReason;
n.ruText = ru;
n.ruReason = ruReason;
delete n.proposals;
n.agreed = "2026-11-14";
n.changes.push(
  "Вы приняли предложение (2026-11-14): «все части спецификации, кроме её guidelines»; тесты — отдельным предложением; убраны слова «написанный вручную»; убрана ссылка на узел о генераторах проекта; в обосновании ваш довод о том, что тесты пишут раньше кода, со ссылкой на 1.4.1.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("9.1 agreed");
