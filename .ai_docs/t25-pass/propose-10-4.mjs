// Proposes the new wording of node 10.4 (s-nyh9yk22ba6g77q), "What the reviewer is given", which follows from the new
// list of the reviewer's judgements in the principle "Deterministic checks hold every participant to the contract". The
// draft has been through the wording checker and the rule reviewer. Also applies to the agreed 1.3.6 the corrections
// EngStickler's reader confirmed in its English, none of which changes its meaning, and the corrections of batch 26.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const en = {
  title: "What the reviewer is given",
  text: [
    "The SpecSheriff tools give the independent reviewer of a commit the following:",
    "",
    "- the commit's message;",
    "- the commit's change, less the files generated from the specification;",
    "- the wording of each rule or term that the commit's message names;",
    "- the wording of each rule to which a SpecTag (§s-8xw4mgvpexyvw5q) binds code that the commit adds or changes, not counting the tests;",
    "- for each rule whose implementation, according to the commit's message, needs no change: the rule's wording as it was before the commit and as it is after it, and the tests and the code bound to the rule, directly or through a chain of `implements` links, as they are after it;",
    "- for each node of the technical appendix (§s-qmmzf9nksfsa3qp) that is approved in the commit and has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification:",
    "  - the node's wording;",
    "  - the wording of each rule of the base specification that the node implements, that has a link to or from such a rule, or that is in the same top-level section of the base specification as such a rule.",
    "",
    "A node's wording here is its title, its text, its reason, its examples and the fields its kind adds, as an approval covers them (§s-5ah25f6gy99panq).",
    "",
    "The SpecSheriff tools give the reviewer nothing from the session in which the change was made. They tell the reviewer that each file left out of the change is generated from the specification. The reviewer treats what a rule requires of generated code as carried out by that code.",
  ].join("\n"),
  reason: "The reviewer makes the judgements that no deterministic check can make: whether code does only what its rules say, whether a rule's implementation really needs no change, and whether an approved node of the technical appendix agrees with the base specification. It can judge only from what it is shown. Shown what each judgement needs, and nothing of what the author of the change meant, it judges by the rules alone.",
};
const ru = {
  title: "Что получает рецензент",
  text: [
    "Инструменты SpecSheriff передают независимому рецензенту коммита следующее:",
    "",
    "- сообщение коммита;",
    "- изменение коммита, кроме файлов, сгенерированных из спецификации;",
    "- формулировку каждого правила или термина, которые называет сообщение коммита;",
    "- формулировку каждого правила, к которому SpecTag (§s-8xw4mgvpexyvw5q) привязывает код, добавленный или изменённый коммитом, не считая тестов;",
    "- для каждого правила, реализация которого, согласно сообщению коммита, не требует изменений: формулировку правила в том виде, в каком она была до коммита и в каком стала после него, а также тесты и код, привязанные к правилу напрямую или через цепочку связей `implements`, в том виде, в каком они стали после коммита;",
    "- для каждого узла технического приложения (§s-qmmzf9nksfsa3qp), который одобрен в коммите и имеет связь `implements` (§s-sn6au3vcr9uy5pm) с правилом базовой спецификации:",
    "  - формулировку узла;",
    "  - формулировку каждого правила базовой спецификации, которое узел реализует, которое связано с таким правилом связью в любую сторону или которое входит в тот же раздел верхнего уровня базовой спецификации, что и такое правило.",
    "",
    "Формулировка узла здесь — его заголовок, текст, обоснование, примеры и поля, которые добавляет его тип, как их покрывает одобрение (§s-5ah25f6gy99panq).",
    "",
    "Ничего из сессии, в которой было сделано изменение, инструменты SpecSheriff рецензенту не передают. О каждом файле, не вошедшем в изменение, они сообщают рецензенту, что он сгенерирован из спецификации. То, что правило требует от сгенерированного кода, рецензент считает выполненным этим кодом.",
  ].join("\n"),
  reason: "Рецензент выносит суждения, которых не может вынести ни одна детерминированная проверка: делает ли код только то, что говорят его правила; действительно ли реализацию правила не нужно менять; согласуется ли одобренный узел технического приложения с базовой спецификацией. Решать он может только по тому, что ему показали. Получив то, что нужно для каждого суждения, и ничего о намерениях автора изменения, он судит только по правилам.",
};

const nfPath = new URL("newform.json", here);
fs.copyFileSync(nfPath, new URL("newform.before-propose-10-4.json", here));
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
const n = nf["10.4"];
n.proposals = [{
  en: [`Title: ${en.title}`, `Text: ${en.text}`, `Reason: ${en.reason}`].join("\n\n"),
  ru: [`Заголовок: ${ru.title}`, `Текст: ${ru.text}`, `Обоснование: ${ru.reason}`].join("\n\n"),
  why: "Следует из нового списка суждений рецензента в принципе о детерминированных проверках и из 1.3.6. Рецензент получает то, что нужно для каждого суждения. Для узла приложения передаются реализуемые им правила базы, правила, связанные с ними, и правила того же раздела верхнего уровня. Вся база была бы полнее, но дороже, и в большом проекте могла бы не поместиться в контекст рецензента.",
}];

