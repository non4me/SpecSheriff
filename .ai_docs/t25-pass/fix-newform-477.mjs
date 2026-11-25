// A proposal for the agreed 1.7.4 "Independence of extensions", made by specsheriff-rule-reviewer while reviewing it and
// left in the queue: the links that a rule of an extension declares are also only of the types that the guidelines or
// that extension define. 6.1 lets an extension define further types of link, so a rule using a type that another
// extension defines would rely on that extension; the first bullet covers words in the text and the reason, not the
// types of the links a node declares.
// It also writes the file that EngStickler's reader reads for the English of the seven changes the owner accepted.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-477.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const LINK = "s-sn6au3vcr9uy5pm"; // 6.1 What a link is
const n = d["1.7.4"];
if (n.proposals) throw new Error("1.7.4 already holds a proposal");
const swap = (s, from, to) => { if (!s.includes(from)) throw new Error("not found: " + from); return s.split(from).join(to); };
const text = swap(n.text, "- the links that the rule declares lead only to nodes of the guidelines or of that extension.", `- the links that the rule declares are only of the types that the guidelines or that extension define (§${LINK}), and lead only to nodes of the guidelines or of that extension.`);
const ruText = swap(n.ruText, "- связи, которые оно объявляет, ведут только к их узлам.", `- связи, которые оно объявляет, имеют только типы, определённые в них (§${LINK}), и ведут только к их узлам.`);
n.proposals = [{
  where: "третий пункт текста",
  en: [`Title: ${n.title}`, `Text: ${text}`, ...(n.examples ?? []).map((e) => `Example: ${e}`), `Reason: ${n.reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...(n.ruExamples ?? []).map((e) => `Пример: ${e}`), `Обоснование: ${n.ruReason}`].join("\n\n"),
  why: "6.1 позволяет расширению определять свои типы связей. Правило, которое объявляет связь типа из другого расширения, опиралось бы на то расширение. Первый пункт говорит о словах в тексте и обосновании, а тип связи стоит не там, а в связях узла.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const keys = ["1.3.7", "2.5", "5.2", "6.4", "9.2", "9.7"];
const lines = ["# The English of the seven changes the owner accepted on 2026-11-18", "", "The English of each node below must say exactly what its agreed Russian says. Read only the English; the Russian is what it must say.", ""];
for (const k of keys) {
  const x = d[k];
  lines.push(`## ${k} ${x.title}`, "", x.text, "", `Reason: ${x.reason}`, "", "### The agreed Russian", "", `${x.ruTitle}`, "", x.ruText, "", `Обоснование: ${x.ruReason}`, "");
}
const t = JSON.parse(fs.readFileSync(new URL("table-10-1.json", here), "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.8");
lines.push("## Row 10.1.8 of the table of checks", "", r.en, "", "### The agreed Russian", "", r.ru, "");
fs.writeFileSync("C:/Users/PC/AppData/Local/Temp/claude/a0dc34c442b04427/8f0be46b-7277-4ad8-b267-fd1304189f4b/scratchpad/agreed-seven-en.md", lines.join("\n"));
console.log("ok");
