// Applies the findings of specsheriff-rule-reviewer's second report on the nodes on `sheriff types`, on running a
// project's generator, on `sheriff settings` and on `sheriff untagged`. Corrects the English of the agreed node on
// `sheriff guide` as EngStickler's reader proposed, without changing its meaning, and applies EngStickler's
// fifty-third batch of corrections to the continuation file. Updates the continuation file, INDEX.md and the outline.
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
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const L = (en, ru, change) => ({ kind: "li", en, ru, change });
const sids = drafts["commands:sids"];
const review2 = "specsheriff-rule-reviewer's second report, 2026-11-22";

// `sheriff types`.
const types = drafts["new:tools-2-types"];
const tp = types.proposal;
const keep = (start) => { const x = tp.parts.find((y) => y.en.startsWith(start)); if (!x) throw new Error(`types: ${start}`); return x; };
tp.parts = [
  P("`sheriff types` generates the parts of the system's code (§s-hheus6f395ynqvc) that come from the nodes, from the last approved wording of each node (§s-qyjw8xez6t6adc3):",
    "`sheriff types` порождает те части кода системы (§s-hheus6f395ynqvc), которые получаются из узлов, — из последней одобренной формулировки каждого узла (§s-qyjw8xez6t6adc3):",
    "Из узла «The commands»; новое — код порождается из последних одобренных формулировок, как требует правило 10.15. Сейчас `sheriff types` ждёт, пока одобрят каждый узел, и одна черновая RecordType задерживает все файлы."),
  keep("from the RecordTypes"),
  keep("the files that each of the project's own code generators prints"),
  P("The last approved wording of a node is the wording whose fingerprint the node's last approval records (§s-v4qus7raqnwzneb). `sheriff types` takes that wording from the files of the specification where they hold it. Otherwise it takes the wording from the latest commit on the current branch whose files hold it, read in the form to which `sheriff reindex` would rewrite it (§s-gb8s9657a65hqmv).",
    "Последняя одобренная формулировка узла — та, чей отпечаток записан в последнем одобрении узла (§s-v4qus7raqnwzneb). `sheriff types` берёт эту формулировку из файлов спецификации, если она там есть. Иначе он берёт её из последнего коммита текущей ветки, в файлах которого она есть, прочитав её в том виде, в который её переписал бы `sheriff reindex` (§s-gb8s9657a65hqmv).",
    "Новое: одобрение хранит только отпечаток формулировки, поэтому саму формулировку инструменты ищут в истории git. Формулировку из истории мог записать прежний выпуск, поэтому она читается в нынешнем виде."),
  P("Where neither holds that wording, `sheriff types` names the node and takes the latest wording that an approval of the node records and that the files or the current branch hold. Where there is none, it treats the node as never approved.",
    "Если этой формулировки нет ни там, ни там, `sheriff types` называет узел и берёт самую позднюю формулировку, которую записывает одобрение узла и которая есть в файлах или в текущей ветке. Если такой нет, он считает узел ни разу не одобренным.",
    "Новое, предложено рецензентом: так бывает, если одобрение записано, а узел изменён до коммита, или если коммит потерян при squash или rebase."),
  P("`sheriff types` treats only a RecordType as relying on other nodes. A RecordType relies on each of the following RecordTypes, directly or through other RecordTypes:",
    "`sheriff types` считает опирающимся на другие узлы только RecordType. RecordType опирается на каждый из следующих RecordType, прямо или через другие RecordType:",
    "Новое: правило 10.15 говорит «опирается», но не говорит, на что опирается RecordType. Это предложение рецензента."),
  L("each RecordType that it refines;", "каждый RecordType, который он уточняет;", "Новое."),
  L("each RecordType that one of its fields refers to.", "каждый RecordType, на который ссылается одно из его полей.", "Новое."),
  P("`sheriff types` takes the `refines` links of a RecordType from the commit that added the RecordType's last approval to `specs/_approvals.jsonl`, and from the files of the specification while that commit is still to be made.",
    "Связи `refines` у RecordType `sheriff types` берёт из коммита, который добавил последнее одобрение этого RecordType в `specs/_approvals.jsonl`, а пока такого коммита ещё нет — из файлов спецификации.",
    "Новое, на ваше решение: связь не входит в одобряемую формулировку, и без этого абзаца связь `refines`, добавленная после одобрения, изменила бы порождённый тип без одобрения."),
  P("`sheriff types` names by its sid each node that it leaves out because that node relies on a node that has never been approved (§s-f8fmudceuyaj942).",
    "Каждый узел, который `sheriff types` пропускает, потому что тот опирается на ни разу не одобренный узел, он называет по sid (§s-f8fmudceuyaj942).",
    "Новое: так требует правило 10.15 и строка 10.1.39b."),
  P("The types and RuntimeChecks take the gathered values written beside a field (§s-ju5vcanbjph7mgh) as the files of the specification hold them when `sheriff types` runs, even where a RecordType's approved wording comes from a commit.",
    "Типы и RuntimeChecks берут собранные значения, записанные рядом с полем (§s-ju5vcanbjph7mgh), такими, какими их хранят файлы спецификации при запуске `sheriff types`, даже если одобренная формулировка RecordType взята из коммита.",
    "Новое, на ваше решение: собранные значения берутся, например, из заголовков доменов, а заголовки никто не одобряет — их статус выводится из узлов под ними. Если бы RecordType ждал их одобрения, он не породился бы никогда."),
  keep("`sheriff types` writes a file only where"),
  keep("Where any of the following holds"),
  keep("the check of generated copies against the nodes"),
  keep("a project's generator is refused")
];
rerender(tp);
types.review = review2 + ": ready once its fixes were made; fix-commands-b4.mjs made them";
types.doubt = "Two points are put to the owner with the node: the gathered values are taken as the files hold them when `sheriff types` runs; and a RecordType's `refines` links are taken from the commit that added its last approval, since a link is no part of the approved wording.";

