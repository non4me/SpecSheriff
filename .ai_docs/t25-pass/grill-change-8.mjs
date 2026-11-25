// Records the owner's answer of 2026-11-19 to the fifth question of the grilling (a report while the specification is a
// draft) and the sixth question put to the owner; applies the corrections EngStickler's reader confirmed in batch 13.
// Updates the continuation file, the queue outline and .ai_docs/INDEX.md.
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

swap("where the mark \"the code needs no change\" is kept when only a rule's tests change,", "where the mark \"the code needs no change\" should be kept when only a rule's tests change,");
swap("since of the hooks that check a commit, only that hook sees the commit message.", "since, of the hooks that check a commit, only the commit-msg hook sees the commit message.");
swap("was whether the mark is kept in one place,", "was whether the mark should be kept in one place,");
swap("So the mark that the implementation of a named rule needs no change is a trailer", "As a result, the mark stating that the implementation of a named rule needs no change is a trailer");
replaceLine("The fifth question of the grilling", [
  "The fifth question of the grilling was what happens, while the specification is a draft, to a commit that changes an approved rule's wording without changing either its tests or its code and without the trailer. The owner's exception lets the commit pass; the question was whether it passes silently or with a report naming the rule. The agent recommended a report. The check reads only the commit, so a lag left while the specification is a draft is never seen again by the check at a later commit that does not include the rule. The report on the commit that changes the wording is therefore the only time the lag becomes visible. Before the specification is approved, the approval procedure shows its owner what the checks report (10.6). The other option put to the owner was to let the commit pass silently, as node 9.5 provides for code without a SpecTag while the specification is a draft.",
  "",
  "The owner chose the report on 2026-11-19 (option 1). While the specification is a draft, such a commit passes, and the check reports each rule whose implementation lags behind its new wording.",
  "",
  "The sixth question of the grilling, now being put to the owner, concerns the owner's view that the agent writes the details of the implementation into the technical appendix while implementing. Under the principle \"Nothing unapproved is implemented\", each node the agent adds to the appendix is a draft until an owner approves it, and its code cannot be committed until then. The question is whether that should hold for such nodes. The agent recommends keeping the principle, and having the owner approve the agent's appendix nodes for one piece of work together, on one page, as the `vt` rule \"Many proposals of one kind are shown on one page as a table\" already allows. Every node of the appendix is a rule that the code implements, and the reviewer judges the code against it. A node nobody approved would let the agent set the rule that its own code is then judged by. The other options put to the owner are to let the agent approve such nodes on the owner's behalf and report them, which changes the principle; or to require no approval for the technical appendix, which changes the principle for a whole part of the specification.",
].join("\n"));
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The agent is waiting for the owner's answer to the sixth question of the grilling, namely whether a node that the agent adds to the technical appendix while implementing needs an owner's approval before its code is committed. The consequence of a failure of the check in row 10.1.40 will be settled once the owner has answered the remaining questions of the grilling." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const outlinePath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outlinePath, "utf8");
const from1 = "- сейчас: пока спецификация черновик, коммит с отставшим правилом проходит молча или с сообщением; рекомендую с сообщением\n";
if (!o.includes(from1)) throw new Error("outline line not found");
o = o.replace(from1, "- ✓ пока спецификация черновик, коммит с отставшим правилом проходит с сообщением (ваш выбор)\n- сейчас: нужно ли одобрение узлам приложения, которые агент пишет при реализации; рекомендую да, группой на одной странице\n");
fs.writeFileSync(outlinePath, o);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const a = "grill-change-7.mjs records the owner's answer to the fourth question and the fifth question.";
if (!s.includes(a)) throw new Error("index text not found");
s = s.replace(a, "grill-change-7.mjs records the owner's answer to the fourth question, and the fifth question as it was put to the owner; grill-change-8.mjs does the same for the fifth and sixth questions.");
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
