// Records the owner's rulings and agreement of 2026-11-22 («ок») on the node on `sheriff types`: the gathered values are
// taken as the files hold them when `sheriff types` runs, and a RecordType's `refines` links are taken from the commit
// that added its last approval. Writes english-types.md for EngStickler's reader. Puts the agent's two proposals into
// the node on running a project's generator, which is shown next: only paths of the system's code are accepted, and a
// file whose `sids` name a node outside the model is refused. Applies EngStickler's fifty-fourth batch of corrections.
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
const L = (en, ru, change) => ({ kind: "li", en, ru, change });

// `sheriff types`.
const types = drafts["new:tools-2-types"];
const tp = types.proposal;
types.agreed = "2026-11-22";
types.rulings = [...(types.rulings ?? []), {
  date: "2026-11-22",
  problem: "The values gathered beside a field come, for example, from domain headers, which nobody approves, so a RecordType that waited for their approval would never be generated. A RecordType's `refines` links are not part of its approved wording, so a link added after the approval would change the generated type without an approval.",
  ruling: "The owner agreed («ок») to the agent's proposals: the types and RuntimeChecks are generated from the gathered values as the files of the specification hold them when `sheriff types` runs; `sheriff types` takes a RecordType's `refines` links from the commit that added the RecordType's last approval to `specs/_approvals.jsonl`, and from the files while that commit is still to be made. The node had been shown in full with both paragraphs, and the owner's answer agreed to the node as well.",
  type: "textual"
}];
delete types.doubt;
const gathered = tp.parts.find((x) => x.en.startsWith("The types and RuntimeChecks take the gathered values"));
gathered.en = "`sheriff types` generates the types and RuntimeChecks from the gathered values written beside a field (§s-ju5vcanbjph7mgh) as the files of the specification hold them when it runs, even where a RecordType's approved wording comes from a commit.";
gathered.ru = "Типы и RuntimeChecks `sheriff types` порождает из собранных значений, записанных рядом с полем (§s-ju5vcanbjph7mgh), такими, какими их хранят файлы спецификации при его запуске, даже если одобренная формулировка RecordType взята из коммита.";
gathered.change = "Новое, по вашему решению от 22 ноября: собранные значения берутся, например, из заголовков доменов, а заголовки никто не одобряет.";
tp.parts.find((x) => x.en.startsWith("`sheriff types` takes the `refines` links")).change = "Новое, по вашему решению от 22 ноября: связь не входит в одобряемую формулировку, и без этого абзаца связь `refines`, добавленная после одобрения, изменила бы порождённый тип без одобрения.";
rerender(tp);
const english = (p, date) => [`# "${p.title}", a new node of the appendix of the tools, agreed on ${date}`, "", "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""].join("\n");

// How a project's own code generator is run: the agent's two proposals.
const gen = drafts["new:tools-2-generator"];
const gp = gen.proposal;
const last = gp.parts.findIndex((x) => x.en.startsWith("a path that the generator prints lies outside the repository"));
if (last < 0) throw new Error("generator: the refusal of paths not found");
gp.parts.splice(last, 1,
  L("a path that the generator prints lies outside the system's code (§s-hheus6f395ynqvc);",
    "путь, который печатает генератор, лежит вне кода системы (§s-hheus6f395ynqvc);",
    "Новое, на ваше решение: прежний перечень запрещённых путей пропускал бы, например, `.githooks/pre-commit` или `sheriff.config.json`. Код меняется на этапе 3."),
  L("the `sids` of a file that the generator prints name a node outside the model that the generator is handed.",
    "`sids` файла, который печатает генератор, называют узел вне модели, переданной генератору.",
    "Новое, на ваше решение: файлы больше не ждут черновиков, и без этого отказа `sids` ни для чего бы не служили."));
rerender(gp);
gen.doubt = "The two refusals proposed by the agent, of a path outside the system's code and of `sids` that name a node outside the model, are put to the owner with the node.";

// `sheriff untagged`: the title.
drafts["new:tools-2-untagged"].proposal.title = "The list of code that carries no SpecTag";

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["took over `sheriff untagged` from the node on `sheriff settings`", "took over the description of `sheriff untagged` from the node on `sheriff settings`"],
  ["a new node, \"The list of the code that carries no SpecTag\" (s-weuyx98r7c923ab)", "a new node, \"The list of code that carries no SpecTag\" (s-weuyx98r7c923ab)"]
]) t = swap(t, from, to);
const start = t.indexOf("  - \"What `sheriff types` generates\", shown now with two questions for the owner.");
const end = t.indexOf("- The reviewers also found changes that other nodes need");
if (start < 0 || end < start) throw new Error("continuation: the list of the nodes to be shown not found");
t = t.slice(0, start) + `  - "What \`sheriff types\` generates". It was shown with two questions, and on 2026-11-22 the owner agreed («ок») to the agent's proposals. First, \`sheriff types\` generates the types and RuntimeChecks from the gathered values written beside a field as the files hold them when it runs, since those values come, for example, from domain headers, which nobody approves. Second, \`sheriff types\` takes a RecordType's \`refines\` links from the commit that added the RecordType's last approval to \`specs/_approvals.jsonl\`, since a link is not part of the approved wording. The node had been shown in full with both paragraphs, so agree-types.mjs marked its draft as agreed, recorded the rulings in it, and wrote english-types.md for EngStickler's reader; tools-drafts.before-agree-types.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/GHkd72S8Pg9j7k5iiYzh3D shows the node.
  - "How a project's own code generator is run", now shown with two refusals that the agent proposes, for the owner to decide on: of a path that lies outside the system's code, and of a file whose \`sids\` name a node outside the model that the generator is handed. agree-types.mjs wrote both into the draft. The node's requirement to refuse any output other than a JSON list of objects holding \`path\`, \`content\` and \`sids\` is stricter than what the code does now; the code is to be changed in stage 3. The owner's answer is to be acted on first.
  - "The settings that only an owner of the specification changes": the arguments \`status approved|draft\`, \`strict on|off\` and \`extension <name> on|off\`; the option \`--confirm\` for an approval that the owner confirms without a terminal; the example that specsheriff-rule-reviewer proposed; and \`sheriff validate --strict\` as the command that a refusal names for a project's own check.
  - "The list of code that carries no SpecTag".
` + t.slice(end);
for (const [from, to] of [
  ["refuses a RecordType with two fields of type `variant`, and refuses a generator's paths in the same way as the node on running a generator", "refuses a RecordType that has two fields of type `variant`, and refuses the paths that a generator prints in the way that the earlier node on running a generator did"],
  ["which a technical replacement will change to `sheriff json`", "which a technical replacement will rename to `sheriff json`"],
  ["The reason of \"The hooks\" (s-477gtdrkw34dzxw) still says", "The reason that \"The hooks\" (s-477gtdrkw34dzxw) gives still says"]
]) t = swap(t, from, to);

