// T25, stage 2, group 6, round c: applies the six reports of the follow-up review on the drafts of group 6
// (review-g6b-a.md to review-g6b-d.md, english-g6b-fast.md, english-g6b-thorough.md) as fix-brief-group6-c.md says,
// with the points that brief settles. Copies tools-drafts.json to tools-drafts.before-group6-c.json on its first run
// and rebuilds from that copy on every run, so that it is idempotent. Each patch fails where it does not find the part
// or the text it replaces. Runs the checks of fix-group6-b.mjs before it writes, and also checks that a part whose
// `change` says it is unchanged keeps its agreed wording. Writes english-group6c.md, the English of every changed node.
// It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group6-c.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const REVIEW = "specsheriff-rule-reviewer, 2026-11-25: review-g6-a.md to review-g6-d.md, then review-g6b-a.md to review-g6b-d.md; EngStickler's readers: english-g6-fast.md, english-g6-thorough.md, english-g6b-fast.md and english-g6b-thorough.md; fix-group6-b.mjs and fix-group6-c.mjs applied the findings as group6-notes.md, rounds b and c, says";

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
// The text of a node of tools.json as approved, by its sid; undefined where tools.json contains no such node.
const toolsFile = JSON.parse(fs.readFileSync(path.join(root, "specs/_guidelines/tools.json"), "utf8"));
const toolsText = (sid) => {
  let found;
  const walk = (n) => {
    if (!n || typeof n !== "object" || found) return;
    if (n.sid === sid) found = n.text;
    (n.children || []).forEach(walk);
  };
  toolsFile.nodes.forEach(walk);
  return found;
};
const UNCHANGED = /^(Без изменений\.?|Как в согласованной формулировке\.?)$/;

// ---------------------------------------------------------------------------------------------------------------
// s-v4qus7raqnwzneb, "How an approval is recorded": review b-a, R1; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "s-v4qus7raqnwzneb";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const first = parts[at(parts, "`specs/_approvals.jsonl` (§s-zefk589ykh37b8u) records")];
  rep(K, first, "en", "in a line of its own", "on a line of its own");
  const withdrawn = parts[at(parts, "`withdrawn`, with the value `true`")];
  withdrawn.en = "`withdrawn`, which only a line that withdraws an approval holds, with the value `true`;";
  withdrawn.ru = "`withdrawn`, который есть только в строке, отзывающей одобрение, со значением `true`;";
  p.parts = parts;
  rep(K, p, "reason", "take it from a record that no edit of the node changes", "take the approval from a record that no edit to the node changes");
  rep(K, p, "reason", "each with the address of whoever made it", "each with the email address of whoever made it");
  rep(K, p, "ruReason", "вместе с адресом того, кто их сделал", "вместе с адресом электронной почты того, кто их сделал");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-11-fingerprint: review b-a, F1 and F2; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-11-fingerprint";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const gathered = parts[at(parts, "the values gathered beside a field")];
  gathered.en = "the values gathered beside a field (§s-ju5vcanbjph7mgh), since `sheriff reindex` builds those values from other nodes (§s-ztseyetus7np6br);";
  gathered.ru = "значения, собранные рядом с полем (§s-ju5vcanbjph7mgh), потому что `sheriff reindex` строит эти значения из других узлов (§s-ztseyetus7np6br);";
  const row = parts[at(parts, "`row`, an object")];
  row.en = "`row`, an object that holds the text of each cell in the node's row that holds text, under the key of that cell's column.";
  row.ru = "`row` — объект, который содержит текст каждой ячейки с текстом в строке узла, под ключом столбца этой ячейки.";
  const names = parts[at(parts, "The following keys and kinds of node")];
  rep(K, names, "en", "appear in the object under the names that the earlier release wrote:", "appear in the object under their earlier names:");
  rep(K, names, "ru", "входят в объект под теми именами, которые записал прежний выпуск:", "входят в объект под своими прежними именами:");
  const list = parts[at(parts, "a `TextRule.list.jsonSchema` or")];
  rep(K, list, "en", "with the `pointer` of the first or the `symbol` of the second under", "with the `pointer` of the `jsonSchema` or the `symbol` of the `valueList` under");
  rep(K, list, "ru", "а `pointer` первого или `symbol` второго —", "а `pointer` из `jsonSchema` или `symbol` из `valueList` —");
  const kind = parts[at(parts, "the name of a kind of node")];
  kind.en = "the name of a kind of node in the source of a field's values (§s-xfu2gpzddjnmgks), where those values are the sids of that kind's nodes: `TextRule` as `rule`, `RecordType` as `recordType`, and `header` as `domain`.";
  kind.ru = "имя типа узлов в источнике значений поля (§s-xfu2gpzddjnmgks), если эти значения — sid узлов этого типа: `TextRule` как `rule`, `RecordType` как `recordType`, `header` как `domain`.";
  kind.change = "Без изменений по смыслу: так код уже сохраняет одобрения при переименовании типов узлов (model.ts). Сказано, где стоит имя типа: в источнике значений поля, значения которого — sid узлов этого типа.";
  const empty = parts[at(parts, "For a field whose values come from the source `domains`")];
  rep(K, empty, "en", "Where such a field has no list of its own values, it appears in the object with that empty list.", "Where such a field has no list of its own values, the field appears in the object with an empty list under the key `values`.");
  rep(K, empty, "ru", "Если у такого поля нет собственного списка значений, оно входит в объект с этим пустым списком.", "Если у такого поля нет собственного списка значений, поле входит в объект с пустым списком под ключом `values`.");
  p.parts = parts;
  rep(K, p, "reason", "so that a change to that wording, and to nothing else, leaves the node without an approval in force (§s-5ah25f6gy99panq).", "so that a change to that wording leaves the node without an approval in force, and no other change does (§s-5ah25f6gy99panq).");
  rep(K, p.examples[1], "en", "holds a rule and the text of what a failure of that rule costs", "holds a rule and a text that says what a failure of that rule costs");
  rep(K, p.examples[1], "ru", "содержит правило и текст о том, чего стоит нарушение этого правила", "содержит правило и текст, который говорит, чего стоит нарушение этого правила");
  addRef(p, "cites", "s-xfu2gpzddjnmgks");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-11-approve: review b-a, A1; the readers.
