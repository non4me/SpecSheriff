// Records that the owner's answer of 2026-11-19 reopened row 10.1.40: the proposal of its reason is withdrawn from
// the page, and the question of what the row costs on failure is put first. Updates the table, the queue outline,
// the continuation file and .ai_docs/INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

// The table: the proposal withdrawn, the open question stated.
const tablePath = new URL("table-10-1.json", here);
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const row = t.tables.flatMap((g) => g.rows).find((r) => r.num === "10.1.40");
delete row.proposals;
t.doubts = [
  "Строка 10.1.40. Вы прочитали одобренную формулировку вместе с ценой «сообщается» как противоречие и сказали, каков был замысел: тесты и код строго следуют за правилом, а отставание — причина отклонить коммит, кроме случаев, когда черновик — само правило или вся спецификация. Сейчас решается цена проверки при непрохождении. Обоснование строки будет переписано в техническом стиле после этого решения: оно зависит от него.",
];
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

// The queue outline.
const outlinePath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outlinePath, "utf8");
const swap = (from, to) => {
  if (!o.includes(from)) throw new Error("not found: " + from.slice(0, 60));
  o = o.replace(from, to);
};
swap(
  "- ● сейчас: обоснование строки 10.1.40 (расхождение только сообщается)\n",
  "- ● сейчас: цена строки 10.1.40 — сообщать об отставании или отклонять коммит (ваш замысел)\n",
);
swap(
  "### ◐ обоснование строки 10.1.40\n- перенесено дословно из прежнего обоснования 10.1, которое вы согласовали 17 ноября\n- изменена одна фраза: «эта проверка только сообщает о расхождении»\n",
  "### ◐ цена строки 10.1.40 при непрохождении\n- ваш замысел: отставание отклоняет коммит, кроме черновика правила и черновика спецификации\n- проверка видит только даты изменений файлов; рекомендую оставить «сообщается»\n- обоснование перепишу в техническом стиле после решения\n",
);
fs.writeFileSync(outlinePath, o);

