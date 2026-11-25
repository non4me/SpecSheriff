// After accept-proposal.mjs has written the agreed reason of node 1.3.4 into its draft: records the citations of 1.3.4 and
// writes its English to english-1-3-4.md for EngStickler's reader; corrects the English of the agreed 1.3.3 as
// EngStickler's reader found, without changing its meaning; applies the corrections confirmed in EngStickler's batch 12;
// proposes the reason of row 10.1.41 of the main table of checks, moved from the former reason of 10.1 as the owner
// accepted on 2026-11-11; and brings the continuation file, the index and the outline of the queue map up to date.
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
fs.copyFileSync(nfPath, new URL("newform.before-propose-10-1-41-reason.json", here));

// 1.3.4: agreed.
const b = nf["1.3.4"];
if (b.agreed !== "2026-11-20" || b.proposals) throw new Error("accept-proposal.mjs has not run on 1.3.4");
b.cites = sids(b.text, b.reason);
fs.writeFileSync(new URL("english-1-3-4.md", here), [`# ${b.title}`, "", b.text, "", ...(b.examples || []).map(e => `Example: ${e}`), "", `Reason: ${b.reason}`, ""].join("\n"));

// 1.3.3: the English alone.
const a = nf["1.3.3"];
a.text = swap(a.text, "- A rule is approved while an approval stands for its present wording (§s-5ah25f6gy99panq).", "- A rule is approved while an approval of its present wording stands (§s-5ah25f6gy99panq).", "1.3.3 text");
a.reason = swap(a.reason, "Whether the specification is approved decides whether", "Whether the specification is approved determines whether", "1.3.3 reason");
a.reason = swap(a.reason, "would certify words nobody approved.", "would certify wording that nobody approved.", "1.3.3 reason");
a.changes.push("После согласования поправлен английский по отчёту читателя EngStickler («stands for» → «of … stands», «decides» → «determines», «words» → «wording»); смысл и русский текст не менялись.");
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

// Row 10.1.41: the proposed reason.
const tablePath = new URL("table-10-1.json", here);
fs.copyFileSync(tablePath, new URL("table-10-1.before-10-1-41-reason.json", here));
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const r = t.tables.flatMap(g => g.rows).find(x => x.num === "10.1.41");
if (!r || r.reason || r.proposals) throw new Error("row 10.1.41 is missing, or already has a reason or a proposal");
r.proposals = [{
  en: "Reason: An approved rule that is not implemented is reported rather than refused, since a rule is approved before its test and its code are written (§s-rah8b37kytb682y).",
  ru: "Обоснование: Одобренное правило, которое не реализовано, сообщается, а не отклоняется, поскольку правило одобряют до того, как написаны его тест и код (§s-rah8b37kytb682y).",
  why: "Фраза перенесена дословно из прежнего обоснования 10.1, как вы приняли 11 ноября в списке изменений шапки таблицы: объяснение, почему проверка сообщает, а не отклоняет, уходит в обоснование самой проверки. Текст и цена строки не меняются. При переносе строка получит связь cites на s-rah8b37kytb682y.",
}];
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

// The continuation file.
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's decision on the proposed new reason for node 1\.3\.4[^\n]*/m, () =>
  "**The next session starts by** getting the owner's decision on the proposed reason of row 10.1.41 of the main table of checks, held as the proposal in the row in table-10-1.json and written by propose-10-1-41-reason.mjs. The proposed reason is the sentence moved word for word from the former reason of 10.1: an approved rule that is not implemented is reported rather than refused, since a rule is approved before its test and its code are written. Once the owner accepts it, the agent writes it into the row and proposes changes to node s-txbwsthdqhvyzd2 of the appendix of the tools. The list of wordings in the section \"Waiting for the owner\" names the proposals that come next, to be made one at a time.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = swap(c, "The new reason for 1.3.4 is proposed to the owner and waits for the owner's decision;",
  "The owner agreed to the new reason for 1.3.4 on 2026-11-20 («ок»): an approval means that someone accountable for a rule has agreed to what it states or, in the cases that 1.3.6 lists, that an agent has approved the rule on that person's behalf and reported it to them. An EngStickler reader agent read the English text of 1.3.3, and propose-10-1-41-reason.mjs corrected the phrases that the reader had found, without changing the meaning; another reader is reading the English text of 1.3.4, kept in english-1-3-4.md;", "1.3.4 item");
c = swap(c, "Its title and the sentence on the refusal speak of a review that could not be carried out, which that example is not.",
  "Its title and the sentence on the refusal refer to a review that could not be carried out, and that example does not describe such a review.", "found and owed");
c = swap(c, "Fixed the next time 10.5 is changed for another reason.", "It will be fixed the next time 10.5 is changed for another reason.", "found and owed");
c = swap(c, "under which a commit that approves a node of the technical appendix and changes no code would go unreviewed.",
  "under which a commit that approves a node of the technical appendix and changes no code would not be refused when the reviewer gives no readable answer.", "10.5 item");
c = c.replace(/^- the reason of row 10\.1\.41;$/m, () => "- the reason of row 10.1.41, proposed to the owner and waiting for the owner's decision: the sentence moved word for word from the former reason of 10.1;");
if (!c.includes("- the reason of row 10.1.41, proposed to the owner")) throw new Error("the item on row 10.1.41 was not found");
fs.writeFileSync(contPath, c);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "propose-1-3-4.mjs records the owner's agreement to that reason and proposes a new reason for node 1.3.4.",
  "propose-1-3-4.mjs records the owner's agreement to that reason and proposes a new reason for node 1.3.4. propose-10-1-41-reason.mjs records the owner's agreement to the reason of 1.3.4 and proposes the reason of row 10.1.41.", "index");
fs.writeFileSync(indexPath, s);

// The outline of the queue map.
const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o, "### ◐ новое обоснование 1.3.4 «Узел одобряют только его ответственные»\n- одобрение — согласие ответственного или, в случаях из 1.3.6, одобрение агентом от его имени с сообщением ему\n",
  "### ◐ обоснование строки 10.1.41 основной таблицы проверок\n- фраза из прежнего обоснования 10.1, дословно: неисполненное одобренное правило сообщается, а не отклоняется\n", "outline waiting");
o = swap(o, "### ✓ обоснование 1.3.3 — согласовано\n",
  "### ✓ обоснование 1.3.4 — согласовано\n- одобрение — согласие ответственного или, в случаях из 1.3.6, одобрение агентом от его имени с сообщением ему\n\n### ✓ обоснование 1.3.3 — согласовано\n", "outline done");
o = swap(o, "- ● обоснования 1.3.3 и 1.3.4, обоснование 10.1.41, узел описания инструментов об отставании\n",
  "- ✓ обоснования 1.3.3 и 1.3.4\n- ● обоснование строки 10.1.41\n- ○ узел описания инструментов об отставании\n", "outline steps");
fs.writeFileSync(outPath, o);
console.log("row 10.1.41 reason proposed at", now);
