// Further corrections to the English of the agreed 1.7.5 from EngStickler's reader (2026-11-18); the Russian is unchanged.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-472.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["1.7.5"];
const r = [
  ["text", "The owner does so in person with a utility from the SpecSheriff plugin, or through", "The owner does so personally, using a utility from the SpecSheriff plugin, or through"],
  ["reason", "So the choice is made by those accountable", "Therefore the choice is made by those accountable"],
  ["examples", "and marks one of them.", "and marks one of them as chosen."],
  ["examples", "to enable another, and the agent", "to enable another one, and the agent"],
];
for (const [field, a, b] of r) {
  const v = JSON.stringify(n[field]);
  if (!v.includes(a)) throw new Error("missing in " + field + ": " + a);
  n[field] = JSON.parse(v.split(a).join(b));
}
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const p = "D:/SpecSheriff/.ai_docs/t25-one-thought.md";
let t = fs.readFileSync(p, "utf8");
const c = [
  ["The owner then found that the first sentence of 1.7.5", "The owner then judged that the first sentence of 1.7.5"],
  ["under the title «Настройка расширений».", "under the title \"Configuring extensions\" («Настройка расширений»)."],
  ["fix-newform-470.mjs wrote it into newform.json and marked it agreed, and remove-node.mjs removed the draft of 1.7.6 and renumbered 1.7.7 as 1.7.6.", "fix-newform-470.mjs wrote the agreed text of 1.7.5 into newform.json and marked it as agreed, and remove-node.mjs removed the draft of 1.7.6 and renumbered 1.7.7 to 1.7.6."],
  ["EngStickler's reader is reading the English of 1.7.5 (scratchpad agreed-1-7-5-en.md).", "EngStickler's reader has read the English text of 1.7.5 (the file agreed-1-7-5-en.md in the scratchpad), and fix-newform-471.mjs and fix-newform-472.mjs corrected that English without changing its meaning."],
  ["Decided by the agent as a question of where a rule goes: the owner's dictated text on the utility", "The agent decided, as a question of where a rule belongs, that the text the owner dictated about the utility"],
  ["becomes a rule of the appendix of the tools that implements 1.7.5, in the step of T25", "becomes a rule of the appendix of the tools that implements 1.7.5, in the T25 step"],
  ["as for the approval status (10.6) and the strict flag (10.7), since the commit's author would refuse a merge made by a participant who is not an owner.", "as is done for the approval status (10.6) and the strict flag (10.7), since a check on the commit's author would reject a merge made by a participant who is not an owner."],
  ["Now shown to the owner: 1.7.6", "The owner is now shown 1.7.6"],
  ["which now speaks of a chosen extension instead of an active one, as the agreed 1.7.5 and 2.3 do.", "which now refers to a chosen extension instead of an active one, as the agreed 1.7.5 and 2.3 do."],
  ["Since 1.7.5 and 2.3 both speak of a choice, no rename in 2.3 or 1.7.2 is needed. To be checked as well:", "Since 1.7.5 and 2.3 both refer to a choice, no renaming in 2.3 or 1.7.2 is needed. Also to be checked:"],
];
for (const [a, b] of c) {
  if (!t.includes(a)) { console.log("MISSING: " + a.slice(0, 60)); continue; }
  t = t.split(a).join(b);
}
const anchor = "Once the owner agrees to the procedure, the agent drafts the change";
const add = `The owner then asked (2026-11-18) to replace «узел вне этого расширения» in 1.7.6 with «узел спецификации». The agent pointed out that, under 1.1.2 and 2.3, the specification includes the guidelines and the extensions the project has chosen, so the extension's own nodes are nodes of the specification too, and an extension whose nodes link to one another could never be deselected. The agent proposed «узел спецификации, который не входит в это расширение», which keeps the owner's words and avoids «вне», a word the owner once read as "in breach of".

`;
if (!t.includes(anchor)) throw new Error("anchor");
t = t.split(anchor).join(add + anchor);
fs.writeFileSync(p, t);
console.log("ok");