// How a project's own code generator is run.
const gen = drafts["new:tools-2-generator"];
const gp = gen.proposal;
const gk = (start) => { const x = gp.parts.find((y) => y.en.startsWith(start)); if (!x) throw new Error(`generator: ${start}`); return x; };
gp.parts = [
  P("`sheriff types` runs each of the project's own code generators (§s-km4x4s26kv7pjze) by the command that `sheriff.config.json` names for it. It runs a generator only while the rule that lists the generator is approved.",
    "`sheriff types` запускает каждый собственный генератор кода проекта (§s-km4x4s26kv7pjze) командой, которую для него называет `sheriff.config.json`. Генератор он запускает, только пока правило, которое перечисляет этот генератор, одобрено.",
    "Из узла «The commands»; новое — генератор ждёт только одобрения правила, которое его перечисляет, как требует правило 10.9."),
  P(`\`sheriff types\` hands the generator, on its standard input, a model of the form that \`sheriff json\` prints (§${sids.model}). That model holds only the nodes that code can be generated from, each in its last approved wording (§${sids.types}), and each section and each domain's header as the files hold them.`,
    `\`sheriff types\` передаёт генератору на стандартный вход модель того вида, который печатает \`sheriff json\` (§${sids.model}). В этой модели только узлы, из которых можно порождать код, каждый в последней одобренной формулировке (§${sids.types}), а также каждый раздел и каждый заголовок домена — такими, какими их хранят файлы.`,
    "Новое: так генератор не может реализовать то, что не одобрено (правило 10.15)."),
  P("The generator prints a JSON list holding one object per file. The object's `path` is the file's path from the root of the repository, its `content` is the file's text, and its `sids` lists the sids of the nodes that the file is written from.",
    "Генератор печатает список в JSON с объектом на каждый файл. `path` объекта — путь файла от корня репозитория, `content` — текст файла, `sids` — sid узлов, из которых файл написан.",
    "Как было; ключи объекта теперь названы."),
  gk("`sheriff types` refuses a generator in each of these cases"),
  gk("the rule that `sheriff.config.json` names for the generator"),
  gk("the generator exits with a failure"),
  L("the generator prints anything other than a JSON list of objects holding `path`, `content` and `sids`;",
    "генератор печатает что-либо, кроме списка в JSON из объектов с `path`, `content` и `sids`;",
    "Строже, чем сейчас: код проверяет только, что это список в JSON, и пишет объект без `content` как пустой файл. Код меняется на этапе 3."),
  gk("a path that the generator prints lies outside the repository")
];
rerender(gp);
gp.reason = "A project's own generator is a program that the SpecSheriff tools did not write, yet what it prints becomes the system's code. `sheriff types` therefore decides what the generator reads and which of its output is written, so that the generated code implements only what the owners have approved (§s-qyjw8xez6t6adc3).";
gp.ruReason = "Собственный генератор проекта — программа, которую инструменты SpecSheriff не писали, но то, что он печатает, становится кодом системы. Поэтому `sheriff types` решает, что генератор читает и что из напечатанного им записывается, чтобы порождённый код реализовывал только то, что одобрили ответственные (§s-qyjw8xez6t6adc3).";
gen.review = review2 + ": ready once its fixes were made and the owner settles the question on paths; fix-commands-b4.mjs made the fixes";
gen.doubt = "Two points are put to the owner with the node. Paths: the agent proposes that `sheriff types` accept from a generator only the paths that a glob pattern for the system's code matches (§s-hheus6f395ynqvc), since the list of forbidden paths lets `.githooks/pre-commit` or `sheriff.config.json` through. `sids`: no file waits for a draft any longer, so the agent proposes that `sheriff types` refuse a file whose `sids` name a node outside the model that the generator is handed.";

