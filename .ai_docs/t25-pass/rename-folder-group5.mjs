// Carries out the renaming that the owner's choice of answer A in group 5 of stage 2 of T25 decides (2026-11-24): item 14
// of "Changes still needed outside the group" in group5-notes.md, as fix-brief-group5-agreed.md says.
// In the agreed proposal on rule 8.5 (proposal:s-kag2m9tzdnduxdx) and in the agreed new:tools-7-3-review-appendix
// (s-4bwa4zepd4nwcv8), "a part of the base specification" becomes "a folder of the base specification", the words of the
// agreed "How a node's location is computed" (s-ygg5kpcxgzq3m7w). The words that name the same thing in the same
// sentences follow: "the part's name alone", "the other top-level nodes of the part" and "the name of a part". The
// Russian follows in the right case. Both nodes stay agreed, and each gets a ruling that records the replacement.
// The node's decisions and the draft's question keep their words, since they record what was decided and asked then.
// Copies tools-drafts.json to tools-drafts.before-rename-folder-group5.json on its first run and rebuilds from that copy
// on every run, so that it is idempotent. Each patch fails if it does not find the text it replaces. Writes
// english-rename-folder-group5.md, which lists every English sentence that the renaming changed, under its key.
// Usage: node rename-folder-group5.mjs
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-rename-folder-group5.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const DATE = "2026-11-24";
const KEYS = ["proposal:s-kag2m9tzdnduxdx", "new:tools-7-3-review-appendix"];
const problems = [];

for (const k of KEYS) if (!drafts[k]?.agreed) problems.push(`${k} is not an agreed draft`);

// Each replacement is made in the part that holds it and in the node's text, which is that part's wording rendered.
const rep = (k, partIndex, lang, from, to) => {
  const p = drafts[k].proposal;
  const part = p.parts[partIndex];
  const textField = lang === "en" ? "text" : "ruText";
  for (const [obj, field, where] of [[part, lang, `parts[${partIndex}].${lang}`], [p, textField, textField]]) {
    if (typeof obj?.[field] !== "string" || !obj[field].includes(from)) problems.push(`${k} ${where}: "${from.slice(0, 60)}…" not found`);
    else obj[field] = obj[field].split(from).join(to);
  }
};

// Rule 8.5: the item on a node that opens a part of the base specification, and the paragraph after the list.
{
  const k = "proposal:s-kag2m9tzdnduxdx";
  rep(k, 3, "en", "that a part of the base specification (§s-5x737t9nee4zgaa) opens with, which takes the part's name alone as its location.", "that a folder of the base specification (§s-5x737t9nee4zgaa) opens with, which takes the folder's name alone as its location.");
  rep(k, 3, "ru", "которым открывается часть базовой спецификации (§s-5x737t9nee4zgaa), — узел этого типа, который получает расположением одно имя части.", "которым открывается папка базовой спецификации (§s-5x737t9nee4zgaa), — узел этого типа, который получает расположением одно имя папки.");
  rep(k, 4, "en", "The nodes under a node whose location is the part's name alone are numbered together with the other top-level nodes of the part.", "The nodes under a node whose location is the folder's name alone are numbered together with the other top-level nodes of the folder.");
  rep(k, 4, "ru", "Узлы под узлом, расположение которого — одно имя части, нумеруются вместе с остальными узлами на вершине части.", "Узлы под узлом, расположение которого — одно имя папки, нумеруются вместе с остальными узлами на вершине папки.");
}

// The judgement on a node of the technical appendix: the paragraph on a top-level section of the base specification.
{
  const k = "new:tools-7-3-review-appendix";
  rep(k, 7, "en", "consists of the name of a part, a slash and a single number,", "consists of the name of a folder, a slash and a single number,");
  rep(k, 7, "ru", "состоит из имени части, косой черты и одного числа,", "состоит из имени папки, косой черты и одного числа,");
  rep(k, 7, "en", "are the other rules of the same part of the base specification that are in no section either.", "are the other rules of the same folder of the base specification that are in no section either.");
  rep(k, 7, "ru", "это другие правила той же части базовой спецификации, которые тоже не входят ни в один раздел.", "это другие правила той же папки базовой спецификации, которые тоже не входят ни в один раздел.");
}

