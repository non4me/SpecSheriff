// T25, stage 2, group 6, round d: applies the final review on the drafts of group 6 (review-g6c-a.md to
// review-g6c-d.md, english-g6c-fast.md, english-g6c-thorough.md) as fix-brief-group6-d.md says, with the points that
// brief settles. Copies tools-drafts.json to tools-drafts.before-group6-d.json on its first run and rebuilds from that
// copy on every run, so that it is idempotent. Each patch fails where it does not find the part or the text it
// replaces. Runs the checks of fix-group6-c.mjs before it writes. Writes english-group6d.md, which holds only the
// English sentences that this round changed, each under its key. It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group6-d.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const REVIEW = "specsheriff-rule-reviewer, 2026-11-25: review-g6-a.md to review-g6-d.md, review-g6b-a.md to review-g6b-d.md, then review-g6c-a.md to review-g6c-d.md; EngStickler's readers: english-g6-fast.md, english-g6-thorough.md, english-g6b-fast.md, english-g6b-thorough.md, english-g6c-fast.md and english-g6c-thorough.md; fix-group6-b.mjs, fix-group6-c.mjs and fix-group6-d.mjs applied the findings as group6-notes.md, rounds b to d, says";

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
// s-v4qus7raqnwzneb, "How an approval is recorded": review c-a, R1 (settled by rule 1.3.3) and R2; the readers.
// ---------------------------------------------------------------------------------------------------------------
const NO_WHITESPACE = [["with no whitespace,", "with no whitespace outside string values,"], ["без пробелов", "без пробелов вне строковых значений"]];
{
  const K = "s-v4qus7raqnwzneb";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const first = parts[at(parts, "`specs/_approvals.jsonl` (§s-zefk589ykh37b8u) records")];
  rep(K, first, "en", ...NO_WHITESPACE[0]);
  rep(K, first, "ru", ...NO_WHITESPACE[1]);
  const withdrawn = parts[at(parts, "`withdrawn`, which only a line")];
  withdrawn.en = "`withdrawn`, with the value `true`, which appears only in a line that withdraws an approval;";
  withdrawn.ru = "`withdrawn` со значением `true`, который есть только в строке, отзывающей одобрение;";
  const last = parts[at(parts, "A node's last approval is")];
  last.en = "A node's last approval is the latest line for the node's sid and the fingerprint of its current wording, where that line is an approval. Otherwise, a node's last approval is the last line for the node's sid that is an approval, whether or not a later line withdraws that approval.";
  last.ru = "Последнее одобрение узла — самая поздняя строка для sid узла и отпечатка его нынешней формулировки, если эта строка — одобрение. Иначе последнее одобрение узла — последняя строка для sid узла, которая является одобрением, независимо от того, отзывает ли это одобрение более поздняя строка.";
  rep(K, drafts[K], "stage3", "A function for a node's last approval, the last line for its sid without withdrawn, is to be added,", "A function for a node's last approval, as the node defines it, is to be added,");
  rep(K, drafts[K], "stage3", "A test for a node's last approval is written first.", "A test for a node's last approval, including an edit that restores an earlier wording whose approval is in force, is written first.");
  last.change = "Новое: определение последнего одобрения узла, на которое опираются согласованные узлы «What `sheriff types` generates» и «An approved rule whose tests or code lag behind it». Если правка вернула прежнюю формулировку, одобрение которой в силе, то по правилу 1.3.3 узел одобрен именно в этой формулировке, поэтому его последнее одобрение — строка для неё, и по правилу 10.15 код генерируется из формулировки, которая в узле сейчас. Иначе узел «An approved rule whose tests or code lag behind it» отвергал бы каждый следующий коммит, и ни одна команда не сняла бы этот отказ. Если одобрение нынешней формулировки не в силе, последнее одобрение — последняя строка-одобрение, даже отозванная, как требует правило 10.15.";
  p.parts = parts;
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-11-fingerprint: review c-a, F1; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-11-fingerprint";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const hash = parts[at(parts, "The fingerprint of a node's wording")];
  rep(K, hash, "en", "of the UTF-8 bytes of one string.", "of the UTF-8 bytes of a single string.");
  const string = parts[at(parts, "That string is the text")];
  rep(K, string, "en", ...NO_WHITESPACE[0]);
  rep(K, string, "ru", ...NO_WHITESPACE[1]);
  parts[at(parts, "the node's `reason`, under the key `rationale`;")].change = "Без изменений по смыслу.";
  parts[at(parts, "the name of a kind of node in the source")].change = "Новое: так код уже сохраняет одобрения при переименовании типов узлов (model.ts), а согласованный узел «What `sheriff reindex` changes in what an earlier release wrote» требует, чтобы переименованный тип узла оставлял отпечаток прежним.";
  p.parts = parts;
  rep(K, drafts[K], "stage3", "so a change of the kind alone leaves an approval in force (review g6-a, F4); the main session records for the base specification whether the kind should be part of the wording.", "so a change of the kind alone leaves an approval in force. Whether the kind should be part of the wording is a question recorded for the base specification.");
  rep(K, p, "reason", "and no other change does (§s-5ah25f6gy99panq).", "and no other change to the node does (§s-5ah25f6gy99panq).");
  rep(K, p.examples[1], "en", "holds a rule and a text that says what", "holds a rule and text that says what");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-11-approve and new:tools-11-withdraw: review c-a, A1 and W1; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-11-approve";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const all = parts[at(parts, "Where `sheriff approve` refuses any sid")];
  rep(K, all, "en", "it records none of the run's approvals.", "it records none of the run's approvals and changes no node's status.");
  rep(K, all, "ru", "он не записывает ни одного одобрения этого запуска.", "он не записывает ни одного одобрения этого запуска и не меняет статус ни одного узла.");
  p.parts = parts;
}
{
  const K = "new:tools-11-withdraw";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const first = parts[at(parts, "`sheriff approve --withdraw <sid>...` withdraws")];
  rep(K, first, "en", "For each approval in force of a wording (§s-5ah25f6gy99panq) of such a node, whether or not the node holds that wording now,", "For each approval of a wording (§s-5ah25f6gy99panq) of such a node, where that approval is in force and whether or not the node holds that wording now,");
  rep(K, first, "ru", "Для каждого одобрения формулировки (§s-5ah25f6gy99panq) такого узла, которое в силе, — есть ли эта формулировка в узле сейчас или нет, —", "Для каждого одобрения формулировки (§s-5ah25f6gy99panq) такого узла, если это одобрение в силе, — есть ли эта формулировка в узле сейчас или нет, —");
  rep(K, first, "en", "the first line for each such wording comes in the file.", "the first line for each such wording appears in the file.");
  const all = parts[at(parts, "Each refusal names the sid concerned.")];
  rep(K, all, "en", "it records none of the run's withdrawals.", "it records none of the run's withdrawals and changes no node's status.");
  rep(K, all, "ru", "он не записывает ни одного отзыва этого запуска.", "он не записывает ни одного отзыва этого запуска и не меняет статус ни одного узла.");
  p.parts = parts;
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-2-entries: review c-b, E1; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-2-entries";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const by = parts[at(parts, "An entry's `by` holds")];
  rep(K, by, "en", "the owner who made the change.", "the owner who made the change that the entry records.");
  rep(K, by, "ru", "ответственного, сделавшего изменение.", "ответственного, сделавшего изменение, которое вносит запись.");
  const none = parts[at(parts, "Where `sheriff.config.json` holds no entry for the approval status")];
  rep(K, none, "en", "Where it holds no entry for the `strict` flag,", "Where `sheriff.config.json` holds no entry for the `strict` flag,");
  rep(K, none, "ru", "Если в нём нет ни одной записи флага `strict`,", "Если в `sheriff.config.json` нет ни одной записи флага `strict`,");
  p.parts = parts;
  p.reason = "The entries keep every change that an owner has made to these settings, each with the email address of the owner who made it, but only the last entry of each list sets the value of its setting. `sheriff reindex` writes an entry in place of the rule through which an owner approved the specification in an earlier release (§s-gb8s9657a65hqmv). Since no entry holds anything that depends on when it is written, the check on the entries (§s-j9r8z4xdrfkfs47) never mistakes the entry that `sheriff reindex` writes for an entry that was changed.";
  p.ruReason = "Записи хранят каждое изменение этих настроек ответственным вместе с адресом электронной почты ответственного, который его сделал, но значение каждой настройки задаёт только последняя запись её списка. `sheriff reindex` пишет запись вместо правила, которым ответственный одобрял спецификацию в прежнем выпуске (§s-gb8s9657a65hqmv). Поскольку ни одна запись не содержит ничего, что зависит от времени её создания, проверка записей (§s-j9r8z4xdrfkfs47) никогда не принимает запись, которую пишет `sheriff reindex`, за изменённую.";
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-2-approve-spec: review c-d, fix 2, and review c-b, A1, as fix-brief-group6-d.md settles them; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-2-approve-spec";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const rest = parts[at(parts, "The checks before an approval treat everything else")];
  rep(K, rest, "en", "as unchanged by that commit.", "as unchanged by that one commit.");
  rep(K, rest, "ru", "считают не изменённым этим коммитом.", "считают не изменённым этим одним коммитом.");
  const strict = parts[at(parts, "While the `strict` flag is on, `sheriff settings` first runs")];
  strict.en = "While the `strict` flag is on, `sheriff settings` first runs the checks that the flag makes stricter, as it does when asked to turn the flag on (§s-nxgkp988mej79eg). It refuses to record the approval in each case in which it would refuse to turn the flag on. The run of `sheriff settings` ends with that refusal. The refusal is the same as the refusal to turn the flag on in that case.";
  strict.ru = "Пока флаг `strict` включён, `sheriff settings` сначала выполняет проверки, которые флаг делает строже, так же как когда её просят включить флаг (§s-nxgkp988mej79eg). Она отказывается вносить одобрение в каждом случае, в котором отказалась бы включить флаг. Запуск `sheriff settings` на этом отказе заканчивается. Этот отказ — такой же, как отказ включить флаг в том же случае.";
  strict.change += " Эти случаи названы один раз — в узле «Turning the `strict` flag on» (ваше правило «One statement, one home»).";
  p.parts = parts;
  rep(K, p.examples[0], "en", "R is then not among the rules that this commit includes,", "R is then not among the rules that the assumed commit includes,");
  rep(K, p.examples[0], "ru", "Тогда R не входит в правила, которые включает этот коммит,", "Тогда R не входит в правила, которые включает этот предполагаемый коммит,");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-2-strict: review c-d, fixes 1 and 3; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-2-strict";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const intro = parts[at(parts, "The checks that the `strict` flag makes stricter")];
  rep(K, intro, "en", "the cases in which each would refuse such a commit or a push,", "the cases in which each would refuse a commit or a push that changes nothing,");
  rep(K, intro, "ru", "случаи, в которых каждая из них отвергла бы такой коммит или push,", "случаи, в которых каждая из них отвергла бы коммит или push, который ничего не меняет,");
  const untagged = parts[at(parts, "the check for code and tests outside the commit")];
  rep(K, untagged, "en", "would list any code,", "would list anything,");
  rep(K, untagged, "ru", "перечислила бы хоть какой-то код,", "перечислила бы хоть что-нибудь,");
  const files = parts[at(parts, "`sheriff settings` also refuses to turn the flag on")];
  files.en = "`sheriff settings` also refuses to turn the `strict` flag on while the files of the specification fail the check for a key written more than once (§s-7zqsstgnuc772ba) or the validation against their schema (§s-xzcw3hv4hmxz7h7). The refusal names `sheriff validate`, which lists what those checks find.";
  files.ru = "`sheriff settings` отказывается включить флаг `strict` и тогда, когда файлы спецификации не проходят проверку на ключ, записанный больше одного раза (§s-7zqsstgnuc772ba), или проверку на соответствие своей схеме (§s-xzcw3hv4hmxz7h7). Отказ называет `sheriff validate`, который перечисляет то, что находят эти проверки.";
  files.change += " Этот отказ, как и остальные, называет команду, которая перечисляет то, что находят проверки (правило 10.7).";
  p.parts = parts;
  rep(K, drafts[K], "stage3", "fail the check for a key written more than once or the validation against their schema.", "fail the check for a key written more than once or the validation against their schema, naming sheriff validate.");
}

