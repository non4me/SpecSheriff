// Node 7.2.3, the proposal of fix-newform-382.mjs, after the wording checker. The second paragraph stated a condition
// and a contrast in one sentence, and its "rather than a general word" said what a rule does not do; the first
// paragraph already speaks of general words, so the paragraph keeps the condition and what the rule does. "means" could
// read as "signifies", so it says "refers to".
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-383.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.3"], t = d["7.2.3~"], p = n.proposals[0];
const pairs = [
  ["Where a rule means a particular thing, it names that thing rather than a general word for it.", "Where a rule refers to a particular thing, it names that thing."],
  ["Где правило имеет в виду конкретную вещь, оно называет эту вещь, а не общее слово для неё.", "Где правило имеет в виду конкретную вещь, оно называет эту вещь."],
];
for (const [a, b] of pairs) {
  if (![p.en, p.ru, p.why].some((s) => s.includes(a))) throw new Error("not found: " + a);
  p.en = p.en.replace(a, b);
  p.ru = p.ru.replace(a, b);
  p.why = p.why.replace(a, b);
  t.text = t.text.replace(a, b);
  t.ruText = t.ruText.replace(a, b);
}
const note = "теперь условие названо: правило имеет в виду конкретную вещь.";
if (!p.why.includes(note)) throw new Error("note not found");
p.why = p.why.replace(note, note + " Слова «а не общее слово для неё» ушли: они говорили, чего правило не делает, а об общих словах уже говорит первый абзац.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(p.en.split("\n\n").slice(1, 4).join("\n\n"));
