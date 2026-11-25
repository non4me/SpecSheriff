// After accept-proposal.mjs has written the agreed reason of node 1.3.3 into its draft: records its citations and writes
// its English to english-1-3-3.md for EngStickler's reader; corrects the English of the agreed 10.5 as EngStickler's
// reader found, without changing its meaning, and writes down the defect the reader found in 10.5's examples; proposes
// the new reason of node 1.3.4 (s-67vekyup7y8smap); and brings the continuation file, the index and the outline of the
// queue map up to date.
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
fs.copyFileSync(nfPath, new URL("newform.before-propose-1-3-4.json", here));

// 1.3.3: agreed.
const a = nf["1.3.3"];
if (a.agreed !== "2026-11-20" || a.proposals) throw new Error("accept-proposal.mjs has not run on 1.3.3");
a.cites = sids(a.text, a.reason);
fs.writeFileSync(new URL("english-1-3-3.md", here), [`# ${a.title}`, "", a.text, "", `Reason: ${a.reason}`, ""].join("\n"));

// 10.5: the English alone.
const f = nf["10.5"];
f.examples = f.examples.map(e => e === "The answer passes the commit but names a finding." ? "The answer passes the commit but reports a finding." : e);
if (!f.examples.includes("The answer passes the commit but reports a finding.")) throw new Error("10.5's last example was not found");
f.reason = swap(f.reason, "A review that passes whenever it could not be carried out", "A review that lets a commit through whenever it could not be carried out", "10.5 reason");
f.changes.push("После согласования поправлен английский по второму отчёту читателя EngStickler («names a finding» → «reports a finding», «passes» → «lets a commit through»); смысл и русский текст не менялись.");
fs.writeFileSync(new URL("english-10-5.md", here), [`# ${f.title}`, "", f.text, "", ...f.examples.map(e => `Example: ${e}`), "", `Reason: ${f.reason}`, ""].join("\n"));

// 1.3.4: the proposal.
const n = nf["1.3.4"];
if (n.sidValue !== "s-67vekyup7y8smap") throw new Error("1.3.4 is not s-67vekyup7y8smap");
if (n.proposals?.length) throw new Error("1.3.4 already holds a proposal");
const enReason = swap(n.reason, "An approval means that someone accountable for a rule has agreed to what it states, so it is theirs to give.",
  "An approval means that someone accountable for a rule has agreed to what it states or, in the cases that §s-t5uw8zfxzhfdg86 lists, that an agent has approved the rule on that person's behalf and reported it to them. So it is theirs to give.", "1.3.4 reason");
const ruReason = swap(n.ruReason, "Одобрение означает, что тот, кто отвечает за правило, согласился с тем, что оно утверждает, поэтому давать его — дело этого человека.",
  "Одобрение означает, что тот, кто отвечает за правило, согласился с тем, что оно утверждает, или, в случаях, которые перечисляет §s-t5uw8zfxzhfdg86, что агент одобрил правило от имени этого человека и сообщил ему об этом. Поэтому давать его — дело этого человека.", "1.3.4 ruReason");
n.proposals = [{
  en: [`Title: ${n.title}`, `Text: ${n.text}`, ...(n.examples || []).map(e => `Example: ${e}`), `Reason: ${enReason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${n.ruText}`, ...(n.ruExamples || []).map(e => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Следует из согласованного 1.3.6, как и новое обоснование 1.3.3: одобрение означает согласие ответственного или, в случаях из 1.3.6, одобрение агентом от его имени с сообщением ему. Первая фраза обоснования разделена на две. Текст и пример не меняются.",
}];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

// The continuation file.
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's decision on the proposed new reason of node 1\.3\.3[^\n]*/m, () =>
  "**The next session starts by** getting the owner's decision on the proposed new reason of node 1.3.4 (s-67vekyup7y8smap), held as the proposal in the draft of 1.3.4 in newform.json and written by propose-1-3-4.mjs. In the proposed reason, an approval means that an owner has agreed to what the rule states or, in the cases that 1.3.6 lists, that an agent has approved the rule on the owner's behalf and reported it to them. Once the owner accepts it, accept-proposal.mjs writes it into the draft. The list of wordings in the section \"Waiting for the owner\" names the proposals that come next, to be made one at a time.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = swap(c, "The new reason of 1.3.3 is proposed to the owner and waits for the owner's decision; the new reason of 1.3.4 follows;",
  "The owner agreed to the new reason of 1.3.3 on 2026-11-20 («ок»): the status `approved` claims that the rule's present wording was approved by one of its owners or, as 1.3.6 allows, by an agent on an owner's behalf. An EngStickler reader agent is reading its English text, kept in english-1-3-3.md. The new reason of 1.3.4 is proposed to the owner and waits for the owner's decision;", "1.3.3 item");
c = swap(c, "An EngStickler reader agent is reading its English text, kept in english-10-5.md;",
  "An EngStickler reader agent read its English text, kept in english-10-5.md, and propose-1-3-4.mjs corrected the phrases that the reader had found, without changing the meaning;", "10.5 item");
c = swap(c, "## Found and owed\n\n",
  "## Found and owed\n\n- 10.5 (s-94k7b6r5kf65udf), agreed: its text lets through a commit whenever the reviewer gives an answer that the SpecSheriff tools can read, while its last example, \"The answer passes the commit but reports a finding\", describes a readable answer on which the commit is refused. Its title and the sentence on the refusal speak of a review that could not be carried out, which that example is not. EngStickler's reader found this on 2026-11-20, after the owner had agreed to 10.5. Fixed the next time 10.5 is changed for another reason.\n", "found and owed");
fs.writeFileSync(contPath, c);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "propose-1-3-3.mjs records the owner's agreement to 10.5 and proposes the new reason of node 1.3.3.",
  "propose-1-3-3.mjs records the owner's agreement to 10.5 and proposes the new reason of node 1.3.3. propose-1-3-4.mjs records the owner's agreement to that reason and proposes the new reason of node 1.3.4.", "index");
fs.writeFileSync(indexPath, s);

// The outline of the queue map.
const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o, "### ◐ новое обоснование 1.3.3 «Когда статус — одобрено»\n- статус «одобрено» утверждает, что формулировку одобрил ответственный или, как позволяет 1.3.6, агент от его имени\n",
  "### ◐ новое обоснование 1.3.4 «Узел одобряют только его ответственные»\n- одобрение — согласие ответственного или, в случаях из 1.3.6, одобрение агентом от его имени с сообщением ему\n", "outline waiting");
o = swap(o, "### ✓ узел 10.5 — согласован\n",
  "### ✓ обоснование 1.3.3 — согласовано\n- статус «одобрено» утверждает, что формулировку одобрил ответственный или, как позволяет 1.3.6, агент от его имени\n\n### ✓ узел 10.5 — согласован\n", "outline done");
fs.writeFileSync(outPath, o);
console.log(n.proposals[0].ru);
