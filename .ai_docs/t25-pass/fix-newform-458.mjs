// Node 10.11, finding 3 of sections 6 to 10, under the owner's ruling of 2026-11-17: a project's own tool that rewrites
// files, such as a formatter, runs before the checks where the project's own guidelines list it; after the checks have
// read a commit, no tool changes it. The title names the order of the tools and the checks. Also brings the English of
// the agreed 10.9 into line with its Russian text after EngStickler's readers had read it.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-458.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const OWN = "s-u7tw6m8npxmv5tu";
const swap = (s, from, to, where) => {
  if (!s.includes(from)) throw new Error(`${where}: not found: ${from}`);
  return s.replace(from, to);
};

const m = d["10.9"];
m.text = swap(m.text, "and names only a rule of the guidelines.", "and may name only a rule of the guidelines.", "10.9.text");
m.examples = [swap(m.examples[0], "refuses a commit that holds a secret", "refuses a commit that contains a secret", "10.9.examples")];
m.reason = swap(m.reason, "in the same order, test first,", "in the same order as the system's code, the test first,", "10.9.reason");
m.reason = swap(m.reason, "Counted toward a rule of the system,", "Counted toward a rule of the base specification or of the technical appendix,", "10.9.reason");

const n = d["10.11"];
const title = "The order of a project's own tools and the checks at a commit and at a push";
const ruTitle = "Порядок собственных инструментов проекта и проверок при коммите и при push";
let text = swap(n.text, "None of the project's own tools changes what the commit holds.", "After the checks have read the commit, no tool changes what it holds.", "text");
text = swap(text, "\n\nWhere the SpecSheriff tools cannot run,", `\n\nA project's own tool that rewrites files, such as a formatter, runs before the checks, and only where the project's own guidelines (§${OWN}) list it.\n\nWhere the SpecSheriff tools cannot run,`, "text");
let ruText = swap(n.ruText, "Ни один собственный инструмент проекта не меняет содержимого коммита.", "После того как проверки прочли коммит, ни один инструмент не меняет его содержимого.", "ruText");
ruText = swap(ruText, "\n\nТам, где инструменты SpecSheriff не могут запуститься,", `\n\nСобственный инструмент проекта, который переписывает файлы, например форматтер, запускается до проверок, и только если его перечисляют собственные guidelines проекта (§${OWN}).\n\nТам, где инструменты SpecSheriff не могут запуститься,`, "ruText");
const reason = swap(n.reason, "A tool that changed the commit would let through what no check read.", "A tool that changed the commit after the checks would let through what no check read. A tool that rewrites files before the checks changes nothing that they do not then read.", "reason");
const ruReason = swap(n.ruReason, "Инструмент, который менял бы коммит, пропустил бы то, чего не читала ни одна проверка.", "Инструмент, который менял бы коммит после проверок, пропустил бы то, чего не читала ни одна проверка. Инструмент, который переписывает файлы до проверок, не меняет ничего, чего они потом не прочтут.", "ruReason");
const examples = ["A project's own guidelines list a formatter. At a commit, the formatter rewrites the staged files first, and the checks then read the formatted files."];
const ruExamples = ["Собственные guidelines проекта перечисляют форматтер. При коммите форматтер сначала переписывает файлы коммита, а проверки затем читают уже отформатированные файлы."];
n.proposals = [{
  where: "заголовок, второй абзац, новый абзац о переписывающих инструментах, обоснование, новый пример",
  en: [`Title: ${title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Находка 3 разделов 6–10, по вашему решению 17 ноября: инструменты, которые переписывают файлы, запускаются до проверок, если их перечисляют собственные guidelines проекта; после того как проверки прочли коммит, его никто не меняет.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
