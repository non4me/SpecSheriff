// The English of 9.6, agreed on 2026-11-17, brought into line with its Russian text after EngStickler's readers had read
// it: the node is named before "its sid" refers to it, and the tests are excluded in words that say what is excluded.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-449.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const from = "A commit message names, by its sid, each node to which a SpecTag binds code added or changed in that commit. The tests do not count.";
if (!d["9.6"].text.includes(from)) throw new Error("9.6 not as expected");
d["9.6"].text = d["9.6"].text.replace(from, "For each node to which a SpecTag binds code added or changed in a commit, the commit message names the node by its sid. Code in the tests is not counted.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
