// Fixes the English of the agreed 13.2 as EngStickler's readers reported, without changing its meaning or its Russian.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-13-2-en.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["13.2"];
const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  n[field] = n[field].replace(from, to);
};
swap("text", "holds no fact of its own.", "holds no facts of its own.");
swap("text", "A branch of the map opens and closes,", "A branch of the map can be opened and closed,");
swap("text", "The top-level branches of the map stand in this order:", "The top-level branches of the map appear in this order:");
swap("reason", "The full text is more than anyone holds at once, and a rule read on its own loses where it is in the specification.", "The full text is more than anyone can hold in mind at once, and a rule read on its own loses its place in the specification.");
swap("reason", "shows the shape of everything and the detail of whatever is opened, together with what in it still waits for its owners.", "shows the shape of the whole and the detail of whatever is opened, together with the parts of it that still wait for their owners' approval.");
n.changes.push("Только английский текст, по замечаниям читателей: «holds no facts», «can be opened and closed», «appear in this order», «can hold in mind», «loses its place», «the shape of the whole», «wait for their owners' approval». Смысл и русский текст не изменились.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