// ---------------------------------------------------------------------------------------------------------------
// new:tools-2-extension-off: review c-b, X-n1; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "new:tools-2-extension-off";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const which = parts[at(parts, "A node other than the extension's own nodes")];
  which.en = "A node other than the extension's own nodes depends on the extension where any of the following holds, whether or not the node is in the archive (§s-f2b5zvc565s242f):";
  which.ru = "Узел, который не входит в само расширение, зависит от расширения, если выполнено что-нибудь из следующего, будь он в архиве (§s-f2b5zvc565s242f) или нет:";
  const reference = parts[at(parts, "A reference in the project's extension of the schema")];
  rep(K, reference, "en", "a definition that the `$defs` of the extension's schema add", "a definition that the `$defs` of that extension's schema add");
  rep(K, reference, "en", "a kind that the `kinds` of the extension's schema add.", "a kind that the `kinds` of that extension's schema add.");
  rep(K, reference, "en", "and the JSON Pointer to it.", "and the JSON Pointer to that reference or kind.");
  rep(K, reference, "ru", "которое добавляют `$defs` схемы расширения", "которое добавляют `$defs` схемы этого расширения");
  rep(K, reference, "ru", "который добавляют `kinds` схемы расширения.", "который добавляют `kinds` схемы этого расширения.");
  rep(K, reference, "ru", "и указателю JSON Pointer на них.", "и указателю JSON Pointer на эту ссылку или этот тип.");
  p.parts = parts;
}

