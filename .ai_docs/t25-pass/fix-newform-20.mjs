// The owner, 2026-11-07: in 1.1.4 "любая дополнительная информация" becomes "любая дополнительная
// бизнес-информация", so that what the rule may hold besides its logic is business information too.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.1.4"];
const rep = (f, a, b) => {
  if (n[f].includes(b)) return;
  if (!n[f].includes(a)) throw new Error(`${f}: not found: ${a}`);
  n[f] = n[f].replace(a, b);
};
rep("text", "It may also hold any further information needed", "It may also hold any further business information needed");
rep("ruText", "Здесь же может быть любая дополнительная информация, необходимая", "Здесь же может быть любая дополнительная бизнес-информация, необходимая");
// And the owner's comment of 23:55 on the reason: "со своим приложением" -> "с другой версией
// технического приложения".
rep("reason", "on another technical stack, with an appendix of its own, without", "on another technical stack, with another version of the technical appendix, without");
rep("ruReason", "на другом техническом стеке, со своим приложением, не правя", "на другом техническом стеке, с другой версией технического приложения, не правя");
n.changes[2] = "Обоснование — нынешнее 1.16 с вашими правками в первой фразе: «Это позволяет реализовать спецификацию на другом техническом стеке, с другой версией технического приложения».";
n.changes[1] = n.changes[1].replace("дословно; исправлены", "дословно, с вашим уточнением «любая дополнительная бизнес-информация»; исправлены");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.ruText.split("\n\n")[0]);
