// Applies the third review of "What the SpecSheriff tools read in the project's own guidelines", which passed the draft
// after these fixes and left one doubt for the owner: the closing paragraph becomes a list that covers only the items
// finding a rule by its `refines` link; the item on checks and generators no longer restates 10.8 and 10.9; the items on
// kinds, on tools that rewrite files and on `exempts` links are worded more exactly.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-project-d.json", here), JSON.stringify(drafts, null, 2) + "\n");

const node = drafts["new:tools-1-project"];
const p = node.proposal;
const part = (start) => {
  const found = p.parts.find((x) => x.en.startsWith(start));
  if (!found) throw new Error(`no part starts with: ${start}`);
  return found;
};

Object.assign(part("the project's own kinds of node:"), {
  en: "the project's own kinds of node: the members of the `TextRule.list` of the rule that refines the rule on such kinds (§s-vsh384ybt4w25a2);",
  ru: "собственные виды узлов проекта: элементы `TextRule.list` правила, которое уточняет правило о таких видах (§s-vsh384ybt4w25a2);"
});
Object.assign(part("the project's own checks and generators:"), {
  en: "the project's own checks and generators (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the members of the `TextRule.list` of the rule that `sheriff.config.json` names for each of them;",
  ru: "собственные проверки и генераторы проекта (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): элементы `TextRule.list` правила, которое `sheriff.config.json` называет для каждого из них;",
  change: "Новое в этом узле: инструменты уже читают эти правила и отвергают настройку, если правило не перечисляет названную в ней проверку или генератор."
});
Object.assign(part("the project's own tools that rewrite files:"), {
  en: "the project's own tools that rewrite files: the members of the `TextRule.list` of the rule that refines the rule on the order in which tools and checks run (§s-pcnyfp7gev7syax), each the tool's path relative to `.githooks/`, such as `pre-commit.d/format` (§s-n4m5zvh96yb299p);",
  ru: "собственные инструменты проекта, которые переписывают файлы: элементы `TextRule.list` правила, которое уточняет правило о порядке запуска инструментов и проверок (§s-pcnyfp7gev7syax); каждый элемент — путь к инструменту относительно `.githooks/`, например `pre-commit.d/format` (§s-n4m5zvh96yb299p);"
});
Object.assign(part("the `exempts` links"), {
  en: "the `exempts` links of the nodes of `project.json` (§s-gf6n8ge4mke3pr2).",
  ru: "связи `exempts` узлов `project.json` (§s-gf6n8ge4mke3pr2)."
});
Object.assign(part("Where an item above"), {
  kind: "p",
  en: "Where an item above names the rule that refines another rule, the SpecSheriff tools find that rule by its `refines` link and read:",
  ru: "Если пункт выше называет правило, которое уточняет другое правило, инструменты SpecSheriff находят это правило по его связи `refines` и читают:",
  change: "Новое. Сейчас код при нескольких правилах об уровнях молча берёт последнее, а правила о fixtures объединяет. Теперь инструменты для всех таких пунктов поступают одинаково: читают элементы всех правил по порядку."
});
p.parts.push(
  { kind: "li",
    en: "no members, if no rule of `project.json` refines the other rule;",
    ru: "ни одного элемента, если ни одно правило `project.json` не уточняет другое правило;",
    change: "Новое." },
  { kind: "li",
    en: "the members of all the rules of `project.json` that refine it, in the order in which those rules appear there, if several do.",
    ru: "элементы всех правил `project.json`, которые его уточняют, в том порядке, в каком эти правила там стоят, если их несколько.",
    change: "Новое." }
);
// The text: the opening paragraph, the first list, the closing paragraph and its list.
const closing = p.parts.findIndex((x) => x.en.startsWith("Where an item above"));
const render = (key) => {
  const line = (x) => (x.kind === "li" ? `- ${x[key]}` : x[key]);
  const first = p.parts.slice(0, closing).map(line);
  const last = p.parts.slice(closing).map(line);
  return `${first[0]}\n${first.slice(1).join("\n")}\n\n${last[0]}\n${last.slice(1).join("\n")}`;
};
p.text = render("en");
p.ruText = render("ru");
p.refs = p.refs.filter((r) => true);
p.reviewed = "specsheriff-rule-reviewer, 2026-11-21: passed on its third report, once propose-project-d.mjs applied its fixes; one doubt put to the owner";
node.doubt = "Whether the list of the project's own tools that rewrite files belongs in `project.json`, as the agreed rule 10.12 says, although a git hook cannot read it where the SpecSheriff tools cannot run (the owner's ruling of 2026-11-05 in s-n4m5zvh96yb299p).";
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(p.text);
