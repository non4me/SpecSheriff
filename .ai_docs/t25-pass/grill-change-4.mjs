// Records the owner's answer of 2026-11-19 to the second question of the grilling (the independent reviewer verifies
// the mark "the meaning is unchanged") and the third question put to the owner. Updates the continuation file, the
// queue outline and .ai_docs/INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const anchor = "or let only an owner set the mark, in person.";
const at = c.indexOf(anchor);
if (at < 0) throw new Error("second question paragraph not found");
const added = [
  "",
  "",
  "The owner chose the independent reviewer on 2026-11-19 (\"1\"). So the principle on deterministic checks in docs/principles.md, which has the reviewer judge \"at every commit that changes code\", is to cover also a commit that changes the wording of a rule bound to code. Its new wording is proposed to the owner once the grilling has settled the design, together with the other wordings it leads to.",
  "",
  "The third question of the grilling, now put to the owner: whether the check still compares a rule's tests with its code by the dates of their changes, the part \"nor its code behind its tests\" of row 10.1.40. The agent recommends dropping that comparison. Where a test is added for behaviour that the code already has, the tests change and the code does not, and nothing lags. Where the code does lag behind a test, the test fails when the tests run, at the moment the project's own guidelines name (10.1.44), and the reviewer judges the commit that adds the test. The other option put to the owner: keep the comparison, and let the same mark, judged by the reviewer, say that the code needs no change.",
].join("\n");
c = c.slice(0, at + anchor.length) + added + c.slice(at + anchor.length);
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The agent is waiting for the owner's answer to the third question of the grilling, which is whether the check still compares a rule's tests with its code by the dates of their changes. The cost of a failure of the check in row 10.1.40 will be settled once the grilling has answered it." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const outlinePath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outlinePath, "utf8");
const from1 = "- сейчас: кто проверяет, что пометка верна; рекомендую независимого рецензента\n";
if (!o.includes(from1)) throw new Error("outline line not found");
o = o.replace(from1, "- ✓ пометку проверяет независимый рецензент (ваш выбор); принцип о рецензенте расширяется — формулировку предложу после опроса\n- сейчас: сравнивать ли тесты с кодом по датам; рекомендую убрать — отставание кода покажет упавший тест\n");
fs.writeFileSync(outlinePath, o);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = s.replace(
  "grill-change-3.mjs records the owner's answer to the first question of the grilling and the second question.",
  "grill-change-3.mjs records the owner's answer to the first question of the grilling and the second question; grill-change-4.mjs records the owner's answer to the second question and the third question.",
);
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
