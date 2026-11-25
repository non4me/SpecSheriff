// Records in the continuation file and .ai_docs/INDEX.md the page that draws the design of how a change is checked.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const a = "the agent now draws the design on a page and compares each decision with established practice in a matrix, before any wording is proposed.";
if (!c.includes(a)) throw new Error("design paragraph not found");
c = c.replace(a, "the agent drew the design on the page change-check-design.html (https://claude.ai/artifact/D1pWHkY9z1VJQ3n9x7aeaQ) and compared each decision with established practice in a matrix there, before any wording is proposed.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "grill-change-11.mjs records the owner's answer to the eighth question and the end of the grilling.";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, b + " change-check-design.html is the page that draws how the checks treat a commit that changes a rule, its tests or its code, and compares the nine decisions of the grilling with established practice; state-design-page.mjs records its address.");
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
