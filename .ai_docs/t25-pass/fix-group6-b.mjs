// T25, stage 2, group 6, round b: applies the six reports on the drafts of group 6 (review-g6-a.md to review-g6-d.md,
// english-g6-fast.md, english-g6-thorough.md) as fix-brief-group6-b.md says, with the points that brief settles.
// Copies tools-drafts.json to tools-drafts.before-group6-b.json on its first run and rebuilds from that copy on every
// run, so that it is idempotent. Each patch fails where it does not find the part or the text it replaces. Runs the
// checks of propose-group6.mjs before it writes, and writes english-group6b.md, the English of every changed node.
// It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group6-b.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const REVIEW = "specsheriff-rule-reviewer, 2026-11-25: review-g6-a.md, review-g6-b.md, review-g6-c.md and review-g6-d.md; EngStickler's readers: english-g6-fast.md and english-g6-thorough.md; fix-group6-b.mjs applied the findings as group6-notes.md, round b, says";

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else if (x.kind === "li2") out.push(`  - ${x[key]}`);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const L = (en, ru, change) => ({ kind: "li", en, ru, change });
const R = (type, to) => ({ type, to });
const X = (en, ru) => ({ en, ru });
const problems = [];

const GROUP = [
  "new:tools-11-section", "s-v4qus7raqnwzneb", "new:tools-11-fingerprint", "new:tools-11-approve", "new:tools-11-withdraw",
  "new:tools-2-entries", "new:tools-2-approve-spec", "new:tools-2-strict", "new:tools-2-extension-off", "s-7unxytshhc4md54",
  "proposal:s-gb8s9657a65hqmv-g6", "proposal:s-7pk89t8z6wymmj9-g6",
];
const changed = new Set();
const prop = (key) => {
  changed.add(key);
  return drafts[key].proposal;
};
// The part of a draft whose English starts with `start`, as the copy holds it.
const find = (key, start) => {
  const x = drafts[key].proposal.parts.find((p) => p.en.startsWith(start));
  if (!x) problems.push(`${key}: no part starts with "${start.slice(0, 60)}…"`);
  return x ?? { kind: "p", en: "", ru: "", change: "" };
};
// The same part, unchanged.
const keep = (key, start) => ({ ...find(key, start) });
// The same part with new English and Russian; its `change` stays unless a new one is given.
const mod = (key, start, en, ru, change) => {
  const x = find(key, start);
  return { kind: x.kind, en, ru, change: change ?? x.change };
};
// Replaces `from` by `to` once in a string field, failing where `from` is not there.
const rep = (where, obj, field, from, to) => {
  if (typeof obj?.[field] !== "string" || !obj[field].includes(from)) {
    problems.push(`${where}: "${from.slice(0, 60)}…" not found in ${field}`);
    return;
  }
  obj[field] = obj[field].replace(from, to);
};
const at = (parts, start) => {
  const i = parts.findIndex((x) => x.en.startsWith(start));
  if (i < 0) problems.push(`no part starts with "${start.slice(0, 60)}…"`);
  return i;
};
const addRef = (p, type, to) => {
  if (!p.refs.some((r) => r.to === to)) p.refs.push(R(type, to));
};
const dropRef = (p, to) => {
  p.refs = p.refs.filter((r) => r.to !== to);
};

