// After accept-proposal.mjs has written the agreed wording of node 9.2 into its draft: records its ruling and citations
// and writes its English to english-9-2.md for EngStickler's reader; corrects the English of the agreed 10.2 as
// EngStickler's reader found, without changing its meaning; applies the corrections confirmed in batch 34; and brings the
// continuation file, the index and the outline of the queue map up to date: the wordings that followed from the
// grilling session are all agreed, and the next stage moves the drafts into the specification files.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const sids = (...texts) => [...new Set(texts.join("\n").match(/§(s-[2-9a-hj-km-np-z]{15})/g).map(x => x.slice(1)))];

const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
fs.copyFileSync(nfPath, new URL("newform.before-agree-9-2.json", here));

const n = nf["9.2"];
if (n.agreed !== "2026-11-20" || n.proposals) throw new Error("accept-proposal.mjs has not run on 9.2");
n.decisions = [...(n.decisions || []), {
  date: "2026-11-20",
  problem: "The node said \"code of the system outside its tests\" and \"a rule that implements such a rule\", wordings that the owner rejected in row 10.1.41: the system's code includes its tests, and a rule implements nothing.",
  ruling: "The owner: \"code of the system other than tests\", and the `implements` link named instead, counting in one direction only, as in row 10.1.41.",
  type: "wording",
}];
n.cites = sids(n.text, n.reason);
fs.writeFileSync(new URL("english-9-2.md", here), [`# ${n.title}`, "", n.text, "", `Reason: ${n.reason}`, ""].join("\n"));

const b = nf["10.2"];
b.reason = swap(b.reason, "Each check but the tests runs", "Each check except the tests runs", "10.2 reason");
b.text = swap(b.text, "names (§s-qzthyh7yqvfhsa2), over the whole specification and all of the system's code.", "names (§s-qzthyh7yqvfhsa2), run over the whole specification and all of the system's code.", "10.2 text");
b.text = swap(b.text, "After an agent's edit, the SpecSheriff tools report to the agent what the checks refuse.", "After an agent's edit, the SpecSheriff tools tell the agent what the checks refuse.", "10.2 text");
b.text = swap(b.text, "the tests of the system's code and of a project's own checks and generators,", "the tests of the system's code and of the project's own checks and generators,", "10.2 text");
b.changes.push("После согласования поправлен английский по отчёту читателя EngStickler («but» → «except», «run over», «tell the agent», «the project's»); смысл и русский текст не менялись.");
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's decision on the proposed new wording of node 9\.2[^\n]*/m, () =>
  "**The next session starts by** stage 1 of the step that changes the SpecSheriff tools: the drafts in newform.json and in the tables of checks are moved into the specification files, with their `meta.decisions`, and `TableRule` and the `schema` property of a RecordType are added to the schema in `specs/_schema/`. Every wording that followed from the grilling session of 2026-11-19 is now agreed. The two versions of 10.1 are reconciled: the head of the table in table-10-1.json stays as the owner agreed it on 2026-11-11, and the paragraphs of the former reason have found their places, as the last item of the head's list of changes records; the paragraph saying that a check reads the commit being made goes into the reason of the node \"The hooks\" of the appendix of the tools when the owner reviews that node.\n\nThe owner agreed to the new wording of node 9.2 (s-6fw72j65jkqrfpf) on 2026-11-20 («ок»): \"code of the system other than tests\", and the `implements` link named in place of \"a rule that implements such a rule\". The definition of how code and tests are counted through a chain of `implements` links stays in 9.2, its only place. accept-proposal.mjs wrote the wording into the draft, and agree-9-2.mjs recorded the ruling and the nodes that 9.2 cites; an EngStickler reader agent is reading its English text, kept in english-9-2.md.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = swap(c, "the run of the checks before the specification is approved is added to the moments at which the checks run, and 10.2 refers to 10.6 for which checks run then.", "a run of the checks before the specification is approved is added to the moments at which the checks run, and 10.2 refers to 10.6 for the checks that run at that moment.", "b34");
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "propose-9-2.mjs records the owner's agreement to that change and proposes the new wording of 9.2.", "propose-9-2.mjs records the owner's agreement to that change and proposes the new wording of 9.2; agree-9-2.mjs records the owner's agreement to 9.2.", "index");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = o.replace(/## ◐ Ждёт вашего решения\n\n### ◐ 9\.2 «Реализация одобренного правила»\n(?:- [^\n]*\n)+\n/, () => "");
o = swap(o, "### ✓ 10.2: запуск проверок перед одобрением спецификации — согласован\n",
  "### ✓ 9.2 «Реализация одобренного правила» — согласован\n- «помимо тестов»; связь implements вместо «правила, которое реализует»\n\n### ✓ 10.2: запуск проверок перед одобрением спецификации — согласован\n", "outline done");
o = swap(o, "- ● 9.2: те же поправки, что в 10.1.41\n", "- ✓ 9.2: те же поправки, что в 10.1.41\n- ✓ все формулировки, следующие из опроса 19 ноября, согласованы\n- ● перенос черновиков в файлы спецификации\n", "outline steps");
fs.writeFileSync(outPath, o);
console.log("9.2 cites:", n.cites.join(" "));
