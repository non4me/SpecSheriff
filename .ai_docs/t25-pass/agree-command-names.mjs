// Carries out the owner's agreement of 2026-11-21 («ок») to four new names of commands: `sheriff message` becomes
// `sheriff commit-message`, `sheriff model` becomes `sheriff json`, `sheriff export` becomes `sheriff markdown`, and
// `sheriff render` becomes `sheriff map`. Writes them into the list node, records the ruling in its draft, and applies
// EngStickler's forty-third batch of corrections to the continuation file and INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-command-names.json", here), JSON.stringify(drafts, null, 2) + "\n");
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const k = "s-f5rz6b7dhxejjts";
const p = drafts[k].proposal;
const renames = [["`sheriff message`", "`sheriff commit-message`"], ["`sheriff model`", "`sheriff json`"], ["`sheriff export`", "`sheriff markdown`"], ["`sheriff render`", "`sheriff map`"]];
for (const x of p.parts) {
  for (const [from, to] of renames) {
    if (x.en.startsWith(from + ":")) {
      x.en = to + x.en.slice(from.length);
      x.ru = to + x.ru.slice(from.length);
      x.change = `Новое: назначение команды одним предложением, по вашему замечанию. Было имя ${from}; по вашему решению команда называется ${to}, чтобы имя говорило, что она делает.`;
    }
  }
}
for (const [from] of renames) if (p.parts.some((x) => x.en.startsWith(from + ":"))) throw new Error(`not renamed: ${from}`);
p.text = render(p.parts, "en");
p.ruText = render(p.parts, "ru");
p.removed = p.removed.map((r) => r.replace("`sheriff model`", "`sheriff model` (теперь `sheriff json`)"));
drafts[k].rulings = [...(drafts[k].rulings ?? []), {
  date: "2026-11-21",
  problem: "The names of four commands did not say what the commands do: `sheriff message` checks a commit's message against the code that the commit changes, `sheriff model` prints the specification as JSON data, `sheriff export` writes the specification in Markdown, and `sheriff render` writes the map of the specification. The owner proposed `sheriff commit`, `sheriff json_schema`, `sheriff markdown` and `sheriff map`. The agent proposed `sheriff json`, since the command prints the specification and not its JSON Schema, and `sheriff commit-message`, since `sheriff commit` could be read as a command that makes a commit.",
  ruling: "The owner: the commands are renamed `sheriff commit-message`, `sheriff json`, `sheriff markdown` and `sheriff map` («ок»).",
  type: "textual"
}];
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["Stage 1 was part of the step that changes the SpecSheriff tools.", "Stage 1 was the first stage of the step that changes the SpecSheriff tools."],
  ["The owner asked that each command be given at least one sentence saying what it is for, beside its name and its nodes,", "The owner asked that each command be given at least one sentence saying what it is for, in addition to its name and its nodes,"],
  ["fix-commands-list-purpose.mjs did so, listing each check command separately,", "fix-commands-list-purpose.mjs did so, listing each command that runs a check separately,"],
  ["The agent agreed to `sheriff markdown` and `sheriff map`, and proposed two changes.", "The agent agreed to the names `sheriff markdown` and `sheriff map`, and proposed two changes."],
  ["`sheriff model` prints the specification itself as JSON data, not a JSON Schema, which is the schema in specs/_schema/;", "`sheriff model` prints the specification itself as JSON data, not a JSON Schema, that is, the schema in specs/_schema/;"],
  ["`sheriff commit` could be read as a command that makes a commit, while the command checks", "`sheriff commit` could be read as a command that makes a commit, whereas the command checks"],
  ["The owner's answer is to be acted on first. The new names change the code, the hooks, the skills, the tests and the nodes that name these commands, among them tools 4, 5, 6 and 7.1.23; all of that is done in stage 3, and each node is changed by a technical replacement when its turn comes.",
    "On 2026-11-21 the owner agreed («ок»): the commands are renamed `sheriff commit-message`, `sheriff json`, `sheriff markdown` and `sheriff map`. agree-command-names.mjs wrote the new names into the list node and recorded the ruling in its draft; tools-drafts.before-command-names.json keeps the drafts as they were before that script ran. The new names require changes to the code, the hooks, the skills, the tests and the nodes that name these commands, among them nodes 4, 5, 6 and 7.1.23 of tools.json; all of that is done in stage 3, and each node of tools.json is changed by a technical replacement when the review reaches it. The list node with the new names has now been shown to the owner again, and the owner's answer is to be acted on first."]
]) t = swap(t, from, to);
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "fix-commands-list-purpose.mjs adds to each command in the list node a sentence saying what the command is for, as the owner asked,",
  "fix-commands-list-purpose.mjs adds a sentence to each command in the list node, saying what the command is for, as the owner asked,");
s = swap(s, "state-command-names.mjs records the owner's proposal to rename four commands and the agent's answer.",
  "state-command-names.mjs records the owner's proposal to rename `sheriff message`, `sheriff model`, `sheriff export` and `sheriff render`, and the agent's answer. agree-command-names.mjs writes the new names that the owner agreed to into the list node, and tools-drafts.before-command-names.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
const waiting = o.match(/## ◐ Ждёт вашего решения\n\n### ◐ Новые имена команд\n[\s\S]*?\n\n(?=## ○ Затем:)/);
if (!waiting) throw new Error("outline: the waiting branch not found");
o = swap(o, waiting[0], "");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ Новые имена команд — согласованы\n- sheriff commit-message, sheriff json, sheriff markdown, sheriff map\n\n## ● В работе:");
o = swap(o, "- ● «Команды»: «Команды, которые принимает sheriff» — у каждой команды теперь её назначение, по вашему замечанию; показан вам снова",
  "- ● «Команды»: «Команды, которые принимает sheriff» — с назначением каждой команды и новыми именами; показан вам снова");
fs.writeFileSync(outline, o);
console.log(p.text + `\n\nupdated at ${now}`);
