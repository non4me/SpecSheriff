// Records in the continuation file and the index that the new wording of 1.6.1 has been proposed and that the page of
// the base specification now lives at a new address, published as two files.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c,
  "**The next session starts by** proposing to the owner new wordings for nodes 1.6.1 and 10.2, under which the independent reviewer judges only commits that change code. The list of wordings in the section \"Waiting for the owner\" names the proposals that follow, to be made one at a time.",
  "**The next session starts by** getting the owner's decision on the proposed new wording of node 1.6.1 (s-m4h279nbaqkpa3t), held as the proposal in the draft of 1.6.1 in newform.json and written by propose-1-6-1.mjs. In it, the paragraph on the reviewer lists the three judgements that the agreed principle and node 10.4 give the reviewer. Once the owner decides, accept-proposal.mjs writes the agreed wording into the draft, and the agent proposes the new wording of node 10.2. The list of wordings in the section \"Waiting for the owner\" names the proposals that follow, to be made one at a time.\n\n**The page of the base specification** is now https://claude.ai/artifact/5wK7HgU4higmsDkgSZtdX3, published as two files: base-page/index.html, which holds the markup and the styles, and base-page/page.js, which holds the script and its data. split-base-page.mjs writes both from base-structure.html after apply-newform.mjs has run. A later session reads only index.html with the Artifact tool, lists the artifact's files, and republishes both files to that URL, so that it never has to read the whole page. The earlier page, 2oWUUA5dNyNiFdwmsmHfBF, is no longer updated.",
  "continuation");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = swap(c,
  "After the owner's decision on node 1.3.6, the agent will propose the other wordings that follow from the grilling session, one at a time:\n- nodes 1.6.1 and 10.2, which have the reviewer judge only a commit that changes code;",
  "The agent proposes the other wordings that follow from the grilling session, one at a time:\n- node 1.6.1, proposed to the owner and waiting for the owner's decision, and then node 10.2: both have the reviewer judge only a commit that changes code. The proposal for 10.2 is to refer to 1.6.1 for what the reviewer judges, rather than repeat it, so that the judgements are stated in one node;",
  "continuation list");
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
const row = /^(\| t25-pass\/ \| )([^|]+)( \| )(.*)( \|)\r?$/m;
if (!row.test(s)) throw new Error("the row of t25-pass/ was not found");
s = s.replace(row, (_, a, _t, b, purpose, z) => a + now + b + purpose + " propose-1-6-1.mjs proposes the new wording of node 1.6.1, in which the reviewer makes three judgements. split-base-page.mjs splits the page of the base specification into base-page/index.html and base-page/page.js, published at 5wK7HgU4higmsDkgSZtdX3; step-propose-1-6-1.mjs records that step in the continuation file and here. queue-outline.before-2026-11-20.md keeps the outline of the queue map as it was on 19 and 20 November." + z);
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
