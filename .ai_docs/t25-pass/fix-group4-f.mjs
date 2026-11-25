// T25, stage 2, group 4, round f: the four English-only fixes that EngStickler's readers asked for after reading the sentences
// that round e changed (english-g4e-fast.md, english-g4e-thorough.md). None changes a meaning, so no Russian changes.
// Idempotent: the first run copies tools-drafts.json to tools-drafts.before-group4-f.json, and every run starts from that copy.
// Usage: node fix-group4-f.mjs
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("tools-drafts.json", here);
const backup = new URL("tools-drafts.before-group4-f.json", here);
if (!fs.existsSync(backup)) fs.copyFileSync(file, backup);
let s = fs.readFileSync(backup, "utf8");

const swaps = [
  // Without "both", "the test run" reads as "the test would run"; "while" reads as "at the same time as".
  ["would pass this check and the test run while nothing checks the rule", "would pass both this check and the test run, although nothing checks the rule", 1],
  // "settings set" repeats one word in two senses.
  ["the project-wide settings set a `testCommand`", "the project-wide settings define a `testCommand`", 1],
  // The owner's rule keeps "counts" for counting; «считается» is rendered by "is treated as" here.
  ["counts as listing nothing", "is treated as listing nothing", 2],
  // "named for" reads as "named after".
  ["that is named for that purpose in the description of the language", "that is listed for that purpose in the description of the language", 2],
];
for (const [a, b, n] of swaps) {
  const found = s.split(a).length - 1;
  if (found !== n) throw new Error(`expected ${n} of "${a}", found ${found}`);
  s = s.split(a).join(b);
}
JSON.parse(s);
fs.writeFileSync(file, s);
console.log("round f applied: 4 phrases, 6 places");