// ---------------------------------------------------------------------------------------------------------------
// s-7unxytshhc4md54: review c-c, T-1, N1 and N2; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "s-7unxytshhc4md54";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const stage = parts[at(parts, "it stages, with the executable mode 100755")];
  rep(K, stage, "ru", "каждый хук там, который", "каждый хук в этой папке, который");
  const on = parts[at(parts, "it turns the hooks on by setting")];
  on.en = "it turns the hooks on by setting git's `core.hooksPath` to `.githooks`, and says how to set `core.hooksPath` where it cannot set it.";
  on.ru = "включает хуки, задавая в git `core.hooksPath` равным `.githooks`, а если не может задать `core.hooksPath`, говорит, как его задать.";
  on.change += " Новое в тексте: если `sheriff init` не может задать `core.hooksPath`, например вне репозитория git, он говорит, как его задать, — так делает код (init.ts).";
  const list = parts[at(parts, "The rule's `TextRule.list`")];
  rep(K, list, "en", "The rule's `TextRule.list`", "The draft rule's `TextRule.list`");
  rep(K, list, "ru", "(§s-eferktypcj7njt5) этого правила", "(§s-eferktypcj7njt5) этого черновика правила");
  const replaces = parts[at(parts, "`sheriff init` replaces a hook, or a declaration")];
  rep(K, replaces, "en", "It leaves as it is any other hook, declaration or file that differs from what it would write, and names each.", "It leaves as it is any other hook or declaration that differs from what it would write, and any `.claude/settings.json` or `.codex/hooks.json` that is not JSON, and names each.");
  rep(K, replaces, "ru", "Любой другой хук, объявление или файл, который отличается от того, что он записал бы, он оставляет как есть и называет.", "Любой другой хук или объявление, которые отличаются от того, что он записал бы, а также `.claude/settings.json` или `.codex/hooks.json`, который не является JSON, он оставляет как есть и называет каждый из них.");
  replaces.change = "Было: «`sheriff init` replaces a hook or a declaration that holds what an earlier release of `sheriff init` wrote, naming each. It replaces no other file that differs from what it would write, and names each one instead. So, run again, it changes nothing.» Без изменений по смыслу: сказано через то, что команда делает, а не через то, чего она не делает, и названы файлы, о которых шла речь: хук, а также `.claude/settings.json` или `.codex/hooks.json`, который не является JSON. Объявление пояснено при первом упоминании: это то, что `sheriff init` пишет в `.claude/settings.json` или `.codex/hooks.json`. Добавлено: так же `sheriff init` оставляет как есть и называет объявление, изменённое вручную, — так делает код (init.ts).";
  const elsewhere = parts[at(parts, "Where the repository's hooks ran from elsewhere before")];
  rep(K, elsewhere, "en", "Where the repository's hooks ran from elsewhere before,", "Where the repository's hooks previously ran from elsewhere,");
  elsewhere.change = "Было: «Where the repository's hooks ran from elsewhere before, from `.git/hooks/` or from another folder `core.hooksPath` named, `sheriff init` names each hook found there, git's samples aside. It says that each one no longer runs until it is moved into `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p).» Без изменений по смыслу.";
  const leaves = parts[at(parts, "`sheriff remove` leaves each hook and declaration")];
  rep(K, leaves, "en", "the project's own tools in it (§s-n4m5zvh96yb299p)", "the project's own tools in that folder (§s-n4m5zvh96yb299p)");
  p.parts = parts;
  rep(K, p.examples[1], "en", "git raises a conflict in that file.", "git reports a conflict in that file.");
}