// ---------------------------------------------------------------------------------------------------------------
// s-v4qus7raqnwzneb, "How an approval is recorded": review a, R1 to R5; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "s-v4qus7raqnwzneb";
  const p = prop(K);
  p.parts = [
    mod(K, "`specs/_approvals.jsonl` (§s-zefk589ykh37b8u) records",
      "`specs/_approvals.jsonl` (§s-zefk589ykh37b8u) records each approval (§s-67vekyup7y8smap) of a wording of a node (§s-5ah25f6gy99panq), and each withdrawal of such an approval (§s-fpq35tf3pehgk64), in a line of its own. `sheriff approve` (§s-upkur92ry6332y5) and `sheriff approve --withdraw` (§s-xybjqp2rxh8gszf) append each line that they write to the end of the file. Each line is the text that `JSON.stringify` writes, with no whitespace, for an object that holds only the following keys, in this order:",
      "`specs/_approvals.jsonl` (§s-zefk589ykh37b8u) записывает каждое одобрение (§s-67vekyup7y8smap) формулировки узла (§s-5ah25f6gy99panq) и каждый отзыв такого одобрения (§s-fpq35tf3pehgk64) отдельной строкой. `sheriff approve` (§s-upkur92ry6332y5) и `sheriff approve --withdraw` (§s-xybjqp2rxh8gszf) добавляют каждую строку, которую пишут, в конец файла. Каждая строка — это текст, который `JSON.stringify` пишет без пробелов для объекта, где есть только следующие ключи, в этом порядке:"),
    keep(K, "`sid`, the sid of the node;"),
    keep(K, "`fingerprint`, the fingerprint"),
    mod(K, "`withdrawn`, whose value",
      "`withdrawn`, with the value `true`, which only a line that withdraws an approval holds;",
      "`withdrawn` со значением `true`, который есть только в строке, отзывающей одобрение;"),
    mod(K, "`by`, the email address",
      "`by`, the email address set in the git configuration of whoever approves the wording or withdraws its approval.",
      "`by` — адрес электронной почты, заданный в конфигурации git того, кто одобряет формулировку или отзывает её одобрение."),
    mod(K, "A line that holds no `withdrawn` is an approval.",
      "A line that holds `withdrawn` is a withdrawal, and any other line is an approval. An approval of a wording of a node is in force where the latest line for the node's sid and that wording's fingerprint is an approval. Of the lines for one sid and one fingerprint, the latest is the one that comes last in the file.",
      "Строка с `withdrawn` — это отзыв, а любая другая строка — одобрение. Одобрение формулировки узла в силе, если самая поздняя строка для sid узла и отпечатка этой формулировки — одобрение. Из строк для одного sid и одного отпечатка самая поздняя — та, что стоит в файле последней."),
    mod(K, "A node's last approval is",
      "A node's last approval is the last line for the node's sid that is an approval, whether or not a later line withdraws that approval.",
      "Последнее одобрение узла — последняя строка для sid узла, которая является одобрением, независимо от того, отзывает ли это одобрение более поздняя строка."),
  ];
  p.reason = "A node's approval decides whether its code may change, so the SpecSheriff tools take it from a record that no edit of the node changes and that keeps every approval and every withdrawal, each with the address of whoever made it.";
  p.ruReason = "От одобрения узла зависит, можно ли менять его код, поэтому инструменты SpecSheriff берут одобрение из записи, которую не меняет ни одна правка узла и которая хранит каждое одобрение и каждый отзыв вместе с адресом того, кто их сделал.";
  rep(K, p.examples[0], "en", "No approval of R's wording is in force", "No approval of any of R's wordings is in force");
  rep(K, p.examples[0], "ru", "Ни одно одобрение формулировки R не в силе", "Ни одно одобрение ни одной из формулировок R не в силе");
  dropRef(p, "s-t5uw8zfxzhfdg86");
  const e = drafts[K];
  e.testsFrom = e.testsFrom.filter((t) => !t.startsWith("reads the confirmations an earlier release wrote"));
  rep(K, e, "stage3", "The tests at approve.test.ts:30, :131 and :141 keep this sid;", "The tests at approve.test.ts:30 and :131 keep this sid, and the test at :141 (“reads the confirmations an earlier release wrote…”) moves to s-gb8s9657a65hqmv, which describes that migration;");
  e.stage3 += " migrateApprovals (approvals.ts) puts an earlier release's confirmations before the lines already in specs/_approvals.jsonl; it is to append them after those lines, as s-gb8s9657a65hqmv says, with a test written first.";
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-11-fingerprint: review a, F1 to F4; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-11-fingerprint";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const first = at(parts, "The fingerprint of a node's wording");
  parts.splice(first, 1,
    P("The fingerprint of a node's wording (§s-5ah25f6gy99panq) is the SHA-256 hash of the UTF-8 bytes of one string. The hash is written as 64 lowercase hexadecimal digits.",
      "Отпечаток формулировки узла (§s-5ah25f6gy99panq) — это хеш SHA-256 от байтов UTF-8 одной строки. Хеш записывается 64 шестнадцатеричными цифрами в нижнем регистре.",
      find(K, "The fingerprint of a node's wording").change),
    P("That string is the text that `JSON.stringify` writes, with no whitespace, for an object built from the node. In that text, the keys of each object are sorted by their UTF-16 code units. Each list keeps the order of its items.",
      "Эта строка — текст, который `JSON.stringify` пишет без пробелов для объекта, построенного из узла. В этом тексте ключи каждого объекта упорядочены по их кодовым единицам UTF-16. Каждый список сохраняет порядок своих элементов.",
      "Без изменений по смыслу; так строку строит код (model.ts)."));
  const row = parts[at(parts, "`row`, an object")];
  row.en = "`row`, an object that holds the text of each cell that holds text in the node's row, under the key of that cell's column.";
  const names = parts[at(parts, "The following names")];
  names.en = "The following keys and kinds of node, which `sheriff reindex` renames in what an earlier release wrote (§s-gb8s9657a65hqmv), appear in the object under the names that the earlier release wrote:";
  names.ru = "Следующие ключи и типы узлов, которые `sheriff reindex` переименовывает в записанном прежним выпуском (§s-gb8s9657a65hqmv), входят в объект под теми именами, которые записал прежний выпуск:";
  const list = parts[at(parts, "a `TextRule.list.jsonSchema` or")];
  list.en = "a `TextRule.list.jsonSchema` or a `TextRule.list.valueList` (§s-eferktypcj7njt5), in a `TextRule.list` that holds only one of the two, under the key `declaredIn`, with the `pointer` of the first or the `symbol` of the second under the key `declaration`;";
  list.ru = "`TextRule.list.jsonSchema` или `TextRule.list.valueList` (§s-eferktypcj7njt5) в `TextRule.list`, где есть только одно из них, — под ключом `declaredIn`, а `pointer` первого или `symbol` второго — под ключом `declaration`;";
  const kind = parts[at(parts, "the name of a kind of node")];
  kind.en = "the name of a kind of node, where a field's values are the sids of that kind's nodes: `TextRule` as `rule`, `RecordType` as `recordType`, and `header` as `domain`.";
  kind.ru = "имя типа узлов там, где значения поля — sid узлов этого типа: `TextRule` как `rule`, `RecordType` как `recordType`, `header` как `domain`.";
  p.parts = parts;
  rep(K, p.examples[0], "ru", "поэтому одобрение его новой формулировки не в силе", "поэтому ни одно одобрение его новой формулировки не в силе");
  rep(K, p.examples[1], "en", "to build the object of the rule from", "to build the object for the rule from");
  drafts[K].stage3 += " The node follows rule 1.3.5 as agreed: a node's kind is not part of its wording, so a change of the kind alone leaves an approval in force (review g6-a, F4); the main session records for the base specification whether the kind should be part of the wording.";
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-11-approve: review a, A1 to A5; the readers.
// ---------------------------------------------------------------------------------------------------------------
const SID_REFUSAL_EN = "a sid that names no node in the files that the repository keeps, such as the sid of a node of the SpecSheriff guidelines or of a chosen extension (§s-9ttvcwpqkehm58g) in a project other than SpecSheriff itself, which takes those nodes from the plugin (§s-bsya3febm6u64ab);";
const SID_REFUSAL_RU = "sid, который не называет ни одного узла в файлах, которые хранит репозиторий, например sid узла SpecSheriff guidelines или выбранного расширения (§s-9ttvcwpqkehm58g) в проекте, который не является самим SpecSheriff и берёт эти узлы из плагина (§s-bsya3febm6u64ab);";
const DERIVED_EN = "a section or, where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the header of a domain (§s-yccuyqbypzzx2gu), since `sheriff reindex` derives the approval status of either from other nodes (§s-ztseyetus7np6br)";
const DERIVED_RU = "раздел или, если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), заголовок домена (§s-yccuyqbypzzx2gu), потому что статус одобрения и того и другого `sheriff reindex` выводит из других узлов (§s-ztseyetus7np6br)";
{
  const K = "new:tools-11-approve";
  const p = prop(K);
  p.parts = [
    mod(K, "`sheriff approve <sid>...` approves",
      "`sheriff approve <sid>...` approves each node that it names (§s-67vekyup7y8smap). For each such node, it appends to `specs/_approvals.jsonl` an approval (§s-v4qus7raqnwzneb) of the node's current wording (§s-5ah25f6gy99panq). The approval names whoever runs the command.",
      "`sheriff approve <sid>...` одобряет каждый узел, который он называет (§s-67vekyup7y8smap). Для каждого такого узла он добавляет в `specs/_approvals.jsonl` одобрение (§s-v4qus7raqnwzneb) нынешней формулировки узла (§s-5ah25f6gy99panq). Одобрение называет того, кто запустил команду."),
    keep(K, "`sheriff approve` then sets"),
    mod(K, "Where a node that `sheriff approve` names is a `TableRule`",
      "Where a node that `sheriff approve` names is a `TableRule` (§s-5fewsp22mmdz7y6), the command also approves each node in the table's cells, as it approves a node that it names. It appends these approvals after that of the `TableRule`, in the order of the table's rows and, within a row, in the order of its columns.",
      "Если узел, который называет `sheriff approve`, — `TableRule` (§s-5fewsp22mmdz7y6), команда одобряет и каждый узел в ячейках таблицы так же, как узел, который она называет. Эти одобрения она добавляет после одобрения `TableRule`, в порядке строк таблицы, а внутри строки — в порядке её столбцов.",
      "Новое: по правилу 1.3.4 ответственный за `TableRule` может одобрить всю таблицу сразу, и это одобряет каждый узел-черновик в её ячейках; каждое такое одобрение называет этого ответственного (ваше решение от 2026-11-14). Узел в ячейке одобряется так же, как названный узел: если одобрение его нынешней формулировки уже в силе, команда только ставит ему статус."),
    keep(K, "`sheriff approve` refuses each of the following:"),
    mod(K, "a sid that names no node", SID_REFUSAL_EN, SID_REFUSAL_RU),
    mod(K, "a section, and the header", DERIVED_EN + ";", DERIVED_RU + ";"),
    mod(K, "a node none of whose owners",
      "a node of which whoever runs the command is not an owner (§s-6sk8uet75dmq5qz).",
      "узел, ответственным за который тот, кто запустил команду, не является (§s-6sk8uet75dmq5qz)."),
    mod(K, "Each refusal names the sid concerned.",
      "Each refusal names the sid concerned. The refusal of a node of which whoever runs the command is not an owner also names the node's owners.",
      "Каждый отказ называет соответствующий sid. Отказ для узла, ответственным за который тот, кто запустил команду, не является, называет и ответственных за узел."),
    mod(K, "Where `sheriff approve` refuses any node",
      "Where `sheriff approve` refuses any sid that the run names, it records nothing. Where git's configuration sets no email address, `sheriff approve` refuses to run.",
      "Если `sheriff approve` отвергает хотя бы один sid, который называет запуск, он ничего не записывает. Если конфигурация git не задаёт адрес электронной почты, `sheriff approve` отказывается работать."),
    keep(K, "After it records the approvals"),
  ];
  rep(K, p.examples[0], "en", "one approval for the node in each new row", "one approval of the node in each new row");
  rep(K, p.examples[0], "ru", "по одному одобрению для узла в каждой новой строке", "по одному одобрению узла в каждой новой строке");
  addRef(p, "cites", "s-5ah25f6gy99panq");
  rep(K, drafts[K], "stage3", "Approving a TableRule also appends an approval for each node in its cells that has no approval of its current wording in force, in the order of the rows.", "Approving a TableRule also approves each node in its cells as a node that the run names, appending its approval unless one of its current wording is in force, in the order of the rows and, within a row, of the columns.");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-11-withdraw: review a, W1 to W4 (W4 as the brief settles it), A3 to A5; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-11-withdraw";
  const p = prop(K);
  p.parts = [
    mod(K, "`sheriff approve --withdraw <sid>...` withdraws",
      "`sheriff approve --withdraw <sid>...` withdraws the approval of each node that it names (§s-fpq35tf3pehgk64). Where an approval of a wording (§s-5ah25f6gy99panq) of such a node is in force, whether or not the node holds that wording, it appends to `specs/_approvals.jsonl` a line that withdraws that approval (§s-v4qus7raqnwzneb). Each such line names whoever runs the command. It appends these lines in the order of the first line in the file for each of those wordings.",
      "`sheriff approve --withdraw <sid>...` отзывает одобрение каждого узла, который он называет (§s-fpq35tf3pehgk64). Если одобрение формулировки (§s-5ah25f6gy99panq) такого узла в силе, — есть ли эта формулировка в узле или нет, — он добавляет в `specs/_approvals.jsonl` строку, которая отзывает это одобрение (§s-v4qus7raqnwzneb). Каждая такая строка называет того, кто запустил команду. Эти строки он добавляет в порядке первых строк файла для каждой из этих формулировок.",
      find(K, "`sheriff approve --withdraw <sid>...` withdraws").change + " Новое в тексте: порядок строк — так делает код (approvals.ts)."),
    keep(K, "`sheriff approve --withdraw` then sets"),
    P("Where a node that `sheriff approve --withdraw` names is a `TableRule` (§s-5fewsp22mmdz7y6), the command withdraws only the approvals of the table's own wordings. To withdraw the approval of a node in a cell of the table, whoever runs the command names that node.",
      "Если узел, который называет `sheriff approve --withdraw`, — `TableRule` (§s-5fewsp22mmdz7y6), команда отзывает только одобрения формулировок самой таблицы. Чтобы отозвать одобрение узла в ячейке таблицы, тот, кто запускает команду, называет этот узел.",
      "Новое: правило 1.3.7 говорит об отзыве одобрения одного узла, а правило 1.3.4 позволяет одобрить всю таблицу сразу, но не отозвать вместе с её одобрением одобрения узлов в её ячейках. Поэтому отзыв касается только самой таблицы, а одобрение узла в ячейке отзывают, называя этот узел."),
    mod(K, "`sheriff approve --withdraw` records a withdrawal",
      "`sheriff approve --withdraw` records a withdrawal by whoever runs it, whether or not they are among the node's owners. It refuses each of the following:",
      "`sheriff approve --withdraw` записывает отзыв того, кто его запустил, — есть ли он среди ответственных за узел или нет. Он отвергает каждое из следующего:"),
    mod(K, "a sid that names no node", SID_REFUSAL_EN, SID_REFUSAL_RU),
    mod(K, "a section, and the header", DERIVED_EN + ".", DERIVED_RU + "."),
    mod(K, "Each refusal names the sid concerned.",
      "Each refusal names the sid concerned. Where `sheriff approve --withdraw` refuses any sid that the run names, it records nothing. Where git's configuration sets no email address, `sheriff approve --withdraw` refuses to run.",
      "Каждый отказ называет соответствующий sid. Если `sheriff approve --withdraw` отвергает хотя бы один sid, который называет запуск, он ничего не записывает. Если конфигурация git не задаёт адрес электронной почты, `sheriff approve --withdraw` отказывается работать.",
      "Новое в тексте: запуск записывает всё или ничего, а без адреса в git команда не работает, — так делает код (approvals.ts, cli.ts)."),
    P("After it records the withdrawals, `sheriff approve --withdraw` runs `sheriff reindex` (§s-ztseyetus7np6br).",
      "Записав отзывы, `sheriff approve --withdraw` запускает `sheriff reindex` (§s-ztseyetus7np6br).",
      "Новое в тексте: так делает код (cli.ts)."),
  ];
  rep(K, p.examples[0], "en", "finds R wrong", "finds that R is wrong");
  rep(K, p.examples[0], "ru", "считает R ошибочным", "считает, что R ошибочно");
  addRef(p, "cites", "s-5fewsp22mmdz7y6");
  drafts[K].stage3 += " A TableRule's withdrawal withdraws only the approvals of the table's own wordings; the lines follow the order of the first line for each wording, as standingPrints already gives it.";
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-2-entries: review b, findings 1 to 4; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-2-entries";
  const p = prop(K);
  p.parts = [
    keep(K, "`sheriff.config.json` (§s-zefk589ykh37b8u) keeps the entries"),
    keep(K, "`approvalStatus`, for"),
    keep(K, "`strict`, for"),
    mod(K, "`extensions`, for",
      "`extensions`, for the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g): each entry holds `name`, whose value is the name of an extension (§s-zefk589ykh37b8u), `chosen`, whose value is `true` or `false`, and `by`.",
      "`extensions` — для расширений guidelines, которые выбрал проект (§s-9ttvcwpqkehm58g): каждая запись содержит `name`, значение которого — имя расширения (§s-zefk589ykh37b8u), `chosen` со значением `true` или `false` и `by`."),
    mod(K, "The value of an entry's `by`",
      "An entry's `by` holds the email address of the owner who made the change. An entry holds only the keys given above for its list.",
      "`by` записи содержит адрес электронной почты ответственного, сделавшего изменение. Запись содержит только ключи, названные выше для её списка."),
    mod(K, "`sheriff settings` appends each entry",
      "`sheriff settings` appends each entry to the end of its list. In a commit, each list begins with the entries that the commit's parent holds in that list (§s-j9r8z4xdrfkfs47). So the last entry of a list is the latest.",
      "`sheriff settings` добавляет каждую запись в конец её списка. В коммите каждый список начинается с записей, которые этот список содержит в родительском коммите (§s-j9r8z4xdrfkfs47). Поэтому последняя запись списка — самая поздняя."),
    mod(K, "The specification's approval status and its `strict` flag",
      "The specification's approval status and its `strict` flag each have the value that the last entry of its list sets. The project has chosen exactly those extensions for which the last entry that names the extension sets `chosen` to `true`.",
      "Статус одобрения спецификации и её флаг `strict` имеют каждый то значение, которое задаёт последняя запись его списка. Проект выбрал ровно те расширения, для которых последняя запись, называющая расширение, ставит `chosen` в `true`."),
    mod(K, "Where `approvalStatus` holds no entry",
      "Where `sheriff.config.json` holds no entry for the approval status, no owner has approved the specification, so the specification is a draft (§s-9g7jj8z4yf9kq93). Where it holds no entry for the `strict` flag, the flag has the value that the schema of `sheriff.config.json` gives as the `default` of an entry's `on` (§s-zefk589ykh37b8u).",
      "Если в `sheriff.config.json` нет ни одной записи статуса одобрения, ни один ответственный не одобрял спецификацию, поэтому она черновик (§s-9g7jj8z4yf9kq93). Если в нём нет ни одной записи флага `strict`, флаг имеет значение, которое схема `sheriff.config.json` задаёт как `default` для `on` записи (§s-zefk589ykh37b8u)."),
    keep(K, "`sheriff settings` records an entry only where"),
  ];
  p.reason = "The entries keep every change that an owner made to these settings, each with the address of the owner who made it, while the last entry of each list sets the value of its setting. `sheriff reindex` writes an entry in place of the rule by which an earlier release approved the specification (§s-gb8s9657a65hqmv). Since no entry holds anything that depends on when it is written, the check of the entries (§s-j9r8z4xdrfkfs47) never takes the entry that `sheriff reindex` writes for a changed one.";
  p.ruReason = "Записи хранят каждое изменение этих настроек ответственным вместе с адресом ответственного, который его сделал, а значение каждой настройки задаёт последняя запись её списка. `sheriff reindex` пишет запись вместо правила, которым прежний выпуск одобрял спецификацию (§s-gb8s9657a65hqmv). Поскольку ни одна запись не содержит ничего, что зависит от времени её создания, проверка записей (§s-j9r8z4xdrfkfs47) никогда не принимает запись, которую пишет `sheriff reindex`, за изменённую.";
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-2-approve-spec: review b, findings 5 to 7 (7 as the brief settles it); review d's cut; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-2-approve-spec";
  const p = prop(K);
  p.parts = [
    mod(K, "Before `sheriff settings` records an entry",
      "Before `sheriff settings` records an entry that approves the specification (§s-chsfpkgpmfk4fft, §s-d3nkw9b6mn98vuw), it runs every check that the rule on the specification's approval status requires before the specification is approved (§s-qzthyh7yqvfhsa2). These are the checks that `sheriff validate`, `sheriff binding` and `sheriff citations` make (§s-4kd2pave7vm4hmd), and the check for a node from which nothing is generated, which `sheriff types` makes (§s-f8fmudceuyaj942).",
      "Прежде чем `sheriff settings` вносит запись, которая одобряет спецификацию (§s-chsfpkgpmfk4fft, §s-d3nkw9b6mn98vuw), она выполняет каждую проверку, которую правило о статусе одобрения спецификации требует перед одобрением спецификации (§s-qzthyh7yqvfhsa2). Это проверки, которые делают `sheriff validate`, `sheriff binding` и `sheriff citations` (§s-4kd2pave7vm4hmd), и проверка узла, из которого ничего не генерируется, которую делает `sheriff types` (§s-f8fmudceuyaj942).",
      find(K, "Before `sheriff settings` records an entry").change + " Проверка строки 10.1.39b названа среди них, поэтому то, что она находит, тоже требует подтверждения ответственного."),
    mod(K, "These checks read the specification as approved",
      "These checks read the specification as approved, whatever the entries in `sheriff.config.json` set. They judge the files in the working tree as if one commit added the following:",
      "Эти проверки считают спецификацию одобренной, что бы ни задавали записи в `sheriff.config.json`. Файлы рабочего дерева они оценивают так, будто один коммит добавил следующее:"),
    keep(K, "each node of the specification in the files"),
    mod(K, "the approval in force of each approved node",
      "the approval that is in force for each approved node (§s-v4qus7raqnwzneb);",
      "одобрение, которое в силе для каждого одобренного узла (§s-v4qus7raqnwzneb);"),
    mod(K, "all of the system's code",
      "all of the system's code (§s-hheus6f395ynqvc), including its tests;",
      "весь код системы (§s-hheus6f395ynqvc), включая его тесты;"),
    L("the bindings file (§s-trwczfskj5zmuft).",
      "файл привязок (§s-trwczfskj5zmuft).",
      "Новое: файл привязок связывает код со спецификацией, а правило 10.6 требует перед одобрением проверок всей спецификации и всего кода. Иначе ответственный не увидел бы отказов по записям файла привязок."),
    mod(K, "The checks treat everything else",
      "The checks treat everything else that the repository keeps, such as the archive (§s-f2b5zvc565s242f), the other lines of `specs/_approvals.jsonl` and the entries in `sheriff.config.json`, as unchanged by that commit. The project's own checks (§s-2fau85dfyyeq66m) receive a model of the specification (§s-w6gybeqn2ttydqx) in which the specification is approved and its `strict` flag (§s-q3pfzyaxvpr2zj2) has the value that those entries set (§s-7pk89t8z6wymmj9).",
      "Всё остальное, что хранит репозиторий, например архив (§s-f2b5zvc565s242f), остальные строки `specs/_approvals.jsonl` и записи в `sheriff.config.json`, проверки считают не изменённым этим коммитом. Собственные проверки проекта (§s-2fau85dfyyeq66m) получают модель спецификации (§s-w6gybeqn2ttydqx), в которой спецификация одобрена, а флаг `strict` (§s-q3pfzyaxvpr2zj2) имеет значение, которое задают эти записи (§s-7pk89t8z6wymmj9).",
      find(K, "The checks treat everything else").change.replace("Какую модель получают собственные проверки проекта, уже говорит согласованный узел «How a project's own check is run».", "Какую модель получают собственные проверки проекта, сказано прямо, как это говорит согласованный узел «How a project's own check is run».")),
    mod(K, "`sheriff settings` also names each node",
      "`sheriff settings` makes the check for a node from which nothing is generated as `sheriff types` does (§s-a8fn72xa782wvbk), but writes no file.",
      "Проверку узла, из которого ничего не генерируется, `sheriff settings` делает так же, как `sheriff types` (§s-a8fn72xa782wvbk), но не пишет ни одного файла."),
    mod(K, "`sheriff settings` shows the owner",
      "`sheriff settings` shows the owner who approves the specification what these checks find: every refusal, warning and report. Where they find nothing, it records the entry. Otherwise, it records the entry only after the owner confirms the approval, as the node on `sheriff settings` says (§s-chsfpkgpmfk4fft).",
      "`sheriff settings` показывает ответственному, который одобряет спецификацию, всё, что находят эти проверки: каждый отказ, предупреждение и отчёт. Если они ничего не находят, она вносит запись. Иначе она вносит запись только после того, как ответственный подтвердит одобрение, как говорит узел о `sheriff settings` (§s-chsfpkgpmfk4fft)."),
    mod(K, "While the `strict` flag",
      "While the `strict` flag is on, `sheriff settings` first runs the checks that the flag makes stricter, as it does when asked to turn the flag on (§s-nxgkp988mej79eg). Where any of them would refuse a commit that changes nothing, `sheriff settings` refuses to record the approval and makes no other check. That refusal is the same as the one that `sheriff settings` gives when it refuses to turn the flag on.",
      "Пока флаг `strict` включён, `sheriff settings` сначала выполняет проверки, которые флаг делает строже, так же как когда её просят включить флаг (§s-nxgkp988mej79eg). Если хотя бы одна из них отвергла бы коммит, который ничего не меняет, `sheriff settings` отказывается вносить одобрение и других проверок не выполняет. Этот отказ — такой же, как тот, который `sheriff settings` даёт, когда отказывается включить флаг."),
  ];
  p.reason = "The checks at a commit judge only what the commit contains, so they never show everything that the specification and the code still lack (§s-qzthyh7yqvfhsa2). The checks before an approval judge the whole specification and all of the code as one commit, so they show the owner everything that is still missing before the owner approves the specification.";
  p.ruReason = "Проверки при коммите оценивают только то, что содержит коммит, поэтому никогда не показывают всего, чего ещё не хватает спецификации и коду (§s-qzthyh7yqvfhsa2). Проверки перед одобрением оценивают всю спецификацию и весь код как один коммит, поэтому показывают ответственному всё, чего ещё не хватает, до того как он одобрит спецификацию.";
  rep(K, p.examples[0], "en", "The owner agrees, and", "The owner agrees to the approval, and");
  rep(K, p.examples[0], "ru", "Ответственный соглашается, и", "Ответственный соглашается на одобрение, и");
  addRef(p, "cites", "s-2fau85dfyyeq66m");
  addRef(p, "cites", "s-trwczfskj5zmuft");
  drafts[K].stage3 = drafts[K].stage3.replace("and none of the nodes, the approvals in force or the system's code and tests,", "and none of the nodes, the approvals in force, the system's code and tests or sheriff.bindings.json,");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-2-strict: review d (the first paragraph, the example, the reason, the cut); the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-2-strict";
  const p = prop(K);
  p.parts = [
    P("`sheriff settings` (§s-chsfpkgpmfk4fft) refuses to turn the `strict` flag on (§s-q3pfzyaxvpr2zj2) where a check that the flag makes stricter would refuse a commit or push that changes nothing. It makes these checks on the files in the working tree, as if the specification were approved and the flag were on. The refusal names, for each check that would refuse, the command that lists what that check finds. Where no such check would refuse, `sheriff settings` records the entry that turns the flag on (§s-d3nkw9b6mn98vuw).",
      "`sheriff settings` (§s-chsfpkgpmfk4fft) отказывается включить флаг `strict` (§s-q3pfzyaxvpr2zj2), если проверка, которую флаг делает строже, отвергла бы коммит или push, который ничего не меняет. Эти проверки она выполняет над файлами рабочего дерева так, будто спецификация одобрена, а флаг включён. Отказ называет для каждой проверки, которая отвергла бы такой коммит или push, команду, перечисляющую то, что эта проверка находит. Если ни одна такая проверка его не отвергла бы, `sheriff settings` вносит запись, которая включает флаг (§s-d3nkw9b6mn98vuw).",
      "Новое, по правилу 10.7 (ваше решение от 2026-11-17). Проверки выполняются над файлами рабочего дерева, как и перед одобрением спецификации."),
    P("The checks that the `strict` flag makes stricter, the cases in which each would refuse such a commit or push, and the command that its refusal names are the following:",
      "Проверки, которые флаг `strict` делает строже, случаи, в которых каждая из них отвергла бы такой коммит или push, и команда, которую называет её отказ, — следующие:",
      "Новое: этот узел сам называет команду в каждом отказе, поэтому последний абзац узла о `sheriff settings`, который говорит то же, можно будет убрать, когда тот узел изменится."),
    L("the check for code and tests outside the commit (§s-3xx2eukc8gtd2tx) that no SpecTag (§s-8xw4mgvpexyvw5q) binds: it would refuse where `sheriff untagged` (§s-weuyx98r7c923ab) would list any code, and its refusal names `sheriff untagged`;",
      "проверка кода и тестов вне коммита (§s-3xx2eukc8gtd2tx), которые не связывает ни один SpecTag (§s-8xw4mgvpexyvw5q): она отвергла бы, если `sheriff untagged` (§s-weuyx98r7c923ab) перечислила бы хоть какой-то код, и её отказ называет `sheriff untagged`;",
      find(K, "the check of code and tests outside the commit").change),
    L("each of the project's own checks (§s-2fau85dfyyeq66m), any of which the rule that lists it may make stricter (§s-q3pfzyaxvpr2zj2): such a check would refuse where `sheriff validate --strict` refuses the change because of it (§s-7pk89t8z6wymmj9), and its refusal names `sheriff validate --strict`.",
      "каждая собственная проверка проекта (§s-2fau85dfyyeq66m), любую из которых правило, перечисляющее её, может сделать строже (§s-q3pfzyaxvpr2zj2): такая проверка отвергла бы, если `sheriff validate --strict` отвергает изменение из-за неё (§s-7pk89t8z6wymmj9), и её отказ называет `sheriff validate --strict`.",
      find(K, "each of the project's own checks").change),
  ];
  p.reason = "The flag lets the owners make the checks stricter by an act of their own without stopping all work when they do (§s-q3pfzyaxvpr2zj2). Turned on while a check that it makes stricter would refuse a commit that changes nothing, the flag would make every commit fail, or keep the specification from being approved, until that check passed.";
  p.ruReason = "Флаг позволяет ответственным сделать проверки строже собственным действием, не останавливая при этом всю работу (§s-q3pfzyaxvpr2zj2). Включённый, пока проверка, которую он делает строже, отвергла бы коммит, который ничего не меняет, флаг заставил бы отвергать каждый коммит или не дал бы одобрить спецификацию, пока эта проверка не пройдёт.";
  p.examples = [X(
    "The specification is a draft, and no SpecTag binds two functions in an old file. An owner runs `sheriff settings strict on`. `sheriff settings` refuses to turn the flag on and names `sheriff untagged`, which lists those functions. The most likely mistake is to turn the flag on because the specification is a draft. `sheriff settings` then refuses to approve the specification until a SpecTag binds both functions.",
    "Спецификация — черновик, и две функции в старом файле не связывает ни один SpecTag. Ответственный запускает `sheriff settings strict on`. `sheriff settings` отказывается включить флаг и называет `sheriff untagged`, которая перечисляет эти функции. Самая вероятная ошибка — включить флаг, потому что спецификация — черновик. Тогда `sheriff settings` отказывается одобрить спецификацию, пока SpecTag не свяжет обе функции.")];
  drafts[K].stage3 = "sheriff settings does not exist yet. Its strict on is to list, on the files in the working tree, the code that sheriff untagged lists and to run the project's own checks as sheriff validate --strict runs them (validate.ts), refusing and naming sheriff untagged or sheriff validate --strict for each that finds anything. Its tests are written first.";
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-2-extension-off: review b, findings 8 and 9 (9 as the brief settles it); the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-2-extension-off";
  const p = prop(K);
  p.parts = [
    mod(K, "`sheriff settings` refuses to record an entry that withdraws",
      "`sheriff settings` refuses to record an entry that withdraws the choice of an extension of the guidelines (§s-9ttvcwpqkehm58g, §s-d3nkw9b6mn98vuw) while anything depends on that extension (§s-j8y62pa9hzz6nwx). The refusal names each node that depends on the extension by its file, its sid and its location (§s-kag2m9tzdnduxdx). Where nothing depends on the extension, `sheriff settings` records the entry.",
      "`sheriff settings` отказывается вносить запись, которая отзывает выбор расширения guidelines (§s-9ttvcwpqkehm58g, §s-d3nkw9b6mn98vuw), пока от этого расширения что-нибудь зависит (§s-j8y62pa9hzz6nwx). Отказ называет каждый узел, который зависит от расширения, по его файлу, sid и расположению (§s-kag2m9tzdnduxdx). Если от расширения ничего не зависит, `sheriff settings` вносит запись."),
    keep(K, "A node other than the extension's own nodes"),
    keep(K, "the node's kind is one that"),
    keep(K, "the node holds a property"),
    keep(K, "the node has a link whose type"),
    keep(K, "the node has a link that holds"),
    keep(K, "the node has a link to a node"),
    P("A node of the archive (§s-f2b5zvc565s242f) depends on the extension where its kind is one that the `kinds` of the extension's schema add. The refusal names such a node by its file and its location, since it has no sid.",
      "Узел архива (§s-f2b5zvc565s242f) зависит от расширения, если его тип — один из тех, что добавляют `kinds` схемы расширения. Такой узел отказ называет по его файлу и расположению, потому что sid у него нет.",
      "Новое: после отзыва узел архива такого типа не прошёл бы проверку схемы при следующем коммите, а именно от этой ошибки предостерегает пример правила 1.7.6. sid у узла архива нет (правило 2.6)."),
    P("A reference in the project's extension of the schema (§s-xm8rz4uupb73gu5) depends on the extension where it points to a definition that the `$defs` of the extension's schema add (§s-xzcw3hv4hmxz7h7). The refusal names such a reference by the file of the project's extension of the schema and the JSON Pointer of the reference.",
      "Ссылка в расширении схемы проекта (§s-xm8rz4uupb73gu5) зависит от расширения, если она указывает на определение, которое добавляют `$defs` схемы расширения (§s-xzcw3hv4hmxz7h7). Такую ссылку отказ называет по файлу расширения схемы проекта и указателю JSON Pointer на эту ссылку.",
      "Новое: без такого определения схема спецификации, составленная после отзыва, не разрешила бы ссылку, и следующий коммит не прошёл бы проверку схемы. В схеме расширения RecordType такие определения есть уже сейчас."),
    mod(K, "`sheriff settings` checks each node",
      "`sheriff settings` checks each node in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6), each node of the archive and each reference in the project's extension of the schema. It makes this check regardless of whether the specification is approved or a draft.",
      "`sheriff settings` проверяет каждый узел в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6), каждый узел архива и каждую ссылку в расширении схемы проекта. Эту проверку она выполняет независимо от того, одобрена спецификация или она черновик.",
      find(K, "`sheriff settings` checks each node").change + " Проверяются и узлы архива, и ссылки в расширении схемы проекта."),
  ];
  p.reason = "An extension's schema declares, and its file holds, everything that the extension adds, so those two show everything that withdrawing the choice of the extension would leave relying on rules and definitions that no longer hold in the project (§s-j8y62pa9hzz6nwx).";
  p.ruReason = "Схема расширения объявляет, а его файл содержит всё, что добавляет расширение, поэтому по ним видно всё, что отзыв выбора расширения оставил бы опирающимся на правила и определения, которые в проекте больше не действуют (§s-j8y62pa9hzz6nwx).";
  rep(K, p.examples[0], "en", "and its base specification holds a RecordType", "and the project's base specification holds a RecordType");
  rep(K, p.examples[0], "ru", "и его базовая спецификация содержит RecordType", "и базовая спецификация проекта содержит RecordType");
  addRef(p, "cites", "s-f2b5zvc565s242f");
  addRef(p, "cites", "s-xm8rz4uupb73gu5");
  addRef(p, "cites", "s-xzcw3hv4hmxz7h7");
  drafts[K].stage3 += " It is also to refuse while a node of the archive has a kind that the extension's kinds add, naming it by its file and location, and while specs/_schema/project.schema.json holds a $ref to a definition in the extension's $defs, naming the file and the JSON Pointer of the reference.";
}

