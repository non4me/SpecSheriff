// Rewrites the draft of "What the SpecSheriff tools read in the project's own guidelines" after specsheriff-rule-reviewer
// found it not ready: every rule the tools read is found by its `refines` link, the list covers everything the tools
// read there, each item says what a member of the list holds, and the reason says what the node solves. Also makes the
// agreed "Where the files are" cite the Domains extension by its section rather than by one of its rules.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-project-b.json", here), JSON.stringify(drafts, null, 2) + "\n");

// "Where the files are": the citation of the Domains extension, a replacement that changes no meaning.
const files = drafts["s-zefk589ykh37b8u"];
const from = "§s-h6h25ctd3yryudh", to = "§s-tdm3rwsppnuh6dm";
const fp = files.proposal;
for (const part of fp.parts) for (const key of ["en", "ru"]) {
  const v = part[key];
  part[key] = Array.isArray(v) ? v.map((c) => c.split(from).join(to)) : v.split(from).join(to);
}
for (const key of ["text", "ruText"]) fp[key] = fp[key].split(from).join(to);
fp.refs = fp.refs.map((r) => (r.to === "s-h6h25ctd3yryudh" ? { ...r, to: "s-tdm3rwsppnuh6dm" } : r));
files.rulings.push({ date: "2026-11-21", problem: "The node cited the Domains extension by its rule on decomposition (s-h6h25ctd3yryudh) rather than by the extension's own section, as specsheriff-rule-reviewer found.", ruling: "The agent made the node cite the section of the extension (s-tdm3rwsppnuh6dm), a replacement that changes no meaning, and reported it to the owner.", type: "textual" });

