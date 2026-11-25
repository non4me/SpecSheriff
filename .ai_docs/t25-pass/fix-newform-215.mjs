// The owner of 2026-11-11 on 10.11 (generated copies), the whole proposal chosen: the SpecSheriff tools are the
// subject (7.3, as agreed 1.3.8 and 9.6), "the map of the specification" (7.8); the paragraph on a kept copy goes to
// the extension 12.5, since in the base no generated copy is kept, and with it "checked against the nodes" leaves
// the reason.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["10.11"];
if (b.sidValue !== "s-kh8qcd5kxgh9z3j" || b.agreed) throw new Error("unexpected 10.11");

b.text = "The SpecSheriff tools regenerate whatever is generated from the nodes after every change to them. Nobody edits it by hand. Nobody reads anything from it back into the specification. Examples are:\n- a readable export, for example in markdown;\n- the map of the specification;\n- the instructions an agent reads.";
b.ruText = "Инструменты SpecSheriff заново генерируют всё, что генерируется из узлов, после каждого изменения узлов. Вручную это никто не редактирует. Никто ничего не переносит из этого обратно в спецификацию. Примеры:\n- читаемый экспорт, например в markdown;\n- карта спецификации;\n- инструкции, которые читает агент.";
b.reason = "A copy that is edited, fed back into the nodes or left behind them becomes a second version of the rules, and sooner or later the two differ. Regenerated at every change, a copy stays a view of the one source of truth (§s-xqs2e24mx5253ye).";
b.ruReason = "Копия, которую правят, переносят обратно в узлы или оставляют отставать от них, становится второй версией правил, и рано или поздно две версии расходятся. Генерируемая заново при каждом изменении, копия остаётся представлением единственного источника правды (§s-xqs2e24mx5253ye).";
b.changes.push(
  "По вашему решению от 11 ноября узел перенесён из 1.2 в раздел 10, сразу за 10.10: он о том, как работает генерация, а не о правиле.",
  "По вашему выбору: подлежащее — инструменты SpecSheriff, как в согласованных 1.3.8 и 9.6; «карта» стала «картой спецификации»; абзац «Where a generated copy is kept, it is checked against what the nodes produce» ушёл в расширение 12.5, потому что в базе хранимых копий нет, а вместе с ним из обоснования ушло «сверяемая с узлами».",
);
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
