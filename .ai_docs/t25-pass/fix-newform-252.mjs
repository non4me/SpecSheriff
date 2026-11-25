// Draft 10.4: the reviewer's fixes (2026-11-13). The SpecSheriff tools are the subject (7.3); the ban on the session is a
// sentence of its own (7.5); the reason says why the rule exists (7.14); "is considered", not "counts". The reviewer's
// doubts are settled in the wording: the commit's message is given, as review.ts gives it; a term the message names is
// given, as the ruling of 2026-10-11 gave it; and each rule's whole wording is given, as agreed node 1.3.5 defines it, so
// that its list and the fields its kind adds reach the reviewer (review.ts does not give the list yet: owed to the tools).
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["10.4"];
n.text =
  "The SpecSheriff tools give the independent reviewer of a commit that changes code the following:\n" +
  "- the commit's message;\n" +
  "- the commit's change, less the files generated from the specification;\n" +
  "- the wording of each rule or term that the commit's message names;\n" +
  "- the wording of each rule named by the SpecTag of a symbol that the commit adds or changes, not counting the tests.\n\n" +
  "A node's wording here is its title, its text, its reason and the fields its kind adds, as an approval covers them (§s-5ah25f6gy99panq).\n\n" +
  "The tools give the reviewer nothing from the session in which the code was written. They tell the reviewer that each file left out of the change is generated from the specification. " +
  "The reviewer considers what a rule requires of generated code to be carried out by that code.";
n.ruText =
  "Инструменты SpecSheriff передают независимому рецензенту коммита, меняющего код, следующее:\n" +
  "- сообщение коммита;\n" +
  "- изменение коммита, кроме файлов, сгенерированных из спецификации;\n" +
  "- формулировку каждого правила или термина, которые называет сообщение коммита;\n" +
  "- формулировку каждого правила, которое называет SpecTag символа, добавленного или изменённого коммитом, не считая тестов.\n\n" +
  "Формулировка узла здесь — его заголовок, текст, обоснование и поля, которые добавляет его тип, как их покрывает одобрение (§s-5ah25f6gy99panq).\n\n" +
  "Ничего из сессии, в которой писали код, инструменты рецензенту не передают. О каждом файле, не вошедшем в изменение, они сообщают рецензенту, что он сгенерирован из спецификации. " +
  "То, что правило требует от сгенерированного кода, рецензент считает выполненным этим кодом.";
n.reason =
  "The reviewer judges whether the code does what its rules say, and nothing they do not. It can judge only from what it is shown. " +
  "Shown what that judgement needs, and nothing of what the code's author meant, it judges the code by its rules alone.";
n.ruReason =
  "Рецензент решает, делает ли код то, что говорят его правила, и ничего сверх этого. Решать он может только по тому, что ему показали. " +
  "Получив всё, что нужно для решения, и ничего о намерениях автора кода, он судит о коде только по его правилам.";
n.changes.push(
  "По рецензенту: подлежащее — инструменты SpecSheriff (7.3); запрет передавать сессию — отдельное предложение (7.5); обоснование говорит, зачем существует правило (7.14).",
  "По сомнениям рецензента: рецензент получает и сообщение коммита (так делает review.ts), и термины, которые оно называет (решение от 2026-10-11), и всю формулировку правила, как её определяет согласованный 1.3.5, — вместе со списком и полями собственного типа. На шаге инструментов review.ts начнёт передавать список правила.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("10.4 updated");
