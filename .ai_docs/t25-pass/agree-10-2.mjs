// After accept-proposal.mjs has written the agreed wording of node 10.2 into its draft: records the ruling it carries out
// in the draft's `decisions` and the nodes its text cites in the draft's `cites`; writes its agreed English text to
// english-10-2.md for EngStickler's reader; corrects the English of the agreed 1.6.1 as EngStickler's reader found,
// without changing its meaning; applies the corrections confirmed in EngStickler's batch 2; and brings the
// continuation file, the index and the outline of the queue map up to date.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${String(from).slice(0, 70)}`);
  return s.replace(from, () => to);
};

const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
fs.copyFileSync(nfPath, new URL("newform.before-agree-10-2.json", here));

// 10.2: the ruling and the citations.
const b = nf["10.2"];
if (b.agreed !== "2026-11-20" || b.proposals) throw new Error("accept-proposal.mjs has not run on 10.2");
b.decisions = [
  ...(b.decisions || []),
  {
    date: "2026-11-20",
    problem: "On which commits the review runs, now that the reviewer makes three judgements.",
    ruling: "The owner: on every commit for which the list of the reviewer's judgements in 1.6.1 names at least one judgement. Node 10.2 refers to that list rather than repeating it.",
    type: "scope",
  },
];
b.cites = [...new Set([b.text, b.reason].join("\n").match(/§(s-[2-9a-hj-km-np-z]{15})/g).map(x => x.slice(1)))];
fs.writeFileSync(new URL("english-10-2.md", here), [`# ${b.title}`, "", b.text, "", `Reason: ${b.reason}`, ""].join("\n"));

// 1.6.1: the English alone, as EngStickler's reader found; the Russian and the meaning stay as agreed.
const a = nf["1.6.1"];
a.text = swap(a.text, "- at every commit that changes code: whether that code does what the rules that the commit names say, and nothing that they do not say;",
  "- on every commit that changes code: whether that code does what the rules named in the commit say and does nothing that they do not say;", "1.6.1 text");
a.text = swap(a.text, "- at a commit whose message states", "- on a commit whose message states", "1.6.1 text");
a.text = swap(a.text, "- at a commit in which a node of the technical appendix", "- on a commit in which a node of the technical appendix", "1.6.1 text");
a.reason = swap(a.reason, "Run at each of an agent's edits,", "Run after each of an agent's edits,", "1.6.1 reason");
a.reason = swap(a.reason, "for the reason §s-xhcmchcngykvn2k gives.", "for the reason given in §s-xhcmchcngykvn2k.", "1.6.1 reason");
a.changes.push("После согласования поправлен английский по отчёту читателя EngStickler; смысл и русский текст не менялись.");
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

// The continuation file.
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's decision on the proposed new wording of node 10\.2[^\n]*/m, () =>
  "**If the session is interrupted, the next session starts by** reading the rule reviewer's report on the drafts of rows 10.1.43a and 10.1.43b of the main table of checks, kept in draft-10-1-43ab.json, and then proposing row 10.1.43a to the owner, and after it row 10.1.43b, one per message. The list of wordings in the section \"Waiting for the owner\" names the proposals that come next, to be made one at a time.");
c = swap(c, "The agent decided the order of its stages on its own,", "The agent decided the order of the stages of this step on its own,", "line 9");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = swap(c, "the reviewer's three judgements, as the agreed principle \"Deterministic checks hold every participant to the contract\" and node 10.4 do.",
  "the reviewer's three judgements, just as the agreed principle \"Deterministic checks hold every participant to the contract\" and node 10.4 do.", "1.6.1 paragraph");
