// Fixes to the English alone, after EngStickler's readers read the agreed node 7.2.2; the Russian, and so the agreed
// meaning, does not change. In 7.2.2, "Its qualifications follow" could refer to the text or to the main thought, and
// the Russian says the qualifications follow the main thought; "written in sentences" does not set reasoning against a
// list, since list items can be sentences too, and "as prose" does; the bad example's "names" could take the token as
// its subject. "says not X, but Y" is a calque of «говорит не X, а Y», so the examples of 7.2.2, 7.2.3 and 7.2.5 now say
// what the text does not say, then what it says.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-379.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const swap = (o, f, a, b, i) => {
  const s = i === undefined ? o[f] : o[f][i];
  if (!s.includes(a)) throw new Error("not found: " + a);
  if (i === undefined) o[f] = s.replace(a, b);
  else o[f][i] = s.replace(a, b);
};
const n = d["7.2.2"];
swap(n, "text", "Its qualifications follow.", "The qualifications of the main thought follow it.");
swap(n, "text", "is written in sentences.", "is written as prose.");
n.examples[0] = "A node's text does not say “the system refuses a request whose token has expired or that names a removed user”. It says “The system refuses a request in each of these cases:”, followed by the cases as a list.";
n.changes.push("После согласования, по замечаниям читателей EngStickler, поправлен только английский; русский текст и смысл не изменились: «Its qualifications follow» → «The qualifications of the main thought follow it», «written in sentences» → «written as prose», в примере «says not …, but …» → «does not say …. It says …» и «or names» → «or that names».");
swap(d["7.2.3"], "examples", "A rule says not “a limit on how many records a listing shows”, which also let an export drop records, but “a limit", "A rule does not say “a limit on how many records a listing shows”, which also let an export drop records. It says “a limit", 0);
d["7.2.3"].changes.push("Поправлен только английский пример: «says not …, but …» → «does not say …. It says …»; русский текст и смысл не изменились.");
swap(d["7.2.5"], "examples", "A definition says not “an operator is whoever is not a user”, but “an operator", "A definition does not say “an operator is whoever is not a user”. It says “an operator", 0);
d["7.2.5"].changes.push("Поправлен только английский пример: «says not …, but …» → «does not say …. It says …»; русский текст и смысл не изменились.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text, "\n", n.examples[0], "\n", d["7.2.3"].examples[0], "\n", d["7.2.5"].examples[0]);
