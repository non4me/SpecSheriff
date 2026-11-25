// Drafts the first group of the nodes that replace "The commands" (s-f5rz6b7dhxejjts), by the plan the owner agreed to
// on 2026-11-21: the section "The commands", the list of the commands (which keeps the sid), what `sheriff reindex`
// writes, what it changes of what an earlier release wrote, and the merge of keys written twice. Gives every new node of
// the plan a sid now, so that the list can cite the nodes of the second group too. Writes the drafts into
// tools-drafts.json for specsheriff-rule-reviewer.
import fs from "node:fs";
import crypto from "node:crypto";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-commands-a.json", here), JSON.stringify(drafts, null, 2) + "\n");

// A sid for each new node, unlike any sid in the specification, the staged files or the drafts.
const taken = new Set();
const collect = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) collect(p);
    else if (e.name.endsWith(".json")) for (const m of fs.readFileSync(p, "utf8").matchAll(/s-[23456789abcdefghjkmnpqrstuvwxyz]{15}/g)) taken.add(m[0]);
  }
};
collect(new URL("../../specs", here).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
collect(new URL("moved", here).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
for (const m of JSON.stringify(drafts).matchAll(/s-[23456789abcdefghjkmnpqrstuvwxyz]{15}/g)) taken.add(m[0]);
const alphabet = "23456789abcdefghjkmnpqrstuvwxyz";
const newSid = () => {
  for (;;) {
    let s = "s-";
    for (const b of crypto.randomBytes(15)) s += alphabet[b % alphabet.length];
    if (!taken.has(s)) { taken.add(s); return s; }
  }
};
const sids = drafts["commands:sids"] ?? {
  section: newSid(), writes: newSid(), earlier: newSid(), twice: newSid(),
  types: newSid(), model: newSid(), todos: newSid(), guide: newSid(), settings: newSid()
};
drafts["commands:sids"] = sids;

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const draft = (key, fields) => {
  const p = fields.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  p.date = "2026-11-21";
  drafts[key] = { agreed: false, ...fields };
};

// The section that holds the nine nodes.
drafts["new:tools-2-section"] = {
  location: "tools 2 (new section, in place of the node \"The commands\")",
  kind: "section",
  sidValue: sids.section,
  agreed: false,
  proposal: {
    title: "The commands",
    ruTitle: "Команды",
    text: "What each command of the SpecSheriff tools does, and which node describes it.",
    ruText: "Что делает каждая команда инструментов SpecSheriff и какой узел её описывает.",
    date: "2026-11-21"
  }
};

// 1. The list of the commands, which keeps the sid of "The commands".
const current = (() => {
  const tools = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/tools.json", here), "utf8"));
  const find = (nodes) => { for (const n of nodes ?? []) { if (n.sid === "s-f5rz6b7dhxejjts") return n; const h = find(n.children); if (h) return h; } };
  return find(tools.nodes);
})();
draft("s-f5rz6b7dhxejjts", {
  location: "tools 2.1",
  title: current.title,
  text: current.text,
  reason: current.reason,
  refs: current.refs.filter((r) => r.to),
  testsFrom: ["e2e/cli.test.ts"],
  proposal: {
    title: "The commands and the nodes that describe them",
    ruTitle: "Команды и узлы, которые их описывают",
    titleChange: "Было: «The commands». Узел стал первым из девяти узлов раздела «The commands» и теперь только перечисляет команды.",
    parts: [
      { kind: "p", en: "The SpecSheriff tools are run as `sheriff <command>`. The following nodes describe the commands:",
        ru: "Инструменты SpecSheriff запускаются как `sheriff <команда>`. Команды описывают следующие узлы:",
        change: "Новое: узел стал перечнем команд со ссылками на узлы, которые их описывают. Всё, что он говорил о `sheriff reindex`, `sheriff types`, `sheriff model`, `sheriff todos` и `sheriff guide`, перешло в узлы этого раздела." },
      { kind: "li", en: "`sheriff validate`, `sheriff binding`, `sheriff citations`, `sheriff guard`, `sheriff message` and `sheriff review`: the nodes on how each check is made (§s-4kd2pave7vm4hmd);",
        ru: "`sheriff validate`, `sheriff binding`, `sheriff citations`, `sheriff guard`, `sheriff message` и `sheriff review` — узлы о том, как выполняется каждая проверка (§s-4kd2pave7vm4hmd);",
        change: "Как было." },
      { kind: "li", en: "`sheriff init` and `sheriff remove`: §s-7unxytshhc4md54;", ru: "`sheriff init` и `sheriff remove` — §s-7unxytshhc4md54;", change: "Как было." },
      { kind: "li", en: "`sheriff approve`: §s-v4qus7raqnwzneb;", ru: "`sheriff approve` — §s-v4qus7raqnwzneb;", change: "Как было." },
      { kind: "li", en: `\`sheriff reindex\`: §${sids.writes}, §${sids.earlier} and §${sids.twice};`, ru: `\`sheriff reindex\` — §${sids.writes}, §${sids.earlier} и §${sids.twice};`, change: "Новое: три узла этого раздела." },
      { kind: "li", en: `\`sheriff types\`: §${sids.types};`, ru: `\`sheriff types\` — §${sids.types};`, change: "Новое: узел этого раздела." },
      { kind: "li", en: `\`sheriff model\`: §${sids.model};`, ru: `\`sheriff model\` — §${sids.model};`, change: "Новое: узел этого раздела." },
      { kind: "li", en: `\`sheriff todos\`: §${sids.todos};`, ru: `\`sheriff todos\` — §${sids.todos};`, change: "Новое: узел этого раздела." },
      { kind: "li", en: `\`sheriff guide\`: §${sids.guide};`, ru: `\`sheriff guide\` — §${sids.guide};`, change: "Новое: узел этого раздела." },
      { kind: "li", en: `\`sheriff settings\` and \`sheriff untagged\`: §${sids.settings};`, ru: `\`sheriff settings\` и \`sheriff untagged\` — §${sids.settings};`, change: "Новое: команды новых процедур — одобрения спецификации, флага `strict`, выбора расширений — и команда, которая перечисляет код без SpecTag." },
      { kind: "li", en: "`sheriff show` and `sheriff export`: §s-k4nqjr96ux7a5m7;", ru: "`sheriff show` и `sheriff export` — §s-k4nqjr96ux7a5m7;", change: "Как было." },
      { kind: "li", en: "`sheriff render`: §s-rpv4fkdqqguptqd.", ru: "`sheriff render` — §s-rpv4fkdqqguptqd.", change: "Как было." },
      { kind: "p", en: "`sheriff export` and `sheriff render` write only where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb). Elsewhere each of them names that extension and ends with a failure.",
        ru: "`sheriff export` и `sheriff render` пишут только там, где проект выбрал расширение Views (§s-qgg6sfawtmwvrbb). В остальных проектах каждая из них называет это расширение и завершается с ошибкой.",
        change: "Новое: по согласованному узлу «Где лежат файлы» карта и экспорт есть, только если проект выбрал расширение Views. Сейчас обе команды работают в любом проекте." },
      { kind: "p", en: "`sheriff` with no command prints the list of the commands. `sheriff --version` prints the release of the SpecSheriff tools. `sheriff` with any other word as its command names that word, prints the list of the commands and ends with a failure.",
        ru: "`sheriff` без команды печатает перечень команд. `sheriff --version` печатает выпуск инструментов SpecSheriff. `sheriff` с любым другим словом вместо команды называет это слово, печатает перечень команд и завершается с ошибкой.",
        change: "Новое в тексте: код уже так поступает, и три теста узла это проверяют." }
    ],
    reason: "Each command is described where the rules that it carries out are described, so that a reader finds what a command does in one node. This node lets a reader find that node from the command's name.",
    ruReason: "Каждая команда описана там, где описаны правила, которые она выполняет, чтобы читатель находил всё, что делает команда, в одном узле. Этот узел позволяет найти тот узел по названию команды.",
    reasonChange: "Новое: прежнее обоснование говорило о `sheriff reindex` и `sheriff types` и перешло в узлы этого раздела.",
    removed: [
      "Всё о `sheriff reindex`, `sheriff types`, `sheriff model`, `sheriff todos` и `sheriff guide`: это теперь узлы этого раздела.",
      "Добавление правила, одобряющего спецификацию, в `project.json`: по согласованному правилу 10.6 статус одобрения спецификации хранят записи в `sheriff.config.json`, а `sheriff reindex` переносит туда прежнее правило (узел «Что `sheriff reindex` меняет в записанном прежним выпуском»)."
    ],
    refs: [
      { type: "implements", to: "s-m4h279nbaqkpa3t" },
      { type: "implements", to: "s-epaw9sgyaajzn8g" },
      ...["s-4kd2pave7vm4hmd", "s-7unxytshhc4md54", "s-v4qus7raqnwzneb", sids.writes, sids.earlier, sids.twice, sids.types, sids.model, sids.todos, sids.guide, sids.settings, "s-k4nqjr96ux7a5m7", "s-rpv4fkdqqguptqd", "s-qgg6sfawtmwvrbb"].map((to) => ({ type: "cites", to }))
    ]
  }
});

// 2. What `sheriff reindex` writes.
draft("new:tools-2-reindex-writes", {
  location: "tools 2.2 (new)",
  sidValue: sids.writes,
  from: "s-f5rz6b7dhxejjts",
  testsFrom: ["sheriff reindex rewrites the files it changed", "gives a sid to a node that has none", "adds to the project's own guidelines the rule approving the specification"],
  proposal: {
    title: "What `sheriff reindex` writes",
    ruTitle: "Что пишет `sheriff reindex`",
    parts: [
      { kind: "p", en: "`sheriff reindex` writes into the files of the specification everything that the SpecSheriff tools compute from the specification, the code and the tests:",
        ru: "`sheriff reindex` записывает в файлы спецификации всё, что инструменты SpecSheriff вычисляют по спецификации, коду и тестам:",
        change: "Из узла «The commands». Было: «`sheriff reindex` запускается после каждого изменения спецификации. Он делает следующее…»." },
      { kind: "li", en: "a sid for each node that has none, including a node in a cell of a `TableRule` (§s-9spq78kdwsxr759, §s-5fewsp22mmdz7y6);",
        ru: "sid каждому узлу, у которого его нет, в том числе узлу в ячейке `TableRule` (§s-9spq78kdwsxr759, §s-5fewsp22mmdz7y6);",
        change: "Новое: и узлу в ячейке." },
      { kind: "li", en: "the location of each node (§s-kag2m9tzdnduxdx);", ru: "расположение каждого узла (§s-kag2m9tzdnduxdx);", change: "Как было." },
      { kind: "li", en: "the links pointing at each node, rebuilt from the links that the nodes declare (§s-bpdqd9v72wg7vsz);",
        ru: "связи, указывающие на каждый узел, заново построенные из связей, которые объявляют узлы (§s-bpdqd9v72wg7vsz);", change: "Как было." },
      { kind: "li", en: "the lists `meta.code` and `meta.tests` of each node, built from the SpecTags that bind code and tests to the node (§s-rwqzepmrt77rv35);",
        ru: "списки `meta.code` и `meta.tests` каждого узла, построенные по SpecTag, которые связывают с узлом код и тесты (§s-rwqzepmrt77rv35);",
        change: "Новое: правило 9.7 требует, чтобы эти списки строили инструменты. Сейчас их пишут вручную, а `sheriff binding` сверяет." },
      { kind: "li", en: "the approval status of each section (§s-9kfdycuq34beqvs) and of each domain's header (§s-yggv9myedprnaa7), derived from the nodes under it;",
        ru: "статус одобрения каждого раздела (§s-9kfdycuq34beqvs) и каждого заголовка домена (§s-yggv9myedprnaa7), выведенный из узлов под ним;", change: "Как было." },
      { kind: "li", en: "where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the index of the sections in each domain's header (§s-2r59txnms5serdr);",
        ru: "если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), — оглавление разделов в каждом заголовке домена (§s-2r59txnms5serdr);",
        change: "Как было; теперь сказано, что только при выбранном расширении Domains." },
      { kind: "li", en: "where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered beside each field with `enum`, in the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh).",
        ru: "если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), — значения, собранные рядом с каждым полем с `enum`, в его `x-enumSource.gathered` (§s-ju5vcanbjph7mgh).",
        change: "Было: «рядом с каждым полем типа `one of`». Теперь поле — с `enum`, а значения записываются в `x-enumSource.gathered`, как в подготовленной схеме расширения RecordType." },
      { kind: "p", en: "An approved node stays approved only while its latest approval records the fingerprint of its current wording (§s-5ah25f6gy99panq). `sheriff reindex` makes every other approved node a draft.",
        ru: "Одобренный узел остаётся одобренным, только пока его последнее одобрение хранит отпечаток его нынешней формулировки (§s-5ah25f6gy99panq). Любой другой одобренный узел `sheriff reindex` делает черновиком.",
        change: "Было: «делает черновиком каждый одобренный узел, у которого последняя строка для него и отпечатка его формулировки — не одобрение. Раздел, заголовок домена и SpecSheriff guidelines, которые берёт проект, в это не входят». Теперь утвердительно; раздел и заголовок не нужно называть — их одобряет никто." },
      { kind: "p", en: "`sheriff reindex` writes only the files of the specification that the repository keeps, and only where their content changes. It names each file that it writes.",
        ru: "`sheriff reindex` пишет только те файлы спецификации, которые хранит репозиторий, и только там, где меняется их содержимое. Он называет каждый файл, который пишет.",
        change: "Новое в тексте: код уже так поступает. Так узлы SpecSheriff guidelines и выбранных расширений, которые проект берёт из плагина, в проекте не меняются." }
    ],
    reason: "What the SpecSheriff tools can compute is computed, so that it always agrees with what it is computed from and nobody spends effort writing it. Each part is rebuilt whole after every change, so that it is correct whatever an earlier run left (§s-jsqxdx47wkkj7gp). A file whose content stays the same is left as it was, so that nothing watching the files takes it for changed.",
    ruReason: "То, что инструменты SpecSheriff могут вычислить, вычисляется, чтобы оно всегда сходилось с тем, из чего вычислено, и никто не тратил сил на то, чтобы это писать. Каждая часть строится заново целиком после каждого изменения, чтобы она была верна, что бы ни оставил прежний запуск (§s-jsqxdx47wkkj7gp). Файл, содержимое которого не меняется, остаётся как был, чтобы ничто, следящее за файлами, не приняло его за изменённый.",
    reasonChange: "Новое: прежнее обоснование узла «The commands» говорило о слиянии ключей и о `sheriff types`.",
    removed: [
      "«`sheriff reindex` добавляет правило, которое пишет `sheriff init`, как черновик…»: по согласованному правилу 10.6 статус одобрения спецификации хранят записи в `sheriff.config.json`."
    ],
    refs: [
      ...["s-9spq78kdwsxr759", "s-kag2m9tzdnduxdx", "s-bpdqd9v72wg7vsz", "s-rwqzepmrt77rv35", "s-9kfdycuq34beqvs", "s-2r59txnms5serdr", "s-ju5vcanbjph7mgh", "s-5ah25f6gy99panq", "s-jsqxdx47wkkj7gp"].map((to) => ({ type: "implements", to })),
      ...["s-5fewsp22mmdz7y6", "s-yggv9myedprnaa7", "s-tdm3rwsppnuh6dm", "s-hzuzn8hbq6q9q4s"].map((to) => ({ type: "cites", to }))
    ]
  }
});

// 3. What `sheriff reindex` changes of what an earlier release wrote.
draft("new:tools-2-reindex-earlier", {
  location: "tools 2.3 (new)",
  sidValue: sids.earlier,
  from: "s-f5rz6b7dhxejjts",
  testsFrom: ["rewrites the statuses, the owners and the confirmations", "renames what an earlier release wrote", "renames the kinds an earlier release wrote", "rewrites each test naming its node by a bare sid", "gives a field of type one of whose own list"],
  proposal: {
    title: "What `sheriff reindex` changes of what an earlier release wrote",
    ruTitle: "Что `sheriff reindex` меняет в записанном прежним выпуском",
    parts: [
      { kind: "p", en: `\`sheriff reindex\` rewrites, in the form that its own release reads, whatever an earlier release of the SpecSheriff tools wrote in another form. It does so once it has merged the keys written twice (§${sids.twice}), and before it validates the files. In every file of the specification and of its archive, it makes the following changes:`,
        ru: `\`sheriff reindex\` переписывает в том виде, который читает его выпуск, всё, что прежний выпуск инструментов SpecSheriff записал в другом виде. Он делает это после того, как объединил ключи, записанные дважды (§${sids.twice}), и до того, как проверяет файлы. В каждом файле спецификации и её архива он вносит следующие изменения:`,
        change: "Из узла «The commands». Было: «Прежде всего `sheriff reindex` переименовывает…». Порядок исправлен: код сначала объединяет ключи, записанные дважды, и согласованный узел о проверке по схеме говорит так же." },
      { kind: "li", en: "the key `id` becomes `location`, and the key `rationale` becomes `reason`;", ru: "ключ `id` становится `location`, а ключ `rationale` — `reason`;", change: "Как было." },
      { kind: "li", en: "the kinds of node `record` and `recordType` become `RecordType`, `rule` becomes `TextRule`, and `domain` becomes `header`;",
        ru: "типы узлов `record` и `recordType` становятся `RecordType`, `rule` — `TextRule`, а `domain` — `header`;", change: "Как было." },
      { kind: "li", en: "a node's status `\"\"` becomes `draft`, and `checked` becomes `approved`;", ru: "статус узла `\"\"` становится `draft`, а `checked` — `approved`;", change: "Как было." },
      { kind: "li", en: "a node's key `owner`, which holds an email, becomes `owners`, which holds a list that holds that email;",
        ru: "ключ узла `owner` с адресом почты становится `owners` со списком из этого адреса;", change: "Было: «ключ `owner` заголовка домена или раздела». Код меняет его у любого узла." },
      { kind: "li", en: "a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), in which each field is a property with the same type, bounds, meaning and guarantee, and the source of a field's values becomes the field's `x-enumSource` (§s-xfu2gpzddjnmgks);",
        ru: "`fields` и `unknown` у RecordType становятся его `schema` (§s-6eb92ddch7shuvu), где каждое поле — свойство с тем же типом, границами, смыслом и гарантией, а источник значений поля становится его `x-enumSource` (§s-xfu2gpzddjnmgks);",
        change: "Новое: по вашему решению от 19 ноября RecordType описывается JSON Schema 2020-12." },
      { kind: "li", en: "a list's `TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema` where it points into a JSON Schema, and `TextRule.list.valueList` where it names a declaration in code;",
        ru: "`TextRule.list.declaredIn` списка становится `TextRule.list.jsonSchema`, если указывает в JSON Schema, и `TextRule.list.valueList`, если называет объявление в коде;",
        change: "Новое: по вашему решению от 13 ноября (задача у строки 10.1.35)." },
      { kind: "li", en: "a link of the type `supersedes` is removed (§s-sn6au3vcr9uy5pm);", ru: "связь типа `supersedes` удаляется (§s-sn6au3vcr9uy5pm);", change: "Новое: по вашему решению от 12 ноября этого типа связи больше нет." },
      { kind: "li", en: "a node of the archive loses its sid (§s-f2b5zvc565s242f).", ru: "узел архива теряет свой sid (§s-f2b5zvc565s242f).", change: "Новое: у узла архива нет sid." },
      { kind: "p", en: "A renamed key keeps its place among the node's keys. A kind of node is renamed also where a field's values are the sids of that kind's nodes, and where the project's extension of the schema sets `fields` for that kind.",
        ru: "Переименованный ключ сохраняет своё место среди ключей узла. Тип узла переименовывается и там, где значения поля — sid узлов этого типа, и там, где расширение схемы проекта задаёт `fields` для этого типа.",
        change: "Как было." },
      { kind: "p", en: "Outside the files of the specification, `sheriff reindex` makes the following changes:",
        ru: "Вне файлов спецификации `sheriff reindex` вносит следующие изменения:", change: "Новое: собраны вместе изменения вне файлов спецификации." },
      { kind: "li", en: "`specs/_confirmations.jsonl` becomes `specs/_approvals.jsonl`, and the key `owner` of each of its lines becomes `by`; where `specs/_approvals.jsonl` already exists, those lines are appended to it and the old file is removed;",
        ru: "`specs/_confirmations.jsonl` становится `specs/_approvals.jsonl`, а ключ `owner` каждой его строки — `by`; если `specs/_approvals.jsonl` уже есть, эти строки дописываются в него, а старый файл удаляется;", change: "Как было." },
      { kind: "li", en: "the rule in `project.json` with which an earlier release recorded the specification's approval status gives way to an entry in `sheriff.config.json` (§s-qzthyh7yqvfhsa2), which records the status that the rule's latest approval or withdrawal set and names the owner who gave it;",
        ru: "правило в `project.json`, которым прежний выпуск записывал статус одобрения спецификации, уступает место записи в `sheriff.config.json` (§s-qzthyh7yqvfhsa2); запись хранит статус, который задало последнее одобрение или его отзыв у правила, и называет ответственного, который его дал;",
        change: "Новое: по согласованному правилу 10.6 статус одобрения спецификации хранят записи. Так проект, одобренный прежним способом, сохраняет свой статус." },
      { kind: "li", en: "that rule goes to the archive where it was ever approved (§s-f2b5zvc565s242f), with that change as the reason for its removal;",
        ru: "это правило уходит в архив, если его когда-либо одобряли (§s-f2b5zvc565s242f), с этим изменением как причиной удаления;",
        change: "Новое: строка 10.1.11 требует, чтобы удалённый одобренный узел попал в архив." },
      { kind: "li", en: "the key `writesSpecSheriffGuidelines` is removed from `sheriff.config.json` (§s-zefk589ykh37b8u);",
        ru: "ключ `writesSpecSheriffGuidelines` удаляется из `sheriff.config.json` (§s-zefk589ykh37b8u);", change: "Новое: по вашему решению от 21 ноября репозиторий SpecSheriff узнаётся по переменной окружения." },
      { kind: "li", en: "in each file that the settings name as tests of the system's code or of a project's own check or generator, `@spec ` is put before each bare sid, and each node's `meta.tests` names the test by its new name.",
        ru: "в каждом файле, который настройки называют тестами кода системы или собственной проверки или генератора проекта, перед каждым голым sid ставится `@spec `, а `meta.tests` каждого узла называет тест по его новому имени.",
        change: "Как было." },
      { kind: "p", en: "A bare sid is a word in the form of a sid that opens a test's name, followed by a space or the name's end, or that is the only argument of the test's mark.",
        ru: "Голый sid — это слово в виде sid, которое открывает имя теста и за которым идёт пробел или конец имени, или которое является единственным аргументом метки теста.",
        change: "Как было, одним предложением." },
      { kind: "p", en: "Each of these changes leaves a node's fingerprint as it was (§s-5ah25f6gy99panq), so that the node keeps every approval. `sheriff reindex` names each file that it changes in this way, the files of the specification included.",
        ru: "Каждое из этих изменений оставляет отпечаток узла прежним (§s-5ah25f6gy99panq), так что узел сохраняет все одобрения. `sheriff reindex` называет каждый файл, который так меняет, в том числе файлы спецификации.",
        change: "Новое в тексте: код уже вычисляет отпечаток так, что переименования его не меняют. Новое: называются и файлы спецификации, в которых переименованы тесты; сейчас они не называются." }
    ],
    reason: "A project's files are written by the release that wrote them. A release that writes something in another form therefore rewrites it where the files are next read, so that the project rewrites nothing by hand. A test names its node in the form that the release of its day reads, so a release that changes that form rewrites the tests as well.\n\nA change of form leaves what a node requires as it was, so it leaves the node's approvals too. The files that `sheriff reindex` rewrites are named, since they are their author's to stage.",
    ruReason: "Файлы проекта записаны тем выпуском, который их записал. Поэтому выпуск, который пишет что-то в другом виде, переписывает это там, где файлы читаются в следующий раз, чтобы проекту ничего не приходилось переписывать вручную. Тест называет свой узел в том виде, который читает выпуск его дня, поэтому выпуск, который меняет этот вид, переписывает и тесты.\n\nСмена вида оставляет то, что требует узел, прежним, поэтому оставляет и одобрения узла. Файлы, которые переписывает `sheriff reindex`, называются, потому что их автору нужно добавить их в коммит.",
    reasonChange: "Первый абзац — из обоснования узла «The commands». Второй — новый, о сохранении одобрений; последнее предложение — как было.",
    removed: [
      "«Поле типа `one of`, свой список которого прежний выпуск записал пустым, получает источником значения, которые добавляют домены»: этот источник значений вы убрали.",
      "Переименование `required` в `guaranteed`: по решению от 19 ноября гарантированное поле отмечает `required` самой JSON Schema, и переименование стало частью переноса полей RecordType в `schema`."
    ],
    refs: [
      ...["s-jsqxdx47wkkj7gp", "s-qzthyh7yqvfhsa2", "s-f2b5zvc565s242f", "s-5ah25f6gy99panq"].map((to) => ({ type: "implements", to })),
      ...[sids.twice, "s-6eb92ddch7shuvu", "s-xfu2gpzddjnmgks", "s-sn6au3vcr9uy5pm", "s-zefk589ykh37b8u"].map((to) => ({ type: "cites", to }))
    ]
  }
});

// 4. The merge of keys written twice.
draft("new:tools-2-reindex-twice", {
  location: "tools 2.4 (new)",
  sidValue: sids.twice,
  from: "s-f5rz6b7dhxejjts",
  testsFrom: ["unit/json-text.test.ts", "merges the values an object holds under one key", "refuses two values it cannot merge and then writes no file"],
  proposal: {
    title: "Keys written twice",
    ruTitle: "Ключи, записанные дважды",
    parts: [
      { kind: "p", en: "Before any other change, `sheriff reindex` merges, in every file that it reads, the values that an object holds under one key, each into the values written before it:",
        ru: "Прежде любого другого изменения `sheriff reindex` объединяет в каждом файле, который читает, значения, которые объект хранит под одним ключом, — каждое со значениями, записанными до него:",
        change: "Из узла «The commands». Было: «Затем в каждом файле, который он переписывает…». Теперь слияние — первым, как и в коде: до переименований и до переписывания тестов." },
      { kind: "li", en: "two lists become one, which holds the members of the first and then the members of the second that are new to the first;",
        ru: "два списка становятся одним, в котором стоят элементы первого, а за ними элементы второго, новые для первого;", change: "Как было, без отрицания." },
      { kind: "li", en: "two objects are merged key by key in the same way, each key staying where it was first written;",
        ru: "два объекта объединяются по ключам так же, и каждый ключ остаётся там, где был записан впервые;", change: "Как было." },
      { kind: "li", en: "two values that JSON Schema holds equal become one.", ru: "два значения, которые JSON Schema считает равными, становятся одним.", change: "Как было." },
      { kind: "p", en: "It names every key that it merged, with the file and the line of each value. It refuses any other two values under one key, naming the file, the key, and the line and the value of each, and then writes no file.",
        ru: "Он называет каждый ключ, который объединил, с файлом и строкой каждого значения. Любые другие два значения под одним ключом он отвергает, называя файл, ключ, строку и значение каждого, и после этого не пишет ни одного файла.",
        change: "Как было." }
    ],
    reason: "`sheriff reindex` rewrites whole the files written by hand, so it keeps everything they hold. Two values written under one key are each somebody's intent. They are kept together where both can stand. They are refused where keeping one would drop the other, since nothing says which was meant. Every merge is named, because one of the two values may have been written to replace the other.",
    ruReason: "`sheriff reindex` переписывает целиком файлы, написанные вручную, поэтому сохраняет всё, что в них есть. Два значения, записанные под одним ключом, — это чьё-то намерение каждое. Их сохраняют вместе там, где могут стоять оба. Их отвергают там, где сохранить одно значило бы потерять другое, потому что ничто не говорит, какое имелось в виду. Каждое слияние называется, потому что одно из двух значений могли записать, чтобы заменить другое.",
    reasonChange: "Как было в узле «The commands».",
    removed: [],
    refs: [
      { type: "implements", to: "s-d5cgda5bdsn7bzy" },
      { type: "implements", to: "s-jsqxdx47wkkj7gp" }
    ]
  }
});
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(JSON.stringify(sids));
for (const k of ["s-f5rz6b7dhxejjts", "new:tools-2-reindex-writes", "new:tools-2-reindex-earlier", "new:tools-2-reindex-twice"]) console.log("\n===== " + k + "\n" + drafts[k].proposal.text + "\n\nREASON: " + drafts[k].proposal.reason);
