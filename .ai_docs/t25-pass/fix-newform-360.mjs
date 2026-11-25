// Node 7.2.7, after the first pass of the wording checker: the reason says once, without a redundant clause, why an
// explanation that comes later does not help.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-360.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.7"];
n.reason = "A reader who meets a term without its meaning guesses the meaning and applies the rule by that guess. An explanation further on comes only after the guess has been made.";
n.ruReason = "Читатель, встретивший термин без его значения, угадывает значение и применяет правило по этой догадке. Объяснение, данное дальше, приходит уже после того, как догадка сделана.";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