// INDEX.md.
const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-commands-b4.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-commands-b4.json is a copy of tools-drafts.json made before that script ran). agree-types.mjs records the owner's rulings on and agreement to the node on `sheriff types`, writes english-types.md, and puts the agent's two proposed refusals into the node on running a generator (tools-drafts.before-agree-types.json is a copy of tools-drafts.json made before that script ran).");

// The outline.
const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Что порождает sheriff types» — согласован\n- собранные значения — такими, какими их хранят файлы при запуске\n- связи refines — из коммита, который добавил последнее одобрение\n\n## ● В работе:");
o = swap(o, "- ● «Что порождает sheriff types»: показан вам, с двумя вопросами\n- ○ «Как запускается генератор проекта» — с двумя вопросами",
  "- ✓ «Что порождает sheriff types» — согласован\n- ● «Как запускается генератор проекта»: показан вам, с двумя предложенными отказами");
o = swap(o, "- ○ «Перечень кода без SpecTag» (sheriff untagged)", "- ○ «Перечень кода без SpecTag» (sheriff untagged)");
o = swap(o, "### ◐ Два вопроса к узлу о sheriff types\n- собранные значения берутся такими, какими их хранят файлы при запуске\n- связи refines берутся из коммита, который добавил последнее одобрение\n\n### ○ Вопросы, которые придут с узлом о генераторе\n- принимать только пути кода системы\n- отвергать файл, чьи sids называют узел вне модели\n",
  "### ◐ Два отказа в узле о генераторе проекта\n- путь, который лежит вне кода системы\n- файл, чьи sids называют узел вне модели\n");

// Every change is prepared; write the files.
fs.writeFileSync(new URL("tools-drafts.before-agree-types.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-types.md", here), english(tp, "2026-11-22"));
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(gp.ruTitle + "\n" + gp.ruText + "\nREASON: " + gp.ruReason + `\n\nupdated at ${now}`);
