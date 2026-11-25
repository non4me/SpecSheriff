// Brings the English of the agreed 1.7.5 into line with its agreed Russian, after EngStickler's reader read it
// (2026-11-18). Only the English changes; the meaning stays that of the Russian.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-471.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["1.7.5"];
const r = [
  ["text", "in person with a utility of the SpecSheriff plugin,", "in person with a utility from the SpecSheriff plugin,"],
  ["reason", "as approving the specification is (§", "just as approving the specification is (§"],
  ["reason", "Recorded in the repository, the choice is the same in every clone.", "Because the choice is recorded in the repository, it is the same in every clone."],
  ["examples", "asks the agent in the conversation to enable another", "asks the agent in the chat to enable another"],
  ["examples", "an extension that seems to it to be needed for the work at hand,", "an extension that it takes to be needed for the work at hand,"],
];
for (const [field, a, b] of r) {
  const v = JSON.stringify(n[field]);
  if (!v.includes(a)) throw new Error("missing in " + field + ": " + a);
  n[field] = JSON.parse(v.split(a).join(b));
}
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
