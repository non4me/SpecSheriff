// Node 2.5 "The archive" is agreed (the owner, 2026-11-12: «я уже согласовал текст узла»): the text with the five
// proposals the owner accepted, and the reason from proposal 6. The reviewer's proposals 1 to 5 are withdrawn.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["2.5"];
delete n.proposals;
delete n.agreedBefore;
n.agreed = "2026-11-12";
n.changes.push(
  "Вы согласовали узел (2026-11-12): текст с пятью принятыми предложениями и обоснование из предложения 6. Остальные предложения рецензента сняты."
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("2.5 agreed", n.agreed);