// The new node.
const node = drafts["new:tools-1-project"];
const parts = [
  { kind: "p",
    en: "The SpecSheriff tools read the following in the project's own guidelines (§s-u7tw6m8npxmv5tu), kept in `project.json` (§s-zefk589ykh37b8u):",
    ru: "В собственных guidelines проекта (§s-u7tw6m8npxmv5tu), которые хранятся в `project.json` (§s-zefk589ykh37b8u), инструменты SpecSheriff читают:",
    change: "Новый узел. Его содержание было в узле «Where the files are». Добавлена ссылка на узел, который задаёт путь к `project.json`." },
  { kind: "li",
    en: "the specification's owners (§s-6sk8uet75dmq5qz): those whom the top node of `project.json` names;",
    ru: "ответственных за спецификацию (§s-6sk8uet75dmq5qz): тех, кого называет верхний узел `project.json`;",
    change: "Без изменений по смыслу. Добавлена ссылка на правило об ответственных." },
  { kind: "li",
    en: "if the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the levels of the domains: the members of the `TextRule.list` of the rule that refines the rule on a domain's level (§s-nkyty4dy9x2v2a4);",
    ru: "если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), — уровни доменов: элементы `TextRule.list` правила, которое уточняет правило об уровне домена (§s-nkyty4dy9x2v2a4);",
    change: "Добавлено условие: уровни есть только у доменов, а домены теперь — расширение. Как в одобренной формулировке, инструменты находят это правило по связи `refines`." },
  { kind: "li",
    en: "the fixtures of tests: the files that match the glob patterns in the `TextRule.list` of each rule that refines the rule on such fixtures (§s-6hha5en226aj8hu);",
    ru: "fixtures тестов: файлы, которые соответствуют glob-шаблонам в `TextRule.list` каждого правила, которое уточняет правило о таких fixtures (§s-6hha5en226aj8hu);",
    change: "Без изменений по смыслу. Сказано, что таких правил может быть несколько: инструменты читают шаблоны всех." },
  { kind: "li",
    en: "the project's own kinds of node: the members of the `TextRule.list` of the rule that refines the rule on such kinds (§s-vsh384ybt4w25a2), each with its `needsCode`, as §s-hhnahzmhahf8jht says;",
    ru: "собственные виды узлов проекта: элементы `TextRule.list` правила, которое уточняет правило о таких видах (§s-vsh384ybt4w25a2), каждый со своим `needsCode`, как говорит §s-hhnahzmhahf8jht;",
    change: "Новое: правило 8.4 требует такое правило, а проверка сверяет его со схемой проекта." },
  { kind: "li",
    en: "the project's own checks and generators: the members of the `TextRule.list` of each rule that `sheriff.config.json` names for one of them (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze);",
    ru: "собственные проверки и генераторы проекта: элементы `TextRule.list` каждого правила, которое `sheriff.config.json` называет для одного из них (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze);",
    change: "Новое в этом узле: инструменты уже читают эти правила и отвергают настройку, если правило не перечисляет названную в ней проверку или генератор." },
  { kind: "li",
    en: "the project's own tools that rewrite files: the members of the `TextRule.list` of the rule that refines the rule on the order in which tools and checks run (§s-pcnyfp7gev7syax), each the name of a file of the project's own tools for a git hook (§s-n4m5zvh96yb299p);",
    ru: "собственные инструменты проекта, которые переписывают файлы: элементы `TextRule.list` правила, которое уточняет правило о порядке запуска инструментов и проверок (§s-pcnyfp7gev7syax); каждый элемент — имя файла собственного инструмента проекта для git hook (§s-n4m5zvh96yb299p);",
    change: "Новое: правило 10.12 требует запускать такие инструменты первыми, поэтому инструментам SpecSheriff нужен их перечень. Решение моё: элемент перечня — имя файла в `.githooks/<hook>.d/`, где проект уже держит свои инструменты для git hooks, поэтому команда в `sheriff.config.json` не нужна." },
  { kind: "li",
    en: "the formats of files, besides JSON, that allow no comments: the files that match the glob patterns in the `TextRule.list` of the rule that refines the rule on how code is bound to its rules (§s-kgbzk2ph9e6jfb4);",
    ru: "форматы файлов помимо JSON, в которых нельзя писать комментарии: файлы, которые соответствуют glob-шаблонам в `TextRule.list` правила, которое уточняет правило о привязке кода к правилам (§s-kgbzk2ph9e6jfb4);",
    change: "Новое: по правилу 1.5.2 файл такого формата привязывается к правилам через файл привязок. Решение моё: формат задаётся glob-шаблоном, как fixtures." },
  { kind: "li",
    en: "the `exempts` links of its nodes (§s-gf6n8ge4mke3pr2).",
    ru: "связи `exempts` его узлов (§s-gf6n8ge4mke3pr2).",
    change: "Новое в этом узле: инструменты уже читают эти связи, когда проверяют, что правило реализовано." },
  { kind: "p",
    en: "Where no rule of the project's own guidelines refines one of the rules above, the SpecSheriff tools read no value for that rule. `sheriff validate` refuses a second rule that refines the same rule, except for the rule on the fixtures of tests.",
    ru: "Если ни одно правило собственных guidelines проекта не уточняет одно из правил выше, инструменты SpecSheriff не читают значения для этого правила. `sheriff validate` отвергает второе правило, которое уточняет то же правило, кроме правила о fixtures тестов.",
    change: "Новое, решение моё. Сейчас код при нескольких правилах об уровнях молча берёт последнее, а правила о fixtures объединяет. Новая проверка делает выбор явным." }
];
const lines = (key) => parts.map((x) => (x.kind === "li" ? `- ${x[key]}` : x[key]));
const join = (key) => {
  const l = lines(key);
  return `${l[0]}\n${l.slice(1, -1).join("\n")}\n\n${l[l.length - 1]}`;
};
node.proposal = {
  title: "What the SpecSheriff tools read in the project's own guidelines",
  ruTitle: "Что инструменты SpecSheriff читают в собственных guidelines проекта",
  parts,
  text: join("en"),
  ruText: join("ru"),
  reason: "The SpecSheriff tools need values that only a project's own guidelines set, such as who owns the specification (§s-m42rsngtayk9g3g). A project titles and arranges its own rules freely, so the tools find each value by the place or by the `refines` link of the rule that sets it.",
  ruReason: "Инструментам SpecSheriff нужны значения, которые задают только собственные guidelines проекта, например кто отвечает за спецификацию (§s-m42rsngtayk9g3g). Проект называет и располагает свои правила свободно, поэтому инструменты находят каждое значение по месту или по связи `refines` правила, которое его задаёт.",
  reasonChange: "Новое. Говорит, какую задачу решает узел: найти значение, которое задаёт проект, не завися от того, как он назвал и расположил свои правила.",
  removed: [
    "Пункт о правиле, которое одобряет спецификацию (уточняет §s-qzthyh7yqvfhsa2), — по вашему решению от 21 ноября статус одобрения спецификации хранится в `sheriff.config.json`."
  ],
  date: "2026-11-21",
  reviewed: "specsheriff-rule-reviewer, 2026-11-21: not ready; rewritten by propose-project-b.mjs, to be reviewed again",
  refs: [
    ...["s-6sk8uet75dmq5qz", "s-nkyty4dy9x2v2a4", "s-6hha5en226aj8hu", "s-vsh384ybt4w25a2", "s-pcnyfp7gev7syax", "s-kgbzk2ph9e6jfb4"].map((to) => ({ type: "implements", to })),
    ...["s-u7tw6m8npxmv5tu", "s-zefk589ykh37b8u", "s-tdm3rwsppnuh6dm", "s-hhnahzmhahf8jht", "s-2fau85dfyyeq66m", "s-km4x4s26kv7pjze", "s-n4m5zvh96yb299p", "s-gf6n8ge4mke3pr2", "s-m42rsngtayk9g3g"].map((to) => ({ type: "cites", to }))
  ]
};
node.from = "s-zefk589ykh37b8u";
node.testsFrom = "no test of the approved node reads project.json";
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(node.proposal.text);
