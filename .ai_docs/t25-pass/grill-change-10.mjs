// Records the owner's answer of 2026-11-19 to the seventh question of the grilling (the independent reviewer checks the
// agent's appendix nodes) and the eighth question put to the owner; applies the corrections EngStickler's reader
// confirmed in batch 15. Updates the continuation file, the queue outline and .ai_docs/INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const swap = (a, b) => {
  if (!c.includes(a)) throw new Error("not found: " + a.slice(0, 70));
  c = c.replace(a, b);
};
const replaceLine = (start, text) => {
  const lines = c.split("\n");
  const at = lines.findIndex((l) => l.startsWith(start));
  if (at < 0) throw new Error("line not found: " + start);
  lines[at] = text;
  c = lines.join("\n");
};

swap("(option 2). So the principle \"Nothing unapproved is implemented\" in docs/principles.md is to be changed, and its new wording will be proposed together with the other wordings that follow from the grilling.", "(option 2). The principle \"Nothing unapproved is implemented\" in docs/principles.md is therefore to be changed, and its new wording will be proposed together with the other new wordings that follow from the grilling.");
replaceLine("The seventh question of the grilling", [
  "The seventh question of the grilling was who checks an appendix node that the agent approved on the owner's behalf. The agent recommended that the independent reviewer check it, just as the owner had chosen the reviewer for the mark that the implementation needs no change. The reviewer would judge whether the node only spells out the approved base rule it implements and contradicts nothing in the base (4.2). Such a node is included in the same commit as the code that implements it, and the reviewer judges that commit anyway, so no extra run is needed. The other option put to the owner was that the report to the owner is the only check on such a node, and the owner withdraws an approval where necessary.",
  "",
  "The owner chose the independent reviewer on 2026-11-19 (option 1).",
  "",
  "The eighth question of the grilling, now being put to the owner, is which appendix nodes the agent may approve on the owner's behalf, and how the SpecSheriff tools recognise them. The agent runs `sheriff approve` under the owner's git identity, so an approval does not show who made it. The agent recommends a boundary that the tools can check without knowing who approved: a node of the technical appendix with an `implements` link to an approved rule of the base. The reviewer then judges every such node that a commit approves, whoever approved it, and the report to the owner lists them. The other option put to the owner is that the agent marks each approval it makes on the owner's behalf with a trailer in the commit message, and that only the nodes so marked are reviewed and reported.",
].join("\n"));
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The agent is waiting for the owner's answer to the eighth question of the grilling, namely which appendix nodes the agent may approve on the owner's behalf and how the SpecSheriff tools recognise them. The consequence of a failure of the check in row 10.1.40 will be settled once the owner has answered the remaining questions of the grilling." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const outlinePath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outlinePath, "utf8");
const from1 = "- сейчас: кто проверяет такие узлы; рекомендую рецензента — в том же коммите, что и их код\n";
if (!o.includes(from1)) throw new Error("outline line not found");
o = o.replace(from1, "- ✓ такие узлы проверяет рецензент, в том же коммите, что и их код (ваш выбор)\n- сейчас: какие узлы приложения агент вправе одобрять сам и как их узнают инструменты; рекомендую: узел приложения со связью implements к одобренному правилу базы\n");
fs.writeFileSync(outlinePath, o);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const a = "grill-change-8.mjs and grill-change-9.mjs do the same for the fifth and sixth questions and for the sixth and seventh.";
if (!s.includes(a)) throw new Error("index text not found");
s = s.replace(a, "grill-change-8.mjs, grill-change-9.mjs and grill-change-10.mjs do the same for the fifth to the eighth questions.");
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
