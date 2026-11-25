// The fresh reviewer of 9.4 after the owner's wording (2026-11-11): the reason's first sentence joined
// three thoughts by a colon, and its part after the colon was false for a test (the message is checked
// only against SpecTags outside the tests, and the reviewer reads symbols outside the tests); 9.5 and
// the reviewer's node state that part, so it goes.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-9j2mmnuuwmx5ksn" || b.agreed) throw new Error("unexpected 9.4");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("reason", "A test or code that changes is checked against its rule anew: the commit's message names that rule, and the reviewer reads the change against it.", "A test or code that changes is checked against its rule anew.");
swap("ruReason", "Изменённые тест и код заново сверяются со своим правилом: сообщение коммита называет это правило, рецензент читает изменение по нему.", "Изменённые тест и код заново сверяются со своим правилом.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.reason + "\n" + b.ruReason);
