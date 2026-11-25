// The owner, 2026-11-09: the limit on naming a technology holds for the base specification only, its first home, and the
// guidelines are not held to it: it forced workarounds and has no role there. Node 2.1 loses the sentence and the ground, so its
// agreement comes off until the owner has read it. With the limit gone, the node on citations names `refs`, as the owner proposed.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const swapIn = (node, field, a, b) => { if (!node[field].includes(a)) throw new Error("missing: " + a); node[field] = node[field].replace(a, b); };

const structure = d["2.1"];
if (structure.sidValue !== "s-a4rbry4hsu34hy8") throw new Error("2.1 is another node");
swapIn(structure, "text", " They name no technology.", "");
swapIn(structure, "ruText", " Они не называют технологий.", "");
swapIn(structure, "reason", "The guidelines require every base specification to name no technology (§s-5x737t9nee4zgaa), and they are held to it themselves. A rule naming its tool goes stale when the tool changes. Another toolset, written in another language, could not implement that rule.", "How one toolset carries a rule out changes with that toolset, while the rule stays.");
swapIn(structure, "ruReason", "Guidelines требуют, чтобы каждая базовая спецификация не называла технологий (§s-5x737t9nee4zgaa), и сами этому следуют. Правило, которое называет свой инструмент, устаревает, когда инструмент меняется. Другой набор инструментов, написанный на другом языке, не смог бы это правило реализовать.", "То, как один набор инструментов выполняет правило, меняется вместе с этим набором, а правило остаётся.");
delete structure.agreed;
structure.changes = [
  ...structure.changes.filter(c => !c.startsWith("Обоснование — абзацы 1–2")),
  "По вашему решению запрет называть технологии больше не относится к guidelines, фраза убрана. Для базовой спецификации он остаётся, узел 1.1.4 не меняется.",
  "Первый абзац обоснования заменён одной фразой, второй абзац — из нынешнего обоснования 1.21, дословно. Связь со ссылкой на узел о технологиях уходит вместе с абзацем.",
  "При переносе в файлы решение записывается в этот узел.",
];

const citation = d["6.3"];
if (citation.sidValue !== "s-cxtt6jvhqcey2k9") throw new Error("6.3 is another node");
swapIn(citation, "text", "The link stands in the node's list of links, apart from the citation.", "The link stands in the node's `refs` list, apart from the citation.");
swapIn(citation, "ruText", "Эта связь стоит в списке связей узла, отдельно от самой ссылки.", "Эта связь стоит в списке `refs` узла, отдельно от самой ссылки.");
citation.changes = citation.changes.map(c => c.startsWith("По вашему предложению добавлена фраза") ? "По вашему предложению добавлена фраза, что связь стоит в списке `refs` узла, отдельно от самой ссылки." : c);

fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(structure.text.split("\n").slice(2, 3).join(""), "|", structure.reason.split("\n")[0], "| agreed:", structure.agreed);