c = swap(c, "and agree-1-6-1.mjs added the owner's rulings to its `decisions` and the nodes that its text and reason cite to its `cites`. An EngStickler reader agent reads the agreed English text of 1.6.1, kept in english-1-6-1.md, in the background.",
  "and agree-1-6-1.mjs added the owner's rulings to the draft's `decisions` and the nodes that the draft's text and reason cite to the draft's `cites`. An EngStickler reader agent read the agreed English text of 1.6.1, kept in english-1-6-1.md, and agree-10-2.mjs corrected the phrases it found, without changing the meaning.\n\nThe owner agreed to the new wording of node 10.2 (s-epaw9sgyaajzn8g) on 2026-11-20 («ок»). In that wording, the review runs on every commit for which the list of the reviewer's judgements in 1.6.1 names at least one judgement, and 10.2 refers to that list rather than repeating it. accept-proposal.mjs wrote the agreed wording into the draft of 10.2, and agree-10-2.mjs added the owner's ruling to the draft's `decisions` and the nodes that the draft's text cites to the draft's `cites`. An EngStickler reader agent is reading the agreed English text of 10.2, kept in english-10-2.md.", "1.6.1 paragraph");
c = swap(c, "- node 10.2, proposed to the owner and waiting for the owner's decision. Its agreed wording still runs the review only on a commit that changes code. In the proposed wording, 10.2 refers to 1.6.1 for what the reviewer judges, rather than repeating the judgements, so that they are stated in one node;\n", "", "10.2 item");
c = swap(c, "- the main table of checks, where no row yet sets what a failure costs when either of the two new judgements finds a defect: the agent will propose either new rows or a broadened row 10.1.43;",
  "- the main table of checks, where no row yet sets what it costs when either of the two new judgements finds a defect. The agent decided to propose two new rows, 10.1.43a and 10.1.43b, one for each new judgement, rather than broaden row 10.1.43, since each judgement can be carried out without the others (node 7.3.3, s-6j8ystpj2yzcchq). Their drafts are in draft-10-1-43ab.json; the rule reviewer checks them before each is shown to the owner on its own;", "table item");
fs.writeFileSync(contPath, c);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "agree-1-6-1.mjs records the owner's agreement to it, writes its agreed English to english-1-6-1.md and proposes the new wording of node 10.2.",
  "agree-1-6-1.mjs records the owner's agreement to that wording, writes the agreed English text of 1.6.1 to english-1-6-1.md and proposes the new wording of node 10.2. agree-10-2.mjs records the owner's agreement to the new wording of 10.2 and writes the agreed English text of 10.2 to english-10-2.md. draft-10-1-43ab.json holds the drafts of rows 10.1.43a and 10.1.43b of the main table of checks.", "index 1.6.1");
s = swap(s, "into base-page/index.html and base-page/page.js, published as the artifact", "into base-page/index.html and base-page/page.js, which are published together as the artifact", "index page");
s = swap(s, "records the proposal of 1.6.1 and", "records the proposal for 1.6.1 and", "index page");
fs.writeFileSync(indexPath, s);

// The outline of the queue map.
const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o,
  "### ◐ новая формулировка 10.2 «Когда запускаются проверки»\n- ревью — при любом коммите, к которому относится хотя бы одно суждение рецензента из 1.6.1\n- что судит рецензент, 10.2 не повторяет, а ссылается на 1.6.1\n",
  "### ◐ новые строки основной таблицы проверок для двух новых суждений рецензента\n- 10.1.43a: «реализацию менять не нужно» верно\n- 10.1.43b: одобренный узел приложения уточняет реализуемые правила базы и не противоречит базе\n- по одной строке; сначала их проверяет рецензент правил\n", "outline waiting");
o = swap(o, "- «кроме ревью кода» → «кроме ревью»; обоснование называет все три вопроса\n",
  "- «кроме ревью кода» → «кроме ревью»; обоснование называет все три вопроса\n\n### ✓ узел 10.2 — согласован\n- ревью — при любом коммите, к которому относится хотя бы одно суждение рецензента из 1.6.1\n- что судит рецензент, 10.2 не повторяет, а ссылается на 1.6.1\n", "outline done");
o = swap(o, "- ● 10.2: то же в перечне моментов запуска проверок\n",
  "- ✓ 10.2: то же в перечне моментов запуска проверок\n- ● строки 10.1.43a и 10.1.43b основной таблицы проверок\n", "outline steps");
fs.writeFileSync(outPath, o);

console.log("10.2 cites:", b.cites.join(" "));
console.log("recorded at", now);