// ---------------------------------------------------------------------------------------------------------------
const PLUGIN_EN = [", which takes those nodes from the plugin (§s-bsya3febm6u64ab);", ", since such a project takes those nodes from the plugin (§s-bsya3febm6u64ab);"];
const PLUGIN_RU = [" и берёт эти узлы из плагина (§s-bsya3febm6u64ab);", ", потому что такой проект берёт эти узлы из плагина (§s-bsya3febm6u64ab);"];
{
  const K = "new:tools-11-approve";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const first = parts[at(parts, "`sheriff approve <sid>...` approves each node")];
  rep(K, first, "en", "The approval names whoever runs the command.", "The approval holds the email address of whoever runs the command.");
  rep(K, first, "ru", "Одобрение называет того, кто запустил команду.", "Одобрение содержит адрес электронной почты того, кто запустил команду.");
  const status = parts[at(parts, "`sheriff approve` then sets the node's status")];
  status.en = "`sheriff approve` then sets the status of each node that it names to `approved`. Where an approval of a node's current wording is already in force, `sheriff approve` appends nothing for that node and only sets the node's status.";
  status.ru = "Затем `sheriff approve` ставит статус `approved` каждому узлу, который он называет. Если одобрение нынешней формулировки узла уже в силе, `sheriff approve` ничего не добавляет для этого узла и только ставит ему статус.";
  const table = parts[at(parts, "Where a node that `sheriff approve` names is a `TableRule`")];
  rep(K, table, "en", "the command also approves each node in the table's cells, as it approves a node that it names.", "the command also approves each node in the table's cells, in the same way as it approves a node that it names.");
  const sid = parts[at(parts, "a sid that names no node")];
  rep(K, sid, "en", ...PLUGIN_EN);
  rep(K, sid, "ru", ...PLUGIN_RU);
  const owner = parts[at(parts, "a node of which whoever runs the command is not an owner")];
  owner.en = "a node whose owners do not include whoever runs the command (§s-6sk8uet75dmq5qz).";
  owner.ru = "узел, среди ответственных за который нет того, кто запустил команду (§s-6sk8uet75dmq5qz).";
  const refusal = parts[at(parts, "Each refusal names the sid concerned.")];
  refusal.en = "Each refusal names the sid concerned. The refusal of a node whose owners do not include whoever runs the command also names the node's owners.";
  refusal.ru = "Каждый отказ называет соответствующий sid. Отказ для узла, среди ответственных за который нет того, кто запустил команду, называет и ответственных за узел.";
  const all = parts[at(parts, "Where `sheriff approve` refuses any sid")];
  rep(K, all, "en", "refuses any sid that the run names, it records nothing.", "refuses any sid named in the run, it records none of the run's approvals.");
  rep(K, all, "ru", "отвергает хотя бы один sid, который называет запуск, он ничего не записывает.", "отвергает хотя бы один sid, названный в запуске, он не записывает ни одного одобрения этого запуска.");
  const reindex = parts[at(parts, "After it records the approvals")];
  rep(K, reindex, "en", " (§s-ztseyetus7np6br), which derives the approval status of each section anew.", " (§s-ztseyetus7np6br).");
  rep(K, reindex, "ru", " (§s-ztseyetus7np6br), который заново выводит статус одобрения каждого раздела.", " (§s-ztseyetus7np6br).");
  p.parts = parts;
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-11-withdraw: review b-a, W1 and W2; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-11-withdraw";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const first = parts[at(parts, "`sheriff approve --withdraw <sid>...` withdraws")];
  first.en = "`sheriff approve --withdraw <sid>...` withdraws the approval of each node that it names (§s-fpq35tf3pehgk64). For each approval in force of a wording (§s-5ah25f6gy99panq) of such a node, whether or not the node holds that wording now, the command appends to `specs/_approvals.jsonl` a line that withdraws that approval (§s-v4qus7raqnwzneb). Each such line holds the email address of whoever runs the command. The command appends these lines in the order in which the first line for each such wording comes in the file.";
  first.ru = "`sheriff approve --withdraw <sid>...` отзывает одобрение каждого узла, который он называет (§s-fpq35tf3pehgk64). Для каждого одобрения формулировки (§s-5ah25f6gy99panq) такого узла, которое в силе, — есть ли эта формулировка в узле сейчас или нет, — команда добавляет в `specs/_approvals.jsonl` строку, которая отзывает это одобрение (§s-v4qus7raqnwzneb). Каждая такая строка содержит адрес электронной почты того, кто запустил команду. Эти строки команда добавляет в том порядке, в каком в файле идут первые строки для каждой такой формулировки.";
  const status = parts[at(parts, "`sheriff approve --withdraw` then sets the node's status")];
  status.en = "`sheriff approve --withdraw` then sets the status of each node that it names to `draft`. Where no approval of any wording of a node is in force, `sheriff approve --withdraw` appends nothing for that node and only sets the node's status.";
  status.ru = "Затем `sheriff approve --withdraw` ставит статус `draft` каждому узлу, который он называет. Если ни одно одобрение ни одной формулировки узла не в силе, `sheriff approve --withdraw` ничего не добавляет для этого узла и только ставит ему статус.";
  const sid = parts[at(parts, "a sid that names no node")];
  rep(K, sid, "en", ...PLUGIN_EN);
  rep(K, sid, "ru", ...PLUGIN_RU);
  const all = parts[at(parts, "Each refusal names the sid concerned.")];
  rep(K, all, "en", "refuses any sid that the run names, it records nothing.", "refuses any sid named in the run, it records none of the run's withdrawals.");
  rep(K, all, "ru", "отвергает хотя бы один sid, который называет запуск, он ничего не записывает.", "отвергает хотя бы один sid, названный в запуске, он не записывает ни одного отзыва этого запуска.");
  p.parts = parts;
  rep(K, p, "ruReason", "хотя ни один ответственный его не одобрял.", "хотя никто из ответственных не одобрил его заново.");
  rep(K, p.examples[0], "ru", "считает, что R ошибочно и запускает", "считает, что R ошибочно, и запускает");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-2-entries: review b-b, E1 to E3; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-2-entries";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const appends = parts[at(parts, "`sheriff settings` appends each entry")];
  rep(K, appends, "en", "`sheriff settings` appends each entry", "`sheriff settings` (§s-chsfpkgpmfk4fft) appends each entry");
  rep(K, appends, "ru", "`sheriff settings` добавляет каждую запись", "`sheriff settings` (§s-chsfpkgpmfk4fft) добавляет каждую запись");
  const value = parts[at(parts, "The specification's approval status and its `strict` flag each have")];
  rep(K, value, "en", "each have the value that the last entry of its list sets.", "each have the value that the last entry of that setting's list sets.");
  rep(K, value, "ru", "имеют каждый то значение, которое задаёт последняя запись его списка.", "имеют каждый то значение, которое задаёт последняя запись списка этой настройки.");
  const none = parts[at(parts, "Where `sheriff.config.json` holds no entry for the approval status")];
  rep(K, none, "en", "no owner has approved the specification, so the specification is a draft (§s-9g7jj8z4yf9kq93).", "no owner has approved the specification. The specification is then a draft (§s-9g7jj8z4yf9kq93).");
  rep(K, none, "ru", "ни один ответственный не одобрял спецификацию, поэтому она черновик (§s-9g7jj8z4yf9kq93).", "ни один ответственный не одобрял спецификацию. Тогда спецификация — черновик (§s-9g7jj8z4yf9kq93).");
  const only = parts[at(parts, "`sheriff settings` records an entry only where")];
  rep(K, only, "en", " Otherwise it records nothing and says that the setting already has that value.", "");
  rep(K, only, "ru", " Иначе она ничего не вносит и сообщает, что настройка уже имеет это значение.", "");
  p.parts = parts;
  p.reason = "The entries keep every change that an owner made to these settings, each with the email address of the owner who made it, and the last entry of each list sets the value of its setting. `sheriff reindex` writes an entry in place of the rule through which an owner approved the specification under an earlier release (§s-gb8s9657a65hqmv). Since no entry holds anything that depends on when it is written, the check on the entries (§s-j9r8z4xdrfkfs47) never mistakes the entry that `sheriff reindex` writes for a changed one.";
  p.ruReason = "Записи хранят каждое изменение этих настроек ответственным вместе с адресом электронной почты ответственного, который его сделал, а значение каждой настройки задаёт последняя запись её списка. `sheriff reindex` пишет запись вместо правила, которым ответственный одобрял спецификацию при прежнем выпуске (§s-gb8s9657a65hqmv). Поскольку ни одна запись не содержит ничего, что зависит от времени её создания, проверка записей (§s-j9r8z4xdrfkfs47) никогда не принимает запись, которую пишет `sheriff reindex`, за изменённую.";
  rep(K, p.examples[0], "en", "since the last entry returns it to draft.", "since the last entry makes it a draft again.");
  rep(K, p.examples[0], "ru", "потому что последняя запись возвращает её в черновик.", "потому что последняя запись снова делает её черновиком.");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-2-approve-spec: review b-b, A1, A2 and A4; the cut in the proposal on a project's own check (A3); the
// readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-2-approve-spec";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const first = parts[at(parts, "Before `sheriff settings` records an entry that approves")];
  rep(K, first, "en", "which `sheriff types` makes (§s-f8fmudceuyaj942).", "which `sheriff types` makes (§s-a8fn72xa782wvbk, §s-f8fmudceuyaj942).");
  rep(K, first, "ru", "которую делает `sheriff types` (§s-f8fmudceuyaj942).", "которую делает `sheriff types` (§s-a8fn72xa782wvbk, §s-f8fmudceuyaj942).");
  const asApproved = parts[at(parts, "These checks read the specification as approved")];
  rep(K, asApproved, "en", "These checks read the specification as approved", "The checks before an approval treat the specification as approved");
  rep(K, asApproved, "ru", "Эти проверки считают спецификацию одобренной", "Проверки перед одобрением считают спецификацию одобренной");
  const rest = parts[at(parts, "The checks treat everything else")];
  rep(K, rest, "en", "The checks treat everything else", "The checks before an approval treat everything else");
  rep(K, rest, "en", "The project's own checks (§s-2fau85dfyyeq66m) receive", "The project's own checks (§s-2fau85dfyyeq66m, §s-7pk89t8z6wymmj9) receive");
  rep(K, rest, "en", "has the value that those entries set (§s-7pk89t8z6wymmj9).", "has the value that those entries set.");
  rep(K, rest, "ru", "проверки считают не изменённым этим коммитом.", "проверки перед одобрением считают не изменённым этим коммитом.");
  rep(K, rest, "ru", "Собственные проверки проекта (§s-2fau85dfyyeq66m) получают", "Собственные проверки проекта (§s-2fau85dfyyeq66m, §s-7pk89t8z6wymmj9) получают");
  rep(K, rest, "ru", "имеет значение, которое задают эти записи (§s-7pk89t8z6wymmj9).", "имеет значение, которое задают эти записи.");
  rep(K, rest, "change", "Какую модель получают собственные проверки проекта, сказано прямо, как это говорит согласованный узел «How a project's own check is run».", "Какую модель получают собственные проверки проекта, говорит только этот узел: прежде это говорил и согласованный узел «How a project's own check is run», а предложение группы 6 убирает оттуда этот абзац (ваше правило «One statement, one home»).");
  const shows = parts[at(parts, "`sheriff settings` shows the owner who approves")];
  shows.en = "`sheriff settings` shows the owner who approves the specification what the checks before an approval find: every refusal, warning and report. Where they find nothing, it records the entry that approves the specification. Otherwise, it records that entry only after the owner confirms the approval, as the node on `sheriff settings` says (§s-chsfpkgpmfk4fft).";
  shows.ru = "`sheriff settings` показывает ответственному, который одобряет спецификацию, всё, что находят проверки перед одобрением: каждый отказ, предупреждение и отчёт. Если они ничего не находят, она вносит запись, которая одобряет спецификацию. Иначе она вносит эту запись только после того, как ответственный подтвердит одобрение, как говорит узел о `sheriff settings` (§s-chsfpkgpmfk4fft).";
  const strict = parts[at(parts, "While the `strict` flag is on, `sheriff settings` first runs")];
  strict.en = "While the `strict` flag is on, `sheriff settings` first runs the checks that the flag makes stricter, as it does when asked to turn the flag on (§s-nxgkp988mej79eg). Where any of them would refuse a commit or a push that changes nothing, `sheriff settings` refuses to record the approval. Its run ends with that refusal. The refusal is the same as the one that `sheriff settings` gives when it refuses to turn the flag on.";
  strict.ru = "Пока флаг `strict` включён, `sheriff settings` сначала выполняет проверки, которые флаг делает строже, так же как когда её просят включить флаг (§s-nxgkp988mej79eg). Если хотя бы одна из них отвергла бы коммит или push, который ничего не меняет, `sheriff settings` отказывается вносить одобрение. На этом отказе её запуск заканчивается. Этот отказ — такой же, как тот, который `sheriff settings` даёт, когда отказывается включить флаг.";
  p.parts = parts;
  const ex = p.examples[0];
  rep(K, ex, "en", "and no SpecTag binds an old function.", "and an old function has no SpecTag.");
  rep(K, ex, "ru", "а старую функцию не связывает ни один SpecTag.", "а у старой функции нет SpecTag.");
  rep(K, ex, "en", "The most likely mistake is to read R's approval as one that the commit's parent already holds. R is then not among the rules that the commit includes,", "The most likely mistake is to treat R's approval as one that was in force before the single commit that the checks assume. R is then not among the rules that this commit includes,");
  rep(K, ex, "ru", "Самая вероятная ошибка — считать одобрение R тем, что уже есть в родительском коммите. Тогда R не входит в правила, которые включает коммит,", "Самая вероятная ошибка — считать, что одобрение R было в силе ещё до того единственного коммита, который предполагают проверки. Тогда R не входит в правила, которые включает этот коммит,");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-2-strict: review b-d, wording fix 1, fix 2, the stage-3 nit and the doubt; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-2-strict";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const first = parts[at(parts, "`sheriff settings` (§s-chsfpkgpmfk4fft) refuses to turn")];
  rep(K, first, "en", "would refuse a commit or push that changes nothing.", "would refuse a commit or a push that changes nothing.");
  const intro = parts[at(parts, "The checks that the `strict` flag makes stricter")];
  intro.en = "The checks that the `strict` flag makes stricter, the cases in which each would refuse such a commit or a push, and the command that the refusal to turn the flag on names for each are the following:";
  intro.ru = "Проверки, которые флаг `strict` делает строже, случаи, в которых каждая из них отвергла бы такой коммит или push, и команда, которую для каждой из них называет отказ включить флаг, — следующие:";
  const untagged = parts[at(parts, "the check for code and tests outside the commit")];
  untagged.en = "the check for code and tests outside the commit (§s-3xx2eukc8gtd2tx) that no SpecTag (§s-8xw4mgvpexyvw5q) binds: it would refuse where `sheriff untagged` (§s-weuyx98r7c923ab) would list any code, and the refusal names `sheriff untagged`;";
  untagged.ru = "проверка кода и тестов вне коммита (§s-3xx2eukc8gtd2tx), которые не связывает ни один SpecTag (§s-8xw4mgvpexyvw5q): она отвергла бы, если `sheriff untagged` (§s-weuyx98r7c923ab) перечислила бы хоть какой-то код, и отказ называет `sheriff untagged`;";
  const own = parts[at(parts, "each of the project's own checks")];
  own.en = "each of the project's own checks (§s-2fau85dfyyeq66m), any of which a rule of the project's own guidelines (§s-u7tw6m8npxmv5tu) may make stricter (§s-q3pfzyaxvpr2zj2): such a check would refuse where `sheriff validate --strict` would refuse because of that check (§s-7pk89t8z6wymmj9), and the refusal names `sheriff validate --strict`.";
  own.ru = "каждая из собственных проверок проекта (§s-2fau85dfyyeq66m), любую из которых правило собственных guidelines проекта (§s-u7tw6m8npxmv5tu) может сделать строже (§s-q3pfzyaxvpr2zj2): такая проверка отвергла бы, если бы из-за неё отверг `sheriff validate --strict` (§s-7pk89t8z6wymmj9), и отказ называет `sheriff validate --strict`.";
  rep(K, own, "change", "Поэтому они запускают каждую собственную проверку так, как согласованный узел о таких проверках требует перед включением флага.", "Поэтому `sheriff settings` запускает каждую собственную проверку так, как её запускает `sheriff validate --strict`. Прежде это говорил и согласованный узел о таких проверках, а предложение группы 6 переносит это сюда.");
  parts.push(P(
    "`sheriff settings` also refuses to turn the flag on while the files of the specification fail the check for a key written more than once (§s-7zqsstgnuc772ba) or the validation against their schema (§s-xzcw3hv4hmxz7h7).",
    "`sheriff settings` отказывается включить флаг и тогда, когда файлы спецификации не проходят проверку на ключ, записанный больше одного раза (§s-7zqsstgnuc772ba), или проверку на соответствие своей схеме (§s-xzcw3hv4hmxz7h7).",
    "Новое, по правилу 10.7: пока файлы спецификации не проходят эти проверки, `sheriff validate` не запускает собственные проверки проекта, и узнать, отвергла бы какая-нибудь из них коммит, нельзя. Коммит, который ничего не меняет, был бы тогда отвергнут в любом случае, а флаг не включается, пока такой коммит был бы отвергнут."));
  p.parts = parts;
  addRef(p, "cites", "s-u7tw6m8npxmv5tu");
  addRef(p, "cites", "s-7zqsstgnuc772ba");
  addRef(p, "cites", "s-xzcw3hv4hmxz7h7");
  const ex = p.examples[0];
  rep(K, ex, "en", "and no SpecTag binds two functions in an old file.", "and two functions in an old file have no SpecTag.");
  rep(K, ex, "ru", "и две функции в старом файле не связывает ни один SpecTag.", "и у двух функций в старом файле нет SpecTag.");
  rep(K, ex, "en", "until a SpecTag binds both functions.", "until each of the two functions has a SpecTag.");
  rep(K, ex, "ru", "пока SpecTag не свяжет обе функции.", "пока у каждой из двух функций не появится SpecTag.");
  const e = drafts[K];
  rep(K, e, "stage3", "for each that finds anything.", "for each check that would refuse. It is also to refuse while the files of the specification fail the check for a key written more than once or the validation against their schema.");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-2-extension-off: review b-b, X1 and X3 (which supersedes X2); the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-2-extension-off";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const first = parts[at(parts, "`sheriff settings` refuses to record an entry that withdraws")];
  rep(K, first, "en", "`sheriff settings` refuses to record", "`sheriff settings` (§s-chsfpkgpmfk4fft) refuses to record");
  rep(K, first, "ru", "`sheriff settings` отказывается вносить", "`sheriff settings` (§s-chsfpkgpmfk4fft) отказывается вносить");
  const which = parts[at(parts, "A node other than the extension's own nodes depends")];
  which.en = "A node other than the extension's own nodes, including a node of the archive (§s-f2b5zvc565s242f), depends on the extension where any of the following holds:";
  which.ru = "Узел, который не входит в само расширение, в том числе узел архива (§s-f2b5zvc565s242f), зависит от расширения, если выполнено что-нибудь из следующего:";
  which.change = "Новое: правило 1.7.6 называет, через что узел зависит от расширения, а этот узел говорит, где инструменты SpecSheriff находят каждое из этого: в схеме расширения и в его файле. Узел архива схема проверяет целиком (archive-file.schema.json), поэтому после отзыва узел архива с таким типом, свойством или связью не прошёл бы проверку схемы при следующем коммите, а именно от этой ошибки предостерегает пример правила 1.7.6.";
  const link = parts[at(parts, "the node has a link to a node in the extension's file.")];
  link.en = "the node is outside the archive and has a link to a node in the extension's file.";
  link.ru = "узел находится вне архива, и у него есть связь с узлом из файла расширения.";
  link.change = "Новое: связь с узлом расширения, по правилу 1.7.6. Узел архива хранит свои связи такими, какими они были при его удалении (archive-file.schema.json), поэтому этот пункт касается только узлов вне архива.";
  const archive = parts[at(parts, "A node of the archive (§s-f2b5zvc565s242f) depends")];
  archive.en = "The refusal names a node of the archive by its file and its location, since it has no sid.";
  archive.ru = "Узел архива отказ называет по его файлу и расположению, потому что sid у него нет.";
  archive.change = "Новое: sid у узла архива нет (правило 2.6).";
  const reference = parts[at(parts, "A reference in the project's extension of the schema")];
  reference.en = "A reference in the project's extension of the schema (§s-xm8rz4uupb73gu5) depends on the extension of the guidelines where the reference points to a definition that the `$defs` of the extension's schema add (§s-xzcw3hv4hmxz7h7). The `fields` of the project's extension of the schema depend on the extension of the guidelines where they set conditions for a kind that the `kinds` of the extension's schema add. The refusal names each such reference and each such kind by the file of the project's extension of the schema and the JSON Pointer to it.";
  reference.ru = "Ссылка в расширении схемы проекта (§s-xm8rz4uupb73gu5) зависит от расширения guidelines, если она указывает на определение, которое добавляют `$defs` схемы расширения (§s-xzcw3hv4hmxz7h7). `fields` расширения схемы проекта зависят от расширения guidelines, если задают условия для типа, который добавляют `kinds` схемы расширения. Каждую такую ссылку и каждый такой тип отказ называет по файлу расширения схемы проекта и указателю JSON Pointer на них.";
  reference.change += " Так же после отзыва схема отвергла бы `fields` расширения схемы проекта, которые задают условия для типа, добавленного расширением (пример правила 1.7.6).";
  const scope = parts[at(parts, "`sheriff settings` checks each node in the files")];
  scope.en = "`sheriff settings` checks each node in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6) and each node of the archive. It also checks each reference in the project's extension of the schema and each kind in its `fields`. It makes this check regardless of whether the specification is approved or a draft.";
  scope.ru = "`sheriff settings` проверяет каждый узел в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6) и каждый узел архива. Она проверяет и каждую ссылку в расширении схемы проекта, и каждый тип в его `fields`. Эту проверку она выполняет независимо от того, одобрена спецификация или она черновик.";
  rep(K, scope, "change", "Проверяются и узлы архива, и ссылки в расширении схемы проекта.", "Проверяются и узлы архива, и ссылки и `fields` расширения схемы проекта.");
  p.parts = parts;
  p.reason = "An extension's schema declares, and its file holds, everything that the extension adds, so together they show everything that would rely on rules and definitions that no longer apply in the project once the choice of the extension is withdrawn (§s-j8y62pa9hzz6nwx).";
  p.ruReason = "Схема расширения объявляет, а его файл содержит всё, что добавляет расширение, поэтому вместе они показывают всё, что после отзыва выбора расширения опиралось бы на правила и определения, которые в проекте больше не действуют (§s-j8y62pa9hzz6nwx).";
  addRef(p, "cites", "s-chsfpkgpmfk4fft");
  const e = drafts[K];
  rep(K, e, "stage3", "It is also to refuse while a node of the archive has a kind that the extension's kinds add, naming it by its file and location, and while specs/_schema/project.schema.json holds a $ref to a definition in the extension's $defs, naming the file and the JSON Pointer of the reference.", "It is to check each node of the archive in the same way, apart from its links to those sids, naming such a node by its file and location. It is also to refuse while specs/_schema/project.schema.json holds a $ref to a definition in the extension's $defs, or fields for a kind that the extension's kinds add, naming the file and the JSON Pointer of each.");
}

