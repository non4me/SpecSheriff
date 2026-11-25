// Fixes to the English alone, after EngStickler's readers read the agreed node 7.2.3; the Russian, and so the agreed
// meaning, does not change. "A word of general meaning" is a calque of «слово общего значения», and the reason already
// says "a general word"; "stands in the same phrase" is a calque of «стоит в одной фразе». "names that thing", after
// "refers to", could read as merely mentioning it, and "particular" as "some one thing"; the Russian says the rule calls
// the thing by its name. "binds each of them to a meaning of their own" is an unusual collocation, and the Russian says
// the meaning each reader chose.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-386.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.3"];
const swap = (f, a, b) => {
  if (!n[f].includes(a)) throw new Error("not found: " + a);
  n[f] = n[f].replace(a, b);
};
swap("text", "A word of general meaning stands in the same phrase as what it applies to.", "A general word appears in the same phrase as what it applies to.");
swap("text", "Where a rule refers to a particular thing, it names that thing.", "Where a rule refers to a specific thing, it uses the name of that thing.");
swap("reason", "the rule then binds each of them to a meaning of their own.", "the rule then binds each of them to the meaning they chose.");
n.changes.push("После согласования, по замечаниям читателей EngStickler, поправлен только английский; русский текст и смысл не изменились: «A word of general meaning stands in» → «A general word appears in», «refers to a particular thing, it names that thing» → «refers to a specific thing, it uses the name of that thing», «to a meaning of their own» → «to the meaning they chose».");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text, "\n", n.reason);
