// Node 12.4.3, agreed: the owner agreed to it on 2026-11-14 («согласовано»), in the wording of fix-newform-325.mjs. The
// English alone is then brought into line after the EngStickler reader's report: "of one level" becomes "at the same
// level", and "in the order of a single sequence" becomes "in the order given by a single sequence". The Russian does not
// change.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.4.3"];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
n.agreed = "2026-11-14";
n.changes.push("Вы согласовали эту формулировку 14 ноября («согласовано»).");
n.title = swap(n.title, "The order of the domains of one level", "The order of the domains at the same level");
n.text = swap(n.text, "The domains of one level are placed in the order of a single sequence of all the domains.", "The domains at the same level are placed in the order given by a single sequence of all the domains.");
n.examples[0] = swap(n.examples[0], "are domains of one level.", "are domains at the same level.");
n.changes.push("Только английский текст, по замечаниям читателя: «of one level» стало «at the same level», «in the order of» — «in the order given by». Смысл узла не изменился.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const pageFile = new URL("base-structure.html", here);
let page = fs.readFileSync(pageFile, "utf8");
const row = `"The order of the domains of one level"`;
if (!page.includes(row)) throw new Error("row 12.4.3 not found");
page = page.replace(row, `"The order of the domains at the same level"`);
fs.writeFileSync(pageFile, page);
console.log(["Title: " + n.title, "", "Text: " + n.text, "", "Reason: " + n.reason, "", "Example: " + n.examples[0]].join("\n"));
