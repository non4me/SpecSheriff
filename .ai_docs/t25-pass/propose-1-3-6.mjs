// Proposes the new wording of node 1.3.6 (s-t5uw8zfxzhfdg86), which follows from the sixth and eighth questions of the
// grilling session of 2026-11-19: an agent also approves on an owner's behalf a node of the technical appendix that it
// wrote while implementing an approved rule of the base specification. The draft has been through the wording checker,
// the rule reviewer and EngStickler's reader. Applies the corrections the reader confirmed in batch 24.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const en = {
  title: "What an agent approves on an owner's behalf",
  text: [
    "An agent working for one of a node's owners approves the node on that owner's behalf in each of the following cases, and only in those:",
    "",
    "- the node's wording changes only to state what one of its owners approved in another node;",
    "- the node's wording changes only through a replacement that does not change its meaning, such as a renamed term or path;",
    "- the node belongs to the technical appendix (§s-qmmzf9nksfsa3qp), and:",
    "  - the agent wrote the node while implementing a rule of the base specification;",
    "  - the node has an `implements` link (§s-sn6au3vcr9uy5pm) to that rule;",
    "  - that rule is approved.",
    "",
    "The agent reports each of these approvals to the owner on whose behalf it made it.",
  ].join("\n"),
  example: "While implementing an approved rule that an idle session expires, the agent adds a node of the technical appendix that sets the limit at 30 minutes and has an `implements` link to that rule. The agent approves the node on the owner's behalf and reports it. But not: the agent approves in the same way a node it adds to the section on the stack, which implements no rule.",
  reason: "An owner's approval is worth waiting for only where a wording states something new that nothing else checks. A wording that restates an approved one, or does not change the meaning, states nothing new. What a node of the technical appendix adds to the rule it implements is checked by the independent reviewer in the commit in which the node is approved (§s-nyh9yk22ba6g77q). The agent's report tells the owner of each such approval, so that the owner can withdraw one they disagree with (§s-fpq35tf3pehgk64).",
};
const ru = {
  title: "Что агент одобряет от имени ответственного",
  text: [
    "Агент, работающий на одного из ответственных за узел, одобряет узел от имени этого ответственного в каждом из следующих случаев, и только в них:",
    "",
    "- формулировка узла меняется только для того, чтобы сказать то, что один из ответственных за узел одобрил в другом узле;",
    "- формулировка узла меняется только заменой, которая не меняет её смысла, например переименованием термина или пути;",
    "- узел входит в техническое приложение (§s-qmmzf9nksfsa3qp), и при этом:",
    "  - агент написал узел, когда реализовывал правило базовой спецификации;",
    "  - у узла есть связь `implements` (§s-sn6au3vcr9uy5pm) с этим правилом;",
    "  - это правило одобрено.",
    "",
    "О каждом таком одобрении агент сообщает ответственному, от имени которого его сделал.",
  ].join("\n"),
  example: "Реализуя одобренное правило о том, что простаивающая сессия истекает, агент добавляет узел технического приложения, который задаёт предел в 30 минут и имеет связь `implements` с этим правилом. Агент одобряет узел от имени ответственного и сообщает об этом. Но не так: агент так же одобряет узел, который добавил в раздел стека и который не реализует ни одного правила.",
  reason: "Одобрения ответственного стоит ждать только там, где формулировка говорит новое, чего ничто другое не проверяет. Формулировка, которая повторяет одобренную или не меняет смысла, нового не говорит. То, что узел технического приложения добавляет к реализуемому правилу, проверяет независимый рецензент в коммите, где узел одобрен (§s-nyh9yk22ba6g77q). Сообщение агента говорит ответственному о каждом таком одобрении, чтобы ответственный мог отозвать то, с которым не согласен (§s-fpq35tf3pehgk64).",
};

