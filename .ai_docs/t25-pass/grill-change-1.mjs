// Records the owner's view of how work proceeds (2026-11-19), the start of the grilling on it, and the corrections
// EngStickler's readers confirmed in batch 5. Updates the continuation file, the table of checks, the queue outline,
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

edit(new URL("file:///C:/Users/PC/.claude/skills/vt/rules.md"), [
  ["A discussion follows the same rule: each message of the agent takes up one point.\nWhere the owner's message raises several points, the agent answers the first and takes up the others in its later messages, one per message.", "A discussion follows the same rule: each of the agent's messages takes up one point.\nWhere the owner's message raises several points, the agent answers the first, and takes up each of the others in a later message, once the owner has replied to the point before it."],
  ["A question of which reading to choose often should not exist: the owner, seeing past how such questions were framed,", "A question of which reading to choose should often not exist: the owner, looking past the way such questions were framed,"],
]);

const contPath = new URL("../t25-one-thought.md", here);
const work = [
  "- Work stopping. The owner did not understand the argument and asked for it to be explained.",
  "The agent's second explanation stated two consequences of refusing a commit that leaves a rule's tests or code lagging behind its text. First, the specification could not be approved while the tests or the code of any approved rule lag. Second, the commit that approves a new wording of a rule would have to contain that rule's new tests and code.",
  "The owner answered both on 2026-11-19. A check never reads what the commit does not contain: the old text of 10.1 says so, and the list of changes in the head of the table moves that sentence to the node \"The hooks\" of the appendix of the tools. A commit that only changes the approval status of the specification therefore leaves unchecked every rule outside the commit, and the first consequence does not arise. Where the commit includes a rule because something in the rule changed, the rule's tests and code must be brought into line with its new text in the same commit, so the second consequence is what the owner intends.",
  "The agent agrees. Its argument rested on the fact that the current SpecSheriff tools check the history of every node at every commit (the node s-txbwsthdqhvyzd2 of the appendix of the tools). That behaviour contradicts the rule that a check never reads what the commit does not contain, and will be fixed in this step of T25.",
].join(" ");
const view = [
  "",
  "The owner's view of the work, given on 2026-11-19 when asked who checks that a change keeps a rule's meaning, and now being grilled (the skill `grilling`, one question at a time, each with the agent's recommended answer):",
  "- A new application: the specification is written as a draft, its base and its technical appendix, and then approved; the agent then plans and implements all of it, or one domain at a time while the other domains' rules are still being agreed. While implementing, the agent writes the details of the implementation into the technical appendix and asks the owner about the base where needed.",
  "- Maintenance: a request for a change arrives; the agent changes the rules concerned. Where a change alters a rule's logic, the tests and the code follow. Where a change only rewords a rule and keeps its logic, the agent marks that the tests and the code need no change.",
  "- The owner proposes an RFC (Request for Change): a temporary document that the agent writes once the change has been talked over with the owner. It states the meaning of the change and its blast radius: the rules, the tests and the code that must change, without saying how. It also serves the checks, possibly in a fixed structure that lists the checks to run.",
  "",
  "How this view compares with the guidelines, as the agent told the owner:",
  "- What an agent may implement is decided by each rule's approval, not by the specification's: a draft rule is not implemented (10.1.28a), while an approved rule may be implemented while the specification is still a draft. The specification's approval decides whether the tests must pass on a push (10.1.44) and whether code without a SpecTag is warned about (9.5).",
  "- A node the agent adds to the technical appendix while implementing is a draft until an owner approves it, so its code cannot be committed until then (the principle \"Nothing unapproved is implemented\").",
  "- The guidelines have no document of a change. A change that does not alter a rule's meaning is approved on the owner's behalf and reported (docs/principles.md), but nothing records that its tests and code need no change. A commit message names the approved nodes that the changed symbols implement (9.6). CLAUDE.md says that a decision is never kept in a document of its own: a decision on a rule goes into that rule's `meta.decisions`, and any other decision into the commit message.",
  "",
  "The first question of the grilling, now with the owner: whether a change needs a document of its own. The agent recommends no separate document. That the meaning is unchanged is recorded where the change is approved, as an approval made on the owner's behalf for a wording that keeps the meaning; once T28 is done, that approval is kept in the node. The blast radius is computed by the SpecSheriff tools from the links between nodes and from the SpecTags, and shown as a report, rather than written by hand.",
].join("\n");
const lines = fs.readFileSync(contPath, "utf8").split("\n");
const at = lines.findIndex((l) => l.startsWith("- Work stopping."));
if (at < 0) throw new Error("work-stopping bullet not found");
lines[at] = work + "\n" + view;
let c = lines.join("\n");
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The owner's answer to the first question of the grilling on the owner's view of the work: whether a change needs a document of its own. The cost of a failure of the check in row 10.1.40 will be settled once the grilling has settled how a change records that a rule's meaning is unchanged." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const tablePath = new URL("table-10-1.json", here);
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
t.doubts = [
  "Строка 10.1.40 обсуждается. Сошлись: проверка смотрит только правила, которые попали в коммит; коммит, который меняет формулировку правила, приводит и его тесты и код или записывает, что их менять не нужно; сверка идёт по каждому тесту и символу кода, а не по файлу. Сейчас обсуждаем, где записывается, что смысл правила не изменился: идёт опрос по вашему видению работы с изменениями.",
];
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

edit(new URL("queue-outline.md", here), [
  ["- затем: кто проверяет запись «смысл не изменился»\n", "- сейчас: опрос по вашему видению работы с изменениями — новое приложение, реализация, поддержка, RFC\n- первый вопрос: нужен ли изменению отдельный документ\n"],
]);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = s.replace(
  "which removes that consequence.",
  "which removes that consequence. grill-change-1.mjs records the owner's view of how work on a project proceeds, with the proposal of a document of a change, and the first question of the grilling on it.",
);
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
