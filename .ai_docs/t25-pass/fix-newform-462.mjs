// Node 11.1.3, finding 2 on the extensions, under the owner's ruling of 2026-11-17: the ban on a cycle of use stays, and
// one sentence says that a notification sent through an event is not use, as the owner agreed («ок»). The node stays
// agreed, since the owner agreed to the wording shown.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-462.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["11.1.3"];
const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  n[field] = n[field].replace(from, to);
};
swap("text", "The domains do not use one another in a cycle.", "The domains do not use one another in a cycle. A notification that one domain sends to another through an event does not make the sender a user of the receiving domain. Notifications may go in either direction.");
swap("ruText", "Домены не используют друг друга по кругу.", "Домены не используют друг друга по кругу. Уведомление, которое один домен отправляет другому через событие, не делает отправителя пользователем домена-получателя. Уведомления могут идти в любую сторону.");
n.changes.push("Вы согласовали 17 ноября («ок»): запрет круга остаётся; уведомление через событие не делает отправителя пользователем получателя, уведомления могут идти в любую сторону (находка 2 по расширениям).");
n.agreed = "2026-11-17";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