// ---------------------------------------------------------------------------------------------------------------
// s-7unxytshhc4md54: review c, findings 2 to 5 (4 as the brief settles it); the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "s-7unxytshhc4md54";
  const p = prop(K);
  const SAME = "Без изменений по смыслу.";
  p.parts = [
    mod(K, "`sheriff init` sets a repository up",
      "`sheriff init` sets a repository up for the SpecSheriff tools. For the git hooks, it does the following:",
      "`sheriff init` настраивает репозиторий для инструментов SpecSheriff. Для git-хуков он делает следующее:",
      "Было: «With the git hooks, it does the following:». " + SAME),
    keep(K, "it writes them into"),
    mod(K, "it stages with the executable mode",
      "it stages each hook there that holds what it would write, with the executable mode 100755, unless git's index already holds that hook with that mode, and names each hook that it stages;",
      "добавляет в стейджинг с исполняемым режимом 100755 каждый хук там, который содержит то, что он записал бы, если индекс git ещё не содержит этот хук с этим режимом, и называет каждый хук, который добавил;",
      "Было: «it stages with the executable mode, 100755, each hook there that holds what it would write and that git's index does not already hold with that mode, naming each one;». " + SAME),
    keep(K, "where it cannot stage a hook"),
    keep(K, "it turns the hooks on"),
    mod(K, "`sheriff init` writes for the agent",
      "`sheriff init` writes the following for the agent that the option `--agent` names, `claude` or `codex`, or for `claude` where the option is not given:",
      "`sheriff init` пишет следующее для агента, которого называет параметр `--agent`, `claude` или `codex`, а без этого параметра — для `claude`:"),
    keep(K, "for `claude`, it adds"),
    keep(K, "for `codex`, it writes"),
    mod(K, "`sheriff init` refuses any other name",
      "`sheriff init` refuses any other agent name, naming the agents that it supports.",
      "Любое другое имя агента `sheriff init` отвергает, называя агентов, которых он поддерживает."),
    mod(K, "`sheriff init` has git merge",
      "`sheriff init` sets git to merge `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb) by union. What `sheriff init` does depends on the state that `git check-attr merge specs/_approvals.jsonl` reports for the `merge` attribute of that file:",
      "`sheriff init` настраивает git сливать `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb) по union. Что делает `sheriff init`, зависит от состояния, которое `git check-attr merge specs/_approvals.jsonl` сообщает для атрибута `merge` этого файла:",
      "Было: «`sheriff init` has git merge the approvals (§s-v4qus7raqnwzneb) by union. What `sheriff init` does depends on the state `git check-attr merge specs/_approvals.jsonl` reports for the approvals' merge attribute:». " + SAME),
    mod(K, "where git reports the attribute as unspecified",
      "where git reports the attribute as unspecified, `sheriff init` appends the line `specs/_approvals.jsonl merge=union` to the `.gitattributes` file at the repository's root, and writes that file where it is missing;",
      "если git сообщает, что атрибут не задан, `sheriff init` добавляет строку `specs/_approvals.jsonl merge=union` в файл `.gitattributes` в корне репозитория, а если этого файла нет, создаёт его;"),
    keep(K, "where git reports `union`"),
    keep(K, "where git reports any other state"),
    mod(K, "Outside a git repository",
      "Outside a git repository, `sheriff init` appends that line to `.gitattributes` unless the file already holds it, spacing and line endings aside. The appended line starts on a line of its own and ends with the same line ending as the other lines of the file.",
      "Вне репозитория git `sheriff init` добавляет эту строку в `.gitattributes`, если файл её ещё не содержит, без учёта пробелов и концов строк. Добавленная строка начинается с новой строки и заканчивается тем же концом строки, что и остальные строки файла.",
      "Было: «Outside a git repository, it appends the line unless the file holds it already, spacing and line endings aside. The appended line starts a line of its own and ends as the file's lines end.» " + SAME),
    mod(K, "Where they are missing",
      "`sheriff init` writes each of the following files where it is missing (§s-zefk589ykh37b8u):",
      "`sheriff init` пишет каждый из следующих файлов, если его нет (§s-zefk589ykh37b8u):"),
    keep(K, "a `sheriff.config.json` that holds only"),
    keep(K, "a `specs/_guidelines/project.json` whose top node"),
    mod(K, "That section holds, as a draft",
      "That section holds, as a draft, a rule with a `refines` link (§s-sn6au3vcr9uy5pm) to the rule on when the tests must pass (§s-x8uzc8z44pwtd3h). The rule's title is “When the tests run”. Its text is “The tests run on every push.” Its reason is “Running the tests before every push keeps a change whose tests fail from reaching the project's shared branch.”",
      "Этот раздел содержит черновик правила со связью `refines` (§s-sn6au3vcr9uy5pm) на правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h). Название правила — «When the tests run». Его текст — «The tests run on every push.». Его обоснование — «Running the tests before every push keeps a change whose tests fail from reaching the project's shared branch.».",
      find(K, "That section holds, as a draft").change + " Связь `refines` названа, потому что только по ней инструменты SpecSheriff находят это правило (согласованный узел «What the SpecSheriff tools read in the project's own guidelines»). У правила есть обоснование, как требует правило 1.2.3."),
    P("The rule's `TextRule.list` (§s-eferktypcj7njt5) lists `push` (§s-b6qdtghnyha3fhk). The list's `of` is “the moments at which the tests run”.",
      "`TextRule.list` (§s-eferktypcj7njt5) этого правила перечисляет `push` (§s-b6qdtghnyha3fhk). `of` этого списка — «the moments at which the tests run».",
      "Новое, вместе с предыдущим абзацем: так правило называет момент запуска тестов, который читает узел «Running the tests before a push»."),
    keep(K, "Where git's configuration sets no email address"),
    P("Where `sheriff.config.json` holds an empty list of glob patterns for code or for tests, or holds no `testCommand`, `sheriff init` says how to set what it lacks (§s-b6qdtghnyha3fhk).",
      "Если в `sheriff.config.json` пуст список glob-шаблонов кода или тестов или нет `testCommand`, `sheriff init` говорит, как задать недостающее (§s-b6qdtghnyha3fhk).",
      "Новое в тексте: так делает код (init.ts) для `sheriff.config.json`, который он пишет. Когда ответственный одобрит правило о моменте запуска тестов, хук pre-push отвергает каждый push, пока `testCommand` не задан (узел «Running the tests before a push»), поэтому подсказка нужна и тогда, когда файл уже был."),
    mod(K, "`sheriff init` replaces a hook",
      "`sheriff init` replaces a hook, or a declaration that it writes into `.claude/settings.json` or `.codex/hooks.json`, where that hook or declaration holds what an earlier release of `sheriff init` wrote, and names each. It leaves as it is any other file that differs from what it would write, and names that file. So, run again, `sheriff init` changes nothing (§s-jsqxdx47wkkj7gp).",
      "`sheriff init` заменяет хук или объявление, которое он пишет в `.claude/settings.json` или `.codex/hooks.json`, если этот хук или объявление содержит то, что писал прежний выпуск `sheriff init`, и называет каждое. Любой другой файл, который отличается от того, что он записал бы, он оставляет как есть и называет. Поэтому при повторном запуске `sheriff init` ничего не меняет (§s-jsqxdx47wkkj7gp).",
      find(K, "`sheriff init` replaces a hook").change + " Объявление пояснено при первом упоминании: это то, что `sheriff init` пишет в `.claude/settings.json` или `.codex/hooks.json`."),
    keep(K, "A hook or a declaration holds"),
    mod(K, "Where the repository's hooks ran from elsewhere",
      "Where the repository's hooks ran from elsewhere before, from `.git/hooks/` or from another folder that `core.hooksPath` named, `sheriff init` names each hook found there, apart from git's samples. It says that each one does not run until it is moved into `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p).",
      "Если раньше хуки репозитория запускались из другого места — из `.git/hooks/` или из другой папки, которую называл `core.hooksPath`, — `sheriff init` называет каждый найденный там хук, кроме образцов git. Он говорит, что каждый из них не запускается, пока его не переместят в `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p).",
      "Было: «… It says that each one no longer runs until it is moved into `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p).» " + SAME),
    mod(K, "`sheriff remove` takes out",
      "`sheriff remove` takes out of a repository what `sheriff init` writes outside `specs/`, for each agent that `sheriff init` supports:",
      "`sheriff remove` убирает из репозитория то, что `sheriff init` пишет вне `specs/`, для каждого агента, которого поддерживает `sheriff init`:"),
    keep(K, "each git hook, the marketplace"),
    mod(K, "each line of the `.gitattributes`",
      "each line of the `.gitattributes` file at the repository's root that matches the line that `sheriff init` appends there, spacing and line endings aside;",
      "каждую строку файла `.gitattributes` в корне репозитория, которая без учёта пробелов и концов строк совпадает со строкой, которую туда добавляет `sheriff init`;",
      "Было: «each line of the `.gitattributes` at the repository's root that is the line `sheriff init` appends there, spacing and line endings aside;». " + SAME),
    keep(K, "`core.hooksPath`, where"),
    keep(K, "a key of `.claude/settings.json`"),
    keep(K, "`.gitattributes`, where"),
    keep(K, "`.githooks/`, `.claude/`"),
    keep(K, "`sheriff.config.json`, whatever"),
    keep(K, "`sheriff remove` leaves each hook"),
    keep(K, "`sheriff remove` stages nothing"),
  ];
  p.reason = "Adopting the method and removing it each take one command, so that nobody has to know every file and setting that the SpecSheriff tools need. What `sheriff init` writes reaches every clone through git, so the checks run the same way for everyone who works on the project (§s-epaw9sgyaajzn8g). Each command changes only what serves the SpecSheriff tools, and leaves the rest of the repository to the project.";
  p.ruReason = "Принять метод можно одной командой, и отказаться от него — тоже одной, чтобы никому не нужно было знать все файлы и настройки, которые нужны инструментам SpecSheriff. То, что пишет `sheriff init`, попадает в каждый клон через git, поэтому проверки работают одинаково для всех, кто работает над проектом (§s-epaw9sgyaajzn8g). Каждая из команд меняет только то, что служит инструментам SpecSheriff, а остальное в репозитории оставляет проекту.";
  p.examples = [
    X("Someone runs `sheriff init` in a project on Windows. Git on Windows does not read the executable mode from a file, so `sheriff init` stages with the mode 100755 each hook that it wrote and names it. The most likely mistake is to make the hooks executable on disk only: git on Windows does not record that mode, so a clone on Linux or macOS runs none of the hooks.",
      "Кто-то запускает `sheriff init` в проекте на Windows. Git на Windows не читает исполняемый режим из файла, поэтому `sheriff init` добавляет в стейджинг с режимом 100755 каждый записанный им хук и называет его. Самая вероятная ошибка — сделать хуки исполняемыми только на диске: git на Windows этот режим не записывает, и клон на Linux или macOS не запускает ни одного хука."),
    X("Two branches each approve a node, and each appends a line to `specs/_approvals.jsonl`. Because `sheriff init` set git to merge that file by union, the merge keeps both lines and puts the line of the branch being merged last. Without the union merge, git raises a conflict in that file. The most likely mistake is to resolve that conflict by keeping the lines of one branch, which loses the approval made on the other branch.",
      "Две ветки одобряют по узлу, и каждая добавляет строку в `specs/_approvals.jsonl`. Поскольку `sheriff init` настроил git сливать этот файл по union, слияние сохраняет обе строки и ставит строку вливаемой ветки последней. Без слияния по union git сообщает о конфликте в этом файле. Самая вероятная ошибка — разрешить этот конфликт, оставив строки одной ветки: так теряется одобрение, сделанное в другой ветке."),
    X("The owner runs `sheriff init` in a new repository. `project.json` then holds a section that names the owner and holds, as a draft, the rule on when the tests run. So the first commit passes the check that every section contains a rule (§s-exxuckgakfxkycp). The most likely mistake is to write the section without a rule, which that check refuses.",
      "Ответственный запускает `sheriff init` в новом репозитории. Тогда `project.json` содержит раздел, который называет ответственного и содержит черновик правила о том, когда запускаются тесты. Поэтому первый коммит проходит проверку того, что каждый раздел содержит правило (§s-exxuckgakfxkycp). Самая вероятная ошибка — записать раздел без правила, который эта проверка отвергает."),
  ];
  addRef(p, "cites", "s-sn6au3vcr9uy5pm");
  drafts[K].stage3 += " The draft rule also gets the reason “Running the tests before every push keeps a change whose tests fail from reaching the project's shared branch.” The hint on the glob patterns and on testCommand, which init.ts gives only for the sheriff.config.json that it writes, is also to be given where an existing sheriff.config.json lacks them; its test is written first.";
}

