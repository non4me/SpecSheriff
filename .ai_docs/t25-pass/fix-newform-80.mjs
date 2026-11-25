// The reviewer's wording of the reason of 2.1 after the limit on naming a technology left the guidelines. "One toolset" stays:
// it is true without the limit, and the owner agreed to it.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["2.1"];
const swap = (field, a, b) => { if (!n[field].includes(a)) throw new Error("missing: " + a); n[field] = n[field].replace(a, b); };
swap("reason", "How one toolset carries a rule out changes with that toolset, while the rule stays.", "The tools can change while the rule they carry out stays, so the requirements for them stand apart from the rules.");
swap("ruReason", "То, как один набор инструментов выполняет правило, меняется вместе с этим набором, а правило остаётся.", "Инструменты могут меняться, а правило, которое они выполняют, остаётся, поэтому требования к ним стоят отдельно от правил.");
n.changes = n.changes.map(c => c.startsWith("Первый абзац обоснования заменён") ? "Первый абзац обоснования заменён одной фразой в формулировке рецензента, второй абзац — из нынешнего обоснования 1.21, дословно. Связь со ссылкой на узел о технологиях уходит вместе с абзацем." : c);
n.changes.push("Слова «один набор инструментов» оставлены: они верны и без запрета.", "После вашего согласия те же слова о запрете будут убраны из CLAUDE.md и docs/README.md.");

const base = d["1.1.4"];
base.changes = base.changes.map(c => c.replace(" — 4.3, 4.4, 4.1 и обоснование 2.3.", " — 4.3, 4.4 и 4.1."));
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("2.1 reason:", n.reason.split("\n")[0]);