// ---------------------------------------------------------------------------------------------------------------
// proposal:s-gb8s9657a65hqmv-g6: review c-c, R-1, N3 and N4; the readers.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "proposal:s-gb8s9657a65hqmv-g6";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const kind = parts[at(parts, "The name of a kind of node is also renamed")];
  kind.en = "The name of a kind of node is also changed in each of these places:";
  kind.ru = "Имя типа узлов меняется также в каждом из этих мест:";
  kind.change = "Было: «A kind of node is also renamed where a field's values are the sids of that kind's nodes, and where the project's extension of the schema declares `fields` for that kind.» Без изменений по смыслу: сказано, где стоит имя типа, и что его меняют в каждом из этих мест, а не только там, где выполнено и то и другое.";
  const lines = parts[at(parts, "where `specs/_approvals.jsonl` already exists")];
  rep(K, lines, "en", "with that key renamed,", "with `owner` renamed to `by`,");
  rep(K, lines, "ru", "с переименованным ключом,", "где `owner` переименован в `by`,");
  lines.change = "Было: «… the lines of `specs/_confirmations.jsonl`, with that key renamed, are appended to it …» Без изменений по смыслу: переименованный ключ назван прямо.";
  const draft = parts[at(parts, "where `sheriff.config.json` holds no entry that sets the specification's approval status, a draft rule")];
  draft.en = "where `sheriff.config.json` holds no entry that sets the specification's approval status, a draft rule of `project.json` that refines the rule on that status is moved to the archive with the reason \"The specification's approval status is recorded in `sheriff.config.json`\" if it was ever approved, and is deleted otherwise (§s-f2b5zvc565s242f);";
  draft.ru = "если в `sheriff.config.json` нет записи, задающей статус одобрения спецификации, черновик правила `project.json`, которое уточняет правило об этом статусе, уходит в архив с причиной \"The specification's approval status is recorded in `sheriff.config.json`\", если его хоть раз одобряли, а иначе удаляется (§s-f2b5zvc565s242f);";
  rep(K, draft, "change", "Поэтому, как требует правило 2.6, черновик, который хоть раз одобряли, уходит в архив, а остальные удаляются.", "Поэтому, как требует правило 2.6, черновик, который хоть раз одобряли, уходит в архив, а остальные удаляются. Причина в архиве говорит, что статус одобрения спецификации записан в `sheriff.config.json`: записи, которая заменила бы такой черновик, нет.");
  const tests = parts[at(parts, "in the run that archives or deletes such a rule")];
  tests.en = "in the run that archives or deletes a rule of `project.json` that refines the rule on the specification's approval status, whether that rule is approved or a draft, where `project.json` is left holding no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added under the top node of `project.json`;";
  tests.ru = "в том запуске, который переносит в архив или удаляет правило `project.json`, уточняющее правило о статусе одобрения спецификации, — одобренное или черновик, — если в `project.json` не остаётся правила, которое уточняет правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h), под верхний узел `project.json` добавляется черновик правила о том, когда запускаются тесты, который пишет `sheriff init` (§s-7unxytshhc4md54);";
  p.parts = parts;
  const e = drafts[K];
  rep(K, e, "change", "уходит в архив с той же причиной, если его хоть раз одобряли, а иначе удаляется (правило 2.6):", "уходит в архив с причиной, которая говорит, что статус одобрения записан в `sheriff.config.json`, если его хоть раз одобряли, а иначе удаляется (правило 2.6):");
  rep(K, e, "change", "Второй: в том запуске, который переносит в архив или удаляет правило об одобрении,", "Второй: в том запуске, который переносит в архив или удаляет правило `project.json` об этом статусе, одобренное или черновик,");
  rep(K, e, "change", "предложение о переименовании типа узла говорит, где стоит имя типа;", "предложение о переименовании типа узла говорит, где стоит имя типа; ключ, который переименовывается в строках `specs/_confirmations.jsonl`, назван прямо;");
  p.examples[0].change = "Новое: у согласованной формулировки примеров не было. Пример показывает запуск, в котором добавляется черновик правила о том, когда запускаются тесты, и ошибку — добавить его снова, после того как проект его удалил.";
  rep(K, e, "stage3", "with the reason that the approved rule gets,", "with the reason \"The specification's approval status is recorded in sheriff.config.json\",");
}

