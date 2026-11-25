// Records the owner's agreement of 2026-11-21 («ок») to "How the schema of the specification is composed"
// (s-xzcw3hv4hmxz7h7), with the example the reviewer proposed, and writes english-schema.md, its English text, for
// EngStickler's reader. Prepares the second draft, "Validation against the schema before a command", for the owner:
// its title says what the validation comes before, and the owner's remark of the same day on negation is carried out
// in it. Applies EngStickler's twenty-eighth batch of corrections to the continuation file and INDEX.md, and updates
// the queue outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const edit = (rel, pairs) => {
  const url = new URL(rel, here);
  let s = fs.readFileSync(url, "utf8");
  for (const [from, to] of pairs) s = swap(s, from, to);
  fs.writeFileSync(url, s);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-agree-schema.json", here), JSON.stringify(drafts, null, 2) + "\n");

// The agreement to "How the schema of the specification is composed".
const compose = drafts["s-xzcw3hv4hmxz7h7"];
compose.agreed = "2026-11-21";
compose.rulings = [
  { date: "2026-11-21",
    problem: "The node stated two of the conditions on which the tools accept an extension of the schema by negation: a name that the schema does not yet define, and a property that the kind does not yet hold.",
    ruling: "The owner asked for the positive form («старайся не писать через отрицание -> новое уникальное имя»): a new name, unique in the schema, and a property new to that kind, that file or that link.",
    type: "textual" },
  { date: "2026-11-21",
    problem: "Whether the owner agrees to the node, split from \"The schema and a project's extension\", together with the example that specsheriff-rule-reviewer proposed.",
    ruling: "The owner agreed to the node with the example («ок»).",
    type: "textual" }
];
const c = compose.proposal;
fs.writeFileSync(new URL("english-schema.md", here), [
  "# \"How the schema of the specification is composed\", a node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", c.title, "", "## Text", "", c.text, "", "## Reason", "", c.reason, "", "## Example", "", c.examples[0].en, ""
].join("\n"));

