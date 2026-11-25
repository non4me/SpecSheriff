// The English text of wordings the owner agreed to on 2026-11-17, brought into line with their Russian text after
// EngStickler's readers had read it: 1.3.3, 10.1, 10.3 and 1.3.4. Node 1.3.6 says "on an owner's behalf" as 1.3.4 now
// does, a replacement that changes no meaning. Findings kept as they are: "an approval stands", the term 1.3.3 uses.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-436.json", here));
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
    n[field] = v.replace(from, to);
  }
};
swap("1.3.3", "reason", "An approved status claims that one of a rule's owners agreed to what it now states.", "The status `approved` claims that one of a rule's owners agreed to what the rule now states.");

swap("10.1", "reason", "whether a commit will go through", "whether a commit will pass");
swap("10.1", "reason", "the answer comes apart", "the answer falls apart");
swap("10.1", "reason", "because a judgement of anything else would pass", "because judging anything else would pass");
swap("10.1", "reason", "A rule outrunning its tests or its code, or tests outrunning the code, is drift worth knowing about, and not the fault of whoever's commit found it. So the check of drift only reports. An approved rule not implemented is reported", "When a rule runs ahead of its tests or its code, or tests run ahead of the code, that is drift worth knowing about. The drift is not the fault of whoever made the commit that revealed it. So the drift check only reports. An approved rule that is not implemented is reported");
swap("10.1", "reason", "A symbol or a test without a SpecTag that a commit leaves alone is reported, or refused while the specification's `strict` flag is on, for the reasons §s-kkbqcb9xrpaepwn and §s-q3pfzyaxvpr2zj2 give.", "A symbol or a test without a SpecTag that a commit leaves unchanged is reported. While the specification's `strict` flag is on, the commit is refused instead. The reasons are those that §s-kkbqcb9xrpaepwn and §s-q3pfzyaxvpr2zj2 give.");

swap("10.3", "text", "refuse it where it would do any of these:", "refuse it if it would do any of the following:");
swap("10.3", "text", "whose request states the files it writes and what it writes into them. A shell command states neither.", "whose request names the files it writes to and what it writes to them. A shell command names neither.");
swap("10.3", "reason", "An agent that could set a status, write an approval", "An agent that could set an approval status, write an approval");
swap("10.3", "reason", "whichever was written first", "whichever of them was written first");

swap("1.3.4", "text", "or in an owner's name as §s-t5uw8zfxzhfdg86 allows", "or on an owner's behalf as §s-t5uw8zfxzhfdg86 allows");
swap("1.3.4", "examples", ", as a team in a regulated industry needs.", ", which is what a team in a regulated industry needs.");
swap("1.3.4", "reason", "A named approver can also be asked later.", "A named approver can also be asked about the approval later.");

swap("1.3.6", "title", "An agent approves in an owner's name a wording", "An agent approves on an owner's behalf a wording");
swap("1.3.6", "text", "approves the node in that owner's name where", "approves the node on that owner's behalf where");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
