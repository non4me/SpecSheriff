// Node 2.5 "The archive": the owner accepted proposal 6, the reason rewritten as a whole (2026-11-12, «принимаю тот
// текст что в пункте 6»). Proposals 1 to 5 still wait for the owner's answer.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["2.5"];
const i = n.proposals.findIndex((x) => x.where === "обоснование целиком вместо нынешнего");
if (i !== 5) throw new Error("2.5: the proposal for the reason is not the sixth");
const [p6] = n.proposals.splice(i, 1);
n.reason = p6.en;
n.ruReason = p6.ru;
n.changes.push(
  "Вы приняли предложение 6 (2026-11-12): обоснование переписано целиком. Оно говорит, зачем хранить удалённые одобренные правила, " +
    "почему не хранить остальное и почему ничто не может ссылаться на архивный узел."
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.proposals.map((x, k) => k + 1 + ". " + x.where).join("\n"));