// `sheriff settings`.
const settings = drafts["new:tools-2-settings"];
const sp = settings.proposal;
const sk = (start) => { const x = sp.parts.find((y) => y.en.startsWith(start)); if (!x) throw new Error(`settings: ${start}`); return x; };
sp.parts = [
  sk("`sheriff settings` shows and changes"),
  P("Run in a terminal with no arguments, `sheriff settings` shows the settings that only an owner changes, and every extension that the plugin delivers. It then lets the person who runs it change each of them. Run without a terminal and with no arguments, it prints them.",
    "Запущенная в терминале без аргументов, `sheriff settings` показывает настройки, которые меняет только ответственный, и каждое расширение, которое поставляет плагин. Затем она даёт тому, кто её запустил, изменить каждую из них. Запущенная без терминала и без аргументов, она их печатает.",
    "Новое. Печать без терминала — чтобы агент мог прочитать настройки."),
  P("Run with one of the following arguments, `sheriff settings` makes that one change:", "Запущенная с одним из следующих аргументов, `sheriff settings` делает только это изменение:", "Новое."),
  sk("`status approved` or `status draft`"),
  sk("`strict on` or `strict off`"),
  sk("`extension <name> on` or"),
  P("`sheriff settings` records each change as an entry in `sheriff.config.json` that names the person who made the change, by the email address that git is configured with. It records a change only when that person is an owner of the specification (§s-6sk8uet75dmq5qz), and refuses it otherwise.",
    "Каждое изменение `sheriff settings` записывает в `sheriff.config.json` записью, которая называет того, кто сделал изменение, по адресу электронной почты, заданному в git. Она записывает изменение, только если этот человек — ответственный за спецификацию (§s-6sk8uet75dmq5qz), а иначе отвергает его.",
    "Новое: так требуют правила 10.6, 10.7 и 1.7.5."),
  P("`sheriff settings` records or refuses each change as the rules on the approval status, on the `strict` flag and on withdrawing an extension require (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-j8y62pa9hzz6nwx). Where those rules require the owner to confirm an approval, the owner confirms it without a terminal by adding `--confirm` to `status approved`.",
    "`sheriff settings` записывает или отвергает каждое изменение так, как требуют правила о статусе одобрения, о флаге `strict` и об отзыве расширения (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-j8y62pa9hzz6nwx). Где эти правила требуют, чтобы ответственный подтвердил одобрение, без терминала он подтверждает его, добавив `--confirm` к `status approved`.",
    "Новое: заменяет три абзаца, которые пересказывали правила 10.6, 10.7 и 1.7.6."),
  P("`sheriff settings` records the choice of an extension only where the plugin delivers that extension (§s-j5qmmdq4m26mdvw).",
    "Выбор расширения `sheriff settings` записывает, только если плагин поставляет это расширение (§s-j5qmmdq4m26mdvw).", "Новое: так требует строка 10.1.27c."),
  sk("A refusal caused by the `strict` flag"),
  sk("`sheriff untagged`, for the check"),
  L("`sheriff validate --strict`, for a project's own check: it runs the project's own checks as if the specification were approved and its `strict` flag were on (§s-7pk89t8z6wymmj9).",
    "`sheriff validate --strict` — для собственной проверки проекта: она запускает собственные проверки проекта так, как если бы спецификация была одобрена и её флаг `strict` включён (§s-7pk89t8z6wymmj9).",
    "Новое, предложено рецензентом: правило 10.7 требует команду инструментов SpecSheriff, а собственная проверка, получая модель, видит флаг `strict` таким, какой он сейчас.")
];
rerender(sp);
sp.reason = "An agent may record a change to the specification's approval status, its `strict` flag or its chosen extensions only through a procedure (§s-83ev4wwesbwnhnp). `sheriff settings` is that procedure, for an owner at a terminal and for an agent working for that owner alike.";
sp.ruReason = "Агент может записать изменение статуса одобрения спецификации, её флага `strict` или выбранных расширений только через процедуру (§s-83ev4wwesbwnhnp). `sheriff settings` — эта процедура, одна и для ответственного в терминале, и для агента, работающего на этого ответственного.";
sp.reasonChange = "Новое, предложено рецензентом.";
sp.examples = [{
  en: "The agent runs `sheriff settings status approved`. The checks find two symbols without a SpecTag, and the command prints them and records nothing. The owner agrees, and the agent runs `sheriff settings status approved --confirm`. But not: the first run records the approval.",
  ru: "Агент запускает `sheriff settings status approved`. Проверки находят два символа без SpecTag; команда печатает их и ничего не записывает. Ответственный соглашается, и агент запускает `sheriff settings status approved --confirm`. Но не так: одобрение записывается уже при первом запуске."
}];
if (!sp.refs.some((r) => r.to === "s-83ev4wwesbwnhnp")) sp.refs.push({ type: "cites", to: "s-83ev4wwesbwnhnp" });
settings.review = review2 + ": ready once its fixes were made; fix-commands-b4.mjs made them, with the example that the reviewer proposed";

