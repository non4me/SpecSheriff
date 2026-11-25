// The owner of 2026-11-10 splits 8.3 in two: 8.3 keeps the first paragraph and the first sentence of the reason; a new 8.4 takes the second paragraph,
// rewritten as a short account of the scheme (what is new, where and how it arises, what is tied to what), and the rest of the reason.
// insert-node.mjs 8.4 has already moved the former 8.4 and 8.5 up by one. The check is described as it stands: it compares the names of the kinds.
import fs from "node:fs";
import crypto from "node:crypto";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.3"];
if (b.sidValue !== "s-vsh384ybt4w25a2" || d["8.4"]) throw new Error("unexpected drafts");

const everything = JSON.stringify(d) + fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8") + fs.readFileSync(new URL("../../specs/_guidelines/tools.json", here), "utf8");
const A = "23456789abcdefghjkmnpqrstuvwxyz";
let SID;
do { SID = "s-" + Array.from(crypto.randomBytes(15), (x) => A[x % A.length]).join(""); } while (everything.includes(SID));

const firstParagraph = (s) => {
  const i = s.indexOf("\n\n");
  if (i < 0) throw new Error("no second paragraph");
  return s.slice(0, i);
};
b.text = firstParagraph(b.text);
b.ruText = firstParagraph(b.ruText);
const firstReason = "A project may need kinds of node of its own, beyond those the SpecSheriff guidelines already describe.";
const firstRuReason = "Проекту могут потребоваться собственные типы узлов, помимо тех, что уже описаны в SpecSheriff guidelines.";
if (!b.reason.startsWith(firstReason + " ") || !b.ruReason.startsWith(firstRuReason + " ")) throw new Error("unexpected reason");
b.reason = firstReason;
b.ruReason = firstRuReason;
b.changes = [...b.changes, "Узел разделён по вашему решению. Здесь остались первый абзац и первое предложение обоснования. Второй абзац, переписанный как схема, и остаток обоснования перешли в 8.4."];

d["8.4"] = {
  from: "1.23", sid: "new",
  title: "How a project's own kind of node is declared and checked",
  ruTitle: "Как собственный тип узлов объявляется и проверяется",
  text: [
    "A project adds a kind of node under the `kinds` of its extension of the schema (§s-xm8rz4uupb73gu5). The name it is added under becomes a value of a node's `kind`. A kind's `schema` describes the fields its nodes hold beside those every node holds. A kind's `needsCode` says whether the implementation of its nodes is required.",
    "A rule of the project's own guidelines refines the rule on a project's own kinds of node (§s-vsh384ybt4w25a2). That rule's `TextRule.list.members` holds each added kind of node with its `needsCode`. That rule's `TextRule.list.declaredIn` names the extension's `kinds`.",
    "At each commit, a check compares the names in that list with the names under the extension's `kinds` (§s-jau82aq9juv9zzh).",
    "A node of a kind whose `needsCode` is true requires code and a test, each carrying that node's SpecTag. A node of a kind whose `needsCode` is false requires neither.",
  ].join("\n\n"),
  reason: "Only the project knows whether the nodes of a kind it adds are carried out by code, by tools or by people. Nobody approves an extension of the schema, so a rule lists those kinds.",
  ruText: [
    "Проект добавляет тип узлов в `kinds` своего расширения схемы (§s-xm8rz4uupb73gu5). Имя, под которым он добавлен, становится значением `kind` узла. `schema` типа узлов описывает поля, которые его узлы содержат помимо общих для всех узлов. `needsCode` типа узлов говорит, требуется ли имплементация его узлов.",
    "Правило собственных guidelines проекта уточняет правило о собственных типах узлов (§s-vsh384ybt4w25a2). `TextRule.list.members` этого правила содержит каждый добавленный тип узла с его `needsCode`. `TextRule.list.declaredIn` этого правила называет `kinds` расширения.",
    "При каждом коммите проверка сравнивает имена в этом списке с именами в `kinds` расширения (§s-jau82aq9juv9zzh).",
    "Узлу типа, у которого `needsCode` равен true, нужны код и тест, каждый с SpecTag этого узла. Узлу типа, у которого `needsCode` равен false, они не нужны.",
  ].join("\n\n"),
  ruReason: "Только проект знает, выполняются ли узлы типа, который он добавляет, кодом, инструментами или людьми. Расширение схемы никто не одобряет, поэтому эти типы узлов перечисляет правило.",
  changes: [
    "Новый узел по вашему решению: второй абзац 8.3, переписанный как краткая схема. Что нового, где и как возникает и что с чем связано.",
    "Ваши слова «содержит добавленный тип узла» стоят у `TextRule.list.members`.",
    "Обоснование — остаток обоснования 8.3. Вместо «such a kind's» стоит «the nodes of a kind it adds», потому что первое предложение осталось в 8.3.",
    "Сверка описана как она работает сейчас: сравниваются только имена типов узлов.",
  ],
  sidValue: SID,
};
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const at = lines.findIndex((l) => l.trim().startsWith('["8.3",'));
if (at < 0 || !lines[at + 1].trim().startsWith('["8.5",')) throw new Error("unexpected rows of section 8");
const indent = lines[at].slice(0, lines[at].indexOf("["));
lines.splice(at + 1, 0, indent + JSON.stringify(["8.4", "part", 0, "1.23", "part of 1.23: A project's own NodeKind is numbered, counted and implemented as a rule is", "уходит сюда: Как собственный тип узлов объявляется и проверяется"]) + ",");
fs.writeFileSync(pagePath, lines.join("\n"));
console.log("8.3:", b.text);
console.log("new sid of 8.4:", SID);
