// Records that the owner agreed on 2026-11-19 («ок») to the new last sentence of the principle "Deterministic checks
// hold every participant to the contract", which the agent wrote into docs/principles.md; applies the corrections
// EngStickler's readers confirmed in batches 20 and 21; and puts the next proposal, on the principle's first
// paragraph, in the section of the continuation file that says what is waiting for the owner.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const swap = (a, b) => {
  if (!c.includes(a)) throw new Error("not found: " + a.slice(0, 70));
  c = c.replace(a, b);
};

swap(
  /\*\*If the session is interrupted, the next session starts by\*\*[^\n]*/.exec(c)[0],
  "**If the session is interrupted, the next session starts by** getting the owner's decision on the proposed wording of the first paragraph of the principle \"Deterministic checks hold every participant to the contract\" in docs/principles.md. The section \"Waiting for the owner\" gives that wording in full.",
);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
swap("the owner's remark that the first proposal made a commit the subject of the verb \"change\"", "the owner's remark that the first proposal used a commit as the subject of the verb \"change\"");
swap("in which a commit is the subject of a verb that states a change", "in which a commit is the subject of a verb that denotes a change");
swap("- it compares the tests and the symbols of code bound to a rule, rather than whole files;", "- it compares the tests bound to a rule with the code bound to that rule, test by test and symbol by symbol, rather than file by file;");
swap("- it refuses a commit while the specification is approved.", "- it refuses a commit in which a rule's implementation lags behind, while the specification is approved.");

const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n## ", from + head.length);
c = c.slice(0, from) + head + [
  "The owner agreed on 2026-11-19 («ок») to the new last sentence of the principle \"Deterministic checks hold every participant to the contract\". The agent wrote it into docs/principles.md, where it replaces the sentence that called the reviewer's judgement the only one that is not deterministic. The commit that closes the session states this decision in its message, since a decision on a principle is kept only in the commit message.",
  "",
  "EngStickler's readers found calques and a sentence that reads as a list in the principle's first paragraph, which the grilling session did not touch. The agent has proposed to the owner a new wording of that paragraph and is waiting for the owner's decision. The current paragraph reads:",
  "",
  "> Checks that give the same answer for the same change hold the chain together: hooks in the agent's harness, which run at each edit the agent makes and also enforce the order of rule, test and code; and git hooks at every commit, the final gate on each participant's machine, whoever made the change; a team that needs the gate to hold for everyone runs the same checks in CI.",
  "",
  "The proposed wording is in the agent's message to the owner of 2026-11-19 and is written here once the owner has agreed to it.",
  "",
  "After the owner's decision, the agent will propose the other wordings that follow from the grilling session, one at a time. They are the wordings of the principle \"Nothing unapproved is implemented\", node 1.3.6 (s-t5uw8zfxzhfdg86), node 10.4 (s-nyh9yk22ba6g77q), the reason of row 10.1.41, and node s-txbwsthdqhvyzd2 of the appendix of the tools.",
  "",
  "Three texts outside the specification restate the old sentence about the reviewer's one judgement, and are brought into line with the new principle in the stage that updates the skills and the guides:",
  "- docs/README.md, in the paragraph on the checks;",
  "- the article _promo/articles/no-code-without-a-rule.md, in its section \"One judgement, by an independent reviewer\";",
  "- picture 2, _promo/images/html/2-what-stops-bad-code.html, and its line in _promo/images/README.md.",
  "",
].join("\n") + c.slice(to);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "propose-10-1-40-b.mjs rewrites that proposal so that a rule's wording, its tests and its code are changed in a commit, rather than by the commit.";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, "propose-10-1-40-b.mjs rewrites that proposal so that it says that a rule's wording, its tests and its code change in a commit, not that the commit changes them.");
const b2 = "in the continuation file.";
const at = s.indexOf(b2, s.indexOf("accept-10-1-40.mjs"));
if (at < 0) throw new Error("index text 2 not found");
s = s.slice(0, at + b2.length) + " agree-principle-checks.mjs records the owner's agreement to the new last sentence of that principle." + s.slice(at + b2.length);
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
const w0 = o.indexOf("### ◐ принцип о детерминированных проверках — новая формулировка");
const w1 = o.indexOf("\n## ", w0);
if (w0 < 0 || w1 < 0) throw new Error("waiting branch not found");
o = o.slice(0, w0) + [
  "### ◐ принцип о детерминированных проверках — первый абзац",
  "- ● сейчас: длинное предложение разбито; хуки агента и git-хуки — списком",
  "- ○ затем, по одной: принцип «Ничего неодобренного не реализуется», 1.3.6, 10.4, обоснование 10.1.41, узел описания инструментов об отставании",
  "",
].join("\n") + o.slice(w1);
const done = "## ● В работе:";
if (!o.includes(done)) throw new Error("outline text not found");
o = o.replace(done, [
  "### ✓ принцип о детерминированных проверках — суждения рецензента согласованы",
  "- код делает только то, что говорят его правила — при каждом коммите, в котором меняется код",
  "- «реализацию менять не нужно» верно — для коммита, где это сказано в сообщении",
  "- узел приложения, одобренный в коммите, уточняет реализуемые правила и не противоречит базе",
  "",
  done,
].join("\n"));
fs.writeFileSync(outPath, o);
console.log("recorded at", now);
