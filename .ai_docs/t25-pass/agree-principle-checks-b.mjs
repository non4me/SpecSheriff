// Records that the owner agreed on 2026-11-20 («ок») to the new first paragraph of the principle "Deterministic checks
// hold every participant to the contract", which the agent wrote into docs/principles.md; applies the corrections
// EngStickler's reader confirmed in batch 22; and puts the next proposal, on the principle "Nothing unapproved is
// implemented", in the section of the continuation file that says what is waiting for the owner.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const proposal = fs.readFileSync(process.argv[2], "utf8").split("\n").slice(2).join("\n").trim();

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const swap = (a, b) => {
  if (!c.includes(a)) throw new Error("not found: " + a.slice(0, 70));
  c = c.replace(a, b);
};

swap(
  /\*\*If the session is interrupted, the next session starts by\*\*[^\n]*/.exec(c)[0],
  "**If the session is interrupted, the next session starts by** getting the owner's decision on the proposed wording of the principle \"Nothing unapproved is implemented\" in docs/principles.md. The section \"Waiting for the owner\" gives that wording in full.",
);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
swap(
  "The principle \"The specification first, in one direction\" determines that order:",
  "The agent derived that order from the principle \"The specification first, in one direction\":",
);
swap(
  "- it refuses a commit in which a rule's implementation lags behind, while the specification is approved.",
  "- it refuses a commit in which a rule's tests or code lag behind its wording, or its code behind its tests, while the specification is approved.",
);

const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n## ", from + head.length);
const quote = (t) => t.split("\n").map((l) => (l ? `> ${l}` : ">")).join("\n");
c = c.slice(0, from) + head + [
  "The owner agreed to the whole new wording of the principle \"Deterministic checks hold every participant to the contract\": to its list of the reviewer's judgements on 2026-11-19 («ок»), and to its first paragraph, split into a list, on 2026-11-20 («ок»). The agent wrote both into docs/principles.md. The commit that closes the session states both decisions in its message, since a decision on a principle is kept only in the commit message.",
  "",
  "The agent has proposed to the owner a new wording of the principle \"Nothing unapproved is implemented\" and is waiting for the owner's decision. It follows from the sixth and eighth questions of the grilling session: an agent approves on the owner's behalf a node of the technical appendix that it writes while implementing an approved rule of the base specification. The proposal also splits the principle's sentences joined by semicolons, without changing their meaning. EngStickler's readers read the proposal before it was shown to the owner:",
  "",
  quote(proposal),
  "",
  "After the owner's decision, the agent will propose the other wordings that follow from the grilling session, one at a time. They are the wordings of node 1.3.6 (s-t5uw8zfxzhfdg86), node 10.4 (s-nyh9yk22ba6g77q), the reason of row 10.1.41, and node s-txbwsthdqhvyzd2 of the appendix of the tools.",
  "",
  "Three texts outside the specification restate the old sentence about the reviewer's single judgement. They are brought into line with the new principle in the stage that updates the skills and the guides:",
  "- docs/README.md, in the paragraph on the checks;",
  "- the article _promo/articles/no-code-without-a-rule.md, in its section \"One judgement, by an independent reviewer\";",
  "- picture 2, _promo/images/html/2-what-stops-bad-code.html, and its entry in the table of _promo/images/README.md.",
  "",
].join("\n") + c.slice(to);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "agree-principle-checks.mjs records the owner's agreement to the new last sentence of that principle.";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, b + " agree-principle-checks-b.mjs records the owner's agreement to its new first paragraph.");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
const w0 = o.indexOf("### ◐ принцип о детерминированных проверках — первый абзац");
const w1 = o.indexOf("\n## ", w0);
if (w0 < 0 || w1 < 0) throw new Error("waiting branch not found");
o = o.slice(0, w0) + [
  "### ◐ принцип «Ничего неодобренного не реализуется» — новая формулировка",
  "- ● сейчас: узел приложения, который агент пишет при реализации одобренного правила, одобряется от вашего имени, и вам о нём сообщают",
  "- ○ затем, по одной: 1.3.6, 10.4, обоснование 10.1.41, узел описания инструментов об отставании",
  "",
].join("\n") + o.slice(w1);
const doneHead = "### ✓ принцип о детерминированных проверках — суждения рецензента согласованы";
if (!o.includes(doneHead)) throw new Error("done item not found");
o = o.replace(doneHead, "### ✓ принцип о детерминированных проверках — согласован целиком\n- первый абзац разбит: хуки агента и git-хуки — списком; CI — отдельной фразой");
fs.writeFileSync(outPath, o);
console.log("recorded at", now);
