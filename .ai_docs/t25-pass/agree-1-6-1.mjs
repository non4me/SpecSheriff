// After accept-proposal.mjs has written the agreed wording of node 1.6.1 into its draft: records the rulings it carries
// out in the draft's `decisions` and the nodes its text and reason cite in the draft's `cites`; writes its agreed English
// to english-1-6-1.md for EngStickler's reader; proposes the new wording of node 10.2, which refers to 1.6.1 for what
// the reviewer judges; applies the corrections that EngStickler's reader confirmed in batch 1; and brings the
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

// 1.6.1: the rulings and the citations.
const a = nf["1.6.1"];
if (a.agreed !== "2026-11-20" || a.proposals) throw new Error("accept-proposal.mjs has not run on 1.6.1");
a.decisions = [
  ...(a.decisions || []),
  {
    date: "2026-11-19",
    problem: "Who verifies a commit message's statement that a rule's implementation needs no change.",
    ruling: "The owner: the independent reviewer verifies it, and the principle on deterministic checks is extended to say so.",
    type: "scope",
  },
  {
    date: "2026-11-19",
    problem: "Who checks a node of the technical appendix that an agent approved on an owner's behalf.",
    ruling: "The owner: the independent reviewer checks it, in the commit in which the node is approved, whoever approved it.",
    type: "scope",
  },
];
a.cites = [...new Set([a.text, a.reason].join("\n").match(/§(s-[2-9a-hj-km-np-z]{15})/g).map(x => x.slice(1)))];
const english = [
  `# ${a.title}`, "", a.text, "", ...(a.examples || []).flatMap(e => [`Example: ${e}`, ""]), `Reason: ${a.reason}`, "",
].join("\n");
fs.writeFileSync(new URL("english-1-6-1.md", here), english);

// 10.2: the proposal.
const b = nf["10.2"];
if (b.sidValue !== "s-epaw9sgyaajzn8g") throw new Error("10.2 is not s-epaw9sgyaajzn8g");
if (b.proposals?.length) throw new Error("10.2 already holds a proposal");
let enText = swap(b.text, "- on a commit: every check in those tables except the tests and the review of the code;", "- on a commit: every check in those tables except the tests and the review;", "10.2 text");
enText = swap(enText,
  "- on a commit that changes code: also the review of that code, in which an independent reviewer judges whether the code does what the rules it names say, and nothing that they do not say (§s-nyh9yk22ba6g77q);",
  "- on a commit for which the list of the reviewer's judgements (§s-m4h279nbaqkpa3t) names at least one judgement: also the review, in which an independent reviewer makes every judgement that the list names for that commit;",
  "10.2 text");
let ruText = swap(b.ruText, "- при коммите — каждая проверка из этих таблиц, кроме тестов и ревью кода;", "- при коммите — каждая проверка из этих таблиц, кроме тестов и ревью;", "10.2 ruText");
ruText = swap(ruText,
  "- при коммите, меняющем код, — ещё и ревью этого кода: независимый рецензент судит, делает ли код то, что говорят названные им правила, и ничего сверх этого (§s-nyh9yk22ba6g77q);",
  "- при коммите, для которого перечень суждений рецензента (§s-m4h279nbaqkpa3t) называет хотя бы одно суждение, — ещё и ревью, в котором независимый рецензент выносит каждое суждение, названное в перечне для этого коммита;",
  "10.2 ruText");
fs.copyFileSync(nfPath, new URL("newform.before-propose-10-2.json", here));
b.proposals = [{
  en: [`Title: ${b.title}`, `Text: ${enText}`, `Reason: ${b.reason}`].join("\n\n"),
  ru: [`Заголовок: ${b.ruTitle}`, `Текст: ${ruText}`, `Обоснование: ${b.ruReason}`].join("\n\n"),
  why: [
    "Следует из согласованного 1.6.1: рецензент судит не только код.",
    "«кроме тестов и ревью кода» → «кроме тестов и ревью».",
    "Ревью запускается при любом коммите, для которого перечень суждений рецензента в 1.6.1 называет хотя бы одно суждение, а не только при коммите, меняющем код.",
    "Что судит рецензент, 10.2 больше не повторяет: это перечислено в 1.6.1. Ссылка на 10.4 в этом пункте заменена ссылкой на 1.6.1; при переносе узел получит связь cites на 1.6.1 вместо 10.4.",
  ].join(" "),
}];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