// ---------------------------------------------------------------------------------------------------------------
// s-7unxytshhc4md54, "Setting a repository up and taking SpecSheriff out of it": review b-c, T1 to T3 and the Russian
// nits; the readers; each `change` that said "unchanged" of a part that differs from the approved wording.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "s-7unxytshhc4md54";
  const p = prop(K);
  const approvedText = toolsText(K);
  // The approved line that starts with `start`, without the dash of a list item.
  const approved = (start) => {
    const line = approvedText.split("\n").map((l) => l.replace(/^- /, "")).find((l) => l.startsWith(start));
    if (!line) problems.push(`${K}: no approved line starts with "${start}"`);
    return line ?? "";
  };
  const was = (start) => `Было: «${approved(start)}» Без изменений по смыслу.`;
  const parts = p.parts.map((x) => ({ ...x }));
  const stage = parts[at(parts, "it stages each hook there")];
  stage.en = "it stages, with the executable mode 100755, each hook there that holds what it would write, unless git's index already holds that hook with that mode, and names each hook that it stages;";
  for (const [start, approvedStart] of [
    ["where it cannot stage a hook", "where it cannot stage a hook"],
    ["for `claude`, it adds", "for `claude`, it adds"],
    ["for `codex`, it writes", "for `codex`, it writes"],
    ["where git reports the attribute as unspecified", "where git reports the attribute unspecified"],
    ["where git reports any other state", "where git reports any other state"],
    ["each git hook, the marketplace", "each git hook, the marketplace"],
    ["`core.hooksPath`, where it names", "`core.hooksPath` where it names"],
    ["a key of `.claude/settings.json`", "a key of `.claude/settings.json`"],
    ["`.gitattributes`, where it is left", "`.gitattributes` left holding"],
    ["`.githooks/`, `.claude/` or `.codex/`, where", "`.githooks/`, `.claude/` or `.codex/` left empty"],
  ]) parts[at(parts, start)].change = was(approvedStart);
  const on = at(parts, "it turns the hooks on by setting");
  parts.splice(on + 1, 0, P(
    "`sheriff init` stages only the git hooks.",
    "`sheriff init` добавляет в стейджинг только git-хуки.",
    "Было в обосновании: «So `sheriff init` stages the hooks it holds and nothing else: what else a commit holds stays its author's choice.» Требование перенесено в текст, потому что обоснование теперь говорит, зачем узел нужен в целом (правило 7.4.2). Это ваше решение от 2026-11-02, и его по-прежнему проверяет тест «…and stages nothing else»."));
  const merge = parts[at(parts, "`sheriff init` sets git to merge")];
  rep(K, merge, "en", "`sheriff init` sets git to merge", "`sheriff init` configures git to merge");
  rep(K, merge, "ru", "`sheriff init` настраивает git сливать", "`sheriff init` настраивает git так, чтобы он сливал");
  const unspecified = parts[at(parts, "where git reports the attribute as unspecified")];
  rep(K, unspecified, "en", ", and writes that file where it is missing;", ", creating that file where it is missing;");
  const outside = parts[at(parts, "Outside a git repository, `sheriff init` appends")];
  rep(K, outside, "en", "appends that line to `.gitattributes`", "appends the line `specs/_approvals.jsonl merge=union` to `.gitattributes`");
  rep(K, outside, "ru", "добавляет эту строку в `.gitattributes`", "добавляет строку `specs/_approvals.jsonl merge=union` в `.gitattributes`");
  const rule = parts[at(parts, "That section holds, as a draft, a rule")];
  rep(K, rule, "en", "That section holds, as a draft, a rule", "The top node of `project.json` holds, as a draft, a rule");
  rep(K, rule, "en", "Its text is “The tests run on every push.”", "Its text is “The tests run before every push.”");
  rep(K, rule, "ru", "Этот раздел содержит черновик правила", "Верхний узел `project.json` содержит черновик правила");
  rep(K, rule, "ru", "Его текст — «The tests run on every push.».", "Его текст — «The tests run before every push.».");
  const lacks = parts[at(parts, "Where `sheriff.config.json` holds an empty list")];
  rep(K, lacks, "en", "says how to set what it lacks", "says how to set what the file lacks");
  const replaces = parts[at(parts, "`sheriff init` replaces a hook, or a declaration")];
  replaces.en = "`sheriff init` replaces a hook, or a declaration that it writes into `.claude/settings.json` or `.codex/hooks.json`, where that hook or declaration holds what an earlier release of `sheriff init` wrote, and names each. It leaves as it is any other hook, declaration or file that differs from what it would write, and names each. So `sheriff init`, when run again, changes nothing (§s-jsqxdx47wkkj7gp).";
  replaces.ru = "`sheriff init` заменяет хук или объявление, которое он пишет в `.claude/settings.json` или `.codex/hooks.json`, если этот хук или объявление содержит то, что писал прежний выпуск `sheriff init`, и называет каждый из них. Любой другой хук, объявление или файл, который отличается от того, что он записал бы, он оставляет как есть и называет. Поэтому при повторном запуске `sheriff init` ничего не меняет (§s-jsqxdx47wkkj7gp).";
  replaces.change += " Добавлено: так же `sheriff init` оставляет как есть и называет объявление, изменённое вручную, — так делает код (init.ts); прежде текст говорил только о файлах.";
  const texts = parts[at(parts, "A hook or a declaration holds what an earlier release wrote")];
  rep(K, texts, "en", "The SpecSheriff tools keep those texts.", "The SpecSheriff tools store those texts.");
  texts.change = "Было: «A hook or a declaration holds what an earlier release wrote where, line endings aside, it equals one of the texts the earlier releases wrote. The SpecSheriff tools keep those texts.» Без изменений по смыслу.";
  const elsewhere = parts[at(parts, "Where the repository's hooks ran from elsewhere before")];
  rep(K, elsewhere, "en", "It says that each one does not run until it is moved", "It says that none of them runs until it is moved");
  rep(K, elsewhere, "ru", "Он говорит, что каждый из них не запускается, пока его не переместят", "Он говорит, что ни один из них не запускается, пока его не переместят");
  const leaves = parts[at(parts, "`sheriff remove` leaves each hook and declaration")];
  rep(K, leaves, "en", "`sheriff remove` leaves each hook and declaration that differs from what `sheriff init` writes, and names it.", "`sheriff remove` leaves each hook and declaration that differs from every text that `sheriff init` writes now or wrote in an earlier release, and names it.");
  rep(K, leaves, "ru", "Каждый хук и каждое объявление, которые отличаются от того, что пишет `sheriff init`, `sheriff remove` оставляет и называет.", "Каждый хук и каждое объявление, которые не совпадают ни с одним текстом, который `sheriff init` пишет сейчас или писал в прежнем выпуске, `sheriff remove` оставляет и называет.");
  leaves.change = "Было: «`sheriff remove` leaves each hook and declaration that differs, naming it. It leaves `specs/` as it is, naming it.» Первое предложение — без изменений по смыслу: сказано, от чего хук или объявление отличается, — ни от одного текста, который `sheriff init` пишет сейчас или писал в прежнем выпуске, как и в первом пункте списка выше. Новое: `sheriff remove` оставляет и файл привязок `sheriff.bindings.json`, называя его. Этот файл содержит SpecTag файлов, формат которых не допускает комментариев, то есть принадлежит коду проекта так же, как SpecTag в комментариях, которых `sheriff remove` тоже не трогает; `sheriff init` этот файл не пишет.";
  p.parts = parts;
  rep(K, p, "reasonChange", "Убран абзац о правиле, одобрявшем спецификацию: его больше нет.", "Убран абзац о правиле, одобрявшем спецификацию: его больше нет. То, что `sheriff init` добавляет в стейджинг только хуки (ваше решение от 2026-11-02), перенесено в текст.");
  const union = p.examples[1];
  rep(K, union, "en", "Because `sheriff init` set git to merge that file by union, the merge keeps both lines and puts the line of the branch being merged last.", "Because `sheriff init` configured git to merge that file by union, the merge keeps both lines and puts the line from the branch being merged after the line from the current branch.");
  rep(K, union, "ru", "Поскольку `sheriff init` настроил git сливать этот файл по union, слияние сохраняет обе строки и ставит строку вливаемой ветки последней.", "Поскольку `sheriff init` настроил git так, чтобы он сливал этот файл по union, слияние сохраняет обе строки и ставит строку вливаемой ветки после строки текущей ветки.");
  const section = p.examples[2];
  rep(K, section, "en", "The most likely mistake is to write the section without a rule, which that check refuses.", "The most likely mistake is to write the section without a rule, so that the check refuses the first commit.");
  rep(K, section, "ru", "Самая вероятная ошибка — записать раздел без правила, который эта проверка отвергает.", "Самая вероятная ошибка — записать раздел без правила: тогда эта проверка отвергает первый коммит.");
  const e = drafts[K];
  rep(K, e, "stage3", "the text “The tests run on every push.”", "the text “The tests run before every push.”");
}

