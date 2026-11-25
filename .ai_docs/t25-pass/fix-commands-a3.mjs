// Applies the second review of the first group of the nodes that replace "The commands": the list node and the node on
// what `sheriff reindex` writes pass once their fixes are made; the node on earlier releases loses the agent's approval
// on an owner's behalf and the reason in its text, takes the reviewer's wording for the approval rule and the archive,
// and states the mapping of a RecordType's fields to JSON Schema from tools 18 and 20, with the cases that have no target
// left to the owner. Applies EngStickler's thirty-ninth batch of corrections to the continuation file and INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-commands-a3.json", here), JSON.stringify(drafts, null, 2) + "\n");
const sids = drafts["commands:sids"];
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const finish = (key) => {
  const p = drafts[key].proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
};
const partOf = (key, start) => {
  const x = drafts[key].proposal.parts.find((y) => y.en.startsWith(start));
  if (!x) throw new Error(`${key}: no part starts with: ${start}`);
  return x;
};

// 1. The list node.
{
  const k = "s-f5rz6b7dhxejjts";
  const p = drafts[k].proposal;
  p.title = "The commands that `sheriff` accepts";
  p.ruTitle = "Команды, которые принимает `sheriff`";
  p.titleChange = "Было: «The commands». Узел стал первым из девяти узлов раздела «The commands»: он перечисляет команды, которые принимает `sheriff`, и говорит, как `sheriff` отвечает на вызов без команды или с неизвестной командой.";
  Object.assign(partOf(k, "The SpecSheriff tools are run as"), {
    en: "The SpecSheriff tools are run as `sheriff <command>`, with only the following commands. The nodes named beside each command describe it:",
    ru: "Инструменты SpecSheriff запускаются как `sheriff <команда>` только со следующими командами. Каждую команду описывают узлы, названные рядом с ней:" });
  partOf(k, "`sheriff validate`, `sheriff binding`").change = "Было: «`sheriff validate`, `sheriff binding`, `sheriff citations`, `sheriff guard`, `sheriff message` и `sheriff review` выполняют проверки так, как их описывают правила §s-4kd2pave7vm4hmd». Теперь только ссылка на узел, который описывает эти команды.";
  partOf(k, "`sheriff init` and `sheriff remove`").change = "Было: «`sheriff init` готовит репозиторий для инструментов SpecSheriff (§s-7unxytshhc4md54). `sheriff remove` убирает из него SpecSheriff (§s-7unxytshhc4md54)». Теперь только ссылка на узел, который описывает обе команды.";
  partOf(k, "`sheriff approve`").change = "Было: «`sheriff approve` записывает одобрение или его отзыв (§s-v4qus7raqnwzneb)». Теперь только ссылка на узел, который описывает команду.";
  partOf(k, "`sheriff render`").change = "Было: «`sheriff render` пишет карту — mindmap структуры спецификации, нарисованную по её узлам (§s-rpv4fkdqqguptqd)». Теперь только ссылка на узел, который описывает команду.";
  finish(k);
  p.reviewed = "specsheriff-rule-reviewer, 2026-11-21: passed on its second report, once fix-commands-a3.mjs applied its fixes";
}

