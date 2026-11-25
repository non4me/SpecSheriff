// Applies EngStickler's fourteenth batch of corrections to the continuation file, INDEX.md and the note on the reading
// of "Project-wide settings" in tools-drafts.json.
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
const refuse = ["says throughout that a tool refuses what it does not accept", "consistently uses \"refuses\" for what a tool does with anything it does not accept"];

edit("../INDEX.md", [
  ["tools-page-settings/ holds the page of \"Project-wide settings\",", "tools-page-settings/ holds the page showing the node \"Project-wide settings\","]
]);
edit("tools-drafts.json", [refuse]);
edit("../t25-one-thought.md", [
  ["the environment variable by which the SpecSheriff tools identify the repository", "the environment variable that the SpecSheriff tools use to identify the repository"],
  refuse,
  ["The first says that the variable keeps what only that repository needs out of every project's settings.",
    "The first says that, thanks to the variable, the settings of every project contain nothing that only that repository needs."],
  ["- agree-env.mjs wrote english-tools-1-env.md, the English text of the two additions, for EngStickler's reader.",
    "- agree-env.mjs wrote english-tools-1-env.md, the English text of the sentence and the paragraph it was added to, and of the reason, for EngStickler's reader."],
  ["refuses the guidelines under `specs/` as copies of the SpecSheriff guidelines, so a missing variable cannot go unnoticed.",
    "treats the guidelines under `specs/` as copies of the SpecSheriff guidelines and fails, so a missing variable cannot go unnoticed."]
]);
console.log("batch 14 applied");
