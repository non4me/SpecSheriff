// Revises the draft of "What the SpecSheriff tools read in the project's own guidelines" after the second review found
// it not ready. The check refusing a second rule is dropped: table 10.1 lists every check, and it has no such check.
// Instead the lists of several rules refining the same rule are read together, in their order in `project.json`.
// A member of the list of tools that rewrite files is a path under `.githooks/`, a format is named through its files,
// the item on kinds no longer restates 8.4, and the reason says where the tools find each value.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-project-c.json", here), JSON.stringify(drafts, null, 2) + "\n");

const node = drafts["new:tools-1-project"];
const old = node.proposal.parts;
const keep = (i) => old[i];
const parts = [
  keep(0),
  keep(1),
  keep(2),
  keep(3),
  { kind: "li",
    en: "the project's own kinds of node: the members of the `TextRule.list` of the rule that refines the rule on such kinds (§s-vsh384ybt4w25a2, §s-hhnahzmhahf8jht);",
    ru: "собственные виды узлов проекта: элементы `TextRule.list` правила, которое уточняет правило о таких видах (§s-vsh384ybt4w25a2, §s-hhnahzmhahf8jht);",
    change: "Новое: правило 8.4 требует такое правило, а проверка сверяет его со схемой проекта. Что содержит элемент перечня, говорит само правило 8.4, поэтому здесь это не повторяется." },
  { kind: "li",
    en: "the project's own checks and generators: the members of the `TextRule.list` of the rule that `sheriff.config.json` names for each of them, a rule that refines the rule on such checks (§s-2fau85dfyyeq66m) or on such generators (§s-km4x4s26kv7pjze);",
    ru: "собственные проверки и генераторы проекта: элементы `TextRule.list` правила, которое `sheriff.config.json` называет для каждого из них; это правило уточняет правило о таких проверках (§s-2fau85dfyyeq66m) или о таких генераторах (§s-km4x4s26kv7pjze);",
    change: "Новое в этом узле: инструменты уже читают эти правила и отвергают настройку, если правило не перечисляет названную в ней проверку или генератор. Добавлено, что названное правило уточняет правило 10.8 или 10.9, как они требуют." },
  { kind: "li",
    en: "the project's own tools that rewrite files: the members of the `TextRule.list` of the rule that refines the rule on the order in which tools and checks run (§s-pcnyfp7gev7syax), each the path of one of the project's own tools under `.githooks/`, such as `pre-commit.d/format` (§s-n4m5zvh96yb299p);",
    ru: "собственные инструменты проекта, которые переписывают файлы: элементы `TextRule.list` правила, которое уточняет правило о порядке запуска инструментов и проверок (§s-pcnyfp7gev7syax); каждый элемент — путь к одному из собственных инструментов проекта в `.githooks/`, например `pre-commit.d/format` (§s-n4m5zvh96yb299p);",
    change: "Новое: правило 10.12 требует запускать такие инструменты первыми, поэтому инструментам SpecSheriff нужен их перечень. Решение моё: элемент перечня — путь к файлу в `.githooks/`, где проект уже держит свои инструменты для git hooks. Путь называет и hook, поэтому один и тот же инструмент можно указать для коммита и для push по отдельности. Команда в `sheriff.config.json` не нужна." },
  { kind: "li",
    en: "the files, besides JSON files, whose format allows no comments: those that match the glob patterns in the `TextRule.list` of the rule that refines the rule on how code is bound to its rules (§s-kgbzk2ph9e6jfb4);",
    ru: "файлы, кроме файлов JSON, формат которых не допускает комментариев: те, что соответствуют glob-шаблонам в `TextRule.list` правила, которое уточняет правило о привязке кода к правилам (§s-kgbzk2ph9e6jfb4);",
    change: "Новое: по правилу 1.5.2 файл такого формата привязывается к правилам через файл привязок. Решение моё: такие файлы указывают glob-шаблоны, как fixtures." },
  keep(8),
  { kind: "p",
    en: "Where an item above finds no rule by its `refines` link, the SpecSheriff tools take that item's list as empty. Where several rules of `project.json` refine the same rule, the tools read their lists together, in the order in which those rules stand in `project.json`.",
    ru: "Если пункт выше не находит правила по связи `refines`, инструменты SpecSheriff считают перечень этого пункта пустым. Если одно и то же правило уточняют несколько правил `project.json`, инструменты читают их перечни вместе, в том порядке, в каком эти правила стоят в `project.json`.",
    change: "Новое. Сейчас код при нескольких правилах об уровнях молча берёт последнее, а правила о fixtures объединяет. Теперь инструменты для всех пунктов поступают одинаково: читают перечни вместе, по порядку." }
];
const lines = (key) => parts.map((x) => (x.kind === "li" ? `- ${x[key]}` : x[key]));
const join = (key) => {
  const l = lines(key);
  return `${l[0]}\n${l.slice(1, -1).join("\n")}\n\n${l[l.length - 1]}`;
};
const p = node.proposal;
p.parts = parts;
p.text = join("en");
p.ruText = join("ru");
p.reason = "The SpecSheriff tools need values that only a project's own guidelines set, such as who owns the specification (§s-m42rsngtayk9g3g). A project gives its own rules any titles and arranges them as it chooses, so the tools find each value in the top node of `project.json`, by a link, or by a setting in `sheriff.config.json`.";
p.ruReason = "Инструментам SpecSheriff нужны значения, которые задают только собственные guidelines проекта, например кто отвечает за спецификацию (§s-m42rsngtayk9g3g). Проект даёт своим правилам любые названия и располагает их как хочет, поэтому инструменты находят каждое значение в верхнем узле `project.json`, по связи или по настройке в `sheriff.config.json`.";
p.reviewed = "specsheriff-rule-reviewer, 2026-11-21: not ready twice; revised by propose-project-b.mjs and propose-project-c.mjs, to be reviewed a third time";
p.refs = [
  ...["s-6sk8uet75dmq5qz", "s-nkyty4dy9x2v2a4", "s-6hha5en226aj8hu", "s-hhnahzmhahf8jht", "s-2fau85dfyyeq66m", "s-km4x4s26kv7pjze", "s-pcnyfp7gev7syax", "s-kgbzk2ph9e6jfb4", "s-gf6n8ge4mke3pr2"].map((to) => ({ type: "implements", to })),
  ...["s-u7tw6m8npxmv5tu", "s-zefk589ykh37b8u", "s-tdm3rwsppnuh6dm", "s-vsh384ybt4w25a2", "s-n4m5zvh96yb299p", "s-m42rsngtayk9g3g"].map((to) => ({ type: "cites", to }))
];
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const notes = new URL("../t25-one-thought.md", here);
let n = fs.readFileSync(notes, "utf8");
const swap = (from, to) => {
  if (!n.includes(from)) throw new Error(`notes: not found: ${from.slice(0, 80)}`);
  n = n.replace(from, to);
};
swap("specsheriff-rule-reviewer is reviewing the rewritten draft of the third node before that node is shown to the owner.\n",
  `The second review found the rewritten draft not ready either, and propose-project-c.mjs revised it:
  - the check that would have refused a second rule refining the same rule is dropped, since table 10.1 lists every check and has no such check. Instead the tools read the lists of all such rules together, in the order in which those rules stand in \`project.json\`, and take an item's list as empty where they find no rule for it;
  - a member of the list of the project's own tools that rewrite files is now a path under \`.githooks/\`, such as \`pre-commit.d/format\`, so that it also names the hook;
  - the item on formats that allow no comments now names the files whose format allows none;
  - the item on the project's own kinds of node no longer restates rule 8.4, which it now implements;
  - the item on the project's own checks and generators now says that the rule \`sheriff.config.json\` names refines rule 10.8 or 10.9;
  - the reason now says where the tools find each value: in the top node of \`project.json\`, by a link, or by a setting in \`sheriff.config.json\`.
- The second review also asked whether the node should list where the tests run (rule 1.6.1) and the project's own types of link (rule 6.1). The agent left both out. A project declares its own types of link in its extension of the schema, not in \`project.json\`. The tools do not read where the tests run, and whether they should is decided with "The tests, run before a push" (s-b6qdtghnyha3fhk), as the follow-ups below say. tools-drafts.before-project-c.json keeps the drafts as they were before propose-project-c.mjs ran. specsheriff-rule-reviewer is reviewing the draft a third time before the node is shown to the owner.
`);
swap("Follow-ups from the reviewer's report, each to be taken up when its node's turn comes:\n",
  `Follow-ups from the reviewer's report, each to be taken up when its node's turn comes:
- "The project's own tools in a git hook" (s-n4m5zvh96yb299p) and the hook script \`.githooks/pre-commit\` run the project's own tools after the checks, and fail when a tool changes the staged files. Rule 10.12 (s-pcnyfp7gev7syax) requires the tools that rewrite files to run first, and the list that "What the SpecSheriff tools read in the project's own guidelines" describes names them.
- "The tests, run before a push" (s-b6qdtghnyha3fhk) is to decide whether the tools read where the tests run from the project's own guidelines, as rule 1.6.1 (s-m4h279nbaqkpa3t) lets a project say. If they do, "What the SpecSheriff tools read in the project's own guidelines" gains an item for it.
- In stage 3, \`fixtureGlobs\` in model.ts is to read only \`project.json\`, as \`levelsOf\` does, and \`levelsOf\` is to read the lists of all the rules on levels together rather than only the last.
`);
fs.writeFileSync(notes, n);

const index = new URL("../INDEX.md", here);
let i = fs.readFileSync(index, "utf8");
const at = "state-project-b.mjs records that rewrite in the continuation file.";
if (!i.includes(at)) throw new Error("index: not found");
i = i.replace(at, at + " propose-project-c.mjs revises that draft after its second review, and tools-drafts.before-project-c.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, i);
console.log(p.text);
