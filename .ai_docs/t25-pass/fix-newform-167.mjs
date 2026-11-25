// 9.3's list of changes said its text was carried over word for word, which the reviewer's subject and "reads" no longer make true.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.3"];
if (b.sidValue !== "s-zg6bvg7jrcpu8vf" || b.agreed) throw new Error("unexpected draft");
const at = b.changes.indexOf("Текст — первая фраза абзаца 2 нынешнего 1.8, дословно.");
if (at < 0) throw new Error("no change line on the text's source");
b.changes[at] = "Текст взят из первой фразы абзаца 2 нынешнего 1.8.";
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.changes.join("\n"));