// ---------------------------------------------------------------------------------------------------------------
// proposal:s-gb8s9657a65hqmv-g6: review b-c, R1, R2, the stage-3 note and the example; the readers' findings on its
// agreed sentences, as fix-brief-group6-c.md lists them.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "proposal:s-gb8s9657a65hqmv-g6";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const kinds = at(parts, "A renamed key keeps its place among the node's keys.");
  parts.splice(kinds, 1,
    P("A renamed key keeps its place among the node's keys.",
      "Переименованный ключ сохраняет своё место среди ключей узла.",
      "Как в согласованной формулировке."),
    P("The name of a kind of node is also renamed in each of these places:",
      "Имя типа узлов переименовывается также в каждом из этих мест:",
      "Было: «A kind of node is also renamed where a field's values are the sids of that kind's nodes, and where the project's extension of the schema declares `fields` for that kind.» Без изменений по смыслу: сказано, где стоит имя типа, и что его переименовывают в каждом из этих мест, а не только там, где выполнено и то и другое."),
    L("the source of a field's values, where those values are the sids of that kind's nodes;",
      "в источнике значений поля, если эти значения — sid узлов этого типа;",
      "Без изменений по смыслу."),
    L("the `fields` of the project's extension of the schema, where the name is the key under which those `fields` add properties to that kind.",
      "в `fields` расширения схемы проекта, где это имя — ключ, под которым эти `fields` добавляют свойства этому типу.",
      "Без изменений по смыслу."));
  const bare = parts[at(parts, "A bare sid is a word")];
  rep(K, bare, "en", "and occurs in one of these places:", "and meets one of these conditions:");
  rep(K, bare, "ru", "которое стоит в одном из этих мест:", "которое отвечает одному из этих условий:");
  bare.change = "Было: «… and occurs in one of these places:» Без изменений по смыслу: пункты ниже — условия, а не места.";
  const mark = parts[at(parts, "it is the only argument of the test's mark.")];
  rep(K, mark, "en", "the test's mark.", "a test's mark.");
  mark.change = "Было: «it is the only argument of the test's mark.» Без изменений по смыслу: тест выше не назван.";
  const UNTIL_EN = ["until `sheriff.config.json` holds an entry that sets the specification's approval status,", "where `sheriff.config.json` holds no entry that sets the specification's approval status,"];
  const UNTIL_RU = ["пока в `sheriff.config.json` нет записи, задающей статус одобрения спецификации,", "если в `sheriff.config.json` нет записи, задающей статус одобрения спецификации,"];
  const replaced = parts[at(parts, "until `sheriff.config.json` holds an entry that sets the specification's approval status, an approved rule")];
  rep(K, replaced, "en", ...UNTIL_EN);
  rep(K, replaced, "ru", ...UNTIL_RU);
  replaced.change = "Было: «until `sheriff.config.json` holds an entry that sets the specification's approval status, …» Без изменений по смыслу: «until» читалось и как условие, и как действие, которое повторяется, пока запись не появится. Добавлена ссылка на узел, который задаёт вид записи (правило 7.2.7).";
  const names = parts[at(parts, "that entry names the owner who last approved that rule;")];
  names.en = "the entry that approves the specification names the owner who last approved the rule that the entry replaces;";
  names.ru = "запись, которая одобряет спецификацию, называет ответственного, который последним одобрил заменённое ею правило;";
  names.change = "Было: «that entry names the owner who last approved that rule;» Без изменений по смыслу: запись и правило названы прямо, а не словами «that entry» и «that rule», которые указывали на предыдущий пункт списка.";
  const moved = parts[at(parts, "that rule is moved to the archive")];
  rep(K, moved, "en", "that rule is moved to the archive", "the rule that the entry replaces is moved to the archive");
  rep(K, moved, "ru", "это правило уходит в архив (§s-f2b5zvc565s242f) с причиной", "заменённое записью правило уходит в архив (§s-f2b5zvc565s242f) с причиной");
  moved.change = "Было: «that rule is moved to the archive …» Без изменений по смыслу: правило названо прямо, а не словами «that rule».";
  const draft = parts[at(parts, "until `sheriff.config.json` holds an entry that sets the specification's approval status, a draft rule")];
  draft.en = "where `sheriff.config.json` holds no entry that sets the specification's approval status, a draft rule of `project.json` that refines the rule on that status is moved to the archive with the same reason if it was ever approved, and is deleted otherwise (§s-f2b5zvc565s242f);";
  draft.ru = "если в `sheriff.config.json` нет записи, задающей статус одобрения спецификации, черновик правила `project.json`, которое уточняет правило об этом статусе, уходит в архив с той же причиной, если его хоть раз одобряли, а иначе удаляется (§s-f2b5zvc565s242f);";
  draft.change = "Новое: правило, которое одобряло спецификацию, вы заменили записями (решение от 2026-11-13: статус задаёт запись ответственного, без правила посредине), а черновик такого правила, который писал каждый прежний `sheriff init`, оставался бы в `project.json`. Если бы ответственный его одобрил, следующий `sheriff reindex` одобрил бы спецификацию без проверок правила 10.6. Такой черновик часто был когда-то одобрен: прежний выпуск делал спецификацию черновиком, отзывая одобрение этого правила. Поэтому, как требует правило 2.6, черновик, который хоть раз одобряли, уходит в архив, а остальные удаляются.";
  const tests = parts[at(parts, "where `project.json`, once such a rule is archived or removed")];
  tests.en = "in the run that archives or deletes such a rule, where `project.json` is left holding no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added under the top node of `project.json`;";
  tests.ru = "в том запуске, который переносит такое правило в архив или удаляет его, если в `project.json` не остаётся правила, которое уточняет правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h), под верхний узел `project.json` добавляется черновик правила о том, когда запускаются тесты, который пишет `sheriff init` (§s-7unxytshhc4md54);";
  rep(K, tests, "change", "уходит в архив, а его черновик удаляется,", "уходит в архив, а его черновик уходит в архив или удаляется,");
  const chosen = parts[at(parts, "Where a node of the specification is of a kind")];
  rep(K, chosen, "en", "and the project has yet to choose that extension", "and the project has not chosen that extension");
  rep(K, chosen, "ru", "а проекту ещё предстоит выбрать это расширение", "а проект это расширение не выбрал");
  chosen.change = "Было: «… and the project has yet to choose that extension …» Без изменений по смыслу: «has yet to» подразумевало, что проект ещё выберет расширение. Добавлена ссылка на определение расширения guidelines там, где узел впервые его называет (правило 7.2.7).";
  p.parts = parts;
  p.reason = "Each file and each test of a project follows the form used by the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them in a different form rewrites them, so that nobody has to rewrite a project by hand and no approval is lost because of a rename.";
  p.reasonChange = "Было: «Each file and each test of a project is written in the form of the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them differently rewrites them, …» Без изменений по смыслу: в английском тексте сказано, что файл следует форме, которую использует выпуск, и с чем сравнивается «иначе». Русский текст — как вы согласовали.";
  p.examples = [X(
    "In a project that an earlier release set up, the only rule of `project.json` is an approved rule that refines the rule on the specification's approval status. `sheriff reindex` replaces that rule with an entry that approves the specification and, in the same run, adds the draft rule on when the tests run. The most likely mistake is to add that draft rule again in a later run, after the project has deleted it.",
    "В проекте, который настроил прежний выпуск, единственное правило `project.json` — одобренное правило, которое уточняет правило о статусе одобрения спецификации. `sheriff reindex` заменяет это правило записью, которая одобряет спецификацию, и в том же запуске добавляет черновик правила о том, когда запускаются тесты. Самая вероятная ошибка — добавить этот черновик снова в одном из следующих запусков, после того как проект его удалил.")];
  const e = drafts[K];
  e.change = "Добавлены два пункта. Первый: если в `sheriff.config.json` нет записи о статусе одобрения, черновик правила `project.json` об этом статусе, который писал каждый прежний `sheriff init`, уходит в архив с той же причиной, если его хоть раз одобряли, а иначе удаляется (правило 2.6): статус задаёт только запись ответственного (ваше решение от 2026-11-13), а одобренный черновик иначе одобрил бы спецификацию без проверок правила 10.6. Второй: в том запуске, который переносит в архив или удаляет правило об одобрении, если в `project.json` не остаётся правила, которое уточняет правило 1.6.4 о том, когда тесты должны проходить, `sheriff reindex` добавляет то же правило-черновик о моменте запуска тестов с `push`, что пишет `sheriff init`, и называет его. Почему: иначе раздел `project.json`, где правило об одобрении было единственным (так в этом репозитории), остался бы без правила, и строка 10.1.18 отвергла бы первый коммит после обновления; а проект, у которого при прежнем выпуске хук pre-push запускал тесты, потерял бы это молча. Сценарий вместо ручного шага — по вашему правилу «What can run as a deterministic process is automated». Ещё добавлены переименования ключа `declaration` внутри `jsonSchema` и `valueList` в `pointer` и `symbol` (ваши решения от 2026-11-13 по строке 10.1.35), на которые опирается узел об отпечатке. Ссылка за отпечатком ведёт на новый узел «The fingerprint of a node's wording». Добавлены ссылки при первом упоминании архива, `TextRule.list`, записи, расширения guidelines, кода системы и собственных проверок и генераторов проекта (правило 7.2.7). Согласованные предложения, которые читались двояко, переписаны без изменения смысла: «until … holds an entry» стало «where … holds no entry»; «that entry» и «that rule» в соседних пунктах названы прямо; предложение о переименовании типа узла говорит, где стоит имя типа; «occurs in one of these places» стало «meets one of these conditions»; «the test's mark» стало «a test's mark»; «has yet to choose» стало «has not chosen»; последний абзац больше не говорит «in this way»; в английском обосновании сказано, что файл следует форме, которую использует выпуск. Добавлен пример. Остальная формулировка — как вы согласовали.";
  e.stage3 = "reindex.ts is to archive, where sheriff.config.json holds no entry for the approval status, a draft rule of project.json that refines s-qzthyh7yqvfhsa2 and that specs/_approvals.jsonl shows was ever approved, with the reason that the approved rule gets, and to delete such a draft rule otherwise. In the run in which it archives or deletes such a draft rule, or replaces such an approved rule with an entry, it is then to add under the top node of project.json the draft rule that sheriff init writes (s-7unxytshhc4md54), with a new sid, where project.json holds no rule with a refines link to s-x8uzc8z44pwtd3h, and to name that rule. The code at reindex.ts:208–218, which adds the rule that approves the specification (approvalRuleNode) wherever project.json lacks one, goes: otherwise that addition and the archiving or deletion above would undo each other on every run. It is also to rename the key declaration inside TextRule.list.jsonSchema and TextRule.list.valueList to pointer and symbol, and to name each file that it rewrites because an earlier release wrote or read it differently. Tests for each, and for a second run that changes nothing, are written first; the test “reads the confirmations an earlier release wrote…” at approve.test.ts:141 moves here from s-v4qus7raqnwzneb. In this repository and in the saloon, the first sheriff reindex of the release then writes the rule, which the owner approves.";
}

