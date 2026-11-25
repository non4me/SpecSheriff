// The English of 1.6.1, 1.3.2, 1.3.3 and 10.6, agreed on 2026-11-17, brought into line with their Russian text after
// EngStickler's readers had read 1.6.1: "the project's shared branch" instead of "the branch that the project shares",
// which suggested that the project shares the branch with someone else; the example of 1.6.1 "states" what the project's
// guidelines say, and its push "runs no tests"; a person waits for a commit, not the commit. "Refused" stays, since every
// rule and row of the guidelines says a check refuses.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-453.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const swap = (key, field, from, to) => {
  const n = d[key];
  const v = n[field];
  if (Array.isArray(v)) {
    const i = v.findIndex((x) => x.includes(from));
    if (i < 0) throw new Error(`${key}.${field}: not found: ${from}`);
    v[i] = v[i].replace(from, to);
  } else {
    if (!v.includes(from)) throw new Error(`${key}.${field}: not found: ${from}`);
    n[field] = v.split(from).join(to);
  }
};
swap("1.6.1", "text", "before a change reaches the branch that the project shares", "before a change reaches the project's shared branch");
swap("1.6.1", "examples", "names in its own guidelines that the tests run on a shared server before a merge. A push from a developer's machine then runs no test,", "states in its own guidelines that the tests run on a shared server before a merge. A push from a developer's machine then runs no tests,");
swap("1.6.1", "reason", "since a suite takes longer than a commit should wait.", "since a suite takes longer than anyone should wait for a commit.");
swap("1.6.1", "reason", "The order of test and code can be seen", "The order of the test and the code can be seen");
swap("1.3.2", "text", "before a change reaches the branch that the project shares", "before a change reaches the project's shared branch");
swap("1.3.3", "reason", "before a change reaches the branch that the project shares", "before a change reaches the project's shared branch");
swap("10.6", "reason", "before a change reaches the branch that the project shares", "before a change reaches the project's shared branch");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
