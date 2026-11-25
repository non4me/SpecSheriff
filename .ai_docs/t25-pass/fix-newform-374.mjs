// Node 7.2.1: the English fixes that EngStickler's readers found after the owner agreed to the node. None changes the
// meaning, so the owner's agreement stands.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-374.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.1"];
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};
n.text = swap(n.text, "A rule that requires an action names the actor and says", "A rule that requires an action names its actor and says");
n.text = swap(n.text, "An actor may be, for example,", "An actor can be, for example,");
n.text = swap(n.text, "A description of a shortcoming in the technical debt (§", "A description of a shortcoming in the technical debt section (§");
n.reason = swap(n.reason, "nobody knows who must meet it.", "nobody knows who must comply with it.");
n.examples[0] = swap(n.examples[0], "which does not say who approves it.", "which does not say who approves the refund.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
