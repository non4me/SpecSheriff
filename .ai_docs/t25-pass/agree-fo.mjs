// Marks the follow-on drafts as agreed on the owner's behalf.
// Each of them only carries out a decision the owner made on 2026-11-25 on the questions about the base specification,
// as its `question` field says. The reviewer found each draft ready after round c of fixes, and EngStickler's reader read
// the English that round c added. The rule in .claude/vt/rules.md on a change that carries out a decision therefore
// has the agent agree to each draft on the owner's behalf and report it in one line.
// The script keeps a copy of the drafts as tools-drafts.before-agree-fo.json, and a second run changes nothing.
import fs from "node:fs";

const dir = "D:/SpecSheriff/.ai_docs/t25-pass/";
const file = dir + "tools-drafts.json";
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const DATE = "2026-11-25";
const keys = Object.keys(d).filter((k) => !d[k].agreed && (k.endsWith("-bq") || k.startsWith("new:tools-7-1-")));
if (keys.length !== 23) throw new Error(`expected 23 follow-on drafts, found ${keys.length}: ${keys.join(", ")}`);
if (!fs.existsSync(dir + "tools-drafts.before-agree-fo.json")) fs.copyFileSync(file, dir + "tools-drafts.before-agree-fo.json");
for (const k of keys) {
  const v = d[k];
  const carries = (v.question || "").replace(/^None: /, "");
  if (!carries.startsWith("carries out")) throw new Error(`${k}: its question field does not name the decision it carries out`);
  v.agreed = DATE;
  v.rulings = [...(v.rulings || []), {
    date: DATE,
    problem: "Whether a draft that only carries out the owner's answers on the questions about the base specification is shown to the owner before it is agreed.",
    ruling: `The draft ${carries.replace(/\.$/, "")}. The reviewer found it ready after round c of fixes, so it is agreed on the owner's behalf and reported to the owner in one line.`,
  }];
}
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(keys.length, "drafts agreed:", keys.join(", "));
