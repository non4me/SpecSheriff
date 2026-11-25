// Node 1.3.4: the proposal goes back to the change that finding 8 needs, the one fix-newform-433.mjs wrote. The wording
// checker's findings that fix-newform-434.mjs added concern the wording the owner agreed to on 2026-11-14, and finding 8
// does not call for them; the owner's rule on accepted changes forbids reopening an agreed wording without cause.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-435.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const before = JSON.parse(fs.readFileSync(new URL("newform.before-434.json", here), "utf8"));
const p = before["1.3.4"].proposals;
if (!p || p.length !== 1 || !p[0].en.includes("at least one of its owners")) throw new Error("the proposal of 433 is not in before-434");
d["1.3.4"].proposals = p;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
