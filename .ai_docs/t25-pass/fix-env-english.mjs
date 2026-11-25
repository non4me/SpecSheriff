// Corrects, without a change of meaning, the English of the agreed "Where the files are" after EngStickler's reader
// read english-tools-1-env.md: the paragraph before the second table names the table, and the reason says who
// recognizes the repository where the SpecSheriff guidelines are written.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const p = drafts["s-zefk589ykh37b8u"].proposal;
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const column = ["at the path in the second column below,", "at the path in the second column of the table below,"];
const part = p.parts.find((x) => x.en.includes(column[0]));
part.en = swap(part.en, ...column);
p.text = swap(p.text, ...column);
p.reason = swap(p.reason,
  "The repository where the SpecSheriff guidelines are written is recognized by an environment variable, so that the settings of every project hold nothing that only that repository needs.",
  "The SpecSheriff tools recognize the repository where the SpecSheriff guidelines are written by an environment variable, so that the settings of every project contain nothing that only that repository needs.");
p.ruReason = swap(p.ruReason,
  "Репозиторий, где пишутся SpecSheriff guidelines, узнаётся по переменной окружения, чтобы",
  "Инструменты SpecSheriff узнают репозиторий, где пишутся SpecSheriff guidelines, по переменной окружения, чтобы");
drafts["s-zefk589ykh37b8u"].englishRead = "EngStickler's reader, 2026-11-21: the English corrected without a change of meaning by fix-tools-1-english.mjs and, for the two additions naming the environment variable, by fix-env-english.mjs";
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const notes = new URL("../t25-one-thought.md", here);
let n = fs.readFileSync(notes, "utf8");
n = swap(n, "- agree-env.mjs wrote english-tools-1-env.md, the English text of the two additions, for EngStickler's reader.",
  "- agree-env.mjs wrote english-tools-1-env.md, the English text of the two additions, for EngStickler's reader. After that reading, fix-env-english.mjs corrected the English without changing its meaning: the paragraph now speaks of \"the second column of the table below\", and the reason now names the SpecSheriff tools as the ones that recognize the repository.");
fs.writeFileSync(notes, n);

const index = new URL("../INDEX.md", here);
let i = fs.readFileSync(index, "utf8");
i = swap(i, "t25-one-thought.before-env.md is the continuation file as it was before agree-env.mjs ran.",
  "t25-one-thought.before-env.md is the continuation file as it was before agree-env.mjs ran. fix-env-english.mjs corrects the English of those additions after EngStickler's reader read it.");
fs.writeFileSync(index, i);
console.log("English corrected");
