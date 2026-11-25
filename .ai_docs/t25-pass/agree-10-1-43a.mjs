// Records the owner's agreement to row 10.1.43a of the main table of checks, writes its English to english-10-1-43a.md for
// EngStickler's reader, applies the corrections confirmed in EngStickler's batch 7, and brings the continuation file,
// the index and the outline of the queue map up to date with the next proposal: the third item of the principle's list
// of the reviewer's judgements.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const tablePath = new URL("table-10-1.json", here);
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const r = t.tables.flatMap(g => g.rows).find(x => x.num === "10.1.43a");
if (!r || r.agreed) throw new Error("row 10.1.43a is missing or already agreed");
r.agreed = "2026-11-20";
r.change += " Вы согласовали строку 20 ноября («ок»).";
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");
fs.writeFileSync(new URL("english-10-1-43a.md", here), [
  "# Row 10.1.43a of the main table of checks", "",
  `What is checked: ${r.en}`, "", `On failure: ${r.cost}`, "", `Reason: ${r.reason}`, "",
].join("\n"));

// The continuation file.
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's decision on the new row 10\.1\.43a[^\n]*/m, () =>
  "**The next session starts by** getting the owner's decision on the proposed new wording of the third item in the list of the reviewer's judgements in the principle \"Deterministic checks hold every participant to the contract\" (docs/principles.md). In the proposed wording, the item applies only to a node of the technical appendix that implements a rule of the base specification, as nodes 1.3.6, 1.6.1 and 10.4 do. Once the owner agrees, the agent writes the new wording into docs/principles.md and then proposes row 10.1.25a, whose draft is kept in draft-10-1-43ab.json. The list of wordings in the section \"Waiting for the owner\" names the proposals that come next, to be made one at a time.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = c.replace(/^- the main table of checks, where no row yet sets what a failure costs for either of the reviewer's two new judgements[^\n]*/m, () =>
  "- the main table of checks, where no row yet set what a failure costs for either of the reviewer's two new judgements: the judgement on a statement that a rule's implementation needs no change, and the judgement on an approved node of the technical appendix. The agent decided to propose two new rows, one for each new judgement, rather than broadening row 10.1.43, since each judgement can be made without the other judgements (node 7.3.3, s-6j8ystpj2yzcchq); the rule reviewer, the agent specsheriff-rule-reviewer, agreed. The owner agreed to row 10.1.43a on 2026-11-20 («ок»). It is the check in which the reviewer judges a statement that a rule's implementation needs no change, and its cost on failure is the same as that of row 10.1.40, since the statement replaces the changes that row 10.1.40 requires. An EngStickler reader agent is reading its English, kept in english-10-1-43a.md. The check in the other row reads no code, so the row goes into the group \"The specification alone\" as row 10.1.25a. Its draft, which already includes the rule reviewer's fixes, is in draft-10-1-43ab.json. Row 10.1.25a is proposed once the third item of the principle, the next item of this list, is settled, since the row's scope depends on that item. The rule reviewer also found that node 10.5 requires a commit to be refused for lack of a readable answer from the reviewer only where the commit changes code; this finding is the item on node 10.5 below;");
fs.writeFileSync(contPath, c);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "which are published together, at the artifact 9ACE2Xts9PgqHbASbWHnzT for the main table of checks.",
  "which are published together to the artifact 9ACE2Xts9PgqHbASbWHnzT, the page of the main table of checks.", "index page");
s = swap(s, "add-10-1-43a.mjs puts row 10.1.43a into table-10-1.json.",
  "add-10-1-43a.mjs puts row 10.1.43a into table-10-1.json, and agree-10-1-43a.mjs records the owner's agreement to that row.", "index row");
fs.writeFileSync(indexPath, s);

// The outline of the queue map.
const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o,
  "### ◐ новая строка 10.1.43a основной таблицы проверок\n- если в сообщении коммита сказано, что реализацию правила менять не нужно, тесты и код правила делают то, что говорит его новая формулировка\n- цена — как у 10.1.40: отклоняется, пока спецификация одобрена; сообщается, пока черновик\n",
  "### ◐ третий пункт принципа о суждениях рецензента\n- только узел приложения, который реализует правило базовой спецификации, как в 1.3.6, 1.6.1 и 10.4\n", "outline waiting");
o = swap(o,"### ✓ узел 10.2 — согласован\n", "### ✓ строка 10.1.43a основной таблицы проверок — согласована\n- «реализацию менять не нужно» проверяет рецензент; цена — как у 10.1.40\n\n### ✓ узел 10.2 — согласован\n", "outline done");
o = swap(o, "- ● строка 10.1.43a основной таблицы проверок\n- ○ третий пункт принципа о суждениях рецензента\n",
  "- ✓ строка 10.1.43a основной таблицы проверок\n- ● третий пункт принципа о суждениях рецензента\n", "outline steps");
fs.writeFileSync(outPath, o);
console.log("row 10.1.43a agreed at", now);
