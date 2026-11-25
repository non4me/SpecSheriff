// The owner, 2026-11-08: 1.2.5 mixed two rules. The direction of change stands in 1.5.1; 1.2.5 keeps
// the other, rewritten whole with its title at the owner's request, around the owner's meaning: there
// is one source of truth, and it is the specification, not the code. Only the last paragraph of the
// present reason stays, the one the owner found sound.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.2.5"];
if (n.from !== "1.14") throw new Error("1.2.5 is not from 1.14");
n.title = "The one source of truth is the specification, not the code";
n.ruTitle = "Один источник правды — в спецификации, а не в коде";
n.text = "The one source of truth about the system is the specification, not the code. Everything the system is made of is defined in the specification: its logic and its structures, such as a set of states, a list of members or a table of routes. The code implements it and holds nothing of its own.\n\nThe code is checked against the specification. A rule that leaves its content to the code is a defect. It is repaired when the rule is revised.";
n.ruText = "Один источник правды о системе — спецификация, а не код. Всё, из чего состоит система, определено в спецификации: её логика и её структуры, например набор состояний, список членов или таблица маршрутов. Код это реализует и не держит ничего своего.\n\nКод сверяется со спецификацией. Правило, которое оставляет своё содержание коду, — дефект. Его исправляют, когда это правило пересматривают.";
n.reason = "Two sources of truth sooner or later disagree, and then nobody knows which of them holds. The code cannot be the source, since code cannot be checked against itself.\n\nHeld in the specification and checked against the code, the content is in one place, and the disagreement is found by a machine.";
n.ruReason = "Два источника правды рано или поздно расходятся, и тогда никто не знает, какой из них верен. Код источником быть не может: сверить код с самим собой нельзя.\n\nКогда содержание держит спецификация и оно сверяется с кодом, оно находится в одном месте, а расхождение находит машина.";
n.changes = [
  "Узел переписан целиком, вместе с заголовком, по вашему решению: в нынешнем 1.14 смешаны два правила. О направлении изменений говорит 1.5.1; здесь осталось второе, в вашем смысле — один источник правды, и он в спецификации, а не в коде.",
  "Из нынешнего 1.14 по смыслу сохранены: примеры структур (набор состояний, список членов, таблица маршрутов), сверка кода со спецификацией и то, что правило, отдающее своё содержание коду, — дефект, который исправляют при пересмотре.",
  "Обоснование: первый абзац новый; второй — нынешний, дословно.",
  "Сохраняет sid 1.14.",
];
delete n.agreed;
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.ruTitle, "\n", n.ruText, "\n---\n", n.ruReason);
