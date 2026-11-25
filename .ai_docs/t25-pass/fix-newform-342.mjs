// Node 12.4.3, agreed on 2026-11-14: the English alone is brought into line after the EngStickler reader's report.
// "Of the row" becomes "in the row"; "another domain" becomes "any other domain"; "this" before "leaves a choice" now names
// the rules; "a link with" becomes "a link to"; "then" in the reason becomes "with this order". The Russian does not change.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.4.3"];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
n.text = swap(n.text, "the domains that neither use nor are used by another domain of the row;", "the domains that neither use nor are used by any other domain in the row;");
n.text = swap(n.text, "each to the right of every domain of the row that it uses", "each to the right of every domain in the row that it uses");
n.text = swap(n.text, "Where this leaves a choice,", "Where these rules leave a choice,");
n.text = swap(n.text, "a domain that uses several domains of the row, or one that several domains of the row use,", "a domain that uses several domains in the row, or one that several domains in the row use,");
n.reason = swap(n.reason, "Within a row of the diagram, every link then points one way", "With this order, every link within a row of the diagram points one way");
n.examples[0] = swap(n.examples[0], "billing has no link with either of them", "billing has no link to either of them");
n.examples[0] = swap(n.examples[0], "since it has no link in the row.", "since it has no link to another domain in the row.");
n.changes.push("Только английский текст, по замечаниям читателя: «of the row» стало «in the row», «another domain» — «any other domain», «this leaves a choice» — «these rules leave a choice», «link with» — «link to». Смысл узла не изменился.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
