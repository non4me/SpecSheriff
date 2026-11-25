// After accept-proposal.mjs has written the agreed change to node 10.2 into its draft: records its ruling and citations;
// corrects the English of the agreed 10.6 as EngStickler's reader found, without changing its meaning; applies the
// corrections confirmed in EngStickler's batch 33; and proposes the new wording of node 9.2 (s-6fw72j65jkqrfpf) that
// follows from the owner's rulings of 2026-11-20 on row 10.1.41: no "outside its tests", and the `implements` link named
// instead of "a rule that implements such a rule".
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
fs.copyFileSync(nfPath, new URL("newform.before-propose-9-2.json", here));

// 10.2: agreed.
const b = nf["10.2"];
if (b.proposals) throw new Error("accept-proposal.mjs has not run on 10.2");
b.decisions = [...(b.decisions || []), {
  date: "2026-11-20",
  problem: "The list of moments at which the checks run did not name the run before the specification is approved, which 10.6 requires.",
  ruling: "The owner: the run before the approval procedure records an approval of the specification is listed, and 10.2 refers to 10.6 for which checks run then.",
  type: "scope",
}];
b.cites = sids(b.text, b.reason);
fs.writeFileSync(new URL("english-10-2.md", here), [`# ${b.title}`, "", b.text, "", `Reason: ${b.reason}`, ""].join("\n"));

// 10.6: the English alone.
const a = nf["10.6"];
a.text = swap(a.text, "It leaves out the review and the checks", "It skips the review and the checks", "10.6 text");
a.reason = swap(a.reason, "The checks at a commit judge only what the commit contains,", "The checks that run at a commit judge only what the commit contains,", "10.6 reason");
a.examples = a.examples.map(e => e.replace("The specification's strict flag is off.", "The specification's `strict` flag is off."));
a.changes.push("После согласования поправлен английский по отчёту читателя EngStickler («leaves out» → «skips», «checks at a commit» → «checks that run at a commit», `strict` в коде); смысл и русский текст не менялись.");

// 9.2: the proposal.
const n = nf["9.2"];
if (n.proposals?.length) throw new Error("9.2 already holds a proposal");
const enText = swap(swap(n.text,
  "- code of the system outside its tests is bound to it (§s-kgbzk2ph9e6jfb4);", "- code of the system other than tests is bound to it (§s-kgbzk2ph9e6jfb4);", "9.2 text"),
  "Code or a test bound to a rule that implements such a rule, directly or through a chain of `implements` links, counts towards the implemented rule.",
  "Code or a test bound to a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to such a rule, directly or through a chain of such links, counts towards that rule.", "9.2 text");
const ruText = swap(swap(n.ruText,
  "- код системы вне его тестов привязан к нему (§s-kgbzk2ph9e6jfb4);", "- код системы помимо тестов привязан к нему (§s-kgbzk2ph9e6jfb4);", "9.2 ruText"),
  "Код или тест, связанные с правилом, которое реализует такое правило напрямую или через цепочку связей `implements`, засчитываются реализуемому правилу.",
  "Код или тест, привязанные к узлу, у которого есть связь `implements` (§s-sn6au3vcr9uy5pm) с таким правилом, напрямую или через цепочку таких связей, засчитываются этому правилу.", "9.2 ruText");
n.proposals = [{
  en: [`Title: ${n.title}`, `Text: ${enText}`, `Reason: ${n.reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, `Обоснование: ${n.ruReason}`].join("\n\n"),
  why: "Следует из ваших решений 20 ноября по строке 10.1.41: «вне его тестов» → «помимо тестов»; вместо «правила, которое реализует такое правило» названа связь implements, засчёт в одну сторону. Смысл не меняется; остальное без изменений.",
}];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

// The continuation file.
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's decision on the proposed change to node 10\.2[^\n]*/m, () =>
  "**The next session starts by** getting the owner's decision on the proposed new wording of node 9.2 (s-6fw72j65jkqrfpf), held as the proposal in the draft of 9.2 in newform.json and written by propose-9-2.mjs. It carries out the owner's rulings of 2026-11-20 on row 10.1.41: \"other than tests\" in place of \"outside its tests\", and the `implements` link named in place of \"a rule that implements such a rule\". The definition of how code and tests are counted through a chain of `implements` links stays in 9.2, its one place: row 10.1.41 restates it as the content of its check, as every row of the table restates what it checks, and 10.4 and 10.1.43a only use it.\n\nThe owner agreed on 2026-11-20 («ок») to the change to node 10.2 that the agreed 10.6 requires: the run of the checks before the specification is approved is added to the moments at which the checks run, and 10.2 refers to 10.6 for which checks run then. accept-proposal.mjs wrote it into the draft of 10.2, and propose-9-2.mjs recorded the ruling and the nodes that 10.2 cites.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = swap(c, "and propose-10-2-approval.mjs added the owner's ruling to the draft's `decisions` and the cited nodes to its `cites`. An EngStickler reader agent is reading its English text, kept in english-10-6.md.",
  "and propose-10-2-approval.mjs added the owner's ruling to the draft's `decisions` and the nodes that it cites to its `cites`. An EngStickler reader agent read its English text, kept in english-10-6.md, and propose-9-2.mjs corrected the phrases that the reader had flagged, without changing their meaning.", "10.6");
c = swap(c, "no check shows tests and code that still lag behind a rule's wording after the specification was a draft,", "no check shows tests and code that still lag behind a rule's wording after the specification stopped being a draft,", "b33");
c = swap(c, "10.6's reason follows its text paragraph by paragraph,", "10.6's reason mirrors its text paragraph by paragraph,", "b33");
fs.writeFileSync(contPath, c);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "propose-10-2-approval.mjs records the owner's agreement to 10.6 and proposes the change to 10.2 that follows from it.",
  "propose-10-2-approval.mjs records the owner's agreement to 10.6 and proposes the change to 10.2 that follows from it; propose-9-2.mjs records the owner's agreement to that change and proposes the new wording of 9.2.", "index");
fs.writeFileSync(indexPath, s);

// The outline of the queue map.
const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = o.replace(/### ◐ 10\.2 «Когда запускаются проверки»: ещё один момент\n(?:- [^\n]*\n)+/, () =>
  "### ◐ 9.2 «Реализация одобренного правила»\n- «вне его тестов» → «помимо тестов»\n- вместо «правило, которое реализует такое правило» — связь implements, засчёт в одну сторону\n");
o = swap(o, "### ✓ 10.6 «Статус одобрения спецификации» — согласован\n",
  "### ✓ 10.2: запуск проверок перед одобрением спецификации — согласован\n\n### ✓ 10.6 «Статус одобрения спецификации» — согласован\n", "outline done");
o = swap(o, "- ● 10.2: запуск проверок перед одобрением спецификации\n- ○ 9.2; одно место для засчёта по цепочке implements (1.5.2)\n",
  "- ✓ 10.2: запуск проверок перед одобрением спецификации\n- ● 9.2: те же поправки, что в 10.1.41\n", "outline steps");
fs.writeFileSync(outPath, o);
console.log(n.proposals[0].ru);
