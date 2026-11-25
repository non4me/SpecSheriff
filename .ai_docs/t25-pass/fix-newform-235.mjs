// Node 6.1 "What a link is": the owner accepted its proposal (2026-11-12, «беру»), so the line for the link type
// `supersedes` leaves the list, and the node stays agreed with that change (.claude/vt/rules.md).
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["6.1"];
const en = "- `supersedes` — the linking node replaces the linked node, which is archived.\n";
const ru = "- `supersedes` — связывающий узел заменяет связанный, который уходит в архив.\n";
if (!n.text.includes(en) || !n.ruText.includes(ru)) throw new Error("6.1: the supersedes line has changed");
n.text = n.text.replace(en, "");
n.ruText = n.ruText.replace(ru, "");
delete n.proposals;
n.agreed = "2026-11-12";
n.changes.push("Вы приняли предложение (2026-11-12): тип связи supersedes убран из списка, потому что архивный узел не имеет sid.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n").filter((l) => l.startsWith("- ")).map((l) => l.slice(0, 18)).join(" | "));
