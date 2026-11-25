// The fresh reviewer of 9.4 with the full checklist (2026-11-11): the English of the text's first sentence
// renders «самого»; the reason's first sentence names what a SpecTag decides (the rules it names, a symbol
// implementing several); the list of changes says that the present 3.4's last sentence goes, by the owner's
// ruling of 2026-11-10 that the SpecTag stays the same rather than names the same node.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-9j2mmnuuwmx5ksn" || b.agreed) throw new Error("unexpected 9.4");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "counts as a change to the test or the code in which it is present.", "counts as a change to the very test or code in which it is present.");
swap("reason", "Tests and code that change are checked against their rule anew.", "Tests and code that change are checked anew against the rules their SpecTags name.");
swap("ruReason", "Изменённые тест и код заново сверяются со своим правилом.", "Изменённые тест и код заново сверяются с правилами, названными в их SpecTag.");
b.changes.push(
  "Ушла последняя фраза нынешнего 3.4: «Rewriting a test's reference to its node into another form that names the same node changes no test». По вашему решению от 10 ноября SpecTag должен оставаться прежним, а не только называть тот же узел, поэтому переписанная форма SpecTag — тоже изменение.",
  "По замечанию рецензента: в английском первой фразы добавлено «very», чтобы передать «самого»; первая фраза обоснования говорит, что тест и код сверяются с правилами, названными в их SpecTag.",
);
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text + "\n" + b.reason + "\n" + b.ruReason);
