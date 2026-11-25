// The owner of 2026-11-10 on the rewritten 7.8: "in the same phrase" / «в той же фразе», which the rewrite lost, goes back into the main sentence,
// so the rule is not met by naming what a word applies to sentences later. The owner agrees to the node with it.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["7.8"];
if (b.sidValue !== "s-me9k7g34jqb4rzn" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "A word of general meaning is always used with what it applies to.", "A word of general meaning is always used, in the same phrase, with what it applies to.");
swap("ruText", "Слово с общим смыслом всегда употребляется вместе с тем, к чему оно относится.", "Слово с общим смыслом всегда употребляется в той же фразе вместе с тем, к чему оно относится.");
const at = b.changes.findIndex((c) => c.startsWith("Главная мысль ваша"));
if (at < 0) throw new Error("no change line on the main thought");
b.changes.splice(at + 1, 0, "«В той же фразе» возвращено по вашему решению: то, к чему относится слово, не может стоять предложением ниже.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text.split("\n")[0]);
console.log(b.ruText.split("\n")[0]);
