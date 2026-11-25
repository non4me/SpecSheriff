// Brings the English of the agreed 12.6 into line with the findings of EngStickler's thorough reader. Only the English
// changes; the agreed Russian stays as it is.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.6"];
const swap = (s, a, b, where) => {
  if (!s.includes(a)) throw new Error(`not found in ${where}: ${a}`);
  return s.split(a).join(b);
};

n.text = swap(n.text, "one value of each field", "one value for each field", "text");
n.text = swap(n.text, "beside the fields of its RecordType", "alongside the fields of its RecordType", "text");
n.examples[0] = swap(n.examples[0], "A data record of a notification by email holds `address` beside `channel` and `text`.", "A data record of an email notification holds `address` alongside `channel` and `text`.", "example 1");
n.examples[1] = swap(n.examples[1], "the number of the order", "the order number", "example 2");
n.examples[1] = swap(n.examples[1], "comes from the domain of orders", "comes from the orders domain", "example 2");
const last = n.decisions[n.decisions.length - 1];
last.ruling = swap(last.ruling, "beside the fields of its RecordType, as a pair of `if` and `then` adds them", "alongside the fields of its RecordType, as an `if`/`then` pair adds them", "decision");
n.changes.push("Только английский текст, по замечаниям читателя EngStickler: «one value of each field» — «one value for each field», «beside» — «alongside», «a notification by email» — «an email notification», «the number of the order» — «the order number», «the domain of orders» — «the orders domain». Смысл не изменился.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n").slice(-1)[0]);
