// Brings the English text of the rows of table 12.12 agreed on 2026-11-19, and the same phrases in 12.6 and 12.10, into
// line with the findings of EngStickler's thorough reader. Only the English changes; the agreed Russian stays.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, a, b, where) => {
  if (!s.includes(a)) throw new Error(`not found in ${where}: ${a}`);
  return s.split(a).join(b);
};
const NOTE = "Только английский текст, по замечаниям вдумчивого читателя EngStickler. Смысл не изменился.";

const tFile = new URL("table-12-12.json", here);
const t = JSON.parse(fs.readFileSync(tFile, "utf8"));
const row = (num) => t.tables[0].rows.find((x) => x.num === num);
const edits = {
  "12.12.3": ["A chain of identifiers, followed from each identifying field to the next,", "Every chain of identifiers, followed from one identifying field to the next,"],
  "12.12.4": ["to the RecordType whose fields it extends", "to the RecordType to whose fields it adds its own"],
  "12.12.7": ["that its RecordType declares or takes from a RecordType that it refines", "that its RecordType declares or takes through `refines` from another RecordType"],
  "12.12.8": ["one value for each of them", "exactly one value for each of those fields"],
  "12.12.11": [", the values gathered beside it not counted", ", not counting the values gathered beside the field"],
  "12.12.13": ["are the sids of the nodes of one of", "are sids of nodes of one of"],
  "12.12.14": ["are what their source produces", "are exactly what their source produces"],
  "12.12.15": ["to fragments of a format declared in the contracts section", "to the fragments of a format that are declared in the contracts section"],
};
for (const [num, [a, b]] of Object.entries(edits)) {
  const r = row(num);
  r.en = swap(r.en, a, b, num);
  r.change += ` ${NOTE}`;
}
fs.writeFileSync(tFile, JSON.stringify(t, null, 2) + "\n");

const nFile = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nFile, "utf8"));
nf["12.6"].text = swap(nf["12.6"].text, "that its RecordType declares or takes from a RecordType that it refines", "that its RecordType declares or takes through `refines` from another RecordType", "12.6");
nf["12.6"].changes.push(NOTE);
nf["12.10"].text = swap(nf["12.10"].text, "and to fragments of a format declared in the contracts section", "and to the fragments of a format that are declared in the contracts section", "12.10");
nf["12.10"].changes.push(NOTE);
fs.writeFileSync(nFile, JSON.stringify(nf, null, 2) + "\n");
console.log("ok");
