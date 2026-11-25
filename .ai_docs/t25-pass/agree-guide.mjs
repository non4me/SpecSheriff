// Records the owner's ruling and agreement of 2026-11-22 («ок») on the node on `sheriff guide`: it prints the appendix of
// the tools after the guidelines, under a heading that says the appendix is no part of them. Writes english-guide.md for
// EngStickler's reader. Corrects the English of the agreed nodes "The model of the specification" and "The list of the
// todos" as EngStickler's readers proposed, without changing their meaning. Applies EngStickler's fiftieth and
// fifty-second batches of corrections to the continuation file and INDEX.md, and updates the outline. Every file is
// written only after every change has been prepared, so that a failed replacement leaves nothing half written.
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
const english = (p, title, date) => [`# "${p.title}", a new node of the appendix of the tools, agreed on ${date}`, "", "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""].join("\n");

// The node on `sheriff guide`.
const guide = drafts["new:tools-2-guide"];
guide.agreed = "2026-11-22";
guide.rulings = [...(guide.rulings ?? []), {
  date: "2026-11-22",
  problem: "The plan for splitting \"The commands\", which the owner agreed to on 2026-11-21, left the appendix of the tools out of what `sheriff guide` prints. The syntax of the SpecTag, the commands and the hooks are described only in that appendix, and the skill `spec` tells an agent to read what `sheriff guide` prints before anything else.",
  ruling: "The owner agreed («ок») to the agent's proposal: `sheriff guide` prints the appendix of the tools after the guidelines, under a heading that says the appendix is no part of them. The node had been shown in full with that paragraph, and the owner's answer agreed to the node as well.",
  type: "textual"
}];
delete guide.doubt;
guide.proposal.parts.find((x) => x.en.startsWith("After the guidelines")).change = "Новое, по вашему решению от 22 ноября: синтаксис SpecTag и команды описаны только в описании инструментов, а skill `spec` велит агенту сначала прочитать то, что печатает `sheriff guide`.";

// The English of "The model of the specification".
const json = drafts["new:tools-2-json"].proposal;
json.parts[0].en = "`sheriff json` prints, as JSON, the model of the specification of the repository in which it runs.";
json.parts[1].en = "The model holds each node of the files that the repository keeps. It also holds each node of the SpecSheriff guidelines, of the chosen extensions (§s-9ttvcwpqkehm58g) and of the appendix of the tools, where the project takes them from the plugin. It also holds each node that is in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).";
json.parts[2].en = "It gives each node in the form in which its file holds it, without the nodes under it, together with:";
json.parts[5].en = "the owners named by the nearest section or domain header above it that names owners (§s-6sk8uet75dmq5qz).";
rerender(json);
json.reason = "Given the model instead of reading the files itself, a project's check or code generator finds nodes by their location, finds owners and follows links as the SpecSheriff tools do, in whatever programming language the project writes that check or generator. The approval status and the `strict` flag are in the model because they affect what a project's check requires.";
drafts["new:tools-2-json"].englishRead = "EngStickler's reader, 2026-11-22: the English corrected without changing its meaning by agree-guide.mjs";

// The English of "The list of the todos".
const todos = drafts["new:tools-2-todos"].proposal;
todos.title = "The list of todos";
todos.parts[0].en = "`sheriff todos` prints as plain text every item of `meta.todos` (§s-t28j22vbdmmeqnh) of the nodes in the files that the repository keeps.";
todos.parts[1].en = "The items are listed newest first. Items of the same day are sorted by the path of their file, compared in code-point order, and then in the order in which their nodes appear in that file. Each item is printed with its date, its author, the work to be done, and the sid, the location and the title of its node.";
todos.parts[1].ru = "Элементы идут от новых к старым. Элементы одного дня упорядочены по пути их файла, сравниваемому в порядке кодовых точек, а затем в том порядке, в каком их узлы стоят в этом файле. Каждый элемент печатается с датой, автором, работой, которую нужно сделать, и sid, расположением и заголовком его узла.";
rerender(todos);
todos.reason = "A todo is kept on the node it concerns (§s-t28j22vbdmmeqnh), so it can be found where that node is. Listed together, the todos show all the deferred work in one place, newest first.";
drafts["new:tools-2-todos"].englishRead = "EngStickler's reader, 2026-11-22: the English corrected without changing its meaning by agree-guide.mjs";

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "which is what its text has always said", "which matches what its text has always said");
const start = t.indexOf("- specsheriff-rule-reviewer's first report on the second group");
const end = t.indexOf("\n\nStage 1 was");
if (start < 0 || end < start) throw new Error("continuation: the block on the second group not found");
t = t.slice(0, start) + `- specsheriff-rule-reviewer's first report on the second group found the nodes on \`sheriff json\`, \`sheriff todos\` and \`sheriff guide\` ready to be shown to the owner once the fixes it asked for were made, and found the nodes on \`sheriff types\` and \`sheriff settings\` not ready. fix-commands-b3.mjs applied the findings of the report; tools-drafts.before-commands-b3.json is a copy of the drafts made before that script ran:
  - The node on \`sheriff types\` is now titled "What \`sheriff types\` generates". In it, only a RecordType relies on other nodes: on each RecordType that it refines or that one of its fields refers to. The types and RuntimeChecks take the values gathered beside a field as they are when \`sheriff types\` runs, since those values come, for example, from domain headers, which nobody approves. The owner is asked to rule on this when the node is shown. The node also says where the last approved wording of a node is found: in the files of the specification, or otherwise in the latest commit on the current branch that holds that wording.
  - A new node, "How a project's own code generator is run" (s-y5yk7eu6h4zrjpr), takes over the paragraphs on running a generator from the node on \`sheriff types\`. The generator is handed a model of the specification built from the last approved wordings, which holds only the nodes that code can be generated from.
  - The model of the specification that \`sheriff json\` prints also holds the nodes taken from the plugin, the specification's approval status, and the specification's \`strict\` flag.
  - \`sheriff todos\` lists only the todos in the files that the repository keeps.
  - The draft of the node on \`sheriff guide\` proposed that \`sheriff guide\` print the appendix of the tools after the guidelines, under a heading that says the appendix is no part of them. This departed from the plan for splitting "The commands" that the owner had agreed to. \`sheriff guide\` also prints whether the \`strict\` flag is on.
  - The node on \`sheriff settings\` describes the arguments that the command takes: \`status approved|draft\`, \`strict on|off\` and \`extension <name> on|off\`, with \`--confirm\` for an approval confirmed without a terminal. A new node, "The list of the code that carries no SpecTag" (s-weuyx98r7c923ab), describes \`sheriff untagged\`. As a technical replacement, the agreed node that lists the commands now points to that new node for \`sheriff untagged\`, and writes "RuntimeChecks" where it wrote "runtime checks".
  The nodes on \`sheriff types\`, on running a generator, on \`sheriff settings\` and on \`sheriff untagged\` have been passed to specsheriff-rule-reviewer for a second review. Meanwhile the nodes that the reviewer found ready were shown to the owner one at a time.
- On 2026-11-22 the owner agreed to the wording of the node on \`sheriff json\`, "The model of the specification" («ок»). agree-json.mjs marked that node's draft as agreed and wrote english-json.md for EngStickler's reader; tools-drafts.before-agree-json.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/LnW1yMbBAouWzFGEmjdHMf shows the node. On the same day the owner agreed to the wording of the node on \`sheriff todos\`, now titled "The list of todos" («ок»). agree-todos.mjs marked that node's draft as agreed and wrote english-todos.md for EngStickler's reader; tools-drafts.before-agree-todos.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/2gKYPpx8SQw6p65zcDwjUa shows the node.
- The node on \`sheriff guide\` was shown to the owner with the question of whether \`sheriff guide\` prints the appendix of the tools after the guidelines. On 2026-11-22 the owner agreed («ок»): \`sheriff guide\` prints the appendix of the tools after the guidelines, under a heading that says the appendix is no part of them. The node had been shown in full with that paragraph, so agree-guide.mjs marked its draft as agreed, recorded the ruling in it, and wrote english-guide.md for EngStickler's reader; tools-drafts.before-agree-guide.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/UT5RETZYJgeiw5SWUoQf4g shows the node. The same script corrected the English of the agreed nodes "The model of the specification" and "The list of todos" as EngStickler's readers proposed, without changing their meaning.
- The next nodes, those on \`sheriff types\`, on running a generator, on \`sheriff settings\` and on \`sheriff untagged\`, are shown to the owner one at a time once the findings of specsheriff-rule-reviewer's second report have been applied.
- The reviewer also found changes that other nodes need, to be made when the review reaches them. "Generated copies against the nodes" (s-dbk2vyeg8z5jxna) still compares a generated copy with the last commit while a node that the copy is generated from is a draft; it also cites s-f5rz6b7dhxejjts and refuses a RecordType with two fields of type \`variant\`. "How a project's own check is run" (s-7pk89t8z6wymmj9) names \`sheriff model\`, which a technical replacement will change to \`sheriff json\`. The skill \`spec\` of both plugins says what \`sheriff guide\` prints, and the tests at generated.test.ts:278 and commands.test.ts:85 check it; they are to be changed in stage 3, in line with the node on \`sheriff guide\`.` + t.slice(end);

