// Carries out the owner's remark of 2026-11-21 on "The commands that `sheriff` accepts" («может стоит помимо названия
// комманды и ссылки хотя бы одним предложением описывать ее предназначение? Агент сможет сразу понять что ему нужно»):
// each command in the list now says in one sentence what it is for. Applies EngStickler's fortieth and forty-first
// batches of corrections to the continuation file and INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-list-purpose.json", here), JSON.stringify(drafts, null, 2) + "\n");
const s5 = drafts["commands:sids"];
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const checks = "§s-4kd2pave7vm4hmd";
const items = [
  ["`sheriff validate`: checks that the specification holds together and that each change to it follows the rules (" + checks + ");", "`sheriff validate` — проверяет, что спецификация согласована и что каждое её изменение следует правилам (" + checks + ");"],
  ["`sheriff binding`: checks the specification against the code and the tests that are bound to it (" + checks + ");", "`sheriff binding` — проверяет спецификацию по связанным с ней коду и тестам (" + checks + ");"],
  ["`sheriff citations`: checks each sid that the code, the tests and the documentation cite (" + checks + ");", "`sheriff citations` — проверяет каждый sid, который цитируют код, тесты и документация (" + checks + ");"],
  ["`sheriff guard`: judges an agent's edit before it is made, and refuses an edit that the SpecSheriff guidelines forbid (" + checks + ");", "`sheriff guard` — оценивает правку агента до того, как она сделана, и отвергает правку, которую запрещают SpecSheriff guidelines (" + checks + ");"],
  ["`sheriff message`: checks a commit's message against the code that the commit changes (" + checks + ");", "`sheriff message` — проверяет сообщение коммита по коду, который коммит меняет (" + checks + ");"],
  ["`sheriff review`: asks the independent reviewer for its verdict on a commit (" + checks + ");", "`sheriff review` — запрашивает вердикт независимого рецензента по коммиту (" + checks + ");"],
  ["`sheriff init`: sets a repository up for SpecSheriff (§s-7unxytshhc4md54);", "`sheriff init` — готовит репозиторий к работе по SpecSheriff (§s-7unxytshhc4md54);"],
  ["`sheriff remove`: takes SpecSheriff out of a repository and leaves its specification as it is (§s-7unxytshhc4md54);", "`sheriff remove` — убирает SpecSheriff из репозитория и оставляет его спецификацию как есть (§s-7unxytshhc4md54);"],
  ["`sheriff approve`: records an owner's approval of a node, or the withdrawal of that approval (§s-v4qus7raqnwzneb);", "`sheriff approve` — записывает одобрение узла ответственным или отзыв этого одобрения (§s-v4qus7raqnwzneb);"],
  [`\`sheriff reindex\`: writes into the specification what the SpecSheriff tools compute from it, and rewrites what an earlier release wrote (§${s5.writes}, §${s5.earlier}, §${s5.twice});`, `\`sheriff reindex\` — записывает в спецификацию то, что инструменты SpecSheriff по ней вычисляют, и переписывает то, что записал прежний выпуск (§${s5.writes}, §${s5.earlier}, §${s5.twice});`],
  [`\`sheriff types\`: generates the system's code from the approved wordings of the nodes, such as the types and runtime checks of the RecordTypes (§${s5.types});`, `\`sheriff types\` — порождает код системы из одобренных формулировок узлов, например типы и проверки во время работы для RecordType (§${s5.types});`],
  [`\`sheriff model\`: prints as JSON the model of the specification, which a project's own check or generator reads (§${s5.model});`, `\`sheriff model\` — печатает в JSON модель спецификации, которую читает собственная проверка или генератор проекта (§${s5.model});`],
  [`\`sheriff todos\`: prints every todo of the specification together with its node (§${s5.todos});`, `\`sheriff todos\` — печатает каждую задачу на потом из спецификации вместе с её узлом (§${s5.todos});`],
  [`\`sheriff guide\`: prints the guidelines that the project follows, which an agent reads before it works on the specification (§${s5.guide});`, `\`sheriff guide\` — печатает guidelines, которым следует проект; агент читает их, прежде чем работать со спецификацией (§${s5.guide});`],
  [`\`sheriff settings\`: shows and changes the specification's approval status, its \`strict\` flag and the extensions of the guidelines that the project has chosen (§${s5.settings});`, `\`sheriff settings\` — показывает и меняет статус одобрения спецификации, её флаг \`strict\` и выбранные проектом расширения guidelines (§${s5.settings});`],
  [`\`sheriff untagged\`: lists, by file and symbol, the system's code that has no SpecTag (§${s5.settings});`, `\`sheriff untagged\` — перечисляет по файлам и символам код системы, у которого нет SpecTag (§${s5.settings});`],
  ["`sheriff show`: prints one node, found by its sid or its location (§s-k4nqjr96ux7a5m7);", "`sheriff show` — печатает один узел, найденный по его sid или по расположению (§s-k4nqjr96ux7a5m7);"],
  ["`sheriff export`: writes the readable export of the specification in Markdown (§s-k4nqjr96ux7a5m7);", "`sheriff export` — пишет читаемый экспорт спецификации в Markdown (§s-k4nqjr96ux7a5m7);"],
  ["`sheriff render`: writes the map of the specification's structure (§s-rpv4fkdqqguptqd).", "`sheriff render` — пишет карту структуры спецификации (§s-rpv4fkdqqguptqd)."]
];
const k = "s-f5rz6b7dhxejjts";
const p = drafts[k].proposal;
const intro = p.parts.find((x) => x.en.startsWith("The SpecSheriff tools are run as"));
const calls = p.parts.find((x) => x.en.startsWith("`sheriff` with no command"));
Object.assign(intro, {
  en: "The SpecSheriff tools are run as `sheriff <command>`, with only the following commands. Each command is given with what it is for and the nodes that describe it:",
  ru: "Инструменты SpecSheriff запускаются как `sheriff <команда>` только со следующими командами. У каждой команды сказано, для чего она, и названы узлы, которые её описывают:",
  change: "Новое: узел стал перечнем команд. По вашему замечанию у каждой команды одним предложением сказано, для чего она, чтобы агент сразу понял, какая ему нужна. Всё остальное о `sheriff reindex`, `sheriff types`, `sheriff model`, `sheriff todos` и `sheriff guide` перешло в узлы этого раздела."
});
p.parts = [intro, ...items.map(([en, ru]) => ({ kind: "li", en, ru, change: "Новое: назначение команды одним предложением, по вашему замечанию." })), calls];
p.text = render(p.parts, "en");
p.ruText = render(p.parts, "ru");
p.reason = "A person or an agent who knows what they need to do, or the name of a command, finds here which command does it and where everything the command does is described.";
p.ruReason = "Человек или агент, который знает, что ему нужно сделать, или название команды, находит здесь, какая команда это делает и где описано всё, что она делает.";
p.reasonChange = "Новое: по вашему замечанию узел помогает найти и нужную команду, а не только узел, который её описывает.";
p.removed = p.removed.filter((r) => !r.startsWith("Что `sheriff show` находит узел")).concat(["Что экспорт пишет по файлу на каждый файл спецификации: это перейдёт в узел s-k4nqjr96ux7a5m7, который описывает экспорт."]);
drafts[k].ownerRemarks = [{ date: "2026-11-21", remark: "«может стоит помимо названия комманды и ссылки хотя бы одним предложением описывать ее предназначение? Агент сможет сразу понять что ему нужно»", done: "fix-commands-list-purpose.mjs gave each command in the list one sentence saying what it is for" }];
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// The continuation file and INDEX.md.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["implements rule 2.1 (s-a4rbry4hsu34hy8), and an unknown command ends with exit code 2.", "implements rule 2.1 (s-a4rbry4hsu34hy8), and it says that an unknown command exits with code 2."],
  ["That export node is also to take over two statements of the old node:", "That export node is also to take over two statements from the old node:"],
  ["and what a domain header's status rests on are still open.", "and what a domain header's approval status rests on are still open."],
  ["Any other change of form, such as a RecordType's `fields` becoming its `schema`, makes the node a draft, which `sheriff reindex` names.", "Any other change of a node's form, such as a RecordType's `fields` becoming its `schema`, sets the node to draft, and `sheriff reindex` reports that node."],
  ["  - By a technical replacement, the citations that point to", "  - As a technical replacement, the citations that point to"],
  ["found the list node and \"What `sheriff reindex` writes\" ready once their fixes were made, and fix-commands-a3.mjs made them;", "found the list node and \"What `sheriff reindex` writes\" ready once their fixes were made, and fix-commands-a3.mjs made those fixes;"],
  ["  - the list node is now titled \"The commands that `sheriff` accepts\", and says that `sheriff` runs with only the commands it lists;",
    "  - the list node is now titled \"The commands that `sheriff` accepts\", and says that `sheriff` runs only the commands that the node lists;"],
  ["names each node that it makes a draft, applies that only in the files that the repository keeps, and says how it writes a file; the links pointing at a node of the archive are removed in the node on earlier releases, before the archive is validated;",
    "reports each node that it sets to draft, does this only in the files that the repository keeps, and says how it writes a file; the links pointing at a node of the archive are removed, as the node on earlier releases says, before the archive is validated;"],
  ["the node on earlier releases no longer has an agent approve on an owner's behalf the nodes that a change of form makes drafts:", "the node on earlier releases no longer says that an agent approves, on an owner's behalf, the nodes that a change of form sets to draft:"],
  ["the source `domains` and an empty own list.", "the source of values `domains`, and an empty list of a field's own values."],
  ["  The nodes are shown to the owner in order, the list node first.",
    `  The nodes are shown to the owner in order, the list node first.
- The list node was shown to the owner on 2026-11-21. The owner asked that each command be given at least one sentence saying what it is for, beside its name and its nodes, so that an agent understands at once which command it needs («может стоит помимо названия комманды и ссылки хотя бы одним предложением описывать ее предназначение?»). fix-commands-list-purpose.mjs did so, listing each check command apart, and tools-drafts.before-list-purpose.json keeps the drafts as they were before that script ran. The revised node has now been shown to the owner again, and the owner's answer is to be acted on first.`]
]) t = swap(t, from, to);
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "against the file and the name of a test taken together.", "against a test's file and name combined.");
s = swap(s, "fix-commands-a3.mjs applies the reviewer's second report on that group,", "fix-commands-a3.mjs applies the findings of the reviewer's second report on that group,");
s = swap(s, "gen-tools-node-page.mjs shows a new node of the appendix that is still a draft by its proposed title, found through the sid kept in its draft.",
  "gen-tools-node-page.mjs shows a new node of the appendix of the tools that is still a draft under the title proposed for it, which it finds through the sid stored in the node's draft. fix-commands-list-purpose.mjs gives each command of the list node one sentence saying what it is for, as the owner asked, and tools-drafts.before-list-purpose.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, s);
console.log(p.text + "\n\n" + p.reason + `\n\nupdated at ${now}`);
