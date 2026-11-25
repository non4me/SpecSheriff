// Records the owner's answer of 2026-11-19 on the first consequence of refusing a lag (row 10.1.40) and the
// agent's explanation, and applies the corrections EngStickler's reader confirmed in batch 3. Updates the
// continuation file, the table of checks, the queue outline and .ai_docs/INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const edit = (path, pairs) => {
  let s = fs.readFileSync(path, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`not found in ${path.pathname.split("/").pop()}: ${a.slice(0, 70)}`);
    s = s.replace(a, b);
  }
  fs.writeFileSync(path, s);
};

const work = [
  "- Work stopping. The owner did not understand the argument and asked for it to be explained.",
  "The agent's second wording named two consequences. First, the specification could not be approved while the tests or the code of any approved rule lag. Second, the commit that approves a new wording of a rule would have to contain that rule's new tests and code, since a draft rule's code cannot be committed (10.1.28a) and a commit that leaves a lag would be refused as soon as the rule is approved.",
  "The owner answered the first consequence on 2026-11-19: approving the specification has nothing to do with the statuses of its rules, as the reasons of nodes 10.6 and 1.3.3 state. The agent's explanation, now with the owner: the first consequence concerns the check, not the statuses of rules. Under the owner's exception, a lag is allowed while the specification is a draft. The commit that records the approval of the specification is the first commit in which the specification is approved, so the exception no longer applies to it. The check would refuse that commit wherever the tests or the code of an approved rule still lag. A refusal would therefore tie the approval of the specification to the state of the rules' implementation, which contradicts the owner's ruling.",
  "The second consequence and the other open points wait for later messages, one per message (the `vt` rule \"One question per message, put in terms of what a person sees\").",
].join(" ");

edit(new URL("../t25-one-thought.md", here), [
  ["unless the owner has already settled the cost of a failure of that row.", "unless the owner has already settled the cost of a failure of the check in that row."],
  ["The English of the row's wording needs \"nor does its code lag behind its tests\"; this is fixed once the row is settled.", "In the English of the row's wording, \"nor its code behind its tests\" needs to become \"nor does its code lag behind its tests\"; this will be fixed once the row is settled."],
  ["- A change to a wording that keeps its meaning. The owner: this is a defect of the check, not of the intent;", "- A change in a rule's wording that keeps its meaning. The owner: this is a defect in the check, not in the intent;"],
  ["Where a wording changes without changing its meaning,", "Where a rule's wording changes without changing its meaning,"],
  ["The method already makes this judgement: a change that changes no meaning is approved", "The method already provides for this judgement: a change that does not change the meaning is approved"],
  ["as a git trailer in the commit message, naming the rule;", "as a git trailer in the commit message that names the rule;"],
  ["The owner: this is a defect of the script;", "The owner: this is a defect in the script;"],
  ["This is fixed first in the appendix of the tools,", "This will be fixed first in the appendix of the tools,"],
  ["Row 10.1.40 also has a todo for the step that changes the tools:", "Row 10.1.40 also has a todo for the step that changes the SpecSheriff tools:"],
]);

// The bullet on work stopping, rewritten whole; the waiting section restated.
const contPath = new URL("../t25-one-thought.md", here);
const lines = fs.readFileSync(contPath, "utf8").split("\n");
const at = lines.findIndex((l) => l.startsWith("- Work stopping."));
if (at < 0) throw new Error("work-stopping bullet not found");
lines[at] = work;
let c = lines.join("\n");
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The owner's reply to the agent's explanation of the first consequence of refusing a lag (row 10.1.40). The second consequence and the other open points follow, one per message; the cost of a failure of the check in row 10.1.40 will be settled after them." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

// The table: the point under discussion.
const tablePath = new URL("table-10-1.json", here);
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
t.doubts = [
  "Строка 10.1.40 обсуждается, по одному пункту. Сейчас: если отставание отклоняет коммит, а исключение действует только пока спецификация черновик, то коммит, одобряющий спецификацию, будет отклонён, пока у какого-нибудь одобренного правила отстают тесты или код. Одобрение спецификации оказалось бы связано с состоянием реализации правил, а по вашему решению оно от правил не зависит.",
];
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

// The queue outline.
edit(new URL("queue-outline.md", here), [
  ["- открыто: отставание сразу после одобрения — незавершённая работа или причина отклонить коммит\n", "- сейчас: отклонение отставания не дало бы закоммитить одобрение спецификации — объяснил на примере\n- затем, по одному: коммит, одобряющий новую формулировку правила; кто проверяет запись «смысл не изменился»\n"],
]);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = s.replace("and records the question of what a failure of the row costs.", "and records the question of what a failure of the check in the row costs.");
s = s.replace(
  "discuss-10-1-40.mjs records the owner's replies to the agent's arguments on row 10.1.40 and the agent's answers.",
  "discuss-10-1-40.mjs records the owner's replies to the agent's arguments on row 10.1.40 and the agent's answers to those replies; discuss-10-1-40-b.mjs records the owner's answer on the first consequence of refusing a lag and the agent's explanation.",
);
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
