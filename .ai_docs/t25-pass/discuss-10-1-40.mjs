// Records the owner's replies of 2026-11-19 to the agent's three arguments on row 10.1.40, and the agent's answers,
// in the continuation file, the table of checks, the queue outline and .ai_docs/INDEX.md. The English of the state
// paragraphs is rewritten with the corrections EngStickler's reader confirmed in batch 2.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

// The continuation file.
const contPath = new URL("../t25-one-thought.md", here);
const lines = fs.readFileSync(contPath, "utf8").split("\n");
const first = lines.findIndex((l) => l.startsWith("**If the session is interrupted, the next session starts by**"));
const start = lines.findIndex((l) => l.startsWith("**Now ("));
const end = lines.findIndex((l) => l.startsWith("Row 10.1.40 also "));
if (first < 0 || start < 0 || end < 0) throw new Error("state paragraphs not found");
lines[end] = lines[end].replace("Row 10.1.40 also carries a todo", "Row 10.1.40 also has a todo");
lines[first] = "**If the session is interrupted, the next session starts by** continuing the discussion of row 10.1.40 with the owner, as the paragraph that begins \"Row 10.1.40 is under discussion\" describes, unless the owner has already settled the cost of a failure of that row.";
const state = [
  `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):** the step of T25 that changes the SpecSheriff tools has begun. The agent decided the order of its stages on its own, since the order of the work is the agent's to decide (the \`vt\` rule "Technical and procedural questions are the agent's to decide"). The principle "The specification first, in one direction" determines that order:`,
  "1. The drafts in newform.json and in the tables of checks are moved into the specification files, with their `meta.decisions`. The schema in `specs/_schema/` is part of the specification, as node 5.1 states, so `TableRule` and the `schema` property of a RecordType are added to the schema in the same stage.",
  "2. The nodes of the appendix of the tools are reviewed with the owner and changed, one node at a time.",
  "3. The tests are written, then the code.",
  "4. The skills and the guides are brought into line with the new specification, a release is rehearsed and published, and the saloon is updated to the new release.",
  "",
  "Neither the current schema nor the current SpecSheriff tools accept a node of kind `TableRule`. Between the move and the change to the tools, the checks will therefore report failures, and the pre-commit hook may refuse the commit that closes a session. That commit is never made with `--no-verify`. Where the hook refuses it, the agent tells the owner, and the drafts stay in `.ai_docs/`, outside the specification files, until the tools accept the new form of the specification.",
  "",
  "The move starts by reconciling the two versions of 10.1 (s-jau82aq9juv9zzh). The head of the table in table-10-1.json is kept, since the owner agreed to it in the form of a `TableRule`. The draft in newform.json is the old node of kind `TextRule`, whose text held the two tables; the owner changed its reason on 2026-11-17. The head's list of changes, accepted on 2026-11-11, says that the explanation of why some checks report a failure instead of refusing the commit is to be moved into those checks' reasons. reconcile-10-1.mjs records the reconciliation in the head's list of changes, and table-10-1.before-reconcile.json keeps the table as it was before the reconciliation. The paragraphs of the old reason are handled as follows:",
  "- the paragraph on drift, where a rule's tests or code lag behind its text, was to become row 10.1.40's reason; the owner's answer reopened the row itself, as the paragraph after this list describes;",
  "- \"An approved rule that is not implemented is reported rather than refused, since a rule is approved before its test and its code are written (§s-rah8b37kytb682y)\" is to become row 10.1.41's reason, to be proposed after row 10.1.40 is settled; the row's node then needs a `cites` link to s-rah8b37kytb682y;",
  "- \"A check reads the commit being made, because judging anything else would pass or refuse what is not being committed\" becomes the reason of the node \"The hooks\" (tools/6) of the appendix of the tools when the owner reviews that node;",
  "- the paragraph on code and tests without a SpecTag is not moved, since node 9.5 (s-kkbqcb9xrpaepwn), which rows 10.1.26 and 10.1.26a cite, already gives the reasons for it.",
  "",
  "Row 10.1.40 is under discussion. On 2026-11-19 the owner read its approved wording, \"The tests and the code of an approved rule do not lag behind its text, nor its code behind its tests, as the history of the repository shows\", together with its cost on failure, \"reported\", as a contradiction. The owner said what had been meant: tests and code strictly follow the rule, and a lag is a reason to refuse the commit, except while the rule itself or the whole specification is a draft. The owner also asked for the reason to be written in a technical style, without phrases such as \"not the fault of whoever made the commit\". reopen-10-1-40.mjs withdrew the proposed reason from the page of the main table of checks. The English of the row's wording needs \"nor does its code lag behind its tests\"; this is fixed once the row is settled.",
  "",
  "The agent first recommended keeping \"reported\", with three arguments. The owner answered each of them on 2026-11-19, and the agent's answers are now with the owner:",
  "- A change to a wording that keeps its meaning. The owner: this is a defect of the check, not of the intent; the check must judge by meaning, not by dates. Where a wording changes without changing its meaning, the agent records in the commit that the tests and the code need no change, and the check then finds no lag. The agent agrees. The method already makes this judgement: a change that changes no meaning is approved on the owner's behalf and reported to the owner (docs/principles.md). The agent proposes recording it as a git trailer in the commit message, naming the rule; the commit-msg hook already reads the message. Still open: who checks that such a record is true. The reviewer judges only commits that change code, and the principle on deterministic checks names the reviewer's judgement as the only judgement that is not deterministic. The same record is needed where a test is added for behaviour the code already has, since the tests then change and the code does not.",
  "- Several tests in one file. The owner: this is a defect of the script; the check must follow each test, not each file. The agent agrees, and adds that a file of code also holds the symbols of several rules. The SpecSheriff tools already map the changed lines of a commit to the symbols they belong to, for the check of the commit message, so the history can show the last commit that changed a rule's own tests and symbols. This is fixed first in the appendix of the tools, then in the tests and the code of this step.",
  "- Work stopping. The owner did not understand the argument and asked for it to be explained. The agent's first wording of it was inaccurate. A refusal has two precise consequences. First, the specification cannot be approved while any approved rule lags, although node 10.6 lets the owners approve it after seeing what the checks report. Second, the commit that approves a new wording of a rule must also contain that rule's new tests and code, since a draft rule's code cannot be committed (10.1.28a) and the lag is refused as soon as the rule is approved. In this repository the approval and the implementation already land in one commit per task, so the second consequence matters mostly for a team in which an owner approves in a commit of their own. A lag means that the work is not finished. It does not mean that the order of rule, test and code was broken, since 10.3 and 10.1.28a already refuse that.",
  "",
];
lines.splice(start, end - start, ...state);
let c = lines.join("\n");
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The owner's reply to the agent's answers on row 10.1.40. Once the owner has replied, the cost of a failure of row 10.1.40 is settled." + c.slice(to);
fs.writeFileSync(contPath, c);

