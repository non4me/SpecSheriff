// T25, stage 2, group 7, round d: applies the final review (review-g7c.md) and the findings of EngStickler's readers on
// round c (english-g7c-fast.md, english-g7c-thorough.md), with the main session's decisions in fix-brief-group7-d.md.
// On its first run it copies tools-drafts.json to tools-drafts.before-group7-d.json; on every run it rebuilds the keys of
// the group from that copy, checks every draft as fix-group7-c.mjs does, and writes tools-drafts.json and
// english-group7d.md, which holds only the English that this round changes. It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group7-d.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const DATE = "2026-11-25";

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
const NEW = "Новое.";
const AS_AGREED = "Как в согласованной формулировке.";

// This round adds no sid.
const SID = {};
const GROUP = [
  "s-k4nqjr96ux7a5m7", "new:tools-5-export", "new:tools-5-show", "s-rpv4fkdqqguptqd", "new:tools-4-diagram", "s-pvzms7d8kxb8dk2",
  "s-suv42g8r3ra2h6b", "s-nk8td3ez58gahc4", "s-4npdup7mjkva69y", "proposal:s-f5rz6b7dhxejjts-g7", "proposal:s-3anv9qcmx8pwp2w-g7",
  "proposal:s-ezq8csd433vj6fj-g7", "proposal:s-gb8s9657a65hqmv-g7", "proposal:s-dbk2vyeg8z5jxna-g7", "new:tools-17-bindings-entry",
  "proposal:new-tools-1-settings-g7", "proposal:s-vp24dqydygztqbt-g7", "new:tools-17-validator",
];
const entries = {};
for (const key of GROUP) {
  if (!drafts[key]) throw new Error(`${key}: no draft of round c in the copy`);
  entries[key] = structuredClone(drafts[key]);
}
const changed = new Set();
const parts = (key) => entries[key].proposal.parts;
const at = (key, start) => {
  const i = parts(key).findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`${key}: no part starts with: ${start}`);
  return i;
};
const rep = (key, start, ...replacement) => {
  parts(key).splice(at(key, start), 1, ...replacement);
  changed.add(key);
};
const ins = (key, afterStart, ...added) => {
  parts(key).splice(at(key, afterStart) + 1, 0, ...added);
  changed.add(key);
};
const del = (key, start) => {
  parts(key).splice(at(key, start), 1);
  changed.add(key);
};
const set = (key, fields) => {
  Object.assign(entries[key].proposal, fields);
  changed.add(key);
};
const refsAdd = (key, ...refs) => {
  for (const r of refs) if (!entries[key].proposal.refs.some((x) => x.to === r.to)) entries[key].proposal.refs.push(r);
  changed.add(key);
};
// Replaces words in a string that must hold them, so that a draft changed since this script was written is caught.
const swap = (s, from, to, where) => {
  if (!s.includes(from)) throw new Error(`${where}: does not hold: ${from}`);
  return s.split(from).join(to);
};
// Replaces words in one language of a part, keeping the part's other fields.
const swapPart = (key, start, lang, from, to) => {
  const x = parts(key)[at(key, start)];
  x[lang] = swap(x[lang], from, to, `${key}, the part “${start}”, ${lang}`);
  changed.add(key);
};
const swapExample = (key, i, lang, from, to) => {
  const x = entries[key].proposal.examples[i];
  x[lang] = swap(x[lang], from, to, `${key}, example ${i + 1}, ${lang}`);
  changed.add(key);
};
const swapField = (key, field, from, to) => {
  entries[key][field] = swap(entries[key][field], from, to, `${key}, ${field}`);
  changed.add(key);
};


