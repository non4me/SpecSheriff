// Records the owner's agreement of 2026-11-22 («ок») to the section "The commands" (s-qk8ezwujq95er7x) and the order
// of its eleven nodes. Corrects the English of the agreed node on `sheriff untagged` as EngStickler's reader proposed,
// without changing its meaning, and applies EngStickler's fifty-eighth batch of corrections. The review moves on to
// "The tools" (s-qtq7t32yfqj2yzw). Every file is written only after every change has been prepared.
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
const english = (p, date) => [`# "${p.title}", a new node of the appendix of the tools, agreed on ${date}`, "", "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""].join("\n");

// The section.
const section = drafts["new:tools-2-section"];
section.agreed = "2026-11-22";
section.order = ["s-f5rz6b7dhxejjts", "s-ztseyetus7np6br", "s-gb8s9657a65hqmv", "s-w5wg69pvvhedsws", "s-a8fn72xa782wvbk", "s-y5yk7eu6h4zrjpr", "s-w6gybeqn2ttydqx", "s-fprt8xysafzjqv9", "s-jk8v3srrved7ram", "s-chsfpkgpmfk4fft", "s-weuyx98r7c923ab"];
section.rulings = [{ date: "2026-11-22", problem: "Whether the owner agrees to the section \"The commands\", which states its purpose, and to the order of the eleven nodes under it.", ruling: "The owner agreed to the section and to the order («ок»).", type: "textual" }];

// The English of the agreed node on `sheriff untagged`.
const up = drafts["new:tools-2-untagged"].proposal;
up.parts[0].en = swap(up.parts[0].en, "names this command in its warning and its refusal", "names this command in its warning and in its refusal");
up.text = up.parts[0].en;
up.reason = "The check for code without a SpecTag covers all such code in one warning, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn). `sheriff untagged` lists that code symbol by symbol for whoever has to bind each symbol to the rules it implements.";
drafts["new:tools-2-untagged"].englishRead = "EngStickler's reader, 2026-11-22: the English corrected without changing its meaning by agree-commands-section.mjs; the title kept, in parallel with \"The list of todos\"";

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "  Every node of the second group is thus agreed. The node of the section \"The commands\" (s-qk8ezwujq95er7x), which states the section's purpose, is being shown to the owner now, and whatever the owner answers is to be acted on before the review goes on. The review then goes on to \"The tools\" (s-qtq7t32yfqj2yzw), in the order given in stage2-inventory.md.",
  "  Every node of the second group has thus been agreed. The node of the section \"The commands\" (s-qk8ezwujq95er7x) states the section's purpose. On 2026-11-22 the owner agreed («ок») to that node and to the order of the eleven nodes under it: the node that lists the commands, \"What `sheriff reindex` writes\", \"What `sheriff reindex` changes in what an earlier release wrote\", \"Keys written more than once\", \"What `sheriff types` generates\", \"How a project's own code generator is run\", \"The model of the specification\", \"The list of todos\", \"The guidelines that a project follows, printed in one place\", \"The settings that only an owner of the specification changes\" and \"The list of code that carries no SpecTag\". agree-commands-section.mjs recorded that agreement and the order in the section's draft, and corrected the English of the node on `sheriff untagged` as EngStickler's reader proposed, without changing its meaning; tools-drafts.before-commands-section.json is a copy of the drafts made before that script ran. The review of \"The commands\" is thus complete.\n- The review now moves on to \"The tools\" (s-qtq7t32yfqj2yzw), the next node in the order given in stage2-inventory.md. The agent reads it, the rules it implements and the code it describes, drafts its new wording, and sends the draft to specsheriff-rule-reviewer before the node is shown to the owner.");

// INDEX.md.
const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "That script was first saved under the name agree-settings.mjs, and so it overwrote the files agree-settings.mjs, english-settings.md and tools-drafts.before-agree-settings.json, which the script for the agreement to \"Project-wide settings\" had written.",
  "That script was first saved under the name agree-settings.mjs, and saving it overwrote the files agree-settings.mjs, english-settings.md and tools-drafts.before-agree-settings.json; the earlier agree-settings.mjs, which recorded the owner's agreement to \"Project-wide settings\", had written the other two.");
s = swap(s, "(tools-drafts.before-agree-untagged.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-agree-untagged.json is a copy of tools-drafts.json made before that script ran). agree-commands-section.mjs records the owner's agreement to the section \"The commands\" and to the order of its nodes (tools-drafts.before-commands-section.json is a copy of tools-drafts.json made before that script ran).");

// The outline.
const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ Раздел «Команды» — согласован целиком\n- одиннадцать узлов в согласованном порядке\n\n## ● В работе:");
o = swap(o, "- ● узел раздела «Команды»: назначение раздела, показан вам\n- ○ затем «The tools» по порядку разбора",
  "- ✓ узел раздела «Команды» и порядок его узлов — согласованы\n- ● «The tools»: агент читает узел и пишет черновик");
o = swap(o, "### ◐ Согласие с узлом раздела «Команды»\n- назначение раздела и порядок одиннадцати узлов в нём\n", "");

// Every change is prepared; write the files.
fs.writeFileSync(new URL("tools-drafts.before-commands-section.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-untagged.md", here), english(up, "2026-11-22"));
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
