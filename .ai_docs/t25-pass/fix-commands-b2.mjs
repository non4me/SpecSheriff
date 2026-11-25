// Corrects the English of the agreed nodes "What `sheriff reindex` changes in what an earlier release wrote" and "Keys
// written twice" as EngStickler's readers proposed, without changing their meaning, and applies EngStickler's
// forty-eighth batch of corrections to the continuation file and INDEX.md. Revises the drafts of the second group of
// "The commands" before specsheriff-rule-reviewer reads them: `sheriff types` runs a project's generator while the rule
// that lists it is approved (s-km4x4s26kv7pjze), and hands it a model built from the last approved wordings; the node on
// `sheriff settings` cites rules by their sids; `sheriff guide` carries the question about the appendix of the tools.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-commands-b2.json", here), JSON.stringify(drafts, null, 2) + "\n");
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const rerender = (p) => { p.text = render(p.parts, "en"); p.ruText = render(p.parts, "ru"); };
const edit = (p, i, pairs, key = "en") => { for (const [a, b] of pairs) p.parts[i][key] = swap(p.parts[i][key], a, b); };
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const L = (en, ru, change) => ({ kind: "li", en, ru, change });

// The English of "What `sheriff reindex` changes in what an earlier release wrote".
const earlier = drafts["new:tools-2-reindex-earlier"];
const e = earlier.proposal;
edit(e, 0, [["differently from its own release", "differently from the release that `sheriff reindex` belongs to"], ["It does so once it has merged the keys written twice", "It does so after it has merged the duplicate keys"]]);
edit(e, 4, [["which holds an email, becomes `owners`, which holds a list that holds that email", "which holds an email address, becomes `owners`, which holds a list that contains that email address"]]);
edit(e, 5, [["whose schema is the one that the field's neutral type gives", "whose schema is the one given for the field's neutral type"], ["is named in the schema's `required`", "is listed in the schema's `required`"], ["a field required \"where it holds a value\"", "a field that is required only \"where it holds a value\""]]);
edit(e, 7, [["where it points into a JSON Schema", "where it points to a place in a JSON Schema"]]);
edit(e, 10, [["every link pointing at it", "every link that points to it"]]);
edit(e, 11, [["A kind of node is renamed also where", "A kind of node is also renamed where"], ["sets `fields` for that kind", "declares `fields` for that kind"]]);
edit(e, 12, [["a word in the form of a sid that stands in one of these places", "a word that has the form of a sid and occurs in one of these places"]]);
edit(e, 13, [["followed by a space or the name's end", "followed by a space or by the end of the name"]]);
edit(e, 16, [["the key `owner` of each of its lines becomes `by`", "the key `owner` in each of its lines becomes `by`"]]);
edit(e, 17, [["the lines of `specs/_confirmations.jsonl` are appended to it", "the lines of `specs/_confirmations.jsonl`, with that key renamed, are appended to it"]]);
edit(e, 18, [["gives way to an entry that approves the specification", "is replaced by an entry that approves the specification"]]);
edit(e, 20, [["that rule goes to the archive", "that rule is moved to the archive"]]);
edit(e, 22, [["`@spec ` is put before each bare sid", "`@spec ` is inserted before each bare sid"]]);
edit(e, 23, [["leaves in its earlier form a RecordType that holds a field of the type `variant`, a field whose values came from", "leaves unchanged a RecordType that holds a field of type `variant`, a field whose values come from"]]);
edit(e, 24, [["the project is still to choose that extension", "the project has yet to choose that extension"]]);
edit(e, 25, [["leave a node's fingerprint as it was", "leave a node's fingerprint unchanged"], ["in this way, the files of the specification included", "in this way, including the files of the specification"]]);
edit(e, 17, [["строки `specs/_confirmations.jsonl` дописываются в него", "строки `specs/_confirmations.jsonl`, с переименованным ключом, дописываются в него"]], "ru");
rerender(e);
e.reason = "Each file and each test of a project is written in the form of the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them differently rewrites them, so that nobody has to rewrite a project by hand and no approval is lost because of a rename.";
earlier.englishRead = "EngStickler's reader, 2026-11-21: the English corrected without changing its meaning by fix-commands-b2.mjs; \"until\" kept, since `sheriff reindex` itself writes the entry that ends the condition";

