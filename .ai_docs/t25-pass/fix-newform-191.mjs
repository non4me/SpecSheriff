// 9.4's reason went through the text sentence by sentence (its second sentence grounded the text's first,
// its third the text's second), which agreed 7.14 (s-ydzyh9nqm3x64h4) forbids: a reason speaks of the rule
// as a whole and says what it solves. Rewritten so, for a fresh reviewer.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-9j2mmnuuwmx5ksn" || b.agreed) throw new Error("unexpected 9.4");

b.reason = "Tests and code that change are checked against their rule anew. This rule draws the line between an edit to a test or code that can affect that check and one that cannot.";
b.ruReason = "Изменённые тест и код заново сверяются со своим правилом. Это правило проводит границу между правкой теста или кода, которая может повлиять на эту сверку, и правкой, которая не может.";
b.changes = b.changes.filter((c) => !c.startsWith("Обоснование новое"));
b.changes.push("Обоснование новое и говорит о правиле в целом, как требует согласованный 7.14: изменённые тест и код заново сверяются с правилом, а это правило отделяет правку теста или кода, которая может повлиять на сверку, от правки, которая не может. Прежнее разбирало две фразы текста по одной.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.reason + "\n" + b.ruReason);
