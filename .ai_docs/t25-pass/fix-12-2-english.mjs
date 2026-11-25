// Corrects the English of 12.2 so that it says what the agreed Russian «нейтральными словами» means, and gathers the
// English of 12.6 and of the two rows of table 12.12 that the owner agreed on 2026-11-19, for EngStickler's readers.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));

const n = d["12.2"];
const from = "with the field's type in technology-neutral terms,";
if (!n.text.includes(from)) throw new Error("12.2 does not hold the expected phrase");
n.text = n.text.replace(from, "with the field's type in terms that belong to no programming language,");
n.changes.push("Только английский текст: «technology-neutral terms» заменено на «terms that belong to no programming language». Так английский говорит то же, что русское «нейтральными словами» по вашему решению от 26 октября: границы значения поля называются так, как их называет JSON Schema. Слова JSON Schema не принадлежат ни одному языку программирования, поэтому решение привести RecordType к JSON Schema русского текста не меняет. Узел остаётся согласованным.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const v = d["12.6"];
const rows = JSON.parse(fs.readFileSync(new URL("table-12-12.json", here), "utf8")).tables[0].rows.filter((r) => r.num === "12.12.7" || r.n === 29.5);
const last = v.decisions[v.decisions.length - 1];
const md = [
  "# The English of 12.6 and of two rows of table 12.12, agreed by the owner on 2026-11-19",
  "",
  `## 12.6 ${v.title}`,
  "",
  v.text,
  "",
  `Reason: ${v.reason}`,
  "",
  ...v.examples.map((e) => `Example: ${e}\n`),
  `Decision, problem: ${last.problem}`,
  "",
  `Decision, ruling: ${last.ruling}`,
  "",
  "## Rows of table 12.12",
  "",
  ...rows.map((r) => `- ${r.en}`),
  "",
  "## 12.2, the changed item of its list",
  "",
  "- each of its fields, with the field's type in terms that belong to no programming language, including any bounds on the field's value, whether the field's value is guaranteed and what the field means;",
  "",
].join("\n");
fs.writeFileSync(new URL("english-12-6.md", here), md);
console.log(md);
