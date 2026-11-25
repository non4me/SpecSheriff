// Applies EngStickler's fifteenth batch of corrections to the continuation file, INDEX.md and the note on the reading
// of "Project-wide settings" in tools-drafts.json. The owner's words quoted in Russian, such as «ок», stay as they are:
// they record what the owner said.
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
const responds = ["for what a tool does with anything it does not accept", "for how a tool responds to anything it does not accept"];

edit("tools-drafts.json", [responds]);
edit("../t25-one-thought.md", [
  responds,
  ["the paragraph now speaks of \"the second column of the table below\"", "the paragraph now refers to \"the second column of the table below\""]
]);
edit("../INDEX.md", [
  ["fix-env-english.mjs corrects the English of those additions after EngStickler's reader read it.",
    "fix-env-english.mjs corrects the English of the sentence naming that variable and of the two sentences of the reason, after EngStickler's reader read them."],
  ["fix-batch-14.mjs applies EngStickler's fourteenth batch of corrections.",
    "fix-batch-14.mjs and fix-batch-15.mjs apply the corrections that the agent accepted from EngStickler's fourteenth and fifteenth batches to the continuation file, INDEX.md and tools-drafts.json."]
]);
console.log("batch 15 applied");
