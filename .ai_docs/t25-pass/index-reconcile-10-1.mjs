// Refreshes .ai_docs/INDEX.md after the reconciliation of 10.1 began: the rows of the continuation file and
// of t25-pass/, with the scripts written for it, and the index's own timestamp.
import fs from "node:fs";
const path = new URL("../INDEX.md", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
let s = fs.readFileSync(path, "utf8");

s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);

const added = " reconcile-10-1.mjs reconciles the two versions of 10.1: the head of the main table of checks stays, and the paragraphs of the old reason move into the reasons of the checks they explain, starting with the proposal for row 10.1.40; table-10-1.before-reconcile.json keeps the table as it was. state-10-1-40.mjs records that state in the queue outline, and state-reconcile-10-1.mjs records it in the continuation file. index-reconcile-10-1.mjs refreshes this index.";
const row = s.split("\n").findIndex((l) => l.startsWith("| t25-pass/ |"));
if (row < 0) throw new Error("t25-pass row not found");
const lines = s.split("\n");
let l = lines[row].replace(/^\| t25-pass\/ \| [^|]+ \|/, `| t25-pass/ | ${now} |`);
if (!l.includes("reconcile-10-1.mjs")) l = l.replace(/ \|$/, `${added} |`);
lines[row] = l;
fs.writeFileSync(path, lines.join("\n"));
console.log("INDEX.md refreshed at", now);