// ---------------------------------------------------------------------------------------------------------------
// The validator of the RuntimeChecks (review g7c, findings 1 and 2; the thorough reader on the reason).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-17-validator";
  rep(k, "The JSON Schema validator",
    P("The JSON Schema validator that the technical appendix (§s-tj38pvm38nepaf5) names for the RuntimeChecks (§s-e877bnfa559tvk9) refuses each value that does not match the `format` of its schema, for every format that the RuntimeChecks use.",
      "Валидатор JSON Schema, который техническое приложение (§s-tj38pvm38nepaf5) называет для RuntimeChecks (§s-e877bnfa559tvk9), отвергает каждое значение, которое не соответствует `format` его схемы, — для каждого формата, который используют RuntimeChecks.",
      "Было в узле «Where the types and RuntimeChecks generated from the RecordTypes are written»: «Those RuntimeChecks are run by the JSON Schema validator the technical appendix names. That validator asserts `format` rather than taking it as a note.» Это требование к валидатору проекта, а не к тому, куда записываются файлы, поэтому оно стало отдельным узлом. Требование уточнено: по JSON Schema 2020-12 валидатор, у которого включена проверка `format`, вправе считать любой формат всегда верным, поэтому сказано, что он отвергает каждое несоответствующее значение для каждого формата, который используют RuntimeChecks. Добавлена ссылка по правилу 7.2.7 там, где узел впервые называет техническое приложение."));
  set(k, {
    reason: "A validator that treats `format` only as an annotation accepts, as a date, a string that is not a valid date.",
    ruReason: "Валидатор, который считает `format` только аннотацией, принимает как дату строку, которая не является допустимой датой.",
    examples: [{
      en: "The RecordType `user` has the field `birthDate` with the schema `{\"type\": \"string\", \"format\": \"date\"}`. The validator refuses a data record whose `birthDate` is `\"2026-02-30\"`. The most likely mistake is to keep the validator's default setting, under which `format` is only an annotation, so that this data record passes.",
      ru: "У RecordType `user` есть поле `birthDate` со схемой `{\"type\": \"string\", \"format\": \"date\"}`. Валидатор отвергает запись данных, у которой `birthDate` равно `\"2026-02-30\"`. Самая вероятная ошибка — оставить валидатор с настройкой по умолчанию, при которой `format` — только аннотация, так что эта запись данных проходит.",
    }],
  });
  swapField(k, "stage3", "so that it asserts `format`.", "so that it refuses each value that does not match the `format` of its schema, for every format that the RuntimeChecks use.");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 54: what is generated from a RecordType (review g7c, finding 3; the fast reader).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-suv42g8r3ra2h6b";
  swapPart(k, "A definition is built from", "en", "A definition is built from the RecordType's own `schema`, in which `properties` holds these fields and `required` lists the guaranteed ones.",
    "A definition is built from the RecordType's own `schema`. In the definition, `properties` holds these fields and `required` lists the guaranteed ones.");
  swapPart(k, "A definition is built from", "ru", "Определение строится из собственной `schema` RecordType, в которой `properties` содержит эти поля, а `required` перечисляет гарантированные.",
    "Определение строится из собственной `schema` RecordType. В определении `properties` содержит эти поля, а `required` перечисляет гарантированные.");
  set(k, { reason: swap(entries[k].proposal.reason, "come out the same at every run and on every machine", "come out the same on every run and on every machine", `${k}, the reason`) });
}

// ---------------------------------------------------------------------------------------------------------------
// Item 51: the export (the fast reader).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-5-export";
  set(k, { reason: swap(entries[k].proposal.reason, "written anew from the nodes at every run", "written anew from the nodes on every run", `${k}, the reason`) });
}