// ---------------------------------------------------------------------------------------------------------------
// proposal:s-7pk89t8z6wymmj9-g6: the paragraph on `sheriff settings` cut (review b-b, A3; review b-d, nit b), review
// b-d, nits a and c; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "proposal:s-7pk89t8z6wymmj9-g6";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const onFailure = parts[at(parts, "Where the member that lists the check is an object")];
  rep(K, onFailure, "en", "the rule says that the check's failure is only reported while the specification's `strict` flag (§s-q3pfzyaxvpr2zj2) is off.", "the rule says that, while the specification's `strict` flag (§s-q3pfzyaxvpr2zj2) is off, the check's failure is only reported.");
  rep(K, onFailure, "ru", "правило говорит, что о неудаче проверки только сообщается, пока флаг `strict` спецификации (§s-q3pfzyaxvpr2zj2) выключен.", "правило говорит, что, пока флаг `strict` спецификации (§s-q3pfzyaxvpr2zj2) выключен, о неудаче проверки только сообщается.");
  rep(K, onFailure, "ru", "Флаг `sheriff validate` читает из модели спецификации, которую передаёт проверке.", "`sheriff validate` читает флаг из модели спецификации, которую передаёт проверке.");
  const settings = at(parts, "Before `sheriff settings` records an approval of the specification");
  if (settings >= 0) parts.splice(settings, 1);
  p.parts = parts;
  dropRef(p, "s-chsfpkgpmfk4fft");
  dropRef(p, "s-m59dqwkw2e96wne");
  p.removed = [
    "The paragraph on the project's own checks that `sheriff settings` runs before it records an approval of the specification or turns the `strict` flag on, with its `cites` link to “The settings that only an owner of the specification changes” (s-chsfpkgpmfk4fft): “Approving the specification” (s-m59dqwkw2e96wne) states which model those checks receive, and “Turning the `strict` flag on” (s-nxgkp988mej79eg) states how they run before the flag is turned on, by the owner's rule “One statement, one home”.",
  ];
  p.reason = "Whenever `sheriff validate` makes the checks that the SpecSheriff guidelines require, it also runs a project's own checks, on the same files. Such a check therefore binds every participant, rather than depending on someone remembering to run it (§s-2fau85dfyyeq66m).";
  p.reasonChange = "Было: «Whenever `sheriff validate` makes its checks of the SpecSheriff guidelines, it also runs a project's own checks, on the same files. Such a check therefore binds every participant, rather than depending on whoever remembers to run it (§s-2fau85dfyyeq66m).» Без изменений по смыслу: «its checks of the SpecSheriff guidelines» читалось и как проверки самого текста guidelines, а «whoever remembers» — как зависимость от человека, а не от того, вспомнит ли кто-нибудь. Русский текст — как вы согласовали.";
  rep(K, p.examples[1], "en", "The flag is then turned on, and the next commit is refused.", "The flag is then turned on, and the next commit is refused because of that check.");
  rep(K, p.examples[1], "ru", "Тогда флаг включается, и следующий коммит отвергается.", "Тогда флаг включается, и следующий коммит отвергается из-за этой проверки.");
  const e = drafts[K];
  e.change = "Добавлено значение `onFailure`: `reportedUnlessStrict` — правило говорит, что, пока флаг `strict` выключен, о неудаче проверки только сообщается; при включённом флаге `sheriff validate` отвергает изменение по общему правилу первого абзаца. Флаг берётся из модели, которую получает проверка, так что `sheriff validate --strict` и запуск перед включением флага такую неудачу отвергают. Почему: правило 10.7 позволяет правилу собственных guidelines проекта сделать проверку строже, пока флаг включён, и его второй пример описывает именно такую собственную проверку; прежде одна проверка не могла этого выразить: понадобились бы две. Решает правило, которое перечисляет проверку, а не инструменты SpecSheriff, как вы постановили 2026-11-04 по правилу 10.8: проверка с `reported` и при включённом флаге только сообщает, как говорит стоимость строки 10.1.37. Связь с правилом 10.7 теперь `implements`: узел реализует его второй пример. Абзац о списке разделён: всё об `onFailure` — в одном абзаце. Убран абзац о том, что `sheriff settings` запускает собственные проверки проекта перед одобрением спецификации и перед включением флага `strict`, вместе со ссылкой на узел о `sheriff settings`: по вашему правилу «One statement, one home» это говорят узлы группы 6 «Approving the specification» и «Turning the `strict` flag on». В английском обосновании уточнены слова без изменения смысла. Добавлен пример. Остальная формулировка — как вы согласовали.";
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
  const agreedText = e.base ? (drafts[e.base].proposal?.text ?? drafts[e.base].text) : toolsText(key);
  if (agreedText) for (const x of p.parts) if (UNCHANGED.test(x.change.trim()) && !agreedText.includes(x.en)) problems.push(`${key}: a part marked unchanged differs from its agreed wording: ${x.en.slice(0, 70)}…`);
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

// english-group6c.md: the English of every changed node of the group.
const md = [
  "# T25, group 6, round c: the English of every changed node",
  "",
  "This file holds the English of every node of group 6 that round c changed, as `tools-drafts.json` holds it after fix-group6-c.mjs. Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "fix-group6-c.mjs writes this file; edit the script, not this file.",
  "",
];
for (const key of GROUP.filter((k) => changed.has(k))) {
  const e = drafts[key];
  const p = e.proposal;
  md.push(`## ${key} — ${p.title}`, "");
  if (key.startsWith("proposal:")) md.push(`A proposal: the complete new wording of the draft \`${e.base}\`, which the owner has agreed to, for the node ${e.sidValue}.`, "");
  md.push(`**Title:** ${p.title}`, "", "**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group6c.md", here), md.join("\n"));

console.log(`changed ${changed.size} drafts: ${[...changed].join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
