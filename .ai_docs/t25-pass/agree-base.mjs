// Records the owner's answers of 2026-11-25 to the three pages of the questions about the base specification
// (base-questions.md, shown from bq-pages.json):
// - proposals 2.1 to 2.9: «я же принимал уже решения по этим вопросам», so each is agreed on the owner's behalf;
// - proposal 3.2, taken off page 2 because it only carries out the owner's decision of 2026-11-02: agreed on the owner's
//   behalf in the same way;
// - proposals 3.1 and 3.3 to 3.8: «согласен»;
// - questions 4.1 to 4.6: «ок», which chooses option A in 4.1, 4.2 and 4.3 and option B in 4.4, 4.5 and 4.6;
// - question 4.7: settled by decision R8 of the page that the owner accepted on 2026-11-19, so `x-enumSource` becomes
//   `enumSource` in every agreed draft of the appendix of the tools that names it;
// - changes 1.1 to 1.4: made without asking, as section 1 of base-questions.md says.
// Each node is written in the wording that bq-pages.json shows, in English and in Russian. A node of the base that has an
// agreed draft gets a new key `<that key without its suffix>-bq`, whose `base` names that draft, as the groups did with
// their `-g<n>` keys; a node of the base without a draft gets `proposal:<sid>`; a new node or row gets a `new:` key and a
// new sid. Each such draft is marked as agreed, with the owner's answer in its `rulings`, as agree-group8.mjs does, and
// carries the decisions that base-questions.md writes out for it, and those that the owner's answers make. Where a
// decision cites a node of the base specification that the draft has no link to, a `cites` link is added.
// The renames of 1.1, 1.3, 1.4 and 4.7 and the links of 1.2, 3.1 and 3.2 are made in place in the agreed drafts they
// touch, each recorded in that draft's `technical` list.
// Copies tools-drafts.json to tools-drafts.before-agree-base.json first; when run again, it rebuilds from that copy, so a
// second run gives the same file. It refuses to run if a key it writes is missing, or if an agreed wording that a page
// shows as replaced differs from the wording in that key or in moved/.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-agree-base.json", here);
const firstRun = !fs.existsSync(beforeUrl);
const backupText = fs.readFileSync(firstRun ? url : beforeUrl, "utf8");
const before = JSON.parse(backupText);
const drafts = JSON.parse(backupText);
const read = (f) => JSON.parse(fs.readFileSync(new URL(f, here), "utf8"));
const pages = read("bq-pages.json");
const newform = read("newform.json");
const md = fs.readFileSync(new URL("base-questions.md", here), "utf8");
const DATE = "2026-11-25";
const problems = [];
const fail = (m) => { throw new Error(m); };