// `sheriff untagged`.
const untagged = drafts["new:tools-2-untagged"];
untagged.proposal.reason = "The check of code without a SpecTag reports all such code in one warning, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn). `sheriff untagged` lists that code symbol by symbol for whoever has to bind it to its rules.";
untagged.proposal.ruReason = "Проверка кода без SpecTag сообщает обо всём таком коде одним предупреждением, чтобы оно не заслоняло другие находки (§s-kkbqcb9xrpaepwn). `sheriff untagged` перечисляет этот код символ за символом для того, кому нужно связать его с его правилами.";
untagged.review = review2 + ": ready once its fix was made; fix-commands-b4.mjs made it";

// The English of the agreed node on `sheriff guide`.
const guide = drafts["new:tools-2-guide"].proposal;
const gd = (start, en) => { const x = guide.parts.find((y) => y.en.startsWith(start)); if (!x) throw new Error(`guide: ${start}`); x.en = en; };
gd("For each other extension", "For each of the other extensions that the plugin delivers, `sheriff guide` prints the extension's name and what the extension is for.");
gd("After the guidelines", "After the guidelines, `sheriff guide` prints the appendix of the tools, under a heading that says the appendix is not part of the guidelines (§s-a4rbry4hsu34hy8).");
gd("It also prints how many nodes", "`sheriff guide` also prints how many nodes each part of the specification holds and how many of those nodes are approved. It counts them each time it runs. It prints whether the specification is approved (§s-qzthyh7yqvfhsa2) and whether the specification's `strict` flag is on (§s-q3pfzyaxvpr2zj2).");
rerender(guide);
guide.reason = "An agent reads the guidelines before it works on the specification. Printed by one command, they are exactly the rules that the project follows, whatever release of the SpecSheriff tools it uses and whichever extensions it has chosen. The appendix of the tools comes after them because it holds what an agent needs to apply them with the SpecSheriff tools, such as the syntax of the SpecTag.";
drafts["new:tools-2-guide"].englishRead = "EngStickler's reader, 2026-11-22: the English corrected without changing its meaning by fix-commands-b4.mjs; \"delivers\" kept, since the base says that the plugin delivers an extension";
const english = (p, date) => [`# "${p.title}", a new node of the appendix of the tools, agreed on ${date}`, "", "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""].join("\n");

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
const start = t.indexOf("- specsheriff-rule-reviewer's first report on the second group");
const end = t.indexOf("\n\nStage 1 was");
if (start < 0 || end < start) throw new Error("continuation: the block on the second group not found");
t = t.slice(0, start) + `- specsheriff-rule-reviewer's first report on the second group found the nodes on \`sheriff json\`, \`sheriff todos\` and \`sheriff guide\` ready to be shown to the owner once the fixes it asked for were made, and found the nodes on \`sheriff types\` and \`sheriff settings\` not ready. fix-commands-b3.mjs applied the findings of the report; tools-drafts.before-commands-b3.json is a copy of the drafts made before that script ran. It split each of those two nodes: a new node, "How a project's own code generator is run" (s-y5yk7eu6h4zrjpr), took over the paragraphs on running a generator from the node on \`sheriff types\`, and a new node, "The list of the code that carries no SpecTag" (s-weuyx98r7c923ab), took over \`sheriff untagged\` from the node on \`sheriff settings\`. As a technical replacement, the agreed node that lists the commands now points to that new node for \`sheriff untagged\`, and writes "RuntimeChecks" where it wrote "runtime checks".
- On 2026-11-22 the owner agreed to the wording of the node on \`sheriff json\`, "The model of the specification" («ок»). agree-json.mjs marked that node's draft as agreed and wrote english-json.md for EngStickler's reader; tools-drafts.before-agree-json.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/LnW1yMbBAouWzFGEmjdHMf shows the node. On the same day the owner agreed to the wording of the node on \`sheriff todos\`, now titled "The list of todos" («ок»). agree-todos.mjs marked that node's draft as agreed and wrote english-todos.md for EngStickler's reader; tools-drafts.before-agree-todos.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/2gKYPpx8SQw6p65zcDwjUa shows the node.
- The node on \`sheriff guide\` was shown to the owner with the question of whether \`sheriff guide\` prints the appendix of the tools after the guidelines, against the plan for splitting "The commands" that the owner had agreed to. On 2026-11-22 the owner agreed («ок»): \`sheriff guide\` prints the appendix of the tools after the guidelines, under a heading that says the appendix is not part of the guidelines. The node had been shown in full with that paragraph, so agree-guide.mjs marked its draft as agreed, recorded the ruling in it, and wrote english-guide.md for EngStickler's reader; tools-drafts.before-agree-guide.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/UT5RETZYJgeiw5SWUoQf4g shows the node. The same script corrected the English of the agreed nodes "The model of the specification" and "The list of todos", and fix-commands-b4.mjs corrected that of the node on \`sheriff guide\`, as EngStickler's readers proposed, without changing their meaning.
- specsheriff-rule-reviewer's second report found the nodes on \`sheriff types\`, on running a generator, on \`sheriff settings\` and on \`sheriff untagged\` ready to be shown to the owner once the fixes it asked for were made. fix-commands-b4.mjs made those fixes; tools-drafts.before-commands-b4.json is a copy of the drafts made before that script ran. The nodes will be shown to the owner one at a time, in this order:
  - "What \`sheriff types\` generates", shown now with two questions for the owner. First, the types and RuntimeChecks take the gathered values written beside a field as the files hold them when \`sheriff types\` runs, since those values come, for example, from domain headers, which nobody approves. Second, \`sheriff types\` takes a RecordType's \`refines\` links from the commit that added its last approval to \`specs/_approvals.jsonl\`, since a link is not part of the approved wording. The node also says where the last approved wording of a node is found: in the files of the specification, or, if they do not hold it, in the latest commit on the current branch whose files hold it, and what \`sheriff types\` does where neither holds it.
  - "How a project's own code generator is run", with two questions for the owner: whether \`sheriff types\` accepts from a generator only the paths that a glob pattern for the system's code matches, and whether it refuses a file whose \`sids\` name a node outside the model that the generator is handed. The node's refusal of output other than a JSON list of objects holding \`path\`, \`content\` and \`sids\` is stricter than the code, which is to change in stage 3.
  - "The settings that only an owner of the specification changes", with the arguments \`status approved|draft\`, \`strict on|off\` and \`extension <name> on|off\`, \`--confirm\` for an approval confirmed without a terminal, the example that the reviewer proposed, and \`sheriff validate --strict\` as the command that a refusal names for a project's own check.
  - "The list of the code that carries no SpecTag".
- The reviewers also found changes that other nodes need, to be made when the review reaches them. "Generated copies against the nodes" (s-dbk2vyeg8z5jxna) still compares a generated copy with the last commit even when a node that the copy is generated from is a draft; it also cites s-f5rz6b7dhxejjts, refuses a RecordType with two fields of type \`variant\`, and refuses a generator's paths in the same way as the node on running a generator. "How a project's own check is run" (s-7pk89t8z6wymmj9) names \`sheriff model\`, which a technical replacement will change to \`sheriff json\`. The reason of "The hooks" (s-477gtdrkw34dzxw) still says that generated files wait for approval. The node that describes \`sheriff validate\` must describe its option \`--strict\`. The skill \`spec\` of both plugins says what \`sheriff guide\` prints, and the tests at generated.test.ts:278 and commands.test.ts:85 check it; both are to be changed in stage 3, in line with the node on \`sheriff guide\`.` + t.slice(end);

// INDEX.md.
const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-agree-guide.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-agree-guide.json is a copy of tools-drafts.json made before that script ran). fix-commands-b4.mjs applies the findings of specsheriff-rule-reviewer's second report on the nodes on `sheriff types`, on running a generator, on `sheriff settings` and on `sheriff untagged`, and corrects the English of the node on `sheriff guide` (tools-drafts.before-commands-b4.json is a copy of tools-drafts.json made before that script ran).");

