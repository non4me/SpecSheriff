// The owner, 2026-11-10, on the reviewer's doubt on 8.3: the first sentence and the reason follow the schema, where needsCode is required,
// so no default is promised. The ruling goes into the node's meta.decisions at the move.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.3"];
if (b.sidValue !== "s-vsh384ybt4w25a2") throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (!b[field].includes(from)) throw new Error(`${field}: no "${from}"`);
  b[field] = b[field].replace(from, to);
};
swap(
  "text",
  "The nodes of a project's own kind need code unless the project's extension of the schema (§s-xm8rz4uupb73gu5) declares otherwise.",
  "A project's extension of the schema (§s-xm8rz4uupb73gu5) declares, for each of the project's own kinds of node, whether the nodes of that kind need code.",
);
swap(
  "ruText",
  "Узлам собственного вида в проекте нужен код, если расширение схемы проекта (§s-xm8rz4uupb73gu5) не объявляет иное.",
  "Расширение схемы проекта (§s-xm8rz4uupb73gu5) объявляет для каждого собственного вида узлов, нужен ли узлам этого вида код.",
);
b.reason = "Only a project knows whether the nodes of a kind it adds are carried out by code, by tools or by people. A kind that needs no code is an exemption, so one of the specification's owners approves the rule listing it (§s-6fw72j65jkqrfpf).";
b.ruReason = "Только проект знает, выполняются ли узлы вида, который он добавляет, кодом, инструментами или людьми. Вид узлов, которому код не нужен, — исключение, поэтому правило, которое его перечисляет, одобряет один из ответственных за спецификацию (§s-6fw72j65jkqrfpf).";
b.changes = [...(b.changes ?? []), "Первое предложение и обоснование приведены в соответствие со схемой по вашему решению: значение `needsCode` обязательно, поэтому умолчания нет."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(JSON.stringify({ title: b.title, ruTitle: b.ruTitle, text: b.text, ruText: b.ruText, reason: b.reason, ruReason: b.ruReason, changes: b.changes }, null, 2));