// 2. What `sheriff reindex` writes.
{
  const k = "new:tools-2-reindex-writes";
  const p = drafts[k].proposal;
  Object.assign(partOf(k, "the links pointing at each node"), {
    en: "the links pointing at each node, rebuilt from the links that the nodes declare (§s-bpdqd9v72wg7vsz);",
    ru: "связи, указывающие на каждый узел, заново построенные из связей, которые объявляют узлы (§s-bpdqd9v72wg7vsz);",
    change: "Как было. Что у узла архива таких связей нет, говорит узел о записанном прежним выпуском: связи снимаются там до проверки архива." });
  Object.assign(partOf(k, "An approved node whose approval status"), {
    en: "In the files that the repository keeps, an approved node whose approval status is set by approvals stays approved while an approval stands for its current wording (§s-v4qus7raqnwzneb). `sheriff reindex` makes every other such node a draft and names it.",
    ru: "В файлах, которые хранит репозиторий, одобренный узел, статус одобрения которого задаётся одобрениями, остаётся одобренным, пока для его нынешней формулировки в силе одобрение (§s-v4qus7raqnwzneb). Любой другой такой узел `sheriff reindex` делает черновиком и называет." });
  const last = partOf(k, "`sheriff reindex` writes only the files");
  Object.assign(last, {
    en: "`sheriff reindex` writes only the files that the repository keeps. It writes a file only where the text it would write differs from the file's text. It names each file that it writes.",
    ru: "`sheriff reindex` пишет только файлы, которые хранит репозиторий. Файл он пишет, только если текст, который он записал бы, отличается от текста файла. Он называет каждый файл, который пишет." });
  const i = p.parts.indexOf(last);
  p.parts.splice(i + 1, 0, {
    kind: "p",
    en: "It writes each file as `JSON.stringify` writes the file's data with an indent of two spaces, followed by a line feed, with each node's `location` and `sid` first and every other key where the file holds it.",
    ru: "Каждый файл он пишет так, как `JSON.stringify` пишет данные файла с отступом в два пробела и переводом строки в конце, ставя `location` и `sid` каждого узла первыми, а каждый другой ключ — там, где его хранит файл.",
    change: "Новое в тексте: код уже так пишет файлы, и тест узла это проверяет." });
  finish(k);
  drafts[k].testsFrom = ["sheriff reindex rewrites the files it changed", "gives a sid to a node that has none"];
  p.reviewed = "specsheriff-rule-reviewer, 2026-11-21: passed on its second report, once fix-commands-a3.mjs applied its fixes";
}