// The second draft, before it is shown to the owner.
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const validate = drafts["new:tools-7-1-validate"];
const v = validate.proposal;
const partOf = (start) => {
  const found = v.parts.find((x) => x.en.startsWith(start));
  if (!found) throw new Error(`no part starts with: ${start}`);
  return found;
};
v.title = "Validation against the schema before a command works on the files";
v.ruTitle = "Проверка по схеме, прежде чем команда работает с файлами";
v.titleChange = "Новый узел. Название говорит, перед чем идёт проверка: перед тем как команда работает с файлами.";
Object.assign(partOf("a sid that a node lacks"), {
  en: "the sid that it gives a node, and every location (§s-kag2m9tzdnduxdx);",
  ru: "sid, который он даёт узлу, и каждое расположение (§s-kag2m9tzdnduxdx);",
  change: "Было: «вне архива — sid, которого у узла нет, и каждое расположение». Оговорка об архиве не нужна: файл архива здесь не проверяется. Без отрицания, по вашему замечанию к предыдущему узлу."
});
const last = partOf("Where the SpecSheriff tools refuse an extension of the schema");
last.en = swap(last.en, "They then check nothing more. `sheriff reindex` then writes no file.", "Each of them then stops. `sheriff reindex` then leaves every file as it was.");
last.ru = swap(last.ru, "После этого они больше ничего не проверяют. `sheriff reindex` тогда не пишет ни одного файла.", "После этого каждая из них останавливается. `sheriff reindex` тогда оставляет каждый файл как был.");
last.change += " Последние два предложения — без отрицания, по вашему замечанию к предыдущему узлу.";
v.text = render(v.parts, "en");
v.ruText = render(v.parts, "ru");
v.reason = swap(v.reason, "since a node written by hand lacks it until the command runs.", "since a node written by hand receives it only when the command runs.");
v.ruReason = swap(v.ruReason, "потому что в узле, написанном вручную, этого нет, пока команда не запущена.", "потому что узел, написанный вручную, получает это только тогда, когда команда запущена.");
v.reasonChange = "Как было в узле «The schema and a project's extension», с уточнением «из всех файлов». Последнее предложение — без отрицания, по вашему замечанию к предыдущему узлу. Второй абзац остаётся, хотя рецензент предлагал заменить его одним предложением: его замена неточна, а нынешний абзац даёт по причине на каждый шаг.";
validate.doubt.agentView = "The agent recommends keeping the paragraph. The reviewer's alternative says that `sheriff reindex` validates each file in the form in which it is about to write it, which is inexact: the validation leaves out what the command writes itself. The paragraph gives one reason for each step, which the owner agreed to.";
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// The continuation file: EngStickler's twenty-eighth batch, and the state of the two nodes.
edit("../t25-one-thought.md", [
  [`On the advice of specsheriff-rule-reviewer, the agent has split it into two drafts, and both passed the reviewer's second review once propose-schema-c.mjs had applied the reviewer's fixes. The first of the two drafts, "How the schema of the specification is composed", was shown to the owner together with an example that the reviewer proposed. The owner asked for the conditions on an extension of the schema to be stated without negation («новое уникальное имя»). fix-schema-d.mjs rewrote them and two sentences of the reason, and the node has now been shown to the owner again. The owner's answer is to be acted on first, and the second draft is shown after it.`,
    `On the advice of specsheriff-rule-reviewer, the agent has split it into two drafts, and the reviewer's second review found both ready to be shown to the owner once the fixes it asked for were made. The owner asked for the conditions on an extension of the schema in the first draft to be stated positively («новое уникальное имя»), and fix-schema-d.mjs rewrote them and two sentences of the node's reason. On 2026-11-21 the owner agreed to that first node, "How the schema of the specification is composed", together with the example that the reviewer proposed. The second node, "Validation against the schema before a command works on the files", has now been shown to the owner, and the owner's answer is to be acted on first.`],
  ["- The second review found both drafts ready once propose-schema-c.mjs had applied the reviewer's fixes:",
    "- The second review found both drafts ready to be shown to the owner once the fixes it asked for were made, and propose-schema-c.mjs made them:"],
  ["The chosen extensions of the guidelines are added in the bytewise order of their names, since `sheriff.config.json` can record each choice of an extension and each withdrawal of one.",
    "The chosen extensions of the guidelines are added to the composed schema in the bytewise order of their names. The order of the entries in `sheriff.config.json` would not do, since that file can hold an entry for each choice of an extension and for each withdrawal of one."],
  ["a project's extension that declares `RecordType` again is refused, and the project adds a field to every RecordType through `fields` instead. gen-tools-node-page.mjs now shows a draft's examples, and the example is put to the owner together with the node.",
    "the tools refuse a project's extension of the schema that redeclares `RecordType`, and the project adds a field to every RecordType through `fields` instead. gen-tools-node-page.mjs now includes a draft's examples in the page it builds, and the example was shown to the owner together with the node."],
  ["  - The reviewer questions the second paragraph of that node's reason, which the owner agreed to in the approved node. The draft keeps the paragraph, and the reviewer's alternative is put to the owner together with the node.",
    `  - The reviewer objects to the second paragraph of that node's reason, which the owner agreed to when approving the earlier wording of the node. The reviewer's alternative wording says that \`sheriff reindex\` validates each file in the form in which it is about to write it, which is inexact, since the validation leaves out what the command writes itself. The draft therefore keeps the paragraph, and the reviewer's objection is shown to the owner together with the node.
- fix-schema-d.mjs carried out the owner's remark on negation in the first node, and tools-drafts.before-schema-d.json keeps the drafts as they were before that script ran. agree-schema.mjs then did the following:
  - it marked the first node as agreed, recorded the owner's remark and the agreement in the draft, and wrote english-schema.md, the English text of the agreed node, for EngStickler's reader;
  - it carried out the same remark in the second node: "the sid that it gives a node" replaces "a sid that a node lacks", the commands' refusal ends with "each of them then stops" and "leaves every file as it was", and the last sentence of the reason says that a node written by hand receives what \`sheriff reindex\` writes only when the command runs;
  - it renamed the second node "Validation against the schema before a command works on the files", since EngStickler's reader found that "before a command" could be read two ways.
  tools-drafts.before-agree-schema.json keeps the drafts as they were before agree-schema.mjs ran. https://claude.ai/artifact/M9yq5v8anHRfkCqg4g2xub shows the first node.`]
]);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "fix-schema-d.mjs states without negation, as the owner asked, the conditions on which the tools accept an extension of the schema,",
  "fix-schema-d.mjs rewrites the conditions on which the tools accept an extension of the schema so that they are stated positively, as the owner asked,");
s = swap(s, "and tools-drafts.before-schema-d.json is tools-drafts.json as it was before that script ran.",
  "and tools-drafts.before-schema-d.json is tools-drafts.json as it was before that script ran. agree-schema.mjs records the owner's agreement to \"How the schema of the specification is composed\", writes english-schema.md, its English text, for EngStickler's reader, and prepares the second draft for the owner; tools-drafts.before-agree-schema.json is tools-drafts.json as it was before agree-schema.mjs ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "## ● В работе:",
  "### ✓ «Как составляется схема спецификации» — согласован\n- схема guidelines, затем схемы выбранных расширений по порядку имён, затем расширение проекта\n- расширение добавляет только новые уникальные имена; пример — с RecordType\n\n## ● В работе:");
o = swap(o, "- ● «Как составляется схема спецификации»: условия на расширение — без отрицания, по вашему замечанию; показан вам снова\n- ○ «Проверка по схеме до работы команды»: после него",
  "- ✓ «Как составляется схема спецификации» — согласован\n- ● «Проверка по схеме, прежде чем команда работает с файлами»: показан вам");
const waiting = o.match(/### ◐ «Как составляется схема спецификации» — узел и пример\n[\s\S]*?\n\n(?=## ○ Затем:)/);
if (!waiting) throw new Error("outline: the waiting branch of the first node not found");
o = swap(o, waiting[0],
  "### ◐ «Проверка по схеме, прежде чем команда работает с файлами» — новый узел\n- проверяются только файлы, которые хранит репозиторий\n- второй абзац обоснования остаётся, как вы его согласовали; рецензент предлагал его заменить\n\n");
fs.writeFileSync(outline, o);
console.log(v.text);
console.log("\n" + v.reason);
console.log(`\nupdated at ${now}`);
