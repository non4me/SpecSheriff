// Applies the English corrections that EngStickler's reader found in the agreed node "What the SpecSheriff tools read
// in the project's own guidelines", none of which changes the node's meaning, keeps the Russian rendering in step, and
// rewrites english-project.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-project-english.json", here), JSON.stringify(drafts, null, 2) + "\n");

const node = drafts["new:tools-1-project"];
const p = node.proposal;
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const fix = (index, pairs) => {
  const x = p.parts[index];
  for (const [key, from, to] of pairs) x[key] = swap(x[key], from, to);
};

fix(3, [["en", "the fixtures of tests:", "test fixtures:"]]);
fix(5, [["en", "names for each of them;", "names for each such check or generator;"],
  ["ru", "называет для каждого из них;", "называет для каждой такой проверки или каждого такого генератора;"]]);
fix(6, [["en", "(§s-pcnyfp7gev7syax), each the tool's path relative to `.githooks/`,", "(§s-pcnyfp7gev7syax), where each member is the path of a tool relative to `.githooks/`,"]]);
fix(7, [["en", "the files, besides JSON files, whose format", "the files other than JSON files whose format"]]);
fix(9, [["en", "Where an item above names the rule that refines another rule, the SpecSheriff tools find that rule by its `refines` link and read:",
  "Where an item above refers to the rule that refines another rule, the SpecSheriff tools find that rule by the `refines` link it carries, and read:"],
  ["ru", "Если пункт выше называет правило, которое уточняет другое правило, инструменты SpecSheriff находят это правило по его связи `refines` и читают:",
    "Если пункт выше говорит о правиле, которое уточняет другое правило, инструменты SpecSheriff находят это правило по связи `refines`, которую оно несёт, и читают:"]]);
fix(10, [["en", "no members, if no rule of `project.json` refines the other rule;", "nothing, if no rule of `project.json` refines that other rule;"],
  ["ru", "ни одного элемента, если ни одно правило `project.json` не уточняет другое правило;", "ничего, если ни одно правило `project.json` не уточняет то другое правило;"]]);
fix(11, [["en", "the members of all the rules of `project.json` that refine it, in the order in which those rules appear there, if several do.",
  "otherwise, the members of every rule of `project.json` that refines that other rule, in the order in which those rules appear there."],
  ["ru", "элементы всех правил `project.json`, которые его уточняют, в том порядке, в каком эти правила там стоят, если их несколько.",
    "иначе — элементы каждого правила `project.json`, которое уточняет то другое правило, в том порядке, в каком эти правила там стоят."]]);
p.reason = swap(p.reason, "arranges them as it chooses", "arranges those rules as it chooses");
p.ruReason = swap(p.ruReason, "располагает их как хочет", "располагает эти правила как хочет");

// The text: the opening paragraph, the first list, the closing paragraph and its list, as propose-project-d.mjs renders it.
const closing = p.parts.findIndex((x) => x.en.startsWith("Where an item above"));
const render = (key) => {
  const line = (x) => (x.kind === "li" ? `- ${x[key]}` : x[key]);
  const first = p.parts.slice(0, closing).map(line);
  const last = p.parts.slice(closing).map(line);
  return `${first[0]}\n${first.slice(1).join("\n")}\n\n${last[0]}\n${last.slice(1).join("\n")}`;
};
p.text = render("en");
p.ruText = render("ru");
node.englishRead = "EngStickler's reader, 2026-11-21: the English corrected without a change of meaning by fix-project-english.mjs; \"the levels of the domains\" and \"kept in `project.json`\" kept, since the context allows only the intended reading";
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-project.md", here), [
  "# \"What the SpecSheriff tools read in the project's own guidelines\", a new node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""
].join("\n"));

const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and tools-drafts.before-agree-project.json is tools-drafts.json as it was before agree-project.mjs ran.",
  "and tools-drafts.before-agree-project.json is tools-drafts.json as it was before agree-project.mjs ran. fix-project-english.mjs applies the corrections that EngStickler's reader found in the English of that node, and tools-drafts.before-project-english.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, s);
console.log(p.text);
