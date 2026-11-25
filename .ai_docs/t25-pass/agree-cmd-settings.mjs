// Records the owner's agreement of 2026-11-22 («ок») to the node on `sheriff settings` and writes english-cmd-settings.md
// for EngStickler's reader. Corrects the English of the agreed node on running a project's generator as EngStickler's
// reader proposed, without changing its meaning, and applies EngStickler's fifty-sixth batch of corrections. The node
// on `sheriff untagged` is shown next. Every file is written only after every change has been prepared.
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
const sids = drafts["commands:sids"];

// `sheriff settings`.
const settings = drafts["new:tools-2-settings"];
settings.agreed = "2026-11-22";
settings.rulings = [...(settings.rulings ?? []), { date: "2026-11-22", problem: "Whether the owner agrees to the node on `sheriff settings`, with its arguments, `--confirm`, its example and `sheriff validate --strict`.", ruling: "The owner agreed to the node («ок»).", type: "textual" }];

// The English of the agreed node on running a project's generator.
const gp = drafts["new:tools-2-generator"].proposal;
const run = part(gp, "`sheriff types` runs each of the project's own code generators");
run.en = swap(run.en, "by the command that `sheriff.config.json` names for it", "with the command that `sheriff.config.json` names for it");
const model = part(gp, "`sheriff types` hands the generator");
model.en = `\`sheriff types\` passes the generator, on its standard input, a model of the specification in the form that \`sheriff json\` prints (§${sids.model}). That model holds each section and each domain's header as the files hold them. Of the other nodes, it holds only those that code can be generated from, each in its last approved wording (§${sids.types}).`;
model.ru = `\`sheriff types\` передаёт генератору на стандартный вход модель спецификации в том виде, в каком её печатает \`sheriff json\` (§${sids.model}). В этой модели каждый раздел и каждый заголовок домена — такими, какими их хранят файлы. Из остальных узлов в ней только те, из которых можно порождать код, каждый в последней одобренной формулировке (§${sids.types}).`;
const prints = part(gp, "The generator prints a JSON list");
prints.en = "The generator prints a JSON array holding one object per generated file. The object's `path` is the file's path from the root of the repository, its `content` is the file's text, and its `sids` lists the sids of the nodes that the file is generated from.";
const exits = part(gp, "the generator exits with a failure");
exits.en = "the generator exits with a non-zero status;";
const form = part(gp, "the generator prints anything other than");
form.en = "the generator prints anything other than a JSON array of objects holding `path`, `content` and `sids`;";
rerender(gp);
drafts["new:tools-2-generator"].englishRead = "EngStickler's reader, 2026-11-22: the English corrected without changing its meaning by agree-settings.mjs; \"lies outside the system's code\" kept, since the system's code is a set of files (s-hheus6f395ynqvc), and \"last approved wording\" kept, since it is the wording of the rule that the node carries out (s-qyjw8xez6t6adc3)";

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "On 2026-11-22 the owner agreed («ок»). The node had been shown in full with both refusals", "On 2026-11-22 the owner agreed to the node («ок»). The node had been shown in full with both refusals");
t = swap(t, "The same script corrected the English of the agreed node on `sheriff types` as EngStickler's reader proposed, without changing its meaning.\n",
  "The same script corrected the English of the agreed node on `sheriff types` as EngStickler's reader proposed, without changing its meaning, and agree-settings.mjs did the same for this node.\n");
const start = t.indexOf("  - \"The settings that only an owner of the specification changes\", shown now:");
const end = t.indexOf("- The reviewers also found changes that other nodes need");
if (start < 0 || end < start) throw new Error("continuation: the list of the nodes to be shown not found");
t = t.slice(0, start) + `  - "The settings that only an owner of the specification changes": the arguments \`status approved|draft\`, \`strict on|off\` and \`extension <name> on|off\`; the option \`--confirm\`, with which the owner confirms an approval when \`sheriff settings\` runs without a terminal; the example that specsheriff-rule-reviewer proposed; and \`sheriff validate --strict\`, the command that a refusal names for a project's own check. On 2026-11-22 the owner agreed to the node («ок»). agree-settings.mjs marked its draft as agreed and wrote english-cmd-settings.md for EngStickler's reader; tools-drafts.before-agree-cmd-settings.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/2TbFcimrg8cJ49eDhe4GGv shows the node.
  - "The list of code that carries no SpecTag", shown now. The owner's answer is to be acted on before the next node is shown. The next is the node of the section "The commands" (s-qk8ezwujq95er7x), which states the section's purpose; then the review goes on to "The tools" (s-qtq7t32yfqj2yzw), in the order given in stage2-inventory.md.
` + t.slice(end);

// INDEX.md.
const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-agree-generator.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-agree-generator.json is a copy of tools-drafts.json made before that script ran). agree-settings.mjs records the owner's agreement to the node on `sheriff settings`, writes english-cmd-settings.md, and corrects the English of the node on running a generator (tools-drafts.before-agree-cmd-settings.json is a copy of tools-drafts.json made before that script ran).");

// The outline.
const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Настройки, которые меняет только ответственный» (sheriff settings) — согласован\n- status, strict и extension; --confirm без терминала; sheriff validate --strict\n\n## ● В работе:");
o = swap(o, "- ● «Настройки, которые меняет только ответственный» (sheriff settings): показан вам\n- ○ «Перечень кода без SpecTag» (sheriff untagged)",
  "- ✓ «Настройки, которые меняет только ответственный» (sheriff settings) — согласован\n- ● «Перечень кода без SpecTag» (sheriff untagged): показан вам\n- ○ узел раздела «Команды»: назначение раздела");
o = swap(o, "### ◐ Согласие с узлом о sheriff settings\n- аргументы, --confirm, пример и sheriff validate --strict\n", "### ◐ Согласие с узлом о sheriff untagged\n- перечень кода без SpecTag по файлам и символам\n");

// Every change is prepared; write the files.
fs.writeFileSync(new URL("tools-drafts.before-agree-cmd-settings.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-cmd-settings.md", here), english(settings.proposal, "2026-11-22"));
fs.writeFileSync(new URL("english-generator.md", here), english(gp, "2026-11-22"));
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
const u = drafts["new:tools-2-untagged"].proposal;
console.log(u.title + " / " + u.ruTitle + "\n" + u.ruText + "\nREASON: " + u.ruReason + `\n\nupdated at ${now}`);
