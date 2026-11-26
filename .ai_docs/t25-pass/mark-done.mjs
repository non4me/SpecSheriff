// Marks stage-3 notes as carried out: node mark-done.mjs "<what carried it out>" <key> [<key> ...]
// Writes `stage3Done` = { date, by } on each draft of tools-drafts.json, keeping the file's formatting.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const file = join(dirname(fileURLToPath(import.meta.url)), "tools-drafts.json");
const [by, ...keys] = process.argv.slice(2);
if (!by || !keys.length) throw new Error('usage: node mark-done.mjs "<what carried it out>" <key> ...');
const drafts = JSON.parse(readFileSync(file, "utf8"));
const date = new Date().toISOString().slice(0, 10);
for (const key of keys) {
  const d = drafts[key];
  if (!d?.stage3) throw new Error(`${key}: no draft with a stage-3 note`);
  d.stage3Done = { date, by };
  console.log(`marked ${key}`);
}
writeFileSync(file, JSON.stringify(drafts, null, 2) + "\n");
