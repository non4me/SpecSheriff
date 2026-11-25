// Node 1.2.2, the reviewer's English-only fix to the proposal: "has a sid", since a node does not "carry" anything
// (.claude/vt/rules.md). The Russian already says «есть» and stays as it is.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["1.2.2"].proposals[0];
p.en = "A node of the specification has a sid, given to it once and never changed.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.en);
