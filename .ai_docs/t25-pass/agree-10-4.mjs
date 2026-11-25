// After accept-proposal.mjs has written the agreed wording of node 10.4 into its draft, records the rulings it carries
// out in the draft's `decisions` and the nodes its text cites in the draft's `cites`; applies the corrections
// EngStickler's reader confirmed in batch 27; and brings the continuation file up to date for the close of the session.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
const n = nf["10.4"];
if (n.agreed !== "2026-11-20" || n.proposals) throw new Error("accept-proposal.mjs has not run on 10.4");
n.decisions = [
  ...(n.decisions || []),
  {
    date: "2026-11-19",
    problem: "Who verifies a commit message's statement that a rule's implementation needs no change.",
    ruling: "The owner: the independent reviewer verifies it, and the principle on deterministic checks is extended to say so.",
    type: "scope",
  },
  {
    date: "2026-11-19",
    problem: "Who checks a node of the technical appendix that an agent approved on an owner's behalf.",
    ruling: "The owner: the independent reviewer checks it, in the commit in which the node is approved, whoever approved it.",
    type: "scope",
  },
  {
    date: "2026-11-20",
    problem: "Which rules of the base specification the reviewer is given with a node of the technical appendix, since the reviewer's tokens are paid by the person who commits.",
    ruling: "The owner chose the rules the node implements, the rules linked to them in either direction, and the rules in the same top-level section of the base specification, rather than only the linked rules or the whole base specification.",
    type: "scope",
  },
];
n.cites = ["s-8xw4mgvpexyvw5q", "s-qmmzf9nksfsa3qp", "s-sn6au3vcr9uy5pm", "s-5ah25f6gy99panq"];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const top = /\*\*If the session is interrupted, the next session starts by\*\*[^\n]*/.exec(c)[0];
c = c.replace(top, "**The next session starts by** proposing to the owner the new wording of nodes 1.6.1 and 10.2, which have the independent reviewer judge only a commit that changes code. The list at the end of the section \"Waiting for the owner\" gives the proposals that follow, one at a time.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
const pairs = [
  ["and the nodes its text cites to the draft's `cites`. EngStickler's reader read the agreed English text, and propose-10-4.mjs corrected the phrases it found, without changing the meaning.", "and the nodes that its text cites to the draft's `cites`. An EngStickler reader agent read the agreed English text of 1.3.6. propose-10-4.mjs then corrected, in the text of 1.3.6, the phrases the reader had found, without changing the meaning."],
  [/The agent has proposed the new wording of node 10\.4 \(s-nyh9yk22ba6g77q\) to the owner, and is waiting for the owner's decision\.[^\n]*/, "The owner agreed to the new wording of node 10.4 (s-nyh9yk22ba6g77q) on 2026-11-20 («принимаю»). The reviewer of any commit it reviews is now given what each of its judgements needs. For a node of the technical appendix approved in a commit, the reviewer is given the rules of the base specification that the node implements, the rules linked to them in either direction, and the rules in the same top-level section. The owner chose this set of rules over the whole base specification, since the choice costs tokens for the person who commits. accept-proposal.mjs wrote the agreed wording into the draft of 10.4, and agree-10-4.mjs added the owner's rulings to its `decisions` and the nodes that its text cites to its `cites`. An EngStickler reader agent reads the agreed English text of 10.4 before the session closes."],
  ["- the main table of checks, where no row yet sets what a failure of the two new judgements costs: new rows, or a wider row 10.1.43;", "- the main table of checks, where no row yet sets what it costs when either of the two new judgements finds a defect: the agent proposes either new rows or a broader row 10.1.43;"],
  ["- the third item of the principle's list of the reviewer's judgements, which covers every node of the technical appendix approved in a commit, while 1.3.6 and 10.4 cover only a node that implements a rule of the base specification;", "- the wording of the third item in the list of the reviewer's judgements in the principle \"Deterministic checks hold every participant to the contract\": that item applies to every node of the technical appendix approved in a commit, while 1.3.6 and 10.4 apply only to a node that implements a rule of the base specification;"],
];
for (const [x, y] of pairs) {
  if (typeof x === "string" ? !c.includes(x) : !x.test(c)) throw new Error("not found: " + String(x).slice(0, 70));
  c = c.replace(x, y);
}
const node104 = "- node 10.4 (s-nyh9yk22ba6g77q): the reviewer is also given a node of the technical appendix approved in the commit, and the rules of the base specification it must not contradict;\n";
if (!c.includes(node104)) throw new Error("10.4 item not found");
c = c.replace(node104, "");
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "propose-10-4.mjs proposes the new wording of node 10.4, on what the reviewer is given.";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, "propose-10-4.mjs proposes the new wording of node 10.4, which states what the reviewer is given. agree-10-4.mjs adds the rulings and the citations of the agreed 10.4 to its draft.");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
const w0 = o.indexOf("### ◐ узел 10.4 — что получает рецензент");
const w1 = o.indexOf("\n## ", w0);
if (w0 < 0 || w1 < 0) throw new Error("waiting branch not found");
o = o.slice(0, w0) + [
  "### ○ следующая сессия, по одной",
  "- 1.6.1 и 10.2: рецензент — не только на коммите с кодом",
  "- строки таблицы проверок для двух новых суждений; третий пункт принципа; 10.5",
  "- обоснования 1.3.3 и 1.3.4, обоснование 10.1.41, узел описания инструментов об отставании",
  "",
].join("\n") + o.slice(w1);
o = o.replace("## ◐ Ждёт вашего решения", "## ○ Дальше в T25");
const done = "## ● В работе:";
o = o.replace(done, [
  "### ✓ узел 10.4 — согласован",
  "- рецензент получает то, что нужно для каждого из трёх суждений",
  "- для узла приложения: реализуемые правила базы, связанные с ними и правила того же раздела верхнего уровня (ваш выбор)",
  "",
  done,
].join("\n"));
fs.writeFileSync(outPath, o);
console.log("recorded at", now);
