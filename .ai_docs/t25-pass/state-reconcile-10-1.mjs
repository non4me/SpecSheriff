// Records in the continuation file the state reached once the order of the remaining steps was decided
// and the reason of row 10.1.40 was put to the owner.
import fs from "node:fs";

const path = new URL("../t25-one-thought.md", import.meta.url);
let c = fs.readFileSync(path, "utf8");
const lines = c.split("\n");

const first = lines.findIndex((l) => l.startsWith("**First step of the next session"));
const now = lines.findIndex((l) => l.startsWith("**Now (2026-11-19, 17:40 UTC):**"));
if (first < 0 || now < 0) throw new Error("top paragraphs not found");

lines[first] = "**First step if the session is interrupted:** put to the owner the reason proposed for row 10.1.40, which table-10-1.json holds and the page of the main table of checks shows, unless the owner has already answered. Then go on with the reconciliation of 10.1 described in the next paragraph.";

const state = [
  "**Now (2026-11-19, 17:45 UTC):** the step of T25 that changes the SpecSheriff tools has begun. The agent decided the order of the remaining steps itself, since the order of work is the agent's to decide (the `vt` rule \"Technical and procedural questions are the agent's to decide\"), and the principle \"The specification first, in one direction\" settles it. The order is:",
  "1. The drafts are moved into the specification files, with their `meta.decisions`. The schema in `specs/_schema/` is part of the specification (5.1), so it gains `TableRule` and the `schema` property of a RecordType in the same step.",
  "2. The appendix of the tools, one node at a time.",
  "3. The tests, then the code.",
  "4. The skills, the guides, the release with its rehearsal, and the saloon.",
  "",
  "Neither the current schema nor the current SpecSheriff tools know `TableRule`. Between the move and the change to the tools, the checks will therefore report failures, and the pre-commit hook may refuse the commit that closes a session. That commit is never made with `--no-verify`: where the hook refuses it, the agent tells the owner and keeps the move in `.ai_docs/` until the tools accept the new form.",
  "",
  "The move starts by reconciling the two versions of 10.1 (s-jau82aq9juv9zzh). The head in table-10-1.json stays: the owner agreed to it as a `TableRule`. The draft in newform.json is the old text node, whose reason the owner changed on 2026-11-17. The head's list of changes, accepted on 2026-11-11, says that the explanation of why some checks only report moves into the reasons of those checks. reconcile-10-1.mjs proposes the reason of row 10.1.40 and records the reconciliation in the head's list of changes; the old table is kept in table-10-1.before-reconcile.json. The paragraphs of the old reason go as follows:",
  "- the paragraph on drift goes to the reason of row 10.1.40, proposed now;",
  "- \"An approved rule that is not implemented is reported rather than refused, since a rule is approved before its test and its code are written (§s-rah8b37kytb682y)\" goes to the reason of row 10.1.41, proposed next; the row's node then needs a `cites` link to s-rah8b37kytb682y;",
  "- \"A check reads the commit being made, because judging anything else would pass or refuse what is not being committed\" goes to the reason of the tools node \"The hooks\" (tools/6) when that node is reviewed;",
  "- the paragraph on code and tests without a SpecTag is not moved, since 9.5 (s-kkbqcb9xrpaepwn), which rows 10.1.26 and 10.1.26a cite, gives its reasons.",
  "",
  "Row 10.1.40 also carries a todo for the step that changes the tools: `sheriff binding` must stop reporting the drift of a draft rule.",
];
lines.splice(now, 1, ...state);
c = lines.join("\n");

const waiting = "## Waiting for the owner\n\nNothing.";
if (!c.includes(waiting)) throw new Error("waiting section not found");
c = c.replace(waiting, "## Waiting for the owner\n\nThe reason proposed for row 10.1.40, from the paragraph on drift in the old reason of 10.1.");

fs.writeFileSync(path, c);
console.log("continuation file updated");
