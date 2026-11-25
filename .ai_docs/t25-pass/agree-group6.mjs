// Records the owner's agreement of 2026-11-25 to group 6 of stage 2 of T25 (items 48 to 50, with the two proposals to
// change agreed nodes that the group holds): «ок», in answer to «Согласны с группой 6?». The group had no question for the
// owner. Marks each draft of the group as agreed and records the agreement in the draft's `rulings`, as agree-group5.mjs
// does. Turns each decision that the group proposes into a decision in the `meta.decisions` of the proposal that holds it.
// Where such a decision cites a node that the proposal has no link to, adds a `cites` link from the proposal to that node.
// Copies tools-drafts.json to tools-drafts.before-agree-group6.json first. When the script is run again, it rebuilds the
// group's keys from that copy, so a second run gives the same file.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-agree-group6.json", here);
const firstRun = !fs.existsSync(beforeUrl);
const before = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const drafts = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const DATE = "2026-11-25";
const ANSWER = "«ок», in answer to «Согласны с группой 6?»";

// The keys of the group are those that group6-assessments.json assesses, the same keys that the group's page shows.
const PARTS_KEYS = [];
const GROUP = Object.keys(JSON.parse(fs.readFileSync(new URL("group6-assessments.json", here), "utf8")));
if (GROUP.length !== 12) throw new Error(`group 6 has ${GROUP.length} keys, not 12`);
for (const k of GROUP) {
  if (!before[k]?.proposal) throw new Error(`no draft ${k}`);
  if (before[k].agreed) throw new Error(`${k} is already agreed`);
}

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
    problem: "Whether the owner agrees to group 6 of stage 2 of T25, items 48 to 50 and the two proposals to change agreed nodes that the group holds, shown on one page with each node in full.",
    ruling: `The owner agreed to the group (${ANSWER}).`,
    type: "textual",
  }];
  const proposed = [...(e.proposedDecision ? [e.proposedDecision] : []), ...(e.proposedDecisions || [])];
  if (proposed.length) {
    e.proposal.meta = { ...(e.proposal.meta || {}), decisions: [...(e.proposal.meta?.decisions || [])] };
    for (const pd of proposed) {
      const ruling = pd.ruling.replace(/^The owner: /, "").replace(/^The owner agreed on 2026-11-24 to /, "the owner's agreement of 2026-11-24 to ");
      e.proposal.meta.decisions.push({
        date: DATE,
        problem: pd.problem,
        ruling: `The owner agreed to group 6 (${ANSWER}), which carries this out: ${ruling}`,
        type: pd.type,
      });
      decisionsWritten++;
    }
    delete e.proposedDecision;
    delete e.proposedDecisions;
  }
  // The owner's choice of answer A on the `parts` source, recorded in the node whose paragraph on a project without the
  // Domains extension carries it.
  if (PARTS_KEYS.includes(k)) {
    e.proposal.meta = { ...(e.proposal.meta || {}), decisions: [...(e.proposal.meta?.decisions || [])] };
    e.proposal.meta.decisions.push({
      date: DATE,
      problem: "Rule 12.11 (s-gqavjzcmubg5pvk) makes the names of the parts into which the base specification is divided the values of a field. In a project with the Domains extension, the parts are its domains and the contracts section. Nothing said what the parts of a project without that extension are.",
      ruling: `The owner chose answer A (${ANSWER}): in a project without the Domains extension, the parts of the base specification are the contracts section, named contracts after its folder, and the sections whose location is base/ followed by a single number, each named by its title. Rule 12.11 refers to the division of the base specification into sections that rule 1.1.2 (s-qmmzf9nksfsa3qp) describes. In the agreed proposal to change rule 8.5 (s-kag2m9tzdnduxdx) and in s-4bwa4zepd4nwcv8, the words "a part of the base specification" therefore become "a folder of the base specification", the words of s-ygg5kpcxgzq3m7w, with no change to their meaning.`,
      type: "textual",
    });
    decisionsWritten++;
  }
  // Every sid that a decision cites has a link.
  const cited = new Set(JSON.stringify(e.proposal.meta?.decisions || []).match(/s-[2-9a-hjkmnp-z]{15}/g) || []);
  for (const sid of cited) {
    if (sid === e.sidValue) continue;
    // A decision may cite a node of the old form that the new form drops, as an agreed decision of rule 1.6.1 does; no
    // link can point to it, and the decision keeps the sid as a record.
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
  if (e.proposedDecision || e.proposedDecisions) throw new Error(`${k} still holds a proposed decision`);
  if (e.agreed !== DATE) throw new Error(`${k} is not agreed`);
  const cited = new Set(JSON.stringify(e.proposal.meta?.decisions || []).match(/s-[2-9a-hjkmnp-z]{15}/g) || []);
  for (const sid of cited) if (sid !== e.sidValue && known.has(sid) && !e.proposal.refs.some((r) => r.to === sid)) throw new Error(`${k}: a decision cites ${sid} without a link`);
}
for (const k of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (GROUP.includes(k)) continue;
  if (JSON.stringify(before[k]) !== JSON.stringify(drafts[k])) throw new Error(`a key outside the group changed: ${k}`);
}

if (firstRun) fs.writeFileSync(beforeUrl, JSON.stringify(before, null, 2) + "\n");
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
const based = GROUP.filter((k) => drafts[k].base).map((k) => `${k} ← ${drafts[k].base}`);
console.log(`agreed ${GROUP.length} drafts on ${DATE}; wrote ${decisionsWritten} decisions; added ${linksAdded} links to sids that decisions cite`);
if (dropped.length) console.log(`sids that decisions cite and the new form drops, so no link points to them:\n${dropped.join("\n")}`);
console.log(`proposals with a base:\n${based.join("\n")}`);
