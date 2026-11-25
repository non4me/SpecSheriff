// The fresh reviewer of 1.2.7 (2026-11-11), its fix to the list of changes only: the notes describing the dropped
// draft go, and the move's consequences are named. The doubts on the text go to the owner.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["1.2.7"];
if (b.sidValue !== "s-kh8qcd5kxgh9z3j" || b.agreed) throw new Error("unexpected 1.2.7");
b.changes = [
  "Заголовок новый.",
  "Текст — абзацы 2 и 4 нынешнего 1.1.",
  "Сохраняет sid 1.1: на копии указывают шесть ссылок из девяти и тест экспорта. Три ссылки об ожидании, из 10.4, 11.4 и описания хуков, перейдут на 12.5.1 (s-qyjw8xez6t6adc3), туда же — тест ожидания в types.test.ts; четыре исходящие связи cites уходят, добавляется cites на s-xqs2e24mx5253ye.",
  ...b.changes.slice(4),
];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.changes.join("\n"));
