// Node 7.1, after the third pass of the wording checker: the permission to use the core vocabulary says what a node
// may do, and joins the sentence that gives its cause, instead of saying what a node need not do.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-352.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.1"];
const core = "node, sid, rule, title, text, reason, link, citation, section, specification, guidelines, owner, draft, approved";
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};
n.text = swap(n.text,
  `Every reader is given the definitions of the core vocabulary: ${core}. A node may use these terms without explaining them.`,
  `Every reader is given the definitions of the core vocabulary, so a node may use its terms as they stand: ${core}.`);
n.ruText = swap(n.ruText,
  `Каждому читателю даны определения базового словаря: ${core}. Узел может употреблять эти термины, не объясняя их.`,
  `Каждому читателю даны определения базового словаря, поэтому узел может употреблять его термины как есть: ${core}.`);
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
