// Records the owner's answer of 2026-11-19 that a check never reads what the commit does not hold, which removes
// the first consequence of refusing a commit that leaves a lag (row 10.1.40), and applies the corrections
// EngStickler's readers confirmed in batch 4. Updates the continuation file, the table of checks, the queue outline,
// .ai_docs/INDEX.md and the vt skill's rules.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const edit = (path, pairs) => {
  let s = fs.readFileSync(path, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`not found in ${String(path).split("/").pop()}: ${a.slice(0, 70)}`);
    s = s.replace(a, b);
  }
  fs.writeFileSync(path, s);
};

const contPath = new URL("../t25-one-thought.md", here);
edit(contPath, [
  ["In the English of the row's wording, \"nor its code behind its tests\" needs to become \"nor does its code lag behind its tests\";", "In the English wording of the row, \"nor its code behind its tests\" needs to be changed to \"nor does its code lag behind its tests\";"],
  ["The owner: this is a defect in the check, not in the intent; the check must judge by meaning, not by dates.", "The owner said that this is a defect in the check, not in the intent, and that the check must judge by meaning, not by dates."],
  ["the agent records in the commit that the tests and the code need no change,", "the agent records in the commit message that the tests and the code need no change,"],
  ["a change that does not change the meaning is approved on the owner's behalf", "a change that does not change a rule's meaning is approved on the owner's behalf"],
  ["The owner: this is a defect in the script; the check must follow each test, not each file. The agent agrees, and adds that a file of code also holds", "The owner said that this is a defect in the script and that the check must track each test, not each file. The agent agrees, and adds that a code file also holds"],
]);

const work = [
  "- Work stopping. The owner did not understand the argument and asked for it to be explained.",
  "The agent's second wording stated two consequences of refusing a commit that leaves a lag. First, the specification could not be approved while the tests or the code of any approved rule lag. Second, the commit that approves a new wording of a rule would have to contain that rule's new tests and code.",
  "The owner answered both on 2026-11-19. A check never reads what the commit does not hold: the old text of 10.1 says so, and the head's list of changes moves that sentence to the node \"The hooks\" of the appendix of the tools. A commit that only changes the approval status of the specification therefore leaves unchecked every rule outside the commit, and the first consequence does not arise. Where a rule is in the commit because something in it changed, its tests and code must be brought into line in the same commit, so the second consequence is what the owner intends.",
  "The agent agrees. Its argument rested on the current SpecSheriff tools, which check the history of every node at every commit (the node s-txbwsthdqhvyzd2 of the appendix of the tools). That contradicts the rule that a check never reads what the commit does not hold, and will be fixed in this step.",
].join(" ");
const lines = fs.readFileSync(contPath, "utf8").split("\n");
const at = lines.findIndex((l) => l.startsWith("- Work stopping."));
if (at < 0) throw new Error("work-stopping bullet not found");
lines[at] = work;
let c = lines.join("\n");
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The next open point of row 10.1.40, to be put to the owner: who checks that a record saying that a rule's tests and code need no change is true. The case of a test added for behaviour that the code already has comes after it. What a failure of the row's check costs will be settled once both points are settled." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

// The table: what the discussion has settled, and the next point.
const tablePath = new URL("table-10-1.json", here);
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
t.doubts = [
  "Строка 10.1.40 обсуждается, по одному пункту. Сошлись: проверка смотрит только правила, которые попали в коммит; коммит, который меняет формулировку правила, приводит и его тесты и код или записывает, что их менять не нужно; сверка идёт по каждому тесту и символу кода, а не по файлу. Следующий пункт: кто проверяет запись «смысл не изменился».",
];
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

// The queue outline.
edit(new URL("queue-outline.md", here), [
  ["- сейчас: отклонение отставания не дало бы закоммитить одобрение спецификации — объяснил на примере\n- затем, по одному: коммит, одобряющий новую формулировку правила; кто проверяет запись «смысл не изменился»\n", "- сошлись: проверка смотрит только правила, попавшие в коммит; одобрение спецификации она не задевает\n- сошлись: коммит, меняющий формулировку правила, приводит и его тесты и код\n- затем: кто проверяет запись «смысл не изменился»\n"],
]);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = s.replace(
  "discuss-10-1-40-b.mjs records the owner's answer on the first consequence of refusing a lag and the agent's explanation.",
  "discuss-10-1-40-b.mjs records the owner's answer to the first consequence of refusing a commit that leaves a lag, and the agent's explanation; discuss-10-1-40-c.mjs records the owner's answer that a check never reads what the commit does not hold, which removes that consequence.",
);
fs.writeFileSync(indexPath, s);

// The vt skill's rules: the English of the rule added this session.
edit(new URL("file:///C:/Users/PC/.claude/skills/vt/rules.md"), [
  ["before the choice is put again. A discussion goes the same way: each message takes up one point. Where the owner's\nmessage raises several points, the agent answers the first, and the others wait for later messages.", "before the choice is put to the owner again. A discussion follows the same rule: each message of the agent takes up one point.\nWhere the owner's message raises several points, the agent answers the first and takes up the others in its later messages, one per message."],
  ["owner then answered only one of them (the owner, 2026-11-19:", "owner then replied to only one of the agent's answers (the owner, 2026-11-19:"],
]);
console.log("recorded at", now);