// The English of "Keys written twice".
const twice = drafts["new:tools-2-reindex-twice"];
const k = twice.proposal;
k.title = "Keys written more than once";
k.ruTitle = "Ключи, записанные больше одного раза";
k.parts[0].en = "`sheriff reindex` merges the values that an object holds under a key written more than once, known as a duplicate key, folding each value into the values written before it. It does so in every file of the specification and of its archive, and in the project's extension of the schema, `specs/_schema/project.schema.json` (§s-xm8rz4uupb73gu5), before it makes any other change. Two values are merged as follows:";
k.parts[0].ru = "`sheriff reindex` объединяет значения, которые объект хранит под ключом, записанным больше одного раза (такой ключ называют duplicate key), сливая каждое значение со значениями, записанными до него. Он делает это в каждом файле спецификации и её архива и в расширении схемы проекта, `specs/_schema/project.schema.json` (§s-xm8rz4uupb73gu5), прежде чем вносить любое другое изменение. Два значения объединяются так:";
k.parts[2].en = "two objects are merged key by key, the values under each key by these same rules, and each key stays where it was first written;";
k.parts[2].ru = "два объекта объединяются по ключам, значения под каждым ключом — по этим же правилам, и каждый ключ остаётся там, где был записан впервые;";
edit(k, 3, [["that JSON Schema holds equal", "that JSON Schema treats as equal"]]);
k.parts[4].en = "`sheriff reindex` names every key whose values it merged, with the file and the line number of each value. It refuses any other pair of values under one key, naming the file, the key, and the line number and the value of each. Where it refuses a pair, it writes no file.";
k.parts[4].ru = "`sheriff reindex` называет каждый ключ, значения которого он объединил, с файлом и номером строки каждого значения. Любую другую пару значений под одним ключом он отвергает, называя файл, ключ, номер строки и значение каждого. Если он отверг пару, он не пишет ни одного файла.";
rerender(k);
k.reason = "`sheriff reindex` rewrites in full the files written by hand, so it keeps everything they hold. Each of two values written under one key expresses somebody's intent. They are kept together where both can be kept. They are refused where keeping one would drop the other, since nothing says which was meant. Every merge is named, because one of the two values may have been written to replace the other.";
k.examples[0].en = "A node holds `\"refs\": [A]` and, further down, `\"refs\": [B, A]`: `sheriff reindex` writes `\"refs\": [A, B]` and names `refs` with the line numbers of both values. `sheriff reindex` refuses a node that holds `\"title\": \"X\"` and `\"title\": \"Y\"`, and writes no file.";
twice.englishRead = "EngStickler's reader, 2026-11-21: the English corrected without changing its meaning by fix-commands-b2.mjs; the title now says \"more than once\", as the text always meant; \"new to the first\" kept, since it states the condition positively";
edit(e, 0, [["(§s-w5wg69pvvhedsws)", "(§s-w5wg69pvvhedsws)"]]);
rerender(e);

// `sheriff types`.
const types = drafts["new:tools-2-types"].proposal;
const relies = types.parts.findIndex((x) => x.en.startsWith("A RecordType relies on"));
types.parts[relies] = P(
  "A RecordType relies on each RecordType that it refines or that one of its fields refers to, and on each node from which values are gathered for one of its fields. A file that a project's generator prints relies on each node that the generator names as a source of that file.",
  "RecordType опирается на каждый RecordType, который он уточняет или на который ссылается одно из его полей, и на каждый узел, из которого собираются значения для одного из его полей. Файл, который печатает генератор проекта, опирается на каждый узел, который генератор называет источником этого файла.",
  "Новое: правило 10.15 говорит «опирается», но не говорит, на что опирается RecordType. Это моё предложение.");
types.parts.splice(relies + 1, 0, P(
  "`sheriff types` runs a project's generator while the rule that lists the generator is approved. While that rule is a draft, the files that the generator printed stay as they are (§s-km4x4s26kv7pjze).",
  "`sheriff types` запускает генератор проекта, пока правило, которое перечисляет этот генератор, одобрено. Пока это правило — черновик, файлы, которые генератор напечатал, остаются как есть (§s-km4x4s26kv7pjze).",
  "Как требует правило 10.9; сейчас код ждёт и этого правила, и каждого узла, который называет генератор."));