// ---------------------------------------------------------------------------------------------------------------
// proposal:s-gb8s9657a65hqmv-g6: review c, findings 1 to 4 (3 as the brief settles it).
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "proposal:s-gb8s9657a65hqmv-g6";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const AGREED_CITE = "Как в согласованной формулировке; добавлена ссылка при первом упоминании (правило 7.2.7).";
  const first = parts[at(parts, "`sheriff reindex` rewrites whatever")];
  rep(K, first, "en", "of the specification and of its archive, it makes", "of the specification and of its archive (§s-f2b5zvc565s242f), it makes");
  rep(K, first, "ru", "спецификации и её архива он вносит", "спецификации и её архива (§s-f2b5zvc565s242f) он вносит");
  first.change = AGREED_CITE;
  const removed = parts[at(parts, "`TextRule.list.declaredIn` is removed")];
  rep(K, removed, "en", "`TextRule.list.declaredIn` is removed", "`TextRule.list.declaredIn` (§s-eferktypcj7njt5) is removed");
  rep(K, removed, "ru", "`TextRule.list.declaredIn` удаляется", "`TextRule.list.declaredIn` (§s-eferktypcj7njt5) удаляется");
  removed.change = AGREED_CITE;
  const replaced = parts[at(parts, "until `sheriff.config.json` holds an entry")];
  rep(K, replaced, "en", "is replaced by an entry that approves the specification;", "is replaced by an entry that approves the specification (§s-d3nkw9b6mn98vuw);");
  rep(K, replaced, "ru", "уступает место записи, которая одобряет спецификацию;", "уступает место записи, которая одобряет спецификацию (§s-d3nkw9b6mn98vuw);");
  replaced.change = "Как в согласованной формулировке; добавлена ссылка на узел, который задаёт вид записи (правило 7.2.7).";
  const archived = at(parts, "that rule is moved to the archive");
  parts.splice(archived + 1, 0, L(
    "until `sheriff.config.json` holds an entry that sets the specification's approval status, a draft rule of `project.json` that refines the rule on that status is removed (§s-f2b5zvc565s242f);",
    "пока в `sheriff.config.json` нет записи, задающей статус одобрения спецификации, черновик правила `project.json`, которое уточняет правило об этом статусе, удаляется (§s-f2b5zvc565s242f);",
    "Новое: правило, которое одобряло спецификацию, вы заменили записями (решение от 2026-11-13: статус задаёт запись ответственного, без правила посредине), а черновик такого правила, который писал каждый прежний `sheriff init`, оставался бы в `project.json`. Если бы ответственный его одобрил, следующий `sheriff reindex` одобрил бы спецификацию без проверок правила 10.6. Правило, которое ни разу не было одобрено, удаляется, а не уходит в архив (правило 2.6)."));
  const tests = parts[at(parts, "where `project.json` then holds no rule")];
  tests.en = "where `project.json`, once such a rule is archived or removed, holds no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added under the top node of `project.json`;";
  tests.ru = "если после переноса в архив или удаления такого правила в `project.json` нет правила, которое уточняет правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h), под верхний узел `project.json` добавляется черновик правила о том, когда запускаются тесты, который пишет `sheriff init` (§s-7unxytshhc4md54);";
  rep(K, tests, "change", "Правило, которым прежний выпуск одобрял спецификацию, уходит в архив, и раздел `project.json`, где оно было единственным правилом, остался бы без правила;", "Правило, которым прежний выпуск одобрял спецификацию, уходит в архив, а его черновик удаляется, и раздел `project.json`, где оно было единственным правилом, остался бы без правила;");
  rep(K, tests, "change", "Правило пишется только при переносе, поэтому", "Правило пишется только в том запуске, который переносит в архив или удаляет правило об одобрении, поэтому");
  const named = parts[at(parts, "`sheriff reindex` names the rule on when the tests run")];
  named.en = "When `sheriff reindex` adds the draft rule on when the tests run, it names that rule, since the SpecSheriff tools read the rule only after an owner approves it (§s-t9j29hppag2nren).";
  named.ru = "Добавив черновик правила о том, когда запускаются тесты, `sheriff reindex` называет это правило, потому что инструменты SpecSheriff читают его только после того, как его одобрит ответственный (§s-t9j29hppag2nren).";
  const files = parts[at(parts, "`sheriff reindex` names each file that it rewrites")];
  files.en = "`sheriff reindex` names each file that it rewrites because an earlier release wrote or read that file differently, including the files of the specification.";
  files.ru = "`sheriff reindex` называет каждый файл, который он переписывает потому, что прежний выпуск записал или прочитал этот файл иначе, в том числе файлы спецификации.";
  files.change = "Было: «`sheriff reindex` names each file that it changes in this way, including the files of the specification.» Без изменений по смыслу. «In this way» указывало назад на переименования из предыдущего предложения, хотя речь шла обо всех изменениях узла; теперь это сказано прямо, словами первого предложения узла: «wrote or read».";
  p.parts = parts;
  addRef(p, "cites", "s-eferktypcj7njt5");
  addRef(p, "cites", "s-d3nkw9b6mn98vuw");
  const e = drafts[K];
  e.change = "Добавлены два пункта. Первый: пока нет записи о статусе одобрения, черновик правила `project.json` об этом статусе, который писал каждый прежний `sheriff init`, удаляется: статус задаёт только запись ответственного (ваше решение от 2026-11-13), а одобренный черновик иначе одобрил бы спецификацию без проверок правила 10.6. Второй: если после переноса в архив или удаления правила об одобрении в `project.json` нет правила, которое уточняет правило 1.6.4 о том, когда тесты должны проходить, `sheriff reindex` добавляет то же правило-черновик о моменте запуска тестов с `push`, что пишет `sheriff init`, и называет его. Почему: иначе раздел `project.json`, где правило об одобрении было единственным (так в этом репозитории), остался бы без правила, и строка 10.1.18 отвергла бы первый коммит после обновления; а проект, у которого при прежнем выпуске хук pre-push запускал тесты, потерял бы это молча. Сценарий вместо ручного шага — по вашему правилу «What can run as a deterministic process is automated». Ещё добавлены переименования ключа `declaration` внутри `jsonSchema` и `valueList` в `pointer` и `symbol` (ваши решения от 2026-11-13 по строке 10.1.35), на которые опирается узел об отпечатке. Ссылка за отпечатком ведёт на новый узел «The fingerprint of a node's wording». Добавлены ссылки при первом упоминании архива, `TextRule.list`, записи, расширения guidelines, кода системы и собственных проверок и генераторов проекта (правило 7.2.7). Последний абзац больше не говорит «in this way», а повторяет «wrote or read» из первого предложения узла. Остальная формулировка — как вы согласовали.";
  e.stage3 = "reindex.ts is to remove, until sheriff.config.json holds an entry for the approval status, a draft rule of project.json that refines s-qzthyh7yqvfhsa2. In the run in which it removes such a draft rule, or replaces such an approved rule with an entry, it is then to add under the top node of project.json the draft rule that sheriff init writes (s-7unxytshhc4md54), with a new sid, where project.json holds no rule with a refines link to s-x8uzc8z44pwtd3h, and to name that rule. It is also to rename the key declaration inside TextRule.list.jsonSchema and TextRule.list.valueList to pointer and symbol, and to name each file that it rewrites because an earlier release wrote or read it differently. Tests for each, and for a second run that changes nothing, are written first; the test “reads the confirmations an earlier release wrote…” at approve.test.ts:141 moves here from s-v4qus7raqnwzneb. In this repository and in the saloon, the first sheriff reindex of the release then writes the rule, which the owner approves.";
}

