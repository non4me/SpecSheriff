// Records the owner's agreement of 2026-11-25 to group 8 of stage 2 of T25 (items 57 to 63, with the new row 10.1.37b of
// the main table of checks): «А», in answer to «Согласны с группой 8 и с вариантом А во всех трёх вопросах?». Marks each
// draft of the group as agreed and records the agreement in the draft's `rulings`, as agree-group7.mjs does. Records the
// owner's answers as decisions in the `meta.decisions` of the drafts that state them:
// - Q1, option A, on the pre-commit hook (s-npnmwyt6s3gypwe);
// - Q2, option A, on the guard (s-st6td4mua9uqt9z);
// - Q3, option A, on the skills of the SpecSheriff plugins (s-kq6wmdud9c7j2k9);
// - the commit or the push that goes through where Node.js is missing or too old, which the agreement to the group
//   settles, on the git hook's lookup of the SpecSheriff tools (s-4mej6ccn7xu3d3p).
// Where such a decision cites a node that the draft has no link to, adds a `cites` link from the draft to that node.
// Copies tools-drafts.json to tools-drafts.before-agree-group8.json first. When the script is run again, it rebuilds the
// group's keys from that copy, so a second run gives the same file.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-agree-group8.json", here);
const firstRun = !fs.existsSync(beforeUrl);
const before = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const drafts = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const DATE = "2026-11-25";
const ANSWER = "«А», in answer to «Согласны с группой 8 и с вариантом А во всех трёх вопросах?»";

// The keys of the group are those that group8-assessments.json assesses, the same keys that the group's page shows.
const GROUP = Object.keys(JSON.parse(fs.readFileSync(new URL("group8-assessments.json", here), "utf8")));
if (GROUP.length !== 17) throw new Error(`group 8 has ${GROUP.length} keys, not 17`);
for (const k of GROUP) {
  if (!before[k]?.proposal) throw new Error(`no draft ${k}`);
  if (before[k].agreed) throw new Error(`${k} is already agreed`);
}

// The owner's answers, each recorded on the draft that states what it settles.
const ORDER_RULE = "“The order in which tools and checks run on a commit and on a push” (s-pcnyfp7gev7syax)";
const ANSWERS = {
  "new:tools-6-pre-commit": [{
    date: DATE,
    problem: `${ORDER_RULE} runs the check for a key written more than once and the validation against the schema right after the first step, before the project's own tools that do not rewrite files. \`sheriff validate\` (s-7pk89t8z6wymmj9) makes those two checks, the project's own checks and its other checks in one command, so the pre-commit hook can run those tools only before \`sheriff validate\` or after it.`,
    ruling: `The owner chose option A of the first question of group 8 (${ANSWER}): the pre-commit hook runs the project's own tools that do not rewrite files before \`sheriff validate\`. Once the review of the appendix of the tools is finished, that rule is to say "before any other check" instead of "right after the first step".`,
    type: "textual",
  }],
  "s-st6td4mua9uqt9z": [{
    date: DATE,
    problem: "“An agent's edit is checked before it is made” (s-83ev4wwesbwnhnp) refuses an edit that would leave a node approved with a wording for which no approval stands. Read literally, that applies to every node of the specification, including a node that the edit does not touch.",
    ruling: `The owner chose option A of the second question of group 8 (${ANSWER}): \`sheriff guard\` judges only the nodes that an edit adds, or whose wording or approval status it changes. Once the review of the appendix of the tools is finished, that rule is to say so.`,
    type: "textual",
  }],
  "new:tools-15-skills": [{
    date: DATE,
    problem: "The SpecSheriff plugins hold the skills `spec`, `spec-review` and `spec-adopt`, and no node describes them.",
    ruling: `The owner chose option A of the third question of group 8 (${ANSWER}): \`spec\`, \`spec-review\` and \`spec-adopt\` are to be described in nodes of their own by a task after the current one, and the node's todo records it.`,
    type: "procedural",
  }],
  "s-4mej6ccn7xu3d3p": [{
    date: DATE,
    problem: `The approved node refused a commit or a push where Node.js is missing or older than the SpecSheriff tools need, while ${ORDER_RULE} lets a commit or a push through wherever the SpecSheriff tools cannot run, unless one of the project's own tools fails.`,
    ruling: `The owner agreed to group 8 (${ANSWER}), which settles this: a commit or a push goes through where Node.js is missing or too old, as that rule says for SpecSheriff tools that cannot run.`,
    type: "textual",
  }],
};
for (const k of Object.keys(ANSWERS)) if (!GROUP.includes(k)) throw new Error(`${k} is not in group 8`);

