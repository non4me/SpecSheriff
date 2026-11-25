// Writes the English that stage 1 added to the new files of the SpecSheriff guidelines and that EngStickler's readers
// have not read yet into english-stage1.md: the owner's rulings from decisions-out-1.json through decisions-out-4.json, the
// section texts from section-purposes.json, the translated todos from todos-en.json and the `of` of the two restored lists.
// It also removes from the `cites` of drafts 1.3.3 and 1.6.1 the sid of the current rule 5.3, which their wording no
// longer cites.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const read = (name) => JSON.parse(fs.readFileSync(new URL(name, here), "utf8"));

const nfPath = new URL("newform.json", here);
const nf = read("newform.json");
for (const k of ["1.3.3", "1.6.1"]) {
  const before = nf[k].cites || [];
  nf[k].cites = before.filter((sid) => sid !== "s-xhcmchcngykvn2k");
  if (nf[k].cites.length === before.length) console.log(`${k}: its cites did not hold s-xhcmchcngykvn2k`);
}
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

const out = ["# The English that stage 1 added", ""];
out.push("## The owner's rulings, by node", "");
for (const i of [1, 2, 3, 4]) {
  for (const [key, list] of Object.entries(read(`decisions-out-${i}.json`))) {
    if (!list.length) continue;
    out.push(`### ${key}`, "");
    for (const d of list) out.push(`- Problem: ${d.problem}`, `  Ruling: ${d.ruling}`);
    out.push("");
  }
}
out.push("## The text of each section", "");
for (const [key, text] of Object.entries(read("section-purposes.json"))) out.push(`- ${key}: ${typeof text === "string" ? text : JSON.stringify(text)}`);
out.push("", "## The todos translated from Russian", "");
const todos = read("todos-en.json");
for (const [key, list] of Object.entries(todos)) for (const t of [].concat(list)) out.push(`### ${key}`, "", typeof t === "string" ? t : t.text, "");
out.push("## The restored lists", "", `- 1.3.1: ${nf["1.3.1"].list.of}`, `- 6.1: ${nf["6.1"].list.of}`, "");
fs.writeFileSync(new URL("english-stage1.md", here), out.join("\n"));
console.log("english-stage1.md written:", out.join(" ").split(/\s+/).length, "words");
