// Records the owner's agreement of 2026-11-22 («ок») to the new wording of the section "The tools"
// (s-qtq7t32yfqj2yzw), and applies EngStickler's fifty-ninth batch of corrections to the continuation file. The review
// moves on to "How each check is made" (s-4kd2pave7vm4hmd) and the three sections under it. Every file is written only
// after every change has been prepared.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const backup = JSON.stringify(drafts, null, 2) + "\n";
const node = drafts["s-qtq7t32yfqj2yzw"];
node.agreed = "2026-11-22";
node.rulings = [{ date: "2026-11-22", problem: "The text of the section \"The tools\" used the term \"the base of the guidelines\", which the owner removed, and did not mention the extensions of the guidelines or the checks and code generators that a project's own guidelines add.", ruling: "The owner agreed («ок») to the agent's proposed wording: \"How the SpecSheriff tools carry out the SpecSheriff guidelines, the extensions of the guidelines, and the checks and code generators that a project's own guidelines add.\"", type: "textual" }];

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["The node of the section \"The commands\" (s-qk8ezwujq95er7x) states the section's purpose. On 2026-11-22 the owner agreed («ок») to that node and to the order of the eleven nodes under it:",
    "The text of the section \"The commands\" (s-qk8ezwujq95er7x) states its purpose. On 2026-11-22 the owner agreed («ок») to that text and to the order of the eleven nodes under the section:"],
  ["agree-commands-section.mjs recorded that agreement and the order in the section's draft,", "agree-commands-section.mjs recorded in the section's draft that agreement and the order,"]
]) t = swap(t, from, to);
const start = t.indexOf("- The review now moves on to \"The tools\" (s-qtq7t32yfqj2yzw)");
const end = t.indexOf("\n", t.indexOf("The next node is \"How each check is made\"", start));
if (start < 0 || end < start) throw new Error("continuation: the bullet on \"The tools\" not found");
t = t.slice(0, start) + `- The review then moved on to "The tools" (s-qtq7t32yfqj2yzw), the next node in the order given in stage2-inventory.md. It is the top-level section of the appendix of the tools, and its text used the term "the base of the guidelines", which the owner removed. propose-tools-section.mjs drafted a new wording, which carries out the owner's decision in wording that the agent wrote itself, so it was shown to the owner as a proposal, without a review by specsheriff-rule-reviewer; tools-drafts.before-tools-section.json is a copy of the drafts made before that script ran. On 2026-11-22 the owner agreed («ок») to the wording "How the SpecSheriff tools carry out the SpecSheriff guidelines, the extensions of the guidelines, and the checks and code generators that a project's own guidelines add." agree-tools-section.mjs recorded the agreement in the draft; tools-drafts.before-agree-tools-section.json is a copy of the drafts made before that script ran.
- The next node to review is "How each check is made" (s-4kd2pave7vm4hmd), together with the three sections under it, which stage2-inventory.md says are approved with it. The agent reads them, drafts their new wording, and sends the drafts to specsheriff-rule-reviewer before they are shown to the owner.` + t.slice(end);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-tools-section.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-tools-section.json is a copy of tools-drafts.json made before that script ran). agree-tools-section.mjs records the owner's agreement to that wording (tools-drafts.before-agree-tools-section.json is a copy of tools-drafts.json made before that script ran).");

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ Раздел «Инструменты» — согласован\n- без убранного термина «base of the guidelines»\n\n## ● В работе:");
o = swap(o, "- ● раздел «Инструменты»: новая формулировка показана вам\n- ○ «Как выполняется каждая проверка» и три его раздела",
  "- ✓ раздел «Инструменты» — согласован\n- ● «Как выполняется каждая проверка» и три его раздела: агент читает их и пишет черновики");
o = swap(o, "\n\n## ◐ Ждёт вашего решения\n\n### ◐ Новая формулировка раздела «Инструменты»\n- вместо убранного термина «base of the guidelines»", "");

fs.writeFileSync(new URL("tools-drafts.before-agree-tools-section.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
