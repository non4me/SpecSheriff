// Records the owner's agreement of 2026-11-24 to group 2 of stage 2 of T25 (items 20 to 26: the reviewer's check of a
// commit, and the SpecTag in code and in tests): «согласен», in answer to «Согласны с группой 2?». Marks each of the 26
// drafts as agreed and records the agreement in its `rulings`, as agree-group1.mjs does. The group raised no question
// for the owner, so no decision is written. Copies tools-drafts.json to tools-drafts.before-agree-group2.json first;
// run again, it rebuilds the group's keys from that copy, so a second run gives the same file.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-agree-group2.json", here);
const firstRun = !fs.existsSync(beforeUrl);
const before = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const DATE = "2026-11-24";
const ANSWER = "«согласен», in answer to «Согласны с группой 2?»";

// The keys of the group are those that group2-assessments.json assesses, the same keys that the group's page shows.
const GROUP = Object.keys(JSON.parse(fs.readFileSync(new URL("group2-assessments.json", here), "utf8")));
if (GROUP.length !== 26) throw new Error(`group 2 has ${GROUP.length} keys, not 26`);
for (const k of GROUP) {
  if (!before[k]?.proposal) throw new Error(`no draft ${k}`);
  if (before[k].agreed) throw new Error(`${k} is already agreed`);
  if (before[k].proposedDecision || before[k].proposedDecisions) throw new Error(`${k} holds a proposed decision`);
  drafts[k] = structuredClone(before[k]);
}

for (const k of GROUP) {
  const e = drafts[k];
  e.agreed = DATE;
  e.rulings = [...(e.rulings || []), {
    date: DATE,
    problem: "Whether the owner agrees to group 2 of stage 2 of T25, the reviewer's check of a commit and the SpecTag in code and in tests, shown on one page with each node in full.",
    ruling: `The owner agreed to the group (${ANSWER}).`,
    type: "textual",
  }];
}

if (firstRun) fs.writeFileSync(beforeUrl, JSON.stringify(before, null, 2) + "\n");
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(`agreed ${GROUP.length} drafts on ${DATE}`);