const gen = types.parts.findIndex((x) => x.en.startsWith("A project's generator is run by"));
types.parts[gen] = P(
  `A project's generator is run by the command that \`sheriff.config.json\` names for it. On its standard input it is handed the model of the specification in the form that \`sheriff json\` prints (§${drafts["commands:sids"].model}), built from the last approved wording of each node and holding only the nodes that code may be generated from. It prints as JSON a list that gives, for each file, its path, its content, and the sids of the nodes that the file is written from.`,
  `Генератор проекта запускается командой, которую для него называет \`sheriff.config.json\`. На стандартный вход ему передаётся модель спецификации в том виде, в каком её печатает \`sheriff json\` (§${drafts["commands:sids"].model}), но построенная из последней одобренной формулировки каждого узла и содержащая только те узлы, из которых можно порождать код. Он печатает в JSON список, который для каждого файла даёт его путь, содержимое и sid узлов, из которых файл написан.`,
  "Как было; новое — модель из последних одобренных формулировок, без узлов, из которых ничего не порождается: иначе генератор мог бы реализовать неодобренное.");
rerender(types);
types.refs = types.refs.filter((r) => !(r.type === "cites" && r.to === "s-km4x4s26kv7pjze"));

// `sheriff json`.
const json = drafts["new:tools-2-json"].proposal;
edit(json, 0, [["prints as JSON the model of the specification where it runs", "prints as JSON the model of the specification of the repository where it runs"]]);
rerender(json);

// `sheriff todos`.
const todos = drafts["new:tools-2-todos"].proposal;
todos.parts[1].en = "The items are listed newest first, and the items of one day in the order in which the specification reads. Each item is printed with its date, its author, what is to be done, and the sid, the location and the title of its node.";
rerender(todos);

// `sheriff guide`.
const guide = drafts["new:tools-2-guide"];
guide.proposal.title = "The guidelines that a project follows, printed in one place";
guide.proposal.ruTitle = "Guidelines, которым следует проект, напечатанные в одном месте";
const other = guide.proposal.parts.findIndex((x) => x.en.startsWith("For each other extension"));
guide.proposal.parts[other].en = "For each other extension that the plugin delivers, it prints the extension's name and what the extension is for. It leaves out the appendix of the tools, since that appendix is no part of the guidelines (§s-a4rbry4hsu34hy8).";
rerender(guide.proposal);
guide.doubt = "The plan that the owner agreed to leaves the appendix of the tools out of `sheriff guide`. The skill `spec` tells an agent to read what `sheriff guide` prints before anything else, and the syntax of the SpecTag and the commands are described only in the appendix of the tools. To be put to the owner with the node: whether `sheriff guide` also prints the appendix after the guidelines, named as no part of them.";

