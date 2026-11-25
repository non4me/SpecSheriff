// Records the owner's agreement of 2026-11-22 («ок») to the new wording of the section "How each check is made"
// (s-4kd2pave7vm4hmd), to keeping the sections under it grouped by command, and to the three sections under it. The
// review moves on to "A key written twice in one object" (s-7zqsstgnuc772ba), row 10.1.1.
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
for (const sid of ["s-4kd2pave7vm4hmd", "s-6uqu6vn5fnp7fwb", "s-p34692nwceaxq2p", "s-bgegrkhrgpefs69"]) drafts[sid].agreed = "2026-11-22";
drafts["s-4kd2pave7vm4hmd"].rulings = [{ date: "2026-11-22", problem: "The section's text used \"the base\", a term the owner removed, and named only the main table of checks, while each extension now has a table of checks of its own. Whether the sections under it should be regrouped by table rather than by the command that makes each check.", ruling: "The owner agreed («ок») to the agent's proposed wording, to keeping the sections under it grouped by command, and to the three sections under it: \"Checks made by `sheriff validate`\" and \"Checks made by `sheriff binding`\" unchanged, and \"Checks made by the other commands\" with the name `sheriff commit-message`.", type: "textual" }];

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "Whatever the owner answers is to be acted on before the review continues; the next node is \"A key written twice in one object\" (s-7zqsstgnuc772ba), row 10.1.1.",
  "On 2026-11-22 the owner agreed («ок») to the new wording, to keeping the sections grouped by command, and to the three sections under it. agree-checks-section.mjs recorded that agreement; tools-drafts.before-agree-checks-section.json is a copy of the drafts made before that script ran.\n- The next node to review is \"A key written twice in one object\" (s-7zqsstgnuc772ba), which implements row 10.1.1. The agent reads it, the row and the code, drafts its new wording, and sends the draft to specsheriff-rule-reviewer before the node is shown to the owner.");
const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-checks-section.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-checks-section.json is a copy of tools-drafts.json made before that script ran). agree-checks-section.mjs records the owner's agreement to those four sections (tools-drafts.before-agree-checks-section.json is a copy of tools-drafts.json made before that script ran).");
const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ Раздел «Как выполняется каждая проверка» — согласован\n- главная таблица и таблицы расширений; группировка по командам\n\n## ● В работе:");
o = swap(o, "- ● «Как выполняется каждая проверка» и три его раздела: новая формулировка показана вам\n- ○ «Ключ, записанный дважды в одном объекте» (строка 10.1.1)",
  "- ✓ «Как выполняется каждая проверка» и три его раздела — согласованы\n- ● «Ключ, записанный дважды в одном объекте» (строка 10.1.1): агент читает узел и пишет черновик");
o = swap(o, "\n\n## ◐ Ждёт вашего решения\n\n### ◐ Раздел «Как выполняется каждая проверка»\n- главная таблица и таблицы расширений вместо «base»\n- группировка по командам остаётся", "");
fs.writeFileSync(new URL("tools-drafts.before-agree-checks-section.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
