// Applies to the agreed 10.4 the correction EngStickler's reader confirmed in its English: a requirement is implemented,
// not carried out. The meaning does not change.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
const n = nf["10.4"];
const from = "as carried out by that code.";
if (!n.text.includes(from)) throw new Error("10.4: phrase not found");
n.text = n.text.replace(from, "as implemented by that code.");
n.changes.push("После согласования поправлен английский по отчёту читателя EngStickler: «carried out» заменено на «implemented»; смысл не менялся.");
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "agree-10-4.mjs adds the rulings and the citations of the agreed 10.4 to its draft.";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, b + " fix-10-4-english.mjs corrects a phrase in the agreed English text of 10.4.");
fs.writeFileSync(indexPath, s);
console.log("fixed at", now);
