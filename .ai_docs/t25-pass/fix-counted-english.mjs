// Corrects the English of the agreed node "Duplicate sids, terms and names of RecordTypes" (s-vke5hakwf3uyrjs) as
// EngStickler's reader proposed, without changing its meaning.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const backup = JSON.stringify(drafts, null, 2) + "\n";
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const node = drafts["s-vke5hakwf3uyrjs"];
const p = node.proposal;
p.parts[1].en = swap(p.parts[1].en, "holds, a node in a cell of a `TableRule` included (", "holds, including a node in a cell of a `TableRule` (");
p.parts[3].en = "a name that more than one RecordType (§s-7vm323mhry2enx3) has, regardless of letter case (§s-jh85u42agh5k73x), where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s).";
p.parts[3].ru = "имя, которое есть больше чем у одного RecordType (§s-7vm323mhry2enx3), без учёта регистра букв (§s-jh85u42agh5k73x), если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s).";
p.text = render(p.parts, "en");
p.ruText = render(p.parts, "ru");
p.reason = "Nodes that hold the same sid, term or name of a RecordType may be kept in different files, so each duplicate can be found only by reading every node of the specification.";
p.examples[0].en = "A cell of a `TableRule` holds a node whose sid was copied from a rule in another file. `sheriff validate` refuses that sid and names both nodes. The easiest mistake to make is to compare only the nodes outside cells, and such a comparison misses this duplicate.";
node.englishRead = "EngStickler's reader, 2026-11-22: the English corrected without changing its meaning by fix-counted-english.mjs; \"the RecordType extension\" kept, since it is the extension's name";
fs.writeFileSync(new URL("tools-drafts.before-counted-english.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-agree-term-contracts.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-agree-term-contracts.json is a copy of tools-drafts.json made before that script ran). fix-counted-english.mjs corrects the English of \"Duplicate sids, terms and names of RecordTypes\" (tools-drafts.before-counted-english.json is a copy of tools-drafts.json made before that script ran).");
fs.writeFileSync(index, s);
console.log(`updated at ${now}`);
