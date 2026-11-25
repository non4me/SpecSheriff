// The node on revising a rule, now 7.13, by the owner's ruling on reasons: it names who acts, and it speaks of whether the rule still
// has a reason, so a rule that has found another ground is not removed. Its reason says why it exists, in one sentence.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["7.13"];
if (n.sidValue !== "s-r6w57zzaccby4gc") throw new Error("7.13 is another node");
n.text = "Whoever revises a rule first checks why it exists. Where there is no longer a reason for it, they remove the rule and do not reword it.";
n.ruText = "Тот, кто пересматривает правило, сначала проверяет, зачем оно существует. Если причины для него больше нет, он удаляет правило, а не переформулирует его.";
n.reason = "Reworded, a rule with no reason left would keep a requirement nobody needs.";
n.ruReason = "Переформулированное правило, у которого не осталось причины, сохранило бы требование, которое никому не нужно.";
n.changes = [
  "Заголовок новый. Узел взят из абзаца 3 нынешнего 1.12.",
  "Назван тот, кто пересматривает правило.",
  "Условие теперь говорит, что причины для правила больше нет: правило, у которого появилось другое основание, не удаляют.",
  "Обоснование сокращено до одной фразы.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