// Every sid that a node of the specification, the appendix of the tools or a draft holds.
const known = new Set();
const walk = (n) => {
  if (!n || typeof n !== "object") return;
  if (n.sid) known.add(n.sid);
  (n.children || []).forEach(walk);
  for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c?.node) walk(c.node);
};
for (const f of ["moved/specs/_guidelines/spec.json", "../../specs/_guidelines/tools.json"]) JSON.parse(fs.readFileSync(new URL(f, here), "utf8")).nodes.forEach(walk);
for (const f of fs.readdirSync(new URL("moved/specs/_guidelines/extensions/", here))) JSON.parse(fs.readFileSync(new URL(`moved/specs/_guidelines/extensions/${f}`, here), "utf8")).nodes.forEach(walk);
for (const d of Object.values(before)) if (d?.sidValue) known.add(d.sidValue);

let decisionsWritten = 0;
let linksAdded = 0;
const dropped = [];
for (const k of GROUP) {
  const e = structuredClone(before[k]);
  e.agreed = DATE;
  e.rulings = [...(e.rulings || []), {
    date: DATE,
    problem: "Whether the owner agrees to group 8 of stage 2 of T25, items 57 to 63 and the new row 10.1.37b of the main table of checks, shown on one page with each node in full, and to option A in each of the group's three questions.",
    ruling: `The owner agreed to the group and to option A in all three questions (${ANSWER}).`,
    type: "textual",
  }];
  const answers = ANSWERS[k] || [];
  if (answers.length) {
    e.proposal.meta = { ...(e.proposal.meta || {}), decisions: [...(e.proposal.meta?.decisions || []), ...answers] };
    decisionsWritten += answers.length;
  }
  // Every sid that a decision cites has a link.
  const cited = new Set(JSON.stringify(e.proposal.meta?.decisions || []).match(/s-[2-9a-hjkmnp-z]{15}/g) || []);
  for (const sid of cited) {
    if (sid === e.sidValue) continue;
    if (!known.has(sid)) { dropped.push(`${k}: ${sid}`); continue; }
    if (!e.proposal.refs.some((r) => r.to === sid)) {
      e.proposal.refs = [...e.proposal.refs, { type: "cites", to: sid }];
      e.proposal.citedInDecisions = [...new Set([...(e.proposal.citedInDecisions || []), sid])];
      linksAdded++;
    }
  }
  drafts[k] = e;
}

// The checks.
for (const k of GROUP) {
  const e = drafts[k];
  if (e.agreed !== DATE) throw new Error(`${k} is not agreed`);
  const cited = new Set(JSON.stringify(e.proposal.meta?.decisions || []).match(/s-[2-9a-hjkmnp-z]{15}/g) || []);
  for (const sid of cited) if (sid !== e.sidValue && known.has(sid) && !e.proposal.refs.some((r) => r.to === sid)) throw new Error(`${k}: a decision cites ${sid} without a link`);
}
for (const [k, list] of Object.entries(ANSWERS)) for (const a of list) if (!drafts[k].proposal.meta.decisions.includes(a)) throw new Error(`${k}: the answer was not recorded`);
for (const k of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (GROUP.includes(k)) continue;
  if (JSON.stringify(before[k]) !== JSON.stringify(drafts[k])) throw new Error(`a key outside the group changed: ${k}`);
}

if (firstRun) fs.writeFileSync(beforeUrl, JSON.stringify(before, null, 2) + "\n");
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(`agreed ${GROUP.length} drafts on ${DATE}; wrote ${decisionsWritten} decisions; added ${linksAdded} links to sids that decisions cite`);
if (dropped.length) console.log(`sids that decisions cite and no node holds, so no link points to them:\n${dropped.join("\n")}`);
