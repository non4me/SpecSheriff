// Records the owner's answer of 2026-11-19 to the third question of the grilling (keep comparing tests with code, but
// only the tests and the code bound to the rule) and the fourth question put to the owner; applies the corrections
// EngStickler's readers confirmed in batches 9 and 10. Updates the continuation file, the queue outline and
// .ai_docs/INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const replaceLine = (start, text) => {
  const lines = c.split("\n");
  const at = lines.findIndex((l) => l.startsWith(start));
  if (at < 0) throw new Error("line not found: " + start);
  lines[at] = text;
  c = lines.join("\n");
};
const swap = (a, b) => {
  if (!c.includes(a)) throw new Error("not found: " + a.slice(0, 70));
  c = c.replace(a, b);
};

swap("The names of the field and of the option are to be settled.", "The names of the field and of the option have yet to be settled.");
swap("So a change has no separate document:", "So a change needs no separate document:");
replaceLine("The second question of the grilling", "The second question of the grilling was who verifies that the mark is correct. The agent recommended that the independent reviewer verify it. An agent that approves, on the owner's behalf, a change that only rewords a rule both decides that the meaning is unchanged and approves the change, so it certifies its own work. The reviewer would judge whether the rule's existing code and tests do what its new wording says, which is the judgement it already makes for changed code. That requires extending the principle on deterministic checks, which has the reviewer judge \"at every commit that changes code\", to cover a commit that changes the wording of a rule bound to code. The other options put to the owner were to trust the approval, since an approval made on the owner's behalf is reported to the owner, who can withdraw it, or to let only an owner set the mark in person.");
replaceLine("The owner chose the independent reviewer", "The owner chose the independent reviewer on 2026-11-19 (\"1\"). So the principle on deterministic checks in docs/principles.md, which has the reviewer judge \"at every commit that changes code\", is also to cover a commit that changes the wording of a rule bound to code. The principle's new wording will be proposed to the owner once the grilling has settled how a change is checked, together with the other wordings that follow from the grilling.");
replaceLine("The third question of the grilling", [
  "The third question of the grilling was whether the check should still compare a rule's tests with its code by the dates of their changes, the part \"nor its code behind its tests\" of row 10.1.40. The agent recommended dropping that comparison. Where a test is added for behaviour that the code already has, the tests change and the code does not, and nothing lags behind. Where the code does lag behind a test, the test fails when the tests are run, at the moment that the project's own guidelines specify (10.1.44), and the reviewer judges the commit that adds the test. The other option put to the owner was to keep the comparison and let a mark \"the code needs no change\", judged by the reviewer, say so.",
  "",
  "The owner chose on 2026-11-19 to keep the comparison, made precise: only the tests bound to the rule in the commit are compared with only the code bound to that rule, so that the check follows the logic of the implementation, not the files. The agent takes this as the second option: where a rule's tests change in a commit and its code does not, the commit carries a mark that the code needs no change, and the reviewer judges it.",
  "",
  "The fourth question of the grilling, now being put to the owner, is where that mark is kept. The approval entry exists only where a rule's wording changes, and a change to a test alone changes no wording, so it has no approval entry. The agent recommends a git trailer in the commit message that names the rule. CLAUDE.md sends every decision other than a decision on a rule into the commit message, and this is a decision about the implementation. The commit-msg hook already reads the message to check the nodes it names (9.6). The other options put to the owner are a decision in the rule's `meta.decisions`, or a mark next to the test itself, beside its SpecTag.",
].join("\n"));

const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The agent is waiting for the owner's answer to the fourth question of the grilling, namely where the mark that the code needs no change is kept when only a rule's tests change. The consequence of a failure of the check in row 10.1.40 will be settled once the owner has answered the questions of the grilling." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const outlinePath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outlinePath, "utf8");
const from1 = "- сейчас: сравнивать ли тесты с кодом по датам; рекомендую убрать — отставание кода покажет упавший тест\n";
if (!o.includes(from1)) throw new Error("outline line not found");
o = o.replace(from1, "- ✓ сравнение тестов с кодом остаётся, но только тесты и код, привязанные к правилу из коммита (ваше решение)\n- сейчас: где хранится пометка «код менять не нужно», когда менялся только тест; рекомендую трейлер в сообщении коммита\n");
fs.writeFileSync(outlinePath, o);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const pairs = [
  ["fix-english-b7.mjs applies to the English text the corrections that EngStickler's reader confirmed in batch 7.", "fix-english-b7.mjs applies the corrections that EngStickler's reader confirmed in batch 7 to the English text."],
  ["grill-change-3.mjs records the owner's answer to the first question of the grilling and the second question; grill-change-4.mjs records the owner's answer to the second question and the third question.", "grill-change-3.mjs records the owner's answer to the first question of the grilling, and the second question as it was put to the owner; grill-change-4.mjs and grill-change-5.mjs do the same for the second and third questions and for the third and fourth."],
];
for (const [a, b] of pairs) {
  if (!s.includes(a)) throw new Error("index text not found: " + a.slice(0, 60));
  s = s.replace(a, b);
}
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