// ---------------------------------------------------------------------------------------------------------------
// proposal:s-7pk89t8z6wymmj9-g6: the readers; review c-d's stage-3 nit.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "proposal:s-7pk89t8z6wymmj9-g6";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const dir = parts[at(parts, "`sheriff validate` runs each of the project's own checks with the command")];
  rep(K, dir, "en", "On a commit, that directory holds", "At a commit, that directory holds");
  dir.change = "Было: «… On a commit, that directory holds what the commit contains (§s-477gtdrkw34dzxw). …» Без изменений по смыслу: момент проверки назван «at a commit», как в других узлах.";
  p.parts = parts;
  const e = drafts[K];
  rep(K, e, "change", "В английском обосновании уточнены слова без изменения смысла.", "В английском обосновании уточнены слова без изменения смысла, а «On a commit» стало «At a commit», как в других узлах.");
  p.examples[0].change = "Как в согласованной формулировке.";
  p.examples[1].change = "Новое: пример значения `reportedUnlessStrict`: о неудаче сообщается, пока флаг `strict` выключен, а включить флаг `sheriff settings` отказывается.";
  e.stage3 += " The stage3 of the agreed draft says that sheriff settings runs the project's own checks as this node says before it records an approval; when the stage-3 notes are merged, that sentence is to name s-m59dqwkw2e96wne and s-nxgkp988mej79eg instead.";
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

// english-group6d.md: only the English sentences that this round changed, each under its key.
const units = (p) => [p.title, ...p.parts.map((x) => x.en), p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean);
const sentences = (s) => s.split(/(?<=[.;:])\s+(?=[`"“A-Z(])/);
const md = [
  "# T25, group 6, round d: the English sentences that changed",
  "",
  "This file holds only the English sentences of group 6 that round d changed, as `tools-drafts.json` holds them after fix-group6-d.mjs. Each sentence is given under the key of its node in `tools-drafts.json`, with the node's title.",
  "fix-group6-d.mjs writes this file; edit the script, not this file.",
  "",
];
for (const key of GROUP.filter((k) => changed.has(k))) {
  const now = drafts[key].proposal;
  const old = before[key].proposal;
  const oldText = units(old).join("\n");
  const fresh = units(now).flatMap(sentences).filter((s) => !oldText.includes(s));
  if (!fresh.length) continue;
  md.push(`## ${key} — ${now.title}`, "");
  for (const s of fresh) md.push(`- ${s}`);
  md.push("");
}
fs.writeFileSync(new URL("english-group6d.md", here), md.join("\n"));

console.log(`changed ${changed.size} drafts: ${[...changed].join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
