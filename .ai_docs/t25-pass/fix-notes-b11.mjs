// Applies to the continuation file and the index the corrections that EngStickler's reader confirmed in batch 11.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const replaceAll = (s, from, to, what) => {
  if (!s.includes(from)) throw new Error(`${what}: not found: ${from.slice(0, 70)}`);
  return s.split(from).join(to);
};
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = replaceAll(c, "new reason of node 1.3.4", "new reason for node 1.3.4", "continuation");
c = replaceAll(c, "new reason of 1.3.3", "new reason for 1.3.3", "continuation");
c = replaceAll(c, "new reason of 1.3.4", "new reason for 1.3.4", "continuation");
c = replaceAll(c, "added to the draft's `cites` the nodes that its text cites, and corrected its English.", "added to the draft's `cites` the nodes that its text cites, and corrected the English of its text.", "continuation");
c = replaceAll(c, "which say that an approval means that an owner has agreed, and do not hold for a node approved under the third case of 1.3.6.", "which say that an approval means that an owner has agreed, but no longer hold for a node approved under the third case of 1.3.6.", "continuation");
fs.writeFileSync(contPath, c);
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = replaceAll(s, "proposes the new reason of node 1.3.3", "proposes a new reason for node 1.3.3", "index");
s = replaceAll(s, "proposes the new reason of node 1.3.4", "proposes a new reason for node 1.3.4", "index");
fs.writeFileSync(indexPath, s);
console.log("notes corrected");
