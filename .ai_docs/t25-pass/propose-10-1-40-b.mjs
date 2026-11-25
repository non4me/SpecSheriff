// Rewrites the proposal for row 10.1.40 after the owner's remark of 2026-11-19 that a commit itself changes nothing,
// since things change in a commit; records the other places that use a commit as the subject of a change; applies the
// corrections EngStickler's reader confirmed in batch 18.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const en = [
  "Where the wording of an approved rule changes in a commit, the tests and the code already bound to that rule change in the same commit.",
  "Where the tests of an approved rule change in a commit, the code already bound to that rule changes in the same commit.",
  "Instead of these changes, the commit message may state that the rule's implementation needs no change.",
].join(" ");
const ru = [
  "Если в коммите меняется формулировка одобренного правила, в том же коммите меняются и тесты и код, уже привязанные к этому правилу.",
  "Если в коммите меняются тесты одобренного правила, в том же коммите меняется и код, уже привязанный к этому правилу.",
  "Вместо этих изменений в сообщении коммита может быть сказано, что реализацию правила менять не нужно.",
].join(" ");
const cost = "refused, naming the rule, while the specification is approved; reported, naming the rule, while it is a draft";
const ruCost = "отклоняется с названием правила, пока спецификация одобрена; сообщается с названием правила, пока она черновик";
const reason = "Without this check, an approved rule can enter the commit history with tests and code written for its earlier wording, and nobody notices. While the specification is a draft, the work focuses on the specification itself, so a lag is only reported.";
const ruReason = "Без этой проверки одобренное правило может попасть в историю коммитов с тестами и кодом, написанными для прежней формулировки, и этого никто не заметит. Пока спецификация черновик, работа сосредоточена на самой спецификации, поэтому отставание только сообщается.";

const tablePath = new URL("table-10-1.json", here);
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const row = t.tables.flatMap((g) => g.rows).find((r) => r.num === "10.1.40");
row.proposals = [
  {
    en: `${en}\nOn failure: ${cost}.\nReason: ${reason}`,
    ru: `${ru}\nПри непрохождении: ${ruCost}.\nОбоснование: ${ruReason}`,
    why: "Следует из девяти решений опроса 19 ноября (страница «Проверка изменения правила»). По вашему замечанию коммит больше не действует сам: формулировка, тесты и код меняются в коммите. Проверка смотрит только правила, которые затрагивает коммит, а не всю историю. Отставание кода от тестов остаётся. Строка в сообщении коммита «реализацию менять не нужно» стала исключением. Цена была «сообщается», стала «отклоняется, пока спецификация одобрена; сообщается, пока черновик». Обоснование новое, в техническом стиле. Слово «уже» в «уже привязанные» означает, что правило, у которого ещё нет тестов и кода, этой строкой не задевается: о нём сообщает 10.1.41.",
  },
];
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const swap = (a, b) => {
  if (!c.includes(a)) throw new Error("not found: " + a.slice(0, 70));
  c = c.replace(a, b);
};
swap("The owner chose on 2026-11-19 the boundary that the node's own links set (option 1).", "On 2026-11-19 the owner chose the boundary that the node's own links draw (option 1).");
swap("The grilling has settled the design of how a change is checked.", "The grilling has settled how a change is checked.");
swap("the agent drew the design on the page change-check-design.html (https://claude.ai/artifact/D1pWHkY9z1VJQ3n9x7aeaQ) and compared each decision with established practice in a matrix there,", "the agent drew the design as a page, change-check-design.html (https://claude.ai/artifact/D1pWHkY9z1VJQ3n9x7aeaQ), and compared each decision with established practice in a matrix on the same page,");
swap("replied \"ок\" on 2026-11-19.", "replied \"OK\" on 2026-11-19.");
swap("and the node s-txbwsthdqhvyzd2 of the appendix of the tools.", "and node s-txbwsthdqhvyzd2 of the appendix of the tools.");

const lines = c.split("\n");
const start = lines.findIndex((l) => l.startsWith("The proposal for row 10.1.40, now put to the owner"));
const end = lines.findIndex((l, i) => i > start && l.startsWith("The phrase \"already bound\""));
if (start < 0 || end < 0) throw new Error("proposal block not found");
lines.splice(start, end - start + 1,
  "On 2026-11-19 the owner remarked that the first proposal for row 10.1.40 made the commit the actor: a commit itself changes nothing, and things change in a commit. propose-10-1-40-b.mjs rewrote the proposal, now put to the owner:",
  `- text: ${en}`,
  `- on failure: ${cost}`,
  `- reason: ${reason}`,
  "The phrase \"already bound\" leaves to row 10.1.41 the case of a rule that has no tests and no code yet. \"Bound to the rule\" has the meaning that row 10.1.41 gives it: directly, or through a rule that implements it. That definition is stated in row 10.1.41; moving it into node 1.5.2, so that both rows rely on one place, is proposed when node 1.5.2 comes up for review.",
  "The same form, with a commit as the subject of a change, is used in rows 10.1.27, 10.1.27a, 10.1.27b and 10.1.28a and in the drafts of 10.2, 10.4, 10.5 and 9.5 (its text and its reason). Each is proposed to the owner separately when its turn comes, since only row 10.1.40 was asked about.",
);
c = lines.join("\n");
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The agent is waiting for the owner's decision on the rewritten proposal for row 10.1.40. The other wordings that follow from the grilling will be proposed after it, one at a time." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "propose-10-1-40.mjs proposes the new wording of row 10.1.40 that follows from the grilling.";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, "propose-10-1-40.mjs proposes the new wording of row 10.1.40 that follows from the round of questions put to the owner with the skill `grilling`; propose-10-1-40-b.mjs rewrites it so that the wording, the tests and the code change in a commit, rather than the commit changing them.");
fs.writeFileSync(indexPath, s);
console.log("rewritten at", now);