// ---------------------------------------------------------------- the nodes of the base specification in moved/
const moved = {};
{
  const files = ["spec.json", ...fs.readdirSync(new URL("moved/specs/_guidelines/extensions/", here)).map((f) => `extensions/${f}`)];
  const walk = (n, cost) => {
    if (!n || typeof n !== "object") return;
    if (n.sid) moved[n.sid] = { node: n, cost };
    (n.children || []).forEach((c) => walk(c));
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c?.node) walk(c.node, r.cells.cost?.text);
  };
  for (const f of files) read(`moved/specs/_guidelines/${f}`).nodes.forEach((n) => walk(n));
}
const locOf = (sid) => moved[sid].node.location.replace(/^_guidelines\/(?:extensions\/)?([a-z]+)\//, "$1 ");
const toolsSids = new Set();
const baseDraftSids = new Set();
{
  const walk = (n) => { if (!n || typeof n !== "object") return; if (n.sid) toolsSids.add(n.sid); (n.children || []).forEach(walk); };
  read("../../specs/_guidelines/tools.json").nodes.forEach(walk);
  for (const [k, d] of Object.entries(before)) {
    const s = d?.sidValue || (k.startsWith("s-") ? k : null);
    if (s && !moved[s]) (/^(spec|domains|recordtype|views) /.test(d.location || "") ? baseDraftSids : toolsSids).add(s);
  }
}

// ---------------------------------------------------------------- the new sids, checked to be held by no file
const NEW_SID = {
  setup: "s-57g82ucqz3g834p", model: "s-8f6gw8c265cnj2n", domainTerm: "s-cb9rbh8q88a84xp", termCited: "s-8p52mzm3y33cf7z",
  termPlace: "s-qscrdhf6kj57gbx", ref: "s-axjr5ex3p7ys3nd", object: "s-c7zj6mraw8w83py", variantTop: "s-gc7uwxtkrnpa2t9",
  variantsTop: "s-n94dfdsdzue2kur", inBase: "s-4jgugss8r35z46b", structure: "s-ujnb23vbw3y8cne", tagOutside: "s-69pwmwyrk6efag2",
};
for (const s of Object.values(NEW_SID)) {
  if (!/^s-[2-9a-hjkmnp-z]{15}$/.test(s)) fail(`${s} is not of the form of a sid`);
  if (moved[s] || toolsSids.has(s) || backupText.includes(s)) fail(`the new sid ${s} is already held`);
}
const baseSids = new Set([...Object.keys(moved), ...baseDraftSids, ...Object.values(NEW_SID)]);

// ---------------------------------------------------------------- the pages
const ITEMS = {};
for (const p of pages.pages) for (const s of p.sections) for (const it of s.items) ITEMS[it.id] = it;
const pageNode = (id, i) => ITEMS[id]?.nodes?.[i] ?? fail(`bq-pages.json has no node ${id}#${i}`);
// Proposal 3.2 was taken off page 2, so its wording is read from base-questions.md, where it is written in full.
function node32() {
  const sec = md.split(/^### /m).find((s) => s.startsWith("3.2 ")) ?? fail("base-questions.md has no item 3.2");
  const quote = sec.split("\n").filter((l) => l.startsWith(">")).map((l) => l.replace(/^> ?/, "")).join("\n");
  const en = {
    title: quote.match(/^\*\*Title:\*\* (.+)$/m)[1],
    text: quote.split(/^\*\*Title:\*\* .+\n\n/m)[1].split(/\n\n\*\*Reason:\*\*/)[0],
    reason: quote.match(/^\*\*Reason:\*\* (.+)$/m)[1],
    examples: [quote.match(/^\*\*Example:\*\* (.+)$/m)[1]],
  };
  const r = sec.match(/^Russian: заголовок «(.+?)»; текст «([\s\S]+?)»; обоснование «(.+?)»; пример «(.+?)»$/m) ?? fail("item 3.2: no Russian read");
  const ru = { title: r[1], text: r[2], reason: r[3], examples: [r[4]] };
  const change = sec.match(/^`change`: «(.+)»$/m)?.[1] ?? fail("item 3.2: no change read");
  return { label: en.title, status: "new", en, ru, changes: [change.replace("(правило 4.3)", "(§s-xef48cjh6krvavz)")] };
}
for (const [a, b] of [[["2.9", 2], ["4.6", 0]], [["2.9", 4], ["4.6", 1]]]) {
  const x = pageNode(...a), y = pageNode(...b);
  if (JSON.stringify([x.en, x.ru]) !== JSON.stringify([y.en, y.ru])) fail(`${a} and ${b} show different wordings`);
}

// ---------------------------------------------------------------- the answers
const BEHALF = "«я же принимал уже решения по этим вопросам»";
const AGREE3 = "«согласен», in answer to «Согласны с формулировками 3.1 и 3.3–3.8?»";
const OK4 = "«ок», in answer to «Согласны с рекомендованным вариантом во всех шести вопросах?»";
const CARRIES = {
  "2.1": "the owner's choice of option A in the first question of group 7 (2026-11-25)",
  "2.2": "the owner's choice of option A in the first question of group 7 (2026-11-25)",
  "2.3": "the owner's choice of option A in the first question of group 8 (2026-11-25)",
  "2.4": "the owner's choice of option A in the second question of group 8 (2026-11-25) and the owner's ruling of 2026-11-13 on rule 10.10",
  "2.5": "the owner's agreement to rule 10.12 (2026-11-24) and to row 10.1.37b (2026-11-25)",
  "2.6": "the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a",
  "2.7": "the item from group 6 (2026-11-24) under which an approval \"is in force\" rather than \"stands\"",
  "2.8": "the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a",
  "2.9": "the owner's ruling of 2026-11-12 on where a term is defined once the base specification is divided into domains",
};
function ruling(id) {
  if (CARRIES[id]) return {
    date: DATE,
    problem: `Whether the owner agrees to proposal ${id} of the questions about the base specification, one of proposals 2.1 to 2.9, each of which carries out a decision the owner had already made, shown on one page with each node in full.`,
    ruling: `The owner answered ${BEHALF}: the proposal only carries out ${CARRIES[id]}, so it is agreed on the owner's behalf.`,
    type: "textual",
  };
  if (id === "3.2") return {
    date: DATE,
    problem: "Whether the owner agrees to proposal 3.2 of the questions about the base specification, the rule on who chooses an agent's model and reasoning effort.",
    ruling: "The proposal was taken off the owner's page because it only carries out the owner's decision of 2026-11-02 that no choice that costs a user tokens is made without their consent, so it is agreed on the owner's behalf.",
    type: "textual",
  };
  if (/^3\./.test(id)) return {
    date: DATE,
    problem: `Whether the owner agrees to the new wordings 3.1 and 3.3 to 3.8 of the questions about the base specification, here wording ${id}, shown on one page with each node in full.`,
    ruling: `The owner agreed (${AGREE3}).`,
    type: "textual",
  };
  if (/^4\./.test(id)) return {
    date: DATE,
    problem: `Whether the owner agrees to the recommended option in each of questions 4.1 to 4.6 of the questions about the base specification, here question ${id}, shown on one page with the wordings under each recommended option in full.`,
    ruling: `The owner agreed (${OK4}): option A in questions 4.1, 4.2 and 4.3, and option B in questions 4.4, 4.5 and 4.6.`,
    type: "textual",
  };
  if (id === "1.3") return {
    date: DATE,
    problem: "Whether rules 1.3.2, 10.6 and 10.7, which restated rule 9.5 in its earlier wording, change with it.",
    ruling: `Made without asking, as section 1 of the questions about the base specification says: a technical replacement that carries out the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a, made together with proposal 2.6, which the owner's answer ${BEHALF} agreed on the owner's behalf.`,
    type: "textual",
  };
  fail(`no ruling for ${id}`);
}

// ---------------------------------------------------------------- the decisions
function fileDecisions(id) {
  const sec = md.split(/^### /m).find((s) => s.startsWith(`${id} `)) ?? fail(`base-questions.md has no item ${id}`);
  const at = sec.search(/^Decisions? for `meta\.decisions`/m);
  if (at < 0) fail(`item ${id} writes no decision`);
  const block = sec.slice(at).split(/\n\n/)[0];
  const out = [];
  for (const m of block.matchAll(/date (\d{4}-\d{2}-\d{2}|of the owner's agreement); problem "(.+?)"; ruling (?:"(.+?)"|to be written from the owner's answer); type (\w+)/g)) {
    out.push({ date: m[1].startsWith("of") ? DATE : m[1], problem: m[2], ruling: m[3] ?? null, type: m[4] });
  }
  if (!out.length) fail(`item ${id}: no decision read`);
  return out;
}
const fromAnswer = (id, ruling) => fileDecisions(id).map((d) => {
  if (d.ruling !== null) fail(`item ${id}: the file already gives the ruling`);
  return { ...d, ruling };
});
const Q = (problem, ruling) => ({ date: DATE, problem, ruling, type: "textual" });
const D = {
  q41: Q("The approval covered a node's title, text, reason, examples and the fields that its kind adds, but not its kind, so an agent could turn an approved rule into a term, or a term into a rule that code must implement, and leave the node approved.",
    `The owner chose option A of the question whether a node's kind is part of its wording (${OK4}): the kind is part of the wording that an approval covers, so a change of a node's kind makes the node a draft.`),
  q42: Q("Only a row of the Domains extension checked that the technical appendix inherits the structure of the base specification, so nothing checked it in a project without that extension.",
    `The owner chose option A of the question on the check of the structure of the technical appendix (${OK4}): a row of the main table of checks checks that structure in every project, and the row of the Domains extension checks only that each file of the technical appendix is named after a domain.`),
  q43: Q("In a file whose symbols the checks can identify, code at the top level that is neither a symbol nor an import, such as a call that starts a server, was bound by no SpecTag.",
    `The owner chose option A of the question on code at the top level of a file (${OK4}): SpecTags at the start of such a file bind its code that is outside every symbol and is not an import.`),
  q44: Q("A file of RuntimeChecks was bound as a whole, by one entry in the bindings file, to every RecordType that it holds a definition for, so a commit that changed one definition had to name every such RecordType and was refused while any of them was a draft.",
    `The owner chose option B of the question on a file of RuntimeChecks (${OK4}): each definition in such a file is bound separately, by a SpecTag in its \`$comment\`.`),
  q45: Q("No row checked the restrictions on a SpecTag outside the system's code, and the restriction on where such a SpecTag may appear could not be checked, since no setting tells the SpecSheriff tools which files are the repository's own tools.",
    `The owner chose option B of the question on a SpecTag outside the system's code (${OK4}): the rule restricts only what such a SpecTag names, and a row checks it.`),
  q46: Q("Whether a term in the contracts section that only one domain needs is an error.",
    `The owner chose option B of the question on such a term (${OK4}): it is refused until it is moved into that domain.`),
};
const copied1118 = (moved["s-vghy37e3p2325ah"].node.meta?.decisions || []).filter((d) => d.date === "2026-11-18");
if (copied1118.length !== 1) fail("row 11.3.5 has no single decision of 2026-11-18 to copy");

// ---------------------------------------------------------------- what is written: the nodes from the pages
const L = (type, to) => [type, to];
const W = [
  { key: "proposal:s-ce24ynwabt5yx8h", sid: "s-ce24ynwabt5yx8h", from: [["2.1", 0]], add: [L("cites", "s-5fewsp22mmdz7y6")], decisions: fileDecisions("2.1") },
  { key: "proposal:s-zu8ne3wq84zchc4", sid: "s-zu8ne3wq84zchc4", from: [["2.2", 0]], add: [L("cites", "s-5fewsp22mmdz7y6"), L("cites", "s-kag2m9tzdnduxdx")], decisions: fileDecisions("2.2") },
  { key: "proposal:s-pcnyfp7gev7syax-bq", sid: "s-pcnyfp7gev7syax", base: "proposal:s-pcnyfp7gev7syax-g4", from: [["2.3", 0]], decisions: fileDecisions("2.3") },
  { key: "proposal:s-83ev4wwesbwnhnp-bq", sid: "s-83ev4wwesbwnhnp", base: "proposal:s-83ev4wwesbwnhnp", from: [["2.4", 0]], add: [L("cites", "s-hheus6f395ynqvc")], decisions: fileDecisions("2.4") },
  { key: "proposal:s-epaw9sgyaajzn8g", sid: "s-epaw9sgyaajzn8g", from: [["2.5", 0]], add: [L("cites", "s-yn5tdx2bp4f5rq7"), L("cites", "s-2fau85dfyyeq66m")], decisions: fileDecisions("2.5") },
  { key: "proposal:s-kkbqcb9xrpaepwn", sid: "s-kkbqcb9xrpaepwn", from: [["2.6", 0]], remove: ["s-qzthyh7yqvfhsa2"], decisions: fileDecisions("2.6") },
  { key: "proposal:s-9g7jj8z4yf9kq93", sid: "s-9g7jj8z4yf9kq93", from: [["2.7", 0]], remove: ["s-m4h279nbaqkpa3t", "s-kkbqcb9xrpaepwn"] },
  { key: "proposal:s-kgbzk2ph9e6jfb4-bq", sid: "s-kgbzk2ph9e6jfb4", base: "proposal:s-kgbzk2ph9e6jfb4", from: [["2.8", 0], ["4.3", 0], ["4.4", 0]], decisions: [...fileDecisions("2.8"), D.q43, D.q44] },
  { key: "proposal:s-ypa92gpcj3f5zj8", sid: "s-ypa92gpcj3f5zj8", from: [["2.9", 0]], add: [L("cites", "s-9ttvcwpqkehm58g"), L("cites", "s-qmmzf9nksfsa3qp")] },
  { key: "proposal:s-7kc8dw7zdz63q53", sid: "s-7kc8dw7zdz63q53", row: true, from: [["2.9", 1]] },
  { key: "new:domains-11-1-term", sid: NEW_SID.domainTerm, location: "domains 11.1.5a (new, after “Links between domains”)", from: [["2.9", 2], ["4.6", 0]],
    add: [L("refines", "s-ypa92gpcj3f5zj8"), L("cites", "s-vj7ercem526zd6v"), L("cites", "s-z6tq6a3btnvvwx7")], decisions: [...fileDecisions("2.9"), D.q46] },
  { key: "new:domains-11-3-term-cited", sid: NEW_SID.termCited, row: true, location: "domains 11.3.6a (new row of the table of checks of the Domains extension, after row 11.3.6)", from: [["2.9", 3]],
    add: [L("checks", NEW_SID.domainTerm), L("cites", "s-vj7ercem526zd6v")] },
  { key: "new:domains-11-3-term-place", sid: NEW_SID.termPlace, row: true, location: "domains 11.3.6b (new row of the table of checks of the Domains extension, after row 11.3.6a)", from: [["2.9", 4], ["4.6", 1]],
    add: [L("checks", NEW_SID.domainTerm), L("cites", "s-vj7ercem526zd6v")] },
  { key: "proposal:s-m4dxqgfgew9afer", sid: "s-m4dxqgfgew9afer", section: true, from: [["3.1", 0]] },
  { key: "new:spec-10-setup", sid: NEW_SID.setup, location: "spec 10.13a (new, after “A procedure that writes the specification is idempotent”)", from: [["3.1", 1]],
    add: ["s-qzthyh7yqvfhsa2", "s-q3pfzyaxvpr2zj2", "s-9ttvcwpqkehm58g", "s-kgbzk2ph9e6jfb4", "s-hheus6f395ynqvc"].map((s) => L("cites", s)) },
  { key: "new:spec-10-model", sid: NEW_SID.model, location: "spec 10.4a (new, after “What the reviewer is given”)", node: node32(), also: ["3.2"], add: [L("cites", "s-m4h279nbaqkpa3t")], decisions: fileDecisions("3.2") },
  { key: "proposal:s-5fewsp22mmdz7y6", sid: "s-5fewsp22mmdz7y6", from: [["3.3", 0]],
    decisions: fromAnswer("3.3", `The owner agreed to the proposed wording (${AGREE3}): a cell of a table holds a node only of a kind whose nodes need no title, such as a rule, so no term is held in a cell.`) },
  { key: "new:recordtype-12-12-ref", sid: NEW_SID.ref, row: true, location: "recordtype 12.12.3a (new row of the table of checks of the RecordType extension, after row 12.12.3)", from: [["3.4", 0]],
    add: [L("checks", "s-6eb92ddch7shuvu"), L("checks", "s-8ht2hn88cu2qwz9")] },
  { key: "proposal:s-z3dnru6qqdf9m6j", sid: "s-z3dnru6qqdf9m6j", from: [["3.5", 0]],
    decisions: fromAnswer("3.5", `The owner agreed to the proposed wording (${AGREE3}): a RecordType variant adds the fields that it declares and those that it takes through \`refines\` from another RecordType, other than its own RecordType and those that its RecordType reaches through \`refines\`, and the table of checks covers every field that it adds.`) },
  { key: "proposal:s-47q37qk27yvt3pa", sid: "s-47q37qk27yvt3pa", row: true, from: [["3.5", 1]] },
  { key: "proposal:s-hrguxwcsdm57vxf", sid: "s-hrguxwcsdm57vxf", row: true, from: [["3.5", 2]] },
  { key: "new:recordtype-12-12-variant-top", sid: NEW_SID.variantTop, row: true, location: "recordtype 12.12.7a (new row of the table of checks of the RecordType extension, after row 12.12.7)", from: [["3.6", 0]],
    add: [L("checks", "s-z3dnru6qqdf9m6j")] },
  { key: "new:recordtype-12-12-variants-top", sid: NEW_SID.variantsTop, row: true, location: "recordtype 12.12.7b (new row of the table of checks of the RecordType extension, after row 12.12.7a)", from: [["3.6", 1]],
    add: [L("checks", "s-z3dnru6qqdf9m6j")] },
  { key: "new:recordtype-12-12-object", sid: NEW_SID.object, row: true, location: "recordtype 12.12.3b (new row of the table of checks of the RecordType extension, after row 12.12.3a)", from: [["3.7", 0]],
    add: [L("checks", "s-6eb92ddch7shuvu"), L("checks", "s-wxcmpbvy9bzkfj9")] },
  { key: "new:recordtype-12-12-in-base", sid: NEW_SID.inBase, row: true, location: "recordtype 12.12.1a (new row of the table of checks of the RecordType extension, after row 12.12.1)", from: [["3.8", 0]],
    add: [L("checks", "s-7vm323mhry2enx3"), L("cites", "s-qmmzf9nksfsa3qp")] },
  { key: "proposal:s-5ah25f6gy99panq", sid: "s-5ah25f6gy99panq", from: [["4.1", 0]], decisions: [D.q41] },
  { key: "proposal:s-utvqbypzhmgndug", sid: "s-utvqbypzhmgndug", from: [["4.1", 1]], also: ["1.3"] },
  { key: "new:spec-10-1-structure", sid: NEW_SID.structure, row: true, location: "spec 10.1.22a (new row of the main table of checks, in the group “The specification alone”, after row 10.1.22)", from: [["4.2", 0]],
    add: [L("checks", "s-qmmzf9nksfsa3qp"), L("checks", "s-vj7ercem526zd6v"), L("cites", "s-tj38pvm38nepaf5"), L("cites", "s-5x737t9nee4zgaa")], decisions: [...copied1118, D.q42] },
  { key: "proposal:s-vghy37e3p2325ah", sid: "s-vghy37e3p2325ah", row: true, from: [["4.2", 1]], remove: ["s-qmmzf9nksfsa3qp"], decisions: [D.q42] },
  { key: "proposal:s-k6dzuajejrw4cej", sid: "s-k6dzuajejrw4cej", row: true, from: [["4.3", 1], ["4.4", 1]], decisions: [D.q43, D.q44] },
  { key: "proposal:s-sfjka4zc4rhfu67", sid: "s-sfjka4zc4rhfu67", from: [["4.5", 0]], decisions: [D.q45] },
  { key: "new:spec-10-1-tag-outside", sid: NEW_SID.tagOutside, row: true, location: "spec 10.1.28b (new row of the main table of checks, in the group “The specification and the code”, directly after row 10.1.28)", from: [["4.5", 1]],
    add: [L("checks", "s-sfjka4zc4rhfu67"), L("cites", "s-hheus6f395ynqvc")] },
];

// ---------------------------------------------------------------- what is written: rules 10.6 and 10.7, from change 1.3
const nfOf = (sid) => Object.values(newform).find((v) => v && v.sidValue === sid) ?? fail(`newform.json has no ${sid}`);
function rep(s, a, b, where) {
  if (typeof s !== "string" || s.split(a).length !== 2) fail(`${where}: expected once: ${a.slice(0, 80)}`);
  return s.replace(a, () => b);
}
function nfWording(sid) {
  const v = nfOf(sid);
  return {
    en: { title: v.title, text: v.text, reason: v.reason, examples: v.examples || [] },
    ru: { title: v.ruTitle, text: v.ruText, reason: v.ruReason, examples: v.ruExamples || [] },
  };
}
function technicalNode(sid, edits, changes) {
  const agreed = nfWording(sid);
  const w = structuredClone(agreed);
  for (const [lang, field, a, b, i] of edits) {
    if (field === "examples") w[lang].examples[i] = rep(w[lang].examples[i], a, b, `${sid} ${lang} example ${i}`);
    else w[lang][field] = rep(w[lang][field], a, b, `${sid} ${lang} ${field}`);
  }
  return { label: agreed.en.title, status: "changed", sid, en: w.en, ru: w.ru, agreed, changes };
}
const SECTION1 = "Изменение без вопроса по вашим решениям от 2026-11-17 о строках §s-k6dzuajejrw4cej и §s-ay6wntm2dxcgpnp, вместе с предложением 2.6:";
const TECHNICAL_NODES = {
  "s-qzthyh7yqvfhsa2": technicalNode("s-qzthyh7yqvfhsa2", [
    ["en", "text", "for example a symbol without a SpecTag (§s-8xw4mgvpexyvw5q)", "for example a symbol that no SpecTag (§s-8xw4mgvpexyvw5q) binds"],
    ["ru", "text", "например, символ без SpecTag", "например, символ, который не привязан ни одним SpecTag"],
    ["en", "reason", "Old code without a SpecTag may still work correctly", "Old code that no SpecTag binds may still work correctly"],
    ["ru", "reason", "Старый код без SpecTag может работать правильно", "Старый код, который не привязан ни одним SpecTag, может работать правильно"],
  ], [`${SECTION1} в тексте «например, символ без SpecTag» стало «например, символ, который не привязан ни одним SpecTag», а в обосновании «Старый код без SpecTag может работать правильно» стало «Старый код, который не привязан ни одним SpecTag, может работать правильно».`]),
  "s-q3pfzyaxvpr2zj2": technicalNode("s-q3pfzyaxvpr2zj2", [
    ["en", "examples", "Under the rule on code without a SpecTag (§s-kkbqcb9xrpaepwn), code that a commit does not change and that carries no SpecTag makes the checks refuse the commit.",
      "Under the rule on code that no SpecTag binds (§s-kkbqcb9xrpaepwn), code that a commit does not change and that no SpecTag binds makes the checks refuse the commit.", 0],
    ["ru", "examples", "По правилу о коде без SpecTag (§s-kkbqcb9xrpaepwn) код без SpecTag за пределами коммита тогда приводит к тому, что проверки отклоняют этот коммит.",
      "По правилу о коде, который не привязан ни одним SpecTag (§s-kkbqcb9xrpaepwn), код, который коммит не меняет и который не привязан ни одним SpecTag, тогда приводит к тому, что проверки отклоняют этот коммит.", 0],
  ], [`${SECTION1} в первом примере «По правилу о коде без SpecTag (§s-kkbqcb9xrpaepwn) код без SpecTag за пределами коммита…» стало «По правилу о коде, который не привязан ни одним SpecTag (§s-kkbqcb9xrpaepwn), код, который коммит не меняет и который не привязан ни одним SpecTag…».`]),
};
W.push(
  { key: "proposal:s-qzthyh7yqvfhsa2", sid: "s-qzthyh7yqvfhsa2", node: TECHNICAL_NODES["s-qzthyh7yqvfhsa2"], also: ["1.3"] },
  { key: "proposal:s-q3pfzyaxvpr2zj2", sid: "s-q3pfzyaxvpr2zj2", node: TECHNICAL_NODES["s-q3pfzyaxvpr2zj2"], also: ["1.3"] },
);

// ---------------------------------------------------------------- parts, as the earlier groups write them
function split(text) {
  const out = [];
  for (const para of text.split("\n\n")) for (const line of para.split("\n")) {
    let m;
    if ((m = line.match(/^ {2}- (.*)$/))) out.push({ kind: "li2", s: m[1] });
    else if ((m = line.match(/^- (.*)$/))) out.push({ kind: "li", s: m[1] });
    else if ((m = line.match(/^\d+\. (.*)$/))) out.push({ kind: "ol", s: m[1] });
    else out.push({ kind: "p", s: line });
  }
  return out;
}
function render(parts, key) {
  const out = [];
  let n = 0;
  for (const x of parts) {
    if (x.kind === "p") { out.push((out.length ? "\n" : "") + x[key]); n = 0; }
    else if (x.kind === "ol") out.push(`${++n}. ${x[key]}`);
    else if (x.kind === "li2") out.push(`  - ${x[key]}`);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
}
const SAME = "Как в согласованной формулировке.";
// Aligns the new parts with the agreed ones by their English and says, for each new part, what it replaces.
function buildParts(where, en, ru, agEn, agRu) {
  const ne = split(en), nr = split(ru);
  if (ne.length !== nr.length || ne.some((x, i) => x.kind !== nr[i].kind)) fail(`${where}: the English and the Russian differ in their paragraphs and lists`);
  const parts = ne.map((x, i) => ({ kind: x.kind, en: x.s, ru: nr[i].s, change: "Новое." }));
  // A blank line before a list, which some agreed Russian texts hold, is the only difference allowed.
  const norm = (s) => s.replace(/\n\n(?=- |\d+\. | {2}- )/g, "\n");
  if (render(parts, "en") !== norm(en) || render(parts, "ru") !== norm(ru)) fail(`${where}: the text does not render back from its parts`);
  const removed = [];
  if (agEn == null) return { parts, removed };
  const ae = split(agEn), ar = split(agRu);
  if (ae.length !== ar.length) fail(`${where}: the agreed English and Russian differ in their paragraphs and lists`);
  const n = ne.length, m = ae.length;
  const lcs = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) lcs[i][j] = ne[i].s === ae[j].s ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
  let i = 0, j = 0;
  const pendingNew = [], pendingOld = [];
  // Between two unchanged parts, each new part replaces the agreed part whose English shares the most words with it, if
  // they share at least a third of their words; a new part with no such counterpart is new, and an agreed part left over
  // is removed.
  const words = (s) => new Set(s.toLowerCase().match(/[a-z0-9`§-]+/g) || []);
  const likeness = (a, b) => { const x = words(a), y = words(b); let c = 0; for (const t of x) if (y.has(t)) c++; return c / Math.max(1, Math.min(x.size, y.size)); };
  const flush = () => {
    const pairs = [];
    for (const a of pendingNew) for (const b of pendingOld) pairs.push([likeness(ne[a].s, ae[b].s), a, b]);
    pairs.sort((x, y) => y[0] - x[0]);
    const usedNew = new Set(), usedOld = new Set();
    for (const [score, a, b] of pairs) {
      if (score < 1 / 3 || usedNew.has(a) || usedOld.has(b)) continue;
      usedNew.add(a); usedOld.add(b);
      parts[a].change = parts[a].ru === ar[b].s ? `Изменён только английский текст. Было: «${ae[b].s}».` : `Было: «${ar[b].s}».`;
    }
    for (const b of pendingOld) if (!usedOld.has(b)) removed.push(`Удалено: «${ar[b].s}».`);
    pendingNew.length = 0;
    pendingOld.length = 0;
  };
  while (i < n || j < m) {
    if (i < n && j < m && ne[i].s === ae[j].s) {
      flush();
      parts[i].change = parts[i].ru === ar[j].s ? SAME : `Изменён только русский текст. Было: «${ar[j].s}».`;
      i++; j++;
    } else if (j < m && (i >= n || lcs[i][j + 1] >= lcs[i + 1][j])) pendingOld.push(j++);
    else pendingNew.push(i++);
  }
  flush();
  return { parts, removed };
}
const fieldChange = (en, ru, agEn, agRu) => {
  if (agEn == null) return "Новое.";
  if (en === agEn) return ru === agRu ? SAME : `Изменён только русский текст. Было: «${agRu}».`;
  return ru === agRu ? `Изменён только английский текст. Было: «${agEn}».` : `Было: «${agRu}».`;
};

// ---------------------------------------------------------------- links and citations
const citedIn = (s) => [...String(s ?? "").matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const bareSids = (s) => String(s ?? "").match(/s-[2-9a-hjkmnp-z]{15}/g) || [];

// ---------------------------------------------------------------- building each draft
const written = new Map();
const notes = [];
for (const w of W) {
  const nodes = w.node ? [w.node] : w.from.map(([id, i]) => pageNode(id, i));
  const last = nodes[nodes.length - 1];
  const items = [...new Set([...(w.from || []).map(([id]) => id), ...(w.also || [])])];
  const isNew = w.key.startsWith("new:");
  if (isNew ? last.status.startsWith("changed") : !last.status.startsWith("changed")) fail(`${w.key}: the page shows the node as ${last.status}`);
  if (before[w.key]) fail(`${w.key} already exists`);
  if (w.base && !before[w.base]?.agreed) fail(`${w.key}: its base ${w.base} is missing or not agreed`);
  if (!isNew && !moved[w.sid]) fail(`${w.key}: moved/ has no node ${w.sid}`);

  // The agreed wording that the page shows as replaced must be the one in force.
  if (!isNew) {
    const ag = last.agreed?.en ?? fail(`${w.key}: the page shows no agreed wording`);
    let cur;
    if (w.base) {
      const p = before[w.base].proposal;
      cur = w.row ? { whatChecked: p.text, onFailure: before[w.base].cost.en } : { title: p.title, text: p.text, reason: p.reason, examples: (p.examples || []).map((x) => x.en) };
      if (!w.row && last.agreed.ru.text !== p.ruText) fail(`${w.key}: the agreed Russian text on the page differs from ${w.base}`);
    } else {
      const m = moved[w.sid];
      cur = w.row ? { whatChecked: m.node.text, onFailure: m.cost } : w.section ? { title: m.node.title, text: m.node.text } : { title: m.node.title, text: m.node.text, reason: m.node.reason, examples: m.node.examples || [] };
    }
    for (const [f, v] of Object.entries(cur)) if (JSON.stringify(v ?? null) !== JSON.stringify(ag[f] ?? (f === "examples" ? [] : null))) fail(`${w.key}: the agreed ${f} on the page differs from the wording in force`);
  }

  const ag = last.agreed;
  const e = { question: null, location: w.location ?? `${locOf(w.sid)}${w.row ? " (row of a table of checks)" : ""}`, sidValue: w.sid };
  if (w.base) e.base = w.base;
  if (w.row) e.kind = "cell";
  if (w.section) e.kind = "section";
  const p = {};
  if (w.row) {
    e.cost = { en: last.en.onFailure, ru: last.ru.onFailure };
    p.title = null; p.ruTitle = null;
    p.parts = [{ kind: "p", en: last.en.whatChecked, ru: last.ru.whatChecked, change: fieldChange(last.en.whatChecked, last.ru.whatChecked, ag?.en.whatChecked, ag?.ru.whatChecked) }];
    p.reason = null; p.ruReason = null;
    p.removed = [];
    if (ag && last.en.onFailure !== ag.en.onFailure) p.costChange = fieldChange(last.en.onFailure, last.ru.onFailure, ag.en.onFailure, ag.ru.onFailure);
  } else {
    p.title = last.en.title; p.ruTitle = last.ru.title;
    if (ag && (last.en.title !== ag.en.title || last.ru.title !== ag.ru.title)) p.titleChange = fieldChange(last.en.title, last.ru.title, ag.en.title, ag.ru.title);
    if (isNew) p.titleChange = "Новое.";
    const built = buildParts(w.key, last.en.text, last.ru.text, ag?.en.text, ag?.ru.text);
    p.parts = built.parts;
    p.removed = built.removed;
    if (!w.section) {
      p.reason = last.en.reason; p.ruReason = last.ru.reason;
      p.reasonChange = fieldChange(last.en.reason, last.ru.reason, ag?.en.reason, ag?.ru.reason);
      const ex = last.en.examples || [], rx = last.ru.examples || [];
      if (ex.length !== rx.length) fail(`${w.key}: the English and the Russian have different numbers of examples`);
      p.examples = ex.map((x, i) => ({ en: x, ru: rx[i] }));
    }
  }
  // Links: those in force, then the item's own additions and removals.
  const start = w.base ? before[w.base].proposal.refs : isNew ? [] : (moved[w.sid].node.refs || []).filter((r) => r.to);
  let refs = start.map((r) => ({ type: r.type, to: r.to }));
  for (const [type, to] of w.add || []) {
    if (refs.some((r) => r.to === to)) fail(`${w.key}: already links to ${to}`);
    refs.push({ type, to });
  }
  const decisions = w.decisions || [];
  const decisionText = JSON.stringify([...decisions, ...(isNew ? [] : moved[w.sid].node.meta?.decisions || []), ...(w.base ? before[w.base].proposal.meta?.decisions || [] : [])]);
  const enAll = [p.title, ...p.parts.map((x) => x.en), p.reason, ...(p.examples || []).map((x) => x.en)].join("\n");
  const ruAll = [p.ruTitle, ...p.parts.map((x) => x.ru), p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  for (const to of w.remove || []) {
    const link = refs.find((r) => r.to === to) ?? fail(`${w.key}: no link to ${to} to remove`);
    if (link.type === "cites") {
      if (citedIn(enAll).includes(to)) fail(`${w.key}: still cites ${to}`);
      if (bareSids(decisionText).includes(to)) { notes.push(`${w.key}: the cites link to ${to} stays, since a decision on the node names it`); continue; }
    }
    refs = refs.filter((r) => r.to !== to);
  }
  // Every sid that a decision names has a link, where that sid is a node of the base specification.
  const citedInDecisions = [];
  for (const s of new Set(bareSids(JSON.stringify(decisions)))) {
    if (s === w.sid || refs.some((r) => r.to === s)) continue;
    if (!baseSids.has(s)) { notes.push(`${w.key}: a decision names ${s}, which is not a node of the base specification, so no link was added`); continue; }
    refs.push({ type: "cites", to: s });
    citedInDecisions.push(s);
  }
  // The checks of the links and the citations.
  const cited = new Set(citedIn(enAll));
  const ruCited = new Set(citedIn(ruAll));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${w.key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${w.key}: the Russian cites ${s}, the English does not`);
  const linkedTo = new Set();
  for (const r of refs) {
    if (linkedTo.has(r.to)) problems.push(`${w.key}: two links to ${r.to}`);
    linkedTo.add(r.to);
    if (r.to === w.sid) problems.push(`${w.key}: a link to itself`);
    if (!baseSids.has(r.to)) problems.push(`${w.key}: a link to ${r.to}, which is not a node of the base specification`);
  }
  for (const s of cited) if (s !== w.sid && !linkedTo.has(s)) problems.push(`${w.key}: cites ${s} without a link`);
  const decided = new Set([...bareSids(decisionText), ...(w.base ? before[w.base].proposal.citedInDecisions || [] : [])]);
  for (const r of refs) if (r.type === "cites" && !cited.has(r.to) && !decided.has(r.to)) problems.push(`${w.key}: a cites link to ${r.to} that nothing cites`);

  p.refs = refs;
  if (citedInDecisions.length) p.citedInDecisions = citedInDecisions;
  if (decisions.length) p.meta = { decisions };
  p.date = DATE;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  e.question = questionOf(w, items);
  e.change = [...new Set(nodes.flatMap((n) => n.changes))].join(" ");
  e.proposal = p;
  const assessed = [...items].reverse().map((id) => ITEMS[id]).find((it) => it?.assessment);
  if (assessed) e.assessment = { source: `bq-pages.json, item ${assessed.id}`, lines: Object.fromEntries(assessed.assessment.map((l) => [l.split(" ")[0], l.slice(l.indexOf(" ") + 1)])) };
  e.agreed = DATE;
  e.rulings = items.map(ruling);
  written.set(w.key, e);
}
function questionOf(w, items) {
  const q = items.filter((id) => /^4\./.test(id));
  if (q.length) return `${q.length > 1 ? "Questions" : "Question"} ${q.join(" and ")} of the questions about the base specification; the owner chose the recommended option${q.length > 1 ? " in each" : ""}.`;
  if (items.includes("3.2")) return "None: carries out the owner's decision of 2026-11-02 that no choice that costs a user tokens is made without their consent";
  const p3 = items.find((id) => /^3\./.test(id));
  if (p3) return `None: new wording ${p3} of the questions about the base specification, which no earlier decision settles and for which the rules leave no real choice`;
  const p2 = items.find((id) => CARRIES[id]);
  if (p2) return `None: carries out ${CARRIES[p2]}`;
  return "None: change 1.3 of the questions about the base specification, a technical replacement that carries out the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a";
}

// ---------------------------------------------------------------- the changes in place in agreed drafts
const WORDING_FIELDS = ["title", "ruTitle", "text", "ruText", "reason", "ruReason"];
function replaceInWording(key, a, b, { atLeast = 1, alsoWork = false } = {}) {
  const e = drafts[key] ?? fail(`no draft ${key}`);
  if (!e.agreed) fail(`${key} is not agreed`);
  const p = e.proposal;
  let count = 0;
  const swap = (s) => { if (typeof s !== "string") return s; const n = s.split(a).length - 1; count += n; return n ? s.split(a).join(b) : s; };
  for (const f of WORDING_FIELDS) p[f] = swap(p[f]);
  for (const x of p.parts || []) { x.en = swap(x.en); x.ru = swap(x.ru); }
  for (const x of p.examples || []) { x.en = swap(x.en); x.ru = swap(x.ru); }
  if (alsoWork) {
    if (typeof e.stage3 === "string") e.stage3 = swap(e.stage3);
    if (Array.isArray(e.testsFrom)) e.testsFrom = e.testsFrom.map(swap);
  }
  if (count < atLeast) fail(`${key}: «${a}» occurs ${count} times`);
  return count;
}
const technical = new Map();
const tech = (key, change) => { technical.set(key, [...(technical.get(key) || []), change]); };

// 1.1
for (const key of ["proposal:s-ztseyetus7np6br", "proposal:s-ztseyetus7np6br-g3", "new:tools-2-reindex-writes"]) {
  replaceInWording(key, "an approval of its current wording stands (§s-v4qus7raqnwzneb)", "an approval of its current wording is in force (§s-v4qus7raqnwzneb)", { atLeast: 2 });
  replaceInWording(key, "each field that has an `enum` whose values", "each field with `enum` whose values", { atLeast: 2 });
  tech(key, "\"stands\" became \"is in force\", as in row 10.1.8 (s-cey3k9xxjvkpyqz), and \"a field that has an `enum`\" became the term \"a field with `enum`\" of rule 12.7 (s-xfu2gpzddjnmgks); the Russian already said «в силе» and «поле с `enum`». Change 1.1 of the questions about the base specification; no meaning changed.");
}
// 1.4
const RENAME_14 = "\"without a SpecTag\" became \"that no SpecTag binds\", as in rule 9.5 (s-kkbqcb9xrpaepwn) under the owner's rulings of 2026-11-17 on rows 10.1.26 and 10.1.26a. Change 1.4 of the questions about the base specification, made together with proposal 2.6.";
const R14 = [
  ["new:tools-7-2-outside", [
    ["as the rule on code and tests without a SpecTag (§s-5z5gnu7pahr82xp) requires (§s-kkbqcb9xrpaepwn):", "as the rule requires (§s-kkbqcb9xrpaepwn) for code and tests that no SpecTag (§s-5z5gnu7pahr82xp) binds:"],
    ["так, как требует (§s-kkbqcb9xrpaepwn) правило о коде и тестах без SpecTag (§s-5z5gnu7pahr82xp):", "так, как требует (§s-kkbqcb9xrpaepwn) правило о коде и тестах, которые не привязаны ни одним SpecTag (§s-5z5gnu7pahr82xp):"],
    ["decide what code without a SpecTag outside the commit costs the commit: nothing, a warning or a refusal.", "decide what code that is outside the commit, and that no SpecTag binds, costs the commit: nothing, a warning or a refusal."],
    ["определяют, чего стоит коммиту код без SpecTag за пределами коммита: ничего, предупреждения или отказа.", "определяют, чего стоит коммиту код, который находится за пределами коммита и не привязан ни одним SpecTag: ничего, предупреждения или отказа."],
  ]],
  ["proposal:s-weuyx98r7c923ab", [
    ["The check for code without a SpecTag names this command in its warning and in its refusal (§s-kkbqcb9xrpaepwn).", "The check for such code names this command in its warning and in its refusal (§s-kkbqcb9xrpaepwn)."],
    ["Проверка кода без SpecTag называет эту команду в своём предупреждении и отказе (§s-kkbqcb9xrpaepwn).", "Проверка такого кода называет эту команду в своём предупреждении и отказе (§s-kkbqcb9xrpaepwn)."],
    ["The check for code without a SpecTag covers all such code in one warning, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn).", "In one warning, the check covers all the code that no SpecTag binds, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn)."],
    ["Проверка кода без SpecTag сообщает обо всём таком коде одним предупреждением, чтобы оно не заслоняло другие находки (§s-kkbqcb9xrpaepwn).", "Проверка сообщает обо всём коде, который не привязан ни одним SpecTag, одним предупреждением, чтобы оно не заслоняло другие находки (§s-kkbqcb9xrpaepwn)."],
  ]],
  ["new:tools-2-settings", [
    ["`sheriff untagged`, for the check for code without a SpecTag (§s-weuyx98r7c923ab);", "`sheriff untagged`, for the check for code that no SpecTag binds (§s-weuyx98r7c923ab);"],
    ["`sheriff untagged` — для проверки кода без SpecTag (§s-weuyx98r7c923ab);", "`sheriff untagged` — для проверки кода, который не привязан ни одним SpecTag (§s-weuyx98r7c923ab);"],
  ]],
  ["proposal:s-f5rz6b7dhxejjts-g7", [
    ["symbols of the system's code that have no SpecTag (§s-8xw4mgvpexyvw5q)", "symbols of the system's code that no SpecTag (§s-8xw4mgvpexyvw5q) binds"],
    ["символы кода системы, у которых нет SpecTag (§s-8xw4mgvpexyvw5q)", "символы кода системы, которые не привязаны ни одним SpecTag (§s-8xw4mgvpexyvw5q)"],
  ]],
];
for (const [key, pairs] of R14) {
  for (const [a, b] of pairs) replaceInWording(key, a, b);
  tech(key, RENAME_14);
}
// 4.7
const ENUM_KEYS = Object.keys(before).filter((k) => JSON.stringify([before[k].proposal || {}, before[k].stage3 ?? null, before[k].testsFrom ?? null]).includes("x-enumSource"));
for (const key of ENUM_KEYS) {
  const n = replaceInWording(key, "x-enumSource", "enumSource", { atLeast: 0, alsoWork: true });
  if (n) tech(key, "`x-enumSource` became `enumSource` wherever the draft names it, in its wording, its stage-3 note or the tests to write, under decision R8 of the page on RecordType and JSON Schema that the owner accepted on 2026-11-19 (question 4.7 of the questions about the base specification). The decisions and the change fields, which record earlier states, keep the old name.");
}
// 1.2, 3.1 and 3.2: links of agreed drafts of the appendix of the tools
const LINKS = [
  ["new:tools-17-validator", [["add", "implements", "s-wxcmpbvy9bzkfj9"]], "Gained an `implements` link to rule 12.4 (s-wxcmpbvy9bzkfj9), which already requires what the node states (change 1.2 of the questions about the base specification). A link changes no status."],
  ["s-7unxytshhc4md54", [["add", "implements", NEW_SID.setup]], `Gained an \`implements\` link to the new rule on setting a repository up and taking SpecSheriff out of it (${NEW_SID.setup}), proposal 3.1 of the questions about the base specification, which the owner agreed to on 2026-11-25.`],
  ["new:tools-15-spec-init", [["add", "implements", NEW_SID.setup]], `Gained an \`implements\` link to the new rule on setting a repository up and taking SpecSheriff out of it (${NEW_SID.setup}), proposal 3.1 of the questions about the base specification, which the owner agreed to on 2026-11-25.`],
  ["new:tools-15-spec-remove", [["add", "implements", NEW_SID.setup], ["remove", "implements", "s-bsya3febm6u64ab"]], `Implements the new rule on setting a repository up and taking SpecSheriff out of it (${NEW_SID.setup}) in place of rule 2.5 (s-bsya3febm6u64ab), as proposal 3.1 of the questions about the base specification says; the owner agreed to it on 2026-11-25.`],
  ["new:tools-15-skills", [["add", "implements", NEW_SID.model], ["remove", "implements", "s-bsya3febm6u64ab"]], `Implements the new rule on who chooses an agent's model and reasoning effort (${NEW_SID.model}) in place of rule 2.5 (s-bsya3febm6u64ab), as proposal 3.2 of the questions about the base specification says; it was agreed on the owner's behalf on 2026-11-25.`],
  ["new:tools-10-settings", [["add", "implements", NEW_SID.model]], `Gained an \`implements\` link to the new rule on who chooses an agent's model and reasoning effort (${NEW_SID.model}), proposal 3.2 of the questions about the base specification, agreed on the owner's behalf on 2026-11-25.`],
];
for (const [key, ops, change] of LINKS) {
  const e = drafts[key] ?? fail(`no draft ${key}`);
  if (!e.agreed) fail(`${key} is not agreed`);
  for (const [op, type, to] of ops) {
    const has = e.proposal.refs.some((r) => r.to === to && r.type === type);
    if (op === "add") { if (e.proposal.refs.some((r) => r.to === to)) fail(`${key} already links to ${to}`); e.proposal.refs.push({ type, to }); }
    else { if (!has) fail(`${key} has no ${type} link to ${to}`); e.proposal.refs = e.proposal.refs.filter((r) => !(r.to === to && r.type === type)); }
  }
  tech(key, change);
}
for (const [key, changes] of technical) {
  const e = drafts[key];
  const p = e.proposal;
  if (p.parts?.length && before[key].proposal.text === render(before[key].proposal.parts, "en") && p.text !== render(p.parts, "en")) fail(`${key}: the text and its parts no longer agree`);
  e.technical = [...(Array.isArray(e.technical) ? e.technical : e.technical ? [e.technical] : []), ...changes.map((change) => ({ date: DATE, change }))];
}

// ---------------------------------------------------------------- the last checks, and the files
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
for (const [k, e] of written) drafts[k] = e;
const touched = new Set([...written.keys(), ...technical.keys()]);
for (const k of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (touched.has(k)) continue;
  if (JSON.stringify(before[k]) !== JSON.stringify(drafts[k])) fail(`a key that the script does not write changed: ${k}`);
}
if (firstRun) fs.writeFileSync(beforeUrl, backupText);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

console.log(`wrote ${written.size} agreed drafts:`);
for (const [k, e] of written) console.log(`- ${k}${e.base ? ` (base ${e.base})` : ""}: ${e.location}; ${(e.proposal.meta?.decisions || []).length} decisions; rulings for ${e.rulings.length === 1 ? "one answer" : `${e.rulings.length} answers`}`);
console.log(`changed ${technical.size} agreed drafts in place:`);
for (const [k, c] of technical) console.log(`- ${k}: ${c.length} change${c.length > 1 ? "s" : ""}`);
if (notes.length) console.log(`notes:\n${notes.join("\n")}`);
