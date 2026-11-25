// Writes the proposal the owner accepted into its draft: node accept-proposal.mjs <key> <date> <note>. The title, text,
// example and reason are read from the proposal's English and Russian blocks, each opening with its label at the start
// of a paragraph; the proposal is removed, the note is added to the draft's `changes`, and the draft is marked agreed
// on the date given.
import fs from "node:fs";

const [key, date, note] = process.argv.slice(2);
if (!key || !/^\d{4}-\d{2}-\d{2}$/.test(date || "") || !note) throw new Error("usage: <key> <date> <note>");
const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL(`newform.before-accept-${key}.json`, import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d[key];
if (!n || !n.proposals || n.proposals.length !== 1) throw new Error(`draft ${key} must hold exactly one proposal`);
const parse = (s, labels) => {
  const re = new RegExp(`(?:^|\\n\\n)(${Object.keys(labels).join("|")}): `, "g");
  const hits = [...s.matchAll(re)];
  const out = {};
  // A label may open several paragraphs, as one example after another; each is kept, in order.
  hits.forEach((m, i) => {
    const from = m.index + m[0].length;
    const to = i + 1 < hits.length ? hits[i + 1].index : s.length;
    (out[labels[m[1]]] ??= []).push(s.slice(from, to));
  });
  for (const k of ["title", "text", "reason"]) if (out[k]) out[k] = out[k].join("\n\n");
  return out;
};
const p = n.proposals[0];
const en = parse(p.en, { Title: "title", Text: "text", Example: "example", Reason: "reason" });
const ru = parse(p.ru, { "Заголовок": "title", "Текст": "text", "Пример": "example", "Обоснование": "reason" });
for (const f of ["title", "text", "reason"]) if (!en[f] || !ru[f]) throw new Error(`proposal of ${key} has no ${f}`);
n.title = en.title;
n.text = en.text;
n.reason = en.reason;
n.ruTitle = ru.title;
n.ruText = ru.text;
n.ruReason = ru.reason;
if (en.example) n.examples = en.example;
if (ru.example) n.ruExamples = ru.example;
delete n.proposals;
n.changes.push(note);
n.agreed = date;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(JSON.stringify({ title: n.title, text: n.text, reason: n.reason, examples: n.examples }, null, 2));
