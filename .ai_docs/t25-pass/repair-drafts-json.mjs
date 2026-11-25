// Repairs tools-drafts.json after fix-batch-14.mjs and fix-batch-15.mjs wrote a quoted word into one of its strings
// as plain text, leaving the quotes unescaped.
import fs from "node:fs";

const url = new URL("tools-drafts.json", import.meta.url);
let s = fs.readFileSync(url, "utf8");
const bad = 'consistently uses "refuses" for how';
const good = 'consistently uses \\"refuses\\" for how';
if (!s.includes(bad)) throw new Error("the unescaped quotes are not there");
s = s.replace(bad, good);
JSON.parse(s);
fs.writeFileSync(url, s);
console.log("tools-drafts.json parses again");
