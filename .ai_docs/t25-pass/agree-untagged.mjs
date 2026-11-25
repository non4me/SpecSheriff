// Records the owner's agreement of 2026-11-22 («ок») to the node on `sheriff untagged` and writes english-untagged.md
// for EngStickler's reader. Corrects the English of the agreed nodes on `sheriff settings` and `sheriff untagged` as
// EngStickler's reader proposed, without changing their meaning, sets the drafts' locations in the order of the
// section, and applies EngStickler's fifty-seventh batch of corrections. The section "The commands" is shown next.
// Every file is written only after every change has been prepared.
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
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const rerender = (p) => { p.text = render(p.parts, "en"); p.ruText = render(p.parts, "ru"); };
const english = (p, date) => [`# "${p.title}", a new node of the appendix of the tools, agreed on ${date}`, "", "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, "", ...(p.examples?.length ? ["## Example", "", p.examples[0].en, ""] : [])].join("\n");
const part = (p, start) => { const x = p.parts.find((y) => y.en.startsWith(start)); if (!x) throw new Error(`part: ${start}`); return x; };

// `sheriff untagged`.
const untagged = drafts["new:tools-2-untagged"];
untagged.agreed = "2026-11-22";
untagged.rulings = [...(untagged.rulings ?? []), { date: "2026-11-22", problem: "Whether the owner agrees to the node on `sheriff untagged`.", ruling: "The owner agreed to the node («ок»).", type: "textual" }];
const up = untagged.proposal;
up.parts[0].en = swap(up.parts[0].en, "The check of code without a SpecTag names this command", "The check for code without a SpecTag names this command");
rerender(up);
up.reason = swap(up.reason, "The check of code without a SpecTag reports", "The check for code without a SpecTag reports");

// The English of the agreed node on `sheriff settings`.
const sp = drafts["new:tools-2-settings"].proposal;
const run = part(sp, "Run in a terminal with no arguments");
run.en = swap(run.en, "Run without a terminal and with no arguments, it prints them.", "Run with no terminal attached and with no arguments, it prints them.");
const args = part(sp, "Run with one of the following arguments");
args.en = "Run with one of the following sets of arguments, `sheriff settings` makes that one change:";
const records = part(sp, "`sheriff settings` records each change as an entry");
records.en = swap(records.en, "by the email address that git is configured with", "by the email address set in git's configuration");
const rules = part(sp, "`sheriff settings` records or refuses each change");
rules.en = "`sheriff settings` records or refuses each change as required by the rules on the approval status, on the `strict` flag and on withdrawing an extension (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-j8y62pa9hzz6nwx). Where those rules require the owner to confirm an approval and no terminal is attached, the owner confirms it by adding `--confirm` to `status approved`, personally or through an agent working for that owner.";
const untaggedItem = part(sp, "`sheriff untagged`, for the check");
untaggedItem.en = swap(untaggedItem.en, "for the check of code without a SpecTag", "for the check for code without a SpecTag");
const strict = part(sp, "`sheriff validate --strict`, for a project's own check");
strict.en = swap(strict.en, "for a project's own check:", "for a project's own checks:");
rerender(sp);
drafts["new:tools-2-settings"].englishRead = "EngStickler's reader, 2026-11-22: the English corrected without changing its meaning by agree-untagged.mjs; \"an agent working for that owner\" kept, since the base uses those words (s-9ttvcwpqkehm58g)";

// The locations of the drafts, in the order of the section.
for (const [key, location] of [["new:tools-2-types", "tools 2.5 (new)"], ["new:tools-2-generator", "tools 2.6 (new)"], ["new:tools-2-json", "tools 2.7 (new)"], ["new:tools-2-todos", "tools 2.8 (new)"], ["new:tools-2-guide", "tools 2.9 (new)"], ["new:tools-2-settings", "tools 2.10 (new)"], ["new:tools-2-untagged", "tools 2.11 (new)"]]) drafts[key].location = location;

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "and agree-cmd-settings.mjs did the same for this node.", "and agree-cmd-settings.mjs did the same for the node on running a generator.");
const start = t.indexOf("  - \"The list of code that carries no SpecTag\", shown now.");
const end = t.indexOf("- The reviewers also found changes that other nodes need");
if (start < 0 || end < start) throw new Error("continuation: the bullet on `sheriff untagged` not found");
t = t.slice(0, start) + `  - "The list of code that carries no SpecTag". On 2026-11-22 the owner agreed to the node («ок»). agree-untagged.mjs marked its draft as agreed and wrote english-untagged.md for EngStickler's reader; tools-drafts.before-agree-untagged.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/AY9gFE8GoHP42ycQyE129u shows the node. The same script corrected the English of the agreed nodes on \`sheriff settings\` and \`sheriff untagged\` as EngStickler's reader proposed, without changing their meaning.
  Every node of the second group is thus agreed. The node of the section "The commands" (s-qk8ezwujq95er7x), which states the section's purpose, is being shown to the owner now, and whatever the owner answers is to be acted on before the review goes on. The review then goes on to "The tools" (s-qtq7t32yfqj2yzw), in the order given in stage2-inventory.md.
` + t.slice(end);

// INDEX.md.
const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "That script was first written as agree-settings.mjs and overwrote agree-settings.mjs, english-settings.md and tools-drafts.before-agree-settings.json, which the agreement to \"Project-wide settings\" had written; rename-cmd-settings.mjs gave the new files their own names, and the earlier three files are lost.",
  "That script was first saved under the name agree-settings.mjs, and so it overwrote the files agree-settings.mjs, english-settings.md and tools-drafts.before-agree-settings.json, which the script for the agreement to \"Project-wide settings\" had written. rename-cmd-settings.mjs renamed the new files, and the three earlier files are lost. agree-untagged.mjs records the owner's agreement to the node on `sheriff untagged`, writes english-untagged.md, and corrects the English of the nodes on `sheriff settings` and `sheriff untagged` (tools-drafts.before-agree-untagged.json is a copy of tools-drafts.json made before that script ran).");

// The outline.
const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Перечень кода без SpecTag» (sheriff untagged) — согласован\n- вторая группа «Команд» согласована целиком\n\n## ● В работе:");
o = swap(o, "- ● «Перечень кода без SpecTag» (sheriff untagged): показан вам\n- ○ узел раздела «Команды»: назначение раздела",
  "- ✓ «Перечень кода без SpecTag» (sheriff untagged) — согласован\n- ● узел раздела «Команды»: назначение раздела, показан вам\n- ○ затем «The tools» по порядку разбора");
o = swap(o, "### ◐ Согласие с узлом о sheriff untagged\n- перечень кода без SpecTag по файлам и символам\n", "### ◐ Согласие с узлом раздела «Команды»\n- назначение раздела и порядок одиннадцати узлов в нём\n");

// Every change is prepared; write the files.
fs.writeFileSync(new URL("tools-drafts.before-agree-untagged.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-untagged.md", here), english(up, "2026-11-22"));
fs.writeFileSync(new URL("english-cmd-settings.md", here), english(sp, "2026-11-22"));
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