// ---------------------------------------------------------------------------------------------------------------
// proposal:s-7pk89t8z6wymmj9-g6: review d (the paragraph on onFailure, the cut, the change field); the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "proposal:s-7pk89t8z6wymmj9-g6";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const onFailure = parts[at(parts, "Where that member is an object whose `onFailure` is `reported`")];
  onFailure.en = "Where the member that lists the check is an object whose `onFailure` is `reported`, the rule says that the check's failure is only reported. Where that member's `onFailure` is `reportedUnlessStrict`, the rule says that the check's failure is only reported while the specification's `strict` flag (§s-q3pfzyaxvpr2zj2) is off. `sheriff validate` reads the flag from the model of the specification that it gives the check.";
  onFailure.ru = "Если элемент, который перечисляет проверку, — объект, у которого `onFailure` равно `reported`, правило говорит, что о неудаче проверки только сообщается. Если `onFailure` этого элемента равно `reportedUnlessStrict`, правило говорит, что о неудаче проверки только сообщается, пока флаг `strict` спецификации (§s-q3pfzyaxvpr2zj2) выключен. Флаг `sheriff validate` читает из модели спецификации, которую передаёт проверке.";
  onFailure.change = "Первое предложение — как в согласованной формулировке; «that member» заменено на «the member that lists the check», потому что элемент назван в предыдущем абзаце. Новое: значение `reportedUnlessStrict`: правило говорит, что о неудаче только сообщается, пока флаг `strict` выключен, а при включённом флаге действует общее правило первого абзаца — `sheriff validate` отвергает изменение. Почему: по правилу 10.7 правило собственных guidelines проекта может сделать проверку строже, пока флаг включён, и его второй пример — именно собственная проверка, которая при включённом флаге отвергает коммит там, где иначе только сообщила бы. Прежде одна проверка не могла этого выразить: понадобились бы две. Решает по-прежнему это правило, а не инструменты SpecSheriff, как вы постановили 2026-11-04 по правилу 10.8; поэтому проверка с `reported` и при включённом флаге только сообщает. Флаг берётся из модели, которую получает проверка, чтобы `sheriff validate --strict` и запуск перед включением флага отвергали такую неудачу.";
  const settings = parts[at(parts, "Before `sheriff settings` records an approval of the specification")];
  settings.en = "Before `sheriff settings` records an approval of the specification (§s-m59dqwkw2e96wne), it runs the project's own checks (§s-chsfpkgpmfk4fft, §s-qzthyh7yqvfhsa2). It gives them a model in which the specification is approved and the `strict` flag has the value that the entries in `sheriff.config.json` set.";
  settings.ru = "Прежде чем внести одобрение спецификации (§s-m59dqwkw2e96wne), `sheriff settings` запускает собственные проверки проекта (§s-chsfpkgpmfk4fft, §s-qzthyh7yqvfhsa2). Она передаёт им модель, в которой спецификация одобрена, а флаг `strict` такой, каким его задают записи в `sheriff.config.json`.";
  settings.change = "Как в согласованной формулировке; ссылка ведёт теперь и на узел группы 6 о процедуре одобрения спецификации. Предложение о том, как `sheriff settings` запускает собственные проверки перед включением флага `strict`, убрано: это говорит узел группы 6 «Turning the `strict` flag on».";
  p.parts = parts;
  dropRef(p, "s-nxgkp988mej79eg");
  rep(K, p.examples[1], "en", "The member of the check `spelling` is", "The member that lists the check `spelling` is");
  rep(K, p.examples[1], "ru", "Элемент проверки `spelling` —", "Элемент, который перечисляет проверку `spelling`, —");
  const e = drafts[K];
  e.change = "Добавлено значение `onFailure`: `reportedUnlessStrict` — правило говорит, что о неудаче проверки только сообщается, пока флаг `strict` выключен; при включённом флаге `sheriff validate` отвергает изменение по общему правилу первого абзаца. Флаг берётся из модели, которую получает проверка, так что `sheriff validate --strict` и запуск перед включением флага такую неудачу отвергают. Почему: правило 10.7 позволяет правилу собственных guidelines проекта сделать проверку строже, пока флаг включён, и его второй пример описывает именно такую собственную проверку; прежде одна проверка не могла этого выразить: понадобились бы две. Решает правило, которое перечисляет проверку, а не инструменты SpecSheriff, как вы постановили 2026-11-04 по правилу 10.8: проверка с `reported` и при включённом флаге только сообщает, как говорит стоимость строки 10.1.37. Абзац о списке разделён: всё об `onFailure` — в одном абзаце. Ссылка на правило 10.7 поставлена там, где узел впервые о нём говорит, а предложение о запуске перед включением флага убрано, потому что его говорит узел группы 6 «Turning the `strict` flag on». Добавлен пример. Остальная формулировка — как вы согласовали.";
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes. The checks are those of propose-group6.mjs.
// ---------------------------------------------------------------------------------------------------------------
const targets = new Set();
const tools = JSON.parse(fs.readFileSync(path.join(root, "specs/_guidelines/tools.json"), "utf8"));
const toolsNodes = new Map();
const collect = (data, into) => {
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.sid === "string") {
      targets.add(n.sid);
      if (into) into.set(n.sid, n);
    }
    (n.children || []).forEach(walk);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c && c.node) walk(c.node);
  };
  data.nodes.forEach(walk);
};
const moved = path.join(root, ".ai_docs/t25-pass/moved/specs/_guidelines");
collect(JSON.parse(fs.readFileSync(path.join(moved, "spec.json"), "utf8")));
for (const f of fs.readdirSync(path.join(moved, "extensions"))) collect(JSON.parse(fs.readFileSync(path.join(moved, "extensions", f), "utf8")));
collect(tools, toolsNodes);
for (const d of Object.values(drafts)) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);
const movedDecisionsCite = { "new:tools-11-fingerprint": ["s-5ah25f6gy99panq"], "new:tools-11-withdraw": ["s-5ah25f6gy99panq"] };

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];
for (const key of changed) {
  const e = drafts[key];
  const p = e.proposal;
  const isSection = e.kind === "section";
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  p.date = "2026-11-25";
  e.review = REVIEW;
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  const decisions = JSON.stringify(toolsNodes.get(e.sidValue)?.meta?.decisions ?? []);
  const citedByDecisions = new Set([...citedIn(decisions), ...(movedDecisionsCite[key] || [])]);
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    if (r.to === e.sidValue) problems.push(`${key}: a link to itself`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !citedByDecisions.has(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  for (const s of citedByDecisions) if (!linked.has(s)) problems.push(`${key}: a decision cites ${s}, and the draft drops the link`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change: ${String(x.en).slice(0, 50)}`);
  if (!isSection && (!p.reason || !p.ruReason || !p.reasonChange)) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
  for (const x of p.parts) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  for (const x of p.examples || []) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in an example`);
  const ownText = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
  for (const sentence of ownText.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  const bad = [/stands for/, /closest mistake/i, /outside its tests/, /NodeKind/, / included\b/, /\bstands?\b/, /the commit's message/, /\bthe tools\b(?! of)/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts? as\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /\bevery other\b/, /\bboth agents\b/, /\bthe two it\b/, /\bthe same (refusal|text)\b/];
  if (key !== "new:tools-11-fingerprint" && key !== "proposal:s-gb8s9657a65hqmv-g6") bad.push(/\bdeclaredIn\b/);
  const plain = en.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS");
  for (const b of bad) if (b.test(plain)) problems.push(`${key}: the English holds ${b}`);
  if (/несёт|несут|несущ|владел|NodeKind/.test(ru)) problems.push(`${key}: the Russian says «несёт», «владелец» or NodeKind`);
  const changes = JSON.stringify(p.parts.map((x) => x.change)) + (p.titleChange || "") + (p.reasonChange || "") + (e.change || "");
  if (/[Рр]аунд|рецензент|review-g|\bround\b/.test(changes)) problems.push(`${key}: a change field tells the history of the rounds`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const before = JSON.parse(backupText);
if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (GROUP.includes(key)) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group6b.md: the English of every changed node of the group.
const md = [
  "# T25, group 6, round b: the English of every changed node",
  "",
  "This file holds the English of every node of group 6 that round b changed, as `tools-drafts.json` holds it after fix-group6-b.mjs. Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "fix-group6-b.mjs writes this file; edit the script, not this file.",
  "",
];
for (const key of GROUP.filter((k) => changed.has(k))) {
  const e = drafts[key];
  const p = e.proposal;
  md.push(`## ${key} — ${p.title}`, "");
  if (key.startsWith("proposal:")) md.push(`A proposal: the complete new wording of the agreed draft \`${e.base}\`, the node ${e.sidValue}.`, "");
  md.push(`**Title:** ${p.title}`, "", "**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group6b.md", here), md.join("\n"));

console.log(`changed ${changed.size} drafts: ${[...changed].join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
