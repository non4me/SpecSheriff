// The owner of 2026-11-10 on 9.2: «Пока спецификация одобрена, каждое одобренное правило реализовано» read unclear, a fact rather than a requirement, "approved"
// twice in two senses. The opening is now theirs, «Если спецификация имеет статус одобрения», with the value named, `approved`, since a specification always has
// some approval status; the requirement says "must be implemented", and "counts as implemented" for when it is met.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.2"];
if (b.sidValue !== "s-6fw72j65jkqrfpf" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "While the specification is approved, every approved rule is implemented. So is every approved node of a project's own kind that requires an implementation in code (§s-vsh384ybt4w25a2). Such a rule or node is implemented when both hold:", "If the specification's approval status is `approved`, every approved rule must be implemented. So must every approved node of a project's own kind that requires an implementation in code (§s-vsh384ybt4w25a2). Such a rule or node counts as implemented when both hold:");
swap("ruText", "Пока спецификация одобрена, каждое одобренное правило реализовано. Так же и каждый одобренный узел собственного типа в проекте, которому требуется имплементация кода (§s-vsh384ybt4w25a2). Такое правило или узел реализованы, когда выполняется и то, и другое:", "Если спецификация имеет статус одобрения `approved`, у каждого одобренного правила должна быть реализация. Так же и у каждого одобренного узла собственного типа в проекте, которому требуется имплементация кода (§s-vsh384ybt4w25a2). Такое правило или узел считаются реализованными, когда выполняется и то, и другое:");
const at = b.changes.findIndex((c) => c.startsWith("Добавлено «пока спецификация одобрена»"));
if (at < 0) throw new Error("no change line on the condition");
b.changes[at] = "Добавлено условие, ваши слова: «Если спецификация имеет статус одобрения `approved`». Без него текст противоречил согласованному 1.3.2. Значение названо, потому что какой-то статус одобрения у спецификации есть всегда.";
b.changes.splice(at + 1, 0, "Требование сказано как требование: «должна быть реализация», и «считаются реализованными», когда оно выполнено.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text.split("\n")[0]);
console.log(b.ruText.split("\n")[0]);
