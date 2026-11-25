// Node 7.17, agreed by the owner on 2026-11-13: the one reading of its English after the agreement.
// - "put a string of nouns in place of a verb" follows the Russian «ставить вместо»; it becomes "replace a verb with a
//   string of nouns", as in the next item. The meaning is the same.
// - The example dropped the condition "whenever a request arrives" from its shortened sentence, which the node itself
//   forbids. The shortened sentence now keeps it ("as it arrives"), and the wrong one stays a string of nouns.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["7.17"];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error(`missing: ${a}`);
  return s.replace(a, b);
};
n.text = swap(n.text, "- put a string of nouns in place of a verb;", "- replace a verb with a string of nouns;");
n.examples = [
  "“The system, whenever a request arrives, checks the token that the request carries” becomes “The system checks the token of each request as it arrives”, not “Token check on request arrival”.",
];
n.ruExamples = [
  "«The system, whenever a request arrives, checks the token that the request carries» становится «The system checks the token of each request as it arrives», а не «Token check on request arrival».",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text, "\n", n.examples[0]);