// The continuation file.
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's decision on the proposed new wording of node 1\.6\.1[^\n]*/m, () =>
  "**The next session starts by** getting the owner's decision on the proposed new wording of node 10.2 (s-epaw9sgyaajzn8g), held as the proposal in the draft of 10.2 in newform.json and written by agree-1-6-1.mjs. In the proposed wording, the review runs on every commit for which the list of the reviewer's judgements in 1.6.1 names at least one judgement, and 10.2 no longer repeats what the reviewer judges. Once the owner accepts the wording, accept-proposal.mjs writes it into the draft. The list of wordings in the section \"Waiting for the owner\" names the proposals that follow, to be made one at a time.");
c = swap(c, "**The page of the base specification** is now https://", "**The page of the base specification** is now at https://", "page address");
c = swap(c, "so that it never has to read the whole page.", "so that it never has to read page.js, which holds nearly all of the page.", "page reading");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = swap(c,
  "The agent proposes the other wordings that follow from the grilling session, one at a time:\n- node 1.6.1, proposed to the owner and waiting for the owner's decision, and then node 10.2: both have the reviewer judge only a commit that changes code. The proposal for 10.2 is to refer to 1.6.1 for what the reviewer judges, rather than repeat it, so that the judgements are stated in one node;",
  "The owner agreed to the new wording of node 1.6.1 (s-m4h279nbaqkpa3t) on 2026-11-20 («ок»). In that wording, the paragraph on the reviewer lists the reviewer's three judgements, as the agreed principle \"Deterministic checks hold every participant to the contract\" and node 10.4 do. accept-proposal.mjs wrote the agreed wording into the draft of 1.6.1, and agree-1-6-1.mjs added the owner's rulings to its `decisions` and the nodes that its text and reason cite to its `cites`. An EngStickler reader agent reads the agreed English text of 1.6.1, kept in english-1-6-1.md, in the background.\n\nThe agent is proposing, one at a time, the wordings that follow from the grilling session and are not yet agreed:\n- node 10.2, proposed to the owner and waiting for the owner's decision. Its agreed wording still runs the review only on a commit that changes code. In the proposed wording, 10.2 refers to 1.6.1 for what the reviewer judges, rather than repeating the judgements, so that they are stated in one node;",
  "continuation list");
fs.writeFileSync(contPath, c);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "propose-1-6-1.mjs proposes the new wording of node 1.6.1, in which the reviewer makes three judgements.",
  "propose-1-6-1.mjs proposes the new wording of node 1.6.1, which lists the reviewer's three judgements. agree-1-6-1.mjs records the owner's agreement to it, writes its agreed English to english-1-6-1.md and proposes the new wording of node 10.2.", "index 1.6.1");
s = swap(s, "published at 5wK7HgU4higmsDkgSZtdX3; step-propose-1-6-1.mjs records that step in the continuation file and here.",
  "published as the artifact 5wK7HgU4higmsDkgSZtdX3; step-propose-1-6-1.mjs records the proposal of 1.6.1 and the page's new address in the continuation file and in this index.", "index page");
s = swap(s, "as it was on 19 and 20 November.", "as it was before 20 November.", "index outline");
fs.writeFileSync(indexPath, s);

// The outline of the queue map.
const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o,
  "### ◐ новая формулировка 1.6.1 «Что держат проверки и когда они запускаются»\n- абзац о рецензенте — списком из трёх суждений, как в принципе и в 10.4\n- «кроме ревью кода» → «кроме ревью»; обоснование называет все три вопроса\n",
  "### ◐ новая формулировка 10.2 «Когда запускаются проверки»\n- ревью — при любом коммите, к которому относится хотя бы одно суждение рецензента из 1.6.1\n- что судит рецензент, 10.2 не повторяет, а ссылается на 1.6.1\n", "outline waiting");
o = swap(o, "### ✓ оба принципа закоммичены и отправлены (a0718a9)\n",
  "### ✓ оба принципа закоммичены и отправлены (a0718a9)\n\n### ✓ узел 1.6.1 — согласован\n- абзац о рецензенте — списком из трёх суждений, как в принципе и в 10.4\n- «кроме ревью кода» → «кроме ревью»; обоснование называет все три вопроса\n", "outline done");
o = swap(o, "- ● 1.6.1: рецензент — не только на коммите с кодом\n- ○ 10.2: то же в перечне моментов запуска проверок\n",
  "- ✓ 1.6.1: рецензент — не только на коммите с кодом\n- ● 10.2: то же в перечне моментов запуска проверок\n", "outline steps");
fs.writeFileSync(outPath, o);

console.log("1.6.1 cites:", a.cites.join(" "));
console.log(b.proposals[0].en);
console.log("\n----\n");
console.log(b.proposals[0].ru);
