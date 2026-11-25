// Applies EngStickler's twentieth batch of corrections to the continuation file and INDEX.md.
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

edit("../INDEX.md", [
  ["that have the sids or locations given to it.", "whose sids or locations are given to it as arguments."],
  ["fix-batch-19.mjs applies the corrections that the agent accepted from EngStickler's nineteenth batch.",
    "fix-batch-19.mjs and fix-batch-20.mjs apply the corrections that the agent accepted from EngStickler's nineteenth and twentieth batches to the continuation file and this index."]
]);
edit("../t25-one-thought.md", [
  ["- each item says what a member of its list holds.", "- each item says what a member of its list is."],
  ["- the item on the rule of `project.json` whose status set the specification's approval status is removed, since that status is now kept in `sheriff.config.json`;",
    "- the item on the rule in `project.json` whose own approval made the specification approved is removed, since the specification's approval status is now kept in `sheriff.config.json`;"],
  ["a project gives its own rules any titles and arranges them as it likes, so the tools find each value by the place or the `refines` link of the rule that sets it.",
    "a project gives its own rules any titles and arranges them as it chooses, so the tools find each value by the position or the `refines` link of the rule that sets it."]
]);
console.log("batch 20 applied");
