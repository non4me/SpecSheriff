// Records the owner's answer of 2026-11-19 to the eighth question of the grilling (the boundary is set by the node) and
// the end of the grilling; applies the corrections EngStickler's reader confirmed in batch 16. Updates the continuation
// file, the queue outline and .ai_docs/INDEX.md.
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

swap("The seventh question of the grilling was who checks an appendix node that the agent approved", "The seventh question of the grilling was who checks a node of the technical appendix that the agent approved");
swap("just as the owner had chosen the reviewer for the mark that the implementation needs no change.", "just as the owner had chosen the reviewer to verify the mark stating that the implementation needs no change.");
swap("and contradicts nothing in the base (4.2).", "and contradicts nothing in the base, as node 4.2 requires of every node of the technical appendix.");
swap("The owner chose the independent reviewer on 2026-11-19 (option 1).\n", "The owner chose on 2026-11-19 to have the independent reviewer check such nodes (option 1).\n");
replaceLine("The eighth question of the grilling", [
  "The eighth question of the grilling was which nodes of the technical appendix the agent may approve on the owner's behalf, and how the SpecSheriff tools recognise them. The agent runs `sheriff approve` under the owner's git identity, so an approval does not show who made it. The agent recommended a boundary that the tools can check without knowing who approved the node: a node of the technical appendix qualifies if it has an `implements` link to an approved rule of the base. The reviewer then judges every such node whose approval a commit contains, whoever approved it, and the report to the owner lists them. The other option put to the owner was that the agent marks each approval it makes on the owner's behalf with a trailer in the commit message, and that only the nodes so marked are reviewed and reported.",
  "",
  "The owner chose the boundary set by the node on 2026-11-19 (option 1). The rules of the base and the nodes that have no `implements` link to an approved rule of the base are approved only by an owner.",
  "",
  "The grilling has settled the design of how a change is checked. As the `vt` rules \"A design is drawn before it is planned\" and \"An architectural decision is weighed against best practice in its field\" require, the agent now draws the design on a page and compares each decision with established practice in a matrix, before any wording is proposed. The wordings that follow from it are then proposed one at a time: row 10.1.40, the two principles in docs/principles.md, node 1.3.6 (s-t5uw8zfxzhfdg86) on approvals made on an owner's behalf, node 10.4 (s-nyh9yk22ba6g77q) on what the reviewer is given, and the node s-txbwsthdqhvyzd2 of the appendix of the tools.",
].join("\n"));
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The owner's review of the page that draws the design of how a change is checked and compares its decisions with established practice. The wordings that follow from the design are proposed after it, one at a time." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const outlinePath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outlinePath, "utf8");
const from1 = "- сейчас: какие узлы приложения агент вправе одобрять сам и как их узнают инструменты; рекомендую: узел приложения со связью implements к одобренному правилу базы\n";
if (!o.includes(from1)) throw new Error("outline line not found");
o = o.replace(from1, "- ✓ агент одобряет сам только узел приложения со связью implements к одобренному правилу базы (ваш выбор)\n- ✓ опрос завершён: восемь решений\n- ● сейчас: страница с устройством проверки изменений и сравнением решений с практикой\n- ○ затем, по одной: строка 10.1.40, два принципа, 1.3.6, 10.4, узел описания инструментов об отставании\n");
fs.writeFileSync(outlinePath, o);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const a = "grill-change-8.mjs, grill-change-9.mjs and grill-change-10.mjs do the same for the fifth to the eighth questions.";
if (!s.includes(a)) throw new Error("index text not found");
s = s.replace(a, a + " grill-change-11.mjs records the owner's answer to the eighth question and the end of the grilling.");
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
