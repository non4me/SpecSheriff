// Node 4.4, second version: an entry of the technical debt is the description of a shortcoming, and a reason is not required
// of it (the owner, 2026-11-09), in the reviewed wording. Agreed 1.2.3 follows, keeping its agreement.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["4.4"];

n.text = "The section of the technical debt lists the accepted shortcomings in the internal quality of the system's implementation. The system still does what the rules require. A defect is not technical debt.\n\nThe description of a shortcoming need not carry a reason. It may refine the nodes it concerns. Where the shortcoming lies in a technology the implementation uses, its description names the version of that technology it was seen in.\n\nStanding there is the whole of the choice to accept the shortcoming:\n\n- no decision records that choice;\n- the change that removes the shortcoming removes its description.";
n.ruText = "Раздел технического долга перечисляет осознанно принятые недостатки внутреннего качества реализации системы. Система при этом делает то, что требуют правила. Дефект техническим долгом не является.\n\nОписание недостатка не обязано содержать обоснование. Оно может уточнять узлы, которых касается. Если недостаток кроется в технологии, которую использует реализация, его описание называет версию этой технологии, в которой он замечен.\n\nНахождение там и есть весь выбор принять недостаток:\n\n- решение об этом выборе нигде не записывается;\n- изменение, которое устраняет недостаток, удаляет его описание.";

const swap = (m, field, from, to) => {
  if (!m[field].includes(from)) throw new Error("not found: " + from);
  m[field] = m[field].replace(from, to);
};
swap(n, "reason", "So a reason or a decision of its own would only repeat its standing.", "So its standing already says why, and a decision of its own would only repeat it.");
swap(n, "ruReason", "Поэтому собственное обоснование или решение только повторяло бы сам факт его нахождения там.", "Поэтому сам факт его нахождения там уже говорит почему, а собственное решение только повторяло бы это.");
swap(n, "reason", "Described as it stands and bound to the nodes it concerns, a shortcoming tells", "Bound to the nodes it concerns, a shortcoming tells");
swap(n, "ruReason", "Описанный таким, какой он есть, и связанный с узлами, которых касается, недостаток", "Связанный с узлами, которых касается, недостаток");
n.changes.push("По вашему решению запись называется описанием недостатка и не обязана содержать обоснование. Формулировка прошла рецензента.");

const c = d["1.2.3"];
swap(c, "text", "A rule of the technical debt may be an exception: its text describes a shortcoming as it stands and may need no reason", "The description of a shortcoming in the technical debt may be an exception: it may carry no reason");
const ru = c.ruText.match(/Исключение может быть у правила технического долга:[^(]*\(/);
if (!ru) throw new Error("not found in 1.2.3 ruText");
c.ruText = c.ruText.replace(ru[0], "Исключение может быть у описания недостатка в техническом долге: оно может не содержать обоснования (");
c.changes.push("Вслед за вашим решением о техническом долге: описание недостатка вместо правила.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
console.log("---");
console.log(c.ruText.split(/(?<=[.])\s+/).filter(x => x.includes("Исключение")).join(" "));