// The outline.
const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● у рецензента второй раз: «Что порождает sheriff types», «Как запускается генератор проекта», «Настройки» (sheriff settings), «Перечень кода без SpecTag» (sheriff untagged)",
  "- ✓ вторая проверка рецензента пройдена: все четыре узла годятся после правок\n- ● «Что порождает sheriff types»: показан вам, с двумя вопросами\n- ○ «Как запускается генератор проекта» — с двумя вопросами\n- ○ «Настройки, которые меняет только ответственный» (sheriff settings)\n- ○ «Перечень кода без SpecTag» (sheriff untagged)");
o = swap(o, "### ○ Вопрос, который придёт с узлом о sheriff types\n- собранные значения берутся такими, какие они есть при запуске\n",
  "### ◐ Два вопроса к узлу о sheriff types\n- собранные значения берутся такими, какими их хранят файлы при запуске\n- связи refines берутся из коммита, который добавил последнее одобрение\n\n### ○ Вопросы, которые придут с узлом о генераторе\n- принимать только пути кода системы\n- отвергать файл, чьи sids называют узел вне модели\n");

// Every change is prepared; write the files.
fs.writeFileSync(new URL("tools-drafts.before-commands-b4.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-guide.md", here), english(guide, "2026-11-22"));
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(tp.ruTitle + "\n" + tp.ruText + "\nREASON: " + tp.ruReason + `\n\nupdated at ${now}`);
