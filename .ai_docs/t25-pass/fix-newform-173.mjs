// 9.4's list of changes named only paragraph 4 of present 3.4 as its source; its first sentence is the second sentence of that node's paragraph 2.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-8ykvuqhvtjh66hj" || b.agreed) throw new Error("unexpected draft");
const at = b.changes.indexOf("Текст — абзац 4 нынешнего 3.4; ссылка на SpecTag теста ведёт в 9.3.");
if (at < 0) throw new Error("no change line on the text's source");
b.changes[at] = "Текст — вторая фраза абзаца 2 и абзац 4 нынешнего 3.4; ссылка на SpecTag теста ведёт в 9.3.";
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.changes[at]);
