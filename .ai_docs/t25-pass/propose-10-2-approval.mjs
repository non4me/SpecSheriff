// After accept-proposal.mjs has written the agreed wording of node 10.6 into its draft: records its ruling and its
// citations, writes its English to english-10-6.md for EngStickler's reader, and proposes the change to node 10.2 that
// follows from it: the run of the checks before the specification is approved joins the moments at which the checks run.
// Applies the corrections that EngStickler's reader confirmed in batch 32, and brings the continuation file, the index and
// the outline of the queue map up to date.
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
fs.copyFileSync(nfPath, new URL("newform.before-propose-10-2-approval.json", here));

// 10.6: agreed.
const a = nf["10.6"];
if (a.agreed !== "2026-11-20" || a.proposals) throw new Error("accept-proposal.mjs has not run on 10.6");
a.decisions = [...(a.decisions || []), {
  date: "2026-11-20",
  problem: "The approval procedure was to show what the checks report on the specification and the code, but the checks read only each commit and report nothing about an incomplete implementation while the specification is a draft.",
  ruling: "The owner: before recording an approval, the procedure runs every check except the review and the checks that need a commit message or a run of the tests, as if the specification were approved and one commit added the whole specification and all of the system's code, and shows the owner what they find.",
  type: "scope",
}];
a.cites = sids(a.text, a.reason);
fs.writeFileSync(new URL("english-10-6.md", here), [`# ${a.title}`, "", a.text, "", ...(a.examples || []).map(e => `Example: ${e}`), "", `Reason: ${a.reason}`, ""].join("\n"));

// 10.2: the proposal.
const b = nf["10.2"];
if (b.proposals?.length) throw new Error("10.2 already holds a proposal");
const enText = swap(b.text, "as long as the specification has the status `approved`.\n\nAfter an agent's edit,",
  "as long as the specification has the status `approved`;\n- before the approval procedure records an approval of the specification: the checks that the rule on the specification's approval status names (§s-qzthyh7yqvfhsa2), over the whole specification and all of the system's code.\n\nAfter an agent's edit,", "10.2 text");
const ruText = swap(b.ruText, "пока спецификация имеет статус `approved`.\n\nПосле правки агента",
  "пока спецификация имеет статус `approved`;\n- до того как процедура одобрения запишет одобрение спецификации, — проверки, которые называет правило о статусе одобрения спецификации (§s-qzthyh7yqvfhsa2), по всей спецификации и всему коду системы.\n\nПосле правки агента", "10.2 ruText");
b.proposals = [{
  en: [`Title: ${b.title}`, `Text: ${enText}`, `Reason: ${b.reason}`].join("\n\n"),
  ru: [`Заголовок: ${b.ruTitle}`, `Текст: ${ruText}`, `Обоснование: ${b.ruReason}`].join("\n\n"),
  why: "Следует из согласованного 10.6: перед одобрением спецификации процедура запускает проверки по всей спецификации и всему коду. Этот момент добавлен в перечень последним пунктом; какие проверки запускаются, говорит 10.6, и 10.2 на него ссылается. Остальное без изменений.",
}];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

// The continuation file.
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's decision on the proposed new wording of node 10\.6[^\n]*/m, () =>
  "**The next session starts by** getting the owner's decision on the proposed change to node 10.2 (s-epaw9sgyaajzn8g), held as the proposal in the draft of 10.2 in newform.json and written by propose-10-2-approval.mjs: the run of the checks before the specification is approved joins the moments at which the checks run, as the agreed 10.6 requires.\n\nThe owner agreed to the new wording of node 10.6 (s-qzthyh7yqvfhsa2) on 2026-11-20 («ок»). It says that, before the specification is approved, the approval procedure runs every check except the review and the checks that need a commit message or a run of the tests, as if the specification were approved and one commit added the whole specification and all of the system's code, and shows the owner what they find. accept-proposal.mjs wrote it into the draft of 10.6, and propose-10-2-approval.mjs added the owner's ruling to the draft's `decisions` and the cited nodes to its `cites`. An EngStickler reader agent is reading its English text, kept in english-10-6.md. The rule reviewer's further findings on 10.6: the node \"The hooks\" (s-477gtdrkw34dzxw) of the appendix of the tools is to say what the checks read in that run; no check shows tests and code that still lag behind a rule's wording after the specification was a draft, at approval or later, since no deterministic check judges by meaning whether they lag; 10.6's reason follows its text paragraph by paragraph, a structure that the agreed reason already had.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and propose-10-6.mjs proposes its new wording after the rule reviewer's report.",
  "and propose-10-6.mjs proposes its new wording in light of the rule reviewer's report; propose-10-2-approval.mjs records the owner's agreement to 10.6 and proposes the change to 10.2 that follows from it.", "index");
fs.writeFileSync(indexPath, s);

// The outline of the queue map.
const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = o.replace(/### ◐ 10\.6 «Статус одобрения спецификации»\n(?:- [^\n]*\n)+/, () =>
  "### ◐ 10.2 «Когда запускаются проверки»: ещё один момент\n- перед одобрением спецификации — проверки, которые называет 10.6, по всей спецификации и всему коду\n");
o = swap(o, "### ✓ проверки кода и тестов в черновике спецификации (ваше решение)\n",
  "### ✓ 10.6 «Статус одобрения спецификации» — согласован\n- перед одобрением процедура запускает проверки по всему, как будто спецификация одобрена, и показывает найденное\n\n### ✓ проверки кода и тестов в черновике спецификации (ваше решение)\n", "outline done");
o = swap(o, "- ● 10.6: что показывают перед одобрением спецификации\n", "- ✓ 10.6: что показывают перед одобрением спецификации\n- ● 10.2: запуск проверок перед одобрением спецификации\n", "outline steps");
fs.writeFileSync(outPath, o);
console.log("10.6 cites:", a.cites.join(" "));
