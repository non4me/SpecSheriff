// Records the owner's question of 2026-11-19 on where the mark "the meaning is unchanged" is kept so that a
// deterministic check can read it, and the agent's answer; applies the corrections EngStickler's reader confirmed
// in batch 6. Updates the continuation file, the queue outline and .ai_docs/INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const edit = (path, pairs) => {
  let s = fs.readFileSync(path, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`not found in ${String(path).split("/").pop()}: ${a.slice(0, 70)}`);
    s = s.replace(a, b);
  }
  fs.writeFileSync(path, s);
};

const contPath = new URL("../t25-one-thought.md", here);
edit(contPath, [
  ["and the list of changes in the head of the table moves that sentence to the node \"The hooks\"", "and the list of changes in the head of the table says that the sentence is to be moved to the node \"The hooks\""],
  ["The owner's view of the work, given on 2026-11-19 when asked who checks that a change keeps a rule's meaning, and now being grilled (the skill `grilling`, one question at a time, each with the agent's recommended answer):", "The owner's view of how work on a project is done, given on 2026-11-19 when the owner was asked who checks that a change keeps a rule's meaning. The agent is now examining it with the owner by the skill `grilling`: one question at a time, each with the agent's recommended answer."],
  ["the agent marks that the tests and the code need no change.", "the agent records that the tests and the code need no change."],
  ["a temporary document that the agent writes once the change has been talked over with the owner.", "a temporary document that the agent writes once the change has been discussed with the owner."],
  ["It also serves the checks, possibly in a fixed structure that lists the checks to run.", "The checks also read it, possibly in a fixed format that lists the checks to run."],
  ["while an approved rule may be implemented while the specification is still a draft.", "whereas an approved rule may be implemented even while the specification is still a draft."],
  ["and whether code without a SpecTag is warned about (9.5).", "and whether a warning is issued for code without a SpecTag (9.5)."],
  ["- The guidelines have no document of a change.", "- The guidelines have no change document."],
  ["The first question of the grilling, now with the owner: whether a change needs a document of its own. The agent recommends no separate document.", "The first question of the grilling, now put to the owner, is whether a change needs a document of its own. The agent recommends against a separate document."],
]);

const answer = [
  "",
  "The owner then asked (2026-11-19) where the mark \"the meaning is unchanged\" would be kept without a separate document, and how a deterministic check would see the agent's decision. The agent's answer, now with the owner:",
  "- The mark is kept in a file of the commit, not in the session. Today `sheriff approve <sid>` appends a record to `specs/_approvals.jsonl`, which is committed together with the changed rule; the record names the sid, the fingerprint of the wording and who approved it.",
  "- The record gains one more field, set by an option of the same command when the approver states that the new wording keeps the meaning of the wording approved before it. Its name is to be settled.",
  "- At a commit, for each approved rule whose wording the commit changes, the check looks at the rule's own tests and symbols in the commit. Where none of them changed, it looks in the commit for the approval of that sid and fingerprint: with the field, the commit passes; without it, the commit is refused, and the refusal names the rule.",
  "- Once T28 is done, the same field is kept in the approval stored in the node.",
  "- The check verifies that the mark exists, not that it is true; who verifies that it is true is a separate question of the grilling.",
  "The agent put the first question again after the answer.",
].join("\n");
let c = fs.readFileSync(contPath, "utf8");
const marker = "shown as a report, rather than written by hand.";
const at = c.indexOf(marker);
if (at < 0) throw new Error("first question paragraph not found");
c = c.slice(0, at + marker.length) + "\n" + answer + c.slice(at + marker.length);
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The owner's answer to the first question of the grilling: whether a change needs a document of its own. The cost of a failure of the check in row 10.1.40 will be settled once the grilling has established how it is recorded that a change leaves a rule's meaning unchanged." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

edit(new URL("queue-outline.md", here), [
  ["- первый вопрос: нужен ли изменению отдельный документ\n", "- первый вопрос: нужен ли изменению отдельный документ\n- уточнил: пометка «смысл прежний» — поле в записи одобрения, которая входит в коммит; проверка читает её из коммита\n"],
]);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = s.replace(
  "grill-change-1.mjs records the owner's view of how work on a project proceeds, with the proposal of a document of a change, and the first question of the grilling on it.",
  "grill-change-1.mjs records the owner's view of how work on a project proceeds, including the owner's proposal of a change document, and the first question of the grilling about that view. grill-change-2.mjs records where the mark that a change keeps a rule's meaning would be kept for a deterministic check.",
);
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
