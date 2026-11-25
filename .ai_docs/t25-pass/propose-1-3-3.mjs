// After accept-proposal.mjs has written the agreed wording of node 10.5 into its draft: records the owner's ruling and
// the citations of 10.5, and corrects its English as EngStickler's reader found, without changing its meaning; applies
// the corrections confirmed in EngStickler's batch 10; proposes the new wording of the reason of node 1.3.3
// (s-9g7jj8z4yf9kq93), whose last paragraph said that the status `approved` claims that an owner agreed, which does not
// hold for a node that an agent approves on an owner's behalf under the third case of 1.3.6; and brings the
// continuation file, the index and the outline of the queue map up to date.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
fs.copyFileSync(nfPath, new URL("newform.before-propose-1-3-3.json", here));

// 10.5: agreed.
const f = nf["10.5"];
if (f.agreed !== "2026-11-20" || f.proposals) throw new Error("accept-proposal.mjs has not run on 10.5");
f.text = swap(f.text, "refuse a commit on which the reviewer must make", "refuse a commit for which the reviewer must make", "10.5 text");
f.decisions = [...(f.decisions || []), {
  date: "2026-11-20",
  problem: "Whether a commit that changes no code is refused when the reviewer gives no answer that the SpecSheriff tools can read.",
  ruling: "The owner: yes, whenever the reviewer must make at least one of the judgements that 1.6.1 lists for the commit, not only when the commit changes code.",
  type: "scope",
}];
f.cites = [...new Set([f.text, f.reason].join("\n").match(/§(s-[2-9a-hj-km-np-z]{15})/g).map(x => x.slice(1)))];
f.changes.push("После согласования поправлен английский по отчёту читателя EngStickler («on which» → «for which»); смысл и русский текст не менялись.");
fs.writeFileSync(new URL("english-10-5.md", here), [`# ${f.title}`, "", f.text, "", ...f.examples.map(e => `Example: ${e}`), "", `Reason: ${f.reason}`, ""].join("\n"));

// 1.3.3: the proposal.
const n = nf["1.3.3"];
if (n.sidValue !== "s-9g7jj8z4yf9kq93") throw new Error("1.3.3 is not s-9g7jj8z4yf9kq93");
if (n.proposals?.length) throw new Error("1.3.3 already holds a proposal");
const enReason = swap(n.reason, "The status `approved` claims that one of a rule's owners agreed to what the rule now states.",
  "The status `approved` claims that the rule's present wording was approved by one of its owners or, as §s-t5uw8zfxzhfdg86 allows, by an agent on an owner's behalf.", "1.3.3 reason");
const ruReason = swap(n.ruReason, "Статус «одобрено» утверждает, что один из ответственных за правило согласился с тем, что оно теперь говорит.",
  "Статус «одобрено» утверждает, что нынешнюю формулировку правила одобрил один из ответственных за него или, как позволяет §s-t5uw8zfxzhfdg86, агент от имени ответственного.", "1.3.3 ruReason");
n.proposals = [{
  en: [`Title: ${n.title}`, `Text: ${n.text}`, `Reason: ${enReason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${n.ruText}`, `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Следует из согласованного 1.3.6: агент одобряет узел приложения от имени ответственного, и тот с узлом не соглашался. Последний абзац обоснования говорил, что статус «одобрено» утверждает согласие ответственного; теперь — что формулировку одобрил ответственный или, как позволяет 1.3.6, агент от его имени. Текст не меняется.",
}];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

// The continuation file.
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's decision on the proposed new wording of node 10\.5[^\n]*/m, () =>
  "**The next session starts by** getting the owner's decision on the proposed new reason of node 1.3.3 (s-9g7jj8z4yf9kq93), held as the proposal in the draft of 1.3.3 in newform.json and written by propose-1-3-3.mjs. In the proposed reason, the status `approved` claims that the rule's present wording was approved by one of its owners or, as 1.3.6 allows, by an agent on an owner's behalf. Once the owner accepts it, accept-proposal.mjs writes it into the draft, and the agent proposes the new reason of node 1.3.4. The list of wordings in the section \"Waiting for the owner\" names the proposals that come next, to be made one at a time.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = c.replace(/^- node 10\.5, under which a commit that approves a node of the technical appendix and changes no code would go unreviewed\.[^\n]*$/m, () =>
  "- node 10.5, under which a commit that approves a node of the technical appendix and changes no code would go unreviewed. The owner agreed to its new wording on 2026-11-20 («ок»): the SpecSheriff tools refuse a commit for which the reviewer must make at least one judgement unless the reviewer gives an answer that the tools can read. accept-proposal.mjs wrote the agreed wording into the draft of 10.5, and propose-1-3-3.mjs added the owner's ruling to the draft's `decisions`, added to the draft's `cites` the nodes that its text cites, and corrected its English. An EngStickler reader agent is reading its English text, kept in english-10-5.md;");
if (!c.includes("The owner agreed to its new wording on 2026-11-20 («ок»): the SpecSheriff tools refuse a commit for which")) throw new Error("the item on node 10.5 was not found");
c = c.replace(/^- the reasons in 1\.3\.3 and 1\.3\.4, [^\n]*$/m, (m) => m.replace(/;$/, ". The new reason of 1.3.3 is proposed to the owner and waits for the owner's decision; the new reason of 1.3.4 follows;"));
if (!c.includes("The new reason of 1.3.3 is proposed to the owner")) throw new Error("the item on 1.3.3 and 1.3.4 was not found");
fs.writeFileSync(contPath, c);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "propose-10-5.mjs records the owner's agreement to that row and proposes the new wording of node 10.5.",
  "propose-10-5.mjs records the owner's agreement to that row and proposes the new wording of node 10.5. propose-1-3-3.mjs records the owner's agreement to 10.5 and proposes the new reason of node 1.3.3.", "index");
fs.writeFileSync(indexPath, s);

// The outline of the queue map.
const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o, "### ◐ новая формулировка 10.5 «Коммит, рецензию которого нельзя провести, отклоняется»\n- отклоняется любой коммит, по которому рецензент должен вынести суждение, а не только коммит с кодом\n",
  "### ◐ новое обоснование 1.3.3 «Когда статус — одобрено»\n- статус «одобрено» утверждает, что формулировку одобрил ответственный или, как позволяет 1.3.6, агент от его имени\n", "outline waiting");
o = swap(o, "### ✓ строка 10.1.25a основной таблицы проверок — согласована\n",
  "### ✓ узел 10.5 — согласован\n- отклоняется любой коммит, по которому рецензент должен вынести суждение, если ответа рецензента нет\n\n### ✓ строка 10.1.25a основной таблицы проверок — согласована\n", "outline done");
o = swap(o, "- ● 10.5: ответ рецензента нужен и для коммита без кода\n- ○ обоснования 1.3.3 и 1.3.4,",
  "- ✓ 10.5: ответ рецензента нужен и для коммита без кода\n- ● обоснования 1.3.3 и 1.3.4,", "outline steps");
fs.writeFileSync(outPath, o);
console.log("10.5 cites:", f.cites.join(" "));
console.log(n.proposals[0].ru);
