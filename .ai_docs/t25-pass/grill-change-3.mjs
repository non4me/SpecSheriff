// Records the owner's answer of 2026-11-19 to the first question of the grilling (no separate change document) and
// the second question put to the owner (who verifies that the mark "the meaning is unchanged" is correct); applies the
// corrections EngStickler's reader confirmed in batch 8. Updates the continuation file, the queue outline and
// .ai_docs/INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const startMark = "The owner then asked (2026-11-19) where the mark";
const endMark = "After the answer, the agent asked the owner the first question again.";
const a = c.indexOf(startMark);
const b = c.indexOf(endMark);
if (a < 0 || b < 0) throw new Error("answer block not found");
const block = [
  "The owner then asked (2026-11-19) where the mark \"the meaning is unchanged\" would be kept without a separate document, and how a deterministic check could detect the agent's decision. The agent's answer:",
  "- The mark would be kept in a file in the commit, not in the session. Today `sheriff approve <sid>` appends an entry to `specs/_approvals.jsonl`, which is committed together with the changed rule. The entry names the sid, the fingerprint of the wording and who approved it.",
  "- A new field would be added to the entry. An option of the same command sets it when the approver states that the new wording keeps the meaning of the previously approved wording. The names of the field and of the option are to be settled.",
  "- When a commit is being made, for each approved rule whose wording the commit changes, the check looks at the rule's own tests and symbols in the commit. Where none of them has changed, it looks in the commit for the approval entry with that sid and fingerprint. With the field, the commit passes. Without it, the commit is refused, and the refusal message names the rule.",
  "- Once T28 is done, the same field is kept in the approval stored in the node.",
  "- The check verifies that the mark exists, not that it is correct. Who verifies that it is correct is a separate question in the grilling.",
  "",
  "The owner answered the first question on 2026-11-19: what mattered was that the decision is recorded in a place where a script can find it, and the approval entry is such a place. So a change has no separate document: the mark \"the meaning is unchanged\" is a field of the approval entry, and the blast radius is computed by the SpecSheriff tools.",
  "",
  "The second question of the grilling, now put to the owner: who verifies that the mark is correct. The agent recommends the independent reviewer. An agent that approves a cosmetic change on the owner's behalf both decides that the meaning is unchanged and approves the change, so it certifies its own work. The reviewer would judge whether the rule's existing code and tests do what its new wording says, which is the judgement it already makes for changed code. That requires the principle on deterministic checks, which has the reviewer judge \"at every commit that changes code\", to cover also a commit that changes the wording of a rule bound to code. The other options put to the owner: trust the approval, since an approval made on the owner's behalf is reported to the owner, who can withdraw it; or let only an owner set the mark, in person.",
].join("\n");
c = c.slice(0, a) + block + c.slice(b + endMark.length);
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The agent is waiting for the owner's answer to the second question of the grilling, which is who verifies that the mark \"the meaning is unchanged\" is correct. The cost of a failure of the check in row 10.1.40 will be settled once the grilling has answered it." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const outlinePath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outlinePath, "utf8");
const from1 = "- первый вопрос: нужен ли изменению отдельный документ\n- уточнил: пометка «смысл прежний» — поле в записи одобрения, которая входит в коммит; проверка читает её из коммита\n";
if (!o.includes(from1)) throw new Error("outline lines not found");
o = o.replace(from1, "- ✓ отдельного документа изменения нет: пометка «смысл прежний» — поле в записи одобрения, её читает проверка (ваш ответ)\n- сейчас: кто проверяет, что пометка верна; рекомендую независимого рецензента\n");
fs.writeFileSync(outlinePath, o);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = s.replace(
  "fix-english-b7.mjs applies the corrections to the English that EngStickler's reader confirmed in batch 7.",
  "fix-english-b7.mjs applies to the English text the corrections that EngStickler's reader confirmed in batch 7. grill-change-3.mjs records the owner's answer to the first question of the grilling and the second question.",
);
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
