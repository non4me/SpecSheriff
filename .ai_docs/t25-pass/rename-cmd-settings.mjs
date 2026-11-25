// Gives the files written for the node on `sheriff settings` names of their own. agree-settings.mjs, english-settings.md
// and tools-drafts.before-agree-settings.json already existed from the agreement to "Project-wide settings" and were
// overwritten on 2026-11-22; they become agree-cmd-settings.mjs, english-cmd-settings.md and
// tools-drafts.before-agree-cmd-settings.json, and INDEX.md and the continuation file say so.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
for (const [from, to] of [["agree-settings.mjs", "agree-cmd-settings.mjs"], ["english-settings.md", "english-cmd-settings.md"], ["tools-drafts.before-agree-settings.json", "tools-drafts.before-agree-cmd-settings.json"]]) {
  fs.renameSync(new URL(from, here), new URL(to, here));
}
let script = fs.readFileSync(new URL("agree-cmd-settings.mjs", here), "utf8");
script = script.replaceAll("english-settings.md", "english-cmd-settings.md").replaceAll("tools-drafts.before-agree-settings.json", "tools-drafts.before-agree-cmd-settings.json");
fs.writeFileSync(new URL("agree-cmd-settings.mjs", here), script);

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "and agree-settings.mjs did the same for this node.", "and agree-cmd-settings.mjs did the same for this node.");
t = swap(t, "agree-settings.mjs marked its draft as agreed and wrote english-settings.md for EngStickler's reader; tools-drafts.before-agree-settings.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/2TbFcimrg8cJ49eDhe4GGv",
  "agree-cmd-settings.mjs marked its draft as agreed and wrote english-cmd-settings.md for EngStickler's reader; tools-drafts.before-agree-cmd-settings.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/2TbFcimrg8cJ49eDhe4GGv");
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "agree-settings.mjs records the owner's agreement to the node on `sheriff settings`, writes english-settings.md, and corrects the English of the node on running a generator (tools-drafts.before-agree-settings.json is a copy of tools-drafts.json made before that script ran).",
  "agree-cmd-settings.mjs records the owner's agreement to the node on `sheriff settings`, writes english-cmd-settings.md, and corrects the English of the node on running a generator (tools-drafts.before-agree-cmd-settings.json is a copy of tools-drafts.json made before that script ran). That script was first written as agree-settings.mjs and overwrote agree-settings.mjs, english-settings.md and tools-drafts.before-agree-settings.json, which the agreement to \"Project-wide settings\" had written; rename-cmd-settings.mjs gave the new files their own names, and the earlier three files are lost.");
fs.writeFileSync(index, s);
console.log(`updated at ${now}`);
