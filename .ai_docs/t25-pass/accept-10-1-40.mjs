// Records row 10.1.40 as the owner agreed it on 2026-11-19 («ок»), applies the corrections EngStickler's reader
// confirmed in batch 19, and puts the next proposal, the principle on deterministic checks, in the section of the
// continuation file that says what is waiting for the owner.
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
const reason = "Without this check, an approved rule can enter the commit history with tests and code written for its earlier wording, and nobody notices. While the specification is a draft, the work is focused on the specification itself, so a rule whose tests and code lag behind its wording is only reported.";
const ruReason = "Без этой проверки одобренное правило может попасть в историю коммитов с тестами и кодом, написанными для прежней формулировки, и этого никто не заметит. Пока спецификация черновик, работа сосредоточена на самой спецификации, поэтому о правиле, тесты и код которого отстают от его формулировки, только сообщается.";

const tablePath = new URL("table-10-1.json", here);
fs.copyFileSync(tablePath, new URL("table-10-1.before-accept-10-1-40.json", here));
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const row = t.tables.flatMap((g) => g.rows).find((r) => r.num === "10.1.40");
if (!row || !row.proposals) throw new Error("row 10.1.40 holds no proposal");
Object.assign(row, { en, cost, ru, ruCost, reason, ruReason, agreed: "2026-11-19" });
row.change = "Вы приняли эту формулировку (2026-11-19, «ок»). Она следует из решений опроса 19 ноября. Формулировка, тесты и код меняются в коммите, а не коммит меняет их. Проверка смотрит только правила, которые меняются в коммите. Вместо изменений в сообщении коммита может быть сказано, что реализацию правила менять не нужно. Пока спецификация одобрена, отставание отклоняется; пока она черновик, о нём сообщается.";
delete row.proposals;
row.todos.push("На шаге, который меняет инструменты SpecSheriff: проверка (s-txbwsthdqhvyzd2) смотрит только правила, формулировка или тесты которых меняются в коммите; сравнивает тесты и символы кода, привязанные к правилу, а не файлы целиком; читает трейлер в сообщении коммита; отклоняет коммит, пока спецификация одобрена.");
t.doubts = t.doubts.filter((d) => !d.startsWith("Строка 10.1.40"));
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const swap = (a, b) => {
  if (!c.includes(a)) throw new Error("not found: " + a.slice(0, 70));
  c = c.replace(a, b);
};

swap(
  /\*\*If the session is interrupted, the next session starts by\*\*[^\n]*/.exec(c)[0],
  "**If the session is interrupted, the next session starts by** getting the owner's decision on the proposed wording of the principle \"Deterministic checks hold every participant to the contract\" in docs/principles.md, which the section \"Waiting for the owner\" gives in full.",
);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);

// "Grilling" alone is not a countable noun for the round of questions; it names the session held with the skill.
c = c.replace(/\b([Tt]he) grilling\b(?! session)/g, "$1 grilling session");

const lines = c.split("\n");
const start = lines.findIndex((l) => l.startsWith("On 2026-11-19 the owner remarked that the first proposal for row 10.1.40"));
const end = lines.findIndex((l, i) => i > start && l.startsWith("The same form, with a commit as the subject of a change"));
if (start < 0 || end < 0) throw new Error("proposal block not found");
lines.splice(start, end - start + 1,
  "The owner agreed to row 10.1.40 on 2026-11-19 («ок»). The agreed wording is the one rewritten after the owner's remark that the first proposal made a commit the subject of the verb \"change\": a commit itself changes nothing, and the wording, the tests and the code are what change in a commit. accept-10-1-40.mjs wrote the agreed row into table-10-1.json:",
  `- text: ${en}`,
  `- on failure: ${cost}`,
  `- reason: ${reason}`,
  "Row 10.1.41, not row 10.1.40, covers a rule that has no tests and no code yet, since the phrase \"already bound\" leaves such a rule out. \"Bound to the rule\" has the meaning that row 10.1.41 gives the phrase: directly, or through a rule that implements the rule in question. That definition is stated in row 10.1.41. Moving it into node 1.5.2, so that both rows rely on a single definition, is proposed when node 1.5.2 comes up for review.",
  "The same construction, in which a commit is the subject of a verb that states a change, is used in rows 10.1.27, 10.1.27a, 10.1.27b and 10.1.28a, in the drafts of 10.2, 10.4 and 10.5, and in both the text and the reason of 9.5. Each of these is a row or a node of its own, so the agent proposes each to the owner separately when its turn comes.",
);
c = lines.join("\n");

