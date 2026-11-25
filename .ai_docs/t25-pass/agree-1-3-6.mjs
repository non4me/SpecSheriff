// After accept-proposal.mjs has written the agreed wording of node 1.3.6 into its draft, records the rulings it carries
// out in the draft's `decisions`, and the citations its new text makes, so that both reach the node when the drafts are
// moved into the specification files. Applies the corrections EngStickler's reader confirmed in batch 25, and records
// in the continuation file that node 10.4 is being checked before it is proposed.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
const n = nf["1.3.6"];
if (n.agreed !== "2026-11-20" || n.proposals) throw new Error("accept-proposal.mjs has not run on 1.3.6");
n.decisions = [
  {
    date: "2026-11-19",
    problem: "Whether each node an agent adds to the technical appendix while implementing must wait for an owner's approval before its code can be committed.",
    ruling: "The owner: the agent approves such nodes on the owner's behalf and reports them to the owner, and the principle \"Nothing unapproved is implemented\" is changed to say so.",
    type: "scope",
  },
  {
    date: "2026-11-19",
    problem: "Which nodes of the technical appendix the agent may approve on the owner's behalf, given that an approval records only the git identity it was made under.",
    ruling: "The owner: the boundary is set by the node itself, so that the tools can check it: a node of the technical appendix with an `implements` link to an approved rule of the base specification. The independent reviewer judges every such node whose approval a commit contains, whoever approved it. The rules of the base specification, and the nodes that have no such link, are approved only by an owner.",
    type: "scope",
  },
];
n.cites = ["s-qmmzf9nksfsa3qp", "s-sn6au3vcr9uy5pm", "s-nyh9yk22ba6g77q", "s-fpq35tf3pehgk64"];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const top = /\*\*If the session is interrupted, the next session starts by\*\*[^\n]*/.exec(c)[0];
c = c.replace(top, "**If the session is interrupted, the next session starts by** proposing to the owner the new wording of node 10.4 (s-nyh9yk22ba6g77q), once the wording checker and the rule reviewer have reported on the draft in the section \"Waiting for the owner\".");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
const pairs = [
  ["That wording adds the case that follows from the sixth and eighth questions of the grilling session, and splits into separate sentences the clauses that semicolons joined. After the owner agreed, the agent made three changes that keep the meaning:", "That wording adds the case that follows from the sixth and eighth questions of the grilling session. In it, the clauses that semicolons joined are split into separate sentences. After the owner agreed, the agent made three changes that do not alter the meaning:"],
  ["- a rule's owners are now said to be named by the nearest section or domain above it that names owners;", "- the principle now says that a rule's owners are those named by the nearest section or domain above it that names owners;"],
  ["The commit that closes the session states the owner's decisions", "The commit made at the end of the session states the owner's decisions"],
  ["- the reasons of 1.3.3 and 1.3.4, which say that an approval means that an owner agreed,", "- the reasons in 1.3.3 and 1.3.4, which say that an approval means that an owner has agreed,"],
  ["which names a purely technical replacement as the only approval the agent makes on the owner's behalf;", "which names a purely technical replacement as the only kind of approval the agent makes on the owner's behalf;"],
];
for (const [a, b] of pairs) {
  if (!c.includes(a)) throw new Error("not found: " + a.slice(0, 70));
  c = c.replace(a, b);
}
const p0 = c.indexOf("The agent has proposed to the owner the new wording of node 1.3.6");
const p1 = c.indexOf("\n\n", p0);
if (p0 < 0) throw new Error("1.3.6 paragraph not found");
c = c.slice(0, p0) + [
  "The owner agreed to the new wording of node 1.3.6 (s-t5uw8zfxzhfdg86) on 2026-11-20 («ок»). It adds a third case to those in which an agent approves a node on an owner's behalf: a node of the technical appendix that the agent wrote while implementing an approved rule of the base specification, and that has an `implements` link to that rule. accept-proposal.mjs wrote the agreed wording into the draft of 1.3.6, and agree-1-3-6.mjs added the owner's rulings to the draft's `decisions` and the nodes its text cites to the draft's `cites`. EngStickler's reader reads the agreed English in the background.",
  "",
  "The agent's draft of the new wording of node 10.4 (s-nyh9yk22ba6g77q) is being checked by the wording checker and the rule reviewer before it is shown to the owner. It is in .ai_docs/t25-pass/draft-10-4.json.",
].join("\n") + c.slice(p1);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "propose-1-3-6.mjs proposes the new wording of node 1.3.6, on what an agent approves on an owner's behalf.";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, "propose-1-3-6.mjs proposes the new wording of node 1.3.6, which states what an agent approves on an owner's behalf. agree-1-3-6.mjs adds the rulings and the citations of the agreed 1.3.6 to its draft. draft-10-4.json holds the agent's draft of node 10.4 while it is being checked.");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
const w0 = o.indexOf("### ◐ узел 1.3.6 — что агент одобряет от вашего имени");
const w1 = o.indexOf("\n## ", w0);
if (w0 < 0 || w1 < 0) throw new Error("waiting branch not found");
o = o.slice(0, w0) + [
  "### ◐ узел 10.4 — что получает рецензент",
  "- ● сейчас: рецензенту передаётся и то, что нужно для двух новых суждений; черновик проверяют рецензенты",
  "- ○ затем, по одной: 1.6.1 и 10.2, 10.5, обоснования 1.3.3 и 1.3.4, обоснование 10.1.41, узел описания инструментов об отставании",
  "",
].join("\n") + o.slice(w1);
const done = "## ● В работе:";
o = o.replace(done, [
  "### ✓ узел 1.3.6 — согласован",
  "- третий случай: узел приложения со связью implements к одобренному правилу базы, написанный агентом при реализации",
  "",
  done,
].join("\n"));
fs.writeFileSync(outPath, o);
console.log("recorded at", now);
