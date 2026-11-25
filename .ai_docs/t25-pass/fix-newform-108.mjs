// The owner, 2026-11-10: a section is a node that holds a group of rules, at least one, and is not itself a rule. The requirement of
// at least one is thus stated in 8.1, so 8.2 keeps what 8.1 does not say: what counts as a rule of a section. Its list comes from the
// present node and its rulings of 2026-10-30 and 2026-11-04. RecordType leaves it, for part 14 to say.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const pagePath = new URL("base-structure.html", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const a = d["8.1"], b = d["8.2"];
if (a.sidValue !== "s-7445ahgjck2aefg" || b.sidValue !== "s-pctqj9wqaq8762t") throw new Error("unexpected drafts");

a.text = "A section is a node that holds a group of rules. It holds at least one rule. A section is not itself a rule.\n\nA section's text states what the section is responsible for. The text requires nothing, since every requirement is a rule.";
a.ruText = "Раздел — это узел, который содержит группу правил. Как минимум одно. Сам раздел правилом не является.\n\nТекст раздела говорит, за что раздел отвечает. Текст ничего не требует, поскольку каждое требование — это правило.";
a.changes = a.changes.map(c => c.startsWith("Текст — абзац 2")
  ? "Первый абзац — ваша формулировка. Что считается правилом раздела, говорит 8.2. Второй абзац — абзац 2 нынешнего 1.3."
  : c);

const oldTitle = b.title, oldRu = b.ruTitle;
b.title = "What counts as a rule of a section";
b.ruTitle = "Что считается правилом раздела";
b.text = "A term and a node of a project's own NodeKind each count as a rule of the section holding them. The rules of the sections inside a section count as its own.";
b.ruText = "Термин и узел собственного NodeKind проекта считаются правилами раздела, который их содержит. Правила разделов внутри раздела считаются его собственными.";
b.reason = "Without this, a section of terms alone or of sections alone would count as holding no rule.";
b.ruReason = "Иначе раздел, где есть только термины или только разделы, считался бы не содержащим правил.";
b.changes = [
  "Новый узел. Список взят из нынешнего 1.3 и говорит, что считается правилом раздела.",
  "Требование «как минимум одно» стоит в 8.1, по вашей формулировке.",
  "RecordType не назван, потому что уходит в часть 14. Там появится правило, что он считается правилом раздела.",
  "Сюда перейдут решения нынешнего 1.3 от 2026-10-30 и 2026-11-04. Узел tools.json 7.1.11 будет реализовывать 8.1 и цитировать 8.2.",
];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

let page = fs.readFileSync(pagePath, "utf8");
const row = `уходит сюда: ${oldRu}`;
if (!page.includes(row)) throw new Error("missing on the page: " + row);
page = page.replace(row, `уходит сюда: ${b.ruTitle}`);
fs.writeFileSync(pagePath, page);
console.log(oldTitle, "->", b.title);