// The table: the open question restated.
const tablePath = new URL("table-10-1.json", here);
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
t.doubts = [
  "Строка 10.1.40 обсуждается. Ваш замысел: тесты и код строго следуют за правилом, отставание отклоняет коммит, кроме черновика правила и черновика спецификации. В обсуждении мы сходимся в двух вещах. Первое: сверять по смыслу, а не по датам; правка формулировки без смены смысла записывается в коммите. Второе: сверять по каждому тесту и символу кода, а не по файлу. Открыто: отставание сразу после одобрения новой формулировки — незавершённая работа или причина отклонить коммит.",
];
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

// The queue outline.
const outlinePath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outlinePath, "utf8");
const swap = (a, b) => {
  if (!o.includes(a)) throw new Error("not found: " + a.slice(0, 60));
  o = o.replace(a, b);
};
swap(
  "- ● сейчас: цена строки 10.1.40 — сообщать об отставании или отклонять коммит (ваш замысел)\n",
  "- ● сейчас: строка 10.1.40 — обсуждаем ваш замысел строгой проверки отставания\n",
);
swap(
  "### ◐ цена строки 10.1.40 при непрохождении\n- ваш замысел: отставание отклоняет коммит, кроме черновика правила и черновика спецификации\n- проверка видит только даты изменений файлов; рекомендую оставить «сообщается»\n- обоснование перепишу в техническом стиле после решения\n",
  "### ◐ строка 10.1.40 — обсуждение\n- сходимся: сверять по смыслу, а не по датам; правка без смены смысла записывается в коммите\n- сходимся: сверять по каждому тесту и символу кода, а не по файлу — ошибка скрипта, исправлю\n- открыто: отставание сразу после одобрения — незавершённая работа или причина отклонить коммит\n",
);
fs.writeFileSync(outlinePath, o);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = s.replace(
  "state-10-1-40.mjs records the state of the work after the reconciliation began in the queue outline,",
  "state-10-1-40.mjs records in the queue outline the state of the work after the reconciliation began,",
);
s = s.replace(
  "and records the question of what the row costs on failure.",
  "and records the question of what a failure of the row costs. discuss-10-1-40.mjs records the owner's replies to the agent's arguments on row 10.1.40 and the agent's answers.",
);
fs.writeFileSync(indexPath, s);
console.log("discussion of row 10.1.40 recorded at", now);
