// The owner, 2026-11-09, on 2.1: the paragraph saying the appendix of the tools is not the technical appendix is redundant. Checked:
// 1.1.2 makes the technical appendix a part of its own, 1.1.5 and 4.1 tie it to the base specification, and 2.1 itself puts the
// appendix of the tools inside the guidelines. The paragraph goes, and the paragraph of the reason that grounded it.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["2.1"];
if (n.sidValue !== "s-a4rbry4hsu34hy8") throw new Error("2.1 is another node");
const cut = (field, a) => { if (!n[field].includes(a)) throw new Error("missing: " + a); n[field] = n[field].replace(a, ""); };
cut("text", "\n\nThe appendix of the tools is not the technical appendix. The technical appendix describes how the system is built, never the tools of the specification.");
cut("ruText", "\n\nОписание инструментов — не техническое приложение. Техническое приложение описывает, как строится система, и никогда — инструменты спецификации.");
cut("reason", "\n\nThe tools hold the specification and the code to each other rather than make up the system. That is why they are described apart from the technical appendix.");
cut("ruReason", "\n\nИнструменты держат спецификацию и код друг против друга, а не составляют систему. Поэтому их описывают отдельно от технического приложения.");
n.changes = n.changes.map(c => c.startsWith("Первый абзац обоснования заменён") ? "Обоснование — одна фраза в формулировке рецензента. Связь со ссылкой на узел о технологиях уходит." : c);
n.changes.push("По вашему замечанию убран абзац о том, что описание инструментов — не техническое приложение, вместе с его обоснованием: это уже следует из 1.1.2, 1.1.5 и 4.1.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.slice(-60), "||", n.reason);
