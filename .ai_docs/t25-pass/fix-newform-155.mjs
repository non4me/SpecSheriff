// The owner of 2026-11-10 titled reopened 7.9 «Правила именования», English "Naming rules", over the reviewer's "General words in the names the specification defines".
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["7.9"];
if (b.sidValue !== "s-9w3u3wn37wksyxd" || b.agreed) throw new Error("unexpected draft");
if (b.title !== "General words in the names the specification defines") throw new Error("unexpected title");

b.title = "Naming rules";
b.ruTitle = "Правила именования";
const last = b.changes.length - 1;
const from = "Заголовок теперь называет предмет узла, как у 7.8: «Общие слова в именах, определённых спецификацией».";
if (!b.changes[last].includes(from)) throw new Error("unexpected change line");
b.changes[last] = b.changes[last].replace(from, "Заголовок ваш: «Правила именования».");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.title, "|", b.ruTitle);
console.log(b.changes[last]);
