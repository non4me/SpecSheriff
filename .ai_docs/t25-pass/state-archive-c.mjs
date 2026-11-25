// Records the owner's answer of 2026-11-21 on the replacement that an archived node names («я бы вообще убрал это
// требование или сделал не обязательным - не вижу в нем особого профита») and the agent's proposal for rule 2.6 that
// follows from it. Applies EngStickler's thirty-first batch of corrections to the continuation file, and updates
// INDEX.md and the queue outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const fileUrl = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(fileUrl, "utf8");
const pairs = [
  ["Its report raises a question for the owner, which has now been put to the owner: whether row 10.1.11 of the main table of checks is to require that a node of the archive names as its replacement only a node of the specification. The owner's answer is to be acted on first.",
    "Its report raised a question, which the agent put to the owner: whether row 10.1.11 of the main table of checks should require that a node of the archive name as its replacement only a node of the specification. On 2026-11-21 the owner answered that the requirement could be dropped altogether or made optional («я бы вообще убрал это требование или сделал не обязательным - не вижу в нем особого профита»). The agent has now proposed to the owner a new wording of rule 2.6 (s-f2b5zvc565s242f), in which an archived node may name its replacement and nothing keeps that replacement current. The owner's answer is to be acted on first."],
  ["only if an approval was ever given for it and its approval status is set by approvals,", "only if it has ever been approved and its approval status is set by approvals,"],
  ["  - The node is to be split in three, as rule 7.3.3 calls for: the check made when a commit removes a node, the validation of a file of the archive against its schema, and the passing on of a replacement.",
    "  - The node is to be split into three, as rule 7.3.3 calls for: the check made when a commit removes a node, the validation of a file of the archive against its schema, and carrying a replacement forward."],
  ["  - `sheriff reindex` alone passing a replacement on does not hold every participant to rule 2.6, since the git hooks do not run `sheriff reindex`. A commit made without an agent would leave in the archive a replacement that the specification no longer holds. The reviewer recommends that row 10.1.11 also require that a node of the archive names as its replacement only a node of the specification,",
    "  - Having only `sheriff reindex` carry a replacement forward does not hold every participant to rule 2.6, since the git hooks do not run `sheriff reindex`. A commit made without an agent would leave in the archive a replacement that the specification no longer contains. The reviewer recommends that row 10.1.11 also require that a node of the archive name as its replacement only a node of the specification,"],
  ["that a commit adds to the archive exactly those of the nodes it removes that are to go there. It is also not to catch a node moved to another file.",
    "that a commit adds to the archive exactly those of the nodes it removes that must go there. The check must also leave out a node moved to another file."],
  ["  - A domain's header is to go from the node, as the note of 2026-11-12 says, since rule 1.3.8 speaks only of a section. The Domains extension has no rule saying that a header's status is derived from the nodes under it; that gap is to be raised when the extension is next changed.",
    "  - A domain's header is to be removed from the node, as the note of 2026-11-12 says, since rule 1.3.8 speaks only of a section. The Domains extension has no rule saying that a header's approval status is derived from the nodes under it; that gap is to be brought up with the owner when the extension is next changed."],
  ["archive-file.schema.json and its comments are to change with this node.",
    `archive-file.schema.json and its comments are to change with this node.
- The owner's answer of 2026-11-21 makes the replacement optional. The agent proposes the following for rule 2.6:
  - the first paragraph says that an archived node may also name, by its sid, the node that replaces it;
  - the second paragraph, which kept the replacement a node of the specification and carried it forward, is removed;
  - the reason loses "For the same reason, it names as its replacement only a node of the specification." and gains "The sid of a replacement shows a reader where the rule went at the time of its removal."
  Row 10.1.11 then stays as agreed. Once the owner agrees, the node "A removed node and the archive" is split into two: the check made when a commit removes a node, and the validation of a file of the archive against its schema. Nothing carries a replacement forward, and \`archive-file.schema.json\` loses the comment saying that \`sheriff validate\` checks that the replacement exists.`]
];
for (const [from, to] of pairs) t = swap(t, from, to);
fs.writeFileSync(fileUrl, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and the question it raises for the owner.", "and the question it raises for the owner. state-archive-c.mjs records the owner's answer, which makes the replacement of an archived node optional, and the agent's proposal for rule 2.6 that follows from it.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "### ◐ Строка 10.1.11: проверять ли замену в архиве\n- git-хуки не запускают sheriff reindex, и коммит без агента оставит в архиве замену, которой в спецификации уже нет\n- предлагаю добавить в строку: узел архива называет заменой только узел спецификации\n",
  "### ◐ Правило 2.6: замена в архиве — необязательна\n- вы: требование убрать или сделать необязательным\n- предлагаю: узел архива может назвать замену; второй абзац о цепочке замен убрать; строка 10.1.11 остаётся как была\n");
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
