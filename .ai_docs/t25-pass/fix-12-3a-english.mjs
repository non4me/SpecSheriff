// Corrects the English of the agreed node 12.3a, "A RecordType is a rule", after EngStickler's thorough reader read it.
// The meaning does not change, so the node stays agreed and the Russian stays as it is.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
fs.copyFileSync(nfPath, new URL("newform.before-fix-12-3a-english.json", here));
const n = nf["12.3a"];
n.text = swap(n.text, "The description of what it is for serves as its reason", "Its description of what it is for serves as its reason", "text");
n.reason = swap(n.reason, "the checks require bound code and a passing test only of a rule", "the checks require only a rule to have bound code and a passing test", "reason 1");
n.reason = swap(n.reason, "The description of what its data is for already says why the data must have these fields, so a reason of its own would repeat it.",
  "Its description of what it is for already says why its data must have the fields it lists, so a reason of its own would repeat that description.", "reason 2");
n.examples[1] = swap(n.examples[1], "The fragment of a format for an address is declared", "The fragment of a format that describes an address is declared", "example 2");
n.changes.push("После согласования читатель EngStickler прочитал английский текст; fix-12-3a-english.mjs поправил английский, не меняя смысла.");
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");
console.log("12.3a English corrected");
