// Table 10.1: the English of rows agreed on 2026-11-17 brought into line with their Russian text after EngStickler's
// readers had read it. A rule has no SpecTag of its own, so "its SpecTag" becomes "a SpecTag that names it"; "code file"
// and "test file" as a native writer says them; each "it" points to one rule.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("table-10-1.json", here);
fs.copyFileSync(file, new URL("table-10-1.before-138.json", here));
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const swap = (num, from, to) => {
  const r = rows.find((x) => x.num === num);
  if (!r || !r.en.includes(from)) throw new Error(`row ${num}: not found: ${from}`);
  r.en = r.en.replace(from, to);
};
swap("10.1.26", "Each SpecTag names a rule that the code it binds implements, or says that the code implements none", "Each SpecTag names a rule implemented by the code that it binds, or says that the code implements none");
swap("10.1.28a", "no commit adds or changes code or a test that its SpecTag binds", "no commit adds or changes code or a test that a SpecTag naming the rule binds");
swap("10.1.34", "A node's `meta.code` refers to every file of code that the node's SpecTag binds, and to no other file. Its `meta.tests` refers to every file of tests that holds a test with the node's SpecTag, and to no other file", "A node's `meta.code` refers to every code file that a SpecTag naming the node binds, and to no other file. Its `meta.tests` refers to every test file that holds a test with a SpecTag naming the node, and to no other file");
swap("10.1.41", "also counts as bound to it", "also counts as bound to that rule");
swap("10.1.42", "The message of a commit names, by its sid, each node to which a SpecTag binds code added or changed in that commit, not counting the tests", "For each node to which a SpecTag binds code added or changed in a commit, the message of that commit names the node by its sid. Code in the tests is not counted");
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("ok");
