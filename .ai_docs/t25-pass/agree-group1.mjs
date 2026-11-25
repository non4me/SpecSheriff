// Records the owner's agreement of 2026-11-24 to group 1 of stage 2 of T25 (items 9 to 19, the checks that
// `sheriff validate` makes) and to option A in both of its questions: «ок», in answer to «Согласны с группой 1 и с
// вариантом А в обоих вопросах?». Marks each of the 24 drafts as agreed and records the agreement in its `rulings`, as
// the other agree-*.mjs scripts do. Turns the proposed decision of rule 8.5 into a `meta.decisions` entry, and writes the
// decision of row 10.1.17, which had no proposed one. Copies tools-drafts.json to tools-drafts.before-agree-group1.json
// first; run again, it rebuilds the group's keys from that copy, so a second run gives the same file.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-agree-group1.json", here);
const firstRun = !fs.existsSync(beforeUrl);
const before = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const DATE = "2026-11-24";
const ANSWER = "«ок», in answer to «Согласны с группой 1 и с вариантом А в обоих вопросах?»";

const GROUP = ["s-stxmhq3hgfndvn6", "new:tools-7-1-location", "s-95w92rnjuv3sst8", "new:tools-7-1-approval-by", "s-agc6fb3vx46pc23",
  "new:tools-7-1-one-header", "new:tools-7-1-link-target", "s-qzyacnqwvaeaps4", "s-pvnnr844f3y964m", "s-e2vdhfsndy5stq9", "s-zhen42p6mnaxu7w",
  "s-qvgzubkrafadqgf", "new:tools-7-1-consumes", "new:tools-7-1-guidelines-to-extension", "s-yprj7d6tnvauggr", "s-6bmnsbskg6en4nf",
  "proposal:s-kag2m9tzdnduxdx", "proposal:domains-header-status", "proposal:11-3-header-status-row", "proposal:row-10-1-8",
  "proposal:s-sn6au3vcr9uy5pm", "proposal:row-10-1-17", "proposal:s-ztseyetus7np6br", "proposal:s-83ev4wwesbwnhnp"];
for (const k of GROUP) {
  if (!before[k]?.proposal) throw new Error(`no draft ${k}`);
  if (before[k].agreed) throw new Error(`${k} is already agreed`);
  drafts[k] = structuredClone(before[k]);
}

for (const k of GROUP) {
  const e = drafts[k];
  e.agreed = DATE;
  e.rulings = [...(e.rulings || []), {
    date: DATE,
    problem: "Whether the owner agrees to group 1 of stage 2 of T25, the checks that `sheriff validate` makes, shown on one page with each node in full, and to option A in both of the group's questions.",
    ruling: `The owner agreed to the group and to option A in both questions (${ANSWER}).`,
    type: "textual",
  }];
}

// Rule 8.5: the proposed decision becomes a decision, naming the option the owner chose.
{
  const e = drafts["proposal:s-kag2m9tzdnduxdx"];
  const pd = e.proposedDecision;
  if (!pd) throw new Error("rule 8.5 has no proposed decision");
  const ruling = pd.ruling.replace("The owner: where", "where").replace("numbered together with the part's other nodes at the top", "numbered together with the part's other top-level nodes");
  if (ruling === pd.ruling) throw new Error("the proposed ruling of rule 8.5 changed");
  e.proposal.meta = { ...(e.proposal.meta || {}), decisions: [...(e.proposal.meta?.decisions || []), {
    date: DATE,
    problem: pd.problem,
    ruling: `The owner chose option A of the question on where a node that a part opens with is located (${ANSWER}): ${ruling}`,
    type: pd.type,
  }] };
  delete e.proposedDecision;
}
// Row 10.1.17: no proposed decision was written, so the decision is written here.
{
  const e = drafts["proposal:row-10-1-17"];
  if (e.proposedDecision || e.proposal.meta?.decisions?.some((d) => d.date === DATE)) throw new Error("row 10.1.17 already holds a decision");
  e.proposal.meta = { ...(e.proposal.meta || {}), decisions: [...(e.proposal.meta?.decisions || []), {
    date: DATE,
    problem: "The row's second sentence, which the owner dictated on 2026-11-13, named abbreviations as an exception, while its criterion and the rule on capital letters refuse three words in capitals in a row, including abbreviations.",
    ruling: `The owner chose option A of the question «${e.question}» (${ANSWER}): abbreviations, constants and special designations are an exception only where there are no more than two of them in a row.`,
    type: "textual",
  }] };
}
// No other proposal of the group holds a proposed decision.
for (const k of GROUP) if (drafts[k].proposedDecision || drafts[k].proposedDecisions) throw new Error(`${k} still holds a proposed decision`);
// A decision cites no node by its sid here, so no link is owed; check it.
for (const k of GROUP) for (const d of drafts[k].proposal.meta?.decisions || []) {
  for (const m of JSON.stringify(d).matchAll(/§(s-[2-9a-hjkmnp-z]{15})/g)) if (!drafts[k].proposal.refs.some((r) => r.to === m[1])) throw new Error(`${k}: a decision cites ${m[1]} without a link`);
}

if (firstRun) fs.writeFileSync(beforeUrl, JSON.stringify(before, null, 2) + "\n");
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(`agreed ${GROUP.length} drafts on ${DATE}`);
