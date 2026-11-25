// Records that the owner agreed on 2026-11-20 («ок») to the new wording of the principle "Nothing unapproved is
// implemented", which the agent wrote into docs/principles.md; applies the corrections EngStickler's reader confirmed
// in batch 23; and records that node 1.3.6 is being checked before it is proposed to the owner.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");

swapTop();
function swapTop() {
  const top = /\*\*If the session is interrupted, the next session starts by\*\*[^\n]*/.exec(c)[0];
  c = c.replace(top, "**If the session is interrupted, the next session starts by** proposing to the owner the new wording of node 1.3.6 (s-t5uw8zfxzhfdg86), once the reviewers' findings are applied. The section \"Waiting for the owner\" gives the draft.");
}
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);

const draft = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n## ", from + head.length);
const quote = (t) => t.split("\n").map((l) => (l ? `> ${l}` : ">")).join("\n");
c = c.slice(0, from) + head + [
  "The owner agreed to the whole new wording of the principle \"Deterministic checks hold every participant to the contract\": to its list of the reviewer's judgements on 2026-11-19 («ок»), and to its first paragraph, split into a list, on 2026-11-20 («ок»). The owner also agreed to the new wording of the principle \"Nothing unapproved is implemented\" on 2026-11-20 («ок»). It adds the case that follows from the sixth and eighth questions of the grilling session, and splits the clauses that semicolons joined into one sentence. After the owner agreed, the agent replaced \"where:\" with \"in each of these cases:\", and made it explicit that a rule's owners are named by the nearest section or domain above it that names owners. Neither change alters the meaning. The agent wrote all of these into docs/principles.md. The commit that closes the session states these decisions in its message, since a decision on a principle is kept only in the commit message.",
  "",
  "The next proposal is the new wording of node 1.3.6 (s-t5uw8zfxzhfdg86). The agent's draft adds the third case, the node of the technical appendix, to the cases in which an agent approves a node on an owner's behalf. The draft is being checked by the wording checker, by the rule reviewer and by EngStickler's readers before it is shown to the owner:",
  "",
  quote(`Title: ${draft.title}\n\nText: ${draft.text}\n\nReason: ${draft.reason}`),
  "",
  "After the owner's decision on node 1.3.6, the agent will propose the other wordings that follow from the grilling session, one at a time. They are the wordings of node 10.4 (s-nyh9yk22ba6g77q), the reason of row 10.1.41, and node s-txbwsthdqhvyzd2 of the appendix of the tools.",
  "",
  "Five texts outside the specification restate what the two principles said before their new wording. They are brought into line with the new wording in the stage that updates the skills and the guides:",
  "- docs/README.md, in the paragraph on the checks;",
  "- the article _promo/articles/no-code-without-a-rule.md, in its section \"One judgement, by an independent reviewer\";",
  "- picture 2, _promo/images/html/2-what-stops-bad-code.html, and its entry in the table in _promo/images/README.md;",
  "- CLAUDE.md, in the item \"Status\" of the section \"Editing the specification\", which names a purely technical replacement as the only approval the agent makes on the owner's behalf;",
  "- the skill spec-review, wherever it says which approvals the agent makes on the owner's behalf.",
  "",
].join("\n") + c.slice(to);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "agree-principle-checks-b.mjs records the owner's agreement to its new first paragraph.";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, "agree-principle-checks-b.mjs records the owner's agreement to the new first paragraph of the principle about deterministic checks. agree-principle-unapproved.mjs records the owner's agreement to the new wording of the principle \"Nothing unapproved is implemented\".");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
const w0 = o.indexOf("### ◐ принцип «Ничего неодобренного не реализуется» — новая формулировка");
const w1 = o.indexOf("\n## ", w0);
if (w0 < 0 || w1 < 0) throw new Error("waiting branch not found");
o = o.slice(0, w0) + [
  "### ◐ узел 1.3.6 — что агент одобряет от вашего имени",
  "- ● сейчас: третий случай — узел приложения со связью implements к одобренному правилу базы; черновик проверяют рецензенты",
  "- ○ затем, по одной: 10.4, обоснование 10.1.41, узел описания инструментов об отставании",
  "",
].join("\n") + o.slice(w1);
const done = "## ● В работе:";
if (!o.includes(done)) throw new Error("outline text not found");
o = o.replace(done, [
  "### ✓ принцип «Ничего неодобренного не реализуется» — согласован",
  "- от вашего имени одобряется и узел приложения, который агент пишет, реализуя одобренное правило",
  "",
  done,
].join("\n"));
fs.writeFileSync(outPath, o);
console.log("recorded at", now);