const nfPath = new URL("newform.json", here);
fs.copyFileSync(nfPath, new URL("newform.before-propose-1-3-6.json", here));
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
const n = nf["1.3.6"];
if (!n) throw new Error("no draft 1.3.6");
n.proposals = [{
  en: [`Title: ${en.title}`, `Text: ${en.text}`, `Example: ${en.example}`, `Reason: ${en.reason}`].join("\n\n"),
  ru: [`Заголовок: ${ru.title}`, `Текст: ${ru.text}`, `Пример: ${ru.example}`, `Обоснование: ${ru.reason}`].join("\n\n"),
  why: "Следует из шестого и восьмого вопросов опроса 19 ноября и из принципа «Nothing unapproved is implemented» в согласованной вами формулировке. Добавлен третий случай: узел технического приложения, который агент написал, реализуя одобренное правило базы, со связью implements на это правило. Список стал исчерпывающим («и только в них»). Технические термины ссылаются на узлы, где они определены. Обоснование переписано: в чём смысл ждать одобрения ответственного и почему здесь ждать нечего. Фраза «агент, работающий на ответственного, уже действует от его имени» убрана, она повторяла текст. Добавлен пример.",
}];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const top = /\*\*If the session is interrupted, the next session starts by\*\*[^\n]*/.exec(c)[0];
c = c.replace(top, "**If the session is interrupted, the next session starts by** getting the owner's decision on the proposed wording of node 1.3.6 (s-t5uw8zfxzhfdg86), which the draft of 1.3.6 in newform.json holds as its proposal.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n## ", from + head.length);
c = c.slice(0, from) + head + [
  "The owner agreed to the whole new wording of the principle \"Deterministic checks hold every participant to the contract\": to its list of the reviewer's judgements on 2026-11-19 («ок»), and to its first paragraph, split into a list, on 2026-11-20 («ок»). The owner also agreed to the new wording of the principle \"Nothing unapproved is implemented\" on 2026-11-20 («ок»). That wording adds the case that follows from the sixth and eighth questions of the grilling session, and splits into separate sentences the clauses that semicolons joined. After the owner agreed, the agent made three changes that keep the meaning:",
  "- \"where:\" became \"in each of these cases:\";",
  "- a rule's owners are now said to be named by the nearest section or domain above it that names owners;",
  "- \"default owners, one or more\" became \"one or more default owners\".",
  "",
  "The agent wrote all of these into docs/principles.md. The commit that closes the session states the owner's decisions in its message, since a decision on a principle is kept only in the commit message.",
  "",
  "The agent has proposed to the owner the new wording of node 1.3.6 (s-t5uw8zfxzhfdg86), and is waiting for the owner's decision. The draft of 1.3.6 in newform.json holds it as its proposal, written by propose-1-3-6.mjs. It adds a third case: a node of the technical appendix that the agent wrote while implementing an approved rule of the base specification, and that has an `implements` link to that rule. The wording checker, the rule reviewer and EngStickler's reader checked the draft before it was shown to the owner. The agent dropped \"or changed\" from the third case, since the principle speaks only of a node the agent writes.",
  "",
  "After the owner's decision on node 1.3.6, the agent will propose the other wordings that follow from the grilling session, one at a time:",
  "- node 10.4 (s-nyh9yk22ba6g77q): the reviewer is also given a node of the technical appendix approved in the commit, and the rules of the base specification it must not contradict;",
  "- nodes 1.6.1 and 10.2, which have the reviewer judge only a commit that changes code;",
  "- node 10.5, under which a commit that approves a node of the technical appendix and changes no code would go unreviewed;",
  "- the reasons of 1.3.3 and 1.3.4, which say that an approval means that an owner agreed, and do not hold for a node approved under the third case of 1.3.6;",
  "- the reason of row 10.1.41;",
  "- node s-txbwsthdqhvyzd2 of the appendix of the tools.",
  "",
  "Five texts outside the specification restate what the two principles said before their new wording. They are brought into line with the new wording in the stage that updates the skills and the guides:",
  "- docs/README.md, in the paragraph on the checks;",
  "- the article _promo/articles/no-code-without-a-rule.md, in its section \"One judgement, by an independent reviewer\";",
  "- picture 2, _promo/images/html/2-what-stops-bad-code.html, and its entry in the table in _promo/images/README.md;",
  "- CLAUDE.md, in the \"Status\" item of the \"Editing the specification\" section, which names a purely technical replacement as the only approval the agent makes on the owner's behalf;",
  "- the spec-review skill, wherever it says which approvals the agent makes on the owner's behalf.",
  "",
].join("\n") + c.slice(to);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "agree-principle-unapproved.mjs records the owner's agreement to the new wording of the principle \"Nothing unapproved is implemented\".";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, b + " propose-1-3-6.mjs proposes the new wording of node 1.3.6, on what an agent approves on an owner's behalf.");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
const a = "- ● сейчас: третий случай — узел приложения со связью implements к одобренному правилу базы; черновик проверяют рецензенты\n- ○ затем, по одной: 10.4, обоснование 10.1.41, узел описания инструментов об отставании";
if (!o.includes(a)) throw new Error("outline text not found");
o = o.replace(a, "- ● сейчас: третий случай — узел приложения со связью implements к одобренному правилу базы, написанный агентом при реализации\n- ○ затем, по одной: 10.4, 1.6.1 и 10.2, 10.5, обоснования 1.3.3 и 1.3.4, обоснование 10.1.41, узел описания инструментов об отставании");
fs.writeFileSync(outPath, o);
console.log("proposed at", now);