// `sheriff settings` and `sheriff untagged`.
const settings = drafts["new:tools-2-settings"].proposal;
settings.parts = [
  P("`sheriff settings` shows and changes the settings that only an owner of the specification changes: the specification's approval status (§s-qzthyh7yqvfhsa2), its `strict` flag (§s-q3pfzyaxvpr2zj2), and the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g).",
    "`sheriff settings` показывает и меняет настройки, которые меняет только ответственный за спецификацию: статус одобрения спецификации (§s-qzthyh7yqvfhsa2), её флаг `strict` (§s-q3pfzyaxvpr2zj2) и выбранные проектом расширения guidelines (§s-9ttvcwpqkehm58g).",
    "Новое: по вашему решению от 18 ноября эти настройки меняет программа в терминале."),
  P("Run in a terminal with no arguments, it shows these settings and every extension that the plugin delivers, and lets the person who runs it change each of them. Run elsewhere with no arguments, it prints them. Run with one of the following arguments, it makes that one change:",
    "Запущенная в терминале без аргументов, она показывает эти настройки и каждое расширение, которое поставляет плагин, и даёт тому, кто её запустил, изменить каждую из них. Запущенная без аргументов не в терминале, она их печатает. Запущенная с одним из следующих аргументов, она делает только это изменение:",
    "Новое. Печать без терминала — чтобы агент мог прочитать настройки."),
  L("`approve` or `draft`, for the specification's approval status;", "`approve` или `draft` — для статуса одобрения спецификации;", "Новое."),
  L("`strict on` or `strict off`, for the `strict` flag;", "`strict on` или `strict off` — для флага `strict`;", "Новое."),
  L("`extension <name> on` or `extension <name> off`, for the choice of an extension.", "`extension <имя> on` или `extension <имя> off` — для выбора расширения.", "Новое."),
  P("It records each change as an entry in `sheriff.config.json` that names the person who made the change, as git identifies that person. It records a change only when that person is an owner of the specification (§s-6sk8uet75dmq5qz), and refuses it otherwise.",
    "Каждое изменение она записывает в `sheriff.config.json` записью, которая называет того, кто сделал изменение, — так, как его определяет git. Она записывает изменение, только если этот человек — ответственный за спецификацию (§s-6sk8uet75dmq5qz), а иначе отвергает его.",
    "Новое: так требуют правила 10.6, 10.7 и 1.7.5."),
  P("Before it records an approval of the specification, it runs the checks that the rule on the specification's approval status names, and shows what they find. Where they find anything, it records the approval only after the owner confirms it (§s-qzthyh7yqvfhsa2).",
    "Прежде чем записать одобрение спецификации, она запускает проверки, которые называет правило о статусе одобрения спецификации, и показывает, что они нашли. Если они что-то нашли, она записывает одобрение только после того, как ответственный его подтвердит (§s-qzthyh7yqvfhsa2).",
    "Новое: так требует правило 10.6."),
  P("It refuses to turn the `strict` flag on, and to record an approval while that flag is on, in the cases that the rule on that flag names (§s-q3pfzyaxvpr2zj2). Each such refusal names, for each check that would refuse, the command that lists what that check finds: `sheriff untagged` for the check of the system's code that carries no SpecTag, and, for a project's own check, the command that the settings name for that check (§s-7pk89t8z6wymmj9).",
    "Включить флаг `strict` и записать одобрение, пока этот флаг включён, она отказывается в тех случаях, которые называет правило об этом флаге (§s-q3pfzyaxvpr2zj2). Каждый такой отказ называет для каждой проверки, которая отвергла бы изменение, команду, перечисляющую то, что эта проверка находит: `sheriff untagged` — для проверки кода системы без SpecTag, а для собственной проверки проекта — команду, которую для неё называют настройки (§s-7pk89t8z6wymmj9).",
    "Новое: так требует правило 10.7."),
  P("It refuses to withdraw the choice of an extension while a node depends on that extension, and names each such node (§s-j8y62pa9hzz6nwx).",
    "Отказаться от выбранного расширения она не даёт, пока от него зависит какой-либо узел, и называет каждый такой узел (§s-j8y62pa9hzz6nwx).",
    "Новое: так требует правило 1.7.6."),
  P("`sheriff untagged` lists, by file and symbol, the system's code that carries no SpecTag. It is the command that the warning and the refusal about such code name (§s-kkbqcb9xrpaepwn).",
    "`sheriff untagged` перечисляет по файлам и символам код системы, у которого нет SpecTag. Это та команда, которую называют предупреждение и отказ об этом коде (§s-kkbqcb9xrpaepwn).",
    "Новое: правила 9.5 и 10.7 требуют команду, которая перечисляет код без SpecTag. Сейчас такой команды нет.")
];
rerender(settings);
settings.refs = [...settings.refs.filter((r) => r.to !== "s-2fau85dfyyeq66m"), { type: "cites", to: "s-7pk89t8z6wymmj9" }];
drafts["new:tools-2-settings"].doubt = "Rule 10.7 lets a rule of an extension, or of a project's own guidelines, make one of the shared checks stricter; no such rule exists yet, so the node names no command for such a check.";
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
for (const [name, p] of [["earlier", e], ["twice", k]]) {
  fs.writeFileSync(new URL(`english-reindex-${name}.md`, here), [
    `# "${p.title}", a new node of the appendix of the tools, agreed on 2026-11-21`, "",
    "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, "", ...(p.examples ? ["## Example", "", p.examples[0].en, ""] : [])
  ].join("\n"));
}

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["and `sheriff reindex` leaves unchanged, as an earlier release wrote it, a RecordType that holds a field of the type `variant`, a field whose values came from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field for its author to rewrite.",
    "and `sheriff reindex` leaves unchanged a RecordType written by an earlier release that holds a field of type `variant`, a field whose values come from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field, so that the RecordType's author can rewrite them."],
  ["- On 2026-11-21 the owner agreed to that node («ок»). agree-reindex-earlier.mjs", "- On 2026-11-21 the owner agreed to the wording of that node («ок»). agree-reindex-earlier.mjs"],
  ["It now also merges the keys written twice in `specs/_schema/project.schema.json`", "The node now also has `sheriff reindex` merge the keys written twice in `specs/_schema/project.schema.json`"],
  ["The first group is thus agreed, and the agent is drafting the second group: `sheriff types`, `sheriff json`, `sheriff todos`, `sheriff guide`, and `sheriff settings` with `sheriff untagged`. Stage 1 was",
    `The first group is thus agreed.
- fix-commands-b2.mjs corrected the English of the agreed nodes "What \`sheriff reindex\` changes in what an earlier release wrote" and "Keys written twice" as EngStickler's readers proposed, without changing their meaning; the second node is now titled "Keys written more than once", as its text always meant. tools-drafts.before-commands-b2.json keeps the drafts as they were before that script ran.
- propose-commands-b.mjs drafted the nodes of the second group, which describe \`sheriff types\`, \`sheriff json\`, \`sheriff todos\`, \`sheriff guide\`, and \`sheriff settings\` together with \`sheriff untagged\`; tools-drafts.before-commands-b.json keeps the drafts as they were before that script ran. fix-commands-b2.mjs then revised them: \`sheriff types\` runs a project's generator while the rule that lists it is approved, and hands it a model built from the last approved wordings; the node on \`sheriff settings\` cites rules by their sids. The drafts are now with specsheriff-rule-reviewer. After its report, the nodes are shown to the owner one at a time, starting with the node on \`sheriff types\`. The node on \`sheriff guide\` is shown with a question: the plan that the owner agreed to leaves the appendix of the tools out of \`sheriff guide\`, while the syntax of the SpecTag and the commands are described only there.

Stage 1 was`]
]) t = swap(t, from, to);
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "writes the owner's ruling on the four cases of a RecordType as an earlier release wrote it into the node \"What `sheriff reindex` changes in what an earlier release wrote\",",
  "writes into the node \"What `sheriff reindex` changes in what an earlier release wrote\" the owner's ruling on the four cases of a RecordType written by an earlier release,");
