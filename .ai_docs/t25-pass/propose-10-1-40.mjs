// Proposes the new wording of row 10.1.40 that follows from the owner's decisions in the grilling of 2026-11-19,
// records it in the table, the continuation file, the queue outline and .ai_docs/INDEX.md, and applies the corrections
// EngStickler's reader confirmed in batch 17.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const en = [
  "A commit that changes the wording of an approved rule also changes the tests and the code already bound to that rule.",
  "A commit that changes the tests of an approved rule also changes the code already bound to that rule.",
  "Instead of these changes, the commit message may state that the rule's implementation needs no change.",
].join(" ");
const ru = [
  "Коммит, который меняет формулировку одобренного правила, меняет и тесты и код, уже привязанные к этому правилу.",
  "Коммит, который меняет тесты одобренного правила, меняет и код, уже привязанный к этому правилу.",
  "Вместо этих изменений сообщение коммита может сказать, что реализацию правила менять не нужно.",
].join(" ");
const cost = "refused, naming the rule, while the specification is approved; reported, naming the rule, while it is a draft";
const ruCost = "отклоняется с названием правила, пока спецификация одобрена; сообщается с названием правила, пока она черновик";
const reason = "Without this check, an approved rule can enter the history with tests and code written for its earlier wording, and nobody notices. While the specification is a draft, the work is focused on the specification itself, so a lag is only reported.";
const ruReason = "Без этой проверки одобренное правило может попасть в историю с тестами и кодом, написанными для прежней формулировки, и этого никто не заметит. Пока спецификация черновик, работа сосредоточена на самой спецификации, поэтому отставание только сообщается.";

const tablePath = new URL("table-10-1.json", here);
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const row = t.tables.flatMap((g) => g.rows).find((r) => r.num === "10.1.40");
row.proposals = [
  {
    en: `${en}\nOn failure: ${cost}.\nReason: ${reason}`,
    ru: `${ru}\nПри непрохождении: ${ruCost}.\nОбоснование: ${ruReason}`,
    why: "Следует из девяти решений опроса 19 ноября (страница «Проверка изменения правила»). Проверка смотрит только правила, которые затрагивает коммит, а не всю историю. Отставание кода от тестов остаётся. Трейлер «реализацию менять не нужно» стал исключением. Цена была «сообщается», стала «отклоняется, пока спецификация одобрена; сообщается, пока черновик». Обоснование новое, в техническом стиле. Слово «уже» в «уже привязанные» означает, что правило, у которого ещё нет тестов и кода, этой строкой не задевается: о нём сообщает 10.1.41.",
  },
];
t.doubts = [
  "Строка 10.1.40: предложена новая формулировка, которая следует из решений опроса 19 ноября. Ждёт вашего решения.",
];
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const swap = (a, b) => {
  if (!c.includes(a)) throw new Error("not found: " + a.slice(0, 70));
  c = c.replace(a, b);
};
swap("a node of the technical appendix qualifies if it has an `implements` link", "a node of the technical appendix qualifies for approval by the agent if it has an `implements` link");
swap("and that only the nodes so marked are reviewed and reported.", "and that only the nodes whose approvals are so marked are reviewed and reported.");
swap("The owner chose the boundary set by the node on 2026-11-19 (option 1). The rules of the base and the nodes that have no `implements` link to an approved rule of the base are approved only by an owner.", "The owner chose on 2026-11-19 the boundary that the node's own links set (option 1). The rules of the base and the nodes that have no `implements` link to an approved rule of the base may be approved only by an owner.");
swap("before any wording is proposed. The wordings that follow from it are then proposed one at a time: row 10.1.40,", "before proposing any wording. The owner looked at the page and replied \"ок\" on 2026-11-19. The wordings that follow from the design are proposed one at a time, for row 10.1.40,");
const marker = "and the node s-txbwsthdqhvyzd2 of the appendix of the tools.";
const at = c.indexOf(marker);
if (at < 0) throw new Error("wordings list not found");
const added = [
  "",
  "",
  "The proposal for row 10.1.40, now put to the owner and written into table-10-1.json by propose-10-1-40.mjs:",
  `- text: ${en}`,
  `- on failure: ${cost}`,
  `- reason: ${reason}`,
  "The phrase \"already bound\" leaves a rule that has no tests and no code yet to row 10.1.41. \"Bound to the rule\" has the meaning that row 10.1.41 gives it: directly, or through a rule that implements it. That definition lives inside row 10.1.41; moving it into node 1.5.2, so that both rows rely on one place, is proposed when node 1.5.2's turn comes.",
].join("\n");
c = c.slice(0, at + marker.length) + added + c.slice(at + marker.length);
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The agent is waiting for the owner's decision on the proposed wording of row 10.1.40. The other wordings that follow from the grilling come after it, one at a time." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const outlinePath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outlinePath, "utf8");
const from1 = "- ● сейчас: страница с устройством проверки изменений и сравнением решений с практикой\n- ○ затем, по одной: строка 10.1.40, два принципа, 1.3.6, 10.4, узел описания инструментов об отставании\n";
if (!o.includes(from1)) throw new Error("outline lines not found");
o = o.replace(from1, "- ✓ страница «Проверка изменения правила» — вы посмотрели\n- ● сейчас: новая формулировка строки 10.1.40\n- ○ затем, по одной: два принципа, 1.3.6, 10.4, узел описания инструментов об отставании\n");
fs.writeFileSync(outlinePath, o);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "state-design-page.mjs records its address.";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, b + " propose-10-1-40.mjs proposes the new wording of row 10.1.40 that follows from the grilling.");
fs.writeFileSync(indexPath, s);
console.log("proposed at", now);
