// The reviewer of 2026-11-10 on reopened 7.9: with no general word in the title, "what it applies to" reads as the name's own referent, and the title repeated
// the text's sentence, which `.claude/vt/rules.md` forbids; the title now names the matter, as 7.8's does. In paragraph 1, "it" is made "the general word".
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["7.9"];
if (b.sidValue !== "s-9w3u3wn37wksyxd" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("title", "A name the specification defines includes what it applies to", "General words in the names the specification defines");
swap("ruTitle", "Имя, определённое спецификацией, включает то, к чему оно относится", "Общие слова в именах, определённых спецификацией");
swap("text", "It includes what it applies to: userAction, not action.", "It includes what the general word applies to: userAction, not action.");
swap("ruText", "Оно включает то, к чему относится: userAction, а не action.", "Оно включает то, к чему относится общее слово: userAction, а не action.");
b.changes[b.changes.length - 1] = "По вашему решению 2026-11-10, вслед за 7.8: «несёт свой объект» ушло. Заголовок теперь называет предмет узла, как у 7.8: «Общие слова в именах, определённых спецификацией». В первом абзаце: «Оно включает то, к чему относится общее слово». «Объект» остался там, где это объект, которому принадлежит поле или свойство.";
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(JSON.stringify({ title: b.title, ruTitle: b.ruTitle, text: b.text, ruText: b.ruText, reason: b.reason, ruReason: b.ruReason, changes: b.changes }, null, 2));
