// Corrects the English of the agreed node 10.2 as EngStickler's reader found, without changing its meaning or its Russian.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
const n = nf["10.2"];
n.text = swap(n.text, "the checks that can tell from the edit itself that it would break a rule, and refuse it (", "the checks that can tell from the edit itself that it would break a rule, and that refuse it (", "10.2 text");
n.text = swap(n.text,
  "- after each edit by an agent: every check in the main table of checks (§s-jau82aq9juv9zzh) or in the table of checks of an extension that needs neither a commit message nor a run of the tests;",
  "- after each edit by an agent: every check that needs neither a commit message nor a run of the tests, from the main table of checks (§s-jau82aq9juv9zzh) or from the table of checks of an extension;",
  "10.2 text");
n.changes.push("После согласования поправлен английский по отчёту читателя EngStickler; смысл и русский текст не менялись.");
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");
fs.writeFileSync(new URL("english-10-2.md", here), [`# ${n.title}`, "", n.text, "", `Reason: ${n.reason}`, ""].join("\n"));
console.log(n.text);
