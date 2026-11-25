// After the English fixes, two of the recurring groups were applied only where a reviewer met them: the part named
// "contracts" (now "the contracts section") and the moments of the checks (now "on a commit", "on a push"). Brings the
// remaining places of the drafts and the table to the same words, so one thing keeps one name. The Russian, the quoted
// example in 7.12 and every node's agreement stay as they are.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const drafts = read("newform.json");
const table = read("table-10-1.json");
const rows = Object.fromEntries(table.tables.flatMap((g) => g.rows).filter((r) => r.num).map((r) => [r.num, r]));
const swaps = [
  [drafts["12.2.1"], "text", "it consists of contracts and those domains", "it consists of the contracts section and those domains"],
  [drafts["12.2.1"], "text", "Contracts is the part of the base speci", "The contracts section is the part of the base speci"],
  [drafts["12.2.1"], "text", "That place is contracts, since it belongs to no domai", "That place is the contracts section, since it belongs to no domai"],
  [drafts["12.2.2"], "text", "each domain, contracts, the technical appendix", "each domain, the contracts section, the technical appendix"],
  [drafts["12.3.1"], "text", "no such domain is declared in contracts", "no such domain is declared in the contracts section"],
  [drafts["12.3.1"], "reason", "A RecordType of contracts has no single provider", "A RecordType of the contracts section has no single provider"],
  [rows["10.1.6"], "en", "Every term node is in contracts", "Every term node is in the contracts section"],
  [drafts["10.2"], "text", "- at a commit: every check", "- on a commit: every check"],
  [drafts["10.2"], "text", "- at a commit that changes code:", "- on a commit that changes code:"],
  [drafts["10.2"], "text", "- at a push: the tests", "- on a push: the tests"],
];
const failed = [];
for (const [obj, key, from, to] of swaps) {
  const field = ["text", "reason", "title"].includes(key) || key === "en" ? key : key;
  const hits = obj && typeof obj[field] === "string" ? obj[field].split(from).length - 1 : 0;
  if (hits !== 1) { failed.push(`${from} (${hits})`); continue; }
  obj[field] = obj[field].replace(from, to);
}
fs.writeFileSync(new URL("newform.json", here), JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("table-10-1.json", here), JSON.stringify(table, null, 2) + "\n");
console.log("harmonized", swaps.length - failed.length, "failed", failed.length);
for (const f of failed) console.log("  NOT PLACED:", f);