// The ruling that records the replacement, once in each node.
for (const k of KEYS) {
  const e = drafts[k];
  e.rulings = (e.rulings || []).filter((r) => !(r.date === DATE && /answer A in group 5/.test(r.ruling)));
  e.rulings.push({
    date: DATE,
    problem: "Whether the words of the node change once the owner has chosen answer A in group 5 of stage 2 of T25, under which \"a part of the base specification\" names a top-level section of `specs/base/` and the contracts section.",
    ruling: "The words \"a part of the base specification\" were replaced by \"a folder of the base specification\", and the words that name the same thing in the same sentences by \"folder\", to carry out the owner's choice of answer A in group 5 («А», 2026-11-24). The node's meaning does not change, so the node stays agreed.",
    type: "textual",
  });
}

// Checks: neither node's wording still names the same thing a part; the text is still the parts' wording; no other key
// changed.
const wording = (p, lang) => [lang === "en" ? p.title : p.ruTitle, lang === "en" ? p.text : p.ruText, lang === "en" ? p.reason : p.ruReason,
  ...p.parts.map((x) => x[lang]), ...(p.examples || []).map((x) => (typeof x === "string" ? x : x[lang]))].filter(Boolean).join("\n");
for (const k of KEYS) {
  const p = drafts[k].proposal;
  const en = wording(p, "en");
  const ru = wording(p, "ru");
  if (/part of the base specification|the part's name alone|top-level nodes of the part|name of a part\b/.test(en)) problems.push(`${k}: the English still names a part of the base specification`);
  if (/част[ьиюей]+ базовой спецификации|одно имя части|вершине части|имени части, косой/.test(ru)) problems.push(`${k}: the Russian still names a part of the base specification`);
  for (const [lang, field] of [["en", "text"], ["ru", "ruText"]]) for (const x of p.parts) if (!p[field].includes(x[lang])) problems.push(`${k}: ${field} does not hold the part "${x[lang].slice(0, 50)}…"`);
  if (!drafts[k].agreed) problems.push(`${k} is no longer agreed`);
}
const others = [...new Set([...Object.keys(before), ...Object.keys(drafts)])].filter((k) => !KEYS.includes(k) && JSON.stringify(before[k]) !== JSON.stringify(drafts[k]));
if (others.length) problems.push(`keys outside the renaming changed: ${others.join(", ")}`);
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-rename-folder-group5.md: every English sentence that the renaming changed, under its key.
const sentences = (s) => String(s ?? "").split("\n").flatMap((l) => l.replace(/^- /, "").split(/(?<=[.;:])\s+(?=[A-Z`])/)).map((x) => x.trim()).filter(Boolean);
const md = [
  "# T25, group 5: the English sentences that the renaming changed",
  "",
  "This file lists every English sentence that rename-folder-group5.mjs changed, as `tools-drafts.json` holds it after the script has run, under the key of its node, for EngStickler's readers.",
  "rename-folder-group5.mjs writes this file; edit the script, not this file.",
  "",
];
for (const k of KEYS) {
  const old = new Set(before[k].proposal.parts.flatMap((x) => sentences(x.en)));
  const now = drafts[k].proposal.parts.flatMap((x) => sentences(x.en)).filter((x) => !old.has(x));
  md.push(`## ${k} — ${drafts[k].proposal.title}`, "", "**Text:**", "", ...now.map((x) => `- ${x}`), "");
}
fs.writeFileSync(new URL("english-rename-folder-group5.md", here), md.join("\n"));
console.log(`renamed in ${KEYS.join(" and ")}; no other key changed`);
