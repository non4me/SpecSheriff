// Applies EngStickler's tenth batch of corrections to the continuation file and INDEX.md, and records in the
// continuation file the owner's question about `writesSpecSheriffGuidelines`.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const edit = (rel, pairs) => {
  const url = new URL(rel, here);
  let s = fs.readFileSync(url, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) throw new Error(`${rel}: not found: ${from.slice(0, 80)}`);
    s = s.replace(from, to);
  }
  fs.writeFileSync(url, s);
};

edit("../t25-one-thought.md", [
  ["The next node is the new node \"The settings common to a project\", which is now shown to the owner. The owner's answer is to be acted on first.",
    "The next node is the new node \"The settings common to a project\", which has now been shown to the owner. The owner asked how the SpecSheriff tools use `writesSpecSheriffGuidelines`, noting that no repository but SpecSheriff's own seems to need it. The agent answered and proposed to take the key out of the node's list of settings. The owner's decision on that proposal is to be acted on first."],
  ["corrected it without changing its meaning. The map and the export are each named with their directory, \"common to every project\" replaces \"that every project shares\", and the closing sentence and the reason are plainer.",
    "corrected it without changing its meaning. The map and the export are each now named together with the directory that holds it. \"Common to every project\" replaces \"that every project shares\", and the closing sentence and the reason are worded more plainly."],
  ["the paragraph on where the tools look for SpecTags adds the files of types", "the paragraph on where the tools look for SpecTags now also covers the files of types"],
  ["the tools refuse a `sheriff.config.json` that is not JSON", "the tools refuse a `sheriff.config.json` file that is not JSON"],
  ["as the approved wording said;", "as the approved wording says;"],
  ["The agent decided, as a question of where a rule belongs, that other nodes state the form of an entry:",
    "The agent decided, because it is a matter of where a rule belongs, that other nodes state the format of an entry:"]
]);

edit("../INDEX.md", [
  ["propose-settings-b.mjs applies the findings of specsheriff-rule-reviewer on that draft.",
    "propose-settings-b.mjs applies the findings of specsheriff-rule-reviewer about that draft."],
  ["tools-drafts.before-settings-b.json is tools-drafts.json as it was before those two scripts ran.",
    "tools-drafts.before-settings-b.json is tools-drafts.json as it was before fix-tools-1-english.mjs and propose-settings-b.mjs ran."],
  ["state-settings-b.mjs records that state in the continuation file.",
    "state-settings-b.mjs records in the continuation file that the draft was shown to the owner. fix-batch-10.mjs applies EngStickler's tenth batch of corrections to the continuation file and INDEX.md."]
]);
console.log("continuation file and INDEX.md corrected");
