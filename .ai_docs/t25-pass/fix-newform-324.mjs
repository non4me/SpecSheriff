// Node 12.4.2, agreed on 2026-11-14: the English alone is brought into line after the EngStickler reader's report.
// "One row" becomes "the same row"; the domains without a level share a single row; "drifts from" becomes "drifts out of
// line with"; "is laid out in its own way" becomes "has a layout of its own"; "in one layout" becomes "always ... in the
// same layout". The Russian does not change.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.4.2"];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
n.text = swap(n.text, "- domains of the same level are placed in one row;", "- domains of the same level are placed in the same row;");
n.text = swap(n.text, "- domains whose header names no level are placed in a row of their own, below the rows of the levels;", "- domains whose header names no level are all placed in a single row of their own, below the rows of the levels;");
n.reason = swap(n.reason, "A drawing of the domains made by hand drifts from their headers. Every such drawing is also laid out in its own way. The diagram that the tools draw from the headers in one layout",
  "A drawing of the domains made by hand drifts out of line with their headers. Each such drawing also has a layout of its own. The diagram that the tools always draw from the headers in the same layout");
n.changes.push("Только английский текст, по замечаниям читателя: «one row» стало «the same row», домены без уровня — «all ... in a single row», в обосновании — «drifts out of line with», «has a layout of its own», «always ... in the same layout». Смысл узла не изменился.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text, "\n", n.reason);
