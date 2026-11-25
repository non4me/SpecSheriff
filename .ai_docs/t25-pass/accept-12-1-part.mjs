// The owner accepted the definition of a part of the system in 12.1 on 2026-11-19 («ок»). Writes it into the
// draft, which remains agreed.
import fs from "node:fs";
const file = new URL("newform.json", import.meta.url);
const nf = JSON.parse(fs.readFileSync(file, "utf8"));
const n = nf["12.1"];
const { en, ru } = n.proposals[0].pairs[0];
if (!n.text.includes(en.from) || !n.ruText.includes(ru.from)) throw new Error("12.1 paragraph not found");
n.text = n.text.split(en.from).join(en.to);
n.ruText = n.ruText.split(ru.from).join(ru.to);
n.changes.push("Вы приняли 19 ноября («ок») определение части системы: в спецификации её описывает раздел верхнего уровня базовой спецификации или домен, в коде это модуль или компонент. Согласование сохраняется.");
delete n.proposals;
fs.writeFileSync(file, JSON.stringify(nf, null, 2) + "\n");
console.log("12.1:", n.text.split("\n\n")[1]);