// ---------------------------------------------------------------------------------------------------------------
// Item 52: the map (the thorough reader): a branch holds the domains; only a tool takes them.
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-rpv4fkdqqguptqd";
  const start = "Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the branch";
  swapPart(k, start, "en", "the branch `Base specification` takes the domains row by row", "the branch `Base specification` holds the domains row by row");
  swapPart(k, start, "en", "It takes the domains of each row in the order", "It holds the domains of each row in the order");
  swapPart(k, start, "ru", "ветвь `Base specification` берёт домены линия за линией", "ветвь `Base specification` содержит домены линия за линией");
  swapPart(k, start, "ru", "Домены каждой линии она берёт в том порядке", "Домены каждой линии она содержит в том порядке");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 53 (review g7c, findings 4 and 5; the fast reader).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-pvzms7d8kxb8dk2";
  set(k, { reason: "Where the generated code goes is a choice that concerns the whole system, so the technical appendix describes it in its section on the stack (§s-mm2de262g3jkapu)." });
  rep(k, "The check of generated copies refuses",
    P("The check of generated copies refuses a list that names a file whose name has any other extension, and any other fault that keeps `sheriff types` from writing any file (§s-dbk2vyeg8z5jxna).",
      "Проверка порождённых копий отвергает список, в котором есть файл с любым другим расширением имени, и любой другой изъян, из-за которого `sheriff types` не может записать ни одного файла (§s-dbk2vyeg8z5jxna).",
      parts(k)[at(k, "The check of generated copies refuses")].change));
  swapPart(k, "`sheriff types` reads the list", "en", "takes the rule's `implements` links from where the SpecSheriff tools take the `refines` links",
    "takes the rule's `implements` links from the same source as the SpecSheriff tools take the `refines` links");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 56 (review g7c, finding 6; both readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-4npdup7mjkva69y";
  const table = "| Field's schema |";
  swapPart(k, table, "en", "| `{\"type\": \"integer\"}`, with its bounds |", "| `{\"type\": \"integer\"}`, with any bounds |");
  swapPart(k, table, "en", "| `{\"type\": \"number\"}`, with its bounds |", "| `{\"type\": \"number\"}`, with any bounds |");
  swapPart(k, table, "en", ", with its bounds on how many members it holds |", ", with any bounds on how many members it holds |");
  swapPart(k, table, "en", "the union of the types that the schema gives with each of its types in place of the list", "the union of the types that the schema would give if each of its types in turn replaced the list");
  swapPart(k, table, "ru", "| `{\"type\": \"integer\"}`, со своими границами |", "| `{\"type\": \"integer\"}`, с любыми границами |");
  swapPart(k, table, "ru", "| `{\"type\": \"number\"}`, со своими границами |", "| `{\"type\": \"number\"}`, с любыми границами |");
  swapPart(k, table, "ru", ", со своими границами числа элементов |", ", с любыми границами числа элементов |");
  swapPart(k, table, "ru", "объединение типов, которые даёт схема, если вместо списка в ней стоит каждый из её типов", "объединение типов, которые давала бы схема, если бы вместо списка в ней по очереди стоял каждый из её типов");
  swapPart(k, "In Python, `Literal` holds only", "ru", "На Python `Literal` содержит только", "На Python `Literal` может содержать только");
  swapPart(k, "In Python, `Literal` holds only", "en", "In Python, `Literal` holds only", "In Python, `Literal` can hold only");
  {
    const x = parts(k)[at(k, "An `allOf` gives a `TypedDict`")];
    x.en = swap(x.en, "Such a field is required where the `required` of any of these members lists it.", "A field of that `TypedDict` is required where the `required` of any member of the `allOf` lists it.", `${k}, en`);
    x.ru = swap(x.ru, "Такое поле обязательно, если его перечисляет `required` хотя бы одного из этих элементов.", "Поле этого `TypedDict` обязательно, если его перечисляет `required` хотя бы одного элемента `allOf`.", `${k}, ru`);
    x.change = swap(x.change, "Поле, которое объявляют несколько элементов, обязательно так же, как гарантированное поле, которое объявляют несколько RecordType.",
      "Поле этого `TypedDict` обязательно, если его перечисляет `required` хотя бы одного элемента, — так же, как гарантированное поле, которое объявляют несколько RecordType.", `${k}, change`);
  }
  set(k, { reason: swap(swap(entries[k].proposal.reason, "So a field's schema serves", "Therefore, a field's schema serves", `${k}, the reason`), "So a value that moves", "Therefore, a value that moves", `${k}, the reason`) });
  swapField(k, "stage3", "a field that several members declare being required where any of their required lists it,", "a field of that TypedDict being required where the required of any member of the allOf lists it,");
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const sidOf = (baseKey) => drafts[baseKey].sidValue ?? (/^s-[2-9a-hjkmnp-z]{15}$/.test(baseKey) ? baseKey : undefined);
const problems = [];
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
for (const e of Object.values(entries)) if (e.sidValue) targets.add(e.sidValue);
for (const [key, e] of Object.entries(entries)) {
  if (key.startsWith("new:")) {
    if (e.from && !toolsNodes.has(e.from)) problems.push(`${key}: no node of tools.json it is split from`);
  } else if (key.startsWith("proposal:")) {
    if (!drafts[e.base]?.agreed) problems.push(`${key}: its base ${e.base} is no agreed draft`);
    if (sidOf(e.base) !== e.sidValue) problems.push(`${key}: its sid differs from that of its base`);
  } else if (!toolsNodes.has(key)) problems.push(`${key}: no such node in tools.json`);
}
{
  const texts = [backupText];
  const walk = (d) => {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name);
      if (f.isDirectory()) walk(p);
      else if (/\.jsonl?$/.test(f.name)) texts.push(fs.readFileSync(p, "utf8"));
    }
  };
  walk(path.join(root, "specs"));
  walk(path.join(root, ".ai_docs/t25-pass/moved"));
  const all = texts.join("\n");
  for (const sid of Object.values(SID)) {
    if (!/^s-[2-9a-hjkmnp-z]{15}$/.test(sid)) problems.push(`the new sid ${sid} is not of the form of a sid`);
    if (all.includes(sid)) problems.push(`the new sid ${sid} is already held`);
  }
}
const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
const longSentences = [];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  let citedByDecisions;
  if (key.startsWith("proposal:")) {
    const bp = drafts[e.base].proposal;
    const baseEn = [bp.title, render(bp.parts, "en"), bp.reason, ...(bp.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
    const baseCited = new Set(citedIn(baseEn));
    citedByDecisions = new Set(bp.refs.filter((r) => r.type === "cites" && !baseCited.has(r.to)).map((r) => r.to));
  } else {
    citedByDecisions = new Set(citedIn(JSON.stringify(toolsNodes.get(e.sidValue)?.meta?.decisions ?? [])));
  }
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
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (!p.reason || !p.ruReason || !p.reasonChange) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  for (const x of p.parts) if (x.change !== AS_AGREED && ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  for (const x of p.examples || []) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in an example`);
  if (!key.startsWith("proposal:") && !e.testsFrom) problems.push(`${key}: no testsFrom`);
  if (!e.stage3) problems.push(`${key}: no stage3`);
  if (changed.has(key)) {
    const ownText = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
    for (const sentence of ownText.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
      const words = sentence.split(/\s+/).filter(Boolean).length;
      if (words > 30) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
    }
  }
  // "In every other respect" (item 55) and "stands for any value" (item 56) are the readers' words, which the main
  // session chose.
  const bad = [/closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts? as\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /`identifier of`/, /\bevery other\b/, /\bboth agents\b/, /\bthe two\b/, /sheriff export/, /sheriff render/, /\beach other\b/, /\bentry of the bindings file\b/];
  if (key !== "proposal:s-gb8s9657a65hqmv-g7") bad.push(/\bdeclaredIn\b/);
  const allowed = (s) => s.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/Appendix of the tools/g, "AOT")
    .replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS").replace(/In every other respect/g, "IEOR").replace(/stands for any value/g, "SFAV");
  // The agreed sentences of a proposal's base are checked when the owner agreed to them.
  const own = key.startsWith("proposal:") ? p.parts.filter((x) => x.change !== AS_AGREED).map((x) => x.en).join("\n") : en;
  for (const b of bad) if (b.test(allowed(own))) problems.push(`${key}: the English holds ${b}`);
  const ruAll = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  if (/несёт|несут|несущ|владел|NodeKind/.test(ruAll)) problems.push(`${key}: the Russian says «несёт», «владелец» or NodeKind`);
  // On the map, the outline is «план» throughout; «структура» renders only the reason's "structure".
  if (key === "s-rpv4fkdqqguptqd" && /структур/.test(ruAll.replace(/показывает структуру, которой у узлов уже нет/, ""))) problems.push(`${key}: the Russian calls the outline «структура»`);
  const changes = JSON.stringify(p.parts.map((x) => x.change)) + JSON.stringify((p.examples || []).map((x) => x.change ?? "")) + (p.titleChange || "") + (p.reasonChange || "") + (e.change || "");
  // The node on the review of a commit names its own subject, the reviewer of a commit, and the list of commands cites
  // the independent reviewer.
  const history = /[Рр]аунд|рецензент|review-g|\bround\b|групп[аыеу] [1-7]/;
  if (history.test(changes.replace(/независим\S* рецензент\S*/g, "").replace(key === "proposal:s-vp24dqydygztqbt-g7" ? /рецензент\S*/g : /^$/, ""))) problems.push(`${key}: a change field tells the history of the rounds or names a group`);
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const before = JSON.parse(backupText);
if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const [key, e] of Object.entries(entries)) {
  if (before[key]?.agreed) {
    console.error(`${key} is an agreed draft, which this script must not change`);
    process.exit(1);
  }
  drafts[key] = e;
}
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (key in entries) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group7d.md holds only the English that this round changes: each sentence, or row of a table, of a changed
// node's title, text, reason and examples that the node did not hold before this round.
const units = (p) => {
  const out = [];
  const add = (where, s) => {
    for (const line of String(s ?? "").split("\n").filter((l) => l.trim())) {
      if (line.startsWith("|")) out.push([where, line]);
      else for (const sentence of line.replace(/^- /, "").split(/(?<=[.;:])\s+(?=[A-Z`“(])/)) out.push([where, sentence]);
    }
  };
  add("Title", p.title);
  for (const x of p.parts || []) add("Text", x.en);
  add("Reason", p.reason);
  (p.examples || []).forEach((x, i, all) => add(all.length > 1 ? `Example ${i + 1}` : "Example", x.en));
  return out;
};
const md = [
  "# T25, group 7, round d: the English sentences that round d changes",
  "",
  "This file holds only the English sentences, and the rows of a table, that round d adds or changes in the drafts of group 7, as `tools-drafts.json` holds them after fix-group7-d.mjs. Each is given under the key of its draft in `tools-drafts.json` and the title of that draft, with the part of the node that holds it.",
  "fix-group7-d.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  if (!changed.has(key)) continue;
  const old = new Set(units(before[key].proposal).map(([, s]) => s));
  const fresh = units(e.proposal).filter(([, s]) => !old.has(s));
  if (!fresh.length) continue;
  md.push(`## ${key} — ${e.proposal.title}`, "");
  for (const [where, s] of fresh) md.push(`- ${where}: ${s}`);
  md.push("");
}
fs.writeFileSync(new URL("english-group7d.md", here), md.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts; changed in round d: ${[...changed].join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 30 words, to look at:\n${longSentences.join("\n")}`);
