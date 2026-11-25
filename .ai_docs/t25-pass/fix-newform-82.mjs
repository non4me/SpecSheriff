// The owner, 2026-11-09, on the node on citations: "apart from the citation" says where that citation stands.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["6.3"];
if (n.sidValue !== "s-cxtt6jvhqcey2k9") throw new Error("6.3 is another node");
const swap = (field, a, b) => { if (!n[field].includes(a)) throw new Error("missing: " + a); n[field] = n[field].replace(a, b); };
swap("text", "apart from the citation.", "apart from the citation in the node's text or reason.");
swap("ruText", "отдельно от самой ссылки.", "отдельно от самой ссылки в тексте или обосновании узла.");
n.changes = n.changes.map(c => c.startsWith("По вашему предложению добавлена фраза") ? "По вашему предложению добавлена фраза, что связь стоит в списке `refs` узла, отдельно от самой ссылки в тексте или обосновании узла." : c);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n")[0].slice(0, 170));
