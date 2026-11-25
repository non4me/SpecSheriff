// Proposal for the agreed node 10.10, "Where a SpecTag may appear" (s-sfjka4zc4rhfu67), carrying out the plan the owner
// accepted on 2026-11-17: a project's own generators, now 10.9, are named beside a project's own checks among the
// repository's own tools.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-propose-10-10.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["10.10"];
if (n.proposals?.length) throw new Error("10.10 already holds a proposal");
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  return s.replace(from, to);
};
const text = swap(n.text, "such as a project's own checks (§s-2fau85dfyyeq66m),", "such as a project's own checks (§s-2fau85dfyyeq66m) and generators (§s-km4x4s26kv7pjze),");
const ruText = swap(n.ruText, "например в собственных проверках проекта (§s-2fau85dfyyeq66m),", "например в собственных проверках (§s-2fau85dfyyeq66m) и генераторах (§s-km4x4s26kv7pjze) проекта,");
const reason = swap(n.reason, "including a project's own checks,", "including a project's own checks and generators,");
const ruReason = swap(n.ruReason, "в том числе собственные проверки проекта,", "в том числе собственные проверки и генераторы проекта,");
n.proposals = [{
  where: "Текст и обоснование",
  en: [`Title: ${n.title}`, `Text: ${text}`, ...(n.examples ?? []).map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...(n.ruExamples ?? []).map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Собственные генераторы проекта возвращены в guidelines как 10.9. Генератор, как и собственная проверка, — собственный инструмент репозитория, а не код системы, поэтому он назван рядом с проверками. Больше ничего не меняется.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(ruText);
console.log("---");
console.log(ruReason);
