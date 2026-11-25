// Records the owner's agreement of 2026-11-24 to group 4 of stage 2 of T25 (items 33 to 40, row 10.1.37a and the proposals
// on rule 10.12, row 10.1.41 and `new:tools-1-project`): «А», in answer to the question about merge commits, which said
// that an answer of A with no remark on the nodes also agrees to the whole group. Marks each draft of the group as agreed
// and records the agreement in its `rulings`, as agree-group3.mjs does. Records the owner's choice of answer A as a
// decision of the two nodes whose paragraph on merge commits depends on it. Turns each proposed decision of the group into a
// decision in its proposal's `meta.decisions`, and gives every sid that a decision cites a `cites` link where the node
// lacks one. Copies tools-drafts.json to tools-drafts.before-agree-group4.json first; run again, it rebuilds the group's
// keys from that copy, so a second run gives the same file.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-agree-group4.json", here);
const firstRun = !fs.existsSync(beforeUrl);
const before = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const drafts = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const DATE = "2026-11-24";
const ANSWER = "«А», in answer to «Выбираете А? Если да и замечаний к узлам нет, этим же ответом вы согласуете всю группу 4.»";

// The keys of the group are those that group4-assessments.json assesses, the same keys that the group's page shows.
const MERGE_KEYS = ["s-qqs2svksmjct753", "s-txbwsthdqhvyzd2"];
const GROUP = Object.keys(JSON.parse(fs.readFileSync(new URL("group4-assessments.json", here), "utf8")));
if (GROUP.length !== 12) throw new Error(`group 4 has ${GROUP.length} keys, not 12`);
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
    problem: "Whether the owner agrees to group 4 of stage 2 of T25, items 33 to 40, row 10.1.37a and the proposals on rule 10.12, row 10.1.41 and `new:tools-1-project`, shown on one page with each node in full.",
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
        ruling: `The owner agreed to group 4 (${ANSWER}), which carries this out: ${ruling}`,
        type: pd.type,
      });
      decisionsWritten++;
    }
    delete e.proposedDecision;
    delete e.proposedDecisions;
  }
  // The owner's choice of answer A on merge commits, recorded in the two nodes whose paragraph on merge commits carries it.
  if (MERGE_KEYS.includes(k)) {
    e.proposal.meta = { ...(e.proposal.meta || {}), decisions: [...(e.proposal.meta?.decisions || [])] };
    e.proposal.meta.decisions.push({
      date: DATE,
      problem: "Under the agreed node on what a commit changes (s-2x58az67bm6cxq2), a merge commit is compared with its first parent. The message of a merge would then have to name every node bound to the code that the merge brings in and repeat every trailer of the merged commits, and git's default message would almost always be refused.",
      ruling: `The owner chose answer A (${ANSWER}): for a merge commit, sheriff commit-message considers only what the merge changes relative to every one of its parents, since each merged commit was checked when it was made.`,
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
