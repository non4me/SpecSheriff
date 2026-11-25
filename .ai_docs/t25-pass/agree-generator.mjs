// Records the owner's ruling and agreement of 2026-11-22 («ок») on the node on running a project's generator, with the
// refusals of a path outside the system's code and of `sids` that name a node outside the model. Writes
// english-generator.md for EngStickler's reader. Corrects the English of the agreed node on `sheriff types` as
// EngStickler's reader proposed, without changing its meaning, and applies EngStickler's fifty-fifth batch of
// corrections to the continuation file. The node on `sheriff settings` is shown next. Every file is written only after
// every change has been prepared.
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
const english = (p, date) => [`# "${p.title}", a new node of the appendix of the tools, agreed on ${date}`, "", "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""].join("\n");
const part = (p, start) => { const x = p.parts.find((y) => y.en.startsWith(start)); if (!x) throw new Error(`part: ${start}`); return x; };

// How a project's own code generator is run.
const gen = drafts["new:tools-2-generator"];
gen.agreed = "2026-11-22";
gen.rulings = [...(gen.rulings ?? []), {
  date: "2026-11-22",
  problem: "The code refuses only a generator's paths outside the repository, inside `.git` or under `specs/`, so a generator could write `.githooks/pre-commit` or `sheriff.config.json`. No file waits for a draft any longer, so the `sids` that a generator prints served no purpose.",
  ruling: "The owner agreed («ок») to the agent's proposals: `sheriff types` refuses a generator that prints a path outside the system's code, and one that prints a file whose `sids` name a node outside the model that the generator is handed. The node had been shown in full with both refusals, and the owner's answer agreed to the node as well.",
  type: "textual"
}];
delete gen.doubt;
part(gen.proposal, "a path that the generator prints lies outside").change = "Новое, по вашему решению от 22 ноября: прежний перечень запрещённых путей пропускал бы, например, `.githooks/pre-commit` или `sheriff.config.json`. Код меняется на этапе 3.";
part(gen.proposal, "the `sids` of a file").change = "Новое, по вашему решению от 22 ноября: файлы больше не ждут черновиков, и без этого отказа `sids` ни для чего бы не служили. Код меняется на этапе 3.";

// The English of the agreed node on `sheriff types`.
const tp = drafts["new:tools-2-types"].proposal;
const open = tp.parts[0];
open.en = "`sheriff types` generates, from the last approved wording of each node (§s-qyjw8xez6t6adc3), the parts of the system's code (§s-hheus6f395ynqvc) that are derived from the nodes:";
open.ru = "`sheriff types` порождает из последней одобренной формулировки каждого узла (§s-qyjw8xez6t6adc3) те части кода системы (§s-hheus6f395ynqvc), которые получаются из узлов:";
const rt = part(tp, "from the RecordTypes");
rt.en = "the types and the RuntimeChecks (§s-e877bnfa559tvk9) generated from the RecordTypes (§s-7vm323mhry2enx3), in the files that the technical appendix lists for them (§s-pvzms7d8kxb8dk2);";
rt.ru = "типы и RuntimeChecks (§s-e877bnfa559tvk9), порождённые из RecordType (§s-7vm323mhry2enx3), в файлах, которые для них перечисляет техническое приложение (§s-pvzms7d8kxb8dk2);";
const where = part(tp, "The last approved wording of a node");
where.en = swap(where.en, "Otherwise it takes the wording from the latest commit on the current branch whose files hold it, read in the form to which `sheriff reindex` would rewrite it (§s-gb8s9657a65hqmv).",
  "Otherwise it takes the wording from the latest commit on the current branch whose files hold it, and reads that wording in the form into which `sheriff reindex` would rewrite it (§s-gb8s9657a65hqmv).");
const refines = part(tp, "`sheriff types` takes the `refines` links");
refines.en = swap(refines.en, "and from the files of the specification while that commit is still to be made.", "and from the files of the specification until that commit is made.");
const gathered = part(tp, "`sheriff types` generates the types and RuntimeChecks from the gathered values");
gathered.en = swap(gathered.en, "even where a RecordType's approved wording comes from a commit.", "even when a RecordType's approved wording is taken from a commit.");
const writes = part(tp, "`sheriff types` writes a file only where");
writes.en = swap(writes.en, "holds, line endings aside, a text other than the one it generates.", "holds, line endings aside, content other than what it generates.");
const any = part(tp, "Where any of the following holds");
any.en = "If any of the following is true, `sheriff types` names each refusal and writes no file:";
const refused = part(tp, "a project's generator is refused");
refused.en = "`sheriff types` refuses a project's generator (§s-y5yk7eu6h4zrjpr).";
refused.ru = "`sheriff types` отвергает генератор проекта (§s-y5yk7eu6h4zrjpr).";
rerender(tp);
tp.reason = "`sheriff types` regenerates the code that comes from the nodes after every edit and at every commit (§s-kh8qcd5kxgh9z3j). Each run therefore changes only what a change in the approved wordings affects, and leaves that code either wholly regenerated or untouched.";
drafts["new:tools-2-types"].englishRead = "EngStickler's reader, 2026-11-22: the English corrected without changing its meaning by agree-generator.mjs; \"relies on\" kept, since it is the word of the rule that the node carries out (s-qyjw8xez6t6adc3), and \"prints\" kept, since a generator prints its output";

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
const start = t.indexOf("  - \"How a project's own code generator is run\", now shown with two refusals");
const end = t.indexOf("- The reviewers also found changes that other nodes need");
if (start < 0 || end < start) throw new Error("continuation: the list of the nodes to be shown not found");
t = t.slice(0, start) + `  - "How a project's own code generator is run". It was shown with two refusals that the agent proposed: refusing a path that lies outside the system's code, and refusing a file whose \`sids\` name a node outside the model that the generator is handed. On 2026-11-22 the owner agreed («ок»). The node had been shown in full with both refusals, so agree-generator.mjs marked its draft as agreed, recorded the ruling in it, and wrote english-generator.md for EngStickler's reader; tools-drafts.before-agree-generator.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/A4KUC8mtzv5pJGuaxM3aoW shows the node. The node's requirement to refuse any output other than a JSON list of objects holding \`path\`, \`content\` and \`sids\`, and both new refusals, are stricter than what the code does now; the code is to be changed in stage 3. The same script corrected the English of the agreed node on \`sheriff types\` as EngStickler's reader proposed, without changing its meaning.
  - "The settings that only an owner of the specification changes", shown now: the arguments \`status approved|draft\`, \`strict on|off\` and \`extension <name> on|off\`; the option \`--confirm\`, with which the owner confirms an approval when \`sheriff settings\` runs without a terminal; the example that specsheriff-rule-reviewer proposed; and \`sheriff validate --strict\`, the command that a refusal names for a project's own check. The owner's answer is to be acted on before the next node is shown.
  - "The list of code that carries no SpecTag".
` + t.slice(end);
for (const [from, to] of [
  ["still compares a generated copy with the last commit even when", "still compares a generated copy with its version in the last commit even when"],
  ["which a technical replacement will rename to `sheriff json`", "which a technical replacement will replace with `sheriff json` in the node's text"]
]) t = swap(t, from, to);

// INDEX.md.
const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-agree-types.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-agree-types.json is a copy of tools-drafts.json made before that script ran). agree-generator.mjs records the owner's ruling on and agreement to the node on running a generator, writes english-generator.md, and corrects the English of the node on `sheriff types` (tools-drafts.before-agree-generator.json is a copy of tools-drafts.json made before that script ran).");

