// Records the owner's answer of 2026-11-19 to the sixth question of the grilling (the agent approves its own appendix
// nodes on the owner's behalf and reports them) and the seventh question put to the owner; applies the corrections
// EngStickler's reader confirmed in batch 14. Updates the continuation file, the queue outline and .ai_docs/INDEX.md.
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

swap("The names of the trailer and of its values are a technical choice, which the agent makes", "The choice of names for the trailer and its values is a technical decision, which the agent makes");
swap("so a lag left while the specification is a draft is never seen again", "so a lag that remains while the specification is a draft is never seen again");
swap("is therefore the only time the lag becomes visible.", "is therefore the only occasion on which the lag becomes visible.");
replaceLine("The sixth question of the grilling", [
  "The sixth question of the grilling concerned the owner's view that the agent writes the details of the implementation into the technical appendix while implementing. Under the principle \"Nothing unapproved is implemented\", each node the agent adds to the technical appendix is a draft until an owner approves it, and its code cannot be committed until then. The question was whether that should hold for such nodes. The agent recommended keeping the principle and having the owner approve the agent's appendix nodes together, on one page, for one piece of work. Every node of the technical appendix is a rule that the code implements, and the reviewer judges the code against it, so a node nobody approved would let the agent set the rule that its own code is then judged by. The other options put to the owner were to let the agent approve such nodes on the owner's behalf and report them, which changes the principle, or to require no approval for the technical appendix, which changes the principle for a whole part of the specification.",
  "",
  "The owner chose on 2026-11-19 to let the agent approve such nodes on the owner's behalf and report them (option 2). So the principle \"Nothing unapproved is implemented\" in docs/principles.md is to be changed, and its new wording will be proposed together with the other wordings that follow from the grilling.",
  "",
  "The seventh question of the grilling, now being put to the owner, is who checks an appendix node that the agent approved on the owner's behalf. The agent recommends the independent reviewer, as the owner chose for the mark that the implementation needs no change. The reviewer would judge whether the node only details the approved base rule it implements and contradicts nothing in the base (4.2). Such a node lands in the same commit as the code that implements it, and the reviewer judges that commit anyway, so no extra run is needed. The other option put to the owner is that only the report checks it: the owner reads the report and withdraws an approval where needed.",
].join("\n"));
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The agent is waiting for the owner's answer to the seventh question of the grilling, namely who checks an appendix node that the agent approved on the owner's behalf. The consequence of a failure of the check in row 10.1.40 will be settled once the owner has answered the remaining questions of the grilling." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const outlinePath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outlinePath, "utf8");
const from1 = "- сейчас: нужно ли одобрение узлам приложения, которые агент пишет при реализации; рекомендую да, группой на одной странице\n";
if (!o.includes(from1)) throw new Error("outline line not found");
o = o.replace(from1, "- ✓ узлы приложения, которые агент пишет при реализации, он одобряет от вашего имени и сообщает (ваш выбор); принцип меняется\n- сейчас: кто проверяет такие узлы; рекомендую рецензента — в том же коммите, что и их код\n");
fs.writeFileSync(outlinePath, o);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const a = "grill-change-8.mjs does the same for the fifth and sixth questions.";
if (!s.includes(a)) throw new Error("index text not found");
s = s.replace(a, "grill-change-8.mjs and grill-change-9.mjs do the same for the fifth and sixth questions and for the sixth and seventh.");
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
