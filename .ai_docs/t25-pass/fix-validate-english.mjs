// Applies the corrections that EngStickler's reader found in the English of the agreed node "Validation against the
// schema before a command works on the files", none of which changes its meaning, keeps the Russian rendering in step,
// and rewrites english-validate.md. Corrections that would break a term the appendix of the tools uses throughout,
// such as "refuses", "pointing at", "beside a field" and "a key written twice", are not taken.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-validate-english.json", here), JSON.stringify(drafts, null, 2) + "\n");
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const node = drafts["new:tools-7-1-validate"];
const v = node.proposal;
const at = (start) => {
  const i = v.parts.findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`no part starts with: ${start}`);
  return i;
};

const first = v.parts[at("`sheriff validate`, `sheriff binding` and `sheriff reindex` validate each file")];
first.en = swap(first.en, "validate each file of a part of the specification that the repository keeps (§s-emrfpzw2d5bgb6x).",
  "validate each file of a part of the specification, if the repository keeps that file (§s-emrfpzw2d5bgb6x).");
first.ru = swap(first.ru, "проверяют каждый файл части спецификации, который хранит репозиторий (§s-emrfpzw2d5bgb6x).",
  "проверяют каждый файл части спецификации, если этот файл хранит репозиторий (§s-emrfpzw2d5bgb6x).");
const leave = v.parts[at("Before that validation")];
leave.en = swap(leave.en, "It leaves out of the validation only what it writes itself:", "It excludes from the validation only what it writes itself:");
const sidAt = at("the sid that it gives a node");
v.parts.splice(sidAt, 1,
  { kind: "li", en: "the sid that it gives a node;", ru: "sid, который он даёт узлу;", change: v.parts[sidAt].change },
  { kind: "li", en: "every location (§s-kag2m9tzdnduxdx);", ru: "каждое расположение (§s-kag2m9tzdnduxdx);", change: "Как было." });
const status = v.parts[at("the status of a section")];
status.en = swap(status.en, "the status of a section", "the approval status of a section");
status.ru = swap(status.ru, "статус раздела", "статус одобрения раздела");
const last = v.parts[at("Where the SpecSheriff tools refuse")];
last.en = swap(last.en, "Each of them then stops. `sheriff reindex` then leaves every file as it was.", "Each of these commands then stops, and `sheriff reindex` leaves every file unchanged.");
last.ru = swap(last.ru, "После этого каждая из них останавливается. `sheriff reindex` тогда оставляет каждый файл как был.", "После этого каждая из этих команд останавливается, а `sheriff reindex` оставляет каждый файл без изменений.");
v.text = render(v.parts, "en");
v.ruText = render(v.parts, "ru");

v.reason = swap(v.reason, "Each command is written for the shape that the schema gives a file. Only a validation against the schema names where a file departs from that shape and what is wrong there.",
  "Each command relies on the structure that the schema defines for a file. Only validation against the schema shows where a file departs from that structure and what is wrong there.");
v.reason = swap(v.reason, "would leave the files disagreeing with one another.", "would leave the files inconsistent with one another.");
v.reason = swap(v.reason, "What `sheriff reindex` writes itself is left out, since a node written by hand receives it only when the command runs.",
  "What `sheriff reindex` writes itself is excluded from the validation, since a node written by hand receives it only when `sheriff reindex` runs.");
v.ruReason = swap(v.ruReason, "Каждая команда написана для того вида файла, который задаёт схема. Только проверка по схеме называет, где файл отступает от этого вида и что там не так.",
  "Каждая команда опирается на структуру, которую схема задаёт для файла. Только проверка по схеме показывает, где файл отступает от этой структуры и что там не так.");
node.englishRead = "EngStickler's reader, 2026-11-21: the English corrected without a change of meaning by fix-validate-english.mjs; \"refuses\", \"pointing at\", \"beside a field\", \"a key written twice\", \"composed\" and \"changes what an earlier release wrote\" kept, since the appendix of the tools and the agreed nodes use them throughout";
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-validate.md", here), [
  "# \"Validation against the schema before a command works on the files\", a new node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", v.title, "", "## Text", "", v.text, "", "## Reason", "", v.reason, ""
].join("\n"));
console.log(v.text + "\n\n" + v.reason);