// The continuation file: the state paragraphs rewritten.
const contPath = new URL("../t25-one-thought.md", here);
const lines = fs.readFileSync(contPath, "utf8").split("\n");
const first = lines.findIndex((l) => l.startsWith("**First step if the session is interrupted:**"));
const start = lines.findIndex((l) => l.startsWith("**Now (2026-11-19, 17:45 UTC):**"));
const end = lines.findIndex((l) => l.startsWith("Row 10.1.40 also carries a todo"));
if (first < 0 || start < 0 || end < 0) throw new Error("state paragraphs not found");
lines[first] = "**If the session is interrupted, the next session starts by** asking the owner what row 10.1.40 costs on failure, as the paragraph that begins \"Row 10.1.40 is under discussion\" describes, unless the owner has already decided it.";
const state = [
  `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):** the step of T25 that changes the SpecSheriff tools has begun. The agent decided the order of the remaining steps itself, since the order of the work is the agent's to decide (the \`vt\` rule "Technical and procedural questions are the agent's to decide"). The principle "The specification first, in one direction" determines that order:`,
  "1. The drafts in newform.json and in the tables of checks are moved into the specification files, with their `meta.decisions`. The schema in `specs/_schema/` is part of the specification, as node 5.1 states, so `TableRule` and the `schema` property of a RecordType are added to the schema in the same step.",
  "2. The nodes of the appendix of the tools are reviewed with the owner and changed, one node at a time.",
  "3. The tests are written, then the code.",
  "4. The skills and the guides are brought into line, a release is made with its rehearsal, and the saloon is moved to the new release.",
  "",
  "Neither the current schema nor the current SpecSheriff tools accept a node of kind `TableRule`. Between the move and the change to the tools, the checks will therefore report failures, and the pre-commit hook may refuse the commit that closes a session. That commit is never made with `--no-verify`. Where the hook refuses it, the agent tells the owner and leaves the drafts in `.ai_docs/` until the tools accept the new form of the specification.",
  "",
  "The move starts by reconciling the two versions of 10.1 (s-jau82aq9juv9zzh). The head of the table in table-10-1.json is kept, since the owner agreed to it as a `TableRule`. The draft in newform.json is the old node of kind `TextRule` whose text held the two tables; the owner changed its reason on 2026-11-17. The head's list of changes, accepted on 2026-11-11, says that the explanation of why some checks report a failure instead of refusing the commit is moved into those checks' reasons. reconcile-10-1.mjs records the reconciliation in the head's list of changes, and table-10-1.before-reconcile.json keeps the table as it was before. The paragraphs of the old reason are handled as follows:",
  "- the paragraph on drift, where a rule's tests or code lag behind its text, was to become row 10.1.40's reason; the owner's answer reopened the row itself, as the next paragraph describes;",
  "- \"An approved rule that is not implemented is reported rather than refused, since a rule is approved before its test and its code are written (§s-rah8b37kytb682y)\" becomes row 10.1.41's reason, proposed once row 10.1.40 is settled; the row's node then needs a `cites` link to s-rah8b37kytb682y;",
  "- \"A check reads the commit being made, because judging anything else would pass or refuse what is not being committed\" becomes the reason of the node \"The hooks\" (tools/6) of the appendix of the tools when the owner reviews that node;",
  "- the paragraph on code and tests without a SpecTag is not moved, since 9.5 (s-kkbqcb9xrpaepwn), which rows 10.1.26 and 10.1.26a cite, already gives the reasons for it.",
  "",
  "Row 10.1.40 is under discussion. On 2026-11-19 the owner read its approved wording, \"The tests and the code of an approved rule do not lag behind its text, nor its code behind its tests, as the history of the repository shows\", together with its cost \"reported\", as a contradiction. The owner said what had been meant: tests and code strictly follow the rule, and a lag is a reason to refuse the commit, except while the rule itself or the whole specification is a draft. The owner also asked for the reason to be written in a technical style, without phrases such as \"not the fault of whoever made the commit\". reopen-10-1-40.mjs withdrew the proposed reason from the page. The agent's answer, now put to the owner:",
  "- The row follows the convention of the whole table: its left column states what must hold, and its right column states what happens when it does not.",
  "- The check sees only when the node's text and the files of its tests and code last changed in the history of the repository (the tools node s-txbwsthdqhvyzd2). A file of tests usually holds the tests of several rules.",
  "- A refusal based on those dates would refuse a change to a wording that keeps its meaning, until someone touches that rule's tests and code. Commit 1e50209 changed the wording of 117 rules without changing their meaning, and this repository's specification is approved, so a refusal would have stopped that commit.",
  "- A change to a file of tests made for another rule would hide the lag, so the refusal would also let real lags through.",
  "- When a specification becomes approved, every rule that lagged while it was a draft would make every later commit fail, as code without a SpecTag would have done without 9.5.",
  "- The order of rule, test and code is already enforced by 10.3 (before an agent's edit), 10.1.28a (a draft rule is not implemented), 10.1.41 (an approved rule has code and a test) and 10.1.43 (the reviewer judges whether the changed code does what its rules say).",
  "- The agent recommends keeping \"reported\" and rewriting the reason in a technical style once the cost is settled. The other options put to the owner: refuse except while the rule or the specification is a draft; refuse only while the `strict` flag (10.7) is on.",
  "",
];
lines.splice(start, end - start, ...state);
let c = lines.join("\n");
const waitingFrom = c.indexOf("## Waiting for the owner\n\n");
const waitingTo = c.indexOf("\n", waitingFrom + "## Waiting for the owner\n\n".length);
c = c.slice(0, waitingFrom) + "## Waiting for the owner\n\nRow 10.1.40's cost on failure: whether a lag is reported, as the approved row says, or refuses the commit except while the rule or the specification is a draft." + c.slice(waitingTo);
fs.writeFileSync(contPath, c);

// The index: the timestamps, the new script, and the English of the row of t25-pass/ corrected.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = s.replace(
  "reconcile-10-1.mjs reconciles the two versions of 10.1: the head of the main table of checks stays, and the paragraphs of the old reason move into the reasons of the checks they explain, starting with the proposal for row 10.1.40;",
  "reconcile-10-1.mjs reconciles the two versions of 10.1: the head of the main table of checks is kept, and each paragraph of the old reason is moved into the reason of the check that the paragraph explains;",
);
s = s.replace(
  "state-10-1-40.mjs records that state in the queue outline, and state-reconcile-10-1.mjs records it in the continuation file.",
  "state-10-1-40.mjs records the state of the work after the reconciliation began in the queue outline, and state-reconcile-10-1.mjs records it in the continuation file. reopen-10-1-40.mjs withdraws the reason proposed for row 10.1.40 after the owner's answer reopened the row, and records the question of what the row costs on failure.",
);
fs.writeFileSync(indexPath, s);
console.log("row 10.1.40 reopened at", now);