// INDEX.md.
const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
for (const [from, to] of [
  ["so that the node has a second table for the files that the plugin carries and places in `sheriff.config.json` the entries that set the specification's approval status and its `strict` flag;",
    "so that the node has a second table for the files that the plugin carries, and so that it places in `sheriff.config.json` the entries that set the specification's approval status and the specification's `strict` flag;"],
  ["after the first review found it not ready,", "after specsheriff-rule-reviewer's first review found it not ready to be shown to the owner,"],
  ["propose-project-c.mjs revises the draft of that node after the draft's second review", "propose-project-c.mjs revises the draft of \"What the SpecSheriff tools read in the project's own guidelines\" after the draft's second review"],
  ["propose-project-d.mjs applies the fixes of the third review of that draft", "propose-project-d.mjs applies the fixes that the third review of the same draft asked for"],
  ["fix-project-english.mjs applies the corrections that EngStickler's reader found in the English of that node", "fix-project-english.mjs applies the corrections that EngStickler's reader proposed for the English of \"What the SpecSheriff tools read in the project's own guidelines\""],
  ["it splits the node into \"How the schema", "it splits the node \"The schema and a project's extension\" into \"How the schema"],
  ["rewrites the conditions on which the tools accept", "rewrites the conditions on which the SpecSheriff tools accept"],
  ["drafts the first four of its nine nodes and the section that holds them, and gives every new node of the plan a sid", "drafts the first four of the nine nodes of \"The commands\" and the section that holds them, and gives every new node in that plan a sid"],
  ["that stopped on a sentence of this index", "that failed on a sentence in this index"],
  ["fix-commands-b3.mjs applies specsheriff-rule-reviewer's first report on that group", "fix-commands-b3.mjs applies the findings of specsheriff-rule-reviewer's first report on the second group of \"The commands\""],
  ["(tools-drafts.before-agree-todos.json is a copy of tools-drafts.json made before that script ran).",
    "(tools-drafts.before-agree-todos.json is a copy of tools-drafts.json made before that script ran). agree-guide.mjs records the owner's ruling on and agreement to the node on `sheriff guide`, writes english-guide.md, and corrects the English of the agreed nodes on `sheriff json` and `sheriff todos` (tools-drafts.before-agree-guide.json is a copy of tools-drafts.json made before that script ran)."]
]) s = swap(s, from, to);
s = s.replaceAll("the list node", "the node that lists the commands");

