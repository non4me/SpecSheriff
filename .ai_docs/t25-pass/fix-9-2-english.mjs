// Corrects the English of the agreed node 9.2 as EngStickler's reader found, without changing its meaning or its Russian.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
const n = nf["9.2"];
n.text = swap(n.text, "directly or through a chain of such links, counts towards that rule.", "directly or through a chain of such links, counts as bound to that rule.", "text");
n.text = swap(n.text, "- a rule of a project's own kind whose nodes", "- a rule of a project's own kind of node whose nodes", "text");
n.text = swap(n.text, "- a rule exempted from being implemented (", "- a rule exempted from implementation (", "text");
n.reason = swap(n.reason, "An approved rule the system's code does not implement leaves the specification stating what is not true of the system.",
  "An approved rule that the system's code does not implement leaves the specification stating something that is not true of the system.", "reason");
n.changes.push("После согласования поправлен английский по отчёту читателя EngStickler; смысл и русский текст не менялись.");
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");
console.log("9.2 corrected");