s = swap(s, "and has \"Keys written twice\" also merge in the project's extension of the schema;", "and makes the node \"Keys written twice\" cover the project's extension of the schema as well;");
s = swap(s, "tools-drafts.before-agree-reindex-twice.json is tools-drafts.json as it was before that script ran.",
  "tools-drafts.before-agree-reindex-twice.json is tools-drafts.json as it was before that script ran. propose-commands-b.mjs drafts the nodes of the second group of \"The commands\" (tools-drafts.before-commands-b.json is tools-drafts.json before it ran), and fix-commands-b2.mjs revises them and corrects the English of two agreed nodes (tools-drafts.before-commands-b2.json is tools-drafts.json before it ran).");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● вторая группа: пишутся черновики sheriff types, json, todos, guide, settings и untagged",
  "- ● вторая группа: черновики sheriff types, json, todos, guide, settings и untagged у рецензента");
fs.writeFileSync(outline, o);
for (const key of ["new:tools-2-types", "new:tools-2-json", "new:tools-2-todos", "new:tools-2-guide", "new:tools-2-settings"]) console.log(`===== ${key}\n${drafts[key].proposal.title}\n${drafts[key].proposal.text}\nREASON: ${drafts[key].proposal.reason}\n`);
console.log(`updated at ${now}`);
