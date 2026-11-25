// Applies EngStickler's sixteenth batch of corrections to the continuation file and INDEX.md.
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
  ["and of the two sentences of the reason, after EngStickler's reader read them.",
    "and of the last two sentences of the reason of \"Where the files are\", after EngStickler's reader read them."],
  ["fourteenth and fifteenth batches to the continuation file, INDEX.md and tools-drafts.json.",
    "fourteenth and fifteenth batches to the continuation file, this index and tools-drafts.json. fix-batch-16.mjs does the same for the sixteenth batch."]
]);
edit("../t25-one-thought.md", [
  ["the English text of the sentence and the paragraph it was added to, and of the reason,",
    "the English text of the sentence, of the paragraph it was added to, and of the reason,"]
]);
console.log("batch 16 applied");