// 3. What `sheriff reindex` changes in what an earlier release wrote.
{
  const k = "new:tools-2-reindex-earlier";
  const p = drafts[k].proposal;
  const rt = partOf(k, "a RecordType's `fields` and `unknown` become its `schema`");
  const at = p.parts.indexOf(rt);
  p.parts.splice(at, 1,
    { kind: "li", en: "a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), as follows: each field becomes a property whose schema is the one that the field's neutral type gives (§s-4npdup7mjkva69y); the field's `text` becomes the property's `description`; each field that the RecordType marks as required is named in the schema's `required`; and `unknown: \"refused\"` becomes `additionalProperties: false`;",
      ru: "`fields` и `unknown` у RecordType становятся его `schema` (§s-6eb92ddch7shuvu) так: каждое поле становится свойством со схемой, которую даёт нейтральный тип поля (§s-4npdup7mjkva69y); `text` поля становится `description` свойства; каждое поле, которое RecordType отмечает обязательным, называется в `required` схемы; а `unknown: \"refused\"` становится `additionalProperties: false`;",
      change: "Новое: по вашему решению от 19 ноября RecordType описывается JSON Schema 2020-12. Соответствие взято из узлов о нейтральных типах (tools 20) и о том, что порождает RecordType (tools 18). Для четырёх случаев соответствия нет: поле типа `variant`, обязательность «где в нём есть значение», источник `domains` и пустой собственный список. Это вопрос к вам." });
  Object.assign(partOf(k, "a node of the archive loses its sid"), {
    en: "a node of the archive loses its sid and every link pointing at it (§s-f2b5zvc565s242f, §s-bpdqd9v72wg7vsz).",
    ru: "узел архива теряет свой sid и все связи, указывающие на него (§s-f2b5zvc565s242f, §s-bpdqd9v72wg7vsz).",
    change: "Новое: у узла архива нет sid и нет связей, указывающих на него. Связи снимаются здесь, до проверки архива по его схеме." });
  const ruleItem = partOf(k, "until `sheriff.config.json` holds an entry");
  const ri = p.parts.indexOf(ruleItem);
  p.parts.splice(ri, 2,
    { kind: "li", en: "until `sheriff.config.json` holds an entry that sets the specification's approval status, an approved rule of `project.json` that refines the rule on that status (§s-qzthyh7yqvfhsa2) gives way to an entry that approves the specification;",
      ru: "пока в `sheriff.config.json` нет записи, задающей статус одобрения спецификации, одобренное правило `project.json`, которое уточняет правило об этом статусе (§s-qzthyh7yqvfhsa2), уступает место записи, которая одобряет спецификацию;",
      change: "Новое: по согласованному правилу 10.6 статус одобрения спецификации хранят записи. Так проект, одобренный прежним способом, сохраняет свой статус. Перенос идёт только пока записи нет, иначе каждый запуск отправлял бы в архив правило, которое проект написал позже." },
    { kind: "li", en: "that entry names the owner who last approved that rule;", ru: "эта запись называет ответственного, который последним одобрил это правило;", change: "Новое." },
    { kind: "li", en: "that rule goes to the archive (§s-f2b5zvc565s242f), with the reason \"Replaced by the entry in `sheriff.config.json` that records the specification's approval status\";",
      ru: "это правило уходит в архив (§s-f2b5zvc565s242f) с причиной \"Replaced by the entry in `sheriff.config.json` that records the specification's approval status\";",
      change: "Новое: строка 10.1.11 требует, чтобы удалённый одобренный узел попал в архив. Причину инструменты пишут по-английски." });
  Object.assign(partOf(k, "Where a node of the specification is of a kind"), {
    en: "Where a node of the specification is of a kind, or holds a link of a type, that an extension of the guidelines adds, and the project is still to choose that extension (§s-9ttvcwpqkehm58g), `sheriff reindex` names that extension.",
    ru: "Если узел спецификации — того типа или со связью того типа, которые добавляет расширение guidelines, а проекту ещё предстоит выбрать это расширение (§s-9ttvcwpqkehm58g), `sheriff reindex` называет это расширение." });
  Object.assign(partOf(k, "A renamed key and a renamed kind of node"), {
    en: "A renamed key and a renamed kind of node leave a node's fingerprint as it was (§s-v4qus7raqnwzneb). `sheriff reindex` names each file that it changes in this way, the files of the specification included.",
    ru: "Переименованный ключ и переименованный тип узла оставляют отпечаток узла прежним (§s-v4qus7raqnwzneb). `sheriff reindex` называет каждый файл, который так меняет, в том числе файлы спецификации.",
    change: "Новое. Отпечаток сохраняется только при переименованиях, как уже делает код. Узел, который любое другое из этих изменений делает черновиком, называет `sheriff reindex` (узел «Что пишет `sheriff reindex`»), а одобряет его ответственный или агент от его имени, если смысл не изменился (правило 1.3.6). Новое: называются и файлы спецификации, в которых переименованы тесты; сейчас они не называются." });
  finish(k);
  p.reason = "Each file and each test of a project follows the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them differently rewrites them itself, so that nobody rewrites a project by hand and no approval is lost to a rename.";
  p.ruReason = "Каждый файл и каждый тест проекта следует выпуску инструментов SpecSheriff, который последним его записал или прочитал. Выпуск, который пишет или читает их иначе, переписывает их сам, чтобы никто не переписывал проект вручную и ни одно одобрение не терялось из-за переименования.";
  p.refs = p.refs.filter((r) => r.to !== "s-t5uw8zfxzhfdg86").concat([{ type: "cites", to: "s-4npdup7mjkva69y" }, { type: "cites", to: "s-bpdqd9v72wg7vsz" }]);
  drafts[k].testsFrom = [...drafts[k].testsFrom, "adds to the project's own guidelines the rule approving the specification"];
  drafts[k].doubt = "Four cases of an earlier RecordType have no target in JSON Schema: a field of the type `variant`, a field required \"where it holds a value\", a field whose values come from the source `domains`, and a field whose own list is empty. The owner is to rule whether `sheriff reindex` maps them, and how, or names each such RecordType for its author to rewrite.";
  p.reviewed = "specsheriff-rule-reviewer, 2026-11-21: the second report found the node not ready only because of the RecordType items; fix-commands-a3.mjs applied the other fixes";
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// The continuation file and INDEX.md: EngStickler's thirty-ninth batch, and the state.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["Stage 1 was part of that same step, which the owner told the agent to start on 2026-11-20 («начинай») after seeing the plan at", "Stage 1 was part of the step that changes the SpecSheriff tools, which the owner told the agent to start on 2026-11-20 («начинай») after the owner saw the plan at"],
  ["specsheriff-rule-reviewer's first report passed \"Keys written twice\" once its fixes were made, and found the other three not ready. fix-commands-a2.mjs applied the report,",
    "specsheriff-rule-reviewer's first report found \"Keys written twice\" ready once the fixes it asked for were made, and found the other three not ready. fix-commands-a2.mjs applied the findings of the report,"],
  ["and an unknown command ends with the exit code 2. Its paragraph saying that `sheriff export` and `sheriff render` write only where the Views extension is chosen was taken out. Whether they do so, and whether the hooks then run them only there, is to be settled with \"The hooks\" (s-477gtdrkw34dzxw) and the nodes on the export and the map (s-k4nqjr96ux7a5m7, s-rpv4fkdqqguptqd).",
    "and an unknown command ends with exit code 2. Its paragraph saying that `sheriff export` and `sheriff render` write files only in a project that has chosen the Views extension was removed. Whether they do so, and whether the hooks then run them only in such a project, is to be settled when \"The hooks\" (s-477gtdrkw34dzxw) and the nodes on the export and the map (s-k4nqjr96ux7a5m7, s-rpv4fkdqqguptqd) are reviewed."],
  ["an approved node stays approved while an approval stands for its current wording (s-v4qus7raqnwzneb), which keeps the meaning of the approved node.",
    "an approved node stays approved while an approval recorded for its current wording stands (s-v4qus7raqnwzneb), as the approved node said."],
  ["since an edit to code or tests alone must also rebuild those lists.", "since the hooks must also rebuild those lists after an edit to code or tests alone."],
  ["  - In the node on what an earlier release wrote, a renamed key or kind keeps a node's fingerprint. Any other change of form, such as a RecordType's `fields` becoming its `schema`, makes the node a draft: `sheriff reindex` names it, and an agent approves it on an owner's behalf as a change that alters no meaning (s-t5uw8zfxzhfdg86). This choice is to be put to the owner with the node. The rule approving the specification migrates only until `sheriff.config.json` holds an entry for the specification's approval status.",
    "  - In the node on what an earlier release wrote, a renamed key or kind keeps a node's fingerprint. Any other change of form, such as a RecordType's `fields` becoming its `schema`, makes the node a draft, which `sheriff reindex` names. The rule that set the specification's approval status is migrated only while `sheriff.config.json` holds no entry for that status."],
  ["  - As a technical replacement, the citations of s-f5rz6b7dhxejjts in the agreed drafts", "  - By a technical replacement, the citations that point to s-f5rz6b7dhxejjts in the agreed drafts"],
  ["now point to the node on earlier releases. The current nodes s-95w92rnjuv3sst8, s-j9r8z4xdrfkfs47, s-utf4mbt7ref8g9c and s-dbk2vyeg8z5jxna are to be retargeted in the same way when they are reviewed.",
    "were changed to point to the node on earlier releases. The citations in the current nodes s-95w92rnjuv3sst8, s-j9r8z4xdrfkfs47, s-utf4mbt7ref8g9c and s-dbk2vyeg8z5jxna are to be retargeted in the same way when those nodes are reviewed."],
  ["  specsheriff-rule-reviewer is reviewing the three revised drafts again.",
    `  specsheriff-rule-reviewer's second report found the list node and "What \`sheriff reindex\` writes" ready once their fixes were made, and fix-commands-a3.mjs made them; tools-drafts.before-commands-a3.json keeps the drafts as they were before that script ran:
  - the list node is now titled "The commands that \`sheriff\` accepts", and says that \`sheriff\` runs with only the commands it lists;
  - "What \`sheriff reindex\` writes" names each node that it makes a draft, applies that only in the files that the repository keeps, and says how it writes a file; the links pointing at a node of the archive are removed in the node on earlier releases, before the archive is validated;
  - the node on earlier releases no longer has an agent approve on an owner's behalf the nodes that a change of form makes drafts: rule 1.3.6 already says who approves them. It now maps a RecordType's fields to JSON Schema from tools 18 and 20. Four earlier cases have no target: a field of the type \`variant\`, a field required "where it holds a value", the source \`domains\` and an empty own list. They are to be put to the owner with the node.
  The nodes are shown to the owner in order, the list node first.`]
]) t = swap(t, from, to);
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "fix-commands-a2.mjs applies the reviewer's first report on that group and retargets the citations of \"The commands\" in three agreed drafts;",
  "fix-commands-a2.mjs applies the findings of the reviewer's first report on that group and retargets the citations that point to \"The commands\" in three agreed drafts;");
s = swap(s, "gen-tools-node-page.mjs matches each entry of a draft's `testsFrom` against a test's file and name together.",
  "gen-tools-node-page.mjs matches each entry of a draft's `testsFrom` against the file and the name of a test taken together. fix-commands-a3.mjs applies the reviewer's second report on that group, and tools-drafts.before-commands-a3.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, s);
console.log(`updated at ${now}`);
for (const k of ["s-f5rz6b7dhxejjts"]) console.log(drafts[k].proposal.text + "\n\n" + drafts[k].proposal.reason);