swap(
  "Row 10.1.40 also has a todo for the step that changes the SpecSheriff tools: `sheriff binding` must stop reporting the drift of a draft rule.",
  "Row 10.1.40 has two todos for the step that changes the SpecSheriff tools. The first says that `sheriff binding` must stop reporting the drift of a draft rule. The second lists what must change in the check that tools node s-txbwsthdqhvyzd2 describes:\n- it reads only the rules whose wording or tests change in a commit;\n- it compares the tests and the symbols of code bound to a rule, rather than whole files;\n- it reads the trailer in the commit message;\n- it refuses a commit while the specification is approved.",
);

const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n## ", from + head.length);
c = c.slice(0, from) + head + [
  "The agent has proposed to the owner a new wording of the last sentence of the principle \"Deterministic checks hold every participant to the contract\" in docs/principles.md, and is waiting for the owner's decision. The first sentence of the principle stays as it is. The current last sentence reads:",
  "",
  "> The one judgement that is not deterministic — whether the code does only what its rules say — is made by an independent reviewer at every commit that changes code.",
  "",
  "The proposed wording, which follows from the second, seventh and eighth questions of the grilling session:",
  "",
  "> An independent reviewer makes the judgements that are not deterministic:",
  "> - whether the code does only what its rules say, for every commit in which code changes;",
  "> - whether a rule's implementation indeed needs no change, where a commit message says that it does not;",
  "> - whether a node of the technical appendix approved in a commit contradicts no rule of the base specification and only says how the rules it implements are carried out.",
  "",
  "The other wordings that follow from the grilling session will be proposed after the owner's decision, one at a time: the principle \"Nothing unapproved is implemented\", node 1.3.6 (s-t5uw8zfxzhfdg86), node 10.4 (s-nyh9yk22ba6g77q), the reason of row 10.1.41, and node s-txbwsthdqhvyzd2 of the appendix of the tools.",
  "",
].join("\n") + c.slice(to);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "propose-10-1-40.mjs proposes the new wording of row 10.1.40 that follows from the round of questions put to the owner with the skill `grilling`; propose-10-1-40-b.mjs rewrites it so that the wording, the tests and the code change in a commit, rather than the commit changing them.";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, "propose-10-1-40.mjs proposes the new wording of row 10.1.40 that follows from the round of questions put to the owner using the skill `grilling`. propose-10-1-40-b.mjs rewrites that proposal so that a rule's wording, its tests and its code are changed in a commit, rather than by the commit. accept-10-1-40.mjs records the agreed row 10.1.40 and puts the next proposal, on the principle about deterministic checks, in the continuation file.");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
const oswap = (a, b2) => {
  if (!o.includes(a)) throw new Error("outline text not found: " + a.slice(0, 60));
  o = o.replace(a, b2);
};
oswap("- ● сейчас: строка 10.1.40 — обсуждаем ваш замысел строгой проверки отставания\n", "- ✓ строка 10.1.40 согласована: формулировка, тесты и код правила меняются в одном коммите\n");
const w0 = o.indexOf("### ◐ строка 10.1.40 — обсуждение");
const w1 = o.indexOf("\n## ", w0);
if (w0 < 0 || w1 < 0) throw new Error("waiting branch not found");
o = o.slice(0, w0) + [
  "### ◐ принцип о детерминированных проверках — новая формулировка",
  "- ● сейчас: суждения рецензента — списком: код; «реализацию менять не нужно»; узел приложения, одобренный в коммите",
  "- ○ затем, по одной: принцип «Ничего неодобренного не реализуется», 1.3.6, 10.4, обоснование 10.1.41, узел описания инструментов об отставании",
  "",
].join("\n") + o.slice(w1);
oswap("## ● В работе:", [
  "### ✓ опрос о проверке изменения правила — восемь решений (ваши ответы)",
  "- отдельного документа изменения нет; пометка «реализацию менять не нужно» — трейлер в сообщении коммита",
  "- трейлер проверяет независимый рецензент; сравниваются только тесты и код, привязанные к правилу из коммита",
  "- пока спецификация черновик, коммит с отставшим правилом проходит с сообщением",
  "- узлы приложения со связью implements к одобренному правилу базы агент одобряет от вашего имени; их проверяет рецензент",
  "- страница «Проверка изменения правила» — вы посмотрели",
  "",
  "### ✓ строка 10.1.40 — согласована",
  "- если в коммите меняется формулировка одобренного правила, в нём же меняются его тесты и код",
  "- если меняются тесты — меняется и код; иначе в сообщении коммита сказано, что реализацию менять не нужно",
  "- отклоняется, пока спецификация одобрена; сообщается, пока черновик",
  "",
  "## ● В работе:",
].join("\n"));
fs.writeFileSync(outPath, o);
console.log("agreed at", now);
