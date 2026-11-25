// Records the owner's agreement of 2026-11-21 («ок») to "What `sheriff reindex` changes in what an earlier release
// wrote" and writes english-reindex-earlier.md for EngStickler's reader. Prepares "Keys written twice" for the owner:
// the merge also covers the project's extension of the schema, which row 10.1.1 covers and which is written by hand.
// Applies EngStickler's forty-seventh batch of corrections to the continuation file and INDEX.md, and updates the outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-agree-reindex-earlier.json", here), JSON.stringify(drafts, null, 2) + "\n");
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};

const earlier = drafts["new:tools-2-reindex-earlier"];
earlier.agreed = "2026-11-21";
earlier.rulings.push({ date: "2026-11-21", problem: "Whether the owner agrees to the node on what `sheriff reindex` changes in what an earlier release wrote, with the ruling on the four cases of an earlier RecordType.", ruling: "The owner agreed to the node («ок»).", type: "textual" });
const e = earlier.proposal;
fs.writeFileSync(new URL("english-reindex-earlier.md", here), [
  "# \"What `sheriff reindex` changes in what an earlier release wrote\", a new node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", e.title, "", "## Text", "", e.text, "", "## Reason", "", e.reason, ""
].join("\n"));

const twice = drafts["new:tools-2-reindex-twice"];
const t2 = twice.proposal;
const open = t2.parts.find((x) => x.en.startsWith("`sheriff reindex` merges the values"));
open.en = swap(open.en, "It does so in every file of the specification and of its archive, before any other change:",
  "It does so in every file of the specification and of its archive, and in the project's extension of the schema, `specs/_schema/project.schema.json` (§s-xm8rz4uupb73gu5), before any other change:");
open.ru = swap(open.ru, "Он делает это в каждом файле спецификации и её архива, прежде любого другого изменения:",
  "Он делает это в каждом файле спецификации и её архива и в расширении схемы проекта, `specs/_schema/project.schema.json` (§s-xm8rz4uupb73gu5), прежде любого другого изменения:");
open.change += " Новое, предлагаю: слияние охватывает и расширение схемы проекта — его тоже пишут вручную, и строка 10.1.1 проверяет его на ключи, записанные дважды. Сейчас код его не объединяет.";
t2.text = render(t2.parts, "en");
t2.ruText = render(t2.parts, "ru");
t2.refs = [...t2.refs, { type: "cites", to: "s-xm8rz4uupb73gu5" }];
twice.doubt = "The agent proposes, with the node, that the merge also covers `specs/_schema/project.schema.json`, since it is written by hand and row 10.1.1 covers it; the owner decides with the node.";
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["and `sheriff reindex` leaves a RecordType that holds a field of the type `variant`, a field whose values came from the source `domains`, or a field whose own list of values is empty in its earlier form, and names it and each such field for its author to rewrite.",
    "and `sheriff reindex` leaves unchanged, as an earlier release wrote it, a RecordType that holds a field of the type `variant`, a field whose values came from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field for its author to rewrite."],
  ["The revised node has now been shown to the owner, and the owner's answer is to be acted on first.",
    `The revised node was shown to the owner.
- On 2026-11-21 the owner agreed to that node («ок»). agree-reindex-earlier.mjs marked its draft as agreed and wrote english-reindex-earlier.md for EngStickler's reader; tools-drafts.before-agree-reindex-earlier.json keeps the drafts as they were before that script ran. The page at https://claude.ai/artifact/16QNWMQGCeUzM4hu5CNUii shows the node.
- The same script prepared the last node of the first group, "Keys written twice", for the owner. It now also merges the keys written twice in \`specs/_schema/project.schema.json\`, since that file is written by hand and row 10.1.1 covers it; the agent proposes this with the node. The node has now been shown to the owner, and the owner's answer is to be acted on first. After it, the agent drafts the second group: \`sheriff types\`, \`sheriff json\`, \`sheriff todos\`, \`sheriff guide\`, and \`sheriff settings\` with \`sheriff untagged\`.`]
]) t = swap(t, from, to);
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "writes the owner's ruling on the four cases of an earlier RecordType into the node on what an earlier release wrote,",
  "writes the owner's ruling on the four cases of a RecordType as an earlier release wrote it into the node \"What `sheriff reindex` changes in what an earlier release wrote\",");
s = swap(s, "tools-drafts.before-reindex-earlier-recordtype.json is tools-drafts.json as it was before that script ran.",
  "tools-drafts.before-reindex-earlier-recordtype.json is tools-drafts.json as it was before that script ran. agree-reindex-earlier.mjs records the owner's agreement to that node, writes english-reindex-earlier.md for EngStickler's reader, and has \"Keys written twice\" also merge in the project's extension of the schema; tools-drafts.before-agree-reindex-earlier.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Что sheriff reindex меняет в записанном прежним выпуском» — согласован\n- переименования, перенос RecordType в JSON Schema, sid и связи архива, запись об одобрении спецификации\n\n## ● В работе:");
o = swap(o, "- ● «Что sheriff reindex меняет в записанном прежним выпуском»: с вашим решением о RecordType показан вам снова",
  "- ✓ «Что sheriff reindex меняет в записанном прежним выпуском» — согласован\n- ● «Ключи, записанные дважды»: показан вам, с предложением объединять ключи и в расширении схемы проекта\n- ○ вторая группа: sheriff types, json, todos, guide, settings и untagged");
fs.writeFileSync(outline, o);
console.log(t2.text + "\n\n" + t2.reason + `\n\nupdated at ${now}`);