// The outline.
const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Как запускается генератор проекта» — согласован\n- отвергается путь вне кода системы и sids, которые называют узел вне модели\n\n## ● В работе:");
o = swap(o, "- ● «Как запускается генератор проекта»: показан вам, с двумя предложенными отказами\n- ○ «Настройки, которые меняет только ответственный» (sheriff settings)",
  "- ✓ «Как запускается генератор проекта» — согласован\n- ● «Настройки, которые меняет только ответственный» (sheriff settings): показан вам");
o = swap(o, "### ◐ Два отказа в узле о генераторе проекта\n- путь, который лежит вне кода системы\n- файл, чьи sids называют узел вне модели\n",
  "### ◐ Согласие с узлом о sheriff settings\n- аргументы, --confirm, пример и sheriff validate --strict\n");

// Every change is prepared; write the files.
fs.writeFileSync(new URL("tools-drafts.before-agree-generator.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-generator.md", here), english(gen.proposal, "2026-11-22"));
fs.writeFileSync(new URL("english-types.md", here), english(tp, "2026-11-22"));
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
const sp = drafts["new:tools-2-settings"].proposal;
console.log(sp.ruTitle + "\n" + sp.ruText + "\nREASON: " + sp.ruReason + "\nEXAMPLE: " + sp.examples[0].ru + `\n\nupdated at ${now}`);
