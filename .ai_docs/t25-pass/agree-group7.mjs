// Records the owner's agreement of 2026-11-25 to group 7 of stage 2 of T25 (items 51 to 56, with the seven proposals to
// change agreed nodes that the group holds): «А.», in answer to «Согласны с группой 7 и с вариантом А в обоих
// вопросах?». Marks each draft of the group as agreed and records the agreement in the draft's `rulings`, as
// agree-group6.mjs does. Turns each decision that the group proposes into a decision in the `meta.decisions` of the draft
// or proposal that holds it, and records the owner's answers to the group's two questions:
// - Q1, option A, on the two drafts that say how a node with no title is shown and named;
// - Q2, option A, on the two drafts whose commands refuse to run without the Views extension, and on the group's proposal
//   on the agreed draft "The commands that `sheriff` accepts", whose doubt about the Views extension that answer settles
//   and this script removes from the agreed draft.
// Where such a decision cites a node that the draft has no link to, adds a `cites` link from the draft to that node.
// Copies tools-drafts.json to tools-drafts.before-agree-group7.json first. When the script is run again, it rebuilds the
// group's keys, and the agreed draft whose doubt it removes, from that copy, so a second run gives the same file.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-agree-group7.json", here);
const firstRun = !fs.existsSync(beforeUrl);
const before = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const drafts = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const DATE = "2026-11-25";
const ANSWER = "«А.», in answer to «Согласны с группой 7 и с вариантом А в обоих вопросах?»";

// The keys of the group are those that group7-assessments.json assesses, the same keys that the group's page shows.
const GROUP = Object.keys(JSON.parse(fs.readFileSync(new URL("group7-assessments.json", here), "utf8")));
if (GROUP.length !== 18) throw new Error(`group 7 has ${GROUP.length} keys, not 18`);
for (const k of GROUP) {
  if (!before[k]?.proposal) throw new Error(`no draft ${k}`);
  if (before[k].agreed) throw new Error(`${k} is already agreed`);
}
// The agreed draft whose doubt the answer to Q2 settles, and the group's proposal on it.
const COMMANDS = "s-f5rz6b7dhxejjts";
const COMMANDS_PROPOSAL = "proposal:s-f5rz6b7dhxejjts-g7";
if (!before[COMMANDS]?.agreed || !/Views extension/.test(before[COMMANDS].doubt || "")) throw new Error(`${COMMANDS}: no agreed draft with a doubt about the Views extension`);
if (before[COMMANDS_PROPOSAL]?.base !== COMMANDS) throw new Error(`${COMMANDS_PROPOSAL} is not the group's proposal on ${COMMANDS}`);

// The owner's two answers, each recorded on the drafts that say what it settles.
const Q1 = (rule, sid, what) => ({
  date: DATE,
  problem: `A node in a cell of a \`TableRule\` (s-5fewsp22mmdz7y6) has no title. ${rule} (${sid}) ${what}, and did not say how a node that has no title is shown and named.`,
  ruling: `The owner chose option A of the first question of group 7 (${ANSWER}): a node with no title is labelled with its location, and is named by its sid and location in a link and in the list of gathered values.`,
  type: "textual",
});
const Q2_RULING = `The owner chose option A of the second question of group 7 (${ANSWER}): \`sheriff markdown\` and \`sheriff map\` refuse to run where the project has not chosen the Views extension, and the refusal names the extension. Under that answer, the hooks run the two commands only where the project has chosen the Views extension; "The hooks", item 57 of the order of review, is to say so.`;
const Q2 = (problem) => ({ date: DATE, problem, ruling: Q2_RULING, type: "textual" });
const ANSWERS = {
  "s-k4nqjr96ux7a5m7": [Q1("Rule 13.1", "s-ce24ynwabt5yx8h", "has the export and `sheriff show` name the node at the other end of a link by its sid, location and title")],
  "s-rpv4fkdqqguptqd": [
    Q1("Rule 13.2", "s-zu8ne3wq84zchc4", "has the map show each node's title"),
    Q2("“Where the files are” (s-zefk589ykh37b8u) gives `specs/_viewer/` only to a project that has chosen the Views extension (s-qgg6sfawtmwvrbb), and nothing said what `sheriff map` does in any other project."),
  ],
  "new:tools-5-export": [
    Q2("“Where the files are” (s-zefk589ykh37b8u) gives `md-version/` only to a project that has chosen the Views extension (s-qgg6sfawtmwvrbb), and nothing said what `sheriff markdown` does in any other project."),
  ],
  [COMMANDS_PROPOSAL]: [
    Q2("The agreed list of commands recorded as a doubt whether `sheriff markdown` and `sheriff map`, described by s-e3495enbc5h75c3 and s-rpv4fkdqqguptqd, write only where the project has chosen the Views extension, and what they do elsewhere."),
  ],
};
for (const k of Object.keys(ANSWERS)) if (!GROUP.includes(k)) throw new Error(`${k} is not in group 7`);

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
    problem: "Whether the owner agrees to group 7 of stage 2 of T25, items 51 to 56 and the seven proposals to change agreed nodes that the group holds, shown on one page with each node in full, and to option A in both of the group's questions.",
    ruling: `The owner agreed to the group and to option A in both questions (${ANSWER}).`,
    type: "textual",
  }];
  const proposed = [...(e.proposedDecision ? [e.proposedDecision] : []), ...(e.proposedDecisions || [])];
  const answers = ANSWERS[k] || [];
  if (proposed.length || answers.length) {
    e.proposal.meta = { ...(e.proposal.meta || {}), decisions: [...(e.proposal.meta?.decisions || [])] };
    for (const pd of proposed) {
      e.proposal.meta.decisions.push({
        date: DATE,
        problem: pd.problem,
        ruling: `The owner agreed to group 7 (${ANSWER}), which carries this out: ${pd.ruling.replace(/^The owner: /, "")}`,
        type: pd.type,
      });
      decisionsWritten++;
    }
    for (const a of answers) {
      e.proposal.meta.decisions.push(a);
      decisionsWritten++;
    }
    delete e.proposedDecision;
    delete e.proposedDecisions;
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
// The answer to Q2 settles the doubt that the agreed list of commands records; the decision is in the group's proposal.
{
  const e = structuredClone(before[COMMANDS]);
  delete e.doubt;
  drafts[COMMANDS] = e;
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
  if (k === COMMANDS) {
    const { doubt, ...rest } = before[k];
    if (JSON.stringify(rest) !== JSON.stringify(drafts[k])) throw new Error(`${k} changed beyond the removal of its doubt`);
    continue;
  }
  if (JSON.stringify(before[k]) !== JSON.stringify(drafts[k])) throw new Error(`a key outside the group changed: ${k}`);
}

if (firstRun) fs.writeFileSync(beforeUrl, JSON.stringify(before, null, 2) + "\n");
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(`agreed ${GROUP.length} drafts on ${DATE}; wrote ${decisionsWritten} decisions; added ${linksAdded} links to sids that decisions cite; removed the doubt of ${COMMANDS}`);
if (dropped.length) console.log(`sids that decisions cite and no node holds, so no link points to them:\n${dropped.join("\n")}`);