// The agreed 1.3.6: EngStickler's reader found phrases a native writer would not use; none of the corrections changes the meaning.
const a = nf["1.3.6"];
const fix = (obj, field, from, to) => {
  const v = obj[field];
  const s = Array.isArray(v) ? v.join("\u0000") : v;
  if (!s.includes(from)) throw new Error(`1.3.6 ${field}: missing ${from.slice(0, 60)}`);
  const r = s.replace(from, to);
  obj[field] = Array.isArray(v) ? r.split("\u0000") : r;
};
fix(a, "text", "the node belongs to the technical appendix (§s-qmmzf9nksfsa3qp), and:", "the node belongs to the technical appendix (§s-qmmzf9nksfsa3qp), and all of the following hold:");
fix(a, "text", "to the owner on whose behalf it made it.", "to the owner on whose behalf it was made.");
fix(a, "examples", "an approved rule that an idle session expires", "an approved rule stating that an idle session expires");
fix(a, "examples", "sets the limit at 30 minutes", "sets the idle limit at 30 minutes");
fix(a, "examples", "But not: the agent approves in the same way a node it adds to the section on the stack, which implements no rule.", "But not: a node that the agent adds to the section on the stack, which implements no rule, is approved by the agent in the same way.");
fix(a, "reason", "The agent's report tells the owner of each such approval", "The agent's report informs the owner of each such approval");
fix(a, "ruText", "и при этом:", "и при этом выполняется всё следующее:");
fix(a, "ruExamples", "задаёт предел в 30 минут", "задаёт предел простоя в 30 минут");
fix(a, "ruExamples", "Но не так: агент так же одобряет узел, который добавил в раздел стека и который не реализует ни одного правила.", "Но не так: узел, который агент добавил в раздел стека и который не реализует ни одного правила, агент одобряет так же.");
a.changes.push("После согласования поправлен английский по отчёту читателя EngStickler; смысл не менялся.");
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const top = /\*\*If the session is interrupted, the next session starts by\*\*[^\n]*/.exec(c)[0];
c = c.replace(top, "**If the session is interrupted, the next session starts by** getting the owner's decision on the proposed wording of node 10.4 (s-nyh9yk22ba6g77q), held as the proposal in the draft of 10.4 in newform.json.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
const pairs = [
  ["and to its first paragraph, split into a list, on 2026-11-20", "and to its first paragraph, turned into a list, on 2026-11-20"],
  ["In it, the clauses that semicolons joined are split into separate sentences.", "In it, the clauses joined by semicolons are split into separate sentences."],
  ["EngStickler's reader reads the agreed English in the background.", "EngStickler's reader read the agreed English text, and propose-10-4.mjs corrected the phrases it found, without changing the meaning."],
  ["The agent's draft of the new wording of node 10.4 (s-nyh9yk22ba6g77q) is being checked by the wording checker and the rule reviewer before it is shown to the owner. It is in .ai_docs/t25-pass/draft-10-4.json.", "The agent has proposed the new wording of node 10.4 (s-nyh9yk22ba6g77q) to the owner, and is waiting for the owner's decision. The draft of 10.4 in newform.json holds it as its proposal, written by propose-10-4.mjs after the wording checker and the rule reviewer had reported. For a node of the technical appendix, the reviewer is given the rules of the base specification that the node implements, the rules linked to them in either direction, and the rules in the same top-level section. The owner is asked to choose this or the whole base specification, since the choice costs the person who commits tokens."],
  ["- nodes 1.6.1 and 10.2, which have the reviewer judge only a commit that changes code;", "- nodes 1.6.1 and 10.2, which have the reviewer judge only a commit that changes code;\n- the main table of checks, where no row yet sets what a failure of the two new judgements costs: new rows, or a wider row 10.1.43;\n- the third item of the principle's list of the reviewer's judgements, which covers every node of the technical appendix approved in a commit, while 1.3.6 and 10.4 cover only a node that implements a rule of the base specification;"],
];
for (const [x, y] of pairs) {
  if (!c.includes(x)) throw new Error("not found: " + x.slice(0, 70));
  c = c.replace(x, y);
}
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "draft-10-4.json holds the agent's draft of node 10.4 while it is being checked.";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, "draft-10-4.json holds the agent's first draft of node 10.4, as the reviewers checked it. propose-10-4.mjs proposes the new wording of node 10.4, on what the reviewer is given.");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
const x = "- ● сейчас: рецензенту передаётся и то, что нужно для двух новых суждений; черновик проверяют рецензенты\n- ○ затем, по одной: 1.6.1 и 10.2, 10.5, обоснования 1.3.3 и 1.3.4, обоснование 10.1.41, узел описания инструментов об отставании";
if (!o.includes(x)) throw new Error("outline text not found");
o = o.replace(x, "- ● сейчас: рецензенту передаётся то, что нужно для двух новых суждений; какие правила базы — ваш выбор\n- ○ затем, по одной: 1.6.1 и 10.2, строки таблицы проверок для новых суждений, третий пункт принципа, 10.5, обоснования 1.3.3 и 1.3.4, обоснование 10.1.41, узел описания инструментов об отставании");
fs.writeFileSync(outPath, o);
console.log("proposed at", now);
