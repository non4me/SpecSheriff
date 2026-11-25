// The reviewer of 2026-11-10 on 8.3 (review-8-3-8-4.md): «как правило» read as "usually"; "each such kind" followed a sentence on nodes
// that need code; the reason renamed "need code" and held a sentence over 25 words. Its two doubts are not written here.
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
swap("ruText", "реализуются и тестируются как правило", "реализуются и тестируются так же, как правило");
swap("text", "lists each such kind with whether", "lists each of the project's own kinds of node with whether");
swap("ruText", "перечисляет каждый такой вид и указывает", "перечисляет каждый собственный вид узлов и указывает");
b.reason = "Most kinds of node a project adds are one more sort of requirement, so their nodes need code unless declared otherwise. A kind that needs none is an exemption, so one of the specification's owners approves the rule listing it (§s-6fw72j65jkqrfpf).";
b.ruReason = "Узлы большинства видов, которые добавляет проект, — это тоже требования, поэтому им нужен код, если не объявлено иное. Вид узлов, которому код не нужен, — исключение, поэтому правило, которое его перечисляет, одобряет один из ответственных за спецификацию (§s-6fw72j65jkqrfpf).";
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