// The outline.
const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Guidelines, напечатанные в одном месте» (sheriff guide) — согласован\n- описание инструментов печатается после guidelines, под своим заголовком\n\n## ● В работе:");
o = swap(o, "- ● «Guidelines, напечатанные в одном месте» (sheriff guide): показан вам, с вопросом об описании инструментов\n- ○ у рецензента второй раз:",
  "- ✓ «Guidelines, напечатанные в одном месте» (sheriff guide) — согласован, с описанием инструментов\n- ● у рецензента второй раз:");
o = swap(o, "### ◐ Печатать ли описание инструментов в sheriff guide\n- после guidelines, под заголовком, что оно в них не входит\n\n### ○ Вопросы, которые придут с узлами\n- sheriff types: собранные значения берутся такими, какие они есть при запуске\n",
  "### ○ Вопрос, который придёт с узлом о sheriff types\n- собранные значения берутся такими, какие они есть при запуске\n");

// Every change is prepared; write the files.
fs.writeFileSync(new URL("tools-drafts.before-agree-guide.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-guide.md", here), english(guide.proposal, "", "2026-11-22"));
fs.writeFileSync(new URL("english-json.md", here), english(json, "", "2026-11-22"));
fs.writeFileSync(new URL("english-todos.md", here), english(todos, "", "2026-11-22"));
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
